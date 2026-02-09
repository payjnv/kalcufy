import type { Metadata } from "next";
import { generateStaticPageMetadata, CALCULATORS_CONFIG } from "@/lib/static-page-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateStaticPageMetadata(CALCULATORS_CONFIG, locale);
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
