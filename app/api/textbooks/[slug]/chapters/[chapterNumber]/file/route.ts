// GET /api/textbooks/[slug]/chapters/[chapterNumber]/file
//
// Same-origin proxy for a chapter PDF, mirroring
// /api/library/resource/[id]/file. The cosmic PdfReader fetches
// bytes through here so pdfjs can hold them in memory; direct
// fetch to Supabase Storage from the browser fails when the
// bucket doesn't send Access-Control-Allow-Origin.
//
// Auth-gated AND purchase-gated: reading a chapter requires the
// subject's Elite pass ($49/mo single subject via "single:<subjectId>"
// orders, or the $199/mo all-subject "novapass") — enforced through
// hasTextbookAccess(), which also honors comp emails and the
// FREE_FOR_ALL flag. Denied requests get 403 { error: "elite_required" }
// so the reader can render an upgrade screen instead of a raw error.
//
// Streams the PDF inline with no-store cache so a watermark/
// personalization layer can slot in later without browser caching.

import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import { hasTextbookAccess } from "@/lib/textbookAccess";
import { subjectIdForTextbookSlug } from "@/lib/textbookCatalog";
import { isTextbookLaunched } from "@/lib/launchedTextbooks";
import { isAdminEmail } from "@/lib/adminEmails";

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

  // Coming-soon ("런칭 예정") titles are not readable yet — block their PDFs for
  // everyone except admins (who QA them before launch).
  if (!isTextbookLaunched(textbook.slug as string) && !isAdminEmail(user.email)) {
    return NextResponse.json({ error: "coming_soon" }, { status: 403 });
  }

  // Purchase gate. Unknown slugs fail closed (locked for everyone) so a
  // new title can't ship accidentally free — add its mapping to
  // lib/textbookCatalog.ts when publishing.
  const subjectId = subjectIdForTextbookSlug(textbook.slug as string);
  const access = subjectId
    ? await hasTextbookAccess({ userId: user.id, email: user.email, subjectId })
    : { allowed: false as const, reason: "denied" as const };
  if (!access.allowed) {
    return NextResponse.json(
      { error: "elite_required", subjectId },
      { status: 403 }
    );
  }

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
