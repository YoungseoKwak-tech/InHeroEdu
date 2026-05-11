"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";

/* ── Orbiting particle rings ── */
function OrbitRings() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = 900 * dpr;
    canvas.height = 900 * dpr;
    const ctx = canvas.getContext("2d")!;
    ctx.scale(dpr, dpr);

    const cx = 450, cy = 450;

    type Particle = { angle: number; radius: number; speed: number; size: number; color: string; opacity: number };
    const rings: Particle[][] = [
      // Ring 1: 8 particles, radius 200
      Array.from({ length: 8 }, (_, i) => ({
        angle: (i / 8) * Math.PI * 2,
        radius: 200,
        speed: (Math.PI * 2) / (15 * 60),
        size: 2.5,
        color: "0,255,136",
        opacity: 0.6 + Math.random() * 0.4,
      })),
      // Ring 2: 12 particles, radius 290
      Array.from({ length: 12 }, (_, i) => ({
        angle: (i / 12) * Math.PI * 2,
        radius: 290,
        speed: (Math.PI * 2) / (25 * 60),
        size: 2,
        color: i % 3 === 0 ? "123,97,255" : i % 3 === 1 ? "0,255,136" : "255,255,255",
        opacity: 0.4 + Math.random() * 0.4,
      })),
      // Ring 3: 5 particles, radius 380
      Array.from({ length: 5 }, (_, i) => ({
        angle: (i / 5) * Math.PI * 2,
        radius: 380,
        speed: (Math.PI * 2) / (40 * 60),
        size: 3,
        color: i % 2 === 0 ? "255,184,0" : "200,220,255",
        opacity: 0.3 + Math.random() * 0.3,
      })),
    ];

    const draw = () => {
      ctx.clearRect(0, 0, 900, 900);
      rings.forEach((ring) => {
        ring.forEach((p) => {
          p.angle += p.speed;
          const x = cx + Math.cos(p.angle) * p.radius;
          const y = cy + Math.sin(p.angle) * p.radius * 0.35; // elliptical
          // Glow
          const grd = ctx.createRadialGradient(x, y, 0, x, y, p.size * 3);
          grd.addColorStop(0, `rgba(${p.color},${p.opacity})`);
          grd.addColorStop(1, `rgba(${p.color},0)`);
          ctx.beginPath();
          ctx.arc(x, y, p.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();
          // Core dot
          ctx.beginPath();
          ctx.arc(x, y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color},${p.opacity})`;
          ctx.fill();
        });
      });
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "900px",
        height: "900px",
        marginLeft: "-450px",
        marginTop: "-450px",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.55,
      }}
    />
  );
}

/* ── Hero ── */
export default function Hero() {
  return (
    <section style={{
      position: "relative",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      paddingTop: "80px",
      paddingBottom: "80px",
    }}>
      {/* Orbit rings canvas behind content */}
      <OrbitRings />

      {/* ── Main content ── */}
      <div style={{
        position: "relative",
        zIndex: 10,
        textAlign: "center",
        padding: "0 24px",
        maxWidth: "760px",
        width: "100%",
      }}>

        {/* Logo */}
        <div className="hero-badge" style={{ marginBottom: "40px" }}>
          <Image
            src="/logo-black.png"
            alt="InHero"
            width={200}
            height={100}
            priority
            style={{
              width: "clamp(140px, 18vw, 200px)",
              height: "auto",
              mixBlendMode: "screen",
              display: "block",
              margin: "0 auto",
            }}
          />
        </div>

        {/* Mission Control badge */}
        <div className="hero-title" style={{ marginBottom: "28px" }}>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#00FF88",
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            padding: "8px 18px",
            background: "rgba(0,255,136,0.05)",
            border: "1px solid rgba(0,255,136,0.2)",
            borderRadius: "3px",
          }}>
            {/* Pulsing live dot */}
            <span className="hud-pulse" style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              background: "#00FF88",
              boxShadow: "0 0 8px rgba(0,255,136,0.8)",
              flexShrink: 0,
              display: "inline-block",
            }} />
            MISSION CONTROL — ACTIVE
          </span>
        </div>

        {/* H1 */}
        <h1
          className="hero-title"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(42px, 7vw, 88px)",
            fontWeight: 700,
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
            color: "#FFFFFF",
            margin: 0,
            textShadow: "0 0 60px rgba(0,255,136,0.15)",
          }}
        >
          Unlock Your
        </h1>
        <h1
          className="hero-title hero-title-bottom"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(42px, 7vw, 88px)",
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            margin: "4px 0 0",
            background: "linear-gradient(135deg, #ffffff 0%, #a0ffd6 40%, #00FF88 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "none",
          }}
        >
          Universe.
        </h1>

        {/* Sub */}
        <p
          className="hero-subcopy"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "18px",
            color: "#8888AA",
            maxWidth: "500px",
            margin: "24px auto 0",
            lineHeight: 1.7,
          }}
        >
          Ivy League instructors. AI memory. Your pattern, your mission.
        </p>

        {/* HUD stats bar */}
        <div className="hero-stats" style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0",
          flexWrap: "wrap",
          marginTop: "32px",
          padding: "14px 24px",
          background: "rgba(0,255,136,0.03)",
          border: "1px solid rgba(0,255,136,0.1)",
          borderRadius: "3px",
          maxWidth: "600px",
          marginLeft: "auto",
          marginRight: "auto",
        }}>
          {[
            "▸ 1,800+ MISSIONS LOGGED",
            "▸ 631 LESSONS DEPLOYED",
            "▸ HERO FACULTY: ACTIVE",
          ].map((stat, i, arr) => (
            <span key={stat} style={{ display: "flex", alignItems: "center", gap: "0" }}>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                color: "#00FF88",
                padding: "0 16px",
                whiteSpace: "nowrap",
              }}>
                {stat}
              </span>
              {i < arr.length - 1 && (
                <span style={{ color: "rgba(0,255,136,0.2)", fontSize: "12px" }}>|</span>
              )}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="hero-ctas" style={{
          display: "flex",
          gap: "12px",
          marginTop: "32px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}>
          <Link
            href="/courses"
            className="hero-btn-launch hud-btn"
            style={{
              background: "#00FF88",
              color: "#000",
              fontWeight: 700,
              fontSize: "14px",
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: "0.1em",
              padding: "15px 32px",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            ENTER THE CLASSROOM →
          </Link>
          <Link
            href="/courses/ap-biology/cell-structure"
            className="hero-btn-map"
            style={{
              background: "transparent",
              color: "#00FF88",
              border: "1px solid rgba(0,255,136,0.35)",
              fontWeight: 600,
              fontSize: "14px",
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: "0.08em",
              padding: "15px 32px",
              borderRadius: "3px",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 250ms cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            EXPLORE UNIVERSE
          </Link>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div style={{
        position: "absolute",
        bottom: 0, left: 0, right: 0,
        height: "140px",
        background: "linear-gradient(to bottom, transparent, #00000A)",
        pointerEvents: "none",
        zIndex: 5,
      }} />
    </section>
  );
}
