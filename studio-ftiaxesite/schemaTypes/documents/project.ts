import {defineType, defineField} from 'sanity'
import {ProjectsIcon} from '@sanity/icons'

const hexColor = (Rule: {regex: (pattern: RegExp, message: string) => unknown}) =>
  Rule.regex(/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/, 'Must be a valid hex color (e.g. #14614A)')

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: ProjectsIcon,
  fields: [
    defineField({name: 'title', title: 'Title', type: 'localeString'}),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title.el'},
    }),
    defineField({name: 'liveUrl', title: 'Live URL', type: 'url'}),
    defineField({name: 'category', title: 'Category', type: 'localeString'}),
    defineField({name: 'description', title: 'Description', type: 'localeText'}),
    defineField({
      name: 'screenshot',
      title: 'Screenshot',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'gradientFrom',
      title: 'Gradient from (hex)',
      type: 'string',
      validation: hexColor,
    }),
    defineField({
      name: 'gradientTo',
      title: 'Gradient to (hex)',
      type: 'string',
      validation: hexColor,
    }),
    defineField({
      name: 'featured',
      title: 'Featured on homepage',
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
    select: {title: 'title.el', subtitle: 'category.el', media: 'screenshot'},
  },
})
