// Ambient seed history for the lounge live-chat feed. Display-only —
// these messages are synthesized client-side into ChatMessagePublic shape
// and interleaved with real DB messages at render time. They are never
// POSTed to /api/lounges/[slug]/chat/messages and never inserted into the
// chat_messages table. When we eventually retire seed activity, deleting
// this file is the entire cleanup.
//
// SAFETY RAILS (mirroring the two-doc strategy):
//   1. NO seeded mentor messages giving specific, relied-upon technical
//      advice. Mentor seed messages stay generic ("good question, I'll
//      write something up", "we covered this in the field manual",
//      "happy to walk through this fri").
//   2. NO seeded "I got into X" / college-acceptance claims.
//   3. NO seeded testimonials about InHero.
//   4. DO seed: ambient chatter, reactions, generic questions,
//      studying-late energy, vibes.

import type { ChatMessagePublic } from "@/lib/chat";
import { findSeedAuthor } from "./loungeRoster";

export interface LoungeSeedMessage {
  handle: string;
  content: string;
  /** Minutes before "now" this message was posted. Drives the synthetic
   *  createdAt and the relative timestamp ("just now" / "2m" / "14h"). */
  minutesAgo: number;
  /** Optional attachment chip rendered in the message bubble. */
  attachment?: { fileName: string; type: "image" | "file" };
  /** Optional index into the same array — makes this message a reply. */
  replyToIdx?: number;
  /** Optional pre-seeded reaction counts shown on the message. */
  reactions?: Array<{ emoji: string; count: number }>;
}

