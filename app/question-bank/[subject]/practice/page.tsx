"use client";

/**
 * Per-subject practice runner — light-premium, full-bleed.
 *
 * Theme matches /question-bank: white bg, INK/SUB/FAINT ink ramp, GREEN accent,
 * #e8ecf1 borders, soft card shadow, Space Grotesk headings. Loads only the
 * working set (limit=20 + difficulty/type filters server-side) with a skeleton
 * while it streams in. Scoring, answer-checking, attempt-saving, and the
 * thinking-analyzer handoff are UNCHANGED — only presentation was reworked.
 */

import { useEffect, useState, use, useRef } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { getSubjectById } from "@/lib/subjects";
import { authFetch } from "@/lib/client-auth";
import { Suspense } from "react";

const GREEN = "#00b85f";
const INK = "#0b1220";
const SUB = "#5b6675";
const FAINT = "#94a3b8";
const BORDER = "#e8ecf1";
const RED = "#dc2626";
const CARD_SHADOW = "0 1px 2px rgba(16,24,40,0.04)";

interface Question {
  id: string;
  topic: string;
  difficulty: string;
  type: string;
  question_text: string;
  option_a: string | null;
  option_b: string | null;
  option_c: string | null;
  option_d: string | null;
  option_e: string | null;
  correct_answer: string;
  explanation: string;
  explanation_korean: string | null;
}

interface AttemptRecord {
  questionId: string;
  selectedAnswer: string;
  isCorrect: boolean;
  timeSpent: number;
}

const DIFF_LABEL: Record<string, string> = { easy: "Easy", medium: "Medium", hard: "Hard" };
const DIFF_DOT: Record<string, string> = { easy: "#00b85f", medium: "#d9930b", hard: "#dc2626" };

const cardStyle: React.CSSProperties = {
  border: `1px solid ${BORDER}`,
  borderRadius: 16,
  background: "#fff",
  boxShadow: CARD_SHADOW,
};

const primaryBtn: React.CSSProperties = {
  display: "inline-block",
  padding: "12px 22px",
  borderRadius: 999,
  background: GREEN,
  color: "#fff",
  fontSize: 14,
  fontWeight: 800,
  letterSpacing: "0.02em",
  textDecoration: "none",
  border: "none",
  cursor: "pointer",
};

const secondaryBtn: React.CSSProperties = {
  display: "inline-block",
  padding: "12px 22px",
  borderRadius: 999,
  background: "#fff",
  color: INK,
  fontSize: 14,
  fontWeight: 800,
  letterSpacing: "0.02em",
  textDecoration: "none",
  border: `1px solid ${BORDER}`,
  cursor: "pointer",
  textAlign: "center",
};

function Dots() {
  return (
    <div style={{ display: "flex", gap: 6 }}>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ width: 11, height: 11, borderRadius: 999, background: GREEN, animation: `qbp-bounce 0.9s ${i * 0.15}s infinite ease-in-out` }} />
      ))}
      <style>{`@keyframes qbp-bounce { 0%,80%,100% { transform: translateY(0); opacity: .5 } 40% { transform: translateY(-7px); opacity: 1 } }`}</style>
    </div>
  );
}

