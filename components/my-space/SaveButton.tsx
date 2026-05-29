"use client";

import { useRef, useState } from "react";
import { authFetch } from "@/lib/client-auth";
import CollectionPicker from "@/components/my-space/CollectionPicker";
import ConfirmDialog from "@/components/shared/ConfirmDialog";

interface Props {
  resourceId: string;
  initialSaved?: boolean;
  /** Optional: surface success/error to parent (e.g. for toast). */
  onChange?: (saved: boolean) => void;
  /** Hover-only on desktop; always-visible on touch. */
  className?: string;
  /** Used in My Space where unsaving removes the card from the current view. */
  confirmOnRemove?: boolean;
  confirmRemoveTitle?: string;
  confirmRemoveMessage?: string;
}

const LONG_PRESS_MS = 350;

/**
 * SaveButton — bookmark toggle dropped into library cards.
 *
 * Click → toggles "All Saved" save. Long-press (350ms) or right-click
 * opens the CollectionPicker so the user can drop the resource into a
 * specific collection in one gesture.
 */
export default function SaveButton({
  resourceId,
  initialSaved = false,
  onChange,
  className,
  confirmOnRemove = false,
  confirmRemoveTitle = "Remove from My Space?",
  confirmRemoveMessage = "This resource will leave your saved archive.",
}: Props) {
  const [saved, setSaved] = useState(initialSaved);
  const [busy, setBusy] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const longPressFired = useRef(false);

  async function toggle() {
    if (busy) return;
    const next = !saved;
    setSaved(next);
    setBusy(true);
    try {
      const res = await authFetch("/api/my-space/saves", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resourceId }),
      });
      if (!res.ok) throw new Error(await res.text());
      const json = (await res.json()) as { saved: boolean };
      setSaved(json.saved);
      onChange?.(json.saved);
    } catch {
      setSaved((prev) => !prev);
    } finally {
      setBusy(false);
      setConfirmOpen(false);
    }
  }

  function startLongPress() {
    longPressFired.current = false;
    if (longPressTimer.current) clearTimeout(longPressTimer.current);
    longPressTimer.current = setTimeout(() => {
      longPressFired.current = true;
      setPickerOpen(true);
    }, LONG_PRESS_MS);
  }
  function cancelLongPress() {
    if (longPressTimer.current) clearTimeout(longPressTimer.current);
    longPressTimer.current = null;
  }

  function onClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    cancelLongPress();
    if (longPressFired.current) {
      // Long-press already opened the picker — swallow this click.
      longPressFired.current = false;
      return;
    }
    if (saved && confirmOnRemove) {
      setConfirmOpen(true);
      return;
    }
    void toggle();
  }

  function onContextMenu(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setPickerOpen(true);
  }

  return (
    <>
      <button
        type="button"
        className={`sb ${saved ? "is-saved" : ""} ${className ?? ""}`}
        aria-label={saved ? "Remove from My Space" : "Save to My Space"}
        aria-pressed={saved}
        onClick={onClick}
        onContextMenu={onContextMenu}
        onMouseDown={(e) => {
          e.stopPropagation();
          if (e.button === 0) startLongPress();
        }}
        onMouseUp={cancelLongPress}
        onMouseLeave={cancelLongPress}
        onTouchStart={startLongPress}
        onTouchEnd={cancelLongPress}
        onTouchCancel={cancelLongPress}
        disabled={busy}
        title={saved ? "Saved · long-press to move" : "Save to My Space · long-press to pick collection"}
      >
        {saved ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
          </svg>
        ) : (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
          </svg>
        )}
        <style jsx>{`
          .sb {
            width: 32px;
            height: 32px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background: rgba(0, 0, 0, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            color: rgba(255, 255, 255, 0.92);
            cursor: pointer;
            backdrop-filter: blur(8px);
            transition: background 0.15s, color 0.15s, border-color 0.15s,
              transform 0.15s;
          }
          .sb:hover {
            background: rgba(0, 0, 0, 0.85);
            color: #f4c95d;
            border-color: rgba(244, 201, 93, 0.4);
          }
          .sb:active {
            transform: scale(0.94);
          }
          .sb.is-saved {
            color: #f4c95d;
            border-color: rgba(244, 201, 93, 0.5);
            background: rgba(244, 201, 93, 0.16);
          }
          .sb:disabled {
            opacity: 0.7;
            cursor: default;
          }
        `}</style>
      </button>
      {pickerOpen && (
        <CollectionPicker
          resourceId={resourceId}
          currentCollectionId={null}
          onClose={() => setPickerOpen(false)}
          onMoved={() => {
            setSaved(true);
            onChange?.(true);
          }}
        />
      )}
      <ConfirmDialog
        open={confirmOpen}
        title={confirmRemoveTitle}
        message={confirmRemoveMessage}
        confirmLabel="Remove"
        loading={busy}
        destructive
        onConfirm={toggle}
        onCancel={() => {
          if (!busy) setConfirmOpen(false);
        }}
      />
    </>
  );
}
