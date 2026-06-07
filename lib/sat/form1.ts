import type { SatForm, SatQuestion } from "./types";
import {
  RW_M1_X, RW_M2_EASY_X, RW_M2_HARD_X,
  MATH_M1_X, MATH_M2_EASY_X, MATH_M2_HARD_X,
} from "./form1-extra";
import {
  RW_M1_X2, RW_M2_EASY_X2, RW_M2_HARD_X2,
  MATH_M1_X2, MATH_M2_EASY_X2, MATH_M2_HARD_X2,
} from "./form1-extra2";

/**
 * Practice Test 1 — original Digital-SAT-format items. Each section has a
 * Module 1 (mixed difficulty) plus an adaptive Module 2 in easy and hard
 * variants. Counts are smaller than a real form for v1; the engine and
 * scoring are full-spec and the pools are designed to scale.
 */

const RW_M1: SatQuestion[] = [
  {
    id: "rw1-1", section: "rw", domain: "Craft and Structure", difficulty: "med",
    passage: "Marine biologist Ayesha Khan's recent survey of the reef was remarkably ______: rather than focusing on a single species, she catalogued every organism living within each section of coral.",
    prompt: "Which choice completes the text with the most logical and precise word?",
    type: "mcq", choices: ["comprehensive", "tentative", "conventional", "brief"], correct: 0,
    explanation: "Cataloguing *every* organism (not just one species) signals thoroughness — \"comprehensive.\" \"Tentative\" and \"brief\" contradict that scope.",
  },
  {
    id: "rw1-2", section: "rw", domain: "Standard English Conventions", difficulty: "easy",
    passage: "The planning committee, along with several volunteers, ______ organizing the festival since January.",
    prompt: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    type: "mcq", choices: ["have been", "has been", "are", "were"], correct: 1,
    explanation: "The subject is the singular \"committee\"; the phrase \"along with several volunteers\" doesn't change its number, so the singular \"has been\" is correct.",
  },
  {
    id: "rw1-3", section: "rw", domain: "Information and Ideas", difficulty: "med",
    passage: "Although the printing press is often credited to Johannes Gutenberg, woodblock printing had existed in East Asia for centuries before him. What set Gutenberg's system apart was its reusable, movable metal type, which let printers produce many different texts quickly without carving each page anew.",
    prompt: "Which choice best states the main idea of the text?",
    type: "mcq", choices: [
      "Gutenberg was the first person in history to print text.",
      "Gutenberg's key innovation was reusable movable metal type, not printing itself.",
      "Woodblock printing was always superior to movable type.",
      "Printing technology never spread beyond East Asia.",
    ], correct: 1,
    explanation: "The passage grants that printing predated Gutenberg, then says what \"set [him] apart\" was movable metal type — exactly choice B.",
  },
  {
    id: "rw1-4", section: "rw", domain: "Information and Ideas", difficulty: "med",
    passage: "A researcher hypothesized that adding mycorrhizal fungi to soil increases tomato yield. In a controlled trial, plots treated with the fungi produced an average of 4.2 kg of tomatoes per plant, while untreated control plots produced 3.1 kg per plant.",
    prompt: "Which choice most effectively uses data from the text to support the researcher's hypothesis?",
    type: "mcq", choices: [
      "Treated plots (4.2 kg per plant) outproduced control plots (3.1 kg per plant).",
      "Control plots (3.1 kg per plant) outproduced treated plots (4.2 kg per plant).",
      "Both groups produced exactly 4.2 kg per plant.",
      "The fungi had no measurable effect on yield.",
    ], correct: 0,
    explanation: "The hypothesis is that the fungi *increase* yield; the supporting data is that treated plants (4.2) beat controls (3.1).",
  },
  {
    id: "rw1-5", section: "rw", domain: "Expression of Ideas", difficulty: "med",
    passage: "Solar panels have become far cheaper over the past decade. ______, many homeowners who once considered them unaffordable are now installing them.",
    prompt: "Which choice completes the text with the most logical transition?",
    type: "mcq", choices: ["However", "For example", "As a result", "Nevertheless"], correct: 2,
    explanation: "Falling prices *cause* more installations — a cause-and-effect link, signaled by \"As a result.\"",
  },
];

