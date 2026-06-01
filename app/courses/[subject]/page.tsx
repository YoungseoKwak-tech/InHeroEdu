import { courses } from "@/lib/data/courses";
import { getLessonsByCourse } from "@/lib/data/lessons";
import { getLessonPlayerData } from "@/lib/lessons";
import { getCourseLessonsWithClips } from "@/lib/getCourseLessons";
import { resolveCourseId } from "@/lib/courseAliases";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import UnitsLessonsWithProgress from "@/components/courses/UnitsLessonsWithProgress";

interface Props {
  params: { subject: string };
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedSubject = resolveCourseId(params.subject);
  const course = courses.find((c) => c.id === resolvedSubject);
  if (!course || course.category === "IB") return { title: "Course | InHero" };
  return {
    title: `${course.subject} | InHero`,
    description: course.description,
  };
}

export default async function CoursePage({ params }: Props) {
  const resolvedSubject = resolveCourseId(params.subject);
  const course = courses.find((c) => c.id === resolvedSubject);
  if (!course || course.category === "IB") notFound();

  const staticLessons = getLessonsByCourse(course.id);
  const hasUnits = course.units && course.units.length > 0;

  // For unit-based (AP/Honors) courses, fetch real lessons from DB
  let dbLessons: Awaited<ReturnType<typeof getCourseLessonsWithClips>>["lessons"] = [];
  let lessonsWithClips = new Set<string>();

  if (hasUnits) {
    const result = await getCourseLessonsWithClips(course.id);
    dbLessons = result.lessons;
    lessonsWithClips = result.lessonsWithClips;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className={`bg-gradient-to-r ${course.color} text-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <Link
            href="/courses"
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
          {course.textbookSlug && (
            <Link
              href={`/textbooks/${course.textbookSlug}`}
              className="inline-flex items-center gap-2 mt-6 px-5 py-3 rounded-lg bg-white/15 hover:bg-white/25 border border-white/30 hover:border-white/50 text-white font-semibold text-sm transition-all backdrop-blur-sm"
            >
              <span className="text-lg">📖</span>
              <span>Open Textbook</span>
              <span className="text-base">→</span>
            </Link>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {hasUnits ? (
          /* Units view — AP/Honors courses with DB lessons */
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Course Units
              </h2>
              <span className="text-xs font-semibold text-amber-700 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-400 px-3 py-1.5 rounded-full border border-amber-200 dark:border-amber-800">
                2025–26 College Board CED
              </span>
            </div>
            <UnitsLessonsWithProgress
              courseId={course.id}
              units={course.units!.map((u) => ({
                number: u.number,
                slug: u.slug,
                title: u.title,
                examWeight: u.examWeight,
              }))}
              lessons={dbLessons.map((l) => ({
                id: l.id,
                title: l.title,
                unit_number: l.unit_number,
                lesson_number: l.lesson_number,
              }))}
              lessonsWithClips={Array.from(lessonsWithClips)}
            />
          </div>
        ) : staticLessons.length === 0 ? (
          /* No units, no lessons */
          <div className="text-center py-20 text-gray-500 dark:text-gray-400">
            <p className="text-4xl mb-4">🚧</p>
            <p className="font-semibold">Lessons are coming soon</p>
            <p className="text-sm mt-2">We are rolling out content for the first cohort.</p>
          </div>
        ) : (
          /* Lessons view — non-unit courses with static lessons */
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
                    href={`/courses/${course.id}/${lesson.id}`}
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
