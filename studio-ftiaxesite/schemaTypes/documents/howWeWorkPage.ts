import {defineType, defineField} from 'sanity'
import {RocketIcon} from '@sanity/icons'

export const howWeWorkPage = defineType({
  name: 'howWeWorkPage',
  title: 'How We Work Page',
  type: 'document',
  icon: RocketIcon,
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'timeline', title: 'Timeline'},
    {name: 'included', title: 'Always included'},
    {name: 'cta', title: 'Bottom CTA'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'heroHeading', title: 'Heading', type: 'localeString', group: 'hero'}),
    defineField({name: 'heroSubheading', title: 'Subheading', type: 'localeText', group: 'hero'}),

    defineField({
      name: 'timelineSteps',
      title: 'Timeline steps',
      type: 'array',
      of: [{type: 'detailedStepItem'}],
      group: 'timeline',
    }),

    defineField({name: 'alwaysIncludedHeading', title: 'Heading', type: 'localeString', group: 'included'}),
    defineField({
      name: 'alwaysIncludedItems',
      title: 'Items',
      type: 'array',
      of: [{type: 'localeString'}],
      group: 'included',
    }),

    defineField({name: 'bottomCtaHeading', title: 'Heading', type: 'localeString', group: 'cta'}),
    defineField({name: 'bottomCtaButtonLabel', title: 'Button label', type: 'localeString', group: 'cta'}),

    defineField({name: 'seo', title: 'SEO (Greek)', type: 'seoFields', group: 'seo'}),
    defineField({name: 'seoEn', title: 'SEO (English)', type: 'seoFields', group: 'seo'}),
  ],
  preview: {
    prepare() {
      return {title: 'How We Work Page'}
    },
  },
})
