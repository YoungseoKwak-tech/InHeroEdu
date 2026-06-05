// Canonical exam catalog for the onboarding study-plan flow.
//
// Each entry maps an exam slug to a display name, default date for
// the next exam cycle, emoji, color, and the lounge slug we'll
// auto-recommend. Default dates are the 2026 AP / SAT calendars;
// students can override during step 3 of onboarding.

export type ExamCategory = "ap" | "standardized" | "college-apps";

export interface ExamCatalogEntry {
  slug: string;
  name: string;
  short_name: string;
  category: ExamCategory;
  default_exam_date: string; // ISO YYYY-MM-DD, 2026 cycle
  emoji: string;
  accent: string; // tailwind color name root (emerald, orange, …)
  lounge_slug?: string; // matching lounge slug if exists
  textbook_course_slug?: string; // matches textbooks.course_slug
}

// Default dates target the AP 2027 / SAT 2027 cycle. The 2026 AP
// season is essentially over by the time this catalog ships (the
// last 2026 AP exam was 2026-05-15), so seeding a new plan with
// 2026 dates would produce a row full of "PAST" countdowns. AP
// dates below are from the College Board 2027 calendar; SAT/ACT
// are the next Saturdays after the 2026 season closes.
export const EXAM_CATALOG: ExamCatalogEntry[] = [
  // ── AP Sciences ───────────────────────────────────────────────
  { slug: "ap-bio",     name: "AP Biology",            short_name: "AP Bio",     category: "ap", default_exam_date: "2027-05-12", emoji: "🧬", accent: "emerald", lounge_slug: "ap-bio",     textbook_course_slug: "ap-bio" },
  { slug: "ap-chem",    name: "AP Chemistry",          short_name: "AP Chem",    category: "ap", default_exam_date: "2027-05-07", emoji: "⚗️", accent: "orange",  lounge_slug: "ap-chem",    textbook_course_slug: "ap-chem" },
  { slug: "ap-physics-1", name: "AP Physics 1",        short_name: "AP Phys 1",  category: "ap", default_exam_date: "2027-05-14", emoji: "⚛️", accent: "sky",     lounge_slug: "ap-physics", textbook_course_slug: "ap-physics" },
  { slug: "ap-physics-c", name: "AP Physics C",        short_name: "AP Phys C",  category: "ap", default_exam_date: "2027-05-12", emoji: "⚛️", accent: "sky",     lounge_slug: "ap-physics" },
  { slug: "ap-env-sci", name: "AP Environmental Science", short_name: "APES",    category: "ap", default_exam_date: "2027-05-05", emoji: "🌱", accent: "emerald" },
  // ── AP Math ────────────────────────────────────────────────────
  { slug: "ap-calc-ab", name: "AP Calculus AB",        short_name: "Calc AB",    category: "ap", default_exam_date: "2027-05-11", emoji: "📐", accent: "rose",    lounge_slug: "ap-calc-bc" },
  { slug: "ap-calc-bc", name: "AP Calculus BC",        short_name: "Calc BC",    category: "ap", default_exam_date: "2027-05-11", emoji: "📐", accent: "rose",    lounge_slug: "ap-calc-bc" },
  { slug: "ap-stats",   name: "AP Statistics",         short_name: "AP Stats",   category: "ap", default_exam_date: "2027-05-14", emoji: "📊", accent: "violet" },
  // ── AP History ────────────────────────────────────────────────
  { slug: "ap-us-hist", name: "AP US History",         short_name: "APUSH",      category: "ap", default_exam_date: "2027-05-08", emoji: "🇺🇸", accent: "amber" },
  { slug: "ap-world",   name: "AP World History",      short_name: "AP World",   category: "ap", default_exam_date: "2027-05-14", emoji: "🌍", accent: "amber" },
  { slug: "ap-euro",    name: "AP European History",   short_name: "AP Euro",    category: "ap", default_exam_date: "2027-05-08", emoji: "🏛️", accent: "amber" },
  // ── AP English ────────────────────────────────────────────────
  { slug: "ap-english-lit",  name: "AP English Literature", short_name: "AP Lit",  category: "ap", default_exam_date: "2027-05-06", emoji: "📖", accent: "rose" },
  { slug: "ap-english-lang", name: "AP English Language",   short_name: "AP Lang", category: "ap", default_exam_date: "2027-05-12", emoji: "📝", accent: "rose" },
  // ── AP CS ──────────────────────────────────────────────────────
  { slug: "ap-cs-a", name: "AP Computer Science A",       short_name: "AP CSA",   category: "ap", default_exam_date: "2027-05-06", emoji: "💻", accent: "indigo", lounge_slug: "cs-ai" },
  { slug: "ap-csp", name: "AP Computer Science Principles", short_name: "AP CSP", category: "ap", default_exam_date: "2027-05-14", emoji: "💻", accent: "indigo", lounge_slug: "cs-ai" },
  // ── AP Social ──────────────────────────────────────────────────
  { slug: "ap-psych",     name: "AP Psychology",            short_name: "AP Psych", category: "ap", default_exam_date: "2027-05-12", emoji: "🧠", accent: "violet" },
  { slug: "ap-macro",     name: "AP Macroeconomics",        short_name: "Macro",    category: "ap", default_exam_date: "2027-05-07", emoji: "💵", accent: "amber" },
  { slug: "ap-micro",     name: "AP Microeconomics",        short_name: "Micro",    category: "ap", default_exam_date: "2027-05-12", emoji: "📉", accent: "amber" },
  { slug: "ap-human-geo", name: "AP Human Geography",       short_name: "HuGeo",    category: "ap", default_exam_date: "2027-05-05", emoji: "🗺️", accent: "emerald" },
  // ── AP Languages ───────────────────────────────────────────────
  { slug: "ap-spanish", name: "AP Spanish Language",     short_name: "AP Spanish", category: "ap", default_exam_date: "2027-05-12", emoji: "🇪🇸", accent: "orange" },
  { slug: "ap-chinese", name: "AP Chinese Language",     short_name: "AP Chinese", category: "ap", default_exam_date: "2027-05-07", emoji: "🇨🇳", accent: "rose" },
  { slug: "ap-french",  name: "AP French Language",      short_name: "AP French",  category: "ap", default_exam_date: "2027-05-12", emoji: "🇫🇷", accent: "sky" },
  // ── Standardized ──────────────────────────────────────────────
  { slug: "sat", name: "SAT",         short_name: "SAT", category: "standardized", default_exam_date: "2027-06-05", emoji: "📝", accent: "violet", lounge_slug: "sat" },
  { slug: "act", name: "ACT",         short_name: "ACT", category: "standardized", default_exam_date: "2027-06-12", emoji: "📝", accent: "violet" },
  // ── College apps ──────────────────────────────────────────────
  { slug: "common-app",   name: "Common App essays",    short_name: "Common App", category: "college-apps", default_exam_date: "2026-11-01", emoji: "✍️", accent: "amber",  lounge_slug: "admissions" },
  { slug: "supplements",  name: "Supplemental essays",  short_name: "Supps",      category: "college-apps", default_exam_date: "2026-12-01", emoji: "✍️", accent: "amber",  lounge_slug: "admissions" },
  { slug: "interview-prep", name: "Interview prep",     short_name: "Interview",  category: "college-apps", default_exam_date: "2027-02-01", emoji: "🎤", accent: "rose",   lounge_slug: "admissions" },
];

export function findExam(slug: string): ExamCatalogEntry | undefined {
  return EXAM_CATALOG.find((e) => e.slug === slug);
}

/**
 * Default target-finish-date for a freshly selected subject.
 * "Today + 6 months", clamped to the next day boundary so it doesn't
 * drift with timezone. Matches the confirmed UX default — students
 * who don't touch the date input get a believable, AP-season-aligned
 * window.
 */
export function defaultFinishDateISO(now: Date = new Date()): string {
  const d = new Date(now);
  d.setMonth(d.getMonth() + 6);
  return d.toISOString().slice(0, 10);
}

export const EXAMS_BY_CATEGORY: Record<ExamCategory, ExamCatalogEntry[]> = {
  ap:             EXAM_CATALOG.filter((e) => e.category === "ap"),
  standardized:   EXAM_CATALOG.filter((e) => e.category === "standardized"),
  "college-apps": EXAM_CATALOG.filter((e) => e.category === "college-apps"),
};

export const CATEGORY_LABELS: Record<ExamCategory, string> = {
  ap: "AP Exams",
  standardized: "Standardized Tests",
  "college-apps": "College Apps",
};
