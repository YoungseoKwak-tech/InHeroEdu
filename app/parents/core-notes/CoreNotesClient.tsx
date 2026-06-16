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
import CreditGate from "@/components/parents/CreditGate";
import { CREDIT_COSTS, CREDIT_EVENT } from "@/lib/credits";
import { authFetch } from "@/lib/client-auth";

const GREEN = "#00b85f";
const CN_ALL_KEY = "parents:core-notes"; // all-subjects pass for Korean core notes

interface NoteSection { title: string; subtitle?: string | null; body?: string | null; keyIdea?: string | null; table?: { headers: string[]; rows: string[][] } | null; terms?: { term: string; def: string }[]; traps?: string[]; example?: string | null; }
interface ListNote { lessonId: string; emoji: string; subjectLabel: string; unit: number | null; lessonNum: number | null; unitName?: string | null; title: string; subtitle?: string | null; objectives: string[]; sections: NoteSection[]; }
interface KoNote { title: string; subtitle?: string | null; overview?: string | null; objectives: string[]; sections: NoteSection[]; }
interface SubjectCount { courseId: string | null; label: string; emoji: string; count: number; }

export default function CoreNotesClient() {
  const [subjects, setSubjects] = useState<SubjectCount[]>([]);
  const [total, setTotal] = useState(735);
  const [active, setActive] = useState<string | null>("ap-chemistry");
  const [notes, setNotes] = useState<ListNote[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);
  const [koCache, setKoCache] = useState<Record<string, KoNote | "none">>({});
  const [view, setView] = useState<"ko" | "en" | "split">("split");
  // Bumped on credit changes (e.g. after a successful unlock) so gated content
  // is re-fetched WITH the new entitlement — the server now decides what body
  // we receive, so a client-only unlock isn't enough to reveal it.
  const [reloadTick, setReloadTick] = useState(0);

  useEffect(() => {
    const bump = () => { setReloadTick((t) => t + 1); setKoCache({}); };
    window.addEventListener(CREDIT_EVENT, bump);
    return () => window.removeEventListener(CREDIT_EVENT, bump);
  }, []);

  useEffect(() => {
    fetch("/api/core-notes?countOnly=true").then((r) => r.json())
      .then((d) => { setSubjects(d?.subjects ?? []); setTotal(d?.total ?? 735); }).catch(() => {});
  }, []);

  useEffect(() => {
    if (!active) return;
    setLoading(true); setSelected(null);
    authFetch(`/api/core-notes?subject=${encodeURIComponent(active)}`).then((r) => r.json())
      .then((d) => { const n: ListNote[] = d?.notes ?? []; setNotes(n); if (n[0]) setSelected(n[0].lessonId); })
      .catch(() => setNotes([]))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, reloadTick]);

  // Fetch the Korean version of the selected note (once). authFetch so the
  // server can apply the same per-subject unlock as the English notes.
  useEffect(() => {
    if (!selected || koCache[selected] !== undefined) return;
    authFetch(`/api/core-notes/korean?lessonId=${encodeURIComponent(selected)}`).then((r) => r.json())
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
  const isTaster = notes.length > 0 && notes[0]?.lessonId === selected;

  // Render one language column (English or Korean) for the reader / split view.
  const renderColumn = (kind: "en" | "ko") => {
    if (!note) return null;
    const meta = `${note.emoji} ${note.subjectLabel} · U${note.unit}·L${note.lessonNum}`;
    if (kind === "ko" && !isKo) {
      return (
        <div>
          <ColBadge kind="ko" meta={meta} />
          <p style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.75, marginTop: 14 }}>
            이 레슨의 한국어 일타강사 버전은 순차적으로 추가되고 있어요. 왼쪽 영어 원문을 먼저 확인하세요.
          </p>
        </div>
      );
    }
    const src = kind === "en" ? note : (ko as KoNote);
    const overview = kind === "ko" ? (ko as KoNote).overview : null;
    const sectionsEl = (src.sections ?? []).map((s, i) => (
      <Section key={i} title={s.title} subtitle={s.subtitle}><SectionBody s={s} /></Section>
    ));
    const gated = (isTaster || !active) ? sectionsEl : (
      <CreditGate
        gateKey={`${CN_ALL_KEY}:${active}`}
        cost={CREDIT_COSTS.CORE_NOTES_SUBJECT}
        bundleKey={CN_ALL_KEY}
        bundleCost={CREDIT_COSTS.ALL_SUBJECTS}
        bundleLabel="전 과목 한 번에"
        title={`${note.emoji} ${note.subjectLabel} 핵심노트 잠금해제`}
        desc={`${note.subjectLabel} 전 단원의 노트(개념·용어·함정·예시)를 볼 수 있어요. 첫 레슨은 무료 맛보기예요. (이 과목 500 · 전 과목 1,000)`}
      >{sectionsEl}</CreditGate>
    );
    return (
      <div>
        <ColBadge kind={kind} meta={meta} />
        <h2 style={{ fontSize: "clamp(1.25rem,2.2vw,1.7rem)", fontWeight: 800, letterSpacing: "-0.02em", margin: "8px 0 6px", lineHeight: 1.25 }}>{src.title}</h2>
        {src.subtitle && <p style={{ fontSize: 14, color: "#64748b", margin: "0 0 16px", lineHeight: 1.6 }}>{src.subtitle}</p>}
        {(src.objectives ?? []).length > 0 && (
          <div style={{ background: "#faf7ff", border: "1px solid #efe7fe", borderRadius: 12, padding: "13px 15px", margin: "0 0 18px" }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: "#7c3aed", marginBottom: 8 }}>학습 목표</div>
            <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 6 }}>
              {(src.objectives ?? []).map((o, i) => <li key={i} style={{ fontSize: 13.5, color: "#475569", lineHeight: 1.65 }}>{o}</li>)}
            </ul>
          </div>
        )}
        {overview && <Paragraphs text={overview} />}
        {gated}
      </div>
    );
  };

  return (
    <div style={{ position: "relative", zIndex: 10, minHeight: "100vh", background: "#eef1f4", color: "#1a1a1f", cursor: "auto", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ position: "sticky", top: 0, zIndex: 20, background: "rgba(255,255,255,0.94)", backdropFilter: "blur(8px)", borderBottom: "1px solid #e2e6ea" }}>
        <div style={{ margin: "0 auto", padding: "14px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/parents" style={{ color: "#475569", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>← 자료실</Link>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 15 }}>In<span style={{ color: GREEN }}>Hero</span> · 학부모</span>
        </div>
      </div>

      <div style={{ margin: "0 auto", padding: "32px 40px 90px" }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: "#7c3aed", marginBottom: 10 }}>📘 AP 개념정리</p>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.6rem,3.6vw,2.2rem)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 10 }}>
          아이비리그생 + 일타강사의 노하우로<br />이해하기 쉽게 풀어 쓴 AP·IB·Honors·Core 개념
        </h1>
        <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.7, marginBottom: 14 }}>
          AP는 결국 <strong>영어로 시험</strong>을 봅니다. 영어 원문을 파고들기 전, <strong>한국어로 큰 흐름부터 잡는 게 가장 중요</strong>해요.
          그 흐름을 잡아주는, 아이비리그생과 일타강사의 노하우가 담긴 한국어 개념정리입니다.
        </p>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#faf7ff", border: "1px solid #efe7fe", borderRadius: 999, padding: "7px 14px", marginBottom: 18 }}>
          <span style={{ fontSize: 13, fontWeight: 800, color: "#7c3aed" }}>🇰🇷 한국어로 흐름 잡기</span>
          <span style={{ fontSize: 12, color: "#cbd5e1" }}>→</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: "#475569" }}>🌐 영어 원문으로 정복</span>
          <span style={{ fontSize: 12, color: "#cbd5e1" }}>·</span>
          <span style={{ fontSize: 12.5, color: "#94a3b8" }}>전 18과목 {total.toLocaleString()}개</span>
        </div>
        <p style={{ fontSize: 13.5, color: "#94a3b8", lineHeight: 1.7, marginBottom: 18 }}>
          과목을 고르고 왼쪽에서 단원별로 골라 읽어보세요.
        </p>

        <div style={{ marginBottom: 22 }}>
          {[
            { key: "ap", label: "AP 과정", items: subjects.filter((s) => { const c = s.courseId ?? ""; return !c.startsWith("ib-") && !c.startsWith("honors-"); }) },
            { key: "ib", label: "IB Diploma", items: subjects.filter((s) => (s.courseId ?? "").startsWith("ib-")) },
            { key: "honors", label: "Honors (9–12학년)", items: subjects.filter((s) => (s.courseId ?? "").startsWith("honors-")) },
          ].filter((g) => g.items.length > 0).map((g) => (
            <div key={g.key} style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11.5, fontWeight: 800, color: "#94a3b8", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 9 }}>
                {g.label} <span style={{ color: "#cbd5e1" }}>· {g.items.length}과목</span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {g.items.map((s) => (
                  <Chip key={s.courseId ?? s.label} active={active === s.courseId} onClick={() => setActive(s.courseId)} label={s.label} emoji={s.emoji} count={s.count} />
                ))}
              </div>
            </div>
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
                <>
                  <ViewToggle view={view} onChange={setView} />
                  {view === "split" ? (
                    <div className="cn-split" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, alignItems: "start" }}>
                      <article style={cardStyle}>{renderColumn("en")}</article>
                      <article style={cardStyle}>{renderColumn("ko")}</article>
                    </div>
                  ) : (
                    <article style={cardStyle}>{renderColumn(view)}</article>
                  )}

                  <Link href="/core-notes" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, textDecoration: "none", marginTop: 18, color: "#1a1a1f", border: "1.5px solid #1a1a1f", borderRadius: 10, padding: "13px 22px", fontSize: 14.5, fontWeight: 800 }}>
                    🌐 영어 원문(전체 버전) 보러가기 →
                  </Link>
                </>
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
        @media (max-width: 980px) {
          .cn-split { grid-template-columns: 1fr !important; }
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

const cardStyle: React.CSSProperties = { background: "#fff", border: "1px solid #e2e6ea", borderRadius: 14, padding: "22px 22px", minWidth: 0 };

function ViewToggle({ view, onChange }: { view: "ko" | "en" | "split"; onChange: (v: "ko" | "en" | "split") => void }) {
  const opts: { v: "split" | "en" | "ko"; label: string }[] = [
    { v: "split", label: "📖 영어 + 한국어" },
    { v: "en", label: "🇺🇸 영어" },
    { v: "ko", label: "🇰🇷 한국어" },
  ];
  return (
    <div style={{ display: "inline-flex", gap: 4, background: "#fff", border: "1px solid #e2e6ea", borderRadius: 999, padding: 4, marginBottom: 14 }}>
      {opts.map((o) => {
        const on = o.v === view;
        return (
          <button key={o.v} onClick={() => onChange(o.v)}
            style={{ border: "none", borderRadius: 999, padding: "7px 14px", fontSize: 13, fontWeight: 800, cursor: "pointer", background: on ? GREEN : "transparent", color: on ? "#fff" : "#475569" }}>
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

function ColBadge({ kind, meta }: { kind: "en" | "ko"; meta: string }) {
  const ko = kind === "ko";
  return (
    <div style={{ display: "flex", gap: 9, alignItems: "center", flexWrap: "wrap", marginBottom: 4 }}>
      <span style={{ fontSize: 11, fontWeight: 800, color: ko ? "#047a45" : "#1d4ed8", background: ko ? "#e9fbf2" : "#eff4ff", borderRadius: 6, padding: "2px 9px" }}>{ko ? "🇰🇷 한국어" : "🇺🇸 EN"}</span>
      <span style={{ fontSize: 12.5, color: "#94a3b8", fontWeight: 600 }}>{meta}</span>
    </div>
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

// Renders the full body of a section (Korean or English): body prose, key idea,
// table, term definitions, exam traps, and example. Both language views use this
// so the Korean view shows its terms/traps/examples (not just the body).
function SectionBody({ s }: { s: NoteSection }) {
  return (
    <>
      {s.body && <Paragraphs text={s.body} />}
      {s.keyIdea && (
        <div style={{ background: "#eef2ff", borderLeft: "3px solid #7c3aed", borderRadius: 8, padding: "10px 13px", margin: "8px 0" }}>
          <span style={{ fontSize: 12, fontWeight: 800, color: "#5b21b6" }}>💡 핵심 · </span>
          <span style={{ fontSize: 13.5, color: "#3730a3", lineHeight: 1.7 }}>{s.keyIdea}</span>
        </div>
      )}
      {s.table && s.table.headers && s.table.headers.length > 0 && (
        <div style={{ overflowX: "auto", margin: "10px 0" }}>
          <table style={{ borderCollapse: "collapse", width: "100%", fontSize: 13 }}>
            <thead>
              <tr>{s.table.headers.map((h, k) => (
                <th key={k} style={{ textAlign: "left", padding: "7px 10px", background: "#f1f5f9", color: "#1a1a1f", fontWeight: 800, border: "1px solid #e2e8f0" }}>{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {s.table.rows.map((row, r) => (
                <tr key={r}>{row.map((cell, c) => (
                  <td key={c} style={{ padding: "7px 10px", color: "#334155", border: "1px solid #e2e8f0", lineHeight: 1.6 }}>{cell}</td>
                ))}</tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
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
    </>
  );
}
