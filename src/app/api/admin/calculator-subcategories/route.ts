// src/app/api/admin/calculator-subcategories/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/db";
import { authOptions } from "@/lib/auth";

// GET all subcategories
export async function GET() {
  try {
    const subcategories = await prisma.calculatorSubcategory.findMany({
      orderBy: [{ categoryId: "asc" }, { sortOrder: "asc" }],
    });
    return NextResponse.json(subcategories);
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

// POST create subcategory
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { slug, nameEn, nameEs, namePt, nameFr, nameDe, categoryId, sortOrder } = body;

    if (!slug || !nameEn || !categoryId) {
      return NextResponse.json({ error: "slug, nameEn, and categoryId are required" }, { status: 400 });
    }

    const subcategory = await prisma.calculatorSubcategory.create({
      data: { slug, nameEn, nameEs, namePt, nameFr, nameDe, categoryId, sortOrder: sortOrder || 0 },
    });

    return NextResponse.json(subcategory);
  } catch (error: any) {
    if (error.code === "P2002") {
      return NextResponse.json({ error: "Subcategory slug already exists" }, { status: 400 });
    }
    console.error("Error creating subcategory:", error);
    return NextResponse.json({ error: "Failed to create" }, { status: 500 });
  }
}
