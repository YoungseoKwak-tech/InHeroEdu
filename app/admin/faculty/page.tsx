"use client";

import { useEffect, useRef, useState } from "react";
import { authFetch } from "@/lib/client-auth";
import type { FacultyMeta } from "@/lib/faculty";

type FacultyRow = FacultyMeta & {
  imageUrl: string | null;
  updatedAt: string | null;
};

interface UploadState {
  facultyId: string;
  progress: "idle" | "uploading";
  error?: string;
}

export default function AdminFacultyPage() {
  const [rows, setRows] = useState<FacultyRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState<{ kind: "ok" | "error"; text: string } | null>(null);
  const [uploading, setUploading] = useState<UploadState | null>(null);
  const fileRefs = useRef<Record<string, HTMLInputElement | null>>({});

  async function load() {
    setLoading(true);
    try {
      const res = await authFetch("/api/admin/faculty");
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error ?? "load failed");
      setRows(json.faculty ?? []);
    } catch (err) {
      setMsg({ kind: "error", text: err instanceof Error ? err.message : String(err) });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void load(); }, []);

  async function onPick(facultyId: string, file: File) {
    if (uploading) return;
    setMsg(null);
    setUploading({ facultyId, progress: "uploading" });
    try {
      const fd = new FormData();
      fd.append("facultyId", facultyId);
      fd.append("file", file);
      const res = await authFetch("/api/admin/faculty", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error ?? "upload failed");
      setMsg({ kind: "ok", text: `${facultyId} updated` });
      await load();
    } catch (err) {
      setMsg({ kind: "error", text: err instanceof Error ? err.message : String(err) });
    } finally {
      setUploading(null);
    }
  }

  async function clearImage(facultyId: string) {
    if (!window.confirm(`Remove illustration for ${facultyId}?`)) return;
    setMsg(null);
    try {
      const res = await authFetch("/api/admin/faculty", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ facultyId }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error ?? "remove failed");
      setMsg({ kind: "ok", text: `${facultyId} cleared` });
      await load();
    } catch (err) {
      setMsg({ kind: "error", text: err instanceof Error ? err.message : String(err) });
    }
  }

  return (
    <div className="afp-root">
      <div className="afp-shell">
        <header className="afp-header">
          <div className="afp-eyebrow">
            <span className="afp-dot" />
            <span>FACULTY UNIVERSE</span>
          </div>
          <h1 className="afp-title">Classroom illustrations</h1>
          <p className="afp-sub">
            Upload the mascot/portrait artwork for each AI instructor. Public buckets, 10 MB max, png / jpg / webp / svg.
          </p>
        </header>

        {msg && (
          <div className={`afp-banner ${msg.kind === "error" ? "is-error" : "is-ok"}`}>
            {msg.text}
          </div>
        )}

        {loading ? (
          <div className="afp-empty">Loading…</div>
        ) : (
          <div className="afp-grid">
            {rows.map((f) => {
              const isBusy = uploading?.facultyId === f.id;
              return (
                <article
                  key={f.id}
                  className="afp-card"
                  style={{ ["--accent" as string]: f.accent, ["--bg" as string]: f.bg }}
                >
                  <div className="afp-card-art">
                    {f.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={f.imageUrl} alt={f.name} className="afp-art-img" />
                    ) : (
                      <div className="afp-art-placeholder">
                        <span className="afp-art-emoji">{f.mascotEmoji}</span>
                        <span className="afp-art-hint">no illustration yet</span>
                      </div>
                    )}
                  </div>

                  <div className="afp-card-meta">
                    <div className="afp-card-eyebrow">{f.subjectShort}</div>
                    <h2 className="afp-card-name">{f.name}</h2>
                    <p className="afp-card-tagline">"{f.tagline}"</p>
                    <p className="afp-card-vibe">{f.vibe}</p>
                  </div>

                  <div className="afp-card-actions">
                    <input
                      ref={(el) => { fileRefs.current[f.id] = el; }}
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) void onPick(f.id, file);
                        e.currentTarget.value = "";
                      }}
                    />
                    <button
                      type="button"
                      className="afp-btn-primary"
                      onClick={() => fileRefs.current[f.id]?.click()}
                      disabled={isBusy}
                    >
                      {isBusy ? "Uploading…" : f.imageUrl ? "↻ Replace" : "+ Upload illustration"}
                    </button>
                    {f.imageUrl && !isBusy && (
                      <button
                        type="button"
                        className="afp-btn-ghost"
                        onClick={() => void clearImage(f.id)}
                      >
                        Clear
                      </button>
                    )}
                  </div>

                  {f.updatedAt && (
                    <div className="afp-card-stamp">
                      updated {new Date(f.updatedAt).toLocaleString()}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </div>

      <style>{`
        .afp-root {
          min-height: calc(100vh - 4rem);
          background: linear-gradient(180deg, #02040b 0%, #05070d 100%);
          color: #d8d9e6;
          font-family: 'Inter', system-ui, sans-serif;
          padding: 2rem 1rem 4rem;
        }
        .afp-shell { max-width: 78rem; margin: 0 auto; display: flex; flex-direction: column; gap: 1.5rem; }

        .afp-header { display: flex; flex-direction: column; gap: 0.35rem; }
        .afp-eyebrow {
          display: inline-flex; align-items: center; gap: 0.5rem;
          font-family: ui-monospace, 'JetBrains Mono', monospace;
          font-size: 0.62rem; font-weight: 700; letter-spacing: 0.22em;
          text-transform: uppercase; color: #5eead4;
          text-shadow: 0 0 10px rgba(94,234,212,0.45);
        }
        .afp-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #5eead4;
          box-shadow: 0 0 8px rgba(94,234,212,0.65);
          animation: afp-pulse 1.6s ease-in-out infinite;
        }
        @keyframes afp-pulse {
          0%,100% { opacity: 0.55; transform: scale(0.85); }
          50%     { opacity: 1;    transform: scale(1.12); }
        }
        .afp-title {
          font-size: 1.6rem; font-weight: 600; color: #f3f3fb;
          margin: 0; letter-spacing: -0.015em;
        }
        .afp-sub { font-size: 0.88rem; color: #94a3b8; margin: 0; }

        .afp-banner {
          padding: 0.55rem 0.85rem;
          border-radius: 0.5rem;
          font-family: ui-monospace, monospace;
          font-size: 0.78rem;
        }
        .afp-banner.is-ok    { background: rgba(94,234,212,0.08); color: #5eead4; border: 1px solid rgba(94,234,212,0.25); }
        .afp-banner.is-error { background: rgba(255,107,91,0.08); color: #ff8b7e; border: 1px solid rgba(255,107,91,0.3); }
        .afp-empty {
          font-family: ui-monospace, monospace;
          font-size: 0.82rem;
          color: rgba(148,163,184,0.65);
          padding: 2rem;
          text-align: center;
        }

        .afp-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
          gap: 1.1rem;
        }
        .afp-card {
          --accent: #5eead4;
          --bg: #0a0e1a;
          position: relative;
          display: flex; flex-direction: column;
          gap: 0.85rem;
          padding: 1rem;
          border-radius: 0.85rem;
          border: 1px solid color-mix(in srgb, var(--accent) 22%, transparent);
          background:
            radial-gradient(ellipse 120% 70% at 50% -10%, color-mix(in srgb, var(--accent) 12%, transparent), transparent 55%),
            var(--bg);
          box-shadow: 0 18px 40px rgba(0,0,0,0.35), inset 0 0 0 1px color-mix(in srgb, var(--accent) 10%, transparent);
          overflow: hidden;
        }

        .afp-card-art {
          position: relative;
          aspect-ratio: 16 / 11;
          border-radius: 0.55rem;
          overflow: hidden;
          background: color-mix(in srgb, var(--accent) 5%, #06070d);
          border: 1px dashed color-mix(in srgb, var(--accent) 30%, transparent);
          display: flex; align-items: center; justify-content: center;
        }
        .afp-art-img {
          width: 100%; height: 100%; object-fit: cover; display: block;
        }
        .afp-art-placeholder {
          display: flex; flex-direction: column; align-items: center; gap: 0.4rem;
          color: color-mix(in srgb, var(--accent) 70%, white 30%);
        }
        .afp-art-emoji { font-size: 2.4rem; opacity: 0.7; }
        .afp-art-hint {
          font-family: ui-monospace, monospace;
          font-size: 0.6rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(148,163,184,0.55);
        }

        .afp-card-meta { display: flex; flex-direction: column; gap: 0.3rem; }
        .afp-card-eyebrow {
          font-family: ui-monospace, monospace;
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--accent);
          text-shadow: 0 0 8px color-mix(in srgb, var(--accent) 50%, transparent);
        }
        .afp-card-name {
          font-family: 'Cormorant Garamond', 'Georgia', serif;
          font-size: 1.45rem;
          font-weight: 600;
          color: #f3f3fb;
          margin: 0;
          line-height: 1.1;
          letter-spacing: -0.01em;
        }
        .afp-card-tagline {
          font-family: 'Cormorant Garamond', 'Georgia', serif;
          font-style: italic;
          font-size: 0.95rem;
          color: color-mix(in srgb, var(--accent) 80%, white 20%);
          margin: 0;
          line-height: 1.4;
        }
        .afp-card-vibe {
          font-size: 0.78rem;
          line-height: 1.5;
          color: rgba(148,163,184,0.78);
          margin: 0;
        }

        .afp-card-actions { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: auto; }
        .afp-btn-primary {
          flex: 1;
          font-family: ui-monospace, monospace;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          padding: 0.6rem 0.9rem;
          color: var(--accent);
          background: color-mix(in srgb, var(--accent) 8%, transparent);
          border: 1px solid color-mix(in srgb, var(--accent) 45%, transparent);
          border-radius: 0.45rem;
          cursor: pointer;
          transition: background 0.15s, box-shadow 0.2s, color 0.15s;
        }
        .afp-btn-primary:hover:not(:disabled) {
          color: #fff;
          background: color-mix(in srgb, var(--accent) 22%, transparent);
          box-shadow: 0 0 0 1px var(--accent), 0 0 16px color-mix(in srgb, var(--accent) 50%, transparent);
        }
        .afp-btn-primary:disabled { opacity: 0.45; cursor: default; }
        .afp-btn-ghost {
          font-family: ui-monospace, monospace;
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 0.6rem 0.8rem;
          color: rgba(148,163,184,0.6);
          background: transparent;
          border: 1px solid rgba(148,163,184,0.15);
          border-radius: 0.45rem;
          cursor: pointer;
          transition: color 0.15s, border-color 0.15s;
        }
        .afp-btn-ghost:hover { color: #ff6b5b; border-color: rgba(255,107,91,0.4); }

        .afp-card-stamp {
          font-family: ui-monospace, monospace;
          font-size: 0.62rem;
          letter-spacing: 0.08em;
          color: rgba(148,163,184,0.45);
        }
      `}</style>
    </div>
  );
}
