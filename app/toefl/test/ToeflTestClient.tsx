"use client";

/**
 * ToeflTestClient — real-format TOEFL iBT practice player.
 *   Reading / Listening → auto-graded MCQ (Listening plays via SpeechSynthesis).
 *   Speaking → prep + response timers with optional mic recording + playback.
 *   Writing → countdown + live word count (practice mode).
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { getToeflForm, toeflCounts, TOEFL_FORMS } from "@/lib/toefl/forms";
import type { ToeflMCQ, ToeflReadingSet, ToeflListeningSet, ToeflSpeakingTask, ToeflWritingTask } from "@/lib/toefl/types";
import { scaledScore, sectionBand, TOEFL_TIMING } from "@/lib/toefl/types";
import { getClientSession } from "@/lib/client-auth";
import CreditGate from "@/components/parents/CreditGate";
import CreditWidget from "@/components/parents/CreditWidget";
import { CREDIT_COSTS } from "@/lib/credits";
import { consumeMock, mockRemaining, mockTier, MOCK_PACK_LIMIT } from "@/lib/mockAccess";

const BLUE = "#1f6feb";
const LETTERS = ["A", "B", "C", "D", "E", "F"];
type View = "home" | "reading" | "listening" | "speaking" | "writing" | "full";

function fmt(sec: number) {
  const m = Math.max(0, Math.floor(sec / 60)), s = Math.max(0, sec % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function ToeflTestClient() {
  const [formId, setFormId] = useState<string | undefined>(undefined);
  const form = getToeflForm(formId);
  const counts = toeflCounts(form);
  const [view, setView] = useState<View>("home");
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    getClientSession().then((s) => setLoggedIn(!!s?.user)).catch(() => setLoggedIn(false));
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !loggedIn) return;
    const params = new URLSearchParams(window.location.search);
    const shouldOpenCharge = params.has("pay") || params.has("charge");
    if (!shouldOpenCharge) return;

    params.delete("pay");
    params.delete("charge");
    const nextQuery = params.toString();
    window.history.replaceState(null, "", `${window.location.pathname}${nextQuery ? `?${nextQuery}` : ""}${window.location.hash}`);

    const tier = mockTier("toefl");
    const rem = mockRemaining("toefl");
    if (tier === "none" || rem === 0) {
      const t = window.setTimeout(() => window.dispatchEvent(new Event("inhero:open-charge")), 250);
      return () => window.clearTimeout(t);
    }
  }, [mounted, loggedIn]);

  // Starting any SAT/TOEFL mock attempt consumes one of the 5-pack starts
  // (unlimited never decrements), so section practice cannot bypass payment.
  const startMock = (next: View) => {
    const r = consumeMock("toefl");
    if (r.ok) { setView(next); return; }
    if (r.reason === "exhausted") {
      window.alert("5회 이용권을 모두 사용했어요. '무제한' 이용권(500 크레딧)으로 업그레이드하면 계속 응시할 수 있어요.");
    }
    if (r.reason === "locked") {
      window.alert("TOEFL 모의고사 이용권이 필요해요. 200 크레딧 5회 또는 500 크레딧 무제한 중 선택해 주세요.");
    }
    window.dispatchEvent(new CustomEvent("inhero:open-charge"));
  };

  // Login required (like every other paid asset) before the test opens.
  if (loggedIn === null) return <Shell><div style={{ textAlign: "center", color: "#5b6b7b", padding: "40px 0" }}>확인 중…</div></Shell>;
  if (!loggedIn) {
    return (
      <Shell>
        <div style={{ maxWidth: 460, margin: "20px auto 0", textAlign: "center", background: "#fff", border: "1px solid #e6ebf0", borderRadius: 16, padding: "32px 26px" }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🔒</div>
          <h2 style={{ fontSize: 20, fontWeight: 850, margin: "0 0 8px" }}>로그인이 필요해요</h2>
          <p style={{ fontSize: 14, color: "#5b6b7b", lineHeight: 1.7, marginBottom: 18 }}>TOEFL 실전 모의고사는 로그인 후 이용할 수 있어요. 가입 시 웰컴 크레딧을 드립니다.</p>
          <button onClick={() => window.dispatchEvent(new CustomEvent("inhero:open-auth", { detail: { mode: "signup", redirectTo: "/toefl/test?pay=1" } }))} style={btnBlue}>로그인 / 가입하기 →</button>
        </div>
      </Shell>
    );
  }

  if (view === "home") {
    const cards: { key: View; tag: string; title: string; meta: string; color: string }[] = [
      { key: "reading", tag: "Reading", title: "독해", meta: `${form.reading.length}개 지문 · ${counts.reading}문항 · 35분 · 자동 채점`, color: "#1D9E75" },
      { key: "listening", tag: "Listening", title: "듣기", meta: `${form.listening.length}개 음원 · ${counts.listening}문항 · ~36분 · 음성 재생`, color: "#7DD3FC" },
      { key: "speaking", tag: "Speaking", title: "말하기", meta: `${counts.speaking}개 과제 · 16분 · 녹음 + 음성인식`, color: "#F59E0B" },
      { key: "writing", tag: "Writing", title: "쓰기", meta: `${counts.writing}개 과제 · 29분 · 타이머 + 단어 수`, color: "#A78BFA" },
    ];
    return (
      <Shell showCredits loggedIn={loggedIn}>
        <p style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "#94a3b8", fontWeight: 800, marginBottom: 8 }}>📝 TOEFL iBT · 실전 모드</p>
        <h1 style={{ fontSize: 26, fontWeight: 850, margin: "0 0 8px", letterSpacing: "-0.02em" }}>실제 토플처럼 풀어보세요</h1>
        <p style={{ color: "#5b6b7b", fontSize: 14.5, lineHeight: 1.7, marginBottom: 8 }}>{form.title} — Reading·Listening·Speaking·Writing 4개 섹션을 실제 시험 형식으로 연습합니다.</p>
        <div style={{ background: "#eef4ff", border: `1px solid ${BLUE}33`, borderRadius: 12, padding: "13px 15px", marginBottom: 20 }}>
          <p style={{ fontSize: 13, fontWeight: 800, color: "#1a3f8f", margin: "0 0 4px" }}>실제 시험 형식을 그대로 적용해 만든 실전 문항</p>
          <p style={{ fontSize: 12.5, color: "#3a4756", lineHeight: 1.65, margin: 0 }}>
            TOEFL iBT의 4개 섹션 구성, 8가지 독해 유형(사실·추론·어휘·문장 단순화·문장 삽입·요약 등)과 듣기 유형(요지·기능·태도·구조 등), 그리고 실제 시간 배분을 분석해, 같은 출제 원리로 새로 만든 오리지널 실전 문항입니다. (ETS 공식 기출 복제 아님)
          </p>
        </div>

        {TOEFL_FORMS.length > 1 && (
          <div style={{ marginBottom: 18 }}>
            <p style={{ fontSize: 12, fontWeight: 800, color: "#94a3b8", margin: "0 0 8px" }}>회차 선택</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {TOEFL_FORMS.map((f, i) => {
                const on = (formId ?? TOEFL_FORMS[0].id) === f.id;
                return (
                  <button key={f.id} onClick={() => setFormId(f.id)} style={{ padding: "8px 14px", borderRadius: 999, fontSize: 13, fontWeight: 800, cursor: "pointer", border: `1.5px solid ${on ? BLUE : "#d8dee5"}`, background: on ? "#eaf2ff" : "#fff", color: on ? BLUE : "#5b6b7b" }}>
                    Test {i + 1}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <CreditGate
          gateKey="parents:toefl-mock:5"
          cost={CREDIT_COSTS.MOCK_5PACK}
          bundleKey="parents:toefl-mock"
          bundleCost={CREDIT_COSTS.TOEFL_MOCK}
          bundleLabel="무제한"
          title="TOEFL 모의고사 이용권"
          desc="실제 TOEFL iBT와 동일한 형식(Reading·Listening·Speaking·Writing). 5회 이용권(200) 또는 무제한(500) 중 선택하세요."
          fullBlur
          allowAdminBypass={false}
        >
        {mounted && (() => {
          const tier = mockTier("toefl");
          const rem = mockRemaining("toefl");
          return (
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#f7f8fa", border: "1px solid #e6ebf0", borderRadius: 999, padding: "7px 14px", marginBottom: 14, fontSize: 12.5, fontWeight: 800 }}>
              {tier === "unlimited"
                ? <span style={{ color: "#047a45" }}>♾️ 무제한 이용권 · 횟수 제한 없음</span>
                : <span style={{ color: (rem ?? 0) > 0 ? "#b45309" : "#dc2626" }}>🎟️ 5회 이용권 · 남은 횟수 {rem ?? 0}/{MOCK_PACK_LIMIT}</span>}
            </div>
          );
        })()}
        <button onClick={() => startMock("full")} style={{ width: "100%", textAlign: "left", display: "flex", alignItems: "center", gap: 16, background: "linear-gradient(135deg,#0b1220,#1f3a5f)", color: "#fff", border: "none", borderRadius: 16, padding: "22px 22px", cursor: "pointer", marginBottom: 18 }}>
          <span style={{ fontSize: 26, flexShrink: 0 }}>🎯</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 850, fontSize: 18 }}>전체 시험 (Full Test)</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginTop: 3 }}>Reading → Listening → Speaking → Writing 순서대로 · 총점 120점 환산 + 루브릭 자가채점</div>
          </div>
          <span style={{ color: "#7DD3FC", fontWeight: 800, fontSize: 14 }}>시작 →</span>
        </button>

        <p style={{ fontSize: 12, fontWeight: 800, color: "#94a3b8", margin: "4px 2px 10px" }}>또는 섹션별 연습</p>
        <div style={{ display: "grid", gap: 14 }}>
          {cards.map((c) => (
            <button key={c.key} onClick={() => startMock(c.key)} style={{ textAlign: "left", display: "flex", alignItems: "center", gap: 16, background: "#fff", border: "1px solid #e6ebf0", borderRadius: 14, padding: "20px 20px", cursor: "pointer" }}>
              <span style={{ fontSize: 12, fontWeight: 900, color: "#fff", background: c.color, borderRadius: 8, padding: "6px 11px", flexShrink: 0 }}>{c.tag}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: 17 }}>{c.title}</div>
                <div style={{ color: "#5b6b7b", fontSize: 13, marginTop: 3 }}>{c.meta}</div>
              </div>
              <span style={{ color: c.color, fontWeight: 800, fontSize: 14 }}>시작 →</span>
            </button>
          ))}
        </div>
        </CreditGate>
      </Shell>
    );
  }
  const home = () => setView("home");
  if (view === "reading") return <ReadingFlow sets={form.reading} onDone={home} />;
  if (view === "listening") return <ListeningFlow sets={form.listening} onDone={home} />;
  if (view === "speaking") return <SpeakingFlow tasks={form.speaking} onDone={home} />;
  if (view === "writing") return <WritingFlow tasks={form.writing} onDone={home} />;
  return <FullTest form={form} onExit={home} />;
}

// Per-section intro shown before each section in the full test (real TOEFL has
// a directions screen before every section).
const SECTION_INTRO: Record<string, { name: string; emoji: string; lines: string[] }> = {
  reading: { name: "Reading Section", emoji: "📖", lines: ["지문 2개 · 각 10문항 (총 20문항) · 35분", "실제 시험처럼 대학 교재 수준의 학술 지문을 읽고 객관식에 답하세요. 제출 후 정답·해설이 공개됩니다.", "한 섹션 안에서 자유롭게 문항을 오갈 수 있어요."] },
  listening: { name: "Listening Section", emoji: "🎧", lines: ["대화 2 + 강의 3 · 총 28문항 · 약 36분", "음원을 듣고(메모 가능) 객관식에 답하세요. 실제 시험처럼 들으면서 풀 준비를 하세요.", "음원은 채점 후 스크립트가 공개됩니다."] },
  speaking: { name: "Speaking Section", emoji: "🎙", lines: ["4개 과제 (독립 1 + 통합 3) · 약 16분", "준비 15–30초 후 45–60초 응답. 마이크를 허용하면 음성 인식으로 전사되고, 루브릭으로 자가 채점합니다.", "조용한 곳에서 진행하세요."] },
  writing: { name: "Writing Section", emoji: "✍️", lines: ["2개 과제 (통합 + 학술 토론) · 약 29분", "제한 시간 안에 작성하고 단어 수를 확인하며, 루브릭으로 자가 채점합니다.", "Integrated는 본인 의견이 아니라 강의 내용을 요약하세요."] },
};

// ── FULL TEST — sequence all four sections, then a /120 report ────────────────
function FullTest({ form, onExit }: { form: ReturnType<typeof getToeflForm>; onExit: () => void }) {
  const order = ["reading", "listening", "speaking", "writing"] as const;
  const [step, setStep] = useState(0);
  const [intro, setIntro] = useState(true);
  const [scores, setScores] = useState<(number | null)[]>([null, null, null, null]);

  function advance(scaled: number | null) {
    setScores((prev) => { const n = [...prev]; n[step] = scaled; return n; });
    setStep((s) => s + 1);
    setIntro(true);
    window.scrollTo({ top: 0 });
  }

  if (step >= 4) {
    const labels = ["Reading", "Listening", "Speaking", "Writing"];
    const known = scores.filter((s): s is number => s != null);
    const total = known.reduce((a, b) => a + b, 0);
    return (
      <Shell>
        <div style={{ maxWidth: 600, margin: "6px auto 0", textAlign: "center" }}>
          <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 10 }}>TOEFL iBT · 전체 결과</div>
          <div style={{ background: "#0b1220", color: "#fff", borderRadius: 18, padding: "28px 24px", marginBottom: 16 }}>
            <div style={{ fontSize: 13, color: "#7DD3FC", fontWeight: 700 }}>총점 (추정)</div>
            <div style={{ fontSize: 56, fontWeight: 900, margin: "4px 0 0" }}>{total}<span style={{ fontSize: 24, color: "rgba(255,255,255,0.5)" }}> / 120</span></div>
          </div>
          <div style={{ display: "grid", gap: 10, marginBottom: 18 }}>
            {labels.map((l, i) => (
              <div key={l} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fff", border: "1px solid #e6ebf0", borderRadius: 12, padding: "13px 16px" }}>
                <span style={{ fontWeight: 700 }}>{l}</span>
                <span style={{ fontWeight: 800, color: BLUE }}>{scores[i] == null ? "미채점" : `${scores[i]} / 30`}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.6, marginBottom: 16 }}>※ Reading·Listening은 정답률 환산, Speaking·Writing은 루브릭 자가채점 기반 추정치입니다. 실제 TOEFL 환산표와 다를 수 있어요.</p>
          <button onClick={onExit} style={btnBlue}>처음으로 →</button>
        </div>
      </Shell>
    );
  }

  const cur = order[step];
  const banner = (
    <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
      {order.map((o, i) => (
        <div key={o} style={{ flex: 1, height: 5, borderRadius: 999, background: i < step ? "#1D9E75" : i === step ? BLUE : "#e2e6ea" }} />
      ))}
    </div>
  );

  if (intro) {
    const meta = SECTION_INTRO[cur];
    return (
      <Shell>
        {banner}
        <div style={{ maxWidth: 560, margin: "8px auto 0", textAlign: "center" }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#94a3b8", marginBottom: 6 }}>전체 시험 · {step + 1}/4</div>
          <div style={{ background: "#fff", border: "1px solid #e6ebf0", borderRadius: 18, padding: "30px 26px" }}>
            <div style={{ fontSize: 44 }}>{meta.emoji}</div>
            <h2 style={{ fontSize: 22, fontWeight: 850, margin: "8px 0 14px" }}>{meta.name}</h2>
            <ul style={{ textAlign: "left", margin: "0 auto", maxWidth: 420, padding: 0, listStyle: "none", display: "grid", gap: 8 }}>
              {meta.lines.map((l, i) => (
                <li key={i} style={{ display: "flex", gap: 8, fontSize: 14, color: "#3a4756", lineHeight: 1.6 }}><span style={{ color: BLUE }}>•</span>{l}</li>
              ))}
            </ul>
          </div>
          {step === 2 && (
            <div style={{ marginTop: 14, background: "#fffbeb", border: "1px solid #f1d27a", borderRadius: 12, padding: "12px 16px", fontSize: 13, color: "#7a5b16", lineHeight: 1.6 }}>
              ☕ 실제 시험에서는 Listening 직후 약 10분의 휴식이 있습니다. 잠시 쉬었다가 시작하세요.
            </div>
          )}
          <button onClick={() => { setIntro(false); window.scrollTo({ top: 0 }); }} style={{ ...btnBlue, marginTop: 18 }}>{meta.name} 시작 →</button>
        </div>
      </Shell>
    );
  }

  return (
    <div>
      <div style={{ background: "#0b1220", color: "#fff", textAlign: "center", fontSize: 12.5, fontWeight: 700, padding: "8px" }}>
        전체 시험 · {step + 1}/4 — {cur === "reading" ? "Reading" : cur === "listening" ? "Listening" : cur === "speaking" ? "Speaking" : "Writing"} 섹션
      </div>
      {cur === "reading" && <ReadingFlow sets={form.reading} onDone={advance} banner={banner} />}
      {cur === "listening" && <ListeningFlow sets={form.listening} onDone={advance} banner={banner} />}
      {cur === "speaking" && <SpeakingFlow tasks={form.speaking} onDone={advance} banner={banner} />}
      {cur === "writing" && <WritingFlow tasks={form.writing} onDone={advance} banner={banner} />}
    </div>
  );
}

function Shell({ children, showCredits = false, loggedIn = false }: { children: React.ReactNode; showCredits?: boolean; loggedIn?: boolean }) {
  return (
    <div style={{ minHeight: "100vh", background: "#f6f8fa", color: "#1d2733" }}>
      <div style={{ height: 56, borderBottom: "1px solid #e6ebf0", display: "flex", alignItems: "center", padding: "0 18px", background: "#fff" }}>
        <Link href="/toefl" style={{ color: "#475569", textDecoration: "none", fontWeight: 600, fontSize: 14 }}>← TOEFL</Link>
        <div style={{ flex: 1, textAlign: "center", fontWeight: 800 }}>TOEFL iBT 실전 모드</div>
        {showCredits ? <CreditWidget loggedIn={loggedIn} /> : <div style={{ width: 60 }} />}
      </div>
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "28px 20px 90px" }}>{children}</div>
    </div>
  );
}

function Timer({ remaining }: { remaining: number }) {
  return <span style={{ fontWeight: 800, fontSize: 16, color: remaining < 60 ? "#c0392b" : "#1d2733", fontVariantNumeric: "tabular-nums" }}>⏱ {fmt(remaining)}</span>;
}

// ── Shared MCQ grading for Reading & Listening ───────────────────────────────
function gradeMCQ(q: ToeflMCQ, ans: number[] | undefined): boolean {
  if (!ans || ans.length === 0) return false;
  if (q.correctSet) {
    const want = [...q.correctSet].sort().join(",");
    const got = [...ans].sort().join(",");
    return want === got;
  }
  return ans.length === 1 && ans[0] === q.correct;
}

function QuestionBlock({
  q, idx, answer, onAnswer, reveal,
}: { q: ToeflMCQ; idx: number; answer: number[] | undefined; onAnswer: (a: number[]) => void; reveal: boolean }) {
  const multi = !!q.correctSet;
  const sel = answer ?? [];
  const correctIdxs = q.correctSet ?? [q.correct];
  function toggle(i: number) {
    if (reveal) return;
    if (multi) {
      const next = sel.includes(i) ? sel.filter((x) => x !== i) : [...sel, i].slice(-3);
      onAnswer(next);
    } else onAnswer([i]);
  }
  return (
    <div style={{ border: "1px solid #e6ebf0", borderRadius: 14, padding: "16px 18px", marginBottom: 14, background: "#fff" }}>
      {q.qtype && (
        <span style={{ display: "inline-block", fontSize: 11, fontWeight: 800, color: "#475569", background: "#eef2f7", borderRadius: 999, padding: "3px 9px", marginBottom: 8 }}>{q.qtype}</span>
      )}
      <p style={{ fontWeight: 700, fontSize: 15, lineHeight: 1.6, margin: "0 0 12px", whiteSpace: "pre-wrap" }}>
        <span style={{ color: BLUE, fontWeight: 800 }}>{idx + 1}. </span>{q.prompt}
        {multi && <span style={{ color: "#94a3b8", fontWeight: 700, fontSize: 12 }}>  (3개 선택)</span>}
      </p>
      <div style={{ display: "grid", gap: 8 }}>
        {q.choices.map((c, i) => {
          const chosen = sel.includes(i);
          const isCorrect = correctIdxs.includes(i);
          let bg = "#fff", bd = "#d0d7de";
          if (reveal) {
            if (isCorrect) { bg = "#e6f6ee"; bd = "#0f7b53"; }
            else if (chosen) { bg = "#fdecec"; bd = "#e0a3a3"; }
          } else if (chosen) { bg = "#eaf2ff"; bd = BLUE; }
          return (
            <button key={i} type="button" onClick={() => toggle(i)} disabled={reveal}
              style={{ textAlign: "left", display: "flex", gap: 12, alignItems: "flex-start", padding: "11px 13px", border: `1.5px solid ${bd}`, background: bg, borderRadius: 10, cursor: reveal ? "default" : "pointer" }}>
              <span style={{ fontWeight: 800, color: chosen && !reveal ? BLUE : "#57606a", flexShrink: 0 }}>{LETTERS[i]}</span>
              <span style={{ fontSize: 14.5, lineHeight: 1.55 }}>{c}</span>
              {reveal && isCorrect && <span style={{ marginLeft: "auto", color: "#0f7b53", fontWeight: 800, fontSize: 13 }}>정답</span>}
            </button>
          );
        })}
      </div>
      {reveal && (
        <div style={{ marginTop: 12, background: "#f6f8fa", borderRadius: 10, padding: "11px 13px", fontSize: 13.5, lineHeight: 1.65, color: "#3a4756" }}>
          <b>해설 </b>{q.explanation}
        </div>
      )}
    </div>
  );
}

// ── Section score report (Reading / Listening) ───────────────────────────────
function SectionReport({ label, correct, total, onDone }: { label: string; correct: number; total: number; onDone: (scaled: number) => void }) {
  const scaled = scaledScore(correct, total);
  return (
    <Shell>
      <div style={{ maxWidth: 560, margin: "10px auto 0", textAlign: "center" }}>
        <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 10 }}>{label} 섹션 결과</div>
        <div style={{ background: "#fff", border: "1px solid #e6ebf0", borderRadius: 18, padding: "28px 24px" }}>
          <div style={{ fontSize: 14, color: "#5b6b7b", fontWeight: 700 }}>정답 {correct} / {total}</div>
          <div style={{ fontSize: 52, fontWeight: 900, color: BLUE, margin: "6px 0 2px" }}>{scaled}<span style={{ fontSize: 22, color: "#9aa6b2" }}> / 30</span></div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#3a4756" }}>{sectionBand(scaled)}</div>
          <p style={{ fontSize: 12.5, color: "#94a3b8", marginTop: 12, lineHeight: 1.6 }}>※ 30점 환산은 정답률 기반 추정치입니다. 실제 TOEFL 환산표와 다를 수 있어요.</p>
        </div>
        <button onClick={() => onDone(scaled)} style={{ ...btnBlue, marginTop: 18 }}>계속 →</button>
      </div>
    </Shell>
  );
}

// ── READING (one 35-min section timer across all passages) ───────────────────
function ReadingFlow({ sets, onDone, banner }: { sets: ToeflReadingSet[]; onDone: (scaled: number) => void; banner?: React.ReactNode }) {
  const [si, setSi] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number[]>>({});
  const [reviewed, setReviewed] = useState<Record<number, boolean>>({});
  const [done, setDone] = useState(false);
  const [remaining, setRemaining] = useState(TOEFL_TIMING.readingSectionSec);
  const set = sets[si];
  const submitted = !!reviewed[si];

  useEffect(() => {
    if (done) return;
    const id = setInterval(() => setRemaining((r) => { if (r <= 1) { clearInterval(id); setDone(true); return 0; } return r - 1; }), 1000);
    return () => clearInterval(id);
  }, [done]);

  const totalCorrect = sets.reduce((n, s) => n + s.questions.reduce((m, q) => m + (gradeMCQ(q, answers[q.id]) ? 1 : 0), 0), 0);
  const totalQ = sets.reduce((n, s) => n + s.questions.length, 0);
  const passageScore = set.questions.reduce((n, q) => n + (gradeMCQ(q, answers[q.id]) ? 1 : 0), 0);

  if (done) return <SectionReport label="Reading" correct={totalCorrect} total={totalQ} onDone={onDone} />;

  function next() {
    if (si < sets.length - 1) { setSi(si + 1); window.scrollTo({ top: 0 }); }
    else setDone(true);
  }

  return (
    <Shell>
      {banner}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <button onClick={() => setDone(true)} style={btnOutline}>채점·종료</button>
        <span style={{ fontWeight: 800 }}>Reading · 지문 {si + 1}/{sets.length}</span>
        {!submitted ? <Timer remaining={remaining} /> : <span style={{ fontWeight: 800, color: BLUE }}>{passageScore} / {set.questions.length}</span>}
      </div>
      <div className="toefl-read" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, alignItems: "start" }}>
        <div style={{ position: "sticky", top: 12, maxHeight: "calc(100vh - 120px)", overflowY: "auto", background: "#fff", border: "1px solid #e6ebf0", borderRadius: 14, padding: "18px 20px" }}>
          <h2 style={{ fontSize: 16, fontWeight: 800, margin: "0 0 12px" }}>{set.title}</h2>
          <div style={{ fontSize: 14.5, lineHeight: 1.85, color: "#243240", whiteSpace: "pre-wrap" }}>{set.passage}</div>
        </div>
        <div>
          {set.questions.map((q, i) => (
            <QuestionBlock key={q.id} q={q} idx={i} answer={answers[q.id]} reveal={submitted} onAnswer={(a) => setAnswers((m) => ({ ...m, [q.id]: a }))} />
          ))}
          {!submitted
            ? <button onClick={() => { setReviewed((r) => ({ ...r, [si]: true })); window.scrollTo({ top: 0 }); }} style={btnBlue}>제출하고 채점 →</button>
            : <button onClick={next} style={btnBlue}>{si < sets.length - 1 ? "다음 지문 →" : "섹션 결과 보기 →"}</button>}
        </div>
      </div>
      <style jsx>{`@media (max-width: 820px){ .toefl-read{ grid-template-columns: 1fr !important; } }`}</style>
    </Shell>
  );
}

// Multi-voice playback: assigns a distinct voice per speaker (Narrator,
// Professor, Student, Librarian…) so conversations sound like two people.
function speakTranscript(transcript: string, onEnd: () => void): void {
  const synth = window.speechSynthesis;
  synth.cancel();
  const all = synth.getVoices?.() ?? [];
  const voices = all.filter((v) => /^en[-_]/i.test(v.lang));
  const pool = voices.length ? voices : all;
  const speakerVoice: Record<string, SpeechSynthesisVoice | undefined> = {};
  let vi = 0;
  const lines = transcript.split(/\n+/).map((l) => l.trim()).filter(Boolean);
  const utts: SpeechSynthesisUtterance[] = [];
  for (const line of lines) {
    const m = line.match(/^([A-Za-z]+):\s*(.*)$/);
    const speaker = m ? m[1] : "_";
    const text = (m ? m[2] : line).trim();
    if (!text) continue;
    if (!(speaker in speakerVoice)) { speakerVoice[speaker] = pool[vi % Math.max(1, pool.length)]; vi++; }
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US"; u.rate = speaker === "Narrator" ? 1 : 0.94;
    const v = speakerVoice[speaker]; if (v) u.voice = v;
    utts.push(u);
  }
  if (utts.length === 0) { onEnd(); return; }
  utts[utts.length - 1].onend = onEnd;
  for (const u of utts) synth.speak(u);
}

// ── LISTENING ─────────────────────────────────────────────────────────────────
function ListeningFlow({ sets, onDone, banner }: { sets: ToeflListeningSet[]; onDone: (scaled: number) => void; banner?: React.ReactNode }) {
  const [si, setSi] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number[]>>({});
  const [submitted, setSubmitted] = useState(false);
  const [played, setPlayed] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [done, setDone] = useState(false);
  const set = sets[si];

  const stop = useCallback(() => { try { window.speechSynthesis?.cancel(); } catch { /* ignore */ } setSpeaking(false); }, []);
  useEffect(() => () => stop(), [stop]);
  // Warm up the voice list (some browsers populate it lazily).
  useEffect(() => { try { window.speechSynthesis?.getVoices(); } catch { /* ignore */ } }, []);

  const totalCorrect = sets.reduce((n, s) => n + s.questions.reduce((m, q) => m + (gradeMCQ(q, answers[q.id]) ? 1 : 0), 0), 0);
  const totalQ = sets.reduce((n, s) => n + s.questions.length, 0);
  if (done) return <SectionReport label="Listening" correct={totalCorrect} total={totalQ} onDone={onDone} />;

  function play() {
    try { setSpeaking(true); setPlayed(true); speakTranscript(set.transcript, () => setSpeaking(false)); }
    catch { setPlayed(true); }
  }

  const score = set.questions.reduce((n, q) => n + (gradeMCQ(q, answers[q.id]) ? 1 : 0), 0);
  function next() {
    stop();
    if (si < sets.length - 1) { setSi(si + 1); setSubmitted(false); setPlayed(false); window.scrollTo({ top: 0 }); }
    else setDone(true);
  }

  return (
    <Shell>
      {banner}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <button onClick={() => { stop(); setDone(true); }} style={btnOutline}>채점·종료</button>
        <span style={{ fontWeight: 800 }}>Listening · {si + 1}/{sets.length}</span>
        {submitted ? <span style={{ fontWeight: 800, color: BLUE }}>{score} / {set.questions.length}</span> : <span />}
      </div>

      <div style={{ background: "#0b1220", color: "#e8edf4", borderRadius: 16, padding: "22px 22px", marginBottom: 18, textAlign: "center" }}>
        <div style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: "#7DD3FC", fontWeight: 800, marginBottom: 6 }}>{set.kind === "conversation" ? "🎧 Conversation" : "🎧 Lecture"}</div>
        <div style={{ fontWeight: 800, fontSize: 17, marginBottom: 14 }}>{set.title}</div>
        <button onClick={speaking ? stop : play} style={{ background: "#7DD3FC", color: "#0b1220", border: "none", borderRadius: 999, padding: "12px 26px", fontWeight: 800, fontSize: 15, cursor: "pointer" }}>
          {speaking ? "⏹ 정지" : played ? "▶ 다시 듣기" : "▶ 음원 재생"}
        </button>
        <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 12 }}>실제 시험처럼 듣고 메모하세요. 음원은 끝난 뒤 스크립트가 공개됩니다.</p>
      </div>

      {set.questions.map((q, i) => (
        <QuestionBlock key={q.id} q={q} idx={i} answer={answers[q.id]} reveal={submitted} onAnswer={(a) => setAnswers((m) => ({ ...m, [q.id]: a }))} />
      ))}

      {submitted && (
        <details style={{ marginBottom: 16, background: "#fff", border: "1px solid #e6ebf0", borderRadius: 12, padding: "12px 16px" }}>
          <summary style={{ cursor: "pointer", fontWeight: 800, fontSize: 14 }}>📄 스크립트 보기</summary>
          <div style={{ fontSize: 14, lineHeight: 1.8, color: "#3a4756", marginTop: 10, whiteSpace: "pre-wrap" }}>{set.transcript}</div>
        </details>
      )}

      {!submitted
        ? <button onClick={() => { stop(); setSubmitted(true); window.scrollTo({ top: 0 }); }} style={btnBlue} disabled={!played}>{played ? "제출하고 채점 →" : "먼저 음원을 들어주세요"}</button>
        : <button onClick={next} style={btnBlue}>{si < sets.length - 1 ? "다음 음원 →" : "섹션 결과 보기 →"}</button>}
    </Shell>
  );
}

