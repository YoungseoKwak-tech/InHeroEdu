// GET /api/textbooks/[slug]/chapters/[chapterNumber]
//
// Reader-page payload for one chapter: the chapter row (title +
// subtitle + learning objectives + section titles + pdf_url +
// page_count + estimated_read_time + ai_difficulty + ordinal), the
// parent textbook (slug + title), and inline previous/next links
// so the reader's bottom-nav doesn't need a second round-trip.
//
// 404 if the textbook isn't published or the chapter number is
// unknown. Anonymous viewers can read.

import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface ChapterRow {
  id: string;
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
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string; chapterNumber: string }> },
) {
  const { slug, chapterNumber } = await params;
  const sb = createAdminClient();

  const { data: textbook } = await sb
    .from("textbooks")
    .select("id, slug, title")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();
  if (!textbook) return NextResponse.json({ error: "textbook not found" }, { status: 404 });

  // Fetch every chapter once and find this one + its neighbors by ordinal.
  // 65 rows is tiny; this avoids three separate queries.
  const { data: chaptersData, error: chErr } = await sb
    .from("textbook_chapters")
    .select("id, chapter_number, unit_number, chapter_index, title, subtitle, learning_objectives, section_titles, ai_summary, ai_difficulty, pdf_url, page_count, estimated_read_time, ordinal")
    .eq("textbook_id", textbook.id)
    .order("ordinal", { ascending: true });
  if (chErr) return NextResponse.json({ error: chErr.message }, { status: 500 });

  const chapters = (chaptersData ?? []) as ChapterRow[];
  const idx = chapters.findIndex((c) => c.chapter_number === decodeURIComponent(chapterNumber));
  if (idx === -1) return NextResponse.json({ error: "chapter not found" }, { status: 404 });

  const chapter = chapters[idx];
  const prev = idx > 0 ? chapters[idx - 1] : null;
  const next = idx < chapters.length - 1 ? chapters[idx + 1] : null;

  // Project the prev/next entries down to just what the bottom-nav needs.
  const navProject = (c: ChapterRow | null) =>
    c
      ? {
          chapter_number: c.chapter_number,
          title: c.title,
          unit_number: c.unit_number,
        }
      : null;

  // Project pdf_url down to a has_pdf boolean — the raw Storage URL
  // must never reach the client (it would bypass the purchase gate on
  // the /file proxy).
  const { pdf_url, ...chapterPublic } = chapter;

  return NextResponse.json({
    ok: true,
    chapter: { ...chapterPublic, has_pdf: !!pdf_url },
    navigation: {
      previous: navProject(prev),
      next: navProject(next),
      textbook_slug: textbook.slug,
      textbook_title: textbook.title,
      ordinal: chapter.ordinal,
      total_chapters: chapters.length,
    },
  });
}
