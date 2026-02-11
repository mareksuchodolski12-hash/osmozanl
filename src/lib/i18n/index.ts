import plTranslations from './pl.json';
import enTranslations from './en.json';

export type Locale = 'pl' | 'en';

export const AVAILABLE_LOCALES: Locale[] = ['pl', 'en'];
export const DEFAULT_LOCALE: Locale = 'pl';

type Translations = typeof plTranslations;

const translations: Record<Locale, Translations> = {
  pl: plTranslations,
  en: enTranslations,
};

/**
 * Validates if a locale is supported
 */
export function isValidLocale(locale: unknown): locale is Locale {
  return typeof locale === 'string' && AVAILABLE_LOCALES.includes(locale as Locale);
}

/**
 * Gets translations for a specific locale
 * Falls back to English if locale not found
 */
export function getTranslations(locale: unknown): Translations {
  if (isValidLocale(locale)) {
    return translations[locale];
  }
  return translations[DEFAULT_LOCALE];
}

/**
 * Extracts locale from pathname
 * e.g., "/pl/xyz" → "pl", "/kalkulator" → DEFAULT_LOCALE
 */
export function extractLocale(pathname: string): Locale {
  const segments = pathname.split('/').filter(Boolean);
  const potentialLocale = segments[0];
  
  if (isValidLocale(potentialLocale)) {
    return potentialLocale;
  }
  
  return DEFAULT_LOCALE;
}

/**
 * Returns the default locale language name
 */
export const localeName: Record<Locale, string> = {
  pl: 'Polski',
  en: 'English',
};

/**
 * Gets the other locale (useful for language switcher)
 */
export function getOtherLocale(current: Locale): Locale {
  return current === 'pl' ? 'en' : 'pl';
}
