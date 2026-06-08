/**
 * 수학 교육 (/parents/math) — US math curriculum, mapped to the Korean system.
 *
 * Three reference tables Korean parents ask about:
 *   1) US course progression by grade × track (Regular / Honor / Highly Advanced)
 *   2) what each US course actually covers (English term + Korean gloss)
 *   3) the Korean middle-school 과정 by semester, for direct comparison
 * plus a US↔KR level summary and the 서술형 vs 단답형 culture difference.
 *
 * Content transcribed from a 유학 math-curriculum briefing; conservative and
 * factual. Tracks/placement vary by school district — framed as typical.
 */

export const TRACKS = ["Regular", "Honor", "Highly Advanced"] as const;
export type Track = (typeof TRACKS)[number];

/** US course progression: grade → course per track. */
export interface GradeRow {
  grade: string;          // e.g. "6th"
  regular: string;
  honor: string;
  advanced: string;       // Highly Advanced
}

export const US_TRACK_TABLE: GradeRow[] = [
  { grade: "6학년", regular: "Math", honor: "Pre-Algebra", advanced: "Algebra 1" },
  { grade: "7학년", regular: "Pre-Algebra", honor: "Algebra 1", advanced: "Geometry" },
  { grade: "8학년", regular: "Algebra 1", honor: "Geometry", advanced: "Algebra 2 / Trigonometry" },
  { grade: "9학년", regular: "Geometry", honor: "Algebra 2 / Trigonometry", advanced: "Pre-Calculus" },
  { grade: "10학년", regular: "Algebra 2", honor: "Pre-Calculus", advanced: "AP Calculus AB" },
  { grade: "11학년", regular: "Pre-Calculus", honor: "AP Calculus AB", advanced: "AP Calculus BC · AP Statistics" },
  { grade: "12학년", regular: "Calculus", honor: "AP Calculus BC", advanced: "Multivariable Calculus / Linear Algebra" },
];

/** Topics in each US course — English term + Korean gloss. */
export interface CourseTopics {
  course: string;
  emoji: string;
  blurb: string;
  topics: { en: string; ko: string }[];
  /** 꼭 알아야 할 핵심 개념 — written explanations (일타강사 톤). */
  mustKnow: MustKnow[];
}

export interface MustKnow {
  title: string;
  body: string;
  formulas?: string[];                  // 핵심 공식·정의
  example?: { q: string; a: string };   // 예제: 문제 + 풀이
  pitfall?: string;                     // 자주 하는 실수
}

