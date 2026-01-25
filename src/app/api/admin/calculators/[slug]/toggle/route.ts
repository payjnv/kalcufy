// src/app/api/admin/calculators/[slug]/toggle/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // Check admin auth
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user || user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { slug } = await params;

    // Get current status or create if doesn't exist
    const existing = await prisma.calculatorStatus.findUnique({
      where: { slug },
    });

    let result;
    if (existing) {
      result = await prisma.calculatorStatus.update({
        where: { slug },
        data: { isActive: !existing.isActive },
      });
    } else {
      result = await prisma.calculatorStatus.create({
        data: {
          slug,
          isActive: false,
        },
      });
    }

    return NextResponse.json({
      success: true,
      slug: result.slug,
      isActive: result.isActive,
    });
  } catch (error) {
    console.error("Error toggling calculator status:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
