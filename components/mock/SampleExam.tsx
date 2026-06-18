"use client";

/**
 * SampleExam — a free "찍먹" taste of the paid SAT/TOEFL mocks. It reuses the
 * real test chrome (section label + live countdown timer, question navigator,
 * mark-for-review, A–D choices) on a SHORT set of authentic items, then shows a
 * mini score with explanations and a CTA into the full paid exam.
 *
 * It deliberately does NOT touch the gated full-length engines or credits — it's
 * free by design so prospective buyers can see the format and feel the timer
 * before paying.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

export interface SampleItem {
  /** Optional stimulus shown beside the question (reading passage / data note). */
  passage?: string;
  /** Official-style type label (e.g. "Factual Information", "Words in Context"). */
  qtype?: string;
  prompt: string;
  choices: string[];
  correct: number;
  explanation?: string;
}

const LETTERS = ["A", "B", "C", "D", "E", "F"];

function fmt(sec: number) {
  const m = Math.max(0, Math.floor(sec / 60));
  const s = Math.max(0, sec % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function SampleExam({
  title,
  sectionLabel,
  items,
  seconds = 5 * 60,
  accent = "#1f6feb",
  fullHref,
  fullLabel = "전체 모의고사 이용권 보기 →",
}: {
  title: string;
  sectionLabel: string;
  items: SampleItem[];
  seconds?: number;
  accent?: string;
  fullHref: string;
  fullLabel?: string;
}) {
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [marked, setMarked] = useState<Record<number, boolean>>({});
  const [remaining, setRemaining] = useState(seconds);
  const [done, setDone] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const submittedRef = useRef(false);

  const submit = () => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    setDone(true);
  };

  // Live countdown — auto-submits at 0, exactly like the real timed exam.
  useEffect(() => {
    if (done) return;
    if (remaining <= 0) { submit(); return; }
    const t = window.setInterval(() => setRemaining((r) => r - 1), 1000);
    return () => window.clearInterval(t);
  }, [remaining, done]);

  const total = items.length;
  const score = useMemo(
    () => items.reduce((n, it, i) => n + (answers[i] === it.correct ? 1 : 0), 0),
    [answers, items]
  );

  if (done) {
    return (
      <div style={{ minHeight: "100vh", background: "#05070d", color: "#e8edf4", padding: "56px 20px 100px", fontFamily: "Inter, sans-serif" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: accent, fontWeight: 800, marginBottom: 10 }}>샘플 결과 · 찍먹 종료</p>
          <h1 style={{ fontSize: 26, fontWeight: 850, color: "#fff", margin: "0 0 6px" }}>{score} / {total} 정답</h1>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: 24 }}>
            이게 실제 시험과 동일한 형식이에요 — 타이머, 문제 네비게이터, 표시 기능, 자동 채점·해설까지.
            전체 모의고사는 풀 렝스로 점수 추정과 전 문항 해설을 제공합니다.
          </p>

          <Link href={fullHref} style={{ display: "inline-block", background: accent, color: "#05070d", borderRadius: 12, padding: "14px 26px", fontWeight: 850, fontSize: 15.5, textDecoration: "none", marginBottom: 28 }}>
            {fullLabel}
          </Link>

          <div style={{ display: "grid", gap: 14 }}>
            {items.map((it, i) => {
              const picked = answers[i];
              const ok = picked === it.correct;
              return (
                <div key={i} style={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, padding: "16px 18px", background: "rgba(255,255,255,0.02)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <span style={{ fontSize: 12, fontWeight: 900, color: ok ? "#22c55e" : "#f87171" }}>{ok ? "✓ 정답" : "✗ 오답"}</span>
                    {it.qtype && <span style={{ fontSize: 11, color: "rgba(255,255,255,0.45)" }}>{it.qtype}</span>}
                  </div>
                  <p style={{ fontSize: 14, color: "#fff", margin: "0 0 8px", lineHeight: 1.6 }}>{i + 1}. {it.prompt}</p>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", margin: "0 0 4px" }}>
                    내 답: {picked != null ? `${LETTERS[picked]}. ${it.choices[picked]}` : "미응답"} · 정답: {LETTERS[it.correct]}. {it.choices[it.correct]}
                  </p>
                  {it.explanation && <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", margin: "6px 0 0", lineHeight: 1.65 }}>해설 · {it.explanation}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  const it = items[idx];
  const low = remaining <= 60;

  return (
    <div style={{ minHeight: "100vh", background: "#fff", color: "#0f172a", fontFamily: "Inter, sans-serif", display: "flex", flexDirection: "column" }}>
      {/* Top bar — section label + live countdown (real exam chrome). */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 18px", borderBottom: "1px solid #e6e8ec", flexWrap: "wrap", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 11, fontWeight: 900, color: "#fff", background: accent, borderRadius: 999, padding: "3px 9px" }}>샘플 · 무료</span>
          <span style={{ fontSize: 14, fontWeight: 800 }}>{sectionLabel}</span>
        </div>
        <div style={{ fontVariantNumeric: "tabular-nums", fontSize: 18, fontWeight: 900, color: low ? "#dc2626" : "#0f172a", display: "flex", alignItems: "center", gap: 6 }}>
          ⏱ {fmt(remaining)}
        </div>
        <button onClick={() => setNavOpen((o) => !o)} style={{ fontSize: 13, fontWeight: 800, color: accent, background: "none", border: "1px solid #e6e8ec", borderRadius: 8, padding: "6px 12px", cursor: "pointer" }}>
          문제 {idx + 1} / {total} ▾
        </button>
      </div>

      {/* Navigator */}
      {navOpen && (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", padding: "12px 18px", borderBottom: "1px solid #eef1f4", background: "#fafbfc" }}>
          {items.map((_, i) => {
            const answered = answers[i] != null;
            return (
              <button key={i} onClick={() => { setIdx(i); setNavOpen(false); }} style={{ width: 38, height: 38, borderRadius: 8, fontWeight: 800, fontSize: 13, cursor: "pointer", border: `1.5px solid ${i === idx ? accent : "#d8dee5"}`, background: answered ? `${accent}1a` : "#fff", color: i === idx ? accent : "#475569", position: "relative" }}>
                {i + 1}{marked[i] && <span style={{ position: "absolute", top: -4, right: -4, fontSize: 10 }}>🚩</span>}
              </button>
            );
          })}
        </div>
      )}

      {/* Body — passage (if any) beside the question */}
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: it.passage ? "1fr 1fr" : "1fr", gap: 0 }}>
        {it.passage && (
          <div style={{ borderRight: "1px solid #eef1f4", padding: "24px 26px", overflowY: "auto", maxHeight: "calc(100vh - 150px)", fontSize: 15, lineHeight: 1.85, color: "#1e293b", whiteSpace: "pre-wrap" }}>
            {it.passage}
          </div>
        )}
        <div style={{ padding: "24px 26px", overflowY: "auto", maxHeight: it.passage ? "calc(100vh - 150px)" : undefined }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <span style={{ fontSize: 13, fontWeight: 900, color: "#fff", background: "#0f172a", borderRadius: 6, padding: "3px 9px" }}>{idx + 1}</span>
            {it.qtype && <span style={{ fontSize: 12, color: "#64748b", fontWeight: 700 }}>{it.qtype}</span>}
            <button onClick={() => setMarked((m) => ({ ...m, [idx]: !m[idx] }))} style={{ marginLeft: "auto", fontSize: 12.5, fontWeight: 700, color: marked[idx] ? "#dc2626" : "#64748b", background: "none", border: "none", cursor: "pointer" }}>
              {marked[idx] ? "🚩 표시됨" : "🏳 표시"}
            </button>
          </div>
          <p style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.6, margin: "0 0 18px" }}>{it.prompt}</p>

          <div style={{ display: "grid", gap: 10 }}>
            {it.choices.map((c, ci) => {
              const on = answers[idx] === ci;
              return (
                <button key={ci} onClick={() => setAnswers((a) => ({ ...a, [idx]: ci }))} style={{ display: "flex", alignItems: "flex-start", gap: 12, textAlign: "left", padding: "13px 15px", borderRadius: 10, cursor: "pointer", border: `1.5px solid ${on ? accent : "#d8dee5"}`, background: on ? `${accent}12` : "#fff" }}>
                  <span style={{ flexShrink: 0, width: 26, height: 26, borderRadius: 999, display: "grid", placeItems: "center", fontWeight: 800, fontSize: 13, border: `1.5px solid ${on ? accent : "#cbd5e1"}`, color: on ? accent : "#64748b", background: on ? "#fff" : "transparent" }}>{LETTERS[ci]}</span>
                  <span style={{ fontSize: 14.5, lineHeight: 1.55, color: "#1e293b" }}>{c}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom nav */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 18px", borderTop: "1px solid #e6e8ec", background: "#fafbfc", gap: 10 }}>
        <button disabled={idx === 0} onClick={() => setIdx((i) => Math.max(0, i - 1))} style={{ fontSize: 14, fontWeight: 800, padding: "10px 18px", borderRadius: 9, border: "1px solid #d8dee5", background: "#fff", color: idx === 0 ? "#cbd5e1" : "#334155", cursor: idx === 0 ? "default" : "pointer" }}>
          ← 이전
        </button>
        {idx < total - 1 ? (
          <button onClick={() => setIdx((i) => Math.min(total - 1, i + 1))} style={{ fontSize: 14, fontWeight: 850, padding: "10px 22px", borderRadius: 9, border: "none", background: accent, color: "#fff", cursor: "pointer" }}>
            다음 →
          </button>
        ) : (
          <button onClick={submit} style={{ fontSize: 14, fontWeight: 850, padding: "10px 22px", borderRadius: 9, border: "none", background: "#0f172a", color: "#fff", cursor: "pointer" }}>
            제출하고 결과 보기 →
          </button>
        )}
      </div>
    </div>
  );
}
