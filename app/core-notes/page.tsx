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
interface NoteSection { title: string; subtitle?: string | null; terms: NoteTerm[]; traps: string[]; example?: string | null }
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
  objectives: string[];
  formulas?: string[];
  sections: NoteSection[];
}
interface SubjectCount { courseId: string | null; label: string; emoji: string; count: number }

export default function CoreNotesPage() {
  const [subjects, setSubjects] = useState<SubjectCount[]>([]);
  const [total, setTotal] = useState(0);
  const [active, setActive] = useState<string | null>(null);
  const [notes, setNotes] = useState<CoreNote[]>([]);
  const [activeLesson, setActiveLesson] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

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
          {total.toLocaleString()} distilled notes from InHero lessons — only what to remember in the
          exam room. <span style={{ color: RED }}>Traps in red.</span>
        </p>
        {/* Subject selector */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 18 }}>
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
            <p style={{ color: SUBTLE, fontSize: 13, padding: "0 20px" }}>Loading…</p>
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
              <p style={{ color: SUBTLE }}>Loading {activeLabel} notes…</p>
            ) : current ? (
              <NoteView note={current} />
            ) : (
              <p style={{ color: SUBTLE }}>No notes yet for {activeLabel}.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

function NoteView({ note }: { note: CoreNote }) {
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

      {note.objectives.length > 0 && (
        <div
          style={{
            marginTop: 26, padding: "20px 22px", borderRadius: 16,
            background: "rgba(0,255,178,0.05)", border: `1px solid rgba(0,255,178,0.22)`,
          }}
        >
          <div style={{ fontSize: 11.5, letterSpacing: "0.18em", fontWeight: 800, color: MINT }}>REMEMBER</div>
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
          <div style={{ fontSize: 11, letterSpacing: "0.16em", fontWeight: 800, color: MINT, marginBottom: 10 }}>
            ƒ KEY FORMULAS
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

      {note.sections.map((s, i) => (
        <section key={i} style={{ marginTop: 40 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: MINT, opacity: 0.7 }}>{String(i + 1).padStart(2, "0")}</span>
            <h3 style={{ fontSize: 20, fontWeight: 700, margin: 0, color: "#f4f7fb", letterSpacing: "-0.01em", lineHeight: 1.3 }}>
              {s.title}
            </h3>
          </div>
          {s.terms.length > 0 && (
            <dl style={{ margin: "18px 0 0", display: "grid", gap: 18 }}>
              {s.terms.map((t, j) => (
                <div key={j} style={{ borderLeft: `2px solid rgba(0,255,178,0.35)`, paddingLeft: 16 }}>
                  <dt style={{ fontSize: 15.5, fontWeight: 700, color: MINT, letterSpacing: "-0.005em" }}>{t.term}</dt>
                  <dd style={{ margin: "5px 0 0", fontSize: 15.5, lineHeight: 1.65, color: "#cdd6e2" }}>{t.def}</dd>
                </div>
              ))}
            </dl>
          )}
          {s.example && (
            <div
              style={{
                marginTop: 20, padding: "16px 20px", borderRadius: 14,
                background: "rgba(143,162,255,0.07)", border: `1px solid rgba(143,162,255,0.3)`,
              }}
            >
              <div style={{ fontSize: 11, letterSpacing: "0.16em", fontWeight: 800, color: INDIGO }}>✎ WORKED EXAMPLE</div>
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
              <div style={{ fontSize: 11, letterSpacing: "0.16em", fontWeight: 800, color: RED }}>⚠ TRAP</div>
              <p style={{ margin: "8px 0 0", fontSize: 15, lineHeight: 1.7, color: "#f3dede" }}>{trap}</p>
            </div>
          ))}
        </section>
      ))}
    </article>
  );
}
