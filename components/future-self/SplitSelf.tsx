"use client";

/**
 * SplitSelf — one stylized humanoid, vertically split.
 * Left half = current self (desaturated, glitching). Right half =
 * ideal self (violet → teal gradient, glowing). The seam between
 * them shifts based on `synchronization` (0–100). At max sync the
 * seam still leaves ~10% of "current" visible — the imperfection
 * is intentional.
 *
 * No facial features by design — students project onto the form.
 * SVG-only; all animations are CSS keyframes.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { seamPositionPct } from "@/lib/future-self/compute";

interface Props {
  synchronization: number; // 0–100
  recentActivity?: "studying" | "idle" | "doomscrolling" | null;
  /** Bump this number to fire a one-shot sync pulse. The parent
   *  controls when (e.g. on /future mount after a chapter complete). */
  pulseToken?: number;
}

// Single humanoid silhouette path centered at x=200 in a 400×700
// viewBox. Head + neck + shoulders + torso. Wide enough that both
// halves read as a body after clipping.
function BodyShape({ pathStrokeOpacity = 1, fillId, strokeId, filter }: {
  pathStrokeOpacity?: number;
  fillId?: string;
  strokeId?: string;
  filter?: string;
}) {
  return (
    <g filter={filter}>
      {/* Head */}
      <circle cx="200" cy="155" r="56" fill={fillId ? `url(#${fillId})` : "currentColor"}
        stroke={strokeId ? `url(#${strokeId})` : undefined}
        strokeWidth={strokeId ? 1.5 : 0}
        strokeOpacity={pathStrokeOpacity} />
      {/* Neck */}
      <path d="M178 208 L178 232 Q200 244 222 232 L222 208 Z"
        fill={fillId ? `url(#${fillId})` : "currentColor"} />
      {/* Shoulders + torso */}
      <path d="M122 290 Q200 252 278 290 L294 540 Q200 568 106 540 Z"
        fill={fillId ? `url(#${fillId})` : "currentColor"}
        stroke={strokeId ? `url(#${strokeId})` : undefined}
        strokeWidth={strokeId ? 1.2 : 0}
        strokeOpacity={pathStrokeOpacity * 0.6} />
    </g>
  );
}

// Small orbital sparks that drift around the right (ideal) side
// of the figure. Count scales with sync.
function OrbitParticles({ count }: { count: number }) {
  const particles = useMemo(() => {
    const out: Array<{ cx: number; cy: number; delay: number; dur: number; size: number }> = [];
    for (let i = 0; i < count; i++) {
      const angle = (i * 137.5) % 360;
      const rad = 130 + ((i * 17) % 60);
      const cx = 200 + Math.cos((angle * Math.PI) / 180) * rad;
      const cy = 350 + Math.sin((angle * Math.PI) / 180) * rad;
      out.push({
        cx, cy,
        delay: (i * 0.27) % 3,
        dur: 3.5 + ((i * 0.43) % 2.5),
        size: 1 + ((i * 0.91) % 2.5),
      });
    }
    return out;
  }, [count]);
  return (
    <g>
      {particles.map((p, i) => (
        <circle
          key={i}
          cx={p.cx} cy={p.cy} r={p.size}
          fill="#a78bfa"
          opacity={0.6}
          style={{
            animation: `ss-orbit-fade ${p.dur}s ease-in-out ${p.delay}s infinite`,
            transformOrigin: "200px 350px",
          }}
        />
      ))}
    </g>
  );
}

