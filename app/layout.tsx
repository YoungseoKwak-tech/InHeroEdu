import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HandleOnboardingModal from "@/components/auth/HandleOnboardingModal";
import SpaceBackground from "@/components/SpaceBackground";
import { LanguageProvider, LANG_COOKIE, type Lang } from "@/app/contexts/LanguageContext";
import { cookies, headers } from "next/headers";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  metadataBase: new URL("https://inheroedu.com"),
  applicationName: "InHero",
  title: {
    default: "InHero Edu | SAT · AP · IB Prep & AI Study Platform",
    // The template owns the brand suffix — page titles must NOT embed their own
    // "| InHero" or it doubles up.
    template: "%s | InHero",
  },
  description: "An AI study platform for students preparing for the SAT, AP, and IB. Concept-focused lessons, AP digital textbooks, full-length SAT & AP practice exams, IB Paper-style problem sets, and a student community — built from the self-study method of a founder who mastered 13 APs on their own.",
  keywords: [
    "SAT AP IB practice exams",
    "SAT practice test",
    "AP practice exam",
    "IB practice exam",
    "digital SAT practice test",
    "AP study materials",
    "college admissions prep",
    "TOEFL practice test",
    "InHero",
  ],
  verification: {
    google: "nVM24H_JWQ9aKChk5MuED5bpQBRkqQ-hqmrS50G49GQ",
  },
  openGraph: {
    type: "website",
    siteName: "InHero",
    url: "https://inheroedu.com",
    title: "SAT · AP · IB Prep & AI Study Platform — InHero",
    description: "AI study platform · concept lessons · AP textbooks · practice exams · student community",
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
