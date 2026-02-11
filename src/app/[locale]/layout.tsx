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
import GoogleAnalytics from '@/components/GoogleAnalytics';
import Script from "next/script";
import { getSiteSettings } from '@/lib/site-settings';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const inter = Inter({ subsets: ["latin"] });

const settings = getSiteSettings();

export const metadata: Metadata = {
  title: {
    default: settings.seo.defaultTitle,
    template: settings.seo.titleTemplate,
  },
  description: settings.seo.defaultDescription,
  keywords: ["calculator", "financial calculator", "BMI calculator", "loan calculator", "investment calculator"],
  authors: [{ name: settings.site.name }],
  creator: settings.site.name,
  metadataBase: new URL(settings.seo.canonicalBase || 'https://www.kalcufy.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: settings.site.url,
    siteName: settings.site.name,
    title: settings.seo.defaultTitle,
    description: settings.seo.defaultDescription,
    images: settings.seo.defaultOgImage ? [{ url: settings.seo.defaultOgImage, width: 1200, height: 630 }] : undefined,
  },
  twitter: {
    card: 'summary_large_image',
    title: settings.seo.defaultTitle,
    description: settings.seo.defaultDescription,
    images: settings.seo.defaultOgImage ? [settings.seo.defaultOgImage] : undefined,
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: settings.google.searchConsoleId ? {
    google: settings.google.searchConsoleId,
  } : undefined,
};

// Build sameAs array from social links for Schema.org
function getSameAs(): string[] {
  const links: string[] = [];
  if (settings.social.twitter) links.push(settings.social.twitter);
  if (settings.social.facebook) links.push(settings.social.facebook);
  if (settings.social.linkedin) links.push(settings.social.linkedin);
  if (settings.social.github) links.push(settings.social.github);
  if (settings.social.youtube) links.push(settings.social.youtube);
  return links;
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  if (!locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  // Schema.org Organization JSON-LD
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings.schema.organizationName || settings.site.name,
    url: settings.site.url,
    logo: settings.schema.organizationLogo,
    ...(settings.schema.contactEmail && { email: settings.schema.contactEmail }),
    ...(settings.schema.foundingDate && { foundingDate: settings.schema.foundingDate }),
    ...(getSameAs().length > 0 && { sameAs: getSameAs() }),
  };

  return (
    <html lang={locale} className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Bing Verification */}
        <meta name="msvalidate.01" content="8E13204C5894701E4DA8A48087384FC1" />

        {/* Schema.org Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        {/* GTM noscript */}
        {settings.google.tagManagerId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${settings.google.tagManagerId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}

        {/* GTM - non-blocking */}
        {settings.google.tagManagerId && (
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${settings.google.tagManagerId}');`,
            }}
          />
        )}

        {/* AdSense - lazy loaded */}
        {settings.google.adsenseId && (
          <Script
            id="adsense-script"
            strategy="lazyOnload"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${settings.google.adsenseId}`}
            crossOrigin="anonymous"
          />
        )}

        <Providers>
          <GoogleAnalytics />
          <NextIntlClientProvider messages={messages}>
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

