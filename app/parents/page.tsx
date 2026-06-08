import type { Metadata } from "next";
import ParentsClient from "./ParentsClient";

const TITLE = "인히어로 에듀 | 아이비리그생이 만든 AP·SAT·미국 입시 자료 플랫폼";
const DESCRIPTION =
  "아이비리그 재학생이 직접 만든 미국 입시 플랫폼. AP 실전문제, SAT 자료, 미국 대학 지원 가이드, 합격 스토리, 학부모 커뮤니티를 한곳에서 제공합니다.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    "미국 입시", "미국 대학 입시", "아이비리그", "아이비리그 입시", "Ivy League",
    "AP", "SAT", "AP 실전문제", "AP 문제은행", "SAT 자료",
    "미국 대학 지원", "미국 대학 컨설팅", "미국 입시 커뮤니티", "미국 유학",
    "AP 시험", "SAT 시험", "미국 대학 입학", "유학 자료실",
  ],
  alternates: { canonical: "/parents" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: "https://inheroedu.com/parents",
    siteName: "인히어로 에듀",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

// Structured data — helps Google understand the site & surface rich results.
const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "인히어로 에듀 (InHero Edu)",
  alternateName: "InHero",
  url: "https://inheroedu.com/parents",
  description: DESCRIPTION,
  slogan: "아이비리그생이 만든 AP·SAT·미국 입시 자료 허브",
  knowsAbout: ["미국 대학 입시", "AP", "SAT", "아이비리그 입시", "미국 대학 지원", "미국 유학"],
};

export default function ParentsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <ParentsClient />
    </>
  );
}
