type PublicTextbookProduct = {
  subject_id: string;
  title: string;
  pdf_url: string | null;
  status?: string | null;
};

const HIDDEN_PRODUCT_PATTERN = /(^|[-_\s])(test|demo|sample|temp|staging)([-_\s]|$)/i;

export function isPublicTextbookProduct(product: PublicTextbookProduct): boolean {
  const identifier = `${product.subject_id} ${product.title}`.trim();

  if (product.status && product.status !== "available") {
    return false;
  }

  if (!product.pdf_url) {
    return false;
  }

  return !HIDDEN_PRODUCT_PATTERN.test(identifier);
}
