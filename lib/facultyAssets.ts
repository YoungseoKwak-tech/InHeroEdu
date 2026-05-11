/**
 * Public helper to read faculty illustration URLs from the DB.
 *
 * Use this from any server component / route that needs to display a
 * faculty mascot (Classroom landing page, course card, etc.).
 */

import { createAdminClient } from "@/lib/supabase";
import { FACULTY, type FacultyId, type FacultyMeta } from "@/lib/faculty";

export interface FacultyWithAsset extends FacultyMeta {
  imageUrl: string | null;
}

interface AssetRow {
  faculty_id: string;
  image_url: string | null;
}

export async function getAllFacultyWithAssets(): Promise<FacultyWithAsset[]> {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("faculty_assets")
    .select("faculty_id, image_url");
  const assetMap = new Map<string, string | null>(
    ((data ?? []) as AssetRow[]).map((row) => [row.faculty_id, row.image_url])
  );
  return FACULTY.map((meta) => ({
    ...meta,
    imageUrl: assetMap.get(meta.id) ?? null,
  }));
}

export async function getFacultyAssetUrl(facultyId: FacultyId): Promise<string | null> {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("faculty_assets")
    .select("image_url")
    .eq("faculty_id", facultyId)
    .maybeSingle();
  return data?.image_url ?? null;
}
