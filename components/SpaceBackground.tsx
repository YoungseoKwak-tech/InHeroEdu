"use client";

import { useEffect, useRef } from "react";

/* ── Ship SVGs ─────────────────────────────────────────────── */

const ShipHero = () => (
  <svg width="140" height="48" viewBox="0 0 140 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Engine trail */}
    <defs>
      <linearGradient id="trail1" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#00FF88" stopOpacity="0" />
        <stop offset="100%" stopColor="#00FF88" stopOpacity="0.5" />
      </linearGradient>
      <linearGradient id="engineGlow" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#00FF88" stopOpacity="0.9" />
        <stop offset="100%" stopColor="#00cc66" stopOpacity="0.3" />
      </linearGradient>
      <radialGradient id="cockpitGlow">
        <stop offset="0%" stopColor="#aaeeff" stopOpacity="1" />
        <stop offset="100%" stopColor="#6699cc" stopOpacity="0.6" />
      </radialGradient>
    </defs>
    {/* Trail */}
    <rect x="0" y="21" width="24" height="6" rx="3" fill="url(#trail1)" />
    {/* Lower wing */}
    <path d="M30 28 L50 48 L70 28" fill="rgba(160,180,220,0.65)" />
    {/* Upper wing */}
    <path d="M30 20 L50 0 L70 20" fill="rgba(160,180,220,0.65)" />
    {/* Main body */}
    <path d="M18 24 L32 14 L120 18 L140 24 L120 30 L32 34 Z" fill="rgba(210,225,255,0.92)" />
    {/* Body highlight */}
    <path d="M32 16 L118 19 L120 18 L32 14 Z" fill="rgba(255,255,255,0.25)" />
    {/* Wing accent lines */}
    <line x1="40" y1="20" x2="65" y2="20" stroke="rgba(0,255,136,0.4)" strokeWidth="0.8" />
    <line x1="40" y1="28" x2="65" y2="28" stroke="rgba(0,255,136,0.4)" strokeWidth="0.8" />
    {/* Cockpit window */}
    <ellipse cx="108" cy="24" rx="8" ry="5" fill="url(#cockpitGlow)" />
    <ellipse cx="108" cy="24" rx="5" ry="3" fill="rgba(180,240,255,0.9)" />
    {/* Engine glow */}
    <ellipse cx="21" cy="24" rx="7" ry="4" fill="url(#engineGlow)" />
    <ellipse cx="19" cy="24" rx="4" ry="2.5" fill="rgba(0,255,136,0.95)" />
    {/* Blink lights */}
    <circle cx="50" cy="4" r="1.5" fill="#00FF88" opacity="0.9" className="ship-blink" />
    <circle cx="50" cy="44" r="1.5" fill="#ff4444" opacity="0.9" className="ship-blink-slow" />
    <circle cx="130" cy="24" r="1" fill="#ffffff" opacity="0.7" />
  </svg>
);

const ShipInterceptor = () => (
  <svg width="80" height="28" viewBox="0 0 80 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="trail2" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#7B61FF" stopOpacity="0" />
        <stop offset="100%" stopColor="#7B61FF" stopOpacity="0.6" />
      </linearGradient>
    </defs>
    <rect x="0" y="12" width="14" height="4" rx="2" fill="url(#trail2)" />
    <path d="M15 14 L22 4 L40 14" fill="rgba(150,130,220,0.7)" />
    <path d="M15 14 L22 24 L40 14" fill="rgba(150,130,220,0.7)" />
    <path d="M10 14 L20 8 L72 12 L80 14 L72 16 L20 20 Z" fill="rgba(200,190,255,0.9)" />
    <ellipse cx="65" cy="14" rx="5" ry="3" fill="rgba(180,220,255,0.85)" />
    <ellipse cx="13" cy="14" rx="5" ry="2.5" fill="rgba(123,97,255,0.9)" />
    <circle cx="22" cy="5" r="1" fill="#7B61FF" opacity="0.8" className="ship-blink" />
  </svg>
);