export const US_COURSE_TOPICS: CourseTopics[] = [
  {
    course: "Algebra I", emoji: "🔢",
    blurb: "변수·식·일차/이차 방정식 — 대수의 기초.",
    topics: [
      { en: "Exponents", ko: "지수" },
      { en: "Radicals", ko: "루트(제곱근)" },
      { en: "Polynomials", ko: "다항식" },
      { en: "Sequences", ko: "수열" },
      { en: "Statistics", ko: "통계" },
      { en: "Linear Equations and Inequalities", ko: "일차 방정식 및 부등식" },
      { en: "Systems of Equations and Inequalities", ko: "연립 방정식 및 부등식" },
      { en: "Quadratic Equations and Functions", ko: "이차방정식 및 함수" },
    ],
    mustKnow: [
      {
        title: "변수(variable)와 식 — '숫자 대신 문자'의 추상화",
        body: "Algebra의 출발점은 모르는 수를 x 같은 문자로 두는 것입니다. '어떤 수에 3을 더하면 7'을 x + 3 = 7로 적는 순간, 구체적인 계산이 아니라 '관계'를 다루게 됩니다. 식을 다룰 때는 분배법칙 a(b+c)=ab+ac로 괄호를 풀고, 같은 항(like terms)끼리만 더한다는 두 가지가 뼈대입니다. 미국 수업은 문장을 식으로 옮기는 과정(modeling)을 글로 설명하게 하므로, '왜 이렇게 세웠는지'를 말할 수 있어야 합니다.",
        formulas: ["분배법칙: a(b + c) = ab + ac", "동류항만 합산: 3x + 5x = 8x, 단 3x + 5x² 는 못 합침"],
        example: { q: "‘어떤 수의 2배보다 5 큰 수가 17이다’를 식으로 세우고 풀어라.", a: "2x + 5 = 17 → 2x = 12 → x = 6. 검산: 2·6+5 = 17 ✓" },
        pitfall: "3x + 5x² 처럼 차수가 다른 항을 같은 항으로 착각해 합치는 실수. 지수가 다르면 동류항이 아닙니다.",
      },
      {
        title: "일차방정식·부등식 — 양변의 균형을 유지하라",
        body: "방정식은 저울입니다. 양변에 똑같은 연산을 해야 균형이 안 깨진다는 원리로 x를 한쪽에 고립시킵니다. 순서는 보통 ① 괄호 풀기 → ② 양변의 동류항 정리 → ③ x항을 한쪽·상수를 반대쪽으로 → ④ x의 계수로 나누기. 부등식도 똑같지만 딱 하나, 음수를 곱하거나 나누면 부등호 방향이 뒤집힙니다.",
        formulas: ["ax + b = c → x = (c − b) / a", "부등식: 음수로 곱·나눗 시 부호 반전 (−2x < 6 → x > −3)"],
        example: { q: "3(x − 2) = x + 4 를 풀어라.", a: "3x − 6 = x + 4 → 2x = 10 → x = 5. 검산: 3(5−2)=9, 5+4=9 ✓" },
        pitfall: "음수를 곱·나눌 때 부등호 방향을 안 바꾸는 것 — 가장 많이 틀리는 지점입니다.",
      },
      {
        title: "함수와 기울기 — y = mx + b의 의미",
        body: "일차함수 y = mx + b에서 m(기울기)은 '변화율', b는 'y절편(x=0일 때 값)'입니다. 기울기는 'x가 1 늘 때 y가 얼마 변하나' = 세로변화/가로변화(rise over run)이며, 속도·요금·성장률 같은 현실 개념과 직결됩니다. 두 점만 있으면 기울기를 구하고, 한 점과 기울기로 직선식을 쓸 수 있어야 합니다(point-slope form).",
        formulas: ["기울기 m = (y₂ − y₁) / (x₂ − x₁)", "점-기울기형: y − y₁ = m(x − x₁)", "기울기형: y = mx + b"],
        example: { q: "두 점 (1, 2)와 (3, 8)을 지나는 직선의 식을 구하라.", a: "m = (8−2)/(3−1) = 3. y − 2 = 3(x − 1) → y = 3x − 1" },
        pitfall: "기울기 분자·분모에서 x와 y를 같은 순서로 빼야 하는데 순서를 섞어 부호가 틀리는 실수.",
      },
      {
        title: "이차방정식 — 인수분해 · 근의 공식 · 포물선",
        body: "ax² + bx + c = 0을 푸는 세 가지 길: ① 인수분해(가장 빠름), ② 완전제곱식, ③ 근의 공식(항상 통함). 판별식 D = b²−4ac의 부호로 실근 개수가 갈립니다 — D>0이면 서로 다른 두 실근, D=0이면 중근, D<0이면 실근 없음(복소근). 그래프는 포물선이고, 근은 곧 x절편, 두 근의 중앙이 대칭축, 거기서 꼭짓점(최댓·최솟값)이 나옵니다.",
        formulas: ["근의 공식: x = (−b ± √(b²−4ac)) / 2a", "판별식 D = b² − 4ac", "꼭짓점 x좌표 = −b / 2a"],
        example: { q: "x² − 5x + 6 = 0 을 풀어라.", a: "(x − 2)(x − 3) = 0 → x = 2 또는 x = 3. 두 근의 중앙 x=2.5가 대칭축." },
        pitfall: "근의 공식에서 −b를 빼먹거나 분모 2a 중 a만 쓰는 실수, 그리고 √ 안이 음수일 때 '근 없음'을 '0'으로 처리하는 실수.",
      },
      {
        title: "지수법칙 — 큰 수·작은 수를 다루는 규칙",
        body: "지수는 '같은 수를 몇 번 곱했나'입니다. 핵심은 암기가 아니라 '같은 밑끼리 곱하면 지수가 더해진다'는 원리 하나 — 여기서 나머지가 다 따라 나옵니다. a⁰=1인 이유도 aⁿ/aⁿ = aⁿ⁻ⁿ = a⁰ = 1로 설명되고, 음수 지수 a⁻ⁿ = 1/aⁿ, 분수 지수 a^(1/2) = √a 까지 자연스럽게 확장됩니다. Algebra II의 지수·로그함수로 직결됩니다.",
        formulas: ["aᵐ · aⁿ = aᵐ⁺ⁿ", "aᵐ / aⁿ = aᵐ⁻ⁿ", "(aᵐ)ⁿ = aᵐⁿ", "a⁰ = 1, a⁻ⁿ = 1/aⁿ, a^(1/n) = ⁿ√a"],
        example: { q: "x⁵ · x³ / x² 를 간단히 하라.", a: "x^(5+3−2) = x⁶" },
        pitfall: "(aᵐ)ⁿ 을 aᵐ⁺ⁿ 으로 (곱해야 하는데 더해버리는) 혼동. 곱셈은 지수끼리 곱, 같은 밑 곱셈은 지수끼리 합.",
      },
    ],
  },
  {
    course: "Geometry", emoji: "📐",
    blurb: "도형의 성질·합동·닮음·증명 — 기하 전반.",
    topics: [
      { en: "Transformation", ko: "도형의 이동" },
      { en: "Congruence", ko: "도형의 합동" },
      { en: "Similarity", ko: "도형의 닮음" },
      { en: "Right triangles and trigonometry", ko: "직각삼각형과 삼각함수" },
      { en: "Analytic Geometry", ko: "좌표 기하학" },
      { en: "Circles", ko: "원" },
      { en: "Solid Geometry", ko: "평면도형 및 입체도형" },
    ],
    mustKnow: [
      {
        title: "증명(Proof) — Geometry의 진짜 핵심",
        body: "미국 Geometry의 정체성은 '증명'입니다. 한국이 결과를 계산한다면, 미국은 '왜 그런지'를 단계별로 서술하는 two-column proof를 훈련합니다 — 왼쪽 칸에 주장(Statement), 오른쪽 칸에 그 근거(Reason: 정의·공리·정리)를 한 줄씩 짝지어 결론까지 쌓아 올립니다. 주어진 것(Given)에서 출발해 이미 증명된 사실만 근거로 쓸 수 있다는 게 규칙입니다. 이 논리적 글쓰기가 이후 모든 수학·과학 서술형의 토대가 됩니다.",
        example: { q: "맞꼭지각(vertical angles)이 서로 같음을 보이는 흐름은?", a: "∠1 + ∠2 = 180°(일직선), ∠2 + ∠3 = 180°(일직선) → 두 식이 같으므로 ∠1 = ∠3. 각 줄마다 근거를 단다." },
        pitfall: "아직 증명 안 된 사실(보여야 할 결론)을 근거로 끌어다 쓰는 순환논증. 근거는 반드시 정의·공리·기존 정리여야 합니다.",
      },
      {
        title: "합동(Congruence)과 닮음(Similarity)",
        body: "합동은 '모양도 크기도 같다(≅)', 닮음은 '모양은 같고 크기만 다르다(∼)'입니다. 삼각형 합동은 SSS·SAS·ASA·AAS 네 조건, 닮음은 AA·SAS·SSS 조건으로 판정해 증명 근거로 씁니다. 닮음에서 가장 중요한 건 비율: 대응변의 비(닮음비 k)가 일정하면, 넓이비는 k²·부피비는 k³가 됩니다.",
        formulas: ["합동조건: SSS, SAS, ASA, AAS", "닮음조건: AA, SAS, SSS", "닮음비 k → 넓이비 k², 부피비 k³"],
        example: { q: "닮음비가 2:3인 두 삼각형의 넓이비는?", a: "2² : 3² = 4 : 9" },
        pitfall: "AAA는 닮음은 되지만 합동은 안 됩니다(크기 정보가 없음). 또 SSA는 합동조건이 아님 — 자주 함정으로 나옵니다.",
      },
      {
        title: "피타고라스 정리와 삼각비 (SOH-CAH-TOA)",
        body: "직각삼각형에서 두 직각변 a, b와 빗변 c 사이에 a² + b² = c². 여기에 각과 변의 비를 연결한 것이 삼각비입니다 — sin = 대변/빗변, cos = 인접변/빗변, tan = 대변/인접변(SOH-CAH-TOA로 암기). 특수각(30°·45°·60°)의 값은 통째로 외워두면 Pre-Calculus·Calculus까지 평생 씁니다.",
        formulas: ["a² + b² = c²", "sinθ = 대변/빗변, cosθ = 인접변/빗변, tanθ = 대변/인접변", "sin30°=1/2, sin45°=√2/2, sin60°=√3/2"],
        example: { q: "직각변이 3, 4인 직각삼각형의 빗변은?", a: "c = √(3² + 4²) = √25 = 5 (대표적인 3-4-5 삼각형)" },
        pitfall: "피타고라스는 직각삼각형에서만 성립. 빗변(c)은 항상 직각의 '맞은편' 가장 긴 변이라는 걸 헷갈리면 안 됩니다.",
      },
      {
        title: "좌표기하 — 거리·중점·기울기 공식",
        body: "도형을 좌표평면 위에 올리면 대수로 풀 수 있습니다(해석기하). 두 점 사이 거리 공식은 사실 피타고라스 정리이고, 중점은 두 좌표의 평균입니다. 두 직선이 수직이면 기울기의 곱이 −1, 평행이면 기울기가 같다는 성질이 증명에 자주 쓰입니다.",
        formulas: ["거리 = √((x₂−x₁)² + (y₂−y₁)²)", "중점 = ((x₁+x₂)/2, (y₁+y₂)/2)", "수직: m₁ · m₂ = −1, 평행: m₁ = m₂"],
        example: { q: "(1, 2)와 (4, 6) 사이 거리는?", a: "√((4−1)² + (6−2)²) = √(9 + 16) = √25 = 5" },
        pitfall: "거리 공식에서 괄호 안을 제곱하기 전에 부호 처리 실수, 그리고 √ 씌우는 걸 빼먹는 실수.",
      },
      {
        title: "원의 성질과 넓이·부피",
        body: "원에서는 ① 원주각은 같은 호에 대한 중심각의 절반, ② 접선과 (접점까지의) 반지름은 수직, ③ 반원에 대한 원주각은 90°(탈레스 정리)가 핵심입니다. 입체에서는 공식을 외우되 '왜 그 공식인지'를 이해해야 응용이 됩니다 — 예: 원기둥 부피는 '밑넓이 × 높이', 원뿔은 같은 밑·높이 원기둥의 1/3.",
        formulas: ["원 넓이 = πr², 둘레 = 2πr", "원주각 = 중심각 ÷ 2", "구 부피 = (4/3)πr³, 원뿔 부피 = (1/3)πr²h"],
        example: { q: "반지름 6인 원에서 중심각 60°에 대한 호의 길이는?", a: "2π·6 × (60/360) = 12π × 1/6 = 2π" },
        pitfall: "지름(d)과 반지름(r)을 혼동해 공식에 d를 r 자리에 넣는 실수. r = d/2.",
      },
    ],
  },
  {
    course: "Algebra II", emoji: "📈",
    blurb: "다항식·복소수·지수/로그·삼각함수 — 함수의 확장.",
    topics: [
      { en: "Polynomials", ko: "다항식의 계산" },
      { en: "Complex numbers", ko: "복소수" },
      { en: "Polynomial factorization", ko: "다항식의 인수분해" },
      { en: "Polynomial division", ko: "다항식의 나눗셈" },
      { en: "Polynomial graphs", ko: "다항식의 그래프" },
      { en: "Exponential models", ko: "지수함수" },
      { en: "Logarithms", ko: "로그" },
      { en: "Transformations of functions", ko: "함수의 이동" },
      { en: "Trigonometry and Radians", ko: "삼각함수와 라디안" },
    ],
    mustKnow: [
      {
        title: "복소수(Complex numbers)와 허수 i",
        body: "제곱해서 −1이 되는 수를 i로 정의합니다(i² = −1). 그러면 x² + 1 = 0처럼 실수로는 못 풀던 방정식도 a + bi 꼴로 풀립니다. 사칙연산은 i를 문자처럼 다루되 i²가 나오면 −1로 바꾸는 게 핵심이고, i의 거듭제곱은 i, −1, −i, 1이 4개 주기로 반복됩니다. 모든 n차 다항방정식은 (복소수까지 세면) 정확히 n개의 근을 갖는다(대수학의 기본정리)는 큰 그림으로 이어집니다.",
        formulas: ["i² = −1", "i¹=i, i²=−1, i³=−i, i⁴=1 (4주기 반복)", "(a+bi)(a−bi) = a² + b² (켤레 곱은 실수)"],
        example: { q: "(2 + 3i)(1 − i) 를 계산하라.", a: "2 − 2i + 3i − 3i² = 2 + i − 3(−1) = 5 + i" },
        pitfall: "i² 를 그냥 i 로 두고 넘어가는 실수. i²가 보이면 즉시 −1로 바꿔야 합니다.",
      },
      {
        title: "다항함수와 인수·나머지 정리",
        body: "고차 다항식 f(x)를 (x − a)로 나눈 나머지가 정확히 f(a)라는 게 나머지정리, 그리고 f(a) = 0이면 (x − a)가 인수라는 게 인수정리입니다. 이 둘로 고차방정식의 근을 찾고 인수분해합니다. 그래프는 최고차항으로 끝 모양(end behavior)을, 각 근의 중복도로 x축에서 통과/접촉을 읽습니다.",
        formulas: ["나머지정리: f(x)를 (x−a)로 나눈 나머지 = f(a)", "인수정리: f(a)=0 ⟺ (x−a)가 인수"],
        example: { q: "f(x) = x³ − 7x + 6 의 한 인수를 찾아라.", a: "f(1)=1−7+6=0 이므로 (x−1)이 인수. 나눠보면 (x−1)(x²+x−6)=(x−1)(x+3)(x−2)." },
        pitfall: "근을 찾을 때 상수항의 약수(±1,±2,±3,±6)만 후보로 넣어야 하는데 아무 값이나 대입해 시간 낭비하는 것.",
      },
      {
        title: "지수함수와 로그함수 — 서로 역함수",
        body: "지수함수 y = aˣ와 로그함수 y = logₐx는 서로 역함수(직선 y=x에 대칭) 관계입니다. 로그는 '밑 a를 몇 제곱해야 그 수가 되나'를 묻는 것 — log₂8 = 3은 2³=8이기 때문입니다. 방정식을 풀 때 지수↔로그로 형태를 바꾸는 것과 로그 법칙(곱→합, 나눗→차, 지수→앞으로)이 핵심 도구입니다. 지수는 복리·인구·세균 같은 폭발적 성장을, 로그는 지진 규모·pH·데시벨을 모델링합니다.",
        formulas: ["aˣ = b ⟺ logₐb = x", "log(xy) = log x + log y", "log(x/y) = log x − log y", "log(xⁿ) = n·log x"],
        example: { q: "2ˣ = 16 을 풀어라.", a: "16 = 2⁴ 이므로 x = 4. (또는 log₂16 = 4)" },
        pitfall: "log(x + y)를 log x + log y로 잘못 쪼개는 것 — 합의 로그는 분리되지 않습니다. 곱의 로그만 합이 됩니다.",
      },
      {
        title: "삼각함수와 라디안",
        body: "각을 도(°) 대신 '호의 길이'로 재는 단위가 라디안입니다(180° = π rad). 라디안을 쓰는 이유는 미적분에서 식이 깔끔해지기 때문(예: sin의 미분이 cos이 되려면 라디안이어야 함). sin·cos는 단위원 위 점의 y·x좌표이고, 일정 주기로 반복(periodic)되어 파동·진동을 설명합니다. sin²θ + cos²θ = 1 항등식은 어디서나 쓰입니다.",
        formulas: ["180° = π rad (도↔라디안: ×π/180)", "sin²θ + cos²θ = 1", "sin·cos 주기 2π, tan 주기 π"],
        example: { q: "60°를 라디안으로 바꿔라.", a: "60 × π/180 = π/3" },
        pitfall: "계산기 모드가 Degree인데 라디안 답을 기대(또는 반대)하는 실수. 시험 전 모드 확인 필수.",
      },
      {
        title: "함수의 변환(Transformations)",
        body: "기본 함수 f(x)에 더하고 곱하면 그래프가 통째로 움직입니다. 규칙: f(x) + k는 위로 k, f(x − h)는 오른쪽으로 h(부호 반대!), a·f(x)는 세로로 a배, f(bx)는 가로로 1/b배, −f(x)는 x축 대칭, f(−x)는 y축 대칭. 이 한 세트를 알면 이차·절댓값·지수·삼각 등 어떤 함수든 기본형에서 빠르게 그립니다.",
        formulas: ["f(x)+k: 위로 k", "f(x−h): 오른쪽 h", "a·f(x): 세로 a배", "−f(x): x축 대칭, f(−x): y축 대칭"],
        example: { q: "y = (x − 2)² + 3 은 y = x² 를 어떻게 옮긴 것인가?", a: "오른쪽으로 2, 위로 3 평행이동. 꼭짓점이 (0,0)→(2,3)." },
        pitfall: "f(x − h)에서 부호. (x − 2)는 왼쪽이 아니라 '오른쪽'으로 2 이동 — 직관과 반대라 자주 틀립니다.",
      },
    ],
  },
  {
    course: "Pre-Calculus", emoji: "🧮",
    blurb: "함수·삼각·벡터·행렬·극한 — 미적분 직전 종합.",
    topics: [
      { en: "Composite and Inverse functions", ko: "합성함수와 역함수" },
      { en: "Trigonometry", ko: "삼각함수" },
      { en: "Complex numbers", ko: "복소수" },
      { en: "Vectors", ko: "벡터" },
      { en: "Conic sections", ko: "원뿔곡선" },
      { en: "Matrices", ko: "행렬" },
      { en: "Probability and Combinatorics", ko: "확률과 조합" },
      { en: "Series", ko: "급수" },
      { en: "Limits and Continuity", ko: "함수의 극한과 연속" },
    ],
    mustKnow: [
      {
        title: "합성함수와 역함수",
        body: "합성함수 f(g(x))는 'g를 먼저, 그 결과에 f를' 적용하는 함수의 연결입니다(안에서 밖으로). 역함수 f⁻¹은 입력과 출력을 뒤바꾼 것으로, f와 y = x에 대해 거울 대칭이며 f(f⁻¹(x)) = x가 성립합니다. 역함수를 구하는 법은 'y로 놓고 → x와 y를 맞바꾸고 → y에 대해 다시 푼다'. 미적분의 연쇄법칙이 이 합성구조 위에서 작동하므로 탄탄히 잡아야 합니다.",
        formulas: ["(f∘g)(x) = f(g(x))", "f(f⁻¹(x)) = f⁻¹(f(x)) = x", "역함수: y= f(x)에서 x↔y 바꾼 뒤 y에 대해 풀기"],
        example: { q: "f(x) = 2x + 3 의 역함수를 구하라.", a: "y = 2x+3 → x = 2y+3 → y = (x−3)/2. 즉 f⁻¹(x) = (x−3)/2" },
        pitfall: "f(g(x))와 g(f(x))는 순서가 달라 대개 결과가 다릅니다. 합성은 교환법칙이 성립하지 않습니다.",
      },
      {
        title: "단위원과 삼각함수 심화",
        body: "Pre-Calculus 삼각함수의 중심은 단위원(반지름 1)입니다. 각 θ에 대응하는 원 위 점의 좌표가 (cosθ, sinθ)이고, 여기서 sin²θ + cos²θ = 1이 피타고라스로 바로 나옵니다. 사인·코사인 그래프는 y = a·sin(b(x − c)) + d 형태로, a=진폭, 주기=2π/b, c=위상이동, d=수직이동을 읽습니다. 이 파형 해석이 물리·공학의 진동·신호로 직결됩니다.",
        formulas: ["점 = (cosθ, sinθ)", "sin²θ + cos²θ = 1", "y = a·sin(b(x−c)) + d → 진폭 |a|, 주기 2π/b"],
        example: { q: "y = 3sin(2x) 의 진폭과 주기는?", a: "진폭 3, 주기 2π/2 = π" },
        pitfall: "주기를 b 그 자체로 착각하는 것. 주기는 2π/b 입니다 (b가 클수록 주기는 짧아짐).",
      },
      {
        title: "극한(Limits) — 미적분으로 가는 다리",
        body: "극한은 'x가 어떤 값 a에 한없이 가까워질 때 함수가 어디로 향하는가'입니다. 핵심은 x = a에 실제 도달하거나 그 점에서 정의되지 않아도 '향하는 값'을 따진다는 것. 0/0 같은 부정형은 바로 대입하면 안 되고 인수분해·약분·유리화로 처리합니다. 이 개념이 곧 미분(순간변화율)과 적분(무한합)의 정의이므로 Pre-Calculus에서 미리 만나두면 큰 무기가 됩니다.",
        formulas: ["lim(x→a) f(x) = L: x가 a로 갈 때 f가 L로 향함", "연속: lim(x→a) f(x) = f(a)"],
        example: { q: "lim(x→2) (x² − 4)/(x − 2) 를 구하라.", a: "그냥 대입하면 0/0. 인수분해 (x−2)(x+2)/(x−2) = x+2 → x=2 대입 = 4" },
        pitfall: "0/0이 나왔다고 '극한 없음'으로 단정하는 것. 0/0은 '아직 모름(부정형)'이라 변형해서 다시 봐야 합니다.",
      },
      {
        title: "수열과 급수(Series)",
        body: "수열은 규칙을 가진 수의 나열, 급수는 그 합입니다. 등차수열(일정하게 더함)과 등비수열(일정하게 곱함)의 일반항·합 공식이 기본이고, 특히 |r| < 1인 무한등비급수는 유한한 값으로 수렴한다는 게 중요합니다. 이는 AP Calculus BC의 핵심(수렴 판정, Taylor 급수)으로 그대로 이어집니다.",
        formulas: ["등차 일반항 aₙ = a₁ + (n−1)d", "등비 일반항 aₙ = a₁·r^(n−1)", "무한등비합(|r|<1) = a₁ / (1 − r)"],
        example: { q: "1 + 1/2 + 1/4 + 1/8 + … 의 합은?", a: "a₁=1, r=1/2 → 1/(1 − 1/2) = 2" },
        pitfall: "무한등비급수 합 공식은 |r| < 1 일 때만 유효. r이 1 이상이면 발산해서 합이 무한대입니다.",
      },
      {
        title: "벡터와 행렬(Vectors & Matrices)",
        body: "벡터는 '크기와 방향을 동시에 가진 양'(속도·힘)으로, 성분끼리 더하고 빼며, 내적(dot product)으로 두 벡터의 각도를 잽니다(내적 0 = 수직). 행렬은 수를 직사각형으로 배열한 것으로, 연립방정식을 한 번에 풀거나 회전·확대 같은 변환을 표현합니다. 둘 다 대학 선형대수·물리·컴퓨터그래픽스의 기초입니다.",
        formulas: ["벡터합: (a,b)+(c,d) = (a+c, b+d)", "내적: (a,b)·(c,d) = ac + bd", "내적 = 0 ⟺ 두 벡터 수직"],
        example: { q: "벡터 (3, 4)의 크기(길이)는?", a: "√(3² + 4²) = √25 = 5" },
        pitfall: "벡터 덧셈은 성분끼리, 내적은 성분곱의 '합'(결과는 스칼라). 내적을 다시 벡터로 착각하는 실수.",
      },
    ],
  },
  {
    course: "Calculus", emoji: "∫",
    blurb: "극한·미분·적분 — 미적분 본론 (AP Calculus로 연결).",
    topics: [
      { en: "Limits and Continuity", ko: "함수의 극한과 연속" },
      { en: "Derivatives", ko: "함수의 미분" },
      { en: "Integrals", ko: "함수의 적분" },
    ],
    mustKnow: [
      {
        title: "극한과 연속(Limits & Continuity)",
        body: "미적분의 모든 정의가 극한에서 출발합니다. 함수가 한 점에서 '연속'이라는 건 ① 그 점의 함숫값이 존재하고 ② 좌·우극한이 같고 ③ 그 극한이 함숫값과 일치한다는 세 조건입니다 — 즉 펜을 떼지 않고 그릴 수 있다는 뜻. 0/0 같은 부정형은 인수분해·유리화로 정리하거나, 미분 가능 형태면 로피탈 정리(분자·분모를 각각 미분)로 처리합니다.",
        formulas: ["연속 조건: lim(x→a) f(x) = f(a)", "로피탈(0/0, ∞/∞): lim f/g = lim f′/g′"],
        example: { q: "lim(x→0) sin x / x 를 구하라.", a: "대입하면 0/0. 이 값은 유명한 극한으로 = 1 (그래프·로피탈 모두 확인 가능)" },
        pitfall: "로피탈은 0/0 또는 ∞/∞ 부정형일 때만 적용. 부정형이 아닌데 분자·분모를 따로 미분하면 틀립니다.",
      },
      {
        title: "미분(Derivative) — 순간변화율과 접선",
        body: "도함수 f′(x)는 '그 점에서의 순간변화율 = 접선의 기울기'이며, 정의는 평균변화율의 극한입니다. 위치를 미분하면 속도, 속도를 미분하면 가속도 — 변화를 다루는 모든 분야의 언어입니다. 거듭제곱·곱·몫·연쇄법칙으로 어떤 함수든 미분하고, 도함수의 부호로 증가·감소(f′>0이면 증가)와 극대·극소(f′=0인 곳)를 찾아 최적화 문제를 풉니다.",
        formulas: ["정의: f′(x) = lim(h→0) [f(x+h)−f(x)] / h", "거듭제곱: d/dx(xⁿ) = n·xⁿ⁻¹", "연쇄법칙: d/dx f(g(x)) = f′(g(x))·g′(x)"],
        example: { q: "f(x) = x³ 의 x = 2 에서 접선 기울기는?", a: "f′(x) = 3x² → f′(2) = 3·4 = 12" },
        pitfall: "연쇄법칙에서 '안쪽 함수의 미분(g′)'을 곱하는 걸 빼먹는 것. 예: (x²+1)³ 의 미분은 3(x²+1)²·(2x).",
      },
      {
        title: "적분(Integral) — 넓이와 누적",
        body: "적분은 미분의 역연산이자 '곡선 아래 넓이'입니다. 무한히 얇은 직사각형(리만 합)을 더해 넓이를 구한다는 것이 정적분의 의미이고, 속도를 적분하면 이동거리처럼 '누적된 양'이 나옵니다. 부정적분은 원시함수(미분하면 원래 함수가 되는 것)를 찾는 것 — 그래서 적분상수 +C가 붙고, 정적분은 구간 [a,b]에서 실제 수치(넓이)를 냅니다.",
        formulas: ["거듭제곱 적분: ∫xⁿ dx = xⁿ⁺¹/(n+1) + C (n≠−1)", "정적분: ∫ₐᵇ f(x) dx = F(b) − F(a)"],
        example: { q: "∫₀² 2x dx 를 구하라.", a: "원시함수 x², F(2)−F(0) = 4 − 0 = 4" },
        pitfall: "부정적분에서 적분상수 +C 를 빼먹는 것, 그리고 1/x 의 적분을 거듭제곱 공식으로 잘못 처리하는 것(정답은 ln|x|).",
      },
      {
        title: "미적분의 기본정리(FTC) — 미분과 적분은 역연산",
        body: "미분과 적분이 서로 반대 작업임을 잇는 다리가 미적분의 기본정리입니다. 덕분에 넓이를 일일이 무한합으로 구하지 않고 '원시함수의 양 끝 값 차이' F(b) − F(a)로 단숨에 계산합니다. 또한 '적분으로 정의된 함수를 미분하면 원래 피적분함수가 된다'는 것도 같은 정리의 다른 얼굴 — 미적분 전체를 하나로 묶는 가장 중요한 정리입니다.",
        formulas: ["FTC 1부: d/dx ∫ₐˣ f(t) dt = f(x)", "FTC 2부: ∫ₐᵇ f(x) dx = F(b) − F(a), 단 F′ = f"],
        example: { q: "∫₁³ 2x dx 를 FTC로 구하라.", a: "F(x)=x², F(3)−F(1) = 9 − 1 = 8" },
        pitfall: "정적분에서 F(b) − F(a) 의 위·아래 순서를 바꿔 부호가 반대로 나오는 실수.",
      },
      {
        title: "AP Calculus AB vs BC — 어디까지 가나",
        body: "AB는 극한·미분·기본 적분까지(미국 대학 미적분 1학기 분량), BC는 그 위에 고급 적분기법(부분적분 등)·매개변수와 극좌표·무한급수(수렴 판정, Taylor·Maclaurin 급수)까지(1+2학기 분량) 다룹니다. 즉 BC ⊃ AB이며, BC 시험을 보면 AB 부분 점수(AB subscore)도 따로 나옵니다. 이공계·수학 강세를 보이려면 BC가 표준이고, AB는 그 절반 범위라고 보면 됩니다.",
        formulas: ["AB: 극한·미분·기본 적분·미적분 응용", "BC: AB 전체 + 급수·매개변수·극좌표·고급 적분"],
        pitfall: "'AB와 BC는 다른 과목'이라는 오해. BC는 AB를 포함한 상위 버전이라 BC를 들으면 AB 내용은 자동 포함됩니다.",
      },
    ],
  },
];

