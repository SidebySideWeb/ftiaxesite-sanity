import type {APIRoute} from 'astro'
import {createFormSubmissionDocument, parseQuoteRequestBody} from '../../lib/form-submission-handler'
import {readRecaptchaToken, verifyRecaptchaToken} from '../../lib/recaptcha'

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

export const POST: APIRoute = async ({request, clientAddress}) => {
  try {
    const body = await readJsonBody(request)
    const fields = parseQuoteRequestBody(body)

    if (!fields) {
      return jsonResponse({success: false, error: 'Invalid or incomplete form data.'}, 400)
    }

    const recaptchaToken = readRecaptchaToken(body)
    const captcha = await verifyRecaptchaToken(recaptchaToken, clientAddress)
    if (!captcha.success) {
      console.warn(
        '[api/quote-request] reCAPTCHA failed:',
        captcha.errorCodes?.join(', '),
        'score=',
        captcha.score,
        'action=',
        captcha.action,
      )
      return jsonResponse(
        {
          success: false,
          error:
            request.headers.get('accept-language')?.includes('el')
              ? 'Ο έλεγχος ασφαλείας απέτυχε. Δοκίμασε ξανά.'
              : 'Security check failed. Please try again.',
        },
        400,
      )
    }

    const created = await createFormSubmissionDocument('quote-request', fields)

    return jsonResponse({success: true, id: created._id}, 201)
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    console.error('[api/quote-request] Submit failed:', message)

    const isDev = import.meta.env.DEV
    const isConfigError =
      message.includes('SANITY_WRITE_TOKEN') || message.includes('RECAPTCHA_SECRET_KEY')
    const clientError =
      isDev && isConfigError
        ? `Server misconfiguration: ${message}`
        : 'Unable to save your submission. Please try again later.'

    return jsonResponse({success: false, error: clientError}, isConfigError ? 503 : 500)
  }
}
