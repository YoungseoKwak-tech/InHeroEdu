import type { SatQuestion } from "./types";

/** Practice Tests 2 & 3 — expansion batch (original, hand-verified). Brings each
 *  module of Tests 2 and 3 to R&W 11 / Math 9. */

// ── Test 2 ──
export const T2_RW_M1_B: SatQuestion[] = [
  { id: "t2rw1-9", section: "rw", domain: "Craft and Structure", difficulty: "med", passage: "The directions were ______ enough that we assembled the shelf in just a few minutes.", prompt: "Which choice completes the text with the most logical and precise word?", type: "mcq", choices: ["straightforward", "confusing", "lengthy", "vague"], correct: 0, explanation: "Finishing quickly means the directions were \"straightforward.\"" },
  { id: "t2rw1-10", section: "rw", domain: "Standard English Conventions", difficulty: "med", passage: "A series of lectures ______ scheduled for the first week of the term.", prompt: "Which choice conforms to the conventions of Standard English?", type: "mcq", choices: ["is", "are", "were", "have"], correct: 0, explanation: "The subject is the singular \"series,\" so \"is.\"" },
  { id: "t2rw1-11", section: "rw", domain: "Expression of Ideas", difficulty: "med", passage: "Ticket prices doubled this season. ______, attendance fell sharply.", prompt: "Which choice completes the text with the most logical transition?", type: "mcq", choices: ["Moreover", "As a result", "However", "Likewise"], correct: 1, explanation: "Higher prices caused lower attendance — \"As a result.\"" },
];
export const T2_RW_M2E_B: SatQuestion[] = [
  { id: "t2rw2e-9", section: "rw", domain: "Craft and Structure", difficulty: "easy", passage: "The coffee was too ______, so he added some milk and sugar.", prompt: "Which choice completes the text with the most logical word?", type: "mcq", choices: ["bitter", "sweet", "cold", "weak"], correct: 0, explanation: "Adding milk and sugar fixes a \"bitter\" taste." },
  { id: "t2rw2e-10", section: "rw", domain: "Standard English Conventions", difficulty: "easy", passage: "The dogs ______ barking at the delivery truck.", prompt: "Which choice conforms to the conventions of Standard English?", type: "mcq", choices: ["is", "are", "was", "am"], correct: 1, explanation: "\"Dogs\" is plural, so \"are.\"" },
  { id: "t2rw2e-11", section: "rw", domain: "Expression of Ideas", difficulty: "easy", passage: "She practiced the piano every single day. ______, she improved very quickly.", prompt: "Which choice completes the text with the most logical transition?", type: "mcq", choices: ["However", "As a result", "For example", "Instead"], correct: 1, explanation: "Practice caused improvement — \"As a result.\"" },
];
export const T2_RW_M2H_B: SatQuestion[] = [
  { id: "t2rw2h-9", section: "rw", domain: "Craft and Structure", difficulty: "hard", passage: "The report's tone is studiously ______, carefully avoiding any hint of the author's own opinion.", prompt: "Which choice completes the text with the most logical and precise word?", type: "mcq", choices: ["impartial", "strident", "effusive", "biased"], correct: 0, explanation: "Avoiding opinion makes the tone \"impartial.\"" },
  { id: "t2rw2h-10", section: "rw", domain: "Expression of Ideas", difficulty: "hard", passage: "The method is fast and inexpensive. ______, it sacrifices a degree of accuracy that some applications cannot tolerate.", prompt: "Which choice completes the text with the most logical transition?", type: "mcq", choices: ["Therefore", "However", "Similarly", "Thus"], correct: 1, explanation: "Advantages vs. a drawback is a contrast — \"However.\"" },
  { id: "t2rw2h-11", section: "rw", domain: "Standard English Conventions", difficulty: "hard", passage: "The grant supports researching new materials, testing prototypes, and ______ the results widely.", prompt: "Which choice conforms to the conventions of Standard English?", type: "mcq", choices: ["to share", "sharing", "share", "shared"], correct: 1, explanation: "Parallel with \"researching\" and \"testing\" requires the gerund \"sharing.\"" },
];
export const T2_M_M1_B: SatQuestion[] = [
  { id: "t2m1-7", section: "math", domain: "Algebra", difficulty: "med", prompt: "If 8x = 56, what is the value of x?", type: "grid", gridAnswers: ["7"], explanation: "x = 56 ÷ 8 = 7." },
  { id: "t2m1-8", section: "math", domain: "Problem-Solving and Data Analysis", difficulty: "med", prompt: "A recipe for 4 servings uses 2 eggs. How many eggs are needed for 10 servings?", type: "mcq", choices: ["5", "8", "6", "20"], correct: 0, explanation: "2 eggs ÷ 4 servings = 0.5 egg/serving; 0.5 × 10 = 5." },
  { id: "t2m1-9", section: "math", domain: "Geometry and Trigonometry", difficulty: "med", prompt: "A triangle has a base of 12 and a height of 5. What is its area?", type: "grid", gridAnswers: ["30"], explanation: "½ × 12 × 5 = 30." },
];
export const T2_M_M2E_B: SatQuestion[] = [
  { id: "t2m2e-7", section: "math", domain: "Algebra", difficulty: "easy", prompt: "If x / 2 = 9, what is the value of x?", type: "grid", gridAnswers: ["18"], explanation: "x = 9 × 2 = 18." },
  { id: "t2m2e-8", section: "math", domain: "Problem-Solving and Data Analysis", difficulty: "easy", prompt: "What is 75% of 8?", type: "mcq", choices: ["6", "4", "2", "75"], correct: 0, explanation: "0.75 × 8 = 6." },
  { id: "t2m2e-9", section: "math", domain: "Advanced Math", difficulty: "easy", prompt: "What is the value of 6²?", type: "grid", gridAnswers: ["36"], explanation: "6 × 6 = 36." },
];
export const T2_M_M2H_B: SatQuestion[] = [
  { id: "t2m2h-7", section: "math", domain: "Algebra", difficulty: "hard", prompt: "If 3x − y = 7 and y = 2, what is the value of x?", type: "mcq", choices: ["3", "2", "5", "9"], correct: 0, explanation: "3x − 2 = 7 → 3x = 9 → x = 3." },
  { id: "t2m2h-8", section: "math", domain: "Advanced Math", difficulty: "hard", prompt: "If x² + x − 6 = 0 and x > 0, what is the value of x?", type: "grid", gridAnswers: ["2"], explanation: "(x + 3)(x − 2) = 0 → x = −3 or 2; since x > 0, x = 2." },
  { id: "t2m2h-9", section: "math", domain: "Geometry and Trigonometry", difficulty: "hard", prompt: "A right triangle has legs of length 5 and 12. What is the length of the hypotenuse?", type: "grid", gridAnswers: ["13"], explanation: "√(25 + 144) = √169 = 13." },
];

