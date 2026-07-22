/**
 * Server-side Google reCAPTCHA v3 verification.
 * Secret must never be exposed to the client.
 */

const DEFAULT_MIN_SCORE = 0.5
const EXPECTED_ACTION = 'quote_submit'

export interface RecaptchaVerifyResult {
  readonly success: boolean
  readonly score?: number
  readonly action?: string
  readonly errorCodes?: readonly string[]
}

export async function verifyRecaptchaToken(
  token: string | null | undefined,
  remoteip?: string | null,
): Promise<RecaptchaVerifyResult> {
  const secret = (import.meta.env.RECAPTCHA_SECRET_KEY ?? '').trim()
  if (!secret) {
    throw new Error('RECAPTCHA_SECRET_KEY is not configured')
  }

  const trimmed = typeof token === 'string' ? token.trim() : ''
  if (!trimmed) {
    return {success: false, errorCodes: ['missing-input-response']}
  }

  const body = new URLSearchParams()
  body.set('secret', secret)
  body.set('response', trimmed)
  if (remoteip) body.set('remoteip', remoteip)

  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body,
  })

  if (!response.ok) {
    console.error('[recaptcha] siteverify HTTP', response.status)
    return {success: false, errorCodes: ['siteverify-http-error']}
  }

  const data = (await response.json()) as {
    success?: boolean
    score?: number
    action?: string
    'error-codes'?: string[]
  }

  if (!data.success) {
    return {success: false, errorCodes: data['error-codes'], score: data.score, action: data.action}
  }

  const score = typeof data.score === 'number' ? data.score : 0
  const action = data.action ?? ''
  const minScore = Number(import.meta.env.RECAPTCHA_MIN_SCORE ?? DEFAULT_MIN_SCORE)

  if (action && action !== EXPECTED_ACTION) {
    return {success: false, score, action, errorCodes: ['action-mismatch']}
  }

  if (score < minScore) {
    return {success: false, score, action, errorCodes: ['score-too-low']}
  }

  return {success: true, score, action}
}

export function readRecaptchaToken(body: unknown): string | null {
  if (!body || typeof body !== 'object') return null
  const data = body as Record<string, unknown>
  const token = data.recaptchaToken ?? data['g-recaptcha-response']
  if (typeof token !== 'string') return null
  const trimmed = token.trim()
  return trimmed.length > 0 ? trimmed : null
}
