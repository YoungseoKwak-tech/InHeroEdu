import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface FeedbackBody {
  resourceId?: string;
  feedback?: "up" | "down";
}

// POST /api/smart-search/feedback
//   body: { resourceId, feedback: 'up' | 'down' }
//   Bumps the corresponding thumbs counter on the AI-generated
//   resource via the increment_ai_feedback RPC (atomic).
export async function POST(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const body = (await req.json().catch(() => ({}))) as FeedbackBody;
  const resourceId = body.resourceId?.trim();
  if (!resourceId) {
    return NextResponse.json({ error: "resourceId required" }, { status: 400 });
  }
  if (body.feedback !== "up" && body.feedback !== "down") {
    return NextResponse.json({ error: "Invalid feedback" }, { status: 400 });
  }
  const column =
    body.feedback === "up" ? "ai_thumbs_up_count" : "ai_thumbs_down_count";

  const supabase = createAdminClient();
  const { error } = await supabase.rpc("increment_ai_feedback", {
    p_resource_id: resourceId,
    p_column: column,
  });
  if (error) {
    console.error("[smart-search:feedback] rpc error:", error);
    return NextResponse.json({ error: "Feedback failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
