import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase";
import { isPublicTextbookProduct } from "@/lib/textbookProducts";

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

  let purchased: string[] = [];
  if (userId) {
    const { data: purchases } = await supabase
      .from("textbook_purchases")
      .select("subject_id")
      .eq("user_id", userId);
    purchased = (purchases ?? []).map((p) => p.subject_id);
  }

  const visibleProducts = (products ?? [])
    .filter((product) => isPublicTextbookProduct(product))
    .sort((a, b) => a.title.localeCompare(b.title, "en"));

  return NextResponse.json({ products: visibleProducts, purchased });
}
