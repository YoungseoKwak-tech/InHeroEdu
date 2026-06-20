import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";

/**
 * POST /api/textbooks/notify  { slug }
 *
 * Records that the signed-in user wants to be notified when a 런칭 예정
 * (coming-soon) textbook launches. Stored on the user's auth user_metadata
 * (schema-safe, no table needed) as a deduped slug list; admin can read it to
 * send a launch announcement.
 */
export async function POST(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const body = await req.json().catch(() => ({}));
  const slug = (typeof body.slug === "string" ? body.slug : "").trim();
  if (!slug) return NextResponse.json({ error: "slug required" }, { status: 400 });

  const supabase = createAdminClient();
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
    console.error("[textbooks/notify]", e);
    return NextResponse.json({ error: "unable to save" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}

/** Returns whether the signed-in user already requested notify for ?slug=. */
export async function GET(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;
  const slug = new URL(req.url).searchParams.get("slug")?.trim();
  const supabase = createAdminClient();
  try {
    const { data } = await supabase.auth.admin.getUserById(user.id);
    const list = (data?.user?.user_metadata?.textbookLaunchNotify as unknown[]) ?? [];
    const notified = Array.isArray(list) && !!slug && list.includes(slug);
    return NextResponse.json({ notified });
  } catch {
    return NextResponse.json({ notified: false });
  }
}
