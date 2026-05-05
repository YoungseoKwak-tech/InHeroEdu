// 대화 내용이 아닌 패턴 데이터만 사용
import { createAdminClient } from '@/lib/supabase'
import { getAnthropicApiKey } from '@/lib/env'

function getMostCommon(arr: string[]): string | undefined {
  if (!arr.length) return undefined
  return arr
    .sort((a, b) => arr.filter(v => v === a).length - arr.filter(v => v === b).length)
    .pop()
}

export async function findEssaySources(userId: string) {
  const supabase = createAdminClient()

  const { data: logs } = await supabase
    .from('cognitive_logs')
    .select('gap_type, had_breakthrough, essay_potential, essay_theme, subject, created_at, grade_level')
    .eq('user_id', userId)
    .order('created_at', { ascending: true })

  if (!logs || logs.length < 10) {
    return {
      sources: [],
      message: '더 많은 학습 데이터가 쌓이면 에세이 소재를 발굴해드릴게요.',
    }
  }

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': getAnthropicApiKey(),
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1000,
      messages: [
        {
          role: 'user',
          content: `
Based on this student's learning PATTERNS (not personal info),
suggest 3 college essay themes.

Learning data summary:
- Total sessions: ${logs.length}
- Most common gap type: ${getMostCommon(logs.map(l => l.gap_type).filter(Boolean))}
- Breakthrough count: ${logs.filter(l => l.had_breakthrough).length}
- Subjects: ${Array.from(new Set(logs.map(l => l.subject))).join(', ')}
- Essay themes detected: ${Array.from(new Set(logs.map(l => l.essay_theme).filter(Boolean))).join(', ')}
- Growth period: ${logs[0]?.grade_level} to ${logs[logs.length - 1]?.grade_level}

Return JSON: {
  "sources": [
    {
      "theme": string,
      "angle": string,
      "evidence": string,
      "strength": "high" | "medium"
    }
  ]
}

IMPORTANT: Do not reference any personal information.
Base everything on learning behavior patterns only.
          `,
        },
      ],
    }),
  })

  const result = await response.json()
  const content = result.content?.[0]?.text ?? ''

  try {
    return JSON.parse(content.replace(/```json|```/g, '').trim())
  } catch {
    return { sources: [] }
  }
}
