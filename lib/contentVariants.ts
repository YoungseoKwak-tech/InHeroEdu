export type ContentLocale = "en" | "ko";

export const DEFAULT_CONTENT_LOCALE: ContentLocale = "en";
export const KOREAN_CONTENT_SUFFIX = "__ko";

export function isContentLocale(value: unknown): value is ContentLocale {
  return value === "en" || value === "ko";
}

export function getLessonContentId(baseLessonId: string, locale: ContentLocale): string {
  if (locale === "ko") {
    return baseLessonId.endsWith(KOREAN_CONTENT_SUFFIX)
      ? baseLessonId
      : `${baseLessonId}${KOREAN_CONTENT_SUFFIX}`;
  }

  return stripLessonContentVariant(baseLessonId);
}

export function stripLessonContentVariant(lessonId: string): string {
  return lessonId.endsWith(KOREAN_CONTENT_SUFFIX)
    ? lessonId.slice(0, -KOREAN_CONTENT_SUFFIX.length)
    : lessonId;
}

export function getCourseIndexHref(locale: ContentLocale): string {
  return locale === "ko" ? "/kr/courses" : "/courses";
}

export function getCourseHref(locale: ContentLocale, courseId: string): string {
  return `${getCourseIndexHref(locale)}/${courseId}`;
}

export function getLessonHref(
  locale: ContentLocale,
  courseId: string,
  lessonId: string
): string {
  return `${getCourseHref(locale, courseId)}/${stripLessonContentVariant(lessonId)}`;
}

export function getLocaleLabel(locale: ContentLocale): string {
  return locale === "ko" ? "Korean" : "English";
}
