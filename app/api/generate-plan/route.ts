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
import { findExam } from "@/lib/planning/exams";
import { generateWeeklySchedule, type ExamSelection } from "@/lib/planning/generate-schedule";
import { matchRecommendations } from "@/lib/planning/match-recommendations";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface RequestBody {
  grade?: string;
  exams?: Array<{ slug?: string; exam_date?: string }>;
}

export async function POST(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const body = (await req.json().catch(() => null)) as RequestBody | null;
  if (!body || !Array.isArray(body.exams) || body.exams.length === 0) {
    return NextResponse.json({ error: "exams required" }, { status: 400 });
  }
  const grade = typeof body.grade === "string" ? body.grade : null;

  // Validate + normalize exams against the canonical catalog.
  const cleanedExams: ExamSelection[] = [];
  for (const e of body.exams) {
    if (typeof e?.slug !== "string") continue;
    const catalog = findExam(e.slug);
    if (!catalog) continue;
    const examDate =
      typeof e.exam_date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(e.exam_date)
        ? e.exam_date
        : catalog.default_exam_date;
    cleanedExams.push({
      slug: catalog.slug,
      name: catalog.name,
      exam_date: examDate,
    });
  }
  if (cleanedExams.length === 0) {
    return NextResponse.json({ error: "no valid exams" }, { status: 400 });
  }

  const sb = createAdminClient();

  // ── 1. Mirror grade + exam list into the existing user_study_profile
  //       (keeps For You / brief generator in sync).
  const examDatesMap: Record<string, string> = {};
  for (const e of cleanedExams) examDatesMap[e.slug] = e.exam_date;
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
