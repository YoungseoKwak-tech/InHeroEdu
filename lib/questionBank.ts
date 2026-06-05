/**
 * Question Bank aggregator.
 *
 * Pulls every practice question InHero has authored into one normalized
 * list, from three sources:
 *
 *   1. lesson_scripts.chapter_json.generated_questions — the full MCQ set
 *      generated for every script-generated lesson, across ALL subjects
 *      (~1,600 MCQs: Bio, Chem, Physics, Calc, USH). Each has choices, the
 *      correct letter, and an explanation. Siblings in the same lesson are
 *      paired as each other's "similar problem."
 *   2. lesson overlays (the AP Bio inline checks):
 *        - tap_quick      → 1 MCQ + a built-in `followup` (similar problem)
 *        - question_sprint → an array of MCQs, each with an explanation
 *   3. the admin `questions` table (manually authored bank questions)
 *
 * Every item carries its options, the correct flag, per-option feedback,
 * an explanation, and — when one exists — a `similar` question so a wrong
 * answer can immediately offer "try one like it," mirroring the in-lesson
 * experience.
 *
 * Server-side only (uses the admin client).
 */
import { createAdminClient } from "@/lib/supabase";
import { inferCourseIdFromLessonId } from "@/lib/learning-tracking";
import { getCourseIdVariants } from "@/lib/courseAliases";
import { courses } from "@/lib/data/courses";
import { normalizeCourseAccessSubjectId } from "@/lib/course-access";

export interface BankOption {
  label: string;
  correct: boolean;
  feedback?: string | null;
}

export interface BankQuestion {
  id: string;
  source: "lesson" | "admin";
  courseId: string | null;
  subjectLabel: string;
  emoji: string;
  lessonId: string | null;
  unit: number | null;
  prompt: string;
  options: BankOption[];
  explanation?: string | null;
  /** A near-variant to offer when the student answers wrong. */
  similar?: { prompt: string; options: BankOption[] } | null;
}

const courseMeta = new Map(
  courses.map((c) => [c.id, { label: c.subjectEn, emoji: c.icon }])
);

function metaFor(courseId: string | null): { label: string; emoji: string } {
  if (courseId && courseMeta.has(courseId)) return courseMeta.get(courseId)!;
  return { label: courseId ?? "General", emoji: "📘" };
}

function unitFromLessonId(lessonId: string | null): number | null {
  if (!lessonId) return null;
  const m = lessonId.match(/-u(\d+)-l\d+/i);
  return m ? parseInt(m[1], 10) : null;
}

/** Clean an overlay options array of {label, correct, feedback}. */
function normTapOptions(raw: unknown): BankOption[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((o): o is Record<string, unknown> => !!o && typeof o === "object")
    .map((o) => ({
      label: String(o.label ?? "").trim(),
      correct: o.correct === true,
      feedback: typeof o.feedback === "string" ? o.feedback : null,
    }))
    .filter((o) => o.label.length > 0);
}

interface OverlayRow {
  id: string;
  lesson_id: string;
  type: string;
  data: Record<string, unknown> | null;
}

function fromTapQuick(row: OverlayRow): BankQuestion | null {
  const d = row.data ?? {};
  const prompt = String(d.question ?? "").trim();
  const options = normTapOptions(d.options);
  if (!prompt || options.length < 2 || !options.some((o) => o.correct)) return null;

  const courseId = inferCourseIdFromLessonId(row.lesson_id);
  const meta = metaFor(courseId);

  let similar: BankQuestion["similar"] = null;
  const fu = d.followup;
  if (fu && typeof fu === "object") {
    const fObj = fu as Record<string, unknown>;
    const fPrompt = String(fObj.question ?? "").trim();
    const fOpts = normTapOptions(fObj.options);
    if (fPrompt && fOpts.length >= 2) similar = { prompt: fPrompt, options: fOpts };
  }

  return {
    id: `lesson:${row.id}`,
    source: "lesson",
    courseId,
    subjectLabel: meta.label,
    emoji: meta.emoji,
    lessonId: row.lesson_id,
    unit: unitFromLessonId(row.lesson_id),
    prompt,
    options,
    explanation: typeof d.hint === "string" ? d.hint : null,
    similar,
  };
}

