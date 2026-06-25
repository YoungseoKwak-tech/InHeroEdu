"use client";

/**
 * /parents/question-bank/exam — Bluebook-style digital AP practice tests.
 * Start screen: pick a subject + Test 1 / 2 / 3 (each a full-length, real AP
 * Section I MCQ set). Test player mirrors College Board's Bluebook: one
 * question at a time, countdown timer, letter-badge choices + cross-out
 * (eliminate) tool, mark-for-review, a question navigator, review page, then a
 * scored results review with explanations.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { authFetch } from "@/lib/client-auth";
import {
  apCalculatorNote,
  apExamPartsFor,
  examSpecFor,
  isApCalculatorAllowed,
  isSupportedApExamCourse,
  PRACTICE_SETS,
} from "@/lib/apExamConfig";
import LiveStatBadge from "@/components/social/LiveStatBadge";
import CreditGate from "@/components/parents/CreditGate";
import ConsultOffer from "@/components/parents/ConsultOffer";
import { CREDIT_COSTS } from "@/lib/credits";
import { consumeMock, mockRemaining, mockTier, MOCK_PACK_LIMIT } from "@/lib/mockAccess";

interface BankOption { label: string; correct: boolean; feedback?: string | null; }
interface BankQuestion {
  id: string; subjectLabel: string; emoji: string; unit: number | null;
  prompt: string; options: BankOption[]; explanation?: string | null;
}
interface SubjectCount { courseId: string | null; label: string; emoji: string; count: number; examReady?: boolean; examPool?: number; }

const BLUE = "#1f6feb";
const LETTERS = ["A", "B", "C", "D", "E", "F"];

function fmt(sec: number) {
  const m = Math.max(0, Math.floor(sec / 60));
  const s = Math.max(0, sec % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

// 모의고사 후기 — AP Section I 실전 모드를 풀어본 학생·학부모 후기.
const EXAM_REVIEWS: { tag: "AP"; name: string; text: string }[] = [
  { tag: "AP", name: "AP Bio 응시생", text: "문항별 해설이 바로 나와서 틀린 이유를 그 자리에서 이해했어요. 학원 모의고사보다 해설이 훨씬 친절해요." },
  { tag: "AP", name: "AP Calc 응시생", text: "문항 수와 시간이 실제 Section I 기준이라 페이스 연습에 도움이 됐어요. 계산기 허용 구간도 구분돼서 좋았습니다." },
  { tag: "AP", name: "AP Physics 응시생", text: "타이머와 검토 표시가 Bluebook처럼 되어 있어서 시험장 리허설 느낌으로 풀 수 있었어요." },
  { tag: "AP", name: "AP 학부모", text: "실전 분량으로 끊겨 있어서 아이가 어느 과목에서 시간이 부족한지 바로 보였습니다." },
];

const REVIEW_TAG_COLOR: Record<string, string> = { AP: "#1D9E75" };

function ExamReviews() {
  return (
    <div style={{ marginTop: 40 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 4 }}>
        <h2 style={{ fontSize: 19, fontWeight: 800, margin: 0, letterSpacing: "-0.02em" }}>실전 모의고사 후기</h2>
        <span style={{ fontSize: 13, color: "#f59e0b", fontWeight: 800 }}>★★★★★</span>
      </div>
      <p style={{ color: "#5b6b7b", fontSize: 13.5, margin: "0 0 16px" }}>AP Section I 실전 모드를 풀어본 학생·학부모들의 후기예요.</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 12 }}>
        {EXAM_REVIEWS.map((r, i) => (
          <div key={i} style={{ background: "#fff", border: "1px solid #e6ebf0", borderRadius: 14, padding: "16px 16px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 900, color: "#fff", background: REVIEW_TAG_COLOR[r.tag], borderRadius: 999, padding: "3px 9px" }}>{r.tag}</span>
              <span style={{ fontSize: 12, color: "#f59e0b", fontWeight: 800 }}>★★★★★</span>
            </div>
            <p style={{ margin: "0 0 10px", fontSize: 13.5, lineHeight: 1.6, color: "#3a4756" }}>“{r.text}”</p>
            <div style={{ fontSize: 12, color: "#90a0b0", fontWeight: 600 }}>— {r.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ExamPage() {
  const [phase, setPhase] = useState<"start" | "directions" | "exam">("start");
  const [subjects, setSubjects] = useState<SubjectCount[]>([]);
  const [subject, setSubject] = useState<string>("");
  const [gate, setGate] = useState<"" | "login" | "paid" | "empty" | "nosubject">("");
  const [starting, setStarting] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  // Loaded test
  const [questions, setQuestions] = useState<BankQuestion[]>([]);
  const [subjectLabel, setSubjectLabel] = useState("AP Practice");
  const [setNumber, setSetNumber] = useState(1);
  const [preview, setPreview] = useState(false);
  const [fullMcq, setFullMcq] = useState(0);
  const [examMinutes, setExamMinutes] = useState(0);
  const [calcOpen, setCalcOpen] = useState(false);

  // Player state
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
  const [activePart, setActivePart] = useState(0);
  const submittedRef = useRef(false);

  useEffect(() => {
    const s = new URLSearchParams(window.location.search).get("subject") ?? "";
    setSubject(s);
    fetch("/api/question-bank/subjects")
      .then((r) => r.json())
      .then((d) => {
        // Only verified AP subjects with enough real MCQs to actually build a
        // current official Section I test. SAT/IB/AMC have separate formats and
        // must never be routed through this AP engine.
        // (examReady undefined → keep, so a stale cache never empties the list.)
        const list: SubjectCount[] = (d?.subjects ?? []).filter((x: SubjectCount) => {
          const courseId = x.courseId;
          if (!courseId || !isSupportedApExamCourse(courseId) || !(x.examReady ?? true)) return false;
          return (x.examPool ?? x.count) >= examSpecFor(courseId).mcq;
        });
        setSubjects(list);
        // Default to the first subject unless the URL ?subject= names a valid
        // one. Otherwise the <select> renders blank (value matches no option)
        // and "시작하기" silently no-ops because `subject` isn't a real course.
        if (list.length && !list.some((x) => x.courseId === s)) {
          setSubject(list[0].courseId!);
        }
      })
      .catch(() => {});
  }, []);

  // Countdown — auto-submits at 0.
  useEffect(() => {
    if (phase !== "exam" || submitted || questions.length === 0) return;
    const id = setInterval(() => {
      setRemaining((r) => { if (r <= 1) { clearInterval(id); finishActivePart(); return 0; } return r - 1; });
    }, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePart, phase, submitted, questions.length, subject]);

  useEffect(() => {
    if (phase === "exam" && !isApCalculatorAllowed(subject, idx)) setCalcOpen(false);
  }, [idx, phase, subject]);

  async function startSet(n: number) {
    if (!subject) {
      // No valid subject picked — guide the user instead of silently doing nothing.
      if (subjects[0]?.courseId) { setSubject(subjects[0].courseId); }
      else { setGate("nosubject"); }
      return;
    }
    // 5회 이용권은 시작마다 1회 차감 (무제한은 차감 없음).
    const access = consumeMock("ap");
    if (!access.ok) {
      if (access.reason === "exhausted") {
        window.alert("5회 이용권을 모두 사용했어요. '무제한' 이용권(500 크레딧)으로 업그레이드하면 계속 응시할 수 있어요.");
        window.dispatchEvent(new CustomEvent("inhero:open-charge"));
      }
      return;
    }
    setStarting(n); setGate("");
    try {
      const r = await authFetch(`/api/question-bank/exam-set?subject=${encodeURIComponent(subject)}&set=${n}`);
      if (r.status === 401) { setGate("login"); setStarting(null); return; }
      if (r.status === 403) { setGate("paid"); setStarting(null); return; }
      const d = await r.json();
      const qs: BankQuestion[] = d?.questions ?? [];
      if (qs.length === 0) { setGate("empty"); setStarting(null); return; }
      setQuestions(qs);
      setSubjectLabel(d.label ?? "AP Practice");
      setSetNumber(d.setNumber ?? n);
      setPreview(!!d.preview);
      setFullMcq(d.fullMcq ?? qs.length);
      setExamMinutes(d.minutes ?? examSpecFor(subject).minutes);
      setActivePart(0);
      setRemaining(apExamPartsFor(subject)[0]?.minutes * 60 || (d.minutes ?? examSpecFor(subject).minutes) * 60);
      // reset player
      setIdx(0); setAnswers({}); setMarked({}); setCrossed({}); setCrossMode(false);
      setNavOpen(false); setReview(false); setSubmitted(false); submittedRef.current = false;
      setCalcOpen(false);
      setPhase("directions");
      window.scrollTo({ top: 0 });
    } catch {
      setGate("empty"); setStarting(null);
    }
    setStarting(null);
  }

  function backToStart() { setPhase("start"); setSubmitted(false); submittedRef.current = false; }

  const q = questions[idx];
  const total = questions.length;

  function select(optIndex: number) {
    if (!q || crossed[q.id]?.[optIndex]) return;
    setAnswers((a) => ({ ...a, [q.id]: optIndex }));
  }
  function toggleCross(optIndex: number) {
    if (!q) return;
    setCrossed((c) => { const cur = { ...(c[q.id] ?? {}) }; cur[optIndex] = !cur[optIndex]; return { ...c, [q.id]: cur }; });
    setAnswers((a) => (a[q.id] === optIndex ? (() => { const n = { ...a }; delete n[q.id]; return n; })() : a));
  }
  function toggleMark() { if (q) setMarked((m) => ({ ...m, [q.id]: !m[q.id] })); }

  function doSubmit() {
    if (submittedRef.current) return;
    submittedRef.current = true;
    setSubmitted(true); setNavOpen(false); setReview(false); window.scrollTo({ top: 0 });
  }

  function finishActivePart() {
    const parts = apExamPartsFor(subject);
    const nextPart = activePart + 1;
    if (nextPart < parts.length) {
      setActivePart(nextPart);
      setIdx(Math.max(0, parts[nextPart].startsAtQuestion - 1));
      setRemaining(parts[nextPart].minutes * 60);
      setNavOpen(false);
      setReview(false);
      setCalcOpen(false);
      window.scrollTo({ top: 0 });
      return;
    }
    doSubmit();
  }

  const score = useMemo(() => {
    let c = 0;
    for (const item of questions) { const a = answers[item.id]; if (a != null && item.options[a]?.correct) c++; }
    return c;
  }, [questions, answers]);

  // ---------- START SCREEN ----------
  if (phase === "start") {
    const spec = examSpecFor(subject);
    // Show only as many non-overlapping Practice Tests as this subject's pool
    // supports (examPool / per-test MCQ count), capped at PRACTICE_SETS — so a
    // thin subject never offers duplicate "Test 4/5" sets.
    const subjectMeta = subjects.find((x) => x.courseId === subject);
    const availableSets = Math.max(
      1,
      Math.min(PRACTICE_SETS, Math.floor((subjectMeta?.examPool ?? spec.mcq) / Math.max(1, spec.mcq)))
    );
    return (
      <div style={{ minHeight: "100vh", background: "#f6f8fa", color: "#1d2733" }}>
        <div style={{ height: 56, borderBottom: "1px solid #e6ebf0", display: "flex", alignItems: "center", padding: "0 18px", background: "#fff" }}>
          <Link href="/parents/question-bank" style={{ color: "#475569", textDecoration: "none", fontWeight: 600, fontSize: 14 }}>← 문제 은행</Link>
          <div style={{ flex: 1, textAlign: "center", fontWeight: 800 }}>🖥️ Bluebook 실전 모드</div>
          <div style={{ width: 80 }} />
        </div>

        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 28px 80px" }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
            <LiveStatBadge base={45} emoji="💳" label="오늘 결제" tone={BLUE} />
            <LiveStatBadge base={128} emoji="🎯" label="오늘 응시" tone="#0f7b53" />
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 800, margin: 0, letterSpacing: "-0.02em" }}>실제 디지털 AP처럼 풀어보세요</h1>
          <p style={{ color: "#5b6b7b", fontSize: 14.5, marginTop: 8, lineHeight: 1.7 }}>
            College Board Bluebook 화면 그대로 — 과목별 <b>실제 AP Section I(객관식)</b> 분량과 시간으로 구성된 모의고사입니다.
          </p>

          {/* Trust signal — deterministic answer keys + reviewed solutions, while
              staying clearly distinct from College Board's official exams. */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", background: "#eef4ff", border: `1px solid ${BLUE}44`, borderRadius: 12, padding: "12px 16px", marginTop: 16 }}>
            <span style={{ fontSize: 12, fontWeight: 900, color: "#fff", background: BLUE, borderRadius: 999, padding: "4px 10px", whiteSpace: "nowrap" }}>✓ 검증 완료</span>
            <span style={{ fontSize: 13.5, fontWeight: 700, color: "#1a3f8f", lineHeight: 1.5 }}>
              실제 시험과 동일 형식 · 전 문항 정답·해설 검수 완료 — 풀면 문항별 상세 해설이 바로 나옵니다.
            </span>
          </div>

          {/* Free sample — no login, no credits. The question bank gives a free
              12-question taste of real AP items before the paid mock gate. */}
          <Link href="/parents/question-bank" style={{
            display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", textDecoration: "none",
            background: "#f0fdf6", border: "1px solid #2aa56e66", borderRadius: 12, padding: "13px 16px", marginTop: 16,
          }}>
            <span style={{ fontSize: 12, fontWeight: 900, color: "#fff", background: "#0f7b53", borderRadius: 999, padding: "4px 10px", whiteSpace: "nowrap" }}>🎁 무료 샘플</span>
            <span style={{ flex: 1, minWidth: 180, fontSize: 13.5, fontWeight: 700, color: "#0a6b3d", lineHeight: 1.5 }}>
              결제 전에 <strong>문제은행 무료 맛보기</strong>로 실제 AP 문항·해설을 먼저 풀어보세요 — 로그인 불필요.
            </span>
            <span style={{ fontSize: 13.5, fontWeight: 800, color: "#047a45", whiteSpace: "nowrap" }}>샘플 풀어보기 →</span>
          </Link>

          {/* Subject selector */}
          <label style={{ display: "block", marginTop: 22, fontSize: 13, fontWeight: 700, color: "#3a4756", marginBottom: 6 }}>과목</label>
          <select value={subject} onChange={(e) => { setSubject(e.target.value); setGate(""); }}
            style={{ width: "100%", padding: "12px 12px", border: "1px solid #d8dee5", borderRadius: 10, fontSize: 15, background: "#fff" }}>
            <option value="" disabled>{subjects.length ? "과목을 선택하세요" : "과목 불러오는 중…"}</option>
            {subjects.map((s) => <option key={s.courseId!} value={s.courseId!}>{s.emoji} {s.label} ({s.count})</option>)}
          </select>

          {/* 500-credit consulting reward — shown right at the purchase point. */}
          <div style={{ marginTop: 24 }}><ConsultOffer /></div>

          {/* Practice sets — paid bundle (SAT 모의고사와 동일 구조). 한 번 열면
              모든 과목의 Test 1·2·3 풀세트를 계속 응시할 수 있어요. */}
          <div style={{ marginTop: 24 }}>
          <CreditGate
            gateKey="parents:ap-mock:5"
            cost={CREDIT_COSTS.MOCK_5PACK}
            bundleKey="parents:ap-mock"
            bundleCost={CREDIT_COSTS.AP_MOCK}
            bundleLabel="무제한"
            allowAdminBypass={false}
            title="AP 모의고사 이용권"
            desc="College Board Bluebook과 동일한 형식의 AP 실전 모의고사. 5회 이용권(200) 또는 무제한(500) 중 선택하세요. (무료 미리보기는 과목당 몇 문항 제공)"
          >
          {mounted && (() => {
            const tier = mockTier("ap");
            const rem = mockRemaining("ap");
            return (
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#f7f8fa", border: "1px solid #e6ebf0", borderRadius: 999, padding: "7px 14px", marginBottom: 14, fontSize: 12.5, fontWeight: 800 }}>
                {tier === "unlimited"
                  ? <span style={{ color: "#047a45" }}>♾️ 무제한 이용권 · 횟수 제한 없음</span>
                  : <span style={{ color: (rem ?? 0) > 0 ? "#b45309" : "#dc2626" }}>🎟️ 5회 이용권 · 남은 횟수 {rem ?? 0}/{MOCK_PACK_LIMIT}</span>}
              </div>
            );
          })()}
          <div style={{ display: "grid", gap: 14 }}>
            {Array.from({ length: availableSets }, (_, i) => i + 1).map((n) => (
              <div key={n} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fff", border: "1px solid #e6ebf0", borderRadius: 14, padding: "20px 20px" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontWeight: 800, fontSize: 18 }}>Practice Test {n}</span>
                    {n === 1 && <span style={{ fontSize: 11, fontWeight: 900, color: "#fff", background: "#dc2680", borderRadius: 999, padding: "2px 8px" }}>🔥 인기</span>}
                  </div>
                  <div style={{ color: "#5b6b7b", fontSize: 13.5, marginTop: 4 }}>Section I · 객관식 약 {spec.mcq}문항 · {spec.minutes}분 · 응시 {320 - n * 47}명</div>
                </div>
                <button onClick={() => startSet(n)} disabled={starting === n}
                  style={{ background: BLUE, color: "#fff", border: "none", borderRadius: 10, padding: "12px 22px", fontWeight: 800, fontSize: 14.5, cursor: "pointer", opacity: starting === n ? 0.7 : 1 }}>
                  {starting === n ? "준비 중…" : "시작하기 →"}
                </button>
              </div>
            ))}
          </div>
          </CreditGate>
          </div>

          {gate === "login" && (
            <GateBox text="실전 모드는 로그인 후 이용할 수 있어요.">
              <button onClick={() => window.dispatchEvent(new CustomEvent("inhero:open-auth", { detail: { mode: "signup", source: "exam", redirectTo: "/parents/question-bank/exam" } }))} style={gateBtn}>로그인 / 가입하기</button>
            </GateBox>
          )}
          {gate === "paid" && (
            <GateBox text="이 과목의 풀세트 실전 모의고사는 모의고사 이용권으로 풀 수 있어요. 위 카드에서 이용권을 열면 바로 응시할 수 있어요.">
              <Link href="/parents/question-bank" style={{ ...gateBtn, textDecoration: "none", display: "inline-block" }}>← 문제 은행으로</Link>
            </GateBox>
          )}
          {gate === "empty" && <GateBox text="이 과목의 문제가 아직 충분하지 않아요. 다른 과목을 선택해 주세요." />}
          {gate === "nosubject" && <GateBox text="먼저 위에서 과목을 선택해 주세요." />}

          <ExamReviews />
        </div>
      </div>
    );
  }

  // ---------- DIRECTIONS ----------
  if (phase === "directions") {
    const calcNote = apCalculatorNote(subject);
    const parts = apExamPartsFor(subject);
    return (
      <div style={{ minHeight: "100vh", background: "#fff", color: "#1d2733", display: "flex", flexDirection: "column" }}>
        <TopBar subject={subjectLabel} setNumber={setNumber} center={<span style={{ fontWeight: 700 }}>지시사항 (Directions)</span>} />
        <div style={{ flex: 1, maxWidth: 680, margin: "0 auto", padding: "36px 20px", width: "100%" }}>
          <h2 style={{ fontSize: 24, fontWeight: 800, margin: 0, letterSpacing: "-0.02em" }}>{subjectLabel} — Practice Test {setNumber}</h2>
          <p style={{ color: "#5b6b7b", marginTop: 8, fontSize: 14.5 }}>Section I · 객관식 {total}문항 · {examMinutes}분{preview ? " (무료 미리보기)" : ""}</p>
          <ul style={{ marginTop: 22, paddingLeft: 0, listStyle: "none", display: "grid", gap: 12, fontSize: 14.5, color: "#3a4756", lineHeight: 1.6 }}>
            <li>• 각 문항에서 4개 보기 중 정답 1개를 고릅니다.</li>
            <li>• 상단 <b>타이머</b>가 0이 되면 자동 제출됩니다. (숨기기 가능)</li>
            <li>• <b>보기 지우기</b>로 오답 후보를 소거하고, <b>🚩 검토 표시</b>로 다시 볼 문항을 표시하세요.</li>
            <li>• 하단 <b>문항 네비게이터</b>로 자유롭게 이동하고, 마지막에 <b>검토 페이지</b>에서 제출합니다.</li>
            {parts.length > 1 && <li>• 이 과목은 실제 시험처럼 파트별로 진행됩니다: {parts.map((part) => `${part.label} ${part.startsAtQuestion}-${part.endsAtQuestion}번 · ${part.minutes}분`).join(" / ")}.</li>}
            {calcNote && <li>• <b>계산기 정책</b>: {calcNote} (허용 구간에서만 우측 하단 🖩 버튼이 열립니다.)</li>}
            <li>• 제출하면 <b>채점 결과 + 문항별 상세 해설</b>을 볼 수 있습니다. (정답·풀이 검수 완료)</li>
          </ul>
          <p style={{ fontSize: 13, color: "#90a0b0", marginTop: 18 }}>준비되면 시작하세요. 타이머는 시작과 동시에 작동합니다.</p>
        </div>
        <BottomBar
          left={<button onClick={backToStart} style={btnOutline}>← 뒤로</button>}
          right={<button onClick={() => { setPhase("exam"); window.scrollTo({ top: 0 }); }} style={btnBlue}>시험 시작 →</button>}
        />
      </div>
    );
  }

  // ---------- RESULTS ----------
  if (submitted) {
    const pct = total ? Math.round((score / total) * 100) : 0;
    return (
      <div style={{ minHeight: "100vh", background: "#fff", color: "#1d2733" }}>
        <TopBar subject={subjectLabel} setNumber={setNumber} center={<span style={{ fontWeight: 700 }}>채점 결과</span>} />
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "32px 24px 80px" }}>
          <div style={{ background: "#f4f8ff", border: `1px solid ${BLUE}33`, borderRadius: 16, padding: "26px 24px", textAlign: "center" }}>
            <div style={{ fontSize: 14, color: "#5b6b7b", fontWeight: 700 }}>{subjectLabel} · Practice Test {setNumber} · Section I (MCQ)</div>
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
          {preview && (
            <div style={{ marginTop: 24, background: "#fff7e6", border: "1px solid #f0c36d", borderLeft: "4px solid #e0a32e", borderRadius: 12, padding: "16px 18px" }}>
              <p style={{ margin: 0, fontSize: 14.5, color: "#3a4756", lineHeight: 1.6 }}>지금은 <b>무료 미리보기 {total}문항</b>이에요. 실제 시험과 동일한 <b>{fullMcq}문항 풀세트(Test 1·2·3)</b>는 모의고사 이용권으로 풀 수 있어요.</p>
              <Link href="/parents/question-bank" style={{ ...gateBtn, textDecoration: "none", display: "inline-block", marginTop: 12 }}>← 문제 은행으로</Link>
            </div>
          )}
          <div style={{ display: "flex", gap: 10, marginTop: 26 }}>
            <button onClick={() => startSet(setNumber)} style={btnBlue}>다시 풀기</button>
            <button onClick={backToStart} style={btnOutline}>다른 테스트 선택</button>
          </div>
        </div>
      </div>
    );
  }

  // ---------- REVIEW PAGE ----------
  if (review) {
    const parts = apExamPartsFor(subject);
    const part = parts[Math.min(activePart, parts.length - 1)];
    const partStart = Math.max(0, part.startsAtQuestion - 1);
    const partEnd = Math.min(total - 1, part.endsAtQuestion - 1);
    const activeQuestions = questions.slice(partStart, partEnd + 1);
    const activeAnsweredCount = activeQuestions.filter((item) => answers[item.id] != null).length;
    return (
      <div style={{ minHeight: "100vh", background: "#fff", color: "#1d2733", display: "flex", flexDirection: "column" }}>
        <TopBar subject={subjectLabel} setNumber={setNumber} center={<Timer remaining={remaining} hidden={timerHidden} onToggle={() => setTimerHidden((v) => !v)} />} />
        <div style={{ flex: 1, width: "100%", maxWidth: 1080, margin: "0 auto", padding: "32px clamp(20px, 4vw, 56px)" }}>
          <h2 style={{ fontSize: 22, fontWeight: 800, margin: 0 }}>검토 페이지</h2>
          <p style={{ color: "#5b6b7b", fontSize: 14, marginTop: 8 }}>제출 전, 표시한 문항이나 미응답을 확인하세요. ({part.label} 응답 {activeAnsweredCount}/{activeQuestions.length})</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(56px,1fr))", gap: 10, marginTop: 20 }}>
            {activeQuestions.map((item, i) => {
              const globalIndex = partStart + i;
              const done = answers[item.id] != null;
              return (
                <button key={item.id} onClick={() => { setReview(false); setIdx(globalIndex); }}
                  style={{ position: "relative", padding: "12px 0", borderRadius: 10, fontWeight: 800, fontSize: 14, cursor: "pointer",
                    border: `1px solid ${done ? BLUE : "#cdd6e0"}`, background: done ? BLUE : "#fff", color: done ? "#fff" : "#3a4756" }}>
                  {globalIndex + 1}{marked[item.id] && <span style={{ position: "absolute", top: -6, right: -6, fontSize: 12 }}>🚩</span>}
                </button>
              );
            })}
          </div>
        </div>
        <BottomBar
          left={<button onClick={() => setReview(false)} style={btnOutline}>← 시험으로</button>}
          right={<button onClick={finishActivePart} style={btnBlue}>{activePart < parts.length - 1 ? "다음 파트로 →" : "제출하기"}</button>}
        />
      </div>
    );
  }

  // ---------- QUESTION VIEW ----------
  const sel = answers[q.id];
  const qCross = crossed[q.id] ?? {};
  const parts = apExamPartsFor(subject);
  const part = parts[Math.min(activePart, parts.length - 1)];
  const partStart = Math.max(0, part.startsAtQuestion - 1);
  const partEnd = Math.min(total - 1, part.endsAtQuestion - 1);
  const activeQuestions = questions.slice(partStart, partEnd + 1);
  const activeAnsweredCount = activeQuestions.filter((item) => answers[item.id] != null).length;
  const calcAllowed = isApCalculatorAllowed(subject, idx);
  return (
    <div style={{ minHeight: "100vh", background: "#fff", color: "#1d2733", display: "flex", flexDirection: "column" }}>
      <TopBar subject={subjectLabel} setNumber={setNumber}
        center={<Timer remaining={remaining} hidden={timerHidden} onToggle={() => setTimerHidden((v) => !v)} />}
        right={
          <button onClick={() => setCrossMode((v) => !v)} title="보기 지우기"
            style={{ display: "inline-flex", alignItems: "center", gap: 6, border: `1px solid ${crossMode ? BLUE : "#d0d7de"}`, background: crossMode ? "#eaf2ff" : "#fff", color: crossMode ? BLUE : "#57606a", borderRadius: 8, padding: "6px 10px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
            <span style={{ textDecoration: "line-through" }}>ABC</span> 보기 지우기
          </button>
        } />

      {preview && (
        <div style={{ background: "#fff7e6", borderBottom: "1px solid #f0c36d", color: "#7a5b16", fontSize: 12.5, fontWeight: 700, textAlign: "center", padding: "8px 12px" }}>
          무료 미리보기 · {total}문항 (실제 시험 {fullMcq}문항) · 전체 풀세트는 전체 액세스에서
        </div>
      )}

      <div style={{ flex: 1, width: "100%", maxWidth: 1080, margin: "0 auto", padding: "20px clamp(20px, 5vw, 64px) 28px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #eef2f5", paddingBottom: 12 }}>
          <span style={{ fontWeight: 800, fontSize: 14 }}>{idx + 1} <span style={{ color: "#9aa6b2", fontWeight: 600 }}>/ {total}</span><span style={{ marginLeft: 8, color: "#5b6b7b", fontWeight: 700 }}>{part.label}</span></span>
          <button onClick={toggleMark} style={{ display: "inline-flex", alignItems: "center", gap: 6, border: "none", background: "none", cursor: "pointer", fontSize: 13.5, fontWeight: 700, color: marked[q.id] ? "#d98324" : "#57606a" }}>
            {marked[q.id] ? "🚩" : "🏳️"} 검토 표시
          </button>
        </div>

        <p style={{ fontSize: 17, lineHeight: 1.7, margin: "20px 0 22px", fontWeight: 600, maxWidth: 760 }}>{q.prompt}</p>

        <div style={{ display: "grid", gap: 12, maxWidth: 760 }}>
          {q.options.map((o, oi) => {
            const isSel = sel === oi;
            const isCrossed = !!qCross[oi];
            return (
              <div key={oi} style={{ display: "flex", alignItems: "stretch", gap: 8 }}>
                <button type="button" onClick={() => select(oi)} disabled={isCrossed}
                  style={{ flex: 1, textAlign: "left", display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderRadius: 12, cursor: isCrossed ? "default" : "pointer",
                    border: `1.5px solid ${isSel ? BLUE : "#d0d7de"}`, background: isSel ? "#eaf2ff" : "#fff", opacity: isCrossed ? 0.45 : 1 }}>
                  <span style={{ flexShrink: 0, width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, border: `1.5px solid ${isSel ? BLUE : "#9aa6b2"}`, background: isSel ? BLUE : "#fff", color: isSel ? "#fff" : "#3a4756" }}>{LETTERS[oi]}</span>
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
            <button onClick={() => setNavOpen((v) => !v)} style={{ ...btnOutline, fontWeight: 800 }}>{idx + 1} / {total} 문항 ▾</button>
            {navOpen && (
              <div style={{ position: "absolute", bottom: "calc(100% + 10px)", left: 0, width: 300, background: "#fff", border: "1px solid #e1e7ee", borderRadius: 14, boxShadow: "0 12px 40px rgba(0,0,0,0.18)", padding: 14, maxHeight: 320, overflowY: "auto" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#5b6b7b", marginBottom: 10 }}>
                  <span>{part.label} 응답 {activeAnsweredCount}/{activeQuestions.length}</span>
                  <button onClick={() => { setNavOpen(false); setReview(true); }} style={{ color: BLUE, background: "none", border: "none", fontWeight: 700, cursor: "pointer", fontSize: 12 }}>검토 페이지 →</button>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 8 }}>
                  {activeQuestions.map((item, i) => {
                    const globalIndex = partStart + i;
                    const done = answers[item.id] != null;
                    const cur = globalIndex === idx;
                    return (
                      <button key={item.id} onClick={() => { setIdx(globalIndex); setNavOpen(false); }}
                        style={{ position: "relative", padding: "8px 0", borderRadius: 8, fontSize: 13, fontWeight: 800, cursor: "pointer", border: `1px solid ${cur || done ? BLUE : "#cdd6e0"}`, outline: cur ? `2px solid ${BLUE}55` : "none", background: done ? BLUE : "#fff", color: done ? "#fff" : "#3a4756" }}>
                        {globalIndex + 1}{marked[item.id] && <span style={{ position: "absolute", top: -7, right: -5, fontSize: 10 }}>🚩</span>}
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
            <button onClick={() => setIdx((i) => Math.max(partStart, i - 1))} disabled={idx <= partStart} style={{ ...btnOutline, opacity: idx <= partStart ? 0.5 : 1 }}>← Back</button>
            {idx < partEnd
              ? <button onClick={() => setIdx((i) => Math.min(total - 1, i + 1))} style={btnBlue}>Next →</button>
              : activePart < parts.length - 1
              ? <button onClick={finishActivePart} style={btnBlue}>다음 파트로 →</button>
              : <button onClick={() => setReview(true)} style={btnBlue}>검토 및 제출 →</button>}
          </div>
        } />

      {calcAllowed && !calcOpen && (
        <button onClick={() => setCalcOpen(true)} title="계산기"
          style={{ position: "fixed", right: 18, bottom: 84, width: 52, height: 52, borderRadius: "50%", background: BLUE, color: "#fff", border: "none", fontSize: 22, cursor: "pointer", boxShadow: "0 8px 22px rgba(0,0,0,0.25)", zIndex: 901 }}>🖩</button>
      )}
      {calcAllowed && calcOpen && <Calculator onClose={() => setCalcOpen(false)} />}
    </div>
  );
}

function TopBar({ subject, setNumber, center, right }: { subject: string; setNumber: number; center?: React.ReactNode; right?: React.ReactNode }) {
  return (
    <div style={{ height: 56, borderBottom: "1px solid #e6ebf0", display: "flex", alignItems: "center", padding: "0 18px", background: "#fff" }}>
      <div style={{ flex: 1, fontWeight: 800, fontSize: 14.5, color: "#1d2733" }}>{subject} · Test {setNumber} · Section I</div>
      <div style={{ flex: "0 0 auto" }}>{center}</div>
      <div style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>{right}</div>
    </div>
  );
}

function Timer({ remaining, hidden, onToggle }: { remaining: number; hidden: boolean; onToggle: () => void }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
      <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: "0.02em", color: remaining < 60 ? "#c0392b" : "#1d2733", minWidth: 64, textAlign: "center" }}>{hidden ? "•:••" : fmt(remaining)}</div>
      <button onClick={onToggle} style={{ fontSize: 11, color: "#5b6b7b", background: "none", border: "none", cursor: "pointer", textDecoration: "underline" }}>{hidden ? "타이머 표시" : "타이머 숨기기"}</button>
    </div>
  );
}

function BottomBar({ left, right }: { left: React.ReactNode; right: React.ReactNode }) {
  return (
    <div style={{ height: 68, borderTop: "1px solid #e6ebf0", background: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 18px" }}>
      <div>{left}</div><div>{right}</div>
    </div>
  );
}

function Calculator({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    let calc: { destroy?: () => void } | null = null;
    const w = window as unknown as { Desmos?: { GraphingCalculator: (el: HTMLElement, opts?: unknown) => { destroy: () => void } } };
    const init = () => { if (ref.current && w.Desmos) calc = w.Desmos.GraphingCalculator(ref.current, { expressionsCollapsed: true, settingsMenu: false, border: false }); };
    if (w.Desmos) init();
    else {
      const id = "desmos-api-js";
      const existing = document.getElementById(id) as HTMLScriptElement | null;
      if (existing) existing.addEventListener("load", init);
      else {
        const sc = document.createElement("script");
        sc.id = id;
        sc.src = "https://www.desmos.com/api/v1.10/calculator.js?apiKey=dcb31709b452b1cf9dc26972add0fda6";
        sc.async = true; sc.onload = init;
        document.head.appendChild(sc);
      }
    }
    return () => { try { calc?.destroy?.(); } catch { /* ignore */ } };
  }, []);
  return (
    <div style={{ position: "fixed", right: 18, bottom: 84, width: 360, height: 440, background: "#fff", borderRadius: 14, boxShadow: "0 16px 50px rgba(0,0,0,0.28)", border: "1px solid #d8dee5", zIndex: 902, overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", borderBottom: "1px solid #eef2f5" }}>
        <span style={{ fontWeight: 800, fontSize: 13 }}>계산기 (Desmos)</span>
        <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 18, color: "#9aa6b2", cursor: "pointer" }}>×</button>
      </div>
      <div ref={ref} style={{ flex: 1 }} />
    </div>
  );
}

function GateBox({ text, children }: { text: string; children?: React.ReactNode }) {
  return (
    <div style={{ marginTop: 18, background: "#fff", border: "1px solid #f0c36d", borderLeft: "4px solid #e0a32e", borderRadius: 12, padding: "18px 18px" }}>
      <p style={{ margin: 0, fontSize: 14.5, color: "#3a4756", lineHeight: 1.6 }}>{text}</p>
      {children && <div style={{ marginTop: 12 }}>{children}</div>}
    </div>
  );
}

const btnBlue: React.CSSProperties = { background: BLUE, color: "#fff", border: "none", borderRadius: 10, padding: "11px 22px", fontWeight: 800, fontSize: 14.5, cursor: "pointer" };
const btnOutline: React.CSSProperties = { background: "#fff", color: "#3a4756", border: "1px solid #cdd6e0", borderRadius: 10, padding: "11px 18px", fontWeight: 700, fontSize: 14.5, cursor: "pointer" };
const gateBtn: React.CSSProperties = { background: "#1d2733", color: "#fff", border: "none", borderRadius: 10, padding: "11px 20px", fontWeight: 800, fontSize: 14, cursor: "pointer" };
