"use client";

/**
 * inheroedu.com homepage — the English, global landing.
 *
 * Clean & premium (like /parents, but English and global): a light, scannable
 * surface that covers the cosmic site background and shows the real premium
 * features at a glance — SAT/AP/IB/TOEFL practice exams and AP Core Notes with
 * multilingual translation.
 */

import Link from "next/link";

const INK = "#0b1220";
const SUB = "#5b6675";
const GREEN = "#00b85f";

type Feature = {
  emoji: string;
  tag: string;
  title: string;
  desc: string;
  href: string;
  cta: string;
  accent: string;
};

const FEATURES: Feature[] = [
  {
    emoji: "🖥️", tag: "DIGITAL SAT", title: "SAT Practice Test",
    desc: "Full Bluebook-style adaptive test — two-stage modules, on-screen Desmos, grid-ins, and a 400–1600 projected score. Just like the real exam.",
    href: "/sat", cta: "Start the SAT test", accent: "#1f6feb",
  },
  {
    emoji: "📝", tag: "AP MOCK EXAMS", title: "AP Practice & Question Bank",
    desc: "170,000+ College-Board-style questions across every AP subject, with instant grading, explanations, and a real digital-AP exam mode.",
    href: "/question-bank", cta: "Open the question bank", accent: "#7c3aed",
  },
  {
    emoji: "🌍", tag: "IB PRACTICE", title: "IB Paper-Style Problems",
    desc: "Paper 1 / 2 / 3-style problem sets across IB subjects (HL & SL), built to mirror real exam structure and command terms.",
    href: "/mock-exams", cta: "Browse mock exams", accent: "#0e9f6e",
  },
  {
    emoji: "🎧", tag: "TOEFL iBT", title: "TOEFL Practice Test",
    desc: "All four sections — Reading, Listening, Speaking, Writing — in the real format, with audio playback, mic recording, and rubric scoring.",
    href: "/toefl", cta: "Start the TOEFL test", accent: "#f59e0b",
  },
  {
    emoji: "📒", tag: "AP CORE NOTES · MULTILINGUAL", title: "Core Concepts, Translated",
    desc: "Concept-focused AP notes that distill each unit to its essentials — read them in English or get the full explanation translated into your language, one tap.",
    href: "/core-notes", cta: "Open Core Notes", accent: "#dc2680",
  },
  {
    emoji: "📚", tag: "INHERO ORIGINALS", title: "Digital Textbooks",
    desc: "Original AP textbooks — chapter readers with AP exam alerts, FRQ/MCQ walkthroughs, and concept deep-dives, not summaries.",
    href: "/library", cta: "Open the library", accent: "#0ea5e9",
  },
];

const STATS = [
  { n: "170K+", label: "Practice questions" },
  { n: "SAT · AP · IB · TOEFL", label: "Real-format exams" },
  { n: "AP", label: "Core Notes, translated" },
];

