/**
 * 합격 사례 100선 — COMPOSITE, FICTIONAL admit profiles.
 *
 * ⚠️ LEGAL: Auto-generated original composites from public US-admissions
 * patterns. NOT real individuals, NOT scraped/verbatim essays, no PII. Always
 * render with the "재구성 예시" disclaimer. Regenerate: node scripts/admit-cases-gen.mjs
 */
export interface AdmitCase {
  id: number;
  archetype: string;
  archetypeKey: string;
  tier: "ivy" | "t20" | "t50";
  tierKo: string;
  majorEn: string;
  majorKo: string;
  profile: string;
  spike: string;
  activities: string[];
  essayAngle: string;
  whyItWorked: string[];
}

export const ADMIT_CASES: AdmitCase[] = [
  {
    "id": 1,
    "archetype": "인문·글쓰기형",
    "archetypeKey": "humanities",
    "tier": "t20",
    "tierKo": "Top 20",
    "majorEn": "Visual / Performing Arts",
    "majorKo": "미술·공연예술",
    "profile": "미술·공연예술 지망 · 인문·글쓰기형",
    "spike": "읽고 쓰고 토론으로 세상을 해석",
    "activities": [
      "온라인에 작품을 꾸준히 발표하며 팔로워 형성",
      "개인전/공연을 지역에서 개최",
      "학교 축제의 미술/무대를 총괄"
    ],
    "essayAngle": "가족의 언어와 학교의 언어 사이에서 자란 정체성",
    "whyItWorked": [
      "사고의 결이 섬세하고 독창적 관점이 있음",
      "활동(교지·토론·아카이브)이 글쓰기 정체성으로 수렴",
      "탁월한 문장력 자체가 인문 전공 적합성의 증거"
    ]
  },
  {
    "id": 2,
    "archetype": "예술·창작형",
    "archetypeKey": "arts",
    "tier": "ivy",
    "tierKo": "아이비+ (Ivy/Stanford/MIT 급)",
    "majorEn": "Visual / Performing Arts",
    "majorKo": "미술·공연예술",
    "profile": "미술·공연예술 지망 · 예술·창작형",
    "spike": "독창적 작품 세계 + 꾸준한 발표",
    "activities": [
      "개인전/공연을 지역에서 개최",
      "지역 아동에게 예술 수업을 무료로 진행",
      "학교 축제의 미술/무대를 총괄"
    ],
    "essayAngle": "관객/독자의 반응이 창작관을 바꾼 전환점",
    "whyItWorked": [
      "정량 지표가 약한 분야를 스토리로 강하게 보완",
      "포트폴리오·발표 이력으로 진정성과 지속성 입증",
      "기술이 아니라 '관점'이 있는 창작자임을 서사로 증명"
    ]
  },
  {
    "id": 3,
    "archetype": "창업·메이커형",
    "archetypeKey": "entrepreneur",
    "tier": "t50",
    "tierKo": "Top 50 / 주립 명문",
    "majorEn": "Economics",
    "majorKo": "경제학",
    "profile": "경제학 지망 · 창업·메이커형",
    "spike": "문제를 발견하고 직접 만들어 해결",
    "activities": [
      "지역 소상공인 데이터를 분석한 리포트 발간",
      "금융 문해력 워크숍을 또래에게 진행",
      "교내 투자/경제 동아리를 운영"
    ],
    "essayAngle": "기술이 아니라 사람을 향했던 프로젝트의 출발점",
    "whyItWorked": [
      "impact를 숫자로 보여주되 동기는 사람 중심이라 진정성 있음",
      "교과 밖에서 만든 결과물이 전공 적합성을 자연 증명"
    ]
  },
  {
    "id": 4,
    "archetype": "STEM 경시·올림피아드형",
    "archetypeKey": "stem-comp",
    "tier": "t20",
    "tierKo": "Top 20",
    "majorEn": "Mechanical Engineering",
    "majorKo": "기계공학",
    "profile": "기계공학 지망 · STEM 경시·올림피아드형",
    "spike": "수학·과학 경시 깊이 + 가르침으로 확장",
    "activities": [
      "교내 메이커스페이스를 운영",
      "로보틱스 팀에서 설계를 맡아 지역 대회 입상",
      "태양광 소형 장치를 직접 제작",
      "저비용 보조기구를 설계해 시제품 제작"
    ],
    "essayAngle": "한 문제를 며칠씩 붙들었던 몰입의 즐거움",
    "whyItWorked": [
      "전공 적합성과 지적 열정이 일치",
      "학문적 깊이를 수상이 아니라 사고로 증명"
    ]
  },
  {
    "id": 5,
    "archetype": "리더십·조직형",
    "archetypeKey": "leadership",
    "tier": "t20",
    "tierKo": "Top 20",
    "majorEn": "Environmental Science",
    "majorKo": "환경과학",
    "profile": "환경과학 지망 · 리더십·조직형",
    "spike": "조직을 키우고 사람을 움직인 경험",
    "activities": [
      "환경 다큐 단편을 제작",
      "시민과학 프로젝트에 데이터 기여",
      "지역 하천 수질을 1년간 측정·기록"
    ],
    "essayAngle": "물려받은 동아리를 다음 세대에 더 좋게 넘긴 이야기",
    "whyItWorked": [
      "직책이 아니라 '변화시킨 결과'로 리더십을 증명",
      "겸손과 책임감이 함께 드러나 호감",
      "다년간의 헌신과 승계까지 보여 지속성 입증"
    ]
  },
  {
    "id": 6,
    "archetype": "연구 몰입형",
    "archetypeKey": "research",
    "tier": "ivy",
    "tierKo": "아이비+ (Ivy/Stanford/MIT 급)",
    "majorEn": "Economics",
    "majorKo": "경제학",
    "profile": "경제학 지망 · 연구 몰입형",
    "spike": "한 분야를 끝까지 파고든 자기주도 연구",
    "activities": [
      "경제 블로그/뉴스레터를 꾸준히 발행",
      "금융 문해력 워크숍을 또래에게 진행",
      "교내 투자/경제 동아리를 운영"
    ],
    "essayAngle": "실패한 실험에서 배운 '데이터가 나를 반박할 때'의 겸손",
    "whyItWorked": [
      "교내 자원이 부족한 환경에서 스스로 길을 낸 자기주도성",
      "스파이크가 선명하다 — 활동이 흩어지지 않고 한 줄기로 수렴",
      "'결과'보다 '사고 과정'을 보여줘 지적 성숙도를 증명"
    ]
  },
  {
    "id": 7,
    "archetype": "환경·지속가능성형",
    "archetypeKey": "environment",
    "tier": "ivy",
    "tierKo": "아이비+ (Ivy/Stanford/MIT 급)",
    "majorEn": "Computer Science",
    "majorKo": "컴퓨터과학",
    "profile": "컴퓨터과학 지망 · 환경·지속가능성형",
    "spike": "기후·환경 문제에 대한 구체적 실천",
    "activities": [
      "머신러닝으로 동네 데이터 문제를 분석",
      "오픈소스 프로젝트에 기여하고 별 수백 개를 받음",
      "교내 코딩 동아리를 만들어 후배 30명을 가르침",
      "지역 비영리를 위한 무료 웹앱을 만들어 운영"
    ],
    "essayAngle": "눈앞의 강/숲/동네에서 출발한 환경 행동",
    "whyItWorked": [
      "가치관과 활동이 일관되게 정렬",
      "글로벌 이슈를 '내 동네'의 구체적 행동으로 환원"
    ]
  },
  {
    "id": 8,
    "archetype": "사회운동·임팩트형",
    "archetypeKey": "social",
    "tier": "ivy",
    "tierKo": "아이비+ (Ivy/Stanford/MIT 급)",
    "majorEn": "Political Science",
    "majorKo": "정치학",
    "profile": "정치학 지망 · 사회운동·임팩트형",
    "spike": "지역 사회의 구체적 문제를 지속적으로 해결",
    "activities": [
      "청소년 정책 제안을 지자체에 제출",
      "지역 이슈 캠페인을 조직",
      "시민 교육 팟캐스트를 운영"
    ],
    "essayAngle": "봉사 '시간'이 아니라 한 사람과의 관계가 바꾼 관점",
    "whyItWorked": [
      "일회성 봉사가 아니라 다년간의 지속성과 리더십이 보임",
      "'시혜'가 아닌 '연대'의 태도가 성숙하게 드러남",
      "지역 문제→구체적 행동의 연결이 명확"
    ]
  },
  {
    "id": 9,
    "archetype": "리더십·조직형",
    "archetypeKey": "leadership",
    "tier": "ivy",
    "tierKo": "아이비+ (Ivy/Stanford/MIT 급)",
    "majorEn": "English / Creative Writing",
    "majorKo": "영문·문예창작",
    "profile": "영문·문예창작 지망 · 리더십·조직형",
    "spike": "조직을 키우고 사람을 움직인 경험",
    "activities": [
      "단편을 청소년 공모전에 꾸준히 출품",
      "지역 도서관에서 글쓰기 워크숍을 운영",
      "교지 편집장으로 다년간 활동"
    ],
    "essayAngle": "리더가 '앞에서 끄는 것'이 아님을 배운 실패담",
    "whyItWorked": [
      "겸손과 책임감이 함께 드러나 호감",
      "다년간의 헌신과 승계까지 보여 지속성 입증",
      "직책이 아니라 '변화시킨 결과'로 리더십을 증명"
    ]
  },
  {
    "id": 10,
    "archetype": "STEM 경시·올림피아드형",
    "archetypeKey": "stem-comp",
    "tier": "t20",
    "tierKo": "Top 20",
    "majorEn": "Computer Science",
    "majorKo": "컴퓨터과학",
    "profile": "컴퓨터과학 지망 · STEM 경시·올림피아드형",
    "spike": "수학·과학 경시 깊이 + 가르침으로 확장",
    "activities": [
      "머신러닝으로 동네 데이터 문제를 분석",
      "교내 코딩 동아리를 만들어 후배 30명을 가르침",
      "지역 비영리를 위한 무료 웹앱을 만들어 운영"
    ],
    "essayAngle": "경쟁의 승부욕을 넘어 '아름다운 문제'에 끌린 이유",
    "whyItWorked": [
      "전공 적합성과 지적 열정이 일치",
      "학문적 깊이를 수상이 아니라 사고로 증명",
      "경시 실력을 '나눔(튜터링·동아리)'으로 확장해 이기심 우려 해소"
    ]
  },
  {
    "id": 11,
    "archetype": "STEM 경시·올림피아드형",
    "archetypeKey": "stem-comp",
    "tier": "ivy",
    "tierKo": "아이비+ (Ivy/Stanford/MIT 급)",
    "majorEn": "Visual / Performing Arts",
    "majorKo": "미술·공연예술",
    "profile": "미술·공연예술 지망 · STEM 경시·올림피아드형",
    "spike": "수학·과학 경시 깊이 + 가르침으로 확장",
    "activities": [
      "학교 축제의 미술/무대를 총괄",
      "온라인에 작품을 꾸준히 발표하며 팔로워 형성",
      "지역 아동에게 예술 수업을 무료로 진행"
    ],
    "essayAngle": "한 문제를 며칠씩 붙들었던 몰입의 즐거움",
    "whyItWorked": [
      "경시 실력을 '나눔(튜터링·동아리)'으로 확장해 이기심 우려 해소",
      "학문적 깊이를 수상이 아니라 사고로 증명",
      "전공 적합성과 지적 열정이 일치"
    ]
  },
  {
    "id": 12,
    "archetype": "창업·메이커형",
    "archetypeKey": "entrepreneur",
    "tier": "t20",
    "tierKo": "Top 20",
    "majorEn": "English / Creative Writing",
    "majorKo": "영문·문예창작",
    "profile": "영문·문예창작 지망 · 창업·메이커형",
    "spike": "문제를 발견하고 직접 만들어 해결",
    "activities": [
      "문학 웹진을 창간해 또래 작품을 큐레이션",
      "단편을 청소년 공모전에 꾸준히 출품",
      "지역 도서관에서 글쓰기 워크숍을 운영",
      "교지 편집장으로 다년간 활동"
    ],
    "essayAngle": "실패한 첫 제품에서 고객의 '진짜 문제'를 다시 정의한 이야기",
    "whyItWorked": [
      "impact를 숫자로 보여주되 동기는 사람 중심이라 진정성 있음",
      "교과 밖에서 만든 결과물이 전공 적합성을 자연 증명"
    ]
  },
  {
    "id": 13,
    "archetype": "창업·메이커형",
    "archetypeKey": "entrepreneur",
    "tier": "t50",
    "tierKo": "Top 50 / 주립 명문",
    "majorEn": "Mechanical Engineering",
    "majorKo": "기계공학",
    "profile": "기계공학 지망 · 창업·메이커형",
    "spike": "문제를 발견하고 직접 만들어 해결",
    "activities": [
      "저비용 보조기구를 설계해 시제품 제작",
      "교내 메이커스페이스를 운영",
      "태양광 소형 장치를 직접 제작"
    ],
    "essayAngle": "실패한 첫 제품에서 고객의 '진짜 문제'를 다시 정의한 이야기",
    "whyItWorked": [
      "주도성과 회복탄력성(실패→재시도)이 동시에 드러남",
      "impact를 숫자로 보여주되 동기는 사람 중심이라 진정성 있음",
      "교과 밖에서 만든 결과물이 전공 적합성을 자연 증명"
    ]
  },
  {
    "id": 14,
    "archetype": "인문·글쓰기형",
    "archetypeKey": "humanities",
    "tier": "t20",
    "tierKo": "Top 20",
    "majorEn": "Political Science",
    "majorKo": "정치학",
    "profile": "정치학 지망 · 인문·글쓰기형",
    "spike": "읽고 쓰고 토론으로 세상을 해석",
    "activities": [
      "청소년 정책 제안을 지자체에 제출",
      "시민 교육 팟캐스트를 운영",
      "모의국회·토론에서 다년간 활동",
      "지역 이슈 캠페인을 조직"
    ],
    "essayAngle": "가족의 언어와 학교의 언어 사이에서 자란 정체성",
    "whyItWorked": [
      "활동(교지·토론·아카이브)이 글쓰기 정체성으로 수렴",
      "사고의 결이 섬세하고 독창적 관점이 있음",
      "탁월한 문장력 자체가 인문 전공 적합성의 증거"
    ]
  },
  {
    "id": 15,
    "archetype": "인문·글쓰기형",
    "archetypeKey": "humanities",
    "tier": "t20",
    "tierKo": "Top 20",
    "majorEn": "Computer Science",
    "majorKo": "컴퓨터과학",
    "profile": "컴퓨터과학 지망 · 인문·글쓰기형",
    "spike": "읽고 쓰고 토론으로 세상을 해석",
    "activities": [
      "오픈소스 프로젝트에 기여하고 별 수백 개를 받음",
      "교내 코딩 동아리를 만들어 후배 30명을 가르침",
      "머신러닝으로 동네 데이터 문제를 분석",
      "지역 비영리를 위한 무료 웹앱을 만들어 운영"
    ],
    "essayAngle": "역사 속 한 인물에게 던진 편지 형식의 성찰",
    "whyItWorked": [
      "사고의 결이 섬세하고 독창적 관점이 있음",
      "활동(교지·토론·아카이브)이 글쓰기 정체성으로 수렴"
    ]
  },
  {
    "id": 16,
    "archetype": "STEM 경시·올림피아드형",
    "archetypeKey": "stem-comp",
    "tier": "ivy",
    "tierKo": "아이비+ (Ivy/Stanford/MIT 급)",
    "majorEn": "English / Creative Writing",
    "majorKo": "영문·문예창작",
    "profile": "영문·문예창작 지망 · STEM 경시·올림피아드형",
    "spike": "수학·과학 경시 깊이 + 가르침으로 확장",
    "activities": [
      "교지 편집장으로 다년간 활동",
      "문학 웹진을 창간해 또래 작품을 큐레이션",
      "단편을 청소년 공모전에 꾸준히 출품",
      "지역 도서관에서 글쓰기 워크숍을 운영"
    ],
    "essayAngle": "경쟁의 승부욕을 넘어 '아름다운 문제'에 끌린 이유",
    "whyItWorked": [
      "전공 적합성과 지적 열정이 일치",
      "경시 실력을 '나눔(튜터링·동아리)'으로 확장해 이기심 우려 해소",
      "학문적 깊이를 수상이 아니라 사고로 증명"
    ]
  },
  {
    "id": 17,
    "archetype": "사회운동·임팩트형",
    "archetypeKey": "social",
    "tier": "t50",
    "tierKo": "Top 50 / 주립 명문",
    "majorEn": "Computer Science",
    "majorKo": "컴퓨터과학",
    "profile": "컴퓨터과학 지망 · 사회운동·임팩트형",
    "spike": "지역 사회의 구체적 문제를 지속적으로 해결",
    "activities": [
      "머신러닝으로 동네 데이터 문제를 분석",
      "지역 비영리를 위한 무료 웹앱을 만들어 운영",
      "오픈소스 프로젝트에 기여하고 별 수백 개를 받음"
    ],
    "essayAngle": "도움을 주려다 오히려 배운 것의 역전",
    "whyItWorked": [
      "지역 문제→구체적 행동의 연결이 명확",
      "일회성 봉사가 아니라 다년간의 지속성과 리더십이 보임"
    ]
  },
  {
    "id": 18,
    "archetype": "역경 극복·성장형",
    "archetypeKey": "resilience",
    "tier": "t50",
    "tierKo": "Top 50 / 주립 명문",
    "majorEn": "Biology / Pre-med",
    "majorKo": "생물·의예",
    "profile": "생물·의예 지망 · 역경 극복·성장형",
    "spike": "개인적 어려움을 의미로 전환",
    "activities": [
      "지역 병원·연구실에서 보조로 참여",
      "공중보건 캠페인을 기획해 또래에게 전파",
      "희귀질환 환자 가족을 위한 정보 아카이브 구축",
      "교내 과학 저널을 창간"
    ],
    "essayAngle": "가정의 사정으로 일찍 어른이 되어야 했던 시간의 재해석",
    "whyItWorked": [
      "역경 자체가 아니라 '그로부터 무엇을 했는가'에 초점",
      "맥락(환경)을 고려한 성취의 무게가 전달됨"
    ]
  },
  {
    "id": 19,
    "archetype": "역경 극복·성장형",
    "archetypeKey": "resilience",
    "tier": "t20",
    "tierKo": "Top 20",
    "majorEn": "Computer Science",
    "majorKo": "컴퓨터과학",
    "profile": "컴퓨터과학 지망 · 역경 극복·성장형",
    "spike": "개인적 어려움을 의미로 전환",
    "activities": [
      "교내 코딩 동아리를 만들어 후배 30명을 가르침",
      "오픈소스 프로젝트에 기여하고 별 수백 개를 받음",
      "지역 비영리를 위한 무료 웹앱을 만들어 운영"
    ],
    "essayAngle": "언어·이주·건강 등 장벽을 넘으며 만든 자신만의 관점",
    "whyItWorked": [
      "역경 자체가 아니라 '그로부터 무엇을 했는가'에 초점",
      "맥락(환경)을 고려한 성취의 무게가 전달됨",
      "공감과 성숙함이 진정성 있게 드러남"
    ]
  },
  {
    "id": 20,
    "archetype": "역경 극복·성장형",
    "archetypeKey": "resilience",
    "tier": "t20",
    "tierKo": "Top 20",
    "majorEn": "Political Science",
    "majorKo": "정치학",
    "profile": "정치학 지망 · 역경 극복·성장형",
    "spike": "개인적 어려움을 의미로 전환",
    "activities": [
      "시민 교육 팟캐스트를 운영",
      "청소년 정책 제안을 지자체에 제출",
      "모의국회·토론에서 다년간 활동",
      "지역 이슈 캠페인을 조직"
    ],
    "essayAngle": "'약점'이라 여긴 것이 강점이 된 전환",
    "whyItWorked": [
      "공감과 성숙함이 진정성 있게 드러남",
      "역경 자체가 아니라 '그로부터 무엇을 했는가'에 초점",
      "맥락(환경)을 고려한 성취의 무게가 전달됨"
    ]
  },
  {
    "id": 21,
    "archetype": "연구 몰입형",
    "archetypeKey": "research",
    "tier": "ivy",
    "tierKo": "아이비+ (Ivy/Stanford/MIT 급)",
    "majorEn": "Mechanical Engineering",
    "majorKo": "기계공학",
    "profile": "기계공학 지망 · 연구 몰입형",
    "spike": "한 분야를 끝까지 파고든 자기주도 연구",
    "activities": [
      "로보틱스 팀에서 설계를 맡아 지역 대회 입상",
      "태양광 소형 장치를 직접 제작",
      "교내 메이커스페이스를 운영",
      "저비용 보조기구를 설계해 시제품 제작"
    ],
    "essayAngle": "실패한 실험에서 배운 '데이터가 나를 반박할 때'의 겸손",
    "whyItWorked": [
      "교내 자원이 부족한 환경에서 스스로 길을 낸 자기주도성",
      "'결과'보다 '사고 과정'을 보여줘 지적 성숙도를 증명"
    ]
  },
  {
    "id": 22,
    "archetype": "예술·창작형",
    "archetypeKey": "arts",
    "tier": "ivy",
    "tierKo": "아이비+ (Ivy/Stanford/MIT 급)",
    "majorEn": "Biology / Pre-med",
    "majorKo": "생물·의예",
    "profile": "생물·의예 지망 · 예술·창작형",
    "spike": "독창적 작품 세계 + 꾸준한 발표",
    "activities": [
      "교내 과학 저널을 창간",
      "지역 병원·연구실에서 보조로 참여",
      "희귀질환 환자 가족을 위한 정보 아카이브 구축",
      "공중보건 캠페인을 기획해 또래에게 전파"
    ],
    "essayAngle": "'잘 그리기'에서 '말하기'로 넘어간 예술관의 변화",
    "whyItWorked": [
      "포트폴리오·발표 이력으로 진정성과 지속성 입증",
      "정량 지표가 약한 분야를 스토리로 강하게 보완",
      "기술이 아니라 '관점'이 있는 창작자임을 서사로 증명"
    ]
  },
  {
    "id": 23,
    "archetype": "역경 극복·성장형",
    "archetypeKey": "resilience",
    "tier": "t20",
    "tierKo": "Top 20",
    "majorEn": "Environmental Science",
    "majorKo": "환경과학",
    "profile": "환경과학 지망 · 역경 극복·성장형",
    "spike": "개인적 어려움을 의미로 전환",
    "activities": [
      "지역 하천 수질을 1년간 측정·기록",
      "시민과학 프로젝트에 데이터 기여",
      "환경 다큐 단편을 제작"
    ],
    "essayAngle": "가정의 사정으로 일찍 어른이 되어야 했던 시간의 재해석",
    "whyItWorked": [
      "맥락(환경)을 고려한 성취의 무게가 전달됨",
      "역경 자체가 아니라 '그로부터 무엇을 했는가'에 초점",
      "공감과 성숙함이 진정성 있게 드러남"
    ]
  },
  {
    "id": 24,
    "archetype": "환경·지속가능성형",
    "archetypeKey": "environment",
    "tier": "t20",
    "tierKo": "Top 20",
    "majorEn": "Political Science",
    "majorKo": "정치학",
    "profile": "정치학 지망 · 환경·지속가능성형",
    "spike": "기후·환경 문제에 대한 구체적 실천",
    "activities": [
      "모의국회·토론에서 다년간 활동",
      "청소년 정책 제안을 지자체에 제출",
      "시민 교육 팟캐스트를 운영",
      "지역 이슈 캠페인을 조직"
    ],
    "essayAngle": "눈앞의 강/숲/동네에서 출발한 환경 행동",
    "whyItWorked": [
      "글로벌 이슈를 '내 동네'의 구체적 행동으로 환원",
      "가치관과 활동이 일관되게 정렬"
    ]
  },
  {
    "id": 25,
    "archetype": "융합·경계횡단형",
    "archetypeKey": "interdisc",
    "tier": "t50",
    "tierKo": "Top 50 / 주립 명문",
    "majorEn": "Mathematics",
    "majorKo": "수학",
    "profile": "수학 지망 · 융합·경계횡단형",
    "spike": "두 분야를 잇는 독특한 교차점",
    "activities": [
      "수학 경시에서 다년간 입상",
      "후배를 위한 무료 수학 캠프를 운영",
      "수학 저널/문제집을 직접 제작"
    ],
    "essayAngle": "경계에서만 보이는 문제를 발견한 순간",
    "whyItWorked": [
      "호기심의 폭과 깊이를 동시에 증명",
      "융합형 전공·커리큘럼과의 적합성이 자연스럽게 드러남"
    ]
  },
  {
    "id": 26,
    "archetype": "리더십·조직형",
    "archetypeKey": "leadership",
    "tier": "t50",
    "tierKo": "Top 50 / 주립 명문",
    "majorEn": "Computer Science",
    "majorKo": "컴퓨터과학",
    "profile": "컴퓨터과학 지망 · 리더십·조직형",
    "spike": "조직을 키우고 사람을 움직인 경험",
    "activities": [
      "머신러닝으로 동네 데이터 문제를 분석",
      "지역 비영리를 위한 무료 웹앱을 만들어 운영",
      "오픈소스 프로젝트에 기여하고 별 수백 개를 받음"
    ],
    "essayAngle": "갈등을 중재하며 배운 경청의 힘",
    "whyItWorked": [
      "겸손과 책임감이 함께 드러나 호감",
      "다년간의 헌신과 승계까지 보여 지속성 입증"
    ]
  },
  {
    "id": 27,
    "archetype": "역경 극복·성장형",
    "archetypeKey": "resilience",
    "tier": "t20",
    "tierKo": "Top 20",
    "majorEn": "Economics",
    "majorKo": "경제학",
    "profile": "경제학 지망 · 역경 극복·성장형",
    "spike": "개인적 어려움을 의미로 전환",
    "activities": [
      "금융 문해력 워크숍을 또래에게 진행",
      "교내 투자/경제 동아리를 운영",
      "지역 소상공인 데이터를 분석한 리포트 발간",
      "경제 블로그/뉴스레터를 꾸준히 발행"
    ],
    "essayAngle": "가정의 사정으로 일찍 어른이 되어야 했던 시간의 재해석",
    "whyItWorked": [
      "맥락(환경)을 고려한 성취의 무게가 전달됨",
      "역경 자체가 아니라 '그로부터 무엇을 했는가'에 초점",
      "공감과 성숙함이 진정성 있게 드러남"
    ]
  },
  {
    "id": 28,
    "archetype": "사회운동·임팩트형",
    "archetypeKey": "social",
    "tier": "t20",
    "tierKo": "Top 20",
    "majorEn": "English / Creative Writing",
    "majorKo": "영문·문예창작",
    "profile": "영문·문예창작 지망 · 사회운동·임팩트형",
    "spike": "지역 사회의 구체적 문제를 지속적으로 해결",
    "activities": [
      "지역 도서관에서 글쓰기 워크숍을 운영",
      "문학 웹진을 창간해 또래 작품을 큐레이션",
      "단편을 청소년 공모전에 꾸준히 출품"
    ],
    "essayAngle": "봉사 '시간'이 아니라 한 사람과의 관계가 바꾼 관점",
    "whyItWorked": [
      "'시혜'가 아닌 '연대'의 태도가 성숙하게 드러남",
      "지역 문제→구체적 행동의 연결이 명확"
    ]
  },
  {
    "id": 29,
    "archetype": "융합·경계횡단형",
    "archetypeKey": "interdisc",
    "tier": "t50",
    "tierKo": "Top 50 / 주립 명문",
    "majorEn": "Political Science",
    "majorKo": "정치학",
    "profile": "정치학 지망 · 융합·경계횡단형",
    "spike": "두 분야를 잇는 독특한 교차점",
    "activities": [
      "시민 교육 팟캐스트를 운영",
      "지역 이슈 캠페인을 조직",
      "청소년 정책 제안을 지자체에 제출"
    ],
    "essayAngle": "예술과 코드, 생물과 음악처럼 두 세계를 잇게 된 계기",
    "whyItWorked": [
      "호기심의 폭과 깊이를 동시에 증명",
      "융합형 전공·커리큘럼과의 적합성이 자연스럽게 드러남"
    ]
  },
  {
    "id": 30,
    "archetype": "역경 극복·성장형",
    "archetypeKey": "resilience",
    "tier": "ivy",
    "tierKo": "아이비+ (Ivy/Stanford/MIT 급)",
    "majorEn": "Sociology / Public Policy",
    "majorKo": "사회학·공공정책",
    "profile": "사회학·공공정책 지망 · 역경 극복·성장형",
    "spike": "개인적 어려움을 의미로 전환",
    "activities": [
      "공공도서관과 협업한 프로그램을 기획",
      "불평등 이슈 캠페인을 조직",
      "사회 문제를 다룬 설문·리서치를 발표",
      "지역 이주민 가정을 돕는 멘토링을 운영"
    ],
    "essayAngle": "언어·이주·건강 등 장벽을 넘으며 만든 자신만의 관점",
    "whyItWorked": [
      "맥락(환경)을 고려한 성취의 무게가 전달됨",
      "역경 자체가 아니라 '그로부터 무엇을 했는가'에 초점"
    ]
  },
  {
    "id": 31,
    "archetype": "사회운동·임팩트형",
    "archetypeKey": "social",
    "tier": "t20",
    "tierKo": "Top 20",
    "majorEn": "Environmental Science",
    "majorKo": "환경과학",
    "profile": "환경과학 지망 · 사회운동·임팩트형",
    "spike": "지역 사회의 구체적 문제를 지속적으로 해결",
    "activities": [
      "교내 제로웨이스트 캠페인을 주도",
      "환경 다큐 단편을 제작",
      "지역 하천 수질을 1년간 측정·기록"
    ],
    "essayAngle": "봉사 '시간'이 아니라 한 사람과의 관계가 바꾼 관점",
    "whyItWorked": [
      "'시혜'가 아닌 '연대'의 태도가 성숙하게 드러남",
      "일회성 봉사가 아니라 다년간의 지속성과 리더십이 보임"
    ]
  },
  {
    "id": 32,
    "archetype": "환경·지속가능성형",
    "archetypeKey": "environment",
    "tier": "t20",
    "tierKo": "Top 20",
    "majorEn": "Sociology / Public Policy",
    "majorKo": "사회학·공공정책",
    "profile": "사회학·공공정책 지망 · 환경·지속가능성형",
    "spike": "기후·환경 문제에 대한 구체적 실천",
    "activities": [
      "사회 문제를 다룬 설문·리서치를 발표",
      "불평등 이슈 캠페인을 조직",
      "공공도서관과 협업한 프로그램을 기획",
      "지역 이주민 가정을 돕는 멘토링을 운영"
    ],
    "essayAngle": "눈앞의 강/숲/동네에서 출발한 환경 행동",
    "whyItWorked": [
      "가치관과 활동이 일관되게 정렬",
      "글로벌 이슈를 '내 동네'의 구체적 행동으로 환원"
    ]
  },
  {
    "id": 33,
    "archetype": "리더십·조직형",
    "archetypeKey": "leadership",
    "tier": "t20",
    "tierKo": "Top 20",
    "majorEn": "Mechanical Engineering",
    "majorKo": "기계공학",
    "profile": "기계공학 지망 · 리더십·조직형",
    "spike": "조직을 키우고 사람을 움직인 경험",
    "activities": [
      "교내 메이커스페이스를 운영",
      "태양광 소형 장치를 직접 제작",
      "로보틱스 팀에서 설계를 맡아 지역 대회 입상"
    ],
    "essayAngle": "갈등을 중재하며 배운 경청의 힘",
    "whyItWorked": [
      "직책이 아니라 '변화시킨 결과'로 리더십을 증명",
      "다년간의 헌신과 승계까지 보여 지속성 입증"
    ]
  },
  {
    "id": 34,
    "archetype": "역경 극복·성장형",
    "archetypeKey": "resilience",
    "tier": "ivy",
    "tierKo": "아이비+ (Ivy/Stanford/MIT 급)",
    "majorEn": "Mechanical Engineering",
    "majorKo": "기계공학",
    "profile": "기계공학 지망 · 역경 극복·성장형",
    "spike": "개인적 어려움을 의미로 전환",
    "activities": [
      "교내 메이커스페이스를 운영",
      "태양광 소형 장치를 직접 제작",
      "로보틱스 팀에서 설계를 맡아 지역 대회 입상",
      "저비용 보조기구를 설계해 시제품 제작"
    ],
    "essayAngle": "가정의 사정으로 일찍 어른이 되어야 했던 시간의 재해석",
    "whyItWorked": [
      "공감과 성숙함이 진정성 있게 드러남",
      "맥락(환경)을 고려한 성취의 무게가 전달됨"
    ]
  },
  {
    "id": 35,
    "archetype": "창업·메이커형",
    "archetypeKey": "entrepreneur",
    "tier": "ivy",
    "tierKo": "아이비+ (Ivy/Stanford/MIT 급)",
    "majorEn": "Political Science",
    "majorKo": "정치학",
    "profile": "정치학 지망 · 창업·메이커형",
    "spike": "문제를 발견하고 직접 만들어 해결",
    "activities": [
      "시민 교육 팟캐스트를 운영",
      "모의국회·토론에서 다년간 활동",
      "청소년 정책 제안을 지자체에 제출",
      "지역 이슈 캠페인을 조직"
    ],
    "essayAngle": "기술이 아니라 사람을 향했던 프로젝트의 출발점",
    "whyItWorked": [
      "교과 밖에서 만든 결과물이 전공 적합성을 자연 증명",
      "주도성과 회복탄력성(실패→재시도)이 동시에 드러남"
    ]
  },
  {
    "id": 36,
    "archetype": "인문·글쓰기형",
    "archetypeKey": "humanities",
    "tier": "t50",
    "tierKo": "Top 50 / 주립 명문",
    "majorEn": "Economics",
    "majorKo": "경제학",
    "profile": "경제학 지망 · 인문·글쓰기형",
    "spike": "읽고 쓰고 토론으로 세상을 해석",
    "activities": [
      "교내 투자/경제 동아리를 운영",
      "경제 블로그/뉴스레터를 꾸준히 발행",
      "금융 문해력 워크숍을 또래에게 진행",
      "지역 소상공인 데이터를 분석한 리포트 발간"
    ],
    "essayAngle": "한 권의 책이 오래된 신념을 흔든 경험",
    "whyItWorked": [
      "탁월한 문장력 자체가 인문 전공 적합성의 증거",
      "활동(교지·토론·아카이브)이 글쓰기 정체성으로 수렴"
    ]
  },
  {
    "id": 37,
    "archetype": "연구 몰입형",
    "archetypeKey": "research",
    "tier": "t50",
    "tierKo": "Top 50 / 주립 명문",
    "majorEn": "Sociology / Public Policy",
    "majorKo": "사회학·공공정책",
    "profile": "사회학·공공정책 지망 · 연구 몰입형",
    "spike": "한 분야를 끝까지 파고든 자기주도 연구",
    "activities": [
      "불평등 이슈 캠페인을 조직",
      "지역 이주민 가정을 돕는 멘토링을 운영",
      "공공도서관과 협업한 프로그램을 기획",
      "사회 문제를 다룬 설문·리서치를 발표"
    ],
    "essayAngle": "호기심에서 시작한 작은 질문이 1년 넘는 탐구로 이어진 과정",
    "whyItWorked": [
      "스파이크가 선명하다 — 활동이 흩어지지 않고 한 줄기로 수렴",
      "교내 자원이 부족한 환경에서 스스로 길을 낸 자기주도성",
      "'결과'보다 '사고 과정'을 보여줘 지적 성숙도를 증명"
    ]
  },
  {
    "id": 38,
    "archetype": "연구 몰입형",
    "archetypeKey": "research",
    "tier": "t50",
    "tierKo": "Top 50 / 주립 명문",
    "majorEn": "Biology / Pre-med",
    "majorKo": "생물·의예",
    "profile": "생물·의예 지망 · 연구 몰입형",
    "spike": "한 분야를 끝까지 파고든 자기주도 연구",
    "activities": [
      "희귀질환 환자 가족을 위한 정보 아카이브 구축",
      "지역 병원·연구실에서 보조로 참여",
      "교내 과학 저널을 창간"
    ],
    "essayAngle": "실패한 실험에서 배운 '데이터가 나를 반박할 때'의 겸손",
    "whyItWorked": [
      "'결과'보다 '사고 과정'을 보여줘 지적 성숙도를 증명",
      "교내 자원이 부족한 환경에서 스스로 길을 낸 자기주도성",
      "스파이크가 선명하다 — 활동이 흩어지지 않고 한 줄기로 수렴"
    ]
  },
  {
    "id": 39,
    "archetype": "리더십·조직형",
    "archetypeKey": "leadership",
    "tier": "ivy",
    "tierKo": "아이비+ (Ivy/Stanford/MIT 급)",
    "majorEn": "Mathematics",
    "majorKo": "수학",
    "profile": "수학 지망 · 리더십·조직형",
    "spike": "조직을 키우고 사람을 움직인 경험",
    "activities": [
      "수학 경시에서 다년간 입상",
      "후배를 위한 무료 수학 캠프를 운영",
      "수학 저널/문제집을 직접 제작",
      "수학으로 실제 데이터를 모델링"
    ],
    "essayAngle": "물려받은 동아리를 다음 세대에 더 좋게 넘긴 이야기",
    "whyItWorked": [
      "다년간의 헌신과 승계까지 보여 지속성 입증",
      "직책이 아니라 '변화시킨 결과'로 리더십을 증명"
    ]
  },
  {
    "id": 40,
    "archetype": "인문·글쓰기형",
    "archetypeKey": "humanities",
    "tier": "t50",
    "tierKo": "Top 50 / 주립 명문",
    "majorEn": "Biology / Pre-med",
    "majorKo": "생물·의예",
    "profile": "생물·의예 지망 · 인문·글쓰기형",
    "spike": "읽고 쓰고 토론으로 세상을 해석",
    "activities": [
      "교내 과학 저널을 창간",
      "희귀질환 환자 가족을 위한 정보 아카이브 구축",
      "지역 병원·연구실에서 보조로 참여"
    ],
    "essayAngle": "역사 속 한 인물에게 던진 편지 형식의 성찰",
    "whyItWorked": [
      "사고의 결이 섬세하고 독창적 관점이 있음",
      "활동(교지·토론·아카이브)이 글쓰기 정체성으로 수렴",
      "탁월한 문장력 자체가 인문 전공 적합성의 증거"
    ]
  },
  {
    "id": 41,
    "archetype": "융합·경계횡단형",
    "archetypeKey": "interdisc",
    "tier": "t20",
    "tierKo": "Top 20",
    "majorEn": "Sociology / Public Policy",
    "majorKo": "사회학·공공정책",
    "profile": "사회학·공공정책 지망 · 융합·경계횡단형",
    "spike": "두 분야를 잇는 독특한 교차점",
    "activities": [
      "불평등 이슈 캠페인을 조직",
      "공공도서관과 협업한 프로그램을 기획",
      "사회 문제를 다룬 설문·리서치를 발표"
    ],
    "essayAngle": "예술과 코드, 생물과 음악처럼 두 세계를 잇게 된 계기",
    "whyItWorked": [
      "흔한 단일 스파이크와 차별화되는 독창적 포지셔닝",
      "호기심의 폭과 깊이를 동시에 증명"
    ]
  },
  {
    "id": 42,
    "archetype": "연구 몰입형",
    "archetypeKey": "research",
    "tier": "ivy",
    "tierKo": "아이비+ (Ivy/Stanford/MIT 급)",
    "majorEn": "English / Creative Writing",
    "majorKo": "영문·문예창작",
    "profile": "영문·문예창작 지망 · 연구 몰입형",
    "spike": "한 분야를 끝까지 파고든 자기주도 연구",
    "activities": [
      "단편을 청소년 공모전에 꾸준히 출품",
      "교지 편집장으로 다년간 활동",
      "문학 웹진을 창간해 또래 작품을 큐레이션"
    ],
    "essayAngle": "호기심에서 시작한 작은 질문이 1년 넘는 탐구로 이어진 과정",
    "whyItWorked": [
      "스파이크가 선명하다 — 활동이 흩어지지 않고 한 줄기로 수렴",
      "'결과'보다 '사고 과정'을 보여줘 지적 성숙도를 증명"
    ]
  },
  {
    "id": 43,
    "archetype": "STEM 경시·올림피아드형",
    "archetypeKey": "stem-comp",
    "tier": "t20",
    "tierKo": "Top 20",
    "majorEn": "Sociology / Public Policy",
    "majorKo": "사회학·공공정책",
    "profile": "사회학·공공정책 지망 · STEM 경시·올림피아드형",
    "spike": "수학·과학 경시 깊이 + 가르침으로 확장",
    "activities": [
      "공공도서관과 협업한 프로그램을 기획",
      "불평등 이슈 캠페인을 조직",
      "사회 문제를 다룬 설문·리서치를 발표",
      "지역 이주민 가정을 돕는 멘토링을 운영"
    ],
    "essayAngle": "한 문제를 며칠씩 붙들었던 몰입의 즐거움",
    "whyItWorked": [
      "경시 실력을 '나눔(튜터링·동아리)'으로 확장해 이기심 우려 해소",
      "학문적 깊이를 수상이 아니라 사고로 증명"
    ]
  },
  {
    "id": 44,
    "archetype": "리더십·조직형",
    "archetypeKey": "leadership",
    "tier": "t50",
    "tierKo": "Top 50 / 주립 명문",
    "majorEn": "Economics",
    "majorKo": "경제학",
    "profile": "경제학 지망 · 리더십·조직형",
    "spike": "조직을 키우고 사람을 움직인 경험",
    "activities": [
      "지역 소상공인 데이터를 분석한 리포트 발간",
      "교내 투자/경제 동아리를 운영",
      "금융 문해력 워크숍을 또래에게 진행",
      "경제 블로그/뉴스레터를 꾸준히 발행"
    ],
    "essayAngle": "갈등을 중재하며 배운 경청의 힘",
    "whyItWorked": [
      "직책이 아니라 '변화시킨 결과'로 리더십을 증명",
      "다년간의 헌신과 승계까지 보여 지속성 입증",
      "겸손과 책임감이 함께 드러나 호감"
    ]
  },
  {
    "id": 45,
    "archetype": "환경·지속가능성형",
    "archetypeKey": "environment",
    "tier": "t50",
    "tierKo": "Top 50 / 주립 명문",
    "majorEn": "Mathematics",
    "majorKo": "수학",
    "profile": "수학 지망 · 환경·지속가능성형",
    "spike": "기후·환경 문제에 대한 구체적 실천",
    "activities": [
      "수학 저널/문제집을 직접 제작",
      "수학으로 실제 데이터를 모델링",
      "후배를 위한 무료 수학 캠프를 운영",
      "수학 경시에서 다년간 입상"
    ],
    "essayAngle": "소비를 줄이는 실험을 1년간 기록한 이야기",
    "whyItWorked": [
      "글로벌 이슈를 '내 동네'의 구체적 행동으로 환원",
      "가치관과 활동이 일관되게 정렬"
    ]
  },
  {
    "id": 46,
    "archetype": "융합·경계횡단형",
    "archetypeKey": "interdisc",
    "tier": "t50",
    "tierKo": "Top 50 / 주립 명문",
    "majorEn": "Biology / Pre-med",
    "majorKo": "생물·의예",
    "profile": "생물·의예 지망 · 융합·경계횡단형",
    "spike": "두 분야를 잇는 독특한 교차점",
    "activities": [
      "교내 과학 저널을 창간",
      "희귀질환 환자 가족을 위한 정보 아카이브 구축",
      "공중보건 캠페인을 기획해 또래에게 전파"
    ],
    "essayAngle": "경계에서만 보이는 문제를 발견한 순간",
    "whyItWorked": [
      "호기심의 폭과 깊이를 동시에 증명",
      "융합형 전공·커리큘럼과의 적합성이 자연스럽게 드러남"
    ]
  },
  {
    "id": 47,
    "archetype": "STEM 경시·올림피아드형",
    "archetypeKey": "stem-comp",
    "tier": "ivy",
    "tierKo": "아이비+ (Ivy/Stanford/MIT 급)",
    "majorEn": "Biology / Pre-med",
    "majorKo": "생물·의예",
    "profile": "생물·의예 지망 · STEM 경시·올림피아드형",
    "spike": "수학·과학 경시 깊이 + 가르침으로 확장",
    "activities": [
      "지역 병원·연구실에서 보조로 참여",
      "교내 과학 저널을 창간",
      "희귀질환 환자 가족을 위한 정보 아카이브 구축"
    ],
    "essayAngle": "한 문제를 며칠씩 붙들었던 몰입의 즐거움",
    "whyItWorked": [
      "학문적 깊이를 수상이 아니라 사고로 증명",
      "경시 실력을 '나눔(튜터링·동아리)'으로 확장해 이기심 우려 해소"
    ]
  },
  {
    "id": 48,
    "archetype": "리더십·조직형",
    "archetypeKey": "leadership",
    "tier": "t50",
    "tierKo": "Top 50 / 주립 명문",
    "majorEn": "Biology / Pre-med",
    "majorKo": "생물·의예",
    "profile": "생물·의예 지망 · 리더십·조직형",
    "spike": "조직을 키우고 사람을 움직인 경험",
    "activities": [
      "교내 과학 저널을 창간",
      "공중보건 캠페인을 기획해 또래에게 전파",
      "지역 병원·연구실에서 보조로 참여"
    ],
    "essayAngle": "갈등을 중재하며 배운 경청의 힘",
    "whyItWorked": [
      "직책이 아니라 '변화시킨 결과'로 리더십을 증명",
      "겸손과 책임감이 함께 드러나 호감"
    ]
  },
  {
    "id": 49,
    "archetype": "예술·창작형",
    "archetypeKey": "arts",
    "tier": "t20",
    "tierKo": "Top 20",
    "majorEn": "Economics",
    "majorKo": "경제학",
    "profile": "경제학 지망 · 예술·창작형",
    "spike": "독창적 작품 세계 + 꾸준한 발표",
    "activities": [
      "금융 문해력 워크숍을 또래에게 진행",
      "경제 블로그/뉴스레터를 꾸준히 발행",
      "지역 소상공인 데이터를 분석한 리포트 발간",
      "교내 투자/경제 동아리를 운영"
    ],
    "essayAngle": "'잘 그리기'에서 '말하기'로 넘어간 예술관의 변화",
    "whyItWorked": [
      "정량 지표가 약한 분야를 스토리로 강하게 보완",
      "포트폴리오·발표 이력으로 진정성과 지속성 입증",
      "기술이 아니라 '관점'이 있는 창작자임을 서사로 증명"
    ]
  },
  {
    "id": 50,
    "archetype": "리더십·조직형",
    "archetypeKey": "leadership",
    "tier": "t50",
    "tierKo": "Top 50 / 주립 명문",
    "majorEn": "Political Science",
    "majorKo": "정치학",
    "profile": "정치학 지망 · 리더십·조직형",
    "spike": "조직을 키우고 사람을 움직인 경험",
    "activities": [
      "모의국회·토론에서 다년간 활동",
      "시민 교육 팟캐스트를 운영",
      "지역 이슈 캠페인을 조직"
    ],
    "essayAngle": "갈등을 중재하며 배운 경청의 힘",
    "whyItWorked": [
      "겸손과 책임감이 함께 드러나 호감",
      "직책이 아니라 '변화시킨 결과'로 리더십을 증명"
    ]
  },
  {
    "id": 51,
    "archetype": "창업·메이커형",
    "archetypeKey": "entrepreneur",
    "tier": "t20",
    "tierKo": "Top 20",
    "majorEn": "Computer Science",
    "majorKo": "컴퓨터과학",
    "profile": "컴퓨터과학 지망 · 창업·메이커형",
    "spike": "문제를 발견하고 직접 만들어 해결",
    "activities": [
      "머신러닝으로 동네 데이터 문제를 분석",
      "오픈소스 프로젝트에 기여하고 별 수백 개를 받음",
      "지역 비영리를 위한 무료 웹앱을 만들어 운영",
      "교내 코딩 동아리를 만들어 후배 30명을 가르침"
    ],
    "essayAngle": "실패한 첫 제품에서 고객의 '진짜 문제'를 다시 정의한 이야기",
    "whyItWorked": [
      "교과 밖에서 만든 결과물이 전공 적합성을 자연 증명",
      "impact를 숫자로 보여주되 동기는 사람 중심이라 진정성 있음"
    ]
  },
  {
    "id": 52,
    "archetype": "STEM 경시·올림피아드형",
    "archetypeKey": "stem-comp",
    "tier": "t20",
    "tierKo": "Top 20",
    "majorEn": "Economics",
    "majorKo": "경제학",
    "profile": "경제학 지망 · STEM 경시·올림피아드형",
    "spike": "수학·과학 경시 깊이 + 가르침으로 확장",
    "activities": [
      "지역 소상공인 데이터를 분석한 리포트 발간",
      "경제 블로그/뉴스레터를 꾸준히 발행",
      "금융 문해력 워크숍을 또래에게 진행"
    ],
    "essayAngle": "경쟁의 승부욕을 넘어 '아름다운 문제'에 끌린 이유",
    "whyItWorked": [
      "전공 적합성과 지적 열정이 일치",
      "경시 실력을 '나눔(튜터링·동아리)'으로 확장해 이기심 우려 해소",
      "학문적 깊이를 수상이 아니라 사고로 증명"
    ]
  },
  {
    "id": 53,
    "archetype": "연구 몰입형",
    "archetypeKey": "research",
    "tier": "t20",
    "tierKo": "Top 20",
    "majorEn": "Computer Science",
    "majorKo": "컴퓨터과학",
    "profile": "컴퓨터과학 지망 · 연구 몰입형",
    "spike": "한 분야를 끝까지 파고든 자기주도 연구",
    "activities": [
      "머신러닝으로 동네 데이터 문제를 분석",
      "오픈소스 프로젝트에 기여하고 별 수백 개를 받음",
      "교내 코딩 동아리를 만들어 후배 30명을 가르침",
      "지역 비영리를 위한 무료 웹앱을 만들어 운영"
    ],
    "essayAngle": "실패한 실험에서 배운 '데이터가 나를 반박할 때'의 겸손",
    "whyItWorked": [
      "교내 자원이 부족한 환경에서 스스로 길을 낸 자기주도성",
      "'결과'보다 '사고 과정'을 보여줘 지적 성숙도를 증명",
      "스파이크가 선명하다 — 활동이 흩어지지 않고 한 줄기로 수렴"
    ]
  },
  {
    "id": 54,
    "archetype": "인문·글쓰기형",
    "archetypeKey": "humanities",
    "tier": "t20",
    "tierKo": "Top 20",
    "majorEn": "Mathematics",
    "majorKo": "수학",
    "profile": "수학 지망 · 인문·글쓰기형",
    "spike": "읽고 쓰고 토론으로 세상을 해석",
    "activities": [
      "수학 경시에서 다년간 입상",
      "수학 저널/문제집을 직접 제작",
      "수학으로 실제 데이터를 모델링"
    ],
    "essayAngle": "역사 속 한 인물에게 던진 편지 형식의 성찰",
    "whyItWorked": [
      "사고의 결이 섬세하고 독창적 관점이 있음",
      "활동(교지·토론·아카이브)이 글쓰기 정체성으로 수렴",
      "탁월한 문장력 자체가 인문 전공 적합성의 증거"
    ]
  },
  {
    "id": 55,
    "archetype": "융합·경계횡단형",
    "archetypeKey": "interdisc",
    "tier": "ivy",
    "tierKo": "아이비+ (Ivy/Stanford/MIT 급)",
    "majorEn": "Environmental Science",
    "majorKo": "환경과학",
    "profile": "환경과학 지망 · 융합·경계횡단형",
    "spike": "두 분야를 잇는 독특한 교차점",
    "activities": [
      "시민과학 프로젝트에 데이터 기여",
      "교내 제로웨이스트 캠페인을 주도",
      "환경 다큐 단편을 제작",
      "지역 하천 수질을 1년간 측정·기록"
    ],
    "essayAngle": "'전공을 못 고르는 게 아니라 잇고 싶은 것'이라는 재정의",
    "whyItWorked": [
      "융합형 전공·커리큘럼과의 적합성이 자연스럽게 드러남",
      "흔한 단일 스파이크와 차별화되는 독창적 포지셔닝",
      "호기심의 폭과 깊이를 동시에 증명"
    ]
  },
  {
    "id": 56,
    "archetype": "융합·경계횡단형",
    "archetypeKey": "interdisc",
    "tier": "t50",
    "tierKo": "Top 50 / 주립 명문",
    "majorEn": "Mechanical Engineering",
    "majorKo": "기계공학",
    "profile": "기계공학 지망 · 융합·경계횡단형",
    "spike": "두 분야를 잇는 독특한 교차점",
    "activities": [
      "로보틱스 팀에서 설계를 맡아 지역 대회 입상",
      "태양광 소형 장치를 직접 제작",
      "교내 메이커스페이스를 운영",
      "저비용 보조기구를 설계해 시제품 제작"
    ],
    "essayAngle": "경계에서만 보이는 문제를 발견한 순간",
    "whyItWorked": [
      "융합형 전공·커리큘럼과의 적합성이 자연스럽게 드러남",
      "흔한 단일 스파이크와 차별화되는 독창적 포지셔닝"
    ]
  },
  {
    "id": 57,
    "archetype": "환경·지속가능성형",
    "archetypeKey": "environment",
    "tier": "t20",
    "tierKo": "Top 20",
    "majorEn": "English / Creative Writing",
    "majorKo": "영문·문예창작",
    "profile": "영문·문예창작 지망 · 환경·지속가능성형",
    "spike": "기후·환경 문제에 대한 구체적 실천",
    "activities": [
      "지역 도서관에서 글쓰기 워크숍을 운영",
      "문학 웹진을 창간해 또래 작품을 큐레이션",
      "교지 편집장으로 다년간 활동"
    ],
    "essayAngle": "소비를 줄이는 실험을 1년간 기록한 이야기",
    "whyItWorked": [
      "측정·기록·정책 제안까지 이어진 실행력",
      "글로벌 이슈를 '내 동네'의 구체적 행동으로 환원"
    ]
  },
  {
    "id": 58,
    "archetype": "인문·글쓰기형",
    "archetypeKey": "humanities",
    "tier": "t50",
    "tierKo": "Top 50 / 주립 명문",
    "majorEn": "Environmental Science",
    "majorKo": "환경과학",
    "profile": "환경과학 지망 · 인문·글쓰기형",
    "spike": "읽고 쓰고 토론으로 세상을 해석",
    "activities": [
      "지역 하천 수질을 1년간 측정·기록",
      "환경 다큐 단편을 제작",
      "시민과학 프로젝트에 데이터 기여",
      "교내 제로웨이스트 캠페인을 주도"
    ],
    "essayAngle": "역사 속 한 인물에게 던진 편지 형식의 성찰",
    "whyItWorked": [
      "탁월한 문장력 자체가 인문 전공 적합성의 증거",
      "활동(교지·토론·아카이브)이 글쓰기 정체성으로 수렴"
    ]
  },
  {
    "id": 59,
    "archetype": "환경·지속가능성형",
    "archetypeKey": "environment",
    "tier": "t50",
    "tierKo": "Top 50 / 주립 명문",
    "majorEn": "Biology / Pre-med",
    "majorKo": "생물·의예",
    "profile": "생물·의예 지망 · 환경·지속가능성형",
    "spike": "기후·환경 문제에 대한 구체적 실천",
    "activities": [
      "희귀질환 환자 가족을 위한 정보 아카이브 구축",
      "공중보건 캠페인을 기획해 또래에게 전파",
      "지역 병원·연구실에서 보조로 참여"
    ],
    "essayAngle": "눈앞의 강/숲/동네에서 출발한 환경 행동",
    "whyItWorked": [
      "가치관과 활동이 일관되게 정렬",
      "글로벌 이슈를 '내 동네'의 구체적 행동으로 환원"
    ]
  },
  {
    "id": 60,
    "archetype": "리더십·조직형",
    "archetypeKey": "leadership",
    "tier": "t20",
    "tierKo": "Top 20",
    "majorEn": "Visual / Performing Arts",
    "majorKo": "미술·공연예술",
    "profile": "미술·공연예술 지망 · 리더십·조직형",
    "spike": "조직을 키우고 사람을 움직인 경험",
    "activities": [
      "온라인에 작품을 꾸준히 발표하며 팔로워 형성",
      "지역 아동에게 예술 수업을 무료로 진행",
      "개인전/공연을 지역에서 개최",
      "학교 축제의 미술/무대를 총괄"
    ],
    "essayAngle": "갈등을 중재하며 배운 경청의 힘",
    "whyItWorked": [
      "직책이 아니라 '변화시킨 결과'로 리더십을 증명",
      "겸손과 책임감이 함께 드러나 호감"
    ]
  },
  {
    "id": 61,
    "archetype": "사회운동·임팩트형",
    "archetypeKey": "social",
    "tier": "t50",
    "tierKo": "Top 50 / 주립 명문",
    "majorEn": "Visual / Performing Arts",
    "majorKo": "미술·공연예술",
    "profile": "미술·공연예술 지망 · 사회운동·임팩트형",
    "spike": "지역 사회의 구체적 문제를 지속적으로 해결",
    "activities": [
      "지역 아동에게 예술 수업을 무료로 진행",
      "온라인에 작품을 꾸준히 발표하며 팔로워 형성",
      "개인전/공연을 지역에서 개최"
    ],
    "essayAngle": "도움을 주려다 오히려 배운 것의 역전",
    "whyItWorked": [
      "지역 문제→구체적 행동의 연결이 명확",
      "'시혜'가 아닌 '연대'의 태도가 성숙하게 드러남",
      "일회성 봉사가 아니라 다년간의 지속성과 리더십이 보임"
    ]
  },
  {
    "id": 62,
    "archetype": "사회운동·임팩트형",
    "archetypeKey": "social",
    "tier": "t50",
    "tierKo": "Top 50 / 주립 명문",
    "majorEn": "Mechanical Engineering",
    "majorKo": "기계공학",
    "profile": "기계공학 지망 · 사회운동·임팩트형",
    "spike": "지역 사회의 구체적 문제를 지속적으로 해결",
    "activities": [
      "교내 메이커스페이스를 운영",
      "로보틱스 팀에서 설계를 맡아 지역 대회 입상",
      "저비용 보조기구를 설계해 시제품 제작"
    ],
    "essayAngle": "봉사 '시간'이 아니라 한 사람과의 관계가 바꾼 관점",
    "whyItWorked": [
      "일회성 봉사가 아니라 다년간의 지속성과 리더십이 보임",
      "'시혜'가 아닌 '연대'의 태도가 성숙하게 드러남",
      "지역 문제→구체적 행동의 연결이 명확"
    ]
  },
  {
    "id": 63,
    "archetype": "연구 몰입형",
    "archetypeKey": "research",
    "tier": "t50",
    "tierKo": "Top 50 / 주립 명문",
    "majorEn": "Visual / Performing Arts",
    "majorKo": "미술·공연예술",
    "profile": "미술·공연예술 지망 · 연구 몰입형",
    "spike": "한 분야를 끝까지 파고든 자기주도 연구",
    "activities": [
      "지역 아동에게 예술 수업을 무료로 진행",
      "학교 축제의 미술/무대를 총괄",
      "온라인에 작품을 꾸준히 발표하며 팔로워 형성",
      "개인전/공연을 지역에서 개최"
    ],
    "essayAngle": "실패한 실험에서 배운 '데이터가 나를 반박할 때'의 겸손",
    "whyItWorked": [
      "스파이크가 선명하다 — 활동이 흩어지지 않고 한 줄기로 수렴",
      "'결과'보다 '사고 과정'을 보여줘 지적 성숙도를 증명"
    ]
  },
  {
    "id": 64,
    "archetype": "사회운동·임팩트형",
    "archetypeKey": "social",
    "tier": "t20",
    "tierKo": "Top 20",
    "majorEn": "Economics",
    "majorKo": "경제학",
    "profile": "경제학 지망 · 사회운동·임팩트형",
    "spike": "지역 사회의 구체적 문제를 지속적으로 해결",
    "activities": [
      "교내 투자/경제 동아리를 운영",
      "경제 블로그/뉴스레터를 꾸준히 발행",
      "지역 소상공인 데이터를 분석한 리포트 발간",
      "금융 문해력 워크숍을 또래에게 진행"
    ],
    "essayAngle": "내가 속한 공동체의 불편을 '내 일'로 받아들인 순간",
    "whyItWorked": [
      "'시혜'가 아닌 '연대'의 태도가 성숙하게 드러남",
      "일회성 봉사가 아니라 다년간의 지속성과 리더십이 보임",
      "지역 문제→구체적 행동의 연결이 명확"
    ]
  },
  {
    "id": 65,
    "archetype": "창업·메이커형",
    "archetypeKey": "entrepreneur",
    "tier": "ivy",
    "tierKo": "아이비+ (Ivy/Stanford/MIT 급)",
    "majorEn": "Visual / Performing Arts",
    "majorKo": "미술·공연예술",
    "profile": "미술·공연예술 지망 · 창업·메이커형",
    "spike": "문제를 발견하고 직접 만들어 해결",
    "activities": [
      "온라인에 작품을 꾸준히 발표하며 팔로워 형성",
      "학교 축제의 미술/무대를 총괄",
      "지역 아동에게 예술 수업을 무료로 진행",
      "개인전/공연을 지역에서 개최"
    ],
    "essayAngle": "실패한 첫 제품에서 고객의 '진짜 문제'를 다시 정의한 이야기",
    "whyItWorked": [
      "주도성과 회복탄력성(실패→재시도)이 동시에 드러남",
      "교과 밖에서 만든 결과물이 전공 적합성을 자연 증명"
    ]
  },
  {
    "id": 66,
    "archetype": "환경·지속가능성형",
    "archetypeKey": "environment",
    "tier": "t50",
    "tierKo": "Top 50 / 주립 명문",
    "majorEn": "Environmental Science",
    "majorKo": "환경과학",
    "profile": "환경과학 지망 · 환경·지속가능성형",
    "spike": "기후·환경 문제에 대한 구체적 실천",
    "activities": [
      "환경 다큐 단편을 제작",
      "시민과학 프로젝트에 데이터 기여",
      "지역 하천 수질을 1년간 측정·기록"
    ],
    "essayAngle": "소비를 줄이는 실험을 1년간 기록한 이야기",
    "whyItWorked": [
      "글로벌 이슈를 '내 동네'의 구체적 행동으로 환원",
      "측정·기록·정책 제안까지 이어진 실행력"
    ]
  },
  {
    "id": 67,
    "archetype": "사회운동·임팩트형",
    "archetypeKey": "social",
    "tier": "t50",
    "tierKo": "Top 50 / 주립 명문",
    "majorEn": "Biology / Pre-med",
    "majorKo": "생물·의예",
    "profile": "생물·의예 지망 · 사회운동·임팩트형",
    "spike": "지역 사회의 구체적 문제를 지속적으로 해결",
    "activities": [
      "희귀질환 환자 가족을 위한 정보 아카이브 구축",
      "교내 과학 저널을 창간",
      "공중보건 캠페인을 기획해 또래에게 전파",
      "지역 병원·연구실에서 보조로 참여"
    ],
    "essayAngle": "봉사 '시간'이 아니라 한 사람과의 관계가 바꾼 관점",
    "whyItWorked": [
      "지역 문제→구체적 행동의 연결이 명확",
      "일회성 봉사가 아니라 다년간의 지속성과 리더십이 보임",
      "'시혜'가 아닌 '연대'의 태도가 성숙하게 드러남"
    ]
  },
  {
    "id": 68,
    "archetype": "예술·창작형",
    "archetypeKey": "arts",
    "tier": "ivy",
    "tierKo": "아이비+ (Ivy/Stanford/MIT 급)",
    "majorEn": "Environmental Science",
    "majorKo": "환경과학",
    "profile": "환경과학 지망 · 예술·창작형",
    "spike": "독창적 작품 세계 + 꾸준한 발표",
    "activities": [
      "지역 하천 수질을 1년간 측정·기록",
      "교내 제로웨이스트 캠페인을 주도",
      "시민과학 프로젝트에 데이터 기여"
    ],
    "essayAngle": "관객/독자의 반응이 창작관을 바꾼 전환점",
    "whyItWorked": [
      "정량 지표가 약한 분야를 스토리로 강하게 보완",
      "포트폴리오·발표 이력으로 진정성과 지속성 입증",
      "기술이 아니라 '관점'이 있는 창작자임을 서사로 증명"
    ]
  },
  {
    "id": 69,
    "archetype": "융합·경계횡단형",
    "archetypeKey": "interdisc",
    "tier": "ivy",
    "tierKo": "아이비+ (Ivy/Stanford/MIT 급)",
    "majorEn": "Computer Science",
    "majorKo": "컴퓨터과학",
    "profile": "컴퓨터과학 지망 · 융합·경계횡단형",
    "spike": "두 분야를 잇는 독특한 교차점",
    "activities": [
      "지역 비영리를 위한 무료 웹앱을 만들어 운영",
      "교내 코딩 동아리를 만들어 후배 30명을 가르침",
      "머신러닝으로 동네 데이터 문제를 분석",
      "오픈소스 프로젝트에 기여하고 별 수백 개를 받음"
    ],
    "essayAngle": "예술과 코드, 생물과 음악처럼 두 세계를 잇게 된 계기",
    "whyItWorked": [
      "흔한 단일 스파이크와 차별화되는 독창적 포지셔닝",
      "융합형 전공·커리큘럼과의 적합성이 자연스럽게 드러남"
    ]
  },
  {
    "id": 70,
    "archetype": "역경 극복·성장형",
    "archetypeKey": "resilience",
    "tier": "t50",
    "tierKo": "Top 50 / 주립 명문",
    "majorEn": "English / Creative Writing",
    "majorKo": "영문·문예창작",
    "profile": "영문·문예창작 지망 · 역경 극복·성장형",
    "spike": "개인적 어려움을 의미로 전환",
    "activities": [
      "교지 편집장으로 다년간 활동",
      "단편을 청소년 공모전에 꾸준히 출품",
      "지역 도서관에서 글쓰기 워크숍을 운영",
      "문학 웹진을 창간해 또래 작품을 큐레이션"
    ],
    "essayAngle": "언어·이주·건강 등 장벽을 넘으며 만든 자신만의 관점",
    "whyItWorked": [
      "공감과 성숙함이 진정성 있게 드러남",
      "역경 자체가 아니라 '그로부터 무엇을 했는가'에 초점",
      "맥락(환경)을 고려한 성취의 무게가 전달됨"
    ]
  },
  {
    "id": 71,
    "archetype": "창업·메이커형",
    "archetypeKey": "entrepreneur",
    "tier": "t50",
    "tierKo": "Top 50 / 주립 명문",
    "majorEn": "Biology / Pre-med",
    "majorKo": "생물·의예",
    "profile": "생물·의예 지망 · 창업·메이커형",
    "spike": "문제를 발견하고 직접 만들어 해결",
    "activities": [
      "희귀질환 환자 가족을 위한 정보 아카이브 구축",
      "공중보건 캠페인을 기획해 또래에게 전파",
      "교내 과학 저널을 창간"
    ],
    "essayAngle": "수익보다 사용자 한 명의 변화를 좇은 동기",
    "whyItWorked": [
      "impact를 숫자로 보여주되 동기는 사람 중심이라 진정성 있음",
      "교과 밖에서 만든 결과물이 전공 적합성을 자연 증명"
    ]
  },
  {
    "id": 72,
    "archetype": "창업·메이커형",
    "archetypeKey": "entrepreneur",
    "tier": "ivy",
    "tierKo": "아이비+ (Ivy/Stanford/MIT 급)",
    "majorEn": "Sociology / Public Policy",
    "majorKo": "사회학·공공정책",
    "profile": "사회학·공공정책 지망 · 창업·메이커형",
    "spike": "문제를 발견하고 직접 만들어 해결",
    "activities": [
      "불평등 이슈 캠페인을 조직",
      "사회 문제를 다룬 설문·리서치를 발표",
      "지역 이주민 가정을 돕는 멘토링을 운영",
      "공공도서관과 협업한 프로그램을 기획"
    ],
    "essayAngle": "실패한 첫 제품에서 고객의 '진짜 문제'를 다시 정의한 이야기",
    "whyItWorked": [
      "주도성과 회복탄력성(실패→재시도)이 동시에 드러남",
      "교과 밖에서 만든 결과물이 전공 적합성을 자연 증명",
      "impact를 숫자로 보여주되 동기는 사람 중심이라 진정성 있음"
    ]
  },
  {
    "id": 73,
    "archetype": "STEM 경시·올림피아드형",
    "archetypeKey": "stem-comp",
    "tier": "t20",
    "tierKo": "Top 20",
    "majorEn": "Environmental Science",
    "majorKo": "환경과학",
    "profile": "환경과학 지망 · STEM 경시·올림피아드형",
    "spike": "수학·과학 경시 깊이 + 가르침으로 확장",
    "activities": [
      "환경 다큐 단편을 제작",
      "시민과학 프로젝트에 데이터 기여",
      "지역 하천 수질을 1년간 측정·기록"
    ],
    "essayAngle": "경쟁의 승부욕을 넘어 '아름다운 문제'에 끌린 이유",
    "whyItWorked": [
      "전공 적합성과 지적 열정이 일치",
      "경시 실력을 '나눔(튜터링·동아리)'으로 확장해 이기심 우려 해소"
    ]
  },
  {
    "id": 74,
    "archetype": "환경·지속가능성형",
    "archetypeKey": "environment",
    "tier": "ivy",
    "tierKo": "아이비+ (Ivy/Stanford/MIT 급)",
    "majorEn": "Economics",
    "majorKo": "경제학",
    "profile": "경제학 지망 · 환경·지속가능성형",
    "spike": "기후·환경 문제에 대한 구체적 실천",
    "activities": [
      "경제 블로그/뉴스레터를 꾸준히 발행",
      "교내 투자/경제 동아리를 운영",
      "금융 문해력 워크숍을 또래에게 진행",
      "지역 소상공인 데이터를 분석한 리포트 발간"
    ],
    "essayAngle": "소비를 줄이는 실험을 1년간 기록한 이야기",
    "whyItWorked": [
      "가치관과 활동이 일관되게 정렬",
      "측정·기록·정책 제안까지 이어진 실행력"
    ]
  },
  {
    "id": 75,
    "archetype": "창업·메이커형",
    "archetypeKey": "entrepreneur",
    "tier": "t20",
    "tierKo": "Top 20",
    "majorEn": "Environmental Science",
    "majorKo": "환경과학",
    "profile": "환경과학 지망 · 창업·메이커형",
    "spike": "문제를 발견하고 직접 만들어 해결",
    "activities": [
      "교내 제로웨이스트 캠페인을 주도",
      "지역 하천 수질을 1년간 측정·기록",
      "환경 다큐 단편을 제작",
      "시민과학 프로젝트에 데이터 기여"
    ],
    "essayAngle": "수익보다 사용자 한 명의 변화를 좇은 동기",
    "whyItWorked": [
      "교과 밖에서 만든 결과물이 전공 적합성을 자연 증명",
      "주도성과 회복탄력성(실패→재시도)이 동시에 드러남"
    ]
  },
  {
    "id": 76,
    "archetype": "인문·글쓰기형",
    "archetypeKey": "humanities",
    "tier": "t20",
    "tierKo": "Top 20",
    "majorEn": "Mechanical Engineering",
    "majorKo": "기계공학",
    "profile": "기계공학 지망 · 인문·글쓰기형",
    "spike": "읽고 쓰고 토론으로 세상을 해석",
    "activities": [
      "교내 메이커스페이스를 운영",
      "로보틱스 팀에서 설계를 맡아 지역 대회 입상",
      "태양광 소형 장치를 직접 제작",
      "저비용 보조기구를 설계해 시제품 제작"
    ],
    "essayAngle": "한 권의 책이 오래된 신념을 흔든 경험",
    "whyItWorked": [
      "활동(교지·토론·아카이브)이 글쓰기 정체성으로 수렴",
      "사고의 결이 섬세하고 독창적 관점이 있음"
    ]
  },
  {
    "id": 77,
    "archetype": "환경·지속가능성형",
    "archetypeKey": "environment",
    "tier": "t20",
    "tierKo": "Top 20",
    "majorEn": "Mechanical Engineering",
    "majorKo": "기계공학",
    "profile": "기계공학 지망 · 환경·지속가능성형",
    "spike": "기후·환경 문제에 대한 구체적 실천",
    "activities": [
      "태양광 소형 장치를 직접 제작",
      "저비용 보조기구를 설계해 시제품 제작",
      "교내 메이커스페이스를 운영"
    ],
    "essayAngle": "소비를 줄이는 실험을 1년간 기록한 이야기",
    "whyItWorked": [
      "글로벌 이슈를 '내 동네'의 구체적 행동으로 환원",
      "가치관과 활동이 일관되게 정렬"
    ]
  },
  {
    "id": 78,
    "archetype": "연구 몰입형",
    "archetypeKey": "research",
    "tier": "ivy",
    "tierKo": "아이비+ (Ivy/Stanford/MIT 급)",
    "majorEn": "Environmental Science",
    "majorKo": "환경과학",
    "profile": "환경과학 지망 · 연구 몰입형",
    "spike": "한 분야를 끝까지 파고든 자기주도 연구",
    "activities": [
      "환경 다큐 단편을 제작",
      "시민과학 프로젝트에 데이터 기여",
      "지역 하천 수질을 1년간 측정·기록"
    ],
    "essayAngle": "실패한 실험에서 배운 '데이터가 나를 반박할 때'의 겸손",
    "whyItWorked": [
      "'결과'보다 '사고 과정'을 보여줘 지적 성숙도를 증명",
      "교내 자원이 부족한 환경에서 스스로 길을 낸 자기주도성"
    ]
  },
  {
    "id": 79,
    "archetype": "STEM 경시·올림피아드형",
    "archetypeKey": "stem-comp",
    "tier": "ivy",
    "tierKo": "아이비+ (Ivy/Stanford/MIT 급)",
    "majorEn": "Political Science",
    "majorKo": "정치학",
    "profile": "정치학 지망 · STEM 경시·올림피아드형",
    "spike": "수학·과학 경시 깊이 + 가르침으로 확장",
    "activities": [
      "청소년 정책 제안을 지자체에 제출",
      "지역 이슈 캠페인을 조직",
      "모의국회·토론에서 다년간 활동",
      "시민 교육 팟캐스트를 운영"
    ],
    "essayAngle": "후배를 가르치며 비로소 이해한 개념의 이야기",
    "whyItWorked": [
      "학문적 깊이를 수상이 아니라 사고로 증명",
      "경시 실력을 '나눔(튜터링·동아리)'으로 확장해 이기심 우려 해소"
    ]
  },
  {
    "id": 80,
    "archetype": "사회운동·임팩트형",
    "archetypeKey": "social",
    "tier": "t20",
    "tierKo": "Top 20",
    "majorEn": "Mathematics",
    "majorKo": "수학",
    "profile": "수학 지망 · 사회운동·임팩트형",
    "spike": "지역 사회의 구체적 문제를 지속적으로 해결",
    "activities": [
      "수학으로 실제 데이터를 모델링",
      "수학 경시에서 다년간 입상",
      "수학 저널/문제집을 직접 제작"
    ],
    "essayAngle": "내가 속한 공동체의 불편을 '내 일'로 받아들인 순간",
    "whyItWorked": [
      "'시혜'가 아닌 '연대'의 태도가 성숙하게 드러남",
      "지역 문제→구체적 행동의 연결이 명확"
    ]
  },
  {
    "id": 81,
    "archetype": "예술·창작형",
    "archetypeKey": "arts",
    "tier": "t50",
    "tierKo": "Top 50 / 주립 명문",
    "majorEn": "Mechanical Engineering",
    "majorKo": "기계공학",
    "profile": "기계공학 지망 · 예술·창작형",
    "spike": "독창적 작품 세계 + 꾸준한 발표",
    "activities": [
      "저비용 보조기구를 설계해 시제품 제작",
      "태양광 소형 장치를 직접 제작",
      "교내 메이커스페이스를 운영"
    ],
    "essayAngle": "관객/독자의 반응이 창작관을 바꾼 전환점",
    "whyItWorked": [
      "포트폴리오·발표 이력으로 진정성과 지속성 입증",
      "기술이 아니라 '관점'이 있는 창작자임을 서사로 증명",
      "정량 지표가 약한 분야를 스토리로 강하게 보완"
    ]
  },
  {
    "id": 82,
    "archetype": "융합·경계횡단형",
    "archetypeKey": "interdisc",
    "tier": "ivy",
    "tierKo": "아이비+ (Ivy/Stanford/MIT 급)",
    "majorEn": "Economics",
    "majorKo": "경제학",
    "profile": "경제학 지망 · 융합·경계횡단형",
    "spike": "두 분야를 잇는 독특한 교차점",
    "activities": [
      "금융 문해력 워크숍을 또래에게 진행",
      "교내 투자/경제 동아리를 운영",
      "경제 블로그/뉴스레터를 꾸준히 발행",
      "지역 소상공인 데이터를 분석한 리포트 발간"
    ],
    "essayAngle": "경계에서만 보이는 문제를 발견한 순간",
    "whyItWorked": [
      "흔한 단일 스파이크와 차별화되는 독창적 포지셔닝",
      "융합형 전공·커리큘럼과의 적합성이 자연스럽게 드러남"
    ]
  },
  {
    "id": 83,
    "archetype": "환경·지속가능성형",
    "archetypeKey": "environment",
    "tier": "t50",
    "tierKo": "Top 50 / 주립 명문",
    "majorEn": "Visual / Performing Arts",
    "majorKo": "미술·공연예술",
    "profile": "미술·공연예술 지망 · 환경·지속가능성형",
    "spike": "기후·환경 문제에 대한 구체적 실천",
    "activities": [
      "온라인에 작품을 꾸준히 발표하며 팔로워 형성",
      "지역 아동에게 예술 수업을 무료로 진행",
      "개인전/공연을 지역에서 개최"
    ],
    "essayAngle": "데이터로 동네의 문제를 측정해 정책에 닿은 과정",
    "whyItWorked": [
      "측정·기록·정책 제안까지 이어진 실행력",
      "글로벌 이슈를 '내 동네'의 구체적 행동으로 환원",
      "가치관과 활동이 일관되게 정렬"
    ]
  },
  {
    "id": 84,
    "archetype": "융합·경계횡단형",
    "archetypeKey": "interdisc",
    "tier": "t20",
    "tierKo": "Top 20",
    "majorEn": "English / Creative Writing",
    "majorKo": "영문·문예창작",
    "profile": "영문·문예창작 지망 · 융합·경계횡단형",
    "spike": "두 분야를 잇는 독특한 교차점",
    "activities": [
      "문학 웹진을 창간해 또래 작품을 큐레이션",
      "단편을 청소년 공모전에 꾸준히 출품",
      "교지 편집장으로 다년간 활동",
      "지역 도서관에서 글쓰기 워크숍을 운영"
    ],
    "essayAngle": "예술과 코드, 생물과 음악처럼 두 세계를 잇게 된 계기",
    "whyItWorked": [
      "흔한 단일 스파이크와 차별화되는 독창적 포지셔닝",
      "융합형 전공·커리큘럼과의 적합성이 자연스럽게 드러남"
    ]
  },
  {
    "id": 85,
    "archetype": "예술·창작형",
    "archetypeKey": "arts",
    "tier": "t20",
    "tierKo": "Top 20",
    "majorEn": "Mathematics",
    "majorKo": "수학",
    "profile": "수학 지망 · 예술·창작형",
    "spike": "독창적 작품 세계 + 꾸준한 발표",
    "activities": [
      "수학으로 실제 데이터를 모델링",
      "후배를 위한 무료 수학 캠프를 운영",
      "수학 경시에서 다년간 입상"
    ],
    "essayAngle": "작품에 자신의 이중 정체성을 녹여낸 과정",
    "whyItWorked": [
      "포트폴리오·발표 이력으로 진정성과 지속성 입증",
      "기술이 아니라 '관점'이 있는 창작자임을 서사로 증명",
      "정량 지표가 약한 분야를 스토리로 강하게 보완"
    ]
  },
  {
    "id": 86,
    "archetype": "창업·메이커형",
    "archetypeKey": "entrepreneur",
    "tier": "t20",
    "tierKo": "Top 20",
    "majorEn": "Mathematics",
    "majorKo": "수학",
    "profile": "수학 지망 · 창업·메이커형",
    "spike": "문제를 발견하고 직접 만들어 해결",
    "activities": [
      "수학으로 실제 데이터를 모델링",
      "수학 저널/문제집을 직접 제작",
      "수학 경시에서 다년간 입상"
    ],
    "essayAngle": "실패한 첫 제품에서 고객의 '진짜 문제'를 다시 정의한 이야기",
    "whyItWorked": [
      "impact를 숫자로 보여주되 동기는 사람 중심이라 진정성 있음",
      "주도성과 회복탄력성(실패→재시도)이 동시에 드러남"
    ]
  },
  {
    "id": 87,
    "archetype": "인문·글쓰기형",
    "archetypeKey": "humanities",
    "tier": "t20",
    "tierKo": "Top 20",
    "majorEn": "English / Creative Writing",
    "majorKo": "영문·문예창작",
    "profile": "영문·문예창작 지망 · 인문·글쓰기형",
    "spike": "읽고 쓰고 토론으로 세상을 해석",
    "activities": [
      "지역 도서관에서 글쓰기 워크숍을 운영",
      "교지 편집장으로 다년간 활동",
      "문학 웹진을 창간해 또래 작품을 큐레이션"
    ],
    "essayAngle": "가족의 언어와 학교의 언어 사이에서 자란 정체성",
    "whyItWorked": [
      "사고의 결이 섬세하고 독창적 관점이 있음",
      "활동(교지·토론·아카이브)이 글쓰기 정체성으로 수렴",
      "탁월한 문장력 자체가 인문 전공 적합성의 증거"
    ]
  },
  {
    "id": 88,
    "archetype": "융합·경계횡단형",
    "archetypeKey": "interdisc",
    "tier": "t20",
    "tierKo": "Top 20",
    "majorEn": "Visual / Performing Arts",
    "majorKo": "미술·공연예술",
    "profile": "미술·공연예술 지망 · 융합·경계횡단형",
    "spike": "두 분야를 잇는 독특한 교차점",
    "activities": [
      "학교 축제의 미술/무대를 총괄",
      "온라인에 작품을 꾸준히 발표하며 팔로워 형성",
      "개인전/공연을 지역에서 개최",
      "지역 아동에게 예술 수업을 무료로 진행"
    ],
    "essayAngle": "'전공을 못 고르는 게 아니라 잇고 싶은 것'이라는 재정의",
    "whyItWorked": [
      "융합형 전공·커리큘럼과의 적합성이 자연스럽게 드러남",
      "호기심의 폭과 깊이를 동시에 증명"
    ]
  },
  {
    "id": 89,
    "archetype": "역경 극복·성장형",
    "archetypeKey": "resilience",
    "tier": "ivy",
    "tierKo": "아이비+ (Ivy/Stanford/MIT 급)",
    "majorEn": "Visual / Performing Arts",
    "majorKo": "미술·공연예술",
    "profile": "미술·공연예술 지망 · 역경 극복·성장형",
    "spike": "개인적 어려움을 의미로 전환",
    "activities": [
      "학교 축제의 미술/무대를 총괄",
      "지역 아동에게 예술 수업을 무료로 진행",
      "개인전/공연을 지역에서 개최"
    ],
    "essayAngle": "언어·이주·건강 등 장벽을 넘으며 만든 자신만의 관점",
    "whyItWorked": [
      "공감과 성숙함이 진정성 있게 드러남",
      "맥락(환경)을 고려한 성취의 무게가 전달됨"
    ]
  },
  {
    "id": 90,
    "archetype": "사회운동·임팩트형",
    "archetypeKey": "social",
    "tier": "t20",
    "tierKo": "Top 20",
    "majorEn": "Sociology / Public Policy",
    "majorKo": "사회학·공공정책",
    "profile": "사회학·공공정책 지망 · 사회운동·임팩트형",
    "spike": "지역 사회의 구체적 문제를 지속적으로 해결",
    "activities": [
      "지역 이주민 가정을 돕는 멘토링을 운영",
      "사회 문제를 다룬 설문·리서치를 발표",
      "불평등 이슈 캠페인을 조직"
    ],
    "essayAngle": "내가 속한 공동체의 불편을 '내 일'로 받아들인 순간",
    "whyItWorked": [
      "지역 문제→구체적 행동의 연결이 명확",
      "일회성 봉사가 아니라 다년간의 지속성과 리더십이 보임",
      "'시혜'가 아닌 '연대'의 태도가 성숙하게 드러남"
    ]
  },
  {
    "id": 91,
    "archetype": "연구 몰입형",
    "archetypeKey": "research",
    "tier": "t20",
    "tierKo": "Top 20",
    "majorEn": "Mathematics",
    "majorKo": "수학",
    "profile": "수학 지망 · 연구 몰입형",
    "spike": "한 분야를 끝까지 파고든 자기주도 연구",
    "activities": [
      "수학으로 실제 데이터를 모델링",
      "수학 저널/문제집을 직접 제작",
      "후배를 위한 무료 수학 캠프를 운영",
      "수학 경시에서 다년간 입상"
    ],
    "essayAngle": "연구 주제가 자신의 정체성·동네 문제와 맞닿은 지점",
    "whyItWorked": [
      "스파이크가 선명하다 — 활동이 흩어지지 않고 한 줄기로 수렴",
      "교내 자원이 부족한 환경에서 스스로 길을 낸 자기주도성"
    ]
  },
  {
    "id": 92,
    "archetype": "예술·창작형",
    "archetypeKey": "arts",
    "tier": "t50",
    "tierKo": "Top 50 / 주립 명문",
    "majorEn": "Sociology / Public Policy",
    "majorKo": "사회학·공공정책",
    "profile": "사회학·공공정책 지망 · 예술·창작형",
    "spike": "독창적 작품 세계 + 꾸준한 발표",
    "activities": [
      "불평등 이슈 캠페인을 조직",
      "사회 문제를 다룬 설문·리서치를 발표",
      "지역 이주민 가정을 돕는 멘토링을 운영"
    ],
    "essayAngle": "관객/독자의 반응이 창작관을 바꾼 전환점",
    "whyItWorked": [
      "기술이 아니라 '관점'이 있는 창작자임을 서사로 증명",
      "정량 지표가 약한 분야를 스토리로 강하게 보완",
      "포트폴리오·발표 이력으로 진정성과 지속성 입증"
    ]
  },
  {
    "id": 93,
    "archetype": "연구 몰입형",
    "archetypeKey": "research",
    "tier": "ivy",
    "tierKo": "아이비+ (Ivy/Stanford/MIT 급)",
    "majorEn": "Political Science",
    "majorKo": "정치학",
    "profile": "정치학 지망 · 연구 몰입형",
    "spike": "한 분야를 끝까지 파고든 자기주도 연구",
    "activities": [
      "지역 이슈 캠페인을 조직",
      "모의국회·토론에서 다년간 활동",
      "청소년 정책 제안을 지자체에 제출",
      "시민 교육 팟캐스트를 운영"
    ],
    "essayAngle": "호기심에서 시작한 작은 질문이 1년 넘는 탐구로 이어진 과정",
    "whyItWorked": [
      "'결과'보다 '사고 과정'을 보여줘 지적 성숙도를 증명",
      "스파이크가 선명하다 — 활동이 흩어지지 않고 한 줄기로 수렴",
      "교내 자원이 부족한 환경에서 스스로 길을 낸 자기주도성"
    ]
  },
  {
    "id": 94,
    "archetype": "예술·창작형",
    "archetypeKey": "arts",
    "tier": "t20",
    "tierKo": "Top 20",
    "majorEn": "Computer Science",
    "majorKo": "컴퓨터과학",
    "profile": "컴퓨터과학 지망 · 예술·창작형",
    "spike": "독창적 작품 세계 + 꾸준한 발표",
    "activities": [
      "지역 비영리를 위한 무료 웹앱을 만들어 운영",
      "오픈소스 프로젝트에 기여하고 별 수백 개를 받음",
      "머신러닝으로 동네 데이터 문제를 분석",
      "교내 코딩 동아리를 만들어 후배 30명을 가르침"
    ],
    "essayAngle": "작품에 자신의 이중 정체성을 녹여낸 과정",
    "whyItWorked": [
      "포트폴리오·발표 이력으로 진정성과 지속성 입증",
      "정량 지표가 약한 분야를 스토리로 강하게 보완",
      "기술이 아니라 '관점'이 있는 창작자임을 서사로 증명"
    ]
  },
  {
    "id": 95,
    "archetype": "예술·창작형",
    "archetypeKey": "arts",
    "tier": "t50",
    "tierKo": "Top 50 / 주립 명문",
    "majorEn": "Political Science",
    "majorKo": "정치학",
    "profile": "정치학 지망 · 예술·창작형",
    "spike": "독창적 작품 세계 + 꾸준한 발표",
    "activities": [
      "모의국회·토론에서 다년간 활동",
      "시민 교육 팟캐스트를 운영",
      "지역 이슈 캠페인을 조직",
      "청소년 정책 제안을 지자체에 제출"
    ],
    "essayAngle": "작품에 자신의 이중 정체성을 녹여낸 과정",
    "whyItWorked": [
      "기술이 아니라 '관점'이 있는 창작자임을 서사로 증명",
      "정량 지표가 약한 분야를 스토리로 강하게 보완",
      "포트폴리오·발표 이력으로 진정성과 지속성 입증"
    ]
  },
  {
    "id": 96,
    "archetype": "리더십·조직형",
    "archetypeKey": "leadership",
    "tier": "ivy",
    "tierKo": "아이비+ (Ivy/Stanford/MIT 급)",
    "majorEn": "Sociology / Public Policy",
    "majorKo": "사회학·공공정책",
    "profile": "사회학·공공정책 지망 · 리더십·조직형",
    "spike": "조직을 키우고 사람을 움직인 경험",
    "activities": [
      "사회 문제를 다룬 설문·리서치를 발표",
      "지역 이주민 가정을 돕는 멘토링을 운영",
      "불평등 이슈 캠페인을 조직",
      "공공도서관과 협업한 프로그램을 기획"
    ],
    "essayAngle": "갈등을 중재하며 배운 경청의 힘",
    "whyItWorked": [
      "겸손과 책임감이 함께 드러나 호감",
      "직책이 아니라 '변화시킨 결과'로 리더십을 증명"
    ]
  },
  {
    "id": 97,
    "archetype": "예술·창작형",
    "archetypeKey": "arts",
    "tier": "ivy",
    "tierKo": "아이비+ (Ivy/Stanford/MIT 급)",
    "majorEn": "English / Creative Writing",
    "majorKo": "영문·문예창작",
    "profile": "영문·문예창작 지망 · 예술·창작형",
    "spike": "독창적 작품 세계 + 꾸준한 발표",
    "activities": [
      "단편을 청소년 공모전에 꾸준히 출품",
      "문학 웹진을 창간해 또래 작품을 큐레이션",
      "교지 편집장으로 다년간 활동",
      "지역 도서관에서 글쓰기 워크숍을 운영"
    ],
    "essayAngle": "관객/독자의 반응이 창작관을 바꾼 전환점",
    "whyItWorked": [
      "포트폴리오·발표 이력으로 진정성과 지속성 입증",
      "정량 지표가 약한 분야를 스토리로 강하게 보완"
    ]
  },
  {
    "id": 98,
    "archetype": "인문·글쓰기형",
    "archetypeKey": "humanities",
    "tier": "t50",
    "tierKo": "Top 50 / 주립 명문",
    "majorEn": "Sociology / Public Policy",
    "majorKo": "사회학·공공정책",
    "profile": "사회학·공공정책 지망 · 인문·글쓰기형",
    "spike": "읽고 쓰고 토론으로 세상을 해석",
    "activities": [
      "불평등 이슈 캠페인을 조직",
      "사회 문제를 다룬 설문·리서치를 발표",
      "공공도서관과 협업한 프로그램을 기획",
      "지역 이주민 가정을 돕는 멘토링을 운영"
    ],
    "essayAngle": "역사 속 한 인물에게 던진 편지 형식의 성찰",
    "whyItWorked": [
      "탁월한 문장력 자체가 인문 전공 적합성의 증거",
      "활동(교지·토론·아카이브)이 글쓰기 정체성으로 수렴"
    ]
  },
  {
    "id": 99,
    "archetype": "역경 극복·성장형",
    "archetypeKey": "resilience",
    "tier": "t50",
    "tierKo": "Top 50 / 주립 명문",
    "majorEn": "Mathematics",
    "majorKo": "수학",
    "profile": "수학 지망 · 역경 극복·성장형",
    "spike": "개인적 어려움을 의미로 전환",
    "activities": [
      "수학으로 실제 데이터를 모델링",
      "수학 경시에서 다년간 입상",
      "수학 저널/문제집을 직접 제작",
      "후배를 위한 무료 수학 캠프를 운영"
    ],
    "essayAngle": "'약점'이라 여긴 것이 강점이 된 전환",
    "whyItWorked": [
      "공감과 성숙함이 진정성 있게 드러남",
      "맥락(환경)을 고려한 성취의 무게가 전달됨",
      "역경 자체가 아니라 '그로부터 무엇을 했는가'에 초점"
    ]
  },
  {
    "id": 100,
    "archetype": "STEM 경시·올림피아드형",
    "archetypeKey": "stem-comp",
    "tier": "t50",
    "tierKo": "Top 50 / 주립 명문",
    "majorEn": "Mathematics",
    "majorKo": "수학",
    "profile": "수학 지망 · STEM 경시·올림피아드형",
    "spike": "수학·과학 경시 깊이 + 가르침으로 확장",
    "activities": [
      "수학 저널/문제집을 직접 제작",
      "후배를 위한 무료 수학 캠프를 운영",
      "수학으로 실제 데이터를 모델링",
      "수학 경시에서 다년간 입상"
    ],
    "essayAngle": "한 문제를 며칠씩 붙들었던 몰입의 즐거움",
    "whyItWorked": [
      "경시 실력을 '나눔(튜터링·동아리)'으로 확장해 이기심 우려 해소",
      "학문적 깊이를 수상이 아니라 사고로 증명"
    ]
  }
];
