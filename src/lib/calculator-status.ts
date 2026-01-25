// src/lib/calculator-status.ts
// Utility functions to manage calculator active/inactive status

import { prisma } from "@/lib/db";
import { ALL_CALCULATORS, type Calculator } from "@/config/calculators-config";

// Cache for calculator status (refreshes every 60 seconds)
let statusCache: Map<string, boolean> | null = null;
let cacheTimestamp = 0;
const CACHE_TTL = 60000; // 60 seconds

/**
 * Get all calculator statuses from database
 * Returns a Map of slug -> isActive
 */
export async function getCalculatorStatuses(): Promise<Map<string, boolean>> {
  const now = Date.now();
  
  // Return cached data if still valid
  if (statusCache && (now - cacheTimestamp) < CACHE_TTL) {
    return statusCache;
  }

  try {
    const statuses = await prisma.calculatorStatus.findMany();
    
    // Create map with all calculators defaulting to active
    const statusMap = new Map<string, boolean>();
    ALL_CALCULATORS.forEach(calc => {
      statusMap.set(calc.slug, true); // Default to active
    });
    
    // Override with database values
    statuses.forEach(status => {
      statusMap.set(status.slug, status.isActive);
    });
    
    // Update cache
    statusCache = statusMap;
    cacheTimestamp = now;
    
    return statusMap;
  } catch (error) {
    console.error("Error fetching calculator statuses:", error);
    // Return all active on error
    const statusMap = new Map<string, boolean>();
    ALL_CALCULATORS.forEach(calc => {
      statusMap.set(calc.slug, true);
    });
    return statusMap;
  }
}

/**
 * Get only active calculators
 */
export async function getActiveCalculatorsFromDB(): Promise<Calculator[]> {
  const statuses = await getCalculatorStatuses();
  return ALL_CALCULATORS.filter(calc => statuses.get(calc.slug) !== false);
}

/**
 * Get active calculators by category
 */
export async function getActiveCalculatorsByCategory(
  category: "finance" | "health" | "everyday"
): Promise<Calculator[]> {
  const activeCalculators = await getActiveCalculatorsFromDB();
  return activeCalculators.filter(calc => calc.category === category);
}

/**
 * Get count of active calculators
 */
export async function getActiveCalculatorCount(): Promise<number> {
  const activeCalculators = await getActiveCalculatorsFromDB();
  return activeCalculators.length;
}

/**
 * Get count of active calculators by category
 */
export async function getActiveCalculatorCountByCategory(
  category: "finance" | "health" | "everyday"
): Promise<number> {
  const activeCalculators = await getActiveCalculatorsByCategory(category);
  return activeCalculators.length;
}

/**
 * Check if a specific calculator is active
 */
export async function isCalculatorActive(slug: string): Promise<boolean> {
  const statuses = await getCalculatorStatuses();
  return statuses.get(slug) !== false;
}

/**
 * Toggle calculator status
 */
export async function toggleCalculatorStatus(slug: string): Promise<boolean> {
  try {
    const existing = await prisma.calculatorStatus.findUnique({
      where: { slug },
    });

    let newStatus: boolean;
    
    if (existing) {
      const updated = await prisma.calculatorStatus.update({
        where: { slug },
        data: { isActive: !existing.isActive },
      });
      newStatus = updated.isActive;
    } else {
      const created = await prisma.calculatorStatus.create({
        data: { slug, isActive: false },
      });
      newStatus = created.isActive;
    }
    
    // Invalidate cache
    statusCache = null;
    
    return newStatus;
  } catch (error) {
    console.error("Error toggling calculator status:", error);
    throw error;
  }
}

/**
 * Set calculator status explicitly
 */
export async function setCalculatorStatus(slug: string, isActive: boolean): Promise<void> {
  try {
    await prisma.calculatorStatus.upsert({
      where: { slug },
      update: { isActive },
      create: { slug, isActive },
    });
    
    // Invalidate cache
    statusCache = null;
  } catch (error) {
    console.error("Error setting calculator status:", error);
    throw error;
  }
}

/**
 * Clear the status cache (useful after updates)
 */
export function clearStatusCache(): void {
  statusCache = null;
  cacheTimestamp = 0;
}
