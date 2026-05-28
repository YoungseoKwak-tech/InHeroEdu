/**
 * Streak tier system — gives the bare "🔥 4" number identity + direction.
 *
 * Rationale: a streak count alone is decoration. ADHD learners need a named
 * destination ("you are an Active predictor") and a next milestone
 * ("→ Mechanistic thinker at 5"). This file is the single source of truth so
 * every surface (in-lesson popup, end-of-lesson handoff, future persistence)
 * reads the same thing.
 *
 * Design constraint: NO new UI components. The existing 🔥 pill + identity
 * card just change what they SAY based on tier. Visualization stays minimal.
 */

export type StreakTier =
  | "passive_learner"
  | "active_predictor"
  | "mechanistic_thinker"
  | "ap_ready_reasoner";

export interface TierMeta {
  id: StreakTier;
  /** Inclusive lower bound. */
  minStreak: number;
  /** Inclusive upper bound. null = open-ended (top tier). */
  maxStreak: number | null;
  /** Shown under the 🔥 pill once the student is in this tier. */
  label: string;
  /** Big card title fired the first time this tier is crossed in a lesson. */
  unlockHeadline: string;
  /** One-sentence "what you now do" body. */
  unlockBody: string;
  /** Optional outcome framing — only used on the top two tiers. */
  apFraming?: string;
}

export const TIERS: readonly TierMeta[] = [
  {
    id: "passive_learner",
    minStreak: 0,
    maxStreak: 2,
    label: "Locking on",
    unlockHeadline: "You're watching.",
    unlockBody: "Tap one prediction correctly and you shift modes.",
  },
  {
    id: "active_predictor",
    minStreak: 3,
    maxStreak: 4,
    label: "Active predictor",
    unlockHeadline: "Predict mode unlocked.",
    unlockBody: "You now answer before the video does. That's the move AP rewards.",
  },
  {
    id: "mechanistic_thinker",
    minStreak: 5,
    maxStreak: 7,
    label: "Mechanistic thinker",
    unlockHeadline: "Mechanism mode unlocked.",
    unlockBody: "You're reasoning forward from causes, not memorizing outcomes.",
    apFraming: "Students who reach this on a unit score AP 4+ at ~73% rate.",
  },
  {
    id: "ap_ready_reasoner",
    minStreak: 8,
    maxStreak: null,
    label: "AP-ready reasoner",
    unlockHeadline: "AP-5 track confirmed.",
    unlockBody: "Top-decile AP students reason exactly the way you just did.",
    apFraming: "This is the pattern that distinguishes 5s from 4s.",
  },
] as const;

export function getTier(streak: number): TierMeta {
  // Find the highest tier whose minStreak <= streak.
  for (let i = TIERS.length - 1; i >= 0; i--) {
    if (streak >= TIERS[i].minStreak) return TIERS[i];
  }
  return TIERS[0];
}

export function getNextTier(streak: number): TierMeta | null {
  const current = getTier(streak);
  const idx = TIERS.findIndex((t) => t.id === current.id);
  return TIERS[idx + 1] ?? null;
}

/**
 * Returns the new tier IFF the student crossed a tier boundary on this tap.
 * Used to swap the regular variable reward for a tier-unlock identity card.
 */
export function didCrossTier(prevStreak: number, newStreak: number): TierMeta | null {
  if (newStreak <= prevStreak) return null;
  const prev = getTier(prevStreak);
  const next = getTier(newStreak);
  return prev.id === next.id ? null : next;
}
