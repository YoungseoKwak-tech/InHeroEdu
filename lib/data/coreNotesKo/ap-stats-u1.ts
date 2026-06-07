/**
 * Core Notes 한국어 스토리텔링 버전 — AP Statistics Unit 1 (1.1–1.8 전체).
 * 원본 내용 전량 보존(objectives·terms·traps·formulas·diagram) + 일타강사 내러티브.
 * formulas는 수식이라 원문 그대로 유지. 용어는 "한국어 (English)" 병기.
 */
import type { CoreNote } from "@/lib/coreNotes";

const STATS_FORMULAS = ["z=(x−μ)/σ", "IQR=Q3−Q1", "Outlier: <Q1−1.5·IQR or >Q3+1.5·IQR"];

export const AP_STATS_U1_KO: CoreNote[] = [
  {
    lessonId: "ap-statistics-u1-l1",
    courseId: "ap-statistics",
    subjectLabel: "AP Statistics",
    emoji: "📊",
    unit: 1,
    lessonNum: 1,
    unitName: "Exploring One-Variable Data",
    title: "변수 분류와 연구 설계",
    subtitle: "데이터의 종류를 구분하고, 관찰 연구와 실험의 차이를 아는 게 통계의 출발점이에요.",
    overview:
      "통계의 첫걸음은 변수 분류예요: 범주형 vs 양적, 이산 vs 연속. 그리고 연구 설계 — 관찰 연구는 연관만, 실험만이 인과를 보일 수 있어요. 자발적 응답 표본이 왜 믿을 수 없는지도 핵심입니다.",
    objectives: [
      "범주형 vs 양적; 이산 vs 연속을 구별할 수 있다.",
      "자발적 응답 편향과 그런 표본이 왜 신뢰할 수 없는지 설명할 수 있다.",
    ],
    formulas: STATS_FORMULAS,
    diagram: "boxplot",
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "변수는 범주형(이름·범주)과 양적(숫자)으로, 양적은 다시 이산(셀 수 있음)과 연속(잴 수 있음)으로 나뉘어요. 연구 설계에서 관찰 연구는 변수를 그저 관찰하고, 실험은 처치를 가합니다 — 그래서 실험만이 인과를 보일 수 있어요. 자발적 응답 표본은 강한 의견을 가진 사람이 과대 대표되어 편향됩니다.",
        keyIdea:
          "실험만이 인과를 보일 수 있어요(처치 + 무작위 배정). 관찰 연구는 '연관'만 — 인과 아님.",
        table: null,
        terms: [
          {
            term: "관찰 연구 vs 실험 (Observational study vs. experiment)",
            def: "실험이 인과를 보일 수 있는 이유.",
          },
        ],
        traps: [
          "관찰 데이터에서 연관을 인과로 혼동하기 — 관찰 연구의 상관은 인과를 입증할 수 없어요; AP FRQ는 비실험 데이터에 '원인'이 아니라 '연관' 표현을 기대합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-statistics-u1-l2",
    courseId: "ap-statistics",
    subjectLabel: "AP Statistics",
    emoji: "📊",
    unit: 1,
    lessonNum: 2,
    unitName: "Exploring One-Variable Data",
    title: "데이터 표현 — 그래프와 해석",
    subtitle: "그래프 종류를 골라 분포를 그리고, SOCS로 빠짐없이 설명하세요.",
    overview:
      "데이터를 시각화하는 그래프(점도표·히스토그램·줄기-잎)는 각각 적절한 상황이 있어요. 그리고 분포를 설명할 땐 SOCS — 모양(Shape)·이상치(Outliers)·중심(Center)·퍼짐(Spread) — 을 빠짐없이 다뤄야 합니다. 같은 척도에서 두 분포를 비교하는 것도 핵심이에요.",
    objectives: [
      "같은 척도에서 두 분포를 비교할 수 있다.",
    ],
    formulas: STATS_FORMULAS,
    diagram: "boxplot",
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "점도표·히스토그램·줄기-잎 그래프는 각각 적절한 상황이 있어요(작은 데이터엔 점도표·줄기-잎, 큰 데이터엔 히스토그램). 분포를 설명할 땐 SOCS — 모양·이상치·중심·퍼짐 — 를 모두 다뤄야 합니다.",
        keyIdea:
          "분포 설명 = SOCS(모양·이상치·중심·퍼짐) 네 가지 모두. 하나라도 빠지면 감점.",
        table: null,
        terms: [
          {
            term: "점도표·히스토그램·줄기-잎 (Dotplots, histograms, stemplots)",
            def: "각각 언제 적절한지.",
          },
          {
            term: "분포 설명 (Describing distributions)",
            def: "SOCS(모양·이상치·중심·퍼짐).",
          },
        ],
        traps: [
          "히스토그램을 SOCS 네 요소 모두 없이 설명하기 — AP FRQ는 항상 모양·중심·퍼짐·이상치를 요구해요; 어느 요소든 빠지면 부분 점수를 잃습니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-statistics-u1-l3",
    courseId: "ap-statistics",
    subjectLabel: "AP Statistics",
    emoji: "📊",
    unit: 1,
    lessonNum: 3,
    unitName: "Exploring One-Variable Data",
    title: "중심 측도 — 평균 vs 중앙값",
    subtitle: "이상치에 민감한 평균과, 저항하는 중앙값 — 분포 모양이 선택을 정합니다.",
    overview:
      "중심 측도는 평균과 중앙값이 대표적이에요. 평균은 이상치에 민감하고, 중앙값은 저항적입니다. 치우친 분포에서는 평균이 꼬리 쪽으로 끌려가고 중앙값은 중심에 머물러요. 맥락에 따라 어느 측도를 쓸지가 핵심입니다.",
    objectives: [
      "맥락에서 어느 중심 측도를 선호할지 정할 수 있다.",
    ],
    formulas: STATS_FORMULAS,
    diagram: "boxplot",
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "평균은 이상치에 민감하고 중앙값은 저항적이에요. 치우친 분포에서는 평균이 꼬리 쪽으로 끌려가고 중앙값은 중심 근처에 머뭅니다. 그래서 치우친 데이터(예: 소득)에는 중앙값이 더 대표적이에요.",
        keyIdea:
          "평균 = 이상치에 민감, 중앙값 = 저항적. 치우친 분포 → 중앙값이 더 대표적.",
        table: null,
        terms: [
          {
            term: "평균 (Mean)",
            def: "이상치에 민감; 중앙값: 이상치에 저항적.",
          },
          {
            term: "치우친 분포 (Skewed distributions)",
            def: "평균이 꼬리 쪽으로 끌려가고, 중앙값은 중심 근처에 머묾.",
          },
        ],
        traps: [
          "치우친 분포를 평균으로 설명하기 — 치우친 소득 데이터에는 중앙값이 더 대표적이에요; AP는 모양에 따라 어느 측도가 더 적절한지 고르고 '정당화'하기를 요구합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-statistics-u1-l4",
    courseId: "ap-statistics",
    subjectLabel: "AP Statistics",
    emoji: "📊",
    unit: 1,
    lessonNum: 4,
    unitName: "Exploring One-Variable Data",
    title: "퍼짐 측도 — 표준편차와 IQR",
    subtitle: "어느 짝을 쓰느냐 — 평균엔 표준편차, 중앙값엔 IQR.",
    overview:
      "퍼짐 측도는 표준편차와 IQR(사분위 범위)이 대표적이에요. IQR(=Q3−Q1)은 이상치에 저항적이라 중앙값과 짝이고, 표준편차는 이상치에 민감해 평균과 짝입니다. 이상치 식별엔 1.5×IQR 규칙을 써요.",
    objectives: [
      "이상치 식별에 1.5×IQR 규칙을 적용할 수 있다.",
    ],
    formulas: STATS_FORMULAS,
    diagram: "boxplot",
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "IQR = Q3 − Q1은 이상치에 저항적이라 중앙값과 함께 써요. 표준편차는 이상치에 민감해 평균과 함께 씁니다. 이상치는 Q1−1.5·IQR 미만이거나 Q3+1.5·IQR 초과인 값이에요.",
        keyIdea:
          "IQR(저항적) ↔ 중앙값, 표준편차(민감) ↔ 평균. 이상치: <Q1−1.5·IQR 또는 >Q3+1.5·IQR.",
        table: null,
        terms: [
          {
            term: "IQR = Q3 − Q1",
            def: "이상치에 저항적; 중앙값과 함께 사용.",
          },
          {
            term: "표준편차 (Standard deviation)",
            def: "이상치에 민감; 평균과 함께 사용.",
          },
        ],
        traps: [
          "1.5×IQR 대신 표준편차 이상치 규칙을 적용하기 — 박스플롯과 5수 요약에는 1.5×IQR 규칙이 적용돼요; 표준편차 기반 규칙은 정규분포용입니다; AP는 어느 것이 적절한지 시험합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-statistics-u1-l5",
    courseId: "ap-statistics",
    subjectLabel: "AP Statistics",
    emoji: "📊",
    unit: 1,
    lessonNum: 5,
    unitName: "Exploring One-Variable Data",
    title: "정규분포와 경험 법칙",
    subtitle: "68-95-99.7 — 단, 정규분포일 때만 써요.",
    overview:
      "정규분포는 종 모양 대칭 분포로, 경험 법칙(68-95-99.7)이 평균에서 ±1·2·3 표준편차 안에 들어가는 비율을 줘요. 표준화(z = (x−μ)/σ)로 z-표를 써서 비율과 백분위를 찾습니다.",
    objectives: [
      "정규분포의 68-95-99.7 규칙을 적용할 수 있다.",
      "z-표로 비율과 백분위를 찾을 수 있다.",
    ],
    formulas: STATS_FORMULAS,
    diagram: "bell-curve",
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "경험 법칙: 정규분포에서 평균 ±1σ에 68%, ±2σ에 95%, ±3σ에 99.7%가 들어가요. 표준화는 z = (x−μ)/σ로, z-점수는 한 값이 평균에서 몇 표준편차 떨어졌는지를 나타냅니다.",
        keyIdea:
          "68-95-99.7 규칙은 '정규분포일 때만'. 표준화 z = (x−μ)/σ로 z-표 사용.",
        table: null,
        terms: [
          {
            term: "표준화 (Standardizing)",
            def: "z = (x−μ)/σ; z-점수 해석.",
          },
        ],
        traps: [
          "정규성을 확인하지 않고 경험 법칙을 적용하기 — 68-95-99.7 규칙은 '오직' 정규분포에만 적용돼요; AP가 준 분포가 정규임을 확인 안 할 수 있으니, 적용 전 반드시 확인하세요.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-statistics-u1-l6",
    courseId: "ap-statistics",
    subjectLabel: "AP Statistics",
    emoji: "📊",
    unit: 1,
    lessonNum: 6,
    unitName: "Exploring One-Variable Data",
    title: "z-점수, 백분위, 정규 확률",
    subtitle: "x ↔ z 변환과 z-표로 확률을 구하고, 역정규로 거꾸로 x를 찾아요.",
    overview:
      "z-점수는 x값을 표준화한 것으로, x ↔ z를 자유롭게 변환해요. z-표로 P(a < X < b) 확률을 구하고, 역정규(inverse normal)로 백분위가 주어졌을 때 x를 거꾸로 찾습니다.",
    objectives: [
      "x값과 z-점수 사이를 변환할 수 있다.",
      "z-표로 확률 P(a < X < b)를 찾을 수 있다.",
    ],
    formulas: STATS_FORMULAS,
    diagram: "bell-curve",
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "z-점수 변환(z = (x−μ)/σ)으로 x값을 표준화하고, z-표로 두 z 사이 면적(확률)을 구해요. 역정규는 백분위(면적)가 주어졌을 때 거꾸로 x를 찾는 과정입니다.",
        keyIdea:
          "개별 값: z = (x−μ)/σ. 표본 평균: z = (x̄−μ)/(σ/√n). 역정규로 백분위 → x.",
        table: null,
        terms: [
          {
            term: "역정규 (Inverse normal)",
            def: "백분위가 주어졌을 때 x를 찾는 것.",
          },
        ],
        traps: [
          "개별 관측의 확률을 구할 때 모평균(μ) 대신 표본평균(x̄)을 z-점수 공식에 쓰기 — 개별 값은 z = (x−μ)/σ, 표본 평균은 z = (x̄−μ)/(σ/√n)입니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-statistics-u1-l7",
    courseId: "ap-statistics",
    subjectLabel: "AP Statistics",
    emoji: "📊",
    unit: 1,
    lessonNum: 7,
    unitName: "Exploring One-Variable Data",
    title: "박스플롯과 5수 요약",
    subtitle: "최솟값·Q1·중앙값·Q3·최댓값 — 그리고 이상치는 점으로 따로 찍어요.",
    overview:
      "5수 요약(최솟값·Q1·중앙값·Q3·최댓값)을 박스플롯으로 그려요. 수정 박스플롯에서는 이상치를 개별 점으로 표시합니다. 나란히 놓은 박스플롯으로 분포를 비교하는 것도 핵심이에요.",
    objectives: [
      "최솟값·Q1·중앙값·Q3·최댓값과 각각의 계산법을 파악할 수 있다.",
      "나란히 놓은 박스플롯으로 분포를 비교할 수 있다.",
    ],
    formulas: STATS_FORMULAS,
    diagram: "boxplot",
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "5수 요약은 최솟값·Q1·중앙값·Q3·최댓값이에요. 수정 박스플롯(modified boxplot)에서는 1.5×IQR을 넘는 이상치를 개별 점으로 표시합니다. 나란히 놓으면 두 분포를 같은 척도에서 비교할 수 있어요.",
        keyIdea:
          "5수 요약 = 최솟값·Q1·중앙값·Q3·최댓값. 수정 박스플롯은 이상치를 개별 점으로 표시.",
        table: null,
        terms: [
          {
            term: "수정 박스플롯 (Modified boxplot)",
            def: "이상치를 개별 점으로 표시.",
          },
        ],
        traps: [
          "의심 이상치를 상자나 수염 안에 그리기 — AP는 이상치(사분위에서 1.5×IQR 너머)를 수정 박스플롯에서 개별 점으로 식별·표시할 것을 구체적으로 요구합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-statistics-u1-l8",
    courseId: "ap-statistics",
    subjectLabel: "AP Statistics",
    emoji: "📊",
    unit: 1,
    lessonNum: 8,
    unitName: "Exploring One-Variable Data",
    title: "밀도 곡선과 '면적 = 확률' 규약",
    subtitle: "높이가 아니라 '면적'이 확률이에요 — 균등분포가 그 함정을 보여줍니다.",
    overview:
      "밀도 곡선에서 곡선 아래 면적이 확률이고, 전체 면적은 1이에요. 정규 밀도 곡선의 성질과 확률의 연결이 핵심입니다. 균등분포(평평한 밀도 곡선)는 같은 구간에 같은 면적을 줘요.",
    objectives: [
      "정규 밀도 곡선의 성질과 확률과의 연결을 설명할 수 있다.",
    ],
    formulas: STATS_FORMULAS,
    diagram: "boxplot",
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "밀도 곡선(density curve)은 곡선 아래 면적이 확률이고, 전체 면적이 1이에요. 균등분포(uniform distribution)는 평평한 밀도 곡선으로 같은 구간에 같은 면적을 줍니다. 높이가 아니라 면적이 확률이라는 게 핵심이에요.",
        keyIdea:
          "밀도 곡선: '면적' = 확률(높이 아님), 전체 면적 = 1. 균등분포는 평평한 곡선.",
        table: null,
        terms: [
          {
            term: "밀도 곡선 (Density curve)",
            def: "곡선 아래 면적 = 확률; 전체 면적 = 1.",
          },
          {
            term: "균등분포 (Uniform distribution)",
            def: "평평한 밀도 곡선, 같은 구간에 같은 면적.",
          },
        ],
        traps: [
          "밀도 곡선의 높이를 확률로 취급하기 — 높이는 밀도(단위 구간당 확률)이지 확률이 아니에요; '면적'만 확률을 줍니다; AP는 높이가 1을 넘을 수 있는 균등분포로 이를 시험합니다.",
        ],
        example: null,
      },
    ],
  },
];
