/**
 * Core Notes 한국어 스토리텔링 버전 — AP Environmental Science Unit 2 (2.4–2.6).
 * 원본 내용 전량 보존(overview·body·keyIdea·table·diagram 포함) + 일타강사 내러티브.
 * 용어는 "한국어 (English)" 병기.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const AP_ENV_U2B_KO: CoreNote[] = [
  {
    lessonId: "ap-environmental-science-u2-l4",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 2,
    lessonNum: 4,
    unitName: "The Living World: Biodiversity",
    title: "생물다양성 위협 — HIPPO",
    subtitle: "인간이 일으킨 다섯 위협이 생물다양성 손실의 대부분을 차지해요 — HIPPO로 외우세요.",
    overview:
      "생물다양성 손실의 대부분은 인간 활동에서 와요. 두문자어 HIPPO로 요약됩니다: 서식지 파괴(Habitat), 침입종(Invasive), 오염(Pollution), (인간) 인구(Population), 과잉 수확(Overharvesting). 그중 서식지 파괴가 단일 최대 원인이에요.",
    objectives: [
      "생물다양성에 대한 다섯 HIPPO 위협을 나열할 수 있다.",
      "생물다양성 손실의 최대 원인을 식별할 수 있다.",
      "각 위협의 예를 들 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "HIPPO 위협들",
        subtitle: null,
        body:
          "각 글자가 종 감소의 주요 인간 원인이에요. 서식지 파괴가 목록 1위입니다.",
        keyIdea:
          "HIPPO = 서식지(Habitat)·침입종(Invasive)·오염(Pollution)·인구(Population)·과잉 수확(Overharvesting). 서식지 파괴가 1위.",
        table: {
          headers: ["글자", "위협", "예시"],
          rows: [
            ["H", "서식지 파괴 (Habitat destruction)", "삼림 벌채, 도시 확산 (최대 원인)"],
            ["I", "침입종 (Invasive species)", "토착종을 이기는 비토착종"],
            ["P", "오염 (Pollution)", "농약, 플라스틱, 영양분 유출"],
            ["P", "(인간) 인구 (Population)", "수요 증가가 다른 모든 위협을 증폭"],
            ["O", "과잉 수확 (Overharvesting)", "남획, 밀렵"],
          ],
        },
        terms: [],
        traps: [],
        example: null,
      },
      {
        title: "왜 누적되는가",
        subtitle: null,
        body:
          "이 위협들은 상호작용하며 복합돼요: 늘어나는 인간 인구(P)가 더 많은 서식지 파괴(H), 오염(P), 과잉 수확(O)을 일으킵니다. 기후 변화가 이 모두를 점점 증폭시켜요. 그 결과 멸종률이 자연적 배경 수준보다 훨씬 높아집니다.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "HIPPO",
            def: "서식지 파괴·침입종·오염·인구·과잉 수확.",
          },
          {
            term: "배경 멸종률 (Background extinction rate)",
            def: "자연적 멸종률; 오늘날의 속도는 (인간 때문에) 훨씬 높음.",
          },
        ],
        traps: [
          "최대 위협을 물으면 답은 '서식지' 파괴예요 — 침입종이나 과잉 수확이 아닙니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-environmental-science-u2-l5",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 2,
    lessonNum: 5,
    unitName: "The Living World: Biodiversity",
    title: "핵심종과 영양 단계 연쇄",
    subtitle: "어떤 종은 생태계 전체를 지탱해요 — 제거하면 그물 전체가 풀려버립니다.",
    overview:
      "핵심종(keystone species)은 개체수가 시사하는 것보다 훨씬 큰 영향을 생태계에 미쳐요. 제거하면 영양 단계 연쇄(trophic cascade) — 먹이 그물을 위아래로 타고 번지는 연쇄 반응 — 를 통해 군집이 붕괴할 수 있습니다. 포식자가 핵심종인 경우가 많아요.",
    objectives: [
      "핵심종을 정의하고 그 막대한 역할을 설명할 수 있다.",
      "영양 단계 연쇄를 예와 함께 설명할 수 있다.",
      "핵심종을 우점종과 구별할 수 있다.",
    ],
    formulas: [],
    diagram: "energy-pyramid",
    sections: [
      {
        title: "핵심종",
        subtitle: null,
        body:
          "아치의 쐐기돌(keystone)처럼, 핵심종은 수는 적지만 구조를 지탱해요. 해달이 고전적 예입니다: 해달은 성게를 먹는데, 성게는 그냥 두면 켈프 숲을 먹어 치워요. 해달을 제거하면 성게가 폭증하고 켈프가 사라져, 수십 종이 서식지를 잃습니다.",
        keyIdea:
          "핵심종 ≠ 가장 많은 종. 생물량 대비 '영향'이 엄청나다는 게 핵심이에요.",
        table: null,
        terms: [
          {
            term: "핵심종 (Keystone species)",
            def: "생태계에 불균형하게 큰 영향을 미치는 종.",
          },
          {
            term: "우점종 (Dominant species)",
            def: "가장 '많은' 종 — 핵심종(수가 아니라 영향으로 정의)과 다름.",
          },
        ],
        traps: [],
        example: null,
      },
      {
        title: "영양 단계 연쇄",
        subtitle: null,
        body:
          "영양 단계 연쇄(trophic cascade)는 최상위 종이 추가·제거될 때 먹이 그물을 타고 번지는 일련의 효과예요. 옐로스톤의 늑대 재도입이 유명합니다: 늑대가 엘크의 과도한 풀 뜯기를 줄여, 식생(과 그에 의존하는 종)이 회복되고 — 효과가 강까지 연쇄됐어요.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "영양 단계 연쇄 (Trophic cascade)",
            def: "최상위 종을 바꿈으로써 촉발되는 먹이 그물의 연쇄 반응.",
          },
        ],
        traps: [
          "핵심 '포식자'를 제거하면 먹이가 폭증해 다음 단계를 과소비하는 경우가 많아요 — 안정이 아니라 연쇄 붕괴입니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-environmental-science-u2-l6",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 2,
    lessonNum: 6,
    unitName: "The Living World: Biodiversity",
    title: "보전 전략 — 보호구역과 회랑",
    subtitle: "생물다양성을 지키려면 서식지를 대규모로 보호해야 해요 — 크고, 연결되고, 잘 관리되게.",
    overview:
      "서식지 손실이 최대 위협이므로, 보전은 서식지 보호에 집중해요: 보호구역 설정, 회랑으로 연결, 그리고 생태계 전체와 개별 종 모두 관리. 섬 생물지리학이 그 설계를 안내합니다.",
    objectives: [
      "주요 보전 전략을 기술할 수 있다.",
      "회랑과 보호구역 크기가 중요한 이유를 설명할 수 있다.",
      "현지내 보전과 현지외 보전을 구별할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "보호하고, 연결하고, 관리하라",
        subtitle: null,
        body:
          "보전은 여러 규모에서 작동해요. 보호구역(공원·보호지)은 서식지를 제자리에 보존하고, 서식지 회랑(habitat corridor)은 파편화된 조각들을 연결해 동물이 이동·번식·재정착할 수 있게 합니다 — 섬 생물지리학(더 크고 덜 고립될수록 종 많음)을 직접 적용하는 거죠.",
        keyIdea:
          "회랑은 파편화에 맞서요: 보호구역을 연결하면 작은 '섬'들이 다시 하나의 더 크고 생존력 있는 서식지가 됩니다.",
        table: {
          headers: ["전략", "역할"],
          rows: [
            ["보호구역 (Protected areas)", "서식지를 개발에서 떼어 보존"],
            ["서식지 회랑 (Habitat corridors)", "조각을 연결해 종이 이동·번식하게"],
            ["현지내 보전 (In-situ conservation)", "자연 서식지에서 종 보호 (최선)"],
            ["현지외 보전 (Ex-situ conservation)", "현지 밖에서 보호 (동물원·종자은행) 백업"],
          ],
        },
        terms: [],
        traps: [],
        example: null,
      },
      {
        title: "현지내 vs 현지외",
        subtitle: null,
        body:
          "현지내('제자리') 보전 — 자연 서식지에서 종을 보호하는 것 — 은 생태계 전체를 보존하므로 대체로 가장 효과적이에요. 동물원·사육 번식·종자은행 같은 현지외('현지 밖') 방법은 중요한 백업이고, 특히 멸종 직전 종에게 그렇습니다.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "서식지 회랑 (Habitat corridor)",
            def: "분리된 조각들을 연결해 이동과 유전자 흐름을 가능하게 하는 서식지 띠.",
          },
          {
            term: "현지내/현지외 (In-situ / ex-situ)",
            def: "자연 서식지에서의 보전 vs 현지 밖(동물원·종자은행)에서의 보전.",
          },
        ],
        traps: [
          "현지내(서식지 전체) 보호가 보통 선호돼요; 현지외는 백업이지 대체물이 아닙니다.",
        ],
        example: null,
      },
    ],
  },
];
