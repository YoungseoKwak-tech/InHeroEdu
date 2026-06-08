import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { normalizeProfileFields } from "@/lib/profile";
import { createAdminClient } from "@/lib/supabase";
import { sendWelcomeAlimtalk } from "@/lib/solapi";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const body = await req.json().catch(() => ({}));
  const profile = normalizeProfileFields(body ?? {});

  const supabase = createAdminClient();

  // Stamp marketing_consent_at when consent is granted.
  const row: Record<string, unknown> = { id: user.id, ...profile };
  if (profile.marketing_consent) row.marketing_consent_at = new Date().toISOString();

  let { error } = await supabase.from("profiles").upsert(row, { onConflict: "id" });

  // Backward-compat fallback if the new columns aren't migrated yet on this DB.
  if (error && /(referral_student_email|phone|marketing_consent|welcome_sent_at)/i.test(error.message)) {
    const fallbackProfile = {
      id: user.id,
      name: profile.name,
      grade: profile.grade,
      school: profile.school,
    };
    const retry = await supabase.from("profiles").upsert(fallbackProfile, { onConflict: "id" });
    error = retry.error ?? null;
  }

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Fire the one-time welcome 알림톡 — only when a phone is present and we have
  // not sent it before. Guarded by welcome_sent_at so repeated profile
  // upserts (every login) never double-send. Best-effort: never block signup.
  if (profile.phone) {
    void maybeSendWelcome(supabase, user.id, profile.name, profile.phone);
  }

  return NextResponse.json({ success: true, profile });
}

async function maybeSendWelcome(
  supabase: ReturnType<typeof createAdminClient>,
  userId: string,
  name: string | null,
  phone: string
): Promise<void> {
  try {
    const { data } = await supabase
      .from("profiles")
      .select("welcome_sent_at")
      .eq("id", userId)
      .maybeSingle();
    // Column may not exist yet (pre-migration) — skip silently in that case.
    if (!data || (data as { welcome_sent_at?: string | null }).welcome_sent_at) return;

    const result = await sendWelcomeAlimtalk({ phone, name });
    // Mark as sent for real sends; leave unmarked on dry_run so it goes out
    // once the keys are configured.
    if (result.ok && !result.dryRun) {
      await supabase
        .from("profiles")
        .update({ welcome_sent_at: new Date().toISOString() })
        .eq("id", userId);
    }
  } catch {
    /* best-effort: welcome notification must never break signup */
  }
}
