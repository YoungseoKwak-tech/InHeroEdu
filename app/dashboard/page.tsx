import Link from "next/link";
import type { Metadata } from "next";
import DashboardExtras from "@/components/dashboard/DashboardExtras";

export const metadata: Metadata = {
  title: "대시보드 | InHero",
  description: "나의 학습 현황을 확인하세요",
};

const progressData = [
  {
    subject: "AP Biology",
    korean: "AP 생물학",
    icon: "🧬",
    completed: 3,
    total: 47,
    color: "bg-emerald-500",
    lightColor: "bg-emerald-100 dark:bg-emerald-900/20",
    id: "ap-biology",
  },
  {
    subject: "AP Chemistry",
    korean: "AP 화학",
    icon: "⚗️",
    completed: 0,
    total: 52,
    color: "bg-blue-500",
    lightColor: "bg-blue-100 dark:bg-blue-900/20",
    id: "ap-chemistry",
  },
  {
    subject: "AP Calculus BC",
    korean: "AP 미적분 BC",
    icon: "∫",
    completed: 0,
    total: 61,
    color: "bg-primary-500",
    lightColor: "bg-primary-100 dark:bg-primary-900/20",
    id: "ap-calculus-bc",
  },
];

const recentLessons = [
  {
    title: "DNA 복제 과정",
    subject: "AP Biology",
    time: "2시간 전",
    duration: "20:45",
    lessonId: "dna-replication",
    courseId: "ap-biology",
    completed: true,
  },
  {
    title: "미토콘드리아와 세포 호흡",
    subject: "AP Biology",
    time: "어제",
    duration: "22:10",
    lessonId: "mitochondria",
    courseId: "ap-biology",
    completed: true,
  },
  {
    title: "세포의 구조와 기능",
    subject: "AP Biology",
    time: "3일 전",
    duration: "18:24",
    lessonId: "cell-structure",
    courseId: "ap-biology",
    completed: true,
  },
];

const weakTopics = [
  { topic: "DNA 복제 — 오카자키 절편", subject: "AP Biology", score: 33, icon: "🧬" },
  { topic: "광합성 — 캘빈 회로", subject: "AP Biology", score: 50, icon: "🌿" },
  { topic: "세포 호흡 — 전자전달계", subject: "AP Biology", score: 67, icon: "⚡" },
];

export default function DashboardPage() {
  const totalCompleted = progressData.reduce((sum, s) => sum + s.completed, 0);
  const totalLessons = progressData.reduce((sum, s) => sum + s.total, 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Welcome */}
        <div className="mb-10">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white">
                안녕하세요, 학생님! 👋
              </h1>
              <p className="text-gray-500 dark:text-gray-400 mt-1">
                오늘도 한 걸음 더 아이비리그에 가까워져봐요
              </p>
            </div>
            <Link href="/courses/ap-biology/photosynthesis" className="btn-primary text-sm">
              오늘의 강의 시작 →
            </Link>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: "완료한 강의", value: `${totalCompleted}개`, icon: "✅" },
              { label: "학습 일수", value: "12일", icon: "🔥" },
              { label: "맞춘 문제", value: "24/36", icon: "📝" },
              { label: "AI 질문 수", value: "47회", icon: "🤖" },
            ].map((stat) => (
              <div key={stat.label} className="card p-5">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-xl font-extrabold text-gray-900 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress */}
            <div className="card p-6">
              <h2 className="font-bold text-gray-900 dark:text-white mb-5 text-lg">
                과목별 진도
              </h2>
              <div className="space-y-5">
                {progressData.map((subj) => {
                  const pct = Math.round((subj.completed / subj.total) * 100);
                  return (
                    <div key={subj.subject}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{subj.icon}</span>
                          <span className="font-semibold text-sm text-gray-800 dark:text-gray-200">
                            {subj.korean}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {subj.completed}/{subj.total} 강의 · {pct}%
                        </span>
                      </div>
                      <div className={`w-full h-2.5 ${subj.lightColor} rounded-full overflow-hidden`}>
                        <div
                          className={`h-full ${subj.color} rounded-full transition-all duration-500`}
                          style={{ width: `${Math.max(pct, pct > 0 ? 3 : 0)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent lessons */}
            <div className="card p-6">
              <h2 className="font-bold text-gray-900 dark:text-white mb-5 text-lg">
                최근 강의
              </h2>
              <div className="space-y-3">
                {recentLessons.map((lesson) => (
                  <Link
                    key={lesson.lessonId}
                    href={`/courses/${lesson.courseId}/${lesson.lessonId}`}
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 flex-shrink-0">
                      ✓
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors truncate">
                        {lesson.title}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {lesson.subject} · {lesson.time}
                      </div>
                    </div>
                    <div className="text-xs text-gray-400 flex-shrink-0">
                      {lesson.duration}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Next recommended */}
            <div className="card p-6 bg-gradient-to-br from-primary-500 to-primary-600 text-white border-0">
              <div className="text-sm font-semibold text-primary-100 mb-3">
                ⚡ 다음 추천 강의
              </div>
              <h3 className="font-extrabold text-lg mb-1">광합성의 두 단계</h3>
              <p className="text-primary-100 text-sm mb-5 leading-relaxed">
                명반응과 캘빈 회로 — AP Bio 단골 출제 토픽
              </p>
              <div className="flex items-center justify-between mb-5">
                <span className="text-primary-200 text-sm">⏱ 24분 30초</span>
                <span className="text-primary-200 text-sm">AP Biology · 4강</span>
              </div>
              <Link
                href="/courses/ap-biology/photosynthesis"
                className="block w-full bg-white text-primary-600 font-bold text-center py-2.5 rounded-xl hover:bg-primary-50 transition-colors text-sm"
              >
                강의 시작하기 →
              </Link>
            </div>

            {/* Weak topics */}
            <div className="card p-6">
              <h2 className="font-bold text-gray-900 dark:text-white mb-4 text-base">
                💡 취약 개념
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                틀린 문제를 분석한 결과예요. 집중 복습이 필요합니다.
              </p>
              <div className="space-y-4">
                {weakTopics.map((topic) => (
                  <div key={topic.topic}>
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="text-sm text-gray-700 dark:text-gray-300 leading-snug">
                        <span className="mr-1.5">{topic.icon}</span>
                        {topic.topic}
                      </div>
                      <span
                        className={`text-xs font-bold flex-shrink-0 ${
                          topic.score >= 70
                            ? "text-emerald-600 dark:text-emerald-400"
                            : topic.score >= 50
                            ? "text-amber-600 dark:text-amber-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {topic.score}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          topic.score >= 70
                            ? "bg-emerald-500"
                            : topic.score >= 50
                            ? "bg-amber-500"
                            : "bg-red-500"
                        }`}
                        style={{ width: `${topic.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Study streak */}
            <div className="card p-6">
              <h2 className="font-bold text-gray-900 dark:text-white mb-4 text-base">
                🔥 학습 스트릭
              </h2>
              <div className="text-center">
                <div className="text-5xl font-black text-primary-500 mb-1">12</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">연속 학습일</div>
                <div className="grid grid-cols-7 gap-1 mt-4">
                  {Array.from({ length: 28 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-5 rounded-sm ${
                        i >= 16
                          ? "bg-primary-500"
                          : i >= 10
                          ? "bg-primary-200 dark:bg-primary-800"
                          : "bg-gray-100 dark:bg-gray-800"
                      }`}
                    />
                  ))}
                </div>
                <div className="text-xs text-gray-400 mt-2">지난 28일</div>
              </div>
            </div>
          </div>
        </div>

        <DashboardExtras />
      </div>
    </div>
  );
}
