import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { cookies } from "next/headers";

// GET - Obtener rating promedio y count
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ error: "Missing slug" }, { status: 400 });
    }

    // Get session for user's own rating
    const session = await getServerSession(authOptions);
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("calc-session-id")?.value;

    // Get aggregate stats
    const stats = await prisma.calculatorRating.aggregate({
      where: { calculatorSlug: slug },
      _avg: { rating: true },
      _count: { rating: true },
    });

    // Get user's rating if logged in
    let userRating = null;
    if (session?.user?.id) {
      const existing = await prisma.calculatorRating.findUnique({
        where: {
          calculatorSlug_userId: {
            calculatorSlug: slug,
            userId: session.user.id,
          },
        },
      });
      userRating = existing?.rating || null;
    } else if (sessionId) {
      // Check by session for anonymous users
      const existing = await prisma.calculatorRating.findFirst({
        where: {
          calculatorSlug: slug,
          sessionId: sessionId,
        },
      });
      userRating = existing?.rating || null;
    }

    return NextResponse.json({
      average: stats._avg.rating || 0,
      count: stats._count.rating || 0,
      userRating,
    });
  } catch (error) {
    console.error("Error fetching rating:", error);
    return NextResponse.json({ error: "Failed to fetch rating" }, { status: 500 });
  }
}

// POST - Guardar rating
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, rating } = body;

    if (!slug || !rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const session = await getServerSession(authOptions);
    const cookieStore = await cookies();
    let sessionId = cookieStore.get("calc-session-id")?.value;

    // Generate session ID for anonymous users
    if (!session?.user?.id && !sessionId) {
      sessionId = crypto.randomUUID();
      // Note: Cookie will be set on client side
    }

    if (session?.user?.id) {
      // Logged in user - upsert by userId
      await prisma.calculatorRating.upsert({
        where: {
          calculatorSlug_userId: {
            calculatorSlug: slug,
            userId: session.user.id,
          },
        },
        update: { rating },
        create: {
          calculatorSlug: slug,
          userId: session.user.id,
          rating,
        },
      });
    } else if (sessionId) {
      // Anonymous user - check if already rated
      const existing = await prisma.calculatorRating.findFirst({
        where: {
          calculatorSlug: slug,
          sessionId: sessionId,
        },
      });

      if (existing) {
        await prisma.calculatorRating.update({
          where: { id: existing.id },
          data: { rating },
        });
      } else {
        await prisma.calculatorRating.create({
          data: {
            calculatorSlug: slug,
            sessionId: sessionId,
            rating,
          },
        });
      }
    }

    // Get updated stats
    const stats = await prisma.calculatorRating.aggregate({
      where: { calculatorSlug: slug },
      _avg: { rating: true },
      _count: { rating: true },
    });

    return NextResponse.json({
      success: true,
      average: stats._avg.rating || 0,
      count: stats._count.rating || 0,
      userRating: rating,
      sessionId: !session?.user?.id ? sessionId : undefined,
    });
  } catch (error) {
    console.error("Error saving rating:", error);
    return NextResponse.json({ error: "Failed to save rating" }, { status: 500 });
  }
}
