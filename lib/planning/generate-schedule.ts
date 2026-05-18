// Schedule generator — turns a list of selected exams into a
// week-by-week study calendar. Distribution rules:
//
//   - Each exam gets a fixed weekly cadence (sciences on M/W/F,
//     math on T/Th, etc.) so subjects don't collide every day.
//   - Each block is a single chapter-sized read with an estimated
//     duration in minutes.
//   - Sunday is a light review day across every selected exam.
//
// This is intentionally simple: a deterministic round-robin that
// produces something good enough to render the /my-plan page. A
// smarter scheduler (gap-based, mastery-aware) belongs behind
// the same function signature later.

import { findExam } from "./exams";

export type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export interface ExamSelection {
  slug: string;
  name: string;
  exam_date: string;
  textbook_id?: string | null;
  total_chapters?: number | null;
  next_chapter_id?: string | null;
  next_chapter_number?: string | null;
  next_chapter_title?: string | null;
}

export interface DayBlock {
  subject: string;
  subject_slug: string;
  subject_emoji: string;
  subject_color: string; // tailwind color name root
  activity: string;
  chapter_id?: string;
  chapter_number?: string;
  duration_min: number;
  type: "read" | "practice" | "review" | "discuss";
}

export type WeeklySchedule = Record<DayKey, DayBlock[]>;

// Each exam slug gets a fixed cadence across the week.
// Sciences are heavier (M/W/F), math/stats use T/Th, languages on T/Th,
// SAT/ACT prep on Sat, college apps on F. Fallback: Wed.
const DAY_MAP: Record<string, DayKey[]> = {
  "ap-bio":         ["mon", "wed", "fri"],
  "ap-chem":        ["tue", "thu"],
  "ap-physics-1":   ["mon", "thu"],
  "ap-physics-c":   ["mon", "thu"],
  "ap-env-sci":     ["wed"],
  "ap-calc-ab":     ["tue", "fri"],
  "ap-calc-bc":     ["tue", "fri"],
  "ap-stats":       ["thu"],
  "ap-us-hist":     ["mon", "wed"],
  "ap-world":       ["mon", "wed"],
  "ap-euro":        ["mon", "wed"],
  "ap-english-lit": ["tue", "fri"],
  "ap-english-lang":["tue", "fri"],
  "ap-cs-a":        ["wed", "fri"],
  "ap-csp":         ["wed"],
  "ap-psych":       ["thu"],
  "ap-macro":       ["thu"],
  "ap-micro":       ["thu"],
  "ap-human-geo":   ["wed"],
  "ap-spanish":     ["tue", "fri"],
  "ap-chinese":     ["tue", "fri"],
  "ap-french":      ["tue", "fri"],
  "sat":            ["sat"],
  "act":            ["sat"],
  "common-app":     ["fri"],
  "supplements":    ["fri"],
  "interview-prep": ["sat"],
};

const EMPTY_WEEK = (): WeeklySchedule => ({
  mon: [], tue: [], wed: [], thu: [], fri: [], sat: [], sun: [],
});

function durationFor(type: DayBlock["type"]): number {
  switch (type) {
    case "read":     return 45;
    case "practice": return 30;
    case "review":   return 20;
    case "discuss":  return 15;
  }
}

export function generateWeeklySchedule(exams: ExamSelection[]): WeeklySchedule {
  const week = EMPTY_WEEK();

  for (const exam of exams) {
    const catalog = findExam(exam.slug);
    const emoji = catalog?.emoji ?? "📚";
    const color = catalog?.accent ?? "slate";
    const days = DAY_MAP[exam.slug] ?? ["wed"];

    // Activity wording prefers the actual next-chapter title when we
    // have one; falls back to a generic "Read next chapter".
    const readActivity = exam.next_chapter_number && exam.next_chapter_title
      ? `Read Ch ${exam.next_chapter_number} — ${exam.next_chapter_title}`
      : exam.textbook_id
      ? "Read next chapter"
      : "Study session";

    for (const day of days) {
      week[day].push({
        subject: catalog?.short_name ?? exam.name,
        subject_slug: exam.slug,
        subject_emoji: emoji,
        subject_color: color,
        activity: readActivity,
        chapter_id: exam.next_chapter_id ?? undefined,
        chapter_number: exam.next_chapter_number ?? undefined,
        duration_min: durationFor("read"),
        type: "read",
      });
    }

    // Sunday: light review + lounge discussion for every exam.
    week.sun.push({
      subject: catalog?.short_name ?? exam.name,
      subject_slug: exam.slug,
      subject_emoji: emoji,
      subject_color: color,
      activity: "Review the week + lounge discussion",
      duration_min: durationFor("review"),
      type: "review",
    });
  }

  return week;
}
