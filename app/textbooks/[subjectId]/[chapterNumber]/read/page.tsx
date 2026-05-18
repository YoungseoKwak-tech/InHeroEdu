// /textbooks/[subjectId]/[chapterNumber]/read — full-screen
// chapter reader. Mounts the same cosmic <PdfReader> the library
// uses, with a `source` prop that points pdfjs at the chapter
// PDF via the /file proxy (no Supabase CORS surprises).
//
// Back arrow + close × return to the chapter overview at
// /textbooks/[slug]/[chapter] (objectives + nav), not all the way
// to the TOC — chapter overview is the reader's direct parent.

import { notFound } from "next/navigation";
import PdfReader from "@/app/library/[resourceId]/read/PdfReader";
import { createAdminClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

interface ChapterRow {
  chapter_number: string;
  unit_number: number;
  chapter_index: number;
  title: string;
  subtitle: string | null;
  page_count: number | null;
  estimated_read_time: number | null;
}

export default async function ChapterReadPage({
  params,
}: {
  params: Promise<{ subjectId: string; chapterNumber: string }>;
}) {
  const { subjectId, chapterNumber } = await params;
  const slug = decodeURIComponent(subjectId);
  const cnum = decodeURIComponent(chapterNumber);

  const sb = createAdminClient();
  const { data: textbook } = await sb
    .from("textbooks")
    .select("id, slug, title")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();
  if (!textbook) notFound();

  const { data: chapter } = await sb
    .from("textbook_chapters")
    .select("chapter_number, unit_number, chapter_index, title, subtitle, page_count, estimated_read_time")
    .eq("textbook_id", textbook.id)
    .eq("chapter_number", cnum)
    .maybeSingle<ChapterRow>();
  if (!chapter) notFound();

  const overviewHref = `/textbooks/${textbook.slug}/${chapter.chapter_number}`;
  const eyebrow = `${textbook.title} · UNIT ${String(chapter.unit_number).padStart(2, "0")} · CH ${chapter.chapter_number}`;
  const subtitleBits: string[] = [];
  if (chapter.subtitle) subtitleBits.push(chapter.subtitle);
  if (chapter.page_count) subtitleBits.push(`${chapter.page_count} pages`);
  if (chapter.estimated_read_time) subtitleBits.push(`~${chapter.estimated_read_time} min`);

  return (
    <PdfReader
      source={{
        fileUrl: `/api/textbooks/${encodeURIComponent(textbook.slug as string)}/chapters/${encodeURIComponent(chapter.chapter_number)}/file`,
        title: chapter.title,
        subtitle: subtitleBits.join(" · ") || undefined,
        eyebrow,
        backHref: overviewHref,
        closeHref: overviewHref,
      }}
    />
  );
}
