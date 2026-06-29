/**
 * Core Notes 한국어 스토리텔링 버전 — Honors English Unit 1 (수사학과 논증).
 * 영어 원본을 충실히 한국어로 렌더링 — 동일한 구조·lessonId로 이중 언어 분할 뷰 정렬.
 * 원본 내용 전량 보존(objectives·sections·terms·keyIdea·example·traps) + 일타강사 내러티브.
 * 용어는 "한국어 (English)" 병기. lesson-level traps[]는 각 레슨의 마지막 섹션에 부착.
 * Source: lib/data/authored-corenotes/honors-english.json, unit 1 (lessonNum 1-5).
 */
import type { CoreNote } from "@/lib/coreNotes";

export const HONORS_ENGLISH_U1_KO: CoreNote[] = [
  {
    lessonId: "honors-english-u1-l1",
    courseId: "honors-english",
    subjectLabel: "Honors English",
    emoji: "📖",
    unit: 1,
    lessonNum: 1,
    unitName: "수사학과 논증 (Rhetoric and Argumentation)",
    title: "설득력 있는 논증 vs. 단순히 우기는 주장의 차이",
    subtitle: "주장(assertion)과 논증(argument)의 차이 — Toulmin 모델로 '논쟁 가능한' 주제문 세우기",
    overview:
      "글쓰기의 출발점은 '주장을 던지는 것'이 아니라 '논증을 구성하는 것'입니다. 단순한 주장(assertion)은 근거 없이 선언하는 문장이고, 논증(argument)은 주장(claim)·근거(evidence)·전제(warrant)가 맞물려 합리적인 독자를 설득하는 구조입니다. 이 단원 전체가 이 구분 위에 세워지므로, '논쟁 가능한(arguable)' 주제문을 세우는 능력이 핵심입니다.",
    objectives: [
      "Toulmin 모델의 claim·evidence·warrant를 구분하고 연결한다",
      "주제를 '소개'하는 문장과 '입장을 취하는' 주제문을 구별한다",
      "주제문이 논쟁 가능한지(반론이 성립하는지)로 검증한다",
      "근거 없는 단순 주장이 왜 논증이 아닌지 설명한다",
    ],
    sections: [
      {
        title: "주장 vs. 논증 — 선언과 설득의 차이",
        body: "단순한 주장(assertion)은 '나는 이렇게 생각한다'고 선언할 뿐 독자에게 따라야 할 이유를 주지 않습니다. 논증(argument)은 입장(claim)에 근거(evidence)와 그 둘을 잇는 논리적 다리(warrant)를 붙여, 합리적인 독자가 동의하지 않을 수 없게 만드는 구조입니다. 좋은 글은 더 강하게 단언하는 글이 아니라 더 촘촘하게 논증하는 글이에요. 따라서 평가 기준은 '얼마나 확신에 차 있는가'가 아니라 '얼마나 정당화되는가'입니다.",
        terms: [
          { term: "주장 (assertion)", def: "근거 없이 선언하는 진술. 그 자체로는 논증이 아니다." },
          { term: "논증 (argument)", def: "주장·근거·전제가 맞물려 독자를 설득하는 논리적 구조." },
          { term: "설득력 (persuasiveness)", def: "독자가 합리적으로 동의하게 만드는 힘. 단언의 강도가 아니라 정당화의 질에서 나온다." },
        ],
        traps: [],
      },
      {
        title: "Toulmin 모델 — claim · evidence · warrant",
        body: "Toulmin 모델은 논증을 세 축으로 분해합니다. claim(주장)은 입증하려는 입장, evidence(근거/data)는 그 주장을 받치는 사실·자료, warrant(전제)는 '왜 이 근거가 이 주장을 지지하는가'를 잇는 숨은 논리입니다. 학생들이 가장 자주 빠뜨리는 것은 warrant인데, 근거와 주장 사이의 다리가 무너지면 논증 전체가 비약이 됩니다. 좋은 논증은 이 다리를 명시하거나 최소한 독자가 받아들일 수 있게 만듭니다.",
        keyIdea: "claim은 입장, evidence는 사실, warrant는 둘을 잇는 논리 — 셋 중 하나라도 빠지면 논증이 아니다.",
        terms: [
          { term: "주장 (claim)", def: "논증이 입증하려는 핵심 입장." },
          { term: "근거 (evidence)", def: "주장을 받치는 사실·자료·예시(data)." },
          { term: "전제 (warrant)", def: "근거가 왜 주장을 지지하는지 잇는 숨은 논리적 가정." },
          { term: "툴민 모델 (Toulmin model)", def: "논증을 claim·evidence·warrant 등으로 분해해 분석하는 틀." },
        ],
        example: "주장: '교복은 폐지해야 한다.' 근거: '교복은 학생 자기표현을 제한한다.' 전제: '자기표현을 제한하는 규정은 폐지되어야 한다.' — 전제를 드러내야 논증이 완성된다.",
        traps: [],
      },
      {
        title: "논쟁 가능한 주제문 세우기",
        body: "주제문(thesis)은 주제를 '소개'하는 문장이 아니라 입장을 '취하는' 문장이어야 합니다. '이 글은 기후 변화를 다룬다'는 주제 소개일 뿐, 합리적인 사람이 반대할 수 없으니 논증이 성립하지 않습니다. 반면 '기후 정책은 ~ 때문에 실패한다'는 반론이 가능한 입장이므로 진짜 주제문입니다. 모든 주제문은 '합리적인 사람이 이 문장에 반대할 수 있는가?'로 검증하세요. 반대할 수 없다면 그것은 사실 진술이지 주장이 아닙니다.",
        terms: [
          { term: "주제문 (thesis statement)", def: "글 전체의 핵심 입장을 한 문장으로 압축한 논쟁 가능한 진술." },
          { term: "논쟁 가능성 (arguability)", def: "합리적인 사람이 반대할 수 있는 성질. 주제문의 필수 조건이다." },
          { term: "입장 (position)", def: "글쓴이가 취하는 명확한 견해. 주제 소개와 구별된다." },
        ],
        example: "'이 에세이는 SNS를 논의한다'(소개·X) → 'SNS는 청소년의 깊은 사고력을 약화시킨다'(입장·O).",
        traps: [
          "주제를 '소개'하는 문장을 주제문으로 착각하기 — '이 글은 기후 변화를 다룬다'는 주제문이 아니다. 주제문은 반드시 논쟁 가능해야 하며, 모든 주제문은 '합리적인 사람이 반대할 수 있는가?'로 검증해야 한다.",
          "근거를 붙이지 않은 단언을 논증으로 제출하기 — 확신의 강도는 논증의 강도가 아니다. warrant(전제)가 빠지면 근거와 주장 사이가 비약이 된다.",
        ],
      },
    ],
  },
  {
    lessonId: "honors-english-u1-l2",
    courseId: "honors-english",
    subjectLabel: "Honors English",
    emoji: "📖",
    unit: 1,
    lessonNum: 2,
    unitName: "수사학과 논증 (Rhetoric and Argumentation)",
    title: "logos·ethos·pathos는 어떻게 '함께' 작동하는가 (따로가 아니라)",
    subtitle: "수사적 호소 — logos·ethos·pathos는 분리되지 않고 동시에 작동한다",
    overview:
      "Aristotle의 세 가지 수사적 호소(logos·ethos·pathos)는 교과서에서 따로 배우지만, 실제 능숙한 논증에서는 한 문장 안에서 동시에 작동합니다. 학생들은 흔히 '이 부분은 pathos, 저 부분은 logos'처럼 분리해 라벨을 붙이지만, 진짜 분석은 한 표현이 여러 호소를 어떻게 겹쳐 쓰는지를 읽어내는 것입니다.",
    objectives: [
      "logos·ethos·pathos를 정확히 정의하고 구별한다",
      "한 표현이 세 호소를 동시에 수행할 수 있음을 분석한다",
      "지배적 호소(dominant appeal)를 식별하면서 혼합을 인정한다",
      "수사적 상황(청중·목적·맥락)에 맞는 호소 선택을 평가한다",
    ],
    sections: [
      {
        title: "세 가지 호소의 정의",
        body: "ethos(인성적 호소)는 글쓴이의 신뢰성에서 나오는 설득력으로, 전문성·공정함·어조를 통해 '이 사람 말은 믿을 만하다'고 느끼게 합니다. logos(논리적 호소)는 논리 구조와 근거의 질에서 나오는 설득력이고, pathos(감정적 호소)는 청중의 가치·감정과 연결되어 마음을 움직이는 힘입니다. 세 호소는 모두 '수사적 상황(rhetorical situation)' 안에서 작동하며, 어느 하나만으로 강한 논증이 되기는 어렵습니다.",
        terms: [
          { term: "수사적 호소 (rhetorical appeals)", def: "청중을 설득하기 위한 세 가지 전략: ethos·logos·pathos." },
          { term: "인성적 호소 (ethos)", def: "글쓴이의 신뢰성·전문성·공정함에 기댄 설득." },
          { term: "논리적 호소 (logos)", def: "논리 구조와 근거의 질에 기댄 설득." },
          { term: "감정적 호소 (pathos)", def: "청중의 감정·가치와 연결해 마음을 움직이는 설득." },
          { term: "수사적 상황 (rhetorical situation)", def: "글쓴이·청중·목적·맥락이 만나는 설득의 장." },
        ],
        traps: [],
      },
      {
        title: "호소는 동시에 작동한다",
        body: "능숙한 논증에서는 세 호소가 한 문장 안에서 겹칩니다. 예를 들어 존경받는 전문가(ethos)가 인용한 통계(logos)가 인간의 고통을 보여준다면(pathos), 그 한 문장은 세 호소를 동시에 수행합니다. 따라서 분석할 때는 '여기는 pathos뿐'이라고 잘라 말하기보다, 어떤 호소가 지배적(dominant)인지 짚되 나머지가 어떻게 겹쳐 작동하는지 인정해야 합니다. 호소를 칸막이로 나누는 순간 분석은 얕아집니다.",
        keyIdea: "한 통계(logos)가 권위자(ethos)에게서 나와 고통을 보여주면(pathos) — 세 호소가 동시에 작동한다.",
        terms: [
          { term: "지배적 호소 (dominant appeal)", def: "한 구절에서 가장 두드러지는 호소. 다른 호소가 겹쳐 있어도 식별한다." },
          { term: "혼합 (blending)", def: "여러 호소가 한 표현 안에서 동시에 작동하는 현상." },
          { term: "신뢰성 (credibility)", def: "청중이 글쓴이를 믿을 만하다고 느끼는 정도. ethos의 핵심." },
        ],
        example: "'소아과 전문의로서 30년을 본 저는, 매년 3천 명의 아이가 이 병으로 숨지는 것을 지켜봤습니다' — 전문성(ethos)+통계(logos)+상실의 감정(pathos)이 한 문장에 겹친다.",
        traps: [],
      },
      {
        title: "청중에 맞춘 호소 선택",
        body: "어떤 호소를 앞세울지는 청중과 목적에 달려 있습니다. 데이터 중심의 전문가 청중에게는 logos가, 가치 공동체에 호소할 때는 pathos가, 글쓴이의 권위가 의심받는 상황에서는 ethos를 먼저 다지는 것이 효과적입니다. 즉 호소 선택은 '무엇이 옳은가'가 아니라 '이 청중을 무엇이 움직이는가'의 문제입니다. 같은 주장도 청중에 따라 호소의 배합을 바꿔야 합니다.",
        terms: [
          { term: "청중 (audience)", def: "설득의 대상. 호소의 배합을 결정하는 핵심 변수." },
          { term: "목적 (purpose)", def: "글이 이루려는 효과. 설득·정보·환기 등." },
          { term: "가치 (values)", def: "청중이 중시하는 신념. pathos가 연결을 시도하는 지점." },
        ],
        traps: [
          "호소를 칸막이로 나눠 '여기는 pathos, 저기는 logos'라고만 라벨링하기 — 능숙한 논증은 세 호소를 한 문장 안에서 동시에 쓴다. 지배적 호소를 짚되 혼합을 반드시 인정하라.",
          "ethos를 글쓴이의 직함만으로 환원하기 — 신뢰성은 직함뿐 아니라 공정한 어조와 반론에 대한 태도에서도 만들어진다.",
        ],
      },
    ],
  },
  {
    lessonId: "honors-english-u1-l3",
    courseId: "honors-english",
    subjectLabel: "Honors English",
    emoji: "📖",
    unit: 1,
    lessonNum: 3,
    unitName: "수사학과 논증 (Rhetoric and Argumentation)",
    title: "반론이 오히려 당신의 논증을 강하게 만드는 이유",
    subtitle: "반론 — 양보·반박 구조와 steelman으로 신뢰성을 높이는 법",
    overview:
      "학생들은 반론(counterargument)을 '약점을 인정하는 것'으로 오해하지만, 잘 다룬 반론은 오히려 글쓴이의 신뢰성(ethos)을 높입니다. 다른 견해를 충분히 고려했음을 보여주기 때문이죠. 핵심은 반론을 그냥 언급만 하고 넘어가는 것이 아니라, 반박(refute)하거나 제한(qualify)하는 것입니다.",
    objectives: [
      "양보-반박(concession-refutation) 구조를 구성한다",
      "straw man 오류와 steelmanning을 구별한다",
      "반론이 ethos를 높이는 원리를 설명한다",
      "반론을 효과적으로 배치할 위치를 판단한다",
    ],
    sections: [
      {
        title: "반론은 약점이 아니라 신뢰의 신호",
        body: "반론을 다루지 않은 글은 '다른 견해를 모르거나 무시한 글'로 보입니다. 반대로 반론을 정직하게 제시하고 다루는 글은, 글쓴이가 문제를 입체적으로 검토했다는 인상을 주어 ethos(신뢰성)를 높입니다. 핵심은 반론을 인정만 하고 지나가지 않는 것입니다 — 인정 뒤에는 반드시 반박(refute)이나 제한(qualify)이 따라야 논증이 더 강해집니다. 그냥 언급하고 끝내면 오히려 자기 논증을 약화시키게 됩니다.",
        terms: [
          { term: "반론 (counterargument)", def: "자기 주장에 맞서는 반대 견해. 다뤄야 할 대상이자 신뢰의 기회." },
          { term: "양보 (concession)", def: "상대 견해의 타당한 부분을 인정하는 수사적 동작." },
          { term: "반박 (refutation/rebuttal)", def: "반론이 왜 틀렸거나 불충분한지 논박하는 것." },
          { term: "제한 (qualification)", def: "반론의 일부를 받아들이되 자기 주장의 적용 범위를 좁혀 방어하는 것." },
        ],
        traps: [],
      },
      {
        title: "양보-반박 구조",
        body: "효과적인 반론은 '확실히 ~한 점은 인정한다(양보). 그러나 ~ 때문에(반박)'의 흐름을 따릅니다. 양보는 상대의 합리적 부분을 진심으로 받아들여 공정함을 보여주고, 반박은 그럼에도 자기 주장이 우월한 이유를 제시합니다. 양보만 하고 반박이 없으면 자기 논증이 무너지고, 반박만 거칠게 하면 ethos를 잃습니다. 둘의 균형이 관건입니다.",
        keyIdea: "'~한 점은 인정한다(양보). 그러나 ~이므로(반박)' — 양보와 반박이 한 쌍으로 움직여야 논증이 강해진다.",
        terms: [
          { term: "양보-반박 구조 (concession-refutation structure)", def: "상대 견해를 인정한 뒤 그것을 논박하거나 제한하는 단락 구성." },
          { term: "공정성 (fair-mindedness)", def: "상대 견해를 정직하게 다루는 태도. ethos를 강화한다." },
        ],
        example: "'기술 규제가 혁신을 늦춘다는 우려는 타당하다(양보). 그러나 안전장치 없는 혁신은 더 큰 사회적 비용을 낳는다(반박).'",
        traps: [],
      },
      {
        title: "steelman vs. straw man, 그리고 배치",
        body: "straw man(허수아비) 오류는 상대 견해를 일부러 약하게 왜곡해 쉽게 무너뜨리는 것으로, 들키면 ethos가 크게 손상됩니다. 반대로 steelmanning은 상대 견해를 가장 강한 형태로 재구성한 뒤 그것을 반박하는 것으로, 가장 설득력 있는 방식입니다. 배치 면에서는 보통 자기 핵심 논거를 세운 뒤 반론을 다루지만, 독자가 강하게 품을 반론이라면 일찍 짚어 해소하는 것이 효과적입니다.",
        terms: [
          { term: "허수아비 오류 (straw man fallacy)", def: "상대 견해를 약하게 왜곡해 반박하는 부정직한 수법." },
          { term: "스틸맨 (steelmanning)", def: "상대 견해를 가장 강한 형태로 재구성한 뒤 반박하는 정직한 전략." },
          { term: "배치 (placement)", def: "반론을 글의 어디에 넣을지에 대한 전략적 결정." },
        ],
        traps: [
          "반론을 '인정만 하고 넘어가기' — 반론은 언급으로 끝나면 자기 논증을 약화시킨다. 반드시 반박하거나 제한해 논증을 강화해야 한다.",
          "상대 견해를 약하게 왜곡해 반박하기(straw man) — 가장 강한 형태로 재구성(steelman)해 반박해야 ethos가 올라간다.",
        ],
      },
    ],
  },
  {
    lessonId: "honors-english-u1-l4",
    courseId: "honors-english",
    subjectLabel: "Honors English",
    emoji: "📖",
    unit: 1,
    lessonNum: 4,
    unitName: "수사학과 논증 (Rhetoric and Argumentation)",
    title: "논리적 오류가 논증을 무너뜨리기 전에 알아채기",
    subtitle: "논리적 오류 — 이름만이 아니라 '왜' 논증을 무너뜨리는지 설명하기",
    overview:
      "논리적 오류(logical fallacy)는 추론의 구조적 결함입니다. 학생들은 오류의 '이름'은 잘 대지만, 그것이 '왜' 논증을 무너뜨리는지는 설명하지 못합니다. 진짜 분석은 그 오류가 어떤 '타당한 추론'을 위반하는지를 보여주는 것입니다.",
    objectives: [
      "주요 논리적 오류를 식별하고 정의한다",
      "각 오류가 위반하는 타당한 추론을 설명한다",
      "오류와 정당한 추론(예: 적절한 권위 인용)을 구별한다",
      "자기 글에서 오류를 사전에 점검한다",
    ],
    sections: [
      {
        title: "관련성을 무너뜨리는 오류",
        body: "ad hominem(인신공격)은 주장 자체가 아니라 주장한 사람을 공격하는 오류로, '누가 말했는가'와 '그 말이 옳은가'는 별개라는 점을 위반합니다. appeal to authority(부적절한 권위 호소)는 해당 분야 전문가가 아닌 사람의 권위를 근거로 드는 오류인데, 단 전문가의 합의를 적절히 인용하는 것은 오류가 아닙니다. 핵심은 근거가 주장과 '논리적으로 관련 있는가'입니다.",
        terms: [
          { term: "논리적 오류 (logical fallacy)", def: "추론의 구조적 결함으로 결론을 정당화하지 못하게 만드는 것." },
          { term: "인신공격 (ad hominem)", def: "주장 대신 주장한 사람을 공격하는 오류." },
          { term: "부적절한 권위 호소 (appeal to authority)", def: "관련 없는 권위를 근거로 드는 오류. 적절한 전문가 인용과 구별된다." },
        ],
        traps: [],
      },
      {
        title: "성급한 일반화와 표본 문제",
        body: "hasty generalization(성급한 일반화)은 너무 적거나 편향된 사례에서 전체에 대한 결론을 끌어내는 오류이고, anecdotal evidence(일화적 근거)는 개별 경험담을 통계적 추세의 증거로 쓰는 오류입니다. 둘 다 '대표성 있는 표본'이라는 타당한 추론의 조건을 위반합니다. '내 주변에는 다 그렇다'는 표본 편향의 전형입니다.",
        keyIdea: "오류를 설명할 때는 그것이 위반하는 '타당한 추론'을 짚어라 — 성급한 일반화는 '대표성 있는 표본'이라는 조건을 깬다.",
        terms: [
          { term: "성급한 일반화 (hasty generalization)", def: "불충분하거나 편향된 사례로 전체를 결론짓는 오류." },
          { term: "일화적 근거 (anecdotal evidence)", def: "개별 경험담을 통계적 증거처럼 쓰는 오류." },
          { term: "표본 편향 (sampling bias)", def: "표본이 전체를 대표하지 못해 결론이 왜곡되는 문제." },
        ],
        traps: [],
      },
      {
        title: "구조적 오류 — 이분법·미끄러운 비탈·순환논증",
        body: "false dichotomy(거짓 이분법)는 사실 여러 선택지가 있는데 두 가지만 있는 것처럼 제시하는 오류로, '제3의 해법 가능성'을 무시하기 때문에 무너집니다. slippery slope(미끄러운 비탈)는 한 조치가 극단적 결과로 필연적으로 이어진다고 근거 없이 단정하는 오류이고, circular reasoning(순환 논증)은 결론을 전제로 다시 사용하는 오류입니다. 각 오류의 핵심은 '왜' 결론이 정당화되지 못하는지를 설명하는 데 있습니다.",
        terms: [
          { term: "거짓 이분법 (false dichotomy)", def: "선택지가 둘뿐인 것처럼 제시해 다른 가능성을 배제하는 오류." },
          { term: "미끄러운 비탈 (slippery slope)", def: "한 조치가 극단적 결과로 필연적으로 이어진다고 단정하는 오류." },
          { term: "순환 논증 (circular reasoning)", def: "증명하려는 결론을 전제로 다시 사용하는 오류." },
        ],
        example: "'규제하지 않으면 무정부 상태가 된다'(거짓 이분법) — 규제와 무정부 사이의 수많은 중간 선택지를 무시한다.",
        traps: [
          "오류의 '이름'만 대고 끝내기 — '거짓 이분법이다'는 식별일 뿐이다. 분석은 그것이 어떤 타당한 추론을 위반하는지(예: 둘 외의 해법 가능성을 무시) 설명해야 한다.",
          "모든 권위 인용을 오류로 단정하기 — 해당 분야 전문가의 합의를 적절히 인용하는 것은 오류가 아니다.",
        ],
      },
    ],
  },
  {
    lessonId: "honors-english-u1-l5",
    courseId: "honors-english",
    subjectLabel: "Honors English",
    emoji: "📖",
    unit: 1,
    lessonNum: 5,
    unitName: "수사학과 논증 (Rhetoric and Argumentation)",
    title: "근거가 당신의 목소리를 대체하지 않게 쓰는 법",
    subtitle: "근거 통합 — 인용 샌드위치(framing-quote-commentary)로 분석의 목소리 지키기",
    overview:
      "근거(evidence)는 논증을 받치는 재료일 뿐, 논증 그 자체가 아닙니다. 학생들은 인용을 떨어뜨려 놓고 분석을 생략하는데, 모든 근거는 앞에 맥락(framing)을, 뒤에 분석(commentary)을 붙여야 합니다. 그리고 그 분석은 인용을 다시 풀어쓰는 것이 아니라 자기 주장을 '전진'시켜야 합니다.",
    objectives: [
      "인용을 framing·embedding·explaining으로 통합한다",
      "직접 인용·간접 인용·요약을 목적에 맞게 선택한다",
      "근거 뒤의 commentary로 자기 주장을 전진시킨다",
      "근거가 글쓴이의 목소리를 대체하지 않게 한다",
    ],
    sections: [
      {
        title: "인용 샌드위치 — framing · quote · commentary",
        body: "근거를 통합하는 기본 틀은 '인용 샌드위치'입니다. 먼저 framing(맥락 제시)으로 누가·언제·어떤 상황에서 한 말인지 짧게 깔고, 그 위에 직접 인용을 올린 뒤, 마지막에 commentary(분석)로 그 인용이 내 주장에 무엇을 의미하는지 설명합니다. 빵(맥락·분석) 없이 인용(고기)만 떨어뜨리면 '인용 투척(dropped quote)'이 되어 논증이 끊깁니다. 분석이 근거의 두 배는 되어야 균형이 맞습니다.",
        terms: [
          { term: "근거 통합 (evidence integration)", def: "인용을 맥락·분석과 함께 문맥에 자연스럽게 엮는 기술." },
          { term: "인용 투척 (dropped quote)", def: "맥락·분석 없이 인용만 단독으로 던지는 실수." },
          { term: "프레이밍 (framing)", def: "인용 앞에 출처·상황·맥락을 제시하는 도입." },
          { term: "논평 (commentary)", def: "인용 뒤에 그 의미를 분석하는 글쓴이의 목소리." },
        ],
        example: "맥락: 'King은 거리 시위가 폭력적이라는 비판에 답하며' → 인용: '\"불의가 있는 곳에 정의는 위협받는다\"' → 분석: '여기서 그는 부정의를 국지적 문제가 아닌 보편적 위협으로 재규정한다.'",
        traps: [],
      },
      {
        title: "직접 인용 · 간접 인용 · 요약",
        body: "근거를 들이는 방식은 세 가지입니다. direct quote(직접 인용)는 원문의 표현 자체가 중요할 때, paraphrase(간접 인용/바꿔쓰기)는 한 부분의 의미를 내 문장 구조로 다시 풀 때, summary(요약)는 긴 내용을 압축할 때 씁니다. 모든 것을 직접 인용으로 채우면 글이 남의 목소리로 뒤덮이므로, 표현 자체가 중요한 순간에만 직접 인용을 아껴 쓰는 것이 좋습니다.",
        keyIdea: "직접 인용은 표현 자체가 중요할 때만 — 나머지는 paraphrase·summary로 내 목소리를 유지하라.",
        terms: [
          { term: "직접 인용 (direct quote)", def: "원문을 그대로 따오는 것. 표현 자체가 중요할 때 사용." },
          { term: "바꿔쓰기 (paraphrase)", def: "한 부분의 의미를 자기 문장 구조로 다시 표현하는 것." },
          { term: "요약 (summary)", def: "긴 내용을 핵심만 압축해 전달하는 것." },
        ],
        traps: [],
      },
      {
        title: "근거는 주장을 전진시켜야 한다",
        body: "commentary의 함정은 인용을 그냥 풀어 다시 말하는 것입니다. '이 인용은 ~라는 뜻이다'에서 멈추면 분석이 아니라 재진술입니다. 좋은 분석은 '그래서 이것이 내 주장에 대해 무엇을 입증하는가(So what?)'에 답합니다. 즉 근거는 글쓴이의 목소리를 대체하는 것이 아니라, 그 목소리가 펼치는 논증에 복무해야 합니다.",
        terms: [
          { term: "분석적 목소리 (analytical voice)", def: "근거를 해석하고 주장으로 연결하는 글쓴이 고유의 목소리." },
          { term: "재진술 (mere paraphrase of evidence)", def: "인용의 뜻을 다시 말하기만 하는 것. 분석이 아니다." },
          { term: "전진 (advancing the claim)", def: "근거 분석이 주장을 한 걸음 더 입증하게 만드는 것." },
        ],
        traps: [
          "맥락·분석 없이 인용만 떨어뜨리기(dropped quote) — 모든 근거는 앞에 framing, 뒤에 commentary가 필요하다.",
          "분석을 인용의 '재진술'로 끝내기 — commentary는 'So what?'에 답해 주장을 전진시켜야 한다. 인용 뜻을 다시 말하는 것은 분석이 아니다.",
        ],
      },
    ],
  },
];
