export interface ProfileFields {
  name: string | null;
  grade: string | null;
  school: string | null;
  referral_student_email: string | null;
  phone: string | null;
  marketing_consent: boolean;
}

type ProfileLike = Partial<
  Record<keyof ProfileFields | "full_name" | "school_name", unknown>
>;

function normalizeValue(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function normalizeBool(value: unknown): boolean {
  return value === true || value === "true" || value === 1 || value === "1";
}

/** Korean phone → digits only (01012345678). Returns null if not a mobile. */
export function normalizePhoneValue(value: unknown): string | null {
  const s = normalizeValue(value);
  if (!s) return null;
  let d = s.replace(/[^\d+]/g, "");
  if (d.startsWith("+82")) d = "0" + d.slice(3);
  d = d.replace(/\D/g, "");
  return /^01\d{8,9}$/.test(d) ? d : null;
}

export function normalizeProfileFields(profile: ProfileLike): ProfileFields {
  return {
    name: normalizeValue(profile.name) ?? normalizeValue(profile.full_name),
    grade: normalizeValue(profile.grade),
    school: normalizeValue(profile.school) ?? normalizeValue(profile.school_name),
    referral_student_email: normalizeValue(profile.referral_student_email),
    phone: normalizePhoneValue(profile.phone),
    marketing_consent: normalizeBool(profile.marketing_consent),
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
    phone: normalizedPrimary.phone ?? normalizedFallback.phone,
    marketing_consent: normalizedPrimary.marketing_consent || normalizedFallback.marketing_consent,
  };
}
