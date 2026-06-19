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
    explanation: "The word \"Despite\" sets up a contrast: even though the team prepared in a certain way, a problem still arose. For \"Despite\" to make sense, the preparation must have been extensive — so good that a delay is surprising — and the problem is only a \"minor software glitch.\" The blank therefore needs a word meaning careful and thorough: \"meticulous.\" (A) meticulous fits: despite extremely careful prep, a small glitch still caused a delay. (B) \"careless\" would make \"Despite\" illogical — careless prep would naturally lead to problems, not contrast with them. (C) \"hasty\" similarly removes the contrast, since rushed prep would expect glitches. (D) \"reluctant\" describes attitude, not thoroughness, and doesn't fit the \"despite … only a minor problem\" logic. The trap is reading \"Despite\" as if the prep were bad; \"Despite\" requires the prep to be good, so \"meticulous\" is correct.",
  },
  {
    id: "rw1-7", section: "rw", domain: "Standard English Conventions", difficulty: "med",
    passage: "The orchestra tuned ______ instruments carefully before the concert began.",
    prompt: "Which choice conforms to the conventions of Standard English?",
    type: "mcq", choices: ["its", "it's", "their", "they're"], correct: 0,
    explanation: "The blank needs a possessive pronoun for the instruments belonging to \"The orchestra.\" \"Orchestra\" is a singular collective noun, so it takes the singular possessive \"its.\" (A) its is the correct singular possessive and is correct. (B) \"it's\" is a contraction of \"it is\" (or \"it has\"); plugging in \"it is instruments\" is ungrammatical. (C) \"their\" is plural and would only fit a plural antecedent, but the orchestra is treated as one singular unit here. (D) \"they're\" means \"they are,\" another contraction that produces \"they are instruments,\" which is nonsense in context. The classic trap is the its/it's confusion: the possessive \"its\" has no apostrophe, while \"it's\" always means \"it is\"; the sentence needs possession, so \"its.\"",
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
    explanation: "The question asks what the text best supports. The passage states octopuses change \"both the color and the texture of their skin in under a second,\" which lets them \"blend into rocks, coral, or sand almost instantly.\" The supported conclusion is that they camouflage themselves very quickly by altering their skin. (A) states exactly this and is correct. (B) is contradicted — the text explicitly says they change color AND texture, not color only. (C) directly contradicts \"under a second\" and \"almost instantly\"; camouflage is fast, not minutes-long. (D) is too narrow and unsupported — the text lists rocks, coral, OR sand, so they imitate multiple surfaces, not only sand. The trap is (B), which echoes the passage's wording but drops half of it (\"texture\"), making it factually wrong.",
  },
  {
    id: "rw1-9", section: "rw", domain: "Expression of Ideas", difficulty: "med",
    passage: "The city's new recycling program sharply reduced the amount of waste sent to landfills. ______, it cut the city's disposal costs by nearly a third.",
    prompt: "Which choice completes the text with the most logical transition?",
    type: "mcq", choices: ["Moreover", "However", "In contrast", "Otherwise"], correct: 0,
    explanation: "Find the relationship between the sentences. Sentence 1: the recycling program cut landfill waste. Sentence 2: it also cut disposal costs by nearly a third. Both are positive results of the same program, and sentence 2 ADDS a second benefit to the first, so an additive transition is needed. (A) \"Moreover\" means \"in addition\" and is correct. (B) \"However\" signals contrast, but the two benefits agree rather than oppose. (C) \"In contrast\" likewise sets up opposition, which doesn't fit two complementary benefits. (D) \"Otherwise\" means \"if not / under other conditions,\" which makes no sense between two stated facts. The trap is reaching for a contrast word; both sentences point the same direction, so the additive \"Moreover\" is correct.",
  },
  {
    id: "rw1-10", section: "rw", domain: "Standard English Conventions", difficulty: "med",
    passage: "By the time the storm finally passed ______ the streets of the old harbor town were already flooded.",
    prompt: "Which choice conforms to the conventions of Standard English?",
    type: "mcq", choices: ["passed the", "passed, the", "passed; the", "passed: the"], correct: 1,
    explanation: "This tests punctuation between an introductory dependent clause and the main clause. \"By the time the storm finally passed\" is a dependent (subordinate) clause; when such a clause opens a sentence, it is followed by a comma before the independent clause \"the streets … were already flooded.\" (B) \"passed, the\" places that comma correctly and is correct. (A) \"passed the\" omits the needed comma, running the clauses together. (C) \"passed; the\" misuses a semicolon, which joins two INDEPENDENT clauses, but \"By the time the storm finally passed\" cannot stand alone as a sentence. (D) \"passed: the\" misuses a colon, which should introduce a list or an explanation, not separate an introductory clause from its main clause. The trap is the semicolon in (C): it looks tempting, but it requires both sides to be complete sentences, and the first part is dependent, so a comma is correct.",
  },
];

