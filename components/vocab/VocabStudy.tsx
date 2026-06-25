"use client";

/**
 * VocabStudy — shared bilingual 단어장 UI used by both the dark /vocab page and
 * the white /parents/vocab page (theme prop switches the palette only; all
 * logic is shared).
 *
 * Designed to read like a real printed vocabulary book (워드마스터/능률보카 style):
 *   • subject picker grouped by domain (과학 · 수학·통계 · 사회 · 영어·인문 …)
 *   • list mode = book pages: Unit dividers, numbered entries (001, 002 …),
 *     a left checkbox gutter to mark each word 외움 (saved per-subject in
 *     localStorage with a live progress bar), and a 영어 가리기 self-test
 *   • 🎴 암기   flashcards over the filtered set (shuffle, self-grade, 오답 노트)
 *   • ☀️ 오늘   today's fixed N terms (deterministic per date), as flashcards
 */

import { useEffect, useMemo, useState, useCallback, type ReactNode } from "react";

export interface VocabTerm { en: string; ko: string; def: string; unit: number | null }
interface VocabSubject { courseId: string; label: string; emoji: string; count: number }

type Theme = "dark" | "light";
const DAILY_N = 20;

// ── Subject → category grouping (so the picker reads 과목별, not a flat row). ──
interface Category { id: string; label: string; emoji: string }
const CATEGORIES: Category[] = [
  { id: "science", label: "과학", emoji: "🔬" },
  { id: "math", label: "수학·통계", emoji: "🔢" },
  { id: "social", label: "사회", emoji: "🌍" },
  { id: "humanities", label: "영어·인문", emoji: "📖" },
  { id: "other", label: "기타", emoji: "📚" },
];
function categoryOf(courseId: string): string {
  const c = courseId.toLowerCase();
  if (/(chem|bio|physics|environ|science(?!.*social))/.test(c)) return "science";
  if (/(stat|calc|precalc|math)/.test(c)) return "math";
  if (/(history|psych|econ|govern|human-geo|world|us-|comparative)/.test(c)) return "social";
  if (/(english|lit|lang|seminar|art-history|sat-essential)/.test(c)) return "humanities";
  return "other";
}

