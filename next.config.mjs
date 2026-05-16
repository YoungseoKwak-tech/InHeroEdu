/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
    ],
  },
  // Keep these as native Node requires so webpack doesn't try to bundle
  // them. They each have native (.node) binaries, browser-only APIs,
  // or relative dynamic imports webpack can't statically trace:
  //   pdf-parse            — internal pdfjs-dist pulls DOMMatrix/ImageData
  //   pdfjs-dist           — setupFakeWorkerGlobal does
  //                          `await import("../pdf.worker.mjs")`. Webpack
  //                          bundles pdf.mjs into a chunk but the worker
  //                          sibling isn't traced, so at runtime in the
  //                          serverless function the import 404s with
  //                          "Cannot find module ... imported from
  //                          /var/task/.next/server/chunks/XXXX.js". As
  //                          an external, the require resolves to the
  //                          real file in node_modules and the fake
  //                          worker spins up on the main thread.
  //   sharp                — libvips native module
  //   unpdf                — serverless-friendly pdfjs fork + node
  //                          canvas factory; uses @napi-rs/canvas at
  //                          runtime, must not be webpack-bundled
  //   @napi-rs/canvas      — native canvas binary
  experimental: {
    serverComponentsExternalPackages: [
      "pdf-parse",
      "pdfjs-dist",
      "sharp",
      "unpdf",
      "@napi-rs/canvas",
    ],
    // Force-include the @napi-rs/canvas package + its platform-specific
    // binary siblings into the function bundle. Without this, Next.js's
    // static analysis can't see `() => import("@napi-rs/canvas")`, so
    // node-file-tracer skips it and the function bundle on Vercel has
    // no `/var/task/node_modules/@napi-rs/canvas` to require from at
    // runtime. The `-*` glob captures the per-platform binary packages
    // (e.g. @napi-rs/canvas-linux-x64-gnu) that the main package
    // dynamically loads at startup.
    outputFileTracingIncludes: {
      "/api/admin/preview-backfill": [
        "./node_modules/@napi-rs/canvas/**/*",
        "./node_modules/@napi-rs/canvas-*/**/*",
      ],
      // Catch-all for any other admin route that ends up calling the
      // thumbnail generator (e.g. lesson-material upload).
      "/api/admin/**/*": [
        "./node_modules/@napi-rs/canvas/**/*",
        "./node_modules/@napi-rs/canvas-*/**/*",
      ],
    },
  },
};

export default nextConfig;
