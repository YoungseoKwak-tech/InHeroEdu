"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import LessonPlayer from "@/components/lesson/LessonPlayer";
import OverlayPlayer from "@/components/lesson/OverlayPlayer";
import { createBrowserClient } from "@/lib/supabase";
import { authFetch } from "@/lib/client-auth";
import type { LessonPlayerData } from "@/lib/lesson-player-types";
import type { OverlayRow } from "@/lib/overlays";

interface Props {
  playerData: LessonPlayerData;
  courseId: string;
  courseName: string;
  nextLessonId?: string | null;
}

type AuthState = "loading" | "authenticated" | "guest";

export default function LessonPlayerGate({
  playerData,
  courseId,
  courseName,
  nextLessonId,
}: Props) {
  const [authState, setAuthState] = useState<AuthState>("loading");
  const [completed, setCompleted] = useState(false);

  // ── DB overlays ────────────────────────────────────────────────────────────
  const [dbOverlays, setDbOverlays] = useState<OverlayRow[]>([]);
  const [activeOverlays, setActiveOverlays] = useState<OverlayRow[] | null>(null);
  const pendingAdvanceFn = useRef<(() => void) | null>(null);

  useEffect(() => {
    const supabase = createBrowserClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthState(session ? "authenticated" : "guest");
    });
  }, []);

  // Fetch DB overlays for this lesson (best-effort, non-blocking)
  useEffect(() => {
    authFetch(`/api/overlays?lessonId=${playerData.id}`)
      .then((r) => r.json())
      .then((j) => { if (j.ok) setDbOverlays(j.data ?? []); })
      .catch(() => {});
  }, [playerData.id]);

  const handleVideoPartEnd = useCallback(
    (sectionIdx: number, advance: () => void) => {
      const matching = dbOverlays.filter((o) => o.position === sectionIdx);
      if (matching.length > 0) {
        pendingAdvanceFn.current = advance;
        setActiveOverlays(matching);
      } else {
        advance();
      }
    },
    [dbOverlays]
  );

  function handleDbOverlayComplete() {
    setActiveOverlays(null);
    const fn = pendingAdvanceFn.current;
    pendingAdvanceFn.current = null;
    fn?.();
  }

  // ── Loading ──────────────────────────────────────────────────────────────
  if (authState === "loading") {
    return (
      <div className="lpg-root lpg-center">
        <div className="lpg-spinner" />
      </div>
    );
  }

  // ── Guest: preview locked ────────────────────────────────────────────────
  if (authState === "guest") {
    return (
      <div className="lpg-root lpg-center">
        <div className="lpg-locked-card">
          <div className="lpg-lock-icon">🔒</div>
          <h2 className="lpg-locked-title">Preview Locked</h2>
          <p className="lpg-locked-body">
            Sign in to access the full interactive lesson for{" "}
            <strong>{playerData.title}</strong>.
          </p>
          <div className="lpg-locked-actions">
            <Link href="/auth/login?redirect=/courses/ap-biology/cell-structure" className="lpg-btn-primary">
              Sign In to Watch
            </Link>
            <Link href={`/courses/${courseId}`} className="lpg-btn-ghost">
              ← Back to {courseName}
            </Link>
          </div>
        </div>

        <style>{`
          .lpg-root {
            background: #0a0a0a;
            min-height: calc(100vh - 4rem);
            font-family: 'Inter', system-ui, sans-serif;
          }
          .lpg-center {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 3rem 1rem;
          }
          .lpg-spinner {
            width: 2rem;
            height: 2rem;
            border-radius: 50%;
            border: 2px solid #222;
            border-top-color: #00FFB2;
            animation: lpg-spin 0.75s linear infinite;
          }
          @keyframes lpg-spin { to { transform: rotate(360deg); } }
          .lpg-locked-card {
            max-width: 22rem;
            width: 100%;
            background: #111;
            border: 1px solid #1f1f1f;
            border-radius: 1.25rem;
            padding: 2.5rem 2rem;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0;
          }
          .lpg-lock-icon  { font-size: 2.5rem; margin-bottom: 1rem; }
          .lpg-locked-title {
            font-size: 1.25rem;
            font-weight: 800;
            color: #fff;
            margin-bottom: 0.6rem;
          }
          .lpg-locked-body {
            font-size: 0.85rem;
            color: #666;
            line-height: 1.6;
            margin-bottom: 1.75rem;
          }
          .lpg-locked-body strong { color: #aaa; }
          .lpg-locked-actions { display: flex; flex-direction: column; gap: 0.6rem; width: 100%; }
          .lpg-btn-primary {
            display: block;
            padding: 0.75rem 1rem;
            border-radius: 0.75rem;
            background: #00FFB2;
            color: #0a0a0a;
            font-size: 0.85rem;
            font-weight: 700;
            text-align: center;
            text-decoration: none;
            transition: filter 0.15s;
          }
          .lpg-btn-primary:hover { filter: brightness(1.1); }
          .lpg-btn-ghost {
            display: block;
            padding: 0.7rem 1rem;
            border-radius: 0.75rem;
            border: 1px solid #222;
            color: #666;
            font-size: 0.82rem;
            font-weight: 500;
            text-align: center;
            text-decoration: none;
            transition: border-color 0.15s, color 0.15s;
          }
          .lpg-btn-ghost:hover { border-color: #333; color: #aaa; }
        `}</style>
      </div>
    );
  }

  // ── Authenticated: lesson complete state ─────────────────────────────────
  if (completed) {
    return (
      <div className="lpg-root lpg-center">
        <div className="lpg-locked-card" style={{ gap: 0 }}>
          <div className="lpg-lock-icon">🎓</div>
          <h2 className="lpg-locked-title">You finished the lesson!</h2>
          <p className="lpg-locked-body">
            Your responses have been saved to your learning profile.
          </p>
          <div className="lpg-locked-actions">
            {nextLessonId ? (
              <Link
                href={`/courses/${courseId}/${nextLessonId}`}
                className="lpg-btn-primary"
              >
                Next Lesson →
              </Link>
            ) : (
              <Link href={`/courses/${courseId}`} className="lpg-btn-primary">
                Back to Course →
              </Link>
            )}
            <button
              onClick={() => setCompleted(false)}
              className="lpg-btn-ghost"
              style={{ cursor: "pointer", background: "none", width: "100%" }}
            >
              ↺ Replay Lesson
            </button>
          </div>
        </div>

        <style>{`
          .lpg-root {
            background: #0a0a0a;
            min-height: calc(100vh - 4rem);
            font-family: 'Inter', system-ui, sans-serif;
          }
          .lpg-center {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 3rem 1rem;
          }
          .lpg-locked-card {
            max-width: 22rem;
            width: 100%;
            background: #111;
            border: 1px solid #1f1f1f;
            border-radius: 1.25rem;
            padding: 2.5rem 2rem;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .lpg-lock-icon  { font-size: 2.5rem; margin-bottom: 1rem; }
          .lpg-locked-title { font-size: 1.25rem; font-weight: 800; color: #fff; margin-bottom: 0.6rem; }
          .lpg-locked-body { font-size: 0.85rem; color: #666; line-height: 1.6; margin-bottom: 1.75rem; }
          .lpg-locked-actions { display: flex; flex-direction: column; gap: 0.6rem; width: 100%; }
          .lpg-btn-primary {
            display: block; padding: 0.75rem 1rem; border-radius: 0.75rem;
            background: #00FFB2; color: #0a0a0a; font-size: 0.85rem; font-weight: 700;
            text-align: center; text-decoration: none; transition: filter 0.15s;
          }
          .lpg-btn-primary:hover { filter: brightness(1.1); }
          .lpg-btn-ghost {
            display: block; padding: 0.7rem 1rem; border-radius: 0.75rem;
            border: 1px solid #222; color: #666; font-size: 0.82rem; font-weight: 500;
            text-align: center; text-decoration: none; transition: border-color 0.15s, color 0.15s;
          }
          .lpg-btn-ghost:hover { border-color: #333; color: #aaa; }
          @keyframes lpg-spin { to { transform: rotate(360deg); } }
          .lpg-spinner {
            width: 2rem; height: 2rem; border-radius: 50%;
            border: 2px solid #222; border-top-color: #00FFB2;
            animation: lpg-spin 0.75s linear infinite;
          }
        `}</style>
      </div>
    );
  }

  // ── Authenticated: full lesson player ────────────────────────────────────
  return (
    <>
      {/* Thin breadcrumb strip above the player */}
      <div className="lpg-breadcrumb">
        <div className="lpg-breadcrumb-inner">
          <Link href={`/courses/${courseId}`} className="lpg-back-link">
            ← {courseName}
          </Link>
          <span className="lpg-breadcrumb-sep">/</span>
          <span className="lpg-breadcrumb-current">{playerData.title}</span>
        </div>
      </div>

      <LessonPlayer
        lesson={playerData}
        onComplete={() => setCompleted(true)}
        onVideoPartEnd={dbOverlays.length > 0 ? handleVideoPartEnd : undefined}
      />

      {/* DB overlay layer — slides in on top when a checkpoint fires */}
      {activeOverlays && (
        <OverlayPlayer
          overlays={activeOverlays}
          lessonId={playerData.id}
          onComplete={handleDbOverlayComplete}
        />
      )}

      <style>{`
        .lpg-breadcrumb {
          background: #0d0d0d;
          border-bottom: 1px solid #1a1a1a;
          padding: 0.55rem 1rem;
        }
        .lpg-breadcrumb-inner {
          max-width: 52rem;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
        }
        .lpg-back-link {
          color: #555;
          text-decoration: none;
          transition: color 0.15s;
        }
        .lpg-back-link:hover { color: #00FFB2; }
        .lpg-breadcrumb-sep { color: #333; }
        .lpg-breadcrumb-current {
          color: #888;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 20rem;
        }
      `}</style>
    </>
  );
}
