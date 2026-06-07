import type { SatQuestion } from "./types";

/**
 * Practice Test 1 — additional original items, merged into the pools in
 * form1.ts. Every answer key is hand-verified. Keep difficulty consistent
 * with each pool (m1 = mixed, m2easy = easier, m2hard = harder).
 */

export const RW_M1_X: SatQuestion[] = [
  {
    id: "rw1-6", section: "rw", domain: "Craft and Structure", difficulty: "med",
    passage: "Despite the team's ______ preparation for the rocket launch, a minor software glitch forced a delay of several hours.",
    prompt: "Which choice completes the text with the most logical and precise word?",
    type: "mcq", choices: ["meticulous", "careless", "hasty", "reluctant"], correct: 0,
    explanation: "\"Despite … preparation\" plus the fact that only a *minor* glitch caused trouble implies the prep was thorough — \"meticulous.\"",
  },
  {
    id: "rw1-7", section: "rw", domain: "Standard English Conventions", difficulty: "med",
    passage: "The orchestra tuned ______ instruments carefully before the concert began.",
    prompt: "Which choice conforms to the conventions of Standard English?",
    type: "mcq", choices: ["its", "it's", "their", "they're"], correct: 0,
    explanation: "\"Orchestra\" is a singular collective noun, so the singular possessive \"its\" is correct. \"It's\" means \"it is.\"",
  },
  {
    id: "rw1-8", section: "rw", domain: "Information and Ideas", difficulty: "med",
    passage: "Octopuses can change both the color and the texture of their skin in under a second, letting them blend into rocks, coral, or sand almost instantly.",
    prompt: "Which statement is best supported by the text?",
    type: "mcq", choices: [
      "Octopuses can camouflage themselves very quickly by altering their skin.",
      "Octopuses change only their color, never their texture.",
      "Camouflage takes octopuses several minutes.",
      "Octopuses can imitate only sand.",
    ], correct: 0,
    explanation: "The text says they change color *and* texture in under a second to blend in — rapid camouflage (choice A).",
  },
  {
    id: "rw1-9", section: "rw", domain: "Expression of Ideas", difficulty: "med",
    passage: "The city's new recycling program sharply reduced the amount of waste sent to landfills. ______, it cut the city's disposal costs by nearly a third.",
    prompt: "Which choice completes the text with the most logical transition?",
    type: "mcq", choices: ["Moreover", "However", "In contrast", "Otherwise"], correct: 0,
    explanation: "A second, related benefit is being *added*, so the additive transition \"Moreover\" fits.",
  },
  {
    id: "rw1-10", section: "rw", domain: "Standard English Conventions", difficulty: "med",
    passage: "By the time the storm finally passed ______ the streets of the old harbor town were already flooded.",
    prompt: "Which choice conforms to the conventions of Standard English?",
    type: "mcq", choices: ["passed the", "passed, the", "passed; the", "passed: the"], correct: 1,
    explanation: "An introductory dependent clause takes a comma before the main clause: \"By the time the storm passed, the streets…\"",
  },
];

export const RW_M2_EASY_X: SatQuestion[] = [
  {
    id: "rw2e-6", section: "rw", domain: "Craft and Structure", difficulty: "easy",
    passage: "The soup was too ______ to eat right away, so we waited a few minutes for it to cool.",
    prompt: "Which choice completes the text with the most logical word?",
    type: "mcq", choices: ["hot", "cold", "sweet", "empty"], correct: 0,
    explanation: "Waiting for it to cool means it was too \"hot.\"",
  },
  {
    id: "rw2e-7", section: "rw", domain: "Standard English Conventions", difficulty: "easy",
    passage: "Tomorrow afternoon we ______ visit our grandparents in the countryside.",
    prompt: "Which choice conforms to the conventions of Standard English?",
    type: "mcq", choices: ["will", "were", "have", "had"], correct: 0,
    explanation: "\"Tomorrow\" signals the future, so \"will visit\" is correct.",
  },
  {
    id: "rw2e-8", section: "rw", domain: "Information and Ideas", difficulty: "easy",
    passage: "Penguins are birds, but they cannot fly. Instead, their stiff, narrow wings act like flippers that let them swim swiftly through the water.",
    prompt: "Which choice best states the main idea of the text?",
    type: "mcq", choices: [
      "Penguins use their wings to swim rather than to fly.",
      "Penguins can fly long distances.",
      "Penguins are not birds.",
      "Penguins cannot swim.",
    ], correct: 0,
    explanation: "The passage says penguins can't fly and their wings work like flippers for swimming (choice A).",
  },
  {
    id: "rw2e-9", section: "rw", domain: "Expression of Ideas", difficulty: "easy",
    passage: "I forgot my umbrella at home. ______, I got soaked on the walk back from school.",
    prompt: "Which choice completes the text with the most logical transition?",
    type: "mcq", choices: ["As a result", "However", "For example", "Instead"], correct: 0,
    explanation: "Forgetting the umbrella *causes* getting soaked — \"As a result.\"",
  },
  {
    id: "rw2e-10", section: "rw", domain: "Standard English Conventions", difficulty: "easy",
    passage: "My brother and I ______ going to the basketball game tonight.",
    prompt: "Which choice conforms to the conventions of Standard English?",
    type: "mcq", choices: ["is", "am", "are", "was"], correct: 2,
    explanation: "The compound subject \"My brother and I\" is plural, so it takes \"are.\"",
  },
];

