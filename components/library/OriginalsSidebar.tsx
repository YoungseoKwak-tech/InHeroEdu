"use client";

/**
 * OriginalsSidebar — the left half of the /library page on desktop.
 *
 * Each card shows a portrait book-cover hero, then a tier badge, title,
 * page-and-chapter stats, and a "what's inside" feature list (real
 * College Board problem adaptations, AP exam alerts, FRQ + MCQ
 * walkthroughs, concept deep-dives). Clicking anywhere on the card
 * navigates to /textbooks/{slug} (table of contents).
 *
 * Cover assets live in /public/textbook-covers/{slug}.png — files that
 * don't exist fall back to a glyph-only hero so a new title can ship
 * before its art is final.
 *
 * Data source: /api/textbooks (Postgres textbooks.is_published). Items
 * in COMING_SOON disappear once their slug appears in the live list.
 */

import { useEffect, useState } from "react";
import Image from "next/image";
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

// Cover assets per slug. Drop the JPG at /public/textbook-covers/{name}
// and it shows up automatically. Glyph is the emoji-only fallback when
// the file isn't there yet.
//
// Served `unoptimized` (static file, no /_next/image pass): the optimizer
// occasionally timed out on cold cache, which tripped onError and
// permanently hid the covers — the "covers randomly disappear" bug. The
// JPGs are pre-sized to 640w (~210KB) so optimization buys nothing.
const COVER_BY_SLUG: Record<string, { src: string; glyph: string }> = {
  "ap-bio-ultimate":     { src: "/textbook-covers/ap-bio.jpg",         glyph: "🧬" },
  "ap-chem-ultimate":    { src: "/textbook-covers/ap-chem.jpg",        glyph: "⚗️" },
  "ap-physics-ultimate": { src: "/textbook-covers/ap-physics-1.jpg",   glyph: "⚛️" },
};

const COMING_SOON = [
  {
    slug: "ap-chem-ultimate",
    title: "AP Chemistry",
    subtitle: "The Ultimate Guide",
    hint: "In the queue — same pipeline as AP Bio.",
  },
  {
    slug: "ap-physics-ultimate",
    title: "AP Physics 1",
    subtitle: "The Ultimate Guide",
    hint: "In the queue — same pipeline as AP Bio.",
  },
];

const WHATS_INSIDE = [
  "Real College Board problems, adapted",
  "AP exam alerts on every concept",
  "FRQ + MCQ walkthroughs with how-to",
  "Concept deep-dives, not summaries",
];

/** Round to the nearest 100, then append "+" for the marketing "1000+ pages"
 *  feel. Falls back to the raw number if total_pages is missing. */
