/**
 * Core Notes 한국어 스토리텔링 버전 — AP Statistics Unit 2 (2.1–2.8 전체).
 * 원본 내용 전량 보존(objectives·terms·traps·formulas·diagram) + 일타강사 내러티브.
 * formulas는 수식이라 원문 그대로 유지. 용어는 "한국어 (English)" 병기.
 */
import type { CoreNote } from "@/lib/coreNotes";

const F = ["ŷ=a+bx", "r² = % variation explained", "residual = y−ŷ"];

export const AP_STATS_U2_KO: CoreNote[] = [
  {
    lessonId: "ap-statistics-u2-l1",
    courseId: "ap-statistics",
    subjectLabel: "AP Statistics",
    emoji: "📊",
    unit: 2,
    lessonNum: 1,
    unitName: "Exploring Two-Variable Data",
    title: "산점도와 상관",
    subtitle: "두 양적 변수의 관계를 산점도로 보고, r로 '선형' 강도를 재요.",
    overview:
      "두 양적 변수를 산점도로 그려 방향·형태·강도·이상치를 봅니다. 피어슨 상관계수 r은 '선형' 연관만 재고 −1에서 +1 사이예요. 그리고 상관은 인과를 함의하지 않아요 — 숨은 변수가 있을 수 있죠.",
    objectives: [
      "상관이 인과를 함의하지 않음 — 잠복 변수를 설명할 수 있다.",
    ],
    formulas: F,
    diagram: "scatter-regression",
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "산점도 설명은 방향·형태·강도·이상치예요. 피어슨 r은 선형 연관만 측정하고 −1에서 +1 사이입니다. r의 부호는 방향을, 절댓값은 선형 강도를 나타내요.",
        keyIdea:
          "산점도 = 방향·형태·강도·이상치. r은 '선형' 연관만 측정(−1~+1). 상관 ≠ 인과.",
        table: null,
        terms: [
          {
            term: "산점도 설명 (Describing scatterplot)",
            def: "방향, 형태, 강도, 이상치.",
          },
          {
            term: "피어슨 r (Pearson r)",
            def: "선형 연관만 측정, −1에서 +1 범위.",
          },
        ],
        traps: [
          "r로 비선형 연관을 설명하기 — r은 선형 강도만 재요; 강한 곡선 관계도 r ≈ 0일 수 있어요; AP는 곡선 산점도를 주고 r이 적절한 요약인지 시험합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-statistics-u2-l2",
    courseId: "ap-statistics",
    subjectLabel: "AP Statistics",
    emoji: "📊",
    unit: 2,
    lessonNum: 2,
    unitName: "Exploring Two-Variable Data",
    title: "최소제곱 회귀선 — 해석",
    subtitle: "기울기는 '예측된' 변화 — 'predicted/average'를 빼먹으면 감점이에요.",
    overview:
      "최소제곱 회귀선 ŷ = a + bx에서 기울기 b = r(sy/sx), 절편 a = ȳ − bx̄예요. 기울기는 x 한 단위 증가당 y의 '예측된' 변화를 뜻하고, 절편은 맥락상 의미 없는 경우가 많습니다.",
    objectives: [
      "ŷ = a + bx; 기울기 b = r(sy/sx); 절편 a = ȳ − bx̄를 파악할 수 있다.",
      "절편을 맥락에서 해석할 수 있다(흔히 의미 없음).",
    ],
    formulas: F,
    diagram: "scatter-regression",
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "기울기 해석은 x가 1단위 증가할 때 y의 '예측된(평균적)' 변화예요. 절편은 x = 0일 때 예측값인데, x = 0이 맥락상 불가능하면 의미가 없습니다.",
        keyIdea:
          "기울기 = x 1단위 증가당 y의 '예측된' 변화. 절편은 맥락상 의미 없을 때 많음.",
        table: null,
        terms: [
          {
            term: "기울기 해석 (Interpreting slope)",
            def: "x 한 단위 증가당 y의 예측된 변화.",
          },
        ],
        traps: [
          "기울기를 '예측된' 없이 설명하기 — 회귀에서 기울기는 '예측된(또는 평균적)' 변화를 줘요; 특정 한 관측의 변화는 다를 수 있습니다; AP FRQ는 'predicted'나 'average' 누락 시 감점합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-statistics-u2-l3",
    courseId: "ap-statistics",
    subjectLabel: "AP Statistics",
    emoji: "📊",
    unit: 2,
    lessonNum: 3,
    unitName: "Exploring Two-Variable Data",
    title: "잔차와 선형성 평가",
    subtitle: "잔차 그래프의 '패턴'이 모델 문제를 드러내요 — 곡선·깔때기를 찾으세요.",
    overview:
      "잔차 = 관측값 − 예측값 = y − ŷ예요. 잔차 그래프에서 무작위 흩어짐은 선형 모델이 적합함을, 패턴(곡선·부채꼴)은 모델 문제를 나타냅니다.",
    objectives: [
      "잔차 = 관측값 − 예측값 = y − ŷ를 계산할 수 있다.",
      "잔차 그래프의 패턴(곡선·부채꼴)이 모델 문제를 나타냄을 설명할 수 있다.",
    ],
    formulas: F,
    diagram: "scatter-regression",
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "잔차 그래프(residual plot)에서 무작위 흩어짐은 좋은 선형 적합을 나타내요. 곡선 패턴은 선형 모델이 틀렸음을, 깔때기/부채꼴은 분산이 일정하지 않음을 나타냅니다.",
        keyIdea:
          "잔차 = y − ŷ. 잔차 그래프 무작위 = 좋은 선형 적합. 곡선 = 모델 틀림, 부채꼴 = 분산 불일정.",
        table: null,
        terms: [
          {
            term: "잔차 그래프 (Residual plot)",
            def: "무작위 흩어짐이 좋은 선형 적합을 나타냄.",
          },
        ],
        traps: [
          "잔차 그래프를 패턴 확인 없이 '무작위'라 부르기 — 잔차의 곡선은 선형 모델이 틀렸다는 뜻, 깔때기는 분산 불일정이에요; AP는 잔차 그래프를 주고 모델 적절성을 해석하게 합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-statistics-u2-l4",
    courseId: "ap-statistics",
    subjectLabel: "AP Statistics",
    emoji: "📊",
    unit: 2,
    lessonNum: 4,
    unitName: "Exploring Two-Variable Data",
    title: "R² — 결정계수",
    subtitle: "'x와의 선형 관계가 y 변동의 R²%를 설명한다' — 전체 맥락 해석이 필수예요.",
    overview:
      "R²(결정계수)는 x와의 선형 관계가 설명하는 y 변동의 비율이에요. 0에서 1 사이이고 클수록 적합이 좋습니다. 단순 선형 회귀에서 R² = r²예요.",
    objectives: [
      "R² = x와의 선형 관계가 설명하는 y 변동의 비율임을 설명할 수 있다.",
      "R²가 0에서 1 사이이고 클수록 적합이 좋음을 파악할 수 있다.",
    ],
    formulas: F,
    diagram: "scatter-regression",
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "R²는 x와의 선형 관계가 설명하는 y 변동의 비율이에요. 0에서 1 사이로 클수록 적합이 좋습니다. 단순 선형 회귀에서는 R² = r²로, r과 직접 연결돼요.",
        keyIdea:
          "R² = x와의 선형 관계가 설명하는 y 변동 비율(0~1). 단순 회귀에서 R² = r².",
        table: null,
        terms: [
          {
            term: "r과 R²의 연결 (Connection between r and R²)",
            def: "단순 선형 회귀에서 R² = r².",
          },
        ],
        traps: [
          "r²를 'r 제곱 퍼센트'로 해석하기 — 'x와의 선형 관계가 y 변동의 r²를 설명한다'고 말해야 해요; AP FRQ는 변수/단위를 명시한 전체 맥락 해석을 요구합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-statistics-u2-l5",
    courseId: "ap-statistics",
    subjectLabel: "AP Statistics",
    emoji: "📊",
    unit: 2,
    lessonNum: 5,
    unitName: "Exploring Two-Variable Data",
    title: "영향점과 지렛대",
    subtitle: "이상치(큰 잔차)와 영향점(제거 시 선이 바뀜)은 다른 개념이에요.",
    overview:
      "잔차 이상치(큰 |잔차|)와 높은 지렛대 점(극단 x값), 영향점(제거하면 회귀선이 크게 바뀜)을 구별해요. 높은 지렛대 점은 잔차가 작아도 영향력이 클 수 있습니다.",
    objectives: [
      "이변량 데이터 단원의 영향점과 지렛대를 숙달할 수 있다.",
    ],
    formulas: F,
    diagram: "scatter-regression",
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "잔차 이상치는 |잔차|가 커서 선에 잘 안 맞는 점이에요. 높은 지렛대 점은 극단 x값을 가지며 잔차가 크지 않을 수도 있어요. 영향점은 제거하면 회귀선이 상당히 바뀌는 점입니다.",
        keyIdea:
          "이상치 = 큰 잔차. 높은 지렛대 = 극단 x값. 영향점 = 제거 시 회귀선이 크게 바뀜.",
        table: null,
        terms: [
          {
            term: "잔차 이상치 (Outlier in residuals)",
            def: "큰 |잔차|, 선에 잘 안 맞음.",
          },
          {
            term: "높은 지렛대 점 (High-leverage point)",
            def: "극단 x값, 잔차는 크지 않을 수 있음.",
          },
          {
            term: "영향점 (Influential point)",
            def: "제거하면 회귀선이 상당히 바뀜.",
          },
        ],
        traps: [
          "이상치(큰 잔차)와 영향점(제거 시 선이 바뀜)을 혼동하기 — 회귀선 위의 높은 지렛대 점은 잔차가 작아도 영향력이 커요; AP는 이를 구별되는 개념으로 시험합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-statistics-u2-l6",
    courseId: "ap-statistics",
    subjectLabel: "AP Statistics",
    emoji: "📊",
    unit: 2,
    lessonNum: 6,
    unitName: "Exploring Two-Variable Data",
    title: "선형화를 위한 변환",
    subtitle: "로그·제곱근 변환으로 곡선을 직선으로 — 단, 선형화됐는지 확인하세요.",
    overview:
      "곡선 데이터를 로그나 제곱근 변환으로 선형화해요. 변환 후 잔차 그래프로 어느 변환이 선형성을 달성했는지 식별합니다. 거듭제곱 모델은 log(y) vs log(x), 지수 모델은 log(y) vs x예요.",
    objectives: [
      "로그나 제곱근 변환으로 곡선 데이터를 선형화할 수 있다.",
      "잔차 그래프로 어느 변환이 선형성을 달성하는지 식별할 수 있다.",
    ],
    formulas: F,
    diagram: "scatter-regression",
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "거듭제곱 모델(power model)은 log(y) vs log(x)로 선형화되고, 지수 모델(exponential model)은 log(y) vs x로 선형화돼요. 변환 후 잔차 그래프가 무작위가 되는지 확인해 어느 변환이 맞는지 정합니다.",
        keyIdea:
          "거듭제곱 모델 → log(y) vs log(x), 지수 모델 → log(y) vs x. 변환 후 잔차 무작위인지 확인.",
        table: null,
        terms: [
          {
            term: "거듭제곱 모델 (Power model)",
            def: "log(y) vs log(x); 지수 모델: log(y) vs x.",
          },
        ],
        traps: [
          "선형화 달성을 확인하지 않고 변환을 적용하기 — AP는 변환 후 잔차 그래프를 주고 패턴이 이제 무작위인지 확인하기를 기대해요; 선형화는 가정이 아니라 확인되어야 합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-statistics-u2-l7",
    courseId: "ap-statistics",
    subjectLabel: "AP Statistics",
    emoji: "📊",
    unit: 2,
    lessonNum: 7,
    unitName: "Exploring Two-Variable Data",
    title: "이원표와 범주형 데이터의 연관",
    subtitle: "연관은 '조건부' 분포로 봐요 — 그리고 심슨의 역설을 조심하세요.",
    overview:
      "이원표에서 주변·결합·조건부 분포를 읽어요. 연관은 조건부 분포가 범주에 따라 다른지로 판단합니다. 데이터를 합치면 연관 방향이 뒤집히는 심슨의 역설도 핵심이에요.",
    objectives: [
      "이원표에서 주변·결합·조건부 분포를 구할 수 있다.",
    ],
    formulas: F,
    diagram: "scatter-regression",
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "연관 식별은 조건부 분포가 범주에 따라 다른지로 해요(같으면 연관 없음). 심슨의 역설(Simpson's paradox)은 데이터를 합칠 때 연관 방향이 뒤집히는 현상입니다.",
        keyIdea:
          "연관은 '조건부' 분포(행·열 백분율)로 판단. 심슨의 역설: 데이터 합치면 연관 방향 뒤집힘.",
        table: null,
        terms: [
          {
            term: "연관 식별 (Identifying association)",
            def: "조건부 분포가 범주에 따라 다름.",
          },
          {
            term: "심슨의 역설 (Simpson's paradox)",
            def: "데이터를 합칠 때 연관 방향이 뒤집힘.",
          },
        ],
        traps: [
          "연관을 평가할 때 조건부 빈도 대신 주변 빈도를 쓰기 — 조건부 분포(행 또는 열 백분율)를 비교해야 해요; AP는 이원표를 주고 변수들이 연관됐는지 묻습니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-statistics-u2-l8",
    courseId: "ap-statistics",
    subjectLabel: "AP Statistics",
    emoji: "📊",
    unit: 2,
    lessonNum: 8,
    unitName: "Exploring Two-Variable Data",
    title: "인과, 상관, 그리고 교란",
    subtitle: "무작위 실험만 인과를 세울 수 있어요 — 교란 변수는 X와 Y 둘 다와 연관됩니다.",
    overview:
      "무작위 실험만이 인과를 세울 수 있고 관찰 연구는 못 해요. 연관의 세 가지 설명: 인과·공통 원인·우연. 교란 변수는 설명 변수(X)와 반응 변수(Y) 둘 다와 연관된 변수입니다.",
    objectives: [
      "무작위 실험은 인과를 세울 수 있지만 관찰 연구는 못 하는 이유를 설명할 수 있다.",
    ],
    formulas: F,
    diagram: "scatter-regression",
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "연관의 세 가지 설명: 인과, 공통 원인, 우연. 교란 변수(confounding variable)는 X와 Y 둘 다와 연관된 변수로, 어느 것이 진짜 원인인지 흐려요. 무작위 배정이 교란을 통제해 실험이 인과를 세울 수 있게 합니다.",
        keyIdea:
          "연관의 세 설명: 인과·공통 원인·우연. 교란 변수는 X와 Y '둘 다'와 연관. 무작위 실험만 인과 확립.",
        table: null,
        terms: [
          {
            term: "연관의 세 가지 설명 (Three explanations for association)",
            def: "인과, 공통 원인, 우연.",
          },
          {
            term: "교란 변수 (Confounding variable)",
            def: "X와 Y 둘 다와 연관됨.",
          },
        ],
        traps: [
          "교란 변수를 '결과에 영향을 주는' 변수로만 설명하기 — 설명 변수와도 연관되어야 해요; AP FRQ는 잠재적 교란 변수를 '식별하고 설명'하라며 두 부분을 모두 요구합니다.",
        ],
        example: null,
      },
    ],
  },
];
