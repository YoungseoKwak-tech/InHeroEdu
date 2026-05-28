"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { authFetch, getClientSession } from "@/lib/client-auth";
import { CLUB_ROLE_LABEL, type ClubRole } from "@/lib/clubs";
import { type VerificationKind, VERIFICATION_KIND_META } from "@/lib/verifications";
import { getBadgeMeta } from "@/lib/trajectory";

interface DashboardData {
  ok: boolean;
  hasProfile: boolean;
  tier?: "member" | "verified_student" | "mentor";
  trajectory?: {
    handle: string;
    graduationYear: number | null;
    ambitionTags: string[];
    dreamSchool: string | null;
    intendedField: string | null;
    currentObsession: string | null;
    buildingWhat: string | null;
    badges: { type: string; earnedAt: string }[];
  };
  mentor?: {
    university: string;
    universityRole: string;
    specialties: string[];
    introBlurb: string;
  } | null;
  verifications?: {
    id: string;
    kind: VerificationKind;
    kindLabel: string;
    status: "pending" | "approved" | "rejected";
    claimText: string;
    schoolName: string | null;
    submittedAt: string;
    declineReason: string | null;
  }[];
  clubs?: {
    slug: string; name: string; glyph: string; accent: string;
    role: ClubRole; isFeatured: boolean; joinedAt: string;
  }[];
  activity?: { loungePosts: number; clubsJoined: number };
}

const TIER_META = {
  member: {
    label: "Member",
    glyph: "·",
    accent: "#94a3b8",
    blurb: "You're in the cohort. Next: claim a verification to level up.",
  },
  verified_student: {
    label: "Verified Student",
    glyph: "✓",
    accent: "#7DD3FC",
    blurb: "Verified. You're now visible as a real-deal student across the platform.",
  },
  mentor: {
    label: "Mentor",
    glyph: "★",
    accent: "#F4C95D",
    blurb: "You anchor the ecosystem. Your presence is the gravity.",
  },
};

