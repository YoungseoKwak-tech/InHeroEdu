/**
 * Core Notes 한국어 스토리텔링 버전 — AP Environmental Science Unit 9 (9.1–9.8 전체, 과목 완결).
 * 원본 내용 전량 보존(objectives·terms·traps) + 일타강사 내러티브로 overview·body 보강.
 * 용어는 "한국어 (English)" 병기.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const AP_ENV_U9_KO: CoreNote[] = [
  {
    lessonId: "ap-environmental-science-u9-l1",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 9,
    lessonNum: 1,
    unitName: "Global Change",
    title: "온실 효과와 기후 과학",
    subtitle: "온실가스가 나가는 적외선을 붙잡아요 — 분자 메커니즘이 핵심입니다.",
    overview:
      "온실 효과는 CO₂·CH₄·N₂O·H₂O 같은 온실가스가 지구에서 나가는 장파(적외선) 복사를 흡수해 다시 지표로 재복사하며 행성을 데우는 현상이에요. 각 기체는 상대적 온난화 잠재력이 다릅니다.",
    objectives: [
      "CO₂·CH₄·N₂O·H₂O를 온실가스로 파악하고 상대적 온난화 잠재력을 비교할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "메커니즘: 단파(태양 복사)가 들어오고, 나가는 장파(적외선)를 온실가스가 흡수해 지구 쪽으로 재복사해요. 온실가스 분자의 결합이 적외선 진동수로 진동하기 때문에 나가는 적외선을 흡수합니다. 증거: 빙하 코어, 기온 기록, 해수면 상승, 북극 해빙 감소.",
        keyIdea:
          "단파 들어옴 → 온실가스가 장파(적외선) 흡수 → 지구로 재복사 → 온난화. 온실가스 결합이 적외선 진동수로 진동.",
        table: null,
        terms: [
          {
            term: "메커니즘 (Mechanism)",
            def: "단파 들어옴, 온실가스가 장파 흡수, 지구 쪽으로 재복사.",
          },
          {
            term: "증거 (Evidence)",
            def: "빙하 코어, 기온 기록, 해수면 상승, 북극 해빙.",
          },
        ],
        traps: [
          "기후 변화를 모호하게 설명하기 — AP FRQ는 분자 메커니즘을 요구해요: 온실가스는 결합이 적외선 진동수로 진동하기 때문에 나가는 적외선 복사를 흡수합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-environmental-science-u9-l2",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 9,
    lessonNum: 2,
    unitName: "Global Change",
    title: "기후 되먹임 — 증폭과 완화",
    subtitle: "모든 되먹임이 증폭하는 건 아니에요 — 안정화하는 음의 되먹임도 있습니다.",
    overview:
      "기후 되먹임은 온난화를 키우는 양의 되먹임(증폭)과 줄이는 음의 되먹임(완화)으로 나뉘어요. 양의 되먹임이 임계점을 넘으면 자생적으로 진행됩니다.",
    objectives: [
      "전 지구 변화 단원의 기후 되먹임(증폭·완화)을 숙달할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "양의 되먹임(증폭): 얼음-알베도, 수증기 증폭, 영구동토 메탄. 음의 되먹임(완화): 흑체 복사, 구름 알베도 효과. 임계점(tipping point)은 그 너머에서 되먹임이 자생적으로 진행되는 문턱이에요.",
        keyIdea:
          "양의 되먹임(얼음-알베도·수증기·영구동토 메탄)이 증폭, 음의 되먹임(흑체 복사·구름)이 안정화. 임계점 너머는 자생적.",
        table: null,
        terms: [
          {
            term: "양의 되먹임 (Positive feedback)",
            def: "얼음-알베도, 수증기 증폭, 영구동토 메탄.",
          },
          {
            term: "음의 되먹임 (Negative feedback)",
            def: "흑체 복사, 구름 알베도 효과.",
          },
          {
            term: "임계점 (Tipping points)",
            def: "그 너머에서 되먹임이 자생적으로 진행되는 문턱.",
          },
        ],
        traps: [
          "모든 기후 되먹임을 양(증폭)으로 부르기 — 음의 되먹임도 존재해요; AP는 온도가 오를수록 더 많은 복사가 나가는 것이 안정화(음의) 되먹임임을 시험합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-environmental-science-u9-l3",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 9,
    lessonNum: 3,
    unitName: "Global Change",
    title: "기후 변화 영향 — 생태와 인간",
    subtitle: "영향을 나열만 하지 말고 메커니즘과 연결해야 해요.",
    overview:
      "기후 변화는 생태와 인간 모두에 영향을 줘요: 생물계절 변화(봄이 일찍 와 포식-피식 타이밍 교란), 해수면 상승(열팽창 + 빙해), 산호 백화(열 스트레스로 공생 조류 방출). 핵심은 각 영향을 메커니즘과 연결하는 것입니다.",
    objectives: [
      "전 지구 변화 단원의 기후 변화 영향(생태·인간)을 숙달할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "생물계절 변화(phenological shifts): 봄 사건이 일찍 일어나 포식-피식 타이밍을 교란해요. 해수면 상승: 열팽창 + 빙해로 연안 침수. 산호 백화: 열 스트레스가 주산텔레(공생 조류)를 방출시킵니다.",
        keyIdea:
          "생물계절 변화(타이밍 교란), 해수면 상승(열팽창+빙해), 산호 백화(공생 조류 방출). 영향은 메커니즘과 연결.",
        table: null,
        terms: [
          {
            term: "생물계절 변화 (Phenological shifts)",
            def: "봄 사건이 일찍 일어나 포식-피식 타이밍을 교란.",
          },
          {
            term: "해수면 상승 (Sea level rise)",
            def: "열팽창 + 빙해; 연안 침수.",
          },
          {
            term: "산호 백화 (Coral bleaching)",
            def: "열 스트레스가 주산텔레를 방출시킴.",
          },
        ],
        traps: [
          "영향을 메커니즘 연결 없이 나열하기 — 산호 백화: 따뜻한 물이 주산텔레(공생 조류)에 스트레스를 줘, 산호가 그것을 방출(백화)하고, 먹이원을 잃어 장기화되면 죽을 수 있어요.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-environmental-science-u9-l4",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 9,
    lessonNum: 4,
    unitName: "Global Change",
    title: "해양 산성화",
    subtitle: "대기 CO₂가 바다에 녹아 pH를 낮춰요 — 껍데기를 가진 생물이 위험합니다.",
    overview:
      "해양 산성화는 대기 CO₂가 바닷물에 녹아 탄산을 만들어 pH를 낮추는 현상이에요. 탄산칼슘 껍데기를 가진 해양 생물 — 익족류·굴·산호 — 이 가장 취약합니다. 일반 해양 오염과는 다른, 화학이 핵심입니다.",
    objectives: [
      "pH 하강이 해양 생물의 탄산칼슘 껍데기를 녹이는 것을 설명할 수 있다.",
      "익족류·굴·산호가 가장 취약한 생물임을 파악할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "산성화 화학: CO₂ + H₂O → H₂CO₃ → H⁺ + HCO₃⁻. 늘어난 H⁺가 pH를 낮추고 탄산칼슘 껍데기를 녹여요. 익족류·굴·산호가 가장 취약합니다. 산업화 이후 해양 pH가 8.2에서 8.1로 떨어져 — 30% 더 산성이 됐어요.",
        keyIdea:
          "CO₂ + H₂O → H₂CO₃ → H⁺ + HCO₃⁻. pH 하강(8.2→8.1, 30% 더 산성)이 탄산칼슘 껍데기를 녹임. 익족류·굴·산호 취약.",
        table: null,
        terms: [
          {
            term: "CO₂ + H₂O → H₂CO₃ → H⁺ + HCO₃⁻",
            def: "산성화의 화학.",
          },
        ],
        traps: [
          "해양 산성화를 일반 해양 오염과 혼동하기 — 구체적으로 대기에서 녹은 CO₂가 원인이에요; pH가 8.2에서 8.1로(30% 더 산성) 떨어졌습니다; AP는 화학을 시험합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-environmental-science-u9-l5",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 9,
    lessonNum: 5,
    unitName: "Global Change",
    title: "완화 전략 — 배출 줄이기",
    subtitle: "에너지 부문만이 아니에요 — 농업·토지 이용·폐기물도 온실가스를 냅니다.",
    overview:
      "완화(mitigation)는 온실가스 배출을 줄이는 거예요: 재생 에너지 전환, 운송 전기화, 탄소 포집·저장(CCS), 탄소 상쇄. 핵심: 에너지 부문뿐 아니라 농업·토지 이용·폐기물 부문도 총 온실가스에 기여합니다.",
    objectives: [
      "재생 에너지 전환과 운송 전기화를 설명할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "재생 에너지 전환과 운송 전기화가 핵심 완화책이에요. 탄소 포집·저장(CCS)은 지질학적 격리를 하고, 탄소 상쇄는 재조림·토양 탄소·매립지 메탄 포집을 활용합니다. 농업(메탄, 비료의 N₂O), 토지 이용 변화, 폐기물 부문도 총 온실가스 목록에 크게 기여해요.",
        keyIdea:
          "완화 = 배출 감소(재생 전환·전기화·CCS·탄소 상쇄). 에너지뿐 아니라 농업·토지·폐기물 부문도 포함.",
        table: null,
        terms: [
          {
            term: "탄소 포집·저장 (Carbon capture and storage, CCS)",
            def: "지질학적 격리.",
          },
          {
            term: "탄소 상쇄 (Carbon offsets)",
            def: "재조림, 토양 탄소, 매립지 메탄 포집.",
          },
        ],
        traps: [
          "완화를 에너지 부문 해법으로만 취급하기 — AP는 농업(메탄, 비료의 N₂O), 토지 이용 변화, 폐기물 부문의 총 온실가스 기여를 시험합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-environmental-science-u9-l6",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 9,
    lessonNum: 6,
    unitName: "Global Change",
    title: "적응 전략 — 기후 변화와 함께 살기",
    subtitle: "완화(배출 예방)와 적응(변화에 맞춤)은 달라요.",
    overview:
      "적응(adaptation)은 이미 일어나는 기후 변화에 맞춰 조정하는 거예요: 연안 침수에 방조제·관리된 후퇴·생태 해안선, 농업에 내열 작물과 재배 지대 이동, 그리고 조기 경보 시스템과 재난 대비. 완화(배출 예방)와 구별하는 게 핵심입니다.",
    objectives: [
      "연안 침수에 방조제·관리된 후퇴·생태 해안선을 설명할 수 있다.",
      "내열 작물과 농업 지대 이동을 설명할 수 있다.",
      "조기 경보 시스템과 재난 대비를 설명할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "적응 전략 — 기후 변화와 함께 살기",
        subtitle: null,
        body:
          "적응은 변화에 적응하는 것이에요. 연안 침수에는 방조제, 관리된 후퇴(위험 지역에서 물러남), 생태 해안선(자연 완충재)을 씁니다. 농업에는 내열 작물과 재배 지대 이동을, 그리고 조기 경보 시스템과 재난 대비로 극한 기상에 대비해요.",
        keyIdea:
          "완화 = 배출 예방, 적응 = 변화에 맞춤. 방조제·관리된 후퇴·내열 작물·조기 경보가 적응책.",
        table: null,
        terms: [],
        traps: [
          "완화(배출 예방)와 적응(변화에 조정)을 혼동하기 — AP FRQ는 둘을 구별하고 특정 시나리오에 어느 전략이 맞는지 묻습니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-environmental-science-u9-l7",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 9,
    lessonNum: 7,
    unitName: "Global Change",
    title: "국제 기후 정책 — UNFCCC, 파리 협정",
    subtitle: "파리 협정은 자발적 서약 체계예요 — 강제력 부재가 핵심 약점입니다.",
    overview:
      "국제 기후 정책은 UNFCCC 틀 아래 협력해요. 파리 협정은 각국 자발적 기여(NDCs)와 1.5°C·2°C 목표, 검토 메커니즘을 담고, 탄소 시장과 국제 배출권 거래를 다룹니다. '공동의 그러나 차별화된 책임'이 선진국과 개발도상국을 구분해요.",
    objectives: [
      "탄소 시장과 국제 배출권 거래를 설명할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "파리 협정은 각국 자발적 기여(NDCs), 1.5°C와 2°C 목표, 검토 메커니즘을 담아요. '공동의 그러나 차별화된 책임'은 역사적 배출이 많은 선진국과 개발도상국의 책임을 다르게 봅니다. 탄소 시장이 국제 배출권 거래를 가능하게 해요.",
        keyIdea:
          "파리 협정 = NDCs(자발적), 1.5°C·2°C 목표, 검토 메커니즘. 강제력 없는 자발적 서약이 핵심 약점.",
        table: null,
        terms: [
          {
            term: "파리 협정 (Paris Agreement)",
            def: "NDCs, 1.5°C와 2°C 목표, 검토 메커니즘.",
          },
          {
            term: "공동의 그러나 차별화된 책임 (Common but differentiated responsibilities)",
            def: "선진국 vs 개발도상국.",
          },
        ],
        traps: [
          "파리 협정을 법적 구속력이 있다고 취급하기 — 자발적 서약 체계(NDCs)예요; 강제 메커니즘 부재가 핵심 약점입니다; AP는 구조와 한계를 모두 묻습니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-environmental-science-u9-l8",
    courseId: "ap-environmental-science",
    subjectLabel: "AP Environmental Science",
    emoji: "🌱",
    unit: 9,
    lessonNum: 8,
    unitName: "Global Change",
    title: "오존 회복과 환경 정책의 교훈",
    subtitle: "몬트리올 의정서의 성공 — 그리고 그 대체물이 새 기후 문제가 된 반전.",
    overview:
      "AP 환경과학의 마지막 레슨. 몬트리올 의정서는 CFC를 단계적으로 퇴출해 측정 가능한 오존 회복을 이끈 성공 사례로, 기후 정책 논의의 모델이 돼요. 단, CFC 대체물(HFC)이 새 기후 문제가 된 반전도 배웁니다.",
    objectives: [
      "몬트리올 의정서를 기후 정책 논의의 모델로 활용할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body:
          "몬트리올 의정서는 CFC를 단계적으로 퇴출해 측정 가능한 오존 회복으로 이어졌어요 — 국제 환경 정책의 모범입니다. CFC 대체물은 HCFC → HFC로 이어졌는데, HFC 중 일부는 여전히 강력한 온실가스예요. 오존 회복은 아직 완전하지 않습니다.",
        keyIdea:
          "몬트리올 의정서 = CFC 퇴출 → 오존 회복(정책 성공 모델). 단, 대체물 HFC가 새 온실가스 문제가 됨.",
        table: null,
        terms: [
          {
            term: "몬트리올 의정서 (Montreal Protocol)",
            def: "CFC 단계적 퇴출이 측정 가능한 오존 회복으로 이어짐.",
          },
          {
            term: "CFC 대체물 (Substitutes for CFCs)",
            def: "HCFC → HFC (일부는 여전히 강력한 온실가스).",
          },
        ],
        traps: [
          "오존 회복을 완료된 것으로 취급하기 — 오존 구멍은 여전히 매년 형성되지만 정점보다 작아요; 완전 회복은 2060년대로 예상; AP는 HFC 대체물이 새 기후 문제가 됐음을 시험합니다.",
        ],
        example: null,
      },
    ],
  },
];
