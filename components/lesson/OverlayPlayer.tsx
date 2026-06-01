"use client";

import { useState, useEffect, useCallback } from "react";
import { authFetch } from "@/lib/client-auth";
import type { OverlayRow } from "@/lib/overlays";

interface Props {
  overlays: OverlayRow[];
  lessonId: string;
  onComplete: () => void;
}

// ── Type config (matches admin tokens) ──────────────────────────────────────
const TYPE_CFG = {
  spark:           { label: "SPARK",           icon: "⚡", accent: "#C9A84C", bg: "#0d1a10", dim: "#C9A84C22" },
  gap_crunch:      { label: "GAP CRUNCH",       icon: "🔴", accent: "#E85A4A", bg: "#120a0a", dim: "#E85A4A22" },
  teach_back:      { label: "TEACH BACK",       icon: "🎓", accent: "#5DCAA5", bg: "#091410", dim: "#5DCAA522" },
  question_sprint: { label: "QUESTION SPRINT",  icon: "🏃", accent: "#9F97ED", bg: "#0c0b18", dim: "#9F97ED22" },
  analyzer:        { label: "ANALYZER",         icon: "🔬", accent: "#5DAAF0", bg: "#090f18", dim: "#5DAAF022" },
} as const;
type OType = keyof typeof TYPE_CFG;

// ── Logging helper ──────────────────────────────────────────────────────────
function logResponse(data: {
  lessonId: string;
  overlayId: string;
  overlayType: string;
  response?: string | null;
  score?: number | null;
  correct?: boolean | null;
  gapType?: string | null;
  questionIdx?: number | null;
}) {
  void authFetch("/api/overlay-responses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then(async (res) => {
      if (res.ok) return;
      let error = `HTTP ${res.status}`;
      try {
        const json = await res.json();
        error = typeof json?.error === "string" ? json.error : error;
      } catch {
        // Keep the status fallback when the response is not JSON.
      }
      const detail = {
        error,
        status: res.status,
        lessonId: data.lessonId,
        overlayId: data.overlayId,
        overlayType: data.overlayType,
      };
      console.error("[overlay-response] save failed", detail);
      window.dispatchEvent(new CustomEvent("overlay-response-save-failed", { detail }));
    })
    .catch((error) => {
      const detail = {
        error: error instanceof Error ? error.message : String(error),
        lessonId: data.lessonId,
        overlayId: data.overlayId,
        overlayType: data.overlayType,
      };
      console.error("[overlay-response] request failed", detail);
      window.dispatchEvent(new CustomEvent("overlay-response-save-failed", { detail }));
    });
}

// ── Stars ────────────────────────────────────────────────────────────────────
function Stars({ score }: { score: number }) {
  return (
    <div className="op-stars">
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} className={n <= score ? "op-star op-star-on" : "op-star"}>★</span>
      ))}
      <span className="op-stars-label">{score}/5</span>
    </div>
  );
}

// ── SPARK card ───────────────────────────────────────────────────────────────
function SparkCard({
  overlay, lessonId, accent, dim, onDone,
}: {
  overlay: OverlayRow; lessonId: string; accent: string; dim: string; onDone: () => void;
}) {
  const d = overlay.data as Record<string, unknown>;
  const concepts = (d.connectedConcepts as string[] | undefined) ?? [];

  function handleDone() {
    logResponse({ lessonId, overlayId: overlay.id, overlayType: overlay.type });
    onDone();
  }

  return (
    <div className="op-card-body">
      <div className="op-concept-unlock" style={{ color: accent }}>
        {String(d.conceptUnlocked ?? "")}
      </div>
      <p className="op-why">{String(d.whyItMatters ?? "")}</p>
      <p className="op-memory-anchor">{String(d.memoryAnchor ?? "")}</p>
      {concepts.length > 0 && (
        <div className="op-pills">
          {concepts.map((c, i) => (
            <span key={i} className="op-pill" style={{ borderColor: accent + "55", color: accent }}>
              {c}
            </span>
          ))}
        </div>
      )}
      <p className="op-exam-connection">{String(d.examConnection ?? "")}</p>
      <button className="op-btn" style={{ background: accent, color: "#0a0a0a" }} onClick={handleDone}>
        Got it →
      </button>
    </div>
  );
}

