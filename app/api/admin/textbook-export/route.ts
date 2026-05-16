export const maxDuration = 300;
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import {
  DEFAULT_CONTENT_LOCALE,
  getLessonContentId,
  isContentLocale,
} from "@/lib/contentVariants";
import { getTextbookCourseLabel } from "@/lib/textbookCourseCatalog";

type LessonRow = {
  id: string;
  course_id: string;
  unit_title: string;
  title: string;
  unit_number: number;
  lesson_number: number;
};

type ScriptRow = {
  lesson_id: string;
  chapter_json: Record<string, unknown> | null;
};

export async function POST(req: NextRequest) {
  const admin = await requireAdminUser(req);
  if (admin instanceof NextResponse) return admin;

  const modalUrl = process.env.MODAL_TEXTBOOK_URL;
  if (!modalUrl) {
    return NextResponse.json({ error: "MODAL_TEXTBOOK_URL not configured" }, { status: 500 });
  }

  const body = await req.json().catch(() => null) as {
    courseId?: string;
    courseName?: string;
    locale?: string;
  } | null;
  const courseId = body?.courseId?.trim();
  const courseName = body?.courseName?.trim() || (courseId ? getTextbookCourseLabel(courseId) : "");
  const locale = isContentLocale(body?.locale) ? body.locale : DEFAULT_CONTENT_LOCALE;

  if (!courseId) {
    return NextResponse.json({ error: "courseId required" }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { data: lessons, error: lessonsError } = await supabase
    .from("lessons")
    .select("id, course_id, unit_title, title, unit_number, lesson_number")
    .eq("course_id", courseId)
    .order("unit_number", { ascending: true })
    .order("lesson_number", { ascending: true });

  if (lessonsError) {
    return NextResponse.json({ error: lessonsError.message }, { status: 500 });
  }

  const orderedLessons = (lessons ?? []) as LessonRow[];
  if (orderedLessons.length === 0) {
    return NextResponse.json(
      { error: `No lessons found in Supabase for ${courseId}. Textbook export follows the live lessons table only.` },
      { status: 409 }
    );
  }

  const lessonIdMap = new Map(
    orderedLessons.map((lesson) => [
      getLessonContentId(lesson.id, locale),
      lesson.id,
    ])
  );
  const { data: scripts, error: scriptsError } = await supabase
    .from("lesson_scripts")
    .select("lesson_id, chapter_json")
    .in("lesson_id", Array.from(lessonIdMap.keys()));

  if (scriptsError) {
    return NextResponse.json({ error: scriptsError.message }, { status: 500 });
  }

  const scriptMap = new Map(
    ((scripts ?? []) as ScriptRow[]).map((row) => [
      lessonIdMap.get(row.lesson_id) ?? row.lesson_id,
      row.chapter_json,
    ])
  );

  const missing = orderedLessons
    .filter((lesson) => !scriptMap.get(lesson.id))
    .map((lesson) => `${lesson.unit_number}-${lesson.lesson_number} ${lesson.title}`);

  if (missing.length > 0) {
    return NextResponse.json(
      {
        error: "Some chapters are missing cached chapter_json. Generate or re-generate those chapters first.",
        missing,
      },
      { status: 409 }
    );
  }

  const modalPayload = {
    mode: "course_export",
    courseId,
    courseName,
    chapters: orderedLessons.map((lesson) => ({
      lessonId: getLessonContentId(lesson.id, locale),
      lessonTitle: lesson.title,
      unitTitle: lesson.unit_title,
      chapterData: scriptMap.get(lesson.id),
    })),
  };

  const modalRes = await fetch(modalUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(modalPayload),
  });

  if (!modalRes.ok) {
    const text = await modalRes.text().catch(() => `HTTP ${modalRes.status}`);
    return NextResponse.json({ error: `Modal export failed: ${text}` }, { status: 500 });
  }

  return NextResponse.json(await modalRes.json());
}
