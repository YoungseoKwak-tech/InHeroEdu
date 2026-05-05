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

  globalThis.__inheroBrowserSupabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  return globalThis.__inheroBrowserSupabase;
}

// Server-side admin client (API routes only — service role key, no session persistence).
export function createAdminClient(): SupabaseClient {
  if (globalThis.__inheroAdminSupabase) return globalThis.__inheroAdminSupabase;

  globalThis.__inheroAdminSupabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );

  return globalThis.__inheroAdminSupabase;
}
