"use client";

/**
 * UnitsLessonsWithProgress
 *
 * Client wrapper for the AP/Honors course Units block. Renders unit
 * headers + lesson rows identical to the server-side markup, then fetches
 * /api/lesson-progress/summary once on mount and overlays a per-lesson
 * progress badge:
 *
 *   - completed (every overlay answered)  → mint "✓ Completed"
 *   - in progress                         → mint "N%"
 *   - not started + has clip              → "Watch"  (current default)
 *   - not started + no clip               → "Coming Soon"
 *
 * Signed-out users get the not-started fallback for every row; the API
 * returns an empty summary in that case.
 */
import Link from "next/link";
import { useEffect, useState } from "react";
import { authFetch } from "@/lib/client-auth";

export interface UnitInput {
  number: number;
  slug: string;
  title: string;
  examWeight: string;
}

export interface LessonInput {
  id: string;
  title: string;
  unit_number: number;
  lesson_number: number;
}

interface Props {
  courseId: string;
  units: UnitInput[];
  lessons: LessonInput[];
  lessonsWithClips: string[];
  /** Lessons with real interactive content but no video yet → "Start". */
  lessonsWithContent?: string[];
}

interface ProgressEntry {
  interacted: number;
  total: number;
  percent: number;
  complete: boolean;
}

export default function UnitsLessonsWithProgress({
  courseId,
  units,
  lessons,
  lessonsWithClips,
  lessonsWithContent = [],
}: Props) {
  const [progress, setProgress] = useState<Record<string, ProgressEntry>>({});

  useEffect(() => {
    if (lessons.length === 0) return;
    let cancelled = false;
    const ids = lessons.map((l) => l.id).join(",");
    authFetch(`/api/lesson-progress/summary?lessonIds=${encodeURIComponent(ids)}`)
      .then((r) => r.json())
      .then((j) => {
        if (cancelled) return;
        if (j?.ok && j?.summary) setProgress(j.summary);
      })
      .catch(() => { /* signed out / offline — keep empty map */ });
    return () => { cancelled = true; };
  }, [lessons]);

  const clipsSet = new Set(lessonsWithClips);
  const contentSet = new Set(lessonsWithContent);

  return (
    <div className="space-y-6">
      {units.map((unit) => {
        const unitLessons = lessons.filter((l) => l.unit_number === unit.number);
        return (
          <div key={unit.slug}>
            {/* Unit header */}
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
                  const hasClip = clipsSet.has(lesson.id);
                  const hasContent = contentSet.has(lesson.id);
                  const p = progress[lesson.id];
                  return (
                    <Link
                      key={lesson.id}
                      href={`/courses/${courseId}/${lesson.id}`}
                      className="flex items-center gap-4 card p-4 hover:shadow-md hover:border-primary-200 dark:hover:border-primary-700 transition-all duration-200 group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-semibold text-xs flex items-center justify-center flex-shrink-0 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                        {unit.number}.{lesson.lesson_number}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors text-sm">
                          {lesson.title}
                        </div>
                        {p && p.percent > 0 && !p.complete && (
                          <div className="mt-2 h-1 w-full max-w-[180px] rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
                            <div
                              className="h-full bg-emerald-500"
                              style={{ width: `${p.percent}%` }}
                            />
                          </div>
                        )}
                      </div>
                      <ProgressBadge
                        hasClip={hasClip}
                        hasContent={hasContent}
                        progress={p}
                      />
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
  );
}

function ProgressBadge({
  hasClip,
  hasContent,
  progress,
}: {
  hasClip: boolean;
  hasContent: boolean;
  progress: ProgressEntry | undefined;
}) {
  if (progress?.complete) {
    return (
      <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-900/20 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 flex-shrink-0">
        ✓ Completed
      </span>
    );
  }
  if (progress && progress.percent > 0) {
    return (
      <span className="hidden sm:inline-flex rounded-full bg-emerald-50 dark:bg-emerald-900/20 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300 flex-shrink-0">
        {progress.percent}%
      </span>
    );
  }
  if (hasClip) {
    return (
      <span className="hidden sm:inline-flex rounded-full bg-primary-50 dark:bg-primary-900/20 px-2.5 py-1 text-[11px] font-semibold text-primary-600 dark:text-primary-400 flex-shrink-0">
        Watch
      </span>
    );
  }
  // Real interactive content exists (overlays) even without a cut video —
  // genuinely playable, so invite the student in rather than gating.
  if (hasContent) {
    return (
      <span className="hidden sm:inline-flex rounded-full bg-primary-50 dark:bg-primary-900/20 px-2.5 py-1 text-[11px] font-semibold text-primary-600 dark:text-primary-400 flex-shrink-0">
        Start →
      </span>
    );
  }
  // No content yet — honest roadmap framing instead of dead "Coming Soon".
  return (
    <span className="hidden sm:inline-flex rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-700 dark:bg-amber-900/20 dark:text-amber-400 flex-shrink-0">
      On the roadmap
    </span>
  );
}