export const RW_M2_EASY_X: SatQuestion[] = [
  {
    id: "rw2e-6", section: "rw", domain: "Craft and Structure", difficulty: "easy",
    passage: "The soup was too ______ to eat right away, so we waited a few minutes for it to cool.",
    prompt: "Which choice completes the text with the most logical word?",
    type: "mcq", choices: ["hot", "cold", "sweet", "empty"], correct: 0,
    explanation: "The blank describes the soup, and the evidence is that they \"waited a few minutes for it to cool\" before eating. Something you wait to cool must currently be too hot. (A) hot fits the logic exactly. (B) \"cold\" is the opposite — you wouldn't wait for cold soup to cool. (C) \"sweet\" describes taste, which has nothing to do with needing to cool. (D) \"empty\" is illogical, since you can't eat empty soup and emptiness wouldn't require cooling. The cooling clue points only to \"hot.\"",
  },
  {
    id: "rw2e-7", section: "rw", domain: "Standard English Conventions", difficulty: "easy",
    passage: "Tomorrow afternoon we ______ visit our grandparents in the countryside.",
    prompt: "Which choice conforms to the conventions of Standard English?",
    type: "mcq", choices: ["will", "were", "have", "had"], correct: 0,
    explanation: "This tests verb tense. The time marker \"Tomorrow afternoon\" places the action in the future, so the future-tense helper \"will\" is needed: \"will visit.\" (A) will is correct. (B) \"were\" is past tense, which contradicts \"Tomorrow.\" (C) \"have\" would create \"have visit,\" which is ungrammatical (present perfect needs \"have visited,\" and that's past-oriented anyway). (D) \"had\" is past perfect, again clashing with the future time marker. The trap is any past-tense option; the signal word \"Tomorrow\" demands the future \"will.\"",
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
    explanation: "The question asks for the main idea. The passage states penguins \"are birds, but they cannot fly,\" and that \"their stiff, narrow wings act like flippers that let them swim swiftly.\" The central point is that penguins use their wings for swimming instead of flying. (A) captures this and is correct. (B) is contradicted — the text says penguins \"cannot fly,\" so they don't fly long distances. (C) contradicts \"Penguins are birds\" stated directly in the passage. (D) is the opposite of the text, which says the wing-flippers let them \"swim swiftly.\" The trap is (B): it focuses on the wings/flight idea but reverses the passage's key claim that they cannot fly.",
  },
  {
    id: "rw2e-9", section: "rw", domain: "Expression of Ideas", difficulty: "easy",
    passage: "I forgot my umbrella at home. ______, I got soaked on the walk back from school.",
    prompt: "Which choice completes the text with the most logical transition?",
    type: "mcq", choices: ["As a result", "However", "For example", "Instead"], correct: 0,
    explanation: "Find the relationship. Sentence 1: I forgot my umbrella. Sentence 2: I got soaked walking back. Forgetting the umbrella is the CAUSE and getting soaked is the EFFECT, so a cause-and-effect transition is needed. (A) \"As a result\" signals that consequence and is correct. (B) \"However\" signals contrast, but the two ideas agree (no umbrella leads to getting wet). (C) \"For example\" introduces an instance of a general point, but getting soaked is a consequence, not an example. (D) \"Instead\" signals a replacement or alternative, which doesn't fit a cause-effect chain. The trap is a contrast word like \"However\"; the logic flows straight from cause to effect, so \"As a result\" fits.",
  },
  {
    id: "rw2e-10", section: "rw", domain: "Standard English Conventions", difficulty: "easy",
    passage: "My brother and I ______ going to the basketball game tonight.",
    prompt: "Which choice conforms to the conventions of Standard English?",
    type: "mcq", choices: ["is", "am", "are", "was"], correct: 2,
    explanation: "This tests subject-verb agreement. The subject \"My brother and I\" is a compound subject joined by \"and,\" which makes it plural, so it needs a plural verb: \"are.\" (C) are is the plural present-tense verb and is correct. (A) \"is\" is singular and doesn't agree with a two-person plural subject. (B) \"am\" agrees only with \"I\" alone, not with \"My brother and I.\" (D) \"was\" is singular past tense, wrong in both number and (given \"tonight\") tense. The trap is hearing only \"I\" and choosing \"am\"; two people joined by \"and\" form a plural subject, so \"are\" is correct.",
  },
];

