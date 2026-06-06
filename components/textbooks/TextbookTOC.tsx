"use client";

/**
 * TextbookTOC — the table-of-contents surface for a new-system
 * textbook (textbooks → textbook_units → textbook_chapters).
 *
 * Hero: cover image / icon, title, author, totals.
 * "Continue reading Ch X.XX" CTA if a chapter is in_progress, else
 * "Start with Ch 01.01" CTA.
 * Unit accordions: 8 units, each opening to chapter rows with
 * status icons (○ not started, ◐ in progress, ● completed).
 */

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { authFetch } from "@/lib/client-auth";

interface Chapter {
  id: string;
  chapter_number: string;
  unit_number: number;
  chapter_index: number;
  title: string;
  subtitle: string | null;
  ai_difficulty: string | null;
  page_count: number | null;
  estimated_read_time: number | null;
  ordinal: number;
}

interface Unit {
  id: string;
  unit_number: number;
  title: string;
  description: string | null;
  ordinal: number;
  total_chapters: number;
  chapters: Chapter[];
}

interface Textbook {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  author_name: string;
  total_pages: number | null;
  total_chapters: number | null;
  total_units: number | null;
  cover_url: string | null;
  is_premium: boolean;
}

interface ProgressEntry {
  status: string;
  last_opened_at: string | null;
  completed_at: string | null;
}

const EMOJI_BY_SLUG: Record<string, string> = {
  "ap-bio-ultimate":       "🧬",
  "ap-chem-ultimate":      "⚗️",
  "ap-physics-ultimate":   "⚛️",
  "ap-physics-2-ultimate": "🧲",
};

function StatusIcon({ status }: { status: string }) {
  if (status === "completed") return <span className="toc-icon toc-icon-done">●</span>;
  if (status === "in_progress") return <span className="toc-icon toc-icon-prog">◐</span>;
  return <span className="toc-icon toc-icon-todo">○</span>;
}

