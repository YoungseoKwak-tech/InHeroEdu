/**
 * Core Notes 한국어 스토리텔링 버전 — AP Environmental Science Unit 4 (4.4–4.6).
 * 원본 내용 전량 보존(overview·body·keyIdea·table·diagram 포함) + 일타강사 내러티브.
 * 용어는 "한국어 (English)" 병기.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const AP_ENV_U4B_KO: CoreNote[] = [
  {
    lessonId: "ap-environmental-science-u4-l4",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 4,
    lessonNum: 4,
    unitName: "Earth Systems and Resources",
    title: "태양 복사, 알베도, 그리고 지구 에너지 수지",
    subtitle: "태양이 모든 걸 움직여요 — 지구가 얼마나 간직하고 얼마나 반사하느냐가 기후를 정합니다.",
    overview:
      "지구 에너지의 거의 전부가 태양에서 와요. 행성 온도는 에너지 수지에 달려 있습니다: 들어오는 태양 복사 vs 반사·재복사되어 우주로 돌아가는 에너지. 알베도(표면 반사율)가 핵심 조절 인자이고, 강력한 되먹임 고리를 만들어요.",
    objectives: [
      "지구 에너지 수지를 설명할 수 있다.",
      "알베도를 정의하고 높음/낮음 예를 들 수 있다.",
      "얼음-알베도 되먹임 고리를 기술할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "들어오는 에너지 vs 나가는 에너지",
        subtitle: null,
        body:
          "지구는 들어오는 태양 에너지가 나가는 에너지와 같을 때 대략 안정해요. 햇빛 일부는 반사되고(구름·얼음·밝은 표면), 일부는 흡수되어 열로 재복사됩니다. 온실가스가 나가는 열 일부를 가둬 행성을 데워요 — 자연 온실 효과입니다.",
        keyIdea:
          "기후는 에너지 '균형'이에요: 얼마나 반사되거나 갇히는지를 바꾸면 온도가 이동합니다.",
        table: null,
        terms: [
          {
            term: "에너지 수지 (Energy budget)",
            def: "들어오는 태양 vs 나가는 반사·복사 에너지의 균형.",
          },
          {
            term: "알베도 (Albedo)",
            def: "표면의 반사율; 얼음/눈은 높고 어두운 땅/바다는 낮음.",
          },
        ],
        traps: [],
        example: null,
      },
      {
        title: "알베도와 되먹임",
        subtitle: null,
        body:
          "밝은 표면(얼음·눈·구름)은 알베도가 '높아' 햇빛을 반사하고 행성을 식혀요. 어두운 표면(바다·숲·아스팔트)은 알베도가 '낮아' 흡수하고 데웁니다. 이것이 얼음-알베도 되먹임을 일으켜요: 온난화가 반사성 얼음을 녹여 어두운 바다를 드러내고, 바다가 더 많은 열을 흡수해 더 많은 녹음을 부르는 — 양(증폭)의 되먹임 고리입니다.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "얼음-알베도 되먹임 (Ice-albedo feedback)",
            def: "녹는 얼음이 어두운 표면을 드러내 더 많은 열을 흡수하게 해 온난화를 가속함.",
          },
          {
            term: "양의 되먹임 고리 (Positive feedback loop)",
            def: "스스로 증폭하는 순환(어떤 변화가 같은 변화를 더 일으킴).",
          },
        ],
        traps: [
          "높은 알베도 = 반사/냉각(얼음); 낮은 알베도 = 흡수/온난화(바다). 얼음-알베도 고리는 '양'(증폭)입니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-environmental-science-u4-l5",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 4,
    lessonNum: 5,
    unitName: "Earth Systems and Resources",
    title: "전 지구 바람 패턴과 해류",
    subtitle: "불균등한 가열에 지구 자전이 더해져, 행성 전체로 열을 옮기는 바람과 해류가 만들어집니다.",
    overview:
      "적도는 극지방보다 더 직접적인 햇빛을 받고, 그 불균등한 가열이 — 지구 자전(코리올리 효과)과 결합해 — 전 지구 바람 패턴과 해류를 일으켜요. 둘이 함께 열을 재분배하고 전 세계 기후를 형성합니다.",
    objectives: [
      "불균등한 가열이 순환을 일으키는 법을 설명할 수 있다.",
      "코리올리 효과와 대류 세포를 기술할 수 있다.",
      "해류가 열을 재분배하는 법을 설명할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "대류와 코리올리 효과",
        subtitle: null,
        body:
          "적도의 강한 가열이 따뜻한 공기를 상승시켜, 공기를 극지방으로 보냈다가 되돌리는 대류 세포(해들리 세포 같은)를 만들어요. 지구 자전이 이 움직이는 공기를 코리올리 효과로 편향시켜, 탁월풍대(무역풍·편서풍)를 만듭니다.",
        keyIdea:
          "불균등한 가열(적도 vs 극) + 지구 자전(코리올리) = 전 지구 바람과 해류 패턴.",
        table: null,
        terms: [
          {
            term: "대류 세포 (Convection cell)",
            def: "따뜻한 공기 상승과 차가운 공기 하강의 고리(예: 해들리 세포).",
          },
          {
            term: "코리올리 효과 (Coriolis effect)",
            def: "지구 자전 때문에 움직이는 공기/물이 편향되는 것.",
          },
        ],
        traps: [],
        example: null,
      },
      {
        title: "해류가 열을 옮긴다",
        subtitle: null,
        body:
          "바람이 표층 해류를 움직여 적도의 따뜻한 물을 극지방으로, 찬 물을 되돌려 보내요(예: 멕시코 만류가 유럽을 데움). 이 전 지구 컨베이어가 엄청난 양의 열을 재분배해, 연안 기후를 누그러뜨리고 강수 패턴을 좌우합니다.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "해류 (Ocean currents)",
            def: "전 지구로 열을 재분배하는 대규모 물 이동.",
          },
          {
            term: "용승 (Upwelling)",
            def: "바람이 일으키는 차갑고 영양분 풍부한 심층수의 상승; 풍요로운 어장을 떠받침.",
          },
        ],
        traps: [
          "용승은 '영양분'을 표면으로 가져와 생산적인 어장을 키워요 — 엘니뇨 때 교란됩니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-environmental-science-u4-l6",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 4,
    lessonNum: 6,
    unitName: "Earth Systems and Resources",
    title: "엘니뇨/라니냐와 기후 변동성",
    subtitle: "태평양 바람과 해류의 주기적 변화가 전 세계 날씨를 뒤섞어 놓습니다.",
    overview:
      "엘니뇨와 라니냐(ENSO 주기)는 태평양 해수 온도와 바람의 주기적 변화로, 정상 패턴을 교란해 태평양을 넘어 멀리까지 가뭄·홍수·어장 붕괴를 일으켜요. 이건 자연적 기후 변동성으로, 장기 기후 변화와는 구별됩니다.",
    objectives: [
      "엘니뇨와 라니냐 조건을 기술할 수 있다.",
      "날씨와 어장에 미치는 영향을 설명할 수 있다.",
      "ENSO를 장기 기후 변화와 구별할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "엘니뇨 vs 라니냐",
        subtitle: null,
        body:
          "평소엔 무역풍이 따뜻한 물을 태평양 서쪽으로 밀어, 남아메리카 앞바다에서 차갑고 영양분 풍부한 용승이 일어나요. 엘니뇨 때는 이 바람이 약해져 따뜻한 물이 동쪽으로 되밀리고 용승이 멈춰 — 어장이 붕괴하고 전 세계 강수가 이동합니다. 라니냐는 강화된 반대 현상이에요.",
        keyIdea:
          "엘니뇨는 남아메리카 앞바다의 영양분 용승을 멈춰 → 어장 붕괴와 전 세계 날씨 교란.",
        table: {
          headers: ["국면", "태평양 조건", "영향"],
          rows: [
            ["엘니뇨 (El Niño)", "약한 무역풍; 따뜻한 물 동쪽", "용승 감소, 어장 쇠퇴, 전 세계 날씨 변동"],
            ["라니냐 (La Niña)", "강한 무역풍; 찬 물 동쪽", "강한 용승; 반대 방향 날씨 변동"],
          ],
        },
        terms: [],
        traps: [],
        example: null,
      },
      {
        title: "변동성 vs 변화",
        subtitle: null,
        body:
          "ENSO는 자연적·단기 변동성이에요 — 몇 년마다의 주기 — 이지, 인간이 일으킨 장기 기후 변화와는 다릅니다. 시험은 둘을 구별하기를 원해요. 다만 기후 변화가 ENSO의 강도에 영향을 줄 수는 있습니다.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "엘니뇨 / ENSO (El Niño / ENSO)",
            def: "용승과 전 세계 날씨를 교란하는 주기적 태평양 온난화.",
          },
          {
            term: "기후 변동성 vs 변화 (Climate variability vs. change)",
            def: "단기 자연 주기(ENSO) vs 장기 인간 주도 온난화.",
          },
        ],
        traps: [
          "엘니뇨/라니냐는 자연적·주기적 '변동성'이에요 — 장기·인간 유발 기후 '변화'와 혼동하지 마세요.",
        ],
        example: null,
      },
    ],
  },
];
