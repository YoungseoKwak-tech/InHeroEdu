/**
 * Overlay CRUD
 * Operates on the `overlays` table via the admin (service role) client.
 */

import { createAdminClient } from "@/lib/supabase";
import type { ScriptSection } from "@/lib/parseScript";
import { timestampToSeconds } from "@/lib/parseScript";

export interface OverlayRow {
  id: string;
  lesson_id: string;
  type: string;
  data: Record<string, unknown>;
  script_section_ref: string | null;
  position: number;
  created_at: string;
  updated_at: string;
}

export async function getOverlays(lessonId: string): Promise<OverlayRow[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("overlays")
    .select("*")
    .eq("lesson_id", lessonId)
    .order("position", { ascending: true });

  if (error) {
    console.error("[overlays] getOverlays error:", JSON.stringify(error));
    throw new Error(error.message);
  }
  return (data ?? []) as OverlayRow[];
}

export async function createOverlay(
  lessonId: string,
  type: string,
  data: Record<string, unknown>,
  scriptSectionRef: string = ""
): Promise<OverlayRow> {
  const supabase = createAdminClient();

  // Assign next position
  const { data: existing } = await supabase
    .from("overlays")
    .select("position")
    .eq("lesson_id", lessonId)
    .order("position", { ascending: false })
    .limit(1)
    .maybeSingle();

  const position = (existing?.position ?? -1) + 1;

  const { data: row, error } = await supabase
    .from("overlays")
    .insert({ lesson_id: lessonId, type, data, script_section_ref: scriptSectionRef, position })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return row as OverlayRow;
}

export async function deleteOverlay(id: string): Promise<void> {
  const supabase = createAdminClient();
  const { error } = await supabase.from("overlays").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

/**
 * Merge overlays with their video trigger timestamps.
 * Each overlay's `script_section_ref` is fuzzy-matched against section titles.
 * Overlays without a matching section (or a parseable timestamp) are excluded.
 */
export function overlaysWithTimestamps(
  overlays: OverlayRow[],
  sections: ScriptSection[]
): (OverlayRow & { triggerAt: number })[] {
  const results: (OverlayRow & { triggerAt: number })[] = [];
  for (const overlay of overlays) {
    const ref = (overlay.script_section_ref ?? "").trim().toUpperCase();
    if (!ref) continue;
    const section = sections.find((s) => s.title.toUpperCase().includes(ref));
    if (!section?.timestamp) continue;
    const triggerAt = timestampToSeconds(section.timestamp);
    if (triggerAt > 0) results.push({ ...overlay, triggerAt });
  }
  return results.sort((a, b) => a.triggerAt - b.triggerAt);
}

export async function reorderOverlays(lessonId: string, orderedIds: string[]): Promise<void> {
  const supabase = createAdminClient();
  await Promise.all(
    orderedIds.map((id, position) =>
      supabase
        .from("overlays")
        .update({ position, updated_at: new Date().toISOString() })
        .eq("id", id)
        .eq("lesson_id", lessonId)
    )
  );
}
