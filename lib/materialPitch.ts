/**
 * Build a short selling description for an Ivy student note card from the
 * fields we already have (title, page count, lounge subject) — so a buyer sees
 * "AP Biology 손필기 202페이지 노트 · 아이비리그생 만점 필기노트" instead of a
 * bare filename. Pure/stateless so the hub and the materials page stay in sync.
 */
export interface MaterialPitchInput {
  title?: string | null;
  totalPages?: number | null;
  lounge?: { name?: string | null } | null;
}

export interface MaterialPitch {
  headline: string;
  sub: string;
}

/** "AP Biology Lounge" → "AP Biology" (also tolerates a missing lounge). */
function subjectFromLounge(name: string | null | undefined): string {
  return (name ?? "").replace(/\s*lounge\s*$/i, "").trim();
}

export function materialPitch(m: MaterialPitchInput): MaterialPitch {
  const subject = subjectFromLounge(m.lounge?.name);
  const pages = m.totalPages && m.totalPages > 1 ? `${m.totalPages}페이지 ` : "";
  const headline = `${subject ? `${subject} ` : ""}손필기 ${pages}노트`.replace(/\s+/g, " ").trim();
  return {
    headline,
    sub: "아이비리그 재학생이 직접 정리한 만점 필기노트",
  };
}

/** Selling bullets for the note detail modal (filled with the note's own pages). */
export function materialSellingPoints(m: MaterialPitchInput): string[] {
  const subject = subjectFromLounge(m.lounge?.name);
  const pages = m.totalPages && m.totalPages > 1 ? `${m.totalPages}페이지` : "전체";
  return [
    "✍️ 아이비리그(Cornell 등) 재학생이 직접 손으로 정리한 원본 필기",
    `📄 ${pages} 풀버전 — 미리보기는 1페이지 일부만 공개`,
    `🎯 ${subject || "이 과목"} 시험에 나오는 핵심만 압축 (교과서 수백 페이지 → 시험 직전 정리본)`,
    "💾 결제 후 PDF로 다운로드 · 영구 보유",
  ];
}

/** Note-specific testimonials for the detail modal. Representative — replace with real reviews. */
export const NOTE_REVIEWS: { name: string; role: string; stars: number; text: string }[] = [
  { name: "김O은 학부모", role: "11학년 자녀", stars: 5, text: "아이비리그생이 실제로 쓴 필기라 그런지, 시험에 뭐가 중요한지가 한눈에 보여요. 시험 전날 이것만 봤어요." },
  { name: "이O준 학생", role: "12학년", stars: 5, text: "교과서 다 읽을 시간이 없었는데, 이 노트로 핵심만 잡으니 점수가 올랐어요. 손필기라 더 머리에 남아요." },
  { name: "박O서 학생", role: "10학년", stars: 5, text: "학원 자료보다 훨씬 깔끔하게 정리돼 있어요. 헷갈리던 부분이 한 페이지로 정리돼서 바로 이해됐어요." },
  { name: "정O희 학부모", role: "11학년 자녀", stars: 5, text: "이 가격에 아이비리그 합격생 필기를 그대로 받는 건 진짜 가성비예요. 다른 과목도 다 샀습니다." },
  { name: "최O우 학생", role: "12학년", stars: 5, text: "AP 시험 직전에 이 노트로 복습했는데 5점 받았어요. 진짜 만점 필기 맞습니다." },
];
