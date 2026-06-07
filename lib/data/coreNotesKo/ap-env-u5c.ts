/**
 * Core Notes 한국어 스토리텔링 버전 — AP Environmental Science Unit 5 (5.7–5.8, Unit 5 완결).
 * 원본 내용 전량 보존(overview·body·keyIdea·table·diagram 포함) + 일타강사 내러티브.
 * 용어는 "한국어 (English)" 병기.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const AP_ENV_U5C_KO: CoreNote[] = [
  {
    lessonId: "ap-environmental-science-u5-l7",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 5,
    lessonNum: 7,
    unitName: "Land and Water Use",
    title: "도시 토지 이용과 무분별한 확산",
    subtitle: "도시가 어떻게 성장하느냐 — 바깥으로 퍼지느냐, 위로 올리느냐 — 가 환경 발자국을 정합니다.",
    overview:
      "인구가 도시화하면서 도시가 어떻게 확장되느냐가 중요해요. 도시 스프롤(urban sprawl, 주변 땅으로의 저밀도 확산)은 자동차 의존·서식지 손실·불투수면을 늘리는 반면, 스마트 성장과 고밀도 개발은 그 영향을 줄입니다.",
    objectives: [
      "도시 스프롤과 그 환경 영향을 정의할 수 있다.",
      "불투수면과 유출을 설명할 수 있다.",
      "스마트 성장 대안을 기술할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "스프롤과 그 영향",
        subtitle: null,
        body:
          "도시 스프롤은 저밀도 개발을 바깥으로 퍼뜨려, 농지와 서식지를 소비하고 자동차 의존(더 많은 배출)을 강요해요. 또 불투수면(도로·주차장)을 만들어 물이 스며들지 못하게 해, 유출·홍수·수질 오염을 늘리면서 지하수 함양을 줄입니다.",
        keyIdea:
          "스프롤의 숨은 비용은 불투수면이에요 — 빗물을 함양 대신 오염된 유출로 바꾸는 포장입니다.",
        table: null,
        terms: [
          {
            term: "도시 스프롤 (Urban sprawl)",
            def: "도시가 주변 땅으로 저밀도로 바깥으로 퍼지는 것.",
          },
          {
            term: "불투수면 (Impervious surface)",
            def: "침투를 막아 유출을 늘리는 포장/지붕.",
          },
        ],
        traps: [],
        example: null,
      },
      {
        title: "스마트 성장",
        subtitle: null,
        body:
          "스마트 성장(smart growth)은 고밀도·복합 용도 개발, 대중교통, 보존된 녹지로 스프롤에 맞서요. 도시 열섬 효과(urban heat island, 포장과 식생 상실로 도시가 주변보다 더 더운 것)는 옥상 녹화·나무·공원으로 완화됩니다.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "스마트 성장 (Smart growth)",
            def: "스프롤을 제한하는 압축적·대중교통 중심·복합 용도 계획.",
          },
          {
            term: "도시 열섬 (Urban heat island)",
            def: "포장과 식생 부족으로 도시가 농촌보다 더 더운 것.",
          },
        ],
        traps: [
          "불투수면은 '더 많은 유출/홍수'와 '더 적은 지하수 함양'을 둘 다 일으켜요 — 이중 물 문제입니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-environmental-science-u5-l8",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 5,
    lessonNum: 8,
    unitName: "Land and Water Use",
    title: "물 사용, 전용, 그리고 관개 문제",
    subtitle: "인간은 엄청난 양의 담수를 옮기고 소비해요 — 대부분 농업용으로 — 큰 환경 비용과 함께.",
    overview:
      "농업이 인간 담수의 가장 큰 몫을 쓰고, 우리는 그걸 공급하려 댐과 전용으로 강을 개조해요. 이 공학적 위업은 물과 전력을 주지만 생태계를 교란하고, 비효율적 관개는 물을 낭비하고 토양을 손상시킵니다.",
    objectives: [
      "담수의 가장 큰 용도를 식별할 수 있다.",
      "댐과 전용의 맞교환을 설명할 수 있다.",
      "관개 방법과 그 문제를 비교할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "물이 어디로 가나 — 그리고 어떻게 옮기나",
        subtitle: null,
        body:
          "농업이 단연 가장 큰 물 사용자예요(전 세계 ~70%). 그걸(그리고 도시와 전력을) 공급하려 댐을 짓고 강을 전용합니다. 댐은 물 저장·홍수 조절·수력 전력을 주지만 — 서식지를 침수하고, 물고기 이동을 막고, 퇴적물을 가두고, 하류 강을 말릴 수 있어요(콜로라도강은 바다에 거의 닿지 못함).",
        keyIdea:
          "농업이 물 사용 1위. 댐은 물 + 전력을 주지만 물고기를 막고, 퇴적물을 가두고, 하류 생태계를 굶깁니다.",
        table: null,
        terms: [
          {
            term: "댐 / 저수지 (Dam / reservoir)",
            def: "공급·홍수 조절·수력 발전을 위해 물을 저장하는 구조물 — 큰 생태적 비용과 함께.",
          },
          {
            term: "물 전용 (Water diversion)",
            def: "농장과 도시에 공급하려 강/운하를 다른 방향으로 돌리는 것; 수원을 고갈시킬 수 있음.",
          },
        ],
        traps: [],
        example: null,
      },
      {
        title: "관개 방법과 문제",
        subtitle: null,
        body:
          "어떻게 관개하느냐가 중요해요. 담수/고랑 관개는 싸지만 증발과 유출로 엄청난 양을 낭비하고 염류화를 악화시켜요; 살수는 더 낫고; 점적 관개(drip)는 물을 뿌리에 바로 보내 가장 효율적입니다. 과잉 관개는 또 침수와 소금 축적을, 지하수 과잉 양수 시 대수층 고갈을 일으켜요.",
        keyIdea:
          "점적 관개가 가장 물 효율적이고 염류화를 최소화해요 — '모범 사례' 정답입니다.",
        table: {
          headers: ["방법", "효율"],
          rows: [
            ["담수 / 고랑 (Flood / furrow)", "낮음 — 증발/유출로 많이 손실; 염류화 위험"],
            ["살수 (스프링클러) (Spray)", "중간"],
            ["점적 (Drip)", "높음 — 물을 뿌리에 바로 전달"],
          ],
        },
        terms: [],
        traps: [
          "비효율적(담수) 관개가 '염류화'를 일으켜요 — 증발하는 물이 소금을 남겨 시간이 지나며 토양을 망칩니다.",
        ],
        example: null,
      },
    ],
  },
];