// ─── AP BIOLOGY HISTORY (60 messages, spread across ~24h) ──────────────────
// Distribution (per spec):
//   - 15 messages in the last 1 hour (1–59 min ago)        → indices 0–14
//   - 20 messages 1–6 hours ago (60–359 min)               → indices 15–34
//   - 15 messages 6–12 hours ago (360–719 min)             → indices 35–49
//   - 10 messages 12–24 hours ago (720–1439 min)           → indices 50–59
// Listed oldest-first so replyToIdx can only ever reference an earlier line.
export const AP_BIO_SEED_MESSAGES: LoungeSeedMessage[] = [
  // ── 12–24h ago (10 messages) ─────────────────────────────────────────
  { handle: "u/cohort_member_27",       content: "first week of cram. brain unboxing",                         minutesAgo: 1380 },                                              // 0
  { handle: "u/bro_just_cooked",        content: "AP bio is making me cooked. like literally",                 minutesAgo: 1270 },                                              // 1
  { handle: "u/HopkinsBound27",         content: "ok finishing up. good luck everyone 🫡",                      minutesAgo: 1180, reactions: [{ emoji: "❤️", count: 6 }, { emoji: "🙏", count: 3 }] }, // 2
  { handle: "u/photosynthesis_fan",     content: "this is fire thanks",                                        minutesAgo: 1100 },                                              // 3
  { handle: "u/sigma_FRQ_grindset",     content: "just uploaded it to Problem Sets",                           minutesAgo: 1050, attachment: { fileName: "unit6_frq_template.pdf", type: "file" } }, // 4
  { handle: "u/sigma_FRQ_grindset",     content: "anyone got the unit 6 FRQ template",                         minutesAgo: 1000 },                                              // 5
  { handle: "u/jhu_bme_26",             content: "happy to walk through this in office hours fri",             minutesAgo: 940, reactions: [{ emoji: "🙏", count: 8 }] },        // 6
  { handle: "u/it_be_like_that",        content: "we cohort suffering tonight",                                minutesAgo: 880, reactions: [{ emoji: "💀", count: 14 }, { emoji: "🤝", count: 4 }] }, // 7
  { handle: "u/CornellBio27",           content: "ok finally finished my FRQ pacing notes. dropping in the survival sheets folder later", minutesAgo: 820, reactions: [{ emoji: "🔥", count: 11 }, { emoji: "👀", count: 5 }] }, // 8
  { handle: "u/bro_just_cooked",        content: "8 weeks left. why am I still in unit 3",                     minutesAgo: 760 },                                               // 9

  // ── 6–12h ago (15 messages) ──────────────────────────────────────────
  { handle: "u/FuturePremed28",         content: "the AP bio reddit said unit 8 might not be on this year. capping or no", minutesAgo: 715 },                                   // 10
  { handle: "u/no_cap_studying",        content: "wait what unit is signal transduction in again",             minutesAgo: 700 },                                               // 11
  { handle: "u/sleep_who",              content: "ok I'm finally getting Hardy-Weinberg",                      minutesAgo: 690, reactions: [{ emoji: "🎉", count: 7 }] },        // 12
  { handle: "u/ap_zombie_mode",         content: "it's 2am why am I awake studying",                           minutesAgo: 680, reactions: [{ emoji: "💀", count: 18 }, { emoji: "😭", count: 6 }] }, // 13
  { handle: "u/punnett_squared",        content: "9:3:3:1 ratio in my dreams at this point",                   minutesAgo: 660 },                                               // 14
  { handle: "u/operon_obsessed",        content: "if u see one more chi-square problem you'll lose it",        minutesAgo: 640 },                                               // 15
  { handle: "u/KrebsCycleEnjoyer",      content: "real ones know what 'oxidative phosphorylation' does to the soul", minutesAgo: 615 },                                         // 16
  { handle: "u/2027_grad",              content: "doing junior year AP bio + APUSH + APLang. send help",       minutesAgo: 590, reactions: [{ emoji: "😭", count: 9 }] },        // 17
  { handle: "u/yale_mcb_27",            content: "↑ this is the right framework. add it to your survival sheet", minutesAgo: 565 },                                             // 18
  { handle: "u/cooked_at_FRQ",          content: "praying to the curve gods rn",                               minutesAgo: 540 },                                               // 19
  { handle: "u/fr_fr_premed",           content: "the curve will save us 🙏",                                   minutesAgo: 510 },                                               // 20
  { handle: "u/PCRwizard",              content: "my whiteboard sketch of the lac operon. messy but it clicks", minutesAgo: 480, attachment: { fileName: "lac_operon_sketch.jpg", type: "image" }, reactions: [{ emoji: "🔥", count: 13 }, { emoji: "👏", count: 6 }] }, // 21
  { handle: "u/lowkey_failing_apbio",   content: "if I get a 4 I will literally cry tears of joy",             minutesAgo: 440, reactions: [{ emoji: "💀", count: 7 }, { emoji: "🤝", count: 4 }] }, // 22
  { handle: "u/deadass_blanked",        content: "AP bio is making me question everything",                    minutesAgo: 410 },                                               // 23
  { handle: "u/study_blursed",          content: "literally finals week + AP week is illegal",                 minutesAgo: 380, reactions: [{ emoji: "💀", count: 22 }] },       // 24

  // ── 1–6h ago (20 messages) ───────────────────────────────────────────
  { handle: "u/im_so_done_w_this",      content: "anyone else feel like collegeboard hates us specifically",   minutesAgo: 320 },                                               // 25
  { handle: "u/ap_zombie_mode",         content: "third coffee. brain still mush",                             minutesAgo: 280 },                                               // 26
  { handle: "u/MitochondriaIsThe",      content: "for the FRQ pacing thread",                                  minutesAgo: 260, attachment: { fileName: "frq_2023_rubric.pdf", type: "file" } }, // 27
  { handle: "u/ETC_truther",            content: "saved this from a yt vid earlier",                           minutesAgo: 240, attachment: { fileName: "cell_respiration_diagram.png", type: "image" }, reactions: [{ emoji: "🔥", count: 9 }] }, // 28
  { handle: "u/cornellian",             content: "good question — I'll write something up in the field manuals tonight", minutesAgo: 215, reactions: [{ emoji: "🙏", count: 17 }, { emoji: "❤️", count: 8 }] }, // 29
  { handle: "u/HarvardHopeful28",       content: "I literally cannot do water potential math help",            minutesAgo: 200 },                                               // 30
  { handle: "u/UPennPM28",              content: "anyone using the Bozeman Bio videos. worth it?",             minutesAgo: 178 },                                               // 31
  { handle: "u/penn_neuro_26",          content: "bozeman is the move. his unit 3 videos especially",          minutesAgo: 170, replyToIdx: 31, reactions: [{ emoji: "👍", count: 12 }] }, // 32
  { handle: "u/calvin_cycle_kid",       content: "is signal transduction on unit 4 or 5",                      minutesAgo: 152 },                                               // 33
  { handle: "u/RiceBME28",              content: "do we actually need to know all the amino acids",            minutesAgo: 145 },                                               // 34
  { handle: "u/operon_obsessed",        content: "lac vs trp operon. someone fight me on which is harder",     minutesAgo: 130 },                                               // 35
  { handle: "u/jhu_bme_26",             content: "they're both inducible/repressible flavors of negative regulation. lac is more common on FRQ", minutesAgo: 125, replyToIdx: 35 }, // 36
  { handle: "u/DukeBio27",              content: "is unit 4 hard or is it just me",                            minutesAgo: 110 },                                               // 37
  { handle: "u/StanfordHopeful",        content: "@cornellian do you have notes on signal transduction",       minutesAgo: 92 },                                                // 38
  { handle: "u/cornellian",             content: "yeah lemme dm you",                                          minutesAgo: 90, replyToIdx: 38 },                                // 39
  { handle: "u/photosynthesis_fan",     content: "chemiosmosis my beloved",                                    minutesAgo: 84, reactions: [{ emoji: "❤️", count: 11 }] },         // 40
  { handle: "u/IvyOrBust",              content: "can someone explain why ATP synthase rotates",               minutesAgo: 82 },                                                // 41
  { handle: "u/MitochondriaIsThe",      content: "my teacher said unit 6 is the trap unit fr",                 minutesAgo: 77 },                                                // 42
  { handle: "u/it_be_like_that",        content: "💀💀",                                                       minutesAgo: 75, replyToIdx: 42 },                                // 43
  { handle: "u/no_cap_studying",        content: "wait is the AP exam curve actually generous this year",      minutesAgo: 70 },                                                // 44

  // ── Last 1 hour (15 messages) ────────────────────────────────────────
  { handle: "u/CornellBio27",           content: "anyone got the cellular respiration cheatsheet",             minutesAgo: 56 },                                                // 45
  { handle: "u/punnett_squared",        content: "what's the move for Hardy-Weinberg practice problems",       minutesAgo: 50 },                                                // 46
  { handle: "u/yale_mcb_27",            content: "we covered this in last week's mechanism map. let me find the link", minutesAgo: 45, replyToIdx: 46, reactions: [{ emoji: "🙏", count: 5 }] }, // 47
  { handle: "u/PCRwizard",              content: "how do I memorize the Krebs cycle without crying",           minutesAgo: 40 },                                                // 48
  { handle: "u/cooked_at_FRQ",          content: "y'all know what units they're focusing on this year?",       minutesAgo: 33 },                                                // 49
  { handle: "u/photosynthesis_fan",     content: "if u missed it the Calvin cycle question on the 2024 FRQ was rough", minutesAgo: 28 },                                        // 50
  { handle: "u/HopkinsBound27",         content: "is anyone else doing the practice FRQ in Princeton review rn", minutesAgo: 24 },                                              // 51
  { handle: "u/MITorDie",               content: "the one about Drosophila eye color??",                       minutesAgo: 22, replyToIdx: 51 },                                // 52
  { handle: "u/HopkinsBound27",         content: "YES omg I'm stuck on part C",                                minutesAgo: 20, replyToIdx: 52 },                                // 53
  { handle: "u/MITorDie",               content: "wait actually that helps. thanks",                           minutesAgo: 15, reactions: [{ emoji: "❤️", count: 2 }] },         // 54
  { handle: "u/it_be_like_that",        content: "💀",                                                          minutesAgo: 12 },                                                // 55
  { handle: "u/CornellBio27",           content: "krebs cycle FRQ tomorrow, anyone wanna run through it",      minutesAgo: 7, reactions: [{ emoji: "🙋", count: 4 }] },          // 56
  { handle: "u/StanfordHopeful",        content: "I'm down, dm me",                                            minutesAgo: 4, replyToIdx: 56 },                                 // 57
  { handle: "u/cornellian",             content: "I can hop on too — dm me when",                              minutesAgo: 2, replyToIdx: 56, reactions: [{ emoji: "🙏", count: 3 }] }, // 58
  { handle: "u/no_cap_studying",        content: "y'all are insane studying this late",                        minutesAgo: 1 },                                                 // 59
];

