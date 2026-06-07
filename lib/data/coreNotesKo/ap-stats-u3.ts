/**
 * Core Notes 한국어 스토리텔링 버전 — AP Statistics Unit 3 (3.1–3.8 전체).
 * 원본 내용 전량 보존(objectives·terms·traps) + 일타강사 내러티브.
 * 용어는 "한국어 (English)" 병기.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const AP_STATS_U3_KO: CoreNote[] = [
  {
    lessonId: "ap-statistics-u3-l1",
    courseId: "ap-statistics",
    subjectLabel: "AP Statistics",
    emoji: "📊",
    unit: 3,
    lessonNum: 1,
    unitName: "Collecting Data",
    title: "표집 방법 — 무엇을 언제 쓰는가",
    subtitle: "층화는 '각 집단에서 조금', 군집은 '일부 집단에서 전부' — 헷갈리지 마세요.",
    overview:
      "표집 방법은 단순 무작위 표집(SRS), 층화, 군집, 계통 표집이 있어요. 각각 무작위성을 보장하지만 구조가 다릅니다. 핵심 구별: 층화는 각 집단에서 조금씩, 군집은 일부 집단에서 전부예요.",
    objectives: [
      "자료 수집 단원의 표집 방법(무엇을 언제 쓰는가)을 숙달할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "SRS는 모든 개체가 뽑힐 확률이 같아요. 층화(stratified)는 층으로 나눠 각 층 안에서 SRS를 합니다. 군집(cluster)은 집단으로 나눠 일부 집단 전체를 무작위 선택하고, 계통 표집은 일정 간격으로 뽑아요.",
        keyIdea:
          "SRS = 모두 동일 확률. 층화 = 각 층에서 조금씩. 군집 = 일부 집단 '전부'. 계통 = 일정 간격.",
        table: null,
        terms: [
          {
            term: "SRS (단순 무작위 표집)",
            def: "모든 개체가 뽑힐 확률이 같음.",
          },
          {
            term: "층화 (Stratified)",
            def: "층으로 나눠 각 층 안에서 SRS.",
          },
          {
            term: "군집 (Cluster)",
            def: "집단으로 나눠 일부 집단 전체를 무작위 선택; 계통 표집.",
          },
        ],
        traps: [
          "층화와 군집 표집을 혼동하기 — 층화는 '각' 집단에서 일부를, 군집은 '일부' 집단에서 전부를 취해요; AP는 표집 설명을 주고 방법을 식별하게 합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-statistics-u3-l2",
    courseId: "ap-statistics",
    subjectLabel: "AP Statistics",
    emoji: "📊",
    unit: 3,
    lessonNum: 2,
    unitName: "Collecting Data",
    title: "표집 편향과 그 원인",
    subtitle: "편향은 '한 방향의 체계적' 오차예요 — 무작위 오차와 다릅니다.",
    overview:
      "표집 편향은 미달 포함, 무응답, 응답 편향 등 여러 원인에서 와요. 자발적 응답 표본은 극단 의견을 과대 대표합니다. 핵심: 편향은 한 방향의 체계적 오차이지 무작위 변동이 아니에요.",
    objectives: [
      "설문 질문의 표현 효과를 설명할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "미달 포함(undercoverage), 무응답(nonresponse), 응답 편향(response bias)이 각각 다른 메커니즘으로 편향을 만들어요. 자발적 응답은 자기 선택 표본이라 극단 의견을 과대 대표합니다.",
        keyIdea:
          "편향 = 한 방향의 '체계적' 오차(표본 크기로 안 줄어듦). 무작위 표집 오차는 크기 커질수록 줄어듦.",
        table: null,
        terms: [
          {
            term: "미달 포함·무응답·응답 편향 (Undercoverage, nonresponse, response bias)",
            def: "각각의 메커니즘.",
          },
          {
            term: "자발적 응답 (Voluntary response)",
            def: "자기 선택 표본이 극단 의견을 과대 대표함.",
          },
        ],
        traps: [
          "어떤 표집 오차든 '편향'이라 부르기 — 편향은 한 방향의 체계적 오차예요; 무작위 표집 오차는 당연하고 표본 크기가 커지면 줄어듭니다; AP는 기술된 오차가 편향인지 무작위 변동인지 시험합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-statistics-u3-l3",
    courseId: "ap-statistics",
    subjectLabel: "AP Statistics",
    emoji: "📊",
    unit: 3,
    lessonNum: 3,
    unitName: "Collecting Data",
    title: "실험 설계 — 세 가지 원리",
    subtitle: "대조군과 위약군은 같지 않아요 — 둘 다 대조지만 역할이 다릅니다.",
    overview:
      "실험 설계의 세 원리는 무작위화·반복·대조예요. 눈가림(단일·이중)으로 심리적 효과를 통제합니다. 핵심 구별: 대조군은 처치 없음, 위약군은 비활성 처치 — 둘 다 대조지만 위약은 심리 효과를 설명해요.",
    objectives: [
      "대조군 vs 위약군(같지 않음)을 구별할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "무작위화·반복·대조가 각각 필요한 이유가 있어요 — 무작위화는 교란 통제, 반복은 변동 줄임, 대조는 비교 기준 제공. 눈가림(blinding)에는 단일 눈가림과 이중 눈가림 설계가 있습니다.",
        keyIdea:
          "세 원리: 무작위화·반복·대조. 대조군 = 처치 없음, 위약군 = 비활성 처치(심리 효과 통제).",
        table: null,
        terms: [
          {
            term: "무작위화·반복·대조 (Randomization, replication, control)",
            def: "각각이 필요한 이유.",
          },
          {
            term: "눈가림 (Blinding)",
            def: "단일 눈가림과 이중 눈가림 설계.",
          },
        ],
        traps: [
          "대조군과 위약군을 혼동하기 — 대조군은 처치를 안 받고, 위약군은 비활성 처치를 받아요; 둘 다 대조지만 AP는 위약이 쓰이는 이유(심리적 효과 설명)를 구별합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-statistics-u3-l4",
    courseId: "ap-statistics",
    subjectLabel: "AP Statistics",
    emoji: "📊",
    unit: 3,
    lessonNum: 4,
    unitName: "Collecting Data",
    title: "실험에서의 블록화",
    subtitle: "블록화는 '무작위'가 아니에요 — 비슷한 단위를 먼저 묶고 블록 안에서 무작위화합니다.",
    overview:
      "블록화는 변동을 줄이고 처치 효과에 대한 민감도를 높여요. 블록 설계는 무작위화 전에 비슷한 실험 단위를 묶는 것이고, 매칭 짝(matched pairs)이 가장 단순한 블록 설계입니다.",
    objectives: [
      "블록화가 변동을 줄이고 처치 효과 민감도를 높이는 이유를 설명할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "블록 설계(block design)는 무작위화 전에 비슷한 실험 단위를 묶어요. 매칭 짝(matched pairs)은 가장 단순한 블록 설계로, 개체를 짝짓거나 전후 비교를 합니다. 블록 내 변동이 작아 처치 효과를 더 선명하게 봅니다.",
        keyIdea:
          "블록화 = 비슷한 단위 먼저 묶고(무작위 아님) → 블록 안에서 무작위화. 변동 ↓, 민감도 ↑.",
        table: null,
        terms: [
          {
            term: "블록 설계 (Block design)",
            def: "무작위화 전에 비슷한 실험 단위를 묶는 것.",
          },
          {
            term: "매칭 짝 (Matched pairs)",
            def: "가장 단순한 블록 설계(개체 짝짓기 또는 전후 비교).",
          },
        ],
        traps: [
          "블록화를 '무작위로 집단을 나누는 것'으로 기술하기 — 블록화는 무작위가 아니에요; 비슷한 단위를 먼저 묶고 블록 안에서 무작위화합니다; AP는 무엇이 적절한 블록 변수인지 식별하게 합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-statistics-u3-l5",
    courseId: "ap-statistics",
    subjectLabel: "AP Statistics",
    emoji: "📊",
    unit: 3,
    lessonNum: 5,
    unitName: "Collecting Data",
    title: "실험에서의 인과",
    subtitle: "무작위 '배정'이 인과를 허락해요 — 무작위 '표집'은 일반화만 허락합니다.",
    overview:
      "무작위 배정은 (무작위 표집과 달리) 인과 결론을 허락해요. 추론 범위(scope of inference)가 핵심: 무작위 표집은 모집단으로의 일반화를, 무작위 배정은 인과를 허락합니다.",
    objectives: [
      "무작위 배정이 (무작위 표집과 달리) 인과 결론을 허락함을 설명할 수 있다.",
      "인과 확립의 네 조건을 파악할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "추론 범위(scope of inference): 무작위 표집은 모집단으로의 일반화를 허락하고, 무작위 배정은 인과를 허락해요. 둘은 별개의 조건이라, 어느 것이 충족되느냐에 따라 결론의 범위가 달라집니다.",
        keyIdea:
          "무작위 표집 → 일반화. 무작위 배정 → 인과. 두 조건은 별개.",
        table: null,
        terms: [
          {
            term: "추론 범위 (Scope of inference)",
            def: "무작위 표집은 일반화를, 무작위 배정은 인과를 허락함.",
          },
        ],
        traps: [
          "무작위 표집이 인과를 세운다고 주장하기 — 무작위 '표집'은 모집단으로의 일반화를, 무작위 '배정'은 인과 결론을 허락해요; AP는 추론 범위의 이 두 조건 구별을 시험합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-statistics-u3-l6",
    courseId: "ap-statistics",
    subjectLabel: "AP Statistics",
    emoji: "📊",
    unit: 3,
    lessonNum: 6,
    unitName: "Collecting Data",
    title: "자료 수집의 윤리",
    subtitle: "익명성(신원 모름)과 비밀 보장(알지만 안 밝힘)은 달라요.",
    overview:
      "자료 수집 윤리에는 사전 동의, 익명성 vs 비밀 보장, IRB(연구윤리심의) 감독이 있어요. 관찰 연구와 실험 연구의 윤리 문제, 그리고 데이터 프라이버시와 보호가 핵심입니다.",
    objectives: [
      "사전 동의, 익명성 vs 비밀 보장, IRB 감독을 설명할 수 있다.",
      "관찰 연구와 실험 연구의 윤리 문제를 구별할 수 있다.",
      "데이터 프라이버시와 보호를 설명할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "자료 수집의 윤리",
        subtitle: null,
        body:
          "사전 동의(informed consent)는 참가자가 위험을 알고 참여하는 것이고, IRB(연구윤리심의위원회)가 연구를 감독해요. 익명성(anonymity)은 연구자가 신원을 모르는 것, 비밀 보장(confidentiality)은 알지만 밝히지 않는 것입니다. 데이터 프라이버시 보호도 중요해요.",
        keyIdea:
          "사전 동의 + IRB 감독. 익명성 = 신원 모름, 비밀 보장 = 알지만 안 밝힘.",
        table: null,
        terms: [],
        traps: [
          "익명성(연구자가 신원을 모름)과 비밀 보장(알지만 밝히지 않음)을 혼동하기 — AP는 가끔 이 구별과 그것이 편향·참가자 보호에 왜 중요한지 시험합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-statistics-u3-l7",
    courseId: "ap-statistics",
    subjectLabel: "AP Statistics",
    emoji: "📊",
    unit: 3,
    lessonNum: 7,
    unitName: "Collecting Data",
    title: "통계에서의 시뮬레이션",
    subtitle: "확률에 맞게 숫자를 정확히 배정해야 해요 — P=0.3이면 100개 중 정확히 30개.",
    overview:
      "시뮬레이션은 확률 문제를 모형화하는 도구예요. 확률을 나타내도록 숫자/결과를 배정하고, 반복을 돌려 결과에서 경험적 확률을 계산합니다. 배정 비율을 정확히 정당화하는 게 핵심이에요.",
    objectives: [
      "확률 문제를 모형화하는 시뮬레이션을 설계할 수 있다.",
      "확률을 나타내도록 숫자/결과를 배정할 수 있다.",
      "반복을 돌려 결과에서 경험적 확률을 계산할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "통계에서의 시뮬레이션",
        subtitle: null,
        body:
          "시뮬레이션 설계는 ① 확률을 나타내도록 숫자/결과를 배정하고 ② 반복을 돌리고 ③ 결과에서 경험적 확률을 계산하는 순서예요. 배정 비율이 확률과 정확히 일치해야 합니다 — P(성공) = 0.3이면 100개 중 정확히 30개를 성공에 배정해요.",
        keyIdea:
          "시뮬레이션: 확률에 맞게 숫자 배정 → 반복 → 경험적 확률 계산. 배정 비율을 정확히 정당화.",
        table: null,
        terms: [],
        traps: [
          "비율을 정당화하지 않고 같은 결과에 여러 숫자를 배정하기 — P(성공) = 0.3이면 동일 확률 결과 100개 중 정확히 30개를 배정해야 해요; AP FRQ는 시뮬레이션 설계를 명확하고 정확하게 기술하게 합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-statistics-u3-l8",
    courseId: "ap-statistics",
    subjectLabel: "AP Statistics",
    emoji: "📊",
    unit: 3,
    lessonNum: 8,
    unitName: "Collecting Data",
    title: "설문 설계와 질문 표현",
    subtitle: "'편향됐다'만으로는 부족해요 — 어떤 편향인지 메커니즘을 짚어야 합니다.",
    overview:
      "설문 설계에서 유도 질문, 편향된 질문, 이중 질문이 응답을 왜곡해요. 문항 순서 효과도 있고, 사전 검사(파일럿)와 질문 검증이 품질을 높입니다. 핵심: 편향의 '종류'를 구체적으로 짚어야 해요.",
    objectives: [
      "편향된 질문, 유도 질문, 이중 질문을 식별할 수 있다.",
      "설문 문항의 순서 효과를 설명할 수 있다.",
      "파일럿 검사와 질문 검증을 설명할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "설문 설계와 질문 표현",
        subtitle: null,
        body:
          "편향된 질문(loaded)·유도 질문(leading)·이중 질문(double-barreled)이 응답을 왜곡해요. 문항 순서 효과도 응답에 영향을 줍니다. 파일럿 검사로 질문을 검증해 이런 문제를 미리 잡아요.",
        keyIdea:
          "유도·편향·이중 질문이 응답 왜곡. 순서 효과도 영향. 편향의 '종류'를 구체적으로 식별.",
        table: null,
        terms: [],
        traps: [
          "설문 질문의 구체적 편향 종류를 식별하지 않기 — AP는 출처를 '식별하고 설명'하게 해요; 메커니즘(예: 질문 표현으로 인한 응답 편향)을 명명하지 않고 '편향됐다'고만 하면 감점입니다.",
        ],
        example: null,
      },
    ],
  },
];
