import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import Anthropic from "@anthropic-ai/sdk";

function sanitizeText(text: string): string {
  return text
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, " ")
    .replace(/\\u[0-9a-fA-F]{4}/g, " ")
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .trim();
}

export async function POST(req: NextRequest) {
  let fileName = "unknown";

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const subject = formData.get("subject") as string | null;

    if (!file || !subject) {
      return NextResponse.json({ error: "file and subject required" }, { status: 400 });
    }

    fileName = file.name;
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // ── Text extraction ──────────────────────────────────────────────────────
    let rawText: string | null = null;

    if (ext === "txt") {
      rawText = sanitizeText(buffer.toString("utf-8"));
    } else if (["png", "jpg", "jpeg", "webp"].includes(ext)) {
      try {
        const claude = new Anthropic();
        const mediaType = (
          ext === "jpg" || ext === "jpeg" ? "image/jpeg"
          : ext === "png" ? "image/png"
          : "image/webp"
        ) as "image/jpeg" | "image/png" | "image/webp";

        const resp = await claude.messages.create({
          model: "claude-opus-4-6",
          max_tokens: 4096,
          messages: [{
            role: "user",
            content: [
              {
                type: "image",
                source: { type: "base64", media_type: mediaType, data: buffer.toString("base64") },
              },
              { type: "text", text: "Extract ALL text from this image exactly as it appears. Preserve structure. Return only the extracted text." },
            ],
          }],
        });
        const extracted = resp.content[0].type === "text" ? resp.content[0].text : null;
        rawText = extracted ? sanitizeText(extracted) : null;
      } catch {
        rawText = null;
      }
    } else if (ext === "pdf") {
      try {
        // Attempt plain-text read (works for text-layer PDFs)
        const raw = buffer.toString("utf-8");
        const printableRatio =
          raw.replace(/[^\x20-\x7E\n\r\t]/g, "").length / Math.max(raw.length, 1);

        if (printableRatio > 0.4) {
          // Strip control chars and escape sequences before storing
          rawText = sanitizeText(raw);
        }
      } catch {
        rawText = null;
      }
    }

    // ── Supabase insert ──────────────────────────────────────────────────────
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("source_materials")
      .insert({
        subject,
        title: fileName,
        file_url: null,
        raw_text: rawText,
        status: "ready",
      })
      .select("id")
      .single();

    if (error) {
      return NextResponse.json({
        materialId: null,
        fileUrl: null,
        hasText: false,
        title: fileName,
        warning: error.message,
      });
    }

    return NextResponse.json({
      materialId: data.id,
      fileUrl: null,
      hasText: !!rawText,
      title: fileName,
    });

  } catch {
    // Never return 500
    return NextResponse.json({
      materialId: null,
      fileUrl: null,
      hasText: false,
      title: fileName,
      warning: "텍스트 추출 실패, 분석 시 직접 입력 필요",
    });
  }
}
