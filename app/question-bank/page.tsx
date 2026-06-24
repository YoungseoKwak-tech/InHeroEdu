"use client";

/**
 * Question Bank — every practice question InHero has authored, pulled from
 * lesson overlays + the admin questions table (see /api/question-bank/bank).
 *
 * Two-pane workspace: a left rail (subjects grouped by track, with units nested
 * under the active subject) and a right pane that lists that subject's
 * questions. Clicking a subject routes INSTANTLY — the API serves a precomputed
 * snapshot for locked browse, so there's no multi-second live build. Locked
 * cards show the prompt as a teaser and stack blurred behind one upgrade CTA.
 *
 * Click an option to answer. Right → green + explanation. Wrong → the option's
 * feedback + explanation, then a "Try a similar one" card with a near-variant.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { authFetch } from "@/lib/client-auth";

const GREEN = "#00b85f";
const INK = "#0b1220";
const SUB = "#5b6675";

interface BankOption {
  label: string;
  correct: boolean;
  feedback?: string | null;
}
interface BankQuestion {
  id: string;
  source?: "lesson" | "admin";
  courseId: string | null;
  subjectLabel: string;
  emoji: string;
  lessonId?: string | null;
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
interface UnitCount { unit: number; count: number }

// Group subjects by exam track so the left rail reads as an organized index
// instead of one long chip wall. Competition (AIME/AMC) is the natural advanced
// tier; the data carries no per-question difficulty, so track is the honest axis.
const TRACK_ORDER = ["AP", "IB", "SAT", "Competition"] as const;
const TRACK_META: Record<string, { label: string; hint: string }> = {
  AP: { label: "AP", hint: "College Board" },
  IB: { label: "IB", hint: "Diploma Programme" },
  SAT: { label: "SAT", hint: "Digital SAT" },
  Competition: { label: "Competition", hint: "Advanced · AMC / AIME" },
};
function trackOf(courseId: string | null): string {
  if (!courseId) return "AP";
  if (courseId.startsWith("ap-")) return "AP";
  if (courseId.startsWith("ib-")) return "IB";
  if (courseId.startsWith("sat-")) return "SAT";
  if (courseId === "aime" || courseId.startsWith("amc")) return "Competition";
  return "AP";
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
  const [activeUnit, setActiveUnit] = useState<number | null>(null);
  const [units, setUnits] = useState<UnitCount[]>([]);
  const [questions, setQuestions] = useState<BankQuestion[]>([]);
  const [filteredTotal, setFilteredTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [accessMessage, setAccessMessage] = useState<string | null>(null);
  const requestSeq = useRef(0);

  // Subject grid (precomputed → instant). Default the pane to the first subject
  // so we never sit on the slow no-subject "All" build, and the right pane is
  // never empty on first paint.
  useEffect(() => {
    authFetch("/api/question-bank/bank?countOnly=true")
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
        if (!d) return;
        const list: SubjectCount[] = d.subjects ?? [];
        setSubjects(list);
        setTotal(d.total ?? 0);
        setActive((cur) =>
          cur && list.some((s) => s.courseId === cur)
            ? cur
            : list.find((s) => s.courseId)?.courseId ?? null
        );
      })
      .catch(() => setAccessMessage("Could not load the question bank. Try again in a moment."));
  }, []);

  // Questions for the active subject (+ unit). Sequenced so a slow response for
  // a previously-selected subject can't overwrite the current one.
  useEffect(() => {
    if (!active) {
      setQuestions([]);
      setUnits([]);
      setFilteredTotal(0);
      setLoading(false);
      return;
    }
    const requestId = ++requestSeq.current;
    const controller = new AbortController();
    setLoading(true);
    const params = new URLSearchParams();
    params.set("subject", active);
    if (activeUnit != null) params.set("unit", String(activeUnit));
    authFetch(`/api/question-bank/bank?${params.toString()}`, { signal: controller.signal })
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
        if (controller.signal.aborted || requestId !== requestSeq.current) return;
        if (!d) return;
        const list: BankQuestion[] = Array.isArray(d.questions) ? d.questions : [];
        setQuestions(list);
        setFilteredTotal(d.total ?? list.length);
        if (Array.isArray(d.units)) setUnits(d.units);
      })
      .catch((e) => {
        if (controller.signal.aborted || requestId !== requestSeq.current) return;
        if ((e as Error)?.name === "AbortError") return;
        setAccessMessage("Could not load the question bank. Try again in a moment.");
        setQuestions([]);
        setFilteredTotal(0);
      })
      .finally(() => {
        if (!controller.signal.aborted && requestId === requestSeq.current) setLoading(false);
      });
    return () => controller.abort();
  }, [active, activeUnit]);

  const selectSubject = useCallback((courseId: string | null) => {
    if (courseId === active) return;
    setLoading(true); // skeletons immediately — no blank frame before the fetch
    setActive(courseId);
    setActiveUnit(null);
    setUnits([]);
    setQuestions([]);
  }, [active]);

  const selectUnit = useCallback((unit: number | null) => {
    setLoading(true);
    setActiveUnit(unit);
    setQuestions([]);
  }, []);

  const unlockedShown = questions.filter((q) => !q.locked);
  const lockedShown = questions.filter((q) => q.locked);
  const lockedRemaining = Math.max(filteredTotal - unlockedShown.length, lockedShown.length);

  const activeSubject = subjects.find((s) => s.courseId === active);
  const displayTotal = loading ? (activeSubject?.count ?? filteredTotal) : filteredTotal;

  // Bucket subjects into their tracks for the rail.
  const grouped = TRACK_ORDER.map((track) => ({
    track,
    items: subjects.filter((s) => trackOf(s.courseId) === track),
  })).filter((g) => g.items.length > 0);

  return (
    <div style={{ background: "#ffffff", minHeight: "100vh", color: INK, fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        .qb-wrap { max-width: 1500px; margin: 0 auto; padding: 0 clamp(16px,3vw,40px); }
        .qb-shell { display: grid; grid-template-columns: 276px minmax(0,1fr); gap: 30px; align-items: start; }
        .qb-rail { position: sticky; top: 84px; max-height: calc(100vh - 104px); overflow: auto; padding-right: 2px; }
        @media (max-width: 960px) {
          .qb-shell { grid-template-columns: 1fr; }
          .qb-rail { position: static; max-height: 320px; }
        }
        @keyframes qb-pulse { 0%,100% { opacity: .55 } 50% { opacity: 1 } }
        .qb-sk { background: #eef1f5; border-radius: 8px; animation: qb-pulse 1.15s ease-in-out infinite; }
        @keyframes qb-spin { to { transform: rotate(360deg); } }
      `}</style>

      <div className="qb-wrap" style={{ padding: "64px clamp(16px,3vw,40px) 110px" }}>
        {/* Header */}
        <p style={{ fontSize: 11, letterSpacing: "0.34em", textTransform: "uppercase", color: GREEN, fontWeight: 800, marginBottom: 14 }}>
          INHERO QUESTION BANK
        </p>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 850, color: INK, letterSpacing: "-0.04em", lineHeight: 1.04, marginBottom: 14 }}>
          Every question.<br />Miss one, get one like it.
        </h1>
        <p style={{ fontSize: 15, color: SUB, lineHeight: 1.7, marginBottom: 30, maxWidth: 640 }}>
          {total.toLocaleString()} practice questions pulled straight from InHero lessons — pick a subject on the left
          and start solving. Miss one and you get the explanation plus a similar problem to lock it in.
        </p>

        {/* Two-pane workspace */}
        <div className="qb-shell">
          {/* LEFT RAIL — subjects grouped by track, units nested under the active one */}
          <aside className="qb-rail" aria-label="Subjects">
            {subjects.length === 0
              ? Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} className="qb-sk" style={{ height: 34, marginBottom: 6, borderRadius: 10 }} />
                ))
              : grouped.map((g) => (
                  <div key={g.track} style={{ marginBottom: 16 }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 7, margin: "0 0 7px 4px" }}>
                      <span style={{ fontSize: 11.5, fontWeight: 800, color: INK, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                        {TRACK_META[g.track].label}
                      </span>
                      <span style={{ fontSize: 10.5, color: "#94a3b8", fontWeight: 600 }}>{TRACK_META[g.track].hint}</span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                      {g.items.map((s) => (
                        <div key={s.courseId ?? s.label}>
                          <RailItem
                            active={active === s.courseId}
                            emoji={s.emoji}
                            label={s.label}
                            count={s.count}
                            onClick={() => selectSubject(s.courseId)}
                          />
                          {active === s.courseId && units.length > 0 && (
                            <div style={{ display: "flex", flexDirection: "column", gap: 2, margin: "4px 0 6px", paddingLeft: 12, borderLeft: "2px solid #e8ecf1" }}>
                              <UnitItem active={activeUnit === null} label="All units" count={s.count} onClick={() => selectUnit(null)} />
                              {units.map((u) => (
                                <UnitItem key={u.unit} active={activeUnit === u.unit} label={`Unit ${u.unit}`} count={u.count} onClick={() => selectUnit(u.unit)} />
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
          </aside>

          {/* RIGHT PANE — questions */}
          <main style={{ minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 21, fontWeight: 800, margin: 0, letterSpacing: "-0.02em", color: INK }}>
                {activeSubject ? `${activeSubject.emoji} ${activeSubject.label}` : "Question bank"}
                {activeUnit != null && <span style={{ color: "#94a3b8", fontWeight: 700 }}> · Unit {activeUnit}</span>}
              </h2>
              {activeSubject && (
                <span style={{ fontSize: 13, color: "#94a3b8", fontWeight: 600 }}>{displayTotal.toLocaleString()} questions</span>
              )}
            </div>

            {accessMessage ? (
              <div style={{ borderRadius: 16, border: "1px solid #e8ecf1", background: "#f7f8fa", padding: "22px 24px", color: SUB, fontSize: 14, lineHeight: 1.7, boxShadow: "0 1px 2px rgba(16,24,40,0.04)" }}>
                <p style={{ color: GREEN, fontWeight: 900, letterSpacing: "0.12em", fontSize: 11, marginBottom: 8, textTransform: "uppercase" }}>
                  Question bank
                </p>
                <p style={{ margin: 0 }}>{accessMessage}</p>
              </div>
            ) : loading ? (
              <SkeletonList />
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
                    Showing first {unlockedShown.length} of {filteredTotal.toLocaleString()} — pick a unit on the left to narrow.
                  </p>
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
      border: active ? `1.5px solid ${GREEN}` : "1px solid transparent", background: active ? "rgba(0,184,95,0.10)" : "transparent",
      color: active ? "#047a45" : "#334155", fontSize: 13.5, fontWeight: active ? 800 : 600, cursor: "pointer",
      transition: "background 120ms ease, border-color 120ms ease, color 120ms ease",
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
      border: "none", background: active ? INK : "transparent", color: active ? "#fff" : "#64748b",
      fontSize: 12.5, fontWeight: active ? 800 : 600, cursor: "pointer",
    }}>
      <span style={{ flex: 1 }}>{label}</span>
      <span style={{ fontSize: 10.5, color: active ? "rgba(255,255,255,0.7)" : "#cbd5e1", fontWeight: 700 }}>{count.toLocaleString()}</span>
    </button>
  );
}

function SkeletonList() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} style={{ border: "1px solid #e8ecf1", borderRadius: 16, padding: "20px 22px", background: "#fff", boxShadow: "0 1px 2px rgba(16,24,40,0.04)" }}>
          <div className="qb-sk" style={{ height: 12, width: 150, marginBottom: 16 }} />
          <div className="qb-sk" style={{ height: 16, width: "80%", marginBottom: 8 }} />
          <div className="qb-sk" style={{ height: 16, width: "58%", marginBottom: 18 }} />
          {[0, 1, 2, 3].map((j) => <div key={j} className="qb-sk" style={{ height: 42, marginBottom: 8, borderRadius: 11 }} />)}
        </div>
      ))}
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
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ borderRadius: 18, border: "1px solid #e8ecf1", background: "#fff", boxShadow: "0 16px 48px rgba(16,24,40,0.12)", padding: "28px 32px", textAlign: "center", maxWidth: 420 }}>
          <p style={{ fontSize: 26, margin: "0 0 10px" }}>🔒</p>
          <p style={{ color: INK, fontSize: 17, fontWeight: 850, letterSpacing: "-0.02em", margin: "0 0 8px" }}>
            {lockedCount.toLocaleString()} more questions locked
          </p>
          <p style={{ color: SUB, fontSize: 13.5, lineHeight: 1.65, margin: "0 0 18px" }}>
            Unlock the full bank with One Subject Elite or the All Subject Pass.
          </p>
          <a href="/pricing" style={{ display: "inline-block", padding: "11px 26px", borderRadius: 999, background: GREEN, color: "#fff", fontSize: 13.5, fontWeight: 850, letterSpacing: "0.02em", textDecoration: "none" }}>
            Unlock the full bank →
          </a>
        </div>
      </div>
    </div>
  );
}

function QuestionCard({ q, index, free = false }: { q: BankQuestion; index: number; free?: boolean }) {
  return (
    <div
      style={{
        borderRadius: 16,
        border: free ? `1px solid ${GREEN}` : "1px solid #e8ecf1",
        background: free ? "rgba(0,184,95,0.05)" : "#fff",
        boxShadow: "0 1px 2px rgba(16,24,40,0.04)",
        padding: "20px 22px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
        <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.06em", color: GREEN }}>
          {q.emoji} {q.subjectLabel}
        </span>
        {q.unit != null && (
          <span style={{ fontSize: 10, fontWeight: 700, color: SUB, border: "1px solid #e8ecf1", borderRadius: 999, padding: "2px 8px" }}>
            Unit {q.unit}
          </span>
        )}
        {free && (
          <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: "0.1em", color: "#fff", background: GREEN, borderRadius: 999, padding: "2px 9px" }}>
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
      <p style={{ fontSize: nested ? 14 : 15.5, fontWeight: 600, color: INK, lineHeight: 1.55, marginBottom: 14, whiteSpace: "pre-wrap" }}>
        {prompt}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {options.map((o, i) => {
          const chosen = picked === i;
          let border = "1px solid #e8ecf1";
          let bg = "#fff";
          let color = INK;
          if (answered) {
            if (o.correct) {
              border = `1px solid ${GREEN}`;
              bg = "rgba(0,184,95,0.10)";
              color = GREEN;
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
            <p style={{ fontSize: 13.5, lineHeight: 1.6, color: isWrong ? "#dc2626" : GREEN, margin: "0 0 8px" }}>
              {pickedOpt.feedback}
            </p>
          )}
          {explanation && (
            <p style={{ fontSize: 13.5, lineHeight: 1.6, color: SUB, margin: 0, borderLeft: "2px solid #e8ecf1", paddingLeft: 12 }}>
              {explanation}
            </p>
          )}

          {explanation && !ko.text && (
            <button
              onClick={translateExplanation}
              disabled={ko.loading}
              style={{
                marginTop: 10,
                padding: "7px 13px",
                borderRadius: 9,
                border: `1px solid ${GREEN}`,
                background: "rgba(0,184,95,0.10)",
                color: GREEN,
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
            <div style={{ marginTop: 12, borderLeft: `2px solid ${GREEN}`, paddingLeft: 12 }}>
              <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: GREEN, margin: "0 0 6px" }}>
                Korean solution
              </p>
              <p style={{ fontSize: 13.5, lineHeight: 1.7, color: SUB, margin: 0, whiteSpace: "pre-wrap" }}>
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
