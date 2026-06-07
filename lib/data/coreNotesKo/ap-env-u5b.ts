/**
 * Core Notes 한국어 스토리텔링 버전 — AP Environmental Science Unit 5 (5.4–5.6).
 * 원본 내용 전량 보존(overview·body·keyIdea·table·diagram 포함) + 일타강사 내러티브.
 * 용어는 "한국어 (English)" 병기.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const AP_ENV_U5B_KO: CoreNote[] = [
  {
    lessonId: "ap-environmental-science-u5-l4",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 5,
    lessonNum: 4,
    unitName: "Land and Water Use",
    title: "임업 — 벌목 방법과 그 영향",
    subtitle: "숲을 어떻게 베느냐가 숲이 회복할지 — 아니면 쓸려갈지를 정합니다.",
    overview:
      "숲은 목재·서식지·생태계 서비스를 제공하므로, 어떻게 수확하느냐가 중요해요. 벌목 방법은 전체 개벌부터 선택적 벌채까지 있고, 환경 영향이 매우 다릅니다.",
    objectives: [
      "개벌과 선택적 벌채를 비교할 수 있다.",
      "삼림 벌채의 영향을 설명할 수 있다.",
      "지속가능 임업 관행을 기술할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "벌목 방법",
        subtitle: null,
        body:
          "두 주요 접근법이 양극단에 있어요. 개벌(clear-cutting)은 한 지역의 모든 나무를 제거해요 — 싸고 효율적이지만 토양과 서식지에 파괴적입니다. 선택적 벌채(selective cutting)는 일부 나무만 제거해, 더 높은 비용으로 숲 구조를 보존합니다.",
        keyIdea:
          "개벌은 단기 목재를 최대화하지만 침식·서식지 손실·생태계 서비스 상실을 일으켜요.",
        table: {
          headers: ["방법", "맞교환"],
          rows: [
            ["개벌 (Clear-cutting)", "싸고 효율적이지만 침식·서식지 손실·유출"],
            ["선택적 벌채 (Selective cutting)", "피해 적지만 비싸고 면적당 목재 적음"],
          ],
        },
        terms: [],
        traps: [],
        example: null,
      },
      {
        title: "영향과 지속가능성",
        subtitle: null,
        body:
          "삼림 벌채는 생물다양성을 줄이고, 저장된 탄소를 방출하며(기후 변화 악화), 침식과 홍수를 늘리고, 물 순환을 교란해요. 지속가능 임업은 선택적 벌채·재식림·재성장 속도 이하의 수확을 써서 숲을 재생 자원으로 유지합니다.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "개벌 (Clear-cutting)",
            def: "한 지역의 모든 나무 제거; 높은 영향(침식·서식지 손실).",
          },
          {
            term: "선택적 벌채 (Selective cutting)",
            def: "숲 구조를 보존하려 일부 나무만 수확하는 것.",
          },
          {
            term: "삼림 벌채 (Deforestation)",
            def: "숲의 영구 제거; 탄소를 방출하고 생물다양성을 줄임.",
          },
        ],
        traps: [
          "삼림 벌채는 '기후 변화'를 악화시켜요 — 숲을 베거나 태우면 저장된 탄소를 방출하고 '동시에' 탄소 흡수원을 제거합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-environmental-science-u5-l5",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 5,
    lessonNum: 5,
    unitName: "Land and Water Use",
    title: "광업 — 채굴 방법과 복원",
    subtitle: "땅에서 광물을 꺼내는 건 파괴적이에요 — 문제는 얼마나, 그리고 끝나고 정리하느냐입니다.",
    overview:
      "광업은 현대 생활이 의존하는 광물과 연료를 캐내지만, 땅·물·공기를 교란해요. 방법은 노천 채굴(싸고 매우 파괴적)부터 지하 채굴(비싸고 노동자에게 더 위험)까지 있고, 법은 점점 이후의 복원을 요구합니다.",
    objectives: [
      "노천 채굴과 지하 채굴을 비교할 수 있다.",
      "광업의 환경 영향을 설명할 수 있다.",
      "복원과 산성 광산 배수를 기술할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "노천 vs 지하 채굴",
        subtitle: null,
        body:
          "광석이 표면 가까이 있으면 노천 채굴(스트립 채굴·노천 갱·산정 제거)을 써요 — 효율적이지만 풍경 전체를 긁어냅니다. 광석이 깊으면 지하 채굴을 씁니다: 표면 피해는 적지만 비싸고 노동자에게 위험(붕괴·유독 가스)해요.",
        keyIdea:
          "노천 채굴은 더 싸고 광석을 더 많이 얻지만, 지하 채굴보다 땅에 훨씬 파괴적이에요.",
        table: {
          headers: ["방법", "맞교환"],
          rows: [
            ["노천 (스트립·노천 갱) (Surface)", "싸고 고수율이지만 막대한 서식지/땅 파괴"],
            ["지하 (Subsurface)", "표면 피해 적지만 비싸고 노동자에게 위험"],
          ],
        },
        terms: [],
        traps: [],
        example: null,
      },
      {
        title: "영향과 정리",
        subtitle: null,
        body:
          "광업은 침식·서식지 손실, 그리고 악명 높은 물 문제를 일으켜요: 산성 광산 배수(노출된 황화 광물이 물·공기와 반응해 황산을 만들어 하천을 오염). 광미(폐석)는 유독 금속을 침출할 수 있어요. 많은 법이 이제 복원 — 채굴된 땅 복구 — 을 요구하지만, 완전히 회복되는 경우는 드뭅니다.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "복원 (Reclamation)",
            def: "채굴 후 채굴된 땅을 자연 상태나 사용 가능한 상태로 되돌리는 것.",
          },
          {
            term: "산성 광산 배수 (Acid mine drainage)",
            def: "노출된 광산 광물에서 나오는 황산 유출로 물을 오염시킴.",
          },
          {
            term: "광미 (Tailings)",
            def: "독성을 침출할 수 있는 광업 잔여 폐석.",
          },
        ],
        traps: [
          "산성 광산 배수는 주요 '장기' 수질 오염 문제예요 — 광산이 폐쇄된 후에도 오래 계속됩니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-environmental-science-u5-l6",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 5,
    lessonNum: 6,
    unitName: "Land and Water Use",
    title: "어업과 양식업",
    subtitle: "우리는 야생 물고기를 번식 속도보다 빠르게 잡고 있어요 — 그리고 양식도 나름의 맞교환을 안고 있습니다.",
    overview:
      "물고기는 중요한 단백질원이지만, 야생 어장은 과잉 착취되어 많은 곳이 붕괴했어요. 양식업(fish farming)이 수요를 메우는 데 돕지만 자체적인 오염·질병 문제를 만듭니다. 지속가능한 관리가 목표예요.",
    objectives: [
      "남획과 그 원인(부수어획·파괴적 어구)을 설명할 수 있다.",
      "양식업과 그 맞교환을 기술할 수 있다.",
      "지속가능 어업 관행을 식별할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "야생 자원 남획",
        subtitle: null,
        body:
          "수요와 효율적 기술이 어획을 지속가능 수확량 너머로 밀어, 대서양 대구 같은 어장을 붕괴시켰어요. 파괴적 방법이 더 악화시킵니다: 저층 트롤이 해저를 긁고, 부수어획(원치 않는 종을 잡아 버림)이 거북·돌고래·치어를 죽여요.",
        keyIdea:
          "물고기를 번식 속도보다 빠르게 잡으면 자원이 붕괴해요 — 남획은 지속가능 수확량을 초과하는 것입니다.",
        table: null,
        terms: [
          {
            term: "부수어획 (Bycatch)",
            def: "어업 중 잡혀 보통 버려지는 비표적 종.",
          },
          {
            term: "저층 트롤 (Bottom trawling)",
            def: "해저로 그물을 끄는 것; 서식지를 파괴하고 부수어획을 일으킴.",
          },
        ],
        traps: [],
        example: null,
      },
      {
        title: "양식업: 해법이자 문제",
        subtitle: null,
        body:
          "양식업은 가장 빠르게 성장하는 식품 부문이고 야생 자원 압력을 덜어줘요. 하지만 밀집된 양식장은 폐기물과 질병을 농축하고, 사료로 야생 어획 물고기를 요구하며, 양식 물고기나 기생충이 야생 개체군으로 탈출할 수 있어요. 지속가능 접근법으로는 어획 제한, 어획 금지 해양보호구역, 책임 있는 양식이 있습니다.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "양식업 (Aquaculture)",
            def: "수생 생물을 기르는 것; 야생 어획을 보완하지만 폐기물/질병 문제를 일으킴.",
          },
          {
            term: "해양보호구역 (Marine protected area)",
            def: "자원이 회복될 수 있는 어획 금지 해양 구역.",
          },
        ],
        traps: [
          "양식업은 야생 자원 압력을 덜지만 오염·질병, 그리고 (흔히) 사료용 야생 물고기 수요를 더해요.",
        ],
        example: null,
      },
    ],
  },
];
