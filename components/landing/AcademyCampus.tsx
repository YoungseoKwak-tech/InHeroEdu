"use client";

/**
 * AcademyCampus — landing-page "campus walk-through" sections below Faculty.
 * Sections in order:
 *   1. TextbookSlider ("Inside the Logic" — Field Manual page preview)
 *   2. TA's Desk ("The Unpaid Intern")
 *   3. Bulletin Board (Academic Probation List)
 *   4. School Motto footer
 */

import Link from "next/link";
import TextbookSlider from "@/components/landing/TextbookSlider";

export default function AcademyCampus() {
  return (
    <>
      <TextbookSlider />
      <TADesk />
      <BulletinBoard />
      <SchoolMotto />
    </>
  );
}

// ── TA's Desk ("The Unpaid Intern") ────────────────────────────────────
function TADesk() {
  return (
    <section className="td-root">
      <div className="td-inner">
        <header className="td-head">
          <div className="td-eyebrow">
            <span className="td-pulse" />
            <span>THE TA · ASSISTANT 01</span>
          </div>
          <h2 className="td-title">When the professors are too proud, <em>ask the intern</em>.</h2>
          <p className="td-sub">
            Faculty are stars. The TA does the actual grading. Hooded, caffeinated, slightly disillusioned, and on the way to graduating from the same Ivy League department.
          </p>
        </header>

        <div className="td-card">
          <div className="td-portrait" aria-hidden="true">
            <svg viewBox="0 0 240 280" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="taFace" cx="50%" cy="40%" r="55%">
                  <stop offset="0%" stopColor="#3a3a44" />
                  <stop offset="100%" stopColor="#0a0a10" />
                </radialGradient>
                <linearGradient id="taHood" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1a1a22" />
                  <stop offset="100%" stopColor="#08080d" />
                </linearGradient>
              </defs>
              {/* Hood */}
              <path d="M 30 280 L 30 130 Q 30 60 120 50 Q 210 60 210 130 L 210 280 Z" fill="url(#taHood)" />
              {/* Face */}
              <ellipse cx="120" cy="135" rx="55" ry="65" fill="url(#taFace)" />
              {/* Dark circles under eyes */}
              <ellipse cx="100" cy="145" rx="9" ry="3" fill="rgba(0,0,0,0.5)" />
              <ellipse cx="140" cy="145" rx="9" ry="3" fill="rgba(0,0,0,0.5)" />
              {/* Coffee cup */}
              <rect x="155" y="220" width="32" height="38" rx="4" fill="#a4a4ad" />
              <rect x="158" y="225" width="26" height="6" fill="#3a3a44" />
              <text x="161" y="247" fontSize="9" fontFamily="ui-monospace, monospace" fill="#0a0a10" fontWeight="700">TA</text>
            </svg>
          </div>

          <div className="td-body">
            <div className="td-tag">TA · ASSISTANT 01</div>
            <h3 className="td-name">"The Unpaid Intern"</h3>
            <p className="td-status">Sleep-deprived since 2024 · Waiting for graduation.</p>

            <ul className="td-list">
              <li>
                <span className="td-list-bullet" />
                "Prof. Coulomb is in a bad mood today. Ask me instead."
              </li>
              <li>
                <span className="td-list-bullet" />
                Knows every textbook because she was forced to format them.
              </li>
              <li>
                <span className="td-list-bullet" />
                Currently an Ivy League senior. Don't tell the professors she's better at explaining.
              </li>
            </ul>

            <div className="td-actions">
              <Link href="/ai-companion" className="td-cta-primary">
                ASK THE TA  →
              </Link>
              <Link href="/textbooks" className="td-cta-ghost">
                READ HER FORCED-LABOR NOTES
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{TD_STYLES}</style>
    </section>
  );
}

