/**
 * Core Notes 한국어 스토리텔링 버전 — AP English Language and Composition Units 1–3.
 * 원본 내용 전량 보존(overview·body·keyIdea·table·terms·traps·example 포함) + 일타강사 내러티브.
 * 용어는 "한국어 (English)" 병기, 수사학 용어는 영문 인식 가능하게 유지.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const AP_ENGLISH_LANGUAGE_A_KO: CoreNote[] = [
  {
    lessonId: "ap-english-language-u1-l1",
    courseId: "ap-english-language",
    subjectLabel: "AP English Language and Composition",
    emoji: "✍️",
    unit: 1,
    lessonNum: 1,
    unitName: "Rhetorical Situation",
    title: "SOAPS와 맥락 — 분석하기 전에 '상황'부터 읽어라",
    subtitle:
      "어떤 글이든 분석에 들어가기 전에, 그 수사적 상황부터 지도로 그리세요 — 누가, 누구에게, 왜 말하는가.",
    overview:
      "모든 글은 특정한 수사적 상황(rhetorical situation) 안에서 만들어집니다. SOAPS 프레임워크는 그 상황을 쪼개 보여줘요 — Speaker(화자), Occasion(계기), Audience(청중), Purpose(목적), Subject(주제). 이렇게 쪼개면 글쓴이가 '무엇을 말했나'가 아니라 '어떻게, 왜 그런 선택을 했나'를 분석할 수 있습니다. 맥락(context)이 모든 수사적 결정을 좌우해요. 바로 여기서부터 시작합시다.",
    objectives: [
      "수사적 상황을 정의할 수 있다.",
      "SOAPS 프레임워크를 텍스트에 적용할 수 있다.",
      "맥락이 수사적 선택을 어떻게 형성하는지 설명할 수 있다.",
    ],
    formulas: [],
    diagram: "rhetorical-triangle",
    sections: [
      {
        title: "SOAPS 프레임워크",
        subtitle: null,
        body:
          "SOAPS는 어떤 글이든 그 수사적 상황을 풀어내는 체크리스트예요. 이 요소들을 하나씩 짚어내면, 글쓴이가 왜 그 구체적인 선택을 했는지가 드러납니다.",
        keyIdea:
          "SOAPS = Speaker(화자), Occasion(계기), Audience(청중), Purpose(목적), Subject(주제) — 어떤 글의 수사적 상황이든 한눈에 그리는 당신의 지도.",
        table: {
          headers: ["글자", "요소", "물어볼 것"],
          rows: [
            ["S", "Speaker (화자)", "글쓴이/화자 페르소나는 누구이고, 그 신뢰성은 어떤가?"],
            ["O", "Occasion (계기)", "어떤 사건/맥락이 이 글을 촉발했는가?"],
            ["A", "Audience (청중)", "누구를 겨냥하고 있는가?"],
            ["P", "Purpose (목적)", "글쓴이가 무엇을 이루려 하는가?"],
            ["S", "Subject (주제)", "다루는 화제가 무엇인가?"],
          ],
        },
        terms: [],
        traps: [],
        example: null,
      },
      {
        title: "왜 맥락이 중요한가",
        subtitle: null,
        body:
          "똑같은 주장이라도 맥락에 따라 전혀 다르게 가닿습니다. 화자는 계기와 청중에 맞춰 어조, 근거, 호소 방식을 조정해요. 좋은 수사적 분석은 이런 상황적 요인들이 글쓴이의 선택을 '어떻게' 끌어내는지를 설명하는 것 — 이게 AP Lang의 심장입니다.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "수사적 상황 (Rhetorical situation)",
            def: "글을 형성하는 맥락(화자·청중·목적·계기).",
          },
          {
            term: "맥락 (Context)",
            def: "글을 둘러싼 정황으로, 그 의미와 선택에 영향을 미친다.",
          },
        ],
        traps: [
          "AP Lang은 글쓴이가 자기 상황에 맞춰 '어떻게', '왜' 선택했는지를 분석할 때 점수를 줍니다 — 글이 '무엇을' 말하는지 요약만 하면 안 돼요.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-english-language-u1-l2",
    courseId: "ap-english-language",
    subjectLabel: "AP English Language and Composition",
    emoji: "✍️",
    unit: 1,
    lessonNum: 2,
    unitName: "Rhetorical Situation",
    title: "청중과 격식(Register)",
    subtitle:
      "좋은 글쓴이는 모든 단어를 특정 청중에 맞춰 빚어냅니다 — 그리고 그 순간에 맞게 격식의 수준(register)을 조율해요.",
    overview:
      "청중(audience)은 수사학의 중심입니다. 유능한 글쓴이는 내용, 근거, 어조, 그리고 격식의 수준(register)까지 자기가 말 거는 상대에 맞춰 재단해요. 글이 청중에 어떻게 적응하는지 알아채는 것 — 이게 핵심 분석 능력입니다.",
    objectives: [
      "글쓴이가 청중에 어떻게 적응하는지 설명할 수 있다.",
      "Register를 정의하고 그 수준들을 식별할 수 있다.",
      "어조를 청중에 맞춰진 선택으로서 분석할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "청중을 위한 글쓰기",
        subtitle: null,
        body:
          "글쓴이는 청중에 따라 다른 선택을 합니다. 과학자를 설득하는 근거와 유권자를 움직이는 근거는 다르고, 추도사의 어조와 풍자의 어조는 다르죠. 글을 분석한다는 건, 글쓴이의 선택이 의도된 청중에 어떻게 들어맞는지(혹은 전략적으로 어떻게 그 청중에 도전하는지)를 묻는 것입니다.",
        keyIdea:
          "청중이 '모든 것'을 좌우합니다 — 내용·근거·어조·격식 전부가 듣는 사람에 맞춰 달라져요.",
        table: null,
        terms: [
          {
            term: "청중 (Audience)",
            def: "글이 가닿도록 빚어진, 의도된 독자/청자.",
          },
          {
            term: "어조 (Tone)",
            def: "주제나 청중을 대하는 글쓴이의 태도로, 단어 선택을 통해 전달된다.",
          },
        ],
        traps: [],
        example: null,
      },
      {
        title: "Register와 격식",
        subtitle: null,
        body:
          "Register(격식 수준)는 언어의 격식 정도예요. 격식 있는 쪽(학술 에세이·연설)부터 비격식적인 쪽(문자·캐주얼 블로그)까지 펼쳐집니다. 글쓴이는 계기와 청중에 맞춰 register를 고르는데, 어긋나면(진지한 주제에 너무 가벼운 말투) 신뢰성이 깎여요. Diction(단어 선택)이 register를 알리는 주된 신호입니다.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "격식 수준 (Register)",
            def: "언어의 격식 정도로, 격식 있는 쪽부터 비격식적인 쪽까지 펼쳐진다.",
          },
          {
            term: "어휘 선택 (Diction)",
            def: "단어 선택으로, 어조와 register를 드러내는 신호.",
          },
        ],
        traps: [
          "Register는 수사적 상황에 '맞아야' 합니다 — 글쓴이의 격식 수준이 그 목적과 청중에 봉사하는지를 분석하세요.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-english-language-u1-l3",
    courseId: "ap-english-language",
    subjectLabel: "AP English Language and Composition",
    emoji: "✍️",
    unit: 1,
    lessonNum: 3,
    unitName: "Rhetorical Situation",
    title: "목적과 주장(Claim)",
    subtitle:
      "모든 논증은 특정 목적을 겨냥한, 명확하고 방어 가능한 주장 위에 세워집니다.",
    overview:
      "글쓴이는 목적(purpose)을 가지고 씁니다 — 설득하거나, 정보를 주거나, 행동을 촉구하거나. 그리고 그 목적은 주장(claim), 즉 논쟁 가능한 중심 논점을 통해 전달돼요. 강한 주장(thesis)은 논쟁의 여지가 있고 구체적이며, 글 안의 모든 것이 그것을 떠받치기 위해 작동합니다.",
    objectives: [
      "목적과 주장을 구분할 수 있다.",
      "강한 주장의 자질을 식별할 수 있다.",
      "thesis를 그것을 뒷받침하는 구조와 연결할 수 있다.",
    ],
    formulas: [],
    diagram: "argument-structure",
    sections: [
      {
        title: "목적 vs. 주장",
        subtitle: null,
        body:
          "목적(purpose)은 '왜'예요 — 글쓴이가 이루려는 것(설득·정보 전달·풍자). 주장(claim)은 '무엇'이고요 — 논쟁 가능한 중심 단언(thesis)입니다. 좋은 주장은 방어 가능하고(누군가는 반대할 수 있고) 글 안에서 증명할 만큼 충분히 구체적이에요.",
        keyIdea:
          "목적 = 글쓴이의 '목표'; 주장/thesis = 그 목표에 봉사하는 '논쟁 가능한 논점'. 주장은 반드시 논쟁의 여지가 있어야지, 단순 사실이면 안 돼요.",
        table: null,
        terms: [
          {
            term: "목적 (Purpose)",
            def: "글쓴이가 이루려는 것(설득·정보 전달·행동 촉구).",
          },
          {
            term: "주장 (Claim / thesis)",
            def: "글이 방어하는, 논쟁 가능한 중심 단언.",
          },
        ],
        traps: [],
        example: null,
      },
      {
        title: "무엇이 주장을 강하게 만드는가",
        subtitle: null,
        body:
          "강한 주장은 논쟁 가능하고(사실 진술이 아니고), 구체적이며(떠받칠 수 있을 만큼 좁고), 근거로 방어 가능합니다. 당신이 직접 쓸 때는, thesis가 '추론의 흐름(line of reasoning)' — 즉 주장을 증명하기 위해 논증이 따라갈 논리적 경로 — 까지 미리 보여줘야 해요.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "방어 가능한 주장 (Defensible claim)",
            def: "근거로 뒷받침할 수 있는, 논쟁 가능한 thesis.",
          },
          {
            term: "추론의 흐름 (Line of reasoning)",
            def: "주장·근거·해설(commentary)을 잇는 논리적 순서.",
          },
        ],
        traps: [
          "주장은 반드시 '논쟁 가능'해야 합니다 — '하늘은 파랗다'는 사실이지 주장이 아니에요. 아무도 합리적으로 반대할 수 없다면, 그건 thesis가 아닙니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-english-language-u2-l1",
    courseId: "ap-english-language",
    subjectLabel: "AP English Language and Composition",
    emoji: "✍️",
    unit: 2,
    lessonNum: 1,
    unitName: "Claims, Evidence, and Commentary",
    title: "주장의 유형",
    subtitle:
      "주장이 다 똑같은 게 아닙니다 — 유형을 알면 어떤 근거가 필요한지가 보여요.",
    overview:
      "논증은 주장(claim) 위에 서는데, 그 종류가 다릅니다 — 사실 주장(fact), 가치 주장(value), 정책 주장(policy). 유형을 식별하는 게 중요한 이유는, 각각 방어하는 데 다른 근거와 추론이 필요하기 때문이에요.",
    objectives: [
      "사실·가치·정책 주장을 구분할 수 있다.",
      "각 주장 유형을 적절한 근거와 짝지을 수 있다.",
      "주된 주장과 하위 주장을 구별할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "세 가지 주장 유형",
        subtitle: null,
        body:
          "각 주장 유형은 다른 질문을 던지고, 다른 뒷받침을 필요로 합니다.",
        keyIdea:
          "사실(Fact) = 그것이 참인가? 가치(Value) = 그것이 좋은가? 정책(Policy) = 우리가 행동해야 하는가? 정책 주장은 대개 그 밑에 사실 주장과 가치 주장을 깔고 있어요.",
        table: {
          headers: ["유형", "단언하는 것", "예시"],
          rows: [
            ["사실 (Fact)", "무언가가 참이다/아니다", "'시험 점수가 2010년 이후 떨어졌다.'"],
            ["가치 (Value)", "무언가가 좋다/나쁘다/도덕적이다", "'표준화 시험은 불공정하다.'"],
            ["정책 (Policy)", "무언가를 해야 한다", "'학교는 표준화 시험을 없애야 한다.'"],
          ],
        },
        terms: [],
        traps: [],
        example: null,
      },
      {
        title: "주장은 주장 위에 쌓인다",
        subtitle: null,
        body:
          "한 편의 글은 보통 하나의 주된 주장(thesis)을 여러 하위 주장(sub-claim)이 떠받치고, 각 하위 주장은 다시 근거로 뒷받침됩니다. 이 위계를 알아채면 구조를 분석하고, 당신 자신의 추론의 흐름을 세우는 데 도움이 돼요.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "사실/가치/정책 주장 (Claim of fact / value / policy)",
            def: "무엇이 참인지, 무엇이 좋은지, 무엇을 해야 하는지에 관한 단언.",
          },
          {
            term: "하위 주장 (Sub-claim)",
            def: "주된 thesis를 뒷받침하는 더 작은 주장.",
          },
        ],
        traps: [
          "정책 주장('우리는 …해야 한다')은 보통 숨은 사실 주장과 가치 주장에 기댑니다 — 그것들을 짚어내야 평가하거나 반박할 수 있어요.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-english-language-u2-l2",
    courseId: "ap-english-language",
    subjectLabel: "AP English Language and Composition",
    emoji: "✍️",
    unit: 2,
    lessonNum: 2,
    unitName: "Claims, Evidence, and Commentary",
    title: "근거의 선택과 통합",
    subtitle:
      "근거만으로는 논증이 되지 않습니다 — 근거를 주장에 잇는 당신의 해설(commentary)이 설득을 해내요.",
    overview:
      "강한 논증은 주장을 적절하고 충분한 근거로 뒷받침하고 — 결정적으로 — 그 근거가 논점을 '어떻게' 증명하는지 설명하는 해설(commentary)로 뒷받침합니다. AP Lang에서 평범한 글과 훌륭한 글의 차이는, 거의 언제나 근거의 양이 아니라 해설의 질이에요.",
    objectives: [
      "근거의 유형을 식별하고 관련성을 판단할 수 있다.",
      "해설(commentary)의 역할을 설명할 수 있다.",
      "근거를 추론 속에 매끄럽게 통합할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "좋은 근거 고르기",
        subtitle: null,
        body:
          "근거는 사실/통계, 예시, 전문가 증언, 일화, 유추일 수 있어요. 좋은 근거는 관련성이 있고(주장을 직접 뒷받침하고), 충분하며(설득할 만큼 많고), 신뢰할 만합니다. 그 '유형'은 청중에 맞아야 해요 — 회의적인 사람에겐 데이터를, 감정적 호소엔 이야기를.",
        keyIdea:
          "근거는 '관련성'과 '충분성'을 갖춰야 합니다 — 주장을 직접 뒷받침하지 못하는 인용을 잔뜩 쌓아봐야 소용없어요.",
        table: null,
        terms: [
          {
            term: "근거 (Evidence)",
            def: "주장을 뒷받침하는 데 쓰이는 사실·예시·증언·데이터.",
          },
          {
            term: "관련성/충분성 (Relevance / sufficiency)",
            def: "근거가 주장을 직접 뒷받침하는지, 그리고 설득할 만큼 충분한지 여부.",
          },
        ],
        traps: [],
        example: null,
      },
      {
        title: "해설이 엔진이다",
        subtitle: null,
        body:
          "근거는 스스로 말하지 않습니다. 해설(commentary)은 그 근거가 주장을 '어떻게', '왜' 뒷받침하는지에 대한 글쓴이의 설명 — 사실을 논증으로 바꾸는 연결고리예요. 약한 에세이는 인용을 '툭 떨어뜨리고', 강한 에세이는 각 근거의 의미를 설명하며 추론의 흐름을 쌓아 올립니다.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "해설 (Commentary)",
            def: "근거가 주장을 어떻게/왜 뒷받침하는지에 대한 설명 — 분석적 연결고리.",
          },
          {
            term: "툭 떨어뜨린 인용 (Dropped quote)",
            def: "통합이나 설명 없이 끼워 넣은 근거 — 피해야 할 약점.",
          },
        ],
        traps: [
          "AP Lang 최고의 처방: '해설'을 더하세요. 의미 설명이 없는 근거는 논증을 만들어내지 못합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-english-language-u2-l3",
    courseId: "ap-english-language",
    subjectLabel: "AP English Language and Composition",
    emoji: "✍️",
    unit: 2,
    lessonNum: 3,
    unitName: "Claims, Evidence, and Commentary",
    title: "반론과 양보(Concession)",
    subtitle:
      "강한 논증은 반대편을 무시하지 않습니다 — 오히려 맞붙어요, 그게 더 설득력 있게 만들거든요.",
    overview:
      "반대 견해를 인정하고(counterargument), 그 부분적 타당성을 양보한 뒤(concession), 반박하는 것(rebuttal)은 논증을 강하게 만듭니다. 공정함을 보이고, 신뢰성을 쌓고, 반론을 미리 막아주거든요 — 세련된 글의 표지입니다.",
    objectives: [
      "반론·양보·반박을 정의할 수 있다.",
      "반대편을 다루는 것이 왜 논증을 강화하는지 설명할 수 있다.",
      "'양보 후 반박' 동작을 알아챌 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "반대편과 맞붙기",
        subtitle: null,
        body:
          "반론(counterargument)은 반대되는 관점이에요. 양보(concession)는 그 일부에 일리가 있음을 인정하는 것이고요. 그다음 반박(rebuttal)이 왜 당신의 입장이 그래도 성립하는지 설명합니다. 고전적인 동작이 '양보 후 반박'이에요: '비판자들은 X라고 주장하지만(양보), 이는 Y를 간과한다(반박).'",
        keyIdea:
          "양보 후 반박: 타당한 점을 인정한 뒤, '그래도 왜 내 주장이 성립하는지'를 설명하면 — 공정해 보이면서 '동시에' 논증이 강해집니다.",
        table: null,
        terms: [
          {
            term: "반론 (Counterargument)",
            def: "글쓴이가 다루는 반대되는 관점.",
          },
          {
            term: "양보 (Concession)",
            def: "반대편 논점에 어느 정도 타당성이 있음을 인정하는 것.",
          },
          {
            term: "반박 (Rebuttal)",
            def: "왜 당신의 입장이 그래도 성립하는지를 보여주는 응답.",
          },
        ],
        traps: [],
        example: null,
      },
      {
        title: "왜 통하는가",
        subtitle: null,
        body:
          "반대편을 다루면 ethos가 쌓이고(공정하고 잘 아는 사람으로 보이고), 독자의 반론을 미리 막으며, AP가 'sophistication(세련됨)'으로 보상하는 복합성을 보여줍니다. 뻔한 반론을 무시하면 논증이 일방적이고 약해 보여요.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "세련됨 (Sophistication)",
            def: "복합성/반론에 맞붙는 등 미묘하고 정교한 논증으로, AP 채점 기준에서 보상받는다.",
          },
        ],
        traps: [
          "양보는 항복이 아니에요 — 더 큰 논쟁에서 '이기기 위해' 작은 점을 내주는 겁니다. 반드시 반박을 뒤따르게 하세요.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-english-language-u2-l4",
    courseId: "ap-english-language",
    subjectLabel: "AP English Language and Composition",
    emoji: "✍️",
    unit: 2,
    lessonNum: 4,
    unitName: "Claims, Evidence, and Commentary",
    title: "논리적 오류(Logical Fallacies)",
    subtitle:
      "독자를 슬쩍 지나칠 수 있는 추론의 결함 — 짚어내면 약한 논증을 평가하고(또 피할 수) 있어요.",
    overview:
      "논리적 오류(logical fallacy)는 설득력 있게 들리더라도 논증을 약화시키는 추론의 잘못입니다. 흔한 오류들을 알아채면, 남의 논증을 비판하고 그것들을 피함으로써 당신 자신의 논증을 강화할 수 있어요.",
    objectives: [
      "논리적 오류를 정의할 수 있다.",
      "흔한 오류들을 식별할 수 있다.",
      "오류가 왜 논증을 약화시키는지 설명할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "흔한 오류들",
        subtitle: null,
        body:
          "각 오류는 논리적 추론을 깨뜨리는 지름길이에요. 가장 많이 출제되는 것들을 알아둡시다.",
        keyIdea:
          "오류는 종종 설득력 있게 '들립니다' — 그래서 위험해요. 오류에 이름을 붙이는 것, 그게 약한 논증을 해체하는 방법입니다.",
        table: {
          headers: ["오류", "하는 일"],
          rows: [
            ["인신공격 (Ad hominem)", "논증이 아니라 사람을 공격한다"],
            ["허수아비 공격 (Straw man)", "상대 견해를 왜곡해 쉽게 공격한다"],
            ["미끄러운 비탈 (Slippery slope)", "한 걸음이 필연적으로 재앙으로 이어진다고 주장한다"],
            ["거짓 양자택일 (False dilemma)", "선택지가 더 있는데 단 두 가지만 제시한다"],
            ["성급한 일반화 (Hasty generalization)", "너무 적은 근거로 폭넓은 결론을 끌어낸다"],
          ],
        },
        terms: [],
        traps: [],
        example: null,
      },
      {
        title: "왜 중요한가",
        subtitle: null,
        body:
          "단 하나의 뻔한 오류만으로도 논증의 신뢰성이 무너질 수 있어요. 분석에서는 글쓴이의 오류를 짚어내는 게 강력한 비판이 되고, 당신 자신의 글에서는 오류를 피하는 게 추론을 탄탄하게 유지합니다. 단, 호소(pathos)는 논리를 '대체'하지 않는 한 오류가 아니라는 점에 유의하세요.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "논리적 오류 (Logical fallacy)",
            def: "논증의 타당성을 훼손하는 추론의 잘못.",
          },
          {
            term: "인신공격/허수아비 공격 (Ad hominem / straw man)",
            def: "논증에 맞붙는 대신 사람을 공격하거나 / 상대의 논증을 왜곡하는 것.",
          },
        ],
        traps: [
          "감정적 호소(pathos)가 자동으로 오류인 건 아니에요 — 탄탄한 추론을 '대체'할 때에만 오류입니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-english-language-u3-l1",
    courseId: "ap-english-language",
    subjectLabel: "AP English Language and Composition",
    emoji: "✍️",
    unit: 3,
    lessonNum: 1,
    unitName: "Rhetorical Appeals",
    title: "에토스(Ethos): 신뢰성과 믿음",
    subtitle:
      "청중이 당신의 논증을 믿기 전에, 먼저 '당신'을 믿어야 합니다 — 그게 ethos예요.",
    overview:
      "에토스(Ethos)는 화자의 신뢰성과 인격에 대한 수사적 호소입니다. 청중은 자기가 신뢰하는 출처에 더 잘 설득되기에, 글쓴이는 전문성·공정함·공유된 가치·믿을 만한 어조를 통해 ethos를 쌓아요. logos, pathos와 더불어 아리스토텔레스의 세 호소 중 하나입니다.",
    objectives: [
      "ethos를 정의하고 그것이 어떻게 확립되는지 설명할 수 있다.",
      "ethos를 logos, pathos와 구별할 수 있다.",
      "글쓴이가 어떻게 신뢰성을 쌓는지 분석할 수 있다.",
    ],
    formulas: [],
    diagram: "rhetorical-triangle",
    sections: [
      {
        title: "신뢰성 쌓기",
        subtitle: null,
        body:
          "글쓴이는 전문성을 드러내고(자격/지식을 인용), 공정함을 보이고(다른 견해를 인정), 청중의 가치를 공유하고, 적절하고 자신감 있는 어조를 씀으로써 ethos를 확립합니다. 신뢰할 만한 화자는 근거를 저울질하기도 전에 '일단 믿어주는' 이점을 얻어요.",
        keyIdea:
          "에토스 = 청중이 '화자'를 신뢰하는 것. 반론을 인정하는 것도, 전문성을 인용하는 것도 둘 다 ethos를 쌓습니다.",
        table: null,
        terms: [
          {
            term: "에토스 (Ethos)",
            def: "화자의 신뢰성과 인격에 기반한 호소.",
          },
          {
            term: "신뢰성 (Credibility)",
            def: "화자가 믿을 만하고 박식하다는 청중의 인식.",
          },
        ],
        traps: [],
        example: null,
      },
      {
        title: "세 호소를 함께",
        subtitle: null,
        body:
          "아리스토텔레스의 수사적 삼각형(rhetorical triangle)에는 세 호소가 있어요: ethos(신뢰성), logos(논리/근거), pathos(감정). 효과적인 설득은 보통 이 셋을 섞습니다. ethos는 토대예요 — 신뢰가 없으면 강한 논리와 감정조차 맥없이 주저앉습니다.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "수사적 호소 (Rhetorical appeals)",
            def: "ethos·logos·pathos — 세 가지 설득 전략(아리스토텔레스).",
          },
        ],
        traps: [
          "에토스는 '화자'의 신뢰성에 관한 것입니다 — pathos(청중의 감정)나 logos(논증의 논리)와 헷갈리지 마세요.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-english-language-u3-l2",
    courseId: "ap-english-language",
    subjectLabel: "AP English Language and Composition",
    emoji: "✍️",
    unit: 3,
    lessonNum: 2,
    unitName: "Rhetorical Appeals",
    title: "로고스(Logos): 논리와 근거",
    subtitle:
      "청중의 이성에 대한 호소 — 논증을 버티게 하는 사실, 데이터, 탄탄한 논리.",
    overview:
      "로고스(Logos)는 논리와 이성에 대한 수사적 호소입니다. 글쓴이는 근거·데이터·예시·명확한 추론을 써서, 자기 주장이 합리적이고 잘 뒷받침된다는 걸 청중에게 납득시켜요. '증명'과 가장 밀접하게 연관된 호소입니다.",
    objectives: [
      "logos와 그 구성 요소를 정의할 수 있다.",
      "글쓴이가 어떻게 논리적 호소를 쌓는지 식별할 수 있다.",
      "강한 logos를 논리적 오류와 구별할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "이성에 호소하기",
        subtitle: null,
        body:
          "로고스는 논리로 설득합니다: 사실, 통계, 전문가 데이터, 구체적 예시, 그리고 근거를 주장에 잇는 명확한 추론의 흐름으로요. 그 논리를 따라가고 근거를 받아들이는 청중은 이성적 근거에서 설득됩니다.",
        keyIdea:
          "로고스 = 청중의 '이성'에 대한 호소. 근거 + 그것을 주장에 잇는 탄탄한 추론, 이게 작동 중인 logos예요.",
        table: null,
        terms: [
          {
            term: "로고스 (Logos)",
            def: "근거와 탄탄한 논증을 써서 논리와 이성에 호소하는 것.",
          },
          {
            term: "귀납/연역 추론 (Inductive / deductive reasoning)",
            def: "구체적 사례에서 일반적 주장으로, 또는 일반 원리에서 결론으로 나아가는 추론.",
          },
        ],
        traps: [],
        example: null,
      },
      {
        title: "강한 logos vs. 오류",
        subtitle: null,
        body:
          "진짜 로고스는 관련성 있는 근거와 타당한 추론 위에 섭니다. 그 '논리'가 무너지면 — 미끄러운 비탈, 성급한 일반화, 거짓 양자택일처럼 — 추론처럼 '보이기만' 하는 오류가 돼요. logos를 분석한다는 건, 근거가 정말로 결론을 뒷받침하는지 점검하는 것입니다.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "추론의 흐름 (Line of reasoning)",
            def: "근거를 주장에 잇는 논리적 사슬 — logos의 구조.",
          },
        ],
        traps: [
          "로고스는 단지 사실을 갖고 있는 게 아니에요 — 그 사실들을 주장에 잇는 '추론'입니다. 진짜 사실이 있어도 추론이 엉성하면 여전히 약한 logos예요.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-english-language-u3-l3",
    courseId: "ap-english-language",
    subjectLabel: "AP English Language and Composition",
    emoji: "✍️",
    unit: 3,
    lessonNum: 3,
    unitName: "Rhetorical Appeals",
    title: "파토스(Pathos): 감정적 연결",
    subtitle:
      "청중의 감정을 움직이는 것 — 잘 쓰면 행동을 이끌고, 남용하면 조종이 됩니다.",
    overview:
      "파토스(Pathos)는 청중의 감정에 대한 수사적 호소입니다. 글쓴이는 생생한 언어, 이미지, 일화, 가치가 실린 단어를 써서 청중이 '느끼게' 만들어요 — 그리고 느낌은 종종 행동을 끌어냅니다. 윤리적으로 쓰면 논리를 보완하지만, 남용하면 조종할 수 있어요.",
    objectives: [
      "pathos를 정의하고 그것이 어떻게 만들어지는지 설명할 수 있다.",
      "텍스트 속 감정적 호소를 분석할 수 있다.",
      "효과적인 pathos를 조종(manipulation)과 구별할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "감정에 호소하기",
        subtitle: null,
        body:
          "파토스는 생생한 이미지, 개인적 일화, 감정이 실린 어휘(connotation), 그리고 공유된 가치(공포·희망·자긍심·연민)에 대한 호소를 통해 작동해요. 잘 놓인 이야기 하나가, 통계만으로는 불가능한 방식으로 청중을 행동하게 움직일 수 있습니다.",
        keyIdea:
          "파토스 = 청중의 '감정'에 대한 호소. 일화와 생생하고 함축적인(connotative) 언어가 그 주된 도구예요.",
        table: null,
        terms: [
          {
            term: "파토스 (Pathos)",
            def: "청중의 감정에 대한 호소.",
          },
          {
            term: "함축 (Connotation)",
            def: "단어가 문자적 의미를 넘어 지니는 감정적 연상.",
          },
        ],
        traps: [],
        example: null,
      },
      {
        title: "효과적 vs. 조종적",
        subtitle: null,
        body:
          "파토스는 강력하지만 양날의 검이에요. 윤리적 pathos는 탄탄한 논증을 뒷받침합니다(실제 문제를 보여주는 진짜 이야기처럼요). 조종적 pathos는 근거를 감정으로 대체하거나 공포를 이용하는데 — 이건 오류로 넘어가는 겁니다. 최고의 설득은 pathos를 logos, ethos와 균형 맞춰요.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "공포/동정에의 호소 (Appeal to fear/pity)",
            def: "근거를 대체하면 오류가 되는 감정적 호소.",
          },
        ],
        traps: [
          "파토스는 논리를 '대체'하지 않는 한 정당합니다 — 감정이 논증을 뒷받침하는지, 아니면 증명을 대신하는지를 분석하세요.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-english-language-u3-l4",
    courseId: "ap-english-language",
    subjectLabel: "AP English Language and Composition",
    emoji: "✍️",
    unit: 3,
    lessonNum: 4,
    unitName: "Rhetorical Appeals",
    title: "카이로스(Kairos)와 시의성",
    subtitle:
      "옳은 논증도 그릇된 순간엔 실패합니다 — kairos는 타이밍의 기술이에요.",
    overview:
      "카이로스(Kairos)는 시의성의 호소 — 옳은 순간에, 그 특정한 계기에 맞춰 옳은 논증을 펴는 것입니다. 강한 논증조차 타이밍이 나쁘면 맥없이 주저앉을 수 있어요. 알맞은 순간을 붙잡는 것, 그게 수사를 제대로 가닿게 합니다.",
    objectives: [
      "kairos를 정의할 수 있다.",
      "타이밍이 설득에 어떻게 영향을 미치는지 설명할 수 있다.",
      "kairos를 수사적 상황과 연결할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "알맞은 순간",
        subtitle: null,
        body:
          "카이로스는 옳은 순간과 맥락을 활용하는 것이에요 — 청중이 들을 준비가 됐을 때, 또는 사건들이 그 논증을 절박하게 만들 때 어떤 사안을 다루는 것이죠. 관련 위기 직후에 나온 개혁의 외침은, 다른 때라면 갖지 못할 힘을 실어 나릅니다.",
        keyIdea:
          "카이로스 = 타이밍. 똑같은 논증도 그 순간이 옳은지 아닌지에 따라 성공하거나 실패할 수 있어요.",
        table: null,
        terms: [
          {
            term: "카이로스 (Kairos)",
            def: "시의성의 수사적 호소 — 알맞은 순간을 활용하는 것.",
          },
        ],
        traps: [],
        example: null,
      },
      {
        title: "카이로스와 상황",
        subtitle: null,
        body:
          "카이로스는 SOAPS의 'Occasion(계기)'과 곧장 이어집니다: 능숙한 수사가는 그 순간을 읽고, 거기에 맞춰 호소를 빚어내요. kairos를 분석한다는 건 — 왜 '이' 논증을, '이' 형태로, '지금' 펴는가, 그리고 그 타이밍이 영향력을 강화하는가 — 를 묻는 것입니다.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "계기 (Occasion)",
            def: "kairos가 활용하는 맥락/타이밍(수사적 상황에서).",
          },
        ],
        traps: [
          "카이로스는 '언제'와 맥락에 관한 것입니다 — 그저 ethos/logos/pathos로 축소하지 마세요; 타이밍은 그 자체로 독립된 전략적 차원이에요.",
        ],
        example: null,
      },
    ],
  },
];
