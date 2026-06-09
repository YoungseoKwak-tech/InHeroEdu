import type { Metadata } from "next";
import SeminarClient from "./SeminarClient";

const TITLE = "[무료 세미나] 사교육 없이 코넬 공대 간 학생의 아이비리그 자기주도 완전정복";
const DESCRIPTION =
  "컨설팅·학원·입시코치 없이 코넬대 ECE에 합격한 학생이 과목 선정·합격 활동(스파이크)·합격 에세이·GPA/SAT 전략을 직접 공개합니다. 2026년 6월 13일(토) 오후 8시 KST, 온라인 Zoom, 무료(선착순).";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  keywords: [
    "미국 입시 세미나", "아이비리그 입시", "자기주도학습", "AP 독학", "SAT 전략",
    "합격 에세이", "스파이크 활동", "코넬대 합격", "미국 대학 입시 무료 세미나", "학부모 세미나",
  ],
  alternates: { canonical: "/parents/seminar" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: "https://inheroedu.com/parents/seminar",
    siteName: "인히어로 에듀",
    images: ["/og.png"],
  },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION, images: ["/og.png"] },
  robots: { index: true, follow: true },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "[무료 세미나] 아이비리그 자기주도 완전정복",
  description: DESCRIPTION,
  startDate: "2026-06-13T20:00:00+09:00",
  endDate: "2026-06-13T22:00:00+09:00",
  eventStatus: "https://schema.org/EventScheduled",
  eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
  location: {
    "@type": "VirtualLocation",
    url: "https://inheroedu.com/parents/seminar",
  },
  isAccessibleForFree: true,
  inLanguage: "ko",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "KRW",
    availability: "https://schema.org/InStock",
    url: "https://inheroedu.com/parents/seminar",
  },
  organizer: {
    "@type": "Organization",
    name: "인히어로 에듀 (InHero Edu)",
    url: "https://inheroedu.com",
  },
};

export default function SeminarPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <SeminarClient />
    </>
  );
}
