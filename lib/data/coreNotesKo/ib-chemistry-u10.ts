/**
 * Core Notes 한국어 스토리텔링 버전 — IB Chemistry Unit 10 (유기 화학).
 * IB DP Chemistry SL/HL 기준 실제 내용을 바탕으로 일타강사 내러티브로 작성.
 * 용어는 "한국어 (English)" 병기 — IB 시험은 영어로 보니까.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const IB_CHEMISTRY_U10_KO: CoreNote[] = [
  {
    lessonId: "ib-chemistry-u10-l1",
    courseId: "ib-chemistry",
    subjectLabel: "IB Chemistry",
    emoji: "⚗️",
    unit: 10,
    lessonNum: 1,
    unitName: "유기 화학 (Organic Chemistry)",
    title: "유기 화학의 뼈대 — 동족 계열, 작용기, IUPAC 명명법, 구조 이성질체",
    subtitle: "탄소 골격을 그리고 작용기를 붙이면 유기 화합물이 된다 — 이름 짓는 규칙(IUPAC)을 먼저 완벽히 잡아야 반응 메커니즘도 따라온다",
    overview:
      "유기 화학(organic chemistry)이라는 이름은 19세기 초까지 '생명체에서만 만들 수 있는 화합물'에서 유래했습니다. 1828년 독일의 뵐러(Friedrich Wöhler)가 무기 물질인 사이안산암모늄(ammonium cyanate)에서 요소(urea, CO(NH₂)₂)를 합성해내면서 이 생기론(vitalism)은 무너졌지만, '유기(organic)'라는 이름은 남아 오늘날 '탄소를 기반으로 하는 화합물'을 통칭합니다. 현재까지 알려진 화합물의 수는 수천만 종에 달하며, 그 다양성의 핵심은 탄소가 다른 탄소와 긴 사슬이나 고리를 이루고 동시에 수소·산소·질소·할로겐 등과 결합할 수 있다는 데 있습니다. IB DP Chemistry Topic 10은 이 광대한 유기 화학의 관문입니다. 동족 계열(homologous series)이 무엇인지 이해하면 수천 개의 화합물이 몇 개의 '가족'으로 정리됩니다. 작용기(functional group)를 알면 화합물의 성질과 반응성을 사전에 예측할 수 있습니다. IUPAC 명명법(IUPAC nomenclature)을 익히면 구조식과 이름이 1대1로 대응하게 됩니다. 구조 이성질체(structural isomers)를 이해하면 분자식이 같아도 성질이 전혀 다를 수 있다는 것을 납득하게 됩니다. 이 레슨에서는 이 네 가지 개념을 IB Paper 1·2 수준에서 완벽히 정리합니다. 여기서 구축한 어휘와 체계가 이후 모든 유기 반응 레슨의 언어가 됩니다.",
    objectives: [
      "동족 계열(homologous series)의 정의 — 일반식이 동일하고, 인접 구성원 간 CH₂ 단위 하나만 다르며, 물리적 성질이 규칙적으로 변함 — 를 서술하고, 알케인·알켄·알코올·할로젠화알킬·카복실산의 일반식을 쓸 수 있다",
      "주요 작용기(functional group) — 알켄의 C=C, 알코올의 –OH, 할로젠화알킬의 –X, 카복실산의 –COOH — 를 구조식에서 식별하고, 각 작용기가 화합물의 반응성에 미치는 영향을 설명할 수 있다",
      "탄소 원자 수 1–6에 대한 IUPAC 어간(meth-, eth-, prop-, but-, pent-, hex-)과 접미사(알케인 –ane, 알켄 –ene, 알코올 –ol, 카복실산 –oic acid, 할로젠화알킬 halo- 접두사)를 사용하여 구조 이성질체를 포함한 유기 화합물의 이름을 짓거나 구조를 그릴 수 있다",
      "포화(saturated)와 불포화(unsaturated) 탄화수소를 정의하고, 분자식이 같지만 구조가 다른 구조 이성질체(structural isomers)를 식별하거나 그릴 수 있다",
      "같은 분자식 내 구조 이성질체의 수를 열거하고, 각 이성질체의 IUPAC 이름과 간략 구조식을 정확히 쓸 수 있다",
    ],
    formulas: [
      "알케인 일반식: CₙH₂ₙ₊₂",
      "알켄 일반식: CₙH₂ₙ  (고리 없음 가정)",
      "알코올 일반식: CₙH₂ₙ₊₁OH",
      "카복실산 일반식: CₙH₂ₙ₊₁COOH",
      "할로젠화알킬 일반식: CₙH₂ₙ₊₁X  (X = F, Cl, Br, I)",
    ],
    sections: [
      {
        title: "동족 계열과 작용기 — 유기 화합물을 '가족 단위'로 묶는 방법",
        subtitle: "작용기가 같으면 반응이 같다 — 수천 종의 유기 화합물을 한 번에 이해하는 비결",
        terms: [
          {
            term: "동족 계열 (Homologous Series)",
            def: "동족 계열(homologous series)은 다음 세 가지 특징을 모두 만족하는 화합물의 집합입니다. ① 동일한 일반식(general formula): 예를 들어 알케인은 CₙH₂ₙ₊₂, 알켄은 CₙH₂ₙ. ② 인접한 구성원 간에 CH₂(메틸렌) 단위 하나만 차이: 메테인(CH₄) → 에테인(C₂H₆) → 프로페인(C₃H₈). ③ 물리적 성질이 규칙적으로 변함: 탄소 수가 늘수록 분자 질량 증가 → 끓는점·녹는점 상승, 점도 증가, 물에 대한 용해도 감소(긴 탄화수소 사슬이 극성 –OH기 효과를 줄임). 동족 계열을 알면 특정 화합물을 직접 외우지 않아도 탄소 수로부터 성질을 예측할 수 있습니다. IB Paper 1에서 '다음 화합물이 속하는 동족 계열을 쓰시오' 유형이 자주 출제됩니다.",
          },
          {
            term: "작용기 (Functional Group)",
            def: "작용기(functional group)는 유기 분자 내에서 특정 화학 반응성을 결정하는 원자 또는 원자 묶음입니다. 동일한 작용기를 가진 화합물은 탄소 골격의 길이와 관계없이 유사한 화학 반응을 나타냅니다. IB Topic 10에서 다루는 주요 작용기: ① 알켄(alkene)의 탄소-탄소 이중결합(C=C): 친전자성 첨가 반응(electrophilic addition). ② 할로젠화알킬(halogenoalkane)의 C–X 결합(X = F, Cl, Br, I): 친핵성 치환 반응(nucleophilic substitution). ③ 알코올(alcohol)의 하이드록시기(–OH): 산화, 에스터화, 탈수 반응. ④ 카복실산(carboxylic acid)의 카복실기(–COOH): 에스터화, 산-염기 반응. 작용기를 먼저 식별하면 어떤 반응이 일어날지 예측할 수 있습니다.",
          },
          {
            term: "포화와 불포화 탄화수소 (Saturated and Unsaturated Hydrocarbons)",
            def: "포화 탄화수소(saturated hydrocarbon): 탄소-탄소 단결합(C–C)만 가지며, 가능한 최대 수소를 품고 있는 탄화수소. 알케인이 대표적. 일반식 CₙH₂ₙ₊₂. 불포화 탄화수소(unsaturated hydrocarbon): 탄소-탄소 이중결합(C=C, 알켄) 또는 삼중결합(C≡C, 알카인)을 가지며, 같은 탄소 수의 알케인보다 수소 수가 적습니다. 알켄 일반식 CₙH₂ₙ(삼중결합 없을 때). 포화/불포화 판별법: 같은 탄소 수의 알케인과 수소 수를 비교. H₂ 기체와 반응(수소화, hydrogenation)하면 불포화(C=C가 있으면 H₂를 첨가). 또는 브롬수(bromine water)를 탈색시키면 불포화. IB Paper 1에서 분자식만 주고 포화/불포화를 판별하는 문제가 나옵니다.",
          },
        ],
        traps: [
          "알켄의 일반식 CₙH₂ₙ는 고리 구조가 없는 단일 이중결합 알켄에만 적용됩니다. 고리형 알케인(cycloalkane)도 같은 일반식 CₙH₂ₙ을 가지므로, 분자식만 보고 '이 화합물은 알켄이다'라고 단정하면 틀릴 수 있습니다. IB Paper 1에서 분자식 C₄H₈을 보고 무조건 '알켄'이라 답하면 감점 — 사이클로뷰테인(cyclobutane)도 C₄H₈입니다. 반드시 구조식이나 추가 정보를 확인하세요.",
          "IUPAC 명명 시 가장 긴 연속 탄소 사슬(longest continuous carbon chain)을 주 사슬로 선택해야 합니다. 분지된 탄소를 주 사슬에 포함하지 않으면 이름이 달라집니다. 또한 치환기(substituent)에 가장 낮은 번호를 부여하는 방향으로 탄소 번호를 매겨야 합니다. '왼쪽에서 오른쪽'이 항상 옳지 않습니다 — 치환기 위치 번호가 더 작아지는 방향으로 번호를 매기는 것이 IUPAC 원칙입니다.",
        ],
        example:
          "구조 이성질체 및 IUPAC 명명 예시 (IB Paper 2 유형): 분자식 C₄H₁₀에 해당하는 구조 이성질체를 모두 그리고 IUPAC 이름을 쓰시오. 풀이: C₄H₁₀(뷰테인 분자식, CₙH₂ₙ₊₂, n=4)의 구조 이성질체는 두 가지입니다. ① 부테인(butane): 탄소 4개가 일직선으로 연결 — CH₃CH₂CH₂CH₃. ② 2-메틸프로페인(2-methylpropane): 탄소 3개의 주 사슬에 메틸기(–CH₃) 하나가 두 번째 탄소에 붙음 — (CH₃)₃CH. 검증: 두 이성질체 모두 C₄H₁₀이고 구조가 다릅니다. 2-메틸프로페인은 '아이소뷰테인(isobutane)'으로도 불리지만 IB에서는 IUPAC 이름을 요구합니다.",
      },
      {
        title: "IUPAC 명명법 심화 — 알켄·알코올·할로젠화알킬·카복실산 이름 짓기",
        subtitle: "어간 + 접미사(작용기) + 위치 번호 — 이 세 요소를 조합하면 어떤 유기 화합물도 이름 지을 수 있다",
        terms: [
          {
            term: "알켄·알코올·카복실산 명명 규칙 (IUPAC Naming: Alkenes, Alcohols, Carboxylic Acids)",
            def: "공통 원칙: ① 가장 긴 탄소 사슬을 주 사슬로 선택. ② 작용기(이중결합 또는 –OH 또는 –COOH)가 가장 낮은 번호를 갖도록 탄소에 번호를 매김. ③ 분지·치환기는 숫자-이름 형태로 표기하고 알파벳 순서로 나열. 알켄(alkene): 접미사 –ene + 이중결합 위치 번호. 예: CH₂=CHCH₂CH₃ → but-1-ene (C4 사슬, 이중결합 C1–C2). CH₃CH=CHCH₃ → but-2-ene. 알코올(alcohol): 접미사 –ol + –OH 위치 번호. 예: CH₃CH(OH)CH₃ → propan-2-ol. 카복실산(carboxylic acid): –COOH 탄소가 C1이므로 위치 번호 생략. 예: CH₃CH₂COOH → propanoic acid. 할로젠화알킬(halogenoalkane): 할로겐을 접두사(fluoro-, chloro-, bromo-, iodo-)로 표기 + 위치 번호. 예: CH₃CHBrCH₃ → 2-bromopropane.",
          },
          {
            term: "구조 이성질체의 종류 (Types of Structural Isomers)",
            def: "구조 이성질체(structural isomers, constitutional isomers)는 분자식(molecular formula)이 같지만 원자 연결 방식이 다른 화합물입니다. IB Topic 10에서 다루는 주요 유형: ① 사슬 이성질체(chain isomers): 주 사슬 길이가 다름. 예: C₄H₁₀에서 butane vs 2-methylpropane. ② 위치 이성질체(positional isomers): 작용기나 치환기 위치가 다름. 예: C₃H₇Br에서 1-bromopropane vs 2-bromopropane. ③ 기능기 이성질체(functional group isomers): 분자식이 같지만 작용기 자체가 다름. 예: C₂H₆O에서 ethanol(알코올, CH₃CH₂OH) vs methoxymethane(에터, CH₃OCH₃). IB SL에서는 주로 ①②가 출제되고, HL에서는 ③도 포함됩니다. 구조 이성질체는 물리적·화학적 성질이 다릅니다.",
          },
        ],
        traps: [
          "알켄 명명 시 이중결합의 위치 번호를 생략하는 실수가 많습니다. 탄소가 3개 이상인 알켄에서는 이중결합 위치를 반드시 명시해야 합니다. 'propene'은 C=C가 하나뿐이므로 위치 번호 불필요하지만, 'butene'은 but-1-ene 또는 but-2-ene으로 구분해야 합니다. IB Paper 1에서 'CH₃CH=CHCH₃의 IUPAC 이름은?'에 'butene'이라 쓰면 오답입니다 — 'but-2-ene'이 정답입니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ib-chemistry-u10-l2",
    courseId: "ib-chemistry",
    subjectLabel: "IB Chemistry",
    emoji: "⚗️",
    unit: 10,
    lessonNum: 2,
    unitName: "유기 화학 (Organic Chemistry)",
    title: "알케인·알켄 반응 — 자유 라디칼 치환, 친전자성 첨가, 연소",
    subtitle: "알케인은 라디칼로 치환되고, 알켄은 이중결합에 첨가된다 — 두 메커니즘의 시작·전파·종료 단계를 IB 답안지에 정확히 쓸 수 있어야 한다",
    overview:
      "탄화수소 반응 중 IB Paper 2에서 가장 자주 물어보는 두 가지 메커니즘이 있습니다: 알케인의 자유 라디칼 치환(free-radical substitution, FRS)과 알켄의 친전자성 첨가(electrophilic addition). 두 반응은 전혀 다른 방식으로 진행됩니다. 알케인에는 C=C가 없어 친전자체가 공격할 π 전자 구름이 없습니다. 대신 자외선(UV) 에너지로 할로겐 분자(예: Cl₂)의 결합이 동등 분열(homolytic fission)하여 라디칼(radical, 홀전자를 가진 입자)이 생성되고, 이 라디칼이 C–H 결합을 공격하는 연쇄 반응이 일어납니다. 반면 알켄의 C=C 이중결합에는 π 전자가 탄소 핵 외부에 위치하여 친전자체(electrophile, 전자 부족 입자)를 끌어들이는 '미끼' 역할을 합니다. HBr이나 Br₂가 접근하면 π 전자가 한쪽으로 쏠리며 카보카양이온(carbocation) 중간체가 생기고, 친핵체(nucleophile)가 이를 공격해 첨가 산물이 만들어집니다. 마르코브니코프 규칙(Markovnikov's rule)은 비대칭 알켄에서 어느 탄소에 수소가 붙을지 예측하는 경험칙으로, IB HL 수준에서는 더 안정한 카보카양이온이 중간체로 선호된다는 원리로 설명됩니다. 연소(combustion) 반응은 완전 연소(complete combustion)와 불완전 연소(incomplete combustion)의 차이, 그리고 CO와 입자상물질(particulate matter) 등 환경적 함의까지 IB 시험에서 다룹니다. 이 레슨에서는 두 메커니즘의 단계별 반응식과 IB 시험 빈출 함정을 완벽히 정리합니다.",
    objectives: [
      "알케인의 자유 라디칼 치환(free-radical substitution) 반응의 세 단계 — 개시(initiation), 전파(propagation), 종료(termination) — 에서 각 단계의 반응식을 쓰고, 동등 분열(homolytic fission)과 이질 분열(heterolytic fission)의 차이를 설명할 수 있다",
      "알켄의 친전자성 첨가(electrophilic addition) 반응에서 H₂, Br₂, HBr, H₂O(산 촉매)와의 반응 산물과 반응 조건을 쓸 수 있다",
      "마르코브니코프 규칙(Markovnikov's rule)을 이용하여 비대칭 알켄(예: propene)에 HBr이 첨가될 때 주 산물을 예측하고, 더 안정한 카보카양이온 중간체로 이를 설명할 수 있다 (HL)",
      "알케인의 완전 연소(complete combustion) 및 불완전 연소(incomplete combustion) 반응식을 쓰고, 불완전 연소 산물(CO, C)의 환경적·보건적 위험을 설명할 수 있다",
    ],
    formulas: [
      "완전 연소: CₓHᵧ + (x + y/4)O₂ → xCO₂ + (y/2)H₂O",
      "알켄 수소화: C=C + H₂ → C–C  (Ni 촉매, 150°C)",
      "알켄 + Br₂: C=C + Br₂ → CBr–CBr  (브롬 첨가; 브롬수 탈색)",
      "알케인 FRS (전파): Cl• + CH₄ → HCl + CH₃•  /  CH₃• + Cl₂ → CH₃Cl + Cl•",
    ],
    sections: [
      {
        title: "자유 라디칼 치환 (Free-Radical Substitution) — 개시·전파·종료 세 단계",
        subtitle: "UV 빛 한 줄기가 Cl–Cl 결합을 쪼개는 순간 연쇄 반응이 시작된다 — 각 단계의 입자와 결합 변화를 빠짐없이 써야 한다",
        terms: [
          {
            term: "동등 분열과 라디칼 (Homolytic Fission and Radicals)",
            def: "공유 결합이 끊어지는 방식은 두 가지입니다. 동등 분열(homolytic fission): 결합 전자 한 쌍이 각 원자에 하나씩 나뉘어 각각 홀전자(unpaired electron)를 가진 라디칼(radical)이 생성됩니다. 표기: Cl : Cl → Cl• + Cl•  (점이 홀전자를 나타냄). 이질 분열(heterolytic fission): 결합 전자 한 쌍이 한 원자에 몰려 이온(양이온·음이온)이 생성됩니다. 자유 라디칼 치환(FRS)은 동등 분열로 시작합니다. 라디칼은 전기적으로 중성이고 반응성이 매우 높습니다 — 전자 하나를 채우려는 구동력이 연쇄 반응의 원동력입니다. UV 광자 에너지가 Cl₂의 Cl–Cl 결합 에너지보다 크면 개시(initiation) 단계가 시작됩니다.",
          },
          {
            term: "FRS 세 단계 — 개시·전파·종료 (Initiation, Propagation, Termination)",
            def: "메테인(CH₄)과 염소(Cl₂)의 FRS를 예로 들어 단계별로 정리합니다. ① 개시(initiation): UV 빛 → Cl₂ → 2Cl•  (동등 분열; 단 한 번 발생). ② 전파(propagation): Cl• + CH₄ → HCl + CH₃•  /  CH₃• + Cl₂ → CH₃Cl + Cl•  (이 두 반응이 반복되는 연쇄 반응; 라디칼이 재생산됨). 전파 단계가 수천~수백만 번 반복될 수 있어 촉매량의 UV만으로도 대량의 산물이 생깁니다. ③ 종료(termination): 라디칼 두 개가 결합하여 라디칼이 없는 분자 생성. 예: Cl• + Cl• → Cl₂  /  CH₃• + Cl• → CH₃Cl  /  CH₃• + CH₃• → C₂H₆. 종료 단계에서 예상치 않은 부산물(예: 에테인)이 소량 생성됩니다. IB Paper 2에서 전파 단계 반응식을 순서대로 쓰는 문제가 자주 출제됩니다.",
          },
          {
            term: "다치환 산물과 FRS의 선택성 한계 (Polysubstitution and Lack of Selectivity in FRS)",
            def: "CH₄ + Cl₂의 FRS는 CH₃Cl(클로로메테인)에서 멈추지 않습니다. CH₃Cl의 H도 Cl•와 반응하여 CH₂Cl₂(다이클로로메테인), CHCl₃(트라이클로로메테인, 클로로폼), CCl₄(사염화탄소)가 순차적으로 생성됩니다. Cl₂의 양으로 어느 정도 조절할 수 있지만, FRS는 본질적으로 선택성(selectivity)이 낮아 산업적으로 특정 산물만 얻기 어렵습니다. 이것이 FRS의 실용적 한계이며, IB에서 'FRS의 단점'을 서술할 때 다치환 산물의 혼합물이 생성된다는 점을 언급해야 합니다.",
          },
        ],
        traps: [
          "전파(propagation) 단계와 종료(termination) 단계를 혼동하는 실수가 매우 흔합니다. 전파 단계에서는 반응 전후 라디칼 수가 유지(라디칼 하나 소비 → 라디칼 하나 재생)되어야 합니다. 종료 단계에서는 두 라디칼이 결합하여 라디칼이 사라집니다. IB Paper 2에서 전파 반응식을 쓰라고 할 때 'Cl• + CH₃• → CH₃Cl'을 전파라고 쓰면 틀립니다 — 이것은 종료 단계입니다(두 라디칼이 결합해 라디칼 없는 산물 생성). 전파 반응식에는 반드시 시작과 끝에 라디칼(•)이 있어야 합니다.",
          "개시(initiation) 단계는 UV 빛(자외선)이 있어야 하고, 열이나 다른 광원으로는 잘 일어나지 않습니다. 'UV 빛' 또는 'ultraviolet radiation'을 조건으로 명시하지 않으면 IB Paper 2에서 감점입니다. 또한 개시 단계의 반응식에서 UV는 반응 조건으로 화살표 위에 표기하거나 '조건: UV'로 명시해야 하며, 반응식 왼쪽에 'UV + Cl₂'처럼 반응물로 쓰면 안 됩니다.",
        ],
        example:
          "FRS 전파 단계 쓰기 예시 (IB Paper 2 유형): 에테인(C₂H₆)과 염소(Cl₂)의 자유 라디칼 치환 반응에서 전파(propagation) 단계 두 개를 반응식으로 쓰시오. 풀이: 전파 단계 1: Cl• + C₂H₆ → HCl + C₂H₅•  (염소 라디칼이 C–H 결합을 공격, 수소를 빼앗아 HCl 생성, 에틸 라디칼 C₂H₅• 생성). 전파 단계 2: C₂H₅• + Cl₂ → C₂H₅Cl + Cl•  (에틸 라디칼이 Cl₂를 공격, 클로로에테인 C₂H₅Cl 생성, 염소 라디칼 재생). 확인: 각 단계에서 라디칼 하나가 소비되고 라디칼 하나가 생성됩니다 — 연쇄 반응의 핵심 요건을 만족합니다.",
      },
      {
        title: "알켄의 친전자성 첨가 반응과 마르코브니코프 규칙",
        subtitle: "π 전자가 친전자체를 끌어당기는 순간 이중결합이 열린다 — 마르코브니코프: H는 H가 더 많은 탄소에 간다",
        terms: [
          {
            term: "친전자성 첨가 반응 (Electrophilic Addition)",
            def: "알켄의 C=C 이중결합은 σ 결합 위에 π 결합이 추가된 구조입니다. π 전자는 두 탄소 원자 핵 사이의 위아래 공간에 위치하여 외부 친전자체(electrophile, 전자를 찾는 입자)에게 쉽게 노출됩니다. 반응 과정: ① 친전자체(예: HBr의 H⁺ 부분 또는 Br₂)가 π 전자 구름에 의해 끌려 접근. ② π 결합 전자가 친전자체와 새 결합 형성 → 카보카양이온(carbocation) 또는 브롬늄 이온(bromonium ion) 중간체 생성. ③ 친핵체(nucleophile, Br⁻ 등)가 양전하 위치를 공격 → 첨가 산물 완성. 주요 첨가 반응 및 조건: H₂ 첨가(수소화, hydrogenation): Ni 촉매, 150°C → 알케인. Br₂(또는 브롬수) 첨가: 상온, 촉매 없음 → 다이브로모알케인 (브롬수 탈색으로 불포화 판별). HBr 첨가: 상온 → 브로모알케인. H₂O 첨가(수화, hydration): H₃PO₄ 촉매, 300°C, 60 atm → 알코올.",
          },
          {
            term: "마르코브니코프 규칙 (Markovnikov's Rule)",
            def: "비대칭 알켄(두 탄소의 수소 수가 다른 알켄)에 HX(HBr, HCl 등)가 첨가될 때, 수소(H)는 수소가 더 많이 붙어 있는 탄소에 첨가됩니다(이미 수소가 많은 탄소가 더 받는다). 예: 프로펜(propene, CH₂=CHCH₃)에 HBr 첨가 시 주 산물은 2-bromopropane(CH₃CHBrCH₃), 소수 산물은 1-bromopropane(CH₂BrCH₂CH₃). 원리(IB HL): 1단계에서 H⁺가 어느 탄소에 붙느냐에 따라 중간 카보카양이온이 결정됩니다. H⁺가 CH₂= 쪽에 붙으면 2차 카보카양이온(secondary carbocation, 탄소에 알킬기 두 개 연결)이, CH₃CH= 쪽에 붙으면 1차 카보카양이온(primary carbocation)이 생성됩니다. 2차 카보카양이온이 더 안정하므로(주변 알킬기의 초공명/유도 효과) 이 경로가 선호 → 2-bromopropane이 주 산물. IB SL에서는 경험칙으로, HL에서는 카보카양이온 안정성으로 설명합니다.",
          },
        ],
        traps: [
          "알켄의 첨가(addition) 반응과 알케인의 치환(substitution) 반응을 혼동하는 것은 IB 시험의 대표 함정입니다. 알켄에 Br₂를 가하면 첨가 반응이 일어나 diBromoalkane이 생기고, 알케인에 Br₂를 가하면 UV 조건 하에서 치환 반응이 일어나 bromoalkane + HBr이 생깁니다. 반응 유형이 다르면 반응 조건도 달라집니다 — 알켄 + Br₂는 UV 없이 상온에서 진행되지만, 알케인 + Br₂는 UV 없이는 반응이 거의 일어나지 않습니다. IB Paper 1에서 반응 조건과 산물을 묻는 문제에서 이 차이를 혼동하면 반드시 틀립니다.",
          "마르코브니코프 규칙 적용 시 '수소가 더 적은 탄소에 H가 간다'고 거꾸로 외우는 학생이 많습니다. 정확한 표현: 'H는 H가 이미 더 많은 탄소로, X(할로겐)는 H가 더 적은(치환기가 더 많은) 탄소로 간다.' 기억법: '있는 놈이 더 받는다(the richer gets richer).' 프로펜 + HBr에서 CH₂= 쪽은 H가 2개, =CHCH₃ 쪽은 H가 1개 → H는 CH₂= 쪽(H 더 많은)으로 가므로 주 산물은 2-bromopropane입니다.",
        ],
        example:
          "친전자성 첨가 반응 산물 예측 예시 (IB Paper 2 유형): 프로펜(propene, CH₃CH=CH₂)에 HBr이 첨가될 때 주 산물의 구조식과 IUPAC 이름을 쓰고, 마르코브니코프 규칙으로 설명하시오. 풀이: 프로펜의 이중결합 탄소는 CH₃CH=(H 1개)와 =CH₂(H 2개). 마르코브니코프 규칙에 따라 H는 H가 더 많은 =CH₂ 탄소로, Br은 H가 더 적은 =CHCH₃ 탄소로 첨가됩니다. 주 산물: CH₃CHBrCH₃ → 2-bromopropane. IB HL 설명: H⁺가 =CH₂에 붙으면 CH₃CH⁺CH₃(2차 카보카양이온, 더 안정)가 생성되고, H⁺가 =CHCH₃에 붙으면 CH₃CH₂CH₂⁺(1차 카보카양이온, 덜 안정)가 생성됩니다. 더 안정한 2차 카보카양이온을 거친 경로가 선호되어 2-bromopropane이 주 산물입니다.",
      },
    ],
  },
  {
    lessonId: "ib-chemistry-u10-l3",
    courseId: "ib-chemistry",
    subjectLabel: "IB Chemistry",
    emoji: "⚗️",
    unit: 10,
    lessonNum: 3,
    unitName: "유기 화학 (Organic Chemistry)",
    title: "알코올 산화·에스터화, 할로젠화알킬 친핵성 치환, 첨가 중합",
    subtitle: "알코올은 산화되어 알데하이드·케톤·카복실산이 되고, 카복실산과 알코올이 만나면 에스터가 된다 — 중합은 단량체의 이중결합이 열리며 고분자가 되는 과정이다",
    overview:
      "알코올(alcohol)은 –OH 작용기 덕분에 산화·에스터화·탈수 등 다양한 반응의 출발점이 됩니다. 산화(oxidation) 반응에서 1차 알코올(primary alcohol)은 산화제(oxidising agent, 예: 산성 KMnO₄ 또는 산성 K₂Cr₂O₇) 과잉 하에서 카복실산(carboxylic acid)까지 산화되지만, 산화제를 정확히 조절하면 알데하이드(aldehyde) 단계에서 증류로 분리할 수 있습니다. 2차 알코올(secondary alcohol)은 케톤(ketone)으로만 산화되며 더 이상 산화되지 않습니다. 3차 알코올(tertiary alcohol)은 산화되지 않습니다 — 붙어있는 알킬기가 산화를 방해하기 때문입니다. 에스터화(esterification)는 카복실산과 알코올이 산 촉매(H₂SO₄) 하에서 탈수 축합하여 에스터(-COO-)와 물을 생성하는 가역 반응입니다. 향기로운 과일 향의 대부분이 에스터 화합물입니다. 할로젠화알킬(halogenoalkane)의 친핵성 치환(nucleophilic substitution, Sₙ)은 OH⁻, CN⁻, NH₃ 등 친핵체가 C–X 결합을 공격하여 X를 대체하는 반응입니다. 첨가 중합(addition polymerization)은 알켄 단량체(monomer)의 C=C가 반복적으로 열려 긴 사슬 고분자(polymer)를 만드는 반응으로, 에텐→폴리에텐(polyethene, PE), 클로로에텐→PVC, 스타이렌→폴리스타이렌 등이 대표적입니다. 이 레슨에서는 이 세 가지 반응 유형의 조건·산물·반응식을 IB Paper 2 수준에서 완벽히 정리합니다.",
    objectives: [
      "1차·2차·3차 알코올(primary, secondary, tertiary alcohol)을 정의하고, 산화제(산성 KMnO₄ 또는 산성 K₂Cr₂O₇)를 사용했을 때 각각의 산화 산물 — 1차: 알데하이드 → 카복실산, 2차: 케톤, 3차: 산화 안 됨 — 을 예측하고 반응식을 쓸 수 있다",
      "카복실산과 알코올의 에스터화(esterification) 반응 조건(H₂SO₄ 촉매, 가열)과 산물(에스터 + 물)을 쓰고, 에스터의 IUPAC 이름을 지을 수 있다",
      "할로젠화알킬의 친핵성 치환(nucleophilic substitution) 반응에서 OH⁻, CN⁻, NH₃ 친핵체와의 반응 산물을 쓰고, C–X 결합의 극성이 친핵체의 공격을 유도하는 원리를 설명할 수 있다",
      "알켄 단량체로부터의 첨가 중합(addition polymerization) 반응식을 쓰고, 반복 단위(repeat unit)를 포함한 고분자 구조를 그릴 수 있다",
    ],
    formulas: [
      "에스터화: R–COOH + R'–OH ⇌ R–COO–R' + H₂O  (H₂SO₄ 촉매, 가역)",
      "첨가 중합: n CH₂=CHX → –[CH₂–CHX]ₙ–",
      "1차 알코올 산화: R–CH₂OH → (산화제 조절) R–CHO → (산화제 과잉) R–COOH",
      "2차 알코올 산화: R–CHOH–R' → R–CO–R' (케톤; 더 이상 산화 안 됨)",
    ],
    sections: [
      {
        title: "알코올 산화와 에스터화 — 알코올이 참여하는 두 가지 핵심 반응",
        subtitle: "1·2·3차 알코올을 구분하는 순간 산화 산물이 결정된다 — 에스터화는 가역이므로 산 촉매와 조건도 함께 기억하라",
        terms: [
          {
            term: "1차·2차·3차 알코올의 산화 (Oxidation of Primary, Secondary, Tertiary Alcohols)",
            def: "알코올의 차수(degree): C–OH 탄소에 직접 연결된 다른 탄소 수로 결정. 1차 알코올(primary, –OH 탄소에 탄소 1개): R–CH₂OH. 예: ethanol(CH₃CH₂OH). 2차 알코올(secondary, –OH 탄소에 탄소 2개): R–CHOH–R'. 예: propan-2-ol(CH₃CHOHCH₃). 3차 알코올(tertiary, –OH 탄소에 탄소 3개): R₃C–OH. 예: 2-methylpropan-2-ol. 산화 반응 결과: 1차 알코올 + 산화제 소량(증류 조건) → 알데하이드(aldehyde, –CHO). 1차 알코올 + 산화제 과잉 → 카복실산(carboxylic acid, –COOH). 2차 알코올 + 산화제 → 케톤(ketone, C=O, 사슬 중간). 3차 알코올 → 산화 안 됨(산화될 C–H 결합이 C–OH 탄소에 없음). 산화제: 산성화된 K₂Cr₂O₇ (오렌지 → 초록 색 변화로 확인 가능) 또는 산성화된 KMnO₄.",
          },
          {
            term: "에스터화 반응과 에스터 명명 (Esterification and Naming Esters)",
            def: "에스터화(esterification): 카복실산 + 알코올 ⇌ 에스터 + 물. 조건: 진한 황산(H₂SO₄) 촉매, 가열. 이 반응은 가역(reversible)이므로 평형을 생성물 쪽으로 이동시키려면 물을 제거하거나 반응물 중 하나를 과량 사용합니다. 에스터 명명: 알코올 유래 부분 이름(alkyl-, 예: ethyl) + 카복실산 유래 부분 이름(-ate, 예: ethanoate). 예: CH₃COOH(아세트산/에탄산) + CH₃CH₂OH(에탄올) → CH₃COOCH₂CH₃(에틸 에탄산에스터, ethyl ethanoate) + H₂O. 에스터의 작용기: –COO– (에스터 결합, ester linkage). 에스터는 과일·꽃향기의 주성분으로 식품·향수 산업에서 활용됩니다. IB Paper 2에서 에스터 반응식 작성과 IUPAC 이름 짓기 모두 출제됩니다.",
          },
          {
            term: "할로젠화알킬의 친핵성 치환 (Nucleophilic Substitution of Halogenoalkanes)",
            def: "할로젠화알킬(halogenoalkane, R–X)에서 C–X 결합은 할로겐(X)의 높은 전기음성도로 인해 탄소가 δ+, 할로겐이 δ- 극성을 가집니다. 친핵체(nucleophile, 전자쌍을 가진 전자 부유 입자)가 δ+ 탄소를 공격하여 X를 밀어내고 새로운 결합을 형성합니다. 주요 반응: ① R–X + NaOH(aq) → R–OH + NaX  (가열; 알코올 생성). ② R–X + KCN(알코올용매) → R–CN + KX  (가열; 나이트릴 생성, 탄소 사슬 길어짐). ③ R–X + NH₃(과량, 에탄올용매, 밀폐 용기) → R–NH₂ + HX  (아민 생성). 할로겐의 반응성: C–I < C–Br < C–Cl < C–F 순으로 결합 에너지가 커져(결합이 강해져) 반응성은 감소. 따라서 아이오도알케인(iodoalkane, R–I)이 가장 반응성 높음. IB Paper 2에서 친핵체를 식별하고 산물을 쓰는 문제가 출제됩니다.",
          },
        ],
        traps: [
          "알데하이드(aldehyde)와 케톤(ketone)을 산화 반응 산물로 혼동하는 것이 가장 흔한 실수입니다. 알데하이드는 1차 알코올의 1단계 산화 산물이며 작용기 –CHO가 사슬 끝에 위치합니다. 케톤은 2차 알코올의 산화 산물이며 작용기 C=O가 사슬 중간에 위치합니다. 두 물질 모두 C=O를 가지지만 알데하이드는 추가 산화(→ 카복실산)가 가능하고 케톤은 불가합니다. IB Paper 2에서 '2차 알코올의 산화 산물'을 카복실산으로 쓰면 즉시 오답입니다.",
          "에스터화(esterification)는 가역 반응(reversible reaction)임을 잊고 단방향 화살표(→)를 쓰면 IB에서 감점입니다. 반드시 ⇌ (가역 화살표)를 사용하거나 '평형 반응'임을 명시해야 합니다. 또한 산 촉매(H₂SO₄)와 가열 조건을 반응식 위나 조건란에 표기해야 합니다. 조건을 빠뜨리면 부분 점수를 잃습니다.",
        ],
        example:
          "알코올 산화 및 에스터화 종합 예시 (IB Paper 2 유형): ① propan-1-ol(1-프로판올, CH₃CH₂CH₂OH)을 산성 K₂Cr₂O₇ 과잉으로 처리했을 때의 최종 산물의 구조식과 IUPAC 이름을 쓰시오. 풀이: propan-1-ol은 1차 알코올 → 산화제 과잉 → propanoic acid(프로페인산, CH₃CH₂COOH). 색 변화: K₂Cr₂O₇ 오렌지 → 초록(Cr³⁺ 생성). ② propanoic acid와 ethanol로부터 에스터를 합성하는 반응식을 쓰고, 생성된 에스터의 IUPAC 이름을 쓰시오. 풀이: CH₃CH₂COOH + CH₃CH₂OH ⇌ CH₃CH₂COOCH₂CH₃ + H₂O  (조건: 진한 H₂SO₄, 가열). 에스터의 이름: ethyl propanoate (알코올→ethyl, 카복실산→propanoate).",
      },
      {
        title: "첨가 중합 — 단량체의 이중결합이 열려 고분자가 되는 과정",
        subtitle: "n개의 CH₂=CHX가 열려 –[CH₂–CHX]ₙ–가 된다 — 반복 단위를 대괄호와 n으로 표기하는 규칙을 정확히 따라야 한다",
        terms: [
          {
            term: "첨가 중합 (Addition Polymerization)",
            def: "첨가 중합(addition polymerization)은 C=C 이중결합을 가진 단량체(monomer) 분자들이 이중결합을 열면서 서로 공유 결합을 형성해 긴 사슬 고분자(polymer)를 만드는 반응입니다. 특징: ① 부산물(by-product) 없음 — 단량체의 모든 원자가 고분자에 포함됨. ② 이중결합(C=C)이 단결합(C–C)으로 변환됨. 반응식 표기: n CH₂=CHX → –[CH₂–CHX]ₙ– (반복 단위를 대괄호 안에, n을 아래첨자로). 주요 예시: 에텐(ethene, CH₂=CH₂) → 폴리에텐(poly(ethene), PE, 플라스틱 봉지). 클로로에텐(chloroethene = vinyl chloride, CH₂=CHCl) → PVC(폴리염화바이닐, 파이프). 프로펜(propene, CH₂=CHCH₃) → 폴리프로펜(poly(propene), PP, 용기). 스타이렌(styrene, CH₂=CH–C₆H₅) → 폴리스타이렌(PS, 발포 스타이로폼). IB Paper 2에서 단량체 구조로 고분자 반복 단위를 그리거나, 역으로 고분자 구조로 단량체를 추론하는 두 방향 모두 출제됩니다.",
          },
          {
            term: "첨가 중합과 축합 중합의 구별 (Addition vs Condensation Polymerization)",
            def: "IB Topic 10 SL에서는 첨가 중합(addition polymerization)만 다루고, 축합 중합(condensation polymerization, 나일론·폴리에스터 등)은 Topic B(HL Option) 또는 HL 심화 내용에서 다룹니다. 두 중합의 핵심 차이: 첨가 중합: 부산물 없음, 단량체에 C=C 필요. 축합 중합: 부산물(주로 H₂O) 생성, 단량체에 두 종류의 작용기 필요(예: –NH₂와 –COOH). IB Paper 1에서 '부산물을 생성하는 중합 반응은?'라는 문제에서 첨가 중합을 선택하면 오답입니다. SL 수준에서는 이 구분만 알면 충분합니다.",
          },
        ],
        traps: [
          "첨가 중합의 반응식에서 반복 단위를 대괄호 없이 쓰거나 n 표기를 잘못하면 IB Paper 2에서 감점입니다. 올바른 표기: n CH₂=CH₂ → –[CH₂–CH₂]ₙ–  (또는 (–CH₂–CH₂–)ₙ). 단량체의 이중결합(C=C)은 반복 단위에서 단결합(C–C)이 됩니다 — 이 변환을 구조식에서 명확히 보여야 합니다. 또한 고분자 사슬 양 끝에 결합선(–)을 표기하여 사슬이 계속 연장됨을 나타내야 합니다.",
          "고분자 구조로부터 단량체를 역추론할 때, 반복 단위의 C–C 단결합 하나를 C=C 이중결합으로 '되돌리면' 단량체가 됩니다. PVC의 반복 단위 –[CH₂–CHCl]ₙ–에서 단량체는 CH₂=CHCl(클로로에텐, vinyl chloride)입니다. 이 역방향 추론을 고분자 구조를 '분리한다'고 생각하면: 반복 단위 내 탄소 사슬의 가운데 C–C 결합을 C=C로 바꾸면 단량체가 됩니다. IB Paper 2에서 고분자 구조를 주고 단량체를 그리라는 문제에 단량체 대신 이량체(dimer)를 그리는 실수가 자주 일어납니다.",
        ],
        example:
          "첨가 중합 반응식 쓰기와 역추론 예시 (IB Paper 2 유형): ① 프로펜(propene, CH₃CH=CH₂)으로부터 첨가 중합 반응식을 쓰고, 반복 단위를 구조식으로 나타내시오. 풀이: n CH₂=CHCH₃ → –[CH₂–CHCH₃]ₙ–  (폴리프로펜, poly(propene)). 반복 단위: –CH₂–CH(CH₃)– (대괄호와 n 표기 필수). 이중결합이 단결합으로 변환됨을 확인. ② 다음 고분자의 반복 단위로부터 단량체를 그리시오: –[CH₂–CF₂]ₙ–. 풀이: 반복 단위의 C–C 단결합을 C=C로 되돌리면 단량체 = CH₂=CF₂ (1,1-difluoroethene, 또는 vinylidene fluoride). 이 단량체가 중합하면 PVDF(폴리불화비닐리덴) 고분자가 만들어집니다.",
      },
    ],
  },
];
