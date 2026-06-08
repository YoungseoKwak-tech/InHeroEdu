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
  mustKnow: { title: string; body: string }[];
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
        body: "Algebra의 출발점은 모르는 수를 x 같은 문자로 두는 것입니다. '어떤 수에 3을 더하면 7'을 x + 3 = 7로 적는 순간, 구체적인 계산이 아니라 '관계'를 다루게 됩니다. 미국 수업은 이 추상화 자체를 중요하게 보고, 식을 세우는 과정(modeling)을 글로 설명하게 합니다. 그래서 답보다 '왜 이렇게 식을 세웠는지'를 말할 수 있어야 합니다.",
      },
      {
        title: "일차방정식·부등식 — 양변의 균형을 유지하라",
        body: "방정식은 저울입니다. 양변에 같은 연산을 해야 균형이 깨지지 않는다는 원리로 x를 한쪽에 고립시킵니다. 부등식도 같지만 딱 하나, 음수를 곱하거나 나누면 부등호 방향이 바뀐다는 점이 핵심 함정입니다(−2x < 6 → x > −3). 이 한 가지를 놓쳐서 틀리는 학생이 가장 많습니다.",
      },
      {
        title: "함수와 기울기 — y = mx + b의 의미",
        body: "일차함수 y = mx + b에서 m(기울기)은 '변화율', b는 'y절편(시작값)'입니다. 기울기는 x가 1 늘 때 y가 얼마나 변하는가 — 즉 속도·비율 같은 현실 개념과 직결됩니다. 미국 수학은 그래프·표·식을 서로 바꿔 읽는(multiple representations) 능력을 특히 강조합니다.",
      },
      {
        title: "이차방정식 — 인수분해 · 근의 공식 · 포물선",
        body: "ax² + bx + c = 0을 푸는 세 가지 길: ① 인수분해, ② 완전제곱식, ③ 근의 공식 x = (−b ± √(b²−4ac)) / 2a. 판별식 b²−4ac의 부호로 실근의 개수가 갈립니다. 그래프는 포물선이고, 꼭짓점·축·근(=x절편)을 연결해 읽는 것이 핵심입니다.",
      },
      {
        title: "지수법칙 — 큰 수·작은 수를 다루는 규칙",
        body: "aᵐ · aⁿ = aᵐ⁺ⁿ, (aᵐ)ⁿ = aᵐⁿ, a⁰ = 1, a⁻ⁿ = 1/aⁿ. 단순 암기가 아니라 '같은 밑끼리 곱하면 지수가 더해진다'는 원리로 이해하면 음수·분수 지수까지 자연스럽게 확장됩니다. Algebra II의 지수·로그함수로 바로 이어지는 토대입니다.",
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
        body: "미국 Geometry의 정체성은 '증명'입니다. 한국이 결과를 계산하는 데 비해, 미국은 '왜 그런지'를 단계별로 논리적으로 서술하는 two-column proof(주장 ↔ 근거)를 훈련합니다. 정의(definition)·공리(postulate)·정리(theorem)를 근거로 들어 한 줄씩 쌓아 올리는 것 — 이 논리적 글쓰기 능력이 이후 모든 수학·과학 서술형의 토대가 됩니다.",
      },
      {
        title: "합동(Congruence)과 닮음(Similarity)",
        body: "합동은 '모양도 크기도 같다', 닮음은 '모양은 같고 크기만 다르다'입니다. 삼각형 합동조건(SSS·SAS·ASA·AAS)과 닮음조건(AA·SAS·SSS)을 근거로 들어 증명에 씁니다. 닮음에서는 대응변의 비(닮음비)가 일정하고, 넓이비는 닮음비의 제곱·부피비는 세제곱이라는 점이 자주 나오는 핵심입니다.",
      },
      {
        title: "피타고라스 정리와 삼각비 (SOH-CAH-TOA)",
        body: "직각삼각형에서 a² + b² = c²(피타고라스). 여기에 각과 변의 비를 연결한 것이 삼각비입니다 — sin=대변/빗변, cos=인접변/빗변, tan=대변/인접변(SOH-CAH-TOA로 암기). 이 삼각비가 Pre-Calculus의 삼각함수, Calculus의 주기함수로 그대로 확장됩니다.",
      },
      {
        title: "좌표기하 — 거리·중점 공식",
        body: "도형을 좌표평면 위에 올리면 대수로 풀 수 있습니다. 두 점 사이 거리 √((x₂−x₁)² + (y₂−y₁)²)는 사실 피타고라스 정리이고, 중점은 좌표의 평균입니다. 기하와 대수를 잇는 이 '해석기하(analytic geometry)'가 이후 원·포물선 같은 도형의 방정식으로 이어집니다.",
      },
      {
        title: "원의 성질과 넓이·부피",
        body: "원에서는 중심각·원주각(원주각은 중심각의 절반), 접선과 반지름이 수직이라는 성질이 핵심입니다. 입체에서는 부피·겉넓이 공식을 외우되 '왜 그 공식인지'(예: 원기둥 부피 = 밑넓이 × 높이)를 이해해야 응용 문제가 풀립니다.",
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
        body: "제곱해서 −1이 되는 수를 i로 정의합니다(i² = −1). 그러면 x² + 1 = 0처럼 실수로는 못 풀던 방정식도 풀립니다. a + bi 형태로 쓰고, 모든 다항방정식은 차수만큼의 (복소)근을 갖는다(대수학의 기본정리)는 큰 그림으로 이어집니다.",
      },
      {
        title: "다항함수와 인수·나머지 정리",
        body: "고차 다항식 f(x)를 (x − a)로 나눈 나머지가 f(a)라는 나머지정리, 그리고 f(a) = 0이면 (x − a)가 인수라는 인수정리가 핵심 도구입니다. 이를 이용해 고차방정식을 인수분해하고, 그래프의 x절편(=근)과 끝 모양(end behavior)을 읽습니다.",
      },
      {
        title: "지수함수와 로그함수 — 서로 역함수",
        body: "지수함수 y = aˣ와 로그함수 y = logₐx는 서로 역함수(거울 대칭) 관계입니다. 로그는 '밑을 몇 제곱해야 그 수가 되나'를 묻는 것 — log₂8 = 3. 지수는 폭발적 성장(복리·인구·세균), 로그는 그 역(지진 규모·pH·데시벨)을 다루며 현실 모델링에 직결됩니다.",
      },
      {
        title: "삼각함수와 라디안",
        body: "각을 도(°) 대신 호의 길이로 재는 단위가 라디안입니다(180° = π). 라디안을 쓰는 이유는 미적분에서 식이 깔끔해지기 때문입니다. sin·cos는 단위원 위 점의 좌표이고, 주기적으로 반복(periodic)된다는 성질이 파동·진동을 설명합니다.",
      },
      {
        title: "함수의 변환(Transformations)",
        body: "기본 함수 f(x)에 더하고 곱하면 그래프가 움직입니다 — f(x) + k는 위로, f(x − h)는 오른쪽으로, a·f(x)는 세로로 늘이고, −f(x)는 뒤집습니다. 이 '평행이동·확대·대칭' 한 세트를 알면 어떤 함수든 기본형에서 변형으로 빠르게 그릴 수 있습니다.",
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
        body: "합성함수 f(g(x))는 'g를 먼저, 그 결과에 f를' 적용하는 함수의 연결입니다. 역함수 f⁻¹은 입력과 출력을 뒤바꾼 것으로, f와 y = x에 대해 대칭입니다. 미적분의 연쇄법칙(chain rule)이 바로 이 합성함수 구조 위에서 작동하므로 미리 탄탄히 잡아야 합니다.",
      },
      {
        title: "단위원과 삼각함수 심화",
        body: "Pre-Calculus 삼각함수의 핵심은 단위원(반지름 1인 원)입니다. 원 위 한 점의 좌표가 (cosθ, sinθ)이고, 여기서 sin² + cos² = 1 같은 항등식이 자연스럽게 나옵니다. 그래프의 진폭·주기·위상이동을 읽는 훈련이 물리·공학의 파동으로 직결됩니다.",
      },
      {
        title: "극한(Limits) — 미적분으로 가는 다리",
        body: "극한은 'x가 어떤 값에 한없이 가까워질 때 함수가 어디로 향하는가'입니다. 실제로 그 점에 도달하지 않아도 '향하는 값'을 따집니다. 이 개념이 미분(순간변화율)과 적분(무한히 잘게 쪼갠 합)의 정의 그 자체이기 때문에, Pre-Calculus에서 극한을 미리 만나두는 것이 결정적입니다.",
      },
      {
        title: "수열과 급수(Series)",
        body: "수열은 규칙을 가진 수의 나열, 급수는 그 합입니다. 등차·등비수열의 일반항과 합 공식, 그리고 무한등비급수가 수렴/발산하는 조건을 다룹니다. 이는 AP Calculus BC의 핵심 단원(Taylor series 등)으로 그대로 이어집니다.",
      },
      {
        title: "벡터와 행렬(Vectors & Matrices)",
        body: "벡터는 '크기와 방향을 동시에 가진 양'(속도·힘)으로, 성분으로 더하고 빼며 내적으로 각도를 잽니다. 행렬은 수를 직사각형으로 배열한 것으로, 연립방정식을 한 번에 풀거나 변환을 표현합니다. 둘 다 대학 선형대수·물리의 기초입니다.",
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
        body: "미적분의 모든 정의가 극한에서 출발합니다. 함수가 '연속'이라는 건 극한값과 함숫값이 일치해 그래프가 끊기지 않는다는 뜻입니다. 0/0처럼 바로 계산이 안 되는 부정형을 인수분해·유리화·로피탈 등으로 처리하는 것이 첫 관문입니다.",
      },
      {
        title: "미분(Derivative) — 순간변화율과 접선",
        body: "도함수 f′(x)는 '그 점에서의 순간변화율 = 접선의 기울기'입니다. 위치를 미분하면 속도, 속도를 미분하면 가속도 — 변화를 다루는 모든 분야의 언어입니다. 곱·몫·연쇄법칙(chain rule)으로 복잡한 함수도 미분하고, 도함수의 부호로 함수의 증가·감소와 최대·최소(최적화)를 찾습니다.",
      },
      {
        title: "적분(Integral) — 넓이와 누적",
        body: "적분은 미분의 역연산이자 '곡선 아래 넓이'입니다. 무한히 얇은 직사각형을 더해 넓이를 구한다는 것이 정적분의 의미이고, 속도를 적분하면 이동거리처럼 '누적된 양'을 줍니다. 부정적분(원시함수 찾기)과 정적분(구간 넓이 계산)을 구분해 다룹니다.",
      },
      {
        title: "미적분의 기본정리(FTC) — 미분과 적분은 역연산",
        body: "미분과 적분이 서로 반대 작업이라는 것을 잇는 다리가 미적분의 기본정리입니다. 덕분에 넓이를 일일이 무한합으로 구하지 않고 '원시함수의 양 끝 값 차이'로 단숨에 계산할 수 있습니다. 미적분 전체를 하나로 묶는 가장 중요한 정리입니다.",
      },
      {
        title: "AP Calculus AB vs BC — 어디까지 가나",
        body: "AB는 극한·미분·기본 적분까지(대학 미적분 1학기 분량), BC는 그 위에 고급 적분기법·매개변수/극좌표·무한급수(Taylor series)까지(1+2학기 분량) 다룹니다. 즉 BC ⊃ AB이며, BC 시험에는 AB 점수(AB subscore)도 따로 나옵니다. 이공계 지망이면 BC가 표준입니다.",
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
