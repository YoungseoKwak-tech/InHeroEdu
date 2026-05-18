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
import SplitSelf from "@/components/future-self/SplitSelf";
import { computeSynchronization, syncCaption } from "@/lib/future-self/compute";

const PULSE_FLAG_KEY = "inhero.future.pulse";

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
  // Resonance-bar hover-preview: when set, SplitSelf renders as
  // if this single path were the only resonance source.
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  // Bumps each time we pick up a pending pulse from localStorage
  // (set by the chapter completion ritual). SplitSelf fires its
  // one-shot pulse whenever this changes.
  const [pulseToken, setPulseToken] = useState(0);

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

  // Estimate "recent study hours" from the count of session_logged
  // events in the past 7 days — each event implies ~30 min of
  // session. Best we can do without a separate API call.
  const recentStudyHours = useMemo(() => {
    if (!state) return 0;
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const events = state.recent_events.filter(
      (e) => e.event_type === "session_logged" && new Date(e.occurred_at).getTime() >= sevenDaysAgo,
    );
    return events.reduce((sum, e) => {
      const secs = (e.payload?.duration_seconds as number | undefined) ?? 0;
      return sum + secs / 3600;
    }, 0);
  }, [state]);

  // Computed sync (real value, based on all paths).
  const realSync = useMemo(() => {
    if (!state) return 0;
    return computeSynchronization(state.paths, recentStudyHours);
  }, [state, recentStudyHours]);

  // Effective sync — hover-preview overrides the real value so the
  // character morphs to the hovered path's solo resonance.
  const displayedSync = useMemo(() => {
    if (!state || !hoveredPath) return realSync;
    const p = state.paths.find((x) => x.slug === hoveredPath);
    return p ? Math.min(100, p.resonance * 100) : realSync;
  }, [state, hoveredPath, realSync]);

  // Pick up the chapter-completion pulse flag (set by the ritual).
  // One-shot: clear immediately so navigating away + back doesn't
  // replay it.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (authStatus !== "in") return;
    if (window.localStorage.getItem(PULSE_FLAG_KEY)) {
      window.localStorage.removeItem(PULSE_FLAG_KEY);
      setPulseToken((n) => n + 1);
    }
  }, [authStatus]);

  if (authStatus === "loading") return <ShellMsg msg="opening observatory…" />;
  if (authStatus === "out") return <ShellMsg msg="sign in to observe your future self." />;
  if (error) return <ShellMsg msg={error} />;
  if (!state) return <ShellMsg msg="aligning telescope…" />;

  return (
    <main className="ft-root">
      <header className="ft-head">
        <div className="ft-stamp">
          <span className="ft-stamp-dot" />
          <span>SELF-SYNCHRONIZATION · {Math.round(realSync)}%</span>
        </div>
        <h1 className="ft-title">
          The version of you that's <em>arriving</em>.
        </h1>
        <p className="ft-sub">
          Your present and possible selves are merging.
          {dominantName && <> Dominant trace <em>{dominantName.toLowerCase()}</em>.</>}
        </p>
      </header>

      <section className="ft-stage-split" aria-label="Split self character">
        <SplitSelf synchronization={displayedSync} pulseToken={pulseToken} />
        <div className="ft-caption">
          <em>{syncCaption(displayedSync)}</em>
          <span className="ft-caption-hint" title="The seam never reaches zero — the imperfection is what makes it human.">
            the seam never closes
          </span>
        </div>
      </section>

      <section className="ft-bars">
        <div className="ft-bars-head">
          resonance bars
          <span className="ft-bars-hint">hover to preview that path's signature on the character</span>
        </div>
        {state.paths.map((p) => (
          <button
            key={p.slug}
            type="button"
            className={`ft-bar ${expanded === p.slug ? "is-open" : ""}`}
            onClick={() => setExpanded((cur) => (cur === p.slug ? null : p.slug))}
            onMouseEnter={() => setHoveredPath(p.slug)}
            onMouseLeave={() => setHoveredPath((cur) => (cur === p.slug ? null : cur))}
            onFocus={() => setHoveredPath(p.slug)}
            onBlur={() => setHoveredPath((cur) => (cur === p.slug ? null : cur))}
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
  /* ── SplitSelf stage ────────────────────────────────────────── */
  .ft-stage-split {
    position: relative;
    width: min(22rem, 100%);
    margin: 0 auto 2.2rem;
  }
  .ft-caption {
    display: flex; flex-direction: column; align-items: center; gap: 0.4rem;
    margin-top: 0.6rem;
    text-align: center;
  }
  .ft-caption em {
    font-family: 'Cormorant Garamond', serif;
    font-style: italic;
    font-size: clamp(1.05rem, 2.4vw, 1.2rem);
    color: rgba(216, 217, 230, 0.92);
    letter-spacing: -0.005em;
    line-height: 1.4;
    transition: color 600ms ease;
  }
  .ft-caption-hint {
    font-family: ui-monospace, monospace;
    font-size: 0.62rem;
    color: rgba(148, 163, 184, 0.5);
    letter-spacing: 0.16em;
    text-transform: uppercase;
    cursor: help;
    border-bottom: 1px dotted rgba(148, 163, 184, 0.25);
    padding-bottom: 0.05rem;
  }
  .ft-bars-hint {
    display: block;
    font-family: ui-monospace, monospace;
    font-size: 0.62rem;
    letter-spacing: 0.06em;
    text-transform: none;
    color: rgba(148, 163, 184, 0.5);
    margin-top: 0.2rem;
  }

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
