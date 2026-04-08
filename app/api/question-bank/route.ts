import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";

// GET /api/question-bank?subject=ap_bio&difficulty=hard&type=multiple_choice&limit=20&page=1
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const subject    = searchParams.get("subject") ?? "";
    const difficulty = searchParams.get("difficulty") ?? "";
    const type       = searchParams.get("type") ?? "";
    const page       = Math.max(1, parseInt(searchParams.get("page") ?? "1"));
    const limit      = Math.min(50, parseInt(searchParams.get("limit") ?? "20"));
    const countOnly  = searchParams.get("countOnly") === "true";

    const supabase = createAdminClient();

    if (countOnly) {
      // Return question counts per subject
      const { data, error } = await supabase
        .from("questions")
        .select("subject", { count: "exact" })
        .not("subject", "is", null);
      if (error) return NextResponse.json({ error: error.message }, { status: 500 });
      // Group by subject
      const counts: Record<string, number> = {};
      (data ?? []).forEach((row: { subject: string }) => {
        counts[row.subject] = (counts[row.subject] ?? 0) + 1;
      });
      return NextResponse.json({ counts });
    }

    let query = supabase
      .from("questions")
      .select("id,subject,topic,difficulty,type,question_text,option_a,option_b,option_c,option_d,option_e,correct_answer,explanation,explanation_korean,tags", { count: "exact" });

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
