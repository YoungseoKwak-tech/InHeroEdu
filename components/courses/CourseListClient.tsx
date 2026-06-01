"use client";

import CourseCard from "./CourseCard";
import type { Course } from "@/lib/data/courses";

interface CourseListClientProps {
  courses: Course[];
  courseHrefBase?: string;
}

export default function CourseListClient({
  courses,
  courseHrefBase = "/courses",
}: CourseListClientProps) {
  return (
    <>
      <div className="flex items-center justify-end mb-6">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {courses.length} courses
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} hrefBase={courseHrefBase} />
        ))}
      </div>
    </>
  );
}
