/**
 * Fetch lessons for a course from Supabase with clip availability.
 * Falls back to the AP lesson breakdown JSON if the DB table is empty.
 */

import { createAdminClient } from "@/lib/supabase";
import breakdown from "@/lib/data/ap-lesson-breakdown.json";
import { getCourseIdVariants, getLessonIdVariants, resolveCourseId } from "@/lib/courseAliases";

export interface DBLesson {
  id: string;
  unit_number: number;
  lesson_number: number;
  title: string;
}

export function buildFallbackLessons(courseId: string): DBLesson[] {
  const course = getCourseIdVariants(courseId)
    .map((variant) => breakdown.courses.find((c) => c.courseId === variant))
    .find(Boolean);
  if (!course) return [];
  const normalizedCourseId = resolveCourseId(courseId);
  return course.units.flatMap((unit) =>
    unit.lessons.map((lesson) => ({
      id: `${normalizedCourseId}-u${unit.unitNumber}-l${lesson.lessonNumber}`,
      unit_number: unit.unitNumber,
      lesson_number: lesson.lessonNumber,
      title: lesson.lessonTitle,
    }))
  );
}

export function getFallbackLessonMatch(
  lessonId: string,
  courseId: string
): {
  lesson: DBLesson;
  courseId: string;
  nextLessonId: string | null;
  prevLessonId: string | null;
} | null {
  const lessons = buildFallbackLessons(courseId);
  const lessonCandidates = getLessonIdVariants(lessonId, courseId);
  const lessonIndex = lessons.findIndex((lesson) => lessonCandidates.includes(lesson.id));
  if (lessonIndex === -1) return null;

  return {
    lesson: lessons[lessonIndex],
    courseId: resolveCourseId(courseId),
    nextLessonId: lessons[lessonIndex + 1]?.id ?? null,
    prevLessonId: lessons[lessonIndex - 1]?.id ?? null,
  };
}

export async function getCourseLessonsWithClips(courseId: string): Promise<{
  lessons: DBLesson[];
  lessonsWithClips: Set<string>;
}> {
  try {
    const supabase = createAdminClient();
    const courseVariants = getCourseIdVariants(courseId);

    const { data: rows } = await supabase
      .from("lessons")
      .select("id, unit_number, lesson_number, title")
      .in("course_id", courseVariants)
      .order("unit_number", { ascending: true })
      .order("lesson_number", { ascending: true });

    const rawLessons: DBLesson[] =
      rows && rows.length > 0
        ? (rows as DBLesson[])
        : buildFallbackLessons(courseId);
    const lessons = Array.from(new Map(rawLessons.map((lesson) => [lesson.id, lesson])).values());

    const lessonsWithClips = new Set<string>();
    if (lessons.length > 0) {
      const lessonIds = lessons.flatMap((lesson) => getLessonIdVariants(lesson.id, courseId));
      const uniqueLessonIds = Array.from(new Set(lessonIds));
      const [{ data: clips }, { data: scripts }] = await Promise.all([
        supabase
          .from("lesson_clips")
          .select("lesson_id")
          .in("lesson_id", uniqueLessonIds)
          .not("clip_url", "is", null),
        supabase
          .from("lesson_scripts")
          .select("lesson_id, video_url")
          .in("lesson_id", uniqueLessonIds),
      ]);

      const clipLessonIds = new Set((clips ?? []).map((c) => c.lesson_id));
      const videoLessonIds = new Set(
        (scripts ?? [])
          .filter((row) => Boolean((row as { video_url?: string | null }).video_url))
          .map((row) => row.lesson_id)
      );

      for (const lesson of lessons) {
        const candidates = getLessonIdVariants(lesson.id, courseId);
        if (
          candidates.some(
            (candidate) => clipLessonIds.has(candidate) || videoLessonIds.has(candidate)
          )
        ) {
          lessonsWithClips.add(lesson.id);
        }
      }
    }

    return { lessons, lessonsWithClips };
  } catch {
    return {
      lessons: buildFallbackLessons(courseId),
      lessonsWithClips: new Set(),
    };
  }
}
