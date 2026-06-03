import type { Metadata } from "next";
import Link from "next/link";
import { headers } from "next/headers";
import { unstable_noStore as noStore } from "next/cache";
import TextbookSlider from "@/components/landing/TextbookSlider";
import LoungeSidebar from "@/components/lounges/LoungeSidebar";
import { getSeedPreviewBubbles } from "@/lib/seedDiscussions";
import { getLiveConfig } from "@/lib/seed/loungeRoster";

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
  /** True for InHero-seeded starter prompts; styled distinctly and never claimed as real activity. */
  isSeed?: boolean;
  /** True for the official u/inhero_seed system author (the gold ★ row). */
  isSeedBot?: boolean;
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
  /** Distinct users who've posted or chatted in this lounge. Real, not mocked. */
  userCount: number;
  previewMessages: PreviewMessage[];
}

// Hand-curated trending order. #1 anchors the hero pair; #2/#3 surface
// in the grid with a 🔥 TRENDING stamp + hover-reveal rep material.
const TRENDING_RANK: Record<string, 1 | 2 | 3> = {
  "ap-bio":     1,
  "sat":        2,
  "admissions": 3,
};

interface RepMaterial {
  kicker: string;
  title: string;
  subtitle: string;
  glyph: string;
  accent: string;
}

