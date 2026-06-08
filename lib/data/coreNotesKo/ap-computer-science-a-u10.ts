/**
 * Core Notes 한국어 일타강사 버전 — AP Computer Science A Unit 10 (10.1–10.4): Recursion.
 * 코딩 과목 — Java 코드/키워드/식별자는 영어 그대로 유지, 설명 산문만 한국어로 번역.
 * 원본 필드 전량 보존(objectives·formulas·diagram·table·terms·traps·example, null 포함).
 * 용어는 "한국어 (English)" 병기, 정의는 한국어. (overview가 null이라 한국어 overview 추가)
 */
import type { CoreNote } from "@/lib/coreNotes";

export const AP_COMPUTER_SCIENCE_A_U10_KO: CoreNote[] = [
  {
    lessonId: "ap-computer-science-a-u10-l1",
    courseId: "ap-computer-science-a",
    subjectLabel: "AP Computer Science A",
    emoji: "💻",
    unit: 10,
    lessonNum: 1,
    unitName: "Recursion",
    title: "Recursion Fundamentals — Base Case and Recursive Case",
    subtitle: null,
    overview:
      "재귀(recursion)는 메서드가 자기 자신을 호출하는 기법이에요. 모든 재귀 메서드는 두 부분이 필요합니다 — 재귀 호출 없이 멈추는 base case, 그리고 더 작은 문제로 자기 자신을 부르는 recursive case. 예를 들어 팩토리얼은 f(n) = n · f(n−1)이고 f(0) = 1이 base case가 돼요. base case가 없거나 절대 도달하지 못하면 호출이 무한히 쌓여 StackOverflowError가 납니다. 시험에서 단골 함정이에요. 자, base case가 재귀의 '브레이크'라는 걸 머리에 새기고 시작합시다.",
    objectives: [
      "Every recursive method needs a base case (no recursive call) and recursive case",
      "Tracing recursive calls to find return value",
    ],
    formulas: ["base case stops recursion", "f(n)=n·f(n−1), f(0)=1"],
    diagram: null,
    sections: [
      {
        title: "Key concepts",
        subtitle: null,
        body:
          "재귀 메서드를 호출하면 호출마다 스택에 frame이 하나씩 쌓입니다(stack frame). 안쪽 호출이 base case에 도달해 값을 반환하기 시작하면, 스택이 거꾸로 풀리면서(unwind) 각 frame이 차례로 결과를 돌려줘요. base case는 반드시 recursive case가 점점 가까워지는 방향으로 설계해야 합니다 — 안 그러면 영원히 멈추지 않아요.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "스택 프레임 (Stack frames)",
            def: "호출마다 frame이 하나씩 추가되고, 반환되면서 스택이 거꾸로 풀린다(unwind).",
          },
        ],
        traps: [
          "base case를 빠뜨리거나 절대 도달하지 못하는 base case를 만드는 것 — 무한 재귀(infinite recursion)가 되어 StackOverflowError가 납니다. AP는 재귀 코드를 주고 특정 인자로 호출했을 때의 출력을 묻기 때문에, 꼼꼼한 추적(trace)이 필요해요.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-computer-science-a-u10-l2",
    courseId: "ap-computer-science-a",
    subjectLabel: "AP Computer Science A",
    emoji: "💻",
    unit: 10,
    lessonNum: 2,
    unitName: "Recursion",
    title: "Tracing Recursive Methods",
    subtitle: null,
    overview:
      "재귀 추적(tracing)은 시험 점수가 갈리는 핵심 기술이에요. 재귀 트리(recursion tree)나 스택 추적(stack trace)을 직접 그려 실행 흐름을 따라가는 겁니다. 반환값은 호출 사슬(call chain)을 따라 안쪽에서 바깥쪽으로 위로 전파돼요 — 즉, 바깥쪽 frame의 반환을 계산하려면 안쪽 recursive call이 완전히 끝나 값을 돌려줄 때까지 기다려야 합니다. 시험에서는 'recursive call이 끝나기 전에 반환을 먼저 계산해버리는' 실수를 노립니다. 순서를 절대 거꾸로 잡지 마세요.",
    objectives: [
      "Drawing recursion tree or stack trace to follow execution",
      "Return values propagate upward through the call chain",
    ],
    formulas: ["base case stops recursion", "f(n)=n·f(n−1), f(0)=1"],
    diagram: null,
    sections: [
      {
        title: "Key concepts",
        subtitle: null,
        body:
          "재귀를 추적할 때 핵심은 연산 순서(order of operations)예요. recursive call은 호출한 frame이 자신의 값을 반환하기 '전에' 먼저 일어납니다. 그래서 바깥 호출의 반환식을 계산하려면, 안쪽 호출들이 base case까지 내려갔다가 값을 들고 다시 올라올 때까지 기다려야 해요. 트리를 그려 어떤 호출이 어떤 호출을 기다리는지 명확히 표시하면 실수가 줄어듭니다.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "연산 순서 (Order of operations)",
            def: "recursive call이 호출한 frame의 반환보다 먼저 일어난다.",
          },
        ],
        traps: [
          "recursive call이 완전히 해결되기 전에 반환을 먼저 계산하는 것 — 바깥쪽 반환을 계산하기 전에 반드시 안쪽 호출들이 반환되기를 기다려야 합니다. AP는 재귀 메서드를 주고 어떤 호출의 정확한 반환값(exact return value)을 묻습니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-computer-science-a-u10-l3",
    courseId: "ap-computer-science-a",
    subjectLabel: "AP Computer Science A",
    emoji: "💻",
    unit: 10,
    lessonNum: 3,
    unitName: "Recursion",
    title: "Recursive vs. Iterative Solutions",
    subtitle: null,
    overview:
      "재귀와 반복(iteration)은 동전의 양면이에요 — 모든 반복 해법은 재귀로, 모든 재귀 해법은 반복으로 다시 쓸 수 있습니다. 차이는 비용 구조예요. 재귀는 call stack에 frame이 쌓이는 오버헤드가 있고, 반복은 그 스택 관리를 코드에서 직접(explicit) 해야 합니다. tree traversal, divide-and-conquer, backtracking처럼 문제 구조 자체가 자기유사적일 때는 재귀가 훨씬 자연스럽고 읽기 쉬워요. 단, 순진하게 짠 recursive Fibonacci처럼 같은 계산을 지수적으로 반복하면 폭발한다는 함정을 시험이 노립니다.",
    objectives: [
      "Any iterative solution can be written recursively and vice versa",
      "Recursion has call stack overhead; iteration has explicit stack management",
    ],
    formulas: ["base case stops recursion", "f(n)=n·f(n−1), f(0)=1"],
    diagram: null,
    sections: [
      {
        title: "Key concepts",
        subtitle: null,
        body:
          "재귀가 자연스러운 경우를 알아두면 언제 어떤 도구를 쓸지 판단이 빨라져요. 문제가 '자기 자신의 더 작은 버전'으로 쪼개질 때 — tree traversal(트리 순회), divide-and-conquer(분할 정복), backtracking(되추적) — 재귀가 코드를 훨씬 간결하게 만듭니다. 반대로 단순 누적·반복이라면 반복문이 스택 오버헤드 없이 더 효율적일 수 있어요.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "재귀가 자연스러운 경우 (When recursion is natural)",
            def: "tree traversal, divide-and-conquer, backtracking.",
          },
        ],
        traps: [
          "작업을 중복으로 반복하는 재귀 해법을 짜는 것 — 순진한 recursive Fibonacci는 같은 값을 지수적으로 다시 계산합니다. memoization이나 iteration으로 이를 피할 수 있어요. AP는 recursive Fibonacci와 iterative Fibonacci의 시간 복잡도(time complexity)를 비교해 물을 수 있습니다.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ap-computer-science-a-u10-l4",
    courseId: "ap-computer-science-a",
    subjectLabel: "AP Computer Science A",
    emoji: "💻",
    unit: 10,
    lessonNum: 4,
    unitName: "Recursion",
    title: "Recursive Array and String Processing",
    subtitle: null,
    overview:
      "재귀는 배열과 문자열을 처리할 때 진가를 발휘해요. 핵심 패턴은 head-and-tail — 첫 원소를 처리하고 나머지(rest)에 대해 재귀하는 거예요. 문자열이면 reverse, palindrome check, substring search, 배열이면 sum, search, min/max 같은 연산을 이 패턴으로 깔끔하게 풀 수 있습니다. 가장 흔한 함정은 base case 처리예요 — 빈 문자열은 length가 0이고, s.length() == 0(또는 == 1)을 base case로 잡아 identity 값(빈 문자열, 0 등)을 반환해야 합니다. base case를 잘못 잡으면 빈 입력에서 바로 무너져요.",
    objectives: [
      "Master Recursive Array and String Processing for the Recursion unit.",
    ],
    formulas: ["base case stops recursion", "f(n)=n·f(n−1), f(0)=1"],
    diagram: null,
    sections: [
      {
        title: "Key concepts",
        subtitle: null,
        body:
          "배열·문자열 재귀의 뼈대는 'head-and-tail' 패턴이에요. 첫 원소(head)를 처리한 뒤, 나머지(tail)에 대해 같은 메서드를 재귀 호출하는 거죠. 이렇게 하면 매 호출마다 입력이 한 칸씩 줄어들어 결국 base case(빈 문자열/배열, 또는 원소 하나)에 도달합니다. 문자열은 reverse·palindrome 검사·substring 탐색, 배열은 합·탐색·최소/최대 모두 같은 골격으로 풀려요.",
        keyIdea: null,
        table: null,
        terms: [
          {
            term: "재귀 문자열 연산 (Recursive string operations)",
            def: "reverse, palindrome check, substring search.",
          },
          {
            term: "재귀 배열 처리 (Recursive array processing)",
            def: "sum, search, min/max.",
          },
          {
            term: "Head-and-tail 재귀 패턴 (Head-and-tail recursion patterns)",
            def: "첫 원소를 처리하고 나머지(rest)에 대해 재귀한다.",
          },
        ],
        traps: [
          "빈 문자열/배열에 대한 base case를 제대로 처리하지 않는 것 — 빈 문자열은 length가 0이므로 s.length() == 0(또는 == 1)을 base case로 잡아야 합니다. AP는 base case가 identity 값(빈 문자열, 0 등)을 반환해야 하는 재귀 문자열 메서드를 시험에 냅니다.",
        ],
        example: null,
      },
    ],
  },
];
