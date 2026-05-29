"use client";

import { useEffect, useState } from "react";
import { authFetch } from "@/lib/client-auth";
import ConfirmDialog from "@/components/shared/ConfirmDialog";

interface CompEmailRow {
  email: string;
  note: string | null;
  added_by: string | null;
  created_at: string;
}

export default function AdminCompEmailsPage() {
  const [rows, setRows] = useState<CompEmailRow[]>([]);
  const [envEmails, setEnvEmails] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [pendingRemoveEmail, setPendingRemoveEmail] = useState<string | null>(null);
  const [removing, setRemoving] = useState(false);
  const [msg, setMsg] = useState<{ kind: "ok" | "error"; text: string } | null>(null);

  async function load() {
    setLoading(true);
    try {
      const res = await authFetch("/api/admin/comp-emails");
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error ?? "failed to load");
      setRows(json.db ?? []);
      setEnvEmails(json.envEmails ?? []);
    } catch (err) {
      const m = err instanceof Error ? err.message : String(err);
      setMsg({ kind: "error", text: m });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void load(); }, []);

  async function add(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || submitting) return;
    setSubmitting(true);
    setMsg(null);
    try {
      const res = await authFetch("/api/admin/comp-emails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), note: note.trim() || null }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error ?? "add failed");
      setEmail("");
      setNote("");
      setMsg({ kind: "ok", text: `Added ${json.row.email}` });
      await load();
    } catch (err) {
      const m = err instanceof Error ? err.message : String(err);
      setMsg({ kind: "error", text: m });
    } finally {
      setSubmitting(false);
    }
  }

  async function remove(target: string) {
    if (removing) return;
    setRemoving(true);
    setMsg(null);
    try {
      const res = await authFetch("/api/admin/comp-emails", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: target }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error ?? "remove failed");
      setMsg({ kind: "ok", text: `Removed ${target}` });
      setPendingRemoveEmail(null);
      await load();
    } catch (err) {
      const m = err instanceof Error ? err.message : String(err);
      setMsg({ kind: "error", text: m });
    } finally {
      setRemoving(false);
    }
  }

  return (
    <div className="cea-root">
      <div className="cea-shell">
        <header className="cea-header">
          <div className="cea-eyebrow">
            <span className="cea-dot" />
            <span>COMPLIMENTARY ACCESS</span>
          </div>
          <h1 className="cea-title">Textbook comp emails</h1>
          <p className="cea-sub">
            These emails see every published textbook as already owned (no payment, no DB purchase row).
          </p>
        </header>

        {msg && (
          <div className={`cea-banner ${msg.kind === "error" ? "is-error" : "is-ok"}`}>
            {msg.text}
          </div>
        )}

        {/* Add form */}
        <form className="cea-form" onSubmit={add}>
          <input
            className="cea-input"
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={submitting}
            required
          />
          <input
            className="cea-input cea-input-note"
            type="text"
            placeholder="note (optional — e.g. 'beta tester', 'friend')"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            disabled={submitting}
          />
          <button
            type="submit"
            className="cea-btn"
            disabled={submitting || !email.trim()}
          >
            {submitting ? "Adding…" : "+ Add"}
          </button>
        </form>

        {/* DB-managed list */}
        <section className="cea-section">
          <div className="cea-section-head">
            <span className="cea-section-tag">DB ALLOWLIST</span>
            <span className="cea-section-count">{rows.length} email{rows.length === 1 ? "" : "s"}</span>
          </div>
          {loading ? (
            <div className="cea-empty">Loading…</div>
          ) : rows.length === 0 ? (
            <div className="cea-empty">No DB entries yet. Add one above.</div>
          ) : (
            <table className="cea-table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Note</th>
                  <th>Added</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.email}>
                    <td className="cea-email">{row.email}</td>
                    <td className="cea-note">{row.note ?? "—"}</td>
                    <td className="cea-time">{new Date(row.created_at).toLocaleDateString()}</td>
                    <td>
                      <button
                        type="button"
                        onClick={() => setPendingRemoveEmail(row.email)}
                        className="cea-remove"
                        title="Remove"
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        {/* Env floor — read-only display */}
        <section className="cea-section">
          <div className="cea-section-head">
            <span className="cea-section-tag">ENV FLOOR</span>
            <span className="cea-section-count">{envEmails.length} email{envEmails.length === 1 ? "" : "s"}</span>
          </div>
          <p className="cea-hint">
            From <code>ADMIN_EMAILS</code> + <code>COMP_TEXTBOOK_EMAILS</code> env vars. Read-only — managed in Vercel dashboard.
          </p>
          {envEmails.length === 0 ? (
            <div className="cea-empty">No env entries.</div>
          ) : (
            <ul className="cea-env-list">
              {envEmails.map((e) => (
                <li key={e} className="cea-env-item">
                  <span>{e}</span>
                  <span className="cea-env-pill">env</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <ConfirmDialog
        open={pendingRemoveEmail !== null}
        title="Remove complimentary access?"
        message={
          pendingRemoveEmail
            ? `${pendingRemoveEmail} will lose complimentary access.`
            : "This email will lose complimentary access."
        }
        confirmLabel="Remove"
        loading={removing}
        destructive
        onConfirm={() => {
          if (pendingRemoveEmail) void remove(pendingRemoveEmail);
        }}
        onCancel={() => {
          if (!removing) setPendingRemoveEmail(null);
        }}
      />

      <style>{`
        .cea-root {
          min-height: calc(100vh - 4rem);
          background: linear-gradient(180deg, #02040b 0%, #05070d 100%);
          padding: 2rem 1rem;
          color: #d8d9e6;
          font-family: 'Inter', system-ui, sans-serif;
        }
        .cea-shell {
          max-width: 56rem;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .cea-header { display: flex; flex-direction: column; gap: 0.35rem; }
        .cea-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: ui-monospace, 'JetBrains Mono', monospace;
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #5eead4;
          text-shadow: 0 0 10px rgba(94,234,212,0.45);
        }
        .cea-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #5eead4;
          box-shadow: 0 0 8px rgba(94,234,212,0.65);
          animation: cea-pulse 1.6s ease-in-out infinite;
        }
        @keyframes cea-pulse {
          0%,100% { opacity: 0.55; transform: scale(0.85); }
          50%     { opacity: 1;    transform: scale(1.12); }
        }
        .cea-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #f3f3fb;
          margin: 0;
          letter-spacing: -0.015em;
        }
        .cea-sub { font-size: 0.85rem; color: #94a3b8; margin: 0; }

        .cea-banner {
          padding: 0.55rem 0.85rem;
          border-radius: 0.5rem;
          font-family: ui-monospace, monospace;
          font-size: 0.78rem;
        }
        .cea-banner.is-ok    { background: rgba(94,234,212,0.08); color: #5eead4; border: 1px solid rgba(94,234,212,0.25); }
        .cea-banner.is-error { background: rgba(255,107,91,0.08); color: #ff8b7e; border: 1px solid rgba(255,107,91,0.3); }

        .cea-form {
          display: grid;
          grid-template-columns: 1fr 1fr auto;
          gap: 0.5rem;
          padding: 1rem;
          border-radius: 0.7rem;
          border: 1px solid rgba(94,234,212,0.15);
          background: rgba(10,14,26,0.6);
        }
        .cea-input {
          background: rgba(255,255,255,0.025);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 0.45rem;
          padding: 0.55rem 0.75rem;
          color: #f3f3fb;
          font-size: 0.85rem;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.2s;
        }
        .cea-input:focus {
          border-color: rgba(94,234,212,0.5);
          box-shadow: 0 0 0 1px rgba(94,234,212,0.4), 0 0 12px rgba(94,234,212,0.2);
        }
        .cea-btn {
          font-family: ui-monospace, monospace;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          padding: 0 1.1rem;
          color: #5eead4;
          background: rgba(94,234,212,0.08);
          border: 1px solid rgba(94,234,212,0.4);
          border-radius: 0.45rem;
          cursor: pointer;
          transition: background 0.15s, box-shadow 0.2s, color 0.15s;
        }
        .cea-btn:hover:not(:disabled) {
          color: #fff;
          background: rgba(94,234,212,0.18);
          box-shadow: 0 0 0 1px #5eead4, 0 0 14px rgba(94,234,212,0.35);
        }
        .cea-btn:disabled { opacity: 0.4; cursor: default; }

        .cea-section {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding: 1rem;
          border-radius: 0.7rem;
          border: 1px solid rgba(255,255,255,0.06);
          background: rgba(10,14,26,0.5);
        }
        .cea-section-head { display: flex; justify-content: space-between; align-items: center; }
        .cea-section-tag {
          font-family: ui-monospace, monospace;
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #5eead4;
        }
        .cea-section-count {
          font-family: ui-monospace, monospace;
          font-size: 0.7rem;
          color: rgba(148,163,184,0.65);
        }
        .cea-hint { font-size: 0.75rem; color: #64748b; margin: 0; }
        .cea-hint code {
          font-family: ui-monospace, monospace;
          font-size: 0.7rem;
          color: #c4b5fd;
          background: rgba(196,181,253,0.08);
          padding: 1px 4px;
          border-radius: 3px;
        }
        .cea-empty {
          font-family: ui-monospace, monospace;
          font-size: 0.78rem;
          color: rgba(148,163,184,0.6);
          padding: 0.5rem 0;
        }

        .cea-table { width: 100%; border-collapse: collapse; font-size: 0.85rem; }
        .cea-table th {
          text-align: left;
          font-family: ui-monospace, monospace;
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(148,163,184,0.55);
          padding: 0.45rem 0.5rem;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .cea-table td {
          padding: 0.55rem 0.5rem;
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }
        .cea-email { font-family: ui-monospace, monospace; color: #f3f3fb; }
        .cea-note  { color: #94a3b8; font-size: 0.8rem; }
        .cea-time  { font-family: ui-monospace, monospace; color: rgba(148,163,184,0.7); font-size: 0.75rem; }
        .cea-remove {
          background: none;
          border: 0;
          color: rgba(148,163,184,0.45);
          font-size: 0.95rem;
          cursor: pointer;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          transition: color 0.15s, background 0.15s;
        }
        .cea-remove:hover { color: #ff6b5b; background: rgba(255,107,91,0.08); }

        .cea-env-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.3rem; }
        .cea-env-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: ui-monospace, monospace;
          font-size: 0.82rem;
          color: #b8b9cc;
          padding: 0.35rem 0.55rem;
          border-radius: 0.35rem;
          background: rgba(255,255,255,0.02);
        }
        .cea-env-pill {
          font-size: 0.6rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(196,181,253,0.85);
          background: rgba(196,181,253,0.1);
          padding: 1px 6px;
          border-radius: 3px;
        }

        @media (max-width: 640px) {
          .cea-form { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
