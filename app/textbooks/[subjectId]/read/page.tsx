"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { authFetch } from "@/lib/client-auth";

// ── Chapter JSON shape (from Modal textbook_service.py) ───────────────────
interface ChapterBox extends Array<string> { 0: string; 1: string }
interface ChapterKeyTerm extends Array<string> { 0: string; 1: string }
interface ChapterSection {
  title?: string;
  subtitle?: string;
  body?: string;
  boxes?: ChapterBox[];
  key_terms?: ChapterKeyTerm[];
}
interface ChapterMCQ {
  question?: string;
  choices?: string[];
  correct?: number;
  explanation?: string;
}
interface ChapterFRQ {
  question?: string;
  rubric?: string[];
  model_answer?: string;
}
interface ChapterJson {
  chapter_title?: string;
  subtitle?: string;
  unit_name?: string;
  unit_number?: number;
  chapter_in_unit?: number;
  learning_objectives?: string[];
  sections?: ChapterSection[];
  practice_questions?: { mcq?: ChapterMCQ[]; frq?: ChapterFRQ[] };
}

interface ChapterEntry {
  lessonId: string;
  unitNumber: number;
  lessonNumber: number;
  unitTitle: string;
  title: string;
  chapterJson: ChapterJson | null;
}

// ── Helpers ───────────────────────────────────────────────────────────────
function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function paragraphs(body: string | undefined): string[] {
  return asString(body)
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

// ── Page ─────────────────────────────────────────────────────────────────
export default function TextbookReaderPage() {
  const params = useParams<{ subjectId: string }>();
  const router = useRouter();
  const subjectId = params?.subjectId ?? "";

  const [chapters, setChapters] = useState<ChapterEntry[]>([]);
  const [viewerEmail, setViewerEmail] = useState<string>("");
  const [accessReason, setAccessReason] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    if (!subjectId) return;
    setLoading(true);
    setError(null);
    (async () => {
      try {
        const res = await authFetch(`/api/textbooks/${encodeURIComponent(subjectId)}/chapters`);
        if (res.status === 401) {
          router.replace(`/auth/login?redirect=${encodeURIComponent(`/textbooks/${subjectId}/read`)}`);
          return;
        }
        if (res.status === 403) {
          setError("이 책에 대한 권한이 없어요. 결제하거나 관리자에게 문의해주세요.");
          setLoading(false);
          return;
        }
        const json = await res.json();
        if (!res.ok || !json.ok) throw new Error(json.error ?? "load failed");
        setChapters(json.chapters ?? []);
        setViewerEmail(json.viewerEmail ?? "");
        setAccessReason(json.accessReason ?? "");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    })();
  }, [subjectId, router]);

  // ── Casual-distribution friction: block right-click & key combos ────────
  useEffect(() => {
    function onContextMenu(e: MouseEvent) {
      if ((e.target as HTMLElement)?.closest(".tbr-reader")) {
        e.preventDefault();
      }
    }
    function onKey(e: KeyboardEvent) {
      // Cmd/Ctrl + S (save), + P (print), + Shift + I (devtools nudge)
      if ((e.metaKey || e.ctrlKey) && ["s", "p"].includes(e.key.toLowerCase())) {
        if (document.querySelector(".tbr-reader")) e.preventDefault();
      }
    }
    document.addEventListener("contextmenu", onContextMenu);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("contextmenu", onContextMenu);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const activeChapter = chapters[activeIdx] ?? null;
  const total = chapters.length;
  const watermarkText = useMemo(() => {
    const stamp = new Date().toISOString().slice(0, 16).replace("T", " ");
    return viewerEmail
      ? `${viewerEmail} · ${stamp} UTC · InHero`
      : `InHero textbook · ${stamp} UTC`;
  }, [viewerEmail]);

  // ── States ──────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="tbr-state">
        <span className="tbr-dot" />
        <span className="tbr-state-text">Loading textbook…</span>
        <style>{TBR_STYLES}</style>
      </div>
    );
  }
  if (error) {
    return (
      <div className="tbr-state">
        <span className="tbr-state-error">{error}</span>
        <Link href="/textbooks" className="tbr-back">← Textbooks</Link>
        <style>{TBR_STYLES}</style>
      </div>
    );
  }
  if (chapters.length === 0 || !activeChapter) {
    return (
      <div className="tbr-state">
        <span className="tbr-state-text">No chapters available yet for this textbook.</span>
        <Link href="/textbooks" className="tbr-back">← Textbooks</Link>
        <style>{TBR_STYLES}</style>
      </div>
    );
  }

  const ch = activeChapter.chapterJson ?? {};
  const sections = ch.sections ?? [];
  const mcqs = ch.practice_questions?.mcq ?? [];
  const frqs = ch.practice_questions?.frq ?? [];

  return (
    <div className="tbr-root">
      {/* TOC sidebar */}
      <aside className="tbr-toc">
        <div className="tbr-toc-head">
          <span className="tbr-toc-tag">CHAPTERS</span>
          <span className="tbr-toc-count">{total}</span>
        </div>
        <nav className="tbr-toc-list">
          {chapters.map((c, idx) => (
            <button
              key={c.lessonId}
              type="button"
              onClick={() => setActiveIdx(idx)}
              className={`tbr-toc-item${idx === activeIdx ? " is-active" : ""}`}
            >
              <span className="tbr-toc-num">
                {c.unitNumber}.{c.lessonNumber}
              </span>
              <span className="tbr-toc-title">{c.title}</span>
            </button>
          ))}
        </nav>
        <div className="tbr-toc-foot">
          <Link href="/textbooks" className="tbr-back">← All textbooks</Link>
          {accessReason === "complimentary" && (
            <span className="tbr-pill">Complimentary access</span>
          )}
        </div>
      </aside>

      {/* Main reader */}
      <main className="tbr-reader" onCopy={(e) => { e.preventDefault(); }}>
        {/* Watermarks — multiple diagonal repeats, very faint */}
        <div className="tbr-watermark" aria-hidden="true">
          {Array.from({ length: 10 }).map((_, i) => (
            <span key={i}>{watermarkText}</span>
          ))}
        </div>

        <div className="tbr-page">
          <header className="tbr-page-head">
            <div className="tbr-page-eyebrow">
              UNIT {activeChapter.unitNumber} · CHAPTER {activeChapter.lessonNumber}
              {activeChapter.unitTitle && <> · {activeChapter.unitTitle}</>}
            </div>
            <h1 className="tbr-page-title">{ch.chapter_title ?? activeChapter.title}</h1>
            {ch.subtitle && <p className="tbr-page-sub">{ch.subtitle}</p>}
            {(ch.learning_objectives?.length ?? 0) > 0 && (
              <div className="tbr-objectives">
                <div className="tbr-obj-tag">Learning objectives</div>
                <ul>
                  {ch.learning_objectives!.map((obj, i) => <li key={i}>{obj}</li>)}
                </ul>
              </div>
            )}
          </header>

          {sections.map((section, i) => (
            <section key={i} className="tbr-section">
              {section.title && <h2 className="tbr-section-title">{section.title}</h2>}
              {section.subtitle && <p className="tbr-section-sub">{section.subtitle}</p>}
              {paragraphs(section.body).map((p, j) => (
                <p key={j} className="tbr-body">{p}</p>
              ))}
              {(section.boxes ?? []).map((box, j) => (
                <div key={j} className="tbr-box">
                  <div className="tbr-box-tag">{box[0]}</div>
                  <p className="tbr-box-body">{box[1]}</p>
                </div>
              ))}
              {(section.key_terms?.length ?? 0) > 0 && (
                <div className="tbr-terms">
                  <div className="tbr-terms-tag">Key terms</div>
                  <dl>
                    {section.key_terms!.map(([term, def], j) => (
                      <div key={j} className="tbr-term-row">
                        <dt>{term}</dt>
                        <dd>{def}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </section>
          ))}

          {(mcqs.length > 0 || frqs.length > 0) && (
            <section className="tbr-practice">
              <h2 className="tbr-section-title">Practice</h2>
              {mcqs.map((q, i) => (
                <div key={i} className="tbr-mcq">
                  <div className="tbr-q-tag">MCQ {i + 1}</div>
                  <p className="tbr-q-text">{q.question}</p>
                  <ol type="A" className="tbr-choices">
                    {(q.choices ?? []).map((c, j) => (
                      <li key={j} className={typeof q.correct === "number" && j === q.correct ? "is-correct" : ""}>{c}</li>
                    ))}
                  </ol>
                  {q.explanation && <p className="tbr-explain"><strong>Why:</strong> {q.explanation}</p>}
                </div>
              ))}
              {frqs.map((q, i) => (
                <div key={i} className="tbr-frq">
                  <div className="tbr-q-tag">FRQ {i + 1}</div>
                  <p className="tbr-q-text">{q.question}</p>
                  {(q.rubric?.length ?? 0) > 0 && (
                    <ul className="tbr-rubric">
                      {q.rubric!.map((r, j) => <li key={j}>{r}</li>)}
                    </ul>
                  )}
                  {q.model_answer && <p className="tbr-model"><strong>Model answer:</strong> {q.model_answer}</p>}
                </div>
              ))}
            </section>
          )}

          <footer className="tbr-page-foot">
            <button
              type="button"
              className="tbr-nav-btn"
              onClick={() => setActiveIdx((i) => Math.max(0, i - 1))}
              disabled={activeIdx === 0}
            >
              ← Previous chapter
            </button>
            <span className="tbr-nav-status">{activeIdx + 1} / {total}</span>
            <button
              type="button"
              className="tbr-nav-btn"
              onClick={() => setActiveIdx((i) => Math.min(total - 1, i + 1))}
              disabled={activeIdx >= total - 1}
            >
              Next chapter →
            </button>
          </footer>
        </div>
      </main>

      <style>{TBR_STYLES}</style>
    </div>
  );
}

const TBR_STYLES = `
  .tbr-root {
    min-height: calc(100vh - 4rem);
    display: grid;
    grid-template-columns: 18rem minmax(0, 1fr);
    background: #050810;
    color: #e9eaf5;
    font-family: 'Inter', system-ui, sans-serif;
  }
  @media (max-width: 880px) {
    .tbr-root { grid-template-columns: 1fr; }
    .tbr-toc { position: static !important; height: auto !important; }
  }

  .tbr-state {
    min-height: calc(100vh - 4rem);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.8rem;
    color: #b8b9cc;
    background: #050810;
    padding: 2rem;
    font-family: 'Inter', system-ui, sans-serif;
  }
  .tbr-state-text { font-size: 0.95rem; }
  .tbr-state-error { font-size: 0.95rem; color: #ff8b7e; }
  .tbr-dot {
    width: 8px; height: 8px; border-radius: 50%; background: #5eead4;
    box-shadow: 0 0 12px rgba(94,234,212,0.7);
    animation: tbr-pulse 1.6s ease-in-out infinite;
  }
  @keyframes tbr-pulse {
    0%,100% { opacity: 0.5; transform: scale(0.85); }
    50%     { opacity: 1;   transform: scale(1.15); }
  }
  .tbr-back {
    color: #5eead4;
    font-family: ui-monospace, 'JetBrains Mono', monospace;
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    text-decoration: none;
  }
  .tbr-back:hover { color: #b8ffe1; }

  /* TOC sidebar */
  .tbr-toc {
    position: sticky;
    top: 4rem;
    height: calc(100vh - 4rem);
    overflow-y: auto;
    padding: 1.25rem 1rem;
    border-right: 1px solid rgba(255,255,255,0.06);
    background: rgba(7,10,20,0.75);
    display: flex; flex-direction: column; gap: 0.6rem;
  }
  .tbr-toc-head { display: flex; justify-content: space-between; align-items: center; }
  .tbr-toc-tag {
    font-family: ui-monospace, monospace;
    font-size: 0.62rem;
    font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase;
    color: #5eead4;
  }
  .tbr-toc-count {
    font-family: ui-monospace, monospace;
    font-size: 0.65rem; color: rgba(148,163,184,0.7);
  }
  .tbr-toc-list { display: flex; flex-direction: column; gap: 0.25rem; }
  .tbr-toc-item {
    display: flex; align-items: baseline; gap: 0.55rem;
    width: 100%;
    text-align: left;
    background: transparent;
    border: 0;
    color: #b8b9cc;
    padding: 0.5rem 0.6rem;
    border-radius: 0.45rem;
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
    font-size: 0.85rem;
    line-height: 1.4;
  }
  .tbr-toc-item:hover { background: rgba(94,234,212,0.06); color: #f3f3fb; }
  .tbr-toc-item.is-active {
    background: rgba(94,234,212,0.1);
    color: #f3f3fb;
    box-shadow: inset 2px 0 0 #5eead4;
  }
  .tbr-toc-num {
    font-family: ui-monospace, monospace;
    font-size: 0.7rem;
    color: rgba(148,163,184,0.7);
    min-width: 2.3rem;
    flex-shrink: 0;
  }
  .tbr-toc-title { flex: 1; min-width: 0; }
  .tbr-toc-foot { margin-top: auto; padding-top: 0.8rem; border-top: 1px solid rgba(255,255,255,0.05); display: flex; flex-direction: column; gap: 0.4rem; }
  .tbr-pill {
    font-family: ui-monospace, monospace;
    font-size: 0.6rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #c4b5fd;
    background: rgba(196,181,253,0.1);
    padding: 0.25rem 0.5rem;
    border-radius: 0.3rem;
    align-self: flex-start;
  }

  /* Reader */
  .tbr-reader {
    position: relative;
    overflow: hidden;
    padding: 2rem 1.25rem 4rem;
    /* Prevent text selection / copy */
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
  }
  .tbr-watermark {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6rem 4rem;
    transform: rotate(-22deg) scale(1.4);
    transform-origin: center;
    font-family: ui-monospace, monospace;
    font-size: 0.8rem;
    color: rgba(255,255,255,0.04);
    letter-spacing: 0.08em;
    white-space: nowrap;
  }
  .tbr-page {
    position: relative;
    z-index: 1;
    max-width: 44rem;
    margin: 0 auto;
    background: rgba(10,14,26,0.55);
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 0.8rem;
    padding: 2.25rem 2rem;
    box-shadow: 0 24px 80px rgba(0,0,0,0.4);
  }
  .tbr-page-head { border-bottom: 1px solid rgba(255,255,255,0.06); padding-bottom: 1.25rem; margin-bottom: 1.5rem; }
  .tbr-page-eyebrow {
    font-family: ui-monospace, monospace;
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #5eead4;
    margin-bottom: 0.6rem;
  }
  .tbr-page-title {
    font-family: 'Cormorant Garamond', 'EB Garamond', 'Georgia', serif;
    font-size: 2rem;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: #f3f3fb;
    margin: 0 0 0.4rem;
    line-height: 1.15;
  }
  .tbr-page-sub {
    font-family: 'Cormorant Garamond', 'Georgia', serif;
    font-size: 1.05rem;
    font-style: italic;
    color: #94a3b8;
    margin: 0;
  }

  .tbr-objectives {
    margin-top: 1.1rem;
    padding: 0.8rem 1rem;
    border-left: 2px solid #5eead4;
    background: rgba(94,234,212,0.04);
    border-radius: 0 0.45rem 0.45rem 0;
  }
  .tbr-obj-tag {
    font-family: ui-monospace, monospace;
    font-size: 0.6rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #5eead4;
    margin-bottom: 0.4rem;
  }
  .tbr-objectives ul { margin: 0; padding-left: 1.1rem; color: #d8d9e6; font-size: 0.88rem; line-height: 1.55; }

  .tbr-section { margin: 2rem 0; }
  .tbr-section-title {
    font-family: 'Cormorant Garamond', 'Georgia', serif;
    font-size: 1.4rem;
    font-weight: 600;
    color: #f3f3fb;
    margin: 0 0 0.25rem;
    letter-spacing: -0.005em;
  }
  .tbr-section-sub {
    font-family: 'Cormorant Garamond', 'Georgia', serif;
    font-size: 0.98rem;
    font-style: italic;
    color: #94a3b8;
    margin: 0 0 0.9rem;
  }
  .tbr-body {
    font-size: 0.97rem;
    line-height: 1.72;
    color: #d8d9e6;
    margin: 0 0 0.95rem;
  }

  .tbr-box {
    margin: 1rem 0;
    padding: 0.85rem 1rem;
    border-left: 2px solid #F4C95D;
    background: rgba(244,201,93,0.05);
    border-radius: 0 0.45rem 0.45rem 0;
  }
  .tbr-box-tag {
    font-family: ui-monospace, monospace;
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #F4C95D;
    margin-bottom: 0.35rem;
  }
  .tbr-box-body { margin: 0; font-size: 0.9rem; line-height: 1.6; color: #e8d99a; }

  .tbr-terms { margin: 1rem 0; padding: 0.85rem 1rem; background: rgba(255,255,255,0.02); border-radius: 0.5rem; }
  .tbr-terms-tag {
    font-family: ui-monospace, monospace;
    font-size: 0.6rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #5DCAA5;
    margin-bottom: 0.5rem;
  }
  .tbr-terms dl { margin: 0; display: flex; flex-direction: column; gap: 0.55rem; }
  .tbr-term-row dt { font-weight: 600; color: #5DCAA5; font-size: 0.9rem; }
  .tbr-term-row dd { margin: 0.1rem 0 0; color: #c8c9da; font-size: 0.88rem; line-height: 1.55; }

  .tbr-practice { margin-top: 2.5rem; padding-top: 1.5rem; border-top: 1px solid rgba(255,255,255,0.08); }
  .tbr-mcq, .tbr-frq {
    margin-top: 1rem;
    padding: 0.9rem 1rem;
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 0.5rem;
    background: rgba(255,255,255,0.02);
  }
  .tbr-q-tag {
    font-family: ui-monospace, monospace;
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #A99CFF;
    margin-bottom: 0.45rem;
  }
  .tbr-q-text { margin: 0 0 0.65rem; color: #e9eaf5; font-size: 0.93rem; line-height: 1.55; }
  .tbr-choices { margin: 0 0 0.7rem; padding-left: 1.2rem; color: #d8d9e6; font-size: 0.88rem; }
  .tbr-choices li { padding: 0.18rem 0; line-height: 1.55; }
  .tbr-choices li.is-correct { color: #5DCAA5; font-weight: 600; }
  .tbr-rubric { margin: 0 0 0.6rem; padding-left: 1.2rem; color: #94a3b8; font-size: 0.85rem; }
  .tbr-explain, .tbr-model {
    margin: 0.5rem 0 0;
    font-size: 0.85rem;
    line-height: 1.6;
    color: #b8b9cc;
  }
  .tbr-explain strong, .tbr-model strong { color: #5eead4; font-weight: 600; }

  .tbr-page-foot {
    margin-top: 2.5rem;
    padding-top: 1.2rem;
    border-top: 1px solid rgba(255,255,255,0.06);
    display: flex; justify-content: space-between; align-items: center; gap: 0.5rem;
  }
  .tbr-nav-btn {
    font-family: ui-monospace, monospace;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    padding: 0.55rem 0.9rem;
    border: 1px solid rgba(94,234,212,0.35);
    border-radius: 0.4rem;
    background: rgba(94,234,212,0.06);
    color: #5eead4;
    cursor: pointer;
    transition: background 0.15s, box-shadow 0.2s;
  }
  .tbr-nav-btn:hover:not(:disabled) {
    background: rgba(94,234,212,0.14);
    box-shadow: 0 0 0 1px #5eead4, 0 0 14px rgba(94,234,212,0.3);
  }
  .tbr-nav-btn:disabled { opacity: 0.35; cursor: default; }
  .tbr-nav-status {
    font-family: ui-monospace, monospace;
    font-size: 0.75rem;
    letter-spacing: 0.12em;
    color: rgba(148,163,184,0.75);
  }

  /* Print kill — hide everything if user tries to print */
  @media print {
    .tbr-root, .tbr-state { display: none !important; }
    body::after {
      content: "Printing is disabled for InHero textbooks.";
      display: block;
      padding: 4rem;
      font-family: ui-monospace, monospace;
      text-align: center;
    }
  }
`;
