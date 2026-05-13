"use client";

/**
 * /trajectory entry point.
 * - Logged-in + has profile  → client-side replace to /trajectory/{handle}
 * - Logged-in + no profile   → the global HandleOnboardingModal opens
 *                              and this page renders the placeholder copy
 * - Logged-out               → ComingSoonRoom placeholder + login prompt
 */

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authFetch } from "@/lib/client-auth";
import { createBrowserClient } from "@/lib/supabase";
import ComingSoonRoom from "@/components/landing/ComingSoonRoom";

export default function TrajectoryIndexPage() {
  const supabase = createBrowserClient();
  const router = useRouter();
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!mounted) return;
      const isAuthed = !!session?.user;
      setAuthed(isAuthed);
      if (!isAuthed) return;
      try {
        const res = await authFetch("/api/profile/me");
        if (!res.ok) return;
        const json = await res.json();
        if (json.ok && json.profile?.handle) {
          router.replace(`/trajectory/${encodeURIComponent(json.profile.handle)}`);
        }
      } catch {
        // silent
      }
    })();
    return () => { mounted = false; };
  }, [supabase, router]);

  // While probing, render the same placeholder so there's no FOUC.
  if (authed === false) {
    return (
      <ComingSoonRoom
        eyebrow="TRAJECTORY · IDENTITY LAYER LIVE"
        title="An identity for the version of you that's still arriving."
        italicWord="arriving"
        body="Sign in to claim your ambition handle. Lounge posts, club rooms, and resource drops will surface you everywhere by handle + badges + grad year."
        bullets={[
          "Pick your handle: CornellBio27 · FutureFounder17 · APChem5.",
          "Earn badges from real signals — verified AP 5, research, olympiad, founder.",
          "Show it on every lounge post and club room.",
        ]}
        accent="#F4C95D"
        backLabel="← Back to InHero"
      />
    );
  }

  // Authed but profile fetch in flight, or no profile yet (modal will take over).
  return (
    <main className="ti-root">
      <div className="ti-shell">
        <div className="ti-eyebrow">
          <span className="ti-pulse" />
          <span>CLAIMING YOUR TRAJECTORY</span>
        </div>
        <h1 className="ti-title">Setting things up.</h1>
        <p className="ti-body">
          Pick a handle in the popover if it's open, or refresh and we'll route you to your public profile.
        </p>
        <Link href="/" className="ti-link">← Back to InHero</Link>
      </div>

      <style>{`
        .ti-root {
          min-height: calc(100vh - 4rem);
          display: flex; align-items: center; justify-content: center;
          padding: 4rem 1.5rem;
          background: linear-gradient(180deg, #02040b 0%, #050710 100%);
          color: #d8d9e6;
          font-family: 'Space Grotesk', 'Inter', system-ui, sans-serif;
        }
        .ti-shell {
          max-width: 32rem;
          text-align: center;
        }
        .ti-eyebrow {
          display: inline-flex; align-items: center; gap: 0.55rem;
          font-family: ui-monospace, monospace;
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #F4C95D;
          margin-bottom: 0.85rem;
        }
        .ti-pulse {
          width: 7px; height: 7px; border-radius: 50%;
          background: #F4C95D;
          box-shadow: 0 0 10px rgba(244,201,93,0.7);
          animation: ti-pulse 1.6s ease-in-out infinite;
        }
        @keyframes ti-pulse {
          0%,100% { opacity: 0.55; transform: scale(0.85); }
          50%     { opacity: 1;    transform: scale(1.15); }
        }
        .ti-title {
          font-family: 'Cormorant Garamond', 'Georgia', serif;
          font-size: 2rem;
          font-style: italic;
          font-weight: 600;
          color: #f3f3fb;
          margin: 0 0 0.55rem;
          letter-spacing: -0.015em;
        }
        .ti-body { font-size: 0.92rem; color: #94a3b8; margin: 0 0 1rem; line-height: 1.5; }
        .ti-link {
          font-family: ui-monospace, monospace;
          font-size: 0.7rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: rgba(148,163,184,0.7);
          text-decoration: none;
        }
        .ti-link:hover { color: #F4C95D; }
      `}</style>
    </main>
  );
}
