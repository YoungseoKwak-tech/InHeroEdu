"use client";

/**
 * ResumeCard — single primary CTA at the top of /my-plan.
 *
 * Reads /api/streak + /api/me/recent-lesson and renders one of:
 *   - "Continue → [Lesson Title]"  (recent lesson exists)
 *   - "Pick a class →"             (no lesson_progress rows yet)
 *
 * Streak handoff: if current_streak ≥ 1, surfaces the live 🔥 N · Tier
 * label so the student feels their momentum carried over from the last
 * session. Same data source as the navbar pill — server is source of
 * truth, no double-counting.
 */

import Link from "next/link";
import { useEffect, useState } from "react";
import { authFetch } from "@/lib/client-auth";
import { getTier, type StreakTier } from "@/lib/streakTiers";

interface RecentLesson {
  lesson_id: string;
  title: string | null;
  course_id: string | null;
}

interface StreakState {
  current_streak: number;
  current_tier: StreakTier;
}

export default function ResumeCard() {
  const [recent, setRecent] = useState<RecentLesson | null>(null);
  const [streak, setStreak] = useState<StreakState | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      authFetch("/api/me/recent-lesson").then((r) => r.json()).catch(() => null),
      authFetch("/api/streak").then((r) => r.json()).catch(() => null),
    ]).then(([lessonRes, streakRes]) => {
      if (cancelled) return;
      if (lessonRes?.ok && lessonRes?.data) setRecent(lessonRes.data as RecentLesson);
      if (streakRes?.ok && streakRes?.data) setStreak(streakRes.data as StreakState);
      setLoaded(true);
    });
    return () => { cancelled = true; };
  }, []);

  if (!loaded) {
    // Reserve vertical space so the layout doesn't jump when the card fades in.
    return <div aria-hidden style={{ height: 96 }} />;
  }

  const hasStreak = streak !== null && streak.current_streak > 0;
  const tier = hasStreak ? getTier(streak.current_streak) : null;

  const href = recent
    ? `/courses/${recent.course_id ?? ""}/${recent.lesson_id}`
    : `/courses`;
  const buttonLabel = recent
    ? `Continue → ${recent.title ?? recent.lesson_id}`
    : `Pick a class →`;
  const eyebrow = recent
    ? "Resume where you left off"
    : "Start your first class";

  return (
    <section className="rc-card">
      <div className="rc-row">
        <div className="rc-info">
          <p className="rc-eyebrow">{eyebrow}</p>
          {hasStreak && tier && (
            <div className="rc-streak">
              <span className="rc-streak-num">🔥 {streak!.current_streak}</span>
              <span className="rc-streak-tier">· {tier.label}</span>
              <span className="rc-streak-tag">carried over</span>
            </div>
          )}
        </div>
        <Link href={href} className="rc-cta">
          {buttonLabel}
        </Link>
      </div>

      <style>{`
        .rc-card {
          background: linear-gradient(135deg, rgba(0,255,178,0.06) 0%, rgba(0,255,178,0.02) 100%);
          border: 1px solid rgba(0,255,178,0.28);
          border-radius: 18px;
          padding: 20px 22px;
          margin-bottom: 28px;
          box-shadow: 0 0 32px rgba(0,255,178,0.10);
          animation: rc-fade 0.4s ease both;
        }
        .rc-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          flex-wrap: wrap;
        }
        .rc-info {
          display: flex;
          flex-direction: column;
          gap: 6px;
          min-width: 0;
        }
        .rc-eyebrow {
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(0,255,178,0.78);
          margin: 0;
        }
        .rc-streak {
          display: inline-flex;
          align-items: baseline;
          gap: 6px;
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 13px;
          font-weight: 800;
          color: #FFD073;
          margin-top: 2px;
        }
        .rc-streak-tier {
          font-style: italic;
          font-weight: 500;
          opacity: 0.85;
          font-size: 12px;
        }
        .rc-streak-tag {
          font-size: 9px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255, 215, 115, 0.55);
          margin-left: 6px;
          font-weight: 600;
        }
        .rc-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 22px;
          border-radius: 12px;
          background: #00FFB2;
          color: #001;
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          text-decoration: none;
          box-shadow: 0 0 28px rgba(0,255,178,0.35);
          transition: filter 0.15s, transform 0.15s;
          white-space: nowrap;
          max-width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .rc-cta:hover { filter: brightness(1.1); transform: translateY(-1px); }
        @keyframes rc-fade {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 640px) {
          .rc-row { flex-direction: column; align-items: stretch; }
          .rc-cta { justify-content: center; }
        }
      `}</style>
    </section>
  );
}
