/**
 * Core Notes 한국어 일타강사 버전 — AP Calculus BC Unit 9
 * (Parametric Equations, Polar Coordinates, and Vector-Valued Functions).
 * 원본 내용 전량 보존(overview·body·keyIdea·table·terms·traps·example·diagram 포함)
 * + 일타강사 내러티브. 용어는 "한국어 (English)" 병기.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const AP_CALCULUS_BC_C_KO: CoreNote[] = [
  {
    lessonId: "ap-calculus-bc-u9-l1",
    courseId: "ap-calculus-bc",
    subjectLabel: "AP Calculus BC",
    emoji: "∫",
    unit: 9,
    lessonNum: 1,
    unitName: "Parametric Equations, Polar Coordinates, and Vector-Valued Functions",
    title: "매개변수 방정식 — 완전 분석",
    subtitle: null,
    overview:
      "매개변수 방정식(parametric equations)은 x와 y를 따로따로, 제3의 변수 t(보통 시간)의 함수로 적는 방식이에요. 한 입자가 곡선 위를 '어떻게 움직이는지'까지 담아내는 거죠. 핵심 기술은 세 가지입니다 — 매개변수 t를 소거해 직교(Cartesian) 형태로 바꾸기, dy/dx = (dy/dt)/(dx/dt)로 기울기를 구하고 한 번 더 미분해 d²y/dx² 구하기, 그리고 속력 = √(x'² + y'²)로 이동 거리를 적분하기. 시험에서 제일 자주 무너지는 함정은 '이동 거리'와 '변위'를 헷갈리는 것 — 이동 거리는 반드시 속력을 적분해야 합니다.",
    objectives: [
      "매개변수를 소거해 직교 형태로 바꿀 수 있다.",
      "매개변수 곡선의 dy/dx와 d²y/dx²를 구할 수 있다.",
      "속력 = √(x'² + y'²); 이동 거리 = ∫속력 dt를 적용할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "매개변수 방정식 — 완전 분석",
        subtitle: null,
        body:
          "매개변수 곡선은 x = x(t), y = y(t) 두 식으로 정의돼요. 먼저 직교 형태로 바꾸려면 한 식에서 t를 풀어 다른 식에 대입해 t를 소거합니다. 기울기는 연쇄법칙으로 dy/dx = (dy/dt)/(dx/dt)이고, 2계 도함수는 d²y/dx² = (d/dt[dy/dx])/(dx/dt)로 — dy/dx를 t로 미분한 뒤 다시 dx/dt로 나눠요(여기서 실수가 제일 많습니다, x로 나누는 게 아니에요). 운동을 다룰 때 속력은 스칼라 √(x'² + y'²)이고, t = a부터 t = b까지 실제로 움직인 총 이동 거리는 이 속력을 적분한 ∫ₐᵇ √(x'² + y'²) dt입니다.",
        keyIdea:
          "dy/dx = (dy/dt)/(dx/dt). 2계 도함수는 dy/dx를 다시 t로 미분한 뒤 dx/dt로 나눈다. 이동 거리는 속력 √(x'² + y'²)를 적분한다.",
        table: null,
        terms: [],
        traps: [
          "이동 거리(distance)를 변위(displacement)로 계산하는 실수 — x'(t)와 y'(t)를 따로 적분하면 변위(각 성분의 알짜 변화)가 나옵니다. 실제로 움직인 총 이동 거리는 반드시 속력 = √(x'²+y'²)를 적분해야 하며, 두 성분을 따로 적분해서는 안 됩니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-calculus-bc-u9-l2",
    courseId: "ap-calculus-bc",
    subjectLabel: "AP Calculus BC",
    emoji: "∫",
    unit: 9,
    lessonNum: 2,
    unitName: "Parametric Equations, Polar Coordinates, and Vector-Valued Functions",
    title: "극좌표 — 변환과 그래프 그리기",
    subtitle: null,
    overview:
      "극좌표(polar coordinates)는 점을 (x, y)가 아니라 (r, θ)로 — 원점에서의 거리 r과 양의 x축에서 잰 각 θ로 나타내요. 원·꽃잎·나선처럼 회전 대칭이 있는 곡선은 직교좌표보다 극좌표로 훨씬 깔끔하게 표현됩니다. 변환 공식은 x = r cos θ, y = r sin θ이고 거꾸로는 r² = x² + y², tan θ = y/x예요. 시험의 핵심 함정은 그래프를 그리기 전에 곡선의 '종류'를 먼저 알아보지 못하는 것 — r = 2 + 3cos θ가 안쪽 고리를 가진 리마송인지 한눈에 분류할 수 있어야 합니다.",
    objectives: [
      "극좌표 (r, θ)와 직교좌표 (x, y) 사이를 변환할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "변환의 출발점은 두 쌍의 공식이에요 — 극→직교는 x = r cos θ, y = r sin θ이고, 직교→극은 r² = x² + y², tan θ = y/x입니다(θ는 점이 어느 사분면에 있는지 보고 보정하세요). 그래프를 그릴 땐 식의 '형태'로 곡선 종류를 먼저 분류합니다. r = a cos(nθ) 또는 r = a sin(nθ)는 장미(rose) 곡선 — n이 홀수면 꽃잎 n개, 짝수면 2n개예요. r = a ± b cos θ 꼴은 리마송(limaçon)으로, a < b면 안쪽 고리가 생기고 a = b면 카디오이드(cardioid, 심장형)가 됩니다. r = aθ는 나선(spiral)이고요. 마지막으로 대칭 검사 — θ를 -θ로 바꿔도 식이 같으면 극축(x축) 대칭, π-θ로 바꿔도 같으면 y축 대칭이라 곡선의 절반만 계산하고 나머지는 비춰 그릴 수 있어요.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "흔한 극곡선 그리기 (Graphing common polar curves)",
            def: "장미 곡선(rose curves), 리마송(limaçons), 카디오이드(cardioids), 나선(spirals).",
          },
          {
            term: "극좌표 대칭 검사 (Symmetry tests in polar)",
            def: "θ를 -θ로 바꾸기(극축 대칭), π-θ로 바꾸기(y축 대칭) 등으로 대칭성을 판정한다.",
          },
        ],
        traps: [
          "그래프를 그리기 전에 극곡선의 종류를 먼저 판별하지 않는 실수 — AP BC는 r = 2 + 3cos θ(안쪽 고리가 있는 리마송) 같은 식을 주고 직접 스케치하길 요구합니다. 식의 형태만 보고 곡선 종류를 알아보는 능력이 필수예요.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-calculus-bc-u9-l3",
    courseId: "ap-calculus-bc",
    subjectLabel: "AP Calculus BC",
    emoji: "∫",
    unit: 9,
    lessonNum: 3,
    unitName: "Parametric Equations, Polar Coordinates, and Vector-Valued Functions",
    title: "극좌표에서의 넓이와 호의 길이",
    subtitle: null,
    overview:
      "극좌표에서 넓이는 직사각형이 아니라 원점에서 뻗어 나오는 부채꼴(반지름 벡터가 쓸고 지나간 영역)로 잽니다. 그래서 공식이 A = ½∫ₐᵇ r² dθ 꼴이에요. 두 극곡선 사이의 넓이는 '바깥 곡선² - 안쪽 곡선²'을 적분합니다. 가장 까다로운 함정은 교점을 빠뜨리는 것 — 특히 두 곡선이 서로 다른 θ값에서 극점(원점)을 지날 때, 그 극점 교점을 놓치면 적분 구간 설정이 통째로 틀어집니다.",
    objectives: [
      "바깥 곡선에서 안쪽 곡선을 빼는 방식으로 극곡선 사이의 넓이를 구할 수 있다.",
      "(극점을 포함하여) 극곡선들의 교점을 찾을 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "극좌표 넓이의 기본 공식은 A = ½∫ₐᵇ r² dθ로, 반지름 벡터가 θ = a에서 θ = b까지 쓸고 지나간 영역의 넓이예요. 두 곡선 사이 영역은 ½∫ₐᵇ (r_바깥² - r_안쪽²) dθ로 — 반드시 제곱을 먼저 하고 빼야 합니다(차를 먼저 구해 제곱하면 틀려요). 적분 구간 a, b는 두 곡선의 교점에서 나오므로 교점을 모두 찾는 게 결정적이에요. 교점은 r₁ = r₂를 풀어 구하는데, 여기에 더해 두 곡선이 각각 r = 0이 되는 θ를 따로 확인해야 합니다 — 한 곡선은 θ = α에서, 다른 곡선은 θ = β에서 원점을 지날 수 있는데 r₁ = r₂ 방정식은 이런 극점 교점을 잡아내지 못하거든요.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "A = ½∫ₐᵇ r² dθ",
            def: "반지름 벡터가 쓸고 지나간 영역의 넓이.",
          },
        ],
        traps: [
          "극점에서의 교점을 놓치는 실수 — 두 곡선이 서로 다른 θ값에서 원점을 지날 수 있습니다. AP BC는 극점을 특수한 경우로 포함하여 모든 교점을 찾았는지를 평가합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-calculus-bc-u9-l4",
    courseId: "ap-calculus-bc",
    subjectLabel: "AP Calculus BC",
    emoji: "∫",
    unit: 9,
    lessonNum: 4,
    unitName: "Parametric Equations, Polar Coordinates, and Vector-Valued Functions",
    title: "벡터값 함수 — 미적분",
    subtitle: null,
    overview:
      "벡터값 함수(vector-valued function)는 매개변수 운동을 한 단계 위로 끌어올린 표현이에요. r(t) = x(t)î + y(t)ĵ처럼 위치를 하나의 벡터로 묶고, 이를 미분하면 속도 벡터 r'(t)가 나옵니다. 여기서 절대 헷갈리면 안 되는 짝이 있어요 — 속도(velocity)는 방향을 가진 벡터 r'(t)이고, 속력(speed)은 그 크기 |r'(t)|인 스칼라입니다. 그래서 변위는 ∫r'(t)dt(벡터), 총 이동 거리는 ∫|r'(t)|dt(스칼라)로 적분 대상 자체가 달라요. 단위 접선 벡터 T = r'/|r'|까지가 이 단원의 도구 세트입니다.",
    objectives: [
      "r(t) = x(t)î + y(t)ĵ; r'(t) = 속도 벡터.",
      "벡터 함수로부터 속력, 변위, 총 이동 거리를 구할 수 있다.",
      "단위 접선 벡터 T = r'/|r'|를 구할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "벡터값 함수 — 미적분",
        subtitle: null,
        body:
          "위치 벡터 r(t) = x(t)î + y(t)ĵ를 성분별로 미분하면 속도 벡터 r'(t) = x'(t)î + y'(t)ĵ를 얻어요. 속력은 이 속도 벡터의 크기 |r'(t)| = √(x'² + y'²)로 — 방향이 빠진 스칼라입니다. 운동을 분석할 때 두 적분을 절대 섞으면 안 돼요. 변위(displacement)는 속도 벡터 자체를 적분한 ∫r'(t)dt이고(시작점에서 끝점까지의 알짜 벡터), 총 이동 거리(total distance)는 속력을 적분한 ∫|r'(t)|dt(실제로 지나온 경로의 길이)입니다. 마지막으로 단위 접선 벡터는 속도 벡터를 그 크기로 나눠 정규화한 T = r'/|r'|로, 운동 방향만 가리키는 길이 1짜리 벡터예요.",
        keyIdea: null,
        table: null,
        terms: [],
        traps: [
          "속도 벡터와 속력을 혼동하는 실수 — 속도(velocity)는 r'(t)(방향을 가진 벡터)이고, 속력(speed)은 |r'(t)|(스칼라)입니다. AP BC는 변위가 ∫r'(t)dt를, 총 이동 거리가 ∫|r'(t)|dt를 사용한다는 점을 평가합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-calculus-bc-u9-l5",
    courseId: "ap-calculus-bc",
    subjectLabel: "AP Calculus BC",
    emoji: "∫",
    unit: 9,
    lessonNum: 5,
    unitName: "Parametric Equations, Polar Coordinates, and Vector-Valued Functions",
    title: "벡터값 함수 — 2차원 운동",
    subtitle: null,
    overview:
      "이번 레슨은 벡터 미적분을 본격적인 2차원 운동 분석에 적용해요. 속도 벡터를 적분하고 초기 조건을 더하면 위치를 복원할 수 있는데 — 핵심은 각 성분을 따로 적분한 뒤 초기 위치 벡터를 성분별로 더해야 한다는 거예요. 가속도 벡터 r''(t)는 운동 방향의 접선 성분과 그에 수직인 법선 성분으로 분해되고, 곡선이 휘는 정도는 곡률 κ = |r' × r''|/|r'|³로 잽니다. 시험에서 가장 자주 틀리는 부분이 바로 벡터 적분에서 초기 조건 처리 — 이걸 성분별로 정확히 하지 못하면 위치가 통째로 어긋납니다.",
    objectives: [
      "초기 조건을 이용해 속도로부터 위치를 적분으로 구할 수 있다.",
      "가속도 벡터와 그것의 접선 성분·법선 성분 분해를 다룰 수 있다.",
      "곡률 κ = |r' × r''|/|r'|³를 구할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "벡터값 함수 — 2차원 운동",
        subtitle: null,
        body:
          "속도 벡터 r'(t)를 적분하면 위치 벡터를 되찾을 수 있어요 — 정확히는 r(t) = ∫r'(t)dt + r(0)입니다. 여기서 r(0)은 초기 위치 벡터로, 각 성분(x, y)을 따로 적분한 뒤 그에 대응하는 초기 위치 성분을 더해야 합니다(공통 상수 하나로 뭉뚱그리면 안 돼요). 가속도는 r''(t)이고, 이를 운동 방향(단위 접선 벡터 T 방향)인 접선 성분과 그에 직교하는 법선 성분으로 분해하면 — 접선 성분은 속력이 얼마나 빨라지는지, 법선 성분은 경로가 얼마나 휘는지를 말해줘요. 곡선이 휘는 정도 자체는 곡률 κ = |r' × r''|/|r'|³로 정량화하는데, κ가 클수록 그 점에서 곡선이 급하게 꺾이는 겁니다.",
        keyIdea: null,
        table: null,
        terms: [],
        traps: [
          "벡터 적분을 올바르게 사용하지 못하는 실수 — ∫r'(t)dt + r(0)가 위치를 줍니다. 반드시 각 성분을 따로 적분하고 초기 위치 벡터를 성분별로 더해야 합니다.",
        ],
        example: null,
      },
    ],
  },
];
