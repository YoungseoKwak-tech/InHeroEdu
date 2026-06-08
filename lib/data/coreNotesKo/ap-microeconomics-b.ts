/**
 * Core Notes 한국어 스토리텔링 버전 — AP Microeconomics Units 4–6.
 * 원본 내용 전량 보존(objectives·terms·traps·diagram 포함) + 일타강사 내러티브.
 * 원본에 overview가 없어 body 번역 대신 한국어 overview를 새로 추가했습니다.
 * 용어는 "한국어 (English)" 병기.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const AP_MICROECONOMICS_B_KO: CoreNote[] = [
  {
    lessonId: "ap-microeconomics-u4-l1",
    courseId: "ap-microeconomics",
    subjectLabel: "AP Microeconomics",
    emoji: "📉",
    unit: 4,
    lessonNum: 1,
    unitName: "Imperfect Competition",
    title: "독점 — 시장 지배력과 비효율",
    subtitle: null,
    overview:
      "독점기업(monopolist)은 시장에 단 하나뿐이라 시장 전체의 우하향 수요곡선을 그대로 마주합니다. 즉 더 많이 팔려면 가격을 내려야 하고, 그래서 한계수입(MR)이 가격(P)보다 항상 낮아져요. 여기서 이윤 극대화의 두 단계가 갈립니다. 시험에서 가장 많이 깨지는 함정 하나만 미리 박아둡시다 — 가격은 절대 MC 곡선에서 읽지 않습니다. MR=MC로 '수량'을 먼저 정하고, 그 수량에서 '수요곡선'을 올려다보며 '가격'을 읽는 거예요.",
    objectives: [
      "독점기업은 우하향 수요곡선을 마주한다 — 더 팔려면 가격을 내려야 하므로 MR < P가 된다.",
    ],
    formulas: [],
    diagram: "supply-demand",
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "이윤 극대화 (Profit max)",
            def: "MR = MC로 수량을 정한 뒤, 그 수량에서 소비자가 지불할 가격(수요곡선에서 읽은 값)을 부과한다.",
          },
          {
            term: "후생 순손실 (Deadweight loss)",
            def: "독점기업은 사회적으로 최적인 수량보다 더 적게 생산한다.",
          },
        ],
        traps: [
          "독점 이윤 극대화 가격을 수요곡선이 아니라 MC 곡선 위에 그리는 실수 — 독점기업은 MR = MC인 지점에서 생산하는데, 이것이 '수량'입니다. 그다음 그 수량에서 '수요곡선'을 보고 가격을 읽는데, 이것이 '가격'이에요. 가격을 절대 MC에서 읽지 마세요. 이 두 단계 절차는 독점이 등장하는 거의 모든 AP 미시 자유응답에서 시험에 나옵니다. 자동으로 나올 때까지 연습하세요.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-microeconomics-u4-l2",
    courseId: "ap-microeconomics",
    subjectLabel: "AP Microeconomics",
    emoji: "📉",
    unit: 4,
    lessonNum: 2,
    unitName: "Imperfect Competition",
    title: "독점적 경쟁 — 제품 차별화와 장기",
    subtitle: null,
    overview:
      "독점적 경쟁(monopolistic competition)은 독점과 완전경쟁 사이에 끼어 있어요. 기업 수는 많지만 제품을 '차별화'했기 때문에 각 기업이 자기만의 우하향 수요곡선을 갖습니다. 단기에는 이윤도 손실도 가능하지만, 진입이 자유로워 장기에는 이윤이 0으로 수렴해요(완전경쟁과 닮음). 시험의 핵심 함정은 장기 그래프에서 '초과설비(excess capacity)'를 빠뜨리는 것 — 수요곡선이 ATC에 접하는 점은 최저 ATC보다 왼쪽에 있고, 바로 그것이 독점적 경쟁의 비효율입니다.",
    objectives: [
      "제품 차별화가 각 기업에 우하향 수요곡선을 만든다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "단기 (Short run)",
            def: "이윤 또는 손실을 낼 수 있다. 장기에는 이윤이 0이 된다(완전경쟁과 유사).",
          },
          {
            term: "장기 균형 (Long-run equilibrium)",
            def: "ATC에 접한다 — 초과설비(최저 ATC가 아닌 지점에서 생산).",
          },
        ],
        traps: [
          "독점적 경쟁 장기 그래프에서 초과설비를 보여주지 않는 실수 — 수요곡선이 ATC에 접하는 점은 최저 ATC보다 '왼쪽'에 있습니다. 이는 기업이 최저 평균비용에서 생산하지 '않는다'는 뜻이고, 그래서 '초과설비'가 생겨요. AP는 이것을 독점적 경쟁의 비효율로 콕 집어 출제합니다. 완전경쟁(최저 ATC에서 생산)과 대비시키는 비교 문제가 단골이에요.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-microeconomics-u4-l3",
    courseId: "ap-microeconomics",
    subjectLabel: "AP Microeconomics",
    emoji: "📉",
    unit: 4,
    lessonNum: 3,
    unitName: "Imperfect Competition",
    title: "과점 — 게임 이론과 전략적 행동",
    subtitle: null,
    overview:
      "과점(oligopoly)은 소수의 큰 기업이 시장을 나눠 갖는 구조라, 한 기업의 결정이 다른 기업에 직접 영향을 줍니다 — 그래서 '전략적 행동'을 게임 이론으로 분석해요. 핵심은 죄수의 딜레마: 각자에게 합리적인 선택이 모두에게는 나쁜 결과를 낳는다는 거예요. 시험의 함정은 게임 이론을 특정 예시 풀이로만 보는 것 — AP는 '일반 원리'를 묻습니다. 지배전략이 협력보다 모두에게 나쁜 내쉬 균형으로 이끈다는 통찰, 그리고 카르텔이 죄수가 배신하는 것과 똑같은 이유로 깨진다는 점을 잡아야 합니다.",
    objectives: [
      "Imperfect Competition 단원의 '과점 — 게임 이론과 전략적 행동'을 완전히 익힌다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "죄수의 딜레마 (Prisoner's dilemma)",
            def: "개인적으로 합리적인 선택이 집단적으로는 나쁜 결과를 낳는 상황.",
          },
          {
            term: "내쉬 균형 (Nash equilibrium)",
            def: "다른 참가자들의 선택을 주어진 것으로 보고 각자가 최선의 대응을 택한 상태.",
          },
          {
            term: "담합 (Collusion)",
            def: "기업들이 독점기업처럼 행동하는 것. 가격 선도(price leadership)는 암묵적 담합의 한 형태.",
          },
        ],
        traps: [
          "게임 이론 문제를 특정 예시에 관한 것으로만 다루는 실수 — AP는 '일반 원리'를 묻습니다. 죄수의 딜레마에서 지배전략은 두 참가자 모두에게 협력보다 '더 나쁜' 내쉬 균형으로 이어집니다. 이것을 가격 카르텔, 광고, 군비 경쟁에 적용하려면, 사익이 공동의 이익을 갉아먹는다는 핵심 통찰을 이해해야 해요. 기업들이 카르텔 합의를 어기고 배신하는 이유는 죄수가 배신하는 이유와 똑같습니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-microeconomics-u5-l1",
    courseId: "ap-microeconomics",
    subjectLabel: "AP Microeconomics",
    emoji: "📉",
    unit: 5,
    lessonNum: 1,
    unitName: "Factor Markets",
    title: "노동시장 — MRP와 임금 결정",
    subtitle: null,
    overview:
      "요소시장(factor market)에서는 기업이 '사는 쪽', 가계가 '파는 쪽'으로 역할이 바뀝니다. 노동 수요는 '파생 수요(derived demand)'예요 — 노동 자체가 아니라 그 노동이 만드는 제품의 수요에서 나옵니다. 기업은 한계수입생산물(MRP = MP × 제품가격)이 임금(MRC)과 같아질 때까지 고용해요. 시험의 함정은 요소시장을 제품시장과 똑같이 취급하는 것 — 제품 가격이 오르면 MRP가 오르고 노동 수요가 오른쪽으로 이동합니다. 요소시장 분석은 항상 제품시장을 먼저 거쳐야 해요.",
    objectives: [
      "MRP = MP × 제품가격 — 노동에 대한 파생 수요.",
      "기업은 MRP = 임금(MRC)이 될 때까지 노동을 고용한다.",
    ],
    formulas: ["MRP=MP×price", "hire while MRP≥wage"],
    diagram: "supply-demand",
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "수요독점 (Monopsony)",
            def: "노동의 유일한 구매자가 경쟁 수준보다 낮게 임금을 설정하는 상황.",
          },
        ],
        traps: [
          "요소시장을 제품시장과 완전히 똑같이 취급하는 실수 — 노동 수요는 '파생' 수요입니다(제품 수요에서 파생됨). 제품 가격이 오르면 MRP가 오르고, 기업은 같은 임금에서 더 많은 노동을 고용해요. AP는 제품시장과 요소시장의 연결을 시험합니다. 기업 제품에 세금을 매기면 MRP가 줄어 노동 수요가 왼쪽으로 이동하죠. 요소시장 분석은 반드시 제품시장을 먼저 추적해야 합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-microeconomics-u6-l1",
    courseId: "ap-microeconomics",
    subjectLabel: "AP Microeconomics",
    emoji: "📉",
    unit: 6,
    lessonNum: 1,
    unitName: "Market Failure and the Role of Government",
    title: "외부효과와 공공재",
    subtitle: null,
    overview:
      "시장이 항상 효율적인 건 아니에요 — 외부효과(externality)와 공공재(public goods)가 대표적인 '시장 실패'입니다. 부정적 외부효과는 사회적 비용이 사적 비용보다 커서 과잉생산되고(피구세로 교정), 긍정적 외부효과는 사회적 편익이 사적 편익보다 커서 과소생산돼요(보조금으로 교정). 공공재는 비배제성·비경합성 때문에 무임승차 문제가 생겨 민간시장이 과소공급합니다. 시험의 함정은 그래프에서 사회적 비용/편익 곡선을 빠뜨리는 것 — 사적 곡선과 사회적 곡선을 '둘 다' 그려야 합니다.",
    objectives: [
      "Market Failure and the Role of Government 단원의 '외부효과와 공공재'를 완전히 익힌다.",
    ],
    formulas: [],
    diagram: "supply-demand",
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "부정적 외부효과 (Negative externality)",
            def: "사회적 비용 > 사적 비용 → 시장이 과잉생산. 피구세(Pigouvian tax)로 교정한다.",
          },
          {
            term: "긍정적 외부효과 (Positive externality)",
            def: "사회적 편익 > 사적 편익 → 시장이 과소생산. 보조금으로 교정한다.",
          },
          {
            term: "공공재 (Public goods)",
            def: "비배제성 + 비경합성 → 무임승차 문제 → 민간시장이 과소공급한다.",
          },
        ],
        traps: [
          "외부효과 그래프를 그리면서 사회적 비용/편익 곡선을 보여주지 않는 실수 — AP 자유응답은 사적 곡선과 사회적 곡선을 '둘 다' 그릴 것을 요구합니다. 부정적 외부효과: 공급(사적 비용)이 진짜 사회적 비용 곡선보다 아래에 있어요. 효율적 산출량은 수요가 '사회적' 비용과 만나는 지점이며, 이는 시장 산출량보다 '적습니다'. 긍정적 외부효과: 수요(사적 편익)가 사회적 편익보다 아래에 있어요. 두 곡선을 모두 그리고, 시장 수량과 효율적 수량을 표시한 뒤, 후생 순손실 삼각형을 음영 처리하세요.",
        ],
        example: null,
      },
    ],
  },
];
