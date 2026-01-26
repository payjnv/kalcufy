import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/db";
import { authOptions } from "@/lib/auth";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const start = parseInt(searchParams.get("_start") || "0");
    const end = parseInt(searchParams.get("_end") || "20");

    const [calculations, total] = await Promise.all([
      prisma.calculatorHistory.findMany({
        skip: start,
        take: end - start,
        orderBy: { createdAt: "desc" },
        include: {
          user: {
            select: { name: true, email: true },
          },
        },
      }),
      prisma.calculatorHistory.count(),
    ]);

    return NextResponse.json({ data: calculations, total });
  } catch (error) {
    console.error("Calculator history error:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
