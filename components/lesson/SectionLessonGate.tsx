"use client";

/**
 * SectionLessonGate — auth wrapper for SectionLessonPlayer.
 * Receives the pre-built playlist from the server page component.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { authFetch } from "@/lib/client-auth";
import { createBrowserClient } from "@/lib/supabase";
import type { PlaylistItem } from "@/lib/buildPlaylist";
import LessonWorkspaceShell from "@/components/lesson/LessonWorkspaceShell";

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
  courseHref?: string;
  redirectHref?: string;
  nextLessonHref?: string | null;
  nextLessonId?: string | null;
  lessonScript?: string;
  lessonLang?: "en" | "ko";
  isFreePreviewLesson?: boolean;
}

type AuthState = "loading" | "authenticated" | "guest";
type AccessState = "loading" | "granted" | "denied";

export default function SectionLessonGate({
  playlist,
  lessonId,
  title,
  courseId,
  courseName,
  courseHref,
  redirectHref,
  nextLessonHref,
  nextLessonId,
  lessonScript,
  lessonLang,
  isFreePreviewLesson,
}: Props) {
  const [authState, setAuthState] = useState<AuthState>("loading");
  const [accessState, setAccessState] = useState<AccessState>("loading");
  const [completed, setCompleted] = useState(false);
  const resolvedCourseHref = courseHref ?? `/courses/${courseId}`;
  const resolvedRedirectHref = redirectHref ?? `${resolvedCourseHref}/${lessonId}`;
  const resolvedNextLessonHref = nextLessonHref ?? (nextLessonId ? `${resolvedCourseHref}/${nextLessonId}` : null);
  const openSignInModal = () => {
    window.dispatchEvent(
      new CustomEvent("inhero:open-auth", {
        detail: { mode: "login", redirectTo: resolvedRedirectHref, source: "lesson-gate" },
      })
    );
  };

  useEffect(() => {
    const supabase = createBrowserClient();
    let cancelled = false;
    const watchdog = setTimeout(() => {
      if (!cancelled) {
        // eslint-disable-next-line no-console
        console.warn("[section-gate] getSession timeout — falling back to guest");
        setAuthState((prev) => (prev === "loading" ? "guest" : prev));
      }
    }, 5000);
    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        if (cancelled) return;
        clearTimeout(watchdog);
        setAuthState(session ? "authenticated" : "guest");
      })
      .catch((err) => {
        if (cancelled) return;
        clearTimeout(watchdog);
        // eslint-disable-next-line no-console
        console.error("[section-gate] getSession rejected", err);
        setAuthState("guest");
      });
    return () => {
      cancelled = true;
      clearTimeout(watchdog);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function checkAccess() {
      if (authState !== "authenticated") {
        setAccessState("loading");
        return;
      }
      if (isFreePreviewLesson) {
        setAccessState("granted");
        return;
      }
      setAccessState("loading");
      try {
        const response = await authFetch(`/api/course-access?courseId=${encodeURIComponent(courseId)}`);
        const json = await response.json();
        if (!cancelled) {
          setAccessState(response.ok && json?.hasAccess ? "granted" : "denied");
        }
      } catch {
        if (!cancelled) setAccessState("denied");
      }
    }

    checkAccess();
    return () => {
      cancelled = true;
    };
  }, [authState, courseId, isFreePreviewLesson]);

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
            <button type="button" onClick={openSignInModal} className="slg-btn-primary">
              Sign In to Watch
            </button>
            <Link href={resolvedCourseHref} className="slg-btn-ghost">← Back to {courseName}</Link>
          </div>
        </div>
        <style>{sharedCss}</style>
      </div>
    );
  }

  if (accessState === "loading") {
    return (
      <div className="slg-center">
        <div className="slg-spinner" />
        <style>{sharedCss}</style>
      </div>
    );
  }

  if (accessState === "denied") {
    return (
      <div className="slg-center">
        <div className="slg-card">
          <div className="slg-icon">🔐</div>
          <h2 className="slg-title">Course Locked</h2>
          <p className="slg-body">
            You are signed in, but <strong>{courseName}</strong> requires an active pass to continue.
          </p>
          <div className="slg-actions">
            <Link href="/pricing" className="slg-btn-primary">Unlock with InHero Pass</Link>
            <Link href={resolvedCourseHref} className="slg-btn-ghost">← Back to {courseName}</Link>
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
            {resolvedNextLessonHref ? (
              <Link href={resolvedNextLessonHref} className="slg-btn-primary">Next Lesson →</Link>
            ) : (
              <Link href={resolvedCourseHref} className="slg-btn-primary">Back to Course →</Link>
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
    <LessonWorkspaceShell
      courseId={courseId}
      lessonId={lessonId}
      title={title}
      courseName={courseName}
      courseHref={resolvedCourseHref}
      lessonScript={lessonScript}
      lessonLang={lessonLang}
    >
      <SectionLessonPlayer
        playlist={playlist}
        lessonId={lessonId}
        onComplete={() => setCompleted(true)}
      />
    </LessonWorkspaceShell>
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
