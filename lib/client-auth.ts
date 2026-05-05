"use client";

import { createBrowserClient } from "@/lib/supabase";

export async function getAccessToken(): Promise<string | null> {
  const supabase = createBrowserClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session?.access_token ?? null;
}

async function getAccessTokenWithRetry(): Promise<string | null> {
  const first = await getAccessToken();
  if (first) return first;

  await new Promise((resolve) => setTimeout(resolve, 250));
  return getAccessToken();
}

export async function authFetch(
  input: RequestInfo | URL,
  init: RequestInit = {}
): Promise<Response> {
  const token = await getAccessTokenWithRetry();
  const headers = new Headers(init.headers);

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return fetch(input, { ...init, headers });
}
