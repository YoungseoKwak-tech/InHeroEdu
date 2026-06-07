"use client";

/**
 * /parents/core-notes — WHITE core-notes reader for the parent portal.
 *
 * The cosmic /core-notes stays as-is; this pulls the SAME data
 * (/api/core-notes) into a white, blog-style reader. Korean 일타강사 notes are
 * shown where ready (AP Chemistry is complete); other subjects show the English
 * note with a "한국어 준비 중" badge. Defaults to AP Chemistry so parents see the
 * Korean killer content immediately.
 */

import { useEffect, useState } from "react";
import Link from "next/link";

const GREEN = "#00b85f";

interface EnSection { title: string; subtitle?: string | null; body?: string | null; keyIdea?: string | null; terms?: { term: string; def: string }[]; traps?: string[]; example?: string | null; }
interface ListNote { lessonId: string; emoji: string; subjectLabel: string; unit: number | null; lessonNum: number | null; unitName?: string | null; title: string; subtitle?: string | null; objectives: string[]; sections: EnSection[]; }
interface KoSection { title: string; subtitle?: string | null; body?: string | null; }
interface KoNote { title: string; subtitle?: string | null; overview?: string | null; objectives: string[]; sections: KoSection[]; }
interface SubjectCount { courseId: string | null; label: string; emoji: string; count: number; }

export default function CoreNotesClient() {
  const [subjects, setSubjects] = useState<SubjectCount[]>([]);
  const [total, setTotal] = useState(0);
  const [active, setActive] = useState<string | null>("ap-chemistry");
  const [notes, setNotes] = useState<ListNote[]>([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/core-notes?countOnly=true").then((r) => r.json())
      .then((d) => { setSubjects(d?.subjects ?? []); setTotal(d?.total ?? 0); }).catch(() => {});
  }, []);

  useEffect(() => {
    if (!active) return;
    setLoading(true); setOpenId(null);
    fetch(`/api/core-notes?subject=${encodeURIComponent(active)}`).then((r) => r.json())
      .then((d) => {
        const n: ListNote[] = d?.notes ?? [];
        setNotes(n);
        if (n[0]) setOpenId(n[0].lessonId); // auto-open the first note
      })
      .catch(() => setNotes([]))
      .finally(() => setLoading(false));
  }, [active]);

  return (
    <div style={{ position: "relative", zIndex: 10, minHeight: "100vh", background: "#eef1f4", color: "#1a1a1f", cursor: "auto", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ position: "sticky", top: 0, zIndex: 20, background: "rgba(255,255,255,0.94)", backdropFilter: "blur(8px)", borderBottom: "1px solid #e2e6ea" }}>
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/parents" style={{ color: "#475569", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>← 자료실</Link>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 15 }}>In<span style={{ color: GREEN }}>Hero</span> · 학부모</span>
        </div>
      </div>

      <div style={{ maxWidth: 820, margin: "0 auto", padding: "36px 20px 90px" }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: "#7c3aed", marginBottom: 10 }}>📘 핵심 노트</p>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.7rem,4vw,2.4rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 12 }}>
          {total.toLocaleString()}개 AP 핵심 노트, 일타강사처럼
        </h1>
        <p style={{ fontSize: 14.5, color: "#475569", lineHeight: 1.75, marginBottom: 22 }}>
          개념을 한눈에 이해되게 풀어낸 AP 핵심 노트입니다. AP Chemistry는 한국어로 완성되어 있고, 다른 과목도 순차적으로 한국어화 중입니다.
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
          {subjects.map((s) => (
            <Chip key={s.courseId ?? s.label} active={active === s.courseId} onClick={() => setActive(s.courseId)} label={s.label} emoji={s.emoji} count={s.count} />
          ))}
        </div>

        {loading ? (
          <p style={{ color: "#94a3b8", fontSize: 14, padding: "30px 0", textAlign: "center" }}>노트를 불러오는 중…</p>
        ) : notes.length === 0 ? (
          <p style={{ color: "#94a3b8", fontSize: 14 }}>이 과목의 노트가 아직 없습니다.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {notes.map((n) => (
              <NoteAccordion key={n.lessonId} note={n} open={openId === n.lessonId} onToggle={() => setOpenId(openId === n.lessonId ? null : n.lessonId)} />
            ))}
          </div>
        )}
      </div>
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

