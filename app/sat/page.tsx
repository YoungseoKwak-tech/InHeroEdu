import Link from "next/link";
import { SAT_FULL_LENGTH_FORMS, formCounts } from "@/lib/sat/forms";
import SatHistory from "@/components/sat/SatHistory";
import PromoBanner from "@/components/parents/PromoBanner";

export const metadata = {
  title: "Digital SAT Adaptive Practice Test",
  description:
    "Just like the real Bluebook — two-stage adaptive modules, per-module timers, Mark for review, the Desmos graphing calculator, grid-in answers, and a 400–1600 projected score. Take it with 5 tests for 200 credits or unlimited for 500 credits.",
};

const INK = "#0b1220";
const SUB = "#5b6675";
const GREEN = "#00b85f";
const MAXW = 1080;

const FEATURES = [
  { icon: "🧭", title: "Two-Stage Adaptive Modules", desc: "Just like the real digital SAT — your Module 1 performance sets the difficulty of Module 2." },
  { icon: "⏱️", title: "Per-Module Timer", desc: "Each module is timed — auto-submits when the clock runs out. Train your test-day pacing." },
  { icon: "🚩", title: "Mark for review", desc: "Flag questions to revisit, plus a question navigator and a pre-submit review screen." },
  { icon: "🖩", title: "Desmos Calculator", desc: "The same Desmos graphing calculator from the real exam, built into the Math modules." },
  { icon: "🔢", title: "MCQ + Grid-in", desc: "Supports both multiple-choice and grid-in answers — fractions and decimals accepted." },
  { icon: "📊", title: "400–1600 Projected Score", desc: "Section scores, a total estimate that reflects your adaptive path, and explanations for every question." },
];

export default function SatLandingPage() {
  return (
    <div style={{ background: "#ffffff", minHeight: "100vh", color: INK, fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <PromoBanner ctaHref="/parents/sat?pay=1" sticky={false} navOffset={64} />
      <div style={{ background: "linear-gradient(180deg,#f6f8fb 0%, #ffffff 100%)", borderBottom: "1px solid #eef1f5" }}>
        <div style={{ maxWidth: MAXW, margin: "0 auto", padding: "44px 28px 36px" }}>
          <p style={{ fontSize: 11.5, letterSpacing: "0.18em", textTransform: "uppercase", color: GREEN, fontWeight: 800, marginBottom: 12 }}>
            ✏️ Digital SAT · Adaptive Practice Test
          </p>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 800, color: INK, letterSpacing: "-0.03em", lineHeight: 1.06, marginBottom: 16 }}>
            Practice adaptively,<br />just like the real Bluebook.
          </h1>
          <p style={{ fontSize: 16, color: SUB, lineHeight: 1.75, marginBottom: 18, maxWidth: 660 }}>
            An adaptive practice test built with the same structure as the digital SAT. You go Reading &amp; Writing → Math, each section runs as two timed modules,
            and your Module 1 performance determines the difficulty of Module 2. Original practice questions that mirror the real exam&apos;s adaptive structure, question types, and timing. (Not a copy of official College Board exams.)
          </p>
          <p style={{ fontSize: 13.5, color: SUB, margin: "0 0 22px", lineHeight: 1.65 }}>
            For both SAT and TOEFL practice tests: <strong style={{ color: INK }}>200 credits = 5 tests</strong> · <strong style={{ color: INK }}>500 credits = unlimited</strong>
          </p>
          <Link href="/sat/sample" style={{ display: "inline-block", background: GREEN, color: "#fff", borderRadius: 12, padding: "14px 24px", fontWeight: 800, fontSize: 15, textDecoration: "none", boxShadow: "0 10px 26px rgba(0,184,95,0.28)" }}>
            🎁 Try a free sample — real format and timer included
          </Link>
        </div>
      </div>

      <div style={{ maxWidth: MAXW, margin: "0 auto", padding: "32px 28px 100px" }}>
        <SatHistory theme="light" />

        {/* Test picker */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, margin: "8px 0 40px" }}>
          {SAT_FULL_LENGTH_FORMS.map((f, i) => {
            const c = formCounts(f);
            return (
              <Link key={f.id} href={`/parents/sat?pay=1&form=${encodeURIComponent(f.id)}`} style={{
                textDecoration: "none", display: "flex", alignItems: "center", gap: 16,
                borderRadius: 16, border: "1px solid #e8ecf1", background: "#fff", padding: "18px 20px", boxShadow: "0 1px 2px rgba(16,24,40,0.04)",
              }}>
                <span style={{ fontSize: 22, fontWeight: 900, color: GREEN, width: 40, flexShrink: 0 }}>{i + 1}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: INK }}>
                    Practice Test {i + 1}<span style={{ marginLeft: 8, fontSize: 11, fontWeight: 800, color: "#fff", background: GREEN, borderRadius: 999, padding: "2px 8px" }}>FULL-LENGTH</span>
                  </div>
                  <div style={{ fontSize: 13, color: SUB, marginTop: 3 }}>R&amp;W {c.rw} questions · Math {c.math} questions · Adaptive</div>
                </div>
                <span style={{ fontSize: 13.5, fontWeight: 800, color: GREEN }}>Choose a plan / Start →</span>
              </Link>
            );
          })}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 14 }}>
          {FEATURES.map((f) => (
            <div key={f.title} style={{ borderRadius: 16, border: "1px solid #e8ecf1", background: "#fff", padding: "18px 18px", boxShadow: "0 1px 2px rgba(16,24,40,0.04)" }}>
              <div style={{ fontSize: 24, marginBottom: 10 }}>{f.icon}</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: INK, marginBottom: 6 }}>{f.title}</div>
              <p style={{ fontSize: 13, color: SUB, lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>

        <p style={{ fontSize: 12.5, color: "#94a3b8", lineHeight: 1.7, marginTop: 30 }}>
          ※ Projected scores are estimates that reflect your adaptive path and may differ from your actual College Board score. Every Practice Test shown is full-length only (R&amp;W 54 · Math 44).
        </p>
      </div>
    </div>
  );
}
