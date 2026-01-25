import './globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://kalcufy.com'),
  title: {
    default: 'Kalcufy - Free Online Calculators',
    template: '%s | Kalcufy',
  },
  description: 'Free online calculators for finance, health, and everyday decisions. Mortgage, loans, BMI, calories and 40+ more tools.',
  keywords: ['calculator', 'mortgage calculator', 'loan calculator', 'BMI calculator', 'calorie calculator'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['es_ES', 'pt_BR'],
    url: 'https://kalcufy.com',
    siteName: 'Kalcufy',
    title: 'Kalcufy - Free Online Calculators',
    description: 'Free online calculators for finance, health, and everyday decisions.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kalcufy - Free Online Calculators',
    description: 'Free online calculators for finance, health, and everyday decisions.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
