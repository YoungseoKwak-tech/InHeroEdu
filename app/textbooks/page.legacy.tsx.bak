"use client";

/**
 * /textbooks — index of InHero-authored textbooks.
 *
 * Cards link to /textbooks/[slug] TOC. Real entries come from
 * GET /api/textbooks (textbooks table, is_published=true). The
 * "Coming soon" placeholders are hard-coded for now so the page
 * doesn't look empty during the AP Bio → Chem → Physics rollout.
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

const COMING_SOON = [
  { slug: "ap-chem-ultimate",    title: "AP Chemistry", subtitle: "The Ultimate Guide", emoji: "⚗️" },
  { slug: "ap-physics-ultimate", title: "AP Physics",   subtitle: "The Ultimate Guide", emoji: "⚛️" },
];

const EMOJI_BY_SLUG: Record<string, string> = {
  "ap-bio-ultimate":     "🧬",
  "ap-chem-ultimate":    "⚗️",
  "ap-physics-ultimate": "⚛️",
};

export default function TextbooksIndexPage() {
  const [textbooks, setTextbooks] = useState<Textbook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/textbooks", { cache: "no-store" });
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error ?? `HTTP ${res.status}`);
        if (!cancelled) setTextbooks(json.textbooks ?? []);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Failed to load");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return (
    <main className="tx-root">
      <div className="tx-shell">
        <div className="tx-stamp">
          <span className="tx-pulse" />
          <span>TEXTBOOKS · CORNELL CURATED</span>
        </div>
        <h1 className="tx-title">
          The InHero <em>library</em>.
        </h1>
        <p className="tx-sub">
          AP textbooks built from the ground up by Cornell students who got 5s.
          Every chapter parsed, every concept analyzed, every page searchable.
        </p>

        {loading && <div className="tx-status">Loading…</div>}
        {error && <div className="tx-status tx-status-err">{error}</div>}

        {!loading && !error && (
          <div className="tx-grid">
            {textbooks.map((t) => (
              <Link key={t.slug} href={`/textbooks/${t.slug}`} className="tx-card">
                <div className="tx-card-emoji">{EMOJI_BY_SLUG[t.slug] ?? "📚"}</div>
                <div className="tx-card-tier">✨ AI · Cornell-curated</div>
                <div className="tx-card-title">{t.title}</div>
                {t.subtitle && <div className="tx-card-sub">{t.subtitle}</div>}
                <div className="tx-card-meta">
                  {t.total_chapters ?? "?"} chapters · {t.total_units ?? "?"} units · {t.total_pages ?? "?"} pages
                </div>
                <div className="tx-card-by">By {t.author_name}</div>
                <div className="tx-card-cta">Open table of contents →</div>
              </Link>
            ))}
            {COMING_SOON
              .filter((c) => !textbooks.some((t) => t.slug === c.slug))
              .map((c) => (
                <div key={c.slug} className="tx-card tx-card-soon">
                  <div className="tx-card-emoji">{c.emoji}</div>
                  <div className="tx-card-tier tx-card-tier-soon">COMING SOON</div>
                  <div className="tx-card-title">{c.title}</div>
                  <div className="tx-card-sub">{c.subtitle}</div>
                  <div className="tx-card-soon-hint">In the queue — same Cornell-curated pipeline as AP Bio.</div>
                </div>
              ))}
          </div>
        )}
      </div>

      <style>{`
        .tx-root {
          min-height: 100vh;
          padding: 3rem 1.25rem 5rem;
          background:
            radial-gradient(ellipse at 50% 0%, rgba(94,234,212,0.05), transparent 55%),
            radial-gradient(ellipse at 90% 80%, rgba(169,156,255,0.04), transparent 60%),
            #050610;
          font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif;
          color: #d8d9e6;
        }
        .tx-shell { max-width: 64rem; margin: 0 auto; }

        .tx-stamp {
          display: inline-flex; align-items: center; gap: 0.55rem;
          font-family: ui-monospace, 'JetBrains Mono', monospace;
          font-size: 0.62rem; font-weight: 700;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: #5eead4;
          text-shadow: 0 0 10px rgba(94,234,212,0.5);
          margin-bottom: 0.85rem;
        }
        .tx-pulse {
          width: 7px; height: 7px; border-radius: 50%;
          background: #5eead4;
          box-shadow: 0 0 10px rgba(94,234,212,0.7);
          animation: tx-pulse 1.6s ease-in-out infinite;
        }
        @keyframes tx-pulse {
          0%,100% { opacity: 0.55; transform: scale(0.85); }
          50%     { opacity: 1;    transform: scale(1.15); }
        }
        .tx-title {
          font-family: 'Cormorant Garamond', 'Georgia', serif;
          font-size: clamp(2.2rem, 5vw, 3.2rem); font-weight: 600;
          color: #f3f3fb;
          margin: 0 0 0.55rem;
          letter-spacing: -0.02em; line-height: 1.1;
        }
        .tx-title em { font-style: italic; color: #5eead4; text-shadow: 0 0 20px rgba(94,234,212,0.4); }
        .tx-sub { font-size: 1rem; color: rgba(148,163,184,0.85); margin: 0 0 2.5rem; max-width: 36rem; line-height: 1.6; }

        .tx-status {
          padding: 2rem 0;
          font-family: ui-monospace, monospace;
          font-size: 0.85rem;
          color: rgba(148,163,184,0.7);
        }
        .tx-status-err { color: #ff8b7e; }

        .tx-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
          gap: 1.1rem;
        }
        .tx-card {
          display: flex; flex-direction: column; gap: 0.55rem;
          padding: 1.5rem 1.5rem 1.65rem;
          background: linear-gradient(180deg, rgba(8,10,18,0.85), rgba(8,10,18,0.65));
          border: 1px solid rgba(94, 234, 212, 0.18);
          border-radius: 14px;
          text-decoration: none;
          color: inherit;
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          transition: transform 200ms cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 200ms ease,
                      box-shadow 240ms ease;
        }
        .tx-card:hover {
          transform: translateY(-3px);
          border-color: rgba(94,234,212,0.45);
          box-shadow:
            0 24px 48px rgba(0,0,0,0.45),
            0 0 28px rgba(94,234,212,0.15);
        }
        .tx-card-emoji { font-size: 2.2rem; line-height: 1; margin-bottom: 0.45rem; }
        .tx-card-tier {
          font-family: ui-monospace, monospace;
          font-size: 0.6rem; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: #F4C95D;
          text-shadow: 0 0 10px rgba(244,201,93,0.35);
        }
        .tx-card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.7rem; font-weight: 600;
          color: #f3f3fb;
          line-height: 1.1;
          letter-spacing: -0.01em;
        }
        .tx-card-sub {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 1rem;
          color: rgba(216,217,230,0.85);
          margin-bottom: 0.35rem;
        }
        .tx-card-meta {
          font-family: ui-monospace, monospace;
          font-size: 0.72rem;
          color: rgba(148,163,184,0.7);
          letter-spacing: 0.04em;
        }
        .tx-card-by {
          font-size: 0.78rem;
          color: rgba(148,163,184,0.85);
        }
        .tx-card-cta {
          font-family: ui-monospace, monospace;
          font-size: 0.74rem; font-weight: 600;
          color: #5eead4;
          letter-spacing: 0.1em;
          margin-top: auto;
          padding-top: 0.5rem;
        }
        .tx-card-soon {
          opacity: 0.7;
          cursor: default;
          border-color: rgba(148,163,184,0.18);
        }
        .tx-card-soon:hover {
          transform: none;
          border-color: rgba(148,163,184,0.25);
          box-shadow: none;
        }
        .tx-card-tier-soon { color: rgba(148,163,184,0.7); text-shadow: none; }
        .tx-card-soon-hint {
          font-family: ui-monospace, monospace;
          font-size: 0.74rem;
          color: rgba(148,163,184,0.6);
          line-height: 1.5;
          margin-top: 0.55rem;
        }
      `}</style>
    </main>
  );
}
