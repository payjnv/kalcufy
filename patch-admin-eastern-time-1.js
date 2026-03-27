/**
 * patch-admin-eastern-time.js
 * Forces all admin panel dates to display in Eastern Time (America/New_York)
 * 
 * Run from project root:
 *   node patch-admin-eastern-time.js
 */

const fs = require("fs");
const path = require("path");

const ADMIN = "src/app/[locale]/admin";

const replacements = [
  // ── 1. messages/page.tsx ──
  {
    file: `${ADMIN}/messages/page.tsx`,
    changes: [
      {
        old: `{new Date(message.createdAt).toLocaleDateString()}`,
        new: `{new Date(message.createdAt).toLocaleDateString("en-US", { timeZone: "America/New_York", month: "short", day: "numeric", year: "numeric" })}`,
      },
      {
        old: `{new Date(selectedMessage.createdAt).toLocaleString()}`,
        new: `{new Date(selectedMessage.createdAt).toLocaleString("en-US", { timeZone: "America/New_York", month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit", hour12: true })}`,
      },
    ],
  },

  // ── 2. contact-messages/page.tsx ──
  {
    file: `${ADMIN}/contact-messages/page.tsx`,
    changes: [
      {
        old: `{new Date(message.createdAt).toLocaleDateString()}`,
        new: `{new Date(message.createdAt).toLocaleDateString("en-US", { timeZone: "America/New_York", month: "short", day: "numeric", year: "numeric" })}`,
      },
      {
        old: `{new Date(selectedMessage.createdAt).toLocaleString()}`,
        new: `{new Date(selectedMessage.createdAt).toLocaleString("en-US", { timeZone: "America/New_York", month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit", hour12: true })}`,
      },
    ],
  },

  // ── 3. deep-analytics/page.tsx ──
  {
    file: `${ADMIN}/deep-analytics/page.tsx`,
    changes: [
      {
        // timeAgo uses Date.now() which is UTC millis — the diff is timezone-agnostic, so it's fine.
        // But we patch the helper comment for clarity. No functional change needed here.
        // We only need to ensure any absolute date displays use ET.
        // Currently timeAgo returns relative ("5m", "2h", "3d") — no patch needed.
        old: null, // skip
        new: null,
      },
    ],
  },

  // ── 4. blog/1adminpage.tsx ──
  {
    file: `${ADMIN}/blog/1adminpage.tsx`,
    changes: [
      {
        old: `  const formatDate = (date: string | null) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });`,
        new: `  const formatDate = (date: string | null) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-US", {
      timeZone: "America/New_York",
      month: "short",
      day: "numeric",
      year: "numeric",
    });`,
      },
    ],
  },

  // ── 5. blog/page.tsx ──
  {
    file: `${ADMIN}/blog/page.tsx`,
    changes: [
      {
        old: `    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });`,
        new: `    return d.toLocaleDateString("en-US", { timeZone: "America/New_York", month: "short", day: "numeric", year: "numeric" });`,
      },
    ],
  },

  // ── 6. blog/categories/page.tsx ──
  {
    file: `${ADMIN}/blog/categories/page.tsx`,
    changes: [
      {
        old: `  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };`,
        new: `  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      timeZone: "America/New_York",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };`,
      },
    ],
  },

  // ── 7. subscriptions/page.tsx ──
  {
    file: `${ADMIN}/subscriptions/page.tsx`,
    changes: [
      {
        old: `<td className="px-3 sm:px-3 sm:px-6 py-2.5 sm:py-3 sm:py-4 text-sm text-slate-600">{sub.currentPeriodEnd ? new Date(sub.currentPeriodEnd).toLocaleDateString() : "-"}</td>`,
        new: `<td className="px-3 sm:px-3 sm:px-6 py-2.5 sm:py-3 sm:py-4 text-sm text-slate-600">{sub.currentPeriodEnd ? new Date(sub.currentPeriodEnd).toLocaleDateString("en-US", { timeZone: "America/New_York", month: "short", day: "numeric", year: "numeric" }) : "-"}</td>`,
      },
      {
        old: `<td className="px-3 sm:px-3 sm:px-6 py-2.5 sm:py-3 sm:py-4 text-sm text-slate-600">{new Date(sub.createdAt).toLocaleDateString()}</td>`,
        new: `<td className="px-3 sm:px-3 sm:px-6 py-2.5 sm:py-3 sm:py-4 text-sm text-slate-600">{new Date(sub.createdAt).toLocaleDateString("en-US", { timeZone: "America/New_York", month: "short", day: "numeric", year: "numeric" })}</td>`,
      },
    ],
  },
];

// ── Execute ──
let totalPatched = 0;
let totalSkipped = 0;

for (const { file, changes } of replacements) {
  const filePath = path.resolve(file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  SKIP (not found): ${file}`);
    totalSkipped++;
    continue;
  }

  let content = fs.readFileSync(filePath, "utf-8");
  let filePatched = 0;

  for (const { old: oldStr, new: newStr } of changes) {
    if (!oldStr || !newStr) continue; // skip null entries
    
    if (content.includes(oldStr)) {
      content = content.replace(oldStr, newStr);
      filePatched++;
    } else {
      console.log(`⚠️  Pattern not found in ${file}:`);
      console.log(`   "${oldStr.substring(0, 80)}..."`);
    }
  }

  if (filePatched > 0) {
    fs.writeFileSync(filePath, content, "utf-8");
    console.log(`✅ ${file} — ${filePatched} change(s)`);
    totalPatched += filePatched;
  }
}

console.log(`\n🏁 Done! ${totalPatched} patches applied, ${totalSkipped} files skipped.`);
console.log(`🕐 All admin dates now display in Eastern Time (America/New_York)`);
