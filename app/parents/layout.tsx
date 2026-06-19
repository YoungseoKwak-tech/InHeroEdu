import type { ReactNode } from "react";
import type { Metadata } from "next";

/**
 * Parent portal layout. The main site (inheroedu.com) is English, but /parents
 * is the Korean parent-acquisition channel, so we override the global English
 * metadata back to Korean for this whole subtree (Korean search visibility).
 *
 * (The fabricated "…님이 …결제하셨습니다" live-activity toast was removed — it
 * manufactured fake purchase notifications.)
 */
export const metadata: Metadata = {
  title: {
    default: "인히어로 에듀 | 아이비리그생이 정리한 미국 입시·AP·SAT·IB 핵심 자료실",
    // Pages under /parents already embed their own "… InHero 학부모" suffix, so
    // a no-op template avoids a doubled "… | 인히어로 학부모 | 인히어로 학부모".
    template: "%s",
  },
  description:
    "SAT·AP·IB·TOEFL을 준비하는 유학생 학부모를 위한 자료실. AP 문제 은행, 한국어 핵심 노트, 디지털 교재, 합격 수기까지 — 아이비리그 재학생이 직접 정리했습니다.",
  openGraph: {
    title: "아이비리그생이 만든 SAT·AP 입시 자료실 — 인히어로 학부모",
    description: "AP 문제 은행 · 한국어 핵심 노트 · 디지털 교재 · 합격 수기",
  },
};

export default function ParentsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
