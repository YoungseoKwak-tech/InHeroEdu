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
  },
  {
    course: "Calculus", emoji: "∫",
    blurb: "극한·미분·적분 — 미적분 본론 (AP Calculus로 연결).",
    topics: [
      { en: "Limits and Continuity", ko: "함수의 극한과 연속" },
      { en: "Derivatives", ko: "함수의 미분" },
      { en: "Integrals", ko: "함수의 적분" },
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
