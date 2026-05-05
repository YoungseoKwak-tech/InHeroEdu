import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { requireAuthenticatedUser } from "@/lib/auth";
import { detectPattern } from "@/lib/pattern-detector";

/**
 * POST /api/lesson-progress
 *
 * Saves one overlay interaction from the LessonPlayer.
 * After saving, runs the pattern detector to update student_patterns,
 * student_stats, and learning_logs.
 */
export async function POST(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  let body: {
    lessonId?: string;
    partId?: string;
    overlayType?: string;
    studentResponse?: string;
    isCorrect?: boolean;
    gapType?: string;
    timeSpentSeconds?: number;
    subject?: string;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid JSON" }, { status: 400 });
  }

  const {
    lessonId,
    partId,
    overlayType,
    studentResponse = "",
    isCorrect = false,
    gapType = null,
    timeSpentSeconds = 0,
    subject = null,
  } = body;

  if (!lessonId || !partId || !overlayType) {
    return NextResponse.json(
      { error: "lessonId, partId, and overlayType are required" },
      { status: 400 }
    );
  }

  const supabase = createAdminClient();

  const { error } = await supabase.from("lesson_progress").insert({
    user_id: user.id,
    lesson_id: lessonId,
    part_id: partId,
    overlay_type: overlayType,
    student_response: studentResponse,
    is_correct: isCorrect,
    gap_type: gapType,
    time_spent_seconds: timeSpentSeconds,
  });

  if (error) {
    console.error("[lesson-progress]", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Fire-and-forget: pattern detection runs async, never blocks the response
  detectPattern(
    user.id,
    lessonId,
    overlayType,
    isCorrect,
    gapType,
    timeSpentSeconds,
    subject
  ).catch((err) => console.error("[pattern-detector]", err));

  return NextResponse.json({ ok: true });
}

/**
 * GET /api/lesson-progress?lessonId=<id>
 *
 * Returns all overlay interactions for the current user and lesson.
 * Used by the Thinking Analyzer to surface learning patterns.
 */
export async function GET(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const lessonId = new URL(req.url).searchParams.get("lessonId");
  if (!lessonId) {
    return NextResponse.json({ error: "lessonId required" }, { status: 400 });
  }

  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("lesson_progress")
    .select("part_id, overlay_type, student_response, is_correct, created_at")
    .eq("user_id", user.id)
    .eq("lesson_id", lessonId)
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ rows: data ?? [] });
}
