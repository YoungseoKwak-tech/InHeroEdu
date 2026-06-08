"use client";

/**
 * /parents/diagnosis — 우리 아이 학습 진단. 12-question Korean quiz → one of
 * four learning profiles with 학부모 코칭 팁 + recommended InHero resources.
 * Pure client-side scoring; no login required (lead-magnet style).
 */

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { QUESTIONS, PROFILES, TYPE_ORDER, type TypeKey } from "./data";

const GREEN = "#00b85f";

export default function DiagnosisClient() {
  const router = useRouter();
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const total = QUESTIONS.length;
  const done = started && Object.keys(answers).length === total;

  const result = useMemo<TypeKey | null>(() => {
    if (!done) return null;
    const tally: Record<TypeKey, number> = { bigpicture: 0, builder: 0, sprinter: 0, explorer: 0 };
    for (const q of QUESTIONS) {
      const idx = answers[q.id];
      if (idx == null) continue;
      const sc = q.options[idx].scores;
      for (const k of Object.keys(sc) as TypeKey[]) tally[k] += sc[k] ?? 0;
    }
    // Highest score wins; tie broken by TYPE_ORDER.
    return TYPE_ORDER.reduce((best, k) => (tally[k] > tally[best] ? k : best), TYPE_ORDER[0]);
  }, [done, answers]);

  function pick(qid: string, oi: number) {
    setAnswers((a) => ({ ...a, [qid]: oi }));
    setTimeout(() => setStep((s) => Math.min(s + 1, total - 1)), 180);
  }

  function restart() {
    setAnswers({}); setStep(0); setStarted(false);
  }

  return (
    <div style={{ position: "relative", zIndex: 10, minHeight: "100vh", background: "#f7f8fa", color: "#1a1a1f", cursor: "auto" }}>
      {/* Top bar */}
      <div style={{ position: "sticky", top: 0, zIndex: 20, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)", borderBottom: "1px solid #e6e8ec" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/parents" style={{ color: "#475569", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>← 자료실</Link>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 15, letterSpacing: "-0.02em" }}>
            In<span style={{ color: GREEN }}>Hero</span> · 학부모
          </span>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "40px 20px 100px" }}>
        {!started ? (
          <Intro onStart={() => setStarted(true)} />
        ) : !done ? (
          <Quiz step={step} answers={answers} onPick={pick} onBack={() => setStep((s) => Math.max(0, s - 1))} />
        ) : (
          <Result type={result!} onRestart={restart} onGo={(r) => router.push(r)} />
        )}
      </div>
    </div>
  );
}

function Intro({ onStart }: { onStart: () => void }) {
  return (
    <div style={{ textAlign: "center" }}>
      <p style={{ fontSize: 13, fontWeight: 700, color: GREEN, letterSpacing: "0.04em", marginBottom: 10 }}>🧪 무료 학습 진단</p>
      <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.9rem,5vw,2.6rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.15, marginBottom: 14 }}>
        우리 아이 학습 진단
      </h1>
      <p style={{ fontSize: 15.5, color: "#475569", lineHeight: 1.8, maxWidth: 520, margin: "0 auto 8px" }}>
        12개의 짧은 질문으로 우리 아이의 <strong>학습 유형</strong>을 진단합니다. 강점과 보완점,
        그리고 <strong>학부모가 어떻게 도우면 좋은지</strong>까지 맞춤으로 알려드려요.
      </p>
      <p style={{ fontSize: 12.5, color: "#94a3b8", marginBottom: 30 }}>약 2분 · 로그인 없이 무료 · 자녀와 함께 답해도 좋아요</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, maxWidth: 460, margin: "0 auto 30px" }}>
        {TYPE_ORDER.map((k) => (
          <div key={k} style={{ background: "#fff", border: "1px solid #e6e8ec", borderRadius: 12, padding: "14px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 26 }}>{PROFILES[k].emoji}</div>
            <div style={{ fontSize: 13.5, fontWeight: 800, marginTop: 4 }}>{PROFILES[k].title}</div>
          </div>
        ))}
      </div>

      <button onClick={onStart} style={{ background: GREEN, color: "#fff", border: "none", borderRadius: 12, padding: "15px 40px", fontSize: 16, fontWeight: 800, cursor: "pointer", boxShadow: "0 10px 26px rgba(0,184,95,0.28)" }}>
        진단 시작하기 →
      </button>
    </div>
  );
}

