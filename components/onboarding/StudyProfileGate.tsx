"use client";

/**
 * StudyProfileGate — global post-login onboarding.
 *
 * The moment a user signs in (or lands anywhere already signed in)
 * without a grade + class list in user_study_profile, this opens
 * StudyProfileSetup and asks for both. Every account therefore reaches
 * the same dashboard with the same personalization inputs — no more
 * "who is this user?" blank states.
 *
 * Rules:
 *   - Requires grade AND ≥1 subject before it lets go (requireGradeAndSubject).
 *   - "Skip for now" hides it for the rest of the browser session
 *     (sessionStorage) — it re-asks next session until answered.
 *   - Skips identity-gated routes (/lounges, /trajectory, /clubs,
 *     /command-center) where HandleOnboardingModal owns the screen, and
 *     flow pages (/onboarding, /auth, /payment, /admin, /study-type)
 *     where a modal would interrupt.
 *   - Fires `inhero:study-profile-updated` on save so open pages
 *     (e.g. the dashboard) can refresh their personalization.
 */

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import StudyProfileSetup, {
  type StudyProfileValue,
} from "@/components/my-space/StudyProfileSetup";
import { authFetch, getClientSession } from "@/lib/client-auth";
import { createBrowserClient } from "@/lib/supabase";
import { courses } from "@/lib/data/courses";

const SKIP_PATH_PREFIXES = [
  "/lounges",
  "/trajectory",
  "/clubs",
  "/command-center",
  "/onboarding",
  "/auth",
  "/payment",
  "/admin",
  "/study-type",
  "/parents", // Korean parent portal — student grade/AP setup doesn't apply
];
const DISMISS_KEY = "spg_dismissed_session";

// Suggestion chips come from the live course catalog (published courses
// first), so what students pick matches dashboard subjects 1:1.
const CATALOG_SUGGESTIONS = [
  ...courses.filter((c) => c.firstLessonId).map((c) => c.subjectEn),
  ...courses.filter((c) => !c.firstLessonId).map((c) => c.subjectEn),
].slice(0, 12);

export default function StudyProfileGate() {
  const supabase = createBrowserClient();
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(DISMISS_KEY) === "1") setDismissed(true);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    async function probe() {
      try {
        const session = await getClientSession();
        if (!session?.user) {
          if (mounted) setOpen(false);
          return;
        }
        const res = await authFetch("/api/my-space/profile");
        if (!res.ok || !mounted) return;
        const json = (await res.json()) as {
          profile: { grade: string | null; subjects: string[] } | null;
        };
        if (!mounted) return;
        const p = json.profile;
        const complete = !!p?.grade && (p?.subjects?.length ?? 0) > 0;
        setOpen(!complete);
      } catch {
        // Signed-out race or transient failure — stay closed, retry on
        // the next auth state change.
      }
    }

    void probe();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session?.user) {
        setOpen(false);
        return;
      }
      // A fresh sign-in clears any earlier "skip for now" — the ask
      // should happen right at login, every login, until answered.
      if (event === "SIGNED_IN") {
        try {
          window.sessionStorage.removeItem(DISMISS_KEY);
        } catch {
          // ignore
        }
        setDismissed(false);
      }
      void probe();
    });
    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  function skipForSession() {
    try {
      window.sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // ignore
    }
    setDismissed(true);
  }

  const onSkippedPath = SKIP_PATH_PREFIXES.some((p) => pathname.startsWith(p));
  if (!open || dismissed || onSkippedPath) return null;

  return (
    <StudyProfileSetup
      eyebrow="WELCOME · QUICK SETUP"
      title="What grade are you in — and what are you taking?"
      subtitle="Pick your grade and the classes you're studying for. Your dashboard, study plan, and recommendations are built from this."
      ctaLabel="Save & start →"
      cancelLabel="Skip for now"
      suggestions={CATALOG_SUGGESTIONS}
      requireGradeAndSubject
      onCancel={skipForSession}
      onComplete={(profile: StudyProfileValue) => {
        setOpen(false);
        try {
          window.dispatchEvent(
            new CustomEvent("inhero:study-profile-updated", { detail: profile })
          );
        } catch {
          // ignore
        }
      }}
    />
  );
}
