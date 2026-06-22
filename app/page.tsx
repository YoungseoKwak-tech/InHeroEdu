"use client";

/**
 * inheroedu.com homepage — the English, global landing.
 *
 * Premium, scannable portal (like /parents): a compact hero with a premium
 * "Ivy League engineer" label, then EVERY feature as a clickable tile right on
 * the first screen — wide layout, minimal side margins.
 */

import Link from "next/link";

const INK = "#0b1220";
const SUB = "#5b6675";
const GREEN = "#00b85f";
const MAXW = 1340;

type Tile = { emoji: string; tag: string; title: string; desc: string; href: string; accent: string };

const TILES: Tile[] = [
  { emoji: "🖥️", tag: "DIGITAL SAT", title: "SAT Practice Test", desc: "Bluebook-style adaptive full test — modules, Desmos, 400–1600 score.", href: "/sat", accent: "#1f6feb" },
  { emoji: "📝", tag: "AP MOCK EXAMS", title: "AP Question Bank", desc: "170,000+ College-Board-style questions with instant grading & explanations.", href: "/question-bank", accent: "#7c3aed" },
  { emoji: "🌍", tag: "IB PRACTICE", title: "IB Paper-Style Sets", desc: "Paper 1 / 2 / 3-style problems across IB subjects (HL & SL).", href: "/mock-exams", accent: "#0e9f6e" },
  { emoji: "🎧", tag: "TOEFL iBT", title: "TOEFL Practice Test", desc: "All four sections in real format — audio, recording, rubric scoring.", href: "/toefl", accent: "#f59e0b" },
  { emoji: "📒", tag: "AP CORE NOTES", title: "One Screen, One Concept", desc: "Each AP unit distilled to exactly what to remember in the exam room.", href: "/core-notes", accent: "#dc2680" },
  { emoji: "📚", tag: "INHERO ORIGINALS", title: "Digital Textbooks", desc: "Original AP textbooks — exam alerts, FRQ/MCQ walkthroughs, deep-dives.", href: "/library", accent: "#0ea5e9" },
  { emoji: "🗂️", tag: "VOCAB", title: "High-Yield Vocab", desc: "Spaced-repetition decks for SAT & AP — the words that actually appear.", href: "/vocab", accent: "#0d9488" },
  { emoji: "🏆", tag: "MOCK EXAMS", title: "Full Mock Exams", desc: "Real-format, full-length SAT · AP · IB · TOEFL practice in one place.", href: "/mock-exams", accent: "#e11d48" },
];

const STATS = [
  { n: "170K+", label: "Practice questions" },
  { n: "SAT · AP · IB · TOEFL", label: "Real-format exams" },
  { n: "AP", label: "Core Notes, distilled" },
];

