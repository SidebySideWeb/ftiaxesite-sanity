import {createImageUrlBuilder, type SanityImageSource} from '@sanity/image-url'
import {sanityClient} from 'sanity:client'
import type {SiteLocale} from './i18n'

export type LocaleValue = {el?: string; en?: string} | null | undefined

export function pickLocale(value: LocaleValue, locale: SiteLocale): string {
  if (!value) return ''
  const primary = locale === 'en' ? value.en : value.el
  const fallback = locale === 'en' ? value.el : value.en
  return (primary || fallback || '').trim()
}

export function pickLocaleLines(value: LocaleValue, locale: SiteLocale): readonly string[] {
  return pickLocale(value, locale)
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
}

const {projectId, dataset} = sanityClient.config()

export function urlFor(source: SanityImageSource | null | undefined, width?: number): string | null {
  if (!source || !projectId || !dataset) return null
  let builder = createImageUrlBuilder({projectId, dataset}).image(source).auto('format').quality(80)
  if (width) builder = builder.width(width)
  return builder.url()
}

export function normalizePath(rawUrl: string): string {
  const trimmed = rawUrl.trim()
  if (trimmed.length === 0) return '/'
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('mailto:')) {
    return trimmed
  }
  const withSlash = trimmed.startsWith('/') ? trimmed : `/${trimmed}`
  return withSlash.endsWith('/') ? withSlash : `${withSlash}/`
}
