/**
 * Core Notes 한국어 스토리텔링 버전 — AP Human Geography Unit 1 (1.1–1.5).
 * 원본 구조 전량 보존(objectives·traps·diagram·formulas 포함, null 유지) + 일타강사 내러티브.
 * overview가 비어 있던 레슨은 한국어 개요를 새로 추가.
 * 용어는 "한국어 (English)" 병기.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const AP_HUMAN_GEOGRAPHY_U1_KO: CoreNote[] = [
  {
    lessonId: "ap-human-geography-u1-l1",
    courseId: "ap-human-geography",
    subjectLabel: "AP Human Geography",
    emoji: "🗺️",
    unit: 1,
    lessonNum: 1,
    unitName: "Thinking Geographically",
    title: "지도와 공간적 사고",
    subtitle: null,
    overview:
      "지리학은 '어디에, 왜 거기에'를 묻는 학문이고, 그 출발점이 바로 지도예요. 지도는 단순한 그림이 아니라 데이터를 공간에 얹은 '도구'입니다 — 위치를 보여주는 참조 지도(reference map)와 한 가지 주제를 보여주는 주제도(thematic map)가 핵심 구분이에요. 시험에서는 '이 데이터에는 어떤 지도가 맞느냐'를 끊임없이 물어요. 등치선도·단계구분도·점밀도도를 데이터 성격에 맞춰 골라내는 감각이 1단원의 첫 관문입니다.",
    objectives: [
      "참조 지도와 주제도를 구분할 수 있다.",
      "등치선도(isoline map)를 이해할 수 있다.",
      "단계구분도(choropleth map)를 이해할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "지도와 공간적 사고",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [],
        traps: [
          "단계구분도(choropleth, 색의 농담으로 칠한 면)와 점밀도도(dot-density, 개별 점)를 구분하세요 — FRQ는 '이 데이터에 어떤 지도 유형이 적합한지' 그 근거를 대라고 묻습니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-human-geography-u1-l2",
    courseId: "ap-human-geography",
    subjectLabel: "AP Human Geography",
    emoji: "🗺️",
    unit: 1,
    lessonNum: 2,
    unitName: "Thinking Geographically",
    title: "지리 데이터와 GIS",
    subtitle: null,
    overview:
      "현대 지리학은 종이 지도에서 디지털 데이터로 무게중심이 옮겨갔어요. GIS(지리정보시스템)는 인구·고도·토지이용 같은 정보를 '레이어'로 쌓아 겹쳐 보며 분석하는 시스템입니다. 여기에 멀리서 정보를 수집하는 원격 탐사(remote sensing), 위치를 정확히 찍어주는 GPS가 함께 작동해요. 시험의 단골 함정은 역할 구분 — GPS는 '수집', GIS는 '분석'이라는 점을 절대 헷갈리면 안 됩니다.",
    objectives: [
      "GIS 레이어(layers)를 이해할 수 있다.",
      "원격 탐사(remote sensing)를 이해할 수 있다.",
      "GPS의 활용을 이해할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "지리 데이터와 GIS",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [],
        traps: [
          "GIS 문제는 무엇을 '결합'할 수 있는지를 묻습니다 — 인구·고도·토지이용을 겹쳐 올리는(overlay) 거예요. GPS는 수집(collection), GIS는 분석(analysis)이라는 점을 기억하세요.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-human-geography-u1-l3",
    courseId: "ap-human-geography",
    subjectLabel: "AP Human Geography",
    emoji: "🗺️",
    unit: 1,
    lessonNum: 3,
    unitName: "Thinking Geographically",
    title: "스케일과 지역",
    subtitle: null,
    overview:
      "지리학자는 세상을 '지역(region)'으로 묶어 이해해요. 공통 특성으로 묶는 공식 지역(formal region), 한 중심지의 기능으로 묶는 기능 지역(functional region), 사람들의 인식으로 묶는 토속/인식 지역(vernacular region) — 이 세 가지가 핵심 분류입니다. 또한 같은 데이터도 어떤 분석 스케일(scale of analysis)로 보느냐에 따라 결론이 달라져요. 시험 단골 함정은 '남부' 같은 인식 지역을 공식 지역으로 착각하는 것입니다.",
    objectives: [
      "공식 지역·기능 지역·토속 지역을 구분할 수 있다.",
      "분석 스케일(scale of analysis)을 이해할 수 있다.",
      "지리적 스케일이 결과에 미치는 영향을 이해할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "스케일과 지역",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [],
        traps: [
          "토속/인식 지역(vernacular/perceptual region, 예: '미국 남부')은 데이터가 아니라 '인식'으로 정의됩니다 — 학생들이 이걸 공식 지역(formal region)과 자주 혼동해요.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-human-geography-u1-l4",
    courseId: "ap-human-geography",
    subjectLabel: "AP Human Geography",
    emoji: "🗺️",
    unit: 1,
    lessonNum: 4,
    unitName: "Thinking Geographically",
    title: "공간, 장소, 그리고 경관",
    subtitle: null,
    overview:
      "공간(space)은 단순한 위치와 거리이지만, 장소(place)는 사람이 의미와 감정을 부여한 곳이에요 — 같은 좌표라도 '장소감(sense of place)'이 있느냐가 다릅니다. 그리고 문화가 땅 위에 남긴 눈에 보이는 흔적이 바로 문화 경관(cultural landscape)이에요. 건물·도로·농지 같은 인공 환경(built environment)을 읽으면 그 사회의 문화가 보입니다. 시험에서는 문화 경관과 순차 점유(sequent occupance) 개념을 예시와 함께 구분할 줄 알아야 해요.",
    objectives: [
      "장소감(sense of place)과 공간(space)을 구분할 수 있다.",
      "문화 경관(cultural landscape)을 이해할 수 있다.",
      "인공 환경(built environment)을 이해할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "공간, 장소, 그리고 경관",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [],
        traps: [
          "문화 경관(cultural landscape) = 문화가 땅에 남긴 눈에 보이는 흔적입니다. 순차 점유(sequent occupance)는 연속된 문화들이 켜켜이 쌓인 층을 가리켜요 — 두 용어 모두 예시와 함께 알아두세요.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-human-geography-u1-l5",
    courseId: "ap-human-geography",
    subjectLabel: "AP Human Geography",
    emoji: "🗺️",
    unit: 1,
    lessonNum: 5,
    unitName: "Thinking Geographically",
    title: "공간 상호작용 모델",
    subtitle: null,
    overview:
      "장소들은 서로 영향을 주고받는데, 그 패턴에는 규칙이 있어요. 중력 모델(gravity model)은 두 장소가 클수록, 가까울수록 상호작용이 강해진다고 봅니다. 거리가 멀어질수록 상호작용이 약해지는 거리 조락(distance decay), 그리고 교통·통신의 발달로 거리의 마찰이 줄어드는 시공간 압축(space-time compression)이 함께 작동해요. 핵심 공식은 상호작용 ∝ (인구₁ × 인구₂) / 거리² — 이 제곱이 시험의 포인트입니다.",
    objectives: [
      "중력 모델(gravity model)을 이해할 수 있다.",
      "거리 조락(distance decay)을 이해할 수 있다.",
      "시공간 압축(space-time compression)을 이해할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "공간 상호작용 모델",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [],
        traps: [
          "중력 모델(gravity model): 상호작용 ∝ (인구₁ × 인구₂) / 거리² — 큰 도시일수록 더 강하게 끌어당기고, 거리가 멀어질수록 상호작용은 기하급수적으로 줄어듭니다.",
        ],
        example: null,
      },
    ],
  },
];
