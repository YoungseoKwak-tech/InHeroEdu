// Server-side preview generator for lounge_resources PDFs.
//
// Renders pages 1–3 to PNGs and writes them to the resource_previews
// Supabase Storage bucket. Page 1 is full clarity; pages 2 and 3 are
// hard-blurred with Sharp so the URL itself can only ever return a
// blurred image — no client-side blur ever, because anyone who knows
// the URL can fetch it directly. Updates lounge_resources with the
// resulting URLs + total_pages + preview_generation_status.
//
// Engine: unpdf (serverless-friendly pdfjs fork + @napi-rs/canvas)
// wrapped in lib/server/pdf-thumbnail. pdfjs-dist is intentionally
// NOT imported here — the client-side reader still uses it, but on
// Vercel serverless its worker-loading path is structurally
// incompatible.

import { createAdminClient } from "@/lib/supabase";
import { generatePdfPagePreviews } from "@/lib/server/pdf-thumbnail";

const PREVIEW_BUCKET = "resource_previews";
const PREVIEW_WIDTH = 800;
const BLUR_RADIUS = 12;
const PAGES_TO_RENDER = 3;

interface GeneratePreviewsResult {
  ok: boolean;
  resourceId: string;
  totalPages?: number;
  previewPage1Url?: string;
  previewPage2Url?: string;
  previewPage3Url?: string;
  error?: string;
}

export async function generatePreviewsForResource(resourceId: string): Promise<GeneratePreviewsResult> {
  const supabase = createAdminClient();

  // Load the resource — we need attachment_url + mime_type. Skip if not a PDF.
  const { data: row, error: fetchErr } = await supabase
    .from("lounge_resources")
    .select("id, attachment_url, mime_type, preview_generation_status")
    .eq("id", resourceId)
    .maybeSingle();
  if (fetchErr) return { ok: false, resourceId, error: fetchErr.message };
  if (!row) return { ok: false, resourceId, error: "not found" };

  const r = row as {
    id: string;
    attachment_url: string | null;
    mime_type: string | null;
    preview_generation_status: string;
  };

  if (r.mime_type !== "application/pdf") {
    await supabase
      .from("lounge_resources")
      .update({ preview_generation_status: "skipped" })
      .eq("id", resourceId);
    return { ok: true, resourceId };
  }
  if (!r.attachment_url) {
    return { ok: false, resourceId, error: "no attachment_url" };
  }

  // Mark processing so concurrent triggers don't double-render.
  await supabase
    .from("lounge_resources")
    .update({ preview_generation_status: "processing" })
    .eq("id", resourceId);

  try {
    const pdfResp = await fetch(r.attachment_url, { cache: "no-store" });
    if (!pdfResp.ok) throw new Error(`PDF fetch failed: ${pdfResp.status}`);
    const pdfBuffer = Buffer.from(await pdfResp.arrayBuffer());

    const { pages, totalPages } = await generatePdfPagePreviews(pdfBuffer, PAGES_TO_RENDER);

    const { default: sharp } = await import("sharp");
    const uploadedUrls: { page1?: string; page2?: string; page3?: string } = {};

    for (let i = 0; i < pages.length; i++) {
      const pageNum = i + 1;
      const isClear = pageNum === 1;
      const pipeline = sharp(pages[i]).resize({ width: PREVIEW_WIDTH, withoutEnlargement: true });
      if (!isClear) pipeline.blur(BLUR_RADIUS);
      const buf = await pipeline.png({ quality: isClear ? 88 : 70 }).toBuffer();

      const path = `${resourceId}/page-${pageNum}${isClear ? "" : "-blur"}.png`;
      const { error: upErr } = await supabase.storage
        .from(PREVIEW_BUCKET)
        .upload(path, buf, {
          contentType: "image/png",
          cacheControl: "31536000, immutable",
          upsert: true,
        });
      if (upErr) throw new Error(`upload page ${pageNum}: ${upErr.message}`);
      const { data: pub } = supabase.storage.from(PREVIEW_BUCKET).getPublicUrl(path);
      if (pageNum === 1) uploadedUrls.page1 = pub.publicUrl;
      if (pageNum === 2) uploadedUrls.page2 = pub.publicUrl;
      if (pageNum === 3) uploadedUrls.page3 = pub.publicUrl;
    }

    const { error: updErr } = await supabase
      .from("lounge_resources")
      .update({
        preview_page_1_url: uploadedUrls.page1 ?? null,
        preview_page_2_url: uploadedUrls.page2 ?? null,
        preview_page_3_url: uploadedUrls.page3 ?? null,
        total_pages: totalPages,
        preview_generation_status: "complete",
      })
      .eq("id", resourceId);
    if (updErr) throw new Error(`row update: ${updErr.message}`);

    return {
      ok: true,
      resourceId,
      totalPages,
      previewPage1Url: uploadedUrls.page1,
      previewPage2Url: uploadedUrls.page2,
      previewPage3Url: uploadedUrls.page3,
    };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    await supabase
      .from("lounge_resources")
      .update({ preview_generation_status: "failed" })
      .eq("id", resourceId);
    return { ok: false, resourceId, error: msg };
  }
}
