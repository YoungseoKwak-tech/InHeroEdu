/**
 * Core Notes 한국어 스토리텔링 버전 — AP Macroeconomics Units 1–3.
 * 원본 내용 전량 보존(objectives·terms·traps·formulas·diagram 포함) + 일타강사 내러티브.
 * 원본에는 body가 없어 한국어 overview를 추가하고 모든 산문을 자연스러운 한국어로 옮겼습니다.
 * 용어는 "한국어 (English)" 병기.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const AP_MACROECONOMICS_A_KO: CoreNote[] = [
  {
    lessonId: "ap-macroeconomics-u1-l1",
    courseId: "ap-macroeconomics",
    subjectLabel: "AP Macroeconomics",
    emoji: "📈",
    unit: 1,
    lessonNum: 1,
    unitName: "Basic Economic Concepts",
    title: "희소성, 기회비용, 그리고 생산가능곡선(PPC)",
    subtitle:
      "자원은 한정돼 있어요 — 그래서 무엇을 얻을 때마다 무언가를 포기합니다. 그 포기를 한 장의 곡선으로 그린 게 PPC예요.",
    overview:
      "경제학의 출발점은 단 하나, '희소성(scarcity)'입니다. 원하는 건 무한한데 자원은 유한하니, 무언가를 선택하면 반드시 다른 무언가를 포기해요 — 이게 기회비용(opportunity cost)이죠. 생산가능곡선(PPC)은 두 재화를 만들 수 있는 최대 조합을 그린 그래프이고, 곡선 '위'의 점은 자원을 남김없이 쓴 효율적인 점입니다. AP 함정은 곡선을 따라 '이동'하는 것과 곡선 자체가 '이동(shift)'하는 것을 헷갈리게 만드는 거예요 — 여기서 점수가 갈립니다.",
    objectives: [
      "PPC는 두 재화의 최대 생산 조합을 보여준다 — 곡선 '위'의 점이 효율적이다.",
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
            term: "기회비용 (Opportunity cost)",
            def: "포기한 차선책의 가치 — 모든 결정의 진짜 비용이에요.",
          },
          {
            term: "이동 vs. 곡선 자체의 이동 (Shifts vs. movements)",
            def: "자원이나 기술이 변하면 곡선 자체가 이동(shift)하고, 배분 선택이 바뀌면 곡선을 따라 이동(movement)합니다.",
          },
        ],
        traps: [
          "문제가 곡선을 따라가는 '이동(movement)'을 보여주는데 PPC '곡선 이동(shift)'을 그리는 실수 — 곡선을 따라가는 이동(MOVEMENT)은 기존 자원을 재배분할 때 일어나고, 곡선 자체의 이동(SHIFT)은 총생산능력이 바뀔 때(자원 증가, 기술 향상)에만 일어나요. AP 객관식은 어떤 상황이 shift인지 movement인지 식별하라는 시나리오로 이 구분을 자주 시험합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-macroeconomics-u1-l2",
    courseId: "ap-macroeconomics",
    subjectLabel: "AP Macroeconomics",
    emoji: "📈",
    unit: 1,
    lessonNum: 2,
    unitName: "Basic Economic Concepts",
    title: "비교우위와 무역",
    subtitle:
      "각자 더 잘하는 걸 만들어 교환하면 둘 다 PPC 너머까지 소비할 수 있어요 — 무역이 마법처럼 보이는 이유입니다.",
    overview:
      "두 나라가 각자 '기회비용이 낮은' 재화에 특화(specialization)해서 무역하면, 둘 다 자기 PPC 바깥의 조합까지 소비할 수 있어요. 핵심은 비교우위(comparative advantage)예요 — 누가 더 많이 만드냐(절대우위)가 아니라, 누가 더 적게 포기하느냐의 문제입니다. AP 단골 함정은 총생산량으로 비교우위를 계산하게 만드는 것 — 반드시 기회비용으로 바꿔서 따져야 합니다.",
    objectives: [
      "특화와 무역이 소비가능 범위를 PPC 너머로 확장한다.",
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
            term: "비교우위 (Comparative advantage)",
            def: "절대적인 생산 능력이 아니라, 더 '낮은 기회비용'을 뜻해요.",
          },
          {
            term: "교역 조건 (Terms of trade)",
            def: "상호 이익이 되는 무역은 두 나라의 기회비용 사이에서 성립합니다.",
          },
        ],
        traps: [
          "기회비용 대신 총생산량으로 비교우위를 계산하는 실수 — 항상 기회비용(한 재화를 하나 더 만들기 위해 다른 재화를 얼마나 포기하는가)으로 바꿔서 따지세요. 기회비용이 더 '낮은' 나라가 비교우위를 가집니다. 흔한 AP 함정: 한 나라가 두 재화 모두에서 절대우위를 갖더라도 각 나라는 한 재화씩 비교우위를 가지며 — 그래도 둘 다 무역으로 이득을 봅니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-macroeconomics-u2-l1",
    courseId: "ap-macroeconomics",
    subjectLabel: "AP Macroeconomics",
    emoji: "📈",
    unit: 2,
    lessonNum: 1,
    unitName: "Economic Indicators and the Business Cycle",
    title: "GDP — 한 나라의 생산을 측정하기",
    subtitle:
      "한 나라가 1년 동안 만든 최종재의 총가치 — 그게 GDP예요. 무엇을 세고 무엇을 빼는지가 전부입니다.",
    overview:
      "GDP(국내총생산)는 한 나라 안에서 일정 기간 생산된 모든 '최종재'의 시장가치 총합입니다. 지출접근법으로 보면 GDP = C + I + G + NX — 소비·투자·정부지출·순수출의 합이에요. 명목 GDP는 그해 가격으로, 실질 GDP는 물가 변동을 제거해 측정합니다. AP 함정은 '무엇이 GDP에 포함되고 무엇이 빠지는가' — 중간재·중고품·금융거래·이전지출은 빠진다는 걸 정확히 외워야 해요.",
    objectives: [
      "'경제 지표와 경기 순환' 단원의 GDP — 한 나라의 생산 측정을 완전히 익힌다.",
    ],
    formulas: ["GDP=C+I+G+Xn", "unemployment=unemployed/labor force", "real≈nominal−inflation"],
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
            term: "지출접근법 (Expenditure approach)",
            def: "GDP = C + I + G + NX — 외우고, 각 항목이 무엇을 포함하고 제외하는지 알아두세요.",
          },
          {
            term: "실질 GDP vs. 명목 GDP (Real vs. nominal GDP)",
            def: "명목은 그해 가격을 쓰고, 실질은 기준연도 가격을 써서 물가 변동을 보정합니다.",
          },
          {
            term: "GDP가 세지 '않는' 것 (GDP does NOT count)",
            def: "중간재, 비시장 생산, 지하경제, 소득 분배는 GDP에 들어가지 않아요.",
          },
        ],
        traps: [
          "GDP 계산에 중간재를 포함하는 실수 — GDP는 이중 계산을 피하려고 '최종재'만 셉니다. 철강과 그 철강으로 만든 자동차를 둘 다 세면 철강을 두 번 센 거예요. AP 자유응답은 무엇이 GDP에 포함되고 안 되는지 식별하라고 자주 요구합니다. 제외 항목(중고품, 금융거래, 이전지출)을 포함 항목만큼이나 꼼꼼히 외우세요.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-macroeconomics-u2-l2",
    courseId: "ap-macroeconomics",
    subjectLabel: "AP Macroeconomics",
    emoji: "📈",
    unit: 2,
    lessonNum: 2,
    unitName: "Economic Indicators and the Business Cycle",
    title: "실업 — 유형과 측정",
    subtitle:
      "실업률 0%이 목표가 아니에요. '완전고용'에도 마찰적·구조적 실업은 남습니다 — 그게 자연실업률이에요.",
    overview:
      "실업에는 세 종류가 있어요 — 마찰적(직장 사이 이동), 구조적(기술 불일치), 경기적(불황 탓). 자연실업률(natural rate)은 마찰적 + 구조적 실업이며, 결코 0이 아닙니다. 완전고용이란 경기적 실업이 없는 상태(약 4~5%)이지 실업이 전혀 없는 게 아니에요. AP 함정은 바로 이것 — 완전고용을 실업률 0%으로 착각하게 만드는 거죠.",
    objectives: [
      "자연실업률 = 마찰적 + 구조적 실업 (실업률 0%이 아니다).",
    ],
    formulas: ["GDP=C+I+G+Xn", "unemployment=unemployed/labor force", "real≈nominal−inflation"],
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
            term: "마찰적 실업 (Frictional)",
            def: "직장 사이를 옮기는 중(정상적이고 불가피함). 구조적: 기술 불일치. 경기적: 불황이 원인.",
          },
          {
            term: "경제활동참가율 vs. 실업률 (Labor force participation rate vs. unemployment rate)",
            def: "구직단념자가 경제활동인구에서 빠지면 측정된 실업률은 오히려 '낮아집니다'.",
          },
        ],
        traps: [
          "완전고용을 실업률 0%으로 취급하는 실수 — 완전고용은 '경기적' 실업이 없다는 뜻이지, 마찰적·구조적 실업은 여전히 존재합니다. 자연실업률(약 4~5%)이 곧 완전고용이에요. AP는 마찰적 실업을 줄이면(더 나은 구직 매칭 서비스) 자연실업률이 낮아진다는 점을 시험합니다. 경기적 실업을 줄이는 것은 안정화 정책의 목표예요 — 이 둘은 서로 다른 정책 대상입니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-macroeconomics-u2-l3",
    courseId: "ap-macroeconomics",
    subjectLabel: "AP Macroeconomics",
    emoji: "📈",
    unit: 2,
    lessonNum: 3,
    unitName: "Economic Indicators and the Business Cycle",
    title: "인플레이션 — 측정과 효과",
    subtitle:
      "물가가 오르면 돈의 가치가 떨어져요 — 그런데 모두가 똑같이 손해 보는 건 아닙니다. 누가 이득이고 누가 손해인지가 핵심이에요.",
    overview:
      "인플레이션은 전반적 물가 수준이 오르는 현상이고, 소비자물가지수(CPI)로 측정합니다. 중요한 건 인플레이션이 부(富)를 '재분배'한다는 점이에요 — 가치가 떨어진 돈으로 돌려받는 채권자는 손해, 채무자는 이득을 봅니다. AP 함정은 모든 인플레이션을 똑같이 나쁘다고 보는 것 — 예상치 못한 인플레이션의 분배 효과와, 누가 자산을 갖고 누가 빚을 졌는지를 구분해야 해요.",
    objectives: [
      "'경제 지표와 경기 순환' 단원의 인플레이션 — 측정과 효과를 완전히 익힌다.",
    ],
    formulas: ["GDP=C+I+G+Xn", "unemployment=unemployed/labor force", "real≈nominal−inflation"],
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
            term: "소비자물가지수 (CPI)",
            def: "고정된 재화 바구니로 소비자 물가 수준의 변화를 측정합니다.",
          },
          {
            term: "인플레이션은 부를 재분배한다 (Inflation redistributes wealth)",
            def: "채권자에게 손해(가치 낮아진 돈으로 상환받음), 채무자에게 이득을 줍니다.",
          },
          {
            term: "초인플레이션 (Hyperinflation)",
            def: "화폐의 교환수단 기능을 파괴하는 극단적 인플레이션(1923년 독일).",
          },
        ],
        traps: [
          "모든 인플레이션을 똑같이 나쁘다고 취급하는 실수 — AP는 '분배 효과'를 시험합니다. 예상치 못한 인플레이션은 부를 채권자에서 채무자로 이전시키고, 예상된 인플레이션은 이미 이자율에 반영돼 혼란이 덜해요. 디플레이션도 해롭습니다(구매를 미루게 하고 실질 부채 부담을 키움). AP 거시 문제는 보통 예상치 못한 인플레이션이 특정 집단에 미치는 영향을 묻고, 누가 자산을 갖고 누가 빚을 졌는지 식별하게 합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-macroeconomics-u3-l1",
    courseId: "ap-macroeconomics",
    subjectLabel: "AP Macroeconomics",
    emoji: "📈",
    unit: 3,
    lessonNum: 1,
    unitName: "National Income and Price Determination",
    title: "총수요 — AD 곡선",
    subtitle:
      "물가가 내려가면 사람들은 더 많이 사려 해요 — 그래서 AD 곡선은 우하향합니다. 단, 곡선을 '이동'시키는 건 물가가 아니에요.",
    overview:
      "총수요(AD)는 각 물가 수준에서 경제 전체가 사려는 산출량입니다. 구성요소는 GDP와 같아요 — AD = C + I + G + NX. AD 곡선이 우하향하는 건 부의 효과·이자율 효과·해외구매 효과 때문이고, 물가 수준이 바뀌면 곡선을 '따라' 이동합니다. 반면 소비자 신뢰·정부지출·해외소득처럼 물가와 무관한 요인이 바뀌면 곡선 자체가 '이동(shift)'해요. AP 최다 실수가 바로 이 둘의 혼동입니다.",
    objectives: [
      "AD = C + I + G + NX — GDP와 같은 구성요소지만, 각 물가 수준에서의 수요량을 보여준다.",
    ],
    formulas: ["spending mult=1/(1−MPC)", "tax mult=−MPC/(1−MPC)"],
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
            term: "AD 곡선은 우하향한다 (AD curve slopes downward)",
            def: "부의 효과, 이자율 효과, 해외구매 효과 때문이에요.",
          },
          {
            term: "AD의 이동 (Shifts in AD)",
            def: "물가 수준 변화가 '원인이 아닌' C, I, G, NX의 변화입니다.",
          },
        ],
        traps: [
          "AD를 따라가는 이동(movement)과 곡선 자체의 이동(shift)을 혼동하는 실수 — 물가 수준이 바뀌면 AD 곡선을 '따라' 이동합니다(같은 곡선, 다른 점). 곡선 자체를 이동시키는 건 물가와 무관한 요인(소비자 신뢰, 정부지출, 해외소득)뿐이에요. 이게 AP 거시에서 가장 흔한 오류입니다. 자유응답에서는 항상 shift(새 곡선을 그림)인지 movement(기존 곡선 위에서 점이 움직임)인지 명시하세요.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-macroeconomics-u3-l2",
    courseId: "ap-macroeconomics",
    subjectLabel: "AP Macroeconomics",
    emoji: "📈",
    unit: 3,
    lessonNum: 2,
    unitName: "National Income and Price Determination",
    title: "총공급 — 단기와 장기",
    subtitle:
      "단기에는 가격이 오르면 생산이 늘어 SRAS가 우상향해요. 장기에는 모든 가격이 조정돼 LRAS가 수직이 됩니다.",
    overview:
      "총공급은 단기(SRAS)와 장기(LRAS)로 나뉩니다. 단기에는 투입 비용이 경직적이라 물가가 오르면 생산이 더 이익이 돼 SRAS가 우상향해요. 장기에는 모든 가격이 조정되므로 산출량이 자연 수준으로 돌아가 LRAS는 완전고용에서 수직입니다. AP 함정은 LRAS를 수직으로 정확히 그리는지 시험하는 것 — 수직이 아니면 그래프 점수를 잃습니다.",
    objectives: [
      "'국민소득과 물가 결정' 단원의 총공급 — 단기와 장기를 완전히 익힌다.",
    ],
    formulas: ["spending mult=1/(1−MPC)", "tax mult=−MPC/(1−MPC)"],
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
            term: "SRAS는 우상향한다 (SRAS slopes upward)",
            def: "단기에는 물가가 높아지면 생산이 더 이익이 돼요(투입 비용이 경직적이라서).",
          },
          {
            term: "LRAS는 완전고용에서 수직이다 (LRAS is vertical at full employment)",
            def: "장기에는 모든 가격이 조정되므로 산출량이 자연 수준으로 돌아갑니다.",
          },
          {
            term: "AS의 이동 (SRAS shifts)",
            def: "SRAS는 투입 가격·공급 충격으로, LRAS는 생산능력 변화로 이동합니다.",
          },
        ],
        traps: [
          "LRAS를 그려야 할 때 SRAS를 그리는 실수 — 핵심 AP 함정: LRAS를 늘리는 '공급측 정책'(노동력 증가, 기술 향상)은 AD를 늘리는 확장적 재정정책과 다릅니다. AP 자유응답은 LRAS를 수직으로 정확히 그리는지를 콕 집어 시험해요. 수직이 아닌 LRAS는 그래프 점수를 깎습니다. 수직 LRAS가 자동으로 나올 때까지 AS-AD 3곡선 모형을 그려 연습하세요.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-macroeconomics-u3-l3",
    courseId: "ap-macroeconomics",
    subjectLabel: "AP Macroeconomics",
    emoji: "📈",
    unit: 3,
    lessonNum: 3,
    unitName: "National Income and Price Determination",
    title: "승수 효과",
    subtitle:
      "정부가 1달러를 쓰면 GDP는 1달러보다 더 많이 늘어요 — 그 돈이 돌고 돌면서 소비를 연쇄적으로 일으키니까요.",
    overview:
      "승수 효과는 최초의 지출이 경제를 돌면서 GDP를 그보다 더 크게 늘리는 현상입니다. 지출승수 = 1/(1−MPC) = 1/MPS — 한계소비성향(MPC)이 클수록 승수가 커져요. 세금승수 = −MPC/(1−MPC)로 지출승수보다 작은데, 감세된 첫 달러의 일부가 저축되기 때문입니다. 균형예산승수는 1 — G와 T를 같은 액수만큼 늘리면 GDP도 그만큼 늘어요. AP 함정은 세금 변화에 지출승수를 쓰는 것입니다.",
    objectives: [
      "지출승수 = 1/(1−MPC) = 1/MPS — MPC가 클수록 승수가 커진다.",
      "세금승수 = −MPC/(1−MPC) — 감세된 첫 달러의 일부가 저축되므로 지출승수보다 작다.",
      "균형예산승수 = 1 — G와 T를 같은 액수만큼 늘리면 GDP도 같은 액수만큼 늘어난다.",
    ],
    formulas: ["spending mult=1/(1−MPC)", "tax mult=−MPC/(1−MPC)"],
    diagram: "ad-as",
    sections: [
      {
        title: "승수 효과",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [],
        traps: [
          "세금 변화에 지출승수를 쓰는 실수 — '세금승수'는 지출승수보다 크기가 작습니다(MPC/MPS vs. 1/MPS). 감세의 첫 회차 일부가 저축되기 때문이에요. AP 자유응답은 둘 다 계산하고 왜 다른지 설명하라고 자주 요구합니다. 균형예산승수(= 1) — G와 T를 같은 액수만큼 늘리면 GDP가 그만큼 늘어난다는 것은 고전적인 객관식 함정입니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-macroeconomics-u3-l4",
    courseId: "ap-macroeconomics",
    subjectLabel: "AP Macroeconomics",
    emoji: "📈",
    unit: 3,
    lessonNum: 4,
    unitName: "National Income and Price Determination",
    title: "단기 균형 vs. 장기 자기교정",
    subtitle:
      "정책이 없어도 경제는 결국 완전고용으로 돌아와요 — 임금이 조정되면서 SRAS가 움직이기 때문입니다.",
    overview:
      "단기 균형은 완전고용(LRAS) 위가 아닐 수 있어요. 산출량이 완전고용보다 낮으면 경기침체갭, 높으면 인플레이션갭입니다. 정책이 없어도 임금이 조정되면서 SRAS가 이동해 경제는 결국 LRAS로 돌아와요 — 이게 자기교정 메커니즘입니다. AP 함정은 '장기에 무슨 일이 일어나는가'를 물을 때 자기교정 과정을 빠뜨리는 것 — 갭 확인 → 임금 조정 → SRAS 이동 → LRAS에서 새 장기 균형, 이 순서를 다 보여줘야 해요.",
    objectives: [
      "'국민소득과 물가 결정' 단원의 단기 균형 vs. 장기 자기교정을 완전히 익힌다.",
    ],
    formulas: ["spending mult=1/(1−MPC)", "tax mult=−MPC/(1−MPC)"],
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
            term: "경기침체갭 (Recessionary gap)",
            def: "균형 산출량이 완전고용보다 낮은 상태 — 결국 임금이 하락하고 SRAS가 우측으로 이동합니다.",
          },
          {
            term: "인플레이션갭 (Inflationary gap)",
            def: "산출량이 잠재 수준보다 높은 상태 — 결국 임금이 상승하고 SRAS가 좌측으로 이동해 LRAS로 돌아갑니다.",
          },
          {
            term: "자기교정 메커니즘 (Self-correction mechanism)",
            def: "정책이 없어도 경제는 결국 LRAS로 돌아옵니다.",
          },
        ],
        traps: [
          "장기 결과를 물을 때 자기교정을 보여주지 않는 실수 — '장기에 무슨 일이 일어나는가'를 묻는 AP 자유응답은 SRAS가 이동해 LRAS 균형을 회복하는 과정을 보여줘야 합니다. 순서는: 갭 식별 → 임금 조정 → SRAS 이동 → LRAS에서 새 장기 균형. 이 순서의 어느 단계라도 빠뜨리면 그래프와 설명 점수를 잃습니다.",
        ],
        example: null,
      },
    ],
  },
];
