"use client";

const features = [
  {
    icon: "◈",
    iconColor: "#00FF88",
    badge: "World First",
    badgeVariant: "badge-green",
    title: "Thinking Evolution Memory",
    body: "AI remembers every question, mistake, and reasoning shift from 9th through 12th grade. Four years of guided intellectual growth that no single teacher or counselor can replicate.",
    accent: "#00FF88",
    featured: true,
  },
  {
    icon: "◉",
    iconColor: "#FFB800",
    badge: "47 Lessons Live",
    badgeVariant: "badge-corona",
    title: "Hero Instructor Story",
    body: "Lessons built by a teacher who has lived inside both elite prep culture and real university classrooms. The story behind why this teacher teaches becomes part of the learning itself.",
    accent: "#FFB800",
    featured: false,
  },
  {
    icon: "⬡",
    iconColor: "#7B61FF",
    badge: "AI Powered",
    badgeVariant: "badge-plasma",
    title: "Thinking Analyzer",
    body: "When you get stuck, AI pinpoints whether it's a concept gap, a reasoning gap, or a knowledge gap — and routes you to exactly the right fix. Not a hint. A diagnosis.",
    accent: "#7B61FF",
    featured: false,
  },
];

export default function Features() {
  return (
    <section style={{ background: "transparent", padding: "100px 24px", position: "relative", zIndex: 10 }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "64px" }}>
          <p className="section-label" style={{ marginBottom: "16px" }}>
            MISSION BRIEFING
          </p>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
            fontWeight: 700,
            color: "#fff",
            letterSpacing: "-0.025em",
            marginBottom: "16px",
          }}>
            Why InHero?
          </h2>
          <p style={{
            fontSize: "16px",
            color: "#8888AA",
            maxWidth: "480px",
            margin: "0 auto",
            lineHeight: 1.7,
          }}>
            A new paradigm for the AI era — AI as a thinking trainer, not just an answer machine.
          </p>
        </div>

        {/* Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
        }} className="features-grid">
          {features.map((f) => {
            const rgb = f.accent === "#00FF88" ? "0,255,136" : f.accent === "#7B61FF" ? "123,97,255" : "255,184,0";
            return (
              <div
                key={f.title}
                style={{
                  position: "relative",
                  background: "rgba(0,0,10,0.7)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: f.featured
                    ? `1px solid rgba(0,255,136,0.25)`
                    : "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "6px",
                  padding: "36px 32px",
                  transition: "all 300ms cubic-bezier(0.16,1,0.3,1)",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = `rgba(${rgb},0.3)`;
                  el.style.boxShadow = `0 0 40px rgba(${rgb},0.08), 0 0 0 1px rgba(${rgb},0.08)`;
                  el.style.transform = "translateY(-3px)";
                  el.style.background = `rgba(${rgb},0.03)`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = f.featured ? "rgba(0,255,136,0.25)" : "rgba(255,255,255,0.06)";
                  el.style.boxShadow = "";
                  el.style.transform = "";
                  el.style.background = "rgba(0,0,10,0.7)";
                }}
              >
                {/* Top accent bar */}
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                  background: `linear-gradient(90deg, ${f.accent}, transparent)`,
                  opacity: f.featured ? 0.6 : 0.3,
                }} />

                {/* Corner HUD brackets */}
                <div style={{ position: "absolute", top: "12px", right: "12px", color: `rgba(${rgb},0.25)`, fontFamily: "monospace", fontSize: "10px", letterSpacing: "0" }}>┐</div>
                <div style={{ position: "absolute", bottom: "12px", right: "12px", color: `rgba(${rgb},0.25)`, fontFamily: "monospace", fontSize: "10px" }}>┘</div>

                {/* Icon */}
                <div style={{
                  fontSize: "28px",
                  color: f.iconColor,
                  marginBottom: "20px",
                  fontFamily: "monospace",
                  lineHeight: 1,
                }}>
                  {f.icon}
                </div>

                {/* Badge */}
                <span className={`signal-badge ${f.badgeVariant}`} style={{ marginBottom: "16px", display: "inline-flex" }}>
                  {f.badge}
                </span>

                {/* Title */}
                <h3 style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#E8E8F0",
                  letterSpacing: "-0.01em",
                  marginBottom: "12px",
                  marginTop: "12px",
                }}>
                  {f.title}
                </h3>

                {/* Body */}
                <p style={{
                  fontSize: "13.5px",
                  color: "#8888AA",
                  lineHeight: 1.75,
                }}>
                  {f.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .features-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 640px) and (max-width: 900px) {
          .features-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
