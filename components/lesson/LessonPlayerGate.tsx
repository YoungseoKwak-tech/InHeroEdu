"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import LessonPlayer from "@/components/lesson/LessonPlayer";
import OverlayPlayer from "@/components/lesson/OverlayPlayer";
import LessonWorkspaceShell from "@/components/lesson/LessonWorkspaceShell";
import PaymentButton from "@/components/PaymentButton";
import { authFetch, getClientSession } from "@/lib/client-auth";
import type { LessonPlayerData } from "@/lib/lesson-player-types";
import type { OverlayRow } from "@/lib/overlays";

interface Props {
  playerData: LessonPlayerData;
  courseId: string;
  courseName: string;
  courseHref?: string;
  redirectHref?: string;
  nextLessonHref?: string | null;
  nextLessonId?: string | null;
  lessonId?: string;
  lessonScript?: string;
  lessonLang?: "en" | "ko";
  isFreePreviewLesson?: boolean;
}

type AuthState = "loading" | "authenticated" | "guest";
type AccessState = "loading" | "granted" | "denied";

export default function LessonPlayerGate({
  playerData,
  courseId,
  courseName,
  courseHref,
  redirectHref,
  nextLessonHref,
  nextLessonId,
  lessonId,
  lessonScript,
  lessonLang,
  isFreePreviewLesson,
}: Props) {
  const [authState, setAuthState] = useState<AuthState>("loading");
  const [accessState, setAccessState] = useState<AccessState>("loading");
  const [completed, setCompleted] = useState(false);

  // ── DB overlays ────────────────────────────────────────────────────────────
  const [dbOverlays, setDbOverlays] = useState<OverlayRow[]>([]);
  const [activeOverlays, setActiveOverlays] = useState<OverlayRow[] | null>(null);
  const pendingAdvanceFn = useRef<(() => void) | null>(null);
  const resolvedCourseHref = courseHref ?? `/courses/${courseId}`;
  const resolvedRedirectHref = redirectHref ?? `${resolvedCourseHref}/${lessonId ?? playerData.id}`;
  const resolvedNextLessonHref = nextLessonHref ?? (nextLessonId ? `${resolvedCourseHref}/${nextLessonId}` : null);
  const openSignInModal = () => {
    window.dispatchEvent(
      new CustomEvent("inhero:open-auth", {
        detail: { mode: "login", redirectTo: resolvedRedirectHref, source: "lesson-player-gate" },
      })
    );
  };

  useEffect(() => {
    let cancelled = false;
    // Watchdog kept as a belt-and-suspenders against truly stuck sessions.
    // getClientSession also falls back to a valid stored token when Supabase
    // auth lock rehydration is temporarily noisy.
    const watchdog = setTimeout(() => {
      if (!cancelled) {
        // eslint-disable-next-line no-console
        console.warn("[lesson-gate] session lookup timeout — guest fallback");
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
        console.error("[lesson-gate] session check rejected", err);
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

  // Fetch DB overlays for this lesson (best-effort, non-blocking)
  useEffect(() => {
    if (authState !== "authenticated" || accessState !== "granted") return;
    authFetch(`/api/overlays?lessonId=${playerData.id}`)
      .then((r) => r.json())
      .then((j) => { if (j.ok) setDbOverlays(j.data ?? []); })
      .catch(() => {});
  }, [authState, accessState, playerData.id]);

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
            <button type="button" onClick={openSignInModal} className="lpg-btn-primary">
              Sign In to Watch
            </button>
            <Link href={resolvedCourseHref} className="lpg-btn-ghost">
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
            border: none;
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

  if (accessState === "loading") {
    return (
      <div className="lpg-root lpg-center">
        <div className="lpg-spinner" />
      </div>
    );
  }

  if (accessState === "denied") {
    return (
      <div className="lpg-root lpg-center">
        <div className="lpg-locked-card">
          <div className="lpg-lock-icon">🔐</div>
          <h2 className="lpg-locked-title">Course Locked</h2>
          <p className="lpg-locked-body">
            You are signed in, but <strong>{courseName}</strong> requires an active pass to continue.
          </p>
          <div className="lpg-locked-actions">
            {/* Inline PayPal checkout — serviceId "single" + subjectId courseId
                produces server-side service_id "single:<courseId>" via
                bindCourseAccessServiceId(), which hasPaidEnglishCourseAccess()
                matches on the ":<courseId>" pattern. After PayPal capture +
                markStoredOrderPaid, the same gate's next /api/course-access
                check returns hasAccess: true and this lesson unlocks. */}
            <PaymentButton
              serviceId="single"
              subjectId={courseId}
              amount={49}
              orderName={`${courseName} — One Subject Elite Pass`}
              returnTo={resolvedRedirectHref}
              label={`Unlock ${courseName} — $49/mo`}
              className="lpg-btn-primary"
            />
            <Link href={resolvedCourseHref} className="lpg-btn-ghost">
              ← Back to {courseName}
            </Link>
            <Link href="/pricing" className="lpg-btn-link">
              See other plans
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
          .lpg-locked-body strong { color: #aaa; }
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
          .lpg-btn-link {
            display: block; padding: 0.4rem 1rem;
            color: #555; font-size: 0.74rem; font-weight: 500;
            text-align: center; text-decoration: underline;
            text-underline-offset: 3px; text-decoration-color: #333;
            transition: color 0.15s, text-decoration-color 0.15s;
          }
          .lpg-btn-link:hover { color: #888; text-decoration-color: #555; }
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
            {resolvedNextLessonHref ? (
              <Link
                href={resolvedNextLessonHref}
                className="lpg-btn-primary"
              >
                Next Lesson →
              </Link>
            ) : (
              <Link href={resolvedCourseHref} className="lpg-btn-primary">
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
          .lpg-btn-link {
            display: block; padding: 0.4rem 1rem;
            color: #555; font-size: 0.74rem; font-weight: 500;
            text-align: center; text-decoration: underline;
            text-underline-offset: 3px; text-decoration-color: #333;
            transition: color 0.15s, text-decoration-color 0.15s;
          }
          .lpg-btn-link:hover { color: #888; text-decoration-color: #555; }
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
    <LessonWorkspaceShell
      courseId={courseId}
      lessonId={lessonId ?? playerData.id}
      title={playerData.title}
      courseName={courseName}
      courseHref={resolvedCourseHref}
      lessonScript={lessonScript}
      lessonLang={lessonLang}
    >
      <div style={{ position: "relative" }}>
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
      </div>
    </LessonWorkspaceShell>
  );
}
