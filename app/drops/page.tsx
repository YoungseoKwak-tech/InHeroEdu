import type { Metadata } from "next";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import { createAdminClient } from "@/lib/supabase";
import { hydrateDrops, type DropPublic, type DropRow } from "@/lib/drops";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Drops",
  description: "Curated drops — high-signal resources and rituals from the cohort.",
};

async function loadDrops(): Promise<DropPublic[]> {
  noStore();
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("drops")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false })
    .limit(60);
  return hydrateDrops((data ?? []) as DropRow[]);
}

function relativeDate(iso: string): string {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 86400) return "today";
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export default async function DropsDirectoryPage() {
  const drops = await loadDrops();
  const featured = drops.find((d) => d.isFeatured);
  const rest = drops.filter((d) => !d.isFeatured || d.slug !== featured?.slug);

  return (
    <main className="dd-root">
      <header className="dd-head">
        <div className="dd-eyebrow">
          <span className="dd-pulse" />
          <span>DROPS · CURATED</span>
        </div>
        <h1 className="dd-title">
          The cohort's <em>drops</em> archive.
        </h1>
        <p className="dd-lede">
          Every drop is hand-picked by InHero. Condensed notes, finals survival packs,
          essay archives, trap lists — the high-signal stuff. Not a file dump.
        </p>
      </header>

      {drops.length === 0 ? (
        <div className="dd-empty">
          No drops live yet. The first one comes online with the founding cohort.
        </div>
      ) : (
        <>
          {featured && (
            <Link
              href={`/drops/${featured.slug}`}
              className="dd-featured"
              style={{ ["--accent" as string]: featured.accent }}
            >
              <div className="dd-featured-stamp">
                <span className="dd-pulse" />
                <span>{featured.kicker} · CURRENT</span>
              </div>
              <div className="dd-featured-body">
                <span className="dd-glyph">{featured.glyph}</span>
                <div>
                  <h2 className="dd-featured-title">{featured.title}</h2>
                  <p className="dd-featured-summary">{featured.summary}</p>
                  {featured.curator && (
                    <span className="dd-featured-curator">
                      Curated by{" "}
                      <em>{featured.curator.handle}</em>
                      {featured.curator.mentor && ` · ${featured.curator.mentor.universityRole}`}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          )}

          <ul className="dd-list">
            {rest.map((d) => (
              <li
                key={d.slug}
                className="dd-card"
                style={{ ["--accent" as string]: d.accent }}
              >
                <Link href={`/drops/${d.slug}`} className="dd-card-link">
                  <div className="dd-card-top">
                    <span className="dd-card-kicker">{d.kicker}</span>
                    {d.subjectTag && <span className="dd-card-tag">{d.subjectTag}</span>}
                  </div>
                  <div className="dd-card-row">
                    <span className="dd-card-glyph">{d.glyph}</span>
                    <h3 className="dd-card-title">{d.title}</h3>
                  </div>
                  <p className="dd-card-summary">{d.summary}</p>
                  <div className="dd-card-foot">
                    {d.curator && (
                      <span className="dd-card-curator">
                        by <em>{d.curator.handle}</em>
                      </span>
                    )}
                    <span className="dd-card-date">· {relativeDate(d.publishedAt)}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}

      <style>{`
        .dd-root {
          max-width: 980px; margin: 0 auto;
          padding: 4rem 1.5rem 5rem;
          color: #d8d9e6;
          font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif;
        }
        .dd-head { margin-bottom: 2.4rem; }
        .dd-eyebrow {
          display: inline-flex; align-items: center; gap: 0.55rem;
          font-family: ui-monospace, monospace;
          font-size: 0.68rem; font-weight: 800;
          letter-spacing: 0.28em;
          color: #F4C95D;
          text-transform: uppercase;
          margin-bottom: 0.85rem;
        }
        .dd-pulse {
          width: 7px; height: 7px; border-radius: 50%;
          background: #F4C95D;
          box-shadow: 0 0 12px rgba(244,201,93,0.7);
          animation: dd-pulse 1.6s ease-in-out infinite;
        }
        @keyframes dd-pulse {
          0%,100% { opacity: 0.55; transform: scale(0.85); }
          50%     { opacity: 1;   transform: scale(1.2); }
        }
        .dd-title {
          font-family: 'Cormorant Garamond', 'Georgia', serif;
          font-size: clamp(2rem, 4vw, 2.85rem);
          font-weight: 500;
          color: #f3f3fb;
          margin: 0 0 0.85rem;
          line-height: 1.15;
          letter-spacing: -0.01em;
        }
        .dd-title em { font-style: italic; color: #F4C95D; }
        .dd-lede {
          font-size: 1rem;
          color: rgba(216,217,230,0.78);
          max-width: 640px;
          line-height: 1.65;
          margin: 0;
        }
        .dd-empty {
          padding: 2.5rem 1rem;
          border: 1px dashed rgba(244,201,93,0.3);
          border-radius: 0.75rem;
          font-family: ui-monospace, monospace;
          font-size: 0.85rem;
          color: rgba(244,201,93,0.7);
          text-align: center;
        }

        .dd-featured {
          --accent: #F4C95D;
          display: block;
          padding: 1.5rem 1.6rem 1.45rem;
          border: 1px solid color-mix(in srgb, var(--accent) 45%, transparent);
          border-radius: 0.9rem;
          background:
            radial-gradient(circle at 12% 0%, color-mix(in srgb, var(--accent) 14%, transparent), transparent 55%),
            rgba(8,10,18,0.78);
          margin-bottom: 1.85rem;
          text-decoration: none;
          color: inherit;
          transition: transform 0.15s, border-color 0.15s, box-shadow 0.2s;
          box-shadow: 0 22px 56px rgba(0,0,0,0.4), 0 0 24px color-mix(in srgb, var(--accent) 18%, transparent);
        }
        .dd-featured:hover {
          transform: translateY(-2px);
          border-color: var(--accent);
        }
        .dd-featured-stamp {
          display: inline-flex; align-items: center; gap: 0.5rem;
          font-family: ui-monospace, monospace;
          font-size: 0.62rem; font-weight: 800;
          letter-spacing: 0.24em; text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 0.85rem;
        }
        .dd-featured-body { display: flex; gap: 1.1rem; align-items: flex-start; }
        .dd-glyph {
          font-size: 2.6rem;
          color: var(--accent);
          text-shadow: 0 0 18px color-mix(in srgb, var(--accent) 55%, transparent);
          line-height: 1;
        }
        .dd-featured-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.65rem; font-weight: 600;
          color: #f3f3fb;
          margin: 0 0 0.5rem;
          line-height: 1.15;
          letter-spacing: -0.005em;
        }
        .dd-featured-summary {
          font-size: 0.95rem;
          color: rgba(216,217,230,0.85);
          margin: 0 0 0.65rem;
          line-height: 1.55;
        }
        .dd-featured-curator {
          font-family: ui-monospace, monospace;
          font-size: 0.7rem;
          color: rgba(148,163,184,0.78);
          letter-spacing: 0.04em;
        }
        .dd-featured-curator em {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 1.05em;
          color: var(--accent);
          font-weight: 600;
          margin: 0 0.05em;
        }

        .dd-list {
          list-style: none; padding: 0; margin: 0;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
          gap: 0.95rem;
        }
        .dd-card {
          --accent: #5eead4;
          border: 1px solid color-mix(in srgb, var(--accent) 20%, transparent);
          border-radius: 0.7rem;
          background: rgba(8,10,18,0.65);
          transition: transform 0.15s, border-color 0.15s, box-shadow 0.2s;
        }
        .dd-card:hover {
          transform: translateY(-2px);
          border-color: color-mix(in srgb, var(--accent) 50%, transparent);
          box-shadow: 0 16px 36px rgba(0,0,0,0.4);
        }
        .dd-card-link {
          display: block;
          padding: 1.05rem 1.1rem 0.95rem;
          text-decoration: none;
          color: inherit;
        }
        .dd-card-top {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 0.55rem;
          gap: 0.5rem;
        }
        .dd-card-kicker {
          font-family: ui-monospace, monospace;
          font-size: 0.58rem; font-weight: 700;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--accent);
        }
        .dd-card-tag {
          font-family: ui-monospace, monospace;
          font-size: 0.58rem; font-weight: 600;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(148,163,184,0.7);
          padding: 0.15rem 0.4rem;
          border-radius: 0.25rem;
          border: 1px solid rgba(255,255,255,0.08);
        }
        .dd-card-row { display: flex; align-items: center; gap: 0.55rem; margin-bottom: 0.45rem; }
        .dd-card-glyph {
          font-size: 1.3rem;
          color: var(--accent);
          text-shadow: 0 0 10px color-mix(in srgb, var(--accent) 45%, transparent);
        }
        .dd-card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem; font-weight: 600;
          color: #f3f3fb;
          margin: 0;
          line-height: 1.2;
        }
        .dd-card-summary {
          font-size: 0.86rem;
          color: rgba(216,217,230,0.78);
          margin: 0 0 0.6rem;
          line-height: 1.5;
          /* clamp 2 lines */
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .dd-card-foot {
          display: flex; gap: 0.4rem; align-items: center;
          font-family: ui-monospace, monospace;
          font-size: 0.68rem;
          color: rgba(148,163,184,0.65);
        }
        .dd-card-curator em {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 1.05em;
          color: var(--accent);
          font-weight: 600;
        }
      `}</style>
    </main>
  );
}
