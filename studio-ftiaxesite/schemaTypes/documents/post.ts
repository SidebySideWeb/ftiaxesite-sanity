import {defineType, defineField} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'

export const post = defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'title', title: 'Title', type: 'localeString', group: 'content'}),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title.el'},
      group: 'content',
    }),
    defineField({name: 'excerpt', title: 'Excerpt', type: 'localeText', group: 'content'}),
    defineField({name: 'body', title: 'Body', type: 'localeRichText', group: 'content'}),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      group: 'content',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {hotspot: true},
      group: 'content',
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO title (optional override)',
      type: 'localeString',
      group: 'seo',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO description (optional override)',
      type: 'localeText',
      group: 'seo',
    }),
  ],
  orderings: [
    {
      title: 'Newest first',
      name: 'publishedAtDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {title: 'title.el', subtitle: 'publishedAt', media: 'mainImage'},
  },
})
