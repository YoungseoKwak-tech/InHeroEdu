/**
 * Core Notes 한국어 스토리텔링 버전 — AP Statistics Unit 9 (9.1–9.4 전체, 과목 완결).
 * 원본 내용 전량 보존(objectives·terms·traps·formulas·diagram) + 일타강사 내러티브.
 * formulas는 수식이라 원문 그대로 유지. 용어는 "한국어 (English)" 병기.
 */
import type { CoreNote } from "@/lib/coreNotes";

const F = ["slope test H₀: β=0", "LINE conditions", "s = SD of residuals"];
const UNIT = "Inference for Quantitative Data: Slopes";

export const AP_STATS_U9_KO: CoreNote[] = [
  {
    lessonId: "ap-statistics-u9-l1",
    courseId: "ap-statistics",
    subjectLabel: "AP Statistics",
    emoji: "📊",
    unit: 9,
    lessonNum: 1,
    unitName: UNIT,
    title: "회귀 추론의 조건",
    subtitle: "LINER — 추론 전에 잔차 그래프를 반드시 확인하세요.",
    overview:
      "회귀 추론에는 LINER 조건이 필요해요: 선형성(Linear), 독립 오차(Independent errors), 정규 오차(Normal errors), 등분산(Equal variance), 무작위(Random). 잔차의 정규 확률도와 잔차 그래프로 확인합니다.",
    objectives: [
      "잔차의 정규 확률도를 확인할 수 있다.",
    ],
    formulas: F,
    diagram: "scatter-regression",
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "LINER: 선형성, 독립 오차, 정규 오차, 등분산, 무작위. 잔차 그래프 점검 — 무작위 패턴(선형성), 일정한 퍼짐(등분산), 이상치 없음. 정규 확률도로 오차 정규성을 확인해요.",
        keyIdea:
          "LINER(선형·독립 오차·정규 오차·등분산·무작위). 추론 전 잔차 그래프 필수 확인.",
        table: null,
        terms: [
          {
            term: "L-I-N-E-R",
            def: "선형(Linear), 독립 오차(Independent errors), 정규 오차(Normal errors), 등분산(Equal variance), 무작위(Random).",
          },
          {
            term: "잔차 그래프 점검 (Residual plot checks)",
            def: "무작위 패턴, 일정한 퍼짐, 이상치 없음.",
          },
        ],
        traps: [
          "추론 전에 잔차 그래프를 살피지 않기 — AP FRQ는 잔차 그래프를 주고 조건이 충족되는지 물어요; 패턴(선형성), 깔때기 모양(등분산), 정규성을 확인해야 합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-statistics-u9-l2",
    courseId: "ap-statistics",
    subjectLabel: "AP Statistics",
    emoji: "📊",
    unit: 9,
    lessonNum: 2,
    unitName: UNIT,
    title: "회귀 기울기 t-검정",
    subtitle: "회귀 기울기의 자유도는 n−2예요(기울기·절편 두 모수 추정).",
    overview:
      "회귀 기울기 t-검정은 H₀: β = 0(선형 관계 없음), Hₐ: β ≠ 0을 검정해요. t = b/SE_b, 자유도 = n−2입니다. p-값은 참 기울기가 0일 때 이 기울기 이상이 우연히 나올 확률이에요.",
    objectives: [
      "H₀: β = 0(선형 관계 없음); Hₐ: β ≠ 0을 세울 수 있다.",
      "t = b/SE_b, df = n−2를 적용할 수 있다.",
    ],
    formulas: F,
    diagram: "scatter-regression",
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "회귀 기울기 t-검정은 t = b/SE_b, 자유도 = n−2예요(기울기·절편 두 모수를 추정해 자유도를 2 잃음). p-값은 참 기울기가 0이라면 이 기울기 또는 더 가파른 기울기가 우연히 나올 확률입니다.",
        keyIdea:
          "회귀 기울기: t = b/SE_b, df = n−2. p-값 = 참 기울기 0일 때 이 기울기 이상이 우연히 나올 확률.",
        table: null,
        terms: [
          {
            term: "p-값 해석 (Interpreting p-value)",
            def: "참 기울기가 0일 때 이 기울기 또는 더 가파른 기울기가 우연히 나올 확률.",
          },
        ],
        traps: [
          "기울기의 t-통계량과 평균의 t를 혼동하기 — 회귀 기울기는 df = n−2예요(추정 모수 기울기·절편마다 자유도 1 손실); AP는 컴퓨터 출력을 주고 올바른 df 식별을 기대합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-statistics-u9-l3",
    courseId: "ap-statistics",
    subjectLabel: "AP Statistics",
    emoji: "📊",
    unit: 9,
    lessonNum: 3,
    unitName: UNIT,
    title: "회귀 기울기 신뢰구간",
    subtitle: "단위와 변수를 명시해 해석하세요 — 'x 단위당 y 단위'.",
    overview:
      "회귀 기울기 신뢰구간은 b ± t*(SE_b)로 참 기울기 β의 구간을 줘요. 컴퓨터 출력에서 b와 SE_b를 뽑아 계산합니다. x 한 단위당 y의 변화율로 그럴듯한 값을 해석해요.",
    objectives: [
      "b ± t*(SE_b)로 참 기울기 β의 CI를 구할 수 있다.",
      "컴퓨터 출력에서 b와 SE_b를 추출할 수 있다.",
    ],
    formulas: F,
    diagram: "scatter-regression",
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "회귀 기울기 신뢰구간은 b ± t*(SE_b)예요. 컴퓨터 출력에서 기울기 계수 b와 그 표준오차 SE_b를 뽑아 씁니다. 해석은 'x 한 단위당 y의 변화율'에 대한 그럴듯한 값이에요.",
        keyIdea:
          "기울기 CI = b ± t*(SE_b). 해석: 'x 단위당 y 변화율'의 그럴듯한 값(단위·변수 명시).",
        table: null,
        terms: [
          {
            term: "해석 (Interpreting)",
            def: "x 한 단위당 y의 변화율에 대한 그럴듯한 값.",
          },
        ],
        traps: [
          "기울기 CI를 맥락 단위·변수 없이 해석하기 — AP는 '우리는 참 기울기가 [A]와 [B] [y 단위]/[x 단위] 사이에 있다고 95% 확신한다'를 요구해요; 맥락 표현을 써야 합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-statistics-u9-l4",
    courseId: "ap-statistics",
    subjectLabel: "AP Statistics",
    emoji: "📊",
    unit: 9,
    lessonNum: 4,
    unitName: UNIT,
    title: "회귀 컴퓨터 출력 읽기",
    subtitle: "기울기 SE는 기울기 계수 옆 'Std. Err' 열 — 절편 SE와 헷갈리지 마세요.",
    overview:
      "AP 통계의 마지막 레슨. 회귀 컴퓨터 출력에서 계수·SE·t-통계량·p-값을 식별해요. 결정계수 R²와 그 해석, 그리고 출력으로 가설 검정과 신뢰구간을 구성하는 법이 핵심입니다.",
    objectives: [
      "출력에서 계수·SE·t-통계량·p-값을 식별할 수 있다.",
      "결정계수 R²와 그 해석을 안다.",
      "출력으로 가설 검정과 신뢰구간을 구성할 수 있다.",
    ],
    formulas: F,
    diagram: "scatter-regression",
    sections: [
      {
        title: "회귀 컴퓨터 출력 읽기",
        subtitle: null,
        body:
          "회귀 출력 표에서 계수(기울기·절편), 표준오차, t-통계량, p-값을 식별해요. 기울기의 SE는 기울기 계수 옆 'Std. Err' 열에 있습니다. R²(결정계수)도 출력에서 읽어 해석하고, 이 값들로 가설 검정과 신뢰구간을 구성해요.",
        keyIdea:
          "출력에서 계수·SE·t·p 식별. 기울기 SE = 기울기 계수 옆 'Std. Err' 열. R²도 읽어 해석.",
        table: null,
        terms: [],
        traps: [
          "컴퓨터 출력에서 기울기 SE의 위치를 모르기 — AP는 표준 회귀 표를 줘요; 기울기의 SE는 기울기 계수 옆 'Std. Err' 열에 있습니다; 학생들이 종종 절편의 SE를 대신 씁니다.",
        ],
        example: null,
      },
    ],
  },
];
