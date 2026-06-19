import type { SatForm, SatQuestion } from "./types";
import {
  RW_M1_X, RW_M2_EASY_X, RW_M2_HARD_X,
  MATH_M1_X, MATH_M2_EASY_X, MATH_M2_HARD_X,
} from "./form1-extra";
import {
  RW_M1_X2, RW_M2_EASY_X2, RW_M2_HARD_X2,
  MATH_M1_X2, MATH_M2_EASY_X2, MATH_M2_HARD_X2,
} from "./form1-extra2";
import {
  RW_M1_X3, RW_M2_EASY_X3, RW_M2_HARD_X3,
  MATH_M1_X3, MATH_M2_EASY_X3, MATH_M2_HARD_X3,
} from "./form1-extra3";

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
    explanation: "The blank describes Khan's survey, and the colon introduces the evidence that defines it: she \"catalogued every organism living within each section of coral\" rather than focusing on one species. A survey that covers everything is, by definition, complete and wide-ranging — \"comprehensive.\" Check it against the sentence: a \"comprehensive survey\" that \"catalogued every organism\" is fully consistent. (A) comprehensive is correct. (B) \"tentative\" means hesitant or provisional, which says nothing about scope and contradicts the decisive thoroughness shown. (C) \"conventional\" means ordinary or traditional; cataloguing every organism is unusually thorough, not standard. (D) \"brief\" is the direct opposite — covering every organism is the most expansive approach, not a short one. The trap is treating the words as generic positives; only \"comprehensive\" matches the specific idea of total coverage given after the colon.",
  },
  {
    id: "rw1-2", section: "rw", domain: "Standard English Conventions", difficulty: "easy",
    passage: "The planning committee, along with several volunteers, ______ organizing the festival since January.",
    prompt: "Which choice completes the text so that it conforms to the conventions of Standard English?",
    type: "mcq", choices: ["have been", "has been", "are", "were"], correct: 1,
    explanation: "This tests subject-verb agreement. The grammatical subject is \"The planning committee,\" a singular collective noun. The phrase set off by commas, \"along with several volunteers,\" is a non-essential interrupter, NOT part of the subject; phrases like \"along with,\" \"as well as,\" and \"in addition to\" never make a singular subject plural. So the verb must be singular and, with \"since January,\" must be present-perfect: \"has been.\" (B) \"has been\" is correct. (A) \"have been\" is plural and would only work if the subject were plural. (C) \"are\" is plural and also drops the present-perfect aspect needed for an action continuing \"since January.\" (D) \"were\" is plural past tense, which clashes both in number and in tense with \"since January.\" The trap is letting the nearby plural \"volunteers\" pull the verb to plural; cover the interrupter and the subject is clearly singular \"committee.\"",
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
    explanation: "The question asks for the main idea. The passage makes two moves: first it concedes that printing (woodblock) existed in East Asia \"for centuries before him,\" then it pivots with \"What set Gutenberg's system apart was its reusable, movable metal type.\" The main idea is therefore that Gutenberg's contribution was specifically movable metal type, not the invention of printing. (B) captures both moves exactly. (A) is contradicted by the passage, which explicitly says woodblock printing predated Gutenberg, so he was not \"the first person in history to print text.\" (C) overstates: the passage never claims woodblock was \"always superior\"; it only notes movable type was faster for varied texts. (D) is unsupported and illogical — the passage is about Gutenberg in Europe, so printing clearly did spread beyond East Asia. The trap is (A), which misreads the famous association of Gutenberg with printing; the passage deliberately corrects that association.",
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
    explanation: "The task is to pick the option that uses the data to SUPPORT the hypothesis that adding the fungi increases yield. To support \"increase,\" the treated plots must outproduce the controls. The data: treated = 4.2 kg/plant, control = 3.1 kg/plant. Since 4.2 > 3.1, the fungi-treated plants yielded more, which is exactly what the hypothesis predicts. (A) states this correctly and supports the hypothesis. (B) reverses the numbers, claiming controls outproduced treated, which both misreads the data and contradicts the hypothesis. (C) is factually false — the two groups produced different amounts (4.2 vs 3.1). (D) claims no effect, which is the opposite of support and is contradicted by the 1.1 kg gap. The trap is (B): it cites the same real numbers but assigns them to the wrong groups, so always match each value to its label.",
  },
  {
    id: "rw1-5", section: "rw", domain: "Expression of Ideas", difficulty: "med",
    passage: "Solar panels have become far cheaper over the past decade. ______, many homeowners who once considered them unaffordable are now installing them.",
    prompt: "Which choice completes the text with the most logical transition?",
    type: "mcq", choices: ["However", "For example", "As a result", "Nevertheless"], correct: 2,
    explanation: "This is a transition question, so identify the logical relationship between the two sentences. Sentence 1: solar panels became far cheaper. Sentence 2: homeowners who once found them unaffordable are now installing them. The drop in price is the CAUSE and the surge in installations is the EFFECT, so a cause-and-effect transition is needed. (C) \"As a result\" signals exactly that consequence and is correct. (A) \"However\" signals contrast, but the two ideas agree (cheaper leads to more buyers), not oppose. (B) \"For example\" introduces an instance of a general claim, but sentence 2 is a consequence, not an illustration of cheaper panels. (D) \"Nevertheless\" signals concession/contrast, again wrong because there is no opposition. The trap is choosing a contrast word out of habit; here the relationship clearly flows in one logical direction.",
  },
];

