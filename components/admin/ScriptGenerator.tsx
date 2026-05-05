"use client";

import { useState, useRef, useCallback } from "react";
import { authFetch } from "@/lib/client-auth";

interface Props {
  lessonId: string;
  lessonTitle: string;
  courseId: string;
  onScriptGenerated: (script: string) => void;
}

function parseOverlaysFromScript(script: string): unknown[] {
  const marker = "OVERLAYS JSON:";
  const markerIdx = script.indexOf(marker);
  if (markerIdx === -1) return [];

  const jsonStart = script.indexOf("[", markerIdx);
  if (jsonStart === -1) return [];

  let depth = 0;
  let jsonEnd = -1;
  for (let i = jsonStart; i < script.length; i++) {
    if (script[i] === "[") depth++;
    else if (script[i] === "]") {
      depth--;
      if (depth === 0) {
        jsonEnd = i;
        break;
      }
    }
  }

  if (jsonEnd === -1) return [];

  try {
    const parsed = JSON.parse(script.slice(jsonStart, jsonEnd + 1));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function ScriptGenerator({ lessonId, lessonTitle, courseId, onScriptGenerated }: Props) {
  const [uploadState, setUploadState] = useState<"idle" | "uploading" | "done" | "error">("idle");
  const [uploadedFilename, setUploadedFilename] = useState<string | null>(null);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const [textLength, setTextLength] = useState<number | null>(null);
  const [extractedText, setExtractedText] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [streamedScript, setStreamedScript] = useState("");
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [materialsOpen, setMaterialsOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  // ── Extract text (no Supabase) ───────────────────────────────────────────
  async function handleFile(file: File) {
    setUploadState("uploading");
    setUploadMessage("Extracting text…");
    setUploadPreview(null);
    setTextLength(null);
    setExtractedText("");
    setGenerationError(null);

    const fd = new FormData();
    fd.append("file", file);

    try {
      const res = await authFetch("/api/admin/extract-text", {
        method: "POST",
        body: fd,
      });
      const raw = await res.text();
      let json: Record<string, unknown> = {};
      try { json = raw ? (JSON.parse(raw) as Record<string, unknown>) : {}; } catch { json = {}; }

      if (!res.ok) {
        console.error("[ScriptGenerator] extract-text failed", {
          lessonId, filename: file.name, status: res.status, body: json, raw,
        });
        setUploadState("error");
        setUploadMessage(typeof json.error === "string" ? json.error : `Extract failed (${res.status})`);
        return;
      }

      const text = typeof json.text === "string" ? json.text : "";
      setExtractedText(text);
      setUploadedFilename(file.name);
      setTextLength(typeof json.textLength === "number" ? json.textLength : text.length);
      setUploadPreview(typeof json.preview === "string" ? json.preview : text.slice(0, 240));
      setUploadMessage(
        `Extracted ${(typeof json.textLength === "number" ? json.textLength : text.length).toLocaleString()} characters.`
      );
      setUploadState("done");
    } catch (error) {
      console.error("[ScriptGenerator] extract-text threw", { lessonId, filename: file.name, error });
      setUploadState("error");
      setUploadMessage(error instanceof Error ? error.message : "Upload failed");
    }
  }

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [lessonId]
  );

  // ── Generate ────────────────────────────────────────────────────────────
  async function generate(section?: string) {
    setGenerating(true);
    setStreamedScript("");
    setGenerationError(null);
    console.log("[ScriptGenerator] 1. Button clicked — lessonId:", lessonId, "courseId:", courseId);

    try {
      console.log("[ScriptGenerator] 2. Calling API with lessonId:", lessonId, "courseId:", courseId);
      const res = await authFetch("/api/admin/generate-script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lessonId,
          courseId,
          section,
          materialsText: extractedText || undefined,
        }),
      });

      console.log("[ScriptGenerator] 3. API response status:", res.status, "ok:", res.ok);

      if (!res.ok) {
        // Read body safely — might not be JSON
        const raw = await res.text().catch(() => "");
        let errMsg = `Generation failed (${res.status})`;
        try {
          const json = JSON.parse(raw);
          errMsg = json.error ?? errMsg;
        } catch { /* raw is not JSON — use status code message */ }
        console.error("[ScriptGenerator] API error:", res.status, errMsg, raw);
        setGenerationError(errMsg);
        return;
      }

      if (!res.body) {
        setGenerationError("No response stream received.");
        return;
      }

      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let buf = "";
      let full = "";
      let sawDone = false;
      let hadError = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        const lines = buf.split("\n");
        buf = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const raw = line.slice(6);
          if (raw === "[DONE]") {
            sawDone = true;
            break;
          }
          try {
            const ev = JSON.parse(raw) as Record<string, unknown>;
            if (ev.error) {
              hadError = true;
              console.error("[ScriptGenerator] SSE error from server:", ev.error);
              setGenerationError(String(ev.error));
              continue;
            }
            if (typeof ev.text === "string" && ev.text) {
              full += ev.text;
              setStreamedScript((s) => s + ev.text);
              if (previewRef.current) {
                previewRef.current.scrollTop = previewRef.current.scrollHeight;
              }
            }
          } catch { /* skip malformed SSE line */ }
        }
        if (sawDone) break;
      }

      if (full && !hadError) {
        console.log("[ScriptGenerator] 4. Stream done — script length:", full.length);
        try {
          const overlays = parseOverlaysFromScript(full);
          const saveRes = await authFetch("/api/admin/lesson-scripts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              lessonId,
              script: full,
              overlays,
              markGenerated: true,
            }),
          });

          if (!saveRes.ok) {
            const raw = await saveRes.text().catch(() => "");
            console.error("[ScriptGenerator] save after generation failed", {
              lessonId,
              status: saveRes.status,
              raw,
            });
            setGenerationError("Script generated, but saving failed. Please try again or use Save All in the editor.");
            onScriptGenerated(full);
          } else {
            onScriptGenerated(full);
          }
        } catch (saveError) {
          console.error("[ScriptGenerator] save after generation threw", { lessonId, saveError });
          setGenerationError("Script generated, but saving failed. Please use Save All in the editor.");
          onScriptGenerated(full);
        }
      } else if (sawDone) {
        console.warn("[ScriptGenerator] Stream done but script is empty or had error — not switching tabs");
      }

      if (!sawDone && !full) {
        console.error("[ScriptGenerator] Stream ended without [DONE] and no text received");
        setGenerationError("Script generation did not return any text.");
      }
    } catch (err) {
      console.error("[ScriptGenerator] generate() threw:", err);
      setGenerationError(err instanceof Error ? err.message : "Unexpected error during generation");
    } finally {
      setGenerating(false);
    }
  }

  return (
    <div className="sg-root">
      {/* ── Generate first ── */}
      <div className="sg-section-label">Generate script</div>
      <div className="sg-gen-row">
        <button
          onClick={() => generate()}
          disabled={generating}
          className="sg-btn-primary"
        >
          {generating ? (
            <><span className="sg-spinner sg-spinner-sm" /> Generating…</>
          ) : (
            "✦ Generate Full Script"
          )}
        </button>
        {streamedScript && !generating && (
          <button onClick={() => generate()} className="sg-btn-ghost">
            ↺ Regenerate
          </button>
        )}
      </div>
      {generationError && <div className="sg-note sg-note-error">{generationError}</div>}

      {/* ── Optional materials ── */}
      <div className="sg-materials-toggle" onClick={() => setMaterialsOpen((o) => !o)}>
        <span className="sg-toggle-icon">{materialsOpen ? "▲" : "▼"}</span>
        <span>
          {uploadState === "done"
            ? `📄 ${uploadedFilename} — click to change`
            : "Add materials (optional) — enriches the script"}
        </span>
        {uploadState === "done" && <span className="sg-meta-chip">{textLength?.toLocaleString()} chars</span>}
      </div>

      {materialsOpen && (
        <>
          <div
            className={`sg-dropzone ${isDragging ? "sg-dropzone-active" : ""} ${uploadState === "done" ? "sg-dropzone-done" : ""}`}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={onDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.txt,.png,.jpg,.jpeg,.webp,.docx"
              style={{ display: "none" }}
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
            />
            {uploadState === "uploading" && (
              <div className="sg-upload-status">
                <div className="sg-spinner" />
                <span>Extracting text…</span>
                <span className="sg-upload-sub">PDFs and images may take up to 30 seconds.</span>
              </div>
            )}
            {uploadState === "done" && (
              <div className="sg-upload-status sg-upload-ok">
                <span className="sg-check">✓</span>
                <span>{uploadedFilename}</span>
                <span className="sg-reupload">click to replace</span>
              </div>
            )}
            {uploadState === "error" && (
              <div className="sg-upload-status sg-upload-err">
                <span>⚠ Upload failed — click to retry</span>
              </div>
            )}
            {uploadState === "idle" && (
              <div className="sg-upload-status">
                <span className="sg-upload-icon">📄</span>
                <span className="sg-upload-label">Drop PDF, image, .txt, or .docx here</span>
                <span className="sg-upload-sub">or click to browse</span>
              </div>
            )}
          </div>
          {uploadMessage && (
            <div className={`sg-note ${uploadState === "error" ? "sg-note-error" : "sg-note-ok"}`}>
              {uploadMessage}
            </div>
          )}
          {uploadState === "done" && uploadPreview && (
            <div className="sg-metadata">
              <span className="sg-meta-preview">{uploadPreview}</span>
            </div>
          )}
        </>
      )}

      {/* ── Streaming preview ── */}
      {(streamedScript || generating) && (
        <>
          <div className="sg-section-label" style={{ marginTop: "1.25rem" }}>
            Script preview
            {generating && <span className="sg-live-badge">● live</span>}
          </div>
          <div ref={previewRef} className="sg-preview">
            <pre className="sg-preview-text">{streamedScript || " "}</pre>
          </div>
        </>
      )}

      <style>{`
        .sg-root { display: flex; flex-direction: column; gap: 0.75rem; }
        .sg-section-label {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: #555;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .sg-live-badge {
          font-size: 0.6rem;
          color: #00FFB2;
          animation: sg-pulse 1.5s ease-in-out infinite;
        }
        @keyframes sg-pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }

        .sg-materials-toggle {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.72rem;
          color: #444;
          cursor: pointer;
          padding: 0.5rem 0;
          border-top: 1px solid #1a1a1a;
          transition: color 0.15s;
        }
        .sg-materials-toggle:hover { color: #666; }
        .sg-toggle-icon { font-size: 0.55rem; color: #333; }

        .sg-dropzone {
          border: 1.5px dashed #2a2a2a;
          border-radius: 0.75rem;
          padding: 1.5rem 1rem;
          text-align: center;
          cursor: pointer;
          transition: border-color 0.15s, background 0.15s;
          background: #0f0f0f;
        }
        .sg-dropzone:hover { border-color: #3a3a3a; }
        .sg-dropzone-active { border-color: #00FFB2; background: rgba(0,255,178,0.04); }
        .sg-dropzone-done  { border-color: #1a3a2a; border-style: solid; background: rgba(0,255,178,0.03); }

        .sg-upload-status {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.8rem;
          color: #666;
        }
        .sg-upload-icon { font-size: 1.5rem; }
        .sg-upload-label { color: #888; font-size: 0.82rem; }
        .sg-upload-sub  { font-size: 0.7rem; color: #444; }
        .sg-upload-ok   { color: #00FFB2; }
        .sg-upload-err  { color: #f87171; }
        .sg-check { font-size: 1.2rem; }
        .sg-reupload { font-size: 0.65rem; color: #444; }
        .sg-note {
          border-radius: 0.7rem;
          padding: 0.75rem 0.9rem;
          font-size: 0.78rem;
          line-height: 1.45;
          border: 1px solid rgba(255,255,255,0.08);
        }
        .sg-note-ok {
          background: rgba(0,255,178,0.05);
          color: #c9ffe8;
          border-color: rgba(0,255,178,0.18);
        }
        .sg-note-error {
          background: rgba(248,113,113,0.06);
          color: #fecaca;
          border-color: rgba(248,113,113,0.18);
        }
        .sg-metadata { display: flex; flex-direction: column; gap: 0.5rem; }
        .sg-meta-chip {
          width: fit-content;
          border-radius: 999px;
          padding: 0.3rem 0.6rem;
          font-size: 0.68rem;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          background: rgba(0,255,178,0.08);
          color: #9afdd8;
          border: 1px solid rgba(0,255,178,0.14);
        }
        .sg-meta-preview {
          border-radius: 0.8rem;
          padding: 0.8rem 0.95rem;
          background: #0b0b0b;
          border: 1px solid #1d1d1d;
          color: #8f8f8f;
          font-size: 0.76rem;
          line-height: 1.55;
          white-space: pre-wrap;
        }

        .sg-gen-row { display: flex; gap: 0.5rem; flex-wrap: wrap; }

        .sg-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.6rem 1.1rem;
          background: #00FFB2;
          color: #0a0a0a;
          border: none;
          border-radius: 0.6rem;
          font-size: 0.82rem;
          font-weight: 700;
          cursor: pointer;
          transition: filter 0.15s, opacity 0.15s;
        }
        .sg-btn-primary:disabled { opacity: 0.4; cursor: default; }
        .sg-btn-primary:not(:disabled):hover { filter: brightness(1.08); }

        .sg-btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.6rem 1rem;
          background: transparent;
          color: #888;
          border: 1px solid #2a2a2a;
          border-radius: 0.6rem;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: border-color 0.15s, color 0.15s;
        }
        .sg-btn-ghost:hover { border-color: #444; color: #bbb; }

        .sg-spinner {
          width: 1rem; height: 1rem;
          border-radius: 50%;
          border: 2px solid rgba(10,10,10,0.2);
          border-top-color: #0a0a0a;
          animation: sg-spin 0.6s linear infinite;
          flex-shrink: 0;
        }
        .sg-spinner-sm { width: 0.75rem; height: 0.75rem; }
        @keyframes sg-spin { to { transform: rotate(360deg); } }

        .sg-preview {
          border: 1px solid #1a1a1a;
          border-radius: 0.75rem;
          background: #080808;
          height: 360px;
          overflow-y: auto;
          padding: 1rem;
        }
        .sg-preview-text {
          font-family: 'Space Mono', 'Courier New', monospace;
          font-size: 0.75rem;
          color: #aaa;
          white-space: pre-wrap;
          word-break: break-word;
          margin: 0;
          line-height: 1.7;
        }
      `}</style>
    </div>
  );
}
