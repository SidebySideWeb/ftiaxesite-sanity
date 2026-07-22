import {defineType, defineField} from 'sanity'
import {CogIcon} from '@sanity/icons'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    {name: 'brand', title: 'Brand'},
    {name: 'navigation', title: 'Navigation'},
    {name: 'contact', title: 'Contact'},
    {name: 'footer', title: 'Footer'},
    {name: 'social', title: 'Social & booking'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'brandName',
      title: 'Brand name',
      type: 'string',
      initialValue: 'ftiaxesite.gr',
      group: 'brand',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'localeString',
      group: 'brand',
    }),
    defineField({
      name: 'defaultOgImage',
      title: 'Default social share image',
      type: 'image',
      group: 'brand',
    }),
    defineField({
      name: 'familyBadge',
      title: 'Family badge',
      type: 'string',
      description: 'e.g. "Member of the sidebysideweb.gr family"',
      group: 'brand',
    }),

    defineField({
      name: 'navLinks',
      title: 'Primary navigation',
      type: 'array',
      group: 'navigation',
      of: [
        {
          type: 'object',
          name: 'navLink',
          fields: [
            defineField({name: 'label', title: 'Label', type: 'localeString'}),
            defineField({
              name: 'href',
              title: 'Link (anchor or path)',
              type: 'string',
              description: 'e.g. #pricing or /portfolio/',
            }),
          ],
          preview: {select: {title: 'label.el', subtitle: 'href'}},
        },
      ],
    }),
    defineField({
      name: 'navCtaLabel',
      title: 'Header CTA label',
      type: 'localeString',
      group: 'navigation',
    }),

    defineField({name: 'email', title: 'Email', type: 'string', group: 'contact'}),
    defineField({name: 'phone', title: 'Phone', type: 'string', group: 'contact'}),
    defineField({name: 'addressStreet', title: 'Street address', type: 'string', group: 'contact'}),
    defineField({name: 'addressCity', title: 'City', type: 'string', group: 'contact'}),
    defineField({name: 'addressPostal', title: 'Postal code', type: 'string', group: 'contact'}),
    defineField({name: 'addressRegion', title: 'Region', type: 'string', group: 'contact'}),
    defineField({
      name: 'serviceArea',
      title: 'Service area',
      type: 'localeString',
      description: 'e.g. "Greece" or "Όλη η Ελλάδα"',
      group: 'contact',
    }),
    defineField({
      name: 'addressLine',
      title: 'Address line (display)',
      type: 'localeText',
      description: 'Multi-line address for footer',
      group: 'contact',
    }),

    defineField({
      name: 'footerServicesTitle',
      title: 'Footer services column title',
      type: 'localeString',
      group: 'footer',
    }),
    defineField({
      name: 'footerContactTitle',
      title: 'Footer contact column title',
      type: 'localeString',
      group: 'footer',
    }),
    defineField({
      name: 'privacyLinkLabel',
      title: 'Privacy policy link label',
      type: 'localeString',
      group: 'footer',
    }),
    defineField({
      name: 'cookiesLinkLabel',
      title: 'Cookie policy link label',
      type: 'localeString',
      group: 'footer',
    }),
    defineField({
      name: 'cookieSettingsLabel',
      title: 'Cookie settings button label',
      type: 'localeString',
      group: 'footer',
    }),
    defineField({
      name: 'copyrightLine',
      title: 'Copyright line',
      type: 'string',
      description: 'Use {year} placeholder',
      group: 'footer',
    }),

    defineField({
      name: 'defaultSeoTitle',
      title: 'Default SEO title',
      type: 'localeString',
      group: 'seo',
    }),
    defineField({
      name: 'defaultSeoDescription',
      title: 'Default SEO description',
      type: 'localeText',
      group: 'seo',
    }),

    defineField({
      name: 'socialLinks',
      title: 'Social links',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'socialLink',
          fields: [
            defineField({name: 'platform', title: 'Platform', type: 'string'}),
            defineField({name: 'url', title: 'URL', type: 'url'}),
          ],
          preview: {
            select: {title: 'platform', subtitle: 'url'},
          },
        },
      ],
      group: 'social',
    }),
    defineField({
      name: 'calBookingUrl',
      title: 'Cal.com booking URL',
      type: 'url',
      group: 'social',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Site Settings'}
    },
  },
})
