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
import { autoScore } from "@/lib/toefl/autoScore";
import { authFetch, getClientSession } from "@/lib/client-auth";
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
      window.alert("You've used all 5 attempts. Upgrade to the unlimited pass (500 credits) to keep taking the test.");
    }
    if (r.reason === "locked") {
      window.alert("You need a TOEFL practice test pass. Choose 5 attempts for 200 credits or unlimited for 500 credits.");
    }
    window.dispatchEvent(new CustomEvent("inhero:open-charge"));
  };

  // Login required (like every other paid asset) before the test opens.
  if (loggedIn === null) return <Shell><div style={{ textAlign: "center", color: "#5b6b7b", padding: "40px 0" }}>Checking…</div></Shell>;
  if (!loggedIn) {
    return (
      <Shell>
        <div style={{ maxWidth: 460, margin: "20px auto 0", textAlign: "center", background: "#fff", border: "1px solid #e6ebf0", borderRadius: 16, padding: "32px 26px" }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🔒</div>
          <h2 style={{ fontSize: 20, fontWeight: 850, margin: "0 0 8px" }}>Please log in</h2>
          <p style={{ fontSize: 14, color: "#5b6b7b", lineHeight: 1.7, marginBottom: 18 }}>The TOEFL practice test is available after you log in. Sign up and we'll give you welcome credits.</p>
          <button onClick={() => window.dispatchEvent(new CustomEvent("inhero:open-auth", { detail: { mode: "signup", redirectTo: "/toefl/test?pay=1" } }))} style={btnBlue}>Log in / Sign up →</button>
        </div>
      </Shell>
    );
  }

  if (view === "home") {
    const cards: { key: View; tag: string; title: string; meta: string; color: string }[] = [
      { key: "reading", tag: "Reading", title: "Reading", meta: `${form.reading.length} passages · ${counts.reading} questions · 35 min · auto-graded`, color: "#1D9E75" },
      { key: "listening", tag: "Listening", title: "Listening", meta: `${form.listening.length} audio clips · ${counts.listening} questions · ~36 min · audio playback`, color: "#7DD3FC" },
      { key: "speaking", tag: "Speaking", title: "Speaking", meta: `${counts.speaking} tasks · 16 min · recording + AI scoring`, color: "#F59E0B" },
      { key: "writing", tag: "Writing", title: "Writing", meta: `${counts.writing} tasks · 29 min · timer + word count`, color: "#A78BFA" },
    ];
    return (
      <Shell showCredits loggedIn={loggedIn}>
        <p style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "#94a3b8", fontWeight: 800, marginBottom: 8 }}>📝 TOEFL iBT · Test Mode</p>
        <h1 style={{ fontSize: 26, fontWeight: 850, margin: "0 0 8px", letterSpacing: "-0.02em" }}>Take it just like the real TOEFL</h1>
        <p style={{ color: "#5b6b7b", fontSize: 14.5, lineHeight: 1.7, marginBottom: 8 }}>{form.title} — practice all four sections (Reading, Listening, Speaking, Writing) in the real exam format.</p>
        <div style={{ background: "#eef4ff", border: `1px solid ${BLUE}33`, borderRadius: 12, padding: "13px 15px", marginBottom: 20 }}>
          <p style={{ fontSize: 13, fontWeight: 800, color: "#1a3f8f", margin: "0 0 4px" }}>Practice questions built in the exact format of the real exam</p>
          <p style={{ fontSize: 12.5, color: "#3a4756", lineHeight: 1.65, margin: 0 }}>
            We analyzed the TOEFL iBT — its four-section structure, all 8 reading question types (factual, inference, vocabulary, sentence simplification, insert text, summary, and more) and listening types (gist, function, attitude, organization, and more), and the exam's actual time allocation — then wrote brand-new, original practice questions using the same design principles. (Not copies of ETS's official questions.)
          </p>
        </div>

        {TOEFL_FORMS.length > 1 && (
          <div style={{ marginBottom: 18 }}>
            <p style={{ fontSize: 12, fontWeight: 800, color: "#94a3b8", margin: "0 0 8px" }}>Choose a test</p>
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
          bundleLabel="Unlimited"
          title="TOEFL Practice Test Pass"
          desc="Same format as the real TOEFL iBT (Reading, Listening, Speaking, Writing). Choose a 5-attempt pass (200) or unlimited (500)."
          fullBlur
          allowAdminBypass={false}
        >
        {mounted && (() => {
          const tier = mockTier("toefl");
          const rem = mockRemaining("toefl");
          return (
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#f7f8fa", border: "1px solid #e6ebf0", borderRadius: 999, padding: "7px 14px", marginBottom: 14, fontSize: 12.5, fontWeight: 800 }}>
              {tier === "unlimited"
                ? <span style={{ color: "#047a45" }}>♾️ Unlimited pass · no attempt limit</span>
                : <span style={{ color: (rem ?? 0) > 0 ? "#b45309" : "#dc2626" }}>🎟️ 5-attempt pass · {rem ?? 0}/{MOCK_PACK_LIMIT} remaining</span>}
            </div>
          );
        })()}
        <button onClick={() => startMock("full")} style={{ width: "100%", textAlign: "left", display: "flex", alignItems: "center", gap: 16, background: "linear-gradient(135deg,#0b1220,#1f3a5f)", color: "#fff", border: "none", borderRadius: 16, padding: "22px 22px", cursor: "pointer", marginBottom: 18 }}>
          <span style={{ fontSize: 26, flexShrink: 0 }}>🎯</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 850, fontSize: 18 }}>Full Test</div>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginTop: 3 }}>Reading → Listening → Speaking → Writing in order · scaled to a /120 total + rubric self-scoring</div>
          </div>
          <span style={{ color: "#7DD3FC", fontWeight: 800, fontSize: 14 }}>Begin →</span>
        </button>

        <p style={{ fontSize: 12, fontWeight: 800, color: "#94a3b8", margin: "4px 2px 10px" }}>Or practice by section</p>
        <div style={{ display: "grid", gap: 14 }}>
          {cards.map((c) => (
            <button key={c.key} onClick={() => startMock(c.key)} style={{ textAlign: "left", display: "flex", alignItems: "center", gap: 16, background: "#fff", border: "1px solid #e6ebf0", borderRadius: 14, padding: "20px 20px", cursor: "pointer" }}>
              <span style={{ fontSize: 12, fontWeight: 900, color: "#fff", background: c.color, borderRadius: 8, padding: "6px 11px", flexShrink: 0 }}>{c.tag}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: 17 }}>{c.title}</div>
                <div style={{ color: "#5b6b7b", fontSize: 13, marginTop: 3 }}>{c.meta}</div>
              </div>
              <span style={{ color: c.color, fontWeight: 800, fontSize: 14 }}>Begin →</span>
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
  reading: { name: "Reading Section", emoji: "📖", lines: ["2 passages · 10 questions each (20 total) · 35 min", "Just like the real exam, read college-level academic passages and answer multiple-choice questions. Answers and explanations are revealed after you submit.", "You can move freely between questions within a section."] },
  listening: { name: "Listening Section", emoji: "🎧", lines: ["2 conversations + 3 lectures · 28 questions total · ~36 min", "Listen to the audio (you can take notes) and answer multiple-choice questions. Be ready to answer as you listen, just like the real exam.", "The transcript is revealed after grading."] },
  speaking: { name: "Speaking Section", emoji: "🎙", lines: ["4 tasks (1 independent + 3 integrated) · ~16 min", "After 15–30 sec of prep, respond for 45–60 sec. Allow the mic and your response is recorded + transcribed, then AI scores it on the 0–4 TOEFL rubric with feedback (you can also self-check).", "Find a quiet place to do this."] },
  writing: { name: "Writing Section", emoji: "✍️", lines: ["2 tasks (integrated + academic discussion) · ~29 min", "Write within the time limit while watching your word count, then self-score against a rubric.", "For the Integrated task, summarize the lecture — not your own opinion."] },
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
          <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 10 }}>TOEFL iBT · Full Results</div>
          <div style={{ background: "#0b1220", color: "#fff", borderRadius: 18, padding: "28px 24px", marginBottom: 16 }}>
            <div style={{ fontSize: 13, color: "#7DD3FC", fontWeight: 700 }}>Total score (estimated)</div>
            <div style={{ fontSize: 56, fontWeight: 900, margin: "4px 0 0" }}>{total}<span style={{ fontSize: 24, color: "rgba(255,255,255,0.5)" }}> / 120</span></div>
          </div>
          <div style={{ display: "grid", gap: 10, marginBottom: 18 }}>
            {labels.map((l, i) => (
              <div key={l} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fff", border: "1px solid #e6ebf0", borderRadius: 12, padding: "13px 16px" }}>
                <span style={{ fontWeight: 700 }}>{l}</span>
                <span style={{ fontWeight: 800, color: BLUE }}>{scores[i] == null ? "Not graded" : `${scores[i]} / 30`}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.6, marginBottom: 16 }}>* Reading and Listening are scaled from your accuracy; Speaking is AI-scored on the TOEFL rubric and Writing uses rubric self-scoring. These estimates may differ from the official TOEFL conversion tables.</p>
          <button onClick={onExit} style={btnBlue}>Back to start →</button>
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
          <div style={{ fontSize: 13, fontWeight: 800, color: "#94a3b8", marginBottom: 6 }}>Full Test · {step + 1}/4</div>
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
              ☕ In the real exam, there's about a 10-minute break right after Listening. Take a moment to rest before you start.
            </div>
          )}
          <button onClick={() => { setIntro(false); window.scrollTo({ top: 0 }); }} style={{ ...btnBlue, marginTop: 18 }}>Begin {meta.name} →</button>
        </div>
      </Shell>
    );
  }

  return (
    <div>
      <div style={{ background: "#0b1220", color: "#fff", textAlign: "center", fontSize: 12.5, fontWeight: 700, padding: "8px" }}>
        Full Test · {step + 1}/4 — {cur === "reading" ? "Reading" : cur === "listening" ? "Listening" : cur === "speaking" ? "Speaking" : "Writing"} Section
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
        <div style={{ flex: 1, textAlign: "center", fontWeight: 800 }}>TOEFL iBT Test Mode</div>
        {showCredits ? <CreditWidget loggedIn={loggedIn} /> : <div style={{ width: 60 }} />}
      </div>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "28px 20px 90px" }}>{children}</div>
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
        {multi && <span style={{ color: "#94a3b8", fontWeight: 700, fontSize: 12 }}>  (choose 3)</span>}
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
              {reveal && isCorrect && <span style={{ marginLeft: "auto", color: "#0f7b53", fontWeight: 800, fontSize: 13 }}>Correct</span>}
            </button>
          );
        })}
      </div>
      {reveal && (
        <div style={{ marginTop: 12, background: "#f6f8fa", borderRadius: 10, padding: "11px 13px", fontSize: 13.5, lineHeight: 1.65, color: "#3a4756" }}>
          <b>Explanation </b>{q.explanation}
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
        <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 10 }}>{label} Section Results</div>
        <div style={{ background: "#fff", border: "1px solid #e6ebf0", borderRadius: 18, padding: "28px 24px" }}>
          <div style={{ fontSize: 14, color: "#5b6b7b", fontWeight: 700 }}>Correct {correct} / {total}</div>
          <div style={{ fontSize: 52, fontWeight: 900, color: BLUE, margin: "6px 0 2px" }}>{scaled}<span style={{ fontSize: 22, color: "#9aa6b2" }}> / 30</span></div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#3a4756" }}>{sectionBand(scaled)}</div>
          <p style={{ fontSize: 12.5, color: "#94a3b8", marginTop: 12, lineHeight: 1.6 }}>* The /30 score is an estimate based on your accuracy. It may differ from the official TOEFL conversion tables.</p>
        </div>
        <button onClick={() => onDone(scaled)} style={{ ...btnBlue, marginTop: 18 }}>Continue →</button>
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
        <button onClick={() => setDone(true)} style={btnOutline}>Grade & finish</button>
        <span style={{ fontWeight: 800 }}>Reading · Passage {si + 1}/{sets.length}</span>
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
            ? <button onClick={() => { setReviewed((r) => ({ ...r, [si]: true })); window.scrollTo({ top: 0 }); }} style={btnBlue}>Submit & grade →</button>
            : <button onClick={next} style={btnBlue}>{si < sets.length - 1 ? "Next passage →" : "See section results →"}</button>}
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
        <button onClick={() => { stop(); setDone(true); }} style={btnOutline}>Grade & finish</button>
        <span style={{ fontWeight: 800 }}>Listening · {si + 1}/{sets.length}</span>
        {submitted ? <span style={{ fontWeight: 800, color: BLUE }}>{score} / {set.questions.length}</span> : <span />}
      </div>

      <div style={{ background: "#0b1220", color: "#e8edf4", borderRadius: 16, padding: "22px 22px", marginBottom: 18, textAlign: "center" }}>
        <div style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: "#7DD3FC", fontWeight: 800, marginBottom: 6 }}>{set.kind === "conversation" ? "🎧 Conversation" : "🎧 Lecture"}</div>
        <div style={{ fontWeight: 800, fontSize: 17, marginBottom: 14 }}>{set.title}</div>
        <button onClick={speaking ? stop : play} style={{ background: "#7DD3FC", color: "#0b1220", border: "none", borderRadius: 999, padding: "12px 26px", fontWeight: 800, fontSize: 15, cursor: "pointer" }}>
          {speaking ? "⏹ Stop" : played ? "▶ Replay" : "▶ Play audio"}
        </button>
        <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 12 }}>Listen and take notes, just like the real exam. The transcript is revealed once the audio finishes.</p>
      </div>

      {set.questions.map((q, i) => (
        <QuestionBlock key={q.id} q={q} idx={i} answer={answers[q.id]} reveal={submitted} onAnswer={(a) => setAnswers((m) => ({ ...m, [q.id]: a }))} />
      ))}

      {submitted && (
        <details style={{ marginBottom: 16, background: "#fff", border: "1px solid #e6ebf0", borderRadius: 12, padding: "12px 16px" }}>
          <summary style={{ cursor: "pointer", fontWeight: 800, fontSize: 14 }}>📄 View transcript</summary>
          <div style={{ fontSize: 14, lineHeight: 1.8, color: "#3a4756", marginTop: 10, whiteSpace: "pre-wrap" }}>{set.transcript}</div>
        </details>
      )}

      {!submitted
        ? <button onClick={() => { stop(); setSubmitted(true); window.scrollTo({ top: 0 }); }} style={btnBlue} disabled={!played}>{played ? "Submit & grade →" : "Please play the audio first"}</button>
        : <button onClick={next} style={btnBlue}>{si < sets.length - 1 ? "Next audio →" : "See section results →"}</button>}
    </Shell>
  );
}

