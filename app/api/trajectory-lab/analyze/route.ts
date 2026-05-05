import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import { getAiFallback, getAiRouteGuard } from "@/lib/ai-access";
import { AI_MODELS } from "@/lib/ai-models";
import type { TrajectoryAnalyzeRequest } from "@/lib/trajectory-lab";
import { getAnthropicApiKey } from "@/lib/env";
import { parseJsonBlock } from "@/lib/ai-json";

const client = new Anthropic({
  apiKey: getAnthropicApiKey(),
});

export async function POST(req: NextRequest) {
  const guard = getAiRouteGuard("trajectory-lab-analyze");
  if (guard) return Response.json(guard);

  const {
    keywords = [],
    conversationSummary = "",
    activities = [],
    interests = [],
    strengths = [],
    frictions = [],
    heroCode = "",
    portraitSignals = [],
    lang = "en",
  } = (await req.json()) as TrajectoryAnalyzeRequest;

  const prompt =
    lang === "ko"
      ? `
당신은 학생의 학습 패턴과 활동 이력을 바탕으로 "이 학생이 다음에 무엇을 만들어야 하는지"를 설계하는 Trajectory Lab 엔진입니다.

입력:
- 키워드: ${keywords.join(", ") || "없음"}
- 대화 요약: ${conversationSummary || "없음"}
- 활동: ${activities.join(", ") || "없음"}
- 관심사: ${interests.join(", ") || "없음"}
- 강점: ${strengths.join(", ") || "없음"}
- 마찰/약점: ${frictions.join(", ") || "없음"}
- Hero Code: ${heroCode || "없음"}
- Portrait signals: ${portraitSignals.join(", ") || "없음"}

규칙:
1. 흔한 extracurricular 추천 금지
2. 학생의 패턴, 강점, friction을 바탕으로 창의적인 방향을 제안
3. "무엇을 공부할지"보다 "무엇을 만들지"를 우선
4. 출력은 반드시 JSON만 반환
5. recommendedFormat은 app, web, research, initiative, toolkit 중 하나
6. signalSummary는 3~5개
7. trajectory는 이 학생이 어떤 builder로 성장 중인지 한 문장
8. buildDirection은 왜 이 방향이 맞는지 한 문장
9. mvpConcept는 바로 시작 가능한 수준으로 작성

JSON 형식:
{
  "signalSummary": ["", "", ""],
  "trajectory": "",
  "buildDirection": "",
  "recommendedFormat": "app",
  "suggestedProjectTypes": ["", "", ""],
  "mvpConcept": {
    "name": "",
    "oneLiner": "",
    "targetUser": "",
    "coreProblem": ""
  }
}
`
      : `
You are the Trajectory Lab engine.
Your job is to read a student's learning patterns, activity history, and signal layers, then determine what they should build next.

Input:
- Keywords: ${keywords.join(", ") || "none"}
- Conversation summary: ${conversationSummary || "none"}
- Activities: ${activities.join(", ") || "none"}
- Interests: ${interests.join(", ") || "none"}
- Strengths: ${strengths.join(", ") || "none"}
- Frictions: ${frictions.join(", ") || "none"}
- Hero Code: ${heroCode || "none"}
- Portrait signals: ${portraitSignals.join(", ") || "none"}

Rules:
1. Do not suggest generic extracurriculars
2. Base the direction on pattern, strength, and friction
3. Prioritize what the student should build, not just what they should study
4. Return JSON only
5. recommendedFormat must be one of: app, web, research, initiative, toolkit
6. signalSummary should have 3 to 5 items
7. trajectory should describe what kind of builder this student is becoming
8. buildDirection should explain why that direction fits
9. mvpConcept should be concrete enough to start immediately
10. This is a student-specific engine. Prefer ideas where the student's actual learning friction, study pattern, language gap, or identity struggle becomes the product advantage.
11. Avoid generic startup ideas. The result should feel like something this exact student would build because of how they learn.
12. If the idea is education-facing, student-facing, or learning-facing, lean into that strength instead of drifting into random consumer products.

Return JSON in this format:
{
  "signalSummary": ["", "", ""],
  "trajectory": "",
  "buildDirection": "",
  "recommendedFormat": "app",
  "suggestedProjectTypes": ["", "", ""],
  "mvpConcept": {
    "name": "",
    "oneLiner": "",
    "targetUser": "",
    "coreProblem": ""
  }
}
`;

  try {
    const response = await client.messages.create({
      model: AI_MODELS.trajectoryAnalyze,
      max_tokens: 900,
      messages: [{ role: "user", content: prompt }],
    });

    const text = response.content[0]?.type === "text" ? response.content[0].text : "{}";
    const parsed = parseJsonBlock(text, {
      signalSummary: [
        "Repeated return to student-facing problem solving",
        "Strong interest in translating lived frustration into something useful",
        "Momentum around building, not just studying",
      ],
      trajectory: "A student problem-solver growing into a builder.",
      buildDirection: "Start with a small student-facing tool that solves the exact friction this student keeps mentioning.",
      recommendedFormat: "web",
      suggestedProjectTypes: ["student-facing app", "web tool", "initiative"],
      mvpConcept: {
        name: "Student Signal Studio",
        oneLiner: "A lightweight tool that turns a recurring student frustration into a first working product.",
        targetUser: "Ambitious students with a clear academic or identity friction point",
        coreProblem: "Students often know what bothers them, but not how to turn that into a buildable first project.",
      },
    });
    return Response.json(parsed);
  } catch (error) {
    return Response.json(getAiFallback("trajectory-lab-analyze", error));
  }
}
