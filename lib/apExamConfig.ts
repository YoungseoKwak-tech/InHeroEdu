// Real AP exam Section I (multiple-choice) length + time per subject, used to
// shape Bluebook-style practice tests. Counts/minutes follow College Board's
// current digital AP MCQ sections (approximate where a subject was recently
// redesigned). Values are clamped to the available question pool at runtime.
export interface ApExamSpec { mcq: number; minutes: number }

export const AP_EXAM_CONFIG: Record<string, ApExamSpec> = {
  "ap-biology": { mcq: 60, minutes: 90 },
  "ap-chemistry": { mcq: 60, minutes: 90 },
  "ap-environmental-science": { mcq: 80, minutes: 90 },
  "ap-psychology": { mcq: 75, minutes: 90 },
  "ap-us-government": { mcq: 55, minutes: 80 },
  "ap-us-history": { mcq: 55, minutes: 55 },
  "ap-world-history": { mcq: 55, minutes: 55 },
  "ap-human-geography": { mcq: 60, minutes: 60 },
  "ap-english-language": { mcq: 45, minutes: 60 },
  "ap-microeconomics": { mcq: 60, minutes: 70 },
  "ap-macroeconomics": { mcq: 60, minutes: 70 },
  "ap-statistics": { mcq: 40, minutes: 90 },
  "ap-calculus-ab": { mcq: 45, minutes: 105 },
  "ap-calculus-bc": { mcq: 45, minutes: 105 },
  "ap-computer-science-a": { mcq: 40, minutes: 90 },
  "ap-physics-1": { mcq: 50, minutes: 90 },
  "ap-physics-2": { mcq: 50, minutes: 90 },
  "ap-physics-c-mechanics": { mcq: 35, minutes: 45 },
};

export const DEFAULT_EXAM_SPEC: ApExamSpec = { mcq: 50, minutes: 80 };
export const PRACTICE_SETS = 3; // Test 1 / Test 2 / Test 3

export function examSpecFor(courseId: string | null | undefined): ApExamSpec {
  return (courseId && AP_EXAM_CONFIG[courseId]) || DEFAULT_EXAM_SPEC;
}
