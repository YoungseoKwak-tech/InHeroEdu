import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "InHero — 한국에서 아이비리그 가는 가장 현명한 방법",
  description:
    "Cornell 재학생이 만든 AP 전문 플랫폼. AI 즉시 설명, 대입 컨설팅, 칠판 강의로 아이비리그를 목표하세요.",
  keywords: ["AP Biology", "AP Chemistry", "AP Calculus", "AMC", "SAT", "아이비리그", "대입 컨설팅", "한국"],
  openGraph: {
    title: "InHero — 한국에서 아이비리그",
    description: "Cornell 재학생이 만든 AP 전문 플랫폼",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen flex flex-col">
        <Script src="https://js.tosspayments.com/v1/payment" strategy="lazyOnload" />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
