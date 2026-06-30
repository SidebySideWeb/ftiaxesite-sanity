import {defineType, defineField} from 'sanity'
import {EnvelopeIcon} from '@sanity/icons'

/**
 * formSubmission
 *
 * Field names below match the REAL Get a Quote form found in the Stitch
 * export exactly (see the reference comment at the bottom of quotePage.ts).
 * Two corrections vs. the earlier draft of this schema:
 *   - removed `budgetRange` — the real form does not ask for budget
 *   - removed `phone` — the real form does not collect a phone number
 *   - added `hasExistingWebsite` + `existingWebsiteUrl` — a toggle field
 *     that reveals a URL input, present in the real design
 *
 * NOT edited by hand in the Studio. Your Astro API route (server-side, using
 * a write-enabled Sanity token that is NEVER exposed to the browser) creates
 * one of these documents per form submission, e.g.:
 *
 *   await client.create({
 *     _type: 'formSubmission',
 *     formType: 'quote-request',
 *     name: data.name,
 *     email: data.email,
 *     company: data.company,
 *     projectType: data.projectType,
 *     hasExistingWebsite: data.hasExistingWebsite,
 *     existingWebsiteUrl: data.existingWebsiteUrl,
 *     message: data.message,
 *     timeline: data.timeline,
 *     read: false,
 *     submittedAt: new Date().toISOString(),
 *   })
 *
 * IMPORTANT SECURITY NOTE: by default, Sanity gives unauthenticated read
 * access to published documents in public datasets. Since this document type
 * holds personal data, restrict public read access to this document type —
 * see Sanity docs: "Securing user-generated content".
 */
export const formSubmission = defineType({
  name: 'formSubmission',
  title: 'Form Submission',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: 'formType',
      title: 'Form type',
      type: 'string',
      options: {
        list: [
          {title: 'Quote Request', value: 'quote-request'},
          {title: 'Contact', value: 'contact'},
        ],
      },
      readOnly: true,
    }),
    defineField({name: 'name', title: 'Όνοματεπώνυμο', type: 'string', readOnly: true}),
    defineField({name: 'email', title: 'Email', type: 'string', readOnly: true}),
    defineField({name: 'company', title: 'Επωνυμία Επιχείρησης', type: 'string', readOnly: true}),
    defineField({
      name: 'projectType',
      title: 'Τύπος Project',
      type: 'string',
      description: 'One of: Απλό site παρουσίασης / Site με διαχείριση (WordPress) / E-shop / Σύνθετη εφαρμογή / Άλλο',
      readOnly: true,
    }),
    defineField({
      name: 'hasExistingWebsite',
      title: 'Έχω ήδη ιστοσελίδα και θέλω ανανέωση',
      type: 'boolean',
      readOnly: true,
    }),
    defineField({name: 'existingWebsiteUrl', title: 'Existing website URL', type: 'string', readOnly: true}),
    defineField({name: 'message', title: 'Περιγραφή Project', type: 'text', rows: 4, readOnly: true}),
    defineField({
      name: 'timeline',
      title: 'Επιθυμητό Χρονοδιάγραμμα',
      type: 'string',
      description: 'One of: Άμεσα (εντός 1 μήνα) / Σύντομα (1-3 μήνες) / Ευέλικτο (πάνω από 3 μήνες)',
      readOnly: true,
    }),
    defineField({
      name: 'read',
      title: 'Read',
      type: 'boolean',
      initialValue: false,
      description: 'Toggle when you have actioned this submission',
    }),
    defineField({
      name: 'starred',
      title: 'Starred (important)',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({name: 'submittedAt', title: 'Submitted at', type: 'datetime', readOnly: true}),
  ],
  orderings: [
    {
      title: 'Newest first',
      name: 'submittedAtDesc',
      by: [{field: 'submittedAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {title: 'name', subtitle: 'email', read: 'read'},
    prepare({title, subtitle, read}) {
      return {
        title: read ? title : `🔵 ${title}`,
        subtitle,
      }
    },
  },
})
