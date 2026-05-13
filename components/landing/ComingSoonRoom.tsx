"use client";

/**
 * ComingSoonRoom — shared stub page for IA sections that aren't built yet.
 * Used by /lounges, /clubs, /trajectory until their real pages ship.
 */

import Link from "next/link";

interface Props {
  eyebrow: string;       // "LOUNGES · BETA"
  title: string;         // "Where the cohort actually talks."
  italicWord?: string;   // "actually" — italicized inside the title
  body: string;          // pitch paragraph
  bullets?: string[];    // tease the upcoming features
  accent?: string;       // hex
  backHref?: string;
  backLabel?: string;
}

export default function ComingSoonRoom({
  eyebrow,
  title,
  italicWord,
  body,
  bullets = [],
  accent = "#5eead4",
  backHref = "/",
  backLabel = "← Back to InHero",
}: Props) {
  const renderedTitle = italicWord && title.includes(italicWord)
    ? (
      <>
        {title.split(italicWord)[0]}
        <em>{italicWord}</em>
        {title.split(italicWord)[1]}
      </>
    )
    : title;

  return (
    <main className="cs-root" style={{ ["--accent" as string]: accent }}>
      <div className="cs-stars" aria-hidden="true" />
      <div className="cs-glow" aria-hidden="true" />

      <div className="cs-shell">
        <Link href={backHref} className="cs-back">{backLabel}</Link>

        <div className="cs-eyebrow">
          <span className="cs-pulse" />
          <span>{eyebrow}</span>
        </div>

        <h1 className="cs-title">{renderedTitle}</h1>
        <p className="cs-body">{body}</p>

        {bullets.length > 0 && (
          <ul className="cs-bullets">
            {bullets.map((b, i) => (
              <li key={i}>
                <span className="cs-bullet-dot" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}

        <div className="cs-stamp">
          <span className="cs-stamp-tag">STATUS</span>
          <span>UNDER CONSTRUCTION · ARRIVING THIS COHORT</span>
        </div>
      </div>

      <style>{`
        .cs-root {
          --accent: #5eead4;
          position: relative;
          min-height: calc(100vh - 4rem);
          background: linear-gradient(180deg, #02040b 0%, #050710 100%);
          color: #d8d9e6;
          font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif;
          padding: 6rem 1.5rem 5rem;
          overflow: hidden;
          display: flex; align-items: center; justify-content: center;
        }
        .cs-stars {
          position: absolute; inset: 0;
          pointer-events: none; opacity: 0.5;
          background-image:
            radial-gradient(1px 1px at 12% 18%, rgba(255,255,255,0.8), transparent 100%),
            radial-gradient(1px 1px at 78% 24%, rgba(255,255,255,0.55), transparent 100%),
            radial-gradient(1.2px 1.2px at 32% 72%, rgba(255,255,255,0.65), transparent 100%),
            radial-gradient(1px 1px at 92% 56%, rgba(255,255,255,0.6), transparent 100%),
            radial-gradient(1.2px 1.2px at 50% 8%, color-mix(in srgb, var(--accent) 70%, white), transparent 100%);
          background-size: 300px 300px;
        }
        .cs-glow {
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 70% 45% at 50% 0%, color-mix(in srgb, var(--accent) 9%, transparent), transparent 60%),
            radial-gradient(ellipse 50% 35% at 50% 100%, color-mix(in srgb, var(--accent) 6%, transparent), transparent 60%);
        }
        .cs-shell {
          position: relative;
          max-width: 42rem;
          width: 100%;
          padding: 2rem 1.75rem 1.85rem;
          border-radius: 1rem;
          border: 1px solid color-mix(in srgb, var(--accent) 18%, transparent);
          background: rgba(8, 10, 18, 0.7);
          backdrop-filter: blur(14px);
          box-shadow:
            0 32px 80px rgba(0,0,0,0.55),
            inset 0 0 0 1px color-mix(in srgb, var(--accent) 6%, transparent);
        }
        .cs-back {
          display: inline-block;
          font-family: ui-monospace, 'JetBrains Mono', monospace;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(148, 163, 184, 0.7);
          text-decoration: none;
          margin-bottom: 1.4rem;
          transition: color 0.15s;
        }
        .cs-back:hover { color: var(--accent); }

        .cs-eyebrow {
          display: inline-flex; align-items: center; gap: 0.55rem;
          font-family: ui-monospace, monospace;
          font-size: 0.65rem; font-weight: 700; letter-spacing: 0.24em;
          text-transform: uppercase;
          color: var(--accent);
          text-shadow: 0 0 10px color-mix(in srgb, var(--accent) 55%, transparent);
          margin-bottom: 0.8rem;
        }
        .cs-pulse {
          width: 7px; height: 7px; border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 10px color-mix(in srgb, var(--accent) 70%, transparent);
          animation: cs-pulse 1.6s ease-in-out infinite;
        }
        @keyframes cs-pulse {
          0%,100% { opacity: 0.55; transform: scale(0.85); }
          50%     { opacity: 1;    transform: scale(1.15); }
        }
        .cs-title {
          font-family: 'Cormorant Garamond', 'Georgia', serif;
          font-size: clamp(2rem, 4.5vw, 2.8rem);
          font-weight: 600;
          color: #f3f3fb;
          margin: 0 0 1rem;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }
        .cs-title em {
          font-style: italic;
          color: var(--accent);
          text-shadow: 0 0 18px color-mix(in srgb, var(--accent) 40%, transparent);
        }
        .cs-body {
          font-size: 1rem;
          line-height: 1.6;
          color: rgba(216, 217, 230, 0.88);
          margin: 0 0 1.4rem;
        }
        .cs-bullets {
          list-style: none;
          padding: 0.85rem 1rem;
          margin: 0 0 1.5rem;
          border: 1px solid color-mix(in srgb, var(--accent) 18%, transparent);
          border-radius: 0.6rem;
          background: color-mix(in srgb, var(--accent) 4%, transparent);
          display: flex; flex-direction: column; gap: 0.55rem;
          font-size: 0.9rem;
          color: rgba(216, 217, 230, 0.85);
          line-height: 1.5;
        }
        .cs-bullets li {
          display: flex; align-items: flex-start; gap: 0.55rem;
        }
        .cs-bullet-dot {
          width: 5px; height: 5px;
          margin-top: 0.55rem;
          border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 6px color-mix(in srgb, var(--accent) 60%, transparent);
          flex-shrink: 0;
        }
        .cs-stamp {
          display: inline-flex; align-items: center; gap: 0.55rem;
          padding: 0.45rem 0.75rem;
          border: 1px dashed color-mix(in srgb, var(--accent) 35%, transparent);
          border-radius: 0.4rem;
          background: color-mix(in srgb, var(--accent) 3%, transparent);
          font-family: ui-monospace, monospace;
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(216, 217, 230, 0.85);
        }
        .cs-stamp-tag {
          color: var(--accent);
          padding-right: 0.55rem;
          border-right: 1px solid color-mix(in srgb, var(--accent) 25%, transparent);
        }
      `}</style>
    </main>
  );
}