// ── Bulletin Board (Academic Probation) ────────────────────────────────
const PROBATION_ITEMS = [
  { text: "42 students forgot the +C on Wednesday's quiz", source: "Dr. L'Hôpital is — and we quote — 'visibly unwell'." },
  { text: '"Mitochondria is the powerhouse" detected in 11 essays today', source: 'Dr. Osmosis has filed paperwork for "academic mourning leave".' },
  { text: "Coulomb's constant given as 8.99 × 10⁻⁹ in 3 lab reports", source: "Dr. Coulomb has rotated his pocket watch 180°." },
  { text: '"In my opinion" appeared 6 times in one passage essay', source: "Ms. Evidence has marked it as fanfiction." },
  { text: "Friction included in an idealized free-body diagram", source: "Professor Vacuum has reduced the offender to a point mass." },
  { text: "Cold War reduced to 'they didn't like each other'", source: "Julian Context has poured himself a second bourbon." },
];

function BulletinBoard() {
  return (
    <section className="bb-root">
      <div className="bb-inner">
        <header className="bb-head">
          <div className="bb-eyebrow">
            <span className="bb-pulse" />
            <span>BULLETIN BOARD · UPDATED LIVE</span>
          </div>
          <h2 className="bb-title">Academic Probation, <em>this week</em>.</h2>
          <p className="bb-sub">
            Faculty grievances, logged in real time. Try not to be on this list.
          </p>
        </header>

        <ol className="bb-list">
          {PROBATION_ITEMS.map((item, i) => (
            <li key={i} className="bb-item">
              <span className="bb-num">{String(i + 1).padStart(2, "0")}</span>
              <div className="bb-content">
                <p className="bb-text">{item.text}</p>
                <p className="bb-source">— {item.source}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <style>{BB_STYLES}</style>
    </section>
  );
}

// ── School Motto footer ────────────────────────────────────────────────
function SchoolMotto() {
  return (
    <section className="sm-root">
      <div className="sm-divider">
        <span className="sm-dot" />
        <span className="sm-line" />
        <span className="sm-shield" aria-hidden="true">⚜</span>
        <span className="sm-line" />
        <span className="sm-dot" />
      </div>
      <h2 className="sm-motto">
        <em>In Logic we trust.</em><br />
        <em>In Memorization we die.</em>
      </h2>
      <p className="sm-tag">— InHero Academy, est. 2026</p>
      <style>{SM_STYLES}</style>
    </section>
  );
}

const TD_STYLES = `
  .td-root {
    position: relative;
    padding: 5rem 1.25rem 4rem;
    background: linear-gradient(180deg, #060810 0%, #050610 100%);
    color: #d8d9e6;
    font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif;
  }
  .td-inner { max-width: 84rem; margin: 0 auto; }
  .td-head { display: flex; flex-direction: column; gap: 0.4rem; margin-bottom: 2rem; }
  .td-eyebrow {
    display: inline-flex; align-items: center; gap: 0.55rem;
    font-family: ui-monospace, monospace;
    font-size: 0.65rem; font-weight: 700; letter-spacing: 0.24em;
    text-transform: uppercase; color: #A99CFF;
    text-shadow: 0 0 10px rgba(169,156,255,0.5);
  }
  .td-pulse {
    width: 7px; height: 7px; border-radius: 50%;
    background: #A99CFF; box-shadow: 0 0 10px rgba(169,156,255,0.7);
    animation: td-pulse 1.6s ease-in-out infinite;
  }
  @keyframes td-pulse {
    0%,100% { opacity: 0.55; transform: scale(0.85); }
    50%     { opacity: 1;    transform: scale(1.15); }
  }
  .td-title {
    font-family: 'Cormorant Garamond', 'Georgia', serif;
    font-size: clamp(2rem, 4.2vw, 2.8rem);
    font-weight: 600; color: #f3f3fb; margin: 0;
    letter-spacing: -0.02em; line-height: 1.05;
  }
  .td-title em { font-style: italic; color: #A99CFF; text-shadow: 0 0 18px rgba(169,156,255,0.35); }
  .td-sub { font-size: 0.92rem; color: #94a3b8; margin: 0; line-height: 1.5; max-width: 42rem; }

  .td-card {
    display: grid;
    grid-template-columns: minmax(0, 14rem) minmax(0, 1fr);
    gap: 2rem;
    align-items: stretch;
    padding: 1.6rem;
    border-radius: 0.85rem;
    background: rgba(10, 14, 26, 0.6);
    border: 1px solid rgba(169,156,255,0.15);
    box-shadow: 0 24px 60px rgba(0,0,0,0.4);
  }
  @media (max-width: 720px) {
    .td-card { grid-template-columns: 1fr; gap: 1.2rem; }
  }
  .td-portrait {
    aspect-ratio: 4 / 5;
    border-radius: 0.55rem;
    overflow: hidden;
    background:
      radial-gradient(circle at 30% 25%, rgba(169,156,255,0.12), transparent 60%),
      #0a0a10;
    border: 1px solid rgba(169,156,255,0.18);
    display: flex; align-items: center; justify-content: center;
  }
  .td-portrait svg { width: 100%; height: 100%; }

  .td-body { display: flex; flex-direction: column; gap: 0.55rem; }
  .td-tag {
    font-family: ui-monospace, monospace;
    font-size: 0.6rem; font-weight: 700;
    letter-spacing: 0.2em; text-transform: uppercase;
    color: #A99CFF;
    text-shadow: 0 0 8px rgba(169,156,255,0.45);
  }
  .td-name {
    font-family: 'Cormorant Garamond', 'Georgia', serif;
    font-size: 1.8rem;
    font-style: italic;
    font-weight: 600;
    color: #f3f3fb;
    margin: 0;
    letter-spacing: -0.01em;
  }
  .td-status {
    font-family: ui-monospace, monospace;
    font-size: 0.72rem;
    color: rgba(148, 163, 184, 0.7);
    letter-spacing: 0.05em;
    margin: 0;
  }

  .td-list { list-style: none; padding: 0; margin: 0.6rem 0 0.85rem; display: flex; flex-direction: column; gap: 0.5rem; }
  .td-list li {
    display: flex; align-items: flex-start; gap: 0.55rem;
    font-size: 0.88rem;
    color: rgba(216, 217, 230, 0.88);
    line-height: 1.5;
  }
  .td-list-bullet {
    margin-top: 0.55rem;
    width: 5px; height: 5px;
    border-radius: 50%;
    background: #A99CFF;
    box-shadow: 0 0 6px rgba(169,156,255,0.6);
    flex-shrink: 0;
  }

  .td-actions { display: flex; gap: 0.6rem; flex-wrap: wrap; margin-top: 0.4rem; }
  .td-cta-primary {
    font-family: ui-monospace, monospace;
    font-size: 0.72rem; font-weight: 700;
    letter-spacing: 0.16em; text-transform: uppercase;
    padding: 0.7rem 1.1rem;
    color: #0a0a10;
    background: #A99CFF;
    border-radius: 0.45rem;
    text-decoration: none;
    transition: filter 0.15s, box-shadow 0.2s;
  }
  .td-cta-primary:hover { filter: brightness(1.08); box-shadow: 0 0 22px rgba(169,156,255,0.5); }
  .td-cta-ghost {
    font-family: ui-monospace, monospace;
    font-size: 0.7rem; font-weight: 600;
    letter-spacing: 0.12em; text-transform: uppercase;
    padding: 0.7rem 1rem;
    color: rgba(148,163,184,0.85);
    background: transparent;
    border: 1px solid rgba(148,163,184,0.2);
    border-radius: 0.45rem;
    text-decoration: none;
    transition: color 0.15s, border-color 0.15s;
  }
  .td-cta-ghost:hover { color: #fff; border-color: rgba(169,156,255,0.4); }
`;

const BB_STYLES = `
  .bb-root {
    position: relative;
    padding: 4rem 1.25rem;
    background: #050610;
    color: #d8d9e6;
    font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif;
  }
  .bb-inner { max-width: 60rem; margin: 0 auto; }
  .bb-head { margin-bottom: 1.5rem; display: flex; flex-direction: column; gap: 0.4rem; }
  .bb-eyebrow {
    display: inline-flex; align-items: center; gap: 0.55rem;
    font-family: ui-monospace, monospace;
    font-size: 0.65rem; font-weight: 700; letter-spacing: 0.24em;
    text-transform: uppercase; color: #FF6B5B;
    text-shadow: 0 0 10px rgba(255,107,91,0.5);
  }
  .bb-pulse {
    width: 7px; height: 7px; border-radius: 50%;
    background: #FF6B5B; box-shadow: 0 0 10px rgba(255,107,91,0.7);
    animation: bb-pulse 1.6s ease-in-out infinite;
  }
  @keyframes bb-pulse {
    0%,100% { opacity: 0.55; transform: scale(0.85); }
    50%     { opacity: 1;    transform: scale(1.15); }
  }
  .bb-title {
    font-family: 'Cormorant Garamond', 'Georgia', serif;
    font-size: clamp(1.8rem, 3.6vw, 2.4rem);
    font-weight: 600; color: #f3f3fb; margin: 0;
    letter-spacing: -0.02em; line-height: 1.1;
  }
  .bb-title em { font-style: italic; color: #FF6B5B; text-shadow: 0 0 18px rgba(255,107,91,0.35); }
  .bb-sub { font-size: 0.88rem; color: #94a3b8; margin: 0; }

  .bb-list {
    list-style: none;
    padding: 1rem 1.1rem;
    margin: 0;
    border: 1px solid rgba(255,107,91,0.15);
    border-radius: 0.65rem;
    background:
      repeating-linear-gradient(0deg, transparent 0 1.7rem, rgba(255,107,91,0.05) 1.7rem 1.71rem),
      #08080d;
    display: flex; flex-direction: column; gap: 0.65rem;
  }
  .bb-item {
    display: flex; gap: 0.85rem; align-items: flex-start;
    padding: 0.5rem 0.4rem;
    border-bottom: 1px dashed rgba(255,255,255,0.06);
  }
  .bb-item:last-child { border-bottom: 0; }
  .bb-num {
    font-family: ui-monospace, monospace;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: #FF6B5B;
    min-width: 1.6rem;
  }
  .bb-content { flex: 1; min-width: 0; }
  .bb-text {
    font-size: 0.92rem;
    color: #f3f3fb;
    margin: 0 0 0.2rem;
    line-height: 1.45;
    font-weight: 500;
  }
  .bb-source {
    font-family: 'Cormorant Garamond', 'Georgia', serif;
    font-style: italic;
    font-size: 0.82rem;
    color: rgba(148,163,184,0.75);
    margin: 0;
    line-height: 1.4;
  }
`;

const SM_STYLES = `
  .sm-root {
    padding: 4rem 1.25rem 5rem;
    background:
      radial-gradient(ellipse 70% 45% at 50% 0%, rgba(94,234,212,0.06), transparent 60%),
      #03050d;
    text-align: center;
    color: #d8d9e6;
    font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif;
  }
  .sm-divider {
    display: flex; align-items: center; justify-content: center; gap: 0.7rem;
    margin-bottom: 1.6rem;
    color: rgba(94,234,212,0.5);
  }
  .sm-dot {
    width: 4px; height: 4px; border-radius: 50%;
    background: #5eead4;
    box-shadow: 0 0 8px rgba(94,234,212,0.7);
  }
  .sm-line {
    flex: 0 0 60px;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(94,234,212,0.5), transparent);
  }
  .sm-shield { font-size: 1.4rem; }
  .sm-motto {
    font-family: 'Cormorant Garamond', 'Georgia', serif;
    font-size: clamp(1.6rem, 3.4vw, 2.2rem);
    font-weight: 600;
    color: #f3f3fb;
    margin: 0;
    line-height: 1.3;
    letter-spacing: -0.01em;
  }
  .sm-motto em { font-style: italic; color: #5eead4; text-shadow: 0 0 18px rgba(94,234,212,0.4); }
  .sm-tag {
    font-family: ui-monospace, monospace;
    font-size: 0.68rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(148,163,184,0.55);
    margin: 0.9rem 0 0;
  }
`;
