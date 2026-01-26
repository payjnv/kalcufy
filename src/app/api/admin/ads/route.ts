import { NextRequest, NextResponse } from "next/server";
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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, location, adCode, isActive } = body;

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    // Check if ad with same name already exists
    const existing = await prisma.adSlot.findUnique({
      where: { name },
    });

    if (existing) {
      return NextResponse.json({ error: "Ad slot with this name already exists" }, { status: 400 });
    }

    const newAd = await prisma.adSlot.create({
      data: {
        name,
        location: location || name,
        adCode: adCode || null,
        isActive: isActive ?? true,
      },
    });

    return NextResponse.json(newAd);
  } catch (error) {
    console.error("Error creating ad slot:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
