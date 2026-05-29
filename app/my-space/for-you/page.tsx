"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { authFetch } from "@/lib/client-auth";
import StudyProfileSetup, {
  type StudyProfileValue,
} from "@/components/my-space/StudyProfileSetup";
import StudyBriefView, {
  type BriefData,
  type BriefResourceMap,
} from "@/components/my-space/StudyBriefView";

type ProfileState =
  | { kind: "loading" }
  | { kind: "missing" }
  | { kind: "ready"; profile: StudyProfileValue };

type BriefState =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "ready"; brief: BriefData; resources: BriefResourceMap; source: "cache" | "fresh" }
  | { kind: "error"; message: string; reason?: string };

export default function ForYouPage() {
  const [profile, setProfile] = useState<ProfileState>({ kind: "loading" });
  const [brief, setBrief] = useState<BriefState>({ kind: "idle" });
  const [showSetup, setShowSetup] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Initial profile probe.
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await authFetch("/api/my-space/profile");
        if (!res.ok) throw new Error(await res.text());
        const json = (await res.json()) as { profile: StudyProfileValue | null };
        if (!alive) return;
        if (!json.profile) {
          setProfile({ kind: "missing" });
        } else {
          setProfile({ kind: "ready", profile: json.profile });
        }
      } catch {
        if (alive) setProfile({ kind: "missing" });
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const loadBrief = useCallback(async (force: boolean) => {
    if (force) setRefreshing(true);
    setBrief({ kind: "loading" });
    try {
      const res = await authFetch(
        `/api/my-space/generate-brief${force ? "?force=true" : ""}`,
        { method: "POST" }
      );
      const json = await res.json();
      if (!res.ok) {
        throw Object.assign(new Error(json?.error ?? "Failed"), { reason: json?.reason });
      }
      setBrief({
        kind: "ready",
        brief: json.brief,
        resources: json.resources ?? {},
        source: json.source,
      });
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      const reason = (e as { reason?: string }).reason;
      setBrief({ kind: "error", message: msg, reason });
    } finally {
      setRefreshing(false);
    }
  }, []);

  // Auto-fetch brief once profile is confirmed.
  useEffect(() => {
    if (profile.kind === "ready" && brief.kind === "idle") {
      void loadBrief(false);
    }
  }, [profile.kind, brief.kind, loadBrief]);

  // ─── Render ──────────────────────────────────────────────────────
  if (profile.kind === "loading") {
    return <BriefSkeleton />;
  }

  if (profile.kind === "missing") {
    return (
      <>
        <NoProfileEmptyState onSetup={() => setShowSetup(true)} />
        {showSetup && (
          <StudyProfileSetup
            onComplete={(p) => {
              setProfile({ kind: "ready", profile: p });
              setShowSetup(false);
              setBrief({ kind: "idle" });
            }}
            onCancel={() => setShowSetup(false)}
          />
        )}
      </>
    );
  }

  return (
    <>
      <div className="fy-controls">
        <button
          type="button"
          className="fy-refresh"
          onClick={() => void loadBrief(true)}
          disabled={refreshing || brief.kind === "loading"}
          title="Regenerate your brief"
        >
          {refreshing ? "Regenerating your brief…" : "↻ Refresh"}
        </button>
        <button
          type="button"
          className="fy-edit"
          onClick={() => setShowSetup(true)}
        >
          Edit profile
        </button>
      </div>

      {brief.kind === "loading" && <BriefSkeleton />}

      {brief.kind === "error" && (
        <BriefError
          message={brief.message}
          reason={brief.reason}
          onRetry={() => void loadBrief(false)}
        />
      )}

      {brief.kind === "ready" && (
        <StudyBriefView
          brief={brief.brief}
          resources={brief.resources}
          source={brief.source}
        />
      )}

      {showSetup && (
        <StudyProfileSetup
          initial={profile.profile}
          onComplete={(p) => {
            setProfile({ kind: "ready", profile: p });
            setShowSetup(false);
            // Force regenerate so the new profile shows up immediately.
            void loadBrief(true);
          }}
          onCancel={() => setShowSetup(false)}
        />
      )}

      <style jsx>{`
        .fy-controls {
          display: flex;
          justify-content: flex-end;
          gap: 0.4rem;
          margin-bottom: 1rem;
        }
        .fy-refresh, .fy-edit {
          padding: 0.5rem 0.9rem;
          font-family: ui-monospace, monospace;
          font-size: 0.74rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          border-radius: 999px;
          cursor: pointer;
        }
        .fy-refresh {
          background: rgba(244, 201, 93, 0.16);
          color: #f4c95d;
          border: 1px solid rgba(244, 201, 93, 0.5);
        }
        .fy-refresh:hover:not(:disabled) { background: rgba(244, 201, 93, 0.24); }
        .fy-refresh:disabled { opacity: 0.6; cursor: default; }
        .fy-edit {
          background: transparent;
          color: rgba(216, 217, 230, 0.85);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .fy-edit:hover { color: #f3f3fb; border-color: rgba(255, 255, 255, 0.22); }
      `}</style>
    </>
  );
}

