import {defineType, defineField} from 'sanity'
import {imageAltField} from './imageAlt'

export const serviceCard = defineType({
  name: 'serviceCard',
  title: 'Service card',
  type: 'object',
  fields: [
    defineField({name: 'icon', title: 'Icon name', type: 'string', description: 'e.g. "document", "pencil", "layers"'}),
    defineField({name: 'title', title: 'Title', type: 'localeString'}),
    defineField({name: 'description', title: 'Description', type: 'localeText'}),
    defineField({name: 'linkLabel', title: 'Link label', type: 'localeString'}),
    defineField({name: 'linkUrl', title: 'Link URL', type: 'string'}),
    defineField({name: 'techBadge', title: 'Tech badge (optional)', type: 'string'}),
    defineField({name: 'priceNote', title: 'Price note (optional)', type: 'localeString'}),
  ],
  preview: {select: {title: 'title.el'}},
})

export const valuePropItem = defineType({
  name: 'valuePropItem',
  title: 'Value proposition item',
  type: 'object',
  fields: [
    defineField({name: 'icon', title: 'Icon name', type: 'string'}),
    defineField({name: 'title', title: 'Title', type: 'localeString'}),
    defineField({name: 'description', title: 'Description', type: 'localeText'}),
  ],
  preview: {select: {title: 'title.el'}},
})

export const stepItem = defineType({
  name: 'stepItem',
  title: 'Step (short)',
  type: 'object',
  fields: [
    defineField({name: 'number', title: 'Number (e.g. "01")', type: 'string'}),
    defineField({name: 'title', title: 'Title', type: 'localeString'}),
    defineField({name: 'description', title: 'Description', type: 'localeText'}),
  ],
  preview: {select: {title: 'title.el', subtitle: 'number'}},
})

export const detailedStepItem = defineType({
  name: 'detailedStepItem',
  title: 'Step (detailed)',
  type: 'object',
  fields: [
    defineField({name: 'number', title: 'Number (e.g. "01")', type: 'string'}),
    defineField({name: 'icon', title: 'Icon name', type: 'string'}),
    defineField({name: 'title', title: 'Title', type: 'localeString'}),
    defineField({name: 'description', title: 'Description', type: 'localeText'}),
    defineField({name: 'duration', title: 'Duration label (optional)', type: 'localeString'}),
  ],
  preview: {select: {title: 'title.el', subtitle: 'number'}},
})

export const faqItem = defineType({
  name: 'faqItem',
  title: 'FAQ item',
  type: 'object',
  fields: [
    defineField({name: 'question', title: 'Question', type: 'localeString'}),
    defineField({name: 'answer', title: 'Answer', type: 'localeText'}),
  ],
  preview: {select: {title: 'question.el'}},
})

export const referenceItem = defineType({
  name: 'referenceItem',
  title: 'Reference price item',
  type: 'object',
  fields: [
    defineField({name: 'label', title: 'Label', type: 'localeString'}),
    defineField({name: 'priceNote', title: 'Price note', type: 'localeString'}),
  ],
  preview: {select: {title: 'label.el', subtitle: 'priceNote.el'}},
})

export const metricChip = defineType({
  name: 'metricChip',
  title: 'Metric chip (icon + label)',
  type: 'object',
  description:
    'Found in the real Stitch design (portfolio case study) as icon+label pairs, e.g. "savings" icon + "Μείωση κόστους φιλοξενίας"',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon name (Material Symbols ligature, e.g. "savings", "bolt", "calendar_today")',
      type: 'string',
    }),
    defineField({name: 'label', title: 'Label', type: 'localeString'}),
  ],
  preview: {select: {title: 'label.el', subtitle: 'icon'}},
})

export const clientLogo = defineType({
  name: 'clientLogo',
  title: 'Client / trust-bar entry',
  type: 'object',
  description:
    'From the homepage trust bar ("Εμπιστεύονται την τεχνογνωσία μας") — real client names shown as text, with an optional logo image for later.',
  fields: [
    defineField({name: 'name', title: 'Client name', type: 'string'}),
    defineField({name: 'logo', title: 'Logo (optional)', type: 'image', fields: [imageAltField]}),
  ],
  preview: {select: {title: 'name', media: 'logo'}},
})

export const serviceBlock = defineType({
  name: 'serviceBlock',
  title: 'Service block (detailed)',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'localeString'}),
    defineField({name: 'body', title: 'Body', type: 'localeText'}),
    defineField({name: 'idealForLabel', title: '"Ideal for" label', type: 'localeString'}),
    defineField({name: 'priceNote', title: 'Price note', type: 'localeString'}),
    defineField({name: 'ctaLabel', title: 'CTA label', type: 'localeString'}),
    defineField({name: 'ctaUrl', title: 'CTA URL', type: 'string'}),
    defineField({name: 'image', title: 'Image', type: 'image', fields: [imageAltField]}),
    defineField({
      name: 'crossLinkNote',
      title: 'Cross-link note (optional, e.g. sidebysideweb.gr mention)',
      type: 'localeText',
    }),
  ],
  preview: {select: {title: 'title.el'}},
})
