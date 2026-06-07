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
  diagram?: string | null;
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

      {note.diagram ? (
        <Diagram kind={note.diagram} />
      ) : (
        <ConceptMap
          title={note.title}
          nodes={
            note.sections.flatMap((s) => s.terms.map((t) => t.term)).length
              ? note.sections.flatMap((s) => s.terms.map((t) => t.term))
              : note.objectives
          }
        />
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

const AXIS = "#3a4658";
const DLABEL = "#9aa6b6";
const DIAGRAM_TITLES: Record<string, string> = {
  "supply-demand": "Supply & Demand", "ad-as": "AD–AS Model", "ppc": "Production Possibilities Curve",
  "bell-curve": "Normal Distribution (68–95–99.7)", "scatter-regression": "Scatterplot & Regression Line",
  "boxplot": "Box-and-Whisker Plot", "tangent": "Tangent Line (Derivative)", "area-under-curve": "Area Under a Curve (Integral)",
};

function Diagram({ kind }: { kind: string }) {
  const body = diagramBody(kind);
  if (!body) return null;
  return (
    <figure style={{ margin: "22px 0 0", padding: "18px 18px 12px", borderRadius: 14, background: "#070b12", border: `1px solid ${BORDER}` }}>
      <div style={{ fontSize: 11, letterSpacing: "0.16em", fontWeight: 800, color: INDIGO, marginBottom: 8 }}>▦ DIAGRAM</div>
      <svg viewBox="0 0 280 170" width="100%" style={{ maxWidth: 360, display: "block", margin: "0 auto" }}>{body}</svg>
      <figcaption style={{ textAlign: "center", fontSize: 12, color: DLABEL, marginTop: 6 }}>{DIAGRAM_TITLES[kind] ?? ""}</figcaption>
    </figure>
  );
}

// Universal fallback diagram: a hub-and-spoke concept map from the note's own
// key terms (or objectives) — so every note gets a visual, not just quant ones.
function ConceptMap({ title, nodes }: { title: string; nodes: string[] }) {
  const seen = new Set<string>();
  const clean = nodes
    .map((n) => n.split(/[:(]/)[0].trim())
    .filter((n) => n && !seen.has(n.toLowerCase()) && seen.add(n.toLowerCase()));
  const picked = clean.slice(0, 6);
  if (picked.length === 0) return null;
  const trunc = (s: string, n: number) => (s.length > n ? s.slice(0, n - 1) + "…" : s);
  // Balanced slots, ordered so fewer nodes still look even (corners first).
  const cx = 180, cy = 96;
  const order = [
    [70, 44], [290, 44], [70, 148], [290, 148], [70, 96], [290, 96],
  ].slice(0, picked.length);
  const NW = 104, NH = 28;
  return (
    <figure style={{ margin: "22px 0 0", padding: "18px 18px 12px", borderRadius: 14, background: "#070b12", border: `1px solid ${BORDER}` }}>
      <div style={{ fontSize: 11, letterSpacing: "0.16em", fontWeight: 800, color: INDIGO, marginBottom: 8 }}>▦ CONCEPT MAP</div>
      <svg viewBox="0 0 360 192" width="100%" style={{ maxWidth: 460, display: "block", margin: "0 auto" }}>
        {/* spokes first — hidden under the opaque boxes drawn on top */}
        {order.map((s, i) => (
          <line key={"l" + i} x1={cx} y1={cy} x2={s[0]} y2={s[1]} stroke={AXIS} strokeWidth="1.4" />
        ))}
        {/* satellite term nodes (opaque) */}
        {order.map((s, i) => (
          <g key={"n" + i}>
            <rect x={s[0] - NW / 2} y={s[1] - NH / 2} width={NW} height={NH} rx="8"
              fill="#0d1320" stroke="rgba(143,162,255,0.55)" strokeWidth="1.2" />
            <text x={s[0]} y={s[1] + 3.5} textAnchor="middle" fill="#dde4ee" fontSize="9.5">{trunc(picked[i], 16)}</text>
          </g>
        ))}
        {/* center topic (opaque, on top so spokes tuck under it) */}
        <rect x={cx - 56} y={cy - 16} width="112" height="32" rx="9" fill="#0b1f1a" stroke={MINT} strokeWidth="1.8" />
        <text x={cx} y={cy + 4} textAnchor="middle" fill="#eafff8" fontSize="10.5" fontWeight="700">{trunc(title, 18)}</text>
      </svg>
      <figcaption style={{ textAlign: "center", fontSize: 12, color: DLABEL, marginTop: 6 }}>How the key ideas connect</figcaption>
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
    default:
      return null;
  }
}
