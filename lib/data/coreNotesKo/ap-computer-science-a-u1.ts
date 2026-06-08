/**
 * Core Notes 한국어 일타강사 버전 — AP Computer Science A Unit 1 (1.1–1.4).
 * 원본 구조 전량 보존(overview·body·keyIdea·table·terms·traps·example·formulas 포함).
 * 코딩 과목 — Java 코드/키워드/식별자/연산자/타입명은 영어·코드 그대로, 설명 산문만 한국어.
 * 용어는 "한국어 (English)" 병기.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const AP_COMPUTER_SCIENCE_A_U1_KO: CoreNote[] = [
  {
    lessonId: "ap-computer-science-a-u1-l1",
    courseId: "ap-computer-science-a",
    subjectLabel: "AP Computer Science A",
    emoji: "💻",
    unit: 1,
    lessonNum: 1,
    unitName: "Primitive Types",
    title: "변수, 데이터 타입, 그리고 리터럴",
    subtitle: null,
    overview: null,
    objectives: [
      "변수 선언(declaration)과 초기화(initialization)",
    ],
    formulas: [
      "7/2==3 (int division)",
      "13%4==1",
      "(double)5/2==2.5",
    ],
    diagram: null,
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "int, double, boolean, char",
            def: "저장 방식과 표현 범위 (storage and range)",
          },
          {
            term: "리터럴 문법 (Literal syntax)",
            def: "1 vs 1.0 vs true vs 'a' — 같은 값처럼 보여도 타입이 다릅니다.",
          },
        ],
        traps: [
          "캐스팅 없이 double을 int에 대입하기 — int x = 3.7 은 컴파일 에러입니다. 반드시 캐스팅해야 해요: int x = (int)3.7 은 3 을 줍니다(반올림이 아니라 소수부를 버리는 '절단'). AP는 이 암묵적(implicit) vs 명시적(explicit) 캐스팅의 차이를 시험합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-computer-science-a-u1-l2",
    courseId: "ap-computer-science-a",
    subjectLabel: "AP Computer Science A",
    emoji: "💻",
    unit: 1,
    lessonNum: 2,
    unitName: "Primitive Types",
    title: "연산자, 우선순위, 그리고 정수 나눗셈",
    subtitle: null,
    overview: null,
    objectives: [
      "Primitive Types 단원의 연산자(Operators)·우선순위(Precedence)·정수 나눗셈(Integer Division)을 완전히 익힌다.",
    ],
    formulas: [
      "7/2==3 (int division)",
      "13%4==1",
      "(double)5/2==2.5",
    ],
    diagram: null,
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "산술 연산자 (Arithmetic operators)",
            def: "+, -, *, /, % — 그리고 타입 승격(type promotion) 규칙이 함께 적용됩니다.",
          },
          {
            term: "정수 나눗셈은 절단된다 (Integer division truncates)",
            def: "7/2 = 3 (3.5 가 아닙니다)",
          },
          {
            term: "연산자 우선순위 (Operator precedence)",
            def: "*, /, % 가 +, - 보다 먼저. 우선순위가 같으면 왼쪽에서 오른쪽으로(left-to-right) 계산합니다.",
          },
        ],
        traps: [
          "정수 나눗셈을 못 알아채기 — Java에서 5/2 = 2 입니다, 2.5 가 아니에요. 2.5 를 얻으려면 피연산자 중 적어도 하나가 double 이어야 합니다: 5.0/2 = 2.5. AP는 정수 나눗셈이 예상 밖의 절단된 결과를 내는 코드를 시험합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-computer-science-a-u1-l3",
    courseId: "ap-computer-science-a",
    subjectLabel: "AP Computer Science A",
    emoji: "💻",
    unit: 1,
    lessonNum: 3,
    unitName: "Primitive Types",
    title: "타입 캐스팅과 타입 호환성",
    subtitle: null,
    overview: null,
    objectives: [
      "혼합 타입(mixed-type) 식에서의 캐스팅",
    ],
    formulas: [
      "7/2==3 (int division)",
      "13%4==1",
      "(double)5/2==2.5",
    ],
    diagram: null,
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "확대 변환 (Widening)",
            def: "int → double 은 자동으로 일어납니다. 축소 변환(narrowing) double → int 는 명시적 캐스트가 필요해요.",
          },
          {
            term: "축소 캐스트에서의 정보 손실 (Loss of information in narrowing cast)",
            def: "(int)3.9 = 3",
          },
        ],
        traps: [
          "(int)3.9 가 4 로 반올림된다고 생각하기 — Java 캐스팅은 0 방향으로 절단(truncate toward zero)합니다. 3.9 는 3 이 되고 -3.9 는 -3 이 돼요. AP는 캐스트 식을 주고 절단된 결과를 묻습니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-computer-science-a-u1-l4",
    courseId: "ap-computer-science-a",
    subjectLabel: "AP Computer Science A",
    emoji: "💻",
    unit: 1,
    lessonNum: 4,
    unitName: "Primitive Types",
    title: "식(Expression)과 대입(Assignment)",
    subtitle: null,
    overview: null,
    objectives: [
      "대입(assignment)은 대입된 값을 반환한다",
    ],
    formulas: [
      "7/2==3 (int division)",
      "13%4==1",
      "(double)5/2==2.5",
    ],
    diagram: null,
    sections: [
      {
        title: "핵심 개념",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "복합 대입 연산자 (Compound assignment)",
            def: "+=, -=, *=, /=, %=",
          },
          {
            term: "증가/감소 연산자 (Increment/decrement)",
            def: "++i vs i++ — 식 안에서의 전위(prefix) vs 후위(postfix).",
          },
        ],
        traps: [
          "전위 증가(++i: 먼저 증가시키고 새 값을 사용)와 후위 증가(i++: 옛 값을 먼저 쓰고 그다음 증가)를 헷갈리기 — AP는 j = i++ 처럼 식 안에 i++ 를 넣고, j 가 i 의 원래 값을 받는다는 점을 시험합니다.",
        ],
        example: null,
      },
    ],
  },
];
