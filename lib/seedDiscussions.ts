// Official InHero-seeded prompt system. Not fake accounts — these are
// starter discussion templates rendered inside a clearly labeled
// "Trending Starter Chats" section on each lounge page. The u/inhero_seed
// handle is the system author and is always flagged isSeedBot.
//
// Handles in the rosters below are illustrative Reddit-viral / Gen-Z style
// identifiers, not real user accounts. The surrounding UI labels the entire
// block as "SEEDED PROMPTS · OFFICIAL · INHERO".

export interface SeedBubble {
  handle: string;
  content: string;
  isSeedBot?: boolean;
}

export interface SeedTopic {
  id: string;
  topic: string;
  bubbles: SeedBubble[];
}

const SEED_HANDLE = "u/inhero_seed";

const seed = (content: string): SeedBubble => ({
  handle: SEED_HANDLE,
  content,
  isSeedBot: true,
});

// ─── HANDLE POOLS ──────────────────────────────────────────────────────────
// Reddit-viral / Gen-Z flavored handles. Reused across bubbles for that
// "real thread where the same names keep showing up" feel.

const AP_BIO_HANDLES = [
  "u/no_cap_studying", "u/deadass_blanked", "u/lowkey_failing_apbio", "u/highkey_5scorer",
  "u/sigma_FRQ_grindset", "u/main_character_curve", "u/AP_bio_pls_pass", "u/cooked_on_unit3",
  "u/bestie_FRQ_was_bad", "u/krebs_cycle_baddie", "u/operon_supremacy", "u/ate_no_crumbs_5",
  "u/delulu_for_a_5", "u/touch_grass_post_AP", "u/rizz_bio_kid", "u/notlikeotherFRQs",
  "u/throwaway_apbio_acc", "u/throwaway_3score", "u/cursed_practice_test", "u/blursed_score_release",
  "u/wholesome_studygroup", "u/expectedfactorial_AP", "u/oddly_specific_dihybrid", "u/lurker_5scorer_69",
  "u/Hardy_Weinberg_homie", "u/mitochondria_mommy", "u/ribosome_realm", "u/Calvin_cycle_clown",
  "u/photosynthesis_pls", "u/MCQ_main_character", "u/skipped_FRQ3_lol", "u/genuinely_blanked",
  "u/ribosomes_at_3am", "u/AP_andDeranged_", "u/AP_bio_my_villain", "u/CB_certified_villain",
  "u/CollegeBoard_traumadump", "u/curve_carrier_pls", "u/the_curve_will_save_us", "u/3_days_to_AP",
  "u/2_weeks_dead_inside", "u/sleep_when_dead_lol", "u/coffee_iv_drip", "u/no_thoughts_just_AP",
  "u/just_a_silly_5scorer", "u/imgonna_cry_brb", "u/literally_im_tired", "u/perceived_as_smart",
  "u/lockedin_unit2", "u/lockedin_unit3", "u/lockedin_unit4", "u/lockedin_unit5",
  "u/lockedin_unit6", "u/unit7_dread", "u/unit8_unhinged", "u/I_picked_B_lmao",
  "u/I_picked_D_then_C", "u/walked_out_blanking", "u/got_3_lmao", "u/got_4_validation",
  "u/got_5_validation_arc", "u/scored_a_2_pls", "u/mitosis_meiosis_mixup", "u/ATP_synthase_baddie",
  "u/lac_operon_lover", "u/trp_operon_truther", "u/chi_square_clown", "u/dihybrid_disaster",
  "u/PCR_panic_lurker", "u/gel_lurker_99", "u/clade_collapse", "u/synapomorphy_szn",
  "u/raw_dogging_apbio", "u/no_curriculum_used", "u/learned_in_1_day", "u/three_days_to_APtest",
  "u/AP_week_zombie", "u/finalsweek_bestie", "u/curve_god_pls_help", "u/teaching_my_dog_FRQ",
  "u/screaming_at_AP_bio", "u/i_just_want_a_4", "u/AP_pass_or_die", "u/notebook_full_drafts",
  "u/lab_report_pls", "u/free_response_freak", "u/multiple_choice_madness", "u/eliminated_3_wrong",
  "u/AP_bio_villain_origin", "u/blursed_practice_exam", "u/cursed_collegeboard", "u/Punnett_practitioner",
  "u/Chargaff_acolyte", "u/G3P_grinder", "u/RuBisCo_revival", "u/p_quad_problems",
  "u/inquilab_drift_acc", "u/AP_lab_5_main", "u/diffusion_didnt_know", "u/osmosis_only_kinda",
  "u/biome_burnout", "u/trophic_levelup", "u/keystone_kween", "u/biodiversity_baddie",
  "u/lurker_bio_acc99", "u/threw_in_towel_unit2", "u/sympatric_sis", "u/allopatric_acolyte",
  "u/genetic_drift_doomer", "u/founder_effect_finna", "u/bottleneck_burnout", "u/Mendelian_meltdown",
  "u/codominance_confused", "u/incomp_dom_idk", "u/sex_linked_solver", "u/recessive_realm",
  "u/autosomal_anomaly", "u/AP_endgame_szn", "u/finalsdays_fake_deep", "u/grateful_for_curve",
  "u/took_a_chance_on_C", "u/3_days_left_anxiety", "u/burned_out_at_unit4", "u/got_carry_4_FRQ2",
  "u/the_signal_path_bro", "u/anaphase_aware", "u/karyotype_knower", "u/transcription_trauma",
  "u/translation_translator", "u/feedback_inhibition_fan", "u/competitive_inhib_lol", "u/non_comp_inhib_lol",
  "u/sus_FRQ_2024", "u/FRQ2_was_short_thank", "u/MCQ_section_carry", "u/section_2_finna_fail",
  "u/sympatric_speciation_sis", "u/fitness_field_main", "u/macromolecule_madness", "u/protein_painter",
  "u/lipid_lurker", "u/carbohydrate_carry", "u/nucleic_acid_npc", "u/amino_acid_acolyte",
  "u/glucose_grinder", "u/I_threw_my_FRQ_pencil", "u/CB_release_dread", "u/AP_score_july_5_kid",
  "u/ate_unit3_no_crumbs", "u/cooked_on_unit5", "u/wholesome_curve_bestie", "u/sigma_apbio_grindset",
];

const SAT_HANDLES = [
  "u/SAT_genocide", "u/onedigit_off", "u/desmos_OFD", "u/bluebook_breakdown",
  "u/superscore_szn", "u/cooked_at_passage5", "u/oneshot_1550", "u/khan_addict",
  "u/dialedIn_fr", "u/grindset_2025", "u/reading_mid", "u/grammar_grinder",
  "u/quadratics_qween", "u/SAT_traumadump", "u/throwaway_1450", "u/throwaway_1500",
  "u/throwaway_1300", "u/imgonna_bomb_SAT", "u/locked_in_at_dawn", "u/cooked_until_curve",
  "u/CB_main_character", "u/SAT_sigma", "u/no_cap_reading", "u/lowkey_grinder",
  "u/highkey_struggling", "u/deadass_1340", "u/digital_SAT_doomer", "u/paper_SAT_purist",
  "u/SAT_certified_npc", "u/SAT_redditor_acct", "u/wholesome_curve_kid", "u/cursed_module2",
  "u/blursed_score", "u/expectedfactorial_SAT", "u/lurker_1480", "u/lurker_1520",
  "u/finalsweek_freelance", "u/SAT_again_finna", "u/3rd_attempt_lol", "u/2nd_attempt_unlocked",
  "u/scored_1600_lmao_jk", "u/scored_1410_validation", "u/score_release_chronicled", "u/digital_module_dread",
  "u/AP_and_SAT_szn", "u/just_wanna_break_1500", "u/breakthrough_1500_baddie", "u/breakthrough_pls",
  "u/cooked_on_QAS", "u/QAS_addict", "u/blue_book_grinder", "u/blue_book_burnout",
  "u/desmos_did_it", "u/calculator_carry", "u/no_calc_npc", "u/reading_carry_acc",
  "u/math_carry_acc", "u/grammar_carry_acc", "u/section_3_struggler", "u/reading_passage_pls",
  "u/evidence_pair_pain", "u/main_idea_idgi", "u/comma_chaos", "u/punctuation_panic",
  "u/subject_verb_sufferer", "u/pronoun_pain", "u/clarity_crusader", "u/redundancy_radar",
  "u/transitions_traumatized", "u/lin_eq_lover", "u/quad_eq_qween", "u/exponent_expert_aspiring",
  "u/system_solver_szn", "u/data_chart_decoder", "u/scatter_plot_struggler", "u/median_mode_meh",
  "u/stats_section_savior", "u/percent_panic_attack", "u/ratio_realm", "u/word_problem_wreckage",
  "u/circle_curse", "u/triangle_truther", "u/SOHCAHTOA_acolyte", "u/30_60_90_kid",
  "u/45_45_90_main", "u/pythagoras_pls", "u/function_freelance", "u/inverse_idiocy",
  "u/composite_confusion", "u/digital_SAT_savior", "u/digital_SAT_skeptic", "u/took_paper_SAT",
  "u/CB_my_villain", "u/took_module2_hard_lol", "u/got_easy_mod2", "u/RIP_score_report",
  "u/bluebook_didnt_save", "u/score_july_chronicled", "u/junior_year_SAT", "u/senior_year_redoing",
  "u/SAT_freshmanyearwild", "u/8th_grader_grinder", "u/10th_grade_panic_SAT", "u/SAT_grinder_3am",
  "u/SAT_grinder_5am", "u/SAT_finalsweek_bestie", "u/khan_andmemes", "u/UWorld_devotee",
  "u/Princeton_Review_RIP", "u/Barrons_brutal", "u/Magoosh_main", "u/sis_im_done",
  "u/bro_imdone_with_SAT", "u/SAT_my_villain_origin", "u/CB_certified_villain_SAT", "u/cancelled_score_lol",
  "u/superscored_to_glory", "u/college_admit_carry", "u/SAT_carry_my_app",
];

// Build student bubbles from a list of content strings, rotating through the
// handle pool so the same student names reappear across replies (which is what
// real Reddit threads look like). The pool is just an illustrative roster.
function bubbles(
  contents: string[],
  pool: string[] = AP_BIO_HANDLES,
  start: number = 0,
): SeedBubble[] {
  return contents.map((content, i) => ({
    handle: pool[(start + i) % pool.length],
    content,
  }));
}

