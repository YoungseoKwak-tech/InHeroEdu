import type { Metadata } from "next";
import LoungeClient from "./LoungeClient";

export const metadata: Metadata = {
  title: "학부모 라운지 — 미국 입시 정보 나눔 | InHero 학부모",
  description:
    "미국 대학 입시를 준비하는 학부모들이 AP·SAT·STEM 활동·입시 정보를 묻고 답하는 공간. 같이 묻고 답해요.",
  alternates: { canonical: "/parents/lounge" },
  robots: { index: false, follow: false },
};

export default function LoungePage() {
  return <LoungeClient />;
}
