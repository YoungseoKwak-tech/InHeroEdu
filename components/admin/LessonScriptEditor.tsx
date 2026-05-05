"use client";

import { useState, useEffect, useRef } from "react";
import { authFetch } from "@/lib/client-auth";

const SECTIONS = [
  "HOOK",
  "HERO EXPLAIN 1",
  "SPARK",
  "HERO EXPLAIN 2",
  "GAP CRUNCH",
  "TEACH BACK",
  "QUESTION SPRINT",
  "ANALYZER",
  "WRAP + TRAJECTORY CUE",
] as const;
type Section = (typeof SECTIONS)[number];

interface Props {
  lessonId: string;
  courseId: string;
  initialScript: string;
  onSave: (script: string) => void;
  onSelectionChange?: (text: string) => void;
}

export default function LessonScriptEditor({ lessonId, courseId, initialScript, onSave, onSelectionChange }: Props) {
  const [script, setScript] = useState(initialScript);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [saveError, setSaveError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState<Section>("HOOK");
  const [rewriting, setRewriting] = useState(false);
  const [rewritePreview, setRewritePreview] = useState("");
  const lastSavedScriptRef = useRef(initialScript);

  // Sync when parent pushes a fresh script (after generation)
  useEffect(() => {
    setScript(initialScript);
    lastSavedScriptRef.current = initialScript;
  }, [initialScript]);

  // ── Save ────────────────────────────────────────────────────────────────
  async function saveScript(mode: "manual" | "autosave" = "manual") {
    if (saveState === "saving") return;
    if (mode === "autosave" && script === lastSavedScriptRef.current) return;

    setSaveState("saving");
    setSaveError(null);
    try {
      const res = await authFetch("/api/admin/lesson-scripts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId, script }),
      });
      const raw = await res.text().catch(() => "");
      let message = `Save failed (${res.status})`;
      let data: { error?: string; data?: { script?: string | null } } = {};

      try {
        data = raw ? (JSON.parse(raw) as { error?: string; data?: { script?: string | null } }) : {};
        if (typeof data.error === "string" && data.error) message = data.error;
      } catch {
        if (raw) message = raw;
      }

      if (!res.ok) {
        console.error("[LessonScriptEditor] save failed", {
          lessonId,
          status: res.status,
          raw,
        });
        throw new Error(
          res.status === 401
            ? "Your admin session expired. Refresh and sign in again."
            : res.status === 403
              ? "This account does not have admin access."
              : message
        );
      }

      setSaveState("saved");
      lastSavedScriptRef.current = script;
      onSave(script);
      setTimeout(() => setSaveState("idle"), 2500);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unexpected save error";
      setSaveError(message);
      setSaveState("error");
      console.error("[LessonScriptEditor] save threw", { lessonId, error });
      setTimeout(() => setSaveState("idle"), 3000);
    }
  }

  // ── Section rewrite ─────────────────────────────────────────────────────
  async function rewriteSection() {
    setRewriting(true);
    setRewritePreview("");
    try {
      const res = await authFetch("/api/admin/generate-script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId, section: selectedSection }),
      });
      if (!res.body) return;
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let buf = "";
      let full = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        const lines = buf.split("\n");
        buf = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const raw = line.slice(6);
          if (raw === "[DONE]") break;
          try {
            const ev = JSON.parse(raw);
            if (ev.text) {
              full += ev.text;
              setRewritePreview((s) => s + ev.text);
            }
          } catch { /* skip */ }
        }
      }
    } finally {
      setRewriting(false);
    }
  }

  function applyRewrite() {
    if (!rewritePreview) return;
    // Replace the target section in the full script
    const sectionHeader = `## ${selectedSection}`;
    const nextHeaders = SECTIONS.filter((s) => s !== selectedSection).map((s) => `## ${s}`);
    const startIdx = script.indexOf(sectionHeader);
    if (startIdx === -1) {
      // Section not found — append
      setScript((prev) => prev + "\n\n" + rewritePreview);
    } else {
      let endIdx = script.length;
      for (const h of nextHeaders) {
        const idx = script.indexOf(h, startIdx + sectionHeader.length);
        if (idx !== -1 && idx < endIdx) endIdx = idx;
      }
      const updated = script.slice(0, startIdx) + rewritePreview.trim() + "\n\n" + script.slice(endIdx);
      setScript(updated);
    }
    setModalOpen(false);
    setRewritePreview("");
  }

  return (
    <div className="lse-root">
      {/* Toolbar */}
      <div className="lse-toolbar">
        <button onClick={() => setModalOpen(true)} className="lse-btn-outline">
          ✦ AI Rewrite Section
        </button>
        <a
          href={`/courses/${courseId}/${lessonId}`}
          target="_blank"
          rel="noreferrer"
          className="lse-btn-outline"
        >
          ↗ View Live
        </a>
        <div style={{ flex: 1 }} />
        <button onClick={() => saveScript("manual")} disabled={saveState === "saving"} className="lse-btn-save">
          {saveState === "saving" && "Saving…"}
          {saveState === "saved" && "✓ Saved"}
          {saveState === "error" && "✗ Error — retry"}
          {saveState === "idle" && "Save All"}
        </button>
      </div>
      {saveError && <div className="lse-save-error">{saveError}</div>}

      {/* Script textarea */}
      <textarea
        value={script}
        onChange={(e) => setScript(e.target.value)}
        onBlur={() => saveScript("autosave")}
        onMouseUp={(e) => {
          const sel = (e.target as HTMLTextAreaElement).value.slice(
            (e.target as HTMLTextAreaElement).selectionStart,
            (e.target as HTMLTextAreaElement).selectionEnd
          );
          if (sel && onSelectionChange) onSelectionChange(sel);
        }}
        onKeyUp={(e) => {
          const ta = e.target as HTMLTextAreaElement;
          const sel = ta.value.slice(ta.selectionStart, ta.selectionEnd);
          if (sel && onSelectionChange) onSelectionChange(sel);
        }}
        spellCheck={false}
        placeholder="Script will appear here after generation. You can edit it directly."
        className="lse-editor"
      />

      {/* Section Rewrite Modal */}
      {modalOpen && (
        <div className="lse-modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="lse-modal" onClick={(e) => e.stopPropagation()}>
            <div className="lse-modal-header">
              <h3 className="lse-modal-title">AI Rewrite Section</h3>
              <button onClick={() => setModalOpen(false)} className="lse-modal-close">✕</button>
            </div>

            <label className="lse-field-label">Section to rewrite</label>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value as Section)}
              className="lse-select"
            >
              {SECTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            <button
              onClick={rewriteSection}
              disabled={rewriting}
              className="lse-modal-gen-btn"
            >
              {rewriting ? "Generating…" : "Generate →"}
            </button>

            {(rewritePreview || rewriting) && (
              <>
                <label className="lse-field-label" style={{ marginTop: "0.75rem" }}>
                  Preview {rewriting && <span className="lse-live">● live</span>}
                </label>
                <pre className="lse-rewrite-preview">{rewritePreview || " "}</pre>
                {!rewriting && rewritePreview && (
                  <div className="lse-modal-actions">
                    <button onClick={applyRewrite} className="lse-btn-apply">
                      ✓ Apply to Script
                    </button>
                    <button
                      onClick={() => setRewritePreview("")}
                      className="lse-btn-discard"
                    >
                      Discard
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        .lse-root { display: flex; flex-direction: column; height: 100%; gap: 0.75rem; }

        .lse-toolbar {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .lse-btn-outline {
          padding: 0.45rem 0.85rem;
          background: transparent;
          border: 1px solid #2a2a2a;
          border-radius: 0.5rem;
          font-size: 0.78rem;
          font-weight: 600;
          color: #888;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          transition: border-color 0.15s, color 0.15s;
        }
        .lse-btn-outline:hover { border-color: #444; color: #ccc; }
        .lse-btn-save {
          padding: 0.45rem 1rem;
          background: #00FFB2;
          color: #0a0a0a;
          border: none;
          border-radius: 0.5rem;
          font-size: 0.78rem;
          font-weight: 700;
          cursor: pointer;
          transition: filter 0.15s;
          min-width: 5.5rem;
          text-align: center;
        }
        .lse-btn-save:disabled { opacity: 0.6; cursor: default; }
        .lse-btn-save:not(:disabled):hover { filter: brightness(1.08); }
        .lse-save-error {
          margin-top: -0.25rem;
          font-size: 0.76rem;
          color: #fca5a5;
        }

        .lse-editor {
          flex: 1;
          min-height: 480px;
          border: 1px solid #1e1e1e;
          border-radius: 0.75rem;
          background: #080808;
          color: #ddd;
          padding: 1rem;
          font-family: 'Space Mono', 'Courier New', monospace;
          font-size: 0.78rem;
          line-height: 1.75;
          resize: vertical;
          outline: none;
          transition: border-color 0.15s;
        }
        .lse-editor:focus { border-color: #2a2a2a; }

        /* Modal */
        .lse-modal-backdrop {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.7);
          backdrop-filter: blur(4px);
          display: flex; align-items: center; justify-content: center;
          z-index: 100;
          padding: 1rem;
        }
        .lse-modal {
          background: #111;
          border: 1px solid #222;
          border-radius: 1rem;
          padding: 1.5rem;
          width: 100%;
          max-width: 36rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          max-height: 80vh;
          overflow-y: auto;
        }
        .lse-modal-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.25rem; }
        .lse-modal-title { font-size: 0.95rem; font-weight: 700; color: #fff; }
        .lse-modal-close { background: none; border: none; color: #555; font-size: 1rem; cursor: pointer; padding: 0.1rem 0.3rem; }
        .lse-modal-close:hover { color: #aaa; }

        .lse-field-label {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #555;
          display: flex; align-items: center; gap: 0.4rem;
        }
        .lse-live { color: #00FFB2; animation: lse-pulse 1.5s ease-in-out infinite; }
        @keyframes lse-pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }

        .lse-select {
          width: 100%;
          background: #0f0f0f;
          border: 1px solid #2a2a2a;
          border-radius: 0.5rem;
          padding: 0.5rem 0.75rem;
          color: #ccc;
          font-size: 0.82rem;
          outline: none;
        }
        .lse-modal-gen-btn {
          padding: 0.6rem 1rem;
          background: #7c3aed;
          color: #fff;
          border: none;
          border-radius: 0.6rem;
          font-size: 0.82rem;
          font-weight: 700;
          cursor: pointer;
          transition: filter 0.15s;
        }
        .lse-modal-gen-btn:disabled { opacity: 0.4; cursor: default; }
        .lse-modal-gen-btn:not(:disabled):hover { filter: brightness(1.1); }

        .lse-rewrite-preview {
          background: #080808;
          border: 1px solid #1a1a1a;
          border-radius: 0.5rem;
          padding: 0.75rem;
          font-family: 'Space Mono', monospace;
          font-size: 0.72rem;
          color: #aaa;
          white-space: pre-wrap;
          word-break: break-word;
          max-height: 220px;
          overflow-y: auto;
          line-height: 1.65;
        }
        .lse-modal-actions { display: flex; gap: 0.5rem; }
        .lse-btn-apply {
          flex: 1;
          padding: 0.55rem 0.75rem;
          background: #16a34a;
          color: #fff;
          border: none;
          border-radius: 0.5rem;
          font-size: 0.8rem;
          font-weight: 700;
          cursor: pointer;
        }
        .lse-btn-discard {
          padding: 0.55rem 0.75rem;
          background: transparent;
          color: #666;
          border: 1px solid #222;
          border-radius: 0.5rem;
          font-size: 0.8rem;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
