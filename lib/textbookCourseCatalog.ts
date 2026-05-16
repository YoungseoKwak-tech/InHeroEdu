import { courses } from "@/lib/data/courses";

function startCaseCourseId(courseId: string) {
  return courseId
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function getTextbookCourseLabel(courseId: string) {
  const course = courses.find((item) => item.id === courseId);
  return course?.subjectEn ?? course?.subject ?? startCaseCourseId(courseId);
}
