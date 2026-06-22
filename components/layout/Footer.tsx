"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { merchantInfo } from "@/lib/legal";

const cols = [
  {
    heading: "Classroom",
    links: [
      { label: "AP Biology",     href: "/courses/ap-biology" },
      { label: "AP Chemistry",   href: "/courses" },
      { label: "AP Calculus BC", href: "/courses" },
      { label: "AMC 10/12",      href: "/courses" },
      { label: "SAT",            href: "/courses" },
    ],
  },
  {
    heading: "Command",
    links: [
      { label: "About",                 href: "#" },
      { label: "SAT·AP·IB Mock Exams", href: "/mock-exams" },
      { label: "TOEFL Practice Test",  href: "/toefl" },
      { label: "Pricing",               href: "/pricing" },
      { label: "Legal / Refund Policy", href: "/legal" },
      { label: "Hero Codes",            href: "/hero-codes" },
      { label: "Admissions Consulting", href: "/pricing" },
    ],
  },
  {
    heading: "Contact",
    links: [
      { label: "inheroedu@gmail.com", href: "mailto:inheroedu@gmail.com" },
      { label: "inheroedu.com",       href: "https://inheroedu.com" },
    ],
  },
];

export default function Footer() {
  const pathname = usePathname();
  // Parent hub is a white portal — render a light business-info footer (required
  // for Korean PG/payment review) instead of the cosmic site footer.
  if (pathname?.startsWith("/parents")) {
    return (
      <footer style={{ background: "#fff", borderTop: "1px solid #e2e6ea", position: "relative", zIndex: 10 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "26px 22px 34px", color: "#64748b", fontSize: 12.5, lineHeight: 1.85 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px 14px", fontWeight: 700, color: "#475569", marginBottom: 8 }}>
            <Link href="/terms" style={{ color: "#475569", textDecoration: "none" }}>이용약관</Link>
            <span style={{ color: "#cbd5e1" }}>|</span>
            <Link href="/privacy" style={{ color: "#475569", textDecoration: "none" }}>개인정보처리방침</Link>
            <span style={{ color: "#cbd5e1" }}>|</span>
            <Link href="/refund" style={{ color: "#475569", textDecoration: "none" }}>환불정책</Link>
            <span style={{ color: "#cbd5e1" }}>|</span>
            <Link href="/ai-disclosure" style={{ color: "#475569", textDecoration: "none" }}>AI 생성 콘텐츠 안내</Link>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0 10px" }}>
            <span>상호명: {merchantInfo.companyName}</span>
            <span>· 대표자명: {merchantInfo.representative}</span>
            <span>· 사업자등록번호: {merchantInfo.businessRegistrationNumber}</span>
            <span>· 이메일: {merchantInfo.email}</span>
          </div>
          <div style={{ marginTop: 8, color: "#94a3b8" }}>© {new Date().getFullYear()} InHero Edu. All rights reserved.</div>
        </div>
      </footer>
    );
  }
  return (
    <footer style={{ background: "#f7f8fa", borderTop: "1px solid #e8ecf1", position: "relative", zIndex: 10, color: "#5b6675", fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <div style={{ maxWidth: "1240px", margin: "0 auto", padding: "56px 22px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "40px" }} className="md:grid-cols-4">

          {/* Brand */}
          <div>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: "21px", letterSpacing: "-0.03em", color: "#0b1220" }}>
              In<span style={{ color: "#00b85f" }}>Hero</span>
            </span>
            <p style={{ fontSize: "13.5px", lineHeight: 1.7, color: "#5b6675", maxWidth: "220px", marginTop: "12px" }}>
              Real-format SAT · AP · IB · TOEFL prep and AP Core Notes you can read in any language.
            </p>
            <p style={{ fontSize: "12px", marginTop: "18px", color: "#94a3b8" }}>
              © {new Date().getFullYear()} InHero Edu
            </p>
          </div>

          {/* Link columns */}
          {cols.map((col) => (
            <div key={col.heading}>
              <h3 style={{ fontSize: "11px", fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: "#94a3b8", marginBottom: "16px" }}>
                {col.heading}
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "11px" }}>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      style={{ fontSize: "13.5px", fontWeight: 600, color: "#5b6675", textDecoration: "none", transition: "color 160ms" }}
                      onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#0b1220")}
                      onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#5b6675")}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Business disclosure (전자상거래법) */}
        <div style={{ marginTop: "40px", padding: "16px 18px", border: "1px solid #e8ecf1", borderRadius: "14px", background: "#fff", color: "#94a3b8", fontSize: "11.5px", lineHeight: 1.8 }}>
          <strong style={{ color: "#64748b" }}>Business disclosure</strong>
          <span> · Business name InHero Edu</span>
          <span> · Representative Youngseo Kwak</span>
          <span> · Business registration no. {merchantInfo.businessRegistrationNumber}</span>
          <span> · E-commerce registration no. {merchantInfo.ecommerceRegistrationNumber}</span>
          {merchantInfo.address && <span> · Address {merchantInfo.address}</span>}
          {merchantInfo.phone && <span> · Phone {merchantInfo.phone}</span>}
          <span> · Email {merchantInfo.email}</span>
        </div>

        <div style={{ marginTop: "22px", paddingTop: "22px", borderTop: "1px solid #e8ecf1", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
          <p style={{ fontSize: "11.5px", color: "#94a3b8", margin: 0 }}>
            AP, SAT, and AMC are registered trademarks of College Board and MAA.
          </p>
          <div style={{ display: "flex", gap: "18px" }}>
            {[
              { label: "Refund Policy",  href: "/refund-policy" },
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms",          href: "/terms" },
              { label: "AI Disclosure",  href: "/ai-disclosure" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                style={{ fontSize: "11.5px", fontWeight: 600, color: "#94a3b8", textDecoration: "none", transition: "color 160ms" }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#475569")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#94a3b8")}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