function palette(theme: Theme) {
  if (theme === "light") {
    return {
      accent: "#00b85f", text: "#0b1220", sub: "#5b6675", muted: "#94a3b8",
      cardBg: "#fff", cardBorder: "#e8ecf1", chipBg: "#f7f8fa", chipBorder: "#e8ecf1",
      accentBg: "rgba(0,184,95,0.10)", accentBorder: "#00b85f",
      studyCardBg: "linear-gradient(160deg, rgba(0,184,95,0.07), #fff)", studyCardBorder: "#00b85f",
      track: "#e8ecf1", wrong: "#dc2626", wrongBg: "rgba(220,38,38,0.08)",
      bookBg: "#fff", bookLine: "#e8ecf1", gutter: "#f7f8fa", knownRow: "rgba(0,184,95,0.06)",
    };
  }
  return {
    accent: "#00FFB2", text: "#fff", sub: "rgba(255,255,255,0.6)", muted: "rgba(255,255,255,0.35)",
    cardBg: "rgba(255,255,255,0.02)", cardBorder: "rgba(255,255,255,0.08)", chipBg: "rgba(255,255,255,0.03)", chipBorder: "rgba(255,255,255,0.1)",
    accentBg: "rgba(0,255,178,0.14)", accentBorder: "rgba(0,255,178,0.55)",
    studyCardBg: "linear-gradient(160deg, rgba(0,255,178,0.06), rgba(255,255,255,0.02))", studyCardBorder: "rgba(0,255,178,0.25)",
    track: "rgba(255,255,255,0.08)", wrong: "#ff8b8b", wrongBg: "rgba(255,107,107,0.1)",
    bookBg: "rgba(255,255,255,0.015)", bookLine: "rgba(255,255,255,0.06)", gutter: "rgba(255,255,255,0.03)", knownRow: "rgba(0,255,178,0.05)",
  };
}
type P = ReturnType<typeof palette>;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Deterministic daily subset: same N terms all day, rotating by date + subject.
function dailySubset(terms: VocabTerm[], subject: string): VocabTerm[] {
  if (terms.length <= DAILY_N) return terms;
  const d = new Date();
  const seedStr = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}-${subject}`;
  let h = 2166136261;
  for (let i = 0; i < seedStr.length; i++) { h ^= seedStr.charCodeAt(i); h = Math.imul(h, 16777619); }
  let rng = h >>> 0;
  const next = () => { rng ^= rng << 13; rng ^= rng >>> 17; rng ^= rng << 5; return (rng >>> 0) / 4294967296; };
  const idx = terms.map((_, i) => i);
  for (let i = idx.length - 1; i > 0; i--) { const j = Math.floor(next() * (i + 1)); [idx[i], idx[j]] = [idx[j], idx[i]]; }
  return idx.slice(0, DAILY_N).map((i) => terms[i]);
}

const termKey = (t: VocabTerm) => t.en.toLowerCase();

export default function VocabStudy({ theme, renderGate }: {
  theme: Theme;
  // When provided, wraps the selected subject's content in a per-subject gate
  // (parent portal upsell). The subject picker stays free so users can browse.
  renderGate?: (subjectId: string, content: ReactNode) => ReactNode;
}) {
  const Pa = palette(theme);
  const [subjects, setSubjects] = useState<VocabSubject[]>([]);
  const [, setTotal] = useState(0);
  const [active, setActive] = useState<string | null>(null);
  const [terms, setTerms] = useState<VocabTerm[]>([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<"list" | "study" | "daily">("list");
  const [unit, setUnit] = useState<number | null>(null);
  const [hideEn, setHideEn] = useState(false);
  const [hideKnown, setHideKnown] = useState(false);
  const [known, setKnown] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetch("/api/vocab?countOnly=true").then((r) => r.json())
      .then((d) => {
        setSubjects(d.subjects ?? []);
        setTotal(d.total ?? 0);
        if (d.subjects?.length) setActive(d.subjects[0].courseId); else setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!active) return;
    setLoading(true); setUnit(null); setHideKnown(false);
    fetch(`/api/vocab?subject=${encodeURIComponent(active)}`).then((r) => r.json())
      .then((d) => setTerms(d.terms ?? []))
      .catch(() => setTerms([]))
      .finally(() => setLoading(false));
    // Load memorized set for this subject.
    try {
      const raw = localStorage.getItem(`inhero-vocab-known:${active}`);
      setKnown(new Set(raw ? (JSON.parse(raw) as string[]) : []));
    } catch { setKnown(new Set()); }
  }, [active]);

  const toggleKnown = useCallback((t: VocabTerm) => {
    setKnown((prev) => {
      const next = new Set(prev);
      const k = termKey(t);
      if (next.has(k)) next.delete(k); else next.add(k);
      try { if (active) localStorage.setItem(`inhero-vocab-known:${active}`, JSON.stringify([...next])); } catch { /* ignore */ }
      return next;
    });
  }, [active]);

  const units = useMemo(() => {
    const s = new Set<number>();
    for (const t of terms) if (t.unit != null) s.add(t.unit);
    return [...s].sort((a, b) => a - b);
  }, [terms]);

  const filtered = useMemo(() => {
    let out = unit == null ? terms : terms.filter((t) => t.unit === unit);
    if (hideKnown) out = out.filter((t) => !known.has(termKey(t)));
    return out;
  }, [terms, unit, hideKnown, known]);

  // Group the (filtered) list by unit for the book layout.
  const grouped = useMemo(() => {
    const g = new Map<number | null, VocabTerm[]>();
    for (const t of filtered) {
      const arr = g.get(t.unit ?? null) ?? [];
      arr.push(t);
      g.set(t.unit ?? null, arr);
    }
    return [...g.entries()].sort((a, b) => (a[0] ?? 0) - (b[0] ?? 0));
  }, [filtered]);

  const deckTerms = mode === "daily" ? dailySubset(filtered, active ?? "") : filtered;
  const activeSubject = subjects.find((s) => s.courseId === active);
  const knownInSubject = useMemo(() => terms.reduce((n, t) => n + (known.has(termKey(t)) ? 1 : 0), 0), [terms, known]);

  // Bucket subjects into categories for the grouped picker.
  const subjectGroups = useMemo(() => {
    const byCat = new Map<string, VocabSubject[]>();
    for (const s of subjects) {
      const cat = categoryOf(s.courseId);
      const arr = byCat.get(cat) ?? [];
      arr.push(s);
      byCat.set(cat, arr);
    }
    return CATEGORIES.map((c) => ({ cat: c, items: byCat.get(c.id) ?? [] })).filter((g) => g.items.length > 0);
  }, [subjects]);

  return (
    <div>
      {/* Subject picker — grouped by category */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 18 }}>
        {subjects.length === 0 && !loading && (
          <p style={{ color: Pa.muted, fontSize: 14 }}>아직 준비된 단어장이 없어요 — 과목이 순차적으로 추가됩니다.</p>
        )}
        {subjectGroups.map(({ cat, items }) => (
          <div key={cat.id} style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <span style={{ fontSize: 11.5, fontWeight: 800, color: Pa.muted, minWidth: 86, letterSpacing: "0.02em" }}>{cat.emoji} {cat.label}</span>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {items.map((s) => {
                const on = s.courseId === active;
                return (
                  <button key={s.courseId} onClick={() => { setActive(s.courseId); setMode("list"); }} style={chip(Pa, on)}>
                    <span>{s.emoji}</span>{s.label}<span style={{ opacity: 0.6, fontSize: 11 }}>{s.count}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {(() => {
        const __body = (
          <>
      {activeSubject && (
        <>
          {/* Memorize progress bar */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14, fontSize: 12.5, color: Pa.sub }}>
            <span style={{ fontWeight: 800, color: Pa.text }}>외운 단어 {knownInSubject}</span>
            <div style={{ flex: 1, height: 7, borderRadius: 999, background: Pa.track, overflow: "hidden" }}>
              <div style={{ width: `${activeSubject.count ? (knownInSubject / activeSubject.count) * 100 : 0}%`, height: "100%", background: Pa.accent, transition: "width .25s" }} />
            </div>
            <span style={{ color: Pa.muted }}>{activeSubject.count}개 중</span>
          </div>

          {/* Unit filter */}
          {units.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
              <button onClick={() => setUnit(null)} style={unitChip(Pa, unit === null)}>전체</button>
              {units.map((u) => (
                <button key={u} onClick={() => setUnit(u)} style={unitChip(Pa, unit === u)}>U{u}</button>
              ))}
            </div>
          )}

          {/* Mode + tools */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 18 }}>
            <div style={{ display: "inline-flex", padding: 3, gap: 2, borderRadius: 999, border: `1px solid ${Pa.chipBorder}`, background: Pa.chipBg }}>
              {([["list", "📖 단어장"], ["study", "🎴 암기"], ["daily", "☀️ 오늘"]] as const).map(([m, label]) => (
                <button key={m} onClick={() => setMode(m)}
                  style={{ padding: "6px 14px", borderRadius: 999, border: "none", cursor: "pointer", fontSize: 12.5, fontWeight: 800,
                    background: mode === m ? Pa.accentBg : "transparent", color: mode === m ? Pa.accent : Pa.sub }}>
                  {label}
                </button>
              ))}
            </div>
            {mode === "list" && (
              <>
                <button onClick={() => setHideEn((v) => !v)}
                  style={{ padding: "7px 14px", borderRadius: 999, cursor: "pointer", fontSize: 12.5, fontWeight: 700,
                    border: `1px solid ${Pa.chipBorder}`, background: hideEn ? Pa.accentBg : Pa.chipBg, color: hideEn ? Pa.accent : Pa.sub }}>
                  {hideEn ? "👁 영어 보이기" : "🙈 영어 가리기"}
                </button>
                <button onClick={() => setHideKnown((v) => !v)}
                  style={{ padding: "7px 14px", borderRadius: 999, cursor: "pointer", fontSize: 12.5, fontWeight: 700,
                    border: `1px solid ${Pa.chipBorder}`, background: hideKnown ? Pa.accentBg : Pa.chipBg, color: hideKnown ? Pa.accent : Pa.sub }}>
                  {hideKnown ? "✓ 외운 것 보기" : "✓ 외운 것 숨기기"}
                </button>
              </>
            )}
            <span style={{ marginLeft: "auto", fontSize: 12, color: Pa.muted }}>
              {mode === "daily" ? `오늘의 ${deckTerms.length}개` : `${filtered.length}개 용어`}
            </span>
          </div>
        </>
      )}

      {loading ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, padding: "64px 0" }}>
          <span aria-hidden="true" style={{ width: 38, height: 38, borderRadius: "50%", border: "3px solid #e2e8f0", borderTopColor: Pa.accent, display: "inline-block", animation: "vocabSpin 0.8s linear infinite" }} />
          <p style={{ color: Pa.muted, fontSize: 14, fontWeight: 700, margin: 0 }}>단어장 준비 중…</p>
          <p style={{ color: "#b0b8c1", fontSize: 12.5, margin: 0 }}>과목별 필수 단어를 불러오고 있어요</p>
          <style>{`@keyframes vocabSpin { to { transform: rotate(360deg); } }`}</style>
        </div>
      ) : !activeSubject ? null : deckTerms.length === 0 ? (
        <p style={{ color: Pa.muted, fontSize: 14, padding: "30px 0", textAlign: "center" }}>
          {hideKnown ? "이 범위는 전부 외웠어요! 🎉" : "이 범위의 단어가 없어요."}
        </p>
      ) : mode === "list" ? (
        <VocabBook groups={grouped} hideEn={hideEn} known={known} onToggle={toggleKnown} Pa={Pa} />
      ) : (
        <StudyDeck key={`${active}-${unit}-${mode}`} terms={deckTerms} Pa={Pa} />
      )}
          </>
        );
        return renderGate && active ? renderGate(active, __body) : __body;
      })()}
    </div>
  );
}

function chip(Pa: P, on: boolean): React.CSSProperties {
  return {
    display: "inline-flex", alignItems: "center", gap: 7, padding: "8px 14px", borderRadius: 999,
    fontSize: 13, fontWeight: 700, cursor: "pointer",
    border: `1px solid ${on ? Pa.accentBorder : Pa.chipBorder}`,
    background: on ? Pa.accentBg : Pa.chipBg, color: on ? Pa.accent : Pa.sub,
  };
}
function unitChip(Pa: P, on: boolean): React.CSSProperties {
  return {
    padding: "5px 12px", borderRadius: 999, fontSize: 12, fontWeight: 700, cursor: "pointer",
    border: `1px solid ${on ? Pa.accentBorder : Pa.chipBorder}`,
    background: on ? Pa.accentBg : Pa.chipBg, color: on ? Pa.accent : Pa.sub,
  };
}

/** The "real vocabulary book": unit pages, numbered rows, checkbox gutter.
 *  Units flow into an edge-filling, responsive multi-column grid so wide
 *  screens are used instead of one thin centered column. Each unit is its
 *  own self-contained "page" card; CSS column-fill keeps long pages intact. */
function VocabBook({ groups, hideEn, known, onToggle, Pa }: {
  groups: [number | null, VocabTerm[]][]; hideEn: boolean; known: Set<string>;
  onToggle: (t: VocabTerm) => void; Pa: P;
}) {
  return (
    <div style={{ columnWidth: 460, columnGap: 18 }}>
      {groups.map(([u, items], gi) => {
        const knownInUnit = items.reduce((n, t) => n + (known.has(termKey(t)) ? 1 : 0), 0);
        return (
          <div key={u ?? `none-${gi}`}
            style={{ breakInside: "avoid", marginBottom: 18, borderRadius: 16, border: `1px solid ${Pa.cardBorder}`,
              background: Pa.bookBg, overflow: "hidden", boxShadow: "0 1px 2px rgba(16,24,40,0.04)" }}>
            {/* Unit header — like a "Day 01" page divider */}
            <div style={{ display: "flex", alignItems: "baseline", gap: 10, padding: "14px 18px",
              background: Pa.gutter, borderBottom: `1px solid ${Pa.bookLine}` }}>
              <span style={{ fontSize: 14, fontWeight: 850, color: Pa.text, letterSpacing: "-0.01em" }}>
                {u == null ? "기타" : `Unit ${u}`}
              </span>
              <span style={{ fontSize: 11.5, fontWeight: 700, color: Pa.muted }}>{items.length}개 단어</span>
              <span style={{ marginLeft: "auto", fontSize: 11.5, fontWeight: 800, color: Pa.accent }}>외움 {knownInUnit}/{items.length}</span>
            </div>
            {items.map((t, i) => (
              <BookRow key={`${termKey(t)}-${i}`} t={t} index={i + 1} hideEn={hideEn}
                isKnown={known.has(termKey(t))} onToggle={() => onToggle(t)} Pa={Pa} />
            ))}
          </div>
        );
      })}
    </div>
  );
}

function BookRow({ t, index, hideEn, isKnown, onToggle, Pa }: {
  t: VocabTerm; index: number; hideEn: boolean; isKnown: boolean; onToggle: () => void; Pa: P;
}) {
  const [revealed, setRevealed] = useState(false);
  const showEn = !hideEn || revealed;
  return (
    <div style={{ display: "flex", alignItems: "stretch", borderBottom: `1px solid ${Pa.bookLine}`, background: isKnown ? Pa.knownRow : "transparent" }}>
      {/* Gutter: checkbox + number */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "14px 0", width: 52, flexShrink: 0,
        background: Pa.gutter, borderRight: `1px solid ${Pa.bookLine}` }}>
        <button onClick={onToggle} aria-label={isKnown ? "외움 해제" : "외움 표시"} title={isKnown ? "외운 단어" : "외웠으면 체크"}
          style={{ width: 22, height: 22, borderRadius: 6, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
            border: `1.5px solid ${isKnown ? Pa.accent : Pa.chipBorder}`, background: isKnown ? Pa.accent : "transparent",
            color: "#fff", fontSize: 13, fontWeight: 900, lineHeight: 1 }}>
          {isKnown ? "✓" : ""}
        </button>
        <span style={{ fontSize: 10.5, fontWeight: 700, color: Pa.muted, fontFamily: "'JetBrains Mono', monospace" }}>
          {String(index).padStart(3, "0")}
        </span>
      </div>

      {/* Entry body */}
      <div style={{ flex: 1, minWidth: 0, padding: "13px 16px" }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
          <span style={{ fontSize: 15.5, fontWeight: 800, color: Pa.text, letterSpacing: "-0.01em",
            textDecoration: isKnown ? "none" : "none", opacity: isKnown ? 0.7 : 1 }}>{t.ko}</span>
          <span style={{ marginLeft: "auto" }}>
            {showEn ? (
              <span style={{ fontSize: 14.5, fontWeight: 800, color: Pa.accent, letterSpacing: "-0.01em" }}>{t.en}</span>
            ) : (
              <button onClick={() => setRevealed(true)}
                style={{ fontSize: 12, fontWeight: 700, color: Pa.accent, background: Pa.accentBg, border: `1px solid ${Pa.accentBorder}`, borderRadius: 8, padding: "3px 11px", cursor: "pointer" }}>
                영어 확인
              </button>
            )}
          </span>
        </div>
        <p style={{ fontSize: 12.5, color: Pa.sub, lineHeight: 1.6, margin: "6px 0 0" }}>{t.def}</p>
      </div>
    </div>
  );
}

function StudyDeck({ terms, Pa }: { terms: VocabTerm[]; Pa: P }) {
  const [deck, setDeck] = useState<VocabTerm[]>(() => shuffle(terms));
  const [pos, setPos] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [wrong, setWrong] = useState<VocabTerm[]>([]);

  const done = pos >= deck.length;
  const card = !done ? deck[pos] : null;
  const knownCount = deck.length - wrong.length - (deck.length - pos);

  function grade(ok: boolean) {
    if (!ok) setWrong((w) => [...w, deck[pos]]);
    setRevealed(false);
    setPos((p) => p + 1);
  }
  function restart(only?: VocabTerm[]) {
    const src = only ?? terms;
    setDeck(shuffle(src)); setPos(0); setRevealed(false); setWrong([]);
  }

  if (done) {
    const correct = deck.length - wrong.length;
    return (
      <div style={{ maxWidth: 620, margin: "0 auto", textAlign: "center", padding: "44px 20px", borderRadius: 18, border: `1px solid ${Pa.studyCardBorder}`, background: Pa.accentBg, boxShadow: "0 1px 2px rgba(16,24,40,0.04)" }}>
        <p style={{ fontSize: 34, margin: "0 0 8px" }}>🎉</p>
        <p style={{ fontSize: 19, fontWeight: 850, color: Pa.text, margin: "0 0 6px" }}>한 바퀴 완료!</p>
        <p style={{ fontSize: 14, color: Pa.sub, margin: "0 0 20px" }}>
          외움 <strong style={{ color: Pa.accent }}>{correct}</strong> · 다시볼 것 <strong style={{ color: Pa.wrong }}>{wrong.length}</strong> / 총 {deck.length}개
        </p>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          {wrong.length > 0 && (
            <button onClick={() => restart(wrong)} style={studyBtn(Pa.wrong, true, Pa)}>📕 틀린 것만 다시 ({wrong.length})</button>
          )}
          <button onClick={() => restart()} style={studyBtn(Pa.accent, wrong.length === 0, Pa)}>🔄 전체 다시</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 620, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14, fontSize: 12.5, color: Pa.sub }}>
        <span>{pos + 1} / {deck.length}</span>
        <div style={{ flex: 1, height: 6, borderRadius: 999, background: Pa.track, overflow: "hidden" }}>
          <div style={{ width: `${(pos / deck.length) * 100}%`, height: "100%", background: Pa.accent, transition: "width .2s" }} />
        </div>
        <span style={{ color: Pa.accent }}>✓ {Math.max(0, knownCount)}</span>
        <span style={{ color: Pa.wrong }}>✗ {wrong.length}</span>
      </div>

      <div onClick={() => !revealed && setRevealed(true)}
        style={{ borderRadius: 20, border: `1px solid ${Pa.studyCardBorder}`, background: Pa.studyCardBg, boxShadow: "0 1px 2px rgba(16,24,40,0.04)",
          minHeight: 240, padding: "34px 26px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
          textAlign: "center", cursor: revealed ? "default" : "pointer" }}>
        {card!.unit != null && (
          <span style={{ fontSize: 10.5, fontWeight: 700, color: Pa.muted, border: `1px solid ${Pa.chipBorder}`, borderRadius: 999, padding: "2px 9px", marginBottom: 16 }}>Unit {card!.unit}</span>
        )}
        <p style={{ fontSize: 26, fontWeight: 850, color: Pa.text, letterSpacing: "-0.02em", margin: 0, lineHeight: 1.3 }}>{card!.ko}</p>
        {!revealed ? (
          <p style={{ fontSize: 13, color: Pa.accent, marginTop: 18 }}>영어 용어를 떠올려보고 — 탭하면 정답</p>
        ) : (
          <>
            <div style={{ width: 60, height: 1, background: Pa.cardBorder, margin: "20px 0" }} />
            <p style={{ fontSize: 24, fontWeight: 850, color: Pa.accent, letterSpacing: "-0.01em", margin: 0 }}>{card!.en}</p>
            <p style={{ fontSize: 13.5, color: Pa.sub, lineHeight: 1.65, margin: "14px 0 0", maxWidth: 460 }}>{card!.def}</p>
          </>
        )}
      </div>

      <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
        {!revealed ? (
          <button onClick={() => setRevealed(true)} style={{ ...studyBtn(Pa.text, false, Pa), flex: 1 }}>정답 보기</button>
        ) : (
          <>
            <button onClick={() => grade(false)} style={{ ...studyBtn(Pa.wrong, false, Pa), flex: 1 }}>✗ 다시 볼래요</button>
            <button onClick={() => grade(true)} style={{ ...studyBtn(Pa.accent, true, Pa), flex: 1 }}>✓ 외웠어요</button>
          </>
        )}
      </div>
    </div>
  );
}

function studyBtn(color: string, filled: boolean, Pa: P): React.CSSProperties {
  return {
    padding: "13px 18px", borderRadius: 12, cursor: "pointer", fontSize: 14, fontWeight: 800,
    border: `1.5px solid ${filled ? color : "#d8dee6"}`,
    background: filled ? color : "#fff", color: filled ? "#fff" : color,
  };
}
