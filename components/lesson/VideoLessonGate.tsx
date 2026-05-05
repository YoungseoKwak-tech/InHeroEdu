"use client";

/**
 * VideoLessonGate
 *
 * Auth-gated wrapper for VideoLessonPlayer. Fetches DB overlays, merges
 * timestamps from the lesson script, then renders the player.
 *
 * Props:
 *   lessonId  — DB lesson ID
 *   videoUrl  — pre-resolved public video URL
 *   script    — raw lesson script text (for timestamp parsing)
 *   title     — lesson title (for breadcrumb / locked screen)
 *   courseId  — for back navigation
 *   courseName
 *   nextLessonId
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { createBrowserClient } from "@/lib/supabase";
import { authFetch } from "@/lib/client-auth";
import { parseScript } from "@/lib/parseScript";
import { overlaysWithTimestamps } from "@/lib/overlays";
import VideoLessonPlayer from "@/components/lesson/VideoLessonPlayer";
import type { OverlayRow } from "@/lib/overlays";

interface Props {
  lessonId: string;
  videoUrl: string;
  script: string;
  title: string;
  courseId: string;
  courseName: string;
  nextLessonId?: string | null;
}

type AuthState = "loading" | "authenticated" | "guest";

export default function VideoLessonGate({
  lessonId, videoUrl, script, title, courseId, courseName, nextLessonId,
}: Props) {
  const [authState, setAuthState] = useState<AuthState>("loading");
  const [completed, setCompleted] = useState(false);
  const [timedOverlays, setTimedOverlays] = useState<(OverlayRow & { triggerAt: number })[]>([]);

  useEffect(() => {
    const supabase = createBrowserClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthState(session ? "authenticated" : "guest");
    });
  }, []);

  // Fetch overlays and merge timestamps when authenticated
  useEffect(() => {
    if (authState !== "authenticated") return;
    authFetch(`/api/overlays?lessonId=${lessonId}`)
      .then((r) => r.json())
      .then((j) => {
        if (!j.ok || !j.data?.length) return;
        const sections = parseScript(script);
        const merged = overlaysWithTimestamps(j.data as OverlayRow[], sections);
        setTimedOverlays(merged);
      })
      .catch(() => {});
  }, [authState, lessonId, script]);

  if (authState === "loading") {
    return (
      <div className="vlg-center">
        <div className="vlg-spinner" />
        <style>{spinnerCss}</style>
      </div>
    );
  }

  if (authState === "guest") {
    return (
      <div className="vlg-center">
        <div className="vlg-locked-card">
          <div className="vlg-lock-icon">🔒</div>
          <h2 className="vlg-locked-title">Preview Locked</h2>
          <p className="vlg-locked-body">
            Sign in to watch <strong>{title}</strong>.
          </p>
          <div className="vlg-locked-actions">
            <Link href="/auth/login" className="vlg-btn-primary">Sign In to Watch</Link>
            <Link href={`/courses/${courseId}`} className="vlg-btn-ghost">← Back to {courseName}</Link>
          </div>
        </div>
        <style>{lockedCss}</style>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="vlg-center">
        <div className="vlg-locked-card">
          <div className="vlg-lock-icon">🎓</div>
          <h2 className="vlg-locked-title">Lesson complete!</h2>
          <p className="vlg-locked-body">Your responses have been saved.</p>
          <div className="vlg-locked-actions">
            {nextLessonId ? (
              <Link href={`/courses/${courseId}/${nextLessonId}`} className="vlg-btn-primary">Next Lesson →</Link>
            ) : (
              <Link href={`/courses/${courseId}`} className="vlg-btn-primary">Back to Course →</Link>
            )}
            <button
              onClick={() => setCompleted(false)}
              className="vlg-btn-ghost"
              style={{ cursor: "pointer", background: "none", width: "100%" }}
            >
              ↺ Replay
            </button>
          </div>
        </div>
        <style>{lockedCss}</style>
      </div>
    );
  }

  return (
    <>
      <div className="vlg-breadcrumb">
        <div className="vlg-breadcrumb-inner">
          <Link href={`/courses/${courseId}`} className="vlg-back-link">← {courseName}</Link>
          <span className="vlg-sep">/</span>
          <span className="vlg-current">{title}</span>
        </div>
      </div>
      <VideoLessonPlayer
        lessonId={lessonId}
        videoUrl={videoUrl}
        overlays={timedOverlays}
        onComplete={() => setCompleted(true)}
      />
      <style>{`
        .vlg-breadcrumb {
          background: #0d0d0d;
          border-bottom: 1px solid #1a1a1a;
          padding: 0.55rem 1rem;
        }
        .vlg-breadcrumb-inner {
          max-width: 52rem;
          margin: 0 auto;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
        }
        .vlg-back-link { color: #555; text-decoration: none; transition: color 0.15s; }
        .vlg-back-link:hover { color: #00FFB2; }
        .vlg-sep { color: #333; }
        .vlg-current {
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

const spinnerCss = `
  .vlg-center {
    background: #0a0a0a;
    min-height: calc(100vh - 4rem);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3rem 1rem;
    font-family: 'Inter', system-ui, sans-serif;
  }
  .vlg-spinner {
    width: 2rem; height: 2rem;
    border-radius: 50%;
    border: 2px solid #222;
    border-top-color: #00FFB2;
    animation: vlg-spin 0.75s linear infinite;
  }
  @keyframes vlg-spin { to { transform: rotate(360deg); } }
`;

const lockedCss = `
  .vlg-center {
    background: #0a0a0a;
    min-height: calc(100vh - 4rem);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3rem 1rem;
    font-family: 'Inter', system-ui, sans-serif;
  }
  .vlg-locked-card {
    max-width: 22rem; width: 100%;
    background: #111;
    border: 1px solid #1f1f1f;
    border-radius: 1.25rem;
    padding: 2.5rem 2rem;
    text-align: center;
    display: flex; flex-direction: column; align-items: center; gap: 0;
  }
  .vlg-lock-icon { font-size: 2.5rem; margin-bottom: 1rem; }
  .vlg-locked-title { font-size: 1.25rem; font-weight: 800; color: #fff; margin-bottom: 0.6rem; }
  .vlg-locked-body { font-size: 0.85rem; color: #666; line-height: 1.6; margin-bottom: 1.75rem; }
  .vlg-locked-body strong { color: #aaa; }
  .vlg-locked-actions { display: flex; flex-direction: column; gap: 0.6rem; width: 100%; }
  .vlg-btn-primary {
    display: block; padding: 0.75rem 1rem; border-radius: 0.75rem;
    background: #00FFB2; color: #0a0a0a; font-size: 0.85rem; font-weight: 700;
    text-align: center; text-decoration: none; transition: filter 0.15s;
  }
  .vlg-btn-primary:hover { filter: brightness(1.1); }
  .vlg-btn-ghost {
    display: block; padding: 0.7rem 1rem; border-radius: 0.75rem;
    border: 1px solid #222; color: #666; font-size: 0.82rem; font-weight: 500;
    text-align: center; text-decoration: none; transition: border-color 0.15s, color 0.15s;
  }
  .vlg-btn-ghost:hover { border-color: #333; color: #aaa; }
`;
