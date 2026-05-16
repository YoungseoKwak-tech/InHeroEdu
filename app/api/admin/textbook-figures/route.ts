import { NextRequest, NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import {
  DEFAULT_CONTENT_LOCALE,
  getLessonContentId,
  isContentLocale,
} from "@/lib/contentVariants";

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80) || "item";
}

function significantWords(value: string) {
  return value
    .toLowerCase()
    .split(/[\s,;:/()\-]+/)
    .filter((token) => token && !["the", "and", "for", "with", "from", "into", "that", "this"].includes(token));
}

function deriveFigureRequest(section: Record<string, unknown>, chapter: Record<string, unknown>, courseKey: string) {
  const chapterTitle = String(chapter.chapter_title ?? chapter.title ?? "chapter");
  const sectionTitle = String(section.title ?? "section");
  const subjectSlug = slugify(String(chapter.subject ?? courseKey ?? "general"));
  const chapterSlug = slugify(chapterTitle);
  const sectionSlug = slugify(sectionTitle);
  const folder = `images/${subjectSlug}/pending`;
  const suggestedFilename = `${chapterSlug}__${sectionSlug}.png`;

  const searchTerms: string[] = [];
  for (const word of [...significantWords(sectionTitle), ...significantWords(String(section.body ?? ""))]) {
    if (!searchTerms.includes(word)) searchTerms.push(word);
    if (searchTerms.length === 6) break;
  }

  return {
    bucket: "textbooks",
    title: sectionTitle || "Supporting figure",
    folder,
    storage_path: `${folder}/${suggestedFilename}`,
    suggested_filename: suggestedFilename,
    search_terms: searchTerms,
    caption: String(section.image_caption ?? `Figure: ${sectionTitle || "Supporting diagram"}`),
  };
}

function serializeFigure(section: Record<string, unknown>, index: number, chapter: Record<string, unknown>, courseKey: string) {
  const imageUrl = typeof section.image_url === "string" ? section.image_url : null;
  const imageCaption = typeof section.image_caption === "string" ? section.image_caption : null;
  const figureRequest =
    section.figure_request && typeof section.figure_request === "object"
      ? section.figure_request
      : deriveFigureRequest(section, chapter, courseKey);

  return {
    index,
    sectionTitle: String(section.title ?? ""),
    imageUrl,
    imageCaption,
    figureRequest,
    status: imageUrl ? "ready" : "needs_upload",
  };
}

export async function GET(req: NextRequest) {
  const admin = await requireAdminUser(req);
  if (admin instanceof NextResponse) return admin;

  const lessonId = req.nextUrl.searchParams.get("lessonId");
  const courseId = req.nextUrl.searchParams.get("courseId");
  const rawLocale = req.nextUrl.searchParams.get("locale");
  if (!lessonId && !courseId) {
    return NextResponse.json({ error: "lessonId or courseId required" }, { status: 400 });
  }
  const locale = isContentLocale(rawLocale) ? rawLocale : DEFAULT_CONTENT_LOCALE;

  const supabase = createAdminClient();
  if (lessonId) {
    const resolvedLessonId = lessonId.endsWith("__ko")
      ? lessonId
      : getLessonContentId(lessonId, locale);
    const { data, error } = await supabase
      .from("lesson_scripts")
      .select("chapter_json")
      .eq("lesson_id", resolvedLessonId)
      .single();

    if (error || !data?.chapter_json) {
      return NextResponse.json({ error: "chapter_json not found" }, { status: 404 });
    }

    const chapter = data.chapter_json as Record<string, unknown> & { sections?: Array<Record<string, unknown>> };
    const figures = (chapter.sections ?? [])
      .map((section, index) => serializeFigure(section, index, chapter, resolvedLessonId))
      .filter((figure) => figure.imageUrl || figure.figureRequest);

    return NextResponse.json({ figures });
  }

  const { data: lessons, error: lessonsError } = await supabase
    .from("lessons")
    .select("id, title, unit_title, unit_number, lesson_number")
    .eq("course_id", courseId)
    .order("unit_number", { ascending: true })
    .order("lesson_number", { ascending: true });

  if (lessonsError) {
    return NextResponse.json({ error: lessonsError.message }, { status: 500 });
  }

  const lessonRows = lessons ?? [];
  if (lessonRows.length === 0) {
    return NextResponse.json({ error: "No lessons found for courseId" }, { status: 404 });
  }

  const lessonIdMap = new Map(
    lessonRows.map((lesson) => [
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
    (scripts ?? []).map((row) => [
      lessonIdMap.get(row.lesson_id) ?? row.lesson_id,
      row.chapter_json as (Record<string, unknown> & { sections?: Array<Record<string, unknown>> }) | null,
    ])
  );

  const courseFigures = lessonRows.map((lesson) => {
    const chapter = scriptMap.get(lesson.id);
    return {
      lessonId: lesson.id,
      title: lesson.title,
      unitTitle: lesson.unit_title,
      unitNumber: lesson.unit_number,
      lessonNumber: lesson.lesson_number,
      figures: (chapter?.sections ?? [])
        .map((section, index) => serializeFigure(section, index, chapter ?? {}, courseId ?? lesson.id))
        .filter((figure) => figure.imageUrl || figure.figureRequest),
    };
  });

  const pendingCount = courseFigures.reduce(
    (total, lesson) => total + lesson.figures.filter((figure) => figure.status === "needs_upload").length,
    0
  );
  const readyCount = courseFigures.reduce(
    (total, lesson) => total + lesson.figures.filter((figure) => figure.status === "ready").length,
    0
  );

  return NextResponse.json({ courseId, pendingCount, readyCount, lessons: courseFigures });
}