// ── Test 3 ──
export const T3_RW_M1_B: SatQuestion[] = [
  { id: "t3rw1-9", section: "rw", domain: "Craft and Structure", difficulty: "med", passage: "The witness gave a remarkably ______ account, recalling each detail with striking precision.", prompt: "Which choice completes the text with the most logical and precise word?", type: "mcq", choices: ["vivid", "vague", "hesitant", "brief"], correct: 0, explanation: "Recalling details precisely makes the account \"vivid.\"" },
  { id: "t3rw1-10", section: "rw", domain: "Standard English Conventions", difficulty: "med", passage: "All employees should bring ______ own laptops to the training session.", prompt: "Which choice conforms to the conventions of Standard English?", type: "mcq", choices: ["their", "there", "they're", "its"], correct: 0, explanation: "Plural \"employees\" takes the plural possessive \"their.\"" },
  { id: "t3rw1-11", section: "rw", domain: "Expression of Ideas", difficulty: "med", passage: "The bridge is structurally sound. ______, it needs significant cosmetic repairs.", prompt: "Which choice completes the text with the most logical transition?", type: "mcq", choices: ["However", "Therefore", "Moreover", "Likewise"], correct: 0, explanation: "Sound but still needing repairs is a contrast — \"However.\"" },
];
export const T3_RW_M2E_B: SatQuestion[] = [
  { id: "t3rw2e-9", section: "rw", domain: "Craft and Structure", difficulty: "easy", passage: "After her long nap, the baby was ______ and smiled at everyone.", prompt: "Which choice completes the text with the most logical word?", type: "mcq", choices: ["happy", "tired", "hungry", "upset"], correct: 0, explanation: "Smiling at everyone shows she was \"happy.\"" },
  { id: "t3rw2e-10", section: "rw", domain: "Standard English Conventions", difficulty: "easy", passage: "We ______ pizza for dinner last night.", prompt: "Which choice conforms to the conventions of Standard English?", type: "mcq", choices: ["eat", "eats", "ate", "eating"], correct: 2, explanation: "\"Last night\" requires the past tense \"ate.\"" },
  { id: "t3rw2e-11", section: "rw", domain: "Expression of Ideas", difficulty: "easy", passage: "The main road was closed for repairs. ______, we took a different route.", prompt: "Which choice completes the text with the most logical transition?", type: "mcq", choices: ["However", "So", "For example", "Meanwhile"], correct: 1, explanation: "The closure led to a detour — \"So.\"" },
];
export const T3_RW_M2H_B: SatQuestion[] = [
  { id: "t3rw2h-9", section: "rw", domain: "Craft and Structure", difficulty: "hard", passage: "Her argument was ______, leaving no obvious objection unanswered.", prompt: "Which choice completes the text with the most logical and precise word?", type: "mcq", choices: ["airtight", "tenuous", "rambling", "superficial"], correct: 0, explanation: "Answering every objection makes the argument \"airtight.\"" },
  { id: "t3rw2h-10", section: "rw", domain: "Expression of Ideas", difficulty: "hard", passage: "Early reviews of the film were glowing. ______, ticket sales remained disappointingly low.", prompt: "Which choice completes the text with the most logical transition?", type: "mcq", choices: ["Therefore", "Yet", "Likewise", "Hence"], correct: 1, explanation: "Great reviews but poor sales is a contrast — \"Yet.\"" },
  { id: "t3rw2h-11", section: "rw", domain: "Standard English Conventions", difficulty: "hard", passage: "The quality of the field recordings ______ surprisingly high given the basic equipment used.", prompt: "Which choice conforms to the conventions of Standard English?", type: "mcq", choices: ["was", "were", "are", "have been"], correct: 0, explanation: "The subject is the singular \"quality,\" so \"was.\"" },
];
export const T3_M_M1_B: SatQuestion[] = [
  { id: "t3m1-7", section: "math", domain: "Algebra", difficulty: "med", prompt: "If 4x − 9 = 7, what is the value of x?", type: "grid", gridAnswers: ["4"], explanation: "4x = 16, so x = 4." },
  { id: "t3m1-8", section: "math", domain: "Problem-Solving and Data Analysis", difficulty: "med", prompt: "If 3 shirts cost $36, how much do 5 shirts cost at the same price?", type: "mcq", choices: ["$60", "$45", "$72", "$48"], correct: 0, explanation: "Each costs 36 ÷ 3 = $12; 5 × 12 = $60." },
  { id: "t3m1-9", section: "math", domain: "Geometry and Trigonometry", difficulty: "med", prompt: "A rectangle has a length of 7 and a width of 4. What is its perimeter?", type: "grid", gridAnswers: ["22"], explanation: "2(7 + 4) = 22." },
];
export const T3_M_M2E_B: SatQuestion[] = [
  { id: "t3m2e-7", section: "math", domain: "Algebra", difficulty: "easy", prompt: "If 2x + 1 = 11, what is the value of x?", type: "grid", gridAnswers: ["5"], explanation: "2x = 10, so x = 5." },
  { id: "t3m2e-8", section: "math", domain: "Problem-Solving and Data Analysis", difficulty: "easy", prompt: "What is 30% of 50?", type: "mcq", choices: ["15", "20", "30", "5"], correct: 0, explanation: "0.30 × 50 = 15." },
  { id: "t3m2e-9", section: "math", domain: "Advanced Math", difficulty: "easy", prompt: "What is the value of 2³?", type: "grid", gridAnswers: ["8"], explanation: "2 × 2 × 2 = 8." },
];
export const T3_M_M2H_B: SatQuestion[] = [
  { id: "t3m2h-7", section: "math", domain: "Algebra", difficulty: "hard", prompt: "If x − 2y = 1 and y = 3, what is the value of x?", type: "mcq", choices: ["7", "5", "4", "9"], correct: 0, explanation: "x − 6 = 1 → x = 7." },
  { id: "t3m2h-8", section: "math", domain: "Advanced Math", difficulty: "hard", prompt: "If x² − 5x = 0 and x > 0, what is the value of x?", type: "grid", gridAnswers: ["5"], explanation: "x(x − 5) = 0 → x = 0 or 5; since x > 0, x = 5." },
  { id: "t3m2h-9", section: "math", domain: "Geometry and Trigonometry", difficulty: "hard", prompt: "A circle has a radius of 3. Its area equals kπ. What is the value of k?", type: "grid", gridAnswers: ["9"], explanation: "Area = π(3²) = 9π, so k = 9." },
];
