"use client";

import { useEffect, useMemo, useState } from "react";
import { createBrowserClient } from "@/lib/supabase";
import { authFetch } from "@/lib/client-auth";
import {
  POST_TYPES,
  POST_TYPE_LABEL,
  type PostPublic,
  type PostType,
} from "@/lib/lounges";
import PostCard from "@/components/lounges/PostCard";

interface Props {
  slug: string;
  initialPosts: PostPublic[];
}

export default function LoungeFeed({ slug, initialPosts }: Props) {
  const [posts, setPosts] = useState<PostPublic[]>(initialPosts);
  const [currentUserHandle, setCurrentUserHandle] = useState<string | null>(null);
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);
  const [isSignedIn, setIsSignedIn] = useState<boolean | null>(null);
  const [hasProfile, setHasProfile] = useState<boolean | null>(null);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [postType, setPostType] = useState<PostType>("discussion");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isAdmin = useMemo(() => {
    if (!currentUserEmail) return false;
    const adminList = ["yk777@cornell.edu"];
    return adminList.includes(currentUserEmail.trim().toLowerCase());
  }, [currentUserEmail]);

  useEffect(() => {
    let cancelled = false;
    async function loadProfile() {
      try {
        const supabase = createBrowserClient();
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (cancelled) return;
        if (!session) {
          setIsSignedIn(false);
          setCurrentUserHandle(null);
          setCurrentUserEmail(null);
          setHasProfile(false);
          return;
        }
        setIsSignedIn(true);
        setCurrentUserEmail(session.user.email ?? null);
        const res = await fetch("/api/profile/me", {
          headers: { Authorization: `Bearer ${session.access_token}` },
          cache: "no-store",
        });
        const json = await res.json();
        if (cancelled) return;
        if (json.profile?.handle) {
          setCurrentUserHandle(json.profile.handle);
          setHasProfile(true);
        } else {
          setHasProfile(false);
        }
      } catch {
        if (!cancelled) {
          setIsSignedIn(false);
          setHasProfile(false);
        }
      }
    }
    void loadProfile();
    return () => {
      cancelled = true;
    };
  }, []);

  const titleLen = title.trim().length;
  const titleValid = titleLen >= 4 && titleLen <= 140;
  const bodyValid = body.trim().length <= 4000;
  const canSubmit = hasProfile && titleValid && bodyValid && !submitting;

  async function submitPost() {
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);
    try {
      const res = await authFetch(`/api/lounges/${slug}/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          body: body.trim() || null,
          postType,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error ?? "Post failed");
      setPosts((prev) => [json.post, ...prev]);
      setTitle("");
      setBody("");
      setPostType("discussion");
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setSubmitting(false);
    }
  }

  function handleDelete(postId: string) {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
  }

  return (
    <section className="lf-root">
      <div className="lf-composer">
        {hasProfile === false && (
          <div className="lf-gate">
            {isSignedIn ? (
              <>
                <strong>One step before you can post: claim your handle.</strong>
                <span>Pick your trajectory handle + grad year + ambition (takes 30s).</span>
                <a href="/onboarding" className="lf-gate-cta">
                  Claim my handle →
                </a>
              </>
            ) : (
              <>
                <strong>Sign in to post in this lounge.</strong>
                <span>Use the EJECT/SIGN-IN button up top — then claim your handle.</span>
              </>
            )}
          </div>
        )}

        <div className="lf-type-row">
          {POST_TYPES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setPostType(t)}
              className={`lf-type ${postType === t ? "is-active" : ""}`}
            >
              {POST_TYPE_LABEL[t]}
            </button>
          ))}
        </div>

        <input
          type="text"
          maxLength={140}
          placeholder="Title — 4 to 140 characters. Say the thing."
          className="lf-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={!hasProfile}
        />

        <textarea
          rows={4}
          maxLength={4000}
          placeholder="Body (optional) — questions, context, link, answer attempt. 4000 chars max."
          className="lf-body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          disabled={!hasProfile}
        />

        <div className="lf-foot">
          <div className="lf-meta">
            <span className={titleLen > 0 && !titleValid ? "lf-meta-warn" : ""}>
              Title {titleLen}/140
            </span>
            <span className="lf-meta-dot">·</span>
            <span>Body {body.length}/4000</span>
          </div>
          <button
            type="button"
            disabled={!canSubmit}
            onClick={() => void submitPost()}
            className="lf-submit"
          >
            {submitting ? "Posting…" : "Post →"}
          </button>
        </div>
        {error && <div className="lf-error">{error}</div>}
      </div>

      <div className="lf-list">
        {posts.length === 0 ? (
          <div className="lf-empty">
            No posts yet. Be the first to drop a question — set the tone for the lounge.
          </div>
        ) : (
          posts.map((p) => (
            <PostCard
              key={p.id}
              post={p}
              currentUserHandle={currentUserHandle}
              isAdmin={isAdmin}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>

      <style>{`
        .lf-root {
          display: flex; flex-direction: column; gap: 1.5rem;
          font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif;
        }
        .lf-composer {
          border: 1px solid rgba(94,234,212,0.18);
          border-radius: 0.85rem;
          padding: 1.1rem 1.2rem 1rem;
          background: rgba(8,10,18,0.7);
          display: flex; flex-direction: column; gap: 0.65rem;
        }
        .lf-gate {
          display: flex; flex-direction: column;
          padding: 0.6rem 0.8rem;
          border-radius: 0.45rem;
          background: rgba(244,201,93,0.07);
          border: 1px solid rgba(244,201,93,0.25);
          color: #F4C95D;
          font-size: 0.8rem;
        }
        .lf-gate strong { font-weight: 700; letter-spacing: 0.01em; }
        .lf-gate span { color: rgba(244,201,93,0.8); font-size: 0.74rem; margin-bottom: 0.4rem; }
        .lf-gate-cta {
          align-self: flex-start;
          display: inline-block;
          margin-top: 0.25rem;
          font-family: ui-monospace, monospace;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          text-decoration: none;
          padding: 0.55rem 0.9rem;
          color: #0a0a10;
          background: #F4C95D;
          border: 0;
          border-radius: 0.4rem;
          cursor: pointer;
          transition: filter 0.15s, box-shadow 0.2s;
        }
        .lf-gate-cta:hover {
          filter: brightness(1.08);
          box-shadow: 0 0 16px rgba(244,201,93,0.4);
        }

        .lf-type-row { display: flex; gap: 0.35rem; flex-wrap: wrap; }
        .lf-type {
          font-family: ui-monospace, monospace;
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 0.32rem 0.65rem;
          border-radius: 999px;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.07);
          color: rgba(216,217,230,0.7);
          cursor: pointer;
          transition: color 0.15s, border-color 0.15s, background 0.15s;
        }
        .lf-type:hover { color: #5eead4; border-color: rgba(94,234,212,0.35); }
        .lf-type.is-active {
          color: #0a0a10;
          background: #5eead4;
          border-color: #5eead4;
        }

        .lf-title, .lf-body {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 0.5rem;
          padding: 0.7rem 0.85rem;
          color: #f3f3fb;
          font-family: inherit;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.2s;
        }
        .lf-title { font-size: 1.05rem; font-weight: 500; }
        .lf-body { font-size: 0.92rem; resize: vertical; min-height: 90px; line-height: 1.55; }
        .lf-title:focus, .lf-body:focus {
          border-color: #5eead4;
          box-shadow: 0 0 0 1px #5eead4, 0 0 16px rgba(94,234,212,0.25);
        }
        .lf-title:disabled, .lf-body:disabled { opacity: 0.45; cursor: not-allowed; }

        .lf-foot {
          display: flex; align-items: center; justify-content: space-between;
          gap: 0.75rem;
          margin-top: 0.15rem;
        }
        .lf-meta {
          font-family: ui-monospace, monospace;
          font-size: 0.7rem;
          color: rgba(148,163,184,0.65);
          display: flex; gap: 0.4rem;
        }
        .lf-meta-warn { color: #ff8b7e; }
        .lf-meta-dot { opacity: 0.5; }

        .lf-submit {
          font-family: ui-monospace, monospace;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          padding: 0.65rem 1rem;
          color: #0a0a10;
          background: #5eead4;
          border: 0;
          border-radius: 0.45rem;
          cursor: pointer;
          transition: filter 0.15s, box-shadow 0.2s;
        }
        .lf-submit:hover:not(:disabled) {
          filter: brightness(1.08);
          box-shadow: 0 0 20px rgba(94,234,212,0.4);
        }
        .lf-submit:disabled { opacity: 0.4; cursor: default; }

        .lf-error {
          font-family: ui-monospace, monospace;
          font-size: 0.75rem;
          color: #ff8b7e;
          padding: 0.45rem 0.6rem;
          border-radius: 0.35rem;
          background: rgba(255,107,91,0.08);
          border: 1px solid rgba(255,107,91,0.25);
        }
        .lf-empty {
          padding: 2.5rem 1rem;
          font-family: ui-monospace, monospace;
          font-size: 0.85rem;
          color: rgba(148,163,184,0.7);
          text-align: center;
          border: 1px dashed rgba(94,234,212,0.18);
          border-radius: 0.75rem;
        }
        .lf-list { display: flex; flex-direction: column; }
      `}</style>
    </section>
  );
}
