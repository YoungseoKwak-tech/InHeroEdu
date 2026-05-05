# InHero — Living Memory Engine

**Built solo in 3 weeks using Claude Code as the primary development agent.**

---

## What this system does

Every student who studies on InHero accumulates a **Living Portrait** — a compressed
psychographic fingerprint built from learning behavior, not content. After each session,
Claude reads a summary and extracts signals: what triggers this student's curiosity, which
of four processing archetypes they are (CF/CS/CA/CE), whether a growth moment or college
essay seed just occurred. That portrait is silently injected into every subsequent AI call,
so the Socratic tutor, the reverse tutor, and the companion all adapt — without the student
ever being asked a single preference question.

---

## Why it's the heart of InHero's thesis

InHero's claim is that a single AI-native platform can deliver the personalization of a
private Ivy tutor at scale. The memory engine is what makes that claim non-trivial. Every
tutoring platform can prompt Claude to "be helpful." InHero's edge is that Claude knows
this student already: `CF-4 / visual_sequential / spark trigger: pattern_disruption /
intensity 0.87`. The compression layer turns 23+ hours of study behavior into a 5-line
system prompt prefix that changes what every AI response looks like — the questions it
asks, the analogies it reaches for, the moment it decides to push harder versus back off.
Without this engine, InHero is another AI tutor. With it, InHero is a tutor that gets
smarter about each student over time.

---

## Architecture

```
Student answers overlay (QUESTION_SPRINT / TEACH_BACK / GAP_CRUNCH)
        │
        ▼
/api/overlay/evaluate  ──►  pattern-detector.ts
        │                     - REPEAT_ERROR: same gap_type 3x in a row
        │                     - SPEED_SKIP: Teach Back < 10s
        │                     - CROSS_SUBJECT_GAP: same gap in 2+ subjects
        │                     └─► student_patterns table (upsert, never duplicate)
        │
        ▼ (after session ends)
/api/memory/compress
        │
        ▼
 Claude Sonnet (memoryCompression)
        │   Input:  subject + duration + rawSummary (plain text)
        │   Output: sparkSignal, patternDelta, moments[] — JSON only, no conversation stored
        │
        ├──► spark_bank      (trigger_type, intensity EMA: prev×0.8 + new×0.2)
        ├──► pattern_bank    (hero_code_core CF|CS|CA|CE, state 1-9, total_hours)
        ├──► moment_bank     (essay_seed | growth | spark_fired, max 60 chars each)
        └──► evolution_log   (if Hero Code changed: prev→new + deltaNote)

On every AI call (Socratic / Companion / Reverse Tutor):
        │
        ▼
getLivingPortrait(userId)   ← parallel reads: spark_bank + pattern_bank + moment_bank
        │
        ▼
buildSystemPrompt(portrait) → injected as prefix to EVERY Claude system prompt
        │
        └─► "[Student DNA — InHero Living Portrait]
             Hero Code: CF-4 (provisional, 23.5h)
             Spark trigger: pattern_disruption | intensity: 0.87
             Processing style: visual_sequential
             Essay seeds detected:
             - 처음으로 공식 스스로 유도함"
```

---

## Core engine code

### `lib/memory/compress-session.ts` — the compression loop

Called after every study session. Claude reads a plain-text summary and returns structured
signals. The original conversation is never stored.

```typescript
export async function compressSession(digest: SessionDigest): Promise<void> {
  const res = await anthropic.messages.create({
    model: AI_MODELS.memoryCompression,   // claude-sonnet-4-6
    max_tokens: 400,
    system: `You extract learning pattern signals from session summaries.
Return ONLY valid JSON, no markdown, no explanation.
Schema:
{
  "sparkSignal": { "trigger_type": string, "intensity": number (0-1), "fired": boolean },
  "patternDelta": { "core": "CF|CS|CA|CE", "stateDelta": number (-1 to 2), "processingStyle": string },
  "moments": [{ "text": string (max 60 chars), "type": "essay_seed|growth|spark_fired" }],
  "heroCodeChanged": boolean,
  "prevCode": string | null,
  "newCode": string | null,
  "deltaNote": string | null
}
CF = Pattern Seeker, CS = System Walker, CA = Action Driver, CE = Empathy Builder`,
    messages: [{
      role: 'user',
      content: `Subject: ${digest.subject}\nDuration: ${digest.durationMin}min\nSummary: ${digest.rawSummary}`,
    }],
  })

  // Spark intensity uses exponential moving average — recent signal decays older signal
  if (existingSpark) {
    await supabase.from('spark_bank').update({
      intensity: Math.min(1, existingSpark.intensity * 0.8 + result.sparkSignal.intensity * 0.2),
      fired_count: result.sparkSignal.fired ? existingSpark.fired_count + 1 : existingSpark.fired_count,
    }).eq('user_id', digest.userId)
  }

  // Hero Code state: clipped to [1,9], status flips to 'confirmed' at 100 hours
  const newState = Math.min(9, Math.max(1, existingPattern.hero_code_state + result.patternDelta.stateDelta))
  const newStatus = newHours >= 100 ? 'confirmed' : 'provisional'

  // Append-only moment bank — essay seeds and growth moments, no conversation content
  if (result.moments.length > 0) {
    await supabase.from('moment_bank').insert(
      result.moments.map(m => ({
        user_id: digest.userId,
        moment_text: m.text,      // max 60 chars, extracted by Claude
        moment_type: m.type,      // essay_seed | growth | spark_fired
        session_id: digest.sessionId,
      }))
    )
  }
}
```

