/**
 * Core Notes 한국어 스토리텔링 버전 — IB Chemistry Unit 9 (산화·환원).
 * IB DP Chemistry SL/HL 기준 실제 내용을 바탕으로 일타강사 내러티브로 작성.
 * 용어는 "한국어 (English)" 병기 — IB 시험은 영어로 보니까.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const IB_CHEMISTRY_U9_KO: CoreNote[] = [
  {
    lessonId: "ib-chemistry-u9-l1",
    courseId: "ib-chemistry",
    subjectLabel: "IB Chemistry",
    emoji: "⚗️",
    unit: 9,
    lessonNum: 1,
    unitName: "산화·환원 (Redox)",
    title: "산화·환원 정의와 산화수 — OIL RIG로 잊을 수 없게, 산화수 규칙으로 틀리지 않게",
    subtitle: "산화는 전자를 잃는 것(OIL), 환원은 전자를 얻는 것(RIG) — 산화수 변화로 산화제·환원제를 정확히 식별하는 것이 IB Redox 문제의 절반이다",
    overview:
      "산화·환원(oxidation-reduction, redox) 반응은 화학에서 가장 광범위하게 적용되는 개념 중 하나입니다. 처음에 과학자들은 산화를 '산소를 얻는 것'으로, 환원을 '산소를 잃는 것'으로만 이해했습니다. 철이 녹스는 반응(4Fe + 3O₂ → 2Fe₂O₃)이 그 전형적 예였죠. 그러나 산소가 전혀 없는 반응 — 예컨대 Zn이 CuSO₄ 수용액 속에서 Cu를 밀어내는 반응 — 에서도 전자 이동이 일어난다는 것이 밝혀지면서, 정의가 확장되었습니다: '산화 = 전자 잃음(loss of electrons)', '환원 = 전자 얻음(gain of electrons)'. 이것을 기억하는 가장 유명한 암기법이 바로 OIL RIG입니다 — Oxidation Is Loss, Reduction Is Gain. 한편 전자 이동을 직접 추적하기 어려운 공유결합 화합물에서는 산화수(oxidation state / oxidation number)라는 가상의 전하를 부여하여 산화·환원을 판별합니다. 산화수가 증가하면 산화, 감소하면 환원입니다. 이 레슨에서는 OIL RIG 정의, 산화수 계산 규칙 7가지, 산화제(oxidising agent)와 환원제(reducing agent)의 식별, 그리고 반응성 계열(reactivity series)을 이용한 치환 반응 예측까지 IB SL/HL 수준에서 완벽히 정리합니다.",
    objectives: [
      "OIL RIG를 이용하여 산화를 '전자 잃음(loss of electrons)', 환원을 '전자 얻음(gain of electrons)'으로 정의하고, 주어진 반쪽 반응식(half-equation)에서 산화와 환원을 식별할 수 있다",
      "산화수 계산 7가지 규칙을 적용하여 분자 및 다원자 이온 속 각 원소의 산화수를 결정하고, 산화수 변화로부터 어떤 원소가 산화되고 어떤 원소가 환원되었는지 판단할 수 있다",
      "산화제(oxidising agent)는 다른 물질을 산화시키면서 자신은 환원되고, 환원제(reducing agent)는 다른 물질을 환원시키면서 자신은 산화됨을 설명하고, 반응식에서 산화제와 환원제를 각각 올바르게 지목할 수 있다",
      "반응성 계열(reactivity series)을 이용하여 금속 치환 반응(displacement reaction)의 가능 여부를 예측하고, '더 반응성 큰 금속이 덜 반응성 큰 금속 이온을 치환한다'는 원리를 산화수 변화로 설명할 수 있다",
    ],
    formulas: [
      "OIL RIG: Oxidation Is Loss (of electrons), Reduction Is Gain (of electrons)",
      "산화: 산화수 증가 (oxidation state increases)",
      "환원: 산화수 감소 (oxidation state decreases)",
      "단원소 물질의 산화수 = 0; 단원자 이온의 산화수 = 이온 전하; 화합물의 산화수 합 = 0; 다원자 이온의 산화수 합 = 이온 전하",
    ],
    sections: [
      {
        title: "OIL RIG와 산화수 규칙 — 전자 이동을 숫자로 추적하라",
        subtitle: "산화수 변화가 없으면 redox 반응이 아니다 — 7가지 규칙을 순서대로 적용하면 어떤 화합물이든 풀린다",
        terms: [
          {
            term: "OIL RIG — 산화와 환원 정의 (Oxidation and Reduction Definitions)",
            def: "산화(oxidation): 원자·이온·분자가 전자를 잃는(lose electrons) 과정. 산화수가 증가합니다. 환원(reduction): 원자·이온·분자가 전자를 얻는(gain electrons) 과정. 산화수가 감소합니다. 암기법 OIL RIG: Oxidation Is Loss of electrons, Reduction Is Gain of electrons. 예시 반쪽 반응식: Zn → Zn²⁺ + 2e⁻ (산화, 전자를 잃음, 산화수 0 → +2, 증가). Cu²⁺ + 2e⁻ → Cu (환원, 전자를 얻음, 산화수 +2 → 0, 감소). 중요: 산화와 환원은 항상 동시에 일어납니다(동시 과정, simultaneous processes). 한쪽이 전자를 잃으면 다른 쪽이 반드시 그 전자를 얻습니다. 이처럼 전자 이동이 연결된 반응 전체를 산화-환원 반응(redox reaction)이라고 합니다.",
          },
          {
            term: "산화수 계산 규칙 (Rules for Oxidation States)",
            def: "IB에서 사용하는 산화수 계산 규칙 — 위에서 아래 순서로 우선 적용: ① 단원소 물질(Na, O₂, Fe 등)의 산화수 = 0. ② 단원자 이온의 산화수 = 이온 전하 (Na⁺ = +1, Fe³⁺ = +3, Cl⁻ = −1). ③ 화합물에서 F의 산화수는 항상 −1. ④ 화합물에서 O의 산화수는 일반적으로 −2 (예외: 과산화물 H₂O₂에서 −1, OF₂에서 +2). ⑤ 화합물에서 H의 산화수는 일반적으로 +1 (예외: 금속 수소화물 NaH에서 −1). ⑥ 화합물 내 모든 원소의 산화수 합 = 0. ⑦ 다원자 이온 내 모든 원소의 산화수 합 = 이온의 전체 전하. 예: Cr₂O₇²⁻에서 Cr의 산화수 계산 → 2x + 7(−2) = −2 → 2x = 12 → x = +6. MnO₄⁻에서 Mn의 산화수 → x + 4(−2) = −1 → x = +7.",
          },
          {
            term: "산화제와 환원제 (Oxidising Agent and Reducing Agent)",
            def: "산화제(oxidising agent): 다른 물질을 산화시키는 물질. 자신은 전자를 얻어 환원됩니다. 즉 자신의 산화수가 감소합니다. 흔한 산화제: O₂, Cl₂, MnO₄⁻(과망간산 이온), Cr₂O₇²⁻(다이크로뮴산 이온), H₂O₂, Fe³⁺. 환원제(reducing agent): 다른 물질을 환원시키는 물질. 자신은 전자를 잃어 산화됩니다. 즉 자신의 산화수가 증가합니다. 흔한 환원제: Zn, Fe, H₂, CO, I⁻, SO₂. 예: Zn(s) + CuSO₄(aq) → ZnSO₄(aq) + Cu(s). Zn: 산화수 0 → +2 (산화됨, 환원제). Cu²⁺: 산화수 +2 → 0 (환원됨, 산화제). 기억 방법: '산화제는 환원된다(oxidising agent is reduced).' 헷갈리면 OIL RIG를 먼저 쓰고 방향을 확인하세요.",
          },
        ],
        traps: [
          "산화수와 실제 전하(actual charge)를 혼동하면 안 됩니다. 예: CH₄에서 C의 산화수는 −4이지만, 탄소가 실제 C⁴⁻ 이온으로 존재한다는 뜻이 아닙니다 — 산화수는 공유결합에서 전기음성도 차이에 따라 부여한 '가상의' 전하일 뿐입니다. IB Paper 1에서 '산화수 = 실제 이온 전하'라고 혼동하면 CH₄ 관련 문제에서 반드시 틀립니다. 또한 O의 산화수는 '항상 −2'가 아님에 주의하세요 — 과산화물(H₂O₂)에서는 −1, F₂O에서는 +2입니다.",
          "산화제(oxidising agent)와 산화(oxidation)를 혼동하면 IB Paper 2 서술 문제에서 감점입니다. 산화제는 자신이 환원되면서 상대방을 산화시킵니다. '산화제는 산화된다'고 쓰면 틀립니다. 항상 '산화제는 환원된다, 환원제는 산화된다'로 기억하세요. 산화수 변화의 방향(증가 vs 감소)으로 확인하는 습관을 들이면 실수를 방지할 수 있습니다.",
        ],
        example:
          "산화수 결정 및 산화제·환원제 식별 예시 (IB Paper 2 유형): 반응 2MnO₄⁻(aq) + 5H₂C₂O₄(aq) + 6H⁺(aq) → 2Mn²⁺(aq) + 10CO₂(g) + 8H₂O(l)에서 산화제와 환원제를 식별하고 각 원소의 산화수 변화를 쓰시오. 풀이: MnO₄⁻에서 Mn: x + 4(−2) = −1 → Mn = +7. 생성물 Mn²⁺에서 Mn = +2. 즉 Mn: +7 → +2 (산화수 감소 → 환원됨 → MnO₄⁻가 산화제). H₂C₂O₄에서 C: 2x + 2(+1) + 4(−2) = 0 → 2x = 6 → C = +3. 생성물 CO₂에서 C = +4 (산화수 증가 → 산화됨 → H₂C₂O₄가 환원제). 결론: 산화제 = MnO₄⁻(보라색→거의 무색), 환원제 = H₂C₂O₄.",
      },
      {
        title: "반응성 계열과 금속 치환 반응 — 더 강한 금속이 약한 금속 이온을 밀어낸다",
        subtitle: "반응성(reactivity)이 높은 금속일수록 전자를 더 잘 잃는다 — 이것이 치환 반응의 방향을 결정하는 전부다",
        terms: [
          {
            term: "반응성 계열 (Reactivity Series)",
            def: "반응성 계열(reactivity series / activity series)은 금속을 전자를 잃는 경향(산화되는 경향)이 강한 순서로 나열한 것입니다. IB에서 필수 암기 순서(위→아래 = 반응성 감소): K > Na > Ca > Mg > Al > Zn > Fe > Ni > Sn > Pb > H₂ > Cu > Ag > Au. 반응성이 클수록: ① 찬물과 반응(K, Na, Ca). ② 뜨거운 물·증기와 반응(Mg). ③ 산과 격렬히 반응(Mg, Al, Zn, Fe). ④ 산과 천천히 반응(Ni, Sn, Pb). ⑤ 묽은 산과 반응 안 함(Cu, Ag, Au). 치환 반응 예측: '더 반응성 큰 금속(A)이 덜 반응성 큰 금속의 이온(B²⁺)을 수용액 또는 용융염에서 치환할 수 있다.' A + B²⁺ → A²⁺ + B. 이 반응에서 A가 환원제, B²⁺가 산화제입니다.",
          },
          {
            term: "금속 치환 반응과 redox (Displacement Reactions as Redox)",
            def: "금속 치환 반응(metal displacement reaction)은 전형적인 redox 반응입니다. 예 ①: Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s). Fe(반응성 Fe > Cu): Fe의 산화수 0 → +2 (산화, 환원제). Cu²⁺: 산화수 +2 → 0 (환원, 산화제). 예 ②: Mg(s) + 2HCl(aq) → MgCl₂(aq) + H₂(g). Mg: 0 → +2 (산화). H⁺: +1 → 0 (환원). 비금속 치환도 가능: Cl₂(g) + 2KI(aq) → 2KCl(aq) + I₂(aq). Cl₂(더 강한 산화제)가 I⁻를 I₂로 산화시킵니다. 할로겐의 반응성(산화력): F₂ > Cl₂ > Br₂ > I₂. 따라서 Cl₂는 Br⁻와 I⁻를 치환하지만, I₂는 Cl⁻나 Br⁻를 치환하지 못합니다.",
          },
        ],
        traps: [
          "치환 반응의 방향을 반대로 쓰는 것이 IB Paper 1에서 가장 흔한 실수입니다. '덜 반응성 큰 금속이 더 반응성 큰 금속 이온을 치환한다'는 것은 불가능합니다. 예: Cu + ZnSO₄(aq) → 반응 없음 (Cu의 반응성 < Zn). 반드시 '반응성 큰 쪽이 반응성 작은 이온을 밀어낸다'는 방향을 확인하세요. 반응성 계열에서 수소(H₂)의 위치도 중요합니다 — H₂보다 반응성 큰 금속만 산과 반응하여 H₂를 발생시킵니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ib-chemistry-u9-l2",
    courseId: "ib-chemistry",
    subjectLabel: "IB Chemistry",
    emoji: "⚗️",
    unit: 9,
    lessonNum: 2,
    unitName: "산화·환원 (Redox)",
    title: "반쪽 반응식 균형 맞추기와 전기화학 전지 — 전자 이동을 회로로 만들면 전기가 된다",
    subtitle: "반쪽 반응식(half-equations)을 산성·염기성 조건에서 균형 맞추는 법, 그리고 볼타 전지(voltaic cell)의 구조·전극 기호·EMF 계산까지 한 번에",
    overview:
      "redox 반응을 '반쪽 반응식(half-equation)'으로 분리하면, 전자 이동의 방향과 양이 명확해집니다. 반쪽 반응식 균형 맞추기는 IB Paper 3(HL)에서 단골 문제이며, SL에서도 주어진 반쪽 반응식을 이용해 전체 이온 반응식을 구성하는 문제가 출제됩니다. 특히 산성 수용액(acidic solution)에서는 H₂O와 H⁺를 추가하고, 염기성 수용액(basic solution)에서는 H₂O와 OH⁻를 추가하는 과정이 다릅니다. 이것이 많은 학생들이 실수하는 지점입니다. 한편 Luigi Galvani와 Alessandro Volta가 18세기 말 발견한 것처럼, 자발적(spontaneous) redox 반응을 '산화 전극(anode)과 환원 전극(cathode)으로 분리된 회로'에 연결하면 전류(electric current)를 얻을 수 있습니다 — 이것이 볼타 전지(voltaic cell) 또는 갈바니 전지(galvanic cell)입니다. 이 레슨에서는 반쪽 반응식 균형 맞추기 5단계, 볼타 전지의 구조(전극·염다리·전류 방향), 전지 표기법(cell notation), 표준 전극 전위(standard electrode potential, E°)와 EMF 계산, 그리고 스폰타네이티(spontaneity) 판단까지 IB SL/HL 수준에서 완벽히 정리합니다.",
    objectives: [
      "반쪽 반응식 균형 맞추기 5단계(원자 수 맞춤 → O 맞춤(H₂O 추가) → H 맞춤(H⁺ 또는 H₂O 추가) → 전하 맞춤(e⁻ 추가) → e⁻ 수 맞춰 두 반쪽 반응식 합산)를 산성 및 염기성 조건 모두에서 적용할 수 있다",
      "볼타 전지(voltaic/galvanic cell)에서 산화가 일어나는 극을 anode(음극), 환원이 일어나는 극을 cathode(양극)로 정확히 구분하고, 전자·이온·전류의 흐름 방향을 설명할 수 있다",
      "전지 표기법(cell notation: anode | anode solution ‖ cathode solution | cathode)을 읽고 쓰며, 주어진 두 반쪽 반응식으로부터 전지 표기법을 작성할 수 있다",
      "표준 전극 전위(E°) 데이터를 이용하여 E°cell = E°(cathode) − E°(anode)로 표준 기전력(EMF)을 계산하고, E°cell > 0이면 자발적(spontaneous) 반응임을 판단할 수 있다",
    ],
    formulas: [
      "E°cell = E°(환원극, cathode) − E°(산화극, anode)",
      "E°cell > 0 → 자발적(spontaneous) 반응",
      "전지 표기법: 산화극(anode) | 산화극 용액 ‖ 환원극 용액 | 환원극(cathode)",
      "반쪽 반응식 균형: 원자 → O(H₂O) → H(H⁺/OH⁻) → 전하(e⁻) → e⁻ 수 맞춰 합산",
    ],
    sections: [
      {
        title: "반쪽 반응식 균형 맞추기 — 5단계 프로세스",
        subtitle: "H₂O와 H⁺(산성) 또는 OH⁻(염기성)을 어디에 쓸지 헷갈리면, 먼저 산성으로 균형을 맞추고 염기성이면 OH⁻를 양변에 더하라",
        terms: [
          {
            term: "산성 조건에서 반쪽 반응식 균형 맞추기 (Half-equation Balancing in Acidic Solution)",
            def: "산성 수용액에서 반쪽 반응식 균형 맞추기 5단계: ① 반응에 참여하는 원소(O, H 제외)의 원자 수를 맞춥니다. ② O 원자 수: 부족한 쪽에 H₂O를 추가합니다. ③ H 원자 수: 부족한 쪽에 H⁺를 추가합니다(산성 조건). ④ 전체 전하 수: 전하 차이만큼 e⁻를 추가합니다. (산화 반쪽 반응에서는 오른쪽에, 환원 반쪽 반응에서는 왼쪽에 e⁻ 추가.) ⑤ 두 반쪽 반응식에서 e⁻ 수가 같도록 배수를 맞추고 더합니다. 예: MnO₄⁻(aq) → Mn²⁺(aq) (산성). ① Mn 맞춤: 이미 맞음. ② O: 오른쪽에 H₂O 4개 추가 → MnO₄⁻ → Mn²⁺ + 4H₂O. ③ H: 왼쪽에 H⁺ 8개 → 8H⁺ + MnO₄⁻ → Mn²⁺ + 4H₂O. ④ 전하: 왼쪽 (+8−1)=+7, 오른쪽 +2 → 왼쪽에 5e⁻ 추가 → 5e⁻ + 8H⁺ + MnO₄⁻ → Mn²⁺ + 4H₂O. 완성.",
          },
          {
            term: "염기성 조건에서 반쪽 반응식 균형 맞추기 (Half-equation Balancing in Basic Solution)",
            def: "염기성 수용액에서는 산성 조건으로 균형을 맞춘 뒤, 마지막에 OH⁻를 양변에 더하여 H⁺를 중화시키는 방법이 가장 안전합니다. 단계: ① 산성 조건과 동일하게 단계 1–4 진행(H⁺ 사용). ② 양변에 H⁺ 개수만큼 OH⁻를 더합니다: H⁺ + OH⁻ → H₂O로 치환. ③ H₂O를 정리하면 최종 반쪽 반응식이 OH⁻와 H₂O만으로 표현됩니다. 예: MnO₄⁻ → MnO₂ (염기성). 산성 조건 균형 먼저: 3e⁻ + 4H⁺ + MnO₄⁻ → MnO₂ + 2H₂O. 양변에 4OH⁻ 추가: 3e⁻ + 4H₂O + MnO₄⁻ → MnO₂ + 2H₂O + 4OH⁻. H₂O 정리: 3e⁻ + 2H₂O + MnO₄⁻ → MnO₂ + 4OH⁻. 완성. IB HL Paper 3에서 염기성 조건 반쪽 반응식이 자주 출제됩니다.",
          },
          {
            term: "두 반쪽 반응식 합산 (Combining Half-equations into a Full Ionic Equation)",
            def: "두 반쪽 반응식을 전체 이온 반응식으로 합산하는 방법: ① 산화 반쪽 반응식(e⁻를 오른쪽에서 방출)과 환원 반쪽 반응식(e⁻를 왼쪽에서 소비)에서 e⁻ 수가 같도록 배수를 조정합니다. ② 두 반쪽 반응식을 더합니다. ③ 양변에서 공통 항(e⁻, H₂O, H⁺ 등)을 소거합니다. 예: Zn → Zn²⁺ + 2e⁻ (산화) + Cu²⁺ + 2e⁻ → Cu (환원) → Zn + Cu²⁺ → Zn²⁺ + Cu. e⁻가 소거되어 깔끔한 이온 반응식이 완성됩니다. IB Paper 2에서 '이온 반응식을 쓰시오' 문제에서 e⁻가 최종 반응식에 남아있으면 감점입니다.",
          },
        ],
        traps: [
          "산성 조건과 염기성 조건에서 H⁺ 대신 OH⁻를 또는 그 반대를 써서 균형을 맞추면 반쪽 반응식이 틀립니다. 문제에서 'in acidic solution'이라고 명시하면 H⁺와 H₂O만 사용하고, 'in basic/alkaline solution'이라고 명시하면 최종 식에 H⁺가 남아있으면 안 됩니다. IB Paper 3 HL에서 조건을 무시하고 산성 방법만 적용하면 부분 점수조차 잃을 수 있습니다.",
          "반쪽 반응식을 합산할 때 e⁻ 수를 맞추지 않고 그냥 더하면 전하 균형이 깨집니다. 산화 반쪽 반응에서 2e⁻, 환원에서 6e⁻라면, 산화를 3배, 환원을 1배로 맞추거나(또는 LCM = 6으로) 반드시 e⁻ 수를 동일하게 만든 다음 합산해야 합니다. 최종 이온 반응식에서 양변의 전하가 같은지 반드시 검산하세요.",
        ],
        example:
          "반쪽 반응식 균형 + 합산 예시 (IB HL Paper 3 유형): 산성 수용액에서 Cr₂O₇²⁻(aq)와 Fe²⁺(aq)의 반응에 대한 전체 이온 반응식을 쓰시오. 풀이: [환원] Cr₂O₇²⁻ + 14H⁺ + 6e⁻ → 2Cr³⁺ + 7H₂O (Cr: +6→+3, 각 Cr당 3e⁻, 총 6e⁻). [산화] Fe²⁺ → Fe³⁺ + e⁻ (Fe: +2→+3). e⁻ 수 맞추기: 산화 반쪽 반응 × 6 → 6Fe²⁺ → 6Fe³⁺ + 6e⁻. 합산: Cr₂O₇²⁻ + 14H⁺ + 6Fe²⁺ → 2Cr³⁺ + 7H₂O + 6Fe³⁺. e⁻ 소거 확인: 좌변 전하 (−2 + 14 + 12) = +24, 우변 전하 (6 + 18) = +24 — 균형 맞음.",
      },
      {
        title: "볼타 전지 — 자발적 redox 반응을 전기로 바꾸는 장치",
        subtitle: "anode에서 산화, cathode에서 환원 — 전자는 외부 회로로, 이온은 염다리로 — 이 두 흐름을 동시에 그릴 수 있어야 한다",
        terms: [
          {
            term: "볼타 전지 구조 (Structure of a Voltaic/Galvanic Cell)",
            def: "볼타 전지(voltaic cell) / 갈바니 전지(galvanic cell): 자발적 redox 반응의 화학 에너지를 전기 에너지로 전환하는 장치. 구성 요소: ① 두 개의 반쪽 전지(half-cell): 금속 전극이 자신의 이온 수용액에 담겨 있음. 예: Zn 전극 / ZnSO₄(aq), Cu 전극 / CuSO₄(aq). ② 외부 회로(external circuit): 전자(e⁻)가 anode → cathode 방향으로 흐릅니다. ③ 염다리(salt bridge): 두 반쪽 전지 용액을 연결하는 관(KNO₃ 또는 KCl 포화 용액 + 한천(agar)). 역할: 이온을 이동시켜 전기적 중성을 유지합니다. 염다리 없으면 전지 작동 불가. 전극 명칭: anode(산화극): 산화가 일어나는 전극 → 전자를 방출, 전극 질량 감소, 이온 농도 증가. cathode(환원극): 환원이 일어나는 전극 → 전자를 소비, 전극 질량 증가, 이온 농도 감소. Zn-Cu 전지 예: Zn(s) | ZnSO₄(aq) ‖ CuSO₄(aq) | Cu(s).",
          },
          {
            term: "표준 전극 전위와 EMF (Standard Electrode Potential E° and EMF)",
            def: "표준 전극 전위(standard electrode potential, E°): 표준 수소 전극(SHE, E° = 0.00 V)을 기준으로 측정한 각 반쪽 전지의 환원 경향. 조건: 25°C, 1 mol dm⁻³ 이온 농도, 1 atm(기체). E°가 클수록 환원이 잘 됨(더 강한 산화제). E°가 작을수록(또는 음수일수록) 산화가 잘 됨(더 강한 환원제). 예: Cu²⁺ + 2e⁻ → Cu, E° = +0.34 V. Zn²⁺ + 2e⁻ → Zn, E° = −0.76 V. 전지 EMF 계산: E°cell = E°(cathode) − E°(anode) = (+0.34) − (−0.76) = +1.10 V. E°cell > 0 → 자발적(spontaneous). E°cell < 0 → 비자발적(non-spontaneous). IB 시험에서 E° 테이블이 제공되므로 암기보다 올바른 수식 적용이 핵심입니다.",
          },
        ],
        traps: [
          "볼타 전지에서 anode는 음극(negative electrode), cathode는 양극(positive electrode)입니다. 하지만 전해 전지(electrolytic cell)에서는 이것이 반대로 됩니다: anode = 양극(+), cathode = 음극(−). IB Paper 2에서 '볼타 전지 vs 전해 전지'에서 극성을 바꿔 쓰면 즉시 감점입니다. 기억법: 전극 이름(anode=산화, cathode=환원)은 두 전지 모두 동일하지만, 극성(+/−)은 전지 유형에 따라 반전됩니다.",
          "E°cell 계산에서 반쪽 반응식의 배수를 바꿔도 E° 값은 변하지 않습니다. E°는 세기 성질(intensive property)이므로 반쪽 반응식 계수를 2배로 해도 E° 값은 그대로입니다. 예: Zn²⁺ + 2e⁻ → Zn의 E° = −0.76 V이지만, 2Zn²⁺ + 4e⁻ → 2Zn으로 써도 E° = −0.76 V입니다. ΔG = −nFE°에서 n이 바뀌므로 ΔG는 달라지지만 E° 자체는 달라지지 않습니다.",
        ],
        example:
          "볼타 전지 EMF 계산 및 자발성 판단 예시 (IB Paper 2 유형): Fe²⁺/Fe와 Ag⁺/Ag 반쪽 전지로 볼타 전지를 구성할 때 E°cell을 계산하고, 어느 전극이 anode인지 쓰시오. (E°: Fe²⁺ + 2e⁻ → Fe = −0.44 V; Ag⁺ + e⁻ → Ag = +0.80 V). 풀이: E°가 더 낮은 쪽(Fe²⁺/Fe, −0.44 V)이 산화 → anode. E°가 더 높은 쪽(Ag⁺/Ag, +0.80 V)이 환원 → cathode. E°cell = E°(cathode) − E°(anode) = 0.80 − (−0.44) = +1.24 V. E°cell > 0 → 자발적. 전지 표기법: Fe(s) | Fe²⁺(aq) ‖ Ag⁺(aq) | Ag(s).",
      },
    ],
  },
  {
    lessonId: "ib-chemistry-u9-l3",
    courseId: "ib-chemistry",
    subjectLabel: "IB Chemistry",
    emoji: "⚗️",
    unit: 9,
    lessonNum: 3,
    unitName: "산화·환원 (Redox)",
    title: "전해 전지 — 비자발적 redox를 전기로 강제하고, 전기도금으로 완성하라",
    subtitle: "전해 전지(electrolytic cell)에서 anode에 산화, cathode에 환원 — 용융 전해질과 수용액에서 전극 생성물이 다른 이유를 IB 시험에서 틀리지 않게",
    overview:
      "1800년 Alessandro Volta가 전지를 발명한 직후, 영국의 Humphry Davy는 그 전기를 이용해 당시 순수하게 분리할 수 없었던 Na와 K를 처음으로 단리했습니다. 이것이 전기분해(electrolysis)의 첫 번째 위대한 성과입니다. 전해 전지(electrolytic cell)는 볼타 전지와 원리가 반대입니다 — 외부 전원(external power source)이 비자발적(non-spontaneous) redox 반응을 강제로 일으킵니다. 전원의 음극(−)에 연결된 전극이 cathode(환원극)가 되고, 양극(+)에 연결된 전극이 anode(산화극)가 됩니다. 전해 전지의 핵심 질문은 '어떤 이온이 먼저 방전(discharged)되는가?'입니다. 용융 전해질(molten electrolyte)에서는 간단합니다 — 오직 두 종류의 이온만 존재하니까요. 그러나 수용액(aqueous solution)에서는 H₂O가 분해될 수 있어, 선택적 방전(preferential discharge) 규칙을 적용해야 합니다. 전기도금(electroplating)은 전해 전지의 가장 중요한 응용 중 하나로, IB Paper 2 서술형에서 도금 설치 방법, 전극 재질, 전해질 선택을 모두 서술할 수 있어야 합니다. 이 레슨에서는 전해 전지의 원리, 용융·수용액 전해 전극 생성물, 선택적 방전 규칙, 전기도금 설계, 그리고 패러데이 법칙(Faraday's laws)의 정량 계산까지 IB SL/HL 수준에서 완벽히 정리합니다.",
    objectives: [
      "전해 전지(electrolytic cell)에서 외부 전원의 극성과 전극 이름(anode = 산화극 = +극, cathode = 환원극 = −극)의 관계를 설명하고, 볼타 전지와의 anode/cathode 극성 차이를 서술할 수 있다",
      "용융 전해질(NaCl 용융, Al₂O₃ 용융)과 수용액 전해질(NaCl 수용액, CuSO₄ 수용액)에서 각 전극에 생성되는 물질을 예측하고, 수용액에서 선택적 방전 규칙(E° 비교, 농도 영향)을 적용할 수 있다",
      "전기도금(electroplating) 실험 설계에서 도금하려는 물체를 cathode에, 도금 금속(예: Cu)을 anode에 연결하고 도금 금속 이온이 포함된 전해질을 사용해야 하는 이유를 설명할 수 있다",
      "패러데이 법칙(Q = It, n(e⁻) = Q/F)을 이용하여 주어진 전류와 시간으로부터 전극에 석출되는 물질의 몰수 및 질량을 계산할 수 있다",
    ],
    formulas: [
      "Q = I × t  (전하량(C) = 전류(A) × 시간(s))",
      "n(e⁻) = Q / F  (F = 패러데이 상수 = 96 500 C mol⁻¹)",
      "n(석출 물질) = n(e⁻) / z  (z = 반쪽 반응에서 전자 수)",
      "m = n × M  (질량 = 몰수 × 몰질량)",
    ],
    sections: [
      {
        title: "전해 전지의 원리와 전극 생성물 예측",
        subtitle: "용융 전해질은 단순하다 — 수용액에서는 H₂O까지 경쟁한다는 것이 전기분해의 가장 복잡한 부분이다",
        terms: [
          {
            term: "전해 전지 구조와 볼타 전지와의 비교 (Electrolytic Cell vs Voltaic Cell)",
            def: "전해 전지(electrolytic cell): 외부 전원(배터리 등)을 연결하여 비자발적(non-spontaneous) redox 반응을 강제로 일으키는 장치. 전원의 양극(+) → anode(산화극) 연결. 전원의 음극(−) → cathode(환원극) 연결. 볼타 전지와의 핵심 차이: 볼타 전지에서 anode는 음극(−), cathode는 양극(+). 전해 전지에서 anode는 양극(+), cathode는 음극(−). 즉 극성이 정반대입니다 — 하지만 anode=산화, cathode=환원이라는 정의 자체는 두 전지 모두 동일합니다. 전기분해 과정: 이온 용액 속에서 양이온(cation)은 cathode 쪽으로 이동해 환원, 음이온(anion)은 anode 쪽으로 이동해 산화됩니다.",
          },
          {
            term: "용융 전해질 전기분해 (Electrolysis of Molten Electrolytes)",
            def: "용융 전해질에는 전해질의 양이온과 음이온만 존재합니다(H₂O 없음). 따라서 전극 생성물 예측이 단순합니다. 예 ①: NaCl(l) 전기분해. Cathode: Na⁺ + e⁻ → Na(l) (나트륨 금속 석출). Anode: 2Cl⁻ → Cl₂(g) + 2e⁻ (염소 기체 발생). 예 ②: Al₂O₃(l) 전기분해 (Hall-Héroult 공정). Cathode: Al³⁺ + 3e⁻ → Al(l). Anode: 2O²⁻ → O₂(g) + 4e⁻. 중요 맥락: Al₂O₃를 직접 녹이려면 2054°C가 필요하므로, 빙정석(cryolite, Na₃AlF₆)을 혼합하여 녹는점을 약 1000°C로 낮춥니다. 이것이 알루미늄 제련 공정(smelting)의 핵심입니다. IB에서 이 공정의 환경적·경제적 의의도 출제됩니다.",
          },
          {
            term: "수용액 전기분해와 선택적 방전 (Electrolysis of Aqueous Solutions — Preferential Discharge)",
            def: "수용액에서는 전해질 이온 외에 H₂O에서 유래하는 H⁺와 OH⁻도 경쟁적으로 방전될 수 있습니다. 선택적 방전 규칙(preferential discharge rules): Cathode (환원): E°가 더 큰(더 양수인) 이온이 우선 환원됩니다. 단, 이온 농도가 낮으면 H⁺/H₂O가 우선됩니다. Anode (산화): 일반적으로 할로겐 이온(Cl⁻, Br⁻, I⁻)이 OH⁻/H₂O보다 먼저 산화됩니다. 단, 할로겐 이온 농도가 낮으면(또는 묽은 수용액) O₂가 발생합니다. 예 ①: 진한 NaCl 수용액(brine): Cathode: 2H₂O + 2e⁻ → H₂(g) + 2OH⁻ (Na⁺보다 H₂O가 우선, E° 비교). Anode: 2Cl⁻ → Cl₂(g) + 2e⁻ (진한 Cl⁻가 OH⁻/H₂O보다 우선). 예 ②: CuSO₄(aq) (비활성 전극): Cathode: Cu²⁺ + 2e⁻ → Cu(s) (E° +0.34 V > H⁺/H₂ 0.00 V). Anode: 2H₂O → O₂(g) + 4H⁺ + 4e⁻ (SO₄²⁻는 산화되기 어려움).",
          },
        ],
        traps: [
          "볼타 전지와 전해 전지에서 anode와 cathode의 극성(+/−)이 반대임을 혼동하는 것은 IB Paper 2에서 가장 흔한 실수입니다. 볼타 전지: anode = − (전자를 공급하므로 음극). 전해 전지: anode = + (외부 전원 양극에 연결). '아노드는 항상 음극'이라고 외웠다면 지금 당장 수정하세요 — 이 규칙은 볼타 전지에서만 성립합니다. IB Paper 2에서 전해 전지 다이어그램을 그릴 때 anode에 + 표시를 빠뜨리면 감점입니다.",
          "수용액 전기분해에서 anode가 활성(active) 전극인 경우와 비활성(inert) 전극인 경우 결과가 달라집니다. CuSO₄(aq) 전기분해에서 anode가 Cu 금속이면 Cu가 녹아 Cu²⁺가 되고(Cu → Cu²⁺ + 2e⁻), anode가 흑연(graphite)이나 백금(Pt)이면 H₂O가 산화되어 O₂가 발생합니다. IB Paper 2에서 '전극 재질'을 명시하지 않고 답하면 부분 점수 손실이 생기므로, 항상 전극이 활성인지 비활성인지 확인하세요.",
        ],
        example:
          "수용액 전기분해 전극 생성물 예시 (IB Paper 2 유형): 0.5 mol dm⁻³ CuSO₄(aq)를 흑연 전극으로 전기분해할 때, 각 전극에서 생성되는 물질을 쓰고 반쪽 반응식을 제시하시오. 풀이: Cathode(환원): Cu²⁺의 E° = +0.34 V, H⁺/H₂의 E° = 0.00 V → Cu²⁺가 더 쉽게 환원됨 → Cu²⁺ + 2e⁻ → Cu(s) (구리 석출). Anode(산화): SO₄²⁻는 매우 안정하여 산화되기 어렵고, 흑연은 비활성 전극 → H₂O가 산화됨 → 2H₂O → O₂(g) + 4H⁺(aq) + 4e⁻ (산소 기체 발생). 관찰: 시간이 지남에 따라 cathode에 적갈색 Cu가 석출되고, 용액의 파란색(Cu²⁺)이 점점 옅어집니다.",
      },
      {
        title: "전기도금과 패러데이 법칙 — 정량 계산으로 완성하라",
        subtitle: "도금량 = 전류 × 시간 / 패러데이 상수 / 전자 수 — 단위 통일만 확인하면 IB 계산 문제는 반드시 맞는다",
        terms: [
          {
            term: "전기도금 설계 (Electroplating Design)",
            def: "전기도금(electroplating): 전해 전지를 이용하여 물체 표면에 금속 박막을 입히는 기술. 설계 원리: ① 도금받을 물체(피도금체) → cathode(환원극)에 연결. ② 도금 금속(예: Cu, Ag, Ni) → anode(산화극)에 연결(활성 전극). ③ 도금 금속 이온이 포함된 전해질 사용(예: Cu 도금이면 CuSO₄(aq)). ④ anode의 도금 금속이 녹아 이온을 보충하므로, 전해질 농도가 유지됩니다. 반쪽 반응식(Cu 도금 예): Cathode: Cu²⁺ + 2e⁻ → Cu(s) (피도금체에 Cu 석출). Anode: Cu(s) → Cu²⁺(aq) + 2e⁻ (anode Cu 전극이 녹아 이온 보충). 응용: 자동차 부품(Ni/Cr 도금), 보석(Au/Ag 도금), 식기류(Ag 도금). IB Paper 2에서 전기도금 실험 설계를 다이어그램과 함께 서술하는 문제가 자주 출제됩니다.",
          },
          {
            term: "패러데이 법칙과 정량 계산 (Faraday's Laws and Quantitative Calculations)",
            def: "패러데이 상수(Faraday constant, F) = 96 500 C mol⁻¹ (또는 9.65 × 10⁴ C mol⁻¹) — 전자 1 mol의 전하량. 계산 단계: ① 전하량 Q = I(A) × t(s). ② 이동한 전자의 몰수: n(e⁻) = Q / F = It / F. ③ 반쪽 반응식에서 전자 계수 z를 이용: n(석출 물질) = n(e⁻) / z. ④ 질량: m = n × M. 예: 0.500 A의 전류를 1930 s 동안 흘렸을 때 CuSO₄(aq) 전기분해에서 석출되는 Cu의 질량. Q = 0.500 × 1930 = 965 C. n(e⁻) = 965 / 96500 = 0.01000 mol. Cu²⁺ + 2e⁻ → Cu이므로 z=2: n(Cu) = 0.01000 / 2 = 0.00500 mol. m(Cu) = 0.00500 × 63.55 = 0.318 g.",
          },
        ],
        traps: [
          "패러데이 법칙 계산에서 시간 단위를 분(min)이나 시간(hour)으로 넣는 것이 가장 흔한 단위 오류입니다. Q = I × t에서 t는 반드시 초(s) 단위여야 합니다. 예: '30분'은 1800 s로 변환해야 합니다. IB Paper 2 계산 문제에서 단위 변환을 생략하면 최종 답이 틀려도 과정점(ECF, error carried forward)을 받을 수 있지만, 단위 변환 오류 자체에서 1점을 잃습니다.",
          "전기도금에서 anode가 비활성(inert) 전극이면 도금 금속 이온이 고갈되어 전해질 농도가 감소하고 도금 품질이 나빠집니다. IB에서 '왜 활성 anode를 사용하는가?'에 대한 답은 '이온 농도를 일정하게 유지하기 위해'입니다. 또한 전기도금 설계에서 피도금체를 anode에, 도금 금속을 cathode에 연결하면 도금이 아니라 반대 반응이 일어납니다 — 항상 피도금체 = cathode(환원극)를 확인하세요.",
        ],
        example:
          "전기도금 + 패러데이 계산 예시 (IB Paper 2 유형): 은(Ag) 스푼에 금(Au)을 전기도금하려 한다. ① 전지 설치 방법을 서술하고, ② 2.00 A의 전류를 2.00시간 동안 흘렸을 때 석출되는 Au의 질량을 구하시오. (Au 원자량 = 197.0 g mol⁻¹; 반쪽 반응: Au³⁺ + 3e⁻ → Au). 풀이: ① 설치: 은 스푼을 cathode(전원 음극에 연결), 금 전극을 anode(전원 양극에 연결), HAuCl₄ 수용액(또는 금 이온 포함 전해질)을 전해질로 사용. ② 계산: t = 2.00 h = 7200 s. Q = 2.00 A × 7200 s = 14 400 C. n(e⁻) = 14400 / 96500 = 0.1492 mol. Au³⁺ + 3e⁻ → Au (z = 3): n(Au) = 0.1492 / 3 = 0.04973 mol. m(Au) = 0.04973 × 197.0 = 9.80 g.",
      },
    ],
  },
];
