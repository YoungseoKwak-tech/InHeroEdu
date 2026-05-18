// Synchronization calculator — turns the per-path resonance
// array into a single 0–100 "how merged are you with your
// possible self" number that drives the SplitSelf seam position.
//
// Formula:
//   - Sort paths by resonance, descending.
//   - Top path counts for half the base score (single-path
//     intensity should move the needle), every other path
//     splits the remaining half equally.
//   - Add an activity boost: each hour of study in the recent
//     window adds 2 points, capped at +20.
//
// Result is clamped to [0, 100] so the seam position math is safe.

export interface PathLike {
  resonance: number; // [0, 1]
}

export function computeSynchronization(
  paths: PathLike[],
  recentStudyHours: number,
): number {
  if (paths.length === 0) return 0;
  const sorted = [...paths].sort((a, b) => b.resonance - a.resonance);
  const topWeight = 0.5;
  const restWeight = sorted.length > 1 ? 0.5 / (sorted.length - 1) : 0;

  const base = sorted.reduce((sum, p, i) => {
    const w = i === 0 ? topWeight : restWeight;
    return sum + Math.max(0, Math.min(1, p.resonance)) * w;
  }, 0);
  const baseScore = base * 100;

  const activityBoost = Math.min(20, Math.max(0, recentStudyHours) * 2);

  return Math.max(0, Math.min(100, baseScore + activityBoost));
}

// Translates a 0–100 sync number into the seam's x-position
// (left edge = 0%, right edge = 100%). Buckets per spec:
//   sync   0–10  → 90%
//   sync  10–30  → 75%
//   sync  30–50  → 60%
//   sync  50–70  → 45%
//   sync  70–90  → 30%
//   sync 90–100  → 15%
// The seam never reaches 0% or 100% — "the imperfection is what
// makes it human." Clamped to the [15, 90] band.
export function seamPositionPct(sync: number): number {
  if (sync < 10) return 90;
  if (sync < 30) return 75;
  if (sync < 50) return 60;
  if (sync < 70) return 45;
  if (sync < 90) return 30;
  return 15;
}

// Short italic line shown below the character.
export function syncCaption(sync: number): string {
  if (sync < 30) return "Most of who you could be is still latent.";
  if (sync < 60) return "Your possible self is taking shape.";
  if (sync < 90) return "You are becoming who you can be.";
  return "Synchronization stabilizing.";
}
