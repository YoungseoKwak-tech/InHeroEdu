import { NextRequest } from "next/server";
import { getAiRouteGuard } from "@/lib/ai-access";
import type { TrajectoryDeployRequest, TrajectoryDeployResponse } from "@/lib/trajectory-lab";

const VERCEL_API_BASE = "https://api.vercel.com";

function getVercelConfig() {
  const token = process.env.VERCEL_API_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID;
  const teamId = process.env.VERCEL_TEAM_ID;
  const gitSource = {
    type: process.env.VERCEL_GIT_SOURCE_TYPE,
    repoId: process.env.VERCEL_GIT_SOURCE_REPO_ID,
    ref: process.env.VERCEL_GIT_SOURCE_REF,
  };

  const canCreateDeployment =
    Boolean(token) &&
    Boolean(projectId) &&
    Boolean(gitSource.type) &&
    Boolean(gitSource.repoId) &&
    Boolean(gitSource.ref);

  return {
    token,
    projectId,
    teamId,
    gitSource,
    canCreateDeployment,
  };
}

function buildFallbackResponse(slug: string, format: string, template: string): TrajectoryDeployResponse {
  return {
    status: "deployment_spec_ready",
    host: "vercel",
    previewSlug: slug,
    recommendedCommand: `vercel --name ${slug}`,
    checklist: [
      `Create a ${format} project from ${template}`,
      "Attach environment variables",
      "Generate first landing page copy and sections",
      "Deploy preview to Vercel",
    ],
  };
}

export async function POST(req: NextRequest) {
  const guard = getAiRouteGuard("trajectory-lab-deploy");
  if (guard) return Response.json(guard);

  const { productName, format, template } = (await req.json()) as TrajectoryDeployRequest;

  if (!productName || !format || !template) {
    return Response.json(
      { error: "productName, format, and template are required" },
      { status: 400 },
    );
  }

  const slug = productName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const vercel = getVercelConfig();

  if (!vercel.canCreateDeployment) {
    return Response.json(buildFallbackResponse(slug, format, template));
  }

  try {
    const search = new URLSearchParams();
    if (vercel.teamId) search.set("teamId", vercel.teamId);

    const deploymentResponse = await fetch(`${VERCEL_API_BASE}/v13/deployments?${search.toString()}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${vercel.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: slug,
        project: vercel.projectId,
        target: "preview",
        gitSource: {
          type: vercel.gitSource.type,
          repoId: vercel.gitSource.repoId,
          ref: vercel.gitSource.ref,
        },
        meta: {
          trajectoryLabFormat: format,
          trajectoryLabTemplate: template,
        },
      }),
    });

    if (!deploymentResponse.ok) {
      const errorText = await deploymentResponse.text();
      console.error("[trajectory-lab-deploy] vercel deployment failed", errorText);
      return Response.json(buildFallbackResponse(slug, format, template));
    }

    const deploymentJson = await deploymentResponse.json();
    const previewUrl = deploymentJson.url ? `https://${deploymentJson.url}` : undefined;

    return Response.json({
      status: "deployment_created",
      host: "vercel",
      previewSlug: slug,
      previewUrl,
      deploymentId: deploymentJson.id,
      recommendedCommand: `vercel inspect ${deploymentJson.id ?? slug}`,
      checklist: [
        "Preview deployment requested from Trajectory Lab",
        "Wait for Vercel build to finish",
        "Open the preview URL and review launch copy",
        "Connect product-specific environment variables if needed",
      ],
    } satisfies TrajectoryDeployResponse);
  } catch (error) {
    console.error("[trajectory-lab-deploy] unexpected deployment error", error);
    return Response.json(buildFallbackResponse(slug, format, template));
  }
}
