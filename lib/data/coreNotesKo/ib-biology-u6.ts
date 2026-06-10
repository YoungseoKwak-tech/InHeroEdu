/**
 * Core Notes 한국어 스토리텔링 버전 — IB Biology Unit 6 (인체 생리학).
 * 원본 내용 전량 보존(objectives·terms·traps·example) + 일타강사 내러티브.
 * 용어는 "한국어 (English)" 병기.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const IB_BIOLOGY_U6_KO: CoreNote[] = [
  {
    lessonId: "ib-biology-u6-l1",
    courseId: "ib-biology",
    subjectLabel: "IB Biology",
    emoji: "🧬",
    unit: 6,
    lessonNum: 1,
    unitName: "인체 생리학 (Human Physiology)",
    title: "소화·흡수 + 심장·혈관·혈액 — 영양소가 세포에 도달하는 전 과정",
    subtitle: "입에서 시작해 혈관을 타고 온몸 세포까지 — 소화와 순환은 하나로 연결된 공급망이다",
    overview:
      "인체 생리학(human physiology)의 출발점은 '세포가 필요한 것을 어떻게 얻는가'라는 질문입니다. 답은 두 계통의 긴밀한 협업에 있습니다: 소화계(digestive system)가 음식을 흡수 가능한 분자로 분해하고, 순환계(circulatory system)가 그 분자를 모든 세포에 전달합니다. 소화는 물리적 분해(physical digestion, 저작·연동운동)와 화학적 분해(chemical digestion, 효소·산·담즙)의 두 축으로 이루어지며, 최종 산물은 소장(small intestine)의 융털(villi)과 미세융털(microvilli)을 통해 흡수됩니다. 흡수된 영양소는 모세혈관(capillaries)과 유미관(lacteal)을 통해 문맥 순환(hepatic portal circulation)과 림프계(lymphatic system)로 진입합니다. 순환계의 심장(heart)은 이중 펌프(double pump)로 작동합니다: 우심(right side)은 폐순환(pulmonary circulation)을, 좌심(left side)은 체순환(systemic circulation)을 담당합니다. 혈관(blood vessels)은 기능에 따라 동맥(artery)·정맥(vein)·모세혈관으로 나뉘며, 혈액(blood)은 적혈구(red blood cells / erythrocytes)·백혈구(white blood cells / leukocytes)·혈소판(platelets)·혈장(plasma)의 네 성분으로 구성됩니다. IB에서는 이 두 계통을 개별적으로 설명하는 것에 그치지 않고, 소화 산물이 흡수된 뒤 심장·혈관계를 거쳐 표적 조직에 도달하는 경로를 연결해서 서술하는 통합적 이해를 요구합니다.",
    objectives: [
      "소화계의 각 기관(입·식도·위·소장·대장·간·췌장)의 역할을 효소 분비와 연결하여 설명하고, 탄수화물·단백질·지질이 어떤 효소에 의해 어떤 최종 산물로 분해되는지 서술할 수 있다",
      "소장 융털(villi)과 미세융털(microvilli)의 구조적 특징이 흡수 표면적을 최대화하는 방식을 설명하고, 단당류·아미노산은 모세혈관으로, 지방산과 글리세롤은 유미관(lacteal)으로 흡수되는 경로를 서술할 수 있다",
      "심장의 이중 펌프 구조(폐순환·체순환)를 설명하고, 심장 주기(cardiac cycle)에서 수축기(systole)·이완기(diastole), 방실판막(atrioventricular valves)·반달판막(semilunar valves)의 역할을 논술할 수 있다",
      "동맥·정맥·모세혈관의 구조적 차이(벽 두께·탄성·판막 유무)와 기능적 차이(압력·속도·방향)를 표로 비교하고, 혈액의 네 가지 성분(적혈구·백혈구·혈소판·혈장)의 기능을 설명할 수 있다",
    ],
    sections: [
      {
        title: "소화와 흡수 — 분해의 두 축과 융털의 전략",
        subtitle: "효소가 큰 분자를 작게 자르고, 융털이 그 분자를 혈관 속으로 끌어들인다",
        terms: [
          {
            term: "화학적 소화 (Chemical digestion)",
            def: "효소(enzyme)와 소화액이 공유결합을 끊어 큰 분자를 흡수 가능한 단량체로 분해하는 과정. 탄수화물: 아밀레이스(amylase, 침·췌장)가 녹말(starch)을 말토스(maltose)로, 말테이스(maltase, 소장 점막) 등이 이당류를 포도당(glucose) 등 단당류로 분해. 단백질: 펩신(pepsin, 위, 낮은 pH에 최적)이 단백질을 폴리펩타이드로, 트립신(trypsin)·키모트립신(chymotrypsin, 췌장)이 추가 분해, 소장 점막의 펩티데이스(peptidase)가 아미노산(amino acids)으로 최종 분해. 지질: 담즙(bile, 간 생산·쓸개 저장)이 지방을 유화(emulsification)시켜 표면적을 넓히고, 췌장 라이페이스(lipase)가 중성지방(triglyceride)을 지방산(fatty acids)과 글리세롤(glycerol)로 분해.",
          },
          {
            term: "융털과 미세융털 (Villi and microvilli)",
            def: "소장 내벽의 흡수 표면적을 극대화하는 두 단계 구조. 융털(villi)은 장 점막이 손가락 모양으로 돌출된 구조(높이 약 1 mm)로, 각 융털 안에는 모세혈관망과 유미관(lacteal)이 있습니다. 미세융털(microvilli)은 융털 표면의 상피세포(enterocyte)가 다시 솔 모양으로 돌출된 구조로, 합쳐서 '솔가장자리(brush border)'라고 부릅니다. 이 이중 구조로 소장 내벽의 실질 표면적은 약 200 m²(테니스 코트 크기)에 달합니다. 단당류·아미노산은 모세혈관 → 문맥(hepatic portal vein) → 간 경로로, 지방산·글리세롤은 재합성된 중성지방이 킬로미크론(chylomicron)으로 포장되어 유미관 → 림프관 → 흉관(thoracic duct) → 정맥 경로로 흡수됩니다.",
          },
          {
            term: "문맥 순환 (Hepatic portal circulation)",
            def: "소장에서 흡수된 영양소가 간(liver)을 먼저 거치도록 설계된 혈관 경로. 소장·대장·위·췌장에서 나온 정맥혈이 합류해 간문맥(hepatic portal vein)을 형성하며 간으로 유입됩니다. 간은 혈당을 글리코겐(glycogen)으로 저장하거나 방출하는 혈당 완충 역할, 독성 물질 해독(detoxification), 아미노산 탈아민화(deamination) 등을 수행한 뒤 혈액을 간정맥(hepatic vein) → 하대정맥(inferior vena cava)으로 보냅니다.",
          },
        ],
        traps: [
          "담즙(bile)은 효소가 아닙니다. 담즙은 간에서 합성되고 쓸개(gallbladder)에 저장되며, 지방을 작은 방울로 유화(emulsification)시켜 라이페이스(lipase)가 작용할 수 있는 표면적을 넓혀 주는 물리적 역할을 합니다. '담즙이 지방을 소화한다'고 쓰면 즉시 감점이며, '담즙이 지방을 유화시켜 라이페이스의 작용을 보조한다'고 서술해야 합니다.",
          "지질 흡수 경로와 단당류·아미노산 흡수 경로를 혼동하지 마세요. 단당류와 아미노산은 모세혈관 → 간문맥 → 간으로, 지방산과 글리세롤은 킬로미크론으로 재포장되어 유미관(lacteal) → 림프계 → 흉관 → 쇄골하정맥으로 진입합니다. 지질이 모세혈관으로 직접 흡수된다고 쓰는 것은 오답입니다.",
        ],
        example:
          "소화 효소 정리 예시입니다. IB에서 자주 출제되는 효소·기질·산물·분비 위치를 정리합니다.\n\n· 아밀레이스(amylase): 기질 = 녹말(starch), 산물 = 말토스(maltose) 등 이당류, 분비 위치 = 침샘(salivary glands)·췌장(pancreas)\n· 펩신(pepsin): 기질 = 단백질, 산물 = 폴리펩타이드, 분비 위치 = 위(stomach, 프로펩신 형태로 분비 후 HCl에 의해 활성화), 최적 pH = 약 2\n· 트립신(trypsin): 기질 = 폴리펩타이드, 산물 = 짧은 펩타이드, 분비 위치 = 췌장(불활성 트립시노겐 형태로 분비)\n· 라이페이스(lipase): 기질 = 중성지방(triglyceride), 산물 = 지방산(fatty acids) + 글리세롤(glycerol), 분비 위치 = 췌장\n· 말테이스(maltase) 등 이당류분해효소: 기질 = 이당류, 산물 = 단당류, 분비 위치 = 소장 점막(brush border)\n\nIB Paper 1·2에서는 특정 효소의 기질이나 최적 pH 조건을 묻거나, 효소 활성이 pH 변화에 따라 달라지는 그래프를 해석하도록 요구합니다.",
      },
      {
        title: "심장·혈관·혈액 — 이중 펌프와 순환 고속도로",
        subtitle: "좌심과 우심이 동시에 뛰며 폐와 온몸을 각각 관류시키는 이중 회로 설계",
        terms: [
          {
            term: "이중 순환 (Double circulation)",
            def: "혈액이 한 번의 체순환 동안 심장을 두 번 통과하는 포유류의 순환 방식. 우심방(right atrium) → 우심실(right ventricle) → 폐동맥(pulmonary artery) → 폐(gas exchange) → 폐정맥(pulmonary vein) → 좌심방(left atrium) → 좌심실(left ventricle) → 대동맥(aorta) → 체순환 → 대정맥(vena cava) → 우심방. 좌심실 벽이 우심실보다 두꺼운 이유는 전신에 높은 압력으로 혈액을 공급해야 하기 때문입니다. 이중 순환은 폐에서 산소화된 혈액과 체순환 귀환 혈액이 섞이지 않도록 유지해 효율을 극대화합니다.",
          },
          {
            term: "심장 주기 (Cardiac cycle)",
            def: "한 번의 심장 박동에서 일어나는 수축·이완의 순서. ① 심방 수축(atrial systole): 심방이 수축해 혈액을 심실로 밀어 넣음(방실판막 열림). ② 심실 수축(ventricular systole): 심실이 수축해 혈액을 동맥으로 밀어 냄(반달판막 열림, 방실판막 닫힘). ③ 심실 이완(ventricular diastole): 심실이 이완해 혈압이 떨어지면 반달판막 닫힘, 심방에서 혈액 유입 시작. 판막(valve)은 혈액의 역류를 방지하며, 심음(heart sounds '루브-두브')은 판막이 닫힐 때 발생합니다.",
          },
          {
            term: "동맥·정맥·모세혈관 (Artery, vein, capillary)",
            def: "세 유형의 혈관은 구조가 기능에 맞춰 다릅니다. 동맥(artery): 심장에서 조직으로 혈액을 운반, 높은 압력을 견디기 위해 두꺼운 근육층·탄성섬유층을 가지며 판막 없음. 정맥(vein): 조직에서 심장으로 혈액을 귀환시킴, 벽이 얇고 판막(one-way valves)이 있어 역류 방지, 골격근 수축이 혈액 이동을 보조. 모세혈관(capillary): 벽이 단층 내피세포(endothelium) 한 겹으로 이루어져 물질 교환(가스·영양소·노폐물)이 일어나는 부위, 지름이 매우 작아 적혈구가 일렬로 통과.",
          },
          {
            term: "혈액의 성분 (Components of blood)",
            def: "혈액은 네 성분으로 구성됩니다. ① 적혈구(erythrocytes/red blood cells): 핵이 없고 양면 오목형(biconcave disc), 헤모글로빈(haemoglobin)으로 O₂와 CO₂ 운반, 수명 약 120일. ② 백혈구(leukocytes/white blood cells): 면역 반응 담당, 핵 있음, 단핵구·림프구·호중구 등으로 분류. ③ 혈소판(platelets/thrombocytes): 핵 없는 세포 조각, 혈액 응고(blood clotting) 시작. ④ 혈장(plasma): 물·단백질·포도당·이온·호르몬·노폐물(요소 등) 함유, 혈액 부피의 약 55%.",
          },
        ],
        traps: [
          "동맥은 산소가 풍부한 혈액(oxygenated blood)을 운반한다는 규칙에는 예외가 있습니다. 폐동맥(pulmonary artery)은 우심실에서 폐로 가는 산소 부족 혈액(deoxygenated blood)을 운반합니다. 마찬가지로 폐정맥(pulmonary vein)은 폐에서 좌심방으로 오는 산소 풍부 혈액을 운반합니다. '동맥 = 산소화 혈액, 정맥 = 탈산소화 혈액'이라는 단순 암기는 폐순환에서 틀립니다.",
          "심장 판막의 개폐 타이밍을 반드시 이해해야 합니다. 심실이 수축할 때 방실판막(AV valves, 이첨판·삼첨판)은 닫히고 반달판막(semilunar valves, 대동맥판·폐동맥판)은 열립니다. 반대로 심실이 이완하면 반달판막이 닫히고 방실판막이 열립니다. 이 개폐 관계를 거꾸로 서술하면 즉시 오답입니다.",
        ],
        example:
          "혈액의 이동 경로 추적 예시입니다. 소장에서 흡수된 포도당이 근육 세포에 도달하는 전 과정을 경로 순서대로 서술합니다.\n\n① 소장 모세혈관 흡수 → ② 간문맥(hepatic portal vein)으로 합류 → ③ 간(liver, 혈당 조절·해독) 통과 → ④ 간정맥(hepatic vein) → ⑤ 하대정맥(inferior vena cava) → ⑥ 우심방(right atrium) → ⑦ 우심실(right ventricle) → ⑧ 폐동맥(pulmonary artery) → ⑨ 폐(산소 충전, CO₂ 방출) → ⑩ 폐정맥(pulmonary vein) → ⑪ 좌심방(left atrium) → ⑫ 좌심실(left ventricle) → ⑬ 대동맥(aorta) → ⑭ 근육 조직 모세혈관 → 근육 세포 도달.\n\nIB Paper 2의 '경로 서술' 문항에서는 이 순서를 정확히 열거하고, 각 단계에서 무슨 일이 일어나는지(판막 개폐, 가스 교환, 혈당 처리 등)를 함께 서술해야 만점입니다.",
      },
    ],
  },
  {
    lessonId: "ib-biology-u6-l2",
    courseId: "ib-biology",
    subjectLabel: "IB Biology",
    emoji: "🧬",
    unit: 6,
    lessonNum: 2,
    unitName: "인체 생리학 (Human Physiology)",
    title: "질병 방어(면역) + 기체 교환 — 폐와 면역계가 외부 위협을 막는 방식",
    subtitle: "숨 쉬는 동안 침입하는 병원체를 — 폐는 가스를 교환하고 면역계는 적을 기억한다",
    overview:
      "인체는 끊임없이 병원체(pathogen)에 노출됩니다. 이를 막는 방어선은 두 층으로 나뉩니다: 빠르고 비특이적인 자연 면역(innate immunity)과 느리지만 정밀하고 기억을 형성하는 적응 면역(adaptive immunity). 자연 면역은 피부·점막·식세포작용(phagocytosis)·염증 반응(inflammatory response)으로 구성되며 병원체의 종류를 가리지 않고 반응합니다. 적응 면역은 B 림프구(B lymphocytes)가 항체(antibodies)를 생산하는 체액성 면역(humoral immunity)과 T 림프구(T lymphocytes)가 감염 세포를 직접 파괴하는 세포 매개 면역(cell-mediated immunity)으로 나뉩니다. 항체(antibodies)는 Y자형 단백질로 특정 항원(antigen)에만 결합하며, 항원-항체 반응(antigen–antibody reaction)의 특이성은 면역계가 '자기(self)'와 '비자기(non-self)'를 구별하는 핵심입니다. 백신(vaccine)은 항원을 안전하게 도입해 기억 세포(memory cells)를 생성함으로써 실제 감염 시 빠른 2차 면역 반응(secondary immune response)을 유도합니다. 기체 교환(gas exchange) 계통에서는 폐포(alveoli)의 구조적 특징이 효율적인 O₂·CO₂ 교환을 가능하게 하며, 환기(ventilation)는 횡격막(diaphragm)과 늑간근(intercostal muscles)의 협동으로 이루어집니다. IB에서는 면역 반응의 단계를 순서대로 서술하고, 폐포의 구조-기능 관계를 정확히 논술하는 능력을 요구합니다.",
    objectives: [
      "자연 면역(innate immunity)의 1차·2차 방어선(피부·점막·식세포작용·염증 반응)을 설명하고, 각 요소가 비특이적(non-specific)인 이유를 서술할 수 있다",
      "적응 면역(adaptive immunity)에서 항원 제시(antigen presentation) → T 세포 활성화 → B 세포 활성화 → 항체 생산 → 기억 세포 형성의 단계를 순서대로 설명하고, 1차 면역 반응과 2차 면역 반응의 차이(속도·항체 역가)를 그래프로 해석할 수 있다",
      "항체(antibody)의 Y자형 구조에서 가변 영역(variable region)이 항원 특이성을 결정하는 원리를 설명하고, 항원-항체 복합체(antigen–antibody complex) 형성이 병원체 제거에 기여하는 방식을 서술할 수 있다",
      "폐포(alveoli)의 구조적 특징(단층 상피·넓은 표면적·얇은 벽·풍부한 모세혈관·습윤 표면)이 기체 확산 효율을 극대화하는 방식을 설명하고, 흡기(inspiration)와 호기(expiration) 시 횡격막·늑간근·폐 용적·압력의 변화를 연결해 서술할 수 있다",
    ],
    sections: [
      {
        title: "자연 면역과 적응 면역 — 빠른 최전선과 정밀 특수부대",
        subtitle: "1차 방어선이 뚫리면 항체와 기억 세포가 병원체를 영구적으로 기억한다",
        terms: [
          {
            term: "식세포작용 (Phagocytosis)",
            def: "식세포(phagocyte, 주로 호중구neutrophils·단핵구monocytes·대식세포macrophages)가 병원체나 세포 파편을 위족(pseudopodia)으로 감싸 식포(phagosome)를 형성하고, 라이소솜(lysosome)과 융합해 소화 효소로 분해하는 과정. 자연 면역의 핵심 메커니즘으로 비특이적(non-specific)이며 특정 병원체를 인식하는 훈련이 필요 없습니다. 대식세포는 분해 후 병원체의 항원(antigen) 조각을 세포 표면에 제시(antigen presentation)해 적응 면역을 시작시킵니다.",
          },
          {
            term: "항체 (Antibody / Immunoglobulin)",
            def: "B 림프구(B lymphocyte)가 형질 세포(plasma cell)로 분화한 후 생산하는 Y자형 당단백질. 네 개의 폴리펩타이드 사슬(두 개의 중쇄heavy chain + 두 개의 경쇄light chain)이 이황화 결합으로 연결됩니다. Y자의 두 팔 끝에 위치한 가변 영역(variable region)은 특정 항원의 에피토프(epitope)에만 상보적으로 결합하는 고도의 특이성을 가집니다. 항원-항체 복합체 형성은 병원체 응집(agglutination), 독소 중화(neutralisation), 식세포 흡수 촉진(opsonisation) 등을 통해 병원체를 제거합니다.",
          },
          {
            term: "기억 세포 (Memory cells)",
            def: "1차 면역 반응(primary immune response) 후 일부 B·T 림프구가 수십 년간 생존하며 항원의 특이 정보를 기억하는 세포. 동일 항원에 재노출 시 기억 세포가 빠르게 증식해 2차 면역 반응(secondary immune response)을 시작하며, 이때 항체 생산량이 1차보다 훨씬 많고 빠릅니다(잠복기 단축, 역가titres 급증). 백신(vaccine)은 약독화(attenuated) 또는 불활성화(inactivated) 항원을 이용해 실제 감염 없이 기억 세포를 형성하는 원리에 기반합니다.",
          },
        ],
        traps: [
          "항체는 B 림프구가 아니라 형질 세포(plasma cell)가 분비합니다. 정확히는 B 세포가 T 헬퍼 세포(T helper cell)의 도움을 받아 활성화된 후 형질 세포로 분화해야 항체 분비가 시작됩니다. 'B 세포가 항체를 분비한다'는 서술은 단계를 생략한 것이므로 IB 채점에서 부분 점수만 받을 수 있습니다. 반드시 '형질 세포(plasma cell)로 분화한 뒤 분비'라고 써야 합니다.",
          "1차 면역 반응과 2차 면역 반응의 그래프 해석에서 오류가 자주 발생합니다. 2차 반응은 1차보다 ① 잠복기가 짧고, ② 항체 역가(antibody titre)의 최고점이 더 높으며, ③ 항체가 더 오래 유지됩니다. 이 세 가지 차이를 기억 세포(memory cells)의 존재로 설명해야 합니다. '2차 반응이 더 강하다'는 서술만으로는 감점이며 메커니즘을 반드시 연결해야 합니다.",
        ],
        example:
          "백신 작용 원리 서술 예시입니다. IB Paper 2에서 백신이 어떻게 면역을 부여하는지 단계별로 서술하도록 요구하는 경우가 많습니다.\n\n① 백신에 포함된 약독화 병원체(또는 불활성화 항원, 단백질 조각 등)가 체내로 도입됩니다.\n② 대식세포가 항원을 제시(antigen presentation)하면 T 헬퍼 세포(T helper cell)가 활성화됩니다.\n③ T 헬퍼 세포가 B 세포를 자극 → B 세포가 형질 세포(plasma cell)로 분화 → 항체 생산(1차 반응).\n④ 일부 B·T 림프구가 기억 세포(memory cells)로 남습니다.\n⑤ 실제 병원체에 감염 시 기억 세포가 즉시 대량의 항체를 생산(2차 반응) → 병원체가 증식하기 전에 제거.\n\n핵심: 백신은 질병을 일으키지 않고 면역 기억만 만드는 것이 목적입니다.",
      },
      {
        title: "기체 교환 — 폐포의 설계와 환기 메커니즘",
        subtitle: "폐포 하나하나가 교환 효율의 극한을 추구하는 구조이고, 횡격막이 그 펌프다",
        terms: [
          {
            term: "폐포 (Alveolus, 복수 alveoli)",
            def: "폐(lung) 내의 포도송이 모양의 미세한 공기 주머니로 기체 교환이 일어나는 장소. 기체 교환 효율을 극대화하는 구조적 특징: ① 단층 편평 상피(squamous epithelium) — 확산 거리 최소화, ② 거대한 총 표면적(양쪽 폐 합산 약 70 m²) — 확산 면적 최대화, ③ 풍부한 모세혈관망 — 농도 기울기(concentration gradient) 유지, ④ 습윤 표면 — 기체가 용해된 상태로 확산, ⑤ 계면활성제(surfactant) 분비 — 표면 장력 감소로 폐포 수축 방지. O₂는 폐포 → 혈액으로, CO₂는 혈액 → 폐포로 분압 기울기(partial pressure gradient)에 따라 단순 확산으로 이동합니다.",
          },
          {
            term: "환기 메커니즘 (Ventilation mechanism)",
            def: "흡기(inspiration)와 호기(expiration) 시 횡격막과 늑간근의 협동으로 폐 용적·압력을 변화시켜 공기를 이동시키는 과정. 흡기(inspiration, 능동): 횡격막 수축(편평해짐)·외늑간근(external intercostal muscles) 수축 → 흉강 용적 증가 → 폐 용적 증가 → 폐 내압(intrapulmonary pressure) 감소 → 대기압 > 폐 내압 → 공기 유입. 호기(expiration, 안정 시 수동): 횡격막·외늑간근 이완 → 흉강 탄성 복원 → 폐 용적 감소 → 폐 내압 증가 → 폐 내압 > 대기압 → 공기 배출.",
          },
        ],
        traps: [
          "폐는 근육이 없으므로 스스로 팽창하거나 수축할 수 없습니다. 폐 용적의 변화는 전적으로 횡격막과 늑간근의 수축·이완에 의한 흉강 부피 변화에 의존합니다. '폐가 수축해서 호기가 일어난다'는 서술은 오답이며, '흉강 용적 감소 → 폐 탄성 복원 → 폐 내압 상승 → 호기'의 인과 사슬을 써야 합니다.",
          "기체 교환은 능동 수송(active transport)이 아니라 단순 확산(simple diffusion)에 의해 일어납니다. 에너지(ATP)가 소비되지 않으며, 분압 기울기(partial pressure gradient)가 구동력입니다. O₂는 폐포 쪽 분압이 더 높으므로 혈액으로, CO₂는 혈액 쪽 분압이 더 높으므로 폐포로 이동합니다. '세포가 O₂를 능동적으로 흡수한다'고 쓰면 즉시 감점입니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ib-biology-u6-l3",
    courseId: "ib-biology",
    subjectLabel: "IB Biology",
    emoji: "🧬",
    unit: 6,
    lessonNum: 3,
    unitName: "인체 생리학 (Human Physiology)",
    title: "뉴런·시냅스(활동전위) + 호르몬과 항상성(혈당·체온 조절)",
    subtitle: "전기 신호가 시냅스를 건너고, 호르몬이 혈당과 체온을 좁은 범위 안에 묶어 놓는다",
    overview:
      "신경계(nervous system)와 내분비계(endocrine system)는 인체의 두 가지 조절·통합 체계입니다. 신경계는 전기적 신호인 활동전위(action potential)를 뉴런(neuron)을 통해 밀리초 단위로 전달하며, 내분비계는 호르몬(hormone)을 혈액을 통해 표적 기관으로 느리게(초~분 단위) 전달합니다. 뉴런은 수상돌기(dendrites)→세포체(cell body)→축삭돌기(axon)→축삭 말단(axon terminal)의 구조를 가지며, 활동전위는 나트륨 이온(Na⁺)·칼륨 이온(K⁺)의 막 투과성 변화에 의해 발생합니다. 뉴런 사이의 연결 부위인 시냅스(synapse)에서는 전기 신호가 신경전달물질(neurotransmitter)이라는 화학 신호로 변환되어 다음 뉴런의 수용체(receptor)에 결합한 뒤 다시 전기 신호로 전환됩니다. 항상성(homeostasis)은 체내 환경을 좁은 최적 범위에서 유지하는 능력으로, 음성 피드백(negative feedback) 메커니즘이 핵심 원리입니다. 혈당 조절에서는 인슐린(insulin, 혈당 하강)과 글루카곤(glucagon, 혈당 상승)이 췌장(pancreas) 랑게르한스섬(islets of Langerhans)에서 분비되어 拮抗的으로 혈당을 조절합니다. 체온 조절(thermoregulation)에서는 시상하부(hypothalamus)가 체온 감지와 교정 반응의 통합 센터 역할을 하며, 발한(sweating)·떨림(shivering)·혈관 확장·수축이 효과기(effectors)로 작용합니다. IB에서는 활동전위의 발생 단계를 이온 이동과 연결해 설명하고, 혈당 조절·체온 조절을 음성 피드백 도식으로 완성하는 능력을 요구합니다.",
    objectives: [
      "뉴런의 구조(수상돌기·세포체·축삭·수초·랑비에 결절)와 감각뉴런(sensory neuron)·연합뉴런(relay/interneuron)·운동뉴런(motor neuron)의 역할을 설명할 수 있다",
      "활동전위(action potential)의 발생을 분극(resting potential, 안정막전위) → 탈분극(depolarisation, Na⁺ 유입) → 재분극(repolarisation, K⁺ 유출) → 과분극(hyperpolarisation) → 회복의 단계로 이온 이동과 연결해 설명하고, 불응기(refractory period)와 실무율(all-or-nothing law)을 논술할 수 있다",
      "시냅스 전달(synaptic transmission) 과정(시냅스 소포 방출→신경전달물질 확산→수용체 결합→이온 채널 개방→차세포 탈분극→신경전달물질 재흡수·분해)을 단계별로 서술하고, 흥분성·억제성 시냅스를 구분할 수 있다",
      "혈당 조절(blood glucose regulation)에서 인슐린과 글루카곤의 拮抗的 작용과 음성 피드백 회로를 설명하고, 체온 조절(thermoregulation)에서 시상하부가 수용기·통합 센터·효과기를 어떻게 연결하는지 서술할 수 있다",
    ],
    sections: [
      {
        title: "뉴런과 활동전위 — 전기 신호의 탄생과 전파",
        subtitle: "Na⁺가 밀려 들어오면 막이 역전되고, K⁺가 빠져나가면 원래대로 돌아온다",
        terms: [
          {
            term: "활동전위 (Action potential)",
            def: "뉴런 세포막(plasma membrane)에서 발생하는 일시적인 막전위(membrane potential) 역전. 안정 시 막전위(resting potential)는 약 −70 mV(세포 내부가 음성). 역치(threshold) 이상의 자극이 오면: ① 탈분극(depolarisation): 전압 개폐 Na⁺ 채널(voltage-gated Na⁺ channels)이 열려 Na⁺가 급격히 유입 → 막전위가 +30 ~ +40 mV로 상승. ② 재분극(repolarisation): Na⁺ 채널 닫히고 K⁺ 채널 열려 K⁺ 유출 → 막전위 하강. ③ 과분극(hyperpolarisation): K⁺ 채널이 늦게 닫혀 막전위가 −70 mV 아래로 잠시 하강. ④ 나트륨-칼륨 펌프(Na⁺/K⁺ pump)가 Na⁺ 3개를 밖으로, K⁺ 2개를 안으로 능동 수송해 안정 막전위 회복.",
          },
          {
            term: "실무율과 불응기 (All-or-nothing law & Refractory period)",
            def: "실무율(all-or-nothing law): 자극의 강도가 역치(threshold)에 도달하면 최대 크기의 활동전위가 발생하고, 역치 미만이면 전혀 발생하지 않습니다. 활동전위의 크기는 자극 강도와 무관하게 항상 일정합니다. 자극의 강도는 단위 시간당 활동전위의 빈도(frequency)로 인코딩됩니다. 불응기(refractory period): 활동전위 직후 Na⁺ 채널이 불활성화된 상태(절대 불응기absolute refractory period)에서는 어떤 자극에도 새 활동전위가 발생하지 않으며, 이후 부분적으로 회복된 상대 불응기(relative refractory period)에서는 역치 이상의 강한 자극에만 반응합니다. 불응기는 활동전위의 단방향 전파(unidirectional propagation)를 보장합니다.",
          },
          {
            term: "시냅스 전달 (Synaptic transmission)",
            def: "두 뉴런 사이의 시냅스 간극(synaptic cleft, 약 20 nm)을 화학 신호로 가로지르는 과정. ① 활동전위가 축삭 말단(presynaptic terminal)에 도달 → ② 전압 개폐 Ca²⁺ 채널 열림 → Ca²⁺ 유입 → ③ 시냅스 소포(synaptic vesicle)가 시냅스 전 막(presynaptic membrane)과 융합해 신경전달물질(neurotransmitter, 예: 아세틸콜린acetylcholine·도파민dopamine·세로토닌serotonin)을 시냅스 간극으로 방출 → ④ 신경전달물질이 시냅스 후 막(postsynaptic membrane)의 수용체에 결합 → ⑤ 이온 채널 개방 → 흥분성 시냅스(excitatory synapse): Na⁺ 유입 → 탈분극 → 활동전위 생성 가능; 억제성 시냅스(inhibitory synapse): Cl⁻ 유입 또는 K⁺ 유출 → 과분극 → 활동전위 생성 억제 → ⑥ 신경전달물질이 효소(예: 아세틸콜린에스터레이스acetylcholinesterase)에 의해 분해되거나 시냅스 전 뉴런으로 재흡수(reuptake).",
          },
        ],
        traps: [
          "활동전위의 전파 중에 Na⁺/K⁺ 펌프가 개별 활동전위를 '만든다'고 서술하면 오답입니다. Na⁺/K⁺ 펌프는 활동전위 발생에 직접 관여하지 않고, 활동전위가 끝난 후 안정 막전위를 복원하는 역할을 합니다. 활동전위 자체는 전압 개폐 이온 채널(voltage-gated ion channels)의 급속한 개폐로 발생합니다.",
          "시냅스 전달은 일방향(presynaptic → postsynaptic)입니다. 신경전달물질은 시냅스 전 말단에서만 방출되고 수용체는 시냅스 후 막에 있으므로 역방향 신호는 불가능합니다. 또한 수상돌기에서 수용체를 통해 받은 흥분성·억제성 신호들은 세포체(cell body/axon hillock)에서 통합(spatial summation·temporal summation)되어, 그 합이 역치를 넘을 때만 활동전위가 발생합니다.",
        ],
        example:
          "활동전위 그래프 해석 예시입니다. IB Paper 1·2에서 막전위(mV) 대 시간(ms) 그래프를 제시하고 특정 지점의 이온 이동을 묻는 문제가 자주 출제됩니다.\n\n그래프 구간별 이온 이동 요약:\n① 안정 전위(-70 mV): K⁺는 주로 세포 내, Na⁺는 주로 세포 외. Na⁺/K⁺ 펌프가 기울기 유지.\n② 탈분극 상승 구간(-70 → +40 mV): 전압 개폐 Na⁺ 채널 급격히 열림 → Na⁺ 유입 급증.\n③ 재분극 하강 구간(+40 → -70 mV): Na⁺ 채널 불활성화 닫힘 + K⁺ 채널 열림 → K⁺ 유출.\n④ 과분극 구간(-70 mV 아래): K⁺ 채널이 늦게 닫혀 K⁺가 과다 유출됨.\n⑤ 회복(-70 mV 복귀): Na⁺/K⁺ 펌프 작동(ATP 소비).\n\n핵심 포인트: 절대 불응기는 탈분극 + 재분극 구간(Na⁺ 채널 불활성화 상태)에 해당하며, 이 구간에서는 아무리 강한 자극도 새 활동전위를 유발하지 못합니다.",
      },
      {
        title: "항상성 — 혈당·체온 조절의 음성 피드백 회로",
        subtitle: "인슐린과 글루카곤이 혈당을 시소처럼 유지하고, 시상하부가 체온의 온도 조절기 역할을 한다",
        terms: [
          {
            term: "음성 피드백 (Negative feedback)",
            def: "시스템이 최적 기준값(set point)에서 벗어나면, 그 편차를 감지해 반대 방향의 교정 반응을 유도하는 조절 원리. 항상성(homeostasis)의 핵심 메커니즘입니다. 구조: ① 수용기(receptor, 변화 감지) → ② 통합 센터(control centre / effector coordinator, 신호 처리·반응 결정) → ③ 효과기(effector, 교정 반응 실행) → ④ 피드백(변화가 기준값으로 복귀하면 반응 중단). 음성 피드백에서는 출력이 입력을 줄이는 방향으로 작용하므로 시스템이 기준값 주변에서 진동을 점점 줄이며 안정화됩니다.",
          },
          {
            term: "혈당 조절 (Blood glucose regulation)",
            def: "췌장 랑게르한스섬의 α 세포(alpha cells)와 β 세포(beta cells)가 분비하는 두 호르몬의 拮抗的 작용으로 혈당을 약 4–6 mmol L⁻¹(약 80–120 mg dL⁻¹)으로 유지합니다. 혈당 상승 시: β 세포 → 인슐린(insulin) 분비 → 간·근육 세포가 포도당 흡수 증가, 글리코겐 합성(glycogenesis) 촉진, 지방 합성 촉진 → 혈당 하강. 혈당 하강 시: α 세포 → 글루카곤(glucagon) 분비 → 간에서 글리코겐 분해(glycogenolysis), 글루코네오제네시스(gluconeogenesis) 촉진 → 포도당 혈액 방출 → 혈당 상승. 당뇨병(diabetes mellitus): 1형은 β 세포 파괴(인슐린 분비 불가), 2형은 인슐린 수용체 반응성 저하.",
          },
          {
            term: "체온 조절 (Thermoregulation)",
            def: "시상하부(hypothalamus)가 수용기(피부·혈액 온도 감지) + 통합 센터(37 °C 기준값 비교) + 효과기 명령 센터의 역할을 통합 수행합니다. 체온 상승 시(heat loss mechanisms): ① 발한(sweating) — 수분 증발 잠열로 열 방출, ② 피부 혈관 확장(vasodilation) — 피부 혈류 증가로 복사·대류 열 방출 증가, ③ 입모근(arrector pili) 이완 — 털이 눕어 공기층 얇아짐. 체온 하강 시(heat gain mechanisms): ① 떨림(shivering) — 근육 불수의 수축으로 열 발생, ② 피부 혈관 수축(vasoconstriction) — 피부 혈류 감소로 열 손실 억제, ③ 입모근 수축 — 털 세워 공기층 두껍게 해 단열 강화.",
          },
        ],
        traps: [
          "인슐린과 글루카곤의 분비 세포를 혼동하지 마세요. 인슐린(insulin) = 췌장 β 세포(beta cells), 글루카곤(glucagon) = 췌장 α 세포(alpha cells). 두 호르몬을 반대 세포에서 분비한다고 쓰면 즉시 감점입니다. 또한 인슐린은 혈당을 '낮추는' 호르몬임을 기억하세요 — 혈당이 높을 때 β 세포가 자극받아 인슐린을 분비합니다.",
          "체온 조절에서 '털을 세우는 것(piloerection)'이 인간에서 체온 유지에 유의미하게 기여한다고 서술하면 IB 채점에서 불인정될 수 있습니다. 인간은 체모가 적어 이 메커니즘의 실질적 단열 효과가 거의 없으며, 주된 체온 상승 방어는 발한, 체온 하강 방어는 떨림과 혈관 수축입니다. 또한 발한이 '체온을 낮춘다'고만 써서는 부족하며, '수분 증발 시 잠열(latent heat of evaporation)이 피부에서 열을 빼앗아 간다'는 원리를 반드시 포함해야 합니다.",
        ],
        example:
          "혈당 조절 음성 피드백 서술 예시입니다. IB Paper 2에서 시나리오를 주고 혈당 변화에 대한 호르몬 반응을 단계별로 서술하도록 요구합니다.\n\n시나리오: 탄수화물이 풍부한 식사 후 혈당이 9 mmol L⁻¹로 상승했습니다.\n\n① 수용기: 췌장 β 세포(beta cells)가 혈당 상승을 감지합니다.\n② 통합: β 세포가 인슐린(insulin)을 혈액으로 분비합니다.\n③ 효과기 반응 A: 간(liver) 세포가 포도당을 흡수해 글리코겐(glycogen)으로 합성(glycogenesis)합니다.\n④ 효과기 반응 B: 근육·지방 세포가 GLUT4 수용체를 통해 포도당 흡수를 증가시킵니다.\n⑤ 결과: 혈당이 정상 범위(약 4–6 mmol L⁻¹)로 하강합니다.\n⑥ 피드백: 혈당 정상화 → β 세포 자극 감소 → 인슐린 분비 감소 (음성 피드백 완성).\n\n핵심: 음성 피드백에서 교정 반응이 원래 자극을 제거하는 방향으로 작용함을 명시해야 만점입니다.",
      },
    ],
  },
];