const ShipFreighter = () => (
  <svg width="200" height="60" viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="trail3" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#00FF88" stopOpacity="0" />
        <stop offset="100%" stopColor="#00FF88" stopOpacity="0.2" />
      </linearGradient>
    </defs>
    <rect x="0" y="27" width="30" height="6" rx="3" fill="url(#trail3)" />
    <rect x="0" y="22" width="20" height="4" rx="2" fill="url(#trail3)" />
    <rect x="0" y="34" width="20" height="4" rx="2" fill="url(#trail3)" />
    {/* Lower hull */}
    <path d="M28 35 L40 55 L140 50 L180 35" stroke="rgba(150,160,180,0.5)" strokeWidth="1" fill="rgba(100,110,130,0.4)" />
    {/* Upper hull */}
    <path d="M28 25 L40 5 L140 10 L180 25" stroke="rgba(150,160,180,0.5)" strokeWidth="1" fill="rgba(100,110,130,0.4)" />
    {/* Main body */}
    <path d="M20 30 L35 18 L170 20 L200 30 L170 40 L35 42 Z" fill="rgba(130,145,170,0.75)" />
    {/* Cargo modules */}
    <rect x="60" y="22" width="30" height="16" rx="2" fill="rgba(110,125,150,0.6)" stroke="rgba(150,165,190,0.3)" strokeWidth="0.5" />
    <rect x="100" y="22" width="30" height="16" rx="2" fill="rgba(110,125,150,0.6)" stroke="rgba(150,165,190,0.3)" strokeWidth="0.5" />
    <ellipse cx="180" cy="30" rx="6" ry="4" fill="rgba(180,200,220,0.7)" />
    {/* Dual engines */}
    <ellipse cx="23" cy="26" rx="5" ry="2.5" fill="rgba(0,255,136,0.5)" />
    <ellipse cx="23" cy="34" rx="5" ry="2.5" fill="rgba(0,255,136,0.5)" />
  </svg>
);

const Astronaut = () => (
  <svg width="160" height="220" viewBox="0 0 160 220" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Tether cable */}
    <path d="M145 60 Q165 90 155 120 Q145 150 160 180" stroke="rgba(255,255,255,0.2)" strokeWidth="2" fill="none" strokeDasharray="4 3" />
    {/* Body */}
    <rect x="42" y="90" width="76" height="85" rx="14" fill="rgba(235,240,255,0.95)" />
    {/* Body shading */}
    <rect x="42" y="90" width="76" height="40" rx="14" fill="rgba(210,220,245,0.5)" />
    {/* Chest InHero mark */}
    <rect x="60" y="115" width="40" height="24" rx="4" fill="rgba(0,255,136,0.12)" stroke="rgba(0,255,136,0.4)" strokeWidth="1" />
    <text x="80" y="131" textAnchor="middle" fontFamily="monospace" fontSize="9" fontWeight="bold" fill="#00FF88">InHero</text>
    {/* Left arm */}
    <rect x="16" y="94" width="28" height="60" rx="12" fill="rgba(225,232,252,0.95)" />
    <ellipse cx="30" cy="155" rx="13" ry="11" fill="rgba(215,225,248,0.9)" />
    {/* Right arm (wave position) */}
    <rect x="116" y="88" width="28" height="55" rx="12" fill="rgba(225,232,252,0.95)" className="astronaut-arm" />
    <ellipse cx="130" cy="143" rx="13" ry="11" fill="rgba(215,225,248,0.9)" className="astronaut-hand" />
    {/* Legs */}
    <rect x="48" y="166" width="28" height="46" rx="12" fill="rgba(220,228,250,0.95)" />
    <rect x="84" y="166" width="28" height="46" rx="12" fill="rgba(220,228,250,0.95)" />
    {/* Boots */}
    <ellipse cx="62" cy="210" rx="16" ry="9" fill="rgba(180,190,220,0.9)" />
    <ellipse cx="98" cy="210" rx="16" ry="9" fill="rgba(180,190,220,0.9)" />
    {/* Helmet */}
    <circle cx="80" cy="68" r="42" fill="rgba(230,238,255,0.97)" />
    {/* Visor */}
    <ellipse cx="80" cy="65" rx="30" ry="26" fill="rgba(40,80,140,0.85)" />
    {/* Visor reflection */}
    <path d="M58 52 Q72 46 85 52" stroke="rgba(150,200,255,0.6)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    <circle cx="70" cy="60" r="4" fill="rgba(100,160,255,0.15)" />
    {/* Helmet highlights */}
    <path d="M48 52 Q60 32 96 38" stroke="rgba(255,255,255,0.35)" strokeWidth="2" fill="none" strokeLinecap="round" />
    {/* Helmet ring */}
    <circle cx="80" cy="68" r="42" stroke="rgba(200,210,240,0.6)" strokeWidth="2" fill="none" />
    {/* Backpack */}
    <rect x="45" y="95" width="20" height="50" rx="6" fill="rgba(190,200,230,0.85)" />
    {/* Antenna */}
    <line x1="80" y1="26" x2="80" y2="10" stroke="rgba(200,210,240,0.7)" strokeWidth="1.5" />
    <circle cx="80" cy="9" r="3" fill="#00FF88" opacity="0.8" />
  </svg>
);

