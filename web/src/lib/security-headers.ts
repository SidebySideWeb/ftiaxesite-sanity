/**
 * Security headers for ftiaxesite.gr.
 *
 * CSP allows GTM/GA4/Google Ads, Sanity CDN, Cal.com, and reCAPTCHA.
 * Trusted Types: permissive default policy created in BaseLayout
 * keeps GTM/Cal.com/lang toggle working while blocking unsanitized DOM XSS sinks.
 *
 * Ads endpoints follow Google Tag Platform CSP guidance:
 * https://developers.google.com/tag-platform/security/guides/csp
 */
function buildContentSecurityPolicy(): string {
  const googleScripts = [
    'https://www.googletagmanager.com',
    'https://*.googletagmanager.com',
    'https://www.google-analytics.com',
    'https://www.google.com',
    'https://www.gstatic.com',
    'https://www.googleadservices.com',
    'https://googleads.g.doubleclick.net',
    'https://pagead2.googlesyndication.com',
  ]
  const googleImages = [
    'https://www.googletagmanager.com',
    'https://*.googletagmanager.com',
    'https://www.google-analytics.com',
    'https://*.google-analytics.com',
    'https://region1.google-analytics.com',
    'https://www.google.com',
    'https://www.google.gr',
    'https://*.google.com',
    'https://google.com',
    'https://www.gstatic.com',
    'https://maps.google.com',
    'https://www.googleadservices.com',
    'https://googleads.g.doubleclick.net',
    'https://*.g.doubleclick.net',
    'https://pagead2.googlesyndication.com',
  ]
  const googleConnect = [
    'https://www.googletagmanager.com',
    'https://*.googletagmanager.com',
    'https://www.google-analytics.com',
    'https://*.google-analytics.com',
    'https://region1.google-analytics.com',
    'https://analytics.google.com',
    'https://*.analytics.google.com',
    'https://stats.g.doubleclick.net',
    'https://*.g.doubleclick.net',
    'https://ad.doubleclick.net',
    'https://www.google.com',
    'https://www.google.gr',
    'https://*.google.com',
    'https://google.com',
    'https://www.gstatic.com',
    'https://www.googleadservices.com',
    'https://googleads.g.doubleclick.net',
    'https://pagead2.googlesyndication.com',
  ]
  const googleFrames = [
    'https://www.googletagmanager.com',
    'https://www.google.com',
    'https://www.googleadservices.com',
    'https://recaptcha.google.com',
    'https://td.doubleclick.net',
    'https://bid.g.doubleclick.net',
    'https://pagead2.googlesyndication.com',
  ]

  const directives = [
    "default-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "object-src 'none'",
    [
      'script-src',
      "'self'",
      "'unsafe-inline'",
      ...googleScripts,
      'https://app.cal.com',
      'https://cal.com',
      'https://embed.cal.com',
    ].join(' '),
    ["style-src", "'self'", "'unsafe-inline'", 'https://www.gstatic.com'].join(' '),
    ["font-src", "'self'", 'data:'].join(' '),
    ['img-src', "'self'", 'data:', 'blob:', 'https://cdn.sanity.io', ...googleImages].join(' '),
    ['connect-src', "'self'", 'https://*.sanity.io', ...googleConnect, 'https://api.cal.com'].join(' '),
    [
      'frame-src',
      "'self'",
      ...googleFrames,
      'https://app.cal.com',
      'https://cal.com',
      'https://embed.cal.com',
    ].join(' '),
    "worker-src 'self' blob:",
    "manifest-src 'self'",
    "require-trusted-types-for 'script'",
    // default = our policy; goog#html = reCAPTCHA; allow-duplicates for GTM/reCAPTCHA reloads
    "trusted-types default goog#html goog#script goog#html-renderer 'allow-duplicates'",
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
export function buildVercelHeadersConfig() {
  const cacheHeaders = toHeaderEntries(buildStaticAssetCacheHeaders())
  const securityHeaders = toHeaderEntries(buildSecurityHeaders())

  return {
    headers: [
      {source: '/_astro/(.*)', headers: cacheHeaders},
      {source: '/images/(.*)', headers: cacheHeaders},
      {source: '/fonts/(.*)', headers: cacheHeaders},
      {source: '/(.*)', headers: securityHeaders},
    ],
  }
}