// ─── DEFAULT HISTORY (every other lounge) ──────────────────────────────────
// Generic ambient lines so no lounge looks dead. ~14 messages spread across
// 24h. Lounge-specific histories can be authored later.
export const DEFAULT_SEED_MESSAGES: LoungeSeedMessage[] = [
  { handle: "u/cohort_member_27",         content: "anyone got the recap from last week's drop",       minutesAgo: 1320 },
  { handle: "u/no_thoughts_just_studying",content: "no thoughts. just studying.",                      minutesAgo: 1100 },
  { handle: "u/late_night_grind",         content: "third hour. brain melting",                        minutesAgo: 920 },
  { handle: "u/just_passing_thru",        content: "this lounge is comfy ngl",                         minutesAgo: 680 },
  { handle: "u/big_sibling_mentor",       content: "if it's not in the field manuals, ping me",        minutesAgo: 540, reactions: [{ emoji: "🙏", count: 4 }] },
  { handle: "u/upperclassman_2025",       content: "happy to answer Qs — I went through this two years ago", minutesAgo: 410 },
  { handle: "u/throwaway_homework",       content: "what's everyone working on rn",                    minutesAgo: 280 },
  { handle: "u/finals_szn_doomed",        content: "💀",                                                minutesAgo: 240 },
  { handle: "u/lurker_acc",               content: "fr",                                                minutesAgo: 220 },
  { handle: "u/student_acc99",            content: "finals szn is upon us",                            minutesAgo: 110 },
  { handle: "u/studying_late",            content: "anyone else here grinding tonight",                minutesAgo: 35 },
  { handle: "u/im_just_vibing",           content: "just dropping in to see who's around",             minutesAgo: 14 },
];

