/**
 * 합격 프로필 — school-by-school admit records: the admission letter (합격증),
 * the Common App main essay, and the supplemental essays. Real material shared
 * by the founder (Cornell Engineering admit). Add a new school by appending an
 * Admit object. Assets live under /public/parents/admits.
 */

export interface AdmitEssay {
  prompt: string;
  wordLimit?: string;
  /** Essay body, one string per paragraph. */
  paragraphs: string[];
}

export interface Admit {
  id: string;
  school: string;
  schoolKo: string;
  college: string;
  major: string;
  location: string;
  /** e.g. "Class of 2028 · Fall 2024" */
  classOf: string;
  decision: string; // "Regular Decision" | "Early Decision" | ...
  emoji: string;
  /** Brand accent (school color). */
  accent: string;
  /** The admit/decision letter image (the 합격증). */
  letterImage: string;
  commonApp: {
    title: string;
    blurb: string;
    /** Deep paragraph-by-paragraph Korean analysis page. */
    analysisHref?: string;
    /** Raw essay PDF. */
    pdf?: string;
  };
  supplements: AdmitEssay[];
  /** Original supplemental file for download. */
  supplementFile?: string;
}

export const ADMITS: Admit[] = [
  {
    id: "cornell-engineering-2024",
    school: "Cornell University",
    schoolKo: "코넬대학교",
    college: "College of Engineering",
    major: "Biomedical / Chemical & Biomolecular Engineering",
    location: "Ithaca, NY",
    classOf: "Class of 2028 · Fall 2024",
    decision: "Regular Decision",
    emoji: "🐻",
    accent: "#B31B1B",
    letterImage: "/parents/admits/cornell-admit-letter.png",
    commonApp: {
      title: "Common App 메인 에세이 — “죽은 해파리”",
      blurb: "속초 해변의 죽은 해파리에서 출발해 생의공학 적합성·이민 정체성을 잇는 메인 에세이. 한 문단씩 쪼갠 한국어 분석을 함께 제공합니다.",
      analysisHref: "/parents/essay",
      pdf: "/parents/cornell-bme-essay.pdf",
    },
    supplementFile: "/parents/admits/cornell-supplemental.docx",
    supplements: [
      {
        prompt:
          "Ezra Cornell wrote, “I would found an institution where any person can find instruction in any study.” Explain how your life experiences will help inform your contributions to a learning community devoted to “…any person…any study.”",
        wordLimit: "350 words",
        paragraphs: [
          "Most mornings, my stomach growls through class. So today, I am eternally grateful for the bacon wraps that I could enjoy in peace. For the first time in 18 years, I was allowed to break school conventions. In that same AP Physics C class, the diverse responses to a moment of inertia question led us to assume the majority must be “incorrect.” However, our teacher enlightened us - there wasn’t a single \"right\" answer. The moment of inertia is influenced by an object's distribution to its axis of rotation, a factor influenced by our unique perspectives. Raised in Korea’s rigid school system of strict academic hierarchy, I was initially intimidated by the chaos surely resulting from these rule-breaking.",
          "The notion of moment of inertia’s magical ability to appreciate the coexistence of perspectives motivated me to establish a STEM club at my school. Understanding how societal perfectionism often compels us to forsake our originality, I devised a Strawberry DNA Extraction lab without detailed instructions. Each student’s different ideas facilitated highly diverse sources in collecting materials. Despite varying sizes and shapes of DNA, none of us did “wrong.” I gave the context to our project, putting primary focus on the minuscule yet increasingly complex capacity of DNA to possess the template for making all our proteins - which puts ourselves “unique.”",
          "Through leading a group of differences, I became increasingly committed to easing transitions for others and championing diversity of all kinds, ensuring everyone, regardless of race, gender, or ethnicity, felt acknowledged and valued. At Cornell, whenever students are grappling with discomfort from confusion, I’m prepared to offer my experience and support. Whether dealing with Spanish homework, conducting experiments, or navigating social interactions, applying and uniting various disciplines to solve these challenges create synergy that exceeds the sum of its constituent parts. Like the intricate symphony encoded within every minuscule creature’s DNA, I believe and will share that every individual holds beautiful complexity.",
        ],
      },
      {
        prompt:
          "How do your interests directly connect with Cornell Engineering? If you have an intended major, what draws you to that department at Cornell Engineering?",
        wordLimit: "250 words · Engineering Essay 1",
        paragraphs: [
          "I learned self-love from learning to love atoms. Like a new-born baby, I reveled in the seemingly ordinary and mundane aspects of life, particularly the properties of water. My fascination with water extended beyond its physical properties; it became a metaphor for my personal growth. Each atom’s relentless movement to escape its comfort zone very much resembled my struggles when faced with new environments. Stepping into America, I mirrored water’s adaptability, maintaining my distinctive qualities amidst unfamiliar social standards and cultures.",
          "As I embark on the next chapter at Cornell, Smith School of Chemical and Biomolecular Engineering embodies invaluable transformation, turning mundane into the extraordinary. My connection with the department deepened as I closely followed its Science Blender Podcast, where Arna’s journey to the U.S. to develop a new method for extracting lithium from geothermal wastewater resonated profoundly. During my moments of homesickness, I turned to the study of scientific engineering to appreciate my existence much like Arna. Within the ESW Biofuels Project Team, I aim to blend sustainability and engineering through applying Cornell’s hydrothermal liquefaction techniques to diverse wastewater sources worldwide, leveraging my interest in water atoms as a catalyst for promoting the well-being of living creatures. Aligned with Arna’s journey, I aim to intertwine my personal narrative into the podcast, sharing my challenges and backgrounds. This stems from my strong belief that innovations surpass the sum of their constituent parts. Crafting, gearing, and embracing inclusion, I’m thrilled to imbue value into seemingly mundane aspects at Cornell Engineering.",
        ],
      },
      {
        prompt:
          "Diversity in all forms is intrinsic to excellence in engineering. How do you see yourself contributing to the diversity and/or the inclusion of the Cornell Engineering community? What is the unique voice you would bring?",
        wordLimit: "250 words · Engineering Essay 2 (Question B)",
        paragraphs: [
          "I grew up watching my grandmother design hanboks, or traditional Korean clothing comprised of outgrown hand-me-downs. As she stitched, my small hands darted between hers, snatching discarded scraps for my dolls. While my hanbok mimicked grandmother’s, I loved adding my own flair.",
          "My hanbok identity, woven from diverse cultural histories, continued to thrive in American high school. Thinking of spreading the beauty of hanbok to my international friends, I decided to blend hanbok in a modern-day context. I created a jeogori-style pajama optimized for ventilation, tailored to suit each individual’s physical distinctiveness and preferences. This inspired me to appreciate the beauty of blending, particularly the “wearables,” which are a fusion of engineering and fashion. “Wearables” enabled me to celebrate commonalities in culture, and I discovered that each discipline shines brightly when they are united.",
          "Systems are more than the sum of their constituent parts. I closely followed Cornell Fashion Collective, where I want to blend cultural fashion, sustainability, and engineering by giving birth to unwanted garments through 3D rendering and augmented reality. Stemming from my independent research that discovered the potential use of semi-permeable jellyfish membranes as a sweat patch transmitting biofluids, I want to discover the stunning complexity of seemingly useless materials by applying their use to fashion. I’m eager to spread the Korean concept of jeong, which is compassionate goodwill rooted in an appreciation of the power of strong bonds. In Cornell Engineering, I’m thrilled to inspire others with my patchwork jeong of hanboks, inclusion, and cooperative engineering.",
        ],
      },
    ],
  },
];
