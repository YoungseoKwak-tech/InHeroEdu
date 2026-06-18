import type { Metadata } from "next";
import Link from "next/link";
import LegalPageLayout, { LegalSection } from "@/components/legal/LegalPageLayout";

export const metadata: Metadata = {
  title: "Terms of Service | InHero",
  description:
    "The terms that govern your use of InHero's courses, textbook access, and AI study tools.",
  alternates: {
    canonical: "/terms",
  },
};

const emailLink = (
  <a href="mailto:inheroedu@gmail.com" style={{ color: "rgba(0,255,178,0.85)" }}>
    inheroedu@gmail.com
  </a>
);

export default function TermsPage() {
  return (
    <LegalPageLayout
      eyebrow="InHero Legal"
      title="Terms of Service"
      lastUpdated="June 4, 2026"
      intro="These Terms of Service govern your access to and use of InHero (inheroedu.com), including our courses, textbook access, AI study tools, and community features. By creating an account or using InHero, you agree to these terms."
    >
      <LegalSection title="1. Who Can Use InHero">
        <p style={{ margin: "0 0 12px" }}>
          You must be at least 13 years old to use InHero. If you are under 18, you may only use
          InHero with the consent of a parent or legal guardian, who agrees to these terms on
          your behalf. By purchasing an Elite plan, you confirm that you (or your parent or
          guardian) are authorized to use the payment method provided.
        </p>
        <p style={{ margin: 0 }}>
          You are responsible for your account credentials and for all activity under your
          account. Accounts are personal and may not be shared, sold, or transferred.
        </p>
      </LegalSection>

      <LegalSection title="2. Plans and Billing">
        <p style={{ margin: "0 0 12px" }}>
          InHero offers a Free plan (the first lesson of every course at no charge) and paid
          Elite subscriptions: One Subject Elite ($49/month) and All Subject Elite ($199/month).
          Prices are in U.S. dollars and may change; we will give you advance notice before any
          price change affects an active subscription.
        </p>
        <p style={{ margin: "0 0 12px" }}>
          Elite plans are monthly subscriptions that renew automatically until cancelled.
          Payments are processed by our third-party payment providers; InHero does not store your card or bank details.
        </p>
        <p style={{ margin: 0 }}>
          Refunds and cancellations are governed by our{" "}
          <Link href="/refund-policy" style={{ color: "rgba(0,255,178,0.85)" }}>
            Refund Policy
          </Link>
          , including a 7-day money-back guarantee on your first Elite purchase.
        </p>
      </LegalSection>

      <LegalSection title="3. License and Acceptable Use">
        <p style={{ margin: "0 0 12px" }}>
          We grant you a personal, non-exclusive, non-transferable license to access InHero
          content — lessons, textbook access, practice questions, and AI study tools — for your
          own studying. You may not:
        </p>
        <ul style={{ margin: "0 0 12px", paddingLeft: 22 }}>
          <li>copy, download, scrape, redistribute, or resell course or textbook content;</li>
          <li>share account access or circumvent plan limits or content gating;</li>
          <li>use bots or automated tools to extract content or overload the service;</li>
          <li>upload unlawful, infringing, or abusive material to community features;</li>
          <li>use InHero to cheat on actual exams or violate your school&apos;s academic integrity rules.</li>
        </ul>
        <p style={{ margin: 0 }}>
          We may suspend or terminate accounts that violate these terms. If your account is
          terminated for violation, no refund is owed beyond what the Refund Policy provides.
        </p>
      </LegalSection>

      <LegalSection title="4. AI Study Tools">
        <p style={{ margin: 0 }}>
          InHero includes AI-powered features such as the AI Companion, Socratic Mode, and
          Reverse Tutor. AI output can contain errors. It is a study aid, not a substitute for
          official course materials or instruction, and we do not guarantee any particular exam
          score or admissions outcome.
        </p>
      </LegalSection>

      <LegalSection title="5. Intellectual Property">
        <p style={{ margin: "0 0 12px" }}>
          InHero and its original content, features, and branding are owned by InHero and
          protected by copyright and other intellectual property laws. Licensed third-party
          materials remain the property of their respective owners.
        </p>
        <p style={{ margin: 0 }}>
          AP&reg;, SAT&reg;, and AMC&reg; are registered trademarks of College Board and the
          Mathematical Association of America, which are not affiliated with and do not endorse
          InHero.
        </p>
      </LegalSection>

      <LegalSection title="6. Disclaimers and Limitation of Liability">
        <p style={{ margin: "0 0 12px" }}>
          InHero is provided &ldquo;as is&rdquo; and &ldquo;as available.&rdquo; To the maximum
          extent permitted by law, we disclaim all warranties, express or implied, including
          fitness for a particular purpose and non-infringement, and we do not warrant that the
          service will be uninterrupted or error-free.
        </p>
        <p style={{ margin: 0 }}>
          To the maximum extent permitted by law, InHero&apos;s total liability for any claim
          arising out of or relating to the service is limited to the amount you paid us in the
          12 months before the claim arose. We are not liable for indirect, incidental, or
          consequential damages.
        </p>
      </LegalSection>

      <LegalSection title="7. Changes to the Service or These Terms">
        <p style={{ margin: 0 }}>
          We may add, change, or remove features, courses, or content over time. We may also
          update these terms; if we make material changes, we will notify you by email or an
          in-product notice before they take effect. Continued use after changes take effect
          constitutes acceptance.
        </p>
      </LegalSection>

      <LegalSection title="8. Communications and Marketing">
        <p style={{ margin: 0 }}>
          We send service messages (billing, security, and account notices) as a necessary part
          of operating your account. Marketing messages — events, perks, and new resources, by
          email or KakaoTalk — are sent <strong>only if you separately opt in</strong> at signup
          or in your settings; this consent is optional and is never a condition of using InHero.
          You may withdraw it at any time: every marketing message includes an unsubscribe option,
          and opting out does not affect your access to the service.
        </p>
      </LegalSection>

      <LegalSection title="9. Governing Law">
        <p style={{ margin: 0 }}>
          These terms are governed by the laws of the United States and the State of [STATE],
          without regard to conflict-of-law principles. Any dispute will be resolved in the
          courts located in [STATE], and you consent to their jurisdiction.
        </p>
      </LegalSection>

      <LegalSection title="10. Contact">
        <p style={{ margin: 0 }}>Questions about these terms: {emailLink}</p>
      </LegalSection>
    </LegalPageLayout>
  );
}