export const RW_M2_HARD_X: SatQuestion[] = [
  {
    id: "rw2h-6", section: "rw", domain: "Craft and Structure", difficulty: "hard",
    passage: "Far from being ______, the committee's report was a model of concision, distilling years of research into ten lucid pages.",
    prompt: "Which choice completes the text with the most logical and precise word?",
    type: "mcq", choices: ["prolix", "succinct", "accurate", "persuasive"], correct: 0,
    explanation: "\"Far from being ___, … a model of concision\" needs the opposite of concise — \"prolix\" (wordy).",
  },
  {
    id: "rw2h-7", section: "rw", domain: "Craft and Structure", difficulty: "hard",
    passage: "The essayist spends her first three paragraphs cataloguing common myths about sleep before introducing, almost in passing, the single study that overturns them all.",
    prompt: "Which choice best describes the function of the first three paragraphs?",
    type: "mcq", choices: [
      "They establish the misconceptions that the later study will dismantle.",
      "They summarize the study's research methods.",
      "They argue that the myths about sleep are correct.",
      "They bring the essay to its conclusion.",
    ], correct: 0,
    explanation: "The myths are laid out first precisely so the study introduced afterward can overturn them (choice A).",
  },
  {
    id: "rw2h-8", section: "rw", domain: "Information and Ideas", difficulty: "hard",
    passage: "In a survey about a proposed transit line, support was 72% among respondents under 30, 54% among those aged 30–49, and 38% among those 50 and older.",
    prompt: "Which statement is best supported by the data?",
    type: "mcq", choices: [
      "Support for the proposal declined as respondents' age increased.",
      "Support was highest among respondents 50 and older.",
      "Support was roughly identical across all age groups.",
      "Support increased as respondents' age increased.",
    ], correct: 0,
    explanation: "72% → 54% → 38% falls as age rises, so support declined with age (choice A).",
  },
  {
    id: "rw2h-9", section: "rw", domain: "Expression of Ideas", difficulty: "hard",
    passage: "The experimental drug performed impressively in early trials. ______, its long-term effects remain almost entirely unstudied.",
    prompt: "Which choice completes the text with the most logical transition?",
    type: "mcq", choices: ["Accordingly", "Nonetheless", "For instance", "Similarly"], correct: 1,
    explanation: "Strong early results contrasted with an important gap calls for a concessive contrast — \"Nonetheless.\"",
  },
  {
    id: "rw2h-10", section: "rw", domain: "Standard English Conventions", difficulty: "hard",
    passage: "The internship taught her not only how to analyze large data sets ______ how to present her findings to a nontechnical audience.",
    prompt: "Which choice conforms to the conventions of Standard English?",
    type: "mcq", choices: ["and also", "but also", "but they also", "however"], correct: 1,
    explanation: "The correlative pair is \"not only … but also.\"",
  },
];

