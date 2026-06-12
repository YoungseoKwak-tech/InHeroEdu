/**
 * Curated 수학 개념용어 (math concept terms) for the 단어장.
 *
 * Math Core Notes are formula-heavy and carry few "term cards", so the
 * auto-built vocab is thin for math. These hand-authored concept terms make a
 * real 수학 단어장: English term ↔ Korean term + a one-line Korean definition.
 * Merged into lib/vocab.ts so they appear under the 수학·통계 subjects.
 */

export interface MathVocabTerm { en: string; ko: string; def: string; unit?: number | null }

const CALC_AB: MathVocabTerm[] = [
  { en: "limit", ko: "극한", def: "입력이 어떤 값에 한없이 가까워질 때 함수값이 다가가는 값." },
  { en: "continuity", ko: "연속", def: "끊김 없이 이어지는 성질 — 극한값과 함숫값이 일치." },
  { en: "derivative", ko: "도함수", def: "함수의 순간변화율; 접선의 기울기를 주는 함수." },
  { en: "differentiation", ko: "미분", def: "도함수를 구하는 연산." },
  { en: "tangent line", ko: "접선", def: "한 점에서 곡선에 닿으며 그 점의 기울기를 갖는 직선." },
  { en: "instantaneous rate of change", ko: "순간변화율", def: "한 점에서의 변화율, 즉 그 점의 도함숫값." },
  { en: "average rate of change", ko: "평균변화율", def: "두 점을 잇는 직선의 기울기." },
  { en: "chain rule", ko: "연쇄법칙", def: "합성함수를 미분하는 법칙." },
  { en: "product rule", ko: "곱의 미분법", def: "두 함수 곱의 도함수를 구하는 공식." },
  { en: "quotient rule", ko: "몫의 미분법", def: "두 함수 몫의 도함수를 구하는 공식." },
  { en: "implicit differentiation", ko: "음함수 미분", def: "y가 음함수로 주어질 때 양변을 미분하는 방법." },
  { en: "critical point", ko: "임계점", def: "도함수가 0이거나 정의되지 않는 점." },
  { en: "local maximum", ko: "극댓값", def: "주변보다 큰 함숫값을 갖는 점." },
  { en: "local minimum", ko: "극솟값", def: "주변보다 작은 함숫값을 갖는 점." },
  { en: "inflection point", ko: "변곡점", def: "곡선의 오목·볼록이 바뀌는 점." },
  { en: "concavity", ko: "오목·볼록성", def: "곡선이 휘는 방향 — 2계도함수의 부호로 판단." },
  { en: "increasing/decreasing", ko: "증가/감소", def: "도함수 부호에 따른 함수의 증감." },
  { en: "extreme value", ko: "최댓값·최솟값", def: "구간에서 가장 크거나 작은 함숫값." },
  { en: "mean value theorem", ko: "평균값 정리", def: "어떤 점의 순간변화율이 구간의 평균변화율과 같다는 정리." },
  { en: "antiderivative", ko: "원시함수(부정적분)", def: "미분하면 주어진 함수가 되는 함수." },
  { en: "integral", ko: "적분", def: "넓이·누적량을 구하는 연산." },
  { en: "definite integral", ko: "정적분", def: "구간에서의 넓이, 즉 누적 변화량." },
  { en: "indefinite integral", ko: "부정적분", def: "적분상수를 포함한 일반 원시함수." },
  { en: "Riemann sum", ko: "리만 합", def: "구간을 잘게 나눠 넓이를 근사하는 합." },
  { en: "fundamental theorem of calculus", ko: "미적분의 기본정리", def: "미분과 적분이 서로 역연산임을 잇는 정리." },
  { en: "u-substitution", ko: "치환적분", def: "변수를 바꿔 적분을 단순화하는 기법." },
  { en: "area under a curve", ko: "곡선 아래 넓이", def: "정적분으로 구하는 영역의 넓이." },
  { en: "accumulation function", ko: "누적함수", def: "적분으로 정의된 누적량을 나타내는 함수." },
  { en: "related rates", ko: "관련 변화율", def: "서로 연결된 양들의 변화율 사이의 관계." },
  { en: "optimization", ko: "최적화", def: "도함수를 이용해 최대·최소를 찾는 문제." },
  { en: "asymptote", ko: "점근선", def: "곡선이 한없이 가까워지는 직선." },
  { en: "limit at infinity", ko: "무한대에서의 극한", def: "입력이 ±∞로 갈 때 함숫값의 경향." },
  { en: "L'Hôpital's rule", ko: "로피탈 정리", def: "0/0·∞/∞ 꼴 극한을 도함수로 계산하는 방법." },
  { en: "differential equation", ko: "미분방정식", def: "도함수를 포함하는 방정식." },
  { en: "slope field", ko: "기울기장", def: "미분방정식 해의 기울기를 점마다 표시한 그림." },
  { en: "average value of a function", ko: "함수의 평균값", def: "구간에서 적분으로 구한 함수의 평균." },
];