export default function MePage() {
  const [authStatus, setAuthStatus] = useState<"loading" | "out" | "ok">("loading");
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const session = await getClientSession();
        if (!mounted) return;
        if (!session) { setAuthStatus("out"); return; }
        setAuthStatus("ok");
        const res = await authFetch("/api/me/dashboard");
        const json = await res.json();
        if (!mounted) return;
        if (!res.ok || !json.ok) throw new Error(json.error ?? `HTTP ${res.status}`);
        setData(json);
      } catch (err) {
        if (mounted) setError(err instanceof Error ? err.message : String(err));
      }
    }
    void load();
    return () => { mounted = false; };
  }, []);

  const tier = data?.tier ?? "member";
  const tierMeta = TIER_META[tier];

  return (
    <main className="me-root">
      <div className="me-shell">
        {authStatus === "loading" && <div className="me-loading">Loading your dashboard…</div>}

        {authStatus === "out" && (
          <div className="me-gate">
            <strong>You're signed out.</strong>
            <p>Sign in from the top-right to see your dashboard.</p>
          </div>
        )}

        {authStatus === "ok" && error && (
          <div className="me-error">{error}</div>
        )}

        {authStatus === "ok" && data && !data.hasProfile && (
          <div className="me-gate">
            <strong>You don't have a trajectory yet.</strong>
            <p>Claim your handle in the 3-step onboarding to unlock the rest of InHero.</p>
            <Link href="/onboarding" className="me-btn-yellow">Claim your handle →</Link>
          </div>
        )}

        {authStatus === "ok" && data?.hasProfile && data.trajectory && (
          <>
            {/* TIER HEADER */}
            <header className="me-head" style={{ ["--accent" as string]: tierMeta.accent }}>
              <div className="me-tier-stamp">
                <span className="me-tier-glyph">{tierMeta.glyph}</span>
                <span className="me-tier-label">{tierMeta.label.toUpperCase()}</span>
              </div>
              <h1 className="me-handle">{data.trajectory.handle}</h1>
              <div className="me-meta">
                {data.trajectory.graduationYear && (
                  <span className="me-meta-chip">Class of {data.trajectory.graduationYear}</span>
                )}
                {data.mentor && (
                  <span className="me-meta-chip me-meta-chip-mentor">
                    {data.mentor.university} · {data.mentor.universityRole}
                  </span>
                )}
              </div>
              <p className="me-tier-blurb">{tierMeta.blurb}</p>
              <div className="me-quick-actions">
                <Link href={`/trajectory/${encodeURIComponent(data.trajectory.handle)}`} className="me-btn-primary">
                  View public profile →
                </Link>
                <Link href="/verify" className="me-btn-ghost">Add verification</Link>
                {!data.mentor && <Link href="/clubs/new" className="me-btn-ghost">Found a club</Link>}
              </div>
            </header>

            {/* BADGES */}
            <section className="me-section">
              <h2 className="me-section-title">BADGES</h2>
              {data.trajectory.badges.length === 0 ? (
                <p className="me-empty">No badges yet. Try the trajectory ritual or a verification.</p>
              ) : (
                <ul className="me-badges">
                  {data.trajectory.badges.map((b) => {
                    const meta = getBadgeMeta(b.type);
                    if (!meta) return null;
                    return (
                      <li key={b.type} className="me-badge" style={{ ["--accent" as string]: meta.accent }}>
                        <span className="me-badge-glyph">{meta.glyph}</span>
                        <div className="me-badge-body">
                          <div className="me-badge-name">{meta.label}</div>
                          <p className="me-badge-blurb">{meta.blurb}</p>
                          <div className="me-badge-time">earned {new Date(b.earnedAt).toLocaleDateString()}</div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>

            {/* CLUBS */}
            <section className="me-section">
              <h2 className="me-section-title">CLUBS — {data.clubs?.length ?? 0}</h2>
              {!data.clubs || data.clubs.length === 0 ? (
                <p className="me-empty">
                  No clubs yet. <Link href="/clubs" className="me-inline-link">Browse clubs</Link> or{" "}
                  <Link href="/clubs/new" className="me-inline-link">found one</Link>.
                </p>
              ) : (
                <ul className="me-clubs">
                  {data.clubs.map((c) => (
                    <li key={c.slug} className="me-club" style={{ ["--accent" as string]: c.accent }}>
                      <Link href={`/clubs/${c.slug}`} className="me-club-link">
                        <span className="me-club-glyph">{c.glyph}</span>
                        <div className="me-club-body">
                          <div className="me-club-name">{c.name}</div>
                          <div className="me-club-role">
                            {c.role !== "member" && (
                              <span className={`me-club-role-chip me-club-role-${c.role}`}>
                                {CLUB_ROLE_LABEL[c.role]}
                              </span>
                            )}
                            <span className="me-club-joined">joined {new Date(c.joinedAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {/* VERIFICATIONS */}
            <section className="me-section">
              <h2 className="me-section-title">
                VERIFICATIONS — {data.verifications?.length ?? 0}
                <Link href="/verify" className="me-section-cta">+ Submit new</Link>
              </h2>
              {!data.verifications || data.verifications.length === 0 ? (
                <p className="me-empty">
                  No verifications yet. <Link href="/verify" className="me-inline-link">Submit one →</Link>
                </p>
              ) : (
                <ul className="me-verifs">
                  {data.verifications.map((v) => {
                    const meta = VERIFICATION_KIND_META[v.kind];
                    return (
                      <li key={v.id} className={`me-verif me-verif-${v.status}`}>
                        <div className="me-verif-head">
                          <span className="me-verif-glyph" style={{ color: meta.accent }}>{meta.glyph}</span>
                          <span className="me-verif-kind">{v.kindLabel}</span>
                          <span className={`me-verif-status status-${v.status}`}>{v.status.toUpperCase()}</span>
                        </div>
                        {v.schoolName && <div className="me-verif-school">{v.schoolName}</div>}
                        <p className="me-verif-claim">{v.claimText}</p>
                        {v.declineReason && <div className="me-verif-reason">Decline: {v.declineReason}</div>}
                        <div className="me-verif-time">submitted {new Date(v.submittedAt).toLocaleString()}</div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>

            {/* RITUAL */}
            {(data.trajectory.dreamSchool ||
              data.trajectory.intendedField ||
              data.trajectory.currentObsession ||
              data.trajectory.buildingWhat) && (
              <section className="me-section">
                <h2 className="me-section-title">THE RITUAL</h2>
                <dl className="me-ritual">
                  {data.trajectory.dreamSchool && (
                    <div className="me-ritual-row"><dt>Dream school</dt><dd>{data.trajectory.dreamSchool}</dd></div>
                  )}
                  {data.trajectory.intendedField && (
                    <div className="me-ritual-row"><dt>Intended field</dt><dd>{data.trajectory.intendedField}</dd></div>
                  )}
                  {data.trajectory.currentObsession && (
                    <div className="me-ritual-row"><dt>Current obsession</dt><dd>{data.trajectory.currentObsession}</dd></div>
                  )}
                  {data.trajectory.buildingWhat && (
                    <div className="me-ritual-row me-ritual-long"><dt>Building</dt><dd>{data.trajectory.buildingWhat}</dd></div>
                  )}
                </dl>
              </section>
            )}

            {/* ACTIVITY */}
            <section className="me-section">
              <h2 className="me-section-title">ACTIVITY</h2>
              <div className="me-activity">
                <div className="me-stat">
                  <span className="me-stat-num">{data.activity?.loungePosts ?? 0}</span>
                  <span className="me-stat-label">lounge posts</span>
                </div>
                <div className="me-stat">
                  <span className="me-stat-num">{data.activity?.clubsJoined ?? 0}</span>
                  <span className="me-stat-label">clubs joined</span>
                </div>
              </div>
            </section>
          </>
        )}
      </div>

      <style>{`
        .me-root {
          min-height: 100vh;
          padding: 3rem 1.25rem 5rem;
          background: linear-gradient(180deg, #02040b 0%, #050710 100%);
          color: #d8d9e6;
          font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif;
        }
        .me-shell { max-width: 44rem; margin: 0 auto; }

        .me-loading, .me-empty {
          padding: 1rem 1.1rem;
          font-family: ui-monospace, monospace;
          font-size: 0.84rem;
          color: rgba(148,163,184,0.7);
          line-height: 1.5;
        }
        .me-gate {
          padding: 1.4rem 1.5rem;
          background: rgba(244,201,93,0.06);
          border: 1px solid rgba(244,201,93,0.3);
          border-radius: 0.75rem;
          color: #F4C95D;
        }
        .me-gate strong { display: block; font-size: 1.05rem; margin-bottom: 0.35rem; }
        .me-gate p { color: rgba(244,201,93,0.78); margin: 0 0 0.7rem; font-size: 0.88rem; line-height: 1.55; }
        .me-btn-yellow {
          display: inline-block;
          background: #F4C95D; color: #0a0a10;
          padding: 0.55rem 0.9rem;
          font-family: ui-monospace, monospace;
          font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          text-decoration: none;
          border-radius: 0.4rem;
        }
        .me-btn-yellow:hover { filter: brightness(1.08); }
        .me-error {
          padding: 0.7rem 0.9rem;
          background: rgba(255,107,91,0.08);
          border: 1px solid rgba(255,107,91,0.3);
          color: #ff8b7e;
          font-family: ui-monospace, monospace;
          font-size: 0.78rem;
          border-radius: 0.4rem;
          line-height: 1.55;
        }

        /* HEAD */
        .me-head {
          --accent: #7DD3FC;
          padding: 1.5rem 1.6rem 1.4rem;
          background:
            radial-gradient(circle at 12% 0%, color-mix(in srgb, var(--accent) 12%, transparent), transparent 55%),
            rgba(8,10,18,0.78);
          border: 1px solid color-mix(in srgb, var(--accent) 30%, transparent);
          border-radius: 0.95rem;
          margin-bottom: 1.7rem;
          box-shadow: 0 22px 56px rgba(0,0,0,0.45);
        }
        .me-tier-stamp {
          display: inline-flex; align-items: center; gap: 0.45rem;
          padding: 0.25rem 0.6rem;
          border-radius: 0.35rem;
          background: color-mix(in srgb, var(--accent) 14%, transparent);
          border: 1px solid color-mix(in srgb, var(--accent) 45%, transparent);
          color: var(--accent);
          font-family: ui-monospace, monospace;
          font-size: 0.62rem; font-weight: 800;
          letter-spacing: 0.22em;
          margin-bottom: 0.85rem;
        }
        .me-tier-glyph {
          font-size: 0.9em;
          text-shadow: 0 0 8px color-mix(in srgb, var(--accent) 55%, transparent);
        }
        .me-handle {
          font-family: 'Cormorant Garamond', 'Georgia', serif;
          font-style: italic;
          font-size: clamp(2.2rem, 5vw, 2.85rem);
          font-weight: 600;
          color: #f3f3fb;
          margin: 0 0 0.5rem;
          line-height: 1.05;
          letter-spacing: -0.015em;
        }
        .me-meta { display: flex; gap: 0.4rem; flex-wrap: wrap; margin-bottom: 0.85rem; }
        .me-meta-chip {
          font-family: ui-monospace, monospace;
          font-size: 0.7rem; font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 0.25rem 0.55rem;
          border-radius: 0.3rem;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(216,217,230,0.85);
        }
        .me-meta-chip-mentor {
          background: rgba(244,201,93,0.1);
          border-color: rgba(244,201,93,0.4);
          color: #F4C95D;
        }
        .me-tier-blurb {
          font-size: 0.94rem;
          color: rgba(216,217,230,0.78);
          margin: 0 0 1.05rem;
          line-height: 1.55;
          max-width: 30rem;
        }
        .me-quick-actions { display: flex; gap: 0.5rem; flex-wrap: wrap; }
        .me-btn-primary {
          font-family: ui-monospace, monospace;
          font-size: 0.72rem; font-weight: 700;
          letter-spacing: 0.14em; text-transform: uppercase;
          padding: 0.6rem 0.95rem;
          color: #0a0a10; background: var(--accent);
          border-radius: 0.4rem; text-decoration: none;
          transition: filter 0.15s, box-shadow 0.2s;
        }
        .me-btn-primary:hover { filter: brightness(1.08); box-shadow: 0 0 16px color-mix(in srgb, var(--accent) 45%, transparent); }
        .me-btn-ghost {
          font-family: ui-monospace, monospace;
          font-size: 0.7rem; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase;
          padding: 0.6rem 0.9rem;
          color: var(--accent);
          background: transparent;
          border: 1px solid color-mix(in srgb, var(--accent) 35%, transparent);
          border-radius: 0.4rem; text-decoration: none;
          transition: background 0.15s, border-color 0.15s;
        }
        .me-btn-ghost:hover {
          background: color-mix(in srgb, var(--accent) 10%, transparent);
          border-color: var(--accent);
        }

        /* SECTIONS */
        .me-section { margin-bottom: 1.6rem; }
        .me-section-title {
          font-family: ui-monospace, monospace;
          font-size: 0.62rem; font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(148,163,184,0.7);
          margin: 0 0 0.9rem;
          padding-bottom: 0.45rem;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          display: flex; align-items: center; justify-content: space-between;
        }
        .me-section-cta {
          font-family: ui-monospace, monospace;
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: #5eead4;
          text-decoration: none;
          padding: 0.2rem 0.5rem;
          border-radius: 0.25rem;
          border: 1px dashed rgba(94,234,212,0.35);
        }
        .me-section-cta:hover { background: rgba(94,234,212,0.08); border-style: solid; }
        .me-inline-link { color: #5eead4; text-decoration: none; }
        .me-inline-link:hover { text-decoration: underline; }

        /* BADGES */
        .me-badges {
          list-style: none; padding: 0; margin: 0;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
          gap: 0.75rem;
        }
        .me-badge {
          --accent: #5eead4;
          display: flex; gap: 0.7rem;
          padding: 0.75rem 0.85rem;
          border-radius: 0.5rem;
          border: 1px solid color-mix(in srgb, var(--accent) 28%, transparent);
          background:
            radial-gradient(circle at 12% 0%, color-mix(in srgb, var(--accent) 10%, transparent), transparent 50%),
            rgba(8,10,18,0.6);
        }
        .me-badge-glyph {
          font-size: 1.5rem;
          color: var(--accent);
          text-shadow: 0 0 12px color-mix(in srgb, var(--accent) 55%, transparent);
          line-height: 1;
          margin-top: 0.05rem;
        }
        .me-badge-body { flex: 1; min-width: 0; }
        .me-badge-name {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 1rem; font-weight: 600;
          color: #f3f3fb;
          margin-bottom: 0.15rem;
          line-height: 1.15;
        }
        .me-badge-blurb {
          font-size: 0.78rem;
          color: rgba(216,217,230,0.78);
          line-height: 1.45;
          margin: 0;
        }
        .me-badge-time {
          margin-top: 0.25rem;
          font-family: ui-monospace, monospace;
          font-size: 0.6rem;
          letter-spacing: 0.08em;
          color: rgba(148,163,184,0.5);
        }

        /* CLUBS */
        .me-clubs { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.55rem; }
        .me-club {
          --accent: #5eead4;
          border: 1px solid color-mix(in srgb, var(--accent) 22%, transparent);
          border-radius: 0.55rem;
          background: rgba(8,10,18,0.6);
          transition: border-color 0.15s, transform 0.15s;
        }
        .me-club:hover { border-color: var(--accent); transform: translateX(2px); }
        .me-club-link {
          display: flex; align-items: center; gap: 0.85rem;
          padding: 0.7rem 0.9rem;
          text-decoration: none;
          color: inherit;
        }
        .me-club-glyph {
          font-size: 1.4rem;
          color: var(--accent);
          text-shadow: 0 0 10px color-mix(in srgb, var(--accent) 45%, transparent);
        }
        .me-club-body { flex: 1; min-width: 0; }
        .me-club-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.05rem;
          font-weight: 600;
          color: #f3f3fb;
          margin-bottom: 0.15rem;
        }
        .me-club-role { display: flex; gap: 0.4rem; align-items: center; }
        .me-club-role-chip {
          font-family: ui-monospace, monospace;
          font-size: 0.56rem; font-weight: 800;
          letter-spacing: 0.18em;
          padding: 0.12rem 0.36rem;
          border-radius: 0.22rem;
          color: var(--accent);
          background: color-mix(in srgb, var(--accent) 12%, transparent);
          border: 1px solid color-mix(in srgb, var(--accent) 32%, transparent);
          text-transform: uppercase;
        }
        .me-club-role-founder   { color: #F4C95D; background: rgba(244,201,93,0.12); border-color: rgba(244,201,93,0.4); }
        .me-club-role-cofounder { color: #FBC95D; background: rgba(244,201,93,0.06); border-color: rgba(244,201,93,0.25); }
        .me-club-role-secretary { color: #5eead4; background: rgba(94,234,212,0.08); border-color: rgba(94,234,212,0.3); }
        .me-club-joined {
          font-family: ui-monospace, monospace;
          font-size: 0.66rem;
          color: rgba(148,163,184,0.55);
        }

        /* VERIFICATIONS */
        .me-verifs { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.6rem; }
        .me-verif {
          padding: 0.7rem 0.85rem;
          background: rgba(8,10,18,0.55);
          border: 1px solid rgba(255,255,255,0.05);
          border-left: 2px solid rgba(255,255,255,0.1);
          border-radius: 0 0.45rem 0.45rem 0;
        }
        .me-verif-pending  { border-left-color: #F4C95D; }
        .me-verif-approved { border-left-color: #5DCAA5; }
        .me-verif-rejected { border-left-color: #ff8b7e; }
        .me-verif-head {
          display: flex; align-items: center; gap: 0.5rem;
          margin-bottom: 0.3rem;
          flex-wrap: wrap;
        }
        .me-verif-glyph { font-size: 1rem; }
        .me-verif-kind {
          font-family: ui-monospace, monospace;
          font-size: 0.74rem; font-weight: 700;
          letter-spacing: 0.1em;
          color: rgba(216,217,230,0.92);
        }
        .me-verif-status {
          margin-left: auto;
          font-family: ui-monospace, monospace;
          font-size: 0.58rem; font-weight: 800;
          letter-spacing: 0.2em;
        }
        .status-pending  { color: #F4C95D; }
        .status-approved { color: #5DCAA5; }
        .status-rejected { color: #ff8b7e; }
        .me-verif-school {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          color: #7DD3FC;
          font-size: 0.95rem;
          margin-bottom: 0.2rem;
        }
        .me-verif-claim {
          font-size: 0.84rem;
          color: rgba(216,217,230,0.82);
          margin: 0 0 0.35rem;
          line-height: 1.5;
          white-space: pre-wrap;
        }
        .me-verif-reason {
          font-family: ui-monospace, monospace;
          font-size: 0.72rem;
          color: #ff8b7e;
          padding: 0.35rem 0.5rem;
          background: rgba(255,107,91,0.08);
          border: 1px solid rgba(255,107,91,0.25);
          border-radius: 0.3rem;
          margin: 0.3rem 0;
        }
        .me-verif-time {
          font-family: ui-monospace, monospace;
          font-size: 0.66rem;
          color: rgba(148,163,184,0.55);
        }

        /* RITUAL */
        .me-ritual { margin: 0; display: flex; flex-direction: column; gap: 0.65rem; }
        .me-ritual-row {
          display: grid;
          grid-template-columns: 9rem 1fr;
          gap: 0.85rem;
          padding-bottom: 0.55rem;
          border-bottom: 1px dashed rgba(255,255,255,0.05);
        }
        .me-ritual-row:last-child { border-bottom: none; padding-bottom: 0; }
        .me-ritual-row dt {
          font-family: ui-monospace, monospace;
          font-size: 0.62rem; font-weight: 700;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: rgba(148,163,184,0.7);
          padding-top: 0.2rem;
        }
        .me-ritual-row dd {
          margin: 0;
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 1.02rem;
          color: #f3f3fb;
          line-height: 1.5;
          white-space: pre-wrap;
        }
        .me-ritual-long dd { font-style: normal; font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif; font-size: 0.94rem; color: rgba(216,217,230,0.92); }
        @media (max-width: 540px) {
          .me-ritual-row { grid-template-columns: 1fr; gap: 0.25rem; }
        }

        /* ACTIVITY */
        .me-activity { display: flex; gap: 1.5rem; flex-wrap: wrap; }
        .me-stat { display: flex; flex-direction: column; gap: 0.15rem; min-width: 6rem; }
        .me-stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 2.2rem; font-weight: 600;
          color: #f3f3fb;
          line-height: 1;
        }
        .me-stat-label {
          font-family: ui-monospace, monospace;
          font-size: 0.66rem;
          color: rgba(148,163,184,0.7);
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }
      `}</style>
    </main>
  );
}