// ─── AP BIO ────────────────────────────────────────────────────────────────
// 25 topics. Each topic carries 50+ student bubbles (with at least one
// u/inhero_seed prompt). Counts intentionally vary per topic.
const AP_BIO: SeedTopic[] = [
  {
    id: "frq-panic",
    topic: "FRQ panic: how do you even structure the answer?",
    bubbles: [
      ...bubbles([
        "I understand the concept but freeze when the FRQ asks me to justify with data.",
        "Same. I need a framework for when to describe vs explain vs justify.",
        "bro the 'justify with evidence' prompts make me black out every time fr",
        "use TEA: topic sentence, evidence from the stimulus, analysis. lifesaver no cap",
        "I write the answer to the question first then add 'the data shows ___ which supports ___' at the end",
        "describe = restate what's happening. explain = give the mechanism. justify = use data to defend a claim. periodt",
        "deadass I just memorized that 'predict' = make a claim + give a reason. half the FRQ is doing that",
        "FRQ stands for Free Rejection Quotient I fear",
        "honestly the rubric reads itself. one point per verb. start counting verbs in the prompt before you write anything",
        "if the prompt says 'describe AND explain' you LITERALLY have to do both in the same sub-question. half-credit traps",
        "I lost 2 points last year bc I described instead of justifying. never again",
        "guys read the bolded verb in every sub-question. that's the entire question",
        "my teacher said: answer with the EXACT verb in the prompt. if it says 'identify' say 'the [thing] is ___' verbatim",
        "I used to write essays for FRQs. now I write 2 sentences per part. score went up bestie",
        "the LESS you write the better. graders are looking for keywords, not vibes",
        "the trap is over-explaining. they want the mechanism named, not a paragraph about it",
        "anybody else lowkey scared of FRQ 4 (the long one)? brain just shuts down",
        "FRQ 4 is just FRQ 1 + 2 questions stapled together. break it into the sub-parts and do them as separate Qs",
        "stop reading the WHOLE FRQ before starting. read sub-question A, answer A, then move to B",
        "y'all I LITERALLY skip the intro paragraph of every FRQ. it's never tested directly",
        "the stimulus is bait. the question is in the bolded prompt below. skim the stim, hunt the prompt",
        "POV: you finished MCQ early then FRQ took every minute and then some 💀",
        "FRQ 6 is the experimental design one. the answers are: control group, IV, DV, large n, replication. memorize",
        "for experimental design always mention 'control of variables' and 'multiple trials.' easy points",
        "if they ask for a graph DRAW IT. axes labeled, units, title. don't just describe it",
        "drawing a graph for free response is a flex 1 minute spent for 1-2 points fr",
        "I literally bring a ruler to AP Bio for the graph FRQ. straight line = 1 point",
        "ANNOTATE your graph. arrows + labels. graders give points for clarity",
        "u guys writing graphs?? bro I just draw a curve and pray",
        "if FRQ says 'use the data' you HAVE to quote a specific number or trend. not 'the data shows it works'",
        "use numbers fr. 'the average increased from 12 to 24' beats 'the average increased'",
        "for null hypothesis Qs always say 'there is no significant difference between ___ and ___'. literally always",
        "chi-square FRQs: if X² > critical value → reject null. if X² < critical → fail to reject. memorize the words",
        "they NEVER ask you to calculate chi-square fully. just to interpret it. read the table",
        "the FRQ I bombed last year was about Hardy-Weinberg with 4 sub-parts. one variable in p² and I lost the whole thing",
        "if you do Hardy-Weinberg start with q = √(homozygous recessive freq). everything else falls out of that",
        "every FRQ has like 3 keyword phrases worth a point each. find them, write them, move on. don't romance the answer",
        "I write my answers in BULLET POINTS. graders LOVE this. quick to scan, easy to award points",
        "wait you can use bullets?? bro I've been writing paragraphs",
        "YES bullets are legal. AP doesn't care about style, only content. one bullet per claim",
        "the trap with 'predict' questions is forgetting to give a REASON. claim + 'because' is the formula",
        "anyone else feel like FRQ 2 is always the hardest? it's always the genetics one",
        "FRQ 2 is usually the inheritance/probability one. learn product rule + sum rule cold",
        "product rule: AND = multiply. sum rule: OR = add. one sentence saves you 3 points",
        "for inheritance Qs ALWAYS draw a Punnett square in the margin. teachers love it",
        "the most slept-on FRQ tactic: write 'NOTE:' next to your answer if you change your mind. graders only score what's clearly final",
        "ate FRQ 2024 no crumbs bestie. structure carried me",
        "I scored a 5 last year and didn't write more than 4 sentences per sub-question",
        "the curve is generous fr. you only need ~60-65% to get a 5 in most years",
        "imagine being a grader and reading 800 of these in a row. write FOR THE GRADER not for art",
        "the FRQ rubric is online for past years. read THREE old rubrics and you'll see the pattern",
        "honestly past FRQs from 2017-2023 are gold. CB recycles the SAME prompt formats every year",
        "anyone else copy the prompt's verbs back into their answer? feels cheap, scores high",
        "yes repeat the verb. 'identify the variable' → 'the independent variable IS ___'. literally a free point",
      ]),
      seed("Drop your hardest FRQ command word below — we'll build a mini guide from the replies."),
      ...bubbles([
        "command word that gets me every time: 'predict.' I always forget to justify the prediction",
        "'evaluate' is so vague. like??? evaluate what??? just give me 'explain' or 'describe'",
        "'justify' for me. I always say WHAT but never WHY",
        "'compare AND contrast' — gotta give similarities AND differences. I always forget one",
        "'analyze' kills me. it's not just describing, you have to interpret the trend",
        "'support your answer' = restate your claim and tie it to specific evidence. same pattern every time",
        "honestly the one that wrecks me is 'use the figure.' I always paraphrase instead of quoting the figure directly",
      ], AP_BIO_HANDLES, 60),
      seed("Top 5 verbs from the replies will become the FRQ Command-Word Cheat Sheet — pinned next week."),
    ],
  },
  {
    id: "mcq-timing",
    topic: "MCQ timing felt brutal",
    bubbles: [
      ...bubbles([
        "Does anyone else run out of time on data-heavy MCQs?",
        "The graphs take me forever. I need a faster way to eliminate choices.",
        "1 min 15 sec per MCQ. that's the budget. if a question takes more, FLAG and move on",
        "FLAG. AND. MOVE. ON. the #1 mistake is sinking 3 minutes into a 1-point question",
        "I learned to read the question stem BEFORE the data. way faster",
        "yes read the question first, then look at the graph KNOWING what variable you need",
        "if a data MCQ has 3 graphs my strategy is to find the trend keyword in the question and ignore the rest",
        "POV: you spent 4 minutes on Q12 and the rest of the section panic-circles ensue 💀",
        "the trap is overconfident MCQs. you think you got it, you didn't read the qualifier ('which is LEAST')",
        "ALWAYS circle 'except / not / least / most / best.' miss those and you flip the answer",
        "if 2 answers feel right read the question stem AGAIN. usually there's a word you missed",
        "MCQ section is mostly about elimination not knowing the right answer. cross out wrong → guess the rest",
        "if you're stuck between 2 choices, pick the more SPECIFIC one. AP MCQs reward precision",
        "if a choice has the word 'always' or 'never' it's usually wrong in bio. nature has exceptions",
        "any MCQ with the word 'always' triggers my fight or flight",
        "guys eat sugar before the exam. timing for me is 50% knowledge 50% blood glucose 💀",
        "did anyone else lock in after question 30? first half is so much harder",
        "the curve is built around the assumption you bomb data questions. don't stress one section",
        "I batch MCQs into 3 passes: pass 1 = easy and fast, pass 2 = medium, pass 3 = hard + flagged",
        "3-pass strategy saved my life. pass 1 in 30 min, leave 30 for FRQ headstart",
        "wait you do MCQ in 30 min?? how 😭",
        "u just train. take 5 timed MCQs daily for 2 weeks before the exam, you'll be fast",
        "the data MCQs reward eyeball estimation. 'about how much did X increase' = look at axis, ballpark",
        "if a graph is in % and they ask in absolute numbers, multiply by the total. easy trap",
        "ratio questions in MCQ are usually 9:3:3:1 in disguise. recognize the pattern",
        "I memorized 6 graph 'shapes' (linear, exponential, sigmoidal, etc.) and just match them. saves time",
        "shapes!!! sigmoidal = limited resource curve. logistic. carrying capacity. memorize the shape vocabulary",
        "exponential = unlimited resources (early bacterial growth). that's the entire interpretation",
        "for enzyme kinetics graphs: substrate vs rate. plateau = enzyme saturation. simple",
        "the temperature/pH graphs are bell curves. peak = optimum. that's it. don't overthink",
        "MCQs about photosynthesis ALWAYS have a graph of CO2 vs O2 or light vs rate. learn those two patterns",
        "if u see ATP yields in MCQ glance at the number — too high (40+) or too low (2) is usually wrong",
        "MCQ section is built to be skim-able. don't deep-read the stimulus, hunt for keywords",
        "the keyword approach saved me. I scan stim for 1-2 keywords related to the Q and ignore everything else",
        "FRQ takes brain power, MCQ takes elimination speed. completely different muscles",
        "data MCQs are usually 2-step: read trend, apply concept. step 1 is just READ THE AXIS",
        "axis label mistakes kill more scores than not knowing biology. read the label SLOWLY",
        "if MCQ asks 'which best explains' there's usually a most-mechanistic answer. pick the one with the most specific cause",
        "'best explains' = most causal mechanism. 'best supports' = most direct evidence. learn the distinction",
        "anyone else feel like AP Bio MCQs are getting harder yoy? 2024 was BRUTAL",
        "2024 MCQ was rough but the curve adjusted. 5 cutoff was lower",
        "the curve always adjusts. CB literally cannot let everyone fail. trust the process",
        "I flagged 12 MCQs in 2024 and still got a 5. flag aggressive, don't get stuck",
        "FLAG IS YOUR BEST FRIEND. literally anything you're unsure of, flag and come back",
        "after MCQ check ALL flagged ones. fresh eyes change a lot of answers",
        "DO NOT change answers without a reason though. first instinct is usually right unless you found a new clue",
        "I used to change answers thinking I was being smart. lost 4 points. trust the gut",
        "the MCQ format on digital AP feels different from paper. you can flag IN the digital version too",
        "digital AP MCQ is SO MUCH faster for me. paper has more flipping back and forth",
        "for digital AP highlight key words in the question with the highlight tool. makes elimination way faster",
      ]),
      seed("We're collecting timing strategies here. Best one gets added to the AP Bio Survival Sheet."),
      ...bubbles([
        "another tip: keep one finger on your answer sheet as you read. way fewer bubble misalignments",
        "for digital: use the LINE READER tool. cuts your reading time in half on data-heavy passages",
        "skim the answer choices BEFORE the question. tells you what kind of answer you're hunting for",
        "if a question takes >2 min you don't know it. flag and move. don't be a hero",
        "MCQ pacing target: question 30 by minute 35. if you're behind, skip data Qs first",
        "MCQ section is mostly recognition. you either know it in 30 seconds or you don't",
      ], AP_BIO_HANDLES, 55),
    ],
  },
  {
    id: "gene-expression",
    topic: "Gene expression is everywhere",
    bubbles: [
      ...bubbles([
        "Why does every practice set somehow become transcription regulation?",
        "I can memorize the words but still miss the logic.",
        "fr every unit boils down to 'how does this gene get turned on or off' it's all gene expression",
        "literally the AP redesign made gene expression like 30% of the test. they're not subtle",
        "transcription = DNA → mRNA. translation = mRNA → protein. that's the spine. everything else is regulation",
        "regulation can happen at 4 levels: transcription, post-transcription, translation, post-translation. memorize the 4",
        "transcription factors. enhancers. silencers. introns. exons. learn the words THEN learn what they do",
        "promoters are where RNA polymerase binds. enhancers are far away and loop in. silencers turn things OFF",
        "operons (prokaryotes) and transcription factors (eukaryotes) are the two main regulation systems they test",
        "lac operon = INDUCIBLE. trp operon = REPRESSIBLE. memorize this difference before anything else",
        "inducible = OFF by default, turned ON when needed. repressible = ON by default, turned OFF when product is plenty",
        "the lac operon is asked every single year. learn it cold",
        "trp operon is the runner-up. they alternate sometimes. learn both",
        "post-transcription regulation = mRNA splicing, alternative splicing. one gene → multiple proteins from same mRNA",
        "alternative splicing is why we only have 20k genes but make 100k+ proteins. wild fact, easy points",
        "post-translation = phosphorylation, ubiquitination, etc. protein gets modified after it's made",
        "phosphorylation = adding a phosphate group. usually activates the protein. think of it as turning on a switch",
        "epigenetics is now FAIR GAME. DNA methylation = gene OFF. histone acetylation = gene ON",
        "epigenetics mnemonic: METHYL = MUTE. acetyl = active. that's all u need",
        "methylation silences genes. cells use it to specialize (a liver cell ≠ a brain cell despite same DNA)",
        "differentiation is literally just selective gene expression across the same genome. mind blowing if u think about it",
        "stem cells = can express any gene = unspecialized. mature cells = expression locked in = specialized",
        "y'all I keep mixing up transcription factor vs general TF vs activator vs repressor",
        "general TFs bind to the promoter for ANY gene. specific TFs (activators/repressors) target specific genes",
        "activators promote transcription. repressors block it. the names literally tell you the function",
        "the trap question is about ENHANCERS. they can be thousands of bp away from the gene and still work",
        "DNA loops back so the enhancer can touch the promoter. visualize it as a loop, not a straight line",
        "for any 'mutation in regulatory region' question: ask 'does this break the on switch or the off switch?' that tells u everything",
        "if u see 'mutation in promoter' → gene can't be transcribed at all. usually a loss of function",
        "if u see 'mutation in repressor binding site' → gene is constantly ON. usually a gain of function",
        "POV: u see 'gene expression' in the question and your brain rearranges all of bio into one topic",
        "AP Bio is literally just 'central dogma' + 'how it's regulated' + 'how it goes wrong (cancer)' + ecology to fill space",
        "cancer is just gene expression going wrong. proto-oncogene mutates → oncogene → cell divides uncontrollably",
        "tumor suppressor genes (like p53) get mutated → cell can't stop dividing → tumor. p53 is the celebrity gene",
        "p53 is on like 50% of cancer FRQs. learn its function (stops cell cycle if DNA is damaged)",
        "if a question mentions a 'mutation in p53,' you can already guess: cancer, uncontrolled division, no apoptosis",
        "apoptosis = programmed cell death. p53 triggers it when DNA is too damaged. lifesaver vocab",
        "the lac operon details: lactose → allolactose → binds repressor → repressor falls off operator → transcription ON",
        "trp operon details: trp builds up → binds repressor (corepressor) → activates repressor → blocks operator → OFF",
        "catabolite repression in lac operon is the BONUS topic. cAMP-CAP binds to enhance lac transcription when glucose is low",
        "if u see cAMP in a lac operon question that's catabolite repression. CAP protein. learn it for the 5",
        "Hox genes are master regulators. they tell the embryo which body parts go where. literally body plan genes",
        "Hox gene mutations = misplaced body parts (eg legs growing on head in fly mutants). cool, memorable, testable",
        "if a question asks about 'master switches in development' → answer is Hox genes (or similar regulatory genes)",
        "miRNA and siRNA are post-transcriptional. they bind to mRNA and block translation. relatively new on the exam",
        "RNA interference (RNAi) is the technique that uses siRNA to knock down gene expression. lab MCQ favorite",
        "the lab where they used siRNA to silence a gene → answer is 'they're studying gene function by removing it'",
        "wait so gene expression is just 'turning the volume up or down on each gene'? bro that's so clean",
        "yes that's literally the whole framework. volume up = activator, transcription, acetylation. volume down = repressor, methylation",
        "any FRQ that asks 'how would you upregulate gene X' → answer mentions transcription factor + acetylation",
        "any FRQ that asks 'how would you knock out gene X' → answer mentions CRISPR or siRNA or methylation",
        "CRISPR-Cas9 is now LITERALLY on the AP. learn: guide RNA + Cas9 cuts DNA at specific spot",
        "CRISPR FRQ is usually: 'design an experiment to knock out gene X.' answer = CRISPR + control with WT",
      ]),
      seed("We're making a Gene Expression Mechanism Map. Comment the part that keeps breaking."),
      ...bubbles([
        "the part that keeps breaking for me is which regulator binds where. activators vs repressors vs TFs",
        "I keep mixing up enhancer vs promoter. promoter is RIGHT BEFORE the gene; enhancer can be far away",
        "post-transcriptional vs post-translational. one is mRNA, the other is protein. that's the trick",
      ], AP_BIO_HANDLES, 50),
    ],
  },
  {
    id: "signal-transduction",
    topic: "Signal transduction confusion",
    bubbles: [
      ...bubbles([
        "I keep mixing up ligand, receptor, second messenger, and response.",
        "Same. I need it as a flowchart, not paragraphs.",
        "ligand = the signal molecule (hormone, neurotransmitter, etc.)",
        "receptor = the lock on the cell surface that the ligand fits into",
        "second messenger = the signal RELAY inside the cell (cAMP, Ca2+, IP3, DAG)",
        "response = whatever the cell does (gene expression, secretion, division, etc.)",
        "the entire pathway in one line: LIGAND → RECEPTOR → 2nd MESSENGER → KINASE CASCADE → RESPONSE",
        "lock and key. ligand is key, receptor is lock. that's how I remember 1+2",
        "second messengers AMPLIFY the signal. 1 ligand → millions of cAMP. that's why hormones are so potent at tiny doses",
        "cAMP is the OG second messenger. epinephrine → β-adrenergic receptor → G-protein → AC → cAMP → PKA → response",
        "G-proteins are the link between receptor and second messenger production. they're switches (GDP off, GTP on)",
        "tyrosine kinase receptors don't use second messengers — they autophosphorylate and recruit signaling proteins directly",
        "two big receptor types: GPCRs (G-protein coupled) and RTKs (receptor tyrosine kinases). most signal Qs are about one of these",
        "GPCR signaling is the classic: hormone → receptor → G-protein → enzyme (AC or PLC) → 2nd msg → cascade",
        "RTKs work differently: ligand binds → 2 receptors dimerize → autophosphorylate → recruit relay proteins → cascade",
        "insulin signaling is RTK. epinephrine signaling is GPCR. learn one example of each",
        "the trap is asking 'what happens if receptor is blocked.' answer: NOTHING. signal never enters the cell",
        "if ligand can't bind → no response. if 2nd messenger is degraded → response is shorter",
        "termination of signal is a fave FRQ topic. phosphatases reverse phosphorylation. GTPases hydrolyze GTP to turn off G-protein",
        "termination is important bc without it the signal would never STOP. cells would die from constant activation",
        "anyone else struggle with kinase vs phosphatase?? kinase ADDS a phosphate, phosphatase REMOVES it",
        "kinase = ON (usually). phosphatase = OFF. literally opposite functions",
        "phosphorylation cascade is the amplification step. each kinase activates many downstream kinases",
        "the cascade is why hormones work at nanomolar concentration. exponential amplification",
        "Ca2+ as a 2nd messenger is huge. it's stored in the ER, released into cytoplasm, triggers responses",
        "Ca2+ release into cytoplasm = muscle contraction, neurotransmitter release, fertilization. all calcium-driven",
        "IP3 and DAG come from PIP2. IP3 → ER → Ca2+ release. DAG → PKC. this is the PLC pathway. confusing but common",
        "POV: u're memorizing acronyms and the FRQ asks u to APPLY them 💀",
        "the application FRQ is always 'a mutation in X protein causes Y. explain.' just trace the pathway forward",
        "trace the pathway. if a protein is broken, everything DOWNSTREAM is broken. everything upstream still works",
        "downstream/upstream is the killer concept. memorize the order of the pathway and u can answer any mutation Q",
        "for signaling FRQs always mention: 1) ligand binds, 2) receptor activates, 3) 2nd messenger, 4) cascade, 5) response",
        "graders LOVE that 5-step structure. write it as a list. easy points",
        "the apoptosis pathway is signal transduction in disguise. extracellular signal → caspases → cell death",
        "extrinsic apoptosis: death receptor (Fas). intrinsic: mitochondria release cytochrome c. both end in caspases",
        "if a FRQ mentions caspases → answer is apoptosis (programmed cell death)",
        "neurons use signal transduction at synapses. neurotransmitter = ligand. that's why action potentials trigger Ca2+ release",
        "wait so muscle contraction is signal transduction too?? yes — neuron releases ACh → ACh receptor on muscle → Ca2+ → contraction",
        "literally every cellular communication is the same framework. ligand → receptor → response. unifying theme",
        "the unifying theme is the gift. once u see it, u see it everywhere on the exam",
        "if u're stuck on a signaling FRQ just write the 5 steps in order. partial credit GUARANTEED",
        "STEROID hormones DON'T use 2nd messengers. they cross the membrane directly and bind to intracellular receptors",
        "steroid hormones are nonpolar (cross the membrane). peptide hormones are polar (need a receptor at the surface)",
        "estrogen, testosterone, cortisol = steroid. insulin, glucagon, growth hormone = peptide. learn the categorization",
        "steroid receptors act as TRANSCRIPTION FACTORS once bound. ligand-receptor complex → nucleus → DNA",
        "so the response to steroid hormones is SLOW (transcription takes time) but LONG-LASTING. opposite of peptide hormones",
        "peptide hormones = fast response, short duration. steroid = slow response, long duration. memorize the timing difference",
        "the cool thing is the same hormone can have different responses in different cells. depends on which receptors a cell expresses",
        "this is why insulin makes muscle cells absorb glucose but doesn't affect skin cells. only muscle has insulin receptors",
        "tissue specificity in hormone response = different cells expressing different receptors. classic FRQ angle",
        "if u see 'why does hormone X affect tissue Y but not tissue Z' the answer is RECEPTOR EXPRESSION",
      ]),
      seed("Perfect — this week's drop should be a pathway map."),
      ...bubbles([
        "yes pathway map pls. visual learners we starving out here",
        "make sure the map includes: GPCR, RTK, intracellular, and steroid receptor pathways. those are the 4 archetypes",
        "the map should also have arrows for termination (kinase ↔ phosphatase). that's where u lose points",
      ], AP_BIO_HANDLES, 53),
    ],
  },
  {
    id: "two-day-cram",
    topic: "2-day cram plan",
    bubbles: [
      ...bubbles([
        "If I have 48 hours left, what units are highest ROI?",
        "I'd rather master FRQ patterns than reread the textbook.",
        "ROI tier list: unit 3 (cell energy), unit 5 (genetics + Hardy-Weinberg), unit 6 (gene expression). carry the whole exam",
        "skip the early cell organelle memorization. they barely test definitions",
        "skip Darwin/history of bio. they don't test it",
        "ABSOLUTELY hit: Hardy-Weinberg math, water potential math, chi-square interpretation, photosynthesis ETC, cellular respiration ETC",
        "the math problems are the EASIEST 5 points. you just memorize the formula. no understanding required",
        "Hardy-Weinberg in 30 seconds: p² + 2pq + q² = 1. p + q = 1. find q first from homozygous recessive freq",
        "chi-square: X² = Σ((observed - expected)² / expected). if X² > critical, reject null. that's it",
        "water potential: Ψ = Ψp + Ψs. Ψs = -iCRT. memorize the formula, plug numbers, move on",
        "for 48 hours: 1 day reviewing concepts, 1 day doing past FRQs. ALWAYS finish with FRQs",
        "past FRQs > new content review. CB recycles patterns. you'll see the same prompt formats",
        "do FRQs FROM THE PAST 5 YEARS. score yourself with the rubric. you'll find your weak spots",
        "the FRQ scoring rubrics are FREE on AP Central. download them all",
        "I did 2017-2023 FRQs in 48 hours and got a 5 raw dogging the curriculum lol",
        "raw dogging = no study materials, only past FRQs + their rubrics. surprisingly effective",
        "shoutout to Mark Anestis 5 Steps to a 5 for cram time. concise and exam-shaped",
        "PRINCETON REVIEW AP Bio also slaps for cram. flowcharts and tables, not paragraphs",
        "Bozeman Biology on YouTube. his AP Bio videos are 10 min each and cover entire units",
        "Bozeman is GOATED. watch him at 1.5x and u finish a unit in 7 min",
        "if u have 48 hours don't try to learn new stuff. CONSOLIDATE what u already know",
        "for cram nights I write a one-page cheat sheet per unit. just from memory. it shows me what I forgot",
        "one-page cheat sheet method >>> rereading textbook chapters",
        "AP Bio textbook chapters are like 50 pages long. NO ONE has time. cheat sheet method only",
        "Quizlet AP Bio flashcards are mid but the 'AP Biology Master Set' is decent. ~1000 cards, do em on the bus",
        "Anki >>> Quizlet for retention but takes setup time. only use if u have 1+ weeks",
        "POV: it's 11pm the night before and ur learning entire cellular respiration from a TikTok 💀",
        "the 'ATP synthase' TikTok with the spinning rotor saved my AP score fr",
        "TikTok bio is actually fire. one video per concept. retention from songs/visuals is real",
        "for last 24 hours: do EXACTLY ONE practice MCQ section + one FRQ. then sleep. cramming past midnight is negative ROI",
        "SLEEP. CRAMMING AT 2AM IS A SCAM. your brain consolidates during sleep, including the stuff u JUST learned",
        "the morning of: skim ur cheat sheet, eat breakfast, drink water, walk to test. don't open the textbook",
        "morning-of cramming is anxiety food. u remember less, get more nervous. skim only what u CONFIDENTLY KNOW",
        "skim what u know on test morning. it's a confidence builder, not a learning session",
        "if u know NOTHING with 48 hours left, focus on FRQ technique. content < technique at the bottom",
        "FRQ technique > content for low scorers. the prompts are predictable. learn the verbs, get partial credit",
        "if u know SOME content with 48 hours, focus on Hardy-Weinberg, chi-square, water potential. easy points",
        "if u're a 4 trying for 5: deep-dive ETC + Calvin cycle. that's where 4s become 5s",
        "for the curve: 60-65% raw → 5. so u can miss 35-40% and still get a 5. CALM DOWN",
        "knowing the curve made me chill. I went from 'I need everything' to 'I need ~65%'. way better mental state",
        "anyone else feel like cramming AP Bio is fundamentally different from cramming history? bio rewards systems thinking, not memorization",
        "exactly. AP Bio is connecting boxes with arrows. if u understand the connections, u can derive the details",
        "the 'four big ideas' (now units but same idea): evolution, energy, info transfer, interactions. EVERY question is one of these",
        "honestly skim the College Board Course and Exam Description (CED) once. it's the actual blueprint of the exam",
        "CED is like 200 pages but only ~30 are content. skim those, ignore the rest",
        "the CED has the official 'learning objectives.' MCQs are literally derived from them. read them",
        "MCQs are written from learning objectives word for word. if u know the LO, u recognize the Q",
        "for cram: 60% practice problems, 30% concept review, 10% rest/sleep. that's the formula",
        "rest is part of the formula. u CANNOT cram for 16 hours straight. blocks of 90 min with 15 min breaks",
        "90/15 pomodoro for cram. 4 blocks per day = 6 hours of real work. more than that = diminishing returns",
        "guys eat carbs the night before. brain runs on glucose. low carb the day of an exam is rough",
        "PROTEIN breakfast though. eggs > pancakes. sustained energy, no sugar crash",
      ]),
      seed("Vote: cram by unit, by FRQ type, or by common traps?"),
      ...bubbles([
        "FRQ TYPE. units are too broad. FRQ types repeat literally year to year",
        "common traps. I lose more points to traps than to lack of knowledge",
        "by unit imo. units 3+5+6 are 70% of the test, cramming those is highest ROI",
        "honestly start with traps, then FRQ types, then units. that's the priority order at 48 hours",
        "do all 3 in 48 hours. 12 hours per category + 12 for sleep/breaks. tight but doable",
      ], AP_BIO_HANDLES, 54),
      seed("OK we're publishing 3 cram tracks. Tag yours and we'll match you with someone on the same path."),
    ],
  },
  {
    id: "atp-synthase",
    topic: "ATP synthase keeps appearing",
    bubbles: [
      ...bubbles([
        "Every electron transport chain FRQ ends in a chemiosmosis question. Why is this.",
        "Proton gradient → ATP synthase → ATP. But the FRQ wants the WHY and I blank.",
        "Honestly I just memorized 'electrochemical gradient drives conformational change.'",
        "Does anyone have the canonical 4-sentence answer for 'how does ATP synthase make ATP'?",
        "4-sentence answer: 1) ETC pumps H+ into intermembrane space. 2) Creates electrochemical gradient. 3) H+ flows back through ATP synthase. 4) Conformational change phosphorylates ADP → ATP",
        "memorize those 4 sentences. they answer like 30% of ETC FRQs",
        "ATP synthase is the molecular MOTOR. H+ ions spin the rotor like water through a turbine",
        "it's literally a turbine. nature invented hydroelectric power before we did",
        "chemiosmosis = using a chemical gradient to do work. H+ gradient is the gas tank, ATP synthase is the engine",
        "if u see 'chemiosmosis' in a Q the answer involves H+ gradient + ATP synthase. ALWAYS",
        "the question that wrecks ppl: 'what happens if the inner mitochondrial membrane becomes permeable to H+'",
        "answer: H+ leaks back without going through ATP synthase. gradient collapses. ATP production stops. heat is released (this is how brown fat works!)",
        "BROWN FAT FRQ. they ask about thermogenin/UCP1 which is literally a H+ channel that bypasses ATP synthase. heat instead of ATP",
        "thermogenin is the cool fact. UCP1 uncouples ETC from ATP synthesis. babies and hibernating animals use it to stay warm",
        "uncoupling protein = let H+ through without making ATP = heat. brown fat = brown bc full of mitochondria",
        "POV: u see 'uncoupler' on the FRQ and ur brain immediately goes 'thermogenin / DNP / heat / dies of overheating'",
        "DNP (2,4-dinitrophenol) is the uncoupler used as a weight loss drug. KILLED people from overheating. classic FRQ",
        "the DNP weight loss death story is a fav of bio teachers. learn it as a worked example",
        "if FRQ mentions a 'drug that disrupts the proton gradient' the answer is uncoupler / DNP / no ATP made / heat released",
        "ATP synthase has 2 main parts: F0 (in the membrane, lets H+ through) and F1 (catalyzes ATP synthesis). u don't need to memorize the subunits, but know the 2 parts",
        "F0 = pore in membrane. F1 = catalytic head. H+ through F0 → rotation → conformational change in F1 → ATP",
        "ETC uses NADH and FADH2 as electron carriers. they DROP electrons into the chain",
        "each NADH yields ~2.5 ATP, each FADH2 ~1.5 ATP. why the difference? FADH2 enters the chain LATER (skips 1 H+ pump)",
        "this is why glycolysis (which makes NADH) is less ATP-efficient than Krebs (more NADH per cycle)",
        "wait so the # of H+ pumped per electron pair is what determines ATP yield? YES. that's the unifying concept",
        "ATP synthase is the SAME enzyme in both photosynthesis and respiration. chloroplasts AND mitochondria",
        "in chloroplasts ATP synthase sits in the thylakoid membrane and uses light-driven H+ gradient",
        "the H+ gradient in chloroplasts is in the THYLAKOID LUMEN. in mitochondria it's the INTERMEMBRANE SPACE. different locations same logic",
        "if u know one ATP synthase u know both. literally just swap 'mitochondrion intermembrane space' ↔ 'thylakoid lumen'",
        "FRQ love asking compare/contrast respiration and photosynthesis. answer: same ATP synthase, different gradient sources",
        "PHOTOSYNTHESIS uses LIGHT to pump H+. RESPIRATION uses food (electrons from glucose) to pump H+. that's the diff",
        "for both: ETC pumps H+ → gradient → ATP synthase → ATP. universal",
        "honestly chemiosmosis is the MOST UNIFYING CONCEPT in cell energy. learn it once, apply everywhere",
        "the AP REWARDS u for connecting respiration and photosynthesis via chemiosmosis. it's literally an FRQ template",
        "any FRQ about 'how do mitochondria and chloroplasts both make ATP' → answer = chemiosmosis + ATP synthase + same mechanism",
        "the endosymbiotic theory explains why both organelles have similar ATP synthase. came from bacteria. bonus connection",
        "bacteria ALSO use ATP synthase. cell membrane is their 'inner membrane.' periplasm is their 'intermembrane space'",
        "the conformational change is what's KEY. it's a binding-change mechanism. don't have to know in detail but mention 'rotation drives conformational change'",
        "the binding change mechanism won a Nobel. fun history fact. AP doesn't ask for the prize but the mechanism is fair game",
        "if u see a graph of 'H+ gradient over time' and the gradient drops, ask: did ATP synthase activate or is the membrane leaky?",
        "if a poison BLOCKS ATP synthase (oligomycin), the gradient builds up but no ATP is made. classic experimental setup",
        "oligomycin = ATP synthase blocker. cyanide = blocks Complex IV (no electron transfer). these are the 2 fav poisons on AP",
        "cyanide stops electrons → no H+ pumping → no gradient → no ATP. that's why it kills u quickly",
        "rotenone is another blocker (Complex I). DNP is the uncoupler. learn the 4 main inhibitors (rotenone, cyanide, oligomycin, DNP)",
        "any FRQ about a poison: trace what step it blocks → what builds up → what doesn't get made",
        "trace what BUILDS UP and what DOESN'T GET MADE. that's the universal answer structure for inhibitor questions",
        "the answer is always 'X accumulates because it can't be processed, Y is depleted because it depends on X being processed'",
        "POV: u see 'cyanide' and ur brain immediately goes 'block ETC complex IV → no oxygen acceptor → ETC backs up → no H+ pumped → no ATP'",
        "that traceback is what 5s do automatically. practice 5 inhibitor problems and u'll get the muscle memory",
      ]),
      seed("Reply with your best 4-sentence canonical answer. We'll pin the cleanest one."),
      ...bubbles([
        "my version: 'NADH/FADH2 drop electrons into the ETC. Energy from electron transport pumps H+ into the intermembrane space. The resulting electrochemical gradient drives H+ back through ATP synthase. The rotational/conformational change phosphorylates ADP to ATP.'",
        "shorter version: 'ETC pumps H+, gradient stores energy, ATP synthase converts it to ATP.' 3 sentences. AP accepts this",
        "honestly mine is just 'gradient → flow → conformational change → ATP.' 1 sentence and it earned full credit on the practice rubric",
      ], AP_BIO_HANDLES, 50),
    ],
  },
  {
    id: "mitosis-meiosis",
    topic: "Mitosis vs meiosis but the FRQ version",
    bubbles: [
      ...bubbles([
        "I can label every phase. I cannot explain 'why does meiosis produce variation' in 3 sentences.",
        "Independent assortment + crossing over + random fertilization. That's the trio.",
        "Wait does crossing over happen in meiosis I or II — I always second-guess.",
        "I (prophase I, specifically). II is just like mitosis but on haploid cells.",
        "the 3 sources of variation in meiosis: 1) crossing over (prophase I), 2) independent assortment (metaphase I), 3) random fertilization. write all 3",
        "always write the PHASE where each variation happens. graders give points for specificity",
        "crossing over = PROPHASE I, chiasmata form between homologous chromosomes",
        "independent assortment = METAPHASE I, homologous pairs line up randomly along the metaphase plate",
        "random fertilization is the 'bonus' source — happens AFTER meiosis but counts toward variation",
        "mitosis = 2 identical diploid cells. meiosis = 4 unique haploid cells. that's the spine",
        "POV: u draw the wrong phase on the FRQ and lose the whole sub-question 💀",
        "draw stick chromosomes with X shapes. 2 chromatids per chromosome. don't draw single lines",
        "homologous pair = ONE from mom + ONE from dad. NOT sister chromatids. confusing as hell",
        "sister chromatids are IDENTICAL copies of the same chromosome (after replication). homologs are DIFFERENT chromosomes from different parents that carry the same genes",
        "memorize this distinction. it's the #1 vocab trap on AP Bio",
        "sister chromatids separate in mitosis (anaphase) and meiosis II (anaphase II)",
        "homologous chromosomes separate in meiosis I (anaphase I). this is the unique step that makes meiosis 'meiotic'",
        "the FRQ trap: 'identify the phase where ploidy reduces from 2n to n.' answer: meiosis I, specifically anaphase I",
        "ploidy reduction happens in MEIOSIS I, not II. II just separates sister chromatids (like mitosis)",
        "this is why meiosis I is sometimes called the REDUCTIONAL division. meiosis II is the EQUATIONAL division",
        "reductional / equational vocab might show up on MCQ. learn it",
        "another trap: how many chromosomes after meiosis I in humans? 23 (haploid). after meiosis II? still 23 (each chromosome has 1 chromatid)",
        "chromosome count is CONFUSING because chromosomes can have 1 or 2 chromatids and they're still counted as 1 chromosome",
        "count chromosomes by counting CENTROMERES. one centromere = one chromosome",
        "centromere counting saves lives on chromosome-counting FRQs",
        "humans: 2n=46 (diploid somatic cell). after S phase: still 46 chromosomes but each has 2 chromatids (92 chromatids total)",
        "DNA AMOUNT doubles in S phase but chromosome COUNT doesn't change. confusing as hell",
        "u're not adding chromosomes, ur duplicating them. same number of centromeres, more DNA",
        "if a FRQ asks for chromosome count vs DNA amount across the cell cycle, draw a TABLE. way faster",
        "after meiosis I: 23 chromosomes (each with 2 chromatids) per cell. after meiosis II: 23 chromosomes (each with 1 chromatid) per cell",
        "nondisjunction is BIG on AP. failure to separate properly → aneuploidy → genetic disorders",
        "nondisjunction in meiosis I = both homologs go to same pole. all 4 gametes are abnormal (2 have extra, 2 missing)",
        "nondisjunction in meiosis II = both sister chromatids go to same pole. 2 of 4 gametes are normal, 2 abnormal",
        "memorize the 4-gamete outcome difference. classic MCQ",
        "Down syndrome = trisomy 21 = an extra chromosome 21 from nondisjunction. nearly always meiosis I (in egg)",
        "Klinefelter (XXY) and Turner (XO) are nondisjunction of sex chromosomes. also fair game",
        "any 'trisomy' or 'monosomy' Q is asking about nondisjunction. spot the keyword",
        "POV: u see a karyotype with an extra chromosome and immediately think 'nondisjunction, meiosis, gamete-level error'",
        "karyotype Qs come with a picture. count the chromosomes, look for the abnormal one, ID the syndrome",
        "binary fission ≠ mitosis. bacteria don't have a true mitotic spindle. fission is simpler",
        "binary fission is asexual reproduction in prokaryotes. cells just split after DNA replicates. one circular chromosome, no spindle",
        "mitosis is eukaryotic. it requires linear chromosomes, spindle apparatus, and the full M phase",
        "any FRQ comparing bacterial vs eukaryotic division → fission vs mitosis. mention spindle absence in bacteria",
        "cytokinesis is different in animals (cleavage furrow) vs plants (cell plate). FRQ trap",
        "animal cells PINCH (cleavage furrow). plant cells BUILD (cell plate). because plants have cell walls and can't pinch",
        "POV: u're drawing a cell plate forming and the FRQ rewards u for knowing this detail",
        "cell cycle checkpoints: G1 (size + nutrients), G2 (DNA replicated correctly?), M (all chromosomes attached to spindle?)",
        "if a checkpoint fails → cell cycle halts. if checkpoint is BYPASSED → uncontrolled division → cancer",
        "cancer cells skip checkpoints. that's why p53 mutations are so dangerous — they break the G1/G2 checkpoint",
        "back to meiosis: the most important point is that gametes are HAPLOID. that's why fertilization restores diploid",
        "haploid + haploid = diploid. that's the whole point of sexual reproduction at the cellular level",
        "if a question asks 'why is sexual reproduction important' the answer is GENETIC VARIATION → ADAPTATION → EVOLUTION",
        "variation is the substrate of natural selection. without it, no evolution. tie it back to the big picture",
      ]),
      seed("Drop your weirdest mitosis/meiosis confusion — we'll build a comparison table."),
      ...bubbles([
        "for me it's the chromosome count tracking. I always lose 1 point on 'how many chromosomes are in this cell'",
        "I keep forgetting that sister chromatids only separate in meiosis II (after homologs already split)",
        "synapsis vs crossing over — synapsis is the PAIRING of homologs, crossing over is the EXCHANGE. close but different",
        "bivalent / tetrad — same thing, different name. 4 chromatids paired up in prophase I",
      ], AP_BIO_HANDLES, 56),
    ],
  },
  {
    id: "hardy-weinberg",
    topic: "Hardy-Weinberg traps in MCQ",
    bubbles: [
      ...bubbles([
        "p² + 2pq + q² = 1 is fine. Knowing WHICH variable they're asking for under stress is not.",
        "I always start by finding q from the homozygous recessive %. That's my anchor.",
        "The trap is when they give you carriers (heterozygotes) and you forget that's 2pq, not q.",
        "All 5 H-W conditions get tested separately on the MCQ. Memorize them as a list, not a vibe.",
        "the 5 conditions: 1) no mutation, 2) random mating, 3) no gene flow, 4) large pop (no drift), 5) no selection. NIRMASS or whatever mnemonic",
        "my mnemonic: 'No Mutations, Random Mating, No Migration, Large Pop, No Selection.' just say it 10x",
        "if ANY of the 5 conditions is violated → population is NOT in HW equilibrium → allele frequencies change",
        "allele frequencies CHANGE in real populations because evolution happens. HW is the null hypothesis",
        "HW is literally the null hypothesis of evolution. 'if nothing is happening, what would we expect?'",
        "p = freq of dominant allele. q = freq of recessive allele. p + q = 1 (only 2 alleles in HW model)",
        "p² = freq of homozygous dominant. q² = freq of homozygous recessive. 2pq = freq of heterozygous",
        "the FASTEST way to solve: find q from q². then p = 1 - q. then plug into p² and 2pq",
        "if the problem gives u 16% recessive phenotype, that's q². q = √0.16 = 0.4. p = 0.6. plug from there",
        "p² + q² + 2pq = 1 is just (p+q)² expanded. it has to equal 1 bc p+q=1 always",
        "the formula isn't magic. it's just binomial expansion. (p+q)² = p² + 2pq + q²",
        "POV: u see a Hardy-Weinberg problem and ur eye twitches but it's actually the easiest math on the test",
        "HW math is ALWAYS doable in 30 seconds. it's free points. don't fear it",
        "the trap I always fall for: confusing 'carriers' (heterozygotes = 2pq) with 'recessive phenotype' (q²)",
        "carriers are heterozygous Aa. they DON'T show the phenotype. q² is people who SHOW the recessive phenotype",
        "if a Q says 'X% of the population is carrier of disease Y,' that's 2pq, not q²",
        "if a Q says 'X% have the disease (recessive),' that's q², not 2pq",
        "this distinction trips up like 30% of test takers. drill it",
        "another trap: dominant phenotype freq. it's p² + 2pq (homozygous dom + heterozygous)",
        "dominant phenotype = p² + 2pq = 1 - q². shortcut: just subtract q² from 1",
        "if u see 'what fraction shows dominant phenotype' → 1 - q² is the fastest",
        "FRQ HW question template: 'given X% recessive phenotype, calculate the carrier frequency.' answer: find q, find p, multiply 2pq",
        "be prepared for HW Qs about evolution OVER GENERATIONS. they'll give u allele freqs at gen 0 and gen 5, ask if HW",
        "if allele freqs CHANGE between generations → not in HW equilibrium → evolution is happening",
        "if allele freqs STAY THE SAME → population in HW equilibrium → no evolution",
        "GENE POOL = all alleles in a population. evolution = change in allele frequencies over time. memorize these 2 defs",
        "chi-square + HW combo question is the BOSS battle of unit 7. expect it on the FRQ",
        "if u see chi-square + HW, the question is testing 'do the observed genotype freqs match HW expected freqs?'",
        "expected freqs from HW formulas, observed from the data table. plug into chi-square, compare to critical value",
        "if chi-square < critical → population IS in HW equilibrium. if > critical → NOT in equilibrium",
        "NOT in equilibrium means at least one of the 5 conditions is violated. which one? the FRQ will ask u to speculate",
        "common speculation: selection (some genotype has lower fitness), or non-random mating (assortative mating)",
        "bottleneck and founder effect are special cases of genetic drift. small population = freq changes by chance",
        "bottleneck = sudden population reduction (volcano, disease). founder effect = small group migrates to new area",
        "both → small pop → genetic drift → allele freqs change due to chance, not selection",
        "drift is RANDOM. selection is NON-RANDOM (favors fitter genotypes). this distinction is huge on FRQs",
        "ANY HW FRQ ends with 'what mechanism explains this?' answer with: drift, selection, gene flow, or mutation",
        "if u see genotype freqs changing in a SMALL pop → drift. in a LARGE pop with consistent change → selection",
        "for selection: which genotype is favored? compare fitnesses. higher fitness = higher freq over generations",
        "fitness = REPRODUCTIVE SUCCESS, not 'health' or 'strength.' it's about offspring number",
        "memorize the fitness definition. it's the #1 vocab trap in evolution",
        "stabilizing selection = avg favored. directional = extreme favored. disruptive = both extremes favored, avg disfavored",
        "any selection FRQ → identify which type (stabilizing/directional/disruptive) and explain the phenotype shift",
        "stabilizing example: birth weight in humans. directional: tall giraffes outcompete short ones. disruptive: large and small bills, avg poorly fit",
        "you can ALWAYS identify selection type from a graph of phenotype distribution before/after",
        "if the bell curve narrows (sides cut off) = stabilizing. shifts left/right = directional. splits into 2 humps = disruptive",
      ]),
      seed("Comment the variable you mix up most. We'll publish a trap-pattern doc."),
      ...bubbles([
        "2pq vs q² is my eternal nemesis. carrier vs homozygous recessive",
        "p² vs (1-q²). same thing but I always pick the wrong one",
        "q vs q² — q is just the allele freq, q² is the phenotype freq. easy to drop the square accidentally",
        "the 5 conditions — I always miss the 'no gene flow' one. migration is sneaky",
      ], AP_BIO_HANDLES, 54),
    ],
  },
  {
    id: "calvin-cycle",
    topic: "Photosynthesis: Calvin cycle keeps tripping me up",
    bubbles: [
      ...bubbles([
        "Light reactions I get. Calvin cycle inputs/outputs are a mess in my brain.",
        "3 CO2 → 1 G3P. ATP and NADPH come from light reactions. That's the whole story.",
        "Where does the carbon FROM CO2 actually end up? That's the FRQ they always ask.",
        "Rubisco fixes CO2. Memorize that one enzyme — it's the gatekeeper of the whole cycle.",
        "Calvin cycle in 3 steps: CARBON FIXATION, REDUCTION, REGENERATION. learn these 3 words",
        "carbon fixation = CO2 + RuBP → 2× 3-PGA. catalyzed by Rubisco. step 1",
        "reduction = 3-PGA + ATP + NADPH → G3P. this is the energy-consuming step",
        "regeneration = G3P → RuBP (consumes more ATP). cycle resets",
        "5 G3P out of every 6 go to regenerate RuBP. only 1 G3P exits to make glucose. that's the slow part of plants",
        "1 G3P per 3 turns of the cycle. 2 G3P = 1 glucose. so 6 turns = 1 glucose. 6 CO2 required",
        "FRQ trap: how many ATP and NADPH to make 1 glucose? 18 ATP + 12 NADPH. memorize",
        "for 1 G3P: 9 ATP, 6 NADPH. double for glucose: 18 ATP, 12 NADPH",
        "Rubisco stands for Ribulose-1,5-bisphosphate carboxylase/oxygenase. most abundant protein on Earth lol",
        "RUBISCO IS THE MOST ABUNDANT PROTEIN ON EARTH. fun fact. AP loves this trivia",
        "the 'oxygenase' part of Rubisco is why PHOTORESPIRATION happens. it can grab O2 instead of CO2 → wasted energy",
        "photorespiration is a Rubisco quirk: in hot/dry conditions, stomata close → O2 builds up → Rubisco binds O2 instead",
        "C4 plants and CAM plants are ADAPTATIONS to avoid photorespiration. memorize 1 example of each",
        "C4 example: corn, sugarcane. they fix CO2 first in mesophyll cells, then ship to bundle sheath for Calvin cycle",
        "CAM example: cacti, succulents. they open stomata at NIGHT to fix CO2, store as malate, run Calvin during day",
        "C4 = spatial separation. CAM = temporal separation. memorize the difference",
        "FRQ ask: 'compare C3, C4, CAM plants in hot dry climates.' answer with stomata timing + spatial separation",
        "POV: ur in unit 3 and somehow u need to know plant biology adaptations 💀",
        "light reactions produce ATP + NADPH + O2. they CONSUME water (splits H2O for electrons). Calvin uses the ATP/NADPH",
        "photosystems II and I → ETC → ATP synthase → ATP. NADP+ → NADPH via reduction. that's the light cycle outputs",
        "light reactions are in THYLAKOID MEMBRANE. Calvin cycle is in the STROMA. inner vs outer of chloroplast",
        "thylakoid = pancake stack. stroma = the gel around the pancakes. Calvin happens in the gel",
        "FRQ trap: 'why is ATP synthase in the thylakoid membrane needed for Calvin cycle?' answer: Calvin needs ATP, which is made by ATP synthase using the H+ gradient",
        "the H+ gradient in chloroplasts is in the THYLAKOID LUMEN (inside the pancake stack)",
        "in chloroplasts, H+ is pumped INTO the thylakoid lumen. flows OUT through ATP synthase. opposite location from mitochondria but same logic",
        "wait so the inside of the thylakoid is acidic (high H+) and the stroma is basic? YES",
        "photosynthesis FRQ love asking 'what would happen if Calvin cycle is blocked?' answer: ATP/NADPH build up, but no glucose. plants die",
        "if Calvin cycle blocked: NADPH stays reduced (not used). NADP+ levels drop. electrons in ETC have nowhere to go. damage builds",
        "this is why the 2 cycles are LINKED. Calvin needs ATP/NADPH from light. light needs NADP+ from Calvin (recycled)",
        "the LINK is the key concept. light + Calvin are interdependent. write that on every photosynthesis FRQ",
        "ANY photosynthesis FRQ → mention the link between light reactions and Calvin cycle. interdependency is a free point",
        "leaves are GREEN because chlorophyll absorbs red and blue, reflects green. classic spectroscopy MCQ",
        "absorption spectra: chlorophyll a peaks at 430 and 660 nm. chlorophyll b at 450 and 640 nm. carotenoids in blue/green range",
        "u don't need exact nm. just know chlorophyll absorbs red + blue, reflects green",
        "PAPER CHROMATOGRAPHY is the AP Lab where u separate pigments by polarity. classic lab MCQ",
        "in paper chromatography: less polar pigment travels FURTHER (with the nonpolar solvent). carotenoids usually travel farthest",
        "Rf value = distance pigment traveled / distance solvent traveled. used to ID pigments",
        "memorize: carotenoids > xanthophylls > chlorophyll a > chlorophyll b (in terms of Rf, less polar to more polar)",
        "anyone else literally do this lab once and forget everything 😭",
        "lab 5 (photosynthesis) is often the lab they grill on FRQs. learn the procedure and the leaf-disk method",
        "leaf disks sink in water, then RISE as photosynthesis produces O2. classic experiment design",
        "DPIP is the artificial electron acceptor used in some photosynthesis labs. it turns from blue (oxidized) to colorless (reduced)",
        "if u see DPIP in a Q → it's a light reaction experiment. accepting electrons from photosystem I instead of NADP+",
        "color change in DPIP = rate of photosynthesis (specifically light reactions). more decoloration = faster light reactions",
        "wavelength MCQ: green light = LOWEST photosynthesis rate (reflected, not absorbed). red/blue = highest",
        "if the question asks 'what wavelength gives lowest rate of O2 production' the answer is GREEN",
      ]),
      seed("We're collecting one-line mnemonics for Calvin cycle. Reply yours."),
      ...bubbles([
        "mine: '3 CO2 in, 1 G3P out, 9 ATP + 6 NADPH spent.' that's the unit conversion",
        "FIX, REDUCE, REGENERATE. 3 verbs, 3 phases. easy mnemonic",
        "'Rubisco does the hard part, ATP/NADPH pay the bill, RuBP comes back to start.' that's my one-liner",
        "I literally just remember: 6 turns of Calvin = 1 glucose. so anything per glucose multiply by 6",
      ], AP_BIO_HANDLES, 50),
    ],
  },
  // Topics 10-25 carry their original starter bubbles + Gen-Z handle rotation.
  // Queued for full 50+ expansion in follow-up turns.
  {
    id: "water-potential",
    topic: "Water potential math",
    bubbles: [
      ...bubbles([
        "Ψ = Ψp + Ψs. Pressure is usually 0 in open containers. Solute is always negative.",
        "I keep forgetting that water moves from HIGH to LOW potential, which means TOWARDS the negative.",
        "The trap is the iR factor for nonelectrolytes vs electrolytes. NaCl → i=2. Glucose → i=1.",
        "Pure water has Ψ = 0. Any solute makes it negative. Pressure from a turgid cell makes it positive.",
      ], AP_BIO_HANDLES, 80),
      seed("Post your water potential blanker. We're making a worked-example set."),
    ],
  },
  {
    id: "membrane-transport",
    topic: "Membrane transport (passive vs active vs co)",
    bubbles: [
      ...bubbles([
        "Simple diffusion / facilitated / primary active / secondary active. Why are there so many.",
        "If it uses ATP directly = primary. If it uses a gradient made by ATP = secondary.",
        "Cotransport (symport/antiport) lives in secondary active. That's the one I forget.",
      ], AP_BIO_HANDLES, 84),
      seed("Reply with one transport type you've never been able to explain out loud."),
    ],
  },
  {
    id: "immune-system",
    topic: "Immune system: innate vs adaptive panic",
    bubbles: [
      ...bubbles([
        "Innate = fast, non-specific. Adaptive = slow first time, fast second time, specific. That's the spine.",
        "B cells make antibodies. T cells kill or help. Memory cells are why vaccines work.",
        "MHC I vs MHC II is where I lose points. I vs II. Cytotoxic T (CD8) vs Helper T (CD4).",
      ], AP_BIO_HANDLES, 87),
      seed("Comment your immune cell mix-up. We'll cross-reference into a flashcard set."),
    ],
  },
  {
    id: "selection-vs-drift",
    topic: "Natural selection vs genetic drift",
    bubbles: [
      ...bubbles([
        "Selection = non-random, fitness-based. Drift = random, allele frequency change by chance.",
        "Drift is way stronger in small populations. Bottleneck and founder are both drift events.",
        "The FRQ trap: a phenotype frequency changing isn't always selection. Could be drift.",
      ], AP_BIO_HANDLES, 90),
      seed("Drop a scenario and we'll vote drift / selection / both in the replies."),
    ],
  },
  {
    id: "phylo-trees",
    topic: "Phylogenetic trees and cladograms",
    bubbles: [
      ...bubbles([
        "I can read a cladogram. I cannot consistently identify 'most recent common ancestor' under time pressure.",
        "The shared derived characters (synapomorphies) are how you actually build the tree.",
        "Branch length doesn't always mean time. Read the axis label every single time.",
      ], AP_BIO_HANDLES, 93),
      seed("Post a tree question you got wrong recently. We'll annotate it together."),
    ],
  },
  {
    id: "pcr-gel",
    topic: "PCR + gel electrophoresis interpretation",
    bubbles: [
      ...bubbles([
        "Denature, anneal, extend. 95°, ~55°, 72°. That's the loop.",
        "Smaller fragments travel further. DNA is negative so it moves toward the positive electrode.",
        "The FRQ usually wants 'why do we use PCR' — answer: amplify a small DNA sample to detectable levels.",
      ], AP_BIO_HANDLES, 96),
      seed("Comment a band pattern you couldn't interpret. Best explanation goes into the AP Bio Survival Sheet."),
    ],
  },
  {
    id: "enzyme-kinetics",
    topic: "Enzyme kinetics graphs in FRQ",
    bubbles: [
      ...bubbles([
        "Competitive inhibitor → Vmax same, Km increases. Non-competitive → Vmax decreases, Km same.",
        "If they show a curve flattening earlier, that's substrate saturation. Adding substrate won't fix it.",
        "The trap: 'why does temperature past optimum decrease rate' — denaturation, not 'enzymes are slow'.",
      ], AP_BIO_HANDLES, 99),
      seed("Drop an enzyme graph you couldn't explain. We'll annotate the canonical answer."),
    ],
  },
  {
    id: "respiration-yields",
    topic: "Cellular respiration: yields I keep miscounting",
    bubbles: [
      ...bubbles([
        "Glycolysis: 2 ATP net, 2 NADH. Krebs: 2 ATP, 6 NADH, 2 FADH2. ETC: ~28 ATP. Total ~32.",
        "FADH2 makes ~1.5 ATP. NADH makes ~2.5 ATP. The exact totals depend on the textbook.",
        "AP Bio just wants you to know glycolysis is anaerobic, Krebs + ETC are aerobic. The exact ATP count rarely matters.",
      ], AP_BIO_HANDLES, 102),
      seed("Comment the part of respiration you can't sequence under stress. We'll build a flow card."),
    ],
  },
  {
    id: "operons",
    topic: "Operons (lac/trp) — what I keep mixing up",
    bubbles: [
      ...bubbles([
        "Lac = inducible. Off by default, turns on when lactose present. Allolactose binds the repressor.",
        "Trp = repressible. On by default, turns off when tryptophan present. Trp binds the repressor and activates it.",
        "Both are negative regulation. The corepressor (trp) vs inducer (allolactose) is the part I always flip.",
      ], AP_BIO_HANDLES, 105),
      seed("Reply with the operon detail you mix up most. We'll build a side-by-side."),
    ],
  },
  {
    id: "dihybrid-trap",
    topic: "Mendelian genetics: dihybrid trap",
    bubbles: [
      ...bubbles([
        "9:3:3:1 is the dihybrid cross ratio for two heterozygous parents, independent assortment, no linkage.",
        "Linkage breaks the ratio. If you see something close to but not exactly 9:3:3:1 — suspect linkage.",
        "Chi-square. They always make you do chi-square on a dihybrid result. Memorize the formula.",
      ], AP_BIO_HANDLES, 108),
      seed("Drop a dihybrid problem you got wrong. We'll walk it together."),
    ],
  },
  {
    id: "action-potentials",
    topic: "Action potentials and synapses",
    bubbles: [
      ...bubbles([
        "Resting → depolarize (Na+ in) → repolarize (K+ out) → hyperpolarize → reset. All-or-nothing.",
        "At the synapse: Ca2+ in → vesicles fuse → neurotransmitter into cleft → receptor on next neuron.",
        "Saltatory conduction = signal jumps node to node on myelinated axons. Faster than continuous.",
      ], AP_BIO_HANDLES, 111),
      seed("Post which step in the AP cycle you can't draw from memory. We'll build a guided sketch."),
    ],
  },
  {
    id: "xylem-phloem",
    topic: "Plant transport: xylem vs phloem",
    bubbles: [
      ...bubbles([
        "Xylem = water UP. Driven by transpiration pull, cohesion-tension.",
        "Phloem = sugar from source to sink. Bidirectional in practice. Pressure flow hypothesis.",
        "Source-to-sink trips people up. A leaf is a source in summer, but a young leaf can be a sink.",
      ], AP_BIO_HANDLES, 114),
      seed("Comment a plant-transport question you bombed. We'll annotate the canonical answer."),
    ],
  },
  {
    id: "population-growth",
    topic: "Population growth: logistic vs exponential",
    bubbles: [
      ...bubbles([
        "Exponential = J-curve, no limits. Logistic = S-curve, levels off at K (carrying capacity).",
        "dN/dt = rN for exponential. dN/dt = rN(K-N)/K for logistic. The (K-N)/K is the brake.",
        "K-selected = few offspring, lots of investment, near K. r-selected = many offspring, low investment, far below K.",
      ], AP_BIO_HANDLES, 117),
      seed("Drop the population growth detail that keeps slipping. We'll build a side-by-side."),
    ],
  },
  {
    id: "dna-replication",
    topic: "DNA replication: leading vs lagging strand",
    bubbles: [
      ...bubbles([
        "Leading = synthesized continuously toward replication fork. Lagging = Okazaki fragments, joined by ligase.",
        "DNA polymerase only adds 5' → 3'. That's the whole reason lagging strand is fragmented.",
        "Helicase unwinds. Primase makes RNA primer. DNA pol III extends. DNA pol I replaces primer. Ligase seals.",
      ], AP_BIO_HANDLES, 120),
      seed("Reply with the replication step you can never remember. We'll build a mnemonic chain."),
    ],
  },
  {
    id: "speciation-modes",
    topic: "Speciation: allopatric / sympatric / hybrid zones",
    bubbles: [
      ...bubbles([
        "Allopatric = geographic isolation. Sympatric = same area, different niches or polyploidy in plants.",
        "Reinforcement = hybrids are less fit, so prezygotic barriers strengthen over time.",
        "Polyploidy is huge in plant speciation and it's instant. They love putting that on the FRQ.",
      ], AP_BIO_HANDLES, 123),
      seed("Drop the speciation mode that trips you up. We'll annotate a comparison."),
    ],
  },
  {
    id: "score-predictor",
    topic: "Score predictor: which curve do you trust?",
    bubbles: [
      ...bubbles([
        "Released exams tend to underpredict. The real exam curve is usually slightly more generous.",
        "70%+ on a released exam = solid 5 territory in most years.",
        "The harder the FRQs felt for everyone, the more generous the scoring. Don't trust your own panic.",
      ], AP_BIO_HANDLES, 126),
      seed("Post your last practice exam % and we'll tag it against the most recent published curve."),
    ],
  },
];

