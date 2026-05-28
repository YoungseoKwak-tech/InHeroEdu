"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@/lib/supabase";
import { authFetch, getClientSession } from "@/lib/client-auth";
import { REACTION_EMOJI, type ChatMessagePublic, type ChatReactionPublic } from "@/lib/chat";
import SeedDiscussions from "@/components/lounges/SeedDiscussions";
import LiveActivityHeader from "@/components/lounges/LiveActivityHeader";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import { getSeedTopics } from "@/lib/seedDiscussions";
import { buildSeededMessages, isSeededMessageId } from "@/lib/seed/loungeSeedMessages";
import {
  DOC_GROUPS,
  DOC_GROUP_EMOJI,
  DOC_GROUP_LABELS,
  DOC_GROUP_BLURBS,
  USER_UPLOADABLE_GROUPS,
  type DocGroup,
} from "@/lib/docGroups";

type Tab = "chat" | "pinned";
const POLL_MS = 8000;
// Direct-to-Supabase-Storage upload bypasses Vercel's 4.5 MB body limit.
// Cap mirrors the server (sign/route.ts) which mirrors the bucket's
// per-file ceiling on Supabase free-tier (50 MB).
const MAX_UPLOAD = 5 * 1024 * 1024 * 1024; // 5 GB — Supabase Pro per-file ceiling
const MAX_UPLOAD_LABEL = "5 GB";
const IMAGE_MIMES = new Set(["image/jpeg", "image/png", "image/gif", "image/webp", "image/heic", "image/heif"]);

interface PageProps { params: { slug: string }; }

