import Link from "next/link";
import type { Course } from "@/lib/data/courses";

interface CourseCardProps {
  course: Course;
  hrefBase?: string;
}

const difficultyColor: Record<string, string> = {
  "Intro": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  "Intermediate": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  "Advanced": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

export default function CourseCard({ course, hrefBase = "/courses" }: CourseCardProps) {

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

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-1 mb-5">
            {course.description}
          </p>

          {/* Meta */}
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                📚 {course.topicCount} lessons
              </span>
            </div>
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full ${difficultyColor[course.difficulty]}`}
            >
              {course.difficulty}
            </span>
          </div>

          {/* CTA opens the course table of contents first. The firstLessonId
              only controls whether the course is live enough to enter. */}
          <div className="mt-5">
            {course.firstLessonId ? (
              <Link
                href={`${hrefBase}/${course.id}`}
                className="w-full text-center text-sm py-2.5 block rounded-xl border border-emerald-400/40 bg-emerald-400/10 text-emerald-300 font-semibold tracking-wide transition-colors duration-150 hover:bg-emerald-400 hover:text-slate-900 hover:border-emerald-400"
              >
                Start lesson →
              </Link>
            ) : (
              <span
                aria-disabled="true"
                className="w-full text-center text-sm py-2.5 block rounded-xl border border-slate-700/60 bg-slate-800/40 text-slate-500 font-semibold tracking-wide cursor-not-allowed select-none"
              >
                Coming Soon
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
