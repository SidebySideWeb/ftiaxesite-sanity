import {defineType, defineField} from 'sanity'
import {HomeIcon} from '@sanity/icons'
import {imageAltField} from '../objects/imageAlt'

export const homePage = defineType({
  name: 'homePage',
  title: 'Homepage',
  type: 'document',
  icon: HomeIcon,
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'trustBar', title: 'Trust bar'},
    {name: 'valueProps', title: 'Why Astro + WordPress'},
    {name: 'portfolio', title: 'Portfolio preview'},
    {name: 'process', title: 'Process / How it works'},
    {name: 'cta', title: 'CTA'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    // ----- Hero -----
    // Real design: badge has an icon + text; heading is split into 3 parts so
    // ONE word can be styled/highlighted (e.g. "...με {μεράκι} και..."); the
    // hero image carries a floating stat badge ("10+ Χρόνια Εμπειρίας...").
    defineField({name: 'heroBadgeIcon', title: 'Badge icon (Material Symbols name, e.g. "verified")', type: 'string', group: 'hero'}),
    defineField({name: 'heroBadgeText', title: 'Badge text', type: 'localeString', group: 'hero'}),

    defineField({name: 'heroHeadingBefore', title: 'Heading — part before highlight', type: 'localeString', group: 'hero', description: 'e.g. "Ιστοσελίδες με"'}),
    defineField({name: 'heroHeadingHighlight', title: 'Heading — highlighted word', type: 'localeString', group: 'hero', description: 'e.g. "μεράκι" — rendered in the accent color'}),
    defineField({name: 'heroHeadingAfter', title: 'Heading — part after highlight', type: 'localeString', group: 'hero', description: 'e.g. "και τεχνική αρτιότητα"'}),

    defineField({name: 'heroSubheading', title: 'Subheading', type: 'localeText', group: 'hero'}),
    defineField({name: 'heroPrimaryCtaLabel', title: 'Primary CTA label', type: 'localeString', group: 'hero'}),
    defineField({name: 'heroPrimaryCtaUrl', title: 'Primary CTA URL', type: 'string', group: 'hero', initialValue: '/zita-prosfora'}),
    defineField({name: 'heroSecondaryCtaLabel', title: 'Secondary CTA label', type: 'localeString', group: 'hero'}),
    defineField({name: 'heroSecondaryCtaUrl', title: 'Secondary CTA URL', type: 'string', group: 'hero', initialValue: '/erga'}),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'image',
      fields: [imageAltField],
      group: 'hero',
    }),
    defineField({
      name: 'heroImageStatNumber',
      title: 'Hero image floating stat — number',
      type: 'string',
      description: 'e.g. "10+"',
      group: 'hero',
    }),
    defineField({
      name: 'heroImageStatLabel',
      title: 'Hero image floating stat — label',
      type: 'localeString',
      description: 'e.g. "Χρόνια Εμπειρίας στον Σχεδιασμό"',
      group: 'hero',
    }),

    // ----- Trust bar -----
    // Real design: this is a list of REAL CLIENT NAMES under a heading, not a
    // generic "Astro/WordPress/Cloudways" tech list.
    defineField({
      name: 'trustBarHeading',
      title: 'Trust bar heading',
      type: 'localeString',
      description: 'e.g. "Εμπιστεύονται την τεχνογνωσία μας"',
      group: 'trustBar',
    }),
    defineField({
      name: 'trustBarClients',
      title: 'Client names',
      type: 'array',
      of: [{type: 'clientLogo'}],
      group: 'trustBar',
    }),

    // ----- Value props ("Γιατί Astro + WordPress;") -----
    defineField({name: 'valuePropsHeading', title: 'Heading', type: 'localeString', group: 'valueProps'}),
    defineField({
      name: 'valuePropsIntro',
      title: 'Intro paragraph',
      type: 'localeText',
      description: 'e.g. "Ο συνδυασμός της ταχύτητας του Astro με την ευκολία διαχείρισης του WordPress..."',
      group: 'valueProps',
    }),
    defineField({
      name: 'valuePropItems',
      title: 'Value prop items',
      description: 'Real design has 3: Αστραπιαία Ταχύτητα (bolt), Απόλυτη Ασφάλεια (security), Εύκολη Διαχείριση (edit_note)',
      type: 'array',
      of: [{type: 'valuePropItem'}],
      group: 'valueProps',
    }),

    // ----- Portfolio preview -----
    // Real design shows MULTIPLE project cards (not just one featured), each
    // with its own tech-tag pills, plus a "see all" link.
    defineField({name: 'portfolioHeading', title: 'Heading', type: 'localeString', group: 'portfolio'}),
    defineField({name: 'portfolioSubheading', title: 'Subheading', type: 'localeText', group: 'portfolio'}),
    defineField({name: 'portfolioLinkLabel', title: '"See all" link label', type: 'localeString', group: 'portfolio', description: 'e.g. "Δείτε όλο το Portfolio"'}),
    defineField({name: 'portfolioLinkUrl', title: '"See all" link URL', type: 'string', group: 'portfolio', initialValue: '/erga'}),
    defineField({
      name: 'portfolioPreviewItems',
      title: 'Preview cards',
      description:
        'References to Case Study documents to feature here. The real design shows project name, one-line description, and tech-tag pills per card (those live on the Case Study document itself via techStack).',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'caseStudy'}]}],
      group: 'portfolio',
    }),

    // ----- Process / "Από τη στρατηγική στην υλοποίηση" -----
    // Real design: 3 steps with a supporting image, different focus than the
    // booking-style 4-step "How We Work" page (Discovery/Design/Dev/Launch).
    // This section is specifically about the STRATEGY → DESIGN → BUILD process.
    defineField({name: 'processHeading', title: 'Heading', type: 'localeString', group: 'process', description: 'e.g. "Από τη στρατηγική στην υλοποίηση"'}),
    defineField({name: 'processIntro', title: 'Intro text', type: 'localeText', group: 'process'}),
    defineField({
      name: 'processImage',
      title: 'Supporting image',
      type: 'image',
      fields: [imageAltField],
      group: 'process',
    }),
    defineField({
      name: 'processSteps',
      title: 'Steps',
      description: 'Real design has 3: Στρατηγική & Έρευνα / Σχεδιασμός UI/UX / Υλοποίηση & Test',
      type: 'array',
      of: [{type: 'stepItem'}],
      group: 'process',
    }),

    // ----- CTA -----
    defineField({name: 'ctaHeading', title: 'Heading', type: 'localeString', group: 'cta'}),
    defineField({name: 'ctaText', title: 'Text', type: 'localeText', group: 'cta'}),
    defineField({name: 'ctaButtonLabel', title: 'Button label', type: 'localeString', group: 'cta'}),
    defineField({name: 'ctaButtonUrl', title: 'Button URL', type: 'string', group: 'cta'}),
    defineField({name: 'ctaSubtext', title: 'Subtext', type: 'localeString', group: 'cta', description: 'e.g. "Δωρεάν συμβουλευτική και προσφορά εντός 24 ωρών."'}),

    defineField({name: 'seo', title: 'SEO (Greek)', type: 'seoFields', group: 'seo'}),
    defineField({name: 'seoEn', title: 'SEO (English)', type: 'seoFields', group: 'seo'}),
  ],
  preview: {
    prepare() {
      return {title: 'Homepage'}
    },
  },
})
