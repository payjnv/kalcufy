import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import fs from "fs";
import path from "path";

const SETTINGS_PATH = path.join(process.cwd(), "src", "config", "site-settings.json");

const DEFAULT_SETTINGS = {
  site: {
    name: "Kalcufy",
    tagline: "Free Online Calculators",
    url: "https://kalcufy.com",
    logo: "/favicon.png",
    favicon: "/favicon.ico",
  },
  seo: {
    titleTemplate: "%s | Kalcufy - Free Online Calculators",
    defaultTitle: "Kalcufy - Free Online Calculators for Finance, Health & More",
    defaultDescription: "Free online calculators for finance, health, math and everyday use. Professional tools with multi-language support.",
    defaultOgImage: "/og-default.png",
    defaultLocale: "en",
    canonicalBase: "https://kalcufy.com",
  },
  google: {
    searchConsoleId: "",
    analyticsId: "",
    adsenseId: "",
    tagManagerId: "",
  },
  social: {
    twitter: "",
    facebook: "",
    linkedin: "",
    github: "",
    youtube: "",
  },
  schema: {
    organizationName: "Kalcufy",
    organizationLogo: "https://kalcufy.com/favicon.png",
    contactEmail: "",
    foundingDate: "2024",
    sameAs: [],
  },
  robots: {
    allowAll: true,
    disallowPaths: ["/admin", "/api", "/auth"],
    customRules: "",
  },
  sitemap: {
    autoGenerate: true,
    changeFrequency: "weekly",
    priority: "0.8",
    excludePaths: ["/admin", "/auth"],
  },
  indexing: {
    noindexDrafts: true,
    noindexPagination: false,
    forceTrailingSlash: false,
    hreflangEnabled: true,
    activeLanguages: ["en", "es", "pt", "fr"],
  },
};

function loadSettings(): typeof DEFAULT_SETTINGS {
  try {
    if (fs.existsSync(SETTINGS_PATH)) {
      const raw = fs.readFileSync(SETTINGS_PATH, "utf-8");
      const saved = JSON.parse(raw);
      return deepMerge(DEFAULT_SETTINGS, saved);
    }
  } catch (e) {
    console.error("Error loading settings:", e);
  }
  return DEFAULT_SETTINGS;
}

function saveSettings(settings: typeof DEFAULT_SETTINGS): void {
  const dir = path.dirname(SETTINGS_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(SETTINGS_PATH, JSON.stringify(settings, null, 2), "utf-8");
}

function deepMerge(target: Record<string, unknown>, source: Record<string, unknown>): typeof DEFAULT_SETTINGS {
  const result = { ...target };
  for (const key of Object.keys(source)) {
    if (
      source[key] &&
      typeof source[key] === "object" &&
      !Array.isArray(source[key]) &&
      target[key] &&
      typeof target[key] === "object" &&
      !Array.isArray(target[key])
    ) {
      result[key] = deepMerge(
        target[key] as Record<string, unknown>,
        source[key] as Record<string, unknown>
      );
    } else {
      result[key] = source[key];
    }
  }
  return result as typeof DEFAULT_SETTINGS;
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const settings = loadSettings();
    return NextResponse.json(settings);
  } catch (error) {
    console.error("Settings GET error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const current = loadSettings();
    const merged = deepMerge(current as unknown as Record<string, unknown>, body);
    saveSettings(merged);

    return NextResponse.json({ success: true, settings: merged });
  } catch (error) {
    console.error("Settings PUT error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

