"use client";

/**
 * OverlayCard — renders a single overlay with full student interaction.
 * Used by VideoLessonPlayer when a timed checkpoint fires.
 *
 * Props:
 *   overlay   — the DB overlay row (type + data)
 *   lessonId  — for response logging
 *   onComplete — called when the student dismisses/completes the card
 */

import { useState, useCallback } from "react";
import { authFetch } from "@/lib/client-auth";
import type { OverlayRow } from "@/lib/overlays";

interface Props {
  overlay: OverlayRow;
  lessonId: string;
  onComplete: () => void;
}

// ── Design tokens ──────────────────────────────────────────────────────────
const TOKENS: Record<string, { color: string; bg: string; label: string }> = {
  SPARK:            { color: "#C9A84C", bg: "#0d1a10", label: "SPARK" },
  GAP_CRUNCH:       { color: "#E85A4A", bg: "#120a0a", label: "GAP CRUNCH" },
  TEACH_BACK:       { color: "#5DCAA5", bg: "#091410", label: "TEACH BACK" },
  QUESTION_SPRINT:  { color: "#9F97ED", bg: "#0c0b18", label: "QUESTION SPRINT" },
  ANALYZER:         { color: "#5DAAF0", bg: "#090f18", label: "ANALYZER" },
  CONFIDENCE_CHECK: { color: "#D4537E", bg: "#130a0e", label: "◈ CONFIDENCE CHECK" },
  NEXT_MOVE:        { color: "#7F77DD", bg: "#0c0b18", label: "→ NEXT MOVE" },
};

