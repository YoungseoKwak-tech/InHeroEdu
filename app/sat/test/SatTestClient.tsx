"use client";

/**
 * Bluebook-style adaptive SAT test runner. White full-screen test surface.
 * Flow: R&W Module 1 → adaptive R&W Module 2 → Math Module 1 → adaptive Math
 * Module 2 → scored results. Per-module timer, question navigator, mark-for-
 * review, MCQ + grid-in, and a Desmos calculator for Math.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import type { SatForm, SatQuestion } from "@/lib/sat/types";
import { gridMatches } from "@/lib/sat/types";
import { appendSatAttempt } from "@/lib/sat/history";
import SatHistory from "@/components/sat/SatHistory";

interface Answer { choice?: number; grid?: string }
type AnswerMap = Record<string, Answer>;

const ADAPT_THRESHOLD = 0.6;

/** Split a passage into sentence chunks (delimiters kept) for click-to-highlight. */
function splitSentences(text: string): string[] {
  return text.match(/[^.!?]+[.!?]*\s*/g) ?? [text];
}

function isCorrect(q: SatQuestion, a: Answer | undefined): boolean {
  if (!a) return false;
  if (q.type === "mcq") return a.choice === q.correct;
  return !!a.grid && gridMatches(a.grid, q.gridAnswers ?? []);
}

// Path-aware scaled score (200–800). A rough estimate, clearly labeled.
function sectionScore(correct: number, total: number, hardPath: boolean): number {
  const frac = total ? correct / total : 0;
  const raw = hardPath ? 540 + 260 * frac : 200 + 360 * frac;
  return Math.round(raw / 10) * 10;
}

export default function SatTestClient({ form }: { form: SatForm }) {
  type Phase = "rw1" | "rw2" | "math1" | "math2" | "results";
  const [phase, setPhase] = useState<Phase>("rw1");
  const [rwHard, setRwHard] = useState(false);
  const [mathHard, setMathHard] = useState(false);
  const [answers, setAnswers] = useState<AnswerMap>({});

  const rwM2 = rwHard ? form.rw.m2hard : form.rw.m2easy;
  const mathM2 = mathHard ? form.math.m2hard : form.math.m2easy;

  function finishModule(qs: SatQuestion[], a: AnswerMap, next: Phase, setHard?: (b: boolean) => void) {
    setAnswers((prev) => ({ ...prev, ...a }));
    if (setHard) {
      const correct = qs.reduce((n, q) => n + (isCorrect(q, a[q.id]) ? 1 : 0), 0);
      setHard(correct / qs.length >= ADAPT_THRESHOLD);
    }
    window.scrollTo(0, 0);
    setPhase(next);
  }

  if (phase === "results") {
    return <Results form={form} rwM2={rwM2} mathM2={mathM2} rwHard={rwHard} mathHard={mathHard} answers={answers} />;
  }

  const cfg = {
    rw1:   { qs: form.rw.m1,   time: form.rw.timeSec,   section: "Section 1: Reading and Writing", label: "Module 1 of 2", calc: false, next: (a: AnswerMap) => finishModule(form.rw.m1, a, "rw2", setRwHard) },
    rw2:   { qs: rwM2,         time: form.rw.timeSec,   section: "Section 1: Reading and Writing", label: "Module 2 of 2", calc: false, next: (a: AnswerMap) => finishModule(rwM2, a, "math1") },
    math1: { qs: form.math.m1, time: form.math.timeSec, section: "Section 2: Math",                label: "Module 1 of 2", calc: true,  next: (a: AnswerMap) => finishModule(form.math.m1, a, "math2", setMathHard) },
    math2: { qs: mathM2,       time: form.math.timeSec, section: "Section 2: Math",                label: "Module 2 of 2", calc: true,  next: (a: AnswerMap) => finishModule(mathM2, a, "results") },
  }[phase];

  return (
    <ModuleRunner
      key={phase}
      section={cfg.section}
      moduleLabel={cfg.label}
      questions={cfg.qs}
      timeSec={cfg.time}
      calculator={cfg.calc}
      onSubmit={(a) => cfg.next(a)}
    />
  );
}

