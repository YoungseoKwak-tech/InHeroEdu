"use client";

import { useEffect, useState } from "react";
import { getLiveConfig } from "@/lib/seed/loungeRoster";

interface Props {
  slug: string;
}

/**
 * Ambient liveness header: pulsing green online dot + online count + messages
 * today + typing count. Numbers drift inside a per-slug band; the typing
 * count occasionally dips toward 0 so it doesn't read as a constant
 * slot-machine.
 *
 * Seeded layer — once a lounge has real concurrent activity, these counters
 * blend with (or yield to) Supabase Presence numbers.
 */
export default function LiveActivityHeader({ slug }: Props) {
  const cfg = getLiveConfig(slug);
  const [online, setOnline] = useState(cfg.onlineBase);
  const [messagesToday, setMessagesToday] = useState(cfg.messagesTodayStart);
  const [typing, setTyping] = useState(cfg.typingBase);

  // Reset when slug changes (navigating between lounges).
  useEffect(() => {
    setOnline(cfg.onlineBase);
    setMessagesToday(cfg.messagesTodayStart);
    setTyping(cfg.typingBase);
  }, [slug, cfg]);

  // Online count — small drift every 4s, bounded inside the band.
  useEffect(() => {
    const min = cfg.onlineBase - cfg.onlineRange;
    const max = cfg.onlineBase + cfg.onlineRange;
    const t = setInterval(() => {
      setOnline((prev) => {
        const drift = Math.round((Math.random() - 0.5) * 6);
        return Math.max(min, Math.min(max, prev + drift));
      });
    }, 4000);
    return () => clearInterval(t);
  }, [cfg]);

  // Messages today — slow upward drift, 1–3 per tick.
  useEffect(() => {
    const t = setInterval(() => {
      setMessagesToday((prev) => prev + 1 + Math.floor(Math.random() * 3));
    }, 7000);
    return () => clearInterval(t);
  }, []);

  // Typing — jitters inside band, with occasional dip to 0–3 for ~5s so it
  // doesn't feel constant. ~8% chance per tick to start a dip.
  useEffect(() => {
    let dipUntil = 0;
    const tick = () => {
      const now = Date.now();
      if (now < dipUntil) {
        setTyping(Math.floor(Math.random() * 4)); // 0–3 during dip
        return;
      }
      if (Math.random() < 0.08) {
        dipUntil = now + 5000;
        return;
      }
      const base = cfg.typingBase;
      const range = cfg.typingRange;
      setTyping(base - range + Math.floor(Math.random() * (range * 2 + 1)));
    };
    const t = setInterval(tick, 3000);
    return () => clearInterval(t);
  }, [cfg]);

  return (
    <div className="lah-root" aria-label="Lounge live activity">
      <span className="lah-online">
        <span className="lah-dot" aria-hidden="true" />
        <strong>{online.toLocaleString()}</strong>
        <span className="lah-label">online now</span>
      </span>
      <span className="lah-sep" aria-hidden="true">·</span>
      <span className="lah-msgs">
        <strong>{messagesToday.toLocaleString()}</strong>
        <span className="lah-label">messages today</span>
      </span>
      <span className="lah-sep" aria-hidden="true">·</span>
      <span className="lah-typing">
        <strong>{typing}</strong>
        <span className="lah-label">typing</span>
      </span>

      <style>{`
        .lah-root {
          display: flex; align-items: center; flex-wrap: wrap;
          gap: 0.5rem;
          font-family: ui-monospace, 'JetBrains Mono', monospace;
          font-size: 0.72rem;
          color: rgba(148,163,184,0.78);
        }
        .lah-root strong {
          color: #f3f3fb;
          font-weight: 700;
          margin-right: 0.3rem;
          font-variant-numeric: tabular-nums;
        }
        .lah-online, .lah-msgs, .lah-typing {
          display: inline-flex; align-items: center; gap: 0.05rem;
        }
        .lah-online { gap: 0.45rem; }
        .lah-label { color: rgba(148,163,184,0.65); }
        .lah-dot {
          width: 9px; height: 9px; border-radius: 50%;
          background: #5DCAA5;
          box-shadow: 0 0 8px rgba(93,202,165,0.85);
          animation: lah-pulse 1.6s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes lah-pulse {
          0%,100% { opacity: 0.55; transform: scale(0.85); }
          50%     { opacity: 1;    transform: scale(1.2); }
        }
        .lah-sep { color: rgba(148,163,184,0.4); }
      `}</style>
    </div>
  );
}
