import { NextResponse } from "next/server";
import { kpis, trends } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({ data: trends, kpis });
}
