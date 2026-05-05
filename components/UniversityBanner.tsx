"use client";

const UNIVERSITIES = [
  "Harvard University",
  "Yale University",
  "Princeton University",
  "Columbia University",
  "Cornell University",
  "Brown University",
  "Dartmouth College",
  "UPenn",
  "MIT",
  "Stanford University",
  "Duke University",
  "Johns Hopkins",
  "Northwestern University",
  "UC Berkeley",
  "UCLA",
  "Carnegie Mellon",
  "NYU",
  "USC",
  "Georgetown",
  "Vanderbilt",
  "Rice University",
  "Notre Dame",
  "Emory University",
  "Univ. of Michigan",
  "Univ. of Virginia",
];

export default function UniversityBanner() {
  return (
    <section style={{ background: "transparent", padding: "0", position: "relative", zIndex: 10 }}>
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(0,255,136,0.08), transparent)" }} />

      <div style={{ padding: "28px 0 8px", textAlign: "center" }}>
        <p style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "10px",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#FFB800",
          opacity: 0.7,
          marginBottom: "4px",
        }}>
          Destination Planets — Where Our Pilots Landed
        </p>
        <p style={{ fontSize: "11px", color: "#2a2a3a", letterSpacing: "0.06em", fontFamily: "'JetBrains Mono', monospace" }}>
          Universities reached by students from the same launchpad
        </p>
      </div>

      <div style={{ overflow: "hidden", position: "relative", padding: "16px 0 28px" }}>
        {/* Edge fades */}
        <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: "80px", zIndex: 10, pointerEvents: "none", background: "linear-gradient(to right, #00000A, transparent)" }} />
        <div style={{ position: "absolute", right: 0, top: 0, height: "100%", width: "80px", zIndex: 10, pointerEvents: "none", background: "linear-gradient(to left, #00000A, transparent)" }} />

        <div className="uni-scroll-track" style={{ display: "flex", alignItems: "center", width: "max-content" }}>
          {[...UNIVERSITIES, ...UNIVERSITIES].map((name, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "0 28px",
                flexShrink: 0,
              }}
            >
              <span style={{
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                background: "rgba(0,255,136,0.3)",
                flexShrink: 0,
              }} />
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "11px",
                fontWeight: 400,
                letterSpacing: "0.06em",
                color: "#444466",
                whiteSpace: "nowrap",
              }}>
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(0,255,136,0.08), transparent)" }} />
    </section>
  );
}
