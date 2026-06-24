"use client";

/**
 * /parents/program — Ivy League Operating System landing.
 * A transformation-program overview (seasons → deliverables → capstone) plus
 * the Researcher OS signature track. Public/info page (no gating) — it sells
 * the program; signup CTA routes to the mentor channel.
 */

import { useState } from "react";
import Link from "next/link";
import {
  ILOS_META, ILOS_SEASONS, ILOS_CAPSTONE, ILOS_BUILD_WEEK, RESEARCHER_OS, type Season,
} from "@/lib/data/ivyOsProgram";

const GREEN = "#00b85f";
const INK = "#0b1220";
const INDIGO = "#4c1d95";

export default function ProgramClient() {
  const [open, setOpen] = useState<number | null>(1);

  return (
    <div style={{ background: "#f7f8fa", minHeight: "100vh", color: "#1a1a1f" }}>
      {/* Top bar */}
      <div style={{ position: "sticky", top: 0, zIndex: 20, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(8px)", borderBottom: "1px solid #e6e8ec" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/parents" style={{ color: "#475569", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>← 자료실</Link>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 15 }}>In<span style={{ color: GREEN }}>Hero</span> · 학부모</span>
        </div>
      </div>

      {/* Hero */}
      <div style={{ background: `linear-gradient(135deg, ${INK}, #1b1340 55%, ${INDIGO})`, color: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 20px 48px" }}>
          <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.18em", color: "#a78bfa", marginBottom: 14 }}>INHERO SIGNATURE PROGRAM</div>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 5vw, 3.4rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.08, margin: 0 }}>
            {ILOS_META.title}
          </h1>
          <p style={{ fontSize: "clamp(1rem,2vw,1.3rem)", color: "rgba(255,255,255,0.82)", marginTop: 16, lineHeight: 1.6, maxWidth: 760 }}>{ILOS_META.subtitle}</p>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.62)", marginTop: 14, lineHeight: 1.75, maxWidth: 760 }}>{ILOS_META.pitch}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 22 }}>
            {ILOS_META.stats.map((s) => (
              <span key={s} style={{ fontSize: 13, fontWeight: 700, color: "#fff", background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 999, padding: "7px 14px" }}>{s}</span>
            ))}
          </div>
          {/* The loop */}
          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 8, marginTop: 26 }}>
            {ILOS_META.loop.map((step, i, a) => (
              <span key={step} style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 800, color: "#03120c", background: GREEN, borderRadius: 8, padding: "6px 12px" }}>{step}</span>
                {i < a.length - 1 && <span style={{ color: "rgba(255,255,255,0.4)" }}>→</span>}
              </span>
            ))}
          </div>
          <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.5)", marginTop: 12 }}>강의를 듣는 게 아니라, 매 강의마다 실제 결과물이 남습니다.</p>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 20px 100px" }}>
        {/* "유튜브에서 못 본다" — real proof */}
        <section style={{ background: "#fff", border: "1px solid #e6e8ec", borderRadius: 16, padding: "22px 24px", marginBottom: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 4 }}>📂 매 강의 70%+ 가 이론이 아니라 <span style={{ color: GREEN }}>실물</span>입니다</div>
          <p style={{ fontSize: 13.5, color: "#64748b", margin: "0 0 14px", lineHeight: 1.6 }}>"이건 유튜브에서 못 본다" — 코넬 공대생이 실제로 쓴 자료를 그대로 공개합니다.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {ILOS_META.realProof.map((r) => (
              <span key={r} style={{ fontSize: 12.5, fontWeight: 600, color: INDIGO, background: "#f5f3ff", border: "1px solid #e0d7fb", borderRadius: 8, padding: "6px 11px" }}>{r}</span>
            ))}
          </div>
        </section>

        {/* Audience */}
        <p style={{ fontSize: 13, color: "#94a3b8", margin: "0 0 24px", lineHeight: 1.7 }}>
          <b style={{ color: "#475569" }}>대상</b> · {ILOS_META.audience.join(" · ")}
        </p>

        {/* Seasons */}
        <h2 style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 16px" }}>6개 시즌 — 인간 성장 순서를 그대로 따라갑니다</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {ILOS_SEASONS.map((s) => <SeasonCard key={s.n} s={s} isOpen={open === s.n} onToggle={() => setOpen(open === s.n ? null : s.n)} />)}
        </div>

        {/* Capstone */}
        <section style={{ background: `linear-gradient(135deg, ${INK}, #16233c)`, color: "#fff", borderRadius: 18, padding: "28px 26px", marginTop: 28 }}>
          <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.14em", color: GREEN, marginBottom: 8 }}>🏁 CAPSTONE</div>
          <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>학생이 손에 쥐고 졸업하는 것</div>
          <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.62)", margin: "0 0 16px" }}>"좋은 대학에 합격하는 학생"이 아니라 "어디를 가도 스스로 성장하는 학생".</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px,1fr))", gap: 8 }}>
            {ILOS_CAPSTONE.map((c, i) => (
              <div key={c} style={{ fontSize: 13, fontWeight: 600, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "10px 12px" }}>
                <span style={{ color: GREEN, fontWeight: 800, marginRight: 6 }}>{i + 1}</span>{c}
              </div>
            ))}
          </div>
        </section>

        {/* Build Week */}
        <section style={{ background: "linear-gradient(135deg,#fff7ed,#fff)", border: "1.5px solid #fed7aa", borderRadius: 16, padding: "22px 24px", marginTop: 16 }}>
          <div style={{ fontSize: 15.5, fontWeight: 800, color: "#c2410c", marginBottom: 6 }}>⚡ {ILOS_BUILD_WEEK.title}</div>
          <p style={{ fontSize: 13.5, color: "#7c2d12", margin: 0, lineHeight: 1.7 }}>{ILOS_BUILD_WEEK.body}</p>
        </section>

        {/* Researcher OS */}
        <section style={{ marginTop: 40 }}>
          <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.16em", color: INDIGO, marginBottom: 8 }}>INHERO SIGNATURE SERIES · 별도 트랙</div>
          <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 6px" }}>🔬 {RESEARCHER_OS.title}</h2>
          <p style={{ fontSize: 15, color: "#475569", margin: "0 0 6px", lineHeight: 1.6 }}>{RESEARCHER_OS.subtitle}</p>
          <p style={{ fontSize: 13.5, color: "#94a3b8", margin: "0 0 18px", lineHeight: 1.7 }}>한 편의 논문이 아니라 <b style={{ color: "#475569" }}>평생 연구할 수 있는 인간</b>을 만듭니다. (대필 컨설팅과 정반대)</p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }} className="ros-grid">
            <div style={{ background: "#fff", border: "1px solid #e6e8ec", borderRadius: 14, padding: "16px 18px" }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: "#dc2626", marginBottom: 10 }}>BEFORE</div>
              {RESEARCHER_OS.before.map((b) => <div key={b} style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.9 }}>· {b}</div>)}
            </div>
            <div style={{ background: "#f0fdf6", border: `1px solid ${GREEN}44`, borderRadius: 14, padding: "16px 18px" }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: "#047857", marginBottom: 10 }}>AFTER</div>
              <div style={{ fontSize: 13, color: "#1f5138", lineHeight: 1.9 }}>{RESEARCHER_OS.after.join(" → ")}</div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px,1fr))", gap: 10, marginBottom: 14 }}>
            {RESEARCHER_OS.phases.map((p) => (
              <div key={p.n} style={{ background: "#fff", border: "1px solid #e6e8ec", borderRadius: 12, padding: "14px 16px" }}>
                <div style={{ fontSize: 11.5, fontWeight: 800, color: INDIGO, letterSpacing: "0.04em" }}>PHASE {p.n} · {p.weeks}</div>
                <div style={{ fontSize: 14.5, fontWeight: 800, margin: "4px 0 6px" }}>{p.title}</div>
                {p.deliverable && <div style={{ fontSize: 12, fontWeight: 700, color: "#047857", background: "#e9fbf2", borderRadius: 6, padding: "3px 8px", display: "inline-block" }}>→ {p.deliverable}</div>}
              </div>
            ))}
          </div>
          <p style={{ fontSize: 12.5, color: "#92591a", background: "#fffbeb", border: "1px solid #f1d27a", borderRadius: 10, padding: "12px 14px", lineHeight: 1.65 }}>
            ⚖️ {RESEARCHER_OS.ethics}
          </p>
        </section>

        {/* CTA */}
        <section style={{ textAlign: "center", marginTop: 44, paddingTop: 36, borderTop: "1px solid #e6e8ec" }}>
          <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>이 프로그램, 코넬 공대 멘토에게 직접 물어보세요</div>
          <p style={{ fontSize: 14, color: "#64748b", marginBottom: 18 }}>강의 공개 일정·수강 방식은 멘토 채널에서 안내드립니다.</p>
          <a href="http://pf.kakao.com/_ZchdX/chat" target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-block", background: "#fee500", color: "#191600", borderRadius: 10, padding: "14px 28px", fontWeight: 800, fontSize: 14.5, textDecoration: "none" }}>
            💬 카카오톡으로 문의하기 →
          </a>
        </section>
      </div>

      <style>{`@media (max-width: 640px){ .ros-grid{ grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}

function SeasonCard({ s, isOpen, onToggle }: { s: Season; isOpen: boolean; onToggle: () => void }) {
  return (
    <article style={{ background: "#fff", border: isOpen ? `1.5px solid ${INDIGO}` : "1px solid #e6e8ec", borderRadius: 16, overflow: "hidden", boxShadow: isOpen ? "0 10px 28px rgba(76,29,149,0.10)" : "0 1px 2px rgba(16,24,40,0.04)" }}>
      <button onClick={onToggle} aria-expanded={isOpen} style={{ width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", padding: "20px 22px", display: "block" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          <span style={{ fontSize: 26 }}>{s.emoji}</span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 11.5, fontWeight: 800, color: "#a78bfa", letterSpacing: "0.06em" }}>SEASON {s.n} · {s.code}</div>
            <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: "-0.01em" }}>{s.title}</div>
            <div style={{ fontSize: 13, color: "#64748b", marginTop: 2 }}>{s.goal}</div>
          </div>
          <span style={{ fontSize: 20, color: "#94a3b8", transform: isOpen ? "rotate(90deg)" : "none", transition: "transform 180ms" }}>›</span>
        </div>
        <div style={{ marginTop: 12, display: "inline-flex", alignItems: "center", gap: 8, background: "#f0fdf6", border: `1px solid ${GREEN}44`, borderRadius: 10, padding: "8px 13px" }}>
          <span style={{ fontSize: 11, fontWeight: 800, color: "#047857" }}>시즌 결과물</span>
          <span style={{ fontSize: 12.5, fontWeight: 700, color: "#1f5138", lineHeight: 1.4 }}>{s.deliverable}</span>
        </div>
      </button>

      {isOpen && (
        <div style={{ padding: "0 22px 22px", borderTop: "1px solid #f1f3f5" }}>
          {s.modules.map((m) => (
            <div key={m.title} style={{ marginTop: 16 }}>
              <div style={{ fontSize: 13.5, fontWeight: 800, color: INDIGO, marginBottom: 8 }}>{m.title}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {m.lessons.map((l) => (
                  <div key={l.n} style={{ display: "flex", gap: 10, alignItems: "baseline", fontSize: 13.5, color: "#334155", lineHeight: 1.5 }}>
                    <span style={{ flexShrink: 0, fontSize: 11.5, fontWeight: 800, color: "#cbd5e1", fontFamily: "'JetBrains Mono', monospace", minWidth: 30 }}>{String(l.n).padStart(2, "0")}</span>
                    <span><b style={{ color: "#1a1a1f", fontWeight: 700 }}>{l.title}</b>{l.note && <span style={{ color: "#94a3b8" }}> — {l.note}</span>}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}
