"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { authFetch } from "@/lib/client-auth";

const POLL_MS = 10_000;

type Notification = {
  id: string;
  source: string;
  contextType: string | null;
  contextSlug: string | null;
  contextName: string | null;
  sourceId: string | null;
  authorHandle: string | null;
  preview: string | null;
  isRead: boolean;
  createdAt: string;
};

export default function AdminNotificationBell() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<Notification[]>([]);
  const [unread, setUnread] = useState(0);
  const [allowed, setAllowed] = useState<boolean | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const lastSeenIdRef = useRef<string | null>(null);
  // Hold the interval handle so refresh() can cancel itself when it
  // learns the user isn't admin. Previously the interval was scoped to
  // the useEffect cleanup, so 401/403/204 responses kept it firing
  // every 10s for non-admins — visible as a relentless stream of
  // /api/admin/notifications hits in the browser console.
  const intervalRef = useRef<number | null>(null);

  function stopPolling() {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  async function refresh() {
    try {
      const res = await authFetch("/api/admin/notifications");
      // 204 = "you're not admin, nothing to show." 401/403 are legacy
      // hard-fail codes; treat the same way. In every case, give up
      // polling — admin status can't change without a page reload.
      if (res.status === 204 || res.status === 401 || res.status === 403) {
        setAllowed(false);
        stopPolling();
        return;
      }
      if (!res.ok) return;
      setAllowed(true);
      const json = (await res.json()) as { items?: Notification[]; unreadCount?: number };
      const fetched = json.items ?? [];
      setItems(fetched);
      setUnread(json.unreadCount ?? 0);

      // Trigger a small chime if there's a new notification we haven't seen.
      const latest = fetched[0];
      if (latest && !latest.isRead && latest.id !== lastSeenIdRef.current) {
        if (lastSeenIdRef.current !== null) playChime();
        lastSeenIdRef.current = latest.id;
      }
    } catch {
      // Silent: polling will retry next tick.
    }
  }

  useEffect(() => {
    void refresh();
    intervalRef.current = window.setInterval(() => void refresh(), POLL_MS);
    return () => stopPolling();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Close on outside click.
  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  async function markAll() {
    setUnread(0);
    setItems((prev) => prev.map((it) => ({ ...it, isRead: true })));
    try {
      await authFetch("/api/admin/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ all: true }),
      });
    } catch {
      // Re-sync on next poll.
    }
  }

  async function markOne(id: string) {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, isRead: true } : it)));
    setUnread((n) => Math.max(0, n - 1));
    try {
      await authFetch("/api/admin/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: [id] }),
      });
    } catch {
      // Re-sync on next poll.
    }
  }

  // Render nothing until we've confirmed admin (allowed === true). Both
  // null (probing) and false (definitively not admin) render no DOM —
  // avoids a brief bell flash for the 99% non-admin case before the
  // first refresh() completes.
  if (allowed !== true) return null;

  return (
    <div ref={wrapRef} style={{ position: "relative" }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Admin notifications"
        style={{
          position: "relative",
          background: "none",
          border: "none",
          padding: "6px 8px",
          color: unread > 0 ? "#00FF88" : "#8888AA",
          fontSize: 16,
          cursor: "pointer",
        }}
      >
        🔔
        {unread > 0 && (
          <span
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              minWidth: 16,
              height: 16,
              padding: "0 4px",
              borderRadius: 999,
              background: "#FF3B3B",
              color: "#fff",
              fontSize: 9,
              fontWeight: 800,
              fontFamily: "'JetBrains Mono', monospace",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              lineHeight: 1,
            }}
          >
            {unread > 99 ? "99+" : unread}
          </span>
        )}
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            width: "min(380px, calc(100vw - 32px))",
            maxHeight: "min(520px, calc(100dvh - 96px))",
            overflowY: "auto",
            background: "rgba(8,10,18,0.97)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            border: "1px solid rgba(0,255,136,0.18)",
            borderRadius: 14,
            boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
            zIndex: 200,
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 14px",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.18em", color: "#00FF88", textTransform: "uppercase" }}>
              New messages {unread > 0 && `· ${unread}`}
            </div>
            {unread > 0 && (
              <button
                type="button"
                onClick={markAll}
                style={{
                  fontSize: 10,
                  fontFamily: "inherit",
                  background: "none",
                  border: "none",
                  color: "#8888AA",
                  cursor: "pointer",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                }}
              >
                Mark all read
              </button>
            )}
          </div>

          {items.length === 0 ? (
            <div style={{ padding: "24px 14px", color: "#444466", fontSize: 12, textAlign: "center" }}>
              All quiet. Nothing new yet.
            </div>
          ) : (
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {items.map((n) => {
                const href = n.contextType === "lounge" && n.contextSlug
                  ? `/lounges/${n.contextSlug}`
                  : n.contextType === "club" && n.contextSlug
                    ? `/clubs/${n.contextSlug}`
                    : null;
                const body = (
                  <div
                    style={{
                      padding: "12px 14px",
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                      cursor: href ? "pointer" : "default",
                      background: n.isRead ? "transparent" : "rgba(0,255,136,0.04)",
                      display: "block",
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    <div style={{ fontSize: 10, color: "#00FF88", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700, marginBottom: 4 }}>
                      {n.contextName ?? n.contextSlug ?? "Activity"} · {relativeTime(n.createdAt)}
                    </div>
                    <div style={{ fontSize: 13, color: "#E8E8F0", marginBottom: 2 }}>
                      {n.authorHandle ? <span style={{ color: "#8888AA" }}>u/{n.authorHandle}: </span> : null}
                      {n.preview ?? "(no text)"}
                    </div>
                  </div>
                );

                const onActivate = () => {
                  if (!n.isRead) void markOne(n.id);
                };

                return (
                  <li key={n.id}>
                    {href ? (
                      <Link href={href} onClick={onActivate} style={{ display: "block", textDecoration: "none", color: "inherit" }}>
                        {body}
                      </Link>
                    ) : (
                      <div onClick={onActivate}>{body}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

function relativeTime(iso: string): string {
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return "";
  const diff = Math.max(0, Date.now() - t);
  if (diff < 60_000) return "just now";
  if (diff < 60 * 60_000) return `${Math.floor(diff / 60_000)}m`;
  if (diff < 24 * 60 * 60_000) return `${Math.floor(diff / (60 * 60_000))}h`;
  return `${Math.floor(diff / (24 * 60 * 60_000))}d`;
}

function playChime() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Ctx = (window.AudioContext || (window as any).webkitAudioContext) as typeof AudioContext | undefined;
    if (!Ctx) return;
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1320, ctx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.22);
    osc.start();
    osc.stop(ctx.currentTime + 0.24);
  } catch {
    // No audio context — skip silently.
  }
}