/* ── Planet components ─────────────────────────────────────── */

const PlanetGasGiant = () => (
  <div style={{ position: "relative", width: "380px", height: "380px" }}>
    {/* Atmosphere glow */}
    <div style={{
      position: "absolute", inset: "-30px",
      borderRadius: "50%",
      background: "radial-gradient(ellipse, rgba(255,160,60,0.12) 0%, rgba(255,120,40,0.06) 40%, transparent 70%)",
    }} />
    {/* Planet body */}
    <div style={{
      position: "absolute", inset: 0,
      borderRadius: "50%",
      background: "radial-gradient(ellipse at 35% 35%, #e8b070 0%, #c47830 25%, #9a5820 50%, #6b3a14 75%, #3d1f08 100%)",
      boxShadow: "inset -40px -40px 80px rgba(0,0,0,0.6), inset 20px 20px 40px rgba(255,200,120,0.15), 0 0 80px rgba(255,160,60,0.15)",
    }}>
      {/* Surface bands */}
      <div style={{ position: "absolute", top: "28%", left: "5%", right: "5%", height: "8%", borderRadius: "50%", background: "rgba(200,120,50,0.4)", filter: "blur(4px)" }} />
      <div style={{ position: "absolute", top: "42%", left: "8%", right: "8%", height: "5%", borderRadius: "50%", background: "rgba(160,80,30,0.5)", filter: "blur(3px)" }} />
      <div style={{ position: "absolute", top: "52%", left: "3%", right: "3%", height: "10%", borderRadius: "50%", background: "rgba(180,100,40,0.35)", filter: "blur(5px)" }} />
      <div style={{ position: "absolute", top: "65%", left: "10%", right: "10%", height: "6%", borderRadius: "50%", background: "rgba(140,70,25,0.4)", filter: "blur(3px)" }} />
      {/* Great spot */}
      <div style={{ position: "absolute", top: "55%", left: "25%", width: "30%", height: "18%", borderRadius: "50%", background: "rgba(210,100,50,0.5)", filter: "blur(6px)" }} />
    </div>
    {/* Ring system */}
    <div className="planet-ring" style={{
      position: "absolute",
      top: "50%", left: "50%",
      width: "560px", height: "90px",
      marginLeft: "-280px", marginTop: "-45px",
      borderRadius: "50%",
      border: "none",
      background: "transparent",
      transform: "rotateX(75deg)",
      pointerEvents: "none",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        borderRadius: "50%",
        border: "18px solid transparent",
        borderColor: "rgba(200,150,80,0.35) transparent",
        boxShadow: "0 0 0 8px rgba(180,130,60,0.2), 0 0 0 18px rgba(160,110,40,0.12)",
      }} />
    </div>
  </div>
);

