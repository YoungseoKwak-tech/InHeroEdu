/**
 * Public faculty endpoint — read-only, no auth.
 * Returns the same data the /courses page reads from for the Classroom grid.
 * Useful for diagnosing whether the public Classroom landing actually has
 * the uploaded assets in DB.
 */

import { NextResponse } from "next/server";
import { getAllFacultyWithAssets } from "@/lib/facultyAssets";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const faculty = await getAllFacultyWithAssets();
    // Strip server-only fields just in case; expose only what the
    // public Classroom UI needs.
    const safe = faculty.map((f) => ({
      id: f.id,
      name: f.name,
      subjectShort: f.subjectShort,
      tagline: f.tagline,
      imageUrl: f.imageUrl,
      introVideoUrl: f.introVideoUrl,
    }));
    return NextResponse.json({ ok: true, faculty: safe });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
