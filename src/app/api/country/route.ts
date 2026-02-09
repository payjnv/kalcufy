// src/app/api/country/route.ts
// =============================================================================
// API: Get/Set user's country preference
// GET → returns current country from cookie
// POST { country: "MX" } → sets cookie + updates user profile if logged in
// =============================================================================

import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { COUNTRY_COOKIE, COUNTRY_CONFIGS } from "@/lib/country-config";

const COOKIE_MAX_AGE = 365 * 24 * 60 * 60; // 1 year

// GET: Return current country
export async function GET(request: NextRequest) {
  const country = request.cookies.get(COUNTRY_COOKIE)?.value || "US";
  return NextResponse.json({ country });
}

// POST: Update country preference
export async function POST(request: NextRequest) {
  try {
    const { country } = await request.json();
    
    // Validate country code
    const code = (country || "US").toUpperCase();
    if (code.length !== 2) {
      return NextResponse.json({ error: "Invalid country code" }, { status: 400 });
    }

    // Set cookie
    const response = NextResponse.json({ country: code, success: true });
    response.cookies.set(COUNTRY_COOKIE, code, {
      path: "/",
      maxAge: COOKIE_MAX_AGE,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });

    // If user is logged in, save to their profile
    try {
      const session = await getServerSession(authOptions);
      if (session?.user?.email) {
        await prisma.user.update({
          where: { email: session.user.email },
          data: { country: code },
        });
      }
    } catch {
      // DB update failed — cookie still set, not critical
    }

    return response;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
