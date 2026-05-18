"use client";

/**
 * /future — Future Self silhouette + resonance bars.
 *
 * Late-night observatory aesthetic. The silhouette is a stylized
 * humanoid SVG whose stroke opacity scales with overall resonance
 * (silhouette_clarity from /api/future/state). Four path glyphs
 * orbit around it, each glowing in proportion to that path's
 * resonance. Below: tappable resonance bars + a recent-events
 * feed.
 */

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { authFetch } from "@/lib/client-auth";
import { createBrowserClient } from "@/lib/supabase";

interface PathState {
  slug: string;
  name: string;
  description: string;
  glyph: string;
  accent: string;
  resonance: number;
  updated_at: string | null;
}

interface RecentEvent {
  id: string;
  event_type: string;
  payload: Record<string, unknown>;
  occurred_at: string;
}

interface FutureState {
  paths: PathState[];
  dominant_path: string | null;
  silhouette_clarity: number;
  recent_events: RecentEvent[];
}

// 4 orbital positions (clockwise from top): N, E, S, W. Each value
// is { angleDeg, radiusPx } translated into SVG coords at render
// time. Index in array matches index in PATHS catalog order.
const ORBIT_POSITIONS = [
  { x: 200, y: 60  },   // researcher (top)
  { x: 360, y: 240 },   // founder (right)
  { x: 200, y: 420 },   // doctor (bottom)
  { x: 40,  y: 240 },   // artist (left)
];

function formatEvent(ev: RecentEvent): string {
  switch (ev.event_type) {
    case "chapter_complete": {
      const ch = (ev.payload?.chapter_number as string) ?? "—";
      const title = (ev.payload?.title as string) ?? "chapter";
      return `chapter ${ch} closed — ${title}`;
    }
    case "session_logged": {
      const secs = (ev.payload?.duration_seconds as number) ?? 0;
      return `${Math.round(secs / 60)} min study session logged`;
    }
    case "resonance_increase":
      return "resonance event";
    case "streak_milestone":
      return `streak milestone (${ev.payload?.days ?? "?"} days)`;
    default:
      return ev.event_type.replace(/_/g, " ");
  }
}

function relativeTime(iso: string): string {
  const ms = Date.now() - new Date(iso).getTime();
  if (ms < 60_000) return "just now";
  const min = Math.floor(ms / 60_000);
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const days = Math.floor(hr / 24);
  return `${days}d ago`;
}

