"use client";

/**
 * OriginalsSidebar — narrow context panel (1fr of the 1:4 grid) that
 * sits to the left of the /library feed. Live textbooks (AP Bio) and
 * Coming Soon placeholders (AP Chem, AP Physics) use the IDENTICAL
 * card layout — only the tier badge color and the trailing
 * meta/CTA rows differ. The shared layout is what makes the three
 * cards read as a single set instead of "one wrapper + two cards".
 *
 * Data source: /api/textbooks (Postgres textbooks.is_published). The
 * Coming Soon entries are hard-coded and filtered out once their
 * slug appears in the live list.
 */

import { useEffect, useState } from "react";
import Link from "next/link";

interface Textbook {
  slug: string;
  title: string;
  subtitle: string | null;
  author_name: string;
  total_pages: number | null;
  total_chapters: number | null;
  total_units: number | null;
  cover_url: string | null;
}

const EMOJI_BY_SLUG: Record<string, string> = {
  "ap-bio-ultimate":     "🧬",
  "ap-chem-ultimate":    "⚗️",
  "ap-physics-ultimate": "⚛️",
};

const COMING_SOON = [
  {
    slug: "ap-chem-ultimate",
    title: "AP Chemistry",
    subtitle: "The Ultimate Guide",
    hint: "In the queue — same Cornell-curated pipeline as AP Bio.",
    emoji: "⚗️",
  },
  {
    slug: "ap-physics-ultimate",
    title: "AP Physics",
    subtitle: "The Ultimate Guide",
    hint: "In the queue — same Cornell-curated pipeline as AP Bio.",
    emoji: "⚛️",
  },
];

