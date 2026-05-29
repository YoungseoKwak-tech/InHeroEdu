"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
  destructive?: boolean;
  onConfirm: () => void | Promise<void>;
  onCancel: () => void;
}

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  loading = false,
  destructive = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !loading) onCancel();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [loading, onCancel, open]);

  if (!open) return null;

  return (
    <div
      className="cd-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        event.stopPropagation();
        if (!loading) onCancel();
      }}
    >
      <div
        className="cd-panel"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby={message ? "confirm-dialog-message" : undefined}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className={`cd-mark ${destructive ? "is-destructive" : ""}`} aria-hidden="true">
          {destructive ? "!" : "?"}
        </div>
        <div className="cd-title" id="confirm-dialog-title">
          {title}
        </div>
        {message && (
          <div className="cd-message" id="confirm-dialog-message">
            {message}
          </div>
        )}
        <div className="cd-actions">
          <button
            type="button"
            className="cd-cancel"
            onClick={onCancel}
            disabled={loading}
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            className={`cd-confirm ${destructive ? "is-destructive" : ""}`}
            onClick={() => void onConfirm()}
            disabled={loading}
          >
            {loading ? "Working..." : confirmLabel}
          </button>
        </div>
      </div>

      <style jsx>{`
        .cd-backdrop {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          background: rgba(3, 6, 15, 0.72);
          backdrop-filter: blur(8px);
          animation: cd-fade 160ms ease;
        }
        @keyframes cd-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .cd-panel {
          width: min(100%, 24rem);
          padding: 1.1rem;
          border: 1px solid rgba(255, 255, 255, 0.11);
          border-radius: 14px;
          background:
            radial-gradient(circle at 20% 0%, rgba(94, 234, 212, 0.12), transparent 42%),
            rgba(10, 12, 22, 0.98);
          box-shadow: 0 24px 70px rgba(0, 0, 0, 0.58);
          color: #f3f3fb;
          font-family: 'Inter', 'Space Grotesk', system-ui, sans-serif;
          text-align: center;
        }
        .cd-mark {
          width: 2.3rem;
          height: 2.3rem;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.75rem;
          border-radius: 999px;
          border: 1px solid rgba(94, 234, 212, 0.45);
          background: rgba(94, 234, 212, 0.12);
          color: #5eead4;
          font-family: ui-monospace, monospace;
          font-weight: 900;
        }
        .cd-mark.is-destructive {
          border-color: rgba(239, 68, 68, 0.5);
          background: rgba(239, 68, 68, 0.14);
          color: #ff8b7e;
        }
        .cd-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.25rem;
          font-weight: 600;
          line-height: 1.15;
        }
        .cd-message {
          margin: 0.55rem auto 0;
          max-width: 32ch;
          color: rgba(216, 217, 230, 0.78);
          font-size: 0.88rem;
          line-height: 1.5;
        }
        .cd-actions {
          display: flex;
          justify-content: center;
          gap: 0.55rem;
          margin-top: 1rem;
        }
        .cd-cancel,
        .cd-confirm {
          min-height: 2.3rem;
          padding: 0.58rem 0.92rem;
          border-radius: 999px;
          font-family: ui-monospace, monospace;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          cursor: pointer;
        }
        .cd-cancel {
          border: 1px solid rgba(255, 255, 255, 0.14);
          background: rgba(255, 255, 255, 0.03);
          color: rgba(216, 217, 230, 0.9);
        }
        .cd-confirm {
          border: 1px solid #5eead4;
          background: #5eead4;
          color: #071014;
        }
        .cd-confirm.is-destructive {
          border-color: #ef4444;
          background: #ef4444;
          color: #fff;
        }
        .cd-cancel:disabled,
        .cd-confirm:disabled {
          opacity: 0.55;
          cursor: default;
        }
        @media (max-width: 520px) {
          .cd-actions {
            flex-direction: column-reverse;
          }
          .cd-cancel,
          .cd-confirm {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
