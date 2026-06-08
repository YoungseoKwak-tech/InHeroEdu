/**
 * Core Notes 한국어 스토리텔링 버전 — AP Macroeconomics Units 4–6.
 * 원본 내용 전량 보존(overview·body·keyIdea·table·diagram 포함) + 일타강사 내러티브.
 * 용어는 "한국어 (English)" 병기.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const AP_MACROECONOMICS_B_KO: CoreNote[] = [
  {
    lessonId: "ap-macroeconomics-u4-l1",
    courseId: "ap-macroeconomics",
    subjectLabel: "AP Macroeconomics",
    emoji: "📈",
    unit: 4,
    lessonNum: 1,
    unitName: "Financial Sector",
    title: "화폐 — 기능, 공급, 그리고 수요",
    subtitle: "돈이 무엇을 하는지, 누가 그 양을 정하는지, 그리고 이자율이 어떻게 결정되는지 — 금융 단원의 출발점입니다.",
    overview:
      "화폐(money)는 단순한 종잇조각이 아니라 세 가지 일을 하는 도구예요. 그리고 그 '양'은 연준(Fed)이 정하고, 그 양과 사람들의 '수요'가 만나는 지점에서 이자율이 결정됩니다. 화폐 시장 그래프는 일반 수요·공급 그래프와 다르게 생겼어요 — 공급이 수직이거든요. 시험 함정: 화폐 시장을 일반 수요·공급처럼 그리면 안 됩니다. 공급은 가격(이자율)에 반응하지 않는 수직선이에요.",
    objectives: [
      "금융 단원의 화폐 — 기능, 공급, 수요를 완전히 익힌다.",
    ],
    formulas: ["money mult=1/reserve ratio", "buy bonds→MS↑ rates↓"],
    diagram: "supply-demand",
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "화폐의 세 가지 기능 (Money's three functions)",
            def: "교환의 매개수단, 가치의 저장수단, 회계의 단위.",
          },
          {
            term: "화폐 공급 (Money supply)",
            def: "M1 (현금 + 요구불 예금); M2 (M1 + 저축 예금 + 머니마켓).",
          },
          {
            term: "화폐 수요 (Money demand)",
            def: "거래적 수요(GDP가 오르면 증가) + 자산적 수요(이자율이 오르면 감소).",
          },
        ],
        traps: [
          "화폐 시장 그래프를 일반 수요·공급 모델처럼 다루는 것 — 화폐 '공급'은 수직선입니다(연준이 정하며 가격에 민감하지 않음). 화폐 '수요'는 우하향해요(이자율이 높을수록 이자가 안 붙는 현금을 들고 있는 비용이 커지니까). 균형 이자율은 둘이 만나는 곳이고요. AP는 특히 화폐 공급을 오른쪽으로 미는 것(이자율 하락) vs 왼쪽으로 미는 것(이자율 상승)을 통화정책의 작동 메커니즘으로 콕 집어 출제합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-macroeconomics-u4-l2",
    courseId: "ap-macroeconomics",
    subjectLabel: "AP Macroeconomics",
    emoji: "📈",
    unit: 4,
    lessonNum: 2,
    unitName: "Financial Sector",
    title: "은행과 화폐 창조",
    subtitle: "은행이 어떻게 '없던 돈'을 만들어내는가 — 승수 과정의 비밀.",
    overview:
      "은행은 돈을 보관만 하는 곳이 아니에요. 대출을 통해 새로운 예금을 만들고, 그 예금이 또 대출이 되면서 화폐가 불어납니다. 이게 화폐 승수(money multiplier) 과정이에요. 그리고 그 한계를 정하는 게 바로 지급준비율이죠. 시험 함정: 화폐 승수(=1/RRR)와 지출 승수(=1/MPS)를 헷갈리면 안 됩니다 — AP는 한 시험에서 둘 다 물어봐요.",
    objectives: [
      "지급준비율이 화폐 승수 = 1/RRR을 결정한다는 것을 익힌다.",
    ],
    formulas: ["money mult=1/reserve ratio", "buy bonds→MS↑ rates↓"],
    diagram: null,
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "화폐 창조 (Money creation)",
            def: "은행 대출이 예금을 만들고, 그 예금이 또 대출을 만드는 과정(승수 과정).",
          },
          {
            term: "연방기금금리 (Federal funds rate)",
            def: "은행끼리 하룻밤짜리 지급준비금을 빌려줄 때 매기는 금리 — 연준의 핵심 정책 수단.",
          },
        ],
        traps: [
          "화폐 승수와 지출 승수를 헷갈리는 것 — 화폐 승수 = 1/RRR(지급준비율), 지출 승수 = 1/MPS(한계저축성향). AP는 같은 시험에서 둘 다 출제합니다. 화폐 승수는 예금 한 건이 만들어낼 수 있는 최대 신규 화폐를 알려줘요. 다만 실제 증가분은 더 적은데, 은행이 초과 지급준비금을 보유하고 사람들이 은행 밖에서 현금을 들고 있기 때문입니다 — AP는 이 '누출(leakage)'을 출제해요.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-macroeconomics-u4-l3",
    courseId: "ap-macroeconomics",
    subjectLabel: "AP Macroeconomics",
    emoji: "📈",
    unit: 4,
    lessonNum: 3,
    unitName: "Financial Sector",
    title: "연방준비제도와 통화정책",
    subtitle: "연준이 어떻게 경제 전체를 움직이는가 — 끝까지 이어지는 연쇄 고리.",
    overview:
      "연준(Fed)은 화폐 공급을 조절해 경제를 데우거나 식힙니다. 확장적 정책은 금리를 낮춰 투자를 늘리고 AD를 오른쪽으로, 긴축적 정책은 그 반대예요. 핵심은 이 연쇄를 '끝까지' 추적하는 거예요. 시험 함정: 통화정책 연쇄를 '금리 인하'에서 멈추면 안 됩니다 — AP 서술형은 연준의 채권 매입부터 실질 GDP·실업·물가까지 완전한 고리를 요구하고, 각 고리마다 점수가 붙어요.",
    objectives: [
      "금융 단원의 연방준비제도와 통화정책을 완전히 익힌다.",
    ],
    formulas: ["money mult=1/reserve ratio", "buy bonds→MS↑ rates↓"],
    diagram: "ad-as",
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "확장적 정책 (Expansionary policy)",
            def: "연방기금금리 인하 → 투자 증가 → AD가 오른쪽으로 이동.",
          },
          {
            term: "긴축적 정책 (Contractionary policy)",
            def: "연방기금금리 인상 → 투자 감소 → AD가 왼쪽으로 이동.",
          },
          {
            term: "세 가지 수단 (Three tools)",
            def: "공개시장조작(주력), 재할인율, 지급준비율.",
          },
        ],
        traps: [
          "통화정책 연쇄를 '금리 인하'에서 멈추는 것 — AP 서술형은 완전한 연쇄를 요구합니다: 연준이 채권 매입 → 은행 지급준비금 증가 → 연방기금금리 하락 → 투자 증가 → AD가 오른쪽으로 이동 → 실질 GDP 증가, 실업 감소, 물가 상승. 연쇄의 각 고리마다 점수가 있어요. 금리를 거쳐 AD까지 추적하지 않고 '경제에 돈이 더 많아진다'에서 멈추면 부분 점수만 받습니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-macroeconomics-u5-l1",
    courseId: "ap-macroeconomics",
    subjectLabel: "AP Macroeconomics",
    emoji: "📈",
    unit: 5,
    lessonNum: 1,
    unitName: "Long-Run Consequences of Stabilization Policies",
    title: "재정정책 — 정부 지출과 조세",
    subtitle: "정부가 지출과 세금으로 경제를 조정할 때, 무엇이 그 효과를 갉아먹는가.",
    overview:
      "재정정책(fiscal policy)은 정부가 지출(G)과 조세(T)를 통해 총수요를 움직이는 거예요. 지출을 늘리거나 세금을 깎으면 확장적, 반대면 긴축적이죠. 그런데 정부가 적자로 돈을 빌리면 이자율을 끌어올려 민간 투자를 밀어내는 '구축효과'가 생깁니다. 시험 함정: 재정정책 분석에서 구축효과(crowding out)를 빠뜨리면 안 됩니다 — AP 서술형은 이를 재정정책의 한계로 콕 집어 묻습니다.",
    objectives: [
      "장기적 안정화정책 단원의 재정정책 — 정부 지출과 조세를 완전히 익힌다.",
    ],
    formulas: [],
    diagram: "ad-as",
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "확장적 재정정책 (Expansionary fiscal policy)",
            def: "G를 늘리거나 T를 줄임 → AD가 오른쪽으로 이동.",
          },
          {
            term: "긴축적 재정정책 (Contractionary fiscal policy)",
            def: "G를 줄이거나 T를 늘림 → AD가 왼쪽으로 이동.",
          },
          {
            term: "구축효과 (Crowding out)",
            def: "정부 차입이 이자율을 끌어올려 민간 투자를 줄이는 현상.",
          },
        ],
        traps: [
          "재정정책 분석에서 구축효과를 무시하는 것 — 정부가 지출 재원을 마련하려고 돈을 빌리면, 대부자금(loanable funds)을 두고 민간 차입자와 '경쟁'하게 되어 이자율이 오르고 투자가 줄어듭니다. AP 서술형은 구축효과를 재정정책의 한계로 콕 집어 물어봐요. 완전한 답안은 이렇게 추적합니다: 적자 지출 → 대부자금 수요 증가 → 이자율 상승 → 투자 감소 → AD 증가분을 부분적으로 상쇄.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-macroeconomics-u5-l2",
    courseId: "ap-macroeconomics",
    subjectLabel: "AP Macroeconomics",
    emoji: "📈",
    unit: 5,
    lessonNum: 2,
    unitName: "Long-Run Consequences of Stabilization Policies",
    title: "필립스 곡선 — 단기와 장기",
    subtitle: "인플레이션과 실업의 맞교환 — 그것이 영원하지 않은 이유.",
    overview:
      "필립스 곡선(Phillips Curve)은 인플레이션과 실업의 관계를 보여줘요. 단기에는 둘이 반비례하지만, 장기에는 자연실업률에서 수직이 됩니다 — 즉 장기적 맞교환은 없어요. 1970년대 스태그플레이션이 이걸 증명했죠. 시험 함정: 필립스 곡선을 영구적인 '정책 메뉴'처럼 다루면 안 됩니다 — 단기 맞교환은 일시적이고, 노동자가 임금 기대를 조정하면 SRPC가 위로 이동해요.",
    objectives: [
      "장기적 안정화정책 단원의 필립스 곡선 — 단기와 장기를 완전히 익힌다.",
    ],
    formulas: [],
    diagram: "ad-as",
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "단기 필립스 곡선 (Short-run Phillips Curve)",
            def: "인플레이션과 실업 사이의 반비례 관계.",
          },
          {
            term: "장기 필립스 곡선 (Long-run Phillips Curve)",
            def: "자연실업률에서 수직(장기적 맞교환 없음).",
          },
          {
            term: "SRPC를 오른쪽으로 미는 스태그플레이션 (Stagflation shifting SRPC rightward)",
            def: "인플레이션과 실업이 동시에 상승하는 현상.",
          },
        ],
        traps: [
          "필립스 곡선을 영구적인 정책 메뉴처럼 다루는 것 — AP는 단기 맞교환이 '일시적'임을 출제합니다. AD를 늘려 실업을 낮추면 인플레이션이 생기지만, 노동자가 임금 기대를 조정하면서 SRPC가 위로 이동해요. 장기 결과는 '같은' 실업률에서 더 높은 인플레이션입니다. 스태그플레이션(1970년대)이 이를 증명했죠 — 정책 입안자들은 더 높은 인플레이션으로 더 낮은 실업을 영구히 살 수 없다는 걸 배웠습니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-macroeconomics-u6-l1",
    courseId: "ap-macroeconomics",
    subjectLabel: "AP Macroeconomics",
    emoji: "📈",
    unit: 6,
    lessonNum: 1,
    unitName: "Open Economy — International Trade and Finance",
    title: "국제수지와 환율",
    subtitle: "한 나라가 세계와 주고받는 모든 흐름 — 그리고 통화 가치가 무역을 어떻게 바꾸는가.",
    overview:
      "국제수지는 한 나라가 외국과 주고받는 모든 거래를 기록해요. 경상수지는 '실물' 흐름(상품·서비스·소득·이전), 자본·금융수지는 투자 흐름이고, 이 둘은 서로 균형을 이뤄야 합니다. 변동환율은 통화의 수요·공급으로 결정되고요. 시험 함정: 환율 상승(appreciation)과 하락(depreciation)이 무역에 미치는 효과를 헷갈리면 안 됩니다 — 상승은 수출을 비싸게, 수입을 싸게 만들어 무역수지를 악화시켜요.",
    objectives: [
      "개방경제 — 국제무역과 금융 단원의 국제수지와 환율을 완전히 익힌다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "경상수지 (Current account)",
            def: "상품/서비스 무역 + 소득 + 이전('실물' 경제 흐름).",
          },
          {
            term: "자본/금융수지 (Capital/financial account)",
            def: "투자 흐름 — 경상수지와 균형을 이뤄야 함.",
          },
          {
            term: "변동환율 (Flexible exchange rates)",
            def: "통화에 대한 수요와 공급으로 결정됨.",
          },
        ],
        traps: [
          "환율 상승과 하락이 무역에 미치는 효과를 헷갈리는 것 — 통화 '상승(appreciation)'은 수출을 더 비싸게(외국인이 덜 사고) 수입을 더 싸게(국내 소비자가 더 사고) 만들어 → 무역수지를 악화시킵니다. '하락(depreciation)'은 그 반대예요. AP는 이 완전한 연쇄를 추적합니다. 흔한 오류는 '환율이 변한다'에서 멈추고, 상대가격을 통해 그것이 무역수지에 어떻게 영향을 주는지 연결하지 않는 거예요.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-macroeconomics-u6-l2",
    courseId: "ap-macroeconomics",
    subjectLabel: "AP Macroeconomics",
    emoji: "📈",
    unit: 6,
    lessonNum: 2,
    unitName: "Open Economy — International Trade and Finance",
    title: "환율 정책과 국제적 효과",
    subtitle: "국내 통화정책이 환율을 거쳐 어떻게 다시 경제로 되돌아오는가.",
    overview:
      "통화정책은 국경 안에서 끝나지 않아요. 연준이 금리를 올리면 외국 자본이 달러를 사들이러 몰려와 달러가 절상되고, 그러면 순수출이 줄어 AD 확장을 부분적으로 상쇄합니다. 고정환율과 변동환율은 정책 자율성과 안정성 사이에서 맞교환 관계에 있고요. 시험 함정: 통화정책 분석에서 환율 효과를 빠뜨리면 안 됩니다 — AP 서술형은 통화정책을 환율을 거쳐 순수출까지 추적하면 별도의 점수를 줘요. 대부분 학생이 이 점을 놓칩니다.",
    objectives: [
      "국내 금리가 높아지면 외국 자본을 끌어들여 → 통화가 절상된다는 것을 익힌다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "통화정책 전달경로 (Monetary policy transmission)",
            def: "연준이 금리 인상 → 달러 절상 → 순수출 감소 → AD 확장을 부분적으로 상쇄.",
          },
          {
            term: "고정환율 vs 변동환율 (Fixed vs. flexible exchange rates)",
            def: "정책 자율성 vs 안정성 사이의 맞교환.",
          },
        ],
        traps: [
          "통화정책 분석에서 환율 효과를 잊는 것 — 연준이 금리를 올리면 외국 투자자가 투자하려고 달러를 원해서 → 달러가 '절상(appreciate)'되고 → 미국 수출이 더 비싸지고 → 순수출이 '감소'합니다 → 이것이 국내 투자에 대한 긴축 효과를 '부분적으로 상쇄'해요. AP 서술형은 통화정책을 환율을 거쳐 순수출까지 올바르게 추적하면 별도의 점수를 줍니다 — 대부분의 학생이 이 점을 놓쳐요.",
        ],
        example: null,
      },
    ],
  },
];
