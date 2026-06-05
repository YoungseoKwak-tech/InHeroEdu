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
import { buildBankQuestions, countBySubject } from "@/lib/questionBank";

export const dynamic = "force-dynamic";

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
      const all = await buildBankQuestions();
      const accessible = filterToPaidSubjects(all, accessIds, (q) => q.courseId);
      return NextResponse.json({
        subjects: countBySubject(accessible),
        total: accessible.length,
      });
    }

    const questions = await buildBankQuestions(normalizedSubject ?? undefined);
    const accessible = filterToPaidSubjects(questions, accessIds, (q) => q.courseId);
    return NextResponse.json({ questions: accessible, total: accessible.length });
  } catch (e) {
    console.error("[question-bank/bank]", e);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
