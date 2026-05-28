"use client";

import { useState } from "react";
import CourseCard from "./CourseCard";
import CourseFilter from "./CourseFilter";
import type { Course, Category } from "@/lib/data/courses";

type StudentCategory = Exclude<Category, "IB" | "Core">;
type FilterCategory = "All" | StudentCategory;

interface CourseListClientProps {
  courses: Course[];
  courseHrefBase?: string;
}

export default function CourseListClient({
  courses,
  courseHrefBase = "/courses",
}: CourseListClientProps) {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("All");
  const visibleCourses = courses.filter(
    (course) => course.category !== "IB" && course.category !== "Core"
  );

  const filtered = visibleCourses.filter((c) =>
    activeFilter === "All" ? true : c.category === activeFilter
  );

  const counts = (["All", "AP", "Honors", "Competition", "Test Prep"] as FilterCategory[]).reduce(
    (acc, f) => {
      acc[f] = f === "All" ? visibleCourses.length : visibleCourses.filter((c) => c.category === f).length;
      return acc;
    },
    {} as Record<FilterCategory, number>
  );

  return (
    <>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <CourseFilter
          onFilterChange={(f) => setActiveFilter(f)}
          activeFilter={activeFilter}
          counts={counts}
        />
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {filtered.length} courses
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((course) => (
          <CourseCard key={course.id} course={course} hrefBase={courseHrefBase} />
        ))}
      </div>
    </>
  );
}
