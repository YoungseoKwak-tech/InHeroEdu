import { getAiFallback, getAiRouteGuard } from "@/lib/ai-access";
import { getAnthropicApiKey } from "@/lib/env";

export async function POST(req: Request) {
  const guard = getAiRouteGuard("cognitive-analyze");
  if (guard) return Response.json(guard);

  const { subject, gradeLevel, analysisPrompt } = await req.json()

  if (!analysisPrompt) {
    return Response.json({ error: 'analysisPrompt required' }, { status: 400 })
  }

  // 원본 대화 받지 않음 — 패턴 분석 결과만 반환
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': getAnthropicApiKey(),
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 200,
        messages: [{ role: 'user', content: analysisPrompt }],
      }),
    })

    const data = await response.json()
    const text = data.content?.[0]?.text ?? ''
    const pattern = JSON.parse(text.replace(/```json|```/g, '').trim())
    return Response.json(pattern)
  } catch (error) {
    return Response.json(getAiFallback("cognitive-analyze", error))
  }
}
