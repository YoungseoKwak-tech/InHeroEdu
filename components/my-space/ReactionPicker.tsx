"use client";

import { useEffect, useRef, useState } from "react";
import { authFetch } from "@/lib/client-auth";

type ReactionType = "heart" | "fire" | "lightbulb" | "pin";

const REACTIONS: { type: ReactionType; emoji: string; label: string }[] = [
  { type: "heart", emoji: "❤️", label: "Love it" },
  { type: "fire", emoji: "🔥", label: "Fire" },
  { type: "lightbulb", emoji: "💡", label: "Aha" },
  { type: "pin", emoji: "📌", label: "Pin" },
];

const LONG_PRESS_MS = 350;

interface Props {
  resourceId: string;
  initialReactions?: ReactionType[];
  onChange?: (reactions: ReactionType[]) => void;
  className?: string;
}

/**
 * ReactionPicker — emoji reaction toggle dropped into library cards.
 *
 * Single click toggles ❤️ (the default reaction). Long press / right
 * click opens the emoji popover with all four options. Each click
 * inside the popover toggles that reaction independently — a user can
 * stack 🔥 + 💡 on the same resource.
 */
export default function ReactionPicker({
  resourceId,
  initialReactions = [],
  onChange,
  className,
}: Props) {
  const [active, setActive] = useState<Set<ReactionType>>(new Set(initialReactions));
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const longPressFired = useRef(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  async function toggle(type: ReactionType) {
    if (busy) return;
    const prev = new Set(active);
    const next = new Set(active);
    if (next.has(type)) next.delete(type);
    else next.add(type);
    setActive(next);
    setBusy(true);
    try {
      const res = await authFetch("/api/my-space/reactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resourceId, reactionType: type }),
      });
      if (!res.ok) throw new Error(await res.text());
      const json = (await res.json()) as { reactions: string[] };
      const server = new Set(json.reactions.filter((r): r is ReactionType =>
        REACTIONS.some((m) => m.type === r)
      ));
      setActive(server);
      onChange?.(Array.from(server));
    } catch {
      setActive(prev);
    } finally {
      setBusy(false);
    }
  }

  function startLongPress() {
    longPressFired.current = false;
    if (longPressTimer.current) clearTimeout(longPressTimer.current);
    longPressTimer.current = setTimeout(() => {
      longPressFired.current = true;
      setOpen(true);
    }, LONG_PRESS_MS);
  }
  function cancelLongPress() {
    if (longPressTimer.current) clearTimeout(longPressTimer.current);
    longPressTimer.current = null;
  }

  function onTriggerClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    cancelLongPress();
    if (longPressFired.current) {
      // Long-press already opened the popover — swallow the click.
      longPressFired.current = false;
      return;
    }
    void toggle("heart");
  }

  function onTriggerContextMenu(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setOpen((v) => !v);
  }

  const triggerEmoji = active.has("heart")
    ? "❤️"
    : active.size > 0
      ? (REACTIONS.find((r) => active.has(r.type))?.emoji ?? "❤️")
      : "♡";
  const triggerActive = active.size > 0;

  return (
    <div
      ref={rootRef}
      className={`rp ${className ?? ""}`}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        className={`rp-trigger ${triggerActive ? "is-active" : ""}`}
        aria-label="React to resource"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={onTriggerClick}
        onContextMenu={onTriggerContextMenu}
        onMouseDown={(e) => {
          if (e.button === 0) startLongPress();
        }}
        onMouseUp={cancelLongPress}
        onMouseLeave={cancelLongPress}
        onTouchStart={startLongPress}
        onTouchEnd={cancelLongPress}
        onTouchCancel={cancelLongPress}
        disabled={busy}
        title={triggerActive ? "React · long-press for more" : "React · long-press for more"}
      >
        <span aria-hidden="true">{triggerEmoji}</span>
        {active.size > 1 && (
          <span className="rp-trigger-count" aria-hidden="true">+{active.size - 1}</span>
        )}
      </button>
      {open && (
        <div className="rp-popover" role="menu">
          {REACTIONS.map((r) => (
            <button
              key={r.type}
              type="button"
              role="menuitemcheckbox"
              aria-checked={active.has(r.type)}
              className={`rp-option ${active.has(r.type) ? "is-active" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                void toggle(r.type);
              }}
              title={r.label}
            >
              <span aria-hidden="true">{r.emoji}</span>
            </button>
          ))}
        </div>
      )}
      <style jsx>{`
        .rp {
          position: relative;
          display: inline-flex;
        }
        .rp-trigger {
          width: 32px;
          height: 32px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 2px;
          background: rgba(0, 0, 0, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: rgba(255, 255, 255, 0.92);
          font-size: 14px;
          line-height: 1;
          cursor: pointer;
          backdrop-filter: blur(8px);
          transition: background 0.15s, border-color 0.15s, transform 0.15s;
        }
        .rp-trigger:hover {
          background: rgba(0, 0, 0, 0.85);
          border-color: rgba(94, 234, 212, 0.4);
        }
        .rp-trigger:active {
          transform: scale(0.94);
        }
        .rp-trigger.is-active {
          background: rgba(244, 201, 93, 0.16);
          border-color: rgba(244, 201, 93, 0.5);
        }
        .rp-trigger:disabled {
          opacity: 0.7;
          cursor: default;
        }
        .rp-trigger-count {
          font-family: ui-monospace, monospace;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 0.02em;
          color: rgba(244, 201, 93, 0.95);
        }
        .rp-popover {
          position: absolute;
          bottom: calc(100% + 6px);
          right: 0;
          display: inline-flex;
          gap: 2px;
          padding: 4px;
          background: rgba(10, 6, 18, 0.96);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          backdrop-filter: blur(16px);
          box-shadow: 0 10px 32px rgba(0, 0, 0, 0.5);
          z-index: 10;
          animation: rp-pop 160ms ease;
        }
        @keyframes rp-pop {
          from {
            opacity: 0;
            transform: translateY(4px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .rp-option {
          width: 30px;
          height: 30px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: 1px solid transparent;
          border-radius: 6px;
          font-size: 16px;
          line-height: 1;
          cursor: pointer;
          transition: background 0.12s, border-color 0.12s, transform 0.12s;
        }
        .rp-option:hover {
          background: rgba(255, 255, 255, 0.08);
          transform: scale(1.08);
        }
        .rp-option.is-active {
          background: rgba(244, 201, 93, 0.16);
          border-color: rgba(244, 201, 93, 0.5);
        }
      `}</style>
    </div>
  );
}
