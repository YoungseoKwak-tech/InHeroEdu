import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createAdminClient } from "@/lib/supabase";
import {
  AMBITION_TAG_LABEL,
  getBadgeMeta,
  toPublic,
  type BadgeMeta,
  type BadgeRow,
  type ProfilePublicRow,
} from "@/lib/trajectory";

export const dynamic = "force-dynamic";

interface Props {
  params: { handle: string };
}

async function loadProfile(handle: string) {
  const supabase = createAdminClient();
  const { data: profile } = await supabase
    .from("profiles_public")
    .select("*")
    .ilike("display_handle", handle)
    .maybeSingle();
  if (!profile) return null;
  const { data: badges } = await supabase
    .from("badges")
    .select("*")
    .eq("user_id", (profile as ProfilePublicRow).user_id);
  return toPublic(profile as ProfilePublicRow, (badges ?? []) as BadgeRow[]);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const profile = await loadProfile(params.handle);
  if (!profile) return { title: "Trajectory not found | InHero" };
  return {
    title: `${profile.handle} | InHero Trajectory`,
    description: `${profile.handle} · Class of ${profile.graduationYear ?? "—"} · ${profile.ambitionTags
      .map((t) => AMBITION_TAG_LABEL[t] ?? t)
      .join(", ")}`,
  };
}

