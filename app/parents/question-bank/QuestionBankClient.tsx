"use client";

/**
 * /parents/question-bank — WHITE question bank for the parent portal.
 *
 * Two-pane workspace: a left rail to pick a subject (and a unit within it) and
 * a right pane that lists that subject's questions, answerable inline. Free
 * subjects + a small per-subject preview are answerable for everyone; the rest
 * is gated. Unlocking with credits (CreditGate) refetches and reveals the full
 * set RIGHT HERE — we never route parents out to the cosmic /question-bank.
 */

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { authFetch, getClientSession } from "@/lib/client-auth";
import CreditGate from "@/components/parents/CreditGate";
import ReviewsStrip from "@/components/parents/ReviewsStrip";
import { CREDIT_COSTS, CREDIT_EVENT, hydrateCredits } from "@/lib/credits";

const GREEN = "#00b85f";
const ALL_KEY = "parents:question-bank"; // all-pass; per-subject = `${ALL_KEY}:${courseId}`
const PREVIEW_N = 6; // free per-subject taste requested from the API

interface BankOption { label: string; correct: boolean; feedback?: string | null; }
interface BankQuestion {
  id: string; subjectLabel: string; emoji: string; unit: number | null;
  prompt: string; options: BankOption[]; explanation?: string | null;
  similar?: { prompt: string; options: BankOption[] } | null; locked?: boolean;
}
interface SubjectCount { courseId: string | null; label: string; emoji: string; count: number; }
interface UnitCount { unit: number; count: number; }

