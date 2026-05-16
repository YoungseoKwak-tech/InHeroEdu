export const TEXTBOOK_PREVIEW_PAGE_COUNT = 6;

export function getTextbookReaderHref(subjectId: string): string {
  return `/textbooks/${encodeURIComponent(subjectId)}`;
}

export function getTextbookPreviewFileHref(subjectId: string): string {
  return `/api/textbook-reader/file?subjectId=${encodeURIComponent(subjectId)}&mode=preview`;
}

export function getTextbookFullFileHref(subjectId: string): string {
  return `/api/textbook-reader/file?subjectId=${encodeURIComponent(subjectId)}&mode=full`;
}

