"use client";

/**
 * Core Notes — condensed, exam-focused study cards distilled from the lesson
 * scripts (see /api/core-notes). Two-pane reader: a left rail of units →
 * lessons you click through, and one focused note in the main panel (Khan
 * principle: one screen, one concept). InHero brand: deep space + mint.
 */

import { useEffect, useMemo, useState } from "react";

const MINT = "#00FFB2";
const RED = "#ff6b6b";
const INDIGO = "#8fa2ff";
const BG = "#05070d";
const PANEL = "#0b1018";
const CARD = "#0e141d";
const BORDER = "#1a2230";
const SUBTLE = "#8793a4";

interface NoteTerm { term: string; def: string }
interface NoteTable { headers: string[]; rows: string[][] }
interface NoteSection { title: string; subtitle?: string | null; body?: string | null; keyIdea?: string | null; table?: NoteTable | null; terms: NoteTerm[]; traps: string[]; example?: string | null }
interface CoreNote {
  lessonId: string;
  courseId: string | null;
  subjectLabel: string;
  emoji: string;
  unit: number | null;
  lessonNum: number | null;
  unitName?: string | null;
  title: string;
  subtitle?: string | null;
  overview?: string | null;
  objectives: string[];
  formulas?: string[];
  diagram?: string | null;
  sections: NoteSection[];
}
interface SubjectCount { courseId: string | null; label: string; emoji: string; count: number }

type Lang = "en" | "ko";

