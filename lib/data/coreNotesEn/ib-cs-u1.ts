/**
 * Core Notes English version — IB Computer Science Unit 1 (System Fundamentals).
 * Faithful translation of the Korean storytelling source; all identifiers
 * (lessonId, courseId, subjectLabel, emoji, unit, lessonNum) are unchanged.
 */
import type { CoreNote } from "@/lib/coreNotes";

export const IB_CS_U1_EN: CoreNote[] = [
  {
    lessonId: "ib-cs-u1-l1",
    courseId: "ib-cs",
    subjectLabel: "IB Computer Science",
    emoji: "💻",
    unit: 1,
    lessonNum: 1,
    unitName: "System Fundamentals",
    title: "Systems in Organisations — Planning and Installation",
    subtitle: "What to design and what to watch out for when a new system enters an organisation",
    overview:
      "The biggest cause of failure when introducing a new information system is not the technology — it is people and procedures. IB expects you to understand the full system life cycle, but especially why requirements analysis, changeover strategies, and change management matter. Let's trace how a system is planned, built, and deployed from the organisation's perspective.",
    objectives: [
      "List the stages of the System Development Life Cycle (SDLC) and explain the purpose of each stage",
      "Compare the differences and trade-offs among direct changeover, parallel running, pilot changeover, and phased implementation",
      "Analyse the change-management problems that arise when introducing a new system (user resistance, training, data migration)",
      "Evaluate how the requirements of different stakeholders may conflict or converge during the requirements analysis stage",
      "Compare the ongoing cost of maintaining a legacy system against the cost of migrating to a new system in order to make a strategic decision",
    ],
    sections: [
      {
        title: "The System Development Life Cycle (SDLC)",
        subtitle: "From planning to disposal — the stages a system goes through during its life",
        terms: [
          {
            term: "System Development Life Cycle (SDLC)",
            def: "A framework that defines the complete process — planning, analysis, design, implementation, maintenance, and disposal — of an information system in discrete stages. In IB, the key focus is on the deliverables at each stage and the roles of different stakeholders.",
          },
          {
            term: "Requirements analysis",
            def: "The stage at which the functional and non-functional requirements that the new system must address are identified and documented. Methods include stakeholder interviews, surveys, and observation of the existing system.",
          },
          {
            term: "Legacy system",
            def: "An existing system built on older technology or software that is difficult to integrate with modern systems but is still used for core business operations. Because replacement is costly and risky, an organisation must strategically choose among maintaining, integrating, or replacing it.",
          },
          {
            term: "Data migration",
            def: "The process of moving data from an existing system to a new one. It requires format conversion, quality verification, and integrity checks; if it fails, the entire new system can be rendered ineffective.",
          },
        ],
        traps: [
          "A common exam trap is to write that parallel running is 'the safest and cheapest' changeover strategy. Parallel running does carry lower risk, but it requires double the resources and forces staff to operate two systems simultaneously. 'Safest' is correct; 'lowest cost' is wrong. Always present both the advantage and the disadvantage together to earn full marks.",
          "Memorising the SDLC as a strictly linear sequence will let you down on questions about iterative or agile models. Because IB tests iterative approaches as well as the waterfall model, you need to understand that SDLC stages can cycle back to earlier phases.",
        ],
        example:
          "Consider the parallel running strategy. Suppose a school library is moving from a paper loan-card system to barcode-based software. During the transition, librarians record each loan in both the paper cards and the software simultaneously. If the software encounters an error, the paper record still exists and no data is lost. However, every task must be done twice, so the workload doubles — and staff may delay fully committing to the new system.",
      },
      {
        title: "Comparing Changeover Strategies",
        subtitle: "Direct, parallel, pilot, phased — choosing the right strategy for the situation is everything",
        terms: [
          {
            term: "Direct changeover (Big-bang)",
            def: "A strategy in which the old system is completely shut down at a specific point in time and the new system goes live immediately. Costs are low and the switch is fast, but any errors in the new system risk paralysing the entire operation.",
          },
          {
            term: "Parallel running",
            def: "A strategy in which the old system and the new system operate simultaneously for a set period, and their outputs are compared. It is safe but requires double the resources and increases the workload on staff.",
          },
          {
            term: "Pilot changeover",
            def: "A strategy in which the new system is deployed first to only part of the organisation (e.g., one branch or one year group), problems are identified, and then it is rolled out to everyone. Risk is low, but inconsistencies can arise between the pilot group and the rest of the organisation.",
          },
          {
            term: "Phased implementation",
            def: "A strategy in which the features of the new system are introduced in sequential stages. Each stage is stabilised before moving to the next, which spreads the risk — but the total transition period is longer.",
          },
        ],
        traps: [
          "When an exam question asks which changeover strategy suits a small start-up company, direct changeover can actually be the most reasonable answer. Parallel running imposes an excessive double-cost burden at small scale. Strategy choice must always be justified with reference to organisational size, budget, risk tolerance, and staff capability.",
        ],
        example:
          "Compare how the four strategies would handle a nationwide bank rolling out new account software. Direct changeover switches all 500 branches overnight — cheap and fast, but a single bug could freeze every transaction. Pilot changeover deploys to one city branch first, so a defect only affects that branch before national rollout. Phased implementation would release the deposit module first, stabilise it, then add loans and transfers over several months. For a bank, the risk of paralysing customer transactions is so high that pilot or phased is justified over direct, even though both take longer.",
      },
      {
        title: "Change Management and Stakeholders",
        subtitle: "80% of a system rollout is a people problem, not a technology problem",
        terms: [
          {
            term: "Change management",
            def: "The process of managing the organisational and human changes that arise from introducing a new system. It includes user training, resolving resistance, and communication planning.",
          },
          {
            term: "Stakeholder",
            def: "Anyone who has an interest in the development and operation of a system. This includes end users, managers, the IT team, customers, and shareholders — each with different requirements and priorities.",
          },
          {
            term: "User Acceptance Testing (UAT)",
            def: "The stage at which end users test the system under conditions similar to the real working environment to verify that it meets the stated requirements. Unlike developer testing, UAT focuses on validating actual business workflows.",
          },
          {
            term: "User resistance",
            def: "The tendency of employees to refuse to use the new system or to cling to existing methods. Causes include insufficient training, concern about changing roles, and preference for the familiar. Managing this is a central challenge of change management.",
          },
        ],
        traps: [
          "In stakeholder conflict questions, avoid falling into the trap of asking 'whose requirements take priority — the manager's or the end user's?' IB does not want a priority judgement; it wants to see how you analyse conflicting requirements and find a balance. In your answer, present the perspective of each stakeholder and then describe a compromise approach.",
        ],
        example:
          "Consider a hospital introducing an electronic patient-records system. The managers want fast data entry to cut costs, while the nurses (end users) fear the new screens will slow them at the bedside and prefer their familiar paper charts — a classic case of user resistance. Change management resolves this by running hands-on training sessions and a User Acceptance Testing phase where nurses trial the system on real ward workflows and request changes before go-live. When nurses see the system auto-populates repeated fields and saves them time, resistance falls, illustrating that the rollout succeeded as a people problem, not just a technical one.",
      },
    ],
  },
  {
    lessonId: "ib-cs-u1-l2",
    courseId: "ib-cs",
    subjectLabel: "IB Computer Science",
    emoji: "💻",
    unit: 1,
    lessonNum: 2,
    unitName: "System Fundamentals",
    title: "Components of a Computer System — Hardware, Software, and Their Roles",
    subtitle: "How the CPU processes instructions and how software layers abstract the hardware beneath them",
    overview:
      "Understanding how a computer works through three layers — hardware, operating system, and application software — unlocks half of the IB exam. The fetch-decode-execute cycle by which the CPU retrieves, interprets, and executes instructions; the difference between primary and secondary storage; and the role the operating system plays as the intermediary — understand these three things as mechanisms, not just facts.",
    objectives: [
      "Describe the roles and interactions of the CPU, primary memory (RAM/ROM), secondary storage, and input/output devices",
      "Describe each stage of the fetch-decode-execute cycle in the correct sequence",
      "Explain the difference between system software (operating systems) and application software, and describe the core functions of an operating system",
      "Compare and contrast the characteristics of volatile memory (RAM) and non-volatile memory (ROM, secondary storage)",
      "Analyse how clock speed, number of cores, and cache memory affect CPU performance",
    ],
    sections: [
      {
        title: "The CPU and the Fetch-Decode-Execute Cycle",
        subtitle: "The three-step mechanism by which a computer processes a single instruction",
        terms: [
          {
            term: "Central Processing Unit (CPU)",
            def: "The 'brain' of the computer — the core hardware component that interprets program instructions and performs arithmetic and logical operations. It consists of the Control Unit (CU), the Arithmetic Logic Unit (ALU), and registers.",
          },
          {
            term: "Fetch-Decode-Execute cycle",
            def: "The fundamental operating cycle by which the CPU processes instructions: Fetch (retrieve the instruction from primary memory) → Decode (interpret the instruction) → Execute (carry out the operation in the ALU or another unit). This cycle repeats continuously.",
          },
          {
            term: "Program Counter (PC)",
            def: "A register that holds the memory address of the next instruction to be executed. It increments automatically after each instruction is fetched, enabling sequential execution.",
          },
          {
            term: "Cache memory",
            def: "A small, extremely fast memory located inside or immediately adjacent to the CPU. It stores frequently accessed data fetched from RAM in advance, reducing memory access latency.",
          },
        ],
        traps: [
          "Writing 'a faster CPU means better performance' in an IB answer will earn only partial credit. Performance is affected not only by clock speed (GHz) but also by the number of cores, cache size, and bus speed. When a question asks you to 'describe two factors that affect performance', use clock speed and cache size as examples and explain the mechanism by which each improves performance.",
        ],
        example:
          "Let's look at the fetch-decode-execute cycle in concrete terms. When a program executes 'A = 5 + 3', the addition instruction at the address pointed to by the Program Counter is first fetched from memory into the Instruction Register (IR). The Control Unit decodes that instruction and sends a signal to the ALU to add the two operands. The ALU computes 5 + 3 = 8 and stores the result in the designated register. These three steps repeat billions of times per second to run every program.",
      },
      {
        title: "Primary and Secondary Storage",
        subtitle: "RAM, ROM, SSD, HDD — the trade-off between speed and persistence",
        terms: [
          {
            term: "RAM (Random Access Memory)",
            def: "Volatile primary memory that temporarily stores the programs and data the CPU is currently using. Data is lost when the power is switched off. A larger RAM capacity allows more programs to run simultaneously.",
          },
          {
            term: "ROM (Read-Only Memory)",
            def: "Non-volatile memory that can only be read; its contents are written at manufacture. It stores the firmware (BIOS/UEFI) used to initialise hardware when the computer boots.",
          },
          {
            term: "Secondary storage",
            def: "Non-volatile storage devices that permanently hold large volumes of data. Examples include HDDs (hard disk drives), SSDs (solid state drives), USB drives, and optical discs.",
          },
          {
            term: "Volatile memory",
            def: "Memory in which stored data is lost when the power supply is cut. RAM is the primary example — it is fast but not persistent.",
          },
        ],
        traps: [
          "Saying that adding more RAM 'makes the computer faster' is imprecise. RAM increases the number of programs and the amount of data that can be active at once, but it does not increase the CPU's processing speed itself. Because IB tests this distinction frequently, write precisely: 'RAM improves multitasking performance but does not change clock speed.'",
        ],
        example:
          "Trace where a photo lives as you edit it. On the SSD (secondary storage, non-volatile) sits the saved 20 MB file — it survives a power cut. When you open the editor, the OS copies that file into RAM (volatile) so the CPU can access it quickly; the ROM's firmware had already booted the machine before any of this. If you now pull the power without saving, the RAM copy — including all your unsaved edits — is lost instantly, while the original file on the SSD remains. This is exactly why 'save often' matters: it writes the volatile RAM working copy back to non-volatile storage.",
      },
      {
        title: "The Operating System and Software Layers",
        subtitle: "The OS is the intermediary between hardware and applications",
        terms: [
          {
            term: "Operating System (OS)",
            def: "System software that manages hardware resources (CPU, memory, storage, I/O devices) and provides an interface through which applications can access those resources easily. Its core functions are memory management, process scheduling, and file system management.",
          },
          {
            term: "Application software",
            def: "Software that runs on top of the operating system to perform a specific user task. Examples include word processors, web browsers, and games. Application software does not access hardware directly; it uses the OS's API to obtain resources.",
          },
          {
            term: "Device driver",
            def: "Software that handles communication between a specific hardware device and the operating system. It provides an abstraction layer so the OS can control devices in a consistent manner regardless of the hardware model.",
          },
          {
            term: "Process scheduling",
            def: "The mechanism by which the OS determines how multiple processes (running programs) share CPU time. Common algorithms include round-robin and priority-based scheduling.",
          },
        ],
        traps: [
          "Watch out for borderline cases where the boundary between system software and application software is blurry (e.g., a web browser). IB classification questions should be answered on the basis of role: if software manages hardware resources, it is system software; if it performs a specific user task, it is application software. Drivers and utilities are classified as system software.",
        ],
        example:
          "Follow what happens when a word processor (application software) prints a document. The application does not touch the printer directly; it calls the operating system's API asking to print. The OS uses process scheduling to give the print job CPU time, then hands the data to the printer's device driver, which translates the generic request into the exact commands that specific printer model understands. This layering means the same word processor can print to any printer without knowing its hardware details — the OS and driver abstract the hardware away, which is precisely the OS's role as intermediary.",
      },
    ],
  },
  {
    lessonId: "ib-cs-u1-l3",
    courseId: "ib-cs",
    subjectLabel: "IB Computer Science",
    emoji: "💻",
    unit: 1,
    lessonNum: 3,
    unitName: "System Fundamentals",
    title: "System Design, Usability, and an Introduction to Networks",
    subtitle: "Why good systems put the user at the centre, and how data travels across a network",
    overview:
      "A system can be technically perfect and still fail if users find it hard to use. IB treats human-computer interaction (HCI) and usability as distinct topics within system design, and it requires you to understand networking fundamentals from a systems perspective. Let's develop a connected view of three pillars: usability principles, network topologies, and the role of protocols.",
    objectives: [
      "Describe and apply the core usability principles (learnability, efficiency, memorability, error prevention, satisfaction) to real-world scenarios",
      "Compare the structure, advantages, and disadvantages of network topologies (bus, star, ring, mesh)",
      "Distinguish between LANs and WANs and describe the typical environments in which each is used",
      "Explain the roles of IP addresses, MAC addresses, and protocols in network communication",
      "Compare and evaluate the advantages and disadvantages of open-source software versus proprietary software from the perspective of different stakeholders",
    ],
    sections: [
      {
        title: "System Design and Usability",
        subtitle: "Design principles that prevent users from getting lost",
        terms: [
          {
            term: "Usability",
            def: "A quality attribute that measures how effectively, efficiently, and satisfactorily a system helps a specific set of users achieve a specific set of goals. It is evaluated across five components: learnability, efficiency, memorability, error frequency, and user satisfaction.",
          },
          {
            term: "Human-Computer Interaction (HCI)",
            def: "The field that studies and designs the ways in which people interact with computer systems. It encompasses interface design, accessibility, and minimising cognitive load.",
          },
          {
            term: "Error prevention",
            def: "A design principle by which the system minimises the likelihood of errors before they occur, through techniques such as input validation, confirmation dialogs, and undo functionality.",
          },
          {
            term: "Accessibility",
            def: "The principle of designing a system so that users with a wide range of abilities — including those with disabilities — can use it on equal terms. Examples include screen reader support, high-contrast mode, and keyboard navigation.",
          },
        ],
        traps: [
          "Do not fall into the trap of writing 'an attractive interface means high usability' in a usability evaluation question. Usability is about how easily and quickly users can achieve their goals, not about aesthetic design. In an IB answer, always specify which of the five usability components is being evaluated, and base your judgement on that component.",
        ],
        example:
          "Here is a usability improvement example. If an online form only reveals password requirements (e.g., must include an uppercase letter, a number, and a special character) via an error message after submission, users will fail repeatedly. Displaying the requirements in real time beside the input field, with a green tick appearing as each condition is met, applies the error prevention principle. This simultaneously improves two usability components: learnability and error frequency.",
      },
      {
        title: "Network Topologies and Classifications",
        subtitle: "How devices are connected determines reliability and cost",
        terms: [
          {
            term: "Network topology",
            def: "The arrangement — physical or logical — by which devices (nodes) in a network are interconnected. The main types are bus, star, ring, and mesh. Each differs in cost, reliability, and scalability.",
          },
          {
            term: "Star topology",
            def: "A structure in which every device is connected individually to a central hub or switch. A fault in one device does not affect the others, making management straightforward — but the central hub becomes a single point of failure.",
          },
          {
            term: "LAN (Local Area Network)",
            def: "A network confined to a geographically limited area such as a single building or campus. It is characterised by high transmission speeds and low error rates, and is owned and managed directly by the organisation.",
          },
          {
            term: "WAN (Wide Area Network)",
            def: "A network that connects devices across a wide geographic area — between cities, countries, or continents. It uses leased infrastructure from telecommunications providers, operates at lower speeds than a LAN, and faces greater security threats.",
          },
        ],
        traps: [
          "When comparing bus and star topologies, writing only 'bus is cheaper' earns half marks. In an IB answer, you must state the reason: bus topology requires only a single shared cable, which reduces wiring costs, but all traffic travels over the same medium causing collisions, and a single cable break brings the entire network down. State the trade-off, not just the headline fact.",
        ],
        example:
          "Consider a computer lab of 20 machines connected in a star topology. Each machine has its own cable running to a central switch, so cabling costs more than a single shared bus cable would. But when one student's cable is accidentally unplugged, only that one machine drops offline — the other 19 keep working, because each has an independent link to the switch. The trade-off is the switch itself: if that central hub fails, the entire lab loses connectivity, since it is the single point of failure through which all traffic passes. This is a school LAN, owned and managed by the school with high internal speeds.",
      },
      {
        title: "Protocols, IP and MAC Addresses, and Internet Fundamentals",
        subtitle: "How a data packet finds its way to the correct destination",
        terms: [
          {
            term: "Protocol",
            def: "A defined set of rules and standards governing how data is exchanged across a network. Examples include HTTP, TCP/IP, FTP, and SMTP. Protocols serve as a common language that enables devices from different manufacturers to communicate.",
          },
          {
            term: "IP address",
            def: "A logical address that identifies a device on an IP network. IPv4 uses 32 bits (e.g., 192.168.0.1); IPv6 uses 128 bits, providing a far larger address space. IP addresses are used for routing at the network layer.",
          },
          {
            term: "MAC address (Media Access Control address)",
            def: "A 48-bit hardware identifier permanently assigned to a network interface card (NIC) at manufacture. It is used to identify devices within a LAN at the data link layer and, unlike an IP address, is fixed.",
          },
          {
            term: "Packet switching",
            def: "A method of transmitting data by breaking it into small packets that travel independently and are reassembled at the destination. If one path is congested, packets can be rerouted via another path, making packet switching more efficient and fault-tolerant than circuit switching.",
          },
        ],
        traps: [
          "Many exam answers confuse IP addresses with MAC addresses. An IP address is a logical, changeable address at the network layer used for routing; a MAC address is a physical, fixed address at the data link layer used for communication within the same LAN. A useful analogy: an IP address is like a postal address (can change), while a MAC address is like a national ID number (fixed at birth).",
          "Do not simply list protocol names (e.g., HTTP) when answering a protocol question. Because IB asks why protocols are necessary, you must state the purpose explicitly: 'to ensure compatibility by allowing different systems to communicate using the same set of rules.'",
        ],
        example:
          "Trace a laptop loading a web page to see IP addresses, MAC addresses, and protocols cooperate. The browser uses HTTP over TCP/IP to request the page; the destination is identified by the server's IP address, say 93.184.216.34 (a logical, routable address). The message is broken into packets by packet switching, each free to take a different path across the internet and be reassembled at the end. Within the laptop's own LAN, though, delivery to the router happens using the router's fixed MAC address at the data link layer. So the IP address routes the packet across networks to the right building, while the MAC address delivers it to the right device once it arrives.",
      },
    ],
  },
];
