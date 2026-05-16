// Builds a Cloudinary fetch URL that renders a single page of a
// publicly-reachable PDF as a JPG thumbnail at the CDN. No server-side
// rendering — Cloudinary pulls the PDF on first request, caches the
// transformed output, and serves subsequent hits from cache.
//
// Requires NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME (Cloudinary cloud name) at
// runtime. Returns null when unset so the library card can fall back to
// no-preview rendering rather than emit a broken URL.

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const DEFAULT_WIDTH = 800;

export function pdfPagePreviewUrl(
  sourceUrl: string,
  options?: { page?: number; width?: number; blur?: boolean },
): string | null {
  if (!CLOUDINARY_CLOUD_NAME) return null;
  if (!sourceUrl) return null;
  const page = options?.page ?? 1;
  const width = options?.width ?? DEFAULT_WIDTH;
  const blur = options?.blur ? ",e_blur:1000" : "";
  const transforms = `f_jpg,pg_${page},w_${width},q_auto${blur}`;
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/fetch/${transforms}/${encodeURIComponent(sourceUrl)}`;
}
