"use client";

/**
 * 단어장 (Vocabulary) — per-subject bilingual term decks pulled from the Korean
 * Core Notes. Two modes: 목록(list, with an optional "영어 가리기" self-test) and
 * 암기(flashcard: see the Korean meaning, recall the English term, self-grade).
 * InHero dark/mint theme, matching Core Notes & Question Bank.
 */

import { useEffect, useMemo, useState } from "react";

const MINT = "#00FFB2";
const BG = "#05070d";

interface VocabTerm { en: string; ko: string; def: string; unit: number | null }
interface VocabSubject { courseId: string; label: string; emoji: string; count: number }

export default function VocabPage() {
  const [subjects, setSubjects] = useState<VocabSubject[]>([]);
  const [total, setTotal] = useState(0);
  const [active, setActive] = useState<string | null>(null);
  const [terms, setTerms] = useState<VocabTerm[]>([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<"list" | "study">("list");
  const [hideEn, setHideEn] = useState(false);

  useEffect(() => {
    fetch("/api/vocab?countOnly=true")
      .then((r) => r.json())
      .then((d) => {
        setSubjects(d.subjects ?? []);
        setTotal(d.total ?? 0);
        if (d.subjects?.length) setActive(d.subjects[0].courseId);
        else setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!active) return;
    setLoading(true);
    fetch(`/api/vocab?subject=${encodeURIComponent(active)}`)
      .then((r) => r.json())
      .then((d) => setTerms(d.terms ?? []))
      .catch(() => setTerms([]))
      .finally(() => setLoading(false));
  }, [active]);

  const activeSubject = subjects.find((s) => s.courseId === active);

  return (
    <div style={{ background: BG, minHeight: "100vh", padding: "64px 22px 120px", fontFamily: "Inter, sans-serif", color: "#e8edf4" }}>
      <div style={{ maxWidth: 880, margin: "0 auto" }}>
        <p style={{ fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(0,255,178,0.7)", marginBottom: 12 }}>
          📒 단어장 · VOCABULARY
        </p>
        <h1 style={{ fontSize: "clamp(1.9rem, 5vw, 3rem)", fontWeight: 850, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: 14 }}>
          한국어로 보고,<br />영어로 외운다.
        </h1>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, marginBottom: 28, maxWidth: 600 }}>
          {total > 0 ? `${total.toLocaleString()}개 ` : ""}과목별 필수 용어 — 이미 아는 한국어 뜻에서 영어 용어를 떠올리는 연습으로,
          미국 입시의 핵심인 어휘력을 빠르게 채웁니다.
        </p>

        {/* Subject chips */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 22 }}>
          {subjects.length === 0 && !loading && (
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>아직 준비된 단어장이 없어요 — 과목이 순차적으로 추가됩니다.</p>
          )}
          {subjects.map((s) => {
            const on = s.courseId === active;
            return (
              <button
                key={s.courseId}
                onClick={() => { setActive(s.courseId); setMode("list"); }}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 7, padding: "8px 14px",
                  borderRadius: 999, fontSize: 13, fontWeight: 700, cursor: "pointer",
                  border: on ? "1px solid rgba(0,255,178,0.55)" : "1px solid rgba(255,255,255,0.1)",
                  background: on ? "rgba(0,255,178,0.14)" : "rgba(255,255,255,0.03)",
                  color: on ? "#5eead4" : "rgba(255,255,255,0.7)",
                }}
              >
                <span>{s.emoji}</span>{s.label}
                <span style={{ opacity: 0.6, fontSize: 11 }}>{s.count}</span>
              </button>
            );
          })}
        </div>

        {/* Mode + tools */}
        {activeSubject && (
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
            <div style={{ display: "inline-flex", padding: 3, gap: 2, borderRadius: 999, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.03)" }}>
              {(["list", "study"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  style={{
                    padding: "6px 16px", borderRadius: 999, border: "none", cursor: "pointer",
                    fontSize: 12.5, fontWeight: 800,
                    background: mode === m ? "rgba(0,255,178,0.16)" : "transparent",
                    color: mode === m ? MINT : "rgba(255,255,255,0.55)",
                  }}
                >
                  {m === "list" ? "📋 목록" : "🎴 암기"}
                </button>
              ))}
            </div>
            {mode === "list" && (
              <button
                onClick={() => setHideEn((v) => !v)}
                style={{
                  padding: "7px 14px", borderRadius: 999, cursor: "pointer", fontSize: 12.5, fontWeight: 700,
                  border: "1px solid rgba(255,255,255,0.12)",
                  background: hideEn ? "rgba(0,255,178,0.12)" : "rgba(255,255,255,0.03)",
                  color: hideEn ? MINT : "rgba(255,255,255,0.6)",
                }}
              >
                {hideEn ? "👁 영어 보이기" : "🙈 영어 가리기 (자가 테스트)"}
              </button>
            )}
            <span style={{ marginLeft: "auto", fontSize: 12, color: "rgba(255,255,255,0.35)" }}>{terms.length}개 용어</span>
          </div>
        )}

        {loading ? (
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, padding: "40px 0", textAlign: "center" }}>불러오는 중…</p>
        ) : terms.length === 0 ? (
          activeSubject && <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>이 과목의 단어장은 곧 추가됩니다.</p>
        ) : mode === "list" ? (
          <TermList terms={terms} hideEn={hideEn} />
        ) : (
          <StudyDeck key={active ?? ""} terms={terms} />
        )}
      </div>
    </div>
  );
}

