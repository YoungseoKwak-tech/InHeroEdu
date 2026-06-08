/**
 * Core Notes 한국어 스토리텔링 버전 — AP US Government and Politics Units 1–2.
 * 원본 내용 전량 보존(overview·body·keyIdea·table·diagram 포함) + 일타강사 내러티브.
 * 용어는 "한국어 (English)" 병기. 건국 문서·판례 고유명사는 알아볼 수 있게 유지.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const AP_US_GOVERNMENT_A_KO: CoreNote[] = [
  {
    lessonId: "ap-us-government-u1-l1",
    courseId: "ap-us-government",
    subjectLabel: "AP US Government and Politics",
    emoji: "🏛️",
    unit: 1,
    lessonNum: 1,
    unitName: "Foundations of American Democracy",
    title: "헌법의 기초 — 타협들, 그리고 설계",
    subtitle:
      "헌법은 거래의 묶음이었어요 — 그리고 그 설계는 의도적으로 권력이 한 곳에 모이기 어렵게 만들었습니다.",
    overview:
      "미국 헌법(Constitution)은 실패한 연합규약(Articles of Confederation)을 대체했어요. 연합규약의 중앙정부는 너무 약했거든요. 헌법을 비준받기 위해 건국자들은 큰 주와 작은 주, 자유주와 노예주 사이에서 타협을 했고, 어느 한 집단도 지배하지 못하도록 권력분립(separation of powers)·견제와 균형(checks and balances)·연방주의(federalism) 같은 구조를 짜 넣었습니다. 핵심은 이거예요 — '권력을 어떻게 나눠서 누구도 독차지 못하게 하느냐'.",
    objectives: [
      "연합규약이 왜 실패했는지 설명할 수 있다.",
      "주요 헌법적 타협들을 식별할 수 있다.",
      "권력분립과 견제와 균형을 설명할 수 있다.",
    ],
    formulas: [],
    diagram: "three-branches",
    sections: [
      {
        title: "연합규약에서 헌법으로",
        subtitle: null,
        body:
          "연합규약은 약한 국가정부를 만들었어요 — 세금을 걷지도, 무역을 규제하지도, 질서를 유지하지도 못했죠 (셰이즈의 반란(Shays' Rebellion)이 이 약점을 적나라하게 드러냈습니다). 그래서 제헌회의(Constitutional Convention)는 연합규약을 폐기하고 더 강한 연방 체제로 갈아탔어요 — 단, 폭정으로 변질되지 않도록 신중하게 제한된 형태로요.",
        keyIdea:
          "연합규약은 너무 '약했고'(과세권 없음, 군대 없음), 헌법은 그 약점을 고치면서도 여전히 연방 권력을 '제한'했습니다.",
        table: null,
        terms: [
          {
            term: "연합규약 (Articles of Confederation)",
            def: "미국의 첫 정부 체제. 과세권도, 무역 규제권도 없어 너무 약했습니다.",
          },
          {
            term: "셰이즈의 반란 (Shays' Rebellion)",
            def: "연합규약의 약점을 드러내며 헌법 제정을 촉발한 봉기.",
          },
        ],
        traps: [],
        example: null,
      },
      {
        title: "위대한 타협들",
        subtitle: null,
        body:
          "비준에는 거래가 필요했어요. 코네티컷 대타협(Great Compromise, Connecticut Compromise)은 양원제 의회를 만들었습니다 — 하원은 인구 비례(큰 주를 만족), 상원은 동등한 의석(작은 주를 만족). 5분의 3 타협(Three-Fifths Compromise)은 대표 수와 과세 산정에서 노예를 한 사람의 5분의 3으로 셈했고요.",
        keyIdea:
          "대타협이 양원제 의회를 만들었어요: 하원 = 인구 비례, 상원 = 동등(주당 2석).",
        table: {
          headers: ["타협 (Compromise)", "해결한 문제 (Resolved)"],
          rows: [
            [
              "대타협 (Great Compromise)",
              "큰 주 vs 작은 주 → 양원제 의회(하원 + 상원)",
            ],
            [
              "5분의 3 타협 (Three-Fifths Compromise)",
              "대표 수 산정에서 노예를 어떻게 셀 것인가",
            ],
            [
              "선거인단 (Electoral College)",
              "대통령을 어떻게 선출할 것인가(직접 국민투표가 아님)",
            ],
          ],
        },
        terms: [],
        traps: [],
        example: null,
      },
      {
        title: "권력 제한: 분립과 견제",
        subtitle: null,
        body:
          "폭정을 막기 위해 헌법은 권력을 쪼갭니다. 권력분립(separation of powers)은 세 부(府)에 각기 다른 일을 맡겨요 (입법부는 법을 만들고, 행정부는 집행하고, 사법부는 해석합니다). 견제와 균형(checks and balances)은 각 부가 다른 부를 제한하게 해주고요 (예: 대통령은 법안에 거부권을 행사하고, 의회는 거부권을 무효화하고 판사를 인준하며, 법원은 법을 위헌으로 판결합니다). 연방주의(federalism)는 권력을 국가정부와 주정부 사이에서 한 번 더 나눠요.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "권력분립 (Separation of powers)",
            def: "정부를 입법·행정·사법 세 부로 나누는 것.",
          },
          {
            term: "견제와 균형 (Checks and balances)",
            def: "각 부가 다른 부를 제한할 수 있게 함(거부권, 무효화, 사법심사).",
          },
          {
            term: "연방주의 (Federalism)",
            def: "권력을 국가정부와 주정부 사이에서 나누는 것.",
          },
        ],
        traps: [
          "권력분립 = 각기 다른 일을 맡은 세 개의 '분리된' 부. 견제와 균형 = 그들이 서로를 '제한하는' 방식. 함께 작동하지만 같은 개념이 아니에요.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-us-government-u1-l2",
    courseId: "ap-us-government",
    subjectLabel: "AP US Government and Politics",
    emoji: "🏛️",
    unit: 1,
    lessonNum: 2,
    unitName: "Foundations of American Democracy",
    title: "연방주의 — 권력의 분할과 진화",
    subtitle:
      "권력은 국가와 주 사이에 쪼개져 있어요 — 그리고 그 경계선은 시간이 지나며 워싱턴(연방) 쪽으로 기울어 왔습니다.",
    overview:
      "연방주의(federalism)는 권력을 국가정부와 주정부 사이에서 나눕니다. 헌법은 일부 권한은 한쪽에만 배타적으로 주고, 일부는 공유하게 하며, 나머지는 주에 유보해요. 시간이 지나며 연방 권력은 커져 왔습니다 — 법원 판결, 통상조항(commerce clause), 그리고 조건이 붙은 연방 자금이 이를 밀어붙였죠.",
    objectives: [
      "열거된 권한·유보된 권한·공유 권한을 구분할 수 있다.",
      "연방 권력이 어떻게 확장되었는지 설명할 수 있다.",
      "재정 연방주의(보조금과 의무 부과)를 서술할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "권력은 어떻게 나뉘는가",
        subtitle: null,
        body:
          "헌법은 권한을 세 가지로 분류해요. 열거된(위임된) 권한(enumerated/delegated powers)은 국가정부의 것입니다 (화폐 주조, 선전포고). 유보된 권한(reserved powers)은 수정헌법 제10조(10th Amendment)를 통해 주의 것이고요 (선거 운영, 공립학교). 공유 권한(concurrent powers)은 양쪽이 함께 갖습니다 (과세, 도로 건설). 그리고 최고법조항(supremacy clause)은 충돌 시 연방법이 이기게 만들어요.",
        keyIdea:
          "수정헌법 제10조는 위임되지 않은 권한을 주에 '유보'하고, 최고법조항은 충돌 시 연방법이 주법을 이긴다는 뜻이에요.",
        table: {
          headers: ["권한 유형 (Power type)", "주체 (Who)", "예시 (Example)"],
          rows: [
            [
              "열거된 권한 (Enumerated)",
              "국가정부만",
              "선전포고, 화폐 주조, 주간(州間) 통상 규제",
            ],
            [
              "유보된 권한 (Reserved)",
              "주만",
              "선거 운영, 교육, 혼인법",
            ],
            ["공유 권한 (Concurrent)", "양쪽 모두", "과세, 도로 건설, 법원"],
          ],
        },
        terms: [],
        traps: [],
        example: null,
      },
      {
        title: "연방 권력은 커져 왔다",
        subtitle: null,
        body:
          "균형추는 국가 쪽으로 기울었어요. 필요적정조항(탄력조항, necessary and proper/elastic clause)과 통상조항(commerce clause)의 폭넓은 해석(McCulloch v. Maryland 등) 덕분에 의회는 문자 그대로 열거된 목록보다 훨씬 많은 일을 할 수 있게 됐죠. 현대의 지렛대는 재정 연방주의(fiscal federalism)예요 — 연방정부가 보조금에 조건을 붙여(예: 고속도로 자금을 음주 가능 연령과 연계) 주가 국가 정책을 따르도록 압박합니다.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "필요적정조항(탄력조항) (Necessary and proper/elastic clause)",
            def: "의회가 자신의 권한을 수행하는 데 필요한 법을 만들 수 있게 함 — 연방의 영향력을 확장시킵니다.",
          },
          {
            term: "통상조항 (Commerce clause)",
            def: "주간 통상을 규제하는 의회의 권한. 넓게 해석되어 연방 권력을 키웠습니다.",
          },
          {
            term: "범주별 보조금/의무 부과 (Categorical grant / mandate)",
            def: "엄격한 조건이 붙은 연방 자금. 의무 부과는 주에 특정 행동을 요구합니다.",
          },
        ],
        traps: [
          "연방주의는 고정돼 있지 않아요 — 탄력조항·통상조항에 더해 연방 보조금이 국가 권력을 꾸준히 '확장'시켜 왔습니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-us-government-u1-l3",
    courseId: "ap-us-government",
    subjectLabel: "AP US Government and Politics",
    emoji: "🏛️",
    unit: 1,
    lessonNum: 3,
    unitName: "Foundations of American Democracy",
    title: "시민적 자유 — 수정헌법 제1조와 그 한계",
    subtitle:
      "권리장전은 정부'로부터' 당신의 자유를 보호합니다 — 하지만 어떤 자유도 절대적이지 않아요.",
    overview:
      "시민적 자유(civil liberties)는 정부의 과도한 개입으로부터의 헌법적 보호예요. 대부분 권리장전(Bill of Rights)에 들어 있습니다. 수정헌법 제1조(First Amendment)는 종교·언론·출판·집회·청원을 보호해요 — 하지만 이 권리들이 다른 이익과 충돌하는 지점에서 법원은 한계를 설정해 왔습니다.",
    objectives: [
      "수정헌법 제1조의 다섯 가지 자유를 식별할 수 있다.",
      "언론과 종교에 대한 한계를 설명할 수 있다.",
      "선택적 편입(selective incorporation)을 정의할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "수정헌법 제1조의 자유들",
        subtitle: null,
        body:
          "수정헌법 제1조는 다섯 가지 자유를 보호해요: 종교·언론·출판·집회·청원. 종교에는 두 개의 조항이 있어요 — 국교금지조항(establishment clause, 정부가 공식 종교를 세울 수 없음)과 종교활동의 자유조항(free exercise clause, 자신의 신앙을 실천할 수 있음). 이 둘은 종종 서로 긴장 관계에 놓입니다.",
        keyIdea:
          "수정헌법 제1조 = 종교·언론·출판·집회·청원. 종교는 '국교금지'(국가 교회 불가) + '종교활동의 자유'(자유로운 실천)로 나뉩니다.",
        table: null,
        terms: [
          {
            term: "국교금지조항 (Establishment clause)",
            def: "정부가 공식 종교를 세울 수 없다.",
          },
          {
            term: "종교활동의 자유조항 (Free exercise clause)",
            def: "정부가 당신의 종교 실천을 막을 수 없다.",
          },
        ],
        traps: [],
        example: null,
      },
      {
        title: "한계와 편입",
        subtitle: null,
        body:
          "어떤 자유도 절대적이지 않아요. 임박한 불법행위를 선동하는 언론, 진정한 협박, 음란물은 보호받지 못합니다. 그 고전적 기준은 Schenck v. United States('명백하고 현존하는 위험', clear and present danger)로 거슬러 올라가요. 결정적으로, 선택적 편입(selective incorporation)은 수정헌법 제14조(14th Amendment)의 적법절차조항(due process clause)을 사용해 권리장전의 대부분 보호를 '주' 정부에도 적용합니다 — 연방정부에만 적용되는 게 아니에요.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "선택적 편입 (Selective incorporation)",
            def: "수정헌법 제14조를 통해 권리장전의 보호를 주에 적용하는 것.",
          },
          {
            term: "명백하고 현존하는 위험 (Clear and present danger)",
            def: "위험한 언론에 대한 제한을 허용하는 기준(Schenck).",
          },
        ],
        traps: [
          "선택적 편입은 왜 '주'(연방정부뿐 아니라)도 당신의 언론·종교의 자유 등을 존중해야 하는지를 설명합니다 — 수정헌법 제14조를 통해서요.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-us-government-u1-l4",
    courseId: "ap-us-government",
    subjectLabel: "AP US Government and Politics",
    emoji: "🏛️",
    unit: 1,
    lessonNum: 4,
    unitName: "Foundations of American Democracy",
    title: "시민적 권리 — 평등 보호와 그 진화",
    subtitle:
      "시민적 자유는 정부'로부터' 당신을 보호하고, 시민적 권리는 정부가 당신을 '평등하게' 보호하도록 요구합니다.",
    overview:
      "시민적 권리(civil rights)는 평등한 대우에 관한 것이에요 — 차별로부터 집단을 보호할 정부의 의무로, 수정헌법 제14조의 평등보호조항(equal protection clause)에 뿌리를 둡니다. 시민적 권리를 위한 투쟁(흑인, 여성, 그 외 집단을 위한)은 법원 판결·입법·대중운동을 통해 법을 다시 빚어냈어요.",
    objectives: [
      "시민적 권리와 시민적 자유를 구분할 수 있다.",
      "평등보호조항과 주요 판례를 설명할 수 있다.",
      "획기적인 시민권 법률들을 식별할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "자유 vs 권리",
        subtitle: null,
        body:
          "시민적 자유(civil liberties)는 정부 간섭'으로부터'의 자유예요 (언론·종교). 시민적 권리(civil rights)는 차별로부터의 보호 — 정부'에 의한' 평등한 대우의 보장입니다. 수정헌법 제14조의 평등보호조항(equal protection clause)이 그 토대로, 주가 법 앞에서 사람들을 평등하게 대우하도록 요구해요.",
        keyIdea:
          "시민적 '자유' = 정부로부터의 자유(언론). 시민적 '권리' = 정부에 의한 평등한 대우(차별 금지).",
        table: null,
        terms: [
          {
            term: "평등보호조항 (Equal protection clause)",
            def: "주가 법 앞에서 사람들을 평등하게 대우한다는 수정헌법 제14조의 보장.",
          },
          {
            term: "시민적 권리 (Civil rights)",
            def: "차별에 대한 보호와 평등한 대우의 보장.",
          },
        ],
        traps: [],
        example: null,
      },
      {
        title: "획기적 판례와 법률들",
        subtitle: null,
        body:
          "Brown v. Board of Education(1954)는 '분리하되 평등(separate but equal)' 원칙을 뒤집어, 분리된 학교가 위헌이라고 판결했어요. 이 운동은 1964년 시민권법(Civil Rights Act of 1964, 공공시설과 고용에서의 차별 금지)과 1965년 투표권법(Voting Rights Act of 1965, 흑인 투표권 보호)을 쟁취했습니다. 이후의 투쟁은 평등 보호를 여성과 다른 집단에까지 확장했고요.",
        keyIdea:
          "Brown v. Board는 Plessy v. Ferguson의 '분리하되 평등'을 뒤집었어요 — 인종분리에 맞선 법적 전환점입니다.",
        table: {
          headers: ["이정표 (Milestone)", "효과 (Effect)"],
          rows: [
            [
              "Brown v. Board (1954)",
              "법적 학교 인종분리 종식('분리하되 평등' 폐기)",
            ],
            [
              "1964년 시민권법 (Civil Rights Act of 1964)",
              "직장과 공공장소에서의 차별 금지",
            ],
            [
              "1965년 투표권법 (Voting Rights Act of 1965)",
              "소수자의 투표권 보호",
            ],
          ],
        },
        terms: [],
        traps: [
          "시민적 권리는 세 가지 '모두'를 통해 전진했어요: 법원 판결(Brown), 법률(시민권법), 그리고 대중운동 — 한 가지만이 아닙니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-us-government-u2-l1",
    courseId: "ap-us-government",
    subjectLabel: "AP US Government and Politics",
    emoji: "🏛️",
    unit: 2,
    lessonNum: 1,
    unitName: "Interactions Among Branches of Government",
    title: "의회 — 구조, 권한, 입법",
    subtitle:
      "입법부: 두 개의 원, 지갑의 권한, 그리고 법안에서 법까지의 의도적으로 느린 길.",
    overview:
      "의회(Congress)는 법을 만듭니다. 양원제예요 — 인구를 기반으로 한 하원(House)과 주별 동등 대표를 가진 상원(Senate)으로, 각각 고유한 규칙과 권한을 갖습니다. 입법 과정은 의도적으로 어렵게 설계됐어요 — 두 원과 대통령 모두의 합의가 필요하니까요.",
    objectives: [
      "하원과 상원을 비교할 수 있다.",
      "의회의 주요 권한을 식별할 수 있다.",
      "법안이 어떻게 법이 되는지 그 과정을 설명할 수 있다.",
    ],
    formulas: [],
    diagram: "bill-to-law",
    sections: [
      {
        title: "두 개의 원, 다른 규칙",
        subtitle: null,
        body:
          "하원(House, 435명, 임기 2년)은 더 크고, 규칙에 더 얽매이며, 국민에 더 가까워요. 상원(Senate, 100명, 임기 6년)은 더 작고 토론 규칙이 더 느슨한데 — 여기에 필리버스터(filibuster)가 포함돼요. 필리버스터는 상원의원 60명이 토론종결(cloture)을 발동하지 않는 한 소수가 표결을 막을 수 있게 합니다.",
        keyIdea:
          "필리버스터는 '상원'의 도구예요 — 60명이 토론종결(cloture)에 찬성해 토론을 끝내지 않는 한 소수가 행동을 막을 수 있습니다.",
        table: {
          headers: ["", "하원 (House)", "상원 (Senate)"],
          rows: [
            ["규모 / 임기", "435명 / 2년", "100명 / 6년"],
            ["기반", "인구", "동등(주당 2석)"],
            [
              "특징적 도구",
              "규칙위원회가 토론을 통제",
              "필리버스터(토론종결에 60명 필요)",
            ],
          ],
        },
        terms: [],
        traps: [],
        example: null,
      },
      {
        title: "권한과 입법",
        subtitle: null,
        body:
          "의회는 '지갑의 권한'(power of the purse, 과세와 지출)을 쥐고, 선전포고를 하며, 통상을 규제하고, 행정부를 감독합니다. 법안은 두 원을 '동일한 형태'로 통과한 뒤 대통령에게 가요. 대통령은 서명하거나 거부권(veto)을 행사할 수 있고요 (의회는 각 원의 3분의 2 표결로 무효화할 수 있습니다). 거부점(veto point)이 많아 법을 통과시키기가 어려워요.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "지갑의 권한 (Power of the purse)",
            def: "과세와 지출에 대한 의회의 통제권.",
          },
          {
            term: "필리버스터 / 토론종결 (Filibuster / cloture)",
            def: "상원의 지연 전술. 토론종결(60표)이 이를 끝냅니다.",
          },
          {
            term: "거부권 무효화 (Veto override)",
            def: "의회는 양원 각각 3분의 2 표결로 대통령 거부권을 무효화할 수 있다.",
          },
        ],
        traps: [
          "법안은 대통령에게 가기 전 두 원을 '동일한' 형태로 통과해야 해요 — 차이는 협의위원회(conference)에서 조정됩니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-us-government-u2-l2",
    courseId: "ap-us-government",
    subjectLabel: "AP US Government and Politics",
    emoji: "🏛️",
    unit: 2,
    lessonNum: 2,
    unitName: "Interactions Among Branches of Government",
    title: "대통령직 — 공식 권한과 비공식 권한",
    subtitle:
      "대통령의 명문화된 권한은 제한적이에요 — 하지만 비공식 도구들이 이 직책을 훨씬 강력하게 만들어 왔습니다.",
    overview:
      "대통령(president)은 행정부의 수반입니다. 헌법은 공식 권한(거부권, 군 통수권, 임명권, 조약 체결권)을 부여하지만, 대통령들은 행정명령(executive orders)·여론 강단(bully pulpit)·의제 설정 같은 비공식 권한을 통해 영향력을 확장해 왔어요.",
    objectives: [
      "대통령의 공식 권한과 비공식 권한을 구분할 수 있다.",
      "대통령에 대한 견제를 설명할 수 있다.",
      "대통령의 권력이 어떻게 커져 왔는지 서술할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "공식 권한 vs 비공식 권한",
        subtitle: null,
        body:
          "공식 권한(formal powers)은 헌법에 명문화돼 있어요: 법안 거부권, 군 통수, 임명과 조약 체결(상원 승인 필요), 사면권 부여. 비공식 권한(informal powers)은 명시적으로 열거돼 있지 않지만 엄청나게 중요합니다: 행정명령(executive orders, 법적 효력을 갖는 지시), 여론 강단(bully pulpit, 대중적 영향력 활용), 그리고 국가 의제 설정이에요.",
        keyIdea:
          "행정명령과 '여론 강단'은 '비공식' 권한이에요 — 헌법에 없지만 대통령직을 크게 확장시켰습니다.",
        table: {
          headers: ["유형 (Type)", "예시 (Examples)"],
          rows: [
            [
              "공식(헌법에 명시) (Formal)",
              "거부권, 군 통수권, 임명권, 조약 체결권, 사면권",
            ],
            [
              "비공식(시간이 지나며 발전) (Informal)",
              "행정명령, 여론 강단, 의제 설정",
            ],
          ],
        },
        terms: [],
        traps: [],
        example: null,
      },
      {
        title: "대통령에 대한 견제",
        subtitle: null,
        body:
          "대통령의 권력은 견제받아요: 상원은 임명을 인준하고 조약을 비준하며(3분의 2), 의회는 거부권을 무효화하고 예산을 통제하며, 법원은 행위를 위헌으로 판결할 수 있습니다. 의회는 대통령을 탄핵(하원)하고 해임(상원)할 수도 있어요. 이러한 견제들이 권력분립을 구현합니다.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "행정명령 (Executive order)",
            def: "법적 효력을 갖는 대통령의 지시(비공식 권한).",
          },
          {
            term: "여론 강단 (Bully pulpit)",
            def: "대통령이 대중적 가시성을 활용해 정책에 영향을 미치는 것.",
          },
          {
            term: "상원 인준 (Senate confirmation)",
            def: "임명과 (3분의 2로) 조약에 필요한 상원의 승인 — 대통령에 대한 견제.",
          },
        ],
        traps: [
          "조약은 상원 3분의 2의 비준이 필요하지만, 대통령은 행정협정(executive agreement)을 사용해 이를 우회할 수 있어요 — 핵심적인 비공식 우회로입니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-us-government-u2-l3",
    courseId: "ap-us-government",
    subjectLabel: "AP US Government and Politics",
    emoji: "🏛️",
    unit: 2,
    lessonNum: 3,
    unitName: "Interactions Among Branches of Government",
    title: "연방 관료제 — 집행과 책임성",
    subtitle:
      "실제로 법을 수행하는, 선출되지 않은 기관들 — 그리고 그들을 통제하려는 줄다리기.",
    overview:
      "연방 관료제(federal bureaucracy)는 법을 집행하고 시행하는 기관과 부처의 네트워크입니다. 선출되지는 않았지만 규칙 제정(rulemaking)을 통해 실질적인 권력을 행사해요. 세 부 모두가 관료제에 책임을 묻으려 하기에, 관료제는 부 간 상호작용의 핵심 무대가 됩니다.",
    objectives: [
      "관료제가 하는 일(집행, 규칙 제정)을 설명할 수 있다.",
      "의회·대통령·법원이 관료제를 어떻게 견제하는지 서술할 수 있다.",
      "재량권과 규칙 제정 권한을 정의할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "관료제가 하는 일",
        subtitle: null,
        body:
          "의회가 큰 틀의 법을 통과시키면, 관료제가 세부사항을 채웁니다. 기관들은 재량권(discretionary authority)과 규칙 제정 권한(rulemaking authority)을 사용해 법적 효력을 갖는 구체적 규정을 작성해요 (예: 환경보호청(EPA)이 오염 한도를 설정). 이 때문에 선출되지 않은 관료들이 실질적으로 강력한 정책 결정자가 됩니다.",
        keyIdea:
          "의회는 큰 붓으로 법을 쓰고, 관료제의 '규칙 제정'이 구속력 있는 세부사항을 채워요 — 선출되지 않은 기관의 실질적 입법 권력입니다.",
        table: null,
        terms: [
          {
            term: "관료제 (Bureaucracy)",
            def: "연방법을 집행하고 시행하는 기관/부처들.",
          },
          {
            term: "규칙 제정 권한 (Rulemaking authority)",
            def: "법적 효력을 갖는 규정을 작성하는 기관의 권한.",
          },
          {
            term: "재량권 (Discretionary authority)",
            def: "법을 어떻게 집행할지 결정할 때 기관이 갖는 재량의 폭.",
          },
        ],
        traps: [],
        example: null,
      },
      {
        title: "책임성 유지하기",
        subtitle: null,
        body:
          "관료제는 선출되지 않았기에, 세 부 모두가 이를 견제합니다. 의회는 예산을 통제하고, 감독 청문회를 열며, 수권법(authorizing law)을 다시 쓸 수 있어요. 대통령은 기관장을 임명하고 행정명령을 발동하고요. 법원은 기관의 행위가 합법적인지 심사합니다. 이렇게 공유된 통제는 누가 기관을 조종하느냐를 두고 끊임없는 긴장을 만들어요.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "의회의 감독 (Congressional oversight)",
            def: "청문회와 예산 통제를 통해 의회가 관료제를 감시하는 것.",
          },
          {
            term: "철의 삼각형 (Iron triangle)",
            def: "한 기관, 한 의회 위원회, 한 이익집단 사이의 안정적 동맹.",
          },
        ],
        traps: [
          "관료제는 세 부 '모두'에게 견제받아요(예산, 임명, 사법심사) — 대통령 혼자 통제하는 게 아닙니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-us-government-u2-l4",
    courseId: "ap-us-government",
    subjectLabel: "AP US Government and Politics",
    emoji: "🏛️",
    unit: 2,
    lessonNum: 4,
    unitName: "Interactions Among Branches of Government",
    title: "연방 법원 — 구조, 선임, 사법심사",
    subtitle:
      "사법부의 가장 큰 권한은 사법심사예요 — 법을 위헌으로 무효화할 수 있는 능력입니다.",
    overview:
      "연방 법원(federal courts)은 법을 해석하며, 그 정점에 연방대법원(Supreme Court)이 있습니다. 그들의 결정적 권한인 사법심사(judicial review)는 법과 행정 행위를 위헌으로 선언할 수 있게 해줘요 — Marbury v. Madison에서 확립됐죠. 판사들은 종신으로 임명되어, 정치로부터 절연됩니다.",
    objectives: [
      "사법심사와 그 기원을 설명할 수 있다.",
      "연방 판사가 어떻게 선임되는지 서술할 수 있다.",
      "사법부에 대한 견제를 식별할 수 있다.",
    ],
    formulas: [],
    diagram: "three-branches",
    sections: [
      {
        title: "사법심사",
        subtitle: null,
        body:
          "사법심사(judicial review) — 법이나 행정 행위를 위헌으로 선언할 수 있는 권한 — 는 Marbury v. Madison(1803)에서 확립됐어요. 헌법에 명시적으로 쓰여 있지 않았죠. 이 권한은 법원을 동등한 지위의 부로 만들고, 헌법이 무엇을 의미하는지에 대한 최종 발언권을 줍니다.",
        keyIdea:
          "사법심사는 Marbury v. Madison(1803)에서 나왔어요 — 법원이 '스스로에게' 이 권한을 부여한 거예요. 헌법에 명시돼 있지 않습니다.",
        table: null,
        terms: [
          {
            term: "사법심사 (Judicial review)",
            def: "헌법을 위반하는 법/행위를 무효화하는 법원의 권한.",
          },
          {
            term: "Marbury v. Madison (1803)",
            def: "사법심사를 확립한 판례.",
          },
        ],
        traps: [],
        example: null,
      },
      {
        title: "선임과 견제",
        subtitle: null,
        body:
          "연방 판사는 대통령이 지명하고 상원이 인준하며, 정치적 압력으로부터 절연하기 위해 종신('선행을 유지하는 동안')으로 복무해요. 하지만 사법부도 여전히 견제받습니다: 대통령이 판사를 고르고, 상원이 이를 거부할 수 있으며, 의회는 판결에 맞서 새 법을 통과시키거나 헌법 개정을 발의할 수 있고, 법원은 결정을 집행하기 위해 다른 부에 의존해야 해요.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "종신 재임 (Life tenure)",
            def: "연방 판사는 무기한 복무하여 정치로부터 절연됩니다.",
          },
          {
            term: "선례구속 원칙 (Stare decisis)",
            def: "선례에 근거해 사건을 판결하는 원칙.",
          },
        ],
        traps: [
          "판사는 종신 재임(절연)을 갖지만, 사법부도 여전히 견제받아요 — 임명, 새 입법, 그리고 판결을 '집행'하기 위해 다른 부에 의존한다는 점에서요.",
        ],
        example: null,
      },
    ],
  },
];
