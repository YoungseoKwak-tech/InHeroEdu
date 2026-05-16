import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BUCKET = "resource_previews";
const PATH_SUFFIX = "page-1.jpg";

/**
 * POST /api/library/resource/[id]/preview/finalize
 *
 * Called by PdfThumbnailBackfill after a successful upload to the
 * signed URL minted by /preview/sign. Looks up the public URL for the
 * uploaded object and writes it to lounge_resources.preview_page_1_url.
 *
 * Auth: signed-in user. Last-write-wins (no version check) — concurrent
 * generators both PATCH the same URL, which is harmless because the
 * upload path is deterministic.
 */
export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const id = String(params.id ?? "").trim();
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  const supabase = createAdminClient();

  const path = `${id}/${PATH_SUFFIX}`;
  const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(path);
  const publicUrl = pub?.publicUrl;
  if (!publicUrl) {
    return NextResponse.json({ error: "could not resolve public url" }, { status: 500 });
  }

  const { error: updErr } = await supabase
    .from("lounge_resources")
    .update({ preview_page_1_url: publicUrl, preview_generation_status: "complete" })
    .eq("id", id);
  if (updErr) {
    return NextResponse.json({ error: updErr.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, previewPage1Url: publicUrl });
}
