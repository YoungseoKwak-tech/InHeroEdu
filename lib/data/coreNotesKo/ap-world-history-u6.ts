/**
 * Core Notes 한국어 스토리텔링 버전 — AP World History Unit 6 (6.1–6.7).
 * 원본 내용 전량 보존(overview·body·keyIdea·table·diagram 포함) + 일타강사 내러티브.
 * 용어는 "한국어 (English)" 병기.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const AP_WORLD_HISTORY_U6_KO: CoreNote[] = [
  {
    lessonId: "ap-world-history-u6-l1",
    courseId: "ap-world-history",
    subjectLabel: "AP World History",
    emoji: "🌍",
    unit: 6,
    lessonNum: 1,
    unitName: "Consequences of Industrialization (c. 1750–1900)",
    title: "신제국주의 — 원인과 아프리카 쟁탈전",
    subtitle:
      "산업화된 열강들이 단 한 세대 만에 아프리카를 갈라 나눠 가졌습니다 — 원료, 경쟁심, 그리고 인종주의 이데올로기가 그 동력이었어요.",
    overview:
      "1800년대 후반, 산업화된 국가들은 무서운 속도로 식민지를 차지했습니다 — 특히 아프리카에서요. 이게 바로 '아프리카 쟁탈전(Scramble for Africa)'입니다. 산업화는 새로운 굶주림(원료, 시장)을 만들었고, 동시에 빠른 정복을 가능하게 한 새로운 도구(기관총, 증기선, 퀴닌)까지 쥐여줬어요. 욕망과 수단이 한꺼번에 갖춰진 거죠.",
    objectives: [
      "신제국주의의 경제적·정치적·이데올로기적 원인을 설명할 수 있다.",
      "아프리카 쟁탈전과 베를린 회의를 서술할 수 있다.",
      "제국주의 정복을 가능하게 한 기술들을 식별할 수 있다.",
    ],
    formulas: [],
    diagram: "cause-effect",
    sections: [
      {
        title: "왜 '신'제국주의였나?",
        subtitle: null,
        body:
          "땅을 빼앗는 이 거대한 움직임을 밀어붙인 건 산업 경제였고, 그것을 정당화한 건 인종주의 이데올로기였습니다. 둘은 한 몸으로 움직였어요.",
        keyIdea:
          "산업화는 정복의 '동기(MOTIVE, 자원·시장)'와 '수단(MEANS, 기관총·퀴닌)'을 동시에 만들어냈습니다 — 그래서 빠른 정복이 가능했죠.",
        table: {
          headers: ["원인", "추동력"],
          rows: [
            ["경제적", "원료(고무·광물) + 상품을 팔 시장"],
            ["정치적", "국가적 위신과 전략적 경쟁"],
            ["이데올로기적", "사회진화론과 '문명화 사명'"],
            ["기술적", "기관총·증기선·퀴닌이 정복을 실현 가능하게 만듦"],
          ],
        },
        terms: [],
        traps: [],
        example: null,
      },
      {
        title: "한 대륙을 도려내다",
        subtitle: null,
        body:
          "베를린 회의(Berlin Conference, 1884~85)에서 유럽 열강들은 아프리카를 자기들끼리 나눠 가졌습니다 — 아프리카인은 한 명도 참석하지 못한 채, 기존 종족 집단은 거의 고려하지 않고 국경을 그어버렸어요. 이게 오늘날까지 이어지는 분쟁의 뿌리가 됩니다. 퀴닌(quinine) 덕분에 유럽인은 말라리아를 견디고 살아남을 수 있었고, 기관총은 저항을 값비싼 대가를 치러야 하는 일로 만들었죠.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "아프리카 쟁탈전 (Scramble for Africa)",
            def: "1800년대 후반 유럽이 아프리카 거의 전체를 급속히 식민화한 사건.",
          },
          {
            term: "베를린 회의 (Berlin Conference)",
            def: "유럽인들이 아프리카를 자기들끼리 분할한 1884~85년 회의.",
          },
          {
            term: "사회진화론 (Social Darwinism)",
            def: "'적자생존'을 잘못 적용해 제국주의와 인종주의를 정당화한 사상.",
          },
        ],
        traps: [
          "베를린 회의에서 그은 국경은 아프리카의 종족 현실을 무시했습니다 — 이후 수많은 분쟁의 근원이 됐어요.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-world-history-u6-l2",
    courseId: "ap-world-history",
    subjectLabel: "AP World History",
    emoji: "🌍",
    unit: 6,
    lessonNum: 2,
    unitName: "Consequences of Industrialization (c. 1750–1900)",
    title: "아시아의 제국주의 — 인도와 중국 비교",
    subtitle:
      "두 거인, 두 가지 지배 방식: 인도는 직접 식민지가 됐고, 중국은 공식적으로 정복당하지 않은 채 세력권으로 갈라졌습니다.",
    overview:
      "산업 열강은 아시아를 서로 다른 방식으로 지배했습니다. 영국은 인도를 식민지로 직접 통치했어요(영국령 인도, the Raj). 중국은 완전히 식민지가 되지는 않았지만, 군사적 패배 이후 강제로 문이 열리고 세력권으로 분할됐습니다 — 이른바 반(半)식민지 상태죠.",
    objectives: [
      "영국이 어떻게 인도를 직접 통치하게 됐는지 서술할 수 있다.",
      "중국의 반식민지적 지배(아편전쟁, 불평등 조약)를 설명할 수 있다.",
      "두 제국주의 모델을 비교할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "인도 vs 중국 — 두 가지 모델",
        subtitle: null,
        body:
          "인도는 '직접' 식민 통치를 보여주고, 중국은 '비공식적·경제적' 제국주의를 보여줍니다. 둘을 나란히 놓고 비교해 보세요.",
        keyIdea:
          "인도 = 공식적인 식민지(the Raj). 중국 = 반(半)식민지 — 패배하고 세력권으로 갈라졌지만, 완전히 정복당하지는 않았어요.",
        table: {
          headers: ["", "인도", "중국"],
          rows: [
            [
              "지배 주체",
              "영국 동인도회사 → 영국 왕실(Raj)",
              "여러 열강이 세력권을 통해 분할 지배",
            ],
            [
              "전환점",
              "세포이 항쟁(1857) → 왕실 직접 통치",
              "아편전쟁 → 불평등 조약",
            ],
            [
              "지위",
              "공식 식민지",
              "반식민지(명목상 주권은 유지)",
            ],
          ],
        },
        terms: [],
        traps: [],
        example: null,
      },
      {
        title: "어떻게 그렇게 됐나",
        subtitle: null,
        body:
          "인도에서는 영국 동인도회사가 상업적으로 통치하다가, 세포이 항쟁(Sepoy Rebellion, 1857)을 계기로 영국 왕실이 직접 통제권을 가져갔습니다. 중국에서는 아편전쟁 패배가 항구를 개방하고 홍콩을 할양하는 '불평등 조약'을 강요했고, 그 뒤로 외국 열강들이 각자 배타적인 세력권을 차지했어요.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "영국령 인도 (British Raj)",
            def: "1858년 이후 영국 왕실의 인도 직접 통치.",
          },
          {
            term: "아편전쟁 (Opium Wars)",
            def: "불평등 조약을 통해 중국을 강제로 개방시킨 전쟁들.",
          },
          {
            term: "세력권 (Spheres of influence)",
            def: "한 외국 열강이 중국 내에서 배타적 무역·경제 권리를 가졌던 지역.",
          },
        ],
        traps: [
          "중국은 공식 식민지가 '아니었습니다' — 명목상 주권은 유지했지만 실질적 통제권은 세력권에 넘겨줬죠('반식민지').",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-world-history-u6-l3",
    courseId: "ap-world-history",
    subjectLabel: "AP World History",
    emoji: "🌍",
    unit: 6,
    lessonNum: 3,
    unitName: "Consequences of Industrialization (c. 1750–1900)",
    title: "제국주의에 대한 대응 — 수용과 저항",
    subtitle:
      "식민지가 된 사람들은 결코 수동적이지 않았습니다: 봉기하고, 개혁하고, 민족주의 운동을 일으켰고 — 몇몇은 실제로 이기기까지 했어요.",
    overview:
      "제국주의의 압박을 받은 사람들은 크게 세 가지로 대응했습니다: 무장 저항, 개혁과 근대화(제국주의자들을 그들의 방식으로 이겨보려는 시도), 그리고 조직된 민족주의. 그리고 몇몇 국가는 저항에 성공했어요 — 가장 유명한 사례가 일본과 에티오피아입니다.",
    objectives: [
      "제국주의에 대한 주요 대응 방식들을 분류할 수 있다.",
      "저항·개혁·민족주의의 사례를 들 수 있다.",
      "일본과 에티오피아가 예외였던 이유를 설명할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "세 가지 대응 방식",
        subtitle: null,
        body:
          "대응은 폭력적 봉기에서부터, 의도적인 자기 근대화, 정치적 조직화에 이르기까지 다양했습니다.",
        keyIdea:
          "일본은 단순히 저항만 한 게 아니라 '산업화(메이지)'를 이뤄 스스로 제국주의 열강이 됐습니다. 에티오피아는 군사적으로 이탈리아를 격파했고요.",
        table: {
          headers: ["대응", "사례"],
          rows: [
            ["무장 저항", "세포이 항쟁(인도), 의화단 운동(중국)"],
            [
              "개혁 / 근대화",
              "메이지 일본, 오스만 탄지마트, 중국의 양무운동",
            ],
            ["민족주의", "자치를 위해 조직된 인도 국민회의"],
            [
              "성공적 저항",
              "에티오피아가 아드와 전투(1896)에서 이탈리아 격파; 일본의 산업화",
            ],
          ],
        },
        terms: [],
        traps: [],
        example: null,
      },
      {
        title: "왜 어떤 곳은 성공했나",
        subtitle: null,
        body:
          "일본의 메이지 유신(Meiji Restoration)은 서구의 기술·산업·군사 방식을 충분히 빠르게 받아들여 식민화를 피했고 — 더 나아가 다른 나라를 식민화하기에 이르렀습니다. 에티오피아는 메넬리크 2세 아래에서 군대를 근대화해 침략해 온 이탈리아를 아드와에서 격파했어요. 반면 대부분의 개혁 시도(청 말기 중국, 오스만 제국)는 너무 느려서 쇠퇴를 막지 못했습니다.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "메이지 유신 (Meiji Restoration)",
            def: "일본이 제국주의에 저항하고 열강이 되게 만든 빠른 하향식 근대화.",
          },
          {
            term: "양무운동 (Self-Strengthening Movement)",
            def: "중국의 제한적이고 결국엔 불충분했던 근대화 시도.",
          },
        ],
        traps: [
          "개혁 ≠ 자동적 성공 — 일본의 개혁은 통했지만, 중국과 오스만의 개혁은 너무 느리고 부분적이었어요.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-world-history-u6-l4",
    courseId: "ap-world-history",
    subjectLabel: "AP World History",
    emoji: "🌍",
    unit: 6,
    lessonNum: 4,
    unitName: "Consequences of Industrialization (c. 1750–1900)",
    title: "경제적 제국주의 — 수출 경제와 종속",
    subtitle:
      "지배받기 위해 꼭 식민지일 필요는 없었습니다 — 산업 열강은 무역과 부채를 통해 지역 전체를 지배했어요.",
    overview:
      "공식 식민지 너머에서도, 산업 열강은 전 세계의 경제를 재편했습니다. 여러 지역이 유럽 공장을 위해 소수의 원료나 환금작물을 생산하고, 유럽의 공산품을 사도록 내몰렸어요 — 변덕스러운 세계 가격에 휘둘리는 종속적 수출 경제가 만들어진 거죠.",
    objectives: [
      "경제적 제국주의와 수출 경제를 정의할 수 있다.",
      "그 결과로 생긴 종속을 설명할 수 있다.",
      "사례(환금작물, 탈산업화)를 들 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "수출 경제",
        subtitle: null,
        body:
          "식민지·반식민지가 된 지역들은 다각화된 경제 대신, 수출을 위한 단일 원료나 환금작물 생산에 매달리도록 유도됐습니다. 그러고는 산업 열강에서 완제품을 사 와야 했죠.",
        keyIdea:
          "수출 경제는 다각화를 종속과 맞바꿨습니다 — 부는 밖으로 흘러나가고, 가격이 한 번만 폭락해도 경제 전체가 무너질 수 있었어요.",
        table: {
          headers: ["지역", "강요된 수출품"],
          rows: [
            ["인도", "면화(원료) — 정작 자국 면직 산업은 잠식당함"],
            ["카리브해 / 브라질", "설탕, 커피"],
            ["서아프리카", "팜유, 카카오"],
            ["라틴아메리카", "광물, 소고기, 구아노"],
          ],
        },
        terms: [],
        traps: [],
        example: null,
      },
      {
        title: "종속과 탈산업화",
        subtitle: null,
        body:
          "한두 가지 수출품에 의존하다 보니 경제는 세계 가격 변동에 취약해졌습니다(종속, dependency). 더 심각하게는, 값싼 영국 공장제 면직물이 인도로 쏟아져 들어와 한때 세계를 지배하던 인도의 면직 산업을 파괴했어요 — 이게 탈산업화(deindustrialization)입니다. 이 구조는 산업 중심부를 부유하게 만들고, 주변부를 원료 공급자 자리에 가둬버렸죠.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "경제적 제국주의 (Economic imperialism)",
            def: "직접 통치가 아니라 무역·투자·부채를 통해 한 지역의 경제를 지배하는 것.",
          },
          {
            term: "종속 (Dependency)",
            def: "소수 상품 수출에 의존해 가격 변동에 경제가 취약해지는 상태.",
          },
        ],
        traps: [
          "경제적 제국주의에는 깃발이 필요 없었습니다 — 라틴아메리카는 정치적으로 독립했지만 경제적으로는 지배당했어요.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-world-history-u6-l5",
    courseId: "ap-world-history",
    subjectLabel: "AP World History",
    emoji: "🌍",
    unit: 6,
    lessonNum: 5,
    unitName: "Consequences of Industrialization (c. 1750–1900)",
    title: "산업화 시대의 이주",
    subtitle:
      "산업화는 세계를 움직이게 했습니다 — 일자리를 찾아 바다를 건너고, 시골에서 도시로요.",
    overview:
      "산업 시대는 전례 없는 규모의 대규모 이주를 촉발했습니다: 유럽인은 아메리카로, 아시아의 계약 노동자는 전 세계로, 농촌 사람들은 도시로 몰려들었어요. 새로운 교통수단(증기선·철도)이 이를 가능하게 했고, 양쪽 끝의 사회 모두를 바꿔놓았습니다.",
    objectives: [
      "산업 시대의 주요 이주 패턴을 식별할 수 있다.",
      "이주를 추동한 배출·흡인 요인을 설명할 수 있다.",
      "대규모 이주의 사회적 영향을 서술할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "누가 어디로 이동했나",
        subtitle: null,
        body:
          "이주는 증기선과 철도의 힘을 빌려 몇 갈래의 주요 흐름을 따라 움직였습니다.",
        keyIdea:
          "노예제 폐지 이후, 아시아(인도·중국)의 '계약(INDENTURED)' 노동자가 플랜테이션의 새로운 세계 노동력이 됐습니다.",
        table: {
          headers: ["이주", "추동 요인"],
          rows: [
            ["유럽인 → 아메리카", "빈곤 탈출; 토지와 일자리 추구"],
            [
              "인도·중국 계약 노동자 → 카리브해·아프리카·동남아시아",
              "노예 플랜테이션 노동을 대체",
            ],
            ["농촌 → 도시(국내)", "성장하는 도시의 공장 일자리"],
          ],
        },
        terms: [],
        traps: [],
        example: null,
      },
      {
        title: "사회적 영향",
        subtitle: null,
        body:
          "이주자들은 도착 도시에서 종족 거주지(ethnic enclave)를 형성하고 고향으로 송금(remittances)을 보냈습니다. 이주는 종종 성비를 한쪽으로 기울게 했고(이주자 다수가 젊은 남성이었으니까요), 토착주의(nativism) — 즉 새로 온 사람들에 대한 반발과 차별 — 를 불러일으켰어요(예: 중국인 배척법).",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "종족 거주지 (Ethnic enclave)",
            def: "한 종족·이민자 집단이 높은 비율로 모여 사는 지역.",
          },
          {
            term: "토착주의 (Nativism)",
            def: "기존 거주민이 이민자에게 보이는 적대감과 차별 정책.",
          },
          {
            term: "송금 (Remittances)",
            def: "이주자가 고국의 가족에게 부쳐 보내는 돈.",
          },
        ],
        traps: [
          "이주는 출발지(송금·성비 불균형)와 도착지(거주지·토착주의) '양쪽' 사회를 모두 바꿔놓았습니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-world-history-u6-l6",
    courseId: "ap-world-history",
    subjectLabel: "AP World History",
    emoji: "🌍",
    unit: 6,
    lessonNum: 6,
    unitName: "Consequences of Industrialization (c. 1750–1900)",
    title: "제국주의 이데올로기로서의 사회진화론과 인종주의",
    subtitle:
      "제국은 정당화가 필요했습니다 — 그리고 사이비 과학이 치명적인 정당화를 공급했죠.",
    overview:
      "제국주의는 단지 경제와 권력의 문제만이 아니었습니다 — 그것은 이데올로기로 포장돼 있었어요. 유럽인들은 사회진화론, '문명화 사명', 그리고 과학적 인종주의로 정복을 정당화했습니다 — 지배를 자연스러운 것, 심지어 자비로운 것으로 둔갑시킨 믿음들이었죠.",
    objectives: [
      "사회진화론이 어떻게 제국주의를 정당화했는지 설명할 수 있다.",
      "'문명화 사명'과 과학적 인종주의를 정의할 수 있다.",
      "이데올로기를 제국의 도구로서 분석할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "제국을 정당화한 이데올로기들",
        subtitle: null,
        body:
          "사회진화론(Social Darwinism)은 다윈의 '적자생존'을 인간 사회에 잘못 적용해, 더 강한 '인종'과 국가가 더 약한 쪽을 지배하는 것이 자연의 섭리라고 주장했습니다. 여기에 '백인의 짐(White Man's Burden)' — 유럽인이 식민지 사람들을 '문명화'할 의무가 있다는 생각 — 과, 인간을 인종으로 서열화한 사이비 과학적 인종주의가 짝을 이뤘어요.",
        keyIdea:
          "이데올로기는 정복에 도덕의 가면을 씌웠습니다: 사회진화론 + '문명화 사명'은 지배를 자연스럽고 고귀한 것처럼 보이게 만들었죠.",
        table: null,
        terms: [
          {
            term: "사회진화론 (Social Darwinism)",
            def: "'적자생존'을 그릇되게 적용해 제국주의와 인종 위계를 정당화한 사상.",
          },
          {
            term: "백인의 짐 (White Man's Burden)",
            def: "유럽인이 식민지 사람들을 '문명화'할 의무가 있다는 인종주의적 관념.",
          },
          {
            term: "과학적 인종주의 (Scientific racism)",
            def: "인종을 서열화하고 지배를 정당화하는 데 쓰인 사이비 과학적 주장.",
          },
        ],
        traps: [
          "사회진화론은 다윈 생물학의 '오용'입니다 — 종(種)이 아니라 사회에 적용해 잔혹함을 변명한 거예요.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-world-history-u6-l7",
    courseId: "ap-world-history",
    subjectLabel: "AP World History",
    emoji: "🌍",
    unit: 6,
    lessonNum: 7,
    unitName: "Consequences of Industrialization (c. 1750–1900)",
    title: "19세기 여성 권리 운동",
    subtitle:
      "혁명과 개혁의 시대가 마침내 평등의 이상을 여성에게로 돌렸습니다.",
    overview:
      "산업 사회와 개혁 운동이 확산되면서, 여성들은 자신의 권리 — 투표권, 재산 소유권, 교육받을 권리 — 를 위해 조직을 만들었습니다. 19세기 여성 권리 운동은 평등이라는 계몽주의 이상을 젠더에 적용했고, 20세기 참정권 운동의 토대를 놓았어요.",
    objectives: [
      "19세기 여성 권리 운동의 목표를 서술할 수 있다.",
      "주요 이정표(세니커폴스)를 식별할 수 있다.",
      "이 운동을 더 넓은 개혁 이상과 연결할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "평등을 위한 조직화",
        subtitle: null,
        body:
          "여성 권리 운동가들은 — 그중 다수는 노예제 폐지 운동에도 함께 참여했는데 — 참정권(투표권), 재산권, 그리고 교육 기회를 요구했습니다. 미국에서는 세니커폴스 회의(Seneca Falls Convention, 1848)가 '감정 선언(Declaration of Sentiments)'과 함께 조직된 운동의 출발을 알렸고, 이 선언은 독립선언서를 그대로 빗댄 것이었어요.",
        keyIdea:
          "세니커폴스(1848)는 '모든 남성 AND 여성은 평등하게 창조되었다'를 적용했습니다 — 혁명의 이상을 젠더로 확장한 거죠.",
        table: null,
        terms: [
          {
            term: "세니커폴스 회의 (Seneca Falls Convention)",
            def: "미국의 조직된 여성 권리 운동을 출범시킨 1848년 회의.",
          },
          {
            term: "참정권 (Suffrage)",
            def: "투표할 권리 — 여성 운동의 핵심 요구였습니다.",
          },
        ],
        traps: [
          "여성 운동은 '노예제 폐지'와 나란히 성장했습니다 — 많은 지도자가 같은 평등 논리를 적용하며 둘 다를 위해 싸웠어요.",
        ],
        example: null,
      },
    ],
  },
];
