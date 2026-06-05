import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser, isAdminEmail } from "@/lib/auth";
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

  // Admin / owner override — admin emails see every course as paid so
  // the team can use the platform end-to-end without manual orders.
  if (isAdminEmail(authedUser.email)) {
    return NextResponse.json({
      ok: true,
      courseId,
      hasAccess: true,
      adminOverride: true,
    });
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
