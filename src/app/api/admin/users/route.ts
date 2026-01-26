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
    const end = parseInt(searchParams.get("_end") || "10");
    const sort = searchParams.get("_sort") || "createdAt";
    const order = searchParams.get("_order") || "desc";
    const search = searchParams.get("q") || "";
    const isPro = searchParams.get("isPro");

    // Build where clause
    const where: any = {};
    
    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
      ];
    }
    
    if (isPro !== null && isPro !== undefined) {
      where.isPro = isPro === "true";
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip: start,
        take: end - start,
        orderBy: { [sort]: order },
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          isPro: true,
          role: true,
          createdAt: true,
          _count: {
            select: { 
              history: true,
              favorites: true,
            },
          },
        },
      }),
      prisma.user.count({ where }),
    ]);

    return NextResponse.json({
      data: users,
      total,
    });
  } catch (error) {
    console.error("Users GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    
    const user = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        isPro: body.isPro || false,
        role: body.role || "USER",
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Users POST error:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
