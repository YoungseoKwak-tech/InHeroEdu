import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { requireAdminUser } from "@/lib/auth";
import breakdown from "@/lib/data/ap-lesson-breakdown.json";

type FallbackLessonRow = {
  id: string;
  course_id: string;
  unit_number: number;
  unit_title: string;
  lesson_number: number;
  title: string;
  topics: string[];
  exam_tip: string;
};

function buildFallbackLessons(courseId: string): FallbackLessonRow[] {
  const course = breakdown.courses.find((item) => item.courseId === courseId);
  if (!course) return [];

  return course.units.flatMap((unit) =>
    unit.lessons.map((lesson) => ({
      id: `${course.courseId}-u${unit.unitNumber}-l${lesson.lessonNumber}`,
      course_id: course.courseId,
      unit_number: unit.unitNumber,
      unit_title: unit.unitTitle,
      lesson_number: lesson.lessonNumber,
      title: lesson.lessonTitle,
      topics: lesson.topics,
      exam_tip: lesson.examTip,
    }))
  );
}

/**
 * GET /api/admin/lessons?courseId=ap-biology
 * Returns all lessons for a course with hasScript flag.
 */
export async function GET(req: NextRequest) {
  const admin = await requireAdminUser(req);
  if (admin instanceof NextResponse) return admin;

  const courseId = new URL(req.url).searchParams.get("courseId");
  if (!courseId) {
    return NextResponse.json({ error: "courseId required" }, { status: 400 });
  }

  const supabase = createAdminClient();

  // Fetch all lessons for this course
  const { data: lessons, error: lessonsErr } = await supabase
    .from("lessons")
    .select("id, course_id, unit_number, unit_title, lesson_number, title, topics, exam_tip")
    .eq("course_id", courseId)
    .order("unit_number", { ascending: true })
    .order("lesson_number", { ascending: true });

  let resolvedLessons = lessons ?? [];

  if (lessonsErr) {
    if (lessonsErr.code === "PGRST205") {
      console.warn("[admin/lessons] lessons table missing — falling back to JSON seed data");
      resolvedLessons = buildFallbackLessons(courseId);
    } else {
      return NextResponse.json({ error: lessonsErr.message }, { status: 500 });
    }
  }

  if (!resolvedLessons || resolvedLessons.length === 0) {
    resolvedLessons = buildFallbackLessons(courseId);
  }

  if (!resolvedLessons || resolvedLessons.length === 0) {
    return NextResponse.json({ data: [] });
  }

  // Fetch script status for all lesson IDs in one query
  const lessonIds = resolvedLessons.map((l) => l.id);
  const { data: scripts } = await supabase
    .from("lesson_scripts")
    .select("lesson_id, script_generated_at")
    .in("lesson_id", lessonIds);

  const scriptMap = new Map(
    (scripts ?? []).map((s) => [s.lesson_id, !!s.script_generated_at])
  );

  const data = resolvedLessons.map((l) => ({
    ...l,
    hasScript: scriptMap.get(l.id) ?? false,
  }));

  return NextResponse.json({ data });
}
