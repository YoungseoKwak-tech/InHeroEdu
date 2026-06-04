import { FREE_FOR_ALL, PRELAUNCH_MODE } from "@/lib/config";
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
  if (!subjectId) return serviceId;
  return `${serviceId}:${subjectId}`;
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

  const normalizedCourseId = courseId.toLowerCase();

  return orders.some((order) => {
    if (order.status !== "paid") return false;

    const serviceId = order.serviceId.toLowerCase();
    if (!serviceId) return false;

    // Textbook purchases are separate from video/course access.
    if (serviceId.startsWith("textbook:")) return false;

    const [baseServiceId, boundCourseId] = serviceId.split(":");
    if (baseServiceId === "novapass" || baseServiceId === "inhero-pass") return true;
    if (
      ["single", "three"].includes(baseServiceId) &&
      boundCourseId === normalizedCourseId
    ) {
      return true;
    }
    if (serviceId === normalizedCourseId) return true;

    return false;
  });
}
