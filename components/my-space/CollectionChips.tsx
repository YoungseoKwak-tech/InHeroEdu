"use client";

import { useState } from "react";

export interface CollectionSummary {
  id: string;
  name: string;
  count: number;
}

interface Props {
  collections: CollectionSummary[];
  /** Currently selected: "all", "none" (unfiled), or a collection id. */
  activeId: string;
  /** Counts for the implicit views. */
  totalSaved: number;
  unfiledCount: number;
  onSelect: (id: string) => void;
  onCreate: (name: string) => Promise<void> | void;
}

/**
 * Horizontal scroller of collection chips: [+ New] [All Saved] [Unfiled]
 * [Collection · count]…  Mirrors the library page's chip filter strip so
 * the navigation feels native to InHero, just one row higher.
 */
export default function CollectionChips({
  collections,
  activeId,
  totalSaved,
  unfiledCount,
  onSelect,
  onCreate,
}: Props) {
  const [creating, setCreating] = useState(false);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit() {
    const name = draft.trim();
    if (!name || busy) return;
    setBusy(true);
    try {
      await onCreate(name);
      setDraft("");
      setCreating(false);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="cc" role="tablist" aria-label="Collections">
      {creating ? (
        <div className="cc-create-inline">
          <input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Collection name…"
            onKeyDown={(e) => {
              if (e.key === "Enter") void submit();
              if (e.key === "Escape") {
                setCreating(false);
                setDraft("");
              }
            }}
            maxLength={80}
            disabled={busy}
          />
          <button type="button" onClick={() => void submit()} disabled={busy || !draft.trim()}>
            {busy ? "…" : "Create"}
          </button>
          <button
            type="button"
            onClick={() => {
              setCreating(false);
              setDraft("");
            }}
            disabled={busy}
            className="cc-cancel"
          >
            ✕
          </button>
        </div>
      ) : (
        <button
          type="button"
          className="cc-chip cc-chip-new"
          onClick={() => setCreating(true)}
        >
          <span aria-hidden="true">＋</span>
          <span>New collection</span>
        </button>
      )}

      <button
        type="button"
        className={`cc-chip ${activeId === "all" ? "is-active" : ""}`}
        onClick={() => onSelect("all")}
      >
        <span>All Saved</span>
        <span className="cc-count">{totalSaved}</span>
      </button>
      {unfiledCount > 0 && (
        <button
          type="button"
          className={`cc-chip ${activeId === "none" ? "is-active" : ""}`}
          onClick={() => onSelect("none")}
          title="Saves not in any collection"
        >
          <span>Unfiled</span>
          <span className="cc-count">{unfiledCount}</span>
        </button>
      )}
      {collections.map((c) => (
        <button
          key={c.id}
          type="button"
          className={`cc-chip ${activeId === c.id ? "is-active" : ""}`}
          onClick={() => onSelect(c.id)}
        >
          <span className="cc-name">{c.name}</span>
          <span className="cc-count">{c.count}</span>
        </button>
      ))}

      <style jsx>{`
        .cc {
          display: flex;
          flex-wrap: nowrap;
          gap: 0.4rem;
          overflow-x: auto;
          padding-bottom: 0.5rem;
          scrollbar-width: thin;
        }
        .cc::-webkit-scrollbar { height: 6px; }
        .cc::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.08);
          border-radius: 999px;
        }
        .cc-chip {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          flex-shrink: 0;
          font-family: inherit;
          font-size: 0.78rem;
          font-weight: 600;
          padding: 0.42rem 0.85rem;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 999px;
          color: rgba(216,217,230,0.85);
          cursor: pointer;
          transition: border-color 0.12s, background 0.12s, color 0.12s;
          white-space: nowrap;
        }
        .cc-chip:hover {
          border-color: rgba(94,234,212,0.4);
          color: #f3f3fb;
        }
        .cc-chip.is-active {
          background: rgba(94,234,212,0.14);
          border-color: rgba(94,234,212,0.5);
          color: #5eead4;
        }
        .cc-chip-new {
          color: rgba(244,201,93,0.95);
          border-color: rgba(244,201,93,0.4);
          background: rgba(244,201,93,0.08);
        }
        .cc-chip-new:hover {
          background: rgba(244,201,93,0.16);
          color: #f4c95d;
        }
        .cc-name {
          max-width: 18ch;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .cc-count {
          font-family: ui-monospace, monospace;
          font-size: 0.66rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          color: inherit;
          opacity: 0.72;
        }
        .cc-create-inline {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.3rem 0.5rem;
          border-radius: 999px;
          background: rgba(244,201,93,0.08);
          border: 1px solid rgba(244,201,93,0.5);
        }
        .cc-create-inline input {
          background: transparent;
          border: 0;
          outline: 0;
          color: #f3f3fb;
          font: inherit;
          font-size: 0.82rem;
          width: 12rem;
        }
        .cc-create-inline input::placeholder { color: rgba(216,217,230,0.5); }
        .cc-create-inline button {
          font-family: ui-monospace, monospace;
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          padding: 0.32rem 0.6rem;
          background: #f4c95d;
          color: #111014;
          border: 0;
          border-radius: 999px;
          cursor: pointer;
        }
        .cc-create-inline button:disabled { opacity: 0.55; cursor: default; }
        .cc-create-inline .cc-cancel {
          background: transparent;
          color: rgba(216,217,230,0.7);
          padding: 0.32rem 0.45rem;
          font-size: 0.7rem;
        }
      `}</style>
    </div>
  );
}
