import type { LessonPlayerData } from "@/lib/lesson-player-types";
import { cellStructureLesson } from "@/lib/lessons/ap-biology/cell-structure";

/**
 * Registry of interactive lesson player data.
 *
 * Key format: "<lessonId>" (matches the id in lib/data/lessons.ts)
 *
 * A lesson listed here will render the interactive LessonPlayer instead of
 * the Coming Soon state. Add an entry here when a lesson's video parts are
 * ready to publish.
 */
const PLAYER_DATA: Record<string, LessonPlayerData> = {
  "cell-structure": cellStructureLesson,
};

/**
 * URL slug → DB lesson_id alias map.
 *
 * Used when a route slug doesn't match the canonical DB id
 * (legacy hard-coded slugs predating the ap-{course}-u{n}-l{n} scheme).
 *
 * Temporarily aliasing `cell-structure` → `ap-biology-u1-l1` so the
 * existing uploaded u1-l1 clips render on that route while the real
 * Unit 2 content is being produced.
 */
const SLUG_TO_DB_ID: Record<string, string> = {
  "cell-structure": "ap-biology-u1-l1",
};

export function resolveLessonDbId(slug: string): string {
  return SLUG_TO_DB_ID[slug] ?? slug;
}

export function getLessonPlayerData(lessonId: string): LessonPlayerData | null {
  return PLAYER_DATA[lessonId] ?? null;
}
