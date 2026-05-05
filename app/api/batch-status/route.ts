/**
 * GET /api/batch-status?courseId=ap-biology
 * Returns all lessons for a course with script + textbook status in one query.
 */
import { NextRequest, NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import breakdown from "@/lib/data/ap-lesson-breakdown.json";

const TEXTBOOKS_BUCKET = "textbooks";

interface LessonRow {
  id: string;
  course_id: string;
  unit_number: number;
  unit_title: string;
  lesson_number: number;
  title: string;
}

function extractStoragePathFromPublicUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    const marker = `/storage/v1/object/public/${TEXTBOOKS_BUCKET}/`;
    const idx = parsed.pathname.indexOf(marker);
    if (idx === -1) return null;
    return decodeURIComponent(parsed.pathname.slice(idx + marker.length));
  } catch {
    return null;
  }
}

function appendCacheBuster(url: string): string {
  try {
    const parsed = new URL(url);
    parsed.searchParams.set("v", Date.now().toString());
    return parsed.toString();
  } catch {
    return url;
  }
}

function buildFallbackLessons(courseId: string): LessonRow[] {
  const course = breakdown.courses.find((c) => c.courseId === courseId);
  if (!course) return [];
  return course.units.flatMap((unit) =>
    unit.lessons.map((lesson) => ({
      id: `${course.courseId}-u${unit.unitNumber}-l${lesson.lessonNumber}`,
      course_id: course.courseId,
      unit_number: unit.unitNumber,
      unit_title: unit.unitTitle,
      lesson_number: lesson.lessonNumber,
      title: lesson.lessonTitle,
    }))
  );
}

export async function GET(req: NextRequest) {
  const admin = await requireAdminUser(req);
  if (admin instanceof NextResponse) return admin;

  const courseId = req.nextUrl.searchParams.get("courseId");
  if (!courseId) {
    return NextResponse.json({ error: "courseId required" }, { status: 400 });
  }

  const supabase = createAdminClient();

  const { data: lessons, error } = await supabase
    .from("lessons")
    .select("id, course_id, unit_number, unit_title, lesson_number, title")
    .eq("course_id", courseId)
    .order("unit_number", { ascending: true })
    .order("lesson_number", { ascending: true });

  const resolvedLessons: LessonRow[] =
    (!lessons || lessons.length === 0 || error)
      ? buildFallbackLessons(courseId)
      : lessons;

  if (resolvedLessons.length === 0) {
    return NextResponse.json({ data: [] });
  }

  const lessonIds = resolvedLessons.map((l) => l.id);

  const [{ data: scripts }, { data: textbooks }] = await Promise.all([
    supabase
      .from("lesson_scripts")
      .select("lesson_id, script_generated_at")
      .in("lesson_id", lessonIds),
    supabase
      .from("lesson_textbooks")
      .select("lesson_id, status, pdf_url, docx_url, error")
      .in("lesson_id", lessonIds),
  ]);

  const scriptMap = new Map((scripts ?? []).map((s) => [s.lesson_id, !!s.script_generated_at]));

  const textbookEntries = await Promise.all(
    (textbooks ?? []).map(async (t) => {
      let pdfUrl: string | null = t.pdf_url ?? null;
      let docxUrl: string | null = t.docx_url ?? null;

      const maybeSign = async (value: string | null): Promise<string | null> => {
        if (!value) return null;

        const storagePath = value.startsWith("http")
          ? extractStoragePathFromPublicUrl(value)
          : value;

        if (storagePath) {
          const { data: signed, error: signErr } = await supabase.storage
            .from(TEXTBOOKS_BUCKET)
            .createSignedUrl(storagePath, 3600);

          if (!signErr) return signed.signedUrl;
        }

        return value.startsWith("http") ? appendCacheBuster(value) : value;
      };

      if (t.status === "ready") {
        pdfUrl = await maybeSign(pdfUrl);
        docxUrl = await maybeSign(docxUrl);
      }

      return [
        t.lesson_id,
        { status: t.status, pdfUrl, docxUrl, error: t.error },
      ] as const;
    })
  );

  const textbookMap = new Map(textbookEntries);

  const data = resolvedLessons.map((l) => ({
    id: l.id,
    courseId: l.course_id,
    unitNumber: l.unit_number,
    unitTitle: l.unit_title,
    lessonNumber: l.lesson_number,
    title: l.title,
    hasScript: scriptMap.get(l.id) ?? false,
    textbook: textbookMap.get(l.id) ?? { status: "idle", pdfUrl: null, docxUrl: null, error: null },
  }));

  return NextResponse.json({ data });
}
