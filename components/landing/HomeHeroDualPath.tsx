"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { getLiveConfig } from "@/lib/seed/loungeRoster";

type Locale = "en" | "ko";

interface Props {
  locale?: Locale;
}

// ── Orbiting particle rings (carried over from the previous Hero) ──────────
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
      Array.from({ length: 8 }, (_, i) => ({
        angle: (i / 8) * Math.PI * 2,
        radius: 200,
        speed: (Math.PI * 2) / (15 * 60),
        size: 2.5,
        color: "0,255,136",
        opacity: 0.5 + Math.random() * 0.4,
      })),
      Array.from({ length: 12 }, (_, i) => ({
        angle: (i / 12) * Math.PI * 2,
        radius: 290,
        speed: (Math.PI * 2) / (25 * 60),
        size: 2,
        color: i % 3 === 0 ? "123,97,255" : i % 3 === 1 ? "0,255,136" : "255,255,255",
        opacity: 0.35 + Math.random() * 0.4,
      })),
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
          const y = cy + Math.sin(p.angle) * p.radius * 0.35;
          const grd = ctx.createRadialGradient(x, y, 0, x, y, p.size * 3);
          grd.addColorStop(0, `rgba(${p.color},${p.opacity})`);
          grd.addColorStop(1, `rgba(${p.color},0)`);
          ctx.beginPath();
          ctx.arc(x, y, p.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();
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
      className="hh-orbit"
      aria-hidden="true"
    />
  );
}

// ── Live drifting counters (reuse the LiveActivityHeader pattern) ──────────
function useDriftingOnline(): number {
  const cfg = getLiveConfig("home");
  const [value, setValue] = useState(cfg.onlineBase);
  // 30s drift per spec, subtle.
  useEffect(() => {
    const min = cfg.onlineBase - cfg.onlineRange;
    const max = cfg.onlineBase + cfg.onlineRange;
    const t = window.setInterval(() => {
      setValue((prev) => {
        const drift = Math.round((Math.random() - 0.5) * 12);
        return Math.max(min, Math.min(max, prev + drift));
      });
    }, 30_000);
    return () => window.clearInterval(t);
  }, [cfg]);
  return value;
}

function useDriftingTyping(): number {
  const cfg = getLiveConfig("home");
  const [value, setValue] = useState(cfg.typingBase);
  // 5–8s fluctuation per spec, with occasional dip toward 0–3.
  useEffect(() => {
    let dipUntil = 0;
    let timer: number;
    const tick = () => {
      const now = Date.now();
      if (now < dipUntil) {
        setValue(Math.floor(Math.random() * 4));
      } else if (Math.random() < 0.07) {
        dipUntil = now + 5000;
      } else {
        const base = cfg.typingBase;
        const range = cfg.typingRange;
        setValue(base - range + Math.floor(Math.random() * (range * 2 + 1)));
      }
      const next = 5000 + Math.floor(Math.random() * 3001); // 5–8s
      timer = window.setTimeout(tick, next);
    };
    timer = window.setTimeout(tick, 5000 + Math.floor(Math.random() * 3001));
    return () => window.clearTimeout(timer);
  }, [cfg]);
  return value;
}

// ── Copy per locale ────────────────────────────────────────────────────────
const COPY = {
  en: {
    badge: "MISSION CONTROL — ACTIVE",
    headline: "The Smartest Classroom",
    headlineEm: "Ever.",
    tagline: <>Where ambitious students learn from Ivy<br />— and find each other.</>,
    leftIcon: "🛸",
    leftTitle: "Enter the Classroom",
    leftBody: (
      <>
        Ivy League instructors.<br />
        AI that remembers your gaps.<br />
        Your pattern, your mission.
      </>
    ),
    leftStat1: "42 courses ready",
    leftStat2: "631 lessons deployed",
    leftHref: "/academy",
    rightIcon: "◉◉◉",
    rightTitle: "Find Your People",
    rightBody: (
      <>
        Talk to ambitious students<br />
        preparing for the same dreams.<br />
        Build research, study, win competitions together.
      </>
    ),
    rightStat1Suffix: "online now",
    rightStat2Suffix: "typing right now",
    rightHref: "/lounges",
    statsLine: "▸ 1,800+ MISSIONS LOGGED · 631 LESSONS DEPLOYED · HERO FACULTY: ACTIVE",
  },
  ko: {
    badge: "MISSION CONTROL — ACTIVE",
    headline: "역대 가장 똑똑한",
    headlineEm: "교실.",
    tagline: <>Ivy 강사에게 배우고,<br />너 같은 친구들을 찾아.</>,
    leftIcon: "🛸",
    leftTitle: "수업 시작하기",
    leftBody: (
      <>
        Ivy 리그 강사들.<br />
        너의 학습 패턴을 기억하는 AI.
      </>
    ),
    leftStat1: "강의 42개 준비됨",
    leftStat2: "레슨 631개 배포됨",
    leftHref: "/kr/courses",
    rightIcon: "◉◉◉",
    rightTitle: "친구들 만나기",
    rightBody: (
      <>
        같은 꿈을 준비하는<br />
        ambitious한 학생들과 연결.<br />
        연구, 스터디, 대회를 함께.
      </>
    ),
    rightStat1Suffix: "명 접속 중",
    rightStat2Suffix: "명 입력 중",
    rightHref: "/lounges",
    statsLine: "▸ 미션 1,800+ 기록 · 레슨 631개 배포 · 히어로 강사진 활동 중",
  },
} as const;

