// Recommendation matcher — given a study plan's exam selections,
// returns the textbook chapters, lounges, and clubs we should
// surface on /my-plan. Pure DB reads; no AI. Service-role client
// so we can join across schemas without per-user RLS friction
// (callers must already have authenticated the user).

import type { SupabaseClient } from "@supabase/supabase-js";
import { findExam, type ExamCatalogEntry } from "./exams";
import type { ExamSelection } from "./generate-schedule";

export interface MaterialRec {
  id: string;
  title: string;
  type: "textbook_chapter";
  course_slug: string;
  chapter_number: string;
  unit_number: number;
  estimated_time_min: number;
  href: string;
}

export interface LoungeRec {
  slug: string;
  name: string;
  href: string;
  subject_category: string | null;
}

export interface ClubRec {
  slug: string;
  name: string;
  glyph: string;
  accent: string;
  why_recommended: string;
  href: string;
}

export interface RecommendationBundle {
  materials: MaterialRec[];
  lounges: LoungeRec[];
  clubs: ClubRec[];
  enrichedExams: ExamSelection[];
}

// Which clubs we suggest based on selected exam slugs.
// Keys are exam slugs; values are the club slugs to recommend +
// why we picked it.
const CLUB_MATCHES: Record<string, { clubSlug: string; reason: string }> = {
  "ap-bio":          { clubSlug: "research-society", reason: "Bio research opportunities" },
  "ap-chem":         { clubSlug: "research-society", reason: "Lab + research pipeline" },
  "ap-physics-1":    { clubSlug: "olympiad-stack",   reason: "Physics olympiad track" },
  "ap-physics-c":    { clubSlug: "olympiad-stack",   reason: "Physics olympiad track" },
  "ap-calc-ab":      { clubSlug: "olympiad-stack",   reason: "Math olympiad foundations" },
  "ap-calc-bc":      { clubSlug: "olympiad-stack",   reason: "Math olympiad track" },
  "ap-cs-a":         { clubSlug: "the-stack",        reason: "Build + ship CS projects" },
  "ap-csp":          { clubSlug: "the-stack",        reason: "Build + ship CS projects" },
  "ap-us-hist":      { clubSlug: "civic-builders",   reason: "Civic + policy work" },
  "ap-world":        { clubSlug: "civic-builders",   reason: "Civic + policy work" },
  "common-app":      { clubSlug: "founders-lab",     reason: "Founder essays + projects" },
  "supplements":     { clubSlug: "founders-lab",     reason: "Founder essays + projects" },
};

export async function matchRecommendations(
  sb: SupabaseClient,
  exams: ExamSelection[],
  userId: string,
): Promise<RecommendationBundle> {
  // ── 1. Materials + enrich each exam with textbook + next-chapter
  const enrichedExams: ExamSelection[] = [];
  const materials: MaterialRec[] = [];

  for (const exam of exams) {
    const catalog = findExam(exam.slug);
    const courseSlug = catalog?.textbook_course_slug;
    const enriched: ExamSelection = { ...exam };

    if (courseSlug) {
      const { data: book } = await sb
        .from("textbooks")
        .select("id, total_chapters")
        .eq("course_slug", courseSlug)
        .eq("is_published", true)
        .maybeSingle();

      const textbookId = book?.id as string | undefined;
      if (textbookId) {
        enriched.textbook_id = textbookId;
        enriched.total_chapters = book?.total_chapters ?? null;

        // What's the next chapter the user hasn't completed?
        const { data: progress } = await sb
          .from("student_chapter_progress")
          .select("chapter_id")
          .eq("user_id", userId)
          .eq("textbook_id", textbookId)
          .eq("status", "completed");
        const completedIds = new Set((progress ?? []).map((r) => r.chapter_id as string));

        const { data: chapters } = await sb
          .from("textbook_chapters")
          .select("id, chapter_number, title, unit_number, estimated_read_time, ordinal")
          .eq("textbook_id", textbookId)
          .order("ordinal", { ascending: true })
          .limit(50);

        const upcoming = (chapters ?? []).filter((c) => !completedIds.has(c.id as string));
        const nextThree = upcoming.slice(0, 3);
        if (nextThree[0]) {
          enriched.next_chapter_id = nextThree[0].id as string;
          enriched.next_chapter_number = nextThree[0].chapter_number as string;
          enriched.next_chapter_title = nextThree[0].title as string;
        }
        for (const c of nextThree) {
          materials.push({
            id: c.id as string,
            title: c.title as string,
            type: "textbook_chapter",
            course_slug: courseSlug,
            chapter_number: c.chapter_number as string,
            unit_number: c.unit_number as number,
            estimated_time_min: (c.estimated_read_time as number) ?? 30,
            href: `/textbooks/ap-bio-ultimate/${c.chapter_number}`,
          });
        }
      }
    }
    enrichedExams.push(enriched);
  }

  // ── 2. Lounges — every exam's mapped lounge, dedup
  const seenLoungeSlugs = new Set<string>();
  const loungeSlugs: string[] = [];
  for (const exam of exams) {
    const lounge = findExam(exam.slug)?.lounge_slug;
    if (lounge && !seenLoungeSlugs.has(lounge)) {
      seenLoungeSlugs.add(lounge);
      loungeSlugs.push(lounge);
    }
  }
  let lounges: LoungeRec[] = [];
  if (loungeSlugs.length > 0) {
    const { data } = await sb
      .from("lounges")
      .select("slug, name, subject_category")
      .in("slug", loungeSlugs)
      .eq("is_active", true);
    lounges = (data ?? []).map((l) => ({
      slug: l.slug as string,
      name: l.name as string,
      href: `/lounges/${l.slug}`,
      subject_category: (l.subject_category as string) ?? null,
    }));
  }

  // ── 3. Clubs — collect matched club slugs + reason; dedup; hydrate
  const clubMatchBySlug = new Map<string, string>();
  for (const exam of exams) {
    const match = CLUB_MATCHES[exam.slug];
    if (match && !clubMatchBySlug.has(match.clubSlug)) {
      clubMatchBySlug.set(match.clubSlug, match.reason);
    }
  }
  let clubs: ClubRec[] = [];
  if (clubMatchBySlug.size > 0) {
    const { data } = await sb
      .from("clubs")
      .select("slug, name, glyph, accent")
      .in("slug", Array.from(clubMatchBySlug.keys()))
      .eq("is_active", true);
    clubs = (data ?? []).map((c) => ({
      slug: c.slug as string,
      name: c.name as string,
      glyph: (c.glyph as string) ?? "✦",
      accent: (c.accent as string) ?? "#5eead4",
      why_recommended: clubMatchBySlug.get(c.slug as string) ?? "Matches your exam selection",
      href: `/clubs/${c.slug}`,
    }));
  }

  return { materials, lounges, clubs, enrichedExams };
}

// Convenience: pick the single best "start here" chapter across
// all selected exams — first non-completed chapter of the first
// exam that has a textbook.
export function pickStartHere(exams: ExamSelection[]): {
  exam: ExamSelection;
  chapter_id: string;
  chapter_number: string;
  chapter_title: string;
  href: string;
} | null {
  for (const exam of exams) {
    if (exam.next_chapter_id && exam.next_chapter_number && exam.next_chapter_title) {
      return {
        exam,
        chapter_id: exam.next_chapter_id,
        chapter_number: exam.next_chapter_number,
        chapter_title: exam.next_chapter_title,
        href: `/textbooks/ap-bio-ultimate/${exam.next_chapter_number}`,
      };
    }
  }
  return null;
}

// Re-export for callers
export type { ExamCatalogEntry };