export default function TextbookTOC({ slug }: { slug: string }) {
  const [textbook, setTextbook] = useState<Textbook | null>(null);
  const [units, setUnits] = useState<Unit[]>([]);
  const [progress, setProgress] = useState<Record<string, ProgressEntry>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openUnits, setOpenUnits] = useState<Set<number>>(new Set([1]));

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await authFetch(`/api/textbooks/${encodeURIComponent(slug)}`);
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error ?? `HTTP ${res.status}`);
        if (cancelled) return;
        setTextbook(json.textbook);
        setUnits(json.units ?? []);
        setProgress(json.progress ?? {});
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [slug]);

  const continueChapter = useMemo(() => {
    if (!units.length) return null;
    // First chapter with in_progress status.
    for (const u of units) {
      for (const c of u.chapters) {
        if (progress[c.id]?.status === "in_progress") return c;
      }
    }
    // Otherwise, first chapter with no progress entry (a true new read).
    for (const u of units) {
      for (const c of u.chapters) {
        const s = progress[c.id]?.status ?? "not_started";
        if (s === "not_started") return c;
      }
    }
    return null;
  }, [units, progress]);

  const completedCount = useMemo(
    () => Object.values(progress).filter((p) => p.status === "completed").length,
    [progress],
  );
  const inProgressCount = useMemo(
    () => Object.values(progress).filter((p) => p.status === "in_progress").length,
    [progress],
  );
  const totalCh = textbook?.total_chapters ?? 0;
  const pct = totalCh > 0 ? Math.round((completedCount / totalCh) * 100) : 0;

  function toggleUnit(n: number) {
    setOpenUnits((prev) => {
      const next = new Set(prev);
      if (next.has(n)) next.delete(n);
      else next.add(n);
      return next;
    });
  }

  if (loading) return <ShellMsg msg="Loading textbook…" />;
  if (error || !textbook) return <ShellMsg msg={error ?? "Not found"} />;

  const isAnyProgress = inProgressCount > 0;
  const ctaLabel = isAnyProgress
    ? `Continue Ch ${continueChapter?.chapter_number ?? "01.01"}`
    : `Start with Ch ${continueChapter?.chapter_number ?? "01.01"}`;

  return (
    <main className="toc-root">
      <div className="toc-shell">
        {/* ── HERO ───────────────────────────────────────────── */}
        <section className="toc-hero">
          <div className="toc-hero-cover">
            <span className="toc-hero-emoji">{EMOJI_BY_SLUG[textbook.slug] ?? "📚"}</span>
          </div>
          <div className="toc-hero-meta">
            <div className="toc-stamp">
              <span className="toc-pulse" />
              <span>TEXTBOOK · {textbook.slug.toUpperCase()}</span>
            </div>
            <h1 className="toc-title">{textbook.title}</h1>
            {textbook.subtitle && <p className="toc-subtitle">{textbook.subtitle}</p>}
            <p className="toc-byline">
              By <em>InHero Originals</em>
            </p>
            <div className="toc-stats">
              <span>{textbook.total_chapters} chapters</span>
              <span>·</span>
              <span>{textbook.total_units} units</span>
              <span>·</span>
              <span>{textbook.total_pages} pages</span>
            </div>

            {totalCh > 0 && (
              <div className="toc-progress">
                <div className="toc-progress-bar">
                  <div className="toc-progress-fill" style={{ width: `${pct}%` }} />
                </div>
                <div className="toc-progress-meta">
                  {completedCount} / {totalCh} chapters · {pct}%
                </div>
              </div>
            )}

            {continueChapter && (
              <Link
                href={`/textbooks/${textbook.slug}/${continueChapter.chapter_number}`}
                className="toc-cta"
              >
                <span className="toc-cta-pre">{isAnyProgress ? "RESUME" : "BEGIN"}</span>
                <span className="toc-cta-mid">{ctaLabel} — {continueChapter.title}</span>
                <span className="toc-cta-arrow">→</span>
              </Link>
            )}
          </div>
        </section>

        {/* ── UNITS ───────────────────────────────────────────── */}
        <section className="toc-units">
          {units.map((u) => {
            const open = openUnits.has(u.unit_number);
            const unitCompleted = u.chapters.filter((c) => progress[c.id]?.status === "completed").length;
            return (
              <div key={u.id} className={`toc-unit ${open ? "is-open" : ""}`}>
                <button
                  type="button"
                  className="toc-unit-head"
                  onClick={() => toggleUnit(u.unit_number)}
                >
                  <span className="toc-unit-num">Unit {String(u.unit_number).padStart(2, "0")}</span>
                  <span className="toc-unit-title">{u.title}</span>
                  <span className="toc-unit-tally">
                    {unitCompleted} / {u.chapters.length}
                  </span>
                  <span className="toc-unit-chev" aria-hidden="true">{open ? "−" : "+"}</span>
                </button>
                {open && (
                  <ol className="toc-chapters">
                    {u.chapters.map((c) => {
                      const status = progress[c.id]?.status ?? "not_started";
                      return (
                        <li key={c.id} className="toc-row">
                          <Link
                            href={`/textbooks/${textbook.slug}/${c.chapter_number}`}
                            className="toc-row-link"
                          >
                            <StatusIcon status={status} />
                            <span className="toc-row-num">Ch {c.chapter_number}</span>
                            <span className="toc-row-title">{c.title}</span>
                            <span className="toc-row-meta">
                              {c.page_count}p · ~{c.estimated_read_time}m
                            </span>
                            {c.ai_difficulty && (
                              <span className={`toc-row-diff toc-row-diff-${c.ai_difficulty}`}>
                                {c.ai_difficulty}
                              </span>
                            )}
                          </Link>
                        </li>
                      );
                    })}
                  </ol>
                )}
              </div>
            );
          })}
        </section>

        <div className="toc-foot">
          <Link href="/textbooks" className="toc-foot-back">← All textbooks</Link>
        </div>
      </div>

      <style>{tocCss}</style>
    </main>
  );
}

function ShellMsg({ msg }: { msg: string }) {
  return (
    <main className="toc-root">
      <div className="toc-shell">
        <div className="toc-msg">{msg}</div>
      </div>
      <style>{tocCss}</style>
    </main>
  );
}

