import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BUCKET = "resource_previews";
const PATH_SUFFIX = "page-1.png";

/**
 * POST /api/library/resource/[id]/preview/sign
 *
 * Mints a single-use signed upload URL for the resource's page-1
 * preview PNG. Browser-side thumbnail generator (PdfThumbnailBackfill)
 * uploads directly to Supabase Storage at the returned URL, then calls
 * /preview/finalize to write preview_page_1_url back to the row.
 *
 * Auth: any signed-in user. Idempotent — multiple callers writing the
 * same path produces the same final URL (last-write-wins).
 *
 * Refuses if:
 *   - resource does not exist or is deleted / unapproved
 *   - resource mime_type is not application/pdf
 *   - resource already has preview_page_1_url set (avoids churn)
 */
export async function POST(_req: NextRequest, { params }: { params: { id: string } }) {
  const user = await requireAuthenticatedUser(_req);
  if (user instanceof NextResponse) return user;

  const id = String(params.id ?? "").trim();
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  const supabase = createAdminClient();

  const { data: row, error: fetchErr } = await supabase
    .from("lounge_resources")
    .select("id, mime_type, preview_page_1_url, review_status, deleted_at")
    .eq("id", id)
    .maybeSingle();
  if (fetchErr) return NextResponse.json({ error: fetchErr.message }, { status: 500 });
  if (!row) return NextResponse.json({ error: "not found" }, { status: 404 });

  const r = row as {
    id: string;
    mime_type: string | null;
    preview_page_1_url: string | null;
    review_status: string;
    deleted_at: string | null;
  };
  if (r.deleted_at) return NextResponse.json({ error: "deleted" }, { status: 410 });
  if (r.review_status !== "approved") {
    return NextResponse.json({ error: "not approved" }, { status: 403 });
  }
  if (r.mime_type !== "application/pdf") {
    return NextResponse.json({ error: "not a pdf" }, { status: 400 });
  }
  if (r.preview_page_1_url) {
    return NextResponse.json({ error: "already has preview", url: r.preview_page_1_url }, { status: 409 });
  }

  const path = `${id}/${PATH_SUFFIX}`;
  const { data: signed, error: signErr } = await supabase.storage
    .from(BUCKET)
    .createSignedUploadUrl(path);
  if (signErr) {
    return NextResponse.json({ error: `sign failed: ${signErr.message}` }, { status: 500 });
  }

  return NextResponse.json({
    bucket: BUCKET,
    path: signed.path,
    token: signed.token,
    signedUrl: signed.signedUrl,
  });
}
