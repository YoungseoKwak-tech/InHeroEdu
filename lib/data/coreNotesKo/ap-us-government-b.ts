/**
 * Core Notes 한국어 스토리텔링 버전 — AP US Government and Politics Units 3–5.
 * 원본 내용 전량 보존(overview·body·keyIdea·table·diagram 포함) + 일타강사 내러티브.
 * 용어는 "한국어 (English)" 병기.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const AP_US_GOVERNMENT_B_KO: CoreNote[] = [
  {
    lessonId: "ap-us-government-u3-l1",
    courseId: "ap-us-government",
    subjectLabel: "AP US Government and Politics",
    emoji: "🏛️",
    unit: 3,
    lessonNum: 1,
    unitName: "Civil Liberties and Civil Rights",
    title: "선택적 편입 — 권리를 주(州)에 적용하기",
    subtitle:
      "권리장전을 워싱턴(연방)뿐 아니라 주 정부에까지 강제로 지키게 만드는 장치입니다.",
    overview:
      "원래 권리장전(Bill of Rights)은 오직 '연방' 정부만 제한했어요. 그런데 연방대법원이 선택적 편입(selective incorporation)을 통해, 수정헌법 14조의 적법절차 조항(due process clause)을 활용해서 그 보호 장치 대부분을 사건마다 하나씩 '주'에까지 적용해 온 겁니다. 자, 어떻게 권리가 주 정부의 문턱을 넘었는지 따라가 봅시다.",
    objectives: [
      "선택적 편입과 그 헌법적 근거를 설명할 수 있다.",
      "선택적 편입이 왜 필요했는지 설명할 수 있다.",
      "편입된 권리의 예시를 들 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "권리가 주에 닿은 경로",
        subtitle: null,
        body:
          "권리장전(1791)은 처음에는 오직 연방 정부만 묶었습니다 — 주는 이런 자유를 침해할 수 있었고, 실제로 침해했어요. 그런데 수정헌법 14조(1868)가 주에 대해 '적법절차'를 보장하면서, 대법원은 특정 보호 장치를 한 번에 하나씩 편입(incorporation)해 주·지방 정부에 적용하기 시작합니다.",
        keyIdea:
          "선택적 편입은 수정헌법 14조의 '적법절차' 조항을 통해 권리장전의 보호 장치를 '주'에 적용합니다 — 한 번에 하나의 권리씩.",
        table: null,
        terms: [
          {
            term: "선택적 편입 (Selective incorporation)",
            def: "권리장전의 보호 장치를 수정헌법 14조를 통해 사건마다 하나씩 주에 적용하는 것.",
          },
          {
            term: "적법절차 조항 (Due process clause)",
            def: "편입의 수단(통로)으로 쓰이는 수정헌법 14조의 조항.",
          },
        ],
        traps: [],
        example: null,
      },
      {
        title: "왜 중요한가",
        subtitle: null,
        body:
          "편입은 헌법이 미치는 범위를 통째로 바꿔놓았어요. 오늘날 주나 시(市)는 당신의 표현의 자유, 종교의 자유로운 행사, 변호인을 둘 권리를 침해할 수 없습니다 — 그 권리들이 편입됐기 때문이죠. '선택적'이라 부르는 이유는, 대법원이 권리를 한꺼번에가 아니라 개별적으로 적용했기 때문이에요 — 잘 알려지지 않은 몇몇 권리는 아직 편입되지 않은 채 남아 있습니다.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "수정헌법 14조 (14th Amendment)",
            def: "남북전쟁 이후 제정된 수정헌법으로, 주에 대해 적법절차와 평등 보호를 보장한다.",
          },
        ],
        traps: [
          "'선택적'입니다 — 권리는 한꺼번에가 아니라 사건을 통해 하나씩 편입됐어요. 그 수단(통로)이 바로 수정헌법 14조입니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-us-government-u4-l1",
    courseId: "ap-us-government",
    subjectLabel: "AP US Government and Politics",
    emoji: "🏛️",
    unit: 4,
    lessonNum: 1,
    unitName: "American Political Ideologies and Beliefs",
    title: "정치 사회화와 여론",
    subtitle:
      "당신의 정치적 견해가 어디서 오는지 — 그리고 대중이 무엇을 생각하는지를 우리가 (불완전하게) 측정하는 방법.",
    overview:
      "정치 사회화(political socialization)는 정치적 신념을 형성해 가는 평생에 걸친 과정으로, 가족·학교·미디어·사건들에 의해 빚어집니다. 여론(public opinion) — 그런 신념들의 총합 — 은 여론조사로 측정되는데, 정확하려면 그리고 정책과 선거에 영향을 미치려면 조사가 신중하게 설계돼야 해요. 견해가 어디서 오고, 그걸 어떻게 재는지 차근차근 짚어 봅시다.",
    objectives: [
      "정치 사회화의 매개체(행위자)를 식별할 수 있다.",
      "과학적 여론조사가 작동하는 방식과 그 함정을 설명할 수 있다.",
      "이념을 정책 선호와 연결할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "신념은 어디서 오는가",
        subtitle: null,
        body:
          "여러 사회화 매개체(agents of socialization)가 정치적 견해를 빚습니다 — 가족(가장 강력한 초기 영향), 학교, 또래, 종교, 미디어, 그리고 한 세대 전체에 흔적을 남길 수 있는 큰 사건들(전쟁·경기침체). 이것들이 한 사람이 진보–보수 스펙트럼의 어디에 위치하는지를 결정해요.",
        keyIdea:
          "'가족'이 정치 사회화의 가장 강력한 단일 매개체입니다 — 특히 인생 초기에요.",
        table: null,
        terms: [
          {
            term: "정치 사회화 (Political socialization)",
            def: "정치적 신념과 가치를 습득해 가는 평생에 걸친 과정.",
          },
          {
            term: "사회화 매개체 (Agents of socialization)",
            def: "견해를 빚는 가족·학교·또래·미디어·종교·사건들.",
          },
        ],
        traps: [],
        example: null,
      },
      {
        title: "여론 측정하기",
        subtitle: null,
        body:
          "과학적 여론조사는 무작위 표본을 써서 모든 사람이 뽑힐 확률을 동일하게 만들고, 그 덕에 결과를 오차 범위(margin of error) 안에서 일반화할 수 있게 합니다(표본이 작을수록 오차는 커져요). 질문 문구가 나쁘거나, 표본이 편향됐거나, 응답자가 대표성이 없으면 결과가 왜곡돼요. 신뢰할 만한 여론조사는 선거 운동과 정책을 좌우합니다.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "무작위 표집 (Random sampling)",
            def: "모집단의 모든 구성원이 조사에 뽑힐 확률이 동일한 것 — 타당한 여론조사의 핵심.",
          },
          {
            term: "오차 범위 (Margin of error)",
            def: "여론조사 결과가 참값과 차이날 수 있는 범위. 표본이 클수록 줄어든다.",
          },
          {
            term: "표집 편향 (Sampling bias)",
            def: "대표성이 없는 표본으로 인해 조사 결과가 한쪽으로 치우치는 것.",
          },
        ],
        traps: [
          "타당한 여론조사에는 '무작위'이고 대표성 있는 표본이 필요해요 — 거대하지만 편향된 표본은 작더라도 무작위인 표본보다 못합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-us-government-u5-l1",
    courseId: "ap-us-government",
    subjectLabel: "AP US Government and Politics",
    emoji: "🏛️",
    unit: 5,
    lessonNum: 1,
    unitName: "Political Participation",
    title: "정당 — 기능과 정계 재편",
    subtitle:
      "정당은 정치를 조직합니다 — 후보를 영입하고, 유권자를 동원하고, 때때로 자신의 연합을 재발명합니다.",
    overview:
      "정당(political parties)은 시민을 정부에 연결합니다. 후보를 영입·공천하고, 유권자를 동원하고, 정부를 조직하고, 브랜드/강령을 제시해요. 미국의 양당제는 선거 규칙에 의해 강화되며, 정당의 연합은 정계 재편(realignment)을 통해 시간이 지나며 변합니다. 정당이 정확히 무엇을 하는지, 그리고 왜 미국은 두 정당으로 굳어졌는지 봅시다.",
    objectives: [
      "정당의 기능을 설명할 수 있다.",
      "미국에 양당제가 존재하는 이유를 설명할 수 있다.",
      "정계 재편을 정의할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "정당이 하는 일",
        subtitle: null,
        body:
          "정당은 후보를 영입·공천하고, 유권자를 동원·교육하고, 정부를 조직하며(지도부·위원회), 유권자가 지름길로 쓰는 라벨을 제공합니다. 시민과 선출직 공직자를 잇는 핵심 조직화 세력이에요.",
        keyIdea:
          "정당은 중개자입니다 — 후보를 공천하고, 유권자를 동원하고, 입법부를 조직함으로써 유권자를 정부에 연결해요.",
        table: null,
        terms: [
          {
            term: "정당 (Political party)",
            def: "후보를 공천하고 정부를 장악하려 하는 조직.",
          },
          {
            term: "정당 강령 (Party platform)",
            def: "한 정당이 내세우는 입장과 목표.",
          },
        ],
        traps: [],
        example: null,
      },
      {
        title: "양당제와 정계 재편",
        subtitle: null,
        body:
          "미국이 안정적인 양당제를 갖는 건 주로 승자독식·소선거구제(single-member districts) 때문이에요(뒤베르제의 법칙, Duverger's law) — 이 구조가 제3당을 짜내 버립니다. 가끔은 중대 선거(critical election)가 정계 재편을 촉발해요 — 어떤 집단이 어떤 정당을 지지하는지가 지속적으로 바뀌는 거죠(예: 뉴딜 연합). 제3당은 좀처럼 이기지 못하지만 쟁점을 제기하고 스포일러(표 갈라먹기) 역할을 할 수 있습니다.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "승자독식 (Winner-take-all)",
            def: "두 거대 정당에 유리한 소선거구제(뒤베르제의 법칙).",
          },
          {
            term: "정계 재편 (Realignment)",
            def: "정당들의 지지 연합에서 일어나는 지속적인 변화.",
          },
        ],
        traps: [
          "양당제는 주로 '승자독식/소선거구제' 때문에 생깁니다 — 제3당을 금지하는 어떤 법 때문이 아니에요.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-us-government-u5-l2",
    courseId: "ap-us-government",
    subjectLabel: "AP US Government and Politics",
    emoji: "🏛️",
    unit: 5,
    lessonNum: 2,
    unitName: "Political Participation",
    title: "이익집단과 선거자금",
    subtitle:
      "조직된 돈과 영향력 — 선거와 선거 사이에 누가 정책을 빚는가, 그리고 선거자금을 규율하는 규칙(과 빠져나갈 구멍).",
    overview:
      "이익집단(interest groups)은 공통의 관심사를 대표하며, 로비·소송·선거를 통해 정책에 영향을 미칩니다. 선거자금법은 돈의 부패시키는 영향을 제한하려 하지만, 법원 판결 — 특히 시티즌스 유나이티드(Citizens United) — 이 PAC와 슈퍼 PAC를 통한 무제한 독립 지출의 문을 열어 버렸어요. 이익집단이 어떻게 움직이고, 돈을 둘러싼 규칙이 어떻게 흔들렸는지 봅시다.",
    objectives: [
      "이익집단이 정책에 영향을 미치는 방식을 설명할 수 있다.",
      "PAC와 슈퍼 PAC를 구별할 수 있다.",
      "시티즌스 유나이티드 판결의 영향을 설명할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "이익집단은 어떻게 작동하는가",
        subtitle: null,
        body:
          "이익집단은 로비(공직자를 직접 설득)하고, 소송과 법정조언서(amicus brief)를 제출하고, 회원을 동원하고, 후보를 평가/지지함으로써 정부에 영향을 미칩니다. 대의(大義)와 산업에 조직된 목소리를 부여해요 — 다만 자금이 풍부한 집단이 과도한 영향력을 갖는다는 우려를 낳습니다.",
        keyIdea:
          "이익집단은 단지 기부만으로가 아니라 '로비'·소송·회원 동원을 통해 선거와 선거 사이에 정책에 영향을 미칩니다.",
        table: null,
        terms: [
          {
            term: "이익집단 (Interest group)",
            def: "공통의 목표를 위해 공공 정책에 영향을 미치려는 조직.",
          },
          {
            term: "로비 (Lobbying)",
            def: "정부 공직자를 정책에 관해 직접 설득하려는 활동.",
          },
        ],
        traps: [],
        example: null,
      },
      {
        title: "선거자금",
        subtitle: null,
        body:
          "PAC(정치활동위원회, political action committee)는 후보에게 직접 기부하기 위해 돈을 모으며, 한도가 있습니다. 슈퍼 PAC(super PAC)는 독립적인 광고에 '무제한'으로 돈을 모으고 쓸 수 있지만, 선거운동본부에 직접 기부하거나 그들과 조율할 수는 없어요. 연방대법원의 시티즌스 유나이티드 대 FEC(2010) 판결은 독립적인 정치 지출이 보호받는 표현이라고 판시하여 슈퍼 PAC를 풀어놓았습니다.",
        keyIdea:
          "시티즌스 유나이티드(2010)는 '무제한' 독립 지출을 허용했어요 → 슈퍼 PAC의 부상(이들은 후보에게 직접 기부할 수 없음).",
        table: {
          headers: ["", "PAC", "슈퍼 PAC (Super PAC)"],
          rows: [
            ["후보에게 기부 가능?", "예 (한도 있음)", "아니오 (독립 지출만)"],
            ["지출 한도", "있음", "무제한 (독립 지출)"],
          ],
        },
        terms: [],
        traps: [
          "슈퍼 PAC는 '무제한'의 돈을 '독립적으로' 쓰지만, 후보에게 기부하거나 후보와 조율할 수는 없어요 — 그게 바로 시티즌스 유나이티드가 그은 법적 경계선입니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-us-government-u5-l3",
    courseId: "ap-us-government",
    subjectLabel: "AP US Government and Politics",
    emoji: "🏛️",
    unit: 5,
    lessonNum: 3,
    unitName: "Political Participation",
    title: "선거와 투표 행태",
    subtitle:
      "미국인이 지도자를 선택하는 방법 — 선거의 규칙, 그리고 사람들이 투표할지 말지·어떻게 할지를 실제로 좌우하는 것들.",
    overview:
      "선거는 대중의 선호를 권력으로 번역합니다. 대통령 선거는 전국 일반 투표가 아니라 선거인단(Electoral College)을 거쳐요. 투표율과 선택은 인구통계, 정당 충성도, 후보, 그리고 참여를 높이거나 낮추는 구조적 요인들에 의해 빚어집니다. 선거의 규칙과 투표 행태의 동력을 차근차근 짚어 봅시다.",
    objectives: [
      "선거인단과 그 결과(영향)를 설명할 수 있다.",
      "투표율에 영향을 미치는 요인을 식별할 수 있다.",
      "사람들이 어떻게 투표할지를 좌우하는 것을 설명할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "선거인단",
        subtitle: null,
        body:
          "대통령은 선거인단으로 선출됩니다 — 각 주는 자기 의회 의원 수와 같은 수의 선거인을 받고, (대부분의 주에서) 승자독식 방식으로 그 주의 일반 투표 승자에게 그 주 선거인 전부를 몰아줘요. 후보는 538명 중 270명을 얻어야 합니다. 이 때문에 후보는 전국 일반 투표에서 '지면서도' 대통령직을 '이길' 수 있고, 선거운동이 경합주(swing state)에 집중되게 됩니다.",
        keyIdea:
          "선거인단 270표가 필요해요 — 그리고 승자독식 때문에, 전국 일반 투표에서 '지고도' 대통령직을 '이길' 수 있습니다.",
        table: null,
        terms: [
          {
            term: "선거인단 (Electoral College)",
            def: "대통령을 공식적으로 선출하는 기구. 선거인 538명, 당선에 270표 필요.",
          },
          {
            term: "경합주 (Swing state)",
            def: "박빙의 선거를 결정짓고 선거운동의 관심을 끌어모으는 경쟁이 치열한 주.",
          },
        ],
        traps: [],
        example: null,
      },
      {
        title: "누가 투표하고, 왜 그렇게 선택하는가",
        subtitle: null,
        body:
          "투표율은 학력·소득·나이가 높을수록 올라가고(나이가 많을수록 더 투표함), 법률(등록 규칙, 신분증법)과 선거 유형(대선이 있는 해가 중간선거보다 더 많이 끌어들임)에 의해 빚어집니다. 투표 선택은 정당 일체감(party identification, 가장 강력한 예측 변수), 후보의 특성, 쟁점, 그리고 경제에 대한 회고적 평가에 의해 좌우돼요.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "투표율 (Voter turnout)",
            def: "실제로 투표하는 유권자 자격자의 비율. 나이가 많고, 부유하고, 교육받은 시민에게서 더 높다.",
          },
          {
            term: "정당 일체감 (Party identification)",
            def: "유권자가 한 정당에 갖는 애착 — 투표 선택의 가장 강력한 단일 예측 변수.",
          },
          {
            term: "합리적/회고적 투표 (Rational/retrospective voting)",
            def: "쟁점에 근거하거나, 일들(예: 경제)이 어떻게 흘러왔는지에 근거해 선택하는 것.",
          },
        ],
        traps: [
          "정당 일체감이 누군가의 투표 방식을 가장 '강력하게' 예측합니다. 투표율은 중간선거보다 '대선이 있는 해'에 더 높아요.",
        ],
        example: null,
      },
    ],
  },
];
