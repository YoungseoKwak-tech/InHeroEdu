"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createBrowserClient } from "@/lib/supabase";
import { authFetch } from "@/lib/client-auth";

interface Props {
  slug: string;
  initialIsMember: boolean;
  accent: string;
}

export default function ClubJoinButton({ slug, initialIsMember, accent }: Props) {
  const [isMember, setIsMember] = useState(initialIsMember);
  const [authStatus, setAuthStatus] = useState<"loading" | "out" | "no_profile" | "ok">("loading");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    async function probe() {
      try {
        const supabase = createBrowserClient();
        const { data: { session } } = await supabase.auth.getSession();
        if (!mounted) return;
        if (!session) { setAuthStatus("out"); return; }
        const [profileRes, clubRes] = await Promise.all([
          fetch("/api/profile/me", {
            headers: { Authorization: `Bearer ${session.access_token}` },
            cache: "no-store",
          }),
          fetch(`/api/clubs/${slug}`, {
            headers: { Authorization: `Bearer ${session.access_token}` },
            cache: "no-store",
          }),
        ]);
        const profileJson = await profileRes.json().catch(() => ({}));
        const clubJson = await clubRes.json().catch(() => ({}));
        if (!mounted) return;
        if (profileJson?.profile?.handle) setAuthStatus("ok");
        else setAuthStatus("no_profile");
        if (typeof clubJson?.isMember === "boolean") setIsMember(clubJson.isMember);
      } catch {
        if (mounted) setAuthStatus("out");
      }
    }
    void probe();
    return () => { mounted = false; };
  }, [slug]);

  async function toggle() {
    if (pending || authStatus !== "ok") return;
    setPending(true);
    setError(null);
    try {
      const res = await authFetch(`/api/clubs/${slug}/join`, { method: "POST" });
      const json = await res.json();
      if (!res.ok || json.ok !== true) throw new Error(json.error ?? `HTTP ${res.status}`);
      setIsMember(json.isMember);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setPending(false);
    }
  }

  if (authStatus === "loading") {
    return <button type="button" disabled className="cjb-btn cjb-btn-ghost" style={{ ["--accent" as string]: accent }}>…</button>;
  }
  if (authStatus === "out") {
    return (
      <div className="cjb-shell">
        <span className="cjb-hint">Sign in to claim a seat in this room.</span>
        <style>{styles}</style>
      </div>
    );
  }
  if (authStatus === "no_profile") {
    return (
      <div className="cjb-shell">
        <Link href="/onboarding" className="cjb-btn cjb-btn-yellow">Claim your handle first →</Link>
        <style>{styles}</style>
      </div>
    );
  }

  return (
    <div className="cjb-shell">
      <button
        type="button"
        onClick={() => void toggle()}
        disabled={pending}
        className={`cjb-btn ${isMember ? "cjb-btn-ghost" : "cjb-btn-primary"}`}
        style={{ ["--accent" as string]: accent }}
      >
        {pending ? "…" : isMember ? "✓ You're in — leave room" : "Take a seat in this room →"}
      </button>
      {error && <span className="cjb-error">{error}</span>}
      <style>{styles}</style>
    </div>
  );
}

const styles = `
  .cjb-shell { display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; }
  .cjb-btn {
    --accent: #5eead4;
    display: inline-flex; align-items: center;
    font-family: ui-monospace, monospace;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    text-decoration: none;
    padding: 0.7rem 1.05rem;
    border-radius: 0.45rem;
    cursor: pointer;
    transition: filter 0.15s, box-shadow 0.2s, color 0.15s, background 0.15s, border-color 0.15s;
  }
  .cjb-btn-primary {
    background: var(--accent);
    color: #0a0a10;
    border: 0;
  }
  .cjb-btn-primary:hover:not(:disabled) {
    filter: brightness(1.08);
    box-shadow: 0 0 22px color-mix(in srgb, var(--accent) 45%, transparent);
  }
  .cjb-btn-ghost {
    background: transparent;
    color: color-mix(in srgb, var(--accent) 85%, white 15%);
    border: 1px solid color-mix(in srgb, var(--accent) 45%, transparent);
  }
  .cjb-btn-ghost:hover:not(:disabled) {
    border-color: var(--accent);
    background: color-mix(in srgb, var(--accent) 8%, transparent);
  }
  .cjb-btn-yellow {
    background: #F4C95D;
    color: #0a0a10;
    border: 0;
  }
  .cjb-btn-yellow:hover { filter: brightness(1.08); box-shadow: 0 0 18px rgba(244,201,93,0.4); }
  .cjb-btn:disabled { opacity: 0.45; cursor: default; }
  .cjb-hint {
    font-family: ui-monospace, monospace;
    font-size: 0.78rem;
    color: rgba(148,163,184,0.75);
  }
  .cjb-error {
    font-family: ui-monospace, monospace;
    font-size: 0.72rem;
    color: #ff8b7e;
  }
`;