export default async function TrajectoryProfilePage({ params }: Props) {
  const profile = await loadProfile(params.handle);
  if (!profile) notFound();

  const yearShort = profile.graduationYear ? `'${String(profile.graduationYear).slice(-2)}` : null;

  return (
    <main className="tp-root">
      <div className="tp-stars" aria-hidden="true" />
      <div className="tp-glow" aria-hidden="true" />

      <article className="tp-shell">
        <Link href="/trajectory" className="tp-back">← Trajectory</Link>

        {/* Identity header */}
        <header className="tp-head">
          <div className="tp-eyebrow">
            <span className="tp-pulse" />
            <span>InHero Trajectory · public profile</span>
          </div>
          <h1 className="tp-handle">{profile.handle}</h1>
          <div className="tp-meta">
            {yearShort && <span className="tp-meta-chip">Class of {profile.graduationYear} <em>({yearShort})</em></span>}
            {profile.ambitionTags.map((t) => (
              <span key={t} className="tp-meta-chip tp-meta-chip-ambition">
                {AMBITION_TAG_LABEL[t] ?? t}
              </span>
            ))}
          </div>
        </header>

        {/* Badges */}
        <section className="tp-section">
          <div className="tp-section-tag">BADGES</div>
          {profile.badges.length === 0 ? (
            <p className="tp-empty">No badges earned yet. Verify an AP 5 or contribute to a research project to start.</p>
          ) : (
            <div className="tp-badges">
              {profile.badges.map((b) => {
                const meta: BadgeMeta | null = b.meta ?? getBadgeMeta(b.type);
                if (!meta) return null;
                return (
                  <div
                    key={b.type}
                    className="tp-badge"
                    style={{ ["--accent" as string]: meta.accent }}
                  >
                    <span className="tp-badge-glyph">{meta.glyph}</span>
                    <div className="tp-badge-body">
                      <div className="tp-badge-name">{meta.label}</div>
                      <p className="tp-badge-blurb">{meta.blurb}</p>
                      <div className="tp-badge-date">
                        earned {new Date(b.earnedAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {profile.bio && (
          <section className="tp-section">
            <div className="tp-section-tag">BIO</div>
            <p className="tp-bio">{profile.bio}</p>
          </section>
        )}

        <footer className="tp-foot">
          <span>This is a public InHero trajectory profile. More layers (clubs, projects, accepted-student archive) arrive this cohort.</span>
        </footer>
      </article>

      <style>{`
        .tp-root {
          position: relative;
          min-height: calc(100vh - 4rem);
          padding: 5rem 1.25rem 5rem;
          background: linear-gradient(180deg, #02040b 0%, #050710 100%);
          color: #d8d9e6;
          font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif;
          overflow: hidden;
        }
        .tp-stars {
          position: absolute; inset: 0;
          pointer-events: none; opacity: 0.45;
          background-image:
            radial-gradient(1px 1px at 12% 18%, rgba(255,255,255,0.8), transparent 100%),
            radial-gradient(1px 1px at 78% 24%, rgba(255,255,255,0.55), transparent 100%),
            radial-gradient(1.2px 1.2px at 32% 72%, rgba(255,255,255,0.6), transparent 100%),
            radial-gradient(1.2px 1.2px at 50% 8%, rgba(244,201,93,0.65), transparent 100%);
          background-size: 300px 300px;
        }
        .tp-glow {
          position: absolute; inset: 0;
          pointer-events: none;
          background:
            radial-gradient(ellipse 70% 40% at 50% 0%, rgba(244,201,93,0.07), transparent 60%),
            radial-gradient(ellipse 60% 35% at 50% 100%, rgba(94,234,212,0.05), transparent 60%);
        }
        .tp-shell {
          position: relative;
          max-width: 46rem;
          margin: 0 auto;
          padding: 1.85rem 1.75rem 1.7rem;
          border-radius: 1rem;
          border: 1px solid rgba(244,201,93,0.18);
          background: rgba(8,10,18,0.75);
          backdrop-filter: blur(14px);
          box-shadow: 0 32px 80px rgba(0,0,0,0.6);
        }
        .tp-back {
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
        .tp-back:hover { color: #f4c95d; }

        .tp-head { display: flex; flex-direction: column; gap: 0.55rem; margin-bottom: 1.6rem; }
        .tp-eyebrow {
          display: inline-flex; align-items: center; gap: 0.55rem;
          font-family: ui-monospace, monospace;
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #F4C95D;
          text-shadow: 0 0 10px rgba(244,201,93,0.5);
        }
        .tp-pulse {
          width: 7px; height: 7px; border-radius: 50%;
          background: #F4C95D;
          box-shadow: 0 0 10px rgba(244,201,93,0.7);
          animation: tp-pulse 1.6s ease-in-out infinite;
        }
        @keyframes tp-pulse {
          0%,100% { opacity: 0.55; transform: scale(0.85); }
          50%     { opacity: 1;    transform: scale(1.15); }
        }
        .tp-handle {
          font-family: 'Cormorant Garamond', 'Georgia', serif;
          font-style: italic;
          font-size: clamp(2.4rem, 6vw, 3.4rem);
          font-weight: 600;
          color: #f3f3fb;
          margin: 0;
          letter-spacing: -0.02em;
          line-height: 1;
          text-shadow: 0 0 24px rgba(244,201,93,0.18);
        }
        .tp-meta { display: flex; gap: 0.4rem; flex-wrap: wrap; margin-top: 0.3rem; }
        .tp-meta-chip {
          font-family: ui-monospace, monospace;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 0.28rem 0.55rem;
          border-radius: 0.3rem;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(216,217,230,0.9);
        }
        .tp-meta-chip em {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 0.8em;
          color: rgba(148,163,184,0.7);
          margin-left: 0.3rem;
          letter-spacing: 0.04em;
          text-transform: none;
        }
        .tp-meta-chip-ambition {
          color: #5eead4;
          background: rgba(94,234,212,0.06);
          border-color: rgba(94,234,212,0.3);
        }

        .tp-section { margin-bottom: 1.6rem; }
        .tp-section-tag {
          font-family: ui-monospace, monospace;
          font-size: 0.6rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(148,163,184,0.65);
          margin-bottom: 0.8rem;
          padding-bottom: 0.45rem;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .tp-empty {
          font-size: 0.88rem;
          color: rgba(148,163,184,0.7);
          line-height: 1.55;
          margin: 0;
        }

        .tp-badges {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
          gap: 0.75rem;
        }
        .tp-badge {
          --accent: #5eead4;
          display: flex;
          gap: 0.85rem;
          padding: 0.9rem 0.95rem;
          border-radius: 0.6rem;
          border: 1px solid color-mix(in srgb, var(--accent) 28%, transparent);
          background:
            radial-gradient(circle at 12% 0%, color-mix(in srgb, var(--accent) 10%, transparent), transparent 50%),
            rgba(8,10,18,0.65);
          box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--accent) 6%, transparent);
        }
        .tp-badge-glyph {
          font-size: 1.8rem;
          line-height: 1;
          color: var(--accent);
          text-shadow: 0 0 14px color-mix(in srgb, var(--accent) 55%, transparent);
          margin-top: 0.1rem;
        }
        .tp-badge-body { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 0.18rem; }
        .tp-badge-name {
          font-family: 'Cormorant Garamond', 'Georgia', serif;
          font-style: italic;
          font-size: 1.05rem;
          font-weight: 600;
          color: #f3f3fb;
          line-height: 1.1;
        }
        .tp-badge-blurb {
          font-size: 0.8rem;
          color: rgba(216,217,230,0.78);
          margin: 0;
          line-height: 1.45;
        }
        .tp-badge-date {
          margin-top: 0.2rem;
          font-family: ui-monospace, monospace;
          font-size: 0.62rem;
          letter-spacing: 0.08em;
          color: rgba(148,163,184,0.55);
        }

        .tp-bio {
          font-size: 0.92rem;
          line-height: 1.6;
          color: rgba(216, 217, 230, 0.88);
          margin: 0;
        }

        .tp-foot {
          margin-top: 1.8rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(255,255,255,0.05);
          font-family: ui-monospace, monospace;
          font-size: 0.68rem;
          color: rgba(148,163,184,0.55);
          letter-spacing: 0.04em;
          line-height: 1.55;
        }
      `}</style>
    </main>
  );
}
