export type Locale = 'el' | 'en'

export type LocalizedString = {
  readonly el?: string
  readonly en?: string
}

export const DEFAULT_LOCALE: Locale = 'el'

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
