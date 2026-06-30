import {defineType, defineField} from 'sanity'
import {EnvelopeIcon} from '@sanity/icons'

export const quotePage = defineType({
  name: 'quotePage',
  title: 'Get a Quote Page',
  type: 'document',
  icon: EnvelopeIcon,
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'reference', title: 'Reference ranges'},
    {name: 'nextSteps', title: 'What happens next'},
    {name: 'bottomSection', title: 'Bottom "questions?" section'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'heroHeading', title: 'Heading', type: 'localeString', group: 'hero'}),
    defineField({name: 'heroSubheading', title: 'Subheading', type: 'localeText', group: 'hero'}),

    defineField({name: 'referenceHeading', title: 'Heading', type: 'localeString', group: 'reference'}),
    defineField({
      name: 'referenceItems',
      title: 'Reference price items',
      type: 'array',
      of: [{type: 'referenceItem'}],
      group: 'reference',
    }),
    defineField({name: 'referenceFootnote', title: 'Footnote', type: 'localeText', group: 'reference'}),

    defineField({name: 'nextStepsHeading', title: 'Heading', type: 'localeString', group: 'nextSteps'}),
    defineField({
      name: 'nextStepsItems',
      title: 'Steps (short list)',
      type: 'array',
      of: [{type: 'localeString'}],
      group: 'nextSteps',
    }),

    // NEW — found in the real design, not in the original draft: an entire
    // extra section below the form offering a phone alternative + FAQ/Portfolio links.
    defineField({
      name: 'bottomSectionHeading',
      title: 'Heading',
      type: 'localeString',
      description: 'e.g. "Έχεις απορίες πριν ξεκινήσουμε;"',
      group: 'bottomSection',
    }),
    defineField({
      name: 'bottomSectionText',
      title: 'Text',
      type: 'localeText',
      description: 'e.g. "Αν προτιμάς μια πιο άμεση επαφή, μπορείς να μας καλέσεις στο..."',
      group: 'bottomSection',
    }),
    defineField({name: 'bottomSectionFaqLabel', title: 'FAQ button label', type: 'localeString', group: 'bottomSection', description: 'e.g. "Συχνές Ερωτήσεις"'}),
    defineField({name: 'bottomSectionFaqUrl', title: 'FAQ button URL', type: 'string', group: 'bottomSection', initialValue: '/ipiresies#faq'}),
    defineField({name: 'bottomSectionPortfolioLabel', title: 'Portfolio button label', type: 'localeString', group: 'bottomSection', description: 'e.g. "Δείτε τα Έργα μας"'}),
    defineField({name: 'bottomSectionPortfolioUrl', title: 'Portfolio button URL', type: 'string', group: 'bottomSection', initialValue: '/erga'}),
    defineField({
      name: 'bottomSectionNote',
      title: 'Editorial note',
      type: 'string',
      readOnly: true,
      initialValue:
        'Phone number itself lives in Site Settings → Contact (contactPhone) and is shared across the site, not duplicated here.',
      group: 'bottomSection',
    }),

    defineField({name: 'seo', title: 'SEO (Greek)', type: 'seoFields', group: 'seo'}),
    defineField({name: 'seoEn', title: 'SEO (English)', type: 'seoFields', group: 'seo'}),
  ],
  preview: {
    prepare() {
      return {title: 'Get a Quote Page'}
    },
  },
})

/**
 * REAL FORM FIELD REFERENCE (from the Stitch export) — for whoever builds the
 * Astro form component. These are intentionally NOT modeled as Sanity fields
 * (see note in ftiaxesite-cms-content-schema.md): the dropdown options are
 * structural/validation-bound, not editorial content. Keeping the exact real
 * values here so the build matches the design precisely:
 *
 * - Ονοματεπώνυμο * (text)
 * - Email * (email)
 * - Επωνυμία Επιχείρησης (προαιρετικά) (text, optional)
 * - Τύπος Project * (select):
 *     placeholder: "Επιλέξτε κατηγορία"
 *     options: "Απλό site παρουσίασης" | "Site με διαχείριση (WordPress)" |
 *              "E-shop / Σύνθετη εφαρμογή" | "Άλλο"
 * - Toggle: "Έχω ήδη ιστοσελίδα και θέλω ανανέωση"
 *     → when ON, reveal a URL text input, placeholder: "https://www.mysite.gr"
 * - Περιγραφή Project * (textarea)
 *     placeholder: "Περιγράψτε μας τι έχετε στο μυαλό σας..."
 * - Επιθυμητό Χρονοδιάγραμμα * (select):
 *     placeholder: "Πότε το χρειάζεστε;"
 *     options: "Άμεσα (εντός 1 μήνα)" | "Σύντομα (1-3 μήνες)" |
 *              "Ευέλικτο (πάνω από 3 μήνες)"
 * - Submit button: "Στείλε το αίτημα"
 * - Below button: "Καμία δέσμευση. Θα λάβεις μια αρχική εκτίμηση εντός 24 ωρών."
 *
 * On submit, this form should write a `formSubmission` document (see
 * schemaTypes/documents/formSubmission.ts) with formType: 'quote-request'.
 */
