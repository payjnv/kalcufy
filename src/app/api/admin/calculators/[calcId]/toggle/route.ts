import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ calcId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { calcId } = await params;
    const slug = calcId.includes("-calculator") ? calcId : `${calcId}-calculator`;

    // Find current status
    const current = await prisma.calculatorStatus.findUnique({
      where: { slug }
    });

    // Toggle or create
    const result = await prisma.calculatorStatus.upsert({
      where: { slug },
      update: { isActive: !(current?.isActive ?? true) },
      create: { slug, isActive: false }
    });

    return NextResponse.json({ 
      success: true, 
      slug, 
      isActive: result.isActive 
    });
  } catch (error) {
    console.error("Error toggling calculator:", error);
    return NextResponse.json(
      { error: "Failed to toggle calculator" },
      { status: 500 }
    );
  }
}