const RW_M2_EASY: SatQuestion[] = [
  {
    id: "rw2e-1", section: "rw", domain: "Craft and Structure", difficulty: "easy",
    passage: "The puppy was so ______ that it greeted every visitor with a wagging tail and happy barks.",
    prompt: "Which choice completes the text with the most logical word?",
    type: "mcq", choices: ["friendly", "shy", "tired", "angry"], correct: 0,
    explanation: "Greeting everyone with a wagging tail shows the puppy is \"friendly.\"",
  },
  {
    id: "rw2e-2", section: "rw", domain: "Standard English Conventions", difficulty: "easy",
    passage: "Last weekend the students ______ to the science museum with their teacher.",
    prompt: "Which choice conforms to the conventions of Standard English?",
    type: "mcq", choices: ["goes", "go", "went", "gone"], correct: 2,
    explanation: "\"Last weekend\" sets the past tense, so the past-tense \"went\" is correct.",
  },
  {
    id: "rw2e-3", section: "rw", domain: "Information and Ideas", difficulty: "easy",
    passage: "Honeybees share the location of food through a movement called the \"waggle dance.\" The direction of the dance tells other bees which way to fly, and its length tells them how far.",
    prompt: "Which choice best states the main idea of the text?",
    type: "mcq", choices: [
      "Honeybees use a waggle dance to tell other bees where food is.",
      "Honeybees cannot communicate with one another.",
      "The waggle dance is used only to warn of danger.",
      "Honeybees fly in random directions.",
    ], correct: 0,
    explanation: "The passage explains how the dance communicates food location — choice A.",
  },
  {
    id: "rw2e-4", section: "rw", domain: "Expression of Ideas", difficulty: "easy",
    passage: "Heavy rain began to fall during the afternoon. ______, the outdoor concert was canceled.",
    prompt: "Which choice completes the text with the most logical transition?",
    type: "mcq", choices: ["Therefore", "However", "For example", "Meanwhile"], correct: 0,
    explanation: "The rain causes the cancellation, so the cause-effect transition \"Therefore\" fits.",
  },
  {
    id: "rw2e-5", section: "rw", domain: "Standard English Conventions", difficulty: "easy",
    passage: "Each of the players ______ a numbered jersey before the game.",
    prompt: "Which choice conforms to the conventions of Standard English?",
    type: "mcq", choices: ["have", "has", "having", "been"], correct: 1,
    explanation: "\"Each\" is singular, so it takes the singular verb \"has.\"",
  },
];

