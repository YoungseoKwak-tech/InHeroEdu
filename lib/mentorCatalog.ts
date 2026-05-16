/**
 * Mentor catalog — static, code-defined list of verified InHero mentors.
 *
 * Kept as a static catalog (not DB-backed) so we can iterate on mentor cards,
 * room role badges, and Expert/Member labels without schema churn. The
 * Supabase-backed mentor_profiles table in lib/mentors.ts is a separate
 * concern (it powers verified-handle lookups in chat).
 *
 * UI language (do not drift):
 *   - Signal Verified = global badge (any mentor in this catalog earns it)
 *   - Expert          = room-specific authority (lounge slug ∈ expertIn)
 *   - Member          = participant outside their domain
 */

export const SIGNAL_VERIFIED_LABEL = "Signal Verified";

export type MentorRole = "Expert" | "Member";

export interface Mentor {
  /** Stable kebab-case id (first-name slug). */
  id: string;
  name: string;
  /** e.g. "Cornell Biomedical Engineering". */
  school: string;
  /** Class year, two-digit. */
  year: "28" | "29" | "30";
  /** Short archetype tokens, rendered as `A · B · C`. */
  archetypes: string[];
  /** Lounge slugs where this mentor is an Expert. Outside this list → Member. */
  expertIn: string[];
  /** Always true for entries in this catalog. */
  verified: true;
}

export const MENTORS: Mentor[] = [
  {
    id: "jms0428",
    name: "jms0428",
    school: "Cornell Biomedical Engineering",
    year: "28",
    archetypes: ["Research", "Bioengineering"],
    expertIn: ["ap-bio", "bio-research", "ap-chem", "ap-physics"],
    verified: true,
  },
  {
    id: "eun0815",
    name: "eun0815",
    school: "Cornell Electrical & Computer Engineering",
    year: "28",
    archetypes: ["AI", "Engineering", "Computer Science"],
    expertIn: ["math", "engineering", "cs"],
    verified: true,
  },
  {
    id: "yuj1212",
    name: "yuj1212",
    school: "Cornell Human Ecology",
    year: "28",
    archetypes: ["Psychology", "Humanities", "Behavioral Science"],
    expertIn: ["psychology", "humanities", "essay-writing"],
    verified: true,
  },
  {
    id: "seo0917",
    name: "seo0917",
    school: "Cornell Electrical & Computer Engineering",
    year: "28",
    archetypes: ["Engineering", "Mathematics", "AI Systems"],
    expertIn: ["engineering", "admissions", "ai"],
    verified: true,
  },
  {
    id: "sua0521",
    name: "sua0521",
    school: "Cornell Hotel Administration",
    year: "28",
    archetypes: ["Entrepreneurship", "Business", "Leadership"],
    expertIn: ["ap-economics", "business", "founders-lab"],
    verified: true,
  },
  {
    id: "jae1029",
    name: "jae1029",
    school: "Cornell",
    year: "28",
    archetypes: ["Strategy", "Academic Systems", "Admissions"],
    expertIn: ["ap-bio", "ap-chem", "strategy"],
    verified: true,
  },
  {
    id: "yng0802",
    name: "yng0802",
    school: "Cornell Electrical & Computer Engineering",
    year: "28",
    archetypes: ["Research", "AI", "Startup"],
    expertIn: ["research", "ai", "cs", "founders-lab"],
    verified: true,
  },
];

const MENTORS_BY_ID = new Map(MENTORS.map((m) => [m.id, m]));

/**
 * Aliases let `expertIn` use shorthand slugs that don't match the real lounge slug.
 * Both sides resolve through this map before comparison, so it's bidirectional.
 */
const LOUNGE_ALIASES: Record<string, string> = {
  "cs": "cs-ai",
  "humanities": "debate-humanities",
};

function canonicalLoungeSlug(slug: string): string {
  return LOUNGE_ALIASES[slug] ?? slug;
}

export function getMentor(id: string): Mentor | undefined {
  return MENTORS_BY_ID.get(id);
}

/**
 * Role this mentor holds inside the given lounge.
 * Both the lounge slug and expertIn entries are resolved through LOUNGE_ALIASES.
 */
export function getMentorRoleInLounge(mentor: Mentor, loungeSlug: string): MentorRole {
  const target = canonicalLoungeSlug(loungeSlug);
  return mentor.expertIn.some((s) => canonicalLoungeSlug(s) === target) ? "Expert" : "Member";
}

/** Render the archetype line: `Research · Bioengineering`. */
export function formatArchetypeLine(mentor: Mentor): string {
  return mentor.archetypes.join(" · ");
}

/** Render the school + year line: `Cornell BME '28`. Caller can shorten school. */
export function formatSchoolYear(mentor: Mentor): string {
  return `${mentor.school} '${mentor.year}`;
}

/** All mentors who are Experts in a given lounge. Honors LOUNGE_ALIASES. */
export function getExpertsForLounge(loungeSlug: string): Mentor[] {
  const target = canonicalLoungeSlug(loungeSlug);
  return MENTORS.filter((m) =>
    m.expertIn.some((s) => canonicalLoungeSlug(s) === target)
  );
}
