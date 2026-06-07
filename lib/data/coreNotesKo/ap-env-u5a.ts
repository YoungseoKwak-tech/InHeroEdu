/**
 * Core Notes 한국어 스토리텔링 버전 — AP Environmental Science Unit 5 (5.1–5.3).
 * 원본 내용 전량 보존(overview·body·keyIdea·table·diagram 포함) + 일타강사 내러티브.
 * 용어는 "한국어 (English)" 병기.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const AP_ENV_U5A_KO: CoreNote[] = [
  {
    lessonId: "ap-environmental-science-u5-l1",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 5,
    lessonNum: 1,
    unitName: "Land and Water Use",
    title: "농업 — 녹색 혁명과 그 결과",
    subtitle: "새 종자와 화학물질이 수십억을 먹였어요 — 하지만 심각한 환경 비용과 함께.",
    overview:
      "녹색 혁명(Green Revolution)은 고수확 품종, 관개, 합성 비료, 농약을 써서 식량 생산을 극적으로 늘렸어요. 수십억 명의 기근을 막았지만, 그 산업적 방법은 무거운 환경적·사회적 비용을 안고 있습니다.",
    objectives: [
      "녹색 혁명과 그 방법을 기술할 수 있다.",
      "그 이익과 환경 비용을 설명할 수 있다.",
      "산업 농업을 자급 농업과 구별할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "녹색 혁명이 한 일",
        subtitle: null,
        body:
          "20세기 중반부터 녹색 혁명은 고수확 품종(HYV) 작물에 더해 무거운 투입재 — 관개·합성 비료·농약 — 와 기계화를 도입했어요. 수확량이 치솟아 식량 공급을 극적으로 늘리고, 특히 아시아에서 대규모 기근을 막았습니다.",
        keyIdea:
          "녹색 혁명은 거대한 수확량 증가를 물·비료·농약·화석 연료에 대한 무거운 의존과 맞바꿨어요.",
        table: null,
        terms: [
          {
            term: "녹색 혁명 (Green Revolution)",
            def: "HYV 종자·관개·비료·농약으로 작물 수확량이 늘어난 1900년대 중반의 변화.",
          },
          {
            term: "단작 (Monoculture)",
            def: "넓은 면적에 단일 작물 재배; 고수확이지만 병해충에 취약함.",
          },
        ],
        traps: [],
        example: null,
      },
      {
        title: "환경 비용",
        subtitle: null,
        body:
          "산업 농업의 비용은 큽니다: 비료 유출이 부영양화를 일으키고; 농약이 비표적 종을 해치며 저항성을 키우고; 관개가 물을 고갈시키고 토양을 염류화하며; 단작이 생물다양성을 침식하고; 시스템 전체가 화석 연료 집약적이에요. 저투입 자급 농업과 대조됩니다.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "산업 농업 (Industrial agriculture)",
            def: "화학물질·기계·관개에 의존하는 고투입·고수확 농업.",
          },
          {
            term: "자급 농업 (Subsistence agriculture)",
            def: "자기 가족을 먹이기 위한 소규모 저투입 농업.",
          },
        ],
        traps: [
          "녹색 혁명은 '수확량'을 키웠지만 관개·비료·농약·화석 연료 의존을 늘렸어요 — 그게 핵심 맞교환입니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-environmental-science-u5-l2",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 5,
    lessonNum: 2,
    unitName: "Land and Water Use",
    title: "토양 황폐화 — 침식, 염류화, 사막화",
    subtitle: "잘못된 방식의 농사는 토양을 벗기거나, 절이거나, 말려버려요 — 농지를 황무지로 바꾸면서.",
    overview:
      "토양은 천천히 재생되는 자원이라, 잘못된 토지 이용은 토양이 형성되는 것보다 빠르게 황폐화시켜요. 세 주범 — 침식·염류화·사막화 — 이 비옥도를 떨어뜨리고 땅을 영구적으로 손상시킬 수 있습니다.",
    objectives: [
      "토양 침식의 주요 원인과 영향을 설명할 수 있다.",
      "염류화와 사막화를 정의할 수 있다.",
      "농업 관행을 토양 황폐화와 연결할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "토양이 황폐화되는 세 방식",
        subtitle: null,
        body:
          "각 황폐화 형태에는 뚜렷한 원인이 있어요. 침식은 바람과 물에 표토를 잃는 것으로, 식생 제거(경운·과방목)가 악화시킵니다. 염류화는 관개수가 증발하며 소금이 쌓이는 것이에요. 사막화는 가뭄에 과용이 더해져 생산적 땅이 사막처럼 변하는 것입니다.",
        keyIdea:
          "셋 다 식생 제거나 토지 과용으로 거슬러 가요 — 식생이 토양을 붙잡고 보호하는 존재입니다.",
        table: {
          headers: ["과정", "원인", "결과"],
          rows: [
            ["침식 (Erosion)", "경운, 삼림 벌채, 과방목", "비옥한 표토 손실"],
            ["염류화 (Salinization)", "관개수 증발, 소금 잔류", "토양이 작물에 너무 짜짐"],
            ["사막화 (Desertification)", "가뭄 + 과방목/과경작", "땅이 사막처럼 변함"],
          ],
        },
        terms: [],
        traps: [],
        example: null,
      },
      {
        title: "왜 중요한가",
        subtitle: null,
        body:
          "표토는 형성에 수백 년이 걸리지만 몇 년 만에 침식될 수 있어, 황폐화는 인간 시간 척도에선 사실상 영구적이에요. 식량 안보를 위협하고, 사막화를 통해 전체 인구를 이주시킬 수도 있습니다. 더스트볼이 고전적 침식 사례예요.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "침식 (Erosion)",
            def: "바람과 물에 의한 표토의 마모와 제거.",
          },
          {
            term: "염류화 (Salinization)",
            def: "관개수가 증발하며 토양에 소금이 축적되는 것.",
          },
          {
            term: "사막화 (Desertification)",
            def: "가뭄과 과용으로 생산적 땅이 사막으로 황폐화되는 것.",
          },
        ],
        traps: [
          "염류화는 '관개'가 일으켜요(증발이 소금을 남김) — 관개 농업의 핵심 단점입니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-environmental-science-u5-l3",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 5,
    lessonNum: 3,
    unitName: "Land and Water Use",
    title: "지속가능 농업 — 보전 관행",
    subtitle: "식량을 키우면서 토양·물·생물다양성을 오래오래 지키는 농법.",
    overview:
      "지속가능 농업은 의존하는 자원을 황폐화시키지 않고 식량을 생산하는 걸 목표로 해요. 보전 관행 도구 모음이 토양을 보호하고, 화학 투입을 줄이며, 생산성을 시간에 걸쳐 유지합니다.",
    objectives: [
      "핵심 지속가능 농법을 식별할 수 있다.",
      "각각이 토양을 보호하거나 투입을 줄이는 법을 설명할 수 있다.",
      "지속가능 농업을 산업 농업과 대조할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "보전 관행",
        subtitle: null,
        body:
          "지속가능 농업은 여러 기법을 결합하는데, 대부분 토양을 제자리에 유지하고 화학물질 의존을 줄이는 걸 겨냥해요.",
        keyIdea:
          "공통 맥락: 토양을 '덮고' '다양하게' 유지하라 — 헐벗고 단일 작물인 토양이 침식되고 병해충을 키웁니다.",
        table: {
          headers: ["관행", "이점"],
          rows: [
            ["등고선 경작 / 계단식 (Contour plowing / terracing)", "물 유출을 늦춰 경사면 침식 감소"],
            ["피복 작물 & 무경운 (Cover crops & no-till)", "토양을 덮고, 영양분 추가, 침식 방지"],
            ["윤작 (Crop rotation)", "영양분 회복, 병해충 주기 끊음"],
            ["종합 병해충 관리 (IPM)", "혼합 방법으로 농약 사용 최소화"],
          ],
        },
        terms: [],
        traps: [],
        example: null,
      },
      {
        title: "투입 줄이기",
        subtitle: null,
        body:
          "토양 관리를 넘어, 지속가능 농업은 합성 투입재를 줄여요: IPM은 농약 전에 천적과 모니터링을 쓰고; 윤작과 피복 작물은 질소를 자연적으로 고정해 비료 필요를 줄입니다. 목표는 단기 최대 수확이 아니라 장기 생산성이에요.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "윤작 (Crop rotation)",
            def: "작물을 번갈아 심어 영양분을 회복하고 병해충을 교란하는 것.",
          },
          {
            term: "무경운 농업 (No-till farming)",
            def: "경운 없이 심어, 잔류물을 남겨 토양을 침식에서 보호하는 것.",
          },
          {
            term: "종합 병해충 관리 (Integrated pest management)",
            def: "생물학적·기계적·최소 화학적 방제를 결합해 병해충을 다루는 것.",
          },
        ],
        traps: [
          "IPM은 농약을 금지하지 않아요 — 생물학적/기계적 방제 후 '최후' 수단으로 씁니다.",
        ],
        example: null,
      },
    ],
  },
];
