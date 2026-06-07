/**
 * Core Notes 한국어 스토리텔링 버전 — AP Statistics Unit 4 (4.1–4.8 전체).
 * 원본 내용 전량 보존(objectives·terms·traps·diagram) + 일타강사 내러티브.
 * 용어/공식 표기는 원문 그대로 유지. 용어는 "한국어 (English)" 병기.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const AP_STATS_U4_KO: CoreNote[] = [
  {
    lessonId: "ap-statistics-u4-l1",
    courseId: "ap-statistics",
    subjectLabel: "AP Statistics",
    emoji: "📊",
    unit: 4,
    lessonNum: 1,
    unitName: "Probability, Random Variables, and Probability Distributions",
    title: "확률 규칙 — 덧셈과 곱셈",
    subtitle: "곱셈 규칙 단순형을 쓰기 전에 '독립'을 먼저 확인하세요.",
    overview:
      "확률의 두 핵심 규칙: 덧셈 규칙 P(A or B) = P(A) + P(B) − P(A and B)(배반이면 단순화)와 곱셈 규칙 P(A and B) = P(A)·P(B|A)(독립이면 단순화). 여집합 규칙도 자주 써요.",
    objectives: [
      "P(A or B) = P(A) + P(B) − P(A and B); 배반이면 단순화됨을 적용할 수 있다.",
      "P(A and B) = P(A)·P(B|A); 독립이면 단순화됨을 적용할 수 있다.",
    ],
    formulas: [],
    diagram: "boxplot",
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "덧셈 규칙: P(A or B) = P(A) + P(B) − P(A and B), 배반(동시 발생 불가)이면 마지막 항이 0이라 단순화돼요. 곱셈 규칙: P(A and B) = P(A)·P(B|A), 독립이면 P(B|A) = P(B)라 단순화됩니다. 여집합 규칙: P(Aᶜ) = 1 − P(A).",
        keyIdea:
          "덧셈: P(A or B) = P(A)+P(B)−P(A and B). 곱셈: P(A and B) = P(A)·P(B|A). 독립 확인 후에만 P(A)·P(B).",
        table: null,
        terms: [
          {
            term: "여집합 규칙 (Complement rule)",
            def: "P(Aᶜ) = 1 − P(A).",
          },
        ],
        traps: [
          "독립 확인 없이 단순 곱셈 규칙 P(A and B) = P(A)·P(B)를 적용하기 — 먼저 독립을 확인해야 해요; AP는 확률을 주고 곱 규칙을 쓰기 전에 사건이 독립인지 시험합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-statistics-u4-l2",
    courseId: "ap-statistics",
    subjectLabel: "AP Statistics",
    emoji: "📊",
    unit: 4,
    lessonNum: 2,
    unitName: "Probability, Random Variables, and Probability Distributions",
    title: "조건부 확률과 독립",
    subtitle: "배반과 독립은 달라요 — 배반 사건은 (확률이 0이 아닌 한) 독립이 아닙니다.",
    overview:
      "조건부 확률 P(A|B) = P(A and B)/P(B)예요. 독립은 P(A|B) = P(A) — B를 알아도 A의 확률이 안 바뀜. 이원표로 독립을 검정할 수 있습니다.",
    objectives: [
      "이원표로 독립을 검정할 수 있다.",
    ],
    formulas: [],
    diagram: "boxplot",
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "조건부 확률 P(A|B) = P(A and B)/P(B)는 B가 일어났을 때 A의 확률이에요. 독립은 P(A|B) = P(A) — B를 알아도 A의 확률이 변하지 않는 것입니다.",
        keyIdea:
          "P(A|B) = P(A and B)/P(B). 독립 = P(A|B) = P(A). 배반 ≠ 독립.",
        table: null,
        terms: [
          {
            term: "P(A|B) = P(A and B)/P(B)",
            def: "조건부 확률 공식.",
          },
          {
            term: "독립 (Independence)",
            def: "P(A|B) = P(A); B를 알아도 A의 확률이 바뀌지 않음.",
          },
        ],
        traps: [
          "배반과 독립을 혼동하기 — 배반 사건(P(A and B)=0)은 (P(A)=0이 아닌 한) 독립이 아니에요; 두 사건이 동시에 일어날 수 없으면, 하나가 일어났다는 것이 다른 하나에 대해 정보를 줍니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-statistics-u4-l3",
    courseId: "ap-statistics",
    subjectLabel: "AP Statistics",
    emoji: "📊",
    unit: 4,
    lessonNum: 3,
    unitName: "Probability, Random Variables, and Probability Distributions",
    title: "이산 확률 변수 — 기댓값과 분산",
    subtitle: "표준편차가 아니라 '분산'을 더해야 해요.",
    overview:
      "이산 확률 변수의 기댓값 E(X) = Σ[x·P(X=x)](확률 가중 평균)와 분산 Var(X) = Σ[(x−μ)²·P(X=x)], 표준편차 SD(X) = √Var(X)를 다뤄요. 선형 변환 규칙도 핵심입니다.",
    objectives: [
      "Var(X) = Σ[(x−μ)²·P(X=x)]; SD(X) = √Var(X)를 계산할 수 있다.",
    ],
    formulas: [],
    diagram: "boxplot",
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "기댓값 E(X) = Σ[x·P(X=x)]는 확률 가중 평균이에요. 선형 변환: E(aX+b) = aE(X)+b, Var(aX+b) = a²Var(X). 독립 변수의 합은 분산을 더해요 — Var(X+Y) = Var(X)+Var(Y).",
        keyIdea:
          "E(X) = Σ[x·P(X=x)]. 변환: E(aX+b)=aE(X)+b, Var(aX+b)=a²Var(X). 합은 '분산'을 더함.",
        table: null,
        terms: [
          {
            term: "E(X) = Σ[x·P(X=x)]",
            def: "확률 가중 평균.",
          },
          {
            term: "변환 (Transformations)",
            def: "E(aX+b) = aE(X)+b; Var(aX+b) = a²Var(X).",
          },
        ],
        traps: [
          "표준편차를 더하기(분산 대신) — 독립 X, Y에 대해 Var(X+Y) = Var(X)+Var(Y)예요; SD(X+Y) ≠ SD(X)+SD(Y); 분산을 먼저 더한 뒤 제곱근을 취해야 합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-statistics-u4-l4",
    courseId: "ap-statistics",
    subjectLabel: "AP Statistics",
    emoji: "📊",
    unit: 4,
    lessonNum: 4,
    unitName: "Probability, Random Variables, and Probability Distributions",
    title: "이항분포",
    subtitle: "BINS 네 조건을 확인 — 특히 독립(10% 규칙)을 빼먹지 마세요.",
    overview:
      "이항분포는 P(X=k) = C(n,k)pᵏ(1−p)^(n−k)이고, μ = np, σ = √(np(1−p))예요. np≥10이고 n(1−p)≥10이면 정규 근사를 씁니다. 네 조건 BINS(이항·독립·고정 N·동일 p)를 확인해야 해요.",
    objectives: [
      "P(X=k) = C(n,k)pᵏ(1−p)^(n−k)를 계산할 수 있다.",
      "μ = np; σ = √(np(1−p)); np≥10·n(1−p)≥10일 때 정규 근사를 적용할 수 있다.",
    ],
    formulas: [],
    diagram: "boxplot",
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "이항 네 조건은 BINS예요 — 이항 결과(Binary, 성공/실패), 독립(Independent), 고정 시행 수(fixed N), 동일 성공 확률(same p). P(X=k) = C(n,k)pᵏ(1−p)^(n−k), μ = np, σ = √(np(1−p))이고, np≥10·n(1−p)≥10이면 정규 근사가 가능합니다.",
        keyIdea:
          "BINS(이항·독립·고정 N·동일 p). μ=np, σ=√(np(1−p)). np≥10·n(1−p)≥10이면 정규 근사.",
        table: null,
        terms: [
          {
            term: "이항 네 조건 (Four binomial conditions)",
            def: "BINS(이항 Binary, 독립 Independent, 고정 N, 동일 p same p).",
          },
        ],
        traps: [
          "독립 가정이 위반될 때 이항을 쓰기 — 작은 모집단에서 비복원 추출은 독립을 위반해요; 독립이 근사적으로 성립하려면 n이 모집단의 10% 미만인지 확인해야 합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-statistics-u4-l5",
    courseId: "ap-statistics",
    subjectLabel: "AP Statistics",
    emoji: "📊",
    unit: 4,
    lessonNum: 5,
    unitName: "Probability, Random Variables, and Probability Distributions",
    title: "기하분포",
    subtitle: "이항(고정 n에서 성공 횟수)과 기하(첫 성공까지 시행 횟수)는 달라요.",
    overview:
      "기하분포는 첫 성공까지의 시행 횟수예요. P(X=k) = (1−p)^(k−1)·p, E(X) = 1/p, Var(X) = (1−p)/p². 이항과 달리 고정된 시행 수 n이 없습니다.",
    objectives: [
      "E(X) = 1/p; Var(X) = (1−p)/p²를 계산할 수 있다.",
    ],
    formulas: [],
    diagram: "boxplot",
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "기하분포 P(X=k) = (1−p)^(k−1)·p는 첫 성공까지의 시행 횟수예요. E(X) = 1/p, Var(X) = (1−p)/p². 이항과의 차이: 기하는 고정된 n이 없어요 — 성공할 때까지 계속합니다.",
        keyIdea:
          "기하 = 첫 성공까지 시행 횟수. P(X=k)=(1−p)^(k−1)·p, E(X)=1/p. 이항과 달리 고정 n 없음.",
        table: null,
        terms: [
          {
            term: "P(X=k) = (1−p)^(k−1)·p",
            def: "첫 성공까지의 시행 횟수.",
          },
          {
            term: "기하 vs 이항 (Geometric vs. binomial)",
            def: "기하는 고정된 n이 없음.",
          },
        ],
        traps: [
          "이항(고정 n 시행에서 성공 횟수)과 기하(첫 성공까지 시행 횟수)를 혼동하기 — AP는 시나리오를 주고 어느 분포가 적용되는지 시험해요; 고정된 시행 수의 유무가 핵심 구별입니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-statistics-u4-l6",
    courseId: "ap-statistics",
    subjectLabel: "AP Statistics",
    emoji: "📊",
    unit: 4,
    lessonNum: 6,
    unitName: "Probability, Random Variables, and Probability Distributions",
    title: "연속 확률 분포",
    subtitle: "연속분포에서 한 점의 확률은 0이에요 — 구간(면적)만 확률을 가집니다.",
    overview:
      "연속 확률 분포에서는 P(X=a) = 0이고 구간만 0이 아닌 확률을 가져요. 균등분포 f(x) = 1/(b−a) on [a,b], 그리고 누적분포함수 CDF F(x) = P(X≤x)(누적 면적)가 핵심입니다.",
    objectives: [
      "연속분포에서 P(X=a) = 0이고 구간만 0이 아닌 확률을 가짐을 설명할 수 있다.",
    ],
    formulas: [],
    diagram: "boxplot",
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "균등분포(uniform)는 f(x) = 1/(b−a) on [a,b]예요. CDF는 F(x) = P(X≤x)로 누적 면적입니다. 연속분포에서 단일 값의 확률은 0이라, P(a ≤ X ≤ b) = 면적으로 계산해요.",
        keyIdea:
          "연속분포: P(X=a)=0, 구간(면적)만 확률. 균등 f(x)=1/(b−a). CDF F(x)=P(X≤x).",
        table: null,
        terms: [
          {
            term: "균등분포 (Uniform distribution)",
            def: "f(x) = 1/(b−a) on [a,b].",
          },
          {
            term: "CDF (누적분포함수)",
            def: "F(x) = P(X≤x) = 누적 면적.",
          },
        ],
        traps: [
          "연속분포에서 P(X=2.5)를 0이 아닌 값으로 계산하기 — 연속분포에서 단일 값은 확률이 0이에요; P(a ≤ X ≤ b) = 면적으로 계산해야 합니다; AP는 구간을 주고 면적 계산을 기대합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-statistics-u4-l7",
    courseId: "ap-statistics",
    subjectLabel: "AP Statistics",
    emoji: "📊",
    unit: 4,
    lessonNum: 7,
    unitName: "Probability, Random Variables, and Probability Distributions",
    title: "정규분포 계산",
    subtitle: "정규 확률 변수의 합도 정규예요 — 새 평균·분산을 먼저 구하세요.",
    overview:
      "정규분포 계산은 Z로 표준화해 z-표나 계산기 normalcdf를 쓰고, 백분위에서 값을 찾을 땐 invNorm을 써요. 정규 확률 변수의 합도 여전히 정규입니다.",
    objectives: [
      "Z로 표준화해 z-표나 계산기 normalcdf를 사용할 수 있다.",
      "백분위에서 invNorm으로 값을 찾을 수 있다.",
    ],
    formulas: [],
    diagram: "bell-curve",
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "Z로 표준화한 뒤 z-표나 normalcdf로 확률을 구하고, invNorm으로 백분위에서 값을 찾아요. 정규 확률 변수 X, Y가 정규면 X+Y도 정규입니다 — 새 평균 = μ₁+μ₂, 분산 = σ₁²+σ₂²를 먼저 구하세요.",
        keyIdea:
          "표준화 후 normalcdf, 백분위는 invNorm. 정규 RV 합도 정규: 새 평균=μ₁+μ₂, 분산=σ₁²+σ₂².",
        table: null,
        terms: [
          {
            term: "정규 확률 변수 결합 (Combining normal random variables)",
            def: "X, Y가 정규면 X+Y도 정규.",
          },
        ],
        traps: [
          "정규 확률 변수의 합도 정규임을 인식하지 못하기 — AP는 두 정규 RV의 평균과 분산을 주고 그 합에 대한 확률을 물어요; 새 평균 = μ₁+μ₂, 분산 = σ₁²+σ₂²를 먼저 계산해야 합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-statistics-u4-l8",
    courseId: "ap-statistics",
    subjectLabel: "AP Statistics",
    emoji: "📊",
    unit: 4,
    lessonNum: 8,
    unitName: "Probability, Random Variables, and Probability Distributions",
    title: "큰 수의 법칙과 시뮬레이션",
    subtitle: "큰 수의 법칙은 장기 평균 이야기예요 — '도박사의 오류'와 다릅니다.",
    overview:
      "큰 수의 법칙(LLN)은 시행이 늘수록 표본 비율이 참 확률에 가까워지는 것이에요. 도박사의 오류 — 과거 결과가 미래를 '균형 맞춘다'는 — 와 구별하는 게 핵심입니다. 독립 시행에서 과거는 미래 확률을 안 바꿔요.",
    objectives: [
      "시뮬레이션으로 확률을 경험적으로 추정할 수 있다.",
    ],
    formulas: [],
    diagram: "boxplot",
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "큰 수의 법칙(LLN): 시행이 늘수록 표본 비율이 참 확률에 접근해요. 도박사의 오류(gambler's fallacy)는 독립 시행에서 과거 결과가 미래 확률을 바꾼다는 잘못된 믿음입니다. LLN은 장기 평균에 관한 것이지 특정 다음 결과에 관한 게 아니에요.",
        keyIdea:
          "LLN = 시행 ↑ → 표본 비율이 참 확률에 접근(장기 평균). 도박사의 오류 = 과거가 미래 바꾼다는 오해.",
        table: null,
        terms: [
          {
            term: "큰 수의 법칙 (LLN)",
            def: "n이 커질수록 표본 비율이 참 확률에 접근함.",
          },
          {
            term: "도박사의 오류 (Gambler's fallacy)",
            def: "독립 시행에서 과거 결과가 미래 확률을 바꾸지 않음(오해).",
          },
        ],
        traps: [
          "LLN(비율 수렴)과 도박사의 오류(각 시행이 '균형 맞추려' 확률이 바뀜)를 혼동하기 — 개별 시행은 독립이에요; LLN은 장기 평균에 관한 것이지 특정 다음 결과에 관한 게 아닙니다.",
        ],
        example: null,
      },
    ],
  },
];
