import type { Metadata } from "next";
import StoryReadClient from "./StoryReadClient";

export const metadata: Metadata = {
  title: "내가 아이비리그 공대에 오기까지 — 읽기 | InHero 학부모",
  description: "아이비리그 코넬 공대 자기주도로 간 사람의 이야기 — 리더뷰.",
  alternates: { canonical: "/parents/story/read" },
  robots: { index: false, follow: false },
};

// Access-gated: StoryReadClient verifies sign-in + unlock before rendering the
// reader, so a shared URL alone can't open the book.
export default function ParentStoryReadPage() {
  return <StoryReadClient />;
}
