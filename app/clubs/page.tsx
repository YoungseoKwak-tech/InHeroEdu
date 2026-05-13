import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { unstable_noStore as noStore } from "next/cache";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Clubs | InHero",
  description: "Curated flagship clubs for ambitious students.",
};

interface ClubListing {
  slug: string;
  name: string;
  mission: string;
  heroBlurb: string | null;
  glyph: string;
  accent: string;
  memberCount: number;
}

async function fetchClubs(): Promise<ClubListing[]> {
  noStore();
  const host = headers().get("host");
  const proto = headers().get("x-forwarded-proto") ?? (host?.startsWith("localhost") ? "http" : "https");
  const base = host ? `${proto}://${host}` : "";
  try {
    const res = await fetch(`${base}/api/clubs`, { cache: "no-store" });
    if (!res.ok) return [];
    const json = await res.json();
    return json.clubs ?? [];
  } catch {
    return [];
  }
}

export default async function ClubsDirectoryPage() {
  const clubs = await fetchClubs();

  return (
    <main className="cdir-root">
      <header className="cdir-head">
        <div className="cdir-eyebrow-row">
          <div className="cdir-eyebrow">CLUBS</div>
          <Link href="/clubs/new" className="cdir-found-btn">
            Found a club →
          </Link>
        </div>
        <h1 className="cdir-title">
          The rooms you'd want to <em>belong to</em>.
        </h1>
        <p className="cdir-lede">
          Flagship clubs — some curated, some founded by students. Meet your room, log meetings,
          invite a co-founder and a secretary. The work is done elsewhere.
        </p>
      </header>

      {clubs.length === 0 ? (
        <div className="cdir-empty">
          Clubs not seeded yet — run the Phase 3 migration in Supabase.
        </div>
      ) : (
        <ul className="cdir-list">
          {clubs.map((c) => (
            <li
              key={c.slug}
              className="cdir-card"
              style={{ ["--accent" as string]: c.accent }}
            >
              <Link href={`/clubs/${c.slug}`} className="cdir-link">
                <div className="cdir-card-top">
                  <span className="cdir-glyph">{c.glyph}</span>
                  <span className="cdir-count">{c.memberCount} in the room</span>
                </div>
                <h2 className="cdir-name">{c.name}</h2>
                <p className="cdir-mission">{c.mission}</p>
                {c.heroBlurb && (
                  <p className="cdir-blurb">{c.heroBlurb}</p>
                )}
                <span className="cdir-enter">Enter →</span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <style>{`
        .cdir-root {
          max-width: 980px;
          margin: 0 auto;
          padding: 4rem 1.5rem 5rem;
          color: #d8d9e6;
          font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif;
        }
        .cdir-head { margin-bottom: 2.6rem; }
        .cdir-eyebrow-row {
          display: flex; align-items: center; justify-content: space-between;
          gap: 1rem; flex-wrap: wrap;
          margin-bottom: 0.8rem;
        }
        .cdir-eyebrow {
          font-family: ui-monospace, monospace;
          font-size: 0.7rem;
          letter-spacing: 0.28em;
          color: #F4C95D;
          text-transform: uppercase;
        }
        .cdir-found-btn {
          font-family: ui-monospace, monospace;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 0.55rem 0.9rem;
          color: #0a0a10;
          background: #F4C95D;
          border-radius: 0.4rem;
          transition: filter 0.15s, box-shadow 0.2s;
        }
        .cdir-found-btn:hover { filter: brightness(1.08); box-shadow: 0 0 18px rgba(244,201,93,0.45); }
        .cdir-title {
          font-family: 'Cormorant Garamond', 'Georgia', serif;
          font-size: clamp(2rem, 4vw, 2.85rem);
          font-weight: 500;
          color: #f3f3fb;
          margin: 0 0 0.85rem;
          line-height: 1.15;
          letter-spacing: -0.01em;
        }
        .cdir-title em { font-style: italic; color: #F4C95D; }
        .cdir-lede {
          font-size: 1rem;
          color: rgba(216,217,230,0.78);
          max-width: 660px;
          line-height: 1.65;
        }
        .cdir-empty {
          padding: 2rem;
          border: 1px dashed rgba(244,201,93,0.25);
          border-radius: 0.75rem;
          font-family: ui-monospace, monospace;
          font-size: 0.85rem;
          color: rgba(148,163,184,0.8);
          text-align: center;
        }
        .cdir-list {
          list-style: none; padding: 0; margin: 0;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.1rem;
        }
        .cdir-card {
          --accent: #5eead4;
          border: 1px solid color-mix(in srgb, var(--accent) 22%, transparent);
          border-radius: 0.85rem;
          background:
            radial-gradient(circle at 12% 0%, color-mix(in srgb, var(--accent) 12%, transparent), transparent 50%),
            rgba(8,10,18,0.7);
          transition: transform 0.15s, border-color 0.15s, box-shadow 0.2s;
        }
        .cdir-card:hover {
          transform: translateY(-3px);
          border-color: var(--accent);
          box-shadow: 0 22px 50px rgba(0,0,0,0.5), 0 0 24px color-mix(in srgb, var(--accent) 25%, transparent);
        }
        .cdir-link {
          display: block;
          padding: 1.3rem 1.35rem 1.2rem;
          text-decoration: none;
          color: inherit;
        }
        .cdir-card-top {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 0.65rem;
        }
        .cdir-glyph {
          font-size: 1.7rem;
          color: var(--accent);
          text-shadow: 0 0 16px color-mix(in srgb, var(--accent) 50%, transparent);
          line-height: 1;
        }
        .cdir-count {
          font-family: ui-monospace, monospace;
          font-size: 0.7rem;
          color: rgba(148,163,184,0.7);
          letter-spacing: 0.05em;
        }
        .cdir-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.55rem;
          font-weight: 600;
          color: #f3f3fb;
          margin: 0 0 0.45rem;
          line-height: 1.15;
          letter-spacing: -0.005em;
        }
        .cdir-mission {
          font-size: 0.9rem;
          color: rgba(216,217,230,0.84);
          line-height: 1.55;
          margin: 0 0 0.6rem;
        }
        .cdir-blurb {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 0.95rem;
          color: color-mix(in srgb, var(--accent) 80%, white 20%);
          line-height: 1.5;
          margin: 0 0 0.95rem;
        }
        .cdir-enter {
          font-family: ui-monospace, monospace;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          color: var(--accent);
          text-transform: uppercase;
        }
      `}</style>
    </main>
  );
}
