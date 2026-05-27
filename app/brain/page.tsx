"use client";

/**
 * /brain — orbital cognitive stats.
 *
 * Five stats arranged as pentagon vertices around a central
 * "MIND" anchor. Each stat card shows icon, big Cormorant
 * number, mono name, and growth indicator. Stats that grew
 * vs last week get a subtle pulse animation.
 *
 * Below the orbit: 60-day session heatmap (one cell per day).
 */

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { authFetch, getClientSession } from "@/lib/client-auth";

interface BrainStats {
  mastery: { mastered: number; total: number; delta_this_week: number };
  consistency: { streak: number; best: number };
  focus: { longest_minutes_this_week: number; delta_minutes: number };
  curiosity: { questions_this_week: number; delta: number };
  growth: { percent_change: number; this_week_min: number; last_week_min: number };
}

interface HeatmapCell { day: string; seconds: number }

interface ApiResponse {
  ok: boolean;
  stats: BrainStats;
  heatmap: HeatmapCell[];
}

interface StatCard {
  key: string;
  emoji: string;
  name: string;
  value: string;
  unit: string;
  growth: string | null;
  growing: boolean;
  accent: string;
}

function buildCards(s: BrainStats): StatCard[] {
  return [
    {
      key: "mastery",
      emoji: "📚",
      name: "Mastery",
      value: `${s.mastery.mastered}`,
      unit: `/ ${s.mastery.total} chapters`,
      growth: s.mastery.delta_this_week > 0 ? `+${s.mastery.delta_this_week} this week` : null,
      growing: s.mastery.delta_this_week > 0,
      accent: "#5eead4",
    },
    {
      key: "consistency",
      emoji: "🔥",
      name: "Consistency",
      value: `${s.consistency.streak}`,
      unit: s.consistency.streak === 1 ? "day" : "days",
      growth: s.consistency.best > 0 ? `personal best: ${s.consistency.best}` : null,
      growing: s.consistency.streak > 0 && s.consistency.streak >= s.consistency.best,
      accent: "#FF6B5B",
    },
    {
      key: "focus",
      emoji: "🎯",
      name: "Focus",
      value: `${s.focus.longest_minutes_this_week}`,
      unit: "min · longest this week",
      growth:
        s.focus.delta_minutes > 0
          ? `+${s.focus.delta_minutes} min from last week`
          : s.focus.delta_minutes < 0
            ? `${s.focus.delta_minutes} min from last week`
            : null,
      growing: s.focus.delta_minutes > 0,
      accent: "#a99cff",
    },
    {
      key: "curiosity",
      emoji: "💡",
      name: "Curiosity",
      value: `${s.curiosity.questions_this_week}`,
      unit: s.curiosity.questions_this_week === 1 ? "question" : "questions",
      growth: s.curiosity.delta !== 0 ? `${s.curiosity.delta > 0 ? "+" : ""}${s.curiosity.delta} this week` : null,
      growing: s.curiosity.delta > 0,
      accent: "#F4C95D",
    },
    {
      key: "growth",
      emoji: "🌱",
      name: "Growth",
      value: `${s.growth.percent_change > 0 ? "+" : ""}${s.growth.percent_change}%`,
      unit: "vs last week",
      growth: `${s.growth.this_week_min} min / ${s.growth.last_week_min} min`,
      growing: s.growth.percent_change > 0,
      accent: "#5DCAA5",
    },
  ];
}

// Pentagon vertex positions for the 5 cards. Tuned for a 640×640
// SVG viewBox; clipping handled by CSS aspect ratio.
const PENTAGON = [
  { x: 320, y: 70  }, // top — mastery
  { x: 560, y: 245 }, // upper-right — consistency
  { x: 480, y: 525 }, // lower-right — focus
  { x: 160, y: 525 }, // lower-left — curiosity
  { x: 80,  y: 245 }, // upper-left — growth
];

function heatColor(seconds: number): string {
  if (seconds <= 0) return "rgba(148, 163, 184, 0.08)";
  if (seconds < 5 * 60) return "rgba(94, 234, 212, 0.18)";
  if (seconds < 15 * 60) return "rgba(94, 234, 212, 0.35)";
  if (seconds < 30 * 60) return "rgba(94, 234, 212, 0.55)";
  if (seconds < 60 * 60) return "rgba(169, 156, 255, 0.7)";
  return "rgba(169, 156, 255, 0.9)";
}