const SEED_MESSAGES_BY_SLUG: Record<string, LoungeSeedMessage[]> = {
  "ap-bio": AP_BIO_SEED_MESSAGES,
};

export function getSeedMessages(slug: string): LoungeSeedMessage[] {
  return SEED_MESSAGES_BY_SLUG[slug] ?? DEFAULT_SEED_MESSAGES;
}

// ─── Builder: seed entries → synthetic ChatMessagePublic[] ─────────────────
// Resolves mentor metadata via the roster, snaps minutesAgo to a real
// createdAt timestamp anchored to "now" at build time, and wires reply
// references using the snippet of the target message.
export function buildSeededMessages(slug: string, nowMs: number = Date.now()): ChatMessagePublic[] {
  const seeds = getSeedMessages(slug);

  return seeds.map((s, idx) => {
    const author = findSeedAuthor(s.handle);
    const isMentor = author?.style === "mentor";
    const mentor = isMentor && author?.mentorBadge
      ? {
          // We intentionally do NOT populate a fake mentor_profiles row.
          // The badge text is purely seed display metadata.
          university: "",
          universityRole: author.mentorBadge,
          specialties: [],
          introBlurb: "",
          avatarUrl: null,
        }
      : null;

    const replyTarget = s.replyToIdx !== undefined ? seeds[s.replyToIdx] : null;
    const replyTo = replyTarget
      ? {
          id: `seed-${slug}-${s.replyToIdx}`,
          handle: replyTarget.handle,
          snippet: replyTarget.content.length > 90 ? replyTarget.content.slice(0, 90) + "…" : replyTarget.content,
        }
      : null;

    const hasAttachment = !!s.attachment;
    const isImage = s.attachment?.type === "image";

    return {
      id: `seed-${slug}-${idx}`,
      type: hasAttachment ? (isImage ? "image" : "file") : "text",
      content: s.content,
      createdAt: new Date(nowMs - s.minutesAgo * 60_000).toISOString(),
      isPinned: false,
      isMine: false,
      author: {
        handle: s.handle,
        graduationYear: null,
        badges: [],
        mentor,
      },
      replyTo,
      attachment: hasAttachment
        ? {
            // Seeded attachments don't link to real storage — clicking
            // the chip in MessageRow falls back to opening url:"#" which
            // is a noop. resourceId stays null so MessageRow uses the
            // legacy <a> path rather than routing to /library/.../read.
            url: "#",
            meta: { fileName: s.attachment!.fileName, mimeType: isImage ? "image/png" : "application/pdf" },
            resourceId: null,
          }
        : null,
      links: [],
      reactions: (s.reactions ?? []).map((r) => ({ emoji: r.emoji, count: r.count, mine: false })),
    };
  });
}

// Quick check used by the page to know if a message is from the seed layer.
export function isSeededMessageId(id: string): boolean {
  return typeof id === "string" && id.startsWith("seed-");
}
