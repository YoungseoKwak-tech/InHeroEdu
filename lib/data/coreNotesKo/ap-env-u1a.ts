/**
 * Core Notes 한국어 스토리텔링 버전 — AP Environmental Science Unit 1 (1.1–1.2).
 * 원본 내용 전량 보존(overview·body·keyIdea·table·diagram 포함) + 일타강사 내러티브.
 * 용어는 "한국어 (English)" 병기.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const AP_ENV_U1A_KO: CoreNote[] = [
  {
    lessonId: "ap-environmental-science-u1-l1",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 1,
    lessonNum: 1,
    unitName: "The Living World: Ecosystems",
    title: "생태계 구조 — 누가 누구를 먹는가, 그리고 왜 중요한가",
    subtitle: "생태계는 먹이 관계로 지어집니다 — 에너지를 따라가면 전체 시스템이 보여요.",
    overview:
      "생태계(ecosystem)는 한 지역의 모든 생물 + 그 무생물 환경이 상호작용하는 것입니다. 그 구조의 척추가 '누가 누구를 먹는가'예요 — 생산자가 에너지를 붙잡고, 소비자가 넘겨받고, 분해자가 재순환합니다. 이 먹이 관계를 지도로 그리면 시스템의 논리가 한눈에 드러나요. 자, 따라가 봅시다.",
    objectives: [
      "생태계, 생물적 요인, 무생물적 요인을 정의할 수 있다.",
      "영양 단계(생산자·소비자·분해자)를 식별할 수 있다.",
      "먹이 사슬과 먹이 그물을 설명할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "생물적·무생물적 요인과 영양 단계",
        subtitle: null,
        body:
          "생태계는 생물적(biotic, 살아있는) 요인과 무생물적(abiotic, 햇빛·물·토양·온도 같은 비생명) 요인을 결합합니다. 에너지는 광합성을 하는 생산자(autotroph, 독립영양생물)를 통해 들어와, 소비자(초식·육식·잡식)로 흐르고, 마지막으로 죽은 물질을 분해해 영양분을 재순환하는 분해자로 갑니다. 한 방향으로 흐르는 에너지와 빙글 도는 영양분 — 이 둘의 차이가 핵심이에요.",
        keyIdea:
          "에너지는 한 방향으로 '흐른다'(태양 → 생산자 → 소비자), 영양분은 '순환한다'(분해자가 토양으로 되돌림).",
        table: {
          headers: ["영양 단계", "역할"],
          rows: [
            ["생산자 (Producers, 독립영양생물)", "광합성으로 에너지를 만듦 (식물·조류)"],
            ["1차 소비자 (Primary consumers)", "생산자를 먹는 초식동물"],
            ["2차·3차 소비자 (Secondary/tertiary consumers)", "다른 소비자를 먹는 육식동물"],
            ["분해자 (Decomposers)", "죽은 물질을 분해, 영양분 재순환"],
          ],
        },
        terms: [],
        traps: [],
        example: null,
      },
      {
        title: "먹이 사슬과 먹이 그물",
        subtitle: null,
        body:
          "먹이 사슬(food chain)은 에너지의 단일 경로예요 (풀 → 토끼 → 여우). 먹이 그물(food web)은 여러 겹치는 사슬이 얽힌 현실적 네트워크입니다. 그물이 사슬보다 안정한 이유는 — 한 종이 줄어도 다른 종이 빈자리를 메울 수 있기 때문이에요. 단일 경로는 한 고리만 끊겨도 무너지지만, 그물은 우회로가 있는 거죠.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "생물적/무생물적 (Biotic / abiotic)",
            def: "생태계의 살아있는 요인 vs 비생명 요인(햇빛·물·토양).",
          },
          {
            term: "먹이 그물 (Food web)",
            def: "먹이 관계가 얽힌 네트워크. 단일 사슬보다 안정적입니다.",
          },
          {
            term: "분해자 (Decomposer)",
            def: "죽은 물질을 분해하고 영양분을 재순환하는 생물.",
          },
        ],
        traps: [
          "에너지는 '흐르며' 열로 손실되고, 물질·영양분은 '순환'합니다. 에너지가 '재순환된다'고 말하면 안 돼요.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-environmental-science-u1-l2",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 1,
    lessonNum: 2,
    unitName: "The Living World: Ecosystems",
    title: "에너지 흐름과 10% 법칙",
    subtitle: "한 단계 에너지의 약 10분의 1만 다음 단계로 — 그래서 먹이 사슬이 짧습니다.",
    overview:
      "에너지는 영양 단계를 따라 위로 올라가지만, 매 단계에서 대부분이 손실돼요. 10% 법칙(10% rule)은 한 영양 단계에 저장된 에너지의 약 10%만 다음 단계로 전달되고, 나머지 ~90%는 대부분 대사를 통해 열로 손실된다는 법칙입니다. 이 단 하나의 법칙이 생태계의 '모양'을 설명해요. 왜 최상위 포식자가 드문지, 왜 먹이 사슬이 짧은지 — 전부 여기서 나옵니다.",
    objectives: [
      "10% 법칙을 진술하고 적용할 수 있다.",
      "영양 단계 사이에서 에너지가 손실되는 이유를 설명할 수 있다.",
      "먹이 사슬이 짧고 최상위 포식자가 드문 이유를 설명할 수 있다.",
    ],
    formulas: [],
    diagram: "energy-pyramid",
    sections: [
      {
        title: "10% 법칙",
        subtitle: null,
        body:
          "각 영양 단계에서 생물은 에너지 대부분을 사는 데(움직임·호흡·열) 써버려요. 그래서 다음 단계가 쓸 수 있는 생물량으로 저장되는 건 약 10%뿐입니다. 에너지 피라미드를 보면 이게 보여요 — 각 단계가 바로 아래 단계의 약 10분의 1이에요. 아래 도식의 피라미드가 위로 갈수록 급격히 좁아지는 게 바로 이 법칙입니다.",
        keyIdea:
          "각 단계에서 에너지의 ~90%가 열로 '손실'되고 ~10%만 위로 올라갑니다. 그래서 피라미드가 위로 갈수록 급격히 좁아져요.",
        table: null,
        terms: [
          {
            term: "10% 법칙 (10% rule)",
            def: "한 영양 단계 에너지의 ~10%만 다음 단계로 전달된다.",
          },
          {
            term: "생물량 (Biomass)",
            def: "한 영양 단계에 있는 살아있는 물질의 총 질량.",
          },
          {
            term: "에너지 피라미드 (Energy pyramid)",
            def: "영양 단계가 올라갈수록 에너지가 감소함을 보여주는 도식.",
          },
        ],
        traps: [],
        example: null,
      },
      {
        title: "왜 생태계의 모양을 결정하는가",
        subtitle: null,
        body:
          "에너지가 워낙 많이 손실되니, 많은 영양 단계를 떠받칠 에너지가 부족합니다 — 먹이 사슬이 4~5고리를 넘는 경우가 드물고 최상위 포식자가 적어요. 또 이 법칙은 왜 먹이 사슬 아래쪽(식물)을 먹는 게 고기를 먹는 것보다 더 많은 사람을 먹일 수 있는지도 설명합니다 — 에너지 낭비가 적으니까요.",
        keyIdea: null,
        table: null,
        terms: [],
        traps: [
          "~90% 손실은 대부분 호흡/대사에서 나오는 열입니다 — '분해자가 먹어서'가 아니에요.",
        ],
        example:
          "생산자가 에너지 10,000단위를 저장하면, 1차 소비자는 ~1,000, 2차는 ~100, 3차는 ~10을 얻어요. 몇 단계만 지나도 거의 남는 게 없으니 — 6번째 단계가 들어설 자리가 없습니다.",
      },
    ],
  },
];
