import { lessons } from "@/lib/data/lessons";
import { courses } from "@/lib/data/courses";
import { getLessonPlayerData, resolveLessonDbId } from "@/lib/lessons";
import { getFallbackLessonMatch } from "@/lib/getCourseLessons";
import { getCourseIdVariants, getLessonIdVariants, resolveCourseId } from "@/lib/courseAliases";
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

// Allow DB lesson IDs (e.g. ap-biology-u1-l1) that aren't in the static dict
export const dynamicParams = true;
export const dynamic = "force-dynamic";
export const revalidate = 0;

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

async function getLessonClipsByCandidates(candidateIds: string[]) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("lesson_clips")
    .select("*")
    .in("lesson_id", candidateIds)
    .order("section_index", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);

  const rows = (data ?? []) as LessonClip[];
  for (const lessonId of candidateIds) {
    const matching = rows.filter((row) => row.lesson_id === lessonId);
    if (matching.some((row) => row.clip_url)) {
      return {
        lessonId,
        clips: sortLessonClips(matching),
      };
    }
  }

  return null;
}

async function getFirstLessonScriptRow(candidateIds: string[]) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("lesson_scripts")
    .select("lesson_id, video_url, script, overlays")
    .in("lesson_id", candidateIds);

  if (error) throw new Error(error.message);

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

  if (error) throw new Error(error.message);

  const rows = (data ?? []) as Awaited<ReturnType<typeof getOverlays>>;
  for (const lessonId of candidateIds) {
    const matching = rows.filter((row) => row.lesson_id === lessonId);
    if (matching.length > 0) return matching;
  }

  return [] as Awaited<ReturnType<typeof getOverlays>>;
}

async function resolveLessonInfo(
  lessonSlug: string,
  subject: string
): Promise<LessonInfo | null> {
  // Try static dict by URL slug
  const staticLesson = lessons[lessonSlug];
  if (staticLesson) {
    if (staticLesson.courseId !== subject) return null;
    return {
      titleEn: staticLesson.titleEn,
      courseId: staticLesson.courseId,
      nextLessonId: staticLesson.nextLessonId,
    };
  }

  // Fall back to DB lookup using the resolved DB id
  const dbLessonId = resolveLessonDbId(lessonSlug);
  try {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("lessons")
      .select("id, course_id, title")
      .eq("id", dbLessonId)
      .maybeSingle();

    if (data && data.course_id === subject) {
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
      title: `${lesson.titleEn} | NovaIQ`,
      description: `${lesson.titleEn} — AP Biology lesson with AI-guided support`,
    };
  }

  const lessonInfo = await resolveLessonInfo(params.lesson, resolvedSubject);
  if (!lessonInfo) return { title: "Lesson | NovaIQ" };
  return {
    title: `${lessonInfo.titleEn} | NovaIQ`,
    description: `${lessonInfo.titleEn} — AP lesson with AI-guided support`,
  };
}

