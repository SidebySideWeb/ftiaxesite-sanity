import {DEFAULT_LOCALE, localeFromPath, localizePath, type SiteLocale} from './i18n'

export interface BreadcrumbItem {
  readonly name: string
  readonly url: string
}

const SEGMENT_LABELS: Record<string, {el: string; en: string}> = {
  about: {el: 'Πώς δουλεύουμε', en: 'How we work'},
  services: {el: 'Υπηρεσίες', en: 'Services'},
  portfolio: {el: 'Έργα', en: 'Portfolio'},
  quote: {el: 'Ζήτα Προσφορά', en: 'Get a quote'},
  blog: {el: 'Blog', en: 'Blog'},
  contact: {el: 'Επικοινωνία', en: 'Contact'},
}

function homeLabel(locale: SiteLocale): string {
  return locale === 'en' ? 'Home' : 'Αρχική'
}

function segmentLabel(segment: string, locale: SiteLocale): string {
  const labels = SEGMENT_LABELS[segment]
  if (labels) return locale === 'en' ? labels.en : labels.el
  return segment
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

export function isHomepagePath(pathname: string): boolean {
  const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`
  return normalized === '/' || normalized === '/en/'
}

export function buildBreadcrumbsFromPath(
  pathname: string,
  siteOrigin: string,
  pageTitle?: string,
): BreadcrumbItem[] {
  const locale = localeFromPath(pathname)
  const normalized = pathname.endsWith('/') ? pathname : `${pathname}/`
  const origin = siteOrigin.replace(/\/$/, '')

  if (isHomepagePath(normalized)) {
    return []
  }

  const homeUrl = `${origin}${localizePath('/', locale)}`
  const items: BreadcrumbItem[] = [{name: homeLabel(locale), url: homeUrl}]

  const stripped = locale === 'en' ? normalized.replace(/^\/en\//, '/') : normalized
  const segments = stripped.split('/').filter(Boolean)

  let accumulated = locale === 'en' ? '/en' : ''

  segments.forEach((segment, index) => {
    accumulated += `/${segment}`
    const isLast = index === segments.length - 1
    const path = accumulated.endsWith('/') ? accumulated : `${accumulated}/`
    items.push({
      name: isLast && pageTitle?.trim() ? pageTitle.trim() : segmentLabel(segment, locale),
      url: `${origin}${path}`,
    })
  })

  return items
}
