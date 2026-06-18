import type { Metadata } from "next";
import ToeflTestClient from "./ToeflTestClient";

export const metadata: Metadata = {
  title: "TOEFL iBT 실전 모의고사 — 풀기 | InHero",
  description: "실제 TOEFL iBT처럼 Reading·Listening·Speaking·Writing 4개 섹션을 풀어보세요. 자동 채점·해설, 듣기 음원 재생, 말하기 녹음, 쓰기 타이머까지.",
  alternates: { canonical: "/toefl/test" },
};

export default function ToeflTestPage() {
  return <ToeflTestClient />;
}
