import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";

// GET /api/admin/questions?subject=ap_bio&difficulty=hard&type=multiple_choice&page=1&limit=20
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const subject    = searchParams.get("subject") ?? "";
    const difficulty = searchParams.get("difficulty") ?? "";
    const type       = searchParams.get("type") ?? "";
    const page       = Math.max(1, parseInt(searchParams.get("page") ?? "1"));
    const limit      = Math.min(100, parseInt(searchParams.get("limit") ?? "20"));

    const supabase = createAdminClient();
    let query = supabase.from("questions").select("*", { count: "exact" });

    if (subject)    query = query.eq("subject", subject);
    if (difficulty) query = query.eq("difficulty", difficulty);
    if (type)       query = query.eq("type", type);

    query = query
      .order("created_at", { ascending: false })
      .range((page - 1) * limit, page * limit - 1);

    const { data, count, error } = await query;
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ questions: data, total: count ?? 0, page, limit });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}

// POST /api/admin/questions — add a question manually
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const supabase = createAdminClient();
    const { data, error } = await supabase.from("questions").insert(body).select().single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ question: data });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}

// PUT /api/admin/questions — update a question
export async function PUT(req: NextRequest) {
  try {
    const { id, ...updates } = await req.json();
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("questions")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ question: data });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}

// DELETE /api/admin/questions?id=...
export async function DELETE(req: NextRequest) {
  try {
    const id = new URL(req.url).searchParams.get("id");
    if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
    const supabase = createAdminClient();
    const { error } = await supabase.from("questions").delete().eq("id", id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
