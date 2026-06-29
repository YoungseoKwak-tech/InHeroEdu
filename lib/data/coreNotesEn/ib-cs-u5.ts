/**
 * Core Notes English version — IB Computer Science Unit 5 (Abstract Data Structures).
 * Faithful translation of the Korean 일타강사 original; all objectives, terms,
 * traps, and examples preserved at the same depth.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const IB_CS_U5_EN: CoreNote[] = [
  {
    lessonId: "ib-cs-u5-l1",
    courseId: "ib-cs",
    subjectLabel: "IB Computer Science",
    emoji: "💻",
    unit: 5,
    lessonNum: 1,
    unitName: "Abstract Data Structures",
    title: "Recursion — The Magic of a Function Calling Itself",
    subtitle:
      "Base case, recursive case, and call stack — the three keys to using recursion safely without infinite loops",
    overview:
      "When you first encounter recursion, the idea that 'a function calls itself' can feel like an infinite loop. But on IB HL Paper 1 a recursion-trace question appears almost every year, and if you understand recursion only as 'something we use because the code is short,' you will get stuck on questions that ask why a base case is needed and how the call stack builds up. IB Topic 5 recursion rests on three key concepts: (1) base case — the condition that stops the recursion, (2) recursive case — the step that breaks the problem into a smaller sub-problem and calls itself, and (3) call stack — the structure in which each function call accumulates in and is resolved from memory. If you practise tracing these three concepts by hand on classic examples such as factorial and Fibonacci, you can reliably solve even 4–6 mark IB extended-response questions.",
    objectives: [
      "Define recursion and explain why both a base case and a recursive case are required",
      "Trace the execution of a given recursive function (factorial, Fibonacci, etc.) step by step using a call-stack diagram or a trace table",
      "Describe how a recursive function with a missing or incorrect base case causes a stack overflow",
      "Implement the same problem using both a recursive approach and an iterative approach and compare their respective advantages and disadvantages",
      "Analyse the common characteristics of problem types to which recursion naturally applies (tree traversal, divide and conquer, etc.)",
    ],
    sections: [
      {
        title: "Base Case, Recursive Case, and Call Stack",
        subtitle:
          "The three pillars of recursion — when to stop, how to split, and what happens in memory",
        terms: [
          {
            term: "Base case",
            def: "The condition in a recursive function where it no longer calls itself and returns a result directly. It is the escape hatch that makes recursion 'safe.' Example: in a factorial function, factorial(0) = 1 is the base case — once n reaches 0 it cannot decrease further, so it returns 1. Without a base case, infinite recursion occurs and a stack overflow results.",
          },
          {
            term: "Recursive case",
            def: "The step in a recursive function that breaks the problem into a smaller sub-problem and calls itself again. The key rule: each call must necessarily move closer to the base case. Example: factorial(n) = n × factorial(n-1) — calling with n-1 reduces n each time and converges towards the base case n=0.",
          },
          {
            term: "Call stack",
            def: "A stack-structured region of memory that stores each function's local variables, return address, and parameters whenever a function call occurs. On each recursive call a new stack frame is pushed; once the base case is reached and returns begin, the frames are removed in reverse order. The deeper the recursion, the greater the stack memory usage.",
          },
          {
            term: "Stack overflow",
            def: "A runtime error that occurs when recursive calls become so deep that there is no longer room to push a new frame onto the call stack. It is caused by a missing base case, or by an incorrect recursive case that never reaches the base case. Example: calling factorial(-1) recursively makes n go -1, -2, -3, ... never reaching the base case (0), causing a stack overflow.",
          },
        ],
        traps: [
          "On an IB exam, if you describe a recursive function but omit the 'base case' and write only the recursive case, you get partial marks. IB mark schemes assess the base case and the recursive case independently of each other. Furthermore, a complete answer must include not only the result that 'without a base case the function never stops' but also the memory-level explanation that 'the call stack keeps growing until a stack overflow occurs.'",
          "On a recursion vs iteration comparison question, writing that 'recursion is always more elegant and more efficient' is wrong. Recursion gives concise code and is natural for tree and divide-and-conquer problems, but because a stack frame is pushed on each call, it uses more memory than iteration. Iteration maintains only a single stack frame, so it is more memory-efficient. A top-mark IB answer gives a balanced account of the trade-off: 'code readability (favours recursion) vs memory and speed efficiency (favours iteration).'",
        ],
        example:
          "Let's trace the recursive calls of factorial(4) together using both the call stack and a trace.\n\nIB pseudocode:\n  FUNCTION factorial(n)\n    IF n = 0 THEN\n      RETURN 1          ← base case\n    ELSE\n      RETURN n * factorial(n - 1)   ← recursive case\n    END IF\n  END FUNCTION\n\nCall order (stack grows ↓):\n  factorial(4)  → 4 × factorial(3)\n    factorial(3)  → 3 × factorial(2)\n      factorial(2)  → 2 × factorial(1)\n        factorial(1)  → 1 × factorial(0)\n          factorial(0)  → 1  ← base case reached, returns begin\n\nReturn order (stack unwinds ↑):\n  factorial(0) = 1\n  factorial(1) = 1 × 1 = 1\n  factorial(2) = 2 × 1 = 2\n  factorial(3) = 3 × 2 = 6\n  factorial(4) = 4 × 6 = 24\n\nMaximum stack depth: 5 frames (n+1). If n is very large there is a risk of stack overflow, so it is safer to implement the factorial of a large n with a loop (iteration).",
      },
      {
        title: "Recursion vs Iteration — Same Problem, Different Approach",
        subtitle:
          "Implement factorial two ways and compare the advantages and disadvantages directly",
        terms: [
          {
            term: "Iterative approach",
            def: "A method that solves a problem through repeated execution using a loop (WHILE, FOR). Because it maintains a single stack frame, its memory usage is constant compared with recursion. Most recursive problems can also be implemented iteratively, but for naturally branching problems such as tree traversal the code becomes far more complex.",
          },
          {
            term: "Tail recursion",
            def: "A form of recursion in which the recursive call is the function's last operation, so the return value is passed through directly without any additional computation. Some languages and compilers optimise tail recursion into iteration (tail call optimisation), allowing execution without stack overflow. IB exams do not require you to implement it directly, but mentioning it when discussing recursion efficiency earns top marks.",
          },
          {
            term: "Divide and conquer",
            def: "An algorithmic paradigm that divides a problem into two or more independent sub-problems, solves (conquers) each recursively, and then combines the results. Merge sort and binary search are leading examples. Divide-and-conquer algorithms are naturally expressed with recursion and frequently achieve O(n log n) efficiency.",
          },
        ],
        traps: [
          "On IB Paper 1, when writing the trace of a recursive function, if you ignore the fact that return values are computed in reverse order and write the values in call order instead, you get a completely wrong trace. The essence of recursion is 'call on the way down, compute on the way up' — after returns begin at the base case, control returns to each call site where the remaining operation (e.g. n ×) is executed. When filling in a trace table, get into the habit of filling the return-value column from the base case upwards.",
        ],
        example:
          "Let's compare factorial(5) using IB pseudocode in both the recursive and iterative forms.\n\n[Recursive version]\n  FUNCTION factorial(n)\n    IF n = 0 THEN\n      RETURN 1\n    ELSE\n      RETURN n * factorial(n - 1)\n    END IF\n  END FUNCTION\n  Call: factorial(5) → uses 5 stack frames, concise code\n\n[Iterative version]\n  FUNCTION factorial(n)\n    result = 1\n    WHILE n > 0 DO\n      result = result * n\n      n = n - 1\n    END WHILE\n    RETURN result\n  END FUNCTION\n  Call: factorial(5) → uses only 1 stack frame, excellent memory efficiency\n\nComparison summary:\n  Recursion: code readability ↑, stack memory O(n) usage, risk of stack overflow at deep n\n  Iteration: code length ↑, stack memory O(1) usage, no risk of stack overflow\n\nIB answer point: 'They produce the same result, but recursion's memory usage is proportional to n whereas iteration's is constant.'",
      },
    ],
  },
  {
    lessonId: "ib-cs-u5-l2",
    courseId: "ib-cs",
    subjectLabel: "IB Computer Science",
    emoji: "💻",
    unit: 5,
    lessonNum: 2,
    unitName: "Abstract Data Structures",
    title: "Static and Dynamic Structures, Arrays, and Linked Lists",
    subtitle:
      "Fixed-size arrays (static) and linked lists that grow at runtime (dynamic) — understanding the fundamental difference in memory structure",
    overview:
      "Arrays and linked lists look the same in that 'both store a list,' but the way they operate in memory is fundamentally different. On IB HL Paper 1 you frequently see questions that ask you to draw linked-list node insertion/deletion diagrams or to write the order of pointer updates in pseudocode. If an array is a 'storage cabinet with pre-defined slots,' a linked list is a 'chain in which each node carries the address of the next node.' A static data structure declares its size in advance and allocates memory at compile time, whereas a dynamic data structure allocates and releases memory at runtime as needed. In this lesson we fully organise the access methods for 1D/2D arrays and the structure and insertion/deletion operations of singly, doubly, and circular linked lists using diagrams and pseudocode.",
    objectives: [
      "Explain the difference in memory-allocation method between static and dynamic data structures and compare the advantages and disadvantages of each",
      "Write the element-access method for 1D and 2D arrays in IB pseudocode and perform index calculations correctly",
      "Represent the node structure (data and pointer) of a singly linked list with a diagram and write its insertion, deletion, and search operations in pseudocode",
      "Explain the structural characteristics of doubly linked lists and circular linked lists and how they differ from a singly linked list",
      "Compare the time complexity of insertion, deletion, and search operations for arrays and linked lists and select the data structure appropriate for a given situation",
    ],
    sections: [
      {
        title: "Static Data Structures and Arrays — Fixed-Size Storage",
        subtitle:
          "Declaration, access, and limits of 1D/2D arrays — in IB pseudocode array indices start from 0",
        terms: [
          {
            term: "Static data structure",
            def: "A data structure whose size is fixed before the program runs (at compile time) and cannot be changed during execution. The array is the most representative static data structure. Advantage: random access by index is fast at O(1). Disadvantage: because the size must be decided in advance, if there is more data than expected there is not enough space, and if there is less, memory is wasted.",
          },
          {
            term: "Dynamic data structure",
            def: "A data structure whose size changes as needed while the program runs (at runtime). Linked lists, stacks, queues, and trees are dynamic data structures. Advantage: memory is used flexibly according to the amount of data. Disadvantage: each node must store a pointer (address) in addition to its data, so there is more memory overhead than an array, and random access is slow at O(n).",
          },
          {
            term: "Two-dimensional array",
            def: "A grid-shaped array consisting of rows and columns. In IB pseudocode it is accessed in the form A[row][col] (both indices start from 0). Example: in a 3×3 matrix, A[1][2] is the element in the 2nd row, 3rd column. It is frequently used to represent image pixels, game boards, mathematical matrices, and so on.",
          },
          {
            term: "Pointer",
            def: "A variable that stores the memory address of another piece of data (a node). In a linked list, each node consists of data and a pointer (the next pointer) that points to the address of the next node. The pointer of the last node is set to null (pointing to nothing) to mark the end of the list.",
          },
        ],
        traps: [
          "On IB exams a common mistake with 2D array indices is to write them in column-row order rather than row-column order. The IB pseudocode standard is A[row][col], where the first index is the row and the second is the column. Also always check that if the array size is n, the valid index range is 0 to n-1. Accessing A[n] is out of bounds.",
          "On a static vs dynamic data-structure comparison question, asserting that 'dynamic is always better' loses marks. Arrays (static) have the advantages of O(1) random access, good cache locality, and no pointer overhead. A top-mark IB answer includes the situation-specific selection logic: 'when the data size is predictable and frequent random access is required, use an array; when the data size is variable and insertion/deletion is frequent, a linked list is appropriate.'",
        ],
        example:
          "Let's represent a 3×3 tic-tac-toe board as a 2D array and write an algorithm in IB pseudocode that outputs the whole thing.\n\nArray declaration and initialisation (conceptual):\n  board[0][0] = 'X'  board[0][1] = 'O'  board[0][2] = 'X'\n  board[1][0] = ' '  board[1][1] = 'X'  board[1][2] = 'O'\n  board[2][0] = 'O'  board[2][1] = ' '  board[2][2] = 'X'\n\nOutputting the whole board in IB pseudocode:\n  loop row from 0 to 2\n    loop col from 0 to 2\n      OUTPUT board[row][col]\n    end loop\n  end loop\n\nWhen traversing a 2D array with a nested loop, the outer loop controls the rows and the inner loop controls the columns. With row=0 fixed, col changes 0→1→2, so the first row is output in full first.",
      },
      {
        title: "Linked Lists — Structure and Operations of Singly, Doubly, and Circular Lists",
        subtitle:
          "A chain built from nodes and pointers — understanding through diagrams why insertion/deletion is more efficient than in an array",
        terms: [
          {
            term: "Singly linked list",
            def: "The most basic linked list, in which each node holds only data and a single pointer (next) to the next node. A head pointer points to the first node, and the last node's next is null. Traversal is possible only front-to-back (one-directional). Mid-list insertion/deletion requires an O(n) search to find the position, but once the position is known only 2 pointers need to be updated, so insertion/deletion is O(1).",
          },
          {
            term: "Doubly linked list",
            def: "A linked list in which each node holds two pointers: data, a next-node pointer (next), and a previous-node pointer (prev). Bidirectional traversal is possible and the previous node can be accessed directly, so the deletion operation is more convenient than in a singly linked list. Disadvantage: because each node stores 2 pointers, memory usage is higher.",
          },
          {
            term: "Circular linked list",
            def: "A linked list in which the last node's next pointer points not to null but to the first node (head). Because it has a cyclic structure, the list can be traversed endlessly. It is suited to applications that require cycling, such as round-robin scheduling in an operating system or turn management in a multiplayer game.",
          },
          {
            term: "Insertion in singly linked list",
            def: "The procedure for inserting a new node B between node A and node C: (1) B.next = C (the new node points to C) → (2) A.next = B (A points to the new node). The order of the two steps matters — you must do (1) first so that you do not lose the pointer to C. If you do (2) first, the pointer to C is lost and the list breaks.",
          },
        ],
        traps: [
          "On IB exams the most common mistake on a linked-list insertion diagram question is getting the order of pointer updates wrong. For a mid-list insertion you must always 'set the new node's next first, then update the previous node's next.' Reversing the order breaks the list. For deletion, you update the pointer so that the node before the node to be deleted points to the deleted node's next — also mention that in a singly linked list, deletion requires access to the previous node, so you must search from the head.",
          "On a question comparing singly and doubly linked lists, writing that 'doubly is always better' loses marks. A doubly linked list makes reverse traversal and deletion convenient, but because each node stores 2 pointers there is large memory overhead. The number of pointers to update on insertion/deletion also rises to 2, making the code more complex. A top-mark IB answer includes the judgement that 'if the application does not require reverse traversal, a singly linked list is more appropriate in terms of memory efficiency.'",
        ],
        example:
          "Let's trace inserting 15 between 10 and 20 in the singly linked list [10 → 20 → 30 → null] using a diagram and pseudocode.\n\nState before insertion:\n  head → [10 | next→] → [20 | next→] → [30 | null]\n\nCreate the new node:\n  newNode.data = 15\n  newNode.next = null (initialised)\n\nPointer updates (order matters!):\n  Step 1: newNode.next = current.next   // newNode.next → [20]\n  Step 2: current.next = newNode        // [10].next → newNode\n\nState after insertion:\n  head → [10 | next→] → [15 | next→] → [20 | next→] → [30 | null]\n\nIf you swap the order of steps 1 and 2:\n  Wrong step 1: current.next = newNode   // [10].next → newNode (pointer to 20 is lost!)\n  Wrong step 2: newNode.next = ???        // no way to reach 20 → list broken\n\nConclusion: you must set the new node's next first and update the previous node's next afterwards to be safe.",
      },
    ],
  },
  {
    lessonId: "ib-cs-u5-l3",
    courseId: "ib-cs",
    subjectLabel: "IB Computer Science",
    emoji: "💻",
    unit: 5,
    lessonNum: 3,
    unitName: "Abstract Data Structures",
    title: "Stacks, Queues, Binary Trees, and Traversal",
    subtitle:
      "The real-world applications of LIFO vs FIFO data structures, and how to read a tree with preorder, inorder, and postorder traversal",
    overview:
      "If you understand a stack and a queue as 'special lists with different insertion/deletion directions,' you can easily solve the push/pop/enqueue/dequeue operation questions on IB exams. Stacks are used for the recursion call stack, bracket checking, and reverse output; queues are used for process scheduling and printer queues. A binary tree is a non-linear data structure that represents hierarchical data, and the most important thing in IB HL is the three traversal algorithms — preorder (root → left → right), inorder (left → root → right), and postorder (left → right → root). The facts that inorder traversal outputs sorted order in a binary search tree, and that postorder traversal generates the Reverse Polish Notation (RPN) of an expression tree, are recurring IB extended-response points.",
    objectives: [
      "Define the LIFO principle of a stack and write the push, pop, and peek operations in IB pseudocode",
      "Define the FIFO principle of a queue and write the enqueue, dequeue, and isEmpty operations in IB pseudocode",
      "Define binary tree terminology (root, leaf, internal node, level, height, subtree) and identify each element in a given tree diagram",
      "For a given binary tree, trace by hand the preorder, inorder, and postorder traversal orders and write out the resulting lists",
      "Explain why inorder traversal produces ascending output in a binary search tree, and analyse why postorder traversal generates the Reverse Polish Notation of an expression tree",
    ],
    sections: [
      {
        title: "Stacks and Queues — LIFO and FIFO",
        subtitle:
          "The stack where the last in is the first out and the queue where the first in is the first out — the operations and applications of the two data structures",
        terms: [
          {
            term: "Stack",
            def: "A data structure that operates on the LIFO (Last In First Out) principle. The most recently inserted element is removed first. Key operations: push (add an element to the top), pop (remove and return the top element), peek or top (inspect the top element without removing it), isEmpty (check whether the stack is empty). Applications: the function call stack, bracket-pair checking, the browser back button.",
          },
          {
            term: "Queue",
            def: "A data structure that operates on the FIFO (First In First Out) principle. The element inserted first is removed first. Key operations: enqueue (add an element to the rear), dequeue (remove and return the front element), isEmpty (check whether the queue is empty). Applications: the printer queue, operating-system process scheduling, breadth-first search (BFS).",
          },
          {
            term: "Overflow / Underflow",
            def: "Overflow: an error that occurs when you try to add a new element to a stack or queue that is already full. It occurs only in array-based, fixed-size data structures. Underflow: an error that occurs when you attempt a pop or dequeue on an empty stack or queue. Both errors are prevented by checking isEmpty (underflow) or isFull (overflow) before the operation.",
          },
          {
            term: "LIFO / FIFO",
            def: "LIFO (Last In First Out): the principle that the most recently inserted data is deleted first. The way a stack operates. FIFO (First In First Out): the principle that the data inserted first is deleted first. The way a queue operates. In IB extended-response questions, writing the full name and meaning of both terms accurately is part of the mark scheme.",
          },
        ],
        traps: [
          "On IB exams, when describing stack operations you must make clear that 'you add at the top and remove from the top.' Simply writing that it 'operates in LIFO fashion' is a 1-mark answer. A top-mark answer specifically connects the behaviour of the push/pop operations (how the top pointer is updated) with a real application example (in the recursion call stack each function call is pushed and popped on return).",
          "Questions that confuse queues and stacks are frequently set. Remember by pairing the application with the data structure: 'the printer queue prints the document sent first first, so it is a queue (FIFO); function-call management returns the most recently called function first, so it is a stack (LIFO).' On IB exams, a question that gives only the application and asks you to choose the appropriate data structure assesses this pairing ability.",
        ],
        example:
          "Let's implement a bracket-matching algorithm with a stack and trace '{[()]}' and '{[(]}' each.\n\nAlgorithm (pseudocode summary):\n  FOR each character in string DO\n    IF character is '(', '[', or '{' THEN push onto stack\n    IF character is ')', ']', or '}' THEN\n      IF stack is empty THEN output 'Invalid' and stop\n      IF top of stack matches closing bracket THEN pop\n      ELSE output 'Invalid' and stop\n  END FOR\n  IF stack is empty THEN output 'Valid' ELSE output 'Invalid'\n\nTrace 1: '{[()]}'\n  { → push → stack: [{]\n  [ → push → stack: [{, []\n  ( → push → stack: [{, [, (]\n  ) → pop (matches () → stack: [{, []\n  ] → pop (matches [) → stack: [{]\n  } → pop (matches {) → stack: []\n  End: stack is empty → Valid ✓\n\nTrace 2: '{[(]}'\n  {  [  ( pushed in turn → stack: [{, [, (]\n  ] → top is ( but it does not match ] → Invalid ✗\n\nThanks to the stack's LIFO, the most recently opened bracket is at the top, so pair-checking is natural.",
      },
      {
        title: "Binary Trees and Traversal — Preorder, Inorder, Postorder",
        subtitle:
          "When you visit the root determines the name of the traversal — how to trace the result of the three traversals by hand",
        terms: [
          {
            term: "Binary tree terminology",
            def: "Root: the topmost node of the tree (it has no parent). Leaf: a terminal node with no children. Internal node: a non-terminal node with at least one child. Level: the number of edges from the root to the node (the root's level = 0). Height: the number of edges from the root to the deepest leaf. Subtree: a partial tree rooted at a particular node.",
          },
          {
            term: "Preorder traversal",
            def: "A binary tree traversal that visits in the order root → left subtree → right subtree. The name comes from 'visiting the root first (pre).' It is used to copy a tree or to generate prefix notation of an expression. It is naturally implemented with recursion, applying the same rule repeatedly in each subtree.",
          },
          {
            term: "Inorder traversal",
            def: "A binary tree traversal that visits in the order left subtree → root → right subtree. Performing inorder traversal on a binary search tree (BST) outputs the stored values in ascending order. This property is used to verify that a BST is sorted.",
          },
          {
            term: "Postorder traversal",
            def: "A binary tree traversal that visits in the order left subtree → right subtree → root. The name comes from 'visiting the root last (post).' Performing postorder traversal on an expression tree generates Reverse Polish Notation (RPN). It is also used when freeing tree memory (release children first).",
          },
        ],
        traps: [
          "On IB exams the most common mistake when writing a binary tree traversal result is confusing 'the name of the traversal with the order of visiting the root.' Pre (preorder) = root first, In (inorder) = root in the middle, Post (postorder) = root last — memorise these three correspondences. When actually traversing, remember that you apply the same rule recursively in each subtree too. When tracing node by node by hand, always first check 'where is the root of the current subtree.'",
          "Simply presenting the fact that 'inorder traversal outputs sorted order' in a binary search tree (BST) as a 'memorised fact' will not earn IB top marks. You must explain why: 'by the definition of a BST, at every node the values of the left subtree < the root value < the values of the right subtree, so inorder traversal, which visits left → root → right, automatically produces ascending output.'",
        ],
        example:
          "Let's trace all three traversal results on the following binary tree.\n\nTree structure:\n           4\n          / \\\n         2   6\n        / \\ / \\\n       1  3 5  7\n\nPreorder traversal (root → left → right):\n  visit 4 → left subtree (2, 1, 3) → right subtree (6, 5, 7)\n  Result: 4, 2, 1, 3, 6, 5, 7\n  Trace: visit 4 → go left to 2 → visit 2 → go left to 1 → visit 1 (leaf)\n        → back to 2 → go right to 3 → visit 3 (leaf) → back to 4\n        → go right to 6 → visit 6 → go left to 5 → visit 5 (leaf)\n        → back to 6 → go right to 7 → visit 7 (leaf)\n\nInorder traversal (left → root → right):\n  Result: 1, 2, 3, 4, 5, 6, 7  ← ascending! confirms it is a BST\n\nPostorder traversal (left → right → root):\n  Result: 1, 3, 2, 5, 7, 6, 4\n  Trace: 1(leaf) → 3(leaf) → visit 2 → 5(leaf) → 7(leaf) → visit 6 → visit 4(root)\n\nIB exam point: the inorder result '1 2 3 4 5 6 7' is sorted in ascending order → this tree is a valid BST.",
      },
    ],
  },
];
