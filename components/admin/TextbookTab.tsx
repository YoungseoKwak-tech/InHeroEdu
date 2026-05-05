"use client";

import { useState, useEffect, useRef } from "react";
import { authFetch } from "@/lib/client-auth";

interface Props {
  lessonId: string;
  lessonTitle: string;
  subject: string;
  unit: string;
  category: string;
  script: string;
}

function getTabLabel(category: string): string {
  switch (category) {
    case "AP":          return "📖 AP Textbook";
    case "Competition": return "🏆 Competition Guide";
    case "Test Prep":   return "📝 Exam Playbook";
    default:            return "📖 Study Guide";
  }
}

function getPageEstimate(script: string): string {
  const len = script.length;
  if (len < 2000) return "~4-6 pages";
  if (len < 5000) return "~6-10 pages";
  return "~10-15 pages";
}

function deriveCategory(subject: string): string {
  if (/^ap /i.test(subject)) return "AP";
  if (/^honors /i.test(subject)) return "Honors";
  if (/amc|aime|olympiad|mathcounts/i.test(subject)) return "Competition";
  if (/sat|act|psat/i.test(subject)) return "Test Prep";
  return "Core";
}

function getProgressMessage(elapsedSeconds: number): string {
  if (elapsedSeconds < 15) return "Sending to Modal cloud...";
  if (elapsedSeconds < 30) return "Generating chapter content with AI...";
  if (elapsedSeconds < 50) return "Rendering cosmic-themed PDF...";
  if (elapsedSeconds < 70) return "Uploading to Supabase storage...";
  return "Almost done — finalizing PDF...";
}

type JobStatus = "idle" | "processing" | "ready" | "error";

