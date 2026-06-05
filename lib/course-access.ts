import { FREE_FOR_ALL, PRELAUNCH_MODE } from "@/lib/config";
import { courses } from "@/lib/data/courses";
import type { StoredOrder } from "@/lib/orderStore";

export const PRELAUNCH_OPEN_COURSE_ID = "ap-biology";

export function isCourseLandingAvailable(courseId: string) {
  if (!PRELAUNCH_MODE) return true;
  return courseId === PRELAUNCH_OPEN_COURSE_ID;
}

export function isLessonAvailable() {
  return !PRELAUNCH_MODE;
}

export function getCourseComingSoonCopy(courseName: string) {
  return {
    badge: "PRE-LAUNCH COURSE",
    title: `${courseName} is coming soon`,
    description:
      "We are shaping the full lesson flow for our first cohort. You can explore the catalog now, and full chapter access will unlock soon.",
  };
}

export const lessonComingSoonCopy = {
  badge: "FIRST COHORT PREVIEW",
  title: "This chapter is coming soon",
  description:
    "We are preparing the full guided lesson, pattern tracking, and AI support for early users. Join the first cohort to unlock the complete experience.",
};

export function bindCourseAccessServiceId(serviceId: string, subjectId?: string | null) {
  if (serviceId === "all_subjects") return serviceId;
  if (serviceId !== "one_subject" || !subjectId) return serviceId;
  return `${serviceId}:${normalizeCourseAccessSubjectId(subjectId) ?? subjectId}`;
}

export function buildCourseBoundOrderName(
  orderName: string,
  serviceId: string,
  courseName?: string | null
) {
  if (!courseName) return orderName;
  if (serviceId.includes(courseName)) return orderName;
  return `${orderName} — ${courseName}`;
}

export function hasPaidEnglishCourseAccess(
  orders: StoredOrder[],
  courseId: string
) {
  // Free-for-all mode: every student has full course access without paying.
  if (FREE_FOR_ALL) return true;

  const normalizedCourseId = normalizeCourseAccessSubjectId(courseId);
  if (!normalizedCourseId) return false;

  return orders.some((order) => {
    if (order.status !== "paid") return false;

    const serviceId = order.serviceId.toLowerCase();
    if (!serviceId) return false;

    // Textbook purchases are separate from video/course access.
    if (serviceId.startsWith("textbook:")) return false;

    const [baseServiceId, boundCourseId] = serviceId.split(":");
    if (baseServiceId === "all_subjects") return true;

    const normalizedBoundCourseId = normalizeCourseAccessSubjectId(boundCourseId);
    if (
      baseServiceId === "one_subject" &&
      normalizedBoundCourseId === normalizedCourseId
    ) {
      return true;
    }
    if (serviceId === normalizedCourseId) return true;

    return false;
  });
}

const courseIdSet = new Set(courses.map((course) => course.id));
const courseLabelToId = new Map(
  courses.flatMap((course) => [
    [course.subject.toLowerCase(), course.id],
    [course.subjectEn.toLowerCase(), course.id],
  ])
);

const legacySubjectAliases: Record<string, string> = {
  ap_bio: "ap-biology",
  ap_chem: "ap-chemistry",
  ap_calc_ab: "ap-calculus-ab",
  ap_calc_bc: "ap-calculus-bc",
  ap_precalc: "ap-precalculus",
  ap_phys1: "ap-physics-1",
  ap_phys2: "ap-physics-2",
  ap_phys_c_mech: "ap-physics-c-mech",
  ap_phys_c_em: "ap-physics-c-em",
  ap_stats: "ap-statistics",
  ap_cs_a: "ap-computer-science-a",
  ap_cs_p: "ap-cs-principles",
  ap_eng_lang: "ap-english-language",
  ap_eng_lit: "ap-english-literature",
  ap_ush: "ap-us-history",
  ap_wh: "ap-world-history",
  ap_psych: "ap-psychology",
  ap_macro: "ap-macroeconomics",
  ap_micro: "ap-microeconomics",
  ap_enviro: "ap-environmental-science",
  ap_euro: "ap-european-history",
  ap_usgov: "ap-us-government",
  ap_comp_gov: "ap-comparative-government",
  ap_hug: "ap-human-geography",
  ap_art_hist: "ap-art-history",
  ap_music: "ap-music-theory",
  ap_spanish: "ap-spanish-language",
  sat_math: "sat-math",
  sat_rw: "sat-reading",
};

export function normalizeCourseAccessSubjectId(subjectId?: string | null) {
  const raw = subjectId?.trim().toLowerCase();
  if (!raw) return null;

  const alias = legacySubjectAliases[raw] ?? legacySubjectAliases[raw.replace(/-/g, "_")];
  if (alias) return alias;

  const hyphenated = raw.replace(/_/g, "-");
  if (courseIdSet.has(hyphenated)) return hyphenated;

  return courseLabelToId.get(raw) ?? null;
}

export function getPaidCourseAccessIds(orders: StoredOrder[]) {
  const accessIds = new Set<string>();

  if (FREE_FOR_ALL) {
    courses.forEach((course) => accessIds.add(course.id));
    return accessIds;
  }

  for (const order of orders) {
    if (order.status !== "paid") continue;

    const serviceId = order.serviceId.toLowerCase();
    if (!serviceId || serviceId.startsWith("textbook:")) continue;

    const [baseServiceId, boundCourseId] = serviceId.split(":");
    if (baseServiceId === "all_subjects") {
      courses.forEach((course) => accessIds.add(course.id));
      return accessIds;
    }

    if (baseServiceId === "one_subject") {
      const normalized = normalizeCourseAccessSubjectId(boundCourseId);
      if (normalized) accessIds.add(normalized);
      continue;
    }

    const normalized = normalizeCourseAccessSubjectId(serviceId);
    if (normalized) accessIds.add(normalized);
  }

  return accessIds;
}
