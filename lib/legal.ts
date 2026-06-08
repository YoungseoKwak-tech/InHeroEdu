// Business info required by Korean PG (NicePay/PortOne) review. Real values
// below; env vars can still override per-environment.
export const merchantInfo = {
  companyName: process.env.NEXT_PUBLIC_MERCHANT_NAME || "InHero Edu(인히어로 에듀)",
  representative: process.env.NEXT_PUBLIC_MERCHANT_REPRESENTATIVE || "곽영서 (Youngseo Kwak)",
  businessRegistrationNumber:
    process.env.NEXT_PUBLIC_MERCHANT_REGISTRATION_NUMBER || "815-61-00887",
  address: process.env.NEXT_PUBLIC_MERCHANT_ADDRESS || "",
  phone: process.env.NEXT_PUBLIC_MERCHANT_PHONE || "",
  email: process.env.NEXT_PUBLIC_MERCHANT_EMAIL || "yeongseo0802@gmail.com",
  ecommerceRegistrationNumber:
    process.env.NEXT_PUBLIC_ECOMMERCE_REGISTRATION_NUMBER || "",
};

// Paid products shown at checkout (가격·상품 명시 — PG 심사 필수). VAT 포함.
export const creditProducts = [
  { label: "200 크레딧", price: "33,000원", note: "VAT 포함" },
  { label: "500 크레딧", price: "75,000원", note: "VAT 포함 · 권장 상품" },
  { label: "1,000 크레딧", price: "139,000원", note: "VAT 포함" },
  { label: "InHero 자료실 정기 구독권", price: "월 29,000원", note: "VAT 포함 · 매월 자동 결제" },
];

export const checkoutNotice =
  "본 상품은 결제 즉시 크레딧이 계정에 적립되며, 디지털 콘텐츠 특성상 크레딧을 사용한 이후에는 환불이 제한될 수 있습니다.";

export const refundPolicy = {
  title: "Refund and Cancellation Policy",
  summary:
    "Digital course subscriptions can be cancelled anytime before the next billing cycle. Refund eligibility depends on access usage and applicable consumer protection law.",
  items: [
    "If payment fails or is cancelled before approval, no access is granted and no charge is captured.",
    "Subscription cancellation stops future recurring billing. Access remains active through the paid period unless otherwise required by law.",
    "For billing errors, duplicate charges, or unauthorized payments, contact support within 7 days so we can investigate and reverse eligible payments.",
    "Digital content that has already been accessed may be partially or fully non-refundable where permitted by applicable law.",
    "Korean users may exercise statutory withdrawal/cancellation rights under applicable e-commerce and consumer protection rules.",
  ],
};
