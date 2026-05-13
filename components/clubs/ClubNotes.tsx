"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@/lib/supabase";
import { authFetch } from "@/lib/client-auth";
import AuthorChip from "@/components/trajectory/AuthorChip";
import type { ClubRole, MeetingNotePublic } from "@/lib/clubs";

interface Props {
  slug: string;
  accent: string;
  initialNotes: MeetingNotePublic[];
}

const WRITER_ROLES: ClubRole[] = ["founder", "cofounder", "secretary"];

export default function ClubNotes({ slug, accent, initialNotes }: Props) {
  const [notes, setNotes] = useState<MeetingNotePublic[]>(initialNotes);
  const [myRole, setMyRole] = useState<ClubRole | null>(null);
  const [currentHandle, setCurrentHandle] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [meetingAt, setMeetingAt] = useState("");
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    async function probe() {
      try {
        const supabase = createBrowserClient();
        const { data: { session } } = await supabase.auth.getSession();
        if (!mounted || !session) return;

        const [meRes, clubRes] = await Promise.all([
          fetch("/api/profile/me", {
            headers: { Authorization: `Bearer ${session.access_token}` },
            cache: "no-store",
          }),
          fetch(`/api/clubs/${slug}`, {
            headers: { Authorization: `Bearer ${session.access_token}` },
            cache: "no-store",
          }),
        ]);
        const meJson = await meRes.json().catch(() => ({}));
        const clubJson = await clubRes.json().catch(() => ({}));
        if (!mounted) return;
        if (meJson?.profile?.handle) setCurrentHandle(meJson.profile.handle);
        if (typeof clubJson?.myRole === "string") setMyRole(clubJson.myRole as ClubRole);
      } catch {
        // ignore
      }
    }
    void probe();
    return () => { mounted = false; };
  }, [slug]);

  const canWrite = myRole != null && WRITER_ROLES.includes(myRole);

  async function submitNote() {
    if (!canWrite || posting) return;
    setPosting(true);
    setError(null);
    try {
      const res = await authFetch(`/api/clubs/${slug}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          body: body.trim(),
          meetingAt: meetingAt || null,
        }),
      });
      const json = await res.json();
      if (!res.ok || json.ok !== true) throw new Error(json.error ?? `HTTP ${res.status}`);
      setNotes((prev) => [json.note, ...prev]);
      setTitle("");
      setBody("");
      setMeetingAt("");
      setOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setPosting(false);
    }
  }

  async function deleteNote(id: string) {
    if (!window.confirm("Delete this note?")) return;
    try {
      const res = await authFetch(`/api/clubs/${slug}/notes/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setNotes((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  }

  return (
    <section className="cn-root" style={{ ["--accent" as string]: accent }}>
      <div className="cn-section-tag-row">
        <span className="cn-section-tag">MEETING NOTES</span>
        {canWrite && !open && (
          <button type="button" className="cn-add" onClick={() => setOpen(true)}>
            + Log a meeting
          </button>
        )}
      </div>

      {open && canWrite && (
        <div className="cn-composer">
          <input
            type="text"
            placeholder="Meeting title — e.g. Week 3 sync, planning session"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={140}
            className="cn-input"
          />
          <input
            type="datetime-local"
            value={meetingAt}
            onChange={(e) => setMeetingAt(e.target.value)}
            className="cn-input cn-input-time"
          />
          <textarea
            rows={6}
            placeholder="Agenda, decisions, action items. Markdown-friendly. 16,000 chars max."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            maxLength={16000}
            className="cn-input cn-textarea"
          />
          <div className="cn-composer-foot">
            <button type="button" className="cn-btn-ghost" onClick={() => setOpen(false)}>Cancel</button>
            <button
              type="button"
              disabled={
                posting ||
                title.trim().length < 3 ||
                body.trim().length < 1
              }
              onClick={() => void submitNote()}
              className="cn-btn-primary"
            >
              {posting ? "Saving…" : "Save note →"}
            </button>
          </div>
          {error && <div className="cn-error">{error}</div>}
        </div>
      )}

      {notes.length === 0 ? (
        <p className="cn-empty">
          No meetings logged yet. {canWrite && "The first one sets the rhythm for the rest of the cohort."}
        </p>
      ) : (
        <ul className="cn-list">
          {notes.map((n) => {
            const isAuthor =
              !!currentHandle && !!n.author && n.author.handle === currentHandle;
            const canDelete = isAuthor || myRole === "founder" || myRole === "cofounder";
            return (
              <li key={n.id} className="cn-item">
                <header className="cn-item-head">
                  <h3 className="cn-item-title">{n.title}</h3>
                  {canDelete && (
                    <button
                      type="button"
                      className="cn-delete"
                      onClick={() => void deleteNote(n.id)}
                      title="Delete note"
                    >
                      ✕
                    </button>
                  )}
                </header>
                <div className="cn-item-meta">
                  {n.author ? (
                    <AuthorChip
                      handle={n.author.handle}
                      graduationYear={n.author.graduationYear}
                      size="sm"
                    />
                  ) : (
                    <span className="cn-anon">— anonymous —</span>
                  )}
                  {n.meetingAt && (
                    <span className="cn-when">
                      · {new Date(n.meetingAt).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}
                    </span>
                  )}
                  <span className="cn-when">
                    · logged {new Date(n.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="cn-item-body">{n.body}</p>
              </li>
            );
          })}
        </ul>
      )}

      <style>{`
        .cn-root {
          --accent: #5eead4;
          margin-top: 1.85rem;
        }
        .cn-section-tag-row {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 0.85rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .cn-section-tag {
          font-family: ui-monospace, monospace;
          font-size: 0.6rem; font-weight: 700;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: rgba(148,163,184,0.7);
        }
        .cn-add {
          font-family: ui-monospace, monospace;
          font-size: 0.66rem; font-weight: 700;
          letter-spacing: 0.16em; text-transform: uppercase;
          padding: 0.4rem 0.65rem;
          background: transparent;
          border: 1px dashed color-mix(in srgb, var(--accent) 45%, transparent);
          border-radius: 0.4rem;
          color: var(--accent);
          cursor: pointer;
          transition: background 0.15s, border-color 0.15s;
        }
        .cn-add:hover {
          background: color-mix(in srgb, var(--accent) 8%, transparent);
          border-style: solid;
        }

        .cn-composer {
          display: flex; flex-direction: column; gap: 0.55rem;
          padding: 1rem 1.05rem 0.85rem;
          background: rgba(255,255,255,0.02);
          border: 1px solid color-mix(in srgb, var(--accent) 22%, transparent);
          border-radius: 0.7rem;
          margin-bottom: 1.1rem;
        }
        .cn-input {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 0.4rem;
          padding: 0.55rem 0.75rem;
          color: #f3f3fb;
          font-family: inherit;
          font-size: 0.9rem;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.2s;
        }
        .cn-input:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 1px var(--accent);
        }
        .cn-input-time {
          font-family: ui-monospace, monospace;
          font-size: 0.82rem;
          width: fit-content;
          color-scheme: dark;
        }
        .cn-textarea {
          resize: vertical;
          min-height: 100px;
          line-height: 1.55;
          font-family: inherit;
          white-space: pre-wrap;
        }
        .cn-composer-foot { display: flex; justify-content: space-between; gap: 0.5rem; margin-top: 0.2rem; }
        .cn-btn-primary {
          font-family: ui-monospace, monospace;
          font-size: 0.7rem; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          padding: 0.55rem 0.85rem;
          background: var(--accent); color: #0a0a10;
          border: 0; border-radius: 0.4rem;
          cursor: pointer;
        }
        .cn-btn-primary:hover:not(:disabled) { filter: brightness(1.08); }
        .cn-btn-primary:disabled { opacity: 0.4; cursor: default; }
        .cn-btn-ghost {
          font-family: ui-monospace, monospace;
          font-size: 0.7rem; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase;
          padding: 0.55rem 0.85rem;
          color: rgba(148,163,184,0.85);
          background: transparent;
          border: 1px solid rgba(148,163,184,0.2);
          border-radius: 0.4rem;
          cursor: pointer;
        }
        .cn-btn-ghost:hover { color: #fff; border-color: var(--accent); }

        .cn-error {
          padding: 0.5rem 0.7rem;
          background: rgba(255,107,91,0.08);
          border: 1px solid rgba(255,107,91,0.3);
          color: #ff8b7e;
          font-family: ui-monospace, monospace;
          font-size: 0.74rem;
          border-radius: 0.35rem;
          line-height: 1.55;
        }

        .cn-empty {
          font-size: 0.9rem;
          color: rgba(148,163,184,0.7);
          margin: 0;
          line-height: 1.6;
        }
        .cn-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.85rem; }
        .cn-item {
          padding: 0.9rem 1rem;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-left: 2px solid color-mix(in srgb, var(--accent) 55%, transparent);
          border-radius: 0 0.55rem 0.55rem 0;
        }
        .cn-item-head {
          display: flex; justify-content: space-between; align-items: flex-start;
          gap: 0.55rem;
          margin-bottom: 0.35rem;
        }
        .cn-item-title {
          margin: 0;
          font-family: 'Cormorant Garamond', 'Georgia', serif;
          font-size: 1.15rem;
          font-weight: 600;
          color: #f3f3fb;
          line-height: 1.25;
        }
        .cn-delete {
          background: none; border: 0; cursor: pointer;
          color: rgba(148,163,184,0.4);
          font-size: 0.85rem;
          padding: 0.15rem 0.35rem;
          border-radius: 4px;
          transition: color 0.15s, background 0.15s;
        }
        .cn-delete:hover { color: #ff6b5b; background: rgba(255,107,91,0.08); }

        .cn-item-meta {
          display: flex; align-items: center; gap: 0.3rem;
          flex-wrap: wrap;
          margin-bottom: 0.55rem;
        }
        .cn-when {
          font-family: ui-monospace, monospace;
          font-size: 0.7rem;
          color: rgba(148,163,184,0.65);
        }
        .cn-anon {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 0.82rem;
          color: rgba(148,163,184,0.6);
        }
        .cn-item-body {
          margin: 0;
          font-size: 0.92rem;
          color: rgba(216,217,230,0.88);
          line-height: 1.6;
          white-space: pre-wrap;
          word-break: break-word;
        }
      `}</style>
    </section>
  );
}