function formatPages(total: number | null | undefined): string {
  if (!total || total < 100) return total ? `${total} pages` : "";
  const rounded = Math.floor(total / 100) * 100;
  return `${rounded}+ pages`;
}

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

      <div className="orig-list">
        {!loaded && (
          <div className="orig-skeleton" aria-hidden="true">
            <div className="orig-skeleton-card" />
            <div className="orig-skeleton-card" />
            <div className="orig-skeleton-card" />
          </div>
        )}

        {loaded && textbooks.map((t) => {
          const cover = COVER_BY_SLUG[t.slug];
          const pageLabel = formatPages(t.total_pages);
          return (
            <Link
              key={t.slug}
              href={`/textbooks/${t.slug}`}
              className="orig-card-link"
            >
              <article className="orig-card">
                <div className="orig-cover">
                  {cover && (
                    <Image
                      src={cover.src}
                      alt={`${t.title} cover`}
                      width={520}
                      height={780}
                      unoptimized
                      className="orig-cover-img"
                      onError={(e) => {
                        (e.currentTarget as HTMLElement).style.display = "none";
                      }}
                    />
                  )}
                  {cover && (
                    <span className="orig-cover-glyph" aria-hidden="true">
                      {cover.glyph}
                    </span>
                  )}
                  <span className="orig-cover-badge">✨ ORIGINAL</span>
                </div>
                <div className="orig-card-body">
                  <h3 className="orig-card-title">{t.title}</h3>
                  {pageLabel && <p className="orig-card-stats">{pageLabel}</p>}
                </div>
              </article>
            </Link>
          );
        })}

        {loaded && placeholders.map((c) => {
          const cover = COVER_BY_SLUG[c.slug];
          return (
            <article key={c.slug} className="orig-card orig-card-soon" aria-disabled="true">
              <div className="orig-cover orig-cover-soon">
                {cover && (
                  <Image
                    src={cover.src}
                    alt={`${c.title} cover (coming soon)`}
                    width={520}
                    height={780}
                    unoptimized
                    className="orig-cover-img"
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.display = "none";
                    }}
                  />
                )}
                {cover && (
                  <span className="orig-cover-glyph" aria-hidden="true">
                    {cover.glyph}
                  </span>
                )}
                <span className="orig-cover-badge orig-cover-badge-soon">SOON</span>
              </div>
              <div className="orig-card-body">
                <h3 className="orig-card-title">{c.title}</h3>
                <p className="orig-card-stats orig-card-stats-soon">In the queue</p>
              </div>
            </article>
          );
        })}
      </div>

      {/* What's inside — shown ONCE under the grid, applies to every
          original since the pipeline is identical across titles. */}
      <ul className="orig-features-shared" aria-label="What's inside every InHero Original">
        <li className="orig-features-head">What's inside every Original:</li>
        {WHATS_INSIDE.map((line) => (
          <li key={line} className="orig-features-item">
            <span className="orig-feat-check" aria-hidden="true">✓</span>
            <span>{line}</span>
          </li>
        ))}
      </ul>

      <style jsx>{`
        .orig-sidebar {
          position: sticky;
          top: 5rem;
          align-self: start;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          padding: 1.25rem;
          border: 1px solid rgba(35, 40, 56, 0.7);
          border-radius: 14px;
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

        /* Collage grid — 2 columns by default, 3 on wide screens. */
        .orig-list {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 0.85rem;
        }
        @media (min-width: 1400px) {
          .orig-list { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        }

        .orig-card-link {
          display: block;
          text-decoration: none;
          color: inherit;
          border-radius: 14px;
        }
        .orig-card-link:focus-visible {
          outline: 2px solid #F5C766;
          outline-offset: 3px;
        }
        .orig-card-link:hover .orig-card {
          transform: translateY(-2px);
          border-color: rgba(245, 199, 102, 0.5);
          box-shadow: 0 22px 60px rgba(245, 199, 102, 0.16);
        }
        .orig-card-link:hover .orig-cover-img {
          transform: scale(1.02);
        }
        .orig-card-link:hover .orig-card-cta {
          transform: translateX(3px);
        }

        .orig-card {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border: 1px solid #2a3144;
          border-radius: 14px;
          background: #11141d;
          transition: transform 220ms ease, border-color 220ms ease, box-shadow 280ms ease;
        }

        /* Portrait book-cover hero. Aspect ratio matches the source
           covers (~2:3) so the title lockup stays visible. */
        .orig-cover {
          position: relative;
          aspect-ratio: 2 / 3;
          background:
            radial-gradient(ellipse at 50% 30%, rgba(245, 199, 102, 0.18), transparent 65%),
            linear-gradient(180deg, #0c1424 0%, #050811 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        .orig-cover-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 320ms ease;
        }
        /* Emoji fallback sits under the <img>; only visible if image
           fails to load (onError hides the <img>). */
        .orig-cover-glyph {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          font-size: clamp(4rem, 8vw, 6rem);
          line-height: 1;
          filter: drop-shadow(0 0 18px rgba(245, 199, 102, 0.45));
          z-index: 0;
        }
        .orig-cover-badge {
          position: absolute;
          top: 8px; left: 8px;
          z-index: 2;
          font-family: ui-monospace, 'JetBrains Mono', monospace;
          font-size: 0.55rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          padding: 3px 7px;
          border-radius: 999px;
          background: rgba(245, 199, 102, 0.22);
          color: #F5C766;
          border: 1px solid rgba(245, 199, 102, 0.4);
          backdrop-filter: blur(6px);
        }
        .orig-cover-badge-soon {
          background: rgba(138, 146, 166, 0.16);
          color: #C9CFD8;
          border-color: rgba(138, 146, 166, 0.35);
        }

        .orig-cover-soon .orig-cover-img { filter: grayscale(0.35) brightness(0.8); }

        .orig-card-body {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
          padding: 10px 12px 12px;
        }
        .orig-card-title {
          margin: 0;
          font-family: Inter, Space Grotesk, system-ui, sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: #F2F4F8;
          letter-spacing: -0.005em;
          line-height: 1.2;
        }
        .orig-card-stats {
          margin: 0.1rem 0 0;
          font-family: ui-monospace, monospace;
          font-size: 0.68rem;
          color: #F5C766;
          letter-spacing: 0.04em;
        }
        .orig-card-stats-soon { color: #8A92A6; }

        /* "What's inside" shared block under the grid. */
        .orig-features-shared {
          list-style: none;
          padding: 0.9rem 1rem;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          background: rgba(94, 234, 212, 0.05);
          border: 1px solid rgba(94, 234, 212, 0.18);
          border-radius: 10px;
        }
        .orig-features-head {
          font-family: ui-monospace, monospace;
          font-size: 0.66rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #5eead4;
          margin-bottom: 0.25rem;
        }
        .orig-features-item {
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
          font-size: 0.78rem;
          line-height: 1.4;
          color: rgba(216, 217, 230, 0.88);
        }
        .orig-feat-check {
          flex-shrink: 0;
          width: 16px;
          height: 16px;
          margin-top: 1px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: 700;
          background: rgba(94, 234, 212, 0.18);
          color: #5eead4;
          border: 1px solid rgba(94, 234, 212, 0.38);
          border-radius: 999px;
        }

        .orig-card-soon { cursor: default; opacity: 0.92; }

        .orig-skeleton { display: flex; flex-direction: column; gap: 1rem; }
        .orig-skeleton-card {
          aspect-ratio: 2 / 3.6;
          border-radius: 14px;
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
        }
      `}</style>
    </aside>
  );
}
