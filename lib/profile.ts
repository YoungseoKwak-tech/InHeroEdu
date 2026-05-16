export interface ProfileFields {
  name: string | null;
  grade: string | null;
  school: string | null;
  referral_student_email: string | null;
}

type ProfileLike = Partial<Record<keyof ProfileFields | "full_name" | "school_name", unknown>>;

function normalizeValue(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export function normalizeProfileFields(profile: ProfileLike): ProfileFields {
  return {
    name: normalizeValue(profile.name) ?? normalizeValue(profile.full_name),
    grade: normalizeValue(profile.grade),
    school: normalizeValue(profile.school) ?? normalizeValue(profile.school_name),
    referral_student_email: normalizeValue(profile.referral_student_email),
  };
}

export function mergeProfileFields(
  primary?: Partial<ProfileFields> | null,
  fallback?: Partial<ProfileFields> | null
): ProfileFields {
  const normalizedPrimary = normalizeProfileFields(primary ?? {});
  const normalizedFallback = normalizeProfileFields(fallback ?? {});

  return {
    name: normalizedPrimary.name ?? normalizedFallback.name,
    grade: normalizedPrimary.grade ?? normalizedFallback.grade,
    school: normalizedPrimary.school ?? normalizedFallback.school,
    referral_student_email:
      normalizedPrimary.referral_student_email ?? normalizedFallback.referral_student_email,
  };
}
