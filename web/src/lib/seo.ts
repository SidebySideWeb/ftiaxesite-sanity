import type {SanityImageSource} from '@sanity/image-url'

/** Matches sanity-plugin-seofields `SeoFieldsInput` (next.d.ts). */
export interface SeoFieldsData {
  readonly _type?: string
  readonly title?: string | null
  readonly description?: string | null
  readonly canonicalUrl?: string | null
  readonly keywords?: readonly string[] | null
  readonly metaImage?: SanityImageSource | null
  readonly metaAttributes?: ReadonlyArray<{
    readonly key?: string
    readonly value?: string
    readonly type?: string
  }> | null
  readonly robots?: {
    readonly noIndex?: boolean | null
    readonly noFollow?: boolean | null
    readonly noTranslate?: boolean | null
    readonly noImageIndex?: boolean | null
  } | null
  readonly openGraph?: {
    readonly url?: string | null
    readonly title?: string | null
    readonly description?: string | null
    readonly siteName?: string | null
    readonly type?: string | null
    readonly imageType?: string | null
    readonly imageUrl?: string | null
    readonly image?: SanityImageSource | null
  } | null
  readonly twitter?: {
    readonly card?: string | null
    readonly site?: string | null
    readonly creator?: string | null
    readonly title?: string | null
    readonly description?: string | null
    readonly imageType?: string | null
    readonly imageUrl?: string | null
    readonly image?: SanityImageSource | null
  } | null
}

export interface SiteSeoDefaults {
  readonly siteName: string
  readonly defaultDescription: string
  readonly defaultOgImageUrl: string | null
}

export interface ResolvedSeoHead {
  readonly documentTitle: string
  readonly description: string
  readonly keywords: readonly string[]
  readonly robotsContent: string | null
  readonly canonicalUrl: string
  readonly ogType: string
  readonly ogUrl: string
  readonly ogTitle: string
  readonly ogDescription: string
  readonly ogSiteName: string | null
  readonly ogImage: string | null
  readonly ogLocale: string
  readonly twitterCard: string
  readonly twitterSite: string | null
  readonly twitterCreator: string | null
  readonly twitterTitle: string
  readonly twitterDescription: string
  readonly twitterImage: string | null
  readonly customMeta: Readonly<Record<string, string>>
  readonly alternateElUrl?: string
  readonly alternateEnUrl?: string
  readonly xDefaultUrl?: string
}

/** @deprecated Use SeoFieldsData */
export type PageSeoMeta = {
  readonly title: string | null
  readonly description: string | null
  readonly ogImageUrl: string | null
  readonly noindex: boolean
}

type ImageUrlResolver = (source: SanityImageSource | null | undefined, width?: number) => string | null

const VALID_OG_TYPES = ['website', 'article', 'profile', 'book', 'music', 'video', 'product'] as const
const VALID_TWITTER_CARDS = ['summary', 'summary_large_image', 'app', 'player'] as const

function sanitizeOgType(value?: string | null, fallback: 'website' | 'article' = 'website'): string {
  if (value && VALID_OG_TYPES.includes(value as (typeof VALID_OG_TYPES)[number])) return value
  return fallback
}

function sanitizeTwitterCard(value?: string | null): string {
  if (value && VALID_TWITTER_CARDS.includes(value as (typeof VALID_TWITTER_CARDS)[number])) return value
  return 'summary_large_image'
}

function resolvePluginImage(
  seo: SeoFieldsData | null | undefined,
  imageUrlResolver: ImageUrlResolver,
  defaults: SiteSeoDefaults,
): string | null {
  if (!seo) return defaults.defaultOgImageUrl

  const metaImageUrl = imageUrlResolver(seo.metaImage ?? null, 1200)
  if (metaImageUrl) return metaImageUrl

  const og = seo.openGraph
  if (og?.imageType === 'url' && og.imageUrl?.trim()) return og.imageUrl.trim()
  const ogUpload = imageUrlResolver(og?.image ?? null, 1200)
  if (ogUpload) return ogUpload

  const tw = seo.twitter
  if (tw?.imageType === 'url' && tw.imageUrl?.trim()) return tw.imageUrl.trim()
  const twUpload = imageUrlResolver(tw?.image ?? null, 1200)
  if (twUpload) return twUpload

  return defaults.defaultOgImageUrl
}

function buildRobotsContent(seo: SeoFieldsData | null | undefined): string | null {
  const robots = seo?.robots
  if (!robots) return null

  const parts = [
    robots.noIndex ? 'noindex' : 'index',
    robots.noFollow ? 'nofollow' : 'follow',
    robots.noTranslate ? 'notranslate' : null,
    robots.noImageIndex ? 'noimageindex' : null,
  ].filter(Boolean)

  return parts.join(', ')
}

function buildCustomMeta(seo: SeoFieldsData | null | undefined): Record<string, string> {
  const out: Record<string, string> = {}
  for (const attr of seo?.metaAttributes ?? []) {
    if (attr.key?.trim() && attr.value?.trim()) {
      out[attr.key.trim()] = attr.value.trim()
    }
  }
  return out
}

/** Pre-plugin bilingual `seo` object still stored on some documents. */
interface LegacyBilingualSeo {
  readonly title?: {readonly el?: string; readonly en?: string}
  readonly description?: {readonly el?: string; readonly en?: string}
  readonly ogImage?: SanityImageSource
  readonly noIndex?: boolean
}