export const RW_M2_HARD_X: SatQuestion[] = [
  {
    id: "rw2h-6", section: "rw", domain: "Craft and Structure", difficulty: "hard",
    passage: "Far from being ______, the committee's report was a model of concision, distilling years of research into ten lucid pages.",
    prompt: "Which choice completes the text with the most logical and precise word?",
    type: "mcq", choices: ["prolix", "succinct", "accurate", "persuasive"], correct: 0,
    explanation: "The phrase \"Far from being ___\" sets up a contrast with what follows: the report \"was a model of concision, distilling years of research into ten lucid pages.\" Since the report IS concise, the blank must name the opposite of concise — wordy or long-winded. That word is \"prolix.\" (A) prolix means excessively wordy, the exact opposite of concise, so \"far from being prolix\" correctly contrasts with \"a model of concision.\" (B) \"succinct\" means concise, which would make the sentence say \"far from being concise, it was concise\" — a contradiction. (C) \"accurate\" describes correctness, not length, so it doesn't contrast with concision. (D) \"persuasive\" describes effectiveness, again unrelated to brevity. The trap is (B): \"succinct\" matches the report's actual quality, but \"Far from being\" demands its opposite, so \"prolix\" is correct.",
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
    explanation: "The question asks for the FUNCTION of the first three paragraphs. The essayist spends them \"cataloguing common myths about sleep\" before introducing \"the single study that overturns them all.\" So those paragraphs set up the misconceptions that the later study will then dismantle. (A) states this function exactly and is correct. (B) is wrong — the paragraphs list myths, not the study's research methods, which aren't mentioned. (C) reverses the author's stance: the myths are presented to be overturned, not endorsed as correct. (D) is wrong because these are the opening paragraphs that establish a problem, not a conclusion. The trap is (C): it assumes laying out the myths means agreeing with them, but the essay's point is to refute them with the study.",
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
    explanation: "Read the data by age group: under 30 = 72%, 30–49 = 54%, 50 and older = 38%. As age increases across the three groups, support steadily decreases (72 → 54 → 38). (A) states that support declined as age increased and is correct. (B) is false — support was lowest, not highest, among those 50 and older (38%). (C) is contradicted by the wide spread from 72% to 38%, which is hardly \"roughly identical.\" (D) reverses the trend: support fell, not rose, with age. The trap is (D), which describes the right variable (age) but the wrong direction; tracking the numbers from youngest to oldest shows a clear decline.",
  },
  {
    id: "rw2h-9", section: "rw", domain: "Expression of Ideas", difficulty: "hard",
    passage: "The experimental drug performed impressively in early trials. ______, its long-term effects remain almost entirely unstudied.",
    prompt: "Which choice completes the text with the most logical transition?",
    type: "mcq", choices: ["Accordingly", "Nonetheless", "For instance", "Similarly"], correct: 1,
    explanation: "Find the relationship. Sentence 1: the drug \"performed impressively in early trials\" (positive). Sentence 2: its long-term effects \"remain almost entirely unstudied\" (a serious gap). Strong results set against an important unknown is a contrast, calling for a concessive transition. (B) \"Nonetheless\" signals \"in spite of that\" and is correct. (A) \"Accordingly\" signals a logical consequence, but the gap isn't a result of the good early results. (C) \"For instance\" introduces an example, but the unstudied long-term effects aren't an example of impressive performance. (D) \"Similarly\" signals likeness, yet the two ideas (a strength and a gap) oppose rather than parallel each other. The trap is (A): early success doesn't logically cause a lack of long-term data, so a contrast word, \"Nonetheless,\" is needed.",
  },
  {
    id: "rw2h-10", section: "rw", domain: "Standard English Conventions", difficulty: "hard",
    passage: "The internship taught her not only how to analyze large data sets ______ how to present her findings to a nontechnical audience.",
    prompt: "Which choice conforms to the conventions of Standard English?",
    type: "mcq", choices: ["and also", "but also", "but they also", "however"], correct: 1,
    explanation: "This tests correlative conjunctions and parallelism. The sentence already contains \"not only how to analyze large data sets,\" and correlative pairs are fixed: \"not only\" must be completed by \"but also.\" The blank should also stay parallel: \"how to analyze … but also how to present …\" (B) \"but also\" completes the correlative pair correctly and keeps the two \"how to\" phrases parallel. (A) \"and also\" is not the partner of \"not only\"; the idiom requires \"but also.\" (C) \"but they also\" inserts a subject \"they\" that breaks the parallel \"how to … how to …\" structure and is ungrammatical here. (D) \"however\" is a contrast adverb, not the second half of the \"not only\" correlative, so it doesn't fit. The trap is (A): \"and also\" sounds acceptable in speech, but the established pair with \"not only\" is specifically \"but also.\"",
  },
];

