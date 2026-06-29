/**
 * Core Notes English version — IB Computer Science Unit 4 (Computational Thinking & Problem-Solving).
 * Faithful translation of the Korean 일타강사 original; all objectives, terms,
 * traps, and examples preserved at the same depth.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const IB_CS_U4_EN: CoreNote[] = [
  {
    lessonId: "ib-cs-u4-l1",
    courseId: "ib-cs",
    subjectLabel: "IB Computer Science",
    emoji: "💻",
    unit: 4,
    lessonNum: 1,
    unitName: "Computational Thinking & Problem-Solving",
    title: "The Five Perspectives of Computational Thinking",
    subtitle:
      "Thinking procedurally, logically, ahead, concurrently, and abstractly — five lenses for transforming a problem into a form a computer can solve",
    overview:
      "If you understand algorithms only as 'writing code,' you will get stuck on the thinking-type analysis questions in IB Paper 1. IB Topic 4 assesses the thinking process itself — how you decompose and abstract a problem before programming. Thinking procedurally (order), thinking logically (conditions and decisions), thinking ahead (predicting the future), thinking concurrently (parallel processing), and thinking abstractly (removing unnecessary detail) — being able to explain these five perspectives with concrete examples is what lets you reliably secure the 2–4 mark IB extended-response questions. In this lesson we organise the five perspectives using real-life analogies and connect how each one appears during the algorithm-design stage.",
    objectives: [
      "Define thinking procedurally and apply it to writing flowcharts and pseudocode",
      "Define thinking logically and explain how conditionals and Boolean expressions express decisions in an algorithm",
      "Define thinking ahead and describe its connection to designing preconditions, postconditions, and exception handling",
      "Define thinking concurrently and analyse the characteristics of problems suited to parallel processing",
      "Define thinking abstractly and explain the process of selecting essential properties from a problem and representing them in models and diagrams",
    ],
    sections: [
      {
        title: "Thinking Procedurally and Thinking Logically",
        subtitle:
          "Order and decision — 'what to do first' and 'when to take which path'",
        terms: [
          {
            term: "Thinking procedurally",
            def: "Thinking by decomposing a complex problem into steps and executing each step in a fixed order. Just like a recipe, there must be a clear sequence for a computer to execute it. The process blocks and arrows of a flowchart are tools that visualise procedural thinking.",
          },
          {
            term: "Thinking logically",
            def: "The decision-making ability to evaluate conditions within an algorithm and select different execution paths. Boolean operators such as AND, OR, and NOT, and the IF-THEN-ELSE structure, express logical thinking as code. In IB pseudocode, the IF / ELSE IF / ELSE block is the representative implementation.",
          },
          {
            term: "Precondition",
            def: "A condition that must be true before an algorithm or function runs in order for it to work correctly. Example: the precondition of binary search is that 'the array must be sorted in ascending order.' Violating a precondition is a major cause of algorithm failure.",
          },
          {
            term: "Abstraction",
            def: "The process of keeping only the essential properties of a problem and removing unnecessary detail. A subway map is an example of abstraction: it keeps only the connection relationships between stations (the essence) and removes the actual terrain and distance ratios (the detail). Abstraction simplifies algorithm design and increases reusability.",
          },
        ],
        traps: [
          "In IB exams, writing that 'thinking procedurally' is simply 'listing steps' earns only partial marks. The key is 'decomposing into sub-problems and expressing each sub-problem as ordered steps.' Mention both decomposition and sequencing, and connect them to real tools such as flowcharts or pseudocode to earn high marks.",
          "In logical-thinking questions, writing only that a Boolean condition 'returns true or false' without connecting it to the algorithm's flow control costs marks. You must also include that 'depending on the result of evaluating the condition, the execution path branches, allowing the algorithm to respond flexibly to a variety of inputs' for the IB mark scheme to credit it as a complete explanation.",
        ],
        example:
          "Let's find both procedural and logical thinking in an algorithm that converts student scores into grades. Procedural thinking: (1) input the score → (2) evaluate the grade conditions → (3) output the grade (a fixed order). Logical thinking: IF score >= 7 THEN grade = 'A' ELSE IF score >= 5 THEN grade = 'B' ELSE grade = 'C' END IF (branching by condition). Procedural thinking decides 'the order of what to do first,' while logical thinking decides 'which path to take depending on the condition.' Both kinds of thinking must work together for a meaningful algorithm to be complete.",
      },
      {
        title: "Thinking Ahead, Thinking Concurrently, and Thinking Abstractly",
        subtitle:
          "Three advanced perspectives — predicting the future, processing in parallel, and keeping only the essence",
        terms: [
          {
            term: "Thinking ahead",
            def: "Thinking that predicts in advance what will be needed before an algorithm runs (preconditions, input validity) and the exceptional situations that may arise, and designs how to handle them. Considering in advance 'what happens if the user enters a negative number?' or 'what if the array is empty?' and including error-handling logic is the result of thinking ahead.",
          },
          {
            term: "Thinking concurrently",
            def: "Thinking that approaches one large problem by dividing it into independently executable parts that are processed at the same time (in parallel). Parallelisation is only possible if each part does not depend on the results of the others. It is the foundation for designing multi-core CPUs and distributed computing systems.",
          },
          {
            term: "Postcondition",
            def: "A condition that must be true when an algorithm or function has finished executing normally. Example: the postcondition of a sorting algorithm is that 'the output array must be sorted in ascending order.' Specifying preconditions and postconditions is a key step in completing an algorithm's specification.",
          },
          {
            term: "Decomposition",
            def: "Breaking a complex problem into smaller, manageable sub-problems. Each decomposed sub-problem can be solved and tested independently, and the solutions can be combined to solve the whole problem. Both procedural thinking and concurrent thinking begin with decomposition.",
          },
        ],
        traps: [
          "In concurrent-thinking questions, writing only that 'concurrent execution = fast' earns partial marks. A high-scoring IB answer must mention the 'independence condition.' That is, include that 'each part-task must not depend on the others' results for parallel processing to work correctly. Indiscriminately parallelising tasks that have dependencies causes race conditions or incorrect results.'",
          "Writing that thinking ahead is simply 'planning in advance' is penalised in IB marking as too generic. You must connect it to the specific concepts of 'precondition, postcondition, and error handling.' Example: 'In binary search, thinking ahead includes checking the precondition that the array is sorted and designing in advance the terminating condition for when the search range falls to 0 or below.'",
        ],
        example:
          "Let's design the application of a filter in image-editing software using concurrent thinking. Suppose we apply a blur filter to a 1000×1000 pixel image. Single processing: process pixels one by one in order → 1,000,000 iterations. Applying concurrent thinking: decompose the image into 4 regions → processing the pixels of each region is independent of the others → execute on 4 cores simultaneously → theoretically a 4× speed-up. Thinking ahead is applied too: because the neighbouring pixels of a region's boundary pixels may lie in a different region, the boundary-handling method must be designed in advance. Both kinds of thinking must combine to produce a correct and efficient algorithm.",
      },
    ],
  },
  {
    lessonId: "ib-cs-u4-l2",
    courseId: "ib-cs",
    subjectLabel: "IB Computer Science",
    emoji: "💻",
    unit: 4,
    lessonNum: 2,
    unitName: "Computational Thinking & Problem-Solving",
    title: "Algorithm Design — Flowcharts, Pseudocode, and Standard Algorithms",
    subtitle:
      "Write sequence, selection, and iteration in IB pseudocode notation, and trace linear/binary search and bubble/selection sort",
    overview:
      "If you think of pseudocode as 'just code written in English,' you will lose marks for syntax errors on IB Paper 1 algorithm questions. IB Topic 4 requires a specific IB pseudocode notation, and you must also know the exact meaning of flowchart symbols. Linear search, binary search, bubble sort, and selection sort are standard algorithms that appear frequently in IB exams — both expressing each algorithm in pseudocode and tracking its step-by-step execution state with a trace table are required skills. In this lesson we organise the design tools (flowcharts and pseudocode) together with the standard algorithms and practise in the actual IB exam-question format.",
    objectives: [
      "Write the core syntax of IB pseudocode notation (INPUT/OUTPUT, IF-ELSE, WHILE, FOR, array access) accurately",
      "Distinguish flowchart symbols (start/end: oval, process: rectangle, decision: diamond, input/output: parallelogram) and represent an algorithm as a flowchart",
      "Write the operating principle and pseudocode of linear search and track its execution with a trace table",
      "Write the operating principle, precondition, and pseudocode of binary search and track its execution with a trace table",
      "Explain step by step and compare the operating principles of bubble sort and selection sort",
    ],
    sections: [
      {
        title: "IB Pseudocode and Flowchart Symbols",
        subtitle:
          "The exact notation IB requires — get the syntax wrong and you lose marks even if you know the problem",
        terms: [
          {
            term: "Pseudocode",
            def: "An expression of an algorithm's logic in a form halfway between natural language and programming structure, independent of any specific programming language's syntax. IB uses its own pseudocode notation: input is INPUT, output is OUTPUT, conditionals are IF ... THEN ... ELSE ... END IF, iteration is WHILE ... DO ... END WHILE or loop ... end loop, and array access uses the A[0] form (0-indexed).",
          },
          {
            term: "Flowchart",
            def: "A diagram that visualises the logical flow of an algorithm using standardised shapes and arrows. Symbols used in IB: oval (terminal) — START/END, rectangle (process) — processing/assignment, parallelogram (input/output) — data input/output, diamond (decision) — condition test (YES/NO branch), arrow — direction of execution flow.",
          },
          {
            term: "Selection / Branching",
            def: "A control structure that executes one of several command blocks depending on whether a condition is true or false. IB pseudocode: IF condition THEN / statements / ELSE / statements / END IF. In a flowchart it is represented by a diamond, branching in two directions, YES/NO (or TRUE/FALSE).",
          },
          {
            term: "Iteration / Loop",
            def: "A control structure that repeatedly executes a command block while a condition is true (or for a fixed number of times). In IB pseudocode, WHILE ... DO ... END WHILE is used for pre-condition iteration, and loop ... end loop for counter iteration. In a flowchart it is represented by checking a condition with a diamond and an arrow returning to the loop block.",
          },
        ],
        traps: [
          "The most common mistake in IB pseudocode exams is omitting closing keywords such as END IF, END WHILE, and end loop. IB examiners only credit an algorithm as complete when the structure is clearly closed. Also, array indices start at 0 in IB — always confirm that 'the last index of a 5-element array is 4.' Starting from 1 can cause an off-by-one error that makes the entire logic wrong.",
          "Confusing flowchart symbols costs marks. In particular, the mistake of swapping 'process (rectangle)' and 'decision (diamond)' is common. A question form like 'score >= 5?' must be a diamond, while a calculation/assignment like 'total = total + score' must be a rectangle. Remember too that input/output (parallelogram) — such as 'INPUT name' or 'OUTPUT result' — is a different symbol from a normal process block.",
        ],
        example:
          "Let's express an algorithm that outputs the maximum of two numbers entered by the user, using both IB pseudocode and flowchart symbols.\n\nIB pseudocode:\n  INPUT a\n  INPUT b\n  IF a > b THEN\n    OUTPUT a\n  ELSE\n    OUTPUT b\n  END IF\n\nFlowchart structure (described in text):\n  [START(oval)] → [INPUT a, INPUT b(parallelogram)] → [a > b?(diamond)] →YES→ [OUTPUT a(parallelogram)] → [END(oval)]\n                                                                       →NO→  [OUTPUT b(parallelogram)] → [END(oval)]\n\nBoth representations express the same logic, but in IB Paper 1 always check the question first to see which of the two formats you are asked to answer in.",
      },
      {
        title: "Standard Search Algorithms — Linear Search and Binary Search",
        subtitle:
          "Two strategies for finding a value in an array — one by one from the start vs halving the range each time",
        terms: [
          {
            term: "Linear search",
            def: "A search algorithm that compares the target against each element in order, from the first element of the array to the last. It works regardless of whether the array is sorted, and in the worst case it must compare every element of the array (worst-case time complexity O(n)). In IB pseudocode it is implemented with a WHILE loop.",
          },
          {
            term: "Binary search",
            def: "A search algorithm that compares the middle value (mid) with the target in a sorted array and halves the search range each time. Precondition: the array must be sorted in ascending order. If the target is smaller than the middle value, only the left half is searched; if larger, only the right half. With a worst-case time complexity of O(log n), it is far more efficient than linear search.",
          },
          {
            term: "Trace table",
            def: "A table that records how the value of each variable changes by following an algorithm's execution one step at a time. It is a tool that appears frequently in IB Paper 1. Columns represent variable names and rows represent execution steps; it is used to manually verify an algorithm's correctness.",
          },
          {
            term: "Mid index",
            def: "The index computed for the middle position of the current search range in binary search. In IB pseudocode it is computed as mid = (low + high) DIV 2 (DIV is integer division). If the mid calculation is wrong, an infinite loop or incorrect search results, so the exact formula must be memorised.",
          },
        ],
        traps: [
          "In binary-search questions, omitting the precondition that 'the array must be sorted' costs marks. In IB marking, mentioning the precondition is an independent marking criterion. Also, you must specify integer division as 'mid = (low + high) DIV 2' rather than 'mid = (low + high) / 2' — because using the result of real-number division as an array index causes errors.",
          "A very common mistake in trace-table questions is getting the order of variable updates wrong. For example, in binary search you compute mid and then update low or high, and you must write exactly which of low and high changes first, in line with the algorithm's order. The key to tracing is to follow 'the order written in the pseudocode' rather than 'the order you remember.'",
        ],
        example:
          "Let's write a trace table for finding target = 18 with binary search in the sorted array [3, 7, 12, 18, 25, 31, 40] (indices 0–6).\n\n| Step | low | high | mid | A[mid] | Comparison result        |\n|------|-----|------|-----|--------|--------------------------|\n|  1   |  0  |  6   |  3  |  18    | A[mid] = target → found! |\n\nLucky — found on the first try! Now let's search for target = 31.\n\n| Step | low | high | mid | A[mid] | Comparison result            |\n|------|-----|------|-----|--------|------------------------------|\n|  1   |  0  |  6   |  3  |  18    | 18 < 31 → low = mid + 1 = 4   |\n|  2   |  4  |  6   |  5  |  31    | A[mid] = target → found!      |\n\nWith 7 elements you need at most 3 comparisons (log₂7 ≈ 2.8). With linear search you would have needed up to 7 comparisons in the worst case.",
      },
    ],
  },
  {
    lessonId: "ib-cs-u4-l3",
    courseId: "ib-cs",
    subjectLabel: "IB Computer Science",
    emoji: "💻",
    unit: 4,
    lessonNum: 3,
    unitName: "Computational Thinking & Problem-Solving",
    title: "Sorting Algorithms and Algorithm Efficiency",
    subtitle:
      "Tracing bubble sort and selection sort + understanding 'why the choice of algorithm matters' through the concept of time complexity",
    overview:
      "If you only memorise bubble sort as code, you will collapse on the IB Paper 1 trace-table and efficiency-comparison questions. IB Topic 4 requires you to execute bubble sort and selection sort by hand step by step (tracing), to analyse the number of comparisons and swaps of the two algorithms, and even to understand the concept of time complexity informally. Algorithm-efficiency questions are not about memorising formulas like 'O(n²) vs O(n log n)' but are set as extended-response questions that ask you to explain 'how the execution time changes when the input size doubles.' In this lesson we fully trace the two sorting algorithms and connect efficiency intuitively.",
    objectives: [
      "Track, with a trace table, the process of comparing and swapping adjacent elements in each pass of bubble sort",
      "Track, with a trace table, the process of finding the minimum and swapping in each pass of selection sort",
      "Compare the number of comparisons and swaps of bubble sort and selection sort and analyse the situations in which each algorithm is more suitable",
      "Explain in informal language how algorithm efficiency changes with input size (n)",
      "Apply the method of verifying an algorithm's correctness with a trace table",
    ],
    sections: [
      {
        title: "Bubble Sort and Selection Sort — Principles and Tracing",
        subtitle:
          "Sorting an array by having values bubble up to the top, or by picking the minimum and placing it at the front",
        terms: [
          {
            term: "Bubble sort",
            def: "A sorting algorithm that repeatedly traverses the array, comparing two adjacent elements and swapping them if they are in the wrong order. At the end of each pass, the largest value 'bubbles up' to the end of the array. For n elements it needs at most n-1 passes, and the number of comparisons decreases by one with each pass. Worst-case time complexity O(n²).",
          },
          {
            term: "Selection sort",
            def: "A sorting algorithm that finds the minimum value of the unsorted part of the array and swaps it with the first position of the unsorted part. With each pass the sorted part grows by one. Unlike bubble sort, the number of swaps is fixed at exactly n-1. Worst-case time complexity O(n²).",
          },
          {
            term: "Pass",
            def: "A single traversal of the whole array (or the unsorted part) in a sorting algorithm. In bubble sort, when one pass ends, the largest unsorted element moves to its correct position. In selection sort, when one pass ends, the smallest unsorted element moves to its correct position.",
          },
          {
            term: "Swap",
            def: "An operation that exchanges the values of two variables. In IB pseudocode it is implemented using a temporary variable (temp) in the form temp = A[i] / A[i] = A[i+1] / A[i+1] = temp. The number of swaps is an important metric for comparing the efficiency of sorting algorithms.",
          },
        ],
        traps: [
          "In bubble-sort trace-table questions, ignoring the fact that the largest element is in place at the end of each pass and continuing to compare all the way to the already-sorted last element produces an incorrect trace. IB marking requires you to express accurately that the comparison range of each pass shrinks (n-1, n-2, n-3, ...). Mentioning that an optimised bubble sort uses a flag to terminate early if no swap occurs in a pass earns high marks.",
          "In questions comparing selection sort and bubble sort, writing that 'selection sort is always faster' is wrong. Both algorithms have O(n²) time complexity. The difference is the number of swaps — selection sort swaps exactly n-1 times, but bubble sort swaps O(n²) times in the worst case. Therefore, in environments where the cost of swapping is high (e.g. moving large records), selection sort is more practical.",
        ],
        example:
          "Let's write a trace table for sorting the array [5, 3, 8, 1, 4] with bubble sort.\n\nPass 1 (4 comparisons):\n  [5,3,8,1,4] → 5>3 swap → [3,5,8,1,4]\n  [3,5,8,1,4] → 5<8 keep → [3,5,8,1,4]\n  [3,5,8,1,4] → 8>1 swap → [3,5,1,8,4]\n  [3,5,1,8,4] → 8>4 swap → [3,5,1,4,8]  ← 8 in place\n\nPass 2 (3 comparisons):\n  [3,5,1,4,8] → 3<5 keep\n  [3,5,1,4,8] → 5>1 swap → [3,1,5,4,8]\n  [3,1,5,4,8] → 5>4 swap → [3,1,4,5,8]  ← 5 in place\n\nPass 3 (2 comparisons):\n  [3,1,4,5,8] → 3>1 swap → [1,3,4,5,8]\n  [1,3,4,5,8] → 3<4 keep  ← 4 in place\n\nPass 4 (1 comparison):\n  [1,3,4,5,8] → 1<3 keep → sorting complete!\n\nTotal comparisons: 4+3+2+1 = 10, swaps: 5. When n=5, the maximum is n(n-1)/2 = 10 comparisons — confirming O(n²).",
      },
      {
        title: "Algorithm Efficiency — The Relationship Between Input Size and Execution Time",
        subtitle:
          "How much slower does it get when n doubles — building an informal sense of time complexity",
        terms: [
          {
            term: "Algorithm efficiency",
            def: "The amount of resources (time, memory) an algorithm consumes to solve a given problem. Time efficiency is evaluated by the growth rate of the number of operations with respect to the input size n. IB asks about it informally as 'how does the execution time change when the input doubles?' rather than using formal Big-O notation.",
          },
          {
            term: "Linear time (O(n))",
            def: "Efficiency in which the execution time grows in proportion to the input size n. Linear search is the representative case — when the number of elements doubles, in the worst case the number of comparisons also doubles. Plotted on a graph it is a straight line (y = n).",
          },
          {
            term: "Logarithmic time (O(log n))",
            def: "Efficiency in which the execution time increases by only 1 step even when the input size n doubles. Binary search is the representative case — with an array of 1024 elements you compare at most 10 times, and with 2048 at most 11 times. Because it works quickly even on very large inputs, it is ideal for searching large-scale data.",
          },
          {
            term: "Quadratic time (O(n²))",
            def: "Efficiency in which the execution time grows in proportion to the square of the input size n. Bubble sort and selection sort are representative cases — when the number of elements doubles (n→2n), the number of operations quadruples ((2n)² = 4n²). No problem on small data, but it becomes severely slow on large-scale data.",
          },
        ],
        traps: [
          "In IB efficiency questions, asserting that 'binary search is always better than linear search' costs marks. When the precondition of binary search (a sorted array) is not met, or when there is very little data (e.g. 5 or fewer elements), linear search can be simpler and more practical. A balanced statement — 'you must choose the appropriate algorithm depending on the situation (data size, whether it is sorted, frequency of insertion)' — is the high-scoring answer.",
          "Many answers to algorithm-efficiency questions completely ignore 'memory usage.' Discussing only time efficiency earns partial marks. Example: linear search works without extra memory (O(1) space), but recursive binary search needs O(log n) extra memory for the recursion call stack. A high-scoring IB answer mentions both time and space (memory).",
        ],
        example:
          "Let's compare the efficiency of three algorithms for n = 10, 100, 1000.\n\n| Input size n | Linear search O(n) | Binary search O(log₂n) | Bubble sort O(n²) |\n|--------------|--------------------|------------------------|-------------------|\n|     10       |        10          |           4            |        100        |\n|    100       |       100          |           7            |      10,000       |\n|   1,000      |      1,000         |          10            |    1,000,000      |\n\nWhen n grows 10-fold (10→100→1000):\n- Linear search: increases 10-fold each time (linear)\n- Binary search: increases by only 3–4 steps (logarithmic)\n- Bubble sort: increases 100-fold each time (quadratic)\n\nPractical conclusion: for sorting 1,000,000 elements, bubble sort would need 10¹² operations, which is realistically impossible. This is exactly why an O(n log n) algorithm (e.g. merge sort) is needed — mentioning the existence of advanced sorting algorithms in IB can earn you additional analysis marks.",
      },
    ],
  },
];