const RW_M2_HARD: SatQuestion[] = [
  {
    id: "rw2h-1", section: "rw", domain: "Craft and Structure", difficulty: "hard",
    passage: "The senator's ostensibly ______ remarks in fact masked a pointed critique of the administration's economic policy.",
    prompt: "Which choice completes the text with the most logical and precise word?",
    type: "mcq", choices: ["innocuous", "vehement", "candid", "verbose"], correct: 0,
    explanation: "\"Ostensibly ___ … masked a pointed critique\" requires a word meaning harmless/inoffensive on the surface — \"innocuous.\"",
  },
  {
    id: "rw2h-2", section: "rw", domain: "Information and Ideas", difficulty: "hard",
    passage: "Critics long dismissed the novel as merely sentimental. Recent scholarship, however, has reappraised its careful architecture, arguing that its tearful scenes are deliberately staged to critique the very sentimentality they appear to indulge.",
    prompt: "Which choice best describes the main purpose of the text?",
    type: "mcq", choices: [
      "To argue that the novel is nothing more than sentimental.",
      "To present a reappraisal that reads the novel's sentimentality as deliberate critique.",
      "To provide a plot summary of the novel.",
      "To dismiss recent scholarship on the novel.",
    ], correct: 1,
    explanation: "The text pivots on \"however\" to recent scholarship that reframes the sentimentality as intentional critique — choice B.",
  },
  {
    id: "rw2h-3", section: "rw", domain: "Information and Ideas", difficulty: "hard",
    passage: "In a study of caffeine and alertness, participants' mean reaction times were measured at three doses: 0 mg → 320 ms, 100 mg → 295 ms, and 200 mg → 298 ms.",
    prompt: "Which statement is best supported by the data?",
    type: "mcq", choices: [
      "Reaction time fell from 0 to 100 mg, then changed little from 100 to 200 mg.",
      "Reaction time fell steadily as the dose increased.",
      "The 200 mg dose produced the fastest reaction time.",
      "Caffeine had no measurable effect at any dose.",
    ], correct: 0,
    explanation: "320 → 295 is a clear drop; 295 → 298 is essentially flat. So benefit appears between 0 and 100 mg and then plateaus — choice A.",
  },
  {
    id: "rw2h-4", section: "rw", domain: "Expression of Ideas", difficulty: "hard",
    passage: "The treaty was hailed at the time as a triumph of patient diplomacy. ______, within a single decade its central provisions had been quietly abandoned by every signatory.",
    prompt: "Which choice completes the text with the most logical transition?",
    type: "mcq", choices: ["Consequently", "Indeed", "Yet", "Likewise"], correct: 2,
    explanation: "A celebrated treaty collapsing soon after is a contrast, signaled by \"Yet.\"",
  },
  {
    id: "rw2h-5", section: "rw", domain: "Standard English Conventions", difficulty: "hard",
    passage: "The storm intensified overnight ______ by morning the swollen river had flooded the lower fields.",
    prompt: "Which choice conforms to the conventions of Standard English?",
    type: "mcq", choices: ["overnight, by", "overnight; by", "overnight by", "overnight: by"], correct: 1,
    explanation: "Two independent clauses (\"The storm intensified overnight\" / \"by morning … fields\") are correctly joined by a semicolon. A comma alone is a splice.",
  },
];

const MATH_M1: SatQuestion[] = [
  {
    id: "m1-1", section: "math", domain: "Algebra", difficulty: "easy",
    prompt: "If 3x − 7 = 14, what is the value of x?",
    type: "grid", gridAnswers: ["7"],
    explanation: "3x − 7 = 14 → 3x = 21 → x = 7.",
  },
  {
    id: "m1-2", section: "math", domain: "Problem-Solving and Data Analysis", difficulty: "med",
    prompt: "A jacket that normally costs $80 is on sale for 25% off. What is the sale price, in dollars?",
    type: "mcq", choices: ["$55", "$60", "$65", "$75"], correct: 1,
    explanation: "25% of 80 is 20; 80 − 20 = $60.",
  },
  {
    id: "m1-3", section: "math", domain: "Algebra", difficulty: "med",
    prompt: "If 2x + y = 10 and y = x + 1, what is the value of x?",
    type: "grid", gridAnswers: ["3"],
    explanation: "Substitute: 2x + (x + 1) = 10 → 3x + 1 = 10 → 3x = 9 → x = 3.",
  },
  {
    id: "m1-4", section: "math", domain: "Advanced Math", difficulty: "med",
    prompt: "The function f is defined by f(x) = 4x − 5. What is the value of f(3)?",
    type: "mcq", choices: ["7", "12", "−5", "17"], correct: 0,
    explanation: "f(3) = 4(3) − 5 = 12 − 5 = 7.",
  },
  {
    id: "m1-5", section: "math", domain: "Problem-Solving and Data Analysis", difficulty: "med",
    prompt: "A recipe uses 2 cups of flour for every 3 cookies. How many cups of flour are needed to make 12 cookies?",
    type: "grid", gridAnswers: ["8"],
    explanation: "12 cookies is 4 batches of 3; 4 × 2 = 8 cups.",
  },
];