function ModuleRunner({
  section, moduleLabel, questions, timeSec, calculator, onSubmit,
}: {
  section: string; moduleLabel: string; questions: SatQuestion[]; timeSec: number; calculator: boolean;
  onSubmit: (a: AnswerMap) => void;
}) {
  const [idx, setIdx] = useState(0);
  const [ans, setAns] = useState<AnswerMap>({});
  const [marked, setMarked] = useState<Set<string>>(new Set());
  const [review, setReview] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [showCalc, setShowCalc] = useState(false);
  const [hlMode, setHlMode] = useState(false);
  const [hl, setHl] = useState<Record<string, Set<number>>>({});
  const [left, setLeft] = useState(timeSec);
  const submitted = useRef(false);

  const submit = () => { if (submitted.current) return; submitted.current = true; onSubmit(ans); };

  useEffect(() => {
    const t = setInterval(() => setLeft((s) => { if (s <= 1) { clearInterval(t); submit(); return 0; } return s - 1; }), 1000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const q = questions[idx];
  const a = ans[q.id];
  const mm = String(Math.floor(left / 60)).padStart(2, "0");
  const ss = String(left % 60).padStart(2, "0");
  const lowTime = left <= 60;

  function setChoice(i: number) { setAns((p) => ({ ...p, [q.id]: { choice: i } })); }
  function setGrid(v: string) { setAns((p) => ({ ...p, [q.id]: { grid: v } })); }
  function toggleMark() { setMarked((p) => { const n = new Set(p); n.has(q.id) ? n.delete(q.id) : n.add(q.id); return n; }); }
  function toggleHl(i: number) { setHl((p) => { const s = new Set(p[q.id] ?? []); s.has(i) ? s.delete(i) : s.add(i); return { ...p, [q.id]: s }; }); }

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 50, background: "#fff", color: "#0f172a", display: "flex", flexDirection: "column", fontFamily: "Inter, sans-serif" }}>
      {/* Top bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 22px", borderBottom: "1px solid #e6e8ec" }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 800 }}>{section}</div>
          <div style={{ fontSize: 12, color: "#64748b" }}>{moduleLabel}</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 22, fontWeight: 800, fontVariantNumeric: "tabular-nums", color: lowTime ? "#dc2626" : "#0f172a" }}>{mm}:{ss}</div>
          <div style={{ fontSize: 11, color: "#94a3b8" }}>남은 시간</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {calculator && (
            <button onClick={() => setShowCalc(true)} style={topBtn}>🖩 계산기</button>
          )}
          <Link href="/sat" style={{ ...topBtn, textDecoration: "none", color: "#64748b", display: "inline-flex", alignItems: "center" }}>나가기</Link>
        </div>
      </div>

      {/* Body */}
      {!review ? (
        <div style={{ flex: 1, overflowY: "auto" }}>
          <div style={{ maxWidth: q.passage ? 1040 : 720, margin: "0 auto", padding: "26px 22px 40px", display: q.passage ? "grid" : "block", gridTemplateColumns: q.passage ? "1fr 1fr" : undefined, gap: 28 }}>
            {q.passage && (
              <div>
                <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 8 }}>
                  <button onClick={() => setHlMode((v) => !v)} style={{
                    fontSize: 12, fontWeight: 700, cursor: "pointer", borderRadius: 8, padding: "5px 11px",
                    border: `1px solid ${hlMode ? "#f59e0b" : "#d6dbe2"}`,
                    background: hlMode ? "#fef3c7" : "#fff", color: hlMode ? "#b45309" : "#64748b",
                  }}>🖍 하이라이트{hlMode ? " ON" : ""}</button>
                </div>
                <div style={{ fontSize: 15.5, lineHeight: 1.85, color: "#1f2937", borderRight: "1px solid #eceff3", paddingRight: 24 }}>
                  {splitSentences(q.passage).map((s, i) => {
                    const on = (hl[q.id] ?? new Set<number>()).has(i);
                    return (
                      <span key={i} onClick={hlMode ? () => toggleHl(i) : undefined} style={{
                        background: on ? "rgba(250,204,21,0.55)" : "transparent",
                        cursor: hlMode ? "pointer" : "text", borderRadius: 3,
                      }}>{s}</span>
                    );
                  })}
                </div>
                {hlMode && <p style={{ fontSize: 11.5, color: "#94a3b8", marginTop: 8 }}>문장을 눌러 형광펜 표시 · 다시 누르면 해제</p>}
              </div>
            )}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <span style={{ background: "#0f172a", color: "#fff", fontSize: 13, fontWeight: 800, borderRadius: 6, padding: "3px 9px" }}>{idx + 1}</span>
                <button onClick={toggleMark} style={{ fontSize: 12.5, fontWeight: 700, cursor: "pointer", border: "none", background: "none", color: marked.has(q.id) ? "#dc2626" : "#94a3b8" }}>
                  {marked.has(q.id) ? "🚩 표시됨" : "🚩 나중에 볼 문제"}
                </button>
                <span style={{ marginLeft: "auto", fontSize: 11, color: "#cbd5e1" }}>{q.domain}</span>
              </div>
              <p style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.6, margin: "0 0 18px" }}>{q.prompt}</p>

              {q.type === "mcq" ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {q.choices!.map((c, i) => {
                    const on = a?.choice === i;
                    return (
                      <button key={i} onClick={() => setChoice(i)} style={{
                        display: "flex", alignItems: "center", gap: 12, textAlign: "left", cursor: "pointer",
                        padding: "12px 14px", borderRadius: 10, fontSize: 15,
                        border: on ? "2px solid #0f172a" : "1px solid #d6dbe2", background: on ? "#f8fafc" : "#fff",
                      }}>
                        <span style={{ flexShrink: 0, width: 26, height: 26, borderRadius: "50%", border: on ? "2px solid #0f172a" : "1px solid #cbd5e1", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, background: on ? "#0f172a" : "#fff", color: on ? "#fff" : "#475569" }}>
                          {"ABCD"[i]}
                        </span>
                        <span>{c}</span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div>
                  <input
                    value={a?.grid ?? ""} onChange={(e) => setGrid(e.target.value)}
                    placeholder="정답 입력 (예: 7, 3/2, 1.5)"
                    inputMode="text"
                    style={{ width: "100%", maxWidth: 280, padding: "12px 14px", fontSize: 18, fontWeight: 700, border: "2px solid #0f172a", borderRadius: 10, outline: "none" }}
                  />
                  <p style={{ fontSize: 12.5, color: "#94a3b8", marginTop: 8 }}>분수(3/2)나 소수(1.5)로 입력할 수 있어요.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <ReviewScreen questions={questions} ans={ans} marked={marked} onJump={(i) => { setIdx(i); setReview(false); }} onSubmit={submit} />
      )}

      {/* Bottom bar */}
      <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 22px", borderTop: "1px solid #e6e8ec" }}>
        <button onClick={() => setIdx((i) => Math.max(0, i - 1))} disabled={idx === 0 || review} style={{ ...navBtn, opacity: idx === 0 || review ? 0.4 : 1 }}>← 이전</button>

        <button onClick={() => setNavOpen((v) => !v)} style={{ fontSize: 13, fontWeight: 800, cursor: "pointer", background: "#0f172a", color: "#fff", border: "none", borderRadius: 8, padding: "8px 16px" }}>
          {review ? "리뷰" : `${idx + 1} / ${questions.length}`} ▾
        </button>
        {navOpen && (
          <Navigator questions={questions} ans={ans} marked={marked} current={idx}
            onPick={(i) => { setIdx(i); setReview(false); setNavOpen(false); }}
            onClose={() => setNavOpen(false)} />
        )}

        {!review ? (
          idx < questions.length - 1 ? (
            <button onClick={() => setIdx((i) => i + 1)} style={navBtnPrimary}>다음 →</button>
          ) : (
            <button onClick={() => setReview(true)} style={navBtnPrimary}>리뷰 →</button>
          )
        ) : (
          <button onClick={submit} style={{ ...navBtnPrimary, background: "#00a152" }}>모듈 제출 ✓</button>
        )}
      </div>

      {showCalc && <DesmosModal onClose={() => setShowCalc(false)} />}
    </div>
  );
}

function ReviewScreen({ questions, ans, marked, onJump, onSubmit }: {
  questions: SatQuestion[]; ans: AnswerMap; marked: Set<string>; onJump: (i: number) => void; onSubmit: () => void;
}) {
  const answered = questions.filter((q) => ans[q.id] && (ans[q.id].choice != null || ans[q.id].grid)).length;
  return (
    <div style={{ flex: 1, overflowY: "auto" }}>
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "30px 22px 40px", textAlign: "center" }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 6px" }}>모듈 리뷰</h2>
        <p style={{ fontSize: 14, color: "#64748b", margin: "0 0 22px" }}>
          {answered} / {questions.length} 문제 응답 · 🚩 {marked.size}개 표시됨. 번호를 눌러 돌아갈 수 있어요.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(54px, 1fr))", gap: 10, marginBottom: 28 }}>
          {questions.map((q, i) => {
            const done = ans[q.id] && (ans[q.id].choice != null || ans[q.id].grid);
            const flag = marked.has(q.id);
            return (
              <button key={q.id} onClick={() => onJump(i)} style={{
                position: "relative", padding: "12px 0", borderRadius: 8, cursor: "pointer", fontSize: 14, fontWeight: 800,
                border: flag ? "2px solid #dc2626" : "1px solid #d6dbe2",
                background: done ? "#0f172a" : "#fff", color: done ? "#fff" : "#475569",
              }}>
                {i + 1}{flag && <span style={{ position: "absolute", top: -6, right: -4, fontSize: 11 }}>🚩</span>}
              </button>
            );
          })}
        </div>
        <button onClick={onSubmit} style={{ background: "#00a152", color: "#fff", border: "none", borderRadius: 10, padding: "13px 30px", fontSize: 15, fontWeight: 800, cursor: "pointer" }}>
          이 모듈 제출하고 계속 →
        </button>
      </div>
    </div>
  );
}