const PlanetIce = () => (
  <div style={{ position: "relative", width: "180px", height: "180px" }}>
    <div style={{
      position: "absolute", inset: "-20px",
      borderRadius: "50%",
      background: "radial-gradient(ellipse, rgba(60,150,255,0.1) 0%, transparent 70%)",
    }} />
    <div style={{
      position: "absolute", inset: 0,
      borderRadius: "50%",
      background: "radial-gradient(ellipse at 35% 30%, #a0d8ff 0%, #4090d0 30%, #1a5fa0 60%, #0a2a5a 100%)",
      boxShadow: "inset -20px -20px 40px rgba(0,0,0,0.5), inset 10px 10px 20px rgba(150,210,255,0.2), 0 0 40px rgba(60,150,255,0.15)",
    }}>
      <div style={{ position: "absolute", top: "20%", left: "10%", right: "10%", height: "6%", borderRadius: "50%", background: "rgba(180,230,255,0.3)", filter: "blur(3px)" }} />
      <div style={{ position: "absolute", top: "50%", left: "5%", right: "5%", height: "8%", borderRadius: "50%", background: "rgba(100,170,240,0.35)", filter: "blur(4px)" }} />
      <div style={{ position: "absolute", top: "15%", left: "20%", width: "25%", height: "25%", borderRadius: "50%", background: "rgba(220,245,255,0.2)", filter: "blur(6px)" }} />
    </div>
  </div>
);

const PlanetRocky = () => (
  <div style={{ position: "relative", width: "110px", height: "110px" }}>
    <div style={{
      position: "absolute", inset: "-12px",
      borderRadius: "50%",
      background: "radial-gradient(ellipse, rgba(180,80,50,0.08) 0%, transparent 70%)",
    }} />
    <div style={{
      position: "absolute", inset: 0,
      borderRadius: "50%",
      background: "radial-gradient(ellipse at 38% 32%, #b06050 0%, #803830 35%, #5a2418 65%, #2e100a 100%)",
      boxShadow: "inset -12px -12px 25px rgba(0,0,0,0.55), inset 6px 6px 12px rgba(200,120,80,0.12)",
    }}>
      <div style={{ position: "absolute", top: "30%", left: "20%", width: "20%", height: "20%", borderRadius: "50%", background: "rgba(80,30,20,0.6)", filter: "blur(3px)" }} />
      <div style={{ position: "absolute", top: "55%", left: "55%", width: "15%", height: "15%", borderRadius: "50%", background: "rgba(60,20,15,0.7)", filter: "blur(2px)" }} />
    </div>
  </div>
);

/* ── Main Component ────────────────────────────────────────── */

