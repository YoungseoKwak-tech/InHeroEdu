import { courses } from "@/lib/data/courses";
import CourseListClient from "@/components/courses/CourseListClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses | InHero Korean Lectures",
  description: "Browse the Korean lecture mirror of the InHero course library.",
};

export default function KoreanCoursesPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-primary-500 text-sm font-semibold mb-4">
              <span>📚</span> Course Library
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
              Courses for ambitious students
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              AP, Honors, competition, and test prep paths designed to grow with your learning pattern.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <CourseListClient courses={courses} courseHrefBase="/kr/courses" />
      </div>
    </div>
  );
}
