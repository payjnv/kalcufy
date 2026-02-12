// src/app/api/admin/mark-owner/route.ts
// ═══════════════════════════════════════════════════
// Visit this URL once on any device to stop tracking your visits
// URL: https://www.kalcufy.com/api/admin/mark-owner?key=kalcufy2024owner
// ═══════════════════════════════════════════════════
import { NextRequest, NextResponse } from "next/server";

const SECRET_KEY = "kalcufy2024owner";

export async function GET(request: NextRequest) {
  const key = request.nextUrl.searchParams.get("key");

  if (key !== SECRET_KEY) {
    return NextResponse.json({ error: "Invalid key" }, { status: 403 });
  }

  const response = NextResponse.json({
    success: true,
    message: "✅ Owner cookie set! Your visits will no longer be tracked.",
    device: request.headers.get("user-agent")?.slice(0, 50),
    expires: "1 year",
  });

  // Set cookie for 1 year, works on all paths
  response.cookies.set("kalcufy_owner", "1", {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 year
  });

  return response;
}
