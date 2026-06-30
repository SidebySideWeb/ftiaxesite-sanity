import {defineType, defineField} from 'sanity'
import {DocumentsIcon, DocumentTextIcon} from '@sanity/icons'
import {imageAltField} from '../objects/imageAlt'

export const blogIndexPage = defineType({
  name: 'blogIndexPage',
  title: 'Blog Index Page',
  type: 'document',
  icon: DocumentsIcon,
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'heroHeading', title: 'Heading', type: 'localeString', group: 'hero'}),
    defineField({name: 'heroSubheading', title: 'Subheading', type: 'localeText', group: 'hero'}),
    defineField({
      name: 'categories',
      title: 'Categories (filter pills)',
      type: 'array',
      of: [{type: 'localeString'}],
      group: 'hero',
    }),
    defineField({name: 'seo', title: 'SEO (Greek)', type: 'seoFields', group: 'seo'}),
    defineField({name: 'seoEn', title: 'SEO (English)', type: 'seoFields', group: 'seo'}),
  ],
  preview: {
    prepare() {
      return {title: 'Blog Index Page'}
    },
  },
})

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({name: 'slug', title: 'Slug', type: 'slug', options: {source: 'title.el'}, group: 'content'}),
    defineField({name: 'title', title: 'Title', type: 'localeString', group: 'content'}),
    defineField({name: 'excerpt', title: 'Excerpt (card preview)', type: 'localeText', group: 'content'}),
    defineField({name: 'body', title: 'Body', type: 'localeRichText', group: 'content'}),
    defineField({
      name: 'featuredImage',
      title: 'Featured image',
      type: 'image',
      fields: [imageAltField],
      group: 'content',
    }),
    defineField({name: 'category', title: 'Category', type: 'string', group: 'content'}),
    defineField({name: 'author', title: 'Author', type: 'string', initialValue: 'FtiaxeSite Team', group: 'content'}),
    defineField({name: 'publishedDate', title: 'Published date', type: 'date', group: 'content'}),
    defineField({name: 'readTimeMinutes', title: 'Read time (minutes)', type: 'number', group: 'content'}),
    defineField({name: 'seo', title: 'SEO (Greek)', type: 'seoFields', group: 'seo'}),
    defineField({name: 'seoEn', title: 'SEO (English)', type: 'seoFields', group: 'seo'}),
  ],
  preview: {
    select: {title: 'title.el', subtitle: 'category', media: 'featuredImage'},
  },
})
