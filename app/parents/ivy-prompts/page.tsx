import type { Metadata } from "next";
import IvyPromptsClient from "./IvyPromptsClient";

export const metadata: Metadata = {
  title: "아이비리그 프롬프트 — ChatGPT·Claude 미국 입시 AI 프롬프트 모음집 | InHero 학부모",
  description: "에세이 소재 발굴·활동 설계·보충 에세이·인터뷰·추천서까지, AI에 그대로 붙여넣는 아이비리그 입시 코칭 프롬프트. 앞 2개 무료 미리보기.",
  alternates: { canonical: "/parents/ivy-prompts" },
};

export default function IvyPromptsPage() {
  return <IvyPromptsClient />;
}
