import { lessons } from "@/lib/data/lessons";
import { courses } from "@/lib/data/courses";
import { getLessonPlayerData, resolveLessonDbId } from "@/lib/lessons";
import { getFallbackLessonMatch } from "@/lib/getCourseLessons";
import { createAdminClient } from "@/lib/supabase";
import type { LessonClip } from "@/lib/lessonClips";
import { getOverlays } from "@/lib/overlays";
import { buildPlaylist } from "@/lib/buildPlaylist";
import { parseScript } from "@/lib/parseScript";
import { getKnownScriptOverlayRows } from "@/lib/knownScriptOverlays";
import {
  buildScriptOverlayRows,
  buildScriptOverlayRowsFromRaw,
  chooseBestOverlayRows,
  type RawScriptOverlay,
} from "@/lib/scriptOverlays";
import {
  getCourseHref,
  getLessonContentId,
  getLessonHref,
} from "@/lib/contentVariants";
import { getCourseIdVariants, getLessonIdVariants, resolveCourseId } from "@/lib/courseAliases";
import ComingSoonState from "@/components/courses/ComingSoonState";
import LessonPlayerGate from "@/components/lesson/LessonPlayerGate";
import VideoLessonGate from "@/components/lesson/VideoLessonGate";
import SectionLessonGate from "@/components/lesson/SectionLessonGate";
import { lessonComingSoonCopy } from "@/lib/course-access";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Props {
  params: { subject: string; lesson: string };
}

export const dynamic = "force-dynamic";
export const dynamicParams = true;

interface LessonInfo {
  titleEn: string;
  courseId: string;
  nextLessonId: string | null | undefined;
}

function sortLessonClips(rows: LessonClip[]) {
  return [...rows].sort((a, b) =>
    a.section_index - b.section_index ||
    a.section_title.localeCompare(b.section_title) ||
    a.created_at.localeCompare(b.created_at)
  );
}

function uniqueStrings(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)));
}

function getKoreanLessonCandidates(baseLessonId: string, courseId: string) {
  const variants = getLessonIdVariants(baseLessonId, courseId);
  return uniqueStrings([
    getLessonContentId(baseLessonId, "ko"),
    ...variants.map((variant) => getLessonContentId(variant, "ko")),
    baseLessonId,
    ...variants,
  ]);
}

async function getLocalizedLessonClips(candidateIds: string[]): Promise<LessonClip[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("lesson_clips")
    .select("*")
    .in("lesson_id", candidateIds)
    .order("section_index", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  const rows = (data ?? []) as LessonClip[];
  for (const lessonId of candidateIds) {
    const matching = rows.filter((row) => row.lesson_id === lessonId);
    if (matching.some((row) => row.clip_url)) {
      return sortLessonClips(matching);
    }
  }

  return [];
}

async function getFirstLessonScriptRow(candidateIds: string[]) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("lesson_scripts")
    .select("lesson_id, video_url, script, overlays")
    .in("lesson_id", candidateIds);

  if (error) {
    throw new Error(error.message);
  }

  const rows = (data ?? []) as Array<{
    lesson_id: string;
    video_url: string | null;
    script: string | null;
    overlays: RawScriptOverlay[] | null;
  }>;

  for (const lessonId of candidateIds) {
    const row = rows.find((candidate) => candidate.lesson_id === lessonId && candidate.video_url);
    if (row) return row;
  }

  for (const lessonId of candidateIds) {
    const row = rows.find((candidate) => candidate.lesson_id === lessonId);
    if (row?.script) {
      return row;
    }
  }

  return null;
}

async function getOverlaysByCandidates(candidateIds: string[]) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("overlays")
    .select("*")
    .in("lesson_id", candidateIds)
    .order("position", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  const rows = (data ?? []) as Awaited<ReturnType<typeof getOverlays>>;
  for (const lessonId of candidateIds) {
    const matching = rows.filter((row) => row.lesson_id === lessonId);
    if (matching.length > 0) {
      return matching;
    }
  }

  return [] as Awaited<ReturnType<typeof getOverlays>>;
}

