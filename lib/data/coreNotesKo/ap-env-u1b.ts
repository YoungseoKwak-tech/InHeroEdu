/**
 * Core Notes 한국어 스토리텔링 버전 — AP Environmental Science Unit 1 (1.3–1.5).
 * 원본 내용 전량 보존(overview·body·keyIdea·table·diagram 포함) + 일타강사 내러티브.
 * 용어는 "한국어 (English)" 병기.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const AP_ENV_U1B_KO: CoreNote[] = [
  {
    lessonId: "ap-environmental-science-u1-l3",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 1,
    lessonNum: 3,
    unitName: "The Living World: Ecosystems",
    title: "생지화학 순환 — 탄소·질소·인·물",
    subtitle: "물질은 생기지도 사라지지도 않아요 — 생물과 환경 사이를 끝없이 순환합니다.",
    overview:
      "에너지는 흘러가서 손실되지만, 물질은 순환합니다. 생지화학 순환(biogeochemical cycle)은 핵심 원소 — 탄소·질소·인 — 와 물을 생물·대기·물·암석 사이로 이동시켜요. 그리고 인간 활동이 이 순환들을 하나하나 교란해 왔습니다. 어느 원소가 기체 단계를 갖고 어느 게 안 갖는지가 시험의 단골 구별 포인트예요.",
    objectives: [
      "탄소·질소·인·물 순환을 기술할 수 있다.",
      "각 순환의 저장소와 흐름을 식별할 수 있다.",
      "인간이 이 순환들을 어떻게 바꾸는지 설명할 수 있다.",
    ],
    formulas: [],
    diagram: "carbon-cycle",
    sections: [
      {
        title: "주요 순환들",
        subtitle: null,
        body:
          "각 순환은 원소를 저장소(저장 장소) 사이로 옮깁니다. 각 순환의 기본과 '인간이 어떻게 교란하는가'를 알아두세요. 아래 표가 핵심 — 그리고 위 탄소 순환 도식이 광합성↔호흡의 교환을 보여줍니다.",
        keyIdea:
          "탄소와 질소는 대기(기체) 단계가 있지만, 인(phosphorus)은 없어요 — 인은 암석에서 와서 느리게 움직입니다.",
        table: {
          headers: ["순환", "핵심 개념", "인간의 교란"],
          rows: [
            ["탄소 (Carbon)", "광합성 ↔ 호흡; 화석 연료에 저장", "화석 연료 연소 → CO₂ ↑ (온난화)"],
            ["질소 (Nitrogen)", "고정으로 N을 사용 가능하게; 세균 필요", "비료가 과잉 N 추가 → 죽음의 구역"],
            ["인 (Phosphorus)", "기체 단계 없음; 암석에서; 성장 제한", "채굴/비료 → 유출, 조류 대증식"],
            ["물 (Water)", "증발·응결·강수", "댐 건설, 지하수 고갈, 포장"],
          ],
        },
        terms: [],
        traps: [],
        example: null,
      },
      {
        title: "교란이 중요한 이유",
        subtitle: null,
        body:
          "인간은 이 순환들을 과부하시켰어요: 여분의 탄소가 기후 변화를 일으키고, 비료에서 나온 과잉 질소·인이 물로 흘러들어 부영양화(eutrophication, 산소를 고갈시켜 죽음의 구역을 만드는 조류 대증식)를 일으킵니다. 세균에 의한 질소 고정(nitrogen fixation)이 대기 중 N을 식물이 쓸 수 있게 만드는 핵심 단계예요.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "저장소 (Reservoir)",
            def: "원소가 대량으로 저장되는 장소 (예: 화석 연료가 탄소를 저장).",
          },
          {
            term: "질소 고정 (Nitrogen fixation)",
            def: "세균이 대기 중 N₂를 식물이 쓸 수 있는 형태로 변환하는 것.",
          },
          {
            term: "부영양화 (Eutrophication)",
            def: "영양분(N, P) 과부하가 조류 대증식과 산소 고갈 죽음의 구역을 일으키는 것.",
          },
        ],
        traps: [
          "인(phosphorus)은 대기/기체 단계가 '없어요' — 탄소·질소와 구별하는 시험 단골 포인트입니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-environmental-science-u1-l4",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 1,
    lessonNum: 4,
    unitName: "The Living World: Ecosystems",
    title: "육상 생물군계 — 기후가 구조를 결정한다",
    subtitle: "온도와 강수량, 이 두 다이얼이 어떤 생물군계가 될지 정합니다.",
    overview:
      "생물군계(biome)는 기후와 거기 적응한 동식물 군집으로 정의되는 큰 지역이에요. 핵심 아이디어: 두 무생물 요인 — 온도와 강수량 — 이 사막부터 열대우림까지 어디에 어떤 생물군계가 생길지를 거의 다 결정합니다. 나머지는 전부 기후에서 따라 나와요.",
    objectives: [
      "생물군계를 정의하고 무엇이 생물군계 유형을 결정하는지 설명할 수 있다.",
      "주요 육상 생물군계와 그 기후를 식별할 수 있다.",
      "기후를 동식물의 적응과 연결할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "기후가 생물군계를 정한다",
        subtitle: null,
        body:
          "온도 대 강수량을 그래프로 찍으면 생물군계를 예측할 수 있어요. 덥고 습하면 열대우림, 덥고 건조하면 사막, 추우면 툰드라. 그러면 생물이 그 조건에 적응합니다 (예: 사막 식물은 물을 저장하고, 툰드라 식물은 낮게 자라요).",
        keyIdea:
          "두 다이얼 — 온도(temperature)와 강수량(precipitation) — 이 생물군계를 정합니다. 나머지는 전부 기후에서 따라 나와요.",
        table: {
          headers: ["생물군계", "기후"],
          rows: [
            ["열대우림 (Tropical rainforest)", "덥고 매우 습함 — 최고 생물다양성"],
            ["사막 (Desert)", "덥거나 추움, 매우 건조"],
            ["초원/사바나 (Grassland/savanna)", "계절성 강우, 불에 적응"],
            ["온대림 (Temperate forest)", "온화한 온도, 사계절"],
            ["타이가/북방림 (Taiga, boreal forest)", "추움, 침엽수"],
            ["툰드라 (Tundra)", "가장 추움, 영구동토, 나무 없음"],
          ],
        },
        terms: [],
        traps: [],
        example: null,
      },
      {
        title: "적응과 생산성",
        subtitle: null,
        body:
          "따뜻하고 습한 생물군계(열대우림)는 순1차생산성과 생물다양성이 가장 높고, 춥거나 건조한 생물군계(툰드라·사막)는 가장 낮아요. 생물은 자기 생물군계에 뚜렷이 적응합니다 — 툰드라의 두꺼운 털, 사막의 깊은 뿌리처럼요.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "생물군계 (Biome)",
            def: "기후와 그 특징적 군집으로 정의되는 큰 지역.",
          },
          {
            term: "영구동토 (Permafrost)",
            def: "툰드라의 특징인, 영구적으로 얼어 있는 땅.",
          },
          {
            term: "순1차생산성 (Net primary productivity, NPP)",
            def: "생산자가 저장해 사용 가능하게 만드는 에너지; 열대우림에서 가장 높음.",
          },
        ],
        traps: [
          "기후가 생물군계를 결정하지 그 반대가 아니에요. 위도/고도가 중요한 건 온도와 강우량에 영향을 주기 때문입니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-environmental-science-u1-l5",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 1,
    lessonNum: 5,
    unitName: "The Living World: Ecosystems",
    title: "수생 생물군계와 구역",
    subtitle: "바닷물이냐 민물이냐, 그리고 빛이 얼마나 깊이 닿느냐 — 그게 물속 생명을 구조화합니다.",
    overview:
      "수생 생물군계는 먼저 염도(민물 vs 해양)로 나뉘고, 그다음 깊이와 빛에 따른 구역으로 나뉩니다. 햇빛이 닿을 수 있는 곳이 광합성 — 따라서 대부분의 생명 — 이 일어날 수 있는 곳을 결정해요.",
    objectives: [
      "민물 생물군계와 해양 생물군계를 구별할 수 있다.",
      "빛과 깊이로 수생 구역을 설명할 수 있다.",
      "생산성이 높은 수생 지역을 식별할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "염도와 빛 구역",
        subtitle: null,
        body:
          "첫 번째 갈림은 염도예요: 민물(호수·강·습지) vs 해양(바다·하구·산호초). 수체 안에서, 진광대(photic zone)는 빛이 침투해 광합성이 일어나는 곳이고, 그 아래 무광대(aphotic zone)는 어둡습니다.",
        keyIdea:
          "하구(estuary)와 산호초(coral reef)는 가장 생산적·생물다양성 높은 수생 시스템 중 하나 — 그리고 가장 취약하기도 합니다.",
        table: {
          headers: ["구역 / 지역", "특징"],
          rows: [
            ["진광대 (Photic zone)", "햇빛 듦; 광합성이 여기서 일어남"],
            ["무광대 (Aphotic zone)", "어둡고 깊음; 광합성 없음"],
            ["하구 (Estuary)", "강이 바다와 만나는 곳 — 매우 생산적인 보육장"],
            ["산호초 (Coral reef)", "높은 생물다양성; 온도/pH에 민감"],
          ],
        },
        terms: [],
        traps: [],
        example: null,
      },
      {
        title: "생산성이 다른 이유",
        subtitle: null,
        body:
          "생산성은 빛과 영양분이 둘 다 있는 곳에서 가장 높아요 — 얕은 연안, 하구, 산호초. 광활한 심해는 넓지만 상대적으로 생산성이 낮습니다('해양 사막') — 영양분이 햇빛 드는 표면에서 가라앉아 멀어지기 때문이에요.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "진광대 (Photic zone)",
            def: "광합성이 일어나는, 햇빛 드는 상층 수역.",
          },
          {
            term: "하구 (Estuary)",
            def: "민물과 바닷물이 섞이는 영양분 풍부한 구역; 핵심 보육 서식지.",
          },
        ],
        traps: [
          "외해는 거대하지만 면적당 생산성은 '낮아요' — 연안/하구 구역이 생산성 핫스폿입니다.",
        ],
        example: null,
      },
    ],
  },
];
