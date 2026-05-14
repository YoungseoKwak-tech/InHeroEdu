/**
 * Trajectory Identity — shared types, validation, and presets.
 * Used by the onboarding modal, profile pages, AuthorChip, and APIs.
 */

export const HANDLE_MIN = 3;
export const HANDLE_MAX = 24;
export const HANDLE_REGEX = /^[A-Za-z][A-Za-z0-9_]{2,23}$/;

export const RESERVED_HANDLES = new Set([
  "admin", "inhero", "staff", "moderator", "mod", "owner",
  "system", "official", "support", "help", "api", "root",
  "anonymous", "deleted", "null", "undefined",
]);

export function validateHandle(raw: string): { ok: true; handle: string } | { ok: false; reason: string } {
  const handle = raw.trim();
  if (!handle) return { ok: false, reason: "Pick a handle to continue." };
  if (handle.length < HANDLE_MIN) return { ok: false, reason: `At least ${HANDLE_MIN} characters.` };
  if (handle.length > HANDLE_MAX) return { ok: false, reason: `At most ${HANDLE_MAX} characters.` };
  if (!HANDLE_REGEX.test(handle)) {
    return { ok: false, reason: "Letters, digits, underscore. Must start with a letter." };
  }
  if (RESERVED_HANDLES.has(handle.toLowerCase())) {
    return { ok: false, reason: "That handle is reserved." };
  }
  return { ok: true, handle };
}

// ── Ambition tags ──────────────────────────────────────────────────────
export const AMBITION_TAGS = [
  { id: "pre_med",        label: "Pre-Med" },
  { id: "engineering",    label: "Engineering" },
  { id: "cs",             label: "CS / AI" },
  { id: "research",       label: "Research" },
  { id: "founder",        label: "Founder / Startup" },
  { id: "debate",         label: "Debate / Law" },
  { id: "olympiad",       label: "Olympiad" },
  { id: "humanities",     label: "Humanities" },
  { id: "social_impact",  label: "Social Impact" },
  { id: "business",       label: "Business / Econ" },
  { id: "art",            label: "Art / Design" },
] as const;
export type AmbitionTagId = (typeof AMBITION_TAGS)[number]["id"];

export const AMBITION_TAG_LABEL: Record<string, string> = Object.fromEntries(
  AMBITION_TAGS.map((t) => [t.id, t.label])
);

// ── Graduation years (current admissions cycle window) ─────────────────
const NOW = new Date();
const CURRENT_GRAD_BASE = NOW.getMonth() >= 6 ? NOW.getFullYear() + 1 : NOW.getFullYear();
export const GRAD_YEARS: number[] = Array.from({ length: 7 }, (_, i) => CURRENT_GRAD_BASE + i);

// ── Badges ─────────────────────────────────────────────────────────────
export type BadgeType =
  | "founding_cohort"
  | "founding_circle"
  | "school_verified"
  | "verified_ap5"
  | "research_contributor"
  | "olympiad_qualifier"
  | "mentor_approved"
  | "founder_circle";

export interface BadgeMeta {
  id: BadgeType;
  label: string;
  short: string;       // shown on chips (compact)
  glyph: string;       // unicode symbol
  accent: string;      // hex
  blurb: string;       // tooltip / profile detail
}

export const BADGE_META: Record<BadgeType, BadgeMeta> = {
  founding_cohort: {
    id: "founding_cohort", label: "Founding Cohort", short: "Founding",
    glyph: "✦", accent: "#F4C95D",
    blurb: "One of the first students inside InHero. Permanent.",
  },
  founding_circle: {
    id: "founding_circle", label: "Founding Circle", short: "Circle",
    glyph: "◈", accent: "#FF6B5B",
    blurb: "One of the first 100 to complete the full trajectory ritual. Permanent.",
  },
  school_verified: {
    id: "school_verified", label: "School Verified", short: "Verified",
    glyph: "✓", accent: "#7DD3FC",
    blurb: "Real student at a verified institution. Confirmed via .edu email, acceptance letter, or LinkedIn.",
  },
  verified_ap5: {
    id: "verified_ap5", label: "Verified AP 5", short: "AP 5",
    glyph: "✓", accent: "#5DCAA5",
    blurb: "Score verified at AP 5. Granted manually after proof upload.",
  },
  research_contributor: {
    id: "research_contributor", label: "Research Contributor", short: "Research",
    glyph: "⚗", accent: "#5DAAF0",
    blurb: "Published or contributed to a research project tracked on InHero.",
  },
  olympiad_qualifier: {
    id: "olympiad_qualifier", label: "Olympiad", short: "Olympiad",
    glyph: "◈", accent: "#A99CFF",
    blurb: "Qualified for a national or international subject olympiad.",
  },
  mentor_approved: {
    id: "mentor_approved", label: "Mentor Approved", short: "Mentor",
    glyph: "✶", accent: "#5eead4",
    blurb: "Endorsed by an InHero mentor or instructor.",
  },
  founder_circle: {
    id: "founder_circle", label: "Founder Circle", short: "Founder",
    glyph: "⚡", accent: "#FF6B5B",
    blurb: "Shipping a real product or company. Tracked via Founder Circle.",
  },
};

export function getBadgeMeta(type: string): BadgeMeta | null {
  return (BADGE_META as Record<string, BadgeMeta>)[type] ?? null;
}

// Founding cohort cap — first N profiles get the badge.
export const FOUNDING_COHORT_CAP = 500;

// Founding circle = elite subset who completed the full identity ritual.
export const FOUNDING_CIRCLE_CAP = 100;

// What counts as a completed ritual: all 4 fields non-empty (post-trim).
export function isRitualComplete(profile: {
  dream_school?: string | null;
  intended_field?: string | null;
  current_obsession?: string | null;
  building_what?: string | null;
}): boolean {
  return Boolean(
    profile.dream_school?.trim() &&
    profile.intended_field?.trim() &&
    profile.current_obsession?.trim() &&
    profile.building_what?.trim()
  );
}

// ── DB row shapes ──────────────────────────────────────────────────────
export interface ProfilePublicRow {
  user_id: string;
  display_handle: string;
  ambition_tags: string[];
  target_schools: string[];
  graduation_year: number | null;
  bio: string | null;
  dream_school: string | null;
  intended_field: string | null;
  current_obsession: string | null;
  building_what: string | null;
  created_at: string;
  updated_at: string;
}

export interface BadgeRow {
  id: string;
  user_id: string;
  badge_type: BadgeType | string;
  badge_metadata: Record<string, unknown>;
  earned_at: string;
}

export interface TrajectoryPublic {
  handle: string;
  graduationYear: number | null;
  ambitionTags: string[];
  bio: string | null;
  dreamSchool: string | null;
  intendedField: string | null;
  currentObsession: string | null;
  buildingWhat: string | null;
  badges: { type: string; meta: BadgeMeta | null; earnedAt: string }[];
}

export function toPublic(profile: ProfilePublicRow, badges: BadgeRow[]): TrajectoryPublic {
  return {
    handle: profile.display_handle,
    graduationYear: profile.graduation_year,
    ambitionTags: profile.ambition_tags,
    bio: profile.bio,
    dreamSchool: profile.dream_school,
    intendedField: profile.intended_field,
    currentObsession: profile.current_obsession,
    buildingWhat: profile.building_what,
    badges: badges
      .sort((a, b) => a.earned_at < b.earned_at ? 1 : -1)
      .map((b) => ({
        type: b.badge_type,
        meta: getBadgeMeta(b.badge_type),
        earnedAt: b.earned_at,
      })),
  };
}
