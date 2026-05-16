// SERVER-SIDE ONLY. Renders PDF pages to PNG Buffers via pdf-to-img.
// Do not import this from client components — the underlying engine
// (@napi-rs/canvas + pdfjs) is Node-native and will not work in a
// browser bundle.

import { pdf } from "pdf-to-img";

const DEFAULT_SCALE = 2;

export async function generatePdfThumbnail(pdfBuffer: Buffer): Promise<Buffer> {
  const document = await pdf(pdfBuffer, { scale: DEFAULT_SCALE });
  try {
    for await (const page of document) {
      return page;
    }
    throw new Error("PDF has no pages");
  } finally {
    await document.destroy();
  }
}

export async function generatePdfPagePreviews(
  pdfBuffer: Buffer,
  pageLimit: number,
): Promise<{ pages: Buffer[]; totalPages: number }> {
  const document = await pdf(pdfBuffer, { scale: DEFAULT_SCALE });
  try {
    const totalPages = document.length;
    const limit = Math.min(pageLimit, totalPages);
    const pages: Buffer[] = [];
    for (let i = 1; i <= limit; i++) {
      pages.push(await document.getPage(i));
    }
    return { pages, totalPages };
  } finally {
    await document.destroy();
  }
}
