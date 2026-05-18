"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { getLiveConfig } from "@/lib/seed/loungeRoster";
import styles from "./HomeHeroDualPath.module.css";

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
      className={styles.hhOrbit}
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
    <section className={styles.hhRoot}>
      <OrbitRings />

      <div className={styles.hhContent}>
        {/* Logo */}
        <div className={styles.hhLogo}>
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
        <div className={styles.hhBadgeWrap}>
          <span className={styles.hhBadge}>
            <span className={styles.hhBadgeDot} aria-hidden="true" />
            {copy.badge}
          </span>
        </div>

        {/* Headline */}
        <h1 className={styles.hhH1}>
          {copy.headline}{" "}
          <span className={styles.hhH1Em}>{copy.headlineEm}</span>
        </h1>

        {/* Tagline — smaller / lighter than the headline */}
        <p className={styles.hhTag}>{copy.tagline}</p>

        {/* Dual-path card grid */}
        <div className={styles.hhGrid}>
          <Link href={copy.leftHref} className={`${styles.hhCard} ${styles.hhCardLeft}`}>
            <span className={styles.hhCardIcon} aria-hidden="true">{copy.leftIcon}</span>
            <h2 className={styles.hhCardTitle}>{copy.leftTitle}</h2>
            <p className={styles.hhCardBody}>{copy.leftBody}</p>
            <div className={styles.hhCardRule} />
            <div className={styles.hhCardStats}>
              <span>{copy.leftStat1}</span>
              <span>{copy.leftStat2}</span>
            </div>
            <span className={styles.hhCardArrow} aria-hidden="true">→</span>
          </Link>

          <Link href={copy.rightHref} className={`${styles.hhCard} ${styles.hhCardRight}`}>
            <span className={styles.hhCardIcon} aria-hidden="true">{copy.rightIcon}</span>
            <h2 className={styles.hhCardTitle}>{copy.rightTitle}</h2>
            <p className={styles.hhCardBody}>{copy.rightBody}</p>
            <div className={styles.hhCardRule} />
            <div className={styles.hhCardStats}>
              <span className={styles.hhOnlineRow}>
                <span className={styles.hhOnlineDot} aria-hidden="true" />
                {locale === "ko" ? (
                  <>
                    지금 <span key={`online-${online}`} className={styles.hhNumFade}>{online}</span>{copy.rightStat1Suffix}
                  </>
                ) : (
                  <>
                    <span key={`online-${online}`} className={styles.hhNumFade}>{online}</span> {copy.rightStat1Suffix}
                  </>
                )}
              </span>
              <span>
                {locale === "ko" ? (
                  <>지금 <span className={styles.hhTypingNum}>{typing}</span>{copy.rightStat2Suffix}</>
                ) : (
                  <><span className={styles.hhTypingNum}>{typing}</span> {copy.rightStat2Suffix}</>
                )}
              </span>
            </div>
            <span className={styles.hhCardArrow} aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Proof bar — preserved, moved below the cards */}
        <div className={styles.hhStats}>{copy.statsLine}</div>
      </div>

      <div className={styles.hhBottomFade} aria-hidden="true" />

    </section>
  );
}
