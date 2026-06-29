/**
 * TOEFL 필수단어장 — academic English vocabulary for the 단어장, covering the
 * disciplines TOEFL iBT tests in its lecture/reading passages (sciences, social
 * sciences, history, arts, environment, campus life) plus the Academic Word
 * List core. Same shape as SAT_VOCAB so it plugs straight into lib/vocab.ts as
 * its own subject ("toefl-essential"). English term ↔ Korean gloss + def.
 *
 * Authored in 10 themed batches (units 1–10). Duplicate headwords across
 * batches are collapsed downstream by lib/vocab.ts (dedup by `en`, first wins).
 */
import type { SatVocabTerm } from "@/lib/data/vocabSatWords";
import { TOEFL_BATCH_1 } from "./vocabToefl/batch1";   // academic process & method
import { TOEFL_BATCH_2 } from "./vocabToefl/batch2";   // life sciences
import { TOEFL_BATCH_3 } from "./vocabToefl/batch3";   // physical sciences
import { TOEFL_BATCH_4 } from "./vocabToefl/batch4";   // social sciences
import { TOEFL_BATCH_5 } from "./vocabToefl/batch5";   // history & anthropology
import { TOEFL_BATCH_6 } from "./vocabToefl/batch6";   // arts & literature
import { TOEFL_BATCH_7 } from "./vocabToefl/batch7";   // environment & geology
import { TOEFL_BATCH_8 } from "./vocabToefl/batch8";   // campus & business
import { TOEFL_BATCH_9 } from "./vocabToefl/batch9";   // academic adjectives
import { TOEFL_BATCH_10 } from "./vocabToefl/batch10"; // academic word list core

export const TOEFL_VOCAB: SatVocabTerm[] = [
  ...TOEFL_BATCH_1.map((t) => ({ ...t, unit: 1 })),
  ...TOEFL_BATCH_2.map((t) => ({ ...t, unit: 2 })),
  ...TOEFL_BATCH_3.map((t) => ({ ...t, unit: 3 })),
  ...TOEFL_BATCH_4.map((t) => ({ ...t, unit: 4 })),
  ...TOEFL_BATCH_5.map((t) => ({ ...t, unit: 5 })),
  ...TOEFL_BATCH_6.map((t) => ({ ...t, unit: 6 })),
  ...TOEFL_BATCH_7.map((t) => ({ ...t, unit: 7 })),
  ...TOEFL_BATCH_8.map((t) => ({ ...t, unit: 8 })),
  ...TOEFL_BATCH_9.map((t) => ({ ...t, unit: 9 })),
  ...TOEFL_BATCH_10.map((t) => ({ ...t, unit: 10 })),
];
