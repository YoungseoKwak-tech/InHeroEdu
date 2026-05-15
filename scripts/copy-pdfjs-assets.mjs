// Copy pdfjs-dist cmaps + standard fonts into /public so the PDF reader
// can fetch them at runtime. Required for any PDF containing CIDFont/CMap-
// encoded glyphs (most non-trivial PDFs) — without these assets, pdfjs
// renders the page with missing glyphs (effectively blank).
//
// Runs from package.json "postinstall". Safe to re-run: cpSync with
// force:true overwrites. Skips gracefully if pdfjs-dist isn't installed
// yet (e.g., a partial CI step).

import { cpSync, existsSync } from "node:fs";
import { join } from "node:path";

const pdfjsRoot = join("node_modules", "pdfjs-dist");
if (!existsSync(pdfjsRoot)) {
  console.warn("[copy-pdfjs-assets] node_modules/pdfjs-dist not found; skipping.");
  process.exit(0);
}

const targets = [
  ["cmaps", "public/cmaps"],
  ["standard_fonts", "public/standard_fonts"],
];

for (const [from, to] of targets) {
  const src = join(pdfjsRoot, from);
  if (!existsSync(src)) {
    console.warn(`[copy-pdfjs-assets] ${src} missing — skipping ${to}`);
    continue;
  }
  cpSync(src, to, { recursive: true, force: true });
  console.log(`[copy-pdfjs-assets] ${src} → ${to}`);
}
