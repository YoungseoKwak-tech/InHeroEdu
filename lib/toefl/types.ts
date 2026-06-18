/**
 * TOEFL iBT (real-format) practice model.
 *
 * A test mirrors the real TOEFL iBT's four sections:
 *   • Reading   — academic passages + MCQ (factual, inference, vocabulary,
 *                 insert-text, prose-summary). Auto-graded.
 *   • Listening — conversations + lectures, played via the browser's speech
 *                 synthesis (so it's audio like the real test) + MCQ. Auto-graded.
 *   • Speaking  — 4 timed tasks (prep + response timers). Practice mode.
 *   • Writing   — Integrated + Academic Discussion, timed textarea. Practice mode.
 *
 * Questions are ORIGINAL items written in the official format/difficulty — not
 * ETS's copyrighted items.
 */

export type ToeflSection = "reading" | "listening" | "speaking" | "writing";

export interface ToeflMCQ {
  id: string;
  prompt: string;
  /** Usually 4 choices; prose-summary uses 6 (pick 3). */
  choices: string[];
  /** Correct choice index (single-answer). */
  correct: number;
  /** For multi-select (prose summary): the set of correct indices. */
  correctSet?: number[];
  explanation: string;
}

export interface ToeflReadingSet {
  id: string;
  title: string;
  /** Full academic passage (paragraphs separated by blank lines). */
  passage: string;
  questions: ToeflMCQ[];
}

export interface ToeflListeningSet {
  id: string;
  title: string;
  kind: "conversation" | "lecture";
  /** Spoken transcript — read aloud via SpeechSynthesis, hidden until reveal. */
  transcript: string;
  questions: ToeflMCQ[];
}

export interface ToeflSpeakingTask {
  id: string;
  n: number;
  type: "independent" | "integrated";
  /** Optional short reading shown before the prompt (integrated tasks). */
  readingText?: string;
  prompt: string;
  prepSec: number;
  respSec: number;
  tip: string;
}

export interface ToeflWritingTask {
  id: string;
  n: number;
  type: "integrated" | "discussion";
  readingText?: string;
  prompt: string;
  timeSec: number;
  /** Suggested word count, shown to the test-taker. */
  targetWords: string;
  tip: string;
}

export interface ToeflForm {
  id: string;
  title: string;
  reading: ToeflReadingSet[];
  listening: ToeflListeningSet[];
  speaking: ToeflSpeakingTask[];
  writing: ToeflWritingTask[];
}

/** Rough scaled score (0–30) from raw MCQ correct / total, mirroring TOEFL bands. */
export function scaledScore(correct: number, total: number): number {
  if (total <= 0) return 0;
  return Math.round((correct / total) * 30);
}
