import type { Metadata } from "next";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import { createAdminClient } from "@/lib/supabase";
import { type MentorProfileRow } from "@/lib/mentors";
import type { ProfilePublicRow } from "@/lib/trajectory";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Mentors | InHero",
  description: "Verified Ivy + program mentors who anchor the InHero cohort.",
};

interface MentorCard {
  handle: string;
  graduationYear: number | null;
  university: string;
  universityRole: string;
  specialties: string[];
  introBlurb: string;
  avatarUrl: string | null;
}

async function loadMentors(): Promise<MentorCard[]> {
  noStore();
  const supabase = createAdminClient();
  const { data: mentors } = await supabase
    .from("mentor_profiles")
    .select("*")
    .eq("is_verified", true)
    .order("created_at", { ascending: true });
  const mentorRows = (mentors ?? []) as MentorProfileRow[];
  if (mentorRows.length === 0) return [];

  const userIds = mentorRows.map((m) => m.user_id);
  const { data: profiles } = await supabase
    .from("profiles_public")
    .select("user_id, display_handle, graduation_year")
    .in("user_id", userIds);

  const profileMap = new Map<string, Pick<ProfilePublicRow, "display_handle" | "graduation_year">>(
    ((profiles ?? []) as Pick<ProfilePublicRow, "user_id" | "display_handle" | "graduation_year">[]).map(
      (p) => [p.user_id, { display_handle: p.display_handle, graduation_year: p.graduation_year }]
    )
  );

  return mentorRows
    .map((m): MentorCard | null => {
      const p = profileMap.get(m.user_id);
      if (!p) return null;
      return {
        handle: p.display_handle,
        graduationYear: p.graduation_year,
        university: m.university,
        universityRole: m.university_role,
        specialties: m.specialties,
        introBlurb: m.intro_blurb,
        avatarUrl: m.avatar_url,
      };
    })
    .filter((m): m is MentorCard => m !== null);
}

