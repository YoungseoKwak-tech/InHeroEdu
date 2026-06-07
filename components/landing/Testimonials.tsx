"use client";

import { useT } from "@/app/contexts/LanguageContext";

const testimonials = [
  {
    label: "PATTERN RECALL",
    context: "AP Biology · Error pattern memory",
    signal: "Early cohort signal",
    quote: "The AI remembered the pattern behind my mistakes and, two months later, connected a new question back to that confusion. It felt completely different from AI that just gives answers.",
    icon: "◈",
    iconColor: "#00FF88",
    accentColor: "rgba(0,255,136,0.15)",
    borderColor: "rgba(0,255,136,0.12)",
  },
  {
    label: "SOCRATIC PRESSURE",
    context: "AMC track · Thinking before answers",
    signal: "Thinking shift signal",
    quote: "Instead of giving me the answer, the AI kept asking why I thought that way. It felt uncomfortable at first, but that was exactly what helped me improve for real.",
    icon: "◉",
    iconColor: "#FFB800",
    accentColor: "rgba(255,184,0,0.1)",
    borderColor: "rgba(255,184,0,0.12)",
  },
  {
    label: "GAP DIAGNOSIS",
    context: "AP Chemistry · Conceptual gap detection",
    signal: "Diagnostic precision signal",
    quote: "It didn't just tell me I was wrong. It showed me exactly where my reasoning broke down — whether it was the concept, the math, or just the way the question was framed.",
    icon: "⬡",
    iconColor: "#7B61FF",
    accentColor: "rgba(123,97,255,0.12)",
    borderColor: "rgba(123,97,255,0.12)",
  },
];

export default function Testimonials() {
  const t = useT();
  return (
    <section style={{ background: "transparent", padding: "100px 24px", position: "relative", zIndex: 10 }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <p className="section-label" style={{ marginBottom: "16px" }}>
            {t("MISSION REPORTS")}
          </p>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
            fontWeight: 700,
            color: "#fff",
            letterSpacing: "-0.025em",
            marginBottom: "12px",
          }}>
            {t("Signals From Early Learners")}
          </h2>
          <p style={{ fontSize: "15px", color: "#8888AA" }}>
            {t("Not identity theater. The shift in thinking is what matters.")}
          </p>
        </div>

        {/* Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
          marginBottom: "80px",
        }} className="testimonial-grid">
          {testimonials.map((t) => (
            <div
              key={t.label}
              style={{
                background: "rgba(0,0,10,0.65)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: `1px solid ${t.borderColor}`,
                borderRadius: "6px",
                padding: "32px 28px",
                display: "flex",
                flexDirection: "column",
                transition: "transform 300ms cubic-bezier(0.16,1,0.3,1), box-shadow 300ms",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "translateY(-3px)";
                el.style.boxShadow = `0 0 40px ${t.borderColor}`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.transform = "";
                el.style.boxShadow = "";
              }}
            >
              {/* Corner HUD brackets */}
              <div style={{ position: "absolute", top: "10px", left: "10px", color: t.borderColor, fontFamily: "monospace", fontSize: "12px" }}>┌</div>
              <div style={{ position: "absolute", top: "10px", right: "10px", color: t.borderColor, fontFamily: "monospace", fontSize: "12px" }}>┐</div>

              {/* Top row */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "9px",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: t.iconColor,
                  background: t.accentColor,
                  border: `1px solid ${t.borderColor}`,
                  borderRadius: "3px",
                  padding: "4px 10px",
                }}>
                  {t.label}
                </span>
                <span style={{ color: "#FFB800", fontSize: "12px", letterSpacing: "1px" }}>★★★★★</span>
              </div>

              {/* Quote */}
              <blockquote style={{
                flex: 1,
                fontSize: "14px",
                lineHeight: 1.75,
                color: "#E8E8F0",
                margin: 0,
                padding: 0,
                minHeight: "120px",
                fontStyle: "normal",
              }}>
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Footer */}
              <div style={{
                marginTop: "24px",
                paddingTop: "20px",
                borderTop: `1px solid ${t.borderColor}`,
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}>
                <div style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "6px",
                  background: t.accentColor,
                  border: `1px solid ${t.borderColor}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "16px",
                  color: t.iconColor,
                  fontFamily: "monospace",
                  flexShrink: 0,
                }}>
                  {t.icon}
                </div>
                <div>
                  <p style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#E8E8F0",
                    fontFamily: "'JetBrains Mono', monospace",
                    letterSpacing: "0.04em",
                    marginBottom: "2px",
                  }}>
                    {t.context}
                  </p>
                  <p style={{ fontSize: "10px", color: "#444466", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.04em" }}>
                    {t.signal}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        @media (max-width: 900px) {
          .testimonial-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
