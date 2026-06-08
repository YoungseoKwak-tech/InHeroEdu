/**
 * Core Notes 한국어 스토리텔링 버전 — AP World History Unit 3 (3.1–3.6).
 * 원본 내용 전량 보존(overview·body·keyIdea·table·diagram 포함) + 일타강사 내러티브.
 * 용어는 "한국어 (English)" 병기.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const AP_WORLD_HISTORY_U3_KO: CoreNote[] = [
  {
    lessonId: "ap-world-history-u3-l1",
    courseId: "ap-world-history",
    subjectLabel: "AP World History",
    emoji: "🌍",
    unit: 3,
    lessonNum: 1,
    unitName: "Land-Based Empires (c. 1450–1750)",
    title: "오스만 제국 — 화약, 데브시르메, 그리고 팽창",
    subtitle:
      "대포로 정복하고, 충성스러운 노예-군인 엘리트로 통치한 수니파 무슬림 제국.",
    overview:
      "오스만 제국(Ottoman Empire)은 이른바 '화약 제국들' 중 가장 오래 존속한 나라예요. 우수한 화기로 팽창했고 — 그 유명한 1453년 콘스탄티노플 함락이 대표적이죠 — 두 가지 독특한 제도로 굴러갔습니다. 엘리트 예니체리 병사를 길러낸 데브시르메(devshirme), 그리고 수많은 종교를 관리한 밀레트 제도(millet system). 이 두 축을 잡으면 오스만이 한눈에 들어와요.",
    objectives: [
      "화약 무기가 어떻게 오스만 팽창을 이끌었는지 설명할 수 있다.",
      "데브시르메 제도와 예니체리를 서술할 수 있다.",
      "밀레트 제도가 어떻게 종교적 다양성을 통치했는지 설명할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "화약에 의한 정복",
        subtitle: null,
        body:
          "오스만은 대포와 화기를 완벽하게 다뤘어요. 1453년, 그들의 거대한 대포가 콘스탄티노플 성벽을 무너뜨리며 비잔틴 제국에 종지부를 찍었고, 유럽과 아시아를 잇는 핵심 교차로의 지배권을 손에 넣었습니다(이곳을 이스탄불로 개명했죠). 술레이만 대제 치하에서 제국은 절정에 이르렀어요.",
        keyIdea:
          "1453년: 오스만의 대포가 콘스탄티노플을 함락 → 비잔틴 제국 종말. 화약이 '권력을 쥔 자'를 다시 그립니다.",
        table: null,
        terms: [
          {
            term: "예니체리 (Janissaries)",
            def: "데브시르메를 통해 소년 시절에 징집된 오스만 정예 보병. 술탄에게 직접 충성했습니다.",
          },
          {
            term: "술레이만 대제 (Suleiman the Magnificent)",
            def: "오스만 제국이 영토적·문화적 절정에 이른 시기의 술탄.",
          },
        ],
        traps: [],
        example: null,
      },
      {
        title: "데브시르메와 다양성의 통치",
        subtitle: null,
        body:
          "데브시르메는 정복지의 기독교도 소년들을 데려와 이슬람으로 개종시키고, 술탄에게 충성하는 병사(예니체리)나 행정관으로 길렀어요 — 세습 귀족 '바깥에서' 만들어진 엘리트였죠. 다종교 제국을 다스리기 위해 밀레트 제도는 각 종교 공동체가 세금을 내는 대신 자기 율법에 따라 내부 문제를 스스로 다스리도록 허용했습니다.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "데브시르메 (Devshirme)",
            def: "기독교도 소년을 징집·개종시켜 국가/군사 복무에 투입한 오스만 제도.",
          },
          {
            term: "밀레트 제도 (Millet system)",
            def: "각 종교 공동체에 자기 율법에 따른 자치를 허용한 오스만 정책.",
          },
        ],
        traps: [
          "예니체리는 기술적으로는 노예 신분의 기독교 출신 개종자였습니다 — 술탄을 향한 충성심은 바로 귀족 가문 '바깥'에 있었다는 데서 나왔어요.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-world-history-u3-l2",
    courseId: "ap-world-history",
    subjectLabel: "AP World History",
    emoji: "🌍",
    unit: 3,
    lessonNum: 2,
    unitName: "Land-Based Empires (c. 1450–1750)",
    title: "사파비 제국 — 국가 정체성으로서의 시아파 이슬람",
    subtitle:
      "시아파 이슬람을 공식 정체성으로 삼은 페르시아 제국 — 그리고 오늘날까지 메아리치는 수니-시아 대립에 불을 붙였습니다.",
    overview:
      "페르시아의 사파비 제국(Safavid Empire)은 시아파 이슬람(Shi'a Islam)을 국교로 삼았다는 점에서 두드러져요. 이는 수니파인 이웃 오스만·무굴과 자신을 날카롭게 구분 짓게 했고, 오래 지속된 분쟁의 연료가 됐습니다. 샤 아바스 치하에서는 교역과 예술의 황금기를 누렸어요.",
    objectives: [
      "시아파 이슬람이 어떻게 사파비의 정체성과 분쟁을 형성했는지 설명할 수 있다.",
      "샤 아바스의 개혁과 제국의 황금기를 서술할 수 있다.",
      "사파비를 다른 화약 제국들과 비교할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "국가 정체성으로서의 종교",
        subtitle: null,
        body:
          "사파비는 시아파 이슬람을 공식 신앙으로 강제했어요 — 바로 옆 수니파 오스만과 구별되는 의도적인 정체성이었죠. 이 종교적 차이는 정치적·군사적 대립으로 번졌고, 수니 대 시아의 갈등은 수 세기 동안 이 지역을 규정했습니다.",
        keyIdea:
          "시아파 이슬람을 '국교'로 삼은 것이 사파비를 수니파 이웃들과 맞서게 했어요 — 종교가 곧 지정학이 된 겁니다.",
        table: null,
        terms: [
          {
            term: "시아파 이슬람 (Shi'a Islam)",
            def: "사파비가 공식 국교로 삼은 이슬람의 분파.",
          },
        ],
        traps: [],
        example: null,
      },
      {
        title: "샤 아바스와 황금기",
        subtitle: null,
        body:
          "샤 아바스는 화약 무기로 군대를 현대화하고, 권력을 중앙집권화하고, 비단 교역을 장려했으며, 웅장한 수도 이스파한을 건설했어요 — 사파비 예술과 건축의 정점이었죠.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "샤 아바스 (Shah Abbas)",
            def: "군대를 현대화하고 교역을 끌어올리며 이스파한을 일으킨 사파비 통치자.",
          },
          {
            term: "이스파한 (Isfahan)",
            def: "페르시아 예술과 건축을 보여주는 화려한 사파비 수도.",
          },
        ],
        traps: [
          "사파비-오스만 분쟁은 시아 대 수니였습니다 — 단순한 국경 분쟁이 아니라 정치적 대립을 몰아간 종교적 분열이에요.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-world-history-u3-l3",
    courseId: "ap-world-history",
    subjectLabel: "AP World History",
    emoji: "🌍",
    unit: 3,
    lessonNum: 3,
    unitName: "Land-Based Empires (c. 1450–1750)",
    title: "무굴 제국 — 아크바르의 관용과 조세 제도",
    subtitle:
      "힌두교가 다수인 인도를 다스린 무슬림 왕조 — 관용으로 묶었다가, 그것을 버리면서 흔들렸습니다.",
    overview:
      "무굴 제국(Mughal Empire)은 대부분 힌두교도인 광대한 인구를 다스렸어요. 가장 위대한 통치자 아크바르는 종교적 관용과 효율적인 조세 제도로 나라를 운영했습니다. 훗날 아우랑제브가 그 관용을 뒤집은 것이 제국을 약화시키는 데 한몫했어요 — 시험이 무척 좋아하는 명확한 인과관계죠.",
    objectives: [
      "아크바르의 관용과 행정이 어떻게 다양한 제국을 통합했는지 설명할 수 있다.",
      "무굴의 조세/자민다르 제도를 서술할 수 있다.",
      "아우랑제브의 정책이 어떻게 쇠퇴에 기여했는지 분석할 수 있다.",
    ],
    formulas: [],
    diagram: "cause-effect",
    sections: [
      {
        title: "아크바르: 전략으로서의 관용",
        subtitle: null,
        body:
          "힌두교 다수를 다스린 무슬림 통치자 아크바르는 관용을 안정의 도구로 삼았어요. 그는 지즈야(비무슬림에게 매기는 세금)를 폐지하고, 힌두교도를 정부에 포함시켰으며, 심지어 종교 간 토론까지 열었습니다. 세수는 자민다르(현지 조세 관리)를 통해 거두어 강력한 중앙 국가를 떠받쳤어요.",
        keyIdea:
          "아크바르의 관용은 단순한 친절이 아니라 — 힌두교 다수 제국의 충성을 유지하기 위한 영리한 정치였습니다.",
        table: null,
        terms: [
          {
            term: "아크바르 (Akbar)",
            def: "힌두교도를 통합하고 지즈야를 폐지한 관용적인 무굴 황제.",
          },
          {
            term: "지즈야 (Jizya)",
            def: "비무슬림에게 매기는 세금. 이를 폐지한 것(아크바르)이 힌두-무슬림 관계를 누그러뜨렸습니다.",
          },
          {
            term: "자민다르 (Zamindar)",
            def: "무굴 국가를 위해 세금을 거둔 현지 관리.",
          },
        ],
        traps: [],
        example: null,
      },
      {
        title: "아우랑제브 치하의 쇠퇴",
        subtitle: null,
        body:
          "훗날 황제 아우랑제브는 방향을 거꾸로 돌렸어요. 그는 지즈야를 다시 부과하고 비무슬림을 박해했습니다. 이는 힌두교 다수를 등 돌리게 하고 반란에 불을 붙여 제국을 약화시켰어요 — 아크바르의 관용 모델을 버린 직접적인 원인→결과였죠.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "아우랑제브 (Aurangzeb)",
            def: "종교적 불관용(지즈야 재부과)이 소요와 쇠퇴에 불을 붙인 무굴 황제.",
          },
        ],
        traps: [
          "아크바르(관용 → 안정)와 아우랑제브(불관용 → 반란)를 대비하세요. 시험은 이 인과관계를 직접적으로 묻습니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-world-history-u3-l4",
    courseId: "ap-world-history",
    subjectLabel: "AP World History",
    emoji: "🌍",
    unit: 3,
    lessonNum: 4,
    unitName: "Land-Based Empires (c. 1450–1750)",
    title: "청 왕조 — 만주족 통치와 한족의 연속성",
    subtitle:
      "유교 체제를 그대로 유지하며 중국을 운영한 외래 정복자들 — 동시에 자신들의 만주족 정체성은 지켰습니다.",
    overview:
      "청(Qing)은 만주족이었어요 — 중국을 정복한 북방의 외부인이었죠. 앞선 몽골처럼, 그들은 기존 유교 관료제를 받아들여 한족 다수를 다스렸어요. 동시에 별개의 만주족 정체성을 보존하면서 제국을 역대 최대 규모로 확장했습니다.",
    objectives: [
      "만주족 청이 어떻게 한족에 대한 통치를 정당화했는지 설명할 수 있다.",
      "청의 팽창과 제한된 대외 교역을 서술할 수 있다.",
      "청의 통치를 다른 외래 주도 왕조들과 비교할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "만주족 통치자, 중국식 체제",
        subtitle: null,
        body:
          "한족 다수를 다스리기 위해 청은 과거 시험과 유교 관료제를 유지했어요 — 외래 통치를 정당화한 연속성이었죠. 그러면서도 만주족 정체성을 강제해, 한족 남성에게 복종의 표시로 변발(만주족 머리 모양)을 하도록 요구하고 최고위직은 만주족에게 남겨두었습니다.",
        keyIdea:
          "몽골 원나라처럼, 청은 통치를 정당화하기 위해 '현지'의 유교 체제를 유지한 '외래' 통치자였어요.",
        table: null,
        terms: [
          {
            term: "만주족 (Manchu)",
            def: "중국을 정복하고 청 왕조를 세운 북방 민족.",
          },
          {
            term: "변발 (Queue)",
            def: "한족 남성이 복종의 표시로 해야 했던, 만주족이 강제한 머리 모양.",
          },
        ],
        traps: [],
        example: null,
      },
      {
        title: "팽창과 제한된 교역",
        subtitle: null,
        body:
          "청은 중국을 역대 최대 영토로 확장했어요. 자신만만하고 대체로 자급자족하던 그들은 유럽 상인을 광저우(Canton) 단일 항구로 제한하여(광저우 체제) 외국의 영향을 막았습니다 — 훗날 산업화하는 유럽과 충돌하게 될 입장이었죠.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "광저우 체제 (Canton system)",
            def: "유럽 교역을 광저우 단일 항구로 제한한 청의 정책.",
          },
        ],
        traps: [
          "청은 단순히 '교역 반대'가 아니었어요 — 유럽 상품이 별로 필요 없다고 느꼈기에 교역을 단일 항구로 엄격히 '통제'한 겁니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-world-history-u3-l5",
    courseId: "ap-world-history",
    subjectLabel: "AP World History",
    emoji: "🌍",
    unit: 3,
    lessonNum: 5,
    unitName: "Land-Based Empires (c. 1450–1750)",
    title: "러시아 제국 — 동방 팽창과 서구화",
    subtitle:
      "시베리아를 삼키고, 농민을 농노제로 묶고, 그런 다음 스스로를 서구 모델로 의도적으로 다시 만든 제국.",
    overview:
      "로마노프 왕조 치하의 러시아 제국(Russian Empire)은 시베리아를 가로질러 태평양까지 동방으로 팽창했고, 경제는 농노제(serfdom) 위에 서 있었어요. 그러다 표트르 대제가 유럽과 경쟁하기 위해 위에서 아래로 강제한 서구화를 단행했습니다 — 러시아 역사를 규정하는 주제죠.",
    objectives: [
      "러시아의 동방 팽창과 농노제의 역할을 서술할 수 있다.",
      "표트르 대제의 서구화 개혁을 설명할 수 있다.",
      "러시아의 농노제를 다른 지역의 노동 체제와 비교할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "팽창과 농노제",
        subtitle: null,
        body:
          "러시아는 시베리아를 가로질러 동쪽으로 팽창하며 모피와 영토를 태평양까지 얻었어요. 농업 경제는 농민을 토지와 영주에게 묶어두는 농노제에 의존했습니다. 차르들은 보야르(귀족)를 통제하고 권력을 중앙집권화하려 애썼어요.",
        keyIdea:
          "러시아 농노제는 서유럽보다 '훨씬' 오래 지속됐어요 — 1861년에야 비로소 폐지됐습니다.",
        table: null,
        terms: [
          {
            term: "농노제 (Serfdom)",
            def: "농민을 토지와 영주에게 묶어두는 제도. 러시아 경제의 핵심이었습니다.",
          },
          {
            term: "보야르 (Boyars)",
            def: "차르들이 그 권력을 제한하려 한 러시아 귀족.",
          },
        ],
        traps: [],
        example: null,
      },
      {
        title: "표트르 대제의 서구화",
        subtitle: null,
        body:
          "표트르 대제는 서유럽을 여행하고 돌아와 근대화를 결심했어요. 그는 군대와 관료제를 개혁하고, 서구식 관습을 강제했으며(그 유명한 수염세), '서방으로 난 창'으로서 새 수도 상트페테르부르크를 건설했습니다.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "표트르 대제 (Peter the Great)",
            def: "러시아를 근대화·서구화하고 상트페테르부르크를 건설한 차르.",
          },
        ],
        traps: [
          "서구화는 차르가 위에서 아래로 강제한 것이었어요 — 풀뿌리에서 일어난 문화적 변화가 아닙니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-world-history-u3-l6",
    courseId: "ap-world-history",
    subjectLabel: "AP World History",
    emoji: "🌍",
    unit: 3,
    lessonNum: 6,
    unitName: "Land-Based Empires (c. 1450–1750)",
    title: "화약 제국 — 공통된 패턴과 차이점",
    subtitle:
      "다섯 개의 육상 제국, 하나의 공식: 화약으로 정복하고, 종교로 정당화하고, 관료제로 통치한다.",
    overview:
      "한 걸음 물러서서 보면, 육상 기반 제국들은 놀랍도록 비슷한 패턴을 공유해요. 저마다 화약 무기로 팽창하고, 신념 체계로 통치를 정당화하고, 세금으로 운영되는 중앙집권 관료제로 나라를 묶었습니다. 차이는 주로 '어떤' 종교냐와 다양성을 '어떻게' 다뤘느냐에 있어요.",
    objectives: [
      "화약 제국들의 공통된 특징을 식별할 수 있다.",
      "각 제국이 어떻게 통치를 정당화하고 재원을 마련했는지 비교할 수 있다.",
      "종교 정책의 차이를 분석할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "다섯 제국, 나란히 비교",
        subtitle: null,
        body:
          "이들을 비교해 보면 공유된 도구 세트가 명확해요 — 바뀌는 건 세부 사항뿐입니다.",
        keyIdea:
          "공통 레시피: 화약 군대 + 통치 정당화를 위한 종교 + 세금/토지로 운영되는 중앙집권 관료제.",
        table: {
          headers: ["제국", "종교", "두드러진 특징"],
          rows: [
            ["오스만 (Ottoman)", "수니파 이슬람", "데브시르메/예니체리; 밀레트 제도"],
            [
              "사파비 (Safavid)",
              "시아파 이슬람",
              "국가 정체성으로서의 종교 → 수니파와의 대립",
            ],
            [
              "무굴 (Mughal)",
              "이슬람 (힌두교 다수)",
              "아크바르의 관용, 이후 아우랑제브의 번복",
            ],
            ["청 (Qing)", "유교", "외래 만주족 통치자가 중국식 체제를 유지"],
            ["러시아 (Russia)", "정교회 기독교", "농노제; 강제된 서구화"],
          ],
        },
        terms: [],
        traps: [],
        example: null,
      },
      {
        title: "패턴과 차이점",
        subtitle: null,
        body:
          "모두 권력을 중앙집권화하고, 예술과 건축을 후원했으며(이스파한, 타지마할, 상트페테르부르크), 조세/토지 수입 제도에 의존했어요. 가장 큰 차이는 종교적인 것이었습니다 — 수니-시아 분열이 오스만을 사파비와 맞서게 했고, 통치자들은 관용(아크바르)이냐 강제(아우랑제브, 청의 변발)냐에서 갈렸어요.",
        keyIdea:
          "제국들을 비교할 때 '같은' 구조가 반복됩니다 — 답안의 초점은 종교와 관용의 '차이'에 맞추세요.",
        table: null,
        terms: [
          {
            term: "화약 제국 (Gunpowder empires)",
            def: "화기를 사용해 팽창한 육상 제국(오스만, 사파비, 무굴 — 때로는 청/러시아 포함).",
          },
        ],
        traps: [],
        example: null,
      },
    ],
  },
];
