/**
 * Core Notes 한국어 일타강사 버전 — AP Computer Science A Unit 3 (3.1–3.4).
 * Boolean Expressions and if Statements. 원본 내용 전량 보존 + 일타강사 내러티브.
 * 코딩 과목: Java 코드·키워드·식별자·타입명은 영어 원문 그대로, 설명 산문만 한국어.
 * 용어는 "한국어 (English)" 병기.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const AP_COMPUTER_SCIENCE_A_U3_KO: CoreNote[] = [
  {
    lessonId: "ap-computer-science-a-u3-l1",
    courseId: "ap-computer-science-a",
    subjectLabel: "AP Computer Science A",
    emoji: "💻",
    unit: 3,
    lessonNum: 1,
    unitName: "Boolean Expressions and if Statements",
    title: "Boolean Expressions and Logical Operators",
    subtitle: null,
    overview: null,
    objectives: ["==, !=, <, >, <=, >= 로 값을 비교하기"],
    formulas: ["!(a&&b)==!a||!b", "short-circuit: && stops on false"],
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
            term: "논리 연산자 (&&, ||, !)",
            def: "진리표(truth table)와 단축 평가(short-circuit evaluation)를 반드시 외워두세요. && 는 둘 다 true 여야 true, || 는 하나만 true 여도 true, ! 는 값을 뒤집습니다.",
          },
          {
            term: "드모르간의 법칙 (De Morgan's laws)",
            def: "!(A&&B) 는 !A||!B 와 같습니다. 부정을 괄호 안으로 분배하면 &&와 || 가 서로 뒤바뀐다는 게 핵심이에요.",
          },
        ],
        traps: [
          "단축 평가(short-circuit evaluation)를 적용하지 않는 것 — A && B 에서 A 가 false 면 B 는 아예 평가되지 않습니다(그리고 B 를 평가했다면 NullPointerException 이 날 수도 있죠). AP 는 단축 평가 덕분에 오류가 안 나는 코드를 시험에 냅니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-computer-science-a-u3-l2",
    courseId: "ap-computer-science-a",
    subjectLabel: "AP Computer Science A",
    emoji: "💻",
    unit: 3,
    lessonNum: 2,
    unitName: "Boolean Expressions and if Statements",
    title: "if-else if-else Chains",
    subtitle: null,
    overview: null,
    objectives: ["dangling else 문제 (매달린 else)"],
    formulas: ["!(a&&b)==!a||!b", "short-circuit: && stops on false"],
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
            term: "if-else 체인의 상호 배타성 (Mutual exclusion in if-else chains)",
            def: "처음으로 true 가 되는 조건 하나만 실행됩니다. 그 뒤 조건들은 true 라도 건너뛰어요.",
          },
          {
            term: "중첩 if vs. if-else if (Nested if vs. if-else if)",
            def: "여러 조건이 동시에 true 일 때 둘의 동작이 달라집니다. 중첩 if 는 각각 독립적으로 검사되고, if-else if 체인은 하나만 골라 실행합니다.",
          },
        ],
        traps: [
          "else-if 는 이전 조건들이 전부 false 였을 때만 실행된다는 걸 모르는 것 — 첫 조건이 맞으면 뒤따르는 else-if 조건들은 아예 검사조차 되지 않습니다. AP 는 체인을 주고 여러 조건이 동시에 true 일 수 있을 때 출력이 무엇인지 묻습니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-computer-science-a-u3-l3",
    courseId: "ap-computer-science-a",
    subjectLabel: "AP Computer Science A",
    emoji: "💻",
    unit: 3,
    lessonNum: 3,
    unitName: "Boolean Expressions and if Statements",
    title: "String Comparison and == vs. equals()",
    subtitle: null,
    overview: null,
    objectives: [
      "== 는 참조(reference)를 비교하고, .equals() 는 String 의 내용(content)을 비교한다",
      "String 리터럴은 인터닝(intern)되어 같은 참조를 가질 수 있지만, new String 은 항상 다른 참조를 만든다",
      "대소문자 구분 없이 비교하려면 equalsIgnoreCase() 를 쓴다",
    ],
    formulas: ["!(a&&b)==!a||!b", "short-circuit: && stops on false"],
    diagram: null,
    sections: [
      {
        title: "String Comparison and == vs. equals()",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [],
        traps: [
          "String 의 내용을 비교하는 데 == 를 쓰는 것 — == 는 참조 동일성(reference equality)을 검사합니다. 같은 문자를 가졌지만 따로 생성된 두 String 은 서로 다른 참조를 갖죠. AP 는 특히 new String(\"hello\") == \"hello\" 가 false 가 되는 사례로 이걸 시험합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-computer-science-a-u3-l4",
    courseId: "ap-computer-science-a",
    subjectLabel: "AP Computer Science A",
    emoji: "💻",
    unit: 3,
    lessonNum: 4,
    unitName: "Boolean Expressions and if Statements",
    title: "Compound Boolean Conditions and Code Tracing",
    subtitle: null,
    overview: null,
    objectives: [
      "복잡한 boolean 조건이 들어간 코드를 한 단계씩 추적(trace)하기",
      "if-else 분기의 완전성(completeness)과 배타성(exclusivity)",
    ],
    formulas: ["!(a&&b)==!a||!b", "short-circuit: && stops on false"],
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
            term: "동등한 boolean 식 (Equivalent boolean expressions)",
            def: "식의 단순화(simplification)와 드모르간의 법칙(De Morgan's)으로 복잡한 조건을 같은 의미의 더 간단한 식으로 바꿀 수 있습니다.",
          },
        ],
        traps: [
          "복합 조건(compound condition)을 꼼꼼히 추적하지 않는 것 — AP 는 &&, ||, ! 가 섞인 다중 조건 if 문을 주고 정확한 출력을 묻습니다. 단축 평가(short-circuit) 규칙을 지키며 각 부분식을 순서대로 평가해야 합니다.",
        ],
        example: null,
      },
    ],
  },
];
