"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { DropPublic } from "@/lib/drops";

export default function DropFeaturedCard() {
  const [drop, setDrop] = useState<DropPublic | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/drops?featured=1&limit=1", { cache: "no-store" });
        const json = await res.json();
        if (cancelled) return;
        if (json?.ok && Array.isArray(json.drops) && json.drops[0]) {
          setDrop(json.drops[0] as DropPublic);
        }
      } catch {
        // ignore — section just won't render
      } finally {
        if (!cancelled) setLoaded(true);
      }
    }
    void load();
    return () => { cancelled = true; };
  }, []);

  // Until loaded, render nothing (avoids layout shift on the home hero).
  if (!loaded || !drop) return null;

  const curatorLine = drop.curator
    ? drop.curator.mentor
      ? `${drop.curator.handle} · ${drop.curator.mentor.universityRole}`
      : drop.curator.handle
    : null;

  return (
    <section className="dfc-root" style={{ ["--accent" as string]: drop.accent }}>
      <div className="dfc-glow" aria-hidden="true" />
      <div className="dfc-shell">
        <div className="dfc-stamp">
          <span className="dfc-pulse" />
          <span>{drop.kicker}</span>
          {drop.subjectTag && <span className="dfc-tag">{drop.subjectTag}</span>}
        </div>
        <div className="dfc-body">
          <div className="dfc-glyph">{drop.glyph}</div>
          <div className="dfc-content">
            <h2 className="dfc-title">{drop.title}</h2>
            <p className="dfc-summary">{drop.summary}</p>
            {curatorLine && (
              <div className="dfc-curator">
                <span className="dfc-curator-label">CURATED BY</span>
                <Link
                  href={`/trajectory/${encodeURIComponent(drop.curator!.handle)}`}
                  className={`dfc-curator-handle ${drop.curator!.mentor ? "is-mentor" : ""}`}
                >
                  {curatorLine}
                </Link>
              </div>
            )}
            <div className="dfc-cta-row">
              <Link href={`/drops/${drop.slug}`} className="dfc-cta-primary">
                Open the drop →
              </Link>
              {drop.linkUrl && (
                <a
                  href={drop.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dfc-cta-ghost"
                >
                  {drop.linkLabel ?? "External →"}
                </a>
              )}
              <Link href="/drops" className="dfc-cta-quiet">
                All drops
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .dfc-root {
          --accent: #F4C95D;
          position: relative;
          padding: 4rem 1.5rem 3rem;
          background: radial-gradient(ellipse 60% 35% at 50% 0%,
            color-mix(in srgb, var(--accent) 12%, transparent), transparent 70%);
          z-index: 5;
        }
        .dfc-glow {
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(circle at 80% 30%, color-mix(in srgb, var(--accent) 14%, transparent), transparent 50%),
            radial-gradient(circle at 20% 70%, color-mix(in srgb, var(--accent) 10%, transparent), transparent 50%);
        }
        .dfc-shell {
          position: relative;
          max-width: 920px; margin: 0 auto;
          padding: 1.65rem 1.85rem 1.7rem;
          border-radius: 1.1rem;
          border: 1px solid color-mix(in srgb, var(--accent) 40%, transparent);
          background:
            radial-gradient(circle at 12% 0%, color-mix(in srgb, var(--accent) 10%, transparent), transparent 55%),
            rgba(8,10,18,0.78);
          backdrop-filter: blur(14px);
          box-shadow:
            0 28px 70px rgba(0,0,0,0.6),
            0 0 32px color-mix(in srgb, var(--accent) 20%, transparent);
          color: #d8d9e6;
          font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif;
        }
        .dfc-stamp {
          display: inline-flex; align-items: center; gap: 0.6rem;
          font-family: ui-monospace, 'JetBrains Mono', monospace;
          font-size: 0.66rem; font-weight: 800;
          letter-spacing: 0.28em;
          color: var(--accent);
          text-transform: uppercase;
          text-shadow: 0 0 12px color-mix(in srgb, var(--accent) 50%, transparent);
          margin-bottom: 1rem;
          flex-wrap: wrap;
        }
        .dfc-pulse {
          width: 8px; height: 8px; border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 14px color-mix(in srgb, var(--accent) 70%, transparent);
          animation: dfc-pulse 1.6s ease-in-out infinite;
        }
        @keyframes dfc-pulse {
          0%,100% { opacity: 0.5; transform: scale(0.85); }
          50%     { opacity: 1;   transform: scale(1.2); }
        }
        .dfc-tag {
          padding: 0.18rem 0.5rem;
          border-radius: 0.3rem;
          background: color-mix(in srgb, var(--accent) 10%, transparent);
          border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent);
          font-size: 0.6rem;
          color: var(--accent);
        }

        .dfc-body { display: flex; gap: 1.4rem; align-items: flex-start; }
        .dfc-glyph {
          flex-shrink: 0;
          font-size: 3.5rem;
          color: var(--accent);
          text-shadow: 0 0 24px color-mix(in srgb, var(--accent) 60%, transparent);
          line-height: 1;
          margin-top: 0.1rem;
        }
        .dfc-content { flex: 1; min-width: 0; }
        .dfc-title {
          font-family: 'Cormorant Garamond', 'Georgia', serif;
          font-size: clamp(1.75rem, 4vw, 2.4rem);
          font-weight: 600;
          color: #f3f3fb;
          margin: 0 0 0.6rem;
          letter-spacing: -0.015em;
          line-height: 1.12;
        }
        .dfc-summary {
          font-size: 1rem;
          color: rgba(216,217,230,0.88);
          line-height: 1.55;
          margin: 0 0 0.95rem;
          max-width: 38rem;
        }

        .dfc-curator {
          display: inline-flex; align-items: center; gap: 0.5rem;
          margin-bottom: 1.1rem;
          padding: 0.3rem 0.55rem;
          border-radius: 0.35rem;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          flex-wrap: wrap;
        }
        .dfc-curator-label {
          font-family: ui-monospace, monospace;
          font-size: 0.58rem; font-weight: 700;
          letter-spacing: 0.2em;
          color: rgba(148,163,184,0.7);
          text-transform: uppercase;
        }
        .dfc-curator-handle {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 0.95rem;
          font-weight: 600;
          color: #f3f3fb;
          text-decoration: none;
        }
        .dfc-curator-handle:hover { text-decoration: underline; text-decoration-color: var(--accent); }
        .dfc-curator-handle.is-mentor { color: var(--accent); text-shadow: 0 0 8px color-mix(in srgb, var(--accent) 35%, transparent); }

        .dfc-cta-row { display: flex; gap: 0.55rem; flex-wrap: wrap; align-items: center; }
        .dfc-cta-primary {
          font-family: ui-monospace, monospace;
          font-size: 0.74rem; font-weight: 700;
          letter-spacing: 0.16em; text-transform: uppercase;
          padding: 0.7rem 1.1rem;
          color: #0a0a10; background: var(--accent);
          border-radius: 0.45rem;
          text-decoration: none;
          transition: filter 0.15s, box-shadow 0.2s;
        }
        .dfc-cta-primary:hover {
          filter: brightness(1.08);
          box-shadow: 0 0 22px color-mix(in srgb, var(--accent) 55%, transparent);
        }
        .dfc-cta-ghost {
          font-family: ui-monospace, monospace;
          font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          padding: 0.7rem 1rem;
          color: var(--accent);
          background: transparent;
          border: 1px solid color-mix(in srgb, var(--accent) 40%, transparent);
          border-radius: 0.45rem;
          text-decoration: none;
          transition: background 0.15s, border-color 0.15s;
        }
        .dfc-cta-ghost:hover {
          background: color-mix(in srgb, var(--accent) 10%, transparent);
          border-color: var(--accent);
        }
        .dfc-cta-quiet {
          font-family: ui-monospace, monospace;
          font-size: 0.7rem; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase;
          color: rgba(148,163,184,0.65);
          text-decoration: none;
          padding: 0.5rem 0.6rem;
          transition: color 0.15s;
        }
        .dfc-cta-quiet:hover { color: var(--accent); }

        @media (max-width: 540px) {
          .dfc-body { flex-direction: column; gap: 0.4rem; }
          .dfc-glyph { font-size: 2.8rem; }
        }
      `}</style>
    </section>
  );
}