// ── Local rubric self-scoring panel (no AI) ──────────────────────────────────
function avgScaled(scores: number[]): number | null {
  if (scores.length === 0) return null;
  return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
}

const CONNECTIVES = ["however", "because", "for example", "for instance", "although", "while", "in contrast", "therefore", "moreover", "in addition", "on the other hand", "as a result", "first", "second", "finally", "furthermore", "so that"];

function countWords(s: string) { return s.trim() ? s.trim().split(/\s+/).length : 0; }
function foundConnectives(s: string) {
  const low = s.toLowerCase();
  return CONNECTIVES.filter((c) => low.includes(c));
}

/**
 * RubricPanel — objective metrics computed locally + the official rubric as a
 * self-check. The number of boxes the user ticks gives a band → 0–30 scaled.
 * No external API.
 */
function RubricPanel({ kind, variant, minWords, response, onScore }: {
  kind: "speaking" | "writing"; variant: "independent" | "integrated" | "discussion"; minWords: number; response: string; onScore: (scaled: number) => void;
}) {
  const items = kind === "writing"
    ? [
        variant === "integrated" ? "강의의 핵심 반박 포인트를 (가능하면 3가지) 정확히 요약했다" : "내 입장을 첫 문장에서 분명히 밝혔다",
        variant === "integrated" ? "각 포인트가 읽기 지문의 주장과 어떻게 연결되는지 설명했다" : "이유와 구체적인 예시로 충분히 뒷받침했다",
        "글의 구조가 논리적이다 (도입–전개–정리, 연결어 사용)",
        "문법·철자가 대체로 정확하고 어휘가 다양하다",
        "요구 분량을 채웠다",
      ]
    : [
        "질문에 직접 답하고 입장/요지를 분명히 했다",
        variant === "independent" ? "두 가지 이유와 예시로 전개했다" : "읽기/듣기의 핵심 내용을 정확히 반영했다",
        "큰 멈춤 없이 비교적 유창하게 말했다",
        "주어진 응답 시간을 충분히 활용했다",
      ];
  const bandMax = items.length; // writing 5, speaking 4
  const [checked, setChecked] = useState<boolean[]>(() => items.map(() => false));

  const words = countWords(response);
  const conns = foundConnectives(response);
  const enoughLen = words >= minWords;

  function toggle(i: number) {
    setChecked((prev) => {
      const next = [...prev]; next[i] = !next[i];
      const band = next.filter(Boolean).length;
      onScore(Math.round((band / bandMax) * 30));
      return next;
    });
  }
  const band = checked.filter(Boolean).length;
  const scaled = Math.round((band / bandMax) * 30);

  return (
    <div style={{ background: "#fff", border: `1px solid ${BLUE}33`, borderRadius: 14, padding: "16px 18px" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 12 }}>
        <span style={{ fontSize: 13, fontWeight: 800, color: "#94a3b8" }}>📋 자가 채점 (루브릭)</span>
        <span style={{ fontSize: 28, fontWeight: 900, color: BLUE }}>{band}<span style={{ fontSize: 15, color: "#9aa6b2" }}>/{bandMax}</span></span>
        <span style={{ fontSize: 13, color: "#5b6b7b", fontWeight: 700 }}>≈ {scaled}/30</span>
      </div>

      {/* Objective auto-metrics (computed locally) */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
        <span style={chip(enoughLen)}>{enoughLen ? "✓" : "✗"} {kind === "writing" ? "분량" : "발화량"} {words}{kind === "writing" ? "단어" : "단어"} (목표 {minWords}+)</span>
        <span style={chip(conns.length >= 2)}>{conns.length >= 2 ? "✓" : "✗"} 연결어 {conns.length}개{conns.length ? ` (${conns.slice(0, 3).join(", ")})` : ""}</span>
      </div>

      <div style={{ fontSize: 12.5, fontWeight: 800, color: "#475569", marginBottom: 8 }}>아래 항목을 스스로 평가해 체크하세요 (TOEFL 루브릭 기준)</div>
      <div style={{ display: "grid", gap: 8 }}>
        {items.map((it, i) => (
          <button key={i} type="button" onClick={() => toggle(i)} style={{ textAlign: "left", display: "flex", gap: 10, alignItems: "flex-start", padding: "10px 12px", borderRadius: 10, cursor: "pointer", border: `1.5px solid ${checked[i] ? "#0f7b53" : "#d0d7de"}`, background: checked[i] ? "#e6f6ee" : "#fff" }}>
            <span style={{ flexShrink: 0, width: 20, height: 20, borderRadius: 6, display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 13, color: "#fff", background: checked[i] ? "#0f7b53" : "#cbd5e1" }}>{checked[i] ? "✓" : ""}</span>
            <span style={{ fontSize: 13.5, lineHeight: 1.5, color: "#243240" }}>{it}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
function chip(ok: boolean): React.CSSProperties {
  return { fontSize: 12, fontWeight: 700, color: ok ? "#0f7b53" : "#a16207", background: ok ? "#e6f6ee" : "#fffbeb", border: `1px solid ${ok ? "#0f7b53" : "#f1d27a"}`, borderRadius: 999, padding: "4px 10px" };
}

// ── SPEAKING (prep + response timers, mic recording, speech-to-text, AI score) ─
function SpeakingFlow({ tasks, onDone, banner }: { tasks: ToeflSpeakingTask[]; onDone: (scaled: number | null) => void; banner?: React.ReactNode }) {
  const [ti, setTi] = useState(0);
  const [phase, setPhase] = useState<"ready" | "prep" | "respond" | "done">("ready");
  const [remaining, setRemaining] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [transcript, setTranscript] = useState("");
  const [taskScores, setTaskScores] = useState<Record<number, number>>({});
  const recRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const recogRef = useRef<{ stop: () => void } | null>(null);
  const finalRef = useRef("");
  const task = tasks[ti];

  const stopRec = useCallback(() => {
    try { if (recRef.current?.state === "recording") recRef.current.stop(); } catch { /* ignore */ }
    try { recogRef.current?.stop(); } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    if (phase !== "prep" && phase !== "respond") return;
    const id = setInterval(() => setRemaining((r) => {
      if (r <= 1) {
        clearInterval(id);
        if (phase === "prep") startRespond();
        else { stopRec(); setPhase("done"); }
        return 0;
      }
      return r - 1;
    }), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  function startRecognition() {
    const SR = (window as unknown as { webkitSpeechRecognition?: new () => unknown; SpeechRecognition?: new () => unknown });
    const Ctor = SR.webkitSpeechRecognition || SR.SpeechRecognition;
    if (!Ctor) return;
    try {
      const rec = new Ctor() as {
        lang: string; continuous: boolean; interimResults: boolean;
        onresult: (e: { resultIndex: number; results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal: boolean }> }) => void;
        start: () => void; stop: () => void;
      };
      rec.lang = "en-US"; rec.continuous = true; rec.interimResults = true;
      finalRef.current = "";
      rec.onresult = (e) => {
        let interim = "";
        for (let i = e.resultIndex; i < e.results.length; i++) {
          const res = e.results[i];
          if (res.isFinal) finalRef.current += res[0].transcript + " ";
          else interim += res[0].transcript;
        }
        setTranscript((finalRef.current + interim).trim());
      };
      recogRef.current = rec; rec.start();
    } catch { /* not supported → user can type instead */ }
  }

  async function startRespond() {
    setPhase("respond"); setRemaining(task.respSec);
    startRecognition();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      chunksRef.current = [];
      const rec = new MediaRecorder(stream);
      rec.ondataavailable = (e) => { if (e.data.size) chunksRef.current.push(e.data); };
      rec.onstop = () => { setAudioUrl(URL.createObjectURL(new Blob(chunksRef.current, { type: "audio/webm" }))); stream.getTracks().forEach((t) => t.stop()); };
      recRef.current = rec; rec.start();
    } catch { /* mic denied → timer + (maybe) recognition only */ }
  }

  function begin() { setAudioUrl(null); setTranscript(""); finalRef.current = ""; setPhase("prep"); setRemaining(task.prepSec); }
  function nextTask() {
    setAudioUrl(null); setTranscript(""); setPhase("ready");
    if (ti < tasks.length - 1) setTi(ti + 1); else onDone(avgScaled(Object.values(taskScores)));
  }

  return (
    <Shell>
      {banner}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <button onClick={() => { stopRec(); onDone(avgScaled(Object.values(taskScores))); }} style={btnOutline}>채점·종료</button>
        <span style={{ fontWeight: 800 }}>Speaking · Task {task.n}/{tasks.length}</span>
        {(phase === "prep" || phase === "respond") ? <Timer remaining={remaining} /> : <span />}
      </div>

      {task.readingText && (
        <div style={{ background: "#eef4ff", border: `1px solid ${BLUE}33`, borderRadius: 12, padding: "14px 16px", marginBottom: 14, fontSize: 14, lineHeight: 1.7, color: "#243240", whiteSpace: "pre-wrap" }}>{task.readingText}</div>
      )}
      <div style={{ background: "#fff", border: "1px solid #e6ebf0", borderRadius: 14, padding: "18px 20px", marginBottom: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 800, color: "#F59E0B", marginBottom: 8 }}>{task.type === "independent" ? "Independent" : "Integrated"} · 준비 {task.prepSec}초 · 응답 {task.respSec}초</div>
        <p style={{ fontSize: 16, lineHeight: 1.7, fontWeight: 600, margin: 0 }}>{task.prompt}</p>
      </div>

      {phase === "ready" && <button onClick={begin} style={btnBlue}>준비 시작 →</button>}
      {phase === "prep" && (
        <div style={{ textAlign: "center", background: "#fffbeb", border: "1px solid #f1d27a", borderRadius: 14, padding: "26px" }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#a16207", marginBottom: 6 }}>준비 시간</div>
          <div style={{ fontSize: 40, fontWeight: 900, color: "#a16207" }}>{fmt(remaining)}</div>
          <button onClick={startRespond} style={{ ...btnOutline, marginTop: 14 }}>바로 응답 시작 →</button>
        </div>
      )}
      {phase === "respond" && (
        <div style={{ textAlign: "center", background: "#fdecec", border: "1px solid #e0a3a3", borderRadius: 14, padding: "26px" }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#c0392b", marginBottom: 6 }}>🔴 답변 녹음 중 — 지금 말하세요</div>
          <div style={{ fontSize: 40, fontWeight: 900, color: "#c0392b" }}>{fmt(remaining)}</div>
          {transcript && <p style={{ fontSize: 13, color: "#7a3b3b", marginTop: 12, lineHeight: 1.5, textAlign: "left" }}>{transcript}</p>}
          <button onClick={() => { stopRec(); setPhase("done"); }} style={{ ...btnOutline, marginTop: 14 }}>응답 종료 →</button>
        </div>
      )}
      {phase === "done" && (
        <div style={{ background: "#fff", border: "1px solid #e6ebf0", borderRadius: 14, padding: "18px 20px" }}>
          <div style={{ fontWeight: 800, marginBottom: 10 }}>✅ 응답 완료</div>
          {audioUrl && <audio controls src={audioUrl} style={{ width: "100%", marginBottom: 12 }} />}
          <div style={{ fontSize: 12.5, fontWeight: 800, color: "#5b6b7b", marginBottom: 6 }}>📝 음성 인식 전사 (필요하면 직접 수정 후 채점)</div>
          <textarea value={transcript} onChange={(e) => setTranscript(e.target.value)} placeholder="음성 인식이 안 되면 말한 내용을 직접 입력하세요…"
            style={{ width: "100%", minHeight: 110, padding: "12px 14px", border: "1px solid #d8dee5", borderRadius: 10, fontSize: 14, lineHeight: 1.6, fontFamily: "inherit", resize: "vertical", marginBottom: 12 }} />
          <div style={{ marginBottom: 12 }}>
            <RubricPanel kind="speaking" variant={task.type} minWords={40} response={transcript}
              onScore={(s) => setTaskScores((m) => ({ ...m, [ti]: s }))} />
          </div>
          <div style={{ background: "#f6f8fa", borderRadius: 10, padding: "12px 14px", fontSize: 13.5, color: "#3a4756", lineHeight: 1.65, marginBottom: 14 }}><b>💡 팁 </b>{task.tip}</div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={begin} style={btnOutline}>다시 녹음</button>
            <button onClick={nextTask} style={btnBlue}>{ti < tasks.length - 1 ? "다음 과제 →" : "섹션 완료 →"}</button>
          </div>
        </div>
      )}
    </Shell>
  );
}

// ── WRITING (countdown, live word count, AI score) ───────────────────────────
function WritingFlow({ tasks, onDone, banner }: { tasks: ToeflWritingTask[]; onDone: (scaled: number | null) => void; banner?: React.ReactNode }) {
  const [ti, setTi] = useState(0);
  const [started, setStarted] = useState(false);
  const [text, setText] = useState("");
  const [remaining, setRemaining] = useState(0);
  const [done, setDone] = useState(false);
  const [taskScores, setTaskScores] = useState<Record<number, number>>({});
  const task = tasks[ti];
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const minWords = task.type === "integrated" ? 150 : 100;

  useEffect(() => {
    if (!started || done) return;
    const id = setInterval(() => setRemaining((r) => { if (r <= 1) { clearInterval(id); setDone(true); return 0; } return r - 1; }), 1000);
    return () => clearInterval(id);
  }, [started, done]);

  function begin() { setText(""); setDone(false); setStarted(true); setRemaining(task.timeSec); }
  function nextTask() {
    setStarted(false); setDone(false); setText("");
    if (ti < tasks.length - 1) setTi(ti + 1); else onDone(avgScaled(Object.values(taskScores)));
  }

  return (
    <Shell>
      {banner}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <button onClick={() => onDone(avgScaled(Object.values(taskScores)))} style={btnOutline}>채점·종료</button>
        <span style={{ fontWeight: 800 }}>Writing · Task {task.n}/{tasks.length}</span>
        {started && !done ? <Timer remaining={remaining} /> : <span />}
      </div>

      {task.readingText && (
        <div style={{ background: "#faf7ff", border: "1px solid #efe7fe", borderRadius: 12, padding: "16px 18px", marginBottom: 14, fontSize: 14, lineHeight: 1.7, color: "#243240", whiteSpace: "pre-wrap" }}>{task.readingText}</div>
      )}
      <div style={{ background: "#fff", border: "1px solid #e6ebf0", borderRadius: 14, padding: "16px 18px", marginBottom: 14 }}>
        <div style={{ fontSize: 12, fontWeight: 800, color: "#A78BFA", marginBottom: 8 }}>{task.type === "integrated" ? "Integrated Writing" : "Academic Discussion"} · {Math.round(task.timeSec / 60)}분 · {task.targetWords}</div>
        <p style={{ fontSize: 15.5, lineHeight: 1.7, fontWeight: 600, margin: 0 }}>{task.prompt}</p>
      </div>

      {!started ? (
        <button onClick={begin} style={btnBlue}>작성 시작 →</button>
      ) : (
        <>
          <textarea value={text} onChange={(e) => setText(e.target.value)} disabled={done} placeholder="여기에 답안을 작성하세요…"
            style={{ width: "100%", minHeight: 280, padding: "14px 16px", border: "1px solid #d8dee5", borderRadius: 12, fontSize: 15, lineHeight: 1.7, fontFamily: "inherit", resize: "vertical", background: done ? "#f6f8fa" : "#fff" }} />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "10px 0 14px" }}>
            <span style={{ fontSize: 13, color: "#5b6b7b", fontWeight: 700 }}>단어 수: {words}</span>
            {!done && <button onClick={() => setDone(true)} style={btnBlue}>제출 →</button>}
          </div>
          {done && (
            <>
              <div style={{ marginBottom: 12 }}>
                <RubricPanel kind="writing" variant={task.type} minWords={minWords} response={text}
                  onScore={(s) => setTaskScores((m) => ({ ...m, [ti]: s }))} />
              </div>
              <div style={{ background: "#f6f8fa", borderRadius: 10, padding: "12px 14px", fontSize: 13.5, color: "#3a4756", lineHeight: 1.65, marginBottom: 14 }}><b>💡 팁 </b>{task.tip}</div>
              <button onClick={nextTask} style={btnBlue}>{ti < tasks.length - 1 ? "다음 과제 →" : "섹션 완료 →"}</button>
            </>
          )}
        </>
      )}
    </Shell>
  );
}

const btnBlue: React.CSSProperties = { background: BLUE, color: "#fff", border: "none", borderRadius: 10, padding: "12px 22px", fontWeight: 800, fontSize: 14.5, cursor: "pointer" };
const btnOutline: React.CSSProperties = { background: "#fff", color: "#3a4756", border: "1px solid #cdd6e0", borderRadius: 10, padding: "9px 16px", fontWeight: 700, fontSize: 13.5, cursor: "pointer" };
