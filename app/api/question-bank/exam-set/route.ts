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
import { isAdminEmail } from "@/lib/adminEmails";
import { normalizeCourseAccessSubjectId } from "@/lib/course-access";
import { getPaidSubjectAccessIds, hasPaidSubjectAccess } from "@/lib/paid-subject-access";
import { buildBankQuestions } from "@/lib/questionBank";
import { examSpecFor, PRACTICE_SETS } from "@/lib/apExamConfig";
import { getUnlockContext, hasAnyUnlock } from "@/lib/serverUnlock";

export const dynamic = "force-dynamic";

// Free preview length for users without paid access to the subject.
const PREVIEW_MCQ = 10;

// Credit-bundle gate key (CreditGate on /parents/question-bank/exam). Unlocking
// it once with credits grants the full-length AP mock set for every subject —
// the same "묶음" model as the SAT mock (parents:sat-mock).
const AP_MOCK_UNLOCK_KEY = "parents:ap-mock";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const subject = searchParams.get("subject")?.trim();
    if (!subject) return NextResponse.json({ error: "subject required" }, { status: 400 });

    const courseId = normalizeCourseAccessSubjectId(subject) ?? subject;
    const setNum = Math.max(1, Math.min(PRACTICE_SETS, parseInt(searchParams.get("set") ?? "1", 10) || 1));
    const metaOnly = searchParams.get("meta") === "true";

    // Paid access → full-length test. Otherwise everyone (incl. signed-out)
    // still gets a short free preview of the exam experience (lead magnet).
    const user = await getAuthenticatedUser(req);
    const accessIds = user ? await getPaidSubjectAccessIds(user) : new Set<string>();
    const unlockCtx = user ? await getUnlockContext(req) : null;
    // Admins get the full-length set credit-free. Otherwise full access comes
    // from either a paid subject order or the AP-mock credit bundle unlock.
    const hasAccess =
      isAdminEmail(user?.email) ||
      hasPaidSubjectAccess(accessIds, courseId) ||
      (!!unlockCtx && hasAnyUnlock(unlockCtx, [AP_MOCK_UNLOCK_KEY]));

    const spec = examSpecFor(courseId);
    const pool = (await buildBankQuestions(courseId)).filter((q) => Array.isArray(q.options) && q.options.length >= 2);

    const fullSize = Math.min(spec.mcq, pool.length);
    const size = hasAccess ? fullSize : Math.min(PREVIEW_MCQ, pool.length);
    const minutes = hasAccess ? spec.minutes : Math.max(5, Math.ceil(size * 1.5));
    const totalSets = Math.max(1, Math.min(PRACTICE_SETS, Math.floor(pool.length / Math.max(1, size))));
    const label = pool[0]?.subjectLabel ?? courseId;

    if (metaOnly) {
      return NextResponse.json({ subject: courseId, label, totalSets, mcq: size, fullMcq: fullSize, minutes, preview: !hasAccess, poolSize: pool.length });
    }

    // No free preview: the actual exam questions require paid/unlocked access.
    // Non-holders get 403 so the client shows the upgrade gate (no leak).
    if (!hasAccess) {
      return NextResponse.json({ error: "locked", preview: true }, { status: 403 });
    }

    const effectiveSet = Math.min(setNum, totalSets);
    const start = (effectiveSet - 1) * size;
    const questions = pool.slice(start, start + size).map((q) => ({
      id: q.id, subjectLabel: q.subjectLabel, emoji: q.emoji, unit: q.unit,
      prompt: q.prompt, options: q.options, explanation: q.explanation ?? null,
    }));

    return NextResponse.json({
      subject: courseId, label, setNumber: effectiveSet, totalSets,
      mcq: questions.length, fullMcq: fullSize, minutes, preview: !hasAccess, questions,
    });
  } catch (e) {
    console.error("[question-bank/exam-set]", e);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