const RW_M2_EASY: SatQuestion[] = [
  {
    id: "rw2e-1", section: "rw", domain: "Craft and Structure", difficulty: "easy",
    passage: "The puppy was so ______ that it greeted every visitor with a wagging tail and happy barks.",
    prompt: "Which choice completes the text with the most logical word?",
    type: "mcq", choices: ["friendly", "shy", "tired", "angry"], correct: 0,
    explanation: "The blank describes the puppy, and the evidence after \"so ___ that\" tells us its behavior: it \"greeted every visitor with a wagging tail and happy barks.\" Welcoming everyone warmly is the definition of \"friendly.\" (A) friendly matches the happy, welcoming behavior and is correct. (B) \"shy\" describes a timid dog that would avoid visitors, the opposite of greeting them. (C) \"tired\" would mean low energy, contradicting the active wagging and barking. (D) \"angry\" predicts growling or aggression, not a wagging tail and happy barks. The clue is the cheerful greeting behavior, which points only to \"friendly.\"",
  },
  {
    id: "rw2e-2", section: "rw", domain: "Standard English Conventions", difficulty: "easy",
    passage: "Last weekend the students ______ to the science museum with their teacher.",
    prompt: "Which choice conforms to the conventions of Standard English?",
    type: "mcq", choices: ["goes", "go", "went", "gone"], correct: 2,
    explanation: "This tests verb tense. The time marker \"Last weekend\" places the action in the completed past, so a simple past-tense verb is required: \"went.\" (C) went is the correct simple past of \"go\" and is correct. (A) \"goes\" is present tense (third-person singular) and also doesn't agree with the plural \"students.\" (B) \"go\" is present tense, clashing with \"Last weekend.\" (D) \"gone\" is a past participle that cannot stand alone as a verb; it needs a helper like \"had gone.\" The trap is (D): \"gone\" sounds past, but without a helping verb it is ungrammatical here.",
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
    explanation: "The question asks for the main idea. The passage says honeybees \"share the location of food\" through the waggle dance, then explains the mechanics: direction tells which way to fly and length tells how far. The central point is that the dance communicates where food is. (A) states exactly this and is correct. (B) is contradicted — the whole passage describes successful communication. (C) is too narrow and unsupported: the dance conveys food location, not danger warnings. (D) contradicts the text, which says the dance's direction guides bees, so flight is purposeful, not random. The trap is (C), which borrows the idea of \"signaling\" but invents a purpose (warning) the passage never mentions.",
  },
  {
    id: "rw2e-4", section: "rw", domain: "Expression of Ideas", difficulty: "easy",
    passage: "Heavy rain began to fall during the afternoon. ______, the outdoor concert was canceled.",
    prompt: "Which choice completes the text with the most logical transition?",
    type: "mcq", choices: ["Therefore", "However", "For example", "Meanwhile"], correct: 0,
    explanation: "Identify the relationship between the sentences. Sentence 1: heavy rain began to fall. Sentence 2: the outdoor concert was canceled. The rain is the CAUSE and the cancellation is the EFFECT, so a cause-and-effect transition is needed. (A) \"Therefore\" signals that result and is correct. (B) \"However\" signals contrast, but the two ideas agree (rain leads to cancellation). (C) \"For example\" introduces an illustration, but the cancellation is a consequence, not an example of rain. (D) \"Meanwhile\" signals simultaneous, unrelated events, but these two events are causally linked, not merely concurrent. The trap is (D): the events do happen around the same time, but \"Meanwhile\" ignores the clear cause-effect link.",
  },
  {
    id: "rw2e-5", section: "rw", domain: "Standard English Conventions", difficulty: "easy",
    passage: "Each of the players ______ a numbered jersey before the game.",
    prompt: "Which choice conforms to the conventions of Standard English?",
    type: "mcq", choices: ["have", "has", "having", "been"], correct: 1,
    explanation: "This tests subject-verb agreement. The subject is \"Each,\" and indefinite pronouns like \"each,\" \"every,\" \"either,\" and \"neither\" are always grammatically singular, even when followed by a plural phrase such as \"of the players.\" So the verb must be singular: \"has.\" (B) has is the singular present-tense verb and is correct. (A) \"have\" is plural, wrongly agreeing with the nearby \"players\" instead of the true subject \"Each.\" (C) \"having\" is a participle that can't serve as the main verb of the sentence. (D) \"been\" is a past participle that needs a helper (e.g., \"has been\") and can't stand alone. The trap is the prepositional phrase \"of the players\": its plural noun tempts you toward \"have,\" but the subject is the singular \"Each.\"",
  },
];

