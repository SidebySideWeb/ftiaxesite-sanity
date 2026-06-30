export const DEFAULT_LOCALE = 'el';

export const SUPPORTED_LOCALES = ['el', 'en'] as const;

export type SiteLocale = (typeof SUPPORTED_LOCALES)[number];

export interface SiteLanguage {
  readonly code: string;
  readonly nativeName: string;
  readonly default: boolean;
}

const FALLBACK_LANGUAGES: readonly SiteLanguage[] = [
  { code: 'el', nativeName: 'Ελληνικά', default: true },
  { code: 'en', nativeName: 'English', default: false },
];

export function isSiteLocale(value: string | undefined): value is SiteLocale {
  return value !== undefined && (SUPPORTED_LOCALES as readonly string[]).includes(value);
}

export function resolveLocale(langParam: string | undefined): SiteLocale {
  if (isSiteLocale(langParam)) {
    return langParam;
  }
  return DEFAULT_LOCALE;
}

export function resolvePageLocale(currentLocale: string | undefined): SiteLocale {
  return resolveLocale(currentLocale);
}

export function localeToWpmlCode(locale: SiteLocale): string {
  return locale;
}

export function localeHtmlLang(locale: SiteLocale): string {
  return locale === 'en' ? 'en' : 'el';
}

export function stripLocaleFromPath(pathname: string): string {
  const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`;
  for (const locale of SUPPORTED_LOCALES) {
    if (locale === DEFAULT_LOCALE) {
      continue;
    }
    const prefix = `/${locale}/`;
    if (normalized === `/${locale}/`) {
      return '/';
    }
    if (normalized.startsWith(prefix)) {
      const stripped = `/${normalized.slice(prefix.length)}`;
      return stripped.endsWith('/') ? stripped : `${stripped}/`;
    }
  }
  return normalized;
}

export function localizePath(path: string, locale: SiteLocale): string {
  const base = path.startsWith('/') ? path : `/${path}`;
  const withSlash = base.endsWith('/') ? base : `${base}/`;
  if (locale === DEFAULT_LOCALE) {
    return withSlash;
  }
  if (withSlash === '/') {
    return `/${locale}/`;
  }
  return `/${locale}${withSlash}`;
}

export function localeFromPath(pathname: string): SiteLocale {
  const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`;
  for (const locale of SUPPORTED_LOCALES) {
    if (locale === DEFAULT_LOCALE) {
      continue;
    }
    if (normalized === `/${locale}/` || normalized.startsWith(`/${locale}/`)) {
      return locale;
    }
  }
  return DEFAULT_LOCALE;
}

export function switchLocaleInPath(pathname: string, targetLocale: SiteLocale): string {
  return localizePath(stripLocaleFromPath(pathname), targetLocale);
}

export function staticLocaleParams(): Array<{ params: { lang: string | undefined } }> {
  return [{ params: { lang: undefined } }, { params: { lang: 'en' } }];
}

export function resolveStaticLocale(langParam: string | undefined): SiteLocale {
  return resolveLocale(langParam);
}

export function mergeLanguages(rows: readonly SiteLanguage[] | null): readonly SiteLanguage[] {
  if (!rows || rows.length === 0) {
    return FALLBACK_LANGUAGES;
  }
  return rows;
}
