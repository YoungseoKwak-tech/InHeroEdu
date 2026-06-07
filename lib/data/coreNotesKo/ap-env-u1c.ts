/**
 * Core Notes 한국어 스토리텔링 버전 — AP Environmental Science Unit 1 (1.6–1.8, Unit 1 완결).
 * 원본 내용 전량 보존(overview·body·keyIdea·table·diagram 포함) + 일타강사 내러티브.
 * 용어는 "한국어 (English)" 병기.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const AP_ENV_U1C_KO: CoreNote[] = [
  {
    lessonId: "ap-environmental-science-u1-l6",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 1,
    lessonNum: 6,
    unitName: "The Living World: Ecosystems",
    title: "생태적 지위와 종 상호작용",
    subtitle: "모든 종에는 '직업'이 있고, 그 직업들이 어떻게 겹치느냐가 경쟁·포식·동반 관계를 만듭니다.",
    overview:
      "지위(niche)는 한 종의 생태계 속 역할이에요 — 무엇을 먹고, 어디 살고, 어떻게 상호작용하는지. 지위가 어떻게 겹치는지가 종 상호작용을 빚어냅니다: 경쟁, 포식, 그리고 세 종류의 공생. 이 상호작용들이 군집을 구조화해요. 핵심은 '주소(서식지)'와 '직업(지위)'을 헷갈리지 않는 거예요.",
    objectives: [
      "한 종의 지위를 서식지와 구별할 수 있다.",
      "경쟁과 경쟁 배타 원리를 설명할 수 있다.",
      "공생 관계를 분류할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "지위 vs 서식지, 그리고 경쟁",
        subtitle: null,
        body:
          "서식지(habitat)는 주소(종이 사는 곳)이고, 지위(niche)는 직업(역할과 자원 사용)이에요. 두 종이 같은 한정된 자원을 필요로 하면, 경쟁 배타 원리(competitive exclusion principle)에 따라 무한정 공존할 수 없어요 — 하나가 다른 하나를 이기거나, 자원을 나눠 씁니다(자원 분할).",
        keyIdea:
          "서식지 = 주소, 지위 = 직업. 지위가 똑같은 두 종은 공존할 수 없어요(경쟁 배타).",
        table: null,
        terms: [
          {
            term: "지위 (Niche)",
            def: "한 종의 역할: 무엇을, 어디서 먹고, 어떻게 상호작용하는지.",
          },
          {
            term: "경쟁 배타 (Competitive exclusion)",
            def: "같은 지위를 가진 두 종은 무한정 공존할 수 없다.",
          },
          {
            term: "자원 분할 (Resource partitioning)",
            def: "종들이 자원을 나눠 경쟁을 줄이고 공존하는 것.",
          },
        ],
        traps: [],
        example: null,
      },
      {
        title: "공생",
        subtitle: null,
        body:
          "공생(symbiosis)은 종 사이의 긴밀하고 장기적인 상호작용이에요. 세 유형은 '누가 이득을 보느냐'로 갈립니다.",
        keyIdea:
          "상리공생 = +/+, 편리공생 = +/0, 기생 = +/−. 포식은 달라요: 장기 관계가 아니라 빠른 사냥입니다.",
        table: {
          headers: ["유형", "종 A", "종 B"],
          rows: [
            ["상리공생 (Mutualism)", "이득 (+)", "이득 (+)"],
            ["편리공생 (Commensalism)", "이득 (+)", "영향 없음 (0)"],
            ["기생 (Parasitism)", "이득 (+)", "피해 (−)"],
          ],
        },
        terms: [],
        traps: [
          "핵심종(keystone species)은 개체수에 비해 생태계에 막대한 영향을 줘요 — 제거하면 군집이 붕괴합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-environmental-science-u1-l7",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 1,
    lessonNum: 7,
    unitName: "The Living World: Ecosystems",
    title: "생태계 서비스 — 자연이 제공하는 것",
    subtitle: "건강한 생태계는 인간을 위해 어마어마한 일을 공짜로 해줘요 — 우리가 망가뜨려 비용을 치르기 전까지는.",
    overview:
      "생태계 서비스(ecosystem services)는 인간이 자연에서 얻는 혜택으로, 흔히 공짜예요: 깨끗한 물, 수분(꽃가루받이), 기후 조절 등. 이걸 범주로 나누고 — 경제적 가치를 인식하면 — 왜 보전이 곧 '자기 이익'이기도 한지 설명됩니다.",
    objectives: [
      "생태계 서비스와 그 네 범주를 정의할 수 있다.",
      "각 범주의 예를 들 수 있다.",
      "생태계 서비스가 경제적 가치를 갖는 이유를 설명할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "서비스의 네 범주",
        subtitle: null,
        body:
          "생태계 서비스는 보통 네 유형으로 묶여요. 각 범주의 예를 하나씩 알면 시험에는 충분합니다.",
        keyIdea:
          "자연은 수조 달러어치의 '공짜' 일을 해줘요 — 수분, 물 정화, 홍수 조절 — 인공으로 대체하면 비용이 큽니다.",
        table: {
          headers: ["범주", "예시"],
          rows: [
            ["공급 (Provisioning)", "식량, 물, 목재, 의약품"],
            ["조절 (Regulating)", "기후 조절, 물 여과, 수분(꽃가루받이)"],
            ["지지 (Supporting)", "영양분 순환, 토양 형성, 광합성"],
            ["문화 (Cultural)", "여가, 아름다움, 정신적 가치"],
          ],
        },
        terms: [],
        traps: [],
        example: null,
      },
      {
        title: "경제적으로 중요한 이유",
        subtitle: null,
        body:
          "생태계가 훼손되면 이 공짜 서비스들이 작동을 멈춰, 인간이 대체 비용을 치러야 해요 — 습지를 잃으면 정수 처리장을 짓고, 벌이 줄면 작물을 손으로 수분해야 하죠. 생태계 서비스를 가치 평가하면, 보전이 단순한 환경 문제가 아니라 '현명한 경제적 선택'으로 재해석됩니다.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "생태계 서비스 (Ecosystem services)",
            def: "기능하는 생태계로부터 인간이 받는 혜택.",
          },
          {
            term: "공급 vs 조절 (Provisioning vs. regulating)",
            def: "자연이 제공하는 재화(식량·물) vs 자연이 조절하는 과정(기후·수분).",
          },
        ],
        traps: [
          "지지(supporting) 서비스(영양분 순환·토양 형성)를 잊지 마세요 — 나머지 모든 것을 가능하게 하는 토대입니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-environmental-science-u1-l8",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 1,
    lessonNum: 8,
    unitName: "The Living World: Ecosystems",
    title: "1차·2차 생산성 계산",
    subtitle: "생태계가 얼마나 많은 에너지를 붙잡아 저장하는지 — 그리고 시험이 원하는 공식.",
    overview:
      "생산성(productivity)은 생태계가 얼마나 많은 에너지를 붙잡아 사용 가능하게 만드는지를 잽니다. 핵심 구별 — 그리고 단골 FRQ — 은 총1차생산성과 순1차생산성의 차이예요. 공식 GPP − 호흡 = NPP 하나면 이 레슨은 끝입니다.",
    objectives: [
      "GPP, NPP, 그리고 둘의 관계를 정의할 수 있다.",
      "GPP와 호흡에서 NPP를 계산할 수 있다.",
      "생태계 간 생산성을 비교할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "GPP, NPP, 그리고 호흡",
        subtitle: null,
        body:
          "총1차생산성(GPP)은 생산자가 광합성으로 붙잡는 총 에너지예요. 그런데 식물은 그중 일부를 그저 살아가는 데(호흡) 씁니다. 남은 것 — 생물량으로 저장되어 소비자가 쓸 수 있는 것 — 이 순1차생산성(NPP)이에요.",
        keyIdea:
          "NPP = GPP − 호흡. NPP가 다음 영양 단계에 '실제로 사용 가능한' 에너지입니다.",
        table: null,
        terms: [
          {
            term: "총1차생산성 (Gross primary productivity, GPP)",
            def: "생산자가 광합성으로 붙잡는 총 에너지.",
          },
          {
            term: "순1차생산성 (Net primary productivity, NPP)",
            def: "호흡 후 저장된 에너지; 소비자가 쓸 수 있음 (GPP − R).",
          },
          {
            term: "호흡 (Respiration)",
            def: "생산자가 자기 생명 활동에 쓰는 에너지.",
          },
        ],
        traps: [],
        example: null,
      },
      {
        title: "계산과 비교",
        subtitle: null,
        body:
          "한 생태계의 GPP가 1,000 kcal/m²/yr이고 호흡이 400이면, NPP = 1,000 − 400 = 600 kcal/m²/yr. 생산성은 열대우림과 하구/습지에서 가장 높고, 사막과 외해(면적당)에서 가장 낮아요.",
        keyIdea: null,
        table: null,
        terms: [],
        traps: [
          "단위를 조심하세요(예: kcal/m²/yr). 그리고 소비자가 쓸 수 있는 에너지는 GPP가 아니라 NPP임을 기억하세요.",
        ],
        example:
          "GPP = 20,000 kcal/m²/yr, 식물 호흡 = 12,000. NPP = 20,000 − 12,000 = 8,000 kcal/m²/yr. 그 8,000이 초식동물이 실제로 먹을 수 있는 양입니다.",
      },
    ],
  },
];
