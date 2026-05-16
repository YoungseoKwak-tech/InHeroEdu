"use client";

import { useState } from "react";
import type { SeedTopic } from "@/lib/seedDiscussions";

interface Props {
  topics: SeedTopic[];
  loungeName?: string;
}

const PREVIEW_COUNT = 4;

export default function SeedDiscussions({ topics, loungeName }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [openTopic, setOpenTopic] = useState<string | null>(null);

  if (topics.length === 0) return null;

  const shown = expanded ? topics : topics.slice(0, PREVIEW_COUNT);
  const remaining = Math.max(0, topics.length - PREVIEW_COUNT);
  const totalBubbles = topics.reduce((acc, t) => acc + t.bubbles.length, 0);

  return (
    <section className="sd-root" aria-label="Trending starter chats">
      <header className="sd-head">
        <div className="sd-badge">
          <span className="sd-badge-star" aria-hidden="true">★</span>
          <span>SEEDED PROMPTS · OFFICIAL · INHERO</span>
        </div>
        <div className="sd-title-row">
          <h2 className="sd-title">Trending Starter Chats</h2>
          <span className="sd-meta">
            {topics.length} threads · {totalBubbles} prompts
          </span>
        </div>
        <p className="sd-sub">
          Curated starter conversations to help{loungeName ? ` the ${loungeName}` : " this"} cohort start talking.
          Reply to any thread to take it live.
        </p>
      </header>

      <div className="sd-grid">
        {shown.map((t) => {
          const isOpen = openTopic === t.id;
          const visibleBubbles = isOpen ? t.bubbles : t.bubbles.slice(0, 3);
          const more = Math.max(0, t.bubbles.length - visibleBubbles.length);
          return (
            <article key={t.id} className="sd-card">
              <h3 className="sd-card-topic">{t.topic}</h3>
              <ul className="sd-bubbles">
                {visibleBubbles.map((b, i) => (
                  <li key={`${t.id}-${i}`} className={`sd-bubble ${b.isSeedBot ? "is-seed" : ""}`}>
                    <span className={`sd-bubble-handle ${b.isSeedBot ? "is-seed" : ""}`}>
                      {b.isSeedBot && <span className="sd-seed-mark" aria-hidden="true">★</span>}
                      {b.handle}
                    </span>
                    <span className="sd-bubble-content">{b.content}</span>
                  </li>
                ))}
              </ul>
              {more > 0 && !isOpen && (
                <button
                  type="button"
                  className="sd-expand"
                  onClick={() => setOpenTopic(t.id)}
                >
                  + Show {more} more reply{more === 1 ? "" : "ies"}
                </button>
              )}
              {isOpen && t.bubbles.length > 3 && (
                <button
                  type="button"
                  className="sd-expand sd-expand-close"
                  onClick={() => setOpenTopic(null)}
                >
                  − Collapse
                </button>
              )}
            </article>
          );
        })}
      </div>

      {remaining > 0 && (
        <button
          type="button"
          className="sd-toggle"
          onClick={() => setExpanded((v) => !v)}
        >
          {expanded ? "− Hide extra threads" : `+ Show all ${topics.length} starter threads`}
        </button>
      )}

      <style>{`
        .sd-root {
          margin: 0.6rem 0 1rem;
          padding: 1rem 1.1rem 0.9rem;
          background: linear-gradient(180deg, rgba(244,201,93,0.04), rgba(94,234,212,0.02));
          border: 1px solid rgba(244,201,93,0.18);
          border-radius: 0.7rem;
        }
        .sd-head { display: flex; flex-direction: column; gap: 0.45rem; margin-bottom: 0.85rem; }
        .sd-badge {
          align-self: flex-start;
          display: inline-flex; align-items: center; gap: 0.4rem;
          padding: 0.25rem 0.55rem;
          background: rgba(244,201,93,0.1);
          border: 1px solid rgba(244,201,93,0.45);
          border-radius: 0.35rem;
          font-family: ui-monospace, 'JetBrains Mono', monospace;
          font-size: 0.6rem; font-weight: 800;
          letter-spacing: 0.18em;
          color: #F4C95D;
          text-transform: uppercase;
          line-height: 1;
        }
        .sd-badge-star { font-size: 0.85em; }
        .sd-title-row { display: flex; align-items: baseline; gap: 0.6rem; flex-wrap: wrap; }
        .sd-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.25rem;
          font-weight: 600;
          color: #f3f3fb;
          margin: 0;
          line-height: 1.15;
        }
        .sd-meta {
          font-family: ui-monospace, monospace;
          font-size: 0.66rem;
          letter-spacing: 0.1em;
          color: rgba(148,163,184,0.7);
        }
        .sd-sub {
          margin: 0;
          font-size: 0.82rem;
          line-height: 1.5;
          color: rgba(216,217,230,0.72);
          max-width: 60ch;
        }

        .sd-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 0.7rem;
        }
        @media (max-width: 600px) {
          .sd-grid { grid-template-columns: 1fr; }
        }

        .sd-card {
          padding: 0.85rem 0.9rem 0.75rem;
          background: rgba(8,10,18,0.55);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 0.55rem;
          display: flex; flex-direction: column;
          transition: border-color 0.15s, background 0.15s;
        }
        .sd-card:hover { border-color: rgba(94,234,212,0.3); }
        .sd-card-topic {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.02rem;
          font-weight: 600;
          color: #f3f3fb;
          margin: 0 0 0.55rem;
          line-height: 1.25;
        }

        .sd-bubbles {
          list-style: none; padding: 0; margin: 0;
          display: flex; flex-direction: column;
          gap: 0.45rem;
        }
        .sd-bubble {
          font-size: 0.82rem;
          line-height: 1.5;
          color: rgba(216,217,230,0.88);
          display: flex; flex-direction: column;
          gap: 0.1rem;
          padding: 0.45rem 0.55rem;
          background: rgba(255,255,255,0.025);
          border-left: 2px solid rgba(94,234,212,0.35);
          border-radius: 0 0.35rem 0.35rem 0;
        }
        .sd-bubble.is-seed {
          background: rgba(244,201,93,0.06);
          border-left-color: rgba(244,201,93,0.65);
        }
        .sd-bubble-handle {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-weight: 600;
          font-size: 0.95rem;
          color: #5eead4;
          display: inline-flex; align-items: center; gap: 0.3rem;
        }
        .sd-bubble-handle.is-seed {
          color: #F4C95D;
          text-shadow: 0 0 6px rgba(244,201,93,0.25);
        }
        .sd-seed-mark { font-style: normal; font-size: 0.85em; }
        .sd-bubble-content { color: rgba(216,217,230,0.88); }

        .sd-expand {
          align-self: flex-start;
          margin-top: 0.55rem;
          padding: 0.3rem 0.55rem;
          background: transparent;
          border: 1px dashed rgba(94,234,212,0.35);
          border-radius: 0.35rem;
          font-family: ui-monospace, monospace;
          font-size: 0.66rem; font-weight: 700;
          letter-spacing: 0.1em;
          color: #5eead4;
          cursor: pointer;
          text-transform: uppercase;
        }
        .sd-expand:hover { background: rgba(94,234,212,0.06); border-style: solid; }
        .sd-expand-close { color: rgba(148,163,184,0.7); border-color: rgba(255,255,255,0.15); }

        .sd-toggle {
          width: 100%;
          margin-top: 0.85rem;
          padding: 0.65rem;
          background: transparent;
          border: 1px solid rgba(94,234,212,0.25);
          border-radius: 0.5rem;
          color: #5eead4;
          font-family: ui-monospace, monospace;
          font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.14em;
          cursor: pointer;
          text-transform: uppercase;
          transition: background 0.15s, border-color 0.15s;
        }
        .sd-toggle:hover {
          background: rgba(94,234,212,0.05);
          border-color: rgba(94,234,212,0.5);
        }
      `}</style>
    </section>
  );
}
