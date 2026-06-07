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
  // Parent hub has its own self-contained portal footer.
  if (pathname?.startsWith("/parents")) return null;
  return (
    <footer style={{ background: "#05050F", borderTop: "1px solid rgba(0,255,136,0.06)", position: "relative", zIndex: 10 }}>
      {/* Scanline */}
      <div className="scanlines" style={{ position: "absolute", inset: 0, opacity: 0.4, pointerEvents: "none" }} />

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "60px 24px 40px", position: "relative" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "40px" }} className="md:grid-cols-4">

          {/* Brand */}
          <div>
            <div style={{ marginBottom: "16px" }}>
              <span style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "20px",
                letterSpacing: "-0.03em",
                color: "#fff",
              }}>
                In<span style={{ color: "#00FF88" }}>Hero</span>
              </span>
              <p style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "9px",
                letterSpacing: "0.18em",
                color: "#2a2a3a",
                textTransform: "uppercase",
                marginTop: "4px",
              }}>
                MISSION CONTROL
              </p>
            </div>
            <p style={{ fontSize: "13px", lineHeight: 1.7, color: "#444466", maxWidth: "200px" }}>
              The elite study engine for students who refuse to be average.
            </p>
            <p style={{ fontSize: "11px", marginTop: "20px", color: "#2a2a3a", fontFamily: "'JetBrains Mono', monospace" }}>
              © 2025 InHero
            </p>
          </div>

          {/* Link columns */}
          {cols.map((col) => (
            <div key={col.heading}>
              <h3 style={{
                fontSize: "10px",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#444466",
                fontFamily: "'JetBrains Mono', monospace",
                marginBottom: "20px",
              }}>
                {col.heading}
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      style={{
                        fontSize: "13px",
                        color: "#444466",
                        textDecoration: "none",
                        transition: "color 200ms",
                      }}
                      onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#00FF88")}
                      onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#444466")}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          marginTop: "40px",
          padding: "18px",
          border: "1px solid rgba(255,255,255,0.05)",
          borderRadius: "16px",
          background: "rgba(255,255,255,0.018)",
          color: "#3f3f55",
          fontSize: "10px",
          lineHeight: 1.8,
          fontFamily: "'JetBrains Mono', monospace",
        }}>
          <strong style={{ color: "#666681" }}>Business disclosure</strong>
          <span> · 상호 {merchantInfo.companyName}</span>
          <span> · 대표자 {merchantInfo.representative}</span>
          <span> · 사업자등록번호 {merchantInfo.businessRegistrationNumber}</span>
          <span> · 통신판매업 {merchantInfo.ecommerceRegistrationNumber}</span>
          <span> · 주소 {merchantInfo.address}</span>
          <span> · 연락처 {merchantInfo.phone}</span>
          <span> · 이메일 {merchantInfo.email}</span>
        </div>

        <div style={{
          marginTop: "24px",
          paddingTop: "24px",
          borderTop: "1px solid rgba(255,255,255,0.04)",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "12px",
        }}>
          <p style={{ fontSize: "11px", color: "#2a2a3a", fontFamily: "'JetBrains Mono', monospace" }}>
            AP, SAT, and AMC are registered trademarks of College Board and MAA.
          </p>
          <div style={{ display: "flex", gap: "20px" }}>
            {[
              { label: "Refund Policy",  href: "/refund-policy" },
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms",          href: "/terms" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                style={{ fontSize: "11px", color: "#2a2a3a", textDecoration: "none", transition: "color 200ms", fontFamily: "'JetBrains Mono', monospace" }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#444466")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#2a2a3a")}
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
