/**
 * Core Notes English version — IB Computer Science Unit 6 (Resource Management).
 * Faithful translation of the Korean 일타강사 original; all objectives, terms,
 * traps, and examples preserved at the same depth.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const IB_CS_U6_EN: CoreNote[] = [
  {
    lessonId: "ib-cs-u6-l1",
    courseId: "ib-cs",
    subjectLabel: "IB Computer Science",
    emoji: "💻",
    unit: 6,
    lessonNum: 1,
    unitName: "Resource Management",
    title: "System Resources — The Finite Tools a Computer Possesses",
    subtitle:
      "Primary memory, secondary storage, processing speed, bandwidth, and peripherals — why 'resources are finite' is the very reason the operating system exists",
    overview:
      "When you first study computer systems, it is easy to fall into the illusion that 'a fast CPU solves everything.' But the core insight of IB Topic 6 is that every resource in a computer is finite (limited). Primary memory (RAM) is limited in capacity, secondary storage is not fast, processing speed has a physical ceiling on a single core, and network bandwidth, the display, and peripherals cannot all be monopolised at once by multiple processes. Dividing these finite resources fairly and efficiently is the fundamental mission of the operating system (OS). In IB Paper 1 and Paper 2 extended-response questions, a 2–4 mark question asking you to 'list the system resources and explain the limitation of each' is guaranteed to appear. In this lesson we fully organise the types of resources, the physical characteristics and limits of each, and the reason the OS must intervene precisely because resources are finite.",
    objectives: [
      "List the main categories of system resources (primary memory, secondary storage, processing speed, bandwidth, the display, peripherals) and explain the characteristics of each and why each is finite",
      "Compare primary memory and secondary storage in terms of speed, capacity, and volatility, and explain why both tiers are needed together",
      "Describe, with concrete examples, the principle by which processing speed and bandwidth form system performance bottlenecks",
      "Explain the characteristics of peripherals as shared resources (single use, sequential access, etc.) and describe the problems that arise when they are not managed",
      "Logically justify why the finiteness of resources requires a software layer called the operating system (OS)",
    ],
    sections: [
      {
        title: "Primary Memory, Secondary Storage, and Processing Speed — The Trade-off Between Speed and Capacity",
        subtitle:
          "RAM is fast but small and volatile; disk is large but slow — this gap is the starting point of every resource-management problem",
        terms: [
          {
            term: "Primary memory (RAM)",
            def: "High-speed memory that the CPU accesses directly to temporarily store the currently running programs and data. Because it is volatile, its contents vanish when power is cut. Its access speed is extremely fast (on the order of nanoseconds, ns), but it is expensive, so capacity is limited. IB key point: when several processes demand RAM at the same time, the OS must decide how to allocate it — this is the beginning of memory management.",
          },
          {
            term: "Secondary storage",
            def: "Non-volatile storage devices such as HDDs, SSDs, and optical disks that retain data permanently even when power is off. It has larger capacity and a lower unit cost than primary memory, but its access speed is on the order of milliseconds (ms) to microseconds (μs) — thousands of times slower than RAM. This speed difference is what creates the need for virtual memory and paging.",
          },
          {
            term: "Processor speed",
            def: "The computational power expressed as the number of instructions the CPU can execute per second, or as a clock frequency (GHz). A single CPU can physically execute only one process at a time (on a single core), so when multiple processes demand the CPU simultaneously, the OS scheduler must decide who gets to use the CPU first. This is the need for process scheduling.",
          },
          {
            term: "Bandwidth",
            def: "The maximum amount of data that can be transmitted per unit time (bits/second). Network interfaces, the bus, and disk I/O all have bandwidth limits. When multiple processes demand maximum bandwidth at the same time, contention occurs, so the OS distributes bandwidth fairly through I/O scheduling. When bandwidth is insufficient, overall system performance is held back by a network or disk bottleneck (I/O bottleneck).",
          },
        ],
        traps: [
          "On an IB exam question asking you to 'explain the difference between primary memory and secondary storage,' writing only about the 'capacity difference' will earn just 1 mark on a 2-mark answer. The mark scheme covers speed (nanoseconds vs milliseconds), volatility (volatile vs non-volatile), cost (unit-price difference), and whether direct access is possible (the CPU accesses RAM directly but cannot directly access secondary storage). You must describe at least two of these contrasts to receive full marks.",
          "When describing processing speed, the simple statement 'the faster the CPU, the better' is not a high-scoring IB answer. You must state that processing speed is a 'finite resource' because a single resource cannot be shared by multiple processes simultaneously, and frame the causal relationship that this finiteness creates the need for OS scheduling. The Topic 6 perspective is not 'how fast is it' but 'how fairly can it be divided.'",
        ],
        example:
          "Let's concretely understand resource finiteness through a situation where three programs — a web browser (A), a music player (B), and a text editor (C) — run at the same time.\n\n[Primary memory finiteness]\n  Total RAM: 8 GB\n  A (browser) demand: 4 GB\n  B (music) demand: 512 MB\n  C (editor) demand: 256 MB\n  Total: about 4.75 GB → fits within RAM, but insufficient once additional programs run\n  → the OS decides which program's data to move out to secondary storage (swap space)\n\n[Processing-speed finiteness — single core]\n  The three programs demand the CPU at the same time → physically impossible to run simultaneously\n  → the OS scheduler runs them in turn for a few milliseconds each, in the order A→B→C→A→... (time-sharing)\n  → the user feels they run 'simultaneously,' but in reality it is rapid alternation (context switching)\n\n[Bandwidth finiteness]\n  A streams YouTube (25 Mbps) + B streams music (320 kbps)\n  If network bandwidth is 30 Mbps, the two streams combined are near the limit\n  → the OS/network stack manages packet priority\n\nConclusion: because resources are finite, running multiple programs at once without an OS would cause conflicts and data corruption.",
      },
      {
        title: "The Display and Peripherals — Single Resources That Cannot Be Shared",
        subtitle:
          "A printer, keyboard, or display cannot be monopolised by two processes at once — the reason the OS becomes a mediator",
        terms: [
          {
            term: "Peripherals",
            def: "A collective term for the input/output devices connected to a computer system besides the CPU and primary memory. They are classified as input devices (keyboard, mouse, scanner), output devices (monitor, printer, speakers), and combined input/output devices (touchscreen, network card). Most peripherals are physically singular, so if multiple processes try to access them at the same time, conflict occurs. The OS serialises peripheral access through device drivers and the interrupt mechanism.",
          },
          {
            term: "Shared vs dedicated resources",
            def: "Shared resource: a resource that multiple processes use by dividing up time — CPU, RAM, network bandwidth, the display, etc. The OS prevents conflicts through scheduling, memory management, and protocols. Dedicated resource: a resource that only one process monopolises at a given time — for example, while a printer is printing, other jobs must wait until that print job finishes. The OS manages dedicated resources with a queue so that access happens in order.",
          },
          {
            term: "Device driver",
            def: "A software module that relays communication between the OS and a specific peripheral. An application can use the device through a standardised interface via the OS without knowing the device's physical details. Without a device driver, application developers would have to handle each piece of hardware's low-level commands directly, destroying portability. On the IB exam, the key is understanding that the driver is the interface that makes the OS's resource-management role possible.",
          },
        ],
        traps: [
          "On an IB exam question 'Is the screen/display a system resource?', answering 'the screen is merely an output device, so it is not a resource' is wrong. The display is a finite resource that multiple programs cannot use exclusively at the same time. A modern OS allocates a specific region of the screen (a window) to each application through a window manager so they can share it without conflict. The narrow understanding that 'resources = only RAM and CPU' must absolutely be discarded in Topic 6.",
          "Confusing shared resources with dedicated resources is also a frequent mistake. CPU and RAM are resources that multiple processes share by dividing time, but while a printer is printing one document it behaves like a dedicated resource, and other print jobs must wait until it finishes. A high-scoring IB answer includes a concrete outcome such as 'if even the same printer is managed without a waiting queue, two processes send print commands at the same time and the printed output becomes mixed — a conflict.'",
        ],
        example:
          "Let's imagine what happens when two processes try to access a printer (a dedicated resource) at the same time without an OS.\n\n[Without an OS]\n  Process A: requests to print 'Hello' → sends 'H' to the printer\n  Process B: requests to print 'Goodbye' → sends 'G' to the printer at the same time\n  Result: the printer receives the two streams in no particular order and produces garbage output like 'HGeollodbye'\n\n[When managed by the OS — spooling]\n  The OS maintains a print queue:\n    No. 1: Process A's 'Hello' job → printing\n    No. 2: Process B's 'Goodbye' job → waiting\n  Process A finishes printing → the OS allocates the printer to Process B → 'Goodbye' is printed\n\n[The spooling concept]\n  SPOOL = Simultaneous Peripheral Operations On-Line\n  A technique that temporarily stores print data in a buffer on secondary storage, so the CPU immediately returns to its next task while the printer prints at its own speed\n  → resolves the speed mismatch between the CPU (fast) and the printer (slow)\n\nIB point: spooling is an OS resource-management technique that resolves the 'speed difference between a slow peripheral and a fast CPU' through buffering.",
      },
    ],
  },
  {
    lessonId: "ib-cs-u6-l2",
    courseId: "ib-cs",
    subjectLabel: "IB Computer Science",
    emoji: "💻",
    unit: 6,
    lessonNum: 2,
    unitName: "Resource Management",
    title: "The Role of the Operating System — The OS as Resource Manager",
    subtitle:
      "Scheduling, memory management, and multitasking — how the OS distributes finite resources fairly and efficiently",
    overview:
      "The idea that the operating system (OS) is a 'resource manager' is a core keyword of IB Topic 6. The OS is software that mediates, on top of the hardware, so that applications can share resources without conflict. Concretely, it has three core roles: ① process scheduling — algorithms that distribute the single resource of the CPU fairly among multiple processes; ② memory management — mechanisms that allocate and release RAM to processes and prevent conflicts; ③ multitasking — rapid context switching that makes the user feel they are running several programs at once. On the IB exam, a question asking you to 'explain the resource-management role of the operating system' earns high marks only when you describe these three with concrete examples.",
    objectives: [
      "Explain the role the operating system (OS) performs as a resource manager across the three aspects of scheduling, memory management, and multitasking",
      "Compare the operating principles and the advantages and disadvantages of round-robin and priority-based scheduling algorithms",
      "Explain the concepts of partitioning and fragmentation in memory management and describe how the OS resolves them",
      "Analyse the role a context switch plays in multitasking, and the effect of context-switch overhead on performance",
      "Explain how the interrupt mechanism makes the OS's resource management possible, and discuss what problems would arise without interrupts",
    ],
    sections: [
      {
        title: "Process Scheduling — The Algorithm That Divides the CPU",
        subtitle:
          "Round-robin, priority, and preemptive scheduling — the trade-off between fairness and efficiency",
        terms: [
          {
            term: "Process scheduling",
            def: "The mechanism by which the OS decides which process, among multiple processes, gets the CPU and for how long. The scheduler manages the processes in the ready queue. Main goals: maximise CPU utilisation, minimise response time, and ensure fairness. Algorithms commonly covered in IB: round-robin, priority, and FCFS (First Come First Served).",
          },
          {
            term: "Round-robin scheduling",
            def: "A scheduling algorithm that allocates a fixed time quantum (e.g. 10 ms) to each process in a cyclic manner. When the time quantum ends, the process returns the CPU and moves to the back of the ready queue. Advantage: every process gets the CPU fairly, so there is no starvation. Disadvantage: if the time quantum is too small, context-switch overhead grows; if it is too large, response time lengthens.",
          },
          {
            term: "Context switch",
            def: "The process by which the OS suspends the currently running process and places another process on the CPU. During the switch it saves the current process's CPU state — register values, program counter, stack pointer, etc. (the Process Control Block, PCB) — and restores the new process's PCB. The context switch itself is pure overhead — time spent saving and restoring state rather than doing actual work. If switching is too frequent, overall system efficiency drops.",
          },
          {
            term: "Interrupt",
            def: "A signal by which hardware or software tells the CPU to 'stop what you are doing right now and handle this event.' The OS scheduler uses a timer interrupt to forcibly remove a process whose time quantum has ended from the CPU and switch to the next process. Without interrupts, a malicious or buggy process could monopolise the CPU indefinitely.",
          },
        ],
        traps: [
          "On an IB exam question 'Does multitasking actually mean simultaneous execution?', answering 'yes' is wrong. On a single-core CPU, multitasking is in reality time-sharing through context switching — the processes use the CPU in turn, but the switching is so fast that the user feels it is simultaneous execution. 'True parallelism' is possible only on a multi-core processor. You must make this distinction clear in your IB answer.",
          "When explaining round-robin scheduling, writing that it is 'the best algorithm in every situation' loses marks. Round-robin is excellent for fairness, but because it does not distinguish short jobs from long jobs, it is inefficient in systems where one wants long computational jobs to finish faster than short I/O jobs. A high-scoring IB answer includes the trade-off: 'round-robin guarantees fairness, but a priority-based algorithm (priority scheduling) can handle important processes (e.g. OS kernel tasks) first, giving higher responsiveness.'",
        ],
        example:
          "Let's trace the process of scheduling Process A (run time 30 ms), B (20 ms), and C (10 ms) with round-robin (time quantum 10 ms).\n\nInitial ready queue: [A(30ms), B(20ms), C(10ms)]\n\nRound 1:\n  A runs 10 ms → A remaining 20 ms → move A to back of queue\n  B runs 10 ms → B remaining 10 ms → move B to back of queue\n  C runs 10 ms → C done! → remove from queue\n  Ready queue: [A(20ms), B(10ms)]\n\nRound 2:\n  A runs 10 ms → A remaining 10 ms → move A to back of queue\n  B runs 10 ms → B done! → remove from queue\n  Ready queue: [A(10ms)]\n\nRound 3:\n  A runs 10 ms → A done!\n\nCompletion order: C (at 20 ms), B (at 40 ms), A (at 50 ms)\nNumber of context switches: 6 (occurring at the end of each quantum)\n\nIB point: in round-robin, PCB save/restore overhead occurs at every context switch. Reducing the time quantum to 5 ms increases the number of switches and thus the overhead; increasing it to 100 ms lets C finish earlier but lengthens the response time of the other processes.",
      },
      {
        title: "Memory Management and Multitasking — Process Protection and Efficient Allocation",
        subtitle:
          "Partitioning, fragmentation, and memory protection — how the OS isolates and manages each process's memory region",
        terms: [
          {
            term: "Memory management",
            def: "The set of functions by which the OS allocates RAM to multiple processes, deallocates memory once it is no longer used, and prevents inter-process memory intrusion. Core challenges: ① providing sufficient memory space to each process, ② protecting one process so it cannot access another process's memory (memory protection), ③ minimising waste caused by memory fragmentation.",
          },
          {
            term: "Memory protection",
            def: "The mechanism by which the OS enforces that each process can access only the memory region allocated to it. It is implemented through cooperation between hardware (the MMU, Memory Management Unit) and the OS. If process A tries to access process B's memory, the OS raises a segmentation fault or access violation. Without memory protection, one process's bug could bring down the entire system.",
          },
          {
            term: "Fragmentation",
            def: "The phenomenon where, as memory allocation and deallocation repeat, the available memory becomes scattered into small pieces. Internal fragmentation: space wasted inside an allocated block because the block is larger than what is actually needed. External fragmentation: the phenomenon where total free memory is sufficient but no contiguous space exists, so a large process cannot be allocated. Solutions for external fragmentation: memory compaction or paging.",
          },
          {
            term: "Multitasking",
            def: "The function by which the OS rapidly alternates between multiple processes so that the user feels they are performing several tasks at once. Preemptive multitasking: the OS forcibly takes the CPU away and allocates it to another process (the standard in modern OSes). Cooperative multitasking: a process must voluntarily yield the CPU for a switch to occur (premised on trust; rarely used today). For the IB exam, understanding the preemptive type as the default is sufficient.",
          },
        ],
        traps: [
          "On an IB exam, describing only that 'the purpose of memory management is to prevent memory waste' earns partial marks. Another core purpose of memory management is 'inter-process isolation and protection.' Ensuring that one process's error does not damage another process or the OS kernel is as important as preventing fragmentation. A high-scoring IB answer balances both 'allocation efficiency' and 'process protection.'",
          "On a question distinguishing preemptive multitasking from cooperative multitasking, omitting the danger of the cooperative type loses marks. In cooperative multitasking, a buggy or malicious process can monopolise the CPU forever (causing starvation). You must clearly state that this very security and stability problem is the reason modern OSes adopt the preemptive type.",
        ],
        example:
          "Let's understand external fragmentation through a situation where Process P1 (size 200 KB), P2 (size 150 KB), and P3 (size 100 KB) are loaded sequentially, and after P2 terminates, P4 (size 250 KB) requests execution.\n\nInitial memory (total 1000 KB, contiguously available):\n  [Available: 1000 KB]\n\nAfter P1, P2, P3 loaded sequentially:\n  [P1: 200 KB | P2: 150 KB | P3: 100 KB | Available: 550 KB]\n\nAfter P2 terminates and its memory is freed:\n  [P1: 200 KB | Empty: 150 KB | P3: 100 KB | Available: 550 KB]\n  Total free memory: 150 KB + 550 KB = 700 KB\n\nP4 (250 KB) load request:\n  150 KB space → cannot load P4 (too small)\n  550 KB space → can load P4!\n  → P4 uses only 250 KB of the 550 KB region, leaving 300 KB as internal fragmentation\n  Result: [P1: 200 KB | Empty: 150 KB | P3: 100 KB | P4: 250 KB | Available: 300 KB]\n\nExternal fragmentation example: what if P4's size were 600 KB?\n  Total free memory is 700 KB, but there is no contiguous block, so P4 cannot be loaded!\n  Solution: memory compaction — the OS relocates P1, P3, and P4 to be adjacent, securing contiguous free space\n  Or paging — split P4 and load it into non-contiguous memory (covered in L3)\n\nIB point: the mark scheme explicitly requires the point that external fragmentation occurs because 'total free memory is sufficient but no contiguous space exists.'",
      },
    ],
  },
  {
    lessonId: "ib-cs-u6-l3",
    courseId: "ib-cs",
    subjectLabel: "IB Computer Science",
    emoji: "💻",
    unit: 6,
    lessonNum: 3,
    unitName: "Resource Management",
    title: "Virtual Memory and Paging — The Magic of Running Programs Larger Than RAM",
    subtitle:
      "Virtual address space, page table, swapping, and thrashing — how the OS uses secondary storage like RAM, and the price it pays",
    overview:
      "Virtual memory is the OS's core trick that 'lets you run a larger program even when RAM is insufficient.' In IB Topic 6, virtual memory is the most frequently examined high-difficulty topic. The core idea: the OS provides each process with a 'virtual address space' larger than the actual RAM, and in reality keeps only the pages currently needed in RAM while storing the rest in secondary storage (the disk's swap space). When a process accesses a page that is not currently in RAM, a 'page fault' occurs, and the OS fetches that page from disk into RAM. If this happens too frequently, the system spends more time replacing pages than doing actual work — a state called thrashing. In this lesson we fully organise how virtual memory works, the structure of the page table, page-replacement algorithms, and the causes and solutions of thrashing.",
    objectives: [
      "Define the concept and purpose of virtual memory and explain why it is possible to run a program that exceeds the size of physical RAM",
      "Define the concepts of page, page frame, and page table, and describe step by step how a virtual address is translated into a physical address",
      "Explain, in order, the conditions under which a page fault occurs and the procedure (swapping in/out) by which the OS handles it",
      "Analyse the cause of thrashing and propose methods to prevent it (the working-set concept, adding RAM, etc.)",
      "Evaluate, in a balanced way, the advantages of using virtual memory (a larger address space, process isolation) and its disadvantages (page-fault handling overhead, the risk of thrashing)",
    ],
    sections: [
      {
        title: "Virtual Memory and Paging — The Principle of Address Translation",
        subtitle:
          "Virtual address space, pages, and the page table — a process feels as if it has all of RAM to itself, but in reality it shares it",
        terms: [
          {
            term: "Virtual memory",
            def: "A memory-management technique by which the OS provides each process with an independent virtual address space regardless of the size of physical RAM. The process runs as if it monopolises the entire memory, and the OS and the MMU (Memory Management Unit) translate virtual addresses into physical addresses. Core advantages: ① the ability to run programs that exceed RAM size, ② complete memory isolation between processes, ③ each process's address space is independent, making conflict impossible.",
          },
          {
            term: "Page and page frame",
            def: "Page: the unit obtained by dividing the virtual address space into equally sized blocks (e.g. 4 KB). A process's code, data, and stack are managed in page units. Page frame: the unit obtained by dividing physical RAM into the same size as a page. The pages of a running process are loaded into RAM's page frames. The core benefit of paging: a process's pages can be stored non-contiguously, scattered across physical memory → external fragmentation is resolved.",
          },
          {
            term: "Page table",
            def: "An OS-managed data structure that maps each process's virtual page number to the corresponding physical frame number. Each process has its own independent page table. Address-translation process: virtual address = [virtual page number | offset within page] → look up the physical frame number in the page table → physical address = [physical frame number | offset]. The page table has a valid bit indicating whether the page is in RAM (1) or on disk (0).",
          },
          {
            term: "Page fault",
            def: "An interrupt that occurs when the virtual page a process tries to access is not currently in RAM (valid bit in the page table = 0). The OS handling procedure: ① find the needed page on disk (swap space) → ② if there is a free frame in RAM, load it directly; if not, use a page-replacement algorithm to evict a victim page to disk (swap out) → ③ fetch the needed page from disk into RAM (swap in) → ④ update the page table → ⑤ resume the process. Because disk access is required, a page fault is a very slow operation (several milliseconds).",
          },
        ],
        traps: [
          "On an IB exam, writing that 'virtual memory replaces RAM' is wrong. Virtual memory does not replace RAM; it is an abstraction layer that makes it appear as though RAM is extended. The 'extended space' of virtual memory is actually on the slow disk, so if disk access is frequent, performance degrades sharply. The relationship that 'the larger the RAM, the more effectively virtual memory works' is also content frequently required in IB extended-response answers.",
          "When describing the page-fault handling process, ending with only 'fetch it from disk' earns middling marks. The IB mark scheme requires the order: ① check the valid bit in the page table → ② an OS interrupt occurs → ③ select a victim page and swap out (if needed) → ④ swap in the needed page → ⑤ update the page table → ⑥ resume the process. If a step is missing, you receive only partial marks.",
        ],
        example:
          "Let's trace, step by step, the address translation using a page table for a situation where a process accesses virtual address 0x3A00. (page size = 1 KB = 0x400)\n\n[Parsing the virtual address]\n  Virtual address: 0x3A00 = 14848 (decimal)\n  Page size: 0x400 = 1024 bytes\n  Virtual page number: 14848 ÷ 1024 = 14 (page 14)\n  Offset within page: 14848 mod 1024 = 512 (0x200)\n\n[Page-table lookup]\n  Page 0  → frame 3  (valid = 1, in RAM)\n  Page 1  → frame 7  (valid = 1)\n  ....\n  Page 14 → frame 2  (valid = 1, in RAM)\n  Page 15 → ---       (valid = 0, on disk → page fault on access!)\n\n[Physical-address calculation]\n  Physical frame number: 2\n  Physical address: (frame 2 × 1024) + 512 = 2048 + 512 = 2560 = 0xA00\n\n[If page 15 had been accessed (valid = 0)]\n  ① a page-fault interrupt occurs\n  ② the OS locates page 15 on disk\n  ③ if there is no free frame in RAM — e.g. the LRU algorithm swaps out page 3, the least recently used\n  ④ page 15 is swapped into frame 3\n  ⑤ page table: page 15 → frame 3 (valid = 1), page 0 → (valid = 0) is updated\n  ⑥ the process resumes\n\nIB point: the offset does not change during translation. The offset in the virtual address is used identically in the physical address.",
      },
      {
        title: "Thrashing — The Moment Paging Becomes a Disaster",
        subtitle:
          "Too many processes, too little RAM — the situation where the system only replaces pages instead of doing real work, and its solution",
        terms: [
          {
            term: "Thrashing",
            def: "An abnormal state in which the system spends more time on page replacement (paging/swapping) than on actually useful work (computation). Cause: it occurs when the number of concurrently running processes is so large that each process cannot be allocated enough RAM page frames. Symptoms: CPU utilisation drops sharply (the CPU waits during page-fault handling) and disk I/O surges. Result: the entire system becomes extremely slow or unresponsive.",
          },
          {
            term: "Working set",
            def: "The set of pages a process is actively using at a particular point in time. It is defined as the pages referenced during a time window Δ. The working-set model: a process can run efficiently only if its entire working set is loaded in RAM. A process allocated fewer frames than its working set causes frequent page faults and contributes to thrashing. Thrashing prevention: monitor the working-set size of each process and, if the total exceeds the number of available frames, suspend some processes.",
          },
          {
            term: "LRU page-replacement algorithm (LRU: Least Recently Used)",
            def: "An algorithm that, when RAM is full, selects the page that has gone unused the longest (the page whose most recent reference is the oldest) as the victim page and evicts it to disk. It is based on the locality of reference principle: pages used frequently and recently are likely to be used again in the near future. Algorithms covered in IB: besides LRU, FIFO (First In First Out, replacing the page loaded longest ago) is also frequently examined.",
          },
          {
            term: "Swapping",
            def: "The operation of moving a process's pages or an entire process between RAM and secondary storage (swap space, the page file). Swap out: move from RAM to disk (free up space by evicting less important data). Swap in: bring from disk into RAM (load the needed data into RAM). Because disk is thousands of times slower than RAM, swapping has a high performance cost — this is why thrashing slows the system down.",
          },
        ],
        traps: [
          "On an IB exam, writing 'CPU utilisation rises' as a 'symptom' of thrashing is wrong. When thrashing occurs, the CPU spends much of its time waiting for I/O to handle page faults, so CPU utilisation actually drops sharply. This is the counter-intuitive characteristic of thrashing: 'running many processes → the CPU seems like it should be busy → but in reality the CPU is nearly idle, waiting on I/O.' The IB mark scheme specifies declining CPU utilisation and excessive page replacement as evidence of thrashing.",
          "As a solution to thrashing, the answer 'optimise the program' is not what IB expects. The OS-level solutions IB expects are: ① reduce the number of concurrently running processes (swap out some processes to halt them entirely), ② add RAM, ③ apply a working-set-model-based frame-allocation policy. The answer 'buy a better CPU' is also not directly relevant to resolving thrashing, so it loses marks — thrashing is a memory-shortage problem, not a CPU problem.",
        ],
        example:
          "Let's trace the page faults of the LRU algorithm for the page-reference string '7 0 1 2 0 3 0 4 2 3 0 3 2' in a memory with only 3 frames, and understand the thrashing situation.\n\n[LRU page-replacement trace] (number of frames = 3)\nReference:  7    0    1    2    0    3    0    4    2    3    0    3    2\nFrames:    [7]  [7,0] [7,0,1] replace! keep  replace! keep  replace! keep  replace! replace! keep  keep\n            ↓    ↓     ↓      2(7 out) 0 keep 3(1 out) 0 keep 4(2 out) ...\nFault:     *    *     *    *         *         *         ...\n\nDetailed trace:\n  7: fault → frames [7]\n  0: fault → frames [7, 0]\n  1: fault → frames [7, 0, 1]\n  2: fault → LRU is 7 (oldest reference) → swap out 7, swap in 2 → [2, 0, 1]\n  0: hit → [2, 0, 1] (0 was recently referenced)\n  3: fault → LRU is 1 → swap out 1, swap in 3 → [2, 0, 3]\n  0: hit → [2, 0, 3]\n  4: fault → LRU is 2 → swap out 2, swap in 4 → [4, 0, 3]\n  2: fault → LRU is 3 → swap out 3, swap in 2 → [4, 0, 2]\n  3: fault → LRU is 4 → swap out 4, swap in 3 → [3, 0, 2]\n  0: hit\n  3: hit\n  2: hit\n  Total page faults: 9 (out of 13 references)\n\n[Thrashing scenario]\n  If the number of frames is reduced to 2, a fault occurs on almost every reference\n  → the system spends all its time on swap in/out instead of actual computation\n  → CPU utilisation collapses, disk I/O surges → thrashing!\n\nIB point: in an LRU trace question, explicitly tracking 'which page was referenced longest ago' at each step is the method the IB mark scheme requires.",
      },
    ],
  },
];