// ── GAP CRUNCH card ──────────────────────────────────────────────────────────
function GapCrunchCard({
  overlay, lessonId, accent, onDone,
}: {
  overlay: OverlayRow; lessonId: string; accent: string; onDone: () => void;
}) {
  const d = overlay.data as Record<string, unknown>;
  type Phase = "read" | "typing" | "evaluating" | "result";
  const [phase, setPhase] = useState<Phase>("read");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  async function evaluate() {
    if (!answer.trim()) return;
    setPhase("evaluating");
    try {
      const res = await authFetch("/api/overlay/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "gap_crunch",
          fixPrompt: String(d.fixPrompt ?? ""),
          studentResponse: answer,
          gapType: String(d.gapType ?? ""),
        }),
      });
      const json = await res.json();
      setFeedback(json.feedback ?? "");
    } catch {
      setFeedback("Keep working on distinguishing when each case applies.");
    }
    setPhase("result");
  }

  function handleDone() {
    logResponse({
      lessonId, overlayId: overlay.id, overlayType: overlay.type,
      response: answer, gapType: String(d.gapType ?? ""),
    });
    onDone();
  }

  return (
    <div className="op-card-body">
      <div className="op-gap-type-badge" style={{ borderColor: accent + "55", color: accent }}>
        {String(d.gapType ?? "")}
      </div>
      <h2 className="op-gap-headline" style={{ color: accent }}>{String(d.headline ?? "")}</h2>

      <div className="op-two-col">
        <div className="op-col">
          <div className="op-col-label">What students think</div>
          <p className="op-col-text">{String(d.whatStudentsThink ?? "")}</p>
        </div>
        <div className="op-col-divider" style={{ borderColor: accent + "33" }} />
        <div className="op-col">
          <div className="op-col-label op-col-label-right">What is actually true</div>
          <p className="op-col-text">{String(d.whatIsActuallyTrue ?? "")}</p>
        </div>
      </div>

      <div className="op-trap-box" style={{ borderLeftColor: "#E85A4A" }}>
        <span className="op-trap-label">⚠ EXAM TRAP</span>
        <p className="op-trap-text">{String(d.examTrap ?? "")}</p>
      </div>

      {phase === "read" && (
        <>
          <p className="op-fix-prompt">{String(d.fixPrompt ?? "")}</p>
          <button className="op-btn op-btn-outline" style={{ borderColor: accent, color: accent }}
            onClick={() => setPhase("typing")}>
            I see the gap — answer this
          </button>
        </>
      )}

      {(phase === "typing" || phase === "evaluating") && (
        <>
          <p className="op-fix-prompt">{String(d.fixPrompt ?? "")}</p>
          <textarea
            className="op-textarea"
            rows={3}
            autoFocus
            placeholder="Type your answer…"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            disabled={phase === "evaluating"}
          />
          <button
            className="op-btn"
            style={{ background: phase === "evaluating" ? "#222" : accent, color: "#0a0a0a" }}
            disabled={!answer.trim() || phase === "evaluating"}
            onClick={evaluate}
          >
            {phase === "evaluating" ? (
              <><span className="op-spinner" style={{ borderTopColor: accent }} /> Checking…</>
            ) : "Check my thinking →"}
          </button>
        </>
      )}

      {phase === "result" && (
        <>
          <div className="op-eval-result" style={{ borderColor: accent + "44" }}>
            <p className="op-eval-text">{feedback}</p>
          </div>
          <button className="op-btn" style={{ background: accent, color: "#0a0a0a" }} onClick={handleDone}>
            Continue →
          </button>
        </>
      )}
    </div>
  );
}