const tocCss = `
  .toc-root {
    min-height: 100vh;
    padding: 3rem 1.25rem 5rem;
    background:
      radial-gradient(ellipse at 50% 0%, rgba(94,234,212,0.05), transparent 55%),
      radial-gradient(ellipse at 90% 80%, rgba(169,156,255,0.04), transparent 60%),
      #050610;
    font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif;
    color: #d8d9e6;
  }
  .toc-shell { max-width: 64rem; margin: 0 auto; display: flex; flex-direction: column; gap: 2.25rem; }
  .toc-msg {
    padding: 4rem 0;
    text-align: center;
    font-family: ui-monospace, monospace;
    font-size: 0.85rem;
    color: rgba(148,163,184,0.7);
  }

  /* ── Hero ──────────────────────────────────────────────────── */
  .toc-hero {
    display: grid;
    grid-template-columns: minmax(0, 14rem) 1fr;
    gap: 2rem;
    align-items: start;
  }
  @media (max-width: 640px) {
    .toc-hero { grid-template-columns: 1fr; }
  }
  .toc-hero-cover {
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    aspect-ratio: 3 / 4;
    background: linear-gradient(160deg, rgba(94,234,212,0.18), rgba(169,156,255,0.18));
    border: 1px solid rgba(94,234,212,0.3);
    border-radius: 14px;
    padding: 1.25rem;
    box-shadow: 0 24px 48px rgba(0,0,0,0.45), 0 0 28px rgba(94,234,212,0.12);
  }
  .toc-hero-emoji { font-size: 5rem; line-height: 1; margin-bottom: 1rem; }
  .toc-hero-tier {
    font-family: ui-monospace, monospace;
    font-size: 0.6rem; font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: #F4C95D;
    text-shadow: 0 0 10px rgba(244,201,93,0.35);
    text-align: center;
  }

  .toc-hero-meta { display: flex; flex-direction: column; gap: 0.6rem; }
  .toc-stamp {
    display: inline-flex; align-items: center; gap: 0.55rem;
    font-family: ui-monospace, 'JetBrains Mono', monospace;
    font-size: 0.62rem; font-weight: 700;
    letter-spacing: 0.22em; text-transform: uppercase;
    color: #5eead4;
    text-shadow: 0 0 10px rgba(94,234,212,0.5);
    width: max-content;
  }
  .toc-pulse {
    width: 7px; height: 7px; border-radius: 50%;
    background: #5eead4;
    box-shadow: 0 0 10px rgba(94,234,212,0.7);
    animation: toc-pulse 1.6s ease-in-out infinite;
  }
  @keyframes toc-pulse {
    0%,100% { opacity: 0.55; transform: scale(0.85); }
    50%     { opacity: 1;    transform: scale(1.15); }
  }
  .toc-title {
    font-family: 'Cormorant Garamond', 'Georgia', serif;
    font-size: clamp(2.2rem, 4.5vw, 3rem); font-weight: 600;
    color: #f3f3fb;
    margin: 0;
    letter-spacing: -0.02em; line-height: 1.05;
  }
  .toc-subtitle {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-size: 1.15rem;
    color: rgba(216,217,230,0.85);
    margin: 0;
  }
  .toc-byline { font-size: 0.92rem; color: rgba(148,163,184,0.85); margin: 0.2rem 0 0; }
  .toc-byline em { font-style: normal; color: #5eead4; }
  .toc-stats {
    display: flex; gap: 0.5rem; flex-wrap: wrap;
    font-family: ui-monospace, monospace;
    font-size: 0.78rem;
    color: rgba(148,163,184,0.7);
    letter-spacing: 0.04em;
    margin-top: 0.35rem;
  }

  .toc-progress { margin-top: 0.7rem; }
  .toc-progress-bar {
    height: 6px;
    background: rgba(255,255,255,0.06);
    border-radius: 3px;
    overflow: hidden;
  }
  .toc-progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #5eead4, #a99cff);
    box-shadow: 0 0 10px rgba(94,234,212,0.4);
    transition: width 0.4s;
  }
  .toc-progress-meta {
    margin-top: 0.4rem;
    font-family: ui-monospace, monospace;
    font-size: 0.72rem;
    color: rgba(148,163,184,0.7);
    letter-spacing: 0.04em;
  }

  .toc-cta {
    display: flex; align-items: center; gap: 0.9rem; flex-wrap: wrap;
    margin-top: 1rem;
    padding: 1rem 1.3rem;
    background: linear-gradient(135deg, rgba(94,234,212,0.18), rgba(169,156,255,0.18));
    border: 1px solid rgba(94,234,212,0.4);
    border-radius: 14px;
    text-decoration: none;
    color: inherit;
    transition: filter 200ms ease, transform 100ms ease, box-shadow 240ms ease;
  }
  .toc-cta:hover {
    filter: brightness(1.1);
    transform: translateY(-1px);
    box-shadow: 0 12px 36px rgba(94,234,212,0.25);
  }
  .toc-cta-pre {
    font-family: ui-monospace, monospace;
    font-size: 0.66rem; font-weight: 700;
    letter-spacing: 0.18em;
    color: rgba(148,163,184,0.85);
  }
  .toc-cta-mid {
    flex: 1;
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.15rem; font-weight: 600;
    color: #f3f3fb;
    letter-spacing: -0.005em;
    line-height: 1.3;
  }
  .toc-cta-arrow { font-size: 1.4rem; color: #5eead4; text-shadow: 0 0 14px rgba(94,234,212,0.5); }

  /* ── Units accordion ───────────────────────────────────────── */
  .toc-units { display: flex; flex-direction: column; gap: 0.65rem; }
  .toc-unit {
    background: rgba(8,10,18,0.65);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 14px;
    overflow: hidden;
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    transition: border-color 200ms ease;
  }
  .toc-unit.is-open { border-color: rgba(94,234,212,0.28); }
  .toc-unit-head {
    display: grid;
    grid-template-columns: max-content 1fr max-content max-content;
    align-items: center;
    gap: 0.9rem;
    width: 100%;
    padding: 0.95rem 1.15rem;
    background: transparent;
    border: 0;
    text-align: left;
    cursor: pointer;
    color: inherit;
    transition: background 200ms ease;
  }
  .toc-unit-head:hover { background: rgba(94,234,212,0.04); }
  .toc-unit-num {
    font-family: ui-monospace, monospace;
    font-size: 0.7rem; font-weight: 700;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: rgba(94,234,212,0.8);
  }
  .toc-unit-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.35rem; font-weight: 600;
    color: #f3f3fb;
    letter-spacing: -0.01em;
  }
  .toc-unit-tally {
    font-family: ui-monospace, monospace;
    font-size: 0.72rem;
    color: rgba(148,163,184,0.75);
    letter-spacing: 0.04em;
  }
  .toc-unit-chev {
    font-family: ui-monospace, monospace;
    font-size: 1.15rem;
    color: rgba(94,234,212,0.7);
    width: 1.5rem; text-align: center;
  }

  .toc-chapters { margin: 0; padding: 0 0 0.65rem; list-style: none; }
  .toc-row { padding: 0 0.65rem; }
  .toc-row-link {
    display: grid;
    grid-template-columns: max-content max-content 1fr max-content max-content;
    align-items: center;
    gap: 0.7rem;
    padding: 0.55rem 0.65rem;
    margin: 0.2rem 0;
    border-radius: 8px;
    text-decoration: none;
    color: inherit;
    transition: background 150ms ease, transform 100ms ease;
  }
  .toc-row-link:hover { background: rgba(94,234,212,0.06); transform: translateX(2px); }
  .toc-icon { font-size: 1rem; width: 1rem; text-align: center; }
  .toc-icon-todo { color: rgba(148,163,184,0.5); }
  .toc-icon-prog { color: #F4C95D; text-shadow: 0 0 8px rgba(244,201,93,0.45); }
  .toc-icon-done { color: #5eead4; text-shadow: 0 0 10px rgba(94,234,212,0.5); }
  .toc-row-num {
    font-family: ui-monospace, monospace;
    font-size: 0.78rem; font-weight: 700;
    color: rgba(216,217,230,0.85);
    letter-spacing: 0.04em;
  }
  .toc-row-title {
    font-size: 0.92rem;
    color: #f3f3fb;
    line-height: 1.3;
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
  }
  .toc-row-meta {
    font-family: ui-monospace, monospace;
    font-size: 0.7rem;
    color: rgba(148,163,184,0.65);
  }
  .toc-row-diff {
    font-family: ui-monospace, monospace;
    font-size: 0.62rem; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase;
    padding: 0.1rem 0.4rem;
    border-radius: 0.25rem;
  }
  .toc-row-diff-basic        { color: #5DCAA5; background: rgba(93,202,165,0.1); }
  .toc-row-diff-intermediate { color: #F4C95D; background: rgba(244,201,93,0.1); }
  .toc-row-diff-advanced     { color: #FF8B7E; background: rgba(255,139,126,0.1); }

  @media (max-width: 720px) {
    .toc-row-link {
      grid-template-columns: max-content max-content 1fr;
      grid-row-gap: 0.15rem;
    }
    .toc-row-meta, .toc-row-diff { grid-column: 3 / -1; justify-self: end; }
  }

  /* ── Foot ──────────────────────────────────────────────────── */
  .toc-foot { margin-top: 1rem; }
  .toc-foot-back {
    font-family: ui-monospace, monospace;
    font-size: 0.74rem; font-weight: 600;
    color: rgba(148,163,184,0.7);
    letter-spacing: 0.1em;
    text-decoration: none;
  }
  .toc-foot-back:hover { color: #5eead4; }
`;
