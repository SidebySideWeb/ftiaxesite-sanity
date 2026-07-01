/**
 * Security headers for ftiaxesite.gr.
 *
 * CSP allows GTM/GA4, Sanity CDN, and Cal.com embed.
 * Trusted Types: permissive default policy (see TrustedTypesBootstrap.astro)
 * keeps GTM/Cal.com working while blocking unsanitized DOM XSS sinks.
 */
function buildContentSecurityPolicy(): string {
  const directives = [
    "default-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "object-src 'none'",
    [
      "script-src",
      "'self'",
      "'unsafe-inline'",
      'https://www.googletagmanager.com',
      'https://www.google-analytics.com',
      'https://app.cal.com',
      'https://cal.com',
      'https://embed.cal.com',
    ].join(' '),
    ["style-src", "'self'", "'unsafe-inline'"].join(' '),
    ["font-src", "'self'", 'data:'].join(' '),
    [
      'img-src',
      "'self'",
      'data:',
      'blob:',
      'https://cdn.sanity.io',
      'https://www.googletagmanager.com',
      'https://www.google-analytics.com',
      'https://region1.google-analytics.com',
      'https://www.google.com',
      'https://maps.google.com',
    ].join(' '),
    [
      'connect-src',
      "'self'",
      'https://*.sanity.io',
      'https://www.googletagmanager.com',
      'https://www.google-analytics.com',
      'https://region1.google-analytics.com',
      'https://analytics.google.com',
      'https://stats.g.doubleclick.net',
      'https://www.google.com',
      'https://api.cal.com',
    ].join(' '),
    [
      'frame-src',
      "'self'",
      'https://www.googletagmanager.com',
      'https://app.cal.com',
      'https://cal.com',
      'https://embed.cal.com',
    ].join(' '),
    "worker-src 'self' blob:",
    "manifest-src 'self'",
    "require-trusted-types-for 'script'",
    'trusted-types default',
    'upgrade-insecure-requests',
  ]

  return directives.join('; ')
}

export function buildSecurityHeaders(): Record<string, string> {
  return {
    'Content-Security-Policy': buildContentSecurityPolicy(),
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
    'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
    'Cross-Origin-Resource-Policy': 'same-site',
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
  }
}

const ONE_YEAR_IMMUTABLE = 'public, max-age=31536000, immutable'

function toHeaderEntries(headers: Record<string, string>) {
  return Object.entries(headers).map(([key, value]) => ({key, value}))
}

export function buildStaticAssetCacheHeaders(): Record<string, string> {
  return {
    'Cache-Control': ONE_YEAR_IMMUTABLE,
  }
}

/** Vercel `headers` config — cache rules must appear before the catch-all security rule. */
/** Lets Sanity Studio (cross-site) read the Cal.com bookings proxy response. */
export function buildBookingsApiHeaders(): Record<string, string> {
  return {
    'Cross-Origin-Resource-Policy': 'cross-origin',
  }
}

export function buildVercelHeadersConfig() {
  const cacheHeaders = toHeaderEntries(buildStaticAssetCacheHeaders())
  const securityHeaders = toHeaderEntries(buildSecurityHeaders())
  const bookingsApiHeaders = toHeaderEntries(buildBookingsApiHeaders())

  return {
    headers: [
      {source: '/_astro/(.*)', headers: cacheHeaders},
      {source: '/images/(.*)', headers: cacheHeaders},
      {source: '/fonts/(.*)', headers: cacheHeaders},
      {source: '/api/bookings', headers: bookingsApiHeaders},
      {source: '/api/bookings/', headers: bookingsApiHeaders},
      {source: '/(.*)', headers: securityHeaders},
    ],
  }
}
