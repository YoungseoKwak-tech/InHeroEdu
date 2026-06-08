/**
 * Core Notes 한국어 일타강사 버전 — AP Computer Science A Unit 5 (5.1–5.4).
 * 원본 내용 전량 보존(overview·body·keyIdea·table·diagram·traps·terms 포함) + 일타강사 내러티브.
 * CODING 과목 — Java 코드/키워드/식별자/타입명은 영어 그대로, 설명 산문만 한국어로.
 * 용어는 "한국어 (English)" 병기.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const AP_COMPUTER_SCIENCE_A_U5_KO: CoreNote[] = [
  {
    lessonId: "ap-computer-science-a-u5-l1",
    courseId: "ap-computer-science-a",
    subjectLabel: "AP Computer Science A",
    emoji: "💻",
    unit: 5,
    lessonNum: 1,
    unitName: "Writing Classes",
    title: "Class Structure — Instance Variables and Methods",
    subtitle: null,
    overview: null,
    objectives: [
      "상태를 캡슐화하는 private instance variable",
    ],
    formulas: [],
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
            term: "생성자 (Constructor)",
            def: "instance variable을 초기화합니다.",
          },
          {
            term: "메서드 (Methods)",
            def: "accessor(get), mutator(set), 그 외 기타 메서드들.",
          },
        ],
        traps: [
          "instance variable을 클래스 본문이 아니라 메서드 안에 선언하는 것 — instance variable은 객체에 속합니다. 메서드 안의 변수는 지역 변수(local)라서 메서드가 return되면 사라져요. AP는 바로 이 scope 구분을 시험합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-computer-science-a-u5-l2",
    courseId: "ap-computer-science-a",
    subjectLabel: "AP Computer Science A",
    emoji: "💻",
    unit: 5,
    lessonNum: 2,
    unitName: "Writing Classes",
    title: "Constructors and Method Overloading",
    subtitle: null,
    overview: null,
    objectives: [
      "기본 생성자(no-arg) vs. 매개변수가 있는 생성자(parameterized constructor)",
    ],
    formulas: [],
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
            term: "메서드 오버로딩 (Method overloading)",
            def: "이름은 같지만 parameter list가 다른 메서드들.",
          },
          {
            term: "this 키워드 (this keyword)",
            def: "현재 객체를 가리킵니다. parameter와 instance variable을 구분(disambiguate)해 줍니다.",
          },
        ],
        traps: [
          "parameter 이름이 instance variable 이름과 같을 때 this.variable = variable을 쓰지 않는 것 — 'this'가 없으면 그 대입문은 지역 parameter를 자기 자신에게 대입하는 꼴이 됩니다. AP는 this가 꼭 필요한 생성자를 출제해요.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-computer-science-a-u5-l3",
    courseId: "ap-computer-science-a",
    subjectLabel: "AP Computer Science A",
    emoji: "💻",
    unit: 5,
    lessonNum: 3,
    unitName: "Writing Classes",
    title: "Encapsulation and Information Hiding",
    subtitle: null,
    overview: null,
    objectives: [
      "accessor/mutator 패턴, 그리고 언제 이들을 포함시켜야 하는가",
    ],
    formulas: [],
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
            term: "private 필드, public 메서드 (private fields, public methods)",
            def: "표준적인 캡슐화(encapsulation) 방식입니다.",
          },
          {
            term: "캡슐화가 유익한 이유 (Why encapsulation is beneficial)",
            def: "잘못된 상태(invalid state)에 빠지는 것을 막아 줍니다.",
          },
        ],
        traps: [
          "편하다는 이유로 instance variable을 public으로 만드는 것 — 캡슐화를 위반합니다. AP FRQ는 제대로 된 private 필드와 public accessor·mutator를 작성하는 능력을 명시적으로 시험해요.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-computer-science-a-u5-l4",
    courseId: "ap-computer-science-a",
    subjectLabel: "AP Computer Science A",
    emoji: "💻",
    unit: 5,
    lessonNum: 4,
    unitName: "Writing Classes",
    title: "Static Variables and Methods",
    subtitle: null,
    overview: null,
    objectives: [
      "static은 개별 인스턴스가 아니라 클래스에 속합니다",
    ],
    formulas: [],
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
            term: "static 호출하기 (Calling static)",
            def: "object.method()보다 ClassName.method() 형태가 권장됩니다.",
          },
          {
            term: "언제 static을 쓰는가 (When to use static)",
            def: "유틸리티 메서드, 클래스 수준의 상수(constant)나 카운터(counter)에 사용합니다.",
          },
        ],
        traps: [
          "instance variable에 대고 static 메서드를 호출하는 것 — 컴파일은 되지만 오해를 부릅니다. AP는 static 메서드가 instance variable에 접근할 수 없다는 점(static 문맥에는 'this'가 없음)을 이해하는지 시험합니다.",
        ],
        example: null,
      },
    ],
  },
];
