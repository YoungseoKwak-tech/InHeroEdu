"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

interface SidebarLounge {
  slug: string;
  name: string;
}

interface Props {
  lounges: SidebarLounge[];
  currentSlug?: string;
}

// Category buckets. Order = display order in the sidebar.
const CATEGORIES = ["AP", "STEM", "ADMISSION", "FEEL FREE"] as const;
type Category = (typeof CATEGORIES)[number];

const LOUNGE_CATEGORY: Record<string, Category> = {
  "ap-bio": "AP",
  "ap-chem": "AP",
  "ap-physics": "AP",
  "ap-calc-bc": "AP",
  "research": "STEM",
  "cs-ai": "STEM",
  "engineering": "STEM",
  "olympiad": "STEM",
  "pre-med": "STEM",
  "startup-projects": "STEM",
  "admissions": "ADMISSION",
  "sat": "ADMISSION",
  "essay-writing": "ADMISSION",
  "college-results": "ADMISSION",
  "summer-programs": "ADMISSION",
  "scholarship": "ADMISSION",
  "productivity-study": "FEEL FREE",
  "international-students": "FEEL FREE",
  "debate-humanities": "FEEL FREE",
  "qna": "FEEL FREE",
  "weekly-drops": "FEEL FREE",
};

const LOUNGE_EMOJI: Record<string, string> = {
  "ap-bio": "🧬", "ap-chem": "⚗️", "ap-physics": "⚛️", "ap-calc-bc": "∫",
  "sat": "📐", "admissions": "🎓", "essay-writing": "✍️",
  "college-results": "📨", "summer-programs": "☀️", "scholarship": "🏆",
  "research": "🔬", "cs-ai": "💻", "pre-med": "🩺", "engineering": "⚙️",
  "olympiad": "🏅", "startup-projects": "🚀",
  "productivity-study": "⏱", "international-students": "🌐",
  "debate-humanities": "📜", "qna": "❓", "weekly-drops": "💎",
};

