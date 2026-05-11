import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { isPublicTextbookProduct } from "@/lib/textbookProducts";
import { hasComplimentaryTextbookAccess } from "@/lib/textbookAccess";

// Public: list available textbook products + check purchase for current user
export async function GET(req: NextRequest) {
  const supabase = createAdminClient();
  const userId = req.nextUrl.searchParams.get("userId");

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
    // Look up the user's email so we can apply the complimentary allowlist
    // (env-driven COMP_TEXTBOOK_EMAILS + ADMIN_EMAILS) without trusting any
    // client-supplied value.
    const { data: authUser } = await supabase.auth.admin.getUserById(userId);
    const email = authUser?.user?.email ?? null;
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
