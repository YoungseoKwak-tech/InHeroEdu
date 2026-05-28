"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { authFetch, getClientSession } from "@/lib/client-auth";
import { VERIFICATION_KIND_META, type VerificationKind, type VerificationPublic } from "@/lib/verifications";

interface AdminVerification extends VerificationPublic {
  submitter: { handle: string; graduationYear: number | null } | null;
}

export default function AdminVerificationsPage() {
  const [authStatus, setAuthStatus] = useState<"loading" | "out" | "denied" | "ok">("loading");
  const [statusFilter, setStatusFilter] = useState<"pending" | "approved" | "rejected">("pending");
  const [items, setItems] = useState<AdminVerification[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function fetchList(filter: typeof statusFilter) {
    setLoading(true);
    try {
      const res = await authFetch(`/api/admin/verifications?status=${filter}`);
      const json = await res.json();
      if (res.status === 401 || res.status === 403) {
        setAuthStatus("denied");
        return;
      }
      if (!res.ok || !json.ok) throw new Error(json.error ?? `HTTP ${res.status}`);
      setItems(json.verifications ?? []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let mounted = true;
    async function bootstrap() {
      const session = await getClientSession();
      if (!mounted) return;
      if (!session) { setAuthStatus("out"); return; }
      setAuthStatus("ok");
      await fetchList(statusFilter);
    }
    void bootstrap();
    return () => { mounted = false; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (authStatus === "ok") void fetchList(statusFilter);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter]);

  async function decide(id: string, decision: "approve" | "reject", declineReason?: string) {
    if (busyId) return;
    setBusyId(id);
    try {
      const res = await authFetch(`/api/admin/verifications/${id}/decide`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ decision, declineReason: declineReason ?? null }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error ?? `HTTP ${res.status}`);
      setItems((prev) => prev.filter((v) => v.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusyId(null);
    }
  }

  function onReject(id: string) {
    const reason = window.prompt("Decline reason (shown to user):", "");
    if (reason == null) return;
    void decide(id, "reject", reason);
  }

  return (
    <main className="av-root">
      <div className="av-shell">
        <Link href="/" className="av-back">← Home</Link>
        <h1 className="av-title">Verification queue</h1>
        <p className="av-sub">Approve carefully. Scarcity is the product.</p>

        {authStatus === "loading" && <div className="av-loading">Loading…</div>}
        {authStatus === "out" && (
          <div className="av-gate"><strong>Sign in as admin.</strong></div>
        )}
        {authStatus === "denied" && (
          <div className="av-gate">
            <strong>Not authorized.</strong>
            <p>Set ADMIN_EMAILS env var in Vercel to include your account email.</p>
          </div>
        )}

        {authStatus === "ok" && (
          <>
            <div className="av-tabs">
              {(["pending", "approved", "rejected"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setStatusFilter(s)}
                  className={`av-tab ${statusFilter === s ? "is-active" : ""}`}
                >
                  {s.toUpperCase()}
                </button>
              ))}
            </div>

            {error && <div className="av-error">{error}</div>}
            {loading && <div className="av-loading">Loading {statusFilter}…</div>}
            {!loading && items.length === 0 && (
              <div className="av-empty">No {statusFilter} verifications.</div>
            )}

            <ul className="av-list">
              {items.map((v) => {
                const meta = VERIFICATION_KIND_META[v.kind as VerificationKind];
                return (
                  <li key={v.id} className="av-item" style={{ ["--accent" as string]: meta.accent }}>
                    <div className="av-item-head">
                      <span className="av-item-glyph">{meta.glyph}</span>
                      <span className="av-item-kind">{meta.label}</span>
                      <span className="av-item-status">{v.status.toUpperCase()}</span>
                    </div>
                    <div className="av-item-sub">
                      {v.submitter ? (
                        <Link href={`/trajectory/${encodeURIComponent(v.submitter.handle)}`} className="av-submitter">
                          @{v.submitter.handle}
                          {v.submitter.graduationYear && ` · '${String(v.submitter.graduationYear).slice(-2)}`}
                        </Link>
                      ) : (
                        <span className="av-submitter">— unknown handle —</span>
                      )}
                      <span className="av-time">submitted {new Date(v.submittedAt).toLocaleString()}</span>
                    </div>
                    {v.schoolName && <div className="av-school">{v.schoolName}</div>}
                    <p className="av-claim">{v.claimText}</p>
                    {v.evidenceUrl && (
                      <a href={v.evidenceUrl} target="_blank" rel="noopener noreferrer" className="av-evidence">
                        {v.evidenceUrl}
                      </a>
                    )}
                    {v.declineReason && (
                      <div className="av-reason">Reason: {v.declineReason}</div>
                    )}
                    {v.status === "pending" && (
                      <div className="av-actions">
                        <button
                          type="button"
                          disabled={busyId === v.id}
                          onClick={() => void decide(v.id, "approve")}
                          className="av-approve"
                        >
                          {busyId === v.id ? "…" : "✓ Approve"}
                        </button>
                        <button
                          type="button"
                          disabled={busyId === v.id}
                          onClick={() => onReject(v.id)}
                          className="av-reject"
                        >
                          ✕ Reject
                        </button>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>

      <style>{`
        .av-root {
          min-height: 100vh;
          padding: 3rem 1.25rem 5rem;
          background: #050610;
          color: #d8d9e6;
          font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif;
        }
        .av-shell { max-width: 46rem; margin: 0 auto; }
        .av-back {
          display: inline-block;
          font-family: ui-monospace, monospace;
          font-size: 0.68rem; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(148,163,184,0.7);
          text-decoration: none;
          margin-bottom: 1.1rem;
        }
        .av-back:hover { color: #5eead4; }
        .av-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem; font-weight: 600;
          color: #f3f3fb; margin: 0 0 0.4rem;
          line-height: 1.1;
        }
        .av-sub { font-size: 0.9rem; color: rgba(216,217,230,0.7); margin: 0 0 1.5rem; }

        .av-loading, .av-empty {
          padding: 1.2rem;
          font-family: ui-monospace, monospace;
          font-size: 0.8rem;
          color: rgba(148,163,184,0.6);
          text-align: center;
        }
        .av-gate {
          padding: 1.2rem;
          background: rgba(244,201,93,0.06);
          border: 1px solid rgba(244,201,93,0.25);
          border-radius: 0.5rem;
          color: #F4C95D;
          font-size: 0.88rem;
          line-height: 1.55;
        }
        .av-error {
          padding: 0.6rem 0.75rem;
          background: rgba(255,107,91,0.08);
          border: 1px solid rgba(255,107,91,0.3);
          color: #ff8b7e;
          font-family: ui-monospace, monospace;
          font-size: 0.78rem;
          border-radius: 0.4rem;
          margin-bottom: 0.8rem;
        }

        .av-tabs { display: flex; gap: 0.4rem; margin-bottom: 1rem; }
        .av-tab {
          font-family: ui-monospace, monospace;
          font-size: 0.68rem; font-weight: 700;
          letter-spacing: 0.18em;
          padding: 0.45rem 0.75rem;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 999px;
          color: rgba(216,217,230,0.7);
          cursor: pointer;
        }
        .av-tab:hover { color: #5eead4; border-color: rgba(94,234,212,0.4); }
        .av-tab.is-active {
          color: #0a0a10;
          background: #5eead4;
          border-color: #5eead4;
        }

        .av-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.85rem; }
        .av-item {
          --accent: #5eead4;
          padding: 0.95rem 1.05rem 0.9rem;
          background: rgba(8,10,18,0.7);
          border: 1px solid rgba(255,255,255,0.06);
          border-left: 2px solid var(--accent);
          border-radius: 0 0.55rem 0.55rem 0;
        }
        .av-item-head {
          display: flex; align-items: center; gap: 0.5rem;
          margin-bottom: 0.3rem;
          flex-wrap: wrap;
        }
        .av-item-glyph {
          font-size: 1.05rem;
          color: var(--accent);
          text-shadow: 0 0 8px color-mix(in srgb, var(--accent) 45%, transparent);
        }
        .av-item-kind {
          font-family: ui-monospace, monospace;
          font-size: 0.75rem; font-weight: 700;
          letter-spacing: 0.12em;
          color: rgba(216,217,230,0.92);
        }
        .av-item-status {
          margin-left: auto;
          font-family: ui-monospace, monospace;
          font-size: 0.58rem; font-weight: 800;
          letter-spacing: 0.22em;
          color: rgba(148,163,184,0.7);
        }
        .av-item-sub {
          display: flex; gap: 0.5rem; flex-wrap: wrap;
          font-family: ui-monospace, monospace;
          font-size: 0.7rem;
          color: rgba(148,163,184,0.65);
          margin-bottom: 0.45rem;
        }
        .av-submitter {
          color: var(--accent);
          text-decoration: none;
          font-weight: 700;
          letter-spacing: 0.04em;
        }
        .av-submitter:hover { text-decoration: underline; }
        .av-time { color: rgba(148,163,184,0.6); }
        .av-school {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 1.05rem;
          color: var(--accent);
          margin-bottom: 0.3rem;
        }
        .av-claim {
          font-size: 0.9rem;
          color: rgba(216,217,230,0.88);
          margin: 0 0 0.5rem;
          line-height: 1.55;
          white-space: pre-wrap;
        }
        .av-evidence {
          display: block;
          font-family: ui-monospace, monospace;
          font-size: 0.74rem;
          color: var(--accent);
          text-decoration: none;
          word-break: break-all;
          margin-bottom: 0.5rem;
          padding: 0.35rem 0.5rem;
          background: rgba(255,255,255,0.02);
          border-radius: 0.3rem;
          border: 1px solid rgba(255,255,255,0.06);
        }
        .av-evidence:hover { text-decoration: underline; }
        .av-reason {
          font-family: ui-monospace, monospace;
          font-size: 0.74rem;
          color: #ff8b7e;
          padding: 0.4rem 0.6rem;
          background: rgba(255,107,91,0.08);
          border: 1px solid rgba(255,107,91,0.25);
          border-radius: 0.3rem;
          margin: 0.3rem 0;
        }
        .av-actions { display: flex; gap: 0.45rem; margin-top: 0.5rem; }
        .av-approve, .av-reject {
          font-family: ui-monospace, monospace;
          font-size: 0.7rem; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          padding: 0.55rem 0.9rem;
          border-radius: 0.4rem;
          cursor: pointer;
          border: 0;
          transition: filter 0.15s, box-shadow 0.2s;
        }
        .av-approve { background: #5DCAA5; color: #0a0a10; }
        .av-approve:hover:not(:disabled) { filter: brightness(1.08); box-shadow: 0 0 18px rgba(93,202,165,0.45); }
        .av-reject { background: transparent; color: #ff8b7e; border: 1px solid rgba(255,107,91,0.35); }
        .av-reject:hover:not(:disabled) { background: rgba(255,107,91,0.08); border-color: #ff8b7e; }
        .av-approve:disabled, .av-reject:disabled { opacity: 0.4; cursor: default; }
      `}</style>
    </main>
  );
}
