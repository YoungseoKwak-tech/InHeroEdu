/**
 * Hand-authored, textbook-depth Core Notes presented for scannability:
 * short prose chunks + KEY IDEA callouts + comparison TABLES + term cards +
 * diagrams. Content is preserved; the format is built so students actually
 * read it. These OVERRIDE the auto-generated seed for the same
 * courseId+unit+lesson (see lib/coreNotes). Authored by Claude (no API).
 */

export interface AuthoredSection {
  title: string;
  body?: string;
  keyIdea?: string;
  table?: { headers: string[]; rows: string[][] };
  terms?: { term: string; def: string }[];
  example?: string | null;
  traps?: string[];
}
export interface AuthoredNote {
  courseId: string;
  unit: number;
  lessonNum: number;
  unitName: string;
  title: string;
  subtitle?: string;
  overview?: string;
  objectives?: string[];
  diagram?: string | null;
  formulas?: string[];
  sections: AuthoredSection[];
}

export const CORE_NOTES_AUTHORED: AuthoredNote[] = [
  {
    courseId: "ap-psychology", unit: 1, lessonNum: 1,
    unitName: "Scientific Foundations of Psychology",
    title: "History and Perspectives of Psychology",
    subtitle: "How a 2,000-year-old philosophy question became a lab science in one year — and why psychology still explains behavior through seven lenses at once.",
    overview:
      "Psychology asks the oldest questions humans have: What is the mind? Are we born this way or made by experience? Is behavior free, or caused? For most of history these belonged to philosophy — argued brilliantly, settled by no one, because there was no way to test an opinion about the mind.\n\nTwo things changed that, and they are the whole lesson. First, a date: 1879, when Wundt opened the first psychology lab and turned the mind into something you could measure. Second, a habit of mind: psychology never agreed on one theory — it split into seven perspectives, each a different lens on the same behavior.",
    objectives: [
      "Explain why 1879 (Wundt's lab) marks psychology becoming a science.",
      "Compare structuralism (Wundt, Titchener) with functionalism (James).",
      "Pair the major early figures with their schools (Freud, Watson/Skinner, Maslow/Rogers).",
      "Identify the seven modern perspectives and the cause each one emphasizes.",
      "Apply two or more perspectives to one behavior — they are complementary, not rivals.",
    ],
    sections: [
      {
        title: "Philosophy's questions, with no way to answer them",
        body:
          "Before psychology had a name, philosophers asked its questions. Descartes argued for mind–body dualism — that the mind is non-physical, separate from the body. Locke countered with empiricism: the mind starts as a blank slate, written on by experience. Nativists insisted some knowledge is inborn.\n\nThe problem was never the ideas — it was the method. There was no experiment to decide who was right, so the debates never closed. That missing ingredient is exactly what scientific psychology supplied.",
        keyIdea: "Philosophy could pose the questions about the mind; it could not test the answers. Psychology = philosophy's questions + science's method.",
        terms: [
          { term: "Mind–body dualism", def: "Descartes's view that mind and body are separate; modern biological psychology rejects it." },
          { term: "Empiricism", def: "Locke's view that knowledge comes from experience — the mind as a 'blank slate.'" },
          { term: "Nature–nurture issue", def: "The debate over biology vs. experience; the modern answer is that they interact." },
        ],
      },
      {
        title: "1879: the birth of a science",
        body:
          "In 1879 Wilhelm Wundt opened the first psychology laboratory in Leipzig — the date the AP exam treats as psychology's founding, making Wundt the 'father of psychology.' His breakthrough was a method: studying the mind under controlled conditions.\n\nWundt and Titchener built the first school, structuralism, which tried to break consciousness into basic elements using introspection (trained self-reports). It failed because introspection couldn't be verified — two observers couldn't agree, and a science needs checkable data. But the bigger idea survived: the mind can be studied in a lab at all.",
        keyIdea: "Structuralism's failure teaches the rule of science: data has to be verifiable. Introspection wasn't, so it died — but the experimental approach lived.",
        terms: [
          { term: "Wilhelm Wundt", def: "Founded the first psychology lab (1879); the 'father of psychology.'" },
          { term: "Structuralism", def: "Wundt & Titchener's school analyzing consciousness into basic elements." },
          { term: "Introspection", def: "Trained self-reports of conscious experience; abandoned as unverifiable." },
        ],
      },
      {
        title: "The schools that followed — figures to know",
        body:
          "William James launched functionalism, asking not what the mind is made of but what it is FOR — how mental processes help us adapt (a Darwinian idea, and the ancestor of the evolutionary perspective). After him, the field reinvented itself again and again, each school rebelling against the last.",
        table: {
          headers: ["Figure(s)", "School", "Core idea"],
          rows: [
            ["Wundt / Titchener", "Structuralism", "Break consciousness into elements (introspection)"],
            ["William James", "Functionalism", "Study the PURPOSE of mental processes (adaptation)"],
            ["Sigmund Freud", "Psychoanalysis", "Behavior driven by the unconscious & early childhood"],
            ["Watson & Skinner", "Behaviorism", "Study only observable behavior shaped by reward/punishment"],
            ["Maslow & Rogers", "Humanism", "Free will, growth, self-actualization"],
            ["(1950s–60s)", "Cognitive revolution", "Study the mind as information processing"],
          ],
        },
        keyIdea: "Memorize this table — the exam constantly gives a quote or method and asks 'whose school is this?'",
      },
      {
        title: "The seven modern perspectives — one behavior, many lenses",
        body:
          "Modern psychology settled into seven perspectives. The skill that matters all year: recognize each by the KIND of cause it points to, and remember they overlap. Choosing a lens means choosing what to study — not declaring the others wrong.",
        table: {
          headers: ["Perspective", "Looks for causes in…", "Why is someone aggressive?"],
          rows: [
            ["Biological", "Genes, brain, hormones, neurotransmitters", "Overactive amygdala; high testosterone"],
            ["Cognitive", "How we perceive & process information", "Reads neutral acts as hostile"],
            ["Behavioral", "Rewards & punishments (learning)", "Aggression was rewarded before"],
            ["Psychodynamic", "Unconscious conflicts, early childhood", "Displaced, unresolved anger"],
            ["Humanistic", "Free will, blocked growth needs", "Thwarted needs"],
            ["Sociocultural", "Culture, norms, the situation", "A peer culture prizing toughness"],
            ["Evolutionary", "Traits that aided ancestral survival", "Defending resources/territory"],
          ],
        },
        keyIdea: "No single lens is 'the' answer. A complete explanation usually combines several — which is exactly what an FRQ asks you to do.",
        traps: [
          "Treating the perspectives as competing truths where only one is right. Each is a LENS that emphasizes some causes and ignores others. On multiple choice, read for which cause the scenario stresses (a brain region → biological, a reward history → behavioral, a cultural norm → sociocultural) and pick that lens.",
        ],
      },
      {
        title: "How this shows up on the exam",
        body:
          "Two ways. (1) Matching: a quote, method, or figure → name the school (use the table above). (2) Application: a scenario → which perspective best explains it, or apply a named perspective to a new situation.\n\nKeep the throughline in mind: psychology earned the word 'science' by replacing unverifiable introspection with controlled methods — which is exactly what the next lesson, Research Methods, is all about.",
        keyIdea: "Whenever you meet a claim about the mind, ask Wundt's founding question: 'How could we actually measure that?'",
      },
    ],
  },
];
