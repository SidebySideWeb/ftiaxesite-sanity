import {defineMiddleware} from 'astro:middleware'
import {getLocaleFromPath, stripLocalePrefix, type Locale} from './lib/locale'
import {buildSecurityHeaders} from './lib/security-headers'

const securityHeaders = buildSecurityHeaders()
const LOCALE_HEADER = 'x-ftiaxesite-locale'
const PATH_HEADER = 'x-ftiaxesite-public-path'

export const onRequest = defineMiddleware(async (context, next) => {
  const {pathname} = context.url

  if (pathname === '/en') {
    const redirect = context.redirect('/en/', 301)
    for (const [name, value] of Object.entries(securityHeaders)) {
      redirect.headers.set(name, value)
    }
    return redirect
  }

  const headerLocale = context.request.headers.get(LOCALE_HEADER)
  const locale: Locale =
    headerLocale === 'en' || headerLocale === 'el' ? headerLocale : getLocaleFromPath(pathname)

  context.locals.locale = locale
  context.locals.publicPath = context.request.headers.get(PATH_HEADER) || pathname

  let response: Response
  if (locale === 'en' && !headerLocale) {
    // Rewrite /en/... → /... while keeping browser URL and locale across the inner pass.
    const target = stripLocalePrefix(pathname)
    const rewriteUrl = new URL(target + context.url.search, context.url)
    const headers = new Headers(context.request.headers)
    headers.set(LOCALE_HEADER, 'en')
    headers.set(PATH_HEADER, pathname)
    response = await context.rewrite(new Request(rewriteUrl, {method: context.request.method, headers}))
  } else {
    response = await next()
  }

  for (const [name, value] of Object.entries(securityHeaders)) {
    response.headers.set(name, value)
  }

  return response
})
