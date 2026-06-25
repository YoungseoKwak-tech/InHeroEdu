import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
    ],
  },
  // Keep these as native Node requires so webpack doesn't try to bundle
  // them. Both have native binaries or relative dynamic imports that
  // webpack can't statically trace:
  //   pdf-parse   — internal pdfjs-dist pulls DOMMatrix/ImageData
  //   pdfjs-dist  — client-side reader uses the legacy build; its
  //                 setupFakeWorkerGlobal does a sibling `await import`
  //                 webpack can't trace, so external + real node_modules
  //                 path is the only thing that works at runtime
  serverExternalPackages: [
    "pdf-parse",
    "pdfjs-dist",
  ],
  // Ship the gated PDFs with their API routes on Vercel (the routes read them
  // from process.cwd(), which the tracer can't resolve statically).
  outputFileTracingIncludes: {
    "/api/parents/story/file": ["./private-docs/ivy-engineering-journey.pdf"],
    "/api/parents/essay/file": ["./public/parents-docs/cornell-bme-essay-_q7m2x9p4k.pdf"],
  },
  // Those same process.cwd() reads make Next's tracer conservatively sweep the
  // whole working dir into the lambda — pushing api/parents/essay/file past
  // Vercel's 250MB function limit (471MB). These heavy source artifacts (seed
  // corpus, textbook PDFs, seminar media, slide decks, cover images) are never
  // needed at runtime; exclude them from EVERY function's trace. The runtime
  // PDFs are re-included explicitly above, so they survive.
  outputFileTracingExcludes: {
    "*": [
      "scripts/question-bank-seed/**",
      "scripts/textbook/**",
      "chrome/**",
      "docs/**",
      "AP_*_PDFs_*/**",
      "AP_*_build/**",
      "합격/**",
      "**/*.mp4",
      "**/*.key",
      "**/*.pptx",
      "**/*.docx",
      "*.pdf",
      "AP_Biology_ultimate*",
      "*.png",
    ],
  },
};

export default nextConfig;
