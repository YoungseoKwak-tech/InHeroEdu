"use client";

/**
 * Per-subject question-bank deep page — light-premium, full-bleed two-pane.
 *
 * Matches /question-bank: white bg, INK/SUB/FAINT ink ramp, GREEN accent,
 * #e8ecf1 borders, soft card shadow, Space Grotesk headings. A left rail
 * organizes the pool by REAL axes the data actually carries — difficulty
 * (easy/medium/hard, a real column on the questions table) and topic — and the
 * right pane lists that slice. Only the shown slice is fetched (limit=50 +
 * difficulty/type filters server-side); a skeleton covers the load. Scoring and
 * answering live entirely in /practice — this page only browses and launches.
 */

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { getSubjectById } from "@/lib/subjects";
import { authFetch } from "@/lib/client-auth";
import { useRouter } from "next/navigation";

const GREEN = "#00b85f";
const INK = "#0b1220";
const SUB = "#5b6675";
const FAINT = "#94a3b8";
const BORDER = "#e8ecf1";
const CARD_SHADOW = "0 1px 2px rgba(16,24,40,0.04)";

interface Question {
  id: string;
  topic: string;
  difficulty: string;
  type: string;
  question_text: string;
}

const DIFF_TIERS = [
  { v: "", l: "All difficulties" },
  { v: "easy", l: "Easy" },
  { v: "medium", l: "Medium" },
  { v: "hard", l: "Hard" },
] as const;

const DIFF_LABEL: Record<string, string> = { easy: "Easy", medium: "Medium", hard: "Hard" };
const DIFF_DOT: Record<string, string> = { easy: "#00b85f", medium: "#d9930b", hard: "#dc2626" };

const TYPE_TIERS = [
  { v: "", l: "All types" },
  { v: "multiple_choice", l: "Multiple choice" },
  { v: "free_response", l: "Free response" },
] as const;

