/**
 * Core Notes 한국어 스토리텔링 버전 — AP Environmental Science Unit 2 (2.7–2.8, Unit 2 완결).
 * 원본 내용 전량 보존(overview·body·keyIdea·table·diagram 포함) + 일타강사 내러티브.
 * 용어는 "한국어 (English)" 병기.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const AP_ENV_U2C_KO: CoreNote[] = [
  {
    lessonId: "ap-environmental-science-u2-l7",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 2,
    lessonNum: 7,
    unitName: "The Living World: Biodiversity",
    title: "침입종 — 메커니즘과 사례 연구",
    subtitle: "천적이 없는 새 장소로 종을 옮기면, 그게 점령해버릴 수 있어요 — 토착 생명을 황폐화시키면서.",
    overview:
      "침입종(invasive species)은 새 생태계로 퍼져 해를 끼치는 비토착 생물이에요. 고향에서 그것을 견제하던 포식자·경쟁자·질병에서 풀려나, 토착종을 이기고 생태계 전체를 교란할 수 있죠 — 생물다양성 손실의 주요 원인입니다.",
    objectives: [
      "침입종을 정의하고 왜 성공하는지 설명할 수 있다.",
      "침입종의 생태적·경제적 피해를 설명할 수 있다.",
      "도입 경로와 방제 방법을 식별할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "침입종이 이기는 이유",
        subtitle: null,
        body:
          "침입종이 번성하는 건 새 생태계에 흔히 천적이나 질병이 없고, 빠르게 번식하며, 자원을 두고 토착종을 이기기 때문이에요. 인간이 퍼뜨립니다 — 의도적으로(관상식물)이거나 우연히(선박 평형수, 화물). 예: 얼룩무늬담치, 칡, 사탕수수두꺼비.",
        keyIdea:
          "침입종 성공의 비밀: 천적을 고향에 두고 와서, 개체수를 견제하는 게 아무것도 없다는 거예요.",
        table: null,
        terms: [
          {
            term: "침입종 (Invasive species)",
            def: "새 생태계로 퍼져 해를 끼치는 비토착종.",
          },
          {
            term: "토착종 (Native species)",
            def: "한 지역에 자연적으로 존재하는 종으로, 함께 진화한 견제 장치가 있음.",
          },
        ],
        traps: [],
        example: null,
      },
      {
        title: "피해와 방제",
        subtitle: null,
        body:
          "침입종은 막대한 생태적 피해(토착종을 이기거나 잡아먹어 때로 멸종을 일으킴)와 경제적 비용(배관 막힘, 작물 망침)을 냅니다. 일단 정착하면 방제가 어려워요: 물리적 제거, 화학적 처리, 생물학적 방제(천적 도입 — 그 자체가 위험) 등이 있습니다.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "선박 평형수 (Ballast water)",
            def: "배가 싣고 다니는 물로, 침입성 수생 종을 흔히 운반함.",
          },
          {
            term: "생물학적 방제 (Biological control)",
            def: "천적·질병으로 해충을 방제하는 것 — 그것마저 침입종이 되면 위험.",
          },
        ],
        traps: [
          "모든 비토착종이 '침입종'은 아니에요 — 이 용어는 퍼지면서 '해를 끼친다'는 조건이 필요합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-environmental-science-u2-l8",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 2,
    lessonNum: 8,
    unitName: "The Living World: Biodiversity",
    title: "멸종위기종과 국제 협약",
    subtitle: "벼랑 끝 종을 구하려면 국내 법과 국경을 넘는 조약이 둘 다 필요해요.",
    overview:
      "종이 멸종에 다가가면, 보호에 법적 조치가 필요해요 — 멸종위기종법 같은 국내 법과 CITES 같은 국제 협약. 야생동물과 무역이 국경을 넘나들기에, 어떤 한 나라도 혼자서는 할 수 없습니다.",
    objectives: [
      "위협종과 멸종위기종을 구별할 수 있다.",
      "주요 보전 법과 조약을 기술할 수 있다.",
      "국제 협력이 왜 필요한지 설명할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "법과 조약",
        subtitle: null,
        body:
          "보호는 두 단계에서 일어나요. 국내 법(예: 미국 멸종위기종법)은 등재된 종이나 그 서식지를 해치는 것을 불법으로 만듭니다. 국제 조약은 국경을 넘어 조율해요 — CITES는 멸종위기종 거래를 규제하고, 다른 협약들은 서식지와 이동성 종을 보호합니다.",
        keyIdea:
          "CITES는 멸종위기종 '거래'(상아·이국적 반려동물)를 겨냥해요 — 조약이 필요한 국경 넘는 문제죠.",
        table: {
          headers: ["수단", "역할"],
          rows: [
            ["멸종위기종법 (미국) (Endangered Species Act)", "종과 서식지를 등재해 법적으로 보호"],
            ["CITES", "멸종위기종의 국제 거래 규제"],
            ["IUCN 적색목록 (IUCN Red List)", "전 세계 멸종 위험을 평가·순위화"],
          ],
        },
        terms: [],
        traps: [],
        example: null,
      },
      {
        title: "협력이 중요한 이유",
        subtitle: null,
        body:
          "동물은 이동하고 야생동물 거래는 전 지구적이라, 이웃 나라가 협력하지 않으면 한 나라의 보호는 실패해요. 국제 협약은 또한 생물다양성이 풍부하지만 소득이 낮은 나라 — 지구 생물다양성의 상당 부분이 사는 곳 — 의 보전에 자금을 대는 데도 도움이 됩니다.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "멸종위기 vs 위협 (Endangered vs. threatened)",
            def: "멸종위기 = 지금 멸종 위험; 위협 = 곧 멸종위기가 될 가능성.",
          },
          {
            term: "CITES",
            def: "멸종위기종의 국제 거래를 규제하는 조약.",
          },
        ],
        traps: [
          "멸종위기(임박한 멸종 위험)는 위협(멸종위기가 될 가능성)보다 더 심각해요 — 둘을 바꾸지 마세요.",
        ],
        example: null,
      },
    ],
  },
];
