"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { authFetch } from "@/lib/client-auth";
import {
  DOC_GROUP_EMOJI,
  DOC_GROUP_LABELS,
  type DocGroup,
} from "@/lib/docGroups";

interface Resource {
  id: string;
  title: string;
  description: string | null;
  folder: DocGroup;
  attachmentUrl: string;
  fileName: string | null;
  fileSize: number | null;
  mimeType: string | null;
  isImage: boolean;
  isPdf: boolean;
  isInheroOfficial: boolean;
  isSeeded: boolean;
  downloadCount: number;
  upvoteCount: number;
  commentCount: number;
  createdAt: string;
  isMine: boolean;
  lounge: { slug: string; name: string } | null;
  author: { handle: string } | null;
}

export default function ResourceDetailPage() {
  const params = useParams<{ resourceId: string }>();
  const resourceId = params?.resourceId;
  const [resource, setResource] = useState<Resource | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!resourceId) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    void (async () => {
      try {
        const res = await authFetch(`/api/library/resource/${resourceId}`);
        const raw = await res.text();
        let json: { resource?: Resource; error?: string } = {};
        try { json = raw ? JSON.parse(raw) : {}; } catch { /* ignore */ }
        if (!res.ok || !json.resource) {
          throw new Error(json.error ?? `HTTP ${res.status}`);
        }
        if (!cancelled) setResource(json.resource);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : String(e));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [resourceId]);

  // Honor #comments anchor — scroll to the comments section once the
  // detail content is in the DOM. useLayoutEffect would be ideal but the
  // content paints async after the fetch, so a normal effect post-load
  // is the right hook.
  useEffect(() => {
    if (!resource) return;
    if (typeof window === "undefined") return;
    if (window.location.hash === "#comments") {
      const el = document.getElementById("comments");
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [resource]);

  if (loading) return <DetailSkeleton />;
  if (error || !resource) return <NotFound message={error} />;

  return (
    <main className="rd-root">
      <header className="rd-topbar">
        <Link href="/library" className="rd-back">← Back to Library</Link>
        <div className="rd-actions">
          <Link
            href={`/library/${resource.id}/read`}
            className="rd-action rd-action-primary"
          >
            📖 Open in Reader →
          </Link>
          {/* Edit + Delete ship in Round 2 — only the author/admin will see them then */}
        </div>
      </header>

      <section className="rd-meta">
        <h1 className="rd-title">{resource.title}</h1>
        <div className="rd-badges">
          {resource.folder === "this-week" && <span className="rd-badge rd-badge-week">💎 FREE THIS WEEK</span>}
          {resource.isInheroOfficial && <span className="rd-badge rd-badge-official">⭐ INHERO ORIGINAL</span>}
          {!resource.isInheroOfficial && resource.folder !== "this-week" && (
            <span className="rd-badge rd-badge-community">✦ ORIGINAL</span>
          )}
        </div>
        <div className="rd-context">
          {resource.author && (
            <>
              by <em className="rd-author">{resource.author.handle}</em>
              {" · "}
            </>
          )}
          <span aria-hidden="true">{DOC_GROUP_EMOJI[resource.folder]}</span>{" "}
          {DOC_GROUP_LABELS[resource.folder]}
          {resource.lounge && (
            <>
              {" · "}
              <Link href={`/lounges/${resource.lounge.slug}`} className="rd-lounge-link">
                {resource.lounge.name}
              </Link>
            </>
          )}
          {" · "}
          <span className="rd-time">{formatRelative(resource.createdAt)}</span>
        </div>
        <div className="rd-counts">
          <span>{resource.downloadCount} downloads</span>
          <span>·</span>
          <span>{resource.upvoteCount} upvotes</span>
          <span>·</span>
          <span>{resource.commentCount} comments</span>
        </div>
      </section>

      <section className="rd-preview" aria-label="File preview">
        <PreviewSurface resource={resource} />
      </section>

      <section id="comments" className="rd-comments" aria-label="Comments">
        <h2 className="rd-comments-head">💬 Comments ({resource.commentCount})</h2>
        <div className="rd-comments-stub">
          Comments UI ships next round. The thread schema is in place — your
          uploads, upvotes, and replies will all stick.
        </div>
      </section>

      <style jsx>{`
        .rd-root {
          --accent: #5eead4;
          --gold: #F4C95D;
          max-width: 1100px;
          margin: 0 auto;
          padding: 2rem 1.5rem 4rem;
          color: #d8d9e6;
          font-family: 'Inter', 'Space Grotesk', system-ui, sans-serif;
        }
        .rd-topbar {
          display: flex; align-items: center; justify-content: space-between;
          margin-bottom: 1.5rem;
          gap: 1rem;
        }
        .rd-back {
          font-family: ui-monospace, monospace;
          font-size: 0.7rem; font-weight: 700; letter-spacing: 0.14em;
          color: rgba(148,163,184,0.85);
          text-decoration: none;
          padding: 0.45rem 0.85rem;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.08);
          transition: border-color 0.12s, color 0.12s;
        }
        .rd-back:hover { color: var(--accent); border-color: rgba(94,234,212,0.4); }

        .rd-actions { display: inline-flex; gap: 0.45rem; }
        .rd-action {
          display: inline-flex; align-items: center; gap: 0.35rem;
          font-family: ui-monospace, monospace;
          font-size: 0.74rem; font-weight: 800; letter-spacing: 0.1em;
          padding: 0.55rem 0.95rem;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 0.45rem;
          color: rgba(216,217,230,0.92);
          text-decoration: none;
          cursor: pointer;
          transition: background 0.12s, border-color 0.12s, color 0.12s, transform 0.12s;
        }
        .rd-action:hover { background: rgba(94,234,212,0.1); border-color: rgba(94,234,212,0.45); color: var(--accent); transform: translateY(-1px); }
        .rd-action-primary {
          background: var(--accent); color: #062320; border-color: var(--accent);
        }
        .rd-action-primary:hover { color: #062320; background: var(--accent); filter: brightness(1.08); }

        .rd-meta { margin-bottom: 1.5rem; }
        .rd-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2.1rem; font-weight: 600;
          color: #f3f3fb;
          margin: 0 0 0.6rem;
          letter-spacing: -0.005em;
          line-height: 1.18;
        }
        .rd-badges { display: inline-flex; gap: 0.35rem; margin-bottom: 0.7rem; flex-wrap: wrap; }
        .rd-badge {
          font-family: ui-monospace, monospace;
          font-size: 0.58rem; font-weight: 800; letter-spacing: 0.14em;
          padding: 0.24rem 0.5rem;
          border-radius: 0.3rem;
        }
        .rd-badge-official { background: rgba(244,201,93,0.85); color: #1a1306; }
        .rd-badge-community { background: rgba(94,234,212,0.85); color: #062320; }
        .rd-badge-week { background: rgba(125,211,252,0.9); color: #022035; }

        .rd-context {
          font-family: ui-monospace, monospace;
          font-size: 0.78rem;
          color: rgba(148,163,184,0.85);
          letter-spacing: 0.02em;
          margin-bottom: 0.4rem;
        }
        .rd-author {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-weight: 600;
          font-size: 1.08em;
          color: #f3f3fb;
        }
        .rd-lounge-link { color: var(--accent); text-decoration: none; }
        .rd-lounge-link:hover { text-decoration: underline; }
        .rd-time { color: rgba(148,163,184,0.6); }
        .rd-counts {
          display: inline-flex; gap: 0.4rem; align-items: center;
          font-family: ui-monospace, monospace;
          font-size: 0.72rem;
          color: rgba(148,163,184,0.6);
        }

        .rd-preview {
          margin: 0 0 2rem;
          background: rgba(16,17,22,0.7);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 0.7rem;
          overflow: hidden;
        }

        .rd-comments {
          padding: 1.5rem 0 0;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .rd-comments-head {
          font-family: ui-monospace, monospace;
          font-size: 0.85rem; font-weight: 800; letter-spacing: 0.14em;
          color: rgba(216,217,230,0.92);
          margin: 0 0 1rem;
        }
        .rd-comments-stub {
          padding: 1.4rem 1.2rem;
          background: rgba(94,234,212,0.04);
          border: 1px dashed rgba(94,234,212,0.25);
          border-radius: 0.55rem;
          color: rgba(148,163,184,0.85);
          font-size: 0.86rem;
          line-height: 1.55;
        }
      `}</style>
    </main>
  );
}

function PreviewSurface({ resource }: { resource: Resource }) {
  if (resource.isImage) {
    return (
      <>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={resource.attachmentUrl}
          alt={resource.title}
          className="ps-img"
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
        />
        <style jsx>{`
          .ps-img {
            display: block;
            width: 100%;
            height: auto;
            max-height: 80vh;
            object-fit: contain;
            background: #0a0a10;
            -webkit-user-drag: none;
            user-drag: none;
            user-select: none;
          }
        `}</style>
      </>
    );
  }
  // PDFs go to the reader — no inline iframe, no download URL.
  if (resource.isPdf) {
    return (
      <>
        <Link href={`/library/${resource.id}/read`} className="ps-pdf-tile">
          <div className="ps-pdf-emoji" aria-hidden="true">📖</div>
          <div className="ps-pdf-title">Open this manual in the InHero Reader</div>
          <div className="ps-pdf-sub">Read inside InHero · no download, no print</div>
          <div className="ps-pdf-cta">📖 Open in Reader →</div>
        </Link>
        <style jsx>{`
          .ps-pdf-tile {
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            gap: 0.65rem;
            padding: 4rem 1.5rem;
            text-align: center;
            background: linear-gradient(135deg, rgba(94,234,212,0.06), rgba(110,96,255,0.04));
            text-decoration: none;
            color: inherit;
            transition: background 0.18s;
          }
          .ps-pdf-tile:hover { background: linear-gradient(135deg, rgba(94,234,212,0.12), rgba(110,96,255,0.08)); }
          .ps-pdf-emoji { font-size: 3.2rem; line-height: 1; }
          .ps-pdf-title {
            font-family: 'Cormorant Garamond', serif;
            font-size: 1.25rem; font-weight: 600;
            color: #f3f3fb;
          }
          .ps-pdf-sub {
            font-family: ui-monospace, monospace;
            font-size: 0.7rem; font-weight: 600; letter-spacing: 0.08em;
            color: rgba(148,163,184,0.72);
          }
          .ps-pdf-cta {
            margin-top: 0.7rem;
            font-family: ui-monospace, monospace;
            font-size: 0.78rem; font-weight: 800; letter-spacing: 0.1em;
            color: #062320;
            background: #5eead4;
            padding: 0.55rem 1rem;
            border-radius: 0.45rem;
          }
        `}</style>
      </>
    );
  }
  // zip, docx, etc. — no inline preview yet, no download surfaced.
  return (
    <>
      <div className="ps-other">
        <div className="ps-other-emoji" aria-hidden="true">
          {DOC_GROUP_EMOJI[resource.folder]}
        </div>
        <div className="ps-other-name">{resource.fileName ?? resource.title}</div>
        <div className="ps-other-meta">
          {resource.mimeType ?? "file"} · no inline preview for this format yet
        </div>
      </div>
      <style jsx>{`
        .ps-other {
          display: flex; flex-direction: column; align-items: center;
          justify-content: center;
          gap: 0.65rem;
          padding: 4rem 1.5rem;
          text-align: center;
        }
        .ps-other-emoji { font-size: 4rem; line-height: 1; }
        .ps-other-name { font-size: 1rem; font-weight: 600; color: #f3f3fb; }
        .ps-other-meta {
          font-family: ui-monospace, monospace;
          font-size: 0.72rem;
          color: rgba(148,163,184,0.65);
        }
      `}</style>
    </>
  );
}

function DetailSkeleton() {
  return (
    <main className="sk-root">
      <div className="sk-bar" />
      <div className="sk-title" />
      <div className="sk-meta" />
      <div className="sk-preview" />
      <style jsx>{`
        .sk-root {
          max-width: 1100px;
          margin: 0 auto;
          padding: 2rem 1.5rem;
        }
        .sk-bar, .sk-title, .sk-meta, .sk-preview {
          background: linear-gradient(110deg, rgba(255,255,255,0.04) 30%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 70%);
          background-size: 220% 100%;
          border-radius: 0.5rem;
          animation: sk-pulse 1.4s ease-in-out infinite;
          margin-bottom: 1rem;
        }
        .sk-bar { height: 32px; width: 200px; }
        .sk-title { height: 48px; width: 70%; }
        .sk-meta { height: 18px; width: 60%; }
        .sk-preview { height: 60vh; }
        @keyframes sk-pulse {
          0%   { background-position: 220% 0; }
          100% { background-position: 0 0; }
        }
      `}</style>
    </main>
  );
}

function NotFound({ message }: { message: string | null }) {
  return (
    <main className="nf-root">
      <h1>Resource not found</h1>
      <p>{message ?? "It may have been deleted, or you may not have access."}</p>
      <Link href="/library" className="nf-back">← Back to Library</Link>
      <style jsx>{`
        .nf-root {
          max-width: 540px;
          margin: 4rem auto;
          padding: 0 1.5rem;
          text-align: center;
          color: #d8d9e6;
          font-family: 'Inter', system-ui, sans-serif;
        }
        h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.8rem;
          font-weight: 600;
          color: #f3f3fb;
          margin: 0 0 0.7rem;
        }
        p {
          color: rgba(148,163,184,0.75);
          margin: 0 0 1.5rem;
          font-size: 0.92rem;
        }
        .nf-back {
          display: inline-block;
          font-family: ui-monospace, monospace;
          font-size: 0.72rem; font-weight: 700; letter-spacing: 0.14em;
          color: rgba(148,163,184,0.85);
          padding: 0.55rem 1rem;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.1);
          text-decoration: none;
        }
        .nf-back:hover { color: #5eead4; border-color: rgba(94,234,212,0.4); }
      `}</style>
    </main>
  );
}

function formatRelative(iso: string): string {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diffMs = now - then;
  const min = Math.floor(diffMs / 60_000);
  if (min < 1) return "just now";
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const d = Math.floor(hr / 24);
  if (d < 30) return `${d}d ago`;
  const mo = Math.floor(d / 30);
  return `${mo}mo ago`;
}