function TermList({ terms, hideEn }: { terms: VocabTerm[]; hideEn: boolean }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {terms.map((t, i) => (
        <TermRow key={`${t.en}-${i}`} t={t} hideEn={hideEn} />
      ))}
    </div>
  );
}

function TermRow({ t, hideEn }: { t: VocabTerm; hideEn: boolean }) {
  const [revealed, setRevealed] = useState(false);
  const showEn = !hideEn || revealed;
  return (
    <div style={{ borderRadius: 14, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)", padding: "16px 18px" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
        <span style={{ fontSize: 16, fontWeight: 800, color: "#fff", letterSpacing: "-0.01em" }}>{t.ko}</span>
        {t.unit != null && (
          <span style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.35)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 999, padding: "1px 8px" }}>U{t.unit}</span>
        )}
        <span style={{ marginLeft: "auto" }}>
          {showEn ? (
            <span style={{ fontSize: 15, fontWeight: 800, color: MINT, letterSpacing: "-0.01em" }}>{t.en}</span>
          ) : (
            <button onClick={() => setRevealed(true)}
              style={{ fontSize: 12.5, fontWeight: 700, color: "rgba(0,255,178,0.8)", background: "rgba(0,255,178,0.08)", border: "1px solid rgba(0,255,178,0.3)", borderRadius: 8, padding: "4px 12px", cursor: "pointer" }}>
              영어 확인
            </button>
          )}
        </span>
      </div>
      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.6, margin: "8px 0 0" }}>{t.def}</p>
    </div>
  );
}

