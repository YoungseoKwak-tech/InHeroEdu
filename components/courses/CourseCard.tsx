import Link from "next/link";
import type { Course } from "@/lib/data/courses";

interface CourseCardProps {
  course: Course;
}

const difficultyColor: Record<string, string> = {
  "입문": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  "중급": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  "심화": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

export default function CourseCard({ course }: CourseCardProps) {
  const isAvailable = course.lessonIds.length > 0;

  return (
    <div className="relative group">
      <div className="card overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
        {/* Header gradient */}
        <div className={`h-2 bg-gradient-to-r ${course.color}`} />

        <div className="p-6 flex-1 flex flex-col">
          {/* Icon + Category */}
          <div className="flex items-start justify-between mb-4">
            <div className="text-3xl">{course.icon}</div>
            <span className="text-xs font-bold text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 px-2.5 py-1 rounded-full">
              {course.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-extrabold text-gray-900 dark:text-white text-lg mb-1">
            {course.subject}
          </h3>
          <p className="text-xs text-gray-400 dark:text-gray-500 font-medium mb-3">
            {course.subjectEn}
          </p>

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-1 mb-5">
            {course.description}
          </p>

          {/* Meta */}
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                📚 {course.topicCount}개 강의
              </span>
            </div>
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full ${difficultyColor[course.difficulty]}`}
            >
              {course.difficulty}
            </span>
          </div>

          {/* CTA */}
          <div className="mt-5">
            {isAvailable ? (
              <Link
                href={`/courses/${course.id}`}
                className="w-full btn-primary text-center text-sm py-2.5 block rounded-xl"
              >
                강의 시작하기 →
              </Link>
            ) : (
              <button
                disabled
                className="w-full text-sm py-2.5 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 font-semibold cursor-not-allowed"
              >
                준비 중
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
