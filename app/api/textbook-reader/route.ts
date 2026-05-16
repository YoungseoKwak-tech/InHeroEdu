import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import { hasTextbookAccess } from "@/lib/textbookAccess";
import { isPublicTextbookProduct } from "@/lib/textbookProducts";
import {
  TEXTBOOK_PREVIEW_PAGE_COUNT,
  getTextbookFullFileHref,
  getTextbookPreviewFileHref,
  getTextbookReaderHref,
} from "@/lib/textbookRoutes";

async function loadPublishedProduct(subjectId: string) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("textbook_products")
    .select("id, subject_id, title, pdf_url, price_krw, chapters, status")
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

export async function GET(req: NextRequest) {
  const subjectId = req.nextUrl.searchParams.get("subjectId")?.trim();
  if (!subjectId) {
    return NextResponse.json({ error: "subjectId is required" }, { status: 400 });
  }

  try {
    const product = await loadPublishedProduct(subjectId);
    if (!product) {
      return NextResponse.json({ error: "manual not found" }, { status: 404 });
    }

    const authedUser = await getAuthenticatedUser(req);
    let hasFullAccess = false;
    let accessReason: "preview" | "complimentary" | "purchased" = "preview";

    if (authedUser) {
      const access = await hasTextbookAccess({
        userId: authedUser.id,
        email: authedUser.email,
        subjectId,
      });

      hasFullAccess = access.allowed;
      if (access.reason === "complimentary" || access.reason === "purchased") {
        accessReason = access.reason;
      }
    }

    return NextResponse.json({
      ok: true,
      product: {
        subjectId: product.subject_id,
        title: product.title,
        chapters: product.chapters,
        priceKrw: product.price_krw,
        readerHref: getTextbookReaderHref(product.subject_id),
      },
      hasFullAccess,
      accessReason,
      previewPages: TEXTBOOK_PREVIEW_PAGE_COUNT,
      fileUrl: hasFullAccess
        ? getTextbookFullFileHref(product.subject_id)
        : getTextbookPreviewFileHref(product.subject_id),
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to load textbook reader." },
      { status: 500 }
    );
  }
}
