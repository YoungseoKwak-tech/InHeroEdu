import type { Metadata } from "next";
import PdfReader from "@/app/library/[resourceId]/read/PdfReader";

export const metadata: Metadata = {
  title: "내가 아이비리그 공대에 오기까지 — InHero 학부모",
  description:
    "아이비리그 공대 합격생이 직접 쓴 합격 수기. 어떤 활동과 전략으로 아이비리그 공과대학에 합격했는지 그대로 읽어보세요.",
  alternates: { canonical: "/parents/story" },
  robots: { index: false, follow: false },
};

export default function ParentStoryPage() {
  return (
    <PdfReader
      source={{
        fileUrl: "/parents-docs/ivy-engineering-journey.pdf",
        title: "내가 아이비리그 공대에 오기까지",
        subtitle: "아이비리그 공대 합격생의 실제 합격 수기",
        eyebrow: "🎓 합격 수기",
        backHref: "/parents",
        closeHref: "/parents",
      }}
    />
  );
}
