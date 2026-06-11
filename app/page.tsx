"use client";

import HomeHeroDualPath from "@/components/landing/HomeHeroDualPath";
import DropFeaturedCard from "@/components/drops/DropFeaturedCard";
import FacultyLineup from "@/components/landing/FacultyLineup";
import AcademyCampus from "@/components/landing/AcademyCampus";
import FloatingTA from "@/components/landing/FloatingTA";
import ClickSeries from "@/components/landing/ClickSeries";
import Features from "@/components/landing/Features";
import SubjectGrid from "@/components/landing/SubjectGrid";
import Testimonials from "@/components/landing/Testimonials";
import WelcomePopup from "@/components/landing/WelcomePopup";
import Link from "next/link";
import { useLang } from "@/app/contexts/LanguageContext";

export default function HomePage() {
  const { lang, t } = useLang();
  return (
    <>
      <WelcomePopup />
      <HomeHeroDualPath locale={lang} />

      {/* ── 한국어 학부모 자료실 — big shortcut ── */}
      <section style={{ padding: "44px 24px 0", position: "relative", zIndex: 10 }}>
        <Link
          href="/parents"
          style={{
            display: "block", maxWidth: 1100, margin: "0 auto", textDecoration: "none",
            background: "linear-gradient(135deg, rgba(0,255,178,0.16), rgba(124,58,237,0.18))",
            border: "1px solid rgba(0,255,178,0.45)", borderRadius: 20,
            padding: "clamp(28px,5vw,48px)", boxShadow: "0 20px 60px rgba(0,255,178,0.12)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
            <div style={{ minWidth: 260, flex: 1 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 700, letterSpacing: "0.15em", color: "#00FFB2", marginBottom: 12 }}>📚 학부모 전용 · 한국어</div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.9rem,4.4vw,3rem)", fontWeight: 800, color: "#fff", lineHeight: 1.12, letterSpacing: "-0.02em" }}>
                한국어 입시 자료실 바로가기
              </div>
              <div style={{ fontSize: "clamp(14px,1.6vw,17px)", color: "#b9c2d0", marginTop: 14, lineHeight: 1.7, maxWidth: 640 }}>
                AP 개념정리(영어+한국어) · 문제은행 11,975문항 · 합격수기·활동·에세이 · SAT 모의고사까지 — 학부모를 위한 한국어 자료를 한 곳에서.
              </div>
            </div>
            <span style={{
              flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 10,
              background: "#00FFB2", color: "#001a12", fontWeight: 800,
              fontSize: "clamp(16px,1.8vw,21px)", padding: "18px 36px", borderRadius: 14,
              boxShadow: "0 10px 30px rgba(0,255,178,0.35)", whiteSpace: "nowrap",
            }}>바로가기 →</span>
          </div>
        </Link>
      </section>

      <FacultyLineup />
      <AcademyCampus />
      <DropFeaturedCard />
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
                {t("FIRST COHORT — BOARDING NOW")}
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
              {t("Master Every Mission.")}
            </h2>

            {/* Body */}
            <p style={{
              fontSize: "16px",
              color: "#8888AA",
              lineHeight: 1.75,
              maxWidth: "520px",
              margin: "0 auto 40px",
            }}>
              {t("The platform opens in measured rollout for the first cohort. Early pilots unlock learning logs, AI memory, and hero faculty access first.")}
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
                {t("Join the waitlist →")}
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
                {t("See pricing")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <FloatingTA />
    </>
  );
}
