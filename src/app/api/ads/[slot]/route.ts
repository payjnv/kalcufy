import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slot: string }> }
) {
  try {
    const { slot } = await params;
    
    const adSlot = await prisma.adSlot.findFirst({
      where: {
        location: slot
      }
    });

    if (!adSlot) {
      return NextResponse.json({ isActive: false }, { status: 200 });
    }

    return NextResponse.json(adSlot);
  } catch (error) {
    console.error("Error fetching ad slot:", error);
    return NextResponse.json({ isActive: false }, { status: 200 });
  }
}
