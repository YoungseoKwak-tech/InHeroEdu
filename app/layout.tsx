import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HandleOnboardingModal from "@/components/auth/HandleOnboardingModal";
import SpaceBackground from "@/components/SpaceBackground";
import SpaceCursor from "@/components/SpaceCursor";
import { LanguageProvider, LANG_COOKIE, type Lang } from "@/app/contexts/LanguageContext";
import { cookies, headers } from "next/headers";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  metadataBase: new URL("https://inheroedu.com"),
  applicationName: "인히어로",
  title: {
    default: "인히어로 에듀 | 아이비리그생이 정리한 미국 최대 입시·AP·SAT·IB 핵심 자료실",
    template: "%s | 인히어로",
  },
  description: "SAT·AP·IB를 준비하는 유학생을 위한 AI 학습 플랫폼. 핵심만 짚는 요점 강의, AP 디지털 교재, SAT·AP·IB 실전 모의고사, 유학생 커뮤니티까지. 13개 AP를 독학으로 마스터한 창업자의 학습법을 AI에 담았습니다.",
  keywords: [
    "SAT AP IB 모의고사",
    "SAT 모의고사",
    "AP 모의고사",
    "IB 모의고사",
    "디지털 SAT 모의고사",
    "AP 핵심 자료",
    "유학생 입시",
    "인히어로",
    "InHero",
  ],
  verification: {
    google: "nVM24H_JWQ9aKChk5MuED5bpQBRkqQ-hqmrS50G49GQ",
  },
  openGraph: {
    type: "website",
    siteName: "인히어로",
    url: "https://inheroedu.com",
    title: "아이비리그생이 만든 SAT·AP 입시 AI 학습 플랫폼",
    description: "SAT·AP AI 학습 플랫폼 · 요점 강의 · AP 교재 · 모의고사 · 유학생 커뮤니티",
    images: ["/og.png"],
  },
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
};

// The cookie-driven language switch must reach page segments too — otherwise
// Next statically prerenders the page with the context default ("en") while
// only the dynamic layout (navbar) honors the cookie. Forcing the route tree
// dynamic makes every segment render with the live locale.
export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Locale for SSR. Prefer the `x-inhero-lang` header set by middleware.ts —
  // on Vercel that's reliably populated from the cookie, whereas a direct
  // cookies() read here is not, which used to cause a Korean visitor's first
  // paint to flash English. Fall back to cookies() for local/non-middleware
  // contexts. Both client and server start from this value → no mismatch.
  const headerStore = await headers();
  const headerLang = headerStore.get("x-inhero-lang");
  const cookieStore = await cookies();
  const cookieLang = cookieStore.get(LANG_COOKIE)?.value;
  const initialLang: Lang = (headerLang ?? cookieLang) === "ko" ? "ko" : "en";

  return (
    <html lang={initialLang} suppressHydrationWarning className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&amp;family=JetBrains+Mono:ital,wght@0,400;0,500;0,600;0,700;1,400&amp;family=Inter:wght@300;400;500;600;700;800;900&amp;display=swap"
          rel="stylesheet"
        />
        <meta name="naver-site-verification" content="d5b871944cd8817a818e2f3e40c017cef645bce9" />
      </head>
      <body style={{ color: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        {/* Google site-name surfacing — WebSite JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "인히어로",
              url: "https://inheroedu.com",
            }),
          }}
        />
        <SpaceBackground />
        <SpaceCursor />
        <LanguageProvider initialLang={initialLang}>
          <Navbar />
          <main className="flex-1" style={{ position: 'relative' }}>{children}</main>
          <Footer />
          <HandleOnboardingModal />
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