function NoteAccordion({ note, open, onToggle }: { note: ListNote; open: boolean; onToggle: () => void }) {
  const [ko, setKo] = useState<KoNote | null>(null);
  const [koState, setKoState] = useState<"idle" | "loading" | "ready" | "none">("idle");

  useEffect(() => {
    if (!open || koState !== "idle") return;
    setKoState("loading");
    fetch(`/api/core-notes/korean?lessonId=${encodeURIComponent(note.lessonId)}`)
      .then((r) => r.json())
      .then((d) => { if (d?.note) { setKo(d.note); setKoState("ready"); } else setKoState("none"); })
      .catch(() => setKoState("none"));
  }, [open, koState, note.lessonId]);

  const isKo = koState === "ready" && ko;
  const title = isKo ? ko!.title : note.title;
  const subtitle = isKo ? ko!.subtitle : note.subtitle;
  const objectives = isKo ? ko!.objectives : note.objectives;

  return (
    <article style={{ background: "#fff", border: "1px solid #e2e6ea", borderRadius: 14, overflow: "hidden", boxShadow: "0 1px 2px rgba(16,24,40,0.04)" }}>
      <button onClick={onToggle} style={{ width: "100%", textAlign: "left", background: "none", border: "none", padding: "16px 20px", cursor: "pointer", display: "flex", gap: 12, alignItems: "center" }}>
        <span style={{ fontSize: 11, fontWeight: 800, color: "#94a3b8", minWidth: 56 }}>U{note.unit ?? "?"}·L{note.lessonNum ?? "?"}</span>
        <span style={{ flex: 1, minWidth: 0 }}>
          <span style={{ fontSize: 15.5, fontWeight: 700, color: "#1a1a1f" }}>{title}</span>
          {subtitle && <span style={{ display: "block", fontSize: 12.5, color: "#94a3b8", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: open ? "normal" : "nowrap" }}>{subtitle}</span>}
        </span>
        <span style={{ fontSize: 10, fontWeight: 800, color: isKo ? "#047a45" : "#94a3b8", background: isKo ? "#e9fbf2" : "#f1f5f9", borderRadius: 5, padding: "2px 7px", whiteSpace: "nowrap" }}>
          {isKo ? "🇰🇷 한국어" : koState === "loading" ? "…" : "EN"}
        </span>
        <span style={{ color: "#cbd5e1", fontSize: 16 }}>{open ? "▾" : "▸"}</span>
      </button>

      {open && (
        <div style={{ padding: "4px 20px 22px", borderTop: "1px solid #f1f3f5" }}>
          {objectives?.length > 0 && (
            <div style={{ background: "#faf7ff", border: "1px solid #efe7fe", borderRadius: 10, padding: "12px 14px", margin: "14px 0" }}>
              <div style={{ fontSize: 11.5, fontWeight: 800, color: "#7c3aed", marginBottom: 8 }}>학습 목표</div>
              <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 5 }}>
                {objectives.map((o, i) => <li key={i} style={{ fontSize: 13, color: "#475569", lineHeight: 1.6 }}>{o}</li>)}
              </ul>
            </div>
          )}

          {isKo && ko!.overview && <Paragraphs text={ko!.overview} />}

          {isKo
            ? ko!.sections.map((s, i) => (
                <Section key={i} title={s.title} subtitle={s.subtitle}>
                  {s.body && <Paragraphs text={s.body} />}
                </Section>
              ))
            : note.sections.map((s, i) => (
                <Section key={i} title={s.title} subtitle={s.subtitle}>
                  {s.body && <Paragraphs text={s.body} />}
                  {s.terms && s.terms.length > 0 && (
                    <dl style={{ margin: "8px 0" }}>
                      {s.terms.map((t, k) => (
                        <div key={k} style={{ marginBottom: 8 }}>
                          <dt style={{ fontSize: 13.5, fontWeight: 800, color: "#1a1a1f" }}>{t.term}</dt>
                          <dd style={{ margin: 0, fontSize: 13.5, color: "#475569", lineHeight: 1.65 }}>{t.def}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                  {s.traps && s.traps.length > 0 && (
                    <div style={{ background: "#fff7ed", borderLeft: "3px solid #f97316", borderRadius: 8, padding: "10px 13px", margin: "8px 0" }}>
                      <div style={{ fontSize: 11.5, fontWeight: 800, color: "#c2410c", marginBottom: 5 }}>⚠️ 함정 주의</div>
                      {s.traps.map((tr, k) => <p key={k} style={{ fontSize: 13, color: "#7c2d12", lineHeight: 1.6, margin: "0 0 4px" }}>{tr}</p>)}
                    </div>
                  )}
                  {s.example && (
                    <div style={{ background: "#f7f8fa", borderRadius: 8, padding: "10px 13px", margin: "8px 0", fontSize: 13, color: "#334155", lineHeight: 1.65 }}>
                      <span style={{ fontWeight: 800, color: "#475569" }}>예시 · </span>{s.example}
                    </div>
                  )}
                </Section>
              ))}
        </div>
      )}
    </article>
  );
}

function Section({ title, subtitle, children }: { title: string; subtitle?: string | null; children: React.ReactNode }) {
  return (
    <section style={{ marginTop: 18 }}>
      <h3 style={{ fontSize: 16, fontWeight: 800, color: "#1a1a1f", letterSpacing: "-0.01em", margin: "0 0 3px" }}>{title}</h3>
      {subtitle && <p style={{ fontSize: 13, color: "#94a3b8", margin: "0 0 8px", lineHeight: 1.5 }}>{subtitle}</p>}
      {children}
    </section>
  );
}

function Paragraphs({ text }: { text: string }) {
  return (
    <>
      {text.split(/\n\n+/).map((p, i) => (
        <p key={i} style={{ fontSize: 14, color: "#334155", lineHeight: 1.85, margin: "0 0 12px", whiteSpace: "pre-wrap" }}>{p}</p>
      ))}
    </>
  );
}
