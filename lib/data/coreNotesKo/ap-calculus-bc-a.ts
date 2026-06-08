/**
 * Core Notes 한국어 스토리텔링 버전 — AP Calculus BC Units 1–5 (각 단원 2개 레슨).
 * 원본 내용 전량 보존(overview·body·keyIdea·table·terms·traps·example 포함) + 일타강사 내러티브.
 * 원본에 overview/body가 없으므로 한국어 overview를 추가하고, body는 null 유지.
 * 용어는 "한국어 (English)" 병기. 수식은 깔끔한 기호(∫, dy/dx, Σ, lim, x², √) 사용.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const AP_CALCULUS_BC_A_KO: CoreNote[] = [
  {
    lessonId: "ap-calculus-bc-u1-l1",
    courseId: "ap-calculus-bc",
    subjectLabel: "AP Calculus BC",
    emoji: "∫",
    unit: 1,
    lessonNum: 1,
    unitName: "Limits and Continuity",
    title: "극한 복습과 로피탈 정리 — BC 심화",
    subtitle: null,
    overview:
      "BC에서 극한은 AB 수준의 '인수분해해서 약분' 정도로 끝나지 않습니다. 0/0, ∞/∞ 같은 부정형(indeterminate form)을 만나면 로피탈 정리(L'Hôpital's Rule)로 분자·분모를 각각 미분해서 뚫어야 해요. 핵심은 무턱대고 로피탈을 들이대는 게 아니라, 먼저 식을 0/0 또는 ∞/∞ 꼴로 바꾸는 변형 단계예요. 시험 함정: 0·∞ 같은 형태에 로피탈을 바로 적용하면 0점 — AP BC는 '변형 단계'를 일부러 콕 집어서 채점합니다.",
    objectives: [
      "로피탈 정리를 적용하기 전에 모든 식을 0/0 또는 ∞/∞ 꼴로 변형할 수 있다.",
      "무한대에서 eˣ와 ln x가 포함된 극한을 다룰 수 있다.",
    ],
    formulas: [
      "lim(x→a) f(x) = L",
      "제거 가능한 구멍(removable hole): 인수분해 후 약분",
      "∞에서의 끝 거동: 최고차항의 차수를 비교",
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
            term: "0/0를 넘어서는 부정형 (Indeterminate forms beyond 0/0)",
            def: "0·∞, ∞−∞, 1^∞, 0^0, ∞^0 같은 형태들. 이들은 곧장 로피탈로 갈 수 없고, 먼저 0/0 또는 ∞/∞ 꼴로 바꿔야 합니다.",
          },
        ],
        traps: [
          "0·∞ 형태에 로피탈을 곧장 적용하면 안 됩니다 — 반드시 먼저 0/0 또는 ∞/∞ 꼴로 다시 써야 해요. AP BC는 이 '변형 단계'를 대놓고 채점합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-calculus-bc-u1-l2",
    courseId: "ap-calculus-bc",
    subjectLabel: "AP Calculus BC",
    emoji: "∫",
    unit: 1,
    lessonNum: 2,
    unitName: "Limits and Continuity",
    title: "닫힌구간에서의 연속과 IVT 응용",
    subtitle: null,
    overview:
      "함수가 닫힌구간 [a, b]에서 연속이면, 중간값 정리(IVT, Intermediate Value Theorem)가 강력한 무기가 됩니다 — '해(root)가 존재한다'를 증명할 수 있어요. BC에서는 여기에 더해 균등연속(uniform continuity), 그리고 ODE 해의 유일성을 보장하는 립시츠 조건(Lipschitz condition)까지 시야를 넓힙니다. 시험 함정: IVT로 근의 존재를 증명할 때 두 가지 가정(연속 + 닫힌구간)을 모두 명시하지 않으면 감점 — '중간값 정리에 의해'라고만 쓰면 점수를 못 받습니다.",
    objectives: [
      "IVT를 사용해 해의 존재를 증명할 수 있다.",
      "균등연속(uniform continuity) 개념을 이해할 수 있다.",
      "ODE 해의 유일성을 위한 립시츠 조건(Lipschitz condition)을 이해할 수 있다.",
    ],
    formulas: [
      "lim(x→a) f(x) = L",
      "제거 가능한 구멍(removable hole): 인수분해 후 약분",
      "∞에서의 끝 거동: 최고차항의 차수를 비교",
    ],
    diagram: null,
    sections: [
      {
        title: "닫힌구간에서의 연속과 IVT 응용",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [],
        traps: [
          "근의 존재를 증명할 때 IVT의 두 가정(연속 + 닫힌구간)을 함께 인용하지 않으면 안 됩니다 — AP 서술형(FRQ)은 '중간값 정리에 의해'라는 말만으로는 안 되고, 명시적인 근거 제시를 요구합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-calculus-bc-u2-l1",
    courseId: "ap-calculus-bc",
    subjectLabel: "AP Calculus BC",
    emoji: "∫",
    unit: 2,
    lessonNum: 1,
    unitName: "Differentiation: Definition and Fundamental Properties",
    title: "미분 규칙 — BC 속도와 숙달",
    subtitle: null,
    overview:
      "BC 시험은 시간 싸움입니다. 연쇄법칙·곱의 법칙·몫의 법칙(chain, product, quotient rule)을 따로따로 천천히 쓸 여유가 없어요 — 세 가지를 연달아, 거의 반사적으로 처리할 수 있어야 합니다. 여섯 개 삼각함수와 그 역함수의 도함수, 복잡한 관계식의 음함수 미분까지 손에 붙여 두세요. 시험 함정: sin²(e^(x²)) 같은 다층 합성함수를 단계별로 다시 쓰지 않고 한 번에 미분하지 못하면, 속도에서 무너집니다.",
    objectives: [
      "연쇄법칙·곱의 법칙·몫의 법칙을 빠르게 연달아 적용할 수 있다.",
      "여섯 개 삼각함수와 역삼각함수의 도함수를 구할 수 있다.",
      "복잡한 관계식에 대해 음함수 미분을 할 수 있다.",
    ],
    formulas: [
      "d/dx[xⁿ] = n·xⁿ⁻¹",
      "(fg)' = f'g + fg'",
      "(f/g)' = (f'g − fg')/g²",
    ],
    diagram: "tangent",
    sections: [
      {
        title: "미분 규칙 — BC 속도와 숙달",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [],
        traps: [
          "다층 합성함수에서 연쇄법칙을 느리게 적용하면 안 됩니다 — BC 시험은 시간 압박이 큽니다. sin²(e^(x²)) 같은 식을 단계별로 다시 쓰지 않고 한 번에 인식하고 미분할 수 있어야 해요.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-calculus-bc-u2-l2",
    courseId: "ap-calculus-bc",
    subjectLabel: "AP Calculus BC",
    emoji: "∫",
    unit: 2,
    lessonNum: 2,
    unitName: "Differentiation: Definition and Fundamental Properties",
    title: "매개변수 미분과 고계도함수",
    subtitle: null,
    overview:
      "매개변수 곡선에서는 x와 y가 둘 다 t의 함수입니다. 그래서 기울기는 dy/dx = (dy/dt)/(dx/dt)로 구하고, 2계도함수는 'dy/dx를 다시 t로 미분한 뒤 dx/dt로 나눈다'는 점이 핵심이에요. 2계도함수의 부호로 매개변수 곡선의 오목·볼록(concavity)도 판단할 수 있습니다. 시험 함정: d²y/dx²를 (y'')/(x''), 즉 2계도함수끼리 나눠 버리면 완전히 틀립니다.",
    objectives: [
      "dy/dx = (dy/dt)/(dx/dt), 그리고 d²y/dx² = [d/dt(dy/dx)]/(dx/dt)를 구할 수 있다.",
      "2계도함수의 부호로 매개변수 곡선의 오목·볼록을 판단할 수 있다.",
    ],
    formulas: [
      "d/dx[xⁿ] = n·xⁿ⁻¹",
      "(fg)' = f'g + fg'",
      "(f/g)' = (f'g − fg')/g²",
    ],
    diagram: "tangent",
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "매개변수 형태의 호의 길이 (Arc length in parametric form)",
            def: "∫√(x'² + y'²) dt — x'와 y'는 각각 t에 대한 도함수입니다.",
          },
        ],
        traps: [
          "d²y/dx²를 (y'')/(x'')로 계산하면 안 됩니다 — 틀립니다. 반드시 dy/dx를 t에 대해 미분한 다음, 그 결과를 dx/dt로 나눠야 해요.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-calculus-bc-u3-l1",
    courseId: "ap-calculus-bc",
    subjectLabel: "AP Calculus BC",
    emoji: "∫",
    unit: 3,
    lessonNum: 1,
    unitName: "Differentiation: Composite, Implicit, and Inverse",
    title: "BC 수준 곡선의 음함수 미분",
    subtitle: null,
    overview:
      "음함수 미분(implicit differentiation)은 y가 x로 깔끔하게 풀리지 않을 때 쓰는 도구예요. 곱의 법칙·연쇄법칙이 섞인 복잡한 관계식도 양변을 그대로 미분하면 됩니다. BC에서는 한 발 더 나아가, dy/dx를 다시 미분해 d²y/dx²까지 음함수로 구하고, 같은 곡선 위 여러 점에서 접선을 찾습니다. 시험 함정: 2계 음함수 도함수를 구할 때 앞서 구한 dy/dx 식을 대입하지 않으면 답이 완성되지 않습니다.",
    objectives: [
      "곱의 법칙과 연쇄법칙을 사용해 복잡한 음함수 관계식을 미분할 수 있다.",
      "dy/dx를 다시 미분하여 d²y/dx²를 음함수로 구할 수 있다.",
      "같은 곡선 위 여러 점에서 접선을 구할 수 있다.",
    ],
    formulas: [
      "d/dx[f(g(x))] = f'(g(x))·g'(x)",
      "d/dx[eˣ] = eˣ, d/dx[ln x] = 1/x",
    ],
    diagram: "tangent",
    sections: [
      {
        title: "BC 수준 곡선의 음함수 미분",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [],
        traps: [
          "2계 음함수 도함수를 계산할 때 dy/dx 식을 대입하지 않으면 안 됩니다 — AP BC는 y² = x³ − x 같은 식을 주고 d²y/dx²를 묻습니다. 1계도함수 결과를 2계도함수 식에 반드시 대입해야 해요.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-calculus-bc-u3-l2",
    courseId: "ap-calculus-bc",
    subjectLabel: "AP Calculus BC",
    emoji: "∫",
    unit: 3,
    lessonNum: 2,
    unitName: "Differentiation: Composite, Implicit, and Inverse",
    title: "극형식에서의 도함수",
    subtitle: null,
    overview:
      "극좌표(polar)에서는 r이 θ의 함수예요. 곡선의 기울기 dy/dx는 r과 dr/dθ를 함께 써서 구하는데, 여기서 학생들이 가장 많이 헷갈립니다. 수평 접선은 dy/dθ = 0, 수직 접선은 dx/dθ = 0에서 나온다는 걸 정확히 기억하세요. 시험 함정: 수평 접선을 dr/dθ = 0으로 찾으면 틀립니다 — dr/dθ = 0은 r 자체에 대한 접선일 뿐, 곡선의 수평 접선이 아니에요.",
    objectives: [
      "θ에 대한 r의 변화율(dr/dθ)을 구할 수 있다.",
    ],
    formulas: [
      "d/dx[f(g(x))] = f'(g(x))·g'(x)",
      "d/dx[eˣ] = eˣ, d/dx[ln x] = 1/x",
    ],
    diagram: "tangent",
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "극형식에서의 dy/dx (dy/dx for polar)",
            def: "(dr/dθ · sinθ + r·cosθ) / (dr/dθ · cosθ − r·sinθ)",
          },
          {
            term: "수평·수직 접선 (Horizontal / vertical tangents)",
            def: "수평 접선: dy/dθ = 0; 수직 접선: dx/dθ = 0.",
          },
        ],
        traps: [
          "수평 접선을 dy/dθ = 0이 아니라 dr/dθ = 0으로 두고 찾으면 안 됩니다 — 극형식에서 수평 접선은 y'(θ) = 0을 요구합니다. dr/dθ = 0은 r 자체에 대한 접선일 뿐이에요.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-calculus-bc-u4-l1",
    courseId: "ap-calculus-bc",
    subjectLabel: "AP Calculus BC",
    emoji: "∫",
    unit: 4,
    lessonNum: 1,
    unitName: "Contextual Applications of Differentiation",
    title: "응용 문맥에서의 로피탈 정리",
    subtitle: null,
    overview:
      "물리 모델 같은 실제 상황에서 극한을 계산하다 보면 부정형(indeterminate form)이 자연스럽게 튀어나옵니다. 이때 로피탈 정리를 — 필요하면 여러 번 반복해서 — 적용해요. 한편 BC에서는 테일러 급수(Taylor series)가 로피탈의 대안이 될 수 있다는 점도 알아둬야 합니다. 시험 함정: lim (sin x − x)/x³ 같은 문제는 테일러 전개가 로피탈보다 훨씬 깔끔하고 실수도 적은데, 이걸 못 알아채면 시간만 낭비합니다.",
    objectives: [
      "물리 모델에서 나오는 극한의 부정형을 다룰 수 있다.",
      "필요할 때 로피탈 정리를 여러 번 적용할 수 있다.",
      "로피탈의 대안으로서 테일러 급수와의 연결을 이해할 수 있다.",
    ],
    formulas: [],
    diagram: "tangent",
    sections: [
      {
        title: "응용 문맥에서의 로피탈 정리",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [],
        traps: [
          "테일러 급수가 로피탈보다 빠를 때를 못 알아채면 안 됩니다 — lim (sin x − x)/x³에서는 테일러 전개가 훨씬 깔끔해요. AP BC는 두 방법 모두 인정하는 경우가 많지만, 테일러 쪽이 실수가 적습니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-calculus-bc-u4-l2",
    courseId: "ap-calculus-bc",
    subjectLabel: "AP Calculus BC",
    emoji: "∫",
    unit: 4,
    lessonNum: 2,
    unitName: "Contextual Applications of Differentiation",
    title: "최적화와 관련 비율 — BC 수준의 복잡성",
    subtitle: null,
    overview:
      "최적화(optimization)와 관련 비율(related rates)은 AB에서도 다루지만, BC는 임계점이 여러 개 나오는 복잡한 상황으로 난도를 끌어올립니다. 임계점을 하나 찾았다고 끝이 아니라, 그것이 전역 최적값(global optimum)인지 끝까지 검증해야 해요. 시험 함정: 임계점이 여러 개인 설정에서 어느 것이 전역 최적값인지 확인하지 않으면 안 됩니다 — AP BC는 임계점이 여럿 나오는 시나리오를 주고, 전부 검사해 값을 비교하기를 요구합니다.",
    objectives: [
      "다변수·복합 설정에서 최적화 문제를 풀 수 있다.",
      "관련 비율 문제를 BC 수준의 복잡도로 다룰 수 있다.",
      "여러 임계점 중 어느 것이 전역 최적값인지 검증할 수 있다.",
    ],
    formulas: [],
    diagram: "tangent",
    sections: [
      {
        title: "최적화와 관련 비율 — BC 수준의 복잡성",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [],
        traps: [
          "다변수 설정에서 어느 임계점이 전역 최적값인지 확인하지 않으면 안 됩니다 — AP BC는 임계점이 여러 개인 시나리오를 줍니다. 전부 검사하고 값을 비교해야 해요.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-calculus-bc-u5-l1",
    courseId: "ap-calculus-bc",
    subjectLabel: "AP Calculus BC",
    emoji: "∫",
    unit: 5,
    lessonNum: 1,
    unitName: "Analytical Applications of Differentiation",
    title: "그래프 분석 — BC 문맥에서의 f, f', f''",
    subtitle: null,
    overview:
      "그래프 분석의 본질은 f, f'(1계도함수), f''(2계도함수) 세 그래프를 자유자재로 오가는 것입니다. f'의 부호로 증가·감소를, f''의 부호로 오목·볼록을 읽어내야 해요. BC 문맥에서는 이 해석을 한층 더 정교하게 요구합니다. 시험 함정: f' 그래프에서 0이 되는 점만 보고 극대·극소를 판정하면 안 됩니다 — 그 점에서 부호 변화(sign change)가 실제로 일어나는지 반드시 확인해야 합니다.",
    objectives: [
      "f, f', f'' 그래프 사이를 오가며 함수의 거동을 해석할 수 있다.",
      "f'의 부호 변화로 극대·극소를 판정할 수 있다.",
      "f''의 부호로 오목·볼록과 변곡점을 판단할 수 있다.",
    ],
    formulas: [
      "임계점(critical pt): f'(x) = 0 이거나 정의되지 않음",
      "f'' > 0 ⇒ 아래로 볼록(concave up)",
      "평균값 정리(MVT): f'(c) = (f(b) − f(a))/(b − a)",
    ],
    diagram: "tangent",
    sections: [
      {
        title: "그래프 분석 — BC 문맥에서의 f, f', f''",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [],
        traps: [
          "부호 변화를 확인하지 않고 f'만 보고 극대·극소를 판정하면 안 됩니다 — AP BC는 0을 지나는 f' 그래프를 줍니다. 단순히 0인 점을 찾는 게 아니라, 그 점에서 부호가 실제로 바뀌는지 확인해야 해요.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-calculus-bc-u5-l2",
    courseId: "ap-calculus-bc",
    subjectLabel: "AP Calculus BC",
    emoji: "∫",
    unit: 5,
    lessonNum: 2,
    unitName: "Analytical Applications of Differentiation",
    title: "매개변수·극형식에서의 극값",
    subtitle: null,
    overview:
      "극값(extreme value)을 찾는 방식은 형태에 따라 달라집니다. 매개변수·극형식에서는 '무엇의 극값을 묻는가'를 먼저 정확히 가려내야 해요. 곡선 위 점의 y좌표 극값이라면 dy/dθ = 0을, 원점으로부터의 최대 거리라면 r'(θ) = 0을 풀어야 합니다. 시험 함정: 원점으로부터의 최대 거리를 묻는 문제에서 dy/dθ = 0을 풀면 틀립니다 — 이때는 r'(θ) = 0이 정답입니다.",
    objectives: [
      "매개변수 형태에서 곡선의 극값을 구할 수 있다.",
      "극형식에서 원점으로부터의 최대·최소 거리를 r'(θ) = 0으로 구할 수 있다.",
      "묻는 대상에 따라 dy/dθ = 0과 r'(θ) = 0을 구분해 적용할 수 있다.",
    ],
    formulas: [
      "임계점(critical pt): f'(x) = 0 이거나 정의되지 않음",
      "f'' > 0 ⇒ 아래로 볼록(concave up)",
      "평균값 정리(MVT): f'(c) = (f(b) − f(a))/(b − a)",
    ],
    diagram: "tangent",
    sections: [
      {
        title: "매개변수·극형식에서의 극값",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [],
        traps: [
          "곡선의 위치(거리)의 최대·최소를 찾는데 r'(θ) = 0이 아니라 다른 식으로 임계 θ를 구하면 안 됩니다 — AP BC는 원점으로부터의 최대 거리를 물을 수 있고, 이때는 dy/dθ = 0이 아니라 r'(θ) = 0이 필요합니다.",
        ],
        example: null,
      },
    ],
  },
];
