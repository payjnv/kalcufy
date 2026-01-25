import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

// ============================================================================
// GET /api/ads?name=X - Get active ad by name (public)
// Uses your schema: name (unique), location, adCode, isActive
// ============================================================================
export async function GET(request: NextRequest) {
  try {
    const name = request.nextUrl.searchParams.get("name");
    
    if (!name) {
      return NextResponse.json({ error: "Name parameter required" }, { status: 400 });
    }

    const ad = await prisma.adSlot.findFirst({
      where: {
        name: name,
        isActive: true,
      },
      select: {
        id: true,
        name: true,
        location: true,
        adCode: true,
        isActive: true,
      },
    });

    if (!ad) {
      return NextResponse.json({ error: "Ad not found" }, { status: 404 });
    }

    return NextResponse.json(ad);
  } catch (error) {
    console.error("Error fetching ad:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// ============================================================================
// POST /api/ads - Track ad click (public)
// ============================================================================
export async function POST(request: NextRequest) {
  try {
    const { adId } = await request.json();

    if (!adId) {
      return NextResponse.json({ error: "Ad ID required" }, { status: 400 });
    }

    // Note: Your schema doesn't have clicks/impressions columns
    // If you want to track clicks, you'd need to add them to the schema
    // For now, just return success
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error tracking click:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
