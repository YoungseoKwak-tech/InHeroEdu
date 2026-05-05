export type HeroCodeCore = 'CF' | 'CS' | 'CA' | 'CE'

export interface SparkBank {
  user_id: string
  trigger_type: string
  intensity: number
  last_fired_at: string
  fired_count: number
  subject: string
  raw_signal: string
}

export interface PatternBank {
  user_id: string
  hero_code_core: HeroCodeCore
  hero_code_state: number
  hero_code_status: 'provisional' | 'confirmed'
  processing_style: string
  total_hours: number
  confirmed_at: string | null
}

export interface MomentBank {
  user_id: string
  moment_text: string
  subject: string
  moment_type: 'essay_seed' | 'growth' | 'spark_fired'
  session_id: string
}

export interface LivingPortrait {
  heroCode: string
  heroCodeStatus: string
  sparkTrigger: string
  sparkIntensity: number
  processingStyle: string
  totalHours: number
  recentMoments: string[]
  essaySeeds: string[]
}

export interface SessionDigest {
  userId: string
  sessionId: string
  subject: string
  durationMin: number
  rawSummary: string
}
