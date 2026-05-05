"use client";

import Link from "next/link";

/* Each subject is a planet to explore */
const subjects = [
  {
    id: "ap-biology",
    name: "AP Biology",
    subtitle: "Life Systems & Evolution",
    lessons: 47,
    orbColor: "#00FF88",
    orbGlow: "rgba(0,255,136,0.3)",
    orbBg: "radial-gradient(ellipse at 35% 30%, #50ff90 0%, #00cc66 40%, #006633 75%, #002a15 100%)",
    accentDim: "rgba(0,255,136,0.06)",
    accentBorder: "rgba(0,255,136,0.18)",
    available: true,
  },
  {
    id: "ap-chemistry",
    name: "AP Chemistry",
    subtitle: "Molecular Reactions",
    lessons: 52,
    orbColor: "#FF8C40",
    orbGlow: "rgba(255,140,64,0.3)",
    orbBg: "radial-gradient(ellipse at 35% 30%, #ffb870 0%, #e07030 40%, #a04010 75%, #3a1505 100%)",
    accentDim: "rgba(255,140,64,0.06)",
    accentBorder: "rgba(255,140,64,0.15)",
    available: false,
  },
  {
    id: "ap-calculus-bc",
    name: "AP Calculus BC",
    subtitle: "Mathematical Universe",
    lessons: 61,
    orbColor: "#7B61FF",
    orbGlow: "rgba(123,97,255,0.3)",
    orbBg: "radial-gradient(ellipse at 35% 30%, #b090ff 0%, #7B61FF 40%, #4030aa 75%, #180a50 100%)",
    accentDim: "rgba(123,97,255,0.06)",
    accentBorder: "rgba(123,97,255,0.15)",
    available: false,
  },
  {
    id: "amc",
    name: "AMC 10/12",
    subtitle: "Competition Mathematics",
    lessons: 38,
    orbColor: "#FFB800",
    orbGlow: "rgba(255,184,0,0.3)",
    orbBg: "radial-gradient(ellipse at 35% 30%, #ffe080 0%, #FFB800 40%, #aa7800 75%, #402800 100%)",
    accentDim: "rgba(255,184,0,0.06)",
    accentBorder: "rgba(255,184,0,0.15)",
    available: false,
  },
];

/* Spinning planet orb */
function PlanetOrb({ bg, glow, size = 56 }: { bg: string; glow: string; size?: number }) {
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      {/* Glow */}
      <div style={{
        position: "absolute",
        inset: -8,
        borderRadius: "50%",
        background: `radial-gradient(ellipse, ${glow.replace("0.3", "0.15")} 0%, transparent 70%)`,
        animation: "planetFloat1 4s ease-in-out infinite",
      }} />
      {/* Planet */}
      <div style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: bg,
        boxShadow: `inset -${size/5}px -${size/5}px ${size/2}px rgba(0,0,0,0.55), 0 0 ${size/2}px ${glow}`,
        overflow: "hidden",
        position: "relative",
      }}>
        {/* Surface band */}
        <div style={{
          position: "absolute",
          top: "38%",
          left: "5%",
          right: "5%",
          height: "14%",
          borderRadius: "50%",
          background: "rgba(255,255,255,0.08)",
          filter: "blur(3px)",
        }} />
      </div>
    </div>
  );
}

export default function SubjectGrid() {
  return (
    <section style={{ background: "transparent", padding: "100px 24px", position: "relative", zIndex: 10 }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <p className="section-label" style={{ marginBottom: "16px" }}>
            EXPLORE THE UNIVERSE
          </p>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
            fontWeight: 700,
            color: "#fff",
            letterSpacing: "-0.025em",
            marginBottom: "12px",
          }}>
            Select Your Mission
          </h2>
          <p style={{ fontSize: "15px", color: "#8888AA" }}>
            Every course designed around what AP actually tests
          </p>
        </div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "16px",
        }} className="subject-grid">
          {subjects.map((s) => (
            <Link
              key={s.id}
              href={s.available ? `/courses/${s.id}` : "/courses"}
              style={{ textDecoration: "none" }}
            >
              <div
                style={{
                  position: "relative",
                  background: "rgba(0,0,10,0.65)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: `1px solid ${s.accentBorder}`,
                  borderRadius: "6px",
                  padding: "28px 24px",
                  transition: "all 300ms cubic-bezier(0.16,1,0.3,1)",
                  overflow: "hidden",
                  cursor: "none",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = s.accentDim;
                  el.style.transform = "translateY(-4px)";
                  el.style.boxShadow = `0 0 40px ${s.orbGlow.replace("0.3", "0.12")}`;
                  // speed up orb
                  const orb = el.querySelector(".orb-inner") as HTMLElement;
                  if (orb) orb.style.animationDuration = "4s";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.background = "rgba(0,0,10,0.65)";
                  el.style.transform = "";
                  el.style.boxShadow = "";
                  const orb = el.querySelector(".orb-inner") as HTMLElement;
                  if (orb) orb.style.animationDuration = "";
                }}
              >
                {/* Top accent line */}
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: "2px",
                  background: `linear-gradient(90deg, ${s.orbColor}, transparent)`,
                  opacity: 0.5,
                }} />

                {/* Planet orb */}
                <div style={{ marginBottom: "20px" }}>
                  <PlanetOrb bg={s.orbBg} glow={s.orbGlow} />
                </div>

                {/* Name */}
                <h3 style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: "15px",
                  color: "#E8E8F0",
                  marginBottom: "4px",
                  letterSpacing: "-0.01em",
                }}>
                  {s.name}
                </h3>
                <p style={{
                  fontSize: "11px",
                  color: "#444466",
                  fontFamily: "'JetBrains Mono', monospace",
                  marginBottom: "20px",
                  letterSpacing: "0.04em",
                }}>
                  {s.subtitle}
                </p>

                {/* Footer */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{
                    fontSize: "10px",
                    color: "#444466",
                    fontFamily: "'JetBrains Mono', monospace",
                    letterSpacing: "0.06em",
                  }}>
                    {s.lessons} LESSONS
                  </span>
                  {s.available ? (
                    <span style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      fontFamily: "'JetBrains Mono', monospace",
                      letterSpacing: "0.08em",
                      color: s.orbColor,
                    }}>
                      EXPLORE →
                    </span>
                  ) : (
                    <span style={{
                      fontSize: "9px",
                      color: "#444466",
                      fontFamily: "'JetBrains Mono', monospace",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      borderRadius: "3px",
                      padding: "3px 8px",
                      letterSpacing: "0.08em",
                    }}>
                      LOCKED
                    </span>
                  )}
                </div>

                {/* Coming soon overlay */}
                {!s.available && (
                  <div style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(0,0,8,0.5)",
                    borderRadius: "6px",
                  }} />
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <Link href="/courses" className="btn-secondary" style={{ display: "inline-flex" }}>
            Browse all missions →
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .subject-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .subject-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
