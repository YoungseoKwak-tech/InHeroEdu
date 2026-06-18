"use client";

/**
 * ToeflTestClient — real-format TOEFL iBT practice player.
 *   Reading / Listening → auto-graded MCQ (Listening plays via SpeechSynthesis).
 *   Speaking → prep + response timers with optional mic recording + playback.
 *   Writing → countdown + live word count (practice mode).
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { getToeflForm, toeflCounts } from "@/lib/toefl/forms";
import type { ToeflMCQ, ToeflReadingSet, ToeflListeningSet, ToeflSpeakingTask, ToeflWritingTask } from "@/lib/toefl/types";
import { scaledScore } from "@/lib/toefl/types";

const BLUE = "#1f6feb";
const LETTERS = ["A", "B", "C", "D", "E", "F"];
type View = "home" | "reading" | "listening" | "speaking" | "writing";

function fmt(sec: number) {
  const m = Math.max(0, Math.floor(sec / 60)), s = Math.max(0, sec % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

export default function ToeflTestClient() {
  const form = getToeflForm(undefined);
  const counts = toeflCounts(form);
  const [view, setView] = useState<View>("home");

  if (view === "home") {
    const cards: { key: View; tag: string; title: string; meta: string; color: string }[] = [
      { key: "reading", tag: "Reading", title: "독해", meta: `${form.reading.length}개 지문 · ${counts.reading}문항 · 자동 채점`, color: "#1D9E75" },
      { key: "listening", tag: "Listening", title: "듣기", meta: `${form.listening.length}개 음원 · ${counts.listening}문항 · 음성 재생`, color: "#7DD3FC" },
      { key: "speaking", tag: "Speaking", title: "말하기", meta: `${counts.speaking}개 과제 · 준비/응답 타이머 · 녹음`, color: "#F59E0B" },
      { key: "writing", tag: "Writing", title: "쓰기", meta: `${counts.writing}개 과제 · 타이머 · 단어 수`, color: "#A78BFA" },
    ];
    return (
      <Shell>
        <p style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "#94a3b8", fontWeight: 800, marginBottom: 8 }}>📝 TOEFL iBT · 실전 모드</p>
        <h1 style={{ fontSize: 26, fontWeight: 850, margin: "0 0 8px", letterSpacing: "-0.02em" }}>실제 토플처럼 풀어보세요</h1>
        <p style={{ color: "#5b6b7b", fontSize: 14.5, lineHeight: 1.7, marginBottom: 8 }}>{form.title} — Reading·Listening·Speaking·Writing 4개 섹션을 실제 시험 형식으로 연습합니다.</p>
        <p style={{ color: "#9aa6b2", fontSize: 12.5, marginBottom: 24 }}>※ ETS 기출이 아닌 동일 형식의 오리지널 문항입니다.</p>
        <div style={{ display: "grid", gap: 14 }}>
          {cards.map((c) => (
            <button key={c.key} onClick={() => setView(c.key)} style={{ textAlign: "left", display: "flex", alignItems: "center", gap: 16, background: "#fff", border: "1px solid #e6ebf0", borderRadius: 14, padding: "20px 20px", cursor: "pointer" }}>
              <span style={{ fontSize: 12, fontWeight: 900, color: "#fff", background: c.color, borderRadius: 8, padding: "6px 11px", flexShrink: 0 }}>{c.tag}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: 17 }}>{c.title}</div>
                <div style={{ color: "#5b6b7b", fontSize: 13, marginTop: 3 }}>{c.meta}</div>
              </div>
              <span style={{ color: c.color, fontWeight: 800, fontSize: 14 }}>시작 →</span>
            </button>
          ))}
        </div>
      </Shell>
    );
  }
  if (view === "reading") return <ReadingFlow sets={form.reading} onExit={() => setView("home")} />;
  if (view === "listening") return <ListeningFlow sets={form.listening} onExit={() => setView("home")} />;
  if (view === "speaking") return <SpeakingFlow tasks={form.speaking} onExit={() => setView("home")} />;
  return <WritingFlow tasks={form.writing} onExit={() => setView("home")} />;
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "#f6f8fa", color: "#1d2733" }}>
      <div style={{ height: 56, borderBottom: "1px solid #e6ebf0", display: "flex", alignItems: "center", padding: "0 18px", background: "#fff" }}>
        <Link href="/toefl" style={{ color: "#475569", textDecoration: "none", fontWeight: 600, fontSize: 14 }}>← TOEFL</Link>
        <div style={{ flex: 1, textAlign: "center", fontWeight: 800 }}>TOEFL iBT 실전 모드</div>
        <div style={{ width: 60 }} />
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

// ── READING ──────────────────────────────────────────────────────────────────
function ReadingFlow({ sets, onExit }: { sets: ToeflReadingSet[]; onExit: () => void }) {
  const [si, setSi] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number[]>>({});
  const [submitted, setSubmitted] = useState(false);
  const [remaining, setRemaining] = useState(18 * 60);
  const set = sets[si];

  useEffect(() => {
    if (submitted) return;
    const id = setInterval(() => setRemaining((r) => { if (r <= 1) { clearInterval(id); setSubmitted(true); return 0; } return r - 1; }), 1000);
    return () => clearInterval(id);
  }, [submitted, si]);

  const score = set.questions.reduce((n, q) => n + (gradeMCQ(q, answers[q.id]) ? 1 : 0), 0);

  function next() {
    if (si < sets.length - 1) { setSi(si + 1); setSubmitted(false); setRemaining(18 * 60); window.scrollTo({ top: 0 }); }
    else onExit();
  }

  return (
    <Shell>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <button onClick={onExit} style={btnOutline}>← 섹션</button>
        <span style={{ fontWeight: 800 }}>Reading · 지문 {si + 1}/{sets.length}</span>
        {!submitted ? <Timer remaining={remaining} /> : <span style={{ fontWeight: 800, color: BLUE }}>{score} / {set.questions.length}</span>}
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
            ? <button onClick={() => { setSubmitted(true); window.scrollTo({ top: 0 }); }} style={btnBlue}>제출하고 채점 →</button>
            : <button onClick={next} style={btnBlue}>{si < sets.length - 1 ? "다음 지문 →" : "섹션 완료 →"}</button>}
        </div>
      </div>
      <style jsx>{`@media (max-width: 820px){ .toefl-read{ grid-template-columns: 1fr !important; } }`}</style>
    </Shell>
  );
}

// ── LISTENING ─────────────────────────────────────────────────────────────────
function ListeningFlow({ sets, onExit }: { sets: ToeflListeningSet[]; onExit: () => void }) {
  const [si, setSi] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number[]>>({});
  const [submitted, setSubmitted] = useState(false);
  const [played, setPlayed] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const set = sets[si];

  const stop = useCallback(() => { try { window.speechSynthesis?.cancel(); } catch { /* ignore */ } setSpeaking(false); }, []);
  useEffect(() => () => stop(), [stop]);

  function play() {
    try {
      window.speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(set.transcript.replace(/^(Student|Librarian|Professor):/gm, ""));
      u.lang = "en-US"; u.rate = 0.95;
      u.onend = () => setSpeaking(false);
      setSpeaking(true); setPlayed(true);
      window.speechSynthesis.speak(u);
    } catch { setPlayed(true); }
  }

  const score = set.questions.reduce((n, q) => n + (gradeMCQ(q, answers[q.id]) ? 1 : 0), 0);
  function next() {
    stop();
    if (si < sets.length - 1) { setSi(si + 1); setSubmitted(false); setPlayed(false); window.scrollTo({ top: 0 }); }
    else onExit();
  }

  return (
    <Shell>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <button onClick={() => { stop(); onExit(); }} style={btnOutline}>← 섹션</button>
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
        : <button onClick={next} style={btnBlue}>{si < sets.length - 1 ? "다음 음원 →" : "섹션 완료 →"}</button>}
    </Shell>
  );
}