export default function SubjectQuestionBankPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject: subjectId } = use(params);
  const subject = getSubjectById(subjectId);
  const router = useRouter();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filterDiff, setFilterDiff] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterTopic, setFilterTopic] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!subject) return;
    setLoading(true);
    const qp = new URLSearchParams({ subject: subjectId, limit: "50" });
    if (filterDiff) qp.set("difficulty", filterDiff);
    if (filterType) qp.set("type", filterType);

    setError("");
    authFetch(`/api/question-bank?${qp}`)
      .then(async (r) => {
        const data = await r.json();
        if (!r.ok) {
          setError(questionBankAccessMessage(data.reason));
          return null;
        }
        return data;
      })
      .then((data) => {
        if (!data) {
          setQuestions([]);
          setTotal(0);
          return;
        }
        setQuestions(data.questions ?? []);
        setTotal(data.total ?? 0);
      })
      .catch(() => setError("Could not load your question-bank access. Try again in a moment."))
      .finally(() => setLoading(false));
  }, [subjectId, filterDiff, filterType, subject]);

  if (!subject) {
    return (
      <div style={{ background: "#fff", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: SUB, fontFamily: "'Inter', sans-serif" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🔍</div>
          <p style={{ color: INK, fontWeight: 700, marginBottom: 16 }}>Subject not found.</p>
          <Link href="/question-bank" style={ctaStyle}>Back to Question Bank</Link>
        </div>
      </div>
    );
  }

  function startPractice() {
    const qp = new URLSearchParams();
    if (filterDiff) qp.set("difficulty", filterDiff);
    if (filterType) qp.set("type", filterType);
    router.push(`/question-bank/${subjectId}/practice?${qp}`);
  }

  // Topics surfaced from the loaded slice — real data, used as a soft sub-filter
  // (client-side narrowing; the difficulty/type axes hit the server).
  const topics = Array.from(new Set(questions.map((q) => q.topic))).filter(Boolean).sort();
  const shown = filterTopic ? questions.filter((q) => q.topic === filterTopic) : questions;

  return (
    <div style={{ background: "#fff", minHeight: "100vh", color: INK, fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        .sqb-wrap { max-width: 1440px; margin: 0 auto; padding: 0 clamp(16px,3vw,40px); }
        .sqb-shell { display: grid; grid-template-columns: 256px minmax(0,1fr); gap: 30px; align-items: start; }
        .sqb-rail { position: sticky; top: 28px; }
        .sqb-list { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 14px; }
        @media (max-width: 1100px) { .sqb-list { grid-template-columns: 1fr; } }
        @media (max-width: 920px) {
          .sqb-shell { grid-template-columns: 1fr; }
          .sqb-rail { position: static; }
        }
        @keyframes sqb-pulse { 0%,100% { opacity: .55 } 50% { opacity: 1 } }
        .sqb-sk { background: #eef1f5; border-radius: 8px; animation: sqb-pulse 1.15s ease-in-out infinite; }
      `}</style>

      {/* Header */}
      <div style={{ borderBottom: `1px solid ${BORDER}`, background: "#fff" }}>
        <div className="sqb-wrap" style={{ padding: "30px clamp(16px,3vw,40px) 26px" }}>
          <Link href="/question-bank" style={{ fontSize: 13, color: FAINT, textDecoration: "none", fontWeight: 600 }}>
            ← Question Bank
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 14, flexWrap: "wrap" }}>
            <div style={{ width: 48, height: 48, borderRadius: 13, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 20, flexShrink: 0, background: subject.color }}>
              {subject.emoji}
            </div>
            <div style={{ minWidth: 0 }}>
              <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.5rem,3vw,2rem)", fontWeight: 850, color: INK, letterSpacing: "-0.03em", margin: 0, lineHeight: 1.1 }}>
                {subject.name}
              </h1>
              <p style={{ fontSize: 13, color: FAINT, margin: "3px 0 0" }}>{subject.nameKo}</p>
            </div>
            <div style={{ marginLeft: "auto", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
              <div>
                <span style={{ fontSize: 28, fontWeight: 850, color: GREEN, letterSpacing: "-0.02em" }}>{total.toLocaleString()}</span>
                <span style={{ fontSize: 13, color: FAINT, marginLeft: 6 }}>questions</span>
              </div>
              {total > 0 && (
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: 11, fontWeight: 700, letterSpacing: "0.04em", color: "#047a45", background: "rgba(0,184,95,0.10)", border: `1px solid ${GREEN}`, padding: "3px 10px", borderRadius: 999 }}>
                  ⏱ ~{total} min total
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="sqb-wrap" style={{ padding: "26px clamp(16px,3vw,40px) 90px" }}>
        <div className="sqb-shell">
          {/* LEFT RAIL — organized by difficulty / type / topic */}
          <aside className="sqb-rail" aria-label="Filters">
            <RailGroup title="Difficulty">
              {DIFF_TIERS.map(({ v, l }) => (
                <RailButton key={v} active={filterDiff === v} onClick={() => setFilterDiff(v)}
                  dot={v ? DIFF_DOT[v] : undefined} label={l} />
              ))}
            </RailGroup>

            <RailGroup title="Type">
              {TYPE_TIERS.map(({ v, l }) => (
                <RailButton key={v} active={filterType === v} onClick={() => setFilterType(v)} label={l} />
              ))}
            </RailGroup>

            {topics.length > 0 && (
              <RailGroup title="Topic">
                <RailButton active={filterTopic === ""} onClick={() => setFilterTopic("")} label="All topics" />
                {topics.map((t) => (
                  <RailButton key={t} active={filterTopic === t} onClick={() => setFilterTopic(t)} label={t} />
                ))}
              </RailGroup>
            )}

            <button onClick={startPractice} disabled={total === 0}
              style={{ ...ctaStyle, width: "100%", marginTop: 8, textAlign: "center", opacity: total === 0 ? 0.4 : 1, cursor: total === 0 ? "default" : "pointer", border: "none" }}>
              🚀 Start practicing
            </button>
          </aside>

          {/* RIGHT PANE — question list */}
          <main style={{ minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 800, margin: 0, letterSpacing: "-0.02em", color: INK }}>
                {filterDiff ? DIFF_LABEL[filterDiff] : "All"} questions
                {filterTopic && <span style={{ color: FAINT, fontWeight: 700 }}> · {filterTopic}</span>}
              </h2>
              {!loading && !error && (
                <span style={{ fontSize: 13, color: FAINT, fontWeight: 600 }}>{shown.length.toLocaleString()} shown</span>
              )}
            </div>

            {loading ? (
              <div className="sqb-list">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} style={{ border: `1px solid ${BORDER}`, borderRadius: 14, padding: "16px 18px", background: "#fff", boxShadow: CARD_SHADOW }}>
                    <div className="sqb-sk" style={{ height: 11, width: 130, marginBottom: 14 }} />
                    <div className="sqb-sk" style={{ height: 14, width: "85%", marginBottom: 7 }} />
                    <div className="sqb-sk" style={{ height: 14, width: "55%" }} />
                  </div>
                ))}
              </div>
            ) : error ? (
              <div style={{ borderRadius: 16, border: `1px solid ${BORDER}`, background: "#f7f8fa", padding: "28px 26px", color: SUB, fontSize: 14, lineHeight: 1.7, boxShadow: CARD_SHADOW }}>
                <p style={{ color: GREEN, fontWeight: 900, letterSpacing: "0.12em", fontSize: 11, marginBottom: 8, textTransform: "uppercase" }}>Question bank</p>
                <p style={{ margin: "0 0 16px", color: INK, fontWeight: 600 }}>{error}</p>
                <Link href="/pricing" style={ctaStyle}>View Elite plans →</Link>
              </div>
            ) : shown.length === 0 ? (
              <div style={{ borderRadius: 16, border: `1px solid ${BORDER}`, background: "#fff", padding: "44px 26px", textAlign: "center", color: FAINT, boxShadow: CARD_SHADOW }}>
                <div style={{ fontSize: 36, marginBottom: 10 }}>📭</div>
                <p style={{ color: SUB, fontWeight: 700, margin: 0 }}>No questions match these filters</p>
                <p style={{ fontSize: 13, marginTop: 6 }}>Try changing the difficulty, type, or topic.</p>
              </div>
            ) : (
              <>
                <div className="sqb-list">
                  {shown.map((q, idx) => (
                    <div key={q.id} style={{ border: `1px solid ${BORDER}`, borderRadius: 14, padding: "16px 18px", background: "#fff", boxShadow: CARD_SHADOW, display: "flex", gap: 12 }}>
                      <span style={{ width: 26, height: 26, borderRadius: 8, background: "#f1f4f8", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: FAINT, flexShrink: 0 }}>
                        {idx + 1}
                      </span>
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 8, flexWrap: "wrap" }}>
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 800, color: SUB }}>
                            <span style={{ width: 7, height: 7, borderRadius: 999, background: DIFF_DOT[q.difficulty] ?? FAINT }} />
                            {DIFF_LABEL[q.difficulty] ?? q.difficulty}
                          </span>
                          <span style={{ fontSize: 10, fontWeight: 700, color: SUB, border: `1px solid ${BORDER}`, borderRadius: 999, padding: "2px 8px" }}>
                            {q.type === "multiple_choice" ? "MCQ" : "Free response"}
                          </span>
                          {q.topic && <span style={{ fontSize: 11, color: FAINT }}>{q.topic}</span>}
                        </div>
                        <p style={{ fontSize: 14, color: "#334155", lineHeight: 1.55, margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                          {q.question_text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ textAlign: "center", marginTop: 26 }}>
                  <button onClick={startPractice} style={{ ...ctaStyle, border: "none", cursor: "pointer", padding: "13px 34px" }}>
                    🚀 Start {Math.min(20, total)}-question set →
                  </button>
                  {total > shown.length && (
                    <p style={{ fontSize: 12.5, color: FAINT, marginTop: 12 }}>
                      Showing {shown.length} of {total.toLocaleString()} — practice draws a fresh set each time.
                    </p>
                  )}
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

const ctaStyle: React.CSSProperties = {
  display: "inline-block",
  padding: "11px 24px",
  borderRadius: 999,
  background: GREEN,
  color: "#fff",
  fontSize: 13.5,
  fontWeight: 850,
  letterSpacing: "0.02em",
  textDecoration: "none",
};

function RailGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <p style={{ fontSize: 11, fontWeight: 800, color: FAINT, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 8px 4px" }}>
        {title}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>{children}</div>
    </div>
  );
}

function RailButton({ active, onClick, label, dot }: { active: boolean; onClick: () => void; label: string; dot?: string }) {
  return (
    <button onClick={onClick} style={{
      display: "flex", alignItems: "center", gap: 9, width: "100%", textAlign: "left", padding: "8px 11px", borderRadius: 10,
      border: active ? `1.5px solid ${GREEN}` : "1px solid transparent",
      background: active ? "rgba(0,184,95,0.10)" : "transparent",
      color: active ? "#047a45" : "#334155", fontSize: 13, fontWeight: active ? 800 : 600, cursor: "pointer",
      transition: "background 120ms ease, border-color 120ms ease, color 120ms ease",
    }}>
      {dot && <span style={{ width: 8, height: 8, borderRadius: 999, background: dot, flexShrink: 0 }} />}
      <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{label}</span>
    </button>
  );
}

function questionBankAccessMessage(reason?: string) {
  if (reason === "sign_in_required") return "Sign in to see the question bank attached to your plan.";
  if (reason === "subject_not_in_plan") return "This subject is not included in your One Subject Elite plan.";
  return "Upgrade to One Subject Elite or All Subject Pass to unlock this question bank.";
}
