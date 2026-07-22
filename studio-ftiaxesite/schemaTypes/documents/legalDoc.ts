import {defineType, defineField} from 'sanity'
import {DocumentIcon} from '@sanity/icons'

export const legalDoc = defineType({
  name: 'legalDoc',
  title: 'Legal Document',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          {title: 'Privacy policy', value: 'privacy'},
          {title: 'Cookie policy', value: 'cookies'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'title', title: 'Title', type: 'localeString'}),
    defineField({name: 'lastUpdated', title: 'Last updated', type: 'date'}),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'localeText',
      description: 'Plain-text legal copy (use line breaks for paragraphs)',
    }),
  ],
  preview: {
    select: {title: 'title.el', subtitle: 'type', date: 'lastUpdated'},
    prepare({title, subtitle, date}) {
      return {title, subtitle: [subtitle, date].filter(Boolean).join(' · ')}
    },
  },
})
