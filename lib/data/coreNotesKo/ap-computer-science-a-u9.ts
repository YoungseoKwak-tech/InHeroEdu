/**
 * Core Notes 한국어 일타강사 버전 — AP Computer Science A Unit 9 (Inheritance, 9.1–9.4).
 * 원본 내용 전량 보존(overview·body·keyIdea·table·diagram·terms·traps·example 포함) + 일타강사 내러티브.
 * CODING 과목: Java 코드·키워드·식별자(extends, super, @Override, polymorphism 등)는 영어 원문 유지, 설명 산문만 한국어 번역.
 * 용어는 "한국어 (English)" 병기.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const AP_COMPUTER_SCIENCE_A_U9_KO: CoreNote[] = [
  {
    lessonId: "ap-computer-science-a-u9-l1",
    courseId: "ap-computer-science-a",
    subjectLabel: "AP Computer Science A",
    emoji: "💻",
    unit: 9,
    lessonNum: 1,
    unitName: "Inheritance",
    title: "Extends and is-a Relationships",
    subtitle: null,
    overview:
      "상속(inheritance)은 한 클래스가 다른 클래스의 기능을 물려받는 것입니다. extends 키워드를 쓰면 subclass(자식 클래스)가 superclass(부모 클래스)의 private이 아닌 멤버를 전부 물려받아요. 핵심은 '언제 상속을 쓰느냐'인데, 판단 기준이 바로 'is-a 관계'입니다 — Dog is-a Animal처럼 자식이 부모의 한 종류일 때만 상속이에요. 반대로 'has-a 관계'(Car has-a Engine)면 상속이 아니라 composition(구성)을 써야 합니다. 시험 함정: 코드 재사용이 탐난다고 is-a가 성립하지 않는데 상속을 끌어다 쓰면 틀려요. AP는 주어진 관계가 상속에 맞는지 composition에 맞는지를 정확히 물어봅니다.",
    objectives: [
      "extends keyword; subclass inherits non-private members from superclass",
    ],
    formulas: [
      "Animal a=new Dog() → Dog override runs",
      "is-a inherit, has-a compose",
    ],
    diagram: null,
    sections: [
      {
        title: "Key concepts",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "is-a 관계 (is-a relationship)",
            def: "Dog is-a Animal — 자식이 부모의 한 종류일 때 성립. 상속(inheritance) 여부를 결정할 때 이 기준을 씁니다.",
          },
          {
            term: "has-a 관계 (has-a relationship)",
            def: "Car has-a Engine — 한 객체가 다른 객체를 '가지고' 있을 때. 이때는 상속이 아니라 composition(구성)을 씁니다.",
          },
        ],
        traps: [
          "is-a가 성립하지 않는데 단지 코드 재사용 목적으로 상속하는 것 — 관계가 has-a라면 상속이 아니라 composition(인스턴스 변수)을 써야 합니다. AP는 주어진 관계가 상속(inheritance)을 정당화하는지 composition을 정당화하는지를 시험합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-computer-science-a-u9-l2",
    courseId: "ap-computer-science-a",
    subjectLabel: "AP Computer Science A",
    emoji: "💻",
    unit: 9,
    lessonNum: 2,
    unitName: "Inheritance",
    title: "Overriding vs. Overloading",
    subtitle: null,
    overview:
      "이름은 비슷한데 완전히 다른 두 개념입니다. Overriding(오버라이딩)은 subclass가 superclass와 '똑같은 시그니처(signature)'의 메서드를 다시 정의해 덮어쓰는 것이고, Overloading(오버로딩)은 '같은 이름이지만 매개변수가 다른' 메서드를 같은 클래스 안에 여러 개 두는 것입니다. 둘을 가르는 결정적 차이는 매개변수예요 — 시그니처가 같으면 overriding, 매개변수가 다르면 overloading. 시험 함정: 의도는 override였는데 매개변수 타입이 조금이라도 다르면 자기도 모르게 overloading이 돼버립니다. 이걸 막으려고 @Override annotation을 붙이면, superclass에 일치하는 메서드가 없을 때 컴파일 에러를 내줘서 실수를 잡아줘요. AP는 시그니처를 살짝 비틀어 둔 코드로 이 둘을 구분하게 합니다.",
    objectives: [
      "Master Overriding vs. Overloading for the Inheritance unit.",
    ],
    formulas: [
      "Animal a=new Dog() → Dog override runs",
      "is-a inherit, has-a compose",
    ],
    diagram: null,
    sections: [
      {
        title: "Key concepts",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "Overriding(오버라이딩)",
            def: "subclass에서 superclass와 동일한 시그니처(signature)의 메서드를 정의해 부모 메서드를 대체하는 것.",
          },
          {
            term: "Overloading(오버로딩)",
            def: "같은 클래스 안에서 같은 이름이지만 매개변수(parameters)가 다른 메서드를 여러 개 두는 것.",
          },
          {
            term: "@Override annotation",
            def: "override 의도일 때 실수로 overloading 되는 것을 막아주는 표시. superclass에 일치 메서드가 없으면 컴파일 에러를 발생시킵니다.",
          },
        ],
        traps: [
          "override 대신 실수로 overloading 하는 것 — 매개변수 타입이 조금이라도 다르면 그건 overloading입니다. @Override는 superclass에 일치하는 메서드가 없으면 컴파일 에러를 일으켜요. AP는 시그니처가 미묘하게 다른 코드로 시험합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-computer-science-a-u9-l3",
    courseId: "ap-computer-science-a",
    subjectLabel: "AP Computer Science A",
    emoji: "💻",
    unit: 9,
    lessonNum: 3,
    unitName: "Inheritance",
    title: "super Keyword and Constructor Chaining",
    subtitle: null,
    overview:
      "super 키워드는 자식이 부모를 호출하는 통로입니다. 두 가지 용도가 있어요: 첫째, super()는 subclass 생성자(constructor)에서 superclass 생성자를 호출하는데, 반드시 생성자의 '첫 번째 문장'이어야 합니다. 둘째, super.methodName()은 override된 부모의 메서드를 자식에서 직접 호출할 때 씁니다. 만약 super() 호출을 명시하지 않으면 Java가 자동으로 인자 없는 super()(no-arg constructor)를 호출해요 — 이게 constructor chaining(생성자 연쇄)입니다. 시험 함정: superclass에 매개변수 있는 생성자만 있고 기본 생성자가 없으면, 자동 super() 호출이 실패하므로 subclass 생성자에서 반드시 super(args)를 명시적으로 호출해야 합니다.",
    objectives: [
      "super() must be first statement in subclass constructor",
      "super.methodName() to call overridden superclass method",
      "If no super() call, Java implicitly calls super() (no-arg constructor)",
    ],
    formulas: [
      "Animal a=new Dog() → Dog override runs",
      "is-a inherit, has-a compose",
    ],
    diagram: null,
    sections: [
      {
        title: "super Keyword and Constructor Chaining",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [],
        traps: [
          "superclass에 default constructor가 없는데 super()를 호출하지 않는 것 — superclass에 매개변수 있는 생성자만 있다면, subclass 생성자는 반드시 super(args)를 명시적으로 호출해야 합니다. AP는 superclass가 parameterized constructor만 가진 클래스 계층으로 이 점을 시험합니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-computer-science-a-u9-l4",
    courseId: "ap-computer-science-a",
    subjectLabel: "AP Computer Science A",
    emoji: "💻",
    unit: 9,
    lessonNum: 4,
    unitName: "Inheritance",
    title: "Polymorphism — Dynamic Dispatch at Runtime",
    subtitle: null,
    overview:
      "다형성(polymorphism)의 핵심은 '두 개의 타입'을 구분하는 것입니다. 변수의 선언된 타입(declared/compile-time type)은 컴파일 시점에 '어떤 메서드를 부를 수 있는지'(가시성)를 결정하고, 객체의 실제 타입(actual/runtime type)은 실행 시점에 '어떤 override가 실제로 실행되는지'를 결정해요. 이게 바로 dynamic dispatch(동적 디스패치)입니다. 예를 들어 Animal a = new Dog();에서 a.speak()를 부르면 컴파일은 Animal 기준으로 통과하지만, 런타임엔 Dog의 override가 실행됩니다. 시험 함정: compile-time 타입과 runtime 타입을 헷갈리면 안 돼요. Animal a = new Dog();에서 a.bark()는 컴파일 에러입니다(Animal에 bark가 없으니까). 반면 a.speak()는 런타임에 Dog의 override를 씁니다. AP는 compile-time 가시성과 runtime dispatch를 둘 다 시험합니다.",
    objectives: [
      "Variable type (declared) determines what methods are visible at compile time",
      "Object type (actual) determines which override is called at runtime",
    ],
    formulas: [
      "Animal a=new Dog() → Dog override runs",
      "is-a inherit, has-a compose",
    ],
    diagram: null,
    sections: [
      {
        title: "Key concepts",
        subtitle: null,
        body: null,
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "Upcasting(업캐스팅)",
            def: "Animal a = new Dog(); — 항상 유효합니다. Downcasting(다운캐스팅): Dog d = (Dog)a; — ClassCastException을 던질 수 있습니다.",
          },
        ],
        traps: [
          "compile-time 타입과 runtime 타입을 혼동하는 것 — Animal a = new Dog(); 에서 a.bark()는 컴파일 에러입니다(Animal에는 bark가 없음). 하지만 a.speak()를 호출하면 런타임에 Dog의 override가 실행됩니다. AP는 compile-time 가시성과 runtime dispatch를 둘 다 시험합니다.",
        ],
        example: null,
      },
    ],
  },
];
