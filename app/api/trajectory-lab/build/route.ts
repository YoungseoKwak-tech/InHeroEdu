import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import { getAiFallback, getAiRouteGuard } from "@/lib/ai-access";
import { AI_MODELS } from "@/lib/ai-models";
import type { TrajectoryBuildRequest } from "@/lib/trajectory-lab";
import { getAnthropicApiKey } from "@/lib/env";
import { parseJsonBlock } from "@/lib/ai-json";

const client = new Anthropic({
  apiKey: getAnthropicApiKey(),
});

export async function POST(req: NextRequest) {
  const guard = getAiRouteGuard("trajectory-lab-build");
  if (guard) return Response.json(guard);

  const {
    trajectory,
    buildDirection,
    recommendedFormat,
    signalSummary = [],
    suggestedProjectTypes = [],
    mvpConcept,
    lang = "en",
  } = (await req.json()) as TrajectoryBuildRequest;

  if (!trajectory || !buildDirection || !recommendedFormat || !mvpConcept) {
    return Response.json(
      { error: "trajectory, buildDirection, recommendedFormat, and mvpConcept are required" },
      { status: 400 },
    );
  }

  const prompt =
    lang === "ko"
      ? `
당신은 Trajectory Lab의 build generator입니다.
학생의 trajectory와 build direction을 바탕으로 실제로 바로 시작할 수 있는 MVP spec을 생성하세요.

입력:
- Trajectory: ${trajectory}
- Build direction: ${buildDirection}
- Recommended format: ${recommendedFormat}
- Signal summary: ${signalSummary.join(", ") || "없음"}
- Suggested project types: ${suggestedProjectTypes.join(", ") || "없음"}
- MVP concept name: ${mvpConcept.name}
- MVP one-liner: ${mvpConcept.oneLiner}
- Target user: ${mvpConcept.targetUser}
- Core problem: ${mvpConcept.coreProblem}

규칙:
1. generic한 설명 금지
2. 학생이 실제로 바로 시작할 수 있을 정도로 구체적이어야 함
3. coreFeatures는 4개 이하
4. userFlow는 실제 사용자 흐름 순서여야 함
5. mvpScope는 처음 버전에서 꼭 필요한 범위만
6. launchCopy는 실제 landing page hero에 바로 쓸 수 있어야 함
7. JSON만 반환

JSON 형식:
{
  "productName": "",
  "tagline": "",
  "format": "",
  "audience": "",
  "problemStatement": "",
  "coreFeatures": ["", "", ""],
  "userFlow": ["", "", "", ""],
  "mvpScope": ["", "", ""],
  "launchCopy": {
    "hero": "",
    "sub": "",
    "cta": ""
  }
}
`
      : `
You are the Trajectory Lab build generator.
Based on a student's trajectory and build direction, generate an MVP spec that is concrete enough to start immediately.

Input:
- Trajectory: ${trajectory}
- Build direction: ${buildDirection}
- Recommended format: ${recommendedFormat}
- Signal summary: ${signalSummary.join(", ") || "none"}
- Suggested project types: ${suggestedProjectTypes.join(", ") || "none"}
- MVP concept name: ${mvpConcept.name}
- MVP one-liner: ${mvpConcept.oneLiner}
- Target user: ${mvpConcept.targetUser}
- Core problem: ${mvpConcept.coreProblem}

Rules:
1. Avoid generic phrasing
2. Make it concrete enough for a student to start building now
3. Keep coreFeatures to 4 or fewer
4. userFlow should reflect the actual order of use
5. mvpScope should include only first-version essentials
6. launchCopy should be usable directly on a landing page
7. Return JSON only
8. Keep the build realistic for a student founder. Prefer a simple first version over a startup fantasy.
9. If the product is web/app-based, shape the MVP so it can plausibly ship on a student-friendly stack like Next.js, Tailwind, Supabase, and Vercel.
10. The best outputs should feel tied to the student's lived learning friction, not just to the topic area.

Return JSON in this format:
{
  "productName": "",
  "tagline": "",
  "format": "",
  "audience": "",
  "problemStatement": "",
  "coreFeatures": ["", "", ""],
  "userFlow": ["", "", "", ""],
  "mvpScope": ["", "", ""],
  "launchCopy": {
    "hero": "",
    "sub": "",
    "cta": ""
  }
}
`;

  try {
    const response = await client.messages.create({
      model: AI_MODELS.trajectoryBuild,
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    });

    const text = response.content[0]?.type === "text" ? response.content[0].text : "{}";
    const parsed = parseJsonBlock(text, {
      productName: mvpConcept.name,
      tagline: "Turn a student frustration into a real first build.",
      format: recommendedFormat,
      audience: mvpConcept.targetUser,
      problemStatement: mvpConcept.coreProblem,
      coreFeatures: [
        "Clear problem framing",
        "One student-facing workflow",
        "Saved outputs or history",
        "Simple launch page",
      ],
      userFlow: [
        "Land on the product page",
        "Describe the core problem",
        "Use the first workflow",
        "Save or share the result",
      ],
      mvpScope: [
        "One core workflow",
        "Single audience focus",
        "Launch-ready landing copy",
      ],
      launchCopy: {
        hero: mvpConcept.oneLiner,
        sub: `Built for ${mvpConcept.targetUser}.`,
        cta: `Start ${mvpConcept.name}`,
      },
    });
    return Response.json(parsed);
  } catch (error) {
    return Response.json(getAiFallback("trajectory-lab-build", error));
  }
}