// ── Component ──────────────────────────────────────────────────────────────
export default function HomeHeroDualPath({ locale = "en" }: Props) {
  const copy = COPY[locale];
  const online = useDriftingOnline();
  const typing = useDriftingTyping();

  return (
    <section className="hh-root">
      <OrbitRings />

      <div className="hh-content">
        {/* Logo */}
        <div className="hh-logo">
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

        {/* MISSION CONTROL HUD badge — preserved from previous hero */}
        <div className="hh-badge-wrap">
          <span className="hh-badge">
            <span className="hh-badge-dot" aria-hidden="true" />
            {copy.badge}
          </span>
        </div>

        {/* Headline */}
        <h1 className="hh-h1">
          {copy.headline}{" "}
          <span className="hh-h1-em">{copy.headlineEm}</span>
        </h1>

        {/* Tagline — smaller / lighter than the headline */}
        <p className="hh-tag">{copy.tagline}</p>

        {/* Dual-path card grid */}
        <div className="hh-grid">
          <Link href={copy.leftHref} className="hh-card hh-card-left">
            <span className="hh-card-icon" aria-hidden="true">{copy.leftIcon}</span>
            <h2 className="hh-card-title">{copy.leftTitle}</h2>
            <p className="hh-card-body">{copy.leftBody}</p>
            <div className="hh-card-rule" />
            <div className="hh-card-stats">
              <span>{copy.leftStat1}</span>
              <span>{copy.leftStat2}</span>
            </div>
            <span className="hh-card-arrow" aria-hidden="true">→</span>
          </Link>

          <Link href={copy.rightHref} className="hh-card hh-card-right">
            <span className="hh-card-icon" aria-hidden="true">{copy.rightIcon}</span>
            <h2 className="hh-card-title">{copy.rightTitle}</h2>
            <p className="hh-card-body">{copy.rightBody}</p>
            <div className="hh-card-rule" />
            <div className="hh-card-stats">
              <span className="hh-online-row">
                <span className="hh-online-dot" aria-hidden="true" />
                {locale === "ko" ? (
                  <>
                    지금 <span key={`online-${online}`} className="hh-num-fade">{online}</span>{copy.rightStat1Suffix}
                  </>
                ) : (
                  <>
                    <span key={`online-${online}`} className="hh-num-fade">{online}</span> {copy.rightStat1Suffix}
                  </>
                )}
              </span>
              <span>
                {locale === "ko" ? (
                  <>지금 <span className="hh-typing-num">{typing}</span>{copy.rightStat2Suffix}</>
                ) : (
                  <><span className="hh-typing-num">{typing}</span> {copy.rightStat2Suffix}</>
                )}
              </span>
            </div>
            <span className="hh-card-arrow" aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Proof bar — preserved, moved below the cards */}
        <div className="hh-stats">{copy.statsLine}</div>
      </div>

      <div className="hh-bottom-fade" aria-hidden="true" />

      <style>{`
        .hh-root {
          position: relative;
          min-height: 100vh;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          overflow: hidden;
          padding: 80px 24px;
        }
        .hh-orbit {
          position: absolute;
          top: 50%; left: 50%;
          width: 900px; height: 900px;
          margin: -450px 0 0 -450px;
          pointer-events: none;
          z-index: 0;
          opacity: 0.5;
        }
        .hh-content {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 1080px;
          margin: 0 auto;
          text-align: center;
        }
        .hh-logo { margin-bottom: 32px; }

        /* MISSION CONTROL badge */
        .hh-badge-wrap { margin-bottom: 24px; }
        .hh-badge {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 8px 18px;
          background: rgba(0,255,136,0.05);
          border: 1px solid rgba(0,255,136,0.2);
          border-radius: 3px;
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 11px; font-weight: 600;
          letter-spacing: 0.18em;
          color: #00FF88;
          text-transform: uppercase;
        }
        .hh-badge-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #00FF88;
          box-shadow: 0 0 8px rgba(0,255,136,0.85);
          flex-shrink: 0;
          animation: hh-pulse 1.5s ease-in-out infinite;
        }

        /* Headline */
        .hh-h1 {
          font-family: 'Space Grotesk', system-ui, sans-serif;
          font-size: clamp(40px, 6.4vw, 80px);
          font-weight: 700;
          line-height: 1.02;
          letter-spacing: -0.03em;
          color: #FFFFFF;
          margin: 0;
          text-shadow: 0 0 60px rgba(0,255,136,0.12);
        }
        .hh-h1-em {
          background: linear-gradient(135deg, #ffffff 0%, #a0ffd6 40%, #00FF88 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* Tagline — smaller / lighter than headline */
        .hh-tag {
          font-family: 'Cormorant Garamond', 'Inter', serif;
          font-size: clamp(16px, 1.6vw, 20px);
          line-height: 1.55;
          color: rgba(216, 217, 230, 0.78);
          margin: 18px auto 48px;
          max-width: 600px;
          font-style: italic;
        }

        /* Card grid */
        .hh-grid {
          display: grid;
          grid-template-columns: minmax(0, 480px) minmax(0, 480px);
          gap: 32px;
          justify-content: center;
          margin-bottom: 40px;
        }
        @media (max-width: 860px) {
          .hh-grid { grid-template-columns: 1fr; max-width: 480px; margin-left: auto; margin-right: auto; }
        }

        .hh-card {
          position: relative;
          display: flex; flex-direction: column;
          text-align: left;
          padding: 32px 32px 60px;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(8, 10, 18, 0.65);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          color: #f3f3fb;
          text-decoration: none;
          overflow: hidden;
          transition: transform 280ms cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 280ms ease,
                      box-shadow 320ms ease;
        }
        /* Card-specific radial glow */
        .hh-card::before {
          content: "";
          position: absolute; inset: 0;
          pointer-events: none;
          z-index: 0;
          opacity: 0.55;
          transition: opacity 320ms ease;
        }
        .hh-card-left::before {
          background: radial-gradient(ellipse at 30% 0%, rgba(125, 211, 252, 0.18) 0%, transparent 55%);
        }
        .hh-card-right::before {
          background: radial-gradient(ellipse at 70% 0%, rgba(244, 201, 93, 0.18) 0%, transparent 55%);
        }
        .hh-card > * { position: relative; z-index: 1; }

        .hh-card:hover {
          transform: translateY(-4px);
          border-color: rgba(255,255,255,0.32);
          box-shadow:
            0 24px 48px rgba(0,0,0,0.45),
            0 0 0 1px rgba(255,255,255,0.04) inset;
        }
        .hh-card-left:hover {
          box-shadow:
            0 24px 48px rgba(0,0,0,0.45),
            0 0 32px rgba(125, 211, 252, 0.22);
        }
        .hh-card-right:hover {
          box-shadow:
            0 24px 48px rgba(0,0,0,0.45),
            0 0 32px rgba(244, 201, 93, 0.22);
        }
        .hh-card:hover::before { opacity: 0.85; }

        .hh-card-icon {
          font-size: 32px;
          line-height: 1;
          margin-bottom: 20px;
          font-family: 'Apple Color Emoji', 'Segoe UI Emoji', sans-serif;
          letter-spacing: 0.08em;
        }
        .hh-card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 32px;
          font-weight: 600;
          line-height: 1.1;
          color: #ffffff;
          margin: 0 0 16px;
          letter-spacing: -0.01em;
        }
        .hh-card-body {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 15px;
          line-height: 1.65;
          color: rgba(216, 217, 230, 0.78);
          margin: 0 0 22px;
        }
        .hh-card-rule {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, rgba(255,255,255,0.18), transparent);
          margin-bottom: 14px;
        }
        .hh-card-stats {
          display: flex; flex-direction: column;
          gap: 6px;
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 12.5px;
          letter-spacing: 0.04em;
          color: rgba(216, 217, 230, 0.72);
        }
        .hh-card-stats strong { color: #f3f3fb; font-weight: 700; }

        .hh-online-row { display: inline-flex; align-items: center; gap: 8px; }
        .hh-online-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #5DCAA5;
          box-shadow: 0 0 8px rgba(93, 202, 165, 0.85);
          animation: hh-pulse 1.5s ease-in-out infinite;
          flex-shrink: 0;
        }
        .hh-num-fade {
          color: #f3f3fb;
          font-weight: 700;
          font-variant-numeric: tabular-nums;
          display: inline-block;
          animation: hh-num-fade-in 0.4s ease-out;
        }
        .hh-typing-num {
          color: #f3f3fb;
          font-weight: 700;
          font-variant-numeric: tabular-nums;
        }

        .hh-card-arrow {
          position: absolute;
          right: 28px; bottom: 24px;
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 22px;
          color: rgba(255,255,255,0.45);
          transition: transform 220ms cubic-bezier(0.16, 1, 0.3, 1),
                      color 220ms ease;
        }
        .hh-card:hover .hh-card-arrow {
          transform: translateX(4px);
          color: #ffffff;
        }

        /* Proof bar — moved below the cards */
        .hh-stats {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 14px 26px;
          background: rgba(0, 255, 136, 0.03);
          border: 1px solid rgba(0, 255, 136, 0.1);
          border-radius: 3px;
          font-family: 'JetBrains Mono', ui-monospace, monospace;
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.12em;
          color: #00FF88;
          margin: 0 auto;
        }

        .hh-bottom-fade {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 140px;
          background: linear-gradient(to bottom, transparent, #00000A);
          pointer-events: none;
          z-index: 5;
        }

        @keyframes hh-pulse {
          0%, 100% { opacity: 0.4; transform: scale(0.85); }
          50%      { opacity: 1;   transform: scale(1.2); }
        }
        @keyframes hh-num-fade-in {
          from { opacity: 0.3; transform: translateY(1px); }
          to   { opacity: 1;   transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
