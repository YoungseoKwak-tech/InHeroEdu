export const merchantInfo = {
  companyName: process.env.NEXT_PUBLIC_MERCHANT_NAME || "InHero",
  representative: process.env.NEXT_PUBLIC_MERCHANT_REPRESENTATIVE || "Update before payment review",
  businessRegistrationNumber:
    process.env.NEXT_PUBLIC_MERCHANT_REGISTRATION_NUMBER || "Update before payment review",
  address: process.env.NEXT_PUBLIC_MERCHANT_ADDRESS || "Update before payment review",
  phone: process.env.NEXT_PUBLIC_MERCHANT_PHONE || "Update before payment review",
  email: process.env.NEXT_PUBLIC_MERCHANT_EMAIL || "inheroedu@gmail.com",
  ecommerceRegistrationNumber:
    process.env.NEXT_PUBLIC_ECOMMERCE_REGISTRATION_NUMBER || "Update before payment review",
};

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