function fromQuestionSprint(row: OverlayRow): BankQuestion[] {
  const d = row.data ?? {};
  const list = Array.isArray(d.questions) ? d.questions : [];
  const courseId = inferCourseIdFromLessonId(row.lesson_id);
  const meta = metaFor(courseId);
  const unit = unitFromLessonId(row.lesson_id);

  const parsed = list
    .filter((q): q is Record<string, unknown> => !!q && typeof q === "object")
    .map((q) => {
      const prompt = String(q.question ?? "").trim();
      const rawOpts = Array.isArray(q.options) ? q.options : [];
      const correctIdx = typeof q.correct === "number" ? q.correct : -1;
      const options: BankOption[] = rawOpts.map((o, i) => ({
        label: String(o ?? "").trim(),
        correct: i === correctIdx,
      }));
      return {
        prompt,
        options,
        explanation: typeof q.explanation === "string" ? q.explanation : null,
      };
    })
    .filter((q) => q.prompt && q.options.length >= 2 && q.options.some((o) => o.correct));

  // Pair siblings in the same sprint as each other's "similar" question.
  return parsed.map((q, i) => {
    const sib = parsed[(i + 1) % parsed.length];
    const similar =
      parsed.length > 1 && sib ? { prompt: sib.prompt, options: sib.options } : null;
    return {
      id: `lesson:${row.id}:${i}`,
      source: "lesson" as const,
      courseId,
      subjectLabel: meta.label,
      emoji: meta.emoji,
      lessonId: row.lesson_id,
      unit,
      prompt: q.prompt,
      options: q.options,
      explanation: q.explanation,
      similar,
    };
  });
}

interface ScriptRow {
  lesson_id: string;
  chapter_json: Record<string, unknown> | null;
}

/** Pull the generated_questions.mcq array out of a lesson_scripts row. */
function fromGeneratedQuestions(row: ScriptRow): BankQuestion[] {
  const cj = row.chapter_json;
  if (!cj || typeof cj !== "object") return [];
  const gq = (cj as Record<string, unknown>).generated_questions;
  if (!gq || typeof gq !== "object") return [];
  const mcq = (gq as Record<string, unknown>).mcq;
  if (!Array.isArray(mcq)) return [];

  const courseId = inferCourseIdFromLessonId(row.lesson_id);
  const meta = metaFor(courseId);
  const unit = unitFromLessonId(row.lesson_id);

  const parsed = mcq
    .filter((q): q is Record<string, unknown> => !!q && typeof q === "object")
    .map((q) => {
      const prompt = String(q.question ?? "").trim();
      const choices = q.choices;
      const answer = String(q.answer ?? "").trim().toUpperCase();
      const options: BankOption[] = [];
      if (choices && typeof choices === "object" && !Array.isArray(choices)) {
        for (const letter of ["A", "B", "C", "D", "E"]) {
          const label = (choices as Record<string, unknown>)[letter];
          if (typeof label === "string" && label.trim()) {
            options.push({ label: label.trim(), correct: letter === answer });
          }
        }
      }
      return {
        prompt,
        options,
        explanation: typeof q.explanation === "string" ? q.explanation : null,
      };
    })
    .filter((q) => q.prompt && q.options.length >= 2 && q.options.some((o) => o.correct));

  // Pair siblings in the same lesson as each other's "similar" question.
  return parsed.map((q, i) => {
    const sib = parsed[(i + 1) % parsed.length];
    const similar =
      parsed.length > 1 && sib ? { prompt: sib.prompt, options: sib.options } : null;
    return {
      id: `script:${row.lesson_id}:${i}`,
      source: "lesson" as const,
      courseId,
      subjectLabel: meta.label,
      emoji: meta.emoji,
      lessonId: row.lesson_id,
      unit,
      prompt: q.prompt,
      options: q.options,
      explanation: q.explanation,
      similar,
    };
  });
}

interface AdminQuestionRow {
  id: string;
  subject: string | null;
  topic: string | null;
  question_text: string | null;
  option_a: string | null;
  option_b: string | null;
  option_c: string | null;
  option_d: string | null;
  option_e: string | null;
  correct_answer: string | null;
  explanation: string | null;
}

