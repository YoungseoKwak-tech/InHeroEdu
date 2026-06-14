import type { Metadata } from "next";
import ReplayClient from "./ReplayClient";

export const metadata: Metadata = {
  title: "무료 세미나 다시보기 — 아이비리그 자기주도 완전정복 | InHero 학부모",
  description: "사교육 없이 코넬 공대에 간 학생의 무료 세미나 풀영상 다시보기 + 발표자료(PDF). 로그인하면 바로 시청.",
  alternates: { canonical: "/parents/seminar/replay" },
  robots: { index: false, follow: false },
  // 카카오톡 등 SNS 스크랩 봇이 미리보기 카드를 만들지 못하도록, 루트 레이아웃에서
  // 상속되는 OG/트위터 카드 태그를 명시적으로 제거한다(og:image/title/description 없음).
  // 카드 재료가 사라지므로 링크 공유 시 미리보기 상자 대신 일반 URL 텍스트만 노출된다.
  openGraph: null,
  twitter: null,
};

export default function SeminarReplayPage() {
  return <ReplayClient />;
}
