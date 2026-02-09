import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// POST /api/newsletter/subscribe - Public endpoint
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, language = "en", source = "blog" } = body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Upsert - if exists reactivate, if new create
    await prisma.newsletter.upsert({
      where: { email: email.toLowerCase().trim() },
      update: { isActive: true, language, source, updatedAt: new Date() },
      create: {
        email: email.toLowerCase().trim(),
        language,
        source,
        isActive: true,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter subscribe error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
