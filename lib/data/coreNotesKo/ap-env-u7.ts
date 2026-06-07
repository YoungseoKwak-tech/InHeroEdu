/**
 * Core Notes 한국어 스토리텔링 버전 — AP Environmental Science Unit 7 (7.1–7.8 전체).
 * 원본 내용 전량 보존(objectives·terms·traps) + 일타강사 내러티브로 overview·body 보강.
 * 용어는 "한국어 (English)" 병기.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const AP_ENV_U7_KO: CoreNote[] = [
  {
    lessonId: "ap-environmental-science-u7-l1",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 7,
    lessonNum: 1,
    unitName: "Atmospheric Pollution",
    title: "대기 오염물질 — 1차와 2차",
    subtitle: "직접 배출되는 것과, 대기 중에서 만들어지는 것 — 이 구분이 출발점이에요.",
    overview:
      "대기 오염물질은 두 종류로 나뉩니다: 굴뚝·배기관에서 '직접' 나오는 1차 오염물질과, 대기 중에서 반응으로 '만들어지는' 2차 오염물질. EPA의 6대 기준 오염물질과 그 건강 영향이 이 단원의 토대예요.",
    objectives: [
      "EPA 6대 기준 오염물질과 그 건강 영향을 파악할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "1차 오염물질은 발생원에서 직접 배출돼요(SO₂, NOx, CO, 입자상 물질, VOCs). 2차 오염물질은 대기 중에서 1차 오염물질이 반응해 형성됩니다(오존, PAN, H₂SO₄, HNO₃). EPA 6대 기준 오염물질(입자상 물질, 지표면 오존, CO, SO₂, NOx, 납)은 각각 호흡기·심혈관 건강에 영향을 줘요.",
        keyIdea:
          "1차 = 직접 배출(SO₂·NOx·CO·입자·VOC), 2차 = 대기 중 형성(오존·PAN·H₂SO₄·HNO₃).",
        table: null,
        terms: [
          {
            term: "1차 오염물질 (Primary)",
            def: "직접 배출됨(SO₂, NOx, CO, 입자상 물질, VOCs).",
          },
          {
            term: "2차 오염물질 (Secondary)",
            def: "대기 중에서 형성됨(오존, PAN, H₂SO₄, HNO₃).",
          },
        ],
        traps: [
          "지표면 오존(나쁨, 대류권 오염물질)과 성층권 오존(좋음, UV 차단)을 혼동하기 — AP가 명시적으로 시험해요; 같은 분자가 고도에 따라 반대 효과를 냅니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-environmental-science-u7-l2",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 7,
    lessonNum: 2,
    unitName: "Atmospheric Pollution",
    title: "광화학 스모그 형성",
    subtitle: "자동차 배기 + 햇빛 = 오존 기반 스모그. 그리고 기온 역전이 그걸 가둡니다.",
    overview:
      "광화학 스모그는 자동차에서 나온 NOx와 VOCs가 햇빛을 받아 오존과 PAN을 만드는 2차 오염이에요. 로스앤젤레스처럼 차 많고 햇빛 강한 도시가 전형적이고, 기온 역전이 오염물질을 지표 근처에 가둬 악화시킵니다.",
    objectives: [
      "NOx + VOCs + 햇빛 → 오존 + PAN(광화학 스모그) 과정을 설명할 수 있다.",
      "기온 역전이 오염물질을 지표 근처에 가두는 것을 설명할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "NOx + VOCs + 햇빛 → 오존 + PAN이 광화학 스모그의 핵심 반응이에요. 로스앤젤레스 조건 — 자동차 + 햇빛 + 지형(분지) — 이 스모그를 만드는 전형적 사례입니다. 기온 역전(따뜻한 공기층이 찬 공기를 덮어 상승을 막음)이 오염물질을 지표 근처에 가둬 농도를 높여요.",
        keyIdea:
          "NOx + VOCs + 햇빛 → 오존 + PAN. 기온 역전이 오염물질을 가둬 악화시킵니다.",
        table: null,
        terms: [
          {
            term: "로스앤젤레스 조건 (Los Angeles conditions)",
            def: "자동차 + 햇빛 + 지형이 스모그를 만드는 것.",
          },
        ],
        traps: [
          "광화학 스모그(오존 기반, 햇빛 많은 도시)와 산업/런던형 스모그(황 성분, 안개, 추움)를 혼동하기 — 화학·조건·건강 영향이 다릅니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-environmental-science-u7-l3",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 7,
    lessonNum: 3,
    unitName: "Atmospheric Pollution",
    title: "산성 침적 — 화학과 생태 피해",
    subtitle: "SO₂와 NOx가 대기 중에서 산으로 변해 비로 내려요 — 그리고 발생원에서 멀리까지 갑니다.",
    overview:
      "산성 침적(산성비)은 SO₂와 NOx가 대기 중 물과 반응해 황산·질산을 만들어 내리는 현상이에요. 호수와 토양을 산성화하고, 발생원에서 멀리 떨어진 지역까지 영향을 주는 월경성 오염입니다.",
    objectives: [
      "SO₂ + H₂O → H₂SO₃ → H₂SO₄; NOx + H₂O → HNO₃ 반응을 설명할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "산성비 화학: SO₂ + H₂O → H₂SO₃ → H₂SO₄(황산), NOx + H₂O → HNO₃(질산). 수생 생태계에서 pH가 5 미만으로 떨어지면 알루미늄이 토양에서 용출되어 물고기 아가미를 손상시켜요. 그리고 장거리 수송으로 발생원에서 멀리 떨어진 지역까지 산성비가 영향을 줍니다.",
        keyIdea:
          "SO₂ → H₂SO₄, NOx → HNO₃. pH < 5에서 알루미늄 용출이 수생 생물을 죽이고, 산성비는 멀리까지 이동해요.",
        table: null,
        terms: [
          {
            term: "수생 생태계 pH 영향 (pH effects on aquatic ecosystems)",
            def: "pH < 5에서 알루미늄 용출.",
          },
          {
            term: "장거리 수송 (Long-range transport)",
            def: "발생원에서 멀리 떨어진 지역에 영향을 주는 산성비.",
          },
        ],
        traps: [
          "산성비를 국지적 문제로만 취급하기 — 오하이오의 배출이 탁월 편서풍 때문에 뉴잉글랜드에 산성비를 만들어요; AP는 월경성 오염과 국제 정책을 시험합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-environmental-science-u7-l4",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 7,
    lessonNum: 4,
    unitName: "Atmospheric Pollution",
    title: "성층권 오존 파괴",
    subtitle: "염소 원자 하나가 오존 분자 10만 개를 부숴요 — 촉매 순환이 핵심입니다.",
    overview:
      "CFC(염화불화탄소)가 성층권에서 오존층을 파괴해요. 핵심은 촉매 순환 — 염소 원자 하나가 소모되지 않고 오존 분자 수만 개를 연쇄적으로 파괴합니다. 몬트리올 의정서가 이를 막은 정책 성공 사례예요.",
    objectives: [
      "몬트리올 의정서를 정책 성공 사례로 설명할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "CFC 촉매 파괴: Cl + O₃ → ClO + O₂; ClO + O → Cl + O₂ (염소가 재생됨). 염소가 다시 나오니 한 원자가 계속 파괴를 반복해요. 남극 오존 구멍은 극 성층권 구름이 염소를 농축시켜 생깁니다. 몬트리올 의정서가 CFC를 단계적으로 퇴출해 오존층 회복을 이끈 대표적 국제 정책 성공이에요.",
        keyIdea:
          "Cl + O₃ → ClO + O₂, ClO + O → Cl + O₂ (염소 재생). 한 Cl이 오존 ~10만 개 파괴. 몬트리올 의정서가 성공적으로 막음.",
        table: null,
        terms: [
          {
            term: "CFC 촉매 파괴 (CFC catalytic destruction)",
            def: "Cl + O₃ → ClO + O₂; ClO + O → Cl + O₂ (Cl 재생됨).",
          },
          {
            term: "남극 오존 구멍 (Antarctic ozone hole)",
            def: "극 성층권 구름이 염소를 농축시킴.",
          },
        ],
        traps: [
          "CFC가 오존을 '일회성' 반응으로 파괴한다고 말하기 — 각 Cl 원자가 제거되기 전 약 10만 개의 오존 분자를 촉매적으로 파괴해요; 촉매 순환이 핵심 AP 개념입니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-environmental-science-u7-l5",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 7,
    lessonNum: 5,
    unitName: "Atmospheric Pollution",
    title: "실내 공기 오염",
    subtitle: "가장 위험한 공기가 종종 집 안에 있어요 — 라돈, VOC, 그리고 바이오매스 연소.",
    overview:
      "실내 공기 오염은 종종 간과되지만 심각해요. 건축 자재·청소용품에서 나오는 VOCs, 우라늄 붕괴에서 나오는 방사성 가스 라돈, 그리고 개발도상국의 바이오매스 연소가 주요 원인입니다.",
    objectives: [
      "건축 자재와 청소용품에서 나오는 VOCs를 설명할 수 있다.",
      "개발도상국의 바이오매스 연소로 인한 실내 공기 오염을 설명할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "VOCs는 건축 자재·페인트·청소용품에서 방출돼요. 개발도상국에서는 환기가 나쁜 실내에서 바이오매스(장작·동물 분뇨)를 태워 심각한 실내 오염이 생깁니다. 그리고 라돈 — 우라늄 붕괴에서 나오는 자연 방사성 가스로, 기초 균열로 들어와 지하실에 쌓여 폐암 위험을 일으켜요(폐에서 알파 입자 방출).",
        keyIdea:
          "라돈 = 우라늄 붕괴 자연 방사성 가스, 기초 균열로 침투·지하실 축적, 폐암 위험.",
        table: null,
        terms: [
          {
            term: "라돈 (Radon)",
            def: "우라늄 붕괴에서 나오는 자연 방사성 가스, 폐암 위험.",
          },
        ],
        traps: [
          "실내 공기질을 AP 주제로 간과하기 — AP는 라돈(기초 균열로 진입, 지하실에 축적)과 그 피해 메커니즘(폐에서 알파 입자 방출)을 구체적으로 시험합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-environmental-science-u7-l6",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 7,
    lessonNum: 6,
    unitName: "Atmospheric Pollution",
    title: "대기 정화법과 오염 저감",
    subtitle: "규제가 '어떻게' 작동하는지가 핵심 — 단순히 금지하느냐가 아니에요.",
    overview:
      "대기 정화법(Clean Air Act)은 6대 기준 오염물질에 국가 대기질 기준(NAAQS)을 정하고, 최선의 가용 방지 기술(BACT)을 요구하며, 1990년 개정으로 SO₂ 배출권 거래제를 도입했어요. 규제가 '어떻게' 배출을 줄이는지의 메커니즘이 시험 포인트입니다.",
    objectives: [
      "6대 기준 오염물질에 대한 NAAQS 기준을 파악할 수 있다.",
      "최선의 가용 방지 기술(BACT) 요건을 설명할 수 있다.",
      "1990년 CAA 개정의 SO₂ 배출권 거래제를 설명할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "대기 정화법과 오염 저감",
        subtitle: null,
        body:
          "대기 정화법은 6대 기준 오염물질에 국가 대기질 기준(NAAQS)을 설정하고, 신규 오염원에 최선의 가용 방지 기술(BACT)을 요구해요. 1990년 개정은 SO₂에 배출권 거래제(cap-and-trade)를 도입했는데 — 총 배출 상한을 정하고 배출권을 발행해 거래를 허용함으로써, 가장 싼 감축이 먼저 일어나게 합니다. 산성비를 크게 줄인 성공 사례예요.",
        keyIdea:
          "NAAQS(기준 설정) + BACT(기술 요구) + SO₂ 배출권 거래제(상한 + 거래 → 싼 감축 먼저).",
        table: null,
        terms: [],
        traps: [
          "규제를 이분법(예/아니오)으로 취급하기 — AP는 규제가 '어떻게' 작동하는지 시험해요; 배출권 거래제는 총 배출 상한을 정하고, 배출권을 발행하고, 거래를 허용해 가장 싼 감축이 먼저 일어나게 합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-environmental-science-u7-l7",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 7,
    lessonNum: 7,
    unitName: "Atmospheric Pollution",
    title: "소음 공해와 빛 공해",
    subtitle: "사소해 보이지만 야생동물에 실질적 피해를 줘요 — FRQ는 메커니즘을 묻습니다.",
    overview:
      "소음 공해와 빛 공해는 사소해 보이지만 야생동물에 실질적 피해를 줘요. 소음은 동물의 의사소통·항법·번식을 교란하고, 빛은 생체 리듬을 무너뜨리고 바다거북을 방향 상실시킵니다. 해결책은 조명 차폐와 불필요한 조명 줄이기예요.",
    objectives: [
      "대기 오염 단원의 소음·빛 공해를 숙달할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "소음 공해는 야생동물의 의사소통·항법·번식을 교란해요(예: 고래의 음향 소통 방해). 빛 공해는 생체 리듬을 무너뜨리고 바다거북을 방향 상실시킵니다 — 새끼 거북은 바다 위 달빛으로 항해하는데, 인공 조명이 혼란을 일으켜요. 해결책: 조명 차폐(빛을 아래로), 불필요한 조명 줄이기.",
        keyIdea:
          "소음 = 의사소통·항법·번식 교란. 빛 = 생체 리듬 교란, 바다거북 방향 상실. 해결: 차폐·조명 감소.",
        table: null,
        terms: [
          {
            term: "야생동물에 대한 소음 공해 영향 (Noise pollution effects on wildlife)",
            def: "의사소통·항법·번식 교란.",
          },
          {
            term: "빛 공해 (Light pollution)",
            def: "생체 리듬 교란, 바다거북 방향 상실.",
          },
          {
            term: "해결책 (Solutions)",
            def: "조명 차폐, 불필요한 조명 감소.",
          },
        ],
        traps: [
          "소음/빛 공해를 사소한 AP 주제로 취급하기 — FRQ에 나와 메커니즘 설명을 요구해요; 바다거북은 바다 위 달빛으로 항해하는데 인공 조명이 방향 상실을 일으킵니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-environmental-science-u7-l8",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 7,
    lessonNum: 8,
    unitName: "Atmospheric Pollution",
    title: "기후 변화와 대기 오염의 연결",
    subtitle: "공기를 깨끗이 하면 기후도 식어요 — 오염 저감의 동반 이익.",
    overview:
      "대기 오염과 기후 변화는 따로가 아니에요. 검댕(블랙 카본)은 복사를 흡수해 온난화를 일으키면서 건강 문제도 내고, 오존은 대류권 오염물질이면서 온실가스이기도 합니다. 오염 저감이 공기질과 기후를 동시에 개선하는 동반 이익이 핵심이에요.",
    objectives: [
      "검댕(블랙 카본)이 복사를 흡수하면서 건강 문제도 일으킴을 설명할 수 있다.",
      "오존이 (대류권) 오염물질이면서 온실가스임을 설명할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "블랙 카본(검댕)은 복사를 흡수해 온난화를 일으키는 '동시에' 호흡기 건강 문제를 냅니다. 오존은 대류권에서 오염물질이면서 온실가스이기도 해요. 그래서 오염 저감의 동반 이익이 생깁니다 — 공기질을 개선하면서 '동시에' 온난화를 줄이는 거죠. 메탄 감축이 대표적: 기후 변화를 막으면서 지표면 오존도 줄여요.",
        keyIdea:
          "오염 저감 = 동반 이익(공기질 개선 + 온난화 감소). 검댕·오존이 오염이자 온난화 요인.",
        table: null,
        terms: [
          {
            term: "오염 저감의 동반 이익 (Co-benefits of pollution reduction)",
            def: "공기질 개선 + 온난화 감소를 동시에.",
          },
        ],
        traps: [
          "대기 오염을 기후 정책과 분리하기 — 메탄 감축은 기후 변화를 막으면서 '동시에' 지표면 오존을 줄여요; AP는 이 동반 이익을 시험합니다.",
        ],
        example: null,
      },
    ],
  },
];
