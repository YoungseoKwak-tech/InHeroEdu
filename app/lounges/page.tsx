import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { unstable_noStore as noStore } from "next/cache";
import TextbookSlider from "@/components/landing/TextbookSlider";

export const dynamic = "force-dynamic";

// Slug → which Field Manual (TextbookSlider variant) to embed under that
// lounge card. Right now only AP Bio has a Field Manual built; others fall
// through to a small placeholder. Add slugs here when more manuals ship.
const FIELD_MANUAL_BY_LOUNGE: Record<string, "ap-bio"> = {
  "ap-bio": "ap-bio",
};

export const metadata: Metadata = {
  title: "Lounges | InHero",
  description: "Subject-based community lounges for the InHero cohort.",
};

interface LoungeListing {
  slug: string;
  name: string;
  subjectCategory: string | null;
  description: string | null;
  postCount: number;
}

async function fetchLounges(): Promise<LoungeListing[]> {
  noStore();
  const host = headers().get("host");
  const proto =
    headers().get("x-forwarded-proto") ?? (host?.startsWith("localhost") ? "http" : "https");
  const base = host ? `${proto}://${host}` : "";
  try {
    const res = await fetch(`${base}/api/lounges`, { cache: "no-store" });
    if (!res.ok) return [];
    const json = await res.json();
    return json.lounges ?? [];
  } catch {
    return [];
  }
}

export default async function LoungesDirectoryPage() {
  const lounges = await fetchLounges();

  return (
    <main className="ldir-root">
      <header className="ldir-head">
        <div className="ldir-eyebrow">LOUNGES · LIVE</div>
        <h1 className="ldir-title">
          Where the cohort <em>actually</em> talks.
        </h1>
        <p className="ldir-lede">
          Subject-based rooms for the InHero cohort. Open discussion, exam talk, study questions.
          Identity is your trajectory handle — not a username.
        </p>
      </header>

      {lounges.length === 0 ? (
        <div className="ldir-empty">
          No lounges live yet. The first one (AP Biology) is being seeded — refresh in a minute.
        </div>
      ) : (
        <div className="ldir-stack">
          {lounges.map((l) => (
            <article key={l.slug} className="ldir-row">
              <Link href={`/lounges/${l.slug}`} className="ldir-card">
                <div className="ldir-card-top">
                  {l.subjectCategory && (
                    <span className="ldir-cat">{l.subjectCategory}</span>
                  )}
                  <span className="ldir-count">{l.postCount} posts</span>
                </div>
                <h2 className="ldir-name">{l.name}</h2>
                {l.description && <p className="ldir-desc">{l.description}</p>}
                <span className="ldir-enter">Enter →</span>
              </Link>

              {FIELD_MANUAL_BY_LOUNGE[l.slug] && (
                <section className="ldir-manual" aria-label={`${l.name} Field Manual preview`}>
                  <TextbookSlider />
                </section>
              )}
            </article>
          ))}
        </div>
      )}

      <style>{`
        .ldir-root {
          max-width: 920px;
          margin: 0 auto;
          padding: 4rem 1.5rem 5rem;
          color: #d8d9e6;
          font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif;
        }
        .ldir-head { margin-bottom: 2.4rem; }
        .ldir-eyebrow {
          font-family: ui-monospace, monospace;
          font-size: 0.7rem;
          letter-spacing: 0.28em;
          color: #5eead4;
          text-transform: uppercase;
          margin-bottom: 0.8rem;
        }
        .ldir-title {
          font-family: 'Cormorant Garamond', 'Georgia', serif;
          font-size: clamp(2rem, 4vw, 2.85rem);
          font-weight: 500;
          color: #f3f3fb;
          margin: 0 0 0.85rem;
          line-height: 1.15;
          letter-spacing: -0.01em;
        }
        .ldir-title em { font-style: italic; color: #5eead4; }
        .ldir-lede {
          font-size: 1rem;
          color: rgba(216,217,230,0.78);
          max-width: 620px;
          line-height: 1.65;
        }
        .ldir-empty {
          padding: 2rem;
          border: 1px dashed rgba(94,234,212,0.25);
          border-radius: 0.75rem;
          font-family: ui-monospace, monospace;
          font-size: 0.85rem;
          color: rgba(148,163,184,0.8);
          text-align: center;
        }
        .ldir-stack {
          display: flex; flex-direction: column;
          gap: 2.2rem;
        }
        .ldir-row {
          display: flex; flex-direction: column; gap: 1rem;
        }
        .ldir-card {
          display: block;
          padding: 1.2rem 1.4rem 1.1rem;
          border: 1px solid rgba(94,234,212,0.15);
          border-radius: 0.85rem;
          background: rgba(8,10,18,0.6);
          color: inherit;
          text-decoration: none;
          transition: transform 0.15s, border-color 0.15s, box-shadow 0.2s;
        }
        .ldir-card:hover {
          transform: translateY(-2px);
          border-color: rgba(94,234,212,0.45);
          box-shadow: 0 22px 44px rgba(0,0,0,0.4);
        }
        .ldir-card-top {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 0.65rem;
        }
        .ldir-cat {
          font-family: ui-monospace, monospace;
          font-size: 0.62rem;
          letter-spacing: 0.2em;
          color: #5eead4;
          text-transform: uppercase;
          padding: 0.15rem 0.45rem;
          border-radius: 0.3rem;
          border: 1px solid rgba(94,234,212,0.3);
          background: rgba(94,234,212,0.06);
        }
        .ldir-count {
          font-family: ui-monospace, monospace;
          font-size: 0.7rem;
          color: rgba(148,163,184,0.7);
        }
        .ldir-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.4rem;
          font-weight: 600;
          color: #f3f3fb;
          margin: 0 0 0.5rem;
          line-height: 1.2;
        }
        .ldir-desc {
          font-size: 0.86rem;
          color: rgba(216,217,230,0.78);
          line-height: 1.55;
          margin: 0 0 0.9rem;
        }
        .ldir-enter {
          font-family: ui-monospace, monospace;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          color: #5eead4;
          text-transform: uppercase;
        }

        .ldir-manual {
          /* Lets TextbookSlider escape the directory's max-width and breathe.
             The slider already brings its own dark background + padding. */
          margin: 0.4rem -1.5rem 0;
        }
      `}</style>
    </main>
  );
}

