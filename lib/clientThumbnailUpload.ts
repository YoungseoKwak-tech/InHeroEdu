// Browser helper. Given a generated JPEG blob and a resource id,
// runs the existing sign → PUT-to-Supabase → finalize chain so the
// row's preview_page_1_url gets populated. Returns the public URL on
// success, null on any failure (caller decides whether to surface).

import { authFetch } from "@/lib/client-auth";

export async function uploadThumbnailForResource(
  resourceId: string,
  blob: Blob,
): Promise<string | null> {
  try {
    const signResp = await authFetch(`/api/library/resource/${resourceId}/preview/sign`, {
      method: "POST",
    });
    if (signResp.status === 409) {
      // Another viewer already generated it; nothing to do.
      const j = (await signResp.json().catch(() => null)) as { url?: string } | null;
      return j?.url ?? null;
    }
    if (!signResp.ok) return null;
    const signed = (await signResp.json()) as {
      signedUrl: string;
      path: string;
      token: string;
    };

    const putResp = await fetch(signed.signedUrl, {
      method: "PUT",
      headers: { "Content-Type": "image/jpeg" },
      body: blob,
    });
    if (!putResp.ok && putResp.status !== 200) return null;

    const finalizeResp = await authFetch(
      `/api/library/resource/${resourceId}/preview/finalize`,
      { method: "POST" },
    );
    if (!finalizeResp.ok) return null;
    const finalized = (await finalizeResp.json()) as { previewPage1Url?: string };
    return finalized.previewPage1Url ?? null;
  } catch {
    return null;
  }
}
