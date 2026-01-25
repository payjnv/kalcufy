import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";

export const locales = ["en", "es", "pt"] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  en: "English",
  es: "Español",
  pt: "Português",
};

export const localeFlags: Record<Locale, string> = {
  en: "🇺🇸",
  es: "🇪🇸",
  pt: "🇧🇷",
};

export const defaultLocale: Locale = "en";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(locales, requested) ? requested : "en";

  return {
    locale,
    messages: (await import("./messages/" + locale + ".json")).default
  };
});
