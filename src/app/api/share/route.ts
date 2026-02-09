import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { nanoid } from "nanoid";

// POST - Create share link
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { calculatorId, calculatorSlug, locale, values, results, unitSystem } = body;

    if (!calculatorId || !values) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Get user if logged in
    const session = await getServerSession(authOptions);
    const userId = session?.user?.email 
      ? (await prisma.user.findUnique({ where: { email: session.user.email } }))?.id 
      : null;

    // Generate short code (7 chars)
    const shortCode = nanoid(7);

    // Expires in 7 days
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    const shared = await prisma.sharedCalculation.create({
      data: {
        shortCode,
        calculatorId,
        calculatorSlug: calculatorSlug || `${calculatorId}-calculator`,
        locale: locale || "en",
        values,
        results,
        unitSystem: unitSystem || "imperial",
        userId,
        expiresAt,
      },
    });

    const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://kalcufy.com'}/share/${shortCode}`;

    return NextResponse.json({ 
      shortCode: shared.shortCode,
      shareUrl,
      expiresAt: shared.expiresAt,
    });
  } catch (error) {
    console.error("Error creating share link:", error);
    return NextResponse.json({ error: "Failed to create share link" }, { status: 500 });
  }
}