export default function SplitSelf({ synchronization, pulseToken = 0 }: Props) {
  const seamX = seamPositionPct(synchronization);
  const pulsingRef = useRef(false);
  const [pulsing, setPulsing] = useState(false);
  // Seed for the static noise filter — stable per mount so the
  // texture doesn't flicker on every render.
  const seed = useMemo(() => Math.floor(Math.random() * 1000), []);

  // Fire a one-shot 1.5s pulse animation whenever pulseToken changes.
  useEffect(() => {
    if (pulseToken === 0) return;
    if (pulsingRef.current) return;
    pulsingRef.current = true;
    setPulsing(true);
    const t = setTimeout(() => {
      setPulsing(false);
      pulsingRef.current = false;
    }, 1500);
    return () => clearTimeout(t);
  }, [pulseToken]);

  // Particle count scales with sync (max 12 once fully right-dominant).
  const orbitCount = Math.max(0, Math.min(12, Math.floor(synchronization / 9)));

  return (
    <div className={`ss-wrap ${pulsing ? "is-pulsing" : ""}`}>
      <svg
        viewBox="0 0 400 700"
        className="ss-svg"
        role="img"
        aria-label={`Self synchronization ${Math.round(synchronization)} percent`}
      >
        <defs>
          {/* Ideal gradient — violet to teal, vertical. */}
          <linearGradient id="ss-ideal" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor="#a78bfa" />
            <stop offset="60%" stopColor="#7d83e9" />
            <stop offset="100%" stopColor="#5eead4" />
          </linearGradient>
          <linearGradient id="ss-ideal-stroke" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#5eead4" />
          </linearGradient>
          {/* Current self — dim grey, no chroma. */}
          <linearGradient id="ss-current" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"  stopColor="#3a3a4a" />
            <stop offset="100%" stopColor="#2a2a36" />
          </linearGradient>
          {/* Aura behind the right (ideal) side. */}
          <radialGradient id="ss-aura" cx="50%" cy="48%" r="50%">
            <stop offset="0%"  stopColor="rgba(167,139,250,0.35)" />
            <stop offset="55%" stopColor="rgba(94,234,212,0.12)" />
            <stop offset="100%" stopColor="rgba(167,139,250,0)" />
          </radialGradient>

          {/* Static noise filter on the current half. */}
          <filter id="ss-noise" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={seed} result="t" />
            <feColorMatrix in="t" values="0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 0.45 0" result="noise" />
            <feComposite in="noise" in2="SourceGraphic" operator="in" result="masked" />
            <feMerge>
              <feMergeNode in="SourceGraphic" />
              <feMergeNode in="masked" />
            </feMerge>
          </filter>

          {/* Glitch-displace filter — used on a delayed flicker. */}
          <filter id="ss-glitch">
            <feTurbulence baseFrequency="0.02 0.5" numOctaves="2" seed={seed + 7} result="g" />
            <feDisplacementMap in="SourceGraphic" in2="g" scale="2.5" />
          </filter>

          {/* Clip the body into left/right halves at the seam. */}
          <clipPath id="ss-clip-left">
            <rect x="0" y="0" width={`${seamX}%`} height="100%" />
          </clipPath>
          <clipPath id="ss-clip-right">
            <rect x={`${seamX}%`} y="0" width={`${100 - seamX}%`} height="100%" />
          </clipPath>
        </defs>

        {/* Aura behind the right side */}
        <ellipse
          cx={200 + (100 - seamX) * 0.6}
          cy="350"
          rx="200" ry="250"
          fill="url(#ss-aura)"
          className="ss-aura"
        />

        {/* LEFT — current self, desaturated + noisy + flickering */}
        <g clipPath="url(#ss-clip-left)" className="ss-current ss-flicker">
          <BodyShape fillId="ss-current" filter="url(#ss-noise)" />
          {/* Dim eye */}
          <ellipse cx="180" cy="148" rx="6" ry="3" fill="#15151f" opacity="0.85" />
          {/* Asymmetric drooped shoulder hint */}
          <path d="M122 290 Q150 305 178 295" stroke="#1c1c28" strokeWidth="1.4" fill="none" opacity="0.7" />
        </g>

        {/* RIGHT — ideal self, gradient + glow */}
        <g clipPath="url(#ss-clip-right)" className="ss-ideal ss-breathe">
          <BodyShape fillId="ss-ideal" strokeId="ss-ideal-stroke" />
          {/* Bright eye */}
          <circle cx="218" cy="148" r="3" fill="#fff" className="ss-eye" />
          <circle cx="218" cy="148" r="9" fill="#a78bfa" opacity="0.32" className="ss-eye-glow" />
          {/* Calm raised shoulder */}
          <path d="M222 286 Q252 268 278 290" stroke="#5eead4" strokeWidth="1.4" fill="none" opacity="0.6" />
          {/* Inner constellation stars */}
          <circle cx="222" cy="320" r="1.8" fill="#a78bfa">
            <animate attributeName="opacity" values="0.4;1;0.4" dur="3.2s" repeatCount="indefinite" />
          </circle>
          <circle cx="238" cy="400" r="1.6" fill="#5eead4">
            <animate attributeName="opacity" values="0.4;0.9;0.4" dur="4.1s" repeatCount="indefinite" />
          </circle>
          <circle cx="218" cy="470" r="1.4" fill="#F4C95D">
            <animate attributeName="opacity" values="0.3;0.85;0.3" dur="2.6s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* Right-side orbital sparks */}
        <g clipPath="url(#ss-clip-right)">
          <OrbitParticles count={orbitCount} />
        </g>

        {/* THE SEAM — vertical cosmic crack */}
        <g className="ss-seam">
          <line
            x1={`${seamX}%`} y1="80"
            x2={`${seamX}%`} y2="600"
            stroke="url(#ss-ideal-stroke)"
            strokeWidth="1.5"
            className="ss-seam-line"
          />
          {/* Glitch fragments along the seam */}
          {Array.from({ length: 9 }).map((_, i) => (
            <circle
              key={i}
              cx={`${seamX}%`}
              cy={100 + i * 58}
              r={i % 2 ? 2 : 1.5}
              fill="#a78bfa"
              className="ss-seam-particle"
              style={{ animationDelay: `${i * 0.32}s` }}
            />
          ))}
          {/* Light leak at top of seam */}
          <circle cx={`${seamX}%`} cy="80" r="5" fill="#a78bfa" opacity="0.5" className="ss-seam-leak" />
          <circle cx={`${seamX}%`} cy="600" r="4" fill="#5eead4" opacity="0.4" className="ss-seam-leak" />
        </g>
      </svg>

      <style>{`
        .ss-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 400 / 700;
        }
        .ss-svg {
          width: 100%;
          height: 100%;
          display: block;
        }
        /* Smooth seam migration when sync changes. */
        .ss-svg clipPath rect { transition: width 800ms cubic-bezier(0.16, 1, 0.3, 1), x 800ms cubic-bezier(0.16, 1, 0.3, 1); }
        .ss-svg .ss-seam line,
        .ss-svg .ss-seam circle { transition: cx 800ms cubic-bezier(0.16, 1, 0.3, 1), x1 800ms cubic-bezier(0.16, 1, 0.3, 1), x2 800ms cubic-bezier(0.16, 1, 0.3, 1); }

        /* ── Left / current side ────────────────────────────── */
        .ss-flicker { animation: ss-flicker 4.8s steps(1) infinite; }
        @keyframes ss-flicker {
          0%, 88%, 100%      { opacity: 1; transform: translateX(0); }
          89%                { opacity: 0.75; transform: translateX(0.6px); }
          90%                { opacity: 1; transform: translateX(-0.6px); }
          91%                { opacity: 0.88; }
          92%                { opacity: 1; transform: translateX(0); }
        }

        /* ── Right / ideal side ─────────────────────────────── */
        .ss-breathe { animation: ss-breathe 4.5s ease-in-out infinite; transform-origin: 50% 50%; }
        @keyframes ss-breathe {
          0%, 100% { filter: drop-shadow(0 0 8px rgba(167,139,250,0.45)); }
          50%      { filter: drop-shadow(0 0 22px rgba(167,139,250,0.7)); }
        }
        .ss-eye      { animation: ss-eye-pulse 3.2s ease-in-out infinite; }
        .ss-eye-glow { animation: ss-eye-pulse 3.2s ease-in-out infinite; }
        @keyframes ss-eye-pulse {
          0%, 100% { opacity: 0.85; }
          50%      { opacity: 1; }
        }

        /* ── Aura behind right side ─────────────────────────── */
        .ss-aura { animation: ss-aura-breathe 6.5s ease-in-out infinite; transform-origin: center; transform-box: fill-box; }
        @keyframes ss-aura-breathe {
          0%, 100% { opacity: 0.45; transform: scale(0.96); }
          50%      { opacity: 0.72; transform: scale(1.06); }
        }

        /* ── Seam ────────────────────────────────────────────── */
        .ss-seam-line { animation: ss-seam-shimmer 2.2s ease-in-out infinite; }
        @keyframes ss-seam-shimmer {
          0%, 100% { opacity: 0.55; filter: drop-shadow(0 0 2px #a78bfa); }
          50%      { opacity: 1;    filter: drop-shadow(0 0 5px #a78bfa); }
        }
        .ss-seam-particle {
          opacity: 0;
          animation-name: ss-seam-drift;
          animation-duration: 3.2s;
          animation-iteration-count: infinite;
          animation-timing-function: ease-out;
        }
        @keyframes ss-seam-drift {
          0%   { opacity: 0; transform: translateY(8px); }
          20%  { opacity: 1; }
          90%  { opacity: 0.7; }
          100% { opacity: 0; transform: translateY(-22px); }
        }
        .ss-seam-leak { animation: ss-seam-shimmer 2.6s ease-in-out infinite; }

        @keyframes ss-orbit-fade {
          0%, 100% { opacity: 0.25; }
          50%      { opacity: 0.85; }
        }

        /* ── One-shot pulse fired when pulseToken bumps ─────── */
        .ss-wrap.is-pulsing .ss-ideal { animation: ss-sync-pulse 1.5s ease-out, ss-breathe 4.5s ease-in-out 1.5s infinite; }
        .ss-wrap.is-pulsing .ss-aura  { animation: ss-aura-flash 1.5s ease-out, ss-aura-breathe 6.5s ease-in-out 1.5s infinite; }
        @keyframes ss-sync-pulse {
          0%   { filter: drop-shadow(0 0 0    rgba(167,139,250,0)); }
          30%  { filter: drop-shadow(0 0 36px rgba(167,139,250,0.95)); }
          100% { filter: drop-shadow(0 0 8px  rgba(167,139,250,0.45)); }
        }
        @keyframes ss-aura-flash {
          0%   { opacity: 0.45; transform: scale(1); }
          30%  { opacity: 0.95; transform: scale(1.18); }
          100% { opacity: 0.45; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
