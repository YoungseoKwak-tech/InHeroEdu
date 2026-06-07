/**
 * Core Notes 한국어 스토리텔링 버전 — AP Environmental Science Unit 2 (2.1–2.3).
 * 원본 내용 전량 보존(overview·body·keyIdea·table·diagram 포함) + 일타강사 내러티브.
 * 용어는 "한국어 (English)" 병기.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const AP_ENV_U2A_KO: CoreNote[] = [
  {
    lessonId: "ap-environmental-science-u2-l1",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 2,
    lessonNum: 1,
    unitName: "The Living World: Biodiversity",
    title: "생물다양성 — 세 단계와 각각이 중요한 이유",
    subtitle: "생물다양성은 단순한 '종 수'가 아니에요 — 세 단계에서 작동하고, 다양성이 클수록 안정합니다.",
    overview:
      "생물다양성(biodiversity)은 생명의 다양함이고, 세 단계로 존재해요: 유전적·종·생태계. 핵심 아이디어: 생물다양성이 클수록 생태계가 더 회복력 있어진다 — 질병·교란·변화를 더 잘 견딘다는 거죠.",
    objectives: [
      "생물다양성의 세 단계를 식별할 수 있다.",
      "생물다양성이 회복력을 높이는 법을 설명할 수 있다.",
      "종 풍부도와 균등도를 정의할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "생물다양성의 세 단계",
        subtitle: null,
        body:
          "생물다양성은 세 개의 중첩된 규모에서 측정되고, 각각이 생존에 중요해요.",
        keyIdea:
          "유전적 다양성은 보험증서예요: 다양한 유전자 풀이 종을 질병과 변화에 적응하게 합니다.",
        table: {
          headers: ["단계", "무엇이 다양한가", "왜 중요한가"],
          rows: [
            ["유전적 (Genetic)", "한 종 안의 유전자 다양성", "변화·질병 적응의 원재료"],
            ["종 (Species)", "한 지역의 종 다양성", "더 많은 역할이 채워짐; 더 안정한 먹이 그물"],
            ["생태계 (Ecosystem)", "서식지·생태계의 다양성", "다양한 서비스와 조건의 범위"],
          ],
        },
        terms: [],
        traps: [],
        example: null,
      },
      {
        title: "다양성과 회복력",
        subtitle: null,
        body:
          "생물다양성이 높을수록 대체로 회복력 — 교란에서 회복하는 능력 — 이 높아요. 종 다양성은 두 부분으로 나뉩니다: 풍부도(종이 몇 개인가)와 균등도(개체수가 얼마나 고른가). 한 종이 지배하는 군집은 균형 잡힌 군집보다 덜 안정해요.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "종 풍부도 (Species richness)",
            def: "군집 안의 서로 다른 종의 수.",
          },
          {
            term: "종 균등도 (Species evenness)",
            def: "종들의 상대적 개체수가 얼마나 균형 잡혀 있는가.",
          },
          {
            term: "회복력 (Resilience)",
            def: "생태계가 교란에서 회복하는 능력.",
          },
        ],
        traps: [
          "생물다양성 ≠ 단순 종 수. 유전적·생태계 다양성도 중요하고, 풍부도와 함께 균등도도 중요해요.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-environmental-science-u2-l2",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 2,
    lessonNum: 2,
    unitName: "The Living World: Biodiversity",
    title: "진화와 자연선택, 생물다양성의 엔진",
    subtitle: "유전적 변이에 시간을 두고 작용하는 자연선택이 바로 생명의 다양성을 만들어냅니다.",
    overview:
      "생물다양성이 존재하는 건 자연선택에 의한 진화 덕분이에요. 유전적 변이가 생기고(돌연변이), 환경이 어떤 변이를 다른 것보다 선호하고(선택), 여러 세대에 걸쳐 개체군이 변하며 새로운 종이 형성됩니다. 이것이 생태계를 다양하고 적응한 생물로 채우는 엔진이에요.",
    objectives: [
      "자연선택과 그 요건을 설명할 수 있다.",
      "유전적 변이를 적응과 연결할 수 있다.",
      "선택이 생물다양성과 종분화를 이끄는 법을 설명할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "자연선택이 작동하는 법",
        subtitle: null,
        body:
          "자연선택에는 세 재료가 필요해요: 개체 간 변이(돌연변이와 유성생식에서), 유전성(형질이 자손에게 전달됨), 그리고 차등적 생존·번식(어떤 변이가 현재 환경에서 더 잘함). 세대를 거치며 유리한 형질이 더 흔해져요 — 적응입니다.",
        keyIdea:
          "선택은 변이를 '만들지' 않아요 — 돌연변이(mutation)가 만듭니다. 선택은 기존 변이를 환경으로 '걸러낼' 뿐이에요.",
        table: null,
        terms: [
          {
            term: "자연선택 (Natural selection)",
            def: "유전 형질에 근거한 차등적 생존과 번식.",
          },
          {
            term: "유전적 변이 (Genetic variation)",
            def: "개체군 안 유전자의 차이; 선택의 원재료.",
          },
          {
            term: "적응 (Adaptation)",
            def: "어떤 환경에서 생존·번식을 향상시키는 유전 형질.",
          },
        ],
        traps: [],
        example: null,
      },
      {
        title: "선택이 생물다양성을 쌓는다",
        subtitle: null,
        body:
          "개체군이 서로 다른 환경에 적응하면서 갈라지고, 마침내 새로운 종을 형성합니다(종분화). 환경이 다양할수록, 또 가용 유전적 변이가 많을수록 선택이 만들 수 있는 생물다양성이 커져요. 이는 또한 생물다양성 손실이 미래의 적응 잠재력을 제거한다는 뜻이기도 합니다.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "종분화 (Speciation)",
            def: "개체군이 갈라지며 새로운 종이 형성되는 것.",
          },
          {
            term: "돌연변이 (Mutation)",
            def: "DNA의 무작위 변화; 새로운 유전적 변이의 궁극적 원천.",
          },
        ],
        traps: [
          "개체는 평생 동안 '진화'하거나 적응하지 않아요 — 개체군이 세대에 걸쳐 진화합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-environmental-science-u2-l3",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 2,
    lessonNum: 3,
    unitName: "The Living World: Biodiversity",
    title: "섬 생물지리학 — 서식지 조각의 모델",
    subtitle: "섬의 크기와 거리가 거기 사는 종 수를 예측해요 — 그리고 같은 논리가 파편화된 서식지에도 적용됩니다.",
    overview:
      "섬 생물지리학 이론(island biogeography theory)은 왜 어떤 섬이 다른 섬보다 더 많은 종을 품는지 설명해요: 섬의 크기와 본토로부터의 거리가 정하는 이주와 멸종의 균형이죠. 결정적으로, 파편화된 서식지는 섬처럼 행동해서 이 이론이 핵심 보전 도구가 됩니다.",
    objectives: [
      "섬의 크기와 거리가 종 수에 미치는 영향을 설명할 수 있다.",
      "이주–멸종 균형을 기술할 수 있다.",
      "이 모델을 서식지 파편화에 적용할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "크기와 거리",
        subtitle: null,
        body:
          "두 요인이 섬의 종 수를 정해요. 큰 섬일수록 더 많은 종을 품습니다(서식지 많음, 멸종 적음). 본토에 가까운 섬일수록 더 많은 종을 얻어요(이주 쉬움). 그래서 종이 가장 풍부한 섬은 크고 가까운 섬이고, 가장 빈약한 섬은 작고 외딴 섬입니다.",
        keyIdea:
          "큼 + 가까움 = 종 최다; 작음 + 외딴 = 종 최소. 이주(거리)와 멸종(크기)의 균형이에요.",
        table: {
          headers: ["요인", "종이 더 많아질 때…"],
          rows: [
            ["섬 크기 (Island size)", "더 큼 (서식지 많음, 멸종 적음)"],
            ["본토까지 거리 (Distance to mainland)", "더 가까움 (이주 많음)"],
          ],
        },
        terms: [],
        traps: [],
        example: null,
      },
      {
        title: "보전에 중요한 이유",
        subtitle: null,
        body:
          "서식지 파편화는 연속된 서식지를 개발에 둘러싸인 녹색 '섬'들로 바꿔요. 더 작고 더 고립된 조각은 종을 잃습니다 — 그래서 보전가들이 회랑으로 연결된 큰 보호구역을 선호하는 거예요. 이 이론이 추상적 수학을 실제 보호구역 설계로 바꿉니다.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "섬 생물지리학 (Island biogeography)",
            def: "섬의 크기와 고립도로 종 수를 예측하는 이론.",
          },
          {
            term: "서식지 파편화 (Habitat fragmentation)",
            def: "연속된 서식지를 고립된 조각들로 쪼개 생물다양성을 낮추는 것.",
          },
        ],
        traps: [
          "이 모델은 실제 바다 섬뿐 아니라 '어떤' 고립된 서식지 조각(숲 파편, 공원)에도 적용돼요.",
        ],
        example: null,
      },
    ],
  },
];
