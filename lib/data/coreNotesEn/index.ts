/**
 * English Core Notes for Honors / IB DP (Korean-only curricula) — static map by
 * lessonId. Used as the base note (the "EN" column of the split view); the
 * Korean counterpart with the same lessonId lives in coreNotesKo.
 */
import type { CoreNote } from "@/lib/coreNotes";
import { CORE_NOTES_EN_LIST } from "./registry";

export const CORE_NOTES_EN: ReadonlyMap<string, CoreNote> = new Map(
  CORE_NOTES_EN_LIST.map((n) => [n.lessonId, n])
);

export function getCoreNoteEn(lessonId: string): CoreNote | null {
  return CORE_NOTES_EN.get(lessonId) ?? null;
}
