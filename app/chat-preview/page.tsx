/**
 * /chat-preview — DESIGN MOCKUP ONLY. No backend, no realtime.
 * Demonstrates the 3-column lounge/club chat layout with realistic
 * InHero placeholder data so we can review the visual feel before
 * wiring the realtime/storage/API layers.
 */

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Chat Preview | InHero",
};

export const dynamic = "force-static";

// ─── Placeholder data ────────────────────────────────────────────────
type RoleBadge = "MENTOR" | "VERIFIED" | "MOD" | null;

interface MockUser {
  handle: string;
  year: string;
  role: RoleBadge;
  mentorRole?: string;
  online: boolean;
  accent: string;
}

const USERS: Record<string, MockUser> = {
  cornellian:      { handle: "cornellian",      year: "'28", role: "MENTOR",  mentorRole: "Cornell ECE",   online: true,  accent: "#F4C95D" },
  CornellBio27:    { handle: "CornellBio27",    year: "'27", role: "VERIFIED",                              online: true,  accent: "#7DD3FC" },
  FutureFounder17: { handle: "FutureFounder17", year: "'25", role: "VERIFIED",                              online: true,  accent: "#FF6B5B" },
  APChem5:         { handle: "APChem5",         year: "'26", role: null,                                    online: false, accent: "#5eead4" },
  NeuroDreamer:    { handle: "NeuroDreamer",    year: "'27", role: "VERIFIED",                              online: true,  accent: "#A99CFF" },
  Olympiad_KR:     { handle: "Olympiad_KR",     year: "'26", role: "VERIFIED",                              online: false, accent: "#5DCAA5" },
};

const SIDEBAR_LOUNGES = [
  { slug: "ap-bio",     name: "AP Biology",      glyph: "◈", unread: 3,  active: true,  lastActive: "1m" },
  { slug: "ap-chem",    name: "AP Chemistry",    glyph: "⚗", unread: 0,  active: false, lastActive: "12m" },
  { slug: "ap-physics", name: "AP Physics",      glyph: "✦", unread: 7,  active: false, lastActive: "2h" },
  { slug: "ap-calc-bc", name: "AP Calc BC",      glyph: "∫", unread: 0,  active: false, lastActive: "4h" },
];

const SIDEBAR_CLUBS = [
  { slug: "founders-lab",     name: "The Founders Lab",   glyph: "◆", unread: 1, active: false, lastActive: "23m", accent: "#F4C95D" },
  { slug: "olympiad-stack",   name: "The Olympiad Stack", glyph: "✦", unread: 0, active: false, lastActive: "1d",  accent: "#5eead4" },
  { slug: "research-society", name: "Research Society",   glyph: "◊", unread: 4, active: false, lastActive: "3h",  accent: "#A99CFF" },
];

interface MockReaction { emoji: string; count: number; mine: boolean; }
interface MockMessage {
  id: string;
  authorHandle: keyof typeof USERS | null; // null = system
  type: "text" | "image" | "drop" | "system" | "reply";
  text?: string;
  timestamp: string;
  reactions?: MockReaction[];
  replyTo?: { handle: string; snippet: string };
  imageUrl?: string;
  drop?: {
    category: string;
    title: string;
    subtitle: string;
    saveCount: number;
    accent: string;
  };
  groupedFromPrev?: boolean; // hide avatar/name if same author as previous within short window
  pinned?: boolean;
}

const MESSAGES: MockMessage[] = [
  {
    id: "div-1", authorHandle: null, type: "system",
    text: "Wednesday, November 13", timestamp: "",
  },
  {
    id: "m1", authorHandle: "CornellBio27", type: "text",
    text: "ok genuinely confused on the ETC — why does the proton pumping happen at complexes I, III, IV but not II?",
    timestamp: "10:42 AM",
  },
  {
    id: "m2", authorHandle: "CornellBio27", type: "text",
    text: "the textbook just kind of says it does",
    timestamp: "10:42 AM",
    groupedFromPrev: true,
  },
  {
    id: "m3", authorHandle: "cornellian", type: "text",
    text: "complex II = succinate dehydrogenase. it's part of the citric acid cycle AND the ETC — but it only passes electrons to ubiquinone, no proton pumping. the free energy drop across II isn't large enough to pump.",
    timestamp: "10:44 AM",
    reactions: [
      { emoji: "🔥", count: 5, mine: false },
      { emoji: "💡", count: 2, mine: true },
    ],
  },
  {
    id: "m4", authorHandle: "cornellian", type: "text",
    text: "literal one-liner: \"FADH2 enters at complex II → only 1.5 ATP. NADH enters at I → 2.5 ATP. that's the whole difference.\"",
    timestamp: "10:44 AM",
    groupedFromPrev: true,
  },
  {
    id: "m5", authorHandle: "CornellBio27", type: "text",
    text: "oh that actually makes sense thank you",
    timestamp: "10:45 AM",
    replyTo: { handle: "cornellian", snippet: "complex II = succinate dehydrogenase…" },
    reactions: [{ emoji: "👏", count: 3, mine: false }],
  },
  {
    id: "drop-1", authorHandle: "cornellian", type: "drop",
    timestamp: "10:48 AM",
    pinned: true,
    drop: {
      category: "AP BIO · CHEAT SHEET",
      title: "ETC + Oxidative Phosphorylation — One Page",
      subtitle: "Every proton pump, every coupling ratio, every trap question. Use Friday.",
      saveCount: 47,
      accent: "#F4C95D",
    },
  },
  {
    id: "m6", authorHandle: "FutureFounder17", type: "text",
    text: "saved. is there one of these for unit 4 too?",
    timestamp: "10:51 AM",
  },
  {
    id: "m7", authorHandle: "NeuroDreamer", type: "image",
    timestamp: "10:53 AM",
    imageUrl: "/diagram-placeholder.png",
    text: "my notes from the SAT bio review this morning. caption everything as you go — kinda life-changing",
  },
  {
    id: "sys-1", authorHandle: null, type: "system",
    text: "APChem5 joined the lounge.", timestamp: "",
  },
  {
    id: "m8", authorHandle: "APChem5", type: "text",
    text: "hi everyone 👋 just got verified this morning, finally posting",
    timestamp: "11:02 AM",
    reactions: [
      { emoji: "👋", count: 6, mine: false },
      { emoji: "🔥", count: 2, mine: false },
    ],
  },
  {
    id: "m9", authorHandle: "Olympiad_KR", type: "text",
    text: "anyone running a study sprint this weekend? trying to finish unit 7 before the practice exam",
    timestamp: "11:08 AM",
  },
];

