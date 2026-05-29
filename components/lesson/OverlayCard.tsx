"use client";

/**
 * OverlayCard — renders a single overlay with full student interaction.
 * Used by VideoLessonPlayer when a timed checkpoint fires.
 *
 * Cosmic mission-control aesthetic: starfield gradient, mono caps labels with
 * pulsing dot + glow, italic serif prompts, accent rings/glow per type.
 */

import { useState, useEffect, useRef } from "react";
import { authFetch } from "@/lib/client-auth";
import type { OverlayRow } from "@/lib/overlays";
import { getTier, getNextTier, didCrossTier } from "@/lib/streakTiers";
import { emit as emitTelemetry } from "@/lib/attentionTelemetry";

interface Props {
  overlay: OverlayRow;
  lessonId: string;
  onComplete: () => void;
  // popupMode: TAP_QUICK rendered as a compact dopamine pulse over the
  // (dimmed) video — auto-advances on correct, confetti burst, spring entry.
  popupMode?: boolean;
  // TAP_QUICK-only — current in-lesson streak passed in, and a callback the
  // player uses to update the streak after each tap.
  tapStreak?: number;
  onTapResult?: (correct: boolean) => void;
  // ── Session context (threads learning_events.session_id end-to-end) ──
  sessionId?: string;
  subjectId?: string;
  courseId?: string;
  lessonLang?: "en" | "ko";
  sectionKey?: string;
}

// Per-card context attached to every overlay-response log so the API can
// forward it into the V1 learning_events bridge with full session linkage.
interface LogContext {
  sessionId?: string;
  subjectId?: string;
  courseId?: string;
  lessonLang?: "en" | "ko";
  sectionKey?: string;
}

// ── Design tokens ──────────────────────────────────────────────────────────
const TOKENS: Record<string, { color: string; label: string }> = {
  SPARK:            { color: "#F4C95D", label: "✦ SPARK" },
  GAP_CRUNCH:       { color: "#FF6B5B", label: "◆ GAP CRUNCH" },
  TEACH_BACK:       { color: "#5DCAA5", label: "◇ TEACH BACK" },
  QUESTION_SPRINT:  { color: "#A99CFF", label: "✧ QUESTION SPRINT" },
  ANALYZER:         { color: "#5DAAF0", label: "◉ ANALYZER" },
  CONFIDENCE_CHECK: { color: "#E97099", label: "◈ CONFIDENCE CHECK" },
  NEXT_MOVE:        { color: "#9B8DFF", label: "→ NEXT MOVE" },
  TAP_QUICK:        { color: "#00FFB2", label: "◎ PULSE" },
};

const cardStyle = (tok: string): React.CSSProperties =>
  ({ ["--tok" as string]: tok } as React.CSSProperties);

