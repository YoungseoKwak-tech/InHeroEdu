"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { authFetch, getClientSession } from "@/lib/client-auth";
import {
  VERIFICATION_KINDS,
  VERIFICATION_KIND_META,
  type VerificationKind,
  type VerificationPublic,
} from "@/lib/verifications";

export default function VerifyPage() {
  const [authStatus, setAuthStatus] = useState<"loading" | "out" | "no_profile" | "ok">("loading");
  const [mine, setMine] = useState<VerificationPublic[]>([]);

  const [kind, setKind] = useState<VerificationKind>("school");
  const [claimText, setClaimText] = useState("");
  const [evidenceUrl, setEvidenceUrl] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadMine() {
    try {
      const res = await authFetch("/api/verifications");
      const json = await res.json();
      if (res.ok && json.ok) setMine(json.verifications ?? []);
    } catch { /* ignore */ }
  }

  useEffect(() => {
    let mounted = true;
    async function bootstrap() {
      try {
        const session = await getClientSession();
        if (!mounted) return;
        if (!session) { setAuthStatus("out"); return; }
        const res = await fetch("/api/profile/me", {
          headers: { Authorization: `Bearer ${session.access_token}` },
          cache: "no-store",
        });
        const json = await res.json().catch(() => ({}));
        if (!mounted) return;
        if (json?.profile?.handle) {
          setAuthStatus("ok");
          await loadMine();
        } else {
          setAuthStatus("no_profile");
        }
      } catch {
        if (mounted) setAuthStatus("out");
      }
    }
    void bootstrap();
    return () => { mounted = false; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const meta = VERIFICATION_KIND_META[kind];
  const claimValid = claimText.trim().length >= 10 && claimText.trim().length <= 800;
  const schoolValid = !meta.needsSchoolName || (schoolName.trim().length >= 2 && schoolName.trim().length <= 80);
  const canSubmit = authStatus === "ok" && claimValid && schoolValid && !submitting;

  async function submit() {
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await authFetch("/api/verifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind,
          claimText: claimText.trim(),
          evidenceUrl: evidenceUrl.trim() || null,
          schoolName: meta.needsSchoolName ? schoolName.trim() : null,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error ?? `HTTP ${res.status}`);
      setMine((prev) => [json.verification, ...prev]);
      setClaimText("");
      setEvidenceUrl("");
      setSchoolName("");
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="vp-root" style={{ ["--accent" as string]: meta.accent }}>
      <div className="vp-shell">
        <Link href="/trajectory" className="vp-back">← Trajectory</Link>
        <div className="vp-stamp">
          <span className="vp-pulse" />
          <span>VERIFICATION · SCARCE BY DESIGN</span>
        </div>
        <h1 className="vp-title">
          Prove you're <em>actually</em> who you say.
        </h1>
        <p className="vp-sub">
          One fake Ivy admit kills the brand. Verifications are scarce on purpose.
          Verified Student tier shows up across your profile, lounge posts, and clubs.
        </p>

        {authStatus === "loading" && <div className="vp-loading">Loading…</div>}
        {authStatus === "out" && (
          <div className="vp-gate">
            <strong>Sign in to submit a verification.</strong>
          </div>
        )}
        {authStatus === "no_profile" && (
          <div className="vp-gate">
            <strong>Claim your trajectory handle first.</strong>
            <Link href="/onboarding" className="vp-btn-yellow">Claim handle →</Link>
          </div>
        )}

        {authStatus === "ok" && (
          <>
            <section className="vp-form">
              <label className="vp-label">Verification kind</label>
              <div className="vp-kinds">
                {VERIFICATION_KINDS.map((k) => {
                  const m = VERIFICATION_KIND_META[k];
                  return (
                    <button
                      key={k}
                      type="button"
                      onClick={() => setKind(k)}
                      className={`vp-kind ${kind === k ? "is-active" : ""}`}
                      style={{ ["--accent" as string]: m.accent }}
                    >
                      <span className="vp-kind-glyph">{m.glyph}</span>
                      <span className="vp-kind-label">{m.label}</span>
                    </button>
                  );
                })}
              </div>

              <p className="vp-helper">{meta.helper}</p>

              {meta.needsSchoolName && (
                <>
                  <label className="vp-label">School name <span className="vp-len">{schoolName.length}/80</span></label>
                  <input
                    type="text"
                    className="vp-input"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    maxLength={80}
                    placeholder="Cornell University · Stanford University · Phillips Exeter"
                  />
                </>
              )}

              <label className="vp-label">Your claim <span className="vp-len">{claimText.length}/800</span></label>
              <textarea
                rows={4}
                className="vp-input vp-textarea"
                value={claimText}
                onChange={(e) => setClaimText(e.target.value)}
                maxLength={800}
                placeholder={`Brief context. e.g., "Cornell ECE '28, accepted RD 2024. .edu email below."`}
              />

              <label className="vp-label">Evidence URL <span className="vp-label-hint">optional but strongly recommended</span></label>
              <input
                type="url"
                className="vp-input vp-input-mono"
                value={evidenceUrl}
                onChange={(e) => setEvidenceUrl(e.target.value)}
                placeholder="https://..."
              />
              <p className="vp-helper-quiet">{meta.evidenceHint}</p>

              {error && <div className="vp-error">{error}</div>}

              <button type="button" disabled={!canSubmit} onClick={() => void submit()} className="vp-submit">
                {submitting ? "Submitting…" : "Submit for review →"}
              </button>
            </section>

            <section className="vp-mine">
              <h2 className="vp-mine-title">Your verifications</h2>
              {mine.length === 0 ? (
                <p className="vp-empty">No submissions yet.</p>
              ) : (
                <ul className="vp-list">
                  {mine.map((v) => (
                    <li key={v.id} className={`vp-item vp-status-${v.status}`}>
                      <div className="vp-item-head">
                        <span className="vp-item-kind">{v.kindLabel}</span>
                        <span className="vp-item-status">{v.status.toUpperCase()}</span>
                      </div>
                      {v.schoolName && <div className="vp-item-school">{v.schoolName}</div>}
                      <p className="vp-item-claim">{v.claimText}</p>
                      {v.evidenceUrl && (
                        <a href={v.evidenceUrl} target="_blank" rel="noopener noreferrer" className="vp-item-link">
                          {v.evidenceUrl}
                        </a>
                      )}
                      {v.declineReason && (
                        <div className="vp-item-reason">Decline reason: {v.declineReason}</div>
                      )}
                      <div className="vp-item-time">
                        submitted {new Date(v.submittedAt).toLocaleDateString()}
                        {v.reviewedAt && ` · reviewed ${new Date(v.reviewedAt).toLocaleDateString()}`}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </>
        )}
      </div>

      <style>{`
        .vp-root {
          --accent: #7DD3FC;
          min-height: 100vh;
          padding: 3rem 1.25rem 5rem;
          background: radial-gradient(ellipse 70% 40% at 50% 0%, color-mix(in srgb, var(--accent) 10%, transparent), transparent 60%), #050610;
          color: #d8d9e6;
          font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif;
        }
        .vp-shell {
          max-width: 38rem; margin: 0 auto;
          padding: 1.85rem 1.75rem 1.65rem;
          background: linear-gradient(180deg, #0a0e1a 0%, #050610 100%);
          border: 1px solid color-mix(in srgb, var(--accent) 22%, transparent);
          border-radius: 1rem;
          box-shadow: 0 32px 80px rgba(0,0,0,0.7);
        }
        .vp-back {
          display: inline-block;
          font-family: ui-monospace, monospace;
          font-size: 0.68rem; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(148,163,184,0.7);
          text-decoration: none;
          margin-bottom: 1.1rem;
          transition: color 0.15s;
        }
        .vp-back:hover { color: var(--accent); }
        .vp-stamp {
          display: inline-flex; align-items: center; gap: 0.55rem;
          font-family: ui-monospace, monospace;
          font-size: 0.62rem; font-weight: 800;
          letter-spacing: 0.24em; text-transform: uppercase;
          color: var(--accent);
          text-shadow: 0 0 10px color-mix(in srgb, var(--accent) 45%, transparent);
          margin-bottom: 0.7rem;
        }
        .vp-pulse {
          width: 7px; height: 7px; border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 12px color-mix(in srgb, var(--accent) 65%, transparent);
          animation: vp-pulse 1.6s ease-in-out infinite;
        }
        @keyframes vp-pulse {
          0%,100% { opacity: 0.55; transform: scale(0.85); }
          50%     { opacity: 1;   transform: scale(1.2); }
        }
        .vp-title {
          font-family: 'Cormorant Garamond', 'Georgia', serif;
          font-size: 1.8rem; font-weight: 600;
          color: #f3f3fb; margin: 0 0 0.5rem;
          letter-spacing: -0.015em; line-height: 1.15;
        }
        .vp-title em { font-style: italic; color: var(--accent); }
        .vp-sub { font-size: 0.92rem; color: rgba(216,217,230,0.78); margin: 0 0 1.4rem; line-height: 1.55; max-width: 32rem; }

        .vp-loading, .vp-gate {
          padding: 0.85rem 1rem;
          background: rgba(244,201,93,0.06);
          border: 1px solid rgba(244,201,93,0.25);
          border-radius: 0.5rem;
          color: #F4C95D;
          font-size: 0.85rem;
        }
        .vp-gate { display: flex; flex-direction: column; gap: 0.6rem; }
        .vp-btn-yellow {
          display: inline-block;
          background: #F4C95D; color: #0a0a10;
          padding: 0.55rem 0.85rem; border-radius: 0.4rem;
          font-family: ui-monospace, monospace;
          font-size: 0.72rem; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; text-decoration: none;
        }

        .vp-form { display: flex; flex-direction: column; gap: 0.6rem; margin-bottom: 2rem; }
        .vp-label {
          font-family: ui-monospace, monospace;
          font-size: 0.65rem; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(148,163,184,0.85);
          display: flex; justify-content: space-between; align-items: center;
          margin-top: 0.3rem;
        }
        .vp-label-hint { color: rgba(148,163,184,0.55); letter-spacing: 0.1em; text-transform: none; font-weight: 500; }
        .vp-len { font-weight: 500; color: rgba(148,163,184,0.55); letter-spacing: 0.05em; text-transform: none; }

        .vp-kinds { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 0.4rem; }
        .vp-kind {
          --accent: #5eead4;
          display: flex; align-items: center; gap: 0.5rem;
          padding: 0.6rem 0.7rem;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 0.5rem;
          cursor: pointer;
          font-family: inherit;
          color: rgba(216,217,230,0.85);
          font-size: 0.82rem;
          transition: border-color 0.15s, background 0.15s, color 0.15s;
        }
        .vp-kind:hover { border-color: color-mix(in srgb, var(--accent) 40%, transparent); }
        .vp-kind.is-active {
          color: var(--accent);
          border-color: var(--accent);
          background: color-mix(in srgb, var(--accent) 12%, transparent);
          box-shadow: 0 0 0 1px var(--accent);
        }
        .vp-kind-glyph {
          font-size: 0.95rem;
          color: var(--accent);
          text-shadow: 0 0 8px color-mix(in srgb, var(--accent) 50%, transparent);
        }
        .vp-kind-label { font-weight: 600; letter-spacing: 0.02em; }

        .vp-helper {
          font-size: 0.84rem;
          color: rgba(216,217,230,0.8);
          margin: 0.45rem 0 0.2rem;
          line-height: 1.5;
        }
        .vp-helper-quiet {
          font-family: ui-monospace, monospace;
          font-size: 0.72rem;
          color: rgba(148,163,184,0.65);
          margin: 0;
          line-height: 1.5;
        }

        .vp-input {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 0.45rem;
          padding: 0.65rem 0.8rem;
          color: #f3f3fb;
          font-family: inherit;
          font-size: 0.92rem;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.2s;
        }
        .vp-input:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 1px var(--accent), 0 0 14px color-mix(in srgb, var(--accent) 25%, transparent);
        }
        .vp-input-mono { font-family: ui-monospace, monospace; font-size: 0.85rem; }
        .vp-textarea { resize: vertical; min-height: 90px; line-height: 1.55; }

        .vp-error {
          padding: 0.55rem 0.7rem;
          background: rgba(255,107,91,0.08);
          border: 1px solid rgba(255,107,91,0.3);
          color: #ff8b7e;
          font-family: ui-monospace, monospace;
          font-size: 0.78rem;
          border-radius: 0.4rem;
          line-height: 1.55;
          word-break: break-word;
        }

        .vp-submit {
          margin-top: 0.5rem;
          align-self: flex-start;
          font-family: ui-monospace, monospace;
          font-size: 0.74rem; font-weight: 700;
          letter-spacing: 0.16em; text-transform: uppercase;
          padding: 0.7rem 1.1rem;
          color: #0a0a10; background: var(--accent);
          border: 0; border-radius: 0.45rem;
          cursor: pointer;
          transition: filter 0.15s, box-shadow 0.2s;
        }
        .vp-submit:hover:not(:disabled) { filter: brightness(1.08); box-shadow: 0 0 22px color-mix(in srgb, var(--accent) 50%, transparent); }
        .vp-submit:disabled { opacity: 0.4; cursor: default; }

        .vp-mine { padding-top: 1.4rem; border-top: 1px solid rgba(255,255,255,0.05); }
        .vp-mine-title {
          font-family: ui-monospace, monospace;
          font-size: 0.62rem; font-weight: 700;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: rgba(148,163,184,0.7);
          margin: 0 0 0.8rem;
        }
        .vp-empty {
          font-family: ui-monospace, monospace;
          font-size: 0.78rem;
          color: rgba(148,163,184,0.6);
          margin: 0;
        }
        .vp-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.65rem; }
        .vp-item {
          padding: 0.7rem 0.85rem;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-left: 2px solid rgba(255,255,255,0.1);
          border-radius: 0 0.4rem 0.4rem 0;
        }
        .vp-status-pending  { border-left-color: #F4C95D; }
        .vp-status-approved { border-left-color: #5DCAA5; }
        .vp-status-rejected { border-left-color: #ff8b7e; }
        .vp-item-head { display: flex; justify-content: space-between; gap: 0.5rem; margin-bottom: 0.3rem; }
        .vp-item-kind {
          font-family: ui-monospace, monospace;
          font-size: 0.7rem; font-weight: 700;
          letter-spacing: 0.12em;
          color: rgba(216,217,230,0.9);
        }
        .vp-item-status {
          font-family: ui-monospace, monospace;
          font-size: 0.6rem; font-weight: 800;
          letter-spacing: 0.2em;
        }
        .vp-status-pending  .vp-item-status { color: #F4C95D; }
        .vp-status-approved .vp-item-status { color: #5DCAA5; }
        .vp-status-rejected .vp-item-status { color: #ff8b7e; }
        .vp-item-school {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 0.95rem;
          color: var(--accent);
          margin-bottom: 0.25rem;
        }
        .vp-item-claim {
          font-size: 0.85rem;
          color: rgba(216,217,230,0.82);
          margin: 0 0 0.35rem;
          line-height: 1.5;
          white-space: pre-wrap;
        }
        .vp-item-link {
          display: block;
          font-family: ui-monospace, monospace;
          font-size: 0.72rem;
          color: var(--accent);
          text-decoration: none;
          word-break: break-all;
          margin-bottom: 0.3rem;
        }
        .vp-item-link:hover { text-decoration: underline; }
        .vp-item-reason {
          font-family: ui-monospace, monospace;
          font-size: 0.72rem;
          color: #ff8b7e;
          padding: 0.35rem 0.5rem;
          background: rgba(255,107,91,0.08);
          border: 1px solid rgba(255,107,91,0.25);
          border-radius: 0.3rem;
          margin: 0.3rem 0;
        }
        .vp-item-time {
          font-family: ui-monospace, monospace;
          font-size: 0.66rem;
          color: rgba(148,163,184,0.55);
          margin-top: 0.3rem;
        }
      `}</style>
    </main>
  );
}
