/**
 * Core Notes 한국어 스토리텔링 버전 — AP Statistics Unit 6 (6.1–6.8 전체).
 * 원본 내용 전량 보존(objectives·terms·traps·formulas) + 일타강사 내러티브.
 * formulas는 수식이라 원문 그대로 유지. 용어는 "한국어 (English)" 병기.
 */
import type { CoreNote } from "@/lib/coreNotes";

const F = ["CI = estimate ± crit·SE", "ME = ½·width", "large counts: np̂≥10, n(1−p̂)≥10"];
const UNIT = "Inference for Categorical Data: Proportions";

export const AP_STATS_U6_KO: CoreNote[] = [
  {
    lessonId: "ap-statistics-u6-l1",
    courseId: "ap-statistics",
    subjectLabel: "AP Statistics",
    emoji: "📊",
    unit: 6,
    lessonNum: 1,
    unitName: UNIT,
    title: "단일 비율 신뢰구간",
    subtitle: "'95% 확신한다'가 맞아요 — '95% 확률'은 틀립니다.",
    overview:
      "단일 비율 신뢰구간은 p̂ ± z*(√(p̂(1−p̂)/n))예요. 신뢰구간에서는 SE에 (p가 아니라) p̂를 씁니다. 오차한계·신뢰수준·표본 크기의 관계가 핵심이에요.",
    objectives: [
      "CI: p̂ ± z*(√(p̂(1−p̂)/n)); 신뢰구간 SE에 p̂(p 아님) 사용을 적용할 수 있다.",
      "오차한계·신뢰수준·표본 크기 관계를 설명할 수 있다.",
    ],
    formulas: F,
    diagram: null,
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "신뢰구간 해석은 '우리는 참 비율이 …에 있다고 95% 확신한다'예요. 참 비율은 고정값이라 확률 표현을 쓰면 안 돼요. 신뢰수준을 높이면 구간이 넓어지고, 표본 크기를 키우면 좁아집니다.",
        keyIdea:
          "CI = p̂ ± z*·SE(SE에 p̂ 사용). 해석: '95% 확신한다'(확률 아님). 참 비율은 고정값.",
        table: null,
        terms: [
          {
            term: "신뢰구간 해석 (Interpreting CI)",
            def: "'우리는 참 비율이 …에 있다고 95% 확신한다'.",
          },
        ],
        traps: [
          "'참 비율이 이 구간에 있을 확률이 95%'라고 말하기 — 참 비율은 고정값(무작위 아님)이라 구간이 그것을 포함하거나 안 하거나예요; 올바른 표현은 '우리는 95% 확신한다'입니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-statistics-u6-l2",
    courseId: "ap-statistics",
    subjectLabel: "AP Statistics",
    emoji: "📊",
    unit: 6,
    lessonNum: 2,
    unitName: UNIT,
    title: "단일 비율 유의성 검정",
    subtitle: "검정의 SE엔 p̂가 아니라 p₀(귀무 값)를 써요 — 거의 모든 FRQ에 나옵니다.",
    overview:
      "단일 비율 유의성 검정은 H₀: p = p₀ vs Hₐ: p ≠ p₀(양측) 또는 단측이에요. 검정 통계량 z = (p̂ − p₀)/√(p₀(1−p₀)/n) — 검정의 SE에는 p₀를 씁니다. P-값은 H₀가 참일 때 이 결과 이상이 나올 확률이에요.",
    objectives: [
      "H₀: p = p₀ vs Hₐ: p ≠ p₀(양측) 또는 단측을 세울 수 있다.",
    ],
    formulas: F,
    diagram: null,
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "검정 통계량은 z = (p̂ − p₀)/√(p₀(1−p₀)/n)으로, 검정에서는 SE에 p₀를 써요. P-값은 H₀가 참이라고 가정할 때 관측 결과 또는 그보다 극단적인 결과가 나올 확률입니다.",
        keyIdea:
          "검정 통계량 z = (p̂ − p₀)/√(p₀(1−p₀)/n). 검정 SE엔 p₀, 신뢰구간 SE엔 p̂.",
        table: null,
        terms: [
          {
            term: "검정 통계량 (Test statistic)",
            def: "z = (p̂ − p₀)/√(p₀(1−p₀)/n); 검정 SE에 p₀ 사용.",
          },
          {
            term: "P-값 해석 (P-value interpretation)",
            def: "H₀가 참일 때 이 결과 또는 그보다 극단적인 결과가 나올 확률.",
          },
        ],
        traps: [
          "유의성 검정의 표준오차에 p̂를 쓰기 — 유의성 검정에서는 SE 공식에 p₀(귀무 값)를 써요; p̂는 신뢰구간에만 씁니다; 이 구별은 거의 모든 AP 통계 FRQ에 나옵니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-statistics-u6-l3",
    courseId: "ap-statistics",
    subjectLabel: "AP Statistics",
    emoji: "📊",
    unit: 6,
    lessonNum: 3,
    unitName: UNIT,
    title: "두 표본 비율 검정과 신뢰구간",
    subtitle: "검정엔 합동 비율, 신뢰구간엔 분리 비율 — 풀링은 검정에서만!",
    overview:
      "두 표본 비율을 비교해요. p₁=p₂ 검정에서는 합동 비율 p_c를 SE에 쓰고, p₁−p₂ 신뢰구간에서는 분리된 p̂₁, p̂₂를 SE에 씁니다(풀링 없음). 각 표본의 큰 표본 조건을 따로 점검해야 해요.",
    objectives: [
      "각 표본의 큰 표본 조건을 따로 점검할 수 있다.",
    ],
    formulas: F,
    diagram: null,
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "p₁=p₂ 검정에서는 합동 비율(pooled proportion) p_c를 SE에 써요 — 두 비율이 같다는 가정 아래. p₁−p₂ 신뢰구간에서는 비율이 같다는 가정이 없으니 분리된 p̂₁, p̂₂를 SE에 씁니다(풀링 없음).",
        keyIdea:
          "검정(H₀: p₁=p₂) → 합동 비율 p_c. 신뢰구간(p₁−p₂) → 분리 p̂₁·p̂₂(풀링 없음).",
        table: null,
        terms: [
          {
            term: "p₁=p₂ 검정 (Test for p₁=p₂)",
            def: "SE에 합동 비율 p_c 사용.",
          },
          {
            term: "p₁−p₂ 신뢰구간 (CI for p₁−p₂)",
            def: "SE에 분리된 p̂₁와 p̂₂ 사용(풀링 없음).",
          },
        ],
        traps: [
          "신뢰구간에 합동 비율을 쓰기 — 풀링은 H₀: p₁=p₂인 유의성 검정에서만 일어나요; 신뢰구간(비율이 같다는 가정 없음)에는 p̂₁, p̂₂를 따로 쓴 비풀링 표준오차를 씁니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-statistics-u6-l4",
    courseId: "ap-statistics",
    subjectLabel: "AP Statistics",
    emoji: "📊",
    unit: 6,
    lessonNum: 4,
    unitName: UNIT,
    title: "제1종·제2종 오류와 검정력",
    subtitle: "제1종 = 없는 효과를 있다고, 제2종 = 있는 효과를 놓침.",
    overview:
      "제1종 오류는 참 H₀를 기각(확률 = α), 제2종 오류는 거짓 H₀를 기각 못 함(확률 = β)이에요. 검정력 = 1 − β로, n이 클수록·효과 크기가 클수록·α가 클수록 커집니다.",
    objectives: [
      "검정력 = 1 − β; n·효과 크기·α가 클수록 증가함을 설명할 수 있다.",
    ],
    formulas: F,
    diagram: null,
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "제1종 오류는 참 H₀를 기각하는 것으로 확률 = α(유의수준)이에요. 제2종 오류는 거짓 H₀를 기각하지 못하는 것으로 확률 = β입니다. 검정력 = 1 − β로, n·효과 크기·α가 커지면 증가해요.",
        keyIdea:
          "제1종 = 참 H₀ 기각(α). 제2종 = 거짓 H₀ 못 기각(β). 검정력 = 1−β(n·효과·α 클수록 ↑).",
        table: null,
        terms: [
          {
            term: "제1종 오류 (Type I error)",
            def: "참 H₀를 기각; 확률 = α(유의수준).",
          },
          {
            term: "제2종 오류 (Type II error)",
            def: "거짓 H₀를 기각하지 못함; 확률 = β.",
          },
        ],
        traps: [
          "맥락에서 제1종과 제2종 오류를 혼동하기 — AP는 특정 시나리오를 주고 어느 오류인지 물어요; 제1종 = 없는 효과를 있다고 잘못 결론, 제2종 = 실제 효과를 놓침입니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-statistics-u6-l5",
    courseId: "ap-statistics",
    subjectLabel: "AP Statistics",
    emoji: "📊",
    unit: 6,
    lessonNum: 5,
    unitName: UNIT,
    title: "P-값 해석 — 가장 많이 시험되는 개념",
    subtitle: "P-값은 'H₀가 참일 확률'이 아니에요 — 조건부 구조로 해석하세요.",
    overview:
      "작은 P-값은 H₀에 반하는 증거예요 — 단, H₀가 참일 확률이 아닙니다. 유의수준 α는 기각의 문턱이에요. P-값은 H₀가 참이라고 가정할 때 관측 통계량 또는 그보다 극단적인 값이 나올 확률입니다.",
    objectives: [
      "작은 P-값 = H₀에 반하는 증거; H₀가 참일 확률이 아님을 설명할 수 있다.",
      "유의수준 α를 기각의 문턱으로 이해할 수 있다.",
    ],
    formulas: F,
    diagram: null,
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "P-값은 H₀가 참일 때 관측 통계량 또는 그보다 극단적인 값이 나올 확률이에요. 작은 P-값은 H₀에 반하는 강한 증거이고, α보다 작으면 H₀를 기각합니다. P-값은 'H₀가 참일 확률'이 아니에요.",
        keyIdea:
          "P-값 = H₀ 참일 때 '관측 이상 극단'이 나올 확률. 작으면 H₀에 반하는 증거. 'H₀가 참일 확률' 아님.",
        table: null,
        terms: [
          {
            term: "P-값 (P-value)",
            def: "H₀가 참일 때 관측 통계량 또는 그보다 극단적인 값이 나올 확률.",
          },
        ],
        traps: [
          "'P-값은 H₀가 참일 확률'이라고 말하기 — 거짓이에요; P-값은 P(데이터가 적어도 이만큼 극단 | H₀ 참)입니다; AP FRQ는 해석에 이 조건부 문장 구조를 요구합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-statistics-u6-l6",
    courseId: "ap-statistics",
    subjectLabel: "AP Statistics",
    emoji: "📊",
    unit: 6,
    lessonNum: 6,
    unitName: UNIT,
    title: "그럴듯한 값의 범위로서의 신뢰구간",
    subtitle: "95%는 '방법'의 장기 포착률이에요 — 이 특정 구간이 아닙니다.",
    overview:
      "신뢰구간은 유의성만이 아니라 그럴듯한 모수 값들을 알려줘요. 신뢰수준은 장기 포착률(95%의 구간이 참 값을 포함)입니다. 양측 검정과의 연결: 모수가 구간 밖이면 H₀ 기각이에요.",
    objectives: [
      "CI가 유의성만이 아니라 그럴듯한 모수 값을 알려줌을 설명할 수 있다.",
    ],
    formulas: F,
    diagram: null,
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "신뢰수준은 장기 포착률이에요 — 같은 방법으로 많은 표본에서 구간을 만들면 95%가 참 값을 포함합니다. 신뢰구간과 양측 검정의 연결: 모수가 구간 밖에 있으면 H₀를 기각해요.",
        keyIdea:
          "신뢰수준 = 장기 포착률(95%의 구간이 참 값 포함). 모수가 구간 밖 ↔ H₀ 기각.",
        table: null,
        terms: [
          {
            term: "장기 포착률로서의 신뢰수준 (Confidence level as long-run capture rate)",
            def: "95%의 신뢰구간이 참 값을 포함함.",
          },
          {
            term: "신뢰구간과 양측 검정의 연결 (Connection between CI and two-sided test)",
            def: "모수가 구간 밖 ↔ H₀ 기각.",
          },
        ],
        traps: [
          "신뢰수준을 '하나의' 구간에 대한 확률로 해석하기 — 일단 구간이 계산되면 참 모수는 그 안에 있거나 없거나예요; 95%는 많은 표본에 걸친 '방법'을 말하지 이 특정 구간이 아닙니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-statistics-u6-l7",
    courseId: "ap-statistics",
    subjectLabel: "AP Statistics",
    emoji: "📊",
    unit: 6,
    lessonNum: 7,
    unitName: UNIT,
    title: "비율 추론의 조건",
    subtitle: "검정의 정규 조건엔 p̂가 아니라 p₀를 써요.",
    overview:
      "비율 추론의 세 조건: 무작위(무작위 표본), 정규(검정은 np₀≥10·n(1−p₀)≥10), 10% 조건(n ≤ 모집단의 10%)이에요. 검정의 정규 조건 점검에는 p₀를 씁니다.",
    objectives: [
      "비율 추론의 조건을 숙달할 수 있다.",
    ],
    formulas: F,
    diagram: null,
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "무작위 조건: 무작위 표본. 정규 조건: np₀ ≥ 10이고 n(1−p₀) ≥ 10(검정은 p₀ 사용). 10% 조건: n ≤ 모집단의 10%. 검정과 신뢰구간에서 정규 조건에 쓰는 비율이 다름에 주의하세요.",
        keyIdea:
          "무작위 + 정규(검정은 np₀≥10) + 10% 조건. 검정은 p₀, 신뢰구간은 p̂로 정규 조건 점검.",
        table: null,
        terms: [
          {
            term: "무작위 조건 (Random condition)",
            def: "무작위 표본.",
          },
          {
            term: "정규 조건 (Normal condition)",
            def: "np₀ ≥ 10 그리고 n(1−p₀) ≥ 10(검정은 p₀ 사용).",
          },
          {
            term: "10% 조건 (10% condition)",
            def: "n ≤ 모집단의 10%.",
          },
        ],
        traps: [
          "유의성 검정의 정규 조건 점검에서 p₀ 대신 p̂를 쓰기 — np₀ ≥ 10을 확인할 때 귀무 값 p₀를 써야 해요; 이는 p̂를 쓰는 신뢰구간 점검과 다릅니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-statistics-u6-l8",
    courseId: "ap-statistics",
    subjectLabel: "AP Statistics",
    emoji: "📊",
    unit: 6,
    lessonNum: 8,
    unitName: UNIT,
    title: "올바른 검정 고르기 — 단일 vs 두 표본",
    subtitle: "매칭 짝은 두 표본이 아니에요 — 차이로 단일 표본 검정을 하세요.",
    overview:
      "검정 선택: 단일 표본(한 집단을 알려진 기준과 비교), 두 표본(두 독립 집단 비교), 매칭 짝(같은 대상에 두 측정 → 차이에 대한 단일 표본)이에요. 설계를 보고 올바른 검정을 고르는 게 핵심입니다.",
    objectives: [
      "올바른 검정 선택(단일 vs 두 표본)을 숙달할 수 있다.",
    ],
    formulas: F,
    diagram: null,
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "단일 표본은 한 집단을 알려진 기준과 비교해요. 두 표본은 두 독립 집단을 비교합니다. 매칭 짝은 같은 대상에 두 측정(전후)이라 차이를 구해 단일 표본 검정을 합니다 — 두 측정이 독립이 아니기 때문이에요.",
        keyIdea:
          "단일 = 한 집단 vs 기준. 두 표본 = 두 독립 집단. 매칭 짝 = 차이에 대한 단일 표본(독립 아님).",
        table: null,
        terms: [
          {
            term: "단일 표본 (One-sample)",
            def: "한 집단을 알려진 기준과 비교.",
          },
          {
            term: "두 표본 (Two-sample)",
            def: "두 독립 집단을 비교.",
          },
          {
            term: "매칭 짝 (Matched pairs)",
            def: "같은 대상에 두 측정 → 차이에 대한 단일 표본.",
          },
        ],
        traps: [
          "매칭 짝 데이터에 두 표본 검정을 쓰기 — 매칭 짝은 독립 표본이 아니에요; 차이를 먼저 구한 뒤 차이에 단일 표본 t-검정을 적용해야 합니다; AP는 설계를 주고 올바로 식별하는지 시험합니다.",
        ],
        example: null,
      },
    ],
  },
];