export default function OriginalsSidebar() {
  const [textbooks, setTextbooks] = useState<Textbook[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/textbooks", { cache: "no-store" });
        if (!res.ok) return;
        const json = (await res.json()) as { textbooks?: Textbook[] };
        if (!cancelled) setTextbooks(json.textbooks ?? []);
      } catch {
        // Silent — feed still works.
      } finally {
        if (!cancelled) setLoaded(true);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const liveSlugs = new Set(textbooks.map((t) => t.slug));
  const placeholders = COMING_SOON.filter((c) => !liveSlugs.has(c.slug));

  return (
    <aside className="orig-sidebar" aria-label="InHero Originals">
      <div className="orig-eyebrow">
        <span className="orig-eyebrow-dot" aria-hidden="true" />
        📘 INHERO ORIGINALS
      </div>
      <div className="orig-sub">Cornell-curated</div>

      <div className="orig-list">
        {!loaded && (
          <div className="orig-skeleton" aria-hidden="true">
            <div className="orig-skeleton-card" />
            <div className="orig-skeleton-card" />
            <div className="orig-skeleton-card" />
          </div>
        )}

        {loaded && textbooks.map((t) => {
          const emoji = EMOJI_BY_SLUG[t.slug] ?? "📚";
          const metaParts = [
            t.total_chapters ? `${t.total_chapters} ch` : null,
            t.total_pages    ? `${t.total_pages} pages` : null,
          ].filter(Boolean);
          // Card chrome lives on the inner <div className="orig-card">
          // — IDENTICAL element type to the Coming Soon cards below.
          // The outer <Link> only provides navigation + the focus ring.
          // Previously the chrome was on a <Link> (rendered as <a>) and
          // didn't visually match the <div> Coming Soon cards.
          return (
            <Link
              key={t.slug}
              href={`/textbooks/${t.slug}`}
              className="orig-card-link"
            >
              <div className="orig-card">
                <div className="orig-card-glyph">{emoji}</div>
                <div className="orig-card-tier orig-card-tier-live">
                  ✨ AI · CORNELL-CURATED
                </div>
                <div className="orig-card-title">{t.title}</div>
                <div className="orig-card-sub">{t.subtitle ?? "The Ultimate Guide"}</div>
                {metaParts.length > 0 && (
                  <div className="orig-card-meta">{metaParts.join(" · ")}</div>
                )}
                <div className="orig-card-cta">Open table of contents →</div>
              </div>
            </Link>
          );
        })}

        {loaded && placeholders.map((c) => (
          <div key={c.slug} className="orig-card orig-card-soon" aria-disabled="true">
            <div className="orig-card-glyph orig-card-glyph-soon">{c.emoji}</div>
            <div className="orig-card-tier orig-card-tier-soon">COMING SOON</div>
            <div className="orig-card-title">{c.title}</div>
            <div className="orig-card-sub">{c.subtitle}</div>
            <div className="orig-card-hint">{c.hint}</div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .orig-sidebar {
          position: sticky;
          top: 5rem;
          align-self: start;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          padding: 1.25rem;
          border: 1px solid rgba(35, 40, 56, 0.7);
          border-radius: 12px;
          /* Panel sits a notch DARKER than the cards inside so the
             cards visibly "float" rather than blending into the panel
             chrome (which used to make the tallest card read as a
             continuation of the header). */
          background:
            radial-gradient(ellipse at 0% 0%, rgba(245, 199, 102, 0.04), transparent 55%),
            rgba(8, 10, 18, 0.55);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
        }
        @media (max-width: 1024px) {
          .orig-sidebar { position: static; }
        }

        .orig-eyebrow {
          font-family: ui-monospace, 'JetBrains Mono', monospace;
          font-size: 0.7rem; font-weight: 800;
          letter-spacing: 0.2em; text-transform: uppercase;
          color: #F5C766;
          text-shadow: 0 0 12px rgba(245, 199, 102, 0.3);
          display: inline-flex; align-items: center; gap: 0.5rem;
        }
        .orig-eyebrow-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #F5C766;
          box-shadow: 0 0 8px rgba(245, 199, 102, 0.6);
          animation: orig-pulse 1.8s ease-in-out infinite;
        }
        @keyframes orig-pulse {
          0%,100% { opacity: 0.55; transform: scale(0.85); }
          50%     { opacity: 1;    transform: scale(1.15); }
        }
        .orig-sub {
          font-family: ui-monospace, monospace;
          font-size: 0.7rem;
          color: #8A92A6;
          letter-spacing: 0.04em;
          padding-bottom: 0.85rem;
          margin-bottom: 0.85rem;
          /* Hairline divider so the header reads as its own block,
             not as the start of the AP Bio card. */
          border-bottom: 1px solid rgba(35, 40, 56, 0.6);
        }

        .orig-list {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        /* IDENTICAL shell for every card — live + soon. Card chrome
           is always on a <div className="orig-card"> so AP Bio's
           wrapper <a> can't accidentally pick up an <a>-targeting
           reset and lose its border/background. */
        .orig-card {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          padding: 20px;
          margin-bottom: 12px;
          border: 1px solid #2a3144;
          border-radius: 12px;
          background: #1a1f2c;
          transition: transform 180ms ease, border-color 180ms ease, box-shadow 220ms ease;
        }
        .orig-card:last-child { margin-bottom: 0; }

        /* Outer Link wrapper for live cards — invisible, just provides
           the click target + focus ring. The card chrome lives on the
           inner .orig-card div, identical to the Coming Soon cards. */
        .orig-card-link {
          display: block;
          text-decoration: none;
          color: inherit;
          border-radius: 12px;
        }
        .orig-card-link:hover .orig-card {
          transform: translateY(-1px);
          border-color: rgba(245, 199, 102, 0.45);
          box-shadow: 0 14px 36px rgba(245, 199, 102, 0.12);
        }
        .orig-card-link:hover .orig-card-cta { transform: translateX(2px); }
        .orig-card-link:focus-visible {
          outline: 2px solid #F5C766;
          outline-offset: 2px;
        }

        /* Coming Soon: keep IDENTICAL geometry (same padding, border,
           background, radius). Only the glyph dims + a light overall
           desaturation. Opacity is high enough that the card still
           reads as a peer of AP Bio, not a ghost. */
        .orig-card-soon {
          cursor: default;
          opacity: 0.92;
        }

        .orig-card-glyph {
          font-size: 2rem;
          line-height: 1;
          filter: drop-shadow(0 0 12px rgba(245, 199, 102, 0.25));
        }
        .orig-card-glyph-soon {
          filter: grayscale(0.55) drop-shadow(0 0 6px rgba(120, 120, 140, 0.18));
        }

        .orig-card-tier {
          font-family: ui-monospace, 'JetBrains Mono', monospace;
          font-size: 0.62rem;
          font-weight: 800;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }
        .orig-card-tier-live {
          color: #F5C766;
          text-shadow: 0 0 8px rgba(245, 199, 102, 0.25);
        }
        .orig-card-tier-soon {
          color: #8A92A6;
        }

        .orig-card-title {
          font-family: 'Inter', 'Space Grotesk', system-ui, sans-serif;
          font-size: 18px;
          font-weight: 700;
          color: #F2F4F8;
          line-height: 1.25;
          letter-spacing: -0.005em;
        }
        .orig-card-sub {
          font-style: italic;
          color: rgba(216, 217, 230, 0.78);
          font-size: 0.92rem;
          line-height: 1.3;
        }
        .orig-card-meta {
          font-family: ui-monospace, monospace;
          font-size: 0.72rem;
          color: #8A92A6;
          letter-spacing: 0.04em;
          margin-top: 0.2rem;
        }
        /* Coming Soon hint line — gives soon cards the SAME vertical
           weight as AP Bio's meta + CTA combo so the three cards
           occupy comparable heights and don't look like 1 card + 2
           ghosts. */
        .orig-card-hint {
          font-size: 0.78rem;
          line-height: 1.45;
          color: #8A92A6;
          margin-top: 0.35rem;
        }
        .orig-card-cta {
          margin-top: 0.5rem;
          font-family: ui-monospace, monospace;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: #5eead4;
          transition: transform 180ms ease;
        }

        .orig-skeleton { display: flex; flex-direction: column; gap: 0.7rem; }
        .orig-skeleton-card {
          height: 7.2rem;
          border-radius: 12px;
          background: linear-gradient(90deg, rgba(255,255,255,0.04), rgba(255,255,255,0.08), rgba(255,255,255,0.04));
          background-size: 200% 100%;
          animation: orig-shimmer 1.2s linear infinite;
        }
        @keyframes orig-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        @media (max-width: 1024px) {
          .orig-sidebar { padding: 1rem; }
          .orig-card    { padding: 16px; }
          .orig-card-glyph { font-size: 1.7rem; }
          .orig-card-title { font-size: 17px; }
        }
      `}</style>
    </aside>
  );
}