function NoProfileEmptyState({ onSetup }: { onSetup: () => void }) {
  return (
    <section className="np-wrap">
      <div className="np-empty">
        <div className="np-glow" aria-hidden="true">✨</div>
        <div className="np-title">Let AI build your study plan</div>
        <div className="np-sub">
          Tell us what you&apos;re studying and we&apos;ll surface what matters this week — drawn
          from your saves and the lounges you&apos;re part of.
        </div>
        <button type="button" className="np-cta" onClick={onSetup}>
          Set up my profile →
        </button>
        <div className="np-foot">
          <Link href="/my-space/saved" className="np-foot-link">
            ← Back to your saved archive
          </Link>
        </div>
      </div>
      <style jsx>{`
        .np-wrap { display: flex; justify-content: center; padding: 2rem 0; }
        .np-empty {
          display: flex; flex-direction: column; align-items: center;
          gap: 0.7rem; padding: 3.5rem 2rem; max-width: 36rem;
          text-align: center;
          background:
            radial-gradient(circle at 50% 0%, rgba(244,201,93,0.14), transparent 55%),
            linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01));
          border: 1px solid rgba(244, 201, 93, 0.28);
          border-radius: 1.1rem;
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.32);
        }
        .np-glow {
          font-size: 2.6rem; line-height: 1;
          filter: drop-shadow(0 0 18px rgba(244, 201, 93, 0.55));
          animation: np-pulse 2.4s ease-in-out infinite;
        }
        @keyframes np-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
        .np-title {
          font-family: Cormorant Garamond, serif;
          font-size: 1.65rem; font-weight: 600;
          color: #f3f3fb;
        }
        .np-sub {
          max-width: 44ch;
          font-size: 0.94rem; line-height: 1.55;
          color: rgba(216, 217, 230, 0.82);
        }
        .np-cta {
          margin-top: 0.4rem;
          padding: 0.7rem 1.2rem;
          background: #f4c95d;
          color: #111014;
          border: 0;
          border-radius: 999px;
          font-family: ui-monospace, monospace;
          font-size: 0.8rem; font-weight: 800; letter-spacing: 0.14em;
          cursor: pointer;
        }
        .np-cta:hover { filter: brightness(1.05); }
        .np-foot { margin-top: 1rem; }
        .np-foot-link {
          font-family: ui-monospace, monospace;
          font-size: 0.74rem; font-weight: 700; letter-spacing: 0.12em;
          color: rgba(148, 163, 184, 0.7);
          text-decoration: none;
        }
        .np-foot-link:hover { color: #5eead4; }
      `}</style>
    </section>
  );
}

