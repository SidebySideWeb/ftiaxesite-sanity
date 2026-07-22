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

export function localeAttrs(value: LocalizedString | null | undefined): {
  'data-el': string
  'data-en': string
} {
  const el = value?.el?.trim() ?? ''
  const en = value?.en?.trim() ?? el
  return {'data-el': el, 'data-en': en}
}

export function formatPrice(amount: number, locale: Locale = DEFAULT_LOCALE): string {
  return new Intl.NumberFormat(locale === 'el' ? 'el-GR' : 'en-GB', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDeliveryRange(
  min: number | null | undefined,
  max: number | null | undefined,
  locale: Locale = DEFAULT_LOCALE,
): string {
  if (min == null || max == null) return ''
  if (locale === 'en') {
    return `${min}-${max} days`
  }
  return `${min}-${max} ημέρες`
}

export function deliveryLabel(
  min: number | null | undefined,
  max: number | null | undefined,
  locale: Locale = DEFAULT_LOCALE,
): string {
  const range = formatDeliveryRange(min, max, locale)
  if (!range) return ''
  return locale === 'en' ? `Delivered in ${range}` : `Παράδοση σε ${range}`
}

export function hostFromUrl(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url.replace(/^https?:\/\//, '').replace(/\/.*$/, '')
  }
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
