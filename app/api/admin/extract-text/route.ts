import { NextRequest, NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/auth";
import Anthropic from "@anthropic-ai/sdk";
import { getAnthropicApiKey } from "@/lib/env";

// pdf-parse kept external so webpack doesn't bundle its browser-only deps
// eslint-disable-next-line @typescript-eslint/no-require-imports
const pdfParse = require("pdf-parse") as (buf: Buffer) => Promise<{ text: string }>;

const anthropic = new Anthropic({ apiKey: getAnthropicApiKey() });
const MAX_BYTES = 15 * 1024 * 1024;
const TIMEOUT_MS = 45_000;

const ACCEPTED_EXTENSIONS = new Set(["txt", "pdf", "png", "jpg", "jpeg", "webp", "docx"]);

function ext(file: File) {
  return file.name.split(".").pop()?.trim().toLowerCase() ?? "";
}

function normalize(text: string): string {
  return text
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]{2,}/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function withTimeout<T>(p: Promise<T>, ms: number, label: string): Promise<T> {
  return Promise.race([
    p,
    new Promise<T>((_, rej) =>
      setTimeout(() => rej(new Error(`${label} timed out after ${ms / 1000}s`)), ms)
    ),
  ]);
}

function extractDocx(buf: Buffer): string {
  const raw = buf.toString("binary");
  const matches = raw.match(/<w:t[^>]*>([\s\S]*?)<\/w:t>/g) ?? [];
  return normalize(matches.map((m) => m.replace(/<[^>]+>/g, "")).join(" "));
}

async function extractImage(
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
              text: "Extract all visible text from these study notes. Preserve headings, bullet points, labels, and equations. Return plain text only.",
            },
          ],
        },
      ],
    }),
    TIMEOUT_MS,
    "Image OCR"
  );
  return resp.content[0]?.type === "text" ? normalize(resp.content[0].text) : "";
}

async function extractPdf(buf: Buffer, fileName: string): Promise<string> {
  // 1. pdf-parse — fast, works for text-based PDFs
  try {
    const result = await withTimeout(pdfParse(buf), 15_000, "pdf-parse");
    const text = normalize(result.text);
    if (text.length >= 200) return text;
  } catch (e) {
    console.warn("[extract-text] pdf-parse failed, falling back to Claude", e);
  }

  // 2. Claude document API — handles scanned / handwritten PDFs
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
              source: { type: "base64", media_type: "application/pdf", data: buf.toString("base64") },
            },
            {
              type: "text",
              text: "Extract all text from this lesson notes PDF. Preserve structure, headings, lists, and equations. Return plain text only.",
            },
          ] as Parameters<typeof anthropic.messages.create>[0]["messages"][0]["content"],
        },
      ],
    }),
    TIMEOUT_MS,
    "Claude PDF extraction"
  );
  return resp.content[0]?.type === "text" ? normalize(resp.content[0].text) : "";
}

/** POST /api/admin/extract-text — returns { text } with no DB or Storage side-effects */
export async function POST(req: NextRequest) {
  const admin = await requireAdminUser(req);
  if (admin instanceof NextResponse) return admin;

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const file = formData.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "'file' field is required" }, { status: 400 });

  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: `File too large (${(file.size / 1024 / 1024).toFixed(1)} MB). Max 15 MB.` },
      { status: 400 }
    );
  }

  const mime = file.type.toLowerCase();
  const fileExt = ext(file);
  if (!ACCEPTED_EXTENSIONS.has(fileExt) && !mime.startsWith("image/") && mime !== "application/pdf" && mime !== "text/plain") {
    return NextResponse.json(
      { error: `Unsupported file type. Use PDF, PNG, JPG, WEBP, TXT, or DOCX.` },
      { status: 400 }
    );
  }

  console.log(`[extract-text] file="${file.name}" mime="${mime}" size=${file.size}`);

  let text = "";
  try {
    if (mime === "text/plain" || fileExt === "txt") {
      text = normalize(await file.text());
    } else if (mime.startsWith("image/") || ["png", "jpg", "jpeg", "webp"].includes(fileExt)) {
      const normalizedMime: "image/png" | "image/jpeg" | "image/webp" =
        mime === "image/png" || fileExt === "png" ? "image/png"
        : mime === "image/webp" || fileExt === "webp" ? "image/webp"
        : "image/jpeg";
      const ab = await file.arrayBuffer();
      text = await extractImage(Buffer.from(ab).toString("base64"), normalizedMime);
    } else if (mime === "application/pdf" || fileExt === "pdf") {
      const ab = await file.arrayBuffer();
      text = await extractPdf(Buffer.from(ab), file.name);
    } else if (mime.includes("wordprocessingml") || fileExt === "docx") {
      const ab = await file.arrayBuffer();
      text = extractDocx(Buffer.from(ab));
    }
  } catch (e) {
    console.error("[extract-text] extraction failed", { file: file.name, error: e });
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Text extraction failed." },
      { status: 500 }
    );
  }

  if (!text.trim()) {
    return NextResponse.json(
      { error: "No text could be extracted. For handwritten notes, try uploading a PNG/JPG snapshot." },
      { status: 400 }
    );
  }

  return NextResponse.json({
    text: text.slice(0, 24_000),
    textLength: text.length,
    preview: text.slice(0, 240),
  });
}