const RW_M2_HARD: SatQuestion[] = [
  {
    id: "rw2h-1", section: "rw", domain: "Craft and Structure", difficulty: "hard",
    passage: "The senator's ostensibly ______ remarks in fact masked a pointed critique of the administration's economic policy.",
    prompt: "Which choice completes the text with the most logical and precise word?",
    type: "mcq", choices: ["innocuous", "vehement", "candid", "verbose"], correct: 0,
    explanation: "The key words are \"ostensibly\" (seemingly, on the surface) and \"in fact masked a pointed critique.\" The structure sets up a contrast: the remarks SEEMED one way but secretly carried a sharp attack. For something harmless-looking to hide an attack, the surface word must mean inoffensive or harmless — \"innocuous.\" (A) innocuous fits: remarks that appear harmless can mask a critique. (B) \"vehement\" means forceful and passionate; vehement remarks would openly show the critique, not mask it. (C) \"candid\" means frank and honest; that contradicts \"masked,\" since candor reveals rather than conceals. (D) \"verbose\" means wordy, which has nothing to do with whether a critique is hidden. The trap is reaching for a strong word like \"vehement\"; the logic of \"ostensibly … masked\" demands a mild, disarming surface, which only \"innocuous\" provides.",
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
    explanation: "The question asks for the main PURPOSE. The text opens with the old view (critics dismissed the novel as \"merely sentimental\"), then pivots on \"however\" to recent scholarship that \"reappraised\" the novel, arguing its tearful scenes are \"deliberately staged to critique\" sentimentality. The purpose is to present this reappraisal that recasts the sentimentality as intentional critique. (B) states exactly that and is correct. (A) describes only the dismissed old view, which the text explicitly moves past with \"however,\" so it isn't the purpose. (C) \"plot summary\" is wrong — the text discusses interpretation and scholarly debate, not the story's events. (D) reverses the emphasis: the text endorses and explains the recent scholarship, it doesn't dismiss it. The trap is (A): it quotes a real phrase from the passage, but that phrase is the position the author is correcting, not the point of the text.",
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
    explanation: "Read the three data points carefully: 0 mg gives 320 ms, 100 mg gives 295 ms, 200 mg gives 298 ms. From 0 to 100 mg, reaction time drops 25 ms (320 to 295), a clear improvement since lower reaction time means faster. From 100 to 200 mg, it changes from 295 to 298, a 3 ms rise — essentially flat, even slightly worse. So the gain happens early and then plateaus. (A) describes exactly this: a fall from 0 to 100, then little change. (B) \"fell steadily\" is wrong because the time did not keep dropping past 100 mg; it leveled off. (C) is false — the fastest (lowest) time is 295 ms at 100 mg, not the 298 ms at 200 mg. (D) is contradicted by the 25 ms improvement from 0 to 100 mg. The trap is (B): assuming \"more caffeine, faster\" is a steady trend, but the 200 mg value actually ticks up, breaking the pattern.",
  },
  {
    id: "rw2h-4", section: "rw", domain: "Expression of Ideas", difficulty: "hard",
    passage: "The treaty was hailed at the time as a triumph of patient diplomacy. ______, within a single decade its central provisions had been quietly abandoned by every signatory.",
    prompt: "Which choice completes the text with the most logical transition?",
    type: "mcq", choices: ["Consequently", "Indeed", "Yet", "Likewise"], correct: 2,
    explanation: "Find the logical relationship. Sentence 1: the treaty was hailed as a \"triumph of patient diplomacy.\" Sentence 2: within a decade its provisions were \"quietly abandoned by every signatory.\" A celebrated success that quickly collapses is a sharp CONTRAST, so a contrast transition is needed. (C) \"Yet\" signals that opposition and is correct. (A) \"Consequently\" signals cause-effect, but the collapse is not a result of being praised — it contradicts the praise. (B) \"Indeed\" intensifies or confirms the prior point, yet sentence 2 undercuts sentence 1 rather than reinforcing it. (D) \"Likewise\" signals similarity, but the two ideas (triumph vs. abandonment) are opposites, not parallels. The trap is \"Indeed,\" which feels emphatic, but emphasis is wrong here; the sentences clash, so only the contrastive \"Yet\" works.",
  },
  {
    id: "rw2h-5", section: "rw", domain: "Standard English Conventions", difficulty: "hard",
    passage: "The storm intensified overnight ______ by morning the swollen river had flooded the lower fields.",
    prompt: "Which choice conforms to the conventions of Standard English?",
    type: "mcq", choices: ["overnight, by", "overnight; by", "overnight by", "overnight: by"], correct: 1,
    explanation: "This tests how to join two independent clauses. \"The storm intensified overnight\" is a complete sentence, and \"by morning the swollen river had flooded the lower fields\" is also a complete sentence. Two independent clauses cannot be joined by a comma alone (that's a comma splice) or run together with no punctuation; a semicolon correctly links two closely related independent clauses. (B) \"overnight; by\" uses the semicolon and is correct. (A) \"overnight, by\" creates a comma splice. (C) \"overnight by\" is a run-on with no punctuation between the clauses. (D) \"overnight: by\" misuses the colon, which should introduce a list, explanation, or elaboration, not simply connect two equal independent clauses. The trap is the colon in (D): it can join clauses only when the second explains or completes the first, which isn't the relationship here.",
  },
];