export default function BrainPage() {
  const [authStatus, setAuthStatus] = useState<"loading" | "out" | "in">("loading");
  const [data, setData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const session = await getClientSession();
      if (cancelled) return;
      if (!session?.user) { setAuthStatus("out"); return; }
      setAuthStatus("in");
      try {
        const res = await authFetch("/api/brain/stats");
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error ?? `HTTP ${res.status}`);
        if (!cancelled) setData(json as ApiResponse);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "failed to load");
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const cards = useMemo(() => (data ? buildCards(data.stats) : []), [data]);

  // Build a dense 60-day heatmap grid (most recent day at end).
  const heatmap = useMemo(() => {
    if (!data) return [] as HeatmapCell[];
    const byDay = new Map(data.heatmap.map((c) => [c.day, c.seconds]));
    const out: HeatmapCell[] = [];
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    for (let i = 59; i >= 0; i--) {
      const day = new Date(today.getTime() - i * 24 * 60 * 60 * 1000);
      const key = day.toISOString().slice(0, 10);
      out.push({ day: key, seconds: byDay.get(key) ?? 0 });
    }
    return out;
  }, [data]);

  if (authStatus === "loading") return <ShellMsg msg="reading your trace…" />;
  if (authStatus === "out") return <ShellMsg msg="sign in to see your cognitive map." />;
  if (error) return <ShellMsg msg={error} />;
  if (!data) return <ShellMsg msg="resolving stats…" />;

  return (
    <main className="br-root">
      <header className="br-head">
        <div className="br-stamp">
          <span className="br-stamp-dot" />
          <span>BRAIN STATS · v0.1 · ORBITAL VIEW</span>
        </div>
        <h1 className="br-title">
          Your mind, in <em>orbit</em>.
        </h1>
        <p className="br-sub">
          five traces. each one tracks a different muscle. growth shows in deltas, not in totals.
        </p>
      </header>

      <section className="br-orbit" aria-label="Cognitive stats">
        <svg className="br-orbit-lines" viewBox="0 0 640 640" aria-hidden="true">
          {PENTAGON.map((p, i) => (
            <line
              key={i}
              x1={320} y1={320}
              x2={p.x} y2={p.y}
              stroke={cards[i]?.accent ?? "#5eead4"}
              strokeOpacity={0.18}
              strokeWidth={1}
              strokeDasharray="4 5"
            />
          ))}
        </svg>

        <div className="br-mind" aria-hidden="true">
          <span className="br-mind-label">MIND</span>
        </div>

        {cards.map((c, i) => {
          const pos = PENTAGON[i] ?? PENTAGON[0];
          return (
            <div
              key={c.key}
              className={`br-card ${c.growing ? "is-growing" : ""}`}
              style={{
                left:  `calc(${(pos.x / 640) * 100}% - 6.5rem)`,
                top:   `calc(${(pos.y / 640) * 100}% - 4.25rem)`,
                borderColor: `${c.accent}55`,
                boxShadow: `0 18px 40px rgba(0,0,0,0.45), 0 0 ${c.growing ? 28 : 14}px ${c.accent}22`,
              }}
            >
              <div className="br-card-head">
                <span className="br-card-emoji">{c.emoji}</span>
                <span className="br-card-name" style={{ color: c.accent }}>{c.name.toUpperCase()}</span>
              </div>
              <div className="br-card-value" style={{ color: c.growing ? c.accent : "#f3f3fb" }}>{c.value}</div>
              <div className="br-card-unit">{c.unit}</div>
              {c.growth && <div className="br-card-growth">{c.growth}</div>}
            </div>
          );
        })}
      </section>

      <section className="br-heatmap">
        <div className="br-heatmap-head">study trace · last 60 days</div>
        <div className="br-heatmap-grid">
          {heatmap.map((cell) => (
            <span
              key={cell.day}
              className="br-heatmap-cell"
              style={{ background: heatColor(cell.seconds) }}
              title={`${cell.day} · ${Math.round(cell.seconds / 60)} min`}
            />
          ))}
        </div>
        <div className="br-heatmap-legend">
          <span>quiet</span>
          <span className="br-heatmap-cell" style={{ background: heatColor(0) }} />
          <span className="br-heatmap-cell" style={{ background: heatColor(5 * 60) }} />
          <span className="br-heatmap-cell" style={{ background: heatColor(20 * 60) }} />
          <span className="br-heatmap-cell" style={{ background: heatColor(45 * 60) }} />
          <span className="br-heatmap-cell" style={{ background: heatColor(120 * 60) }} />
          <span>deep work</span>
        </div>
      </section>

      <footer className="br-foot">
        <Link href="/future" className="br-foot-link">future self →</Link>
        <Link href="/my-plan" className="br-foot-link">my plan →</Link>
      </footer>

      <style>{css}</style>
    </main>
  );
}