export default function TextbookTab({ lessonId, lessonTitle, subject, unit, category: rawCategory, script }: Props) {
  const [jobStatus, setJobStatus] = useState<JobStatus>("idle");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [pages, setPages] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [lastGenerated, setLastGenerated] = useState<string | null>(null);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const category = rawCategory || deriveCategory(subject);
  const tabLabel = getTabLabel(category);
  const pageEstimate = getPageEstimate(script);
  const hasScript = script.trim().length > 0;

  function stopTimer() {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
  }

  useEffect(() => () => stopTimer(), []);

  // On mount, check if there's already a ready PDF for this lesson
  useEffect(() => {
    authFetch(`/api/textbook-status?lessonId=${lessonId}`)
      .then((r) => r.json())
      .then(({ status, pdfUrl: url }: { status: string; pdfUrl: string | null }) => {
        if (status === "ready" && url) {
          setJobStatus("ready");
          setPdfUrl(url);
        }
      })
      .catch(() => {});
  }, [lessonId]);

  async function handleGenerate() {
    if (!hasScript) return;
    stopTimer();
    setJobStatus("processing");
    setError(null);
    setPdfUrl(null);
    setPages(0);
    setElapsedSeconds(0);

    timerRef.current = setInterval(() => {
      setElapsedSeconds((s) => s + 1);
    }, 1000);

    try {
      const res = await authFetch("/api/generate-textbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lessonId, lessonTitle, subject, unit, category, script }),
      });

      stopTimer();

      if (!res.ok) {
        let msg = `PDF generation failed (${res.status})`;
        try { const j = await res.json(); if (j.error) msg = j.error; } catch { /* noop */ }
        setError(msg);
        setJobStatus("idle");
        return;
      }

      const { pdfUrl: url, pages: pageCount } = await res.json() as { pdfUrl: string | null; pages: number };
      setPdfUrl(url ?? null);
      setPages(pageCount ?? 0);
      setJobStatus("ready");
      setLastGenerated(new Date().toLocaleTimeString());
    } catch (err) {
      stopTimer();
      setError(err instanceof Error ? err.message : "Unexpected error");
      setJobStatus("idle");
    }
  }

  function handleDownload() {
    if (!pdfUrl) return;
    const a = document.createElement("a");
    const filename = `InHero_${category}_${subject.replace(/\s+/g, "_")}_${lessonTitle.replace(/\s+/g, "_")}.pdf`;
    const cacheBustedUrl = new URL(pdfUrl, window.location.href);
    cacheBustedUrl.searchParams.set("download", Date.now().toString());
    a.href = cacheBustedUrl.toString();
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  const isProcessing = jobStatus === "processing";
  const progressMsg = getProgressMessage(elapsedSeconds);

  return (
    <div className="tb-root">
      {/* Header card */}
      <div className="tb-header">
        <div className="tb-header-left">
          <span className="tb-label">{tabLabel}</span>
          <h2 className="tb-title">{lessonTitle}</h2>
          <p className="tb-sub">
            {subject} · {unit || "General"} · {category}
          </p>
        </div>
        <div className="tb-meta">
          {hasScript ? (
            <>
              <span className="tb-badge tb-badge-green">✓ Script ready</span>
              <span className="tb-badge">{pageEstimate}</span>
              <span className="tb-badge">{script.length.toLocaleString()} chars</span>
            </>
          ) : (
            <span className="tb-badge tb-badge-warn">⚠ No script — generate script first</span>
          )}
        </div>
      </div>

      {/* What this generates */}
      <div className="tb-info">
        <div className="tb-info-title">What gets generated</div>
        <div className="tb-info-grid">
          <div className="tb-info-item"><span className="tb-info-icon">📑</span><span>Cosmic dark-themed PDF textbook</span></div>
          <div className="tb-info-item"><span className="tb-info-icon">📚</span><span>3–4 sections with rigorous prose</span></div>
          <div className="tb-info-item"><span className="tb-info-icon">🔑</span><span>Key terms table per section</span></div>
          <div className="tb-info-item"><span className="tb-info-icon">⚠</span><span>AP Exam Alert boxes</span></div>
          <div className="tb-info-item"><span className="tb-info-icon">❓</span><span>MCQ + FRQ with full answer key</span></div>
          <div className="tb-info-item"><span className="tb-info-icon">⚡</span><span>Rendered by Modal cloud (ReportLab)</span></div>
        </div>
      </div>

      {/* Actions */}
      <div className="tb-actions">
        <button
          onClick={handleGenerate}
          disabled={isProcessing || !hasScript}
          className="tb-btn-primary"
        >
          {isProcessing ? (
            <><span className="tb-spinner" /> {progressMsg}</>
          ) : (
            "⬇ Generate PDF Textbook"
          )}
        </button>

        {jobStatus === "ready" && pdfUrl && (
          <button onClick={handleDownload} className="tb-btn-download">
            ⬇ Download PDF{pages > 0 ? ` (${pages} pages)` : ""}
          </button>
        )}

        {lastGenerated && !isProcessing && (
          <span className="tb-last">Last generated at {lastGenerated}</span>
        )}
      </div>

      {error && <div className="tb-error">{error}</div>}

      {/* Progress while processing */}
      {isProcessing && (
        <div className="tb-progress">
          <div className="tb-progress-bar" />
          <p className="tb-progress-text">
            {progressMsg}
            <br />
            <span className="tb-progress-sub">
              {elapsedSeconds}s elapsed · Running on Modal · Keep this tab open
            </span>
          </p>
        </div>
      )}

      {/* Ready state */}
      {jobStatus === "ready" && pdfUrl && !isProcessing && (
        <div className="tb-ready">
          <span className="tb-ready-icon">✓</span>
          <div>
            <div className="tb-ready-title">PDF textbook ready{pages > 0 ? ` — ${pages} pages` : ""}</div>
            <div className="tb-ready-sub">Click Download PDF to save your file.</div>
          </div>
        </div>
      )}

      {/* Design theme preview */}
      <div className="tb-preview-card">
        <div className="tb-preview-label">Design theme</div>
        <CategoryThemePreview category={category} />
      </div>

      <style>{`
        .tb-root {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 0.25rem 0;
          max-width: 640px;
        }

        .tb-header {
          display: flex;
          gap: 1rem;
          justify-content: space-between;
          align-items: flex-start;
          padding: 1rem 1.2rem;
          background: #111;
          border: 1px solid #222;
          border-radius: 0.75rem;
        }
        .tb-header-left { display: flex; flex-direction: column; gap: 0.25rem; }
        .tb-label { font-size: 0.65rem; font-weight: 700; letter-spacing: 0.08em; color: #555; text-transform: uppercase; }
        .tb-title { font-size: 1.05rem; font-weight: 700; color: #e5e5e5; margin: 0; line-height: 1.3; }
        .tb-sub { font-size: 0.72rem; color: #555; margin: 0; }
        .tb-meta { display: flex; flex-wrap: wrap; gap: 0.4rem; align-items: flex-start; }
        .tb-badge {
          font-size: 0.65rem;
          font-weight: 600;
          padding: 0.25rem 0.55rem;
          border-radius: 999px;
          background: #1a1a1a;
          color: #888;
          border: 1px solid #2a2a2a;
          white-space: nowrap;
        }
        .tb-badge-green { background: rgba(0,200,150,0.08); color: #00C896; border-color: rgba(0,200,150,0.2); }
        .tb-badge-warn  { background: rgba(255,107,53,0.08); color: #FF6B35; border-color: rgba(255,107,53,0.2); }

        .tb-info {
          padding: 0.9rem 1.2rem;
          background: #0d0d0d;
          border: 1px solid #1a1a1a;
          border-radius: 0.75rem;
        }
        .tb-info-title {
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: #444;
          text-transform: uppercase;
          margin-bottom: 0.65rem;
        }
        .tb-info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.4rem; }
        .tb-info-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.75rem;
          color: #777;
        }
        .tb-info-icon { font-size: 0.85rem; }

        .tb-actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex-wrap: wrap;
        }
        .tb-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.65rem 1.25rem;
          background: #00C896;
          color: #0a0a0a;
          border: none;
          border-radius: 0.6rem;
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
          transition: filter 0.15s, opacity 0.15s;
        }
        .tb-btn-primary:disabled { opacity: 0.4; cursor: default; }
        .tb-btn-primary:not(:disabled):hover { filter: brightness(1.08); }

        .tb-btn-download {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.65rem 1.25rem;
          background: transparent;
          color: #00C896;
          border: 1px solid rgba(0,200,150,0.35);
          border-radius: 0.6rem;
          font-size: 0.85rem;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.15s, border-color 0.15s;
        }
        .tb-btn-download:hover { background: rgba(0,200,150,0.08); border-color: rgba(0,200,150,0.6); }

        .tb-last { font-size: 0.68rem; color: #444; }

        .tb-error {
          padding: 0.75rem 1rem;
          background: rgba(248,113,113,0.06);
          color: #fecaca;
          border: 1px solid rgba(248,113,113,0.18);
          border-radius: 0.6rem;
          font-size: 0.78rem;
        }

        .tb-progress {
          padding: 1.25rem;
          background: #0d0d0d;
          border: 1px solid #1a1a1a;
          border-radius: 0.75rem;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          align-items: center;
          text-align: center;
        }
        .tb-progress-bar {
          width: 100%;
          height: 3px;
          background: #1a1a1a;
          border-radius: 999px;
          overflow: hidden;
          position: relative;
        }
        .tb-progress-bar::after {
          content: '';
          position: absolute;
          top: 0; left: -60%;
          width: 60%;
          height: 100%;
          background: linear-gradient(90deg, transparent, #00C896, transparent);
          animation: tb-scan 1.6s ease-in-out infinite;
        }
        @keyframes tb-scan { to { left: 100%; } }
        .tb-progress-text { font-size: 0.8rem; color: #888; line-height: 1.6; margin: 0; }
        .tb-progress-sub { font-size: 0.7rem; color: #555; }

        .tb-spinner {
          width: 0.8rem; height: 0.8rem;
          border-radius: 50%;
          border: 2px solid rgba(10,10,10,0.2);
          border-top-color: #0a0a0a;
          animation: tb-spin 0.6s linear infinite;
        }
        @keyframes tb-spin { to { transform: rotate(360deg); } }

        .tb-ready {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.9rem 1.2rem;
          background: rgba(0,200,150,0.06);
          border: 1px solid rgba(0,200,150,0.2);
          border-radius: 0.75rem;
        }
        .tb-ready-icon { font-size: 1.2rem; color: #00C896; }
        .tb-ready-title { font-size: 0.85rem; font-weight: 700; color: #00C896; }
        .tb-ready-sub { font-size: 0.72rem; color: #555; margin-top: 0.1rem; }

        .tb-preview-card {
          padding: 0.9rem 1.2rem;
          background: #0d0d0d;
          border: 1px solid #1a1a1a;
          border-radius: 0.75rem;
        }
        .tb-preview-label {
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: #444;
          text-transform: uppercase;
          margin-bottom: 0.65rem;
        }
      `}</style>
    </div>
  );
}

