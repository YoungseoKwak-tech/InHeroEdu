import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { requireAdminUser } from "@/lib/auth";
import Anthropic from "@anthropic-ai/sdk";
import { getAnthropicApiKey } from "@/lib/env";
// pdf-parse is kept as a native Node.js require (not webpack-bundled) via
// serverComponentsExternalPackages in next.config.mjs. This prevents its
// internal pdfjs-dist dependency from being bundled with browser-only DOM
// APIs (DOMMatrix etc.) that crash the build.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const pdfParse = require("pdf-parse") as (buf: Buffer) => Promise<{ text: string }>;

const anthropic = new Anthropic({ apiKey: getAnthropicApiKey() });
const MAX_UPLOAD_BYTES = 15 * 1024 * 1024; // 15 MB
const OCR_TIMEOUT_MS = 45_000;
const LESSON_MATERIALS_BUCKET = "lesson-materials";

const ACCEPTED_TYPES = new Set([
  "text/plain",
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

const ACCEPTED_EXTENSIONS = new Set(["txt", "pdf", "png", "jpg", "jpeg", "webp", "docx"]);

function getExt(file: File): string {
  return file.name.split(".").pop()?.trim().toLowerCase() ?? "";
}

function isAccepted(file: File): boolean {
  return ACCEPTED_TYPES.has(file.type.toLowerCase()) || ACCEPTED_EXTENSIONS.has(getExt(file));
}

function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`${label} timed out after ${ms / 1000}s`)), ms)
    ),
  ]);
}

function normalizeText(text: string): string {
  return text
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function sanitizeName(name: string): string {
  return name
    .normalize("NFKD")
    .replace(/[^\w.-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

function extractDocxText(buffer: Buffer): string {
  const raw = buffer.toString("binary");
  const matches = raw.match(/<w:t[^>]*>([\s\S]*?)<\/w:t>/g) ?? [];
  return normalizeText(matches.map((m) => m.replace(/<[^>]+>/g, "")).join(" "));
}

async function extractImageText(
  base64: string,
  mediaType: "image/png" | "image/jpeg" | "image/webp"
): Promise<string> {
  const resp = await withTimeout(
    anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 3000,
      messages: [
        {
          role: "user",
          content: [
            { type: "image", source: { type: "base64", media_type: mediaType, data: base64 } },
            {
              type: "text",
              text: "Extract all visible text from these study notes. Preserve headings, bullet points, labels, equations, and short diagram descriptions. Return plain text only.",
            },
          ],
        },
      ],
    }),
    OCR_TIMEOUT_MS,
    "Image OCR"
  );
  return resp.content[0]?.type === "text" ? normalizeText(resp.content[0].text) : "";
}

async function extractPdfText(buffer: Buffer, fileName: string): Promise<string> {
  // 1. Try pdf-parse first — fast, works for text-based PDFs
  try {
    const result = await withTimeout(pdfParse(buffer), 15_000, "pdf-parse");
    const text = normalizeText(result.text);
    if (text.length >= 200) {
      console.log(`[upload-lesson-material] pdf-parse extracted ${text.length} chars from ${fileName}`);
      return text;
    }
  } catch (e) {
    console.warn("[upload-lesson-material] pdf-parse failed, falling back to Claude", e);
  }

  // 2. Fallback: send the PDF to Claude as a document
  console.log(`[upload-lesson-material] using Claude document API for ${fileName}`);
  const resp = await withTimeout(
    anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 4000,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "document",
              title: fileName,
              source: {
                type: "base64",
                media_type: "application/pdf",
                data: buffer.toString("base64"),
              },
            },
            {
              type: "text",
              text: "Extract all text from this lesson notes PDF. Preserve structure, headings, lists, labels, and equations. Return plain text only.",
            },
          ] as Parameters<typeof anthropic.messages.create>[0]["messages"][0]["content"],
        },
      ],
    }),
    OCR_TIMEOUT_MS,
    "Claude PDF extraction"
  );
  return (resp as Anthropic.Message).content?.[0]?.type === "text"
    ? normalizeText((resp as Anthropic.Message).content[0].type === "text"
        ? ((resp as Anthropic.Message).content[0] as Anthropic.TextBlock).text
        : "")
    : "";
}