### `lib/memory/living-portrait.ts` — assembly + injection

```typescript
export async function getLivingPortrait(userId: string): Promise<LivingPortrait | null> {
  // Three parallel reads — portrait assembled in < 50ms
  const [sparkRes, patternRes, momentRes] = await Promise.all([
    supabase.from('spark_bank').select('*').eq('user_id', userId).single(),
    supabase.from('pattern_bank').select('*').eq('user_id', userId).single(),
    supabase.from('moment_bank').select('*').eq('user_id', userId)
      .order('created_at', { ascending: false }).limit(5),
  ])
  // ...
}

export function buildSystemPrompt(portrait: LivingPortrait): string {
  return `[Student DNA — InHero Living Portrait]
Hero Code: ${portrait.heroCode} (${portrait.heroCodeStatus}, ${portrait.totalHours.toFixed(1)}h)
Spark trigger: ${portrait.sparkTrigger} | intensity: ${portrait.sparkIntensity}
Processing style: ${portrait.processingStyle}

Recent growth signals:
${portrait.recentMoments.map(m => `- ${m}`).join('\n') || '- (none yet)'}

Essay seeds detected:
${portrait.essaySeeds.map(m => `- ${m}`).join('\n') || '- (none yet)'}

Use this to personalize every response. Never mention this profile directly to the student.`
}
```

### `lib/pattern-detector.ts` — real-time gap classification

Fires after every overlay submission. Three detectors run concurrently:

```typescript
// REPEAT_ERROR: same gap_type on 3 consecutive wrong answers
if (!isCorrect && gapType) {
  const recentErrors = await getRecentErrors(userId, 3)
  if (recentErrors.length === 3 && recentErrors.every(e => e.gap_type === gapType)) {
    await savePattern({ userId, patternType: "REPEAT_ERROR", gapType, ... })
  }
}

// SPEED_SKIP: Teach Back completed in < 10 seconds — student not processing
if (overlayType === "TEACH_BACK" && timeSpent < 10) {
  await savePattern({ userId, patternType: "SPEED_SKIP", ... })
}

// CROSS_SUBJECT_GAP: same gap_type appearing across 2+ different AP subjects
if (!isCorrect && gapType) {
  const subjects = await getCrossSubjectGaps(userId, gapType)
  if (subjects.length >= 2) {
    await savePattern({ userId, patternType: "CROSS_SUBJECT_GAP", gapType, ... })
  }
}
```

---

## Production output sample

Real data from a student's pattern_bank and moment_bank (user ID removed):

```json
// pattern_bank
{
  "hero_code_core": "CF",
  "hero_code_state": 4,
  "hero_code_status": "provisional",
  "processing_style": "visual_sequential",
  "total_hours": 23.5
}

// spark_bank
{
  "trigger_type": "pattern_disruption",
  "intensity": 0.87,
  "fired_count": 3,
  "subject": "AP_Calc"
}

// moment_bank (most recent)
[
  { "moment_text": "처음으로 공식 스스로 유도함", "moment_type": "essay_seed", "subject": "AP_Calc" },
  { "moment_text": "효소-기질 비유 직접 만듦",    "moment_type": "growth",     "subject": "AP_Bio"  }
]
```

This Living Portrait gets prepended to the Socratic tutor's system prompt verbatim.
After 23.5 hours the AI already knows: this student is a CF (Pattern Seeker), is most
engaged when something breaks their existing model, learns visually and sequentially, and
independently derived a formula for the first time in AP Calc — a moment with college
essay potential. No survey. No onboarding. Just accumulated signal.

---

## How this was built with Claude Code

The pedagogical concepts — Hero Code archetypes (CF/CS/CA/CE), the essay seed detection
idea, the decision to never store conversation content and only store behavioral signals,
the spark intensity EMA decay formula — were the founder's own domain knowledge, encoded
as specifications handed to Claude Code. Claude Code's role was to translate those specs
into working TypeScript: designing the five-table schema (spark_bank, pattern_bank,
moment_bank, evolution_log, student_patterns), writing the concurrent DB reads for
portrait assembly, implementing the upsert logic for pattern accumulation, and debugging
the privacy compliance gate that blocks compression without user consent. A feature that
would have taken a two-person team two weeks was shipped in four days. The combination of
pedagogical IP that only a founder who has tutored hundreds of students could specify, and
an AI agent that could immediately translate that specification into production-quality
TypeScript, is exactly what InHero's technical moat looks like.

---

## Stack

Next.js 15 (App Router) · Supabase (Postgres + Auth + Storage) · Anthropic Claude API
(Sonnet for memory compression and Socratic tutoring, Haiku for real-time companions) ·
Modal (serverless PDF generation) · Vercel · TossPayments