const TRENDING_DROPS = [
  { title: "ETC + Oxidative Phos — One Page", category: "AP BIO", saves: 47, accent: "#F4C95D" },
  { title: "Unit 4 Cellular Respiration Map",  category: "AP BIO", saves: 31, accent: "#5eead4" },
  { title: "Trap Questions Around Photosynthesis", category: "AP BIO", saves: 24, accent: "#A99CFF" },
];

// ─── helpers ─────────────────────────────────────────────────────────
function RoleChip({ role, mentorRole }: { role: RoleBadge; mentorRole?: string }) {
  if (!role) return null;
  if (role === "MENTOR") return <span className="role-chip role-mentor">★ MENTOR · {mentorRole?.toUpperCase()}</span>;
  if (role === "VERIFIED") return <span className="role-chip role-verified">✓ VERIFIED</span>;
  return <span className="role-chip role-mod">MOD</span>;
}

// ─── page ────────────────────────────────────────────────────────────
export default function ChatPreviewPage() {
  return (
    <div className="cp-shell">
      {/* MOCKUP NOTICE */}
      <div className="cp-mockup-banner">
        <span>DESIGN MOCKUP · no backend yet · review then I'll wire realtime</span>
        <Link href="/lounges/ap-bio">← back to forum-style lounge</Link>
      </div>

      <div className="cp-grid">
        {/* ── LEFT SIDEBAR ─────────────────────────────────── */}
        <aside className="cp-left">
          <div className="cp-brand">
            <span className="cp-brand-mark">In<em>Hero</em></span>
            <span className="cp-brand-stamp">PRIVATE COHORT</span>
          </div>

          <div className="cp-side-section">
            <div className="cp-side-tag">LOUNGES</div>
            {SIDEBAR_LOUNGES.map((l) => (
              <button key={l.slug} className={`cp-side-room ${l.active ? "is-active" : ""}`}>
                <span className="cp-side-glyph">{l.glyph}</span>
                <span className="cp-side-name">{l.name}</span>
                {l.unread > 0 ? (
                  <span className="cp-unread">{l.unread}</span>
                ) : (
                  <span className="cp-side-time">{l.lastActive}</span>
                )}
              </button>
            ))}
          </div>

          <div className="cp-side-section">
            <div className="cp-side-tag">CLUBS</div>
            {SIDEBAR_CLUBS.map((c) => (
              <button key={c.slug} className="cp-side-room" style={{ ["--accent" as string]: c.accent }}>
                <span className="cp-side-glyph">{c.glyph}</span>
                <span className="cp-side-name">{c.name}</span>
                {c.unread > 0 ? (
                  <span className="cp-unread">{c.unread}</span>
                ) : (
                  <span className="cp-side-time">{c.lastActive}</span>
                )}
              </button>
            ))}
          </div>

          <div className="cp-side-footer">
            <button className="cp-discover">＋ Discover lounges</button>
            <div className="cp-side-user">
              <span className="cp-side-user-glyph">★</span>
              <div className="cp-side-user-text">
                <div className="cp-side-user-handle">cornellian</div>
                <div className="cp-side-user-meta">MENTOR · Cornell ECE</div>
              </div>
            </div>
          </div>
        </aside>

        {/* ── CENTER CHAT ──────────────────────────────────── */}
        <main className="cp-center">
          {/* header */}
          <header className="cp-head">
            <div className="cp-head-title">
              <span className="cp-head-glyph">◈</span>
              <div>
                <h1 className="cp-room-name">AP Biology</h1>
                <div className="cp-room-meta">
                  <span className="cp-online-dot" />
                  <span>14 online · 47 members</span>
                </div>
              </div>
            </div>
            <div className="cp-tabs">
              {["Chat", "Drops", "Pinned", "Archive"].map((t, i) => (
                <button key={t} className={`cp-tab ${i === 0 ? "is-active" : ""}`}>{t}</button>
              ))}
            </div>
          </header>

          {/* pinned drop banner */}
          <div className="cp-pinned-banner">
            <span className="cp-pin">📌</span>
            <div>
              <div className="cp-pinned-eyebrow">THIS WEEK'S DROP · pinned by cornellian</div>
              <div className="cp-pinned-title">ETC + Oxidative Phosphorylation — One Page</div>
            </div>
            <button className="cp-pinned-cta">Open →</button>
          </div>

          {/* feed */}
          <section className="cp-feed">
            {MESSAGES.map((m) => {
              if (m.type === "system") {
                return <div key={m.id} className="cp-system">— {m.text} —</div>;
              }
              const author = m.authorHandle ? USERS[m.authorHandle] : null;
              if (!author) return null;
              const isMe = author.handle === "cornellian"; // mockup: assume "I" am cornellian

              if (m.type === "drop" && m.drop) {
                return (
                  <article key={m.id} className={`cp-drop ${m.pinned ? "is-pinned" : ""}`} style={{ ["--accent" as string]: m.drop.accent }}>
                    {m.pinned && <div className="cp-drop-pinned">📌 PINNED</div>}
                    <div className="cp-drop-cat">{m.drop.category}</div>
                    <h3 className="cp-drop-title">{m.drop.title}</h3>
                    <p className="cp-drop-sub">{m.drop.subtitle}</p>
                    <div className="cp-drop-preview"><span>preview thumbnail</span></div>
                    <footer className="cp-drop-foot">
                      <div className="cp-drop-author">
                        <span className="cp-avatar cp-avatar-sm" style={{ ["--accent" as string]: author.accent }} aria-hidden="true">★</span>
                        <span>by <em>{author.handle}</em> · {author.mentorRole}</span>
                      </div>
                      <div className="cp-drop-stats">
                        <span>💾 {m.drop.saveCount} saves</span>
                      </div>
                      <div className="cp-drop-actions">
                        <button className="cp-drop-btn-primary">View</button>
                        <button className="cp-drop-btn-ghost">Save</button>
                        <button className="cp-drop-btn-ghost">↗</button>
                      </div>
                    </footer>
                  </article>
                );
              }

              return (
                <div key={m.id} className={`cp-msg ${isMe ? "is-me" : ""} ${m.groupedFromPrev ? "is-grouped" : ""}`}>
                  {!m.groupedFromPrev && !isMe && (
                    <span className="cp-avatar" style={{ ["--accent" as string]: author.accent }} aria-hidden="true">
                      {author.handle.slice(0, 1).toUpperCase()}
                    </span>
                  )}
                  {m.groupedFromPrev && !isMe && <span className="cp-avatar-spacer" aria-hidden="true" />}
                  <div className="cp-bubble-col">
                    {!m.groupedFromPrev && (
                      <div className="cp-byline">
                        <span className={`cp-name ${author.role === "MENTOR" ? "is-mentor" : ""}`}>{author.handle}</span>
                        <RoleChip role={author.role} mentorRole={author.mentorRole} />
                        <span className="cp-time">{m.timestamp}</span>
                      </div>
                    )}
                    {m.replyTo && (
                      <div className="cp-reply-quote">
                        <span className="cp-reply-bar" />
                        <div>
                          <div className="cp-reply-handle">{m.replyTo.handle}</div>
                          <div className="cp-reply-snippet">{m.replyTo.snippet}</div>
                        </div>
                      </div>
                    )}
                    <div className={`cp-bubble ${isMe ? "is-me" : ""}`}>
                      {m.type === "image" && m.imageUrl && (
                        <div className="cp-bubble-image">
                          <span>image · diagram-placeholder.png</span>
                        </div>
                      )}
                      {m.text && <p className="cp-bubble-text">{m.text}</p>}
                    </div>
                    {m.reactions && m.reactions.length > 0 && (
                      <div className="cp-reactions">
                        {m.reactions.map((r) => (
                          <span key={r.emoji} className={`cp-reaction ${r.mine ? "is-mine" : ""}`}>
                            <span className="cp-reaction-emoji">{r.emoji}</span>
                            <span className="cp-reaction-count">{r.count}</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* typing indicator */}
            <div className="cp-typing">
              <span className="cp-typing-avatar" aria-hidden="true">A</span>
              <span className="cp-typing-text"><em>APChem5</em> is typing</span>
              <span className="cp-typing-dots"><i /><i /><i /></span>
            </div>
          </section>

          {/* composer */}
          <footer className="cp-compose">
            <button className="cp-compose-icon" title="Attach file">＋</button>
            <input className="cp-compose-input" placeholder="Message #ap-biology" />
            <button className="cp-compose-drop" title="Drop a resource">◆ Drop</button>
            <button className="cp-compose-send">↑</button>
          </footer>
        </main>

        {/* ── RIGHT SIDEBAR ────────────────────────────────── */}
        <aside className="cp-right">
          <div className="cp-side-section">
            <div className="cp-side-tag">ONLINE — 14</div>
            {Object.values(USERS).filter((u) => u.online).map((u) => (
              <div key={u.handle} className="cp-online-row">
                <span className="cp-avatar cp-avatar-sm" style={{ ["--accent" as string]: u.accent }} aria-hidden="true">
                  {u.handle.slice(0, 1).toUpperCase()}
                </span>
                <div className="cp-online-text">
                  <div className={`cp-online-name ${u.role === "MENTOR" ? "is-mentor" : ""}`}>{u.handle}</div>
                  {u.role && (
                    <div className="cp-online-role">
                      {u.role === "MENTOR" ? `★ ${u.mentorRole}` : "✓ Verified Student"}
                    </div>
                  )}
                </div>
                <span className="cp-online-dot" />
              </div>
            ))}
          </div>

          <div className="cp-side-section">
            <div className="cp-side-tag">THIS WEEK'S DROP</div>
            <div className="cp-drop-mini">
              <div className="cp-drop-mini-cat">AP BIO · CHEAT SHEET</div>
              <div className="cp-drop-mini-title">ETC + Oxidative Phos — One Page</div>
              <div className="cp-drop-mini-author">by <em>cornellian</em> · Cornell ECE</div>
              <button className="cp-drop-mini-cta">Open drop →</button>
            </div>
          </div>

          <div className="cp-side-section">
            <div className="cp-side-tag">TRENDING IN THIS LOUNGE</div>
            {TRENDING_DROPS.map((d) => (
              <div key={d.title} className="cp-trend-row">
                <div>
                  <div className="cp-trend-cat">{d.category}</div>
                  <div className="cp-trend-title">{d.title}</div>
                </div>
                <span className="cp-trend-saves">💾 {d.saves}</span>
              </div>
            ))}
          </div>
        </aside>
      </div>

      {/* ────────────────────────────────────────────────────── */}
      <style>{`
        /* Reset within the mockup */
        .cp-shell {
          min-height: 100vh;
          background: #02040b;
          color: #d8d9e6;
          font-family: 'Inter', 'Space Grotesk', system-ui, sans-serif;
        }
        .cp-shell, .cp-shell * { box-sizing: border-box; }

        .cp-mockup-banner {
          padding: 0.6rem 1.1rem;
          background: rgba(244,201,93,0.08);
          border-bottom: 1px solid rgba(244,201,93,0.25);
          color: #F4C95D;
          font-family: ui-monospace, monospace;
          font-size: 0.7rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          display: flex; justify-content: space-between; align-items: center;
        }
        .cp-mockup-banner a {
          color: #5eead4;
          text-decoration: none;
          letter-spacing: 0.08em;
        }
        .cp-mockup-banner a:hover { text-decoration: underline; }

        .cp-grid {
          display: grid;
          grid-template-columns: 260px 1fr 300px;
          height: calc(100vh - 36px);
          background: linear-gradient(180deg, #050710 0%, #02040b 100%);
        }

        /* ── SIDEBARS ──────────────────────────────────────── */
        .cp-left, .cp-right {
          background: rgba(8,10,18,0.85);
          border-right: 1px solid rgba(255,255,255,0.04);
          overflow-y: auto;
          padding: 1.1rem 0.85rem;
        }
        .cp-right { border-right: none; border-left: 1px solid rgba(255,255,255,0.04); }

        .cp-brand {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 1.3rem;
          padding-bottom: 0.95rem;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .cp-brand-mark {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #f3f3fb;
          letter-spacing: -0.02em;
        }
        .cp-brand-mark em { font-style: italic; color: #5eead4; font-weight: 600; }
        .cp-brand-stamp {
          font-family: ui-monospace, monospace;
          font-size: 0.52rem;
          font-weight: 800;
          letter-spacing: 0.24em;
          color: rgba(148,163,184,0.6);
        }

        .cp-side-section { margin-bottom: 1.3rem; }
        .cp-side-tag {
          font-family: ui-monospace, monospace;
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.24em;
          color: rgba(148,163,184,0.55);
          text-transform: uppercase;
          padding: 0 0.3rem 0.55rem;
        }

        .cp-side-room {
          --accent: #5eead4;
          width: 100%;
          display: flex; align-items: center; gap: 0.55rem;
          padding: 0.5rem 0.6rem;
          background: transparent;
          border: 0;
          border-radius: 0.4rem;
          color: rgba(216,217,230,0.78);
          font-family: inherit;
          font-size: 0.86rem;
          cursor: pointer;
          text-align: left;
          margin-bottom: 0.15rem;
          transition: background 0.15s, color 0.15s;
        }
        .cp-side-room:hover { background: rgba(255,255,255,0.03); color: #f3f3fb; }
        .cp-side-room.is-active {
          background: linear-gradient(90deg, rgba(94,234,212,0.12), rgba(94,234,212,0.04));
          color: #f3f3fb;
          box-shadow: inset 2px 0 0 #5eead4;
        }
        .cp-side-glyph {
          width: 1.5rem; text-align: center;
          color: var(--accent);
          font-size: 1rem;
        }
        .cp-side-name {
          flex: 1; min-width: 0;
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
          font-weight: 500;
        }
        .cp-unread {
          font-family: ui-monospace, monospace;
          font-size: 0.62rem; font-weight: 800;
          padding: 0.1rem 0.4rem;
          border-radius: 999px;
          background: #5eead4;
          color: #0a0a10;
          min-width: 1.4rem; text-align: center;
        }
        .cp-side-time {
          font-family: ui-monospace, monospace;
          font-size: 0.62rem;
          color: rgba(148,163,184,0.5);
        }

        .cp-side-footer {
          margin-top: auto;
          padding-top: 1rem;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .cp-discover {
          width: 100%;
          padding: 0.5rem;
          font-family: ui-monospace, monospace;
          font-size: 0.7rem; font-weight: 600;
          letter-spacing: 0.12em;
          color: rgba(148,163,184,0.7);
          background: transparent;
          border: 1px dashed rgba(255,255,255,0.1);
          border-radius: 0.4rem;
          cursor: pointer;
          margin-bottom: 0.7rem;
        }
        .cp-discover:hover { color: #5eead4; border-color: rgba(94,234,212,0.35); }
        .cp-side-user {
          display: flex; align-items: center; gap: 0.55rem;
          padding: 0.5rem 0.55rem;
          background: rgba(244,201,93,0.06);
          border: 1px solid rgba(244,201,93,0.2);
          border-radius: 0.45rem;
        }
        .cp-side-user-glyph {
          color: #F4C95D;
          font-size: 0.95rem;
          text-shadow: 0 0 8px rgba(244,201,93,0.5);
        }
        .cp-side-user-handle {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 0.95rem;
          color: #f3f3fb;
          line-height: 1.1;
        }
        .cp-side-user-meta {
          font-family: ui-monospace, monospace;
          font-size: 0.58rem;
          letter-spacing: 0.14em;
          color: #F4C95D;
          margin-top: 0.1rem;
        }

        /* ── CENTER CHAT ───────────────────────────────────── */
        .cp-center { display: flex; flex-direction: column; min-height: 0; }
        .cp-head {
          padding: 1rem 1.4rem 0.6rem;
          background: rgba(5,7,16,0.85);
          backdrop-filter: blur(14px);
          border-bottom: 1px solid rgba(255,255,255,0.04);
          display: flex; flex-direction: column; gap: 0.85rem;
        }
        .cp-head-title { display: flex; align-items: center; gap: 0.7rem; }
        .cp-head-glyph {
          font-size: 1.6rem; color: #5eead4;
          text-shadow: 0 0 14px rgba(94,234,212,0.45);
          line-height: 1;
        }
        .cp-room-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.45rem;
          font-weight: 600;
          color: #f3f3fb;
          margin: 0;
          line-height: 1.1;
          letter-spacing: -0.005em;
        }
        .cp-room-meta {
          display: flex; align-items: center; gap: 0.4rem;
          font-family: ui-monospace, monospace;
          font-size: 0.7rem;
          color: rgba(148,163,184,0.7);
          letter-spacing: 0.06em;
        }
        .cp-online-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #5DCAA5;
          box-shadow: 0 0 8px rgba(93,202,165,0.6);
        }

        .cp-tabs { display: flex; gap: 0.25rem; }
        .cp-tab {
          font-family: ui-monospace, monospace;
          font-size: 0.7rem; font-weight: 700;
          letter-spacing: 0.16em;
          padding: 0.42rem 0.8rem;
          background: transparent;
          border: 0;
          color: rgba(148,163,184,0.65);
          cursor: pointer;
          border-bottom: 2px solid transparent;
          transition: color 0.15s, border-color 0.15s;
        }
        .cp-tab:hover { color: #f3f3fb; }
        .cp-tab.is-active {
          color: #f3f3fb;
          border-bottom-color: #5eead4;
        }

        .cp-pinned-banner {
          margin: 0.7rem 1rem 0;
          padding: 0.65rem 0.9rem;
          background: rgba(244,201,93,0.06);
          border: 1px solid rgba(244,201,93,0.3);
          border-radius: 0.55rem;
          display: flex; align-items: center; gap: 0.85rem;
        }
        .cp-pin { font-size: 1rem; }
        .cp-pinned-eyebrow {
          font-family: ui-monospace, monospace;
          font-size: 0.58rem; font-weight: 800;
          letter-spacing: 0.22em;
          color: #F4C95D;
          margin-bottom: 0.1rem;
        }
        .cp-pinned-title {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 0.98rem;
          color: #f3f3fb;
          flex: 1;
          line-height: 1.2;
        }
        .cp-pinned-cta {
          margin-left: auto;
          font-family: ui-monospace, monospace;
          font-size: 0.68rem; font-weight: 700;
          letter-spacing: 0.12em;
          padding: 0.4rem 0.8rem;
          background: #F4C95D;
          color: #0a0a10;
          border: 0;
          border-radius: 0.35rem;
          cursor: pointer;
        }
        .cp-pinned-cta:hover { filter: brightness(1.08); }

        .cp-feed {
          flex: 1;
          overflow-y: auto;
          padding: 1rem 1.4rem 1.4rem;
          display: flex; flex-direction: column;
          gap: 0.5rem;
        }
        .cp-system {
          align-self: center;
          font-family: ui-monospace, monospace;
          font-size: 0.66rem;
          color: rgba(148,163,184,0.5);
          letter-spacing: 0.12em;
          padding: 0.7rem 0;
        }

        /* ── MESSAGE BUBBLES ───────────────────────────────── */
        .cp-msg {
          display: flex; gap: 0.6rem;
          align-items: flex-start;
          margin-top: 0.6rem;
        }
        .cp-msg.is-grouped { margin-top: 0; }
        .cp-msg.is-me { flex-direction: row-reverse; }

        .cp-avatar {
          --accent: #5eead4;
          width: 2rem; height: 2rem;
          border-radius: 50%;
          background: color-mix(in srgb, var(--accent) 14%, transparent);
          border: 1px solid color-mix(in srgb, var(--accent) 35%, transparent);
          color: var(--accent);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-weight: 700;
          font-size: 0.9rem;
          flex-shrink: 0;
          text-shadow: 0 0 8px color-mix(in srgb, var(--accent) 45%, transparent);
        }
        .cp-avatar-sm { width: 1.4rem; height: 1.4rem; font-size: 0.7rem; }
        .cp-avatar-spacer { width: 2rem; flex-shrink: 0; }

        .cp-bubble-col { display: flex; flex-direction: column; gap: 0.25rem; min-width: 0; max-width: 62%; }
        .cp-msg.is-me .cp-bubble-col { align-items: flex-end; }

        .cp-byline {
          display: flex; align-items: baseline; gap: 0.45rem;
          font-size: 0.78rem;
          flex-wrap: wrap;
        }
        .cp-name {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-weight: 600;
          color: #f3f3fb;
          font-size: 0.92rem;
        }
        .cp-name.is-mentor { color: #F4C95D; text-shadow: 0 0 10px rgba(244,201,93,0.3); }
        .cp-time {
          font-family: ui-monospace, monospace;
          font-size: 0.65rem;
          color: rgba(148,163,184,0.5);
          letter-spacing: 0.05em;
        }

        .role-chip {
          font-family: ui-monospace, monospace;
          font-size: 0.54rem; font-weight: 800;
          letter-spacing: 0.18em;
          padding: 0.13rem 0.42rem;
          border-radius: 0.25rem;
          text-transform: uppercase;
        }
        .role-mentor   { color: #F4C95D; background: rgba(244,201,93,0.1);  border: 1px solid rgba(244,201,93,0.4); text-shadow: 0 0 4px rgba(244,201,93,0.4); }
        .role-verified { color: #7DD3FC; background: rgba(125,211,252,0.1); border: 1px solid rgba(125,211,252,0.4); }
        .role-mod      { color: #ff8b7e; background: rgba(255,107,91,0.1);  border: 1px solid rgba(255,107,91,0.4); }

        .cp-reply-quote {
          display: flex; gap: 0.5rem;
          padding: 0.4rem 0.6rem 0.4rem 0;
          background: rgba(255,255,255,0.02);
          border-radius: 0.5rem;
          font-size: 0.8rem;
          max-width: 100%;
        }
        .cp-reply-bar {
          width: 2px;
          background: rgba(94,234,212,0.7);
          border-radius: 1px;
          flex-shrink: 0;
          margin-left: 0.6rem;
        }
        .cp-reply-handle {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 0.78rem;
          color: #5eead4;
          line-height: 1.1;
        }
        .cp-reply-snippet {
          font-size: 0.74rem;
          color: rgba(216,217,230,0.6);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-top: 0.05rem;
        }

        .cp-bubble {
          padding: 0.65rem 0.95rem;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 18px 18px 18px 6px;
          color: rgba(216,217,230,0.94);
          font-size: 0.94rem;
          line-height: 1.5;
        }
        .cp-bubble.is-me {
          background: linear-gradient(135deg, rgba(94,234,212,0.18), rgba(94,234,212,0.06));
          border-color: rgba(94,234,212,0.35);
          color: #f3f3fb;
          border-radius: 18px 18px 6px 18px;
        }
        .cp-bubble-text { margin: 0; white-space: pre-wrap; word-wrap: break-word; }
        .cp-bubble-image {
          margin-bottom: 0.45rem;
          padding: 1.5rem 1rem;
          background: rgba(0,0,0,0.4);
          border: 1px dashed rgba(255,255,255,0.1);
          border-radius: 0.55rem;
          text-align: center;
          font-family: ui-monospace, monospace;
          font-size: 0.7rem;
          color: rgba(148,163,184,0.6);
          letter-spacing: 0.08em;
        }

        .cp-reactions { display: flex; gap: 0.25rem; padding: 0 0.3rem; }
        .cp-reaction {
          display: inline-flex; align-items: center; gap: 0.2rem;
          padding: 0.12rem 0.45rem;
          border-radius: 999px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          font-size: 0.72rem;
          font-family: ui-monospace, monospace;
          color: rgba(216,217,230,0.85);
          cursor: pointer;
          transition: border-color 0.15s, background 0.15s;
        }
        .cp-reaction.is-mine {
          border-color: rgba(94,234,212,0.5);
          background: rgba(94,234,212,0.1);
          color: #5eead4;
        }
        .cp-reaction-emoji { font-size: 0.85em; }
        .cp-reaction-count { font-weight: 700; }

        /* ── DROP CARD ─────────────────────────────────────── */
        .cp-drop {
          --accent: #F4C95D;
          align-self: stretch;
          max-width: 30rem;
          margin: 0.9rem 0;
          padding: 1.05rem 1.2rem 0.95rem;
          background:
            radial-gradient(circle at 12% 0%, color-mix(in srgb, var(--accent) 13%, transparent), transparent 55%),
            rgba(8,10,18,0.85);
          border: 1px solid color-mix(in srgb, var(--accent) 45%, transparent);
          border-radius: 14px;
          box-shadow:
            0 18px 44px rgba(0,0,0,0.45),
            0 0 24px color-mix(in srgb, var(--accent) 22%, transparent);
          position: relative;
        }
        .cp-drop.is-pinned::before {
          content: "";
          position: absolute; inset: 0;
          border-radius: 14px;
          padding: 1px;
          background: linear-gradient(135deg, color-mix(in srgb, var(--accent) 60%, transparent), transparent);
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
                  mask-composite: exclude;
          pointer-events: none;
        }
        .cp-drop-pinned {
          font-family: ui-monospace, monospace;
          font-size: 0.55rem; font-weight: 800;
          letter-spacing: 0.24em;
          color: var(--accent);
          margin-bottom: 0.4rem;
        }
        .cp-drop-cat {
          font-family: ui-monospace, monospace;
          font-size: 0.58rem;
          font-weight: 800;
          letter-spacing: 0.24em;
          color: var(--accent);
          margin-bottom: 0.4rem;
          text-shadow: 0 0 10px color-mix(in srgb, var(--accent) 45%, transparent);
        }
        .cp-drop-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.3rem;
          font-weight: 600;
          color: #f3f3fb;
          margin: 0 0 0.35rem;
          line-height: 1.15;
          letter-spacing: -0.005em;
        }
        .cp-drop-sub {
          font-size: 0.86rem;
          color: rgba(216,217,230,0.82);
          margin: 0 0 0.8rem;
          line-height: 1.5;
        }
        .cp-drop-preview {
          padding: 1.6rem 0.5rem;
          background: rgba(0,0,0,0.45);
          border: 1px dashed rgba(255,255,255,0.1);
          border-radius: 0.55rem;
          margin-bottom: 0.85rem;
          font-family: ui-monospace, monospace;
          font-size: 0.7rem;
          color: rgba(148,163,184,0.5);
          letter-spacing: 0.06em;
          text-align: center;
        }
        .cp-drop-foot { display: flex; align-items: center; gap: 0.7rem; flex-wrap: wrap; }
        .cp-drop-author {
          display: flex; align-items: center; gap: 0.4rem;
          font-family: ui-monospace, monospace;
          font-size: 0.74rem;
          color: rgba(216,217,230,0.78);
        }
        .cp-drop-author em {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 1.05em;
          color: var(--accent);
          font-weight: 600;
        }
        .cp-drop-stats {
          font-family: ui-monospace, monospace;
          font-size: 0.72rem;
          color: rgba(148,163,184,0.7);
        }
        .cp-drop-actions { display: flex; gap: 0.4rem; margin-left: auto; }
        .cp-drop-btn-primary {
          font-family: ui-monospace, monospace;
          font-size: 0.7rem; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          padding: 0.42rem 0.8rem;
          background: var(--accent); color: #0a0a10;
          border: 0; border-radius: 0.35rem;
          cursor: pointer;
        }
        .cp-drop-btn-primary:hover { filter: brightness(1.08); }
        .cp-drop-btn-ghost {
          font-family: ui-monospace, monospace;
          font-size: 0.7rem; font-weight: 700;
          letter-spacing: 0.12em; text-transform: uppercase;
          padding: 0.42rem 0.75rem;
          background: transparent;
          color: var(--accent);
          border: 1px solid color-mix(in srgb, var(--accent) 40%, transparent);
          border-radius: 0.35rem;
          cursor: pointer;
        }
        .cp-drop-btn-ghost:hover { background: color-mix(in srgb, var(--accent) 10%, transparent); }

        /* ── TYPING ────────────────────────────────────────── */
        .cp-typing {
          display: flex; align-items: center; gap: 0.55rem;
          padding: 0.4rem 0.6rem;
          margin-top: 0.4rem;
          font-size: 0.78rem;
          color: rgba(148,163,184,0.65);
          font-family: ui-monospace, monospace;
        }
        .cp-typing-avatar {
          width: 1.5rem; height: 1.5rem; border-radius: 50%;
          background: rgba(94,234,212,0.12);
          border: 1px solid rgba(94,234,212,0.35);
          color: #5eead4;
          font-size: 0.66rem;
          display: flex; align-items: center; justify-content: center;
        }
        .cp-typing-text em {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          color: #f3f3fb;
          font-size: 1.05em;
        }
        .cp-typing-dots { display: inline-flex; gap: 3px; }
        .cp-typing-dots i {
          width: 4px; height: 4px; border-radius: 50%;
          background: rgba(148,163,184,0.6);
          display: inline-block;
          animation: bounce 1.2s ease-in-out infinite;
        }
        .cp-typing-dots i:nth-child(2) { animation-delay: 0.2s; }
        .cp-typing-dots i:nth-child(3) { animation-delay: 0.4s; }
        @keyframes bounce {
          0%,80%,100% { opacity: 0.3; transform: translateY(0); }
          40%         { opacity: 1;   transform: translateY(-3px); }
        }

        /* ── COMPOSER ──────────────────────────────────────── */
        .cp-compose {
          padding: 0.85rem 1.2rem;
          background: rgba(5,7,16,0.92);
          border-top: 1px solid rgba(255,255,255,0.06);
          display: flex; align-items: center; gap: 0.55rem;
        }
        .cp-compose-icon, .cp-compose-send {
          width: 2.3rem; height: 2.3rem;
          border-radius: 0.5rem;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.03);
          color: rgba(216,217,230,0.85);
          font-size: 1.05rem;
          cursor: pointer;
          transition: border-color 0.15s, color 0.15s, background 0.15s;
        }
        .cp-compose-icon:hover { border-color: rgba(94,234,212,0.4); color: #5eead4; }
        .cp-compose-input {
          flex: 1;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 0.55rem;
          padding: 0.7rem 0.95rem;
          color: #f3f3fb;
          font-family: inherit;
          font-size: 0.93rem;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.2s;
        }
        .cp-compose-input:focus {
          border-color: #5eead4;
          box-shadow: 0 0 0 1px #5eead4, 0 0 14px rgba(94,234,212,0.2);
        }
        .cp-compose-input::placeholder { color: rgba(148,163,184,0.55); }
        .cp-compose-drop {
          font-family: ui-monospace, monospace;
          font-size: 0.7rem; font-weight: 700;
          letter-spacing: 0.14em;
          padding: 0.65rem 0.85rem;
          background: rgba(244,201,93,0.08);
          color: #F4C95D;
          border: 1px solid rgba(244,201,93,0.4);
          border-radius: 0.5rem;
          cursor: pointer;
        }
        .cp-compose-drop:hover { background: rgba(244,201,93,0.16); }
        .cp-compose-send {
          background: #5eead4;
          color: #0a0a10;
          border-color: #5eead4;
          font-weight: 800;
        }
        .cp-compose-send:hover { filter: brightness(1.08); box-shadow: 0 0 16px rgba(94,234,212,0.4); }

        /* ── RIGHT SIDEBAR ─────────────────────────────────── */
        .cp-online-row {
          display: flex; align-items: center; gap: 0.55rem;
          padding: 0.45rem 0.4rem;
          border-radius: 0.4rem;
          transition: background 0.15s;
        }
        .cp-online-row:hover { background: rgba(255,255,255,0.03); }
        .cp-online-text { flex: 1; min-width: 0; }
        .cp-online-name {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 0.92rem;
          color: #f3f3fb;
          line-height: 1.05;
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
        }
        .cp-online-name.is-mentor { color: #F4C95D; }
        .cp-online-role {
          font-family: ui-monospace, monospace;
          font-size: 0.55rem; font-weight: 700;
          letter-spacing: 0.18em;
          color: rgba(148,163,184,0.6);
          margin-top: 0.1rem;
        }

        .cp-drop-mini {
          padding: 0.85rem 0.9rem;
          background:
            radial-gradient(circle at 12% 0%, rgba(244,201,93,0.13), transparent 55%),
            rgba(8,10,18,0.7);
          border: 1px solid rgba(244,201,93,0.35);
          border-radius: 0.7rem;
        }
        .cp-drop-mini-cat {
          font-family: ui-monospace, monospace;
          font-size: 0.56rem; font-weight: 800;
          letter-spacing: 0.22em;
          color: #F4C95D;
          margin-bottom: 0.35rem;
        }
        .cp-drop-mini-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1rem; font-weight: 600;
          color: #f3f3fb;
          margin-bottom: 0.35rem;
          line-height: 1.2;
        }
        .cp-drop-mini-author {
          font-family: ui-monospace, monospace;
          font-size: 0.66rem;
          color: rgba(148,163,184,0.7);
          margin-bottom: 0.6rem;
        }
        .cp-drop-mini-author em {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          color: #F4C95D;
          font-size: 1.05em;
          font-weight: 600;
        }
        .cp-drop-mini-cta {
          width: 100%;
          font-family: ui-monospace, monospace;
          font-size: 0.66rem; font-weight: 700;
          letter-spacing: 0.14em;
          padding: 0.5rem;
          background: transparent;
          color: #F4C95D;
          border: 1px solid rgba(244,201,93,0.4);
          border-radius: 0.35rem;
          cursor: pointer;
        }
        .cp-drop-mini-cta:hover { background: rgba(244,201,93,0.1); }

        .cp-trend-row {
          display: flex; align-items: flex-start; gap: 0.55rem;
          padding: 0.45rem 0.4rem;
          border-radius: 0.35rem;
          cursor: pointer;
          transition: background 0.15s;
        }
        .cp-trend-row:hover { background: rgba(255,255,255,0.03); }
        .cp-trend-cat {
          font-family: ui-monospace, monospace;
          font-size: 0.5rem; font-weight: 800;
          letter-spacing: 0.2em;
          color: rgba(148,163,184,0.55);
          margin-bottom: 0.18rem;
        }
        .cp-trend-title {
          font-size: 0.82rem;
          color: rgba(216,217,230,0.85);
          line-height: 1.35;
        }
        .cp-trend-saves {
          font-family: ui-monospace, monospace;
          font-size: 0.68rem;
          color: rgba(148,163,184,0.7);
          flex-shrink: 0;
          margin-top: 0.18rem;
        }

        /* ── RESPONSIVE COLLAPSE ───────────────────────────── */
        @media (max-width: 1100px) {
          .cp-grid { grid-template-columns: 240px 1fr; }
          .cp-right { display: none; }
        }
        @media (max-width: 720px) {
          .cp-grid { grid-template-columns: 1fr; }
          .cp-left { display: none; }
        }
      `}</style>
    </div>
  );
}