// ─── SAT ───────────────────────────────────────────────────────────────────
// Existing 25-topic seed prompts, handles migrated to Reddit/Gen-Z style.
// Bubble-count expansion to 50+ per topic comes in a follow-up turn.
const SAT: SeedTopic[] = [
  {
    id: "reading-time-crunch",
    topic: "Reading section: out of time on the last passage",
    bubbles: [
      ...bubbles([
        "I always have 4 questions left and 90 seconds. Every single time.",
        "I started doing the hardest passage last. Hot take: it works.",
        "Digital SAT has shorter passages now but more of them. Different timing pressure entirely.",
        "Skim the question stems first. Read the passage knowing what you're hunting for.",
      ], SAT_HANDLES, 0),
      seed("Reply with your reading-section pacing strategy. Best one goes into the SAT Trap Database."),
    ],
  },
  {
    id: "evidence-pair",
    topic: "Evidence pair questions (Q + 'which line supports Q')",
    bubbles: [
      ...bubbles([
        "If I'm not sure on the first question, I do the evidence one FIRST and work backwards.",
        "Both answers have to agree. If your evidence pick doesn't directly support your Q answer, one is wrong.",
        "The trap is 'sounds related but doesn't directly say it.' Direct support only.",
      ], SAT_HANDLES, 4),
      seed("Drop an evidence-pair question you got wrong. We'll annotate the trap structure."),
    ],
  },
  {
    id: "main-idea-trap",
    topic: "Main idea vs detail: the classic trap",
    bubbles: [
      ...bubbles([
        "Main idea answers are usually broader than you think. Specific = trap, usually.",
        "A correct answer that's 'too narrow' is wrong. A correct answer that's 'too broad' is also wrong. The Goldilocks zone is real.",
        "If the answer only describes paragraph 3, it's not the main idea.",
      ], SAT_HANDLES, 7),
      seed("Comment your last main-idea miss. We'll find the pattern."),
    ],
  },
  {
    id: "vocab-in-context",
    topic: "Vocab-in-context: the 'wrong dictionary definition' trap",
    bubbles: [
      ...bubbles([
        "Plug each answer choice into the sentence. Read the sentence with the word. Whichever sounds natural is usually right.",
        "The most common dictionary meaning is almost always the trap answer. They want context-specific.",
        "Synonyms aren't always answers. Often the right word is a softer or harder shade than you'd expect.",
      ], SAT_HANDLES, 10),
      seed("Post a vocab question where the 'common meaning' fooled you. We'll log it as a trap."),
    ],
  },
  {
    id: "grammar-commas",
    topic: "Writing: comma rules that keep killing me",
    bubbles: [
      ...bubbles([
        "Independent + comma + independent = NEVER. That's a comma splice. Semicolon or period.",
        "Non-essential clauses get commas on BOTH sides. If you can delete it and the sentence works, comma it off.",
        "Lists with 3+ items use Oxford comma on the SAT. They want you to. Trust it.",
        "'No comma' is a real answer choice. Sometimes the answer is just to delete the comma.",
      ], SAT_HANDLES, 13),
      seed("Comment the comma rule you mess up most. We'll build a comma trap deck."),
    ],
  },
  {
    id: "subject-verb",
    topic: "Subject-verb agreement traps",
    bubbles: [
      ...bubbles([
        "Find the actual subject. Ignore the prepositional phrase in the middle. That's the entire game.",
        "Collective nouns (team, group, committee) are singular in SAT-land. 'The team is,' not 'the team are.'",
        "Either/or, neither/nor: verb agrees with the closer subject. They love this.",
      ], SAT_HANDLES, 17),
      seed("Drop a sentence where you blanked on the verb form. We'll tag the pattern."),
    ],
  },
  {
    id: "pronoun-ambiguity",
    topic: "Pronoun ambiguity (the silent killer)",
    bubbles: [
      ...bubbles([
        "If a pronoun could refer to two nouns, the SAT considers it ambiguous. Even if context makes it 'obvious.'",
        "'It,' 'they,' 'this' — these get flagged constantly when there's any ambiguity.",
        "Replace the pronoun with the noun you think it refers to. If the sentence sounds weird, the answer is the noun, not the pronoun.",
      ], SAT_HANDLES, 20),
      seed("Reply with a pronoun question you missed. We'll build an ambiguity test."),
    ],
  },
  {
    id: "math-no-calc",
    topic: "Math no-calculator: how do you actually go faster?",
    bubbles: [
      ...bubbles([
        "Estimation. The no-calc section rewards 'good enough to eliminate 3 answers' more than exact arithmetic.",
        "Plug in answer choices when algebra gets ugly. Start with C (middle value). Adjust up or down.",
        "For grid-ins with no answer choices, plug in YOUR OWN simple numbers (like x=2) and see what works.",
      ], SAT_HANDLES, 23),
      seed("Comment your favorite no-calc shortcut. We're publishing a speed-up deck."),
    ],
  },
  {
    id: "linear-equations",
    topic: "Linear equations: the slope-intercept trap",
    bubbles: [
      ...bubbles([
        "y = mx + b. m = slope = rise/run. b = y-intercept. That's the whole foundation.",
        "Parallel lines = same slope. Perpendicular lines = negative reciprocal slope. They test this constantly.",
        "If they give you two points, slope = (y2-y1)/(x2-x1). Then plug a point in for b.",
      ], SAT_HANDLES, 26),
      seed("Drop a linear equation question that took you too long. We'll find the shortcut."),
    ],
  },
  {
    id: "systems-of-equations",
    topic: "Systems of equations: substitution vs elimination",
    bubbles: [
      ...bubbles([
        "If one variable is already isolated, substitution. If not, elimination is usually faster.",
        "No solution → same slope, different y-intercept (parallel). Infinite solutions → same line.",
        "Multiply one equation to make coefficients match, then add/subtract. Elimination is just lining up the variables.",
      ], SAT_HANDLES, 29),
      seed("Post a system you got stuck on. We'll show both methods side-by-side."),
    ],
  },
  {
    id: "quadratics",
    topic: "Quadratics: factoring vs formula vs completing the square",
    bubbles: [
      ...bubbles([
        "Try factoring first. If the numbers are ugly, quadratic formula. Completing the square is only for vertex form questions.",
        "Vertex form: y = a(x-h)² + k. (h, k) is the vertex. They love asking for the vertex.",
        "Discriminant (b² - 4ac): positive = 2 real solutions, zero = 1, negative = 0 real solutions. Memorize this.",
        "Sum of roots = -b/a. Product of roots = c/a. Saves time on 'find k if the roots are equal' questions.",
      ], SAT_HANDLES, 32),
      seed("Drop a quadratic you couldn't crack. We'll work it three ways."),
    ],
  },
  {
    id: "word-problems",
    topic: "Word problems: translation breakdown",
    bubbles: [
      ...bubbles([
        "'Is' = equals. 'Of' = multiply. 'Per' = divide. 'More than/less than' = the variable goes first, watch the direction.",
        "Define your variables FIRST. Write what each letter means in plain English. Then translate sentence-by-sentence.",
        "If the problem feels too long, it usually means you can plug in numbers to check your translation.",
      ], SAT_HANDLES, 36),
      seed("Comment the kind of word problem you blank on. We'll build a translation cheat sheet."),
    ],
  },
  {
    id: "ratios-proportions",
    topic: "Ratios and proportions: when to set up a fraction",
    bubbles: [
      ...bubbles([
        "If parts of a whole are mentioned, set up parts/whole. If it's two quantities compared, set up a/b ratio.",
        "Scale factor. If the ratio is 2:3 and the total is 25, you have 5 parts → each part is 5 → 10 and 15.",
        "Proportions: cross-multiply. a/b = c/d means ad = bc. They love hiding this in geometry.",
      ], SAT_HANDLES, 39),
      seed("Reply with a ratio question that took too long. We'll find the shortest setup."),
    ],
  },
  {
    id: "percentages",
    topic: "Percentages: the 'percent of percent' trap",
    bubbles: [
      ...bubbles([
        "Percent increase: (new - old) / old × 100. The denominator is the ORIGINAL value, not the new one.",
        "If something increases by 20% then decreases by 20%, it's NOT back to original. (×1.2 × 0.8 = ×0.96)",
        "'p percent of x' = (p/100) × x. Always. Even when the problem makes it sound complicated.",
      ], SAT_HANDLES, 42),
      seed("Drop a percent question that wrecked you. We'll log it as a trap pattern."),
    ],
  },
  {
    id: "geometry-circles",
    topic: "Geometry: circles (arc length, sector area)",
    bubbles: [
      ...bubbles([
        "Arc length = (central angle / 360) × 2πr. Sector area = (central angle / 360) × πr². Same fraction, different formula.",
        "Inscribed angle = half the central angle that intercepts the same arc. They test this every test.",
        "Equation of a circle: (x-h)² + (y-k)² = r². If you see this form, identify center (h,k) and radius r.",
      ], SAT_HANDLES, 45),
      seed("Comment a circle question you misread. We'll annotate the diagram."),
    ],
  },
  {
    id: "right-triangles",
    topic: "Right triangles: when to use SOHCAHTOA vs special triangles",
    bubbles: [
      ...bubbles([
        "Memorize 30-60-90 (1, √3, 2) and 45-45-90 (1, 1, √2). They appear constantly.",
        "3-4-5, 5-12-13, 8-15-17. Pythagorean triples are everywhere on the SAT.",
        "SOHCAHTOA when you have an angle AND a side. Pythagorean when you have two sides and need the third.",
      ], SAT_HANDLES, 48),
      seed("Drop a triangle question that stalled you. We'll show three solving paths."),
    ],
  },
  {
    id: "data-charts",
    topic: "Data analysis: reading charts under time pressure",
    bubbles: [
      ...bubbles([
        "Read the axis labels FIRST. Most data-question errors come from misreading what's plotted.",
        "Scatter plots: line of best fit shows the trend. Outliers don't change the trend much unless they're extreme.",
        "Two-way tables: 'given that' = conditional probability. The denominator changes.",
      ], SAT_HANDLES, 51),
      seed("Reply with a chart question you bombed. We'll annotate the read-order."),
    ],
  },
  {
    id: "stats-mean-median",
    topic: "Stats: mean vs median vs mode (and which moves with outliers)",
    bubbles: [
      ...bubbles([
        "Mean is sensitive to outliers. Median is not. If they add a huge value, the mean shifts hard, the median barely moves.",
        "Standard deviation measures spread. Mean + SD describes the center and the spread together.",
        "Skewed right (tail on right) → mean > median. Skewed left → mean < median. Symmetric → mean = median.",
      ], SAT_HANDLES, 54),
      seed("Comment the stat concept that confuses you. We'll build a one-pager."),
    ],
  },
  {
    id: "exponents-rules",
    topic: "Exponent rules: the ones I always mix up",
    bubbles: [
      ...bubbles([
        "x^a × x^b = x^(a+b). x^a / x^b = x^(a-b). (x^a)^b = x^(ab). Three rules, infinite test questions.",
        "Negative exponent → reciprocal. x^(-2) = 1/x². Fractional exponent → root. x^(1/2) = √x.",
        "x^0 = 1 for any nonzero x. They test this with weird-looking expressions.",
      ], SAT_HANDLES, 57),
      seed("Drop an exponent question that fooled you. We'll list the rule it tested."),
    ],
  },
  {
    id: "functions",
    topic: "Functions: f(g(x)) and inverse functions",
    bubbles: [
      ...bubbles([
        "f(g(x)): work from inside out. Plug g(x) into f wherever you see x.",
        "To find f⁻¹(x): swap x and y, solve for y. That's the algorithm.",
        "f(f⁻¹(x)) = x. Composition of a function with its inverse is the identity. They test this concept.",
      ], SAT_HANDLES, 60),
      seed("Comment a function question you reasoned through wrong. We'll annotate it."),
    ],
  },
  {
    id: "essay-section",
    topic: "Essay scoring (for the SAT versions that still have it)",
    bubbles: [
      ...bubbles([
        "Most US schools dropped the essay. Check your specific test version before grinding this.",
        "If you still need it: analyze HOW the author builds the argument, not whether you agree with it.",
        "Digital SAT has no essay. The legacy paper SAT essay is essentially gone.",
      ], SAT_HANDLES, 63),
      seed("Reply if you still need essay strategy. We'll only build the doc if there's real demand."),
    ],
  },
  {
    id: "digital-sat-shift",
    topic: "Digital SAT: what actually changed?",
    bubbles: [
      ...bubbles([
        "Shorter, adaptive, no calculator-banned section (Desmos built in). Test is ~2 hours instead of 3.",
        "Modules adapt. If you do well on Module 1, Module 2 is harder. Your score range depends on which module 2 you get.",
        "Reading passages are SHORTER but you get more of them. Different stamina demand entirely.",
      ], SAT_HANDLES, 66),
      seed("Comment what surprised you most about the digital format. We'll log the differences."),
    ],
  },
  {
    id: "score-plateau",
    topic: "Score plateau: I keep getting the same score",
    bubbles: [
      ...bubbles([
        "Bharath 1380 → 1380 → 1380 for 3 practice tests. Why.",
        "When plateau happens, switch from doing more tests to drilling the specific question types you miss. The score moves.",
        "Going from 1400 to 1500 is different from 1300 to 1400. The ceiling questions reward precision, not effort.",
      ], SAT_HANDLES, 69),
      seed("Drop your current score and your biggest miss-pattern. We'll match you with someone who broke through that same plateau."),
    ],
  },
  {
    id: "study-rotation",
    topic: "Study rotation: how do you split between reading / writing / math?",
    bubbles: [
      ...bubbles([
        "I do one of each per day. Never grind one section for more than 90 minutes. Boredom = bad retention.",
        "Reading needs daily practice — it's the hardest to improve fast. Math you can sprint.",
        "Drill weakest sections in the morning when you're fresh. Strong sections in the evening for confidence.",
      ], SAT_HANDLES, 72),
      seed("Comment your weekly split. We'll cross-reference what's working for hitters in this thread."),
    ],
  },
  {
    id: "test-day-plan",
    topic: "Test day: rituals that actually help",
    bubbles: [
      ...bubbles([
        "Sleep matters more than one more practice test the night before. Stop grinding by 8pm.",
        "For digital: charge your laptop, bring the charger anyway, install Bluebook a week before, not day-of.",
        "Eat something with protein, not just sugar. Your brain needs to last 3+ hours under stress.",
      ], SAT_HANDLES, 75),
      seed("Reply with one ritual that worked on your best test day. We'll publish the cohort list."),
    ],
  },
];

