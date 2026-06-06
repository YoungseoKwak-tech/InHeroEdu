import type { Metadata } from "next";
import EnglishPricingSection from "@/components/pricing/EnglishPricingSection";
import { FREE_FOR_ALL } from "@/lib/config";

const pricingUrl = "https://inheroedu.com/pricing";

const paidMetadata: Metadata = {
  metadataBase: new URL("https://inheroedu.com"),
  title: "InHero Pricing | AP Course + Textbook Access from $49",
  description:
    "Compare InHero Free, One Subject Elite for $49/month, and All Subject Elite for $199/month. Unlimited AP course access plus textbook access.",
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "InHero Pricing | AP Course + Textbook Access from $49",
    description:
      "Free to start. Elite plans include unlimited course access plus textbook access: one subject for $49/month or all subjects for $199/month.",
    url: pricingUrl,
    siteName: "InHero",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "InHero Pricing | AP Course + Textbook Access from $49",
    description:
      "Compare Free, One Subject Elite, and All Subject Elite plans for AP/SAT students.",
  },
};

const freeMetadata: Metadata = {
  metadataBase: new URL("https://inheroedu.com"),
  title: "InHero | Free AP Courses + Textbook Access for All Students",
  description:
    "Every InHero course, textbook, and AI study tool is free for all students right now. No plans, no checkout, no credit card.",
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "InHero | Free AP Courses + Textbook Access for All Students",
    description:
      "Every InHero course, textbook, and AI study tool is free for all students right now. No plans, no checkout, no credit card.",
    url: pricingUrl,
    siteName: "InHero",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "InHero | Free AP Courses + Textbook Access for All Students",
    description:
      "Every course, textbook, and AI study tool is free for all students right now.",
  },
};

export const metadata: Metadata = FREE_FOR_ALL ? freeMetadata : paidMetadata;

const freeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://inheroedu.com/#organization",
      name: "InHero",
      url: "https://inheroedu.com",
      sameAs: ["https://inheroedu.com"],
    },
    {
      "@type": "WebPage",
      "@id": `${pricingUrl}#webpage`,
      url: pricingUrl,
      name: "InHero Access",
      description:
        "Every InHero course, textbook, and AI study tool is free for all students right now.",
      isPartOf: {
        "@id": "https://inheroedu.com/#website",
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${pricingUrl}#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "How much does InHero cost?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "InHero is currently free for all students. Every course, textbook, and AI study tool is included at no charge.",
          },
        },
        {
          "@type": "Question",
          name: "Does InHero include textbook access?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Textbook access across all published subjects is included for free.",
          },
        },
      ],
    },
  ],
};

const paidStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://inheroedu.com/#organization",
      name: "InHero",
      url: "https://inheroedu.com",
      sameAs: ["https://inheroedu.com"],
    },
    {
      "@type": "WebPage",
      "@id": `${pricingUrl}#webpage`,
      url: pricingUrl,
      name: "InHero Pricing",
      description:
        "Compare InHero Free, One Subject Elite, and All Subject Elite pricing for AP/SAT course and textbook access.",
      isPartOf: {
        "@id": "https://inheroedu.com/#website",
      },
      about: [
        { "@id": `${pricingUrl}#one-subject-elite` },
        { "@id": `${pricingUrl}#all-subject-elite` },
      ],
    },
    {
      "@type": "Product",
      "@id": `${pricingUrl}#one-subject-elite`,
      name: "InHero One Subject Elite Pass",
      brand: {
        "@type": "Brand",
        name: "InHero",
      },
      category: "Online AP Course",
      description:
        "Unlimited course access plus textbook access for one AP/SAT subject.",
      offers: {
        "@type": "Offer",
        url: pricingUrl,
        priceCurrency: "USD",
        price: "49",
        availability: "https://schema.org/InStock",
        itemCondition: "https://schema.org/NewCondition",
      },
    },
    {
      "@type": "Product",
      "@id": `${pricingUrl}#all-subject-elite`,
      name: "InHero All Subject Elite Pass",
      brand: {
        "@type": "Brand",
        name: "InHero",
      },
      category: "Online AP Course Bundle",
      description:
        "Unlimited course access and textbook access across every published InHero subject.",
      offers: {
        "@type": "Offer",
        url: pricingUrl,
        priceCurrency: "USD",
        price: "199",
        availability: "https://schema.org/InStock",
        itemCondition: "https://schema.org/NewCondition",
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${pricingUrl}#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "How much does InHero cost?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "InHero has a free version. Elite pricing starts at $49/month for one subject and $199/month for all subjects.",
          },
        },
        {
          "@type": "Question",
          name: "Does InHero Elite include textbook access?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. One Subject Elite includes textbook access for that subject, and All Subject Elite includes textbook access across all published subjects.",
          },
        },
        {
          "@type": "Question",
          name: "What does the All Subject Elite Pass include?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The All Subject Elite Pass includes unlimited course access, unlimited textbook access, and InHero AI study layers across all published subjects.",
          },
        },
        {
          "@type": "Question",
          name: "Can I cancel InHero Elite anytime?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Elite plans renew monthly until cancelled. Cancel before the next renewal date to stop future billing; current paid access stays active through the paid billing period.",
          },
        },
        {
          "@type": "Question",
          name: "How does the InHero refund policy work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Your first Elite payment is covered by a 7-day money-back guarantee. Renewal payments are non-refundable, except for billing errors, duplicate charges, applicable consumer protection rights, or case-by-case review.",
          },
        },
        {
          "@type": "Question",
          name: "What does One Subject Elite unlock?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "One Subject Elite unlocks the selected subject only, including that subject's lessons, textbook, question bank, and paid lounge access. All Subject Elite unlocks every published subject.",
          },
        },
      ],
    },
  ],
};

export default function PricingPage() {
  const structuredData = FREE_FOR_ALL ? freeStructuredData : paidStructuredData;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <EnglishPricingSection />
    </>
  );
}
