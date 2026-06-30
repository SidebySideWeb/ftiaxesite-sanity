import {defineType, defineField} from 'sanity'
import {ListIcon} from '@sanity/icons'

export const servicesPage = defineType({
  name: 'servicesPage',
  title: 'Services Page',
  type: 'document',
  icon: ListIcon,
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'blocks', title: 'Service blocks'},
    {name: 'addOns', title: 'Add-ons'},
    {name: 'faq', title: 'FAQ'},
    {name: 'cta', title: 'Bottom CTA'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'heroLabel', title: 'Label', type: 'localeString', group: 'hero', initialValue: {el: 'ΥΠΗΡΕΣΙΕΣ', en: 'SERVICES'}}),
    defineField({name: 'heroHeading', title: 'Heading', type: 'localeString', group: 'hero'}),
    defineField({name: 'heroSubheading', title: 'Subheading', type: 'localeText', group: 'hero'}),

    defineField({
      name: 'serviceBlocks',
      title: 'Service blocks',
      type: 'array',
      of: [{type: 'serviceBlock'}],
      group: 'blocks',
    }),

    defineField({name: 'addOnsHeading', title: 'Heading', type: 'localeString', group: 'addOns'}),
    defineField({
      name: 'addOnsItems',
      title: 'Add-on items',
      type: 'array',
      of: [{type: 'localeString'}],
      group: 'addOns',
    }),

    defineField({name: 'faqHeading', title: 'Heading', type: 'localeString', group: 'faq'}),
    defineField({
      name: 'faqItems',
      title: 'FAQ items',
      type: 'array',
      of: [{type: 'faqItem'}],
      group: 'faq',
    }),

    defineField({name: 'bottomCtaHeading', title: 'Heading', type: 'localeString', group: 'cta'}),
    defineField({name: 'bottomCtaText', title: 'Text', type: 'localeText', group: 'cta'}),
    defineField({name: 'bottomCtaButtonLabel', title: 'Button label', type: 'localeString', group: 'cta'}),

    defineField({name: 'seo', title: 'SEO (Greek)', type: 'seoFields', group: 'seo'}),
    defineField({name: 'seoEn', title: 'SEO (English)', type: 'seoFields', group: 'seo'}),
  ],
  preview: {
    prepare() {
      return {title: 'Services Page'}
    },
  },
})
