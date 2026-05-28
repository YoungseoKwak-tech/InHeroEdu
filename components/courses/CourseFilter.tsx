"use client";

import type { Category } from "@/lib/data/courses";

type StudentCategory = Exclude<Category, "IB" | "Core">;
type FilterCategory = "All" | StudentCategory;

interface CourseFilterProps {
  onFilterChange: (filter: FilterCategory) => void;
  activeFilter: FilterCategory;
  counts: Record<FilterCategory, number>;
}

const filters: FilterCategory[] = ["All", "AP", "Honors", "Competition", "Test Prep"];

export default function CourseFilter({ onFilterChange, activeFilter, counts }: CourseFilterProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
            activeFilter === filter
              ? "bg-primary-500 text-white shadow-md"
              : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          {filter}{filter !== "All" && counts[filter] !== undefined ? ` (${counts[filter]})` : ""}
        </button>
      ))}
    </div>
  );
}
