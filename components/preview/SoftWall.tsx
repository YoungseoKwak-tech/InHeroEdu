"use client";

/**
 * SoftWall — the only commit ask in the zero-signup preview funnel.
 *
 * Fires after a public preview lesson completes. The framing is loss-
 * aversion: the student just produced something (correct answers, a
 * streak nudge, a personalized insight), and we offer to save it. The
 * alternative — "Continue to Lesson 2 →" — is weaker; "save what you
 * already built" lands harder than "unlock more."
 *
 * Auth surface is Google ONLY for now. Email/password adds 3-5 mobile
 * friction points (typing, password rules, verification email) and
 * historically halves conversion on cold education traffic.
 *
 * Anonymous-to-user reattribution: the inhero_anon_id cookie persists
 * through the OAuth round-trip; the auth callback (Phase 2) will call
 * public.merge_anon_into_user(anon_id, user_id) so the new account
 * inherits the activity that earned the signup.
 */

import { useState } from "react";
import { createBrowserClient } from "@/lib/supabase";
import { buildAuthCallbackUrl, getSafeRedirectPath } from "@/lib/auth-redirect";

interface Props {
  open: boolean;
  lessonTitle: string;
  /** Path to return to after OAuth completes (defaults to current location). */
  continueHref?: string;
  /** Called when student dismisses without signing in (back to preview). */
  onDismiss?: () => void;
}

export default function SoftWall({ open, lessonTitle, continueHref, onDismiss }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  async function signInWithGoogle() {
    setError(null);
    setLoading(true);
    try {
      const supabase = createBrowserClient();
      const safeNext = continueHref
        ? getSafeRedirectPath(continueHref)
        : typeof window !== "undefined"
        ? getSafeRedirectPath(window.location.pathname)
        : "/dashboard";
      const origin = typeof window !== "undefined" ? window.location.origin : "";
      const { error: oauthErr } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: buildAuthCallbackUrl(origin, safeNext),
          queryParams: { prompt: "select_account" },
        },
      });
      if (oauthErr) throw oauthErr;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : String(err));
      setLoading(false);
    }
  }

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget && onDismiss) onDismiss();
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "rgba(0,0,0,0.86)",
        backdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.25rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "26rem",
          background: "#0d1117",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "1.25rem",
          padding: "2rem 1.75rem 1.75rem",
          textAlign: "center",
          color: "#e6edf3",
          boxShadow: "0 30px 80px rgba(0,0,0,0.6)",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(74, 222, 128, 0.12)",
            color: "#4ade80",
            padding: "6px 14px",
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: 0.4,
            marginBottom: 18,
          }}
        >
          <span>✓</span>
          <span>LESSON COMPLETE</span>
        </div>

        <h2 style={{ fontSize: 22, fontWeight: 800, margin: 0, lineHeight: 1.25 }}>
          {lessonTitle}
        </h2>
        <p style={{ marginTop: 12, marginBottom: 22, color: "#8b949e", fontSize: 14, lineHeight: 1.55 }}>
          방금 만든 진도, 인사이트, streak — Google 로그인 한 번이면 저장돼.
          <br />
          이메일·비밀번호 안 받음. 2초.
        </p>

        <button
          onClick={signInWithGoogle}
          disabled={loading}
          style={{
            width: "100%",
            padding: "14px 16px",
            background: "#ffffff",
            color: "#0d1117",
            border: "none",
            borderRadius: 10,
            fontSize: 15,
            fontWeight: 700,
            cursor: loading ? "wait" : "pointer",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            opacity: loading ? 0.7 : 1,
            transition: "opacity 0.15s ease",
          }}
        >
          <GoogleGlyph />
          {loading ? "Google 로 이동 중…" : "Google 로 진도 저장하기"}
        </button>

        {error && (
          <p style={{ marginTop: 14, fontSize: 13, color: "#f87171" }}>
            {error}
          </p>
        )}

        {onDismiss && (
          <button
            onClick={onDismiss}
            style={{
              marginTop: 14,
              background: "transparent",
              color: "#6e7681",
              border: "none",
              fontSize: 13,
              cursor: "pointer",
            }}
          >
            나중에 하기
          </button>
        )}
      </div>
    </div>
  );
}

function GoogleGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
      />
    </svg>
  );
}
