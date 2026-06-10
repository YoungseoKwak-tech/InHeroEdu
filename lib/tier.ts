/**
 * Account tier — 학생(student) vs 학부모(parent). Chosen at signup and stored
 * in Supabase auth user_metadata.role (no DB migration needed; always readable
 * from the session client-side). Drives the tier badge across the portal.
 */
export type Tier = "student" | "parent";

export const TIER_META: Record<Tier, { label: string; emoji: string; color: string; bg: string; border: string }> = {
  student: { label: "학생", emoji: "🎓", color: "#1d4ed8", bg: "#dbeafe", border: "#bfdbfe" },
  parent: { label: "학부모", emoji: "👨‍👩‍👧‍👦", color: "#047a45", bg: "#e9fbf2", border: "#a7f3cf" },
};

export function tierFromMetadata(meta?: Record<string, unknown> | null): Tier | null {
  const r = meta?.role ?? meta?.tier;
  return r === "student" || r === "parent" ? r : null;
}
