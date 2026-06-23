"use client";

/**
 * Question Bank — every practice question InHero has authored, pulled from
 * lesson overlays + the admin questions table (see /api/question-bank/bank).
 *
 * Click an option to answer. Right → green + explanation. Wrong → the
 * option's feedback + explanation, then a "Try a similar one" card with a
 * near-variant (the in-lesson followup), mirroring how the lessons teach.
 */

import { useEffect, useState } from "react";
import { authFetch } from "@/lib/client-auth";

interface BankOption {
  label: string;
  correct: boolean;
  feedback?: string | null;
}
interface BankQuestion {
  id: string;
  source: "lesson" | "admin";
  courseId: string | null;
  subjectLabel: string;
  emoji: string;
  lessonId: string | null;
  unit: number | null;
  prompt: string;
  options: BankOption[];
  explanation?: string | null;
  explanationKorean?: string | null;
  similar?: { prompt: string; options: BankOption[] } | null;
  /** Not in the student's paid plan — answers stripped server-side; render blurred. */
  locked?: boolean;
}
interface SubjectCount {
  courseId: string | null;
  label: string;
  emoji: string;
  count: number;
}

export default function QuestionBankPage() {
  const [subjects, setSubjects] = useState<SubjectCount[]>([]);
  const [total, setTotal] = useState(0);
  // Pre-select from ?subject= so course "Practice questions →" rows deep-link
  // straight into that subject's bank.
  const [active, setActive] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return new URLSearchParams(window.location.search).get("subject") || null;
  });
  const [questions, setQuestions] = useState<BankQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [accessMessage, setAccessMessage] = useState<string | null>(null);
  // Unit rail: per-unit counts for the active subject, plus the selected tab.
  const [units, setUnits] = useState<{ unit: number; count: number }[]>([]);
  const [unit, setUnit] = useState<number | null>(null);

  useEffect(() => {
    authFetch("/api/question-bank/bank?countOnly=true")
      .then(async (r) => {
        const d = await r.json();
        if (!r.ok) {
          setAccessMessage(questionBankAccessMessage(d.reason));
          setSubjects([]);
          setTotal(0);
          return null;
        }
        setAccessMessage(null);
        return d;
      })
      .then((d) => {
        if (!d) return;
        setSubjects(d.subjects ?? []);
        setTotal(d.total ?? 0);
      })
      .catch(() => setAccessMessage("Could not load your question-bank access. Try again in a moment."));
  }, []);

  const [filteredTotal, setFilteredTotal] = useState(0);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (active) params.set("subject", active);
    if (active && unit != null) params.set("unit", String(unit));
    const q = params.size > 0 ? `?${params.toString()}` : "";
    authFetch(`/api/question-bank/bank${q}`)
      .then(async (r) => {
        const d = await r.json();
        if (!r.ok) {
          setAccessMessage(questionBankAccessMessage(d.reason));
          return null;
        }
        setAccessMessage(null);
        return d;
      })
      .then((d) => {
        setQuestions(d?.questions ?? []);
        setFilteredTotal(d?.total ?? (d?.questions?.length ?? 0));
        setUnits(active ? (d?.units ?? []) : []);
      })
      .catch(() => {
        setAccessMessage("Could not load your question-bank access. Try again in a moment.");
        setQuestions([]);
        setFilteredTotal(0);
        setUnits([]);
      })
      .finally(() => setLoading(false));
  }, [active, unit]);

  // API already caps the payload; render what it sent. Free/answerable
  // questions render as normal cards; locked ones stack blurred behind a
  // single upgrade CTA.
  const unlockedShown = questions.filter((q) => !q.locked);
  const lockedShown = questions.filter((q) => q.locked);
  const lockedRemaining = Math.max(filteredTotal - unlockedShown.length, lockedShown.length);

  return (
    <div style={{ background: "#ffffff", minHeight: "100vh", padding: "72px 24px 120px", fontFamily: "Inter, sans-serif" }}>
      <div style={{ maxWidth: 880, margin: "0 auto" }}>
        {/* Header */}
        <p style={{ fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", color: "#00b85f", marginBottom: 14 }}>
          INHERO QUESTION BANK
        </p>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 5vw, 3.4rem)", fontWeight: 850, color: "#0b1220", letterSpacing: "-0.05em", lineHeight: 1.02, marginBottom: 14 }}>
          Every question.<br />Miss one, get one like it.
        </h1>
        <p style={{ fontSize: 15, color: "#5b6675", lineHeight: 1.7, marginBottom: 30, maxWidth: 620 }}>
          {total.toLocaleString()} practice questions pulled straight from InHero lessons — answer one, and if
          you miss it you get the explanation plus a similar problem to lock it in.
        </p>

        {/* Subject filter chips */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 34 }}>
          <Chip active={active === null} onClick={() => { setActive(null); setUnit(null); }} label="All" emoji="🏦" count={total} />
          {subjects.map((s) => (
            <Chip
              key={s.courseId ?? s.label}
              active={active === s.courseId}
              onClick={() => { setActive(s.courseId); setUnit(null); }}
              label={s.label}
              emoji={s.emoji}
              count={s.count}
            />
          ))}
        </div>

        {/* Unit rail (left) + questions: rail renders only inside a subject
            with unit-tagged questions. On narrow screens the rail collapses
            into a horizontal scroll row above the cards. */}
        <div className={units.length > 0 ? "qb-layout" : undefined}>
        {units.length > 0 && (
          <nav className="qb-unit-rail" aria-label="Units">
            <UnitTab active={unit === null} onClick={() => setUnit(null)} label="All units"
              count={units.reduce((sum, u) => sum + u.count, 0)} />
            {units.map((u) => (
              <UnitTab
                key={u.unit}
                active={unit === u.unit}
                onClick={() => setUnit(u.unit)}
                label={`Unit ${u.unit}`}
                count={u.count}
              />
            ))}
          </nav>
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
        {/* Questions */}
        {accessMessage ? (
          <div
            style={{
              borderRadius: 18,
              border: "1px solid rgba(201,168,76,0.28)",
              background: "rgba(201,168,76,0.07)",
              padding: "22px 24px",
              color: "#5b6675",
              fontSize: 14,
              lineHeight: 1.7,
            }}
          >
            <p style={{ color: "#C9A84C", fontWeight: 900, letterSpacing: "0.12em", fontSize: 11, marginBottom: 8, textTransform: "uppercase" }}>
              Question bank
            </p>
            <p style={{ margin: 0 }}>{accessMessage}</p>
          </div>
        ) : loading ? (
          <QuestionLoader />
        ) : questions.length === 0 ? (
          <p style={{ color: "#94a3b8", fontSize: 14 }}>No questions here yet.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {unlockedShown.map((q, i) => (
              <QuestionCard key={q.id} q={q} index={i} free={lockedShown.length > 0} />
            ))}
            {lockedShown.length > 0 && (
              <LockedStack
                questions={lockedShown.slice(0, 4)}
                startIndex={unlockedShown.length}
                lockedCount={lockedRemaining}
              />
            )}
            {lockedShown.length === 0 && filteredTotal > unlockedShown.length && (
              <p style={{ color: "#94a3b8", fontSize: 13, textAlign: "center", marginTop: 8 }}>
                Showing first {unlockedShown.length} of {filteredTotal.toLocaleString()} — filter by subject to narrow.
              </p>
            )}
          </div>
        )}
        </div>
        </div>
        <style>{`
          .qb-layout { display: flex; gap: 22px; align-items: flex-start; }
          .qb-unit-rail {
            position: sticky; top: 86px;
            width: 168px; flex-shrink: 0;
            display: flex; flex-direction: column; gap: 6px;
            max-height: calc(100vh - 110px); overflow-y: auto;
            padding-right: 2px;
          }
          @media (max-width: 860px) {
            .qb-layout { display: block; }
            .qb-unit-rail {
              position: static; width: 100%; max-height: none;
              flex-direction: row; overflow-x: auto;
              padding-bottom: 10px; margin-bottom: 18px;
            }
            .qb-unit-rail > button { flex-shrink: 0; }
          }
        `}</style>
      </div>
    </div>
  );
}

/** One tab in the unit rail — sticky left on desktop, scroll row on mobile. */
function UnitTab({ active, onClick, label, count }: { active: boolean; onClick: () => void; label: string; count: number }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10,
        padding: "9px 13px",
        borderRadius: 11,
        border: active ? "1px solid #00b85f" : "1px solid #e8ecf1",
        background: active ? "rgba(0,184,95,0.10)" : "#fff",
        color: active ? "#00b85f" : "#5b6675",
        fontSize: 13, fontWeight: active ? 800 : 600,
        cursor: "pointer", textAlign: "left", whiteSpace: "nowrap",
        transition: "border-color 150ms ease, background 150ms ease, color 150ms ease",
      }}
    >
      <span>{label}</span>
      <span style={{ fontSize: 11, fontWeight: 700, color: active ? "#00b85f" : "#94a3b8" }}>
        {count.toLocaleString()}
      </span>
    </button>
  );
}

