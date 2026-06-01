"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
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

// ── Copy per locale ────────────────────────────────────────────────────────
const COPY = {
  en: {
    badge: "MISSION CONTROL — ACTIVE",
    headline: "Learn Fast. Think",
    headlineEm: "Deep.",
    tagline: <>Where ambitious students think deep together<br />— and find each other.</>,
    leftIcon: "🛸",
    leftTitle: "Enter the Classroom",
    leftBody: (
      <>
        AI tutors trained on top-scorer thinking.<br />
        Memory that remembers your gaps.<br />
        Your pattern, your mission.
      </>
    ),
    leftStat: "2 courses live · 7 lessons",
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
    rightHref: "/lounges",
    statsLine: "▸ FIRST COHORT BOARDING",
  },
  // Platform is English-only — `ko` mirror kept identical to `en` so any
  // upstream caller passing locale="ko" still renders the English copy.
  ko: {
    badge: "MISSION CONTROL — ACTIVE",
    headline: "The smartest",
    headlineEm: "classroom ever built.",
    tagline: <>AI tutors that remember how you learn.<br />Find friends just like you.</>,
    leftIcon: "🛸",
    leftTitle: "Start a class",
    leftBody: (
      <>
        AI tutors trained on top-scorer thinking.<br />
        Memory that remembers how you learn.
      </>
    ),
    leftStat: "2 courses live · 7 lessons",
    leftHref: "/courses",
    rightIcon: "◉◉◉",
    rightTitle: "Meet your peers",
    rightBody: (
      <>
        Connect with ambitious students<br />
        chasing the same dreams.<br />
        Research, study, compete — together.
      </>
    ),
    rightHref: "/lounges",
    statsLine: "▸ FIRST COHORT BOARDING",
  },
} as const;

// ── Component ──────────────────────────────────────────────────────────────
export default function HomeHeroDualPath({ locale = "en" }: Props) {
  const copy = COPY[locale];

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
              <span>{copy.leftStat}</span>
            </div>
            <span className={styles.hhCardArrow} aria-hidden="true">→</span>
          </Link>

          <Link href={copy.rightHref} className={`${styles.hhCard} ${styles.hhCardRight}`}>
            <span className={styles.hhCardIcon} aria-hidden="true">{copy.rightIcon}</span>
            <h2 className={styles.hhCardTitle}>{copy.rightTitle}</h2>
            <p className={styles.hhCardBody}>{copy.rightBody}</p>
            <div className={styles.hhCardRule} />
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
