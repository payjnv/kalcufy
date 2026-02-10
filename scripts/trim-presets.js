#!/usr/bin/env node
/**
 * trim-presets.js
 * Removes extra presets (keeping only first 3) from calculator index.ts files.
 * Handles both the presets array in config and preset translations in t.{lang}.presets
 * 
 * Usage: node scripts/trim-presets.js [--dry-run]
 */

const fs = require('fs');
const path = require('path');

const DRY_RUN = process.argv.includes('--dry-run');
const CALC_DIR = path.join(__dirname, '..', 'src', 'calculators');

function getPresetIds(content) {
  // Extract preset IDs from the presets array
  const presetsMatch = content.match(/presets:\s*\[([\s\S]*?)(?=\n\s*\],?\s*\n\s*(?:unitSystem|t:|inputs|inputGroups))/);
  if (!presetsMatch) return [];
  
  const presetsBlock = presetsMatch[1];
  const ids = [];
  const idRegex = /id:\s*"([^"]+)"/g;
  let match;
  while ((match = idRegex.exec(presetsBlock)) !== null) {
    ids.push(match[1]);
  }
  return ids;
}

function removeLastPresetFromConfig(content, presetIds, keepCount) {
  const idsToRemove = presetIds.slice(keepCount);
  
  for (const id of idsToRemove) {
    // Match the full preset object block: { id: "xxx", icon: "...", values: { ... }, },
    // We need to find the block starting with { (possibly with whitespace/newline before)
    // that contains id: "id" and ends with the closing },
    
    // Strategy: find `id: "${id}"` then expand backwards to find opening `{` and forward to find closing `},`
    const idIndex = content.indexOf(`id: "${id}"`);
    if (idIndex === -1) continue;
    
    // Find the opening { before this id
    let openBrace = idIndex;
    while (openBrace > 0 && content[openBrace] !== '{') {
      openBrace--;
    }
    
    // Find the matching closing } by counting braces
    let braceCount = 0;
    let closeBrace = openBrace;
    for (let i = openBrace; i < content.length; i++) {
      if (content[i] === '{') braceCount++;
      if (content[i] === '}') braceCount--;
      if (braceCount === 0) {
        closeBrace = i;
        break;
      }
    }
    
    // Include the trailing comma and whitespace
    let endPos = closeBrace + 1;
    while (endPos < content.length && (content[endPos] === ',' || content[endPos] === ' ' || content[endPos] === '\n' || content[endPos] === '\r')) {
      endPos++;
    }
    
    // Include leading whitespace
    let startPos = openBrace;
    while (startPos > 0 && (content[startPos - 1] === ' ' || content[startPos - 1] === '\t')) {
      startPos--;
    }
    if (startPos > 0 && content[startPos - 1] === '\n') {
      startPos--;
    }
    
    content = content.substring(0, startPos) + content.substring(endPos);
  }
  
  return content;
}

function removePresetTranslations(content, presetIds, keepCount) {
  const idsToRemove = presetIds.slice(keepCount);
  
  for (const id of idsToRemove) {
    // Remove translation blocks like:
    // presetId: {
    //   label: "...",
    //   description: "...",
    // },
    // or
    // presetId: { label: "...", description: "..." },
    
    // Multi-line pattern
    const multiLineRegex = new RegExp(
      `\\s*${id}:\\s*\\{[^}]*\\},?\\n?`,
      'g'
    );
    content = content.replace(multiLineRegex, '\n');
  }
  
  return content;
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  const presetIds = getPresetIds(content);
  
  if (presetIds.length <= 3) return false;
  
  const calcName = path.basename(path.dirname(filePath));
  const removedIds = presetIds.slice(3);
  
  console.log(`\n📦 ${calcName}: ${presetIds.length} presets → 3`);
  console.log(`   Keeping: ${presetIds.slice(0, 3).join(', ')}`);
  console.log(`   Removing: ${removedIds.join(', ')}`);
  
  if (DRY_RUN) return true;
  
  // Remove from config presets array
  content = removeLastPresetFromConfig(content, presetIds, 3);
  
  // Remove from translations (all languages)
  content = removePresetTranslations(content, presetIds, 3);
  
  fs.writeFileSync(filePath, content, 'utf-8');
  
  // Verify
  const newIds = getPresetIds(content);
  if (newIds.length === 3) {
    console.log(`   ✅ Done: ${newIds.join(', ')}`);
  } else {
    console.log(`   ⚠️  Result: ${newIds.length} presets (expected 3) — may need manual check`);
  }
  
  return true;
}

// Main
console.log(`\n${'='.repeat(60)}`);
console.log(`  TRIM PRESETS TO 3 ${DRY_RUN ? '(DRY RUN)' : ''}`);
console.log(`${'='.repeat(60)}`);

const calcDirs = fs.readdirSync(CALC_DIR).filter(d => {
  const indexPath = path.join(CALC_DIR, d, 'index.ts');
  return fs.existsSync(indexPath);
});

let modified = 0;
for (const dir of calcDirs) {
  const indexPath = path.join(CALC_DIR, dir, 'index.ts');
  if (processFile(indexPath)) modified++;
}

console.log(`\n${'='.repeat(60)}`);
console.log(`  ${DRY_RUN ? 'Would modify' : 'Modified'}: ${modified} files`);
console.log(`${'='.repeat(60)}\n`);

if (DRY_RUN) {
  console.log('Run without --dry-run to apply changes.');
}
