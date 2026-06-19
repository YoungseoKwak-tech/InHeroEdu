import type { Metadata } from "next";
import LegalPageLayout, { LegalSection } from "@/components/legal/LegalPageLayout";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "InHero's refund policy: 7-day money-back guarantee on your first Elite purchase, cancel anytime, and keep access through the end of your billing period.",
  alternates: {
    canonical: "/refund-policy",
  },
};

export default function RefundPolicyPage() {
  return (
    <LegalPageLayout
      eyebrow="InHero Legal"
      title="Refund Policy"
      lastUpdated="June 4, 2026"
      intro="We want Elite to earn its keep. If it isn't right for you, here is exactly how refunds and cancellations work."
    >
      <LegalSection title="1. 7-Day Money-Back Guarantee">
        <p style={{ margin: "0 0 12px" }}>
          Your <strong style={{ color: "#fff" }}>first purchase</strong> of any InHero Elite plan
          (One Subject Elite at $49/month or All Subject Elite at $199/month) is covered by a
          7-day money-back guarantee. If you request a refund within 7 calendar days of your
          first payment, we will refund that payment in full — no questions asked.
        </p>
        <p style={{ margin: 0 }}>
          To request a refund, email{" "}
          <a href="mailto:inheroedu@gmail.com" style={{ color: "rgba(0,255,178,0.85)" }}>
            inheroedu@gmail.com
          </a>{" "}
          from the email address on your account with the subject line &ldquo;Refund
          Request.&rdquo; Refunds are issued to your original payment method and typically appear
          within 5&ndash;10 business days, depending on your payment provider.
        </p>
      </LegalSection>

      <LegalSection title="2. Renewal Payments">
        <p style={{ margin: 0 }}>
          Elite plans renew monthly. Renewal payments are non-refundable. To avoid being charged
          for an upcoming month, cancel before your renewal date — your subscription remains
          active until the end of the period you have already paid for.
        </p>
      </LegalSection>

      <LegalSection title="3. Cancellation">
        <p style={{ margin: "0 0 12px" }}>
          You can cancel your subscription at any time. Cancellation stops all future billing
          immediately, and you keep full Elite access until the end of your current billing
          period. No partial-month or pro-rated refunds are issued for time remaining after
          cancellation.
        </p>
        <p style={{ margin: 0 }}>
          To cancel online, open <strong style={{ color: "#fff" }}>My Plan</strong> and use the
          &ldquo;Cancel renewal&rdquo; button in the billing section. If the in-product cancellation
          control is unavailable, email{" "}
          <a href="mailto:inheroedu@gmail.com" style={{ color: "rgba(0,255,178,0.85)" }}>
            inheroedu@gmail.com
          </a>{" "}
          and we will stop the next billing cycle manually.
        </p>
      </LegalSection>

      <LegalSection title="4. Free Plan">
        <p style={{ margin: 0 }}>
          The InHero Free plan requires no payment and no credit card, so no refund applies. The
          first lesson of every course stays free — you can evaluate any subject before
          purchasing Elite.
        </p>
      </LegalSection>

      <LegalSection title="5. Exceptional Circumstances">
        <p style={{ margin: 0 }}>
          Outside the 7-day window, we may at our sole discretion issue full or partial refunds
          for duplicate charges, billing errors, or extended service outages. Contact us and we
          will make it right.
        </p>
      </LegalSection>

      <LegalSection title="6. Contact">
        <p style={{ margin: 0 }}>
          Questions about this policy:{" "}
          <a href="mailto:inheroedu@gmail.com" style={{ color: "rgba(0,255,178,0.85)" }}>
            inheroedu@gmail.com
          </a>
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