function logResponse(data: Record<string, unknown>, ctx?: LogContext) {
  const payload = ctx ? { ...data, ...ctx } : data;
  authFetch("/api/overlay-responses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch(() => {});
}

function pickCtx(props: Props): LogContext {
  return {
    sessionId: props.sessionId,
    subjectId: props.subjectId,
    courseId: props.courseId,
    lessonLang: props.lessonLang,
    sectionKey: props.sectionKey,
  };
}

// ── SPARK ──────────────────────────────────────────────────────────────────
function SparkCard(props: Props) {
  const { overlay, lessonId, onComplete } = props;
  const ctx = pickCtx(props);
  const data = overlay.data as { prompt?: string };
  const [value, setValue] = useState("");
  const [done, setDone] = useState(false);

  function submit() {
    if (!value.trim()) return;
    setDone(true);
    logResponse({
      lessonId, overlayId: overlay.id, overlayType: "SPARK",
      response: value.trim(),
    }, ctx);
    setTimeout(onComplete, 800);
  }

  const tok = TOKENS.SPARK;
  return (
    <div className="oc-card" style={cardStyle(tok.color)}>
      <div className="oc-label">{tok.label}</div>
      <p className="oc-prompt">{data.prompt ?? "What do you notice?"}</p>
      {!done ? (
        <>
          <textarea
            className="oc-textarea"
            placeholder="Type your thoughts…"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            rows={3}
          />
          <button
            className="oc-btn"
            onClick={submit}
            disabled={!value.trim()}
          >
            Submit →
          </button>
        </>
      ) : (
        <p className="oc-saved">Saved ✓</p>
      )}
    </div>
  );
}

// ── GAP CRUNCH ─────────────────────────────────────────────────────────────
function GapCrunchCard(props: Props) {
  const { overlay, lessonId, onComplete } = props;
  const ctx = pickCtx(props);
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
    }, ctx);
    setPhase("result");
  }

  return (
    <div className="oc-card" style={cardStyle(tok.color)}>
      <div className="oc-label">{tok.label}</div>
      <p className="oc-prompt">{data.statement ?? "Which is correct?"}</p>
      {phase === "choose" && (
        <div className="oc-options">
          {options.map((opt) => (
            <button
              key={opt}
              className="oc-option"
              onClick={() => choose(opt)}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
      {phase === "evaluating" && (
        <p className="oc-evaluating">Evaluating signal…</p>
      )}
      {phase === "result" && (
        <>
          <div className={`oc-result-badge ${selected === data.correct ? "oc-result-good" : "oc-result-miss"}`}>
            {selected === data.correct ? "✓ Correct" : "✕ Not quite"}
          </div>
          {feedback && <p className="oc-feedback">{feedback}</p>}
          <button className="oc-btn" onClick={onComplete}>Continue →</button>
        </>
      )}
    </div>
  );
}

// ── TEACH BACK ─────────────────────────────────────────────────────────────
function TeachBackCard(props: Props) {
  const { overlay, lessonId, onComplete } = props;
  const ctx = pickCtx(props);
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
    }, ctx);
    setPhase("result");
  }

  return (
    <div className="oc-card" style={cardStyle(tok.color)}>
      <div className="oc-label">{tok.label}</div>
      <p className="oc-prompt">{data.prompt ?? "Explain this concept in your own words."}</p>
      {phase === "write" && (
        <>
          <textarea
            className="oc-textarea"
            placeholder="Explain as if teaching a friend…"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            rows={4}
          />
          <button className="oc-btn" onClick={submit} disabled={!value.trim()}>
            Submit for Evaluation →
          </button>
        </>
      )}
      {phase === "evaluating" && <p className="oc-evaluating">Evaluating signal…</p>}
      {phase === "result" && (
        <>
          <div className="oc-stars">
            {[1,2,3,4,5].map((n) => (
              <span key={n} className={n <= score ? "oc-star oc-star-on" : "oc-star"}>★</span>
            ))}
          </div>
          {feedback && <p className="oc-feedback">{feedback}</p>}
          <button className="oc-btn" onClick={onComplete}>Continue →</button>
        </>
      )}
    </div>
  );
}

// ── QUESTION SPRINT ────────────────────────────────────────────────────────
function QuestionSprintCard(props: Props) {
  const { overlay, lessonId, onComplete } = props;
  const ctx = pickCtx(props);
  const data = overlay.data as {
    questions?: Array<{
      question: string;
      options: string[];
      correct: number;
      explanation: string;
      gapType?: string;
      wrongPattern?: string;
    }>;
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

    // Fire ONE event per question so wrong-answer gap_type + correct flag reach
    // student_concept_mastery instead of being collapsed into the aggregate.
    const currentQ = questions[idx];
    if (currentQ) {
      const chosenIsCorrect = optIdx === currentQ.correct;
      const chosenLabel = currentQ.options?.[optIdx] ?? String(optIdx);
      logResponse({
        lessonId,
        overlayId: overlay.id,
        overlayType: "QUESTION_SPRINT",
        response: chosenLabel,
        correct: chosenIsCorrect,
        gapType: currentQ.gapType?.trim() ? currentQ.gapType : null,
        questionIdx: idx,
      }, ctx);
    }
  }

  function advance() {
    setShowExplanation(false);
    if (idx + 1 < questions.length) {
      setIdx(idx + 1);
    } else {
      const correctCount = answers.filter((a, i) => a === questions[i]?.correct).length;
      // Final sprint summary — same overlay_type as per-question rows but
      // distinguishable by `questionIdx: null` + non-null score. V1 bridge
      // routes this to event_type='overlay_submitted'.
      logResponse({
        lessonId,
        overlayId: overlay.id,
        overlayType: "QUESTION_SPRINT",
        response: JSON.stringify(answers),
        score: correctCount,
        questionIdx: null,
      }, ctx);
      setDone(true);
    }
  }

  if (questions.length === 0) {
    return (
      <div className="oc-card" style={cardStyle(tok.color)}>
        <div className="oc-label">{tok.label}</div>
        <p className="oc-prompt">No questions available.</p>
        <button className="oc-btn" onClick={onComplete}>Continue →</button>
      </div>
    );
  }

  if (done) {
    const correctCount = answers.filter((a, i) => a === questions[i]?.correct).length;
    return (
      <div className="oc-card" style={cardStyle(tok.color)}>
        <div className="oc-label">{tok.label}</div>
        <p className="oc-score-title">{correctCount}/{questions.length} correct</p>
        <p className="oc-feedback">
          {correctCount === questions.length
            ? "Mission accomplished — perfect signal."
            : correctCount >= questions.length / 2
            ? "Solid trajectory — review what got missed."
            : "Recalibrate — review this section before continuing."}
        </p>
        <button className="oc-btn" onClick={onComplete}>Continue →</button>
      </div>
    );
  }

  return (
    <div className="oc-card" style={cardStyle(tok.color)}>
      <div className="oc-label">{tok.label} · {idx + 1}/{questions.length}</div>
      <p className="oc-prompt">{q.question}</p>
      <div className="oc-options">
        {q.options.map((opt, i) => {
          let cls = "oc-option";
          if (answered) {
            if (i === q.correct)              cls += " oc-option-correct";
            else if (i === answers[idx])      cls += " oc-option-wrong";
            else                              cls += " oc-option-muted";
          }
          return (
            <button
              key={i}
              className={cls}
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
          <p className={`oc-result-badge ${isCorrect ? "oc-result-good" : "oc-result-miss"}`}>
            {isCorrect ? "✓ Correct" : "✕ Incorrect"}
          </p>
          <p className="oc-feedback">{q.explanation}</p>
          <button className="oc-btn" onClick={advance}>
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
    <div className="oc-card" style={cardStyle(tok.color)}>
      <div className="oc-label">{tok.label}</div>
      {data.gapType && (
        <div className="oc-gap-badge">{data.gapType}</div>
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
                  style={{ width: `${Math.min(100, c.weight)}%` }}
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
              <span className={p.mastered ? "oc-prereq-mark on" : "oc-prereq-mark"}>
                {p.mastered ? "✓" : "○"}
              </span>
              <span className={p.mastered ? "oc-prereq-text on" : "oc-prereq-text"}>{p.label}</span>
            </div>
          ))}
        </div>
      )}
      <button className="oc-btn" onClick={onComplete}>Got it →</button>
    </div>
  );
}

// ── CONFIDENCE CHECK ───────────────────────────────────────────────────────
function ConfidenceCheckCard(props: Props) {
  const { overlay, lessonId, onComplete } = props;
  const ctx = pickCtx(props);
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
    }, ctx);
    setDone(true);
    setTimeout(onComplete, 600);
  }

  return (
    <div className="oc-card" style={cardStyle(tok.color)}>
      <div className="oc-label">{tok.label}</div>

      {data.identityBelief && (
        <div className="oc-cc-belief-wrap">
          <span className="oc-cc-belief-tag">What you think</span>
          <p className="oc-cc-belief">{data.identityBelief}</p>
        </div>
      )}

      {data.evidenceFromPattern && (
        <div className="oc-cc-evidence">
          <span className="oc-cc-evidence-tag">What the data says</span>
          <p className="oc-cc-evidence-text">{data.evidenceFromPattern}</p>
        </div>
      )}

      {data.reframe && <p className="oc-cc-reframe">{data.reframe}</p>}

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
          />
          {data.actionBridge && <p className="oc-cc-bridge">{data.actionBridge}</p>}
          <button className="oc-btn" onClick={submit}>Got it →</button>
        </>
      ) : (
        <p className="oc-saved">Saved ✓</p>
      )}
    </div>
  );
}

// ── NEXT MOVE ──────────────────────────────────────────────────────────────
function NextMoveCard(props: Props) {
  const { overlay, lessonId, onComplete } = props;
  const ctx = pickCtx(props);
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
    }, ctx);
    onComplete();
  }

  return (
    <div className="oc-card" style={cardStyle(tok.color)}>
      <div className="oc-label">{tok.label}</div>

      {data.predictionHeadline && <p className="oc-nm-headline">{data.predictionHeadline}</p>}

      {data.predictedFailure && (
        <div className="oc-nm-failure">
          <span className="oc-nm-failure-tag">Where it breaks:</span>
          <p className="oc-nm-failure-text">{data.predictedFailure}</p>
        </div>
      )}

      {data.whyYouWillBreak && (
        <div className="oc-nm-why">
          <p className="oc-nm-why-text">{data.whyYouWillBreak}</p>
        </div>
      )}

      {data.preventionDrill && (
        <div className="oc-nm-drill">
          <span className="oc-nm-drill-tag">Do this now:</span>
          <p className="oc-nm-drill-text">{data.preventionDrill}</p>
        </div>
      )}

      {data.memoryTag && (
        <div className="oc-nm-tag-wrap">
          <span className="oc-nm-tag-label">Save this:</span>
          <div className="oc-nm-tag">{data.memoryTag}</div>
        </div>
      )}

      <button className="oc-btn" onClick={done}>Noted →</button>
    </div>
  );
}

// ── TAP QUICK ──────────────────────────────────────────────────────────────
// ADHD-friendly 5-second pulse. Single tap. No typing. Always-on skip + hint.
interface TapQuickOption {
  label: string;
  correct: boolean;
  feedback: string;
}
interface TapQuickFollowup {
  question: string;
  options: TapQuickOption[];
}
interface TapQuickData {
  question?: string;
  options?: TapQuickOption[];
  rule?: string;
  hint?: string;
  kind?: "predict" | "trap" | "connect";
  /** Same-concept retry shown only when the student gets the original wrong. */
  followup?: TapQuickFollowup;
}

