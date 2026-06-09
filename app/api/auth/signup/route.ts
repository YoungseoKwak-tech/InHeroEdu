import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";

/**
 * Server-side signup. Creates the user already email-confirmed via the admin API
 * so NO confirmation email is sent — this bypasses Supabase's built-in email
 * rate limit (HTTP 429 over_email_send_rate_limit) that was blocking signups.
 * The client signs in with the same credentials right after.
 */
export async function POST(req: NextRequest) {
  let body: { email?: unknown; password?: unknown; profile?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";
  const profile = body.profile && typeof body.profile === "object" ? (body.profile as Record<string, unknown>) : {};

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "유효한 이메일을 입력해주세요." }, { status: 400 });
  }
  if (password.length < 6) {
    return NextResponse.json({ error: "비밀번호는 6자 이상이어야 합니다." }, { status: 400 });
  }

  const supabase = createAdminClient();
  const { error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: profile,
  });

  if (error) {
    const msg = (error.message || "").toLowerCase();
    if (
      msg.includes("already") ||
      msg.includes("exists") ||
      msg.includes("registered") ||
      (error as { code?: string }).code === "email_exists"
    ) {
      return NextResponse.json({ error: "already_registered" }, { status: 409 });
    }
    console.error("[auth.signup]", error);
    return NextResponse.json({ error: "가입에 실패했어요. 잠시 후 다시 시도해주세요." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
