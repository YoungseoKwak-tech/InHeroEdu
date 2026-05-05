export const CLIP_PART_SUFFIX_RE = /__PART_(\d+)$/i;
const NON_VIDEO_SECTION_RE =
  /^(SPARK|GAP CRUNCH|TEACH BACK|QUESTION SPRINT|ANALYZER|OVERLAYS JSON:?|TRAJECTORY)\b/i;

export function getClipBaseTitle(sectionTitle: string) {
  return sectionTitle.replace(CLIP_PART_SUFFIX_RE, "").trim();
}

export function getClipPartNumber(sectionTitle: string) {
  const match = sectionTitle.match(CLIP_PART_SUFFIX_RE);
  return match ? Number(match[1]) : 1;
}

export function getStoredClipSectionTitle(sectionTitle: string, partNumber: number) {
  const baseTitle = getClipBaseTitle(sectionTitle);
  return partNumber <= 1 ? baseTitle : `${baseTitle}__PART_${partNumber}`;
}

export function normalizeClipTitle(sectionTitle: string | null | undefined) {
  return getClipBaseTitle(sectionTitle ?? "").trim().toUpperCase();
}

export function isClipSectionTitle(sectionTitle: string | null | undefined) {
  const normalized = normalizeClipTitle(sectionTitle);
  if (!normalized) return false;
  return !NON_VIDEO_SECTION_RE.test(normalized);
}

export function getNextClipPartNumber(sectionTitles: string[], sectionTitle: string) {
  const normalizedSectionTitle = normalizeClipTitle(sectionTitle);
  const matchingPartNumbers = sectionTitles
    .filter((title) => normalizeClipTitle(title) === normalizedSectionTitle)
    .map(getClipPartNumber);

  if (matchingPartNumbers.length === 0) return 1;
  return Math.max(...matchingPartNumbers) + 1;
}
