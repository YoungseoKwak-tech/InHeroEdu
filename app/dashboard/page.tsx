"use client";

import Link from "next/link";
import DashboardExtras from "@/components/dashboard/DashboardExtras";
import ThinkingEvolution from "@/components/ThinkingEvolution";
import HeroCodeSection from "@/components/dashboard/HeroCodeSection";
import CommandCenter from "@/components/dashboard/CommandCenter";
import { useLang } from "@/app/contexts/LanguageContext";
import { t } from "@/lib/translations";

const progressData = [
  {
    subject: "AP Biology",
    icon: "🧬",
    completed: 3,
    total: 47,
    color: "bg-emerald-500",
    lightColor: "bg-emerald-100 dark:bg-emerald-900/20",
    id: "ap-biology",
  },
  {
    subject: "AP Chemistry",
    icon: "⚗️",
    completed: 0,
    total: 52,
    color: "bg-blue-500",
    lightColor: "bg-blue-100 dark:bg-blue-900/20",
    id: "ap-chemistry",
  },
  {
    subject: "AP Calculus BC",
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
    title: "DNA Replication",
    subject: "AP Biology",
    time: "2 hours ago",
    duration: "20:45",
    lessonId: "dna-replication",
    courseId: "ap-biology",
    completed: true,
  },
  {
    title: "Mitochondria and Cellular Respiration",
    subject: "AP Biology",
    time: "Yesterday",
    duration: "22:10",
    lessonId: "mitochondria",
    courseId: "ap-biology",
    completed: true,
  },
  {
    title: "Cell Structure and Function",
    subject: "AP Biology",
    time: "3 days ago",
    duration: "18:24",
    lessonId: "cell-structure",
    courseId: "ap-biology",
    completed: true,
  },
];

const weakTopics = [
  { topic: "DNA Replication — Okazaki Fragments", subject: "AP Biology", score: 33, icon: "🧬" },
  { topic: "Photosynthesis — Calvin Cycle", subject: "AP Biology", score: 50, icon: "🌿" },
  { topic: "Cellular Respiration — Electron Transport Chain", subject: "AP Biology", score: 67, icon: "⚡" },
];

export default function DashboardPage() {
  const { lang } = useLang();
  const tx = t[lang].dashboard;

  const totalCompleted = progressData.reduce((sum, s) => sum + s.completed, 0);

  return (
    <div className="min-h-screen" style={{ background: '#000000' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Welcome */}
        <div className="mb-10">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white">
                {tx.welcome}
              </h1>
              <p className="mt-1" style={{ color: 'rgba(255,255,255,0.55)' }}>
                {tx.subtitle}
              </p>
            </div>
            <Link href="/courses/ap-biology/photosynthesis" className="btn-primary text-sm">
              {tx.startToday}
            </Link>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: tx.stats.completed, value: `${totalCompleted}${tx.lessonUnit}`, icon: "✅" },
              { label: tx.stats.days, value: "12 days", icon: "🔥" },
              { label: tx.stats.correct, value: "24/36", icon: "📝" },
              { label: tx.stats.aiQuestions, value: "47 sessions", icon: "🤖" },
            ].map((stat) => (
              <div key={stat.label} className="card p-5">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-xl font-extrabold text-white">
                  {stat.value}
                </div>
                <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>
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
              <h2 className="font-bold text-white mb-5 text-lg">
                {tx.progress}
              </h2>
              <div className="space-y-5">
                {progressData.map((subj) => {
                  const pct = Math.round((subj.completed / subj.total) * 100);
                  return (
                    <div key={subj.subject}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{subj.icon}</span>
                          <span className="font-semibold text-sm text-white">
                            {subj.subject}
                          </span>
                        </div>
                        <span className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                          {subj.completed}/{subj.total} {tx.lessons} · {pct}%
                        </span>
                      </div>
                      <div className="w-full h-2.5 rounded-full overflow-hidden" style={{ background: 'rgba(29,158,117,0.15)' }}>
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
              <h2 className="font-bold text-white mb-5 text-lg">
                {tx.recentLessons}
              </h2>
              <div className="space-y-3">
                {recentLessons.map((lesson) => (
                  <Link
                    key={lesson.lessonId}
                    href={`/courses/${lesson.courseId}/${lesson.lessonId}`}
                    className="flex items-center gap-4 p-3 rounded-xl transition-colors group hover:bg-white/5"
                  >
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 flex-shrink-0">
                      ✓
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm text-white group-hover:text-primary-400 transition-colors truncate">
                        {lesson.title}
                      </div>
                      <div className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                        {lesson.subject} · {lesson.time}
                      </div>
                    </div>
                    <div className="text-xs flex-shrink-0" style={{ color: 'rgba(255,255,255,0.4)' }}>
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
                {tx.nextLesson}
              </div>
              <h3 className="font-extrabold text-lg mb-1">Photosynthesis: Light and Dark Reactions</h3>
              <p className="text-primary-100 text-sm mb-5 leading-relaxed">
                Light reactions and the Calvin cycle, one of the most repeated AP Bio targets
              </p>
              <div className="flex items-center justify-between mb-5">
                <span className="text-primary-200 text-sm">⏱ 24 min 30 sec</span>
                <span className="text-primary-200 text-sm">AP Biology · Lesson 4</span>
              </div>
              <Link
                href="/courses/ap-biology/photosynthesis"
                className="block w-full bg-white text-primary-600 font-bold text-center py-2.5 rounded-xl hover:bg-primary-50 transition-colors text-sm"
              >
                {tx.startLesson}
              </Link>
            </div>

            {/* Weak topics */}
            <div className="card p-6">
              <h2 className="font-bold text-white mb-4 text-base">
                {tx.weakTopics}
              </h2>
              <p className="text-xs mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>
                {tx.weakSubtitle}
              </p>
              <div className="space-y-4">
                {weakTopics.map((topic) => (
                  <div key={topic.topic}>
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="text-sm leading-snug" style={{ color: 'rgba(255,255,255,0.75)' }}>
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
                    <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
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
              <h2 className="font-bold text-white mb-4 text-base">
                {tx.streak}
              </h2>
              <div className="text-center">
                <div className="text-5xl font-black text-primary-500 mb-1">12</div>
                <div className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>{tx.streakDays}</div>
                <div className="grid grid-cols-7 gap-1 mt-4">
                  {Array.from({ length: 28 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-5 rounded-sm ${
                        i >= 16
                          ? "bg-primary-500"
                          : i >= 10
                          ? "bg-primary-800"
                          : "bg-white/10"
                      }`}
                    />
                  ))}
                </div>
                <div className="text-xs mt-2" style={{ color: 'rgba(255,255,255,0.4)' }}>{tx.last28}</div>
              </div>
            </div>
          </div>
        </div>

        <CommandCenter />
        <HeroCodeSection />
        <DashboardExtras />
        <ThinkingEvolution userId="demo-user" />
      </div>
    </div>
  );
}
