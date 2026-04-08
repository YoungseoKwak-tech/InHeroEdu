import { courses } from "@/lib/data/courses";
import { getLessonsByCourse } from "@/lib/data/lessons";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Props {
  params: { subject: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const course = courses.find((c) => c.id === params.subject);
  if (!course) return { title: "강의 | InHero" };
  return {
    title: `${course.subject} | InHero`,
    description: course.description,
  };
}

export async function generateStaticParams() {
  return courses.map((c) => ({ subject: c.id }));
}

export default function CoursePage({ params }: Props) {
  const course = courses.find((c) => c.id === params.subject);
  if (!course) notFound();

  const lessons = getLessonsByCourse(course.id);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className={`bg-gradient-to-r ${course.color} text-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition-colors"
          >
            ← 강의 목록
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
              <p className="text-white/80 text-sm mt-1">{course.subjectEn}</p>
            </div>
          </div>
          <p className="text-white/90 max-w-2xl leading-relaxed">{course.description}</p>
          <div className="flex gap-6 mt-6 text-sm text-white/80">
            <span>📚 {course.topicCount}개 강의</span>
            <span>🤖 AI 설명 지원</span>
            <span>✅ 연습 문제 포함</span>
          </div>
        </div>
      </div>

      {/* Lessons */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {lessons.length === 0 ? (
          <div className="text-center py-20 text-gray-500 dark:text-gray-400">
            <p className="text-4xl mb-4">🚧</p>
            <p className="font-semibold">강의를 준비 중이에요</p>
            <p className="text-sm mt-2">곧 오픈될 예정입니다!</p>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              강의 목록
            </h2>
            <div className="space-y-3">
              {lessons.map((lesson, idx) => (
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
                      {lesson.title}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                      {lesson.titleEn}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-400 dark:text-gray-500 flex-shrink-0">
                    <span className="hidden sm:block">⏱ {lesson.duration}</span>
                    <span className="hidden sm:block">📝 {lesson.practiceQuestions.length}문제</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