// ── SPEAKING ──────────────────────────────────────────────────────────────────
function SpeakingFlow({ tasks, onExit }: { tasks: ToeflSpeakingTask[]; onExit: () => void }) {
  const [ti, setTi] = useState(0);
  const [phase, setPhase] = useState<"ready" | "prep" | "respond" | "done">("ready");
  const [remaining, setRemaining] = useState(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const recRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const task = tasks[ti];

  const stopRec = useCallback(() => {
    try { recRef.current?.state === "recording" && recRef.current.stop(); } catch { /* ignore */ }
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

  async function startRespond() {
    setPhase("respond"); setRemaining(task.respSec);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      chunksRef.current = [];
      const rec = new MediaRecorder(stream);
      rec.ondataavailable = (e) => { if (e.data.size) chunksRef.current.push(e.data); };
      rec.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setAudioUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach((t) => t.stop());
      };
      recRef.current = rec; rec.start();
    } catch { /* mic denied → timer-only practice */ }
  }

  function begin() { setAudioUrl(null); setPhase("prep"); setRemaining(task.prepSec); }
  function nextTask() {
    setAudioUrl(null); setPhase("ready");
    if (ti < tasks.length - 1) setTi(ti + 1); else onExit();
  }

  return (
    <Shell>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <button onClick={() => { stopRec(); onExit(); }} style={btnOutline}>← 섹션</button>
        <span style={{ fontWeight: 800 }}>Speaking · Task {task.n}/{tasks.length}</span>
        {(phase === "prep" || phase === "respond") ? <Timer remaining={remaining} /> : <span />}
      </div>

      {task.readingText && (
        <div style={{ background: "#eef4ff", border: `1px solid ${BLUE}33`, borderRadius: 12, padding: "14px 16px", marginBottom: 14, fontSize: 14, lineHeight: 1.7, color: "#243240" }}>{task.readingText}</div>
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
          <button onClick={() => { stopRec(); setPhase("done"); }} style={{ ...btnOutline, marginTop: 14 }}>응답 종료 →</button>
        </div>
      )}
      {phase === "done" && (
        <div style={{ background: "#fff", border: "1px solid #e6ebf0", borderRadius: 14, padding: "18px 20px" }}>
          <div style={{ fontWeight: 800, marginBottom: 8 }}>✅ 응답 완료</div>
          {audioUrl
            ? <audio controls src={audioUrl} style={{ width: "100%", marginBottom: 12 }} />
            : <p style={{ fontSize: 13, color: "#94a3b8", margin: "0 0 12px" }}>마이크 녹음이 없거나 차단되어 재생할 녹음이 없어요. (타이머 연습은 완료)</p>}
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

// ── WRITING ───────────────────────────────────────────────────────────────────
function WritingFlow({ tasks, onExit }: { tasks: ToeflWritingTask[]; onExit: () => void }) {
  const [ti, setTi] = useState(0);
  const [started, setStarted] = useState(false);
  const [text, setText] = useState("");
  const [remaining, setRemaining] = useState(0);
  const [done, setDone] = useState(false);
  const task = tasks[ti];
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;

  useEffect(() => {
    if (!started || done) return;
    const id = setInterval(() => setRemaining((r) => { if (r <= 1) { clearInterval(id); setDone(true); return 0; } return r - 1; }), 1000);
    return () => clearInterval(id);
  }, [started, done]);

  function begin() { setText(""); setDone(false); setStarted(true); setRemaining(task.timeSec); }
  function nextTask() {
    setStarted(false); setDone(false); setText("");
    if (ti < tasks.length - 1) setTi(ti + 1); else onExit();
  }

  return (
    <Shell>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <button onClick={onExit} style={btnOutline}>← 섹션</button>
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
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
            <span style={{ fontSize: 13, color: "#5b6b7b", fontWeight: 700 }}>단어 수: {words}</span>
            {!done
              ? <button onClick={() => setDone(true)} style={btnBlue}>제출 →</button>
              : <button onClick={nextTask} style={btnBlue}>{ti < tasks.length - 1 ? "다음 과제 →" : "섹션 완료 →"}</button>}
          </div>
          {done && <div style={{ marginTop: 14, background: "#f6f8fa", borderRadius: 10, padding: "12px 14px", fontSize: 13.5, color: "#3a4756", lineHeight: 1.65 }}><b>💡 팁 </b>{task.tip}</div>}
        </>
      )}
    </Shell>
  );
}

const btnBlue: React.CSSProperties = { background: BLUE, color: "#fff", border: "none", borderRadius: 10, padding: "12px 22px", fontWeight: 800, fontSize: 14.5, cursor: "pointer" };
const btnOutline: React.CSSProperties = { background: "#fff", color: "#3a4756", border: "1px solid #cdd6e0", borderRadius: 10, padding: "9px 16px", fontWeight: 700, fontSize: 13.5, cursor: "pointer" };