export default function FuturePage() {
  const supabase = createBrowserClient();
  const [authStatus, setAuthStatus] = useState<"loading" | "out" | "in">("loading");
  const [state, setState] = useState<FutureState | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (cancelled) return;
      if (!session?.user) {
        setAuthStatus("out");
        return;
      }
      setAuthStatus("in");
      try {
        const res = await authFetch("/api/future/state");
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error ?? `HTTP ${res.status}`);
        if (!cancelled) setState(json as FutureState);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "failed to load");
      }
    })();
    return () => { cancelled = true; };
  }, [supabase]);

  const dominantName = useMemo(() => {
    if (!state) return null;
    if (!state.dominant_path) return null;
    return state.paths.find((p) => p.slug === state.dominant_path)?.name ?? null;
  }, [state]);

  const clarityLabel = useMemo(() => {
    if (!state) return "—";
    return `${Math.round(state.silhouette_clarity * 100)}%`;
  }, [state]);

  if (authStatus === "loading") return <ShellMsg msg="opening observatory…" />;
  if (authStatus === "out") return <ShellMsg msg="sign in to observe your future self." />;
  if (error) return <ShellMsg msg={error} />;
  if (!state) return <ShellMsg msg="aligning telescope…" />;

  return (
    <main className="ft-root">
      <header className="ft-head">
        <div className="ft-stamp">
          <span className="ft-stamp-dot" />
          <span>FUTURE SELF · v0.1 · OBSERVING</span>
        </div>
        <h1 className="ft-title">
          The version of you that's <em>arriving</em>.
        </h1>
        <p className="ft-sub">
          Future-self synchronization: <span className="ft-sync">{clarityLabel}</span>
          {dominantName && <> · dominant trace <em>{dominantName.toLowerCase()}</em></>}
        </p>
      </header>

      <section className="ft-stage" aria-label="Future self silhouette">
        <Silhouette clarity={state.silhouette_clarity} />
        <svg className="ft-orbital" viewBox="0 0 400 480" aria-hidden="true">
          {/* Path connection lines from silhouette center to each orbital glyph */}
          {state.paths.map((p, i) => {
            const pos = ORBIT_POSITIONS[i] ?? ORBIT_POSITIONS[0];
            return (
              <line
                key={`line-${p.slug}`}
                x1={200} y1={240}
                x2={pos.x} y2={pos.y}
                stroke={p.accent}
                strokeOpacity={0.15 + p.resonance * 0.6}
                strokeWidth={1}
                strokeDasharray="3 4"
              />
            );
          })}
        </svg>
        {state.paths.map((p, i) => {
          const pos = ORBIT_POSITIONS[i] ?? ORBIT_POSITIONS[0];
          const opacity = 0.32 + p.resonance * 0.68;
          return (
            <button
              key={p.slug}
              type="button"
              className={`ft-orb ${expanded === p.slug ? "is-active" : ""}`}
              style={{
                left:  `calc(${(pos.x / 400) * 100}% - 24px)`,
                top:   `calc(${(pos.y / 480) * 100}% - 24px)`,
                color: p.accent,
                opacity,
                boxShadow: `0 0 ${8 + p.resonance * 28}px ${p.accent}55`,
              }}
              onClick={() => setExpanded((cur) => (cur === p.slug ? null : p.slug))}
              aria-label={`${p.name} resonance ${Math.round(p.resonance * 100)}%`}
            >
              <span>{p.glyph}</span>
            </button>
          );
        })}
      </section>

      <section className="ft-bars">
        <div className="ft-bars-head">resonance bars</div>
        {state.paths.map((p) => (
          <button
            key={p.slug}
            type="button"
            className={`ft-bar ${expanded === p.slug ? "is-open" : ""}`}
            onClick={() => setExpanded((cur) => (cur === p.slug ? null : p.slug))}
          >
            <div className="ft-bar-row">
              <span className="ft-bar-glyph" style={{ color: p.accent }}>{p.glyph}</span>
              <span className="ft-bar-name">{p.name}</span>
              <span className="ft-bar-meter">
                <span
                  className="ft-bar-fill"
                  style={{
                    width: `${Math.round(p.resonance * 100)}%`,
                    background: `linear-gradient(90deg, ${p.accent}55, ${p.accent})`,
                    boxShadow: `0 0 12px ${p.accent}66`,
                  }}
                />
              </span>
              <span className="ft-bar-pct" style={{ color: p.accent }}>
                {Math.round(p.resonance * 100)}%
              </span>
            </div>
            {expanded === p.slug && (
              <div className="ft-bar-detail" style={{ borderColor: `${p.accent}33` }}>
                <p>{p.description}</p>
                {p.updated_at && (
                  <div className="ft-bar-stamp">last trace · {relativeTime(p.updated_at)}</div>
                )}
              </div>
            )}
          </button>
        ))}
      </section>

      <section className="ft-events">
        <div className="ft-events-head">recent events</div>
        {state.recent_events.length === 0 ? (
          <div className="ft-events-empty">
            no traces yet. open a chapter; the silhouette listens.
          </div>
        ) : (
          <ol className="ft-events-list">
            {state.recent_events.map((ev) => (
              <li key={ev.id} className="ft-event">
                <span className="ft-event-time">{relativeTime(ev.occurred_at)}</span>
                <span className="ft-event-text">{formatEvent(ev)}</span>
              </li>
            ))}
          </ol>
        )}
      </section>

      <footer className="ft-foot">
        <Link href="/brain" className="ft-foot-link">brain stats →</Link>
        <Link href="/my-plan" className="ft-foot-link">my plan →</Link>
      </footer>

      <style>{css}</style>
    </main>
  );
}

