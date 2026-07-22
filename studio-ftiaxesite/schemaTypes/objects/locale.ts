import {defineType, defineField} from 'sanity'

/**
 * Bilingual string — single line text in Greek (primary) and English (secondary).
 * Use for: headings, button labels, short titles.
 */
export const localeString = defineType({
  name: 'localeString',
  title: 'Localized string',
  type: 'object',
  fieldsets: [
    {name: 'translations', title: 'Translations', options: {columns: 1}},
  ],
  fields: [
    defineField({
      name: 'el',
      title: 'Greek (primary)',
      type: 'string',
      fieldset: 'translations',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'en',
      title: 'English (secondary)',
      type: 'string',
      fieldset: 'translations',
    }),
  ],
})

/**
 * Bilingual text — multi-line plain text in Greek (primary) and English (secondary).
 * Use for: subheadings, descriptions, FAQ answers, short paragraphs.
 */
export const localeText = defineType({
  name: 'localeText',
  title: 'Localized text',
  type: 'object',
  fieldsets: [
    {name: 'translations', title: 'Translations', options: {columns: 1}},
  ],
  fields: [
    defineField({
      name: 'el',
      title: 'Greek (primary)',
      type: 'text',
      rows: 3,
      fieldset: 'translations',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'en',
      title: 'English (secondary)',
      type: 'text',
      rows: 3,
      fieldset: 'translations',
    }),
  ],
})

/**
 * Bilingual rich text — for full article/case-study bodies with formatting.
 */
export const localeRichText = defineType({
  name: 'localeRichText',
  title: 'Localized rich text',
  type: 'object',
  fieldsets: [
    {name: 'translations', title: 'Translations', options: {columns: 1}},
  ],
  fields: [
    defineField({
      name: 'el',
      title: 'Greek (primary)',
      type: 'array',
      of: [{type: 'block'}],
      fieldset: 'translations',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'en',
      title: 'English (secondary)',
      type: 'array',
      of: [{type: 'block'}],
      fieldset: 'translations',
    }),
  ],
})
