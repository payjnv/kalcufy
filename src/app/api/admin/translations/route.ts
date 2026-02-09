import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { SLUG_REGISTRY } from "@/engine/v4/slugs/registry";
import fs from "fs";
import path from "path";

// Extract a language block from the t: { en: {...}, es: {...} } object
function extractLanguageBlock(content: string, lang: string): string {
  // Find the t: { or t:{ block
  const tIdx = content.search(/\bt:\s*\{/);
  if (tIdx === -1) return "";

  // Within t block, find this language
  const patterns = [`    ${lang}: {`, `  ${lang}: {`, `${lang}: {`];
  let langStart = -1;
  for (const p of patterns) {
    const idx = content.indexOf(p, tIdx);
    if (idx !== -1 && idx < content.length) {
      langStart = idx;
      break;
    }
  }
  if (langStart === -1) return "";

  // Find opening brace
  const braceStart = content.indexOf("{", langStart);
  if (braceStart === -1) return "";

  // Match braces (handle strings properly)
  let depth = 0;
  let inStr = false;
  let esc = false;
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

// Count string values (`: "..."` patterns) in a block
function countStringValues(block: string): number {
  if (!block) return 0;
  const matches = block.match(/:\s*"[^"]*"/g);
  return matches ? matches.length : 0;
}

// Count array string items (`"..."` that are array elements) in a block
function countArrayStrings(block: string): number {
  if (!block) return 0;
  // Match strings inside arrays: items: ["str1", "str2"]
  const arrayMatches = block.match(/\[\s*"[^"]*"/g);
  return arrayMatches ? arrayMatches.length : 0;
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const langs = ["en", "es", "pt", "fr", "de"];
    const calculators = [];

    for (const entry of SLUG_REGISTRY) {
      if (entry.category === "drafts") continue;

      const indexPath = path.join(process.cwd(), "src", "calculators", entry.id, "index.ts");

      if (!fs.existsSync(indexPath)) {
        calculators.push({
          id: entry.id,
          name: entry.slugs.en.replace(/-/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase()),
          category: entry.category,
          hasFile: false,
          locales: Object.fromEntries(langs.map(l => [l, { count: 0, total: 0, percent: 0, status: "missing" as const }])),
        });
        continue;
      }

      const content = fs.readFileSync(indexPath, "utf-8");
      const counts: Record<string, number> = {};

      for (const lang of langs) {
        const block = extractLanguageBlock(content, lang);
        counts[lang] = countStringValues(block);
      }

      const enCount = counts.en || 1;

      const locales: Record<string, { count: number; total: number; percent: number; status: string }> = {};
      for (const lang of langs) {
        const count = counts[lang];
        const percent = enCount > 0 ? Math.round((count / enCount) * 100) : 0;
        locales[lang] = {
          count,
          total: enCount,
          percent: Math.min(percent, 100),
          status: count === 0 ? "missing" : percent >= 90 ? "complete" : "partial",
        };
      }

      // Extract name
      const enBlock = extractLanguageBlock(content, "en");
      const nameMatch = enBlock.match(/name:\s*"([^"]+)"/);
      const name = nameMatch ? nameMatch[1] : entry.slugs.en;

      calculators.push({ id: entry.id, name, category: entry.category, hasFile: true, locales });
    }

    // Stats
    const total = calculators.length;
    const fullyTranslated = calculators.filter(c =>
      langs.every(l => c.locales[l].status === "complete")
    ).length;
    const missing = calculators.filter(c =>
      langs.some(l => c.locales[l].status === "missing")
    ).length;
    const partial = total - fullyTranslated - missing;

    const overallProgress: Record<string, number> = {};
    for (const lang of langs) {
      const totalKeys = calculators.reduce((sum, c) => sum + c.locales[lang].total, 0);
      const doneKeys = calculators.reduce((sum, c) => sum + c.locales[lang].count, 0);
      overallProgress[lang] = totalKeys > 0 ? Math.round((doneKeys / totalKeys) * 100) : 0;
    }

    return NextResponse.json({
      totalCalculators: total,
      fullyTranslated,
      partiallyTranslated: partial,
      missingTranslations: missing,
      overallProgress,
      calculators,
    });
  } catch (error) {
    console.error("Translation stats error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

