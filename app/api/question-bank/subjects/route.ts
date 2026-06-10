/**
 * GET /api/question-bank/subjects — cached per-subject counts only.
 *
 * The full bank (~12k MCQs) takes ~12s to build, and /bank?countOnly=true is
 * force-dynamic so it pays that cost on every cold start — which left the exam
 * page's subject dropdown empty for seconds. The subject list only changes on
 * deploy / script regen, so serve it via ISR: the CDN returns the cached counts
 * instantly and revalidates in the background.
 */
import { NextResponse } from "next/server";
import { getAllBankQuestions, countBySubject } from "@/lib/questionBank";

export const revalidate = 900; // seconds — background revalidate at most every 15 min

// A subject is "exam-ready" only if it has at least this many real MCQs (2+
// options) — the same filter the exam builder uses. Below this, the Bluebook
// practice test can't be assembled, so we flag it (the exam page hides those).
const MIN_EXAM_MCQ = 30;

export async function GET() {
  try {
    const all = await getAllBankQuestions();
    const base = countBySubject(all);

    // Count only questions usable in a real exam (2+ options), grouped the same
    // way countBySubject groups (courseId ?? subjectLabel).
    const validByKey = new Map<string, number>();
    for (const q of all) {
      if (Array.isArray(q.options) && q.options.length >= 2) {
        const key = q.courseId ?? q.subjectLabel;
        validByKey.set(key, (validByKey.get(key) ?? 0) + 1);
      }
    }

    const subjects = base.map((s) => {
      const key = s.courseId ?? s.label;
      const examPool = validByKey.get(key) ?? 0;
      return { ...s, examPool, examReady: examPool >= MIN_EXAM_MCQ };
    });

    return NextResponse.json(
      { subjects, total: all.length },
      { headers: { "Cache-Control": "public, s-maxage=900, stale-while-revalidate=86400" } }
    );
  } catch {
    return NextResponse.json({ subjects: [], total: 0 }, { status: 200 });
  }
}