export default function CoreNotesPage() {
  const [subjects, setSubjects] = useState<SubjectCount[]>([]);
  const [total, setTotal] = useState(0);
  const [active, setActive] = useState<string | null>(null);
  const [notes, setNotes] = useState<CoreNote[]>([]);
  const [activeLesson, setActiveLesson] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  // Korean storytelling mode — fetched per lesson on demand, kept in a map so
  // toggling EN ↔ 한국어 and revisiting lessons is instant.
  const [lang, setLang] = useState<Lang>("en");
  const [koNotes, setKoNotes] = useState<Record<string, CoreNote>>({});
  const [koErrors, setKoErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch("/api/core-notes?countOnly=true")
      .then((r) => r.json())
      .then((d) => {
        setSubjects(d.subjects ?? []);
        setTotal(d.total ?? 0);
        if (d.subjects?.length) setActive(d.subjects[0].courseId);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (active === null) return;
    setLoading(true);
    fetch(`/api/core-notes?subject=${encodeURIComponent(active)}`)
      .then((r) => r.json())
      .then((d) => {
        const list: CoreNote[] = d.notes ?? [];
        setNotes(list);
        setActiveLesson(list[0]?.lessonId ?? null);
      })
      .catch(() => setNotes([]))
      .finally(() => setLoading(false));
  }, [active]);

  // Fetch the Korean storytelling version when 한국어 is on and not cached yet.
  // First request per note generates it (slow once); after that it's instant.
  useEffect(() => {
    if (lang !== "ko" || !activeLesson || koNotes[activeLesson] || koErrors[activeLesson]) return;
    let cancelled = false;
    fetch(`/api/core-notes/korean?lessonId=${encodeURIComponent(activeLesson)}`)
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return;
        if (d.note) setKoNotes((m) => ({ ...m, [activeLesson]: d.note }));
        else setKoErrors((m) => ({ ...m, [activeLesson]: d.error ?? "failed" }));
      })
      .catch(() => {
        if (!cancelled) setKoErrors((m) => ({ ...m, [activeLesson]: "network" }));
      });
    return () => {
      cancelled = true;
    };
  }, [lang, activeLesson, koNotes, koErrors]);

  // Group the subject's notes by unit for the left rail.
  const units = useMemo(() => {
    const m = new Map<number, { unit: number; name: string; notes: CoreNote[] }>();
    for (const n of notes) {
      const u = n.unit ?? 0;
      if (!m.has(u)) m.set(u, { unit: u, name: n.unitName ?? (u ? `Unit ${u}` : "Other"), notes: [] });
      m.get(u)!.notes.push(n);
    }
    return [...m.values()].sort((a, b) => a.unit - b.unit);
  }, [notes]);

  const current = useMemo(
    () => notes.find((n) => n.lessonId === activeLesson) ?? null,
    [notes, activeLesson]
  );
  const activeLabel = subjects.find((s) => s.courseId === active)?.label ?? "";

  return (
    <div style={{ minHeight: "100vh", background: BG, color: "#e8edf4" }}>
      {/* Header */}
      <div style={{ borderBottom: `1px solid ${BORDER}`, padding: "30px 28px 22px" }}>
        <p style={{ letterSpacing: "0.26em", fontSize: 11, color: MINT, fontWeight: 700, margin: 0 }}>
          CORE NOTES
        </p>
        <h1 style={{ fontSize: 30, fontWeight: 800, margin: "8px 0 0", letterSpacing: "-0.02em" }}>
          One screen. One concept.
        </h1>
        <p style={{ fontSize: 14.5, color: SUBTLE, marginTop: 8 }}>
          {total > 0 ? `${total.toLocaleString()} ` : ""}distilled notes from InHero lessons — only
          what to remember in the exam room. <span style={{ color: RED }}>Traps in red.</span>
        </p>
        {/* Subject selector */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 18, minHeight: 36, alignItems: "center" }}>
          {subjects.length === 0 && <Spinner size={22} />}
          {subjects.map((s) => {
            const on = s.courseId === active;
            return (
              <button
                key={s.courseId ?? "general"}
                onClick={() => setActive(s.courseId)}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 7, padding: "7px 13px",
                  borderRadius: 999, cursor: "pointer", fontSize: 13, fontWeight: 600,
                  border: `1px solid ${on ? MINT : BORDER}`,
                  background: on ? "rgba(0,255,178,0.12)" : "transparent",
                  color: on ? MINT : "#c3ccd9",
                }}
              >
                <span>{s.emoji}</span><span>{s.label}</span>
                <span style={{ color: on ? MINT : SUBTLE, fontWeight: 700 }}>{s.count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Two-pane reader */}
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        {/* Left rail: units → lessons */}
        <aside
          style={{
            width: 300, flexShrink: 0, borderRight: `1px solid ${BORDER}`, background: PANEL,
            position: "sticky", top: 0, maxHeight: "100vh", overflowY: "auto", padding: "18px 0 80px",
          }}
        >
          {loading ? (
            <div style={{ display: "flex", justifyContent: "center", padding: "40px 0" }}>
              <Spinner size={24} />
            </div>
          ) : (
            units.map((u) => (
              <div key={u.unit} style={{ marginBottom: 14 }}>
                <div
                  style={{
                    padding: "6px 20px", fontSize: 11, letterSpacing: "0.08em", fontWeight: 700,
                    color: SUBTLE, textTransform: "uppercase",
                  }}
                >
                  {u.unit ? `Unit ${u.unit}` : "Other"}
                  {u.name && u.name !== `Unit ${u.unit}` ? ` · ${u.name}` : ""}
                </div>
                {u.notes.map((n) => {
                  const on = n.lessonId === activeLesson;
                  const num = n.unit != null && n.lessonNum != null ? `${n.unit}.${n.lessonNum}` : null;
                  return (
                    <button
                      key={n.lessonId}
                      onClick={() => setActiveLesson(n.lessonId)}
                      style={{
                        display: "flex", gap: 10, width: "100%", textAlign: "left", cursor: "pointer",
                        padding: "10px 20px", fontSize: 13.5, lineHeight: 1.4,
                        border: "none", borderLeft: `3px solid ${on ? MINT : "transparent"}`,
                        background: on ? "rgba(0,255,178,0.08)" : "transparent",
                        color: on ? "#eafff8" : "#aeb8c6", fontWeight: on ? 600 : 400,
                      }}
                    >
                      {num && (
                        <span style={{ color: on ? MINT : "#5f6b7d", fontWeight: 700, flexShrink: 0, fontVariantNumeric: "tabular-nums" }}>
                          {num}
                        </span>
                      )}
                      <span>{n.title}</span>
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </aside>

        {/* Main: one focused note */}
        <main style={{ flex: 1, minWidth: 0, padding: "34px 40px 120px", display: "flex", justifyContent: "center" }}>
          <div style={{ width: "100%", maxWidth: 720 }}>
            {loading ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, paddingTop: 80 }}>
                <Spinner size={36} />
                <p style={{ color: SUBTLE, margin: 0, fontSize: 14 }}>Loading {activeLabel} notes…</p>
              </div>
            ) : current ? (
              (() => {
                const koNote = lang === "ko" ? koNotes[current.lessonId] : undefined;
                const koError = lang === "ko" ? koErrors[current.lessonId] : undefined;
                return (
                  <>
                    <LangToggle lang={lang} onChange={setLang} />
                    {lang === "ko" && !koNote ? (
                      !koError ? (
                        <KoLoadingPanel />
                      ) : koError === "not-ready" ? (
                        <>
                          <div style={{ margin: "0 0 22px", padding: "16px 20px", borderRadius: 14, border: `1px solid rgba(0,255,178,0.25)`, background: "rgba(0,255,178,0.05)" }}>
                            <p style={{ margin: 0, fontSize: 14, color: "#cfe9df", lineHeight: 1.6 }}>
                              🎙️ 이 노트의 한국어 스토리 버전은 아직 준비 중이에요 — 순차적으로 추가되고 있습니다. 아래는 영어 원본입니다.
                            </p>
                          </div>
                          <NoteView note={current} lang="en" />
                        </>
                      ) : (
                        <div style={{ marginTop: 24, padding: "18px 22px", borderRadius: 14, border: `1px solid rgba(255,107,107,0.32)`, background: "rgba(255,107,107,0.06)" }}>
                          <p style={{ margin: 0, fontSize: 14.5, color: "#f3dede", lineHeight: 1.6 }}>
                            한국어 버전을 불러오지 못했어요. 네트워크를 확인해 주세요.
                          </p>
                          <button
                            onClick={() =>
                              setKoErrors((m) => {
                                const { [current.lessonId]: _drop, ...rest } = m;
                                return rest;
                              })
                            }
                            style={{ marginTop: 10, padding: "7px 14px", borderRadius: 999, border: `1px solid ${MINT}`, background: "transparent", color: MINT, fontSize: 13, fontWeight: 600, cursor: "pointer" }}
                          >
                            다시 시도
                          </button>
                        </div>
                      )
                    ) : (
                      <NoteView note={koNote ?? current} lang={koNote ? "ko" : "en"} />
                    )}
                  </>
                );
              })()
            ) : (
              <p style={{ color: SUBTLE }}>No notes yet for {activeLabel}.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

function LangToggle({ lang, onChange }: { lang: Lang; onChange: (l: Lang) => void }) {
  const opts: { value: Lang; label: string }[] = [
    { value: "en", label: "EN" },
    { value: "ko", label: "🇰🇷 한국어 스토리" },
  ];
  return (
    <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 14 }}>
      <div style={{ display: "inline-flex", padding: 3, gap: 2, borderRadius: 999, border: `1px solid ${BORDER}`, background: PANEL }}>
        {opts.map((o) => {
          const on = o.value === lang;
          return (
            <button
              key={o.value}
              onClick={() => onChange(o.value)}
              style={{
                padding: "6px 14px", borderRadius: 999, border: "none", cursor: "pointer",
                fontSize: 12.5, fontWeight: 700, letterSpacing: "0.02em",
                background: on ? "rgba(0,255,178,0.14)" : "transparent",
                color: on ? MINT : SUBTLE,
              }}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Spinner({ size = 28 }: { size?: number }) {
  return (
    <>
      <style>{`@keyframes cnSpin { to { transform: rotate(360deg) } }`}</style>
      <div
        aria-label="Loading"
        role="status"
        style={{
          width: size, height: size, borderRadius: "50%", flexShrink: 0,
          border: `${Math.max(2.5, size / 9)}px solid rgba(0,255,178,0.15)`,
          borderTopColor: MINT, animation: "cnSpin 0.8s linear infinite",
        }}
      />
    </>
  );
}

function KoLoadingPanel() {
  return (
    <div
      style={{
        marginTop: 24, padding: "36px 32px", borderRadius: 18,
        display: "flex", flexDirection: "column", alignItems: "center", gap: 14,
        border: `1px solid rgba(0,255,178,0.25)`, background: "rgba(0,255,178,0.04)",
      }}
    >
      <Spinner size={32} />
      <p style={{ margin: 0, fontSize: 15, fontWeight: 700, color: "#eafff8" }}>
        🎙️ 한국어 스토리 버전 불러오는 중…
      </p>
    </div>
  );
}

const NOTE_LABELS: Record<Lang, { remember: string; formulas: string; diagram: string; keyIdea: string; example: string; trap: string }> = {
  en: { remember: "REMEMBER", formulas: "ƒ KEY FORMULAS", diagram: "▦ DIAGRAM", keyIdea: "KEY IDEA", example: "✎ WORKED EXAMPLE", trap: "⚠ TRAP" },
  ko: { remember: "꼭 기억하기", formulas: "ƒ 핵심 공식", diagram: "▦ 도식으로 보기", keyIdea: "핵심 아이디어", example: "✎ 예제로 풀어보기", trap: "⚠ 함정 주의 — 여기서 틀립니다" },
};

function NoteView({ note, lang = "en" }: { note: CoreNote; lang?: Lang }) {
  const L = NOTE_LABELS[lang];
  return (
    <article>
      <div style={{ display: "flex", alignItems: "center", gap: 9, fontSize: 12.5, color: SUBTLE, fontWeight: 600 }}>
        <span style={{ color: MINT }}>{note.emoji} {note.subjectLabel}</span>
        {note.unit != null && (
          <>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>
              {note.lessonNum != null && (
                <strong style={{ color: "#cdd6e2" }}>{note.unit}.{note.lessonNum} </strong>
              )}
              Unit {note.unit}{note.unitName ? ` — ${note.unitName}` : ""}
            </span>
          </>
        )}
      </div>

      <h2 style={{ fontSize: 32, fontWeight: 800, lineHeight: 1.12, margin: "12px 0 0", letterSpacing: "-0.02em" }}>
        {note.title}
      </h2>
      {note.subtitle && (
        <p style={{ fontSize: 16, color: "#aab4c2", lineHeight: 1.5, marginTop: 12 }}>{note.subtitle}</p>
      )}

      {note.overview && (
        <div style={{ marginTop: 18 }}>
          {note.overview.split(/\n\n+/).map((p, i) => (
            <p key={i} style={{ fontSize: 16, lineHeight: 1.75, color: "#d4dce8", margin: i ? "14px 0 0" : 0 }}>{p}</p>
          ))}
        </div>
      )}

      {note.objectives.length > 0 && (
        <div
          style={{
            marginTop: 26, padding: "20px 22px", borderRadius: 16,
            background: "rgba(0,255,178,0.05)", border: `1px solid rgba(0,255,178,0.22)`,
          }}
        >
          <div style={{ fontSize: 11.5, letterSpacing: lang === "ko" ? "0.06em" : "0.18em", fontWeight: 800, color: MINT }}>{L.remember}</div>
          <ul style={{ listStyle: "none", padding: 0, margin: "14px 0 0", display: "grid", gap: 11 }}>
            {note.objectives.map((o, i) => (
              <li key={i} style={{ display: "flex", gap: 12, fontSize: 15, lineHeight: 1.5, color: "#e3e9f1" }}>
                <span style={{ color: MINT, flexShrink: 0, fontWeight: 800 }}>◆</span>
                <span>{o}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {note.formulas && note.formulas.length > 0 && (
        <div
          style={{
            marginTop: 22, padding: "16px 18px", borderRadius: 14,
            background: "#070b12", border: `1px solid rgba(0,255,178,0.28)`,
          }}
        >
          <div style={{ fontSize: 11, letterSpacing: lang === "ko" ? "0.05em" : "0.16em", fontWeight: 800, color: MINT, marginBottom: 10 }}>
            {L.formulas}
          </div>
          <div style={{ display: "grid", gap: 9 }}>
            {note.formulas.map((f, i) => (
              <code
                key={i}
                style={{
                  display: "block", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                  fontSize: 14, lineHeight: 1.5, color: "#dbe7f0",
                  background: "rgba(255,255,255,0.03)", padding: "8px 12px", borderRadius: 8,
                  borderLeft: `2px solid ${MINT}`, whiteSpace: "pre-wrap",
                }}
              >
                {f}
              </code>
            ))}
          </div>
        </div>
      )}

      {note.diagram && <Diagram kind={note.diagram} label={L.diagram} ko={lang === "ko"} />}

      {note.sections.map((s, i) => (
        <section key={i} style={{ marginTop: 40 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: MINT, opacity: 0.7 }}>{String(i + 1).padStart(2, "0")}</span>
            <h3 style={{ fontSize: 20, fontWeight: 700, margin: 0, color: "#f4f7fb", letterSpacing: "-0.01em", lineHeight: 1.3 }}>
              {s.title}
            </h3>
          </div>
          {s.body && (
            <div style={{ marginTop: 12 }}>
              {s.body.split(/\n\n+/).map((p, k) => (
                <p key={k} style={{ fontSize: 15.5, lineHeight: 1.7, color: "#cdd6e2", margin: k ? "12px 0 0" : 0 }}>{p}</p>
              ))}
            </div>
          )}
          {s.keyIdea && (
            <div style={{ marginTop: 16, display: "flex", gap: 12, alignItems: "flex-start", padding: "14px 18px", borderRadius: 12, background: "rgba(0,255,178,0.07)", border: `1px solid rgba(0,255,178,0.3)` }}>
              <span style={{ fontSize: 16, flexShrink: 0 }}>💡</span>
              <div>
                <div style={{ fontSize: 10.5, letterSpacing: lang === "ko" ? "0.05em" : "0.16em", fontWeight: 800, color: MINT, marginBottom: 3 }}>{L.keyIdea}</div>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: "#e6f0ea" }}>{s.keyIdea}</p>
              </div>
            </div>
          )}
          {s.table && <NoteTableView table={s.table} />}
          {s.terms.length > 0 && (
            <div style={{ margin: "18px 0 0", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
              {s.terms.map((t, j) => (
                <div key={j} style={{ padding: "12px 14px", borderRadius: 12, background: "#0d141d", border: `1px solid ${BORDER}`, borderTop: `2px solid rgba(0,255,178,0.5)` }}>
                  <div style={{ fontSize: 14.5, fontWeight: 700, color: MINT, letterSpacing: "-0.005em" }}>{t.term}</div>
                  <div style={{ margin: "5px 0 0", fontSize: 14, lineHeight: 1.55, color: "#c2cbd9" }}>{t.def}</div>
                </div>
              ))}
            </div>
          )}
          {s.example && (
            <div
              style={{
                marginTop: 20, padding: "16px 20px", borderRadius: 14,
                background: "rgba(143,162,255,0.07)", border: `1px solid rgba(143,162,255,0.3)`,
              }}
            >
              <div style={{ fontSize: 11, letterSpacing: lang === "ko" ? "0.05em" : "0.16em", fontWeight: 800, color: INDIGO }}>{L.example}</div>
              <p style={{ margin: "8px 0 0", fontSize: 15, lineHeight: 1.7, color: "#dfe5f1", whiteSpace: "pre-line" }}>{s.example}</p>
            </div>
          )}
          {s.traps.map((trap, k) => (
            <div
              key={k}
              style={{
                marginTop: 16, padding: "16px 20px", borderRadius: 14,
                background: "rgba(255,107,107,0.07)", border: `1px solid rgba(255,107,107,0.32)`,
              }}
            >
              <div style={{ fontSize: 11, letterSpacing: lang === "ko" ? "0.05em" : "0.16em", fontWeight: 800, color: RED }}>{L.trap}</div>
              <p style={{ margin: "8px 0 0", fontSize: 15, lineHeight: 1.7, color: "#f3dede" }}>{trap}</p>
            </div>
          ))}
        </section>
      ))}
    </article>
  );
}

function NoteTableView({ table }: { table: NoteTable }) {
  return (
    <div style={{ margin: "18px 0 0", overflowX: "auto", borderRadius: 12, border: `1px solid ${BORDER}` }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
        <thead>
          <tr>
            {table.headers.map((h, i) => (
              <th key={i} style={{ textAlign: "left", padding: "10px 14px", background: "rgba(0,255,178,0.10)", color: MINT, fontWeight: 700, fontSize: 12.5, letterSpacing: "0.02em", borderBottom: `1px solid ${BORDER}` }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row, r) => (
            <tr key={r} style={{ background: r % 2 ? "rgba(255,255,255,0.02)" : "transparent" }}>
              {row.map((cell, c) => (
                <td key={c} style={{ padding: "10px 14px", color: c === 0 ? "#e6edf5" : "#c2cbd9", fontWeight: c === 0 ? 600 : 400, lineHeight: 1.5, borderBottom: r < table.rows.length - 1 ? `1px solid ${BORDER}` : "none", verticalAlign: "top" }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const AXIS = "#3a4658";
const DLABEL = "#9aa6b6";
const DIAGRAM_TITLES: Record<string, string> = {
  "supply-demand": "Supply & Demand", "ad-as": "AD–AS Model", "ppc": "Production Possibilities Curve",
  "bell-curve": "Normal Distribution (68–95–99.7)", "scatter-regression": "Scatterplot & Regression Line",
  "boxplot": "Box-and-Whisker Plot", "tangent": "Tangent Line (Derivative)", "area-under-curve": "Area Under a Curve (Integral)",
  "neuron": "Structure of a Neuron", "brain-lobes": "The Four Cortical Lobes",
  "carbon-cycle": "The Carbon Cycle", "energy-pyramid": "Energy Pyramid (Trophic Levels)",
  "dtm": "Demographic Transition Model", "population-pyramid": "Population Pyramid",
  "three-branches": "Separation of Powers", "bill-to-law": "How a Bill Becomes Law",
  "rhetorical-triangle": "The Rhetorical Triangle", "argument-structure": "Argument Structure",
  "cause-effect": "Cause → Event → Effect",
};

const DIAGRAM_TITLES_KO: Record<string, string> = {
  "supply-demand": "수요와 공급 (Supply & Demand)", "ad-as": "AD–AS 모형", "ppc": "생산가능곡선 (PPC)",
  "bell-curve": "정규분포 (68–95–99.7 법칙)", "scatter-regression": "산점도와 회귀직선",
  "boxplot": "상자 수염 그림 (Boxplot)", "tangent": "접선 — 미분의 기하학", "area-under-curve": "곡선 아래 넓이 — 적분",
  "neuron": "뉴런의 구조", "brain-lobes": "대뇌 피질의 4개 엽",
  "carbon-cycle": "탄소 순환 (Carbon Cycle)", "energy-pyramid": "에너지 피라미드 (영양 단계)",
  "dtm": "인구변천모형 (DTM)", "population-pyramid": "인구 피라미드",
  "three-branches": "삼권분립 (Separation of Powers)", "bill-to-law": "법률 제정 과정",
  "rhetorical-triangle": "수사학의 삼각형 (Rhetorical Triangle)", "argument-structure": "논증의 구조",
  "cause-effect": "원인 → 사건 → 결과",
};

function Diagram({ kind, label = "▦ DIAGRAM", ko = false }: { kind: string; label?: string; ko?: boolean }) {
  const body = diagramBody(kind);
  if (!body) return null;
  const caption = (ko ? DIAGRAM_TITLES_KO[kind] : undefined) ?? DIAGRAM_TITLES[kind] ?? "";
  return (
    <figure style={{ margin: "22px 0 0", padding: "18px 18px 12px", borderRadius: 14, background: "#070b12", border: `1px solid ${BORDER}` }}>
      <div style={{ fontSize: 11, letterSpacing: ko ? "0.05em" : "0.16em", fontWeight: 800, color: INDIGO, marginBottom: 8 }}>{label}</div>
      <svg viewBox="0 0 280 170" width="100%" style={{ maxWidth: 360, display: "block", margin: "0 auto" }}>{body}</svg>
      <figcaption style={{ textAlign: "center", fontSize: 12, color: DLABEL, marginTop: 6 }}>{caption}</figcaption>
    </figure>
  );
}

function axes() {
  return (
    <>
      <line x1="40" y1="20" x2="40" y2="140" stroke={AXIS} strokeWidth="1.5" />
      <line x1="40" y1="140" x2="250" y2="140" stroke={AXIS} strokeWidth="1.5" />
    </>
  );
}
const lbl = (x: number, y: number, t: string, fill: string = DLABEL) => (
  <text x={x} y={y} fill={fill} fontSize="9">{t}</text>
);

function diagramBody(kind: string): React.ReactNode {
  switch (kind) {
    case "supply-demand":
    case "ad-as": {
      const up = kind === "supply-demand" ? "S" : "SRAS";
      const down = kind === "supply-demand" ? "D" : "AD";
      return (<>
        {axes()}
        <line x1="55" y1="125" x2="235" y2="35" stroke={MINT} strokeWidth="2.2" />
        <line x1="55" y1="35" x2="235" y2="125" stroke={INDIGO} strokeWidth="2.2" />
        <line x1="145" y1="80" x2="145" y2="140" stroke={AXIS} strokeDasharray="3 3" />
        <line x1="40" y1="80" x2="145" y2="80" stroke={AXIS} strokeDasharray="3 3" />
        <circle cx="145" cy="80" r="3" fill="#fff" />
        {lbl(238, 33, up, MINT)}{lbl(238, 128, down, INDIGO)}
        {lbl(24, 84, "P*")}{lbl(140, 152, "Q*")}
        {lbl(18, 18, kind === "ad-as" ? "PL" : "P")}{lbl(250, 136, kind === "ad-as" ? "rGDP" : "Q")}
      </>);
    }
    case "ppc":
      return (<>
        {axes()}
        <path d="M40,35 C 110,45 150,95 235,140" fill="none" stroke={MINT} strokeWidth="2.2" />
        <circle cx="120" cy="78" r="3" fill="#fff" />{lbl(126, 74, "efficient")}
        <circle cx="85" cy="118" r="2.5" fill={INDIGO} />{lbl(92, 122, "inside = idle", INDIGO)}
        {lbl(20, 30, "A")}{lbl(244, 136, "B")}
      </>);
    case "bell-curve":
      return (<>
        <line x1="20" y1="135" x2="260" y2="135" stroke={AXIS} strokeWidth="1.5" />
        <path d="M30,135 C 90,135 105,40 140,40 C 175,40 190,135 250,135" fill="rgba(0,255,178,0.08)" stroke={MINT} strokeWidth="2.2" />
        {[80, 110, 140, 170, 200].map((x, i) => (<line key={i} x1={x} y1="131" x2={x} y2="139" stroke={AXIS} strokeWidth="1.5" />))}
        <line x1="140" y1="40" x2="140" y2="135" stroke={AXIS} strokeDasharray="3 3" />
        {lbl(136, 150, "μ")}{lbl(99, 150, "−1σ")}{lbl(160, 150, "+1σ")}
        {lbl(120, 95, "68%", MINT)}
      </>);
    case "scatter-regression": {
      const pts = [[60, 120], [80, 110], [95, 118], [110, 95], [130, 100], [150, 80], [170, 85], [195, 60], [215, 62], [230, 45]];
      return (<>
        {axes()}
        {pts.map((p, i) => (<circle key={i} cx={p[0]} cy={p[1]} r="2.6" fill={INDIGO} />))}
        <line x1="55" y1="125" x2="235" y2="45" stroke={MINT} strokeWidth="2.2" />
        {lbl(150, 58, "ŷ = a + bx", MINT)}
      </>);
    }
    case "boxplot":
      return (<>
        <line x1="20" y1="90" x2="260" y2="90" stroke={AXIS} strokeWidth="1.5" />
        <line x1="55" y1="90" x2="95" y2="90" stroke={MINT} strokeWidth="2" />
        <line x1="55" y1="78" x2="55" y2="102" stroke={MINT} strokeWidth="2" />
        <rect x="95" y="68" width="90" height="44" fill="rgba(0,255,178,0.08)" stroke={MINT} strokeWidth="2" />
        <line x1="140" y1="68" x2="140" y2="112" stroke={MINT} strokeWidth="2.4" />
        <line x1="185" y1="90" x2="230" y2="90" stroke={MINT} strokeWidth="2" />
        <line x1="230" y1="78" x2="230" y2="102" stroke={MINT} strokeWidth="2" />
        {lbl(46, 128, "min")}{lbl(86, 128, "Q1")}{lbl(130, 128, "med")}{lbl(177, 128, "Q3")}{lbl(218, 128, "max")}
      </>);
    case "tangent":
      return (<>
        {axes()}
        <path d="M50,130 Q 145,0 240,130" fill="none" stroke={INDIGO} strokeWidth="2.2" />
        <line x1="70" y1="120" x2="200" y2="40" stroke={MINT} strokeWidth="2" />
        <circle cx="115" cy="71" r="3.2" fill="#fff" />
        {lbl(120, 64, "slope = f'(a)", MINT)}{lbl(108, 152, "a")}
      </>);
    case "area-under-curve":
      return (<>
        {axes()}
        <path d="M40,140 L60,110 Q 140,40 230,95 L230,140 Z" fill="rgba(0,255,178,0.14)" stroke="none" />
        <path d="M60,110 Q 140,40 230,95" fill="none" stroke={MINT} strokeWidth="2.2" />
        {lbl(118, 112, "∫ₐᵇ f(x) dx", MINT)}{lbl(56, 152, "a")}{lbl(224, 152, "b")}
      </>);
    case "neuron":
      return (<>
        {/* dendrites */}
        <path d="M30,60 L60,80 M30,100 L60,80 M30,80 L60,80" stroke={INDIGO} strokeWidth="1.6" fill="none" />
        <circle cx="72" cy="80" r="14" fill="rgba(0,255,178,0.10)" stroke={MINT} strokeWidth="2" />
        {/* axon with myelin */}
        <line x1="86" y1="80" x2="210" y2="80" stroke={MINT} strokeWidth="2" />
        {[110, 145, 180].map((x, i) => (<rect key={i} x={x} y="73" width="22" height="14" rx="7" fill="rgba(143,162,255,0.18)" stroke={INDIGO} strokeWidth="1" />))}
        {/* terminals */}
        <path d="M210,80 L235,66 M210,80 L235,94 M210,80 L238,80" stroke={MINT} strokeWidth="1.6" fill="none" />
        {lbl(20, 50, "dendrites", INDIGO)}{lbl(58, 112, "soma")}{lbl(120, 64, "myelin", INDIGO)}{lbl(150, 105, "axon", MINT)}{lbl(214, 56, "terminals")}
      </>);
    case "brain-lobes":
      return (<>
        <path d="M55,95 C 45,55 95,30 150,32 C 215,34 245,60 240,92 C 238,118 200,132 150,132 C 100,132 62,124 55,95 Z"
          fill="rgba(143,162,255,0.06)" stroke={AXIS} strokeWidth="1.6" />
        <line x1="150" y1="34" x2="150" y2="130" stroke={AXIS} strokeDasharray="3 3" />
        <line x1="60" y1="92" x2="240" y2="86" stroke={AXIS} strokeDasharray="3 3" />
        {lbl(95, 62, "Frontal", MINT)}{lbl(178, 60, "Parietal", MINT)}{lbl(95, 116, "Temporal", INDIGO)}{lbl(196, 116, "Occipital", INDIGO)}
      </>);
    case "carbon-cycle": {
      const box = (x: number, y: number, t: string, c: string) => (<>
        <rect x={x - 38} y={y - 14} width="76" height="28" rx="8" fill="#0d1320" stroke={c} strokeWidth="1.4" />
        <text x={x} y={y + 3.5} textAnchor="middle" fill="#dde4ee" fontSize="9">{t}</text>
      </>);
      return (<>
        <defs><marker id="arr" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill={AXIS} /></marker></defs>
        {box(140, 30, "Atmosphere CO₂", MINT)}
        {box(60, 110, "Plants", INDIGO)}
        {box(220, 110, "Animals", INDIGO)}
        <path d="M110,40 Q 70,60 62,94" fill="none" stroke={AXIS} strokeWidth="1.4" markerEnd="url(#arr)" />
        <path d="M98,110 L182,110" fill="none" stroke={AXIS} strokeWidth="1.4" markerEnd="url(#arr)" />
        <path d="M222,96 Q 200,55 168,40" fill="none" stroke={AXIS} strokeWidth="1.4" markerEnd="url(#arr)" />
        {lbl(40, 78, "photo-", INDIGO)}{lbl(40, 90, "synthesis", INDIGO)}{lbl(196, 70, "respiration", INDIGO)}
      </>);
    }
    case "energy-pyramid": {
      const tier = (y: number, w: number, label: string, pct: string) => (<>
        <rect x={140 - w / 2} y={y} width={w} height="26" fill="rgba(0,255,178,0.08)" stroke={MINT} strokeWidth="1.4" />
        <text x={140} y={y + 17} textAnchor="middle" fill="#dde4ee" fontSize="9">{label}</text>
        <text x={140 + w / 2 + 6} y={y + 17} fill={DLABEL} fontSize="8">{pct}</text>
      </>);
      return (<>
        {tier(30, 70, "Tertiary", "0.1%")}
        {tier(62, 120, "Secondary", "1%")}
        {tier(94, 170, "Primary", "10%")}
        {tier(126, 220, "Producers", "100%")}
        {lbl(20, 24, "energy ↓", MINT)}
      </>);
    }
    case "dtm":
      return (<>
        {axes()}
        <path d="M40,45 C 90,45 110,55 150,95 C 180,120 210,125 250,125" fill="none" stroke={INDIGO} strokeWidth="2.2" />
        <path d="M40,70 C 80,72 95,110 150,120 C 200,128 220,128 250,126" fill="none" stroke={MINT} strokeWidth="2.2" />
        {[80, 130, 185, 225].map((x, i) => (<line key={i} x1={x} y1="20" x2={x} y2="140" stroke={AXIS} strokeDasharray="2 4" />))}
        {lbl(48, 40, "birth rate", INDIGO)}{lbl(150, 138, "death rate", MINT)}
        {["1", "2", "3", "4"].map((s, i) => (<text key={i} x={[58, 105, 157, 205][i]} y="18" fill={DLABEL} fontSize="8">Stage {s}</text>))}
      </>);
    case "population-pyramid": {
      const rows = [[70, 18], [60, 30], [44, 22], [30, 16], [18, 10]];
      return (<>
        <line x1="140" y1="28" x2="140" y2="142" stroke={AXIS} strokeWidth="1.4" />
        {rows.map((r, i) => { const y = 30 + i * 22; return (<g key={i}>
          <rect x={140 - r[0]} y={y} width={r[0]} height="18" fill="rgba(143,162,255,0.18)" stroke={INDIGO} strokeWidth="1" />
          <rect x={140} y={y} width={r[1] + 30} height="18" fill="rgba(0,255,178,0.12)" stroke={MINT} strokeWidth="1" />
        </g>); })}
        {lbl(60, 22, "male", INDIGO)}{lbl(196, 22, "female", MINT)}{lbl(120, 156, "age structure")}
      </>);
    }
    case "three-branches": {
      const box = (x: number, t1: string, t2: string) => (<>
        <rect x={x - 48} y="34" width="96" height="40" rx="9" fill="#0d1320" stroke={MINT} strokeWidth="1.5" />
        <text x={x} y="52" textAnchor="middle" fill="#eafff8" fontSize="9.5" fontWeight="700">{t1}</text>
        <text x={x} y="65" textAnchor="middle" fill={DLABEL} fontSize="8">{t2}</text>
      </>);
      return (<>
        {box(65, "Legislative", "makes laws")}
        {box(180, "Executive", "enforces")}
        {box(265, "Judicial", "interprets")}
        <path d="M65,80 Q 140,120 265,82 M265,86 Q 140,140 65,86 M113,54 L132,54 M228,54 L213,54" fill="none" stroke={AXIS} strokeWidth="1.3" strokeDasharray="3 3" />
        {lbl(120, 134, "checks & balances")}
      </>);
    }
    case "bill-to-law": {
      const step = (x: number, t: string) => (<>
        <rect x={x - 32} y="70" width="64" height="30" rx="8" fill="#0d1320" stroke={MINT} strokeWidth="1.4" />
        <text x={x} y="89" textAnchor="middle" fill="#dde4ee" fontSize="9">{t}</text>
      </>);
      return (<>
        <defs><marker id="a2" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill={MINT} /></marker></defs>
        {step(45, "House")}{step(130, "Senate")}{step(215, "President")}
        <line x1="78" y1="85" x2="96" y2="85" stroke={MINT} strokeWidth="1.5" markerEnd="url(#a2)" />
        <line x1="163" y1="85" x2="181" y2="85" stroke={MINT} strokeWidth="1.5" markerEnd="url(#a2)" />
        <line x1="247" y1="85" x2="262" y2="85" stroke={MINT} strokeWidth="1.5" markerEnd="url(#a2)" />
        {lbl(258, 89, "✓ Law", MINT)}
      </>);
    }
    case "rhetorical-triangle":
      return (<>
        <path d="M140,30 L55,135 L225,135 Z" fill="rgba(0,255,178,0.05)" stroke={MINT} strokeWidth="2" />
        {lbl(120, 24, "ETHOS", MINT)}{lbl(28, 140, "PATHOS", INDIGO)}{lbl(196, 140, "LOGOS", INDIGO)}
        {lbl(118, 88, "the message")}
        {lbl(70, 70, "speaker", DLABEL)}{lbl(170, 70, "audience", DLABEL)}
      </>);
    case "argument-structure": {
      const step = (y: number, t: string, c: string) => (<>
        <rect x="80" y={y} width="120" height="26" rx="8" fill="#0d1320" stroke={c} strokeWidth="1.4" />
        <text x="140" y={y + 17} textAnchor="middle" fill="#dde4ee" fontSize="9">{t}</text>
      </>);
      return (<>
        <defs><marker id="a3" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill={AXIS} /></marker></defs>
        {step(24, "Claim (thesis)", MINT)}
        {step(72, "Evidence", INDIGO)}
        {step(120, "Reasoning / Warrant", INDIGO)}
        <line x1="140" y1="50" x2="140" y2="70" stroke={AXIS} strokeWidth="1.4" markerEnd="url(#a3)" />
        <line x1="140" y1="98" x2="140" y2="118" stroke={AXIS} strokeWidth="1.4" markerEnd="url(#a3)" />
      </>);
    }
    case "cause-effect": {
      const box = (x: number, t: string, c: string) => (<>
        <rect x={x - 40} y="68" width="80" height="34" rx="9" fill="#0d1320" stroke={c} strokeWidth="1.4" />
        <text x={x} y="89" textAnchor="middle" fill="#dde4ee" fontSize="9">{t}</text>
      </>);
      return (<>
        <defs><marker id="a4" markerWidth="7" markerHeight="7" refX="5" refY="2.5" orient="auto"><path d="M0,0 L5,2.5 L0,5 z" fill={AXIS} /></marker></defs>
        {box(50, "Cause", INDIGO)}{box(140, "Event", MINT)}{box(230, "Effect", INDIGO)}
        <line x1="92" y1="85" x2="98" y2="85" stroke={AXIS} strokeWidth="1.5" markerEnd="url(#a4)" />
        <line x1="182" y1="85" x2="188" y2="85" stroke={AXIS} strokeWidth="1.5" markerEnd="url(#a4)" />
      </>);
    }
    default:
      return null;
  }
}
