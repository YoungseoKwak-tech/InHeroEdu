import type { Metadata } from "next";
import QuestionBankClient from "./QuestionBankClient";

export const metadata: Metadata = {
  title: "AP 문제 은행 — InHero 학부모",
  description:
    "College Board 스타일 AP 실전 문제를 바로 풀고 한국어 해설까지. 무료 과목은 가입 없이도 풀 수 있습니다.",
  alternates: { canonical: "/parents/question-bank" },
  robots: { index: false, follow: false },
};

export default function ParentQuestionBankPage() {
  return <QuestionBankClient />;
}
