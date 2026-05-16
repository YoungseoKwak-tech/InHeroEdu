import { courses } from "@/lib/data/courses";
import { getLessonsByCourse } from "@/lib/data/lessons";
import { getLessonPlayerData } from "@/lib/lessons";
import { getCourseLessonsWithClips } from "@/lib/getCourseLessons";
import { resolveCourseId } from "@/lib/courseAliases";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Props {
  params: { subject: string };
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedSubject = resolveCourseId(params.subject);
  const course = courses.find((c) => c.id === resolvedSubject);
  if (!course) return { title: "Course | InHero" };
  return {
    title: `${course.subject} | InHero Korean Lectures`,
    description: course.description,
  };
}

export default async function KoreanCoursePage({ params }: Props) {
  const resolvedSubject = resolveCourseId(params.subject);
  const course = courses.find((c) => c.id === resolvedSubject);
  if (!course) notFound();

  const staticLessons = getLessonsByCourse(course.id);
  const hasUnits = course.units && course.units.length > 0;

  let dbLessons: Awaited<ReturnType<typeof getCourseLessonsWithClips>>["lessons"] = [];
  let lessonsWithClips = new Set<string>();

  if (hasUnits) {
    const result = await getCourseLessonsWithClips(course.id);
    dbLessons = result.lessons;
    lessonsWithClips = result.lessonsWithClips;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className={`bg-gradient-to-r ${course.color} text-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <Link
            href="/kr/courses"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition-colors"
          >
            ← Course library
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{course.icon}</span>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full">
                  {course.category}
                </span>
                <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full">
                  {course.difficulty}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold">{course.subject}</h1>
            </div>
          </div>
          <p className="text-white/90 max-w-2xl leading-relaxed">{course.description}</p>
          <div className="flex gap-6 mt-6 text-sm text-white/80">
            <span>📚 {hasUnits ? `${course.units!.length} units` : `${course.topicCount} lessons`}</span>
            <span>🤖 AI-guided support</span>
            <span>✅ Practice questions included</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {hasUnits ? (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Course Units
              </h2>
              <span className="text-xs font-semibold text-amber-700 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-400 px-3 py-1.5 rounded-full border border-amber-200 dark:border-amber-800">
                2025–26 College Board CED
              </span>
            </div>
            <div className="space-y-6">
              {course.units!.map((unit) => {
                const unitLessons = dbLessons.filter(
                  (lesson) => lesson.unit_number === unit.number
                );
                return (
                  <div key={unit.slug}>
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-9 h-9 rounded-xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-bold text-sm flex items-center justify-center flex-shrink-0">
                        {unit.number}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-gray-900 dark:text-white">
                            {unit.title}
                          </span>
                          <span className="text-xs font-semibold text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-2.5 py-0.5 rounded-full flex-shrink-0">
                            {unit.examWeight} of exam
                          </span>
                        </div>
                      </div>
                    </div>

                    {unitLessons.length > 0 ? (
                      <div className="space-y-1.5 ml-13 pl-1">
                        {unitLessons.map((lesson) => {
                          const hasClip = lessonsWithClips.has(lesson.id);
                          return (
                            <Link
                              key={lesson.id}
                              href={`/kr/courses/${course.id}/${lesson.id}`}
                              className="flex items-center gap-4 card p-4 hover:shadow-md hover:border-primary-200 dark:hover:border-primary-700 transition-all duration-200 group"
                            >
                              <div className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-semibold text-xs flex items-center justify-center flex-shrink-0 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                                {unit.number}.{lesson.lesson_number}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors text-sm">
                                  {lesson.title}
                                </div>
                              </div>
                              <div className="flex items-center gap-2 flex-shrink-0">
                                {hasClip ? (
                                  <span className="hidden sm:inline-flex rounded-full bg-primary-50 dark:bg-primary-900/20 px-2.5 py-1 text-[11px] font-semibold text-primary-600 dark:text-primary-400">
                                    Watch
                                  </span>
                                ) : (
                                  <span className="hidden sm:inline-flex rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-700 dark:bg-amber-900/20 dark:text-amber-400">
                                    Coming Soon
                                  </span>
                                )}
                                <svg
                                  className="w-3.5 h-3.5 text-gray-400 group-hover:translate-x-1 transition-transform"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                  />
                                </svg>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="ml-13 pl-1">
                        <p className="text-sm text-gray-400 dark:text-gray-500 py-2">
                          Lessons coming soon
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : staticLessons.length === 0 ? (
          <div className="text-center py-20 text-gray-500 dark:text-gray-400">
            <p className="text-4xl mb-4">🚧</p>
            <p className="font-semibold">Lessons are coming soon</p>
            <p className="text-sm mt-2">We are rolling out content for the first cohort.</p>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Chapters
            </h2>
            <div className="space-y-3">
              {staticLessons.map((lesson, idx) => {
                const hasPlayer = !!getLessonPlayerData(lesson.id);
                return (
                  <Link
                    key={lesson.id}
                    href={`/kr/courses/${course.id}/${lesson.id}`}
                    className="flex items-center gap-5 card p-5 hover:shadow-md hover:border-primary-200 dark:hover:border-primary-700 transition-all duration-200 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-bold text-sm flex items-center justify-center flex-shrink-0 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                      {idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {lesson.titleEn}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-400 dark:text-gray-500 flex-shrink-0">
                      {hasPlayer ? (
                        <span className="hidden md:inline-flex rounded-full bg-primary-50 dark:bg-primary-900/20 px-2.5 py-1 text-[11px] font-semibold text-primary-600 dark:text-primary-400">
                          Available
                        </span>
                      ) : (
                        <span className="hidden md:inline-flex rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-700 dark:bg-amber-900/20 dark:text-amber-400">
                          Coming Soon
                        </span>
                      )}
                      <span className="hidden sm:block">⏱ {lesson.duration}</span>
                      <span className="hidden sm:block">📝 {lesson.practiceQuestions.length} questions</span>
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