export const MATH_M1_X: SatQuestion[] = [
  {
    id: "m1-6", section: "math", domain: "Algebra", difficulty: "med",
    prompt: "If 4(x − 2) = 20, what is the value of x?",
    type: "grid", gridAnswers: ["7"],
    explanation: "Solve 4(x − 2) = 20 for x.\nStep 1: Divide both sides by 4 to undo the multiplication: x − 2 = 20/4 = 5.\nStep 2: Add 2 to both sides: x = 5 + 2 = 7.\n(Alternatively, distribute first: 4x − 8 = 20 → 4x = 28 → x = 7.)\nCheck: 4(7 − 2) = 4(5) = 20. ✓\nCommon trap: distributing incorrectly as 4x − 2 (forgetting to multiply the 2 by 4) or dividing 20 by 4 and stopping at 5. The answer is x = 7.",
  },
  {
    id: "m1-7", section: "math", domain: "Problem-Solving and Data Analysis", difficulty: "med",
    prompt: "A car travels 150 miles in 3 hours at a constant speed. At that rate, how many miles will it travel in 5 hours?",
    type: "mcq", choices: ["200", "250", "300", "450"], correct: 1,
    explanation: "The car travels at a constant speed, so set up a proportion or find the unit rate.\nStep 1: Find the speed: 150 miles ÷ 3 hours = 50 miles per hour.\nStep 2: Multiply by 5 hours: 50 × 5 = 250 miles.\nProportion check: 150/3 = x/5, so 3x = 150 × 5 = 750, giving x = 250. ✓\nSo the answer is 250, which is (B). The trap is (D) 450, from multiplying 150 × 3 (using hours as a multiplier instead of finding the rate). At 50 mph for 5 hours, the distance is 250 miles.",
  },
  {
    id: "m1-8", section: "math", domain: "Advanced Math", difficulty: "med",
    prompt: "If g(x) = x² + 2x, what is the value of g(4)?",
    type: "mcq", choices: ["24", "12", "16", "20"], correct: 0,
    explanation: "Evaluate g(x) = x² + 2x at x = 4.\nStep 1: Compute the squared term: 4² = 16.\nStep 2: Compute the linear term: 2(4) = 8.\nStep 3: Add: 16 + 8 = 24.\nCheck: g(4) = 4² + 2(4) = 16 + 8 = 24. ✓\nSo g(4) = 24, which is (A). The trap is (C) 16: that's only the x² part, forgetting to add 2x. Be sure to include both terms; the answer is 24.",
  },
  {
    id: "m1-9", section: "math", domain: "Geometry and Trigonometry", difficulty: "med",
    prompt: "A rectangle has a length of 8 and a width of 5. What is its perimeter?",
    type: "grid", gridAnswers: ["26"],
    explanation: "The perimeter of a rectangle is P = 2(length + width), with length 8 and width 5.\nStep 1: Add length and width: 8 + 5 = 13.\nStep 2: Multiply by 2 (there are two of each side): 2 × 13 = 26.\nCheck by adding all four sides: 8 + 5 + 8 + 5 = 26. ✓\nCommon trap: computing the area instead (8 × 5 = 40) or forgetting to double the sum (stopping at 13). Perimeter is the distance around, so the answer is 26.",
  },
];

