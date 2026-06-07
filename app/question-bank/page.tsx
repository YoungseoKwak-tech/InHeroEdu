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
    <div style={{ background: "#000", minHeight: "100vh", padding: "72px 24px 120px", fontFamily: "Inter, sans-serif" }}>
      <div style={{ maxWidth: 880, margin: "0 auto" }}>
        {/* Header */}
        <p style={{ fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(0,255,178,0.7)", marginBottom: 14 }}>
          INHERO QUESTION BANK
        </p>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)", fontWeight: 850, color: "#fff", letterSpacing: "-0.05em", lineHeight: 1.02, marginBottom: 14 }}>
          Every question.<br />Miss one, get one like it.
        </h1>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, marginBottom: 30, maxWidth: 620 }}>
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
              color: "rgba(255,255,255,0.72)",
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
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>No questions here yet.</p>
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
              <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, textAlign: "center", marginTop: 8 }}>
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
        border: active ? "1px solid rgba(0,255,178,0.55)" : "1px solid rgba(255,255,255,0.1)",
        background: active ? "rgba(0,255,178,0.1)" : "rgba(255,255,255,0.03)",
        color: active ? "#00FFB2" : "rgba(255,255,255,0.62)",
        fontSize: 13, fontWeight: active ? 800 : 600,
        cursor: "pointer", textAlign: "left", whiteSpace: "nowrap",
        transition: "border-color 150ms ease, background 150ms ease, color 150ms ease",
      }}
    >
      <span>{label}</span>
      <span style={{ fontSize: 11, fontWeight: 700, color: active ? "rgba(0,255,178,0.75)" : "rgba(255,255,255,0.3)" }}>
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
          border: "5px solid rgba(0,255,178,0.15)",
          borderTopColor: "#00FFB2",
          animation: "qb-spin 0.8s linear infinite",
          boxShadow: "0 0 32px rgba(0,255,178,0.25)",
        }}
      />
      <div>
        <p style={{ color: "#fff", fontSize: 17, fontWeight: 800, margin: "0 0 6px", letterSpacing: "-0.01em" }}>
          Loading your questions…
        </p>
        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 13.5, margin: 0 }}>
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
            border: "1px solid rgba(201,168,76,0.4)",
            background: "rgba(10,10,10,0.92)",
            boxShadow: "0 16px 48px rgba(0,0,0,0.6)",
            padding: "28px 32px",
            textAlign: "center",
            maxWidth: 420,
          }}
        >
          <p style={{ fontSize: 26, margin: "0 0 10px" }}>🔒</p>
          <p style={{ color: "#fff", fontSize: 17, fontWeight: 850, letterSpacing: "-0.02em", margin: "0 0 8px" }}>
            {lockedCount.toLocaleString()} more questions locked
          </p>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 13.5, lineHeight: 1.65, margin: "0 0 18px" }}>
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
        border: active ? "1px solid rgba(0,255,178,0.55)" : "1px solid rgba(255,255,255,0.1)",
        background: active ? "rgba(0,255,178,0.14)" : "rgba(255,255,255,0.03)",
        color: active ? "#5eead4" : "rgba(255,255,255,0.7)",
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
        border: free ? "1px solid rgba(0,255,178,0.32)" : "1px solid rgba(255,255,255,0.08)",
        background: free ? "rgba(0,255,178,0.04)" : "rgba(255,255,255,0.02)",
        padding: "20px 22px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
        <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.06em", color: "rgba(0,255,178,0.75)" }}>
          {q.emoji} {q.subjectLabel}
        </span>
        {q.unit != null && (
          <span style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 999, padding: "2px 8px" }}>
            Unit {q.unit}
          </span>
        )}
        {free && (
          <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.1em", color: "#0a0a0a", background: "#00FFB2", borderRadius: 999, padding: "2px 9px" }}>
            FREE · SOLVE IT
          </span>
        )}
        <span style={{ marginLeft: "auto", fontSize: 11, color: "rgba(255,255,255,0.28)" }}>#{index + 1}</span>
      </div>
      <Askable prompt={q.prompt} options={q.options} explanation={q.explanation} similar={q.similar} />
    </div>
  );
}

/** One answerable MCQ. Reveals feedback on click; on a wrong answer it
 *  offers the similar question as a nested Askable. */
function Askable({
  prompt,
  options,
  explanation,
  similar,
  nested = false,
}: {
  prompt: string;
  options: BankOption[];
  explanation?: string | null;
  similar?: { prompt: string; options: BankOption[] } | null;
  nested?: boolean;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  const [showSimilar, setShowSimilar] = useState(false);
  const answered = picked !== null;
  const pickedOpt = answered ? options[picked!] : null;
  const isWrong = answered && !pickedOpt?.correct;

  return (
    <div>
      <p style={{ fontSize: nested ? 14 : 15.5, fontWeight: 600, color: "#fff", lineHeight: 1.55, marginBottom: 14, whiteSpace: "pre-wrap" }}>
        {prompt}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {options.map((o, i) => {
          const chosen = picked === i;
          let border = "1px solid rgba(255,255,255,0.1)";
          let bg = "rgba(255,255,255,0.02)";
          let color = "rgba(255,255,255,0.85)";
          if (answered) {
            if (o.correct) {
              border = "1px solid rgba(0,255,178,0.55)";
              bg = "rgba(0,255,178,0.12)";
              color = "#5eead4";
            } else if (chosen) {
              border = "1px solid rgba(255,107,107,0.55)";
              bg = "rgba(255,107,107,0.12)";
              color = "#ff8b8b";
            } else {
              color = "rgba(255,255,255,0.4)";
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
            <p style={{ fontSize: 13.5, lineHeight: 1.6, color: isWrong ? "#ffb3b3" : "rgba(0,255,178,0.85)", margin: "0 0 8px" }}>
              {pickedOpt.feedback}
            </p>
          )}
          {explanation && (
            <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "rgba(255,255,255,0.6)", margin: 0, borderLeft: "2px solid rgba(255,255,255,0.15)", paddingLeft: 12 }}>
              {explanation}
            </p>
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
                color: "#e8d9a8",
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
