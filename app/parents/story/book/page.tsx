import type { Metadata } from "next";
import StoryLanding from "../StoryLanding";

export const metadata: Metadata = {
  title: "내가 아이비리그 공대에 오기까지 — InHero 학부모",
  description:
    "사교육 없이 Cornell 공대에 간 공학도의 자기주도 입시 수기. 목차와 프롤로그를 보고 리더뷰로 읽어보세요.",
  alternates: { canonical: "/parents/story/book" },
  robots: { index: false, follow: false },
};

export default function ParentStoryBookPage() {
  return <StoryLanding />;
}
