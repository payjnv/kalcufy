import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { SLUG_REGISTRY, getEntryById } from "@/engine/v4/slugs/registry";
import fs from "fs";
import path from "path";

function extractLanguageBlock(content: string, lang: string): string {
  const tIdx = content.search(/\bt:\s*\{/);
  if (tIdx === -1) return "";
  const patterns = [`    ${lang}: {`, `  ${lang}: {`, `${lang}: {`];
  let langStart = -1;
  for (const p of patterns) {
    const idx = content.indexOf(p, tIdx);
    if (idx !== -1) { langStart = idx; break; }
  }
  if (langStart === -1) return "";
  const braceStart = content.indexOf("{", langStart);
  if (braceStart === -1) return "";
  let depth = 0, inStr = false, esc = false;
  for (let i = braceStart; i < content.length; i++) {
    const ch = content[i];
    if (esc) { esc = false; continue; }
    if (ch === "\\") { esc = true; continue; }
    if (ch === '"') { inStr = !inStr; continue; }
    if (inStr) continue;
    if (ch === "{") depth++;
    if (ch === "}") { depth--; if (depth === 0) return content.slice(braceStart, i + 1); }
  }
  return "";
}

function parseBlock(block: string): Record<string, unknown> | null {
  if (!block) return null;
  try {
    const fn = new Function(`return (${block})`);
    return fn() as Record<string, unknown>;
  } catch {
    return null;
  }
}

function flattenObject(obj: unknown, prefix = ""): Record<string, string> {
  const result: Record<string, string> = {};
  if (Array.isArray(obj)) {
    obj.forEach((item, i) => {
      const key = prefix ? `${prefix}[${i}]` : `[${i}]`;
      if (typeof item === "object" && item !== null) {
        Object.assign(result, flattenObject(item, key));
      } else {
        result[key] = String(item ?? "");
      }
    });
  } else if (typeof obj === "object" && obj !== null) {
    for (const [key, value] of Object.entries(obj)) {
      const newKey = prefix ? `${prefix}.${key}` : key;
      if (typeof value === "object" && value !== null) {
        Object.assign(result, flattenObject(value, newKey));
      } else {
        result[newKey] = String(value ?? "");
      }
    }
  }
  return result;
}

// Group translation keys by section for better organization
function getSection(key: string): string {
  const first = key.split(".")[0].split("[")[0];
  const sections: Record<string, string> = {
    name: "Basic Info", slug: "Basic Info", subtitle: "Basic Info", breadcrumb: "Basic Info",
    seo: "SEO", calculator: "UI", ui: "UI",
    inputs: "Inputs", inputGroups: "Input Groups",
    results: "Results", tooltips: "Tooltips",
    presets: "Presets", values: "Dynamic Values", formats: "Formats",
    infoCards: "Info Cards", referenceData: "Reference Data",
    education: "Education", faqs: "FAQs",
    rating: "Boilerplate", common: "Boilerplate", buttons: "Boilerplate",
    share: "Boilerplate", accessibility: "Boilerplate", sources: "Boilerplate",
  };
  return sections[first] || "Other";
}

// GET: Detailed translation comparison for one calculator
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ calcId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { calcId } = await params;
    const { searchParams } = new URL(request.url);
    const targetLang = searchParams.get("lang") || "es";

    const entry = getEntryById(calcId) || SLUG_REGISTRY.find(e => e.id === calcId);
    if (!entry) {
      return NextResponse.json({ error: "Calculator not found" }, { status: 404 });
    }

    const indexPath = path.join(process.cwd(), "src", "calculators", entry.id, "index.ts");
    if (!fs.existsSync(indexPath)) {
      return NextResponse.json({ error: "Calculator file not found" }, { status: 404 });
    }

    const content = fs.readFileSync(indexPath, "utf-8");

    const enBlock = extractLanguageBlock(content, "en");
    const targetBlock = extractLanguageBlock(content, targetLang);

    const enObj = parseBlock(enBlock);
    const targetObj = parseBlock(targetBlock);

    if (!enObj) {
      return NextResponse.json({ error: "Could not parse English translations" }, { status: 500 });
    }

    const enFlat = flattenObject(enObj);
    const targetFlat = targetObj ? flattenObject(targetObj) : {};

    // Build comparison grouped by section
    const keys = Object.keys(enFlat);
    const translations = keys.map(key => ({
      key,
      section: getSection(key),
      en: enFlat[key] || "",
      target: targetFlat[key] || "",
      status: targetFlat[key] ? ("translated" as const) : ("missing" as const),
    }));

    const translated = translations.filter(t => t.status === "translated").length;

    // Group by section
    const sections: Record<string, typeof translations> = {};
    for (const t of translations) {
      if (!sections[t.section]) sections[t.section] = [];
      sections[t.section].push(t);
    }

    // Available languages
    const langs = ["en", "es", "pt", "fr", "de"];
    const available = langs.filter(l => {
      const block = extractLanguageBlock(content, l);
      return block.length > 10;
    });

    return NextResponse.json({
      id: entry.id,
      name: enFlat.name || entry.slugs.en,
      category: entry.category,
      targetLang,
      availableLanguages: available,
      totalKeys: keys.length,
      translatedKeys: translated,
      missingKeys: keys.length - translated,
      percent: keys.length > 0 ? Math.round((translated / keys.length) * 100) : 0,
      sections,
    });
  } catch (error) {
    console.error("Translation detail error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PUT: Update translations for a specific language
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ calcId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { calcId } = await params;
    const { lang, updates } = await request.json();

    if (!lang || !updates || typeof updates !== "object") {
      return NextResponse.json({ error: "Invalid request: need lang and updates" }, { status: 400 });
    }

    const entry = getEntryById(calcId) || SLUG_REGISTRY.find(e => e.id === calcId);
    if (!entry) {
      return NextResponse.json({ error: "Calculator not found" }, { status: 404 });
    }

    const indexPath = path.join(process.cwd(), "src", "calculators", entry.id, "index.ts");
    if (!fs.existsSync(indexPath)) {
      return NextResponse.json({ error: "Calculator file not found" }, { status: 404 });
    }

    let content = fs.readFileSync(indexPath, "utf-8");
    let updatedCount = 0;

    // For each update, find and replace the old value with the new one
    for (const [, newValue] of Object.entries(updates as Record<string, string>)) {
      if (!newValue || typeof newValue !== "string") continue;
      // We update by replacing old string values with new ones
      // This is a simple approach - find the exact old value and replace it
      updatedCount++;
    }

    // Safer approach: extract, parse, modify, serialize, replace the entire lang block
    const oldBlock = extractLanguageBlock(content, lang);
    if (!oldBlock) {
      return NextResponse.json({ error: `Language block '${lang}' not found` }, { status: 404 });
    }

    const parsed = parseBlock(oldBlock);
    if (!parsed) {
      return NextResponse.json({ error: "Could not parse language block" }, { status: 500 });
    }

    // Apply updates using dot notation
    for (const [keyPath, newValue] of Object.entries(updates as Record<string, string>)) {
      setNestedValue(parsed, keyPath, newValue);
      updatedCount++;
    }

    // Serialize back to TypeScript-compatible format
    const newBlock = serializeToTS(parsed, 6);

    // Replace old block with new block
    content = content.replace(oldBlock, newBlock);
    fs.writeFileSync(indexPath, content, "utf-8");

    return NextResponse.json({
      success: true,
      updatedCount,
      message: `Updated ${updatedCount} translations for ${lang}`,
    });
  } catch (error) {
    console.error("Translation update error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Set nested value using dot/bracket notation
function setNestedValue(obj: Record<string, unknown>, keyPath: string, value: string): void {
  // Handle paths like: "education.whatIs.title" or "faqs[0].question"
  const parts = keyPath.replace(/\[(\d+)\]/g, ".$1").split(".");
  let current: Record<string, unknown> = obj;

  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    if (!(part in current) || typeof current[part] !== "object" || current[part] === null) {
      // Check if next part is a number (array index)
      const nextPart = parts[i + 1];
      if (/^\d+$/.test(nextPart)) {
        current[part] = [];
      } else {
        current[part] = {};
      }
    }
    current = current[part] as Record<string, unknown>;
  }

  const lastPart = parts[parts.length - 1];
  current[lastPart] = value;
}

// Serialize object to TypeScript format
function serializeToTS(obj: unknown, indent: number): string {
  const pad = " ".repeat(indent);
  const inner = " ".repeat(indent + 2);

  if (typeof obj === "string") {
    return `"${obj.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n")}"`;
  }
  if (typeof obj === "number" || typeof obj === "boolean") return String(obj);
  if (obj === null || obj === undefined) return '""';

  if (Array.isArray(obj)) {
    if (obj.length === 0) return "[]";
    // Check if simple string array
    if (obj.every(item => typeof item === "string")) {
      const items = obj.map(item => `${inner}${serializeToTS(item, indent + 2)}`);
      return `[\n${items.join(",\n")},\n${pad}]`;
    }
    const items = obj.map(item => `${inner}${serializeToTS(item, indent + 2)}`);
    return `[\n${items.join(",\n")},\n${pad}]`;
  }

  if (typeof obj === "object") {
    const entries = Object.entries(obj as Record<string, unknown>);
    if (entries.length === 0) return "{}";
    const lines = entries.map(([key, value]) => {
      const needsQuotes = /[^a-zA-Z0-9_$]/.test(key) || /^\d/.test(key);
      const fmtKey = needsQuotes ? `"${key}"` : key;
      return `${inner}${fmtKey}: ${serializeToTS(value, indent + 2)}`;
    });
    return `{\n${lines.join(",\n")},\n${pad}}`;
  }

  return '""';
}

