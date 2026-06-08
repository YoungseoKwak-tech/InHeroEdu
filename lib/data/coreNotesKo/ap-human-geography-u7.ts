/**
 * Core Notes 한국어 스토리텔링 버전 — AP Human Geography Unit 7 (7.1–7.5).
 * 원본 내용 전량 보존(objectives·traps·diagram 포함) + 일타강사 내러티브.
 * 원본 body/overview가 null인 경우 objectives 기반 한국어 overview·body 작성.
 * 용어는 "한국어 (English)" 병기.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const AP_HUMAN_GEOGRAPHY_U7_KO: CoreNote[] = [
  {
    lessonId: "ap-human-geography-u7-l1",
    courseId: "ap-human-geography",
    subjectLabel: "AP Human Geography",
    emoji: "🗺️",
    unit: 7,
    lessonNum: 1,
    unitName: "Industrial and Economic Development",
    title: "경제 발전 모델 — 사다리를 오를 것인가, 착취를 폭로할 것인가",
    subtitle:
      "발전을 보는 두 개의 렌즈: 로스토우는 '누구나 오를 수 있는 사다리'라 말하고, 월러스타인은 '핵심부가 주변부를 착취한다'고 반박합니다.",
    overview:
      "경제 발전을 설명하는 모델은 크게 두 갈래예요. 로스토우(Rostow)의 성장 단계 모델은 낙관적입니다 — 모든 나라가 전통 사회에서 시작해 단계를 밟아 대량 소비 사회로 올라간다는 '사다리'죠. 반면 월러스타인(Wallerstein)의 세계 체제론은 비판적이에요 — 부유한 핵심부(core)가 가난한 주변부(periphery)를 착취하는 구조 자체가 불평등을 만든다고 봅니다. FRQ는 이 두 모델을 '비판하라'고 묻는 경우가 많으니, 각 모델의 가정과 약점을 동시에 쥐고 있어야 해요.",
    objectives: [
      "로스토우의 성장 단계(Rostow's stages of growth)",
      "월러스타인의 세계 체제론(Wallerstein's world-systems theory)",
      "핵심부-주변부 모델(Core-periphery model)",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "경제 발전 모델",
        subtitle: null,
        body:
          "로스토우의 성장 단계 모델은 발전을 5단계 사다리로 그립니다: 전통 사회 → 도약을 위한 선행 조건 → 도약(take-off) → 성숙으로의 전진 → 고도 대량 소비. 이 모델은 모든 나라가 같은 길을 걸을 수 있다고 가정해요 — 자본을 투자하고 산업화하면 누구나 위로 올라간다는 거죠. 하지만 월러스타인의 세계 체제론은 이 낙관을 정면으로 반박합니다. 세계는 하나의 자본주의 경제로 묶여 있고, 핵심부(부유한 산업 국가)가 값싼 원자재와 노동을 주변부(가난한 국가)에서 빨아들이며, 그 사이에 반주변부(semi-periphery)가 완충 지대로 끼어 있다는 거예요. 즉 주변부의 가난은 '아직 발전하지 못해서'가 아니라 '핵심부가 착취하기 때문에' 구조적으로 유지된다는 시각입니다. 핵심부-주변부 모델은 이 공간적 불평등을 지도 위에 보여주는 틀이에요.",
        keyIdea: null,
        table: null,
        terms: [],
        traps: [
          "로스토우(낙관적 사다리): 전통 사회 → 도약 → 성숙으로의 전진; 월러스타인(비판적): 핵심부가 주변부를 착취 — FRQ는 두 모델을 모두 비판하라고 요구합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-human-geography-u7-l2",
    courseId: "ap-human-geography",
    subjectLabel: "AP Human Geography",
    emoji: "🗺️",
    unit: 7,
    lessonNum: 2,
    unitName: "Industrial and Economic Development",
    title: "발전 지표 — 한 나라의 '잘 사는 정도'를 어떻게 잴까",
    subtitle:
      "돈만으로는 발전을 다 잴 수 없어요 — 소득·교육·수명을 함께 묶어야 진짜 그림이 보입니다.",
    overview:
      "발전 지표(development indicators)는 한 나라가 얼마나 발전했는지 숫자로 잡아내는 도구예요. 1인당 국민총소득(GNI per capita)은 평균 소득을, 인간개발지수(HDI)는 소득·교육·수명을 묶은 종합 척도를, 성불평등지수(GII)는 남녀 격차를 보여줍니다. 핵심은 GDP와 GNI의 차이, 그리고 단일 지표 하나만으로는 발전을 제대로 잴 수 없다는 한계예요. HDI 순위가 GDP 순위보다 높으면 사회 정책이 잘 된 나라(쿠바), 낮으면 부는 있지만 사회 투자가 부족한 나라(걸프 산유국)라는 점이 시험 단골입니다.",
    objectives: [
      "1인당 GNI, HDI, GII(GNI per capita, HDI, GII)",
      "GDP 대 GNI 구분(GDP vs. GNI distinction)",
      "단일 지표의 한계(Limitations of single indicators)",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "발전 지표",
        subtitle: null,
        body:
          "1인당 국민총소득(GNI per capita)은 한 나라의 총소득을 인구로 나눈 값으로, 평균적인 부의 수준을 보여줍니다. 여기서 GDP와 GNI를 구분해야 해요 — GDP(국내총생산)는 '국경 안에서' 생산된 가치이고, GNI(국민총소득)는 '그 나라 국민이' 벌어들인 소득(해외에서 번 것 포함, 외국인이 국내에서 번 것 제외)입니다. 하지만 평균 소득만으로는 분배·삶의 질을 알 수 없죠. 그래서 인간개발지수(HDI)가 소득에 더해 교육 수준과 기대 수명을 함께 묶어 0~1 사이 점수로 나타냅니다. 성불평등지수(GII)는 생식 건강·여성의 정치 참여·노동 시장 참여 격차를 잡아내요. 어떤 단일 지표도 발전을 완벽히 담지 못한다는 게 핵심입니다 — 예를 들어 평균 소득이 높아도 그 부가 소수에게 쏠려 있거나, 여성·소수자가 배제돼 있을 수 있으니까요. 그래서 여러 지표를 함께 읽어야 진짜 발전 수준이 드러납니다.",
        keyIdea: null,
        table: null,
        terms: [],
        traps: [
          "HDI는 소득·교육·기대 수명을 결합합니다 — GDP 순위보다 높으면 사회 정책이 좋다는 뜻(쿠바), 낮으면 사회 투자 없이 부만 있다는 뜻(걸프 산유국)입니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-human-geography-u7-l3",
    courseId: "ap-human-geography",
    subjectLabel: "AP Human Geography",
    emoji: "🗺️",
    unit: 7,
    lessonNum: 3,
    unitName: "Industrial and Economic Development",
    title: "공업 입지 이론 — 공장은 왜 거기에 세워질까",
    subtitle:
      "베버의 답은 단순합니다: 총비용이 가장 낮은 곳. 운송비가 모든 것을 결정해요.",
    overview:
      "공업 입지 이론(industrial location theory)은 '공장을 어디에 세울 것인가'를 설명합니다. 핵심은 베버(Weber)의 최소 비용 이론이에요 — 기업은 원료·노동·운송 비용을 모두 합쳐 가장 싼 지점에 입지한다는 거죠. 여기서 운송비가 결정적이라, 무게가 늘어나는 산업(bulk-gaining)은 시장 근처에, 무게가 줄어드는 산업(bulk-reducing)은 원료 근처에 자리 잡습니다. 비슷한 기업이 모이면 집적(agglomeration)의 이익이 생기고, 너무 몰리면 비용이 올라 분산(deglomeration)이 일어나요. 입지 제약이 거의 없는 산업은 무입지(footloose) 산업이라 부릅니다.",
    objectives: [
      "베버의 최소 비용 이론(Weber's least-cost theory)",
      "집적과 분산(Agglomeration and deglomeration)",
      "무입지 산업(Footloose industries)",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "공업 입지 이론",
        subtitle: null,
        body:
          "베버의 최소 비용 이론(least-cost theory)은 기업이 운송비·노동비·집적 이익이라는 세 요인을 따져 총비용이 최소인 곳에 입지한다고 봅니다. 그중에서도 운송비가 가장 결정적이에요. 그래서 산업을 둘로 나눠 봐야 합니다 — 무게 증가 산업(bulk-gaining, 예: 음료·자동차 조립)은 완제품이 원료보다 무거워서 운송비를 아끼려고 시장 근처에 입지하고, 무게 감소 산업(bulk-reducing, 예: 제철·목재)은 원료가 완제품보다 무거워서 원료 산지 근처에 입지합니다. 한편 비슷한 기업들이 한곳에 모이면 노동력·공급망·인프라를 공유하는 집적(agglomeration)의 이익이 생겨요. 하지만 너무 많이 몰리면 땅값·임금·교통 혼잡 비용이 치솟아, 기업들이 흩어지는 분산(deglomeration)이 나타납니다. 마지막으로 무입지 산업(footloose industry)은 운송비에 거의 영향받지 않는 산업(예: 소프트웨어·다이아몬드 같은 고부가가치·저중량 제품)으로, 어디에든 자리 잡을 수 있어요.",
        keyIdea: null,
        table: null,
        terms: [],
        traps: [
          "베버: 투입물 + 산출물의 운송비가 최소인 곳에 입지; 무게 증가(bulk-gaining) 산업은 시장 근처에, 무게 감소(bulk-reducing) 산업은 원료 근처에 입지합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-human-geography-u7-l4",
    courseId: "ap-human-geography",
    subjectLabel: "AP Human Geography",
    emoji: "🗺️",
    unit: 7,
    lessonNum: 4,
    unitName: "Industrial and Economic Development",
    title: "세계화와 무역 — 생산은 어떻게 전 지구로 흩어졌나",
    subtitle:
      "오늘날 청바지 한 벌은 여러 나라를 거쳐 만들어집니다 — 노동의 새로운 국제 분업이 그 비결이에요.",
    overview:
      "세계화(globalization)는 생산을 국경 너머로 흩어 놓았습니다. 새로운 국제 분업(new international division of labor)에 따라 핵심부는 설계·관리를, 주변부는 값싼 노동의 조립을 맡게 됐어요. 한 제품이 원료에서 소비자까지 거치는 모든 단계를 잇는 것이 상품 사슬(commodity chain)이고, 이를 끌어들이려고 각국은 세금·규제를 완화한 경제특구(special economic zones)를 만듭니다. 멕시코-미국 국경의 마킬라도라(maquiladora)가 경제특구의 대표 사례라는 점을 꼭 기억하세요.",
    objectives: [
      "노동의 새로운 국제 분업(New international division of labor)",
      "상품 사슬(Commodity chains)",
      "경제특구(Special economic zones)",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "세계화와 무역",
        subtitle: null,
        body:
          "예전에는 한 나라 안에서 제품을 다 만들었지만, 세계화 시대에는 생산이 전 지구로 쪼개졌습니다. 이를 노동의 새로운 국제 분업(new international division of labor)이라 불러요 — 핵심부 국가는 연구·디자인·마케팅 같은 고부가가치 일을 맡고, 주변부 국가는 값싼 노동력으로 부품을 조립하는 식이죠. 이렇게 원료 채취 → 가공 → 조립 → 유통 → 소비로 이어지는 생산의 전 과정을 추적하는 틀이 상품 사슬(commodity chain)입니다. 이 사슬을 따라가면 누가 어디서 얼마의 가치를 가져가는지가 드러나요. 한편 개발도상국은 외국 자본과 공장을 끌어들이기 위해 경제특구(special economic zone, SEZ)를 지정합니다 — 관세·세금을 면제하고 규제를 풀어 주는 수출 지향 지역이죠. 대표적 예가 멕시코-미국 국경의 마킬라도라(maquiladora) 공장으로, 값싼 노동과 느슨한 규제를 무기로 미국 시장용 제품을 조립합니다.",
        keyIdea: null,
        table: null,
        terms: [],
        traps: [
          "마킬라도라(멕시코-미국 국경)는 경제특구(SEZ)의 정석 사례입니다 — 값싼 노동, 느슨한 규제, 수출 지향; 상품 사슬은 원료에서 소비자까지의 생산 과정을 추적합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-human-geography-u7-l5",
    courseId: "ap-human-geography",
    subjectLabel: "AP Human Geography",
    emoji: "🗺️",
    unit: 7,
    lessonNum: 5,
    unitName: "Industrial and Economic Development",
    title: "지속가능한 발전 — 미래 세대의 몫을 빼앗지 않는 성장",
    subtitle:
      "성장과 환경은 충돌할 필요가 없어요 — 브룬틀란 정의가 그 균형점을 한 문장으로 못 박습니다.",
    overview:
      "지속가능한 발전(sustainable development)은 '미래 세대가 자신의 필요를 충족할 능력을 해치지 않으면서 현재의 필요를 충족하는 발전'입니다 — 이게 그 유명한 브룬틀란(Brundtland) 정의예요. 이를 실현하는 수단으로 대체 에너지와 녹색 기술(green technology)이 환경 부담을 줄이고, 소액금융(microfinance)과 NGO가 가난한 사람들에게 직접 자본과 자원을 전달합니다. FRQ는 브룬틀란 정의를 묻는 걸 정말 좋아하니, 이 한 문장은 토씨까지 외워 두세요.",
    objectives: [
      "브룬틀란 정의(Brundtland definition)",
      "대체 에너지와 녹색 기술(Alternative energy and green technology)",
      "소액금융과 NGO(Microfinance and NGOs)",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "지속가능한 발전",
        subtitle: null,
        body:
          "지속가능한 발전의 핵심은 1987년 브룬틀란 보고서의 정의입니다: '미래 세대가 자신의 필요를 충족할 능력을 손상시키지 않으면서 현재의 필요를 충족하는 발전.' 즉 지금의 성장이 자원을 다 써버리거나 환경을 망가뜨려 후손에게 빚을 떠넘겨서는 안 된다는 뜻이에요. 이를 위한 첫 번째 축이 대체 에너지와 녹색 기술(green technology)입니다 — 화석 연료 대신 태양광·풍력·지열 같은 재생 에너지를 쓰고, 오염을 줄이는 기술을 도입해 환경 부담을 낮추는 거죠. 두 번째 축은 사람에게 직접 닿는 개발 방식이에요. 소액금융(microfinance)은 은행 문턱을 넘지 못하는 가난한 사람들, 특히 여성에게 소액 대출을 제공해 스스로 사업을 일으키게 돕고, 비정부기구(NGO)는 정부나 대기업을 거치지 않고 풀뿌리 차원에서 보건·교육·환경 사업을 펼칩니다. 이런 '아래로부터의' 접근은 톱다운식 대규모 개발보다 지역 실정에 맞고 지속가능하다는 평가를 받아요.",
        keyIdea: null,
        table: null,
        terms: [],
        traps: [
          "브룬틀란: '미래 세대가 자신의 필요를 충족할 능력을 해치지 않으면서 현재의 필요를 충족하는 것' — 이 정의를 그대로 인용하세요; FRQ가 이를 묻는 걸 좋아합니다.",
        ],
        example: null,
      },
    ],
  },
];
