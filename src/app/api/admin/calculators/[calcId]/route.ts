import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { SLUG_REGISTRY, getEntryById } from "@/engine/v4/slugs/registry";
import fs from "fs";
import path from "path";

// Helper: Read V4 calculator names from index.ts
function readV4Names(calcId: string): Record<string, string> {
  const names: Record<string, string> = {};
  const calcDir = path.join(process.cwd(), "src", "calculators", calcId);
  const indexPath = path.join(calcDir, "index.ts");

  if (!fs.existsSync(indexPath)) return names;

  const content = fs.readFileSync(indexPath, "utf-8");

  // Extract name from each language block: en: { name: "...", or es: { name: "...",
  const langs = ["en", "es", "pt", "fr", "de"];
  for (const lang of langs) {
    // Match pattern like: en: {\n    name: "Body Fat Calculator",
    const blockRegex = new RegExp(`${lang}:\\s*\\{[^}]*?name:\\s*"([^"]+)"`, "s");
    const match = content.match(blockRegex);
    if (match) {
      names[lang] = match[1];
    }
  }

  return names;
}

// Helper: Read names from messages/*.json
function readMessageNames(calcId: string): Record<string, string> {
  const names: Record<string, string> = {};
  const langs = ["en", "es", "pt", "fr", "de"];

  // Find the translation key (camelCase version of id)
  // e.g. "401k-calculator" -> try "401k", "401kCalculator", etc.
  const possibleKeys = getPossibleTranslationKeys(calcId);

  for (const lang of langs) {
    const msgPath = path.join(process.cwd(), "messages", `${lang}.json`);
    if (!fs.existsSync(msgPath)) continue;

    try {
      const msgContent = JSON.parse(fs.readFileSync(msgPath, "utf-8"));
      const calcNames = msgContent?.calculators?.names || {};

      for (const key of possibleKeys) {
        if (calcNames[key]) {
          names[lang] = calcNames[key];
          break;
        }
      }
    } catch {}
  }

  return names;
}

// Helper: Get possible translation keys for a calculator ID
function getPossibleTranslationKeys(calcId: string): string[] {
  const keys: string[] = [];
  // Remove -calculator suffix
  const base = calcId.replace(/-calculator$/, "");

  // camelCase: "caloric-deficit" -> "caloricDeficit"
  const camel = base.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
  keys.push(camel);

  // With "Calculator" suffix: "401kCalculator"
  keys.push(camel + "Calculator");

  // Just the base: "401k"
  keys.push(base);

  // Original id
  keys.push(calcId);

  return keys;
}

// Helper: Find the actual translation key used in messages
function findTranslationKey(calcId: string): string | null {
  const msgPath = path.join(process.cwd(), "messages", "en.json");
  if (!fs.existsSync(msgPath)) return null;

  try {
    const msgContent = JSON.parse(fs.readFileSync(msgPath, "utf-8"));
    const calcNames = msgContent?.calculators?.names || {};
    const possibleKeys = getPossibleTranslationKeys(calcId);

    for (const key of possibleKeys) {
      if (calcNames[key] !== undefined) return key;
    }
  } catch {}

  return null;
}