export default function LoungeSidebar({ lounges, currentSlug }: Props) {
  const [query, setQuery] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [requestName, setRequestName] = useState("");
  const [requestDesc, setRequestDesc] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const grouped = useMemo(() => {
    const q = query.trim().toLowerCase();
    const out: Record<Category, SidebarLounge[]> = {
      "AP": [], "STEM": [], "ADMISSION": [], "FEEL FREE": [],
    };
    for (const l of lounges) {
      if (q && !l.name.toLowerCase().includes(q) && !l.slug.toLowerCase().includes(q)) continue;
      const cat: Category = LOUNGE_CATEGORY[l.slug] ?? "FEEL FREE";
      out[cat].push(l);
    }
    return out;
  }, [lounges, query]);

  function submitRequest() {
    if (!requestName.trim()) return;
    // Wire-up TODO: POST to /api/lounges/request once the endpoint lands.
    // For now this is a local-only acknowledgement so the UX is testable.
    setSubmitted(true);
    setRequestName("");
    setRequestDesc("");
    setTimeout(() => {
      setCreateOpen(false);
      setSubmitted(false);
    }, 1400);
  }

  return (
    <nav className="lsb-root" aria-label="Lounge directory">
      <div className="lsb-search">
        <span className="lsb-search-icon" aria-hidden="true">🔍</span>
        <input
          type="search"
          className="lsb-search-input"
          placeholder="Search lounges by name…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search lounges"
        />
        {query && (
          <button
            type="button"
            className="lsb-search-clear"
            onClick={() => setQuery("")}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      <button
        type="button"
        className="lsb-create"
        onClick={() => setCreateOpen(true)}
      >
        <span aria-hidden="true">+</span>
        <span>Create new lounge</span>
      </button>

      <div className="lsb-sections">
        {CATEGORIES.map((cat) => {
          const items = grouped[cat];
          if (items.length === 0 && query) return null;
          return (
            <section key={cat} className="lsb-section">
              <h3 className="lsb-cat">
                <span>{cat}</span>
                <span className="lsb-cat-count">{items.length}</span>
              </h3>
              {items.length === 0 ? (
                <div className="lsb-empty">No lounges yet.</div>
              ) : (
                <ul className="lsb-list">
                  {items.map((l) => {
                    const isActive = l.slug === currentSlug;
                    return (
                      <li key={l.slug}>
                        <Link
                          href={`/lounges/${l.slug}`}
                          className={`lsb-item ${isActive ? "is-active" : ""}`}
                        >
                          <span className="lsb-item-emoji" aria-hidden="true">
                            {LOUNGE_EMOJI[l.slug] ?? "◈"}
                          </span>
                          <span className="lsb-item-name">{l.name}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>
          );
        })}
      </div>

      {createOpen && (
        <div className="lsb-modal-backdrop" onClick={() => setCreateOpen(false)}>
          <div
            className="lsb-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lsb-modal-title"
          >
            <header className="lsb-modal-head">
              <div className="lsb-modal-eyebrow">REQUEST A NEW LOUNGE</div>
              <h2 id="lsb-modal-title" className="lsb-modal-title">
                Pitch the next room.
              </h2>
              <p className="lsb-modal-sub">
                Lounges are subject-based. Tell us the topic + why it deserves its own room. We review weekly.
              </p>
              <button
                type="button"
                className="lsb-modal-close"
                onClick={() => setCreateOpen(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </header>
            {submitted ? (
              <div className="lsb-modal-ok">
                <span aria-hidden="true">✓</span>
                <div>
                  <strong>Sent.</strong>
                  <p>We'll surface it in the cohort review.</p>
                </div>
              </div>
            ) : (
              <div className="lsb-modal-body">
                <label className="lsb-modal-field">
                  <span>Lounge name</span>
                  <input
                    type="text"
                    value={requestName}
                    onChange={(e) => setRequestName(e.target.value)}
                    placeholder="e.g. AP Lang & Comp"
                    maxLength={60}
                  />
                </label>
                <label className="lsb-modal-field">
                  <span>Why this room? (optional)</span>
                  <textarea
                    value={requestDesc}
                    onChange={(e) => setRequestDesc(e.target.value)}
                    placeholder="What you'd post here, who else wants this, what the rep doc would be."
                    rows={4}
                    maxLength={400}
                  />
                </label>
                <div className="lsb-modal-actions">
                  <button
                    type="button"
                    className="lsb-modal-cancel"
                    onClick={() => setCreateOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="lsb-modal-submit"
                    onClick={submitRequest}
                    disabled={!requestName.trim()}
                  >
                    Submit request
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        .lsb-root {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          padding: 0.85rem 0.75rem 1rem;
          background: rgba(8,10,18,0.55);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 0.8rem;
          font-family: 'Inter', 'Space Grotesk', system-ui, sans-serif;
        }

        .lsb-search {
          display: flex; align-items: center; gap: 0.35rem;
          padding: 0.45rem 0.65rem;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 0.45rem;
          transition: border-color 0.15s, background 0.15s;
        }
        .lsb-search:focus-within {
          border-color: rgba(94,234,212,0.55);
          background: rgba(94,234,212,0.05);
          box-shadow: 0 0 0 1px rgba(94,234,212,0.35);
        }
        .lsb-search-icon { font-size: 0.85rem; opacity: 0.75; }
        .lsb-search-input {
          flex: 1; min-width: 0;
          background: transparent; border: 0; outline: none;
          color: #f3f3fb;
          font-family: inherit;
          font-size: 0.84rem;
        }
        .lsb-search-input::placeholder { color: rgba(148,163,184,0.5); }
        .lsb-search-clear {
          background: transparent; border: 0;
          color: rgba(148,163,184,0.6);
          cursor: pointer;
          font-size: 0.78rem;
          padding: 0 0.15rem;
        }
        .lsb-search-clear:hover { color: #ff8b7e; }

        .lsb-create {
          display: flex; align-items: center; justify-content: center;
          gap: 0.45rem;
          width: 100%;
          padding: 0.55rem 0.7rem;
          background: rgba(94,234,212,0.06);
          border: 1px dashed rgba(94,234,212,0.45);
          border-radius: 0.45rem;
          color: #5eead4;
          font-family: ui-monospace, 'JetBrains Mono', monospace;
          font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.15s, border-color 0.15s;
        }
        .lsb-create:hover {
          background: rgba(94,234,212,0.12);
          border-color: rgba(94,234,212,0.7);
          border-style: solid;
        }
        .lsb-create span:first-child {
          font-size: 1.05rem; line-height: 1; font-weight: 800;
        }

        .lsb-sections {
          display: flex; flex-direction: column;
          gap: 0.85rem;
          margin-top: 0.1rem;
        }
        .lsb-section { display: flex; flex-direction: column; gap: 0.35rem; }
        .lsb-cat {
          display: flex; justify-content: space-between; align-items: baseline;
          margin: 0;
          padding: 0.25rem 0.4rem;
          font-family: ui-monospace, 'JetBrains Mono', monospace;
          font-size: 0.62rem; font-weight: 800;
          letter-spacing: 0.22em;
          color: rgba(148,163,184,0.62);
          text-transform: uppercase;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .lsb-cat-count {
          font-size: 0.6rem;
          color: rgba(148,163,184,0.5);
          font-weight: 700;
          letter-spacing: 0;
        }
        .lsb-empty {
          padding: 0.35rem 0.5rem;
          font-family: ui-monospace, monospace;
          font-size: 0.72rem;
          color: rgba(148,163,184,0.45);
          font-style: italic;
        }
        .lsb-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.1rem; }
        .lsb-item {
          display: flex; align-items: center; gap: 0.5rem;
          padding: 0.45rem 0.55rem;
          border-radius: 0.4rem;
          color: rgba(216,217,230,0.82);
          text-decoration: none;
          font-size: 0.84rem;
          line-height: 1.3;
          transition: background 0.12s, color 0.12s;
        }
        .lsb-item:hover {
          background: rgba(94,234,212,0.06);
          color: #f3f3fb;
        }
        .lsb-item.is-active {
          background: rgba(94,234,212,0.12);
          color: #5eead4;
          border-left: 2px solid #5eead4;
          padding-left: calc(0.55rem - 2px);
        }
        .lsb-item-emoji {
          font-size: 0.95em;
          line-height: 1;
          filter: drop-shadow(0 0 6px rgba(94,234,212,0.2));
          font-family: 'Apple Color Emoji', 'Segoe UI Emoji', sans-serif;
        }
        .lsb-item-name {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        /* MODAL */
        .lsb-modal-backdrop {
          position: fixed; inset: 0;
          background: rgba(4,6,12,0.78);
          backdrop-filter: blur(6px);
          display: flex; align-items: center; justify-content: center;
          padding: 1.5rem;
          z-index: 100;
        }
        .lsb-modal {
          position: relative;
          width: min(440px, 100%);
          background: rgba(12,15,24,0.97);
          border: 1px solid rgba(94,234,212,0.35);
          border-radius: 0.85rem;
          box-shadow: 0 30px 80px rgba(0,0,0,0.6);
          padding: 1.2rem 1.3rem 1.3rem;
        }
        .lsb-modal-head { display: flex; flex-direction: column; gap: 0.45rem; margin-bottom: 1rem; padding-right: 1.4rem; }
        .lsb-modal-eyebrow {
          font-family: ui-monospace, monospace;
          font-size: 0.6rem; font-weight: 800;
          letter-spacing: 0.22em;
          color: #5eead4;
        }
        .lsb-modal-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.55rem; font-weight: 600;
          color: #f3f3fb; margin: 0; line-height: 1.15;
        }
        .lsb-modal-sub { margin: 0; font-size: 0.85rem; line-height: 1.5; color: rgba(216,217,230,0.7); }
        .lsb-modal-close {
          position: absolute; top: 0.85rem; right: 0.95rem;
          background: transparent; border: 0;
          color: rgba(148,163,184,0.6);
          cursor: pointer;
          font-size: 1rem;
          line-height: 1;
        }
        .lsb-modal-close:hover { color: #ff8b7e; }

        .lsb-modal-body { display: flex; flex-direction: column; gap: 0.85rem; }
        .lsb-modal-field { display: flex; flex-direction: column; gap: 0.3rem; font-size: 0.78rem; }
        .lsb-modal-field span {
          font-family: ui-monospace, monospace;
          font-size: 0.66rem; font-weight: 700;
          letter-spacing: 0.14em;
          color: rgba(216,217,230,0.7);
          text-transform: uppercase;
        }
        .lsb-modal-field input, .lsb-modal-field textarea {
          padding: 0.6rem 0.75rem;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 0.4rem;
          color: #f3f3fb;
          font-family: inherit;
          font-size: 0.92rem;
          outline: none;
          resize: vertical;
        }
        .lsb-modal-field input:focus, .lsb-modal-field textarea:focus {
          border-color: rgba(94,234,212,0.6);
          box-shadow: 0 0 0 1px rgba(94,234,212,0.4);
        }

        .lsb-modal-actions { display: flex; gap: 0.6rem; justify-content: flex-end; margin-top: 0.3rem; }
        .lsb-modal-cancel, .lsb-modal-submit {
          padding: 0.55rem 0.95rem;
          border-radius: 0.4rem;
          font-family: ui-monospace, monospace;
          font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          cursor: pointer;
        }
        .lsb-modal-cancel {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.12);
          color: rgba(216,217,230,0.7);
        }
        .lsb-modal-cancel:hover { border-color: rgba(255,255,255,0.25); color: #f3f3fb; }
        .lsb-modal-submit {
          background: #5eead4;
          border: 0;
          color: #0a0a10;
        }
        .lsb-modal-submit:disabled { opacity: 0.4; cursor: default; }
        .lsb-modal-submit:hover:not(:disabled) { filter: brightness(1.08); }

        .lsb-modal-ok {
          display: flex; align-items: center; gap: 0.8rem;
          padding: 0.7rem 0.85rem;
          background: rgba(94,234,212,0.08);
          border: 1px solid rgba(94,234,212,0.5);
          border-radius: 0.5rem;
          color: #5eead4;
        }
        .lsb-modal-ok span[aria-hidden] { font-size: 1.4rem; font-weight: 700; }
        .lsb-modal-ok strong { display: block; color: #f3f3fb; }
        .lsb-modal-ok p { margin: 0.1rem 0 0; font-size: 0.8rem; color: rgba(216,217,230,0.75); }
      `}</style>
    </nav>
  );
}
