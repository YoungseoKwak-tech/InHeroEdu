"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import SaveButton from "@/components/my-space/SaveButton";
import ReactionPicker from "@/components/my-space/ReactionPicker";
import CollectionPicker from "@/components/my-space/CollectionPicker";
import {
  DOC_GROUP_EMOJI,
  DOC_GROUP_LABELS,
  type DocGroup,
} from "@/lib/docGroups";

type ReactionType = "heart" | "fire" | "lightbulb" | "pin";

export interface MySpaceCardItem {
  id: string;
  title: string;
  folder: DocGroup;
  attachmentUrl: string;
  mimeType: string | null;
  isImage: boolean;
  isInheroOfficial: boolean;
  downloadCount: number;
  upvoteCount: number;
  commentCount: number;
  saveCount?: number;
  previewPage1Url: string | null;
  lounge: { slug: string; name: string } | null;
  author: { handle: string } | null;
  collectionId?: string | null;
  reactions?: ReactionType[];
  reason?: string;
}

interface Props {
  item: MySpaceCardItem;
  variant: "saved" | "liked" | "recommended";
  /** Called after a successful remove (unsave or hide). */
  onRemoved?: (id: string) => void;
  /** Called after a move; lets the parent re-bucket the chip. */
  onMoved?: (id: string, collectionId: string | null) => void;
}

/**
 * MySpaceCard — shared resource tile for /my-space tabs. Matches the
 * library FeedCard visually (same preview frame, badges, foot layout)
 * but drops the owner ⋯ menu and instead exposes per-card affordances
 * specific to My Space: "Move to collection", "Remove from My Space".
 */
