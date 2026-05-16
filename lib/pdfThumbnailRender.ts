// Browser-only. Renders page 1 of a PDF (passed as bytes) to a JPEG
// Blob via pdfjs + the worker shipped at /pdf.worker.min.mjs. Used by
// both the library-card backfill path (fetches PDF from the proxy) and
// the upload-time eager-generation path (uses the local File the user
// just picked).

const PDFJS_VERSION = "5.7.284";

export interface RenderOptions {
  targetWidth?: number;
  quality?: number;
}

const DEFAULT_TARGET_WIDTH = 800;
const DEFAULT_QUALITY = 0.85;

export async function renderPdfPage1ToJpegBlob(
  bytes: Uint8Array,
  opts: RenderOptions = {},
): Promise<Blob> {
  const targetWidth = opts.targetWidth ?? DEFAULT_TARGET_WIDTH;
  const quality = opts.quality ?? DEFAULT_QUALITY;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pdfjsLib: any = await import("pdfjs-dist/legacy/build/pdf.mjs");
  pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

  const loadingTask = pdfjsLib.getDocument({
    data: bytes,
    cMapUrl: `https://cdn.jsdelivr.net/npm/pdfjs-dist@${PDFJS_VERSION}/cmaps/`,
    cMapPacked: true,
    standardFontDataUrl: `https://cdn.jsdelivr.net/npm/pdfjs-dist@${PDFJS_VERSION}/standard_fonts/`,
  });
  const pdf = await loadingTask.promise;
  const page = await pdf.getPage(1);
  const baseViewport = page.getViewport({ scale: 1 });
  const scale = targetWidth / baseViewport.width;
  const viewport = page.getViewport({ scale });

  const canvas = document.createElement("canvas");
  canvas.width = Math.ceil(viewport.width);
  canvas.height = Math.ceil(viewport.height);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("no 2d context");
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  await page.render({ canvasContext: ctx, viewport }).promise;

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/jpeg", quality),
  );
  if (!blob) throw new Error("toBlob returned null");
  return blob;
}
