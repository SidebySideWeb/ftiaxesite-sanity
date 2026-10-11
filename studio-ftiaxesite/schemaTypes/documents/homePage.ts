import {defineArrayMember, defineField, defineType} from 'sanity'
import {HomeIcon} from '@sanity/icons'

const navItem = defineArrayMember({
  type: 'object',
  name: 'navItem',
  fields: [
    defineField({name: 'label', title: 'Label', type: 'localeString'}),
    defineField({name: 'href', title: 'Link', type: 'string'}),
  ],
  preview: {select: {title: 'label.el', subtitle: 'href'}},
})

const stepItem = defineArrayMember({
  type: 'object',
  name: 'stepItem',
  fields: [
    defineField({name: 'time', title: 'Time label', type: 'localeString'}),
    defineField({name: 'title', title: 'Title', type: 'localeString'}),
    defineField({
      name: 'ill',
      title: 'Illustration',
      type: 'string',
      options: {
        list: [
          {title: 'Form', value: 'ill-form'},
          {title: 'Preview', value: 'ill-prev'},
          {title: 'Live', value: 'ill-live'},
        ],
        layout: 'radio',
      },
    }),
  ],
  preview: {select: {title: 'title.el', subtitle: 'time.el'}},
})

const showcaseItem = defineArrayMember({
  type: 'object',
  name: 'showcaseItem',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'string'}),
    defineField({name: 'url', title: 'URL', type: 'url'}),
    defineField({name: 'type', title: 'Type / location', type: 'localeString'}),
  ],
  preview: {select: {title: 'name', subtitle: 'url'}},
})

const includedYesItem = defineArrayMember({
  type: 'object',
  name: 'includedYesItem',
  fields: [
    defineField({name: 'label', title: 'Label', type: 'localeString'}),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {
        list: ['layers', 'phone', 'mail', 'pin', 'search', 'lock'],
      },
    }),
  ],
  preview: {select: {title: 'label.el', subtitle: 'icon'}},
})

const includedNoItem = defineArrayMember({
  type: 'object',
  name: 'includedNoItem',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'localeString'}),
    defineField({name: 'note', title: 'Note', type: 'localeString'}),
  ],
  preview: {select: {title: 'title.el', subtitle: 'note.el'}},
})

const formField = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: 'object',
    fields: [
      defineField({name: 'label', title: 'Label', type: 'localeString'}),
      defineField({name: 'placeholder', title: 'Placeholder', type: 'localeString'}),
      defineField({name: 'error', title: 'Error', type: 'localeString'}),
    ],
  })

const faqItem = defineArrayMember({
  type: 'object',
  name: 'homeFaqItem',
  fields: [
    defineField({name: 'id', title: 'Anchor id', type: 'string'}),
    defineField({name: 'q', title: 'Question', type: 'localeString'}),
    defineField({
      name: 'a',
      title: 'Answer (HTML ok)',
      type: 'localeText',
      description: 'Simple HTML allowed: <b>, <a>, <span class="ph">',
    }),
  ],
  preview: {select: {title: 'q.el', subtitle: 'id'}},
})

const packageItem = defineArrayMember({
  type: 'object',
  name: 'homePackageItem',
  fields: [
    defineField({name: 'name', title: 'Name', type: 'localeString'}),
    defineField({name: 'price', title: 'Price', type: 'localeString'}),
    defineField({name: 'text', title: 'Description', type: 'localeText'}),
  ],
  preview: {select: {title: 'name.el', subtitle: 'price.el'}},
})

const footerLink = defineArrayMember({
  type: 'object',
  name: 'footerLink',
  fields: [
    defineField({name: 'label', title: 'Label', type: 'localeString'}),
    defineField({name: 'href', title: 'Path', type: 'string'}),
  ],
  preview: {select: {title: 'label.el', subtitle: 'href'}},
})

