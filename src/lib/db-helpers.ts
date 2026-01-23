import prisma from "./db";

// CALCULATOR HISTORY
export async function saveCalculation({
  userId, calculatorSlug, calculatorName, inputs, results, note,
}: {
  userId: string; calculatorSlug: string; calculatorName: string;
  inputs: Record<string, any>; results: Record<string, any>; note?: string;
}) {
  return prisma.calculatorHistory.create({
    data: { userId, calculatorSlug, calculatorName, inputs, results, note },
  });
}

export async function getUserHistory(userId: string, limit = 20) {
  return prisma.calculatorHistory.findMany({
    where: { userId }, orderBy: { createdAt: "desc" }, take: limit,
  });
}

export async function deleteHistoryItem(id: string, userId: string) {
  return prisma.calculatorHistory.delete({ where: { id, userId } });
}

// FAVORITES
export async function addFavorite({
  userId, calculatorSlug, calculatorName, category,
}: {
  userId: string; calculatorSlug: string; calculatorName: string; category: string;
}) {
  return prisma.favorite.upsert({
    where: { userId_calculatorSlug: { userId, calculatorSlug } },
    update: {},
    create: { userId, calculatorSlug, calculatorName, category },
  });
}

export async function removeFavorite(userId: string, calculatorSlug: string) {
  return prisma.favorite.delete({
    where: { userId_calculatorSlug: { userId, calculatorSlug } },
  });
}

export async function getUserFavorites(userId: string) {
  return prisma.favorite.findMany({
    where: { userId }, orderBy: { createdAt: "desc" },
  });
}

export async function isFavorite(userId: string, calculatorSlug: string) {
  const favorite = await prisma.favorite.findUnique({
    where: { userId_calculatorSlug: { userId, calculatorSlug } },
  });
  return !!favorite;
}

// NEWSLETTER
export async function subscribeNewsletter({
  email, name, language = "en", source,
}: {
  email: string; name?: string; language?: string; source?: string;
}) {
  return prisma.newsletter.upsert({
    where: { email },
    update: { name, language, source, isActive: true },
    create: { email, name, language, source },
  });
}

export async function unsubscribeNewsletter(email: string) {
  return prisma.newsletter.update({
    where: { email }, data: { isActive: false },
  });
}

// USER HELPERS
export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email }, include: { subscription: true },
  });
}

export async function isUserPro(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId }, select: { isPro: true },
  });
  return user?.isPro ?? false;
}
