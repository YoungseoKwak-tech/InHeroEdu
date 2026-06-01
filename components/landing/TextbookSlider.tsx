"use client";

/**
 * TextbookSlider — "Inside the Logic" hero showcase of actual Field Manual
 * spreads. Replaces the locker grid. Images live in /public/textbook-preview/.
 *
 * Each slide pairs an actual textbook page screenshot with a side panel
 * positioning copy (Architect's Notes, 0.1s Sync, Field Testing, Perfect
 * Execution).
 */

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface Slide {
  image: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  body: string;
  caption: string;
}

const SLIDES: Slide[] = [
  {
    image: "/textbook-preview/slide-01.png",
    eyebrow: "ANNOTATED BY THE ARCHITECT",
    title: "Architect's Personal Notes",
    subtitle: "Handwritten · No filler · Pure logic.",
    body:
      "Architect-grade annotations sit alongside the typed chapter. Not study tips — the exact voice that will replay in your head on test day.",
    caption:
      "Mechanism-first prose on the left, the Architect's handwritten map of bond types on the right. One spread, two layers of understanding.",
  },
  {
    image: "/textbook-preview/slide-02.png",
    eyebrow: "0.1s CONCEPTUAL SYNC",
    title: "Vesicle Budding, decoded",
    subtitle: "Complex mechanism → one decisive diagram.",
    body:
      "Every mechanism is rebuilt as a single diagram. Memorization is for students who don't have this book.",
    caption:
      "The vesicle pathway every student fakes through. Here it's laid out step-by-step with cargo adaptors, COPI/COPII, and recycling routes labelled by hand.",
  },
  {
    image: "/textbook-preview/slide-03.png",
    eyebrow: "FIELD TESTING YOUR LOGIC",
    title: "MCQ + FRQ, exam-grade",
    subtitle: "Killer questions, zero filler.",
    body:
      "Question packs written to break weak reasoning, not to fill pages. Deploy the chapter's logic immediately.",
    caption:
      "Multiple choice on the left, multi-part free response on the right — both calibrated to the traps the AP exam actually uses.",
  },
  {
    image: "/textbook-preview/slide-04.png",
    eyebrow: "THE PERFECT EXECUTION",
    title: "Answer Key + Scoring Rubric",
    subtitle: "Rubric included. Model answers, by design.",
    body:
      "Rubrics that map the grader's mind. Model answers that close every loophole. Perfection by design, not by luck.",
    caption:
      "Worked MCQ explanations on the left. FRQ scoring points + a full model answer on the right — written the way a top-scoring student would write it.",
  },
];

const AUTO_ROTATE_MS = 7500;

export default function TextbookSlider() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (paused) return;
    timerRef.current = window.setTimeout(() => {
      setIdx((i) => (i + 1) % SLIDES.length);
    }, AUTO_ROTATE_MS);
    return () => {
      if (timerRef.current != null) window.clearTimeout(timerRef.current);
    };
  }, [idx, paused]);

  function go(next: number) {
    setIdx((next + SLIDES.length) % SLIDES.length);
  }

  const slide = SLIDES[idx];

  return (
    <section
      className="ts-root"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="ts-stars" aria-hidden="true" />
      <div className="ts-inner">
        <header className="ts-head">
          <div className="ts-eyebrow">
            <span className="ts-pulse" />
            <span>THE LIBRARY · INSIDE THE LOGIC</span>
          </div>
          <h2 className="ts-title">
            The blueprint of <em>perfection</em>.
          </h2>
          <p className="ts-sub">
            Field Manuals modeled on top-scorer thinking. Visual logic — no memorization required.
          </p>
        </header>

        <div className="ts-stage">
          {/* Left — textbook spread mockup */}
          <div className="ts-mockup">
            <div className="ts-bezel">
              {SLIDES.map((s, i) => (
                <img
                  key={s.image}
                  src={s.image}
                  alt={s.title}
                  className={`ts-page ${i === idx ? "is-active" : ""}`}
                  loading={i === 0 ? "eager" : "lazy"}
                />
              ))}
              <div className="ts-stamp">
                <span>FIELD MANUAL · {String(idx + 1).padStart(2, "0")} / {SLIDES.length}</span>
              </div>
            </div>
          </div>

          {/* Right — caption panel */}
          <div className="ts-side">
            <div className="ts-side-eyebrow">{slide.eyebrow}</div>
            <h3 className="ts-side-title">{slide.title}</h3>
            <p className="ts-side-subtitle">{slide.subtitle}</p>
            <p className="ts-side-body">{slide.body}</p>
            <p className="ts-side-body-en">{slide.caption}</p>

            <div className="ts-controls">
              <button
                type="button"
                className="ts-arrow"
                onClick={() => go(idx - 1)}
                aria-label="Previous"
              >
                ←
              </button>
              <div className="ts-dots" role="tablist">
                {SLIDES.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => go(i)}
                    className={`ts-dot ${i === idx ? "is-active" : ""}`}
                    aria-label={`Slide ${i + 1}`}
                    aria-selected={i === idx}
                    role="tab"
                  />
                ))}
              </div>
              <button
                type="button"
                className="ts-arrow"
                onClick={() => go(idx + 1)}
                aria-label="Next"
              >
                →
              </button>
            </div>

            <div className="ts-cta-row">
              <Link href="/textbooks" className="ts-cta-primary">
                ENTER THE LIBRARY  →
              </Link>
              <span className="ts-cta-note">$29 · ~150 pages · 65 chapters</span>
            </div>
          </div>
        </div>

        {/* Bottom row — small thumbnails */}
        <div className="ts-thumbs">
          {SLIDES.map((s, i) => (
            <button
              key={s.image}
              type="button"
              onClick={() => go(i)}
              className={`ts-thumb ${i === idx ? "is-active" : ""}`}
              aria-label={s.title}
            >
              <span className="ts-thumb-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="ts-thumb-label">{s.title}</span>
            </button>
          ))}
        </div>
      </div>

      <style>{TS_STYLES}</style>
    </section>
  );
}