export const homePage = defineType({
  name: 'homePage',
  title: 'Homepage',
  type: 'document',
  icon: HomeIcon,
  groups: [
    {name: 'seo', title: 'SEO'},
    {name: 'header', title: 'Header'},
    {name: 'hero', title: 'Hero'},
    {name: 'marquee', title: 'Marquee'},
    {name: 'steps', title: 'Steps'},
    {name: 'showcase', title: 'Showcase'},
    {name: 'included', title: '48h package'},
    {name: 'form', title: 'Lead form'},
    {name: 'faq', title: 'FAQ'},
    {name: 'packages', title: 'Larger packages'},
    {name: 'footer', title: 'Footer'},
    {name: 'archive', title: 'Blog / Portfolio chrome'},
  ],
  fields: [
    defineField({name: 'seoTitle', title: 'SEO title', type: 'localeString', group: 'seo'}),
    defineField({
      name: 'seoDescription',
      title: 'SEO description',
      type: 'localeText',
      group: 'seo',
    }),

    defineField({
      name: 'header',
      title: 'Header',
      type: 'object',
      group: 'header',
      fields: [
        defineField({name: 'cta', title: 'CTA label', type: 'localeString'}),
        defineField({name: 'callLabel', title: 'Call label', type: 'localeString'}),
        defineField({name: 'nav', title: 'Nav links', type: 'array', of: [navItem]}),
      ],
    }),

    defineField({
      name: 'hero',
      title: 'Hero',
      type: 'object',
      group: 'hero',
      fields: [
        defineField({name: 'eyebrow', title: 'Eyebrow', type: 'localeString'}),
        defineField({name: 'h1', title: 'Heading', type: 'localeString'}),
        defineField({
          name: 'sub',
          title: 'Sub (HTML ok)',
          type: 'localeText',
          description: 'Use <b> for emphasis',
        }),
        defineField({name: 'cta', title: 'CTA', type: 'localeString'}),
        defineField({name: 'micro', title: 'Micro copy', type: 'localeString'}),
        defineField({name: 'conditionNote', title: 'Condition note', type: 'localeText'}),
      ],
    }),

    defineField({
      name: 'marquee',
      title: 'Marquee',
      type: 'object',
      group: 'marquee',
      fields: [
        defineField({
          name: 'bandA',
          title: 'Band A labels',
          type: 'array',
          of: [defineArrayMember({type: 'localeString'})],
        }),
        defineField({
          name: 'bandB',
          title: 'Band B labels',
          type: 'array',
          of: [defineArrayMember({type: 'localeString'})],
        }),
        defineField({name: 'sr', title: 'Screen-reader summary', type: 'localeText'}),
      ],
    }),

    defineField({
      name: 'steps',
      title: 'Steps',
      type: 'object',
      group: 'steps',
      fields: [
        defineField({name: 'eyebrow', title: 'Eyebrow', type: 'localeString'}),
        defineField({name: 'title', title: 'Title', type: 'localeString'}),
        defineField({name: 'noteBefore', title: 'Note before bold', type: 'localeString'}),
        defineField({name: 'noteBold', title: 'Note bold part', type: 'localeString'}),
        defineField({name: 'cta', title: 'CTA', type: 'localeString'}),
        defineField({
          name: 'marks',
          title: 'Timeline marks',
          type: 'array',
          of: [defineArrayMember({type: 'localeString'})],
        }),
        defineField({name: 'liveUrl', title: 'Sample live URL label', type: 'localeString'}),
        defineField({name: 'items', title: 'Steps', type: 'array', of: [stepItem]}),
      ],
    }),

    defineField({
      name: 'showcase',
      title: 'Showcase',
      type: 'object',
      group: 'showcase',
      fields: [
        defineField({name: 'title', title: 'Title', type: 'localeString'}),
        defineField({name: 'sub', title: 'Sub', type: 'localeText'}),
        defineField({name: 'open', title: 'Open link label', type: 'localeString'}),
        defineField({name: 'items', title: 'Sites', type: 'array', of: [showcaseItem]}),
      ],
    }),

    defineField({
      name: 'included',
      title: '48h package',
      type: 'object',
      group: 'included',
      fields: [
        defineField({name: 'eyebrow', title: 'Eyebrow', type: 'localeString'}),
        defineField({name: 'title', title: 'Title', type: 'localeString'}),
        defineField({name: 'yesTitle', title: 'Included heading', type: 'localeString'}),
        defineField({name: 'noTitle', title: 'Not included heading', type: 'localeString'}),
        defineField({name: 'yes', title: 'Included items', type: 'array', of: [includedYesItem]}),
        defineField({name: 'no', title: 'Not included items', type: 'array', of: [includedNoItem]}),
        defineField({name: 'noFoot', title: 'Not-included footer', type: 'localeString'}),
        defineField({name: 'biggerLink', title: 'Larger packages link', type: 'localeString'}),
        defineField({name: 'yearlyBefore', title: 'Yearly cost before price', type: 'localeString'}),
        defineField({name: 'yearlyAfter', title: 'Yearly cost after price', type: 'localeString'}),
        defineField({name: 'yearlyTail', title: 'Yearly cost tail', type: 'localeString'}),
        defineField({name: 'yearlyTag', title: 'Yearly tag', type: 'localeString'}),
        defineField({name: 'yearlyPrice', title: 'Yearly price display', type: 'string'}),
        defineField({name: 'priceTag', title: 'Price tag', type: 'localeString'}),
        defineField({name: 'cta', title: 'CTA', type: 'localeString'}),
      ],
    }),

    defineField({
      name: 'form',
      title: 'Lead form',
      type: 'object',
      group: 'form',
      fields: [
        defineField({name: 'title', title: 'Title', type: 'localeString'}),
        defineField({name: 'sub', title: 'Subheading', type: 'localeString'}),
        defineField({name: 'eyebrow', title: 'Eyebrow', type: 'localeString'}),
        formField('nameField', 'Name field'),
        formField('contactField', 'Contact field'),
        defineField({
          name: 'businessField',
          title: 'Business field',
          type: 'object',
          fields: [
            defineField({name: 'label', title: 'Label', type: 'localeString'}),
            defineField({name: 'placeholder', title: 'Placeholder', type: 'localeString'}),
          ],
        }),
        defineField({name: 'submit', title: 'Submit', type: 'localeString'}),
        defineField({name: 'sending', title: 'Sending', type: 'localeString'}),
        defineField({
          name: 'consentLabel',
          title: 'Consent (HTML ok)',
          type: 'localeText',
        }),
        defineField({name: 'consentError', title: 'Consent error', type: 'localeString'}),
        defineField({
          name: 'privacyNotice',
          title: 'Privacy notice (HTML ok)',
          type: 'localeText',
        }),
        defineField({name: 'genericError', title: 'Generic error', type: 'localeText'}),
        defineField({
          name: 'chips',
          title: 'Business chips',
          type: 'array',
          of: [defineArrayMember({type: 'localeString'})],
        }),
        defineField({
          name: 'assure',
          title: 'Assurance lines',
          type: 'array',
          of: [defineArrayMember({type: 'localeString'})],
        }),
        defineField({
          name: 'success',
          title: 'Success state',
          type: 'object',
          fields: [
            defineField({name: 'title', title: 'Title', type: 'localeString'}),
            defineField({name: 'text', title: 'Text', type: 'localeText'}),
            defineField({
              name: 'textHtml',
              title: 'Text HTML',
              type: 'localeText',
            }),
            defineField({name: 'prompt', title: 'Prompt', type: 'localeText'}),
            defineField({name: 'callCta', title: 'Call CTA', type: 'localeString'}),
          ],
        }),
      ],
    }),

    defineField({
      name: 'faq',
      title: 'FAQ',
      type: 'object',
      group: 'faq',
      fields: [
        defineField({name: 'eyebrow', title: 'Eyebrow', type: 'localeString'}),
        defineField({name: 'sideTitle', title: 'Side title', type: 'localeString'}),
        defineField({name: 'sidePrompt', title: 'Side prompt', type: 'localeText'}),
        defineField({name: 'items', title: 'Questions', type: 'array', of: [faqItem]}),
      ],
    }),

    defineField({
      name: 'packages',
      title: 'Larger packages',
      type: 'object',
      group: 'packages',
      fields: [
        defineField({name: 'eyebrow', title: 'Eyebrow', type: 'localeString'}),
        defineField({name: 'title', title: 'Title', type: 'localeString'}),
        defineField({name: 'note', title: 'Note', type: 'localeText'}),
        defineField({name: 'cta', title: 'CTA', type: 'localeString'}),
        defineField({name: 'askLabel', title: 'Ask label', type: 'localeString'}),
        defineField({name: 'items', title: 'Packages', type: 'array', of: [packageItem]}),
      ],
    }),

    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'object',
      group: 'footer',
      fields: [
        defineField({name: 'identity', title: 'Identity', type: 'localeString'}),
        defineField({name: 'address', title: 'Address', type: 'localeString'}),
        defineField({name: 'contact', title: 'Contact line', type: 'localeText'}),
        defineField({name: 'family', title: 'Family line', type: 'localeString'}),
        defineField({name: 'links', title: 'Legal links', type: 'array', of: [footerLink]}),
      ],
    }),

    defineField({
      name: 'workEyebrow',
      title: 'Blog / Portfolio eyebrow',
      type: 'localeString',
      group: 'archive',
    }),
    defineField({
      name: 'workHeading',
      title: 'Portfolio heading',
      type: 'localeString',
      group: 'archive',
    }),
    defineField({
      name: 'workIntro',
      title: 'Portfolio intro',
      type: 'localeText',
      group: 'archive',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Homepage'}
    },
  },
})
