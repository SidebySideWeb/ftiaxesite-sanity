import type {APIRoute} from 'astro'
import {createFormSubmissionDocument, parseContactBody} from '../../lib/form-submission-handler'

export const prerender = false

async function readJsonBody(request: Request): Promise<unknown> {
  const contentType = request.headers.get('content-type') ?? ''
  if (contentType.includes('application/json')) {
    return request.json()
  }
  if (contentType.includes('application/x-www-form-urlencoded') || contentType.includes('multipart/form-data')) {
    const formData = await request.formData()
    return Object.fromEntries(formData.entries())
  }
  return request.json().catch(() => null)
}

function jsonResponse(body: Record<string, unknown>, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {'Content-Type': 'application/json'},
  })
}

export const POST: APIRoute = async ({request}) => {
  try {
    const body = await readJsonBody(request)
    const fields = parseContactBody(body)

    if (!fields) {
      return jsonResponse({success: false, error: 'Invalid or incomplete form data.'}, 400)
    }

    const created = await createFormSubmissionDocument('contact', fields)

    return jsonResponse({success: true, id: created._id}, 201)
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error('[api/contact] Sanity create failed:', message)

    const isDev = import.meta.env.DEV
    const isConfigError = message.includes('SANITY_WRITE_TOKEN')
    const clientError =
      isDev && isConfigError
        ? 'Server misconfiguration: SANITY_WRITE_TOKEN is not set in web/.env'
        : 'Unable to save your submission. Please try again later.'

    return jsonResponse({success: false, error: clientError}, isConfigError ? 503 : 500)
  }
}
