import {defineType, defineField} from 'sanity'
import {PackageIcon} from '@sanity/icons'

export const servicePackage = defineType({
  name: 'servicePackage',
  title: 'Service Package',
  type: 'document',
  icon: PackageIcon,
  fields: [
    defineField({name: 'title', title: 'Title', type: 'localeString'}),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title.el'},
    }),
    defineField({name: 'description', title: 'Description', type: 'localeText'}),
    defineField({name: 'price', title: 'Price', type: 'number'}),
    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      initialValue: 'EUR',
    }),
    defineField({
      name: 'deliveryDaysMin',
      title: 'Delivery days (min)',
      type: 'number',
    }),
    defineField({
      name: 'deliveryDaysMax',
      title: 'Delivery days (max)',
      type: 'number',
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{type: 'localeString'}],
    }),
    defineField({
      name: 'featured',
      title: 'Featured (popular badge)',
      type: 'boolean',
      initialValue: false,
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
    select: {title: 'title.el', subtitle: 'price', featured: 'featured'},
    prepare({title, subtitle, featured}) {
      return {
        title: featured ? `★ ${title}` : title,
        subtitle: subtitle != null ? `€${subtitle}` : undefined,
      }
    },
  },
})
