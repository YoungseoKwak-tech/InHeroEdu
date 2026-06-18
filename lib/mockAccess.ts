/**
 * Mock-exam access tiers for SAT / TOEFL.
 *   - 무제한 (unlimited): unlock key `parents:<p>-mock` (500 credits)
 *   - 5회 이용권 (pack):   unlock key `parents:<p>-mock:5` (200 credits) — limited
 *     to MOCK_PACK_LIMIT starts, counted client-side (localStorage MVP).
 * Buying unlimited supersedes the pack.
 */
import { isUnlocked } from "@/lib/credits";

export type MockProduct = "sat" | "toefl";
export const MOCK_PACK_LIMIT = 5;

export const mockUnlimitedKey = (p: MockProduct) => `parents:${p}-mock`;
export const mockPackKey = (p: MockProduct) => `parents:${p}-mock:5`;
const usedKey = (p: MockProduct) => `inhero-mock-used-${p}`;

export type MockTier = "none" | "pack" | "unlimited";

export function mockTier(p: MockProduct): MockTier {
  if (isUnlocked(mockUnlimitedKey(p))) return "unlimited";
  if (isUnlocked(mockPackKey(p))) return "pack";
  return "none";
}

export function getMockUsed(p: MockProduct): number {
  if (typeof window === "undefined") return 0;
  return Number(localStorage.getItem(usedKey(p)) || "0") || 0;
}

/** Remaining starts for the pack tier; null = unlimited; 0 = none/exhausted. */
export function mockRemaining(p: MockProduct): number | null {
  const tier = mockTier(p);
  if (tier === "unlimited") return null;
  if (tier === "pack") return Math.max(0, MOCK_PACK_LIMIT - getMockUsed(p));
  return 0;
}

/**
 * Try to start a test. Returns whether it's allowed; for the pack tier this
 * consumes one of the 5 starts. Unlimited never decrements.
 */
export function consumeMock(p: MockProduct): { ok: boolean; reason?: "exhausted" | "locked" } {
  const tier = mockTier(p);
  if (tier === "unlimited") return { ok: true };
  if (tier === "none") return { ok: false, reason: "locked" };
  const used = getMockUsed(p);
  if (used >= MOCK_PACK_LIMIT) return { ok: false, reason: "exhausted" };
  if (typeof window !== "undefined") localStorage.setItem(usedKey(p), String(used + 1));
  return { ok: true };
}
