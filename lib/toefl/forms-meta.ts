import type { ToeflForm } from "./types";

/**
 * Lightweight TOEFL form metadata + on-demand loader.
 *
 * This module carries NO question payloads — only the small per-form descriptor
 * (id, label, section counts) needed by the picker / home screen. The heavy
 * form data (passages, transcripts, MCQs) is code-split: each form lives in its
 * own chunk and is fetched only when that test is actually selected, via
 * `loadToeflForm(id)`. This keeps the "use client" runner bundle tiny instead of
 * statically pulling all ~640KB of forms.
 *
 * Counts below are fixed by the real TOEFL iBT structure and are identical
 * across every form (2 reading passages · 20 Q, 5 listening clips · 28 Q,
 * 4 speaking tasks, 2 writing tasks). They are kept in sync with the form
 * files; if a form's shape ever changes, update its entry here.
 */

export interface ToeflFormCounts {
  reading: number;
  listening: number;
  speaking: number;
  writing: number;
}

export interface ToeflFormMeta {
  id: string;
  /** Display label, e.g. "TOEFL iBT Practice Test 1". */
  label: string;
  /** Short picker label, e.g. "Test 1". */
  short: string;
  /** Number of reading passages. */
  readingSets: number;
  /** Number of listening clips. */
  listeningSets: number;
  counts: ToeflFormCounts;
}

const STANDARD_COUNTS: ToeflFormCounts = { reading: 20, listening: 28, speaking: 4, writing: 2 };

/** All available TOEFL practice tests (metadata only), in display order. */
export const TOEFL_FORM_META: ToeflFormMeta[] = Array.from({ length: 10 }, (_, i) => {
  const n = i + 1;
  return {
    id: `toefl-${n}`,
    label: `TOEFL iBT Practice Test ${n}`,
    short: `Test ${n}`,
    readingSets: 2,
    listeningSets: 5,
    counts: STANDARD_COUNTS,
  };
});

export const DEFAULT_TOEFL_FORM_ID = TOEFL_FORM_META[0].id;

export function getToeflFormMeta(id?: string): ToeflFormMeta {
  return TOEFL_FORM_META.find((m) => m.id === id) ?? TOEFL_FORM_META[0];
}

/**
 * Dynamic-import loaders, one per form → one code-split chunk per form.
 * Only the selected form's chunk is downloaded/parsed.
 */
const LOADERS: Record<string, () => Promise<ToeflForm>> = {
  "toefl-1": () => import("./form1").then((m) => m.TOEFL_FORM_1),
  "toefl-2": () => import("./form2").then((m) => m.TOEFL_FORM_2),
  "toefl-3": () => import("./form3").then((m) => m.TOEFL_FORM_3),
  "toefl-4": () => import("./form4").then((m) => m.TOEFL_FORM_4),
  "toefl-5": () => import("./form5").then((m) => m.TOEFL_FORM_5),
  "toefl-6": () => import("./form6").then((m) => m.TOEFL_FORM_6),
  "toefl-7": () => import("./form7").then((m) => m.TOEFL_FORM_7),
  "toefl-8": () => import("./form8").then((m) => m.TOEFL_FORM_8),
  "toefl-9": () => import("./form9").then((m) => m.TOEFL_FORM_9),
  "toefl-10": () => import("./form10").then((m) => m.TOEFL_FORM_10),
};

/** Load the full (heavy) form data for `id` on demand. Falls back to form 1. */
export function loadToeflForm(id?: string): Promise<ToeflForm> {
  return (LOADERS[id ?? DEFAULT_TOEFL_FORM_ID] ?? LOADERS[DEFAULT_TOEFL_FORM_ID])();
}
