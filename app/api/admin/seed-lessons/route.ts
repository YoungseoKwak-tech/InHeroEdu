import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { requireAdminUser } from "@/lib/auth";
import breakdown from "@/lib/data/ap-lesson-breakdown.json";

/**
 * POST /api/admin/seed-lessons
 * Upserts all lessons from ap-lesson-breakdown.json into the `lessons` table.
 * Safe to run multiple times (upsert, no deletes).
 */
export async function POST(req: NextRequest) {
  const admin = await requireAdminUser(req);
  if (admin instanceof NextResponse) return admin;

  const supabase = createAdminClient();

  // Build flat array of all lessons across all courses
  const rows: {
    id: string;
    course_id: string;
    unit_number: number;
    unit_title: string;
    lesson_number: number;
    title: string;
    topics: string[];
    exam_tip: string;
  }[] = [];

  for (const course of (breakdown as { courses: typeof breakdown.courses }).courses) {
    for (const unit of course.units) {
      for (const lesson of unit.lessons) {
        rows.push({
          id: `${course.courseId}-u${unit.unitNumber}-l${lesson.lessonNumber}`,
          course_id: course.courseId,
          unit_number: unit.unitNumber,
          unit_title: unit.unitTitle,
          lesson_number: lesson.lessonNumber,
          title: lesson.lessonTitle,
          topics: lesson.topics,
          exam_tip: lesson.examTip,
        });
      }
    }
  }

  // Upsert in batches of 100
  const BATCH = 100;
  let inserted = 0;
  for (let i = 0; i < rows.length; i += BATCH) {
    const batch = rows.slice(i, i + BATCH);
    const { error } = await supabase
      .from("lessons")
      .upsert(batch, { onConflict: "id" });
    if (error) {
      console.error("[seed-lessons] upsert error", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    inserted += batch.length;
  }

  return NextResponse.json({ ok: true, inserted, total: rows.length });
}
