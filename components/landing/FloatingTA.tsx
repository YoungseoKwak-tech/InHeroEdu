"use client";

/**
 * FloatingTA — always-on bottom-right widget on the home page.
 * Hover → snarky speech bubble. Click → /ai-companion (AI chat).
 */

import Link from "next/link";
import { useEffect, useState } from "react";

const QUIPS = [
  "Prof. Coulomb is in a bad mood today. Ask me instead.",
  "Are you still on that slide?",
  "+ C. Don't forget the +C.",
  "Cite the line number, please. From memory if you must.",
  "I read your textbook before you. Reluctantly.",
  "The professors are not picking up. Try me.",
];

export default function FloatingTA() {
  const [open, setOpen] = useState(false);
  const [quip, setQuip] = useState(QUIPS[0]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setQuip(QUIPS[Math.floor(Math.random() * QUIPS.length)]);
    // Auto-rotate the quip every 18s while the widget is alive
    const t = window.setInterval(() => {
      setQuip(QUIPS[Math.floor(Math.random() * QUIPS.length)]);
    }, 18000);
    return () => window.clearInterval(t);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fta-root">
      {open && (
        <div className="fta-bubble" role="tooltip">
          <span className="fta-bubble-text">"{quip}"</span>
          <span className="fta-bubble-arrow" aria-hidden="true" />
        </div>
      )}
      <Link
        href="/ai-companion"
        className="fta-button"
        aria-label="Ask the TA (AI Companion)"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
      >
        <svg viewBox="0 0 64 64" className="fta-svg" aria-hidden="true">
          <defs>
            <radialGradient id="ftaFace" cx="50%" cy="40%" r="55%">
              <stop offset="0%" stopColor="#3a3a44" />
              <stop offset="100%" stopColor="#0a0a10" />
            </radialGradient>
            <linearGradient id="ftaHood" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1a1a22" />
              <stop offset="100%" stopColor="#08080d" />
            </linearGradient>
          </defs>
          {/* Hood */}
          <path d="M 8 60 L 8 30 Q 8 14 32 12 Q 56 14 56 30 L 56 60 Z" fill="url(#ftaHood)" />
          {/* Face */}
          <ellipse cx="32" cy="32" rx="14" ry="16" fill="url(#ftaFace)" />
          {/* Dark circles */}
          <ellipse cx="27" cy="35" rx="2.4" ry="0.8" fill="rgba(0,0,0,0.55)" />
          <ellipse cx="37" cy="35" rx="2.4" ry="0.8" fill="rgba(0,0,0,0.55)" />
          {/* TA pin */}
          <circle cx="46" cy="46" r="6" fill="#A99CFF" />
          <text x="42.5" y="49.2" fontSize="6" fontFamily="ui-monospace, monospace" fill="#0a0a10" fontWeight="700">TA</text>
        </svg>
        <span className="fta-label">ASK THE TA</span>
      </Link>

      <style>{`
        .fta-root {
          position: fixed;
          right: 1.25rem;
          bottom: 1.25rem;
          z-index: 60;
          display: flex; flex-direction: column; align-items: flex-end;
          gap: 0.5rem;
          font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif;
          animation: fta-pop 0.35s cubic-bezier(0.2, 0.8, 0.25, 1) both;
        }
        @keyframes fta-pop {
          from { opacity: 0; transform: translateY(20px) scale(0.92); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .fta-bubble {
          position: relative;
          max-width: 16rem;
          padding: 0.65rem 0.85rem;
          background: rgba(7, 10, 20, 0.92);
          border: 1px solid rgba(169, 156, 255, 0.35);
          border-radius: 0.55rem;
          color: #f3f3fb;
          backdrop-filter: blur(10px);
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(169,156,255,0.1);
        }
        .fta-bubble-text {
          font-family: 'Cormorant Garamond', 'Georgia', serif;
          font-style: italic;
          font-size: 0.86rem;
          line-height: 1.4;
          color: #f3f3fb;
        }
        .fta-bubble-arrow {
          position: absolute;
          right: 1.25rem; bottom: -7px;
          width: 12px; height: 12px;
          background: rgba(7, 10, 20, 0.92);
          border-right: 1px solid rgba(169,156,255,0.35);
          border-bottom: 1px solid rgba(169,156,255,0.35);
          transform: rotate(45deg);
        }
        .fta-button {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          padding: 0.45rem 0.95rem 0.45rem 0.45rem;
          background: rgba(7, 10, 20, 0.85);
          border: 1px solid rgba(169, 156, 255, 0.35);
          border-radius: 999px;
          color: #f3f3fb;
          text-decoration: none;
          cursor: pointer;
          backdrop-filter: blur(10px);
          box-shadow:
            0 20px 50px rgba(0,0,0,0.55),
            0 0 0 1px rgba(169,156,255,0.18),
            0 0 24px rgba(169,156,255,0.18);
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        }
        .fta-button:hover {
          transform: translateY(-2px);
          border-color: rgba(169,156,255,0.7);
          box-shadow:
            0 26px 60px rgba(0,0,0,0.65),
            0 0 0 1px #A99CFF,
            0 0 32px rgba(169,156,255,0.45);
        }
        .fta-svg {
          width: 38px; height: 38px;
          border-radius: 50%;
          background: rgba(255,255,255,0.04);
          display: block;
        }
        .fta-label {
          font-family: ui-monospace, 'JetBrains Mono', monospace;
          font-size: 0.66rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #d8d9e6;
        }

        @media (max-width: 540px) {
          .fta-label { display: none; }
          .fta-button { padding: 0.35rem; }
        }
        @media (prefers-reduced-motion: reduce) {
          .fta-root, .fta-button { animation: none; transition: none; }
        }
      `}</style>
    </div>
  );
}
