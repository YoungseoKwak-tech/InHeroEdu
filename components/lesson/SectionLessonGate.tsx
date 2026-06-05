"use client";

/**
 * SectionLessonGate — auth wrapper for SectionLessonPlayer.
 * Receives the pre-built playlist from the server page component.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { authFetch, getClientSession } from "@/lib/client-auth";
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
  /** Deep-link to the matching textbook chapter, rendered as a single
   *  link strip right under the player. Omit when the course has no
   *  textbook (only AP Bio has one in the catalog today). */
  textbookHref?: string;
  textbookLabel?: string;
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
  textbookHref,
  textbookLabel,
}: Props) {
  const [authState, setAuthState] = useState<AuthState>("loading");
  const [accessState, setAccessState] = useState<AccessState>("loading");
  const [completed, setCompleted] = useState(false);
  // Split view defaults to OFF on every lesson load — the student starts
  // with the lesson player at full width and explicitly opts in by
  // clicking the "Read in textbook" button below the player. No
  // localStorage persistence: the prior sticky behavior surprised
  // students who landed on a new lesson already split.
  const [splitView, setSplitView] = useState(false);
  function openSplit() { setSplitView(true); }
  function closeSplit() { setSplitView(false); }
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
    let cancelled = false;
    const watchdog = setTimeout(() => {
      if (!cancelled) {
        // eslint-disable-next-line no-console
        console.warn("[section-gate] session timeout — guest fallback");
        setAuthState((prev) => (prev === "loading" ? "guest" : prev));
      }
    }, 5000);
    getClientSession()
      .then((session) => {
        if (cancelled) return;
        clearTimeout(watchdog);
        setAuthState(session ? "authenticated" : "guest");
      })
      .catch((err) => {
        if (cancelled) return;
        clearTimeout(watchdog);
        // eslint-disable-next-line no-console
        console.error("[section-gate] session check rejected", err);
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
      if (isFreePreviewLesson) {
        setAccessState("granted");
        return;
      }
      if (authState !== "authenticated") {
        setAccessState("loading");
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

  if (authState === "guest" && !isFreePreviewLesson) {
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
    <div className={`slg-layout ${splitView && textbookHref ? "is-split" : ""}`}>
      <div className="slg-pane-lesson">
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
          {textbookHref && !splitView && (
            <button
              type="button"
              onClick={openSplit}
              className="slg-textbook-link"
              aria-label="Open the matching textbook alongside this lesson"
            >
              <span className="slg-textbook-icon" aria-hidden="true">📖</span>
              <span className="slg-textbook-label">
                {textbookLabel ?? "Read in textbook"}
              </span>
              <span className="slg-textbook-arrow" aria-hidden="true">↔</span>
            </button>
          )}
        </LessonWorkspaceShell>
      </div>

      {splitView && textbookHref && (
        <aside className="slg-pane-textbook" aria-label="Textbook">
          <header className="slg-pane-textbook-head">
            <div className="slg-pane-textbook-title">
              <span aria-hidden="true">📖</span>
              <span>{textbookLabel ?? "Textbook"}</span>
            </div>
            <div className="slg-pane-textbook-actions">
              <Link
                href={textbookHref}
                target="_blank"
                rel="noopener noreferrer"
                className="slg-pane-textbook-pop"
                aria-label="Open textbook in a full page"
              >
                Full view ↗
              </Link>
              <button
                type="button"
                onClick={closeSplit}
                className="slg-pane-textbook-exit"
                aria-label="Exit split view"
              >
                Exit split view ×
              </button>
            </div>
          </header>
          <iframe
            src={textbookHref}
            className="slg-pane-textbook-frame"
            title="Textbook chapter"
          />
        </aside>
      )}

      <style>{`
        /* Layout — single column by default, two columns when split is on. */
        .slg-layout { display: flex; min-height: calc(100vh - 4rem); }
        .slg-layout.is-split { gap: 0; }
        .slg-pane-lesson { flex: 1 1 100%; min-width: 0; }
        .slg-layout.is-split .slg-pane-lesson { flex: 1 1 55%; }

        /* Textbook side pane — sticky so it stays in view while the
           lesson column scrolls. */
        .slg-pane-textbook {
          flex: 1 1 45%;
          min-width: 0;
          position: sticky;
          top: 4rem;
          height: calc(100vh - 4rem);
          display: flex;
          flex-direction: column;
          border-left: 1px solid rgba(255,255,255,0.08);
          background: #0a0a14;
        }
        .slg-pane-textbook-head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.55rem 0.85rem;
          background: rgba(8,10,18,0.7);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .slg-pane-textbook-title {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: rgba(216,217,230,0.85);
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.01em;
        }
        .slg-pane-textbook-actions {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
        }
        .slg-pane-textbook-pop {
          color: #5eead4;
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.78rem;
          font-weight: 600;
          text-decoration: none;
          letter-spacing: 0.01em;
          padding: 0.25rem 0.55rem;
          border-radius: 0.35rem;
          transition: background 0.15s ease;
        }
        .slg-pane-textbook-pop:hover { background: rgba(94,234,212,0.12); }
        .slg-pane-textbook-exit {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          color: rgba(216,217,230,0.88);
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.02em;
          cursor: pointer;
          padding: 0.32rem 0.65rem;
          border-radius: 0.4rem;
          transition: color 0.15s ease, background 0.15s ease, border-color 0.15s ease;
        }
        .slg-pane-textbook-exit:hover {
          color: #ffffff;
          background: rgba(255,59,59,0.18);
          border-color: rgba(255,59,59,0.4);
        }
        .slg-pane-textbook-frame {
          flex: 1;
          width: 100%;
          border: 0;
          background: #06070d;
        }

        /* Textbook CTA button (lives in lesson pane when split is off) */
        .slg-textbook-link {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          margin: 1.25rem auto 0;
          padding: 0.7rem 1.1rem;
          border-radius: 0.6rem;
          background: rgba(94, 234, 212, 0.08);
          border: 1px solid rgba(94, 234, 212, 0.32);
          color: #5eead4;
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.92rem;
          font-weight: 600;
          letter-spacing: 0.01em;
          text-decoration: none;
          cursor: pointer;
          transition: background 0.15s ease, border-color 0.15s ease, transform 0.15s ease;
          align-self: center;
        }
        .slg-textbook-link:hover {
          background: rgba(94, 234, 212, 0.18);
          border-color: rgba(94, 234, 212, 0.6);
          transform: translateY(-1px);
        }
        .slg-textbook-icon { font-size: 1.05rem; line-height: 1; }
        .slg-textbook-arrow { color: rgba(94,234,212,0.85); }

        /* Mobile: stack the panes vertically so the lesson stays usable. */
        @media (max-width: 900px) {
          .slg-layout.is-split { flex-direction: column; }
          .slg-layout.is-split .slg-pane-lesson { flex: 0 0 auto; }
          .slg-pane-textbook {
            position: static;
            height: 70vh;
            border-left: none;
            border-top: 1px solid rgba(255,255,255,0.08);
          }
        }
      `}</style>
    </div>
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
