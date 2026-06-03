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
};

export default nextConfig;
