import type { ReactNode } from "react";
import Link from "next/link";

const LEGAL_LINKS = [
  { label: "Refund Policy", href: "/refund-policy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "AI Disclosure", href: "/ai-disclosure" },
];

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section style={{ marginBottom: 36 }}>
      <h2
        style={{
          color: "#fff",
          fontSize: 19,
          fontWeight: 800,
          letterSpacing: "-0.02em",
          marginBottom: 12,
        }}
      >
        {title}
      </h2>
      <div style={{ color: "rgba(255,255,255,0.62)", fontSize: 14.5, lineHeight: 1.8 }}>
        {children}
      </div>
    </section>
  );
}

export default function LegalPageLayout({
  eyebrow,
  title,
  lastUpdated,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  lastUpdated: string;
  intro?: string;
  children: ReactNode;
}) {
  return (
    <div style={{ background: "#000", minHeight: "100vh", padding: "88px 24px", fontFamily: "Inter, sans-serif" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <p
          style={{
            fontSize: 11,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: "rgba(201,168,76,0.68)",
            marginBottom: 16,
          }}
        >
          {eyebrow}
        </p>
        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 3.2rem)",
            fontWeight: 850,
            color: "#fff",
            lineHeight: 1.05,
            letterSpacing: "-0.05em",
            marginBottom: 14,
          }}
        >
          {title}
        </h1>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: intro ? 18 : 48 }}>
          Last updated: {lastUpdated}
        </p>
        {intro && (
          <p
            style={{
              fontSize: 15,
              color: "rgba(255,255,255,0.58)",
              lineHeight: 1.75,
              marginBottom: 48,
              borderLeft: "2px solid rgba(201,168,76,0.5)",
              paddingLeft: 16,
            }}
          >
            {intro}
          </p>
        )}

        {children}

        <div
          style={{
            marginTop: 56,
            paddingTop: 24,
            borderTop: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            flexWrap: "wrap",
            gap: 20,
            fontSize: 13,
          }}
        >
          {LEGAL_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{ color: "rgba(0,255,178,0.75)", textDecoration: "none" }}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/pricing" style={{ color: "rgba(255,255,255,0.45)", textDecoration: "none" }}>
            Back to Pricing
          </Link>
        </div>
      </div>
    </div>
  );
}