export const MATH_M2_EASY_X: SatQuestion[] = [
  {
    id: "m2e-6", section: "math", domain: "Algebra", difficulty: "easy",
    prompt: "If 2x = 18, what is the value of x?",
    type: "grid", gridAnswers: ["9"],
    explanation: "Solve 2x = 18 for x.\nStep 1: Divide both sides by 2: x = 18/2.\nStep 2: Simplify: x = 9.\nCheck: 2 × 9 = 18. ✓\nCommon trap: subtracting 2 instead of dividing (18 − 2 = 16); because x is multiplied by 2, you undo it by dividing by 2. The answer is x = 9.",
  },
  {
    id: "m2e-7", section: "math", domain: "Problem-Solving and Data Analysis", difficulty: "easy",
    prompt: "A box contains 3 red balls and 2 blue balls. What fraction of the balls are red?",
    type: "mcq", choices: ["3/5", "2/5", "3/2", "1/5"], correct: 0,
    explanation: "We want the fraction of balls that are red. A fraction is (favorable)/(total).\nStep 1: Find the total number of balls: 3 red + 2 blue = 5 balls.\nStep 2: Red balls = 3, so the fraction red = 3/5.\nCheck: 3 red out of 5 total is 3/5. ✓\nSo the answer is 3/5, which is (A). The trap is (C) 3/2, the red-to-blue ratio, not the red-to-total fraction; the question asks \"what fraction of the balls,\" so the denominator must be the total 5, giving 3/5.",
  },
  {
    id: "m2e-8", section: "math", domain: "Geometry and Trigonometry", difficulty: "easy",
    prompt: "A square has a side length of 7. What is its area?",
    type: "grid", gridAnswers: ["49"],
    explanation: "The area of a square is side², with side 7.\nStep 1: Write the formula: A = side².\nStep 2: Substitute: A = 7² = 7 × 7.\nStep 3: Compute: 49.\nCheck: a 7-by-7 square holds 7 × 7 = 49 unit squares. ✓\nCommon trap: computing the perimeter instead (4 × 7 = 28) or doubling the side (7 × 2 = 14). Area uses side squared, so the answer is 49.",
  },
  {
    id: "m2e-9", section: "math", domain: "Algebra", difficulty: "easy",
    prompt: "What is the value of 3 + 4 × 2?",
    type: "mcq", choices: ["11", "14", "10", "24"], correct: 0,
    explanation: "Evaluate 3 + 4 × 2 using order of operations (PEMDAS: multiplication before addition).\nStep 1: Multiply first: 4 × 2 = 8.\nStep 2: Then add: 3 + 8 = 11.\nCheck: 3 + (4 × 2) = 3 + 8 = 11. ✓\nSo the answer is 11, which is (A). The trap is (B) 14, which comes from adding left to right first ((3 + 4) × 2 = 14); multiplication must be done before addition, giving 11.",
  },
];

