import {defineType, defineField} from 'sanity'
import {CaseIcon, ProjectsIcon} from '@sanity/icons'
import {imageAltField} from '../objects/imageAlt'

export const portfolioPage = defineType({
  name: 'portfolioPage',
  title: 'Portfolio Page',
  type: 'document',
  icon: CaseIcon,
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'cta', title: 'Bottom CTA'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'heroHeading', title: 'Heading', type: 'localeString', group: 'hero'}),
    defineField({name: 'heroSubheading', title: 'Subheading', type: 'localeText', group: 'hero'}),
    defineField({name: 'bottomCtaHeading', title: 'Heading', type: 'localeString', group: 'cta'}),
    defineField({name: 'bottomCtaButtonLabel', title: 'Button label', type: 'localeString', group: 'cta'}),
    defineField({name: 'seo', title: 'SEO (Greek)', type: 'seoFields', group: 'seo'}),
    defineField({name: 'seoEn', title: 'SEO (English)', type: 'seoFields', group: 'seo'}),
  ],
  preview: {
    prepare() {
      return {title: 'Portfolio Page'}
    },
  },
})

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  icon: ProjectsIcon,
  groups: [
    {name: 'card', title: 'Card preview'},
    {name: 'body', title: 'Full case study'},
    {name: 'meta', title: 'Meta'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    // Card-level fields (shown on portfolio grid + homepage preview)
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title'}, group: 'card'}),
    defineField({name: 'categoryBadge', title: 'Category badge', type: 'localeString', group: 'card'}),
    defineField({name: 'title', title: 'Project title', type: 'string', group: 'card'}),
    defineField({name: 'summary', title: 'Short summary (card)', type: 'localeText', group: 'card'}),
    defineField({
      name: 'image',
      title: 'Thumbnail / screenshot',
      type: 'image',
      fields: [imageAltField],
      group: 'card',
    }),
    defineField({
      name: 'techStack',
      title: 'Tech stack',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
      group: 'card',
    }),
    defineField({
      name: 'metricChips',
      title: 'Metric chips (icon + label pairs)',
      description: 'Real design uses icon+label pairs, e.g. "savings" icon + "Μείωση κόστους φιλοξενίας"',
      type: 'array',
      of: [{type: 'metricChip'}],
      group: 'card',
    }),
    defineField({name: 'featured', title: 'Featured (shows in homepage + top of portfolio)', type: 'boolean', initialValue: false, group: 'card'}),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {list: [
        {title: 'Live', value: 'live'},
        {title: 'In Progress', value: 'inProgress'},
        {title: 'Coming Soon', value: 'comingSoon'},
      ]},
      initialValue: 'inProgress',
      group: 'card',
    }),
    defineField({name: 'publishedDate', title: 'Published date', type: 'date', group: 'card'}),

    // Full body (single case-study page)
    defineField({name: 'challenge', title: 'The Challenge', type: 'localeRichText', group: 'body'}),
    defineField({
      name: 'beforeMetrics',
      title: 'Before metrics (red/warning stat lines)',
      type: 'array',
      of: [{type: 'localeString'}],
      group: 'body',
    }),
    defineField({name: 'solution', title: 'The Solution', type: 'localeRichText', group: 'body'}),
    defineField({
      name: 'solutionSteps',
      title: 'Solution steps (numbered list)',
      type: 'array',
      of: [{type: 'localeString'}],
      group: 'body',
    }),
    defineField({name: 'results', title: 'The Results', type: 'localeRichText', group: 'body'}),
    defineField({
      name: 'afterMetrics',
      title: 'After metrics (green stat lines)',
      type: 'array',
      of: [{type: 'localeString'}],
      group: 'body',
    }),
    defineField({name: 'clientTestimonialQuote', title: 'Client testimonial quote', type: 'localeText', group: 'body'}),
    defineField({name: 'clientTestimonialAuthor', title: 'Client testimonial author', type: 'string', group: 'body'}),

    // Gate flag
    defineField({
      name: 'clientApprovedForPublicUse',
      title: '✅ Client approved real metrics for public use?',
      description:
        'Do NOT publish specific real numbers (e.g. exact savings, exact PageSpeed score) until the client has explicitly confirmed it is OK to share them publicly. Keep this OFF and use general language until confirmed.',
      type: 'boolean',
      initialValue: false,
      group: 'meta',
    }),

    defineField({name: 'seo', title: 'SEO (Greek)', type: 'seoFields', group: 'seo'}),
    defineField({name: 'seoEn', title: 'SEO (English)', type: 'seoFields', group: 'seo'}),
  ],
  preview: {
    select: {title: 'title', subtitle: 'categoryBadge.el', media: 'image'},
  },
})
