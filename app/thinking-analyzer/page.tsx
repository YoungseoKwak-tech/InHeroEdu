import AnalyzerForm from "@/components/thinking-analyzer/AnalyzerForm";
import PatternPanel from "@/components/thinking-analyzer/PatternPanel";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thinking Analyzer | InHero",
  description: "Diagnose root-cause mistakes across concept, application, language, and logic gaps.",
};

const GAP_BADGES = [
  { t: "CONCEPT_GAP",  c: "rgba(239,68,68,0.15)",   border: "rgba(239,68,68,0.35)",   text: "#f87171" },
  { t: "LANGUAGE_GAP", c: "rgba(59,130,246,0.15)",  border: "rgba(59,130,246,0.35)",  text: "#60a5fa" },
  { t: "LOGIC_GAP",    c: "rgba(168,85,247,0.15)",  border: "rgba(168,85,247,0.35)",  text: "#c084fc" },
  { t: "REPEAT_ERROR", c: "rgba(251,146,60,0.15)",  border: "rgba(251,146,60,0.35)",  text: "#fb923c" },
];

export default function ThinkingAnalyzerPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#00000A" }}>

      {/* ── Header ── */}
      <div style={{
        borderBottom: "1px solid rgba(0,255,136,0.1)",
        background: "rgba(0,0,0,0.6)",
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "12px" }}>
            <div style={{
              width: "40px", height: "40px", borderRadius: "4px",
              background: "rgba(0,255,136,0.08)",
              border: "1px solid rgba(0,255,136,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "18px",
            }}>
              ◈
            </div>
            <div>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.18em",
                color: "#00FF88",
                marginBottom: "4px",
              }}>
                ▸ THINKING ANALYZER — ACTIVE
              </div>
              <h1 style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(22px, 3vw, 32px)",
                fontWeight: 700,
                color: "#ffffff",
                margin: 0,
                lineHeight: 1.1,
              }}>
                Pattern Intelligence
              </h1>
            </div>
          </div>

          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "14px",
            color: "rgba(255,255,255,0.5)",
            margin: "0 0 16px 54px",
            lineHeight: 1.6,
          }}>
            Your live pattern map — every gap detected, every pattern resolved.
            Submit a mistake below to add to your profile.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginLeft: "54px" }}>
            {GAP_BADGES.map(({ t, c, border, text }) => (
              <span key={t} style={{
                fontSize: "10px",
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 700,
                letterSpacing: "0.1em",
                padding: "4px 12px",
                borderRadius: "3px",
                background: c,
                border: `1px solid ${border}`,
                color: text,
              }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Body: pattern panel left, analyzer form right ── */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 24px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "32px",
          alignItems: "start",
        }}>

          {/* Left — Pattern Data */}
          <div style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(0,255,136,0.08)",
            borderRadius: "6px",
            padding: "24px",
          }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.16em",
              color: "rgba(0,255,136,0.7)",
              marginBottom: "20px",
            }}>
              ▸ YOUR PATTERN MAP
            </div>
            <PatternPanel />
          </div>

          {/* Right — Analyzer Form */}
          <div style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "6px",
            padding: "24px",
          }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.16em",
              color: "rgba(255,255,255,0.4)",
              marginBottom: "20px",
            }}>
              ▸ SUBMIT A MISTAKE
            </div>
            <AnalyzerForm />
          </div>

        </div>
      </div>
    </div>
  );
}
