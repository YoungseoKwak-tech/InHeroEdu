import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import { createAdminClient } from "@/lib/supabase";
import AuthorChip from "@/components/trajectory/AuthorChip";
import ClubJoinButton from "@/components/clubs/ClubJoinButton";
import ClubNotes from "@/components/clubs/ClubNotes";
import {
  CLUB_ROLE_LABEL,
  hydrateClubMembers,
  hydrateMeetingNotes,
  toClubPublic,
  type ClubMemberPublic,
  type ClubMemberRow,
  type ClubMeetingNoteRow,
  type ClubPublic,
  type ClubRow,
  type MeetingNotePublic,
} from "@/lib/clubs";

export const dynamic = "force-dynamic";

interface PageProps {
  params: { slug: string };
}

async function loadClub(
  slug: string
): Promise<{ club: ClubPublic; members: ClubMemberPublic[]; notes: MeetingNotePublic[] } | null> {
  noStore();
  const supabase = createAdminClient();
  const { data: club } = await supabase
    .from("clubs")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();
  if (!club) return null;

  const [{ data: memberRows }, { data: noteRows }] = await Promise.all([
    supabase.from("club_members").select("*").eq("club_id", (club as ClubRow).id),
    supabase
      .from("club_meeting_notes")
      .select("*")
      .eq("club_id", (club as ClubRow).id)
      .eq("is_deleted", false)
      .order("created_at", { ascending: false })
      .limit(50),
  ]);

  const [members, notes] = await Promise.all([
    hydrateClubMembers((memberRows ?? []) as ClubMemberRow[]),
    hydrateMeetingNotes((noteRows ?? []) as ClubMeetingNoteRow[]),
  ]);
  return { club: toClubPublic(club as ClubRow, members.length), members, notes };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const data = await loadClub(params.slug);
  if (!data) return { title: "Club | InHero" };
  return {
    title: `${data.club.name} | InHero Clubs`,
    description: data.club.mission,
  };
}

