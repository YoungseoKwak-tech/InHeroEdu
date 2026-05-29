"use client";

import BriefSection from "@/components/my-space/BriefSection";
import ActiveDiscussionCard from "@/components/my-space/ActiveDiscussionCard";
import type { MySpaceCardItem } from "@/components/my-space/MySpaceCard";
import { isDocGroup, type DocGroup } from "@/lib/docGroups";

export interface BriefSectionData {
  id: string;
  title: string;
  description?: string;
  resourceIds: string[];
}

export interface BriefDiscussionData {
  loungeSlug: string;
  loungeName: string;
  snippet: string;
}

export interface BriefData {
  greeting: string;
  generatedAt: string;
  sections: BriefSectionData[];
  activeDiscussions: BriefDiscussionData[];
}

export interface BriefResourceMap {
  [id: string]: Omit<MySpaceCardItem, "folder"> & { folder: string };
}

interface Props {
  brief: BriefData;
  resources: BriefResourceMap;
  source: "cache" | "fresh";
}

export default function StudyBriefView({ brief, resources, source }: Props) {
  const date = new Date(brief.generatedAt);
  const dateLabel = date.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="sbv">
      <header className="sbv-head">
        <div className="sbv-stamp">
          <span className="sbv-stamp-eyebrow">YOUR BRIEF · {source === "cache" ? "TODAY" : "FRESH"}</span>
          <span className="sbv-stamp-date">{dateLabel}</span>
        </div>
        <h2 className="sbv-greeting">{brief.greeting}</h2>
      </header>

      {brief.sections.length === 0 ? (
        <div className="sbv-thin">
          The model didn&apos;t find enough signal yet. Save a few more resources and
          refresh — the brief sharpens fast.
        </div>
      ) : (
        brief.sections.map((s) => {
          const hydrated = s.resourceIds
            .map((id) => resources[id])
            .filter((r): r is NonNullable<typeof r> => !!r)
            .map((r): MySpaceCardItem => ({
              ...r,
              folder: (isDocGroup(r.folder) ? r.folder : "notes") as DocGroup,
            }));
          return (
            <BriefSection
              key={s.id}
              title={s.title}
              description={s.description}
              resources={hydrated}
            />
          );
        })
      )}

      {brief.activeDiscussions.length > 0 && (
        <div className="sbv-discussions">
          <div className="sbv-discussions-head">
            <span className="sbv-eyebrow">ACTIVE NOW</span>
            <span className="sbv-discussions-sub">Conversations from your lounges</span>
          </div>
          <div className="sbv-discussions-scroll">
            {brief.activeDiscussions.map((d) => (
              <ActiveDiscussionCard key={d.loungeSlug + d.snippet.slice(0, 8)} {...d} />
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        .sbv {
          padding-bottom: 5rem;
        }
        .sbv-head {
          margin-bottom: 1.8rem;
        }
        .sbv-stamp {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 0.55rem;
        }
        .sbv-stamp-eyebrow {
          font-family: ui-monospace, monospace;
          font-size: 0.66rem;
          font-weight: 800;
          letter-spacing: 0.22em;
          color: #f4c95d;
          padding: 0.22rem 0.55rem;
          border: 1px solid rgba(244, 201, 93, 0.4);
          border-radius: 999px;
        }
        .sbv-stamp-date {
          font-family: ui-monospace, monospace;
          font-size: 0.72rem;
          letter-spacing: 0.14em;
          color: rgba(148, 163, 184, 0.78);
        }
        .sbv-greeting {
          font-family: Cormorant Garamond, serif;
          font-size: clamp(1.7rem, 3.8vw, 2.4rem);
          font-weight: 600;
          letter-spacing: -0.015em;
          line-height: 1.18;
          color: #f3f3fb;
          margin: 0;
          max-width: 30ch;
        }
        .sbv-thin {
          padding: 2.5rem 1rem;
          font-family: ui-monospace, monospace;
          font-size: 0.85rem;
          color: rgba(148, 163, 184, 0.75);
          text-align: center;
          border: 1px dashed rgba(94, 234, 212, 0.2);
          border-radius: 0.8rem;
        }

        .sbv-discussions {
          position: sticky;
          bottom: 0;
          padding: 1rem 0 0.6rem;
          margin-top: 1.5rem;
          background: linear-gradient(180deg, transparent, rgba(10, 6, 18, 0.7) 25%);
          backdrop-filter: blur(8px);
          border-top: 1px solid rgba(94, 234, 212, 0.18);
        }
        .sbv-discussions-head {
          display: flex;
          align-items: baseline;
          gap: 0.6rem;
          margin-bottom: 0.6rem;
        }
        .sbv-eyebrow {
          font-family: ui-monospace, monospace;
          font-size: 0.66rem;
          font-weight: 800;
          letter-spacing: 0.22em;
          color: rgba(94, 234, 212, 0.95);
        }
        .sbv-discussions-sub {
          font-size: 0.78rem;
          color: rgba(148, 163, 184, 0.7);
        }
        .sbv-discussions-scroll {
          display: flex;
          gap: 0.7rem;
          overflow-x: auto;
          padding-bottom: 0.4rem;
          scrollbar-width: thin;
        }
        .sbv-discussions-scroll::-webkit-scrollbar { height: 4px; }
        .sbv-discussions-scroll::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.08);
          border-radius: 999px;
        }
      `}</style>
    </div>
  );
}
