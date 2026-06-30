import {Resend} from 'resend'
import {getSecret} from 'astro:env/server'

export type FormSubmissionType = 'quote-request' | 'contact'

export interface FormSubmissionEmailFields {
  readonly name: string
  readonly email: string
  readonly company?: string | null
  readonly projectType?: string | null
  readonly hasExistingWebsite?: boolean | null
  readonly existingWebsiteUrl?: string | null
  readonly message?: string | null
  readonly timeline?: string | null
}

// Must verify ftiaxesite.gr (or your sending subdomain) in the Resend dashboard before production delivery.
const DEFAULT_FROM = 'notifications@ftiaxesite.gr'

function studioEditUrl(documentId: string): string {
  const base = (getSecret('SANITY_STUDIO_URL') ?? 'https://ftiaxesite.sanity.studio').replace(/\/$/, '')
  return `${base}/intent/edit/id=${documentId};type=formSubmission`
}

function yesNo(value: boolean | null | undefined): string {
  if (value === true) return 'Ναι'
  if (value === false) return 'Όχι'
  return '—'
}

function formatField(label: string, value: string | null | undefined): string {
  const trimmed = value?.trim()
  if (!trimmed) return ''
  return `${label}: ${trimmed}`
}

function buildEmailContent(formType: FormSubmissionType, fields: FormSubmissionEmailFields, documentId: string) {
  const studioUrl = studioEditUrl(documentId)

  const lines =
    formType === 'quote-request'
      ? [
          formatField('Όνοματεπώνυμο', fields.name),
          formatField('Email', fields.email),
          formatField('Επωνυμία Επιχείρησης', fields.company),
          formatField('Τύπος Project', fields.projectType),
          `Έχει ήδη ιστοσελίδα: ${yesNo(fields.hasExistingWebsite)}`,
          fields.hasExistingWebsite ? formatField('URL υπάρχουσας ιστοσελίδας', fields.existingWebsiteUrl) : '',
          formatField('Περιγραφή Project', fields.message),
          formatField('Επιθυμητό Χρονοδιάγραμμα', fields.timeline),
        ]
      : [
          formatField('Όνοματεπώνυμο', fields.name),
          formatField('Email', fields.email),
          formatField('Μήνυμα', fields.message),
        ]

  const bodyText = [...lines.filter(Boolean), '', `Προβολή στο Studio: ${studioUrl}`].join('\n')

  const subject =
    formType === 'quote-request'
      ? `Νέο αίτημα προσφοράς από ${fields.name}`
      : `Νέο μήνυμα επικοινωνίας από ${fields.name}`

  const htmlRows = lines
    .filter(Boolean)
    .map((line) => {
      const [label, ...rest] = line.split(': ')
      return `<tr><td style="padding:6px 12px 6px 0;font-weight:600;vertical-align:top">${label}</td><td style="padding:6px 0">${rest.join(': ')}</td></tr>`
    })
    .join('')

  const html = `
    <p>Νέα υποβολή φόρμας (${formType === 'quote-request' ? 'Ζήτηση προσφοράς' : 'Επικοινωνία'}).</p>
    <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;line-height:1.5">${htmlRows}</table>
    <p style="margin-top:24px"><a href="${studioUrl}">Άνοιγμα στο Sanity Studio</a></p>
  `

  return {subject, bodyText, html}
}

/** Sends admin notification. Never throws — logs and returns on failure. */
export async function sendAdminNotificationEmail(
  formType: FormSubmissionType,
  fields: FormSubmissionEmailFields,
  documentId: string,
): Promise<void> {
  const apiKey = getSecret('RESEND_API_KEY')
  const to = getSecret('ADMIN_NOTIFICATION_EMAIL')

  if (!apiKey || !to) {
    console.warn('[admin-notification-email] Skipped: RESEND_API_KEY or ADMIN_NOTIFICATION_EMAIL not set')
    return
  }

  const {subject, bodyText, html} = buildEmailContent(formType, fields, documentId)

  try {
    const resend = new Resend(apiKey)
    const result = await resend.emails.send({
      from: DEFAULT_FROM,
      to: [to],
      subject,
      text: bodyText,
      html,
      replyTo: fields.email,
    })

    if (result.error) {
      console.error('[admin-notification-email] Resend API error:', result.error)
    }
  } catch (error) {
    console.error('[admin-notification-email] Failed to send email:', error)
  }
}
