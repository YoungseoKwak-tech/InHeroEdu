import { PRELAUNCH_MODE } from "@/lib/config";
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
  return orders.some((order) => {
    if (order.status !== "paid") return false;

    const serviceId = order.serviceId.toLowerCase();
    if (!serviceId) return false;
    if (serviceId.includes("novapass")) return true;
    if (serviceId.includes("inhero-pass")) return true;
    if (serviceId.includes(`:${courseId}`)) return true;
    if (serviceId === courseId) return true;
    return false;
  });
}
