import type { Metadata } from "next";
import PdfReader from "@/app/library/[resourceId]/read/PdfReader";

export const metadata: Metadata = {
  title: "내가 아이비리그 공대에 오기까지 — 읽기 | InHero 학부모",
  description: "아이비리그 코넬 공대 자기주도로 간 사람의 이야기 — 리더뷰.",
  alternates: { canonical: "/parents/story/read" },
  robots: { index: false, follow: false },
};

export default function ParentStoryReadPage() {
  return (
    <PdfReader
      source={{
        fileUrl: "/parents-docs/ivy-engineering-journey.pdf",
        title: "내가 아이비리그 공대에 오기까지",
        subtitle: "아이비리그 코넬 공대 자기주도로 간 사람의 이야기",
        eyebrow: "🎓 합격 수기",
        backHref: "/parents/story",
        closeHref: "/parents/story",
      }}
    />
  );
}
