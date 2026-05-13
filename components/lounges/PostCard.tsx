"use client";

import { useState } from "react";
import { authFetch } from "@/lib/client-auth";
import AuthorChip from "@/components/trajectory/AuthorChip";
import {
  POST_TYPE_LABEL,
  REACTION_KINDS,
  REACTION_META,
  type CommentPublic,
  type PostPublic,
  type ReactionKind,
} from "@/lib/lounges";

interface Props {
  post: PostPublic;
  currentUserHandle: string | null;
  isAdmin: boolean;
  onDelete?: (postId: string) => void;
}

function relativeTime(iso: string): string {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d`;
  return new Date(iso).toLocaleDateString();
}

export default function PostCard({ post, currentUserHandle, isAdmin, onDelete }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [counts, setCounts] = useState(post.reactionCounts);
  const [mine, setMine] = useState<Set<ReactionKind>>(new Set(post.myReactions));
  const [comments, setComments] = useState<CommentPublic[] | null>(null);
  const [loadingComments, setLoadingComments] = useState(false);
  const [reply, setReply] = useState("");
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isOwner =
    !!currentUserHandle && !!post.author && post.author.handle === currentUserHandle;
  const canDelete = isOwner || isAdmin;

  async function loadComments() {
    if (comments != null) return;
    setLoadingComments(true);
    try {
      const res = await fetch(`/api/lounges/posts/${post.id}`, { cache: "no-store" });
      const json = await res.json();
      if (json.ok) setComments(json.comments ?? []);
    } catch {
      // ignore
    } finally {
      setLoadingComments(false);
    }
  }

  function toggleExpand() {
    const next = !expanded;
    setExpanded(next);
    if (next) void loadComments();
  }

  async function toggleReaction(kind: ReactionKind) {
    try {
      const res = await authFetch(`/api/lounges/posts/${post.id}/reactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error ?? "Reaction failed");
      setCounts((prev) => ({ ...prev, [kind]: json.count }));
      setMine((prev) => {
        const next = new Set(prev);
        if (json.active) next.add(kind);
        else next.delete(kind);
        return next;
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  }

  async function submitReply() {
    if (!reply.trim() || posting) return;
    setPosting(true);
    setError(null);
    try {
      const res = await authFetch(`/api/lounges/posts/${post.id}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: reply.trim() }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error ?? "Reply failed");
      setComments((prev) => [...(prev ?? []), json.comment]);
      setReply("");
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setPosting(false);
    }
  }

  async function doDelete() {
    if (!window.confirm("Delete this post?")) return;
    try {
      const res = await authFetch(`/api/lounges/posts/${post.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      onDelete?.(post.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  }

  return (
    <article className="pc-card">
      <header className="pc-head">
        <span className={`pc-type pc-type-${post.postType}`}>
          {POST_TYPE_LABEL[post.postType]}
        </span>
        {post.author ? (
          <AuthorChip
            handle={post.author.handle}
            graduationYear={post.author.graduationYear}
            badges={post.author.badges}
            size="sm"
          />
        ) : (
          <span className="pc-anon">— anonymous —</span>
        )}
        <span className="pc-time">· {relativeTime(post.createdAt)}</span>
        {canDelete && (
          <button type="button" onClick={() => void doDelete()} className="pc-delete" title="Delete">
            ✕
          </button>
        )}
      </header>

      <h3 className="pc-title">{post.title}</h3>
      {post.body && <p className="pc-body">{post.body}</p>}

      <footer className="pc-foot">
        <div className="pc-reactions">
          {REACTION_KINDS.map((kind) => {
            const meta = REACTION_META[kind];
            const active = mine.has(kind);
            return (
              <button
                key={kind}
                type="button"
                onClick={() => void toggleReaction(kind)}
                className={`pc-reaction ${active ? "is-active" : ""}`}
                style={{ ["--accent" as string]: meta.accent }}
                aria-label={meta.label}
              >
                <span className="pc-reaction-glyph">{meta.glyph}</span>
                <span className="pc-reaction-count">{counts[kind] ?? 0}</span>
              </button>
            );
          })}
        </div>

        <button type="button" onClick={toggleExpand} className="pc-replies-toggle">
          {expanded ? "Hide replies" : `Replies · ${post.commentCount}`}
        </button>
      </footer>

      {expanded && (
        <section className="pc-thread">
          {loadingComments && <div className="pc-thread-loading">Loading replies…</div>}
          {comments && comments.length === 0 && (
            <div className="pc-thread-empty">No replies yet. Be the one with the better answer.</div>
          )}
          {comments?.map((c) => (
            <div key={c.id} className="pc-comment">
              <div className="pc-comment-head">
                {c.author ? (
                  <AuthorChip
                    handle={c.author.handle}
                    graduationYear={c.author.graduationYear}
                    badges={c.author.badges}
                    size="sm"
                  />
                ) : (
                  <span className="pc-anon">— anonymous —</span>
                )}
                <span className="pc-time">· {relativeTime(c.createdAt)}</span>
              </div>
              <p className="pc-comment-body">{c.body}</p>
            </div>
          ))}

          {currentUserHandle ? (
            <div className="pc-reply-composer">
              <textarea
                rows={2}
                placeholder="Write a reply…"
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                className="pc-reply-input"
              />
              <button
                type="button"
                disabled={!reply.trim() || posting}
                onClick={() => void submitReply()}
                className="pc-reply-submit"
              >
                {posting ? "Posting…" : "Reply →"}
              </button>
            </div>
          ) : (
            <div className="pc-reply-hint">Sign in + claim your handle to reply.</div>
          )}

          {error && <div className="pc-error">{error}</div>}
        </section>
      )}

      <style>{`
        .pc-card {
          padding: 1rem 1.1rem 0.85rem;
          border: 1px solid rgba(94,234,212,0.12);
          border-radius: 0.75rem;
          background: rgba(8,10,18,0.65);
          color: #d8d9e6;
          font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif;
          margin-bottom: 0.75rem;
          transition: border-color 0.15s, box-shadow 0.2s;
        }
        .pc-card:hover {
          border-color: rgba(94,234,212,0.3);
          box-shadow: 0 16px 36px rgba(0,0,0,0.4);
        }
        .pc-head {
          display: flex; align-items: center; gap: 0.55rem;
          flex-wrap: wrap;
          margin-bottom: 0.55rem;
        }
        .pc-type {
          font-family: ui-monospace, monospace;
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 0.18rem 0.45rem;
          border-radius: 0.3rem;
          border: 1px solid;
          background: rgba(255,255,255,0.02);
          line-height: 1;
        }
        .pc-type-discussion     { color: #5eead4; border-color: rgba(94,234,212,0.35); }
        .pc-type-question       { color: #F4C95D; border-color: rgba(244,201,93,0.35); }
        .pc-type-resource_share { color: #A99CFF; border-color: rgba(169,156,255,0.35); }
        .pc-time {
          font-family: ui-monospace, monospace;
          font-size: 0.7rem;
          color: rgba(148,163,184,0.6);
        }
        .pc-anon {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 0.85rem;
          color: rgba(148,163,184,0.7);
        }
        .pc-delete {
          margin-left: auto;
          background: none; border: 0; cursor: pointer;
          color: rgba(148,163,184,0.4);
          font-size: 0.8rem;
          padding: 0.2rem 0.45rem;
          border-radius: 4px;
          transition: color 0.15s, background 0.15s;
        }
        .pc-delete:hover { color: #ff6b5b; background: rgba(255,107,91,0.08); }

        .pc-title {
          font-family: 'Cormorant Garamond', 'Georgia', serif;
          font-size: 1.25rem;
          font-weight: 600;
          color: #f3f3fb;
          margin: 0 0 0.4rem;
          letter-spacing: -0.005em;
          line-height: 1.3;
        }
        .pc-body {
          font-size: 0.92rem;
          color: rgba(216,217,230,0.88);
          margin: 0 0 0.75rem;
          line-height: 1.6;
          white-space: pre-wrap;
        }

        .pc-foot {
          display: flex; align-items: center; justify-content: space-between;
          gap: 0.5rem;
          padding-top: 0.5rem;
          border-top: 1px solid rgba(255,255,255,0.04);
        }
        .pc-reactions { display: flex; gap: 0.3rem; }
        .pc-reaction {
          --accent: #5eead4;
          display: inline-flex; align-items: center; gap: 0.3rem;
          padding: 0.25rem 0.55rem;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 999px;
          color: rgba(216,217,230,0.7);
          font-family: ui-monospace, monospace;
          font-size: 0.72rem;
          cursor: pointer;
          transition: color 0.15s, border-color 0.15s, background 0.15s;
        }
        .pc-reaction:hover { color: var(--accent); border-color: color-mix(in srgb, var(--accent) 40%, transparent); }
        .pc-reaction.is-active {
          color: var(--accent);
          border-color: var(--accent);
          background: color-mix(in srgb, var(--accent) 12%, transparent);
        }
        .pc-reaction-glyph {
          font-size: 0.85em;
          text-shadow: 0 0 8px color-mix(in srgb, var(--accent) 50%, transparent);
        }

        .pc-replies-toggle {
          font-family: ui-monospace, monospace;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(148,163,184,0.7);
          background: none;
          border: 0;
          cursor: pointer;
          padding: 0.2rem 0.45rem;
          transition: color 0.15s;
        }
        .pc-replies-toggle:hover { color: #5eead4; }

        .pc-thread {
          margin-top: 0.85rem;
          padding-top: 0.75rem;
          border-top: 1px dashed rgba(94,234,212,0.18);
          display: flex; flex-direction: column; gap: 0.7rem;
        }
        .pc-thread-loading, .pc-thread-empty {
          font-family: ui-monospace, monospace;
          font-size: 0.75rem;
          color: rgba(148,163,184,0.6);
          padding: 0.3rem 0;
        }
        .pc-comment {
          padding: 0.55rem 0.65rem;
          background: rgba(255,255,255,0.02);
          border-left: 2px solid rgba(94,234,212,0.25);
          border-radius: 0 0.4rem 0.4rem 0;
        }
        .pc-comment-head {
          display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;
          margin-bottom: 0.25rem;
        }
        .pc-comment-body {
          margin: 0;
          font-size: 0.86rem;
          color: rgba(216,217,230,0.88);
          line-height: 1.55;
          white-space: pre-wrap;
        }

        .pc-reply-composer { display: flex; gap: 0.5rem; align-items: flex-end; }
        .pc-reply-input {
          flex: 1;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 0.45rem;
          padding: 0.55rem 0.7rem;
          color: #f3f3fb;
          font-size: 0.85rem;
          font-family: inherit;
          resize: vertical;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.2s;
        }
        .pc-reply-input:focus {
          border-color: #5eead4;
          box-shadow: 0 0 0 1px #5eead4, 0 0 12px rgba(94,234,212,0.25);
        }
        .pc-reply-submit {
          font-family: ui-monospace, monospace;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 0.55rem 0.8rem;
          color: #0a0a10;
          background: #5eead4;
          border: 0;
          border-radius: 0.4rem;
          cursor: pointer;
          transition: filter 0.15s, box-shadow 0.2s;
        }
        .pc-reply-submit:hover:not(:disabled) { filter: brightness(1.08); box-shadow: 0 0 16px rgba(94,234,212,0.4); }
        .pc-reply-submit:disabled { opacity: 0.4; cursor: default; }

        .pc-reply-hint {
          font-family: ui-monospace, monospace;
          font-size: 0.72rem;
          color: rgba(148,163,184,0.65);
        }
        .pc-error {
          font-family: ui-monospace, monospace;
          font-size: 0.74rem;
          color: #ff8b7e;
          padding: 0.4rem 0.6rem;
          border-radius: 0.3rem;
          background: rgba(255,107,91,0.08);
          border: 1px solid rgba(255,107,91,0.25);
        }
      `}</style>
    </article>
  );
}
