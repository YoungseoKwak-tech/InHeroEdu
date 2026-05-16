import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import { hasPaidEnglishCourseAccess } from "@/lib/course-access";
import { listStoredOrdersForUser } from "@/lib/orderStore";

export async function GET(req: NextRequest) {
  const authedUser = await requireAuthenticatedUser(req);
  if (authedUser instanceof NextResponse) {
    return authedUser;
  }

  const courseId = req.nextUrl.searchParams.get("courseId")?.trim();
  if (!courseId) {
    return NextResponse.json({ error: "courseId required" }, { status: 400 });
  }

  try {
    const supabase = createAdminClient();
    const orders = await listStoredOrdersForUser(supabase, authedUser.id);
    const hasAccess = hasPaidEnglishCourseAccess(orders, courseId);

    return NextResponse.json({
      ok: true,
      courseId,
      hasAccess,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to check course access.",
      },
      { status: 500 }
    );
  }
}
