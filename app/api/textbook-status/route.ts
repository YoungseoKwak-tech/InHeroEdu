/**
 * GET /api/textbook-status?lessonId=...
 * Returns { status, pdfUrl, error } for a lesson's textbook job.
 * Handles both the new pdf_url (Modal path) and legacy docx_url columns.
 */
import { NextRequest, NextResponse } from "next/server";
import { requireAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";

const TEXTBOOKS_BUCKET = "textbooks";

function extractStoragePathFromPublicUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    const marker = `/storage/v1/object/public/${TEXTBOOKS_BUCKET}/`;
    const idx = parsed.pathname.indexOf(marker);
    if (idx === -1) return null;
    return decodeURIComponent(parsed.pathname.slice(idx + marker.length));
  } catch {
    return null;
  }
}

function appendCacheBuster(url: string): string {
  try {
    const parsed = new URL(url);
    parsed.searchParams.set("v", Date.now().toString());
    return parsed.toString();
  } catch {
    return url;
  }
}

export async function GET(req: NextRequest) {
  const user = await requireAuthenticatedUser(req);
  if (user instanceof NextResponse) return user;

  const lessonId = req.nextUrl.searchParams.get("lessonId");
  if (!lessonId) {
    return NextResponse.json({ error: "lessonId is required" }, { status: 400 });
  }

  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("lesson_textbooks")
    .select("status, pdf_url, docx_url, error")
    .eq("lesson_id", lessonId)
    .single();

  if (error || !data) {
    return NextResponse.json({ status: "idle", pdfUrl: null, error: null });
  }

  let downloadUrl: string | null = null;

  if (data.status === "ready") {
    const storedValue: string | null = data.pdf_url || data.docx_url || null;

    if (storedValue) {
      const storagePath = storedValue.startsWith("http")
        ? extractStoragePathFromPublicUrl(storedValue)
        : storedValue;

      if (storagePath) {
        const { data: signed, error: signErr } = await supabase.storage
          .from(TEXTBOOKS_BUCKET)
          .createSignedUrl(storagePath, 3600);

        if (signErr) {
          console.error("[textbook-status] signed URL error", signErr);
          if (storedValue.startsWith("http")) {
            downloadUrl = appendCacheBuster(storedValue);
          }
        } else {
          downloadUrl = signed.signedUrl;
        }
      } else {
        downloadUrl = appendCacheBuster(storedValue);
      }
    }
  }

  return NextResponse.json({
    status: data.status ?? "idle",
    pdfUrl: downloadUrl,
    error: data.error ?? null,
  });
}
