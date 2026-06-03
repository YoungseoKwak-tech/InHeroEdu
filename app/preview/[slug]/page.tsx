/**
 * /preview/[slug]
 *
 * Public, unauthenticated lesson surface. Reachable from TikTok / IG bio
 * links and indexed by search engines (no auth gate, no redirect chain).
 * Reuses the standard clip + overlay + script pipeline so the preview
 * stays in lockstep with the gated /courses experience — there is no
 * separate "marketing build" of a lesson.
 *
 * Gate:
 *   1. resolve slug → DB lesson id
 *   2. lookup lesson; abort 404 if missing or public_preview != true
 *   3. fetch lesson_clips + script + overlays exactly as the gated page
 *   4. hand the built playlist to PreviewClient (client-side player + soft
 *      wall + anon cookie minting)
 *
 * Adding lessons to the preview funnel is a one-line DB flag flip:
 *   update public.lessons set public_preview = true where id = '...';
 */

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { resolveLessonDbId } from "@/lib/lessons";
import { createAdminClient } from "@/lib/supabase";
import { getOverlays } from "@/lib/overlays";
import { buildPlaylist } from "@/lib/buildPlaylist";
import { parseScript } from "@/lib/parseScript";
import {
  buildScriptOverlayRows,
  buildScriptOverlayRowsFromRaw,
  chooseBestOverlayRows,
  type RawScriptOverlay,
} from "@/lib/scriptOverlays";
import { getKnownScriptOverlayRows } from "@/lib/knownScriptOverlays";
import type { LessonClip } from "@/lib/lessonClips";
import PreviewClient from "@/components/preview/PreviewClient";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const dynamicParams = true;

interface PreviewLessonRow {
  id: string;
  title: string;
  course_id: string;
  public_preview: boolean;
}

async function loadPreviewLesson(slug: string): Promise<PreviewLessonRow | null> {
  const dbId = resolveLessonDbId(slug);
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("lessons")
    .select("id, title, course_id, public_preview")
    .eq("id", dbId)
    .maybeSingle();
  if (error) {
    console.error("[preview] lesson lookup failed", error.message);
    return null;
  }
  if (!data || data.public_preview !== true) return null;
  return data as PreviewLessonRow;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const lesson = await loadPreviewLesson(slug);
  if (!lesson) return { title: "Preview | InHero" };
  return {
    title: `${lesson.title} — Free preview | InHero`,
    description: `Try ${lesson.title} free, no signup required.`,
  };
}

export default async function PreviewPage({ params }: Props) {
  const { slug } = await params;
  const lesson = await loadPreviewLesson(slug);
  if (!lesson) notFound();

  const supabase = createAdminClient();

  const [clipRes, scriptRes, overlayRes] = await Promise.all([
    supabase
      .from("lesson_clips")
      .select("*")
      .eq("lesson_id", lesson.id)
      .order("section_index", { ascending: true })
      .order("created_at", { ascending: true }),
    supabase
      .from("lesson_scripts")
      .select("lesson_id, video_url, script, overlays")
      .eq("lesson_id", lesson.id)
      .maybeSingle(),
    supabase
      .from("overlays")
      .select("*")
      .eq("lesson_id", lesson.id)
      .order("position", { ascending: true }),
  ]);

  if (clipRes.error || overlayRes.error) {
    console.error("[preview] data fetch failed",
      clipRes.error?.message ?? "",
      overlayRes.error?.message ?? "");
    notFound();
  }

  const clips = (clipRes.data ?? []) as LessonClip[];
  const lessonScript = scriptRes.data?.script ?? "";
  const sections = parseScript(lessonScript);

  const dbOverlayRows = (overlayRes.data ?? []) as Awaited<ReturnType<typeof getOverlays>>;
  const scriptOverlayRows = buildScriptOverlayRows(lessonScript, lesson.id);
  const savedOverlayRows = Array.isArray(scriptRes.data?.overlays)
    ? buildScriptOverlayRowsFromRaw(scriptRes.data!.overlays as RawScriptOverlay[], lesson.id)
    : [];
  const knownOverlayRows = getKnownScriptOverlayRows(lesson.id);
  const derivedOverlayRows = scriptOverlayRows.length > 0
    ? scriptOverlayRows
    : savedOverlayRows.length > 0
      ? savedOverlayRows
      : knownOverlayRows;

  // Mirror the courses page's tap_quick concat rule so preview matches prod UX.
  const legacyDbRows = dbOverlayRows.filter((r) => r.type !== "tap_quick");
  const tapQuickRows = dbOverlayRows.filter((r) => r.type === "tap_quick");
  const legacyEffective = chooseBestOverlayRows(legacyDbRows, derivedOverlayRows);
  const effectiveOverlays = [...legacyEffective, ...tapQuickRows];

  if (clips.length === 0) {
    // No clips → nothing to preview. Defensive 404 rather than rendering an
    // empty player to a cold TikTok visitor (the worst possible first
    // impression).
    notFound();
  }

  const playlist = buildPlaylist(clips, effectiveOverlays, sections);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="mb-4 text-xs uppercase tracking-wider text-emerald-400 font-semibold">
          Free preview · no signup
        </div>
        <h1 className="text-2xl md:text-3xl font-bold mb-5">
          {lesson.title}
        </h1>
        <PreviewClient
          lessonId={lesson.id}
          lessonTitle={lesson.title}
          playlist={playlist}
          continueHref={`/preview/${slug}`}
        />
      </div>
    </div>
  );
}