const MATH_M2_EASY: SatQuestion[] = [
  {
    id: "m2e-1", section: "math", domain: "Algebra", difficulty: "easy",
    prompt: "If x + 5 = 12, what is the value of x?",
    type: "grid", gridAnswers: ["7"],
    explanation: "x = 12 − 5 = 7.",
  },
  {
    id: "m2e-2", section: "math", domain: "Problem-Solving and Data Analysis", difficulty: "easy",
    prompt: "What is 10% of 250?",
    type: "mcq", choices: ["25", "2.5", "250", "50"], correct: 0,
    explanation: "10% of 250 = 0.10 × 250 = 25.",
  },
  {
    id: "m2e-3", section: "math", domain: "Algebra", difficulty: "easy",
    prompt: "A line has slope 2 and passes through (0, 3). What is the value of y when x = 4?",
    type: "grid", gridAnswers: ["11"],
    explanation: "y = 2x + 3 = 2(4) + 3 = 11.",
  },
  {
    id: "m2e-4", section: "math", domain: "Algebra", difficulty: "easy",
    prompt: "If 5x = 35, what is the value of x?",
    type: "mcq", choices: ["6", "7", "30", "40"], correct: 1,
    explanation: "x = 35 ÷ 5 = 7.",
  },
  {
    id: "m2e-5", section: "math", domain: "Geometry and Trigonometry", difficulty: "easy",
    prompt: "A triangle has a base of 6 and a height of 4. What is its area?",
    type: "grid", gridAnswers: ["12"],
    explanation: "Area = ½ × base × height = ½ × 6 × 4 = 12.",
  },
];

const MATH_M2_HARD: SatQuestion[] = [
  {
    id: "m2h-1", section: "math", domain: "Advanced Math", difficulty: "hard",
    prompt: "If x² − 5x + 6 = 0 and x > 2, what is the value of x?",
    type: "grid", gridAnswers: ["3"],
    explanation: "Factor: (x − 2)(x − 3) = 0 → x = 2 or 3. Since x > 2, x = 3.",
  },
  {
    id: "m2h-2", section: "math", domain: "Advanced Math", difficulty: "hard",
    prompt: "A bacteria population doubles every 3 hours. If it starts at 200, how many bacteria are there after 9 hours?",
    type: "mcq", choices: ["600", "800", "1,600", "1,800"], correct: 2,
    explanation: "9 ÷ 3 = 3 doublings → 200 × 2³ = 200 × 8 = 1,600.",
  },
  {
    id: "m2h-3", section: "math", domain: "Algebra", difficulty: "hard",
    prompt: "The sum of two numbers is 24 and their difference is 6. What is the larger of the two numbers?",
    type: "grid", gridAnswers: ["15"],
    explanation: "Larger = (sum + difference) ÷ 2 = (24 + 6) ÷ 2 = 15.",
  },
  {
    id: "m2h-4", section: "math", domain: "Advanced Math", difficulty: "hard",
    prompt: "If f(x) = 2x² − 3x + 1, what is the value of f(−2)?",
    type: "mcq", choices: ["15", "3", "11", "−1"], correct: 0,
    explanation: "f(−2) = 2(4) − 3(−2) + 1 = 8 + 6 + 1 = 15.",
  },
  {
    id: "m2h-5", section: "math", domain: "Geometry and Trigonometry", difficulty: "hard",
    prompt: "In a right triangle, the two legs measure 9 and 12. What is the length of the hypotenuse?",
    type: "grid", gridAnswers: ["15"],
    explanation: "Hypotenuse = √(9² + 12²) = √(81 + 144) = √225 = 15.",
  },
];

export const SAT_FORM_1: SatForm = {
  id: "practice-1",
  title: "InHero SAT Practice Test 1",
  rw: {
    m1: [...RW_M1, ...RW_M1_X, ...RW_M1_X2],
    m2easy: [...RW_M2_EASY, ...RW_M2_EASY_X, ...RW_M2_EASY_X2],
    m2hard: [...RW_M2_HARD, ...RW_M2_HARD_X, ...RW_M2_HARD_X2],
    timeSec: 1200,
  },
  math: {
    m1: [...MATH_M1, ...MATH_M1_X, ...MATH_M1_X2],
    m2easy: [...MATH_M2_EASY, ...MATH_M2_EASY_X, ...MATH_M2_EASY_X2],
    m2hard: [...MATH_M2_HARD, ...MATH_M2_HARD_X, ...MATH_M2_HARD_X2],
    timeSec: 1380,
  },
};
