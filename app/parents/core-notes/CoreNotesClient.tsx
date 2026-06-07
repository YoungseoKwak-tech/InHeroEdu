"use client";

/**
 * /parents/core-notes — WHITE core-notes reader, two-pane.
 *
 * Left rail: subject's notes grouped by Unit (browse unit by unit).
 * Right pane: the selected note (Korean 일타강사 where ready — AP Chemistry is
 * complete — else English with Korean auto-fetched on select) + a prominent
 * "영어버전 보러가기" button that jumps to the main-site core notes (/core-notes).
 */

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const GREEN = "#00b85f";

interface EnSection { title: string; subtitle?: string | null; body?: string | null; terms?: { term: string; def: string }[]; traps?: string[]; example?: string | null; }
interface ListNote { lessonId: string; emoji: string; subjectLabel: string; unit: number | null; lessonNum: number | null; unitName?: string | null; title: string; subtitle?: string | null; objectives: string[]; sections: EnSection[]; }
interface KoSection { title: string; subtitle?: string | null; body?: string | null; }
interface KoNote { title: string; subtitle?: string | null; overview?: string | null; objectives: string[]; sections: KoSection[]; }
interface SubjectCount { courseId: string | null; label: string; emoji: string; count: number; }

export default function CoreNotesClient() {
  const [subjects, setSubjects] = useState<SubjectCount[]>([]);
  const [total, setTotal] = useState(735);
  const [active, setActive] = useState<string | null>("ap-chemistry");
  const [notes, setNotes] = useState<ListNote[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);
  const [koCache, setKoCache] = useState<Record<string, KoNote | "none">>({});

  useEffect(() => {
    fetch("/api/core-notes?countOnly=true").then((r) => r.json())
      .then((d) => { setSubjects(d?.subjects ?? []); setTotal(d?.total ?? 735); }).catch(() => {});
  }, []);

  useEffect(() => {
    if (!active) return;
    setLoading(true); setSelected(null);
    fetch(`/api/core-notes?subject=${encodeURIComponent(active)}`).then((r) => r.json())
      .then((d) => { const n: ListNote[] = d?.notes ?? []; setNotes(n); if (n[0]) setSelected(n[0].lessonId); })
      .catch(() => setNotes([]))
      .finally(() => setLoading(false));
  }, [active]);

  // Fetch the Korean version of the selected note (once).
  useEffect(() => {
    if (!selected || koCache[selected] !== undefined) return;
    fetch(`/api/core-notes/korean?lessonId=${encodeURIComponent(selected)}`).then((r) => r.json())
      .then((d) => setKoCache((c) => ({ ...c, [selected]: d?.note ?? "none" })))
      .catch(() => setKoCache((c) => ({ ...c, [selected]: "none" })));
  }, [selected, koCache]);

  // Group notes by unit for the left rail.
  const units = useMemo(() => {
    const map = new Map<number, { unitName: string; notes: ListNote[] }>();
    for (const n of notes) {
      const u = n.unit ?? 0;
      if (!map.has(u)) map.set(u, { unitName: n.unitName ?? "", notes: [] });
      map.get(u)!.notes.push(n);
    }
    return [...map.entries()].sort((a, b) => a[0] - b[0]).map(([unit, v]) => ({ unit, ...v }));
  }, [notes]);

  const note = notes.find((n) => n.lessonId === selected) ?? null;
  const ko = selected ? koCache[selected] : undefined;
  const isKo = ko && ko !== "none";

  return (
    <div style={{ position: "relative", zIndex: 10, minHeight: "100vh", background: "#eef1f4", color: "#1a1a1f", cursor: "auto", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ position: "sticky", top: 0, zIndex: 20, background: "rgba(255,255,255,0.94)", backdropFilter: "blur(8px)", borderBottom: "1px solid #e2e6ea" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/parents" style={{ color: "#475569", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>← 자료실</Link>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 15 }}>In<span style={{ color: GREEN }}>Hero</span> · 학부모</span>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 20px 90px" }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: "#7c3aed", marginBottom: 10 }}>📘 AP 개념정리</p>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.6rem,3.6vw,2.2rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 10 }}>
          {total.toLocaleString()}개 AP 개념정리, 일타강사처럼
        </h1>
        <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.7, marginBottom: 18 }}>
          AP Chemistry는 한국어로 완성되어 있고, 다른 과목도 순차 한국어화 중입니다. 과목을 고르고 왼쪽에서 단원별로 골라 읽어보세요.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 22 }}>
          {subjects.map((s) => (
            <Chip key={s.courseId ?? s.label} active={active === s.courseId} onClick={() => setActive(s.courseId)} label={s.label} emoji={s.emoji} count={s.count} />
          ))}
        </div>

        {loading ? (
          <p style={{ color: "#94a3b8", fontSize: 14, padding: "30px 0", textAlign: "center" }}>노트를 불러오는 중…</p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "248px minmax(0,1fr)", gap: 20, alignItems: "start" }} className="cn-grid">
            {/* LEFT: unit → lesson rail */}
            <nav style={{ background: "#fff", border: "1px solid #e2e6ea", borderRadius: 14, padding: "12px 10px", position: "sticky", top: 70, maxHeight: "calc(100vh - 90px)", overflowY: "auto" }} className="cn-rail" aria-label="단원">
              {units.map((u) => (
                <div key={u.unit} style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: "#94a3b8", letterSpacing: "0.04em", padding: "6px 8px 4px" }}>
                    UNIT {u.unit}{u.unitName ? ` · ${u.unitName}` : ""}
                  </div>
                  {u.notes.map((n) => {
                    const on = selected === n.lessonId;
                    return (
                      <button key={n.lessonId} onClick={() => setSelected(n.lessonId)}
                        style={{ width: "100%", textAlign: "left", border: "none", borderRadius: 8, padding: "8px 10px", cursor: "pointer",
                          background: on ? "#e9fbf2" : "transparent", color: on ? "#047a45" : "#475569", fontSize: 13, fontWeight: on ? 800 : 500, lineHeight: 1.4, display: "flex", gap: 7 }}>
                        <span style={{ color: "#cbd5e1", fontWeight: 700, flexShrink: 0 }}>L{n.lessonNum}</span>
                        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{n.title}</span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </nav>

            {/* RIGHT: reader */}
            <div style={{ minWidth: 0 }}>
              {/* Big "English version" CTA */}
              <Link href="/core-notes" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, textDecoration: "none",
                background: "linear-gradient(135deg,#0a0a14,#1e1e2e)", color: "#fff", borderRadius: 12, padding: "16px 22px", fontSize: 15.5, fontWeight: 800, marginBottom: 16, boxShadow: "0 8px 24px rgba(10,10,20,0.2)" }}>
                🌐 영어 원문(전체 버전) 보러가기 <span aria-hidden="true">→</span>
              </Link>

              {!note ? (
                <p style={{ color: "#94a3b8", fontSize: 14 }}>이 과목의 노트가 아직 없습니다.</p>
              ) : (
                <article style={{ background: "#fff", border: "1px solid #e2e6ea", borderRadius: 14, padding: "26px 28px" }}>
                  <div style={{ display: "flex", gap: 9, alignItems: "center", flexWrap: "wrap", marginBottom: 8 }}>
                    <span style={{ fontSize: 11, fontWeight: 800, color: isKo ? "#047a45" : "#64748b", background: isKo ? "#e9fbf2" : "#f1f5f9", borderRadius: 6, padding: "2px 9px" }}>{isKo ? "🇰🇷 한국어" : "EN"}</span>
                    <span style={{ fontSize: 12.5, color: "#94a3b8", fontWeight: 600 }}>{note.emoji} {note.subjectLabel} · U{note.unit}·L{note.lessonNum}</span>
                  </div>
                  <h2 style={{ fontSize: "clamp(1.4rem,2.6vw,1.9rem)", fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 6px", lineHeight: 1.25 }}>{isKo ? (ko as KoNote).title : note.title}</h2>
                  {(isKo ? (ko as KoNote).subtitle : note.subtitle) && (
                    <p style={{ fontSize: 14.5, color: "#64748b", margin: "0 0 18px", lineHeight: 1.6 }}>{isKo ? (ko as KoNote).subtitle : note.subtitle}</p>
                  )}

                  {(isKo ? (ko as KoNote).objectives : note.objectives)?.length > 0 && (
                    <div style={{ background: "#faf7ff", border: "1px solid #efe7fe", borderRadius: 12, padding: "14px 16px", margin: "0 0 20px" }}>
                      <div style={{ fontSize: 12, fontWeight: 800, color: "#7c3aed", marginBottom: 9 }}>학습 목표</div>
                      <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 6 }}>
                        {(isKo ? (ko as KoNote).objectives : note.objectives).map((o, i) => <li key={i} style={{ fontSize: 13.5, color: "#475569", lineHeight: 1.65 }}>{o}</li>)}
                      </ul>
                    </div>
                  )}

                  {isKo && (ko as KoNote).overview && <Paragraphs text={(ko as KoNote).overview!} />}

                  {isKo
                    ? (ko as KoNote).sections.map((s, i) => (
                        <Section key={i} title={s.title} subtitle={s.subtitle}>{s.body && <Paragraphs text={s.body} />}</Section>
                      ))
                    : note.sections.map((s, i) => (
                        <Section key={i} title={s.title} subtitle={s.subtitle}>
                          {s.body && <Paragraphs text={s.body} />}
                          {s.terms && s.terms.length > 0 && (
                            <dl style={{ margin: "8px 0" }}>
                              {s.terms.map((t, k) => (
                                <div key={k} style={{ marginBottom: 8 }}>
                                  <dt style={{ fontSize: 14, fontWeight: 800, color: "#1a1a1f" }}>{t.term}</dt>
                                  <dd style={{ margin: 0, fontSize: 14, color: "#475569", lineHeight: 1.7 }}>{t.def}</dd>
                                </div>
                              ))}
                            </dl>
                          )}
                          {s.traps && s.traps.length > 0 && (
                            <div style={{ background: "#fff7ed", borderLeft: "3px solid #f97316", borderRadius: 8, padding: "10px 13px", margin: "8px 0" }}>
                              <div style={{ fontSize: 12, fontWeight: 800, color: "#c2410c", marginBottom: 5 }}>⚠️ 함정 주의</div>
                              {s.traps.map((tr, k) => <p key={k} style={{ fontSize: 13.5, color: "#7c2d12", lineHeight: 1.6, margin: "0 0 4px" }}>{tr}</p>)}
                            </div>
                          )}
                          {s.example && (
                            <div style={{ background: "#f7f8fa", borderRadius: 8, padding: "10px 13px", margin: "8px 0", fontSize: 13.5, color: "#334155", lineHeight: 1.7 }}>
                              <span style={{ fontWeight: 800, color: "#475569" }}>예시 · </span>{s.example}
                            </div>
                          )}
                        </Section>
                      ))}

                  {/* Bottom English CTA */}
                  <Link href="/core-notes" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, textDecoration: "none", marginTop: 26, color: "#1a1a1f", border: "1.5px solid #1a1a1f", borderRadius: 10, padding: "13px 22px", fontSize: 14.5, fontWeight: 800 }}>
                    🌐 영어 원문(전체 버전) 보러가기 →
                  </Link>
                </article>
              )}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 820px) {
          .cn-grid { grid-template-columns: 1fr !important; }
          .cn-rail { position: static !important; max-height: 320px; }
        }
      `}</style>
    </div>
  );
}

function Chip({ active, onClick, label, emoji, count }: { active: boolean; onClick: () => void; label: string; emoji: string; count: number }) {
  return (
    <button onClick={onClick} style={{
      display: "inline-flex", alignItems: "center", gap: 7, padding: "8px 13px", borderRadius: 999,
      border: active ? `1.5px solid ${GREEN}` : "1px solid #e2e6ea", background: active ? "#e9fbf2" : "#fff",
      color: active ? "#047a45" : "#475569", fontSize: 13, fontWeight: active ? 800 : 600, cursor: "pointer",
    }}>
      <span>{emoji} {label}</span>
      <span style={{ fontSize: 11, color: active ? "#16a34a" : "#94a3b8" }}>{count.toLocaleString()}</span>
    </button>
  );
}

function Section({ title, subtitle, children }: { title: string; subtitle?: string | null; children: React.ReactNode }) {
  return (
    <section style={{ marginTop: 22 }}>
      <h3 style={{ fontSize: 17, fontWeight: 800, color: "#1a1a1f", letterSpacing: "-0.01em", margin: "0 0 3px" }}>{title}</h3>
      {subtitle && <p style={{ fontSize: 13.5, color: "#94a3b8", margin: "0 0 9px", lineHeight: 1.5 }}>{subtitle}</p>}
      {children}
    </section>
  );
}

function Paragraphs({ text }: { text: string }) {
  return (
    <>
      {text.split(/\n\n+/).map((p, i) => (
        <p key={i} style={{ fontSize: 14.5, color: "#334155", lineHeight: 1.9, margin: "0 0 13px", whiteSpace: "pre-wrap" }}>{p}</p>
      ))}
    </>
  );
}
