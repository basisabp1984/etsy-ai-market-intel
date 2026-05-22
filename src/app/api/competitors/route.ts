import { NextResponse } from "next/server";
import { competitors } from "@/lib/mock-data";

export async function GET() {
  return NextResponse.json({ data: competitors });
}
