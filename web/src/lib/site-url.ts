const PRODUCTION_SITE_URL = 'https://ftiaxesite.gr'

function isLocalhostUrl(url: string): boolean {
  return /localhost|127\.0\.0\.1/i.test(url)
}

/** Resolve site URL from env (build-time or runtime). Never uses localhost on Vercel production. */
export function resolveSiteUrlFromEnv(envUrl?: string | null): string {
  const candidate = envUrl?.trim().replace(/\/$/, '')
  const isVercelProduction =
    process.env.VERCEL === '1' &&
    (process.env.VERCEL_ENV === 'production' || process.env.VERCEL_ENV === 'preview')

  if (isVercelProduction && (!candidate || isLocalhostUrl(candidate))) {
    return PRODUCTION_SITE_URL
  }

  if (process.env.NODE_ENV === 'production' && (!candidate || isLocalhostUrl(candidate))) {
    return PRODUCTION_SITE_URL
  }

  return candidate || PRODUCTION_SITE_URL
}

/** Runtime origin for canonical URLs, breadcrumbs, and JSON-LD. */
export function resolveSiteOrigin(astroSite: URL | string | undefined | null): string {
  const fromAstro =
    typeof astroSite === 'string' ? astroSite : astroSite?.href?.replace(/\/$/, '') ?? ''
  if (fromAstro && !isLocalhostUrl(fromAstro)) {
    return fromAstro
  }
  return PRODUCTION_SITE_URL
}

export function buildCanonicalUrl(pathname: string, siteOrigin: string): string {
  const path = pathname.endsWith('/') ? pathname : `${pathname}/`
  return new URL(path, `${siteOrigin.replace(/\/$/, '')}/`).href
}