export const MATH_M2_HARD_X: SatQuestion[] = [
  {
    id: "m2h-6", section: "math", domain: "Advanced Math", difficulty: "hard",
    prompt: "If 2^x = 32, what is the value of x?",
    type: "grid", gridAnswers: ["5"],
    explanation: "Solve 2^x = 32 for x by writing 32 as a power of 2.\nStep 1: Express 32 in base 2: 2 × 2 × 2 × 2 × 2 = 32, so 32 = 2⁵.\nStep 2: The equation becomes 2^x = 2⁵. With equal bases, the exponents must be equal: x = 5.\nCheck: 2⁵ = 32. ✓\nCommon trap: dividing 32 by 2 (getting 16) or 32 ÷ 5; exponential equations are solved by matching bases, not dividing. The answer is x = 5.",
  },
  {
    id: "m2h-7", section: "math", domain: "Algebra", difficulty: "hard",
    prompt: "At a shop, 3 pens and 2 notebooks cost $13, while 1 pen and 1 notebook cost $5. What is the cost of one notebook, in dollars?",
    type: "mcq", choices: ["$2", "$3", "$4", "$5"], correct: 0,
    explanation: "Let p = cost of a pen and n = cost of a notebook. The system is 3p + 2n = 13 and p + n = 5; we want n.\nStep 1: Solve the simpler equation for p: p = 5 − n.\nStep 2: Substitute into the first equation: 3(5 − n) + 2n = 13.\nStep 3: Distribute: 15 − 3n + 2n = 13.\nStep 4: Combine like terms: 15 − n = 13.\nStep 5: Subtract 15 from both sides: −n = −2, so n = 2.\nCheck: if n = 2 then p = 3; test the first equation: 3(3) + 2(2) = 9 + 4 = 13 ✓, and p + n = 3 + 2 = 5 ✓.\nSo a notebook costs $2, which is (A). The trap is (B) $3, the pen's price; the question asks for the notebook, which is $2.",
  },
  {
    id: "m2h-8", section: "math", domain: "Advanced Math", difficulty: "hard",
    prompt: "The product of two consecutive positive integers is 56. What is the larger of the two integers?",
    type: "grid", gridAnswers: ["8"],
    explanation: "Two consecutive positive integers can be written n and n + 1, with product 56: n(n + 1) = 56.\nStep 1: Expand: n² + n = 56, so n² + n − 56 = 0.\nStep 2: Factor: we need two numbers multiplying to −56 and adding to +1: those are +8 and −7, so (n + 8)(n − 7) = 0.\nStep 3: Solve: n = −8 or n = 7. Since the integers are positive, n = 7, and the consecutive pair is 7 and 8.\nStep 4: The larger is 8.\nCheck: 7 × 8 = 56. ✓ (Recognizing 7 × 8 = 56 directly is the fast route.)\nCommon trap: gridding the smaller integer 7; the question asks for the larger, which is 8.",
  },
  {
    id: "m2h-9", section: "math", domain: "Geometry and Trigonometry", difficulty: "hard",
    prompt: "In a right triangle, one leg has length 5 and the hypotenuse has length 13. What is the length of the other leg?",
    type: "mcq", choices: ["12", "8", "144", "18"], correct: 0,
    explanation: "Use the Pythagorean theorem a² + b² = c², where c = 13 is the hypotenuse, one leg a = 5, and we want the other leg b.\nStep 1: Write the relation: 5² + b² = 13².\nStep 2: Compute the squares: 25 + b² = 169.\nStep 3: Subtract 25 from both sides: b² = 144.\nStep 4: Take the positive square root: b = √144 = 12.\nCheck: 5² + 12² = 25 + 144 = 169 = 13². ✓ (This is the 5-12-13 right-triangle triple.)\nSo the other leg is 12, which is (A). The trap is (C) 144, which is b² before taking the square root; remember to finish by square-rooting, giving 12.",
  },
];