// ── Local rubric self-scoring panel (no AI) ──────────────────────────────────
function avgScaled(scores: number[]): number | null {
  if (scores.length === 0) return null;
  return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
}

function aiChip(): React.CSSProperties {
  return { fontSize: 11.5, fontWeight: 700, color: "#cdd8ec", background: "rgba(125,211,252,0.12)", border: "1px solid rgba(125,211,252,0.3)", borderRadius: 999, padding: "3px 10px" };
}

// ── Free on-device auto-scorer panel (no API) ────────────────────────────────
function AutoScorePanel({ kind, variant, text, prompt, sourceText, respSec, targetWords, onScore }: {
  kind: "speaking" | "writing"; variant: "independent" | "integrated" | "discussion";
  text: string; prompt: string; sourceText?: string; respSec?: number; targetWords: number;
  onScore: (scaled: number) => void;
}) {
  const result = useMemo(
    () => autoScore({ kind, variant, text, prompt, sourceText, respSec, targetWords }),
    [kind, variant, text, prompt, sourceText, respSec, targetWords],
  );
  useEffect(() => { onScore(result.scaled); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [result.scaled]);

  return (
    <div style={{ background: "#0b3b2e", borderRadius: 14, padding: "16px 18px" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
        <span style={{ fontSize: 13, fontWeight: 800, color: "#5fe0a0" }}>⚡ 자동 채점 <span style={{ color: "#3f9e7c", fontWeight: 700 }}>(무료·즉시)</span></span>
        <span style={{ fontSize: 28, fontWeight: 900, color: "#fff" }}>{result.overall}<span style={{ fontSize: 15, color: "#7fbfa3" }}>/4</span></span>
        <span style={{ fontSize: 14, color: "#bdf5d8", fontWeight: 700 }}>≈ {result.scaled}/30</span>
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
        {result.metrics.map((m, i) => (
          <span key={i} style={{ fontSize: 11.5, fontWeight: 700, borderRadius: 999, padding: "3px 10px", color: m.ok ? "#bdf5d8" : "#fde68a", background: m.ok ? "rgba(95,224,160,0.14)" : "rgba(253,230,138,0.12)", border: `1px solid ${m.ok ? "rgba(95,224,160,0.34)" : "rgba(253,230,138,0.3)"}` }}>{m.ok ? "✓" : "✗"} {m.label}</span>
        ))}
      </div>
      {result.feedback && <p style={{ fontSize: 13, color: "#d7f3e6", lineHeight: 1.6, margin: "0 0 8px" }}>{result.feedback}</p>}
      {result.tips.length > 0 && (
        <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 4 }}>
          {result.tips.map((t, i) => <li key={i} style={{ fontSize: 12.5, color: "#9fd8bf", lineHeight: 1.5 }}>{t}</li>)}
        </ul>
      )}
    </div>
  );
}

// ── SPEAKING (prep + response timers, mic recording, speech-to-text, AI score) ─
function SpeakingFlow({ tasks, onDone, banner }: { tasks: ToeflSpeakingTask[]; onDone: (scaled: number | null) => void; banner?: React.ReactNode }) {
  const [ti, setTi] = useState(0);
  const [phase, setPhase] = useState<"ready" | "prep" | "respond" | "done">("ready");
  const [remaining, setRemaining] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [transcript, setTranscript] = useState("");
  const [taskScores, setTaskScores] = useState<Record<number, number>>({});
  const [aiLoading, setAiLoading] = useState(false);
  const [ai, setAi] = useState<null | { scaled: number; overall: number; delivery: number; language: number; topic: number; feedback: string; tips: string[] }>(null);
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

  function begin() { setAudioUrl(null); setTranscript(""); finalRef.current = ""; setAi(null); setPhase("prep"); setRemaining(task.prepSec); }
  function nextTask() {
    setAudioUrl(null); setTranscript(""); setAi(null); setPhase("ready");
    if (ti < tasks.length - 1) setTi(ti + 1); else onDone(avgScaled(Object.values(taskScores)));
  }

  // AI auto-score: send the transcript to Claude for a 0–4 → 0–30 rubric score.
  async function scoreWithAI() {
    if (aiLoading) return;
    if (transcript.trim().split(/\s+/).length < 5) { window.alert("답변이 너무 짧아요. 전사된 답변을 채워넣은 뒤 채점해 주세요."); return; }
    setAiLoading(true);
    try {
      const res = await authFetch("/api/toefl/score-speaking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ taskType: task.type, prompt: task.prompt, readingText: task.readingText, transcript }),
      });
      const d = await res.json();
      if (d?.ok && typeof d.scaled === "number") {
        setAi({ scaled: d.scaled, overall: d.overall, delivery: d.delivery, language: d.language, topic: d.topic, feedback: d.feedback ?? "", tips: Array.isArray(d.tips) ? d.tips : [] });
        setTaskScores((m) => ({ ...m, [ti]: d.scaled }));
      } else {
        window.alert(d?.error || "AI 채점을 잠시 사용할 수 없어요. 아래 루브릭으로 직접 채점해 주세요.");
      }
    } catch {
      window.alert("네트워크 오류로 AI 채점에 실패했어요. 잠시 후 다시 시도해 주세요.");
    } finally {
      setAiLoading(false);
    }
  }

  return (
    <Shell>
      {banner}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <button onClick={() => { stopRec(); onDone(avgScaled(Object.values(taskScores))); }} style={btnOutline}>Grade & finish</button>
        <span style={{ fontWeight: 800 }}>Speaking · Task {task.n}/{tasks.length}</span>
        {(phase === "prep" || phase === "respond") ? <Timer remaining={remaining} /> : <span />}
      </div>

      {task.readingText && (
        <div style={{ background: "#eef4ff", border: `1px solid ${BLUE}33`, borderRadius: 12, padding: "14px 16px", marginBottom: 14, fontSize: 14, lineHeight: 1.7, color: "#243240", whiteSpace: "pre-wrap" }}>{task.readingText}</div>
      )}
      <div style={{ background: "#fff", border: "1px solid #e6ebf0", borderRadius: 14, padding: "18px 20px", marginBottom: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 800, color: "#F59E0B", marginBottom: 8 }}>{task.type === "independent" ? "Independent" : "Integrated"} · Prep {task.prepSec}s · Response {task.respSec}s</div>
        <p style={{ fontSize: 16, lineHeight: 1.7, fontWeight: 600, margin: 0 }}>{task.prompt}</p>
      </div>

      {phase === "ready" && <button onClick={begin} style={btnBlue}>Start prep →</button>}
      {phase === "prep" && (
        <div style={{ textAlign: "center", background: "#fffbeb", border: "1px solid #f1d27a", borderRadius: 14, padding: "26px" }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#a16207", marginBottom: 6 }}>Prep time</div>
          <div style={{ fontSize: 40, fontWeight: 900, color: "#a16207" }}>{fmt(remaining)}</div>
          <button onClick={startRespond} style={{ ...btnOutline, marginTop: 14 }}>Start responding now →</button>
        </div>
      )}
      {phase === "respond" && (
        <div style={{ textAlign: "center", background: "#fdecec", border: "1px solid #e0a3a3", borderRadius: 14, padding: "26px" }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: "#c0392b", marginBottom: 6 }}>🔴 Recording — speak now</div>
          <div style={{ fontSize: 40, fontWeight: 900, color: "#c0392b" }}>{fmt(remaining)}</div>
          {transcript && <p style={{ fontSize: 13, color: "#7a3b3b", marginTop: 12, lineHeight: 1.5, textAlign: "left" }}>{transcript}</p>}
          <button onClick={() => { stopRec(); setPhase("done"); }} style={{ ...btnOutline, marginTop: 14 }}>End response →</button>
        </div>
      )}
      {phase === "done" && (
        <div style={{ background: "#fff", border: "1px solid #e6ebf0", borderRadius: 14, padding: "18px 20px" }}>
          <div style={{ fontWeight: 800, marginBottom: 10 }}>✅ Response complete</div>
          {audioUrl && <audio controls src={audioUrl} style={{ width: "100%", marginBottom: 12 }} />}
          <div style={{ fontSize: 12.5, fontWeight: 800, color: "#5b6b7b", marginBottom: 6 }}>📝 Speech-to-text transcript (edit it if needed before scoring)</div>
          <textarea value={transcript} onChange={(e) => setTranscript(e.target.value)} placeholder="If speech recognition didn't work, type what you said here…"
            style={{ width: "100%", minHeight: 110, padding: "12px 14px", border: "1px solid #d8dee5", borderRadius: 10, fontSize: 14, lineHeight: 1.6, fontFamily: "inherit", resize: "vertical", marginBottom: 12 }} />
          {/* AI 자동 채점 */}
          <div style={{ marginBottom: 12, background: "#0b1220", borderRadius: 14, padding: "16px 18px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: "#7DD3FC" }}>🤖 AI 자동 채점</span>
              <button onClick={scoreWithAI} disabled={aiLoading}
                style={{ background: "#7DD3FC", color: "#0b1220", border: "none", borderRadius: 999, padding: "9px 20px", fontWeight: 800, fontSize: 13.5, cursor: aiLoading ? "default" : "pointer", opacity: aiLoading ? 0.7 : 1 }}>
                {aiLoading ? "채점 중…" : ai ? "다시 채점" : "AI로 채점하기"}
              </button>
            </div>
            {ai ? (
              <div style={{ marginTop: 12 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 8 }}>
                  <span style={{ fontSize: 30, fontWeight: 900, color: "#fff" }}>{ai.overall}<span style={{ fontSize: 15, color: "#7d8aa0" }}>/4</span></span>
                  <span style={{ fontSize: 14, color: "#9fb3cc", fontWeight: 700 }}>≈ {ai.scaled}/30</span>
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
                  <span style={aiChip()}>Delivery {ai.delivery}/4</span>
                  <span style={aiChip()}>Language {ai.language}/4</span>
                  <span style={aiChip()}>Topic {ai.topic}/4</span>
                </div>
                {ai.feedback && <p style={{ fontSize: 13, color: "#cdd8ec", lineHeight: 1.6, margin: "0 0 8px" }}>{ai.feedback}</p>}
                {ai.tips.length > 0 && (
                  <ul style={{ margin: 0, paddingLeft: 18, display: "grid", gap: 4 }}>
                    {ai.tips.map((t, i) => <li key={i} style={{ fontSize: 12.5, color: "#9fb3cc", lineHeight: 1.5 }}>{t}</li>)}
                  </ul>
                )}
              </div>
            ) : (
              <p style={{ fontSize: 12, color: "#7d8aa0", margin: "8px 0 0", lineHeight: 1.5 }}>전사된 답변을 TOEFL 루브릭(Delivery·Language·Topic)으로 AI가 0–4점 채점하고 한국어 피드백을 드려요.</p>
            )}
          </div>

          <div style={{ marginBottom: 12 }}>
            <AutoScorePanel kind="speaking" variant={task.type} text={transcript} prompt={task.prompt} sourceText={task.readingText} respSec={task.respSec} targetWords={Math.max(40, Math.round((task.respSec / 60) * 110))}
              onScore={(s) => setTaskScores((m) => ({ ...m, [ti]: s }))} />
          </div>
          <div style={{ background: "#f6f8fa", borderRadius: 10, padding: "12px 14px", fontSize: 13.5, color: "#3a4756", lineHeight: 1.65, marginBottom: 14 }}><b>💡 Tip </b>{task.tip}</div>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={begin} style={btnOutline}>Record again</button>
            <button onClick={nextTask} style={btnBlue}>{ti < tasks.length - 1 ? "Next task →" : "Finish section →"}</button>
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
        <button onClick={() => onDone(avgScaled(Object.values(taskScores)))} style={btnOutline}>Grade & finish</button>
        <span style={{ fontWeight: 800 }}>Writing · Task {task.n}/{tasks.length}</span>
        {started && !done ? <Timer remaining={remaining} /> : <span />}
      </div>

      {task.readingText && (
        <div style={{ background: "#faf7ff", border: "1px solid #efe7fe", borderRadius: 12, padding: "16px 18px", marginBottom: 14, fontSize: 14, lineHeight: 1.7, color: "#243240", whiteSpace: "pre-wrap" }}>{task.readingText}</div>
      )}
      <div style={{ background: "#fff", border: "1px solid #e6ebf0", borderRadius: 14, padding: "16px 18px", marginBottom: 14 }}>
        <div style={{ fontSize: 12, fontWeight: 800, color: "#A78BFA", marginBottom: 8 }}>{task.type === "integrated" ? "Integrated Writing" : "Academic Discussion"} · {Math.round(task.timeSec / 60)} min · {task.targetWords}</div>
        <p style={{ fontSize: 15.5, lineHeight: 1.7, fontWeight: 600, margin: 0 }}>{task.prompt}</p>
      </div>

      {!started ? (
        <button onClick={begin} style={btnBlue}>Start writing →</button>
      ) : (
        <>
          <textarea value={text} onChange={(e) => setText(e.target.value)} disabled={done} placeholder="Write your response here…"
            style={{ width: "100%", minHeight: 280, padding: "14px 16px", border: "1px solid #d8dee5", borderRadius: 12, fontSize: 15, lineHeight: 1.7, fontFamily: "inherit", resize: "vertical", background: done ? "#f6f8fa" : "#fff" }} />
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "10px 0 14px" }}>
            <span style={{ fontSize: 13, color: "#5b6b7b", fontWeight: 700 }}>Word count: {words}</span>
            {!done && <button onClick={() => setDone(true)} style={btnBlue}>Submit →</button>}
          </div>
          {done && (
            <>
              <div style={{ marginBottom: 12 }}>
                <AutoScorePanel kind="writing" variant={task.type} text={text} prompt={task.prompt} sourceText={task.readingText} targetWords={minWords}
                  onScore={(s) => setTaskScores((m) => ({ ...m, [ti]: s }))} />
              </div>
              <div style={{ background: "#f6f8fa", borderRadius: 10, padding: "12px 14px", fontSize: 13.5, color: "#3a4756", lineHeight: 1.65, marginBottom: 14 }}><b>💡 Tip </b>{task.tip}</div>
              <button onClick={nextTask} style={btnBlue}>{ti < tasks.length - 1 ? "Next task →" : "Finish section →"}</button>
            </>
          )}
        </>
      )}
    </Shell>
  );
}

const btnBlue: React.CSSProperties = { background: BLUE, color: "#fff", border: "none", borderRadius: 10, padding: "12px 22px", fontWeight: 800, fontSize: 14.5, cursor: "pointer" };
const btnOutline: React.CSSProperties = { background: "#fff", color: "#3a4756", border: "1px solid #cdd6e0", borderRadius: 10, padding: "9px 16px", fontWeight: 700, fontSize: 13.5, cursor: "pointer" };
