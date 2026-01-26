import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import CalculatorClient from './CalculatorClient';
import { 
  getCalculator, 
  calculatorExists, 
  getAllCalculatorSlugs 
} from '@/config/calculators';

interface CalculatorPageProps {
  params: Promise<{
    locale: string;
    calculatorSlug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllCalculatorSlugs();
  const locales = ['en', 'es', 'pt'];
  
  const params: { locale: string; calculatorSlug: string }[] = [];
  
  for (const locale of locales) {
    for (const calculatorSlug of slugs) {
      params.push({ locale, calculatorSlug });
    }
  }
  
  return params;
}

export async function generateMetadata({ params }: CalculatorPageProps): Promise<Metadata> {
  const { calculatorSlug } = await params;
  
  if (!calculatorExists(calculatorSlug)) {
    return { title: 'Calculator Not Found' };
  }
  
  const calculator = getCalculator(calculatorSlug)!;
  const title = calculator.config.seo?.title || calculatorSlug;
  const description = calculator.config.seo?.description || '';
  
  return {
    title: `${title} | Kalcufy`,
    description,
    keywords: calculator.config.seo?.keywords || [],
  };
}

export default async function CalculatorPage({ params }: CalculatorPageProps) {
  const { locale, calculatorSlug } = await params;
  
  setRequestLocale(locale);
  
  if (!calculatorExists(calculatorSlug)) {
    notFound();
  }
  
  return <CalculatorClient calculatorSlug={calculatorSlug} />;
}
