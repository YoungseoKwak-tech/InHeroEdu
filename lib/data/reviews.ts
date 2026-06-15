/**
 * 유저 후기 (parent / student testimonials) shown on the /parents portal.
 * NOTE: these are representative sample quotes — replace with REAL user reviews
 * as they come in (or wire a submission flow). Keep them honest.
 */

export interface Review {
  name: string;   // 이름/이니셜
  role: string;   // 학부모 / 학생 + 학년
  stars: number;  // 1–5
  text: string;
  tag?: string;   // 어떤 기능에 대한 후기인지
}

export const REVIEWS: Review[] = [
  { name: "김O은 학부모", role: "11학년 자녀", stars: 5, tag: "개념정리", text: "한국어로 개념을 먼저 잡고 영어 원문으로 넘어가니까, AP 화학을 아이가 덜 무서워해요. 흐름을 잡아주는 게 정말 다르네요." },
  { name: "이O준 학생", role: "10학년", stars: 5, tag: "단어장", text: "단어장으로 매일 10분씩 했더니 리딩 속도가 확 늘었어요. 한국어 뜻 보고 영어 떠올리는 방식이 머리에 잘 남아요." },
  { name: "박O서 학생", role: "12학년", stars: 5, tag: "문제은행", text: "문제은행 해설이 한국어라 혼자서도 오답 정리가 돼요. 왜 틀렸는지를 끝까지 알려주는 느낌." },
  { name: "정O희 학부모", role: "9학년 자녀", stars: 5, tag: "합격 수기", text: "사교육 없이 이 정도 자료가 무료라는 게 놀라워요. 합격 수기 읽고 우리 아이 로드맵을 다시 짰습니다." },
  { name: "최O우 학생", role: "11학년", stars: 5, tag: "SAT 모의고사", text: "SAT 모의고사가 적응형이라 실제 블루북이랑 비슷해서 좋았어요. 점수 추이도 보여서 동기부여가 돼요." },
  { name: "한O아 학부모", role: "10학년 자녀", stars: 5, tag: "자기주도", text: "단어 → 개념 → 해설 → 단권화 순서대로 따라가니 아이가 스스로 공부하는 루틴이 잡혔어요." },
];
