/**
 * Core Notes 한국어 스토리텔링 버전 — AP Statistics Unit 8 (8.1–8.5 전체).
 * 원본 내용 전량 보존(objectives·terms·traps·formulas·diagram) + 일타강사 내러티브.
 * formulas는 수식이라 원문 그대로 유지. 용어는 "한국어 (English)" 병기.
 */
import type { CoreNote } from "@/lib/coreNotes";

const F = ["χ²=Σ(O−E)²/E", "GOF df = cats−1", "indep df=(r−1)(c−1)"];
const UNIT = "Inference for Categorical Data: Chi-Square";

export const AP_STATS_U8_KO: CoreNote[] = [
  {
    lessonId: "ap-statistics-u8-l1",
    courseId: "ap-statistics",
    subjectLabel: "AP Statistics",
    emoji: "📊",
    unit: 8,
    lessonNum: 1,
    unitName: UNIT,
    title: "카이제곱 적합도 검정",
    subtitle: "기대도수는 귀무가설의 비율에서 나와요 — 무조건 1/k가 아니에요.",
    overview:
      "카이제곱 적합도 검정(GOF)은 H₀: 지정된 분포가 맞다, 를 검정해요. χ² = Σ(O−E)²/E, 기대도수 = 귀무가설 비율 × 전체 n, 자유도 = 범주 수 − 1입니다.",
    objectives: [
      "H₀: 지정된 분포가 맞다; χ² = Σ(O−E)²/E를 적용할 수 있다.",
      "기대도수 = 귀무가설 비율 × 전체 n을 계산할 수 있다.",
      "df = 범주 수 − 1을 적용할 수 있다.",
    ],
    formulas: F,
    diagram: null,
    sections: [
      {
        title: "카이제곱 적합도 검정",
        subtitle: null,
        body:
          "적합도 검정은 한 범주형 변수의 관측 분포가 지정된 분포와 맞는지 봐요. χ² = Σ(O−E)²/E이고, 기대도수는 귀무가설 비율에 전체 n을 곱해 구합니다. 자유도 = 범주 수 − 1이에요.",
        keyIdea:
          "GOF: 한 변수가 지정 분포에 맞나? χ² = Σ(O−E)²/E. 기대도수 = 귀무 비율 × n. df = 범주−1.",
        table: null,
        terms: [],
        traps: [
          "기대도수를 기본적으로 각 범주에 균등하게 계산하기 — 기대도수는 '귀무가설 비율'에서 나오지 1/k가 아니에요; AP는 모두 같지 않은 가설 비율을 줍니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-statistics-u8-l2",
    courseId: "ap-statistics",
    subjectLabel: "AP Statistics",
    emoji: "📊",
    unit: 8,
    lessonNum: 2,
    unitName: UNIT,
    title: "카이제곱 독립성 검정",
    subtitle: "독립성 검정은 '두' 범주형 변수의 연관 — GOF는 '한' 변수의 분포예요.",
    overview:
      "카이제곱 독립성 검정은 H₀: 변수들이 독립이다, Hₐ: 연관이 있다, 를 검정해요. 기대도수 = (행 합계 × 열 합계) / 전체 합계, 자유도 = (행−1)(열−1)입니다.",
    objectives: [
      "H₀: 변수 독립; Hₐ: 연관 존재를 세울 수 있다.",
      "기대도수 = (행 합계 × 열 합계) / 전체 합계를 계산할 수 있다.",
      "df = (행−1)(열−1)을 적용할 수 있다.",
    ],
    formulas: F,
    diagram: null,
    sections: [
      {
        title: "카이제곱 독립성 검정",
        subtitle: null,
        body:
          "독립성 검정은 이원표를 써서 '두' 범주형 변수 사이 연관을 검정해요. 기대도수 = (행 합계 × 열 합계) / 전체 합계, 자유도 = (행−1)(열−1)입니다.",
        keyIdea:
          "독립성 검정: 이원표, 두 변수 연관. 기대도수 = (행합×열합)/전체합. df = (r−1)(c−1).",
        table: null,
        terms: [],
        traps: [
          "카이제곱 독립성 검정과 GOF를 혼동하기 — 독립성 검정은 이원표로 '두' 범주형 변수의 연관을 검정하고, GOF는 '한' 변수가 지정 분포에 맞는지를 검정합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-statistics-u8-l3",
    courseId: "ap-statistics",
    subjectLabel: "AP Statistics",
    emoji: "📊",
    unit: 8,
    lessonNum: 3,
    unitName: UNIT,
    title: "카이제곱 동질성 검정",
    subtitle: "여러 표본이면 동질성, 한 표본을 두 방식으로 분류하면 독립성이에요.",
    overview:
      "카이제곱 동질성 검정은 여러 집단에 걸쳐 한 범주형 변수의 분포를 비교해요. 독립성 검정과 같은 공식이지만 가설과 연구 설계가 달라요. 언제 동질성 vs 독립성이 적절한지 구별하는 게 핵심입니다.",
    objectives: [
      "여러 집단에 걸쳐 한 범주형 변수의 분포를 비교할 수 있다.",
      "독립성 검정과 같은 공식이지만 가설·설계가 다름을 안다.",
      "동질성 vs 독립성이 언제 적절한지 인식할 수 있다.",
    ],
    formulas: F,
    diagram: null,
    sections: [
      {
        title: "카이제곱 동질성 검정",
        subtitle: null,
        body:
          "동질성 검정은 여러 집단에 걸쳐 한 범주형 변수의 분포가 같은지 비교해요. 공식은 독립성과 같지만(χ², 기대도수, df), 가설과 설계가 다릅니다 — 별도 표본 여럿이면 동질성입니다.",
        keyIdea:
          "동질성: 여러 집단의 분포 비교(별도 표본). 독립성: 한 표본 두 방식 분류. 공식은 같음.",
        table: null,
        terms: [],
        traps: [
          "동질성 연구에 독립성 검정 표현을 쓰기 — 데이터가 별도의 무작위 표본들에서 왔으면 동질성 검정(분포가 같은가?)이고, '한' 표본을 두 방식으로 분류했으면 독립성입니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-statistics-u8-l4",
    courseId: "ap-statistics",
    subjectLabel: "AP Statistics",
    emoji: "📊",
    unit: 8,
    lessonNum: 4,
    unitName: UNIT,
    title: "기대도수와 카이제곱 분포",
    subtitle: "조건은 '기대'도수가 ≥ 5예요 — 관측도수가 아니에요.",
    overview:
      "카이제곱 근사가 유효하려면 모든 기대도수가 ≥ 5여야 해요. 카이제곱 분포는 오른쪽으로 치우쳐 있어 p-값에 항상 위쪽 꼬리를 씁니다. 카이제곱 통계량은 H₀로부터의 이탈 정도를 나타내요.",
    objectives: [
      "카이제곱 근사가 유효하려면 모든 기대도수가 ≥ 5여야 함을 안다.",
      "카이제곱 분포가 오른쪽으로 치우쳐 항상 위쪽 꼬리를 씀을 안다.",
      "카이제곱 통계량과 H₀ 이탈 정도의 관계를 설명할 수 있다.",
    ],
    formulas: F,
    diagram: "boxplot",
    sections: [
      {
        title: "기대도수와 카이제곱 분포",
        subtitle: null,
        body:
          "카이제곱 근사가 유효하려면 모든 기대도수(행×열/n)가 ≥ 5여야 해요. 카이제곱 분포는 오른쪽으로 치우쳐(right-skewed) 있어 p-값에 항상 위쪽 꼬리를 씁니다. 통계량이 클수록 H₀로부터 이탈이 큽니다.",
        keyIdea:
          "기대도수 모두 ≥ 5(관측 아님). 카이제곱 분포 오른쪽 치우침 → 항상 위쪽 꼬리. 통계량 클수록 H₀ 이탈.",
        table: null,
        terms: [],
        traps: [
          "기대도수가 아니라 관측도수가 ≥ 5인지 확인하기 — 조건은 '기대'도수(행×열/n)에 대한 것이지 관측도수가 아니에요; AP FRQ는 이 조건 확인을 요구하며, 관측도수를 쓰면 틀립니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-statistics-u8-l5",
    courseId: "ap-statistics",
    subjectLabel: "AP Statistics",
    emoji: "📊",
    unit: 8,
    lessonNum: 5,
    unitName: UNIT,
    title: "카이제곱 후 사후 분석",
    subtitle: "검정은 연관 '유무'만 — 어디가 강한지는 (O−E)²/E 항으로 찾으세요.",
    overview:
      "카이제곱 후 사후 분석은 어느 칸이 카이제곱 통계량에 가장 크게 기여하는지 찾아요. 표준화 잔차 (O−E)/√E로 칸 수준 분석을 합니다. 카이제곱은 강도만 보고 방향은 못 봐요.",
    objectives: [
      "어느 칸이 카이제곱 통계량에 가장 크게 기여하는지 식별할 수 있다.",
      "표준화 잔차 (O−E)/√E로 칸 수준 분석을 할 수 있다.",
      "카이제곱이 강도만(방향 아님) 포착함을 안다.",
    ],
    formulas: F,
    diagram: null,
    sections: [
      {
        title: "카이제곱 후 사후 분석",
        subtitle: null,
        body:
          "사후 분석은 가장 큰 (O−E)²/E 항을 가진 칸을 찾아 어디서 연관이 가장 강한지를 봐요. 표준화 잔차 (O−E)/√E로 칸 수준을 분석합니다. 카이제곱은 연관의 강도만 보고 방향은 포착하지 못해요.",
        keyIdea:
          "사후 분석: 가장 큰 (O−E)²/E 항으로 강한 연관 위치 파악. 표준화 잔차 (O−E)/√E. 카이제곱은 강도만.",
        table: null,
        terms: [],
        traps: [
          "연관이 가장 강한 곳을 식별하지 않고 p-값만 보고하기 — 카이제곱은 연관의 '유무'를 알려줘요; '어디'를 기술하려면 가장 큰 (O−E)²/E 항을 살펴야 합니다; AP FRQ는 검정이 무엇을 드러내는지 기술하게 합니다.",
        ],
        example: null,
      },
    ],
  },
];
