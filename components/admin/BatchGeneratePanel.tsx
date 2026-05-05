"use client";

import { useState, useRef, useCallback } from "react";
import { authFetch } from "@/lib/client-auth";
import JSZip from "jszip";

interface LessonStatus {
  id: string;
  courseId: string;
  unitNumber: number;
  unitTitle: string;
  lessonNumber: number;
  title: string;
  hasScript: boolean;
  textbook: { status: string; pdfUrl: string | null; docxUrl: string | null; error: string | null };
  // runtime state (not from server)
  scriptPhase?: "idle" | "running" | "done" | "error";
  textbookPhase?: "idle" | "running" | "done" | "error";
  scriptError?: string;
  textbookError?: string;
}

interface Props {
  courseId: string;
  courseName: string;
}

function padNum(n: number): string {
  return String(n).padStart(2, "0");
}

function safeFilename(s: string): string {
  return s.replace(/[^a-zA-Z0-9\-_]/g, "_").slice(0, 60);
}

function pdfFilename(lesson: LessonStatus): string {
  return `UNIT${padNum(lesson.unitNumber)}_${padNum(lesson.lessonNumber)}_${safeFilename(lesson.title)}.pdf`;
}

export default function BatchGeneratePanel({ courseId, courseName }: Props) {
  const [lessons, setLessons] = useState<LessonStatus[]>([]);
  const [loading, setLoading] = useState(false);
  const [running, setRunning] = useState(false);
  const [mode, setMode] = useState<"all" | "scripts" | "textbooks" | "force-textbooks" | null>(null);
  const [progress, setProgress] = useState({ current: 0, total: 0, label: "" });
  const [zipping, setZipping] = useState(false);
  const [zipProgress, setZipProgress] = useState({ current: 0, total: 0 });
  const [recovering, setRecovering] = useState(false);
  const [recoverMsg, setRecoverMsg] = useState<string | null>(null);
  const cancelRef = useRef(false);

  // ── Load all lesson statuses ─────────────────────────────────────────────
  async function loadStatus() {
    setLoading(true);
    try {
      const res = await authFetch(`/api/batch-status?courseId=${courseId}`);
      const { data } = await res.json();
      setLessons((data ?? []).map((l: LessonStatus) => ({
        ...l,
        scriptPhase: "idle",
        textbookPhase: "idle",
      })));
    } finally {
      setLoading(false);
    }
  }

  // ── Update one lesson in state ───────────────────────────────────────────
  const patchLesson = useCallback((id: string, patch: Partial<LessonStatus>) => {
    setLessons((prev) => prev.map((l) => l.id === id ? { ...l, ...patch } : l));
  }, []);

  // ── Generate script for one lesson ──────────────────────────────────────
  async function generateScript(lesson: LessonStatus): Promise<boolean> {
    patchLesson(lesson.id, { scriptPhase: "running" });
    try {
      const res = await authFetch("/api/admin/generate-script-sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId: lesson.id, courseId: lesson.courseId }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        patchLesson(lesson.id, { scriptPhase: "error", scriptError: j.error ?? `HTTP ${res.status}` });
        return false;
      }
      patchLesson(lesson.id, { scriptPhase: "done", hasScript: true });
      return true;
    } catch (err) {
      patchLesson(lesson.id, { scriptPhase: "error", scriptError: String(err) });
      return false;
    }
  }

  // ── Generate PDF textbook for one lesson (calls Modal via Vercel proxy) ──
  async function generateTextbook(lesson: LessonStatus): Promise<boolean> {
    patchLesson(lesson.id, { textbookPhase: "running" });
    try {
      const res = await authFetch("/api/generate-textbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lessonId: lesson.id,
          lessonTitle: lesson.title,
          subject: courseName,
          unit: lesson.unitTitle,
          category: "",
          script: "",  // Modal fetches from DB if empty
        }),
      });

      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        patchLesson(lesson.id, { textbookPhase: "error", textbookError: j.error ?? `HTTP ${res.status}` });
        return false;
      }

      const { pdfUrl } = await res.json() as { pdfUrl: string | null; pages: number };
      patchLesson(lesson.id, {
        textbookPhase: "done",
        textbook: { status: "ready", pdfUrl: pdfUrl ?? null, docxUrl: null, error: null },
      });
      return true;
    } catch (err) {
      patchLesson(lesson.id, { textbookPhase: "error", textbookError: String(err) });
      return false;
    }
  }

  // ── Recover from storage ─────────────────────────────────────────────────
  async function handleRecover() {
    setRecovering(true);
    setRecoverMsg(null);
    try {
      const res = await authFetch("/api/admin/recover-textbooks", { method: "POST" });
      const json = await res.json();
      setRecoverMsg(json.message ?? "완료");
      await loadStatus();
    } catch (err) {
      setRecoverMsg(String(err));
    } finally {
      setRecovering(false);
    }
  }

  // ── Run batch ────────────────────────────────────────────────────────────
  async function runBatch(selectedMode: "all" | "scripts" | "textbooks" | "force-textbooks") {
    cancelRef.current = false;
    setRunning(true);
    setMode(selectedMode);

    const needsScript = lessons.filter((l) =>
      (selectedMode === "all" || selectedMode === "scripts") && !l.hasScript
    );
    const needsTextbook = lessons.filter((l) =>
      (selectedMode === "all" || selectedMode === "textbooks") &&
      l.textbook.status !== "ready"
    );
    const forceTextbook = selectedMode === "force-textbooks" ? [...lessons] : [];

    const totalSteps =
      selectedMode === "scripts" ? needsScript.length :
      selectedMode === "textbooks" ? needsTextbook.length :
      selectedMode === "force-textbooks" ? forceTextbook.length :
      needsScript.length + needsTextbook.length;

    let done = 0;
    setProgress({ current: 0, total: totalSteps, label: "" });

    // Phase 1: scripts
    if (selectedMode === "all" || selectedMode === "scripts") {
      for (const lesson of needsScript) {
        if (cancelRef.current) break;
        setProgress({ current: done, total: totalSteps, label: `스크립트 생성 중: ${lesson.title}` });
        await generateScript(lesson);
        done++;
        setProgress({ current: done, total: totalSteps, label: `스크립트 완료: ${lesson.title}` });
      }
    }

    // Phase 2: PDFs — sequential to respect Anthropic rate limits
    if (selectedMode === "all" || selectedMode === "textbooks") {
      const toProcess = selectedMode === "all"
        ? lessons.filter((l) => l.textbook.status !== "ready")
        : needsTextbook;

      for (const lesson of toProcess) {
        if (cancelRef.current) break;
        setProgress({
          current: done,
          total: totalSteps + toProcess.length - needsTextbook.length,
          label: `PDF 생성 중 — ${lesson.title}`,
        });
        await generateTextbook(lesson);
        done++;
        setProgress({ current: done, total: totalSteps, label: `PDF 완료: ${lesson.title}` });
      }
    }

    // Force regenerate all PDFs (ignores ready status)
    if (selectedMode === "force-textbooks") {
      for (const lesson of forceTextbook) {
        if (cancelRef.current) break;
        setProgress({ current: done, total: totalSteps, label: `재생성 중 — ${lesson.title}` });
        await generateTextbook(lesson);
        done++;
        setProgress({ current: done, total: totalSteps, label: `완료: ${lesson.title}` });
      }
    }

    setRunning(false);
    setMode(null);
    setProgress({ current: 0, total: 0, label: "" });
  }

  // ── ZIP download — parallel fetches, progress tracking ──────────────────
  async function downloadZip() {
    const readyLessons = lessons.filter(
      (l) => l.textbook.status === "ready" || l.textbookPhase === "done"
    );

    if (readyLessons.length === 0) {
      alert("Load Lessons 먼저 클릭하세요.");
      return;
    }

    setZipping(true);
    setZipProgress({ current: 0, total: readyLessons.length });

    try {
      const zip = new JSZip();
      let added = 0;
      const CONCURRENCY = 6;

      // Resolve PDF URL only — never fall back to docxUrl (DOCX ≠ PDF)
      const resolveUrl = async (lesson: LessonStatus): Promise<string | null> => {
        const stateUrl = lesson.textbook.pdfUrl;
        if (stateUrl?.startsWith("http")) return stateUrl;
        try {
          const res = await authFetch(`/api/textbook-status?lessonId=${lesson.id}`);
          const json = await res.json();
          return json.pdfUrl ?? null;
        } catch { return null; }
      };

      // Process in parallel batches
      for (let i = 0; i < readyLessons.length; i += CONCURRENCY) {
        const batch = readyLessons.slice(i, i + CONCURRENCY);
        const results = await Promise.allSettled(
          batch.map(async (lesson) => {
            const fileUrl = await resolveUrl(lesson);
            if (!fileUrl) return;
            const res = await fetch(fileUrl);
            if (!res.ok) return;
            const buf = await res.arrayBuffer();
            zip.file(pdfFilename(lesson), buf);
            added++;
          })
        );
        void results; // errors are swallowed per-file
        setZipProgress({ current: Math.min(i + CONCURRENCY, readyLessons.length), total: readyLessons.length });
      }

      if (added === 0) {
        alert("파일을 가져오지 못했어요. Refresh 후 다시 시도해주세요.");
        return;
      }

      const blob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${safeFilename(courseName)}_PDFs_${added}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } finally {
      setZipping(false);
      setZipProgress({ current: 0, total: 0 });
    }
  }

  // ── Derived counts ────────────────────────────────────────────────────────
  const scriptCount = lessons.filter((l) => l.hasScript || l.scriptPhase === "done").length;
  const textbookCount = lessons.filter(
    (l) => l.textbook.status === "ready" || l.textbookPhase === "done"
  ).length;
  const total = lessons.length;
  const allTextbooksReady = textbookCount > 0;

  const byUnit = lessons.reduce<Record<number, LessonStatus[]>>((acc, l) => {
    (acc[l.unitNumber] ??= []).push(l);
    return acc;
  }, {});

  return (
    <div className="bp-root">
      <div className="bp-header">
        <div>
          <div className="bp-title">Batch Generate — {courseName}</div>
          <div className="bp-sub">{total} lessons · {scriptCount} scripts · {textbookCount} PDFs</div>
        </div>
        <div style={{ display: "flex", gap: "0.4rem", flexDirection: "column", alignItems: "flex-end" }}>
          <button className="bp-btn-load" onClick={loadStatus} disabled={loading || running}>
            {loading ? "Loading..." : lessons.length === 0 ? "Load Lessons" : "Refresh"}
          </button>
          {textbookCount > 0 && (
            <button className="bp-btn bp-btn-zip" onClick={downloadZip} disabled={zipping || running} style={{ fontSize: "0.78rem", padding: "0.45rem 0.9rem" }}>
              {zipping
                ? `⬇ ${zipProgress.current}/${zipProgress.total} 수집 중...`
                : `⬇ ZIP 다운로드 (${textbookCount}개 PDF)`}
            </button>
          )}
          <button className="bp-btn-recover" onClick={handleRecover} disabled={recovering || running}>
            {recovering ? "복구 중..." : "🔄 Storage 복구"}
          </button>
          {recoverMsg && <span style={{ fontSize: "0.65rem", color: "#00C896" }}>{recoverMsg}</span>}
        </div>
      </div>

      {lessons.length > 0 && (
        <>
          <div className="bp-actions">
            <button
              className="bp-btn bp-btn-green"
              onClick={() => runBatch("all")}
              disabled={running}
            >
              ⚡ Generate Everything
            </button>
            <button
              className="bp-btn bp-btn-blue"
              onClick={() => runBatch("scripts")}
              disabled={running}
            >
              📝 Scripts Only ({total - scriptCount} missing)
            </button>
            <button
              className="bp-btn bp-btn-teal"
              onClick={() => runBatch("textbooks")}
              disabled={running}
            >
              📄 PDFs Only ({total - textbookCount} missing)
            </button>
            <button
              className="bp-btn bp-btn-orange"
              onClick={() => runBatch("force-textbooks")}
              disabled={running}
            >
              🔄 전체 PDF 재생성 ({total}개)
            </button>
            {running && (
              <button
                className="bp-btn bp-btn-red"
                onClick={() => { cancelRef.current = true; }}
              >
                ✕ Stop
              </button>
            )}
          </div>

          {running && progress.total > 0 && (
            <div className="bp-progress-wrap">
              <div className="bp-progress-bar-bg">
                <div
                  className="bp-progress-bar-fill"
                  style={{ width: `${Math.round((progress.current / progress.total) * 100)}%` }}
                />
              </div>
              <div className="bp-progress-label">
                {progress.current}/{progress.total} — {progress.label}
              </div>
            </div>
          )}

          <div className="bp-counters">
            <div className="bp-counter">
              <span className="bp-counter-num">{scriptCount}/{total}</span>
              <span className="bp-counter-label">Scripts</span>
            </div>
            <div className="bp-divider" />
            <div className="bp-counter">
              <span className="bp-counter-num">{textbookCount}/{total}</span>
              <span className="bp-counter-label">PDFs</span>
            </div>
            {allTextbooksReady && (
              <>
                <div className="bp-divider" />
                <button
                  className="bp-btn bp-btn-zip"
                  onClick={downloadZip}
                  disabled={zipping}
                >
                  {zipping ? "Zipping..." : `⬇ Download ZIP (${textbookCount} PDF)`}
                </button>
              </>
            )}
          </div>

          <div className="bp-list">
            {Object.entries(byUnit).map(([unitNum, unitLessons]) => (
              <div key={unitNum} className="bp-unit">
                <div className="bp-unit-header">
                  UNIT {unitNum} — {unitLessons[0].unitTitle}
                </div>
                {unitLessons.map((lesson) => {
                  const scriptDot = lesson.scriptPhase === "running" ? "🔄"
                    : lesson.scriptPhase === "error" ? "❌"
                    : (lesson.hasScript || lesson.scriptPhase === "done") ? "🟢" : "⬜";

                  const tbStatus = lesson.textbook.status;
                  const tbPhase = lesson.textbookPhase;
                  const tbDot = tbPhase === "running" ? "🔄"
                    : tbPhase === "error" ? "❌"
                    : (tbStatus === "ready" || tbPhase === "done") ? "🟢"
                    : tbStatus === "processing" ? "🔄"
                    : tbStatus === "error" ? "❌"
                    : "⬜";

                  const downloadUrl = lesson.textbook.pdfUrl || lesson.textbook.docxUrl;

                  return (
                    <div key={lesson.id} className="bp-lesson">
                      <span className="bp-lesson-num">
                        {padNum(lesson.unitNumber)}-{padNum(lesson.lessonNumber)}
                      </span>
                      <span className="bp-lesson-title">{lesson.title}</span>
                      <span className="bp-dot" title="Script">{scriptDot}</span>
                      <span className="bp-dot" title="PDF">{tbDot}</span>
                      {!running && lesson.hasScript && (
                        <button
                          className="bp-retry-btn"
                          title="Regenerate PDF"
                          onClick={() => generateTextbook(lesson)}
                          disabled={tbPhase === "running"}
                        >
                          {tbPhase === "running" ? "…" : "↺"}
                        </button>
                      )}
                      {(lesson.textbook.status === "ready" || tbPhase === "done") && downloadUrl && (
                        <a
                          className="bp-dl-link"
                          href={downloadUrl}
                          download={pdfFilename(lesson)}
                          target="_blank"
                          rel="noreferrer"
                        >
                          ⬇
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </>
      )}

      <style>{`
        .bp-root {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 0.5rem 0;
          max-width: 800px;
        }
        .bp-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 1rem;
          padding: 1rem 1.2rem;
          background: #111;
          border: 1px solid #222;
          border-radius: 0.75rem;
        }
        .bp-title { font-size: 1rem; font-weight: 700; color: #e5e5e5; }
        .bp-sub { font-size: 0.72rem; color: #555; margin-top: 0.2rem; }

        .bp-btn-load {
          padding: 0.45rem 0.9rem;
          background: #1a1a1a;
          color: #888;
          border: 1px solid #2a2a2a;
          border-radius: 0.5rem;
          font-size: 0.78rem;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
        }
        .bp-btn-load:hover:not(:disabled) { background: #222; color: #ccc; }
        .bp-btn-load:disabled { opacity: 0.4; cursor: default; }

        .bp-btn-recover {
          padding: 0.35rem 0.7rem;
          background: rgba(0,200,150,0.08);
          color: #00C896;
          border: 1px solid rgba(0,200,150,0.25);
          border-radius: 0.5rem;
          font-size: 0.72rem;
          font-weight: 600;
          cursor: pointer;
          white-space: nowrap;
        }
        .bp-btn-recover:hover:not(:disabled) { background: rgba(0,200,150,0.15); }
        .bp-btn-recover:disabled { opacity: 0.4; cursor: default; }

        .bp-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .bp-btn {
          padding: 0.55rem 1rem;
          border: none;
          border-radius: 0.5rem;
          font-size: 0.8rem;
          font-weight: 700;
          cursor: pointer;
          transition: filter 0.15s, opacity 0.15s;
        }
        .bp-btn:disabled { opacity: 0.4; cursor: default; }
        .bp-btn:not(:disabled):hover { filter: brightness(1.1); }
        .bp-btn-green  { background: #00C896; color: #0a0a0a; }
        .bp-btn-blue   { background: #4361EE; color: #fff; }
        .bp-btn-teal   { background: #00B4D8; color: #0a0a0a; }
        .bp-btn-red    { background: #EF233C; color: #fff; }
        .bp-btn-orange { background: #FF6B35; color: #fff; }
        .bp-btn-zip    { background: #FFD60A; color: #0a0a0a; }

        .bp-progress-wrap {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          padding: 0.9rem 1.2rem;
          background: #0d0d0d;
          border: 1px solid #1a1a1a;
          border-radius: 0.75rem;
        }
        .bp-progress-bar-bg {
          width: 100%;
          height: 4px;
          background: #1a1a1a;
          border-radius: 999px;
          overflow: hidden;
        }
        .bp-progress-bar-fill {
          height: 100%;
          background: #00C896;
          border-radius: 999px;
          transition: width 0.3s ease;
        }
        .bp-progress-label { font-size: 0.72rem; color: #666; }

        .bp-counters {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem 1.2rem;
          background: #0d0d0d;
          border: 1px solid #1a1a1a;
          border-radius: 0.75rem;
        }
        .bp-counter { display: flex; flex-direction: column; align-items: center; gap: 0.1rem; }
        .bp-counter-num { font-size: 1.1rem; font-weight: 700; color: #00C896; }
        .bp-counter-label { font-size: 0.62rem; color: #555; text-transform: uppercase; letter-spacing: 0.06em; }
        .bp-divider { width: 1px; height: 2rem; background: #222; }

        .bp-list {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          max-height: 520px;
          overflow-y: auto;
          padding-right: 0.25rem;
        }
        .bp-unit-header {
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: #444;
          text-transform: uppercase;
          padding: 0.3rem 0.5rem;
          border-bottom: 1px solid #1a1a1a;
          margin-bottom: 0.25rem;
        }
        .bp-lesson {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.35rem 0.5rem;
          border-radius: 0.4rem;
          transition: background 0.1s;
        }
        .bp-lesson:hover { background: #111; }
        .bp-lesson-num {
          font-size: 0.65rem;
          font-weight: 700;
          color: #444;
          min-width: 3rem;
          font-variant-numeric: tabular-nums;
        }
        .bp-lesson-title {
          flex: 1;
          font-size: 0.78rem;
          color: #ccc;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .bp-dot { font-size: 0.75rem; cursor: default; }
        .bp-retry-btn {
          font-size: 0.8rem;
          background: rgba(255,107,53,0.12);
          color: #FF6B35;
          border: 1px solid rgba(255,107,53,0.3);
          border-radius: 0.3rem;
          padding: 0.1rem 0.4rem;
          cursor: pointer;
          line-height: 1;
          transition: background 0.1s;
        }
        .bp-retry-btn:hover { background: rgba(255,107,53,0.25); }
        .bp-dl-link {
          font-size: 0.72rem;
          color: #00C896;
          text-decoration: none;
          opacity: 0.7;
          transition: opacity 0.1s;
        }
        .bp-dl-link:hover { opacity: 1; }
      `}</style>
    </div>
  );
}