function CategoryThemePreview({ category }: { category: string }) {
  const themes: Record<string, { primary: string; secondary: string; accent: string; name: string }> = {
    "AP":          { primary: "#0B1020", secondary: "#63D6B1", accent: "#F2994A", name: "Cosmic Navy + Emerald" },
    "Honors":      { primary: "#1A2E2E", secondary: "#00B4D8", accent: "#F77F00", name: "Honors Teal + Sky" },
    "Core":        { primary: "#1E2D40", secondary: "#4361EE", accent: "#F72585", name: "Core Slate + Blue" },
    "Competition": { primary: "#2D1B4E", secondary: "#C77DFF", accent: "#FFD60A", name: "Competition Purple + Gold" },
    "Test Prep":   { primary: "#2E1A1A", secondary: "#EF233C", accent: "#FCBF49", name: "Test Prep Red + Amber" },
  };
  const theme = themes[category] ?? themes["AP"];

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
      <div style={{ display: "flex", gap: "0.3rem" }}>
        {[theme.primary, theme.secondary, theme.accent].map((c, i) => (
          <div
            key={i}
            style={{
              width: "1.2rem",
              height: "1.2rem",
              borderRadius: "4px",
              background: c,
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          />
        ))}
      </div>
      <span style={{ fontSize: "0.72rem", color: "#666" }}>{theme.name}</span>
    </div>
  );
}
