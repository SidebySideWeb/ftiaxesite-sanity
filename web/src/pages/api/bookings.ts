import type {APIRoute} from 'astro'
import {fetchUpcomingBookings} from '../../lib/cal-com-bookings'

export const prerender = false

const STUDIO_ORIGIN = import.meta.env.SANITY_STUDIO_URL ?? 'https://ftiaxesite.sanity.studio'

const corsHeaders = {
  'Access-Control-Allow-Origin': STUDIO_ORIGIN,
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  Vary: 'Origin',
}

function jsonResponse(body: Record<string, unknown>, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {'Content-Type': 'application/json', ...corsHeaders},
  })
}

export const OPTIONS: APIRoute = async () => new Response(null, {status: 204, headers: corsHeaders})

export const GET: APIRoute = async () => {
  try {
    const bookings = await fetchUpcomingBookings()
    return jsonResponse({bookings}, 200)
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error('[api/bookings] Cal.com fetch failed:', message)

    const isDev = import.meta.env.DEV
    const isConfigError = message.includes('CAL_COM_API_KEY')
    const clientError =
      isDev && isConfigError
        ? 'Server misconfiguration: CAL_COM_API_KEY is not set in web/.env'
        : 'Unable to load bookings from Cal.com. Please try again later.'

    return jsonResponse({error: clientError, bookings: []}, isConfigError ? 503 : 500)
  }
}
