import { NextRequest } from "next/server";
import { getAiRouteGuard } from "@/lib/ai-access";
import type { TrajectoryScaffoldRequest } from "@/lib/trajectory-lab";

export async function POST(req: NextRequest) {
  const guard = getAiRouteGuard("trajectory-lab-scaffold");
  if (guard) return Response.json(guard);

  const {
    productName,
    tagline,
    format,
    audience,
    problemStatement,
    coreFeatures = [],
  } = (await req.json()) as TrajectoryScaffoldRequest;

  if (!productName || !tagline || !format || !audience || !problemStatement) {
    return Response.json(
      { error: "productName, tagline, format, audience, and problemStatement are required" },
      { status: 400 },
    );
  }

  const pageMap = {
    app: ["landing", "dashboard", "history", "feedback"],
    web: ["landing", "tool", "history"],
    research: ["landing", "archive", "methods"],
    initiative: ["landing", "program", "impact"],
    toolkit: ["landing", "resources", "playbook"],
  } as const;

  const componentMap = {
    app: ["Hero", "FeatureGrid", "FeedbackCard", "WeakLinkPanel", "HistoryTimeline"],
    web: ["Hero", "ProblemSection", "FeatureGrid", "CTASection"],
    research: ["Hero", "ArchiveGrid", "MethodsCard", "InsightPanel"],
    initiative: ["Hero", "ProgramFlow", "ImpactCard", "SignupSection"],
    toolkit: ["Hero", "ToolkitGrid", "ChecklistPanel", "CTASection"],
  } as const;

  return Response.json({
    template: `nextjs-${format}-starter`,
    pages: pageMap[format],
    components: componentMap[format],
    stack: ["Next.js", "Tailwind CSS", "Supabase", "Vercel"],
    contentBlocks: {
      hero: `${productName} — ${tagline}`,
      problem: problemStatement,
      features: coreFeatures.slice(0, 4),
    },
    nextStep: "ready_for_build",
  });
}
