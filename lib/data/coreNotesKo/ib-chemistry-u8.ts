/**
 * Core Notes 한국어 스토리텔링 버전 — IB Chemistry Unit 8 (산과 염기).
 * IB DP Chemistry SL/HL 기준 실제 내용을 바탕으로 일타강사 내러티브로 작성.
 * 용어는 "한국어 (English)" 병기 — IB 시험은 영어로 보니까.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const IB_CHEMISTRY_U8_KO: CoreNote[] = [
  {
    lessonId: "ib-chemistry-u8-l1",
    courseId: "ib-chemistry",
    subjectLabel: "IB Chemistry",
    emoji: "⚗️",
    unit: 8,
    lessonNum: 1,
    unitName: "산과 염기 (Acids & Bases)",
    title: "브뢴스테드-로우리 이론 — 산과 염기는 '양성자를 주고받는 관계'다",
    subtitle: "H⁺를 주면 산(acid), H⁺를 받으면 염기(base) — 짝산-짝염기 쌍을 이해하면 IB 반응식 절반이 풀린다",
    overview:
      "고등학교에서 배운 아레니우스(Arrhenius) 정의는 산을 'H⁺를 내놓는 물질', 염기를 'OH⁻를 내놓는 물질'로 한정했습니다. 그런데 이 정의로는 NH₃가 왜 염기로 작용하는지 설명하기 어렵습니다 — NH₃는 OH⁻를 내놓지 않으니까요. 1923년 덴마크의 브뢴스테드(Brønsted)와 영국의 로우리(Lowry)는 동시에 같은 아이디어를 발표했습니다: '산은 양성자(proton, H⁺)를 공여(donate)하는 입자이고, 염기는 양성자를 수용(accept)하는 입자다.' 이것이 브뢴스테드-로우리 이론(Brønsted-Lowry theory)입니다. 이 관점에서 HCl + H₂O → H₃O⁺ + Cl⁻ 반응을 보면, HCl은 H⁺를 H₂O에게 주므로 산(proton donor), H₂O는 H⁺를 받아 H₃O⁺가 되므로 염기(proton acceptor)입니다. 한편 H₂O와 HCO₃⁻처럼 조건에 따라 H⁺를 주기도 받기도 하는 물질을 양쪽성(amphiprotic) 물질이라고 합니다. 이 레슨에서는 브뢴스테드-로우리 정의, 짝산-짝염기 쌍(conjugate acid-base pair), 양쪽성 물질의 개념을 IB Paper 1·2 수준에서 완벽히 정리합니다. 이 개념은 Unit 8 전체의 뼈대가 되므로, 이것을 확실히 잡고 넘어가야 pH 계산도, 적정(titration)도 흔들리지 않습니다.",
    objectives: [
      "브뢴스테드-로우리 정의에 따라 산을 '양성자 공여체(proton donor)', 염기를 '양성자 수용체(proton acceptor)'로 정의하고, 주어진 반응식에서 산과 염기를 올바르게 식별할 수 있다",
      "브뢴스테드-로우리 반응에서 짝산-짝염기 쌍(conjugate acid-base pair)을 찾아내고, '짝산 = 염기 + H⁺', '짝염기 = 산 − H⁺'의 관계를 적용할 수 있다",
      "양쪽성(amphiprotic) 물질(H₂O, HCO₃⁻, HSO₄⁻ 등)이 산 또는 염기로 모두 작용할 수 있음을 반응식과 함께 설명할 수 있다",
      "아레니우스(Arrhenius) 정의와 브뢴스테드-로우리 정의의 차이점을 서술하고, 브뢴스테드-로우리 정의가 NH₃와 같은 비OH⁻ 염기를 포함하는 더 넓은 개념임을 설명할 수 있다",
    ],
    formulas: [
      "브뢴스테드-로우리 산: H⁺ 공여체 (proton donor)",
      "브뢴스테드-로우리 염기: H⁺ 수용체 (proton acceptor)",
      "짝산-짝염기 쌍: 산 ⇌ H⁺ + 짝염기  /  염기 + H⁺ ⇌ 짝산",
    ],
    sections: [
      {
        title: "브뢴스테드-로우리 정의와 짝산-짝염기 쌍",
        subtitle: "H⁺를 건네는 순간 산이고, H⁺를 받는 순간 염기다 — 역반응의 산과 염기도 동시에 찾아야 한다",
        terms: [
          {
            term: "브뢴스테드-로우리 산과 염기 (Brønsted-Lowry Acid and Base)",
            def: "산(acid): 반응에서 양성자(H⁺)를 다른 입자에게 공여(donate)하는 입자. 예: HCl, H₂SO₄, CH₃COOH, H₂O(산으로 작용 시). 염기(base): 반응에서 양성자(H⁺)를 받아들이는(accept) 입자. 예: NH₃, H₂O(염기로 작용 시), OH⁻, HCO₃⁻(염기로 작용 시). 핵심: 브뢴스테드-로우리 정의에서 산과 염기는 절대적 성질이 아니라 반응 상대방에 따라 결정되는 상대적 역할입니다. 동일한 물질(예: H₂O, HCO₃⁻)이 어떤 반응에서는 산, 다른 반응에서는 염기로 작용할 수 있습니다.",
          },
          {
            term: "짝산-짝염기 쌍 (Conjugate Acid-Base Pair)",
            def: "브뢴스테드-로우리 반응에서 H⁺ 하나를 주고받아 변환된 두 입자를 짝산-짝염기 쌍이라고 합니다. 규칙: 산이 H⁺를 잃으면 그 산의 짝염기(conjugate base)가 되고, 염기가 H⁺를 얻으면 그 염기의 짝산(conjugate acid)이 됩니다. 예: HCl(산) + H₂O(염기) → H₃O⁺(짝산) + Cl⁻(짝염기). 짝산-짝염기 쌍 1: HCl / Cl⁻. 짝산-짝염기 쌍 2: H₃O⁺ / H₂O. 또 다른 예: NH₃(염기) + H₂O(산) ⇌ NH₄⁺(짝산) + OH⁻(짝염기). 짝산-짝염기 쌍 1: NH₄⁺ / NH₃. 짝산-짝염기 쌍 2: H₂O / OH⁻. IB Paper 2에서 '반응식에서 짝산-짝염기 쌍을 모두 쓰시오'는 단골 문제입니다.",
          },
          {
            term: "양쪽성 물질 (Amphiprotic Substance)",
            def: "조건에 따라 H⁺를 주기도(산으로 작용) 받기도(염기로 작용) 하는 물질을 양쪽성(amphiprotic) 물질이라고 합니다. 대표 예시: ① H₂O: NH₃와 반응 시 H⁺를 주어 산으로 작용(H₂O → OH⁻), HCl과 반응 시 H⁺를 받아 염기로 작용(H₂O → H₃O⁺). ② HCO₃⁻: 강산과 반응 시 H⁺를 받아 H₂CO₃가 되므로 염기, 강염기와 반응 시 H⁺를 주어 CO₃²⁻가 되므로 산. ③ HSO₄⁻: 마찬가지로 양쪽성. IB SL에서는 H₂O의 양쪽성이 가장 자주 출제됩니다. 양쪽성(amphiprotic)과 양쪽친(amphoteric)을 혼동하지 말 것 — amphiprotic은 H⁺ 전달 맥락(브뢴스테드-로우리), amphoteric은 더 넓은 산-염기 거동(산으로도 염기로도 반응함)에 해당합니다. IB 시험에서는 주로 amphiprotic을 요구합니다.",
          },
        ],
        traps: [
          "짝산-짝염기 쌍에서 'H⁺ 하나'만 차이가 나야 한다는 것을 잊으면 틀립니다. HCl의 짝염기는 Cl⁻이며, H₂Cl⁺가 아닙니다. NH₃의 짝산은 NH₄⁺이며, N₂H₄가 아닙니다. 쌍을 쓸 때는 항상 H 원자 하나와 양성 전하 하나의 차이만 있는지 확인하세요. IB Paper 2에서 짝산이나 짝염기를 잘못 특정하면 연쇄 오답이 납니다.",
          "H₂O는 산과 염기 둘 다 될 수 있으므로 반응 상대방을 보고 역할을 판단해야 합니다. HCl + H₂O → H₃O⁺ + Cl⁻에서 H₂O는 염기이고, NH₃ + H₂O ⇌ NH₄⁺ + OH⁻에서 H₂O는 산입니다. '물은 항상 염기다'라고 외우면 IB Paper 1에서 반드시 틀립니다.",
        ],
        example:
          "짝산-짝염기 쌍 찾기 예시 (IB Paper 2 유형): 반응 CH₃COOH(aq) + H₂O(l) ⇌ CH₃COO⁻(aq) + H₃O⁺(aq)에서 두 개의 짝산-짝염기 쌍을 쓰시오. 풀이: CH₃COOH는 H⁺를 H₂O에게 주므로 산 → 짝염기는 CH₃COO⁻ (쌍 1: CH₃COOH / CH₃COO⁻). H₂O는 H⁺를 받아 H₃O⁺가 되므로 염기 → 짝산은 H₃O⁺ (쌍 2: H₃O⁺ / H₂O). 역반응에서도 확인: CH₃COO⁻(염기)는 H₃O⁺(산)에서 H⁺를 받아 CH₃COOH가 됩니다 — 완벽히 일치합니다.",
      },
      {
        title: "강산·약산 / 강염기·약염기 — 세기(strength)와 농도(concentration)는 전혀 다른 개념이다",
        subtitle: "완전히 이온화되면 강(strong), 부분적으로만 이온화되면 약(weak) — 진하다고(concentrated) 강산이 아니다",
        terms: [
          {
            term: "강산과 약산 (Strong Acid and Weak Acid)",
            def: "강산(strong acid): 수용액에서 H⁺(또는 H₃O⁺)를 거의 100% 이온화하여 내놓는 산. 이온화 반응이 사실상 비가역(→)입니다. IB에서 기억해야 할 강산: HCl, HBr, HI, HNO₃, H₂SO₄(1차), HClO₄. 약산(weak acid): 수용액에서 부분적으로만 이온화하는 산. 이온화 평형(⇌)이 반응물 쪽에 치우쳐 있습니다(Ka < 1). 예: CH₃COOH, H₂CO₃, HF, H₃PO₄, HCN. 약산의 수용액에는 이온화되지 않은 분자와 이온이 공존합니다. 이온화 정도(degree of ionisation)가 클수록 더 강한 산입니다. IB Paper 1에서 '다음 중 약산은?'은 단골 문제 — HF는 약산임을 반드시 기억하세요(많은 학생이 할로겐화수소산 중 HF만 약산임을 놓칩니다).",
          },
          {
            term: "강염기와 약염기 (Strong Base and Weak Base)",
            def: "강염기(strong base): 수용액에서 OH⁻를 완전히 해리하거나 H₂O에서 H⁺를 거의 100% 받아 OH⁻를 생성하는 염기. 예: NaOH, KOH, Ca(OH)₂, Ba(OH)₂. 약염기(weak base): 수용액에서 부분적으로만 이온화하는 염기. 이온화 평형(⇌)이 반응물 쪽에 치우칩니다(Kb < 1). 대표 예: NH₃(aq) + H₂O(l) ⇌ NH₄⁺(aq) + OH⁻(aq). 약염기 수용액에는 이온화되지 않은 분자가 대부분 남아있습니다. IB에서 강염기 목록은 짧습니다 — Group 1·2 금속 수산화물이 주를 이루며, 그 외 대부분은 약염기로 취급합니다.",
          },
        ],
        traps: [
          "강산/약산(strength)과 진한/묽은 산(concentrated/dilute)을 혼동하는 것은 IB 시험에서 가장 흔한 실수입니다. '강산(strong acid)'은 이온화 정도를 말하고, '진한 산(concentrated acid)'은 단위 부피당 용질의 몰 수(농도)를 말합니다. 진한 아세트산(concentrated CH₃COOH)은 농도가 높지만 여전히 약산입니다. 묽은 염산(dilute HCl)은 농도가 낮지만 여전히 강산입니다. IB Paper 2 서술형에서 이 두 용어를 바꿔 쓰면 즉시 감점입니다.",
          "HF는 F의 높은 전기음성도 때문에 직관적으로 '강산일 것 같지만' 실제로는 약산입니다(이온화도가 낮음). HCl, HBr, HI와 달리 HF는 수용액에서 완전히 이온화하지 않습니다. IB Paper 1에서 '강산을 고르시오' 문제에 HF를 선택하면 오답입니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ib-chemistry-u8-l2",
    courseId: "ib-chemistry",
    subjectLabel: "IB Chemistry",
    emoji: "⚗️",
    unit: 8,
    lessonNum: 2,
    unitName: "산과 염기 (Acids & Bases)",
    title: "pH·pOH·Kw — 수용액 속 H⁺ 농도를 숫자 하나로 표현하는 기술",
    subtitle: "pH = −log[H⁺], Kw = [H⁺][OH⁻] = 10⁻¹⁴, pH + pOH = 14 — 이 세 줄로 모든 수용액 산-염기 계산이 시작된다",
    overview:
      "1909년 덴마크 생화학자 쇠렌센(Søren Sørensen)은 맥주 발효 중 산도를 측정하다가 불편한 작은 숫자들(예: [H⁺] = 0.000001 mol dm⁻³)을 다루기 위해 pH 개념을 도입했습니다. pH = −log₁₀[H⁺]로 정의하면 [H⁺] = 10⁻⁷ mol dm⁻³인 순수한 물의 pH가 7이 되고, 산성이 강해질수록(H⁺ 농도 증가) pH는 작아지며, 염기성이 강해질수록 pH는 커집니다. 25°C 순수한 물에서는 [H⁺] = [OH⁻] = 10⁻⁷ mol dm⁻³이며, 이 곱(Kw = [H⁺][OH⁻] = 10⁻¹⁴)은 물의 이온곱 상수(ionic product of water)입니다. Kw는 온도가 일정하면 항상 10⁻¹⁴(25°C)이므로, [H⁺]를 알면 [OH⁻]를 즉시 구할 수 있고, pH와 pOH의 합도 항상 14입니다. 이 레슨에서는 pH와 pOH 정의와 계산, Kw를 활용한 [H⁺]↔[OH⁻] 변환, 강산·강염기 수용액의 pH 계산, 그리고 산 증착(acid deposition)의 환경적 맥락까지 IB 시험 수준으로 완벽히 정리합니다.",
    objectives: [
      "pH = −log[H⁺]와 pOH = −log[OH⁻] 정의를 사용하여 주어진 [H⁺] 또는 [OH⁻]로부터 pH·pOH를 계산하고, 역으로 pH로부터 [H⁺]를 구할 수 있다",
      "물의 이온곱 상수 Kw = [H⁺][OH⁻] = 1.0 × 10⁻¹⁴ (25°C)를 이용하여 [H⁺]로부터 [OH⁻]를 구하고, pH + pOH = 14 관계를 적용할 수 있다",
      "강산과 강염기 수용액의 pH를 완전 이온화 가정 하에 계산하고, 계산 결과가 합리적인지(산성 < 7, 염기성 > 7, 중성 = 7) 확인할 수 있다",
      "산 증착(acid deposition)의 원인 물질(SO₂, NO₂, CO₂)과 관련 반응식을 쓰고, pH < 5.6인 산성비(acid rain)가 생태계·건물에 미치는 영향을 서술할 수 있다",
    ],
    formulas: [
      "pH = −log[H⁺]",
      "pOH = −log[OH⁻]",
      "pH + pOH = 14  (25°C)",
      "Kw = [H⁺][OH⁻] = 1.0 × 10⁻¹⁴  (25°C)",
      "[H⁺] = 10⁻ᵖᴴ",
    ],
    sections: [
      {
        title: "pH·pOH·Kw — 정의와 계산",
        subtitle: "log를 다루는 것은 계산기보다 개념 — pH 1 차이가 H⁺ 농도 10배 차이임을 항상 기억하라",
        terms: [
          {
            term: "pH의 정의와 계산 (Definition and Calculation of pH)",
            def: "pH = −log₁₀[H⁺(aq)]. 여기서 [H⁺]는 mol dm⁻³ 단위의 수소 이온(양성자) 농도입니다. 로그 스케일이므로 pH가 1 감소하면 [H⁺]는 10배 증가합니다. 25°C에서: pH < 7 → 산성(acidic), pH = 7 → 중성(neutral), pH > 7 → 염기성(basic/alkaline). 역변환: [H⁺] = 10⁻ᵖᴴ. 강산 계산 예: 0.010 mol dm⁻³ HCl 수용액 → HCl은 강산이므로 [H⁺] = 0.010 = 10⁻² mol dm⁻³ → pH = −log(10⁻²) = 2. IB에서는 소수점 아래 자릿수가 중요합니다: log의 정수 부분(characteristic)은 농도의 자릿수, 소수 부분(mantissa)만이 유효 숫자이므로 pH 2.30은 유효숫자 2개를 의미합니다.",
          },
          {
            term: "물의 이온곱 상수 Kw (Ionic Product of Water Kw)",
            def: "순수한 물도 매우 적은 정도로 자가 이온화(self-ionisation)합니다: H₂O(l) ⇌ H⁺(aq) + OH⁻(aq). 이 평형의 평형 상수를 Kw라 하고, 25°C에서 Kw = [H⁺][OH⁻] = 1.0 × 10⁻¹⁴ (mol dm⁻³)². Kw는 온도에 따라 변합니다 — 온도가 올라가면 Kw가 커집니다(자가 이온화가 흡열). 따라서 고온에서는 중성 용액의 pH가 7보다 낮아질 수 있습니다(pH = 7이 아닌데도 중성). IB SL에서는 25°C, Kw = 10⁻¹⁴를 기준으로 계산합니다. Kw를 이용하면 [H⁺]를 알 때 [OH⁻] = Kw / [H⁺]로 즉시 구할 수 있습니다.",
          },
          {
            term: "pOH와 pH + pOH = 14 (pOH and the Relationship pH + pOH = 14)",
            def: "pOH = −log[OH⁻]로 정의합니다. Kw = [H⁺][OH⁻] = 10⁻¹⁴ 양변에 −log를 취하면: pH + pOH = 14 (25°C). 이 관계를 이용하면 강염기 수용액의 pH를 계산할 수 있습니다. 예: 0.10 mol dm⁻³ NaOH → NaOH 완전 해리 → [OH⁻] = 0.10 mol dm⁻³ → pOH = −log(0.10) = 1 → pH = 14 − 1 = 13. IB 시험에서 pOH 경로를 통한 pH 계산 문제가 자주 출제되므로, 두 경로(직접 [H⁺] 계산, 또는 pOH 경유) 모두 익숙해야 합니다.",
          },
          {
            term: "산 증착 (Acid Deposition)",
            def: "산 증착(acid deposition)은 대기 중 산성 물질이 빗물·눈·안개·건식 먼지 형태로 지표에 떨어지는 현상입니다. 정상 빗물은 대기 CO₂와 반응하여 pH ≈ 5.6(H₂CO₃ 형성). 산성비(acid rain)는 pH < 5.6으로 정의합니다. 주요 원인 물질: ① SO₂: 화석연료·화산 → 대기에서 SO₃로 산화 → H₂SO₄ 생성. ② NO₂: 자동차·발전소 → 대기에서 HNO₃ 생성. 관련 반응식: SO₂(g) + H₂O(l) → H₂SO₃(aq) (또는 2SO₂ + O₂ → 2SO₃ → H₂SO₄). 피해: 토양 산성화(Al³⁺·중금속 용출), 수생 생태계 손상, 대리석·석회암 건물 침식(CaCO₃ + H₂SO₄ → CaSO₄ + H₂O + CO₂).",
          },
        ],
        traps: [
          "고온에서 중성 용액의 pH가 7이 아닐 수 있습니다. 37°C(체온)에서 Kw ≈ 2.4 × 10⁻¹⁴이므로 중성 pH ≈ 6.8입니다. IB Paper 2에서 '37°C에서 pH 6.8인 용액이 산성인가?'라고 물으면 '아니오, 중성이다 — [H⁺] = [OH⁻]이므로'가 정답입니다. '중성 = pH 7'이라는 공식은 25°C에서만 성립합니다.",
          "강산 희석 계산 시 pH가 7 이상이 되는 결과가 나오면 반드시 다시 확인해야 합니다. 예: 10⁻⁸ mol dm⁻³ HCl의 pH를 −log(10⁻⁸) = 8로 계산하면 틀립니다. 이 농도에서는 물의 자가 이온화([H⁺] from H₂O ≈ 10⁻⁷)가 HCl의 기여보다 크므로 정확한 [H⁺]는 10⁻⁷보다 약간 크고 pH는 7보다 약간 낮습니다(대략 6.98). IB SL에서는 '산 수용액의 pH는 항상 7 미만'이라는 상식 검토가 중요합니다.",
        ],
        example:
          "강산·강염기 pH 계산 예시 (IB Paper 2 유형): ① 0.050 mol dm⁻³ H₂SO₄(aq)의 pH를 구하시오. (H₂SO₄는 강이산(diprotic strong acid)으로 완전 이온화 가정) 풀이: H₂SO₄ → 2H⁺ + SO₄²⁻ → [H⁺] = 2 × 0.050 = 0.100 mol dm⁻³ → pH = −log(0.100) = 1.00. ② 0.025 mol dm⁻³ Ba(OH)₂(aq)의 pH를 구하시오. 풀이: Ba(OH)₂ → Ba²⁺ + 2OH⁻ → [OH⁻] = 2 × 0.025 = 0.050 mol dm⁻³ → pOH = −log(0.050) = 1.30 → pH = 14 − 1.30 = 12.70. 두 계산 모두 IB에서 채점 기준이 '단위 및 유효숫자 포함'이므로, 최종 답을 mol dm⁻³와 함께 명시하는 습관을 기르세요.",
      },
      {
        title: "약산·약염기 Ka·Kb와 이온화 평형",
        subtitle: "약산은 '일부만 이온화' — Ka 식을 Kc처럼 쓰고 ICE 표로 계산하면 된다",
        terms: [
          {
            term: "산 이온화 상수 Ka (Acid Dissociation Constant Ka)",
            def: "약산 HA의 이온화 평형: HA(aq) ⇌ H⁺(aq) + A⁻(aq). Ka = [H⁺][A⁻] / [HA]. Ka가 클수록 이온화도가 높아 더 강한 산입니다. 예: CH₃COOH (Ka = 1.8 × 10⁻⁵) < HF (Ka = 6.8 × 10⁻⁴) < H₂SO₃ (Ka₁ = 1.5 × 10⁻²). pKa = −log(Ka)로 표현하기도 하며, pKa가 작을수록 더 강한 산입니다. Ka 계산 시 H₂O(순수 액체)는 Kc 식과 마찬가지로 분모에서 제외합니다. IB HL에서는 Ka를 이용한 pH 계산(ICE 표 적용 또는 이차방정식 풀기)이 출제됩니다.",
          },
          {
            term: "짝산-짝염기 Ka·Kb 관계 (Relationship Ka × Kb = Kw)",
            def: "짝산-짝염기 쌍에서 Ka × Kb = Kw = 10⁻¹⁴ (25°C) 관계가 성립합니다. 예: NH₄⁺(Ka) × NH₃(Kb) = 10⁻¹⁴. 이 관계는 IB HL 수준에서 중요합니다. 강산의 짝염기(예: Cl⁻)는 Ka(HCl)이 매우 크므로 Kb(Cl⁻)가 극히 작아 — Cl⁻는 사실상 염기 작용을 하지 않습니다. 반대로 약산의 짝염기(예: CH₃COO⁻)는 상당한 Kb를 가져 가수분해(hydrolysis)로 수용액을 염기성으로 만듭니다.",
          },
        ],
        traps: [
          "Ka 계산에서 약산의 이온화도가 작다는 이유로 초기 농도에서 변화량 x를 무시할 수 있는지 판단해야 합니다. '5% 규칙(5% rule)': x / [HA]₀ × 100% < 5%이면 무시 가능. 그렇지 않으면 이차방정식을 풀어야 합니다. IB HL Paper 2에서 이 판단을 생략하면 부분 점수 손실이 생깁니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ib-chemistry-u8-l3",
    courseId: "ib-chemistry",
    subjectLabel: "IB Chemistry",
    emoji: "⚗️",
    unit: 8,
    lessonNum: 3,
    unitName: "산과 염기 (Acids & Bases)",
    title: "산-염기 적정과 지시약 — 중화 반응의 양적 관계와 pH 변화 곡선 읽기",
    subtitle: "당량점(equivalence point)에서 산과 염기의 몰수가 정확히 맞닿는다 — 어떤 지시약을 쓸지, pH 곡선이 어떤 모양인지 함께 알아야 만점이다",
    overview:
      "산-염기 적정(acid-base titration)은 농도를 아는 한 용액(표준 용액, standard solution)을 이용해 다른 용액의 농도를 정확히 측정하는 기술입니다. 뷰렛에서 산(또는 염기)을 조금씩 가해가다 보면 어느 순간 산과 염기의 몰수가 정확히 같아지는 지점 — 당량점(equivalence point)에 도달합니다. 이 지점에서 pH 변화가 가장 급격히 일어나며, 지시약(indicator)은 그 급격한 변화 구간 안에 변색 범위(colour change range)가 들어있을 때 올바로 작동합니다. 강산-강염기 적정의 당량점은 pH = 7이지만, 약산-강염기 적정의 당량점은 pH > 7(짝염기의 가수분해), 강산-약염기 적정의 당량점은 pH < 7입니다. 따라서 적정 유형마다 적절한 지시약을 다르게 선택해야 합니다. pH 곡선(titration curve)의 모양도 적정 유형에 따라 다르며 — S자 완만 구간(buffer zone), 급격한 수직 상승 구간, 당량점 등을 정확히 읽을 수 있어야 IB Paper 2의 그래프 해석 문제를 맞출 수 있습니다. 이 레슨에서는 중화 반응의 양적 관계, 적정 계산, pH 곡선 해석, 지시약 선택 원리를 완벽히 정리합니다.",
    objectives: [
      "산-염기 중화 반응(neutralisation reaction)에서 n(산) × c(산) × V(산) = n(염기) × c(염기) × V(염기) 관계(n은 양성자 수)를 적용하여 농도 또는 부피를 계산할 수 있다",
      "강산-강염기, 약산-강염기, 강산-약염기 적정 곡선의 차이(당량점 pH, S자 완충 구간 유무, 수직 구간 범위)를 설명하고, 각 곡선에서 당량점과 반당량점(half-equivalence point)을 식별할 수 있다",
      "지시약(indicator)이 약산(또는 약염기)임을 이용하여 변색 범위(pKₐ ± 1)를 설명하고, 적정 유형에 맞는 지시약(페놀프탈레인, 메틸 오렌지 등)을 선택하는 근거를 제시할 수 있다",
      "완충 용액(buffer solution)이 약산과 그 짝염기(또는 약염기와 그 짝산)의 혼합으로 만들어지며, pH 변화에 저항하는 원리를 브뢴스테드-로우리 관점에서 설명할 수 있다",
    ],
    formulas: [
      "중화 적정 계산: c₁V₁ / n₁  =  c₂V₂ / n₂  (n = 분자 당 H⁺ 또는 OH⁻ 수)",
      "당량점 pH: 강산-강염기 = 7,  약산-강염기 > 7,  강산-약염기 < 7",
      "지시약 변색 범위: pKₐ(indicator) ± 1",
      "반당량점에서 pH = pKₐ(약산)  [Henderson-Hasselbalch에서 [HA]=[A⁻] 일 때]",
    ],
    sections: [
      {
        title: "적정 계산과 pH 곡선 해석",
        subtitle: "적정 곡선의 세 구간 — 완만한 구간, 수직 점프, 당량점 이후 — 각각의 의미를 정확히 읽어야 한다",
        terms: [
          {
            term: "중화 반응과 적정 계산 (Neutralisation and Titration Calculation)",
            def: "강산 HA와 강염기 BOH의 중화 반응: H⁺(aq) + OH⁻(aq) → H₂O(l), ΔH = −57 kJ mol⁻¹ (표준 중화 엔탈피). 적정 계산 공식: 당량점에서 n(H⁺) = n(OH⁻), 즉 c(산) × V(산) × z(산) = c(염기) × V(염기) × z(염기). 여기서 z는 분자당 방출하는 H⁺(또는 OH⁻) 수 (예: H₂SO₄는 z=2, HCl은 z=1). 실전 계산 단계: ① 주어진 c, V로 n(mol) = c × V(dm³) 계산 → ② 화학량론 비 적용 → ③ 미지 c 또는 V 계산. IB Paper 2의 적정 계산 문제에서는 반드시 단위(dm³ vs cm³)를 통일하고, cm³는 ÷1000하여 dm³로 변환해야 합니다.",
          },
          {
            term: "pH 적정 곡선 — 강산-강염기 vs 약산-강염기 (Titration Curves)",
            def: "강산-강염기 적정 곡선(예: HCl vs NaOH): 당량점 pH = 7. 당량점 근처에서 pH가 3∼11에 걸쳐 거의 수직으로 급변합니다. 완충 구간이 없습니다(양쪽 모두 강하므로). 약산-강염기 적정 곡선(예: CH₃COOH vs NaOH): 처음에 pH가 강산 적정보다 높게 시작(약산이므로 [H⁺]가 낮음). 반당량점(half-equivalence point)에서 [HA] = [A⁻] → pH = pKₐ. 완충 구간(buffer region)이 나타납니다. 당량점 pH > 7(CH₃COO⁻의 가수분해 때문). 수직 구간이 강산-강염기보다 짧고 좁습니다. 강산-약염기 적정 곡선(예: HCl vs NH₃): 당량점 pH < 7(NH₄⁺의 가수분해). IB Paper 2에서 곡선 스케치와 당량점 표시는 단골 서술형 문제입니다.",
          },
          {
            term: "지시약 선택 (Indicator Selection)",
            def: "지시약(indicator)은 자체가 약산(HIn)으로, 이온화된 형태(In⁻)와 분자 형태(HIn)가 서로 다른 색을 냅니다: HIn ⇌ H⁺ + In⁻ (색깔 A) (색깔 B). 변색 범위: pH ≈ pKₐ(HIn) ± 1. 적정에서 지시약의 변색 범위가 적정 곡선의 수직 구간(급격한 pH 변화 구간) 안에 있어야 종말점(endpoint)이 당량점과 일치합니다. 선택 기준: ① 강산-강염기: 페놀프탈레인(pKₐ ≈ 9, 변색 pH 8.2–10.0)과 메틸 오렌지(pKₐ ≈ 4, 변색 pH 3.1–4.4) 모두 가능 — 수직 구간이 넓으므로. ② 약산-강염기: 페놀프탈레인 사용(수직 구간이 pH 7 이상에 있으므로). 메틸 오렌지는 부적합. ③ 강산-약염기: 메틸 오렌지 사용(수직 구간이 pH 7 이하에 있으므로). 페놀프탈레인은 부적합.",
          },
        ],
        traps: [
          "약산-강염기 적정에서 '당량점 pH = 7'이라고 쓰면 틀립니다. 당량점에서 생성된 짝염기(예: CH₃COO⁻)가 가수분해(hydrolysis)하여 OH⁻를 생성하므로 당량점 pH > 7입니다. 반대로 강산-약염기 적정에서는 생성된 짝산(예: NH₄⁺)의 이온화로 당량점 pH < 7입니다. '모든 적정의 당량점 = pH 7'은 강산-강염기에만 성립하는 특수 경우입니다.",
          "종말점(endpoint)과 당량점(equivalence point)을 같은 의미로 쓰면 안 됩니다. 당량점은 산과 염기의 몰수가 정확히 같아지는 이론적 지점이고, 종말점은 지시약이 색을 바꾸는 실험적 관찰 지점입니다. 이상적으로는 두 지점이 일치해야 하지만, 잘못된 지시약을 선택하면 종말점이 당량점과 달라져 적정 오차(titration error)가 생깁니다. IB Paper 2에서 이 둘을 구분하는 서술이 채점 기준에 포함됩니다.",
        ],
        example:
          "적정 계산 예시 (IB Paper 2 유형): 25.0 cm³의 CH₃COOH 수용액을 0.100 mol dm⁻³ NaOH 표준 용액으로 적정했더니, 20.0 cm³에서 당량점(페놀프탈레인 변색)에 도달했다. CH₃COOH의 농도를 구하시오. 풀이: n(NaOH) = c × V = 0.100 mol dm⁻³ × (20.0/1000) dm³ = 0.00200 mol. 중화 반응: CH₃COOH + NaOH → CH₃COONa + H₂O, 1:1 몰비이므로 n(CH₃COOH) = 0.00200 mol. c(CH₃COOH) = n / V = 0.00200 mol / (25.0/1000) dm³ = 0.0800 mol dm⁻³. 추가 질문: 이 적정에서 적절한 지시약은 무엇인가? → 페놀프탈레인 (약산-강염기 적정이므로 당량점 pH > 7, 페놀프탈레인 변색 범위 8.2–10.0이 수직 구간에 포함). 메틸 오렌지는 부적합합니다.",
      },
      {
        title: "완충 용액 — pH 변화에 저항하는 시스템",
        subtitle: "약산 + 짝염기 혼합이 핵심 — 소량의 산이나 염기를 가해도 pH가 거의 변하지 않는 이유를 브뢴스테드-로우리로 설명하라",
        terms: [
          {
            term: "완충 용액의 원리 (Buffer Solution Principle)",
            def: "완충 용액(buffer solution)은 소량의 산이나 염기를 가해도 pH 변화가 최소화되는 용액입니다. 구성: ① 약산(HA)과 그 짝염기(A⁻, 주로 염 형태로 공급). 예: CH₃COOH/CH₃COO⁻Na⁺ 완충계 (pH ≈ pKₐ = 4.74). ② 또는 약염기(B)와 그 짝산(BH⁺). 예: NH₃/NH₄Cl 완충계. 작동 원리: 강산(H⁺) 첨가 시 → 짝염기(A⁻)가 H⁺를 흡수: A⁻ + H⁺ → HA (pH 상승 억제). 강염기(OH⁻) 첨가 시 → 약산(HA)이 H⁺를 공급: HA + OH⁻ → A⁻ + H₂O (pH 하강 억제). 생물학적 중요성: 혈액 pH = 7.4 (HCO₃⁻/H₂CO₃ 완충계), 세포 내 인산염 완충계. 완충 용량(buffer capacity): 완충이 효과적인 pH 범위 = pKₐ ± 1.",
          },
          {
            term: "헨더슨-하셀발흐 방정식 (Henderson-Hasselbalch Equation)",
            def: "완충 용액의 pH를 근사적으로 계산하는 식: pH = pKₐ + log([A⁻]/[HA]). 반당량점(half-equivalence point)에서 [HA] = [A⁻]이면 pH = pKₐ + log(1) = pKₐ. 이것이 적정 곡선에서 반당량점 pH = pKₐ인 이유입니다. IB HL 수준에서 완충 pH 계산에 이 식을 적용합니다. SL에서는 완충의 원리(질적 설명)만 요구되는 경우가 많습니다.",
          },
        ],
        traps: [
          "완충 용액을 만들려면 약산과 강염기의 혼합만으로는 부족합니다. 강염기를 너무 많이 넣으면 약산이 모두 중화되어 완충 능력을 잃습니다. 약산과 그 염(짝염기)의 몰 비가 비슷할 때 완충 능력이 가장 큽니다. '약산에 소량의 강염기를 넣어 약산의 절반만 중화시킨 용액'이 최적 완충계입니다. IB Paper 2에서 '완충 용액을 어떻게 만드는지 서술하시오'에 '강산과 강염기를 섞는다'고 쓰면 즉시 오답입니다.",
        ],
        example:
          "완충 용액 pH 계산 예시 (IB HL 유형): 0.200 mol dm⁻³ CH₃COOH와 0.100 mol dm⁻³ CH₃COONa를 혼합한 완충 용액의 pH를 구하시오. (Ka(CH₃COOH) = 1.8 × 10⁻⁵, pKₐ = 4.74) 풀이 (Henderson-Hasselbalch): pH = pKₐ + log([CH₃COO⁻]/[CH₃COOH]) = 4.74 + log(0.100/0.200) = 4.74 + log(0.500) = 4.74 + (−0.301) = 4.44. 이 완충 용액에 소량의 NaOH(0.010 mol)를 가하면: CH₃COOH + OH⁻ → CH₃COO⁻ + H₂O. CH₃COOH 몰수 감소, CH₃COO⁻ 몰수 증가 → 새 pH = pKₐ + log([0.110]/[0.190]) = 4.74 + (−0.238) = 4.50. pH 변화 = 0.06 단위 — 완충 없이 동량의 NaOH를 순수한 물에 가했을 때의 pH 변화(수 단위)에 비해 극히 작습니다.",
      },
    ],
  },
];