function Quiz({ step, answers, onPick, onBack }: {
  step: number; answers: Record<string, number>;
  onPick: (qid: string, oi: number) => void; onBack: () => void;
}) {
  const q = QUESTIONS[step];
  const total = QUESTIONS.length;
  const picked = answers[q.id];
  return (
    <div>
      {/* Progress */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 22 }}>
        <button onClick={onBack} disabled={step === 0}
          style={{ background: "none", border: "none", cursor: step === 0 ? "default" : "pointer", color: step === 0 ? "#cbd5e1" : "#475569", fontSize: 20 }}>‹</button>
        <div style={{ flex: 1, height: 8, borderRadius: 999, background: "#e6e8ec", overflow: "hidden" }}>
          <div style={{ width: `${((step + (picked != null ? 1 : 0)) / total) * 100}%`, height: "100%", background: GREEN, transition: "width .25s" }} />
        </div>
        <span style={{ fontSize: 13, fontWeight: 800, color: "#94a3b8", fontFamily: "'JetBrains Mono', monospace", minWidth: 44, textAlign: "right" }}>{step + 1}/{total}</span>
      </div>

      <h2 style={{ fontSize: "clamp(1.2rem,3.4vw,1.6rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.4, marginBottom: 22 }}>{q.q}</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
        {q.options.map((o, oi) => {
          const on = picked === oi;
          return (
            <button key={oi} onClick={() => onPick(q.id, oi)}
              style={{ textAlign: "left", background: on ? "#f0fdf6" : "#fff", border: on ? `1.5px solid ${GREEN}` : "1px solid #e6e8ec", borderRadius: 12, padding: "16px 18px", fontSize: 15, color: "#1a1a1f", cursor: "pointer", lineHeight: 1.55, display: "flex", gap: 12, alignItems: "center", transition: "border-color .15s, background .15s" }}>
              <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: "50%", border: on ? `6px solid ${GREEN}` : "2px solid #cbd5e1", transition: "border .15s" }} />
              <span>{o.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Result({ type, onRestart, onGo }: { type: TypeKey; onRestart: () => void; onGo: (r: string) => void }) {
  const p = PROFILES[type];
  return (
    <div>
      {/* Header card */}
      <div style={{ background: "linear-gradient(150deg,#0a0a14,#1b1340 60%,#2d1a5e)", borderRadius: 18, padding: "32px 28px", textAlign: "center", boxShadow: "0 14px 36px rgba(20,10,50,0.25)", marginBottom: 20 }}>
        <p style={{ fontSize: 12.5, fontWeight: 800, color: "#c4b5fd", letterSpacing: "0.05em", margin: "0 0 12px" }}>우리 아이 학습 유형</p>
        <div style={{ fontSize: 52, lineHeight: 1 }}>{p.emoji}</div>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.7rem,5vw,2.4rem)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", margin: "12px 0 10px" }}>{p.title}</h1>
        <p style={{ fontSize: 14.5, color: "rgba(255,255,255,0.78)", lineHeight: 1.7, maxWidth: 460, margin: "0 auto" }}>{p.oneLiner}</p>
      </div>

      {/* Strengths / watchouts */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }} className="diag-sw">
        <Card title="💪 강점" color="#047a45" bg="#f0fdf6" border="#c8f2dc" items={p.strengths} />
        <Card title="🌱 보완하면 좋은 점" color="#9a3412" bg="#fff7ed" border="#fde0c0" items={p.watchouts} />
      </div>

      {/* Parent coaching */}
      <section style={{ background: "#fff", border: "1px solid #e6e8ec", borderRadius: 16, padding: "22px 24px", marginBottom: 20 }}>
        <h2 style={{ fontSize: 16.5, fontWeight: 800, margin: "0 0 14px" }}>👨‍👩‍👧 학부모 코칭 팁</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {p.parentTips.map((t, i) => (
            <div key={i} style={{ display: "flex", gap: 11, alignItems: "flex-start" }}>
              <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: "50%", background: "#ede9fe", color: "#6d28d9", fontSize: 12, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>{i + 1}</span>
              <span style={{ fontSize: 14, color: "#334155", lineHeight: 1.75 }}>{t}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Recommended resources */}
      <section style={{ background: "#fff", border: "1px solid #e6e8ec", borderRadius: 16, padding: "22px 24px", marginBottom: 24 }}>
        <h2 style={{ fontSize: 16.5, fontWeight: 800, margin: "0 0 6px" }}>📚 이 유형에 맞는 InHero 자료</h2>
        <p style={{ fontSize: 13, color: "#94a3b8", margin: "0 0 14px" }}>우리 아이 유형에 가장 잘 맞는 자료부터 시작해보세요.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          {p.recos.map((r) => (
            <button key={r.route} onClick={() => onGo(r.route)}
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, background: "#f7f8fa", border: "1px solid #eceef1", borderRadius: 10, padding: "13px 16px", cursor: "pointer", textAlign: "left" }}>
              <span style={{ fontSize: 14.5, fontWeight: 700, color: "#1a1a1f" }}>{r.label}</span>
              <span style={{ color: GREEN, fontWeight: 800 }}>→</span>
            </button>
          ))}
        </div>
      </section>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
        <button onClick={onRestart} style={{ background: "#fff", border: "1.5px solid #e2e6ea", color: "#475569", borderRadius: 10, padding: "13px 24px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>다시 진단하기</button>
        <button onClick={() => onGo("/parents")} style={{ background: "#1a1a1f", color: "#fff", border: "none", borderRadius: 10, padding: "13px 28px", fontSize: 14, fontWeight: 800, cursor: "pointer" }}>자료실로 가기 →</button>
      </div>

      <style>{`@media (max-width: 560px){ .diag-sw { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}

function Card({ title, color, bg, border, items }: { title: string; color: string; bg: string; border: string; items: string[] }) {
  return (
    <div style={{ background: bg, border: `1px solid ${border}`, borderRadius: 14, padding: "16px 18px" }}>
      <div style={{ fontSize: 14, fontWeight: 800, color, marginBottom: 10 }}>{title}</div>
      <ul style={{ margin: 0, paddingLeft: 16, display: "flex", flexDirection: "column", gap: 7 }}>
        {items.map((it) => <li key={it} style={{ fontSize: 13.5, color: "#334155", lineHeight: 1.6 }}>{it}</li>)}
      </ul>
    </div>
  );
}