// ── TEACH BACK card ──────────────────────────────────────────────────────────
function TeachBackCard({
  overlay, lessonId, accent, onDone,
}: {
  overlay: OverlayRow; lessonId: string; accent: string; onDone: () => void;
}) {
  const d = overlay.data as Record<string, unknown>;
  type Phase = "writing" | "evaluating" | "result";
  const [phase, setPhase] = useState<Phase>("writing");
  const [answer, setAnswer] = useState("");
  const [hintOpen, setHintOpen] = useState(false);
  const [evalScore, setEvalScore] = useState(0);
  const [evalFeedback, setEvalFeedback] = useState("");
  const enough = answer.trim().length >= 40;

  async function submit() {
    if (!enough) return;
    setPhase("evaluating");
    try {
      const res = await authFetch("/api/overlay/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "teach_back",
          aiEvalPrompt: String(d.aiEvalPrompt ?? "Evaluate the student's teach-back on a 1-5 scale."),
          studentResponse: answer,
        }),
      });
      const json = await res.json();
      setEvalScore(Number(json.score) || 3);
      setEvalFeedback(json.feedback ?? "");
    } catch {
      setEvalScore(3);
      setEvalFeedback("Your explanation shows understanding. Try to be more precise about the mechanism.");
    }
    setPhase("result");
  }

  function handleDone() {
    logResponse({
      lessonId, overlayId: overlay.id, overlayType: overlay.type,
      response: answer, score: evalScore,
    });
    onDone();
  }

  return (
    <div className="op-card-body">
      <div className="op-tb-concept" style={{ borderColor: accent + "55", color: accent }}>
        {String(d.targetConcept ?? "")}
      </div>
      <h2 className="op-tb-prompt">{String(d.teachPrompt ?? "")}</h2>

      {phase === "writing" && (
        <>
          <textarea
            className="op-textarea"
            rows={5}
            autoFocus
            placeholder="Explain it as if you're teaching a confused classmate…"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <div className="op-tb-footer">
            <span className="op-char-hint">{answer.trim().length} / 40 min</span>
            <button
              className="op-hint-toggle"
              onClick={() => setHintOpen((v) => !v)}
            >
              {hintOpen ? "Hide hint ▲" : "Need a hint? ▼"}
            </button>
          </div>
          {hintOpen && (
            <div className="op-hint-box" style={{ borderColor: accent + "33" }}>
              <span className="op-hint-label">HINT</span>
              <p className="op-hint-text">{String(d.ifTheyStruggle ?? "")}</p>
            </div>
          )}
          <button
            className="op-btn"
            style={{ background: enough ? accent : "#1a1a1a", color: enough ? "#0a0a0a" : "#333" }}
            disabled={!enough}
            onClick={submit}
          >
            Submit explanation →
          </button>
        </>
      )}

      {phase === "evaluating" && (
        <div className="op-eval-loading">
          <span className="op-spinner op-spinner-lg" style={{ borderTopColor: accent }} />
          <p className="op-eval-loading-text">Evaluating your explanation…</p>
        </div>
      )}

      {phase === "result" && (
        <>
          <div className="op-student-response">
            <p className="op-sr-text">{answer}</p>
          </div>
          <Stars score={evalScore} />
          <div className="op-eval-result" style={{ borderColor: accent + "44" }}>
            <p className="op-eval-text">{evalFeedback}</p>
          </div>
          <p className="op-success-signal">
            <span className="op-ss-label">STRONG ANSWER INCLUDES:</span> {String(d.successSignal ?? "")}
          </p>
          <button className="op-btn" style={{ background: accent, color: "#0a0a0a" }} onClick={handleDone}>
            Continue →
          </button>
        </>
      )}
    </div>
  );
}

// ── QUESTION SPRINT card ─────────────────────────────────────────────────────
interface SprintQuestion {
  q: string;
  choices: string[];
  correct: string;
  trap: string;
  gapType: string;
}