export default function QuestionBankClient() {
  const [subjects, setSubjects] = useState<SubjectCount[]>([]);
  // Seed with a real-ish count so the headline never flashes "0개" while loading.
  const [total, setTotal] = useState(11975);
  const [active, setActive] = useState<string | null>(null);
  const [activeUnit, setActiveUnit] = useState<number | null>(null);
  const [units, setUnits] = useState<UnitCount[]>([]);
  const [questions, setQuestions] = useState<BankQuestion[]>([]);
  const [filteredTotal, setFilteredTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => { getClientSession().then((s) => setLoggedIn(!!s?.user)).catch(() => {}); }, []);

  // Subject grid → also seed the right pane with the first subject so it's never
  // empty (the user picks a subject expecting to immediately see ITS questions).
  useEffect(() => {
    fetch("/api/question-bank/subjects")
      .then((r) => r.json())
      .then((d) => {
        const list: SubjectCount[] = d?.subjects ?? [];
        setSubjects(list);
        setTotal(d?.total ?? 0);
        setActive((cur) => cur ?? list.find((s) => s.courseId)?.courseId ?? null);
      })
      .catch(() => {});
  }, []);

  // Questions for the active subject (+ unit). preview=N gives a free taste even
  // for locked subjects; unlocked subjects come back fully answerable.
  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (active) params.set("subject", active);
    if (activeUnit != null) params.set("unit", String(activeUnit));
    params.set("preview", String(PREVIEW_N));
    authFetch(`/api/question-bank/bank?${params.toString()}`)
      .then((r) => r.json())
      .then((d) => {
        setQuestions(d?.questions ?? []);
        setFilteredTotal(d?.total ?? (d?.questions?.length ?? 0));
        // Units only change with the subject, not the unit filter.
        if (Array.isArray(d?.units)) setUnits(d.units);
      })
      .catch(() => { setQuestions([]); setFilteredTotal(0); })
      .finally(() => setLoading(false));
  }, [active, activeUnit, reloadKey]);

  // After a credit unlock, sync server state then refetch so the freshly
  // unlocked questions appear inline — no navigation, no /question-bank bounce.
  useEffect(() => {
    const onChange = () => { hydrateCredits().catch(() => {}).finally(() => setReloadKey((k) => k + 1)); };
    window.addEventListener(CREDIT_EVENT, onChange);
    return () => window.removeEventListener(CREDIT_EVENT, onChange);
  }, []);

  const selectSubject = useCallback((courseId: string | null) => {
    setActive(courseId);
    setActiveUnit(null);
    setUnits([]);
    setQuestions([]);
  }, []);

  const answerable = questions.filter((q) => !q.locked);
  const lockedQs = questions.filter((q) => q.locked);
  // Gate ONLY when the payload actually contains locked cards. (Don't infer from
  // filteredTotal > answerable — an unlocked subject with >150 questions is
  // paginated by the 150-card cap, not gated.)
  const hasLocked = lockedQs.length > 0;
  const activeSubject = subjects.find((s) => s.courseId === active);
  const lockedCount = Math.max(lockedQs.length, filteredTotal - answerable.length);

  const gateSignup = () =>
    window.dispatchEvent(new CustomEvent("inhero:open-auth", { detail: { mode: "signup", redirectTo: "/parents/question-bank" } }));

  return (
    <div style={{ position: "relative", zIndex: 10, minHeight: "100vh", background: "#eef1f4", color: "#1a1a1f", cursor: "auto", fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        .pqb-shell{display:grid;grid-template-columns:268px minmax(0,1fr);gap:24px;align-items:start}
        .pqb-rail{position:sticky;top:70px;max-height:calc(100vh - 92px);overflow:auto;padding-right:2px}
        @media(max-width:860px){.pqb-shell{grid-template-columns:1fr}.pqb-rail{position:static;max-height:340px}}
      `}</style>

      {/* Top bar */}
      <div style={{ position: "sticky", top: 0, zIndex: 20, background: "rgba(255,255,255,0.94)", backdropFilter: "blur(8px)", borderBottom: "1px solid #e2e6ea" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/parents" style={{ color: "#475569", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>← 자료실</Link>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 15 }}>In<span style={{ color: GREEN }}>Hero</span> · 학부모</span>
        </div>
      </div>

      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "32px 20px 90px" }}>
        {/* Hero */}
        <p style={{ fontSize: 13, fontWeight: 700, color: "#dc2680", marginBottom: 10 }}>📝 AP 문제 은행</p>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.6rem,3.6vw,2.3rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 12 }}>
          {total.toLocaleString()}개 AP 실전 문제, 지금 풀어보세요
        </h1>
        <p style={{ fontSize: 14.5, color: "#475569", lineHeight: 1.75, marginBottom: 16, maxWidth: 720 }}>
          College Board 스타일 실전 문제입니다. 왼쪽에서 과목과 유닛을 고르면 오른쪽에서 바로 풀고 채점·해설을 확인할 수 있어요. 무료 과목은 가입 없이도 풀 수 있습니다.
        </p>

        {/* Bluebook-style exam mode */}
        <Link
          href={`/parents/question-bank/exam${active ? `?subject=${active}` : ""}`}
          style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#1f6feb", color: "#fff", textDecoration: "none", borderRadius: 12, padding: "12px 20px", fontWeight: 800, fontSize: 14.5, marginBottom: 22, boxShadow: "0 6px 18px rgba(31,111,235,0.28)" }}
        >
          🖥️ 실전 모드로 풀기 (Bluebook · 실제 디지털 AP 화면)
        </Link>

        <ReviewsStrip />

        {/* Two-pane workspace */}
        <div className="pqb-shell" style={{ marginTop: 26 }}>
          {/* LEFT RAIL — subjects + units */}
          <aside className="pqb-rail">
            <div style={{ fontSize: 11.5, fontWeight: 800, color: "#94a3b8", letterSpacing: "0.06em", textTransform: "uppercase", margin: "0 0 8px 4px" }}>과목</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <RailItem active={active === null} emoji="🏦" label="전체" count={total} onClick={() => selectSubject(null)} />
              {subjects.map((s) => (
                <div key={s.courseId ?? s.label}>
                  <RailItem
                    active={active === s.courseId}
                    emoji={s.emoji}
                    label={s.label}
                    count={s.count}
                    onClick={() => selectSubject(s.courseId)}
                  />
                  {/* Units of the selected subject, nested under it */}
                  {active === s.courseId && units.length > 0 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 2, margin: "4px 0 6px 0", paddingLeft: 12, borderLeft: "2px solid #e2e6ea" }}>
                      <UnitItem active={activeUnit === null} label="전체 유닛" count={s.count} onClick={() => setActiveUnit(null)} />
                      {units.map((u) => (
                        <UnitItem key={u.unit} active={activeUnit === u.unit} label={`Unit ${u.unit}`} count={u.count} onClick={() => setActiveUnit(u.unit)} />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </aside>

          {/* RIGHT PANE — questions */}
          <main>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
              <h2 style={{ fontSize: 19, fontWeight: 800, margin: 0, letterSpacing: "-0.02em" }}>
                {activeSubject ? `${activeSubject.emoji} ${activeSubject.label}` : "🏦 전체 과목"}
                {activeUnit != null && <span style={{ color: "#94a3b8", fontWeight: 700 }}> · Unit {activeUnit}</span>}
              </h2>
              <span style={{ fontSize: 13, color: "#94a3b8", fontWeight: 600 }}>{filteredTotal.toLocaleString()}문항</span>
            </div>

            {loading ? (
              <p style={{ color: "#94a3b8", fontSize: 14, padding: "40px 0", textAlign: "center" }}>문제를 불러오는 중…</p>
            ) : (!loggedIn && answerable.length === 0) ? (
              <LockedCTA onClick={gateSignup} subjectLocked />
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {answerable.map((q, i) => <QuestionCard key={q.id} q={q} index={i} />)}

                {hasLocked && (
                  activeSubject ? (
                    <CreditGate
                      gateKey={`${ALL_KEY}:${active}`}
                      cost={CREDIT_COSTS.SUBJECT}
                      bundleKey={ALL_KEY}
                      bundleCost={CREDIT_COSTS.QUESTION_BANK}
                      bundleLabel="전 과목 한 번에"
                      title={`${activeSubject.emoji} ${activeSubject.label} 문제은행 잠금해제`}
                      desc={`${activeSubject.label} ${activeSubject.count.toLocaleString()}문항 전체를 여기서 바로 풀 수 있어요. 위 ${answerable.length}문항은 무료 맛보기예요. (이 과목 ${CREDIT_COSTS.SUBJECT} · 전 과목 ${CREDIT_COSTS.QUESTION_BANK})`}
                    >
                      <LockedTeaser items={lockedQs} count={lockedCount} />
                    </CreditGate>
                  ) : (
                    <CreditGate
                      gateKey={ALL_KEY}
                      cost={CREDIT_COSTS.QUESTION_BANK}
                      title="AP 문제은행 전 과목 이용권"
                      desc={`College Board 스타일 ${total.toLocaleString()}개 전 과목 문항을 여기서 바로 풀 수 있어요. 과목별로는 왼쪽에서 과목을 고르면 ${CREDIT_COSTS.SUBJECT} 크레딧이에요.`}
                    >
                      <LockedTeaser items={lockedQs} count={lockedCount} />
                    </CreditGate>
                  )
                )}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

function RailItem({ active, emoji, label, count, onClick }: { active: boolean; emoji: string; label: string; count: number; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{
      display: "flex", alignItems: "center", gap: 9, width: "100%", textAlign: "left", padding: "9px 11px", borderRadius: 10,
      border: active ? `1.5px solid ${GREEN}` : "1px solid transparent", background: active ? "#e9fbf2" : "transparent",
      color: active ? "#047a45" : "#334155", fontSize: 13.5, fontWeight: active ? 800 : 600, cursor: "pointer",
    }}>
      <span style={{ flexShrink: 0 }}>{emoji}</span>
      <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{label}</span>
      <span style={{ fontSize: 11, color: active ? "#16a34a" : "#94a3b8", fontWeight: 700 }}>{count.toLocaleString()}</span>
    </button>
  );
}

function UnitItem({ active, label, count, onClick }: { active: boolean; label: string; count: number; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{
      display: "flex", alignItems: "center", gap: 8, width: "100%", textAlign: "left", padding: "6px 10px", borderRadius: 8,
      border: "none", background: active ? "#0a0a14" : "transparent", color: active ? "#fff" : "#64748b",
      fontSize: 12.5, fontWeight: active ? 800 : 600, cursor: "pointer",
    }}>
      <span style={{ flex: 1 }}>{label}</span>
      <span style={{ fontSize: 10.5, color: active ? "rgba(255,255,255,0.7)" : "#cbd5e1", fontWeight: 700 }}>{count.toLocaleString()}</span>
    </button>
  );
}

function LockedTeaser({ items, count }: { items: BankQuestion[]; count: number }) {
  const teaser = items.slice(0, 3);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#64748b" }}>잠긴 {count.toLocaleString()}문항 미리보기</div>
      {teaser.map((q, i) => <QuestionCard key={q.id} q={q} index={i} />)}
    </div>
  );
}

function QuestionCard({ q, index }: { q: BankQuestion; index: number }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #e2e6ea", borderRadius: 14, padding: "20px 22px", boxShadow: "0 1px 2px rgba(16,24,40,0.04)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
        <span style={{ fontSize: 12, fontWeight: 800, color: "#047a45" }}>{q.emoji} {q.subjectLabel}</span>
        {q.unit != null && <span style={{ fontSize: 10.5, fontWeight: 700, color: "#94a3b8", border: "1px solid #e2e6ea", borderRadius: 999, padding: "1px 8px" }}>Unit {q.unit}</span>}
        {!q.locked && <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.06em", color: "#fff", background: GREEN, borderRadius: 999, padding: "2px 9px" }}>무료 · 풀어보기</span>}
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
