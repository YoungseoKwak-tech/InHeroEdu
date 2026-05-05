import { NextRequest, NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import { TEXTBOOK_PRICE_KRW } from "@/lib/textbookPricing";


export async function GET(req: NextRequest) {
  const admin = await requireAdminUser(req);
  if (admin instanceof NextResponse) return admin;
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("textbook_products")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? []);
}

export async function POST(req: NextRequest) {
  const admin = await requireAdminUser(req);
  if (admin instanceof NextResponse) return admin;
  const supabase = createAdminClient();
  const body = await req.json();
  const { subject_id, title, pdf_url, price_krw, chapters, status } = body;

  if (!subject_id || !title) {
    return NextResponse.json({ error: "subject_id and title required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("textbook_products")
    .upsert(
      { subject_id, title, pdf_url, price_krw: price_krw ?? TEXTBOOK_PRICE_KRW, chapters: chapters ?? 65, status: status ?? "available", updated_at: new Date().toISOString() },
      { onConflict: "subject_id" }
    )
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(req: NextRequest) {
  const admin = await requireAdminUser(req);
  if (admin instanceof NextResponse) return admin;
  const supabase = createAdminClient();
  const { searchParams } = new URL(req.url);
  const subject_id = searchParams.get("subject_id");
  if (!subject_id) return NextResponse.json({ error: "subject_id required" }, { status: 400 });

  const { error } = await supabase.from("textbook_products").delete().eq("subject_id", subject_id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
