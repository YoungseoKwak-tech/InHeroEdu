import Anthropic from '@anthropic-ai/sdk'
import { createAdminClient } from '@/lib/supabase'
import type { SessionDigest } from './types'
import { getAiRouteGuard } from '@/lib/ai-access'
import { AI_MODELS } from '@/lib/ai-models'
import { getAnthropicApiKey } from '@/lib/env'

const anthropic = new Anthropic({ apiKey: getAnthropicApiKey() })

interface CompressionResult {
  sparkSignal: { trigger_type: string; intensity: number; fired: boolean }
  patternDelta: { core: string; stateDelta: number; processingStyle: string }
  moments: Array<{ text: string; type: 'essay_seed' | 'growth' | 'spark_fired' }>
  heroCodeChanged: boolean
  prevCode?: string
  newCode?: string
  deltaNote?: string
}

export async function compressSession(digest: SessionDigest): Promise<void> {
  if (getAiRouteGuard("memory-compress")) return;

  const supabase = createAdminClient()

  const res = await anthropic.messages.create({
    model: AI_MODELS.memoryCompression,
    max_tokens: 400,
    system: `You extract learning pattern signals from session summaries for an education platform.
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

  const text = res.content[0].type === 'text' ? res.content[0].text : '{}'
  let result: CompressionResult
  try {
    result = JSON.parse(text)
  } catch {
    return
  }

  // Spark Bank 업데이트
  const { data: existingSpark } = await supabase
    .from('spark_bank')
    .select('*')
    .eq('user_id', digest.userId)
    .single()

  if (existingSpark) {
    await supabase.from('spark_bank').update({
      trigger_type: result.sparkSignal.trigger_type,
      intensity: Math.min(1, existingSpark.intensity * 0.8 + result.sparkSignal.intensity * 0.2),
      last_fired_at: result.sparkSignal.fired ? new Date().toISOString() : existingSpark.last_fired_at,
      fired_count: result.sparkSignal.fired ? existingSpark.fired_count + 1 : existingSpark.fired_count,
      subject: digest.subject,
      updated_at: new Date().toISOString(),
    }).eq('user_id', digest.userId)
  } else {
    await supabase.from('spark_bank').insert({
      user_id: digest.userId,
      trigger_type: result.sparkSignal.trigger_type,
      intensity: result.sparkSignal.intensity,
      last_fired_at: result.sparkSignal.fired ? new Date().toISOString() : null,
      fired_count: result.sparkSignal.fired ? 1 : 0,
      subject: digest.subject,
    })
  }

  // Pattern Bank 업데이트
  const { data: existingPattern } = await supabase
    .from('pattern_bank')
    .select('*')
    .eq('user_id', digest.userId)
    .single()

  if (existingPattern) {
    const newState = Math.min(9, Math.max(1, existingPattern.hero_code_state + result.patternDelta.stateDelta))
    const newHours = existingPattern.total_hours + digest.durationMin / 60
    const newStatus = newHours >= 100 ? 'confirmed' : 'provisional'

    await supabase.from('pattern_bank').update({
      hero_code_core: result.patternDelta.core,
      hero_code_state: newState,
      hero_code_status: newStatus,
      processing_style: result.patternDelta.processingStyle,
      total_hours: newHours,
      confirmed_at: newStatus === 'confirmed' && !existingPattern.confirmed_at
        ? new Date().toISOString()
        : existingPattern.confirmed_at,
      updated_at: new Date().toISOString(),
    }).eq('user_id', digest.userId)

    if (result.heroCodeChanged && result.prevCode && result.newCode) {
      await supabase.from('evolution_log').insert({
        user_id: digest.userId,
        prev_code: result.prevCode,
        new_code: result.newCode,
        delta_note: result.deltaNote ?? null,
        grade_year: null,
      })
    }
  } else {
    await supabase.from('pattern_bank').insert({
      user_id: digest.userId,
      hero_code_core: result.patternDelta.core,
      hero_code_state: 1,
      hero_code_status: 'provisional',
      processing_style: result.patternDelta.processingStyle,
      total_hours: digest.durationMin / 60,
    })
  }

  // Moment Bank — append only, 원본 대화 없음
  if (result.moments.length > 0) {
    await supabase.from('moment_bank').insert(
      result.moments.map(m => ({
        user_id: digest.userId,
        moment_text: m.text,
        subject: digest.subject,
        moment_type: m.type,
        session_id: digest.sessionId,
      }))
    )
  }
}