function QuestionLoader() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 22,
        padding: "90px 0",
        textAlign: "center",
      }}
    >
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: "50%",
          border: "5px solid rgba(0,184,95,0.15)",
          borderTopColor: "#00b85f",
          animation: "qb-spin 0.8s linear infinite",
          boxShadow: "0 0 32px rgba(0,184,95,0.25)",
        }}
      />
      <div>
        <p style={{ color: "#0b1220", fontSize: 17, fontWeight: 800, margin: "0 0 6px", letterSpacing: "-0.01em" }}>
          Loading your questions…
        </p>
        <p style={{ color: "#5b6675", fontSize: 13.5, margin: 0 }}>
          Pulling practice problems from every InHero lesson.
        </p>
      </div>
      <style>{`
        @keyframes qb-spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

function questionBankAccessMessage(reason?: string) {
  if (reason === "sign_in_required") return "Sign in to browse the question bank — a couple of free questions per subject are on us.";
  return "Could not load the question bank. Try again in a moment.";
}

/** Blurred stack of locked questions with a single upgrade CTA floating on top. */
function LockedStack({
  questions,
  startIndex,
  lockedCount,
}: {
  questions: BankQuestion[];
  startIndex: number;
  lockedCount: number;
}) {
  return (
    <div style={{ position: "relative", marginTop: 4 }}>
      <div
        aria-hidden
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          filter: "blur(7px)",
          pointerEvents: "none",
          userSelect: "none",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0.25))",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.9), rgba(0,0,0,0.25))",
        }}
      >
        {questions.map((q, i) => (
          <QuestionCard key={q.id} q={q} index={startIndex + i} />
        ))}
      </div>

      {/* Upgrade CTA */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
        }}
      >
        <div
          style={{
            borderRadius: 18,
            border: "1px solid #e8ecf1",
            background: "#fff",
            boxShadow: "0 16px 48px rgba(16,24,40,0.12)",
            padding: "28px 32px",
            textAlign: "center",
            maxWidth: 420,
          }}
        >
          <p style={{ fontSize: 26, margin: "0 0 10px" }}>🔒</p>
          <p style={{ color: "#0b1220", fontSize: 17, fontWeight: 850, letterSpacing: "-0.02em", margin: "0 0 8px" }}>
            {lockedCount.toLocaleString()} more questions locked
          </p>
          <p style={{ color: "#5b6675", fontSize: 13.5, lineHeight: 1.65, margin: "0 0 18px" }}>
            You tried the free ones — unlock the full bank with One Subject Elite or the All Subject Pass.
          </p>
          <a
            href="/pricing"
            style={{
              display: "inline-block",
              padding: "11px 26px",
              borderRadius: 999,
              background: "#C9A84C",
              color: "#0a0a0a",
              fontSize: 13.5,
              fontWeight: 850,
              letterSpacing: "0.02em",
              textDecoration: "none",
            }}
          >
            Unlock the full bank →
          </a>
        </div>
      </div>
    </div>
  );
}

function Chip({ active, onClick, label, emoji, count }: { active: boolean; onClick: () => void; label: string; emoji: string; count: number }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 7,
        padding: "8px 14px",
        borderRadius: 999,
        fontSize: 13,
        fontWeight: 700,
        cursor: "pointer",
        border: active ? "1px solid #00b85f" : "1px solid #e8ecf1",
        background: active ? "rgba(0,184,95,0.10)" : "#fff",
        color: active ? "#00b85f" : "#5b6675",
        transition: "all .12s",
      }}
    >
      <span>{emoji}</span>
      {label}
      <span style={{ opacity: 0.6, fontSize: 11 }}>{count}</span>
    </button>
  );
}

function QuestionCard({ q, index, free = false }: { q: BankQuestion; index: number; free?: boolean }) {
  return (
    <div
      style={{
        borderRadius: 16,
        border: free ? "1px solid #00b85f" : "1px solid #e8ecf1",
        background: free ? "rgba(0,184,95,0.05)" : "#fff",
        boxShadow: "0 1px 2px rgba(16,24,40,0.04)",
        padding: "20px 22px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
        <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.06em", color: "#00b85f" }}>
          {q.emoji} {q.subjectLabel}
        </span>
        {q.unit != null && (
          <span style={{ fontSize: 10, fontWeight: 700, color: "#5b6675", border: "1px solid #e8ecf1", borderRadius: 999, padding: "2px 8px" }}>
            Unit {q.unit}
          </span>
        )}
        {free && (
          <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.1em", color: "#fff", background: "#00b85f", borderRadius: 999, padding: "2px 9px" }}>
            FREE · SOLVE IT
          </span>
        )}
        <span style={{ marginLeft: "auto", fontSize: 11, color: "#94a3b8" }}>#{index + 1}</span>
      </div>
      <Askable prompt={q.prompt} options={q.options} explanation={q.explanation} explanationKorean={q.explanationKorean} similar={q.similar} />
    </div>
  );
}

/** One answerable MCQ. Reveals feedback on click; on a wrong answer it
 *  offers the similar question as a nested Askable. */
function Askable({
  prompt,
  options,
  explanation,
  explanationKorean,
  similar,
  nested = false,
}: {
  prompt: string;
  options: BankOption[];
  explanation?: string | null;
  explanationKorean?: string | null;
  similar?: { prompt: string; options: BankOption[] } | null;
  nested?: boolean;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  const [showSimilar, setShowSimilar] = useState(false);
  // 풀이만 한국어로 — show the pre-authored Korean solution when one exists
  // (precise, instant), else translate the explanation on demand.
  const [ko, setKo] = useState<{ loading: boolean; text: string | null; error: string | null }>(
    { loading: false, text: explanationKorean ?? null, error: null }
  );

  async function translateExplanation() {
    if (explanationKorean) { setKo({ loading: false, text: explanationKorean, error: null }); return; }
    if (!explanation || ko.loading || ko.text) return;
    setKo({ loading: true, text: null, error: null });
    try {
      const r = await authFetch("/api/question-bank/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: explanation }),
      });
      const d = await r.json();
      if (d?.korean) {
        setKo({ loading: false, text: d.korean, error: null });
      } else {
        setKo({ loading: false, text: null, error: "Couldn't load the translation right now. Please try again in a moment." });
      }
    } catch {
      setKo({ loading: false, text: null, error: "Couldn't load the translation right now. Please try again in a moment." });
    }
  }

  const answered = picked !== null;
  const pickedOpt = answered ? options[picked!] : null;
  const isWrong = answered && !pickedOpt?.correct;

  return (
    <div>
      <p style={{ fontSize: nested ? 14 : 15.5, fontWeight: 600, color: "#0b1220", lineHeight: 1.55, marginBottom: 14, whiteSpace: "pre-wrap" }}>
        {prompt}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {options.map((o, i) => {
          const chosen = picked === i;
          let border = "1px solid #e8ecf1";
          let bg = "#fff";
          let color = "#0b1220";
          if (answered) {
            if (o.correct) {
              border = "1px solid #00b85f";
              bg = "rgba(0,184,95,0.10)";
              color = "#00b85f";
            } else if (chosen) {
              border = "1px solid rgba(220,38,38,0.55)";
              bg = "rgba(220,38,38,0.08)";
              color = "#dc2626";
            } else {
              color = "#94a3b8";
            }
          }
          return (
            <button
              key={i}
              disabled={answered}
              onClick={() => setPicked(i)}
              style={{
                textAlign: "left",
                padding: "11px 14px",
                borderRadius: 11,
                border,
                background: bg,
                color,
                fontSize: 14,
                fontWeight: 500,
                cursor: answered ? "default" : "pointer",
                lineHeight: 1.5,
                transition: "all .1s",
              }}
            >
              {answered && o.correct ? "✓ " : answered && chosen ? "✗ " : ""}
              {o.label}
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {answered && (
        <div style={{ marginTop: 14 }}>
          {pickedOpt?.feedback && (
            <p style={{ fontSize: 13.5, lineHeight: 1.6, color: isWrong ? "#dc2626" : "#00b85f", margin: "0 0 8px" }}>
              {pickedOpt.feedback}
            </p>
          )}
          {explanation && (
            <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "#5b6675", margin: 0, borderLeft: "2px solid #e8ecf1", paddingLeft: 12 }}>
              {explanation}
            </p>
          )}

          {/* 풀이만 한국어로 — translates the explanation, not the question. */}
          {explanation && !ko.text && (
            <button
              onClick={translateExplanation}
              disabled={ko.loading}
              style={{
                marginTop: 10,
                padding: "7px 13px",
                borderRadius: 9,
                border: "1px solid #00b85f",
                background: "rgba(0,184,95,0.10)",
                color: "#00b85f",
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: "0.02em",
                cursor: ko.loading ? "default" : "pointer",
              }}
            >
              {ko.loading ? "Translating…" : "🇰🇷 View solution in Korean"}
            </button>
          )}

          {ko.error && (
            <p style={{ fontSize: 12.5, lineHeight: 1.6, color: "#dc2626", margin: "10px 0 0" }}>
              {ko.error}
            </p>
          )}

          {ko.text && (
            <div style={{ marginTop: 12, borderLeft: "2px solid #00b85f", paddingLeft: 12 }}>
              <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "#00b85f", margin: "0 0 6px" }}>
Korean solution
              </p>
              <p style={{ fontSize: 13.5, lineHeight: 1.7, color: "#5b6675", margin: 0, whiteSpace: "pre-wrap" }}>
                {ko.text}
              </p>
            </div>
          )}

          {isWrong && similar && !showSimilar && (
            <button
              onClick={() => setShowSimilar(true)}
              style={{
                marginTop: 14,
                padding: "9px 16px",
                borderRadius: 10,
                border: "1px solid rgba(201,168,76,0.5)",
                background: "rgba(201,168,76,0.12)",
                color: "#8a6d1f",
                fontSize: 12.5,
                fontWeight: 800,
                letterSpacing: "0.04em",
                cursor: "pointer",
              }}
            >
              ↻ Try a similar one →
            </button>
          )}
        </div>
      )}

      {/* Similar problem (the in-lesson followup) */}
      {showSimilar && similar && (
        <div style={{ marginTop: 16, padding: "16px 16px 4px", borderRadius: 12, border: "1px dashed rgba(201,168,76,0.4)", background: "rgba(201,168,76,0.04)" }}>
          <p style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: "0.18em", textTransform: "uppercase", color: "#C9A84C", margin: "0 0 10px" }}>
            Similar problem
          </p>
          <Askable prompt={similar.prompt} options={similar.options} nested />
          <div style={{ height: 12 }} />
        </div>
      )}
    </div>
  );
}