function isLegacyBilingualSeo(value: unknown): value is LegacyBilingualSeo {
  if (!value || typeof value !== 'object') return false
  const title = (value as LegacyBilingualSeo).title
  return typeof title === 'object' && title !== null
}

function legacyToSeoFields(legacy: LegacyBilingualSeo, locale: 'el' | 'en'): SeoFieldsData {
  const pick = (v?: {el?: string; en?: string}) =>
    (locale === 'en' ? v?.en ?? v?.el : v?.el ?? v?.en)?.trim() || null

  return {
    title: pick(legacy.title),
    description: pick(legacy.description),
    metaImage: legacy.ogImage ?? null,
    robots: {noIndex: legacy.noIndex ?? false},
  }
}

/** Pick Greek (`seo`) or English (`seoEn`) plugin SEO object for the active locale. */
export function pickDocumentSeoData(
  doc: {readonly seo?: unknown; readonly seoEn?: unknown} | null | undefined,
  locale: 'el' | 'en',
): SeoFieldsData | null {
  if (!doc) return null

  if (locale === 'en' && doc.seoEn && !isLegacyBilingualSeo(doc.seoEn)) {
    return doc.seoEn as SeoFieldsData
  }

  const raw = locale === 'en' ? (doc.seoEn ?? doc.seo) : doc.seo
  if (!raw) return null

  if (isLegacyBilingualSeo(raw)) {
    return legacyToSeoFields(raw, locale)
  }

  return raw as SeoFieldsData
}

export interface ResolveSeoHeadInput {
  readonly seoData?: SeoFieldsData | null
  readonly fallbackTitle?: string
  readonly fallbackDescription?: string
  readonly fallbackOgImage?: string | null
  readonly canonicalUrl: string
  readonly locale: 'el' | 'en'
  readonly alternateUrl?: string
  readonly siteDefaults: SiteSeoDefaults
  readonly ogType?: 'website' | 'article'
  readonly imageUrlResolver: ImageUrlResolver
}

export function resolveSeoHead(input: ResolveSeoHeadInput): ResolvedSeoHead {
  const {
    seoData,
    fallbackTitle = '',
    fallbackDescription = '',
    fallbackOgImage,
    canonicalUrl,
    locale,
    alternateUrl,
    siteDefaults,
    ogType = 'website',
    imageUrlResolver,
  } = input

  const defaultsWithImage: SiteSeoDefaults = {
    ...siteDefaults,
    defaultOgImageUrl: fallbackOgImage ?? siteDefaults.defaultOgImageUrl,
  }

  const pageTitle = fallbackTitle.trim()
  const pageDescription = fallbackDescription.trim()

  const documentTitle =
    seoData?.title?.trim() ||
    (pageTitle ? `${pageTitle} · ${siteDefaults.siteName}` : siteDefaults.siteName)

  const description =
    seoData?.description?.trim() || pageDescription || siteDefaults.defaultDescription

  const resolvedCanonical = seoData?.canonicalUrl?.trim() || canonicalUrl
  const ogImage = resolvePluginImage(seoData, imageUrlResolver, defaultsWithImage)
  const ogLocale = locale === 'en' ? 'en_US' : 'el_GR'

  const ogTitle = seoData?.openGraph?.title?.trim() || seoData?.title?.trim() || documentTitle
  const ogDescription =
    seoData?.openGraph?.description?.trim() || seoData?.description?.trim() || description
  const ogUrl = seoData?.openGraph?.url?.trim() || resolvedCanonical
  const resolvedOgType = sanitizeOgType(seoData?.openGraph?.type, ogType)

  const twitterTitle = seoData?.twitter?.title?.trim() || ogTitle
  const twitterDescription = seoData?.twitter?.description?.trim() || ogDescription
  const twitterImage = (() => {
    const tw = seoData?.twitter
    if (tw?.imageType === 'url' && tw.imageUrl?.trim()) return tw.imageUrl.trim()
    const upload = imageUrlResolver(tw?.image ?? null, 1200)
    return upload || ogImage
  })()

  const alternateElUrl = locale === 'el' ? resolvedCanonical : alternateUrl
  const alternateEnUrl = locale === 'en' ? resolvedCanonical : alternateUrl

  return {
    documentTitle,
    description,
    keywords: (seoData?.keywords ?? []).filter((k): k is string => Boolean(k?.trim())),
    robotsContent: buildRobotsContent(seoData),
    canonicalUrl: resolvedCanonical,
    ogType: resolvedOgType,
    ogUrl,
    ogTitle,
    ogDescription,
    ogSiteName: seoData?.openGraph?.siteName?.trim() || siteDefaults.siteName,
    ogImage,
    ogLocale,
    twitterCard: sanitizeTwitterCard(seoData?.twitter?.card),
    twitterSite: seoData?.twitter?.site?.trim() || null,
    twitterCreator: seoData?.twitter?.creator?.trim() || null,
    twitterTitle,
    twitterDescription,
    twitterImage,
    customMeta: buildCustomMeta(seoData),
    alternateElUrl,
    alternateEnUrl,
    xDefaultUrl: alternateElUrl,
  }
}