function BriefSkeleton() {
  return (
    <div className="sk-wrap">
      <div className="sk-line sk-greeting" />
      <div className="sk-line sk-sub" />
      {[0, 1, 2].map((i) => (
        <div key={i} className="sk-section">
          <div className="sk-line sk-section-title" />
          <div className="sk-row">
            <div className="sk-card" />
            <div className="sk-card" />
            <div className="sk-card" />
          </div>
        </div>
      ))}
      <style jsx>{`
        .sk-wrap { padding: 0.5rem 0; }
        .sk-line {
          background: linear-gradient(110deg, rgba(255,255,255,0.04) 30%, rgba(255,255,255,0.09) 50%, rgba(255,255,255,0.04) 70%);
          background-size: 220% 100%;
          border-radius: 0.4rem;
          animation: sk-pulse 1.4s ease-in-out infinite;
        }
        .sk-greeting { height: 38px; width: min(28rem, 100%); margin-bottom: 0.7rem; }
        .sk-sub { height: 14px; width: 14rem; margin-bottom: 2rem; }
        .sk-section { margin-bottom: 2rem; }
        .sk-section-title { height: 22px; width: 18rem; margin-bottom: 0.8rem; }
        .sk-row { display: flex; gap: 1rem; overflow: hidden; }
        .sk-card {
          flex: 0 0 18rem;
          height: 280px;
          background: linear-gradient(110deg, rgba(255,255,255,0.04) 30%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.04) 70%);
          background-size: 220% 100%;
          border-radius: 0.7rem;
          animation: sk-pulse 1.4s ease-in-out infinite;
        }
        @keyframes sk-pulse {
          0% { background-position: 220% 0; }
          100% { background-position: 0 0; }
        }
      `}</style>
    </div>
  );
}

function BriefError({
  message,
  reason,
  onRetry,
}: {
  message: string;
  reason?: string;
  onRetry: () => void;
}) {
  const isUnavailable = reason === "missing_api_key" || reason === "model_error";
  const isRate = reason === "rate_limited";
  return (
    <div className="be-wrap">
      <div className="be-title">
        {isUnavailable
          ? "AI brief temporarily unavailable"
          : isRate
            ? "Daily refresh limit hit"
            : "Couldn't generate your brief"}
      </div>
      <div className="be-sub">
        {isRate
          ? "You've used today's refreshes. Tomorrow your cap resets."
          : message}
      </div>
      <div className="be-actions">
        <button type="button" className="be-retry" onClick={onRetry}>
          Try again
        </button>
        <Link href="/my-space/saved" className="be-back">
          ← Back to Saved
        </Link>
      </div>
      <style jsx>{`
        .be-wrap {
          padding: 2.5rem 1.5rem;
          margin: 1rem 0;
          text-align: center;
          background: rgba(255, 139, 126, 0.05);
          border: 1px solid rgba(255, 139, 126, 0.25);
          border-radius: 0.9rem;
        }
        .be-title {
          font-family: Cormorant Garamond, serif;
          font-size: 1.35rem;
          font-weight: 600;
          color: #f3f3fb;
          margin-bottom: 0.45rem;
        }
        .be-sub {
          max-width: 44ch;
          margin: 0 auto;
          font-size: 0.9rem;
          color: rgba(216, 217, 230, 0.75);
        }
        .be-actions {
          margin-top: 1rem;
          display: inline-flex;
          gap: 0.4rem;
        }
        .be-retry {
          padding: 0.55rem 1rem;
          background: #5eead4;
          color: #0a0a10;
          border: 0;
          border-radius: 999px;
          font-family: ui-monospace, monospace;
          font-size: 0.76rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          cursor: pointer;
        }
        .be-back {
          padding: 0.55rem 1rem;
          color: rgba(216, 217, 230, 0.7);
          font-family: ui-monospace, monospace;
          font-size: 0.74rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-decoration: none;
        }
        .be-back:hover { color: #5eead4; }
      `}</style>
    </div>
  );
}