// Each lounge has a "rep doc" — the headline artifact you'd hover the card to
// preview. Most are COMING SOON placeholders; the copy sets the voice.
const REP_MATERIAL: Record<string, RepMaterial> = {
  // COLLEGE
  "sat": {
    kicker: "FEATURED DROP · COMING SOON",
    title: "SAT Trap Database",
    subtitle: "240+ traps logged. Reading misdirections, math grid-in tricks, the questions that wreck scores.",
    glyph: "📐",
    accent: "#7DD3FC",
  },
  "admissions": {
    kicker: "FEATURED DROP · COMING SOON",
    title: "Ivy Essay Archive",
    subtitle: "Dissected essays from accepted applicants. Openings, cuts, the line that made a reader pause.",
    glyph: "🎓",
    accent: "#A99CFF",
  },
  "essay-writing": {
    kicker: "FEATURED DROP · COMING SOON",
    title: "Cut Files: Personal Statements",
    subtitle: "Annotated rejections + accepted drafts side-by-side. The literal red-pen line edits, not the polished final.",
    glyph: "✍️",
    accent: "#F9A8D4",
  },
  "college-results": {
    kicker: "FEATURED DROP · COMING SOON",
    title: "Decision Pattern Tracker",
    subtitle: "Every decision tagged by stats, school, and the one variable that probably moved the outcome.",
    glyph: "📨",
    accent: "#86EFAC",
  },
  "summer-programs": {
    kicker: "FEATURED DROP · COMING SOON",
    title: "RSI / MITES Acceptance Files",
    subtitle: "Redacted applications from people who got in. What was on the page, in their own words.",
    glyph: "☀️",
    accent: "#FCD34D",
  },
  "scholarship": {
    kicker: "FEATURED DROP · COMING SOON",
    title: "Winning Essay Archive",
    subtitle: "Coca-Cola, Davidson, Regeneron — the actual winning essays, not the press releases.",
    glyph: "🏆",
    accent: "#F4C95D",
  },
  // TRACK
  "research": {
    kicker: "FEATURED DROP · COMING SOON",
    title: "Cold Email Logbook",
    subtitle: "Emails that got PI responses + the ones that got ignored. The difference annotated line by line.",
    glyph: "🔬",
    accent: "#5eead4",
  },
  "cs-ai": {
    kicker: "FEATURED DROP · COMING SOON",
    title: "Side Project Build Logs",
    subtitle: "Real shipped projects. User counts, git history, the boring engineering parts people leave out of demos.",
    glyph: "💻",
    accent: "#7DD3FC",
  },
  "pre-med": {
    kicker: "FEATURED DROP · COMING SOON",
    title: "MCAT Decoder",
    subtitle: "Section-by-section pattern recognition + clinical-hours playbook from people already in the path.",
    glyph: "🩺",
    accent: "#FCA5A5",
  },
  "engineering": {
    kicker: "FEATURED DROP · COMING SOON",
    title: "Build Portfolios That Hit",
    subtitle: "ECE, ME, BME, AERO — the kind of project work engineering programs actually reward at admit.",
    glyph: "⚙️",
    accent: "#A99CFF",
  },
  "olympiad": {
    kicker: "FEATURED DROP · COMING SOON",
    title: "Medal Postmortems",
    subtitle: "USAMO / USAPHO / USABO winners on the problems they got wrong and the patterns that took years to internalize.",
    glyph: "🏅",
    accent: "#F4C95D",
  },
  "startup-projects": {
    kicker: "FEATURED DROP · COMING SOON",
    title: "Founder Build Logs",
    subtitle: "Side projects that became products. Hackathon entries with brutal teardowns of why a thing did or didn't work.",
    glyph: "🚀",
    accent: "#ff8b7e",
  },
  // COHORT
  "productivity-study": {
    kicker: "FEATURED DROP · COMING SOON",
    title: "Week-12 Survival Stacks",
    subtitle: "Systems that held up when AP season, apps, and extracurriculars collided. Not the influencer version.",
    glyph: "⏱",
    accent: "#86EFAC",
  },
  "international-students": {
    kicker: "FEATURED DROP · COMING SOON",
    title: "Visa & Adjustment Field Guide",
    subtitle: "F-1 timing, dorm reality, what to do when your parents don't know how US college actually works.",
    glyph: "🌐",
    accent: "#7DD3FC",
  },
  "debate-humanities": {
    kicker: "FEATURED DROP · COMING SOON",
    title: "LD Case Vault",
    subtitle: "Winning cases, philosophy primers, the writers serious debaters actually read. Policy + LD + PF.",
    glyph: "📜",
    accent: "#F9A8D4",
  },
  "qna": {
    kicker: "FEATURED DROP · COMING SOON",
    title: "Questions That Got Answered",
    subtitle: "The threads where mentors actually showed up. Tagged by what made them work — and what got ignored.",
    glyph: "❓",
    accent: "#A99CFF",
  },
  "weekly-drops": {
    kicker: "ROLLING · UPDATED FRIDAY",
    title: "This Week's Drops",
    subtitle: "Everything published into the cohort this week — docs, files, mentor pickups, the one thing worth opening.",
    glyph: "💎",
    accent: "#F4C95D",
  },
  // AP (ap-bio is the hero variant — its Field Manual is the rep doc)
  "ap-chem": {
    kicker: "FEATURED DROP · COMING SOON",
    title: "Equilibrium Trap Database",
    subtitle: "The FRQ question types that wreck scores, with the canonical wrong-answer chain for each.",
    glyph: "⚗️",
    accent: "#86EFAC",
  },
  "ap-physics": {
    kicker: "FEATURED DROP · COMING SOON",
    title: "Mechanics Mistake Map",
    subtitle: "Torque, rotational motion, the diagram errors that lose half-credit even when the math is right.",
    glyph: "⚛️",
    accent: "#7DD3FC",
  },
  "ap-calc-bc": {
    kicker: "FEATURED DROP · COMING SOON",
    title: "Series Convergence Cheatsheet",
    subtitle: "Every test (ratio, root, alternating, integral) with the trap setup that makes students pick the wrong one.",
    glyph: "∫",
    accent: "#FCD34D",
  },
};

const LOUNGE_EMOJI: Record<string, string> = {
  // AP
  "ap-bio":                "🧬",
  "ap-chem":               "⚗️",
  "ap-physics":            "⚛️",
  "ap-calc-bc":            "∫",
  // College / Admissions
  "sat":                   "📐",
  "admissions":            "🎓",
  "essay-writing":         "✍️",
  "college-results":       "📨",
  "summer-programs":       "☀️",
  "scholarship":           "🏆",
  // Track
  "research":              "🔬",
  "cs-ai":                 "💻",
  "pre-med":               "🩺",
  "engineering":           "⚙️",
  "olympiad":              "🏅",
  "startup-projects":      "🚀",
  // Cohort / Life
  "productivity-study":    "⏱",
  "international-students":"🌐",
  "debate-humanities":     "📜",
  "qna":                   "❓",
  "weekly-drops":          "💎",
};