export default function LoungePage({ params }: PageProps) {
  const { slug } = params;
  const router = useRouter();
  const supabase = createBrowserClient();

  const [tab, setTab] = useState<Tab>("chat");
  const [loungeName, setLoungeName] = useState<string>("");

  const [messages, setMessages] = useState<ChatMessagePublic[]>([]);

  const [authStatus, setAuthStatus] = useState<"loading" | "out" | "no_profile" | "ok">("loading");
  const [viewerIsAdmin, setViewerIsAdmin] = useState(false);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [replyTo, setReplyTo] = useState<ChatMessagePublic | null>(null);
  // Folder picker state. Two entry points feed the same picker:
  //   1) "+" button — pickerOpen=true, no file yet. Click a chip → opens OS
  //      file dialog with that folder pre-selected via chosenGroup.
  //   2) Paste / drag — file arrives first → pendingFile set → picker shows →
  //      click chip → upload immediately.
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [chosenGroup, setChosenGroup] = useState<DocGroup | null>(null);
  // Single page-level "now" tick. MessageRow consumes this to render relative
  // timestamps without each row running its own setInterval.
  const [nowTs, setNowTs] = useState<number>(() => Date.now());
  useEffect(() => {
    const t = window.setInterval(() => setNowTs(Date.now()), 30_000);
    return () => window.clearInterval(t);
  }, []);

  const lastSeenRef = useRef<string | null>(null);
  const feedEndRef = useRef<HTMLDivElement>(null);
  const feedScrollRef = useRef<HTMLElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const prevMessagesLenRef = useRef<number>(0);
  const [unreadCount, setUnreadCount] = useState(0);

  function isFeedAtBottom() {
    const el = feedScrollRef.current;
    if (!el) return true;
    return el.scrollHeight - el.scrollTop - el.clientHeight < 100;
  }

  function onFeedScroll() {
    if (isFeedAtBottom()) setUnreadCount(0);
  }

  function jumpToBottom() {
    feedEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    setUnreadCount(0);
  }

  // Initial fetch + auth
  useEffect(() => {
    let mounted = true;
    async function bootstrap() {
      try {
        const session = await getClientSession();
        if (!mounted) return;
        if (!session) {
          setAuthStatus("out");
          setViewerIsAdmin(false);
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
          setViewerIsAdmin(json.viewerIsAdmin === true);
          setLoungeName(json.lounge?.name ?? "");
          // Merge seeded history (display-only, never POSTed) with real DB
          // messages from the API, sorted chronologically. Seeded messages
          // are backdated up to 24h ago and feel like history the user is
          // dropping into.
          const realMessages: ChatMessagePublic[] = json.messages ?? [];
          const seededHistory = buildSeededMessages(slug);
          const merged: ChatMessagePublic[] = [...seededHistory, ...realMessages].sort(
            (a, b) => a.createdAt.localeCompare(b.createdAt)
          );
          setMessages(merged);
          // lastSeenRef tracks only the latest REAL DB message's timestamp,
          // so polling asks the API for real messages newer than that. Seed
          // messages never come through the API.
          if (realMessages.length > 0) {
            lastSeenRef.current = realMessages[realMessages.length - 1].createdAt;
          } else {
            lastSeenRef.current = new Date().toISOString();
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
        const res = await fetch(`/api/lounges/${slug}/chat/messages?after=${encodeURIComponent(lastSeenRef.current)}`, { cache: "no-store" });
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
  }, [slug]);

  useEffect(() => {
    if (tab !== "chat") return;
    const prev = prevMessagesLenRef.current;
    const grew = messages.length > prev;
    prevMessagesLenRef.current = messages.length;

    if (!grew) {
      // Initial mount or message edit — pin to bottom without animation.
      feedEndRef.current?.scrollIntoView({ block: "end" });
      setUnreadCount(0);
      return;
    }

    if (isFeedAtBottom()) {
      feedEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    } else {
      setUnreadCount((n) => n + (messages.length - prev));
    }
  }, [messages, tab]);

  async function send() {
    if (!draft.trim() || sending || authStatus !== "ok") return;
    setSending(true); setError(null);
    try {
      const res = await authFetch(`/api/lounges/${slug}/chat/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: draft.trim(), replyToId: replyTo?.id ?? null }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error ?? `HTTP ${res.status}`);
      const m = json.message as ChatMessagePublic;
      setMessages((prev) => [...prev, m]);
      lastSeenRef.current = m.createdAt;
      setDraft(""); setReplyTo(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally { setSending(false); }
  }

  async function deleteMessage(messageId: string) {
    const res = await authFetch(`/api/chat/messages/${encodeURIComponent(messageId)}`, {
      method: "DELETE",
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok || json.ok !== true) {
      throw new Error(json.error ?? `HTTP ${res.status}`);
    }
    setMessages((prev) => prev.filter((message) => message.id !== messageId));
  }

  async function uploadFile(file: File, group: DocGroup | null) {
    if (uploading || authStatus !== "ok") return;
    if (file.size > MAX_UPLOAD) {
      setError(`File too large. Max ${MAX_UPLOAD_LABEL}.`);
      return;
    }
    setUploading(true); setError(null);

    const isPdf = (file.type || "").toLowerCase() === "application/pdf";
    const isImage = (file.type || "").toLowerCase().startsWith("image/");

    // Optimistic message: append immediately so the user sees the
    // chat bubble the instant they click upload, instead of staring
    // at "Uploading…" for 5–6s while the PDF bytes move to Supabase.
    // For images we have a thumbnail right away from the local File.
    // For PDFs we patch in the rendered page-1 once the parallel
    // render finishes (~300ms typical). The optimistic message is
    // marked pending=true so it can show an "Uploading…" affordance
    // and is replaced in-place when chat/upload/finalize returns.
    const tempId = `temp-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    let imageLocalUrl: string | null = null;
    if (isImage) imageLocalUrl = URL.createObjectURL(file);
    const optimisticMeta: Record<string, unknown> = {
      fileName: file.name,
      size: file.size,
      mimeType: file.type,
      group,
      pending: true,
      // Survives id swap during finalize so the (potentially slow)
      // pdfjs render can still find this message after its
      // optimistic-id was replaced with the real chat_messages.id.
      _tempId: tempId,
    };
    if (imageLocalUrl) optimisticMeta.localThumbnailUrl = imageLocalUrl;
    const optimistic: ChatMessagePublic = {
      id: tempId,
      type: isImage ? "image" : "file",
      content: draft.trim() || null,
      createdAt: new Date().toISOString(),
      isPinned: false,
      isMine: true,
      author: null,
      replyTo: replyTo
        ? {
            id: replyTo.id,
            handle: replyTo.author?.handle ?? null,
            snippet: (replyTo.content ?? "").slice(0, 80),
          }
        : null,
      attachment: {
        url: imageLocalUrl ?? "pending",
        meta: optimisticMeta,
        resourceId: null,
      },
      links: [],
      reactions: [],
    };
    setMessages((prev) => [...prev, optimistic]);
    // Clear composer + reply so the user can start the next message
    // right away. pendingFile cleared in finally so the upload state
    // stays consistent on error.
    setDraft("");
    setReplyTo(null);

    // Layer 1: kick off page-1 thumbnail render in parallel with the
    // PDF upload. Patches the optimistic message with a local blob
    // URL as soon as the render finishes. Same blob is later shipped
    // to Supabase in the background (Step 4 below) so anyone opening
    // /library sees the cached thumbnail.
    let pdfLocalUrl: string | null = null;
    const thumbnailPromise: Promise<Blob | null> = isPdf
      ? file.arrayBuffer()
          .then((buf) => import("@/lib/pdfThumbnailRender").then((m) =>
            m.renderPdfPage1ToJpegBlob(new Uint8Array(buf))
          ))
          .then((blob) => {
            pdfLocalUrl = URL.createObjectURL(blob);
            // Patch either the still-optimistic message (id===tempId)
            // OR the real one that already replaced it. Finalize
            // preserves meta._tempId on the real message specifically
            // so this race is recoverable for slow renders.
            setMessages((prev) =>
              prev.map((m) => {
                const matchesById = m.id === tempId;
                const matchesByMeta = m.attachment?.meta?._tempId === tempId;
                if (!matchesById && !matchesByMeta) return m;
                if (!m.attachment) return m;
                return {
                  ...m,
                  attachment: {
                    ...m.attachment,
                    meta: { ...m.attachment.meta, localThumbnailUrl: pdfLocalUrl },
                  },
                };
              })
            );
            return blob;
          })
          .catch(() => null)
      : Promise.resolve(null);

    try {
      // Step 1 — sign: get a one-shot Supabase Storage upload URL.
      const signRes = await authFetch(`/api/lounges/${slug}/chat/upload/sign`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: file.name || "file",
          fileSize: file.size,
          mimeType: file.type || "application/octet-stream",
        }),
      });
      const signJson = await parseJsonTolerant(signRes);
      if (signJson?.code === "NO_PROFILE") {
        router.push(`/onboarding?next=${encodeURIComponent(`/lounges/${slug}`)}`);
        return;
      }
      if (!signRes.ok || !signJson?.path) {
        throw new Error(asString(signJson?.error) ?? `sign failed (${signRes.status})`);
      }

      // Step 2 — direct upload to Supabase (no Vercel limit on this hop).
      const { error: uploadErr } = await supabase.storage
        .from(signJson.bucket as string)
        .uploadToSignedUrl(signJson.path as string, signJson.token as string, file, {
          contentType: file.type || "application/octet-stream",
          upsert: false,
        });
      if (uploadErr) throw new Error(`upload failed: ${uploadErr.message}`);

      // Step 3 — finalize: server creates chat_messages + lounge_resources.
      const finRes = await authFetch(`/api/lounges/${slug}/chat/upload/finalize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: signJson.path,
          fileName: file.name || "file",
          fileSize: file.size,
          mimeType: file.type || "application/octet-stream",
          caption: draft.trim() || undefined,
          replyToId: replyTo?.id ?? null,
          group,
        }),
      });
      const finJson = await parseJsonTolerant(finRes);
      if (finJson?.code === "NO_PROFILE") {
        router.push(`/onboarding?next=${encodeURIComponent(`/lounges/${slug}`)}`);
        return;
      }
      if (!finRes.ok || !finJson?.ok) {
        throw new Error(asString(finJson?.error) ?? `finalize failed (${finRes.status})`);
      }
      const m = finJson.message as ChatMessagePublic;
      // Replace the optimistic message in place (matched by tempId)
      // with the real one from the server, preserving the local
      // thumbnail URL we already rendered so the chat bubble doesn't
      // briefly lose its image. The pending flag falls away because
      // the server-side meta doesn't include it.
      setMessages((prev) =>
        prev.map((existing) => {
          if (existing.id !== tempId) return existing;
          const carriedThumb = pdfLocalUrl ?? imageLocalUrl;
          if (!m.attachment) return m;
          return {
            ...m,
            attachment: {
              ...m.attachment,
              meta: {
                ...m.attachment.meta,
                // Carry the temp id forward so a still-in-flight
                // thumbnail render can find this message after the id
                // swap.
                _tempId: tempId,
                ...(carriedThumb ? { localThumbnailUrl: carriedThumb } : {}),
              },
            },
          };
        })
      );
      lastSeenRef.current = m.createdAt;

      // Step 4 (background, non-blocking) — once we have a resourceId
      // and the thumbnail blob, ship it to /preview/sign + /preview/finalize.
      // Errors are swallowed because the library-card backfill path
      // will re-attempt next time the card is viewed if this fails.
      const resourceId = m.attachment?.resourceId;
      if (isPdf && resourceId) {
        void thumbnailPromise.then(async (blob) => {
          if (!blob) return;
          const mod = await import("@/lib/clientThumbnailUpload");
          await mod.uploadThumbnailForResource(resourceId, blob);
        }).catch(() => undefined);
      }
    } catch (err) {
      // Remove the optimistic message + revoke any local blob URLs
      // we attached so the browser can reclaim the memory.
      setMessages((prev) => prev.filter((existing) => existing.id !== tempId));
      if (imageLocalUrl) URL.revokeObjectURL(imageLocalUrl);
      if (pdfLocalUrl) URL.revokeObjectURL(pdfLocalUrl);
      setError(err instanceof Error ? err.message : String(err));
    } finally { setUploading(false); setPendingFile(null); }
  }

  async function parseJsonTolerant(res: Response): Promise<Record<string, unknown> | null> {
    const raw = await res.text();
    if (!raw) return null;
    try { return JSON.parse(raw) as Record<string, unknown>; } catch { return null; }
  }

  function asString(v: unknown): string | undefined {
    return typeof v === "string" ? v : undefined;
  }

  // File pickers stage the file; the user picks a folder before the upload fires.
  function stageFile(file: File | null | undefined) {
    if (!file) return;
    if (file.size > MAX_UPLOAD) {
      setError(`File too large. Max ${MAX_UPLOAD_LABEL}.`);
      return;
    }
    setError(null);
    setPendingFile(file);
  }

  // "+" button: open the folder picker. Don't open the OS file dialog yet —
  // that happens after the user picks a folder.
  function openAttachPicker() {
    if (authStatus !== "ok" || uploading) return;
    setError(null);
    setPickerOpen(true);
  }

  function cancelAttachPicker() {
    setPickerOpen(false);
    setPendingFile(null);
    setChosenGroup(null);
  }

  // User clicked a folder chip (or "skip"). Two paths:
  //   - file already in hand (paste/drag) → upload now
  //   - no file yet → remember group, open OS file dialog
  function chooseGroup(g: DocGroup | null) {
    if (pendingFile) {
      void uploadFile(pendingFile, g);
      return;
    }
    setChosenGroup(g);
    setPickerOpen(false);
    fileInputRef.current?.click();
  }

  function onFilePick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (e.target) e.target.value = ""; // reset so same file can be picked again
    if (!file) return;
    if (chosenGroup !== null || pickerOpen) {
      // "+" flow — group was picked before the OS dialog opened.
      const g = chosenGroup;
      setChosenGroup(null);
      setPickerOpen(false);
      if (file.size > MAX_UPLOAD) {
        setError(`File too large. Max ${MAX_UPLOAD_LABEL}.`);
        return;
      }
      void uploadFile(file, g);
      return;
    }
    // Fallback: stage and show picker (e.g. picker bypassed somehow).
    stageFile(file);
  }

  function onPaste(e: React.ClipboardEvent<HTMLInputElement>) {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      if (it.kind === "file") {
        const file = it.getAsFile();
        if (file) { e.preventDefault(); stageFile(file); return; }
      }
    }
  }

  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    stageFile(e.dataTransfer?.files?.[0]);
  }
  function onDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
  }

  async function toggleReaction(messageId: string, emoji: string) {
    try {
      const res = await authFetch(`/api/chat/messages/${messageId}/reactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emoji }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error ?? `HTTP ${res.status}`);
      setMessages((prev) => prev.map((m) => (
        m.id === messageId ? { ...m, reactions: json.reactions as ChatReactionPublic[] } : m
      )));
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    }
  }

  const pinnedMessages = messages.filter((m) => m.isPinned);
  const seedTopics = getSeedTopics(slug);

  return (
    <main className="lc-root" onDragOver={onDragOver} onDrop={onDrop}>
      <header className="lc-head">
        <div className="lc-head-row">
          <Link href="/lounges" className="lc-back">← All lounges</Link>
          <Link href={`/lounges/${slug}/forum`} className="lc-back lc-back-quiet">Forum view</Link>
        </div>
        <div className="lc-title-row">
          <span className="lc-glyph">◈</span>
          <div className="lc-title-block">
            <h1 className="lc-title">{loungeName || slug}</h1>
            <LiveActivityHeader slug={slug} />
          </div>
        </div>
        <div className="lc-tabs">
          {(["chat", "pinned"] as const).map((t) => (
            <button key={t} className={`lc-tab ${tab === t ? "is-active" : ""}`} onClick={() => setTab(t)}>
              {t === "chat" && "Chat"}
              {t === "pinned" && (
                <>Pinned {pinnedMessages.length > 0 && <span className="lc-tab-num">{pinnedMessages.length}</span>}</>
              )}
            </button>
          ))}
        </div>
      </header>

      {tab === "chat" && (
        <div className={`lc-body ${seedTopics.length > 0 ? "has-seed" : ""}`}>
          {seedTopics.length > 0 && (
            <aside className="lc-seed-pane">
              <SeedDiscussions topics={seedTopics} loungeName={loungeName} />
            </aside>
          )}
          <div className="lc-chat-pane">
            <section className="lc-feed" ref={feedScrollRef} onScroll={onFeedScroll}>
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
                return (
                  <MessageRow
                    key={m.id}
                    m={m}
                    grouped={sameAuthor}
                    nowTs={nowTs}
                    canReact={authStatus === "ok"}
                    canDelete={(m.isMine || viewerIsAdmin) && !isSeededMessageId(m.id)}
                    onReply={() => setReplyTo(m)}
                    onReact={(emoji) => void toggleReaction(m.id, emoji)}
                    onDelete={() => deleteMessage(m.id)}
                  />
                );
              })
            )}
            <div ref={feedEndRef} />
          </section>

          <footer className="lc-compose">
            {(pickerOpen || pendingFile) && (
              <div className="lc-group-picker" role="dialog" aria-label="Pick a folder for your upload">
                <div className="lc-group-head">
                  <div className="lc-group-file">
                    <span aria-hidden="true">{pendingFile ? "📎" : "📁"}</span>
                    <div>
                      <div className="lc-group-file-name">
                        {pendingFile ? pendingFile.name : "Add a file"}
                      </div>
                      <div className="lc-group-file-meta">
                        {pendingFile
                          ? `${Math.round(pendingFile.size / 1024)} KB · pick a folder to upload`
                          : "Pick a folder, then choose a file"}
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="lc-group-cancel"
                    onClick={cancelAttachPicker}
                    aria-label="Cancel attachment"
                  >
                    ✕
                  </button>
                </div>
                <div className="lc-group-grid">
                  {USER_UPLOADABLE_GROUPS.map((g) => (
                    <button
                      key={g}
                      type="button"
                      className="lc-group-chip"
                      onClick={() => chooseGroup(g)}
                      disabled={uploading}
                    >
                      <span className="lc-group-chip-emoji" aria-hidden="true">{DOC_GROUP_EMOJI[g]}</span>
                      <span className="lc-group-chip-label">{DOC_GROUP_LABELS[g]}</span>
                      <span className="lc-group-chip-blurb">{DOC_GROUP_BLURBS[g]}</span>
                    </button>
                  ))}
                </div>
                <div className="lc-group-note">
                  <span aria-hidden="true">💎</span>
                  <span>This Week is admin-curated. Free for all users.</span>
                </div>
                <button
                  type="button"
                  className="lc-group-skip"
                  onClick={() => chooseGroup(null)}
                  disabled={uploading}
                >
                  {uploading
                    ? "Uploading…"
                    : pendingFile
                      ? "Skip — upload without a folder"
                      : "Skip — choose a file without a folder"}
                </button>
              </div>
            )}
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
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,application/pdf,application/zip,text/plain"
                  style={{ display: "none" }}
                  onChange={onFilePick}
                />
                <button
                  type="button"
                  className="lc-attach"
                  onClick={openAttachPicker}
                  disabled={uploading || sending}
                  title="Attach photo or file"
                >
                  {uploading ? "…" : "+"}
                </button>
                <input
                  className="lc-input"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); void send(); } }}
                  onPaste={onPaste}
                  placeholder={uploading ? "Uploading…" : `Message ${loungeName || slug}`}
                  maxLength={4000}
                  disabled={sending || uploading}
                />
                <button className="lc-send" onClick={() => void send()} disabled={!draft.trim() || sending || uploading}>
                  {sending ? "…" : "↑"}
                </button>
              </div>
            ) : authStatus === "no_profile" ? (
              <Link href={`/onboarding?next=${encodeURIComponent(`/lounges/${slug}`)}`} className="lc-gate lc-gate-tap">
                <span className="lc-gate-copy">
                  <strong>Claim your trajectory handle to chat or upload</strong>
                  <span className="lc-gate-sub">
                    Uploads won&apos;t publish to Library until your trajectory is claimed.
                  </span>
                </span>
                <span className="lc-gate-arrow">→</span>
              </Link>
            ) : authStatus === "out" ? (
              <button
                type="button"
                className="lc-gate lc-gate-tap"
                onClick={() => {
                  window.dispatchEvent(
                    new CustomEvent("inhero:open-auth", {
                      detail: { mode: "signup", redirectTo: `/lounges/${slug}` },
                    })
                  );
                }}
              >
                <strong>Sign up to chat in this lounge</strong>
                <span className="lc-gate-arrow">→</span>
              </button>
            ) : (
              <div className="lc-gate">Loading…</div>
            )}
            {error && <div className="lc-error">{error}</div>}
            <div className="lc-compose-hint">Paste an image from clipboard or drag a file anywhere on the page to upload.</div>
          </footer>
          {unreadCount > 0 && (
            <button type="button" className="lc-new-pill" onClick={jumpToBottom}>
              ↓ {unreadCount} new {unreadCount === 1 ? "message" : "messages"}
            </button>
          )}
          </div>
        </div>
      )}

      {tab === "pinned" && (
        <section className="lc-pinned">
          {pinnedMessages.length === 0 ? (
            <div className="lc-empty">No pinned messages yet. Admins can pin from chat.</div>
          ) : (
            pinnedMessages.map((m) => (
              <MessageRow
                key={m.id}
                m={m}
                grouped={false}
                nowTs={nowTs}
                pinned
                canReact={authStatus === "ok"}
                canDelete={(m.isMine || viewerIsAdmin) && !isSeededMessageId(m.id)}
                onReact={(emoji) => void toggleReaction(m.id, emoji)}
                onDelete={() => deleteMessage(m.id)}
              />
            ))
          )}
        </section>
      )}

      <style>{`
        .lc-root {
          --accent: #5eead4;
          display: flex; flex-direction: column;
          height: calc(100vh - 4rem);
          overflow: hidden;
          /* Full screen width — no centered cap. The chat tab splits into
             [seed pane | chat pane] when seed topics exist, and falls back
             to a centered narrow column when there's no seed content. Only
             the feed scrolls; header + input stay fixed. */
          margin: 0;
          padding: 1.25rem 1.5rem 0;
          color: #d8d9e6;
          font-family: 'Inter', 'Space Grotesk', system-ui, sans-serif;
        }
        @media (max-width: 760px) {
          .lc-root {
            height: calc(100dvh - 4rem);
            padding: 0.85rem 1rem 0;
          }
        }

        .lc-body {
          display: flex; flex-direction: column;
          flex: 1; min-height: 0;
        }
        .lc-body.has-seed {
          display: grid;
          grid-template-columns: minmax(360px, 40%) minmax(0, 1fr);
          gap: 1.5rem;
          align-items: stretch;
        }
        .lc-body:not(.has-seed) .lc-chat-pane {
          max-width: 880px; width: 100%; margin: 0 auto;
        }
        .lc-seed-pane {
          min-height: 0;
          max-height: calc(100vh - 12rem);
          overflow-y: auto;
          padding-right: 0.25rem;
        }
        .lc-chat-pane {
          display: flex; flex-direction: column;
          min-height: 0;
          position: relative;
          background: #d1d5db;
          border-radius: 0.75rem;
          padding: 0 0.9rem;
        }
        @media (max-width: 980px) {
          .lc-body.has-seed { grid-template-columns: 1fr; gap: 1rem; }
          .lc-seed-pane { max-height: none; overflow: visible; }
        }
        @media (max-width: 760px) {
          .lc-seed-pane { display: none; }
          .lc-body.has-seed { grid-template-columns: 1fr; }
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
        .lc-back-quiet { color: rgba(148,163,184,0.45); margin-left: auto; }
        .lc-title-row { display: flex; align-items: center; gap: 0.7rem; }
        .lc-title-block { display: flex; flex-direction: column; gap: 0.35rem; min-width: 0; }
        .lc-glyph { font-size: 1.7rem; color: var(--accent); text-shadow: 0 0 14px rgba(94,234,212,0.45); line-height: 1; }
        .lc-title { font-family: 'Cormorant Garamond', serif; font-size: 1.55rem; font-weight: 600; color: #f3f3fb; margin: 0; line-height: 1.1; letter-spacing: -0.005em; }
        .lc-room-meta { display: flex; align-items: center; gap: 0.4rem; font-family: ui-monospace, monospace; font-size: 0.7rem; color: rgba(148,163,184,0.7); }
        .lc-online-dot { width: 7px; height: 7px; border-radius: 50%; background: #5DCAA5; box-shadow: 0 0 8px rgba(93,202,165,0.6); }
        .lc-tabs { display: flex; gap: 0.25rem; }
        .lc-tab {
          font-family: ui-monospace, monospace;
          font-size: 0.7rem; font-weight: 700; letter-spacing: 0.16em;
          padding: 0.45rem 0.85rem;
          background: transparent; border: 0;
          color: rgba(148,163,184,0.65);
          cursor: pointer;
          border-bottom: 2px solid transparent;
          display: inline-flex; align-items: center; gap: 0.45rem;
        }
        .lc-tab:hover { color: #f3f3fb; }
        .lc-tab.is-active { color: #f3f3fb; border-bottom-color: var(--accent); }
        .lc-tab-num { font-size: 0.6rem; font-weight: 800; padding: 0.1rem 0.4rem; border-radius: 999px; background: rgba(94,234,212,0.18); color: var(--accent); }
        .lc-tab.is-active .lc-tab-num { background: var(--accent); color: #0a0a10; }

        .lc-feed { flex: 1; min-height: 0; overflow-y: auto; padding: 0.6rem 0 1rem; display: flex; flex-direction: column; gap: 0.5rem; scroll-behavior: smooth; }
        .lc-empty { padding: 2.5rem 1rem; font-family: ui-monospace, monospace; font-size: 0.85rem; color: rgba(148,163,184,0.6); text-align: center; border: 1px dashed rgba(94,234,212,0.18); border-radius: 0.6rem; }

        .lc-compose {
          flex-shrink: 0;
          padding: 0.75rem 0;
          padding-bottom: max(0.75rem, env(safe-area-inset-bottom));
          border-top: 1px solid rgba(255,255,255,0.05);
          background: inherit;
        }

        .lc-new-pill {
          position: absolute;
          right: 1rem;
          bottom: 6.5rem;
          z-index: 12;
          padding: 0.55rem 0.95rem;
          background: var(--accent);
          color: #0a0a10;
          border: 0;
          border-radius: 999px;
          font-family: ui-monospace, monospace;
          font-size: 0.76rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          cursor: pointer;
          box-shadow: 0 8px 24px rgba(94,234,212,0.32), 0 0 18px rgba(94,234,212,0.4);
          animation: lc-pill-in 0.18s ease-out;
        }
        .lc-new-pill:hover { filter: brightness(1.06); }
        @keyframes lc-pill-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .lc-input-row { display: flex; gap: 0.5rem; align-items: center; }
        .lc-attach {
          width: 2.4rem; height: 2.4rem;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(216,217,230,0.85);
          border-radius: 0.5rem;
          font-size: 1.15rem; font-weight: 600;
          cursor: pointer;
          transition: border-color 0.15s, color 0.15s, background 0.15s;
        }
        .lc-attach:hover:not(:disabled) { border-color: var(--accent); color: var(--accent); background: rgba(94,234,212,0.06); }
        .lc-attach:disabled { opacity: 0.5; cursor: default; }
        .lc-input {
          flex: 1;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 0.55rem;
          padding: 0.7rem 0.9rem;
          color: #f3f3fb; font-family: inherit; font-size: 0.94rem;
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

        .lc-compose-hint {
          margin-top: 0.4rem;
          font-family: ui-monospace, monospace;
          font-size: 0.62rem;
          color: rgba(148,163,184,0.45);
          letter-spacing: 0.06em;
        }

        /* Doc-folder picker: appears after a file is staged, before upload */
        .lc-group-picker {
          margin-bottom: 0.65rem;
          padding: 0.75rem 0.85rem 0.65rem;
          background: rgba(94,234,212,0.04);
          border: 1px solid rgba(94,234,212,0.3);
          border-radius: 0.6rem;
        }
        .lc-group-head {
          display: flex; align-items: flex-start; justify-content: space-between;
          gap: 0.65rem;
          margin-bottom: 0.65rem;
        }
        .lc-group-file { display: flex; align-items: center; gap: 0.55rem; min-width: 0; }
        .lc-group-file > span { font-size: 1.05rem; }
        .lc-group-file-name {
          font-family: ui-monospace, monospace;
          font-size: 0.82rem;
          color: #f3f3fb;
          font-weight: 600;
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
          max-width: 28ch;
        }
        .lc-group-file-meta {
          font-family: ui-monospace, monospace;
          font-size: 0.66rem;
          color: rgba(148,163,184,0.7);
          margin-top: 0.15rem;
        }
        .lc-group-cancel {
          background: transparent;
          border: 0;
          color: rgba(148,163,184,0.6);
          font-size: 0.85rem;
          cursor: pointer;
        }
        .lc-group-cancel:hover { color: #ff8b7e; }

        .lc-group-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.55rem;
          margin-bottom: 0.55rem;
        }
        @media (max-width: 640px) {
          .lc-group-grid { grid-template-columns: repeat(2, 1fr); gap: 0.4rem; }
        }
        .lc-group-chip {
          display: flex; flex-direction: column; align-items: flex-start;
          gap: 0.25rem;
          padding: 0.85rem 0.9rem 0.9rem;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 0.55rem;
          color: rgba(216,217,230,0.95);
          font-family: inherit;
          font-size: 0.82rem;
          font-weight: 700;
          cursor: pointer;
          text-align: left;
          min-height: 84px;
          transition: border-color 0.12s, background 0.12s, transform 0.12s;
        }
        .lc-group-chip:hover:not(:disabled) {
          border-color: rgba(94,234,212,0.5);
          background: rgba(94,234,212,0.08);
          color: #f3f3fb;
          transform: translateY(-1px);
        }
        .lc-group-chip:disabled { opacity: 0.4; cursor: default; }
        .lc-group-chip-emoji { font-size: 1.4rem; line-height: 1; }
        .lc-group-chip-label {
          font-size: 0.84rem; font-weight: 700;
          overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
          max-width: 100%;
        }
        .lc-group-chip-blurb {
          font-family: ui-monospace, monospace;
          font-size: 0.66rem;
          font-weight: 500;
          color: rgba(148,163,184,0.72);
          line-height: 1.35;
          margin-top: 0.05rem;
        }
        .lc-group-chip:hover:not(:disabled) .lc-group-chip-blurb { color: rgba(216,217,230,0.85); }
        .lc-group-note {
          display: flex; align-items: center; gap: 0.45rem;
          padding: 0.55rem 0.7rem;
          margin-bottom: 0.55rem;
          background: rgba(244,201,93,0.06);
          border: 1px solid rgba(244,201,93,0.25);
          border-radius: 0.4rem;
          font-family: ui-monospace, monospace;
          font-size: 0.7rem;
          letter-spacing: 0.04em;
          color: rgba(244,201,93,0.92);
        }
        .lc-group-note > span:first-child { font-size: 0.95rem; }

        .lc-group-skip {
          width: 100%;
          padding: 0.45rem;
          background: transparent;
          border: 1px dashed rgba(148,163,184,0.3);
          border-radius: 0.4rem;
          color: rgba(148,163,184,0.75);
          font-family: ui-monospace, monospace;
          font-size: 0.68rem; font-weight: 700;
          letter-spacing: 0.12em;
          cursor: pointer;
          text-transform: uppercase;
        }
        .lc-group-skip:hover:not(:disabled) {
          border-color: rgba(148,163,184,0.5);
          color: #d8d9e6;
        }
        .lc-group-skip:disabled { opacity: 0.5; cursor: default; }

        .lc-reply-strip { display: flex; align-items: stretch; gap: 0.5rem; padding: 0.5rem 0.7rem; margin-bottom: 0.5rem; background: rgba(94,234,212,0.06); border: 1px solid rgba(94,234,212,0.25); border-radius: 0.45rem; }
        .lc-reply-bar { width: 2px; background: var(--accent); border-radius: 1px; }
        .lc-reply-text { flex: 1; min-width: 0; }
        .lc-reply-handle { font-family: ui-monospace, monospace; font-size: 0.66rem; color: var(--accent); letter-spacing: 0.08em; }
        .lc-reply-handle em { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 1.1em; font-weight: 600; }
        .lc-reply-snippet { font-size: 0.78rem; color: rgba(216,217,230,0.7); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .lc-reply-cancel { background: transparent; border: 0; cursor: pointer; color: rgba(148,163,184,0.6); font-size: 0.85rem; }
        .lc-reply-cancel:hover { color: #ff8b7e; }

        .lc-gate { padding: 0.85rem 1rem; background: rgba(244,201,93,0.06); border: 1px solid rgba(244,201,93,0.28); border-radius: 0.5rem; color: #F4C95D; font-size: 0.84rem; display: flex; flex-direction: column; gap: 0.5rem; }
        .lc-gate-tap {
          display: flex; flex-direction: row; align-items: center; justify-content: space-between;
          gap: 0.75rem;
          width: 100%;
          min-height: 56px;
          padding: 16px 18px;
          font-size: 16px;
          font-family: inherit;
          text-align: left;
          text-decoration: none;
          cursor: pointer;
          background: linear-gradient(135deg, rgba(244,201,93,0.16), rgba(244,201,93,0.06));
          border: 1px solid rgba(244,201,93,0.45);
          color: #F4C95D;
          transition: background 0.15s, border-color 0.15s, transform 0.1s;
        }
        .lc-gate-tap:hover, .lc-gate-tap:active {
          background: linear-gradient(135deg, rgba(244,201,93,0.24), rgba(244,201,93,0.1));
          border-color: rgba(244,201,93,0.7);
        }
        .lc-gate-tap:active { transform: scale(0.99); }
        .lc-gate-copy { display: flex; flex-direction: column; gap: 0.2rem; min-width: 0; }
        .lc-gate-tap strong { font-weight: 700; }
        .lc-gate-sub { font-size: 0.76rem; line-height: 1.4; color: rgba(216,217,230,0.82); }
        .lc-gate-arrow { font-size: 1.1rem; font-weight: 800; flex-shrink: 0; }
        .lc-gate-cta { align-self: flex-start; padding: 0.4rem 0.7rem; background: #F4C95D; color: #0a0a10; border-radius: 0.35rem; font-family: ui-monospace, monospace; font-size: 0.66rem; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase; text-decoration: none; }
        .lc-error { margin-top: 0.5rem; padding: 0.5rem 0.7rem; background: rgba(255,107,91,0.08); border: 1px solid rgba(255,107,91,0.3); border-radius: 0.4rem; color: #ff8b7e; font-family: ui-monospace, monospace; font-size: 0.76rem; }

        .lc-library { padding: 0.5rem 0 1.5rem; display: flex; flex-direction: column; gap: 1.8rem; }
        .lc-lib-section { display: flex; flex-direction: column; gap: 0.7rem; }
        .lc-lib-title { font-family: ui-monospace, monospace; font-size: 0.62rem; font-weight: 700; letter-spacing: 0.24em; color: rgba(148,163,184,0.7); margin: 0; padding-bottom: 0.45rem; border-bottom: 1px solid rgba(255,255,255,0.05); }
        .lc-lib-photos { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 0.45rem; }
        .lc-lib-photo { display: block; aspect-ratio: 1; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 0.5rem; overflow: hidden; transition: border-color 0.15s, transform 0.15s; }
        .lc-lib-photo:hover { border-color: var(--accent); transform: scale(1.02); }
        .lc-lib-photo img { width: 100%; height: 100%; object-fit: cover; display: block; }

        .lc-lib-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.45rem; }
        .lc-lib-file a, .lc-lib-link a {
          display: flex; flex-direction: column; gap: 0.2rem;
          padding: 0.6rem 0.85rem;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 0.45rem;
          text-decoration: none; color: inherit;
        }
        .lc-lib-file a:hover, .lc-lib-link a:hover { border-color: var(--accent); background: rgba(94,234,212,0.04); }
        .lc-lib-file-name { font-family: ui-monospace, monospace; font-size: 0.88rem; color: #f3f3fb; font-weight: 600; }
        .lc-lib-file-meta, .lc-lib-link-meta { font-family: ui-monospace, monospace; font-size: 0.66rem; color: rgba(148,163,184,0.6); }
        .lc-lib-file-meta em, .lc-lib-link-meta em { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 1.05em; color: var(--accent); font-weight: 600; }
        .lc-lib-link-host { font-family: ui-monospace, monospace; font-size: 0.78rem; color: var(--accent); font-weight: 700; }
        .lc-lib-link-snippet { font-size: 0.82rem; color: rgba(216,217,230,0.78); line-height: 1.45; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

        .lc-pinned { padding: 0.5rem 0 1.5rem; display: flex; flex-direction: column; gap: 0.55rem; }
      `}</style>
    </main>
  );
}

