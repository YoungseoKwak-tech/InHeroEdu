import type { LessonClip } from "@/lib/lessonClips";
import type { OverlayRow } from "@/lib/overlays";
import type { ScriptSection } from "@/lib/parseScript";
import { getClipBaseTitle, normalizeClipTitle } from "@/lib/lessonClipUtils";

export type PlaylistItem =
  | { kind: "clip"; sectionTitle: string; clipUrl: string; index: number }
  | { kind: "overlay"; overlay: OverlayRow; index: number };

/**
 * Stitches video clips and overlays into a sequential playlist.
 *
 * When only the "real" video sections are uploaded as clips, overlays still
 * need to appear in the correct gaps between those clips. We use the full
 * parsed script order to place each overlay between the current clip and the
 * next uploaded clip.
 *
 * Overlays whose refs cannot be placed are appended at the end as a fallback.
 */
function normalizeTitle(value: string | null | undefined) {
  return normalizeClipTitle(value);
}

function findSectionOrder(
  ref: string | null | undefined,
  sectionOrderByTitle: Map<string, number>,
  sections: ScriptSection[]
): number | null {
  const normalized = normalizeTitle(ref);
  if (!normalized) return null;

  const exact = sectionOrderByTitle.get(normalized);
  if (exact != null) return exact;

  for (let i = 0; i < sections.length; i++) {
    const sectionTitle = normalizeTitle(sections[i].title);
    if (!sectionTitle) continue;
    if (sectionTitle.includes(normalized) || normalized.includes(sectionTitle)) {
      return i;
    }
  }
  return null;
}

export function buildPlaylist(
  clips: LessonClip[],
  overlays: OverlayRow[],
  sections: ScriptSection[] = []
): PlaylistItem[] {
  const items: PlaylistItem[] = [];
  const usedOverlayIds = new Set<string>();
  const sectionOrderByTitle = new Map(
    sections.map((section, index) => [normalizeTitle(section.title), index])
  );
  const overlaysWithOrder = overlays
    .map((overlay, originalIndex) => ({
      overlay,
      originalIndex,
      sectionOrder: findSectionOrder(overlay.script_section_ref, sectionOrderByTitle, sections),
    }))
    .sort((a, b) => {
      if (a.sectionOrder == null && b.sectionOrder == null) {
        return a.overlay.position - b.overlay.position || a.originalIndex - b.originalIndex;
      }
      if (a.sectionOrder == null) return 1;
      if (b.sectionOrder == null) return -1;
      return a.sectionOrder - b.sectionOrder || a.overlay.position - b.overlay.position;
    });

  for (let i = 0; i < clips.length; i++) {
    const clip = clips[i];

    if (clip.clip_url) {
      items.push({
        kind: "clip",
        sectionTitle: getClipBaseTitle(clip.section_title),
        clipUrl: clip.clip_url,
        index: items.length,
      });
    }

    const currentSectionOrder = clip.section_index;
    const nextSectionOrder = clips[i + 1]?.section_index ?? Number.POSITIVE_INFINITY;

    for (const entry of overlaysWithOrder) {
      if (usedOverlayIds.has(entry.overlay.id)) continue;
      if (entry.sectionOrder == null) continue;
      if (entry.sectionOrder > currentSectionOrder && entry.sectionOrder <= nextSectionOrder) {
        usedOverlayIds.add(entry.overlay.id);
        items.push({ kind: "overlay", overlay: entry.overlay, index: items.length });
      }
    }
  }

  const unmatched = overlays
    .filter((overlay) => !usedOverlayIds.has(overlay.id))
    .sort((a, b) => a.position - b.position);

  if (unmatched.length > 0 && clips.length > 0) {
    const clipItemPositions = items
      .map((item, idx) => (item.kind === "clip" ? idx : -1))
      .filter((idx) => idx !== -1);
    const slotCount = clipItemPositions.length + 1;
    let insertOffset = 0;

    unmatched.forEach((overlay, idx) => {
      const slot = Math.min(slotCount - 1, Math.floor((idx / unmatched.length) * slotCount));
      const insertAt =
        slot === 0
          ? 0 + insertOffset
          : (clipItemPositions[slot - 1] ?? items.length - 1) + 1 + insertOffset;
      items.splice(insertAt, 0, { kind: "overlay", overlay, index: insertAt });
      insertOffset += 1;
    });
  } else {
    for (const overlay of unmatched) {
      items.push({ kind: "overlay", overlay, index: items.length });
    }
  }

  return items.map((item, index) => ({ ...item, index }));
}
