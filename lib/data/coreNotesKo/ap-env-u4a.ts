/**
 * Core Notes 한국어 스토리텔링 버전 — AP Environmental Science Unit 4 (4.1–4.3).
 * 원본 내용 전량 보존(overview·body·keyIdea·table·diagram 포함) + 일타강사 내러티브.
 * 용어는 "한국어 (English)" 병기.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const AP_ENV_U4A_KO: CoreNote[] = [
  {
    lessonId: "ap-environmental-science-u4-l1",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 4,
    lessonNum: 1,
    unitName: "Earth Systems and Resources",
    title: "판 구조론과 지구 내부",
    subtitle: "지구 지각은 움직이는 맨틀 위에 떠 있어요 — 판이 만나는 곳에서 지질 현상이 일어납니다.",
    overview:
      "지구 바깥 껍질은 뜨겁게 흐르는 맨틀 위를 천천히 움직이는 판(tectonic plates)들로 쪼개져 있어요. 판이 상호작용하는 곳에서 지진·화산·산맥이 생깁니다. 경계 유형이 무엇이 만들어질지를 정해요.",
    objectives: [
      "지구의 층상 내부를 기술할 수 있다.",
      "세 가지 판 경계 유형과 그 특징을 식별할 수 있다.",
      "판 구조론을 자연재해와 연결할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "지구의 층과 판 경계",
        subtitle: null,
        body:
          "지구는 핵, 두꺼운 맨틀, 얇은 지각을 가져요. 핵의 열이 맨틀에 대류를 일으켜 판을 움직입니다. 판이 만나는 곳에서 세 경계 유형이 서로 다른 지질을 만들어요.",
        keyIdea:
          "맨틀 대류가 판을 움직이는 '엔진'이에요 — 그리고 판 경계가 대부분의 지질 재해가 일어나는 곳입니다.",
        table: {
          headers: ["경계", "운동", "결과"],
          rows: [
            ["발산형 (Divergent)", "판이 벌어짐", "새 지각; 중앙 해령, 열곡"],
            ["수렴형 (Convergent)", "판이 충돌", "산맥, 화산, 섭입, 지진"],
            ["변환형 (Transform)", "판이 스쳐 지나감", "지진 (예: 산안드레아스 단층)"],
          ],
        },
        terms: [],
        traps: [],
        example: null,
      },
      {
        title: "재해와 자원",
        subtitle: null,
        body:
          "수렴형 경계(섭입대)는 가장 극적인 지형을 만들어요: 화산, 가장 깊은 지진, 산맥. 판 활동은 자원(광물·지열 에너지)도 농축하고 재해 지도를 형성합니다 — 대부분의 화산과 큰 지진이 태평양 '불의 고리'를 둘러싸요.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "판 (Tectonic plates)",
            def: "맨틀 위를 움직이는 지구 지각의 큰 조각.",
          },
          {
            term: "대류 (Convection currents)",
            def: "판 운동을 일으키는 맨틀의 열 흐름.",
          },
          {
            term: "섭입 (Subduction)",
            def: "수렴형 경계에서 한 판이 다른 판 아래로 미끄러져 들어가는 것.",
          },
        ],
        traps: [
          "발산형 = 판이 '벌어짐'(새 지각); 수렴형 = '모임'. 변환형 = 스쳐 지나감(지진, 새 지각 없음).",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-environmental-science-u4-l2",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 4,
    lessonNum: 2,
    unitName: "Earth Systems and Resources",
    title: "암석 순환과 토양 형성",
    subtitle: "암석은 끝없이 서로로 변해요 — 그 분해가 모든 육상 생명이 의존하는 토양을 만듭니다.",
    overview:
      "암석 순환(rock cycle)은 세 암석 유형(화성암·퇴적암·변성암)이 시간에 걸쳐 어떻게 서로로 변하는지를 기술해요. 암석의 풍화가 유기물과 결합해 토양 — 천천히 재생되는 중요한 자원으로, 뚜렷한 층(층위)을 가짐 — 을 만듭니다.",
    objectives: [
      "세 암석 유형과 암석 순환을 기술할 수 있다.",
      "풍화와 토양 형성을 설명할 수 있다.",
      "토양 층위와 성질을 식별할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "암석 순환",
        subtitle: null,
        body:
          "세 암석 유형이 끝없이 순환해요. 화성암은 식은 마그마에서; 퇴적암은 압축된 퇴적물에서(흔히 화석과 화석 연료를 품음); 변성암은 열과 압력으로 변한 암석에서 형성됩니다. 풍화와 침식이 암석을 토양의 광물 기반으로 부숴요.",
        keyIdea:
          "화석 연료와 화석은 '퇴적암'에서 발견돼요 — 압축된 고대 유기물과 퇴적물로 형성됩니다.",
        table: {
          headers: ["암석 유형", "무엇에서 형성"],
          rows: [
            ["화성암 (Igneous)", "식어 굳은 마그마나 용암"],
            ["퇴적암 (Sedimentary)", "압축된 퇴적물 (화석·화석 연료 품음)"],
            ["변성암 (Metamorphic)", "기존 암석이 열·압력으로 변함"],
          ],
        },
        terms: [],
        traps: [],
        example: null,
      },
      {
        title: "토양 형성과 층위",
        subtitle: null,
        body:
          "토양은 풍화된 암석이 분해된 유기물(부식질, humus)과 섞이며 천천히 형성돼요. 층상 층위가 발달합니다: O(유기물 낙엽층), A(표토 — 가장 비옥), B(심토), C(풍화된 모암). 토양 질감(모래/실트/점토 비율)이 보수력과 비옥도를 좌우해요.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "풍화 (Weathering)",
            def: "암석을 더 작은 입자로 부수는 물리·화학적 분해.",
          },
          {
            term: "토양 층위 (Soil horizons)",
            def: "토양의 층(O, A, B, C); A 층위(표토)가 가장 비옥함.",
          },
          {
            term: "토양 질감 (Soil texture)",
            def: "모래·실트·점토의 비율; 물·영양분 보유를 좌우함.",
          },
        ],
        traps: [
          "표토(A 층위)가 비옥한 층이에요 — 형성이 느리고 침식으로 쉽게 잃어, 인간 시간 척도에선 사실상 재생 불가능합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-environmental-science-u4-l3",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 4,
    lessonNum: 3,
    unitName: "Earth Systems and Resources",
    title: "대기 — 구조와 조성",
    subtitle: "층으로 이뤄진 얇은 기체 외피 — 그리고 생명을 자외선에서 지키는 오존층.",
    overview:
      "대기는 대부분 질소와 산소이고, 온도에 따라 층으로 배열돼요. 시험에 가장 중요한 두 층: 대류권(날씨가 있고 우리가 사는 곳)과 성층권(보호 오존층의 고향)입니다.",
    objectives: [
      "대기의 주요 조성을 진술할 수 있다.",
      "주요 대기층을 식별할 수 있다.",
      "오존층의 역할을 설명할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "조성과 층",
        subtitle: null,
        body:
          "건조 공기는 약 78% 질소, 21% 산소이고, 미량 기체(CO₂ 포함)가 나머지예요. 대기는 온도에 따라 층을 이루는데, 꼭 알아야 할 둘은 대류권과 성층권입니다.",
        keyIdea:
          "대류권 = 날씨 + 생명(아래쪽). 성층권 = 오존층(위쪽). 둘을 바꾸지 마세요.",
        table: {
          headers: ["층", "특징"],
          rows: [
            ["대류권 (Troposphere)", "최하층; 날씨 발생; 우리가 사는 곳"],
            ["성층권 (Stratosphere)", "위쪽; 보호 오존층 포함"],
          ],
        },
        terms: [],
        traps: [],
        example: null,
      },
      {
        title: "오존층",
        subtitle: null,
        body:
          "성층권에서 오존층은 태양의 해로운 자외선(UV) 대부분을 흡수해, 피부암과 생태계 피해로부터 생명을 보호해요. 이 '좋은' 고고도 오존은 '나쁜' 지표면 오존(오염물질)과 달라요 — 시험이 무척 좋아하는 구별입니다.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "대류권 (Troposphere)",
            def: "날씨가 일어나는 최하 대기층.",
          },
          {
            term: "성층권 (Stratosphere)",
            def: "대류권 위의 층으로 오존층을 포함함.",
          },
          {
            term: "오존층 (Ozone layer)",
            def: "해로운 UV 복사를 흡수하는 성층권 오존.",
          },
        ],
        traps: [
          "'좋은' 오존은 '성층권'에 있고(UV 차단); '나쁜' 오존은 '지표면'에 있어요(오염물질). 같은 분자, 반대 역할입니다.",
        ],
        example: null,
      },
    ],
  },
];
