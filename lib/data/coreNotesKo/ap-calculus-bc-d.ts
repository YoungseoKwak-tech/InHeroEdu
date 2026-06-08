/**
 * Core Notes 한국어 스토리텔링 버전 — AP Calculus BC Unit 10 (10.1–10.8).
 * Infinite Sequences and Series. 원본 필드 전량 보존(objectives·formulas·terms·traps 포함)
 * + 일타강사 내러티브 overview 추가. 용어는 "한국어 (English)" 병기, 수식은 깔끔한 표기.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const AP_CALCULUS_BC_D_KO: CoreNote[] = [
  {
    lessonId: "ap-calculus-bc-u10-l1",
    courseId: "ap-calculus-bc",
    subjectLabel: "AP Calculus BC",
    emoji: "∫",
    unit: 10,
    lessonNum: 1,
    unitName: "Infinite Sequences and Series",
    title: "수열의 수렴 (Convergence of Sequences)",
    subtitle: "수열이 어디로 향하는가 — 극한이 존재하면 수렴, 그게 전부의 출발점입니다.",
    overview:
      "수열(sequence) {aₙ}은 그냥 번호 매겨진 숫자들의 행렬이에요. 우리가 묻는 단 하나의 질문은 'n이 무한대로 갈 때 이 숫자들이 한 값으로 다가가는가?'입니다 — 다가가면 수렴(converge), 아니면 발산(diverge). 극한을 구할 땐 ∞/∞나 0/0 꼴이면 로피탈, 위아래로 끼이면 압축정리(squeeze theorem)를 씁니다. 시험의 함정: 수열의 수렴과 급수의 수렴을 헷갈리는 것 — aₙ=1/n은 0으로 수렴하지만 Σ1/n은 발산해요. 이 단원 전체에서 이 구분이 평생 따라다닙니다.",
    objectives: [
      "∞/∞ 또는 0/0 꼴 수열 극한에 로피탈 정리(L'Hôpital)를 적용할 수 있다.",
      "수열에 압축정리(squeeze theorem)를 적용할 수 있다.",
    ],
    formulas: [
      "Geometric: Σarⁿ=a/(1−r), |r|<1",
      "p-series: converges iff p>1",
      "eˣ=Σxⁿ/n!",
    ],
    diagram: null,
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "단조수렴정리 (Monotone convergence theorem)",
            def: "유계(bounded)이면서 단조(monotone)인 수열은 반드시 수렴한다.",
          },
        ],
        traps: [
          "수열의 수렴과 급수의 수렴을 혼동하는 것 — 수열 {aₙ}은 급수 Σaₙ이 발산해도 수렴할 수 있어요 (예: aₙ=1/n은 0으로 수렴하지만 Σ1/n은 발산). AP BC가 바로 이 구분을 노립니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-calculus-bc-u10-l2",
    courseId: "ap-calculus-bc",
    subjectLabel: "AP Calculus BC",
    emoji: "∫",
    unit: 10,
    lessonNum: 2,
    unitName: "Infinite Sequences and Series",
    title: "급수 수렴 판정법 — 전체 도구상자 (Series Convergence Tests — The Full Toolkit)",
    subtitle: "급수마다 맞는 판정법이 따로 있어요 — 도구를 고르는 눈이 점수를 가릅니다.",
    overview:
      "급수 Σaₙ이 수렴하는지 판단하는 도구는 여러 개예요 — 비교판정(comparison), 극한비교(limit comparison), 비판정(ratio), 근판정(root), 적분판정(integral). 각각 잘 듣는 급수가 따로 있습니다. 핵심은 '이 급수엔 어떤 판정법인가'를 한눈에 고르는 거예요. 시험의 함정: p-급수나 기하급수에 비판정법을 들이대면 L=1이 나와서 무조건 '판정 불가'가 됩니다 — 이런 급수엔 p-급수 판정·기하급수 공식을 바로 써야 해요. AP BC는 '맞는 판정법 고르기' 자체를 평가합니다.",
    objectives: [
      "비교판정, 극한비교판정, 비판정, 근판정, 적분판정을 적용할 수 있다.",
    ],
    formulas: [
      "Geometric: Σarⁿ=a/(1−r), |r|<1",
      "p-series: converges iff p>1",
      "eˣ=Σxⁿ/n!",
    ],
    diagram: null,
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "기하급수 (Geometric series)",
            def: "Σarⁿ은 |r|<1일 때만 수렴하고, 그 합은 a/(1−r).",
          },
          {
            term: "p-급수 (p-series)",
            def: "Σ1/nᵖ은 p>1일 때만 수렴한다.",
          },
        ],
        traps: [
          "p-급수나 기하급수에 비판정법(ratio test)을 쓰는 것 — 비판정법은 p-급수에서 L=1이 나와 '판정 불가'가 됩니다. p-급수엔 p-급수 판정을 바로 쓰세요. AP BC는 주어진 급수에 맞는 판정법을 고르는 능력을 봅니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-calculus-bc-u10-l3",
    courseId: "ap-calculus-bc",
    subjectLabel: "AP Calculus BC",
    emoji: "∫",
    unit: 10,
    lessonNum: 3,
    unitName: "Infinite Sequences and Series",
    title: "교대급수와 오차 한계 (Alternating Series and Error Bound)",
    subtitle: "부호가 번갈아 바뀌면 특별한 규칙이 생겨요 — 오차까지 공짜로 잡아줍니다.",
    overview:
      "교대급수(alternating series)는 +,−,+,− 부호가 번갈아 나오는 급수예요. 이런 급수는 항의 절댓값 |aₙ|이 감소하면서 0으로 가면 수렴합니다 — 이게 교대급수 판정법이에요. 게다가 덤으로, 부분합의 오차는 '버린 첫 항' 이하로 묶입니다 — 오차 한계를 거의 공짜로 얻는 거죠. 함정: 교대급수라고 무조건 수렴하는 게 아니에요. |aₙ|이 감소하고 0으로 가는 두 조건을 반드시 확인해야 합니다. |aₙ|이 0으로 안 가면 교대여도 발산해요 — AP가 이 필요조건을 노립니다.",
    objectives: [
      "절대수렴(absolute)과 조건수렴(conditional)을 구분할 수 있다.",
    ],
    formulas: [
      "Geometric: Σarⁿ=a/(1−r), |r|<1",
      "p-series: converges iff p>1",
      "eˣ=Σxⁿ/n!",
    ],
    diagram: null,
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "교대급수 판정법 (Alternating series test)",
            def: "부호가 번갈아 바뀌고, |aₙ|이 감소하면서 0으로 가면 수렴한다.",
          },
          {
            term: "교대급수 오차 한계 (Alternating series error bound)",
            def: "|오차| ≤ 버린 첫 항(첫 번째 생략된 항)의 크기.",
          },
        ],
        traps: [
          "교대급수는 항상 수렴한다고 착각하는 것 — 항이 감소하면서(decreasing) 동시에 0으로 가는지(→0) 반드시 확인해야 해요. |aₙ|이 0으로 가지 않으면 교대급수라도 발산합니다. AP가 이 필요조건을 시험합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-calculus-bc-u10-l4",
    courseId: "ap-calculus-bc",
    subjectLabel: "AP Calculus BC",
    emoji: "∫",
    unit: 10,
    lessonNum: 4,
    unitName: "Infinite Sequences and Series",
    title: "멱급수 — 수렴 반지름과 수렴 구간 (Power Series — Radius and Interval of Convergence)",
    subtitle: "x가 어디까지 멀어져도 급수가 살아남는가 — 그 경계를 찾는 작업입니다.",
    overview:
      "멱급수(power series)는 x를 품은 급수라서, 'x가 어떤 값일 때 수렴하는가'가 새로운 질문이 돼요. 비판정법(ratio test)을 쓰면 중심으로부터 수렴 반지름(radius of convergence) R이 나옵니다 — |x−중심|<R이면 수렴이에요. 그런데 정확히 |x−중심|=R인 끝점(endpoint)에서는 비판정법이 L=1이라 판정 불가가 됩니다. 그래서 끝점은 따로 대입해서 검사해야 해요. 함정: 반지름만 구하고 끝나면 안 됩니다 — 수렴 구간(interval of convergence)을 완성하려면 양쪽 끝점을 각각 대입해 수렴/발산을 따져야 해요.",
    objectives: [
      "비판정법으로 수렴 반지름 R을 구할 수 있다.",
      "끝점을 따로 검사할 수 있다 (비판정법은 끝점에서 판정 불가).",
      "수렴 구간(interval)과 수렴 반지름(radius)을 구분할 수 있다.",
    ],
    formulas: [
      "Geometric: Σarⁿ=a/(1−r), |r|<1",
      "p-series: converges iff p>1",
      "eˣ=Σxⁿ/n!",
    ],
    diagram: null,
    sections: [
      {
        title: "멱급수 — 수렴 반지름과 수렴 구간",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [],
        traps: [
          "반지름을 구한 뒤 끝점 검사를 잊는 것 — 수렴 구간(interval of convergence)을 완성하려면 양쪽 끝점을 대입해 각각 확인해야 해요. 각 끝점은 수렴할 수도, 발산할 수도 있으니 따로따로 검사해야 합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-calculus-bc-u10-l5",
    courseId: "ap-calculus-bc",
    subjectLabel: "AP Calculus BC",
    emoji: "∫",
    unit: 10,
    lessonNum: 5,
    unitName: "Infinite Sequences and Series",
    title: "테일러·매클로린 급수 — 다항식 근사 만들기 (Taylor and Maclaurin Series — Building Polynomial Approximations)",
    subtitle: "복잡한 함수를 무한 다항식으로 바꿔치기 — 아는 급수를 재활용하는 게 비법입니다.",
    overview:
      "테일러 급수(Taylor series)는 함수를 (x−a)의 거듭제곱으로 펼친 무한 다항식이에요 — 중심이 a=0이면 매클로린 급수(Maclaurin series)라 부릅니다. 계수는 미분값 f⁽ⁿ⁾(a)/n!로 정해져요. 핵심 비법은, 매번 0부터 미분하지 말고 아는 급수(eˣ, sin x, cos x, 1/(1−x), ln(1+x))를 대입·미분으로 변형해 새 급수를 만드는 겁니다. 함정: AP BC가 sin(x²)을 물으면 sin x 급수에 x² 대입을 기대해요 — 처음부터 다시 유도하지 마세요. 아는 급수에서 만드는 게 빠르고 실수도 적습니다.",
    objectives: [
      "아는 급수에서 대입·미분으로 새 급수를 만들 수 있다.",
    ],
    formulas: [
      "Geometric: Σarⁿ=a/(1−r), |r|<1",
      "p-series: converges iff p>1",
      "eˣ=Σxⁿ/n!",
    ],
    diagram: null,
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "a에서의 테일러 급수 (Taylor series centered at a)",
            def: "Σ[f⁽ⁿ⁾(a)/n!](x−a)ⁿ",
          },
          {
            term: "자주 나오는 매클로린 급수 (Common Maclaurin series)",
            def: "eˣ, sin x, cos x, 1/(1−x), ln(1+x)",
          },
        ],
        traps: [
          "아는 매클로린 급수로 새 급수를 만들지 않는 것 — AP BC는 sin(x²)을 주면 sin x 급수에 대입(substitution)하길 기대하지, 처음부터 재유도하길 원하지 않아요. 아는 급수에서 만드는 게 더 빠르고 실수도 적습니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-calculus-bc-u10-l6",
    courseId: "ap-calculus-bc",
    subjectLabel: "AP Calculus BC",
    emoji: "∫",
    unit: 10,
    lessonNum: 6,
    unitName: "Infinite Sequences and Series",
    title: "테일러 다항식 오차 — 라그랑주 나머지 (Taylor Polynomial Error — Lagrange Remainder)",
    subtitle: "근사가 얼마나 빗나가는가 — 라그랑주가 오차의 천장을 보장해 줍니다.",
    overview:
      "테일러 다항식으로 함수를 근사하면 당연히 오차가 생겨요. 라그랑주 오차 한계(Lagrange error bound)는 그 오차가 절대 넘지 못하는 '천장'을 줍니다: |오차| ≤ M·|x−a|⁽ⁿ⁺¹⁾/(n+1)!, 여기서 M은 구간에서 |f⁽ⁿ⁺¹⁾|의 최댓값이에요. 이걸로 '원하는 정확도를 맞추려면 몇 차까지 필요한가'를 거꾸로 풀 수 있어요. 함정: M을 어떤 한 점 c에서의 미분값으로 잡으면 안 됩니다 — M은 a부터 x까지 구간 전체에서 |f⁽ⁿ⁺¹⁾|의 '최댓값'이어야 해요. AP가 오차 한계를 물으면 이 M을 정확히 짚어야 점수가 납니다.",
    objectives: [
      "오차 한계로 주어진 정확도에 필요한 차수를 정할 수 있다.",
      "테일러 오차와 교대급수 오차 한계를 비교할 수 있다.",
    ],
    formulas: [
      "Geometric: Σarⁿ=a/(1−r), |r|<1",
      "p-series: converges iff p>1",
      "eˣ=Σxⁿ/n!",
    ],
    diagram: null,
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "라그랑주 오차 한계 (Lagrange error bound)",
            def: "|오차| ≤ M·|x−a|⁽ⁿ⁺¹⁾/(n+1)!, 여기서 M = 구간에서 max|f⁽ⁿ⁺¹⁾|.",
          },
        ],
        traps: [
          "M을 어떤 점 c에서의 미분값으로 잡고, 구간 최댓값으로 잡지 않는 것 — M은 a부터 x까지 구간 전체에서 |f⁽ⁿ⁺¹⁾|의 '최댓값(MAXIMUM)'이어야 해요. AP가 오차 한계를 물으면 올바른 M을 짚는 게 핵심입니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-calculus-bc-u10-l7",
    courseId: "ap-calculus-bc",
    subjectLabel: "AP Calculus BC",
    emoji: "∫",
    unit: 10,
    lessonNum: 7,
    unitName: "Infinite Sequences and Series",
    title: "멱급수의 연산 (Operations on Power Series)",
    subtitle: "급수도 항별로 미분·적분·곱셈이 됩니다 — 이게 어려운 적분을 푸는 열쇠예요.",
    overview:
      "멱급수는 수렴 반지름(ROC) 안에서라면 항별(term-by-term)로 미분·적분할 수 있고, 서로 곱할 수도 있어요. 그래서 eˣsin x 같은 곱의 급수도 만들고, ∫(sin x/x)dx처럼 보통은 못 푸는 적분도 급수를 적분해서 처리합니다. 함정: 항별로 적분할 땐 적분상수 +C와 이동된 지수(shifted index)를 꼭 챙겨야 해요. AP BC가 1/(1−x) 급수를 적분해 ln(1−x) 급수를 구하라고 하면, +C를 빼먹는 순간 답이 틀립니다.",
    objectives: [
      "수렴 반지름(ROC) 안에서 멱급수를 항별로 미분·적분할 수 있다.",
      "eˣsin x 같은 곱을 위해 멱급수를 곱할 수 있다.",
      "급수 적분으로 ∫(sin x/x)dx 같은 적분을 계산할 수 있다.",
    ],
    formulas: [
      "Geometric: Σarⁿ=a/(1−r), |r|<1",
      "p-series: converges iff p>1",
      "eˣ=Σxⁿ/n!",
    ],
    diagram: null,
    sections: [
      {
        title: "멱급수의 연산",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [],
        traps: [
          "멱급수를 미분·적분하면서 적분상수 C와 이동된 지수(shifted index)를 챙기지 않는 것 — AP BC는 1/(1−x) 급수를 적분해 ln(1−x) 급수를 구하라고 합니다. 반드시 +C를 포함해야 해요.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-calculus-bc-u10-l8",
    courseId: "ap-calculus-bc",
    subjectLabel: "AP Calculus BC",
    emoji: "∫",
    unit: 10,
    lessonNum: 8,
    unitName: "Infinite Sequences and Series",
    title: "응용 문제 속의 급수 — 테일러 다항식 활용 (Series in Applied Problems — Using Taylor Polynomials)",
    subtitle: "급수는 계산 도구예요 — 함수값 근사도, 까다로운 극한도 급수 한 방으로 풀립니다.",
    overview:
      "급수는 이론으로 끝나지 않아요 — 실전 계산 도구입니다. n차 테일러 다항식으로 함수값을 근사하고, 까다로운 극한도 급수로 풀어요. 특히 어떤 극한은 로피탈보다 테일러 급수가 훨씬 빠릅니다. 함정: lim(1−cos x)/x²는 cos x ≈ 1 − x²/2 + … 급수를 대입하면 즉시 보이지만, 로피탈을 두 번 적용하면 지저분해요. AP BC는 '더 효율적인 방법을 알아채는 것' 자체에 점수를 줍니다 — 어느 도구가 빠른지 보는 눈을 기르세요.",
    objectives: [
      "n차 테일러 다항식으로 함수값을 근사할 수 있다.",
      "급수로 어려운 극한을 계산할 수 있다 (어떤 경우엔 로피탈보다 낫다).",
    ],
    formulas: [
      "Geometric: Σarⁿ=a/(1−r), |r|<1",
      "p-series: converges iff p>1",
      "eˣ=Σxⁿ/n!",
    ],
    diagram: null,
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "오차 분석 (Error analysis)",
            def: "테일러 근사가 언제 '충분히 좋은가'를 따지는 것.",
          },
        ],
        traps: [
          "테일러 급수로 극한 문제를 단순화하지 않는 것 — lim(1−cos x)/x²는 테일러(cos x ≈ 1 − x²/2 + …)로 쉽게 풀리지만 로피탈을 두 번 쓰면 번거로워요. AP BC는 더 효율적인 방법을 알아채는 것에 점수를 줍니다.",
        ],
        example: null,
      },
    ],
  },
];
