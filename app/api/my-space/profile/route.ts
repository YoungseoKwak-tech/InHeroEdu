import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface ProfileBody {
  grade?: string | null;
  subjects?: string[];
  goals?: string | null;
  details?: Record<string, unknown>;
}

// GET /api/my-space/profile
//   Returns the viewer's study profile, or { profile: null } if no
//   row exists yet. The For You page uses null as the trigger to open
//   StudyProfileSetup.
export async function GET(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("user_study_profile")
    .select("user_id, grade, subjects, goals, details, created_at, updated_at")
    .eq("user_id", user.id)
    .maybeSingle();
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ profile: null });
  }

  return NextResponse.json({
    profile: {
      grade: data.grade,
      subjects: data.subjects ?? [],
      goals: data.goals,
      details: data.details ?? {},
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    },
  });
}

// PUT /api/my-space/profile
//   Upserts the viewer's study profile. Treats subjects as an array of
//   short strings (trimmed, deduped, capped at 12 — enough for a SAT
//   candidate juggling subjects without bloating the brief prompt).
export async function PUT(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const body = (await req.json().catch(() => ({}))) as ProfileBody;

  const grade =
    typeof body.grade === "string" && body.grade.trim() ? body.grade.trim() : null;
  const goals =
    typeof body.goals === "string" && body.goals.trim() ? body.goals.trim() : null;
  const subjects = Array.isArray(body.subjects)
    ? Array.from(
        new Set(
          body.subjects
            .map((s) => (typeof s === "string" ? s.trim() : ""))
            .filter((s) => s.length > 0 && s.length <= 60)
        )
      ).slice(0, 12)
    : [];
  const details =
    body.details && typeof body.details === "object" && !Array.isArray(body.details)
      ? body.details
      : {};

  if (!grade && subjects.length === 0 && !goals) {
    return NextResponse.json({ error: "tell us at least one thing" }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("user_study_profile")
    .upsert(
      {
        user_id: user.id,
        grade,
        subjects,
        goals,
        details,
      },
      { onConflict: "user_id" }
    )
    .select("user_id, grade, subjects, goals, details, created_at, updated_at")
    .single();
  if (error || !data) {
    return NextResponse.json({ error: error?.message ?? "upsert failed" }, { status: 500 });
  }

  return NextResponse.json({
    profile: {
      grade: data.grade,
      subjects: data.subjects ?? [],
      goals: data.goals,
      details: data.details ?? {},
      createdAt: data.created_at,
      updatedAt: data.updated_at,
    },
  });
}