function QuestionSprintCard({
  overlay, lessonId, accent, onDone,
}: {
  overlay: OverlayRow; lessonId: string; accent: string; onDone: () => void;
}) {
  const d = overlay.data as Record<string, unknown>;
  const questions = (d.questions as SprintQuestion[] | undefined) ?? [];
  const [qIdx, setQIdx] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [results, setResults] = useState<Array<{ correct: boolean; gapType: string }>>([]);

  const q = questions[qIdx];
  const isCorrectPick = picked != null && q != null && picked.charAt(0) === q.correct;
  const allDone = qIdx >= questions.length;
  const score = results.filter((r) => r.correct).length;

  function reveal() {
    if (!picked || !q) return;
    const correct = picked.charAt(0) === q.correct;
    setRevealed(true);
    logResponse({
      lessonId, overlayId: overlay.id, overlayType: overlay.type,
      correct, gapType: q.gapType, questionIdx: qIdx,
    });
  }

  function nextQuestion() {
    if (!q) return;
    const correct = picked != null && picked.charAt(0) === q.correct;
    setResults((prev) => [...prev, { correct, gapType: q.gapType }]);
    setPicked(null);
    setRevealed(false);
    setQIdx((i) => i + 1);
  }

  function handleDone() {
    onDone();
  }

  if (!q || allDone) {
    // Score screen
    return (
      <div className="op-card-body">
        <div className="op-sprint-score">
          <span className="op-sprint-score-num" style={{ color: accent }}>{score}</span>
          <span className="op-sprint-score-denom">/{questions.length}</span>
        </div>
        <p className="op-sprint-focus">{String(d.sprintFocus ?? "")}</p>
        <div className="op-sprint-breakdown">
          {results.map((r, i) => (
            <div key={i} className="op-sprint-result-row">
              <span className={r.correct ? "op-dot-ok" : "op-dot-err"}>
                {r.correct ? "✓" : "✗"}
              </span>
              <span className="op-sprint-q-label">Q{i + 1}</span>
              <span className="op-sprint-gap">{r.gapType}</span>
            </div>
          ))}
        </div>
        <button className="op-btn" style={{ background: accent, color: "#0a0a0a" }} onClick={handleDone}>
          Continue →
        </button>
      </div>
    );
  }

  return (
    <div className="op-card-body">
      <div className="op-sprint-progress">
        <span className="op-sprint-idx" style={{ color: accent }}>Q{qIdx + 1}</span>
        <span className="op-sprint-total">of {questions.length}</span>
        <div className="op-sprint-dots">
          {questions.map((_, i) => (
            <span
              key={i}
              className="op-sprint-dot"
              style={{
                background: i < qIdx
                  ? (results[i]?.correct ? "#4ade80" : "#ef4444")
                  : i === qIdx ? accent : "#1a1a1a",
              }}
            />
          ))}
        </div>
      </div>

      <p className="op-sprint-q">{q.q}</p>

      <div className="op-choices">
        {q.choices.map((choice, i) => {
          const letter = choice.charAt(0);
          const isCorrectChoice = letter === q.correct;
          let cls = "op-choice";
          if (revealed) {
            if (isCorrectChoice) cls += " op-choice-correct";
            else if (choice === picked) cls += " op-choice-wrong";
            else cls += " op-choice-dim";
          } else if (choice === picked) {
            cls += " op-choice-picked";
          }
          return (
            <button
              key={i}
              className={cls}
              disabled={revealed}
              onClick={() => setPicked(choice)}
              style={revealed && isCorrectChoice ? { borderColor: "#4ade80" } : undefined}
            >
              <span className="op-choice-letter">{letter}</span>
              <span className="op-choice-text">{choice.slice(3)}</span>
            </button>
          );
        })}
      </div>

      {revealed && (
        <div className={`op-sprint-feedback ${isCorrectPick ? "op-sfb-ok" : "op-sfb-err"}`}>
          <span className="op-sfb-icon">{isCorrectPick ? "✓ Correct" : "✗ Not quite"}</span>
          <p className="op-sfb-trap">{q.trap}</p>
        </div>
      )}

      {!revealed ? (
        <button
          className="op-btn"
          style={{ background: picked ? accent : "#1a1a1a", color: picked ? "#0a0a0a" : "#333" }}
          disabled={!picked}
          onClick={reveal}
        >
          Check answer
        </button>
      ) : (
        <button
          className="op-btn"
          style={{ background: accent, color: "#0a0a0a" }}
          onClick={nextQuestion}
        >
          {qIdx + 1 < questions.length ? "Next question →" : "See results →"}
        </button>
      )}
    </div>
  );
}

// ── ANALYZER card ────────────────────────────────────────────────────────────
interface ConceptMapItem { concept: string; weight: string; likelyGap: string; }

