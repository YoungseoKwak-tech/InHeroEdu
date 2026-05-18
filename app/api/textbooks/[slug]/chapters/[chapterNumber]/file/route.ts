// GET /api/textbooks/[slug]/chapters/[chapterNumber]/file
//
// Same-origin proxy for a chapter PDF, mirroring
// /api/library/resource/[id]/file. The cosmic PdfReader fetches
// bytes through here so pdfjs can hold them in memory; direct
// fetch to Supabase Storage from the browser fails when the
// bucket doesn't send Access-Control-Allow-Origin.
//
// Auth-gated (same as the library proxy). Streams the PDF inline
// with no-store cache so a watermark/personalization layer can
// slot in later without browser caching.

import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string; chapterNumber: string }> },
) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const { slug, chapterNumber } = await params;
  const cnum = decodeURIComponent(chapterNumber);
  const sb = createAdminClient();

  // Resolve textbook → chapter → pdf_url.
  const { data: textbook } = await sb
    .from("textbooks")
    .select("id, slug")
    .eq("slug", decodeURIComponent(slug))
    .eq("is_published", true)
    .maybeSingle();
  if (!textbook) return NextResponse.json({ error: "textbook not found" }, { status: 404 });

  const { data: chapter } = await sb
    .from("textbook_chapters")
    .select("pdf_url, title, chapter_number")
    .eq("textbook_id", textbook.id)
    .eq("chapter_number", cnum)
    .maybeSingle();
  if (!chapter) return NextResponse.json({ error: "chapter not found" }, { status: 404 });
  if (!chapter.pdf_url) return NextResponse.json({ error: "chapter has no pdf yet" }, { status: 404 });

  let upstream: Response;
  try {
    upstream = await fetch(chapter.pdf_url, { cache: "no-store" });
  } catch (e) {
    return NextResponse.json(
      { error: `upstream fetch threw: ${e instanceof Error ? e.message : String(e)}` },
      { status: 502 },
    );
  }
  if (!upstream.ok) {
    return NextResponse.json(
      { error: `upstream ${upstream.status} ${upstream.statusText}` },
      { status: 502 },
    );
  }
  const body = await upstream.arrayBuffer();
  const safeName = `${chapter.chapter_number}-${(chapter.title as string).replace(/[^\w.\-]+/g, "_")}.pdf`;
  return new Response(body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Length": String(body.byteLength),
      "Cache-Control": "private, no-store, must-revalidate",
      "Content-Disposition": `inline; filename="${safeName}"`,
    },
  });
}
