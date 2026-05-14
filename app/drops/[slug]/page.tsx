import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import { createAdminClient } from "@/lib/supabase";
import { hydrateDrops, type DropPublic, type DropRow } from "@/lib/drops";

export const dynamic = "force-dynamic";

interface PageProps {
  params: { slug: string };
}

async function loadDrop(slug: string): Promise<DropPublic | null> {
  noStore();
  const supabase = createAdminClient();
  const { data: row } = await supabase
    .from("drops")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();
  if (!row) return null;
  const [drop] = await hydrateDrops([row as DropRow]);
  return drop ?? null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const drop = await loadDrop(params.slug);
  if (!drop) return { title: "Drop | InHero" };
  return {
    title: `${drop.title} | InHero Drops`,
    description: drop.summary,
  };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function DropPage({ params }: PageProps) {
  const drop = await loadDrop(params.slug);
  if (!drop) notFound();

  return (
    <main className="dp-root" style={{ ["--accent" as string]: drop.accent }}>
      <div className="dp-stars" aria-hidden="true" />
      <div className="dp-glow" aria-hidden="true" />

      <article className="dp-shell">
        <Link href="/drops" className="dp-back">← All drops</Link>

        <header className="dp-head">
          <div className="dp-stamp">
            <span className="dp-pulse" />
            <span>{drop.kicker}</span>
            {drop.subjectTag && <span className="dp-tag">{drop.subjectTag}</span>}
          </div>
          <div className="dp-title-row">
            <span className="dp-glyph">{drop.glyph}</span>
            <h1 className="dp-title">{drop.title}</h1>
          </div>
          <p className="dp-summary">{drop.summary}</p>

          <div className="dp-meta">
            {drop.curator && (
              <span className="dp-curator">
                <span className="dp-curator-label">CURATED BY</span>
                <Link
                  href={`/trajectory/${encodeURIComponent(drop.curator.handle)}`}
                  className={`dp-curator-handle ${drop.curator.mentor ? "is-mentor" : ""}`}
                >
                  {drop.curator.handle}
                </Link>
                {drop.curator.mentor && (
                  <span className="dp-curator-role">· {drop.curator.mentor.universityRole}</span>
                )}
              </span>
            )}
            <span className="dp-date">· {formatDate(drop.publishedAt)}</span>
          </div>

          {drop.linkUrl && (
            <a
              href={drop.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="dp-link"
            >
              {drop.linkLabel ?? "Open the resource →"}
            </a>
          )}
        </header>

        {drop.body && (
          <section className="dp-body">
            {drop.body.split(/\n\n+/).map((para, i) => (
              <p key={i} className="dp-para">{para}</p>
            ))}
          </section>
        )}

        <footer className="dp-foot">
          <span>InHero drop · curated content for the cohort. Not a file dump — every drop is hand-picked.</span>
        </footer>
      </article>

      <style>{`
        .dp-root {
          --accent: #F4C95D;
          position: relative;
          min-height: calc(100vh - 4rem);
          padding: 4rem 1.25rem 5rem;
          background: linear-gradient(180deg, #02040b 0%, #050710 100%);
          color: #d8d9e6;
          font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif;
          overflow: hidden;
        }
        .dp-stars {
          position: absolute; inset: 0;
          pointer-events: none; opacity: 0.4;
          background-image:
            radial-gradient(1px 1px at 12% 18%, rgba(255,255,255,0.8), transparent 100%),
            radial-gradient(1px 1px at 78% 24%, rgba(255,255,255,0.55), transparent 100%),
            radial-gradient(1.2px 1.2px at 32% 72%, rgba(255,255,255,0.6), transparent 100%);
          background-size: 320px 320px;
        }
        .dp-glow {
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 60% 35% at 50% 0%, color-mix(in srgb, var(--accent) 14%, transparent), transparent 60%);
        }

        .dp-shell {
          position: relative;
          max-width: 44rem; margin: 0 auto;
          padding: 1.9rem 1.85rem 1.75rem;
          border-radius: 1rem;
          border: 1px solid color-mix(in srgb, var(--accent) 32%, transparent);
          background: rgba(8,10,18,0.78);
          backdrop-filter: blur(14px);
          box-shadow: 0 32px 80px rgba(0,0,0,0.6);
        }
        .dp-back {
          display: inline-block;
          font-family: ui-monospace, monospace;
          font-size: 0.68rem; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(148,163,184,0.7);
          text-decoration: none;
          margin-bottom: 1.2rem;
          transition: color 0.15s;
        }
        .dp-back:hover { color: var(--accent); }

        .dp-stamp {
          display: inline-flex; align-items: center; gap: 0.55rem;
          font-family: ui-monospace, monospace;
          font-size: 0.62rem; font-weight: 800;
          letter-spacing: 0.24em; text-transform: uppercase;
          color: var(--accent);
          text-shadow: 0 0 12px color-mix(in srgb, var(--accent) 45%, transparent);
          margin-bottom: 0.85rem;
          flex-wrap: wrap;
        }
        .dp-pulse {
          width: 7px; height: 7px; border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 12px color-mix(in srgb, var(--accent) 65%, transparent);
          animation: dp-pulse 1.6s ease-in-out infinite;
        }
        @keyframes dp-pulse {
          0%,100% { opacity: 0.55; transform: scale(0.85); }
          50%     { opacity: 1;   transform: scale(1.2); }
        }
        .dp-tag {
          padding: 0.16rem 0.45rem;
          border-radius: 0.3rem;
          background: color-mix(in srgb, var(--accent) 10%, transparent);
          border: 1px solid color-mix(in srgb, var(--accent) 28%, transparent);
          font-size: 0.58rem;
        }

        .dp-title-row { display: flex; gap: 0.75rem; align-items: flex-start; margin-bottom: 0.85rem; }
        .dp-glyph {
          font-size: 2.5rem;
          color: var(--accent);
          text-shadow: 0 0 20px color-mix(in srgb, var(--accent) 55%, transparent);
          line-height: 1;
          margin-top: 0.05rem;
        }
        .dp-title {
          font-family: 'Cormorant Garamond', 'Georgia', serif;
          font-size: clamp(2rem, 5vw, 2.8rem);
          font-weight: 600;
          color: #f3f3fb;
          margin: 0;
          letter-spacing: -0.015em;
          line-height: 1.1;
        }
        .dp-summary {
          font-size: 1.05rem;
          color: rgba(216,217,230,0.88);
          line-height: 1.6;
          margin: 0 0 1rem;
        }

        .dp-meta {
          display: flex; gap: 0.5rem; align-items: center;
          flex-wrap: wrap;
          margin-bottom: 1.3rem;
          padding-bottom: 1.1rem;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .dp-curator {
          display: inline-flex; align-items: center; gap: 0.4rem;
        }
        .dp-curator-label {
          font-family: ui-monospace, monospace;
          font-size: 0.58rem; font-weight: 700;
          letter-spacing: 0.2em;
          color: rgba(148,163,184,0.7);
          text-transform: uppercase;
        }
        .dp-curator-handle {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 1rem;
          font-weight: 600;
          color: #f3f3fb;
          text-decoration: none;
        }
        .dp-curator-handle:hover { text-decoration: underline; text-decoration-color: var(--accent); }
        .dp-curator-handle.is-mentor {
          color: var(--accent);
          text-shadow: 0 0 8px color-mix(in srgb, var(--accent) 35%, transparent);
        }
        .dp-curator-role {
          font-family: ui-monospace, monospace;
          font-size: 0.72rem;
          color: rgba(148,163,184,0.75);
        }
        .dp-date {
          font-family: ui-monospace, monospace;
          font-size: 0.72rem;
          color: rgba(148,163,184,0.55);
        }

        .dp-link {
          display: inline-block;
          padding: 0.7rem 1.1rem;
          margin-bottom: 1.4rem;
          background: var(--accent);
          color: #0a0a10;
          font-family: ui-monospace, monospace;
          font-size: 0.74rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          text-decoration: none;
          border-radius: 0.45rem;
          transition: filter 0.15s, box-shadow 0.2s;
        }
        .dp-link:hover {
          filter: brightness(1.08);
          box-shadow: 0 0 20px color-mix(in srgb, var(--accent) 50%, transparent);
        }

        .dp-body {
          padding: 0.4rem 0 1rem;
        }
        .dp-para {
          font-size: 1rem;
          line-height: 1.7;
          color: rgba(216,217,230,0.92);
          margin: 0 0 1.05rem;
          white-space: pre-wrap;
        }
        .dp-para:last-child { margin-bottom: 0; }

        .dp-foot {
          margin-top: 1.6rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(255,255,255,0.05);
          font-family: ui-monospace, monospace;
          font-size: 0.68rem;
          color: rgba(148,163,184,0.55);
          letter-spacing: 0.04em;
          line-height: 1.55;
        }
      `}</style>
    </main>
  );
}
