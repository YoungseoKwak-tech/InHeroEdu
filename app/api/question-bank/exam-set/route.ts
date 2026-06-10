/**
 * GET /api/question-bank/exam-set?subject=ap-biology&set=1
 *   ?meta=true  → just availability (number of sets, mcq count, minutes), no questions
 *
 * Builds a full-length, Bluebook-style practice TEST from a subject's question
 * pool, split into non-overlapping sets (Test 1 / 2 / 3) sized to the real AP
 * Section I MCQ count. Requires paid access to the subject (the full pool with
 * answers/explanations is the paid product); otherwise returns 403 so the UI
 * can show the upgrade gate.
 */
import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { normalizeCourseAccessSubjectId } from "@/lib/course-access";
import { getPaidSubjectAccessIds, hasPaidSubjectAccess } from "@/lib/paid-subject-access";
import { buildBankQuestions } from "@/lib/questionBank";
import { examSpecFor, PRACTICE_SETS } from "@/lib/apExamConfig";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const subject = searchParams.get("subject")?.trim();
    if (!subject) return NextResponse.json({ error: "subject required" }, { status: 400 });

    const courseId = normalizeCourseAccessSubjectId(subject) ?? subject;
    const setNum = Math.max(1, Math.min(PRACTICE_SETS, parseInt(searchParams.get("set") ?? "1", 10) || 1));
    const metaOnly = searchParams.get("meta") === "true";

    const user = await getAuthenticatedUser(req);
    if (!user) {
      return NextResponse.json({ error: "sign in required", reason: "sign_in_required" }, { status: 401 });
    }
    const accessIds = await getPaidSubjectAccessIds(user);
    if (!hasPaidSubjectAccess(accessIds, courseId)) {
      return NextResponse.json({ error: "subject not in plan", reason: "paid_plan_required" }, { status: 403 });
    }

    const spec = examSpecFor(courseId);
    const pool = (await buildBankQuestions(courseId)).filter((q) => Array.isArray(q.options) && q.options.length >= 2);

    const size = Math.min(spec.mcq, pool.length);
    const totalSets = Math.max(1, Math.min(PRACTICE_SETS, Math.floor(pool.length / Math.max(1, size))));
    const label = pool[0]?.subjectLabel ?? courseId;

    if (metaOnly) {
      return NextResponse.json({ subject: courseId, label, totalSets, mcq: size, minutes: spec.minutes, poolSize: pool.length });
    }

    const effectiveSet = Math.min(setNum, totalSets);
    const start = (effectiveSet - 1) * size;
    const questions = pool.slice(start, start + size).map((q) => ({
      id: q.id, subjectLabel: q.subjectLabel, emoji: q.emoji, unit: q.unit,
      prompt: q.prompt, options: q.options, explanation: q.explanation ?? null,
    }));

    return NextResponse.json({
      subject: courseId, label, setNumber: effectiveSet, totalSets,
      mcq: questions.length, minutes: spec.minutes, questions,
    });
  } catch (e) {
    console.error("[question-bank/exam-set]", e);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
