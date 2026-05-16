// Server-side preview generator for lounge_resources PDFs.
//
// Renders pages 1–3 to PNGs and writes them to the resource_previews
// Supabase Storage bucket. Page 1 is full clarity; pages 2 and 3 are
// hard-blurred with Sharp so the URL itself can only ever return a
// blurred image — no client-side blur ever, because anyone who knows
// the URL can fetch it directly. Updates lounge_resources with the
// resulting URLs + total_pages + preview_generation_status.
//
// Implementation note: was originally written against
// pdf-to-png-converter, but that package loads
// pdfjs-dist/legacy/build/pdf.worker.mjs via require.resolve at
// runtime, which fails in Vercel's serverless bundle. Re-implemented
// directly against pdfjs-dist + @napi-rs/canvas with
// disableWorker: true so everything runs on the function's main
// thread. No worker file required.

import { createAdminClient } from "@/lib/supabase";

const PREVIEW_BUCKET = "resource_previews";
const PREVIEW_WIDTH = 800;
const RENDER_SCALE = 1.8;
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
    // Fetch the PDF bytes.
    const pdfResp = await fetch(r.attachment_url, { cache: "no-store" });
    if (!pdfResp.ok) throw new Error(`PDF fetch failed: ${pdfResp.status}`);
    const pdfBytes = new Uint8Array(await pdfResp.arrayBuffer());

    // pdfjs-dist v5 references DOMMatrix, ImageData, and Path2D during
    // page rendering. Those are browser globals; in Node we polyfill
    // them with @napi-rs/canvas's drop-in implementations. ORDER MATTERS:
    // the polyfills must be on globalThis BEFORE pdfjs's module body
    // evaluates, otherwise pdfjs records `undefined` references at
    // import time and rendering throws "DOMMatrix is not defined".
    const canvasMod = await import("@napi-rs/canvas");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const g = globalThis as any;
    if (!g.DOMMatrix && canvasMod.DOMMatrix) g.DOMMatrix = canvasMod.DOMMatrix;
    if (!g.ImageData && canvasMod.ImageData) g.ImageData = canvasMod.ImageData;
    if (!g.Path2D && canvasMod.Path2D) g.Path2D = canvasMod.Path2D;

    // Load pdfjs. DO NOT touch GlobalWorkerOptions.workerSrc — pdfjs
    // type-checks it and rejects anything that isn't a non-empty
    // string ("Invalid workerSrc type"). Leaving it at its default
    // combined with disableWorker:true on the loading task is what
    // tells pdfjs to run on the function's main thread, which is the
    // only mode that works in Vercel serverless (no worker file ships
    // in the bundle, no Web Worker constructor exists in Node).
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const pdfjsLib: any = await import("pdfjs-dist/legacy/build/pdf.mjs");

    const loadingTask = pdfjsLib.getDocument({
      data: pdfBytes,
      disableWorker: true,
      // Standard fonts can't be fetched in Node — disable font face
      // rendering so the engine falls back to outline-only glyphs.
      // Output is slightly less faithful for embedded display fonts
      // but doesn't block rendering on missing assets.
      disableFontFace: true,
      useSystemFonts: false,
      isEvalSupported: false,
      // Tame verbosity in serverless logs.
      verbosity: 0,
    });
    const pdf = await loadingTask.promise;
    const totalPages: number = pdf.numPages ?? 0;

    // createCanvas from the same @napi-rs/canvas module loaded above
    // for the globalThis polyfills — no second import needed.
    const { createCanvas } = canvasMod;
    const { default: sharp } = await import("sharp");

    const uploadedUrls: { page1?: string; page2?: string; page3?: string } = {};
    const pageLimit = Math.min(PAGES_TO_RENDER, totalPages);

    for (let pageNum = 1; pageNum <= pageLimit; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const viewport = page.getViewport({ scale: RENDER_SCALE });
      const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height));
      const ctx = canvas.getContext("2d");
      // pdfjs writes RGBA into the canvas context; fill with white
      // first so transparent regions of the PDF (most of them) read
      // as paper, not as an alpha hole.
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      // The pdfjs type for canvasContext is a CanvasRenderingContext2D
      // from the DOM lib; @napi-rs/canvas matches the surface at
      // runtime but TS doesn't see the equivalence.
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await page.render({ canvasContext: ctx as any, viewport }).promise;

      const rawPng = canvas.toBuffer("image/png");
      const isClear = pageNum === 1;
      const pipeline = sharp(rawPng).resize({ width: PREVIEW_WIDTH, withoutEnlargement: true });
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

    // Free pdfjs worker-side data; cheap and avoids accumulated state
    // if many resources are processed in one function lifetime.
    try { await pdf.cleanup?.(); } catch { /* ignore */ }
    try { await pdf.destroy?.(); } catch { /* ignore */ }

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