/** Flashcard study: shuffled deck, Korean prompt → reveal English → self-grade. */
function StudyDeck({ terms }: { terms: VocabTerm[] }) {
  const order = useMemo(() => {
    const idx = terms.map((_, i) => i);
    for (let i = idx.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [idx[i], idx[j]] = [idx[j], idx[i]];
    }
    return idx;
  }, [terms]);

  const [pos, setPos] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [known, setKnown] = useState(0);
  const [unknown, setUnknown] = useState(0);

  const done = pos >= order.length;
  const card = !done ? terms[order[pos]] : null;

  function grade(ok: boolean) {
    if (ok) setKnown((n) => n + 1); else setUnknown((n) => n + 1);
    setRevealed(false);
    setPos((p) => p + 1);
  }
  function restart() {
    setPos(0); setRevealed(false); setKnown(0); setUnknown(0);
  }

  if (done) {
    return (
      <div style={{ textAlign: "center", padding: "48px 20px", borderRadius: 18, border: "1px solid rgba(0,255,178,0.25)", background: "rgba(0,255,178,0.04)" }}>
        <p style={{ fontSize: 34, margin: "0 0 8px" }}>🎉</p>
        <p style={{ fontSize: 19, fontWeight: 850, color: "#fff", margin: "0 0 6px" }}>한 바퀴 완료!</p>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", margin: "0 0 20px" }}>
          외움 <strong style={{ color: MINT }}>{known}</strong> · 다시볼 것 <strong style={{ color: "#ff8b8b" }}>{unknown}</strong> / 총 {order.length}개
        </p>
        <button onClick={restart} style={studyBtn(MINT, true)}>🔄 다시 섞어서 시작</button>
      </div>
    );
  }

  return (
    <div>
      {/* Progress */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14, fontSize: 12.5, color: "rgba(255,255,255,0.5)" }}>
        <span>{pos + 1} / {order.length}</span>
        <div style={{ flex: 1, height: 6, borderRadius: 999, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
          <div style={{ width: `${(pos / order.length) * 100}%`, height: "100%", background: MINT, transition: "width .2s" }} />
        </div>
        <span style={{ color: MINT }}>✓ {known}</span>
        <span style={{ color: "#ff8b8b" }}>✗ {unknown}</span>
      </div>

      {/* Card */}
      <div
        onClick={() => !revealed && setRevealed(true)}
        style={{
          borderRadius: 20, border: "1px solid rgba(0,255,178,0.25)", background: "linear-gradient(160deg, rgba(0,255,178,0.06), rgba(255,255,255,0.02))",
          minHeight: 240, padding: "34px 26px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          textAlign: "center", cursor: revealed ? "default" : "pointer",
        }}
      >
        {card!.unit != null && (
          <span style={{ fontSize: 10.5, fontWeight: 700, color: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 999, padding: "2px 9px", marginBottom: 16 }}>Unit {card!.unit}</span>
        )}
        <p style={{ fontSize: 26, fontWeight: 850, color: "#fff", letterSpacing: "-0.02em", margin: 0, lineHeight: 1.3 }}>{card!.ko}</p>
        {!revealed ? (
          <p style={{ fontSize: 13, color: "rgba(0,255,178,0.7)", marginTop: 18 }}>영어 용어를 떠올려보고 — 탭하면 정답</p>
        ) : (
          <>
            <div style={{ width: 60, height: 1, background: "rgba(255,255,255,0.12)", margin: "20px 0" }} />
            <p style={{ fontSize: 24, fontWeight: 850, color: MINT, letterSpacing: "-0.01em", margin: 0 }}>{card!.en}</p>
            <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.6)", lineHeight: 1.65, margin: "14px 0 0", maxWidth: 460 }}>{card!.def}</p>
          </>
        )}
      </div>

      {/* Controls */}
      <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
        {!revealed ? (
          <button onClick={() => setRevealed(true)} style={{ ...studyBtn("#fff", false), flex: 1 }}>정답 보기</button>
        ) : (
          <>
            <button onClick={() => grade(false)} style={{ ...studyBtn("#ff8b8b", false), flex: 1 }}>✗ 다시 볼래요</button>
            <button onClick={() => grade(true)} style={{ ...studyBtn(MINT, true), flex: 1 }}>✓ 외웠어요</button>
          </>
        )}
      </div>
    </div>
  );
}

function studyBtn(color: string, filled: boolean): React.CSSProperties {
  return {
    padding: "13px 18px", borderRadius: 12, cursor: "pointer", fontSize: 14, fontWeight: 800,
    border: `1px solid ${filled ? color : "rgba(255,255,255,0.18)"}`,
    background: filled ? `${color}1f` : "rgba(255,255,255,0.03)",
    color,
  };
}
