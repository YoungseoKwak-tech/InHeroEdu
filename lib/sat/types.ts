/**
 * Digital SAT (Bluebook-style) practice model.
 *
 * A test is two sections (Reading & Writing, Math), each delivered as two
 * timed modules. Module 2 is adaptive: a student who does well on Module 1
 * gets the harder Module 2 (which unlocks the top of the score band), and
 * vice-versa — exactly how the real digital SAT routes.
 *
 * Questions are ORIGINAL items written in the official format/difficulty —
 * not College Board's copyrighted items.
 */

export type SatSection = "rw" | "math";
export type SatDifficulty = "easy" | "med" | "hard";
export type SatQType = "mcq" | "grid";

export interface SatQuestion {
  id: string;
  section: SatSection;
  domain: string;
  difficulty: SatDifficulty;
  /** Reading & Writing stimulus (short passage / data note). */
  passage?: string;
  prompt: string;
  type: SatQType;
  /** MCQ choices (exactly 4). */
  choices?: string[];
  /** Correct choice index for MCQ. */
  correct?: number;
  /** Accepted strings for a grid-in answer (e.g. ["1.5", "3/2"]). */
  gridAnswers?: string[];
  explanation: string;
}

export interface SatModulePools {
  m1: SatQuestion[];
  m2easy: SatQuestion[];
  m2hard: SatQuestion[];
  /** Per-module time in seconds (both modules use this). */
  timeSec: number;
}

export interface SatForm {
  id: string;
  title: string;
  rw: SatModulePools;
  math: SatModulePools;
}

/** A normalized grid-in comparison: tolerant of spaces and equivalent forms. */
export function gridMatches(input: string, accepted: string[]): boolean {
  const norm = (s: string) => s.replace(/\s+/g, "").replace(/^\+/, "");
  const a = norm(input);
  if (!a) return false;
  return accepted.some((acc) => {
    const b = norm(acc);
    if (a === b) return true;
    // numeric equality (handles 0.5 vs .5, 1.50 vs 1.5)
    const na = Number(a), nb = Number(b);
    return Number.isFinite(na) && Number.isFinite(nb) && na === nb;
  });
}
