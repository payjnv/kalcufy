import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { Prisma } from "@prisma/client";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const start = parseInt(searchParams.get("_start") || "0");
  const end = parseInt(searchParams.get("_end") || "10");
  const sort = searchParams.get("_sort") || "createdAt";
  const order = searchParams.get("_order") || "desc";
  const status = searchParams.get("status");

  const where: Prisma.SubscriptionWhereInput = {
    ...(status && { status }),
  };

  try {
    const [subscriptions, total] = await Promise.all([
      prisma.subscription.findMany({
        where,
        skip: start,
        take: end - start,
        orderBy: { [sort]: order as Prisma.SortOrder },
        include: { user: { select: { id: true, name: true, email: true } } },
      }),
      prisma.subscription.count({ where }),
    ]);
    return NextResponse.json({ data: subscriptions, total });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch subscriptions" }, { status: 500 });
  }
}
