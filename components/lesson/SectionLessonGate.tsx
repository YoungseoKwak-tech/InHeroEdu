"use client";

/**
 * SectionLessonGate — auth wrapper for SectionLessonPlayer.
 * Receives the pre-built playlist from the server page component.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { createBrowserClient } from "@/lib/supabase";
import type { PlaylistItem } from "@/lib/buildPlaylist";

const SectionLessonPlayer = dynamic(
  () => import("@/components/lesson/SectionLessonPlayer"),
  { ssr: false }
);

interface Props {
  playlist: PlaylistItem[];
  lessonId: string;
  title: string;
  courseId: string;
  courseName: string;
  nextLessonId?: string | null;
}

type AuthState = "loading" | "authenticated" | "guest";

export default function SectionLessonGate({
  playlist, lessonId, title, courseId, courseName, nextLessonId,
}: Props) {
  const [authState, setAuthState] = useState<AuthState>("loading");
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const supabase = createBrowserClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthState(session ? "authenticated" : "guest");
    });
  }, []);

  if (authState === "loading") {
    return (
      <div className="slg-center">
        <div className="slg-spinner" />
        <style>{sharedCss}</style>
      </div>
    );
  }

  if (authState === "guest") {
    return (
      <div className="slg-center">
        <div className="slg-card">
          <div className="slg-icon">🔒</div>
          <h2 className="slg-title">Preview Locked</h2>
          <p className="slg-body">Sign in to watch <strong>{title}</strong>.</p>
          <div className="slg-actions">
            <Link href="/auth/login" className="slg-btn-primary">Sign In to Watch</Link>
            <Link href={`/courses/${courseId}`} className="slg-btn-ghost">← Back to {courseName}</Link>
          </div>
        </div>
        <style>{sharedCss}</style>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="slg-center">
        <div className="slg-card">
          <div className="slg-icon">🎓</div>
          <h2 className="slg-title" style={{ color: "#C9A84C" }}>Lesson Complete</h2>
          <p className="slg-body">Your responses have been saved.</p>
          <div className="slg-actions">
            {nextLessonId ? (
              <Link href={`/courses/${courseId}/${nextLessonId}`} className="slg-btn-primary">Next Lesson →</Link>
            ) : (
              <Link href={`/courses/${courseId}`} className="slg-btn-primary">Back to Course →</Link>
            )}
            <button
              className="slg-btn-ghost"
              style={{ cursor: "pointer", background: "none", width: "100%" }}
              onClick={() => setCompleted(false)}
            >
              ↺ Replay
            </button>
          </div>
        </div>
        <style>{sharedCss}</style>
      </div>
    );
  }

  return (
    <>
      <div className="slg-breadcrumb">
        <div className="slg-breadcrumb-inner">
          <Link href={`/courses/${courseId}`} className="slg-back">← {courseName}</Link>
          <span className="slg-sep">/</span>
          <span className="slg-current">{title}</span>
        </div>
      </div>
      <SectionLessonPlayer
        playlist={playlist}
        lessonId={lessonId}
        onComplete={() => setCompleted(true)}
      />
      <style>{`
        .slg-breadcrumb {
          background: #0d0d0d;
          border-bottom: 1px solid #1a1a1a;
          padding: 0.55rem 1rem;
        }
        .slg-breadcrumb-inner {
          max-width: 52rem; margin: 0 auto;
          display: flex; align-items: center; gap: 0.5rem;
          font-size: 0.75rem; font-family: 'Inter', system-ui, sans-serif;
        }
        .slg-back { color: #555; text-decoration: none; transition: color 0.15s; }
        .slg-back:hover { color: #00FFB2; }
        .slg-sep { color: #333; }
        .slg-current { color: #888; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 20rem; }
      `}</style>
    </>
  );
}

const sharedCss = `
  .slg-center {
    background: #0a0a0a;
    min-height: calc(100vh - 4rem);
    display: flex; align-items: center; justify-content: center;
    padding: 3rem 1rem;
    font-family: 'Inter', system-ui, sans-serif;
  }
  .slg-spinner {
    width: 2rem; height: 2rem; border-radius: 50%;
    border: 2px solid #222; border-top-color: #00FFB2;
    animation: slg-spin 0.75s linear infinite;
  }
  @keyframes slg-spin { to { transform: rotate(360deg); } }
  .slg-card {
    max-width: 22rem; width: 100%;
    background: #111; border: 1px solid #1f1f1f;
    border-radius: 1.25rem; padding: 2.5rem 2rem;
    text-align: center;
    display: flex; flex-direction: column; align-items: center;
  }
  .slg-icon  { font-size: 2.5rem; margin-bottom: 1rem; }
  .slg-title { font-size: 1.25rem; font-weight: 800; color: #fff; margin-bottom: 0.6rem; }
  .slg-body  { font-size: 0.85rem; color: #666; line-height: 1.6; margin-bottom: 1.75rem; }
  .slg-body strong { color: #aaa; }
  .slg-actions { display: flex; flex-direction: column; gap: 0.6rem; width: 100%; }
  .slg-btn-primary {
    display: block; padding: 0.75rem 1rem; border-radius: 0.75rem;
    background: #00FFB2; color: #0a0a0a; font-size: 0.85rem; font-weight: 700;
    text-align: center; text-decoration: none; transition: filter 0.15s; border: none;
  }
  .slg-btn-primary:hover { filter: brightness(1.1); }
  .slg-btn-ghost {
    display: block; padding: 0.7rem 1rem; border-radius: 0.75rem;
    border: 1px solid #222; color: #666; font-size: 0.82rem; font-weight: 500;
    text-align: center; text-decoration: none; transition: border-color 0.15s, color 0.15s;
  }
  .slg-btn-ghost:hover { border-color: #333; color: #aaa; }
`;
