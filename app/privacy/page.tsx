import type { Metadata } from "next";
import LegalPageLayout, { LegalSection } from "@/components/legal/LegalPageLayout";

export const metadata: Metadata = {
  title: "Privacy Policy | InHero",
  description:
    "How InHero collects, uses, and protects your information across our courses, textbook access, and AI study tools.",
  alternates: {
    canonical: "/privacy",
  },
};

const emailLink = (
  <a href="mailto:inheroedu@gmail.com" style={{ color: "rgba(0,255,178,0.85)" }}>
    inheroedu@gmail.com
  </a>
);

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      eyebrow="InHero Legal"
      title="Privacy Policy"
      lastUpdated="June 4, 2026"
      intro="This policy explains what information InHero (inheroedu.com) collects, how we use it, and the choices you have. We collect the minimum we need to run a study platform well."
    >
      <LegalSection title="1. Information We Collect">
        <p style={{ margin: "0 0 12px" }}>
          <strong style={{ color: "#fff" }}>Account information.</strong> When you sign up, we
          collect your name, email address, and password (stored hashed, never in plain text).
        </p>
        <p style={{ margin: "0 0 12px" }}>
          <strong style={{ color: "#fff" }}>Study activity.</strong> To power progress tracking,
          study plans, and checkpoints, we record which lessons you complete, quiz and checkpoint
          results, and how you move through courses.
        </p>
        <p style={{ margin: "0 0 12px" }}>
          <strong style={{ color: "#fff" }}>AI interactions.</strong> Messages you send to AI
          features (AI Companion, Socratic Mode, Reverse Tutor) are processed to generate
          responses and improve your study experience.
        </p>
        <p style={{ margin: 0 }}>
          <strong style={{ color: "#fff" }}>Payment information.</strong> Payments are handled by
          our payment providers. We receive confirmation of payment and your plan details, but we never see or
          store your card or bank account numbers.
        </p>
      </LegalSection>

      <LegalSection title="2. How We Use Your Information">
        <ul style={{ margin: 0, paddingLeft: 22 }}>
          <li>Provide and personalize courses, study plans, and AI study tools</li>
          <li>Track your progress and unlock content tied to your plan</li>
          <li>Process subscriptions and send billing-related messages</li>
          <li>Respond to support requests</li>
          <li>Monitor for abuse, fraud, and violations of our Terms of Service</li>
          <li>Improve the product, using aggregated or de-identified data where possible</li>
        </ul>
      </LegalSection>

      <LegalSection title="3. What We Don't Do">
        <ul style={{ margin: 0, paddingLeft: 22 }}>
          <li>We do not sell your personal information.</li>
          <li>We do not share your data with advertisers.</li>
          <li>We do not send marketing on behalf of third parties.</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Service Providers">
        <p style={{ margin: 0 }}>
          We share data with a small set of providers only as needed to run InHero: payment
          processing, cloud hosting and infrastructure, and AI model providers that
          power our study tools. These providers process data on our behalf and are not permitted
          to use it for their own purposes.
        </p>
      </LegalSection>

      <LegalSection title="5. Cookies">
        <p style={{ margin: 0 }}>
          We use cookies and similar technologies to keep you signed in, remember preferences,
          and understand how the product is used. You can control cookies through your browser
          settings; disabling them may break sign-in and other core features.
        </p>
      </LegalSection>

      <LegalSection title="6. Children's Privacy">
        <p style={{ margin: 0 }}>
          InHero is intended for students 13 and older. We do not knowingly collect personal
          information from children under 13. If you believe a child under 13 has created an
          account, contact us at {emailLink} and we will delete it. Users under 18 should use
          InHero with parental consent, as described in our Terms of Service.
        </p>
      </LegalSection>

      <LegalSection title="7. Data Retention and Deletion">
        <p style={{ margin: 0 }}>
          We keep your data while your account is active. You can request deletion of your
          account and associated personal data at any time by emailing {emailLink}; we will
          complete deletion within 30 days, except for records we must keep for legal,
          billing, or fraud-prevention reasons.
        </p>
      </LegalSection>

      <LegalSection title="8. Your Rights">
        <p style={{ margin: 0 }}>
          Depending on where you live, you may have the right to access, correct, export, or
          delete your personal information, or to object to certain processing. To exercise any
          of these rights, email {emailLink}. We will respond within 30 days.
        </p>
      </LegalSection>

      <LegalSection title="9. Security">
        <p style={{ margin: 0 }}>
          We use industry-standard measures to protect your data, including encryption in
          transit, hashed passwords, and access controls. No system is perfectly secure; if a
          breach affects your personal data, we will notify you as required by law.
        </p>
      </LegalSection>

      <LegalSection title="10. Changes to This Policy">
        <p style={{ margin: 0 }}>
          If we make material changes to this policy, we will notify you by email or an
          in-product notice before they take effect. The &ldquo;Last updated&rdquo; date above
          always reflects the current version.
        </p>
      </LegalSection>

      <LegalSection title="11. Contact">
        <p style={{ margin: 0 }}>Privacy questions or requests: {emailLink}</p>
      </LegalSection>
    </LegalPageLayout>
  );
}
