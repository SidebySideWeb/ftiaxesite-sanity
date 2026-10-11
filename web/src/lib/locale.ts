export type Locale = 'el' | 'en'

export type LocalizedString = {
  readonly el?: string
  readonly en?: string
}

export const DEFAULT_LOCALE: Locale = 'el'
export const LOCALES: readonly Locale[] = ['el', 'en'] as const

export function isLocale(value: string | null | undefined): value is Locale {
  return value === 'el' || value === 'en'
}

export function t(value: LocalizedString | null | undefined, locale: Locale = DEFAULT_LOCALE): string {
  if (!value) return ''
  const primary = locale === 'en' ? value.en : value.el
  const fallback = locale === 'en' ? value.el : value.en
  return (primary || fallback || '').trim()
}

/** Strip `/en` prefix so `/en/quote/` → `/quote/`. */
export function stripLocalePrefix(pathname: string): string {
  if (pathname === '/en' || pathname === '/en/') return '/'
  if (pathname.startsWith('/en/')) {
    const rest = pathname.slice(3)
    return rest.startsWith('/') ? rest : `/${rest}`
  }
  return pathname || '/'
}

export function getLocaleFromPath(pathname: string): Locale {
  return pathname === '/en' || pathname === '/en/' || pathname.startsWith('/en/') ? 'en' : 'el'
}

/** Locale-aware internal href. Leaves external/mailto/tel unchanged. */
export function localizeHref(href: string, locale: Locale): string {
  if (!href) return locale === 'en' ? '/en/' : '/'
  if (/^(https?:|mailto:|tel:)/i.test(href)) return href

  if (href.startsWith('#')) {
    return locale === 'en' ? `/en/${href}` : `/${href}`
  }

  const path = stripLocalePrefix(href)
  const normalized = path.endsWith('/') || path.includes('.') || path.includes('#') ? path : `${path}/`

  if (locale === 'en') {
    if (normalized === '/') return '/en/'
    return `/en${normalized.startsWith('/') ? normalized : `/${normalized}`}`
  }

  return normalized
}

/** Alternate URL for the language switcher. */
export function alternateLocalePath(pathname: string, targetLocale: Locale): string {
  return localizeHref(stripLocalePrefix(pathname), targetLocale)
}

export function ogLocale(locale: Locale): string {
  return locale === 'en' ? 'en_GB' : 'el_GR'
}