const MATH_M1: SatQuestion[] = [
  {
    id: "m1-1", section: "math", domain: "Algebra", difficulty: "easy",
    prompt: "If 3x − 7 = 14, what is the value of x?",
    type: "grid", gridAnswers: ["7"],
    explanation: "We need to solve 3x − 7 = 14 for x.\nStep 1: Add 7 to both sides to isolate the x-term: 3x − 7 + 7 = 14 + 7, which gives 3x = 21.\nStep 2: Divide both sides by 3: x = 21/3 = 7.\nCheck: substitute x = 7 back in: 3(7) − 7 = 21 − 7 = 14. ✓ Matches the right side.\nCommon trap: dividing by 3 before adding 7, or subtracting 7 from 14 instead of adding it. You must undo the −7 first (add 7), then undo the ×3 (divide). The answer is x = 7.",
  },
  {
    id: "m1-2", section: "math", domain: "Problem-Solving and Data Analysis", difficulty: "med",
    prompt: "A jacket that normally costs $80 is on sale for 25% off. What is the sale price, in dollars?",
    type: "mcq", choices: ["$55", "$60", "$65", "$75"], correct: 1,
    explanation: "We need the sale price after a 25% discount on $80.\nStep 1: Find the discount amount: 25% of 80 = 0.25 × 80 = 20 dollars.\nStep 2: Subtract the discount from the original price: 80 − 20 = 60 dollars.\nShortcut check: paying after 25% off means paying 75%, and 0.75 × 80 = 60. ✓ Same answer.\nSo the sale price is $60, which is (B). The tempting wrong answer is (D) $75: that comes from subtracting $5 or from confusing \"25% off\" with \"$25 off\" / a small reduction. \"25% off $80\" removes $20, not $5, so $60 is correct.",
  },
  {
    id: "m1-3", section: "math", domain: "Algebra", difficulty: "med",
    prompt: "If 2x + y = 10 and y = x + 1, what is the value of x?",
    type: "grid", gridAnswers: ["3"],
    explanation: "We have the system 2x + y = 10 and y = x + 1, and we want x. Use substitution.\nStep 1: Replace y in the first equation with x + 1: 2x + (x + 1) = 10.\nStep 2: Combine like terms: 3x + 1 = 10.\nStep 3: Subtract 1 from both sides: 3x = 9.\nStep 4: Divide both sides by 3: x = 9/3 = 3.\nCheck: if x = 3, then y = x + 1 = 4, and 2(3) + 4 = 6 + 4 = 10. ✓ Both equations hold.\nCommon trap: forgetting the parentheses and writing 2x + x + 1 incorrectly, or solving for y instead of x. The question asks for x, which is 3.",
  },
  {
    id: "m1-4", section: "math", domain: "Advanced Math", difficulty: "med",
    prompt: "The function f is defined by f(x) = 4x − 5. What is the value of f(3)?",
    type: "mcq", choices: ["7", "12", "−5", "17"], correct: 0,
    explanation: "We need f(3) for f(x) = 4x − 5, so substitute x = 3.\nStep 1: Replace x with 3: f(3) = 4(3) − 5.\nStep 2: Multiply first (order of operations): 4 × 3 = 12, so f(3) = 12 − 5.\nStep 3: Subtract: 12 − 5 = 7.\nSo f(3) = 7, which is (A). The trap is (B) 12: that's what you get if you stop after 4 × 3 and forget to subtract 5. (C) −5 comes from ignoring the 4x term entirely. Be sure to apply the full rule 4x − 5; the answer is 7.",
  },
  {
    id: "m1-5", section: "math", domain: "Problem-Solving and Data Analysis", difficulty: "med",
    prompt: "A recipe uses 2 cups of flour for every 3 cookies. How many cups of flour are needed to make 12 cookies?",
    type: "grid", gridAnswers: ["8"],
    explanation: "The ratio is 2 cups of flour per 3 cookies, and we want flour for 12 cookies. Set up a proportion: 2 cups / 3 cookies = x cups / 12 cookies.\nStep 1: Notice 12 cookies is 12 ÷ 3 = 4 times as many cookies as 3.\nStep 2: Scale the flour by the same factor: 4 × 2 = 8 cups.\nAlgebra check via cross-multiplication: 2 × 12 = 3 × x, so 24 = 3x, giving x = 8. ✓\nCommon trap: dividing instead of multiplying (e.g., 12/2 = 6) or pairing the wrong numbers. Keep cups with cups and cookies with cookies; the answer is 8 cups.",
  },
];

