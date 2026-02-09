// src/app/api/admin/calculator-subcategories/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/db";
import { authOptions } from "@/lib/auth";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { nameEn, nameEs, namePt, nameFr, nameDe, sortOrder, isActive } = body;

    const subcategory = await prisma.calculatorSubcategory.update({
      where: { id: params.id },
      data: {
        ...(nameEn !== undefined && { nameEn }),
        ...(nameEs !== undefined && { nameEs }),
        ...(namePt !== undefined && { namePt }),
        ...(nameFr !== undefined && { nameFr }),
        ...(nameDe !== undefined && { nameDe }),
        ...(sortOrder !== undefined && { sortOrder }),
        ...(isActive !== undefined && { isActive }),
      },
    });

    return NextResponse.json(subcategory);
  } catch (error) {
    console.error("Error updating subcategory:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // First remove subcategory from any calculators
    await prisma.calculatorStatus.updateMany({
      where: { subcategoryId: params.id },
      data: { subcategoryId: null },
    });

    await prisma.calculatorSubcategory.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting subcategory:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
