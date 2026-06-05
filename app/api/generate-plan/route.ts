// POST /api/generate-plan
//
// Body: { grade: "9"|"10"|"11"|"12"|"other", exams: [{ slug, exam_date }] }
//
// Side effects:
//   - Upsert user_study_profile (grade + subjects + exam_dates in details jsonb)
//   - Upsert user_study_plans (the renderable bundle)
//
// Response: the freshly stored plan row, including weekly_schedule,
// recommended_materials, recommended_lounges, recommended_clubs, plus
// the enriched exam_selections (with next chapter info baked in).

import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import { findExam, defaultFinishDateISO } from "@/lib/planning/exams";
import { generateWeeklySchedule, type ExamSelection } from "@/lib/planning/generate-schedule";
import { matchRecommendations } from "@/lib/planning/match-recommendations";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface RequestBody {
  grade?: string;
  exams?: Array<{
    slug?: string;
    target_finish_date?: string;
    // Optional: present only when the student is taking the AP exam.
    exam_date?: string | null;
  }>;
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export async function POST(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const body = (await req.json().catch(() => null)) as RequestBody | null;
  if (!body || !Array.isArray(body.exams) || body.exams.length === 0) {
    return NextResponse.json({ error: "exams required" }, { status: 400 });
  }
  const grade = typeof body.grade === "string" ? body.grade : null;

  // Validate + normalize exams against the canonical catalog.
  // New schema: target_finish_date is required, exam_date is optional.
  // Legacy schema (only exam_date sent) is still accepted — we treat
  // the old exam_date as the target_finish_date so existing clients
  // and one-off scripts don't break.
  const cleanedExams: ExamSelection[] = [];
  for (const raw of body.exams) {
    if (typeof raw?.slug !== "string") continue;
    const catalog = findExam(raw.slug);
    if (!catalog) continue;

    const rawFinish = raw.target_finish_date;
    const rawExam = raw.exam_date;

    const finishDate =
      typeof rawFinish === "string" && ISO_DATE.test(rawFinish)
        ? rawFinish
        : typeof rawExam === "string" && ISO_DATE.test(rawExam)
        ? rawExam // legacy fallback
        : defaultFinishDateISO();

    const examDate =
      typeof rawExam === "string" && ISO_DATE.test(rawExam) ? rawExam : null;

    cleanedExams.push({
      slug: catalog.slug,
      name: catalog.name,
      target_finish_date: finishDate,
      exam_date: examDate,
    });
  }
  if (cleanedExams.length === 0) {
    return NextResponse.json({ error: "no valid exams" }, { status: 400 });
  }

  const sb = createAdminClient();

  // ── 1. Mirror grade + exam list into the existing user_study_profile
  //       (keeps For You / brief generator in sync). The mirror stores
  //       target_finish_date under the same exam_dates key because
  //       downstream consumers (brief generator, recommendations) only
  //       care about "when does this user want to be done".
  const examDatesMap: Record<string, string> = {};
  for (const e of cleanedExams) examDatesMap[e.slug] = e.target_finish_date;
  await sb.from("user_study_profile").upsert({
    user_id: user.id,
    grade,
    subjects: cleanedExams.map((e) => e.slug),
    details: { exam_dates: examDatesMap },
    updated_at: new Date().toISOString(),
  });

  // ── 2. Match textbooks / lounges / clubs and enrich each exam
  const { materials, lounges, clubs, enrichedExams } =
    await matchRecommendations(sb, cleanedExams, user.id);

  // ── 3. Build weekly schedule from enriched exams
  const weeklySchedule = generateWeeklySchedule(enrichedExams);

  // ── 4. Persist plan (unique on user_id; upsert overwrites)
  const { data, error } = await sb
    .from("user_study_plans")
    .upsert(
      {
        user_id: user.id,
        grade,
        exam_selections: enrichedExams,
        weekly_schedule: weeklySchedule,
        recommended_materials: materials,
        recommended_lounges: lounges,
        recommended_clubs: clubs,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" },
    )
    .select("*")
    .single();

  if (error || !data) {
    return NextResponse.json(
      { error: error?.message ?? "Failed to save plan" },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true, plan: data });
}

// GET /api/generate-plan — fetch the viewer's current plan.
export async function GET(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const sb = createAdminClient();
  const { data, error } = await sb
    .from("user_study_plans")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true, plan: data ?? null });
}