/** Korean middle-school curriculum by grade & semester. */
export interface KrSemester {
  label: string;           // e.g. "중1 · 1학기"
  units: { roman: string; title: string; lessons: string[] }[];
}

export const KR_MIDDLE_SCHOOL: KrSemester[] = [
  {
    label: "중1 · 1학기",
    units: [
      { roman: "I", title: "소인수분해", lessons: ["소인수분해", "최대공약수와 최소공배수"] },
      { roman: "II", title: "정수와 유리수", lessons: ["정수와 유리수", "유리수의 덧셈과 뺄셈", "유리수의 곱셈과 나눗셈"] },
      { roman: "III", title: "방정식", lessons: ["문자와 식", "일차식과 그 계산", "일차방정식의 활용"] },
      { roman: "IV", title: "그래프와 비례", lessons: ["좌표평면과 그래프", "정비례", "반비례"] },
    ],
  },
  {
    label: "중1 · 2학기",
    units: [
      { roman: "I", title: "기본도형", lessons: ["기본 도형", "위치 관계", "평행선", "삼각형의 작도와 합동"] },
      { roman: "II", title: "평면도형", lessons: ["다각형", "원과 부채꼴"] },
      { roman: "III", title: "입체도형", lessons: ["다면체", "회전체", "입체도형의 겉넓이와 부피"] },
      { roman: "IV", title: "통계", lessons: ["자료의 정리와 해석(1)", "자료의 정리와 해석(2)"] },
    ],
  },
  {
    label: "중2 · 1학기",
    units: [
      { roman: "I", title: "수와 식", lessons: ["유리수와 소수", "지수법칙", "단항식의 계산", "다항식의 계산"] },
      { roman: "II", title: "부등식", lessons: ["일차부등식", "일차부등식의 활용"] },
      { roman: "III", title: "방정식", lessons: ["연립일차방정식", "연립일차방정식의 활용"] },
      { roman: "IV", title: "함수", lessons: ["함수", "일차함수의 그래프", "일차함수의 그래프의 성질", "일차함수와 일차방정식의 관계"] },
    ],
  },
  {
    label: "중2 · 2학기",
    units: [
      { roman: "I", title: "도형의 성질", lessons: ["삼각형의 성질(1)", "삼각형의 성질(2)", "사각형의 성질(1)", "사각형의 성질(2)"] },
      { roman: "II", title: "도형의 닮음", lessons: ["도형의 닮음", "평행선 사이의 선분의 길이의 비", "삼각형의 무게중심", "닮음의 활용"] },
      { roman: "III", title: "피타고라스 정리", lessons: ["피타고라스 정리"] },
      { roman: "IV", title: "확률", lessons: ["경우의 수", "확률"] },
    ],
  },
  {
    label: "중3 · 1학기",
    units: [
      { roman: "I", title: "제곱근과 실수", lessons: ["제곱근의 뜻과 성질", "무리수와 실수", "근호를 포함한 식의 곱셈과 나눗셈", "근호를 포함한 식의 덧셈과 뺄셈"] },
      { roman: "II", title: "다항식의 곱셈과 인수분해", lessons: ["곱셈 공식", "곱셈 공식의 활용", "인수분해(1)", "인수분해(2)"] },
      { roman: "III", title: "이차방정식", lessons: ["이차방정식의 풀이(1)", "이차방정식의 풀이(2)", "이차방정식의 활용"] },
      { roman: "IV", title: "이차함수", lessons: ["이차함수의 그래프(1)", "이차함수의 그래프(2)", "이차함수의 그래프(3)"] },
    ],
  },
  {
    label: "중3 · 2학기",
    units: [
      { roman: "I", title: "삼각비", lessons: ["삼각비", "삼각비의 값", "삼각비의 길이에의 활용", "삼각비의 넓이에의 활용"] },
      { roman: "II", title: "원의 성질", lessons: ["원의 현", "원의 접선", "원주각", "원주각의 활용"] },
      { roman: "III", title: "통계", lessons: ["대푯값", "산포도", "상관관계"] },
    ],
  },
];

