"use client";

import type { Session } from "@supabase/supabase-js";
import { getCachedSession } from "@/lib/supabase";

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T | null> {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return Promise.race<T | null>([
    promise,
    new Promise<null>((resolve) => {
      timeoutId = setTimeout(() => resolve(null), ms);
    }),
  ]).finally(() => {
    if (timeoutId) clearTimeout(timeoutId);
  });
}

function readStoredSession(): Session | null {
  if (typeof window === "undefined") return null;

  const stores: Storage[] = [];
  try {
    stores.push(window.localStorage);
  } catch {
    // Browser privacy settings can block storage access.
  }
  try {
    stores.push(window.sessionStorage);
  } catch {
    // Browser privacy settings can block storage access.
  }

  for (const store of stores) {
    for (let i = 0; i < store.length; i += 1) {
      const key = store.key(i);
      if (!key || !key.startsWith("sb-") || !key.endsWith("-auth-token")) continue;

      try {
        const raw = store.getItem(key);
        if (!raw) continue;
        const parsed = JSON.parse(raw) as Partial<Session>;
        if (typeof parsed.access_token !== "string") continue;

        // Do not reuse clearly expired tokens. If Supabase can refresh it,
        // getCachedSession() will return the fresh session.
        if (
          typeof parsed.expires_at === "number" &&
          parsed.expires_at * 1000 < Date.now() + 30_000
        ) {
          continue;
        }

        return parsed as Session;
      } catch {
        // Ignore malformed/stale storage entries and keep scanning.
      }
    }
  }

  return null;
}

export async function getClientSession(): Promise<Session | null> {
  const session = await withTimeout(
    getCachedSession().catch((err) => {
      // eslint-disable-next-line no-console
      console.warn("[auth] Supabase session lock failed; falling back to stored token", err);
      return null;
    }),
    1800
  );

  return session ?? readStoredSession();
}

export async function getAccessToken(): Promise<string | null> {
  const session = await getClientSession();
  return session?.access_token ?? null;
}

async function getAccessTokenWithRetry(): Promise<string | null> {
  // Google OAuth can finish the code exchange before the browser client
  // has fully rehydrated the session. A short stepped retry prevents
  // authenticated pages from racing into a false 401.
  const delays = [0, 150, 350, 750, 1250];

  for (const delay of delays) {
    if (delay > 0) await sleep(delay);
    const token = await getAccessToken();
    if (token) return token;
  }

  return null;
}

export async function authFetch(
  input: RequestInfo | URL,
  init: RequestInit = {}
): Promise<Response> {
  const token = await getAccessTokenWithRetry();
  const headers = new Headers(init.headers);

  if (!headers.has("Accept")) {
    headers.set("Accept", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return fetch(input, {
    cache: "no-store",
    credentials: "same-origin",
    ...init,
    headers,
  });
}
