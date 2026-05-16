// SERVER-SIDE ONLY. Renders PDF pages to PNG Buffers via unpdf.
// Do not import this from client components — the underlying canvas
// implementation (@napi-rs/canvas) is Node-native.
//
// unpdf ships a serverless-friendly pdfjs fork and does not depend on
// browser globals like DOMMatrix / ImageData / Path2D at import time,
// which is what made vanilla pdfjs-dist structurally fragile on
// Vercel serverless.

import { getDocumentProxy, renderPageAsImage } from "unpdf";

const DEFAULT_SCALE = 2;

// Lazy dynamic import so the .node binary stays out of any client
// bundle that accidentally pulls this module's type imports.
const canvasImport = () => import("@napi-rs/canvas");

export async function generatePdfThumbnail(pdfBuffer: Buffer): Promise<Buffer> {
  const data = new Uint8Array(pdfBuffer);
  const proxy = await getDocumentProxy(data);
  if (proxy.numPages < 1) throw new Error("PDF has no pages");
  const ab = await renderPageAsImage(proxy, 1, { canvasImport, scale: DEFAULT_SCALE });
  return Buffer.from(ab);
}

export async function generatePdfPagePreviews(
  pdfBuffer: Buffer,
  pageLimit: number,
): Promise<{ pages: Buffer[]; totalPages: number }> {
  const data = new Uint8Array(pdfBuffer);
  const proxy = await getDocumentProxy(data);
  const totalPages = proxy.numPages;
  const limit = Math.min(pageLimit, totalPages);
  const pages: Buffer[] = [];
  for (let i = 1; i <= limit; i++) {
    const ab = await renderPageAsImage(proxy, i, { canvasImport, scale: DEFAULT_SCALE });
    pages.push(Buffer.from(ab));
  }
  return { pages, totalPages };
}
