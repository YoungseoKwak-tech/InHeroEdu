/**
 * Resolve 학생/학부모 tier for QA authors WITHOUT a DB column — the tier lives
 * in auth user_metadata.role, so we look it up per author user_id at read time.
 * Used to badge nicknames in the lounge feed and question/answer threads.
 */
import type { SupabaseClient } from "@supabase/supabase-js";

export type QaRole = "student" | "parent";

export async function rolesByUserId(
  supabase: SupabaseClient,
  ids: (string | null | undefined)[]
): Promise<Record<string, QaRole>> {
  const uniq = [...new Set(ids.filter((x): x is string => !!x))];
  const out: Record<string, QaRole> = {};
  await Promise.all(
    uniq.map(async (id) => {
      try {
        const { data } = await supabase.auth.admin.getUserById(id);
        const r = (data?.user?.user_metadata as Record<string, unknown> | undefined)?.role;
        if (r === "student" || r === "parent") out[id] = r;
      } catch { /* ignore */ }
    })
  );
  return out;
}
