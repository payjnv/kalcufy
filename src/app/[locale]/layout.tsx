import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';
import { Providers } from './providers';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CookieConsent from '@/components/CookieConsent';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Kalcufy - Free Online Calculators",
    template: "%s | Kalcufy"
  },
  description: "Free, fast calculators for loans, investments, BMI, calories and more. Make smarter decisions in seconds.",
  keywords: ["calculator", "financial calculator", "BMI calculator", "loan calculator", "investment calculator"],
  authors: [{ name: "Kalcufy" }],
  creator: "Kalcufy",
  metadataBase: new URL('https://www.kalcufy.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.kalcufy.com',
    siteName: 'Kalcufy',
    title: 'Kalcufy - Free Online Calculators',
    description: 'Free, fast calculators for loans, investments, BMI, calories and more.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kalcufy - Free Online Calculators',
    description: 'Free, fast calculators for loans, investments, BMI, calories and more.',
  },
  robots: {
    index: true,
    follow: true,
  },
};


export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Validate locale
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Get messages for the locale
  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <NextIntlClientProvider messages={messages}>
            {/* Skip Link for keyboard accessibility - WCAG 2.1 AA */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg focus:font-medium focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
              Skip to main content
            </a>
            
            <div className="flex flex-col min-h-screen">
              <Header />
              <main id="main-content" className="flex-1 pt-16" tabIndex={-1}>
                {children}
              </main>
              <Footer />
            </div>
            <CookieConsent />
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
