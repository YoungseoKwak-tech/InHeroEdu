/**
 * Student Pattern Memory
 * Reads overlay_responses to build a cognitive fingerprint for a student.
 */

import { createAdminClient } from "@/lib/supabase";

export interface StudentPattern {
  studentId: string;
  lessonId: string;
  subjectId: string;

  repeatErrors: {
    conceptName: string;
    gapType: string;
    errorCount: number;
    lastSeenLesson: string;
  }[];

  strongConcepts: {
    conceptName: string;
    correctStreak: number;
  }[];

  weakConcepts: {
    conceptName: string;
    gapType: string;
    missRate: number; // 0–1
  }[];

  confidenceProfile: {
    selfRatedWeak: string[];   // from confidence_check responses
    actuallyStrong: string[];  // conceptNames with correctStreak >= 3
    mismatch: string[];        // selfRatedWeak AND actuallyStrong
  };

  predictedBreakPoints: string[];
}

interface RawResponse {
  student_id: string;
  lesson_id: string | null;
  overlay_type: string | null;
  concept_name: string | null;
  gap_type: string | null;
  correct: boolean | null;
  response: string | null;
  created_at: string;
}

const EMPTY_PATTERN = (studentId: string, subjectId: string): StudentPattern => ({
  studentId,
  lessonId: "",
  subjectId,
  repeatErrors: [],
  strongConcepts: [],
  weakConcepts: [],
  confidenceProfile: { selfRatedWeak: [], actuallyStrong: [], mismatch: [] },
  predictedBreakPoints: [],
});

