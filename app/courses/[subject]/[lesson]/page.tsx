import { lessons } from "@/lib/data/lessons";
import { courses } from "@/lib/data/courses";
import { getLessonPlayerData, resolveLessonDbId } from "@/lib/lessons";
import { createAdminClient } from "@/lib/supabase";
import { getLessonClips } from "@/lib/lessonClips";
import { getOverlays } from "@/lib/overlays";
import { buildPlaylist } from "@/lib/buildPlaylist";
import { parseScript } from "@/lib/parseScript";
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

interface LessonInfo {
  titleEn: string;
  courseId: string;
  nextLessonId: string | null | undefined;
}

async function resolveLessonInfo(
  lessonSlug: string,
  subject: string
): Promise<LessonInfo | null> {
  // Try static dict first
  const staticLesson = lessons[lessonSlug];
  if (staticLesson) {
    if (staticLesson.courseId !== subject) return null;
    return {
      titleEn: staticLesson.titleEn,
      courseId: staticLesson.courseId,
      nextLessonId: staticLesson.nextLessonId,
    };
  }

  // Fall back to DB lookup
  try {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("lessons")
      .select("id, course_id, title")
      .eq("id", lessonSlug)
      .maybeSingle();

    if (!data || data.course_id !== subject) return null;

    return {
      titleEn: data.title as string,
      courseId: data.course_id as string,
      nextLessonId: null,
    };
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lesson = lessons[params.lesson];
  if (!lesson) return { title: "Lesson | NovaIQ" };
  return {
    title: `${lesson.titleEn} | NovaIQ`,
    description: `${lesson.titleEn} — AP Biology lesson with AI-guided support`,
  };
}

export async function generateStaticParams() {
  return Object.values(lessons).map((l) => ({
    subject: l.courseId,
    lesson: l.id,
  }));
}

export default async function LessonPage({ params }: Props) {
  const dbLessonId = resolveLessonDbId(params.lesson);
  const lessonInfo = await resolveLessonInfo(dbLessonId, params.subject);
  if (!lessonInfo) notFound();

  const course = courses.find((c) => c.id === params.subject);
  if (!course) notFound();

  // Check for a clips-based section player first (highest priority)
  try {
    const clips = await getLessonClips(dbLessonId);
    if (clips.some((c) => c.clip_url)) {
      const supabase = createAdminClient();
      const { data: scriptRow } = await supabase
        .from("lesson_scripts")
        .select("script")
        .eq("lesson_id", dbLessonId)
        .maybeSingle();
      const overlayRows = await getOverlays(dbLessonId);
      const sections = parseScript(scriptRow?.script ?? "");
      const playlist = buildPlaylist(clips, overlayRows, sections);
      return (
        <SectionLessonGate
          playlist={playlist}
          lessonId={dbLessonId}
          title={lessonInfo.titleEn}
          courseId={course.id}
          courseName={course.subjectEn}
          nextLessonId={lessonInfo.nextLessonId ?? undefined}
        />
      );
    }
  } catch {
    // Non-fatal: fall through
  }

  // Check for a DB-backed video lesson
  try {
    const supabase = createAdminClient();
    const { data: scriptRow } = await supabase
      .from("lesson_scripts")
      .select("video_url, script")
      .eq("lesson_id", dbLessonId)
      .maybeSingle();

    if (scriptRow?.video_url) {
      return (
        <VideoLessonGate
          lessonId={dbLessonId}
          videoUrl={scriptRow.video_url}
          script={scriptRow.script ?? ""}
          title={lessonInfo.titleEn}
          courseId={course.id}
          courseName={course.subjectEn}
          nextLessonId={lessonInfo.nextLessonId ?? undefined}
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
        nextLessonId={lessonInfo.nextLessonId ?? undefined}
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
