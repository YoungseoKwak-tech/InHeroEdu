"use client";

import { use, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { authFetch, getClientSession } from "@/lib/client-auth";
import type { ChatMessagePublic } from "@/lib/chat";

const POLL_MS = 6000;

interface PageProps { params: Promise<{ handle: string }>; }

export default function DMPage({ params }: PageProps) {
  const { handle: rawHandle } = use(params);
  const handle = decodeURIComponent(rawHandle);
  const [authStatus, setAuthStatus] = useState<"loading" | "out" | "no_profile" | "ok">("loading");
  const [threadId, setThreadId] = useState<string | null>(null);
  const [other, setOther] = useState<{ handle: string; graduationYear: number | null } | null>(null);
  const [messages, setMessages] = useState<ChatMessagePublic[]>([]);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const lastSeenRef = useRef<string | null>(null);
  const feedEndRef = useRef<HTMLDivElement>(null);

  // Init thread + initial load
  useEffect(() => {
    let mounted = true;
    async function bootstrap() {
      try {
        const session = await getClientSession();
        if (!mounted) return;
        if (!session) { setAuthStatus("out"); return; }
        // Profile check
        const probe = await fetch("/api/profile/me", {
          headers: { Authorization: `Bearer ${session.access_token}` },
          cache: "no-store",
        });
        await probe.json().catch(() => ({}));
        if (!mounted) return;
        // No trajectory handle required — /api/dm/init auto-provisions a minimal
        // public profile (e.g. for parents) so the DM can start.
        setAuthStatus("ok");

        // Init / find thread
        const initRes = await authFetch("/api/dm/init", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ handle }),
        });
        const initJson = await initRes.json();
        if (!initRes.ok || !initJson.ok) throw new Error(initJson.error ?? `HTTP ${initRes.status}`);
        if (!mounted) return;
        setThreadId(initJson.threadId);

        // Fetch messages
        const msgRes = await authFetch(`/api/dm/threads/${initJson.threadId}/messages?limit=80`);
        const msgJson = await msgRes.json();
        if (!mounted) return;
        if (msgJson.ok) {
          setMessages(msgJson.messages ?? []);
          setOther(msgJson.thread?.other ?? null);
          if (msgJson.messages?.length) {
            lastSeenRef.current = msgJson.messages[msgJson.messages.length - 1].createdAt;
          }
        }
      } catch (err) {
        if (mounted) setError(err instanceof Error ? err.message : String(err));
      }
    }
    void bootstrap();
    return () => { mounted = false; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handle]);

  // Poll
  useEffect(() => {
    if (!threadId) return;
    let cancelled = false;
    async function poll() {
      if (!threadId || !lastSeenRef.current) return;
      try {
        const res = await authFetch(`/api/dm/threads/${threadId}/messages?after=${encodeURIComponent(lastSeenRef.current)}`);
        const json = await res.json();
        if (cancelled || !json.ok || !json.messages?.length) return;
        setMessages((prev) => {
          const seen = new Set(prev.map((m) => m.id));
          const fresh = (json.messages as ChatMessagePublic[]).filter((m) => !seen.has(m.id));
          if (fresh.length === 0) return prev;
          lastSeenRef.current = fresh[fresh.length - 1].createdAt;
          return [...prev, ...fresh];
        });
      } catch { /* ignore */ }
    }
    const t = window.setInterval(() => void poll(), POLL_MS);
    return () => { cancelled = true; window.clearInterval(t); };
  }, [threadId]);

  useEffect(() => {
    feedEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  async function send() {
    if (!draft.trim() || sending || !threadId || authStatus !== "ok") return;
    setSending(true); setError(null);
    try {
      const res = await authFetch(`/api/dm/threads/${threadId}/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: draft.trim() }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error ?? `HTTP ${res.status}`);
      const m = json.message as ChatMessagePublic;
      setMessages((prev) => [...prev, m]);
      lastSeenRef.current = m.createdAt;
      setDraft("");
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally { setSending(false); }
  }

  return (
    <main className="dm-root">
      <header className="dm-head">
        <Link href={`/trajectory/${encodeURIComponent(handle)}`} className="dm-back">← {handle}'s profile</Link>
        <div className="dm-title-row">
          <span className="dm-glyph">✶</span>
          <div>
            <h1 className="dm-title">
              <span className="dm-other">{other?.handle ?? handle}</span>
            </h1>
            <div className="dm-meta">
              <span className="dm-online-dot" />
              <span>DIRECT MESSAGE</span>
              {other?.graduationYear && <span>· Class of {other.graduationYear}</span>}
            </div>
          </div>
        </div>
      </header>

      {authStatus === "loading" && <div className="dm-empty">Loading…</div>}
      {authStatus === "out" && (
        <div className="dm-gate"><strong>Sign in to start a DM.</strong></div>
      )}
      {authStatus === "no_profile" && (
        <div className="dm-gate">
          <strong>Claim your trajectory handle first.</strong>
          <Link href="/onboarding" className="dm-gate-cta">Claim handle →</Link>
        </div>
      )}

      {authStatus === "ok" && (
        <>
          <section className="dm-feed">
            {messages.length === 0 ? (
              <div className="dm-empty">No messages yet. Say hi to {other?.handle ?? handle}.</div>
            ) : (
              messages.map((m, i) => {
                const prev = messages[i - 1];
                const sameAuthor = Boolean(
                  prev && prev.author && m.author &&
                  prev.author.handle === m.author.handle &&
                  new Date(m.createdAt).getTime() - new Date(prev.createdAt).getTime() < 5 * 60 * 1000
                );
                const isMe = m.isMine;
                const time = new Date(m.createdAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
                return (
                  <div key={m.id} className={`dm-row ${isMe ? "is-me" : ""} ${sameAuthor ? "is-grouped" : ""}`}>
                    <div className={`dm-bubble ${isMe ? "is-me" : ""}`}>
                      {m.content}
                    </div>
                    {!sameAuthor && <span className="dm-time">{time}</span>}
                  </div>
                );
              })
            )}
            <div ref={feedEndRef} />
          </section>

          <footer className="dm-compose">
            <input
              className="dm-input"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); void send(); } }}
              placeholder={`Message ${other?.handle ?? handle}`}
              maxLength={4000}
              disabled={sending || !threadId}
            />
            <button className="dm-send" onClick={() => void send()} disabled={!draft.trim() || sending || !threadId}>
              {sending ? "…" : "↑"}
            </button>
          </footer>
          {error && <div className="dm-error">{error}</div>}
        </>
      )}

      <style>{`
        .dm-root {
          --accent: #A99CFF;
          display: flex; flex-direction: column;
          min-height: calc(100vh - 4rem);
          max-width: 720px;
          margin: 0 auto;
          padding: 1.5rem 1rem 0;
          color: #d8d9e6;
          font-family: 'Inter', 'Space Grotesk', system-ui, sans-serif;
        }
        .dm-head { padding-bottom: 0.7rem; border-bottom: 1px solid rgba(255,255,255,0.05); margin-bottom: 0.8rem; }
        .dm-back {
          font-family: ui-monospace, monospace;
          font-size: 0.68rem; font-weight: 700;
          letter-spacing: 0.16em; text-transform: uppercase;
          color: rgba(148,163,184,0.7);
          text-decoration: none;
        }
        .dm-back:hover { color: var(--accent); }
        .dm-title-row { display: flex; align-items: center; gap: 0.7rem; margin-top: 0.5rem; }
        .dm-glyph { font-size: 1.7rem; color: var(--accent); text-shadow: 0 0 14px rgba(169,156,255,0.45); line-height: 1; }
        .dm-title { font-family: 'Cormorant Garamond', serif; font-size: 1.55rem; font-weight: 600; color: #f3f3fb; margin: 0; line-height: 1.1; letter-spacing: -0.005em; }
        .dm-other { font-style: italic; }
        .dm-meta { display: flex; align-items: center; gap: 0.4rem; font-family: ui-monospace, monospace; font-size: 0.66rem; color: rgba(148,163,184,0.7); letter-spacing: 0.16em; text-transform: uppercase; }
        .dm-online-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--accent); box-shadow: 0 0 8px rgba(169,156,255,0.6); }

        .dm-feed { flex: 1; overflow-y: auto; padding: 0.6rem 0 1rem; display: flex; flex-direction: column; gap: 0.25rem; }
        .dm-empty { padding: 2rem 1rem; font-family: ui-monospace, monospace; font-size: 0.85rem; color: rgba(148,163,184,0.6); text-align: center; border: 1px dashed rgba(169,156,255,0.18); border-radius: 0.6rem; }
        .dm-gate { padding: 0.85rem 1rem; background: rgba(244,201,93,0.06); border: 1px solid rgba(244,201,93,0.28); border-radius: 0.5rem; color: #F4C95D; font-size: 0.84rem; display: flex; flex-direction: column; gap: 0.5rem; align-items: flex-start; }
        .dm-gate-cta { padding: 0.4rem 0.7rem; background: #F4C95D; color: #0a0a10; border-radius: 0.35rem; font-family: ui-monospace, monospace; font-size: 0.66rem; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase; text-decoration: none; }

        .dm-row { display: flex; flex-direction: column; align-items: flex-start; margin-top: 0.5rem; }
        .dm-row.is-me { align-items: flex-end; }
        .dm-row.is-grouped { margin-top: 0.05rem; }
        .dm-bubble {
          max-width: 75%;
          padding: 0.6rem 0.9rem;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 16px 16px 16px 5px;
          color: rgba(216,217,230,0.94);
          font-size: 0.92rem; line-height: 1.5;
          white-space: pre-wrap; word-wrap: break-word;
        }
        .dm-bubble.is-me {
          background: linear-gradient(135deg, rgba(169,156,255,0.2), rgba(169,156,255,0.07));
          border-color: rgba(169,156,255,0.4);
          color: #f3f3fb;
          border-radius: 16px 16px 5px 16px;
        }
        .dm-time {
          font-family: ui-monospace, monospace;
          font-size: 0.6rem;
          color: rgba(148,163,184,0.5);
          margin-top: 0.15rem;
          padding: 0 0.25rem;
        }

        .dm-compose { display: flex; gap: 0.5rem; padding: 0.75rem 0; border-top: 1px solid rgba(255,255,255,0.05); }
        .dm-input {
          flex: 1;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 0.55rem;
          padding: 0.7rem 0.9rem;
          color: #f3f3fb; font-family: inherit; font-size: 0.94rem;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.2s;
        }
        .dm-input:focus { border-color: var(--accent); box-shadow: 0 0 0 1px var(--accent), 0 0 12px rgba(169,156,255,0.2); }
        .dm-input::placeholder { color: rgba(148,163,184,0.5); }
        .dm-send {
          width: 2.4rem; height: 2.4rem;
          background: var(--accent); color: #0a0a10;
          border: 0; border-radius: 0.5rem;
          font-size: 1.05rem; font-weight: 800;
          cursor: pointer;
        }
        .dm-send:hover:not(:disabled) { filter: brightness(1.08); box-shadow: 0 0 14px rgba(169,156,255,0.35); }
        .dm-send:disabled { opacity: 0.4; cursor: default; }
        .dm-error {
          margin-top: 0.5rem;
          padding: 0.5rem 0.7rem;
          background: rgba(255,107,91,0.08);
          border: 1px solid rgba(255,107,91,0.3);
          border-radius: 0.4rem;
          color: #ff8b7e;
          font-family: ui-monospace, monospace;
          font-size: 0.76rem;
        }
      `}</style>
    </main>
  );
}
