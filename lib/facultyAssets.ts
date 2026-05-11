/**
 * Public helper to read faculty assets (illustration + intro video) from DB.
 * Use from any server component / route that needs to render a faculty
 * (Classroom landing, course header, hover card, etc.).
 */

import { createAdminClient } from "@/lib/supabase";
import { FACULTY, type FacultyId, type FacultyMeta } from "@/lib/faculty";

export interface FacultyWithAssets extends FacultyMeta {
  imageUrl: string | null;
  introVideoUrl: string | null;
}

interface AssetRow {
  faculty_id: string;
  image_url: string | null;
  intro_video_url: string | null;
}

export async function getAllFacultyWithAssets(): Promise<FacultyWithAssets[]> {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("faculty_assets")
    .select("faculty_id, image_url, intro_video_url");
  const assetMap = new Map<string, AssetRow>(
    ((data ?? []) as AssetRow[]).map((row) => [row.faculty_id, row])
  );
  return FACULTY.map((meta) => {
    const row = assetMap.get(meta.id);
    return {
      ...meta,
      imageUrl: row?.image_url ?? null,
      introVideoUrl: row?.intro_video_url ?? null,
    };
  });
}

export async function getFacultyAssets(facultyId: FacultyId): Promise<{
  imageUrl: string | null;
  introVideoUrl: string | null;
}> {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("faculty_assets")
    .select("image_url, intro_video_url")
    .eq("faculty_id", facultyId)
    .maybeSingle();
  return {
    imageUrl: data?.image_url ?? null,
    introVideoUrl: data?.intro_video_url ?? null,
  };
}
