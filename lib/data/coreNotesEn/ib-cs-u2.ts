/**
 * Core Notes English version — IB Computer Science Unit 2 (Computer Organization).
 * Full IB DP CS Topic 2 content preserved (objectives · terms · traps · example) + narrative exposition.
 * Faithful translation of the Korean 일타강사 source file.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const IB_CS_U2_EN: CoreNote[] = [
  {
    lessonId: "ib-cs-u2-l1",
    courseId: "ib-cs",
    subjectLabel: "IB Computer Science",
    emoji: "💻",
    unit: 2,
    lessonNum: 1,
    unitName: "Computer Organization",
    title: "Internal CPU Architecture and the Machine Instruction Cycle",
    subtitle: "The precise mechanism by which the Control Unit, ALU, and registers cooperate to execute a single instruction",
    overview:
      "Memorizing the CPU as a 'fast calculator' will leave you stuck on IB Paper 1 architecture questions. IB Topic 2 dissects the CPU into three components — Control Unit, ALU, and registers — and asks how those components exchange data with memory through the MAR, MDR, PC, and IR registers. Once you understand the fetch→decode→execute→store cycle as a data-flow story, you can reason logically about why clock speed, core count, and cache size each improve performance. This lesson organizes the CPU internals around roles rather than circuit diagrams.",
    objectives: [
      "Describe the individual roles of the Control Unit (CU), Arithmetic Logic Unit (ALU), and registers that make up the CPU",
      "Explain in sequence the role that MAR, MDR, PC, and IR play at each stage of the machine instruction cycle (fetch–decode–execute)",
      "Explain, with the underlying mechanism, how clock speed, core count, and cache size each affect CPU performance",
      "Analyze how the Program Counter is updated for both sequential execution and branch (jump) instructions",
      "Evaluate the performance difference and limitations between single-core and multi-core CPUs using real-world examples",
    ],
    sections: [
      {
        title: "Internal CPU Structure — CU, ALU, and Registers",
        subtitle: "How three components act as one team to process an instruction",
        terms: [
          {
            term: "Control Unit (CU)",
            def: "The component inside the CPU that interprets instructions and issues control signals to the ALU, registers, memory, and I/O devices so that they operate in the correct sequence. The CU does not perform computations itself — it only directs 'what to do and when.'",
          },
          {
            term: "Arithmetic Logic Unit (ALU)",
            def: "The circuit that actually performs arithmetic operations (addition, subtraction, multiplication, etc.) and logical operations (AND, OR, NOT, etc.). Operands are received from registers and the result is stored back in a register or memory.",
          },
          {
            term: "Memory Address Register (MAR)",
            def: "A register that temporarily holds the address of the memory cell the CPU wants to read from or write to. During the fetch stage, the PC value is copied into the MAR, which acts as the first gateway when the CPU requests an instruction from memory.",
          },
          {
            term: "Memory Data Register (MDR)",
            def: "A register that temporarily holds data just read from memory (an instruction or value) or data about to be written to memory. It acts as a 'buffer window' between the CPU and main memory.",
          },
        ],
        traps: [
          "When an IB exam question asks you to 'explain the difference between MAR and MDR,' the most common wrong answer confuses address with data. MAR stores a location (address); MDR stores the content at that location (data or instruction). Memorize it as 'address → MAR, content → MDR,' and explicitly state the fetch-stage sequence (PC → MAR → memory request → MDR → IR) to earn full marks.",
          "Many answers omit the fact that the ALU also performs logical operations. Writing only addition and subtraction because of the word 'arithmetic' in the name earns only partial credit. Always state that AND, OR, NOT, and comparison operations are also part of the ALU's role.",
        ],
        example:
          "Let's trace the fetch–decode–execute cycle step by step using the MAR and MDR data flow. Suppose the program executes a 'LOAD R1, 200' instruction stored at memory address 100. ① The Program Counter (PC) value of 100 is copied into the MAR. ② The Control Unit sends a read signal to memory; the instruction bit pattern at address 100 arrives in the MDR. ③ The instruction moves from the MDR to the Instruction Register (IR) and the PC increments to 101. ④ The CU decodes the IR and issues the signal 'place the value at address 200 into R1.' ⑤ MAR is loaded with 200, the corresponding value arrives from memory into the MDR, and is then stored in R1. This sequence is the skeleton of every instruction execution.",
      },
      {
        title: "CPU Performance Factors — Clock Speed, Cores, and Cache",
        subtitle: "Why judging a CPU by a single number will always lead you astray",
        terms: [
          {
            term: "Clock speed",
            def: "The number of cycles a CPU performs per second. The unit is hertz (Hz); modern CPUs operate in the gigahertz (GHz) range. A higher clock speed allows more instructions to be processed per unit of time, but heat generation and power consumption increase accordingly.",
          },
          {
            term: "Multi-core",
            def: "A CPU chip design that contains two or more independent cores capable of executing instructions in parallel. Performance gains are significant for tasks that can run concurrently, but single-threaded software is still bound by the speed of a single core regardless of core count.",
          },
          {
            term: "Cache memory",
            def: "A small, ultra-fast memory layer between the CPU core and main memory (RAM). It pre-stores frequently accessed data and instructions to reduce the latency of RAM access (tens to hundreds of cycles). Cache is divided into L1 (smallest and fastest), L2, and L3 levels.",
          },
          {
            term: "Bus width",
            def: "The number of bits that can be transferred in a single operation between the CPU and memory or I/O devices. A 32-bit bus transfers 4 bytes at a time; a 64-bit bus transfers 8 bytes. A wider bus increases bandwidth and overall throughput.",
          },
        ],
        traps: [
          "When an IB question asks you to state two ways to improve CPU performance, the trap is listing only clock speed and core count. A stronger answer also includes increasing cache size or widening the bus. The key is to explain in at least one sentence why each factor improves performance — a bare list earns only 2 marks.",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ib-cs-u2-l2",
    courseId: "ib-cs",
    subjectLabel: "IB Computer Science",
    emoji: "💻",
    unit: 2,
    lessonNum: 2,
    unitName: "Computer Organization",
    title: "Memory Hierarchy and Binary / Data Representation",
    subtitle: "Understanding the RAM/ROM/cache hierarchy, and how numbers, characters, and negative values are stored in 0s and 1s",
    overview:
      "Memorizing memory as 'RAM = temporary, storage = permanent' will leave you stuck on IB Paper 2 data-representation questions. IB Topic 2 covers — all in one unit — the speed/capacity trade-offs of the memory hierarchy (cache → RAM → secondary storage), binary and hexadecimal conversion, two's complement for negative numbers, and character encoding (ASCII and Unicode). This lesson connects the memory hierarchy and data-representation principles through a single question: how does a computer store and interpret information?",
    objectives: [
      "Compare the speed, capacity, and cost trade-offs of the memory hierarchy (cache, RAM, secondary storage)",
      "Convert between binary and hexadecimal and decimal, and from decimal to binary and hexadecimal",
      "Represent 8-bit negative numbers using two's complement and calculate the representable range",
      "Explain how ASCII and Unicode (UTF-8) encode characters into bits and describe the key differences between them",
      "Perform bit/byte/kilobyte unit conversions and calculate the storage capacity required for a given data size",
    ],
    sections: [
      {
        title: "Memory Hierarchy",
        subtitle: "Faster means more expensive and smaller — the speed/capacity/cost pyramid",
        terms: [
          {
            term: "Memory hierarchy",
            def: "A layered arrangement of storage devices in which speed decreases and capacity and unit cost increase as you move from registers → cache (L1/L2/L3) → RAM → secondary storage. The CPU always looks for data in the closest (fastest) layer first and descends to lower layers only if the data is not found.",
          },
          {
            term: "RAM (Random Access Memory)",
            def: "Volatile main memory that stores the programs and data currently being executed by the CPU. Any cell can be accessed in equal time — hence 'random access.' Contents are lost when power is removed.",
          },
          {
            term: "ROM (Read-Only Memory)",
            def: "Non-volatile memory whose contents are written at manufacture and can only be read during normal operation. It stores firmware (BIOS/UEFI) that initialises hardware at startup and retains its contents when the power is off.",
          },
          {
            term: "Cache hit rate",
            def: "The proportion of times the CPU finds the data it needs in the cache. A higher hit rate reduces the number of RAM accesses and therefore improves effective processing speed. Increasing cache size generally raises the hit rate.",
          },
        ],
        traps: [
          "Grouping RAM and secondary storage together as the same 'storage device' will cost you marks. IB requires a clear distinction between the two on two criteria: volatility and access speed relative to the CPU. Always compare them using the terms 'volatile/non-volatile' and 'access speed.'",
          "A common error is classifying cache memory as a type of secondary storage. Cache is a primary storage layer located on or immediately adjacent to the CPU core — it is entirely different from secondary storage. State its position in the hierarchy (just below registers) and its speed (much faster than RAM) together.",
        ],
        example:
          "Let's appreciate the speed differences in the memory hierarchy. L1 cache sits on the same chip as the CPU, so access completes in 1–4 cycles (sub-nanosecond). RAM takes around 100 cycles; an SSD takes tens of thousands of cycles or more. When a program reads the same array element repeatedly, the first access causes a cache miss and copies the data from RAM into the cache; all subsequent accesses are cache hits. This 'principle of locality' is why a small cache can dramatically boost overall performance.",
      },
      {
        title: "Binary, Hexadecimal, and Two's Complement",
        subtitle: "Three core methods by which a computer represents numbers and negative values in bits",
        terms: [
          {
            term: "Binary (Base-2)",
            def: "A number system that uses only the digits 0 and 1. It maps directly to the on/off states of electrical signals in computer circuitry. Each digit position represents a power of 2, with the rightmost position being 2⁰ (= 1).",
          },
          {
            term: "Hexadecimal (Base-16)",
            def: "A number system using digits 0–9 and letters A–F (representing 10–15). Because a single hex digit corresponds exactly to four binary digits, hexadecimal provides a compact notation for long binary strings. It frequently appears in memory addresses, colour codes, and machine-code listings.",
          },
          {
            term: "Two's complement",
            def: "A method for representing negative integers in binary. In an n-bit system, the two's complement of a positive integer x is obtained by inverting all bits (one's complement) and then adding 1; the result is interpreted as −x. An 8-bit two's complement scheme can represent values from −128 to +127.",
          },
          {
            term: "Character encoding",
            def: "A standard that maps characters (letters, symbols, digits) to specific integer codes. ASCII uses 7 bits (values 0–127) to represent English letters, digits, and symbols. Unicode (UTF-8) uses variable-length byte sequences to represent every character in every written language.",
          },
        ],
        traps: [
          "When asked for the range of 8-bit two's complement negative numbers, many students write '−127 to +127.' The correct range is −128 to +127. The most-significant bit (MSB) of 1 represents the minimum value −128, and +128 cannot be expressed in 8 bits. Always apply the formula −(2^(n−1)) to +(2^(n−1) − 1) for range questions.",
          "Using decimal as an intermediate step when converting between binary and hexadecimal doubles the time needed. Binary ↔ hexadecimal conversion is a direct 4-bit grouping: practice converting 1010 1101₂ straight to AD₁₆ without passing through decimal.",
        ],
        example:
          "Let's practise binary ↔ hexadecimal conversion and two's complement negative representation together.\n\n[Binary → Hexadecimal]\nGroup the binary number 1011 0110₂ into 4-bit nibbles: 1011 / 0110\n1011₂ = 11₁₀ = B₁₆, 0110₂ = 6₁₆\nTherefore 1011 0110₂ = B6₁₆\n\n[Two's complement of −46 (8-bit)]\n① 46₁₀ = 0010 1110₂\n② Invert all bits (one's complement): 1101 0001₂\n③ Add 1: 1101 0010₂\nVerification: MSB is 1 so the value is negative; −(128 − 64 − 16 − 2) = −46 ✓",
      },
      {
        title: "ASCII, Unicode, and Data Units",
        subtitle: "Characters into bits, bits into bytes — encoding and unit calculations",
        terms: [
          {
            term: "ASCII (American Standard Code for Information Interchange)",
            def: "A character-encoding standard that uses 7 bits (or 8 bits in extended form) to represent 128 (or 256) characters. It includes uppercase and lowercase English letters, digits 0–9, punctuation, and control characters. Each character maps to a fixed integer — for example, 'A' = 65₁₀ = 01000001₂.",
          },
          {
            term: "Unicode",
            def: "An international standard that assigns a unique code point (U+0000 to U+10FFFF) to every character, symbol, and emoji of every language in the world. UTF-8 is a variable-length encoding scheme that represents ASCII characters in 1 byte and all other characters in 2–4 bytes.",
          },
          {
            term: "Bit and Byte",
            def: "A bit is a single binary unit of information — either 0 or 1. 8 bits = 1 byte. 1 kilobyte (KB) = 1,024 bytes; 1 megabyte (MB) = 1,024 KB. In IB exams, check the context to determine whether 1 KB means 1,000 bytes (decimal prefix) or 1,024 bytes (binary prefix).",
          },
        ],
        traps: [
          "Writing Unicode and UTF-8 as if they are the same thing will cost you marks. Unicode is the standard that assigns a code point to each character; UTF-8 is one encoding scheme — an implementation — that maps those code points to actual bytes. Always distinguish them in IB answers as 'standard vs. encoding method.'",
        ],
        example: null,
      },
    ],
  },
  {
    lessonId: "ib-cs-u2-l3",
    courseId: "ib-cs",
    subjectLabel: "IB Computer Science",
    emoji: "💻",
    unit: 2,
    lessonNum: 3,
    unitName: "Computer Organization",
    title: "Boolean Logic and Logic Gates",
    subtitle: "From AND, OR, and NOT to NAND, NOR, and XOR — understanding digital logic through truth tables and simple circuits",
    overview:
      "Logic gates in IB CS are not a list of symbols to memorise — they are the fundamental language of every digital circuit. The fact that the CPU's ALU can perform addition and comparison, and that a RAM cell can store 0 or 1, are both the result of gate combinations. IB Topic 2 requires the truth table, symbol, and Boolean expression for six gates (AND, OR, NOT, NAND, NOR, XOR) and tests your ability to calculate the output of circuits that connect two or three gates. This lesson approaches logic gates not through rote memorisation but by understanding what logical question each gate answers 'YES' to.",
    objectives: [
      "Write the Boolean expression, symbol, and truth table for AND, OR, NOT, NAND, NOR, and XOR gates accurately",
      "Calculate the output of a combinational logic circuit consisting of two or more connected gates using a truth table",
      "Explain why the NAND gate is functionally complete",
      "Describe the role that the XOR gate plays in a half-adder design",
      "Simplify a Boolean expression to represent an equivalent circuit with fewer gates",
    ],
    sections: [
      {
        title: "AND, OR, NOT — The Three Fundamental Gates",
        subtitle: "Every digital circuit begins as a combination of these three gates",
        terms: [
          {
            term: "AND gate",
            def: "A gate whose output is 1 only when both inputs are 1. Boolean expression: A AND B = A · B. Truth table: (0,0)→0, (0,1)→0, (1,0)→0, (1,1)→1. It embodies intersection logic — 'both conditions must be true simultaneously.'",
          },
          {
            term: "OR gate",
            def: "A gate whose output is 1 when at least one input is 1. Boolean expression: A OR B = A + B. Truth table: (0,0)→0, (0,1)→1, (1,0)→1, (1,1)→1. It embodies union logic — 'at least one condition being true is sufficient.'",
          },
          {
            term: "NOT gate (Inverter)",
            def: "A single-input gate that inverts its input. Boolean expression: NOT A = Ā (A with an overbar). 0→1, 1→0. It is a fundamental building block that combines with other gates to produce NAND, NOR, XNOR, and so on.",
          },
          {
            term: "Boolean algebra",
            def: "A system of logical operations whose only values are true (1) and false (0). Using the AND, OR, and NOT operations together with laws such as De Morgan's, identity, and absorption laws, Boolean expressions can be simplified to reduce the number of gates required in a circuit.",
          },
        ],
        traps: [
          "Confusing the OR gate with the XOR gate is a frequent error. OR outputs 1 even when both inputs are 1; XOR (exclusive OR) outputs 1 only when the two inputs are different. Always verify the last row (1,1) of the truth table: OR gives 1, XOR gives 0.",
        ],
        example:
          "Let's design a combinational circuit using AND, OR, and NOT. A security system requires that a card (A) must be detected AND a PIN (B) must be correct for the door to open: F = A · B (one AND gate). Adding the condition that an administrator override (C) opens the door without a card or PIN gives F = (A · B) + C (the AND output is combined with C via an OR gate). Translating real-world conditions into Boolean expressions and implementing them with gates is the archetypal IB design question.",
      },
      {
        title: "NAND, NOR, XOR — Derived Gates and Functional Completeness",
        subtitle: "NAND alone is sufficient to build every logic circuit that exists",
        terms: [
          {
            term: "NAND gate",
            def: "A gate equivalent to an AND gate followed by a NOT gate. Boolean expression: A NAND B = NOT(A · B) = (A · B)'. Output is 0 only when both inputs are 1; all other input combinations give 1. NAND alone can implement AND, OR, NOT, and every other gate, making it the sole single-gate set that is functionally complete.",
          },
          {
            term: "NOR gate",
            def: "A gate equivalent to an OR gate followed by a NOT gate. Boolean expression: A NOR B = NOT(A + B) = (A + B)'. Output is 1 only when both inputs are 0. NOR is also functionally complete on its own and is commonly used as a basic building block in CMOS circuits.",
          },
          {
            term: "XOR gate (Exclusive OR)",
            def: "A gate whose output is 1 only when the two inputs differ. Boolean expression: A XOR B = A ⊕ B = (A · B') + (A' · B). Used to compute the sum bit in a half-adder. Note that (1,1)→0.",
          },
          {
            term: "Functional completeness",
            def: "The property of a single gate or set of gates that allows any possible Boolean function to be implemented using only that gate or set. Both NAND and NOR are individually functionally complete. This property means that a real integrated circuit can be designed using only one type of gate.",
          },
        ],
        traps: [
          "Writing only 'because it can build every gate' as the explanation for NAND's functional completeness earns only partial credit. A high-scoring IB answer must present at least one concrete NAND construction of a basic gate — for example, NOT A = A NAND A, and A AND B = NOT(A NAND B).",
          "The most common XOR mistake is writing (1,1)→1 as if it were an OR gate. Remember: eXclusive — the two inputs must exclusively differ for the output to be 1. Because (1,1) means the inputs are the same, the output is 0. Always double-check this row on your exam paper.",
        ],
        example:
          "Let's complete the truth table for a 1-bit half-adder using XOR and AND.\n\nA half-adder takes two 1-bit inputs A and B, and produces a Sum and a Carry output.\nSum = A ⊕ B  (XOR gate)\nCarry = A · B  (AND gate)\n\n| A | B | Sum (A⊕B) | Carry (A·B) |\n|---|---|-----------|-------------|\n| 0 | 0 |     0     |      0      |\n| 0 | 1 |     1     |      0      |\n| 1 | 0 |     1     |      0      |\n| 1 | 1 |     0     |      1      |\n\nThe final row confirms that 1 + 1 = 10₂ — Sum = 0, Carry = 1. Two of these circuits plus an OR gate form a full adder.",
      },
      {
        title: "Analysing Combinational Logic Circuits",
        subtitle: "How to trace the output of a multi-gate circuit using a truth table",
        terms: [
          {
            term: "Combinational logic circuit",
            def: "A digital circuit whose output is determined solely by the current combination of inputs. Regardless of previous state (no memory), identical inputs always produce identical outputs. Adders, multiplexers, and decoders are typical examples.",
          },
          {
            term: "De Morgan's laws",
            def: "Boolean algebra laws stating that NOT(A AND B) = (NOT A) OR (NOT B), and NOT(A OR B) = (NOT A) AND (NOT B). They are the key tool for converting circuits built from NAND or NOR gates into AND/OR/NOT expressions, and for simplifying Boolean expressions.",
          },
          {
            term: "Truth table",
            def: "A table that systematically lists the output for every possible combination of inputs of a logic function. For n inputs, 2ⁿ rows are required. IB exams test both directions: completing a truth table from a given circuit, and designing a circuit from a given truth table.",
          },
        ],
        traps: [
          "When analysing a circuit, rushing left-to-right through the gates and missing an intermediate output is a common error. Instead, fix one input combination per row and add a column for each gate's intermediate output — the 'intermediate column' method lets you complete circuits with three or more gates without mistakes.",
          "When applying De Morgan's laws, setting the scope of NOT incorrectly is a frequent mistake. Writing NOT(A AND B) as (NOT A) AND (NOT B) produces a completely wrong expression. Always confirm that the AND/OR operation flips and that NOT is applied to each individual variable.",
        ],
        example:
          "Let's build the truth table for a 3-input combinational circuit step by step. Circuit: F = (A AND B) OR (NOT C)\n\nAdd intermediate columns G = A · B and H = NOT C.\n\n| A | B | C | G=A·B | H=NOT C | F=G+H |\n|---|---|---|-------|---------|-------|\n| 0 | 0 | 0 |   0   |    1    |   1   |\n| 0 | 0 | 1 |   0   |    0    |   0   |\n| 0 | 1 | 0 |   0   |    1    |   1   |\n| 0 | 1 | 1 |   0   |    0    |   0   |\n| 1 | 0 | 0 |   0   |    1    |   1   |\n| 1 | 0 | 1 |   0   |    0    |   0   |\n| 1 | 1 | 0 |   1   |    1    |   1   |\n| 1 | 1 | 1 |   1   |    0    |   1   |\n\nFilling in the intermediate columns lets you arrive at the final output F mechanically and without errors.",
      },
    ],
  },
];
