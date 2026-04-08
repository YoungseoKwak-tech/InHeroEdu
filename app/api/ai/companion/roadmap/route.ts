import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(req: NextRequest) {
  const { strengths = [], interests = [], college_adjustments = {} } = await req.json();

  const prompt = `학생 프로필 (대화에서 추출, 민감 정보 제외됨):
강점: ${strengths.join(", ") || "파악 중"}
관심 분야: ${interests.join(", ") || "파악 중"}
조건: ${JSON.stringify(college_adjustments)}

위 프로필 기반으로 한국어로 대학 로드맵을 생성해줘:
1. 목표 대학 3곳 (reach) — 프로필 근거 포함
2. 안정 대학 3곳 (match)
3. 보험 대학 2곳 (safety)
4. 지금 당장 해야 할 3가지 액션 아이템
5. 집중해야 할 AP 과목

재정 정보는 절대 언급하지 말 것. 학생의 강점과 가능성에 집중할 것.`;

  try {
    const response = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 900,
      messages: [{ role: "user", content: prompt }],
    });
    const text = response.content[0].type === "text" ? response.content[0].text : "";
    return Response.json({ roadmap: text });
  } catch (e) {
    console.error("[roadmap]", e);
    return Response.json({ error: "생성 실패" }, { status: 500 });
  }
}
