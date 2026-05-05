/**
 * Fetch lessons for a course from Supabase with clip availability.
 * Falls back to the AP lesson breakdown JSON if the DB table is empty.
 */

import { createAdminClient } from "@/lib/supabase";
import breakdown from "@/lib/data/ap-lesson-breakdown.json";

export interface DBLesson {
  id: string;
  unit_number: number;
  lesson_number: number;
  title: string;
}

function buildFallbackLessons(courseId: string): DBLesson[] {
  const course = breakdown.courses.find((c) => c.courseId === courseId);
  if (!course) return [];
  return course.units.flatMap((unit) =>
    unit.lessons.map((lesson) => ({
      id: `${course.courseId}-u${unit.unitNumber}-l${lesson.lessonNumber}`,
      unit_number: unit.unitNumber,
      lesson_number: lesson.lessonNumber,
      title: lesson.lessonTitle,
    }))
  );
}

export async function getCourseLessonsWithClips(courseId: string): Promise<{
  lessons: DBLesson[];
  lessonsWithClips: Set<string>;
}> {
  try {
    const supabase = createAdminClient();

    const { data: rows } = await supabase
      .from("lessons")
      .select("id, unit_number, lesson_number, title")
      .eq("course_id", courseId)
      .order("unit_number", { ascending: true })
      .order("lesson_number", { ascending: true });

    const lessons: DBLesson[] =
      rows && rows.length > 0
        ? (rows as DBLesson[])
        : buildFallbackLessons(courseId);

    const lessonsWithClips = new Set<string>();
    if (lessons.length > 0) {
      const lessonIds = lessons.map((l) => l.id);
      const { data: clips } = await supabase
        .from("lesson_clips")
        .select("lesson_id")
        .in("lesson_id", lessonIds)
        .not("clip_url", "is", null);

      (clips ?? []).forEach((c) => lessonsWithClips.add(c.lesson_id));
    }

    return { lessons, lessonsWithClips };
  } catch {
    return {
      lessons: buildFallbackLessons(courseId),
      lessonsWithClips: new Set(),
    };
  }
}