export default async function ClubRoomPage({ params }: PageProps) {
  const data = await loadClub(params.slug);
  if (!data) notFound();
  const { club, members, notes } = data;

  return (
    <main
      className="cr-root"
      style={{ ["--accent" as string]: club.accent }}
    >
      <div className="cr-stars" aria-hidden="true" />
      <div className="cr-glow" aria-hidden="true" />

      <article className="cr-shell">
        <Link href="/clubs" className="cr-back">← All clubs</Link>

        <header className="cr-head">
          <div className="cr-glyph">{club.glyph}</div>
          <h1 className="cr-name">{club.name}</h1>
          <p className="cr-mission">{club.mission}</p>
          {club.heroBlurb && <p className="cr-blurb">{club.heroBlurb}</p>}

          <div className="cr-actions">
            <ClubJoinButton
              slug={club.slug}
              initialIsMember={false}
              accent={club.accent}
            />
            <span className="cr-count">
              {club.memberCount} {club.memberCount === 1 ? "person" : "people"} in the room
            </span>
          </div>
        </header>

        <section className="cr-section">
          <div className="cr-section-tag">IN THE ROOM</div>
          {members.length === 0 ? (
            <p className="cr-empty">
              No one's taken a seat yet. The first three set the tone for the whole cohort.
            </p>
          ) : (
            <ul className="cr-members">
              {members.map((m) => (
                <li
                  key={m.handle}
                  className={`cr-member ${m.isFeatured ? "is-featured" : ""}`}
                >
                  <AuthorChip
                    handle={m.handle}
                    graduationYear={m.graduationYear}
                    badges={m.badges}
                    size="md"
                  />
                  {m.role !== "member" && (
                    <span className={`cr-role cr-role-${m.role}`}>
                      {CLUB_ROLE_LABEL[m.role]}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>

        <ClubNotes slug={club.slug} accent={club.accent} initialNotes={notes} />

        <footer className="cr-foot">
          <span>This is a curated InHero room. Membership is the signal — the work happens elsewhere (lounges, projects, your trajectory).</span>
        </footer>
      </article>

      <style>{`
        .cr-root {
          --accent: #5eead4;
          position: relative;
          min-height: calc(100vh - 4rem);
          padding: 4.5rem 1.25rem 5rem;
          background: linear-gradient(180deg, #02040b 0%, #050710 100%);
          color: #d8d9e6;
          font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif;
          overflow: hidden;
        }
        .cr-stars {
          position: absolute; inset: 0;
          pointer-events: none; opacity: 0.4;
          background-image:
            radial-gradient(1px 1px at 12% 18%, rgba(255,255,255,0.8), transparent 100%),
            radial-gradient(1px 1px at 78% 24%, rgba(255,255,255,0.55), transparent 100%),
            radial-gradient(1.2px 1.2px at 32% 72%, rgba(255,255,255,0.6), transparent 100%);
          background-size: 320px 320px;
        }
        .cr-glow {
          position: absolute; inset: 0;
          pointer-events: none;
          background:
            radial-gradient(ellipse 60% 35% at 50% 0%, color-mix(in srgb, var(--accent) 12%, transparent), transparent 60%);
        }

        .cr-shell {
          position: relative;
          max-width: 46rem;
          margin: 0 auto;
          padding: 1.9rem 1.85rem 1.75rem;
          border-radius: 1rem;
          border: 1px solid color-mix(in srgb, var(--accent) 22%, transparent);
          background: rgba(8,10,18,0.78);
          backdrop-filter: blur(14px);
          box-shadow: 0 32px 80px rgba(0,0,0,0.6);
        }
        .cr-back {
          display: inline-block;
          font-family: ui-monospace, monospace;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(148,163,184,0.7);
          text-decoration: none;
          margin-bottom: 1.2rem;
          transition: color 0.15s;
        }
        .cr-back:hover { color: var(--accent); }

        .cr-head { margin-bottom: 1.7rem; }
        .cr-glyph {
          font-size: 2.6rem;
          color: var(--accent);
          text-shadow: 0 0 22px color-mix(in srgb, var(--accent) 55%, transparent);
          line-height: 1;
          margin-bottom: 0.55rem;
        }
        .cr-name {
          font-family: 'Cormorant Garamond', 'Georgia', serif;
          font-size: clamp(2rem, 5vw, 2.8rem);
          font-weight: 600;
          color: #f3f3fb;
          margin: 0 0 0.6rem;
          letter-spacing: -0.015em;
          line-height: 1.1;
        }
        .cr-mission {
          font-size: 1rem;
          color: rgba(216,217,230,0.88);
          line-height: 1.6;
          margin: 0 0 0.55rem;
          max-width: 32rem;
        }
        .cr-blurb {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 1.05rem;
          color: color-mix(in srgb, var(--accent) 80%, white 20%);
          margin: 0 0 1.3rem;
          line-height: 1.5;
          max-width: 32rem;
        }
        .cr-actions {
          display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;
        }
        .cr-count {
          font-family: ui-monospace, monospace;
          font-size: 0.74rem;
          color: rgba(148,163,184,0.7);
        }

        .cr-section { margin-top: 1.85rem; }
        .cr-section-tag {
          font-family: ui-monospace, monospace;
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(148,163,184,0.65);
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .cr-empty {
          font-size: 0.92rem;
          color: rgba(148,163,184,0.75);
          line-height: 1.6;
          margin: 0;
        }
        .cr-members {
          list-style: none; padding: 0; margin: 0;
          display: flex; flex-wrap: wrap; gap: 0.6rem;
        }
        .cr-member {
          display: inline-flex; align-items: center; gap: 0.4rem;
          padding: 0.5rem 0.7rem;
          border-radius: 0.55rem;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          transition: border-color 0.15s, background 0.15s;
        }
        .cr-member:hover { border-color: color-mix(in srgb, var(--accent) 40%, transparent); }
        .cr-member.is-featured {
          border-color: color-mix(in srgb, var(--accent) 50%, transparent);
          background: color-mix(in srgb, var(--accent) 6%, transparent);
        }
        .cr-role {
          font-family: ui-monospace, monospace;
          font-size: 0.56rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          padding: 0.18rem 0.45rem;
          border-radius: 0.25rem;
          line-height: 1;
        }
        .cr-role-founder {
          color: #F4C95D;
          background: rgba(244,201,93,0.12);
          border: 1px solid rgba(244,201,93,0.4);
          text-shadow: 0 0 6px rgba(244,201,93,0.45);
        }
        .cr-role-cofounder {
          color: #FBC95D;
          background: rgba(244,201,93,0.06);
          border: 1px solid rgba(244,201,93,0.25);
        }
        .cr-role-secretary {
          color: #5eead4;
          background: rgba(94,234,212,0.08);
          border: 1px solid rgba(94,234,212,0.3);
        }
        .cr-role-curator {
          color: var(--accent);
          background: color-mix(in srgb, var(--accent) 12%, transparent);
          border: 1px solid color-mix(in srgb, var(--accent) 35%, transparent);
        }

        .cr-foot {
          margin-top: 1.9rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(255,255,255,0.05);
          font-family: ui-monospace, monospace;
          font-size: 0.68rem;
          color: rgba(148,163,184,0.55);
          line-height: 1.55;
          letter-spacing: 0.04em;
        }
      `}</style>
    </main>
  );
}
