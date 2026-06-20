// GET /api/textbooks/[slug]
//
// Full TOC payload for one textbook: the textbook row, all units
// (ordinal), all chapters under each unit (ordinal), and — when
// the request is authenticated — the viewer's progress per
// chapter so the TOC can light up status icons.
//
// Returns 404 if the slug is unknown or the textbook is not yet
// published. Authentication is optional; without it, progress is
// omitted (TOC still renders, every chapter shows "not started").

import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { getAuthenticatedUser } from "@/lib/auth";
import { isTextbookLaunched } from "@/lib/launchedTextbooks";
import { isAdminEmail } from "@/lib/adminEmails";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface ChapterRow {
  id: string;
  unit_id: string;
  chapter_number: string;
  unit_number: number;
  chapter_index: number;
  title: string;
  subtitle: string | null;
  learning_objectives: unknown;
  section_titles: unknown;
  ai_summary: string | null;
  ai_difficulty: string | null;
  pdf_url: string | null;
  page_count: number | null;
  estimated_read_time: number | null;
  ordinal: number;
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const sb = createAdminClient();

  const { data: textbook, error: tbErr } = await sb
    .from("textbooks")
    .select("id, slug, title, subtitle, description, author_name, total_pages, total_chapters, total_units, cover_url, is_premium, created_at")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();
  if (tbErr) return NextResponse.json({ error: tbErr.message }, { status: 500 });
  if (!textbook) return NextResponse.json({ error: "not found" }, { status: 404 });

  // Coming-soon ("런칭 예정") titles: hide the TOC from everyone but admins
  // (who QA before launch) so the reader can't be opened by direct URL.
  if (!isTextbookLaunched(textbook.slug as string)) {
    const u = await getAuthenticatedUser(req);
    const email = u && !(u instanceof NextResponse) ? u.email : null;
    if (!isAdminEmail(email)) return NextResponse.json({ error: "coming_soon" }, { status: 404 });
  }

  const [unitsRes, chaptersRes] = await Promise.all([
    sb.from("textbook_units")
      .select("id, unit_number, title, description, ordinal, total_chapters, page_start, page_end")
      .eq("textbook_id", textbook.id)
      .order("ordinal", { ascending: true }),
    sb.from("textbook_chapters")
      .select("id, unit_id, chapter_number, unit_number, chapter_index, title, subtitle, learning_objectives, section_titles, ai_summary, ai_difficulty, pdf_url, page_count, estimated_read_time, ordinal")
      .eq("textbook_id", textbook.id)
      .order("ordinal", { ascending: true }),
  ]);
  if (unitsRes.error) return NextResponse.json({ error: unitsRes.error.message }, { status: 500 });
  if (chaptersRes.error) return NextResponse.json({ error: chaptersRes.error.message }, { status: 500 });

  // Per-user progress (optional, only if authed).
  const user = await getAuthenticatedUser(req);
  let progress: Record<string, { status: string; last_opened_at: string | null; completed_at: string | null }> = {};
  if (user && !(user instanceof NextResponse)) {
    const { data: prog } = await sb
      .from("student_chapter_progress")
      .select("chapter_id, status, last_opened_at, completed_at")
      .eq("user_id", user.id)
      .eq("textbook_id", textbook.id);
    for (const row of prog ?? []) {
      progress[row.chapter_id as string] = {
        status: row.status as string,
        last_opened_at: row.last_opened_at as string | null,
        completed_at: row.completed_at as string | null,
      };
    }
  }

  // Bucket chapters under their unit so the client doesn't have to.
  // pdf_url is projected down to a has_pdf boolean — the raw Supabase
  // Storage URL must never reach the client (it would bypass the
  // purchase gate on the /file proxy).
  const chaptersByUnit = new Map<string, Array<Omit<ChapterRow, "pdf_url"> & { has_pdf: boolean }>>();
  for (const c of (chaptersRes.data ?? []) as ChapterRow[]) {
    const { pdf_url, ...rest } = c;
    const list = chaptersByUnit.get(c.unit_id) ?? [];
    list.push({ ...rest, has_pdf: !!pdf_url });
    chaptersByUnit.set(c.unit_id, list);
  }
  const units = (unitsRes.data ?? []).map((u) => ({
    ...u,
    chapters: chaptersByUnit.get(u.id as string) ?? [],
  }));

  return NextResponse.json({ ok: true, textbook, units, progress });
}