/** POST /api/admin/upload-lesson-material */
export async function POST(req: NextRequest) {
  // ── Auth ─────────────────────────────────────────────────────────────────
  const admin = await requireAdminUser(req);
  if (admin instanceof NextResponse) {
    const body = await admin.clone().json().catch(() => ({ error: "unauthorized" }));
    console.error("[upload-lesson-material] auth rejected", { status: admin.status, body });
    return NextResponse.json(body, { status: admin.status });
  }

  // ── Parse form ───────────────────────────────────────────────────────────
  let formData: FormData;
  try {
    formData = await req.formData();
  } catch (e) {
    console.error("[upload-lesson-material] could not parse form data", e);
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const file = formData.get("file") as File | null;
  const lessonId = formData.get("lessonId") as string | null;

  if (!file || !lessonId) {
    return NextResponse.json(
      { error: "Both 'file' and 'lessonId' fields are required." },
      { status: 400 }
    );
  }

  if (file.size > MAX_UPLOAD_BYTES) {
    return NextResponse.json(
      { error: `File is too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Limit is 15 MB.` },
      { status: 400 }
    );
  }

  if (!isAccepted(file)) {
    return NextResponse.json(
      { error: `Unsupported file type "${file.type || getExt(file)}". Use PDF, PNG, JPG, WEBP, TXT, or DOCX.` },
      { status: 400 }
    );
  }

  const mime = file.type.toLowerCase();
  const ext = getExt(file);
  console.log(`[upload-lesson-material] lessonId=${lessonId} file="${file.name}" mime="${mime}" size=${file.size}`);

  // ── Extract text ─────────────────────────────────────────────────────────
  let extractedText = "";
  try {
    if (mime === "text/plain" || ext === "txt") {
      extractedText = normalizeText(await file.text());

    } else if (mime.startsWith("image/") || ["png", "jpg", "jpeg", "webp"].includes(ext)) {
      const normalizedMime: "image/png" | "image/jpeg" | "image/webp" =
        mime === "image/png" || ext === "png"
          ? "image/png"
          : mime === "image/webp" || ext === "webp"
          ? "image/webp"
          : "image/jpeg";
      const ab = await file.arrayBuffer();
      extractedText = await extractImageText(Buffer.from(ab).toString("base64"), normalizedMime);

    } else if (mime === "application/pdf" || ext === "pdf") {
      const ab = await file.arrayBuffer();
      extractedText = await extractPdfText(Buffer.from(ab), file.name);

    } else if (mime.includes("wordprocessingml") || mime.includes("docx") || ext === "docx") {
      const ab = await file.arrayBuffer();
      extractedText = extractDocxText(Buffer.from(ab));
      if (!extractedText) {
        return NextResponse.json(
          { error: "Could not extract text from .docx. Try saving as .txt and re-uploading." },
          { status: 400 }
        );
      }
    }
  } catch (e) {
    console.error("[upload-lesson-material] text extraction failed", { file: file.name, error: e });
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Text extraction failed. Try a different file format." },
      { status: 500 }
    );
  }

  if (!extractedText.trim()) {
    return NextResponse.json(
      { error: "No text could be extracted. For handwritten notes try uploading a PNG/JPG snapshot." },
      { status: 400 }
    );
  }

  // ── Storage upload (optional — skip gracefully if bucket missing) ─────────
  const supabase = createAdminClient();
  let materialsUrl: string | null = null;

  const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
  if (bucketsError) {
    console.warn("[upload-lesson-material] could not list storage buckets — skipping file storage", bucketsError);
  } else {
    const bucketExists = buckets.some(
      (b) => b.id === LESSON_MATERIALS_BUCKET || b.name === LESSON_MATERIALS_BUCKET
    );
    if (!bucketExists) {
      console.warn(
        `[upload-lesson-material] bucket "${LESSON_MATERIALS_BUCKET}" not found — skipping file storage. ` +
          `Available: ${buckets.map((b) => b.name).join(", ") || "(none)"}`
      );
    } else {
      const storagePath = `${lessonId}/${Date.now()}-${sanitizeName(file.name)}`;
      const { error: uploadError } = await supabase.storage
        .from(LESSON_MATERIALS_BUCKET)
        .upload(storagePath, file, { contentType: mime || "application/octet-stream", upsert: true });

      if (uploadError) {
        console.warn("[upload-lesson-material] storage upload failed — continuing without it", uploadError);
      } else {
        materialsUrl = `${LESSON_MATERIALS_BUCKET}/${storagePath}`;
      }
    }
  }

  // ── Save to lesson_scripts ────────────────────────────────────────────────
  const truncated = extractedText.slice(0, 24_000);
  const { error: dbError } = await supabase.from("lesson_scripts").upsert(
    {
      lesson_id: lessonId,
      materials_url: materialsUrl ?? file.name,
      materials_text: truncated,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "lesson_id" }
  );

  if (dbError) {
    console.error("[upload-lesson-material] lesson_scripts upsert failed", dbError);
    return NextResponse.json(
      {
        error:
          dbError.message.includes("does not exist") || dbError.code === "42P01"
            ? "The lesson_scripts table does not exist. Run the Supabase migration first."
            : dbError.message,
      },
      { status: 500 }
    );
  }

  console.log(
    `[upload-lesson-material] done — lessonId=${lessonId} chars=${extractedText.length} stored=${!!materialsUrl}`
  );

  return NextResponse.json({
    ok: true,
    filename: file.name,
    textLength: extractedText.length,
    preview: extractedText.slice(0, 240),
  });
}