// Variable reward: 60% small / 30% medium / 10% identity.
type RewardTier = "small" | "medium" | "identity";
function pickReward(): RewardTier {
  const r = Math.random();
  if (r < 0.10) return "identity";
  if (r < 0.40) return "medium";
  return "small";
}
const REWARD_MICRO_LINES = [
  "⚡ That's the AP 5-scorer move.",
  "⚡ You reasoned forward — not just recognized.",
  "⚡ Lock that pattern in.",
  "⚡ Same instinct will help on the FRQ.",
];
const REWARD_IDENTITY_LINES = [
  "🔓 You unlocked a thinking pattern most students never build.",
  "🔓 This is what AP 5-scorers do without thinking.",
  "🔓 You just used real biochemist reasoning.",
];

// Confetti particle burst (CSS-only) — fires on correct answer in popup mode.
function ConfettiBurst({ color }: { color: string }) {
  const particles = Array.from({ length: 14 });
  return (
    <div className="oc-confetti" aria-hidden>
      {particles.map((_, i) => {
        const angle = (i / particles.length) * Math.PI * 2;
        const dist = 60 + Math.random() * 50;
        const dx = Math.cos(angle) * dist;
        const dy = Math.sin(angle) * dist - 20;
        const delay = Math.random() * 0.05;
        const hue = i % 3 === 0 ? color : i % 3 === 1 ? "#F4C95D" : "#A99CFF";
        return (
          <span
            key={i}
            className="oc-confetti-bit"
            style={{
              ["--dx" as string]: `${dx}px`,
              ["--dy" as string]: `${dy}px`,
              ["--delay" as string]: `${delay}s`,
              background: hue,
            }}
          />
        );
      })}
    </div>
  );
}

