/**
 * Core Notes 한국어 스토리텔링 버전 — AP Human Geography Unit 2 (2.1–2.7).
 * 원본 내용 전량 보존(overview·body·keyIdea·table·diagram 포함) + 일타강사 내러티브.
 * overview가 비어 있던 레슨은 한국어 overview를 추가(2~4문장 + 시험 함정).
 * 용어는 "한국어 (English)" 병기.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const AP_HUMAN_GEOGRAPHY_U2_KO: CoreNote[] = [
  {
    lessonId: "ap-human-geography-u2-l1",
    courseId: "ap-human-geography",
    subjectLabel: "AP Human Geography",
    emoji: "🗺️",
    unit: 2,
    lessonNum: 1,
    unitName: "Population and Migration",
    title: "인구 분포와 밀도",
    subtitle:
      "사람들이 '어디에' 모여 사는가, 그리고 그 밀집을 '어떻게' 측정하는가 — 같은 인구라도 재는 방식이 달라요.",
    overview:
      "사람은 지구 표면에 고르게 흩어져 살지 않아요 — 약 3분의 2가 4대 인구 밀집지(동아시아·남아시아·유럽·북미 동부)에 몰려 있습니다. '얼마나 빽빽한가'를 재는 게 인구 밀도(population density)인데, 여기서 함정이 하나 있어요. 같은 나라라도 '재는 방식'에 따라 밀도가 완전히 달라집니다. 시험에서는 산술 밀도와 생리 밀도를 헷갈리게 만드는 문제가 단골이니, 어떤 밀도를 묻는지 먼저 확인하는 습관을 들이세요.",
    objectives: [
      "산술 밀도와 생리 밀도를 구분할 수 있다.",
      "에쿠메네(거주 가능 지역)의 개념을 설명할 수 있다.",
      "세계 4대 인구 밀집지를 식별할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "인구 분포와 밀도",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [],
        traps: [
          "생리 밀도(physiological density) = 인구 / 경작 가능 토지 — 이집트에서는 산술 밀도보다 훨씬 높아요(국토 대부분이 사막이라 경작지가 좁으니까). 어떤 밀도를 묻는지 항상 먼저 확인하세요.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-human-geography-u2-l2",
    courseId: "ap-human-geography",
    subjectLabel: "AP Human Geography",
    emoji: "🗺️",
    unit: 2,
    lessonNum: 2,
    unitName: "Population and Migration",
    title: "인구 변천 모델 (DTM)",
    subtitle:
      "한 나라가 '높은 출생·높은 사망'에서 '낮은 출생·낮은 사망'으로 가는 길 — 단계만 알면 나라의 미래가 보여요.",
    overview:
      "인구 변천 모델(Demographic Transition Model, DTM)은 한 나라가 경제가 발전하면서 출생률과 사망률이 어떻게 변하는지를 단계별로 보여주는 지도예요. 1단계(높은 출생·높은 사망, 정체)에서 출발해, 2단계(사망률 급락 → 인구 폭발), 3단계(출생률 하락), 4단계(둘 다 낮음, 안정)를 거치고, 일부 모델은 5단계(출생률이 사망률보다 낮아 인구 감소)까지 갑니다. 핵심 지표는 조출생률(CBR)·조사망률(CDR)·자연증가율(NIR)이에요. 함정은 5단계예요 — 모든 버전의 DTM에 5단계가 있는 게 아니라는 점, 그리고 5단계에서는 NIR이 마이너스라는 점을 꼭 기억하세요.",
    objectives: [
      "DTM의 1~5단계를 설명할 수 있다.",
      "조출생률(CBR)·조사망률(CDR)·자연증가율(NIR)을 정의할 수 있다.",
      "5단계의 인구 감소 현상을 설명할 수 있다.",
    ],
    formulas: [],
    diagram: "dtm",
    sections: [
      {
        title: "인구 변천 모델 (DTM)",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [],
        traps: [
          "5단계(대체 출산율 미만, sub-replacement fertility)는 DTM의 모든 버전에 있는 게 아니에요 — 일본과 독일이 대표 사례라는 걸 알아두고, 5단계에서는 자연증가율(NIR)이 0보다 작다는 점을 기억하세요.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-human-geography-u2-l3",
    courseId: "ap-human-geography",
    subjectLabel: "AP Human Geography",
    emoji: "🗺️",
    unit: 2,
    lessonNum: 3,
    unitName: "Population and Migration",
    title: "인구 피라미드와 인구 구조",
    subtitle:
      "한 장의 그래프로 나라의 나이·성별을 읽어내는 법 — 바닥이 넓으면 젊은 나라, 좁으면 늙어가는 나라예요.",
    overview:
      "인구 피라미드(population pyramid)는 한 나라의 연령·성별 구조를 한눈에 보여주는 막대그래프예요. 왼쪽은 남성, 오른쪽은 여성, 위로 갈수록 나이가 많아집니다. 이 모양만 봐도 그 나라가 DTM의 어느 단계에 있는지, 미래에 인구가 늘지 줄지를 읽어낼 수 있어요. 또 부양비(dependency ratio) — 일하지 않는 어린이·노인을 일하는 인구가 얼마나 떠받쳐야 하는지 — 도 여기서 나옵니다. 함정은 '바닥 모양'이에요. 바닥이 넓으면 젊은 인구가 많아 미래 성장 잠재력이 크고(2·3단계), 바닥이 좁으면 고령화로 사회 서비스에 부담이 커집니다(4·5단계).",
    objectives: [
      "연령·성별 피라미드를 해석할 수 있다.",
      "부양비를 계산하고 설명할 수 있다.",
      "유소년 팽창형과 노년 팽창형을 구분할 수 있다.",
    ],
    formulas: [],
    diagram: "population-pyramid",
    sections: [
      {
        title: "인구 피라미드와 인구 구조",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [],
        traps: [
          "바닥이 넓으면(wide base) 2·3단계예요(유소년 많음, 높은 미래 성장). 바닥이 좁으면(narrow base) 4·5단계로 고령화가 진행돼 사회 서비스에 부담이 커집니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-human-geography-u2-l4",
    courseId: "ap-human-geography",
    subjectLabel: "AP Human Geography",
    emoji: "🗺️",
    unit: 2,
    lessonNum: 4,
    unitName: "Population and Migration",
    title: "맬서스, 보스럽, 그리고 인구 이론",
    subtitle:
      "'식량이 인구를 못 따라간다'는 비관론 vs. '필요가 혁신을 낳는다'는 낙관론 — 두 입장을 시나리오에 적용할 줄 알아야 해요.",
    overview:
      "인구가 늘면 식량은 충분할까요? 토머스 맬서스(Malthus)는 비관했어요 — 인구는 기하급수적으로(2, 4, 8…) 늘지만 식량은 산술급수적으로(1, 2, 3…)만 늘어, 결국 식량이 인구를 못 따라가 기근·전쟁으로 인구가 강제로 조절된다는 거죠. 반대로 에스터 보스럽(Boserup)은 낙관했어요 — 인구가 늘면 '필요가 발명의 어머니'가 되어 농업 기술이 혁신되고 더 많은 식량을 생산하게 된다는 겁니다. 현대의 신맬서스주의(Neo-Malthusianism)는 식량뿐 아니라 자원·환경 한계까지 걱정해요. FRQ에서는 주어진 시나리오에 두 입장을 '적용'하라고 시키니, 단순 암기가 아니라 누가 어떤 논리를 펴는지를 정확히 알아야 합니다.",
    objectives: [
      "맬서스의 인구 한계론을 설명할 수 있다.",
      "보스럽의 혁신론을 설명할 수 있다.",
      "신맬서스주의를 설명할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "맬서스, 보스럽, 그리고 인구 이론",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [],
        traps: [
          "맬서스는 인구가 식량을 앞지른다고 봤어요(비관론). 보스럽은 필요가 농업 혁신을 이끈다고 봤고요(낙관론). FRQ는 두 입장을 모두 시나리오에 적용하라고 요구합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-human-geography-u2-l5",
    courseId: "ap-human-geography",
    subjectLabel: "AP Human Geography",
    emoji: "🗺️",
    unit: 2,
    lessonNum: 5,
    unitName: "Population and Migration",
    title: "이주의 배출 요인과 흡인 요인",
    subtitle:
      "사람을 떠나게 '미는' 힘과 새 곳으로 '당기는' 힘 — 그리고 그 사이를 가로막는 장애물들.",
    overview:
      "왜 사람들은 살던 곳을 떠날까요? 모든 이주는 '미는 힘'과 '당기는 힘'의 줄다리기예요. 배출 요인(push factor)은 떠나게 만드는 부정적 조건(전쟁·실업·재해), 흡인 요인(pull factor)은 끌어당기는 긍정적 조건(일자리·안전·기회)입니다. 라벤슈타인(Ravenstein)은 이주의 법칙들을 정리해, 대부분의 이주가 단거리이고 경제적 동기에서 비롯된다고 했어요. 그런데 출발지와 목적지 사이에는 '중간에 끼어드는' 요소가 있습니다 — 이게 바로 시험 단골 함정이에요.",
    objectives: [
      "라벤슈타인의 이주 법칙을 설명할 수 있다.",
      "배출-흡인 모델을 적용할 수 있다.",
      "개입 장애물의 개념을 설명할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "이주의 배출 요인과 흡인 요인",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [],
        traps: [
          "개입 기회(intervening opportunity, 가는 길에 더 좋은 선택지를 발견하는 것) vs. 개입 장애물(intervening obstacle, 이주를 멈추게 하는 장벽) — 학생들이 정말 끊임없이 헷갈리는 부분이에요.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-human-geography-u2-l6",
    courseId: "ap-human-geography",
    subjectLabel: "AP Human Geography",
    emoji: "🗺️",
    unit: 2,
    lessonNum: 6,
    unitName: "Population and Migration",
    title: "이주의 유형",
    subtitle:
      "스스로 떠나는가, 떠밀려 가는가 — 그리고 국경을 넘느냐 마느냐가 모든 걸 가릅니다.",
    overview:
      "이주에도 종류가 있어요. 자발적 이주(voluntary migration)는 더 나은 삶을 위해 스스로 선택해 떠나는 것, 강제적 이주(forced migration)는 노예무역이나 분쟁처럼 의지와 무관하게 떠밀려 가는 것입니다. 또 계절을 따라 가축을 데리고 이동하는 이목(transhumance)처럼 주기적으로 오가는 순환 이동도 있어요. 가장 중요한 시험 포인트는 난민(refugee)과 국내 실향민(IDP)의 구분인데, 둘을 가르는 단 하나의 기준은 '국경을 넘었느냐'예요.",
    objectives: [
      "자발적 이주와 강제적 이주를 구분할 수 있다.",
      "이목과 순환 이동을 설명할 수 있다.",
      "난민과 국내 실향민(IDP)을 구분할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "이주의 유형",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [],
        traps: [
          "난민(refugee)은 국제 국경을 넘은 사람이고, 국내 실향민(IDP, Internally Displaced Persons)은 자기 나라 안에 머무는 사람이에요 — 이 구분이 FRQ 채점에서 점수를 가릅니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-human-geography-u2-l7",
    courseId: "ap-human-geography",
    subjectLabel: "AP Human Geography",
    emoji: "🗺️",
    unit: 2,
    lessonNum: 7,
    unitName: "Population and Migration",
    title: "이주의 패턴과 결과",
    subtitle:
      "사람이 떠나면 무엇이 남고 무엇이 따라오는가 — 두뇌 유출과 송금은 한 동전의 양면이에요.",
    overview:
      "이주는 일어나고 끝나는 게 아니라, 출발지와 목적지 양쪽에 깊은 흔적을 남깁니다. 교육받은 인재가 더 나은 기회를 찾아 떠나면 출발국은 두뇌 유출(brain drain)로 인적 자원을 잃어요. 하지만 그들이 고향으로 돈을 부치는 송금(remittances)은 본국 경제의 든든한 버팀목이 됩니다. 또 먼저 정착한 사람이 가족·친지를 끌어들이는 연쇄 이주(chain migration)는 특정 지역에 같은 출신의 공동체(ethnic enclave)를 형성하죠. 함정 포인트는 이거예요 — 두뇌 유출과 송금은 따로 노는 게 아니라, 같은 이주 흐름의 양면이라는 점.",
    objectives: [
      "두뇌 유출의 원인과 영향을 설명할 수 있다.",
      "송금이 본국 경제에 미치는 영향을 설명할 수 있다.",
      "연쇄 이주를 설명할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "이주의 패턴과 결과",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [],
        traps: [
          "개발도상국에서는 송금(remittances)이 해외 원조 총액을 넘어설 수 있어요 — 두뇌 유출과 송금은 같은 이주라는 동전의 양면입니다.",
        ],
        example: null,
      },
    ],
  },
];
