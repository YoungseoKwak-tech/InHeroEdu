/**
 * GET /api/question-bank/bank
 *   ?subject=ap-biology   filter by course id (optional)
 *   ?countOnly=true       return per-subject counts only
 *
 * Serves the aggregated bank built from lesson overlays + the admin
 * questions table (see lib/questionBank). Every signed-in student sees all
 * subjects with counts and gets a couple of free questions per subject to
 * try; beyond that, unpaid subjects come back locked — prompt/options only,
 * with correct flags, feedback, explanations, and the similar-variant
 * stripped server-side so the paywall can't be read out of devtools.
 */
import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { normalizeCourseAccessSubjectId } from "@/lib/course-access";
import {
  getPaidSubjectAccessIds,
  hasPaidSubjectAccess,
} from "@/lib/paid-subject-access";
import {
  buildBankQuestions,
  getAllBankQuestions,
  countBySubject,
  type BankQuestion,
} from "@/lib/questionBank";

export const dynamic = "force-dynamic";

// The page only renders the first ~150 cards; sending all ~2,200 questions
// (multi-MB JSON) is what made the response slow. Cap the payload and
// return the true `total` so the UI can still say "showing N of M".
const DEFAULT_LIMIT = 150;
const MAX_LIMIT = 400;

// Free taste per subject for students without that subject in their plan.
const FREE_PREVIEW_PER_SUBJECT = 2;

/** Strip everything a student could use to answer or learn from. */
function lockQuestion(q: BankQuestion): BankQuestion & { locked: true } {
  return {
    ...q,
    locked: true,
    options: q.options.map((o) => ({ label: o.label, correct: false })),
    explanation: null,
    similar: null,
  };
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const subject = searchParams.get("subject")?.trim() || undefined;
    const countOnly = searchParams.get("countOnly") === "true";
    const user = await getAuthenticatedUser(req);

    if (!user) {
      return NextResponse.json(
        { error: "sign in required", reason: "sign_in_required" },
        { status: 401 }
      );
    }

    const accessIds = await getPaidSubjectAccessIds(user);
    const normalizedSubject = normalizeCourseAccessSubjectId(subject);

    if (countOnly) {
      // Everyone sees every subject and its count — the lock happens on the
      // question payload, not on visibility.
      const all = await getAllBankQuestions();
      return NextResponse.json({
        subjects: countBySubject(all),
        total: all.length,
      });
    }

    const limitParam = parseInt(searchParams.get("limit") ?? "", 10);
    const limit = Math.min(
      MAX_LIMIT,
      Number.isFinite(limitParam) && limitParam > 0 ? limitParam : DEFAULT_LIMIT
    );

    const questions = await buildBankQuestions(normalizedSubject ?? undefined);
    // Paid subjects come through untouched. For everything else the first
    // couple of questions per subject stay answerable as a free taste and
    // the rest go out locked (no answers/explanations in the payload).
    const freeUsed = new Map<string, number>();
    const shaped = questions.slice(0, limit).map((q) => {
      if (hasPaidSubjectAccess(accessIds, q.courseId)) return q;
      const key = q.courseId ?? "general";
      const used = freeUsed.get(key) ?? 0;
      if (used < FREE_PREVIEW_PER_SUBJECT) {
        freeUsed.set(key, used + 1);
        return q;
      }
      return lockQuestion(q);
    });
    // Cap the payload — the page only renders the first ~150 cards — but
    // report the true total so the UI can still say "showing N of M".
    return NextResponse.json({
      questions: shaped,
      total: questions.length,
    });
  } catch (e) {
    console.error("[question-bank/bank]", e);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
