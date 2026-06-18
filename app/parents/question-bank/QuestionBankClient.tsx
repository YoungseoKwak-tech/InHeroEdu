"use client";

/**
 * /parents/question-bank — WHITE question bank for the parent portal.
 *
 * The cosmic /question-bank stays as-is; this is a parallel white-UI view that
 * pulls the SAME data (/api/question-bank/bank) so parents browse and actually
 * solve questions in the Naver/blog-style surface they trust. Free subjects are
 * fully answerable even logged-out (lead magnet); locked/paid questions show a
 * signup-gate stack.
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { authFetch, getClientSession } from "@/lib/client-auth";
import CreditGate from "@/components/parents/CreditGate";
import ReviewsStrip from "@/components/parents/ReviewsStrip";
import { CREDIT_COSTS } from "@/lib/credits";

const GREEN = "#00b85f";

interface BankOption { label: string; correct: boolean; feedback?: string | null; }
interface BankQuestion {
  id: string; subjectLabel: string; emoji: string; unit: number | null;
  prompt: string; options: BankOption[]; explanation?: string | null;
  similar?: { prompt: string; options: BankOption[] } | null; locked?: boolean;
}
interface SubjectCount { courseId: string | null; label: string; emoji: string; count: number; }

export default function QuestionBankClient() {
  const [subjects, setSubjects] = useState<SubjectCount[]>([]);
  // Seed with the current real count so the headline never flashes "0개" while
  // loading (that read as "0 questions" and made parents bounce). Live value
  // overwrites on fetch.
  const [total, setTotal] = useState(11975);
  const [active, setActive] = useState<string | null>(null);
  const [questions, setQuestions] = useState<BankQuestion[]>([]);
  const [filteredTotal, setFilteredTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => { getClientSession().then((s) => setLoggedIn(!!s?.user)).catch(() => {}); }, []);

  useEffect(() => {
    fetch("/api/question-bank/subjects")
      .then((r) => r.json())
      .then((d) => { setSubjects(d?.subjects ?? []); setTotal(d?.total ?? 0); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    const q = active ? `?subject=${active}` : "";
    authFetch(`/api/question-bank/bank${q}`)
      .then((r) => r.json())
      .then((d) => { setQuestions(d?.questions ?? []); setFilteredTotal(d?.total ?? (d?.questions?.length ?? 0)); })
      .catch(() => { setQuestions([]); setFilteredTotal(0); })
      .finally(() => setLoading(false));
  }, [active]);

  const unlocked = questions.filter((q) => !q.locked).slice(0, 12);
  const hasLocked = questions.some((q) => q.locked) || filteredTotal > unlocked.length;

  const gateSignup = () =>
    window.dispatchEvent(new CustomEvent("inhero:open-auth", { detail: { mode: "signup", redirectTo: "/parents/question-bank" } }));

  // Per-subject (200) vs all (1000) unlock. The "전체" view sells the all-pass;
  // a selected subject sells just that subject, with an all-pass upsell button.
  const ALL_KEY = "parents:question-bank"; // legacy all-pass key (keeps prior unlocks)
  const activeSubject = subjects.find((s) => s.courseId === active);

  return (
    <div style={{ position: "relative", zIndex: 10, minHeight: "100vh", background: "#eef1f4", color: "#1a1a1f", cursor: "auto", fontFamily: "'Inter', sans-serif" }}>
      {/* Top bar */}
      <div style={{ position: "sticky", top: 0, zIndex: 20, background: "rgba(255,255,255,0.94)", backdropFilter: "blur(8px)", borderBottom: "1px solid #e2e6ea" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/parents" style={{ color: "#475569", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>← 자료실</Link>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 15 }}>In<span style={{ color: GREEN }}>Hero</span> · 학부모</span>
        </div>
      </div>

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "36px 20px 90px" }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: "#dc2680", marginBottom: 10 }}>📝 AP 문제 은행</p>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.7rem,4vw,2.4rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 12 }}>
          {total.toLocaleString()}개 AP 실전 문제, 지금 풀어보세요
        </h1>
        <p style={{ fontSize: 14.5, color: "#475569", lineHeight: 1.75, marginBottom: 16 }}>
          College Board 스타일 실전 문제입니다. 보기를 눌러 바로 채점하고 해설을 확인하세요. 무료 과목은 가입 없이도 풀 수 있습니다.
        </p>

        {/* Bluebook-style exam mode */}
        <Link
          href={`/parents/question-bank/exam${active ? `?subject=${active}` : ""}`}
          style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#1f6feb", color: "#fff", textDecoration: "none", borderRadius: 12, padding: "12px 20px", fontWeight: 800, fontSize: 14.5, marginBottom: 24, boxShadow: "0 6px 18px rgba(31,111,235,0.28)" }}
        >
          🖥️ 실전 모드로 풀기 (Bluebook · 실제 디지털 AP 화면)
        </Link>

        {/* Subject chips */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 26 }}>
          <Chip active={active === null} onClick={() => setActive(null)} label="전체" emoji="🏦" count={total} />
          {subjects.map((s) => (
            <Chip key={s.courseId ?? s.label} active={active === s.courseId} onClick={() => setActive(s.courseId)} label={s.label} emoji={s.emoji} count={s.count} />
          ))}
        </div>

        <ReviewsStrip />

        {/* Questions */}
        {loading ? (
          <p style={{ color: "#94a3b8", fontSize: 14, padding: "30px 0", textAlign: "center" }}>문제를 불러오는 중…</p>
        ) : (!loggedIn && unlocked.length === 0) ? (
          // Signed-out + nothing to preview → invite signup. Signed-in users
          // fall through to the credit unlock (결제) gate below, never "무료 가입".
          <LockedCTA onClick={gateSignup} subjectLocked />
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {unlocked.map((q, i) => <QuestionCard key={q.id} q={q} index={i} />)}
            {hasLocked && (
              activeSubject ? (
                <CreditGate
                  gateKey={`${ALL_KEY}:${active}`}
                  cost={CREDIT_COSTS.SUBJECT}
                  bundleKey={ALL_KEY}
                  bundleCost={CREDIT_COSTS.QUESTION_BANK}
                  bundleLabel="전 과목 한 번에"
                  title={`${activeSubject.emoji} ${activeSubject.label} 문제은행 잠금해제`}
                  desc={`${activeSubject.label} ${activeSubject.count.toLocaleString()}문항 전체를 풀 수 있어요. 위 ${unlocked.length}문항은 무료 맛보기예요. (이 과목 200 · 전 과목 500)`}
                >
                  <Link href="/question-bank" style={{ display: "block", textAlign: "center", textDecoration: "none", background: "#0a0a14", color: "#fff", borderRadius: 12, padding: "16px 22px", fontWeight: 800, fontSize: 15 }}>
                    ✓ {activeSubject.label} 잠금해제됨 · 전체 문항 풀러가기 →
                  </Link>
                </CreditGate>
              ) : (
                <CreditGate
                  gateKey={ALL_KEY}
                  cost={CREDIT_COSTS.QUESTION_BANK}
                  title="AP 문제은행 전 과목 이용권"
                  desc={`College Board 스타일 ${total.toLocaleString()}개 전 과목 문항 풀 액세스. 위 ${unlocked.length}문항은 무료 맛보기예요. (과목별로는 위에서 과목을 고르면 200 크레딧)`}
                >
                  <Link href="/question-bank" style={{ display: "block", textAlign: "center", textDecoration: "none", background: "#0a0a14", color: "#fff", borderRadius: 12, padding: "16px 22px", fontWeight: 800, fontSize: 15 }}>
                    ✓ 전체 이용권 보유 · {total.toLocaleString()}문항 풀러가기 →
                  </Link>
                </CreditGate>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Chip({ active, onClick, label, emoji, count }: { active: boolean; onClick: () => void; label: string; emoji: string; count: number }) {
  return (
    <button onClick={onClick} style={{
      display: "inline-flex", alignItems: "center", gap: 7, padding: "8px 13px", borderRadius: 999,
      border: active ? `1.5px solid ${GREEN}` : "1px solid #e2e6ea", background: active ? "#e9fbf2" : "#fff",
      color: active ? "#047a45" : "#475569", fontSize: 13, fontWeight: active ? 800 : 600, cursor: "pointer",
    }}>
      <span>{emoji} {label}</span>
      <span style={{ fontSize: 11, color: active ? "#16a34a" : "#94a3b8" }}>{count.toLocaleString()}</span>
    </button>
  );
}

function QuestionCard({ q, index }: { q: BankQuestion; index: number }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #e2e6ea", borderRadius: 14, padding: "20px 22px", boxShadow: "0 1px 2px rgba(16,24,40,0.04)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
        <span style={{ fontSize: 12, fontWeight: 800, color: "#047a45" }}>{q.emoji} {q.subjectLabel}</span>
        {q.unit != null && <span style={{ fontSize: 10.5, fontWeight: 700, color: "#94a3b8", border: "1px solid #e2e6ea", borderRadius: 999, padding: "1px 8px" }}>Unit {q.unit}</span>}
        <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.06em", color: "#fff", background: GREEN, borderRadius: 999, padding: "2px 9px" }}>무료 · 풀어보기</span>
        <span style={{ marginLeft: "auto", fontSize: 11, color: "#cbd5e1" }}>#{index + 1}</span>
      </div>
      <Askable prompt={q.prompt} options={q.options} explanation={q.explanation} similar={q.similar} />
    </div>
  );
}

function Askable({ prompt, options, explanation, similar, nested = false }: {
  prompt: string; options: BankOption[]; explanation?: string | null;
  similar?: { prompt: string; options: BankOption[] } | null; nested?: boolean;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  const [showSimilar, setShowSimilar] = useState(false);
  const [ko, setKo] = useState<{ loading: boolean; text: string | null; error: string | null }>({ loading: false, text: null, error: null });

  async function translate() {
    if (!explanation || ko.loading || ko.text) return;
    setKo({ loading: true, text: null, error: null });
    try {
      const r = await authFetch("/api/question-bank/translate", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text: explanation }) });
      const d = await r.json();
      if (d?.korean) setKo({ loading: false, text: d.korean, error: null });
      else setKo({ loading: false, text: null, error: "지금은 번역을 불러올 수 없어요." });
    } catch { setKo({ loading: false, text: null, error: "지금은 번역을 불러올 수 없어요." }); }
  }

  const answered = picked !== null;
  const pickedOpt = answered ? options[picked!] : null;
  const isWrong = answered && !pickedOpt?.correct;

  return (
    <div>
      <p style={{ fontSize: nested ? 14 : 15, fontWeight: 600, color: "#1a1a1f", lineHeight: 1.6, marginBottom: 14, whiteSpace: "pre-wrap" }}>{prompt}</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {options.map((o, i) => {
          const chosen = picked === i;
          let border = "1px solid #e2e6ea", bg = "#fff", color = "#1f2937";
          if (answered) {
            if (o.correct) { border = `1.5px solid ${GREEN}`; bg = "#ecfdf5"; color = "#15803d"; }
            else if (chosen) { border = "1.5px solid #dc2626"; bg = "#fef2f2"; color = "#b91c1c"; }
            else { color = "#94a3b8"; }
          }
          return (
            <button key={i} disabled={answered} onClick={() => setPicked(i)}
              style={{ textAlign: "left", padding: "11px 14px", borderRadius: 10, border, background: bg, color, fontSize: 14, fontWeight: 500, cursor: answered ? "default" : "pointer", lineHeight: 1.5 }}>
              <span style={{ fontWeight: 800, marginRight: 8, opacity: 0.7 }}>{String.fromCharCode(65 + i)}</span>{o.label}
              {answered && o.correct && <span style={{ float: "right", fontWeight: 800 }}>✓ 정답</span>}
              {answered && chosen && !o.correct && <span style={{ float: "right", fontWeight: 800 }}>✕</span>}
            </button>
          );
        })}
      </div>

      {answered && (
        <div style={{ marginTop: 14 }}>
          {pickedOpt?.feedback && (
            <p style={{ fontSize: 13.5, color: isWrong ? "#b91c1c" : "#15803d", margin: "0 0 10px", lineHeight: 1.6 }}>{pickedOpt.feedback}</p>
          )}
          {explanation && (
            <div style={{ background: "#f7f8fa", borderLeft: `3px solid ${GREEN}`, borderRadius: 8, padding: "12px 14px" }}>
              <div style={{ fontSize: 11.5, fontWeight: 800, color: "#94a3b8", letterSpacing: "0.04em", marginBottom: 6 }}>해설</div>
              <p style={{ fontSize: 13.5, color: "#334155", lineHeight: 1.7, margin: 0, whiteSpace: "pre-wrap" }}>{ko.text ?? explanation}</p>
              {!ko.text && (
                <button onClick={translate} disabled={ko.loading} style={{ marginTop: 8, background: "none", border: "1px solid #cbd5e1", borderRadius: 6, padding: "5px 11px", fontSize: 12, fontWeight: 700, color: "#475569", cursor: "pointer" }}>
                  {ko.loading ? "번역 중…" : "🇰🇷 한국어 풀이"}
                </button>
              )}
              {ko.error && <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 6 }}>{ko.error}</p>}
            </div>
          )}
          {isWrong && similar && !nested && (
            <div style={{ marginTop: 12 }}>
              {!showSimilar ? (
                <button onClick={() => setShowSimilar(true)} style={{ background: "#1a1a1f", color: "#fff", border: "none", borderRadius: 8, padding: "9px 16px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                  비슷한 문제 풀기 →
                </button>
              ) : (
                <div style={{ background: "#fafbfc", border: "1px dashed #cbd5e1", borderRadius: 10, padding: "14px 16px" }}>
                  <div style={{ fontSize: 11.5, fontWeight: 800, color: "#94a3b8", marginBottom: 10 }}>비슷한 문제</div>
                  <Askable prompt={similar.prompt} options={similar.options} nested />
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function LockedCTA({ onClick, remaining, subjectLocked }: { onClick: () => void; remaining?: number; subjectLocked?: boolean }) {
  return (
    <div style={{ background: "linear-gradient(135deg,#0a0a14,#13131f)", borderRadius: 14, padding: "28px 26px", textAlign: "center" }}>
      <div style={{ fontSize: 30, marginBottom: 10 }}>🔒</div>
      <div style={{ color: "#fff", fontSize: 17, fontWeight: 800, marginBottom: 6 }}>
        {subjectLocked ? "이 과목은 가입 후 이용할 수 있어요" : `${remaining?.toLocaleString() ?? ""}개 문제가 더 있습니다`}
      </div>
      <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 13.5, marginBottom: 18 }}>무료 가입하면 전체 문제와 한국어 해설을 모두 이용할 수 있습니다. 카드 필요 없음.</p>
      <button onClick={onClick} style={{ background: GREEN, color: "#fff", border: "none", borderRadius: 8, padding: "13px 30px", fontWeight: 800, fontSize: 14.5, cursor: "pointer" }}>
        무료 가입하고 전체 풀기 →
      </button>
    </div>
  );
}