export default async function LessonPage({ params }: Props) {
  const resolvedSubject = resolveCourseId(params.subject);
  const dbLessonId = resolveLessonDbId(params.lesson);
  const lessonInfo = await resolveLessonInfo(params.lesson, resolvedSubject);
  if (!lessonInfo) notFound();

  const course = courses.find((c) => c.id === resolvedSubject);
  if (!course) notFound();
  const courseHref = `/courses/${course.id}`;
  const lessonHref = `${courseHref}/${params.lesson}`;
  const nextLessonHref = lessonInfo.nextLessonId ? `${courseHref}/${lessonInfo.nextLessonId}` : null;
  const courseVariants = getCourseIdVariants(course.id);
  const lessonIdCandidates = getLessonIdVariants(dbLessonId, course.id);

  // Free preview: first lesson in the unit/sequence should be unlocked
  // after sign-in. This must be computed here and passed into the
  // lesson gates.
  let isFreePreviewLesson = false;
  try {
    // For AP/Honors courses we use DB order via course.units.
    if (course.units?.length) {
      const supabase = createAdminClient();
      const { data } = await supabase
        .from("lessons")
        .select("id, unit_number, lesson_number")
        .in("course_id", courseVariants)
        .order("unit_number", { ascending: true })
        .order("lesson_number", { ascending: true });
      const orderedLessonIds = (data ?? [])
        .map((r) => String(r.id))
        .filter(Boolean);

      // Our lessonSlug -> DB lesson id mapping is via resolveLessonDbId
      isFreePreviewLesson = orderedLessonIds.length > 0
        ? lessonIdCandidates.includes(orderedLessonIds[0])
        : false;
    } else {
      // Legacy static lessonIds (non-unit courses): first static entry in
      // the rendered chapter list is the free preview.
      const staticLessons = course.lessonIds
        .map((lid) => resolveLessonDbId(lid))
        .filter(Boolean);
      isFreePreviewLesson = staticLessons.length > 0
        ? lessonIdCandidates.includes(staticLessons[0])
        : false;
    }
  } catch {
    isFreePreviewLesson = false;
  }


  // Check for a clips-based section player first (highest priority)
  try {
    const clipMatch = await getLessonClipsByCandidates(lessonIdCandidates);
    if (clipMatch) {
      const activeLessonId = clipMatch.lessonId;
      let lessonScript = "";
      let overlayRows: Awaited<ReturnType<typeof getOverlays>> = [];
      let sections: ReturnType<typeof parseScript> = [];

      try {
        const scriptRow = await getFirstLessonScriptRow(lessonIdCandidates);
        lessonScript = scriptRow?.script ?? "";
        sections = parseScript(lessonScript);
        const dbOverlayRows = await getOverlaysByCandidates(lessonIdCandidates);
        const scriptOverlayRows = buildScriptOverlayRows(lessonScript, scriptRow?.lesson_id ?? activeLessonId);
        const savedOverlayRows = Array.isArray(scriptRow?.overlays)
          ? buildScriptOverlayRowsFromRaw(scriptRow.overlays as RawScriptOverlay[], scriptRow.lesson_id)
          : [];
        const knownOverlayRows =
          getKnownScriptOverlayRows(scriptRow?.lesson_id ?? activeLessonId).length > 0
            ? getKnownScriptOverlayRows(scriptRow?.lesson_id ?? activeLessonId)
            : getKnownScriptOverlayRows(lessonIdCandidates[0] ?? activeLessonId);
        const derivedOverlayRows = scriptOverlayRows.length > 0
          ? scriptOverlayRows
          : savedOverlayRows.length > 0
            ? savedOverlayRows
            : knownOverlayRows;
        // tap_quick is the ADHD layer — a SUPPLEMENT to whatever the legacy
        // overlay set is, not a replacement. chooseBestOverlayRows picks
        // between DB-saved and script-derived sets for the *legacy* types;
        // we then concat the DB-only tap_quick rows on top so they always
        // render even when scriptRows wins the legacy contest.
        const legacyDbRows = dbOverlayRows.filter((r) => r.type !== "tap_quick");
        const tapQuickRows = dbOverlayRows.filter((r) => r.type === "tap_quick");
        const legacyEffective = chooseBestOverlayRows(legacyDbRows, derivedOverlayRows);
        overlayRows = [...legacyEffective, ...tapQuickRows];
      } catch (err) {
        console.warn("[LessonPage] optional clip metadata load failed", {
          lessonId: activeLessonId,
          error: err instanceof Error ? err.message : String(err),
        });
      }

      const playlist = buildPlaylist(clipMatch.clips, overlayRows, sections);
      return (
        <SectionLessonGate
          playlist={playlist}
          lessonId={activeLessonId}
          title={lessonInfo.titleEn}
          courseId={course.id}
          courseName={course.subjectEn}
          courseHref={courseHref}
          redirectHref={lessonHref}
          nextLessonHref={nextLessonHref}
          lessonScript={lessonScript}
          lessonLang="en"
          nextLessonId={lessonInfo.nextLessonId ?? undefined}
          isFreePreviewLesson={isFreePreviewLesson}
        />
      );
    }
  } catch {
    // Non-fatal: fall through
  }

  // Check for a DB-backed video lesson
  try {
    const scriptRow = await getFirstLessonScriptRow(lessonIdCandidates);

    if (scriptRow?.video_url) {
      const overlayRows = await getOverlaysByCandidates(lessonIdCandidates);
      const scriptOverlayRows = buildScriptOverlayRows(scriptRow?.script ?? "", scriptRow.lesson_id);
      const savedOverlayRows = Array.isArray(scriptRow?.overlays)
        ? buildScriptOverlayRowsFromRaw(scriptRow.overlays as RawScriptOverlay[], scriptRow.lesson_id)
        : [];
      const knownOverlayRows =
        getKnownScriptOverlayRows(scriptRow.lesson_id).length > 0
          ? getKnownScriptOverlayRows(scriptRow.lesson_id)
          : getKnownScriptOverlayRows(lessonIdCandidates[0] ?? scriptRow.lesson_id);
      const derivedOverlayRows = scriptOverlayRows.length > 0
        ? scriptOverlayRows
        : savedOverlayRows.length > 0
          ? savedOverlayRows
          : knownOverlayRows;
      // Preserve tap_quick (ADHD layer) on top of whichever legacy set wins.
      const legacyDbRows = overlayRows.filter((r) => r.type !== "tap_quick");
      const tapQuickRows = overlayRows.filter((r) => r.type === "tap_quick");
      const legacyEffective = chooseBestOverlayRows(legacyDbRows, derivedOverlayRows);
      const effectiveOverlays = [...legacyEffective, ...tapQuickRows];

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
          lessonLang="en"
          initialOverlays={effectiveOverlays}
          isFreePreviewLesson={isFreePreviewLesson}
        />
      );
    }

    // Has a script but no video yet — show coming soon with script preview option
    if (scriptRow?.script) {
      return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.12),_transparent_45%),linear-gradient(180deg,#f8fafc_0%,#eff6ff_100%)]">
          <ComingSoonState
            badge={lessonComingSoonCopy.badge}
            title={lessonInfo.titleEn}
            description="This lesson's video is being recorded. Check back soon!"
            backHref={`/courses/${course.id}`}
            backLabel={`Back to ${course.subjectEn}`}
          />
        </div>
      );
    }
  } catch {
    // Non-fatal: fall through to static player
  }

  // Static player data (legacy)
  const playerData = getLessonPlayerData(params.lesson);
  if (playerData) {
      return (
        <LessonPlayerGate
          playerData={playerData}
          courseId={course.id}
          courseName={course.subjectEn}
          courseHref={courseHref}
          redirectHref={lessonHref}
          nextLessonHref={nextLessonHref}
          nextLessonId={lessonInfo.nextLessonId ?? undefined}
          lessonScript=""
          lessonLang="en"
          isFreePreviewLesson={isFreePreviewLesson}
        />
      );
  }

  // No content yet → Coming Soon
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.12),_transparent_45%),linear-gradient(180deg,#f8fafc_0%,#eff6ff_100%)]">
      <ComingSoonState
        badge={lessonComingSoonCopy.badge}
        title={lessonComingSoonCopy.title}
        description={lessonComingSoonCopy.description}
        backHref={`/courses/${course.id}`}
        backLabel={`Back to ${course.subjectEn}`}
      />
    </div>
  );
}