const CALC_BC_EXTRA: MathVocabTerm[] = [
  { en: "series", ko: "급수", def: "수열의 항을 모두 더한 것." },
  { en: "convergence", ko: "수렴", def: "급수·수열이 일정한 값에 다가감." },
  { en: "divergence", ko: "발산", def: "수렴하지 않고 무한히 커지거나 진동함." },
  { en: "geometric series", ko: "등비급수", def: "공비가 일정한 급수." },
  { en: "ratio test", ko: "비판정법", def: "연속한 항의 비로 급수의 수렴을 판정." },
  { en: "Taylor series", ko: "테일러 급수", def: "함수를 다항식의 무한합으로 전개한 것." },
  { en: "Maclaurin series", ko: "매클로린 급수", def: "x=0에서 전개한 테일러 급수." },
  { en: "power series", ko: "멱급수", def: "x의 거듭제곱으로 이루어진 급수." },
  { en: "radius of convergence", ko: "수렴반지름", def: "멱급수가 수렴하는 x 구간의 반경." },
  { en: "parametric equation", ko: "매개변수 방정식", def: "x, y를 매개변수 t로 나타낸 식." },
  { en: "polar coordinates", ko: "극좌표", def: "반지름과 각으로 위치를 나타내는 좌표." },
  { en: "arc length", ko: "호의 길이", def: "곡선의 길이를 적분으로 구한 값." },
  { en: "improper integral", ko: "이상적분", def: "무한 구간이나 불연속점이 있는 적분." },
  { en: "integration by parts", ko: "부분적분", def: "곱의 미분법의 역을 이용한 적분법." },
  { en: "logistic growth", ko: "로지스틱 성장", def: "한계용량에 수렴하는 성장 모형." },
  { en: "vector-valued function", ko: "벡터함수", def: "출력이 벡터인 함수." },
];

const STATS: MathVocabTerm[] = [
  { en: "mean", ko: "평균", def: "자료값의 합을 개수로 나눈 값." },
  { en: "median", ko: "중앙값", def: "크기순으로 늘어놓았을 때 가운데 값." },
  { en: "mode", ko: "최빈값", def: "가장 자주 나타나는 값." },
  { en: "variance", ko: "분산", def: "평균에서 흩어진 정도의 제곱 평균." },
  { en: "standard deviation", ko: "표준편차", def: "분산의 제곱근 — 흩어짐의 척도." },
  { en: "range", ko: "범위", def: "최댓값과 최솟값의 차." },
  { en: "interquartile range", ko: "사분위범위(IQR)", def: "Q3−Q1, 가운데 50% 자료의 폭." },
  { en: "outlier", ko: "이상치", def: "다른 값들과 동떨어진 극단값." },
  { en: "distribution", ko: "분포", def: "값들이 퍼져 있는 모양." },
  { en: "normal distribution", ko: "정규분포", def: "좌우대칭의 종 모양 분포." },
  { en: "skewness", ko: "왜도", def: "분포의 비대칭(치우침) 정도." },
  { en: "z-score", ko: "표준점수", def: "평균에서 표준편차의 몇 배 떨어졌는지." },
  { en: "percentile", ko: "백분위수", def: "그 값 이하인 자료의 비율 위치." },
  { en: "probability", ko: "확률", def: "사건이 일어날 가능성(0~1)." },
  { en: "random variable", ko: "확률변수", def: "무작위 결과에 수를 대응시킨 변수." },
  { en: "expected value", ko: "기댓값", def: "확률변수의 장기 평균." },
  { en: "binomial distribution", ko: "이항분포", def: "성공/실패를 n번 시행할 때의 분포." },
  { en: "sampling distribution", ko: "표본분포", def: "표본통계량(예: 표본평균)의 분포." },
  { en: "central limit theorem", ko: "중심극한정리", def: "표본평균의 분포가 정규분포에 가까워진다는 정리." },
  { en: "standard error", ko: "표준오차", def: "표본통계량의 표준편차." },
  { en: "confidence interval", ko: "신뢰구간", def: "모수를 포함할 것으로 기대되는 구간." },
  { en: "margin of error", ko: "오차한계", def: "신뢰구간 폭의 절반." },
  { en: "hypothesis test", ko: "가설검정", def: "자료로 주장(가설)을 검정하는 절차." },
  { en: "null hypothesis", ko: "귀무가설", def: "차이가 없다는 기본 가설(H₀)." },
  { en: "alternative hypothesis", ko: "대립가설", def: "입증하려는 가설(Hₐ)." },
  { en: "p-value", ko: "유의확률", def: "귀무가설이 참일 때 관측 이상 결과가 나올 확률." },
  { en: "significance level", ko: "유의수준", def: "귀무가설을 기각하는 기준값(α)." },
  { en: "Type I error", ko: "1종 오류", def: "참인 귀무가설을 잘못 기각하는 오류." },
  { en: "Type II error", ko: "2종 오류", def: "거짓인 귀무가설을 기각하지 못하는 오류." },
  { en: "correlation", ko: "상관", def: "두 변수의 선형 관계 정도." },
  { en: "correlation coefficient", ko: "상관계수", def: "상관의 강도·방향(−1~1)을 나타내는 r." },
  { en: "regression line", ko: "회귀직선", def: "자료를 가장 잘 맞추는 직선(최소제곱)." },
  { en: "residual", ko: "잔차", def: "관측값과 예측값의 차이." },
  { en: "coefficient of determination", ko: "결정계수", def: "회귀가 설명하는 변동의 비율(r²)." },
];

export const MATH_VOCAB: Record<string, { label: string; emoji: string; terms: MathVocabTerm[] }> = {
  "ap-calculus-ab": { label: "AP Calculus AB", emoji: "∫", terms: CALC_AB },
  "ap-calculus-bc": { label: "AP Calculus BC", emoji: "∫", terms: [...CALC_AB, ...CALC_BC_EXTRA] },
  "ap-statistics": { label: "AP Statistics", emoji: "📊", terms: STATS },
};
