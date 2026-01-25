import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  try {
    const adSlots = await prisma.adSlot.findMany({
      orderBy: { name: "asc" },
    });
    return NextResponse.json(adSlots);
  } catch (error) {
    console.error("Error fetching ad slots:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