const TS_STYLES = `
  .ts-root {
    position: relative;
    padding: 5rem 1.25rem 4rem;
    background: linear-gradient(180deg, #03050d 0%, #060810 100%);
    color: #d8d9e6;
    overflow: hidden;
    font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif;
  }
  .ts-stars {
    position: absolute; inset: 0; pointer-events: none; opacity: 0.3;
    background-image:
      radial-gradient(1px 1px at 22% 28%, rgba(255,255,255,0.7), transparent 100%),
      radial-gradient(1px 1px at 78% 14%, rgba(255,255,255,0.5),  transparent 100%),
      radial-gradient(1px 1px at 42% 72%, rgba(255,255,255,0.55), transparent 100%);
    background-size: 280px 280px;
  }
  .ts-inner { position: relative; max-width: 84rem; margin: 0 auto; }

  .ts-head { display: flex; flex-direction: column; gap: 0.4rem; margin-bottom: 2rem; }
  .ts-eyebrow {
    display: inline-flex; align-items: center; gap: 0.55rem;
    font-family: ui-monospace, monospace;
    font-size: 0.65rem; font-weight: 700; letter-spacing: 0.24em;
    text-transform: uppercase; color: #F4C95D;
    text-shadow: 0 0 10px rgba(244,201,93,0.5);
  }
  .ts-pulse {
    width: 7px; height: 7px; border-radius: 50%;
    background: #F4C95D; box-shadow: 0 0 10px rgba(244,201,93,0.7);
    animation: ts-pulse 1.6s ease-in-out infinite;
  }
  @keyframes ts-pulse {
    0%,100% { opacity: 0.55; transform: scale(0.85); }
    50%     { opacity: 1;    transform: scale(1.15); }
  }
  .ts-title {
    font-family: 'Cormorant Garamond', 'Georgia', serif;
    font-size: clamp(2rem, 4.2vw, 2.8rem);
    font-weight: 600; color: #f3f3fb; margin: 0;
    letter-spacing: -0.02em; line-height: 1.05;
  }
  .ts-title em { font-style: italic; color: #F4C95D; text-shadow: 0 0 18px rgba(244,201,93,0.35); }
  .ts-sub { font-size: 0.92rem; color: #94a3b8; margin: 0; line-height: 1.5; max-width: 38rem; }

  /* Stage */
  .ts-stage {
    display: grid;
    grid-template-columns: minmax(0, 1.45fr) minmax(0, 1fr);
    gap: 2rem;
    align-items: stretch;
  }
  @media (max-width: 960px) {
    .ts-stage { grid-template-columns: 1fr; }
  }

  /* Mockup — frame around the textbook page */
  .ts-mockup {
    position: relative;
    border-radius: 0.85rem;
    background:
      radial-gradient(ellipse 80% 60% at 50% 0%, rgba(244,201,93,0.08), transparent 65%),
      linear-gradient(180deg, #0a0c14 0%, #06070d 100%);
    border: 1px solid rgba(244,201,93,0.18);
    padding: 1rem;
    box-shadow:
      0 28px 70px rgba(0,0,0,0.55),
      inset 0 0 0 1px rgba(244,201,93,0.05);
    overflow: hidden;
  }
  .ts-bezel {
    position: relative;
    aspect-ratio: 16 / 10;
    border-radius: 0.6rem;
    overflow: hidden;
    background: #0a0a10;
    box-shadow: inset 0 0 0 1px rgba(255,255,255,0.05);
  }
  .ts-page {
    position: absolute;
    inset: 0;
    width: 100%; height: 100%;
    object-fit: cover;
    object-position: center top;
    opacity: 0;
    transition: opacity 0.7s ease;
  }
  .ts-page.is-active { opacity: 1; }
  .ts-stamp {
    position: absolute;
    left: 0.85rem; bottom: 0.85rem;
    z-index: 4;
    font-family: ui-monospace, 'JetBrains Mono', monospace;
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(244,201,93,0.85);
    background: rgba(8, 10, 16, 0.7);
    border: 1px solid rgba(244,201,93,0.35);
    padding: 0.25rem 0.55rem;
    border-radius: 0.3rem;
    backdrop-filter: blur(6px);
  }

  /* Side caption */
  .ts-side {
    display: flex; flex-direction: column;
    padding: 1.6rem;
    border: 1px solid rgba(244,201,93,0.18);
    border-radius: 0.85rem;
    background: rgba(10, 14, 26, 0.6);
    box-shadow: 0 24px 60px rgba(0,0,0,0.4);
  }
  .ts-side-eyebrow {
    font-family: ui-monospace, monospace;
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: #F4C95D;
    text-shadow: 0 0 8px rgba(244,201,93,0.5);
    margin-bottom: 0.55rem;
  }
  .ts-side-title {
    font-family: 'Cormorant Garamond', 'Georgia', serif;
    font-size: 1.7rem;
    font-style: italic;
    font-weight: 600;
    color: #f3f3fb;
    margin: 0 0 0.3rem;
    letter-spacing: -0.01em;
    line-height: 1.15;
  }
  .ts-side-subtitle {
    font-family: 'Cormorant Garamond', 'Georgia', serif;
    font-style: italic;
    font-size: 0.95rem;
    color: rgba(244,201,93,0.9);
    margin: 0 0 0.9rem;
    line-height: 1.4;
  }
  .ts-side-body {
    font-size: 0.92rem;
    line-height: 1.6;
    color: rgba(216, 217, 230, 0.92);
    margin: 0 0 0.6rem;
  }
  .ts-side-body-en {
    font-size: 0.82rem;
    line-height: 1.5;
    color: rgba(148, 163, 184, 0.78);
    margin: 0 0 1.2rem;
    font-style: italic;
  }

  /* Controls */
  .ts-controls {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin: auto 0 1rem;
    padding-top: 0.6rem;
    border-top: 1px solid rgba(255,255,255,0.05);
  }
  .ts-arrow {
    width: 2.1rem; height: 2.1rem;
    border-radius: 50%;
    border: 1px solid rgba(244,201,93,0.35);
    background: rgba(244,201,93,0.06);
    color: #F4C95D;
    font-size: 0.95rem;
    cursor: pointer;
    transition: background 0.15s, color 0.15s, box-shadow 0.2s;
  }
  .ts-arrow:hover {
    background: rgba(244,201,93,0.18);
    color: #fff;
    box-shadow: 0 0 0 1px #F4C95D, 0 0 16px rgba(244,201,93,0.4);
  }
  .ts-dots { display: flex; gap: 0.4rem; flex: 1; justify-content: center; }
  .ts-dot {
    width: 0.5rem; height: 0.5rem;
    border-radius: 50%;
    border: 0;
    background: rgba(255,255,255,0.18);
    cursor: pointer;
    transition: background 0.2s, transform 0.2s;
  }
  .ts-dot.is-active {
    background: #F4C95D;
    box-shadow: 0 0 10px rgba(244,201,93,0.7);
    transform: scale(1.25);
  }
  .ts-dot:hover { background: rgba(244,201,93,0.5); }

  /* CTA row */
  .ts-cta-row { display: flex; align-items: center; gap: 0.8rem; flex-wrap: wrap; }
  .ts-cta-primary {
    font-family: ui-monospace, monospace;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    padding: 0.7rem 1.1rem;
    color: #0a0a10;
    background: #F4C95D;
    border-radius: 0.45rem;
    text-decoration: none;
    transition: filter 0.15s, box-shadow 0.2s;
  }
  .ts-cta-primary:hover { filter: brightness(1.08); box-shadow: 0 0 22px rgba(244,201,93,0.55); }
  .ts-cta-note {
    font-family: ui-monospace, monospace;
    font-size: 0.7rem;
    letter-spacing: 0.08em;
    color: rgba(148,163,184,0.7);
  }

  /* Bottom thumbnails */
  .ts-thumbs {
    margin-top: 1.5rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr));
    gap: 0.55rem;
  }
  .ts-thumb {
    display: flex; align-items: center; gap: 0.55rem;
    padding: 0.65rem 0.85rem;
    border: 1px solid rgba(255,255,255,0.06);
    background: rgba(255,255,255,0.02);
    border-radius: 0.45rem;
    color: rgba(216, 217, 230, 0.78);
    cursor: pointer;
    text-align: left;
    font-size: 0.78rem;
    transition: border-color 0.2s, background 0.2s, color 0.2s, box-shadow 0.2s;
  }
  .ts-thumb:hover {
    border-color: rgba(244,201,93,0.4);
    background: rgba(244,201,93,0.05);
    color: #fff;
  }
  .ts-thumb.is-active {
    border-color: #F4C95D;
    background: rgba(244,201,93,0.08);
    color: #F4C95D;
    box-shadow: 0 0 0 1px #F4C95D, 0 0 14px rgba(244,201,93,0.25);
  }
  .ts-thumb-num {
    font-family: ui-monospace, monospace;
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    color: rgba(244,201,93,0.85);
  }
  .ts-thumb-label {
    font-family: 'Cormorant Garamond', 'Georgia', serif;
    font-style: italic;
    line-height: 1.25;
    flex: 1; min-width: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    .ts-page { transition: none; }
    .ts-pulse { animation: none; }
  }
`;
