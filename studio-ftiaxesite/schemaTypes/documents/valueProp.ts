import {defineType, defineField} from 'sanity'
import {StarIcon} from '@sanity/icons'

export const valueProp = defineType({
  name: 'valueProp',
  title: 'Value Proposition',
  type: 'document',
  icon: StarIcon,
  fields: [
    defineField({name: 'title', title: 'Title', type: 'localeString'}),
    defineField({name: 'description', title: 'Description', type: 'localeText'}),
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
    select: {title: 'title.el', subtitle: 'order'},
    prepare({title, subtitle}) {
      return {title, subtitle: subtitle != null ? `#${subtitle}` : undefined}
    },
  },
})
