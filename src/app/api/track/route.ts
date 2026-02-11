// src/app/api/track/route.ts
// ═══════════════════════════════════════════════════════════════
// TRACKING API V2 — GOD MODE
// Captures: geo (country/city/region/coords), device, browser,
// OS, referrer, page path, session duration, language
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
  if (process.env.VERCEL_ENV === "production") return false;
  if (process.env.NODE_ENV === "production" && process.env.VERCEL) return false;
  const forwardedFor = request.headers.get("x-forwarded-for") || "";
  const realIp = request.headers.get("x-real-ip") || "";
  const host = request.headers.get("host") || "";
  const localhostIPs = ["127.0.0.1", "::1", "localhost"];
  return localhostIPs.some(ip => forwardedFor.includes(ip) || realIp.includes(ip)) ||
    host.includes("localhost") || host.includes("127.0.0.1");
}

// ── Device detection ──
function getDevice(ua: string): string {
  if (/iPad|Android(?!.*Mobile)/i.test(ua)) return "tablet";
  if (/Mobile|Android|iPhone|iPod/i.test(ua)) return "mobile";
  return "desktop";
}

// ── Browser detection ──
function getBrowser(ua: string): string {
  if (/Edg\//i.test(ua)) return "Edge";
  if (/OPR\/|Opera/i.test(ua)) return "Opera";
  if (/SamsungBrowser/i.test(ua)) return "Samsung";
  if (/UCBrowser/i.test(ua)) return "UC Browser";
  if (/Firefox/i.test(ua)) return "Firefox";
  if (/CriOS|Chrome/i.test(ua)) return "Chrome";
  if (/Safari/i.test(ua)) return "Safari";
  if (/bot|crawl|spider|slurp/i.test(ua)) return "Bot";
  return "Other";
}

// ── OS detection ──
function getOS(ua: string): string {
  if (/Windows NT 10/i.test(ua)) return "Windows 10+";
  if (/Windows/i.test(ua)) return "Windows";
  if (/Mac OS X/i.test(ua)) return "macOS";
  if (/CrOS/i.test(ua)) return "ChromeOS";
  if (/Android/i.test(ua)) return "Android";
  if (/iPhone|iPad|iPod/i.test(ua)) return "iOS";
  if (/Linux/i.test(ua)) return "Linux";
  if (/bot|crawl|spider/i.test(ua)) return "Bot";
  return "Other";
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

    // ── Block bots ──
    const userAgent = request.headers.get("user-agent") || "";
    if (/bot|crawl|spider|slurp|googlebot|bingbot|yandex|baidu/i.test(userAgent)) {
      return NextResponse.json({ success: true, skipped: "bot" });
    }

    // ── Block owner IP ──
    const fwdFor = request.headers.get("x-forwarded-for") || "";
    const realIp = request.headers.get("x-real-ip") || "";
    if (fwdFor.includes("2600:4040:96ba:e00") || realIp.includes("2600:4040:96ba:e00")) {
      return NextResponse.json({ success: true, skipped: "owner" });
    }

    // ── Parse body ──
    const body = await request.json();
    const { calculatorSlug, language, type = "VIEW", sessionId, referrer, pagePath, durationSeconds } = body;

    if (!calculatorSlug) {
      return NextResponse.json({ error: "Missing calculatorSlug" }, { status: 400 });
    }

    // ── Device / Browser / OS ──
    const device = getDevice(userAgent);
    const browser = getBrowser(userAgent);
    const os = getOS(userAgent);

    // ── Validate type ──
    const trackingType = type === "CALCULATION" ? "CALCULATION" : "VIEW";

    // ── Geolocation (Vercel free headers) ──
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

    // ── Referrer from header (fallback) ──
    const headerReferer = request.headers.get("referer") || null;
    const finalReferrer = referrer || headerReferer || null;

    // ── Clean referrer (extract domain only for external) ──
    let cleanReferrer: string | null = null;
    if (finalReferrer) {
      try {
        const url = new URL(finalReferrer);
        if (!url.hostname.includes("kalcufy.com") && !url.hostname.includes("localhost")) {
          cleanReferrer = url.hostname.replace("www.", "");
        }
      } catch {
        cleanReferrer = finalReferrer.slice(0, 100);
      }
    }

    // ── Save to DB ──
    await prisma.calculatorUsage.create({
      data: {
        calculatorSlug,
        language: language || "en",
        type: trackingType,
        sessionId: sessionId || null,
        device,
        browser,
        os,
        country,
        countryCode: countryCode || null,
        city,
        region,
        latitude,
        longitude,
        referrer: cleanReferrer,
        pagePath: pagePath || null,
        durationSeconds: durationSeconds ? Math.min(durationSeconds, 3600) : null,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error tracking:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
