/**
 * Core Notes 한국어 스토리텔링 버전 — AP Psychology Units 5–8 (발달·동기/정서·임상·사회심리).
 * 원본 내용 전량 보존(overview·body·keyIdea·table·terms·traps·example 포함) + 일타강사 내러티브.
 * 용어는 "한국어 (English)" 병기. 학자·장애 이름은 알아볼 수 있게 유지.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const AP_PSYCHOLOGY_B_KO: CoreNote[] = [
  {
    lessonId: "ap-psychology-u5-l1",
    courseId: "ap-psychology",
    subjectLabel: "AP Psychology",
    emoji: "🧠",
    unit: 5,
    lessonNum: 1,
    unitName: "Developmental Psychology",
    title: "피아제의 인지 발달 단계",
    subtitle:
      "아이는 '덜 똑똑한 어른'이 아니에요 — 정해진 순서대로 펼쳐지는, 질적으로 다른 방식으로 생각합니다.",
    overview:
      "장 피아제(Jean Piaget)는 아이의 사고가 네 단계를 거쳐 발달하며, 각 단계가 세상을 이해하는 '새로운 방식'이라고 봤어요. 아이는 머릿속에 틀(스키마)을 짓고, 자라면서 동화(assimilation)와 조절(accommodation)을 통해 그 틀을 끊임없이 업데이트합니다. 시험은 단계의 '순서'와 각 단계의 한계를 집요하게 물어요 — 특히 전조작기의 자기중심성과 보존 개념 결여를 외워두면 절반은 먹고 들어갑니다.",
    objectives: [
      "스키마·동화·조절을 설명할 수 있다.",
      "피아제의 네 단계를 대표 능력·한계와 함께 순서대로 배열할 수 있다.",
      "피아제와 비고츠키의 사회적 발달관을 대조할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "사고는 이렇게 자란다 — 스키마의 업데이트",
        subtitle: null,
        body:
          "스키마(schema)는 어떤 개념에 대한 머릿속 틀이에요. 새 정보가 기존 스키마에 '딱 맞으면' 그게 동화입니다 (아이가 얼룩말을 보고 '말'이라고 부르는 거죠). 반대로 스키마 자체를 '바꿔야' 현실에 맞으면 그게 조절이에요 (얼룩말은 말과는 다른 별개의 동물이라고 배우는 것). 발달이란 결국 동화와 조절이 끊임없이 반복되는 과정입니다.",
        keyIdea:
          "동화 = 새 정보를 '옛 스키마 안에' 끼워 넣기. 조절 = 새 정보에 맞게 '스키마 자체를 바꾸기'.",
        table: null,
        terms: [
          {
            term: "스키마 (Schema)",
            def: "정보를 조직하고 해석하는 머릿속 틀.",
          },
          {
            term: "동화 (Assimilation)",
            def: "새로운 경험을 기존 스키마 안에 끼워 맞추는 것.",
          },
          {
            term: "조절 (Accommodation)",
            def: "새 정보를 받아들이기 위해 스키마를 수정하는 것.",
          },
        ],
        traps: [],
        example: null,
      },
      {
        title: "네 단계",
        subtitle: null,
        body:
          "각 단계는 새로운 능력을 더하지만, '아직 발달하지 않은 것' 때문에 한계도 가집니다. 시험에 가장 많이 나오는 두 한계는 전조작기 아이의 자기중심성(egocentrism)과 보존 개념 결여(모양이 바뀌어도 양은 그대로라는 걸 못 잡는 것)예요.",
        keyIdea:
          "보존 개념(구체적 조작기)과 대상 영속성(감각운동기) — 이 두 이정표가 시험에 가장 많이 나옵니다.",
        table: {
          headers: ["단계", "나이", "획득 능력 / 핵심 특징"],
          rows: [
            [
              "감각운동기 (Sensorimotor)",
              "0–2세",
              "대상 영속성(안 보여도 사물이 존재함을 앎)",
            ],
            [
              "전조작기 (Preoperational)",
              "2–7세",
              "상징·언어 사용; 그러나 자기중심적, 보존 개념 없음",
            ],
            [
              "구체적 조작기 (Concrete operational)",
              "7–11세",
              "보존 개념, 구체적 대상에 대한 논리적 사고",
            ],
            [
              "형식적 조작기 (Formal operational)",
              "12세+",
              "추상적·가설적 추론",
            ],
          ],
        },
        terms: [],
        traps: [
          "자기중심성(egocentrism)은 '타인의 관점을 못 잡는 것'이지, 이기심이 아닙니다.",
        ],
        example: null,
      },
      {
        title: "피아제를 넘어서 — 비고츠키",
        subtitle: null,
        body:
          "레프 비고츠키(Lev Vygotsky)는 발달의 '사회적' 측면을 강조했어요. 아이는 근접발달영역(혼자 할 수 있는 것과 도움받아 할 수 있는 것 사이의 간격) 안에서, 비계 설정(scaffolding, 능력이 자라면 거두어지는 임시 도움)을 통해 배웁니다. 또 현대 연구는 피아제가 어린아이의 능력을 과소평가했다는 점도 보여줘요.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "근접발달영역 (Zone of proximal development)",
            def: "학습자가 혼자 할 수 있는 것과 도움받아 할 수 있는 것 사이의 간격.",
          },
          {
            term: "비계 설정 (Scaffolding)",
            def: "더 능숙한 사람이 주는 임시 지원으로, 능력이 자라면 거두어진다.",
          },
        ],
        traps: [],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-psychology-u5-l2",
    courseId: "ap-psychology",
    subjectLabel: "AP Psychology",
    emoji: "🧠",
    unit: 5,
    lessonNum: 2,
    unitName: "Developmental Psychology",
    title: "사회성 발달 — 애착과 정체성",
    subtitle:
      "아기의 첫 유대에서 십대의 '나는 누구인가' 탐색까지 — 우리를 빚어내는 관계들.",
    overview:
      "사회성 발달은 평생에 걸친 우리의 유대와 자아감을 추적해요. 양육자에 대한 초기 애착은 이후 관계의 '틀'을 만들고, 에릭슨(Erikson)은 인생 전체를 일련의 사회적 도전으로, 각 단계를 하나의 전환점으로 지도화했습니다.",
    objectives: [
      "할로우(Harlow)와 에인즈워스(Ainsworth)의 애착 연구와 애착 유형을 요약할 수 있다.",
      "에릭슨의 핵심 심리사회적 단계와 그 중심 갈등을 식별할 수 있다.",
      "초기 애착을 이후의 사회적 결과와 연결할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "애착 — 첫 번째 유대",
        subtitle: null,
        body:
          "할로우(Harlow)의 원숭이는 먹이를 주는 철사 '엄마'보다 부드러운 천 '엄마'를 선택했어요 — 애착이 단지 먹이가 아니라 접촉 위안(contact comfort)에서 자란다는 걸 보여준 거죠. 이어서 에인즈워스(Ainsworth)의 '낯선 상황(Strange Situation)' 실험은 양육자가 떠나고 돌아올 때 아기가 보이는 반응에 따라 뚜렷이 구분되는 애착 유형들을 드러냈습니다.",
        keyIdea:
          "할로우의 교훈: 단지 먹이가 아니라 위안과 접촉이 애착을 만든다.",
        table: {
          headers: ["애착 유형", "양육자가 떠날 때/돌아올 때의 행동"],
          rows: [
            [
              "안정 애착 (Secure)",
              "떠날 때 괴로워하고 돌아오면 안정됨; 양육자를 '안전 기지'로 삼음",
            ],
            [
              "회피 애착 (Avoidant)",
              "거의 괴로워하지 않음; 돌아온 양육자를 피하거나 무시함",
            ],
            [
              "불안(저항) 애착 (Anxious/resistant)",
              "심하게 괴로워함; 매달리면서도 돌아온 양육자에게 잘 달래지지 않음",
            ],
          ],
        },
        terms: [],
        traps: [],
        example: null,
      },
      {
        title: "에릭슨의 심리사회적 단계",
        subtitle: null,
        body:
          "에릭 에릭슨(Erik Erikson)은 평생을 여덟 단계로 나누고, 각 단계를 풀어야 할 '갈등'으로 봤어요. 여덟 개를 완벽히 외울 필욘 없지만, 빈출 단계는 꼭 알아야 합니다 — 특히 청소년기의 정체성 대 역할 혼란(identity vs. role confusion), 즉 십대가 일관된 자아감을 형성하는 단계예요.",
        keyIdea:
          "갈등을 나이에 맞춰라: 정체성 = 십대, 친밀감 = 청년기, 생산성 = 중년기.",
        table: {
          headers: ["단계 (나이)", "갈등", "성공한 모습"],
          rows: [
            [
              "영아기 (Infancy)",
              "신뢰 대 불신 (Trust vs. mistrust)",
              "믿을 만한 돌봄에서 오는 기본적 안정감",
            ],
            [
              "청소년기 (Adolescence)",
              "정체성 대 역할 혼란 (Identity vs. role confusion)",
              "분명한 자아감",
            ],
            [
              "청년기 (Young adulthood)",
              "친밀감 대 고립 (Intimacy vs. isolation)",
              "가깝고 헌신적인 관계",
            ],
            [
              "중년기 (Middle adulthood)",
              "생산성 대 침체 (Generativity vs. stagnation)",
              "다음 세대에 기여함",
            ],
          ],
        },
        terms: [],
        traps: [
          "정체성 대 역할 혼란은 '청소년기' 단계입니다 — 에릭슨 중 가장 많이 출제되는 갈등이에요.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-psychology-u6-l1",
    courseId: "ap-psychology",
    subjectLabel: "AP Psychology",
    emoji: "🧠",
    unit: 6,
    lessonNum: 1,
    unitName: "Motivation and Emotion",
    title: "동기 — 이론과 배고픔",
    subtitle:
      "무엇이 우리를 행동하게 밀어붙이는가 — 그리고 몸의 배고픔 시스템이 동기 전반에 대해 알려주는 것.",
    overview:
      "동기(motivation)는 행동 뒤의 '왜'예요. 여러 이론이 각자 그 일부씩을 포착하고, 배고픔은 '교과서적 사례 연구'입니다 — 생물학과 환경이 하나의 동기화된 행동을 동시에 끌고 가는 걸 보여주니까요.",
    objectives: [
      "동기의 주요 이론들을 비교할 수 있다.",
      "매슬로의 욕구 위계를 순서대로 배열할 수 있다.",
      "배고픔의 생물학(시상하부·호르몬·설정점)을 설명할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "동기 이론들",
        subtitle: null,
        body:
          "어떤 단일 이론도 모든 동기를 설명하지 못하니, 각 이론이 '무엇을 강조하는지'를 알아야 해요. 시험은 흔히 상황을 하나 던지고 '어떤 이론이 맞는지' 묻습니다.",
        keyIdea:
          "여키스-도슨 법칙(Yerkes-Dodson law): 수행은 '중간' 각성에서 최고조 — 너무 낮으면 늘어지고, 너무 높으면 무너집니다.",
        table: {
          headers: ["이론", "핵심 아이디어"],
          rows: [
            [
              "추동 감소 이론 (Drive-reduction)",
              "내적 긴장을 줄이고 균형(항상성)을 회복하려고 행동한다",
            ],
            [
              "각성 이론 (Arousal theory)",
              "너무 낮지도 높지도 않은 '최적' 각성 수준을 추구한다",
            ],
            [
              "유인 이론 (Incentive theory)",
              "외적 보상(유인)이 행동을 끌어당긴다",
            ],
            [
              "매슬로의 욕구 위계 (Maslow's hierarchy)",
              "기본 생존부터 자아실현까지 욕구가 순서대로 충족된다",
            ],
          ],
        },
        terms: [
          {
            term: "추동 감소 이론 (Drive-reduction theory)",
            def: "생리적 욕구를 줄이고 항상성을 회복하려는 동기.",
          },
          {
            term: "여키스-도슨 법칙 (Yerkes-Dodson law)",
            def: "수행은 최적(중간) 수준의 각성에서 가장 좋다.",
          },
        ],
        traps: [],
        example: null,
      },
      {
        title: "매슬로의 욕구 위계",
        subtitle: null,
        body:
          "매슬로(Maslow)는 욕구를 피라미드로 배열했어요 — 아래쪽 욕구가 어느 정도 충족돼야 위쪽 욕구가 행동을 끌고 갑니다. 바닥부터 위로: 생리적 욕구(음식·물) → 안전 → 사랑/소속 → 존중 → 자아실현(자기 잠재력을 온전히 실현하는 것).",
        keyIdea:
          "굶주리는 상태에선 존중이나 자아실현에 집중할 수 없어요 — 기본 욕구가 먼저입니다.",
        table: null,
        terms: [],
        traps: [],
        example: null,
      },
      {
        title: "배고픔의 생물학",
        subtitle: null,
        body:
          "시상하부(hypothalamus)는 뇌의 배고픔 통제 센터예요. 호르몬 그렐린(ghrelin, 위에서 분비)은 배고픔을 신호하고, 렙틴(leptin, 지방 세포에서 분비)은 포만감을 신호합니다. 또 몸은 설정점(set point) — 되돌아가려는 경향이 있는 체중 — 을 방어하는데, 다이어트가 그렇게 힘든 이유가 바로 이거예요.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "시상하부 (Hypothalamus)",
            def: "배고픔·갈증·체온을 조절하는 뇌 영역.",
          },
          {
            term: "그렐린 / 렙틴 (Ghrelin / Leptin)",
            def: "그렐린은 배고픔을, 렙틴은 포만감(satiety)을 신호한다.",
          },
          {
            term: "설정점 (Set point)",
            def: "변화에 저항하며 몸이 방어하려는 경향이 있는 체중.",
          },
        ],
        traps: [],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-psychology-u6-l2",
    courseId: "ap-psychology",
    subjectLabel: "AP Psychology",
    emoji: "🧠",
    unit: 6,
    lessonNum: 2,
    unitName: "Motivation and Emotion",
    title: "정서 — 이론과 표현",
    subtitle:
      "두려워서 심장이 뛰는 걸까, 심장이 뛰니까 두려운 걸까? 이론들은 '의도적으로' 서로 다르게 말합니다.",
    overview:
      "정서(emotion)는 세 재료가 섞인 거예요: 신체적 각성, 인지적 명명(label), 그리고 표현 행동. 그 유명한 이론들은 이 세 가지가 일어나는 '순서'를 두고 의견이 갈리는데 — 바로 그 순서가 시험에 나옵니다.",
    objectives: [
      "각성·인지·느낌의 순서로 주요 정서 이론들을 구별할 수 있다.",
      "정서에 관여하는 뇌와 신체 시스템을 식별할 수 있다.",
      "보편적 표정과 안면 피드백 가설을 설명할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "정서 이론 — 핵심은 '순서'다",
        subtitle: null,
        body:
          "각 이론은 각성·생각·느낌을 서로 다르게 배열해요. '곰을 본다'라는 하나의 상황으로 통일해서 외우면 헷갈리지 않습니다.",
        keyIdea:
          "제임스-랑게 = 몸이 먼저, '그다음' 느낌. 캐넌-바드 = 몸과 느낌이 '동시에'. 2요인 = 몸 + 명명.",
        table: {
          headers: ["이론", "사건 순서 (곰을 본다)"],
          rows: [
            [
              "제임스-랑게 (James-Lange)",
              "몸이 먼저 반응 → 그 각성을 두려움으로 해석한다",
            ],
            [
              "캐넌-바드 (Cannon-Bard)",
              "각성과 두려움이 동시에, 서로 독립적으로 일어난다",
            ],
            [
              "샥터-싱어 2요인 이론 (Schachter-Singer/two-factor)",
              "각성 + 인지적 '명명'이 함께 = 정서",
            ],
            [
              "라자루스 (Lazarus)",
              "평가(무의식적이라도)가 먼저, 그다음 정서가 온다",
            ],
          ],
        },
        terms: [],
        traps: [
          "2요인 이론의 핵심 주장: '똑같은' 각성도 어떻게 명명하느냐에 따라 다른 정서가 될 수 있다.",
        ],
        example: null,
      },
      {
        title: "정서의 몸과 뇌",
        subtitle: null,
        body:
          "정서는 자율신경계(autonomic nervous system) 위에서 돌아가요 — 교감신경 가지는 우리를 흥분시키고(투쟁-도피), 부교감신경 가지는 진정시킵니다. 편도체(amygdala)는 두려움의 중심이며, 사고를 담당하는 피질이 관여하기도 전에 빠른 '저속 경로(low road)'를 통해 반응을 촉발할 수 있어요.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "편도체 (Amygdala)",
            def: "두려움과 빠른 정서 반응의 중심이 되는 변연계 구조.",
          },
          {
            term: "교감신경계 (Sympathetic nervous system)",
            def: "투쟁-도피를 위해 몸을 각성시킨다.",
          },
        ],
        traps: [],
        example: null,
      },
      {
        title: "정서의 표현",
        subtitle: null,
        body:
          "폴 에크만(Paul Ekman)은 문화를 가로질러 표정이 인식되는 일련의 기본 정서를 발견했어요 — 이것들이 생물학적으로 보편적이라는 증거죠. 안면 피드백 가설(facial feedback hypothesis)은 여기에 반전을 더합니다: 표정이 거꾸로 느낌에 영향을 주어, 억지로 웃으면 실제로 기분이 살짝 위로 올라갈 수 있다는 거예요.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "보편적 정서 (Universal emotions)",
            def: "행복·두려움·분노 등 문화를 가로질러 인식되는 기본 표정 (에크만).",
          },
          {
            term: "안면 피드백 가설 (Facial feedback hypothesis)",
            def: "표정은 정서를 반영할 뿐 아니라 우리가 느끼는 정서에 영향을 준다.",
          },
        ],
        traps: [],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-psychology-u7-l1",
    courseId: "ap-psychology",
    subjectLabel: "AP Psychology",
    emoji: "🧠",
    unit: 7,
    lessonNum: 1,
    unitName: "Clinical Psychology",
    title: "심리 장애 — 분류와 진단",
    subtitle: "행동은 언제 '장애'가 되는가 — 그리고 임상가는 어떤 장애인지 어떻게 결정하는가?",
    overview:
      "심리 장애(psychological disorder)는 기능을 해치고(dysfunctional), 고통을 주며(distressing), 또는 규범에서 벗어난(deviant) 생각·감정·행동의 패턴이에요. 임상가는 DSM으로 장애를 분류하고, 점점 더 생물·심리·환경의 '상호작용'으로 장애를 설명합니다.",
    objectives: [
      "장애를 정의하는 기준과 DSM의 역할을 설명할 수 있다.",
      "의학 모델, 생물심리사회 모델, 소질-스트레스 모델을 비교할 수 있다.",
      "주요 장애 범주와 그 대표 증상을 인식할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "정의하고 진단하기",
        subtitle: null,
        body:
          "심리학자는 여러 기준을 따져요: 행동이 기능을 해치는가(일상생활을 방해하는가), 고통스러운가(본인에게), 또는 규범에서 벗어났는가(문화적 기준에서 멀리 떨어졌는가)? DSM은 장애와 그 진단 기준을 나열한 표준 매뉴얼로, 임상가들이 같은 명칭에 합의할 수 있게 해줍니다.",
        keyIdea:
          "규범 일탈만으로는 장애가 아니에요 — 맥락이 중요합니다. 고통 + 기능 손상이 더 무거운 기준이에요.",
        table: null,
        terms: [
          {
            term: "DSM",
            def: "정신질환 진단 및 통계 편람 — 장애를 분류하는 표준 체계.",
          },
          {
            term: "기능 손상 (Dysfunction)",
            def: "일상 기능을 방해하는 것 — 장애의 핵심 기준.",
          },
        ],
        traps: [],
        example: null,
      },
      {
        title: "장애의 모델들",
        subtitle: null,
        body:
          "의학 모델(medical model)은 장애를 신체적 원인과 치료가 있는 '질병'으로 봐요. 더 넓은 생물심리사회 모델(biopsychosocial model)은 생물·심리·사회 환경이 모두 기여한다고 말합니다. 소질-스트레스 모델(diathesis-stress model)은 특히 잘 출제되는데 — 소인(diathesis)이 충분한 스트레스로 촉발될 때에만 장애가 된다는 거예요.",
        keyIdea:
          "소질-스트레스: 취약성 + 스트레스 = 장애. 어느 한쪽만으로는 보통 부족합니다.",
        table: null,
        terms: [
          {
            term: "생물심리사회 모델 (Biopsychosocial model)",
            def: "장애는 상호작용하는 생물·심리·사회 요인에서 생긴다.",
          },
          {
            term: "소질-스트레스 모델 (Diathesis-stress model)",
            def: "소인이 환경적 스트레스에 의해 장애로 활성화된다.",
          },
        ],
        traps: [],
        example: null,
      },
      {
        title: "주요 범주 한눈에 보기",
        subtitle: null,
        body:
          "각 큰 범주의 대표 특징을 알아두세요 — 시험은 증상을 명칭에 짝지웁니다.",
        keyIdea: null,
        table: {
          headers: ["범주", "대표 특징"],
          rows: [
            [
              "불안 장애 (Anxiety disorders)",
              "과도한 두려움/걱정 (공포증, 범불안장애, 공황)",
            ],
            [
              "강박 장애 (OCD)",
              "침투적 강박사고 + 반복적 강박행동",
            ],
            [
              "우울 장애 (Depressive disorders)",
              "지속되는 슬픔, 흥미 상실",
            ],
            [
              "양극성 장애 (Bipolar disorder)",
              "조증과 우울이 번갈아 나타남",
            ],
            [
              "조현병 (Schizophrenia)",
              "환각·망상(양성 증상); 둔마된 정동·위축(음성 증상)",
            ],
          ],
        },
        terms: [],
        traps: [
          "조현병의 '양성' 증상은 비정상적인 무언가를 '더하는 것'(환각)이고, '음성' 증상은 정상 기능의 '부재'(둔마된 정동)예요.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-psychology-u7-l2",
    courseId: "ap-psychology",
    subjectLabel: "AP Psychology",
    emoji: "🧠",
    unit: 7,
    lessonNum: 2,
    unitName: "Clinical Psychology",
    title: "생의학적 치료",
    subtitle: "뇌 수준에서 장애를 치료하기 — 대부분 신경전달물질을 조절하는 약물로.",
    overview:
      "생의학적 치료(biomedical treatments)는 장애의 생물학을 겨냥해요 — 가장 흔하게는 약물로 신경전달물질 활동을 바꿉니다. 흔히 치료(therapy)와 병행되며, Unit 1–2에서 배운 신경전달물질로 곧장 연결돼요.",
    objectives: [
      "각 약물 계열을 그것이 치료하는 장애 및 겨냥하는 신경전달물질에 짝지을 수 있다.",
      "ECT와 그것이 사용되는 경우를 설명할 수 있다.",
      "지연성 운동장애 같은 부작용을 인식할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "약물 치료",
        subtitle: null,
        body:
          "대부분의 정신과 약물은 시냅스에서 작용해, 신경전달물질의 효과를 높이거나 낮춰요. 계열, 무엇을 치료하는지, 작용 기전을 각각 한 줄씩 알아두세요.",
        keyIdea:
          "SSRI는 효과가 나기까지 '몇 주'가 걸려요 — 뇌가 높아진 세로토닌에 서서히 적응하기 때문이지, 즉효약이 아닙니다.",
        table: {
          headers: ["약물 계열", "치료 대상", "작용 기전"],
          rows: [
            [
              "항우울제 (SSRIs)",
              "우울, 불안",
              "세로토닌 재흡수 차단 → 세로토닌 증가",
            ],
            [
              "항불안제 (Anti-anxiety)",
              "불안",
              "GABA 강화 → 신경 활동을 진정",
            ],
            [
              "항정신병약 (Antipsychotics)",
              "조현병",
              "도파민 차단 → 환각/망상 감소",
            ],
            [
              "기분 안정제 (리튬, lithium)",
              "양극성 장애",
              "조증과 우울을 고르게 함",
            ],
          ],
        },
        terms: [
          {
            term: "SSRI (선택적 세로토닌 재흡수 억제제)",
            def: "세로토닌을 높여 우울/불안을 치료하는 약물.",
          },
          {
            term: "지연성 운동장애 (Tardive dyskinesia)",
            def: "항정신병약을 장기 복용하면 생길 수 있는 불수의적 움직임.",
          },
        ],
        traps: [],
        example: null,
      },
      {
        title: "약물을 넘어서",
        subtitle: null,
        body:
          "전기경련요법(ECT)은 짧고 통제된 전류를 뇌에 보내 발작을 유도해요. 무서운 평판과 달리, 심하고 치료에 반응하지 않는 우울증에 대한 효과적인 '최후의 수단'입니다. 경두개 자기자극(TMS) 같은 더 새로운 선택지는 덜 침습적이에요. 정신외과 수술(예: 전두엽 절제술/lobotomy)은 사실상 쓰이지 않습니다.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "전기경련요법 (Electroconvulsive therapy, ECT)",
            def: "발작을 유도하는 짧은 전기 자극; 심하고 약물 저항성인 우울증에 사용.",
          },
          {
            term: "TMS (경두개 자기자극)",
            def: "우울증을 위한 비침습적 대안.",
          },
        ],
        traps: [],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-psychology-u7-l3",
    courseId: "ap-psychology",
    subjectLabel: "AP Psychology",
    emoji: "🧠",
    unit: 7,
    lessonNum: 3,
    unitName: "Clinical Psychology",
    title: "심리 치료 — CBT 그리고 그 너머",
    subtitle:
      "이미 배운 관점에서 각각 흘러나오는 대화 기반 치료들 — 그리고 그중 가장 증거가 탄탄한 하나(CBT).",
    overview:
      "주요 치료법은 각각 Unit 1의 어떤 관점에서 비롯돼요. 정신분석은 무의식을 파고들고, 인본주의 치료는 성장을 키우며, 행동 치료는 반응을 재훈련하고, 인지 치료는 왜곡된 생각을 고칩니다. 그리고 CBT는 뒤의 둘을 결합한 — 오늘날 가장 증거 기반이 탄탄한 접근이에요.",
    objectives: [
      "각 치료를 그 모태가 되는 관점과 핵심 방법에 짝지을 수 있다.",
      "핵심 행동·인지 기법을 설명할 수 있다.",
      "CBT가 왜 널리 쓰이는지 식별할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "학파별 치료법",
        subtitle: null,
        body:
          "시험은 '서술된 기법을 그 치료법에 짝짓는' 문제를 좋아해요. 각 기법을 그 관점에 단단히 고정해 두세요.",
        keyIdea:
          "CBT = 인지(생각을 고치고) + 행동(행동을 바꾸기). 가장 강력하게 뒷받침되는 대화 치료예요.",
        table: {
          headers: ["치료법", "유래한 관점", "핵심 방법"],
          rows: [
            [
              "정신분석 (Psychoanalysis)",
              "정신역동 (Psychodynamic)",
              "무의식적 갈등을 끌어올림 (자유연상, 꿈)",
            ],
            [
              "인간중심 (Person-centered)",
              "인본주의 (Humanistic)",
              "공감 & 무조건적 긍정적 존중 (로저스)",
            ],
            [
              "행동 치료 (Behavioral)",
              "행동주의 (Behavioral)",
              "반응을 재조건화 (노출, 둔감화)",
            ],
            [
              "인지 치료 (Cognitive)",
              "인지주의 (Cognitive)",
              "왜곡된 생각에 도전하고 바꿈",
            ],
            [
              "CBT",
              "인지 + 행동 (Cognitive + Behavioral)",
              "생각 '과' 행동을 둘 다 바꿈 — 가장 증거 기반",
            ],
          ],
        },
        terms: [],
        traps: [],
        example: null,
      },
      {
        title: "핵심 기법",
        subtitle: null,
        body:
          "행동 치료는 체계적 둔감화(두려운 대상에 점진적으로 노출시키며 이완을 짝짓는 것)와 노출 치료를 써서 조건화된 두려움을 소거해요. 인지 치료는 인지 재구조화를 써서 파국적 생각('나는 다 망할 거야')을 현실적인 생각으로 대체합니다.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "체계적 둔감화 (Systematic desensitization)",
            def: "두려움에 점진적으로 노출시키며 이완을 짝짓는 행동 기법.",
          },
          {
            term: "인지 재구조화 (Cognitive restructuring)",
            def: "왜곡되고 부적응적인 생각을 찾아내 대체하는 것.",
          },
          {
            term: "무조건적 긍정적 존중 (Unconditional positive regard)",
            def: "인간중심 치료에서 성장을 키우는 로저스의 비판단적 수용.",
          },
        ],
        traps: [
          "기법을 학파에 맞춰라: 자유연상 → 정신분석; 둔감화 → 행동 치료; 재구조화 → 인지 치료.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-psychology-u8-l1",
    courseId: "ap-psychology",
    subjectLabel: "AP Psychology",
    emoji: "🧠",
    unit: 8,
    lessonNum: 1,
    unitName: "Social Psychology",
    title: "사회적 영향 — 동조와 복종",
    subtitle: "성격만이 아니라 '상황'이 인간 행동의 많은 부분을 끌고 간다는 걸 보여준 고전 연구들.",
    overview:
      "사회심리학의 큰 교훈은 '상황의 힘'이에요: 평범한 사람도 사회적 압력 아래서 놀라운 일을 합니다. 애쉬(Asch)는 동조를, 밀그램(Milgram)은 복종을 드러냈고, 여러 집단 효과는 '타인 곁에 있는 것'이 어떻게 우리를 바꾸는지 보여줍니다.",
    objectives: [
      "규범적 사회 영향과 정보적 사회 영향을 구별할 수 있다.",
      "애쉬와 밀그램의 발견, 그리고 무엇이 동조/복종을 높이는지 요약할 수 있다.",
      "주요 집단 효과(집단사고·방관자 효과·사회적 태만)를 정의할 수 있다.",
    ],
    formulas: [],
    diagram: null,
    sections: [
      {
        title: "동조 — 애쉬 연구",
        subtitle: null,
        body:
          "애쉬(Asch)는 사람들에게 명백한 선의 길이를 판단하게 했어요. 그런데 짜고 친 사람들(공모자)이 소리 내어 틀린 답을 말하자, 많은 참가자가 집단의 틀린 답에 동조했습니다. 우리는 두 가지 이유로 동조하는데, 시험은 그 차이를 물어요.",
        keyIdea:
          "규범적 = 어울리려고(사회적 인정). 정보적 = 맞으려고(타인을 진실의 출처로 봄).",
        table: {
          headers: ["영향 유형", "우리가 동조하는 이유…", "결과"],
          rows: [
            [
              "규범적 (Normative)",
              "수용받고 싶고 / 거부를 피하고 싶어서",
              "속으로 동의하지 않아도 따라감",
            ],
            [
              "정보적 (Informational)",
              "타인이 더 잘 안다고 믿어서",
              "실제로 견해를 바꿈",
            ],
          ],
        },
        terms: [],
        traps: [],
        example: null,
      },
      {
        title: "복종 — 밀그램 연구",
        subtitle: null,
        body:
          "밀그램(Milgram)은 권위자가 시키자 평범한 사람들이 위험하다고 믿은 전기 충격을 가하는 걸 발견했어요. 복종은 권위자가 가까이 있고 정당해 보일 때, 피해자가 멀리 있을 때, 그리고 아무도 먼저 불복하지 않았을 때 높아졌습니다.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "복종 (Obedience)",
            def: "권위자의 직접적 명령을 따르는 것 (밀그램).",
          },
          {
            term: "문간에 발 들여놓기 (Foot-in-the-door)",
            def: "작은 요청에 동의하면 이후 더 큰 요청에 응할 가능성이 커짐 — 복종으로 가는 경로.",
          },
        ],
        traps: [
          "동조 = 또래/집단에 맞추는 것; 복종 = '권위자'의 명령을 따르는 것. 헷갈리지 마세요.",
        ],
        example: null,
      },
      {
        title: "집단 효과",
        subtitle: null,
        body:
          "집단 안에 있으면 행동이 예측 가능한 방식으로 바뀌고, 시험은 이를 상황에 짝지웁니다.",
        keyIdea:
          "기본적 귀인 오류(fundamental attribution error): 우리는 타인의 행동을 그 사람의 '성격' 탓으로 돌리고 상황을 과소평가해요 — 이 단원 전체의 주제입니다.",
        table: {
          headers: ["효과", "무슨 일이 일어나는가"],
          rows: [
            [
              "집단사고 (Groupthink)",
              "조화를 원하는 욕구가 반대를 억눌러 → 나쁜 결정",
            ],
            [
              "집단 극화 (Group polarization)",
              "집단 토론이 구성원의 초기 성향을 강화함",
            ],
            [
              "사회적 촉진 (Social facilitation)",
              "타인의 존재가 '쉬운' 과제의 수행을 높임",
            ],
            [
              "사회적 태만 (Social loafing)",
              "혼자일 때보다 집단에서 노력을 덜 들임",
            ],
            [
              "방관자 효과 (Bystander effect)",
              "타인이 있을 때 도울 가능성이 낮아짐 (책임 분산)",
            ],
          ],
        },
        terms: [],
        traps: [],
        example: null,
      },
    ],
  },
];
