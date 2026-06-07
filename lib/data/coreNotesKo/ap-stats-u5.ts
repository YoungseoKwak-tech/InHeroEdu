/**
 * Core Notes 한국어 스토리텔링 버전 — AP Statistics Unit 5 (5.1–5.8 전체).
 * 원본 내용 전량 보존(objectives·terms·traps·formulas·diagram) + 일타강사 내러티브.
 * formulas는 수식이라 원문 그대로 유지. 용어는 "한국어 (English)" 병기.
 */
import type { CoreNote } from "@/lib/coreNotes";

const F = ["CLT: x̄≈Normal for large n", "SE(x̄)=σ/√n", "SE(p̂)=√(p(1−p)/n)"];

export const AP_STATS_U5_KO: CoreNote[] = [
  {
    lessonId: "ap-statistics-u5-l1",
    courseId: "ap-statistics",
    subjectLabel: "AP Statistics",
    emoji: "📊",
    unit: 5,
    lessonNum: 1,
    unitName: "Sampling Distributions",
    title: "표본 비율 p̂의 표집분포",
    subtitle: "참 p를 알 때(귀무가설)는 p, 모를 때(신뢰구간)만 p̂를 쓰세요.",
    overview:
      "표본 비율 p̂는 표본에서의 성공 비율이에요. 큰 n에서 그 표집분포는 근사적으로 정규입니다 — 중심 μ_p̂ = p, 퍼짐 σ_p̂ = √(p(1−p)/n). np≥10이고 n(1−p)≥10이면 정규로 봐요.",
    objectives: [
      "p̂가 표본 비율이고 큰 n에서 표집분포가 근사적으로 정규임을 설명할 수 있다.",
    ],
    formulas: F,
    diagram: "bell-curve",
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "표본 비율 p̂의 표집분포는 중심 μ_p̂ = p, 퍼짐 σ_p̂ = √(p(1−p)/n)이에요. 큰 표본 조건 np ≥ 10이고 n(1−p) ≥ 10이면 정규로 근사합니다.",
        keyIdea:
          "p̂ 표집분포: 중심 = p, 퍼짐 = √(p(1−p)/n). 정규 조건: np≥10 그리고 n(1−p)≥10.",
        table: null,
        terms: [
          {
            term: "중심 (Center)",
            def: "μ_p̂ = p; 퍼짐: σ_p̂ = √(p(1−p)/n).",
          },
          {
            term: "큰 표본 조건 (Large sample condition)",
            def: "정규성을 위해 np ≥ 10 그리고 n(1−p) ≥ 10.",
          },
        ],
        traps: [
          "참 p 대신 관측된 p̂로 σ_p̂ = √(p̂(1−p̂)/n)을 쓰기 — 참 p를 알 때(귀무가설)는 p를 쓰고, p가 미지일 때(신뢰구간)에만 p̂를 대입합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-statistics-u5-l2",
    courseId: "ap-statistics",
    subjectLabel: "AP Statistics",
    emoji: "📊",
    unit: 5,
    lessonNum: 2,
    unitName: "Sampling Distributions",
    title: "표본 평균 x̄의 표집분포",
    subtitle: "모집단이 정규이거나 n이 커야 x̄가 정규예요.",
    overview:
      "표본 평균 x̄의 표집분포는 중심 μ_x̄ = μ, 표준오차 σ_x̄ = σ/√n이에요. x̄가 정규이려면 모집단이 정규이거나 n이 충분히 커야 합니다(중심극한정리).",
    objectives: [
      "μ_x̄ = μ; σ_x̄ = σ/√n(표준오차)를 계산할 수 있다.",
      "x̄가 정규이려면 모집단이 정규이거나 n이 커야 함을 설명할 수 있다.",
    ],
    formulas: F,
    diagram: "bell-curve",
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "표본 평균 x̄의 중심은 μ_x̄ = μ, 표준오차는 σ_x̄ = σ/√n이에요. 중심극한정리(CLT)에 따라 n ≥ 30(대략)이면 모집단 모양과 무관하게 x̄가 근사적으로 정규가 됩니다.",
        keyIdea:
          "x̄: 중심 = μ, 표준오차 = σ/√n. CLT: n ≥ 30이면 모집단 모양 무관하게 x̄ 근사 정규.",
        table: null,
        terms: [
          {
            term: "중심극한정리 (Central Limit Theorem)",
            def: "n ≥ 30이면 모집단 모양과 무관하게 x̄가 근사적으로 정규.",
          },
        ],
        traps: [
          "치우친 모집단의 작은 표본에 CLT를 적용하기 — CLT는 비정규 모집단에 (대략) n ≥ 30을 요구해요; n=10이고 모집단이 치우쳤으면 x̄는 근사 정규가 아닙니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-statistics-u5-l3",
    courseId: "ap-statistics",
    subjectLabel: "AP Statistics",
    emoji: "📊",
    unit: 5,
    lessonNum: 3,
    unitName: "Sampling Distributions",
    title: "중심극한정리 — 핵심 통찰",
    subtitle: "CLT는 '평균'에 적용돼요 — 개별 관측이 아니에요.",
    overview:
      "중심극한정리(CLT)는 개별 관측이 아니라 표본 '평균'에 적용돼요. 모집단 분포와 x̄의 표집분포를 구별하는 게 핵심입니다 — 많은 무작위 값을 평균하면 분포가 집중되거든요.",
    objectives: [
      "CLT가 개별 관측이 아니라 평균에 적용됨을 설명할 수 있다.",
      "모집단 분포와 x̄의 표집분포를 구별할 수 있다.",
    ],
    formulas: F,
    diagram: "bell-curve",
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "CLT가 작동하는 이유: 많은 무작위 값을 평균하면 분포가 집중돼요. 그래서 표본 평균의 표집분포가 정규에 가까워집니다. 단, 이는 '평균'의 분포이지 개별 데이터 값의 분포가 아니에요.",
        keyIdea:
          "CLT는 '표본 평균'의 분포에 관한 것(개별 관측 아님). 평균하면 분포 집중 → 정규 접근.",
        table: null,
        terms: [
          {
            term: "CLT가 작동하는 이유 (Why the CLT works)",
            def: "많은 무작위 값을 평균하면 분포가 집중됨.",
          },
        ],
        traps: [
          "CLT를 개별 관측에 적용하기 — CLT는 '표본 평균'의 분포를 기술하지 개별 데이터 값이 아니에요; 무작위로 뽑은 한 값의 P(X > 5)는 정규 근사가 아니라 원래 분포를 씁니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-statistics-u5-l4",
    courseId: "ap-statistics",
    subjectLabel: "AP Statistics",
    emoji: "📊",
    unit: 5,
    lessonNum: 4,
    unitName: "Sampling Distributions",
    title: "차이의 표집분포",
    subtitle: "두 표집분포를 합칠 땐 표준오차가 아니라 '분산'을 더해요.",
    overview:
      "두 표본의 차이(p̂₁−p̂₂, x̄₁−x̄₂)도 표집분포를 가져요. 중심은 모수 차이, 분산은 각 분산의 합입니다. 두 표본 사이 독립 가정이 필요해요.",
    objectives: [
      "표본 간 독립 가정이 필요함을 설명할 수 있다.",
    ],
    formulas: F,
    diagram: "bell-curve",
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "p̂₁ − p̂₂는 중심 = p₁−p₂, 분산 = p₁(1−p₁)/n₁ + p₂(1−p₂)/n₂예요. x̄₁ − x̄₂는 중심 = μ₁−μ₂, 분산 = σ₁²/n₁ + σ₂²/n₂. 두 표본은 독립이어야 합니다.",
        keyIdea:
          "차이: 중심 = 모수 차이, 분산 = 각 분산의 '합'. 두 표본 독립 필요.",
        table: null,
        terms: [
          {
            term: "p̂₁ − p̂₂",
            def: "중심 = p₁−p₂; 분산 = p₁(1−p₁)/n₁ + p₂(1−p₂)/n₂.",
          },
          {
            term: "x̄₁ − x̄₂",
            def: "중심 = μ₁−μ₂; 분산 = σ₁²/n₁ + σ₂²/n₂.",
          },
        ],
        traps: [
          "두 표집분포를 합칠 때 분산 대신 표준오차를 더하기 — '분산'을 더한 뒤 제곱근을 취해야 해요; SE(x̄₁ − x̄₂) = √(σ₁²/n₁ + σ₂²/n₂).",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-statistics-u5-l5",
    courseId: "ap-statistics",
    subjectLabel: "AP Statistics",
    emoji: "📊",
    unit: 5,
    lessonNum: 5,
    unitName: "Sampling Distributions",
    title: "추정량의 편향과 변동성",
    subtitle: "편향(체계적 오차)과 변동성(정밀도)은 별개 성질이에요.",
    overview:
      "추정량은 편향과 변동성으로 평가해요. 불편성은 E(추정량) = 모수, 변동성은 표준오차가 작을수록 더 정밀합니다. 편향-분산 맞교환이 핵심이에요.",
    objectives: [
      "통계 추정의 편향-분산 맞교환을 설명할 수 있다.",
    ],
    formulas: F,
    diagram: "bell-curve",
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "불편성(unbiasedness)은 E(추정량) = 모수예요. 변동성(variability)은 표준오차가 작을수록 더 정밀한 추정량입니다. 추정량은 편향이 없으면서도 정밀하지 않을 수 있고, 정밀하면서도 편향될 수 있어요.",
        keyIdea:
          "불편성 = E(추정량) = 모수. 변동성 = 표준오차 작을수록 정밀. 둘은 별개 성질.",
        table: null,
        terms: [
          {
            term: "불편성 (Unbiasedness)",
            def: "E(추정량) = 모수.",
          },
          {
            term: "변동성 (Variability)",
            def: "표준오차가 작을수록 더 정밀한 추정량.",
          },
        ],
        traps: [
          "편향(체계적 오차)과 변동성(정밀도)을 혼동하기 — 추정량은 불편이지만 부정밀(고분산)할 수도, 정밀하지만 편향될 수도 있어요; AP는 추정량을 '두 성질 모두'로 기술하게 합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-statistics-u5-l6",
    courseId: "ap-statistics",
    subjectLabel: "AP Statistics",
    emoji: "📊",
    unit: 5,
    lessonNum: 6,
    unitName: "Sampling Distributions",
    title: "표본 크기가 표집분포에 미치는 영향",
    subtitle: "n을 2배로 하면 표준오차가 2배가 아니라 √2배로 줄어요.",
    overview:
      "표본 크기가 커지면 표집분포가 좁아져요. n을 2배로 하면 표준오차는 √2배만 줄어듭니다(2배가 아님). 표준오차 SE = σ/√n에서 √n이 분모이기 때문이에요.",
    objectives: [
      "n을 2배로 하면 SE가 2배가 아니라 √2배로 줄어듦을 설명할 수 있다.",
      "n이 커지며 표집분포가 좁아지는 것을 시각화할 수 있다.",
    ],
    formulas: F,
    diagram: "bell-curve",
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "n이 클수록 표준오차가 작아져요(SE = σ/√n). √n이 분모라, n을 4배로 해야 SE가 절반이 됩니다. 표집분포가 점점 좁아지지만 모집단 표준편차 자체는 변하지 않아요.",
        keyIdea:
          "n ↑ → 표준오차 ↓ (SE = σ/√n). n 2배 → SE √2배 감소(2배 아님).",
        table: null,
        terms: [
          {
            term: "더 큰 n (Larger n)",
            def: "더 작은 표준오차 (SE = σ/√n).",
          },
        ],
        traps: [
          "'더 큰 표본이 더 작은 표준편차를 준다'고 말하기 — 더 큰 표본은 (평균의) '표준오차'를 줄이지 모집단 표준편차나 개별 관측 변동성을 줄이는 게 아니에요; AP는 이 표현 정밀성을 시험합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-statistics-u5-l7",
    courseId: "ap-statistics",
    subjectLabel: "AP Statistics",
    emoji: "📊",
    unit: 5,
    lessonNum: 7,
    unitName: "Sampling Distributions",
    title: "t-분포 vs z-분포",
    subtitle: "σ를 모르면(거의 항상) t*를 쓰세요.",
    overview:
      "t-분포는 z-분포보다 꼬리가 두껍고, 모집단 표준편차 σ를 모를 때 써요(자유도 = n−1). 자유도가 ∞로 갈수록 t는 z에 접근합니다. 같은 신뢰수준에서 t* > z*예요.",
    objectives: [
      "자유도가 ∞로 갈수록 t-분포가 z에 접근함을 설명할 수 있다.",
    ],
    formulas: F,
    diagram: "bell-curve",
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "t-분포는 꼬리가 더 두껍고 σ가 미지일 때 쓰며, 자유도 = n−1이에요. 같은 신뢰수준에서 t* > z*인데, 두꺼운 꼬리가 더 넓은 구간을 요구하기 때문입니다. 자유도가 커질수록 t는 z에 가까워져요.",
        keyIdea:
          "t-분포: 두꺼운 꼬리, σ 미지일 때(자유도 n−1). t* > z*(같은 신뢰수준). df → ∞면 t → z.",
        table: null,
        terms: [
          {
            term: "t-분포 (t-distribution)",
            def: "더 두꺼운 꼬리, σ가 미지일 때 사용; 자유도 = n−1.",
          },
          {
            term: "t* vs z*",
            def: "같은 신뢰수준에서 t* > z* (두꺼운 꼬리가 더 넓은 구간 요구).",
          },
        ],
        traps: [
          "σ가 미지일 때 t* 대신 z*를 쓰기 — 모집단 표준편차가 미지면(실무에선 거의 항상) t*를 써야 해요; AP는 각 분포가 언제 적절한지 시험합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-statistics-u5-l8",
    courseId: "ap-statistics",
    subjectLabel: "AP Statistics",
    emoji: "📊",
    unit: 5,
    lessonNum: 8,
    unitName: "Sampling Distributions",
    title: "추론의 조건 — 세 가지 점검",
    subtitle: "무작위·정규/큰 표본·독립 — 세 조건을 명시적으로 점검해야 점수를 받아요.",
    overview:
      "추론 전에 세 조건을 점검해요: 무작위(random), 정규/큰 표본(normal/large sample), 독립(independence). 각 조건을 명시적으로 진술·확인해야 AP 채점에서 점수를 받습니다.",
    objectives: [
      "표집분포 단원의 추론 조건(세 가지 점검)을 숙달할 수 있다.",
    ],
    formulas: F,
    diagram: "bell-curve",
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "무작위 조건: 무작위 표본이나 무작위 실험 데이터. 정규/큰 표본 조건: n≥30이거나 정규 모집단이거나 강한 치우침 없음. 독립 조건: 모집단 ≥ 10n(10% 조건). 세 조건을 모두 명시적으로 점검해야 해요.",
        keyIdea:
          "세 점검: 무작위 + 정규/큰 표본(n≥30 또는 정규) + 독립(모집단 ≥ 10n). 모두 명시 점검 필수.",
        table: null,
        terms: [
          {
            term: "무작위 조건 (Random condition)",
            def: "무작위 표본이나 무작위 실험 데이터.",
          },
          {
            term: "정규/큰 표본 조건 (Normal/Large Sample condition)",
            def: "n≥30 또는 정규 모집단 또는 강한 치우침 없음.",
          },
          {
            term: "독립 조건 (Independence condition)",
            def: "모집단 ≥ 10n (10% 조건).",
          },
        ],
        traps: [
          "조건 점검을 건너뛰고 바로 계산으로 가기 — AP FRQ는 세 조건을 모두 명시적으로 진술·점검·확인하게 해요; 어느 조건 점검이든 빠지면 보통 채점표에서 1점을 잃습니다.",
        ],
        example: null,
      },
    ],
  },
];
