"use client";

/**
 * /onboarding — dedicated, full-page claim flow.
 *
 * Bypasses the global modal's dismiss + force-open state machine entirely:
 * land on this URL and the 3-step flow is always rendered. After a successful
 * claim, redirect to /trajectory/[handle].
 */

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authFetch } from "@/lib/client-auth";
import { createBrowserClient } from "@/lib/supabase";
import {
  AMBITION_TAGS,
  GRAD_YEARS,
  HANDLE_MAX,
  HANDLE_MIN,
  validateHandle,
  type AmbitionTagId,
} from "@/lib/trajectory";

type CheckState =
  | { kind: "idle" }
  | { kind: "checking" }
  | { kind: "available"; handle: string }
  | { kind: "taken"; reason: string };

export default function OnboardingPage() {
  const router = useRouter();
  const supabase = createBrowserClient();

  const [authStatus, setAuthStatus] = useState<"loading" | "out" | "in">("loading");
  const [step, setStep] = useState<0 | 1 | 2>(0);
  const [handle, setHandle] = useState("");
  const [check, setCheck] = useState<CheckState>({ kind: "idle" });
  const [gradYear, setGradYear] = useState<number | null>(null);
  const [tags, setTags] = useState<AmbitionTagId[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const lastCheckedRef = useRef("");

  // Check auth + redirect if profile already exists.
  useEffect(() => {
    let mounted = true;
    async function bootstrap() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!mounted) return;
        if (!session?.user) {
          setAuthStatus("out");
          return;
        }
        setAuthStatus("in");
        // If they already have a profile, skip onboarding.
        const res = await authFetch("/api/profile/me");
        const json = await res.json().catch(() => ({}));
        if (json?.profile?.handle) {
          router.replace(`/trajectory/${encodeURIComponent(json.profile.handle)}`);
        }
      } catch {
        if (mounted) setAuthStatus("out");
      }
    }
    void bootstrap();
    return () => { mounted = false; };
  }, [router, supabase]);

  // Debounced handle check.
  useEffect(() => {
    if (authStatus !== "in") return;
    const v = validateHandle(handle);
    if (!v.ok) {
      setCheck({ kind: "taken", reason: v.reason });
      return;
    }
    setCheck({ kind: "checking" });
    const target = v.handle;
    lastCheckedRef.current = target;
    const t = window.setTimeout(async () => {
      try {
        const res = await authFetch("/api/profile/handle-check", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ handle: target }),
        });
        const json = await res.json();
        if (lastCheckedRef.current !== target) return;
        if (json.available) setCheck({ kind: "available", handle: target });
        else setCheck({ kind: "taken", reason: json.reason ?? "Already taken." });
      } catch {
        // silent
      }
    }, 350);
    return () => window.clearTimeout(t);
  }, [handle, authStatus]);

  function toggleTag(id: AmbitionTagId) {
    setTags((prev) => {
      if (prev.includes(id)) return prev.filter((t) => t !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  }

  async function submit() {
    if (saving) return;
    if (check.kind !== "available" || gradYear == null || tags.length === 0) return;
    setSaving(true);
    setError(null);
    try {
      const res = await authFetch("/api/profile/init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          handle: check.handle,
          graduationYear: gradYear,
          ambitionTags: tags,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? `HTTP ${res.status}`);
      router.replace(`/trajectory/${encodeURIComponent(check.handle)}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save profile.");
    } finally {
      setSaving(false);
    }
  }

  const canAdvance0 = check.kind === "available";
  const canAdvance1 = gradYear != null;
  const canSubmit = canAdvance0 && canAdvance1 && tags.length > 0 && !saving;

  return (
    <main className="ob-root">
      <div className="ob-shell">
        <div className="ob-stamp">
          <span className="ob-pulse" />
          <span>TRAJECTORY · CLAIM YOUR HANDLE</span>
        </div>
        <h1 className="ob-title">
          The version of you that's <em>arriving</em>.
        </h1>
        <p className="ob-sub">
          Pick the identity ambitious students will recognize you by. You can refine the rest later.
        </p>

        {authStatus === "loading" && (
          <div className="ob-loading">Checking your session…</div>
        )}

        {authStatus === "out" && (
          <div className="ob-signed-out">
            <strong>You need to sign in first.</strong>
            <p>Hit the SIGN IN / EJECT button in the top nav, then come back here.</p>
            <Link href="/" className="ob-link-home">← Back to home</Link>
          </div>
        )}

        {authStatus === "in" && (
          <>
            <div className="ob-steps" aria-hidden="true">
              {[0, 1, 2].map((i) => (
                <span key={i} className={`ob-step-dot ${i <= step ? "is-active" : ""}`} />
              ))}
            </div>

            {step === 0 && (
              <section className="ob-section">
                <label className="ob-label">Handle</label>
                <div className="ob-input-row">
                  <input
                    type="text"
                    value={handle}
                    onChange={(e) => setHandle(e.target.value)}
                    placeholder="CornellBio27"
                    maxLength={HANDLE_MAX}
                    className="ob-input"
                    autoFocus
                  />
                  <span className={`ob-check ob-check-${check.kind}`}>
                    {check.kind === "available" && "✓ Available"}
                    {check.kind === "checking" && "Checking…"}
                    {check.kind === "taken" && check.reason}
                    {check.kind === "idle" && `${HANDLE_MIN}–${HANDLE_MAX} chars`}
                  </span>
                </div>
                <p className="ob-hint">
                  Letters, digits, underscore. Start with a letter. Examples: <em>CornellBio27</em> · <em>FutureFounder17</em> · <em>APChem5</em>.
                </p>
                <div className="ob-row ob-row-end">
                  <button type="button" onClick={() => setStep(1)} disabled={!canAdvance0} className="ob-btn-primary">
                    NEXT →
                  </button>
                </div>
              </section>
            )}

            {step === 1 && (
              <section className="ob-section">
                <label className="ob-label">Graduation year</label>
                <div className="ob-year-grid">
                  {GRAD_YEARS.map((y) => (
                    <button
                      key={y}
                      type="button"
                      onClick={() => setGradYear(y)}
                      className={`ob-year ${gradYear === y ? "is-active" : ""}`}
                    >
                      {y}
                    </button>
                  ))}
                </div>
                <p className="ob-hint">High-school or undergraduate year you'll graduate in.</p>
                <div className="ob-row">
                  <button type="button" onClick={() => setStep(0)} className="ob-btn-ghost">← Back</button>
                  <button type="button" onClick={() => setStep(2)} disabled={!canAdvance1} className="ob-btn-primary">
                    NEXT →
                  </button>
                </div>
              </section>
            )}

            {step === 2 && (
              <section className="ob-section">
                <label className="ob-label">Ambition <span className="ob-label-hint">pick 1–3</span></label>
                <div className="ob-tags">
                  {AMBITION_TAGS.map((t) => {
                    const active = tags.includes(t.id);
                    const disabled = !active && tags.length >= 3;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => toggleTag(t.id)}
                        disabled={disabled}
                        className={`ob-tag ${active ? "is-active" : ""}`}
                      >
                        {t.label}
                      </button>
                    );
                  })}
                </div>
                {error && <div className="ob-error">{error}</div>}
                <div className="ob-row">
                  <button type="button" onClick={() => setStep(1)} className="ob-btn-ghost">← Back</button>
                  <button type="button" onClick={() => void submit()} disabled={!canSubmit} className="ob-btn-primary">
                    {saving ? "Saving…" : "CLAIM HANDLE →"}
                  </button>
                </div>
              </section>
            )}
          </>
        )}
      </div>

      <style>{`
        .ob-root {
          min-height: 100vh;
          display: flex; align-items: center; justify-content: center;
          padding: 2rem 1.5rem;
          background: radial-gradient(ellipse at top, rgba(94,234,212,0.05), transparent 60%), #050610;
          font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif;
          color: #d8d9e6;
        }
        .ob-shell {
          width: min(34rem, 100%);
          background: linear-gradient(180deg, #0a0e1a 0%, #050610 100%);
          border: 1px solid rgba(94, 234, 212, 0.18);
          border-radius: 1rem;
          padding: 1.85rem 1.75rem 1.65rem;
          box-shadow: 0 32px 80px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(94, 234, 212, 0.05);
        }
        .ob-stamp {
          display: inline-flex; align-items: center; gap: 0.55rem;
          font-family: ui-monospace, 'JetBrains Mono', monospace;
          font-size: 0.62rem; font-weight: 700;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: #5eead4;
          text-shadow: 0 0 10px rgba(94,234,212,0.5);
          margin-bottom: 0.85rem;
        }
        .ob-pulse {
          width: 7px; height: 7px; border-radius: 50%;
          background: #5eead4;
          box-shadow: 0 0 10px rgba(94,234,212,0.7);
          animation: ob-pulse 1.6s ease-in-out infinite;
        }
        @keyframes ob-pulse {
          0%,100% { opacity: 0.55; transform: scale(0.85); }
          50%     { opacity: 1;    transform: scale(1.15); }
        }
        .ob-title {
          font-family: 'Cormorant Garamond', 'Georgia', serif;
          font-size: 1.7rem; font-weight: 600;
          color: #f3f3fb;
          margin: 0 0 0.45rem;
          letter-spacing: -0.015em; line-height: 1.15;
        }
        .ob-title em { font-style: italic; color: #5eead4; text-shadow: 0 0 16px rgba(94,234,212,0.35); }
        .ob-sub { font-size: 0.88rem; color: #94a3b8; margin: 0 0 1.25rem; line-height: 1.5; }

        .ob-loading {
          padding: 1rem;
          font-family: ui-monospace, monospace;
          font-size: 0.8rem;
          color: rgba(148,163,184,0.7);
          text-align: center;
        }

        .ob-signed-out {
          padding: 1rem;
          background: rgba(244,201,93,0.06);
          border: 1px solid rgba(244,201,93,0.25);
          border-radius: 0.5rem;
          color: #F4C95D;
        }
        .ob-signed-out strong { display: block; margin-bottom: 0.4rem; }
        .ob-signed-out p { color: rgba(244,201,93,0.8); font-size: 0.84rem; margin: 0 0 0.7rem; }
        .ob-link-home {
          font-family: ui-monospace, monospace;
          font-size: 0.72rem;
          color: #5eead4;
          text-decoration: none;
          letter-spacing: 0.08em;
        }
        .ob-link-home:hover { text-decoration: underline; }

        .ob-steps { display: flex; gap: 0.4rem; margin-bottom: 1.25rem; }
        .ob-step-dot {
          width: 22px; height: 4px; border-radius: 2px;
          background: rgba(255,255,255,0.08);
          transition: background 0.2s;
        }
        .ob-step-dot.is-active { background: #5eead4; box-shadow: 0 0 6px rgba(94,234,212,0.5); }

        .ob-section { display: flex; flex-direction: column; gap: 0.7rem; }
        .ob-label {
          font-family: ui-monospace, monospace;
          font-size: 0.65rem; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: rgba(148, 163, 184, 0.85);
        }
        .ob-label-hint { color: rgba(148,163,184,0.55); letter-spacing: 0.1em; margin-left: 0.4rem; text-transform: none; }

        .ob-input-row { display: flex; align-items: center; gap: 0.6rem; flex-wrap: wrap; }
        .ob-input {
          flex: 1; min-width: 12rem;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(94,234,212,0.25);
          border-radius: 0.5rem;
          padding: 0.7rem 0.85rem;
          font-size: 1rem;
          font-family: 'Cormorant Garamond', 'Georgia', serif;
          font-style: italic;
          color: #fff; outline: none;
          transition: border-color 0.15s, box-shadow 0.2s;
        }
        .ob-input:focus { border-color: #5eead4; box-shadow: 0 0 0 1px #5eead4, 0 0 18px rgba(94,234,212,0.35); }

        .ob-check {
          font-family: ui-monospace, monospace;
          font-size: 0.7rem; letter-spacing: 0.06em;
          padding: 0.2rem 0.55rem; border-radius: 0.3rem;
        }
        .ob-check-idle { color: rgba(148,163,184,0.6); }
        .ob-check-checking { color: rgba(244, 201, 93, 0.85); }
        .ob-check-available { color: #5eead4; background: rgba(94,234,212,0.08); border: 1px solid rgba(94,234,212,0.3); }
        .ob-check-taken { color: #ff8b7e; background: rgba(255,107,91,0.08); border: 1px solid rgba(255,107,91,0.3); }

        .ob-hint { font-size: 0.78rem; color: rgba(148,163,184,0.7); line-height: 1.5; margin: 0; }
        .ob-hint em { font-family: 'Cormorant Garamond', 'Georgia', serif; font-style: italic; color: rgba(94,234,212,0.85); }

        .ob-year-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(4rem, 1fr)); gap: 0.45rem; }
        .ob-year {
          padding: 0.6rem 0.4rem;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 0.4rem;
          color: #d8d9e6;
          font-family: ui-monospace, monospace;
          font-size: 0.92rem; font-weight: 700;
          cursor: pointer;
          transition: border-color 0.15s, background 0.15s, color 0.15s;
        }
        .ob-year:hover { border-color: rgba(94,234,212,0.4); background: rgba(94,234,212,0.05); }
        .ob-year.is-active {
          border-color: #5eead4; background: rgba(94,234,212,0.12); color: #5eead4;
          box-shadow: 0 0 0 1px #5eead4, 0 0 14px rgba(94,234,212,0.25);
        }

        .ob-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; }
        .ob-tag {
          padding: 0.5rem 0.85rem;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 999px;
          color: #d8d9e6;
          font-size: 0.82rem; font-weight: 500;
          cursor: pointer;
          transition: border-color 0.15s, background 0.15s, color 0.15s;
        }
        .ob-tag:hover:not(:disabled) { border-color: rgba(94,234,212,0.4); }
        .ob-tag:disabled { opacity: 0.35; cursor: default; }
        .ob-tag.is-active { border-color: #5eead4; background: rgba(94,234,212,0.12); color: #5eead4; }

        .ob-row { display: flex; gap: 0.5rem; justify-content: space-between; margin-top: 0.6rem; }
        .ob-row-end { justify-content: flex-end; }
        .ob-btn-primary {
          font-family: ui-monospace, monospace;
          font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.16em; text-transform: uppercase;
          padding: 0.7rem 1.1rem;
          color: #0a0a10; background: #5eead4;
          border: 0; border-radius: 0.45rem;
          cursor: pointer;
          transition: filter 0.15s, box-shadow 0.2s;
        }
        .ob-btn-primary:hover:not(:disabled) { filter: brightness(1.08); box-shadow: 0 0 22px rgba(94,234,212,0.5); }
        .ob-btn-primary:disabled { opacity: 0.4; cursor: default; }
        .ob-btn-ghost {
          font-family: ui-monospace, monospace;
          font-size: 0.7rem; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase;
          padding: 0.7rem 0.95rem;
          color: rgba(148,163,184,0.85);
          background: transparent;
          border: 1px solid rgba(148,163,184,0.2);
          border-radius: 0.45rem;
          cursor: pointer;
          transition: color 0.15s, border-color 0.15s;
        }
        .ob-btn-ghost:hover { color: #fff; border-color: rgba(94,234,212,0.4); }

        .ob-error {
          padding: 0.5rem 0.7rem;
          border-radius: 0.4rem;
          background: rgba(255,107,91,0.08);
          border: 1px solid rgba(255,107,91,0.3);
          color: #ff8b7e;
          font-family: ui-monospace, monospace;
          font-size: 0.78rem;
        }
      `}</style>
    </main>
  );
}
