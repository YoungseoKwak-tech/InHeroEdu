/**
 * Core Notes 한국어 스토리텔링 버전 — AP Environmental Science Unit 3 (3.1–3.3).
 * 원본 내용 전량 보존(overview·body·keyIdea·table·diagram 포함) + 일타강사 내러티브.
 * 용어는 "한국어 (English)" 병기.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const AP_ENV_U3A_KO: CoreNote[] = [
  {
    lessonId: "ap-environmental-science-u3-l1",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 3,
    lessonNum: 1,
    unitName: "Populations",
    title: "개체군 동태 — 성장 모델",
    subtitle: "개체군은 폭발적으로 자라거나(J-곡선), 환경의 한계에서 평평해져요(S-곡선).",
    overview:
      "개체군은 출생·사망·이주로 변해요. 이를 포착하는 두 모델: 지수 성장(J-곡선, 무제한)과 로지스틱 성장(환경수용력에서 평평해지는 S-곡선)이죠. 어느 게 적용되는지 — 그리고 무엇이 성장을 제한하는지 — 파악하는 게 이 단원의 핵심입니다.",
    objectives: [
      "지수 성장과 로지스틱 성장을 비교할 수 있다.",
      "환경수용력과 제한 요인을 정의할 수 있다.",
      "밀도 의존 요인과 밀도 독립 요인을 구별할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "두 성장 모델",
        subtitle: null,
        body:
          "지수 성장(J-곡선)은 자원이 무제한일 때 일어나요 — 개체군이 폭발합니다. 현실에서는 자원이 부족해지므로 성장이 느려지고 환경수용력(K)에서 평평해져, S자 모양의 로지스틱 곡선을 만들어요.",
        keyIdea:
          "지수 = J-곡선(무제한). 로지스틱 = 환경수용력(K)에서 평평해지는 S-곡선. 현실은 보통 로지스틱이에요.",
        table: {
          headers: ["모델", "모양", "언제"],
          rows: [
            ["지수 (Exponential)", "J-곡선", "무제한 자원 (드묾, 일시적)"],
            ["로지스틱 (Logistic)", "S-곡선", "성장이 환경수용력(K)으로 느려짐"],
          ],
        },
        terms: [
          {
            term: "환경수용력 (Carrying capacity, K)",
            def: "환경이 장기적으로 지탱할 수 있는 최대 개체군.",
          },
          {
            term: "지수 vs 로지스틱 성장 (Exponential vs. logistic growth)",
            def: "무제한 J-곡선 vs 자원 제한 S-곡선.",
          },
        ],
        traps: [],
        example: null,
      },
      {
        title: "무엇이 성장을 제한하는가",
        subtitle: null,
        body:
          "제한 요인이 개체군을 K 근처에 묶어둬요. 밀도 의존 요인은 개체군이 커질수록 강해지고(질병·경쟁·포식), 밀도 독립 요인은 크기와 무관하게 닥칩니다(자연재해·날씨). K를 초과한 개체군은 종종 붕괴해요(대량 사멸).",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "밀도 의존 요인 (Density-dependent factor)",
            def: "개체군 밀도가 오를수록 강해지는 제한(질병·경쟁).",
          },
          {
            term: "밀도 독립 요인 (Density-independent factor)",
            def: "밀도와 무관하게 작용하는 제한(폭풍·화재·가뭄).",
          },
        ],
        traps: [
          "밀도 '의존' 효과는 밀집과 함께 커지고(질병), 밀도 '독립'(허리케인)은 어떤 크기의 개체군이든 똑같이 닥쳐요.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-environmental-science-u3-l2",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 3,
    lessonNum: 2,
    unitName: "Populations",
    title: "개체군 밀도와 분포 패턴",
    subtitle: "얼마나 많으냐만이 아니라 — 얼마나 밀집했고, 어떻게 퍼져 있느냐예요.",
    overview:
      "단순한 숫자를 넘어, 생태학자는 개체군을 밀도(면적당 몇 개체)와 분산(개체가 어떻게 퍼져 있나)으로 기술해요. 이 패턴들이 생물이 자원·서로와 어떻게 상호작용하는지를 드러냅니다.",
    objectives: [
      "개체군 밀도를 정의할 수 있다.",
      "세 가지 분산 패턴을 비교할 수 있다.",
      "각 패턴의 원인을 설명할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "밀도와 분산",
        subtitle: null,
        body:
          "개체군 밀도(population density)는 단위 면적당 개체 수예요. 분산(dispersion)은 그들의 공간 배열을 기술하고 — 패턴이 자원과 행동에 대해 알려줍니다.",
        keyIdea:
          "집중형이 자연에서 '가장 흔해요' — 자원과 짝이 군데군데 있어서 생물이 뭉칩니다.",
        table: {
          headers: ["분산", "패턴", "원인"],
          rows: [
            ["집중형 (Clumped)", "무리/군집 (가장 흔함)", "군데군데 자원; 사회적 무리"],
            ["균일형 (Uniform)", "고르게 간격", "세력권/경쟁"],
            ["무작위형 (Random)", "패턴 없음 (드묾)", "자원이 고르게 있고 상호작용 없음"],
          ],
        },
        terms: [],
        traps: [],
        example: null,
      },
      {
        title: "패턴이 중요한 이유",
        subtitle: null,
        body:
          "분산은 생태를 드러내요: 균일한 간격은 보통 경쟁이나 세력권을 시사하고(예: 둥지 트는 새), 집중은 군데군데 자원이나 무리/사회적 행동을 시사합니다. 밀도는 밀도 의존 요인(질병 같은)이 얼마나 강하게 작용하는지에 영향을 줘요.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "개체군 밀도 (Population density)",
            def: "단위 면적이나 부피당 개체 수.",
          },
          {
            term: "분산 (Dispersion)",
            def: "개체의 공간 패턴: 집중형·균일형·무작위형.",
          },
        ],
        traps: [
          "균일형 분산은 보통 경쟁/세력권을 뜻하고; 집중형은 군데군데 자원이나 사회적 무리를 뜻해요.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-environmental-science-u3-l3",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 3,
    lessonNum: 3,
    unitName: "Populations",
    title: "연령 구조도 — 미래 예측하기",
    subtitle: "개체군 연령 피라미드의 모양이 그 개체군이 성장할지, 유지할지, 줄어들지 알려줍니다.",
    overview:
      "연령 구조도(age structure diagram, 인구 피라미드)는 개체군의 각 연령 집단 비율을 성별로 보여줘요. 그 모양이 미래 성장을 예측합니다: 넓은 밑변은 젊은 사람이 많아 빠른 성장이 다가옴을, 좁은 밑변은 줄어드는 개체군을 뜻해요.",
    objectives: [
      "연령 구조도를 읽을 수 있다.",
      "피라미드 모양을 미래 성장과 연결할 수 있다.",
      "인구 관성을 설명할 수 있다.",
    ],
    formulas: [],
    diagram: "population-pyramid",
    sections: [
      {
        title: "모양이 성장을 예측한다",
        subtitle: null,
        body:
          "각 막대의 너비가 그 연령 집단에 몇 명이 있는지를 보여줘요. 넓은 밑변(아이 많음)은 빠른 미래 성장을, 곧은 옆선은 안정을, 좁은 밑변(아이 적음)은 쇠퇴를 신호합니다. 아래 인구 피라미드 도식이 그 모양을 보여줘요.",
        keyIdea:
          "넓은 밑변 = 미래 성장; 좁은 밑변 = 미래 쇠퇴. 가장 어린 집단이 다음 세대를 예측해요.",
        table: {
          headers: ["모양", "밑변", "미래"],
          rows: [
            ["피라미드형 (넓은 밑변)", "젊은 층 많음", "빠른 성장 (개발도상국)"],
            ["기둥형 (곧음)", "고름", "안정 (선진국)"],
            ["역피라미드형 (좁은 밑변)", "젊은 층 적음", "줄어드는 개체군"],
          ],
        },
        terms: [],
        traps: [],
        example: null,
      },
      {
        title: "인구 관성",
        subtitle: null,
        body:
          "출생률이 대체 수준으로 떨어져도, 밑변이 넓은 개체군은 수십 년간 계속 자라요 — 그 거대한 젊은 집단이 아직 생식 연령에 도달해야 하니까요. 이 지연이 인구 관성(population momentum)이고, 빠르게 성장하는 나라가 즉시 안정될 수 없는 이유입니다.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "연령 구조도 (Age structure diagram)",
            def: "개체군의 연령·성별 구성 그래프; 성장을 예측함.",
          },
          {
            term: "인구 관성 (Population momentum)",
            def: "거대한 젊은 집단 때문에 출생률이 떨어진 뒤에도 계속되는 성장.",
          },
        ],
        traps: [
          "넓은 밑변은 '지금' 출생률이 떨어져도 성장이 계속됨을 뜻해요 — 그게 인구 관성입니다.",
        ],
        example: null,
      },
    ],
  },
];
