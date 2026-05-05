// 저장하는 것: 행동 패턴만
// 저장하지 않는 것: 대화 내용 원본, 개인정보
import { createAdminClient } from '@/lib/supabase'
import { checkConsent } from './privacyCompliance'

export interface CognitiveLogEntry {
  userId: string
  sessionId: string
  subject?: string
  topic?: string
  gradeLevel?: string
  gapType: 'CONCEPT_GAP' | 'APPLICATION_GAP' | 'LANGUAGE_GAP' | 'LOGIC_GAP' | 'NONE'
  questionComplexity: 1 | 2 | 3 | 4 | 5
  thinkingApproach: 'direct' | 'analytical' | 'creative' | 'stuck'
  resolutionTime?: number
  hadBreakthrough: boolean
  confidenceBefore?: number
  confidenceAfter?: number
  essayPotential: boolean
  essayTheme?: string
}

function generateSessionId(): string {
  return `sess_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`
}

export async function logCognitiveEvent(entry: CognitiveLogEntry) {
  // 동의 확인 먼저
  const hasConsent = await checkConsent(entry.userId, 'cognitive_logging')
  if (!hasConsent) return null

  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('cognitive_logs')
    .insert({
      user_id: entry.userId,
      session_id: entry.sessionId,
      subject: entry.subject,
      topic: entry.topic,
      grade_level: entry.gradeLevel,
      gap_type: entry.gapType,
      question_complexity: entry.questionComplexity,
      thinking_approach: entry.thinkingApproach,
      resolution_time: entry.resolutionTime,
      had_breakthrough: entry.hadBreakthrough,
      confidence_before: entry.confidenceBefore,
      confidence_after: entry.confidenceAfter,
      essay_potential: entry.essayPotential,
      essay_theme: entry.essayTheme,
      data_consent: true,
    })

  if (error) console.error('Cognitive log error:', error)
  return data
}

// AI 대화에서 패턴 추출 (내용 저장 안 함)
export async function analyzeAndLog(
  userId: string,
  aiConversation: string, // 분석 후 버림
  subject: string,
  gradeLevel: string
) {
  const analysisPrompt = `
    Analyze this learning conversation and return ONLY:
    1. gap_type (CONCEPT_GAP/APPLICATION_GAP/LANGUAGE_GAP/LOGIC_GAP/NONE)
    2. thinking_approach (direct/analytical/creative/stuck)
    3. had_breakthrough (true/false)
    4. essay_potential (true/false)
    5. essay_theme if potential (perseverance/curiosity/connection/growth/identity/null)

    Return JSON only. No conversation content.
    Conversation: ${aiConversation.substring(0, 500)}
  `

  const response = await fetch('/api/cognitive/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      conversationLength: aiConversation.length,
      subject,
      gradeLevel,
      analysisPrompt,
    }),
  })

  const pattern = await response.json()

  // 원본 대화는 저장하지 않음 — 패턴만 저장
  return logCognitiveEvent({
    userId,
    sessionId: generateSessionId(),
    subject,
    gradeLevel,
    gapType: pattern.gap_type ?? 'NONE',
    questionComplexity: pattern.question_complexity ?? 1,
    thinkingApproach: pattern.thinking_approach ?? 'direct',
    hadBreakthrough: pattern.had_breakthrough ?? false,
    essayPotential: pattern.essay_potential ?? false,
    essayTheme: pattern.essay_theme ?? undefined,
  })
}