export default async function MentorsDirectoryPage() {
  const mentors = await loadMentors();

  return (
    <main className="md-root">
      <header className="md-head">
        <div className="md-eyebrow">
          <span className="md-pulse" />
          <span>MENTORS · VERIFIED</span>
        </div>
        <h1 className="md-title">
          The people who actually <em>made it</em>.
        </h1>
        <p className="md-lede">
          A small, intentionally selective group of Ivy + program mentors who anchor the cohort.
          Each one is vetted. Their proximity is the upgrade.
        </p>
      </header>

      {mentors.length === 0 ? (
        <div className="md-empty">
          Mentor lineup is being curated. The first batch comes online with the founding cohort.
        </div>
      ) : (
        <ul className="md-list">
          {mentors.map((m) => (
            <li key={m.handle} className="md-card">
              <Link href={`/trajectory/${encodeURIComponent(m.handle)}`} className="md-link">
                {m.avatarUrl && (
                  <img src={m.avatarUrl} alt={`${m.handle} avatar`} className="md-avatar" />
                )}
                <div className="md-card-body">
                  <div className="md-stamp">
                    <span className="md-stamp-glyph">★</span>
                    <span>VERIFIED MENTOR</span>
                  </div>
                  <h2 className="md-handle">{m.handle}</h2>
                  <div className="md-uni">{m.university}</div>
                  <div className="md-role">{m.universityRole}</div>
                  <p className="md-blurb">{m.introBlurb}</p>
                  {m.specialties.length > 0 && (
                    <div className="md-specs">
                      {m.specialties.slice(0, 4).map((s) => (
                        <span key={s} className="md-spec">{s}</span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <style>{`
        .md-root {
          max-width: 980px;
          margin: 0 auto;
          padding: 4rem 1.5rem 5rem;
          color: #d8d9e6;
          font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif;
        }
        .md-head { margin-bottom: 2.4rem; }
        .md-eyebrow {
          display: inline-flex; align-items: center; gap: 0.55rem;
          font-family: ui-monospace, monospace;
          font-size: 0.68rem; font-weight: 800;
          letter-spacing: 0.28em;
          color: #F4C95D;
          text-transform: uppercase;
          text-shadow: 0 0 12px rgba(244,201,93,0.4);
          margin-bottom: 0.85rem;
        }
        .md-pulse {
          width: 7px; height: 7px; border-radius: 50%;
          background: #F4C95D;
          box-shadow: 0 0 12px rgba(244,201,93,0.7);
          animation: md-pulse 1.6s ease-in-out infinite;
        }
        @keyframes md-pulse {
          0%,100% { opacity: 0.55; transform: scale(0.85); }
          50%     { opacity: 1;   transform: scale(1.2); }
        }
        .md-title {
          font-family: 'Cormorant Garamond', 'Georgia', serif;
          font-size: clamp(2rem, 4vw, 2.85rem);
          font-weight: 500;
          color: #f3f3fb;
          margin: 0 0 0.85rem;
          line-height: 1.15;
          letter-spacing: -0.01em;
        }
        .md-title em { font-style: italic; color: #F4C95D; }
        .md-lede {
          font-size: 1rem;
          color: rgba(216,217,230,0.78);
          max-width: 620px;
          line-height: 1.65;
          margin: 0;
        }
        .md-empty {
          padding: 2.5rem 1rem;
          border: 1px dashed rgba(244,201,93,0.3);
          border-radius: 0.75rem;
          font-family: ui-monospace, monospace;
          font-size: 0.86rem;
          color: rgba(244,201,93,0.7);
          text-align: center;
          letter-spacing: 0.04em;
        }
        .md-list {
          list-style: none; padding: 0; margin: 0;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 1.1rem;
        }
        .md-card {
          border: 1px solid rgba(244,201,93,0.3);
          border-radius: 0.85rem;
          background:
            radial-gradient(circle at 12% 0%, rgba(244,201,93,0.08), transparent 50%),
            rgba(8,10,18,0.72);
          transition: transform 0.15s, border-color 0.15s, box-shadow 0.2s;
        }
        .md-card:hover {
          transform: translateY(-3px);
          border-color: rgba(244,201,93,0.6);
          box-shadow: 0 24px 56px rgba(0,0,0,0.5), 0 0 28px rgba(244,201,93,0.18);
        }
        .md-link {
          display: flex; gap: 1rem;
          padding: 1.15rem 1.2rem;
          text-decoration: none;
          color: inherit;
          align-items: flex-start;
        }
        .md-avatar {
          flex-shrink: 0;
          width: 3rem; height: 3rem;
          border-radius: 50%;
          object-fit: cover;
          border: 1px solid rgba(244,201,93,0.4);
        }
        .md-card-body { flex: 1; min-width: 0; }
        .md-stamp {
          display: inline-flex; align-items: center; gap: 0.4rem;
          font-family: ui-monospace, monospace;
          font-size: 0.58rem; font-weight: 800;
          letter-spacing: 0.22em;
          color: #F4C95D;
          margin-bottom: 0.4rem;
        }
        .md-stamp-glyph { text-shadow: 0 0 8px rgba(244,201,93,0.6); }
        .md-handle {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 1.4rem;
          font-weight: 600;
          color: #f3f3fb;
          margin: 0 0 0.25rem;
          line-height: 1.1;
        }
        .md-uni {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 1.05rem;
          color: #F4C95D;
          margin-bottom: 0.1rem;
        }
        .md-role {
          font-family: ui-monospace, monospace;
          font-size: 0.72rem;
          letter-spacing: 0.08em;
          color: rgba(244,201,93,0.75);
          margin-bottom: 0.7rem;
          text-transform: uppercase;
        }
        .md-blurb {
          font-size: 0.88rem;
          color: rgba(216,217,230,0.85);
          line-height: 1.55;
          margin: 0 0 0.75rem;
        }
        .md-specs { display: flex; flex-wrap: wrap; gap: 0.3rem; }
        .md-spec {
          font-family: ui-monospace, monospace;
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.13em;
          text-transform: uppercase;
          padding: 0.16rem 0.42rem;
          border-radius: 0.25rem;
          background: rgba(244,201,93,0.08);
          border: 1px solid rgba(244,201,93,0.28);
          color: #F4C95D;
        }
      `}</style>
    </main>
  );
}