export default function HomePage() {
  return (
    <div style={{ position: "relative", zIndex: 10, background: "#ffffff", color: INK, fontFamily: "'Inter', -apple-system, sans-serif", minHeight: "100vh" }}>
      {/* ── Hero (compact) ─────────────────────────────────────── */}
      <section style={{ background: "linear-gradient(180deg,#f6f8fb 0%, #ffffff 100%)", borderBottom: "1px solid #eef1f5" }}>
        <div style={{ maxWidth: MAXW, margin: "0 auto", padding: "30px 28px 30px", textAlign: "center" }}>
          {/* Premium label */}
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "linear-gradient(135deg,#0b1220,#1c2941)", color: "#fff", borderRadius: 999, padding: "7px 16px", fontSize: 12.5, fontWeight: 800, letterSpacing: "0.03em", boxShadow: "0 6px 18px rgba(11,18,32,0.2)" }}>
            <span style={{ color: "#ffd86b" }}>✦</span> Built by an Ivy League engineer
          </span>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.9rem,4.6vw,3.2rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.08, margin: "16px 0 0" }}>
            Master the SAT, AP, IB &amp; TOEFL — for real.
          </h1>
          <p style={{ fontSize: "clamp(14.5px,1.6vw,17px)", color: SUB, lineHeight: 1.65, maxWidth: 720, margin: "14px auto 0" }}>
            Full-length, real-format practice exams · a 170,000-question AP bank · concept-focused Core Notes. One premium platform — pick any tool below and start now.
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginTop: 20 }}>
            <Link href="/sat" style={{ background: INK, color: "#fff", textDecoration: "none", borderRadius: 12, padding: "13px 26px", fontWeight: 800, fontSize: 15, boxShadow: "0 10px 26px rgba(11,18,32,0.22)" }}>
              Try a free practice test →
            </Link>
            <Link href="/pricing" style={{ background: "#fff", color: INK, textDecoration: "none", border: "1.5px solid #d8dee6", borderRadius: 12, padding: "13px 24px", fontWeight: 800, fontSize: 15 }}>
              See plans
            </Link>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, color: GREEN, fontWeight: 700, fontSize: 13, alignSelf: "center" }}>
              ● Real-format · AI study tools
            </span>
          </div>
        </div>
      </section>

      {/* ── Feature tiles — every tool, clickable on the first screen ── */}
      <section style={{ maxWidth: MAXW, margin: "0 auto", padding: "26px 28px 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
          {TILES.map((t) => (
            <Link key={t.title} href={t.href}
              style={{ textDecoration: "none", color: INK, background: "#fff", border: "1px solid #e8ecf1", borderRadius: 16, padding: "18px 18px", display: "flex", flexDirection: "column", boxShadow: "0 1px 2px rgba(16,24,40,0.04)", transition: "transform 160ms, box-shadow 200ms, border-color 160ms" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 16px 34px rgba(16,24,40,0.12)"; e.currentTarget.style.borderColor = `${t.accent}55`; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 1px 2px rgba(16,24,40,0.04)"; e.currentTarget.style.borderColor = "#e8ecf1"; }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span style={{ fontSize: 22, width: 40, height: 40, borderRadius: 11, display: "flex", alignItems: "center", justifyContent: "center", background: `${t.accent}14`, flexShrink: 0 }}>{t.emoji}</span>
                <span style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: "0.05em", color: t.accent, background: `${t.accent}12`, borderRadius: 6, padding: "3px 8px" }}>{t.tag}</span>
              </div>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 17, fontWeight: 800, letterSpacing: "-0.01em", margin: "0 0 5px" }}>{t.title}</h3>
              <p style={{ fontSize: 13, color: SUB, lineHeight: 1.55, margin: 0, flex: 1 }}>{t.desc}</p>
              <span style={{ marginTop: 12, fontSize: 13, fontWeight: 800, color: t.accent }}>Open →</span>
            </Link>
          ))}
        </div>

        {/* stat strip */}
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 22 }}>
          {STATS.map((s) => (
            <div key={s.label} style={{ background: "#fff", border: "1px solid #eef1f5", borderRadius: 12, padding: "11px 20px", minWidth: 140, textAlign: "center", boxShadow: "0 1px 2px rgba(16,24,40,0.04)" }}>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 17, fontWeight: 800, color: INK }}>{s.n}</div>
              <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2, fontWeight: 600 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Spotlight: Core Notes ──────────────────────────────── */}
      <section style={{ maxWidth: MAXW, margin: "0 auto", padding: "30px 28px 8px" }}>
        <div className="home-spotlight" style={{ background: "linear-gradient(135deg,#0b1220,#16233b)", color: "#fff", borderRadius: 22, padding: "clamp(26px,4vw,44px)", display: "grid", gridTemplateColumns: "minmax(0,1.4fr) minmax(0,1fr)", gap: 28, alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 12.5, fontWeight: 800, letterSpacing: "0.06em", color: "#5fe0a0", marginBottom: 12 }}>📒 AP CORE NOTES</div>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.6rem,3.4vw,2.3rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.2, margin: "0 0 14px" }}>
              One screen. One concept.
            </h2>
            <p style={{ fontSize: 15.5, color: "rgba(255,255,255,0.78)", lineHeight: 1.75, margin: "0 0 22px", maxWidth: 560 }}>
              Every AP unit, distilled to exactly what to remember in the exam room — the key idea,
              the formula, the worked example, and the traps that cost points. No fluff, no
              page-flipping.
            </p>
            <Link href="/core-notes" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: GREEN, color: "#fff", textDecoration: "none", borderRadius: 12, padding: "13px 26px", fontWeight: 800, fontSize: 15 }}>
              Explore Core Notes →
            </Link>
          </div>
          <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 16, padding: "20px 20px" }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: "#5fe0a0", background: "rgba(0,184,95,0.14)", borderRadius: 6, padding: "2px 8px", display: "inline-block", marginBottom: 10 }}>REMEMBER</div>
            <div style={{ fontSize: 12, color: "#9fb0c0", fontWeight: 700, marginBottom: 8 }}>Cellular Respiration · key idea</div>
            <p style={{ fontSize: 14.5, color: "#e7eef6", lineHeight: 1.65, margin: "0 0 14px" }}>
              The electron transport chain pumps H⁺ across the inner membrane, building the gradient that drives ATP synthase.
            </p>
            <div style={{ height: 1, background: "rgba(255,255,255,0.1)", margin: "0 0 12px" }} />
            <p style={{ fontSize: 13, color: "#ff9a9a", lineHeight: 1.6, margin: 0 }}>
              ⚠ Trap: oxygen is the <em>final</em> electron acceptor — it doesn&apos;t power the pumps directly.
            </p>
          </div>
        </div>
      </section>

      {/* ── Final CTA ──────────────────────────────────────────── */}
      <section style={{ maxWidth: MAXW, margin: "0 auto", padding: "44px 28px 80px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.6rem,3.4vw,2.3rem)", fontWeight: 800, letterSpacing: "-0.02em", margin: 0 }}>
          Start free. Upgrade when you&apos;re ready.
        </h2>
        <p style={{ fontSize: 15.5, color: SUB, margin: "12px 0 24px" }}>Try a full practice test and the question bank — no card required.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/sat" style={{ background: GREEN, color: "#fff", textDecoration: "none", borderRadius: 12, padding: "15px 32px", fontWeight: 800, fontSize: 15.5, boxShadow: "0 10px 26px rgba(0,184,95,0.3)" }}>
            Try a free practice test →
          </Link>
          <Link href="/pricing" style={{ background: "#fff", color: INK, textDecoration: "none", border: "1.5px solid #d8dee6", borderRadius: 12, padding: "15px 28px", fontWeight: 800, fontSize: 15.5 }}>
            See plans
          </Link>
        </div>
      </section>

      <style>{`
        @media (max-width: 760px) {
          .home-spotlight { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
