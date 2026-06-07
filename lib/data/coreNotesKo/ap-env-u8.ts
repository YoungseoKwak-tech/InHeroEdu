/**
 * Core Notes 한국어 스토리텔링 버전 — AP Environmental Science Unit 8 (8.1–8.8 전체).
 * 원본 내용 전량 보존(objectives·terms·traps·diagram) + 일타강사 내러티브로 overview·body 보강.
 * 용어는 "한국어 (English)" 병기.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const AP_ENV_U8_KO: CoreNote[] = [
  {
    lessonId: "ap-environmental-science-u8-l1",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 8,
    lessonNum: 1,
    unitName: "Aquatic and Terrestrial Pollution",
    title: "수질 오염 — 점오염원 vs 비점오염원",
    subtitle: "한 지점에서 나오느냐, 넓게 퍼져 나오느냐 — 이게 규제 가능성을 가릅니다.",
    overview:
      "수질 오염은 출처로 나뉩니다: 파이프·배수구처럼 특정 지점에서 나오는 점오염원과, 농경지 유출·도시 빗물처럼 넓게 퍼져 나오는 비점오염원. 비점오염원은 단일 배출구가 없어 규제가 훨씬 어려워요.",
    objectives: [
      "점오염원과 비점오염원을 구별하고 규제 가능성 차이를 설명할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "점오염원은 특정 위치(파이프·배수구)에서 나와 규제가 쉬워요. 비점오염원은 분산적(농경지 유출·도시 빗물)이라 통제가 어렵습니다. 수질 정화법(Clean Water Act)은 점오염원에 배출 허가를 요구해요 — 단일 배출구가 있어야 허가·감시가 되니까요.",
        keyIdea:
          "점오염원 = 특정 지점(규제 쉬움), 비점오염원 = 분산(규제 어려움). 수질 정화법은 점오염원 배출 허가.",
        table: null,
        terms: [
          {
            term: "점오염원 (Point source)",
            def: "특정 위치(파이프·배수구) — 규제하기 더 쉬움.",
          },
          {
            term: "비점오염원 (Nonpoint source)",
            def: "분산적(농경지 유출·도시 빗물) — 통제하기 더 어려움.",
          },
          {
            term: "수질 정화법 (Clean Water Act)",
            def: "점오염원에 대한 배출 허가.",
          },
        ],
        traps: [
          "점오염원 규제를 비점오염원 문제에 적용하기 — 농부의 밭에는 단일 배출 지점이 없어요; AP는 왜 비점오염원이 규제하기 더 어렵고 어떤 전략이 다루는지 시험합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-environmental-science-u8-l2",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 8,
    lessonNum: 2,
    unitName: "Aquatic and Terrestrial Pollution",
    title: "부영양화 — 영양분 오염 메커니즘",
    subtitle: "비료가 물로 흘러들면 → 조류 폭증 → 분해 → 산소 고갈 → 죽음의 구역.",
    overview:
      "부영양화는 질소·인이 물로 유출되어 조류가 폭증하고, 그 조류가 죽어 분해되며 산소를 고갈시키는 연쇄예요. 멕시코만의 빈산소 죽음의 구역이 대표 사례입니다.",
    objectives: [
      "질소·인 유출 → 조류 대증식 → 분해 → 산소 고갈 과정을 설명할 수 있다.",
    ],
    formulas: [],
    diagram: "energy-pyramid",
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "질소·인 유출 → 조류 대증식 → (조류 사멸) 분해 → 산소 고갈이 부영양화의 핵심 연쇄예요. 빈산소 죽음의 구역(멕시코만이 대표 AP 사례)이 그 결과입니다. 제한 영양분 개념도 중요해요 — 담수에 인을 더하면 성장이 촉발됩니다.",
        keyIdea:
          "영양분 유출 → 조류 폭증 → 분해로 산소 고갈 → 빈산소 죽음의 구역(멕시코만).",
        table: null,
        terms: [
          {
            term: "빈산소 죽음의 구역 (Hypoxic dead zones)",
            def: "멕시코만이 주요 AP 사례 연구.",
          },
          {
            term: "제한 영양분 개념 (Limiting nutrient concept)",
            def: "담수에 인을 더하면 성장이 촉발됨.",
          },
        ],
        traps: [
          "어느 영양분이 어느 시스템을 제한하는지 혼동하기 — 인은 보통 담수 시스템을, 질소는 보통 해양/연안 시스템을 제한해요; AP는 시나리오 속 특정 시스템을 묻습니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-environmental-science-u8-l3",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 8,
    lessonNum: 3,
    unitName: "Aquatic and Terrestrial Pollution",
    title: "유독 오염물질과 생물 농축",
    subtitle: "한 생물 안에 쌓이느냐(생물 축적), 먹이 그물 위로 갈수록 진해지느냐(생물 농축).",
    overview:
      "유독 오염물질은 지방에 녹거나 대사되지 않아 생물에 쌓여요. 한 생물 안에서 시간에 걸쳐 쌓이는 생물 축적과, 먹이 그물 상위로 갈수록 농도가 진해지는 생물 농축을 구별하는 게 핵심입니다.",
    objectives: [
      "개별 생물 내 생물 축적과 먹이 그물을 가로지르는 생물 농축을 구별할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "생물 농축(biomagnification)은 영양 단계가 높아질수록 농도가 증가하는 것이에요. PCB·DDT·수은 같은 물질은 지용성이거나 대사되지 않아 지방 조직에 농축됩니다. 최상위 포식자가 가장 높은 농도를 갖게 돼요.",
        keyIdea:
          "생물 축적 = 한 생물 안 시간 누적; 생물 농축 = 영양 단계 위로 농도 증가. PCB·DDT·수은이 대표.",
        table: null,
        terms: [
          {
            term: "생물 농축 (Biomagnification)",
            def: "더 높은 영양 단계에서 농도가 증가함.",
          },
          {
            term: "PCB·DDT·수은 (PCBs, DDT, mercury)",
            def: "지용성이거나 대사 불가능해 지방 조직에 농축됨.",
          },
        ],
        traps: [
          "생물 축적(한 생물 안 시간 경과)과 생물 농축(영양 단계를 가로지른 농도 증가)을 혼동하기 — AP는 이 두 과정을 명시적으로 구별합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-environmental-science-u8-l4",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 8,
    lessonNum: 4,
    unitName: "Aquatic and Terrestrial Pollution",
    title: "고형 폐기물 — 종류, 처리, 감량",
    subtitle: "재활용보다 '감량'이 먼저예요 — 폐기물 위계의 핵심.",
    overview:
      "고형 폐기물은 도시 생활폐기물(MSW)이 대표적이고, 매립지 처리와 폐기물 위계(감량·재사용·재활용·회수·처분)로 다룹니다. 핵심: 위계의 맨 위는 재활용이 아니라 '발생원 감량'이에요.",
    objectives: [
      "고형 폐기물의 종류·처리·감량을 숙달할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "도시 생활폐기물 구성은 음식물(무게로 최다), 종이, 플라스틱 순이에요. 매립지 구조에는 차수막(라이너), 침출수 수집, 메탄 포집이 있습니다. 폐기물 위계는 감량 → 재사용 → 재활용 → 회수 → 처분 순서로, 위로 갈수록 효과적이에요.",
        keyIdea:
          "폐기물 위계: 감량 > 재사용 > 재활용 > 회수 > 처분. '발생원 감량'이 최우선(재활용 아님).",
        table: null,
        terms: [
          {
            term: "도시 생활폐기물 구성 (Municipal solid waste composition)",
            def: "음식물(무게로 최다), 종이, 플라스틱.",
          },
          {
            term: "매립지 구조 (Landfill anatomy)",
            def: "차수막, 침출수 수집, 메탄 포집.",
          },
          {
            term: "폐기물 위계 (Waste hierarchy)",
            def: "감량, 재사용, 재활용, 회수, 처분.",
          },
        ],
        traps: [
          "재활용을 최우선으로 취급하기 — 폐기물 위계는 '감량'을 첫째로 둬요; AP FRQ는 전략 순위를 매기고 왜 발생원 감량이 재활용보다 효과적인지 묻습니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-environmental-science-u8-l5",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 8,
    lessonNum: 5,
    unitName: "Aquatic and Terrestrial Pollution",
    title: "유해 폐기물 — 분류와 슈퍼펀드",
    subtitle: "현재 폐기물은 RCRA, 버려진 과거 오염 부지는 CERCLA — 어느 법이 적용되는지가 포인트.",
    overview:
      "유해 폐기물은 RCRA가 네 특성(발화성·부식성·반응성·독성)으로 분류하고, 슈퍼펀드(CERCLA)가 오염자 부담 원칙으로 버려진 과거 오염 부지를 정화해요. 브라운필드(오염된 산업 부지)의 재개발도 과제입니다.",
    objectives: [
      "유해 폐기물 분류와 슈퍼펀드를 숙달할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "RCRA는 유해 폐기물을 네 특성 — 발화성·부식성·반응성·독성 — 으로 규정해요. 슈퍼펀드(CERCLA)는 오염자 부담 원칙과 국가 우선순위 목록(NPL)으로 버려진 과거 오염 부지를 정화합니다. 브라운필드는 오염된 산업 부지로, 재개발에 어려움이 있어요.",
        keyIdea:
          "RCRA = 현재 유해 폐기물(발화·부식·반응·독성). CERCLA(슈퍼펀드) = 버려진 과거 오염 부지(오염자 부담).",
        table: null,
        terms: [
          {
            term: "RCRA 유해 폐기물 특성 (RCRA characterizing hazardous waste)",
            def: "발화성, 부식성, 반응성, 독성.",
          },
          {
            term: "슈퍼펀드 (Superfund, CERCLA)",
            def: "오염자 부담 원칙, 국가 우선순위 목록.",
          },
          {
            term: "브라운필드 (Brownfields)",
            def: "오염된 산업 부지와 재개발 과제.",
          },
        ],
        traps: [
          "모든 산업 폐기물이 똑같이 규제된다고 가정하기 — RCRA는 현재 유해 폐기물을, CERCLA(슈퍼펀드)는 버려진 과거 부지를 다뤄요; AP는 어느 법이 어느 시나리오에 적용되는지 시험합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-environmental-science-u8-l6",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 8,
    lessonNum: 6,
    unitName: "Aquatic and Terrestrial Pollution",
    title: "기름 유출 — 영향과 복원",
    subtitle: "눈에 보이는 기름만이 아니에요 — PAH 화합물의 만성 독성이 수십 년 지속됩니다.",
    overview:
      "기름 유출은 물리적 피해(바닷새 코팅, 저서 생물 질식)와 화학적 독성(PAH 화합물이 물고기 번식 방해)을 둘 다 냅니다. 복원에는 탄화수소 분해 세균을 쓰는 생물 정화가 있어요. 단기뿐 아니라 장기 영향이 핵심입니다.",
    objectives: [
      "기름 유출의 영향과 복원을 숙달할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "물리적 영향: 바닷새를 코팅하고 저서 생물을 질식시켜요. 화학적 독성: PAH 화합물이 물고기 번식에 영향을 줍니다. 생물 정화(bioremediation)는 탄화수소 분해 세균을 정화 도구로 써요. 가시적 기름이 사라진 뒤에도 PAH와 분산제 독성의 만성 효과가 수십 년 지속됩니다.",
        keyIdea:
          "물리적(새 코팅·저서 질식) + 화학적(PAH가 번식 방해). 생물 정화 = 탄화수소 분해 세균. 만성 영향이 수십 년.",
        table: null,
        terms: [
          {
            term: "물리적 영향 (Physical effects)",
            def: "바닷새 코팅, 저서 생물 질식.",
          },
          {
            term: "화학적 독성 (Chemical toxicity)",
            def: "PAH 화합물이 물고기 번식에 영향.",
          },
          {
            term: "생물 정화 (Bioremediation)",
            def: "탄화수소 분해 세균을 정화 도구로 사용.",
          },
        ],
        traps: [
          "가시적 기름 영향에만 초점 맞추기 — PAH 화합물과 분산제 독성의 장기 만성 영향이 수십 년 지속돼요; AP는 유출의 급성·장기 영향을 모두 시험합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-environmental-science-u8-l7",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 8,
    lessonNum: 7,
    unitName: "Aquatic and Terrestrial Pollution",
    title: "토양 오염과 복원",
    subtitle: "식물로 중금속을 빨아들이는 식물 정화 — 단, 수확해서 처분해야 진짜 제거예요.",
    overview:
      "토양 오염은 채굴·산업에서 나온 중금속(납·비소·카드뮴)이 주범이에요. 복원은 현장내(in-situ)와 현장외(ex-situ) 방식의 맞교환이 있고, 식물 정화(과축적 식물이 금속을 뽑아냄)가 대표 기법입니다.",
    objectives: [
      "현장내 복원과 현장외 복원의 맞교환을 설명할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "중금속 오염은 채굴/산업에서 나온 납·비소·카드뮴이 대표적이에요. 식물 정화(phytoremediation)는 과축적 식물이 토양에서 금속을 추출하는 기법입니다. 현장내(in-situ, 그 자리에서)와 현장외(ex-situ, 흙을 파내 처리) 방식이 비용·효과에서 맞교환을 가져요.",
        keyIdea:
          "식물 정화 = 과축적 식물이 금속 추출. 단, 식물을 수확·적절히 처분해야 실제 제거됨(안 그러면 금속이 토양으로 복귀).",
        table: null,
        terms: [
          {
            term: "중금속 오염 (Heavy metal contamination)",
            def: "채굴/산업에서 나온 납·비소·카드뮴.",
          },
          {
            term: "식물 정화 (Phytoremediation)",
            def: "식물(과축적종)이 토양에서 금속을 추출하는 것.",
          },
        ],
        traps: [
          "식물 정화를 메커니즘 없이 기술하기 — 부지에서 금속을 실제로 제거하려면 식물을 수확하고 적절히 처분해야 해요; 분해되게 두면 금속이 토양으로 돌아갑니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-environmental-science-u8-l8",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 8,
    lessonNum: 8,
    unitName: "Aquatic and Terrestrial Pollution",
    title: "환경 정의 — 오염 부담의 분배",
    subtitle: "오염 부담은 고르게 분배되지 않아요 — 저소득·소수자 공동체가 더 많이 짊어집니다.",
    overview:
      "환경 정의는 오염 노출이 저소득·소수자 공동체에 불균형하게 집중되는 문제를 다뤄요. 기피 토지 이용(LULUs)의 입지 결정, 환경 정의 운동, EPA의 환경 정의 정책이 핵심입니다.",
    objectives: [
      "저소득·소수자 공동체의 불균형한 오염 노출을 설명할 수 있다.",
      "기피 토지 이용(LULUs)과 입지 결정을 설명할 수 있다.",
      "환경 정의 운동과 EPA 환경 정의 정책을 파악할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "환경 정의 — 오염 부담의 분배",
        subtitle: null,
        body:
          "오염 노출은 저소득·소수자 공동체에 불균형하게 집중돼요. 기피 토지 이용(LULUs, 매립지·소각장·공장 등)이 정치적 저항이 적은 지역에 입지되는 경향이 있습니다. 환경 정의 운동과 EPA의 환경 정의 정책이 이 불평등을 바로잡으려 노력해요.",
        keyIdea:
          "오염 부담은 저소득·소수자 공동체에 집중. LULUs 입지가 불평등을 심화. 환경 정의가 이를 바로잡으려 함.",
        table: null,
        terms: [],
        traps: [
          "환경 정의를 환경 과학과 별개로 취급하기 — AP FRQ는 환경 정의를 오염 주제와 통합해요; 어느 공동체가 특정 오염물질에서 가장 큰 부담을 지는지 연결해야 합니다.",
        ],
        example: null,
      },
    ],
  },
];