export default function HomePage() {
  return (
    <div style={{ position: "relative", zIndex: 10, background: "#ffffff", color: INK, fontFamily: "'Inter', -apple-system, sans-serif", minHeight: "100vh" }}>
      {/* ── Hero ───────────────────────────────────────────────── */}
      <section style={{ background: "linear-gradient(180deg,#f6f8fb 0%, #ffffff 100%)", borderBottom: "1px solid #eef1f5", paddingTop: 28 }}>
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "48px 24px 56px", textAlign: "center" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,184,95,0.08)", color: GREEN, border: "1px solid rgba(0,184,95,0.3)", borderRadius: 999, padding: "6px 14px", fontSize: 12.5, fontWeight: 800, letterSpacing: "0.02em" }}>
            ● Real-format prep · AI study tools
          </span>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2.2rem,5.4vw,3.8rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.08, margin: "20px 0 0" }}>
            Master the SAT, AP, IB<br />&amp; TOEFL — for real.
          </h1>
          <p style={{ fontSize: "clamp(15px,1.8vw,18.5px)", color: SUB, lineHeight: 1.75, maxWidth: 660, margin: "20px auto 0" }}>
            Full-length, real-format practice exams. A 170,000-question AP bank. Concept-focused
            Core Notes you can read in your own language. One premium platform, built by students
            who scored where you want to be.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 30 }}>
            <Link href="/sat" style={{ background: INK, color: "#fff", textDecoration: "none", borderRadius: 12, padding: "15px 30px", fontWeight: 800, fontSize: 15.5, boxShadow: "0 10px 26px rgba(11,18,32,0.22)" }}>
              Try a free practice test →
            </Link>
            <Link href="/pricing" style={{ background: "#fff", color: INK, textDecoration: "none", border: "1.5px solid #d8dee6", borderRadius: 12, padding: "15px 28px", fontWeight: 800, fontSize: 15.5 }}>
              See plans
            </Link>
          </div>

          {/* stat strip */}
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", marginTop: 40 }}>
            {STATS.map((s) => (
              <div key={s.label} style={{ background: "#fff", border: "1px solid #eef1f5", borderRadius: 14, padding: "14px 22px", minWidth: 150, boxShadow: "0 1px 2px rgba(16,24,40,0.04)" }}>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 19, fontWeight: 800, color: INK }}>{s.n}</div>
                <div style={{ fontSize: 12.5, color: "#94a3b8", marginTop: 3, fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Premium feature grid ───────────────────────────────── */}
      <section style={{ maxWidth: 1080, margin: "0 auto", padding: "64px 24px 8px" }}>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.5rem,3vw,2rem)", fontWeight: 800, letterSpacing: "-0.02em", margin: "0 0 6px" }}>
          Everything you need, in one place
        </h2>
        <p style={{ fontSize: 15, color: SUB, margin: "0 0 28px" }}>The exams, the question bank, and the notes — all real-format, all premium.</p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 18 }}>
          {FEATURES.map((f) => (
            <Link key={f.title} href={f.href}
              style={{ textDecoration: "none", color: INK, background: "#fff", border: "1px solid #e8ecf1", borderRadius: 18, padding: "24px 22px", display: "flex", flexDirection: "column", boxShadow: "0 1px 2px rgba(16,24,40,0.04)", transition: "transform 180ms, box-shadow 200ms" }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 18px 40px rgba(16,24,40,0.12)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 1px 2px rgba(16,24,40,0.04)"; }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <span style={{ fontSize: 26, width: 46, height: 46, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", background: `${f.accent}14` }}>{f.emoji}</span>
                <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.06em", color: f.accent, background: `${f.accent}12`, borderRadius: 6, padding: "3px 8px" }}>{f.tag}</span>
              </div>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 19, fontWeight: 800, letterSpacing: "-0.01em", margin: "0 0 8px" }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: SUB, lineHeight: 1.65, margin: 0, flex: 1 }}>{f.desc}</p>
              <span style={{ marginTop: 16, fontSize: 13.5, fontWeight: 800, color: f.accent }}>{f.cta} →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Spotlight: multilingual AP Core Notes ──────────────── */}
      <section style={{ maxWidth: 1080, margin: "0 auto", padding: "48px 24px 8px" }}>
        <div className="home-spotlight" style={{ background: "linear-gradient(135deg,#0b1220,#16233b)", color: "#fff", borderRadius: 22, padding: "clamp(28px,5vw,48px)", display: "grid", gridTemplateColumns: "minmax(0,1.4fr) minmax(0,1fr)", gap: 28, alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 12.5, fontWeight: 800, letterSpacing: "0.06em", color: "#5fe0a0", marginBottom: 12 }}>📒 AP CORE NOTES · MULTILINGUAL</div>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.6rem,3.4vw,2.4rem)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.2, margin: "0 0 14px" }}>
              Study AP concepts in any language.
            </h2>
            <p style={{ fontSize: 15.5, color: "rgba(255,255,255,0.78)", lineHeight: 1.75, margin: "0 0 22px", maxWidth: 560 }}>
              Every AP unit, distilled to the concepts and traps that actually show up on the exam —
              read it in English, then translate the full explanation into your language with one tap.
              Built for international students who think in more than one.
            </p>
            <Link href="/core-notes" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: GREEN, color: "#fff", textDecoration: "none", borderRadius: 12, padding: "13px 26px", fontWeight: 800, fontSize: 15 }}>
              Explore Core Notes →
            </Link>
          </div>
          <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 16, padding: "20px 20px" }}>
            <div style={{ fontSize: 12, color: "#9fb0c0", fontWeight: 700, marginBottom: 10 }}>Cellular Respiration · key idea</div>
            <p style={{ fontSize: 14, color: "#e7eef6", lineHeight: 1.6, margin: "0 0 14px" }}>
              The electron transport chain pumps H⁺ to build the gradient that drives ATP synthase.
            </p>
            <div style={{ height: 1, background: "rgba(255,255,255,0.1)", margin: "0 0 14px" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: "#5fe0a0", background: "rgba(0,184,95,0.14)", borderRadius: 6, padding: "2px 8px" }}>🌐 한국어</span>
            </div>
            <p style={{ fontSize: 14, color: "#cdd9e6", lineHeight: 1.7, margin: 0 }}>
              전자전달계가 H⁺를 퍼올려 농도 기울기를 만들고, 그 힘으로 ATP 합성효소가 ATP를 만듭니다.
            </p>
          </div>
        </div>
      </section>

      {/* ── Final CTA ──────────────────────────────────────────── */}
      <section style={{ maxWidth: 1080, margin: "0 auto", padding: "56px 24px 96px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.6rem,3.4vw,2.4rem)", fontWeight: 800, letterSpacing: "-0.02em", margin: 0 }}>
          Start free. Upgrade when you&apos;re ready.
        </h2>
        <p style={{ fontSize: 15.5, color: SUB, margin: "12px 0 26px" }}>Try a full practice test and the question bank — no card required.</p>
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
