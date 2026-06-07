/**
 * Core Notes 한국어 스토리텔링 버전 — AP Environmental Science Unit 3 (3.7–3.8, Unit 3 완결).
 * 원본 내용 전량 보존(overview·body·keyIdea·table·diagram 포함) + 일타강사 내러티브.
 * 용어는 "한국어 (English)" 병기.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const AP_ENV_U3C_KO: CoreNote[] = [
  {
    lessonId: "ap-environmental-science-u3-l7",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 3,
    lessonNum: 7,
    unitName: "Populations",
    title: "지속가능 수확량과 어업 관리",
    subtitle: "자연이 채우는 속도로 수확하면 영원히 거둘 수 있어요; 더 가져가면 자원을 붕괴시킵니다.",
    overview:
      "지속가능 수확량(sustainable yield)은 재생 자원을 고갈시키지 않고 거둘 수 있는 양이에요 — 수확을 자연 재성장에 맞추는 거죠. 어업이 고전적 사례입니다: 지속가능 수확량을 넘는 남획은 개체군 붕괴를 일으켜요.",
    objectives: [
      "지속가능 수확량과 최대 지속가능 수확량을 정의할 수 있다.",
      "과잉 수확이 자원을 붕괴시키는 법을 설명할 수 있다.",
      "어업 관리 전략을 기술할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "수확 vs 재성장",
        subtitle: null,
        body:
          "재생 자원은 다시 자라지만, 일정 속도로만요. 지속가능 수확량은 그 재성장에 맞춘 수확 속도라 자원이 안정하게 유지돼요. 최대 지속가능 수확량(MSY)은 무한정 거둘 수 있는 최대 어획량인데 — 보통 개체군이 환경수용력의 절반쯤일 때(성장이 가장 빠를 때)입니다.",
        keyIdea:
          "재성장 속도 이하로 거두면 자원은 영원히 가요; 더 가져가면 '이자'가 아니라 '원금'을 쓰는 셈이에요.",
        table: null,
        terms: [
          {
            term: "지속가능 수확량 (Sustainable yield)",
            def: "자연 재성장에 맞춘 수확 속도로, 자원을 안정하게 유지함.",
          },
          {
            term: "최대 지속가능 수확량 (Maximum sustainable yield)",
            def: "장기적으로 지속가능한 최대 어획량(~환경수용력의 절반).",
          },
        ],
        traps: [],
        example: null,
      },
      {
        title: "어업 관리하기",
        subtitle: null,
        body:
          "남획 — 지속가능 수확량보다 많이 가져가는 것 — 은 주요 어장을 붕괴시켰어요(예: 대서양 대구). 관리 도구로는 어획 할당량, 크기/어구 제한, 어획 금지 해양보호구역, 계절 폐쇄(자원 회복용)가 있습니다. 부수어획(의도치 않은 어획)이 주요 부작용 문제예요.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "남획 (Overfishing)",
            def: "물고기가 번식할 수 있는 것보다 빠르게 잡아 자원을 붕괴시키는 것.",
          },
          {
            term: "부수어획 (Bycatch)",
            def: "어업 중 의도치 않게 잡히는 비표적 종.",
          },
        ],
        traps: [
          "MSY는 환경수용력의 '절반' 근처에서 가장 높아요(성장 최대) — 최대 개체군일 때가 아닙니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-environmental-science-u3-l8",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 3,
    lessonNum: 8,
    unitName: "Populations",
    title: "인구 정책과 윤리",
    subtitle: "정부가 인구를 어떻게 — 또 과연 — 형성해야 하는지는 어려운 윤리적 질문을 던집니다.",
    overview:
      "급성장(또는 감소)에 직면해, 정부는 인구 정책을 채택해요 — 어떤 건 출생을 줄이려, 어떤 건 늘리려. 자발적(교육·가족계획)부터 강압적(중국의 옛 한 자녀 정책)까지 범위가 넓고, 각각이 윤리적 논쟁을 일으킵니다.",
    objectives: [
      "반출생주의 정책과 친출생주의 정책을 구별할 수 있다.",
      "예시를 들고 그 효과를 평가할 수 있다.",
      "인구 통제의 윤리적 우려를 식별할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "정책의 두 방향",
        subtitle: null,
        body:
          "정책은 양방향으로 밀어요. 반출생주의 정책은 출생률을 낮추려 하고(중국의 한 자녀 정책, 가족계획 프로그램), 친출생주의 정책은 인구가 줄고 고령화하는 곳에서 출생을 장려합니다(일본·프랑스 같은 나라의 유인책).",
        keyIdea:
          "성장을 늦추는 가장 효과적이고 '동시에' 윤리적인 방법은 여성을 교육하고 역량을 강화하는 거예요 — 출산율을 자발적으로 낮춥니다.",
        table: {
          headers: ["정책 유형", "목표", "예시"],
          rows: [
            ["반출생주의 (Anti-natalist)", "출생 감소", "중국의 옛 한 자녀 정책"],
            ["친출생주의 (Pro-natalist)", "출생 증가", "저출산 국가의 출산 장려금"],
            ["역량 강화 (가장 효과적)", "자발적 출생 감소", "여성 교육·고용"],
          ],
        },
        terms: [],
        traps: [],
        example: null,
      },
      {
        title: "효과와 윤리",
        subtitle: null,
        body:
          "중국의 한 자녀 정책은 성장을 늦췄지만 성비 왜곡과 고령화를 일으켰어요. 강압적 정책은 인권과 신체 자율성에 대한 심각한 윤리적 우려를 낳습니다. 대부분의 전문가는 자발적 접근 — 교육·의료·가족계획 — 을 선호하는데, 권리를 존중하면서 출산율을 낮추기 때문이에요.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "반출생주의 / 친출생주의 (Anti-natalist / pro-natalist)",
            def: "출산을 억제 vs 장려하는 정책.",
          },
          {
            term: "가족계획 (Family planning)",
            def: "피임과 생식 교육에 대한 자발적 접근; 윤리적으로 출산율을 낮춤.",
          },
        ],
        traps: [
          "중국의 한 자녀 정책은 의도치 않은 효과를 냈어요: 남:녀 성비 왜곡과 급속한 고령화입니다.",
        ],
        example: null,
      },
    ],
  },
];