const MATH_M2_EASY: SatQuestion[] = [
  {
    id: "m2e-1", section: "math", domain: "Algebra", difficulty: "easy",
    prompt: "If x + 5 = 12, what is the value of x?",
    type: "grid", gridAnswers: ["7"],
    explanation: "Solve x + 5 = 12 for x.\nStep 1: Subtract 5 from both sides to isolate x: x + 5 − 5 = 12 − 5.\nStep 2: Simplify: x = 7.\nCheck: 7 + 5 = 12. ✓\nCommon trap: adding 5 instead of subtracting it (which would give 17). To undo \"+5,\" subtract 5. The answer is x = 7.",
  },
  {
    id: "m2e-2", section: "math", domain: "Problem-Solving and Data Analysis", difficulty: "easy",
    prompt: "What is 10% of 250?",
    type: "mcq", choices: ["25", "2.5", "250", "50"], correct: 0,
    explanation: "We need 10% of 250.\nStep 1: Convert the percent to a decimal: 10% = 0.10.\nStep 2: Multiply: 0.10 × 250 = 25.\nShortcut: taking 10% just moves the decimal one place left, so 250 → 25.0 = 25. ✓\nSo the answer is 25, which is (A). The trap is (B) 2.5, which is 1% of 250 (moving the decimal two places), and (D) 50, which is 20%. Ten percent of 250 is 25.",
  },
  {
    id: "m2e-3", section: "math", domain: "Algebra", difficulty: "easy",
    prompt: "A line has slope 2 and passes through (0, 3). What is the value of y when x = 4?",
    type: "grid", gridAnswers: ["11"],
    explanation: "A line with slope 2 through (0, 3) has y-intercept 3, so its equation is y = 2x + 3. We want y when x = 4.\nStep 1: Write the equation: y = 2x + 3.\nStep 2: Substitute x = 4: y = 2(4) + 3.\nStep 3: Multiply then add: 2 × 4 = 8, so y = 8 + 3 = 11.\nCheck: starting at (0, 3) and moving 4 units right at slope 2 adds 2 × 4 = 8 to y: 3 + 8 = 11. ✓\nCommon trap: forgetting the +3 intercept (giving 8) or adding the slope only once. The answer is y = 11.",
  },
  {
    id: "m2e-4", section: "math", domain: "Algebra", difficulty: "easy",
    prompt: "If 5x = 35, what is the value of x?",
    type: "mcq", choices: ["6", "7", "30", "40"], correct: 1,
    explanation: "Solve 5x = 35 for x.\nStep 1: Divide both sides by 5: x = 35/5.\nStep 2: Simplify: x = 7.\nCheck: 5 × 7 = 35. ✓\nSo x = 7, which is (B). The trap is (C) 30, from subtracting 5 instead of dividing (35 − 5 = 30); because x is multiplied by 5, you undo it by dividing by 5, not subtracting. The answer is 7.",
  },
  {
    id: "m2e-5", section: "math", domain: "Geometry and Trigonometry", difficulty: "easy",
    prompt: "A triangle has a base of 6 and a height of 4. What is its area?",
    type: "grid", gridAnswers: ["12"],
    explanation: "The area of a triangle is A = ½ × base × height, with base 6 and height 4.\nStep 1: Write the formula: A = ½ × base × height.\nStep 2: Substitute: A = ½ × 6 × 4.\nStep 3: Multiply: 6 × 4 = 24, then ½ × 24 = 12.\nCheck: half of (6 × 4 = 24) is 12. ✓\nCommon trap: forgetting the ½ and reporting 24 (that's the area of the full rectangle, not the triangle). The triangle's area is 12.",
  },
];