function AnalyzerCard({
  overlay, lessonId, accent, onDone,
}: {
  overlay: OverlayRow; lessonId: string; accent: string; onDone: () => void;
}) {
  const d = overlay.data as Record<string, unknown>;
  const conceptMap = (d.conceptMap as ConceptMapItem[] | undefined) ?? [];
  const prereqs = (d.prerequisiteCheck as string[] | undefined) ?? [];
  const [allChecked, setAllChecked] = useState<boolean[]>(prereqs.map(() => false));

  const weightBar: Record<string, string> = { high: "100%", medium: "60%", low: "30%" };
  const weightColor: Record<string, string> = { high: "#ef4444", medium: "#f97316", low: "#555" };

  function handleDone() {
    logResponse({ lessonId, overlayId: overlay.id, overlayType: overlay.type });
    onDone();
  }

  return (
    <div className="op-card-body">
      <h2 className="op-analyzer-headline" style={{ color: accent }}>
        {String(d.lessonInOneLine ?? "")}
      </h2>

      <div className="op-analyzer-stats">
        <div className="op-stat">
          <span className="op-stat-num" style={{ color: accent }}>{String(d.coreConceptCount ?? 0)}</span>
          <span className="op-stat-label">core concepts</span>
        </div>
        <div className="op-stat-divider" />
        <div className="op-stat">
          <span className="op-stat-label">{String(d.examFrequency ?? "")}</span>
        </div>
      </div>

      {conceptMap.length > 0 && (
        <div className="op-concept-map">
          <div className="op-section-label">CONCEPT MAP</div>
          {conceptMap.map((c, i) => (
            <div key={i} className="op-cm-row">
              <span className="op-cm-name">{c.concept}</span>
              <div className="op-cm-bar-track">
                <div
                  className="op-cm-bar-fill"
                  style={{
                    width: weightBar[c.weight] ?? "50%",
                    background: weightColor[c.weight] ?? "#555",
                  }}
                />
              </div>
              <span className="op-cm-gap">{c.likelyGap}</span>
            </div>
          ))}
        </div>
      )}

      <div className="op-hardest" style={{ borderColor: accent + "44" }}>
        <span className="op-section-label">HARDEST MOMENT</span>
        <p className="op-hardest-text">{String(d.hardestMoment ?? "")}</p>
      </div>

      {prereqs.length > 0 && (
        <div className="op-prereqs">
          <div className="op-section-label">PREREQUISITE CHECK</div>
          {prereqs.map((p, i) => (
            <label key={i} className="op-prereq-row">
              <input
                type="checkbox"
                checked={allChecked[i]}
                onChange={() => setAllChecked((prev) => {
                  const next = [...prev];
                  next[i] = !next[i];
                  return next;
                })}
                className="op-prereq-check"
              />
              <span style={{ color: allChecked[i] ? "#4ade80" : "#888" }}>{p}</span>
            </label>
          ))}
        </div>
      )}

      <button className="op-btn" style={{ background: accent, color: "#0a0a0a" }} onClick={handleDone}>
        Let's go →
      </button>
    </div>
  );
}

// ── Main OverlayPlayer ────────────────────────────────────────────────────────