// GET: Fetch calculator data with real names
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

    // Find in registry
    const entry = getEntryById(calcId) || SLUG_REGISTRY.find(e =>
      e.slugs.en === calcId ||
      e.slugs.en === `${calcId}-calculator` ||
      e.id === calcId.replace("-calculator", "")
    );

    if (!entry) {
      return NextResponse.json({ error: "Calculator not found" }, { status: 404 });
    }

    // Get status from database
    const dbStatus = await prisma.calculatorStatus.findFirst({
      where: {
        OR: [
          { slug: calcId },
          { slug: `${calcId}-calculator` },
          { slug: entry.slugs.en },
        ]
      }
    });

    // Read real names from V4 config file
    const v4Names = readV4Names(entry.id);

    // Read names from messages/*.json as fallback
    const msgNames = readMessageNames(entry.id);

    // Determine the translation key used in messages
    const translationKey = findTranslationKey(entry.id);

    // Priority: V4 config > messages > slug-derived
    const deriveName = (slug: string) => slug.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());

    const names = {
      en: v4Names.en || msgNames.en || deriveName(entry.slugs.en),
      es: v4Names.es || msgNames.es || deriveName(entry.slugs.es),
      pt: v4Names.pt || msgNames.pt || deriveName(entry.slugs.pt || entry.slugs.en),
      fr: v4Names.fr || msgNames.fr || deriveName(entry.slugs.fr || entry.slugs.en),
      de: v4Names.de || msgNames.de || deriveName(entry.slugs.de || entry.slugs.en),
    };

    const data = {
      id: entry.id,
      slug: entry.slugs.en,
      name: names.en,
      category: entry.category,
      isActive: dbStatus?.isActive ?? true,
      translationKey,
      slugs: {
        en: entry.slugs.en,
        es: entry.slugs.es,
        pt: entry.slugs.pt || entry.slugs.en,
        fr: entry.slugs.fr || entry.slugs.en,
        de: entry.slugs.de || entry.slugs.en,
      },
      names,
    };

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching calculator:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// PUT: Update calculator names, slugs, status
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
    const body = await request.json();
    const { slugs, names, isActive } = body;

    // Validate slugs
    const slugRegex = /^[a-z0-9-]+$/;
    for (const [locale, slug] of Object.entries(slugs || {})) {
      if (slug && !slugRegex.test(slug as string)) {
        return NextResponse.json({
          error: `Invalid slug for ${locale}: only lowercase letters, numbers, and hyphens allowed`
        }, { status: 400 });
      }
    }

    // Find entry in registry
    const entry = getEntryById(calcId) || SLUG_REGISTRY.find(e =>
      e.slugs.en === calcId ||
      e.slugs.en === `${calcId}-calculator` ||
      e.id === calcId.replace("-calculator", "")
    );

    if (!entry) {
      return NextResponse.json({ error: "Calculator not found in registry" }, { status: 404 });
    }

    const changes: string[] = [];

    // 1. Update database status
    const existingStatus = await prisma.calculatorStatus.findFirst({
      where: {
        OR: [
          { slug: calcId },
          { slug: `${calcId}-calculator` },
          { slug: entry.slugs.en },
        ]
      }
    });

    if (existingStatus) {
      await prisma.calculatorStatus.update({
        where: { id: existingStatus.id },
        data: { isActive: isActive ?? true },
      });
    } else {
      await prisma.calculatorStatus.create({
        data: { slug: entry.slugs.en, isActive: isActive ?? true },
      });
    }
    changes.push("database status");

    // 2. Update slugs in registry.ts
    if (slugs) {
      const registryPath = path.join(process.cwd(), "src", "engine", "v4", "slugs", "registry.ts");
      if (fs.existsSync(registryPath)) {
        let content = fs.readFileSync(registryPath, "utf-8");

        // Build old and new entry patterns
        const entryRegex = new RegExp(
          `\\{\\s*id:\\s*"${entry.id}"[^}]+slugs:\\s*\\{[^}]+\\}\\s*\\}`,
          "s"
        );

        const match = content.match(entryRegex);
        if (match) {
          const newSlugs = {
            en: slugs.en || entry.slugs.en,
            es: slugs.es || entry.slugs.es,
            pt: slugs.pt || entry.slugs.pt,
            fr: slugs.fr || entry.slugs.fr,
            de: entry.slugs.de || "",
          };

          const newEntry = `{ id: "${entry.id}", category: "${entry.category}", slugs: { en: "${newSlugs.en}", es: "${newSlugs.es}", pt: "${newSlugs.pt}", fr: "${newSlugs.fr}", de: "${newSlugs.de}" } }`;

          content = content.replace(entryRegex, newEntry);
          fs.writeFileSync(registryPath, content, "utf-8");
          changes.push("registry slugs");
        }
      }
    }

    // 3. Update names in V4 calculator file (t.{lang}.name)
    if (names) {
      const calcIndexPath = path.join(process.cwd(), "src", "calculators", entry.id, "index.ts");
      if (fs.existsSync(calcIndexPath)) {
        let content = fs.readFileSync(calcIndexPath, "utf-8");
        let updated = false;

        for (const [lang, newName] of Object.entries(names)) {
          if (!newName) continue;
          // Match: en: {\n    name: "Old Name",
          const nameRegex = new RegExp(
            `(${lang}:\\s*\\{[\\s\\S]*?)name:\\s*"[^"]*"`,
            ""
          );
          if (nameRegex.test(content)) {
            content = content.replace(nameRegex, `$1name: "${newName}"`);
            updated = true;
          }
        }

        if (updated) {
          fs.writeFileSync(calcIndexPath, content, "utf-8");
          changes.push("V4 config names");
        }
      }
    }

    // 4. Update names in messages/*.json
    if (names) {
      const translationKey = findTranslationKey(entry.id);
      if (translationKey) {
        const langFiles: Record<string, string> = { en: "en.json", es: "es.json", pt: "pt.json", fr: "fr.json", de: "de.json" };

        for (const [lang, fileName] of Object.entries(langFiles)) {
          const newName = (names as Record<string, string>)[lang];
          if (!newName) continue;

          const msgPath = path.join(process.cwd(), "messages", fileName);
          if (!fs.existsSync(msgPath)) continue;

          try {
            const msgContent = JSON.parse(fs.readFileSync(msgPath, "utf-8"));
            if (msgContent?.calculators?.names) {
              msgContent.calculators.names[translationKey] = newName;
              fs.writeFileSync(msgPath, JSON.stringify(msgContent, null, 2) + "\n", "utf-8");
            }
          } catch {}
        }
        changes.push("messages/*.json names");
      }
    }

    // 5. Update slug in V4 config t.{lang}.slug
    if (slugs) {
      const calcIndexPath = path.join(process.cwd(), "src", "calculators", entry.id, "index.ts");
      if (fs.existsSync(calcIndexPath)) {
        let content = fs.readFileSync(calcIndexPath, "utf-8");
        let updated = false;

        for (const [lang, newSlug] of Object.entries(slugs)) {
          if (!newSlug) continue;
          const slugFieldRegex = new RegExp(
            `(${lang}:\\s*\\{[\\s\\S]*?)slug:\\s*"[^"]*"`,
            ""
          );
          if (slugFieldRegex.test(content)) {
            content = content.replace(slugFieldRegex, `$1slug: "${newSlug}"`);
            updated = true;
          }
        }

        if (updated) {
          fs.writeFileSync(calcIndexPath, content, "utf-8");
          changes.push("V4 config slugs");
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: "Calculator updated",
      changes,
      isActive,
    });
  } catch (error) {
    console.error("Error updating calculator:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