function PracticeInner({ subjectId }: { subjectId: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const subject = getSubjectById(subjectId);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Practice state
  const [phase, setPhase] = useState<"practice" | "results">("practice");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showKorean, setShowKorean] = useState(false);
  const [attempts, setAttempts] = useState<AttemptRecord[]>([]);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    const params = new URLSearchParams({ subject: subjectId, limit: "20" });
    const diff = searchParams.get("difficulty");
    const type = searchParams.get("type");
    if (diff) params.set("difficulty", diff);
    if (type) params.set("type", type);

    // Fresh session whenever the subject/difficulty changes — otherwise a shorter
    // re-filtered set could leave currentIdx out of range.
    setLoading(true); setError(""); setQuestions([]); setCurrentIdx(0); setPhase("practice"); setAttempts([]);

    // Hard timeout so a hung request can never leave an infinite spinner.
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 12000);
    let done = false;

    authFetch(`/api/question-bank?${params}`, { signal: controller.signal })
      .then(async (r) => {
        const data = await r.json().catch(() => null);
        if (!r.ok) { setError(questionBankAccessMessage(data?.reason)); return null; }
        return data;
      })
      .then((data) => {
        if (!data) return;
        if (!data.questions?.length) setError("No questions available.");
        setQuestions(data.questions ?? []);
      })
      .catch(() => setError(controller.signal.aborted ? "시간이 초과됐어요. 다시 시도해 주세요." : "Could not load questions."))
      .finally(() => { done = true; clearTimeout(timer); setLoading(false); });

    return () => { clearTimeout(timer); if (!done) controller.abort(); };
  }, [subjectId, searchParams]);

  useEffect(() => {
    startTimeRef.current = Date.now();
    setSelectedAnswer("");
    setSubmitted(false);
    setShowKorean(false);
  }, [currentIdx]);

  const currentQuestion = questions[currentIdx];
  const isCorrect =
    submitted &&
    currentQuestion &&
    selectedAnswer.toUpperCase() === currentQuestion.correct_answer.toUpperCase();

  async function handleSubmit() {
    if (!selectedAnswer.trim() || !currentQuestion) return;
    setSubmitted(true);

    const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);
    const correct =
      selectedAnswer.toUpperCase() === currentQuestion.correct_answer.toUpperCase();

    const attempt: AttemptRecord = {
      questionId: currentQuestion.id,
      selectedAnswer,
      isCorrect: correct,
      timeSpent,
    };
    setAttempts((prev) => [...prev, attempt]);

    // Save to DB (fire-and-forget)
    authFetch("/api/question-bank/attempt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        questionId: currentQuestion.id,
        selectedAnswer,
        isCorrect: correct,
        timeSpent,
      }),
    }).catch((err) => console.warn("[question-bank] attempt save failed", err));
  }

  function handleNext() {
    if (currentIdx + 1 >= questions.length) {
      setPhase("results");
    } else {
      setCurrentIdx((i) => i + 1);
    }
  }

  function handleThinkingAnalyzer() {
    if (!currentQuestion) return;
    const prefill = {
      subject: subject?.name ?? subjectId,
      question: currentQuestion.question_text,
      studentAnswer: selectedAnswer,
      correctAnswer: currentQuestion.correct_answer,
    };
    sessionStorage.setItem("inhero_analyzer_prefill", JSON.stringify(prefill));
    router.push("/thinking-analyzer");
  }

  const correctCount = attempts.filter((a) => a.isCorrect).length;
  const wrongAttempts = attempts.filter((a) => !a.isCorrect);
  const wrongTopics = Array.from(
    new Set(
      wrongAttempts
        .map((a) => {
          const q = questions.find((q) => q.id === a.questionId);
          return q?.topic ?? "";
        })
        .filter(Boolean)
    )
  );

  // ── Loading / Error ──────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div style={{ background: "#fff", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Dots />
      </div>
    );
  }

  if (error || !questions.length) {
    return (
      <div style={{ background: "#fff", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, fontFamily: "'Inter', sans-serif" }}>
        <div style={{ fontSize: 40 }}>📭</div>
        <p style={{ color: INK, fontWeight: 700, margin: 0 }}>{error || "No questions available"}</p>
        <Link href={`/question-bank/${subjectId}`} style={primaryBtn}>Back</Link>
      </div>
    );
  }

  // ── Results phase ────────────────────────────────────────────────────────────
  if (phase === "results") {
    const accuracy = Math.round((correctCount / attempts.length) * 100);
    return (
      <div style={{ background: "#fff", minHeight: "100vh", color: INK, fontFamily: "'Inter', sans-serif", padding: "44px clamp(16px,3vw,40px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gap: 18 }}>
          <div style={{ ...cardStyle, padding: "40px 30px", textAlign: "center" }}>
            <div style={{ fontSize: 46, marginBottom: 14 }}>
              {accuracy >= 80 ? "🎉" : accuracy >= 60 ? "👍" : "📚"}
            </div>
            <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 26, fontWeight: 850, letterSpacing: "-0.03em", color: INK, margin: "0 0 6px" }}>
              Session complete
            </h1>
            <div style={{ display: "flex", justifyContent: "center", gap: 40, marginTop: 26 }}>
              <Stat value={correctCount} label="Correct" color={INK} />
              <Stat value={attempts.length - correctCount} label="Wrong" color={RED} />
              <Stat value={`${accuracy}%`} label="Accuracy" color={GREEN} />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: wrongTopics.length > 0 ? "minmax(0,1fr)" : "1fr", gap: 18 }}>
            {wrongTopics.length > 0 && (
              <div style={{ ...cardStyle, padding: "20px 22px" }}>
                <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 800, color: INK, margin: "0 0 12px" }}>Weak topics</h2>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {wrongTopics.map((t) => (
                    <span key={t} style={{ fontSize: 12, fontWeight: 700, color: RED, background: "rgba(220,38,38,0.06)", border: "1px solid rgba(220,38,38,0.25)", borderRadius: 999, padding: "4px 12px" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {wrongAttempts.length > 0 && (
              <div style={{ ...cardStyle, padding: "20px 22px" }}>
                <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 800, color: INK, margin: "0 0 12px" }}>
                  Wrong ({wrongAttempts.length})
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 10 }}>
                  {wrongAttempts.map((a) => {
                    const q = questions.find((q) => q.id === a.questionId);
                    if (!q) return null;
                    return (
                      <div key={a.questionId} style={{ padding: "12px 14px", background: "rgba(220,38,38,0.04)", borderRadius: 12, border: "1px solid rgba(220,38,38,0.2)" }}>
                        <p style={{ fontSize: 12.5, color: "#334155", lineHeight: 1.5, margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{q.question_text}</p>
                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 7, fontSize: 12 }}>
                          <span style={{ color: RED }}>You: {a.selectedAnswer}</span>
                          <span style={{ color: GREEN }}>Correct: {q.correct_answer}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            <Link href={`/question-bank/${subjectId}`} style={{ ...secondaryBtn, flex: 1, minWidth: 180 }}>
              Back to question list
            </Link>
            <button
              onClick={() => {
                setAttempts([]);
                setCurrentIdx(0);
                setPhase("practice");
              }}
              style={{ ...secondaryBtn, flex: 1, minWidth: 180 }}
            >
              🔄 Try again
            </button>
            {wrongAttempts.length > 0 && (
              <button onClick={handleThinkingAnalyzer} style={{ ...primaryBtn, flex: 1, minWidth: 180 }}>
                🔍 Deep thinking analysis
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── Practice phase ───────────────────────────────────────────────────────────
  const opts: { letter: string; text: string }[] = [];
  if (currentQuestion.type === "multiple_choice") {
    const optionMap: Record<string, string | null> = {
      A: currentQuestion.option_a,
      B: currentQuestion.option_b,
      C: currentQuestion.option_c,
      D: currentQuestion.option_d,
      E: currentQuestion.option_e,
    };
    for (const [letter, text] of Object.entries(optionMap)) {
      if (text) opts.push({ letter, text });
    }
  }

  const sessionCorrect = attempts.filter((a) => a.isCorrect).length;
  const sessionRate = attempts.length > 0 ? Math.round((sessionCorrect / attempts.length) * 100) : null;
  const progressPct = ((currentIdx + (submitted ? 1 : 0)) / questions.length) * 100;

  return (
    <div style={{ background: "#fff", minHeight: "100vh", color: INK, fontFamily: "'Inter', sans-serif" }}>
      {/* Top bar */}
      <div style={{ borderBottom: `1px solid ${BORDER}`, background: "#fff", padding: "12px clamp(16px,3vw,40px)" }}>
        <div style={{ maxWidth: 880, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <Link href={`/question-bank/${subjectId}`} style={{ fontSize: 12.5, color: FAINT, textDecoration: "none", fontWeight: 600, whiteSpace: "nowrap" }}>
            ← {subject?.name}
          </Link>
          <div style={{ flex: 1, maxWidth: 320 }}>
            <div style={{ height: 7, background: "#eef1f5", borderRadius: 999, overflow: "hidden" }}>
              <div style={{ height: "100%", background: GREEN, borderRadius: 999, width: `${progressPct}%`, transition: "width 300ms ease" }} />
            </div>
            <p style={{ fontSize: 11, color: FAINT, textAlign: "center", margin: "5px 0 0", fontWeight: 600 }}>
              {currentIdx + 1} / {questions.length}
            </p>
          </div>
          {sessionRate !== null && (
            <div style={{ fontSize: 12.5, whiteSpace: "nowrap" }}>
              <span style={{ fontWeight: 800, color: GREEN }}>{sessionRate}%</span>
              <span style={{ color: FAINT, marginLeft: 5 }}>Accuracy</span>
            </div>
          )}
        </div>
      </div>

      {/* Difficulty switcher — updates the URL so the set re-loads at that level */}
      <div style={{ borderBottom: `1px solid ${BORDER}`, background: "#fbfcfe", padding: "9px clamp(16px,3vw,40px)" }}>
        <div style={{ maxWidth: 880, margin: "0 auto", display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap" }}>
          <span style={{ fontSize: 11.5, fontWeight: 800, color: FAINT, marginRight: 2 }}>난이도</span>
          {([["", "전체"], ["easy", "쉬움"], ["medium", "보통"], ["hard", "어려움"]] as const).map(([val, label]) => {
            const active = (searchParams.get("difficulty") ?? "") === val;
            return (
              <button key={val || "all"} onClick={() => {
                const p = new URLSearchParams(Array.from(searchParams.entries()));
                if (val) p.set("difficulty", val); else p.delete("difficulty");
                router.replace(`/question-bank/${subjectId}/practice?${p.toString()}`);
              }}
                style={{ fontSize: 12, fontWeight: 700, cursor: "pointer", borderRadius: 999, padding: "5px 13px",
                  border: `1px solid ${active ? GREEN : BORDER}`, background: active ? "rgba(0,184,95,0.10)" : "#fff",
                  color: active ? "#047a45" : SUB }}>
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Question card */}
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "30px clamp(16px,3vw,40px)", display: "grid", gap: 16 }}>
        <div style={{ ...cardStyle, padding: "26px 28px" }}>
          {/* Meta */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11.5, fontWeight: 800, color: SUB }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: DIFF_DOT[currentQuestion.difficulty] ?? FAINT }} />
              {DIFF_LABEL[currentQuestion.difficulty] ?? currentQuestion.difficulty}
            </span>
            <span style={{ fontSize: 10.5, fontWeight: 700, color: SUB, border: `1px solid ${BORDER}`, borderRadius: 999, padding: "3px 9px" }}>
              {currentQuestion.type === "multiple_choice" ? "Multiple choice" : "Free response"}
            </span>
            {currentQuestion.topic && <span style={{ fontSize: 12, color: FAINT }}>{currentQuestion.topic}</span>}
          </div>

          {/* Question */}
          <p style={{ fontSize: 17, fontWeight: 650, color: INK, lineHeight: 1.6, margin: "0 0 22px", whiteSpace: "pre-wrap" }}>
            {currentQuestion.question_text}
          </p>

          {/* Options (multiple choice) */}
          {currentQuestion.type === "multiple_choice" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              {opts.map(({ letter, text }) => {
                let border = `1px solid ${BORDER}`;
                let bg = "#fff";
                let color = "#334155";
                let weight = 500;
                if (!submitted) {
                  if (selectedAnswer === letter) {
                    border = `1.5px solid ${GREEN}`;
                    bg = "rgba(0,184,95,0.08)";
                    color = "#047a45";
                    weight = 700;
                  }
                } else {
                  if (letter === currentQuestion.correct_answer.toUpperCase()) {
                    border = `1.5px solid ${GREEN}`;
                    bg = "rgba(0,184,95,0.10)";
                    color = "#047a45";
                    weight = 700;
                  } else if (letter === selectedAnswer && !isCorrect) {
                    border = `1.5px solid rgba(220,38,38,0.55)`;
                    bg = "rgba(220,38,38,0.06)";
                    color = RED;
                    weight = 700;
                  } else {
                    color = FAINT;
                  }
                }
                return (
                  <button
                    key={letter}
                    disabled={submitted}
                    onClick={() => setSelectedAnswer(letter)}
                    style={{
                      textAlign: "left", padding: "13px 16px", borderRadius: 12, border, background: bg, color,
                      fontSize: 14.5, fontWeight: weight, lineHeight: 1.5, cursor: submitted ? "default" : "pointer", transition: "all .1s",
                    }}
                  >
                    <span style={{ fontWeight: 800, marginRight: 12 }}>{letter}.</span>
                    {text}
                    {submitted && letter === currentQuestion.correct_answer.toUpperCase() && (
                      <span style={{ marginLeft: 8, color: GREEN }}>✓</span>
                    )}
                    {submitted && letter === selectedAnswer && !isCorrect && (
                      <span style={{ marginLeft: 8, color: RED }}>✗</span>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Free response */}
          {currentQuestion.type === "free_response" && (
            <textarea
              rows={3}
              value={selectedAnswer}
              onChange={(e) => setSelectedAnswer(e.target.value)}
              disabled={submitted}
              placeholder="Type your answer…"
              style={{
                width: "100%", resize: "none", border: `1px solid ${BORDER}`, borderRadius: 12, padding: "12px 16px",
                fontSize: 14, background: "#fff", color: INK, outline: "none", fontFamily: "inherit", opacity: submitted ? 0.7 : 1,
              }}
            />
          )}

          {/* Submit button */}
          {!submitted && (
            <button
              onClick={handleSubmit}
              disabled={!selectedAnswer.trim()}
              style={{ ...primaryBtn, width: "100%", marginTop: 20, opacity: selectedAnswer.trim() ? 1 : 0.4, cursor: selectedAnswer.trim() ? "pointer" : "default" }}
            >
              Submit
            </button>
          )}
        </div>

        {/* Explanation (after submit) */}
        {submitted && (
          <div style={{ ...cardStyle, padding: "24px 26px", borderLeft: `4px solid ${isCorrect ? GREEN : RED}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
              <span style={{ fontSize: 17, fontWeight: 800, color: isCorrect ? GREEN : RED }}>
                {isCorrect ? "✓ Correct!" : "✗ Wrong"}
              </span>
              {!isCorrect && (
                <span style={{ fontSize: 13.5, color: SUB }}>
                  Correct: <strong style={{ color: GREEN }}>{currentQuestion.correct_answer}</strong>
                </span>
              )}
            </div>

            {/* Explanation toggle */}
            <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
              <button
                onClick={() => setShowKorean(false)}
                style={{ fontSize: 12, fontWeight: 700, padding: "6px 14px", borderRadius: 999, border: "none", cursor: "pointer",
                  background: !showKorean ? GREEN : "#f1f4f8", color: !showKorean ? "#fff" : SUB }}
              >
                🇺🇸 English
              </button>
              {currentQuestion.explanation_korean && (
                <button
                  onClick={() => setShowKorean(true)}
                  style={{ fontSize: 12, fontWeight: 700, padding: "6px 14px", borderRadius: 999, border: "none", cursor: "pointer",
                    background: showKorean ? GREEN : "#f1f4f8", color: showKorean ? "#fff" : SUB }}
                >
                  🇰🇷 Korean
                </button>
              )}
            </div>

            <p style={{ fontSize: 14, color: "#334155", lineHeight: 1.7, margin: 0 }}>
              {showKorean ? currentQuestion.explanation_korean : currentQuestion.explanation}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 20 }}>
              {!isCorrect && (
                <button onClick={handleThinkingAnalyzer} style={secondaryBtn}>
                  🔍 Deep analysis of this miss
                </button>
              )}
              <button onClick={handleNext} style={{ ...primaryBtn, flex: 1, minWidth: 160 }}>
                {currentIdx + 1 >= questions.length ? "See results →" : "Next question →"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({ value, label, color }: { value: React.ReactNode; label: string; color: string }) {
  return (
    <div style={{ textAlign: "center" }}>
      <p style={{ fontSize: 32, fontWeight: 850, color, margin: 0, letterSpacing: "-0.02em" }}>{value}</p>
      <p style={{ fontSize: 12, color: FAINT, margin: "4px 0 0" }}>{label}</p>
    </div>
  );
}

function questionBankAccessMessage(reason?: string) {
  if (reason === "sign_in_required") return "Sign in to practice questions from your plan.";
  if (reason === "subject_not_in_plan") return "This subject is not included in your One Subject Elite plan.";
  return "Upgrade to One Subject Elite or All Subject Pass to practice this question bank.";
}

export default function PracticePage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject: subjectId } = use(params);
  return (
    <Suspense fallback={
      <div style={{ background: "#fff", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Dots />
      </div>
    }>
      <PracticeInner subjectId={subjectId} />
    </Suspense>
  );
}
