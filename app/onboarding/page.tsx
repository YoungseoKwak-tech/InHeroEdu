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
  const [step, setStep] = useState<0 | 1 | 2 | 3>(0);
  const [handle, setHandle] = useState("");
  const [check, setCheck] = useState<CheckState>({ kind: "idle" });
  const [gradYear, setGradYear] = useState<number | null>(null);
  const [tags, setTags] = useState<AmbitionTagId[]>([]);

  // Identity ritual fields (step 3)
  const [dreamSchool, setDreamSchool] = useState("");
  const [intendedField, setIntendedField] = useState("");
  const [currentObsession, setCurrentObsession] = useState("");
  const [buildingWhat, setBuildingWhat] = useState("");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedHandle, setSavedHandle] = useState<string | null>(null);
  const [gotFoundingCircle, setGotFoundingCircle] = useState(false);
  const [cohort, setCohort] = useState<{ claimed: number; cap: number; remaining: number } | null>(null);
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

    // Fetch founding cohort headcount (public, no auth needed).
    void (async () => {
      try {
        const r = await fetch("/api/cohort/count", { cache: "no-store" });
        const j = await r.json();
        if (j?.ok) setCohort({ claimed: j.claimed, cap: j.cap, remaining: j.remaining });
      } catch { /* ignore */ }
    })();

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
          dreamSchool: dreamSchool.trim() || null,
          intendedField: intendedField.trim() || null,
          currentObsession: currentObsession.trim() || null,
          buildingWhat: buildingWhat.trim() || null,
        }),
      });
      const rawText = await res.text();
      let json: { ok?: boolean; error?: string; profile?: { handle?: string; badges?: { type: string }[] } } = {};
      try { json = rawText ? JSON.parse(rawText) : {}; } catch { /* keep raw */ }
      if (!res.ok || json.ok !== true) {
        const detail = json.error ?? rawText.slice(0, 240) ?? `HTTP ${res.status}`;
        throw new Error(`[${res.status}] ${detail}`);
      }
      const claimedHandle = json.profile?.handle ?? check.handle;
      const circle = (json.profile?.badges ?? []).some((b) => b.type === "founding_circle");
      setGotFoundingCircle(circle);
      setSavedHandle(claimedHandle);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save profile.");
    } finally {
      setSaving(false);
    }
  }

  const canAdvance0 = check.kind === "available";
  const canAdvance1 = gradYear != null;
  const canAdvance2 = tags.length > 0;
  const ritualComplete =
    dreamSchool.trim().length > 0 &&
    intendedField.trim().length > 0 &&
    currentObsession.trim().length > 0 &&
    buildingWhat.trim().length > 0;
  const canSubmit = canAdvance0 && canAdvance1 && canAdvance2 && !saving;

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

        {cohort && cohort.remaining > 0 && (
          <div className="ob-cohort">
            <div className="ob-cohort-row">
              <span className="ob-cohort-num">{cohort.remaining}</span>
              <span className="ob-cohort-label">
                of {cohort.cap} <em>founding cohort</em> seats left
              </span>
            </div>
            <div className="ob-cohort-bar">
              <div
                className="ob-cohort-fill"
                style={{ width: `${Math.min(100, (cohort.claimed / cohort.cap) * 100)}%` }}
              />
            </div>
            <p className="ob-cohort-hint">
              First 500 trajectories earn the <em>founding cohort</em> badge — permanent, no take-backs.
            </p>
          </div>
        )}
        {cohort && cohort.remaining === 0 && (
          <div className="ob-cohort ob-cohort-closed">
            Founding cohort is fully claimed. You can still build your trajectory — just without the badge.
          </div>
        )}

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

        {authStatus === "in" && savedHandle && (
          <div className="ob-success">
            <div className={`ob-success-glyph ${gotFoundingCircle ? "is-circle" : ""}`}>
              {gotFoundingCircle ? "◈" : "✓"}
            </div>
            <h2 className="ob-success-title">
              {gotFoundingCircle ? (
                <>You're in the <em>Founding Circle</em>.</>
              ) : (
                <>You're <em>in</em>.</>
              )}
            </h2>
            <p className="ob-success-sub">
              {gotFoundingCircle ? (
                <>One of the first 100 to complete the trajectory ritual. Handle <strong>{savedHandle}</strong>. Badge is permanent.</>
              ) : (
                <>Handle <strong>{savedHandle}</strong> claimed. You can post in lounges now.</>
              )}
            </p>
            <div className="ob-success-actions">
              <Link href={`/trajectory/${encodeURIComponent(savedHandle)}`} className="ob-btn-primary">
                See my trajectory →
              </Link>
              <Link href="/lounges/ap-bio" className="ob-btn-ghost">Go post in AP Bio →</Link>
            </div>
          </div>
        )}

        {authStatus === "in" && !savedHandle && (
          <>
            <div className="ob-steps" aria-hidden="true">
              {[0, 1, 2, 3].map((i) => (
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
                <p className="ob-hint">Up next: the part that makes you actually visible — the trajectory ritual.</p>
                <div className="ob-row">
                  <button type="button" onClick={() => setStep(1)} className="ob-btn-ghost">← Back</button>
                  <button type="button" onClick={() => setStep(3)} disabled={!canAdvance2} className="ob-btn-primary">
                    NEXT →
                  </button>
                </div>
              </section>
            )}

            {step === 3 && (
              <section className="ob-section ob-ritual">
                <div className="ob-ritual-stamp">
                  <span className="ob-ritual-pulse" />
                  <span>TRAJECTORY RITUAL · FOUNDING CIRCLE</span>
                </div>
                <h3 className="ob-ritual-title">
                  Say the thing <em>out loud</em>.
                </h3>
                <p className="ob-ritual-sub">
                  Four questions. Complete all four + you're under 100 → <em>Founding Circle</em> badge. Permanent.
                  Skip any one → still in the cohort, just no circle.
                </p>

                <label className="ob-label">Dream school <span className="ob-label-hint">where you'd actually go</span></label>
                <input
                  type="text"
                  value={dreamSchool}
                  onChange={(e) => setDreamSchool(e.target.value)}
                  maxLength={120}
                  placeholder="e.g. Stanford · MIT · Johns Hopkins BME"
                  className="ob-ritual-input"
                />

                <label className="ob-label">Intended field</label>
                <input
                  type="text"
                  value={intendedField}
                  onChange={(e) => setIntendedField(e.target.value)}
                  maxLength={120}
                  placeholder="e.g. neuro / ML research, edtech, biotech founder"
                  className="ob-ritual-input"
                />

                <label className="ob-label">Current obsession <span className="ob-label-hint">what you can't stop reading about</span></label>
                <input
                  type="text"
                  value={currentObsession}
                  onChange={(e) => setCurrentObsession(e.target.value)}
                  maxLength={240}
                  placeholder="e.g. CRISPR base editing, GPT internals, longevity research"
                  className="ob-ritual-input"
                />

                <label className="ob-label">What are you building? <span className="ob-label-hint">project, paper, company — anything</span></label>
                <textarea
                  rows={3}
                  value={buildingWhat}
                  onChange={(e) => setBuildingWhat(e.target.value)}
                  maxLength={400}
                  placeholder="One paragraph. Be specific."
                  className="ob-ritual-input ob-ritual-textarea"
                />

                <div className={`ob-ritual-meter ${ritualComplete ? "is-complete" : ""}`}>
                  {ritualComplete ? (
                    <span>◈ <strong>Founding Circle</strong> eligible. Hit claim.</span>
                  ) : (
                    <span>Fill all four to qualify for <strong>Founding Circle</strong>. ({[dreamSchool, intendedField, currentObsession, buildingWhat].filter((s) => s.trim().length > 0).length}/4)</span>
                  )}
                </div>

                {error && <div className="ob-error">{error}</div>}
                <div className="ob-row">
                  <button type="button" onClick={() => setStep(2)} className="ob-btn-ghost">← Back</button>
                  <button type="button" onClick={() => void submit()} disabled={!canSubmit} className="ob-btn-primary">
                    {saving ? "Claiming…" : "CLAIM HANDLE →"}
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

        .ob-cohort {
          margin-bottom: 1.3rem;
          padding: 0.9rem 1rem;
          border: 1px solid rgba(244,201,93,0.3);
          background: rgba(244,201,93,0.05);
          border-radius: 0.6rem;
        }
        .ob-cohort-row {
          display: flex; align-items: baseline; gap: 0.6rem;
          margin-bottom: 0.55rem;
        }
        .ob-cohort-num {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 2rem;
          font-weight: 600;
          color: #F4C95D;
          line-height: 1;
          text-shadow: 0 0 16px rgba(244,201,93,0.35);
        }
        .ob-cohort-label {
          font-family: ui-monospace, monospace;
          font-size: 0.78rem;
          color: rgba(216,217,230,0.85);
          letter-spacing: 0.04em;
        }
        .ob-cohort-label em {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 1.05em;
          color: #F4C95D;
        }
        .ob-cohort-bar {
          height: 6px;
          background: rgba(255,255,255,0.06);
          border-radius: 3px;
          overflow: hidden;
          margin-bottom: 0.55rem;
        }
        .ob-cohort-fill {
          height: 100%;
          background: linear-gradient(90deg, #F4C95D 0%, rgba(244,201,93,0.6) 100%);
          box-shadow: 0 0 8px rgba(244,201,93,0.5);
          transition: width 0.35s;
        }
        .ob-cohort-hint {
          margin: 0;
          font-family: ui-monospace, monospace;
          font-size: 0.7rem;
          color: rgba(216,217,230,0.65);
          line-height: 1.5;
        }
        .ob-cohort-hint em {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          color: #F4C95D;
        }
        .ob-cohort-closed {
          color: rgba(148,163,184,0.7);
          font-family: ui-monospace, monospace;
          font-size: 0.78rem;
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
          line-height: 1.55;
          word-break: break-word;
        }

        .ob-success {
          display: flex; flex-direction: column; align-items: center;
          text-align: center; gap: 0.3rem;
          padding: 0.5rem 0.5rem 0.25rem;
        }
        .ob-success-glyph {
          font-size: 2.4rem;
          color: #5eead4;
          text-shadow: 0 0 24px rgba(94,234,212,0.5);
          margin-bottom: 0.3rem;
        }
        .ob-success-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.8rem; font-weight: 600;
          color: #f3f3fb; margin: 0;
          line-height: 1.1;
        }
        .ob-success-title em { font-style: italic; color: #5eead4; }
        .ob-success-sub {
          color: rgba(216,217,230,0.85);
          font-size: 0.9rem;
          margin: 0.4rem 0 1.1rem;
        }
        .ob-success-sub strong {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-weight: 600;
          color: #5eead4;
        }
        .ob-success-actions {
          display: flex; gap: 0.55rem; flex-wrap: wrap; justify-content: center;
        }
        .ob-success-actions .ob-btn-primary,
        .ob-success-actions .ob-btn-ghost { text-decoration: none; display: inline-flex; }
        .ob-success-glyph.is-circle {
          color: #FF6B5B;
          text-shadow: 0 0 28px rgba(255,107,91,0.6);
        }

        .ob-ritual {
          padding: 1.05rem 1.1rem 0.85rem;
          border: 1px solid rgba(255,107,91,0.32);
          border-radius: 0.75rem;
          background:
            radial-gradient(circle at 12% 0%, rgba(255,107,91,0.08), transparent 55%),
            rgba(255,107,91,0.02);
        }
        .ob-ritual-stamp {
          display: inline-flex; align-items: center; gap: 0.5rem;
          font-family: ui-monospace, 'JetBrains Mono', monospace;
          font-size: 0.62rem; font-weight: 800;
          letter-spacing: 0.24em; text-transform: uppercase;
          color: #FF6B5B;
          text-shadow: 0 0 10px rgba(255,107,91,0.5);
          margin-bottom: 0.6rem;
        }
        .ob-ritual-pulse {
          width: 7px; height: 7px; border-radius: 50%;
          background: #FF6B5B;
          box-shadow: 0 0 10px rgba(255,107,91,0.7);
          animation: ob-pulse 1.6s ease-in-out infinite;
        }
        @keyframes ob-pulse {
          0%,100% { opacity: 0.55; transform: scale(0.85); }
          50%     { opacity: 1;   transform: scale(1.2); }
        }
        .ob-ritual-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.45rem; font-weight: 600;
          color: #f3f3fb;
          margin: 0 0 0.35rem;
          line-height: 1.15;
        }
        .ob-ritual-title em { font-style: italic; color: #FF6B5B; text-shadow: 0 0 12px rgba(255,107,91,0.35); }
        .ob-ritual-sub {
          font-size: 0.85rem;
          color: rgba(216,217,230,0.78);
          margin: 0 0 1rem;
          line-height: 1.55;
        }
        .ob-ritual-sub em {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          color: #FF6B5B;
        }
        .ob-ritual-input {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 0.4rem;
          padding: 0.55rem 0.75rem;
          color: #f3f3fb;
          font-family: inherit;
          font-size: 0.92rem;
          outline: none;
          margin-bottom: 0.5rem;
          transition: border-color 0.15s, box-shadow 0.2s;
        }
        .ob-ritual-input:focus {
          border-color: #FF6B5B;
          box-shadow: 0 0 0 1px #FF6B5B, 0 0 14px rgba(255,107,91,0.25);
        }
        .ob-ritual-textarea {
          resize: vertical;
          line-height: 1.55;
          min-height: 80px;
        }
        .ob-ritual-meter {
          font-family: ui-monospace, monospace;
          font-size: 0.74rem;
          color: rgba(148,163,184,0.7);
          padding: 0.5rem 0.7rem;
          border-radius: 0.4rem;
          background: rgba(255,255,255,0.02);
          border: 1px dashed rgba(255,107,91,0.25);
          margin: 0.3rem 0 0.4rem;
        }
        .ob-ritual-meter.is-complete {
          color: #FF6B5B;
          border-color: rgba(255,107,91,0.55);
          background: rgba(255,107,91,0.06);
          text-shadow: 0 0 6px rgba(255,107,91,0.25);
        }
        .ob-ritual-meter strong {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-weight: 600;
          color: #FF6B5B;
          margin: 0 0.05em;
        }
      `}</style>
    </main>
  );
}
