import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import { hasTextbookAccess } from "@/lib/textbookAccess";
import { isPublicTextbookProduct } from "@/lib/textbookProducts";

const TEXTBOOKS_BUCKET = "textbooks";

async function loadPublishedProduct(subjectId: string) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("textbook_products")
    .select("subject_id, title, pdf_url, status")
    .eq("subject_id", subjectId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data || !isPublicTextbookProduct(data)) {
    return null;
  }

  return data;
}

async function downloadPdfBytes(subjectId: string, fallbackUrl: string | null) {
  const supabase = createAdminClient();
  const storagePath = `products/${subjectId}.pdf`;

  const { data, error } = await supabase.storage.from(TEXTBOOKS_BUCKET).download(storagePath);
  if (!error && data) {
    return {
      bytes: Buffer.from(await data.arrayBuffer()),
      fileName: `${subjectId}.pdf`,
    };
  }

  if (fallbackUrl) {
    const response = await fetch(fallbackUrl, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Failed to fetch manual PDF (${response.status})`);
    }
    return {
      bytes: Buffer.from(await response.arrayBuffer()),
      fileName: `${subjectId}.pdf`,
    };
  }

  throw new Error("Manual PDF unavailable");
}

export async function GET(req: NextRequest) {
  const subjectId = req.nextUrl.searchParams.get("subjectId")?.trim();
  const mode = req.nextUrl.searchParams.get("mode") === "full" ? "full" : "preview";

  if (!subjectId) {
    return NextResponse.json({ error: "subjectId is required" }, { status: 400 });
  }

  try {
    const product = await loadPublishedProduct(subjectId);
    if (!product) {
      return NextResponse.json({ error: "manual not found" }, { status: 404 });
    }

    if (mode === "full") {
      const authedUser = await getAuthenticatedUser(req);
      if (!authedUser) {
        return NextResponse.json({ error: "unauthorized" }, { status: 401 });
      }

      const access = await hasTextbookAccess({
        userId: authedUser.id,
        email: authedUser.email,
        subjectId,
      });

      if (!access.allowed) {
        return NextResponse.json({ error: "forbidden" }, { status: 403 });
      }
    }

    const { bytes, fileName } = await downloadPdfBytes(subjectId, product.pdf_url ?? null);

    return new NextResponse(bytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${fileName}"`,
        "Cache-Control": mode === "full" ? "private, max-age=120" : "public, max-age=300",
        "X-Robots-Tag": "noindex, noarchive, nosnippet",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to stream manual PDF." },
      { status: 500 }
    );
  }
}