async function resolveLessonInfo(
  lessonSlug: string,
  subject: string
): Promise<LessonInfo | null> {
  const staticLesson = lessons[lessonSlug];
  if (staticLesson) {
    if (staticLesson.courseId !== subject) return null;
    return {
      titleEn: staticLesson.titleEn,
      courseId: staticLesson.courseId,
      nextLessonId: staticLesson.nextLessonId,
    };
  }

  const dbLessonId = resolveLessonDbId(lessonSlug);
  try {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("lessons")
      .select("id, course_id, title")
      .eq("id", dbLessonId)
      .maybeSingle();

    if (data) {
      if (data.course_id !== subject) return null;
      return {
        titleEn: data.title as string,
        courseId: data.course_id as string,
        nextLessonId: null,
      };
    }
  } catch {
    // Fall through to fallback JSON.
  }

  const fallbackMatch = getFallbackLessonMatch(dbLessonId, subject);
  if (!fallbackMatch) return null;

  return {
    titleEn: fallbackMatch.lesson.title,
    courseId: fallbackMatch.courseId,
    nextLessonId: fallbackMatch.nextLessonId,
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedSubject = resolveCourseId(params.subject);
  const lesson = lessons[params.lesson];
  if (lesson) {
    return {
      title: `${lesson.titleEn} | InHero Korean Lectures`,
      description: `${lesson.titleEn} — Korean lecture track with the same InHero lesson structure`,
    };
  }

  const lessonInfo = await resolveLessonInfo(params.lesson, resolvedSubject);
  if (!lessonInfo) return { title: "Lesson | InHero" };
  const course = courses.find((item) => item.id === lessonInfo.courseId);

  return {
    title: `${lessonInfo.titleEn} | InHero Korean Lectures`,
    description: `${lessonInfo.titleEn} — ${course?.subjectEn ?? lessonInfo.courseId} Korean lecture track`,
  };
}

export default async function KoreanLessonPage({ params }: Props) {
  const baseLessonId = resolveLessonDbId(params.lesson);
  const resolvedSubject = resolveCourseId(params.subject);
  const lessonInfo = await resolveLessonInfo(params.lesson, resolvedSubject);
  if (!lessonInfo) notFound();

  const course = courses.find((c) => c.id === resolvedSubject);
  if (!course) notFound();

  const courseHref = getCourseHref("ko", course.id);
  const lessonHref = getLessonHref("ko", course.id, baseLessonId);
  const nextLessonHref = lessonInfo.nextLessonId
    ? getLessonHref("ko", course.id, lessonInfo.nextLessonId)
    : null;
  const courseVariants = getCourseIdVariants(course.id);
  const lessonCandidates = getKoreanLessonCandidates(baseLessonId, course.id);

  let isFreePreviewLesson = false;
  try {
    if (course.units?.length) {
      const supabase = createAdminClient();
      const { data } = await supabase
        .from("lessons")
        .select("id, unit_number, lesson_number")
        .in("course_id", courseVariants);
      const orderedLessonIds = (data ?? [])
        .sort(
          (a, b) =>
            Number(a.unit_number ?? 0) - Number(b.unit_number ?? 0) ||
            Number(a.lesson_number ?? 0) - Number(b.lesson_number ?? 0)
        )
        .map((r) => String(r.id))
        .filter(Boolean);
      isFreePreviewLesson = orderedLessonIds.length > 0
        ? lessonCandidates.includes(orderedLessonIds[0])
        : false;
    } else {
      const staticLessons = course.lessonIds
        .map((lid) => resolveLessonDbId(lid))
        .filter(Boolean);
      isFreePreviewLesson = staticLessons.length > 0
        ? lessonCandidates.includes(staticLessons[0])
        : false;
    }
  } catch {
    isFreePreviewLesson = false;
  }

  try {
    const clips = await getLocalizedLessonClips(lessonCandidates);
    if (clips.some((clip) => clip.clip_url)) {
      let lessonScript = "";
      let effectiveOverlays = [] as Awaited<ReturnType<typeof getOverlays>>;
      let sections = [] as ReturnType<typeof parseScript>;

      try {
        const scriptRow = await getFirstLessonScriptRow(lessonCandidates);
        lessonScript = scriptRow?.script ?? "";
        const overlayRows = await getOverlaysByCandidates(lessonCandidates);
        sections = parseScript(lessonScript);
        const effectiveLessonId = scriptRow?.lesson_id ?? clips[0]?.lesson_id ?? lessonCandidates[0] ?? baseLessonId;
        const scriptOverlayRows = buildScriptOverlayRows(lessonScript, effectiveLessonId);
        const savedOverlayRows = Array.isArray(scriptRow?.overlays)
          ? buildScriptOverlayRowsFromRaw(scriptRow.overlays as RawScriptOverlay[], effectiveLessonId)
          : [];
        const knownOverlayRows =
          getKnownScriptOverlayRows(effectiveLessonId).length > 0
            ? getKnownScriptOverlayRows(effectiveLessonId)
            : getKnownScriptOverlayRows(baseLessonId);
        const derivedOverlayRows = scriptOverlayRows.length > 0
          ? scriptOverlayRows
          : savedOverlayRows.length > 0
            ? savedOverlayRows
            : knownOverlayRows;
        effectiveOverlays = chooseBestOverlayRows(overlayRows, derivedOverlayRows);
      } catch (error) {
        console.error("[kr lesson] clip player metadata fallback", baseLessonId, error);
      }

      const playlist = buildPlaylist(clips, effectiveOverlays, sections);
      return (
        <SectionLessonGate
          playlist={playlist}
          lessonId={clips[0]?.lesson_id ?? lessonCandidates[0] ?? baseLessonId}
          title={lessonInfo.titleEn}
          courseId={course.id}
          courseName={course.subjectEn}
          courseHref={courseHref}
          redirectHref={lessonHref}
          nextLessonHref={nextLessonHref}
          nextLessonId={lessonInfo.nextLessonId ?? undefined}
          lessonScript={lessonScript}
          lessonLang="ko"
          isFreePreviewLesson={isFreePreviewLesson}
        />
      );
    }
  } catch (error) {
    console.error("[kr lesson] clips branch failed", baseLessonId, error);
    // Non-fatal: fall through.
  }

  try {
    const scriptRow = await getFirstLessonScriptRow(lessonCandidates);

    if (scriptRow?.video_url) {
      const overlayRows = await getOverlaysByCandidates(lessonCandidates);
      const scriptOverlayRows = buildScriptOverlayRows(scriptRow?.script ?? "", scriptRow.lesson_id);
      const savedOverlayRows = Array.isArray((scriptRow as { overlays?: unknown[] | null })?.overlays)
        ? buildScriptOverlayRowsFromRaw(((scriptRow as { overlays?: RawScriptOverlay[] | null }).overlays ?? []) as RawScriptOverlay[], scriptRow.lesson_id)
        : [];
      const knownOverlayRows =
        getKnownScriptOverlayRows(scriptRow.lesson_id).length > 0
          ? getKnownScriptOverlayRows(scriptRow.lesson_id)
          : getKnownScriptOverlayRows(baseLessonId);
      const derivedOverlayRows = scriptOverlayRows.length > 0
        ? scriptOverlayRows
        : savedOverlayRows.length > 0
          ? savedOverlayRows
          : knownOverlayRows;
      const effectiveOverlays = chooseBestOverlayRows(overlayRows, derivedOverlayRows);
      return (
        <VideoLessonGate
          lessonId={scriptRow.lesson_id}
          videoUrl={scriptRow.video_url}
          script={scriptRow.script ?? ""}
          title={lessonInfo.titleEn}
          courseId={course.id}
          courseName={course.subjectEn}
          courseHref={courseHref}
          redirectHref={lessonHref}
          nextLessonHref={nextLessonHref}
          nextLessonId={lessonInfo.nextLessonId ?? undefined}
          lessonScript={scriptRow.script ?? ""}
          lessonLang="ko"
          isFreePreviewLesson={isFreePreviewLesson}
          initialOverlays={effectiveOverlays}
        />
      );
    }

    if (scriptRow?.script) {
      return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.12),_transparent_45%),linear-gradient(180deg,#f8fafc_0%,#ecfdf5_100%)]">
          <ComingSoonState
            badge="Korean lecture coming soon"
            title={lessonInfo.titleEn}
            description="The Korean lecture version is mapped and scripted, but the recording has not been attached yet."
            backHref={courseHref}
            backLabel={`Back to ${course.subjectEn}`}
          />
        </div>
      );
    }
  } catch {
    // Non-fatal: fall through.
  }

  const playerData = getLessonPlayerData(params.lesson);
  if (playerData) {
    return (
      <LessonPlayerGate
        playerData={playerData}
        courseId={course.id}
        courseName={course.subjectEn}
        courseHref={courseHref}
        lessonId={baseLessonId}
        redirectHref={lessonHref}
        nextLessonHref={nextLessonHref}
        nextLessonId={lessonInfo.nextLessonId ?? undefined}
        lessonScript=""
        lessonLang="ko"
        isFreePreviewLesson={isFreePreviewLesson}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.12),_transparent_45%),linear-gradient(180deg,#f8fafc_0%,#ecfdf5_100%)]">
      <ComingSoonState
        badge={lessonComingSoonCopy.badge}
        title={lessonInfo.titleEn}
        description="This Korean lecture slot exists, but no published video or section clips have been attached yet."
        backHref={courseHref}
        backLabel={`Back to ${course.subjectEn}`}
      />
    </div>
  );
}
