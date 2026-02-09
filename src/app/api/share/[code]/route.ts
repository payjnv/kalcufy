import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// GET - Get shared calculation by code
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await params;

    const shared = await prisma.sharedCalculation.findUnique({
      where: { shortCode: code },
    });

    if (!shared) {
      return NextResponse.json({ error: "Share link not found" }, { status: 404 });
    }

    // Check if expired
    if (new Date() > shared.expiresAt) {
      // Delete expired link
      await prisma.sharedCalculation.delete({ where: { id: shared.id } });
      return NextResponse.json({ error: "Share link expired" }, { status: 410 });
    }

    // Increment views
    await prisma.sharedCalculation.update({
      where: { id: shared.id },
      data: { views: { increment: 1 } },
    });

    return NextResponse.json({
      calculatorId: shared.calculatorId,
      calculatorSlug: shared.calculatorSlug,
      locale: shared.locale,
      values: shared.values,
      results: shared.results,
      unitSystem: shared.unitSystem,
      views: shared.views + 1,
      createdAt: shared.createdAt,
      expiresAt: shared.expiresAt,
    });
  } catch (error) {
    console.error("Error fetching share:", error);
    return NextResponse.json({ error: "Failed to fetch share" }, { status: 500 });
  }
}
