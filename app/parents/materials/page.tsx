import type { Metadata } from "next";
import MaterialsClient from "./MaterialsClient";

export const metadata: Metadata = {
  title: "아이비리그 학생 자료방 — InHero 학부모",
  description:
    "Cornell 등 아이비리그 재학생이 직접 쓴 AP 학습 노트. 실제 합격생의 정리 노트를 한 곳에서.",
  alternates: { canonical: "/parents/materials" },
  robots: { index: false, follow: false },
};

export default function ParentMaterialsPage() {
  return <MaterialsClient />;
}