export default function OverlayPlayer({ overlays, lessonId, onComplete }: Props) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [visible, setVisible] = useState(false);

  // Entrance animation: delay one frame after mount/index change
  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, [currentIdx]);

  const advance = useCallback(() => {
    setVisible(false);
    setTimeout(() => {
      if (currentIdx + 1 >= overlays.length) {
        onComplete();
      } else {
        setCurrentIdx((i) => i + 1);
      }
    }, 150);
  }, [currentIdx, overlays.length, onComplete]);

  if (!overlays.length) return null;

  const overlay = overlays[currentIdx];
  if (!overlay) return null;

  const type = overlay.type as OType;
  const cfg = TYPE_CFG[type] ?? TYPE_CFG.spark;

  return (
    <div className="op-backdrop">
      <div
        className="op-card"
        style={{
          borderColor: cfg.accent + "44",
          background: cfg.bg,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(14px)",
        }}
      >
        {/* Card header */}
        <div className="op-card-header" style={{ borderBottomColor: cfg.accent + "22" }}>
          <span className="op-type-badge" style={{ color: cfg.accent, borderColor: cfg.accent + "55" }}>
            {cfg.icon} {cfg.label}
          </span>
          {overlay.script_section_ref && (
            <span className="op-section-tag">{overlay.script_section_ref}</span>
          )}
          <span className="op-progress-tag">
            {currentIdx + 1} / {overlays.length}
          </span>
        </div>

        {/* Scrollable body */}
        <div className="op-card-scroll">
          {type === "spark" && (
            <SparkCard key={overlay.id} overlay={overlay} lessonId={lessonId} accent={cfg.accent} dim={cfg.dim} onDone={advance} />
          )}
          {type === "gap_crunch" && (
            <GapCrunchCard key={overlay.id} overlay={overlay} lessonId={lessonId} accent={cfg.accent} onDone={advance} />
          )}
          {type === "teach_back" && (
            <TeachBackCard key={overlay.id} overlay={overlay} lessonId={lessonId} accent={cfg.accent} onDone={advance} />
          )}
          {type === "question_sprint" && (
            <QuestionSprintCard key={overlay.id} overlay={overlay} lessonId={lessonId} accent={cfg.accent} onDone={advance} />
          )}
          {type === "analyzer" && (
            <AnalyzerCard key={overlay.id} overlay={overlay} lessonId={lessonId} accent={cfg.accent} onDone={advance} />
          )}
        </div>
      </div>

      <style>{`
        /* ── Backdrop ── */
        .op-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(10, 17, 23, 0.96);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 50;
          padding: 1.5rem;
        }

        /* ── Card ── */
        .op-card {
          width: 100%;
          max-width: 640px;
          border: 1px solid;
          border-radius: 1.25rem;
          display: flex;
          flex-direction: column;
          max-height: calc(100dvh - 3rem);
          overflow: hidden;
          transition: opacity 0.2s ease-out, transform 0.2s ease-out;
          font-family: 'Inter', system-ui, sans-serif;
        }
        .op-card-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          border-bottom: 1px solid;
          flex-shrink: 0;
        }
        .op-type-badge {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.07em;
          padding: 0.2rem 0.55rem;
          border: 1px solid;
          border-radius: 4px;
        }
        .op-section-tag {
          font-size: 0.6rem;
          color: #3a3a3a;
          font-family: monospace;
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .op-progress-tag {
          font-size: 0.62rem;
          color: #444;
          font-family: monospace;
          flex-shrink: 0;
        }
        .op-card-scroll {
          overflow-y: auto;
          padding: 1.5rem 1.5rem;
          flex: 1;
        }
        @media (max-width: 640px) {
          .op-card-scroll { padding: 1.25rem; }
        }

        /* ── Shared card body ── */
        .op-card-body {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          color: #e5e5e5;
        }

        /* ── Button ── */
        .op-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.4rem;
          padding: 0.75rem 1.25rem;
          border: none;
          border-radius: 0.7rem;
          font-size: 0.9rem;
          font-weight: 700;
          cursor: pointer;
          transition: filter 0.15s, opacity 0.15s;
          width: 100%;
        }
        .op-btn:disabled { opacity: 0.35; cursor: default; }
        .op-btn:not(:disabled):hover { filter: brightness(1.08); }
        .op-btn-outline {
          background: transparent !important;
          border: 1px solid !important;
          color: inherit;
        }

        /* ── Textarea ── */
        .op-textarea {
          width: 100%;
          background: #0a0a0a;
          border: 1px solid #1e1e1e;
          border-radius: 0.6rem;
          padding: 0.75rem;
          font-size: 0.88rem;
          color: #ddd;
          outline: none;
          resize: vertical;
          font-family: inherit;
          line-height: 1.6;
          transition: border-color 0.15s;
        }
        .op-textarea:focus { border-color: #333; }

        /* ── Spinner ── */
        .op-spinner {
          display: inline-block;
          width: 14px;
          height: 14px;
          border: 2px solid transparent;
          border-radius: 50%;
          animation: op-spin 0.7s linear infinite;
          flex-shrink: 0;
        }
        .op-spinner-lg { width: 32px; height: 32px; border-width: 3px; }
        @keyframes op-spin { to { transform: rotate(360deg); } }

        /* ── Eval result box ── */
        .op-eval-result {
          border: 1px solid;
          border-radius: 0.65rem;
          padding: 0.85rem 1rem;
          background: #0a0a0a;
        }
        .op-eval-text {
          font-size: 0.88rem;
          color: #ccc;
          line-height: 1.65;
        }
        .op-eval-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          padding: 1.5rem 0;
        }
        .op-eval-loading-text { font-size: 0.82rem; color: #444; }

        /* ── Stars ── */
        .op-stars {
          display: flex;
          align-items: center;
          gap: 0.15rem;
        }
        .op-star { font-size: 1.35rem; color: #222; }
        .op-star-on { color: #f59e0b; }
        .op-stars-label {
          font-size: 0.75rem;
          color: #666;
          margin-left: 0.35rem;
          font-family: monospace;
        }

        /* ── SPARK ── */
        .op-concept-unlock {
          font-size: 1.55rem;
          font-weight: 800;
          line-height: 1.2;
          letter-spacing: -0.01em;
        }
        .op-why {
          font-size: 0.9rem;
          color: #ccc;
          line-height: 1.6;
        }
        .op-memory-anchor {
          font-size: 0.85rem;
          color: #777;
          font-style: italic;
          line-height: 1.6;
        }
        .op-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 0.35rem;
        }
        .op-pill {
          font-size: 0.72rem;
          font-weight: 600;
          padding: 0.2rem 0.6rem;
          border: 1px solid;
          border-radius: 9999px;
          background: transparent;
        }
        .op-exam-connection {
          font-size: 0.75rem;
          color: #444;
          font-style: italic;
        }

        /* ── GAP CRUNCH ── */
        .op-gap-type-badge {
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.07em;
          padding: 0.2rem 0.55rem;
          border: 1px solid;
          border-radius: 4px;
          width: fit-content;
        }
        .op-gap-headline {
          font-size: 1.15rem;
          font-weight: 800;
          line-height: 1.3;
        }
        .op-two-col {
          display: grid;
          grid-template-columns: 1fr 1px 1fr;
          gap: 0.75rem;
          align-items: start;
        }
        .op-col-divider {
          border-left: 1px solid;
          align-self: stretch;
        }
        .op-col-label {
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.09em;
          text-transform: uppercase;
          color: #555;
          margin-bottom: 0.25rem;
        }
        .op-col-label-right { text-align: right; }
        .op-col-text {
          font-size: 0.83rem;
          color: #aaa;
          line-height: 1.6;
        }
        .op-trap-box {
          border-left: 3px solid;
          padding: 0.6rem 0.85rem;
          background: #110a0a;
          border-radius: 0 0.4rem 0.4rem 0;
        }
        .op-trap-label {
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.09em;
          color: #E85A4A;
          display: block;
          margin-bottom: 0.2rem;
        }
        .op-trap-text { font-size: 0.82rem; color: #aaa; line-height: 1.55; }
        .op-fix-prompt { font-size: 0.9rem; color: #ccc; font-weight: 500; }

        /* ── TEACH BACK ── */
        .op-tb-concept {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.07em;
          padding: 0.22rem 0.6rem;
          border: 1px solid;
          border-radius: 4px;
          width: fit-content;
        }
        .op-tb-prompt {
          font-size: 1.1rem;
          font-weight: 700;
          color: #fff;
          line-height: 1.4;
        }
        .op-tb-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .op-char-hint { font-size: 0.7rem; color: #444; }
        .op-hint-toggle {
          font-size: 0.72rem;
          color: #555;
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.15s;
        }
        .op-hint-toggle:hover { color: #aaa; }
        .op-hint-box {
          border: 1px solid;
          border-radius: 0.5rem;
          padding: 0.65rem 0.85rem;
          background: #0a0a0a;
        }
        .op-hint-label {
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.09em;
          color: #444;
          display: block;
          margin-bottom: 0.2rem;
        }
        .op-hint-text { font-size: 0.82rem; color: #888; line-height: 1.55; }
        .op-student-response {
          background: #0a0a0a;
          border: 1px solid #1a1a1a;
          border-radius: 0.5rem;
          padding: 0.65rem 0.85rem;
        }
        .op-sr-text { font-size: 0.83rem; color: #777; line-height: 1.6; font-style: italic; }
        .op-success-signal {
          font-size: 0.75rem;
          color: #444;
          line-height: 1.5;
        }
        .op-ss-label {
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.07em;
          color: #333;
          margin-right: 0.25rem;
        }

        /* ── QUESTION SPRINT ── */
        .op-sprint-progress {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        .op-sprint-idx { font-size: 0.85rem; font-weight: 800; }
        .op-sprint-total { font-size: 0.72rem; color: #444; }
        .op-sprint-dots { display: flex; gap: 0.3rem; margin-left: auto; }
        .op-sprint-dot {
          width: 8px; height: 8px; border-radius: 50%;
          transition: background 0.2s;
        }
        .op-sprint-q {
          font-size: 0.98rem;
          font-weight: 600;
          color: #fff;
          line-height: 1.5;
        }
        .op-choices { display: flex; flex-direction: column; gap: 0.4rem; }
        .op-choice {
          display: flex;
          align-items: flex-start;
          gap: 0.6rem;
          text-align: left;
          background: #0a0a0a;
          border: 1px solid #1e1e1e;
          border-radius: 0.6rem;
          padding: 0.6rem 0.75rem;
          cursor: pointer;
          color: #bbb;
          font-size: 0.85rem;
          transition: border-color 0.12s, background 0.12s;
        }
        .op-choice:hover:not(:disabled) { border-color: #333; background: #111; }
        .op-choice:disabled { cursor: default; }
        .op-choice-picked { border-color: #444; background: #111; color: #fff; }
        .op-choice-correct { border-color: #4ade80; background: #0a1f12; color: #4ade80; }
        .op-choice-wrong { border-color: #ef4444; background: #1a0808; color: #ef4444; }
        .op-choice-dim { opacity: 0.35; }
        .op-choice-letter {
          font-size: 0.7rem;
          font-weight: 700;
          font-family: monospace;
          flex-shrink: 0;
          color: #444;
          padding-top: 0.1rem;
        }
        .op-choice-text { line-height: 1.5; }
        .op-sprint-feedback {
          border-radius: 0.6rem;
          padding: 0.65rem 0.85rem;
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }
        .op-sfb-ok { background: #0a1f12; border: 1px solid #4ade8033; }
        .op-sfb-err { background: #1a0808; border: 1px solid #ef444433; }
        .op-sfb-icon { font-size: 0.78rem; font-weight: 700; }
        .op-sfb-ok .op-sfb-icon { color: #4ade80; }
        .op-sfb-err .op-sfb-icon { color: #ef4444; }
        .op-sfb-trap { font-size: 0.8rem; color: #888; line-height: 1.5; }

        /* Sprint score screen */
        .op-sprint-score {
          text-align: center;
          padding: 0.5rem 0;
        }
        .op-sprint-score-num {
          font-size: 4rem;
          font-weight: 900;
          line-height: 1;
        }
        .op-sprint-score-denom {
          font-size: 1.5rem;
          color: #444;
          font-weight: 600;
        }
        .op-sprint-focus {
          font-size: 0.85rem;
          color: #777;
          font-style: italic;
          text-align: center;
          line-height: 1.55;
        }
        .op-sprint-breakdown { display: flex; flex-direction: column; gap: 0.35rem; }
        .op-sprint-result-row {
          display: flex;
          align-items: center;
          gap: 0.55rem;
          font-size: 0.8rem;
        }
        .op-dot-ok { color: #4ade80; font-weight: 700; }
        .op-dot-err { color: #ef4444; font-weight: 700; }
        .op-sprint-q-label { color: #555; font-family: monospace; font-size: 0.72rem; }
        .op-sprint-gap { color: #444; font-size: 0.72rem; }

        /* ── ANALYZER ── */
        .op-analyzer-headline {
          font-size: 1.1rem;
          font-weight: 700;
          line-height: 1.4;
        }
        .op-analyzer-stats {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.75rem 0;
          border-top: 1px solid #1a1a1a;
          border-bottom: 1px solid #1a1a1a;
        }
        .op-stat { display: flex; flex-direction: column; gap: 0.1rem; }
        .op-stat-num { font-size: 1.6rem; font-weight: 900; line-height: 1; }
        .op-stat-label { font-size: 0.7rem; color: #555; }
        .op-stat-divider {
          width: 1px;
          height: 2rem;
          background: #1e1e1e;
          flex-shrink: 0;
        }
        .op-section-label {
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.09em;
          text-transform: uppercase;
          color: #3a3a3a;
          margin-bottom: 0.35rem;
        }
        .op-concept-map { display: flex; flex-direction: column; gap: 0.45rem; }
        .op-cm-row {
          display: flex;
          align-items: center;
          gap: 0.6rem;
        }
        .op-cm-name { font-size: 0.78rem; color: #999; min-width: 8rem; }
        .op-cm-bar-track {
          flex: 1;
          height: 4px;
          background: #1a1a1a;
          border-radius: 2px;
          overflow: hidden;
        }
        .op-cm-bar-fill {
          height: 100%;
          border-radius: 2px;
          transition: width 0.6s ease-out;
        }
        .op-cm-gap { font-size: 0.65rem; color: #3a3a3a; min-width: 5rem; text-align: right; }
        .op-hardest {
          border: 1px solid;
          border-radius: 0.5rem;
          padding: 0.7rem 0.85rem;
          background: #0a0a0a;
        }
        .op-hardest-text { font-size: 0.83rem; color: #aaa; line-height: 1.55; }
        .op-prereqs { display: flex; flex-direction: column; gap: 0.45rem; }
        .op-prereq-row {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
          font-size: 0.83rem;
          transition: color 0.15s;
        }
        .op-prereq-check { accent-color: #4ade80; cursor: pointer; }
      `}</style>
    </div>
  );
}
