import { NextRequest, NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/lib/auth";
import { createAdminClient } from "@/lib/supabase";
import { isPublicTextbookProduct } from "@/lib/textbookProducts";
import { hasComplimentaryTextbookAccess } from "@/lib/textbookAccess";

// Public: list available textbook products + check purchase for current user
export async function GET(req: NextRequest) {
  const supabase = createAdminClient();
  const authedUser = await getAuthenticatedUser(req);
  const userId = authedUser?.id ?? null;

  const { data: products, error } = await supabase
    .from("textbook_products")
    .select("id, subject_id, title, pdf_url, price_krw, chapters, status")
    .eq("status", "available")
    .order("created_at", { ascending: true });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const visibleProducts = (products ?? [])
    .filter((product) => isPublicTextbookProduct(product))
    .sort((a, b) => a.title.localeCompare(b.title, "en"));

  let purchased: string[] = [];
  let complimentary = false;

  if (userId) {
    const email = authedUser?.email ?? null;
    complimentary = await hasComplimentaryTextbookAccess(email);

    if (complimentary) {
      // Grant access to every visible textbook subject without a row in
      // textbook_purchases.
      purchased = visibleProducts.map((p) => p.subject_id);
    } else {
      const { data: purchases } = await supabase
        .from("textbook_purchases")
        .select("subject_id")
        .eq("user_id", userId);
      purchased = (purchases ?? []).map((p) => p.subject_id);
    }
  }

  return NextResponse.json({
    products: visibleProducts,
    purchased,
    complimentary,
  });
}