/** US course ↔ Korean level summary. */
export const LEVEL_SUMMARY: { course: string; level: string }[] = [
  { course: "Algebra 1", level: "한국 중1~중2 수준의 대수" },
  { course: "Geometry", level: "한국 중학교 전반 수준의 기하" },
  { course: "Algebra 2", level: "한국 중3~고1 수준의 대수" },
  { course: "Pre-Calculus", level: "한국 고등학교 수학Ⅰ·수학Ⅱ 정도 수준" },
  { course: "AP Calculus AB", level: "미분 ~ 간단한 적분" },
  { course: "AP Calculus BC", level: "난이도 있는 적분 내용까지 포함" },
];

export const INTRO_TEXT =
  "미국은 한국과 동일하게 학년이 올라갈수록 과정의 난이도가 점차 높아지지만, 같은 학년 안에서도 학생 개개인의 능력에 따라 Regular · Honor · Highly Advanced로 유연하게 과정이 부여됩니다. 그래서 '몇 학년이냐'보다 '어느 트랙에서 무엇을 듣고 있느냐'가 훨씬 중요합니다.";

export const STYLE_DIFFERENCE =
  "한국 수학이 정답을 도출하는 '문제풀이 스킬' 중심(단답형)이라면, 미국 수학은 개념을 얼마나 이해했는지 증명하는 '서술형 답안' 위주입니다. 그래서 풀이 과정과 논리를 글로 설명하는 훈련이 중요하고, 시험·내신도 과정 점수의 비중이 큽니다.";