export const MATH_M1_X: SatQuestion[] = [
  {
    id: "m1-6", section: "math", domain: "Algebra", difficulty: "med",
    prompt: "If 4(x − 2) = 20, what is the value of x?",
    type: "grid", gridAnswers: ["7"],
    explanation: "4(x − 2) = 20 → x − 2 = 5 → x = 7.",
  },
  {
    id: "m1-7", section: "math", domain: "Problem-Solving and Data Analysis", difficulty: "med",
    prompt: "A car travels 150 miles in 3 hours at a constant speed. At that rate, how many miles will it travel in 5 hours?",
    type: "mcq", choices: ["200", "250", "300", "450"], correct: 1,
    explanation: "Speed = 150 ÷ 3 = 50 mph; 50 × 5 = 250 miles.",
  },
  {
    id: "m1-8", section: "math", domain: "Advanced Math", difficulty: "med",
    prompt: "If g(x) = x² + 2x, what is the value of g(4)?",
    type: "mcq", choices: ["24", "12", "16", "20"], correct: 0,
    explanation: "g(4) = 4² + 2(4) = 16 + 8 = 24.",
  },
  {
    id: "m1-9", section: "math", domain: "Geometry and Trigonometry", difficulty: "med",
    prompt: "A rectangle has a length of 8 and a width of 5. What is its perimeter?",
    type: "grid", gridAnswers: ["26"],
    explanation: "Perimeter = 2(length + width) = 2(8 + 5) = 26.",
  },
];

export const MATH_M2_EASY_X: SatQuestion[] = [
  {
    id: "m2e-6", section: "math", domain: "Algebra", difficulty: "easy",
    prompt: "If 2x = 18, what is the value of x?",
    type: "grid", gridAnswers: ["9"],
    explanation: "x = 18 ÷ 2 = 9.",
  },
  {
    id: "m2e-7", section: "math", domain: "Problem-Solving and Data Analysis", difficulty: "easy",
    prompt: "A box contains 3 red balls and 2 blue balls. What fraction of the balls are red?",
    type: "mcq", choices: ["3/5", "2/5", "3/2", "1/5"], correct: 0,
    explanation: "There are 3 + 2 = 5 balls; 3 are red, so 3/5.",
  },
  {
    id: "m2e-8", section: "math", domain: "Geometry and Trigonometry", difficulty: "easy",
    prompt: "A square has a side length of 7. What is its area?",
    type: "grid", gridAnswers: ["49"],
    explanation: "Area of a square = side² = 7² = 49.",
  },
  {
    id: "m2e-9", section: "math", domain: "Algebra", difficulty: "easy",
    prompt: "What is the value of 3 + 4 × 2?",
    type: "mcq", choices: ["11", "14", "10", "24"], correct: 0,
    explanation: "Multiply first: 4 × 2 = 8; then 3 + 8 = 11.",
  },
];

export const MATH_M2_HARD_X: SatQuestion[] = [
  {
    id: "m2h-6", section: "math", domain: "Advanced Math", difficulty: "hard",
    prompt: "If 2^x = 32, what is the value of x?",
    type: "grid", gridAnswers: ["5"],
    explanation: "32 = 2⁵, so x = 5.",
  },
  {
    id: "m2h-7", section: "math", domain: "Algebra", difficulty: "hard",
    prompt: "At a shop, 3 pens and 2 notebooks cost $13, while 1 pen and 1 notebook cost $5. What is the cost of one notebook, in dollars?",
    type: "mcq", choices: ["$2", "$3", "$4", "$5"], correct: 0,
    explanation: "From p + n = 5, p = 5 − n. Then 3(5 − n) + 2n = 13 → 15 − n = 13 → n = 2.",
  },
  {
    id: "m2h-8", section: "math", domain: "Advanced Math", difficulty: "hard",
    prompt: "The product of two consecutive positive integers is 56. What is the larger of the two integers?",
    type: "grid", gridAnswers: ["8"],
    explanation: "7 × 8 = 56, so the integers are 7 and 8; the larger is 8.",
  },
  {
    id: "m2h-9", section: "math", domain: "Geometry and Trigonometry", difficulty: "hard",
    prompt: "In a right triangle, one leg has length 5 and the hypotenuse has length 13. What is the length of the other leg?",
    type: "mcq", choices: ["12", "8", "144", "18"], correct: 0,
    explanation: "Other leg = √(13² − 5²) = √(169 − 25) = √144 = 12.",
  },
];