function Navigator({ questions, ans, marked, current, onPick, onClose }: {
  questions: SatQuestion[]; ans: AnswerMap; marked: Set<string>; current: number; onPick: (i: number) => void; onClose: () => void;
}) {
  return (
    <>
      <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 5 }} />
      <div style={{ position: "absolute", bottom: 56, left: "50%", transform: "translateX(-50%)", zIndex: 6, background: "#fff", border: "1px solid #e6e8ec", borderRadius: 12, boxShadow: "0 12px 40px rgba(0,0,0,0.18)", padding: 16, width: "min(420px, 92vw)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(46px, 1fr))", gap: 8 }}>
          {questions.map((q, i) => {
            const done = ans[q.id] && (ans[q.id].choice != null || ans[q.id].grid);
            return (
              <button key={q.id} onClick={() => onPick(i)} style={{
                position: "relative", padding: "10px 0", borderRadius: 7, cursor: "pointer", fontSize: 13, fontWeight: 800,
                border: i === current ? "2px solid #2563eb" : marked.has(q.id) ? "2px solid #dc2626" : "1px solid #d6dbe2",
                background: done ? "#0f172a" : "#fff", color: done ? "#fff" : "#475569",
              }}>
                {i + 1}{marked.has(q.id) && <span style={{ position: "absolute", top: -6, right: -3, fontSize: 10 }}>🚩</span>}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

function DesmosModal({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let calc: { destroy: () => void } | null = null;
    const w = window as unknown as { Desmos?: { GraphingCalculator: (el: HTMLElement) => { destroy: () => void } } };
    const mount = () => { if (ref.current && w.Desmos) calc = w.Desmos.GraphingCalculator(ref.current); };
    if (w.Desmos) mount();
    else {
      const existing = document.getElementById("desmos-script") as HTMLScriptElement | null;
      if (existing) existing.addEventListener("load", mount);
      else {
        const s = document.createElement("script");
        s.id = "desmos-script";
        s.src = "https://www.desmos.com/api/v1.10/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6";
        s.async = true; s.onload = mount; document.body.appendChild(s);
      }
    }
    return () => { if (calc) calc.destroy(); };
  }, []);
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 60, background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{ width: "min(640px, 96vw)", background: "#fff", borderRadius: 14, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.4)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px", borderBottom: "1px solid #e6e8ec" }}>
          <span style={{ fontWeight: 800, fontSize: 14 }}>그래핑 계산기</span>
          <button onClick={onClose} style={{ border: "none", background: "none", cursor: "pointer", fontSize: 18, color: "#64748b" }}>✕</button>
        </div>
        <div ref={ref} style={{ width: "100%", height: 460 }} />
      </div>
    </div>
  );
}

function Results({ form, rwM2, mathM2, rwHard, mathHard, answers }: {
  form: SatForm; rwM2: SatQuestion[]; mathM2: SatQuestion[]; rwHard: boolean; mathHard: boolean; answers: AnswerMap;
}) {
  const rwQs = [...form.rw.m1, ...rwM2];
  const mathQs = [...form.math.m1, ...mathM2];
  const rwCorrect = rwQs.reduce((n, q) => n + (isCorrect(q, answers[q.id]) ? 1 : 0), 0);
  const mathCorrect = mathQs.reduce((n, q) => n + (isCorrect(q, answers[q.id]) ? 1 : 0), 0);
  const rwScore = sectionScore(rwCorrect, rwQs.length, rwHard);
  const mathScore = sectionScore(mathCorrect, mathQs.length, mathHard);
  const total = rwScore + mathScore;

  // Save this attempt to local history once, then refresh the trend chart.
  const savedRef = useRef(false);
  const [histKey, setHistKey] = useState(0);
  useEffect(() => {
    if (savedRef.current) return;
    savedRef.current = true;
    appendSatAttempt({ formId: form.id, formTitle: form.title, rw: rwScore, math: mathScore, total });
    setHistKey((k) => k + 1);
  }, [form.id, form.title, rwScore, mathScore, total]);

  const [showReview, setShowReview] = useState<"rw" | "math" | null>(null);
  const reviewQs = showReview === "rw" ? rwQs : showReview === "math" ? mathQs : [];

  return (
    <div style={{ background: "#05070d", minHeight: "100vh", color: "#e8edf4", padding: "56px 22px 100px", fontFamily: "Inter, sans-serif" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <p style={{ fontSize: 11, letterSpacing: "0.3em", color: "rgba(0,255,178,0.7)", textTransform: "uppercase", marginBottom: 10 }}>SAT PRACTICE · 결과</p>
        <div style={{ textAlign: "center", padding: "30px 20px 34px", borderRadius: 20, border: "1px solid rgba(0,255,178,0.25)", background: "rgba(0,255,178,0.04)", marginBottom: 24 }}>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", marginBottom: 6 }}>예상 총점</div>
          <div style={{ fontSize: 64, fontWeight: 900, color: "#fff", lineHeight: 1, letterSpacing: "-0.03em" }}>{total}</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", marginTop: 8 }}>400 – 1600 척도 · 적응형 경로 반영 추정치</div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 28 }}>
          <ScoreCard label="Reading & Writing" score={rwScore} correct={rwCorrect} total={rwQs.length} hard={rwHard} onReview={() => setShowReview("rw")} />
          <ScoreCard label="Math" score={mathScore} correct={mathCorrect} total={mathQs.length} hard={mathHard} onReview={() => setShowReview("math")} />
        </div>

        <DomainAnalysis rwQs={rwQs} mathQs={mathQs} answers={answers} onReview={(s) => setShowReview(s)} />

        <SatHistory theme="dark" refreshKey={histKey} />

        {showReview && (
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0 }}>{showReview === "rw" ? "Reading & Writing" : "Math"} 문제 리뷰</h3>
              <button onClick={() => setShowReview(null)} style={{ background: "none", border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.6)", borderRadius: 8, padding: "5px 12px", fontSize: 12.5, cursor: "pointer" }}>닫기</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {reviewQs.map((q, i) => <ReviewCard key={q.id} q={q} n={i + 1} a={answers[q.id]} />)}
            </div>
          </div>
        )}

        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href={`/sat/test?form=${form.id}`} style={ctaBtn(true)}>🔁 다시 풀기</Link>
          <Link href="/sat" style={ctaBtn(false)}>다른 테스트 선택</Link>
        </div>
      </div>
    </div>
  );
}

// Per-domain breakdown so the student sees exactly which SAT skills to drill.
function breakdown(qs: SatQuestion[], answers: AnswerMap) {
  const m = new Map<string, { correct: number; total: number }>();
  for (const q of qs) {
    const d = q.domain || "기타";
    const e = m.get(d) ?? { correct: 0, total: 0 };
    e.total++;
    if (isCorrect(q, answers[q.id])) e.correct++;
    m.set(d, e);
  }
  return [...m.entries()]
    .map(([domain, { correct, total }]) => ({ domain, correct, total, pct: total ? correct / total : 0 }))
    .sort((a, b) => a.pct - b.pct);
}

function DomainAnalysis({ rwQs, mathQs, answers, onReview }: {
  rwQs: SatQuestion[]; mathQs: SatQuestion[]; answers: AnswerMap; onReview: (s: "rw" | "math") => void;
}) {
  const rw = breakdown(rwQs, answers);
  const math = breakdown(mathQs, answers);
  // Weakest 3 domains across both sections → focus list.
  const focus = [...rw.map((d) => ({ ...d, sec: "rw" as const })), ...math.map((d) => ({ ...d, sec: "math" as const }))]
    .filter((d) => d.pct < 1)
    .sort((a, b) => a.pct - b.pct)
    .slice(0, 3);

  const Row = ({ d }: { d: { domain: string; correct: number; total: number; pct: number } }) => {
    const color = d.pct >= 0.8 ? "#5eead4" : d.pct >= 0.5 ? "#fbbf24" : "#ff8b8b";
    return (
      <div style={{ marginBottom: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, marginBottom: 5 }}>
          <span style={{ color: "rgba(255,255,255,0.78)" }}>{d.domain}</span>
          <span style={{ color, fontWeight: 800 }}>{d.correct}/{d.total} · {Math.round(d.pct * 100)}%</span>
        </div>
        <div style={{ height: 7, borderRadius: 5, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${Math.round(d.pct * 100)}%`, background: color, borderRadius: 5, transition: "width .4s" }} />
        </div>
      </div>
    );
  };

  return (
    <div style={{ borderRadius: 18, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)", padding: "22px 22px 24px", marginBottom: 28 }}>
      <h3 style={{ fontSize: 16, fontWeight: 850, margin: "0 0 4px", color: "#fff" }}>📊 영역별 분석</h3>
      <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.45)", margin: "0 0 18px" }}>SAT 도메인별 정답률 — 약한 영역을 정확히 짚어줍니다.</p>

      <div style={{ fontSize: 12.5, fontWeight: 800, color: "rgba(94,234,212,0.85)", letterSpacing: "0.05em", textTransform: "uppercase", margin: "0 0 10px" }}>Reading & Writing</div>
      {rw.map((d) => <Row key={d.domain} d={d} />)}

      <div style={{ fontSize: 12.5, fontWeight: 800, color: "rgba(94,234,212,0.85)", letterSpacing: "0.05em", textTransform: "uppercase", margin: "18px 0 10px" }}>Math</div>
      {math.map((d) => <Row key={d.domain} d={d} />)}

      {focus.length > 0 && (
        <div style={{ marginTop: 20, borderRadius: 12, background: "rgba(255,139,139,0.07)", border: "1px solid rgba(255,139,139,0.22)", padding: "14px 16px" }}>
          <div style={{ fontSize: 13, fontWeight: 850, color: "#ffb3b3", marginBottom: 8 }}>🎯 집중 학습 영역</div>
          <ul style={{ margin: 0, paddingLeft: 18, fontSize: 13, color: "rgba(255,255,255,0.72)", lineHeight: 1.7 }}>
            {focus.map((d) => (
              <li key={d.sec + d.domain}>
                <strong style={{ color: "#fff" }}>{d.domain}</strong> ({d.sec === "rw" ? "R&W" : "Math"}) — {d.correct}/{d.total} 정답.{" "}
                <button onClick={() => onReview(d.sec)} style={{ background: "none", border: "none", color: "#5eead4", fontWeight: 700, cursor: "pointer", padding: 0, fontSize: 13, textDecoration: "underline" }}>풀이 보기</button>
              </li>
            ))}
          </ul>
          <p style={{ margin: "10px 0 0", fontSize: 12, color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>
            이 영역들을 우선 복습하고, 문제은행에서 같은 도메인 문제를 더 풀어보세요.
          </p>
        </div>
      )}
    </div>
  );
}

function ScoreCard({ label, score, correct, total, hard, onReview }: {
  label: string; score: number; correct: number; total: number; hard: boolean; onReview: () => void;
}) {
  return (
    <div style={{ borderRadius: 16, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)", padding: "18px 18px" }}>
      <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.55)", fontWeight: 700, marginBottom: 6 }}>{label}</div>
      <div style={{ fontSize: 34, fontWeight: 900, color: "#fff", letterSpacing: "-0.02em" }}>{score}</div>
      <div style={{ fontSize: 12.5, color: "rgba(255,255,255,0.45)", margin: "4px 0 12px" }}>
        정답 {correct}/{total} · Module 2: <span style={{ color: hard ? "#5eead4" : "#fbbf24" }}>{hard ? "Hard 경로" : "Easy 경로"}</span>
      </div>
      <button onClick={onReview} style={{ width: "100%", background: "rgba(0,255,178,0.1)", border: "1px solid rgba(0,255,178,0.3)", color: "#5eead4", borderRadius: 9, padding: "8px 0", fontSize: 12.5, fontWeight: 800, cursor: "pointer" }}>해설 보기</button>
    </div>
  );
}

function ReviewCard({ q, n, a }: { q: SatQuestion; n: number; a: Answer | undefined }) {
  const ok = isCorrect(q, a);
  const yourAns = q.type === "mcq" ? (a?.choice != null ? `${"ABCD"[a.choice]}. ${q.choices![a.choice]}` : "무응답") : (a?.grid || "무응답");
  const correctAns = q.type === "mcq" ? `${"ABCD"[q.correct!]}. ${q.choices![q.correct!]}` : (q.gridAnswers ?? []).join(" 또는 ");
  return (
    <div style={{ borderRadius: 14, border: `1px solid ${ok ? "rgba(0,255,178,0.3)" : "rgba(255,107,107,0.3)"}`, background: "rgba(255,255,255,0.02)", padding: "14px 16px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <span style={{ fontSize: 12, fontWeight: 800, color: ok ? "#5eead4" : "#ff8b8b" }}>{ok ? "✓" : "✗"} 문제 {n}</span>
        <span style={{ marginLeft: "auto", fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{q.domain}</span>
      </div>
      {q.passage && <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, margin: "0 0 8px" }}>{q.passage}</p>}
      <p style={{ fontSize: 14, color: "#fff", fontWeight: 600, lineHeight: 1.55, margin: "0 0 10px" }}>{q.prompt}</p>
      <p style={{ fontSize: 13, margin: "0 0 4px", color: ok ? "#5eead4" : "#ff8b8b" }}>내 답: {yourAns}</p>
      {!ok && <p style={{ fontSize: 13, margin: "0 0 8px", color: "#5eead4" }}>정답: {correctAns}</p>}
      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.65, margin: 0, borderLeft: "2px solid rgba(255,255,255,0.15)", paddingLeft: 12 }}>{q.explanation}</p>
    </div>
  );
}

const topBtn: React.CSSProperties = { fontSize: 13, fontWeight: 700, cursor: "pointer", background: "#f1f5f9", border: "1px solid #e2e8f0", borderRadius: 8, padding: "8px 14px", color: "#0f172a" };
const navBtn: React.CSSProperties = { fontSize: 14, fontWeight: 700, cursor: "pointer", background: "#fff", border: "1px solid #d6dbe2", borderRadius: 8, padding: "9px 18px", color: "#0f172a" };
const navBtnPrimary: React.CSSProperties = { fontSize: 14, fontWeight: 800, cursor: "pointer", background: "#2563eb", border: "none", borderRadius: 8, padding: "9px 22px", color: "#fff" };
function ctaBtn(primary: boolean): React.CSSProperties {
  return { textDecoration: "none", fontSize: 14, fontWeight: 800, borderRadius: 999, padding: "12px 26px",
    background: primary ? "#00FFB2" : "transparent", color: primary ? "#05070d" : "rgba(255,255,255,0.7)",
    border: primary ? "none" : "1px solid rgba(255,255,255,0.2)" };
}
