import {defineMiddleware} from 'astro:middleware'
import {buildSecurityHeaders} from './lib/security-headers'

const securityHeaders = buildSecurityHeaders()

export const onRequest = defineMiddleware(async (_context, next) => {
  const response = await next()

  for (const [name, value] of Object.entries(securityHeaders)) {
    response.headers.set(name, value)
  }

  return response
})
