// src/app/api/track/route.ts
// ═══════════════════════════════════════════════════════════════
// TRACKING API — With city-level geolocation via Vercel headers
// ═══════════════════════════════════════════════════════════════
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// ── Country code → full name ──
const COUNTRY_NAMES: Record<string, string> = {
  US: "United States", CA: "Canada", MX: "Mexico", BR: "Brazil", AR: "Argentina",
  CO: "Colombia", CL: "Chile", PE: "Peru", VE: "Venezuela", EC: "Ecuador",
  UY: "Uruguay", PY: "Paraguay", BO: "Bolivia", CR: "Costa Rica", PA: "Panama",
  DO: "Dominican Republic", GT: "Guatemala", HN: "Honduras", SV: "El Salvador",
  NI: "Nicaragua", CU: "Cuba", PR: "Puerto Rico", TT: "Trinidad and Tobago",
  GB: "United Kingdom", DE: "Germany", FR: "France", ES: "Spain", IT: "Italy",
  PT: "Portugal", NL: "Netherlands", BE: "Belgium", CH: "Switzerland", AT: "Austria",
  SE: "Sweden", NO: "Norway", DK: "Denmark", FI: "Finland", IE: "Ireland",
  PL: "Poland", CZ: "Czech Republic", RO: "Romania", GR: "Greece", HU: "Hungary",
  RU: "Russia", UA: "Ukraine", TR: "Turkey",
  CN: "China", JP: "Japan", KR: "South Korea", IN: "India", ID: "Indonesia",
  TH: "Thailand", VN: "Vietnam", PH: "Philippines", MY: "Malaysia", SG: "Singapore",
  TW: "Taiwan", HK: "Hong Kong", PK: "Pakistan", BD: "Bangladesh", LK: "Sri Lanka",
  AU: "Australia", NZ: "New Zealand",
  ZA: "South Africa", NG: "Nigeria", EG: "Egypt", KE: "Kenya", GH: "Ghana",
  MA: "Morocco", TN: "Tunisia", DZ: "Algeria",
  SA: "Saudi Arabia", AE: "UAE", IL: "Israel", QA: "Qatar", KW: "Kuwait",
};

// ── Localhost detection ──
function isLocalhost(request: NextRequest): boolean {
  // In Vercel production, never localhost
  if (process.env.VERCEL_ENV === "production") return false;
  if (process.env.NODE_ENV === "production" && process.env.VERCEL) return false;

  const forwardedFor = request.headers.get("x-forwarded-for") || "";
  const realIp = request.headers.get("x-real-ip") || "";
  const host = request.headers.get("host") || "";

  const localhostIPs = ["127.0.0.1", "::1", "localhost"];
  const isLocalIP = localhostIPs.some(ip => forwardedFor.includes(ip) || realIp.includes(ip));
  const isLocalHost = host.includes("localhost") || host.includes("127.0.0.1");

  return isLocalIP || isLocalHost;
}

// ── Device detection ──
function getDevice(ua: string): string {
  if (/iPad|Android(?!.*Mobile)/i.test(ua)) return "tablet";
  if (/Mobile|Android|iPhone|iPod/i.test(ua)) return "mobile";
  return "desktop";
}

// ═══════════════════════════════════════════════════════════════
// POST /api/track
// ═══════════════════════════════════════════════════════════════
export async function POST(request: NextRequest) {
  try {
    // ── Block localhost ──
    if (isLocalhost(request)) {
      return NextResponse.json({ success: true, skipped: "localhost" });
    }

    // ── Block owner IP (your home network) ──
    const fwdFor = request.headers.get("x-forwarded-for") || "";
    const realIp = request.headers.get("x-real-ip") || "";
    if (fwdFor.includes("2600:4040:96ba:e00") || realIp.includes("2600:4040:96ba:e00")) {
      return NextResponse.json({ success: true, skipped: "owner" });
    }

    // ── Parse body ──
    const body = await request.json();
    const { calculatorSlug, language, type = "VIEW", sessionId } = body;

    if (!calculatorSlug) {
      return NextResponse.json({ error: "Missing calculatorSlug" }, { status: 400 });
    }

    // ── Device ──
    const userAgent = request.headers.get("user-agent") || "";
    const device = getDevice(userAgent);

    // ── Validate type ──
    const trackingType = type === "CALCULATION" ? "CALCULATION" : "VIEW";

    // ═══════════════════════════════════════════════════════════
    // 🆕 GEOLOCATION — Vercel free headers (no external API!)
    // These headers are injected automatically by Vercel Edge
    // In dev/localhost they don't exist → fields will be null
    // ═══════════════════════════════════════════════════════════
    const countryCode = request.headers.get("x-vercel-ip-country");
    const country = countryCode && countryCode !== "XX"
      ? (COUNTRY_NAMES[countryCode] || countryCode)
      : null;
    const city = request.headers.get("x-vercel-ip-city") || null;
    const region = request.headers.get("x-vercel-ip-country-region") || null;
    const latStr = request.headers.get("x-vercel-ip-latitude");
    const lngStr = request.headers.get("x-vercel-ip-longitude");
    const latitude = latStr ? parseFloat(latStr) : null;
    const longitude = lngStr ? parseFloat(lngStr) : null;

    // ── Save to DB ──
    await prisma.calculatorUsage.create({
      data: {
        calculatorSlug,
        language: language || "en",
        type: trackingType,
        sessionId: sessionId || null,
        device,
        country,
        city,        // 🆕
        region,      // 🆕
        latitude,    // 🆕
        longitude,   // 🆕
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error tracking:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