function TapQuickCard(props: Props) {
  const { overlay, lessonId, onComplete, popupMode, tapStreak = 0, onTapResult } = props;
  const ctx = pickCtx(props);
  const data = overlay.data as TapQuickData;
  const options = data.options ?? [];
  const hint = data.hint?.trim();

  const [mode, setMode] = useState<"original" | "followup">("original");
  const [pickedIdx, setPickedIdx] = useState<number | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showSlowAck, setShowSlowAck] = useState(false);
  // Stage-1 telemetry: capture the moment the overlay appeared so we can
  // attach an answer-latency to every tap. shownAtRef resets when the card
  // remounts (each overlay item creates a new instance) and on mode flip
  // into the followup retry.
  const shownAtRef = useRef<number>(Date.now());
  // Variable reward baseline (60/30/10) + streak-boosted ceiling. Streak ≥ 3
  // boosts the tier by one (small→medium, medium→identity). Combines momentum
  // (Duolingo) with surprise (Skinner variable schedule).
  const [baseReward] = useState<RewardTier>(() => pickReward());
  const incomingStreak = tapStreak; // streak as of THIS tap (before increment)
  const newStreak = incomingStreak + 1; // resulting streak if this tap is correct
  const boostedReward: RewardTier =
    newStreak >= 5
      ? "identity"
      : newStreak >= 3 && baseReward === "small"
        ? "medium"
        : newStreak >= 3 && baseReward === "medium"
          ? "identity"
          : baseReward;
  const [microLine] = useState(() => REWARD_MICRO_LINES[Math.floor(Math.random() * REWARD_MICRO_LINES.length)]);
  const [identityLine] = useState(() => REWARD_IDENTITY_LINES[Math.floor(Math.random() * REWARD_IDENTITY_LINES.length)]);

  const tok = TOKENS.TAP_QUICK;
  // Active question / options depend on mode. Followup is a same-concept retry
  // shown only after the student got the original wrong. Streak (and reward
  // tier) is decided by the ORIGINAL tap only — followup is pure practice.
  const followupAvailable = !!data.followup?.question && (data.followup.options?.length ?? 0) >= 2;
  const activeQuestion = mode === "followup"
    ? data.followup?.question ?? data.question
    : data.question;
  const activeOptions: TapQuickOption[] = mode === "followup"
    ? data.followup?.options ?? []
    : options;
  const picked = pickedIdx === null ? null : activeOptions[pickedIdx];
  const isCorrect = picked?.correct === true;

  // Tier state — pure derivations from streak. NO new UI components, only
  // text changes on existing pill / identity card.
  const currentTier = getTier(incomingStreak);
  const nextTier = getNextTier(incomingStreak);
  const newTierAfterTap = isCorrect ? getTier(newStreak) : currentTier;
  const crossedTier = isCorrect ? didCrossTier(incomingStreak, newStreak) : null;

  // Mastery framing — derive a 3-5 word concept name from the rule if it
  // exists, else fall back to "Locked in". Frames correctness as progression,
  // not testing — Khan Academy mastery-system pattern.
  const conceptName = (() => {
    if (!data.rule) return "Locked in";
    // Take everything up to the first period, em-dash, or colon
    const first = data.rule.split(/[.—–:]/)[0].trim();
    return first.length > 0 && first.length < 60 ? first : "Locked in";
  })();

  // Auto-advance on correct in popup mode — dopamine pulse is meant to be
  // fast. Wrong answers still wait for the explicit "Continue →" so the
  // student processes the misconception. Tier-cross gets the longest dwell
  // because it carries the most narrative the student needs to absorb.
  // Followup correct is recovery — short dwell, no celebration.
  useEffect(() => {
    if (!popupMode || pickedIdx === null || !isCorrect) return;
    const dwell = mode === "followup"
      ? 1300
      : crossedTier
        ? 3200
        : boostedReward === "identity"
          ? 2400
          : boostedReward === "medium"
            ? 1900
            : 1500;
    const t = setTimeout(onComplete, dwell);
    return () => clearTimeout(t);
  }, [popupMode, pickedIdx, isCorrect, mode, boostedReward, crossedTier, onComplete]);

  // ADHD-friendly slow-think ack: 10s with no tap → show a soft "Take your
  // time" microcopy. Defuses the "I should answer fast" spiral that makes
  // ADHD students disengage rather than think.
  useEffect(() => {
    if (pickedIdx !== null) return;
    const t = setTimeout(() => setShowSlowAck(true), 10000);
    return () => clearTimeout(t);
  }, [pickedIdx]);

  // Stage-1 telemetry: emit overlay_shown once per render of original or
  // followup view. Latency is measured from this moment until the tap.
  useEffect(() => {
    shownAtRef.current = Date.now();
    emitTelemetry("overlay_shown", {
      overlay_id: overlay.id,
      overlay_type: "TAP_QUICK",
      kind: data.kind ?? null,
      mode,
      popup_mode: popupMode === true,
    });
  }, [overlay.id, mode, popupMode, data.kind]);

  function tap(i: number) {
    if (pickedIdx !== null) return;
    setPickedIdx(i);
    const chosen = activeOptions[i];
    const correct = chosen?.correct === true;
    logResponse({
      lessonId,
      overlayId: overlay.id,
      overlayType: "TAP_QUICK",
      response: chosen?.label ?? String(i),
      correct,
      gapType: data.kind ?? null,
      questionIdx: mode === "followup" ? 1 : 0,
    }, ctx);
    // Only the ORIGINAL tap moves the streak. Followup is pure practice — the
    // student is recovering from the miss; the assessment signal already fired.
    if (mode === "original") {
      onTapResult?.(correct);
    }
    // Stage-1 telemetry: per-tap behavioral row carrying latency.
    emitTelemetry("overlay_answered", {
      overlay_id: overlay.id,
      overlay_type: "TAP_QUICK",
      kind: data.kind ?? null,
      mode,
      correct,
      latency_ms: Date.now() - shownAtRef.current,
      hint_used: showHint,
      slow_ack_shown: showSlowAck,
    });
    if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
      try { navigator.vibrate(correct ? [12, 40, 18] : 22); } catch { /* ignore */ }
    }
  }

  function startFollowup() {
    setMode("followup");
    setPickedIdx(null);
    setShowSlowAck(false);
    setShowHint(false);
  }

  function skip() {
    logResponse({
      lessonId,
      overlayId: overlay.id,
      overlayType: "TAP_QUICK",
      response: "(skipped)",
      correct: false,
    }, ctx);
    emitTelemetry("overlay_skipped", {
      overlay_id: overlay.id,
      overlay_type: "TAP_QUICK",
      kind: data.kind ?? null,
      mode,
      latency_ms: Date.now() - shownAtRef.current,
    });
    onComplete();
  }

  const cardClasses = ["oc-card", "oc-tap-card", popupMode ? "oc-tap-popup" : ""].filter(Boolean).join(" ");

  return (
    <div className={cardClasses} style={cardStyle(tok.color)}>
      {isCorrect && popupMode && <ConfettiBurst color={tok.color} />}
      <div className="oc-tap-header">
        <div className="oc-label">{tok.label}</div>
        {incomingStreak > 0 && pickedIdx === null && (
          <div className="oc-streak-stack">
            <div className="oc-streak-pill" title={`${incomingStreak} correct in a row · ${currentTier.label}`}>
              🔥 {incomingStreak}
              {incomingStreak >= 1 && (
                <span className="oc-streak-pill-tier"> · {currentTier.label}</span>
              )}
            </div>
            {nextTier && incomingStreak >= nextTier.minStreak - 2 && (
              <div className="oc-streak-next">
                ↓ {nextTier.label} at {nextTier.minStreak}
              </div>
            )}
          </div>
        )}
        {isCorrect && (
          <div className="oc-streak-stack">
            <div className="oc-streak-pill oc-streak-pill-live">
              🔥 {newStreak}
              {newStreak >= 1 && (
                <span className="oc-streak-pill-tier"> · {newTierAfterTap.label}</span>
              )}
            </div>
          </div>
        )}
      </div>
      {mode === "followup" && (
        <div className="oc-tap-retry-badge" aria-live="polite">↻ RETRY · same idea, new angle</div>
      )}
      <p className="oc-tap-question">{activeQuestion ?? "Quick — what just happened?"}</p>

      {pickedIdx === null && (
        <>
          <div className="oc-tap-options">
            {activeOptions.map((opt, i) => (
              <button
                key={i}
                className="oc-tap-option"
                onClick={() => tap(i)}
              >
                {opt.label}
              </button>
            ))}
          </div>
          {showHint && hint && (
            <p className="oc-tap-hint">💡 {hint}</p>
          )}
          {showSlowAck && !showHint && (
            <p className="oc-tap-slow-ack">🌱 No rush — take your time.</p>
          )}
          <div className="oc-tap-footer">
            {hint && !showHint && (
              <button
                className="oc-tap-link"
                onClick={() => {
                  setShowHint(true);
                  emitTelemetry("overlay_hint_used", {
                    overlay_id: overlay.id,
                    overlay_type: "TAP_QUICK",
                    kind: data.kind ?? null,
                    mode,
                    latency_ms: Date.now() - shownAtRef.current,
                  });
                }}
              >
                Hint
              </button>
            )}
            <button className="oc-tap-link oc-tap-skip" onClick={skip}>
              Not sure →
            </button>
          </div>
        </>
      )}

      {pickedIdx !== null && picked && (
        <>
          <div className={`oc-result-badge ${isCorrect ? "oc-result-good" : "oc-result-miss"}`}>
            {isCorrect ? `🔓 ${conceptName}` : "✕ Not quite"}
          </div>
          <p className="oc-feedback">{picked.feedback}</p>

          {/* Tier-cross supersedes the variable reward — bigger moment.
              Only fires on the ORIGINAL tap; followup is recovery, not celebration. */}
          {isCorrect && mode === "original" && crossedTier && (
            <div className="oc-reward-identity oc-reward-tier">
              <p className="oc-tier-headline">🔓 {crossedTier.unlockHeadline}</p>
              <p className="oc-reward-identity-text">{crossedTier.unlockBody}</p>
              {crossedTier.apFraming && (
                <p className="oc-tier-ap">{crossedTier.apFraming}</p>
              )}
            </div>
          )}
          {/* Streak-boosted variable reward — only on original, no tier crossed. */}
          {isCorrect && mode === "original" && !crossedTier && boostedReward === "medium" && (
            <p className="oc-reward-micro">{microLine}</p>
          )}
          {isCorrect && mode === "original" && !crossedTier && boostedReward === "identity" && (
            <div className="oc-reward-identity">
              <p className="oc-reward-identity-text">{identityLine}</p>
            </div>
          )}

          {/* Rule lock-in — every correct answer if rule exists */}
          {isCorrect && data.rule && (
            <div className="oc-tap-rule">
              <span className="oc-tap-rule-tag">🔑 Rule</span>
              <p className="oc-tap-rule-text">{data.rule}</p>
            </div>
          )}

          {/* Wrong on ORIGINAL + a followup exists → offer a same-concept retry
              as the primary action. Continue stays available as a secondary
              link. After followup (any outcome) we only show Continue. */}
          {mode === "original" && !isCorrect && followupAvailable && (
            <div className="oc-tap-retry-actions">
              <button className="oc-btn oc-btn-retry" onClick={startFollowup}>
                ⚡ Try a similar one →
              </button>
              <button className="oc-tap-link oc-tap-skip" onClick={onComplete}>
                Continue without retry
              </button>
            </div>
          )}
          {/* Continue button — shown when we don't already have the retry CTA
              and we're not auto-advancing on a correct popup. */}
          {!(popupMode && isCorrect) && !(mode === "original" && !isCorrect && followupAvailable) && (
            <button className="oc-btn" onClick={onComplete}>Continue →</button>
          )}
        </>
      )}

      <style>{`
        .oc-tap-card { gap: 0.75rem; }
        .oc-tap-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.6rem;
        }
        .oc-streak-stack {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.2rem;
          flex-shrink: 0;
        }
        .oc-streak-pill {
          font-family: ui-monospace, 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: #FFB347;
          background: rgba(255, 179, 71, 0.10);
          border: 1px solid rgba(255, 179, 71, 0.32);
          border-radius: 9999px;
          padding: 0.15rem 0.6rem;
          flex-shrink: 0;
          animation: oc-streak-pop 0.36s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .oc-streak-pill-tier {
          font-weight: 600;
          opacity: 0.85;
          font-style: italic;
        }
        .oc-streak-pill-live {
          color: #FFD073;
          background: rgba(255, 179, 71, 0.18);
          border-color: rgba(255, 179, 71, 0.55);
          box-shadow: 0 0 14px rgba(255, 179, 71, 0.4);
        }
        .oc-streak-next {
          font-family: ui-monospace, 'JetBrains Mono', monospace;
          font-size: 0.58rem;
          font-weight: 600;
          letter-spacing: 0.08em;
          color: rgba(255, 179, 71, 0.55);
          text-transform: uppercase;
        }
        @keyframes oc-streak-pop {
          0%   { opacity: 0; transform: scale(0.6); }
          70%  { opacity: 1; transform: scale(1.18); }
          100% { opacity: 1; transform: scale(1); }
        }

        /* Tier-cross identity card — re-uses .oc-reward-identity base */
        .oc-reward-tier {
          background:
            radial-gradient(ellipse 100% 60% at 50% 0%, color-mix(in srgb, var(--tok) 32%, transparent) 0%, transparent 70%),
            color-mix(in srgb, var(--tok) 12%, transparent);
          border-color: color-mix(in srgb, var(--tok) 55%, transparent);
          box-shadow: 0 0 36px color-mix(in srgb, var(--tok) 45%, transparent);
        }
        .oc-tier-headline {
          font-family: ui-monospace, 'JetBrains Mono', monospace;
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: color-mix(in srgb, var(--tok) 80%, white);
          margin: 0 0 0.3rem;
          text-shadow: 0 0 16px color-mix(in srgb, var(--tok) 60%, transparent);
        }
        .oc-tier-ap {
          font-size: 0.74rem;
          color: rgba(255, 255, 255, 0.55);
          line-height: 1.45;
          margin: 0.35rem 0 0;
          font-style: italic;
        }

        /* ─────────── Popup mode (TAP_QUICK as dopamine pulse) ─────────── */
        .oc-tap-popup {
          position: relative;
          padding: 1.5rem 1.4rem 1.3rem;
          border-radius: 1.25rem;
          border-width: 1.5px;
          background:
            radial-gradient(ellipse 100% 80% at 50% -20%,
              color-mix(in srgb, var(--tok) 28%, transparent) 0%,
              transparent 60%),
            linear-gradient(180deg, #0d1a17 0%, #06120e 100%);
          box-shadow:
            0 0 0 1px color-mix(in srgb, var(--tok) 30%, transparent),
            0 0 36px color-mix(in srgb, var(--tok) 36%, transparent),
            0 18px 50px rgba(0, 0, 0, 0.6);
          animation: oc-spring-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both,
                     oc-pop-glow 2.2s ease-in-out 0.5s infinite;
        }
        @keyframes oc-spring-in {
          0%   { opacity: 0; transform: translateY(60px) scale(0.7); }
          60%  { opacity: 1; transform: translateY(-8px) scale(1.04); }
          100% { opacity: 1; transform: translateY(0)    scale(1); }
        }
        @keyframes oc-pop-glow {
          0%, 100% { box-shadow:
            0 0 0 1px color-mix(in srgb, var(--tok) 30%, transparent),
            0 0 36px color-mix(in srgb, var(--tok) 36%, transparent),
            0 18px 50px rgba(0, 0, 0, 0.6); }
          50%      { box-shadow:
            0 0 0 1px color-mix(in srgb, var(--tok) 55%, transparent),
            0 0 56px color-mix(in srgb, var(--tok) 60%, transparent),
            0 18px 60px rgba(0, 0, 0, 0.65); }
        }
        .oc-tap-popup .oc-tap-question { font-size: 1.05rem; }
        .oc-tap-popup .oc-tap-option { padding: 0.85rem 1rem; font-size: 0.92rem; }
        .oc-tap-popup .oc-tap-option:active {
          transform: scale(0.97);
          background: color-mix(in srgb, var(--tok) 18%, transparent);
        }

        /* ─────────── Confetti burst on correct ─────────── */
        .oc-confetti {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: visible;
          z-index: 10;
        }
        .oc-confetti-bit {
          position: absolute;
          top: 38%;
          left: 50%;
          width: 8px;
          height: 8px;
          border-radius: 2px;
          opacity: 0;
          animation: oc-confetti-fly 0.95s cubic-bezier(0.18, 0.8, 0.34, 1) forwards;
          animation-delay: var(--delay, 0s);
        }
        @keyframes oc-confetti-fly {
          0%   { opacity: 1; transform: translate(0, 0) rotate(0deg) scale(1); }
          80%  { opacity: 1; }
          100% { opacity: 0;
                 transform: translate(var(--dx, 50px), var(--dy, -40px))
                            rotate(540deg) scale(0.4); }
        }

        .oc-tap-question {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 1.15rem;
          font-weight: 600;
          color: #f3f3fb;
          line-height: 1.4;
          margin: 0;
          letter-spacing: 0.005em;
        }
        .oc-tap-options { display: flex; flex-direction: column; gap: 0.5rem; }
        .oc-tap-option {
          padding: 0.95rem 1.1rem;
          min-height: 2.85rem;  /* Apple HIG 44px+ tap target — ADHD/mobile friendly */
          background: rgba(0, 255, 178, 0.04);
          border: 1px solid color-mix(in srgb, var(--tok) 28%, transparent);
          border-radius: 0.75rem;
          color: #d8d9e6;
          font-size: 0.95rem;
          font-family: inherit;
          font-weight: 500;
          cursor: pointer;
          text-align: left;
          line-height: 1.4;
          transition: background 0.12s, border-color 0.12s, color 0.12s, transform 0.08s, box-shadow 0.2s;
        }
        .oc-tap-option:hover {
          background: color-mix(in srgb, var(--tok) 12%, transparent);
          border-color: color-mix(in srgb, var(--tok) 65%, transparent);
          color: #fff;
          box-shadow: 0 0 18px color-mix(in srgb, var(--tok) 30%, transparent);
          transform: translateY(-1px);
        }
        .oc-tap-option:active { transform: scale(0.97); }
        @media (max-width: 640px) {
          .oc-tap-option { padding: 1.1rem 1.15rem; min-height: 3.1rem; font-size: 1rem; }
        }

        .oc-tap-hint {
          font-size: 0.82rem;
          color: color-mix(in srgb, var(--tok) 75%, white);
          line-height: 1.5;
          margin: 0.25rem 0 0;
          padding: 0.5rem 0.8rem;
          background: color-mix(in srgb, var(--tok) 8%, transparent);
          border-radius: 0.5rem;
          border-left: 2px solid var(--tok);
        }
        .oc-tap-slow-ack {
          font-size: 0.78rem;
          color: rgba(255, 255, 255, 0.6);
          line-height: 1.45;
          margin: 0.1rem 0 0;
          padding: 0.4rem 0.7rem;
          background: rgba(255, 255, 255, 0.025);
          border-radius: 0.5rem;
          animation: oc-slow-ack-in 0.5s ease both;
        }
        /* Retry mode — purple/violet accent to signal "different lane". */
        .oc-tap-retry-badge {
          font-family: ui-monospace, 'JetBrains Mono', monospace;
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #B4A3FF;
          background: rgba(159, 151, 237, 0.12);
          border: 1px solid rgba(159, 151, 237, 0.32);
          border-radius: 9999px;
          padding: 0.15rem 0.55rem;
          align-self: flex-start;
          animation: oc-slow-ack-in 0.35s ease both;
        }
        .oc-tap-retry-actions {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.4rem;
        }
        .oc-btn-retry {
          color: #B4A3FF;
          border-color: rgba(159, 151, 237, 0.55);
          background: rgba(159, 151, 237, 0.10);
        }
        .oc-btn-retry:hover:not(:disabled) {
          color: #fff;
          background: rgba(159, 151, 237, 0.25);
          box-shadow:
            0 0 0 1px #B4A3FF,
            0 0 20px rgba(159, 151, 237, 0.55);
        }
        @keyframes oc-slow-ack-in {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .oc-tap-footer {
          display: flex;
          gap: 0.85rem;
          justify-content: flex-end;
          margin-top: 0.2rem;
        }
        .oc-tap-link {
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.4);
          font-family: ui-monospace, 'JetBrains Mono', monospace;
          font-size: 0.72rem;
          letter-spacing: 0.06em;
          cursor: pointer;
          padding: 0.3rem 0.55rem;
          border-radius: 0.4rem;
          transition: color 0.12s, background 0.12s;
        }
        .oc-tap-link:hover { color: #fff; background: rgba(255, 255, 255, 0.05); }
        .oc-tap-skip { font-weight: 600; }

        .oc-reward-micro {
          font-family: ui-monospace, monospace;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: color-mix(in srgb, var(--tok) 78%, white);
          margin: 0;
          padding: 0.45rem 0.75rem;
          background: color-mix(in srgb, var(--tok) 10%, transparent);
          border-radius: 0.5rem;
          border-left: 2px solid var(--tok);
          animation: oc-reward-in 0.4s ease both;
        }
        .oc-reward-identity {
          padding: 0.8rem 1rem;
          background:
            radial-gradient(ellipse 100% 60% at 50% 0%, color-mix(in srgb, var(--tok) 22%, transparent) 0%, transparent 70%),
            color-mix(in srgb, var(--tok) 8%, transparent);
          border: 1px solid color-mix(in srgb, var(--tok) 40%, transparent);
          border-radius: 0.8rem;
          box-shadow: 0 0 26px color-mix(in srgb, var(--tok) 32%, transparent);
          animation: oc-reward-in 0.5s ease both;
        }
        .oc-reward-identity-text {
          font-family: 'Cormorant Garamond', 'Georgia', serif;
          font-size: 1.05rem;
          font-style: italic;
          font-weight: 600;
          color: #fff;
          line-height: 1.45;
          margin: 0;
          text-shadow: 0 0 14px color-mix(in srgb, var(--tok) 50%, transparent);
        }
        @keyframes oc-reward-in {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .oc-tap-rule {
          background: rgba(255, 255, 255, 0.025);
          border: 1px solid color-mix(in srgb, var(--tok) 22%, transparent);
          border-radius: 0.6rem;
          padding: 0.6rem 0.85rem;
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .oc-tap-rule-tag {
          font-family: ui-monospace, monospace;
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: color-mix(in srgb, var(--tok) 70%, white);
        }
        .oc-tap-rule-text {
          font-size: 0.84rem;
          color: #d8d9e6;
          line-height: 1.5;
          margin: 0;
        }
      `}</style>
    </div>
  );
}

