import { createAdminClient } from '@/lib/supabase'
import type { LivingPortrait } from './types'

export async function getLivingPortrait(userId: string): Promise<LivingPortrait | null> {
  try {
    const supabase = createAdminClient()

    const [sparkRes, patternRes, momentRes] = await Promise.all([
      supabase.from('spark_bank').select('*').eq('user_id', userId).single(),
      supabase.from('pattern_bank').select('*').eq('user_id', userId).single(),
      supabase.from('moment_bank').select('*').eq('user_id', userId).order('created_at', { ascending: false }).limit(5),
    ])

    if (!patternRes.data) return null

    const p = patternRes.data
    const s = sparkRes.data
    const moments = momentRes.data ?? []

    return {
      heroCode: `${p.hero_code_core}-${p.hero_code_state}`,
      heroCodeStatus: p.hero_code_status,
      sparkTrigger: s?.trigger_type ?? 'unknown',
      sparkIntensity: s?.intensity ?? 0,
      processingStyle: p.processing_style ?? 'unknown',
      totalHours: p.total_hours,
      recentMoments: moments
        .filter((m: { moment_type: string }) => m.moment_type === 'growth')
        .map((m: { moment_text: string }) => m.moment_text),
      essaySeeds: moments
        .filter((m: { moment_type: string }) => m.moment_type === 'essay_seed')
        .map((m: { moment_text: string }) => m.moment_text),
    }
  } catch {
    return null
  }
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
