/**
 * lib/studyTypeSteps.ts
 *
 * Per-persona "do tomorrow" study steps. Each block:
 *   - headline  : the unfair truth specific to that persona
 *   - strength  : what this persona does well that they should keep
 *   - trap      : the failure mode that quietly eats their results
 *   - steps[]   : 3 concrete actions, written in "do tomorrow" voice
 *   - inheroHook: one sentence connecting the persona's gap to how
 *                 InHero's lessons / overlays / spaced review fix it
 *
 * The steps are grounded in real cognitive-science findings — active
 * recall (Karpicke), spaced repetition (Cepeda), interleaving
 * (Rohrer), retrieval practice (Roediger). Each persona's steps lean
 * on whichever of those most directly addresses their failure mode.
 */

import type { HeroCodeId } from "@/lib/hero-codes";

export interface StudyTypeSteps {
  headline: string;
  strength: string;
  trap: string;
  steps: string[];
  inheroHook: string;
}

const FALLBACK: StudyTypeSteps = {
  headline: "Your habits work — but you can compound them.",
  strength: "You already have a pattern that gets you through.",
  trap: "Trusting the same routine that worked last year on harder material.",
  steps: [
    "Close the book and write everything you remember from today's section in 2 minutes. The gaps are your real targets.",
    "Re-test yourself 24 hours later, then 3 days later. Same-day review is the weakest.",
    "Mix old + new problems in one session instead of grinding one topic in a block.",
  ],
  inheroHook:
    "InHero's lessons interleave retrieval prompts between micro-clips, so this stays automatic instead of relying on willpower.",
};

