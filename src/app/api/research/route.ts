import { NextResponse } from "next/server";
import { researchRuns } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({ data: researchRuns });
}