function logResponse(data: Record<string, unknown>) {
  authFetch("/api/overlay-responses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).catch(() => {});
}

// ── SPARK ──────────────────────────────────────────────────────────────────
function SparkCard({ overlay, lessonId, onComplete }: Props) {
  const data = overlay.data as { prompt?: string };
  const [value, setValue] = useState("");
  const [done, setDone] = useState(false);

  function submit() {
    if (!value.trim()) return;
    setDone(true);
    logResponse({
      lessonId, overlayId: overlay.id, overlayType: "SPARK",
      response: value.trim(),
    });
    setTimeout(onComplete, 800);
  }

  const tok = TOKENS.SPARK;
  return (
    <div className="oc-card" style={{ background: tok.bg, borderColor: tok.color + "33" }}>
      <div className="oc-label" style={{ color: tok.color }}>{tok.label}</div>
      <p className="oc-prompt">{data.prompt ?? "What do you notice?"}</p>
      {!done ? (
        <>
          <textarea
            className="oc-textarea"
            placeholder="Type your thoughts…"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            rows={3}
            style={{ borderColor: tok.color + "44" }}
          />
          <button
            className="oc-btn"
            style={{ background: tok.color, color: "#0a0a0a" }}
            onClick={submit}
            disabled={!value.trim()}
          >
            Submit →
          </button>
        </>
      ) : (
        <p className="oc-saved" style={{ color: tok.color }}>Saved ✓</p>
      )}
    </div>
  );
}

// ── GAP CRUNCH ─────────────────────────────────────────────────────────────
function GapCrunchCard({ overlay, lessonId, onComplete }: Props) {
  const data = overlay.data as {
    statement?: string; trap?: string; correct?: string;
    options?: string[]; fixPrompt?: string; gapType?: string;
  };
  const options = data.options ?? [data.trap ?? "", data.correct ?? ""].filter(Boolean);
  const [selected, setSelected] = useState<string | null>(null);
  const [phase, setPhase] = useState<"choose" | "evaluating" | "result">("choose");
  const [feedback, setFeedback] = useState("");

  const tok = TOKENS.GAP_CRUNCH;

  async function choose(opt: string) {
    setSelected(opt);
    setPhase("evaluating");
    try {
      const res = await authFetch("/api/overlay/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "gap_crunch",
          fixPrompt: data.fixPrompt ?? data.statement ?? "",
          studentResponse: opt,
          gapType: data.gapType ?? "CONCEPT GAP",
        }),
      });
      const j = await res.json() as { feedback?: string };
      setFeedback(j.feedback ?? "");
    } catch {
      setFeedback("Keep working on distinguishing these cases.");
    }
    const isCorrect = opt === data.correct;
    logResponse({
      lessonId, overlayId: overlay.id, overlayType: "GAP_CRUNCH",
      response: opt, correct: isCorrect, gapType: data.gapType ?? "",
    });
    setPhase("result");
  }

  return (
    <div className="oc-card" style={{ background: tok.bg, borderColor: tok.color + "33" }}>
      <div className="oc-label" style={{ color: tok.color }}>{tok.label}</div>
      <p className="oc-prompt">{data.statement ?? "Which is correct?"}</p>
      {phase === "choose" && (
        <div className="oc-options">
          {options.map((opt) => (
            <button
              key={opt}
              className="oc-option"
              style={{ borderColor: tok.color + "44" }}
              onClick={() => choose(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
      {phase === "evaluating" && (
        <p className="oc-evaluating">Evaluating…</p>
      )}
      {phase === "result" && (
        <>
          <div
            className="oc-result-badge"
            style={{
              color: selected === data.correct ? "#00FFB2" : tok.color,
              background: selected === data.correct ? "rgba(0,255,178,0.08)" : tok.color + "18",
            }}
          >
            {selected === data.correct ? "Correct ✓" : "Not quite"}
          </div>
          {feedback && <p className="oc-feedback">{feedback}</p>}
          <button
            className="oc-btn"
            style={{ background: tok.color, color: "#0a0a0a" }}
            onClick={onComplete}
          >
            Continue →
          </button>
        </>
      )}
    </div>
  );
}

// ── TEACH BACK ─────────────────────────────────────────────────────────────
function TeachBackCard({ overlay, lessonId, onComplete }: Props) {
  const data = overlay.data as { prompt?: string; aiEvalPrompt?: string };
  const [value, setValue] = useState("");
  const [phase, setPhase] = useState<"write" | "evaluating" | "result">("write");
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");

  const tok = TOKENS.TEACH_BACK;

  async function submit() {
    if (!value.trim()) return;
    setPhase("evaluating");
    try {
      const res = await authFetch("/api/overlay/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "teach_back",
          aiEvalPrompt: data.aiEvalPrompt ?? `Evaluate this explanation of: ${data.prompt ?? "the concept"}. Score 1-5.`,
          studentResponse: value.trim(),
        }),
      });
      const j = await res.json() as { score?: number; feedback?: string };
      setScore(j.score ?? 3);
      setFeedback(j.feedback ?? "");
    } catch {
      setScore(3);
      setFeedback("Your explanation covers the basics. Try to be more specific.");
    }
    logResponse({
      lessonId, overlayId: overlay.id, overlayType: "TEACH_BACK",
      response: value.trim(), score,
    });
    setPhase("result");
  }

  return (
    <div className="oc-card" style={{ background: tok.bg, borderColor: tok.color + "33" }}>
      <div className="oc-label" style={{ color: tok.color }}>{tok.label}</div>
      <p className="oc-prompt">{data.prompt ?? "Explain this concept in your own words."}</p>
      {phase === "write" && (
        <>
          <textarea
            className="oc-textarea"
            placeholder="Explain as if teaching a friend…"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            rows={4}
            style={{ borderColor: tok.color + "44" }}
          />
          <button
            className="oc-btn"
            style={{ background: tok.color, color: "#0a0a0a" }}
            onClick={submit}
            disabled={!value.trim()}
          >
            Submit for Evaluation →
          </button>
        </>
      )}
      {phase === "evaluating" && <p className="oc-evaluating">Evaluating…</p>}
      {phase === "result" && (
        <>
          <div className="oc-stars">
            {[1,2,3,4,5].map((n) => (
              <span key={n} style={{ color: n <= score ? tok.color : "#333", fontSize: "1.4rem" }}>★</span>
            ))}
          </div>
          {feedback && <p className="oc-feedback">{feedback}</p>}
          <button
            className="oc-btn"
            style={{ background: tok.color, color: "#0a0a0a" }}
            onClick={onComplete}
          >
            Continue →
          </button>
        </>
      )}
    </div>
  );
}

// ── QUESTION SPRINT ────────────────────────────────────────────────────────
function QuestionSprintCard({ overlay, lessonId, onComplete }: Props) {
  const data = overlay.data as {
    questions?: Array<{ question: string; options: string[]; correct: number; explanation: string }>;
    sprintFocus?: string;
  };
  const questions = data.questions ?? [];
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(questions.map(() => null));
  const [showExplanation, setShowExplanation] = useState(false);
  const [done, setDone] = useState(false);

  const tok = TOKENS.QUESTION_SPRINT;
  const q = questions[idx];
  const answered = answers[idx] !== null;
  const isCorrect = answered && answers[idx] === q?.correct;

  function answer(optIdx: number) {
    if (answered) return;
    const next = [...answers];
    next[idx] = optIdx;
    setAnswers(next);
    setShowExplanation(true);
  }

  function advance() {
    setShowExplanation(false);
    if (idx + 1 < questions.length) {
      setIdx(idx + 1);
    } else {
      const correctCount = answers.filter((a, i) => a === questions[i]?.correct).length;
      logResponse({
        lessonId, overlayId: overlay.id, overlayType: "QUESTION_SPRINT",
        response: JSON.stringify(answers), score: correctCount,
      });
      setDone(true);
    }
  }

  if (questions.length === 0) {
    return (
      <div className="oc-card" style={{ background: tok.bg, borderColor: tok.color + "33" }}>
        <div className="oc-label" style={{ color: tok.color }}>{tok.label}</div>
        <p className="oc-prompt">No questions available.</p>
        <button className="oc-btn" style={{ background: tok.color, color: "#0a0a0a" }} onClick={onComplete}>Continue →</button>
      </div>
    );
  }

  if (done) {
    const correctCount = answers.filter((a, i) => a === questions[i]?.correct).length;
    return (
      <div className="oc-card" style={{ background: tok.bg, borderColor: tok.color + "33" }}>
        <div className="oc-label" style={{ color: tok.color }}>{tok.label}</div>
        <p className="oc-score-title" style={{ color: tok.color }}>
          {correctCount}/{questions.length} correct
        </p>
        <p className="oc-feedback">
          {correctCount === questions.length
            ? "Perfect score!"
            : correctCount >= questions.length / 2
            ? "Good work — review any missed concepts."
            : "Review this section before continuing."}
        </p>
        <button className="oc-btn" style={{ background: tok.color, color: "#0a0a0a" }} onClick={onComplete}>Continue →</button>
      </div>
    );
  }

  return (
    <div className="oc-card" style={{ background: tok.bg, borderColor: tok.color + "33" }}>
      <div className="oc-label" style={{ color: tok.color }}>
        {tok.label} · {idx + 1}/{questions.length}
      </div>
      <p className="oc-prompt">{q.question}</p>
      <div className="oc-options">
        {q.options.map((opt, i) => {
          let borderColor = tok.color + "44";
          let bg = "transparent";
          let color = "#ccc";
          if (answered) {
            if (i === q.correct) { borderColor = "#00FFB2"; bg = "rgba(0,255,178,0.08)"; color = "#00FFB2"; }
            else if (i === answers[idx]) { borderColor = tok.color; bg = tok.color + "18"; color = tok.color; }
          }
          return (
            <button
              key={i}
              className="oc-option"
              style={{ borderColor, background: bg, color }}
              onClick={() => answer(i)}
              disabled={answered}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {showExplanation && (
        <>
          <p className="oc-result-badge" style={{
            color: isCorrect ? "#00FFB2" : tok.color,
            background: isCorrect ? "rgba(0,255,178,0.08)" : tok.color + "18",
          }}>
            {isCorrect ? "Correct ✓" : "Incorrect"}
          </p>
          <p className="oc-feedback">{q.explanation}</p>
          <button className="oc-btn" style={{ background: tok.color, color: "#0a0a0a" }} onClick={advance}>
            {idx + 1 < questions.length ? "Next →" : "See Score →"}
          </button>
        </>
      )}
    </div>
  );
}

// ── ANALYZER ───────────────────────────────────────────────────────────────
function AnalyzerCard({ overlay, onComplete }: { overlay: OverlayRow; onComplete: () => void }) {
  const data = overlay.data as {
    gapType?: string;
    message?: string;
    concepts?: Array<{ label: string; weight: number }>;
    prerequisites?: Array<{ label: string; mastered: boolean }>;
  };
  const concepts = data.concepts ?? [];
  const prerequisites = data.prerequisites ?? [];
  const tok = TOKENS.ANALYZER;

  return (
    <div className="oc-card" style={{ background: tok.bg, borderColor: tok.color + "33" }}>
      <div className="oc-label" style={{ color: tok.color }}>{tok.label}</div>
      {data.gapType && (
        <div className="oc-gap-badge" style={{ color: tok.color, background: tok.color + "18" }}>
          {data.gapType}
        </div>
      )}
      {data.message && <p className="oc-prompt">{data.message}</p>}
      {concepts.length > 0 && (
        <div className="oc-concepts">
          {concepts.map((c) => (
            <div key={c.label} className="oc-concept-row">
              <span className="oc-concept-label">{c.label}</span>
              <div className="oc-concept-bar-bg">
                <div
                  className="oc-concept-bar"
                  style={{ width: `${Math.min(100, c.weight)}%`, background: tok.color }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
      {prerequisites.length > 0 && (
        <div className="oc-prereqs">
          <p className="oc-prereq-title">Prerequisites</p>
          {prerequisites.map((p) => (
            <div key={p.label} className="oc-prereq-row">
              <span style={{ color: p.mastered ? "#00FFB2" : "#555" }}>
                {p.mastered ? "✓" : "○"}
              </span>
              <span style={{ color: p.mastered ? "#aaa" : "#555" }}>{p.label}</span>
            </div>
          ))}
        </div>
      )}
      <button className="oc-btn" style={{ background: tok.color, color: "#0a0a0a" }} onClick={onComplete}>
        Got it →
      </button>
    </div>
  );
}

// ── CONFIDENCE CHECK ───────────────────────────────────────────────────────
function ConfidenceCheckCard({ overlay, lessonId, onComplete }: Props) {
  const data = overlay.data as {
    identityBelief?: string;
    evidenceFromPattern?: string;
    reframe?: string;
    probeQuestion?: string;
    actionBridge?: string;
  };
  const [response, setResponse] = useState("");
  const [done, setDone] = useState(false);
  const tok = TOKENS.CONFIDENCE_CHECK;

  function submit() {
    logResponse({
      lessonId, overlayId: overlay.id, overlayType: "CONFIDENCE_CHECK",
      response: response.trim() || "(acknowledged)",
      conceptName: data.reframe?.slice(0, 80) ?? null,
    });
    setDone(true);
    setTimeout(onComplete, 600);
  }

  return (
    <div className="oc-card" style={{ background: tok.bg, borderColor: tok.color + "33" }}>
      <div className="oc-label" style={{ color: tok.color }}>{tok.label}</div>

      {/* Identity belief — strikethrough */}
      {data.identityBelief && (
        <div className="oc-cc-belief-wrap">
          <span className="oc-cc-belief-tag">What you think</span>
          <p className="oc-cc-belief">{data.identityBelief}</p>
        </div>
      )}

      {/* Evidence from pattern */}
      {data.evidenceFromPattern && (
        <div className="oc-cc-evidence">
          <span className="oc-cc-evidence-tag">What the data says</span>
          <p className="oc-cc-evidence-text">{data.evidenceFromPattern}</p>
        </div>
      )}

      {/* Reframe — the moment */}
      {data.reframe && (
        <p className="oc-cc-reframe">{data.reframe}</p>
      )}

      {/* Probe question */}
      {data.probeQuestion && (
        <div className="oc-cc-probe">
          <p className="oc-cc-probe-text">{data.probeQuestion}</p>
        </div>
      )}

      {!done ? (
        <>
          <textarea
            className="oc-textarea"
            placeholder="Your honest answer… (optional)"
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            rows={2}
            style={{ borderColor: tok.color + "44" }}
          />
          {/* Action bridge */}
          {data.actionBridge && (
            <p className="oc-cc-bridge">{data.actionBridge}</p>
          )}
          <button
            className="oc-btn"
            style={{ background: tok.color, color: "#fff" }}
            onClick={submit}
          >
            Got it →
          </button>
        </>
      ) : (
        <p className="oc-saved" style={{ color: tok.color }}>Saved ✓</p>
      )}
    </div>
  );
}

// ── NEXT MOVE ──────────────────────────────────────────────────────────────
function NextMoveCard({ overlay, lessonId, onComplete }: Props) {
  const data = overlay.data as {
    predictionHeadline?: string;
    predictedFailure?: string;
    whyYouWillBreak?: string;
    preventionDrill?: string;
    memoryTag?: string;
  };
  const tok = TOKENS.NEXT_MOVE;

  function done() {
    logResponse({
      lessonId, overlayId: overlay.id, overlayType: "NEXT_MOVE",
      response: data.memoryTag ?? null,
    });
    onComplete();
  }

  return (
    <div className="oc-card" style={{ background: tok.bg, borderColor: tok.color + "33" }}>
      <div className="oc-label" style={{ color: tok.color }}>{tok.label}</div>

      {/* Prediction headline */}
      {data.predictionHeadline && (
        <p className="oc-nm-headline">{data.predictionHeadline}</p>
      )}

      {/* Predicted failure — amber block */}
      {data.predictedFailure && (
        <div className="oc-nm-failure">
          <span className="oc-nm-failure-tag">Where it breaks:</span>
          <p className="oc-nm-failure-text">{data.predictedFailure}</p>
        </div>
      )}

      {/* Why you will break — red left border */}
      {data.whyYouWillBreak && (
        <div className="oc-nm-why">
          <p className="oc-nm-why-text">{data.whyYouWillBreak}</p>
        </div>
      )}

      {/* Prevention drill — teal block */}
      {data.preventionDrill && (
        <div className="oc-nm-drill">
          <span className="oc-nm-drill-tag">Do this now:</span>
          <p className="oc-nm-drill-text">{data.preventionDrill}</p>
        </div>
      )}

      {/* Memory tag — large centered pill */}
      {data.memoryTag && (
        <div className="oc-nm-tag-wrap">
          <span className="oc-nm-tag-label">Save this:</span>
          <div className="oc-nm-tag">{data.memoryTag}</div>
        </div>
      )}

      <button
        className="oc-btn"
        style={{ background: tok.color, color: "#fff" }}
        onClick={done}
      >
        Noted →
      </button>
    </div>
  );
}

// ── Shell ──────────────────────────────────────────────────────────────────
export default function OverlayCard({ overlay, lessonId, onComplete }: Props) {
  const type = (overlay.type ?? "").toUpperCase();

  let card: React.ReactNode;
  if (type === "SPARK")           card = <SparkCard overlay={overlay} lessonId={lessonId} onComplete={onComplete} />;
  else if (type === "GAP_CRUNCH") card = <GapCrunchCard overlay={overlay} lessonId={lessonId} onComplete={onComplete} />;
  else if (type === "TEACH_BACK") card = <TeachBackCard overlay={overlay} lessonId={lessonId} onComplete={onComplete} />;
  else if (type === "QUESTION_SPRINT") card = <QuestionSprintCard overlay={overlay} lessonId={lessonId} onComplete={onComplete} />;
  else if (type === "ANALYZER")         card = <AnalyzerCard overlay={overlay} onComplete={onComplete} />;
  else if (type === "CONFIDENCE_CHECK") card = <ConfidenceCheckCard overlay={overlay} lessonId={lessonId} onComplete={onComplete} />;
  else if (type === "NEXT_MOVE")        card = <NextMoveCard overlay={overlay} lessonId={lessonId} onComplete={onComplete} />;
  else card = (
    <div className="oc-card">
      <p className="oc-prompt">Unknown overlay type: {type}</p>
      <button className="oc-btn" onClick={onComplete}>Continue →</button>
    </div>
  );

  return (
    <>
      {card}
      <style>{`
        .oc-card {
          width: 100%;
          max-width: 32rem;
          background: #111;
          border: 1px solid #1f1f1f;
          border-radius: 1.25rem;
          padding: 2rem 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          font-family: 'Inter', system-ui, sans-serif;
        }
        .oc-label {
          font-size: 0.6rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .oc-prompt {
          font-size: 0.95rem;
          font-weight: 600;
          color: #e5e5e5;
          line-height: 1.5;
          margin: 0;
        }
        .oc-textarea {
          width: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid #222;
          border-radius: 0.75rem;
          padding: 0.75rem 1rem;
          color: #e5e5e5;
          font-size: 0.85rem;
          font-family: inherit;
          resize: vertical;
          outline: none;
          line-height: 1.5;
          box-sizing: border-box;
        }
        .oc-textarea:focus { border-color: #444; }
        .oc-btn {
          padding: 0.75rem 1.25rem;
          border: none;
          border-radius: 0.75rem;
          font-size: 0.82rem;
          font-weight: 700;
          cursor: pointer;
          transition: filter 0.15s, opacity 0.15s;
          text-align: center;
          font-family: inherit;
        }
        .oc-btn:hover:not(:disabled) { filter: brightness(1.1); }
        .oc-btn:disabled { opacity: 0.4; cursor: default; }
        .oc-options { display: flex; flex-direction: column; gap: 0.5rem; }
        .oc-option {
          padding: 0.65rem 1rem;
          background: transparent;
          border: 1px solid #222;
          border-radius: 0.65rem;
          color: #ccc;
          font-size: 0.82rem;
          font-family: inherit;
          cursor: pointer;
          text-align: left;
          transition: background 0.15s, border-color 0.15s, color 0.15s;
        }
        .oc-option:hover:not(:disabled) { background: rgba(255,255,255,0.04); }
        .oc-option:disabled { cursor: default; }
        .oc-evaluating {
          font-size: 0.8rem;
          color: #555;
          font-style: italic;
          margin: 0;
          animation: oc-pulse 1s ease-in-out infinite;
        }
        @keyframes oc-pulse { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }
        .oc-result-badge {
          display: inline-block;
          padding: 0.2rem 0.6rem;
          border-radius: 9999px;
          font-size: 0.72rem;
          font-weight: 700;
          margin: 0;
        }
        .oc-feedback {
          font-size: 0.82rem;
          color: #888;
          line-height: 1.6;
          margin: 0;
        }
        .oc-saved {
          font-size: 0.8rem;
          font-weight: 700;
          margin: 0;
        }
        .oc-stars { display: flex; gap: 0.25rem; }
        .oc-score-title {
          font-size: 1.5rem;
          font-weight: 800;
          margin: 0;
          text-align: center;
        }
        .oc-gap-badge {
          display: inline-block;
          padding: 0.2rem 0.6rem;
          border-radius: 9999px;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          align-self: flex-start;
        }
        .oc-concepts { display: flex; flex-direction: column; gap: 0.5rem; }
        .oc-concept-row { display: flex; align-items: center; gap: 0.65rem; }
        .oc-concept-label { font-size: 0.75rem; color: #888; min-width: 7rem; }
        .oc-concept-bar-bg {
          flex: 1;
          height: 4px;
          background: #1a1a1a;
          border-radius: 2px;
          overflow: hidden;
        }
        .oc-concept-bar {
          height: 100%;
          border-radius: 2px;
          transition: width 0.6s ease;
        }
        .oc-prereqs { display: flex; flex-direction: column; gap: 0.35rem; }
        .oc-prereq-title {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #444;
          margin: 0 0 0.2rem;
        }
        .oc-prereq-row { display: flex; align-items: center; gap: 0.5rem; font-size: 0.78rem; }

        /* ── Confidence Check ── */
        .oc-cc-belief-wrap { display: flex; flex-direction: column; gap: 0.2rem; }
        .oc-cc-belief-tag {
          font-size: 0.58rem; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: #444;
        }
        .oc-cc-belief {
          font-size: 0.88rem; color: #555;
          text-decoration: line-through;
          margin: 0; line-height: 1.5;
        }
        .oc-cc-evidence {
          border-left: 2px solid #5DCAA5;
          padding-left: 0.75rem;
          display: flex; flex-direction: column; gap: 0.2rem;
        }
        .oc-cc-evidence-tag {
          font-size: 0.58rem; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: #5DCAA5;
        }
        .oc-cc-evidence-text { font-size: 0.82rem; color: #888; margin: 0; line-height: 1.5; }
        .oc-cc-reframe {
          font-size: 1rem; font-weight: 700; color: #fff;
          margin: 0; line-height: 1.4;
        }
        .oc-cc-probe {
          background: rgba(212,83,126,0.1);
          border-radius: 0.6rem;
          padding: 0.7rem 0.9rem;
        }
        .oc-cc-probe-text { font-size: 0.83rem; color: #D4537E; font-style: italic; margin: 0; line-height: 1.5; }
        .oc-cc-bridge { font-size: 0.75rem; color: #555; margin: 0; line-height: 1.5; }

        /* ── Next Move ── */
        .oc-nm-headline { font-size: 1rem; font-weight: 700; color: #fff; margin: 0; line-height: 1.4; }
        .oc-nm-failure {
          background: rgba(194,130,40,0.12);
          border-radius: 0.6rem;
          padding: 0.7rem 0.9rem;
          display: flex; flex-direction: column; gap: 0.2rem;
        }
        .oc-nm-failure-tag {
          font-size: 0.58rem; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: #C9A84C;
        }
        .oc-nm-failure-text { font-size: 0.82rem; color: #b8922a; margin: 0; line-height: 1.5; }
        .oc-nm-why {
          border-left: 2px solid #E85A4A;
          padding-left: 0.75rem;
        }
        .oc-nm-why-text { font-size: 0.8rem; color: #888; margin: 0; line-height: 1.5; }
        .oc-nm-drill {
          background: rgba(93,202,165,0.08);
          border-radius: 0.6rem;
          padding: 0.7rem 0.9rem;
          display: flex; flex-direction: column; gap: 0.2rem;
        }
        .oc-nm-drill-tag {
          font-size: 0.58rem; font-weight: 700; letter-spacing: 0.1em;
          text-transform: uppercase; color: #5DCAA5;
        }
        .oc-nm-drill-text { font-size: 0.82rem; color: #5DCAA5; margin: 0; line-height: 1.5; }
        .oc-nm-tag-wrap {
          display: flex; flex-direction: column; align-items: center; gap: 0.35rem;
        }
        .oc-nm-tag-label {
          font-size: 0.6rem; color: #555;
          text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600;
        }
        .oc-nm-tag {
          background: rgba(127,119,221,0.15);
          color: #9F97ED;
          font-size: 1.1rem;
          font-weight: 500;
          padding: 10px 24px;
          border-radius: 20px;
          text-align: center;
        }
      `}</style>
    </>
  );
}
