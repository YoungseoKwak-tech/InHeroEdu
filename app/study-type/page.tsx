"use client";

/**
 * /study-type — public-facing study-type quiz (lead magnet).
 *
 * 8 questions → maps onto one of the 20 InHero HeroCode personas →
 * delivers a personalized "do tomorrow" study plan grounded in
 * cognitive-science findings (active recall, spaced repetition,
 * interleaving). MZ-aesthetic with the platform's space/mint tone.
 *
 * Flow:
 *   stage = "intro"  → 1-screen hook + START button
 *   stage = "quiz"   → one question at a time with progress bar
 *   stage = "result" → persona reveal (mascot + name) + 3 steps +
 *                      InHero hook + share / signup CTA
 *
 * No auth required — funnels into AuthModal via the existing
 * `inhero:open-auth` custom event when the student clicks Start
 * Studying.
 */

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  STUDY_TYPE_QUESTIONS,
  scoreAnswers,
  topCodes,
  type QuizQuestion,
} from "@/lib/studyTypeQuiz";
import { getStudyTypeSteps } from "@/lib/studyTypeSteps";
import { HERO_CODE_META, type HeroCodeId } from "@/lib/hero-codes";

type Stage = "intro" | "quiz" | "result";

export default function StudyTypePage() {
  const [stage, setStage] = useState<Stage>("intro");
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const scores = useMemo(() => scoreAnswers(answers), [answers]);
  const top = useMemo(() => topCodes(scores, 3), [scores]);
  const primary = top[0]?.code as HeroCodeId | undefined;
  const meta = primary ? HERO_CODE_META[primary] : null;
  const steps = primary ? getStudyTypeSteps(primary) : getStudyTypeSteps(null);

  const total = STUDY_TYPE_QUESTIONS.length;
  const q: QuizQuestion | undefined = STUDY_TYPE_QUESTIONS[idx];

  function pick(optionIdx: number) {
    if (!q) return;
    const next = { ...answers, [q.id]: optionIdx };
    setAnswers(next);
    if (idx + 1 >= total) {
      setStage("result");
    } else {
      setIdx(idx + 1);
    }
  }

  function restart() {
    setAnswers({});
    setIdx(0);
    setStage("intro");
  }

  function openSignup() {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("inhero:open-auth", { detail: { mode: "signup" } })
      );
    }
  }

  return (
    <main className="st-root">
      <div className="st-stars" aria-hidden="true" />
      <div className="st-glow" aria-hidden="true" />

      <div className="st-shell">
        {/* ── INTRO ────────────────────────────────────────────────── */}
        {stage === "intro" && (
          <section className="st-intro">
            <div className="st-eyebrow">
              <span className="st-pulse" />
              <span>STUDY TYPE · CALIBRATION</span>
            </div>
            <h1 className="st-h1">
              What's your <em>Study Type</em>?
            </h1>
            <p className="st-sub">
              8 questions. 90 seconds. Real cognitive-science scoring → your
              <br />
              personalized 3-step "do tomorrow" study plan.
            </p>

            <div className="st-bullets">
              <div className="st-bullet">
                <span className="st-bullet-dot" />
                <span>20 personas grounded in real behavior patterns (not "visual / auditory").</span>
              </div>
              <div className="st-bullet">
                <span className="st-bullet-dot" />
                <span>Steps anchored in active recall, spaced repetition, interleaving.</span>
              </div>
              <div className="st-bullet">
                <span className="st-bullet-dot" />
                <span>Share your result. Compare with friends.</span>
              </div>
            </div>

            <button type="button" onClick={() => setStage("quiz")} className="st-cta-primary">
              START THE TEST →
            </button>
            <p className="st-foot">
              No signup needed to take the test.
              <br />
              Sign up to save your result + plan.
            </p>
          </section>
        )}

        {/* ── QUIZ ─────────────────────────────────────────────────── */}
        {stage === "quiz" && q && (
          <section className="st-quiz">
            <div className="st-progress-row">
              <span className="st-progress-label">
                {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
              <div className="st-progress-bar">
                <div
                  className="st-progress-fill"
                  style={{ width: `${((idx + 1) / total) * 100}%` }}
                />
              </div>
            </div>

            <h2 className="st-q-prompt">{q.prompt}</h2>

            <div className="st-options">
              {q.options.map((opt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => pick(i)}
                  className="st-option"
                >
                  <span className="st-option-num">{String.fromCharCode(65 + i)}</span>
                  <span className="st-option-label">{opt.label}</span>
                </button>
              ))}
            </div>

            {idx > 0 && (
              <button
                type="button"
                onClick={() => setIdx(Math.max(0, idx - 1))}
                className="st-back"
              >
                ← Back
              </button>
            )}
          </section>
        )}

        {/* ── RESULT ───────────────────────────────────────────────── */}
        {stage === "result" && primary && meta && (
          <section className="st-result">
            <div className="st-result-eyebrow">
              <span className="st-pulse" />
              <span>YOUR STUDY TYPE</span>
            </div>

            <div
              className="st-result-card"
              style={{
                borderColor: meta.glow.replace("0.22", "0.45"),
                boxShadow: `0 0 0 1px ${meta.glow.replace("0.22", "0.12")} inset, 0 30px 80px ${meta.glow}`,
              }}
            >
              <div
                className="st-mascot"
                style={{
                  color: meta.accent,
                  textShadow: `0 0 36px ${meta.glow.replace("0.22", "0.55")}`,
                }}
              >
                {meta.mascot}
              </div>
              <div className="st-code-id" style={{ color: meta.accent }}>
                {meta.id}
              </div>
              <h2 className="st-result-name">{meta.name}</h2>
              <p className="st-result-line">{meta.oneLiner}</p>
              <p className="st-result-mascot-name">— {meta.mascotName}</p>

              <div className="st-facets">
                {top.map(({ code, percent }) => {
                  const m = HERO_CODE_META[code];
                  return (
                    <div key={code} className="st-facet">
                      <span className="st-facet-pct" style={{ color: m.accent }}>
                        {percent}%
                      </span>
                      <span className="st-facet-name">{m.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="st-steps-block">
              <div className="st-steps-eyebrow">
                <span className="st-pulse" />
                <span>YOUR 3 STEPS — START TOMORROW</span>
              </div>
              <p className="st-steps-headline">{steps.headline}</p>

              <div className="st-strength-trap">
                <div>
                  <div className="st-stk-lbl st-stk-ok">✓ STRENGTH</div>
                  <div className="st-stk-body">{steps.strength}</div>
                </div>
                <div>
                  <div className="st-stk-lbl st-stk-trap">⚠ TRAP</div>
                  <div className="st-stk-body">{steps.trap}</div>
                </div>
              </div>

              <ol className="st-steps">
                {steps.steps.map((s, i) => (
                  <li key={i} className="st-step">
                    <span className="st-step-num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="st-step-body">{s}</span>
                  </li>
                ))}
              </ol>

              <div className="st-inhero-hook">
                <span className="st-inhero-tag">▸ HOW INHERO HELPS</span>
                <p>{steps.inheroHook}</p>
              </div>
            </div>

            <div className="st-result-cta-row">
              <button onClick={openSignup} type="button" className="st-cta-primary">
                START AP BIO FREE →
              </button>
              <Link href="/hero-codes" className="st-cta-ghost">
                See all 20 Study Types →
              </Link>
            </div>
            <button type="button" onClick={restart} className="st-restart">
              ↺ Retake the test
            </button>
          </section>
        )}
      </div>

      <style>{baseCss}</style>
    </main>
  );
}

const baseCss = `
  .st-root {
    position: relative;
    min-height: 100vh;
    background: #02040b;
    color: #d8d9e6;
    font-family: 'Inter', system-ui, sans-serif;
    overflow-x: hidden;
    padding: 5rem 1.25rem 4rem;
  }
  .st-stars {
    position: absolute; inset: 0; pointer-events: none; opacity: 0.5;
    background-image:
      radial-gradient(1px 1px at 12% 18%, rgba(255,255,255,0.85), transparent 100%),
      radial-gradient(1px 1px at 78% 24%, rgba(255,255,255,0.55), transparent 100%),
      radial-gradient(1.2px 1.2px at 32% 72%, rgba(255,255,255,0.7), transparent 100%),
      radial-gradient(1.2px 1.2px at 50% 8%, rgba(94,234,212,0.8), transparent 100%);
    background-size: 300px 300px; background-repeat: repeat;
  }
  .st-glow {
    position: absolute; inset: 0; pointer-events: none;
    background:
      radial-gradient(ellipse 80% 50% at 50% 0%, rgba(94,234,212,0.10), transparent 60%),
      radial-gradient(ellipse 60% 40% at 80% 100%, rgba(168,140,255,0.08), transparent 60%);
  }
  .st-shell {
    position: relative;
    z-index: 1;
    max-width: 44rem;
    margin: 0 auto;
  }

  .st-eyebrow, .st-result-eyebrow, .st-steps-eyebrow {
    display: inline-flex; align-items: center; gap: 0.55rem;
    font-family: ui-monospace, 'JetBrains Mono', monospace;
    font-size: 0.7rem; font-weight: 700;
    letter-spacing: 0.24em; text-transform: uppercase;
    color: #5eead4; text-shadow: 0 0 10px rgba(94,234,212,0.5);
    margin-bottom: 1.25rem;
  }
  .st-pulse {
    width: 7px; height: 7px; border-radius: 50%;
    background: #5eead4;
    box-shadow: 0 0 10px rgba(94,234,212,0.7);
    animation: st-pulse 1.6s ease-in-out infinite;
  }
  @keyframes st-pulse {
    0%,100% { opacity: 0.55; transform: scale(0.85); }
    50%     { opacity: 1;    transform: scale(1.15); }
  }

  /* INTRO */
  .st-intro { text-align: center; padding-top: 2rem; }
  .st-h1 {
    font-family: 'Cormorant Garamond', 'Georgia', serif;
    font-size: clamp(2.4rem, 5.5vw, 3.6rem);
    font-weight: 600;
    line-height: 1.05;
    color: #f3f3fb;
    margin: 0 0 1.25rem;
    letter-spacing: -0.02em;
  }
  .st-h1 em {
    font-style: italic;
    color: #5eead4;
    text-shadow: 0 0 22px rgba(94,234,212,0.35);
  }
  .st-sub {
    font-size: 1.04rem; line-height: 1.55;
    color: #94a3b8; max-width: 36rem;
    margin: 0 auto 2rem;
  }
  .st-bullets {
    display: flex; flex-direction: column; gap: 0.55rem;
    max-width: 32rem; margin: 0 auto 2.25rem;
    text-align: left;
  }
  .st-bullet {
    display: flex; align-items: flex-start; gap: 0.7rem;
    font-size: 0.92rem; color: rgba(216,217,230,0.78);
    padding: 0.65rem 0.85rem;
    background: rgba(255,255,255,0.025);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 0.55rem;
  }
  .st-bullet-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: #5eead4; flex-shrink: 0;
    margin-top: 0.45rem;
    box-shadow: 0 0 6px rgba(94,234,212,0.6);
  }
  .st-cta-primary {
    display: inline-flex; align-items: center; gap: 0.5rem;
    background: #5eead4; color: #02040b;
    padding: 0.95rem 1.85rem;
    border: none; border-radius: 0.55rem;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.92rem; font-weight: 700;
    letter-spacing: 0.1em;
    cursor: pointer;
    transition: transform 0.15s ease, box-shadow 0.15s ease, filter 0.15s ease;
    box-shadow: 0 12px 30px rgba(94,234,212,0.28);
  }
  .st-cta-primary:hover {
    transform: translateY(-1px);
    box-shadow: 0 16px 42px rgba(94,234,212,0.45);
    filter: brightness(1.05);
  }
  .st-foot {
    margin-top: 1.5rem;
    font-family: ui-monospace, monospace;
    font-size: 0.72rem;
    color: rgba(148,163,184,0.6);
    letter-spacing: 0.06em;
    line-height: 1.55;
  }

  /* QUIZ */
  .st-quiz { padding-top: 1rem; }
  .st-progress-row {
    display: flex; align-items: center; gap: 1rem;
    margin-bottom: 2rem;
  }
  .st-progress-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.78rem; font-weight: 700;
    letter-spacing: 0.12em;
    color: rgba(216,217,230,0.85);
    min-width: 4.5rem;
  }
  .st-progress-bar {
    flex: 1;
    height: 4px;
    background: rgba(255,255,255,0.06);
    border-radius: 999px; overflow: hidden;
  }
  .st-progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #5eead4, #a99cff);
    box-shadow: 0 0 10px rgba(94,234,212,0.5);
    transition: width 0.3s ease;
  }
  .st-q-prompt {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.65rem, 4vw, 2.25rem);
    font-weight: 600;
    line-height: 1.2;
    color: #f3f3fb;
    margin: 0 0 1.75rem;
    letter-spacing: -0.01em;
  }
  .st-options {
    display: flex; flex-direction: column; gap: 0.65rem;
  }
  .st-option {
    display: flex; align-items: center; gap: 0.9rem;
    width: 100%;
    padding: 1rem 1.15rem;
    border: 1px solid rgba(94,234,212,0.18);
    background: rgba(94,234,212,0.04);
    border-radius: 0.65rem;
    color: rgba(216,217,230,0.92);
    font-size: 0.98rem;
    line-height: 1.4;
    cursor: pointer;
    text-align: left;
    transition: background 0.15s, border-color 0.15s, transform 0.15s;
  }
  .st-option:hover {
    background: rgba(94,234,212,0.12);
    border-color: rgba(94,234,212,0.55);
    transform: translateX(2px);
  }
  .st-option-num {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.78rem; font-weight: 700;
    letter-spacing: 0.1em;
    color: #5eead4;
    background: rgba(94,234,212,0.12);
    border: 1px solid rgba(94,234,212,0.4);
    padding: 0.25rem 0.55rem;
    border-radius: 0.35rem;
    flex-shrink: 0;
  }
  .st-option-label { flex: 1; }
  .st-back {
    margin-top: 1.5rem;
    background: transparent; border: none;
    color: rgba(216,217,230,0.55);
    font-family: ui-monospace, monospace;
    font-size: 0.78rem; letter-spacing: 0.06em;
    cursor: pointer; padding: 0.4rem;
  }
  .st-back:hover { color: #5eead4; }

  /* RESULT */
  .st-result { padding-top: 1rem; }
  .st-result-card {
    text-align: center;
    background: rgba(8, 10, 18, 0.72);
    border: 1.5px solid;
    border-radius: 1.1rem;
    padding: 2.5rem 2rem 1.75rem;
    margin-bottom: 2rem;
    backdrop-filter: blur(8px);
  }
  .st-mascot {
    font-size: clamp(4.5rem, 12vw, 6.5rem);
    line-height: 1;
    margin-bottom: 0.55rem;
  }
  .st-code-id {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.85rem; font-weight: 700;
    letter-spacing: 0.32em;
    margin-bottom: 0.5rem;
  }
  .st-result-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2.2rem, 5vw, 3rem);
    font-weight: 600;
    color: #f3f3fb;
    margin: 0 0 0.45rem;
    letter-spacing: -0.01em;
  }
  .st-result-line {
    font-size: 1.05rem;
    color: rgba(216,217,230,0.85);
    margin: 0 0 0.35rem;
    font-style: italic;
  }
  .st-result-mascot-name {
    font-family: ui-monospace, monospace;
    font-size: 0.72rem;
    color: rgba(148,163,184,0.6);
    letter-spacing: 0.06em;
    margin: 0 0 1.5rem;
  }
  .st-facets {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.6rem;
    padding-top: 1.25rem;
    border-top: 1px solid rgba(255,255,255,0.06);
  }
  .st-facet {
    display: flex; flex-direction: column; align-items: center;
    padding: 0.55rem;
    background: rgba(255,255,255,0.025);
    border-radius: 0.45rem;
  }
  .st-facet-pct {
    font-family: 'JetBrains Mono', monospace;
    font-size: 1rem; font-weight: 700;
    letter-spacing: 0.04em;
  }
  .st-facet-name {
    font-size: 0.72rem;
    color: rgba(148,163,184,0.7);
    margin-top: 0.2rem;
    text-align: center;
  }

  /* STEPS */
  .st-steps-block {
    padding: 1.5rem 1.4rem;
    border: 1px solid rgba(94,234,212,0.25);
    background: linear-gradient(180deg, rgba(94,234,212,0.05), rgba(94,234,212,0.01));
    border-radius: 0.9rem;
    margin-bottom: 2rem;
  }
  .st-steps-headline {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.32rem;
    line-height: 1.35;
    color: #f3f3fb;
    margin: 0.45rem 0 1.5rem;
    font-style: italic;
  }
  .st-strength-trap {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.85rem;
    margin-bottom: 1.5rem;
  }
  @media (max-width: 540px) {
    .st-strength-trap { grid-template-columns: 1fr; }
  }
  .st-stk-lbl {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.65rem; font-weight: 700;
    letter-spacing: 0.14em; text-transform: uppercase;
    margin-bottom: 0.4rem;
  }
  .st-stk-ok { color: #5eead4; }
  .st-stk-trap { color: #f4c95d; }
  .st-stk-body {
    font-size: 0.85rem;
    line-height: 1.55;
    color: rgba(216,217,230,0.85);
    padding: 0.65rem 0.75rem;
    background: rgba(255,255,255,0.025);
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 0.45rem;
  }
  .st-steps {
    list-style: none;
    padding: 0; margin: 0 0 1.5rem;
    display: flex; flex-direction: column; gap: 0.75rem;
  }
  .st-step {
    display: flex; align-items: flex-start; gap: 0.85rem;
    padding: 0.85rem 1rem;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(94,234,212,0.18);
    border-radius: 0.55rem;
  }
  .st-step-num {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.78rem; font-weight: 700;
    letter-spacing: 0.1em;
    color: #5eead4;
    background: rgba(94,234,212,0.1);
    padding: 0.3rem 0.55rem;
    border-radius: 0.35rem;
    flex-shrink: 0;
  }
  .st-step-body {
    font-size: 0.94rem;
    line-height: 1.55;
    color: rgba(216,217,230,0.92);
  }
  .st-inhero-hook {
    padding: 0.9rem 1rem;
    background: rgba(94,234,212,0.08);
    border-left: 3px solid #5eead4;
    border-radius: 0 0.4rem 0.4rem 0;
  }
  .st-inhero-tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.66rem; font-weight: 700;
    letter-spacing: 0.16em;
    color: #5eead4;
  }
  .st-inhero-hook p {
    margin: 0.35rem 0 0;
    font-size: 0.88rem;
    line-height: 1.55;
    color: rgba(216,217,230,0.92);
  }

  .st-result-cta-row {
    display: flex; flex-direction: column; align-items: center; gap: 0.85rem;
    margin-bottom: 1.5rem;
  }
  .st-cta-ghost {
    color: rgba(216,217,230,0.7);
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.78rem; font-weight: 600;
    letter-spacing: 0.08em;
    text-decoration: none;
    padding: 0.65rem 1rem;
    border-radius: 0.45rem;
    border: 1px solid rgba(255,255,255,0.1);
    transition: background 0.15s ease, color 0.15s ease;
  }
  .st-cta-ghost:hover { background: rgba(255,255,255,0.04); color: #f3f3fb; }
  .st-restart {
    display: block;
    margin: 0 auto;
    background: transparent; border: none;
    color: rgba(148,163,184,0.55);
    font-family: ui-monospace, monospace;
    font-size: 0.74rem; letter-spacing: 0.06em;
    cursor: pointer; padding: 0.4rem;
  }
  .st-restart:hover { color: #5eead4; }
`;
