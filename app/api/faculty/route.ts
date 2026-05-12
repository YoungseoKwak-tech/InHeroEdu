/**
 * Public faculty endpoint — diagnostic build.
 * Returns the merged assets *plus* the raw DB rows + any select error
 * so we can see what Supabase actually hands back.
 */

import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { FACULTY } from "@/lib/faculty";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = createAdminClient();
  // SELECT * to capture any column the public endpoint might be missing
  // when compared to /api/admin/faculty.
  const { data, error, count, status, statusText } = await supabase
    .from("faculty_assets")
    .select("*", { count: "exact" });

  const merged = FACULTY.map((meta) => {
    const row = (data ?? []).find((r) => r.faculty_id === meta.id);
    return {
      id: meta.id,
      name: meta.name,
      imageUrl: row?.image_url ?? null,
      introVideoUrl: row?.intro_video_url ?? null,
    };
  });

  return NextResponse.json({
    ok: !error,
    diag: {
      count,
      status,
      statusText,
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/^https:\/\//, "") ?? null,
      error: error
        ? { message: error.message, details: error.details, hint: error.hint, code: error.code }
        : null,
      raw: data,
    },
    faculty: merged,
  });
}
