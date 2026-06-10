import type { Metadata } from "next";
import StoryHub from "./StoryHub";

export const metadata: Metadata = {
  title: "합격 수기 — 스토리·활동·에세이 | InHero 학부모",
  description:
    "사교육 없이 아이비리그 공대에 간 합격생의 실제 기록. 합격 스토리(책), 합격 활동, 합격 에세이를 한 곳에서 열람하세요.",
  alternates: { canonical: "/parents/story" },
  robots: { index: false, follow: false },
};

export default function ParentStoryPage() {
  return <StoryHub />;
}
