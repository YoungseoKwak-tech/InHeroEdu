import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";

// Seminar applications. The applied flag + timestamp live in `waitlist_signups`
// (source-tagged); the full quick-form payload is stored on the user's auth
// user_metadata (schema-safe, arbitrary JSON). Admin reads both.
const SOURCE = "seminar-2026-06-13";

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

export async function POST(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const email = (user.email ?? "").trim().toLowerCase();
  if (!email) return NextResponse.json({ error: "email required" }, { status: 400 });

  const body = await req.json().catch(() => ({}));
  const application = {
    role: str(body.role) || "학부모",
    name: str(body.name),
    phone: str(body.phone),
    grade: str(body.grade),
    school: str(body.school),
    memo: str(body.memo),
    appliedAt: new Date().toISOString(),
  };
  if (!application.name || !application.phone) {
    return NextResponse.json({ error: "name and phone required" }, { status: 400 });
  }

  const supabase = createAdminClient();

  // Save the form payload on the user's metadata (merge with existing).
  try {
    const { data: existing } = await supabase.auth.admin.getUserById(user.id);
    const meta = (existing?.user?.user_metadata ?? {}) as Record<string, unknown>;
    await supabase.auth.admin.updateUserById(user.id, {
      user_metadata: {
        ...meta,
        name: meta.name || application.name,
        phone: meta.phone || application.phone,
        seminarApplication: application,
      },
    });
  } catch (e) {
    console.error("[seminar.apply] metadata", e);
  }

  // Record the applicant (idempotent; table has a unique constraint on email).
  const { error } = await supabase
    .from("waitlist_signups")
    .upsert({ email, source: SOURCE, created_at: application.appliedAt }, { onConflict: "email" });

  if (error) {
    console.error("[seminar.apply]", error);
    return NextResponse.json({ error: "unable to apply" }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}

// Lets the page show "신청 완료" if the signed-in user already applied.
export async function GET(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const email = (user.email ?? "").trim().toLowerCase();
  if (!email) return NextResponse.json({ applied: false });

  const supabase = createAdminClient();
  const { data } = await supabase
    .from("waitlist_signups")
    .select("email")
    .eq("email", email)
    .eq("source", SOURCE)
    .limit(1);

  return NextResponse.json({ applied: !!(data && data.length) });
}
