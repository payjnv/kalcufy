import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { calculatorSlug, language, type = "VIEW" } = body;

    if (!calculatorSlug) {
      return NextResponse.json({ error: "Missing calculatorSlug" }, { status: 400 });
    }

    const userAgent = request.headers.get("user-agent") || "";
    const device = /Mobile|Android|iPhone/i.test(userAgent) ? "mobile" : "desktop";

    // Validate type
    const trackingType = type === "CALCULATION" ? "CALCULATION" : "VIEW";

    await prisma.calculatorUsage.create({
      data: {
        calculatorSlug,
        language: language || "en",
        device,
        type: trackingType,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error tracking:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