export default function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const ctx = canvas.getContext("2d")!;

    // Generate star layers (3 depths for parallax)
    type Star = { x: number; y: number; r: number; o: number; phase: number; speed: number; layer: number };
    const stars: Star[] = [];
    for (let i = 0; i < 2200; i++) {
      const layer = i < 800 ? 1 : i < 1600 ? 2 : 3;
      stars.push({
        x: Math.random(),
        y: Math.random(),
        r: layer === 3 ? Math.random() * 1.5 + 0.5 : layer === 2 ? Math.random() * 1.0 + 0.3 : Math.random() * 0.7 + 0.2,
        o: Math.random() * 0.6 + 0.1,
        phase: Math.random() * Math.PI * 2,
        speed: 3 + Math.random() * 5,
        layer,
      });
    }

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight };
    };
    window.addEventListener("mousemove", handleMouse);

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const t = Date.now() * 0.001;

      ctx.clearRect(0, 0, W, H);

      // Draw stars
      stars.forEach((s) => {
        const parallaxStrength = s.layer === 1 ? 12 : s.layer === 2 ? 24 : 40;
        const px = (s.x * W + (mx - 0.5) * parallaxStrength) % W;
        const py = (s.y * H + (my - 0.5) * parallaxStrength) % H;
        const twinkle = s.o + Math.sin(t / s.speed + s.phase) * s.o * 0.55;
        ctx.beginPath();
        ctx.arc(px < 0 ? px + W : px, py < 0 ? py + H : py, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220,230,255,${Math.max(0.02, Math.min(0.85, twinkle))})`;
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <>
      {/* Star field canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Nebula clouds */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div className="nebula-blob nebula-1" style={{
          position: "absolute", top: "-15%", left: "-10%",
          width: "65vw", height: "65vw",
          background: "radial-gradient(ellipse, rgba(26,10,46,0.55) 0%, rgba(20,8,36,0.3) 40%, transparent 70%)",
          borderRadius: "50%",
        }} />
        <div className="nebula-blob nebula-2" style={{
          position: "absolute", top: "20%", right: "-15%",
          width: "50vw", height: "50vw",
          background: "radial-gradient(ellipse, rgba(10,22,40,0.5) 0%, rgba(8,18,32,0.25) 45%, transparent 70%)",
          borderRadius: "50%",
        }} />
        <div className="nebula-blob nebula-3" style={{
          position: "absolute", bottom: "0%", left: "20%",
          width: "70vw", height: "50vw",
          background: "radial-gradient(ellipse, rgba(18,8,40,0.45) 0%, rgba(10,6,28,0.2) 50%, transparent 70%)",
          borderRadius: "50%",
        }} />
        <div className="nebula-blob nebula-4" style={{
          position: "absolute", top: "50%", left: "-5%",
          width: "40vw", height: "40vw",
          background: "radial-gradient(ellipse, rgba(0,20,40,0.4) 0%, transparent 65%)",
          borderRadius: "50%",
        }} />
      </div>

      {/* Planets — fixed to viewport but with scroll hint */}
      <div style={{ position: "fixed", inset: 0, zIndex: -3, pointerEvents: "none", overflow: "hidden" }}>
        {/* Gas Giant — right side, hero area */}
        <div className="planet-float-1" style={{
          position: "absolute",
          right: "-120px",
          top: "8%",
        }}>
          <PlanetGasGiant />
        </div>

        {/* Ice Planet — left side, mid page */}
        <div className="planet-float-2" style={{
          position: "absolute",
          left: "-60px",
          top: "45%",
        }}>
          <PlanetIce />
        </div>

        {/* Rocky Planet — right side, lower */}
        <div className="planet-float-3" style={{
          position: "absolute",
          right: "8%",
          bottom: "12%",
        }}>
          <PlanetRocky />
        </div>
      </div>

      {/* Ships — animated across screen */}
      <div style={{ position: "fixed", inset: 0, zIndex: 2, pointerEvents: "none", overflow: "hidden" }}>
        {/* Hero ship — slow, left to right, mid-upper */}
        <div className="ship-hero-flight" style={{ position: "absolute", top: "22%", left: 0 }}>
          <ShipHero />
        </div>

        {/* Interceptor — diagonal, faster, plasma tinted */}
        <div className="ship-interceptor-flight" style={{ position: "absolute", top: "60%", left: 0 }}>
          <ShipInterceptor />
        </div>

        {/* Freighter — very slow, high altitude, faint */}
        <div className="ship-freighter-flight" style={{ position: "absolute", top: "6%", left: 0, opacity: 0.35 }}>
          <ShipFreighter />
        </div>

        {/* Patrol ship A */}
        <div className="ship-patrol-a" style={{ position: "absolute", top: "38%", left: 0, opacity: 0.55 }}>
          <ShipInterceptor />
        </div>

        {/* Patrol ship B — right to left */}
        <div className="ship-patrol-b" style={{ position: "absolute", top: "75%", right: 0, opacity: 0.45, transform: "scaleX(-1)" }}>
          <ShipInterceptor />
        </div>
      </div>

      {/* Astronaut — anchored to the bottom-right corner so it stays
          out of card grids and weekly-calendar columns on /my-plan,
          /library, and the textbook reader. Scaled down + lower
          z-index so content cards always layer above. pointerEvents
          off keeps clicks passing through. Hidden on viewports
          under 900px via .astronaut-container in globals.css. */}
      {/* Outer wrapper owns position + scale + opacity so it doesn't
          clobber the transform animations on .astronaut-container
          (drift) and .astronaut-float (bob). */}
      <div
        style={{
          position: "fixed",
          right: "2%",
          bottom: "4%",
          zIndex: 1,
          transform: "scale(0.7)",
          transformOrigin: "bottom right",
          opacity: 0.85,
          pointerEvents: "none",
        }}
      >
        <div className="astronaut-container">
          <div className="astronaut-float">
            <Astronaut />
          </div>
        </div>
      </div>
    </>
  );
}
