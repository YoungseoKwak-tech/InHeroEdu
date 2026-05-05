import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const { email, source = "ai_feature" } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "email required" }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail.includes("@")) {
      return NextResponse.json({ error: "valid email required" }, { status: 400 });
    }

    const supabase = createAdminClient();
    const { error } = await supabase.from("waitlist_signups").insert({
      email: normalizedEmail,
      source,
      created_at: new Date().toISOString(),
    });

    if (error && error.code !== "23505") {
      console.error("[waitlist]", error);
      return NextResponse.json({ error: "unable to join waitlist" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[waitlist]", error);
    return NextResponse.json({ error: "unable to join waitlist" }, { status: 500 });
  }
}
