import type { Metadata } from "next";
import FeedbackClient from "./FeedbackClient";

export const metadata: Metadata = {
  title: "자료요청 & 피드백 — InHero 학부모",
  description:
    "필요한 AP 과목·자료, 개선 아이디어, 오류를 직접 요청하세요. 입력하면 목록에 바로 반영되고 검토 후 실제 자료로 만들어 드립니다.",
  alternates: { canonical: "/parents/feedback" },
  robots: { index: false, follow: false },
};

export default function ParentFeedbackPage() {
  return <FeedbackClient />;
}
