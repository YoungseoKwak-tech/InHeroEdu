/**
 * Core Notes 한국어 스토리텔링 버전 — AP Statistics Unit 7 (7.1–7.8 전체).
 * 원본 내용 전량 보존(objectives·terms·traps·formulas) + 일타강사 내러티브.
 * formulas는 수식이라 원문 그대로 유지. 용어는 "한국어 (English)" 병기.
 */
import type { CoreNote } from "@/lib/coreNotes";

const F = ["t-test df = n−1", "matched pairs → 1-sample t on diffs", "power = 1−β"];
const UNIT = "Inference for Quantitative Data: Means";

export const AP_STATS_U7_KO: CoreNote[] = [
  {
    lessonId: "ap-statistics-u7-l1",
    courseId: "ap-statistics",
    subjectLabel: "AP Statistics",
    emoji: "📊",
    unit: 7,
    lessonNum: 1,
    unitName: UNIT,
    title: "단일 표본 t-검정과 t-구간",
    subtitle: "s(표본 표준편차)를 쓰면 t-절차예요 — 거의 모든 실제 문제가 그렇습니다.",
    overview:
      "단일 표본 t-검정·t-구간은 σ를 모를 때 써요. 검정 통계량 t = (x̄ − μ₀)/(s/√n), 자유도 = n−1. t-구간은 x̄ ± t*(s/√n)입니다.",
    objectives: [
      "t-표나 계산기를 사용; 단일 표본은 df = n−1을 적용할 수 있다.",
    ],
    formulas: F,
    diagram: null,
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "검정 통계량은 t = (x̄ − μ₀)/(s/√n)으로 자유도 = n−1이에요. t-구간은 x̄ ± t*(s/√n)입니다. σ를 모르고 s를 쓸 때마다 t-절차를 써요.",
        keyIdea:
          "t = (x̄ − μ₀)/(s/√n), df = n−1. t-구간 = x̄ ± t*(s/√n). s 쓰면 t-절차.",
        table: null,
        terms: [
          {
            term: "t = (x̄ − μ₀)/(s/√n)",
            def: "자유도 n−1인 검정 통계량.",
          },
          {
            term: "t-구간 (t-interval)",
            def: "x̄ ± t*(s/√n).",
          },
        ],
        traps: [
          "σ가 미지일 때 z-절차를 쓰기 — σ 대신 s(표본 표준편차)를 쓸 때마다 t-절차를 써야 해요; 거의 모든 실제 문제가 t를 요구합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-statistics-u7-l2",
    courseId: "ap-statistics",
    subjectLabel: "AP Statistics",
    emoji: "📊",
    unit: 7,
    lessonNum: 2,
    unitName: UNIT,
    title: "두 표본 t-절차",
    subtitle: "AP는 기본적으로 Welch t를 써요 — 풀링 t가 아닙니다.",
    overview:
      "두 표본 t-절차는 μ₁ − μ₂를 다뤄요. 자유도는 계산기(Welch)나 보수적으로 min(n₁,n₂)−1로 정합니다. t-구간은 (x̄₁ − x̄₂) ± t*(SE). 각 표본의 조건을 따로 점검해야 해요.",
    objectives: [
      "각 표본의 조건을 따로 점검할 수 있다.",
    ],
    formulas: F,
    diagram: null,
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "μ₁ − μ₂에 대한 두 표본 t-검정은 자유도를 계산기(Welch)나 보수적 df = min(n₁,n₂)−1로 정해요. 두 표본 t-구간은 (x̄₁ − x̄₂) ± t*(SE)입니다.",
        keyIdea:
          "두 표본 t: μ₁−μ₂, df는 Welch(계산기) 또는 보수적 min(n₁,n₂)−1. 기본은 비풀링 Welch.",
        table: null,
        terms: [
          {
            term: "μ₁ − μ₂ 두 표본 t-검정 (Two-sample t-test for μ₁ − μ₂)",
            def: "자유도는 계산기(Welch)나 보수적 df = min(n₁,n₂)−1.",
          },
          {
            term: "두 표본 t-구간 (Two-sample t-interval)",
            def: "(x̄₁ − x̄₂) ± t*(SE).",
          },
        ],
        traps: [
          "두 표본 검정에 Welch 대신 풀링 t-검정을 쓰기 — AP 통계는 기본적으로 Welch 두 표본 t를 써요(풀링 아님); 풀링은 분산이 같다고 알려진 경우에만 유효(드물게 적절)합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-statistics-u7-l3",
    courseId: "ap-statistics",
    subjectLabel: "AP Statistics",
    emoji: "📊",
    unit: 7,
    lessonNum: 3,
    unitName: UNIT,
    title: "매칭 짝 t-절차",
    subtitle: "같은 개인의 두 측정은 독립이 아니에요 — 차이를 구해 단일 표본으로.",
    overview:
      "매칭 짝은 각 짝의 차이 d = x₁ − x₂를 구해 단일 표본으로 분석해요. t = (d̄ − 0)/(sₐ/√n), df = n−1(n = 짝의 수). 매칭 짝이 두 독립 표본보다 변동을 줄이는 이유가 핵심입니다.",
    objectives: [
      "각 짝의 d = x₁ − x₂를 계산해 d를 단일 표본으로 분석할 수 있다.",
      "t = (d̄ − 0)/(sₐ/√n); df = n−1(n = 짝의 수)을 적용할 수 있다.",
      "매칭 짝이 두 독립 표본보다 변동을 줄이는 이유를 설명할 수 있다.",
    ],
    formulas: F,
    diagram: null,
    sections: [
      {
        title: "매칭 짝 t-절차",
        subtitle: null,
        body:
          "각 짝의 차이 d = x₁ − x₂를 먼저 구하고, 그 차이들을 단일 표본처럼 분석해요. t = (d̄ − 0)/(sₐ/√n), df = n−1(n은 짝의 수)입니다. 같은 대상 내에서 비교하니 개인 간 변동이 제거되어 변동이 줄어요.",
        keyIdea:
          "매칭 짝: 차이 d 구해 단일 표본 t. t = (d̄−0)/(sₐ/√n), df = n−1(짝 수). 변동 감소.",
        table: null,
        terms: [],
        traps: [
          "매칭 짝을 두 독립 표본으로 취급하기 — 같은 개인의 두 측정은 독립이 아니에요; 차이를 구해야 합니다; AP는 전후 연구를 주고 차이 접근법을 쓰는지 시험합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-statistics-u7-l4",
    courseId: "ap-statistics",
    subjectLabel: "AP Statistics",
    emoji: "📊",
    unit: 7,
    lessonNum: 4,
    unitName: UNIT,
    title: "평균 추론의 조건 점검",
    subtitle: "두 표본 절차는 각 표본의 조건을 따로 점검해야 해요.",
    overview:
      "평균 추론의 조건: 무작위, 정규/큰 표본(n≥30 또는 정규 모집단), 독립(10% 규칙)이에요. 작은 표본(n<30)은 이상치를 점검하고, 조건이 충족 안 되면 어떻게 할지도 알아야 합니다.",
    objectives: [
      "무작위·정규/큰 표본(n≥30 또는 정규)·독립(10% 규칙) 조건을 점검할 수 있다.",
      "작은 표본(n<30)에서 이상치를 점검할 때를 안다.",
      "조건이 완전히 충족되지 않을 때 무엇을 할지 안다.",
    ],
    formulas: F,
    diagram: null,
    sections: [
      {
        title: "평균 추론의 조건 점검",
        subtitle: null,
        body:
          "무작위 조건, 정규/큰 표본 조건(n≥30 또는 정규 모집단), 독립 조건(10% 규칙)을 점검해요. 작은 표본(n<30)에서는 이상치와 강한 치우침을 확인해야 합니다. 두 표본 절차는 각 표본에 대해 조건을 따로 점검해요.",
        keyIdea:
          "무작위 + 정규/큰 표본(n≥30) + 독립(10%). 작은 표본은 이상치 점검. 두 표본은 각각 따로.",
        table: null,
        terms: [],
        traps: [
          "전체 검정에 조건을 한 번만 점검하기 — 두 표본 절차는 '각' 표본의 조건을 따로 점검해야 해요; AP FRQ 채점표는 조건 점검에 부분 점수를 줍니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-statistics-u7-l5",
    courseId: "ap-statistics",
    subjectLabel: "AP Statistics",
    emoji: "📊",
    unit: 7,
    lessonNum: 5,
    unitName: UNIT,
    title: "평균 신뢰구간 해석",
    subtitle: "'확신한다'를 쓰고 '확률'은 쓰지 마세요 — 모수는 고정값입니다.",
    overview:
      "평균 신뢰구간 해석은 '우리는 참 평균이 A와 B 사이에 있다고 95% 확신한다'예요. 오차한계와 그것을 줄이는 법, 그리고 CI가 귀무 값을 포함하는지(양측 검정과의 연결)가 핵심입니다.",
    objectives: [
      "'우리는 참 평균이 A와 B 사이에 있다고 95% 확신한다'로 해석할 수 있다.",
      "오차한계와 그것을 줄이는 법을 설명할 수 있다.",
      "CI가 귀무 값을 포함하는지와 양측 검정과의 연결을 안다.",
    ],
    formulas: F,
    diagram: null,
    sections: [
      {
        title: "평균 신뢰구간 해석",
        subtitle: null,
        body:
          "평균 신뢰구간은 '우리는 참 평균이 A와 B 사이에 있다고 95% 확신한다'로 해석해요. 오차한계를 줄이려면 표본 크기를 키우거나 신뢰수준을 낮춰요. CI가 귀무 값을 포함하지 않으면 양측 검정에서 H₀를 기각합니다.",
        keyIdea:
          "'참 평균이 A~B에 있다고 95% 확신'('확률' 아님). CI가 귀무 값 미포함 ↔ 양측 검정 기각.",
        table: null,
        terms: [],
        traps: [
          "CI를 '확률'로 해석하기 — '확신한다'를 쓰고 '확률'을 쓰지 마세요; 모수는 고정값이에요; AP FRQ는 CI 해석의 정확한 표현을 일관되게 시험합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-statistics-u7-l6",
    courseId: "ap-statistics",
    subjectLabel: "AP Statistics",
    emoji: "📊",
    unit: 7,
    lessonNum: 6,
    unitName: UNIT,
    title: "통계적 유의성 vs 실질적 유의성",
    subtitle: "큰 표본은 사소한 차이도 통계적으로 유의하게 만들어요.",
    overview:
      "통계적으로 유의(p < α)하다고 실질적으로 중요한 건 아니에요. 큰 표본은 사소한 차이도 통계적으로 유의하게 만들 수 있습니다. 효과 크기(Cohen's d, 신뢰구간 너비)로 실질적 의미를 봐요.",
    objectives: [
      "큰 표본이 사소한 차이를 통계적으로 유의하게 만들 수 있음을 설명할 수 있다.",
    ],
    formulas: F,
    diagram: null,
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "통계적으로 유의(p < α)한 것과 실질적으로 유의(의미 있는 효과 크기)한 것은 달라요. 효과 크기 측도(Cohen's d, 신뢰구간 너비)로 실질적 중요성을 평가합니다. 큰 표본에서는 작은 차이도 유의하게 나올 수 있어요.",
        keyIdea:
          "통계적 유의(p < α) ≠ 실질적 유의(의미 있는 효과 크기). 큰 표본은 사소한 차이도 유의하게.",
        table: null,
        terms: [
          {
            term: "통계적으로 유의 (Statistically significant)",
            def: "p < α; 실질적으로 유의: 의미 있는 효과 크기.",
          },
          {
            term: "효과 크기 측도 (Effect size measures)",
            def: "Cohen's d, 신뢰구간 너비.",
          },
        ],
        traps: [
          "실질적 유의성을 다루지 않고 '통계적으로 유의'에서 멈추기 — AP FRQ는 결과를 맥락에서 해석하게 해요; 0.01 mm의 통계적으로 유의한 차이는 현실적 중요성이 없을 수 있습니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-statistics-u7-l7",
    courseId: "ap-statistics",
    subjectLabel: "AP Statistics",
    emoji: "📊",
    unit: 7,
    lessonNum: 7,
    unitName: UNIT,
    title: "t-절차의 오류와 강건성",
    subtitle: "t-절차는 n이 크면 비정규에 강건하지만, 작은 n + 강한 치우침엔 약해요.",
    overview:
      "t-절차는 n이 클 때 비정규성에 강건해요. 하지만 작은 표본에서 정규성이 깨지면 비모수 대안을 고려합니다. 강한 치우침 + 작은 n에서는 t-절차가 부적절해요.",
    objectives: [
      "t-절차가 n이 클 때 비정규성에 강건함을 설명할 수 있다.",
      "작은 표본에서 정규성이 깨질 때 비모수 대안을 안다.",
    ],
    formulas: F,
    diagram: null,
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "t-절차는 n이 클 때 비정규성에 강건(robust)해요 — CLT 덕분이죠. 하지만 t-절차가 부적절한 경우는 작은 n에 강한 치우침이 있을 때입니다. 그럴 땐 비모수 대안을 고려해요.",
        keyIdea:
          "t-절차는 큰 n에서 비정규에 강건. 작은 n + 강한 치우침 → 부적절(비모수 대안 고려).",
        table: null,
        terms: [
          {
            term: "t-절차가 부적절한 경우 (When t-procedures are not appropriate)",
            def: "작은 n에 강한 치우침이 있을 때.",
          },
        ],
        traps: [
          "어떤 양적 데이터든 t-절차를 무작정 쓰기 — n=5이고 분포가 심하게 치우쳤으면 t-분포 근사가 나빠요; AP는 분포와 표본 크기를 고려해 절차가 적절한지 묻습니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-statistics-u7-l8",
    courseId: "ap-statistics",
    subjectLabel: "AP Statistics",
    emoji: "📊",
    unit: 7,
    lessonNum: 8,
    unitName: UNIT,
    title: "특정 추론 목표를 위한 연구 설계",
    subtitle: "표본 크기는 항상 '올림' — n=64.1이면 65를 쓰세요.",
    overview:
      "연구 설계 선택이 추론 결론과 연결돼요. 원하는 오차한계를 위한 표본 크기 n = (z*σ/ME)²와, 주어진 효과를 검출하는 데 필요한 표본 크기(검정력 분석)가 핵심입니다.",
    objectives: [
      "연구 설계 선택을 추론 결론과 연결할 수 있다.",
    ],
    formulas: F,
    diagram: null,
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "표본 크기 계산: 원하는 오차한계를 위해 n = (z*σ/ME)². 검정력 분석은 주어진 효과를 검출하는 데 필요한 표본 크기를 구해요. 계산된 n은 항상 올림합니다 — 정수여야 하니까요.",
        keyIdea:
          "표본 크기 n = (z*σ/ME)²(오차한계용). 검정력 분석 = 효과 검출에 필요한 n. 항상 '올림'.",
        table: null,
        terms: [
          {
            term: "표본 크기 계산 (Sample size calculation)",
            def: "원하는 오차한계를 위해 n = (z*σ/ME)².",
          },
          {
            term: "검정력 분석 (Power analysis)",
            def: "주어진 효과를 검출하는 데 필요한 표본 크기.",
          },
        ],
        traps: [
          "필요 표본 크기를 계산할 때 올림을 잊기 — n은 정수여야 해요; 항상 올립니다(예: n=64.1 → n=65 사용); n=64를 쓰면 오차한계가 원하는 것보다 약간 커집니다.",
        ],
        example: null,
      },
    ],
  },
];
