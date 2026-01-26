import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

// POST - Reorder categories
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { order } = await request.json();

    if (!order || !Array.isArray(order)) {
      return NextResponse.json({ error: "Invalid order data" }, { status: 400 });
    }

    // Update all categories with their new sortOrder
    await prisma.$transaction(
      order.map(({ id, sortOrder }: { id: string; sortOrder: number }) =>
        prisma.calculatorCategory.update({
          where: { id },
          data: { sortOrder },
        })
      )
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error reordering categories:", error);
    return NextResponse.json({ error: "Failed to reorder" }, { status: 500 });
  }
}
