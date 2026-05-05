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
  // Keep pdf-parse (and its internal pdfjs-dist dependency) as a native
  // Node.js require so webpack never tries to bundle it. Bundling it pulls
  // in browser-only DOM APIs (DOMMatrix, ImageData, Path2D) that don't
  // exist in the Node.js runtime and crash the build.
  experimental: {
    serverComponentsExternalPackages: ["pdf-parse"],
  },
};

export default nextConfig;
