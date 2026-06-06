import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { normalizeCourseAccessSubjectId } from "@/lib/course-access";
import {
  getPaidSubjectAccessIds,
  hasPaidSubjectAccess,
} from "@/lib/paid-subject-access";
import { SUBJECTS } from "@/lib/subjects";
import { createAdminClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

// Match the public bank behavior: non-paid visitors can try a tiny, stable
// preview set, but cannot enumerate the full answer/explanation payload.
const FREE_PREVIEW_PER_SUBJECT = 2;

async function getPreviewQuestionIds(
  supabase: ReturnType<typeof createAdminClient>,
  subject?: string
) {
  let query = supabase
    .from("questions")
    .select("id, subject")
    .not("subject", "is", null)
    .order("created_at", { ascending: false })
    .limit(subject ? FREE_PREVIEW_PER_SUBJECT : 1000);

  if (subject) query = query.eq("subject", subject);

  const { data, error } = await query;
  if (error) throw error;

  const used = new Map<string, number>();
  const ids: string[] = [];

  for (const row of data ?? []) {
    const key = row.subject ?? "general";
    const count = used.get(key) ?? 0;
    if (count >= FREE_PREVIEW_PER_SUBJECT) continue;
    used.set(key, count + 1);
    ids.push(row.id);
  }

  return ids;
}

// GET /api/question-bank?subject=ap_bio&difficulty=hard&type=multiple_choice&limit=20&page=1
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const subject    = searchParams.get("subject") ?? "";
    const difficulty = searchParams.get("difficulty") ?? "";
    const type       = searchParams.get("type") ?? "";
    const page       = Math.max(1, parseInt(searchParams.get("page") ?? "1"));
    const limit      = Math.min(50, parseInt(searchParams.get("limit") ?? "20"));
    const countOnly  = searchParams.get("countOnly") === "true";
    const user = await getAuthenticatedUser(req);

    const supabase = createAdminClient();
    const accessIds = user ? await getPaidSubjectAccessIds(user) : new Set<string>();
    const previewOnly = subject
      ? !hasPaidSubjectAccess(accessIds, subject)
      : accessIds.size === 0;

    const allowedQuestionSubjects = new Set<string>();
    for (const courseId of accessIds) {
      allowedQuestionSubjects.add(courseId);
    }
    for (const legacySubject of SUBJECTS) {
      const courseId = normalizeCourseAccessSubjectId(legacySubject.id);
      if (courseId && accessIds.has(courseId)) {
        allowedQuestionSubjects.add(legacySubject.id);
        allowedQuestionSubjects.add(courseId);
      }
    }

    if (countOnly) {
      // Return question counts per subject. The public preview is enforced on
      // the question payload, not on subject visibility.
      const { data, error } = await supabase
        .from("questions")
        .select("subject", { count: "exact" })
        .not("subject", "is", null);
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      // Group by subject
      const counts: Record<string, number> = {};
      (data ?? []).forEach((row: { subject: string }) => {
        counts[row.subject] = (counts[row.subject] ?? 0) + 1;
      });
      return NextResponse.json({ counts });
    }

    const previewIds = previewOnly
      ? await getPreviewQuestionIds(supabase, subject || undefined)
      : [];

    if (previewOnly && previewIds.length === 0) {
      return NextResponse.json({ questions: [], total: 0, page: 1, limit: 0 });
    }

    let query = supabase
      .from("questions")
      .select("id,subject,topic,difficulty,type,question_text,option_a,option_b,option_c,option_d,option_e,correct_answer,explanation,explanation_korean,tags", { count: "exact" });

    if (previewOnly) query = query.in("id", previewIds);
    if (subject)    query = query.eq("subject", subject);
    else if (allowedQuestionSubjects.size > 0) query = query.in("subject", Array.from(allowedQuestionSubjects));
    if (difficulty) query = query.eq("difficulty", difficulty);
    if (type)       query = query.eq("type", type);

    const effectivePage = previewOnly ? 1 : page;
    const effectiveLimit = previewOnly ? Math.min(limit, previewIds.length) : limit;
    query = query
      .order("created_at", { ascending: false })
      .range((effectivePage - 1) * effectiveLimit, effectivePage * effectiveLimit - 1);

    const { data, count, error } = await query;
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({
      questions: data,
      total: count ?? 0,
      page: effectivePage,
      limit: effectiveLimit,
      preview: previewOnly,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
