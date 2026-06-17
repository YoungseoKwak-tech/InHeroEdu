/**
 * Maps `textbooks.slug` (the chapter-based reader system used by
 * /textbooks/[slug] and the Library "InHero Originals" rail) to the
 * subject id used by the purchase system (orders `single:<subjectId>`,
 * `novapass`, textbook_purchases.subject_id).
 *
 * Access rule: One Subject Elite ($49/mo, serviceId "single:<subjectId>")
 * unlocks that subject's textbook; All Subject Elite ($199/mo,
 * serviceId "novapass") unlocks every textbook. Enforced via
 * hasTextbookAccess() in lib/textbookAccess.ts.
 *
 * A slug missing from this map is treated as LOCKED for everyone —
 * fail closed, so a new title can't ship accidentally free. Add the
 * mapping here when publishing a new Original.
 */

const SUBJECT_BY_TEXTBOOK_SLUG: Record<string, string> = {
  "ap-bio-ultimate": "ap-biology",
  "ap-chem-ultimate": "ap-chemistry",
  "ap-physics-ultimate": "ap-physics-1",
  "ap-physics-2-ultimate": "ap-physics-2",
  "ap-calc-ab-ultimate": "ap-calculus-ab",
  "ap-calc-bc-ultimate": "ap-calculus-bc",

  // Core Notes → book batch (slug = `<courseId>-ultimate`, subjectId = courseId).
  // Generated from lib/data/coreNotesKo via scripts/textbook/corenotes-to-book.ts.
  "ap-computer-science-a-ultimate": "ap-computer-science-a",
  "ap-english-language-ultimate": "ap-english-language",
  "ap-environmental-science-ultimate": "ap-environmental-science",
  "ap-human-geography-ultimate": "ap-human-geography",
  "ap-macroeconomics-ultimate": "ap-macroeconomics",
  "ap-microeconomics-ultimate": "ap-microeconomics",
  "ap-physics-c-mechanics-ultimate": "ap-physics-c-mechanics",
  "ap-psychology-ultimate": "ap-psychology",
  "ap-statistics-ultimate": "ap-statistics",
  "ap-us-government-ultimate": "ap-us-government",
  "ap-us-history-ultimate": "ap-us-history",
  "ap-world-history-ultimate": "ap-world-history",
  "honors-algebra-2-ultimate": "honors-algebra-2",
  "honors-biology-ultimate": "honors-biology",
  "honors-chemistry-ultimate": "honors-chemistry",
  "honors-english-9-ultimate": "honors-english-9",
  "honors-geometry-ultimate": "honors-geometry",
  "honors-physics-ultimate": "honors-physics",
  "honors-precalculus-ultimate": "honors-precalculus",
  "honors-us-history-ultimate": "honors-us-history",
  "honors-world-history-ultimate": "honors-world-history",
  "ib-biology-ultimate": "ib-biology",
  "ib-chemistry-ultimate": "ib-chemistry",
  "ib-cs-ultimate": "ib-cs",
  "ib-economics-ultimate": "ib-economics",
  "ib-english-ultimate": "ib-english",
  "ib-ess-ultimate": "ib-ess",
  "ib-history-ultimate": "ib-history",
  "ib-math-aa-ultimate": "ib-math-aa",
  "ib-math-ai-ultimate": "ib-math-ai",
  "ib-physics-ultimate": "ib-physics",
  "ib-psychology-ultimate": "ib-psychology",
};

export function subjectIdForTextbookSlug(slug: string): string | null {
  const normalized = slug.trim().toLowerCase();
  return SUBJECT_BY_TEXTBOOK_SLUG[normalized] ?? null;
}
