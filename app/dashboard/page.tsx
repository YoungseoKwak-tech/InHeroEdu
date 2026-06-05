"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import DashboardExtras from "@/components/dashboard/DashboardExtras";
import ThinkingEvolution from "@/components/ThinkingEvolution";
import HeroCodeSection from "@/components/dashboard/HeroCodeSection";
import CommandCenter from "@/components/dashboard/CommandCenter";
import { useLang } from "@/app/contexts/LanguageContext";
import { t } from "@/lib/translations";
import { authFetch, getClientSession } from "@/lib/client-auth";
import { courses } from "@/lib/data/courses";

/* ── Types mirroring /api/me/study-summary ──────────────────────────── */

interface StudySummary {
  ok: boolean;
  stats: {
    lessonsCompleted: number;
    lessonsStarted: number;
    studyDays: number;
    questionsAnswered: number;
    questionsCorrect: number;
    aiQuestions: number;
  };
  subjects: Array<{
    courseId: string;
    completed: number;
    started: number;
    totalLessons: number | null;
  }>;
  lessonsPerCourse: Record<string, number>;
  recentLessons: Array<{
    lessonId: string;
    courseId: string | null;
    title: string | null;
    lastAt: string;
    secondsSpent: number;
    completed: boolean;
  }>;
  continueLesson: {
    lessonId: string;
    courseId: string | null;
    title: string | null;
  } | null;
  weakTopics: Array<{
    concept: string;
    courseId: string | null;
    correct: number;
    total: number;
    percent: number;
  }>;
  activity: {
    last28: number[];
    streakDays: number;
  };
}

const FIRST_LESSON_FALLBACK = { courseId: "ap-biology", lessonId: "ap-biology-u1-l1" };

const courseById = new Map(courses.map((c) => [c.id, c]));

function courseLabel(courseId: string | null): string {
  if (!courseId) return "";
  return courseById.get(courseId)?.subjectEn ?? courseId;
}

function courseIcon(courseId: string | null): string {
  if (!courseId) return "📘";
  return courseById.get(courseId)?.icon ?? "📘";
}

function prettifyLessonId(lessonId: string): string {
  // ap-biology-u1-l1 → "Unit 1 · Lesson 1"
  const m = lessonId.match(/u(\d+)[-_]l(\d+)/i);
  if (m) return `Unit ${m[1]} · Lesson ${m[2]}`;
  return lessonId.replace(/-/g, " ");
}

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function formatDuration(seconds: number): string {
  if (seconds <= 0) return "";
  const mins = Math.round(seconds / 60);
  if (mins < 1) return "<1 min";
  return `${mins} min`;
}

