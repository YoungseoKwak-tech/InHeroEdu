/**
 * Lightweight, payload-free metadata for every SAT practice form.
 *
 * This module intentionally imports NONE of the heavy `formN.ts` question files
 * (~2.2MB combined). The landing/picker pages render entirely from this static
 * table, and the chosen form's heavy data is loaded on demand via
 * `form-loader.ts`. Counts here are the per-section totals shown to students:
 * `rwCount = rw.m1 + rw.m2easy`, `mathCount = math.m1 + math.m2easy` — exactly
 * what `formCounts()` in `forms.ts` returns, kept in sync with the form data.
 */

export interface SatFormMeta {
  id: string;
  /** Display title (matches the form object's `title`). */
  label: string;
  /** R&W questions in a full run (Module 1 + Module 2). */
  rwCount: number;
  /** Math questions in a full run (Module 1 + Module 2). */
  mathCount: number;
  /** True when the form matches the current digital SAT full-length shape. */
  isFullLength: boolean;
}

/** All forms, in display order — no question payloads, safe for any bundle. */
export const SAT_FORM_META: SatFormMeta[] = [
  { id: "practice-1", label: "InHero SAT Practice Test 1", rwCount: 54, mathCount: 44, isFullLength: true },
  { id: "practice-2", label: "InHero SAT Practice Test 2", rwCount: 32, mathCount: 28, isFullLength: false },
  { id: "practice-3", label: "InHero SAT Practice Test 3", rwCount: 32, mathCount: 28, isFullLength: false },
  { id: "practice-4", label: "InHero SAT Practice Test 4", rwCount: 16, mathCount: 12, isFullLength: false },
  { id: "practice-5", label: "InHero SAT Practice Test 5", rwCount: 16, mathCount: 12, isFullLength: false },
  { id: "practice-6", label: "InHero SAT Practice Test 6", rwCount: 16, mathCount: 12, isFullLength: false },
  { id: "practice-7", label: "InHero SAT Practice Test 7", rwCount: 54, mathCount: 44, isFullLength: true },
  { id: "practice-8", label: "InHero SAT Practice Test 8", rwCount: 54, mathCount: 44, isFullLength: true },
  { id: "practice-9", label: "InHero SAT Practice Test 9", rwCount: 54, mathCount: 44, isFullLength: true },
  { id: "practice-10", label: "InHero SAT Practice Test 10", rwCount: 54, mathCount: 44, isFullLength: true },
  { id: "practice-11", label: "InHero SAT Practice Test 11", rwCount: 54, mathCount: 44, isFullLength: true },
  { id: "practice-12", label: "InHero SAT Practice Test 12", rwCount: 54, mathCount: 44, isFullLength: true },
  { id: "practice-13", label: "InHero SAT Practice Test 13", rwCount: 54, mathCount: 44, isFullLength: true },
  { id: "practice-14", label: "InHero SAT Practice Test 14", rwCount: 54, mathCount: 44, isFullLength: true },
  { id: "practice-15", label: "InHero SAT Practice Test 15", rwCount: 54, mathCount: 44, isFullLength: true },
  { id: "practice-16", label: "InHero SAT Practice Test 16", rwCount: 54, mathCount: 44, isFullLength: true },
  { id: "practice-17", label: "InHero SAT Practice Test 17", rwCount: 54, mathCount: 44, isFullLength: true },
  { id: "practice-18", label: "InHero SAT Practice Test 18", rwCount: 54, mathCount: 44, isFullLength: true },
  { id: "practice-19", label: "InHero SAT Practice Test 19", rwCount: 54, mathCount: 44, isFullLength: true },
  { id: "practice-20", label: "InHero SAT Practice Test 20", rwCount: 54, mathCount: 44, isFullLength: true },
  { id: "practice-21", label: "InHero SAT Practice Test 21", rwCount: 54, mathCount: 44, isFullLength: true },
  { id: "practice-22", label: "InHero SAT Practice Test 22", rwCount: 54, mathCount: 44, isFullLength: true },
  { id: "practice-23", label: "InHero SAT Practice Test 23", rwCount: 54, mathCount: 44, isFullLength: true },
  { id: "practice-24", label: "InHero SAT Practice Test 24", rwCount: 54, mathCount: 44, isFullLength: true },
  { id: "practice-25", label: "InHero SAT Practice Test 25", rwCount: 54, mathCount: 44, isFullLength: true },
  { id: "practice-26", label: "InHero SAT Practice Test 26", rwCount: 54, mathCount: 44, isFullLength: true },
  { id: "practice-27", label: "InHero SAT Practice Test 27", rwCount: 54, mathCount: 44, isFullLength: true },
  { id: "practice-28", label: "InHero SAT Practice Test 28", rwCount: 54, mathCount: 44, isFullLength: true },
  { id: "practice-29", label: "InHero SAT Practice Test 29", rwCount: 54, mathCount: 44, isFullLength: true },
  { id: "practice-30", label: "InHero SAT Practice Test 30", rwCount: 54, mathCount: 44, isFullLength: true },
];

/** Full-length forms only (what the public picker offers), in display order. */
export const SAT_FULL_LENGTH_FORM_META: SatFormMeta[] = SAT_FORM_META.filter((m) => m.isFullLength);

/** Look up a single form's metadata by id. */
export function getSatFormMeta(id: string | undefined): SatFormMeta | undefined {
  return SAT_FORM_META.find((m) => m.id === id);
}
