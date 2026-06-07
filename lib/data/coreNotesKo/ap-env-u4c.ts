/**
 * Core Notes 한국어 스토리텔링 버전 — AP Environmental Science Unit 4 (4.7–4.8, Unit 4 완결).
 * 원본 내용 전량 보존(overview·body·keyIdea·table·diagram 포함) + 일타강사 내러티브.
 * 용어는 "한국어 (English)" 병기.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const AP_ENV_U4C_KO: CoreNote[] = [
  {
    lessonId: "ap-environmental-science-u4-l7",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 4,
    lessonNum: 7,
    unitName: "Earth Systems and Resources",
    title: "물 시스템 — 물 순환과 담수",
    subtitle: "지구 물의 거의 전부가 짜거나 얼어 있어요 — 우리가 다투는 건 접근 가능한 담수의 아주 얇은 조각입니다.",
    overview:
      "물은 증발·응결·강수·유출을 통해 끊임없이 순환해요. 하지만 지구 전체 물 중 담수이면서 접근 가능한 건 극히 일부입니다. 담수가 어디 있는지 — 그리고 우리가 지하수를 어떻게 끌어 쓰는지 — 이해하는 게 물 자원 문제의 핵심이에요.",
    objectives: [
      "물 순환을 기술할 수 있다.",
      "지구 물의 분포를 설명할 수 있다.",
      "대수층과 지하수 고갈을 기술할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "물 순환과 물이 있는 곳",
        subtitle: null,
        body:
          "물 순환(hydrologic cycle)은 증발(과 식물의 증산), 구름으로의 응결, 강수, 유출/침투를 통해 물을 이동시켜요. 하지만 지구 물의 ~97%가 짠 바다이고, 담수 대부분은 얼음에 갇혀 있어요. 접근 가능한 액체 담수(강·호수·지하수)는 아주 작은 비율뿐입니다.",
        keyIdea:
          "~97%가 바닷물, 나머지 대부분은 얼음 — 인류는 접근 가능한 담수의 '아주 얇은 조각'에 의존합니다.",
        table: null,
        terms: [
          {
            term: "물 순환 (Hydrologic cycle)",
            def: "증발·응결·강수·유출을 통한 물의 끊임없는 이동.",
          },
          {
            term: "증산 (Transpiration)",
            def: "식물이 공기로 방출하는 물; 물 순환의 일부.",
          },
        ],
        traps: [],
        example: null,
      },
      {
        title: "지하수와 대수층",
        subtitle: null,
        body:
          "많은 담수가 대수층(다공질 암석층)에 지하로 저장돼요. 우물로 퍼 올리지만, 많은 곳에서 추출이 함양을 초과해 지하수 고갈, 땅 가라앉음(지반 침하), 연안의 염수 침입을 일으킵니다. 오갈랄라 대수층이 과도하게 끌어 쓴 고전적 예예요.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "대수층 (Aquifer)",
            def: "지하수를 저장하는 지하 암석/퇴적물 층.",
          },
          {
            term: "지하수 고갈 (Groundwater depletion)",
            def: "지하수를 함양 속도보다 빠르게 퍼내는 것.",
          },
          {
            term: "염수 침입 (Saltwater intrusion)",
            def: "고갈된 연안 대수층으로 바닷물이 스며드는 것.",
          },
        ],
        traps: [
          "대수층은 '천천히' 함양돼요 — 과잉 양수(예: 오갈랄라)는 인간 시간 척도에선 재생 불가능 자원을 캐내는 셈입니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-environmental-science-u4-l8",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 4,
    lessonNum: 8,
    unitName: "Earth Systems and Resources",
    title: "자연재해 — 빈도, 규모, 예측",
    subtitle: "자연 위험은 사람을 덮칠 때 재해가 돼요 — 그리고 인간의 선택이 종종 그걸 더 악화시킵니다.",
    overview:
      "지진·화산·허리케인·홍수·가뭄은 자연 위험이에요. 인간에게 영향을 줄 때 재해가 되고, 인간 행동(범람원 건축, 습지 제거)이 종종 피해를 키웁니다. 원인을 이해하면 예측과 대비에 도움이 돼요.",
    objectives: [
      "자연 위험과 재해를 구별할 수 있다.",
      "위험을 지구 시스템과 연결할 수 있다.",
      "인간 선택이 재해 영향에 미치는 영향을 설명할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "유형과 원인",
        subtitle: null,
        body:
          "많은 재해가 지금까지 배운 지구 시스템으로 거슬러 올라가요. 지질 위험(지진·화산·쓰나미)은 판 구조론에서 오고, 기상/기후 위험(허리케인·홍수·가뭄·산불)은 대기와 해양 과정에서 옵니다.",
        keyIdea:
          "'자연재해' = 자연 위험 + 취약한 사람. 위험은 자연적이지만, 피해의 상당 부분은 인간의 선택이에요.",
        table: {
          headers: ["위험", "무엇이 일으키나"],
          rows: [
            ["지진·화산·쓰나미", "판 구조론"],
            ["허리케인", "따뜻한 바닷물 + 대기"],
            ["홍수·가뭄", "강수 극값 / 기후"],
          ],
        },
        terms: [],
        traps: [],
        example: null,
      },
      {
        title: "인간 영향과 예측",
        subtitle: null,
        body:
          "인간의 결정이 재해를 증폭시켜요: 범람원이나 단층선 위 건축, 폭풍을 완충하는 맹그로브/습지 제거, 그리고 산사태를 일으키는 경사면 삼림 벌채. 더 나은 예측(지진계·기상 모델)과 대비(구역 설정·조기 경보)가 피해를 줄이지만, 없앨 수는 없습니다.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "자연 위험 vs 재해 (Natural hazard vs. disaster)",
            def: "자연 사건 vs 인간 피해/손실을 일으키는 사건.",
          },
          {
            term: "범람원 (Floodplain)",
            def: "강 근처의 낮은 땅으로 홍수에 취약함; 건축에 위험.",
          },
        ],
        traps: [
          "인간 선택(어디에 짓는지, 자연 완충재 제거)이 종종 관리 가능한 위험을 치명적 재해로 바꿉니다.",
        ],
        example: null,
      },
    ],
  },
];
