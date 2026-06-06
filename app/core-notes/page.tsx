"use client";

/**
 * Core Notes — condensed, exam-focused study cards distilled from the lesson
 * scripts (see /api/core-notes). Khan-Academy principle: one screen, one
 * concept, generous whitespace, an unbroken top-to-bottom eye path. InHero
 * brand: deep space dark + mint (#00FFB2), traps flagged in red.
 */

import { useEffect, useMemo, useState } from "react";

const MINT = "#00FFB2";
const RED = "#ff6b6b";
const BG = "#05070d";
const CARD = "#0c1119";
const BORDER = "#1b2230";
const SUBTLE = "#8a96a8";

interface NoteTerm { term: string; def: string }
interface NoteSection { title: string; subtitle?: string | null; terms: NoteTerm[]; traps: string[] }
interface CoreNote {
  lessonId: string;
  courseId: string | null;
  subjectLabel: string;
  emoji: string;
  unit: number | null;
  unitName?: string | null;
  title: string;
  subtitle?: string | null;
  objectives: string[];
  sections: NoteSection[];
}
interface SubjectCount { courseId: string | null; label: string; emoji: string; count: number }

export default function CoreNotesPage() {
  const [subjects, setSubjects] = useState<SubjectCount[]>([]);
  const [total, setTotal] = useState(0);
  const [active, setActive] = useState<string | null>(null);
  const [notes, setNotes] = useState<CoreNote[]>([]);
  const [loading, setLoading] = useState(true);

  // Load subject chips once.
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

  // Load notes for the active subject.
  useEffect(() => {
    if (!active) return;
    setLoading(true);
    fetch(`/api/core-notes?subject=${encodeURIComponent(active)}`)
      .then((r) => r.json())
      .then((d) => setNotes(d.notes ?? []))
      .catch(() => setNotes([]))
      .finally(() => setLoading(false));
  }, [active]);

  const activeLabel = useMemo(
    () => subjects.find((s) => s.courseId === active)?.label ?? "",
    [subjects, active]
  );

  return (
    <div style={{ minHeight: "100vh", background: BG, color: "#e8edf4", padding: "0 0 120px" }}>
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "56px 24px 0" }}>
        <p style={{ letterSpacing: "0.28em", fontSize: 12, color: MINT, fontWeight: 700, margin: 0 }}>
          INHERO · CORE NOTES
        </p>
        <h1 style={{ fontSize: 52, lineHeight: 1.04, fontWeight: 800, margin: "14px 0 0", letterSpacing: "-0.02em" }}>
          One screen.<br />One concept.
        </h1>
        <p style={{ fontSize: 17, color: SUBTLE, maxWidth: 560, marginTop: 18, lineHeight: 1.5 }}>
          {total.toLocaleString()} distilled notes pulled straight from InHero lessons — only what
          you need to remember in the exam room. The traps are in red.
        </p>

        {/* Subject chips */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 32 }}>
          {subjects.map((s) => {
            const on = s.courseId === active;
            return (
              <button
                key={s.courseId ?? "general"}
                onClick={() => setActive(s.courseId)}
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "9px 16px", borderRadius: 999, cursor: "pointer",
                  border: `1px solid ${on ? MINT : BORDER}`,
                  background: on ? "rgba(0,255,178,0.12)" : "transparent",
                  color: on ? MINT : "#cdd6e2", fontSize: 14, fontWeight: 600,
                  transition: "all .15s",
                }}
              >
                <span>{s.emoji}</span>
                <span>{s.label}</span>
                <span style={{ color: on ? MINT : SUBTLE, fontWeight: 700 }}>{s.count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Note feed */}
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "40px 24px 0" }}>
        {loading ? (
          <p style={{ color: SUBTLE, fontSize: 16 }}>Loading {activeLabel} notes…</p>
        ) : notes.length === 0 ? (
          <p style={{ color: SUBTLE, fontSize: 16 }}>No notes yet for {activeLabel}.</p>
        ) : (
          notes.map((n) => <NoteCard key={n.lessonId} note={n} />)
        )}
      </div>
    </div>
  );
}

function NoteCard({ note }: { note: CoreNote }) {
  return (
    <article
      style={{
        background: CARD, border: `1px solid ${BORDER}`, borderRadius: 20,
        padding: "34px 34px 30px", marginBottom: 28,
      }}
    >
      {/* unit / subject tag */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12.5, color: SUBTLE, fontWeight: 600 }}>
        <span style={{ color: MINT }}>{note.emoji} {note.subjectLabel}</span>
        {note.unit != null && (
          <>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>Unit {note.unit}{note.unitName ? ` — ${note.unitName}` : ""}</span>
          </>
        )}
      </div>

      <h2 style={{ fontSize: 27, fontWeight: 800, lineHeight: 1.15, margin: "12px 0 0", letterSpacing: "-0.01em" }}>
        {note.title}
      </h2>
      {note.subtitle && (
        <p style={{ fontSize: 15.5, color: "#b8c2d0", lineHeight: 1.5, marginTop: 10 }}>{note.subtitle}</p>
      )}

      {/* Remember — key points */}
      {note.objectives.length > 0 && (
        <div style={{ marginTop: 26 }}>
          <SectionLabel>Remember</SectionLabel>
          <ul style={{ listStyle: "none", padding: 0, margin: "12px 0 0", display: "grid", gap: 10 }}>
            {note.objectives.map((o, i) => (
              <li key={i} style={{ display: "flex", gap: 12, fontSize: 15, lineHeight: 1.5, color: "#dde4ee" }}>
                <span style={{ color: MINT, flexShrink: 0, fontWeight: 800 }}>◆</span>
                <span>{o}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Concept sections: key terms + traps */}
      {note.sections.map((s, i) => (
        <div key={i} style={{ marginTop: 28, paddingTop: 24, borderTop: `1px solid ${BORDER}` }}>
          <h3 style={{ fontSize: 17, fontWeight: 700, margin: 0, color: "#f0f4fa" }}>{s.title}</h3>
          {s.terms.length > 0 && (
            <dl style={{ margin: "16px 0 0", display: "grid", gap: 14 }}>
              {s.terms.map((t, j) => (
                <div key={j}>
                  <dt style={{ fontSize: 14.5, fontWeight: 700, color: MINT }}>{t.term}</dt>
                  <dd style={{ margin: "3px 0 0", fontSize: 14.5, lineHeight: 1.5, color: "#c4cdda" }}>{t.def}</dd>
                </div>
              ))}
            </dl>
          )}
          {s.traps.map((trap, k) => (
            <div
              key={k}
              style={{
                marginTop: 16, padding: "14px 16px", borderRadius: 12,
                background: "rgba(255,107,107,0.08)", border: `1px solid rgba(255,107,107,0.35)`,
              }}
            >
              <div style={{ fontSize: 11.5, letterSpacing: "0.16em", fontWeight: 800, color: RED }}>⚠ TRAP</div>
              <p style={{ margin: "6px 0 0", fontSize: 14, lineHeight: 1.55, color: "#f0d9d9" }}>{trap}</p>
            </div>
          ))}
        </div>
      ))}
    </article>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ fontSize: 11.5, letterSpacing: "0.18em", fontWeight: 800, color: "#00FFB2" }}>
      {children}
    </span>
  );
}