// ── Shell ──────────────────────────────────────────────────────────────────
export default function OverlayCard(props: Props) {
  const { overlay, onComplete } = props;
  const type = (overlay.type ?? "").toUpperCase();

  let card: React.ReactNode;
  if (type === "SPARK")           card = <SparkCard {...props} />;
  else if (type === "GAP_CRUNCH") card = <GapCrunchCard {...props} />;
  else if (type === "TEACH_BACK") card = <TeachBackCard {...props} />;
  else if (type === "QUESTION_SPRINT") card = <QuestionSprintCard {...props} />;
  else if (type === "ANALYZER")         card = <AnalyzerCard overlay={overlay} onComplete={onComplete} />;
  else if (type === "CONFIDENCE_CHECK") card = <ConfidenceCheckCard {...props} />;
  else if (type === "NEXT_MOVE")        card = <NextMoveCard {...props} />;
  else if (type === "TAP_QUICK")        card = <TapQuickCard {...props} />;
  else card = (
    <div className="oc-card" style={cardStyle("#9F97ED")}>
      <p className="oc-prompt">Unknown overlay type: {type}</p>
      <button className="oc-btn" onClick={onComplete}>Continue →</button>
    </div>
  );

  return (
    <>
      {card}
      <style>{`
        /* ─────────── Cosmic mission-control card ─────────── */
        .oc-card {
          --tok: #A99CFF;
          position: relative;
          overflow: hidden;
          width: 100%;
          max-width: 32rem;
          padding: 2rem 1.75rem;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          font-family: 'Inter', system-ui, sans-serif;
          color: #e9eaf5;
          border-radius: 1.4rem;
          border: 1px solid color-mix(in srgb, var(--tok) 28%, transparent);
          background:
            radial-gradient(ellipse 120% 80% at 50% -10%,
              color-mix(in srgb, var(--tok) 14%, transparent) 0%,
              transparent 55%),
            radial-gradient(circle at 85% 110%,
              color-mix(in srgb, var(--tok) 9%, transparent) 0%,
              transparent 50%),
            linear-gradient(180deg, #0a0e1a 0%, #050610 60%, #03030a 100%);
          box-shadow:
            inset 0 0 0 1px color-mix(in srgb, var(--tok) 12%, transparent),
            0 0 32px color-mix(in srgb, var(--tok) 14%, transparent),
            0 24px 60px rgba(0,0,0,0.65);
          animation: oc-enter 0.55s cubic-bezier(0.2, 0.8, 0.25, 1) both;
        }

        /* Starfield (twinkling background dots) */
        .oc-card::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background-image:
            radial-gradient(1.5px 1.5px at 12% 18%, rgba(255,255,255,0.85), transparent 100%),
            radial-gradient(1px 1px at 78% 24%, rgba(255,255,255,0.55), transparent 100%),
            radial-gradient(1.2px 1.2px at 32% 72%, rgba(255,255,255,0.7),  transparent 100%),
            radial-gradient(0.8px 0.8px at 64% 88%, rgba(255,255,255,0.5),  transparent 100%),
            radial-gradient(1px 1px at 92% 56%, rgba(255,255,255,0.65), transparent 100%),
            radial-gradient(0.8px 0.8px at 18% 92%, rgba(255,255,255,0.45), transparent 100%),
            radial-gradient(1px 1px at 50% 8%,  color-mix(in srgb, var(--tok) 70%, white), transparent 100%),
            radial-gradient(0.9px 0.9px at 8% 52%, rgba(255,255,255,0.5), transparent 100%),
            radial-gradient(0.7px 0.7px at 44% 38%, rgba(255,255,255,0.4), transparent 100%);
          opacity: 0.7;
          animation: oc-twinkle 4.5s ease-in-out infinite;
          z-index: 0;
        }
        /* A second pseudo-element draws a faint scan-line / horizon glow */
        .oc-card::after {
          content: "";
          position: absolute;
          left: 0; right: 0; top: 0;
          height: 1px;
          pointer-events: none;
          background: linear-gradient(90deg,
            transparent 0%,
            color-mix(in srgb, var(--tok) 70%, transparent) 50%,
            transparent 100%);
          opacity: 0.6;
          z-index: 1;
        }
        .oc-card > * { position: relative; z-index: 2; }

        @keyframes oc-enter {
          from { opacity: 0; transform: translateY(10px) scale(0.985); }
          to   { opacity: 1; transform: translateY(0)    scale(1); }
        }
        @keyframes oc-twinkle {
          0%, 100% { opacity: 0.55; }
          50%      { opacity: 0.95; }
        }

        /* ─────────── Label (mission-control header) ─────────── */
        .oc-label {
          font-family: ui-monospace, 'JetBrains Mono', 'SFMono-Regular', monospace;
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--tok);
          text-shadow: 0 0 14px color-mix(in srgb, var(--tok) 65%, transparent);
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          align-self: flex-start;
        }
        .oc-label::before {
          content: "";
          width: 7px; height: 7px;
          border-radius: 50%;
          background: var(--tok);
          box-shadow:
            0 0 8px var(--tok),
            0 0 18px color-mix(in srgb, var(--tok) 60%, transparent);
          animation: oc-pulse-dot 1.6s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes oc-pulse-dot {
          0%, 100% { opacity: 0.55; transform: scale(0.85); }
          50%      { opacity: 1;    transform: scale(1.18); }
        }

        /* ─────────── Prompt (italic serif log entry) ─────────── */
        .oc-prompt {
          font-family: 'Cormorant Garamond', 'EB Garamond', 'Georgia', serif;
          font-size: 1.2rem;
          font-style: italic;
          font-weight: 500;
          color: #f3f3fb;
          line-height: 1.45;
          margin: 0;
          letter-spacing: 0.005em;
        }

        /* ─────────── Textarea ─────────── */
        .oc-textarea {
          width: 100%;
          background: rgba(255,255,255,0.025);
          border: 1px solid color-mix(in srgb, var(--tok) 32%, transparent);
          border-radius: 0.75rem;
          padding: 0.75rem 1rem;
          color: #e9eaf5;
          font-size: 0.85rem;
          font-family: inherit;
          resize: vertical;
          outline: none;
          line-height: 1.55;
          box-sizing: border-box;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .oc-textarea:focus {
          border-color: var(--tok);
          box-shadow:
            0 0 0 1px var(--tok),
            0 0 16px color-mix(in srgb, var(--tok) 35%, transparent);
        }

        /* ─────────── Buttons (mission-control outline) ─────────── */
        .oc-btn {
          padding: 0.7rem 1.25rem;
          font-family: ui-monospace, 'JetBrains Mono', monospace;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--tok);
          background: color-mix(in srgb, var(--tok) 6%, transparent);
          border: 1px solid color-mix(in srgb, var(--tok) 50%, transparent);
          border-radius: 0.55rem;
          cursor: pointer;
          transition: background 0.18s, box-shadow 0.22s, color 0.18s, transform 0.18s;
          align-self: flex-start;
        }
        .oc-btn:hover:not(:disabled) {
          color: #fff;
          background: color-mix(in srgb, var(--tok) 22%, transparent);
          box-shadow:
            0 0 0 1px var(--tok),
            0 0 18px color-mix(in srgb, var(--tok) 45%, transparent);
          transform: translateY(-1px);
        }
        .oc-btn:disabled { opacity: 0.35; cursor: default; }

        /* ─────────── Options (multi-choice) ─────────── */
        .oc-options { display: flex; flex-direction: column; gap: 0.5rem; }
        .oc-option {
          padding: 0.7rem 1rem;
          background: rgba(255,255,255,0.02);
          border: 1px solid color-mix(in srgb, var(--tok) 28%, transparent);
          border-radius: 0.65rem;
          color: #d8d9e6;
          font-size: 0.86rem;
          font-family: inherit;
          cursor: pointer;
          text-align: left;
          line-height: 1.45;
          transition: background 0.15s, border-color 0.15s, color 0.15s, box-shadow 0.2s;
        }
        .oc-option:hover:not(:disabled) {
          background: color-mix(in srgb, var(--tok) 8%, transparent);
          border-color: color-mix(in srgb, var(--tok) 60%, transparent);
          box-shadow: 0 0 14px color-mix(in srgb, var(--tok) 25%, transparent);
        }
        .oc-option:disabled { cursor: default; }
        .oc-option-correct {
          border-color: #00FFB2 !important;
          background: rgba(0,255,178,0.1) !important;
          color: #b8ffe1 !important;
          box-shadow: 0 0 18px rgba(0,255,178,0.3);
        }
        .oc-option-wrong {
          border-color: var(--tok) !important;
          background: color-mix(in srgb, var(--tok) 18%, transparent) !important;
          color: #fff !important;
        }
        .oc-option-muted { opacity: 0.45; }

        /* ─────────── Evaluating / saved / feedback ─────────── */
        .oc-evaluating {
          font-family: ui-monospace, monospace;
          font-size: 0.74rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: color-mix(in srgb, var(--tok) 75%, white);
          margin: 0;
          animation: oc-pulse 1.1s ease-in-out infinite;
        }
        @keyframes oc-pulse { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }

        .oc-result-badge {
          display: inline-block;
          padding: 0.32rem 0.75rem;
          border-radius: 9999px;
          font-family: ui-monospace, monospace;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          margin: 0;
          align-self: flex-start;
        }
        .oc-result-good {
          color: #b8ffe1;
          background: rgba(0,255,178,0.1);
          box-shadow: 0 0 14px rgba(0,255,178,0.35);
        }
        .oc-result-miss {
          color: var(--tok);
          background: color-mix(in srgb, var(--tok) 16%, transparent);
          box-shadow: 0 0 14px color-mix(in srgb, var(--tok) 30%, transparent);
        }

        .oc-feedback {
          font-size: 0.85rem;
          color: #b8b9cc;
          line-height: 1.6;
          margin: 0;
        }
        .oc-saved {
          font-family: ui-monospace, monospace;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--tok);
          margin: 0;
          text-shadow: 0 0 12px color-mix(in srgb, var(--tok) 60%, transparent);
        }

        /* ─────────── Stars (teach-back rating) ─────────── */
        .oc-stars { display: flex; gap: 0.3rem; }
        .oc-star {
          font-size: 1.5rem;
          color: rgba(255,255,255,0.12);
          transition: color 0.2s, text-shadow 0.2s;
        }
        .oc-star-on {
          color: var(--tok);
          text-shadow:
            0 0 12px var(--tok),
            0 0 4px color-mix(in srgb, var(--tok) 80%, transparent);
        }

        .oc-score-title {
          font-family: 'Cormorant Garamond', 'Georgia', serif;
          font-size: 1.8rem;
          font-style: italic;
          font-weight: 600;
          color: var(--tok);
          margin: 0;
          text-shadow: 0 0 18px color-mix(in srgb, var(--tok) 50%, transparent);
        }

        /* ─────────── Analyzer ─────────── */
        .oc-gap-badge {
          display: inline-block;
          padding: 0.25rem 0.65rem;
          border-radius: 9999px;
          font-family: ui-monospace, monospace;
          font-size: 0.66rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--tok);
          background: color-mix(in srgb, var(--tok) 14%, transparent);
          align-self: flex-start;
        }
        .oc-concepts { display: flex; flex-direction: column; gap: 0.55rem; }
        .oc-concept-row { display: flex; align-items: center; gap: 0.7rem; }
        .oc-concept-label {
          font-family: ui-monospace, monospace;
          font-size: 0.72rem;
          color: #b8b9cc;
          min-width: 7rem;
          letter-spacing: 0.04em;
        }
        .oc-concept-bar-bg {
          flex: 1;
          height: 4px;
          background: rgba(255,255,255,0.08);
          border-radius: 2px;
          overflow: hidden;
        }
        .oc-concept-bar {
          height: 100%;
          border-radius: 2px;
          background: var(--tok);
          box-shadow: 0 0 10px color-mix(in srgb, var(--tok) 60%, transparent);
          transition: width 0.6s ease;
        }
        .oc-prereqs { display: flex; flex-direction: column; gap: 0.4rem; }
        .oc-prereq-title {
          font-family: ui-monospace, monospace;
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: color-mix(in srgb, var(--tok) 70%, white);
          margin: 0 0 0.25rem;
        }
        .oc-prereq-row { display: flex; align-items: center; gap: 0.55rem; font-size: 0.82rem; }
        .oc-prereq-mark { color: rgba(255,255,255,0.3); font-family: ui-monospace, monospace; }
        .oc-prereq-mark.on { color: #00FFB2; text-shadow: 0 0 8px rgba(0,255,178,0.6); }
        .oc-prereq-text { color: rgba(255,255,255,0.4); }
        .oc-prereq-text.on { color: #d8d9e6; }

        /* ─────────── Confidence Check ─────────── */
        .oc-cc-belief-wrap { display: flex; flex-direction: column; gap: 0.25rem; }
        .oc-cc-belief-tag {
          font-family: ui-monospace, monospace;
          font-size: 0.6rem; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; color: rgba(255,255,255,0.4);
        }
        .oc-cc-belief {
          font-family: 'Cormorant Garamond', 'Georgia', serif;
          font-size: 1rem; font-style: italic; color: rgba(255,255,255,0.4);
          text-decoration: line-through;
          margin: 0; line-height: 1.5;
        }
        .oc-cc-evidence {
          border-left: 2px solid var(--tok);
          padding-left: 0.85rem;
          display: flex; flex-direction: column; gap: 0.25rem;
          box-shadow: -1px 0 12px color-mix(in srgb, var(--tok) 30%, transparent);
        }
        .oc-cc-evidence-tag {
          font-family: ui-monospace, monospace;
          font-size: 0.6rem; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; color: var(--tok);
        }
        .oc-cc-evidence-text { font-size: 0.86rem; color: #b8b9cc; margin: 0; line-height: 1.55; }
        .oc-cc-reframe {
          font-family: 'Cormorant Garamond', 'Georgia', serif;
          font-size: 1.25rem; font-style: italic; font-weight: 600; color: #fff;
          margin: 0; line-height: 1.4;
          text-shadow: 0 0 18px color-mix(in srgb, var(--tok) 35%, transparent);
        }
        .oc-cc-probe {
          background: color-mix(in srgb, var(--tok) 12%, transparent);
          border-radius: 0.7rem;
          padding: 0.8rem 0.95rem;
          border: 1px solid color-mix(in srgb, var(--tok) 25%, transparent);
        }
        .oc-cc-probe-text {
          font-family: 'Cormorant Garamond', 'Georgia', serif;
          font-size: 0.95rem; font-style: italic; color: var(--tok);
          margin: 0; line-height: 1.5;
        }
        .oc-cc-bridge { font-size: 0.78rem; color: rgba(255,255,255,0.5); margin: 0; line-height: 1.5; }

        /* ─────────── Next Move ─────────── */
        .oc-nm-headline {
          font-family: 'Cormorant Garamond', 'Georgia', serif;
          font-size: 1.2rem; font-style: italic; font-weight: 600;
          color: #fff; margin: 0; line-height: 1.4;
        }
        .oc-nm-failure {
          background: rgba(244,201,93,0.1);
          border: 1px solid rgba(244,201,93,0.25);
          border-radius: 0.7rem;
          padding: 0.75rem 0.95rem;
          display: flex; flex-direction: column; gap: 0.25rem;
        }
        .oc-nm-failure-tag {
          font-family: ui-monospace, monospace;
          font-size: 0.6rem; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; color: #F4C95D;
        }
        .oc-nm-failure-text { font-size: 0.85rem; color: #e3c378; margin: 0; line-height: 1.55; }
        .oc-nm-why {
          border-left: 2px solid #FF6B5B;
          padding-left: 0.85rem;
          box-shadow: -1px 0 12px rgba(255,107,91,0.25);
        }
        .oc-nm-why-text { font-size: 0.84rem; color: #b8b9cc; margin: 0; line-height: 1.55; }
        .oc-nm-drill {
          background: rgba(93,202,165,0.1);
          border: 1px solid rgba(93,202,165,0.25);
          border-radius: 0.7rem;
          padding: 0.75rem 0.95rem;
          display: flex; flex-direction: column; gap: 0.25rem;
        }
        .oc-nm-drill-tag {
          font-family: ui-monospace, monospace;
          font-size: 0.6rem; font-weight: 700; letter-spacing: 0.18em;
          text-transform: uppercase; color: #5DCAA5;
        }
        .oc-nm-drill-text { font-size: 0.85rem; color: #5DCAA5; margin: 0; line-height: 1.55; }
        .oc-nm-tag-wrap { display: flex; flex-direction: column; align-items: center; gap: 0.4rem; }
        .oc-nm-tag-label {
          font-family: ui-monospace, monospace;
          font-size: 0.62rem; color: rgba(255,255,255,0.45);
          text-transform: uppercase; letter-spacing: 0.18em; font-weight: 700;
        }
        .oc-nm-tag {
          background: color-mix(in srgb, var(--tok) 18%, transparent);
          color: var(--tok);
          font-family: 'Cormorant Garamond', 'Georgia', serif;
          font-size: 1.2rem;
          font-style: italic;
          font-weight: 600;
          padding: 12px 26px;
          border-radius: 22px;
          text-align: center;
          border: 1px solid color-mix(in srgb, var(--tok) 35%, transparent);
          box-shadow: 0 0 22px color-mix(in srgb, var(--tok) 35%, transparent);
        }

        @media (prefers-reduced-motion: reduce) {
          .oc-card, .oc-card::before, .oc-label::before, .oc-evaluating { animation: none; }
        }
      `}</style>
    </>
  );
}
