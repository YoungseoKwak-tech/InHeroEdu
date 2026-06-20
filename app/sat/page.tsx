import Link from "next/link";
import { SAT_FULL_LENGTH_FORMS, formCounts } from "@/lib/sat/forms";
import SatHistory from "@/components/sat/SatHistory";
import PromoBanner from "@/components/parents/PromoBanner";

export const metadata = {
  title: "Digital SAT Adaptive Practice Test",
  description:
    "Just like the real Bluebook — two-stage adaptive modules, per-module timers, Mark for review, the Desmos graphing calculator, grid-in answers, and a 400–1600 projected score. Take it with 5 tests for 200 credits or unlimited for 500 credits.",
};

const MINT = "#00FFB2";

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
    <div style={{ background: "#05070d", minHeight: "100vh", color: "#e8edf4", fontFamily: "Inter, sans-serif" }}>
      <PromoBanner ctaHref="/parents/sat?pay=1" sticky={false} navOffset={64} />
      <div style={{ padding: "48px 22px 120px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <p style={{ fontSize: 11, letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(0,255,178,0.7)", marginBottom: 14 }}>
          ✏️ DIGITAL SAT · ADAPTIVE PRACTICE TEST
        </p>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 850, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: 16 }}>
          Practice adaptively,<br />just like the real Bluebook.
        </h1>
        <p style={{ fontSize: 15.5, color: "rgba(255,255,255,0.55)", lineHeight: 1.75, marginBottom: 30, maxWidth: 620 }}>
          An adaptive practice test built with the same structure as the digital SAT. You go Reading & Writing → Math, each section runs as two timed modules,
          and your Module 1 performance determines the difficulty of Module 2. These are original practice questions that mirror the real exam's adaptive structure, question types, and timing. (Not a copy of official College Board exams.)
        </p>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", margin: "-18px 0 18px", lineHeight: 1.65 }}>
          For both SAT and TOEFL practice tests: <strong style={{ color: "#fff" }}>200 credits = 5 tests</strong> · <strong style={{ color: "#fff" }}>500 credits = unlimited</strong>
        </p>

        <Link href="/sat/sample" style={{ display: "inline-block", background: "transparent", color: "#fff", border: "1.5px solid rgba(0,255,178,0.45)", borderRadius: 12, padding: "13px 22px", fontWeight: 800, fontSize: 15, textDecoration: "none", marginBottom: 28 }}>
          🎁 Try a free sample — real format and timer included
        </Link>

        <SatHistory theme="dark" />

        {/* Test picker */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 40 }}>
          {SAT_FULL_LENGTH_FORMS.map((f, i) => {
            const c = formCounts(f);
            return (
              <Link key={f.id} href={`/parents/sat?pay=1&form=${encodeURIComponent(f.id)}`} style={{
                textDecoration: "none", display: "flex", alignItems: "center", gap: 16,
                borderRadius: 16, border: "1px solid rgba(0,255,178,0.22)", background: "rgba(0,255,178,0.04)", padding: "18px 20px",
              }}>
                <span style={{ fontSize: 22, fontWeight: 900, color: MINT, width: 40, flexShrink: 0 }}>{i + 1}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 16, fontWeight: 800, color: "#fff" }}>
                    Practice Test {i + 1}<span style={{ marginLeft: 8, fontSize: 11, fontWeight: 800, color: "#05070d", background: MINT, borderRadius: 999, padding: "2px 8px" }}>FULL-LENGTH</span>
                  </div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginTop: 3 }}>R&W {c.rw} questions · Math {c.math} questions · Adaptive</div>
                </div>
                <span style={{ fontSize: 13.5, fontWeight: 800, color: MINT }}>Choose a plan / Start →</span>
              </Link>
            );
          })}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14 }}>
          {FEATURES.map((f) => (
            <div key={f.title} style={{ borderRadius: 16, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)", padding: "18px 18px" }}>
              <div style={{ fontSize: 24, marginBottom: 10 }}>{f.icon}</div>
              <div style={{ fontSize: 15, fontWeight: 800, color: "#fff", marginBottom: 6 }}>{f.title}</div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
            </div>
          ))}
        </div>

        <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.35)", lineHeight: 1.7, marginTop: 30 }}>
          ※ Projected scores are estimates that reflect your adaptive path and may differ from your actual College Board score. Every Practice Test shown is full-length only (R&W 54 · Math 44).
        </p>
        </div>
      </div>
    </div>
  );
}