async function fetchLounges(): Promise<LoungeListing[]> {
  noStore();
  const h = await headers();
  const host = h.get("host");
  const proto =
    h.get("x-forwarded-proto") ?? (host?.startsWith("localhost") ? "http" : "https");
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
  const rawLounges = await fetchLounges();
  // Mix InHero-seeded starter bubbles into each card's preview so the
  // "LIVE · IN CHAT NOW" panel feels populated. Real messages are kept at
  // the tail (most recent) so they win the slice(-3) in grid view.
  const lounges: LoungeListing[] = rawLounges.map((l) => {
    const seeds = getSeedPreviewBubbles(l.slug, 5);
    if (seeds.length === 0) return l;
    return { ...l, previewMessages: [...seeds, ...(l.previewMessages ?? [])] };
  });

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
        <div className="ldir-shell">
        <aside className="ldir-sidebar">
          <LoungeSidebar lounges={lounges.map(({ slug, name }) => ({ slug, name }))} />
        </aside>
        <div className="ldir-main">
          {/* Paired hero rows: lounge card + Field Manual side-by-side */}
          <div className="ldir-stack">
            {lounges
              .filter((l) => !!FIELD_MANUAL_BY_LOUNGE[l.slug])
              .map((l) => (
                <article key={l.slug} className="ldir-row is-paired">
                  <LoungeCard lounge={l} variant="hero" />
                  <section className="ldir-manual" aria-label={`${l.name} Field Manual preview`}>
                    <TextbookSlider />
                  </section>
                </article>
              ))}
          </div>

          {/* Grid of remaining free lounges — trending #2/#3 first */}
          {lounges.some((l) => !FIELD_MANUAL_BY_LOUNGE[l.slug]) && (
            <>
              <div className="ldir-section-tag">EVERY OTHER ROOM</div>
              <div className="ldir-grid">
                {lounges
                  .filter((l) => !FIELD_MANUAL_BY_LOUNGE[l.slug])
                  .sort((a, b) => {
                    const ra = TRENDING_RANK[a.slug] ?? 99;
                    const rb = TRENDING_RANK[b.slug] ?? 99;
                    return ra - rb;
                  })
                  .map((l) => <LoungeCard key={l.slug} lounge={l} variant="grid" />)}
              </div>
            </>
          )}
        </div>
        </div>
      )}

      <style>{`
        .ldir-root {
          /* Full-width — left margin is filled by the LoungeSidebar */
          margin: 0;
          padding: 3rem 1.5rem 5rem;
          color: #d8d9e6;
          font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif;
        }
        .ldir-shell {
          display: grid;
          grid-template-columns: minmax(240px, 280px) minmax(0, 1fr);
          gap: 1.75rem;
          align-items: flex-start;
        }
        .ldir-sidebar {
          position: sticky;
          top: 1.5rem;
          align-self: start;
          max-height: calc(100vh - 4rem);
          overflow-y: auto;
          padding-right: 0.25rem;
        }
        .ldir-main { min-width: 0; }
        @media (max-width: 980px) {
          .ldir-shell { grid-template-columns: 1fr; gap: 1rem; }
          .ldir-sidebar { position: static; max-height: none; overflow: visible; }
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
          grid-template-columns: minmax(340px, 28rem) minmax(0, 1fr);
          gap: 1.6rem;
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

        /* TRENDING STAMPS */
        .ldir-stamp {
          display: inline-flex; align-items: center; gap: 0.4rem;
          padding: 0.22rem 0.5rem;
          border-radius: 0.3rem;
          font-family: ui-monospace, 'JetBrains Mono', monospace;
          font-size: 0.58rem; font-weight: 800;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          margin-bottom: 0.55rem;
          line-height: 1;
        }
        .ldir-stamp-hot {
          background: rgba(255,107,91,0.12);
          border: 1px solid rgba(255,107,91,0.55);
          color: #ff8b7e;
          text-shadow: 0 0 6px rgba(255,107,91,0.45);
          box-shadow: 0 0 18px rgba(255,107,91,0.18);
        }
        .ldir-stamp-trending {
          background: rgba(244,201,93,0.1);
          border: 1px solid rgba(244,201,93,0.4);
          color: #F4C95D;
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

        /* Live ambient row on every card — pulsing green dot + counts. */
        .ldir-live {
          display: flex; align-items: center; flex-wrap: wrap;
          gap: 0.32rem;
          margin-bottom: 0.55rem;
          padding: 0.3rem 0.5rem;
          background: rgba(93,202,165,0.05);
          border: 1px solid rgba(93,202,165,0.18);
          border-radius: 0.35rem;
          font-family: ui-monospace, 'JetBrains Mono', monospace;
          font-size: 0.66rem;
          color: rgba(148,163,184,0.78);
          line-height: 1.2;
        }
        .ldir-live strong {
          color: #f3f3fb;
          font-weight: 700;
          font-variant-numeric: tabular-nums;
          margin-right: 0.08rem;
        }
        .ldir-live-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: #5DCAA5;
          box-shadow: 0 0 6px rgba(93,202,165,0.7);
          animation: ldir-live-pulse 1.6s ease-in-out infinite;
          margin-right: 0.18rem;
          flex-shrink: 0;
        }
        @keyframes ldir-live-pulse {
          0%,100% { opacity: 0.55; transform: scale(0.85); }
          50%     { opacity: 1;    transform: scale(1.2); }
        }
        .ldir-live-sep { color: rgba(148,163,184,0.35); margin: 0 0.05rem; }
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
        .ldir-chat-handle.is-seed {
          color: #F4C95D;
          text-shadow: 0 0 8px rgba(244,201,93,0.3);
          letter-spacing: 0.01em;
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

        /* SECTION TAG between hero pair and grid */
        .ldir-section-tag {
          margin: 3rem 0 1.2rem;
          font-family: ui-monospace, monospace;
          font-size: 0.66rem; font-weight: 800;
          letter-spacing: 0.28em;
          color: rgba(148,163,184,0.55);
          text-transform: uppercase;
          padding-bottom: 0.6rem;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        /* GRID for non-paired lounges (compact cards) */
        .ldir-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 0.95rem;
        }
        .ldir-row.is-grid { display: block; }
        .ldir-row.is-grid .ldir-card {
          height: 100%;
          padding: 1.1rem 1.2rem 1rem;
          display: flex; flex-direction: column;
        }
        .ldir-row.is-grid .ldir-name { font-size: 1.25rem; margin-bottom: 0.4rem; }
        .ldir-row.is-grid .ldir-desc {
          font-size: 0.84rem;
          margin-bottom: 0.65rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .ldir-row.is-grid .ldir-chat {
          margin-top: 0.5rem;
          padding: 0.65rem 0.8rem 0;
          max-height: 11rem;
        }
        .ldir-row.is-grid .ldir-chat-list {
          padding-bottom: 2.2rem;
          gap: 0.3rem;
        }
        .ldir-row.is-grid .ldir-chat-msg { font-size: 0.78rem; }
        .ldir-row.is-grid .ldir-chat-lock {
          padding: 0.55rem 0.75rem 0.6rem;
          font-size: 0.65rem;
        }

        /* HOVER-REVEAL REP DOC — fades over the card on hover.
           Accent color comes from --rep-accent inline style per material. */
        .ldir-card.is-revealable { position: relative; }
        .ldir-rep {
          position: absolute;
          inset: 0.5rem;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          text-align: center;
          gap: 0.5rem;
          padding: 1rem 1.1rem;
          background: rgba(8,10,18,0.97);
          border: 1px solid color-mix(in srgb, var(--rep-accent, #5eead4) 50%, transparent);
          border-radius: 0.7rem;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.18s ease;
          z-index: 2;
          box-shadow: 0 0 0 1px color-mix(in srgb, var(--rep-accent, #5eead4) 12%, transparent),
                      0 22px 44px rgba(0,0,0,0.45);
        }
        .ldir-card.is-revealable:hover .ldir-rep { opacity: 1; }
        .ldir-rep-kicker {
          font-family: ui-monospace, monospace;
          font-size: 0.58rem; font-weight: 800;
          letter-spacing: 0.22em;
          color: var(--rep-accent, #5eead4);
          text-transform: uppercase;
        }
        .ldir-rep-glyph {
          font-size: 2rem;
          line-height: 1;
          filter: drop-shadow(0 0 16px color-mix(in srgb, var(--rep-accent, #5eead4) 45%, transparent));
        }
        .ldir-rep-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          font-weight: 600;
          color: #f3f3fb;
          line-height: 1.15;
          margin: 0;
        }
        .ldir-rep-subtitle {
          font-size: 0.78rem;
          line-height: 1.5;
          color: rgba(216,217,230,0.82);
          margin: 0;
          max-width: 30ch;
        }
        .ldir-rep-cta {
          margin-top: 0.3rem;
          font-family: ui-monospace, monospace;
          font-size: 0.68rem; font-weight: 700;
          letter-spacing: 0.14em;
          color: var(--rep-accent, #5eead4);
          text-transform: uppercase;
        }
      `}</style>
    </main>
  );
}