function ShellMsg({ msg }: { msg: string }) {
  return (
    <main className="br-root">
      <div className="br-shell-msg">{msg}</div>
      <style>{css}</style>
    </main>
  );
}

const css = `
  .br-root {
    min-height: 100vh;
    padding: 3rem 1.25rem 4rem;
    background:
      radial-gradient(ellipse at 50% 0%, rgba(94, 234, 212, 0.06), transparent 55%),
      radial-gradient(ellipse at 80% 90%, rgba(169, 156, 255, 0.05), transparent 60%),
      #050610;
    font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif;
    color: #d8d9e6;
  }
  .br-shell-msg {
    max-width: 24rem; margin: 8rem auto;
    text-align: center;
    font-family: ui-monospace, monospace;
    font-size: 0.85rem;
    color: rgba(148, 163, 184, 0.75);
    letter-spacing: 0.04em;
  }

  .br-head { max-width: 48rem; margin: 0 auto 2.5rem; }
  .br-stamp {
    display: inline-flex; align-items: center; gap: 0.55rem;
    font-family: ui-monospace, monospace;
    font-size: 0.62rem; font-weight: 700;
    letter-spacing: 0.22em; text-transform: uppercase;
    color: #5eead4;
    text-shadow: 0 0 10px rgba(94, 234, 212, 0.5);
    margin-bottom: 0.85rem;
  }
  .br-stamp-dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: #5eead4;
    box-shadow: 0 0 12px rgba(94, 234, 212, 0.7);
    animation: br-pulse 1.8s ease-in-out infinite;
  }
  @keyframes br-pulse {
    0%,100% { opacity: 0.55; transform: scale(0.85); }
    50%     { opacity: 1;    transform: scale(1.2); }
  }
  .br-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2rem, 4.5vw, 2.85rem); font-weight: 600;
    color: #f3f3fb;
    margin: 0 0 0.45rem;
    letter-spacing: -0.02em; line-height: 1.1;
  }
  .br-title em { font-style: italic; color: #5eead4; text-shadow: 0 0 18px rgba(94, 234, 212, 0.45); }
  .br-sub {
    font-family: ui-monospace, monospace;
    font-size: 0.84rem;
    color: rgba(148, 163, 184, 0.85);
    margin: 0;
    letter-spacing: 0.04em;
    line-height: 1.55;
  }

  /* ── Orbit ──────────────────────────────────────────────────── */
  .br-orbit {
    position: relative;
    width: min(40rem, 100%);
    aspect-ratio: 1 / 1;
    margin: 0 auto 3rem;
  }
  .br-orbit-lines {
    position: absolute; inset: 0;
    width: 100%; height: 100%;
    pointer-events: none;
  }
  .br-mind {
    position: absolute;
    left: 50%; top: 50%;
    transform: translate(-50%, -50%);
    width: 6.5rem; height: 6.5rem;
    border-radius: 50%;
    background:
      radial-gradient(circle, rgba(169, 156, 255, 0.18), transparent 70%),
      rgba(8, 10, 18, 0.9);
    border: 1px solid rgba(169, 156, 255, 0.35);
    box-shadow: 0 0 30px rgba(169, 156, 255, 0.18);
    display: inline-flex; align-items: center; justify-content: center;
    pointer-events: none;
  }
  .br-mind-label {
    font-family: ui-monospace, monospace;
    font-size: 0.66rem; font-weight: 700;
    letter-spacing: 0.32em;
    color: #a99cff;
    text-shadow: 0 0 12px rgba(169, 156, 255, 0.4);
  }

  .br-card {
    position: absolute;
    width: 13rem; height: 8.5rem;
    padding: 0.85rem 1rem;
    background: linear-gradient(180deg, rgba(8, 10, 18, 0.92), rgba(8, 10, 18, 0.78));
    border: 1px solid;
    border-radius: 14px;
    display: flex; flex-direction: column; gap: 0.15rem;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }
  .br-card.is-growing { animation: br-card-glow 3.5s ease-in-out infinite; }
  @keyframes br-card-glow {
    0%,100% { transform: translateY(0); }
    50%     { transform: translateY(-3px); }
  }
  .br-card-head { display: flex; align-items: center; gap: 0.4rem; }
  .br-card-emoji { font-size: 1rem; }
  .br-card-name {
    font-family: ui-monospace, monospace;
    font-size: 0.6rem; font-weight: 700;
    letter-spacing: 0.18em;
  }
  .br-card-value {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.4rem; font-weight: 600;
    line-height: 1;
    letter-spacing: -0.02em;
    font-variant-numeric: tabular-nums;
    margin-top: 0.15rem;
  }
  .br-card-unit {
    font-family: ui-monospace, monospace;
    font-size: 0.68rem;
    color: rgba(148, 163, 184, 0.78);
    letter-spacing: 0.04em;
  }
  .br-card-growth {
    margin-top: auto;
    font-family: ui-monospace, monospace;
    font-size: 0.65rem;
    color: rgba(148, 163, 184, 0.6);
    letter-spacing: 0.04em;
  }

  /* ── Heatmap ────────────────────────────────────────────────── */
  .br-heatmap { max-width: 40rem; margin: 0 auto 2.5rem; }
  .br-heatmap-head {
    font-family: ui-monospace, monospace;
    font-size: 0.62rem; font-weight: 700;
    letter-spacing: 0.2em; text-transform: uppercase;
    color: rgba(148, 163, 184, 0.7);
    margin-bottom: 0.7rem;
  }
  .br-heatmap-grid {
    display: grid;
    grid-template-columns: repeat(15, 1fr);
    grid-auto-rows: minmax(0, 1fr);
    gap: 4px;
    padding: 0.65rem;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 10px;
  }
  .br-heatmap-cell {
    aspect-ratio: 1 / 1;
    border-radius: 3px;
    transition: transform 150ms ease;
  }
  .br-heatmap-cell:hover { transform: scale(1.5); }
  .br-heatmap-legend {
    display: flex; align-items: center; gap: 0.4rem;
    margin-top: 0.6rem;
    font-family: ui-monospace, monospace;
    font-size: 0.66rem;
    color: rgba(148, 163, 184, 0.6);
    letter-spacing: 0.06em;
  }
  .br-heatmap-legend .br-heatmap-cell { width: 12px; height: 12px; }

  /* ── Footer ─────────────────────────────────────────────────── */
  .br-foot {
    max-width: 40rem; margin: 0 auto;
    display: flex; gap: 1.25rem; justify-content: center;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
  }
  .br-foot-link {
    font-family: ui-monospace, monospace;
    font-size: 0.72rem; font-weight: 700;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: rgba(148, 163, 184, 0.75);
    text-decoration: none;
    padding: 0.4rem 0.6rem;
    border-radius: 6px;
    transition: color 200ms ease, background 200ms ease;
  }
  .br-foot-link:hover { color: #5eead4; background: rgba(94, 234, 212, 0.06); }

  /* ── Mobile: drop the orbit, switch to 2-col grid ───────────── */
  @media (max-width: 720px) {
    .br-root { padding: 2rem 0.85rem 4rem; }
    .br-orbit {
      aspect-ratio: auto;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 0.6rem;
      width: 100%;
    }
    .br-orbit-lines, .br-mind { display: none; }
    .br-card {
      position: static;
      width: auto;
      height: auto;
      min-height: 7.5rem;
    }
    .br-heatmap-grid { grid-template-columns: repeat(10, 1fr); }
  }
`;
