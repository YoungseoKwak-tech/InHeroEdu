import { createClient } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";

declare global {
  // eslint-disable-next-line no-var
  var __inheroBrowserSupabase: SupabaseClient | undefined;
  // eslint-disable-next-line no-var
  var __inheroAdminSupabase: SupabaseClient | undefined;
}

// Browser client — true singleton across HMR cycles and SSR/client hydration.
// Always stored on globalThis so module re-evaluation never creates a second instance.
export function createBrowserClient(): SupabaseClient {
  if (globalThis.__inheroBrowserSupabase) return globalThis.__inheroBrowserSupabase;

  const supabaseUrl = normalizeSupabaseEnvValue(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    "NEXT_PUBLIC_SUPABASE_URL"
  );
  const supabaseAnonKey = normalizeSupabaseEnvValue(
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    "NEXT_PUBLIC_SUPABASE_ANON_KEY"
  );

  globalThis.__inheroBrowserSupabase = createClient(
    supabaseUrl,
    supabaseAnonKey
  );

  return globalThis.__inheroBrowserSupabase;
}

// Server-side admin client (API routes only — service role key, no session persistence).
// NOTE: we deliberately do NOT cache this on globalThis. A singleton across
// Lambda invocations was returning stale query results for newly-written rows
// (writes succeeded, immediate read-back saw them, but a subsequent request
// did not — classic warm-instance state corruption).
export function createAdminClient(): SupabaseClient {
  const supabaseUrl = normalizeSupabaseEnvValue(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    "NEXT_PUBLIC_SUPABASE_URL"
  );
  const serviceRoleKey = normalizeSupabaseEnvValue(
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    "SUPABASE_SERVICE_ROLE_KEY"
  );

  return createClient(
    supabaseUrl,
    serviceRoleKey,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}

export function normalizeSupabaseEnvValue(
  value: string | undefined,
  name: string
): string {
  const normalized = value?.replace(/\\n/g, "").trim() ?? "";
  if (!normalized) {
    throw new Error(`Missing Supabase environment variable: ${name}`);
  }
  return normalized;
}
