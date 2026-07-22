import {defineType, defineField} from 'sanity'
import {HelpCircleIcon} from '@sanity/icons'

export const faqItem = defineType({
  name: 'faqItem',
  title: 'FAQ Item',
  type: 'document',
  icon: HelpCircleIcon,
  fields: [
    defineField({name: 'question', title: 'Question', type: 'localeString'}),
    defineField({name: 'answer', title: 'Answer', type: 'localeText'}),
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
    select: {title: 'question.el', subtitle: 'order'},
    prepare({title, subtitle}) {
      return {title, subtitle: subtitle != null ? `#${subtitle}` : undefined}
    },
  },
})
