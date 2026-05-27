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
import { authFetch } from "@/lib/client-auth";
import { createBrowserClient } from "@/lib/supabase";
import { parseScript } from "@/lib/parseScript";
import { overlaysWithTimestamps } from "@/lib/overlays";
import VideoLessonPlayer from "@/components/lesson/VideoLessonPlayer";
import LessonWorkspaceShell from "@/components/lesson/LessonWorkspaceShell";
import type { OverlayRow } from "@/lib/overlays";

interface TimedOverlay extends OverlayRow {
  triggerAt?: number;
}

interface Props {
  lessonId: string;
  videoUrl: string;
  script: string;
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
  initialOverlays?: OverlayRow[];
}

type AuthState = "loading" | "authenticated" | "guest";
type AccessState = "loading" | "granted" | "denied";

export default function VideoLessonGate({
  lessonId,
  videoUrl,
  script,
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
  initialOverlays,
}: Props) {
  const [authState, setAuthState] = useState<AuthState>("loading");
  const [accessState, setAccessState] = useState<AccessState>("loading");
  const [completed, setCompleted] = useState(false);
  const [timedOverlays, setTimedOverlays] = useState<TimedOverlay[]>([]);
  const resolvedCourseHref = courseHref ?? `/courses/${courseId}`;
  const resolvedRedirectHref = redirectHref ?? `${resolvedCourseHref}/${lessonId}`;
  const resolvedNextLessonHref = nextLessonHref ?? (nextLessonId ? `${resolvedCourseHref}/${nextLessonId}` : null);
  const openSignInModal = () => {
    window.dispatchEvent(
      new CustomEvent("inhero:open-auth", {
        detail: { mode: "login", redirectTo: resolvedRedirectHref, source: "video-lesson-gate" },
      })
    );
  };

  useEffect(() => {
    const supabase = createBrowserClient();
    let cancelled = false;
    const watchdog = setTimeout(() => {
      if (!cancelled) {
        // eslint-disable-next-line no-console
        console.warn("[video-gate] getSession timeout — falling back to guest");
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
        console.error("[video-gate] getSession rejected", err);
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

  // Fetch overlays and merge timestamps when authenticated
  useEffect(() => {
    if (authState !== "authenticated" || accessState !== "granted") return;
    if (initialOverlays?.length) {
      const sections = parseScript(script);
      const merged = overlaysWithTimestamps(initialOverlays, sections);
      setTimedOverlays(merged.length > 0 ? merged : initialOverlays);
      return;
    }
    authFetch(`/api/overlays?lessonId=${lessonId}`)
      .then((r) => r.json())
      .then((j) => {
        if (!j.ok || !j.data?.length) return;
        const sections = parseScript(script);
        const merged = overlaysWithTimestamps(j.data as OverlayRow[], sections);
        setTimedOverlays(merged.length > 0 ? merged : (j.data as OverlayRow[]));
      })
      .catch(() => {});
  }, [authState, accessState, initialOverlays, lessonId, script]);

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
            <button type="button" onClick={openSignInModal} className="vlg-btn-primary">
              Sign In to Watch
            </button>
            <Link href={resolvedCourseHref} className="vlg-btn-ghost">← Back to {courseName}</Link>
          </div>
        </div>
        <style>{lockedCss}</style>
      </div>
    );
  }

  if (accessState === "loading") {
    return (
      <div className="vlg-center">
        <div className="vlg-spinner" />
        <style>{spinnerCss}</style>
      </div>
    );
  }

  if (accessState === "denied") {
    return (
      <div className="vlg-center">
        <div className="vlg-locked-card">
          <div className="vlg-lock-icon">🔐</div>
          <h2 className="vlg-locked-title">Course Locked</h2>
          <p className="vlg-locked-body">
            You are signed in, but <strong>{courseName}</strong> requires an active pass to continue.
          </p>
          <div className="vlg-locked-actions">
            <Link href="/pricing" className="vlg-btn-primary">Unlock with InHero Pass</Link>
            <Link href={resolvedCourseHref} className="vlg-btn-ghost">← Back to {courseName}</Link>
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
            {resolvedNextLessonHref ? (
              <Link href={resolvedNextLessonHref} className="vlg-btn-primary">Next Lesson →</Link>
            ) : (
              <Link href={resolvedCourseHref} className="vlg-btn-primary">Back to Course →</Link>
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
    <LessonWorkspaceShell
      courseId={courseId}
      lessonId={lessonId}
      title={title}
      courseName={courseName}
      courseHref={resolvedCourseHref}
      lessonScript={lessonScript}
      lessonLang={lessonLang}
    >
      <VideoLessonPlayer
        lessonId={lessonId}
        videoUrl={videoUrl}
        overlays={timedOverlays}
        onComplete={() => setCompleted(true)}
      />
    </LessonWorkspaceShell>
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
    text-align: center; text-decoration: none; transition: filter 0.15s; border: none;
  }
  .vlg-btn-primary:hover { filter: brightness(1.1); }
  .vlg-btn-ghost {
    display: block; padding: 0.7rem 1rem; border-radius: 0.75rem;
    border: 1px solid #222; color: #666; font-size: 0.82rem; font-weight: 500;
    text-align: center; text-decoration: none; transition: border-color 0.15s, color 0.15s;
  }
  .vlg-btn-ghost:hover { border-color: #333; color: #aaa; }
`;
