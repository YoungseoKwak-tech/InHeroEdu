/**
 * Core Notes 한국어 스토리텔링 버전 — Honors English 9 Unit 4 (시와 연구 글쓰기 / Poetry & the Research Process).
 * 원본 내용 전량 보존(objectives·terms·traps·example) + 일타강사 내러티브.
 * 용어는 "한국어 (English)" 병기.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const HONORS_ENGLISH_9_U4_KO: CoreNote[] = [
  {
    lessonId: "honors-english-9-u4-l1",
    courseId: "honors-english-9",
    subjectLabel: "Honors English 9",
    emoji: "📖",
    unit: 4,
    lessonNum: 1,
    unitName: "시와 연구 글쓰기 (Poetry & the Research Process)",
    title: "시를 해부하다 — 형식·운율·음악 장치·비유 언어",
    subtitle: "시는 느끼는 것이 아니라 분석하는 것이다 — 감동은 분석 이후에 온다",
    overview:
      "시(poem)를 처음 접하면 많은 학생이 '느낌으로 이해'하려고 합니다. 하지만 Honors English 9의 시 단원에서 요구하는 것은 그 반대입니다 — 시인이 감정을 전달하기 위해 선택한 형식적 도구들을 분해하고 분석하는 능력. 시인은 줄 바꿈 하나, 음절의 강세 패턴 하나, 자음의 반복 하나를 모두 의도적으로 선택합니다. 운율 구조(meter), 각운(rhyme scheme), 두운(alliteration), 자음 반복(consonance), 모음 반복(assonance) — 이 음악적 장치들은 시를 '듣기 좋게' 만들기 위한 장식이 아니라, 의미를 강화하고 독자의 감각 반응을 조종하는 정교한 언어 기술입니다. 또한 시는 비유 언어(figurative language)의 집약체 — 은유(metaphor), 직유(simile), 의인화(personification), 대유법(synecdoche)이 산문보다 훨씬 압축된 공간에서 작동합니다. 이 수업에서는 시의 두 층위 — 형식의 음악성과 의미의 압축 — 를 동시에 읽는 훈련을 합니다. 시를 분석할 수 있게 되면, 그 이후의 감동은 훨씬 더 선명하고 깊어집니다.",
    objectives: [
      "시의 형식적 요소 — 연(stanza), 행(line), 음보(foot), 운율(meter), 각운 구조(rhyme scheme) — 를 식별하고, 그 선택이 시의 분위기와 의미에 어떤 영향을 미치는지 분석할 수 있다",
      "주요 음악 장치 — 두운(alliteration), 자음 반복(consonance), 모음 반복(assonance), 반복(repetition), 반향(echo) — 를 식별하고, 각 장치가 만들어내는 소리 효과와 감정적 효과를 설명할 수 있다",
      "비유 언어(figurative language)의 주요 유형 — 은유(metaphor), 직유(simile), 의인화(personification), 과장법(hyperbole), 역설(paradox) — 를 구별하고, 각각이 시의 주제를 어떻게 표현하는지 분석할 수 있다",
      "TP-CASTT 분석 틀(Title·Paraphrase·Connotation·Attitude·Shift·Title revisit·Theme)을 순서대로 적용하여 낯선 시를 체계적으로 독해하고 주제를 도출할 수 있다",
      "시인의 언어 선택(diction)과 어조(tone)가 독자의 반응 및 시의 주제적 의미를 어떻게 형성하는지 텍스트 증거와 함께 분석할 수 있다",
    ],
    sections: [
      {
        title: "시의 형식 — 운율·각운·음악 장치",
        subtitle: "시의 소리는 의미와 분리되지 않는다 — 어떻게 들리는가가 무엇을 말하는가다",
        terms: [
          {
            term: "약강5보격 (Iambic pentameter)",
            def: "영어 시에서 가장 흔히 사용되는 운율 형식. 약강(iamb: da-DUM)이 한 행에 5번 반복되어 총 10음절로 구성됩니다. 셰익스피어의 소네트와 극 대사, 존 키츠, 윌리엄 워즈워스의 낭만주의 시에서 두드러집니다. 중요한 것은 이 리듬이 자연스러운 영어 발화 패턴에 가까워 '이야기하는 듯한' 느낌을 주면서도 음악적 질서를 부여한다는 점 — 형식의 규칙성 자체가 메시지를 전달합니다. 규칙을 벗어나는 변주(variation)가 일어나는 행에서는 특별한 강조가 생깁니다.",
          },
          {
            term: "각운 구조 (Rhyme scheme)",
            def: "시의 각 연(stanza)에서 행 끝의 각운(end rhyme)이 배열되는 패턴. 알파벳으로 표기합니다 — 같은 글자는 같은 각운 소리를 공유하는 행. 예: ABAB = 1·3행 각운, 2·4행 각운. AABB = 이행연속각운(rhyming couplets). ABCABC = 페트라르카 소네트의 주요 각운 구조. 각운 구조가 없는 자유시(free verse)와 구별하세요. 각운 구조의 변화나 이탈은 시의 정서적 전환(shift)을 표시하는 신호일 수 있습니다.",
          },
          {
            term: "두운·자음 반복·모음 반복 (Alliteration / Consonance / Assonance)",
            def: "세 가지 음악 장치를 구별해야 합니다. 두운(alliteration): 인접한 단어들의 첫 자음 소리 반복 — 'Peter Piper picked.' 자음 반복(consonance): 단어 중간이나 끝의 자음 소리 반복 — 'the lumpy, bumpy road.' 모음 반복(assonance): 인접한 단어들의 모음 소리 반복 — 'the rain in Spain stays mainly.' 두운은 에너지·박동감을, 모음 반복은 멜랑꼴리·부드러움을, 거친 자음 반복(k, g, p)은 긴장·충격을 만드는 경향이 있습니다. 소리가 의미를 지원(sound supports sense)하는 방식을 분석하세요.",
          },
          {
            term: "어조와 어휘 선택 (Tone / Diction)",
            def: "어조(tone)는 시의 주제나 대상을 향한 시인의 태도 — 경건함, 분노, 아이러니, 슬픔, 경이로움 등. 어조는 직접 진술되지 않고 어휘 선택(diction)·이미지·형식적 선택을 통해 전달됩니다. 어휘 선택(diction)은 단순히 '사용된 단어'가 아니라 그 단어의 함의(connotation) — 사전적 의미(denotation)를 넘어선 감정적·문화적 연상 — 를 포함합니다. 예: 'walked(걸었다)'와 'trudged(터벅터벅 걸었다)'는 같은 행동이지만 전혀 다른 어조를 만듭니다.",
          },
        ],
        traps: [
          "두운(alliteration)을 '같은 철자로 시작하는 단어 반복'으로 외우는 학생이 많은데, 정확하게는 '같은 소리(sound)로 시작하는 단어 반복'입니다. 'knight'와 'night'는 철자는 다르지만 같은 소리로 시작하므로 두운이 성립합니다. 반대로 'ceremony'와 'city'는 같은 철자 c로 시작하지만 소리가 다르므로 두운이 아닙니다. 시험에서 소리를 기준으로 판단하세요.",
          "각운 구조 분석에서 각운 패턴 이름만 적고 끝내면 Honors 수준의 분석이 아닙니다. '이 시의 각운 구조는 ABAB이다' — 식별은 분석의 시작일 뿐입니다. 반드시 이어서 '이 규칙적인 ABAB 패턴이 3연에서 갑자기 ABCC로 변하는데, 이 이탈이 정서적 전환(shift)과 어떻게 일치하는가'를 분석해야 Honors 수준입니다.",
        ],
        example:
          "로버트 프로스트(Robert Frost)의 'The Road Not Taken'에서 형식 분석을 연습해봅시다. 각운 구조: ABAAB — 각 연이 5행으로 구성되며, 1·3·4행이 각운을 공유하고 2·5행이 각운을 공유합니다. 이 촘촘한 각운 구조는 화자가 '막힘없이 논리적으로 자신의 선택을 정당화하려는 시도'처럼 들리게 합니다. 어조·어휘 선택 분석: 'I took the one less traveled by(나는 덜 다닌 길을 택했다)' — 'less traveled(덜 다닌)'의 함의(connotation)는 개성·용기·독립성입니다. 그러나 앞선 연에서 화자는 사실 두 길이 거의 비슷했다('Though as for that the passing there / Had worn them really about the same')고 말합니다. 이 어조의 아이러니 — 화자가 사후에 자신의 선택을 특별하게 서술하는 방식 — 가 시의 핵심 주제(우리는 선택에 의미를 사후 부여한다)를 전달합니다.",
      },
      {
        title: "TP-CASTT — 낯선 시를 체계적으로 독해하는 분석 틀",
        subtitle: "시험장에서 처음 보는 시 앞에서 얼어붙지 않으려면, 틀이 필요하다",
        terms: [
          {
            term: "TP-CASTT 분석 틀 (TP-CASTT analysis)",
            def: "시를 체계적으로 읽고 분석하기 위한 7단계 틀. T(Title 제목): 시를 읽기 전 제목만 보고 예측. P(Paraphrase 바꿔 말하기): 각 행을 현대 산문으로 바꿔 표면적 의미 파악. C(Connotation 함의): 비유 언어·음악 장치·어휘 선택이 만드는 감정적·연상적 의미 분석. A(Attitude 태도/어조): 시인과 화자의 주제·대상에 대한 태도 식별. S(Shift 전환): 어조·이미지·관점이 바뀌는 전환점 위치 표시. T(Title revisit 제목 재검토): 시 전체를 읽은 후 제목의 심층 의미 재해석. T(Theme 주제): 시 전체가 인간 경험에 대해 말하는 보편적 메시지를 완전한 문장으로 진술. TP-CASTT는 순서가 중요합니다 — 함의(C) 분석 전에 반드시 바꿔 말하기(P)가 선행해야 합니다.",
          },
          {
            term: "시적 전환 (Shift / Volta)",
            def: "시 안에서 어조, 이미지, 화자의 관점이 눈에 띄게 변화하는 지점. 이탈리아어 volta(전환)에서 유래. 소네트에서는 9행 또는 13행 시작 부분에서 전형적으로 발생합니다(Petrarchan volta, Shakespearean couplet shift). 전환은 종종 'but(하지만)', 'yet(그럼에도)', 'however(그러나)', 'suddenly(갑자기)'와 같은 단어로 신호됩니다. 전환 이전과 이후의 어조·이미지·의미를 대조 분석하는 것이 TP-CASTT에서 가장 높은 수준의 분석 단계입니다.",
          },
          {
            term: "함의와 지시적 의미 (Connotation / Denotation)",
            def: "지시적 의미(denotation)는 단어의 사전적·문자적 정의. 함의(connotation)는 그 단어가 사회적·문화적·감정적으로 연상시키는 의미의 층위. 예: 'home'과 'house'는 지시적 의미가 같지만 함의가 다릅니다 — 'home'은 따뜻함·귀속감·가족을, 'house'는 건축 구조물이라는 중립적 의미를 연상시킵니다. 시인은 단어의 지시적 의미와 함의 모두를 의도적으로 선택합니다. 함의 분석이 TP-CASTT C 단계의 핵심입니다.",
          },
        ],
        traps: [
          "TP-CASTT에서 P(Paraphrase 바꿔 말하기) 단계를 건너뛰고 바로 C(Connotation 함의)나 T(Theme 주제)로 가는 학생들이 많습니다. 이것은 매우 위험한 습관입니다. 시의 표면적 의미(literal meaning)를 정확히 파악하지 않은 상태에서 함의와 주제를 분석하면, 엉뚱한 방향으로 해석이 흘러갑니다. 특히 고어·비유 표현이 많은 시에서 P 단계를 소홀히 하면 A(Attitude)와 T(Theme)가 완전히 틀릴 수 있습니다.",
        ],
        example:
          "에밀리 디킨슨(Emily Dickinson)의 'Because I could not stop for Death'에 TP-CASTT를 적용합니다. T(제목): '죽음을 위해 멈출 수 없었기 때문에' — 죽음이 외부 존재이며 화자는 바쁘다는 예측. P(바꿔 말하기): 죽음이 마차를 몰고 나타나 화자를 태우고 여행을 떠납니다. 학교, 들판, 지는 해를 지나 서늘해집니다. 마지막으로 언덕 위 땅처럼 생긴 장소(무덤)에 멈춥니다. C(함의): 'Immortality(불멸)'가 마차에 동승 — 죽음이 끝이 아님을 암시. 'Civility(예의 바름)'는 죽음의 의인화(personification) — 죽음을 젠틀한 신사로 표현하여 공포 대신 차분한 수용을 유도. S(전환): 5연 — 갑자기 차가워지고 빛이 사라짐 — 육체의 죽음 순간을 표시하는 감각적 전환. T(주제): 죽음은 공포의 대상이 아니라 삶의 자연스러운 여행의 완성이며, 불멸로 이어지는 통로다.",
      },
    ],
  },
  {
    lessonId: "honors-english-9-u4-l2",
    courseId: "honors-english-9",
    subjectLabel: "Honors English 9",
    emoji: "📖",
    unit: 4,
    lessonNum: 2,
    unitName: "시와 연구 글쓰기 (Poetry & the Research Process)",
    title: "연구 과정과 정보 리터러시 — 출처 평가·인용·표절 방지",
    subtitle: "인터넷에 있는 모든 것이 출처가 되는 건 아니다 — 연구는 구글 검색이 아니다",
    overview:
      "연구 에세이(research essay)를 처음 쓰는 학생들이 저지르는 가장 흔한 실수는 두 가지입니다 — 첫 번째는 구글에서 나온 첫 번째 페이지를 그대로 옮겨 쓰는 것(표절), 두 번째는 'Wikipedia라서 쓰면 안 된다'는 것만 알고 그 이유를 모르는 것(출처 평가 능력 부재). Honors English 9의 연구 단원은 단순히 'MLA 인용 형식을 외워라'가 아닙니다 — 학문적 정직성(academic integrity)의 토대 위에서, 신뢰할 수 있는 정보를 선별하고, 다른 사람의 아이디어와 나의 아이디어의 경계를 명확히 하고, 그 경계를 인용으로 표시하는 능력을 기르는 것입니다. 표절(plagiarism)과 인용(citation)은 단순히 규칙의 문제가 아니라 지적 정직성(intellectual honesty)의 문제입니다 — 다른 사람의 생각을 내 것인 양 발표하는 것은 그 사람의 지적 노동을 훔치는 행위입니다. 이 수업에서는 출처를 평가하는 기준, 직접 인용과 바꿔 말하기의 기술, MLA 인텍스트 인용 형식을 체계적으로 익힙니다.",
    objectives: [
      "CRAAP 테스트(Currency·Relevance·Authority·Accuracy·Purpose) 또는 동등한 기준을 적용하여 인터넷·인쇄 출처의 신뢰성과 적합성을 평가할 수 있다",
      "표절(plagiarism)의 정의와 유형 — 직접 표절, 모자이크 표절(patchwriting), 자기 표절, 부적절한 바꿔 말하기 — 을 설명하고, 각 유형을 구별하는 예시를 제시할 수 있다",
      "직접 인용(direct quotation)과 바꿔 말하기(paraphrase)의 차이를 설명하고, 원문의 의미를 보존하면서 어휘와 문장 구조를 모두 바꾸는 올바른 바꿔 말하기를 작성할 수 있다",
      "MLA 형식(8판 이상 기준)의 인텍스트 인용(in-text citation)을 직접 인용·바꿔 말하기·요약 상황 각각에 적절히 적용할 수 있다",
      "출처의 신뢰도와 편향(bias)을 동시에 평가하여 연구 목적에 맞는 출처를 선별하고, 선별 이유를 설명할 수 있다",
    ],
    sections: [
      {
        title: "출처 평가와 정보 리터러시",
        subtitle: "신뢰할 수 있는 출처를 판별하는 것은 연구의 기초이자 시민 지성의 조건이다",
        terms: [
          {
            term: "CRAAP 테스트 (CRAAP Test)",
            def: "출처의 신뢰성과 적합성을 평가하는 5가지 기준의 두문자어. C(Currency 최신성): 정보가 얼마나 최근 것인가 — 과학·의학·법률 분야는 5년 이상 된 자료는 신중하게 검토 필요. R(Relevance 관련성): 이 출처가 내 연구 질문에 직접적으로 답하는가. A(Authority 권위): 저자·출판 기관이 해당 분야에서 자격이 있는가 — 학술지·정부 기관·동료 심사 자료(peer-reviewed)는 높은 권위. A(Accuracy 정확성): 정보가 증거로 뒷받침되는가, 다른 신뢰할 수 있는 출처와 일치하는가. P(Purpose 목적): 이 정보가 왜 만들어졌는가 — 교육·정보 제공 vs. 설득·광고·선동. CRAAP 테스트는 Wikipedia를 무조건 배제하는 것이 아니라 '왜 적절하거나 부적절한가'를 설명하는 도구입니다.",
          },
          {
            term: "동료 심사 출처 (Peer-reviewed source)",
            def: "출판 전에 같은 분야의 전문가들(peers)이 내용을 검토하고 검증한 학술 자료. 학술지 논문(journal article), 학술 서적(academic book), 학술 보고서가 주요 유형. 학교 도서관 데이터베이스(JSTOR, EBSCOhost, Google Scholar)를 통해 접근 가능. 동료 심사 출처는 블로그·뉴스 기사·개인 웹사이트보다 권위가 높지만, 그렇다고 무조건 옳은 것은 아닙니다 — 여전히 Accuracy와 Purpose 기준으로 평가해야 합니다.",
          },
          {
            term: "편향 (Bias)",
            def: "출처가 특정 관점·이해관계·이념을 지지하는 방향으로 정보를 선택·강조·해석하는 성향. 모든 출처는 어느 정도의 편향을 가집니다 — 편향이 없는 완벽한 중립 출처는 존재하지 않습니다. 중요한 것은 편향의 존재 여부가 아니라 편향이 연구 목적에 영향을 미치는지 인식하는 것입니다. 편향 감지 방법: 로드된 언어(loaded language: 감정적으로 편향된 단어 선택), 반대 관점 무시, 출처 생략, 자금 출처 확인.",
          },
        ],
        traps: [
          "CRAAP 테스트의 A(Authority 권위) 기준을 '유명한 사람 또는 기관이면 권위가 있다'로 해석하는 함정이 있습니다. 권위는 해당 분야에서의 전문성(domain expertise)을 의미합니다 — 유명 연예인이 건강에 대해 말한다고 해서 의학적 권위가 생기는 것이 아닙니다. 연구 주제와 관련된 전문 교육·경험·학술 출판 이력이 권위의 기준입니다.",
          "Wikipedia가 '신뢰할 수 없다'는 것을 알지만 왜 그런지 설명하지 못하는 학생이 많습니다. Wikipedia는 누구나 편집할 수 있어 Authority(권위)와 Accuracy(정확성) 기준에서 불안정합니다. 단, Wikipedia의 각주와 참고문헌 목록은 신뢰할 수 있는 1차·2차 출처를 찾는 출발점(jumping-off point)으로 활용할 수 있습니다 — Wikipedia 자체를 인용하는 것이 문제이지, Wikipedia를 출처 탐색의 도구로 쓰는 것은 허용됩니다.",
        ],
        example:
          "기후 변화를 주제로 연구 에세이를 쓴다고 가정하고 두 출처를 CRAAP 테스트로 비교합니다. 출처 A: NASA 기후 변화 공식 웹사이트(climate.nasa.gov) — C(최신성): 정기적으로 업데이트됨 ✓. R(관련성): 기후 데이터 직접 제공 ✓. A(권위): 정부 과학 기관, 전문 과학자 저자 ✓. A(정확성): 동료 심사 연구에 기반 ✓. P(목적): 과학적 정보 제공 ✓. 출처 B: 익명 블로그 '기후 변화는 거짓말이다' — C: 날짜 불명확 ✗. A(권위): 저자 신원 불명 ✗. A(정확성): 인용 출처 없음 ✗. P(목적): 특정 정치적 의견 선동 ✗. CRAAP 테스트는 '어떤 출처를 써야 하는가'를 직관이 아닌 기준으로 판단하게 해줍니다.",
      },
      {
        title: "표절·직접 인용·바꿔 말하기·MLA 인텍스트 인용",
        subtitle: "다른 사람의 말을 빌릴 때는 항상 그 사람의 이름표를 붙여야 한다",
        terms: [
          {
            term: "표절 (Plagiarism)",
            def: "다른 사람의 말·아이디어·연구 결과를 출처 표시 없이 마치 자신의 것인 양 제출하는 학문적 부정 행위. 표절의 유형: ① 직접 표절(direct plagiarism): 원문을 그대로 복사 붙여넣기. ② 모자이크 표절 또는 패치라이팅(patchwriting): 원문의 단어를 몇 개만 바꾸고 문장 구조는 그대로 유지하는 것 — 가장 흔하고 학생들이 '표절이 아니다'라고 착각하는 유형. ③ 부적절한 바꿔 말하기: 어휘는 바꿨지만 문장 구조가 원문과 동일한 경우. ④ 자기 표절(self-plagiarism): 이전에 다른 수업에서 제출한 자신의 글을 인용 없이 재사용. 의도 여부와 상관없이 표절은 학문적 정직성 위반입니다.",
          },
          {
            term: "직접 인용 vs. 바꿔 말하기 (Direct quotation / Paraphrase)",
            def: "직접 인용(direct quotation): 원문의 말을 정확히 그대로 가져오는 것. 반드시 큰따옴표로 묶고 출처를 인용해야 합니다. 3행 이상의 긴 인용은 블록 인용(block quote) 형식 사용. 바꿔 말하기(paraphrase): 원문의 아이디어를 자신의 언어로, 자신의 문장 구조로 표현하는 것. 단어 몇 개만 동의어로 바꾸는 것은 바꿔 말하기가 아닙니다 — 원문을 완전히 이해한 뒤 원문을 보지 않고 새로 쓰는 것이 올바른 바꿔 말하기입니다. 바꿔 말하기도 인텍스트 인용이 필요합니다 — 아이디어의 출처는 표시해야 합니다.",
          },
          {
            term: "MLA 인텍스트 인용 (MLA in-text citation)",
            def: "현대어문학회(Modern Language Association) 형식에 따른 본문 내 출처 표시. 기본 형식: (저자 성 페이지번호) — 예: (Smith 45). 저자 이름이 문장에서 이미 언급된 경우: (45)만 표기. 페이지 번호가 없는 웹 자료: (저자 성)만 표기. 저자 없는 경우: 제목 또는 약어 표기. 인텍스트 인용은 Works Cited의 첫 번째 항목(저자 또는 제목)과 반드시 일치해야 합니다. 인텍스트 인용의 마침표는 괄호 뒤에 옵니다 — '...' (Smith 45).",
          },
        ],
        traps: [
          "가장 흔한 바꿔 말하기 실수는 패치라이팅(patchwriting)입니다 — 원문 문장에서 몇 단어만 동의어로 교체하는 것. 예: 원문 'The majority of teenagers experience significant stress during exam periods.' 패치라이팅 오류: 'Most adolescents experience considerable stress during testing periods.' — 이것은 표절입니다. 올바른 바꿔 말하기: 원문을 읽고 덮은 뒤 핵심 아이디어를 완전히 새로운 문장 구조로 씁니다: 'Exams create notable pressure for most students in their teenage years.' 문장 구조가 달라야 하고, 어휘가 달라야 합니다.",
        ],
        example:
          "바꿔 말하기 + MLA 인텍스트 인용 실전 예시. 원문(Johnson, 2021, p.33): 'Poetry allows teenagers to process emotions that they lack the vocabulary to articulate in ordinary conversation.' 잘못된 바꿔 말하기(패치라이팅): 'Poetry permits teenagers to process feelings that they lack the words to express in regular talk (Johnson 33).' — 문장 구조가 원문과 동일하므로 표절. 올바른 바꿔 말하기: 'According to Johnson, young people often turn to poetry as a way of making sense of emotions too complex to express through everyday language (33).' — 어휘와 문장 구조가 모두 바뀌었고, 저자 이름이 도입 문장에 포함되어 (33)만으로 인텍스트 인용이 완성됩니다.",
      },
    ],
  },
  {
    lessonId: "honors-english-9-u4-l3",
    courseId: "honors-english-9",
    subjectLabel: "Honors English 9",
    emoji: "📖",
    unit: 4,
    lessonNum: 3,
    unitName: "시와 연구 글쓰기 (Poetry & the Research Process)",
    title: "연구 에세이 합성 쓰기 — 연구 질문·다중 출처 통합·Works Cited",
    subtitle: "연구 에세이는 자료를 모으는 것이 아니라 자료로 주장을 구축하는 것이다",
    overview:
      "연구 에세이(research essay)의 가장 큰 오해는 이것입니다 — '자료를 많이 찾아서 잘 정리하면 된다.' 틀렸습니다. 연구 에세이는 자료 보관함(repository)이 아니라 주장(argument)입니다. 당신이 가진 연구 질문(research question)에 대해 당신 자신의 답을 제시하고, 여러 출처에서 온 증거들이 그 답을 어떻게 지지하는지를 논증하는 글입니다. 좋은 연구 에세이의 출처들은 단순히 나열되는 것이 아니라 대화를 나눕니다 — 출처 A의 주장과 출처 B의 주장이 서로 어떻게 맞닿고, 어떻게 부딪히고, 어떻게 종합되는지를 당신의 thesis가 조율합니다. 이것이 합성(synthesis)의 의미입니다. Honors English 9 연구 에세이 단원의 마지막 수업에서는 탐색 가능한 연구 질문 만들기, 출처에서 증거를 통합하는 심층 합성 기술, 그리고 Works Cited 페이지 완성까지 연구 에세이의 전체 사이클을 완성합니다.",
    objectives: [
      "좋은 연구 질문(research question)의 조건 — 탐색 가능성(researchable), 범위의 적절성(scope), 논쟁 가능성(arguable) — 을 설명하고, 주어진 주제에서 Honors 수준의 연구 질문을 작성할 수 있다",
      "세 개 이상의 출처에서 온 증거를 단순 나열이 아닌 합성(synthesis)으로 통합하여, 단일 출처 인용을 넘어선 다중 출처 논증 단락을 작성할 수 있다",
      "연구 에세이 thesis와 본문 단락이 연구 질문에 직접 응답하는 방식으로 설계되어 있는지 평가하고, 논증의 일관성과 흐름을 유지할 수 있다",
      "MLA 형식(8판 이상)에 따라 웹사이트·책·학술지 논문·신문 기사를 포함하는 Works Cited 항목을 올바르게 작성하고 알파벳 순으로 정렬할 수 있다",
      "연구 에세이 작성 과정 — 연구 질문 → 출처 탐색 → 노트 정리 → outline → 초고 → 수정 → 인용 검토 → 최종본 — 을 단계별로 설명하고 각 단계의 목적을 이해할 수 있다",
    ],
    sections: [
      {
        title: "연구 질문과 합성 thesis",
        subtitle: "연구는 답을 찾는 것이 아니라 더 나은 질문을 만드는 과정이다",
        terms: [
          {
            term: "연구 질문 (Research question)",
            def: "연구 에세이 전체를 이끄는 핵심 질문. 좋은 연구 질문은 세 가지 조건을 충족해야 합니다. ① 탐색 가능성(researchable): 단순한 사실 확인으로 답할 수 없고, 여러 출처에서 증거를 모아야 답할 수 있는 질문. ② 범위의 적절성(appropriate scope): 너무 넓어서 에세이 분량으로 다루기 불가능하거나 너무 좁아서 연구가 필요 없을 정도로 자명한 질문은 안 됩니다. ③ 논쟁 가능성(arguable): 연구를 통해 하나의 논증 가능한 답을 구축할 수 있어야 합니다. 예: 약한 질문 = '셰익스피어는 언제 태어났는가?' (사실 확인). 강한 질문 = '소셜 미디어가 청소년의 공감 능력에 미치는 영향은 긍정적인가, 부정적인가?'",
          },
          {
            term: "합성 thesis (Synthesis thesis)",
            def: "두 개 이상의 출처에서 온 정보를 통합하여 도출한 논증 가능한 주장. 단일 출처의 요약이 아니라, 여러 출처들이 공통적으로 지지하거나 서로 긴장 관계에 있는 아이디어를 종합하여 작성자 자신의 답을 만드는 것입니다. 합성 thesis의 구조: [연구 질문에 대한 답] + [이를 뒷받침하는 주요 논점 2–3개 예고]. 예: '소셜 미디어는 단기적으로 청소년의 공감 반응 패턴을 표면화하지만, 심리학·신경과학·교육학 연구를 종합하면 지속적 노출이 깊은 공감 능력(deep empathy)의 발달을 저해한다는 수렴적 증거가 있다.'",
          },
          {
            term: "출처 통합의 심층 합성 (Deep synthesis of sources)",
            def: "여러 출처를 단순 나열(listing)이 아닌 대화(conversation)로 연결하는 기술. 단순 나열: '출처 A는 X라고 말한다. 출처 B는 Y라고 말한다. 출처 C는 Z라고 말한다.' 심층 합성: '출처 A의 X 주장은 출처 B의 Y 발견에 의해 뒷받침되며, 반면 출처 C는 이 합의에 도전하는 Z를 제시한다 — 이 긴장은 [나의 thesis 포지션]이 왜 더 설명력이 있는지를 드러낸다.' 합성 에세이에서 각 단락은 자신의 비교 논점(point of synthesis)을 가져야 하며, 그 논점이 여러 출처를 동시에 끌어들여야 합니다.",
          },
          {
            term: "Works Cited (인용 문헌 목록)",
            def: "에세이에서 인용하거나 바꿔 말하기한 모든 출처를 MLA 형식으로 알파벳 순(저자 성 기준)으로 정렬한 참고문헌 목록. 에세이의 마지막 별도 페이지에 위치. 기본 MLA 8판 이상 항목 구조: 저자. 제목. 출판 정보(출판사·연도·URL·DOI). 각 항목은 내어쓰기(hanging indent) 형식 — 첫 줄은 왼쪽 정렬, 둘째 줄부터 0.5인치 들여쓰기. Works Cited는 에세이에서 실제 인용한 출처만 포함합니다 — 읽었지만 인용하지 않은 출처는 포함하지 않습니다(그것은 Bibliography).",
          },
        ],
        traps: [
          "연구 질문을 '예/아니오'로만 답할 수 있는 질문으로 설정하는 실수가 흔합니다. '소셜 미디어는 청소년에게 나쁜가?'는 단일 예/아니오 답변을 유도하며, 연구 에세이로 발전하기 어렵습니다. 좋은 연구 질문은 '어떻게(how)', '왜(why)', '어떤 조건에서(under what conditions)', '어떤 정도로(to what extent)'로 시작하여 복잡한 논증의 여지를 만들어야 합니다.",
          "Works Cited에서 에세이에서 한 번도 인용하지 않은 출처를 '찾아봤으니까'라는 이유로 포함하는 것은 MLA 규칙 위반입니다. Works Cited = 실제 인용한 출처 목록. Bibliography = 모든 참고 자료 목록. 수업에서 어떤 형식을 요구하는지 먼저 확인하고, MLA를 요구한다면 Works Cited에는 반드시 에세이 본문에서 인텍스트 인용이 존재하는 출처만 포함해야 합니다.",
        ],
        example:
          "합성 단락 구성 실전 예시. 연구 질문: '시는 청소년의 감정 조절 능력 발달에 어떤 역할을 하는가?' 단순 나열(오류): '존슨(2021)은 시가 감정 표현을 돕는다고 말한다. 리(2019)는 시 쓰기가 스트레스를 낮춘다고 발견했다. 박(2022)은 시 읽기가 공감 능력을 높인다고 주장한다.' 심층 합성(올바른 방식): '존슨(2021)의 질적 연구는 시가 청소년이 일상 언어로 표현하기 어려운 감정을 처리하는 데 도움을 준다고 제안하며, 이는 리(2019)의 실험 결과 — 주 3회 시 쓰기를 8주간 실천한 참여자들의 코르티솔 수치 감소 — 에 의해 신경생물학적으로 뒷받침된다. 박(2022)은 이 논의를 수용 방향으로 확장하여, 시를 쓰는 것뿐 아니라 읽는 행위 자체도 타인의 감정 경험을 시뮬레이션하는 공감 능력을 활성화함을 보여준다. 이 세 출처를 종합하면, 시는 생산과 수용 양쪽에서 청소년의 정서적 역량을 강화하는 복합적 도구임이 드러난다.' — 각 출처가 이전 출처를 '쌓아 올리며' 하나의 통합된 논점을 형성합니다.",
      },
      {
        title: "MLA Works Cited 완성과 연구 에세이 과정 전체",
        subtitle: "마지막 Works Cited 한 줄까지 에세이다 — 형식이 신뢰를 만든다",
        terms: [
          {
            term: "MLA 웹사이트·책·학술지 논문 항목 형식",
            def: "세 가지 주요 출처 유형의 MLA 8판 이상 항목 형식. 웹사이트: 저자 성, 이름. '페이지 제목.' 사이트 이름, 날짜, URL. 예: 'Doe, Jane. \"Climate Data Overview.\" NASA Climate, 15 Mar. 2023, climate.nasa.gov/data.' 책: 저자 성, 이름. 『책 제목』. 출판사, 연도. 예: 'Smith, John. The Poetry of Grief. Penguin, 2020.' 학술지 논문: 저자 성, 이름. '\"논문 제목.\"' 학술지 이름, 권(호), 연도, 페이지 범위. 예: 'Lee, Sarah. \"Poetry and Adolescent Emotion.\" Journal of Educational Psychology, vol. 45, no. 2, 2021, pp. 112–130.' 이탤릭체는 책과 학술지 이름에, 따옴표는 논문 제목과 웹페이지 제목에 사용합니다.",
          },
          {
            term: "연구 에세이 작성 과정 (Research writing process)",
            def: "연구 에세이는 선형적이 아닌 반복적(recursive) 과정입니다. ① 연구 질문 설정 → ② 예비 탐색(preliminary research: 주제 파악, 관련 용어 학습) → ③ 심층 출처 탐색(targeted research: CRAAP 테스트로 출처 선별) → ④ 노트 정리(annotated notes: 출처별 인텍스트 인용 정보와 함께 기록) → ⑤ thesis와 outline 작성 → ⑥ 초고(drafting) → ⑦ 합성·논증 점검(revision: 출처가 나열이 아닌 합성인지 확인) → ⑧ 인용·형식 검토(proofreading: 모든 인텍스트 인용이 Works Cited와 일치하는지 확인) → ⑨ 최종본 제출. 가장 많은 시간이 필요한 단계는 ④ 노트 정리와 ⑦ 합성 점검입니다.",
          },
        ],
        traps: [
          "인텍스트 인용과 Works Cited의 첫 항목이 일치하지 않는 오류가 매우 흔합니다. 예: 인텍스트 인용은 (NASA 2)인데 Works Cited에는 저자 이름으로 시작하는 항목이 있는 경우. MLA에서 인텍스트 인용의 첫 단어는 Works Cited 해당 항목의 첫 단어(보통 저자 성, 저자 없는 경우 제목)와 반드시 일치해야 합니다. 에세이 완성 후 제출 전에 모든 인텍스트 인용을 Works Cited와 대조 확인하는 습관을 만드세요.",
        ],
        example:
          "Works Cited 페이지 완성 예시(혼합 출처 유형). 주제: 소셜 미디어와 청소년 공감 능력. Works Cited\n\nJohnson, Maria. \"Poetry as Emotional Processing in Adolescents.\" Journal of Adolescent Health, vol. 68, no. 4, 2021, pp. 30–38.\n\nLee, James, and Susan Park. The Empathy Gap: Social Media and Teen Development. Oxford University Press, 2019.\n\nSmith, Karen. \"Screen Time and Empathy.\" American Psychological Association, 12 Jan. 2022, www.apa.org/screen-time-empathy.\n\n알파벳 순(J → L → S) 정렬 ✓. 내어쓰기(hanging indent) 형식 ✓. 책은 이탤릭체, 논문·웹페이지 제목은 따옴표 ✓. 두 저자의 경우: 첫 번째 저자만 성·이름 역순, 두 번째 저자는 정순(Lee, James, and Susan Park) ✓.",
      },
    ],
  },
];