function Silhouette({ clarity }: { clarity: number }) {
  // Stroke opacity + inner-glow intensity both grow with clarity.
  // Clarity 0 = ghostly outline; clarity 1 = strongly-defined
  // figure with luminous core.
  const strokeOpacity = 0.18 + clarity * 0.65;
  const coreOpacity = 0.04 + clarity * 0.45;
  return (
    <svg className="ft-silhouette" viewBox="0 0 400 480" aria-hidden="true">
      <defs>
        <radialGradient id="ft-core" cx="50%" cy="48%" r="40%">
          <stop offset="0%"  stopColor="#a99cff" stopOpacity={coreOpacity} />
          <stop offset="60%" stopColor="#5eead4" stopOpacity={coreOpacity * 0.5} />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ft-stroke" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"  stopColor="#a99cff" />
          <stop offset="100%" stopColor="#5eead4" />
        </linearGradient>
      </defs>
      {/* Inner glow / core */}
      <ellipse cx="200" cy="240" rx="90" ry="170" fill="url(#ft-core)" />
      {/* Head */}
      <circle cx="200" cy="155" r="46"
        fill="none" stroke="url(#ft-stroke)" strokeOpacity={strokeOpacity} strokeWidth="1.5" />
      {/* Neck */}
      <path d="M186 195 Q186 215 196 220 L204 220 Q214 215 214 195"
        fill="none" stroke="url(#ft-stroke)" strokeOpacity={strokeOpacity} strokeWidth="1.5" />
      {/* Shoulders + torso */}
      <path d="M140 250 Q200 220 260 250 L268 360 Q200 380 132 360 Z"
        fill="none" stroke="url(#ft-stroke)" strokeOpacity={strokeOpacity} strokeWidth="1.5" />
      {/* Constellation dots inside silhouette (3 stars for active synapses) */}
      <circle cx="180" cy="170" r="1.6" fill="#a99cff" opacity={0.5 + clarity * 0.5}>
        <animate attributeName="opacity" values={`${0.3 + clarity * 0.4};${0.7 + clarity * 0.3};${0.3 + clarity * 0.4}`} dur="3.2s" repeatCount="indefinite" />
      </circle>
      <circle cx="218" cy="262" r="1.6" fill="#5eead4" opacity={0.5 + clarity * 0.5}>
        <animate attributeName="opacity" values={`${0.3 + clarity * 0.4};${0.7 + clarity * 0.3};${0.3 + clarity * 0.4}`} dur="4.1s" repeatCount="indefinite" />
      </circle>
      <circle cx="192" cy="310" r="1.6" fill="#F4C95D" opacity={0.5 + clarity * 0.5}>
        <animate attributeName="opacity" values={`${0.3 + clarity * 0.4};${0.7 + clarity * 0.3};${0.3 + clarity * 0.4}`} dur="2.6s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

function ShellMsg({ msg }: { msg: string }) {
  return (
    <main className="ft-root">
      <div className="ft-shell-msg">{msg}</div>
      <style>{css}</style>
    </main>
  );
}

const css = `
  .ft-root {
    min-height: 100vh;
    padding: 3rem 1.25rem 4rem;
    background:
      radial-gradient(ellipse at 50% 0%, rgba(169, 156, 255, 0.06), transparent 50%),
      radial-gradient(ellipse at 80% 100%, rgba(94, 234, 212, 0.05), transparent 55%),
      #050610;
    font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif;
    color: #d8d9e6;
  }
  .ft-shell-msg {
    max-width: 24rem; margin: 8rem auto;
    text-align: center;
    font-family: ui-monospace, monospace;
    font-size: 0.85rem;
    color: rgba(148, 163, 184, 0.75);
    letter-spacing: 0.04em;
  }

  .ft-head { max-width: 48rem; margin: 0 auto 2.5rem; }
  .ft-stamp {
    display: inline-flex; align-items: center; gap: 0.55rem;
    font-family: ui-monospace, monospace;
    font-size: 0.62rem; font-weight: 700;
    letter-spacing: 0.22em; text-transform: uppercase;
    color: #a99cff;
    text-shadow: 0 0 10px rgba(169, 156, 255, 0.5);
    margin-bottom: 0.85rem;
  }
  .ft-stamp-dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: #a99cff;
    box-shadow: 0 0 12px rgba(169, 156, 255, 0.7);
    animation: ft-pulse 1.8s ease-in-out infinite;
  }
  @keyframes ft-pulse {
    0%,100% { opacity: 0.55; transform: scale(0.85); }
    50%     { opacity: 1;    transform: scale(1.2); }
  }
  .ft-title {
    font-family: 'Cormorant Garamond', 'Georgia', serif;
    font-size: clamp(2rem, 4.5vw, 2.85rem); font-weight: 600;
    color: #f3f3fb;
    margin: 0 0 0.45rem;
    letter-spacing: -0.02em; line-height: 1.1;
  }
  .ft-title em { font-style: italic; color: #a99cff; text-shadow: 0 0 18px rgba(169, 156, 255, 0.45); }
  .ft-sub {
    font-family: ui-monospace, monospace;
    font-size: 0.84rem;
    color: rgba(148, 163, 184, 0.85);
    margin: 0;
    letter-spacing: 0.04em;
  }
  .ft-sub em { font-style: italic; font-family: 'Cormorant Garamond', serif; color: #5eead4; }
  .ft-sync {
    color: #a99cff;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
  }

  /* ── Silhouette + orbital ───────────────────────────────────── */
  .ft-stage {
    position: relative;
    width: min(28rem, 100%);
    aspect-ratio: 400 / 480;
    margin: 0 auto 3rem;
  }
  .ft-silhouette, .ft-orbital {
    position: absolute; inset: 0;
    width: 100%; height: 100%;
    pointer-events: none;
  }
  .ft-orbital line { transition: stroke-opacity 600ms ease; }

  .ft-orb {
    position: absolute;
    width: 48px; height: 48px;
    border-radius: 50%;
    border: 1px solid currentColor;
    background: rgba(8, 10, 18, 0.9);
    display: inline-flex; align-items: center; justify-content: center;
    font-size: 1.3rem;
    cursor: pointer;
    transition: transform 200ms ease, opacity 200ms ease, box-shadow 240ms ease;
  }
  .ft-orb:hover, .ft-orb.is-active { transform: scale(1.12); opacity: 1 !important; }

  /* ── Resonance bars ─────────────────────────────────────────── */
  .ft-bars { max-width: 48rem; margin: 0 auto 3rem; }
  .ft-bars-head, .ft-events-head {
    font-family: ui-monospace, monospace;
    font-size: 0.62rem; font-weight: 700;
    letter-spacing: 0.2em; text-transform: uppercase;
    color: rgba(148, 163, 184, 0.7);
    margin-bottom: 0.7rem;
  }
  .ft-bar {
    display: block; width: 100%;
    padding: 0; margin-bottom: 0.45rem;
    background: rgba(255, 255, 255, 0.015);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 12px;
    color: inherit;
    text-align: left;
    cursor: pointer;
    transition: border-color 200ms ease, background 200ms ease;
  }
  .ft-bar:hover, .ft-bar.is-open {
    border-color: rgba(169, 156, 255, 0.32);
    background: rgba(169, 156, 255, 0.04);
  }
  .ft-bar-row {
    display: grid;
    grid-template-columns: max-content max-content 1fr max-content;
    align-items: center;
    gap: 0.85rem;
    padding: 0.7rem 1rem;
  }
  .ft-bar-glyph { font-size: 1.1rem; line-height: 1; }
  .ft-bar-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.1rem; font-weight: 500;
    color: #f3f3fb;
    letter-spacing: -0.005em;
  }
  .ft-bar-meter {
    position: relative;
    height: 6px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 3px;
    overflow: hidden;
  }
  .ft-bar-fill { display: block; height: 100%; transition: width 500ms ease; }
  .ft-bar-pct {
    font-family: ui-monospace, monospace;
    font-size: 0.75rem; font-weight: 700;
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.04em;
  }
  .ft-bar-detail {
    padding: 0.2rem 1rem 0.9rem;
    border-top: 1px solid transparent;
  }
  .ft-bar-detail p {
    font-size: 0.92rem;
    color: rgba(216, 217, 230, 0.85);
    line-height: 1.5;
    margin: 0.4rem 0 0.4rem;
  }
  .ft-bar-stamp {
    font-family: ui-monospace, monospace;
    font-size: 0.7rem;
    color: rgba(148, 163, 184, 0.6);
    letter-spacing: 0.06em;
  }

  /* ── Events ─────────────────────────────────────────────────── */
  .ft-events { max-width: 48rem; margin: 0 auto 2.5rem; }
  .ft-events-empty {
    padding: 1.2rem;
    border: 1px dashed rgba(169, 156, 255, 0.2);
    border-radius: 12px;
    color: rgba(216, 217, 230, 0.65);
    font-size: 0.9rem;
    line-height: 1.5;
    font-style: italic;
  }
  .ft-events-list { list-style: none; margin: 0; padding: 0; }
  .ft-event {
    display: grid;
    grid-template-columns: max-content 1fr;
    gap: 0.85rem;
    padding: 0.55rem 0.2rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.04);
    font-family: ui-monospace, monospace;
    font-size: 0.82rem;
  }
  .ft-event-time {
    color: rgba(148, 163, 184, 0.65);
    letter-spacing: 0.04em;
    min-width: 4.5rem;
  }
  .ft-event-text { color: rgba(216, 217, 230, 0.85); }

  /* ── Footer ─────────────────────────────────────────────────── */
  .ft-foot {
    max-width: 48rem; margin: 0 auto;
    display: flex; gap: 1.25rem; justify-content: center;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
  }
  .ft-foot-link {
    font-family: ui-monospace, monospace;
    font-size: 0.72rem; font-weight: 700;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: rgba(148, 163, 184, 0.75);
    text-decoration: none;
    padding: 0.4rem 0.6rem;
    border-radius: 6px;
    transition: color 200ms ease, background 200ms ease;
  }
  .ft-foot-link:hover { color: #a99cff; background: rgba(169, 156, 255, 0.06); }

  /* ── Mobile ─────────────────────────────────────────────────── */
  @media (max-width: 640px) {
    .ft-root { padding: 2rem 1rem 4rem; }
    .ft-stage { width: 100%; }
    .ft-orb { width: 40px; height: 40px; font-size: 1.1rem; }
    .ft-bar-row { grid-template-columns: max-content 1fr max-content; gap: 0.5rem; }
    .ft-bar-name { display: none; }
    .ft-bar-glyph { font-size: 1rem; }
  }
`;
