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
  const read = searchParams.get("read");
  const replied = searchParams.get("replied");

  const where: Prisma.ContactMessageWhereInput = {
    ...(read !== null && read !== undefined && { read: read === "true" }),
    ...(replied !== null && replied !== undefined && { replied: replied === "true" }),
  };

  try {
    const [messages, total] = await Promise.all([
      prisma.contactMessage.findMany({
        where,
        skip: start,
        take: end - start,
        orderBy: { createdAt: "desc" },
      }),
      prisma.contactMessage.count({ where }),
    ]);
    return NextResponse.json({ data: messages, total });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}
