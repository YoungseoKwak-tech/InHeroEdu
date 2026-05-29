"use client";

import { useEffect, useRef, useState } from "react";
import { authFetch } from "@/lib/client-auth";
import { createBrowserClient } from "@/lib/supabase";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import type { FacultyMeta } from "@/lib/faculty";

type AssetKind = "image" | "intro_video";

type FacultyRow = FacultyMeta & {
  imageUrl: string | null;
  introVideoUrl: string | null;
  introVideoUploadedAt: string | null;
  updatedAt: string | null;
};

interface UploadState {
  facultyId: string;
  kind: AssetKind;
}

export default function AdminFacultyPage() {
  const [rows, setRows] = useState<FacultyRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState<{ kind: "ok" | "error"; text: string } | null>(null);
  const [uploading, setUploading] = useState<UploadState | null>(null);
  const [pendingClear, setPendingClear] = useState<UploadState | null>(null);
  const [clearing, setClearing] = useState(false);
  const imageInputs = useRef<Record<string, HTMLInputElement | null>>({});
  const videoInputs = useRef<Record<string, HTMLInputElement | null>>({});

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

  async function uploadAsset(facultyId: string, kind: AssetKind, file: File) {
    if (uploading) return;
    setMsg(null);
    setUploading({ facultyId, kind });

    try {
      // 1) Ask server for a signed upload URL (admin-gated)
      const signRes = await authFetch("/api/admin/faculty/sign-upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ facultyId, kind, filename: file.name }),
      });
      const signJson = await signRes.json();
      if (!signRes.ok || !signJson.ok) {
        throw new Error(signJson.error ?? "sign-upload failed");
      }
      const { bucket, path, token, publicUrl } = signJson as {
        bucket: string; path: string; token: string; publicUrl: string;
      };

      // 2) Upload directly to Supabase storage (bypasses Vercel body limit)
      const supabase = createBrowserClient();
      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .uploadToSignedUrl(path, token, file, {
          contentType: file.type || "application/octet-stream",
          upsert: false,
        });
      if (uploadError) {
        throw new Error(`Upload failed: ${uploadError.message}`);
      }

      // 3) Save the URL into faculty_assets
      const saveRes = await authFetch("/api/admin/faculty", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ facultyId, kind, url: publicUrl }),
      });
      const saveJson = await saveRes.json();
      if (!saveRes.ok || !saveJson.ok) {
        throw new Error(saveJson.error ?? "save failed");
      }

      setMsg({
        kind: "ok",
        text: `${facultyId} · ${kind === "intro_video" ? "intro video" : "illustration"} updated`,
      });
      await load();
    } catch (err) {
      setMsg({ kind: "error", text: err instanceof Error ? err.message : String(err) });
    } finally {
      setUploading(null);
    }
  }

  async function clearAsset(facultyId: string, kind: AssetKind) {
    const label = kind === "intro_video" ? "intro video" : "illustration";
    if (clearing) return;
    setClearing(true);
    setMsg(null);
    try {
      const res = await authFetch("/api/admin/faculty", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ facultyId, kind }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error ?? "remove failed");
      setMsg({ kind: "ok", text: `${facultyId} · ${label} cleared` });
      setPendingClear(null);
      await load();
    } catch (err) {
      setMsg({ kind: "error", text: err instanceof Error ? err.message : String(err) });
    } finally {
      setClearing(false);
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
          <h1 className="afp-title">Classroom assets</h1>
          <p className="afp-sub">
            Per-instructor intro video and illustration. Intro video plays as the first slot of the Classroom; illustration is the mascot/portrait.
          </p>
          <p className="afp-hint">
            Intro video — mp4/webm/mov, ≤ 500 MB. Illustration — png/jpg/webp/svg, ≤ 10 MB.
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
              const videoBusy = uploading?.facultyId === f.id && uploading.kind === "intro_video";
              const imageBusy = uploading?.facultyId === f.id && uploading.kind === "image";
              const anyBusy = !!uploading;
              return (
                <article
                  key={f.id}
                  className="afp-card"
                  style={{ ["--accent" as string]: f.accent, ["--bg" as string]: f.bg }}
                >
                  {/* ── Slot 1: Intro video ────────────────────────────────── */}
                  <div className="afp-slot">
                    <div className="afp-slot-tag">
                      <span className="afp-slot-num">01</span>
                      <span>INTRO VIDEO</span>
                    </div>
                    <div className="afp-slot-art afp-slot-video">
                      {f.introVideoUrl ? (
                        <video
                          src={f.introVideoUrl}
                          className="afp-video"
                          controls
                          preload="metadata"
                          playsInline
                        />
                      ) : (
                        <div className="afp-placeholder">
                          <span className="afp-placeholder-emoji">▶</span>
                          <span className="afp-placeholder-hint">no video yet</span>
                        </div>
                      )}
                    </div>
                    <div className="afp-actions">
                      <input
                        ref={(el) => { videoInputs.current[f.id] = el; }}
                        type="file"
                        accept="video/mp4,video/webm,video/quicktime"
                        style={{ display: "none" }}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) void uploadAsset(f.id, "intro_video", file);
                          e.currentTarget.value = "";
                        }}
                      />
                      <button
                        type="button"
                        className="afp-btn-primary"
                        onClick={() => videoInputs.current[f.id]?.click()}
                        disabled={anyBusy}
                      >
                        {videoBusy
                          ? "Uploading…"
                          : f.introVideoUrl
                            ? "↻ Replace video"
                            : "+ Upload intro video"}
                      </button>
                      {f.introVideoUrl && !videoBusy && (
                        <button
                          type="button"
                          className="afp-btn-ghost"
                          onClick={() => setPendingClear({ facultyId: f.id, kind: "intro_video" })}
                          disabled={anyBusy}
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  </div>

                  {/* ── Slot 2: Illustration ───────────────────────────────── */}
                  <div className="afp-slot">
                    <div className="afp-slot-tag">
                      <span className="afp-slot-num">02</span>
                      <span>ILLUSTRATION</span>
                    </div>
                    <div className="afp-slot-art">
                      {f.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={f.imageUrl} alt={f.name} className="afp-img" />
                      ) : (
                        <div className="afp-placeholder">
                          <span className="afp-placeholder-emoji">{f.mascotEmoji}</span>
                          <span className="afp-placeholder-hint">no illustration yet</span>
                        </div>
                      )}
                    </div>
                    <div className="afp-actions">
                      <input
                        ref={(el) => { imageInputs.current[f.id] = el; }}
                        type="file"
                        accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml"
                        style={{ display: "none" }}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) void uploadAsset(f.id, "image", file);
                          e.currentTarget.value = "";
                        }}
                      />
                      <button
                        type="button"
                        className="afp-btn-primary"
                        onClick={() => imageInputs.current[f.id]?.click()}
                        disabled={anyBusy}
                      >
                        {imageBusy
                          ? "Uploading…"
                          : f.imageUrl
                            ? "↻ Replace illustration"
                            : "+ Upload illustration"}
                      </button>
                      {f.imageUrl && !imageBusy && (
                        <button
                          type="button"
                          className="afp-btn-ghost"
                          onClick={() => setPendingClear({ facultyId: f.id, kind: "image" })}
                          disabled={anyBusy}
                        >
                          Clear
                        </button>
                      )}
                    </div>
                  </div>

                  {/* ── Meta ──────────────────────────────────────────────── */}
                  <div className="afp-meta">
                    <div className="afp-meta-eyebrow">{f.subjectShort}</div>
                    <h2 className="afp-meta-name">{f.name}</h2>
                    <p className="afp-meta-tagline">"{f.tagline}"</p>
                    <p className="afp-meta-vibe">{f.vibe}</p>
                    {f.updatedAt && (
                      <div className="afp-stamp">
                        last updated {new Date(f.updatedAt).toLocaleString()}
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      <ConfirmDialog
        open={pendingClear !== null}
        title="Remove this faculty asset?"
        message={
          pendingClear
            ? `${pendingClear.kind === "intro_video" ? "Intro video" : "Illustration"} for ${pendingClear.facultyId} will be cleared.`
            : "This asset will be cleared."
        }
        confirmLabel="Remove"
        loading={clearing}
        destructive
        onConfirm={() => {
          if (pendingClear) void clearAsset(pendingClear.facultyId, pendingClear.kind);
        }}
        onCancel={() => {
          if (!clearing) setPendingClear(null);
        }}
      />

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
        .afp-sub  { font-size: 0.88rem; color: #94a3b8; margin: 0; }
        .afp-hint {
          font-family: ui-monospace, monospace;
          font-size: 0.72rem;
          letter-spacing: 0.04em;
          color: rgba(148,163,184,0.55);
          margin: 0;
        }

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
          grid-template-columns: repeat(auto-fill, minmax(22rem, 1fr));
          gap: 1.2rem;
        }
        .afp-card {
          --accent: #5eead4;
          --bg: #0a0e1a;
          position: relative;
          display: flex; flex-direction: column;
          gap: 1rem;
          padding: 1rem;
          border-radius: 0.85rem;
          border: 1px solid color-mix(in srgb, var(--accent) 22%, transparent);
          background:
            radial-gradient(ellipse 120% 70% at 50% -10%, color-mix(in srgb, var(--accent) 12%, transparent), transparent 55%),
            var(--bg);
          box-shadow: 0 18px 40px rgba(0,0,0,0.35), inset 0 0 0 1px color-mix(in srgb, var(--accent) 10%, transparent);
          overflow: hidden;
        }

        .afp-slot { display: flex; flex-direction: column; gap: 0.45rem; }
        .afp-slot-tag {
          display: inline-flex; align-items: center; gap: 0.5rem;
          font-family: ui-monospace, 'JetBrains Mono', monospace;
          font-size: 0.6rem; font-weight: 700;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--accent);
          text-shadow: 0 0 8px color-mix(in srgb, var(--accent) 50%, transparent);
        }
        .afp-slot-num {
          padding: 0.1rem 0.4rem;
          border: 1px solid color-mix(in srgb, var(--accent) 40%, transparent);
          border-radius: 0.25rem;
          font-size: 0.55rem;
          color: color-mix(in srgb, var(--accent) 85%, white 15%);
        }

        .afp-slot-art {
          position: relative;
          aspect-ratio: 16 / 11;
          border-radius: 0.55rem;
          overflow: hidden;
          background: color-mix(in srgb, var(--accent) 5%, #06070d);
          border: 1px dashed color-mix(in srgb, var(--accent) 30%, transparent);
          display: flex; align-items: center; justify-content: center;
        }
        .afp-slot-video { background: #000; }
        .afp-img, .afp-video {
          width: 100%; height: 100%; object-fit: cover; display: block;
        }
        .afp-video { object-fit: contain; background: #000; }
        .afp-placeholder {
          display: flex; flex-direction: column; align-items: center; gap: 0.45rem;
          color: color-mix(in srgb, var(--accent) 70%, white 30%);
        }
        .afp-placeholder-emoji { font-size: 2.4rem; opacity: 0.65; }
        .afp-placeholder-hint {
          font-family: ui-monospace, monospace;
          font-size: 0.6rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(148,163,184,0.55);
        }

        .afp-actions { display: flex; gap: 0.5rem; flex-wrap: wrap; }
        .afp-btn-primary {
          flex: 1;
          font-family: ui-monospace, monospace;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 0.6rem 0.85rem;
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
          font-size: 0.66rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 0.6rem 0.75rem;
          color: rgba(148,163,184,0.6);
          background: transparent;
          border: 1px solid rgba(148,163,184,0.15);
          border-radius: 0.45rem;
          cursor: pointer;
          transition: color 0.15s, border-color 0.15s;
        }
        .afp-btn-ghost:hover:not(:disabled) { color: #ff6b5b; border-color: rgba(255,107,91,0.4); }

        .afp-meta {
          margin-top: auto;
          padding-top: 0.85rem;
          border-top: 1px solid rgba(255,255,255,0.05);
          display: flex; flex-direction: column; gap: 0.25rem;
        }
        .afp-meta-eyebrow {
          font-family: ui-monospace, monospace;
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--accent);
          text-shadow: 0 0 8px color-mix(in srgb, var(--accent) 45%, transparent);
        }
        .afp-meta-name {
          font-family: 'Cormorant Garamond', 'Georgia', serif;
          font-size: 1.4rem;
          font-weight: 600;
          color: #f3f3fb;
          margin: 0;
          line-height: 1.1;
          letter-spacing: -0.01em;
        }
        .afp-meta-tagline {
          font-family: 'Cormorant Garamond', 'Georgia', serif;
          font-style: italic;
          font-size: 0.92rem;
          color: color-mix(in srgb, var(--accent) 80%, white 20%);
          margin: 0;
          line-height: 1.35;
        }
        .afp-meta-vibe {
          font-size: 0.75rem;
          line-height: 1.5;
          color: rgba(148,163,184,0.75);
          margin: 0;
        }
        .afp-stamp {
          font-family: ui-monospace, monospace;
          font-size: 0.6rem;
          letter-spacing: 0.06em;
          color: rgba(148,163,184,0.4);
        }
      `}</style>
    </div>
  );
}
