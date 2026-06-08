/**
 * Core Notes 한국어 스토리텔링 버전 — AP Calculus BC Units 6–8 (적분 기법·미분방정식·적분 응용).
 * 원본 내용 전량 보존(objectives·formulas·diagram·terms·traps 포함) + 일타강사 내러티브.
 * 원본에는 body가 없어 한국어 overview를 새로 추가했고, 용어는 "한국어 (English)" 병기.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const AP_CALCULUS_BC_B_KO: CoreNote[] = [
  {
    lessonId: "ap-calculus-bc-u6-l1",
    courseId: "ap-calculus-bc",
    subjectLabel: "AP Calculus BC",
    emoji: "∫",
    unit: 6,
    lessonNum: 1,
    unitName: "Integration and Accumulation of Change",
    title: "부분적분 — 언제, 어떻게 쓰는가",
    subtitle: null,
    overview:
      "부분적분(integration by parts)은 곱으로 된 함수를 적분할 때 꺼내는 무기예요. 핵심 공식은 ∫u dv = uv − ∫v du 하나뿐이지만, 진짜 승부는 'u를 무엇으로 고르느냐'에서 갈립니다. LIATE 순서(로그·역삼각·대수·삼각·지수)로 u를 고르면 ∫v du가 원래보다 쉬워져요. 시험 함정은 바로 이 선택을 거꾸로 해서 적분이 더 복잡해지는 경우입니다 — 미분했을 때 단순해지는 쪽을 u로 잡으세요.",
    objectives: [
      "∫u dv = uv − ∫v du; u를 고를 때는 LIATE 순서를 따른다.",
      "반복 부분적분에는 표 적분법(tabular integration)을 활용한다.",
      "적분 한계를 적용한 부분적분으로 정적분을 계산한다.",
    ],
    formulas: [
      "FTC: ∫ₐᵇ f dx = F(b)−F(a)",
      "d/dx ∫ₐˣ f(t)dt = f(x)",
      "∫(1/x)dx = ln|x|+C",
    ],
    diagram: "area-under-curve",
    sections: [
      {
        title: "부분적분 — 언제, 어떻게 쓰는가",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [],
        traps: [
          "미분했을 때 더 복잡해지는 함수를 u로 고르는 실수 — LIATE(Logarithm 로그, Inverse trig 역삼각, Algebraic 대수, Trigonometric 삼각, Exponential 지수) 순서에서 가장 먼저 해당하는 종류를 u로 잡으세요.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-calculus-bc-u6-l2",
    courseId: "ap-calculus-bc",
    subjectLabel: "AP Calculus BC",
    emoji: "∫",
    unit: 6,
    lessonNum: 2,
    unitName: "Integration and Accumulation of Change",
    title: "부분분수 분해와 유리함수 적분",
    subtitle: null,
    overview:
      "분모가 인수로 쪼개지는 유리함수를 만나면, 부분분수 분해(partial fractions)로 ∫1/(x−a)dx = ln|x−a|+C 같은 익숙한 적분의 합으로 바꿔버립니다. A/(x−r)(x−s) 꼴을 A/(x−r)+B/(x−s)로 나누는 게 핵심이에요. 시험에서 가장 많이 깨지는 지점은 분자 차수가 분모 차수 이상일 때 — 이때는 반드시 다항식 나눗셈(long division)을 먼저 해서 진분수로 만들어야 분해가 됩니다.",
    objectives: [
      "A/(x−r)(x−s) 꼴을 부분분수로 분해한다.",
      "부분분수에서 나온 ∫1/(x−a)dx = ln|x−a|+C 를 적분한다.",
      "분자 차수가 분모 차수 이상이면 다항식 나눗셈을 먼저 한다.",
    ],
    formulas: [
      "FTC: ∫ₐᵇ f dx = F(b)−F(a)",
      "d/dx ∫ₐˣ f(t)dt = f(x)",
      "∫(1/x)dx = ln|x|+C",
    ],
    diagram: "area-under-curve",
    sections: [
      {
        title: "부분분수 분해와 유리함수 적분",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [],
        traps: [
          "분자 차수 ≥ 분모 차수인데 다항식 나눗셈을 건너뛰는 실수 — 부분분수 분해는 진분수에만 통합니다. 먼저 나눠서 '다항식 + 진분수' 형태로 만든 뒤 분해하세요.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-calculus-bc-u6-l3",
    courseId: "ap-calculus-bc",
    subjectLabel: "AP Calculus BC",
    emoji: "∫",
    unit: 6,
    lessonNum: 3,
    unitName: "Integration and Accumulation of Change",
    title: "이상적분 — 무한 구간과 불연속점",
    subtitle: null,
    overview:
      "이상적분(improper integral)은 적분 구간이 무한대로 뻗거나(Type I) 구간 안에 불연속점이 있을 때(Type II) 다루는 적분이에요. 핵심은 ∞를 그냥 대입하지 않고 반드시 극한(limit)으로 바꿔 쓴다는 점입니다. 그러면 그 극한이 유한한 값으로 모이느냐(수렴) 발산하느냐(발산)를 따질 수 있어요. 시험 FRQ에서 lim 표기를 생략하고 ∞를 바로 넣으면 감점되니 — 극한 기호를 명시적으로 쓰는 게 채점 포인트입니다.",
    objectives: [
      "Integration and Accumulation of Change 단원의 이상적분(무한 구간과 불연속점)을 완전히 익힌다.",
    ],
    formulas: [
      "FTC: ∫ₐᵇ f dx = F(b)−F(a)",
      "d/dx ∫ₐˣ f(t)dt = f(x)",
      "∫(1/x)dx = ln|x|+C",
    ],
    diagram: "area-under-curve",
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "제1형 (Type I)",
            def: "무한 구간 → ∫ₐ^∞ f dx = lim_{b→∞} ∫ₐᵇ f dx 로 정의한다.",
          },
          {
            term: "제2형 (Type II)",
            def: "피적분함수가 불연속인 경우 → 불연속점에서 극한을 취한다.",
          },
          {
            term: "수렴/발산 (Convergence/divergence)",
            def: "p-적분 ∫₁^∞ 1/xᵖ dx 는 p>1 일 때만 수렴한다.",
          },
        ],
        traps: [
          "이상적분을 극한으로 바꾸지 않고 계산하는 실수 — 반드시 lim 으로 쓰고 명시적으로 극한을 취해야 합니다. AP FRQ는 ∞를 그냥 대입하는 게 아니라 극한 표기를 보여줄 것을 요구해요.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-calculus-bc-u6-l4",
    courseId: "ap-calculus-bc",
    subjectLabel: "AP Calculus BC",
    emoji: "∫",
    unit: 6,
    lessonNum: 4,
    unitName: "Integration and Accumulation of Change",
    title: "u-치환과 삼각치환",
    subtitle: null,
    overview:
      "적분의 두 핵심 치환을 다룹니다. u-치환은 합성함수의 안쪽을 u로 묶는 기본기고, 삼각치환(trig substitution)은 √(a²−x²), √(a²+x²), √(x²−a²) 같은 근호를 삼각함수로 풀어내는 고급 기술이에요. 근호의 형태를 보고 x=asinθ, x=atanθ, x=asecθ 중 무엇을 쓸지 결정하고, 필요하면 완전제곱(completing the square)으로 형태부터 정리합니다. BC 시험 함정은 치환 변수의 범위를 제한하지 않는 것 — x=asinθ면 θ∈[−π/2, π/2]를 명시하고 정확히 되돌려야 해요.",
    objectives: [
      "√(a²−x²), √(a²+x²), √(x²−a²)에 대한 삼각치환을 수행한다.",
      "삼각치환이나 arctan 형태를 만들기 위해 완전제곱을 한다.",
      "피적분함수의 형태를 보고 알맞은 치환을 선택한다.",
    ],
    formulas: [
      "FTC: ∫ₐᵇ f dx = F(b)−F(a)",
      "d/dx ∫ₐˣ f(t)dt = f(x)",
      "∫(1/x)dx = ln|x|+C",
    ],
    diagram: "area-under-curve",
    sections: [
      {
        title: "u-치환과 삼각치환",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [],
        traps: [
          "치환 변수의 범위를 제한하지 않고 삼각치환을 쓰는 실수 — x = asinθ 라면 θ ∈ [−π/2, π/2] 가 필요합니다. AP BC는 이 제한을 명시하고 원래 변수로 정확히 되돌리는 것까지 요구해요.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-calculus-bc-u6-l5",
    courseId: "ap-calculus-bc",
    subjectLabel: "AP Calculus BC",
    emoji: "∫",
    unit: 6,
    lessonNum: 5,
    unitName: "Integration and Accumulation of Change",
    title: "매개변수·극좌표 함수의 적분",
    subtitle: null,
    overview:
      "곡선이 매개변수(parametric)나 극좌표(polar)로 주어질 때의 넓이와 호의 길이를 구합니다. 매개변수 곡선 아래 넓이는 A=∫y dx=∫y(t)x'(t)dt 로, 극좌표 넓이는 A=½∫r² dθ 로 계산해요. 여기서 가장 자주 틀리는 게 극좌표 넓이의 ½ 인자입니다 — AP가 매번 노리는 함정이니, ∫r²가 아니라 ½∫r² 임을 잊지 마세요. 그리고 곡선 설명에서 적분 한계 θ₁, θ₂를 정확히 읽어내는 것도 함께 챙겨야 합니다.",
    objectives: [
      "Integration and Accumulation of Change 단원의 매개변수·극좌표 함수 적분을 완전히 익힌다.",
    ],
    formulas: [
      "FTC: ∫ₐᵇ f dx = F(b)−F(a)",
      "d/dx ∫ₐˣ f(t)dt = f(x)",
      "∫(1/x)dx = ln|x|+C",
    ],
    diagram: "area-under-curve",
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "매개변수 곡선 아래 넓이 (Area under parametric curve)",
            def: "A = ∫y dx = ∫y(t)x'(t)dt",
          },
          {
            term: "극좌표 넓이 (Area in polar)",
            def: "A = ½∫r² dθ",
          },
          {
            term: "극좌표 호의 길이 (Arc length for polar)",
            def: "L = ∫√(r² + (dr/dθ)²) dθ",
          },
        ],
        traps: [
          "극좌표 넓이 공식에서 ½ 인자를 빠뜨리는 실수 — A = ½∫r² dθ 이지 ∫r² dθ 가 아닙니다. AP는 이 인자를 끈질기게 시험해요. 또한 곡선 설명에서 적분 한계 θ₁, θ₂ 를 정확히 찾아야 합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-calculus-bc-u7-l1",
    courseId: "ap-calculus-bc",
    subjectLabel: "AP Calculus BC",
    emoji: "∫",
    unit: 7,
    lessonNum: 1,
    unitName: "Differential Equations",
    title: "분리형 미분방정식과 로지스틱 성장 — BC 심화",
    subtitle: null,
    overview:
      "변수를 양쪽으로 분리해 ∫g(y)dy=∫f(x)dx 로 푸는 분리형 미분방정식(separable DE)을, BC에서는 로지스틱 성장(logistic growth)까지 끌고 갑니다. 로지스틱 모형 dP/dt=kP(1−P/M)은 초기엔 지수적으로 폭발하다가 수용 한계 M에 가까워지며 평탄해지는 S자 곡선을 그려요. dP/dt의 부호로 평형점의 안정성도 분석합니다. BC FRQ의 핵심 함정은 명시적 해 P(t)를 끝까지 구하라는 것 — 1/[P(M−P)]를 부분분수로 적분해서 P에 대해 정리해야 만점입니다.",
    objectives: [
      "로지스틱 미분방정식을 부분분수와 적분으로 푼다.",
      "dP/dt의 부호로 평형점의 안정성을 분석한다.",
      "초기(지수적) 단계와 후기(평탄화) 단계에서 로지스틱 거동을 근사한다.",
    ],
    formulas: [
      "분리형: ∫g(y)dy=∫f(x)dx",
      "지수: y=y₀eᵏᵗ",
      "로지스틱: dP/dt=kP(1−P/M)",
    ],
    diagram: null,
    sections: [
      {
        title: "분리형 미분방정식과 로지스틱 성장 — BC 심화",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [],
        traps: [
          "로지스틱 미분방정식을 끝까지 풀지 않는 실수 — AP BC FRQ는 명시적 해 P(t)를 요구합니다. 1/[P(M−P)]를 부분분수로 적분하고 P에 대해 풀어내야 해요.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-calculus-bc-u7-l2",
    courseId: "ap-calculus-bc",
    subjectLabel: "AP Calculus BC",
    emoji: "∫",
    unit: 7,
    lessonNum: 2,
    unitName: "Differential Equations",
    title: "오일러 방법과 수치 오차 분석",
    subtitle: null,
    overview:
      "오일러 방법(Euler's method)은 미분방정식의 해를 손으로 풀 수 없을 때, 접선을 따라 한 걸음씩 나아가며 해를 근사하는 수치 기법이에요. 보폭(step size)이 작을수록 정확해지죠. 여기서 BC가 노리는 핵심은 오차의 방향을 해곡선의 오목성(concavity)과 연결하는 것 — 위로 볼록(아래로 오목)이면 과대평가, 아래로 볼록(위로 오목)이면 과소평가입니다. 개선된 오일러(헌 방법, Heun's method) 개념까지 함께 이해해 두세요.",
    objectives: [
      "서로 다른 보폭에서 오일러 방법의 정확도를 비교한다.",
      "해곡선의 오목성으로 오차의 방향을 판단한다.",
      "개선된 오일러(헌 방법, Heun's) 방법의 개념을 이해한다.",
    ],
    formulas: [
      "분리형: ∫g(y)dy=∫f(x)dx",
      "지수: y=y₀eᵏᵗ",
      "로지스틱: dP/dt=kP(1−P/M)",
    ],
    diagram: null,
    sections: [
      {
        title: "오일러 방법과 수치 오차 분석",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [],
        traps: [
          "오일러 오차의 방향을 오목성과 연결하지 못하는 실수 — 곡선이 아래로 오목(concave down)이면 과대평가, 위로 오목(concave up)이면 과소평가입니다. AP BC는 근사값이 과대인지 과소인지 그 근거를 대라고 요구해요.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-calculus-bc-u8-l1",
    courseId: "ap-calculus-bc",
    subjectLabel: "AP Calculus BC",
    emoji: "∫",
    unit: 8,
    lessonNum: 1,
    unitName: "Applications of Integration",
    title: "넓이와 부피 — BC의 적분 응용 기법",
    subtitle: null,
    overview:
      "적분을 실제 도형에 적용해 넓이와 부피를 구하는 단원이에요. 넓이는 ∫(위−아래)dx, 회전체 부피는 원판(disk) V=π∫[R(x)]²dx 와 더불어 워셔(washer)·셸(shell) 방법을 회전축에 맞춰 골라 씁니다. BC에서는 매개변수 곡선의 부피, 그리고 두 극좌표 곡선 사이의 넓이 A=½∫(r_바깥²−r_안쪽²)dθ 까지 확장돼요. 함정은 극좌표 넓이의 적분 한계 — r₁(θ)=r₂(θ)로 교점을 찾아 영역을 정확히 잡아야 합니다.",
    objectives: [
      "매개변수 곡선으로부터 부피를 구한다.",
      "모든 회전축에 대해 셸·원판·워셔 방법을 적용한다.",
    ],
    formulas: [
      "넓이=∫(위−아래)dx",
      "원판: V=π∫[R(x)]²dx",
      "거리=∫|v(t)|dt",
    ],
    diagram: "area-under-curve",
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "두 극좌표 곡선 사이의 넓이 (Area between polar curves)",
            def: "A = ½∫(r_바깥² − r_안쪽²)dθ",
          },
        ],
        traps: [
          "두 극좌표 곡선 사이 넓이에서 적분 한계를 잘못 잡는 실수 — r₁(θ)=r₂(θ)로 교점을 구하고, 그 한계가 영역을 정확히 담아내야 합니다. AP BC는 두 극좌표 곡선을 주고 올바른 식 세우기를 요구해요.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-calculus-bc-u8-l2",
    courseId: "ap-calculus-bc",
    subjectLabel: "AP Calculus BC",
    emoji: "∫",
    unit: 8,
    lessonNum: 2,
    unitName: "Applications of Integration",
    title: "여러 좌표계에서의 호의 길이",
    subtitle: null,
    overview:
      "호의 길이(arc length)는 곡선이 어떤 좌표계로 주어지느냐에 따라 공식이 달라집니다. 직교좌표는 L=∫√(1+[f'(x)]²)dx, 매개변수는 L=∫√(x'²+y'²)dt, 극좌표는 L=∫√(r²+(dr/dθ)²)dθ 예요. BC 시험은 곡선을 세 형태 중 하나로 주고 알맞은 공식을 골라 적용하길 요구합니다. 가장 헷갈리는 건 극좌표 호의 길이 — 형태를 먼저 정확히 식별하는 습관을 들이세요.",
    objectives: [
      "Applications of Integration 단원의 여러 좌표계에서의 호의 길이를 완전히 익힌다.",
    ],
    formulas: [
      "넓이=∫(위−아래)dx",
      "원판: V=π∫[R(x)]²dx",
      "거리=∫|v(t)|dt",
    ],
    diagram: "area-under-curve",
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "직교좌표 (Cartesian)",
            def: "L = ∫√(1+[f'(x)]²)dx",
          },
          {
            term: "매개변수 (Parametric)",
            def: "L = ∫√(x'²+y'²)dt",
          },
          {
            term: "극좌표 (Polar)",
            def: "L = ∫√(r²+(dr/dθ)²)dθ",
          },
        ],
        traps: [
          "어떤 호의 길이 공식을 써야 하는지 헷갈리는 실수 — AP BC는 곡선을 세 형태 중 하나로 줍니다. 형태를 식별하고 그에 맞는 공식을 적용하세요. 극좌표 호의 길이가 가장 자주 혼동됩니다.",
        ],
        example: null,
      },
    ],
  },
];
