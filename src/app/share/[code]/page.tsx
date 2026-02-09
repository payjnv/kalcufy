import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { SLUG_REGISTRY } from "@/engine/v4/slugs/registry";

interface Props {
  params: Promise<{ code: string }>;
}

export default async function SharePage({ params }: Props) {
  const { code } = await params;

  // Fetch shared calculation
  const shared = await prisma.sharedCalculation.findUnique({
    where: { shortCode: code },
  });

  if (!shared) {
    notFound();
  }

  // Check if expired
  if (new Date() > shared.expiresAt) {
    await prisma.sharedCalculation.delete({ where: { id: shared.id } });
    notFound();
  }

  // Increment views
  await prisma.sharedCalculation.update({
    where: { id: shared.id },
    data: { views: { increment: 1 } },
  });

  // Get the correct slug for the locale
  const entry = SLUG_REGISTRY.find(e => e.id === shared.calculatorId);
  const locale = shared.locale || "en";
  const slug = entry?.slugs[locale as keyof typeof entry.slugs] || shared.calculatorSlug;

  // Build URL with values as params
  const values = shared.values as Record<string, unknown>;
  const searchParams = new URLSearchParams();
  
  // Add values to URL params
  Object.entries(values).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      searchParams.set(key, String(value));
    }
  });

  // Add unit system if present
  if (shared.unitSystem) {
    searchParams.set("unit", shared.unitSystem);
  }

  // Add share indicator
  searchParams.set("shared", "true");

  // Redirect to calculator with pre-filled values
  redirect(`/${locale}/${slug}?${searchParams.toString()}`);
}
