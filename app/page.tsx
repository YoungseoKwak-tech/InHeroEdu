"use client";

import Hero from "@/components/landing/Hero";
import ClickSeries from "@/components/landing/ClickSeries";
import Features from "@/components/landing/Features";
import SubjectGrid from "@/components/landing/SubjectGrid";
import Testimonials from "@/components/landing/Testimonials";
import UniversityBanner from "@/components/UniversityBanner";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Hero />
      <UniversityBanner />
      <ClickSeries />
      <Features />
      <SubjectGrid />
      <Testimonials />

      {/* ── Mission CTA Banner ── */}
      <section style={{
        background: "transparent",
        padding: "100px 24px",
        position: "relative",
        zIndex: 10,
      }}>
        {/* Radial glow behind card */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse at center, rgba(0,255,136,0.05) 0%, transparent 65%)",
        }} />

        <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative" }}>
          <div style={{
            background: "rgba(0,0,10,0.7)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(0,255,136,0.2)",
            borderRadius: "6px",
            padding: "64px 48px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}>
            {/* Corner HUD brackets */}
            <div style={{ position: "absolute", top: "16px", left: "16px", color: "rgba(0,255,136,0.25)", fontFamily: "monospace", fontSize: "16px" }}>┌</div>
            <div style={{ position: "absolute", top: "16px", right: "16px", color: "rgba(0,255,136,0.25)", fontFamily: "monospace", fontSize: "16px" }}>┐</div>
            <div style={{ position: "absolute", bottom: "16px", left: "16px", color: "rgba(0,255,136,0.25)", fontFamily: "monospace", fontSize: "16px" }}>└</div>
            <div style={{ position: "absolute", bottom: "16px", right: "16px", color: "rgba(0,255,136,0.25)", fontFamily: "monospace", fontSize: "16px" }}>┘</div>

            {/* Top accent */}
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: "2px",
              background: "linear-gradient(90deg, transparent, #00FF88, transparent)",
              opacity: 0.5,
            }} />

            {/* Badge */}
            <div style={{ marginBottom: "24px" }}>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.2em",
                color: "#00FF88",
                background: "rgba(0,255,136,0.08)",
                border: "1px solid rgba(0,255,136,0.2)",
                borderRadius: "3px",
                padding: "6px 16px",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}>
                <span className="hud-pulse" style={{
                  width: "6px", height: "6px", borderRadius: "50%",
                  background: "#00FF88", display: "inline-block",
                }} />
                FIRST COHORT — BOARDING NOW
              </span>
            </div>

            {/* Title */}
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "-0.03em",
              marginBottom: "16px",
              lineHeight: 1.1,
              textShadow: "0 0 40px rgba(0,255,136,0.12)",
            }}>
              Master Every Mission.
            </h2>

            {/* Body */}
            <p style={{
              fontSize: "16px",
              color: "#8888AA",
              lineHeight: 1.75,
              maxWidth: "520px",
              margin: "0 auto 40px",
            }}>
              The platform opens in measured rollout for the first cohort.
              Early pilots unlock learning logs, AI memory, and hero faculty access first.
            </p>

            {/* CTAs */}
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link
                href="/waitlist?source=home_cta"
                className="hud-btn"
                style={{
                  background: "#00FF88",
                  color: "#000",
                  fontWeight: 700,
                  fontSize: "13px",
                  fontFamily: "'JetBrains Mono', monospace",
                  letterSpacing: "0.1em",
                  padding: "15px 36px",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  transition: "all 250ms cubic-bezier(0.16,1,0.3,1)",
                }}
              >
                BEGIN YOUR MISSION →
              </Link>
              <Link
                href="/pricing"
                style={{
                  border: "1px solid rgba(255,255,255,0.15)",
                  color: "#8888AA",
                  fontWeight: 600,
                  fontSize: "13px",
                  fontFamily: "'JetBrains Mono', monospace",
                  letterSpacing: "0.08em",
                  padding: "15px 36px",
                  borderRadius: "3px",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  transition: "all 250ms cubic-bezier(0.16,1,0.3,1)",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(255,255,255,0.3)";
                  el.style.color = "#E8E8F0";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "rgba(255,255,255,0.15)";
                  el.style.color = "#8888AA";
                }}
              >
                VIEW PRICING
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
