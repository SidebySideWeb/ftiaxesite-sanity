import {defineMiddleware} from 'astro:middleware'
import {buildBookingsApiHeaders, buildSecurityHeaders} from './lib/security-headers'

const securityHeaders = buildSecurityHeaders()
const bookingsApiHeaders = buildBookingsApiHeaders()

function isBookingsApiPath(pathname: string): boolean {
  return pathname === '/api/bookings' || pathname === '/api/bookings/'
}

export const onRequest = defineMiddleware(async (context, next) => {
  const response = await next()

  for (const [name, value] of Object.entries(securityHeaders)) {
    if (isBookingsApiPath(context.url.pathname) && name in bookingsApiHeaders) {
      continue
    }
    response.headers.set(name, value)
  }

  if (isBookingsApiPath(context.url.pathname)) {
    for (const [name, value] of Object.entries(bookingsApiHeaders)) {
      response.headers.set(name, value)
    }
  }

  return response
})
