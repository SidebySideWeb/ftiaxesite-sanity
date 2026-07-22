import {defineType, defineField} from 'sanity'
import {HomeIcon} from '@sanity/icons'

export const homePage = defineType({
  name: 'homePage',
  title: 'Homepage',
  type: 'document',
  icon: HomeIcon,
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'values', title: 'Value props'},
    {name: 'pricing', title: 'Pricing'},
    {name: 'process', title: 'Process'},
    {name: 'stack', title: 'Tech stack'},
    {name: 'work', title: 'Portfolio'},
    {name: 'faq', title: 'FAQ'},
    {name: 'finalCta', title: 'Final CTA'},
    {name: 'quoteForm', title: 'Quote form'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    // ----- Hero -----
    defineField({name: 'heroEyebrow', title: 'Eyebrow', type: 'localeString', group: 'hero'}),
    defineField({
      name: 'heroHeading',
      title: 'Heading (before highlight)',
      type: 'localeString',
      description: 'Text before the green highlighted phrase, e.g. "Το site σου, έτοιμο και λειτουργικό σε"',
      group: 'hero',
    }),
    defineField({
      name: 'heroHighlight',
      title: 'Heading highlight (green phrase)',
      type: 'localeString',
      description: 'e.g. "2 εβδομάδες"',
      group: 'hero',
    }),
    defineField({name: 'heroBody', title: 'Body', type: 'localeText', group: 'hero'}),
    defineField({name: 'ctaPrimaryLabel', title: 'Primary CTA label', type: 'localeString', group: 'hero'}),
    defineField({name: 'ctaSecondaryLabel', title: 'Secondary CTA label', type: 'localeString', group: 'hero'}),
    defineField({
      name: 'receiptBadge',
      title: 'Receipt mock badge',
      type: 'localeString',
      description: 'e.g. "✓ Τελικές τιμές, χωρίς κρυφές χρεώσεις"',
      group: 'hero',
    }),
    defineField({
      name: 'heroToolsLine',
      title: 'Tools line',
      type: 'string',
      description: 'e.g. "WordPress · Astro · React · Next.js · Sanity CMS"',
      group: 'hero',
    }),

    // ----- Values (cards from valueProp collection; section copy only) -----
    defineField({
      name: 'valuesEyebrow',
      title: 'Eyebrow',
      type: 'localeString',
      group: 'values',
    }),
    defineField({name: 'valuesHeading', title: 'Heading', type: 'localeString', group: 'values'}),
    defineField({name: 'valuesIntro', title: 'Intro', type: 'localeText', group: 'values'}),

    // ----- Pricing (packages from servicePackage collection) -----
    defineField({name: 'pricingEyebrow', title: 'Eyebrow', type: 'localeString', group: 'pricing'}),
    defineField({name: 'pricingHeading', title: 'Heading', type: 'localeString', group: 'pricing'}),
    defineField({name: 'pricingIntro', title: 'Intro', type: 'localeText', group: 'pricing'}),
    defineField({
      name: 'pricingNote',
      title: 'Footnote',
      type: 'localeText',
      description: 'Delivery timeline disclaimer below pricing cards',
      group: 'pricing',
    }),
    defineField({
      name: 'popularBadgeLabel',
      title: 'Popular badge label',
      type: 'localeString',
      group: 'pricing',
    }),
    defineField({
      name: 'packageCtaLabel',
      title: 'Package card CTA label',
      type: 'localeString',
      group: 'pricing',
    }),

    // ----- Process (steps from processStep collection) -----
    defineField({name: 'processEyebrow', title: 'Eyebrow', type: 'localeString', group: 'process'}),
    defineField({name: 'processHeading', title: 'Heading', type: 'localeString', group: 'process'}),
    defineField({name: 'processIntro', title: 'Intro', type: 'localeText', group: 'process'}),

    // ----- Stack (chips from techItem collection) -----
    defineField({name: 'stackEyebrow', title: 'Eyebrow', type: 'localeString', group: 'stack'}),
    defineField({name: 'stackHeading', title: 'Heading', type: 'localeString', group: 'stack'}),
    defineField({name: 'stackIntro', title: 'Intro', type: 'localeText', group: 'stack'}),
    defineField({
      name: 'stackTechHeading',
      title: 'Technologies column heading',
      type: 'localeString',
      group: 'stack',
    }),
    defineField({
      name: 'stackTechIntro',
      title: 'Technologies column intro',
      type: 'localeText',
      group: 'stack',
    }),
    defineField({
      name: 'stackHostingHeading',
      title: 'Hosting column heading',
      type: 'localeString',
      group: 'stack',
    }),
    defineField({
      name: 'stackHostingIntro',
      title: 'Hosting column intro',
      type: 'localeText',
      group: 'stack',
    }),

    // ----- Work (projects from project collection) -----
    defineField({name: 'workEyebrow', title: 'Eyebrow', type: 'localeString', group: 'work'}),
    defineField({name: 'workHeading', title: 'Heading', type: 'localeString', group: 'work'}),
    defineField({name: 'workIntro', title: 'Intro', type: 'localeText', group: 'work'}),

    // ----- FAQ (items from faqItem collection) -----
    defineField({name: 'faqEyebrow', title: 'Eyebrow', type: 'localeString', group: 'faq'}),
    defineField({name: 'faqHeading', title: 'Heading', type: 'localeString', group: 'faq'}),
    defineField({name: 'faqIntro', title: 'Intro', type: 'localeText', group: 'faq'}),

    // ----- Final CTA -----
    defineField({name: 'finalCtaEyebrow', title: 'Eyebrow', type: 'localeString', group: 'finalCta'}),
    defineField({name: 'finalCtaHeading', title: 'Heading', type: 'localeString', group: 'finalCta'}),
    defineField({name: 'finalCtaBody', title: 'Body', type: 'localeText', group: 'finalCta'}),
    defineField({
      name: 'finalCtaPrimaryLabel',
      title: 'Primary CTA label',
      type: 'localeString',
      group: 'finalCta',
    }),
    defineField({
      name: 'finalCtaSecondaryLabel',
      title: 'Secondary CTA label (phone)',
      type: 'localeString',
      group: 'finalCta',
    }),

    // ----- Quote form (modal + /quote/ page) -----
    defineField({
      name: 'quoteForm',
      title: 'Quote form copy',
      type: 'object',
      group: 'quoteForm',
      fields: [
        defineField({name: 'title', title: 'Title', type: 'localeString'}),
        defineField({name: 'intro', title: 'Intro', type: 'localeText'}),
        defineField({name: 'nameLabel', title: 'Name label', type: 'localeString'}),
        defineField({name: 'emailLabel', title: 'Email label', type: 'localeString'}),
        defineField({name: 'companyLabel', title: 'Company label', type: 'localeString'}),
        defineField({name: 'packageLabel', title: 'Package label', type: 'localeString'}),
        defineField({name: 'packagePlaceholder', title: 'Package placeholder', type: 'localeString'}),
        defineField({name: 'otherPackageLabel', title: '"Other" package option', type: 'localeString'}),
        defineField({name: 'hasSiteLabel', title: 'Has existing site checkbox', type: 'localeString'}),
        defineField({name: 'existingUrlLabel', title: 'Existing URL label', type: 'localeString'}),
        defineField({name: 'descriptionLabel', title: 'Description label', type: 'localeString'}),
        defineField({name: 'timelineLabel', title: 'Timeline label', type: 'localeString'}),
        defineField({name: 'timelinePlaceholder', title: 'Timeline placeholder', type: 'localeString'}),
        defineField({name: 'timelineAsap', title: 'Timeline: ASAP', type: 'localeString'}),
        defineField({name: 'timelineSoon', title: 'Timeline: soon', type: 'localeString'}),
        defineField({name: 'timelineFlexible', title: 'Timeline: flexible', type: 'localeString'}),
        defineField({name: 'submitLabel', title: 'Submit button', type: 'localeString'}),
        defineField({name: 'footnote', title: 'Form footnote', type: 'localeText'}),
        defineField({name: 'successTitle', title: 'Success title', type: 'localeString'}),
        defineField({name: 'successBody', title: 'Success body', type: 'localeText'}),
        defineField({name: 'successCallPrompt', title: 'Success call prompt', type: 'localeString'}),
        defineField({name: 'successCalLabel', title: 'Success Cal.com button', type: 'localeString'}),
      ],
    }),

    // ----- SEO -----
    defineField({name: 'seoTitle', title: 'SEO title override', type: 'localeString', group: 'seo'}),
    defineField({name: 'seoDescription', title: 'SEO description override', type: 'localeText', group: 'seo'}),
  ],
  preview: {
    prepare() {
      return {title: 'Homepage'}
    },
  },
})
