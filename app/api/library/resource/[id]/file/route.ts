import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/library/resource/[id]/file
 *
 * Same-origin passthrough proxy for the raw file. The browser can't
 * fetch() the Supabase Storage URL directly because the chat-attachments
 * bucket doesn't send Access-Control-Allow-Origin for cross-origin
 * fetch (images via <img> still work, those don't need CORS). The reader
 * fetches this endpoint instead so pdfjs can hold the bytes in memory.
 *
 * Round 1 is a straight passthrough — auth-gate + stream. Future rounds
 * will gate by tier (free vs pro), bake in watermarks, and serve
 * pre-rendered page images per request.
 */
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const id = String(params.id ?? "").trim();
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  const supabase = createAdminClient();

  const { data: row, error } = await supabase
    .from("lounge_resources")
    .select("attachment_url, mime_type, file_name, review_status")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    if (/relation .* does not exist/i.test(error.message)) {
      return NextResponse.json({ error: "library not yet provisioned" }, { status: 404 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  if (!row) return NextResponse.json({ error: "not found" }, { status: 404 });

  const r = row as {
    attachment_url: string;
    mime_type: string | null;
    file_name: string | null;
    review_status: string;
  };
  if (r.review_status !== "approved") {
    return NextResponse.json({ error: "not approved" }, { status: 403 });
  }
  if (!r.attachment_url) {
    return NextResponse.json({ error: "no file on this resource" }, { status: 404 });
  }

  // Server-to-server fetch — no CORS constraint.
  let upstream: Response;
  try {
    upstream = await fetch(r.attachment_url, { cache: "no-store" });
  } catch (e) {
    return NextResponse.json(
      { error: `upstream fetch threw: ${e instanceof Error ? e.message : String(e)}` },
      { status: 502 }
    );
  }
  if (!upstream.ok) {
    return NextResponse.json(
      { error: `upstream ${upstream.status} ${upstream.statusText}` },
      { status: 502 }
    );
  }

  const body = await upstream.arrayBuffer();
  return new Response(body, {
    headers: {
      "Content-Type": r.mime_type ?? "application/octet-stream",
      "Content-Length": String(body.byteLength),
      "Cache-Control": "private, no-store, must-revalidate",
      // inline so the browser doesn't trigger a save dialog if a user
      // somehow opens this URL directly. content-disposition is also
      // why we don't want users finding this endpoint — they shouldn't.
      "Content-Disposition": `inline; filename="${(r.file_name ?? "resource").replace(/[^\w.\-]+/g, "_")}"`,
    },
  });
}
