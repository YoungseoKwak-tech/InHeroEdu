"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authFetch, getClientSession } from "@/lib/client-auth";
import { deriveSlugFromName, validateClubSlug } from "@/lib/clubs";

const GLYPH_OPTIONS = ["✦", "◆", "◊", "⬢", "⌬", "✧", "⌖", "❖", "⬣", "⬡"];
const ACCENT_OPTIONS = [
  "#5eead4", "#F4C95D", "#A99CFF", "#5DCAA5",
  "#FF8B7E", "#7DD3FC", "#FB7185", "#FACC15",
];

export default function NewClubPage() {
  const router = useRouter();
  const [auth, setAuth] = useState<"loading" | "out" | "no_profile" | "ok">("loading");
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [mission, setMission] = useState("");
  const [heroBlurb, setHeroBlurb] = useState("");
  const [glyph, setGlyph] = useState(GLYPH_OPTIONS[0]);
  const [accent, setAccent] = useState(ACCENT_OPTIONS[0]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    async function probe() {
      try {
        const session = await getClientSession();
        if (!mounted) return;
        if (!session) { setAuth("out"); return; }
        const res = await fetch("/api/profile/me", {
          headers: { Authorization: `Bearer ${session.access_token}` },
          cache: "no-store",
        });
        const json = await res.json().catch(() => ({}));
        if (!mounted) return;
        if (json?.profile?.handle) setAuth("ok");
        else setAuth("no_profile");
      } catch {
        if (mounted) setAuth("out");
      }
    }
    void probe();
    return () => { mounted = false; };
  }, []);

  // Auto-derive slug from name until user touches the slug field manually.
  useEffect(() => {
    if (!slugTouched) setSlug(deriveSlugFromName(name));
  }, [name, slugTouched]);

  const slugCheck = slug ? validateClubSlug(slug) : null;
  const slugError = slugCheck && !slugCheck.ok ? slugCheck.reason : null;
  const nameValid = name.trim().length >= 3 && name.trim().length <= 60;
  const missionValid = mission.trim().length >= 10 && mission.trim().length <= 400;
  const blurbValid = heroBlurb.trim().length <= 200;
  const canSubmit =
    auth === "ok" &&
    nameValid && missionValid && blurbValid &&
    !!slugCheck?.ok && !saving;

  async function submit() {
    if (!canSubmit) return;
    setSaving(true);
    setError(null);
    try {
      const res = await authFetch("/api/clubs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          slug: slugCheck && slugCheck.ok ? slugCheck.slug : undefined,
          mission: mission.trim(),
          heroBlurb: heroBlurb.trim() || null,
          glyph,
          accent,
        }),
      });
      const json = await res.json();
      if (!res.ok || json.ok !== true) throw new Error(json.error ?? `HTTP ${res.status}`);
      router.replace(`/clubs/${json.club.slug}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setSaving(false);
    }
  }

  return (
    <main className="nc-root" style={{ ["--accent" as string]: accent }}>
      <div className="nc-shell">
        <Link href="/clubs" className="nc-back">← All clubs</Link>
        <div className="nc-stamp"><span className="nc-pulse" /><span>CLUBS · FOUND A NEW ROOM</span></div>
        <h1 className="nc-title">
          Start a <em>club</em> the cohort will want to belong to.
        </h1>
        <p className="nc-sub">
          You become the founder. Invite co-founders + a secretary, log meetings, build a record.
        </p>

        {auth === "loading" && <div className="nc-loading">Checking your session…</div>}
        {auth === "out" && (
          <div className="nc-gate">
            <strong>Sign in to found a club.</strong>
            <Link href="/" className="nc-link">← Back to home</Link>
          </div>
        )}
        {auth === "no_profile" && (
          <div className="nc-gate">
            <strong>Claim your trajectory handle first.</strong>
            <Link href="/onboarding" className="nc-btn-yellow">Claim your handle →</Link>
          </div>
        )}

        {auth === "ok" && (
          <>
            <section className="nc-section">
              <label className="nc-label">Name <span className="nc-len">{name.length}/60</span></label>
              <input
                type="text"
                className="nc-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={60}
                placeholder="e.g. The Microscopy Guild"
              />
            </section>

            <section className="nc-section">
              <label className="nc-label">URL slug <span className="nc-len">/clubs/{slug || "—"}</span></label>
              <input
                type="text"
                className="nc-input nc-input-mono"
                value={slug}
                onChange={(e) => { setSlug(e.target.value.toLowerCase()); setSlugTouched(true); }}
                maxLength={32}
                placeholder="microscopy-guild"
              />
              {slugError && <p className="nc-warn">{slugError}</p>}
            </section>

            <section className="nc-section">
              <label className="nc-label">Mission <span className="nc-len">{mission.length}/400</span></label>
              <textarea
                rows={3}
                className="nc-input"
                value={mission}
                onChange={(e) => setMission(e.target.value)}
                maxLength={400}
                placeholder="What kind of student belongs here, and what do they do together?"
              />
            </section>

            <section className="nc-section">
              <label className="nc-label">Hero blurb (optional) <span className="nc-len">{heroBlurb.length}/200</span></label>
              <input
                type="text"
                className="nc-input"
                value={heroBlurb}
                onChange={(e) => setHeroBlurb(e.target.value)}
                maxLength={200}
                placeholder="A one-line tagline that sounds like the room."
              />
            </section>

            <section className="nc-section">
              <label className="nc-label">Glyph</label>
              <div className="nc-glyph-row">
                {GLYPH_OPTIONS.map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setGlyph(g)}
                    className={`nc-glyph ${glyph === g ? "is-active" : ""}`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </section>

            <section className="nc-section">
              <label className="nc-label">Accent color</label>
              <div className="nc-accent-row">
                {ACCENT_OPTIONS.map((a) => (
                  <button
                    key={a}
                    type="button"
                    onClick={() => setAccent(a)}
                    className={`nc-accent ${accent === a ? "is-active" : ""}`}
                    style={{ background: a }}
                    aria-label={a}
                  />
                ))}
              </div>
            </section>

            {error && <div className="nc-error">{error}</div>}

            <div className="nc-foot">
              <Link href="/clubs" className="nc-btn-ghost">Cancel</Link>
              <button
                type="button"
                disabled={!canSubmit}
                onClick={() => void submit()}
                className="nc-btn-primary"
              >
                {saving ? "Founding…" : "FOUND THIS CLUB →"}
              </button>
            </div>
          </>
        )}
      </div>

      <style>{`
        .nc-root {
          --accent: #5eead4;
          min-height: 100vh;
          padding: 3rem 1.25rem 5rem;
          background: radial-gradient(ellipse 70% 40% at 50% 0%, color-mix(in srgb, var(--accent) 10%, transparent), transparent 60%), #050610;
          color: #d8d9e6;
          font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif;
        }
        .nc-shell {
          max-width: 38rem; margin: 0 auto;
          padding: 1.85rem 1.75rem 1.65rem;
          background: linear-gradient(180deg, #0a0e1a 0%, #050610 100%);
          border: 1px solid color-mix(in srgb, var(--accent) 22%, transparent);
          border-radius: 1rem;
          box-shadow: 0 32px 80px rgba(0,0,0,0.7);
        }
        .nc-back {
          display: inline-block;
          font-family: ui-monospace, monospace;
          font-size: 0.68rem; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(148,163,184,0.7);
          text-decoration: none;
          margin-bottom: 1.1rem;
          transition: color 0.15s;
        }
        .nc-back:hover { color: var(--accent); }
        .nc-stamp {
          display: inline-flex; align-items: center; gap: 0.55rem;
          font-family: ui-monospace, monospace;
          font-size: 0.62rem; font-weight: 700;
          letter-spacing: 0.22em; text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 0.7rem;
        }
        .nc-pulse {
          width: 7px; height: 7px; border-radius: 50%;
          background: var(--accent);
          box-shadow: 0 0 10px color-mix(in srgb, var(--accent) 60%, transparent);
          animation: nc-pulse 1.6s ease-in-out infinite;
        }
        @keyframes nc-pulse { 0%,100% { opacity: 0.55; transform: scale(0.85); } 50% { opacity: 1; transform: scale(1.15); } }
        .nc-title {
          font-family: 'Cormorant Garamond', 'Georgia', serif;
          font-size: 1.85rem; font-weight: 600;
          color: #f3f3fb; margin: 0 0 0.5rem;
          letter-spacing: -0.015em; line-height: 1.15;
        }
        .nc-title em { font-style: italic; color: var(--accent); }
        .nc-sub { font-size: 0.9rem; color: #94a3b8; margin: 0 0 1.5rem; line-height: 1.55; }

        .nc-loading, .nc-gate {
          padding: 0.85rem 1rem;
          background: rgba(244,201,93,0.06);
          border: 1px solid rgba(244,201,93,0.25);
          border-radius: 0.5rem;
          color: #F4C95D;
          font-size: 0.85rem;
        }
        .nc-gate { display: flex; flex-direction: column; gap: 0.6rem; }
        .nc-link { color: #5eead4; text-decoration: none; font-family: ui-monospace, monospace; font-size: 0.74rem; }
        .nc-link:hover { text-decoration: underline; }
        .nc-btn-yellow {
          display: inline-block;
          background: #F4C95D; color: #0a0a10;
          padding: 0.55rem 0.85rem; border-radius: 0.4rem;
          font-family: ui-monospace, monospace;
          font-size: 0.72rem; font-weight: 700; letter-spacing: 0.14em;
          text-transform: uppercase; text-decoration: none;
        }

        .nc-section { display: flex; flex-direction: column; gap: 0.45rem; margin-bottom: 1.1rem; }
        .nc-label {
          font-family: ui-monospace, monospace;
          font-size: 0.65rem; font-weight: 700;
          letter-spacing: 0.18em; text-transform: uppercase;
          color: rgba(148,163,184,0.85);
          display: flex; justify-content: space-between; align-items: center;
        }
        .nc-len {
          font-weight: 500; color: rgba(148,163,184,0.55);
          letter-spacing: 0.05em; text-transform: none;
        }
        .nc-input {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 0.5rem;
          padding: 0.65rem 0.85rem;
          color: #f3f3fb;
          font-family: inherit;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.2s;
        }
        .nc-input:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 1px var(--accent), 0 0 14px color-mix(in srgb, var(--accent) 25%, transparent);
        }
        .nc-input-mono { font-family: ui-monospace, monospace; font-size: 0.88rem; }
        .nc-warn { font-family: ui-monospace, monospace; font-size: 0.72rem; color: #ff8b7e; margin: 0; }

        .nc-glyph-row, .nc-accent-row { display: flex; gap: 0.4rem; flex-wrap: wrap; }
        .nc-glyph {
          width: 2.4rem; height: 2.4rem;
          font-size: 1.2rem;
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 0.45rem;
          color: #d8d9e6;
          cursor: pointer;
          transition: border-color 0.15s, color 0.15s, background 0.15s;
        }
        .nc-glyph:hover { border-color: var(--accent); color: var(--accent); }
        .nc-glyph.is-active {
          border-color: var(--accent);
          color: var(--accent);
          background: color-mix(in srgb, var(--accent) 12%, transparent);
          box-shadow: 0 0 0 1px var(--accent);
        }
        .nc-accent {
          width: 2rem; height: 2rem;
          border-radius: 50%;
          border: 2px solid transparent;
          cursor: pointer;
          transition: transform 0.15s, border-color 0.15s, box-shadow 0.2s;
        }
        .nc-accent:hover { transform: scale(1.1); }
        .nc-accent.is-active {
          border-color: #fff;
          box-shadow: 0 0 18px currentColor;
        }

        .nc-error {
          padding: 0.55rem 0.7rem;
          background: rgba(255,107,91,0.08);
          border: 1px solid rgba(255,107,91,0.3);
          border-radius: 0.4rem;
          color: #ff8b7e;
          font-family: ui-monospace, monospace;
          font-size: 0.78rem;
          margin-bottom: 0.9rem;
          line-height: 1.5;
          word-break: break-word;
        }

        .nc-foot {
          display: flex; justify-content: space-between; gap: 0.6rem;
          margin-top: 0.4rem;
        }
        .nc-btn-primary {
          font-family: ui-monospace, monospace;
          font-size: 0.74rem; font-weight: 700;
          letter-spacing: 0.16em; text-transform: uppercase;
          padding: 0.75rem 1.15rem;
          color: #0a0a10; background: var(--accent);
          border: 0; border-radius: 0.45rem;
          cursor: pointer;
          transition: filter 0.15s, box-shadow 0.2s;
        }
        .nc-btn-primary:hover:not(:disabled) {
          filter: brightness(1.08);
          box-shadow: 0 0 22px color-mix(in srgb, var(--accent) 50%, transparent);
        }
        .nc-btn-primary:disabled { opacity: 0.4; cursor: default; }
        .nc-btn-ghost {
          font-family: ui-monospace, monospace;
          font-size: 0.72rem; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase;
          padding: 0.75rem 0.95rem;
          color: rgba(148,163,184,0.85);
          background: transparent;
          border: 1px solid rgba(148,163,184,0.2);
          border-radius: 0.45rem;
          text-decoration: none;
        }
        .nc-btn-ghost:hover { color: #fff; border-color: var(--accent); }
      `}</style>
    </main>
  );
}
