import {getSecret} from 'astro:env/server'

export interface Booking {
  readonly id: string
  readonly title: string
  readonly attendeeName: string
  readonly attendeeEmail: string
  readonly startTime: string
  readonly endTime: string
  readonly status: string
}

interface CalComAttendee {
  readonly name?: string
  readonly email?: string
}

interface CalComBooking {
  readonly id?: number
  readonly uid?: string
  readonly title?: string
  readonly status?: string
  readonly start?: string
  readonly end?: string
  readonly attendees?: readonly CalComAttendee[]
}

interface CalComBookingsResponse {
  readonly status?: string
  readonly data?: readonly CalComBooking[]
}

const CAL_COM_BOOKINGS_URL = 'https://api.cal.com/v2/bookings?status=upcoming'
const CAL_API_VERSION = '2024-08-13'

export function mapCalComBooking(booking: CalComBooking): Booking {
  const attendee = booking.attendees?.[0]

  return {
    id: booking.uid ?? String(booking.id ?? ''),
    title: booking.title ?? 'Untitled booking',
    attendeeName: attendee?.name ?? '—',
    attendeeEmail: attendee?.email ?? '—',
    startTime: booking.start ?? '',
    endTime: booking.end ?? '',
    status: booking.status ?? 'unknown',
  }
}

export async function fetchUpcomingBookings(): Promise<Booking[]> {
  const apiKey = getSecret('CAL_COM_API_KEY')
  if (!apiKey) {
    throw new Error('CAL_COM_API_KEY is not configured')
  }

  const response = await fetch(CAL_COM_BOOKINGS_URL, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'cal-api-version': CAL_API_VERSION,
    },
  })

  if (!response.ok) {
    const body = await response.text()
    throw new Error(`Cal.com API returned ${response.status}: ${body}`)
  }

  const payload = (await response.json()) as CalComBookingsResponse
  const items = Array.isArray(payload.data) ? payload.data : []

  return items.map(mapCalComBooking)
}
