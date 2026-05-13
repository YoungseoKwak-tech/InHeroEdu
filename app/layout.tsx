import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HandleOnboardingModal from "@/components/auth/HandleOnboardingModal";
import SpaceBackground from "@/components/SpaceBackground";
import SpaceCursor from "@/components/SpaceCursor";
import { LanguageProvider } from "@/app/contexts/LanguageContext";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "InHero — The elite study engine for ambitious students.",
  description: "Ivy League instructors. AI memory. Your pattern, your mission.",
  keywords: ["AP Biology", "AP Chemistry", "AP Calculus", "AMC", "SAT", "Ivy League", "college prep", "AI tutor"],
  openGraph: {
    title: "InHero — The elite study engine for ambitious students.",
    description: "Ivy League instructors. AI memory. Your pattern, your mission.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&amp;family=JetBrains+Mono:ital,wght@0,400;0,500;0,600;0,700;1,400&amp;family=Inter:wght@300;400;500;600;700;800;900&amp;display=swap"
          rel="stylesheet"
        />
        <meta name="naver-site-verification" content="d5b871944cd8817a818e2f3e40c017cef645bce9" />
      </head>
      <body style={{ background: '#00000A', color: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <Script src="https://js.tosspayments.com/v2/standard" strategy="lazyOnload" />
        <SpaceBackground />
        <SpaceCursor />
        <LanguageProvider>
          <Navbar />
          <main className="flex-1" style={{ position: 'relative', zIndex: 10 }}>{children}</main>
          <Footer />
          <HandleOnboardingModal />
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
