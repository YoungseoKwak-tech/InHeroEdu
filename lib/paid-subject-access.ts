import { isAdminEmail, type AuthedUser } from "@/lib/auth";
import {
  getPaidCourseAccessIds,
  normalizeCourseAccessSubjectId,
} from "@/lib/course-access";
import { courses } from "@/lib/data/courses";
import { listStoredOrdersForUser } from "@/lib/orderStore";
import { createAdminClient } from "@/lib/supabase";

const allCourseIds = new Set(courses.map((course) => course.id));

export async function getPaidSubjectAccessIds(user: AuthedUser) {
  if (isAdminEmail(user.email)) return new Set(allCourseIds);

  const supabase = createAdminClient();
  const orders = await listStoredOrdersForUser(supabase, user.id);
  return getPaidCourseAccessIds(orders);
}

export function hasPaidSubjectAccess(
  accessIds: Set<string>,
  subjectId?: string | null
) {
  const normalized = normalizeCourseAccessSubjectId(subjectId);
  return !!normalized && accessIds.has(normalized);
}

export function filterToPaidSubjects<T>(
  items: T[],
  accessIds: Set<string>,
  getSubjectId: (item: T) => string | null | undefined
) {
  return items.filter((item) => hasPaidSubjectAccess(accessIds, getSubjectId(item)));
}
