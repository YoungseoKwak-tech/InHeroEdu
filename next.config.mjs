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
  // them. They each have native (.node) binaries or browser-only APIs
  // (pdf-parse / pdfjs-dist) that webpack chokes on:
  //   pdf-parse            — internal pdfjs-dist pulls DOMMatrix/ImageData
  //   sharp                — libvips native module
  //   pdf-to-png-converter — depends on @napi-rs/canvas .node binary
  //   @napi-rs/canvas      — native canvas binary
  experimental: {
    serverComponentsExternalPackages: [
      "pdf-parse",
      "sharp",
      "pdf-to-png-converter",
      "@napi-rs/canvas",
    ],
  },
};

export default nextConfig;