export default function MySpaceCard({ item, variant, onRemoved, onMoved }: Props) {
  const readerHref = `/library/${item.id}/read`;
  const detailHref = `/library/${item.id}`;
  const loungeHref = item.lounge ? `/lounges/${item.lounge.slug}` : null;
  const [pickerOpen, setPickerOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onDoc = () => setMenuOpen(false);
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [menuOpen]);

  if (removed) return null;

  return (
    <div className={`mc ${item.isInheroOfficial ? "is-official" : ""}`}>
      {/* Top-right affordances row: SaveButton (acts as remove on
          Saved/Liked when toggled off) + ⋯ menu for Saved tab. */}
      <div className="mc-affordances" onMouseDown={(e) => e.stopPropagation()}>
        <SaveButton
          resourceId={item.id}
          initialSaved={variant === "saved"}
          onChange={(saved) => {
            if (!saved) {
              setRemoved(true);
              onRemoved?.(item.id);
            }
          }}
        />
        {variant === "saved" && (
          <div className="mc-menu">
            <button
              type="button"
              className="mc-menu-trigger"
              aria-label="Card options"
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen((v) => !v);
              }}
            >
              ⋯
            </button>
            {menuOpen && (
              <div className="mc-menu-dropdown" onMouseDown={(e) => e.stopPropagation()}>
                <button
                  type="button"
                  className="mc-menu-item"
                  onClick={(e) => {
                    e.stopPropagation();
                    setMenuOpen(false);
                    setPickerOpen(true);
                  }}
                >
                  ▸ Move to collection
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mc-preview-wrap">
        <Link href={readerHref} className="mc-preview-link" aria-label={`Open ${item.title}`}>
          <div className="mc-preview">
            {item.isImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.attachmentUrl} alt={item.title} loading="lazy" draggable={false} />
            ) : item.previewPage1Url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.previewPage1Url}
                alt={`${item.title} — preview`}
                loading="lazy"
                draggable={false}
              />
            ) : (
              <div className="mc-placeholder">
                <span className="mc-placeholder-emoji" aria-hidden="true">
                  {DOC_GROUP_EMOJI[item.folder]}
                </span>
                <span className="mc-placeholder-mime">
                  {item.mimeType?.split("/").pop()?.toUpperCase() ?? "FILE"}
                </span>
              </div>
            )}
            <div className="mc-badges">
              {item.isInheroOfficial && (
                <span className="mc-badge mc-badge-official">⭐ INHERO ORIGINAL</span>
              )}
              {!item.isInheroOfficial && (
                <span className="mc-badge mc-badge-community">✦ ORIGINAL</span>
              )}
            </div>
          </div>
        </Link>
        <div className="mc-reactions">
          <ReactionPicker resourceId={item.id} initialReactions={item.reactions ?? []} />
        </div>
      </div>

      <div className="mc-body">
        {item.reason && <div className="mc-reason">{item.reason}</div>}
        <Link href={readerHref} className="mc-title-link">
          <div className="mc-title">{item.title}</div>
        </Link>

        <div className="mc-meta">
          <span aria-hidden="true">{DOC_GROUP_EMOJI[item.folder]}</span>{" "}
          {DOC_GROUP_LABELS[item.folder]}
          {item.lounge && loungeHref && (
            <>
              {" · "}
              <Link href={loungeHref} className="mc-lounge-link">
                {item.lounge.name}
              </Link>
            </>
          )}
        </div>

        <div className="mc-foot">
          {item.author && <span className="mc-author">by <em>{item.author.handle}</em></span>}
          <span className="mc-counts">
            <span title="Downloads">{item.downloadCount} ↓</span>
            <span title="Upvotes">{item.upvoteCount} ▲</span>
            <Link href={`${detailHref}#comments`} className="mc-comments-link">
              {item.commentCount} 💬
            </Link>
          </span>
        </div>
      </div>

      {pickerOpen && (
        <CollectionPicker
          resourceId={item.id}
          currentCollectionId={item.collectionId ?? null}
          onClose={() => setPickerOpen(false)}
          onMoved={(cid) => onMoved?.(item.id, cid)}
        />
      )}

      <style jsx>{`
        .mc {
          display: block;
          break-inside: avoid;
          margin-bottom: 1rem;
          background: rgba(16, 17, 22, 0.7);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 0.7rem;
          overflow: hidden;
          position: relative;
          transition: transform 0.18s, border-color 0.18s, box-shadow 0.18s;
        }
        .mc:hover {
          transform: translateY(-2px);
          border-color: rgba(94, 234, 212, 0.4);
          box-shadow: 0 10px 32px rgba(0, 0, 0, 0.4), 0 0 18px rgba(94, 234, 212, 0.12);
        }
        .mc.is-official:hover {
          border-color: rgba(244, 201, 93, 0.5);
          box-shadow: 0 10px 32px rgba(0, 0, 0, 0.4), 0 0 18px rgba(244, 201, 93, 0.18);
        }

        .mc-affordances {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          z-index: 5;
          display: inline-flex;
          align-items: center;
          gap: 0.32rem;
          opacity: 0;
          transform: translateY(-2px);
          transition: opacity 0.18s ease, transform 0.18s ease;
        }
        .mc:hover .mc-affordances,
        .mc-affordances:focus-within {
          opacity: 1;
          transform: translateY(0);
        }
        @media (hover: none) {
          .mc-affordances { opacity: 1; transform: none; }
        }
        .mc-menu { position: relative; }
        .mc-menu-trigger {
          width: 32px;
          height: 32px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          color: rgba(255, 255, 255, 0.92);
          font-size: 16px;
          line-height: 1;
          cursor: pointer;
          backdrop-filter: blur(8px);
        }
        .mc-menu-trigger:hover { background: rgba(0, 0, 0, 0.85); }
        .mc-menu-dropdown {
          position: absolute;
          top: 36px;
          right: 0;
          min-width: 170px;
          padding: 4px;
          background: rgba(10, 6, 18, 0.96);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          backdrop-filter: blur(16px);
          box-shadow: 0 10px 32px rgba(0, 0, 0, 0.5);
        }
        .mc-menu-item {
          display: block;
          width: 100%;
          padding: 8px 12px;
          background: none;
          border: 0;
          border-radius: 4px;
          color: rgba(255, 255, 255, 0.88);
          text-align: left;
          font-family: inherit;
          font-size: 0.82rem;
          cursor: pointer;
        }
        .mc-menu-item:hover { background: rgba(94, 234, 212, 0.12); color: #5eead4; }

        .mc-preview-wrap { position: relative; }
        .mc-preview-link { display: block; color: inherit; text-decoration: none; }
        .mc-preview {
          position: relative;
          background: linear-gradient(135deg, rgba(94, 234, 212, 0.06), rgba(110, 96, 255, 0.04));
        }
        .mc-preview img { display: block; width: 100%; height: auto; }
        .mc-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.55rem;
          padding: 2.5rem 1rem;
          aspect-ratio: 3 / 4;
        }
        .mc-placeholder-emoji { font-size: 3.2rem; line-height: 1; }
        .mc-placeholder-mime {
          font-family: ui-monospace, monospace;
          font-size: 0.62rem;
          font-weight: 800;
          letter-spacing: 0.16em;
          color: rgba(148, 163, 184, 0.6);
        }
        .mc-badges {
          position: absolute;
          top: 0.5rem;
          left: 0.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
          pointer-events: none;
        }
        .mc-badge {
          display: inline-flex;
          align-items: center;
          font-family: ui-monospace, monospace;
          font-size: 0.58rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          padding: 0.22rem 0.45rem;
          border-radius: 0.3rem;
          backdrop-filter: blur(6px);
        }
        .mc-badge-official { background: rgba(244, 201, 93, 0.85); color: #1a1306; }
        .mc-badge-community { background: rgba(94, 234, 212, 0.85); color: #062320; }

        .mc-reactions {
          position: absolute;
          bottom: 0.55rem;
          right: 0.55rem;
          z-index: 4;
          opacity: 0;
          transition: opacity 0.18s ease;
        }
        .mc:hover .mc-reactions,
        .mc-reactions:focus-within { opacity: 1; }
        @media (hover: none) {
          .mc-reactions { opacity: 1; }
        }

        .mc-body { padding: 0.7rem 0.85rem 0.85rem; }
        .mc-reason {
          font-family: ui-monospace, monospace;
          font-size: 0.62rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          color: rgba(244, 201, 93, 0.85);
          margin-bottom: 0.4rem;
        }
        .mc-title-link { color: inherit; text-decoration: none; display: block; }
        .mc-title-link:hover .mc-title { color: #5eead4; }
        .mc-title {
          font-size: 0.94rem;
          font-weight: 600;
          color: #f3f3fb;
          line-height: 1.35;
          margin-bottom: 0.4rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          transition: color 0.12s;
        }
        .mc-meta {
          font-family: ui-monospace, monospace;
          font-size: 0.66rem;
          font-weight: 600;
          color: rgba(148, 163, 184, 0.75);
          letter-spacing: 0.04em;
          margin-bottom: 0.55rem;
        }
        .mc-lounge-link { color: rgba(94, 234, 212, 0.85); text-decoration: none; }
        .mc-lounge-link:hover { color: #5eead4; text-decoration: underline; }

        .mc-foot {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
          padding-top: 0.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }
        .mc-author { font-size: 0.72rem; color: rgba(216, 217, 230, 0.7); }
        .mc-author em {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 1.05em;
          font-weight: 600;
          color: #f3f3fb;
        }
        .mc-counts {
          display: inline-flex;
          gap: 0.55rem;
          font-family: ui-monospace, monospace;
          font-size: 0.66rem;
          color: rgba(148, 163, 184, 0.7);
        }
        .mc-comments-link { color: rgba(148, 163, 184, 0.7); text-decoration: none; }
        .mc-comments-link:hover { color: #5eead4; }
      `}</style>
    </div>
  );
}
