import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";

/**
 * POST /api/textbooks/notify  { slug }
 *
 * Records that the signed-in user wants to be notified when a 런칭 예정
 * (coming-soon) textbook launches. Source of truth is the `waitlist_signups`
 * table — one row per (user email, textbook), with the textbook slug encoded
 * into `source` as `textbook:<slug>` and deduped by the unique
 * (lower(email), source) index. If that table is somehow unavailable we fall
 * back to the user's auth user_metadata so the flow never breaks.
 */

const SOURCE_PREFIX = "textbook:";

/** Postgres "relation does not exist" / PostgREST "table not found". */
function isMissingTable(err: unknown): boolean {
  const code = (err as { code?: string })?.code;
  return code === "PGRST205" || code === "42P01";
}

export async function POST(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const body = await req.json().catch(() => ({}));
  const slug = (typeof body.slug === "string" ? body.slug : "").trim();
  if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });

  const supabase = createAdminClient();

  // Primary path: waitlist_signups table.
  if (user.email) {
    const { error } = await supabase
      .from("waitlist_signups")
      .insert({ email: user.email, source: `${SOURCE_PREFIX}${slug}` });
    // 23505 = unique violation = already signed up → idempotent success.
    if (!error || error.code === "23505") return NextResponse.json({ ok: true });
    if (!isMissingTable(error)) {
      console.error("[textbooks/notify] insert", error);
      return NextResponse.json({ error: "unable to save" }, { status: 500 });
    }
    // table missing → fall through to metadata fallback
  }

  try {
    const { data: existing } = await supabase.auth.admin.getUserById(user.id);
    const meta = (existing?.user?.user_metadata ?? {}) as Record<string, unknown>;
    const prev = Array.isArray(meta.textbookLaunchNotify)
      ? (meta.textbookLaunchNotify as unknown[]).filter((s): s is string => typeof s === "string")
      : [];
    const next = Array.from(new Set([...prev, slug]));
    await supabase.auth.admin.updateUserById(user.id, {
      user_metadata: { ...meta, textbookLaunchNotify: next },
    });
  } catch (e) {
    console.error("[textbooks/notify] fallback", e);
    return NextResponse.json({ error: "unable to save" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}

/** Returns whether the signed-in user already requested notify for ?slug=. */
export async function GET(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;
  const slug = new URL(req.url).searchParams.get("slug")?.trim();
  if (!slug) return NextResponse.json({ notified: false });

  const supabase = createAdminClient();

  // Primary path: waitlist_signups table.
  if (user.email) {
    const { data, error } = await supabase
      .from("waitlist_signups")
      .select("id")
      .eq("email", user.email)
      .eq("source", `${SOURCE_PREFIX}${slug}`)
      .limit(1);
    if (!error) return NextResponse.json({ notified: (data?.length ?? 0) > 0 });
    if (!isMissingTable(error)) {
      console.error("[textbooks/notify] select", error);
      return NextResponse.json({ notified: false });
    }
    // table missing → fall through to metadata fallback
  }

  try {
    const { data } = await supabase.auth.admin.getUserById(user.id);
    const list = (data?.user?.user_metadata?.textbookLaunchNotify as unknown[]) ?? [];
    const notified = Array.isArray(list) && list.includes(slug);
    return NextResponse.json({ notified });
  } catch {
    return NextResponse.json({ notified: false });
  }
}
