import {defineType, defineField} from 'sanity'
import {CodeBlockIcon} from '@sanity/icons'

export const techItem = defineType({
  name: 'techItem',
  title: 'Tech Item',
  type: 'document',
  icon: CodeBlockIcon,
  fields: [
    defineField({name: 'label', title: 'Label', type: 'string'}),
    defineField({
      name: 'group',
      title: 'Group',
      type: 'string',
      options: {
        list: [
          {title: 'Technology', value: 'technology'},
          {title: 'Hosting', value: 'hosting'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {title: 'label', subtitle: 'group'},
  },
})