// ─── LoungeCard ────────────────────────────────────────────────
function LoungeCard({
  lounge: l,
  variant,
}: {
  lounge: LoungeListing;
  variant: "hero" | "grid";
}) {
  const emoji = LOUNGE_EMOJI[l.slug] ?? "◈";
  const preview = l.previewMessages ?? [];
  const hiddenCount = Math.max(0, l.chatCount - preview.length);
  const visibleMessages = variant === "grid" ? preview.slice(-3) : preview;

  const rank = TRENDING_RANK[l.slug];
  const repMaterial = REP_MATERIAL[l.slug];
  const canHoverReveal = variant === "grid" && !!repMaterial;

  const liveConfig = getLiveConfig(l.slug);

  const inner = (
    <Link href={`/lounges/${l.slug}`} className={`ldir-card ${canHoverReveal ? "is-revealable" : ""}`}>
      <div className="ldir-card-top">
        {l.subjectCategory && <span className="ldir-cat">{l.subjectCategory}</span>}
        <span className="ldir-count">
          {l.postCount} docs · {l.userCount} active
        </span>
      </div>

      <div className="ldir-live">
        <span className="ldir-live-dot" aria-hidden="true" />
        <strong>{liveConfig.onlineBase.toLocaleString()}</strong>
        <span>online</span>
        <span className="ldir-live-sep" aria-hidden="true">·</span>
        <strong>{liveConfig.messagesTodayStart.toLocaleString()}</strong>
        <span>today</span>
        <span className="ldir-live-sep" aria-hidden="true">·</span>
        <strong>{liveConfig.typingBase}</strong>
        <span>typing</span>
      </div>

      {rank === 1 && (
        <div className="ldir-stamp ldir-stamp-hot">
          <span aria-hidden="true">🔥</span>
          <span>HOT · #1 TRENDING</span>
        </div>
      )}
      {(rank === 2 || rank === 3) && (
        <div className="ldir-stamp ldir-stamp-trending">
          <span aria-hidden="true">🔥</span>
          <span>TRENDING · #{rank}</span>
        </div>
      )}

      <h2 className="ldir-name">
        <span className="ldir-name-emoji" aria-hidden="true">{emoji}</span>
        {l.name}
      </h2>
      {l.description && <p className="ldir-desc">{l.description}</p>}

      {visibleMessages.length > 0 ? (
        <div className="ldir-chat" aria-label="Live chat preview">
          <div className="ldir-chat-tag">
            <span className="ldir-chat-pulse" />
            <span>{visibleMessages.some((m) => m.isSeed) ? "LIVE · STARTER CHATS" : "LIVE · IN CHAT NOW"}</span>
          </div>
          <ul className="ldir-chat-list">
            {visibleMessages.map((m) => {
              const isSeedBot = !!m.isSeedBot;
              return (
                <li key={m.id} className="ldir-chat-msg">
                  <span
                    className={`ldir-chat-handle ${m.isMentor ? "is-mentor" : ""} ${isSeedBot ? "is-seed" : ""}`}
                  >
                    {isSeedBot && <span aria-hidden="true">★ </span>}
                    {m.handle ?? "—"}
                  </span>
                  <span className="ldir-chat-text">{m.content}</span>
                </li>
              );
            })}
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
      ) : (
        <span className="ldir-enter">Enter →</span>
      )}

      {canHoverReveal && repMaterial && (
        <div
          className="ldir-rep"
          style={{ ["--rep-accent" as string]: repMaterial.accent }}
          aria-hidden="true"
        >
          <div className="ldir-rep-kicker">{repMaterial.kicker}</div>
          <div className="ldir-rep-glyph">{repMaterial.glyph}</div>
          <div className="ldir-rep-title">{repMaterial.title}</div>
          <p className="ldir-rep-subtitle">{repMaterial.subtitle}</p>
          <div className="ldir-rep-cta">Enter the room →</div>
        </div>
      )}
    </Link>
  );

  // Hero variant is wrapped by the parent <article className="ldir-row is-paired">.
  if (variant === "hero") return inner;
  return <article className={`ldir-row is-grid ${rank ? "is-trending" : ""}`}>{inner}</article>;
}

