"use client";

/**
 * Silent client-only redirector.
 *
 * If the viewer is signed in:
 *   - has a study plan → /my-plan
 *   - no study plan    → /onboarding/study-plan
 *
 * Anonymous viewers see the marketing landing page unchanged.
 * Embedded inside <HomePage /> so the landing doesn't need to
 * become a server component.
 */

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { createBrowserClient } from "@/lib/supabase";
import { authFetch } from "@/lib/client-auth";

export default function SignedInRedirector() {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createBrowserClient();

  useEffect(() => {
    if (pathname !== "/") return;
    let cancelled = false;
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (cancelled || !session?.user) return;
      try {
        const res = await authFetch("/api/generate-plan");
        if (cancelled) return;
        if (res.ok) {
          const json = await res.json();
          router.replace(json?.plan ? "/my-plan" : "/onboarding/study-plan");
        }
      } catch {
        // Silent — leave the landing page visible if the check fails.
      }
    })();
    return () => { cancelled = true; };
  }, [pathname, router, supabase]);

  return null;
}
