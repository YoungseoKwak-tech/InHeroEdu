"use client";

/**
 * /parents/question-bank/exam — Bluebook-style digital AP practice player.
 * Mirrors College Board's Bluebook test app: one question at a time, top timer,
 * answer choices with letter badges + cross-out (eliminate) tool, mark-for-
 * review flag, a question navigator, Back/Next, a review page, then a scored
 * results review with explanations.
 *
 * Data: the same /api/question-bank/bank source as the question bank list.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { authFetch } from "@/lib/client-auth";

interface BankOption { label: string; correct: boolean; feedback?: string | null; }
interface BankQuestion {
  id: string; subjectLabel: string; emoji: string; unit: number | null;
  prompt: string; options: BankOption[]; explanation?: string | null; locked?: boolean;
}

const BLUE = "#1f6feb";
const LETTERS = ["A", "B", "C", "D", "E", "F"];
const SECS_PER_Q = 90;

function fmt(sec: number) {
  const m = Math.max(0, Math.floor(sec / 60));
  const s = Math.max(0, sec % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function ExamPage() {
  const [questions, setQuestions] = useState<BankQuestion[]>([]);
  const [subjectLabel, setSubjectLabel] = useState("AP Practice");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [marked, setMarked] = useState<Record<string, boolean>>({});
  const [crossed, setCrossed] = useState<Record<string, Record<number, boolean>>>({});
  const [crossMode, setCrossMode] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [review, setReview] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [remaining, setRemaining] = useState(0);
  const [timerHidden, setTimerHidden] = useState(false);
  const submittedRef = useRef(false);

  // Load questions (unlocked / free questions are answerable; one section ≈ 20).
  useEffect(() => {
    const subject = new URLSearchParams(window.location.search).get("subject") ?? "";
    (async () => {
      try {
        const r = await authFetch(`/api/question-bank/bank${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`);
        const d = await r.json();
        const all: BankQuestion[] = (d?.questions ?? []).filter((q: BankQuestion) => !q.locked && q.options?.length >= 2);
        const list = all.slice(0, 20);
        if (list.length === 0) { setErr("이 과목의 무료 문제가 없습니다. 다른 과목을 선택하거나 로그인 후 다시 시도해 주세요."); setLoading(false); return; }
        setQuestions(list);
        setSubjectLabel(list[0]?.subjectLabel ?? "AP Practice");
        setRemaining(list.length * SECS_PER_Q);
        setLoading(false);
      } catch {
        setErr("문제를 불러오지 못했습니다."); setLoading(false);
      }
    })();
  }, []);

  // Countdown — auto-submits at 0.
  useEffect(() => {
    if (loading || submitted || questions.length === 0) return;
    const id = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) { clearInterval(id); doSubmit(); return 0; }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, submitted, questions.length]);

  const q = questions[idx];
  const total = questions.length;
  const answeredCount = Object.keys(answers).length;

  function select(optIndex: number) {
    if (!q) return;
    if (crossed[q.id]?.[optIndex]) return; // can't pick a struck-out option
    setAnswers((a) => ({ ...a, [q.id]: optIndex }));
  }
  function toggleCross(optIndex: number) {
    if (!q) return;
    setCrossed((c) => {
      const cur = { ...(c[q.id] ?? {}) };
      cur[optIndex] = !cur[optIndex];
      return { ...c, [q.id]: cur };
    });
    setAnswers((a) => (a[q.id] === optIndex ? (() => { const n = { ...a }; delete n[q.id]; return n; })() : a));
  }
  function toggleMark() { if (q) setMarked((m) => ({ ...m, [q.id]: !m[q.id] })); }

  function doSubmit() {
    if (submittedRef.current) return;
    submittedRef.current = true;
    setSubmitted(true);
    setNavOpen(false);
    setReview(false);
    window.scrollTo({ top: 0 });
  }

  const score = useMemo(() => {
    let correct = 0;
    for (const item of questions) {
      const a = answers[item.id];
      if (a != null && item.options[a]?.correct) correct++;
    }
    return correct;
  }, [questions, answers]);

  if (loading) return <Center>불러오는 중…</Center>;
  if (err) return (
    <Center>
      <div style={{ textAlign: "center" }}>
        <p style={{ color: "#c0392b", fontWeight: 600 }}>{err}</p>
        <Link href="/parents/question-bank" style={{ color: BLUE, fontWeight: 700 }}>← 문제 은행으로</Link>
      </div>
    </Center>
  );

  // ---------- Results ----------
  if (submitted) {
    const pct = Math.round((score / total) * 100);
    return (
      <div style={{ minHeight: "100vh", background: "#fff", color: "#1d2733" }}>
        <TopBar subject={subjectLabel} center={<span style={{ fontWeight: 700 }}>채점 결과</span>} />
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "32px 20px 80px" }}>
          <div style={{ background: "#f4f8ff", border: `1px solid ${BLUE}33`, borderRadius: 16, padding: "26px 24px", textAlign: "center" }}>
            <div style={{ fontSize: 14, color: "#5b6b7b", fontWeight: 700 }}>{subjectLabel} · Section I (MCQ)</div>
            <div style={{ fontSize: 44, fontWeight: 800, color: BLUE, marginTop: 6 }}>{score} / {total}</div>
            <div style={{ fontSize: 15, color: "#3a4756", marginTop: 4 }}>정답률 {pct}%</div>
          </div>

          <h3 style={{ fontSize: 18, fontWeight: 800, margin: "30px 0 14px" }}>문항별 리뷰</h3>
          <div style={{ display: "grid", gap: 14 }}>
            {questions.map((item, i) => {
              const a = answers[item.id];
              const correctIdx = item.options.findIndex((o) => o.correct);
              const right = a != null && item.options[a]?.correct;
              return (
                <div key={item.id} style={{ border: "1px solid #e6ebf0", borderRadius: 14, padding: "18px 18px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <span style={{ fontWeight: 800, fontSize: 14 }}>#{i + 1}</span>
                    <span style={{ fontSize: 12.5, fontWeight: 800, color: right ? "#0f7b53" : "#c0392b", background: right ? "#e6f6ee" : "#fdecec", borderRadius: 999, padding: "3px 10px" }}>
                      {a == null ? "미응답" : right ? "정답" : "오답"}
                    </span>
                  </div>
                  <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, fontWeight: 600 }}>{item.prompt}</p>
                  <div style={{ display: "grid", gap: 6, marginTop: 12 }}>
                    {item.options.map((o, oi) => {
                      const isCorrect = oi === correctIdx;
                      const isChosen = oi === a;
                      const bg = isCorrect ? "#e6f6ee" : isChosen ? "#fdecec" : "#fff";
                      const bd = isCorrect ? "#0f7b53" : isChosen ? "#e0a3a3" : "#e6ebf0";
                      return (
                        <div key={oi} style={{ display: "flex", gap: 10, padding: "9px 12px", border: `1px solid ${bd}`, background: bg, borderRadius: 10, fontSize: 14 }}>
                          <b style={{ width: 16 }}>{LETTERS[oi]}</b><span>{o.label}</span>
                          {isCorrect && <span style={{ marginLeft: "auto", color: "#0f7b53", fontWeight: 700 }}>정답</span>}
                          {isChosen && !isCorrect && <span style={{ marginLeft: "auto", color: "#c0392b", fontWeight: 700 }}>내 선택</span>}
                        </div>
                      );
                    })}
                  </div>
                  {item.explanation && (
                    <div style={{ marginTop: 12, background: "#f6f8fa", borderRadius: 10, padding: "12px 14px", fontSize: 13.5, lineHeight: 1.65, color: "#3a4756" }}>
                      <b style={{ color: "#1d2733" }}>해설 </b>{item.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 26 }}>
            <button onClick={() => window.location.reload()} style={btnBlue}>다시 풀기</button>
            <Link href="/parents/question-bank" style={{ ...btnOutline, textDecoration: "none", display: "inline-flex", alignItems: "center" }}>문제 은행으로</Link>
          </div>
        </div>
      </div>
    );
  }

  // ---------- Review page ----------
  if (review) {
    return (
      <div style={{ minHeight: "100vh", background: "#fff", color: "#1d2733", display: "flex", flexDirection: "column" }}>
        <TopBar subject={subjectLabel} center={<Timer remaining={remaining} hidden={timerHidden} onToggle={() => setTimerHidden((v) => !v)} />} />
        <div style={{ flex: 1, maxWidth: 720, margin: "0 auto", padding: "32px 20px", width: "100%" }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>검토 페이지</h2>
          <p style={{ color: "#5b6b7b", fontSize: 14, marginTop: 8 }}>제출 전, 표시한 문항이나 미응답을 확인하세요.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(56px,1fr))", gap: 10, marginTop: 20 }}>
            {questions.map((item, i) => {
              const done = answers[item.id] != null;
              const flag = marked[item.id];
              return (
                <button key={item.id} onClick={() => { setReview(false); setIdx(i); }}
                  style={{ position: "relative", padding: "12px 0", borderRadius: 10, fontWeight: 800, fontSize: 14, cursor: "pointer",
                    border: `1px solid ${done ? BLUE : "#cdd6e0"}`, background: done ? BLUE : "#fff", color: done ? "#fff" : "#3a4756" }}>
                  {i + 1}
                  {flag && <span style={{ position: "absolute", top: -6, right: -6, fontSize: 12 }}>🚩</span>}
                </button>
              );
            })}
          </div>
        </div>
        <BottomBar
          left={<button onClick={() => { setReview(false); }} style={btnOutline}>← 시험으로</button>}
          right={<button onClick={doSubmit} style={btnBlue}>제출하기</button>}
        />
      </div>
    );
  }

  // ---------- Question view ----------
  const sel = answers[q.id];
  const qCross = crossed[q.id] ?? {};
  return (
    <div style={{ minHeight: "100vh", background: "#fff", color: "#1d2733", display: "flex", flexDirection: "column" }}>
      <TopBar
        subject={subjectLabel}
        center={<Timer remaining={remaining} hidden={timerHidden} onToggle={() => setTimerHidden((v) => !v)} />}
        right={
          <button onClick={() => setCrossMode((v) => !v)} title="보기 지우기"
            style={{ display: "inline-flex", alignItems: "center", gap: 6, border: `1px solid ${crossMode ? BLUE : "#d0d7de"}`, background: crossMode ? "#eaf2ff" : "#fff", color: crossMode ? BLUE : "#57606a", borderRadius: 8, padding: "6px 10px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
            <span style={{ textDecoration: "line-through" }}>ABC</span> 보기 지우기
          </button>
        }
      />

      <div style={{ flex: 1, width: "100%", maxWidth: 720, margin: "0 auto", padding: "20px 20px 24px" }}>
        {/* Question toolbar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #eef2f5", paddingBottom: 12 }}>
          <span style={{ fontWeight: 800, fontSize: 14 }}>{idx + 1} <span style={{ color: "#9aa6b2", fontWeight: 600 }}>/ {total}</span></span>
          <button onClick={toggleMark} style={{ display: "inline-flex", alignItems: "center", gap: 6, border: "none", background: "none", cursor: "pointer", fontSize: 13.5, fontWeight: 700, color: marked[q.id] ? "#d98324" : "#57606a" }}>
            {marked[q.id] ? "🚩" : "🏳️"} 검토 표시
          </button>
        </div>

        {/* Prompt */}
        <p style={{ fontSize: 17, lineHeight: 1.7, margin: "20px 0 22px", fontWeight: 600 }}>{q.prompt}</p>

        {/* Options */}
        <div style={{ display: "grid", gap: 12 }}>
          {q.options.map((o, oi) => {
            const isSel = sel === oi;
            const isCrossed = !!qCross[oi];
            return (
              <div key={oi} style={{ display: "flex", alignItems: "stretch", gap: 8 }}>
                <button
                  type="button"
                  onClick={() => select(oi)}
                  disabled={isCrossed}
                  style={{
                    flex: 1, textAlign: "left", display: "flex", alignItems: "center", gap: 14,
                    padding: "14px 16px", borderRadius: 12, cursor: isCrossed ? "default" : "pointer",
                    border: `1.5px solid ${isSel ? BLUE : "#d0d7de"}`, background: isSel ? "#eaf2ff" : "#fff",
                    opacity: isCrossed ? 0.45 : 1,
                  }}
                >
                  <span style={{ flexShrink: 0, width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14,
                    border: `1.5px solid ${isSel ? BLUE : "#9aa6b2"}`, background: isSel ? BLUE : "#fff", color: isSel ? "#fff" : "#3a4756" }}>
                    {LETTERS[oi]}
                  </span>
                  <span style={{ fontSize: 15.5, lineHeight: 1.55, textDecoration: isCrossed ? "line-through" : "none", color: isCrossed ? "#9aa6b2" : "#1d2733" }}>{o.label}</span>
                </button>
                {crossMode && (
                  <button type="button" onClick={() => toggleCross(oi)} title="지우기"
                    style={{ flexShrink: 0, width: 40, borderRadius: 10, border: `1px solid ${isCrossed ? BLUE : "#d0d7de"}`, background: isCrossed ? "#eaf2ff" : "#fff", color: "#57606a", cursor: "pointer", fontWeight: 800, fontSize: 13 }}>
                    {isCrossed ? "↺" : <span style={{ textDecoration: "line-through" }}>{LETTERS[oi]}</span>}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <BottomBar
        left={
          <div style={{ position: "relative" }}>
            <button onClick={() => setNavOpen((v) => !v)} style={{ ...btnOutline, fontWeight: 800 }}>
              {idx + 1} / {total} 문항 ▾
            </button>
            {navOpen && (
              <div style={{ position: "absolute", bottom: "calc(100% + 10px)", left: 0, width: 280, background: "#fff", border: "1px solid #e1e7ee", borderRadius: 14, boxShadow: "0 12px 40px rgba(0,0,0,0.18)", padding: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#5b6b7b", marginBottom: 10 }}>
                  <span>응답 {answeredCount}/{total}</span>
                  <button onClick={() => { setNavOpen(false); setReview(true); }} style={{ color: BLUE, background: "none", border: "none", fontWeight: 700, cursor: "pointer", fontSize: 12 }}>검토 페이지 →</button>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 8 }}>
                  {questions.map((item, i) => {
                    const done = answers[item.id] != null;
                    const cur = i === idx;
                    return (
                      <button key={item.id} onClick={() => { setIdx(i); setNavOpen(false); }}
                        style={{ position: "relative", padding: "8px 0", borderRadius: 8, fontSize: 13, fontWeight: 800, cursor: "pointer",
                          border: `1px solid ${cur ? BLUE : done ? BLUE : "#cdd6e0"}`, outline: cur ? `2px solid ${BLUE}55` : "none",
                          background: done ? BLUE : "#fff", color: done ? "#fff" : "#3a4756" }}>
                        {i + 1}{marked[item.id] && <span style={{ position: "absolute", top: -7, right: -5, fontSize: 10 }}>🚩</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        }
        right={
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => setIdx((i) => Math.max(0, i - 1))} disabled={idx === 0} style={{ ...btnOutline, opacity: idx === 0 ? 0.5 : 1 }}>← Back</button>
            {idx < total - 1
              ? <button onClick={() => setIdx((i) => Math.min(total - 1, i + 1))} style={btnBlue}>Next →</button>
              : <button onClick={() => setReview(true)} style={btnBlue}>검토 및 제출 →</button>}
          </div>
        }
      />
    </div>
  );
}

function TopBar({ subject, center, right }: { subject: string; center?: React.ReactNode; right?: React.ReactNode }) {
  return (
    <div style={{ height: 56, borderBottom: "1px solid #e6ebf0", display: "flex", alignItems: "center", padding: "0 18px", background: "#fff" }}>
      <div style={{ flex: 1, fontWeight: 800, fontSize: 14.5, color: "#1d2733" }}>{subject} · Section I</div>
      <div style={{ flex: "0 0 auto" }}>{center}</div>
      <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>{right}</div>
    </div>
  );
}

function Timer({ remaining, hidden, onToggle }: { remaining: number; hidden: boolean; onToggle: () => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
      <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: "0.02em", color: remaining < 60 ? "#c0392b" : "#1d2733", minWidth: 64, textAlign: "center" }}>
        {hidden ? "•:••" : fmt(remaining)}
      </div>
      <button onClick={onToggle} style={{ fontSize: 11, color: "#5b6b7b", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>
        {hidden ? "타이머 표시" : "타이머 숨기기"}
      </button>
    </div>
  );
}

function BottomBar({ left, right }: { left: React.ReactNode; right: React.ReactNode }) {
  return (
    <div style={{ height: 68, borderTop: "1px solid #e6ebf0", background: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 18px" }}>
      <div>{left}</div>
      <div>{right}</div>
    </div>
  );
}

function Center({ children }: { children: React.ReactNode }) {
  return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#5b6b7b", background: "#fff" }}>{children}</div>;
}

const btnBlue: React.CSSProperties = { background: BLUE, color: "#fff", border: "none", borderRadius: 10, padding: "11px 22px", fontWeight: 800, fontSize: 14.5, cursor: "pointer" };
const btnOutline: React.CSSProperties = { background: "#fff", color: "#3a4756", border: "1px solid #cdd6e0", borderRadius: 10, padding: "11px 18px", fontWeight: 700, fontSize: 14.5, cursor: "pointer" };
