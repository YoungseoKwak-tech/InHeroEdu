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
  const { error } = await supabase
    .from("profiles")
    .upsert({ id: user.id, ...profile }, { onConflict: "id" });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, profile });
}