export const SEED_DISCUSSIONS: Record<string, SeedTopic[]> = {
  "ap-bio": AP_BIO,
  "sat": SAT,
};

export function getSeedTopics(slug: string): SeedTopic[] {
  return SEED_DISCUSSIONS[slug] ?? [];
}

// Flat preview bubbles for the lounges directory card. Returns a varied
// slice of the seed topics so the "LIVE · IN CHAT NOW" panel on the
// lounge listing feels populated even when real chat is sparse. Real
// messages from the chat API are appended AFTER these so they win the
// "most recent" tail of the list.
export interface SeedPreviewBubble {
  id: string;
  handle: string;
  isMentor: false;
  isSeed: true;
  isSeedBot: boolean;
  content: string;
  type: "text";
  createdAt: string;
}

export function getSeedPreviewBubbles(slug: string, count = 5): SeedPreviewBubble[] {
  const topics = SEED_DISCUSSIONS[slug] ?? [];
  if (topics.length === 0) return [];
  const out: SeedPreviewBubble[] = [];
  const now = Date.now();
  outer: for (const t of topics) {
    for (const b of t.bubbles) {
      if (out.length >= count) break outer;
      out.push({
        id: `seed-${slug}-${t.id}-${out.length}`,
        handle: b.handle,
        isMentor: false,
        isSeed: true,
        isSeedBot: !!b.isSeedBot,
        content: b.content,
        type: "text",
        createdAt: new Date(now - (count - out.length) * 60_000).toISOString(),
      });
    }
  }
  return out;
}

export { bubbles, seed, AP_BIO_HANDLES, SAT_HANDLES };
