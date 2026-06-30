import {defineType, defineField} from 'sanity'
import {CogIcon} from '@sanity/icons'
import {imageAltField} from '../objects/imageAlt'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    {name: 'general', title: 'General'},
    {name: 'nav', title: 'Top navigation'},
    {name: 'footer', title: 'Footer'},
    {name: 'contact', title: 'Contact details'},
    {name: 'localBusiness', title: 'Local business address'},
  ],
  fields: [
    defineField({name: 'siteName', title: 'Site name', type: 'string', initialValue: 'ftiaxesite.gr', group: 'general'}),
    defineField({name: 'logo', title: 'Logo', type: 'image', fields: [imageAltField], group: 'general'}),
    defineField({name: 'defaultSeoTitle', title: 'Default SEO title suffix', type: 'string', group: 'general'}),
    defineField({name: 'defaultSeoDescription', title: 'Default meta description', type: 'text', rows: 3, group: 'general'}),
    defineField({
      name: 'defaultOgImage',
      title: 'Default social share image',
      type: 'image',
      fields: [imageAltField],
      group: 'general',
    }),

    // Top navigation
    defineField({
      name: 'navLinks',
      title: 'Top navigation links',
      description: 'Real design: Υπηρεσίες, Έργα, Πώς Δουλεύουμε, Blog, Επικοινωνία',
      type: 'array',
      of: [{type: 'navLink'}],
      group: 'nav',
    }),
    defineField({
      name: 'navCtaLabel',
      title: 'Nav CTA button label',
      type: 'localeString',
      description: '"Ζήτα Προσφορά" in the canonical design',
      group: 'nav',
    }),
    defineField({name: 'navCtaUrl', title: 'Nav CTA button URL', type: 'string', initialValue: '/zita-prosfora', group: 'nav'}),

    // Footer — real design has distinct titled columns, different from top nav
    defineField({
      name: 'footerTagline',
      title: 'Footer tagline',
      type: 'localeString',
      description:
        'Seen in two slightly different forms across the designs — pick one as the site-wide default, e.g. "Σχεδιάζουμε και αναπτύσσουμε ιστοσελίδες που λειτουργούν ως εργαλεία ανάπτυξης για την επιχείρησή σας."',
      group: 'footer',
    }),
    defineField({
      name: 'footerColumns',
      title: 'Footer columns',
      description: 'e.g. "Πλοήγηση" (Υπηρεσίες, Έργα, Blog) and "Εταιρεία" (Πώς Δουλεύουμε, Επικοινωνία, sidebysideweb.gr)',
      type: 'array',
      of: [{type: 'footerColumn'}],
      group: 'footer',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social links',
      description: 'Shown in design as icon-only buttons (e.g. "share", "public" icons) — add the real icon name and URL',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'socialLink',
          fields: [
            {name: 'platform', title: 'Platform (e.g. LinkedIn, Website)', type: 'string'},
            {name: 'icon', title: 'Icon name', type: 'string'},
            {name: 'url', title: 'URL', type: 'url'},
          ],
        },
      ],
      group: 'footer',
    }),
    defineField({
      name: 'crossLinkText',
      title: 'sidebysideweb.gr cross-link text',
      type: 'localeString',
      description:
        'NOTE: in the real design this shows as a normal footer link inside the "Εταιρεία" column, not a subtle/separate note. Kept as its own field so it is easy to find and edit; render it as a regular footerColumn link, or use this field if you want a distinct sentence instead.',
      group: 'footer',
    }),
    defineField({name: 'crossLinkUrl', title: 'Cross-link URL', type: 'url', initialValue: 'https://sidebysideweb.gr', group: 'footer'}),
    defineField({
      name: 'footerCopyrightLine',
      title: 'Footer copyright line',
      type: 'string',
      description: 'e.g. "© 2026 ftiaxesite.gr. All rights reserved." — varies slightly per mock, pick one',
      group: 'footer',
    }),

    // Contact — seen in one footer variant (didot_1) as icon + value pairs
    defineField({name: 'contactEmail', title: 'Email', type: 'string', initialValue: 'info@ftiaxesite.gr', group: 'contact'}),
    defineField({
      name: 'contactPhone',
      title: 'Phone',
      type: 'string',
      description: 'Seen in the Get a Quote page bottom section: "+30 210 000 0000"',
      group: 'contact',
    }),
    defineField({name: 'contactAddress', title: 'Address (optional)', type: 'string', group: 'contact'}),

    // Structured address for LocalBusiness JSON-LD (plain strings — not editorial copy)
    defineField({
      name: 'streetAddress',
      title: 'Street address',
      type: 'string',
      description: 'e.g. "Κυθήρων 12"',
      group: 'localBusiness',
    }),
    defineField({
      name: 'addressLocality',
      title: 'City / locality',
      type: 'string',
      description: 'e.g. "Περιστέρι"',
      group: 'localBusiness',
    }),
    defineField({
      name: 'postalCode',
      title: 'Postal code',
      type: 'string',
      description: 'e.g. "12133"',
      group: 'localBusiness',
    }),
    defineField({
      name: 'addressRegion',
      title: 'Region',
      type: 'string',
      description: 'e.g. "Αττική"',
      group: 'localBusiness',
    }),
    defineField({
      name: 'addressCountry',
      title: 'Country code',
      type: 'string',
      initialValue: 'GR',
      description: 'ISO 3166-1 alpha-2 country code',
      group: 'localBusiness',
    }),
    defineField({
      name: 'latitude',
      title: 'Latitude',
      type: 'number',
      description: 'Optional — for map pins and geo coordinates in structured data',
      group: 'localBusiness',
    }),
    defineField({
      name: 'longitude',
      title: 'Longitude',
      type: 'number',
      description: 'Optional — for map pins and geo coordinates in structured data',
      group: 'localBusiness',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Site Settings'}
    },
  },
})
