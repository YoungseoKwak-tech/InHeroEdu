// Lounge live-presence roster. Illustrative semi-anonymous handles used
// for the ambient-liveness layer (seeded online count, typing indicator,
// auto-streaming message queue). Not real user accounts. The surrounding UI
// labels seeded activity distinctly from real cohort messages, and the
// seed queue is dialed down toward zero once a lounge hits real concurrent
// activity (see component README).

export type SeedAuthorStyle = "casual" | "ambition" | "subject" | "mentor";

export interface LoungeSeedAuthor {
  handle: string;
  style: SeedAuthorStyle;
  /** Only set for mentor-style authors. Static seed metadata — there is no
   *  real mentor_profiles row backing this handle. The badge is purely
   *  display ("MENTOR · CORNELL · CLASS OF 2028 · ECE"). */
  mentorBadge?: string;
}

// ─── AP BIOLOGY ROSTER (34 handles) ────────────────────────────────────────
// Mix of Gen-Z casual, ambition-coded, subject-coded, and seeded mentors.
export const AP_BIO_ROSTER: LoungeSeedAuthor[] = [
  // Gen-Z casual (12)
  { handle: "u/no_cap_studying",       style: "casual" },
  { handle: "u/deadass_blanked",        style: "casual" },
  { handle: "u/lowkey_failing_apbio",   style: "casual" },
  { handle: "u/fr_fr_premed",           style: "casual" },
  { handle: "u/bro_just_cooked",        style: "casual" },
  { handle: "u/it_be_like_that",        style: "casual" },
  { handle: "u/sleep_who",              style: "casual" },
  { handle: "u/caffeine_dependent",     style: "casual" },
  { handle: "u/study_blursed",          style: "casual" },
  { handle: "u/im_so_done_w_this",      style: "casual" },
  { handle: "u/ap_zombie_mode",         style: "casual" },
  { handle: "u/cooked_at_FRQ",          style: "casual" },
  // Ambition-coded (10)
  { handle: "u/CornellBio27",           style: "ambition" },
  { handle: "u/FuturePremed28",         style: "ambition" },
  { handle: "u/StanfordHopeful",        style: "ambition" },
  { handle: "u/IvyOrBust",              style: "ambition" },
  { handle: "u/MITorDie",               style: "ambition" },
  { handle: "u/HopkinsBound27",         style: "ambition" },
  { handle: "u/UPennPM28",              style: "ambition" },
  { handle: "u/DukeBio27",              style: "ambition" },
  { handle: "u/RiceBME28",              style: "ambition" },
  { handle: "u/HarvardHopeful28",       style: "ambition" },
  { handle: "u/sigma_FRQ_grindset",     style: "ambition" },
  // Subject-coded (8)
  { handle: "u/MitochondriaIsThe",      style: "subject" },
  { handle: "u/KrebsCycleEnjoyer",      style: "subject" },
  { handle: "u/PCRwizard",              style: "subject" },
  { handle: "u/punnett_squared",        style: "subject" },
  { handle: "u/photosynthesis_fan",     style: "subject" },
  { handle: "u/calvin_cycle_kid",       style: "subject" },
  { handle: "u/operon_obsessed",        style: "subject" },
  { handle: "u/ETC_truther",            style: "subject" },
  // Seeded mentors (4) — static badge metadata only, no fake mentor_profiles row
  { handle: "u/cornellian",   style: "mentor", mentorBadge: "CORNELL · CLASS OF 2028 · ECE" },
  { handle: "u/yale_mcb_27",  style: "mentor", mentorBadge: "YALE · CLASS OF 2027 · MCB" },
  { handle: "u/jhu_bme_26",   style: "mentor", mentorBadge: "JHU · CLASS OF 2026 · BME" },
  { handle: "u/penn_neuro_26",style: "mentor", mentorBadge: "PENN · CLASS OF 2026 · NEURO" },
];

// ─── DEFAULT ROSTER (used by every other lounge) ───────────────────────────
// Thin shared roster so no lounge looks dead. Lounge-specific rosters can be
// authored later without changing the runtime.
export const DEFAULT_ROSTER: LoungeSeedAuthor[] = [
  { handle: "u/studying_late",          style: "casual" },
  { handle: "u/im_just_vibing",         style: "casual" },
  { handle: "u/student_acc99",          style: "casual" },
  { handle: "u/finals_szn_doomed",      style: "casual" },
  { handle: "u/lurker_acc",             style: "casual" },
  { handle: "u/throwaway_homework",     style: "casual" },
  { handle: "u/just_passing_thru",      style: "casual" },
  { handle: "u/inhero_lurker",          style: "casual" },
  { handle: "u/late_night_grind",       style: "casual" },
  { handle: "u/2026_grad",              style: "ambition" },
  { handle: "u/2027_grad",              style: "ambition" },
  { handle: "u/cohort_member_27",       style: "ambition" },
  { handle: "u/no_thoughts_just_studying", style: "casual" },
  { handle: "u/upperclassman_2025",     style: "mentor", mentorBadge: "MENTOR · UNDERGRAD" },
  { handle: "u/big_sibling_mentor",     style: "mentor", mentorBadge: "MENTOR · CLASS OF 2026" },
];

// ─── ROSTER LOOKUP ─────────────────────────────────────────────────────────
const ROSTER_BY_SLUG: Record<string, LoungeSeedAuthor[]> = {
  "ap-bio": AP_BIO_ROSTER,
};

export function getRoster(slug: string): LoungeSeedAuthor[] {
  return ROSTER_BY_SLUG[slug] ?? DEFAULT_ROSTER;
}

const ALL_AUTHORS: LoungeSeedAuthor[] = [...AP_BIO_ROSTER, ...DEFAULT_ROSTER];
const BY_HANDLE = new Map<string, LoungeSeedAuthor>();
for (const a of ALL_AUTHORS) BY_HANDLE.set(a.handle, a);

export function findSeedAuthor(handle: string): LoungeSeedAuthor | undefined {
  return BY_HANDLE.get(handle);
}

// ─── LIVE COUNTER CONFIG ───────────────────────────────────────────────────
// Per-lounge baselines for the LiveActivityHeader. Numbers drift in a band
// during the session; AP Bio is the headliner so it carries the largest band.

export interface LoungeLiveConfig {
  onlineBase: number;
  onlineRange: number;
  messagesTodayStart: number;
  typingBase: number;
  typingRange: number;
}

const LIVE_CONFIG_BY_SLUG: Record<string, LoungeLiveConfig> = {
  // Site-wide cohort vibe surfaced on the homepage dual-path hero. Treated
  // as the headline number for "online now / typing now" across InHero, not
  // a literal sum of every lounge's baseline.
  "home":     { onlineBase: 247, onlineRange: 35, messagesTodayStart: 1284, typingBase: 18, typingRange: 7 },
  "ap-bio":   { onlineBase: 247, onlineRange: 30, messagesTodayStart: 1284, typingBase: 18, typingRange: 7 },
  "sat":      { onlineBase: 184, onlineRange: 24, messagesTodayStart: 962,  typingBase: 12, typingRange: 6 },
};
const DEFAULT_LIVE_CONFIG: LoungeLiveConfig = {
  onlineBase: 48, onlineRange: 14, messagesTodayStart: 174, typingBase: 4, typingRange: 4,
};

export function getLiveConfig(slug: string): LoungeLiveConfig {
  return LIVE_CONFIG_BY_SLUG[slug] ?? DEFAULT_LIVE_CONFIG;
}
