import {sendAdminNotificationEmail, type FormSubmissionEmailFields, type FormSubmissionType} from './admin-notification-email'
import {createSanityWriteClient} from './sanity-write-client'

export interface CreatedFormSubmission {
  readonly _id: string
}

export async function createFormSubmissionDocument(
  formType: FormSubmissionType,
  fields: FormSubmissionEmailFields,
): Promise<CreatedFormSubmission> {
  const client = createSanityWriteClient()

  const created = await client.create({
    _type: 'formSubmission',
    formType,
    name: fields.name,
    email: fields.email || undefined,
    phone: fields.phone || undefined,
    company: fields.company ?? undefined,
    projectType: fields.projectType ?? undefined,
    hasExistingWebsite: fields.hasExistingWebsite ?? undefined,
    existingWebsiteUrl: fields.existingWebsiteUrl ?? undefined,
    message: fields.message ?? undefined,
    timeline: fields.timeline ?? undefined,
    read: false,
    submittedAt: new Date().toISOString(),
  })

  try {
    await sendAdminNotificationEmail(formType, fields, created._id)
  } catch (error) {
    console.error('[form-submission] Admin notification email failed after Sanity create:', error)
  }

  return {_id: created._id}
}

function readString(value: unknown): string | null {
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  return trimmed.length > 0 ? trimmed : null
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE_CHARS_RE = /^[+\d\s().-]+$/

function parseContact(contact: string): {email?: string; phone?: string} | null {
  const trimmed = contact.trim()
  if (!trimmed) return null
  if (EMAIL_RE.test(trimmed)) return {email: trimmed}
  const digits = trimmed.replace(/\D/g, '')
  if (PHONE_CHARS_RE.test(trimmed) && digits.length >= 10) return {phone: trimmed}
  return null
}

/** New lead form: name + phone-or-email + optional business. */
export function parseLeadRequestBody(body: unknown): FormSubmissionEmailFields | null {
  if (!body || typeof body !== 'object') return null
  const data = body as Record<string, unknown>

  const name = readString(data.name)
  const contactRaw = readString(data.contact) ?? readString(data.email) ?? readString(data.phone)
  const business = readString(data.business) ?? readString(data.company)

  // Honeypot
  if (readString(data.website)) return null

  if (!name || !contactRaw) return null
  const contact = parseContact(contactRaw)
  if (!contact) return null

  return {
    name,
    email: contact.email ?? '',
    phone: contact.phone ?? null,
    company: business,
    message: business,
    projectType: business ?? 'lead',
  }
}

/** Legacy quote form parser (kept for older clients). */
export function parseQuoteRequestBody(body: unknown): FormSubmissionEmailFields | null {
  // Prefer new lead shape when `contact` is present.
  if (body && typeof body === 'object' && 'contact' in (body as object)) {
    return parseLeadRequestBody(body)
  }

  if (!body || typeof body !== 'object') return null
  const data = body as Record<string, unknown>

  const name = readString(data.name)
  const email = readString(data.email)
  const projectType = readString(data.projectType)
  const message = readString(data.message)
  const timeline = readString(data.timeline)

  // New slim form may send name + email/phone without projectType/message/timeline
  if (name && email && !projectType && !message && !timeline) {
    return parseLeadRequestBody({name, contact: email, business: data.business ?? data.company})
  }

  if (name && !email) {
    const phone = readString(data.phone)
    if (phone) return parseLeadRequestBody({name, contact: phone, business: data.business ?? data.company})
  }

  if (!name || !email || !projectType || !message || !timeline) return null

  const hasExistingWebsite =
    typeof data.hasExistingWebsite === 'boolean'
      ? data.hasExistingWebsite
      : data.hasExistingWebsite === 'true' || data.hasExistingWebsite === 'on'

  return {
    name,
    email,
    company: readString(data.company),
    projectType,
    hasExistingWebsite,
    existingWebsiteUrl: readString(data.existingWebsiteUrl),
    message,
    timeline,
  }
}

export function parseContactBody(body: unknown): FormSubmissionEmailFields | null {
  if (!body || typeof body !== 'object') return null
  const data = body as Record<string, unknown>

  const name = readString(data.name)
  const email = readString(data.email)
  const message = readString(data.message)

  if (!name || !email || !message) return null
  return {name, email, message}
}