const MATH_M2_HARD: SatQuestion[] = [
  {
    id: "m2h-1", section: "math", domain: "Advanced Math", difficulty: "hard",
    prompt: "If x² − 5x + 6 = 0 and x > 2, what is the value of x?",
    type: "grid", gridAnswers: ["3"],
    explanation: "Solve x² − 5x + 6 = 0, then apply the condition x > 2.\nStep 1: Factor the quadratic. We need two numbers that multiply to +6 and add to −5: those are −2 and −3. So x² − 5x + 6 = (x − 2)(x − 3).\nStep 2: Set each factor to zero: x − 2 = 0 gives x = 2; x − 3 = 0 gives x = 3.\nStep 3: Apply x > 2. Since 2 is not greater than 2, we reject x = 2 and keep x = 3.\nCheck: 3² − 5(3) + 6 = 9 − 15 + 6 = 0 ✓, and 3 > 2 ✓.\nCommon trap: gridding x = 2; it's a real root but the constraint x > 2 excludes it. The answer is 3.",
  },
  {
    id: "m2h-2", section: "math", domain: "Advanced Math", difficulty: "hard",
    prompt: "A bacteria population doubles every 3 hours. If it starts at 200, how many bacteria are there after 9 hours?",
    type: "mcq", choices: ["600", "800", "1,600", "1,800"], correct: 2,
    explanation: "The population doubles every 3 hours, starting at 200, and we want the count after 9 hours.\nStep 1: Find the number of doublings: 9 hours ÷ 3 hours per doubling = 3 doublings.\nStep 2: Each doubling multiplies by 2, so after 3 doublings multiply by 2³ = 8.\nStep 3: 200 × 8 = 1,600.\nCheck by stepping through: 200 → 400 (3 hr) → 800 (6 hr) → 1,600 (9 hr). ✓\nSo the answer is 1,600, which is (C). The trap is (A) 600, from adding 200 three times (treating doubling as adding the original) instead of multiplying by 2 each period. Doubling is repeated multiplication, giving 1,600.",
  },
  {
    id: "m2h-3", section: "math", domain: "Algebra", difficulty: "hard",
    prompt: "The sum of two numbers is 24 and their difference is 6. What is the larger of the two numbers?",
    type: "grid", gridAnswers: ["15"],
    explanation: "Let the two numbers be a (larger) and b (smaller). We're told a + b = 24 and a − b = 6, and we want a.\nStep 1: Add the two equations to eliminate b: (a + b) + (a − b) = 24 + 6, which gives 2a = 30.\nStep 2: Divide by 2: a = 15.\nStep 3 (optional, find b): b = 24 − 15 = 9.\nCheck: 15 + 9 = 24 ✓ and 15 − 9 = 6 ✓.\nCommon trap: gridding the smaller number 9, or dividing 24 by 2 (getting 12) and ignoring the difference. The shortcut larger = (sum + difference)/2 = (24 + 6)/2 = 15 gives the answer 15.",
  },
  {
    id: "m2h-4", section: "math", domain: "Advanced Math", difficulty: "hard",
    prompt: "If f(x) = 2x² − 3x + 1, what is the value of f(−2)?",
    type: "mcq", choices: ["15", "3", "11", "−1"], correct: 0,
    explanation: "Evaluate f(x) = 2x² − 3x + 1 at x = −2. Substitute carefully, watching the signs.\nStep 1: Compute the squared term: (−2)² = 4, so 2x² = 2(4) = 8.\nStep 2: Compute the linear term: −3x = −3(−2) = +6 (negative times negative is positive).\nStep 3: Add the constant: +1.\nStep 4: Sum: 8 + 6 + 1 = 15.\nCheck: 2(−2)² − 3(−2) + 1 = 8 + 6 + 1 = 15. ✓\nSo f(−2) = 15, which is (A). The trap is (D) −1: that comes from mishandling a sign, e.g., writing −3(−2) as −6 instead of +6 (giving 8 − 6 + 1 = 3) or squaring −2 as −4. With correct signs the answer is 15.",
  },
  {
    id: "m2h-5", section: "math", domain: "Geometry and Trigonometry", difficulty: "hard",
    prompt: "In a right triangle, the two legs measure 9 and 12. What is the length of the hypotenuse?",
    type: "grid", gridAnswers: ["15"],
    explanation: "In a right triangle the hypotenuse c satisfies the Pythagorean theorem a² + b² = c², with legs a = 9 and b = 12.\nStep 1: Square the legs: 9² = 81 and 12² = 144.\nStep 2: Add: 81 + 144 = 225, so c² = 225.\nStep 3: Take the positive square root: c = √225 = 15.\nCheck: 9² + 12² = 81 + 144 = 225 = 15². ✓ (This is the 3-4-5 triple scaled by 3.)\nCommon trap: adding the legs directly (9 + 12 = 21) or forgetting the square root and reporting 225. The hypotenuse is 15.",
  },
];

export const SAT_FORM_1: SatForm = {
  id: "practice-1",
  title: "InHero SAT Practice Test 1",
  rw: {
    m1: [...RW_M1, ...RW_M1_X, ...RW_M1_X2, ...RW_M1_X3],
    m2easy: [...RW_M2_EASY, ...RW_M2_EASY_X, ...RW_M2_EASY_X2, ...RW_M2_EASY_X3],
    m2hard: [...RW_M2_HARD, ...RW_M2_HARD_X, ...RW_M2_HARD_X2, ...RW_M2_HARD_X3],
    timeSec: 1920,
  },
  math: {
    m1: [...MATH_M1, ...MATH_M1_X, ...MATH_M1_X2, ...MATH_M1_X3],
    m2easy: [...MATH_M2_EASY, ...MATH_M2_EASY_X, ...MATH_M2_EASY_X2, ...MATH_M2_EASY_X3],
    m2hard: [...MATH_M2_HARD, ...MATH_M2_HARD_X, ...MATH_M2_HARD_X2, ...MATH_M2_HARD_X3],
    timeSec: 2100,
  },
};