function formatRelativeTime(isoTs: string, nowMs: number): string {
  const t = new Date(isoTs).getTime();
  if (Number.isNaN(t)) return "";
  const diff = Math.max(0, nowMs - t);
  if (diff < 30_000) return "just now";
  if (diff < 60 * 60_000) return `${Math.floor(diff / 60_000)}m`;
  if (diff < 24 * 60 * 60_000) return `${Math.floor(diff / (60 * 60_000))}h`;
  const day = new Date(t).toDateString();
  const yesterday = new Date(nowMs - 24 * 60 * 60_000).toDateString();
  if (day === yesterday) return "Yesterday";
  return new Date(t).toLocaleDateString([], { month: "short", day: "numeric" });
}

function MessageRow({
  m, grouped, pinned, canReact, canDelete, onReply, onReact, onDelete, nowTs,
}: {
  m: ChatMessagePublic;
  grouped: boolean;
  nowTs: number;
  pinned?: boolean;
  canReact?: boolean;
  canDelete?: boolean;
  onReply?: () => void;
  onReact?: (emoji: string) => void;
  onDelete?: () => void | Promise<void>;
}) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const isMe = m.isMine;
  const author = m.author;
  const time = formatRelativeTime(m.createdAt, nowTs);
  const fileName = (m.attachment?.meta?.fileName as string | undefined) ?? null;
  const fileSize = (m.attachment?.meta?.size as number | undefined) ?? null;
  const rawGroup = m.attachment?.meta?.group as string | undefined;
  const groupKey: DocGroup | null = rawGroup && (DOC_GROUPS as readonly string[]).includes(rawGroup) ? (rawGroup as DocGroup) : null;

  async function confirmDelete() {
    if (!onDelete || deleting) return;
    setDeleting(true);
    setDeleteError(null);
    try {
      await onDelete();
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : String(err));
      setDeleting(false);
      setConfirmDeleteOpen(false);
    }
  }

  return (
    <div className={`mr ${isMe ? "is-me" : ""} ${grouped ? "is-grouped" : ""} ${pinned ? "is-pinned" : ""}`}>
      {!isMe && (grouped ? <span className="mr-spacer" /> : (
        <span
          className="mr-avatar"
          style={{ ["--accent" as string]: author?.mentor ? "#F4C95D" : "#5eead4" }}
        >
          {(author?.handle ?? "?").slice(0, 1).toUpperCase()}
        </span>
      ))}
      <div className="mr-col">
        {!grouped && (
          <div className="mr-byline">
            <span className={`mr-name ${author?.mentor ? "is-mentor" : ""}`}>{author?.handle ?? "—"}</span>
            <span className="mr-time-sep" aria-hidden="true">·</span>
            <span className="mr-time" title={new Date(m.createdAt).toLocaleString()}>{time}</span>
            {author?.mentor && (
              <span className="mr-mentor">★ MENTOR · {author.mentor.universityRole.toUpperCase()}</span>
            )}
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

        <div className="mr-bubble-wrap">
          {m.type === "image" && m.attachment ? (
            (() => {
              const readerHref = m.attachment.resourceId
                ? `/library/${m.attachment.resourceId}/read`
                : null;
              const imageBody = (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={m.attachment.url} alt={m.content ?? "image"} loading="lazy" />
                  {groupKey && (
                    <div className="mr-group-chip">
                      <span aria-hidden="true">{DOC_GROUP_EMOJI[groupKey]}</span>
                      <span>{DOC_GROUP_LABELS[groupKey]}</span>
                    </div>
                  )}
                  {m.content && <div className="mr-image-caption">{m.content}</div>}
                </>
              );
              return readerHref ? (
                <Link href={readerHref} className="mr-image">{imageBody}</Link>
              ) : (
                // Legacy fallback: pre-backfill attachments with no lounge_resource
                // row still link to the raw URL. After the 20260517 migration
                // runs on every env this path should never fire.
                <a href={m.attachment.url} target="_blank" rel="noopener noreferrer" className="mr-image">{imageBody}</a>
              );
            })()
          ) : m.type === "file" && m.attachment ? (
            (() => {
              const readerHref = m.attachment.resourceId
                ? `/library/${m.attachment.resourceId}/read`
                : null;
              const localThumb = m.attachment.meta?.localThumbnailUrl as string | undefined;
              const isPending = m.attachment.meta?.pending === true;
              const fileBody = (
                <>
                  {localThumb ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img className="mr-file-thumb" src={localThumb} alt="" draggable={false} />
                  ) : (
                    <span className="mr-file-icon">📄</span>
                  )}
                  <div className="mr-file-body">
                    <div className="mr-file-name">{fileName ?? "file"}</div>
                    <div className="mr-file-meta">
                      {fileSize ? `${Math.round(fileSize / 1024)} KB · ` : ""}
                      {isPending ? "Uploading…" : readerHref ? "Open in Reader →" : "Tap to open ↗"}
                    </div>
                    {groupKey && (
                      <div className="mr-group-chip is-inline">
                        <span aria-hidden="true">{DOC_GROUP_EMOJI[groupKey]}</span>
                        <span>{DOC_GROUP_LABELS[groupKey]}</span>
                      </div>
                    )}
                    {m.content && <div className="mr-file-caption">{m.content}</div>}
                  </div>
                </>
              );
              if (isPending) {
                return <div className={`mr-file is-pending ${isMe ? "is-me" : ""}`}>{fileBody}</div>;
              }
              return readerHref ? (
                <Link href={readerHref} className={`mr-file ${isMe ? "is-me" : ""}`}>{fileBody}</Link>
              ) : (
                <a href={m.attachment.url} target="_blank" rel="noopener noreferrer" className={`mr-file ${isMe ? "is-me" : ""}`}>{fileBody}</a>
              );
            })()
          ) : (
            <div className={`mr-bubble ${isMe ? "is-me" : ""}`} onDoubleClick={onReply}>
              {m.content}
            </div>
          )}

          {((canReact && onReact) || canDelete) && (
            <div className={`mr-react-wrap ${isMe ? "is-me" : ""}`}>
              {canDelete && (
                <button
                  type="button"
                  className="mr-delete-trigger"
                  onClick={() => setConfirmDeleteOpen(true)}
                  title="Delete message"
                  aria-label="Delete message"
                >
                  x
                </button>
              )}
              {canReact && onReact && (
                <>
                  <button
                    type="button"
                    className="mr-react-trigger"
                    onClick={() => setPickerOpen((v) => !v)}
                    title="Add reaction"
                    aria-label="Add reaction"
                  >
                    ☺
                  </button>
                  {pickerOpen && (
                    <div className={`mr-react-picker ${isMe ? "is-me" : ""}`} role="menu">
                      {REACTION_EMOJI.map((e) => (
                        <button
                          key={e}
                          type="button"
                          onClick={() => { onReact(e); setPickerOpen(false); }}
                          className="mr-react-option"
                        >
                          {e}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>

        {m.reactions.length > 0 && (
          <div className={`mr-reactions ${isMe ? "is-me" : ""}`}>
            {m.reactions.map((r) => (
              <button
                key={r.emoji}
                type="button"
                onClick={() => onReact?.(r.emoji)}
                className={`mr-reaction ${r.mine ? "is-mine" : ""}`}
                disabled={!canReact}
                title={r.mine ? "Remove your reaction" : "React with this emoji"}
              >
                <span className="mr-reaction-emoji">{r.emoji}</span>
                <span className="mr-reaction-count">{r.count}</span>
              </button>
            ))}
          </div>
        )}
        {deleteError && <div className={`mr-error ${isMe ? "is-me" : ""}`}>{deleteError}</div>}
      </div>

      <ConfirmDialog
        open={confirmDeleteOpen}
        title={m.attachment ? "Delete this attachment?" : "Delete this message?"}
        message={
          m.attachment
            ? "This removes the chat message and hides the linked library resource."
            : "This removes the chat message for everyone in the lounge."
        }
        confirmLabel="Delete"
        loading={deleting}
        destructive
        onConfirm={confirmDelete}
        onCancel={() => {
          if (!deleting) setConfirmDeleteOpen(false);
        }}
      />

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
          font-style: italic; font-weight: 700; font-size: 0.9rem;
          flex-shrink: 0;
        }
        .mr-spacer { width: 2rem; flex-shrink: 0; }

        .mr-col { display: flex; flex-direction: column; gap: 0.2rem; max-width: 68%; min-width: 0; }
        .mr.is-me .mr-col { align-items: flex-end; }

        .mr-byline { display: flex; align-items: baseline; gap: 0.4rem; flex-wrap: wrap; }
        .mr-name { font-family: 'Cormorant Garamond', serif; font-style: italic; font-weight: 600; color: #f3f3fb; font-size: 0.92rem; }
        .mr-name.is-mentor { color: #F4C95D; }
        .mr-mentor { font-family: ui-monospace, monospace; font-size: 0.52rem; font-weight: 800; letter-spacing: 0.18em; color: #F4C95D; padding: 0.13rem 0.4rem; border-radius: 0.25rem; background: rgba(244,201,93,0.1); border: 1px solid rgba(244,201,93,0.4); }
        .mr-time { font-family: ui-monospace, monospace; font-size: 0.66rem; color: rgba(148,163,184,0.65); cursor: default; }
        .mr-time-sep { font-family: ui-monospace, monospace; font-size: 0.7rem; color: rgba(148,163,184,0.4); }
        .mr-pin-flag { font-family: ui-monospace, monospace; font-size: 0.55rem; font-weight: 800; letter-spacing: 0.18em; color: #F4C95D; }

        .mr-reply { display: flex; gap: 0.45rem; padding: 0.35rem 0; font-size: 0.76rem; max-width: 100%; }
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
          font-size: 0.92rem; line-height: 1.5;
          white-space: pre-wrap; word-wrap: break-word; cursor: pointer;
        }
        .mr-bubble.is-me {
          background: linear-gradient(135deg, rgba(94,234,212,0.18), rgba(94,234,212,0.06));
          border-color: rgba(94,234,212,0.35);
          color: #f3f3fb;
          border-radius: 16px 16px 5px 16px;
        }

        .mr-image {
          display: block; max-width: 320px;
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.08);
          text-decoration: none; color: inherit;
        }
        .mr-image img { display: block; width: 100%; height: auto; max-height: 360px; object-fit: cover; }
        .mr-image-caption {
          padding: 0.45rem 0.65rem;
          font-size: 0.84rem; color: rgba(216,217,230,0.88);
          background: rgba(255,255,255,0.03);
          border-top: 1px solid rgba(255,255,255,0.05);
        }

        .mr-file {
          display: flex; align-items: center; gap: 0.7rem;
          padding: 0.65rem 0.85rem;
          max-width: 300px;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          background: rgba(255,255,255,0.04);
          text-decoration: none; color: inherit;
        }
        .mr-file:hover { border-color: rgba(94,234,212,0.5); background: rgba(94,234,212,0.06); }
        .mr-file.is-me { background: linear-gradient(135deg, rgba(94,234,212,0.18), rgba(94,234,212,0.06)); border-color: rgba(94,234,212,0.35); }
        .mr-file-icon { font-size: 1.4rem; }
        .mr-file-thumb {
          width: 56px;
          height: 72px;
          object-fit: cover;
          border-radius: 4px;
          background: #fff;
          flex-shrink: 0;
          box-shadow: 0 1px 4px rgba(0,0,0,0.4);
        }
        .mr-file.is-pending {
          opacity: 0.85;
          cursor: progress;
        }
        .mr-file-body { min-width: 0; flex: 1; }
        .mr-file-name { font-family: ui-monospace, monospace; font-size: 0.82rem; font-weight: 700; color: #f3f3fb; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .mr-file-meta { font-family: ui-monospace, monospace; font-size: 0.66rem; color: rgba(148,163,184,0.6); margin-top: 0.15rem; }
        .mr-file-caption { font-size: 0.8rem; color: rgba(216,217,230,0.85); margin-top: 0.25rem; line-height: 1.4; }

        .mr-group-chip {
          display: inline-flex; align-items: center; gap: 0.32rem;
          margin: 0.4rem 0.65rem;
          padding: 0.2rem 0.5rem;
          background: rgba(94,234,212,0.1);
          border: 1px solid rgba(94,234,212,0.4);
          border-radius: 0.3rem;
          font-family: ui-monospace, monospace;
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: #5eead4;
          text-transform: uppercase;
          line-height: 1.2;
        }
        .mr-group-chip.is-inline { margin: 0.3rem 0 0; }
        .mr-group-chip > span:first-child { font-size: 0.85em; }

        .mr-bubble-wrap {
          position: relative;
          display: inline-flex;
        }
        .mr-react-wrap {
          position: absolute;
          top: -10px;
          right: -32px;
          display: flex;
          align-items: center;
          gap: 0.25rem;
          opacity: 0;
          transition: opacity 0.15s;
        }
        .mr.is-me .mr-react-wrap, .mr-react-wrap.is-me { right: auto; left: -32px; }
        .mr:hover .mr-react-wrap { opacity: 1; }
        .mr-react-trigger,
        .mr-delete-trigger {
          width: 26px; height: 26px;
          border-radius: 50%;
          background: rgba(8,10,18,0.92);
          border: 1px solid rgba(255,255,255,0.12);
          color: rgba(216,217,230,0.7);
          font-size: 0.85rem;
          cursor: pointer;
          line-height: 1;
          padding: 0;
        }
        .mr-react-trigger:hover { color: #5eead4; border-color: rgba(94,234,212,0.5); }
        .mr-delete-trigger:hover {
          color: #ff6b5b;
          border-color: rgba(239,68,68,0.45);
          background: rgba(239,68,68,0.12);
        }
        .mr-react-picker {
          position: absolute;
          top: 28px;
          right: 0;
          display: flex;
          gap: 0.15rem;
          padding: 0.3rem 0.4rem;
          background: rgba(8,10,18,0.96);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(94,234,212,0.4);
          border-radius: 999px;
          box-shadow: 0 12px 30px rgba(0,0,0,0.5);
          z-index: 10;
        }
        .mr-react-picker.is-me { right: auto; left: 0; }
        .mr-react-option {
          width: 32px; height: 32px;
          padding: 0;
          background: transparent;
          border: 0;
          font-size: 1.1rem;
          cursor: pointer;
          border-radius: 50%;
          transition: background 0.15s, transform 0.15s;
        }
        .mr-react-option:hover { background: rgba(94,234,212,0.12); transform: scale(1.15); }

        .mr-reactions {
          display: flex; flex-wrap: wrap; gap: 0.25rem;
          margin-top: 0.3rem;
          padding: 0 0.1rem;
        }
        .mr-reactions.is-me { justify-content: flex-end; }
        .mr-reaction {
          display: inline-flex; align-items: center; gap: 0.22rem;
          padding: 0.16rem 0.5rem;
          border-radius: 999px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          font-family: ui-monospace, monospace;
          font-size: 0.72rem;
          color: rgba(216,217,230,0.82);
          cursor: pointer;
          transition: border-color 0.15s, background 0.15s, color 0.15s, transform 0.15s;
        }
        .mr-reaction:hover:not(:disabled) { border-color: rgba(94,234,212,0.5); transform: translateY(-1px); }
        .mr-reaction.is-mine { background: rgba(94,234,212,0.14); border-color: rgba(94,234,212,0.55); color: #5eead4; }
        .mr-reaction-emoji { font-size: 0.95em; }
        .mr-reaction-count { font-weight: 700; }
        .mr-error {
          align-self: flex-start;
          margin-top: 0.3rem;
          padding: 0.35rem 0.55rem;
          border-radius: 0.35rem;
          background: rgba(255,107,91,0.08);
          border: 1px solid rgba(255,107,91,0.25);
          color: #b9352b;
          font-family: ui-monospace, monospace;
          font-size: 0.7rem;
        }
        .mr-error.is-me {
          align-self: flex-end;
        }

        /* Light-grey chat pane: flip text/bubble/input colors to dark so
           they read against #d1d5db. Scoped to .lc-chat-pane only — the
           seed pane keeps the dark theme. */
        .lc-chat-pane { color: #1a1b22; }
        .lc-chat-pane .mr-bubble {
          background: #ffffff;
          border-color: rgba(0,0,0,0.08);
          color: #1a1b22;
        }
        .lc-chat-pane .mr-bubble.is-me {
          background: linear-gradient(135deg, rgba(94,234,212,0.55), rgba(94,234,212,0.25));
          border-color: rgba(20,160,140,0.5);
          color: #0a0a10;
        }
        .lc-chat-pane .mr-name { color: #111827; }
        .lc-chat-pane .mr-time { color: rgba(30,30,40,0.55); }
        .lc-chat-pane .mr-time-sep { color: rgba(30,30,40,0.35); }
        .lc-chat-pane .mr-reply-snippet { color: rgba(30,30,40,0.6); }
        .lc-chat-pane .mr-file {
          background: rgba(255,255,255,0.85);
          border-color: rgba(0,0,0,0.08);
        }
        .lc-chat-pane .mr-file-name { color: #111827; }
        .lc-chat-pane .mr-file-meta { color: rgba(30,30,40,0.55); }
        .lc-chat-pane .mr-file-caption { color: rgba(30,30,40,0.8); }
        .lc-chat-pane .mr-image-caption { color: rgba(30,30,40,0.85); background: rgba(255,255,255,0.9); }
        .lc-chat-pane .lc-empty {
          color: rgba(30,30,40,0.55);
          border-color: rgba(20,160,140,0.45);
        }
        .lc-chat-pane .lc-input {
          background: rgba(255,255,255,0.85);
          border-color: rgba(0,0,0,0.12);
          color: #111827;
        }
        .lc-chat-pane .lc-input::placeholder { color: rgba(30,30,40,0.45); }
        .lc-chat-pane .lc-attach {
          background: rgba(255,255,255,0.7);
          border-color: rgba(0,0,0,0.12);
          color: rgba(30,30,40,0.75);
        }
        .lc-chat-pane .lc-attach:hover:not(:disabled) {
          background: rgba(94,234,212,0.18);
          color: #0a7d6f;
        }
        .lc-chat-pane .lc-compose { border-top-color: rgba(0,0,0,0.08); }
        .lc-chat-pane .lc-compose-hint { color: rgba(30,30,40,0.5); }
        .lc-chat-pane .lc-reply-snippet { color: rgba(30,30,40,0.65); }
        .lc-chat-pane .mr-react-trigger {
          background: rgba(255,255,255,0.85);
          border-color: rgba(0,0,0,0.1);
          color: rgba(30,30,40,0.7);
        }
        .lc-chat-pane .mr-react-trigger:hover { color: #0a7d6f; border-color: rgba(20,160,140,0.5); }
        .lc-chat-pane .mr-delete-trigger {
          background: rgba(255,255,255,0.85);
          border-color: rgba(0,0,0,0.1);
          color: rgba(30,30,40,0.55);
        }
        .lc-chat-pane .mr-delete-trigger:hover {
          color: #b9352b;
          border-color: rgba(185,53,43,0.45);
          background: rgba(255,255,255,0.95);
        }
        .lc-chat-pane .mr-react-picker {
          background: #ffffff;
          border-color: rgba(0,0,0,0.1);
          box-shadow: 0 8px 20px rgba(0,0,0,0.12);
        }
        .lc-chat-pane .mr-reaction {
          background: rgba(255,255,255,0.85);
          border-color: rgba(0,0,0,0.1);
          color: rgba(30,30,40,0.85);
        }
        .lc-chat-pane .mr-reaction.is-mine { background: rgba(94,234,212,0.3); border-color: rgba(20,160,140,0.55); color: #0a7d6f; }

        /* Upload picker — also lives inside .lc-chat-pane, needs the same flip */
        .lc-chat-pane .lc-group-picker {
          background: rgba(255,255,255,0.7);
          border-color: rgba(20,160,140,0.35);
        }
        .lc-chat-pane .lc-group-file-name { color: #111827; }
        .lc-chat-pane .lc-group-file-meta { color: rgba(30,30,40,0.6); }
        .lc-chat-pane .lc-group-cancel { color: rgba(30,30,40,0.55); }
        .lc-chat-pane .lc-group-cancel:hover { color: #b9352b; }
        .lc-chat-pane .lc-group-chip {
          background: rgba(255,255,255,0.85);
          border-color: rgba(0,0,0,0.08);
          color: #111827;
        }
        .lc-chat-pane .lc-group-chip:hover:not(:disabled) {
          background: rgba(94,234,212,0.18);
          border-color: rgba(20,160,140,0.5);
          color: #0a7d6f;
        }
        .lc-chat-pane .lc-group-chip-blurb { color: rgba(30,30,40,0.6); }
        .lc-chat-pane .lc-group-chip:hover:not(:disabled) .lc-group-chip-blurb { color: rgba(30,30,40,0.85); }
        .lc-chat-pane .lc-group-skip {
          border-color: rgba(0,0,0,0.2);
          color: rgba(30,30,40,0.7);
        }
        .lc-chat-pane .lc-group-skip:hover:not(:disabled) {
          border-color: rgba(0,0,0,0.4);
          color: #111827;
        }
      `}</style>
    </div>
  );
}