export async function getStudentPattern(
  studentId: string,
  subjectId: string
): Promise<StudentPattern> {
  if (!studentId || studentId === "preview") return EMPTY_PATTERN(studentId, subjectId);

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("overlay_responses")
      .select("student_id, lesson_id, overlay_type, concept_name, gap_type, correct, response, created_at")
      .eq("student_id", studentId)
      .eq("subject_id", subjectId)
      .order("created_at", { ascending: false })
      .limit(200);

    if (error || !data?.length) return EMPTY_PATTERN(studentId, subjectId);

    const rows = data as RawResponse[];

    // ── Per-concept tallies ─────────────────────────────────────────────────
    const conceptStats: Map<string, {
      gapType: string;
      correct: number;
      wrong: number;
      lastLesson: string;
      recentCorrectStreak: number;
      lastWasCorrect: boolean | null;
    }> = new Map();

    for (const row of rows) {
      const name = row.concept_name?.trim();
      if (!name) continue;

      if (!conceptStats.has(name)) {
        conceptStats.set(name, {
          gapType: row.gap_type ?? "CONCEPT_GAP",
          correct: 0,
          wrong: 0,
          lastLesson: row.lesson_id ?? "",
          recentCorrectStreak: 0,
          lastWasCorrect: null,
        });
      }

      const stat = conceptStats.get(name)!;

      if (row.correct === true) {
        stat.correct += 1;
        if (stat.lastWasCorrect !== false) stat.recentCorrectStreak += 1;
        stat.lastWasCorrect = true;
      } else if (row.correct === false) {
        stat.wrong += 1;
        stat.recentCorrectStreak = 0;
        stat.lastWasCorrect = false;
      }

      // lastLesson is the most recent (rows are desc by created_at)
      if (!stat.lastLesson) stat.lastLesson = row.lesson_id ?? "";
    }

    // ── Build output arrays ─────────────────────────────────────────────────
    const repeatErrors: StudentPattern["repeatErrors"] = [];
    const strongConcepts: StudentPattern["strongConcepts"] = [];
    const weakConcepts: StudentPattern["weakConcepts"] = [];

    for (const [conceptName, stat] of Array.from(conceptStats.entries())) {
      const total = stat.correct + stat.wrong;
      if (total === 0) continue;

      const missRate = stat.wrong / total;

      // Repeat errors: wrong 2+ times
      if (stat.wrong >= 2) {
        repeatErrors.push({
          conceptName,
          gapType: stat.gapType,
          errorCount: stat.wrong,
          lastSeenLesson: stat.lastLesson,
        });
      }

      // Strong concepts: correct streak 3+
      if (stat.recentCorrectStreak >= 3) {
        strongConcepts.push({ conceptName, correctStreak: stat.recentCorrectStreak });
      }

      // Weak concepts: miss rate > 50%
      if (missRate > 0.5 && total >= 2) {
        weakConcepts.push({ conceptName, gapType: stat.gapType, missRate });
      }
    }

    // Sort by severity
    repeatErrors.sort((a, b) => b.errorCount - a.errorCount);
    strongConcepts.sort((a, b) => b.correctStreak - a.correctStreak);
    weakConcepts.sort((a, b) => b.missRate - a.missRate);

    // ── Confidence profile ──────────────────────────────────────────────────
    // selfRatedWeak: concepts mentioned in confidence_check responses where student
    // expressed uncertainty (response contains "not sure", "weak", "struggle", etc.)
    const weakKeywords = ["not sure", "weak", "struggle", "don't get", "confused", "hard"];
    const selfRatedWeak: string[] = [];

    for (const row of rows) {
      if (row.overlay_type === "confidence_check" && row.concept_name && row.response) {
        const r = row.response.toLowerCase();
        if (weakKeywords.some((kw) => r.includes(kw))) {
          if (!selfRatedWeak.includes(row.concept_name)) {
            selfRatedWeak.push(row.concept_name);
          }
        }
      }
    }

    const actuallyStrong = strongConcepts.map((c) => c.conceptName);
    const mismatch = selfRatedWeak.filter((c) => actuallyStrong.includes(c));

    // ── Predicted break points: top weak + repeat errors ───────────────────
    const predictedBreakPoints = [
      ...weakConcepts.slice(0, 2).map((c) => c.conceptName),
      ...repeatErrors.slice(0, 2).map((e) => e.conceptName),
    ].filter((v, i, a) => a.indexOf(v) === i).slice(0, 4);

    return {
      studentId,
      lessonId: rows[0]?.lesson_id ?? "",
      subjectId,
      repeatErrors: repeatErrors.slice(0, 5),
      strongConcepts: strongConcepts.slice(0, 5),
      weakConcepts: weakConcepts.slice(0, 5),
      confidenceProfile: { selfRatedWeak, actuallyStrong, mismatch },
      predictedBreakPoints,
    };
  } catch {
    return EMPTY_PATTERN(studentId, subjectId);
  }
}

/** Build the pattern context string to prepend to Claude prompts. */
export function buildPatternContext(pattern: StudentPattern): string {
  const hasData =
    pattern.weakConcepts.length > 0 ||
    pattern.repeatErrors.length > 0 ||
    pattern.strongConcepts.length > 0;

  if (!hasData) return "";

  return `
STUDENT PATTERN MEMORY (from previous lessons):
- Repeat errors: ${pattern.repeatErrors.length ? pattern.repeatErrors.map((e) => `${e.conceptName} (${e.errorCount}x, ${e.gapType})`).join(", ") : "none yet"}
- Weak concepts: ${pattern.weakConcepts.length ? pattern.weakConcepts.map((c) => `${c.conceptName} (${Math.round(c.missRate * 100)}% miss rate)`).join(", ") : "none yet"}
- Strong concepts: ${pattern.strongConcepts.length ? pattern.strongConcepts.map((c) => c.conceptName).join(", ") : "none yet"}
- Predicted break points: ${pattern.predictedBreakPoints.length ? pattern.predictedBreakPoints.join(", ") : "none yet"}

Use this data to make the overlay SPECIFIC to this student's history.
If a weak concept appears in the current script section, call it out directly.
If a strong concept appears, acknowledge it and push harder.
If no pattern data exists yet, generate the overlay without personalization.
`;
}
