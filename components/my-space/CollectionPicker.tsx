"use client";

import { useEffect, useRef, useState } from "react";
import { authFetch } from "@/lib/client-auth";
import ConfirmDialog from "@/components/shared/ConfirmDialog";

interface CollectionRow {
  id: string;
  name: string;
  count: number;
}

interface Props {
  resourceId: string;
  /** The collection the save currently lives in, or null for "All Saved". */
  currentCollectionId: string | null;
  onClose: () => void;
  onMoved?: (collectionId: string | null) => void;
}

/**
 * CollectionPicker — modal-style popover for moving a save between
 * collections, with an inline "Create new" entry. Loads the user's
 * collection list lazily on mount. Used both by the SaveButton
 * long-press affordance on library cards and from the per-card menu
 * inside /my-space/saved.
 */
export default function CollectionPicker({
  resourceId,
  currentCollectionId,
  onClose,
  onMoved,
}: Props) {
  const [collections, setCollections] = useState<CollectionRow[] | null>(null);
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [confirmRemoveOpen, setConfirmRemoveOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let alive = true;
    void (async () => {
      try {
        const res = await authFetch("/api/my-space/collections");
        if (!res.ok) throw new Error(await res.text());
        const json = (await res.json()) as {
          collections: { id: string; name: string; count: number }[];
        };
        if (!alive) return;
        setCollections(json.collections);
      } catch (e) {
        if (alive) setErr(e instanceof Error ? e.message : String(e));
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  async function move(collectionId: string | null, force = false) {
    if (busy && !force) return;
    setBusy(true);
    setErr(null);
    try {
      const res = await authFetch("/api/my-space/saves", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resourceId, collectionId }),
      });
      if (!res.ok) throw new Error(await res.text());
      onMoved?.(collectionId);
      onClose();
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e));
    } finally {
      setBusy(false);
      setConfirmRemoveOpen(false);
    }
  }

  function requestMove(collectionId: string | null) {
    if (collectionId === null && currentCollectionId !== null) {
      setConfirmRemoveOpen(true);
      return;
    }
    void move(collectionId);
  }

  async function createAndMove() {
    const name = newName.trim();
    if (!name || busy) return;
    setBusy(true);
    setErr(null);
    try {
      const res = await authFetch("/api/my-space/collections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) throw new Error(await res.text());
      const json = (await res.json()) as { collection: { id: string } };
      await move(json.collection.id, true);
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e));
      setBusy(false);
    }
  }

  return (
    <div className="cp-backdrop" onClick={onClose} onMouseDown={(e) => e.stopPropagation()}>
      <div
        ref={rootRef}
        className="cp-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Move to collection"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cp-head">
          <div className="cp-title">Move to collection</div>
          <button
            type="button"
            className="cp-close"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {err && <div className="cp-err">{err}</div>}

        <div className="cp-list">
          <button
            type="button"
            className={`cp-row ${currentCollectionId === null ? "is-current" : ""}`}
            onClick={() => requestMove(null)}
            disabled={busy}
          >
            <span className="cp-row-name">All Saved</span>
            <span className="cp-row-sub">default</span>
          </button>

          {collections === null ? (
            <div className="cp-loading">Loading…</div>
          ) : collections.length === 0 ? (
            <div className="cp-empty">No collections yet. Create one below.</div>
          ) : (
            collections.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`cp-row ${currentCollectionId === c.id ? "is-current" : ""}`}
                onClick={() => requestMove(c.id)}
                disabled={busy}
              >
                <span className="cp-row-name">{c.name}</span>
                <span className="cp-row-sub">{c.count}</span>
              </button>
            ))
          )}
        </div>

        <div className="cp-foot">
          {creating ? (
            <div className="cp-create">
              <input
                autoFocus
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="New collection name…"
                maxLength={80}
                disabled={busy}
                onKeyDown={(e) => {
                  if (e.key === "Enter") void createAndMove();
                  if (e.key === "Escape") {
                    setCreating(false);
                    setNewName("");
                  }
                }}
              />
              <button
                type="button"
                className="cp-go"
                onClick={() => void createAndMove()}
                disabled={busy || !newName.trim()}
              >
                {busy ? "…" : "Create & move"}
              </button>
              <button
                type="button"
                className="cp-cancel-text"
                onClick={() => {
                  setCreating(false);
                  setNewName("");
                }}
                disabled={busy}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="cp-new"
              onClick={() => setCreating(true)}
              disabled={busy}
            >
              ＋ New collection
            </button>
          )}
        </div>
      </div>

      <ConfirmDialog
        open={confirmRemoveOpen}
        title="Remove from this collection?"
        message="The resource will stay saved in All Saved, but it will leave this collection."
        confirmLabel="Remove"
        loading={busy}
        destructive
        onConfirm={() => move(null)}
        onCancel={() => {
          if (!busy) setConfirmRemoveOpen(false);
        }}
      />

      <style jsx>{`
        .cp-backdrop {
          position: fixed;
          inset: 0;
          z-index: 100;
          background: rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          animation: cp-fade 160ms ease;
        }
        @keyframes cp-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .cp-panel {
          width: 100%;
          max-width: 22rem;
          background: rgba(10, 6, 18, 0.98);
          border: 1px solid rgba(94, 234, 212, 0.2);
          border-radius: 14px;
          box-shadow: 0 24px 64px rgba(0, 0, 0, 0.6);
          display: flex;
          flex-direction: column;
          max-height: 80vh;
        }
        .cp-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.85rem 1rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }
        .cp-title {
          font-family: Cormorant Garamond, serif;
          font-size: 1.05rem;
          font-weight: 600;
          color: #f3f3fb;
        }
        .cp-close {
          width: 28px;
          height: 28px;
          background: transparent;
          border: 0;
          color: rgba(216, 217, 230, 0.7);
          font-size: 16px;
          cursor: pointer;
          border-radius: 6px;
        }
        .cp-close:hover { background: rgba(255,255,255,0.08); color: #f3f3fb; }
        .cp-err {
          margin: 0.6rem 1rem 0;
          padding: 0.5rem 0.7rem;
          background: rgba(255,139,126,0.08);
          border: 1px solid rgba(255,139,126,0.3);
          border-radius: 0.4rem;
          color: #ff8b7e;
          font-size: 0.78rem;
        }
        .cp-list {
          flex: 1;
          overflow-y: auto;
          padding: 0.5rem;
        }
        .cp-row {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.6rem 0.7rem;
          background: transparent;
          border: 1px solid transparent;
          border-radius: 8px;
          color: rgba(216, 217, 230, 0.92);
          font-family: inherit;
          font-size: 0.86rem;
          cursor: pointer;
          transition: background 0.12s, border-color 0.12s;
        }
        .cp-row:hover { background: rgba(94, 234, 212, 0.08); border-color: rgba(94, 234, 212, 0.3); }
        .cp-row.is-current {
          background: rgba(94, 234, 212, 0.14);
          border-color: rgba(94, 234, 212, 0.5);
          color: #5eead4;
        }
        .cp-row:disabled { opacity: 0.55; cursor: default; }
        .cp-row-name {
          font-weight: 600;
          text-align: left;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .cp-row-sub {
          font-family: ui-monospace, monospace;
          font-size: 0.7rem;
          color: rgba(148, 163, 184, 0.7);
        }
        .cp-loading, .cp-empty {
          padding: 0.85rem 0.7rem;
          font-family: ui-monospace, monospace;
          font-size: 0.72rem;
          color: rgba(148, 163, 184, 0.7);
          text-align: center;
        }
        .cp-foot {
          padding: 0.6rem 0.7rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }
        .cp-new {
          width: 100%;
          padding: 0.6rem;
          background: rgba(244, 201, 93, 0.08);
          border: 1px dashed rgba(244, 201, 93, 0.5);
          border-radius: 8px;
          color: #f4c95d;
          font-family: ui-monospace, monospace;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          cursor: pointer;
        }
        .cp-new:hover { background: rgba(244, 201, 93, 0.16); }
        .cp-create {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          flex-wrap: wrap;
        }
        .cp-create input {
          flex: 1;
          min-width: 8rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 6px;
          padding: 0.5rem 0.6rem;
          font: inherit;
          font-size: 0.84rem;
          color: #f3f3fb;
        }
        .cp-create input::placeholder { color: rgba(216, 217, 230, 0.5); }
        .cp-go {
          padding: 0.5rem 0.7rem;
          background: #f4c95d;
          color: #111014;
          border: 0;
          border-radius: 6px;
          font-family: ui-monospace, monospace;
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          cursor: pointer;
        }
        .cp-go:disabled { opacity: 0.55; cursor: default; }
        .cp-cancel-text {
          background: transparent;
          color: rgba(216, 217, 230, 0.65);
          border: 0;
          font-size: 0.78rem;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
