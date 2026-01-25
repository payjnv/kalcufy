import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const updatedSlot = await prisma.adSlot.update({
      where: { id },
      data: {
        ...(body.adCode !== undefined && { adCode: body.adCode }),
        ...(body.isActive !== undefined && { isActive: body.isActive }),
      },
    });

    return NextResponse.json(updatedSlot);
  } catch (error) {
    console.error("Error updating ad slot:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
