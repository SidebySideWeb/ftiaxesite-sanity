import {defineType, defineField} from 'sanity'
import {ChevronRightIcon} from '@sanity/icons'

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  icon: ChevronRightIcon,
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'infoCard', title: 'Info card'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'heroHeading', title: 'Heading', type: 'localeString', group: 'hero'}),
    defineField({name: 'heroSubheading', title: 'Subheading', type: 'localeText', group: 'hero'}),

    defineField({name: 'infoCardEmail', title: 'Email', type: 'string', initialValue: 'info@ftiaxesite.gr', group: 'infoCard'}),
    defineField({name: 'infoCardLocation', title: 'Location', type: 'localeString', group: 'infoCard'}),
    defineField({name: 'infoCardResponseTime', title: 'Response time', type: 'localeString', group: 'infoCard'}),
    defineField({name: 'infoCardPromptText', title: 'Prompt text', type: 'localeString', group: 'infoCard'}),
    defineField({name: 'infoCardCtaLabel', title: 'CTA label', type: 'localeString', group: 'infoCard'}),

    defineField({name: 'seo', title: 'SEO (Greek)', type: 'seoFields', group: 'seo'}),
    defineField({name: 'seoEn', title: 'SEO (English)', type: 'seoFields', group: 'seo'}),
  ],
  preview: {
    prepare() {
      return {title: 'Contact Page'}
    },
  },
})
