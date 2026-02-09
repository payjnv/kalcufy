import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { cookies } from "next/headers";

/**
 * Normalize calculator slug to ensure consistent ratings across all languages
 * Removes locale prefixes and standardizes the slug
 * 
 * Examples:
 * - "es/bmi-calculator" → "bmi-calculator"
 * - "pt/calculadora-imc" → "bmi-calculator" (if mapped)
 * - "bmi-calculator" → "bmi-calculator"
 * - "calculadora-prestamo-auto" → "auto-loan-calculator"
 */
function normalizeSlug(slug: string): string {
  // Remove any locale prefix (e.g., "es/", "pt/", "en/", "fr/")
  let normalized = slug.replace(/^(en|es|pt|fr|de)\//i, "");
  
  // Map Spanish slugs to English base slugs for consistency
  const slugMap: Record<string, string> = {
    // Auto loan
    "calculadora-prestamo-auto": "auto-loan-calculator",
    "calculadora-prestamo-carro": "auto-loan-calculator",
    // BMI
    "calculadora-imc": "bmi-calculator",
    "calculadora-indice-masa-corporal": "bmi-calculator",
    // Body fat
    "calculadora-grasa-corporal": "body-fat-calculator",
    // Ideal weight
    "calculadora-peso-ideal": "ideal-weight-calculator",
    // Calorie
    "calculadora-calorias": "calorie-calculator",
    // TDEE
    "calculadora-tdee": "tdee-calculator",
    // Macro
    "calculadora-macros": "macro-calculator",
    // Pregnancy
    "calculadora-embarazo": "pregnancy-calculator",
    // Due date
    "calculadora-fecha-parto": "due-date-calculator",
    // Ovulation
    "calculadora-ovulacion": "ovulation-calculator",
    // BMR
    "calculadora-bmr": "bmr-calculator",
    "calculadora-metabolismo-basal": "bmr-calculator",
    // Mortgage
    "calculadora-hipoteca": "mortgage-calculator",
    // Compound interest
    "calculadora-interes-compuesto": "compound-interest-calculator",
    // Loan
    "calculadora-prestamo": "loan-calculator",
    // Savings
    "calculadora-ahorro": "savings-calculator",
    // Tip
    "calculadora-propina": "tip-calculator",
    // Percentage
    "calculadora-porcentaje": "percentage-calculator",
    // Age
    "calculadora-edad": "age-calculator",
    // Date
    "calculadora-fecha": "date-calculator",
    // GPA
    "calculadora-gpa": "gpa-calculator",
    // Grade
    "calculadora-notas": "grade-calculator",
    // Scientific
    "calculadora-cientifica": "scientific-calculator",
    // Fraction
    "calculadora-fracciones": "fraction-calculator",
    // Quadratic
    "calculadora-ecuacion-cuadratica": "quadratic-calculator",
    // Portuguese mappings
    "calculadora-emprestimo-auto": "auto-loan-calculator",
    "calculadora-indice-massa-corporal": "bmi-calculator",
    "calculadora-gordura-corporal": "body-fat-calculator",
    // French mappings
    "calculatrice-pret-auto": "auto-loan-calculator",
    "calculateur-imc": "bmi-calculator",
  };
  
  // Check if we have a mapping
  if (slugMap[normalized]) {
    return slugMap[normalized];
  }
  
  // Return as-is (already in English format)
  return normalized;
}

// GET - Obtener rating promedio y count
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const rawSlug = searchParams.get("slug");

    if (!rawSlug) {
      return NextResponse.json({ error: "Missing slug" }, { status: 400 });
    }

    // Normalize slug for consistent ratings across languages
    const slug = normalizeSlug(rawSlug);

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
    const { slug: rawSlug, rating } = body;

    if (!rawSlug || !rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    // Normalize slug for consistent ratings across languages
    const slug = normalizeSlug(rawSlug);

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
