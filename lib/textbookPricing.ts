export const TEXTBOOK_PRICE_USD = 29;

// Toss settlement is currently KRW-based, so we store a KRW amount
// that tracks the public $29 textbook price.
export const TEXTBOOK_PRICE_KRW = 39000;

export function textbookPriceLabelUSD(): string {
  return `$${TEXTBOOK_PRICE_USD}`;
}
