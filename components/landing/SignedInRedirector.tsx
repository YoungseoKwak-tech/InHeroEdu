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
import { authFetch, getClientSession } from "@/lib/client-auth";

async function readJsonSafely(res: Response): Promise<Record<string, unknown> | null> {
  const text = await res.text().catch(() => "");
  if (!text) return null;
  try {
    return JSON.parse(text) as Record<string, unknown>;
  } catch {
    return null;
  }
}

async function checkPlan(): Promise<Record<string, unknown> | null> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 8_000);

  try {
    const res = await authFetch("/api/generate-plan", {
      signal: controller.signal,
    });
    if (!res.ok) return null;
    return readJsonSafely(res);
  } finally {
    window.clearTimeout(timeout);
  }
}

export default function SignedInRedirector() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") return;
    let cancelled = false;
    (async () => {
      const session = await getClientSession();
      if (cancelled || !session?.user) return;
      try {
        const json = await checkPlan();
        if (cancelled) return;
        if (json) {
          router.replace(json.plan ? "/my-plan" : "/onboarding/study-plan");
        }
      } catch {
        // Silent — leave the landing page visible if the check fails.
      }
    })();
    return () => { cancelled = true; };
  }, [pathname, router]);

  return null;
}
