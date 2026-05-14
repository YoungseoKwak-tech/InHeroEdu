"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { createBrowserClient } from "@/lib/supabase";
import { authFetch } from "@/lib/client-auth";
import type { ChatMessagePublic, LibraryAggregate } from "@/lib/chat";

type Tab = "chat" | "library" | "pinned";
const POLL_MS = 8000;

interface PageProps {
  params: { slug: string };
}

export default function LoungeChatPage({ params }: PageProps) {
  const { slug } = params;
  const supabase = createBrowserClient();

  const [tab, setTab] = useState<Tab>("chat");
  const [loungeName, setLoungeName] = useState<string>("");

  const [messages, setMessages] = useState<ChatMessagePublic[]>([]);
  const [library, setLibrary] = useState<LibraryAggregate | null>(null);
  const [libraryCounts, setLibraryCounts] = useState<{ photos: number; files: number; links: number }>({ photos: 0, files: 0, links: 0 });

  const [authStatus, setAuthStatus] = useState<"loading" | "out" | "no_profile" | "ok">("loading");
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [replyTo, setReplyTo] = useState<ChatMessagePublic | null>(null);

  const lastSeenRef = useRef<string | null>(null);
  const feedEndRef = useRef<HTMLDivElement>(null);

  // Initial fetch + auth
  useEffect(() => {
    let mounted = true;
    async function bootstrap() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!mounted) return;
        if (!session) {
          setAuthStatus("out");
        } else {
          const probe = await fetch("/api/profile/me", {
            headers: { Authorization: `Bearer ${session.access_token}` },
            cache: "no-store",
          });
          const json = await probe.json().catch(() => ({}));
          if (!mounted) return;
          setAuthStatus(json?.profile?.handle ? "ok" : "no_profile");
        }

        const res = await fetch(`/api/lounges/${slug}/chat/messages?limit=80`, {
          cache: "no-store",
          headers: session ? { Authorization: `Bearer ${session.access_token}` } : {},
        });
        const json = await res.json();
        if (!mounted) return;
        if (json.ok) {
          setLoungeName(json.lounge?.name ?? "");
          setMessages(json.messages ?? []);
          if (json.messages?.length) {
            lastSeenRef.current = json.messages[json.messages.length - 1].createdAt;
          }
        }
      } catch (err) {
        if (mounted) setError(err instanceof Error ? err.message : String(err));
      }
    }
    void bootstrap();
    return () => { mounted = false; };
  }, [slug, supabase]);

  // Poll for new messages
  useEffect(() => {
    let cancelled = false;
    async function poll() {
      if (!lastSeenRef.current) return;
      try {
        const res = await fetch(`/api/lounges/${slug}/chat/messages?after=${encodeURIComponent(lastSeenRef.current)}`, {
          cache: "no-store",
        });
        const json = await res.json();
        if (cancelled || !json.ok || !json.messages?.length) return;
        setMessages((prev) => {
          // dedup by id
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
  }, [slug]);

  // Lazy-load library when its tab is opened
  useEffect(() => {
    if (tab !== "library" || library) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/lounges/${slug}/chat/library`, { cache: "no-store" });
        const json = await res.json();
        if (cancelled || !json.ok) return;
        setLibrary(json.library);
        setLibraryCounts(json.counts);
      } catch { /* ignore */ }
    })();
    return () => { cancelled = true; };
  }, [tab, slug, library]);

  // Auto-scroll to bottom on new chat messages (only when in Chat tab + near bottom)
  useEffect(() => {
    if (tab !== "chat") return;
    feedEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, tab]);

  async function send() {
    if (!draft.trim() || sending || authStatus !== "ok") return;
    setSending(true);
    setError(null);
    try {
      const res = await authFetch(`/api/lounges/${slug}/chat/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: draft.trim(),
          replyToId: replyTo?.id ?? null,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error ?? `HTTP ${res.status}`);
      const m = json.message as ChatMessagePublic;
      setMessages((prev) => [...prev, m]);
      lastSeenRef.current = m.createdAt;
      // Library cache invalidate (if user posted a link)
      if (m.links.length > 0) setLibrary(null);
      setDraft("");
      setReplyTo(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setSending(false);
    }
  }

  const pinnedMessages = messages.filter((m) => m.isPinned);

  return (
    <main className="lc-root">
      <header className="lc-head">
        <div className="lc-head-row">
          <Link href={`/lounges/${slug}`} className="lc-back">← Forum view</Link>
          <Link href="/lounges" className="lc-back lc-back-quiet">All lounges</Link>
        </div>
        <div className="lc-title-row">
          <span className="lc-glyph">◈</span>
          <div>
            <h1 className="lc-title">{loungeName || slug}</h1>
            <div className="lc-room-meta">
              <span className="lc-online-dot" />
              <span>{messages.length} messages</span>
            </div>
          </div>
        </div>
        <div className="lc-tabs">
          {(["chat", "library", "pinned"] as const).map((t) => (
            <button
              key={t}
              className={`lc-tab ${tab === t ? "is-active" : ""}`}
              onClick={() => setTab(t)}
            >
              {t === "chat" && "Chat"}
              {t === "library" && (
                <>Library {libraryCounts.photos + libraryCounts.files + libraryCounts.links > 0 && (
                  <span className="lc-tab-num">{libraryCounts.photos + libraryCounts.files + libraryCounts.links}</span>
                )}</>
              )}
              {t === "pinned" && (
                <>Pinned {pinnedMessages.length > 0 && (
                  <span className="lc-tab-num">{pinnedMessages.length}</span>
                )}</>
              )}
            </button>
          ))}
        </div>
      </header>

      {tab === "chat" && (
        <>
          <section className="lc-feed">
            {messages.length === 0 ? (
              <div className="lc-empty">No messages yet. Drop the first one — set the tone for the lounge.</div>
            ) : (
              messages.map((m, i) => {
                const prev = messages[i - 1];
                const sameAuthor = Boolean(
                  prev && prev.author && m.author &&
                  prev.author.handle === m.author.handle &&
                  new Date(m.createdAt).getTime() - new Date(prev.createdAt).getTime() < 5 * 60 * 1000 &&
                  !m.replyTo
                );
                return <MessageRow key={m.id} m={m} grouped={sameAuthor} onReply={() => setReplyTo(m)} />;
              })
            )}
            <div ref={feedEndRef} />
          </section>

          {/* Composer */}
          <footer className="lc-compose">
            {replyTo && (
              <div className="lc-reply-strip">
                <span className="lc-reply-bar" />
                <div className="lc-reply-text">
                  <div className="lc-reply-handle">Replying to <em>{replyTo.author?.handle ?? "—"}</em></div>
                  <div className="lc-reply-snippet">{(replyTo.content ?? "").slice(0, 120)}</div>
                </div>
                <button type="button" className="lc-reply-cancel" onClick={() => setReplyTo(null)}>✕</button>
              </div>
            )}
            {authStatus === "ok" ? (
              <div className="lc-input-row">
                <input
                  className="lc-input"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); void send(); } }}
                  placeholder={`Message ${loungeName || slug}`}
                  maxLength={4000}
                  disabled={sending}
                />
                <button
                  className="lc-send"
                  onClick={() => void send()}
                  disabled={!draft.trim() || sending}
                >
                  {sending ? "…" : "↑"}
                </button>
              </div>
            ) : authStatus === "no_profile" ? (
              <div className="lc-gate">
                <strong>Claim your trajectory handle to chat.</strong>
                <Link href="/onboarding" className="lc-gate-cta">Claim handle →</Link>
              </div>
            ) : authStatus === "out" ? (
              <div className="lc-gate">
                <strong>Sign in to chat in this lounge.</strong>
              </div>
            ) : (
              <div className="lc-gate">Loading…</div>
            )}
            {error && <div className="lc-error">{error}</div>}
          </footer>
        </>
      )}

      {tab === "library" && (
        <section className="lc-library">
          {!library ? (
            <div className="lc-empty">Loading library…</div>
          ) : library.photos.length + library.files.length + library.links.length === 0 ? (
            <div className="lc-empty">
              No photos, files, or links yet. Anything shared in chat lands here automatically.
            </div>
          ) : (
            <>
              {/* PHOTOS */}
              {library.photos.length > 0 && (
                <div className="lc-lib-section">
                  <h2 className="lc-lib-title">PHOTOS · {library.photos.length}</h2>
                  <div className="lc-lib-photos">
                    {library.photos.map((p) => (
                      <a key={p.messageId} href={p.url} target="_blank" rel="noopener noreferrer" className="lc-lib-photo">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p.url} alt={p.alt ?? ""} />
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* FILES */}
              {library.files.length > 0 && (
                <div className="lc-lib-section">
                  <h2 className="lc-lib-title">FILES · {library.files.length}</h2>
                  <ul className="lc-lib-list">
                    {library.files.map((f) => (
                      <li key={f.messageId} className="lc-lib-file">
                        <a href={f.url} target="_blank" rel="noopener noreferrer">
                          <span className="lc-lib-file-name">📄 {f.fileName}</span>
                          <span className="lc-lib-file-meta">
                            {f.size ? `${Math.round(f.size / 1024)} KB · ` : ""}
                            by <em>{f.author?.handle ?? "—"}</em>
                            {" · "}{new Date(f.createdAt).toLocaleDateString()}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* LINKS */}
              {library.links.length > 0 && (
                <div className="lc-lib-section">
                  <h2 className="lc-lib-title">LINKS · {library.links.length}</h2>
                  <ul className="lc-lib-list">
                    {library.links.map((l, i) => {
                      const host = (() => { try { return new URL(l.url).host; } catch { return l.url; } })();
                      return (
                        <li key={`${l.messageId}-${i}`} className="lc-lib-link">
                          <a href={l.url} target="_blank" rel="noopener noreferrer">
                            <span className="lc-lib-link-host">🔗 {host}</span>
                            <span className="lc-lib-link-snippet">{l.snippet}</span>
                            <span className="lc-lib-link-meta">
                              by <em>{l.author?.handle ?? "—"}</em>
                              {" · "}{new Date(l.createdAt).toLocaleDateString()}
                            </span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </>
          )}
        </section>
      )}

      {tab === "pinned" && (
        <section className="lc-pinned">
          {pinnedMessages.length === 0 ? (
            <div className="lc-empty">No pinned messages yet. Admins can pin from chat.</div>
          ) : (
            pinnedMessages.map((m) => <MessageRow key={m.id} m={m} grouped={false} pinned />)
          )}
        </section>
      )}

      <style>{`
        .lc-root {
          --accent: #5eead4;
          display: flex; flex-direction: column;
          min-height: calc(100vh - 4rem);
          max-width: 880px;
          margin: 0 auto;
          padding: 1.5rem 1rem 0;
          color: #d8d9e6;
          font-family: 'Inter', 'Space Grotesk', system-ui, sans-serif;
        }

        .lc-head { display: flex; flex-direction: column; gap: 0.7rem; padding-bottom: 0.6rem; border-bottom: 1px solid rgba(255,255,255,0.05); margin-bottom: 0.8rem; }
        .lc-head-row { display: flex; gap: 0.85rem; align-items: center; }
        .lc-back {
          font-family: ui-monospace, monospace;
          font-size: 0.68rem; font-weight: 700;
          letter-spacing: 0.16em; text-transform: uppercase;
          color: rgba(148,163,184,0.7);
          text-decoration: none;
        }
        .lc-back:hover { color: var(--accent); }
        .lc-back-quiet { color: rgba(148,163,184,0.45); }

        .lc-title-row { display: flex; align-items: center; gap: 0.7rem; }
        .lc-glyph { font-size: 1.7rem; color: var(--accent); text-shadow: 0 0 14px rgba(94,234,212,0.45); line-height: 1; }
        .lc-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.55rem; font-weight: 600;
          color: #f3f3fb; margin: 0;
          line-height: 1.1; letter-spacing: -0.005em;
        }
        .lc-room-meta { display: flex; align-items: center; gap: 0.4rem; font-family: ui-monospace, monospace; font-size: 0.7rem; color: rgba(148,163,184,0.7); }
        .lc-online-dot { width: 7px; height: 7px; border-radius: 50%; background: #5DCAA5; box-shadow: 0 0 8px rgba(93,202,165,0.6); }

        .lc-tabs { display: flex; gap: 0.25rem; }
        .lc-tab {
          font-family: ui-monospace, monospace;
          font-size: 0.7rem; font-weight: 700; letter-spacing: 0.16em;
          padding: 0.45rem 0.85rem;
          background: transparent;
          border: 0;
          color: rgba(148,163,184,0.65);
          cursor: pointer;
          border-bottom: 2px solid transparent;
          transition: color 0.15s, border-color 0.15s;
          display: inline-flex; align-items: center; gap: 0.45rem;
        }
        .lc-tab:hover { color: #f3f3fb; }
        .lc-tab.is-active { color: #f3f3fb; border-bottom-color: var(--accent); }
        .lc-tab-num {
          font-size: 0.6rem; font-weight: 800;
          padding: 0.1rem 0.4rem;
          border-radius: 999px;
          background: rgba(94,234,212,0.18);
          color: var(--accent);
        }
        .lc-tab.is-active .lc-tab-num { background: var(--accent); color: #0a0a10; }

        /* FEED */
        .lc-feed { flex: 1; overflow-y: auto; padding: 0.6rem 0 1rem; display: flex; flex-direction: column; gap: 0.5rem; }
        .lc-empty {
          padding: 2.5rem 1rem;
          font-family: ui-monospace, monospace;
          font-size: 0.85rem;
          color: rgba(148,163,184,0.6);
          text-align: center;
          border: 1px dashed rgba(94,234,212,0.18);
          border-radius: 0.6rem;
        }

        /* COMPOSE */
        .lc-compose {
          padding: 0.75rem 0;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .lc-input-row { display: flex; gap: 0.5rem; align-items: center; }
        .lc-input {
          flex: 1;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 0.55rem;
          padding: 0.7rem 0.9rem;
          color: #f3f3fb;
          font-family: inherit;
          font-size: 0.94rem;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.2s;
        }
        .lc-input:focus { border-color: var(--accent); box-shadow: 0 0 0 1px var(--accent), 0 0 12px rgba(94,234,212,0.2); }
        .lc-input::placeholder { color: rgba(148,163,184,0.5); }
        .lc-send {
          width: 2.4rem; height: 2.4rem;
          background: var(--accent); color: #0a0a10;
          border: 0; border-radius: 0.5rem;
          font-size: 1.05rem; font-weight: 800;
          cursor: pointer;
        }
        .lc-send:hover:not(:disabled) { filter: brightness(1.08); box-shadow: 0 0 14px rgba(94,234,212,0.35); }
        .lc-send:disabled { opacity: 0.4; cursor: default; }

        .lc-reply-strip {
          display: flex; align-items: stretch; gap: 0.5rem;
          padding: 0.5rem 0.7rem;
          margin-bottom: 0.5rem;
          background: rgba(94,234,212,0.06);
          border: 1px solid rgba(94,234,212,0.25);
          border-radius: 0.45rem;
        }
        .lc-reply-bar { width: 2px; background: var(--accent); border-radius: 1px; }
        .lc-reply-text { flex: 1; min-width: 0; }
        .lc-reply-handle { font-family: ui-monospace, monospace; font-size: 0.66rem; color: var(--accent); letter-spacing: 0.08em; }
        .lc-reply-handle em { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 1.1em; font-weight: 600; }
        .lc-reply-snippet { font-size: 0.78rem; color: rgba(216,217,230,0.7); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .lc-reply-cancel {
          background: transparent; border: 0; cursor: pointer;
          color: rgba(148,163,184,0.6);
          font-size: 0.85rem;
        }
        .lc-reply-cancel:hover { color: #ff8b7e; }

        .lc-gate {
          padding: 0.85rem 1rem;
          background: rgba(244,201,93,0.06);
          border: 1px solid rgba(244,201,93,0.28);
          border-radius: 0.5rem;
          color: #F4C95D;
          font-size: 0.84rem;
          display: flex; flex-direction: column; gap: 0.5rem;
        }
        .lc-gate-cta {
          align-self: flex-start;
          padding: 0.4rem 0.7rem;
          background: #F4C95D; color: #0a0a10;
          border-radius: 0.35rem;
          font-family: ui-monospace, monospace;
          font-size: 0.66rem; font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          text-decoration: none;
        }
        .lc-error {
          margin-top: 0.5rem;
          padding: 0.5rem 0.7rem;
          background: rgba(255,107,91,0.08);
          border: 1px solid rgba(255,107,91,0.3);
          border-radius: 0.4rem;
          color: #ff8b7e;
          font-family: ui-monospace, monospace;
          font-size: 0.76rem;
        }

        /* LIBRARY */
        .lc-library { padding: 0.5rem 0 1.5rem; display: flex; flex-direction: column; gap: 1.8rem; }
        .lc-lib-section { display: flex; flex-direction: column; gap: 0.7rem; }
        .lc-lib-title {
          font-family: ui-monospace, monospace;
          font-size: 0.62rem; font-weight: 700;
          letter-spacing: 0.24em;
          color: rgba(148,163,184,0.7);
          margin: 0;
          padding-bottom: 0.45rem;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .lc-lib-photos { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 0.45rem; }
        .lc-lib-photo {
          display: block;
          aspect-ratio: 1;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 0.5rem;
          overflow: hidden;
          transition: border-color 0.15s, transform 0.15s;
        }
        .lc-lib-photo:hover { border-color: var(--accent); transform: scale(1.02); }
        .lc-lib-photo img { width: 100%; height: 100%; object-fit: cover; display: block; }

        .lc-lib-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.45rem; }
        .lc-lib-file a, .lc-lib-link a {
          display: flex; flex-direction: column; gap: 0.2rem;
          padding: 0.6rem 0.85rem;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 0.45rem;
          text-decoration: none;
          color: inherit;
          transition: border-color 0.15s, background 0.15s;
        }
        .lc-lib-file a:hover, .lc-lib-link a:hover { border-color: var(--accent); background: rgba(94,234,212,0.04); }
        .lc-lib-file-name {
          font-family: ui-monospace, monospace;
          font-size: 0.88rem;
          color: #f3f3fb;
          font-weight: 600;
        }
        .lc-lib-file-meta, .lc-lib-link-meta {
          font-family: ui-monospace, monospace;
          font-size: 0.66rem;
          color: rgba(148,163,184,0.6);
        }
        .lc-lib-file-meta em, .lc-lib-link-meta em {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 1.05em;
          color: var(--accent);
          font-weight: 600;
        }
        .lc-lib-link-host {
          font-family: ui-monospace, monospace;
          font-size: 0.78rem;
          color: var(--accent);
          font-weight: 700;
          letter-spacing: 0.02em;
        }
        .lc-lib-link-snippet {
          font-size: 0.82rem;
          color: rgba(216,217,230,0.78);
          line-height: 1.45;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* PINNED */
        .lc-pinned { padding: 0.5rem 0 1.5rem; display: flex; flex-direction: column; gap: 0.55rem; }
      `}</style>
    </main>
  );
}

// ── Message row ─────────────────────────────────────────────────────
function MessageRow({
  m,
  grouped,
  pinned,
  onReply,
}: {
  m: ChatMessagePublic;
  grouped: boolean;
  pinned?: boolean;
  onReply?: () => void;
}) {
  const isMe = m.isMine;
  const author = m.author;
  const time = new Date(m.createdAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });

  return (
    <div className={`mr ${isMe ? "is-me" : ""} ${grouped ? "is-grouped" : ""} ${pinned ? "is-pinned" : ""}`}>
      {!isMe && (
        grouped ? <span className="mr-spacer" /> : (
          <span
            className="mr-avatar"
            style={{ ["--accent" as string]: author?.mentor ? "#F4C95D" : "#5eead4" }}
          >
            {(author?.handle ?? "?").slice(0, 1).toUpperCase()}
          </span>
        )
      )}
      <div className="mr-col">
        {!grouped && (
          <div className="mr-byline">
            <span className={`mr-name ${author?.mentor ? "is-mentor" : ""}`}>{author?.handle ?? "—"}</span>
            {author?.mentor && (
              <span className="mr-mentor">
                ★ MENTOR · {author.mentor.universityRole.toUpperCase()}
              </span>
            )}
            <span className="mr-time">{time}</span>
            {pinned && <span className="mr-pin-flag">📌 PINNED</span>}
          </div>
        )}
        {m.replyTo && (
          <div className="mr-reply">
            <span className="mr-reply-bar" />
            <div className="mr-reply-text">
              <div className="mr-reply-handle">{m.replyTo.handle ?? "—"}</div>
              <div className="mr-reply-snippet">{m.replyTo.snippet}</div>
            </div>
          </div>
        )}
        <div className={`mr-bubble ${isMe ? "is-me" : ""}`} onDoubleClick={onReply}>
          {m.content}
        </div>
      </div>

      <style>{`
        .mr { display: flex; gap: 0.55rem; align-items: flex-start; margin-top: 0.6rem; }
        .mr.is-grouped { margin-top: 0.05rem; }
        .mr.is-me { flex-direction: row-reverse; }
        .mr.is-pinned { background: rgba(244,201,93,0.04); border-left: 2px solid rgba(244,201,93,0.45); padding: 0.4rem 0.5rem 0.4rem 0.55rem; border-radius: 0 0.45rem 0.45rem 0; }

        .mr-avatar {
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
        }
        .mr-spacer { width: 2rem; flex-shrink: 0; }

        .mr-col { display: flex; flex-direction: column; gap: 0.2rem; max-width: 68%; min-width: 0; }
        .mr.is-me .mr-col { align-items: flex-end; }

        .mr-byline { display: flex; align-items: baseline; gap: 0.4rem; flex-wrap: wrap; }
        .mr-name {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-weight: 600;
          color: #f3f3fb;
          font-size: 0.92rem;
        }
        .mr-name.is-mentor { color: #F4C95D; }
        .mr-mentor {
          font-family: ui-monospace, monospace;
          font-size: 0.52rem; font-weight: 800;
          letter-spacing: 0.18em;
          color: #F4C95D;
          padding: 0.13rem 0.4rem;
          border-radius: 0.25rem;
          background: rgba(244,201,93,0.1);
          border: 1px solid rgba(244,201,93,0.4);
        }
        .mr-time { font-family: ui-monospace, monospace; font-size: 0.62rem; color: rgba(148,163,184,0.5); }
        .mr-pin-flag {
          font-family: ui-monospace, monospace;
          font-size: 0.55rem; font-weight: 800;
          letter-spacing: 0.18em;
          color: #F4C95D;
        }

        .mr-reply {
          display: flex; gap: 0.45rem;
          padding: 0.35rem 0;
          font-size: 0.76rem;
          max-width: 100%;
        }
        .mr-reply-bar { width: 2px; background: rgba(94,234,212,0.7); border-radius: 1px; }
        .mr-reply-text { flex: 1; min-width: 0; }
        .mr-reply-handle { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 0.78rem; color: #5eead4; }
        .mr-reply-snippet { font-size: 0.72rem; color: rgba(216,217,230,0.6); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

        .mr-bubble {
          padding: 0.6rem 0.9rem;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 16px 16px 16px 5px;
          color: rgba(216,217,230,0.94);
          font-size: 0.92rem;
          line-height: 1.5;
          white-space: pre-wrap;
          word-wrap: break-word;
          cursor: pointer;
        }
        .mr-bubble.is-me {
          background: linear-gradient(135deg, rgba(94,234,212,0.18), rgba(94,234,212,0.06));
          border-color: rgba(94,234,212,0.35);
          color: #f3f3fb;
          border-radius: 16px 16px 5px 16px;
        }
      `}</style>
    </div>
  );
}
