/**
 * Core Notes 한국어 스토리텔링 버전 — IB Biology Unit 5 (진화와 생물다양성).
 * 원본 내용 전량 보존(objectives·terms·traps·example) + 일타강사 내러티브.
 * 용어는 "한국어 (English)" 병기.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const IB_BIOLOGY_U5_KO: CoreNote[] = [
  {
    lessonId: "ib-biology-u5-l1",
    courseId: "ib-biology",
    subjectLabel: "IB Biology",
    emoji: "🧬",
    unit: 5,
    lessonNum: 1,
    unitName: "진화와 생물다양성 (Evolution & Biodiversity)",
    title: "진화의 증거 — 화석·선택적 육종·상동 구조로 읽는 생명의 역사",
    subtitle: "진화는 '이론'이 아니라 다층적 증거 위에 쌓인 과학적 사실임을 데이터로 증명해야 한다",
    overview:
      "진화(evolution)는 세대를 거치며 집단의 유전자 빈도(allele frequency)가 변화하는 과정입니다. IB Topic 5에서는 진화가 실제로 일어났다는 다층적 증거를 먼저 확인하고, 그다음에 자연 선택(natural selection)이라는 메커니즘을 학습합니다. 증거의 세 기둥은 화석 기록(fossil record), 선택적 육종(selective breeding), 상동 구조(homologous structures)입니다. 화석은 생물의 형태가 시간에 따라 단계적으로 변해 왔음을 보여 주고, 선택적 육종은 인간이 수백 세대 만에 원하는 형질을 강화할 수 있다는 사실로 자연에서도 유사한 변화가 가능함을 입증합니다. 상동 구조는 서로 다른 기능을 하더라도 기본 골격이 동일한 뼈 배열(예: 인간의 팔, 새의 날개, 고래의 지느러미발, 말의 앞다리)을 공유한다는 사실이 공통 조상(common ancestor)의 존재를 강력하게 지지합니다. IB에서는 이 증거들을 개별적으로 설명하는 데 그치지 않고, 각 증거가 어떤 방식으로 진화의 발생을 뒷받침하는지 논리적 연결 고리를 서술하는 능력을 요구합니다.",
    objectives: [
      "화석 기록(fossil record)이 진화의 증거가 되는 이유를 시간적 연속성(지층 연대)과 형태 변화를 연결해 설명할 수 있다",
      "선택적 육종(selective breeding / artificial selection)의 원리를 설명하고, 이것이 자연 선택에 의한 진화가 가능함을 지지하는 증거인 이유를 논술할 수 있다",
      "상동 구조(homologous structures)와 상사 구조(analogous structures)를 구분하고, 상동 구조가 공통 조상 존재의 증거가 되는 이유를 설명할 수 있다",
      "흔적 기관(vestigial structures)을 진화의 증거로 제시하고, 구체적 예시(예: 인간의 미골·사랑니, 고래의 골반뼈)를 들어 설명할 수 있다",
    ],
    sections: [
      {
        title: "화석 기록과 선택적 육종 — 시간의 증인과 인위적 실험",
        subtitle: "지층은 생명의 달력이고, 선택적 육종은 실험실에서 재현한 진화다",
        terms: [
          {
            term: "화석 기록 (Fossil record)",
            def: "암석 지층 속에 보존된 생물의 유해·흔적·화학적 잔존물의 총체. 지층의 연대가 깊을수록(오래될수록) 더 원시적 형태의 생물이 출현하며, 시간적 연속성을 통해 형태 변화를 추적할 수 있습니다. 말(horse)의 화석 계열(Hyracotherium → Merychippus → Equus)은 발가락 수가 4→3→1로 줄고 체구가 커지는 변화를 지층 순서대로 보여 주는 교과서적 사례입니다.",
          },
          {
            term: "선택적 육종 (Selective breeding / Artificial selection)",
            def: "인간이 원하는 표현형(phenotype)을 가진 개체를 선별해 교배시키는 방법. 수백 세대 만에 야생 조상과 크게 달라진 품종(예: 야생 늑대 → 치와와·그레이트데인, 야생 양배추 → 케일·브로콜리·콜리플라워)을 만들어 낼 수 있습니다. 이는 인위적인 선택압(selection pressure)만으로도 빠른 형태 변화가 가능함을 직접 증명하며, 자연에서도 같은 원리가 작동한다는 유추를 제공합니다.",
          },
          {
            term: "흔적 기관 (Vestigial structure)",
            def: "진화 과정에서 기능이 축소되거나 사라진 구조. 현재는 뚜렷한 기능이 없거나 매우 제한적이지만 조상에서는 기능했던 형태적 흔적입니다. 예: 인간의 미골(coccyx, 꼬리뼈의 잔재), 고래의 골반·뒷다리뼈(육상 조상의 흔적), 뱀의 골반뼈, 날지 못하는 새의 날개뼈. 기능 없이 구조가 남아 있다는 사실이 공통 조상에서 변화를 거쳤음을 지지합니다.",
          },
        ],
        traps: [
          "화석 기록이 불완전하다는 점을 진화에 반하는 증거라고 오해하지 마세요. 화석화(fossilisation)는 매우 드문 사건(빠른 퇴적·혐기성 환경·단단한 구조 등 조건 필요)이므로 모든 생물의 화석이 보존될 수 없습니다. IB에서는 '화석 기록에 빈 틈(gap)이 있다'는 사실을 화석화의 희귀성으로 설명해야 하며, '빈 틈 = 진화가 없었다'는 논리는 과학적으로 틀립니다.",
          "선택적 육종을 단순히 '교배'라고만 설명하면 부분 점수입니다. IB 채점표는 ① 원하는 표현형의 개체 선별, ② 세대를 거듭한 선택 교배(repeated selective mating over generations), ③ 특정 대립유전자(allele)의 빈도 증가라는 세 단계를 포함할 것을 요구합니다.",
        ],
        example:
          "선택적 육종 적용 예시입니다. 야생 양배추(Brassica oleracea)는 한 종에서 인간의 선택에 따라 완전히 다른 채소들로 분화되었습니다.\n\n· 잎을 크게 선택 → 케일(kale)\n· 줄기와 꽃봉오리를 크게 선택 → 브로콜리(broccoli)\n· 옆눈(axillary bud)을 촘촘하게 선택 → 방울양배추(Brussels sprouts)\n· 꽃차례를 선택 → 콜리플라워(cauliflower)\n\n이 모든 채소는 불과 수천 년 안에 동일한 조상 종에서 갈라진 것입니다. IB Paper 2에서는 이 사례를 제시하고 '인위적 선택이 종 수준의 형태 다양성을 만들 수 있음을 어떻게 보여 주는가'를 논술하도록 요구합니다.",
      },
      {
        title: "상동 구조와 공통 조상 — 기능이 달라도 뼈 배열은 같다",
        subtitle: "팔·날개·지느러미발이 같은 설계도에서 출발했다는 것이 진화의 결정적 증거다",
        terms: [
          {
            term: "상동 구조 (Homologous structures)",
            def: "서로 다른 종에서 기능은 달라졌지만 발생학적 기원과 기본 골격 구조가 동일한 기관. 예: 인간 팔(잡기)·새 날개(비행)·고래 지느러미발(수영)·박쥐 날개막(비행)·말 앞다리(달리기)는 모두 상완골(humerus)·요골(radius)·척골(ulna)·수근골·지골의 같은 배열을 가집니다. 구조의 공통성은 공통 조상(common ancestor)에서 유래한 증거입니다.",
          },
          {
            term: "상사 구조 (Analogous structures)",
            def: "발생학적 기원이 다르지만 유사한 기능을 하도록 수렴 진화(convergent evolution)한 구조. 예: 새의 날개(전지에서 변형)와 곤충의 날개(체벽 돌출에서 기원), 고래 지느러미발과 상어 가슴지느러미. 기능은 같지만 구조적 기원이 달라 공통 조상의 증거가 되지 않습니다.",
          },
          {
            term: "수렴 진화 (Convergent evolution)",
            def: "서로 다른 계통의 생물이 유사한 환경 선택압 아래 독립적으로 유사한 표현형을 진화시키는 현상. 예: 오세아니아의 유대류 두더지(marsupial mole)와 북반구의 태반류 두더지(placental mole)는 지하 생활에 적응해 체형이 매우 유사하지만 계통수상으로 멀리 떨어져 있습니다. 수렴 진화의 결과로 나타난 구조가 상사 구조입니다.",
          },
        ],
        traps: [
          "상동 구조(homologous)와 상사 구조(analogous)는 IB 시험에서 가장 자주 혼동되는 개념 쌍입니다. 핵심 구분: 상동 = 기원이 같고 기능이 다를 수 있음(공통 조상의 증거), 상사 = 기능이 비슷하나 기원이 다름(수렴 진화, 공통 조상의 증거 아님). '새 날개와 곤충 날개는 상동 구조다'처럼 쓰면 즉시 감점입니다.",
          "상동 구조를 설명할 때 '같은 구조이므로 같은 기능을 한다'고 서술하면 오답입니다. 상동 구조의 핵심은 기능이 달라졌음에도 불구하고 기본 골격 패턴이 보존되어 있다는 점이며, 이 차이에서 진화적 변형(evolutionary modification)의 증거가 나옵니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ib-biology-u5-l2",
    courseId: "ib-biology",
    subjectLabel: "IB Biology",
    emoji: "🧬",
    unit: 5,
    lessonNum: 2,
    unitName: "진화와 생물다양성 (Evolution & Biodiversity)",
    title: "자연 선택 — 변이·과잉 생산·차등 생존이 만드는 진화의 엔진",
    subtitle: "다윈이 밝혀낸 메커니즘: 살아남는 개체가 달라지면 다음 세대 집단도 달라진다",
    overview:
      "자연 선택(natural selection)은 진화가 일어나는 핵심 메커니즘입니다. 다윈(Darwin)이 제안한 논리는 네 가지 관찰과 두 가지 추론으로 구성됩니다: ① 개체군 내 개체들 사이에 유전적 변이(heritable variation)가 존재하고, ② 개체군은 환경이 부양할 수 있는 것보다 더 많은 자손을 생산하며(과잉 생산, overproduction), ③ 자원을 두고 개체들 사이에 경쟁이 일어나고, ④ 환경에 더 적합한 변이를 가진 개체가 생존·번식에 유리합니다(차등 생존, differential survival and reproduction). 그 결과 유리한 형질을 지배하는 대립유전자 빈도가 세대를 거치며 증가합니다. IB에서는 이 논리 구조를 항생제 내성 세균(antibiotic resistance)이나 산업 암화 나방(industrial melanism in Biston betularia) 같은 현실 사례에 적용해 완전한 설명을 서술하는 능력을 요구합니다.",
    objectives: [
      "자연 선택의 네 가지 전제 조건(유전적 변이·과잉 생산·생존 경쟁·차등 생존 및 번식)을 순서대로 설명하고, 각 조건이 왜 필수적인지 논술할 수 있다",
      "항생제 내성(antibiotic resistance)의 발생과 확산을 자연 선택의 메커니즘으로 단계별로 설명할 수 있다",
      "자연 선택이 개체를 변화시키는 것이 아니라 집단(population)의 대립유전자 빈도를 변화시키는 것임을 설명할 수 있다",
      "방향 선택(directional selection)·안정화 선택(stabilising selection)·분단 선택(disruptive selection)의 차이를 표현형 빈도 분포 그래프로 설명하고 실제 사례와 연결할 수 있다",
    ],
    sections: [
      {
        title: "자연 선택의 논리 구조 — 다윈 논증의 네 단계",
        subtitle: "변이가 없으면 선택이 없고, 유전되지 않으면 진화도 없다",
        terms: [
          {
            term: "유전적 변이 (Heritable variation)",
            def: "개체군 내 개체들 사이에 존재하는 표현형 차이 중 DNA 서열(유전자형, genotype)에 의해 결정되어 자손에게 전달될 수 있는 변이. 유전적 변이의 원천은 돌연변이(mutation), 감수분열 중 교차(crossing over), 독립 분류(independent assortment), 유성 생식에 의한 대립유전자 재조합입니다. 환경에 의해 발생한 비유전적 표현형 변화(예: 운동으로 길러진 근육)는 자연 선택의 대상이 되지 않습니다.",
          },
          {
            term: "과잉 생산 (Overproduction / Reproductive excess)",
            def: "개체군은 환경의 부양 용량(carrying capacity)보다 훨씬 많은 수의 자손을 생산합니다. 예: 한 쌍의 굴(oyster)은 수백만 개의 알을 낳지만 대부분 성체에 도달하지 못합니다. 이 과잉 생산이 자원(먹이·공간·배우자)을 두고 개체들 사이에 경쟁(struggle for existence)을 발생시키는 전제입니다.",
          },
          {
            term: "차등 생존과 번식 (Differential survival and reproduction)",
            def: "유전적 변이로 인해 특정 환경 조건에서 일부 개체가 다른 개체보다 생존하고 더 많은 자손을 남깁니다. 이것이 '적응도(fitness)'의 차이입니다. 적응도가 높은 개체의 유리한 대립유전자는 집단 내 빈도가 증가하고, 불리한 대립유전자는 감소합니다. 이 과정이 반복되면 집단 전체의 표현형 분포가 바뀌는 진화(evolution)가 일어납니다.",
          },
          {
            term: "선택압 (Selection pressure)",
            def: "특정 표현형을 유리하거나 불리하게 만드는 환경 요인. 포식자, 병원체, 기후, 먹이 가용성, 배우자 선택 등이 선택압으로 작용합니다. 선택압이 강하고 지속적일수록 집단의 대립유전자 빈도 변화 속도가 빨라집니다.",
          },
        ],
        traps: [
          "자연 선택은 개별 개체를 변화시키지 않습니다. 개체의 유전자형은 태어날 때 결정되고 일생 동안 바뀌지 않습니다. 자연 선택은 어떤 유전자형을 가진 개체가 더 많이 번식하느냐를 통해 집단(population) 수준에서 대립유전자 빈도를 변화시킵니다. 'X라는 환경이 되자 생물이 X에 맞도록 변이를 발생시켰다'는 서술은 라마르크(Lamarck)식 사고이며 IB에서 즉시 감점입니다.",
          "유전적 변이와 환경에 의한 표현형 변화를 구분해야 합니다. 동일 유전자형의 식물이 빛이 많은 곳에서 더 크게 자란다면 이는 표현형 가소성(phenotypic plasticity)이며 자연 선택의 원료가 되지 않습니다. 자연 선택은 오직 유전되는(heritable) 변이에만 작용합니다.",
        ],
        example:
          "자연 선택 메커니즘 적용 예시 — 항생제 내성 세균(antibiotic resistance).\n\n① 세균 집단 내에는 무작위 돌연변이(mutation)로 인해 특정 항생제를 분해하거나 회피할 수 있는 변이가 극소수 존재합니다(유전적 변이).\n② 항생제가 투여되면 세균이 죽거나 복제를 멈추지만, 내성 변이를 가진 개체는 생존합니다(선택압 → 차등 생존).\n③ 생존한 내성 세균이 급속히 분열해 내성 대립유전자를 퍼뜨립니다(번식, 대립유전자 빈도 증가).\n④ 몇 세대 후 집단의 대부분이 내성을 가지게 됩니다.\n\nIB Paper 2에서는 이 시나리오를 제시하고 '이것이 진화인가 아닌가, 그리고 어떤 메커니즘으로 설명되는가'를 서술하도록 요구합니다. 핵심: 항생제가 새로운 변이를 만든 것이 아니라, 이미 존재하던 변이를 선택한 것입니다.",
      },
      {
        title: "선택의 세 가지 패턴 — 표현형 분포가 어떻게 이동하는가",
        subtitle: "선택이 분포의 중앙을 밀 것인가, 한쪽 끝을 밀 것인가, 양쪽 끝을 밀 것인가",
        terms: [
          {
            term: "방향 선택 (Directional selection)",
            def: "표현형 분포의 한쪽 극단이 유리해져 평균이 한 방향으로 이동하는 선택. 선택압이 변하거나 새로운 환경에 이주할 때 흔합니다. 예: 산업 암화 나방(Biston betularia) — 산업 혁명 후 그을음으로 검어진 나무껍질에서 짙은 색 형태(carbonaria)의 포식 회피율이 높아져 집단 내 비율이 증가한 사례.",
          },
          {
            term: "안정화 선택 (Stabilising selection)",
            def: "표현형 분포의 양쪽 극단이 불리하고 중간값이 유리해져 분포의 분산(variance)이 감소하는 선택. 환경이 안정적일 때 나타나며 현재 최적값 주변으로 표현형을 유지합니다. 예: 인간 신생아 출생 체중 — 너무 가볍거나 너무 무거운 신생아의 사망률이 높고 중간 체중(약 3–4 kg)이 생존에 가장 유리합니다.",
          },
          {
            term: "분단 선택 (Disruptive selection)",
            def: "표현형 분포의 중간값이 불리하고 양쪽 극단이 유리해져 두 개의 봉우리를 가진 이봉 분포(bimodal distribution)가 형성되는 선택. 극단적으로 진행되면 두 집단이 다른 생태적 지위를 차지하며 종 분화(speciation)의 선구자가 될 수 있습니다. 예: 아프리카 씨앗 까는 새(Pyrenestes ostrinus)의 부리 크기 — 큰 씨앗 또는 작은 씨앗에 특화된 두 극단 부리가 중간 부리보다 유리합니다.",
          },
        ],
        traps: [
          "안정화 선택과 방향 선택을 혼동하는 실수가 많습니다. 안정화 선택은 집단의 평균이 바뀌지 않고 분산만 줄어드는 것이고, 방향 선택은 평균 자체가 이동합니다. 신생아 출생 체중 사례를 '큰 아기가 더 유리하므로 체중이 증가하는 방향으로 진화한다'고 해석하면 오답입니다 — 양 극단 모두 불리하므로 안정화 선택입니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ib-biology-u5-l3",
    courseId: "ib-biology",
    subjectLabel: "IB Biology",
    emoji: "🧬",
    unit: 5,
    lessonNum: 3,
    unitName: "진화와 생물다양성 (Evolution & Biodiversity)",
    title: "분류와 분기학 — 이명법·분류 계층·클래도그램으로 생명의 나무 읽기",
    subtitle: "이름을 붙이는 것이 아니라 진화적 관계를 밝히는 것이 현대 분류학의 목표다",
    overview:
      "분류학(taxonomy)은 생물의 다양성을 체계적으로 정리해 이해하고 소통하기 위한 학문입니다. 18세기 린네(Linnaeus)가 도입한 이명법(binomial nomenclature)은 오늘날에도 전 세계 과학자들이 공통으로 사용하는 언어입니다. 전통 분류는 형태·생리적 유사성을 기준으로 계(Kingdom)·문(Phylum)·강(Class)·목(Order)·과(Family)·속(Genus)·종(Species)의 7단계 계층을 사용해 왔습니다. 그러나 현대 계통분류학(phylogenetics)은 DNA 염기서열·단백질 서열·발생학적 증거를 통해 진화적 공통 조상 관계를 나타내는 클래도그램(cladogram)을 작성하며, 이 분기학(cladistics) 접근이 IB 과정에서 중요한 비중을 차지합니다. 또한 Woese가 제안한 삼역 체계(three-domain system, 세균역·고균역·진핵생물역)는 rRNA 분석을 통해 기존의 오계 분류를 대체하는 증거 기반 재구성의 대표 사례입니다. IB에서는 클래도그램을 실제로 해석하고, 주어진 형질 공유 패턴에서 클래도그램을 추론하며, 삼역 체계의 증거를 설명하는 능력을 요구합니다.",
    objectives: [
      "이명법(binomial nomenclature)의 규칙(이탤릭체·라틴어·속명 대문자·종소명 소문자)을 설명하고, 분류 계층(계·문·강·목·과·속·종)에서 공유되는 형질 수와 계층 간 관계를 설명할 수 있다",
      "클래도그램(cladogram)을 해석해 두 분류군 사이의 최근 공통 조상(most recent common ancestor)을 찾고, 단계통군(clade)을 정의할 수 있다",
      "공유 파생 형질(shared derived character / synapomorphy)을 이용해 간단한 클래도그램을 작성하거나 주어진 클래도그램에서 진화적 관계를 추론할 수 있다",
      "삼역 체계(three-domain system: Bacteria·Archaea·Eukarya)가 기존 오계 분류(five-kingdom system)를 대체하게 된 rRNA 서열 증거를 설명할 수 있다",
    ],
    sections: [
      {
        title: "이명법과 분류 계층 — 공통 언어와 다양성의 지도",
        subtitle: "속명+종소명의 두 단어가 지구상 어디서든 같은 생물을 가리키는 이유",
        terms: [
          {
            term: "이명법 (Binomial nomenclature)",
            def: "각 생물 종에 속명(genus name)과 종소명(specific epithet) 두 단어로 구성된 학명을 부여하는 체계. 규칙: ① 라틴어 또는 라틴어화한 이름 사용, ② 속명은 첫 글자 대문자, 종소명은 소문자, ③ 인쇄물에서는 이탤릭체, 손으로 쓸 때는 밑줄. 예: 현생 인류는 Homo sapiens(속: Homo, 종소명: sapiens). 이명법은 나라마다 다른 일반명 혼란을 없애고 과학적 소통을 표준화합니다.",
          },
          {
            term: "분류 계층 (Taxonomic hierarchy)",
            def: "계(Domain/Kingdom) → 문(Phylum) → 강(Class) → 목(Order) → 과(Family) → 속(Genus) → 종(Species). 계층이 낮아질수록(종에 가까울수록) 공유하는 형질이 많아지고 최근 공통 조상이 가까워집니다. IB에서는 도메인(역)이 추가된 8단계 체계도 다루며, '속이 같으면 종이 같다'는 식의 오해를 경계해야 합니다.",
          },
          {
            term: "종 (Species)",
            def: "생물 분류의 기본 단위. 생물학적 종 개념(biological species concept)에 따르면 자연 상태에서 상호 교배하여 생식 능력이 있는 자손(fertile offspring)을 낳을 수 있는 개체들의 집단. 노새(horse × donkey)는 교배는 가능하지만 자손이 불임이므로 말과 당나귀는 별개의 종입니다. 단, 무성 생식 생물에는 이 정의를 적용하기 어렵다는 한계가 있습니다.",
          },
        ],
        traps: [
          "이명법 표기에서 속명만 대문자로 시작하고 종소명은 반드시 소문자입니다. Homo Sapiens처럼 두 단어 모두 대문자로 쓰면 즉시 감점입니다. 또한 학명을 이탤릭체로 써야 하며(손으로 쓸 때는 밑줄), 종소명만 단독으로 사용하는 것은 올바른 표기가 아닙니다.",
          "분류 계층의 순서를 잘못 기억하는 실수가 흔합니다. '계층이 낮아질수록 구성원 수가 적고 공통 형질이 많아진다'는 원칙을 기억하세요. 기억법: King Philip Came Over For Good Soup(Kingdom·Phylum·Class·Order·Family·Genus·Species).",
        ],
        example:
          "분류 계층 적용 예시 — 인간과 침팬지의 분류 비교.\n\n| 계층 | 인간(Human) | 침팬지(Chimpanzee) |\n|------|------------|-------------------|\n| 역(Domain) | Eukarya | Eukarya |\n| 계(Kingdom) | Animalia | Animalia |\n| 문(Phylum) | Chordata | Chordata |\n| 강(Class) | Mammalia | Mammalia |\n| 목(Order) | Primates | Primates |\n| 과(Family) | Hominidae | Hominidae |\n| 속(Genus) | Homo | Pan |\n| 종(Species) | Homo sapiens | Pan troglodytes |\n\n목(Order)까지는 동일한 분류군에 속하며, 과(Family) 수준까지 공유합니다. IB에서는 이 표를 보고 '인간과 침팬지의 마지막 공통 분류 단계는 무엇인가'를 묻습니다(정답: Family Hominidae).",
      },
      {
        title: "클래도그램과 삼역 체계 — 분기학과 현대 분류의 혁명",
        subtitle: "rRNA 서열이 밝혀준 생명의 세 뿌리 — 세균, 고균, 진핵생물",
        terms: [
          {
            term: "클래도그램 (Cladogram)",
            def: "공유 파생 형질(synapomorphy)에 근거해 분류군 사이의 진화적 관계를 분기 패턴(branching pattern)으로 나타낸 계통수(phylogenetic tree)의 일종. 분기점(node)은 최근 공통 조상을 나타내며, 가지 끝(terminal taxon)은 현존 또는 화석 분류군입니다. 클래도그램에서 두 분류군이 공유하는 가장 가까운 분기점을 찾으면 그들의 최근 공통 조상(most recent common ancestor, MRCA)을 알 수 있습니다.",
          },
          {
            term: "단계통군 (Clade / Monophyletic group)",
            def: "공통 조상과 그 조상에서 파생된 모든 후손을 포함하는 집단. 클래도그램에서 특정 분기점을 기준으로 그 아래의 모든 가지를 잘라 내면 하나의 클레이드가 됩니다. IB에서는 주어진 클래도그램에서 클레이드를 올바르게 식별하고, 특정 분류군이 같은 클레이드에 속하는지 판단하는 문제가 출제됩니다.",
          },
          {
            term: "삼역 체계 (Three-domain system)",
            def: "Woese와 Fox(1977)가 rRNA(ribosomal RNA) 서열 비교를 근거로 제안한 최상위 분류 체계. 세균역(Bacteria)·고균역(Archaea)·진핵생물역(Eukarya)의 세 도메인으로 생명을 구분합니다. 기존 오계 분류의 원핵생물계를 세균과 고균으로 나누는 것이 핵심이며, 고균은 형태상 세균과 비슷해 보이지만 rRNA 서열·세포막 지질·RNA 중합효소 구조 등에서 진핵생물에 더 가깝습니다.",
          },
          {
            term: "공유 파생 형질 (Synapomorphy / Shared derived character)",
            def: "특정 분류군이 공통 조상에서 새롭게 진화시켜 공유하는 파생 형질. 클래도그램 작성의 근거가 됩니다. 예: 척추(vertebra)는 척추동물 클레이드 전체가 공유하는 파생 형질이며, 털(fur)은 포유류 클레이드가 공유하는 파생 형질입니다. 조상 형질(plesiomorphy)과 달리 파생 형질은 특정 클레이드의 단계통성(monophyly)을 지지합니다.",
          },
        ],
        traps: [
          "클래도그램에서 가지의 길이는 진화적 거리(시간 또는 변화의 양)를 나타내지 않습니다(특별히 표시되지 않는 한). IB 클래도그램은 위상학적(topological) 관계, 즉 어떤 분류군이 다른 어떤 분류군과 더 가까운 공통 조상을 공유하는지만 나타냅니다. '가지가 길다 = 더 많이 변화했다'고 해석하면 오답입니다.",
          "삼역 체계에서 고균(Archaea)이 세균(Bacteria)보다 진핵생물(Eukarya)에 더 가깝다는 점을 반드시 기억하세요. rRNA 서열 분석 결과 Archaea와 Eukarya가 먼저 공통 조상을 공유한 후 Bacteria가 갈라진 구조입니다. '세균과 고균은 모두 원핵생물이므로 같은 역에 속한다'고 쓰면 즉시 오답입니다.",
        ],
        example:
          "클래도그램 해석 예시입니다. 다음의 간단한 클래도그램을 생각해 봅니다:\n\n· (((인간, 침팬지), 고릴라), 오랑우탄)\n\n이 클래도그램에서 파악할 수 있는 관계:\n① 인간과 침팬지는 가장 가까운 분기점(MRCA1)을 공유 → 이 둘이 가장 가까운 친척\n② MRCA1 + 고릴라가 MRCA2를 공유 → 고릴라는 인간·침팬지 이후 다음으로 가까운 친척\n③ 오랑우탄은 나머지 모두와 MRCA3를 공유 → 가장 먼 친척\n\nIB Paper 2에서는 실제 형질 데이터표(예: 털 여부·태반 여부·뇌 용량 범주 등)를 제시하고 이로부터 클래도그램을 구성하거나, 반대로 클래도그램을 보고 두 종의 관계를 서술하도록 요구합니다. 핵심: 두 분류군의 MRCA가 가장 최근(클래도그램에서 가장 낮은 분기점)일수록 더 가까운 친척입니다.",
      },
    ],
  },
];
