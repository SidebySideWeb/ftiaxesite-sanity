import {isGoogleHostedImageUrl} from './placeholder-images'

const SANITY_CDN_PATTERN = /cdn\.sanity\.io/i

export const IMAGE_PRESETS = {
  heroSquare: {
    widths: [400, 640, 960] as const,
    sizes: '(min-width: 1024px) 45vw, 90vw',
  },
  portfolioCard: {
    widths: [400, 560, 720] as const,
    sizes: '(min-width: 768px) 50vw, 100vw',
  },
  processWide: {
    widths: [480, 720, 960] as const,
    sizes: '(min-width: 1024px) 50vw, 100vw',
  },
} as const

export type ImagePreset = keyof typeof IMAGE_PRESETS

type ResponsiveDelivery =
  | {
      readonly kind: 'img'
      readonly src: string
      readonly srcSet: string
      readonly sizes: string
    }
  | {
      readonly kind: 'picture'
      readonly sources: readonly {readonly type: string; readonly srcSet: string}[]
      readonly src: string
      readonly sizes: string
    }
  | {
      readonly kind: 'plain'
      readonly src: string
    }

function isSanityCdnUrl(url: string): boolean {
  return SANITY_CDN_PATTERN.test(url)
}

function stripSanityWidthParam(url: string): string {
  const parsed = new URL(url)
  parsed.searchParams.delete('w')
  parsed.searchParams.delete('h')
  parsed.searchParams.delete('q')
  parsed.searchParams.delete('auto')
  parsed.searchParams.delete('fm')
  return parsed.toString().replace(/\?$/, '')
}

function buildSanityUrl(baseUrl: string, width: number): string {
  const url = new URL(baseUrl)
  url.searchParams.set('w', String(width))
  url.searchParams.set('auto', 'format')
  url.searchParams.set('q', '80')
  return url.toString()
}

function buildSanityDelivery(url: string, widths: readonly number[], sizes: string): ResponsiveDelivery {
  const baseUrl = stripSanityWidthParam(url)
  const largest = widths[widths.length - 1] ?? 640
  const srcSet = widths.map((width) => `${buildSanityUrl(baseUrl, width)} ${width}w`).join(', ')

  return {
    kind: 'img',
    src: buildSanityUrl(baseUrl, largest),
    srcSet,
    sizes,
  }
}

function localVariantPath(pathname: string, width: number): string {
  const match = pathname.match(/^(\/images\/[^.]+)(?:-\d+w)?(\.\w+)$/)
  if (!match) return pathname
  return `${match[1]}-${width}w.webp`
}

function buildLocalDelivery(url: string, widths: readonly number[], sizes: string): ResponsiveDelivery {
  const pathname = new URL(url, 'https://ftiaxesite.gr').pathname
  const webpSources = widths.map((width) => `${localVariantPath(pathname, width)} ${width}w`).join(', ')
  const fallbackWidth = widths[widths.length - 1] ?? 640

  return {
    kind: 'picture',
    sources: [{type: 'image/webp', srcSet: webpSources}],
    src: localVariantPath(pathname, fallbackWidth),
    sizes,
  }
}

export function resolveImageDelivery(
  rawUrl: string | null | undefined,
  options: {readonly widths: readonly number[]; readonly sizes: string},
): ResponsiveDelivery | null {
  const url = rawUrl?.trim()
  if (!url || isGoogleHostedImageUrl(url)) return null

  if (isSanityCdnUrl(url)) {
    return buildSanityDelivery(url, options.widths, options.sizes)
  }

  if (url.startsWith('/images/')) {
    return buildLocalDelivery(url, options.widths, options.sizes)
  }

  return {kind: 'plain', src: url}
}

export function resolvePresetDelivery(
  rawUrl: string | null | undefined,
  preset: ImagePreset,
): ResponsiveDelivery | null {
  const config = IMAGE_PRESETS[preset]
  return resolveImageDelivery(rawUrl, config)
}