export default function DashboardPage() {
  const { lang: _lang } = useLang();
  void _lang;
  const lang = "en" as "en" | "ko";
  const tx = t[lang].dashboard;

  const [summary, setSummary] = useState<StudySummary | null>(null);
  const [profileSubjects, setProfileSubjects] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [res, profileRes, session] = await Promise.all([
          authFetch("/api/me/study-summary"),
          authFetch("/api/my-space/profile"),
          getClientSession(),
        ]);
        if (cancelled) return;
        setUserId(session?.user?.id ?? null);
        if (res.ok) {
          const json = (await res.json()) as StudySummary;
          if (!cancelled && json.ok) setSummary(json);
        }
        if (profileRes.ok) {
          const pjson = (await profileRes.json()) as {
            profile: { subjects?: string[] } | null;
          };
          if (!cancelled) setProfileSubjects(pjson.profile?.subjects ?? []);
        }
      } catch {
        // Signed-out or transient failure — render honest zero states.
      } finally {
        if (!cancelled) setLoaded(true);
      }
    }
    void load();
    // The post-login setup modal fires this after the student picks
    // their grade + classes — refresh so the subject rows update live.
    const onProfileUpdated = () => void load();
    window.addEventListener("inhero:study-profile-updated", onProfileUpdated);
    return () => {
      cancelled = true;
      window.removeEventListener("inhero:study-profile-updated", onProfileUpdated);
    };
  }, []);

  const stats = summary?.stats ?? {
    lessonsCompleted: 0,
    lessonsStarted: 0,
    studyDays: 0,
    questionsAnswered: 0,
    questionsCorrect: 0,
    aiQuestions: 0,
  };

  // Progress by subject: subjects with real activity first, then the
  // classes the student picked at login (study profile), padded with
  // published courses (those with a firstLessonId) up to 3 rows.
  const activeSubjects = (summary?.subjects ?? [])
    .slice()
    .sort((a, b) => b.completed - a.completed || b.started - a.started);
  const activeIds = new Set(activeSubjects.map((s) => s.courseId));
  const padded = [...activeSubjects];
  // Match free-text profile subjects ("AP Biology") to catalog courses.
  const subjectNameToId = new Map(
    courses.map((c) => [c.subjectEn.toLowerCase(), c.id])
  );
  for (const name of profileSubjects) {
    const courseId = subjectNameToId.get(name.trim().toLowerCase());
    if (!courseId || activeIds.has(courseId)) continue;
    activeIds.add(courseId);
    padded.push({ courseId, completed: 0, started: 0, totalLessons: null });
  }
  for (const course of courses) {
    if (padded.length >= 3) break;
    if (!course.firstLessonId || activeIds.has(course.id)) continue;
    padded.push({ courseId: course.id, completed: 0, started: 0, totalLessons: null });
  }
  const progressRows = padded.map((s) => {
    const course = courseById.get(s.courseId);
    const total =
      s.totalLessons ??
      summary?.lessonsPerCourse?.[s.courseId] ??
      course?.topicCount ??
      0;
    return {
      courseId: s.courseId,
      subject: course?.subjectEn ?? s.courseId,
      icon: course?.icon ?? "📘",
      completed: s.completed,
      total,
    };
  });

  const recentLessons = summary?.recentLessons ?? [];
  const weakTopics = summary?.weakTopics ?? [];
  const last28 = summary?.activity.last28 ?? Array.from({ length: 28 }, () => 0);
  const streakDays = summary?.activity.streakDays ?? 0;

  const continueLesson = summary?.continueLesson ?? null;
  const upNextHref = continueLesson
    ? `/courses/${continueLesson.courseId ?? FIRST_LESSON_FALLBACK.courseId}/${continueLesson.lessonId}`
    : `/courses/${FIRST_LESSON_FALLBACK.courseId}/${FIRST_LESSON_FALLBACK.lessonId}`;
  const upNextTitle = continueLesson
    ? continueLesson.title ?? prettifyLessonId(continueLesson.lessonId)
    : "Start your first lesson";
  const upNextSubtitle = continueLesson
    ? "Pick up right where you left off."
    : "Every course opens its first lesson — begin with AP Biology.";
  const upNextCourse = continueLesson
    ? courseLabel(continueLesson.courseId)
    : "AP Biology";

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
            <Link href={upNextHref} className="btn-primary text-sm">
              {tx.startToday}
            </Link>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: tx.stats.completed, value: `${stats.lessonsCompleted}${tx.lessonUnit}`, icon: "✅" },
              { label: tx.stats.days, value: `${stats.studyDays} day${stats.studyDays === 1 ? "" : "s"}`, icon: "🔥" },
              { label: tx.stats.correct, value: `${stats.questionsCorrect}/${stats.questionsAnswered}`, icon: "📝" },
              { label: tx.stats.aiQuestions, value: `${stats.aiQuestions}`, icon: "🤖" },
            ].map((stat) => (
              <div key={stat.label} className="card p-5">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-xl font-extrabold text-white">
                  {loaded ? stat.value : "—"}
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
                {progressRows.map((subj) => {
                  const pct = subj.total > 0 ? Math.round((subj.completed / subj.total) * 100) : 0;
                  return (
                    <div key={subj.courseId}>
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
                          className="h-full bg-emerald-500 rounded-full transition-all duration-500"
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
              {recentLessons.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-3xl mb-3">🚀</div>
                  <p className="text-sm mb-4" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    {loaded
                      ? "No lessons yet. Your study history shows up here as soon as you start."
                      : "Loading your study history…"}
                  </p>
                  {loaded && (
                    <Link
                      href={upNextHref}
                      className="inline-block text-sm font-bold text-primary-400 hover:text-primary-300 transition-colors"
                    >
                      Start your first lesson →
                    </Link>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  {recentLessons.map((lesson) => (
                    <Link
                      key={lesson.lessonId}
                      href={`/courses/${lesson.courseId ?? FIRST_LESSON_FALLBACK.courseId}/${lesson.lessonId}`}
                      className="flex items-center gap-4 p-3 rounded-xl transition-colors group hover:bg-white/5"
                    >
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          lesson.completed
                            ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
                            : "bg-white/10 text-white/50"
                        }`}
                      >
                        {lesson.completed ? "✓" : courseIcon(lesson.courseId)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm text-white group-hover:text-primary-400 transition-colors truncate">
                          {lesson.title ?? prettifyLessonId(lesson.lessonId)}
                        </div>
                        <div className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
                          {courseLabel(lesson.courseId)} · {timeAgo(lesson.lastAt)}
                        </div>
                      </div>
                      <div className="text-xs flex-shrink-0" style={{ color: 'rgba(255,255,255,0.4)' }}>
                        {formatDuration(lesson.secondsSpent)}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Next recommended */}
            <div className="card p-6 bg-gradient-to-br from-primary-500 to-primary-600 text-white border-0">
              <div className="text-sm font-semibold text-primary-100 mb-3">
                {tx.nextLesson}
              </div>
              <h3 className="font-extrabold text-lg mb-1">{upNextTitle}</h3>
              <p className="text-primary-100 text-sm mb-5 leading-relaxed">
                {upNextSubtitle}
              </p>
              <div className="flex items-center justify-between mb-5">
                <span className="text-primary-200 text-sm">{upNextCourse}</span>
              </div>
              <Link
                href={upNextHref}
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
              {weakTopics.length === 0 ? (
                <p className="text-sm py-2" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  Nothing to review yet. Answer checkpoint questions in lessons
                  and the topics you miss will surface here.
                </p>
              ) : (
                <div className="space-y-4">
                  {weakTopics.map((topic) => (
                    <div key={topic.concept}>
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <div className="text-sm leading-snug" style={{ color: 'rgba(255,255,255,0.75)' }}>
                          <span className="mr-1.5">{courseIcon(topic.courseId)}</span>
                          {topic.concept}
                        </div>
                        <span
                          className={`text-xs font-bold flex-shrink-0 ${
                            topic.percent >= 70
                              ? "text-emerald-600 dark:text-emerald-400"
                              : topic.percent >= 50
                              ? "text-amber-600 dark:text-amber-400"
                              : "text-red-600 dark:text-red-400"
                          }`}
                        >
                          {topic.percent}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
                        <div
                          className={`h-full rounded-full ${
                            topic.percent >= 70
                              ? "bg-emerald-500"
                              : topic.percent >= 50
                              ? "bg-amber-500"
                              : "bg-red-500"
                          }`}
                          style={{ width: `${topic.percent}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Study streak */}
            <div className="card p-6">
              <h2 className="font-bold text-white mb-4 text-base">
                {tx.streak}
              </h2>
              <div className="text-center">
                <div className="text-5xl font-black text-primary-500 mb-1">{streakDays}</div>
                <div className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>{tx.streakDays}</div>
                <div className="grid grid-cols-7 gap-1 mt-4">
                  {last28.map((active, i) => (
                    <div
                      key={i}
                      className={`h-5 rounded-sm ${active ? "bg-primary-500" : "bg-white/10"}`}
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
        {userId && <ThinkingEvolution userId={userId} />}
      </div>
    </div>
  );
}
