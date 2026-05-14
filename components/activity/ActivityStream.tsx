"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { ActivityEventPublic } from "@/lib/activity";

interface Props {
  refreshIntervalMs?: number;
  limit?: number;
}

function relativeTime(iso: string): string {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d`;
  return new Date(iso).toLocaleDateString();
}

export default function ActivityStream({
  refreshIntervalMs = 30_000,
  limit = 40,
}: Props) {
  const [events, setEvents] = useState<ActivityEventPublic[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch(`/api/activity?limit=${limit}`, { cache: "no-store" });
        const json = await res.json();
        if (cancelled) return;
        if (!res.ok || !json.ok) throw new Error(json.error ?? `HTTP ${res.status}`);
        setEvents(json.events ?? []);
        setError(null);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : String(err));
      } finally {
        if (!cancelled) setLoaded(true);
      }
    }
    void load();
    const t = window.setInterval(() => void load(), refreshIntervalMs);
    return () => {
      cancelled = true;
      window.clearInterval(t);
    };
  }, [limit, refreshIntervalMs]);

  return (
    <section className="as-root">
      <header className="as-head">
        <div className="as-eyebrow">
          <span className="as-pulse" />
          <span>LIVE · INSIDE INHERO RIGHT NOW</span>
        </div>
        <h2 className="as-title">
          The cohort is <em>doing things</em>.
        </h2>
        <p className="as-sub">
          Real activity from the underground internet of ambitious students — refreshes every 30 seconds.
        </p>
      </header>

      {!loaded && <div className="as-loading">Listening for signals…</div>}

      {loaded && events.length === 0 && (
        <div className="as-empty">
          Nothing has happened in the last few hours. Be the first signal.
        </div>
      )}

      {error && <div className="as-error">Feed error: {error}</div>}

      <ol className="as-list">
        {events.map((e) => (
          <li key={e.id} className="as-item" style={{ ["--accent" as string]: e.accent }}>
            <div className="as-glyph">{e.glyph}</div>
            <div className="as-body">
              <div className="as-headline">
                {e.actor ? (
                  <Link href={`/trajectory/${encodeURIComponent(e.actor.handle)}`} className="as-handle">
                    {e.actor.handle}
                  </Link>
                ) : (
                  <span className="as-anon">—</span>
                )}
                <span className="as-verb">{e.verb}</span>
                {e.targetLabel && e.targetHref ? (
                  <Link href={e.targetHref} className="as-target">{e.targetLabel}</Link>
                ) : e.targetLabel ? (
                  <span className="as-target as-target-static">{e.targetLabel}</span>
                ) : null}
                <span className="as-time">· {relativeTime(e.createdAt)}</span>
              </div>
              {e.detail && <div className="as-detail">{e.detail}</div>}
            </div>
          </li>
        ))}
      </ol>

      <style>{`
        .as-root {
          max-width: 980px;
          margin: 0 auto;
          padding: 4rem 1.5rem 3rem;
          color: #d8d9e6;
          font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif;
        }
        .as-head { margin-bottom: 1.7rem; }
        .as-eyebrow {
          display: inline-flex; align-items: center; gap: 0.55rem;
          font-family: ui-monospace, monospace;
          font-size: 0.66rem; font-weight: 700;
          letter-spacing: 0.28em;
          color: #5eead4;
          text-transform: uppercase;
          margin-bottom: 0.8rem;
        }
        .as-pulse {
          width: 8px; height: 8px; border-radius: 50%;
          background: #5eead4;
          box-shadow: 0 0 12px rgba(94,234,212,0.7);
          animation: as-pulse 1.6s ease-in-out infinite;
        }
        @keyframes as-pulse {
          0%,100% { opacity: 0.5; transform: scale(0.85); }
          50%     { opacity: 1;   transform: scale(1.2); }
        }
        .as-title {
          font-family: 'Cormorant Garamond', 'Georgia', serif;
          font-size: clamp(1.9rem, 4vw, 2.6rem);
          font-weight: 500;
          color: #f3f3fb;
          margin: 0 0 0.55rem;
          letter-spacing: -0.015em;
          line-height: 1.15;
        }
        .as-title em { font-style: italic; color: #5eead4; }
        .as-sub {
          font-size: 0.94rem;
          color: rgba(216,217,230,0.72);
          line-height: 1.6;
          max-width: 36rem;
          margin: 0;
        }

        .as-loading, .as-empty, .as-error {
          padding: 1.2rem;
          font-family: ui-monospace, monospace;
          font-size: 0.8rem;
          letter-spacing: 0.04em;
          text-align: center;
          border-radius: 0.6rem;
        }
        .as-loading { color: rgba(94,234,212,0.7); }
        .as-empty {
          color: rgba(148,163,184,0.7);
          border: 1px dashed rgba(94,234,212,0.18);
        }
        .as-error {
          color: #ff8b7e;
          background: rgba(255,107,91,0.07);
          border: 1px solid rgba(255,107,91,0.25);
          text-align: left;
        }

        .as-list {
          list-style: none; padding: 0; margin: 1.3rem 0 0;
          display: flex; flex-direction: column;
          gap: 0;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .as-item {
          --accent: #5eead4;
          display: flex; gap: 0.9rem; align-items: flex-start;
          padding: 0.85rem 0.5rem;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          transition: background 0.15s;
        }
        .as-item:hover { background: rgba(94,234,212,0.03); }

        .as-glyph {
          flex-shrink: 0;
          width: 2.2rem; height: 2.2rem;
          display: flex; align-items: center; justify-content: center;
          background: color-mix(in srgb, var(--accent) 10%, transparent);
          border: 1px solid color-mix(in srgb, var(--accent) 35%, transparent);
          border-radius: 50%;
          font-size: 1rem;
          color: var(--accent);
          text-shadow: 0 0 10px color-mix(in srgb, var(--accent) 55%, transparent);
        }

        .as-body { flex: 1; min-width: 0; }
        .as-headline {
          display: flex; flex-wrap: wrap; align-items: baseline; gap: 0.32rem;
          line-height: 1.45;
        }
        .as-handle {
          font-family: 'Cormorant Garamond', 'Georgia', serif;
          font-style: italic;
          font-weight: 600;
          font-size: 1rem;
          color: #f3f3fb;
          text-decoration: none;
          letter-spacing: -0.005em;
        }
        .as-handle:hover { text-decoration: underline; text-decoration-color: rgba(94,234,212,0.5); }
        .as-anon {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          color: rgba(148,163,184,0.6);
        }
        .as-verb {
          font-size: 0.88rem;
          color: rgba(216,217,230,0.78);
        }
        .as-target {
          font-family: ui-monospace, monospace;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          color: var(--accent);
          text-decoration: none;
          padding: 0.1rem 0.35rem;
          border-radius: 0.25rem;
          background: color-mix(in srgb, var(--accent) 8%, transparent);
          border: 1px solid color-mix(in srgb, var(--accent) 20%, transparent);
        }
        .as-target:hover { background: color-mix(in srgb, var(--accent) 16%, transparent); }
        .as-target-static { cursor: default; }
        .as-time {
          font-family: ui-monospace, monospace;
          font-size: 0.7rem;
          color: rgba(148,163,184,0.6);
          margin-left: auto;
        }
        .as-detail {
          margin-top: 0.25rem;
          font-size: 0.86rem;
          color: rgba(216,217,230,0.78);
          line-height: 1.5;
          font-style: normal;
          /* clamp to 2 lines */
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
}
