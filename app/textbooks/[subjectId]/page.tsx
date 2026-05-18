// /textbooks/[subjectId]
//
// Dual-system router page. Reuses the original [subjectId] URL
// (so legacy /textbooks/ap-biology links keep working) but
// detects new-system slugs first and renders the new TOC. If
// the slug isn't in the new textbooks table, falls through to
// the legacy TextbookReaderShell (the textbook_products reader
// shipped earlier).

import TextbookReaderShell from "@/components/textbooks/TextbookReaderShell";
import TextbookTOC from "@/components/textbooks/TextbookTOC";
import { createAdminClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function TextbookEntryPage({
  params,
}: {
  params: Promise<{ subjectId: string }>;
}) {
  const { subjectId } = await params;
  const slug = decodeURIComponent(subjectId);

  // Is this a slug in the new textbook system?
  const sb = createAdminClient();
  const { data: tb } = await sb
    .from("textbooks")
    .select("slug")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (tb?.slug) {
    return <TextbookTOC slug={tb.slug} />;
  }

  // Fall through to the legacy product reader.
  return <TextbookReaderShell subjectId={slug} />;
}
