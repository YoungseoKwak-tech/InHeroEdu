import type { Metadata } from "next";
import StoryDesignClient from "./StoryDesignClient";

export const metadata: Metadata = {
  title: "아이비리그 스토리 설계 — 자기주도 캠프 | InHero 학부모",
  description: "컨설팅이 짜주는 입시가 아니라, 학생이 직접 자기 아이비리그 스토리(전공 서사·활동·리서치·에세이 축)를 설계하는 자기주도 캠프.",
  alternates: { canonical: "/parents/story-design" },
};

export default function ParentStoryDesignPage() {
  return <StoryDesignClient />;
}
