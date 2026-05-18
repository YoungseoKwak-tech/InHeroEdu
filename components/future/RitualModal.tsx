"use client";

/**
 * RitualModal — the chapter-completion celebration.
 *
 * Fires after POST /api/future/chapter-complete returns. Shows
 * a typewriter phrase ("researcher future is clarifying"),
 * counts up the resonance delta for the dominant path, drifts
 * 20 sparkles upward, and dismisses itself in 10s (or sooner
 * on tap). Backdrop blurs whatever's behind it.
 *
 * Intentionally lightweight: pure CSS animations, no library.
 */

import { useEffect, useState } from "react";

export interface RitualDelta {
  slug: string;
  name: string;
  accent: string;
  new_resonance: number;
  delta: number;
  phrase: string;
}

interface Props {
  dominant: RitualDelta | null;
  deltas: RitualDelta[];
  onDismiss: () => void;
}

const AUTO_DISMISS_MS = 10_000;
const TYPE_INTERVAL_MS = 55;
const COUNT_UP_MS = 800;
const SPARKLE_COUNT = 20;

function useTypewriter(text: string, intervalMs = TYPE_INTERVAL_MS): string {
  const [out, setOut] = useState("");
  useEffect(() => {
    setOut("");
    if (!text) return;
    let i = 0;
    const timer = setInterval(() => {
      i++;
      setOut(text.slice(0, i));
      if (i >= text.length) clearInterval(timer);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [text, intervalMs]);
  return out;
}

function useCountUp(target: number, durationMs = COUNT_UP_MS): number {
  const [n, setN] = useState(0);
  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    function step(t: number) {
      const elapsed = t - start;
      const pct = Math.min(1, elapsed / durationMs);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - pct, 3);
      setN(target * eased);
      if (pct < 1) raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs]);
  return n;
}

export default function RitualModal({ dominant, deltas, onDismiss }: Props) {
  const phrase = dominant?.phrase ?? "trace recorded";
  const typed = useTypewriter(phrase);
  const dominantPct = useCountUp(dominant ? Math.round(dominant.new_resonance * 100) : 0);

  // 10s auto-dismiss + Esc / click handler.
  useEffect(() => {
    const timer = setTimeout(onDismiss, AUTO_DISMISS_MS);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter" || e.key === " ") onDismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
  }, [onDismiss]);

  // Stable sparkle seeds — generated once per mount.
  const sparkles = (() => {
    const out: Array<{ left: number; delay: number; duration: number; size: number; accent: string }> = [];
    for (let i = 0; i < SPARKLE_COUNT; i++) {
      out.push({
        left:    (i * 137.5) % 100,
        delay:   (i * 91) % 2000,
        duration: 3500 + ((i * 173) % 2500),
        size:    1 + ((i * 7) % 3),
        accent:  i % 3 === 0 ? "#a99cff" : i % 3 === 1 ? "#5eead4" : "#F4C95D",
      });
    }
    return out;
  })();

  const accent = dominant?.accent ?? "#a99cff";

  return (
    <div className="rt-backdrop" onClick={onDismiss} role="dialog" aria-modal="true">
      <div className="rt-sparkles" aria-hidden="true">
        {sparkles.map((s, i) => (
          <span
            key={i}
            style={{
              left:           `${s.left}%`,
              width:          `${s.size}px`,
              height:         `${s.size}px`,
              background:     s.accent,
              boxShadow:      `0 0 6px ${s.accent}`,
              animationDelay: `${s.delay}ms`,
              animationDuration: `${s.duration}ms`,
            }}
          />
        ))}
      </div>

      <div className="rt-card" onClick={(e) => e.stopPropagation()}>
        <div className="rt-stamp">
          <span className="rt-stamp-dot" />
          <span>RESONANCE EVENT</span>
        </div>

        <div className="rt-glyph" style={{ color: accent, textShadow: `0 0 30px ${accent}99` }}>
          {dominant ? dominant.name.charAt(0) : "✦"}
        </div>

        <h2 className="rt-phrase" style={{ color: accent }}>
          {typed}
          <span className="rt-caret" />
        </h2>

        {dominant && (
          <div className="rt-pct">
            <span className="rt-pct-label">{dominant.name.toLowerCase()} resonance</span>
            <span className="rt-pct-val" style={{ color: accent }}>
              {Math.round(dominantPct)}%
            </span>
          </div>
        )}

        {deltas.length > 1 && (
          <ul className="rt-secondaries">
            {deltas
              .filter((d) => d.slug !== dominant?.slug)
              .slice(0, 3)
              .map((d) => (
                <li key={d.slug} className="rt-secondary">
                  <span style={{ color: d.accent }}>+{Math.round(d.delta * 100)}%</span>
                  <span className="rt-secondary-name">{d.name.toLowerCase()}</span>
                </li>
              ))}
          </ul>
        )}

        <button type="button" className="rt-continue" onClick={onDismiss}>
          continue →
        </button>
        <div className="rt-hint">tap anywhere · auto-closes in 10s</div>
      </div>

      <style>{`
        .rt-backdrop {
          position: fixed; inset: 0; z-index: 200;
          display: flex; align-items: center; justify-content: center;
          background: rgba(5, 6, 16, 0.62);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          animation: rt-fade-in 320ms ease-out;
          padding: 1.5rem;
        }
        @keyframes rt-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .rt-sparkles {
          position: absolute; inset: 0;
          overflow: hidden;
          pointer-events: none;
        }
        .rt-sparkles span {
          position: absolute;
          bottom: -20px;
          border-radius: 50%;
          animation-name: rt-sparkle;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
        }
        @keyframes rt-sparkle {
          0%   { transform: translateY(0)        translateX(0); opacity: 0; }
          15%  { opacity: 1; }
          85%  { opacity: 1; }
          100% { transform: translateY(-110vh)   translateX(20px); opacity: 0; }
        }

        .rt-card {
          position: relative;
          width: min(28rem, 100%);
          padding: 2.5rem 2rem 1.6rem;
          text-align: center;
          background:
            radial-gradient(ellipse at 50% 0%, rgba(169, 156, 255, 0.18), transparent 65%),
            linear-gradient(180deg, rgba(10, 14, 26, 0.96), rgba(8, 10, 18, 0.92));
          border: 1px solid rgba(169, 156, 255, 0.35);
          border-radius: 18px;
          box-shadow: 0 36px 80px rgba(0, 0, 0, 0.6);
          animation: rt-rise 480ms cubic-bezier(0.16, 1, 0.3, 1);
          font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif;
          color: #d8d9e6;
        }
        @keyframes rt-rise {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0)   scale(1);   }
        }

        .rt-stamp {
          display: inline-flex; align-items: center; gap: 0.55rem;
          font-family: ui-monospace, monospace;
          font-size: 0.6rem; font-weight: 700;
          letter-spacing: 0.24em; text-transform: uppercase;
          color: rgba(169, 156, 255, 0.85);
          margin-bottom: 1.5rem;
        }
        .rt-stamp-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #a99cff;
          box-shadow: 0 0 10px rgba(169, 156, 255, 0.7);
          animation: rt-stamp-pulse 1.6s ease-in-out infinite;
        }
        @keyframes rt-stamp-pulse {
          0%,100% { opacity: 0.55; transform: scale(0.85); }
          50%     { opacity: 1;    transform: scale(1.15); }
        }

        .rt-glyph {
          font-family: 'Cormorant Garamond', serif;
          font-size: 4.5rem; font-weight: 600;
          font-style: italic;
          line-height: 1;
          margin-bottom: 1.4rem;
        }

        .rt-phrase {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.4rem, 4vw, 1.85rem);
          font-weight: 600;
          font-style: italic;
          letter-spacing: -0.01em;
          line-height: 1.25;
          min-height: 2.6em;
          margin: 0 0 1.25rem;
        }
        .rt-caret {
          display: inline-block;
          width: 0.5ch;
          margin-left: 0.05em;
          animation: rt-caret-blink 0.85s steps(1) infinite;
        }
        @keyframes rt-caret-blink {
          0%,49%   { opacity: 1; }
          50%,100% { opacity: 0; }
        }

        .rt-pct {
          display: flex; flex-direction: column;
          align-items: center; gap: 0.15rem;
          margin: 0.4rem 0 1.25rem;
        }
        .rt-pct-label {
          font-family: ui-monospace, monospace;
          font-size: 0.66rem; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(148, 163, 184, 0.7);
        }
        .rt-pct-val {
          font-family: 'Cormorant Garamond', serif;
          font-size: 3.2rem; font-weight: 600;
          line-height: 1;
          font-variant-numeric: tabular-nums;
          text-shadow: 0 0 20px currentColor;
        }

        .rt-secondaries {
          list-style: none; margin: 0; padding: 0;
          display: flex; flex-wrap: wrap; gap: 0.45rem 1rem;
          justify-content: center;
          margin-bottom: 1.5rem;
        }
        .rt-secondary {
          font-family: ui-monospace, monospace;
          font-size: 0.74rem;
          letter-spacing: 0.06em;
        }
        .rt-secondary-name {
          color: rgba(148, 163, 184, 0.78);
          margin-left: 0.4rem;
        }

        .rt-continue {
          display: inline-block;
          font-family: ui-monospace, monospace;
          font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          padding: 0.7rem 1.5rem;
          color: #0a0a10;
          background: linear-gradient(135deg, #a99cff, #5eead4);
          border: 0;
          border-radius: 0.45rem;
          cursor: pointer;
          transition: filter 150ms ease, transform 100ms ease, box-shadow 200ms ease;
        }
        .rt-continue:hover {
          filter: brightness(1.08);
          transform: translateY(-1px);
          box-shadow: 0 0 26px rgba(169, 156, 255, 0.45);
        }

        .rt-hint {
          margin-top: 1rem;
          font-family: ui-monospace, monospace;
          font-size: 0.65rem;
          color: rgba(148, 163, 184, 0.55);
          letter-spacing: 0.06em;
        }
      `}</style>
    </div>
  );
}
