import { NextResponse } from "next/server";
import { researchRuns } from "@/lib/mock-data";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    title?: string;
    scope?: string;
  };

  return NextResponse.json({
    data: {
      id: `rr-${Date.now()}`,
      title: body.title || "New market intelligence run",
      scope: body.scope || "Selected toy niches, competitors, TikTok signal quality",
      status: "Completed",
      startedAt: new Date().toISOString(),
      signals: 487,
      findings:
        "Mock research complete. Magnetic puzzles and sensory busy boards have the strongest opportunity scores this week."
    },
    history: researchRuns
  });
}
