import {defineType, defineField} from 'sanity'

export const navLink = defineType({
  name: 'navLink',
  title: 'Navigation link',
  type: 'object',
  fields: [
    defineField({name: 'label', title: 'Label', type: 'localeString'}),
    defineField({name: 'url', title: 'URL (internal path, e.g. /ipiresies)', type: 'string'}),
  ],
  preview: {
    select: {title: 'label.el', subtitle: 'url'},
  },
})

export const footerColumn = defineType({
  name: 'footerColumn',
  title: 'Footer column',
  type: 'object',
  description:
    'From the real design: footer has named columns (e.g. "Πλοήγηση", "Εταιρεία", "Social") each with their own link list — not the same as the top nav.',
  fields: [
    defineField({name: 'columnTitle', title: 'Column title', type: 'localeString'}),
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [{type: 'navLink'}],
    }),
  ],
  preview: {select: {title: 'columnTitle.el'}},
})
