import { createAdminClient } from "@/lib/supabase";
import {
  getClipPartNumber,
  getNextClipPartNumber,
  getStoredClipSectionTitle,
  normalizeClipTitle,
} from "@/lib/lessonClipUtils";

export interface LessonClip {
  id: string;
  lesson_id: string;
  section_title: string;
  section_index: number;
  clip_url: string | null;
  created_at: string;
}

const CLIP_BUCKET = "lesson-clips";
const PUBLIC_URL_SEGMENT = `/storage/v1/object/public/${CLIP_BUCKET}/`;

function sortLessonClips<T extends Pick<LessonClip, "section_index" | "section_title" | "created_at">>(rows: T[]) {
  return [...rows].sort((a, b) =>
    a.section_index - b.section_index ||
    getClipPartNumber(a.section_title) - getClipPartNumber(b.section_title) ||
    a.created_at.localeCompare(b.created_at)
  );
}

function getStoragePathFromPublicUrl(clipUrl: string | null) {
  if (!clipUrl) return null;

  try {
    const pathname = new URL(clipUrl).pathname;
    const idx = pathname.indexOf(PUBLIC_URL_SEGMENT);
    if (idx === -1) return null;
    return decodeURIComponent(pathname.slice(idx + PUBLIC_URL_SEGMENT.length));
  } catch {
    return null;
  }
}

async function resequenceClipParts(lessonId: string, sectionIndex: number, sectionTitle: string) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("lesson_clips")
    .select("id, section_title, section_index, created_at")
    .eq("lesson_id", lessonId)
    .eq("section_index", sectionIndex);

  if (error) throw new Error(error.message);

  const normalizedSectionTitle = normalizeClipTitle(sectionTitle);
  const rows = sortLessonClips((data ?? []).filter(
    (row) => normalizeClipTitle(row.section_title) === normalizedSectionTitle
  ));

  for (let index = 0; index < rows.length; index += 1) {
    const row = rows[index];
    const expectedTitle = getStoredClipSectionTitle(sectionTitle, index + 1);
    if (row.section_title === expectedTitle) continue;

    const { error: updateError } = await supabase
      .from("lesson_clips")
      .update({ section_title: expectedTitle })
      .eq("id", row.id);

    if (updateError) throw new Error(updateError.message);
  }
}

export async function getLessonClips(lessonId: string): Promise<LessonClip[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("lesson_clips")
    .select("*")
    .eq("lesson_id", lessonId)
    .order("section_index", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    console.error("[lessonClips] getLessonClips error:", error.message);
    return [];
  }
  return sortLessonClips((data ?? []) as LessonClip[]);
}

export async function createClip(
  lessonId: string,
  sectionTitle: string,
  sectionIndex: number,
  clipUrl: string
): Promise<LessonClip> {
  const supabase = createAdminClient();
  const { data: existingRows, error: existingError } = await supabase
    .from("lesson_clips")
    .select("section_title")
    .eq("lesson_id", lessonId)
    .eq("section_index", sectionIndex);

  if (existingError) throw new Error(existingError.message);

  const nextPart = getNextClipPartNumber(
    (existingRows ?? []).map((row) => row.section_title),
    sectionTitle
  );
  const storedSectionTitle = getStoredClipSectionTitle(sectionTitle, nextPart);

  const { data, error } = await supabase
    .from("lesson_clips")
    .insert({
      lesson_id: lessonId,
      section_title: storedSectionTitle,
      section_index: sectionIndex,
      clip_url: clipUrl,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as LessonClip;
}

export async function deleteClip(clipId: string): Promise<LessonClip[]> {
  const supabase = createAdminClient();
  const { data: clip, error: clipError } = await supabase
    .from("lesson_clips")
    .select("id, lesson_id, section_title, section_index, clip_url, created_at")
    .eq("id", clipId)
    .single();

  if (clipError || !clip) {
    throw new Error(clipError?.message ?? "Clip not found");
  }

  const { error: deleteError } = await supabase
    .from("lesson_clips")
    .delete()
    .eq("id", clipId);

  if (deleteError) throw new Error(deleteError.message);

  await resequenceClipParts(clip.lesson_id, clip.section_index, clip.section_title);

  const storagePath = getStoragePathFromPublicUrl(clip.clip_url);
  if (storagePath) {
    const { error: storageError } = await supabase.storage
      .from(CLIP_BUCKET)
      .remove([storagePath]);

    if (storageError) {
      console.warn("[lessonClips] storage remove warning:", storageError.message);
    }
  }

  return getLessonClips(clip.lesson_id);
}
