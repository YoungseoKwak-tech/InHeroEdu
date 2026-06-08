/**
 * Core Notes 한국어 스토리텔링 버전 — AP Microeconomics Units 1–3.
 * 원본 내용 전량 보존(overview·body·keyIdea·table·diagram·formulas 포함) + 일타강사 내러티브.
 * 용어는 "한국어 (English)" 병기.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const AP_MICROECONOMICS_A_KO: CoreNote[] = [
  {
    lessonId: "ap-microeconomics-u1-l1",
    courseId: "ap-microeconomics",
    subjectLabel: "AP Microeconomics",
    emoji: "📉",
    unit: 1,
    lessonNum: 1,
    unitName: "Basic Economic Concepts",
    title: "희소성, 기회비용, 한계 분석 — 경제학의 출발점",
    subtitle: "모든 선택은 '한 단위 더'를 묻는 데서 시작합니다 — 총량이 아니라 가장자리(margin)를 보세요.",
    overview:
      "경제학은 결국 '희소성(scarcity) 속에서 어떻게 선택하느냐'의 학문이에요. 자원은 한정돼 있으니, 무언가를 얻으려면 다른 무언가를 포기해야 하죠 — 그게 기회비용(opportunity cost)입니다. 그리고 그 선택을 어떻게 하느냐, 핵심은 '한계(margin)'예요. AP 미시는 거의 모든 문제에서 '한 단위 더'의 사고를 묻습니다. 시험 함정: 총비용·총편익으로 답하면 틀려요 — 항상 한계로 비교하세요.",
    objectives: [
      "Basic Economic Concepts 단원을 위해 희소성, 기회비용, 한계 분석을 완전히 익힌다.",
    ],
    formulas: [],
    diagram: "ppc",
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "한계 분석 (Marginal analysis)",
            def: "총량이 아니라 가장자리에서 내리는 의사결정 — '한 단위 더' 사고방식.",
          },
          {
            term: "매몰비용 (Sunk costs)",
            def: "이미 지출된 비용으로, 앞으로의 결정에 영향을 주어서는 안 됩니다.",
          },
          {
            term: "합리적 선택 (Rational choice)",
            def: "한계편익(MB)이 한계비용(MC) 이상일 때 그 행동을 선택한다.",
          },
        ],
        traps: [
          "최적화 문제에서 한계(marginal)가 아니라 총(total) 비용·편익을 쓰는 실수 — AP 미시는 거의 모든 맥락에서 '한계' 사고를 시험합니다. 최적 생산량은 총이윤이 최대인 지점이 아니라 MC = MR인 지점이고, 최적 소비는 MB = MC인 지점이에요. 시나리오에 매몰비용이 등장하면 그건 의도적인 함정입니다 — 언제나 '앞으로 무엇이 달라지는가?'를 묻고, 이미 써버린 돈은 무시하세요.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-microeconomics-u1-l2",
    courseId: "ap-microeconomics",
    subjectLabel: "AP Microeconomics",
    emoji: "📉",
    unit: 1,
    lessonNum: 2,
    unitName: "Basic Economic Concepts",
    title: "수요, 공급, 그리고 시장 균형",
    subtitle: "가격과 수량이 만나는 한 점 — 거기서 시장이 정리됩니다.",
    overview:
      "시장은 수요(demand)와 공급(supply)이라는 두 힘이 밀고 당기는 곳이에요. 두 곡선이 교차하는 지점이 균형(equilibrium) — 사고 싶은 양과 팔고 싶은 양이 딱 맞아떨어지는 가격이죠. 정부가 이 균형을 인위적으로 누르거나 떠받치면 부족이나 과잉이 생깁니다. 시험 함정: 균형 아래에 묶이는 가격상한(price ceiling)은 부족(shortage)을, 균형 위에 묶이는 가격하한(price floor)은 과잉(surplus)을 만든다는 방향을 절대 헷갈리지 마세요.",
    objectives: [
      "균형 아래의 가격상한 → 부족; 균형 위의 가격하한 → 과잉.",
    ],
    formulas: [],
    diagram: "ppc",
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "수요 결정요인 (Demand determinants, 곡선을 이동시킴)",
            def: "소득, 관련재의 가격, 기대, 기호, 구매자 수.",
          },
          {
            term: "공급 결정요인 (Supply determinants)",
            def: "투입물 가격, 기술, 판매자 수, 기대.",
          },
        ],
        traps: [
          "투입물 가격 상승으로 인한 공급 이동의 방향을 반대로 그리는 실수 — 투입물 가격이 오르면 생산 비용이 커지므로 공급은 감소합니다(왼쪽으로 이동). AP는 미묘한 시나리오로 이동 방향을 시험해요. 유용한 점검법: 어떤 이유로든 생산이 더 비싸지거나 덜 수익적이면 공급은 감소, 더 수익적이거나 덜 비싸지면 공급은 증가합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-microeconomics-u2-l1",
    courseId: "ap-microeconomics",
    subjectLabel: "AP Microeconomics",
    emoji: "📉",
    unit: 2,
    lessonNum: 1,
    unitName: "Supply and Demand — Consumer and Producer Theory",
    title: "탄력성 — 가격, 소득, 교차가격",
    subtitle: "가격이 1% 움직일 때 수량은 몇 % 움직이나 — 그 민감도가 모든 걸 바꿉니다.",
    overview:
      "탄력성(elasticity)은 '얼마나 민감하게 반응하느냐'를 재는 자예요. 가격이 변할 때 수요량이 크게 출렁이면 탄력적, 거의 안 움직이면 비탄력적이죠. 이 개념이 중요한 이유는 총수입(total revenue)과 직결되기 때문입니다 — 탄력적이면 가격을 올렸을 때 오히려 수입이 줄어요. 시험 함정: 탄력성을 계산할 때 절댓값만 구하지 말고, 탄력/비탄력 판정과 총수입 변화를 반드시 연결하세요.",
    objectives: [
      "PED = %ΔQd / %ΔP — 탄력적 수요(>1)는 가격이 오를 때 수입이 감소함을 뜻한다.",
    ],
    formulas: [
      "E=%ΔQ/%ΔP",
      "|E|<1 inelastic, >1 elastic",
      "ceiling<eq→shortage",
    ],
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
            term: "소득 탄력성 (Income elasticity)",
            def: "양수면 정상재, 음수면 열등재.",
          },
          {
            term: "교차가격 탄력성 (Cross-price elasticity)",
            def: "양수면 대체재, 음수면 보완재.",
          },
        ],
        traps: [
          "방향을 명시하지 않고 절댓값만으로 탄력성을 계산하는 실수 — AP는 수요가 탄력적인지 비탄력적인지 올바르게 판정하고 그것을 총수입과 연결할 때 만점을 줍니다. 탄력적 수요: 가격 ↑ → 수입 ↓(반대 방향), 비탄력적: 가격 ↑ → 수입 ↑(같은 방향). 객관식에서는 계산보다 총수입 검정(total revenue test)이 더 빠르고, AP는 여러분이 이걸 쓰기를 기대합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-microeconomics-u2-l2",
    courseId: "ap-microeconomics",
    subjectLabel: "AP Microeconomics",
    emoji: "📉",
    unit: 2,
    lessonNum: 2,
    unitName: "Supply and Demand — Consumer and Producer Theory",
    title: "소비자잉여, 생산자잉여, 효율성",
    subtitle: "그래프 위의 삼각형 두 개 — 시장이 만들어내는 '이득'의 크기입니다.",
    overview:
      "시장이 거래를 성사시키면 양쪽 모두 이득을 봐요. 소비자는 지불할 의향보다 싸게 사서 소비자잉여(consumer surplus), 생산자는 받고 싶은 최저가보다 비싸게 팔아 생산자잉여(producer surplus)를 얻죠. 이 둘의 합이 사회 전체의 후생입니다. 효율적 수량에서 벗어나면 거래되지 못한 잉여, 즉 자중손실(deadweight loss)이 생겨요. 시험 함정: 자중손실 삼각형을 균형 수량과 실제 수량 '사이'에 정확히 그리지 않으면 그래프 점수를 잃습니다.",
    objectives: [
      "Supply and Demand — Consumer and Producer Theory 단원을 위해 소비자잉여, 생산자잉여, 효율성을 완전히 익힌다.",
    ],
    formulas: [
      "E=%ΔQ/%ΔP",
      "|E|<1 inelastic, >1 elastic",
      "ceiling<eq→shortage",
    ],
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
            term: "소비자잉여 (Consumer surplus)",
            def: "가격 위, 수요곡선 아래의 면적.",
          },
          {
            term: "생산자잉여 (Producer surplus)",
            def: "가격 아래, 공급곡선 위의 면적.",
          },
          {
            term: "자중손실 (Deadweight loss)",
            def: "효율적 수준에서 생산되지 못한 수량으로 인해 사라진 총잉여의 손실.",
          },
        ],
        traps: [
          "자중손실을 엉뚱한 쪽에 그리는 실수 — 자중손실은 효율적 수량과 실제 수량 '사이'의 삼각형입니다. 균형 아래에 묶인 가격상한의 경우 자중손실 삼각형은 오른쪽(거래되었어야 할 더 많은 수량 방향)을 향하고, 가격하한도 같은 논리예요. 조세의 경우 자중손실은 새 수량에서의 구매자 가격과 판매자 가격 사이에 있습니다. 자중손실 위치를 잘못 잡으면 그래프 점수를 잃어요.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-microeconomics-u2-l3",
    courseId: "ap-microeconomics",
    subjectLabel: "AP Microeconomics",
    emoji: "📉",
    unit: 2,
    lessonNum: 3,
    unitName: "Supply and Demand — Consumer and Producer Theory",
    title: "정부 개입 — 조세, 보조금, 가격 통제",
    subtitle: "누가 세금을 '내느냐'보다, 누가 실제로 '부담하느냐'가 핵심입니다.",
    overview:
      "정부가 시장에 손을 대는 방법은 조세(tax), 보조금(subsidy), 가격 통제예요. 세금을 매기면 구매자가 내는 가격과 판매자가 받는 가격 사이에 쐐기(wedge)가 박히고, 그 부담은 더 비탄력적인 쪽으로 쏠립니다. 보조금은 공급을 오른쪽으로 밀고요. 시험 함정: 세금 '귀착(incidence)'은 법적으로 누구에게 부과됐느냐가 아니라 상대적 탄력성으로 결정됩니다 — 세금 고지서를 누가 받느냐는 중요하지 않아요.",
    objectives: [
      "Supply and Demand — Consumer and Producer Theory 단원을 위해 정부 개입(조세, 보조금, 가격 통제)을 완전히 익힌다.",
    ],
    formulas: [
      "E=%ΔQ/%ΔP",
      "|E|<1 inelastic, >1 elastic",
      "ceiling<eq→shortage",
    ],
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
            term: "조세 귀착 (Tax incidence)",
            def: "부담은 더 비탄력적인 쪽(구매자 또는 판매자)에 더 많이 떨어진다.",
          },
          {
            term: "종량세 (Per-unit tax)",
            def: "구매자 가격과 판매자 가격 사이에 세액만큼 벌어진 쐐기.",
          },
          {
            term: "보조금 (Subsidy)",
            def: "공급을 오른쪽으로 이동시키며, 혜택은 탄력성에 따라 구매자와 판매자에게 나뉜다.",
          },
        ],
        traps: [
          "세금이 부과된 당사자가 그 부담을 진다고 가정하는 실수 — AP는 법적 귀착이 아니라 경제적 귀착(economic incidence)을 시험합니다. 판매자에게 세금을 매겨도 수요가 완전 비탄력적이면 구매자가 전액을 부담해요(가격이 세액만큼 그대로 오름). 조세 귀착은 누가 정부에 수표를 쓰느냐가 아니라 상대적 탄력성에 달려 있습니다. 조세 쐐기를 정확히 그리고 어느 쪽이 더 부담하는지 식별하는 것은 표준 AP 서술형 과제예요.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-microeconomics-u3-l1",
    courseId: "ap-microeconomics",
    subjectLabel: "AP Microeconomics",
    emoji: "📉",
    unit: 3,
    lessonNum: 1,
    unitName: "Production, Cost, and the Perfect Competition Model",
    title: "단기 생산과 비용",
    subtitle: "한계생산이 오르면 한계비용은 내려갑니다 — 둘은 거울처럼 움직여요.",
    overview:
      "기업이 단기에 얼마나 만들고 얼마가 드는가를 다루는 단원이에요. 비용은 산출량과 무관한 고정비용(fixed cost)과 산출량에 따라 변하는 가변비용(variable cost)으로 나뉩니다. 핵심은 한계생산(MP)과 한계비용(MC)의 관계 — 노동자를 더 투입해 생산성이 오를 때는 비용이 떨어지고, 수확체감이 시작되면 비용이 오르죠. 시험 함정: MP와 MC는 생산함수를 통해 거울상으로 반대로 움직인다는 걸 잊지 마세요.",
    objectives: [
      "고정비용(산출량에 따라 변하지 않음) vs. 가변비용(산출량에 따라 변함).",
    ],
    formulas: [
      "MR=MC (P=MR if price taker)",
      "shutdown if P<min AVC",
      "profit=(P−ATC)·Q",
    ],
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
            term: "결국 체감하는 한계생산 (Marginal product eventually diminishing)",
            def: "고정된 자본에 노동자를 계속 더하면 각 노동자가 추가로 만드는 산출량이 줄어든다.",
          },
          {
            term: "관계 (Relationship)",
            def: "한계생산(MP)이 오르면 한계비용(MC)은 내리고, MP가 내리면 MC는 오른다 — 서로 거울상이다.",
          },
        ],
        traps: [
          "MP와 MC 사이의 역관계를 잊는 실수 — 노동의 한계생산이 상승할 때(초기 노동자들이 분업으로 더 생산적일 때) 한계비용은 하락하고, MP가 떨어지기 시작하면(수확체감) MC는 오르기 시작합니다. AP 그래프 문제는 거의 항상 두 곡선을 함께 보여주고, 여러분이 이들이 생산함수를 통한 거울상임을 이해하는지 시험합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-microeconomics-u3-l2",
    courseId: "ap-microeconomics",
    subjectLabel: "AP Microeconomics",
    emoji: "📉",
    unit: 3,
    lessonNum: 2,
    unitName: "Production, Cost, and the Perfect Competition Model",
    title: "완전경쟁 — 단기와 장기 균형",
    subtitle: "장기에는 경제적 이윤이 0으로 수렴합니다 — 그게 완전경쟁의 운명이에요.",
    overview:
      "완전경쟁 시장의 기업은 가격수용자(price taker)예요 — 시장 가격을 그대로 받아들이고, 수요곡선이 수평이죠. 이윤은 P = MR = MC인 지점에서 극대화됩니다. 단기에 이윤이 나면 새 기업이 들어와 장기에는 P = MC = ATC, 즉 경제적 이윤 0의 균형에 도달해요. 시험 함정: AP는 회계적 이윤이 아니라 경제적 이윤(economic profit)을 시험합니다 — 암묵적 비용까지 뺀 개념이라, 경제적 이윤 0이어도 기업은 시장에 남습니다.",
    objectives: [
      "Production, Cost, and the Perfect Competition Model 단원을 위해 완전경쟁의 단기·장기 균형을 완전히 익힌다.",
    ],
    formulas: [
      "MR=MC (P=MR if price taker)",
      "shutdown if P<min AVC",
      "profit=(P−ATC)·Q",
    ],
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
            term: "가격수용자 (Price taker)",
            def: "완전경쟁 기업은 시장 가격을 주어진 것으로 받아들인다(수평 수요곡선).",
          },
          {
            term: "이윤 극대화 (Profit maximization)",
            def: "P = MR = MC인 지점에서 생산한다.",
          },
          {
            term: "장기 균형 (Long-run equilibrium)",
            def: "P = MC = ATC (경제적 이윤 0, 효율 극대).",
          },
        ],
        traps: [
          "경제적 이윤과 회계적 이윤을 혼동하는 실수 — AP는 암묵적 비용(소유자의 시간과 자본의 기회비용)을 빼는 경제적 이윤을 시험합니다. 경제적 이윤 0은 정상이윤(다른 곳에서 벌 수 있는 만큼 버는 것)을 뜻해요. 경제적 이윤이 0인 기업은 산업에 남고, 경제적 이윤이 음수(정상 수익 이하)인 기업만 퇴출합니다. 이 구분이 장기 조정을 이끌어요.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-microeconomics-u3-l3",
    courseId: "ap-microeconomics",
    subjectLabel: "AP Microeconomics",
    emoji: "📉",
    unit: 3,
    lessonNum: 3,
    unitName: "Production, Cost, and the Perfect Competition Model",
    title: "조업 중단과 손익분기 결정",
    subtitle: "단기의 '문 닫기'와 장기의 '산업 떠나기'는 비교 기준이 다릅니다.",
    overview:
      "손실이 나는 기업이라고 무조건 멈추는 건 아니에요. 단기에는 고정비용이 매몰비용이라, 가격이 평균가변비용(AVC) 이상이면 손실을 보면서도 계속 운영하는 게 낫습니다. 가격이 AVC 아래로 떨어져야 조업을 중단하죠. 반면 장기에는 모든 비용이 가변적이므로 가격이 평균총비용(ATC) 아래면 산업을 떠납니다. 시험 함정: 단기 조업 중단(P < AVC)과 장기 퇴출(P < ATC)을 헷갈리지 마세요 — 비교 대상이 다릅니다.",
    objectives: [
      "단기에는 P < AVC(가변비용을 못 메움)이면 조업을 중단한다.",
      "장기에는 P < ATC(고정비용 포함 모든 비용을 못 메움)이면 퇴출한다.",
      "단기에는 P ≥ AVC인 한 손실을 보더라도 기업이 계속 운영한다.",
    ],
    formulas: [
      "MR=MC (P=MR if price taker)",
      "shutdown if P<min AVC",
      "profit=(P−ATC)·Q",
    ],
    diagram: null,
    sections: [
      {
        title: "조업 중단과 손익분기 결정",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [],
        traps: [
          "단기 조업 중단과 장기 퇴출을 혼동하는 실수 — 단기에는 고정비용이 매몰되어 있으므로 P ≥ AVC이면 기업은 계속 운영해야 합니다. 조업을 멈추면 가변비용은 아끼지만 수입을 잃죠. 장기에는 모든 비용이 가변적이므로 P < ATC이면 퇴출합니다. AP는 '기업이 즉시 조업을 중단해야 하는가, 아니면 산업을 떠나야 하는가?'로 이 구분을 시험하며, 둘은 서로 다른 비용 비교를 요구합니다.",
        ],
        example: null,
      },
    ],
  },
];
