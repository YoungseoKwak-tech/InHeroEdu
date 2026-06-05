/**
 * GET /api/question-bank/bank
 *   ?subject=ap-biology   filter by course id (optional)
 *   ?countOnly=true       return per-subject counts only
 *
 * Serves the aggregated bank built from lesson overlays + the admin
 * questions table (see lib/questionBank). Answers and explanations are
 * scoped by paid plan: one-subject Elite sees only that subject, while the
 * all-subject pass sees every subject.
 */
import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { normalizeCourseAccessSubjectId } from "@/lib/course-access";
import {
  filterToPaidSubjects,
  getPaidSubjectAccessIds,
  hasPaidSubjectAccess,
} from "@/lib/paid-subject-access";
import { buildBankQuestions, getAllBankQuestions, countBySubject } from "@/lib/questionBank";

export const dynamic = "force-dynamic";

// The page only renders the first ~150 cards; sending all ~2,200 questions
// (multi-MB JSON) is what made the response slow. Cap the payload and
// return the true `total` so the UI can still say "showing N of M".
const DEFAULT_LIMIT = 150;
const MAX_LIMIT = 400;

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
    if (accessIds.size === 0) {
      return NextResponse.json(
        { error: "elite plan required", reason: "paid_plan_required" },
        { status: 403 }
      );
    }

    const normalizedSubject = normalizeCourseAccessSubjectId(subject);
    if (subject && !hasPaidSubjectAccess(accessIds, normalizedSubject)) {
      return NextResponse.json(
        { error: "subject not included in plan", reason: "subject_not_in_plan" },
        { status: 403 }
      );
    }

    if (countOnly) {
      // Cached full build, then scope to the student's paid subjects.
      const all = await getAllBankQuestions();
      const accessible = filterToPaidSubjects(all, accessIds, (q) => q.courseId);
      return NextResponse.json({
        subjects: countBySubject(accessible),
        total: accessible.length,
      });
    }

    const limitParam = parseInt(searchParams.get("limit") ?? "", 10);
    const limit = Math.min(
      MAX_LIMIT,
      Number.isFinite(limitParam) && limitParam > 0 ? limitParam : DEFAULT_LIMIT
    );

    const questions = await buildBankQuestions(normalizedSubject ?? undefined);
    const accessible = filterToPaidSubjects(questions, accessIds, (q) => q.courseId);
    // Cap the payload — the page only renders the first ~150 cards — but
    // report the true total so the UI can still say "showing N of M".
    return NextResponse.json({
      questions: accessible.slice(0, limit),
      total: accessible.length,
    });
  } catch (e) {
    console.error("[question-bank/bank]", e);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