export const STUDY_TYPE_STEPS: Partial<Record<HeroCodeId, StudyTypeSteps>> = {
  CF: {
    headline: "You're fast when patterns show up — and stuck when they don't. That's your engine.",
    strength: "You spot cross-chapter connections faster than most. Once you lock it in, you don't forget.",
    trap: "When the pattern isn't visible, you label it 'too much to memorize' and quietly avoid it.",
    steps: [
      "At the start of each unit, skim the table of contents and summary for 5 minutes to grab the big shape. Details land cleaner on top of structure.",
      "After studying, force one line in your notes: \"what does this remind me of from earlier?\" — you're deliberately firing your strongest muscle.",
      "On rote-feeling units, reframe to \"why is it structured this way?\" Meaning-free input doesn't stick for you — that's not a flaw, it's your wiring.",
    ],
    inheroHook:
      "InHero lessons surface unit-to-unit pattern links through overlays — your strength is on by default while you learn.",
  },
  CS: {
    headline: "You move once structure is locked. No structure = re-reading chapter 1 five times.",
    strength: "Once it's organized step-by-step, you're more accurate and steadier than most.",
    trap: "You burn the time on building the structure and zero on retrieval practice. Pretty notes, ugly exam results.",
    steps: [
      "Cap notes at one page per unit. The extra time goes to closing the book and recalling — that's closer to the exam.",
      "After each unit, simulate explaining it to a friend who's never seen it. Where you stall = what you actually don't know.",
      "Space your review: same-day twice < next day, 3 days later, 1 week later. Diagram your review schedule — your structure-loving brain will actually follow it.",
    ],
    inheroHook:
      "InHero's weekly plan bakes in 1d / 3d / 7d spaced review — no fight with your structure instinct.",
  },
  CE: {
    headline: "Interested = unstoppable. Not interested = can't even start.",
    strength: "Depth. You can dive into a topic and come out actually understanding it.",
    trap: "You start three interesting topics and finish zero. AP exams score all 8 units — that's lethal.",
    steps: [
      "For boring units, write ONE curiosity-spark question first: \"AP Bio Unit 7 — why is evolution 13% of the exam?\" Manufactured interest beats willpower.",
      "Sandwich sessions: 30 min interesting → 20 min postponed → 10 min interesting. The 2nd half of any 30 min slot is your weakest — that's where the boring one goes.",
      "Use the \"5-min rule\" on units you can't start: try for 5 min, quit if it's not flowing. Your brain has a start problem, not a continuation problem.",
    ],
    inheroHook:
      "Every InHero unit opens with a hook clip — curiosity is pre-loaded so you don't have to manufacture it.",
  },
  CV: {
    headline: "You see things others miss. The catch: you can't get them out of your head and onto paper.",
    strength: "Complex data, diagrams, hidden relationships — you pull the signal out fast.",
    trap: "No output. The picture is vivid in your head and fragmented in your answer.",
    steps: [
      "After each study session, draw one diagram per page. Then explain that diagram to someone else. Head → hand → mouth — that's the conversion drill.",
      "From your past tests, track the WORDS you left out. You knew the concept — you lost points on language.",
      "For memorization-heavy units, map text to color / position / relationship. Your strength activates the moment information becomes spatial.",
    ],
    inheroHook:
      "InHero's ANALYZER overlay was built for this profile — diagram in, pattern out, repeatedly.",
  },
  CA: {
    headline: "You translate abstract → concrete naturally. So when \"why am I learning this\" doesn't resolve, you stall.",
    strength: "Finding the invisible link between concepts. Real-world translation is automatic.",
    trap: "Units that don't map to a real example get filed as \"meaningless\" and dropped.",
    steps: [
      "At the start of every unit, write one line: \"where does this show up in the real world?\" If you can't answer, search until you can. You need that anchor.",
      "After studying, ask: \"how does this show up for me as a med student / researcher / engineer in 5 years?\" — that becomes your retrieval cue.",
      "Reframe practice problems as \"how would I explain this scenario to a friend?\" Your answers sharpen automatically.",
    ],
    inheroHook:
      "InHero's SPARK overlay surfaces 4 connectedConcepts per unit — exactly the trigger that lights up your mapping instinct.",
  },
  CT: {
    headline: "You learn by doing. If you haven't tried it, you haven't learned it.",
    strength: "Fast try-and-test cycles. You actually learn from failure.",
    trap: "You skip the rule-writing step, so subtly-different problems trap you.",
    steps: [
      "Before practice, write the unit's 3 core rules. Then make ONE prediction before each problem. Your learning rate doubles when intent precedes attempt.",
      "Error log isn't \"got it wrong\" — it's \"where did my brain check out?\" Patterns in your failures = your real curriculum.",
      "Interleave: 5 topics × 6 minutes beats 1 topic × 30 minutes for you. Variation switches your strength on.",
    ],
    inheroHook:
      "Each InHero lesson = 4 clips + 9 overlays = 13 interaction points. Your try-and-test loop fires every 1-2 minutes.",
  },
  DF: {
    headline: "If the big picture is clear, you go. If not, you don't even start.",
    strength: "Turning long-range goals into systems. 6 months → 1 week → today comes naturally.",
    trap: "Planning porn. You over-design and never execute the hour in front of you.",
    steps: [
      "Cap weekly planning at 5 minutes. More than that is your type's tax on actual study time.",
      "Define a daily minimum: \"if I only do this 1 hour, today still counts.\" Anchor it to vision: \"how does this 1 hour show up in 6 months?\"",
      "Reviews once a week, Sunday only. The rest is execute. Your brain always wants to jump ahead — schedule the brake.",
    ],
    inheroHook:
      "InHero's study plan distributes lessons all the way to YOUR finish_date — input the vision once, the system runs the schedule.",
  },
  DA: {
    headline: "You actually chase the concept. Fragmented info doesn't stick for you.",
    strength: "Depth. Once you truly understand, application comes free.",
    trap: "Too much input (video/book), not enough output (problems / explaining). \"Understanding\" ≠ \"recall.\"",
    steps: [
      "Split each hour: 30 min input, 30 min output. Match every passive minute with an active one.",
      "Teach-back drill once a day — pretend a friend is in front of you. Where you stall = where input never became understanding.",
      "Practice problems are output in its honest form. Immediately after a unit, run 5-10 problems and watch where you lose grip.",
    ],
    inheroHook:
      "InHero's TEACH_BACK overlays force your weak side (output) every lesson — your strength stops compounding without it.",
  },
  DB: {
    headline: "Clear target = full throttle. No clear target = zero.",
    strength: "Numbers — scores, ranks, grades — you push hard, all the way.",
    trap: "You optimize for short-term scores and skip the understanding. AP is application — that's the trap.",
    steps: [
      "Every week, write ONE score goal + ONE concept goal. Score-only quietly kills your depth.",
      "After practice tests, write 3 lines on \"why I got it wrong\" BEFORE looking at the score. Then look.",
      "Reframe wrong answers as ground for the next unit — not lost points. The reframe alone doubles your learning rate.",
    ],
    inheroHook:
      "InHero gives instant score feedback per lesson via overlay accuracy — your goal instinct fires every single lesson.",
  },
  DS: {
    headline: "Once you lock in, you don't stop. That's a gift and a risk.",
    strength: "Grit. You keep going when other students quit.",
    trap: "You don't stop even when the direction is wrong. 30 hours of grind in the wrong unit = 30 hours of zero.",
    steps: [
      "Force a weekly \"review point\" — 30 minutes every Sunday to check direction. If it's off, pivot immediately.",
      "After each unit, write one line: \"keep going or stop?\" Your default is \"keep going\" — you have to manufacture a brake.",
      "Study reps > study hours. 5 × 1-hour sessions beats 1 × 5-hour for you. Spread the intensity.",
    ],
    inheroHook:
      "InHero's plan with finish_date + weekly checkpoints systematizes your willpower — the un-stoppable you, re-aligned every week.",
  },
  FS: {
    headline: "Stable conditions = peak performance. Volatility = quick collapse.",
    strength: "Consistency. Sitting in the same spot every day isn't a chore for you.",
    trap: "You break under variance — unfamiliar room, unexpected question type — and your normal level doesn't show up on test day.",
    steps: [
      "Twice a week, deliberately study somewhere different (café, library, park). You're widening your stability range so test day doesn't shake you.",
      "Practice tests in exam conditions only — timed, one shot, with household noise. Normal ≠ test day is dangerous.",
      "When an unexpected topic shows up, reframe with \"this looks like Unit N that I know.\" Pull volatility into your known zone.",
    ],
    inheroHook:
      "InHero's weekly plan matches your stability need — same time, same dose, predictable rhythm — with controlled variance layered in.",
  },
  FT: {
    headline: "Avoiding failure makes you skip the start. The real failure starts there.",
    strength: "Risk detection. You spot trap questions before others do.",
    trap: "Risk-avoidance becomes start-avoidance. \"I'll prepare more first\" becomes forever.",
    steps: [
      "Use a \"good-enough 70%\" rule before any session. 100% prepared never arrives — at 70%, you start.",
      "Deliberately fail once a day — one hard problem, attempted, missed. Failure desensitization unlocks the start.",
      "Reframe: \"I can't solve this\" ≠ \"I'm not enough.\" It means \"I need more info on this problem.\" That reframe alone cuts your avoidance in half.",
    ],
    inheroHook:
      "InHero overlays are small-bite — large failures don't happen, so your avoidance signal never fires.",
  },
  FB: {
    headline: "Defense is instinct. You over-prepare and execute too late.",
    strength: "Thoroughness. You don't leave gaps in a unit.",
    trap: "Preparation is useful up to ~90%. Beyond that it's pure tax — and your brain doesn't notice.",
    steps: [
      "Hard cap per unit: 1 hour of note-organizing, then immediately switch to problems. No exceptions.",
      "Open the first practice test at 50% through a unit, not after \"finishing.\" Finding gaps early is your strength activated.",
      "Review = ONE pass. Time you'd spend reviewing the same thing 3× goes to one more unit instead. Distribution unlocks your efficiency.",
    ],
    inheroHook:
      "InHero overlays drop in at the 50% mark of a lesson automatically — your \"too prepared\" trap is bypassed.",
  },
  PF: {
    headline: "Deadlines are your engine. Time abundance = zero output.",
    strength: "Under pressure, your efficiency triples normal. Big work in short windows.",
    trap: "Zero until deadline. Burnout accumulates between sprints. Compounding effect = none.",
    steps: [
      "Manufacture fake deadlines. Real test is in 2 weeks? Calendar says \"test 1 week from now.\" Your engine fires earlier.",
      "Every Sunday = a mini-deadline (a mock review test for the week's units). Distribute the pressure.",
      "Work in 50-on / 10-off cycles. Outside that window, your pressure instinct eats efficiency instead of feeding it.",
    ],
    inheroHook:
      "InHero's weekly plan + countdown ticker = a system that triggers your pressure engine early and often.",
  },
  PB: {
    headline: "You build in chaos. Tidy environments slow you down.",
    strength: "Emergency-mode execution. Improvisational problem-solving.",
    trap: "Weak on long arcs. You can't pace a semester at constant velocity.",
    steps: [
      "Keep weekly plans macro only — \"Unit 3 done this week.\" Day-by-day distribution: decide every morning. Honors your improvisational nature.",
      "Start units with a 5-minute sprint. If you're in after 5 min, you'll keep going. If not, switch immediately.",
      "Variable environments OK — but device on silent is non-negotiable. Your chaos strength stays, distractibility doesn't.",
    ],
    inheroHook:
      "InHero's short clips (1-3 min) + overlay sequence match your sprint instinct's natural length.",
  },
  PE: {
    headline: "Tension is your oxygen. Without it, you don't breathe.",
    strength: "High-pressure environments outperform calm ones. The actual exam is your strength environment.",
    trap: "Too calm in daily life = learning doesn't happen. Everything gets shoved to the last minute.",
    steps: [
      "One mock test per week, 60 minutes. Artificially inject pressure on normal study days.",
      "Force a 25-minute timer on every session. Without time pressure, your brain doesn't switch to learning mode. Pomodoro is built for you.",
      "Wrong answers = your composure trigger. Do one hard problem daily — lose composure, recover. That's the actual training.",
    ],
    inheroHook:
      "InHero overlays are 1-2 minutes of micro pressure — your tension instinct fires inside every lesson.",
  },
  IF: {
    headline: "Connection to people is your fuel. Solo = no output.",
    strength: "You learn through people. Teaching and explaining deepens your understanding.",
    trap: "Zero solo time = no real depth. Social-only learning is incomplete.",
    steps: [
      "70% of study time should be solo (active recall, practice). 30% social (group study, teach-back). If the ratio flips, your score drops.",
      "Teach-back drill once a day — even to a mirror. Activates your strongest output mode.",
      "Save lounges / discussions for AFTER you've done a unit alone. Social-first dilutes your depth.",
    ],
    inheroHook:
      "InHero's lounges are mapped per unit — your social retrieval fires right when you finish each unit.",
  },
  IE: {
    headline: "New people / new environments = your growth. You can't stay in one place long.",
    strength: "Expansion. You absorb from many sources at once.",
    trap: "You jump units too fast — never going deep. AP is depth, so this is lethal.",
    steps: [
      "3-day minimum on each unit before moving. Brake your jump instinct on purpose.",
      "Multiple sources per unit — video + book + friend's explanation + practice. Channels your expansion energy inside one unit.",
      "Review using someone else's notes. Your strength comes from input diversity, so single-source self-review caps you.",
    ],
    inheroHook:
      "InHero lessons stack video + overlay + textbook split-view + lounge — 4 modalities in one lesson. Built for your expansion instinct.",
  },
  IB: {
    headline: "You shine on teams. Alone is harder than together.",
    strength: "Collaborative learning. Other people's confusion triggers your learning.",
    trap: "Over-reliance: tests are solo, but your study is group — that's a mismatch.",
    steps: [
      "3 days a week, study solo (active recall, simulation). Train in the same mode as the test.",
      "Group study only for review mode, after units are done alone. Solo for start + middle.",
      "Teach a friend 10 minutes a day. Daily activation of your strength without daily dependence.",
    ],
    inheroHook:
      "InHero lounges drop in at unit boundaries — your collaboration strength fires at the right cadence.",
  },
  PS: FALLBACK,
};

export function getStudyTypeSteps(code?: HeroCodeId | null): StudyTypeSteps {
  if (!code) return FALLBACK;
  return STUDY_TYPE_STEPS[code] ?? FALLBACK;
}
