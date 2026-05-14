import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { unstable_noStore as noStore } from "next/cache";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Lounges | InHero",
  description: "Subject-based community lounges for the InHero cohort.",
};

interface PreviewDrop {
  kind: "photo" | "file" | "link";
  url: string;
  title: string;
  secondary: string | null;
  authorHandle: string | null;
  createdAt: string;
  mimeType?: string;
}

interface LoungeListing {
  slug: string;
  name: string;
  subjectCategory: string | null;
  description: string | null;
  postCount: number;
  previewDrops: PreviewDrop[];
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

              {l.previewDrops.length > 0 && (
                <section className="ldir-drops" aria-label={`Recent drops in ${l.name}`}>
                  <div className="ldir-drops-head">
                    <span className="ldir-drops-tag">DROPS · IN THIS LOUNGE</span>
                    <Link href={`/lounges/${l.slug}`} className="ldir-drops-more">
                      All drops →
                    </Link>
                  </div>
                  <div className="ldir-scroller">
                    {l.previewDrops.map((d, i) => (
                      <DropCard key={`${d.url}-${i}`} drop={d} />
                    ))}
                  </div>
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

        .ldir-drops { display: flex; flex-direction: column; gap: 0.6rem; }
        .ldir-drops-head {
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 0.4rem;
        }
        .ldir-drops-tag {
          font-family: ui-monospace, monospace;
          font-size: 0.6rem; font-weight: 800;
          letter-spacing: 0.24em;
          color: rgba(148,163,184,0.65);
          text-transform: uppercase;
        }
        .ldir-drops-more {
          font-family: ui-monospace, monospace;
          font-size: 0.62rem; font-weight: 700;
          letter-spacing: 0.16em;
          color: #5eead4;
          text-decoration: none;
        }
        .ldir-drops-more:hover { text-decoration: underline; }

        .ldir-scroller {
          display: flex; gap: 0.65rem;
          overflow-x: auto;
          padding: 0.3rem 0.4rem 0.85rem;
          scroll-snap-type: x mandatory;
          scrollbar-width: thin;
          scrollbar-color: rgba(94,234,212,0.25) transparent;
          mask-image: linear-gradient(to right, transparent, #000 18px, #000 calc(100% - 18px), transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, #000 18px, #000 calc(100% - 18px), transparent);
        }
        .ldir-scroller::-webkit-scrollbar { height: 6px; }
        .ldir-scroller::-webkit-scrollbar-thumb { background: rgba(94,234,212,0.25); border-radius: 3px; }
      `}</style>
    </main>
  );
}

// ─── DropCard — netflix-style hover preview ───────────────────────────
function DropCard({ drop }: { drop: PreviewDrop }) {
  const accent = drop.kind === "photo" ? "#5eead4" : drop.kind === "file" ? "#F4C95D" : "#A99CFF";
  const kindLabel = drop.kind === "photo" ? "PHOTO" : drop.kind === "file" ? "FILE" : "LINK";
  const sizeKb = (drop.kind === "file" && drop.mimeType)
    ? null
    : null; // file size not surfaced through API yet; reserved

  return (
    <a
      href={drop.url}
      target="_blank"
      rel="noopener noreferrer"
      className="dc-root"
      style={{ ["--accent" as string]: accent }}
      title={drop.title}
    >
      <div className="dc-media">
        {drop.kind === "photo" ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={drop.url} alt={drop.title} className="dc-img" loading="lazy" />
        ) : drop.kind === "file" ? (
          <div className="dc-file-cover">
            <span className="dc-file-icon">📄</span>
            <span className="dc-file-name">{drop.title}</span>
          </div>
        ) : (
          <div className="dc-link-cover">
            <span className="dc-link-icon">🔗</span>
            <span className="dc-link-host">{drop.title}</span>
          </div>
        )}
        <span className="dc-kind">{kindLabel}</span>
      </div>
      <div className="dc-foot">
        <div className="dc-title">{drop.title}</div>
        <div className="dc-meta">
          {drop.authorHandle && <span>by <em>{drop.authorHandle}</em></span>}
          <span className="dc-time">· {timeAgo(drop.createdAt)}</span>
        </div>
      </div>

      {/* Hover preview overlay */}
      <div className="dc-hover">
        {drop.kind === "photo" ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={drop.url} alt="" className="dc-hover-img" />
        ) : (
          <div className="dc-hover-text">
            <div className="dc-hover-kind">{kindLabel}{sizeKb ? ` · ${sizeKb} KB` : ""}</div>
            <div className="dc-hover-title">{drop.title}</div>
            {drop.secondary && <p className="dc-hover-secondary">{drop.secondary}</p>}
            {drop.authorHandle && (
              <div className="dc-hover-author">Dropped by <em>{drop.authorHandle}</em></div>
            )}
          </div>
        )}
      </div>

      <style>{`
        .dc-root {
          --accent: #5eead4;
          flex: 0 0 200px;
          scroll-snap-align: start;
          position: relative;
          display: flex; flex-direction: column;
          border: 1px solid color-mix(in srgb, var(--accent) 22%, transparent);
          border-radius: 0.7rem;
          background: rgba(8,10,18,0.7);
          overflow: hidden;
          text-decoration: none; color: inherit;
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.15s,
                      box-shadow 0.2s;
        }
        .dc-root:hover {
          transform: translateY(-4px) scale(1.03);
          border-color: var(--accent);
          box-shadow:
            0 22px 50px rgba(0,0,0,0.55),
            0 0 26px color-mix(in srgb, var(--accent) 30%, transparent);
          z-index: 5;
        }
        .dc-media {
          position: relative;
          aspect-ratio: 1.4 / 1;
          background: rgba(255,255,255,0.02);
          overflow: hidden;
          flex-shrink: 0;
        }
        .dc-img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .dc-file-cover, .dc-link-cover {
          width: 100%; height: 100%;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 0.4rem;
          background:
            radial-gradient(circle at 12% 0%, color-mix(in srgb, var(--accent) 14%, transparent), transparent 55%),
            rgba(8,10,18,0.85);
          padding: 0.5rem;
          text-align: center;
        }
        .dc-file-icon, .dc-link-icon { font-size: 1.7rem; opacity: 0.85; }
        .dc-file-name, .dc-link-host {
          font-family: ui-monospace, monospace;
          font-size: 0.66rem; font-weight: 700;
          color: var(--accent);
          letter-spacing: 0.04em;
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
          max-width: 100%;
          padding: 0 0.3rem;
        }
        .dc-kind {
          position: absolute; top: 0.45rem; left: 0.5rem;
          font-family: ui-monospace, monospace;
          font-size: 0.52rem; font-weight: 800;
          letter-spacing: 0.22em;
          padding: 0.15rem 0.45rem;
          border-radius: 0.25rem;
          background: rgba(8,10,18,0.72);
          color: var(--accent);
          backdrop-filter: blur(6px);
          border: 1px solid color-mix(in srgb, var(--accent) 35%, transparent);
        }
        .dc-foot {
          padding: 0.55rem 0.7rem 0.7rem;
          display: flex; flex-direction: column; gap: 0.18rem;
          flex: 1;
        }
        .dc-title {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 0.92rem;
          font-weight: 600;
          color: #f3f3fb;
          line-height: 1.15;
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .dc-meta {
          font-family: ui-monospace, monospace;
          font-size: 0.62rem;
          color: rgba(148,163,184,0.6);
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .dc-meta em {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          color: var(--accent);
          font-weight: 600;
          font-size: 1.05em;
        }
        .dc-time { margin-left: 0.2rem; }

        /* Hover preview overlay */
        .dc-hover {
          position: absolute; inset: 0;
          background: rgba(8,10,18,0.94);
          backdrop-filter: blur(8px);
          padding: 0.7rem 0.8rem;
          display: flex; flex-direction: column;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.15s 0.15s;
        }
        .dc-root:hover .dc-hover { opacity: 1; }
        .dc-hover-img {
          width: 100%; height: 100%; object-fit: contain;
          background: rgba(0,0,0,0.5);
          border-radius: 0.45rem;
        }
        .dc-hover-text { display: flex; flex-direction: column; gap: 0.35rem; height: 100%; }
        .dc-hover-kind {
          font-family: ui-monospace, monospace;
          font-size: 0.55rem; font-weight: 800;
          letter-spacing: 0.22em;
          color: var(--accent);
        }
        .dc-hover-title {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 1rem; font-weight: 600;
          color: #f3f3fb;
          line-height: 1.2;
        }
        .dc-hover-secondary {
          font-size: 0.74rem;
          color: rgba(216,217,230,0.78);
          line-height: 1.45;
          margin: 0;
          flex: 1;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
        }
        .dc-hover-author {
          font-family: ui-monospace, monospace;
          font-size: 0.65rem;
          color: rgba(148,163,184,0.7);
          margin-top: auto;
        }
        .dc-hover-author em {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          color: var(--accent);
          font-weight: 600;
          font-size: 1.05em;
        }
      `}</style>
    </a>
  );
}

function timeAgo(iso: string): string {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d`;
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
