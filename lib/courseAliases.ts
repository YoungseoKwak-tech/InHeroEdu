const COURSE_ID_VARIANT_GROUPS: string[][] = [
  ["ap-biology", "ap-bio"],
  ["ap-chemistry", "ap-chem"],
  ["ap-calculus-ab", "ap-calc-ab", "ap-calculus"],
  ["ap-physics-1", "ap-physics"],
  ["ap-physics-2", "ap-phys2"],
  ["ap-physics-c-mech", "ap-physics-c-mechanics"],
  ["ap-physics-c-em", "ap-physics-c-e-m"],
  ["ap-computer-science-a", "ap-cs-a"],
  ["ap-us-history", "ap-history", "apush"],
];

function uniqueStrings(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)));
}

export function resolveCourseId(courseId: string): string {
  const group = COURSE_ID_VARIANT_GROUPS.find((variants) => variants.includes(courseId));
  return group?.[0] ?? courseId;
}

export function getCourseIdVariants(courseId: string): string[] {
  const resolved = resolveCourseId(courseId);
  const group = COURSE_ID_VARIANT_GROUPS.find((variants) => variants.includes(courseId) || variants.includes(resolved));
  if (!group) return [resolved];
  return uniqueStrings(group);
}

export function getLessonIdVariants(lessonId: string, courseId?: string): string[] {
  const suffixMatch = lessonId.match(/^(.*?)(-u\d+-l\d+.*)$/);
  if (!suffixMatch) {
    return [lessonId];
  }

  const prefix = suffixMatch[1];
  const suffix = suffixMatch[2];
  const groups = COURSE_ID_VARIANT_GROUPS.filter((variants) =>
    variants.includes(prefix) || (courseId ? variants.includes(courseId) : false)
  );

  if (groups.length === 0) {
    return [lessonId];
  }

  const variants = groups.flatMap((group) => group.map((variant) => `${variant}${suffix}`));
  return uniqueStrings(variants);
}
