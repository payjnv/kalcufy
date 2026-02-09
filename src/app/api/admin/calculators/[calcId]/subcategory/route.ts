// src/app/api/admin/calculators/[calcId]/subcategory/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/db";
import { authOptions } from "@/lib/auth";

export async function POST(
  request: NextRequest,
  { params }: { params: { calcId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { subcategoryId } = await request.json();
    const slug = params.calcId; // calcId is actually the slug

    // Upsert calculator_status with subcategoryId
    const status = await prisma.calculatorStatus.upsert({
      where: { slug },
      update: { subcategoryId: subcategoryId || null },
      create: { slug, isActive: true, subcategoryId: subcategoryId || null },
    });

    return NextResponse.json({ success: true, subcategoryId: status.subcategoryId });
  } catch (error) {
    console.error("Error assigning subcategory:", error);
    return NextResponse.json({ error: "Failed to assign subcategory" }, { status: 500 });
  }
}
