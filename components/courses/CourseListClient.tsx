"use client";

import { useState } from "react";
import CourseCard from "./CourseCard";
import CourseFilter from "./CourseFilter";
import type { Course, Category } from "@/lib/data/courses";

type FilterCategory = "전체" | Category;

interface CourseListClientProps {
  courses: Course[];
}

export default function CourseListClient({ courses }: CourseListClientProps) {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("전체");

  const filtered = courses.filter((c) =>
    activeFilter === "전체" ? true : c.category === activeFilter
  );

  const counts = (["전체", "AP", "Honors", "Core", "대회", "시험"] as FilterCategory[]).reduce(
    (acc, f) => {
      acc[f] = f === "전체" ? courses.length : courses.filter((c) => c.category === f).length;
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
          {filtered.length}개 과목
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </>
  );
}
