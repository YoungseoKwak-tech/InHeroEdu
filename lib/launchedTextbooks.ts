/**
 * Which InHero Original textbooks are actually LAUNCHED (purchasable / readable).
 * The 32 Core Notes books are uploaded but shown as "런칭 예정" (coming soon)
 * until they're individually QA'd and released — only these six are live.
 *
 * Used by the /parents textbook grid and the Library Originals rail to badge
 * the rest as coming-soon and disable their cards.
 */
export const LAUNCHED_TEXTBOOK_SLUGS = new Set<string>([
  "ap-bio-ultimate",
  "ap-chem-ultimate",
  "ap-physics-ultimate", // AP Physics 1
  "ap-physics-2-ultimate",
  "ap-calc-ab-ultimate",
  "ap-calc-bc-ultimate",
]);

export function isTextbookLaunched(slug: string): boolean {
  return LAUNCHED_TEXTBOOK_SLUGS.has(slug);
}