function fromAdminRow(row: AdminQuestionRow): BankQuestion | null {
  const prompt = (row.question_text ?? "").trim();
  if (!prompt) return null;
  const letters = ["A", "B", "C", "D", "E"] as const;
  const labels = [row.option_a, row.option_b, row.option_c, row.option_d, row.option_e];
  const correct = (row.correct_answer ?? "").trim().toUpperCase();
  const options: BankOption[] = labels
    .map((label, i) => ({
      label: (label ?? "").trim(),
      correct: letters[i] === correct,
    }))
    .filter((o) => o.label.length > 0);
  if (options.length < 2 || !options.some((o) => o.correct)) return null;

  const courseId = normalizeCourseAccessSubjectId(row.subject);
  const meta = metaFor(courseId);

  // Admin subjects may use ap_bio-style ids; normalize them so access
  // checks and subject filters use the same course id vocabulary.
  return {
    id: `admin:${row.id}`,
    source: "admin",
    courseId,
    subjectLabel: courseId ? meta.label : row.subject ?? row.topic ?? "Question Bank",
    emoji: courseId ? meta.emoji : "🏦",
    lessonId: null,
    unit: null,
    prompt,
    options,
    explanation: row.explanation,
    similar: null,
  };
}

/**
 * Build the full normalized bank. `subject` filters by course id
 * (e.g. "ap-biology"); omit for everything.
 */
export async function buildBankQuestions(subject?: string): Promise<BankQuestion[]> {
  const supabase = createAdminClient();

  const [scriptRes, overlayRes, adminRes] = await Promise.all([
    supabase.from("lesson_scripts").select("lesson_id, chapter_json"),
    supabase
      .from("overlays")
      .select("id, lesson_id, type, data")
      .in("type", ["tap_quick", "question_sprint"]),
    supabase
      .from("questions")
      .select(
        "id, subject, topic, question_text, option_a, option_b, option_c, option_d, option_e, correct_answer, explanation"
      ),
  ]);

  const out: BankQuestion[] = [];

  // Primary source: generated MCQs across every subject.
  for (const row of (scriptRes.data ?? []) as ScriptRow[]) {
    out.push(...fromGeneratedQuestions(row));
  }
  // Inline lesson checks (AP Bio) — carry authored followups (similar Qs).
  for (const row of (overlayRes.data ?? []) as OverlayRow[]) {
    if (row.type === "tap_quick") {
      const q = fromTapQuick(row);
      if (q) out.push(q);
    } else if (row.type === "question_sprint") {
      out.push(...fromQuestionSprint(row));
    }
  }
  // Admin-authored bank questions.
  for (const row of (adminRes.data ?? []) as AdminQuestionRow[]) {
    const q = fromAdminRow(row);
    if (q) out.push(q);
  }

  // Filter by course id, tolerant of id variants (course pages may pass
  // "ap-physics-c-mech" while bank questions are tagged the data-layer
  // form "ap-physics-c-mechanics").
  const normalizedSubject = normalizeCourseAccessSubjectId(subject) ?? subject;
  const subjectVariants = normalizedSubject ? getCourseIdVariants(normalizedSubject) : null;
  const filtered = subjectVariants
    ? out.filter((q) => q.courseId && subjectVariants.includes(q.courseId))
    : out;

  // Stable-ish ordering: subject, then unit, then prompt.
  filtered.sort((a, b) => {
    if (a.subjectLabel !== b.subjectLabel) return a.subjectLabel.localeCompare(b.subjectLabel);
    if ((a.unit ?? 99) !== (b.unit ?? 99)) return (a.unit ?? 99) - (b.unit ?? 99);
    return a.prompt.localeCompare(b.prompt);
  });

  return filtered;
}

/** Per-course counts for the landing chips. */
export function countBySubject(questions: BankQuestion[]): Array<{
  courseId: string | null;
  label: string;
  emoji: string;
  count: number;
}> {
  const map = new Map<string, { courseId: string | null; label: string; emoji: string; count: number }>();
  for (const q of questions) {
    const key = q.courseId ?? q.subjectLabel;
    const cur = map.get(key);
    if (cur) cur.count += 1;
    else map.set(key, { courseId: q.courseId, label: q.subjectLabel, emoji: q.emoji, count: 1 });
  }
  return Array.from(map.values()).sort((a, b) => b.count - a.count);
}
