import { NextResponse } from "next/server";
import { competitors, reports, trends } from "@/lib/mock-data";

const defaultAnswer =
  "The strongest signal is educational tactile play. Magnetic puzzles have the fastest growth, while wooden busy boards have a cleaner competition profile.";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { question?: string };
  const question = (body.question || "").toLowerCase();

  let answer = defaultAnswer;

  if (question.includes("fastest") || question.includes("growing")) {
    const fastest = [...trends].sort((a, b) => b.weeklyGrowth - a.weeklyGrowth)[0];
    answer = `${fastest.niche} is growing fastest this week at +${fastest.weeklyGrowth}%. TikTok mentions are up to ${fastest.tiktokMentions.toLocaleString()} and the opportunity score is ${fastest.opportunityScore}/100.`;
  }

  if (question.includes("price drop") || question.includes("aggressive")) {
    const aggressive = competitors
      .filter((item) => item.activity === "Aggressive")
      .map((item) => `${item.seller} (${item.priceMove}%)`)
      .join(", ");
    answer = `The most aggressive price movement is coming from ${aggressive}. Watch bundle changes before matching discounts.`;
  }

  if (question.includes("low competition") || question.includes("rising demand")) {
    const clean = trends
      .filter((item) => item.competition === "Low")
      .sort((a, b) => b.opportunityScore - a.opportunityScore)[0];
    answer = `${clean.niche} is the best low-competition category. It combines ${clean.weeklyGrowth}% weekly growth with a ${clean.opportunityScore}/100 opportunity score.`;
  }

  if (question.includes("report")) {
    answer = `${reports[0].title}: ${reports[0].summary} Recommended next move: test premium positioning in busy boards and one creator-led TikTok angle for magnetic puzzles.`;
  }

  return NextResponse.json({
    data: {
      answer,
      citations: ["Mock Etsy product signals", "Mock TikTok mention velocity", "Mock competitor price deltas"]
    }
  });
}
