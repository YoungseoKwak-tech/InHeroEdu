/**
 * Core Notes 한국어 스토리텔링 버전 — AP Environmental Science Unit 3 (3.4–3.6).
 * 원본 내용 전량 보존(overview·body·keyIdea·table·diagram 포함) + 일타강사 내러티브.
 * 용어는 "한국어 (English)" 병기.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const AP_ENV_U3B_KO: CoreNote[] = [
  {
    lessonId: "ap-environmental-science-u3-l4",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 3,
    lessonNum: 4,
    unitName: "Populations",
    title: "인간 인구 성장 — 인구 전환",
    subtitle: "나라가 발전하면 출생률과 사망률이 예측 가능한 4단계 순서로 떨어집니다.",
    overview:
      "인구 전환 모델(DTM, demographic transition model)은 나라가 발전하며 출생률과 사망률이 어떻게 변하는지를 4단계(때로 5단계)로 기술해요 — 높은 출생/높은 사망에서, 인구 폭발을 거쳐, 낮은 출생/낮은 사망으로. 발전과 인구 성장을 연결합니다.",
    objectives: [
      "인구 전환 모델의 단계들을 기술할 수 있다.",
      "중간 단계에서 인구가 폭발하는 이유를 설명할 수 있다.",
      "발전을 출생률 감소와 연결할 수 있다.",
    ],
    formulas: [],
    diagram: "dtm",
    sections: [
      {
        title: "네 단계",
        subtitle: null,
        body:
          "DTM은 사회가 산업화하면서 출생률과 사망률을 추적해요. 핵심 통찰: 사망률이 '먼저' 떨어지고(더 나은 의료·식량·위생), 출생률은 높게 유지되어 — 인구 폭발을 일으키다가 — 마침내 출생률도 떨어집니다. 아래 DTM 도식이 그 흐름을 보여줘요.",
        keyIdea:
          "사망률이 출생률보다 '먼저' 떨어져요 — 그 격차(2단계)가 인구 폭발을 일으킵니다.",
        table: {
          headers: ["단계", "출생률 / 사망률", "인구"],
          rows: [
            ["1 산업화 이전", "높은 출생, 높은 사망", "안정, 낮음"],
            ["2 전환기", "높은 출생, 떨어지는 사망", "급성장 (폭발)"],
            ["3 산업기", "떨어지는 출생, 낮은 사망", "성장 둔화"],
            ["4 후기 산업", "낮은 출생, 낮은 사망", "안정 / 감소"],
          ],
        },
        terms: [],
        traps: [],
        example: null,
      },
      {
        title: "출생률이 떨어지는 이유",
        subtitle: null,
        body:
          "나라가 발전하면 출생률이 떨어지는데, 교육(특히 여성의), 가족계획 접근성, 도시화, 그리고 자녀가 경제적 자산(농사 노동)에서 경제적 비용으로 바뀌기 때문이에요. '높은 발전 → 낮은 출산율'은 이 과목에서 가장 믿을 만한 패턴 중 하나입니다.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "인구 전환 모델 (Demographic transition model)",
            def: "발전에 따라 출생률·사망률이 어떻게 변하는지의 4단계 모델.",
          },
          {
            term: "합계 출산율 (Total fertility rate)",
            def: "여성 1인당 평균 자녀 수; ~2.1이 대체 수준.",
          },
        ],
        traps: [
          "인구 폭발은 '시차'에서 와요: 사망률은 빠르게, 출생률은 천천히 떨어짐 — 2단계 성장입니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-environmental-science-u3-l5",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 3,
    lessonNum: 5,
    unitName: "Populations",
    title: "생존 곡선 — 누가 언제 죽는가",
    subtitle: "세 곡선 모양이 생물의 생활 전략을 포착해요 — 적은 자손을 돌보거나, 많은 자손으로 세상을 채우거나.",
    overview:
      "생존 곡선(survivorship curve)은 한 종의 개체가 각 연령에서 얼마나 생존하는지를 그려요. 세 유형(I, II, III)이 종의 번식 전략을 드러냅니다 — 잘 돌본 소수 자손부터, 방치된 다수 자손까지.",
    objectives: [
      "세 가지 생존 곡선 유형을 기술할 수 있다.",
      "각각을 번식 전략과 연결할 수 있다.",
      "각 유형의 예시 생물을 들 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "세 가지 곡선 유형",
        subtitle: null,
        body:
          "각 곡선은 일생에 걸친 생존을 보여줘요. I형 종은 소수 자손에 크게 투자하고(대부분 노년까지 생존), III형은 거의 돌보지 않고 엄청난 수를 낳으며(대부분 어려서 죽음), II형은 모든 연령에서 사망률이 일정합니다.",
        keyIdea:
          "I형 = 적은 자손, 많은 돌봄(K-전략가). III형 = 많은 자손, 돌봄 없음(r-전략가).",
        table: {
          headers: ["유형", "패턴", "예시"],
          rows: [
            ["I형 (Type I)", "대부분 노년까지 생존, 늦게 죽음", "인간, 대형 포유류"],
            ["II형 (Type II)", "모든 연령에서 사망률 일정", "새, 설치류"],
            ["III형 (Type III)", "대부분 어려서 죽음, 소수 생존", "물고기, 곤충, 식물"],
          ],
        },
        terms: [],
        traps: [],
        example: null,
      },
      {
        title: "전략과 연결하기",
        subtitle: null,
        body:
          "생존은 r/K 맞교환을 반영해요. K-전략가(I형)는 소수 자손을 두고 크게 투자하며 환경수용력 근처에서 삽니다. r-전략가(III형)는 많은 자손으로 빠르게 번식하며 소수가 살아남기를 거는데 — 불안정한 환경의 전형이에요.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "생존 곡선 (Survivorship curve)",
            def: "각 연령에서 생존하는 개체 비율의 그래프.",
          },
          {
            term: "r vs K 전략가 (r vs. K strategist)",
            def: "값싼 다수 자손(r, III형) vs 잘 돌본 소수 자손(K, I형).",
          },
        ],
        traps: [
          "III형(대부분 어려서 죽음)은 r-전략가(물고기·곤충)에 속해요 — I형(인간)과 헷갈리지 마세요.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-environmental-science-u3-l6",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 3,
    lessonNum: 6,
    unitName: "Populations",
    title: "자원 소비와 생태 발자국",
    subtitle: "단순히 사람 수가 아니라 — 한 명 한 명이 얼마나 소비하느냐예요.",
    overview:
      "생태 발자국(ecological footprint)은 한 사람이나 개체군이 소비를 지탱하고 폐기물을 흡수하는 데 필요한 땅과 자원을 측정해요. 핵심 통찰: 고소비 소수가 저소비 다수보다 더 큰 환경 영향을 줄 수 있다는 거죠.",
    objectives: [
      "생태 발자국을 정의할 수 있다.",
      "(인구뿐 아니라) 소비가 영향을 이끄는 법을 설명할 수 있다.",
      "선진국과 개발도상국의 발자국을 비교할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "발자국 = 인구 × 소비",
        subtitle: null,
        body:
          "환경 영향은 단순한 머릿수가 아니라 — 한 사람이 얼마나 쓰느냐예요. 생태 발자국은 자연에 대한 총 수요를 포착합니다. 부유한 나라는 인구가 적어도 1인당 발자국이 훨씬 커요(에너지·고기·재화·폐기물 더 많음).",
        keyIdea:
          "부유한 나라의 적은 인구가 가난한 나라의 거대한 인구보다 더 큰 영향을 줄 수 있어요 — 1인당 소비가 수만큼 중요합니다.",
        table: null,
        terms: [
          {
            term: "생태 발자국 (Ecological footprint)",
            def: "한 사람이나 개체군의 소비를 지탱하고 폐기물을 흡수하는 데 필요한 땅/자원.",
          },
          {
            term: "1인당 소비 (Per-capita consumption)",
            def: "1인당 자원 사용량; 선진국에서 훨씬 높음.",
          },
        ],
        traps: [],
        example: null,
      },
      {
        title: "IPAT 개념",
        subtitle: null,
        body:
          "영향은 흔히 I = P × A × T로 요약돼요: 인구(Population) × 풍요(Affluence, 소비) × 기술(Technology). 개발도상국의 풍요 상승과 선진국의 높은 소비 둘 다 전 지구 영향을 키워요 — 그래서 지속가능성이 인구뿐 아니라 소비를 겨냥하는 겁니다.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "IPAT",
            def: "영향 = 인구 × 풍요 × 기술 — 환경 영향의 틀.",
          },
          {
            term: "과소비 (Overconsumption)",
            def: "지속가능한 수준을 넘는 자원 사용; 부유한 나라에 흔함.",
          },
        ],
        traps: [
          "'큰 인구'를 '큰 영향'과 동일시하지 마세요 — 높은 1인당 소비가 단순한 수를 능가할 수 있어요.",
        ],
        example: null,
      },
    ],
  },
];
