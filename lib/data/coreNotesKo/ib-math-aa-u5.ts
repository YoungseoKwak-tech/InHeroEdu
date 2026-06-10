/**
 * Core Notes 한국어 스토리텔링 버전 — IB Math AA Unit 5 (미적분).
 * 원본 내용 전량 보존(objectives·terms·traps·example·formulas) + 일타강사 내러티브.
 * 용어는 "한국어 (English)" 병기.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const IB_MATH_AA_U5_KO: CoreNote[] = [
  {
    lessonId: "ib-math-aa-u5-l1",
    courseId: "ib-math-aa",
    subjectLabel: "IB Math AA",
    emoji: "➗",
    unit: 5,
    lessonNum: 1,
    unitName: "미적분 (Calculus)",
    title: "극한, 제1원리 미분, 미분 규칙: 다항함수·삼각함수·지수·로그",
    subtitle: "미분이란 '순간 변화율'을 수식으로 포착하는 것이고, 제1원리는 그 정의 자체다",
    overview:
      "IB AA 미적분의 시작점은 극한(limit)입니다. 'x가 a에 한없이 가까워질 때 f(x)가 어떤 값에 한없이 가까워지는가'라는 질문이 미분의 토대입니다. 제1원리(first principles)는 평균 변화율(average rate of change)의 극한으로 순간 변화율, 즉 미분계수(derivative)를 정의합니다: f'(x) = lim_{h→0} [f(x+h)−f(x)]/h. 이 정의를 한 번 확실히 이해하면 이후의 모든 미분 규칙은 '이것을 매번 계산하지 않기 위한 단축키'임을 알게 됩니다. IB Paper 1에서는 제1원리 유도와 규칙의 개념적 이해를, Paper 2에서는 GDC와 함께 복합 함수에 규칙을 적용하는 능력을 시험합니다.",
    objectives: [
      "극한(limit)의 개념을 직관적으로 설명하고, 제1원리 f'(x) = lim_{h→0} [f(x+h)−f(x)]/h를 이용해 다항함수의 도함수를 유도할 수 있다",
      "거듭제곱 규칙(power rule) d/dx(xⁿ) = nxⁿ⁻¹을 정수·분수·음수 지수에 모두 적용하고, 상수 배·합·차의 미분 규칙을 사용할 수 있다",
      "연쇄 규칙(chain rule) dy/dx = dy/du · du/dx를 이용해 합성함수를 미분할 수 있다",
      "곱의 규칙(product rule) d/dx[uv] = u'v + uv'과 몫의 규칙(quotient rule) d/dx[u/v] = (u'v − uv')/v²를 적용할 수 있다",
      "표준 함수 sin x, cos x, tan x, eˣ, ln x의 도함수를 외우고, 이들과 미분 규칙을 결합해 복합 함수를 미분할 수 있다",
    ],
    formulas: [
      "제1원리: f'(x) = lim_{h→0} [f(x+h) − f(x)] / h",
      "거듭제곱 규칙: d/dx(xⁿ) = nxⁿ⁻¹",
      "연쇄 규칙: dy/dx = dy/du · du/dx  (y = f(u), u = g(x))",
      "곱의 규칙: d/dx[uv] = u'v + uv'",
      "몫의 규칙: d/dx[u/v] = (u'v − uv') / v²",
      "d/dx(sin x) = cos x,  d/dx(cos x) = −sin x,  d/dx(tan x) = sec²x",
      "d/dx(eˣ) = eˣ,  d/dx(eᵃˣ) = aeᵃˣ,  d/dx(ln x) = 1/x",
    ],
    sections: [
      {
        title: "극한과 제1원리 (Limits & Differentiation from First Principles)",
        subtitle: "제1원리를 한 번도 손으로 계산해보지 않은 사람은 미분 규칙이 왜 성립하는지 평생 모른다",
        terms: [
          {
            term: "극한 (Limit)",
            def: "lim_{x→a} f(x) = L은 'x가 a에 가까워질 때 f(x)는 L에 가까워진다'는 의미. x = a에서 f(a)가 정의되지 않아도 극한은 존재할 수 있습니다. 미분은 h → 0이라는 극한 과정이기 때문에 극한의 개념을 명확히 이해해야 합니다. IB에서 엄밀한 ε-δ 증명은 요구하지 않지만, '충분히 가까워진다'는 직관은 필수입니다.",
          },
          {
            term: "미분계수와 도함수 (Derivative)",
            def: "f'(x) = lim_{h→0} [f(x+h) − f(x)] / h. 점 x에서 f의 순간 변화율(instantaneous rate of change)이며, 그래프에서는 그 점에서의 접선의 기울기(gradient of tangent)입니다. f'(x), dy/dx, Df(x) 모두 같은 표기입니다. '프라임(prime)' 표기 f'(x)와 라이프니츠(Leibniz) 표기 dy/dx를 문맥에 따라 선택하세요.",
          },
          {
            term: "미분 가능성 (Differentiability)",
            def: "함수가 x = a에서 미분 가능하려면 그 점에서 연속(continuous)이어야 하고, 좌미분과 우미분이 같아야 합니다. 뾰족점(corner), 불연속점, 수직 접선에서는 미분이 불가능합니다. IB HL에서 |x| 같은 함수의 x = 0 미분 불가능성을 묻는 문항이 출제됩니다.",
          },
          {
            term: "제1원리 적용 (Applying first principles)",
            def: "단계: ① f(x+h) 전개 → ② f(x+h) − f(x) 계산(h가 약분됨) → ③ h → 0 취함. f(x) = x²이면 f(x+h) = x²+2xh+h², 차 = 2xh+h² = h(2x+h), h로 나누면 2x+h, h → 0이면 f'(x) = 2x. Paper 1에서 f(x) = xⁿ (n = 2, 3) 또는 f(x) = 1/x 형태로 출제됩니다.",
          },
        ],
        traps: [
          "제1원리 계산에서 f(x+h)를 전개할 때 (x+h)²를 x²+h²로 틀리게 전개하는 오류가 매우 흔합니다. 반드시 (x+h)² = x²+2xh+h²로, (x+h)³ = x³+3x²h+3xh²+h³로 전개하세요. 중간 항 2xh, 3x²h가 없으면 h가 약분되지 않아 극한을 취할 수 없습니다.",
          "lim_{h→0}을 '단계 ③에서만' 적용해야 하는데, 처음부터 h = 0을 대입해 분자와 분모가 모두 0이 되는 오류를 범하는 경우가 있습니다. h가 약분될 때까지 lim 기호를 유지하고, 약분 후에만 h = 0을 대입하세요.",
        ],
        example:
          "f(x) = x³을 제1원리로 미분합니다. f(x+h) = (x+h)³ = x³ + 3x²h + 3xh² + h³. f(x+h) − f(x) = 3x²h + 3xh² + h³ = h(3x² + 3xh + h²). [f(x+h)−f(x)]/h = 3x² + 3xh + h². lim_{h→0} (3x² + 3xh + h²) = 3x². 따라서 f'(x) = 3x². 검증: 거듭제곱 규칙 d/dx(x³) = 3x²와 일치. Paper 1에서 이 풀이 과정을 단계별로 명확히 쓰면 Method + Answer 마크를 모두 확보합니다.",
      },
      {
        title: "미분 규칙과 표준 함수의 도함수 (Differentiation Rules & Standard Derivatives)",
        subtitle: "연쇄 규칙은 '겉미분 × 속미분'이라는 한 줄로 기억하면 어떤 합성함수도 무너진다",
        terms: [
          {
            term: "거듭제곱·합·차 규칙 (Power, sum & difference rules)",
            def: "d/dx(xⁿ) = nxⁿ⁻¹ (n은 실수 전체에 적용). d/dx(cf(x)) = cf'(x), d/dx[f(x) ± g(x)] = f'(x) ± g'(x). 분수 지수: d/dx(√x) = d/dx(x^{1/2}) = (1/2)x^{-1/2} = 1/(2√x). 음수 지수: d/dx(1/x) = d/dx(x⁻¹) = −x⁻² = −1/x².",
          },
          {
            term: "연쇄 규칙 (Chain rule)",
            def: "y = f(g(x))이면 dy/dx = f'(g(x)) · g'(x). 치환 u = g(x)로 쓰면 dy/dx = dy/du · du/dx. '겉함수를 미분하되 속은 그대로 두고, 곱하기 속함수 미분'. 예: d/dx(sin(3x)) = cos(3x) · 3 = 3cos(3x). 합성이 몇 겹이든 겉에서 안으로 차례로 적용합니다.",
          },
          {
            term: "곱의 규칙과 몫의 규칙 (Product & quotient rules)",
            def: "곱: (uv)' = u'v + uv'. 순서: '앞미분×뒤 + 앞×뒤미분'. 몫: (u/v)' = (u'v − uv')/v². 부호 주의: 분자에서 빼는 순서는 항상 '분자미분×분모 − 분자×분모미분'. tan x = sin x / cos x를 몫의 규칙으로 미분하면 sec²x가 됨을 직접 유도해보세요.",
          },
          {
            term: "표준 함수 도함수 (Standard function derivatives)",
            def: "sin x → cos x, cos x → −sin x, tan x → sec²x = 1/cos²x. eˣ → eˣ (자기 자신), eᵃˣ → aeᵃˣ. ln x → 1/x (x > 0). aˣ → aˣ ln a. 이 목록은 IB 시험 공식집(formula booklet)에 포함되어 있지만, 연쇄 규칙과 결합한 복합 형태는 직접 계산해야 합니다.",
          },
        ],
        traps: [
          "연쇄 규칙에서 '속함수 미분'을 빠뜨리는 실수가 가장 빈번합니다. d/dx(e^{x²})를 단순히 e^{x²}로 쓰면 안 됩니다. 속함수 x²의 미분 2x를 곱해 d/dx(e^{x²}) = 2x·e^{x²}가 맞습니다. 합성함수를 볼 때마다 '속함수가 있는가? 속미분을 곱했는가?'를 자문하세요.",
          "몫의 규칙에서 분자 부호를 뒤집는 오류가 자주 나옵니다. (u/v)' = (u'v − uv')/v²에서 뺄셈 순서가 고정되어 있습니다. u'v − uv'를 uv' − u'v로 쓰면 부호가 반대로 틀립니다. 분자를 쓸 때 '분자 미분 먼저'라는 순서를 지키세요.",
        ],
        example:
          "h(x) = x² · e^{3x}를 미분합니다. 곱의 규칙: u = x², v = e^{3x}. u' = 2x, v' = 3e^{3x} (연쇄 규칙). h'(x) = 2x · e^{3x} + x² · 3e^{3x} = e^{3x}(2x + 3x²) = xe^{3x}(2 + 3x). 이제 g(x) = sin²(2x)를 미분합니다. g(x) = [sin(2x)]². 연쇄 규칙(겹 적용): 겉 u² → 2u · (속미분), 속 sin(2x) → 2cos(2x). g'(x) = 2sin(2x) · 2cos(2x) = 4sin(2x)cos(2x) = 2sin(4x). 이중 연쇄 규칙의 전형적인 예입니다.",
      },
    ],
  },
  {
    lessonId: "ib-math-aa-u5-l2",
    courseId: "ib-math-aa",
    subjectLabel: "IB Math AA",
    emoji: "➗",
    unit: 5,
    lessonNum: 2,
    unitName: "미적분 (Calculus)",
    title: "미분의 응용: 접선·법선, 증가·감소, 정류점·최적화, 운동학",
    subtitle: "도함수는 함수의 '지도'다 — 기울기가 양수인 곳은 오르막, 0인 곳은 봉우리나 골짜기",
    overview:
      "미분의 진짜 힘은 응용에서 드러납니다. 곡선 위 한 점에서 접선(tangent)과 법선(normal)의 방정식을 구하는 것은 도함수가 기울기임을 직접 사용하는 가장 기본적인 응용입니다. 나아가 f'(x) > 0인 구간에서 함수는 증가(increasing), f'(x) < 0이면 감소(decreasing), f'(x) = 0인 점은 정류점(stationary point)입니다. 이계도함수(second derivative) f''(x)는 정류점의 성질(극대/극소/변곡점)을 판별하고, 함수의 오목·볼록(concavity)을 알려줍니다. 최적화(optimization)는 IB 단골 문항으로, '넓이 최대화', '비용 최소화' 등의 실생활 문제를 도함수로 해결합니다. 운동학(kinematics)에서는 변위·속도·가속도가 미적분으로 연결됩니다.",
    objectives: [
      "점 (a, f(a))에서 접선의 기울기 f'(a)와 법선의 기울기 −1/f'(a)를 구하고, y − f(a) = m(x − a)를 이용해 방정식을 작성할 수 있다",
      "f'(x)의 부호로 함수의 증가·감소 구간을 판별하고, f'(x) = 0인 정류점(극대·극소·변곡점)을 일계·이계 도함수 검정으로 분류할 수 있다",
      "이계도함수 f''(x)의 부호로 함수의 오목·볼록(concavity)과 변곡점(inflection point)을 결정할 수 있다",
      "실생활 최적화 문제에서 목적 함수를 설정하고, 도함수를 이용해 최댓값·최솟값을 구하며 답의 타당성을 문맥에서 검증할 수 있다",
      "운동학에서 변위 s(t), 속도 v(t) = s'(t), 가속도 a(t) = v'(t) = s''(t)의 관계를 이용해 입자의 운동을 분석할 수 있다",
    ],
    formulas: [
      "접선의 기울기: m_T = f'(a)",
      "법선의 기울기: m_N = −1/f'(a)  (f'(a) ≠ 0)",
      "접선/법선 방정식: y − f(a) = m(x − a)",
      "증가 구간: f'(x) > 0,  감소 구간: f'(x) < 0",
      "정류점: f'(x) = 0;  극대: f''(x) < 0,  극소: f''(x) > 0",
      "변곡점: f''(x) = 0이고 f''의 부호가 바뀌는 점",
      "운동학: v(t) = ds/dt,  a(t) = dv/dt = d²s/dt²",
    ],
    sections: [
      {
        title: "접선·법선과 증가·감소·정류점 (Tangents, Normals & Stationary Points)",
        subtitle: "정류점 분류 문제에서 이계도함수 검정이 '0'이 나오면 반드시 일계 도함수 부호 검정으로 보완해야 한다",
        terms: [
          {
            term: "접선과 법선 (Tangent & normal)",
            def: "접선(tangent): 곡선 y = f(x) 위의 점 (a, f(a))에서 기울기 f'(a)인 직선. 방정식: y − f(a) = f'(a)(x − a). 법선(normal): 접선에 수직인 직선으로 기울기 = −1/f'(a). f'(a) = 0이면 접선은 수평, 법선은 수직(x = a)입니다. IB에서 접선·법선의 방정식을 y = mx + c 형태나 ax + by + c = 0 형태로 최종 정리하라는 지시를 따르세요.",
          },
          {
            term: "증가·감소 구간 (Increasing & decreasing intervals)",
            def: "f'(x) > 0인 구간에서 f는 증가(strictly increasing), f'(x) < 0이면 감소(strictly decreasing). 구간은 f'(x) = 0인 점들을 경계로 나눕니다. IB에서 구간은 부등호를 이용한 x의 범위로 표현합니다 (예: −2 < x < 1). 구간의 끝점(경계)을 포함·불포함 여부는 문맥에 따릅니다.",
          },
          {
            term: "정류점과 극값 (Stationary points & extrema)",
            def: "f'(a) = 0인 점 (a, f(a))가 정류점. 이계 도함수 검정: f''(a) < 0이면 극대(local maximum), f''(a) > 0이면 극소(local minimum), f''(a) = 0이면 불확정 → 일계 도함수 부호 검정(first derivative test) 필요. 일계 검정: f'의 부호가 양→음이면 극대, 음→양이면 극소, 변화 없으면 변곡점.",
          },
          {
            term: "이계도함수와 오목·볼록 (Second derivative & concavity)",
            def: "f''(x) > 0인 구간에서 f는 위로 볼록(concave up), f''(x) < 0이면 아래로 볼록(concave down). 변곡점(inflection point): f''(x) = 0이고 f''의 부호가 바뀌는 점 → 오목·볼록이 전환되는 점. IB에서 변곡점 좌표를 정확히 구하고 부호 변화를 표나 서술로 증명해야 합니다.",
          },
        ],
        traps: [
          "이계 도함수 검정에서 f''(a) = 0이 나왔을 때 단정적으로 '변곡점'이라고 쓰는 오류가 빈번합니다. f''(a) = 0은 '검정 불가'를 의미하며, 반드시 일계 도함수 부호 검정으로 양쪽에서 f'의 부호를 확인해야 정류점의 성질을 결정할 수 있습니다. f(x) = x⁴의 x = 0처럼 f''(0) = 0이지만 극소인 경우가 그 예입니다.",
          "접선의 방정식을 구할 때 점 (a, f(a))를 대입하지 않고 일반식 y = f'(a)·x + c에서 c를 구하지 않는 실수가 많습니다. 기울기를 구한 후 반드시 실제 점의 좌표를 대입해 y절편 c = f(a) − f'(a)·a를 계산해야 완전한 방정식이 완성됩니다.",
        ],
        example:
          "f(x) = 2x³ − 9x² + 12x − 4를 분석합니다. f'(x) = 6x² − 18x + 12 = 6(x−1)(x−2). f'(x) = 0: x = 1, x = 2가 정류점. f''(x) = 12x − 18. f''(1) = −6 < 0 → x = 1에서 극대, f(1) = 2−9+12−4 = 1. f''(2) = 6 > 0 → x = 2에서 극소, f(2) = 16−36+24−4 = 0. 증가 구간: x < 1과 x > 2 (f' > 0), 감소 구간: 1 < x < 2. x = 1에서 접선: 기울기 f'(1) = 0 → 접선: y = 1 (수평). 법선: x = 1 (수직선).",
      },
      {
        title: "최적화와 운동학 (Optimization & Kinematics)",
        subtitle: "최적화 문제에서 답을 구한 뒤 '이것이 정말 최대/최소인가'를 반드시 검증해야 IB에서 full marks를 받는다",
        terms: [
          {
            term: "최적화 (Optimization)",
            def: "목적 함수(objective function) Q를 하나의 변수로 표현하고 dQ/dx = 0을 풀어 최적값을 찾는 과정. 단계: ① 변수 설정 → ② 제약 조건(constraint)으로 변수 줄이기 → ③ Q를 하나의 변수 식으로 표현 → ④ 미분해 0 놓기 → ⑤ 이계 도함수 검정 또는 끝점 비교로 최대·최소 확인 → ⑥ 문맥 검증(x > 0, 정수 여부 등).",
          },
          {
            term: "끝점 검정과 전역 최적 (Endpoint check & global extrema)",
            def: "닫힌 구간 [a, b]에서의 최댓값·최솟값은 내부 정류점의 함숫값과 양 끝점의 함숫값을 모두 비교해야 합니다. 정류점이 극값이라도 구간 끝에서 더 큰/작은 값이 나올 수 있습니다. IB에서 실용적 맥락(예: '길이가 양수')을 고려해 정의역을 제한한 뒤 끝점도 확인하세요.",
          },
          {
            term: "운동학의 미적분 (Calculus in kinematics)",
            def: "변위(displacement) s(t), 속도(velocity) v(t) = ds/dt, 가속도(acceleration) a(t) = dv/dt = d²s/dt². 속도가 양수이면 양의 방향, 음수이면 음의 방향으로 이동. 속도 = 0인 순간이 운동 방향 전환점. '속력(speed)'은 |v(t)|로 스칼라임에 주의.",
          },
          {
            term: "관련 변화율 (Related rates) — HL",
            def: "두 변수가 시간 t의 함수일 때, 연쇄 규칙으로 dy/dt = (dy/dx) · (dx/dt)를 구하는 문제 유형. 예: 구의 반지름이 변할 때 부피의 변화율 dV/dt = dV/dr · dr/dt = 4πr² · dr/dt. IB HL Paper 2에서 실생활 맥락의 관련 변화율 문제가 자주 출제됩니다.",
          },
        ],
        traps: [
          "최적화에서 dQ/dx = 0을 풀고 끝내는 오류가 빈번합니다. IB는 반드시 그 값이 최대인지 최소인지를 이계 도함수 검정(f'' > 0: 최소, f'' < 0: 최대) 또는 부호 변화로 확인하고, 문맥에서 답이 타당한지(길이가 양수인지, 면적이 실수인지 등)를 서술해야 full marks를 받습니다. 이 확인 단계를 생략하면 마지막 1–2점을 잃습니다.",
          "운동학에서 '총 이동 거리(total distance)'와 '변위(displacement)'를 혼용하는 오류가 자주 나옵니다. 변위는 s(t₂) − s(t₁)이고 방향을 포함한 순 이동량입니다. 총 이동 거리는 v = 0인 전환점에서 구간을 나누어 각 구간의 |Δs|를 더해야 합니다. 이 차이를 묻는 문제가 IB에서 반드시 출제됩니다.",
        ],
        example:
          "넓이 A = 120 cm²인 직사각형의 둘레를 최소화하는 변의 길이를 구합니다. 변수: 가로 x, 세로 y. 제약: xy = 120 → y = 120/x. 목적 함수: P = 2x + 2y = 2x + 240/x. dP/dx = 2 − 240/x². dP/dx = 0: x² = 120, x = √120 = 2√30 ≈ 10.95 cm. d²P/dx² = 480/x³ > 0 → 극소(최소). y = 120/x = √120 = 2√30. 정사각형일 때 둘레가 최소. 최소 둘레 = 4√120 = 8√30 ≈ 43.8 cm. 맥락 검증: x > 0이고 실수이므로 타당.",
      },
    ],
  },
  {
    lessonId: "ib-math-aa-u5-l3",
    courseId: "ib-math-aa",
    subjectLabel: "IB Math AA",
    emoji: "➗",
    unit: 5,
    lessonNum: 3,
    unitName: "미적분 (Calculus)",
    title: "적분: 부정적분·정적분, 넓이, 역연쇄 규칙, 치환 적분",
    subtitle: "적분은 미분의 역과정이자 '무한히 얇은 조각의 합'이다 — 이 두 관점을 동시에 갖는 것이 미적분학의 핵심이다",
    overview:
      "미적분의 두 번째 기둥은 적분(integration)입니다. 부정적분(indefinite integral)은 도함수가 f(x)인 함수 F(x)를 찾는 역미분(antidifferentiation)이고, 적분 상수 C를 반드시 포함합니다. 정적분(definite integral) ∫_a^b f(x) dx는 미적분학의 기본 정리(fundamental theorem of calculus)로 F(b) − F(a)로 계산하며, 기하적으로는 x축과 곡선 사이의 '부호가 있는 넓이(signed area)'입니다. IB AA에서는 표준 함수의 역미분, 역연쇄 규칙(reverse chain rule), 치환 적분(integration by substitution), 부분 적분(integration by parts — HL)이 핵심 기술입니다. 넓이와 부피(부피는 HL) 계산, 그리고 운동학에서의 적분 응용이 시험의 주요 문항 유형입니다.",
    objectives: [
      "표준 함수 xⁿ, eˣ, 1/x, sin x, cos x의 부정적분을 구하고 적분 상수 C의 역할을 설명할 수 있다",
      "미적분학의 기본 정리를 적용해 정적분 ∫_a^b f(x) dx = F(b) − F(a)를 계산하고, 정적분의 부호와 넓이의 관계를 이해할 수 있다",
      "역연쇄 규칙을 이용해 ∫f(g(x))g'(x) dx = F(g(x)) + C 형태의 적분을 계산할 수 있다",
      "치환 u = g(x)로 변수 변환하여 복잡한 적분을 단순화하고, 정적분에서 적분 한계도 함께 변환할 수 있다",
      "두 곡선 또는 곡선과 x축(y축) 사이의 넓이를 정적분으로 설정하고 계산할 수 있다",
    ],
    formulas: [
      "부정적분: ∫xⁿ dx = xⁿ⁺¹/(n+1) + C  (n ≠ −1),  ∫1/x dx = ln|x| + C",
      "∫eˣ dx = eˣ + C,  ∫eᵃˣ dx = eᵃˣ/a + C",
      "∫sin x dx = −cos x + C,  ∫cos x dx = sin x + C",
      "기본 정리: ∫_a^b f(x) dx = [F(x)]_a^b = F(b) − F(a)",
      "역연쇄 규칙: ∫f(g(x))·g'(x) dx = F(g(x)) + C",
      "x축과의 넓이: A = ∫_a^b |f(x)| dx",
      "두 곡선 사이 넓이: A = ∫_a^b [f(x) − g(x)] dx  (f(x) ≥ g(x) on [a,b])",
    ],
    sections: [
      {
        title: "부정적분과 정적분 (Indefinite & Definite Integration)",
        subtitle: "적분 상수 C는 게으름의 산물이 아니라 '역미분의 유일성이 없음'을 명시적으로 표현하는 수학적 정직함이다",
        terms: [
          {
            term: "부정적분 (Indefinite integral)",
            def: "∫f(x) dx = F(x) + C, 여기서 F'(x) = f(x). 미분의 역과정. + C는 '미분하면 사라지는 모든 상수'를 대표합니다. 초기 조건(initial condition)이 주어지면 C의 값을 결정할 수 있습니다. 예: 곡선이 점 (1, 5)를 지난다는 조건이 있으면 F(1) + C = 5로 C를 구합니다.",
          },
          {
            term: "미적분학의 기본 정리 (Fundamental Theorem of Calculus)",
            def: "∫_a^b f(x) dx = F(b) − F(a), 여기서 F'(x) = f(x). 미분과 적분이 역관계임을 공식화한 정리. 기하적 의미: x = a부터 x = b까지 f(x)와 x축 사이의 부호 있는 넓이. f(x) < 0인 구간에서 적분값은 음수이므로, 실제 넓이를 구하려면 절댓값을 사용해야 합니다.",
          },
          {
            term: "정적분의 성질 (Properties of definite integrals)",
            def: "∫_a^b f(x) dx = −∫_b^a f(x) dx (한계 교환). ∫_a^a f(x) dx = 0. ∫_a^b [f(x) ± g(x)] dx = ∫_a^b f(x) dx ± ∫_a^b g(x) dx (선형성). ∫_a^b f(x) dx = ∫_a^c f(x) dx + ∫_c^b f(x) dx (구간 분할). 대칭 함수: f가 우함수(even)이면 ∫_{-a}^{a} f dx = 2∫_0^a f dx, 기함수(odd)이면 = 0.",
          },
          {
            term: "표준 함수의 부정적분 (Standard integrals)",
            def: "∫xⁿ dx = xⁿ⁺¹/(n+1) + C (n ≠ −1). ∫x⁻¹ dx = ∫(1/x) dx = ln|x| + C. ∫eˣ dx = eˣ + C. ∫sin x dx = −cos x + C (부호 주의!). ∫cos x dx = sin x + C. ∫sec²x dx = tan x + C. 이 목록은 IB 공식집에 포함됩니다.",
          },
        ],
        traps: [
          "∫sin x dx = cos x + C로 부호를 빠뜨리는 오류가 매우 흔합니다. sin의 적분은 −cos x + C이고, cos의 적분은 +sin x + C입니다. 미분 방향(sin→cos→−sin→−cos→sin)을 반시계 방향으로 기억하면 적분은 시계 방향(sin→−cos→−sin→cos→sin)이 됩니다. Paper 1에서 부호 오류는 치명적입니다.",
          "부정적분에서 + C를 쓰지 않으면 IB에서 감점됩니다. '적분 상수 C'는 완성된 답의 필수 구성 요소이며, 정적분(한계가 있는 적분)에서는 C가 F(b) − F(a)에서 상쇄되므로 쓰지 않습니다. 부정/정적분에서 C의 유무를 혼동하지 마세요.",
        ],
        example:
          "∫_0^2 (3x² − 4x + 1) dx를 계산합니다. 부정적분: F(x) = x³ − 2x² + x. 정적분: F(2) − F(0) = (8 − 8 + 2) − (0) = 2. 해석: x = 0부터 x = 2까지 곡선 y = 3x²−4x+1과 x축 사이의 부호 있는 넓이 = 2. 검증: 3x²−4x+1 = (3x−1)(x−1)이고 근은 x = 1/3, x = 1. 0 < x < 1/3에서 양, 1/3 < x < 1에서 음, 1 < x < 2에서 양이므로 정적분 값(부호 있는 합)이 실제 총 넓이와 다릅니다. 총 넓이를 구하려면 구간을 나누어 |…| dx로 계산해야 합니다.",
      },
      {
        title: "역연쇄 규칙, 치환 적분, 넓이 계산 (Reverse Chain Rule, Substitution & Area)",
        subtitle: "치환 u = g(x)을 쓸 때 du = g'(x)dx까지 적어야 — 이 한 줄이 계산을 완성한다",
        terms: [
          {
            term: "역연쇄 규칙 (Reverse chain rule)",
            def: "∫f'(g(x)) · g'(x) dx = f(g(x)) + C. 피적분 함수가 '합성 함수 × 안함수의 도함수' 구조이면 직접 적분 가능. 예: ∫2x(x²+1)⁴ dx → u = x²+1, du = 2x dx → ∫u⁴ du = u⁵/5 + C = (x²+1)⁵/5 + C. g'(x)가 정확히 옆에 있는지 확인하거나, 상수 배를 조정(multiply and divide)합니다.",
          },
          {
            term: "치환 적분 (Integration by substitution)",
            def: "u = g(x)로 치환 → du = g'(x) dx → 피적분 함수를 u만의 식으로 변환 → ∫h(u) du 계산 → u를 x로 되돌리기. 정적분에서 치환 시 한계(limits)도 u = g(a), u = g(b)로 바꾸거나, 부정적분 후 u를 x로 환원한 뒤 한계를 대입합니다. 두 방법 중 어느 쪽이든 IB에서 인정됩니다.",
          },
          {
            term: "부분 적분 (Integration by parts) — HL",
            def: "∫u dv = uv − ∫v du. 곱의 규칙 (uv)' = u'v + uv'을 적분한 결과. u와 dv의 선택 기준: LIATE 순서(Logarithmic, Inverse trig, Algebraic, Trigonometric, Exponential) — 앞에 있을수록 u로 선택. ∫x·eˣ dx: u = x, dv = eˣ dx → du = dx, v = eˣ → xeˣ − ∫eˣ dx = xeˣ − eˣ + C.",
          },
          {
            term: "넓이와 정적분 (Area & definite integrals)",
            def: "x축과 곡선 사이 넓이: f(x)가 음수인 구간이 있으면 A = ∫|f(x)| dx. 구간을 나누어 계산: 양인 구간의 적분 − 음인 구간의 적분. 두 곡선 y = f(x)와 y = g(x) 사이 넓이(f(x) ≥ g(x)): A = ∫_a^b [f(x) − g(x)] dx. 교점(intersection)이 경계가 됩니다.",
          },
        ],
        traps: [
          "치환 적분에서 du를 구한 후 dx를 소거하지 않고 그대로 두는 오류가 자주 나옵니다. u = x²+1, du = 2x dx이면 x dx = du/2로 교체해야 합니다. x dx가 피적분 함수에 없거나 정확히 약분되지 않으면 단순 치환으로 해결 불가 — g'(x)의 배수로 조정(상수 보정)하거나 다른 방법을 찾아야 합니다.",
          "두 곡선 사이 넓이를 구할 때 어느 곡선이 위에 있는지 확인하지 않고 ∫[f−g] dx를 쓰면 교점 사이에서 대소 관계가 바뀔 때 음수 넓이가 나옵니다. 교점을 먼저 구하고, 각 구간에서 어느 함수가 큰지를 확인한 뒤 절댓값 형태 ∫|f(x)−g(x)| dx로 접근하거나 구간을 분리하세요.",
        ],
        example:
          "∫_1^3 (2x)/(x²+1) dx를 치환 적분으로 계산합니다. u = x²+1, du = 2x dx. 한계 변환: x = 1 → u = 2, x = 3 → u = 10. 적분: ∫_2^{10} (1/u) du = [ln|u|]_2^{10} = ln 10 − ln 2 = ln 5. 이제 y = x² + 2와 y = 2x − 1 사이 넓이를 구합니다. 교점: x²+2 = 2x−1 → x²−2x+3 = 0 → 판별식 4−12 < 0 → 교점 없음. y = x²+2 > y = 2x−1 항상(최솟값 차: x = 1에서 3−1 = 2 > 0). 넓이(−1 ≤ x ≤ 2 구간): A = ∫_{-1}^{2} [(x²+2)−(2x−1)] dx = ∫_{-1}^{2} (x²−2x+3) dx = [x³/3 − x² + 3x]_{-1}^{2} = (8/3−4+6) − (−1/3−1−3) = (14/3) − (−13/3) = 27/3 = 9.",
      },
    ],
  },
];
