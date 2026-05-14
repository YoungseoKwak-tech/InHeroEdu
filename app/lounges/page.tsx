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

interface PreviewMessage {
  id: string;
  handle: string | null;
  isMentor: boolean;
  content: string;
  type: "text" | "image" | "file";
  createdAt: string;
}

interface LoungeListing {
  slug: string;
  name: string;
  subjectCategory: string | null;
  description: string | null;
  postCount: number;
  chatCount: number;
  previewMessages: PreviewMessage[];
}

const LOUNGE_EMOJI: Record<string, string> = {
  "ap-bio":     "🧬",
  "ap-chem":    "⚗️",
  "ap-physics": "⚛️",
  "ap-calc-bc": "∫",
};

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
          {lounges.map((l) => {
            const hasManual = !!FIELD_MANUAL_BY_LOUNGE[l.slug];
            const emoji = LOUNGE_EMOJI[l.slug] ?? "◈";
            const preview = l.previewMessages ?? [];
            const hiddenCount = Math.max(0, l.chatCount - preview.length);
            return (
              <article key={l.slug} className={`ldir-row ${hasManual ? "is-paired" : ""}`}>
                <Link href={`/lounges/${l.slug}`} className="ldir-card">
                  <div className="ldir-card-top">
                    {l.subjectCategory && (
                      <span className="ldir-cat">{l.subjectCategory}</span>
                    )}
                    <span className="ldir-count">
                      {l.chatCount > 0 ? `${l.chatCount} messages` : `${l.postCount} posts`}
                    </span>
                  </div>
                  <h2 className="ldir-name">
                    <span className="ldir-name-emoji" aria-hidden="true">{emoji}</span>
                    {l.name}
                  </h2>
                  {l.description && <p className="ldir-desc">{l.description}</p>}

                  {preview.length > 0 && (
                    <div className="ldir-chat" aria-label="Live chat preview">
                      <div className="ldir-chat-tag">
                        <span className="ldir-chat-pulse" />
                        <span>LIVE · IN CHAT NOW</span>
                      </div>
                      <ul className="ldir-chat-list">
                        {preview.map((m) => (
                          <li key={m.id} className="ldir-chat-msg">
                            <span className={`ldir-chat-handle ${m.isMentor ? "is-mentor" : ""}`}>
                              {m.handle ?? "—"}
                            </span>
                            <span className="ldir-chat-text">{m.content}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="ldir-chat-lock">
                        <span className="ldir-chat-lock-icon">🔒</span>
                        <span>
                          {hiddenCount > 0
                            ? `Locked · enter to read ${hiddenCount} more →`
                            : "Locked · enter the room →"}
                        </span>
                      </div>
                    </div>
                  )}

                  {preview.length === 0 && (
                    <span className="ldir-enter">Enter →</span>
                  )}
                </Link>

                {hasManual && (
                  <section className="ldir-manual" aria-label={`${l.name} Field Manual preview`}>
                    <TextbookSlider />
                  </section>
                )}
              </article>
            );
          })}
        </div>
      )}

      <style>{`
        .ldir-root {
          max-width: 1320px;
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
        .ldir-row { display: flex; flex-direction: column; gap: 1rem; }
        .ldir-row.is-paired {
          display: grid;
          grid-template-columns: minmax(260px, 22rem) 1fr;
          gap: 1.4rem;
          align-items: stretch;
        }
        .ldir-row.is-paired .ldir-card {
          display: flex; flex-direction: column;
          height: 100%;
        }
        .ldir-row.is-paired .ldir-name { font-size: 1.55rem; }
        .ldir-row.is-paired .ldir-desc { font-size: 0.88rem; }
        .ldir-row.is-paired .ldir-enter { margin-top: auto; }
        @media (max-width: 900px) {
          .ldir-row.is-paired { grid-template-columns: 1fr; }
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
          display: flex; align-items: baseline; gap: 0.55rem;
        }
        .ldir-name-emoji {
          font-size: 1.15em;
          line-height: 1;
          filter: drop-shadow(0 0 12px rgba(94,234,212,0.35));
          font-family: 'Apple Color Emoji', 'Segoe UI Emoji', sans-serif;
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
          min-width: 0; /* lets grid item shrink */
          /* TextbookSlider brings its own padding + dark wash. */
        }

        /* LIVE CHAT PREVIEW */
        .ldir-chat {
          position: relative;
          margin-top: 1rem;
          padding: 0.85rem 0.95rem 0;
          background: rgba(94,234,212,0.04);
          border: 1px solid rgba(94,234,212,0.18);
          border-radius: 0.6rem;
          overflow: hidden;
          flex: 1;
          display: flex; flex-direction: column;
          min-height: 0;
        }
        .ldir-chat-tag {
          display: inline-flex; align-items: center; gap: 0.45rem;
          font-family: ui-monospace, monospace;
          font-size: 0.58rem; font-weight: 800;
          letter-spacing: 0.22em;
          color: #5eead4;
          text-transform: uppercase;
          margin-bottom: 0.55rem;
        }
        .ldir-chat-pulse {
          width: 6px; height: 6px; border-radius: 50%;
          background: #5eead4;
          box-shadow: 0 0 8px rgba(94,234,212,0.7);
          animation: ldir-pulse 1.6s ease-in-out infinite;
        }
        @keyframes ldir-pulse {
          0%,100% { opacity: 0.55; transform: scale(0.85); }
          50%     { opacity: 1;   transform: scale(1.2); }
        }

        .ldir-chat-list {
          list-style: none; padding: 0; margin: 0;
          display: flex; flex-direction: column; gap: 0.4rem;
          flex: 1; min-height: 0;
          overflow: hidden;
          /* Top messages fade out — feels like a 'window' into the room */
          mask-image: linear-gradient(to bottom, transparent 0, #000 18px, #000 calc(100% - 56px), transparent 100%);
          -webkit-mask-image: linear-gradient(to bottom, transparent 0, #000 18px, #000 calc(100% - 56px), transparent 100%);
          padding-bottom: 2.5rem;
        }
        .ldir-chat-msg {
          font-size: 0.84rem;
          line-height: 1.45;
          color: rgba(216,217,230,0.92);
          word-break: break-word;
          /* Each message clamps to ~2 lines so the preview stays tidy */
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .ldir-chat-handle {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-weight: 600;
          font-size: 1.05em;
          color: #f3f3fb;
          margin-right: 0.4em;
        }
        .ldir-chat-handle.is-mentor {
          color: #F4C95D;
          text-shadow: 0 0 8px rgba(244,201,93,0.3);
        }
        .ldir-chat-text { color: rgba(216,217,230,0.85); }

        .ldir-chat-lock {
          position: absolute; left: 0; right: 0; bottom: 0;
          display: flex; align-items: center; justify-content: center;
          gap: 0.45rem;
          padding: 0.75rem 0.85rem 0.85rem;
          background: linear-gradient(180deg, transparent, rgba(8,10,18,0.95) 50%);
          font-family: ui-monospace, monospace;
          font-size: 0.7rem; font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #5eead4;
        }
        .ldir-chat-lock-icon { font-size: 0.85em; }
      `}</style>
    </main>
  );
}

