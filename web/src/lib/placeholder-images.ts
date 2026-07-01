/** First-party fallbacks — avoids lh3.googleusercontent.com third-party cookies in Lighthouse. */
export const PLACEHOLDER_IMAGES = {
  homeHero: '/images/home-hero.jpg',
  portfolio1: '/images/portfolio-1.jpg',
  portfolio2: '/images/portfolio-2.jpg',
  service1: '/images/service-1.jpg',
  service2: '/images/service-2.jpg',
  service3: '/images/service-3.jpg',
} as const

export function isGoogleHostedImageUrl(url: string | null | undefined): boolean {
  return Boolean(url && /googleusercontent\.com/i.test(url))
}

/** Prefer Sanity/CDN URLs; never return Google placeholder hosts. */
export function resolvePublicImageUrl(url: string | null | undefined, fallback: string): string {
  if (!url?.trim() || isGoogleHostedImageUrl(url)) {
    return fallback
  }
  return url
}

/** CMS image helper — returns fallback (or null) when URL is missing or blocked. */
export function sanitizeCmsImageUrl(
  url: string | null | undefined,
  fallback: string | null = null,
): string | null {
  if (!url?.trim() || isGoogleHostedImageUrl(url)) {
    return fallback
  }
  return url
}
