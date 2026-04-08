import { courses } from "@/lib/data/courses";
import CourseListClient from "@/components/courses/CourseListClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "강의 목록 | InHero",
  description: "AP Biology, AP Chemistry, AP Calculus BC, AMC — 아이비리그를 위한 모든 과목",
};

export default function CoursesPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-primary-500 text-sm font-semibold mb-4">
              <span>📚</span> 전체 강의
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-3">
              아이비리그를 위한 강의
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Cornell 재학생이 직접 만든 AP, AMC, SAT 강의. 모르는 개념은 AI가 즉시 한국어로 설명해줍니다.
            </p>
          </div>
        </div>
      </div>

      {/* Course list */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <CourseListClient courses={courses} />
      </div>
    </div>
  );
}
