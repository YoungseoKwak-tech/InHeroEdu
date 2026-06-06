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
};

export function subjectIdForTextbookSlug(slug: string): string | null {
  const normalized = slug.trim().toLowerCase();
  return SUBJECT_BY_TEXTBOOK_SLUG[normalized] ?? null;
}
