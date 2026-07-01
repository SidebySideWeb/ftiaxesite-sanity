import {useEffect, useState} from 'react'
import type {ComponentType} from 'react'
import {Card, Stack, Text, Flex, Badge, Spinner, Box} from '@sanity/ui'
import {CalendarIcon} from '@sanity/icons'

/**
 * Bookings Tool
 * -------------
 * Adds a "Bookings" tab to the Studio toolbar that displays upcoming Cal.com
 * bookings, so the client never needs a second login.
 *
 * SECURITY NOTE — read before wiring this up:
 * Sanity Studio is a browser app. Its JS bundle is fully visible to anyone who
 * opens dev tools. NEVER put your Cal.com API key directly in this file or in
 * any Studio-side env var — that would leak your booking-management API key to
 * every Studio user.
 *
 * Instead, this component calls a small serverless endpoint you host yourself
 * (e.g. a Vercel API route in the SAME project as your Astro frontend, not in
 * Studio). That endpoint holds the real Cal.com API key server-side and proxies
 * the request. Example endpoint (Astro API route, `src/pages/api/bookings.ts`):
 *
 *   export async function GET() {
 *     const res = await fetch('https://api.cal.com/v2/bookings?status=upcoming', {
 *       headers: { Authorization: `Bearer ${import.meta.env.CAL_COM_API_KEY}` },
 *     })
 *     return new Response(await res.text(), {
 *       headers: { 'content-type': 'application/json' },
 *     })
 *   }
 *
 * Then set BOOKINGS_PROXY_URL below (or better, read it from a Studio plugin
 * option — see sanity.config.ts) to that endpoint's public URL.
 */

// Must match production canonical host (www) and trailing slash — bare ftiaxesite.gr
// redirects without CORS headers, which breaks browser fetch from Studio.
const BOOKINGS_PROXY_URL = 'https://www.ftiaxesite.gr/api/bookings/'

interface Booking {
  id: string
  title: string
  attendeeName: string
  attendeeEmail: string
  startTime: string
  endTime: string
  status: string
}

function BookingsToolComponent() {
  const [bookings, setBookings] = useState<Booking[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const res = await fetch(BOOKINGS_PROXY_URL)
        if (!res.ok) throw new Error(`Proxy returned ${res.status}`)
        const data = await res.json()
        if (!cancelled) setBookings(data.bookings ?? data)
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load bookings')
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <Box padding={4}>
      <Stack space={4}>
        <Text size={2} weight="bold">
          Upcoming Bookings (via Cal.com)
        </Text>

        {error && (
          <Card padding={3} tone="critical" radius={2}>
            <Text size={1}>
              Could not load bookings: {error}. Check that BOOKINGS_PROXY_URL in
              tools/bookingsTool.tsx points to a working endpoint.
            </Text>
          </Card>
        )}

        {!bookings && !error && (
          <Flex align="center" gap={2}>
            <Spinner />
            <Text size={1} muted>
              Loading bookings…
            </Text>
          </Flex>
        )}

        {bookings && bookings.length === 0 && (
          <Text size={1} muted>
            No upcoming bookings.
          </Text>
        )}

        {bookings &&
          bookings.map((booking) => (
            <Card key={booking.id} padding={3} radius={2} shadow={1}>
              <Stack space={2}>
                <Flex justify="space-between" align="center">
                  <Text weight="semibold">{booking.title}</Text>
                  <Badge tone={booking.status === 'accepted' ? 'positive' : 'caution'}>
                    {booking.status}
                  </Badge>
                </Flex>
                <Text size={1}>
                  {booking.attendeeName} · {booking.attendeeEmail}
                </Text>
                <Text size={1} muted>
                  {new Date(booking.startTime).toLocaleString('el-GR')} →{' '}
                  {new Date(booking.endTime).toLocaleString('el-GR')}
                </Text>
              </Stack>
            </Card>
          ))}
      </Stack>
    </Box>
  )
}

export const bookingsTool = {
  title: 'Bookings',
  name: 'bookings',
  icon: CalendarIcon,
  component: BookingsToolComponent as ComponentType,
}
