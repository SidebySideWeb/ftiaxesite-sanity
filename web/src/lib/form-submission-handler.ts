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
    email: fields.email,
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

export function parseQuoteRequestBody(body: unknown): FormSubmissionEmailFields | null {
  if (!body || typeof body !== 'object') return null
  const data = body as Record<string, unknown>

  const name = readString(data.name)
  const email = readString(data.email)
  const projectType = readString(data.projectType)
  const message = readString(data.message)
  const timeline = readString(data.timeline)

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
