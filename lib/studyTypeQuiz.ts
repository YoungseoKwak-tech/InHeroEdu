/**
 * lib/studyTypeQuiz.ts
 *
 * 8-question study-type quiz that maps a student's self-reported
 * study habits onto one of the 20 InHero HeroCode personas. Each
 * answer adds points to 1-2 codes; the top-scoring code becomes
 * the student's primary "Study Type", with the runners-up shown as
 * facets on the result card.
 *
 * The questions are tuned to MZ self-reflection language (fast,
 * recognizable, no jargon) but each option maps to a real cognitive
 * variable from the codes: pattern detection (CF/CV), system thinking
 * (CS), exploration (CE/CT), vision-driven drive (DF/DA/DB), pressure
 * response (PF/PB/PE), risk handling (FS/FT/FB), social orientation
 * (IF/IE/IB). That makes the persona reveal a real signal — not
 * pseudoscientific learning-style theater.
 */

import type { HeroCodeId } from "@/lib/hero-codes";

export interface QuizOption {
  label: string;
  // Each option adds points to one or more codes. Higher numbers = stronger
  // signal toward that code. Keeping this compact (most options have 1-2
  // codes) so scoring is interpretable.
  codes: Partial<Record<HeroCodeId, number>>;
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: QuizOption[];
}

export const STUDY_TYPE_QUESTIONS: QuizQuestion[] = [
  {
    id: "q1_new_unit",
    prompt: "Starting a new unit, you…",
    options: [
      { label: "Want the big picture first",                      codes: { CF: 3, CV: 2 } },
      { label: "Move chapter-by-chapter in order",                codes: { CS: 3, FS: 1 } },
      { label: "Start with whatever looks interesting",           codes: { CE: 3, CF: 1 } },
      { label: "Set the goal first, then start",                  codes: { DF: 3, DB: 1 } },
    ],
  },
  {
    id: "q2_understanding",
    prompt: "You know you \"get it\" when…",
    options: [
      { label: "You can see the pattern",                         codes: { CF: 3, CV: 2 } },
      { label: "You can explain it to a friend",                  codes: { DA: 3, IB: 1 } },
      { label: "You can solve similar problems",                  codes: { CT: 3, CS: 1 } },
      { label: "It connects to a real-life example",              codes: { CA: 3, CF: 1 } },
    ],
  },
  {
    id: "q3_two_weeks_out",
    prompt: "Two weeks before the exam, you're…",
    options: [
      { label: "Already done, just reviewing",                    codes: { DF: 3, DS: 2 } },
      { label: "A little every day, steady",                      codes: { CS: 3, FB: 1 } },
      { label: "Only really study when it's almost due",          codes: { PF: 3, PE: 2 } },
      { label: "Anxious but haven't actually started",            codes: { FT: 3, FB: 2 } },
    ],
  },
  {
    id: "q4_stuck_problem",
    prompt: "Hit a problem you can't solve. First reaction?",
    options: [
      { label: "Try a different angle",                           codes: { CT: 3, CE: 1 } },
      { label: "Break down the structure",                        codes: { CV: 3, CS: 1 } },
      { label: "Look for a similar pattern",                      codes: { CF: 3, CV: 1 } },
      { label: "Skip it for now, come back later",                codes: { FT: 3, FB: 2 } },
    ],
  },
  {
    id: "q5_motivation",
    prompt: "Your real fuel for studying is…",
    options: [
      { label: "The future version of you",                       codes: { DF: 3, DS: 1 } },
      { label: "Scores, rank, results",                           codes: { DB: 3, FS: 1 } },
      { label: "Pure curiosity",                                  codes: { CF: 3, CE: 2 } },
      { label: "Not wanting to fail",                             codes: { FT: 3, FB: 1 } },
    ],
  },
  {
    id: "q6_notes",
    prompt: "Your note-taking style?",
    options: [
      { label: "Diagrams / mind maps",                            codes: { CV: 3, CF: 1 } },
      { label: "Summarize in my own words",                       codes: { CA: 3, DA: 1 } },
      { label: "Copy the textbook structure",                     codes: { CS: 3, FS: 1 } },
      { label: "I don't take notes — it's in my head",            codes: { CT: 2, PB: 2 } },
    ],
  },
  {
    id: "q7_environment",
    prompt: "Where do you study best?",
    options: [
      { label: "Quiet room, alone",                               codes: { FS: 3, CS: 1 } },
      { label: "With a friend",                                   codes: { IB: 3, IE: 1 } },
      { label: "Somewhere visible (library, classroom)",          codes: { IF: 3, PS: 1 } },
      { label: "A café or with music on",                         codes: { CE: 2, PB: 2 } },
    ],
  },
  {
    id: "q8_after_exam",
    prompt: "Right after a test, you…",
    options: [
      { label: "Analyze what you got wrong",                      codes: { CV: 3, DB: 1 } },
      { label: "Immediately set the next goal",                   codes: { DS: 3, DF: 1 } },
      { label: "Talk it through with friends",                    codes: { IF: 3, IB: 1 } },
      { label: "Rest — fully empty out",                          codes: { PE: 2, CE: 1 } },
    ],
  },
];

export type ScoreMap = Partial<Record<HeroCodeId, number>>;

/**
 * Sum points across all answered options. `answers` maps question id to
 * the selected option index. Unanswered questions are skipped.
 */
export function scoreAnswers(
  answers: Record<string, number>
): ScoreMap {
  const totals: ScoreMap = {};
  for (const q of STUDY_TYPE_QUESTIONS) {
    const pick = answers[q.id];
    if (pick == null) continue;
    const opt = q.options[pick];
    if (!opt) continue;
    for (const [code, pts] of Object.entries(opt.codes) as [HeroCodeId, number][]) {
      totals[code] = (totals[code] ?? 0) + pts;
    }
  }
  return totals;
}

/**
 * Return the top N codes by score, with their percent share of total
 * points (rounded). Used to show the student "you're mostly X, with
 * Y and Z as facets".
 */
export function topCodes(
  scores: ScoreMap,
  n = 3
): Array<{ code: HeroCodeId; points: number; percent: number }> {
  const entries = Object.entries(scores) as [HeroCodeId, number][];
  entries.sort((a, b) => b[1] - a[1]);
  const total = entries.reduce((a, b) => a + b[1], 0) || 1;
  return entries.slice(0, n).map(([code, points]) => ({
    code,
    points,
    percent: Math.round((points / total) * 100),
  }));
}
