import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { normalizeProfileFields } from "@/lib/profile";
import { createAdminClient } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const body = await req.json().catch(() => ({}));
  const profile = normalizeProfileFields(body ?? {});

  const supabase = createAdminClient();
  let { error } = await supabase
    .from("profiles")
    .upsert({ id: user.id, ...profile }, { onConflict: "id" });

  if (error && /referral_student_email/i.test(error.message)) {
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

  return NextResponse.json({ success: true, profile });
}
