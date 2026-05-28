/**
 * /api/me/recent-lesson
 *
 * GET → the student's most recently touched lesson, used by the home page
 * ResumeCard to render a single primary "Continue → [Lesson]" CTA.
 *
 * Source: lesson_progress (one row per overlay interaction). The most
 * recent row's lesson_id wins. Enriches with title from lessons table.
 *
 * If the student has no lesson_progress rows yet, returns
 * { ok: true, data: null } and the UI falls back to "Pick a class →".
 */

import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import { inferCourseIdFromLessonId } from "@/lib/learning-tracking";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const supabase = createAdminClient();

  // Most recent lesson_progress row for this user.
  const { data: progress, error: pErr } = await supabase
    .from("lesson_progress")
    .select("lesson_id, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (pErr) {
    console.error("[/api/me/recent-lesson] progress query failed", pErr.message);
    return NextResponse.json({ error: pErr.message }, { status: 500 });
  }

  if (!progress?.lesson_id) {
    return NextResponse.json({ ok: true, data: null });
  }

  const lessonId = progress.lesson_id as string;

  // Enrich with title + course_id from the lessons table. course_id is also
  // recoverable from the lesson_id pattern (ap-biology-u1-l1) so we fall
  // back to that if the lessons row is missing.
  const { data: lessonRow } = await supabase
    .from("lessons")
    .select("title, course_id")
    .eq("id", lessonId)
    .maybeSingle();

  const inferredCourseId = inferCourseIdFromLessonId(lessonId);
  const courseId = (lessonRow?.course_id as string | undefined) ?? inferredCourseId ?? null;
  const title = (lessonRow?.title as string | undefined) ?? null;

  return NextResponse.json({
    ok: true,
    data: {
      lesson_id: lessonId,
      title,
      course_id: courseId,
      last_at: progress.created_at as string,
    },
  });
}
