import {sanityClient} from 'sanity:client'
import {
  DEFAULT_LOCALE,
  localizePath,
  stripLocaleFromPath,
  type SiteLanguage,
  type SiteLocale,
} from './i18n'
import type {SeoFieldsData, SiteSeoDefaults} from './seo'
import {pickDocumentSeoData} from './seo'
import {DOCUMENT_SEO_PROJECTION, SEO_FIELDS_PROJECTION} from './seo-queries'
import {normalizePath, pickLocale, pickLocaleLines, urlFor} from './sanity-helpers'
import {PLACEHOLDER_IMAGES, sanitizeCmsImageUrl} from './placeholder-images'

export type {SeoFieldsData} from './seo'
export type {SiteSeoDefaults} from './seo'
/** @deprecated Use SeoFieldsData */
export type {PageSeoMeta} from './seo'

export interface MenuItem {
  readonly id: number
  readonly title: string
  readonly href: string
}

export interface SiteMenus {
  readonly primary: readonly MenuItem[]
  readonly footer: readonly MenuItem[]
  readonly legal: readonly MenuItem[]
}

export interface ServiceItem {
  readonly id: number
  readonly slug: string
  readonly title: string
  readonly excerpt: string
  readonly content: string
  readonly imageUrl: string | null
  readonly icon: string
  readonly summary: string
  readonly idealFor: string
  readonly priceFrom: string
  readonly ctaLabel: string
  readonly ctaUrl: string
  readonly footnote: string
}

export interface CaseStudyItem {
  readonly id: string
  readonly slug: string
  readonly title: string
  readonly excerpt: string
  readonly content: string
  readonly imageUrl: string | null
  readonly screenshotUrl: string | null
  readonly clientName: string
  readonly statusLabel: string
  readonly projectUrl: string
  readonly linkLabel: string
  readonly techStack: readonly string[]
  readonly results: string
  readonly resultBadges: readonly string[]
  readonly featured: boolean
}

export interface CaseStudyPageData extends CaseStudyItem {
  readonly categoryBadge: string
  readonly summary: string
  readonly imageAlt: string | null
  readonly seoData: SeoFieldsData | null
  readonly challengeBlocks: readonly unknown[] | null
  readonly solutionBlocks: readonly unknown[] | null
  readonly resultsBlocks: readonly unknown[] | null
  readonly beforeMetrics: readonly string[]
  readonly afterMetrics: readonly string[]
  readonly solutionSteps: readonly string[]
  readonly clientTestimonialQuote: string
  readonly clientTestimonialAuthor: string
  readonly publishedDate: string | null
}

export type PageFields = Readonly<Record<string, string>>

export interface SiteSettings {
  readonly headerLogoText: string
  readonly headerLogoUrl: string
  readonly headerCtaLabel: string
  readonly headerCtaUrl: string
  readonly headerLanguageLabel: string
  readonly footerBrandName: string
  readonly footerDescription: string
  readonly footerSocialEmailUrl: string
  readonly footerSocialPhoneUrl: string
  readonly footerSocialLocationUrl: string
  readonly footerServicesTitle: string
  readonly footerCompanyTitle: string
  readonly footerContactEmail: string
  readonly footerContactCtaLabel: string
  readonly footerContactCtaUrl: string
  readonly footerCopyright: string
}

export interface OrganizationSchemaData {
  readonly name: string
  readonly url: string
  readonly logoUrl: string | null
  readonly email: string | null
  readonly telephone: string | null
  readonly sameAs: readonly string[]
}

export interface LocalBusinessSchemaData {
  readonly name: string
  readonly url: string
  readonly imageUrl: string | null
  readonly email: string | null
  readonly telephone: string | null
  readonly streetAddress: string | null
  readonly addressLocality: string | null
  readonly postalCode: string | null
  readonly addressRegion: string | null
  readonly addressCountry: string | null
  readonly latitude: number | null
  readonly longitude: number | null
  readonly sameAs: readonly string[]
}

export interface FaqSchemaItem {
  readonly question: string
  readonly answer: string
}

const PAGE_DOC_IDS: Record<string, string> = {
  home: 'homePage',
  services: 'servicesPage',
  quote: 'quotePage',
  portfolio: 'portfolioPage',
  about: 'howWeWorkPage',
  blog: 'blogIndexPage',
  contact: 'contactPage',
  'site-settings': 'siteSettings',
}

let menuId = 1
function nextMenuId(): number {
  return menuId++
}

type FooterColumnDoc = {
  readonly columnTitle?: {el?: string; en?: string}
  readonly links?: readonly Record<string, unknown>[]
}

function footerColumnTitle(column: FooterColumnDoc | undefined, locale: SiteLocale): string {
  if (!column) return ''
  return pickLocale(column.columnTitle, locale)
}

function findFooterColumn(
  columns: readonly FooterColumnDoc[],
  pattern: RegExp,
  locale: SiteLocale,
): FooterColumnDoc | undefined {
  return columns.find((column) => pattern.test(footerColumnTitle(column, locale)))
}

function mapFooterColumnLinks(column: FooterColumnDoc | undefined, locale: SiteLocale): MenuItem[] {
  const links = column?.links ?? []
  return links.flatMap((link) => {
    const title = pickLocale(link.label as {el?: string; en?: string}, locale)
    const url = typeof link.url === 'string' ? link.url : ''
    if (!title || !url) return []
    return [{id: nextMenuId(), title, href: normalizeMenuHref(url, locale)}]
  })
}

function resolveFooterColumns(
  columns: readonly FooterColumnDoc[],
  locale: SiteLocale,
): {navigation: FooterColumnDoc | undefined; company: FooterColumnDoc | undefined} {
  if (columns.length === 0) {
    return {navigation: undefined, company: undefined}
  }

  const company = findFooterColumn(columns, /εταιρεί|company/i, locale)
  const navigation =
    findFooterColumn(columns, /πλοήγηση|navigation|υπηρεσίες/i, locale) ??
    columns.find((column) => column !== company)

  const resolvedCompany =
    company ??
    columns.find(
      (column) =>
        column !== navigation && !/social/i.test(footerColumnTitle(column, locale)),
    )

  return {navigation, company: resolvedCompany}
}

export function normalizeMenuHref(rawUrl: string, locale: SiteLocale = DEFAULT_LOCALE): string {
  const trimmed = rawUrl.trim()
  if (trimmed.length === 0) {
    return localizePath('/', locale)
  }
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('mailto:')) {
    return trimmed
  }
  const path = trimmed.startsWith('/') ? trimmed : `/${trimmed}`
  const normalized = path.endsWith('/') ? path : `${path}/`
  return localizePath(stripLocaleFromPath(normalized), locale)
}

export function pageField(fields: PageFields, key: string, fallback = ''): string {
  const value = fields[key]
  if (typeof value === 'string' && value.trim().length > 0) {
    return value.trim()
  }
  return fallback
}

export function pageFieldLines(fields: PageFields, key: string): readonly string[] {
  return pageField(fields, key)
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)
}

export function formatCopyright(template: string, year = new Date().getFullYear()): string {
  return template.replaceAll('{year}', String(year))
}

export function getWordPressOrigin(): string {
  return ''
}

export function parseFluentFormId(_shortcodeOrId?: string): number | null {
  return null
}

export async function fetchFluentForm(): Promise<null> {
  return null
}

export async function fetchSiteLanguages(): Promise<readonly SiteLanguage[]> {
  return [{code: 'el', nativeName: 'Ελληνικά', default: true}]
}

export async function fetchPageSeoData(
  slug: string,
  locale: SiteLocale = DEFAULT_LOCALE,
): Promise<SeoFieldsData | null> {
  const docId = PAGE_DOC_IDS[slug]
  if (!docId) return null
  const doc = await sanityClient.fetch<{seo?: unknown; seoEn?: unknown} | null>(
    `*[_id == $id][0]${DOCUMENT_SEO_PROJECTION}`,
    {id: docId},
  )
  return pickDocumentSeoData(doc, locale)
}

/** @deprecated Use fetchPageSeoData */
export async function fetchPageSeo(slug: string, locale: SiteLocale = DEFAULT_LOCALE) {
  const seo = await fetchPageSeoData(slug, locale)
  if (!seo) return null
  return {
    title: seo.title ?? null,
    description: seo.description ?? null,
    ogImageUrl: urlFor(seo.metaImage, 1200),
    noindex: Boolean(seo.robots?.noIndex),
  }
}

function mapHomePage(doc: Record<string, unknown>, locale: SiteLocale): PageFields {
  const highlight = pickLocale(doc.heroHeadingHighlight as {el?: string; en?: string}, locale)
  const before = pickLocale(doc.heroHeadingBefore as {el?: string; en?: string}, locale)
  const after = pickLocale(doc.heroHeadingAfter as {el?: string; en?: string}, locale)
  const fullTitle = [before, highlight, after].filter(Boolean).join(' ')
  const valueProps = (doc.valuePropItems as Array<Record<string, unknown>> | undefined) ?? []
  const processSteps = (doc.processSteps as Array<Record<string, unknown>> | undefined) ?? []
  const trustClients = ((doc.trustBarClients as Array<Record<string, unknown>> | undefined) ?? [])
    .map((client) => (typeof client.name === 'string' ? client.name : ''))
    .filter(Boolean)
    .join('\n')

  const fields: Record<string, string> = {
    fti_home_hero_eyebrow: pickLocale(doc.heroBadgeText as {el?: string; en?: string}, locale),
    fti_home_hero_title_highlight: highlight,
    fti_home_hero_title: fullTitle,
    fti_home_hero_description: pickLocale(doc.heroSubheading as {el?: string; en?: string}, locale),
    fti_home_hero_primary_cta_label: pickLocale(doc.heroPrimaryCtaLabel as {el?: string; en?: string}, locale),
    fti_home_hero_primary_cta_url: normalizePath(String(doc.heroPrimaryCtaUrl ?? '/zita-prosfora')),
    fti_home_hero_secondary_cta_label: pickLocale(doc.heroSecondaryCtaLabel as {el?: string; en?: string}, locale),
    fti_home_hero_secondary_cta_url: normalizePath(String(doc.heroSecondaryCtaUrl ?? '/erga')),
    fti_home_hero_badge_value: String(doc.heroImageStatNumber ?? '10+'),
    fti_home_hero_badge_label: pickLocale(doc.heroImageStatLabel as {el?: string; en?: string}, locale),
    fti_home_trust_title: pickLocale(doc.trustBarHeading as {el?: string; en?: string}, locale),
    fti_home_trust_partners: trustClients,
    fti_home_advantages_title: pickLocale(doc.valuePropsHeading as {el?: string; en?: string}, locale),
    fti_home_advantages_description: pickLocale(doc.valuePropsIntro as {el?: string; en?: string}, locale),
    fti_home_portfolio_title: pickLocale(doc.portfolioHeading as {el?: string; en?: string}, locale),
    fti_home_portfolio_description: pickLocale(doc.portfolioSubheading as {el?: string; en?: string}, locale),
    fti_home_portfolio_link_label: pickLocale(doc.portfolioLinkLabel as {el?: string; en?: string}, locale),
    fti_home_portfolio_link_url: normalizePath(String(doc.portfolioLinkUrl ?? '/erga')),
    fti_home_process_title: pickLocale(doc.processHeading as {el?: string; en?: string}, locale),
    fti_home_process_description: pickLocale(doc.processIntro as {el?: string; en?: string}, locale),
    fti_home_cta_title: pickLocale(doc.ctaHeading as {el?: string; en?: string}, locale),
    fti_home_cta_description: pickLocale(doc.ctaText as {el?: string; en?: string}, locale),
    fti_home_cta_button_label: pickLocale(doc.ctaButtonLabel as {el?: string; en?: string}, locale),
    fti_home_cta_button_url: normalizePath(String(doc.ctaButtonUrl ?? '/zita-prosfora')),
    fti_home_cta_note: pickLocale(doc.ctaSubtext as {el?: string; en?: string}, locale),
  }

  const heroImage = sanitizeCmsImageUrl(
    urlFor(doc.heroImage as Parameters<typeof urlFor>[0], 640),
    PLACEHOLDER_IMAGES.homeHero,
  )
  if (heroImage) fields.fti_home_hero_image = heroImage

  const processImage = sanitizeCmsImageUrl(
    urlFor(doc.processImage as Parameters<typeof urlFor>[0], 960),
    null,
  )
  if (processImage) fields.fti_home_process_image = processImage

  valueProps.slice(0, 3).forEach((item, index) => {
    const n = index + 1
    fields[`fti_home_advantage_${n}_icon`] = String(item.icon ?? '')
    fields[`fti_home_advantage_${n}_title`] = pickLocale(item.title as {el?: string; en?: string}, locale)
    fields[`fti_home_advantage_${n}_body`] = pickLocale(item.description as {el?: string; en?: string}, locale)
  })

  processSteps.slice(0, 3).forEach((step, index) => {
    const n = index + 1
    fields[`fti_home_process_step_${n}_title`] = pickLocale(step.title as {el?: string; en?: string}, locale)
    fields[`fti_home_process_step_${n}_body`] = pickLocale(step.description as {el?: string; en?: string}, locale)
  })

  return fields
}

function mapServicesPage(doc: Record<string, unknown>, locale: SiteLocale): PageFields {
  const faqItems = (doc.faqItems as Array<Record<string, unknown>> | undefined) ?? []
  const addOns = (doc.addOnsItems as Array<{el?: string; en?: string}> | undefined) ?? []
  const fields: Record<string, string> = {
    fti_services_hero_eyebrow: pickLocale(doc.heroLabel as {el?: string; en?: string}, locale),
    fti_services_hero_title: pickLocale(doc.heroHeading as {el?: string; en?: string}, locale),
    fti_services_hero_description: pickLocale(doc.heroSubheading as {el?: string; en?: string}, locale),
    fti_services_addons_title: pickLocale(doc.addOnsHeading as {el?: string; en?: string}, locale),
    fti_services_addons_items: addOns.map((item) => pickLocale(item, locale)).join('\n'),
    fti_services_faq_title: pickLocale(doc.faqHeading as {el?: string; en?: string}, locale),
    fti_services_cta_title: pickLocale(doc.bottomCtaHeading as {el?: string; en?: string}, locale),
    fti_services_cta_description: pickLocale(doc.bottomCtaText as {el?: string; en?: string}, locale),
    fti_services_cta_button_label: pickLocale(doc.bottomCtaButtonLabel as {el?: string; en?: string}, locale),
    fti_services_cta_button_url: '/quote/',
  }

  faqItems.forEach((item, index) => {
    const n = index + 1
    fields[`fti_services_faq_${n}_question`] = pickLocale(item.question as {el?: string; en?: string}, locale)
    fields[`fti_services_faq_${n}_answer`] = pickLocale(item.answer as {el?: string; en?: string}, locale)
  })

  return fields
}

function mapQuotePage(doc: Record<string, unknown>, locale: SiteLocale): PageFields {
  const referenceItems = (doc.referenceItems as Array<Record<string, unknown>> | undefined) ?? []
  const nextSteps = (doc.nextStepsItems as Array<{el?: string; en?: string}> | undefined) ?? []
  const fields: Record<string, string> = {
    fti_quote_hero_title: pickLocale(doc.heroHeading as {el?: string; en?: string}, locale),
    fti_quote_hero_description: pickLocale(doc.heroSubheading as {el?: string; en?: string}, locale),
    fti_quote_pricing_title: pickLocale(doc.referenceHeading as {el?: string; en?: string}, locale),
    fti_quote_pricing_note: pickLocale(doc.referenceFootnote as {el?: string; en?: string}, locale),
    fti_quote_process_title: pickLocale(doc.nextStepsHeading as {el?: string; en?: string}, locale),
    fti_quote_bottom_heading: pickLocale(doc.bottomSectionHeading as {el?: string; en?: string}, locale),
    fti_quote_bottom_text: pickLocale(doc.bottomSectionText as {el?: string; en?: string}, locale),
  }

  referenceItems.slice(0, 3).forEach((item, index) => {
    const n = index + 1
    fields[`fti_quote_pricing_${n}_label`] = pickLocale(item.label as {el?: string; en?: string}, locale)
    fields[`fti_quote_pricing_${n}_price`] = pickLocale(item.priceNote as {el?: string; en?: string}, locale)
  })

  nextSteps.slice(0, 3).forEach((item, index) => {
    fields[`fti_quote_process_step_${index + 1}`] = pickLocale(item, locale)
  })

  return fields
}

function mapPortfolioPage(doc: Record<string, unknown>, locale: SiteLocale): PageFields {
  return {
    fti_portfolio_hero_title: pickLocale(doc.heroHeading as {el?: string; en?: string}, locale),
    fti_portfolio_hero_description: pickLocale(doc.heroSubheading as {el?: string; en?: string}, locale),
    fti_portfolio_cta_title: pickLocale(doc.bottomCtaHeading as {el?: string; en?: string}, locale),
    fti_portfolio_cta_button_label: pickLocale(doc.bottomCtaButtonLabel as {el?: string; en?: string}, locale),
    fti_portfolio_cta_button_url: '/quote/',
  }
}

function mapBlogPage(doc: Record<string, unknown>, locale: SiteLocale): PageFields {
  return {
    fti_blog_hero_title: pickLocale(doc.heroHeading as {el?: string; en?: string}, locale),
    fti_blog_hero_description: pickLocale(doc.heroSubheading as {el?: string; en?: string}, locale),
  }
}

function mapContactPage(doc: Record<string, unknown>, locale: SiteLocale): PageFields {
  return {
    fti_contact_hero_title: pickLocale(doc.heroHeading as {el?: string; en?: string}, locale),
    fti_contact_hero_description: pickLocale(doc.heroSubheading as {el?: string; en?: string}, locale),
    fti_contact_email: String(doc.infoCardEmail ?? 'info@ftiaxesite.gr'),
    fti_contact_location: pickLocale(doc.infoCardLocation as {el?: string; en?: string}, locale),
    fti_contact_hours: pickLocale(doc.infoCardResponseTime as {el?: string; en?: string}, locale),
    fti_contact_form_title: pickLocale(doc.infoCardPromptText as {el?: string; en?: string}, locale),
  }
}

function mapAboutPage(doc: Record<string, unknown>, locale: SiteLocale): PageFields {
  const steps = (doc.timelineSteps as Array<Record<string, unknown>> | undefined) ?? []
  const included = (doc.alwaysIncludedItems as Array<{el?: string; en?: string}> | undefined) ?? []
  const fields: Record<string, string> = {
    fti_about_hero_eyebrow: locale === 'en' ? 'How we work' : 'Πώς δουλεύουμε',
    fti_about_hero_title: pickLocale(doc.heroHeading as {el?: string; en?: string}, locale),
    fti_about_hero_description: pickLocale(doc.heroSubheading as {el?: string; en?: string}, locale),
    fti_about_philosophy_title: pickLocale(doc.alwaysIncludedHeading as {el?: string; en?: string}, locale),
    fti_about_cta_title: pickLocale(doc.bottomCtaHeading as {el?: string; en?: string}, locale),
    fti_about_cta_button_label: pickLocale(doc.bottomCtaButtonLabel as {el?: string; en?: string}, locale),
  }

  steps.slice(0, 4).forEach((step, index) => {
    const n = index + 1
    fields[`fti_about_step_${n}_title`] = pickLocale(step.title as {el?: string; en?: string}, locale)
    fields[`fti_about_step_${n}_body`] = pickLocale(step.description as {el?: string; en?: string}, locale)
    fields[`fti_about_step_${n}_duration`] = pickLocale(step.duration as {el?: string; en?: string}, locale)
  })

  fields.fti_about_included_items = included.map((item) => pickLocale(item, locale)).join('\n')
  return fields
}

function mapDocumentToFields(
  slug: string,
  doc: Record<string, unknown> | null,
  locale: SiteLocale,
): PageFields {
  if (!doc) return {}

  switch (slug) {
    case 'home':
      return mapHomePage(doc, locale)
    case 'services':
      return mapServicesPage(doc, locale)
    case 'quote':
      return mapQuotePage(doc, locale)
    case 'portfolio':
      return mapPortfolioPage(doc, locale)
    case 'blog':
      return mapBlogPage(doc, locale)
    case 'contact':
      return mapContactPage(doc, locale)
    case 'about':
      return mapAboutPage(doc, locale)
    default:
      return {}
  }
}

export async function fetchPageFields(slug: string, locale: SiteLocale = DEFAULT_LOCALE): Promise<PageFields> {
  const docId = PAGE_DOC_IDS[slug]
  if (!docId) return {}
  const doc = await sanityClient.fetch<Record<string, unknown> | null>(`*[_id == $id][0]`, {id: docId})
  const fields = mapDocumentToFields(slug, doc, locale)

  if (slug === 'contact') {
    const settings = await sanityClient.fetch<{contactPhone?: string} | null>(
      `*[_id == "siteSettings"][0]{contactPhone}`,
    )
    const phone = typeof settings?.contactPhone === 'string' ? settings.contactPhone.trim() : ''
    if (phone) {
      fields.fti_contact_phone = phone
    }
  }

  return fields
}

const defaultSiteSettings: SiteSettings = {
  headerLogoText: 'ftiaxesite.gr',
  headerLogoUrl: '/',
  headerCtaLabel: 'Ζήτα Προσφορά',
  headerCtaUrl: '/quote/',
  headerLanguageLabel: '',
  footerBrandName: 'ftiaxesite.gr',
  footerDescription:
    'Σχεδιάζουμε και αναπτύσσουμε ιστοσελίδες που λειτουργούν ως εργαλεία ανάπτυξης για την επιχείρησή σας.',
  footerSocialEmailUrl: 'mailto:info@ftiaxesite.gr',
  footerSocialPhoneUrl: '',
  footerSocialLocationUrl: '',
  footerServicesTitle: 'Υπηρεσίες',
  footerCompanyTitle: 'Εταιρεία',
  footerContactEmail: 'info@ftiaxesite.gr',
  footerContactCtaLabel: 'Ζήτα Προσφορά',
  footerContactCtaUrl: '/quote/',
  footerCopyright: '© {year} ftiaxesite.gr. All rights reserved.',
}

export async function fetchOrganizationSchemaData(siteOrigin: string): Promise<OrganizationSchemaData> {
  const doc = await sanityClient.fetch<Record<string, unknown> | null>(
    `*[_id == "siteSettings"][0]{siteName, logo, contactEmail, contactPhone, socialLinks}`,
  )

  const sameAs = ((doc?.socialLinks as Array<Record<string, unknown>> | undefined) ?? [])
    .flatMap((link) => (typeof link.url === 'string' && link.url.length > 0 ? [link.url] : []))

  return {
    name: String(doc?.siteName ?? 'ftiaxesite.gr'),
    url: siteOrigin.replace(/\/$/, '') || 'https://ftiaxesite.gr',
    logoUrl: urlFor(doc?.logo as Parameters<typeof urlFor>[0], 512),
    email: typeof doc?.contactEmail === 'string' ? doc.contactEmail : null,
    telephone: typeof doc?.contactPhone === 'string' ? doc.contactPhone : null,
    sameAs,
  }
}

export async function fetchLocalBusinessSchemaData(siteOrigin: string): Promise<LocalBusinessSchemaData> {
  const doc = await sanityClient.fetch<Record<string, unknown> | null>(
    `*[_id == "siteSettings"][0]{
      siteName,
      logo,
      contactEmail,
      contactPhone,
      socialLinks,
      streetAddress,
      addressLocality,
      postalCode,
      addressRegion,
      addressCountry,
      latitude,
      longitude
    }`,
  )

  const sameAs = ((doc?.socialLinks as Array<Record<string, unknown>> | undefined) ?? [])
    .flatMap((link) => (typeof link.url === 'string' && link.url.length > 0 ? [link.url] : []))

  const latitude = typeof doc?.latitude === 'number' ? doc.latitude : null
  const longitude = typeof doc?.longitude === 'number' ? doc.longitude : null

  return {
    name: String(doc?.siteName ?? 'ftiaxesite.gr'),
    url: siteOrigin.replace(/\/$/, '') || 'https://ftiaxesite.gr',
    imageUrl: urlFor(doc?.logo as Parameters<typeof urlFor>[0], 512),
    email: typeof doc?.contactEmail === 'string' ? doc.contactEmail : null,
    telephone: typeof doc?.contactPhone === 'string' ? doc.contactPhone : null,
    streetAddress: typeof doc?.streetAddress === 'string' ? doc.streetAddress : null,
    addressLocality: typeof doc?.addressLocality === 'string' ? doc.addressLocality : null,
    postalCode: typeof doc?.postalCode === 'string' ? doc.postalCode : null,
    addressRegion: typeof doc?.addressRegion === 'string' ? doc.addressRegion : null,
    addressCountry: typeof doc?.addressCountry === 'string' ? doc.addressCountry : null,
    latitude,
    longitude,
    sameAs,
  }
}

export async function fetchServicesFaqItems(locale: SiteLocale = DEFAULT_LOCALE): Promise<readonly FaqSchemaItem[]> {
  const doc = await sanityClient.fetch<Record<string, unknown> | null>(
    `*[_id == "servicesPage"][0]{faqItems}`,
  )
  const faqItems = (doc?.faqItems as Array<Record<string, unknown>> | undefined) ?? []

  return faqItems.flatMap((item) => {
    const question = pickLocale(item.question as {el?: string; en?: string}, locale)
    const answer = pickLocale(item.answer as {el?: string; en?: string}, locale)
    if (!question || !answer) return []
    return [{question, answer}]
  })
}

export async function fetchSiteSeoDefaults(): Promise<SiteSeoDefaults> {
  const doc = await sanityClient.fetch<Record<string, unknown> | null>(
    `*[_id == "siteSettings"][0]{siteName, defaultSeoDescription, defaultOgImage}`,
  )

  return {
    siteName: String(doc?.siteName ?? 'ftiaxesite.gr'),
    defaultDescription: String(
      doc?.defaultSeoDescription ??
        'Σχεδιάζουμε και αναπτύσσουμε custom ιστοσελίδες για μικρομεσαίες επιχειρήσεις στην Ελλάδα.',
    ),
    defaultOgImageUrl: urlFor(doc?.defaultOgImage as Parameters<typeof urlFor>[0], 1200),
  }
}

export async function fetchSiteSettings(locale: SiteLocale = DEFAULT_LOCALE): Promise<SiteSettings> {
  const doc = await sanityClient.fetch<Record<string, unknown> | null>(`*[_id == "siteSettings"][0]`)
  if (!doc) return defaultSiteSettings

  const footerColumns = (doc.footerColumns as FooterColumnDoc[] | undefined) ?? []
  const {navigation: navFooterColumn, company: companyFooterColumn} = resolveFooterColumns(footerColumns, locale)

  return {
    headerLogoText: String(doc.siteName ?? defaultSiteSettings.headerLogoText),
    headerLogoUrl: '/',
    headerCtaLabel: pickLocale(doc.navCtaLabel as {el?: string; en?: string}, locale) || defaultSiteSettings.headerCtaLabel,
    headerCtaUrl: normalizeMenuHref(String(doc.navCtaUrl ?? '/zita-prosfora'), locale),
    headerLanguageLabel: defaultSiteSettings.headerLanguageLabel,
    footerBrandName: String(doc.siteName ?? defaultSiteSettings.footerBrandName),
    footerDescription: pickLocale(doc.footerTagline as {el?: string; en?: string}, locale) || defaultSiteSettings.footerDescription,
    footerSocialEmailUrl: doc.contactEmail ? `mailto:${doc.contactEmail}` : defaultSiteSettings.footerSocialEmailUrl,
    footerSocialPhoneUrl: doc.contactPhone ? `tel:${String(doc.contactPhone).replace(/\s/g, '')}` : '',
    footerSocialLocationUrl: doc.contactAddress ? `https://maps.google.com/?q=${encodeURIComponent(String(doc.contactAddress))}` : '',
    footerServicesTitle:
      footerColumnTitle(navFooterColumn, locale) || defaultSiteSettings.footerServicesTitle,
    footerCompanyTitle:
      footerColumnTitle(companyFooterColumn, locale) || defaultSiteSettings.footerCompanyTitle,
    footerContactEmail: String(doc.contactEmail ?? defaultSiteSettings.footerContactEmail),
    footerContactCtaLabel: pickLocale(doc.navCtaLabel as {el?: string; en?: string}, locale) || defaultSiteSettings.footerContactCtaLabel,
    footerContactCtaUrl: normalizeMenuHref(String(doc.navCtaUrl ?? '/zita-prosfora'), locale),
    footerCopyright: formatCopyright(String(doc.footerCopyrightLine ?? defaultSiteSettings.footerCopyright)),
  }
}

export async function fetchSiteMenus(locale: SiteLocale = DEFAULT_LOCALE): Promise<SiteMenus> {
  menuId = 1
  const doc = await sanityClient.fetch<Record<string, unknown> | null>(`*[_id == "siteSettings"][0]`)
  const navLinks = (doc?.navLinks as Array<Record<string, unknown>> | undefined) ?? []
  const footerColumns = (doc?.footerColumns as FooterColumnDoc[] | undefined) ?? []
  const {navigation: navFooterColumn, company: companyFooterColumn} = resolveFooterColumns(footerColumns, locale)

  const primary: MenuItem[] = navLinks.flatMap((link) => {
    const title = pickLocale(link.label as {el?: string; en?: string}, locale)
    const url = typeof link.url === 'string' ? link.url : ''
    if (!title || !url) return []
    return [{id: nextMenuId(), title, href: normalizeMenuHref(url, locale)}]
  })

  const footer = mapFooterColumnLinks(navFooterColumn, locale)
  const legal = mapFooterColumnLinks(companyFooterColumn, locale)

  if (primary.length === 0) {
    return {
      primary: [
        {id: 1, title: 'Υπηρεσίες', href: localizePath('/services/', locale)},
        {id: 2, title: 'Έργα', href: localizePath('/portfolio/', locale)},
        {id: 3, title: 'Blog', href: localizePath('/blog/', locale)},
        {id: 4, title: 'Ζήτα Προσφορά', href: localizePath('/quote/', locale)},
      ],
      footer: [],
      legal: [],
    }
  }

  return {primary, footer, legal}
}

function mapCaseStudy(doc: Record<string, unknown>, locale: SiteLocale): CaseStudyItem {
  const metricChips = (doc.metricChips as Array<Record<string, unknown>> | undefined) ?? []
  const techStack = (doc.techStack as string[] | undefined) ?? []
  const status = String(doc.status ?? 'inProgress')
  const statusLabel =
    status === 'live' ? (locale === 'en' ? 'Live' : 'Live') : status === 'comingSoon' ? (locale === 'en' ? 'Coming soon' : 'Σύντομα') : (locale === 'en' ? 'In progress' : 'Σε εξέλιξη')

  return {
    id: String(doc._id ?? ''),
    slug: (doc.slug as {current?: string} | undefined)?.current ?? '',
    title: String(doc.title ?? ''),
    excerpt: pickLocale(doc.summary as {el?: string; en?: string}, locale),
    content: '',
    imageUrl: sanitizeCmsImageUrl(urlFor(doc.image as Parameters<typeof urlFor>[0], 720), null),
    screenshotUrl: sanitizeCmsImageUrl(urlFor(doc.image as Parameters<typeof urlFor>[0], 720), null),
    clientName: pickLocale(doc.categoryBadge as {el?: string; en?: string}, locale),
    statusLabel,
    projectUrl: '',
    linkLabel: locale === 'en' ? 'View case study' : 'Δες την υπόθεση',
    techStack,
    results: pickLocale(doc.summary as {el?: string; en?: string}, locale),
    resultBadges: metricChips.map((chip) => pickLocale(chip.label as {el?: string; en?: string}, locale)).filter(Boolean),
    featured: Boolean(doc.featured),
  }
}

type LocaleRichTextValue = {el?: unknown; en?: unknown} | null | undefined

function pickLocaleBlocks(value: LocaleRichTextValue, locale: SiteLocale): readonly unknown[] | null {
  if (!value) return null
  const primary = locale === 'en' ? value.en : value.el
  const fallback = locale === 'en' ? value.el : value.en
  const blocks = primary ?? fallback
  return Array.isArray(blocks) ? blocks : null
}

function pickLocaleStringList(items: unknown, locale: SiteLocale): readonly string[] {
  const rows = (items as Array<{el?: string; en?: string}> | undefined) ?? []
  return rows.map((item) => pickLocale(item, locale)).filter(Boolean)
}

function mapCaseStudyPage(doc: Record<string, unknown>, locale: SiteLocale): CaseStudyPageData {
  const base = mapCaseStudy(doc, locale)
  const imageRecord = doc.image as {alt?: string} | undefined

  return {
    ...base,
    categoryBadge: pickLocale(doc.categoryBadge as {el?: string; en?: string}, locale),
    summary: pickLocale(doc.summary as {el?: string; en?: string}, locale),
    imageAlt: typeof imageRecord?.alt === 'string' && imageRecord.alt.trim() ? imageRecord.alt.trim() : null,
    seoData: pickDocumentSeoData(doc, locale),
    challengeBlocks: pickLocaleBlocks(doc.challenge as LocaleRichTextValue, locale),
    solutionBlocks: pickLocaleBlocks(doc.solution as LocaleRichTextValue, locale),
    resultsBlocks: pickLocaleBlocks(doc.results as LocaleRichTextValue, locale),
    beforeMetrics: pickLocaleStringList(doc.beforeMetrics, locale),
    afterMetrics: pickLocaleStringList(doc.afterMetrics, locale),
    solutionSteps: pickLocaleStringList(doc.solutionSteps, locale),
    clientTestimonialQuote: pickLocale(doc.clientTestimonialQuote as {el?: string; en?: string}, locale),
    clientTestimonialAuthor: String(doc.clientTestimonialAuthor ?? ''),
    publishedDate: typeof doc.publishedDate === 'string' ? doc.publishedDate : null,
  }
}

const CASE_STUDY_BY_SLUG_QUERY = `*[_type == "caseStudy" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  categoryBadge,
  summary,
  image,
  techStack,
  metricChips,
  status,
  featured,
  publishedDate,
  challenge,
  beforeMetrics,
  solution,
  solutionSteps,
  results,
  afterMetrics,
  clientTestimonialQuote,
  clientTestimonialAuthor,
  seo ${SEO_FIELDS_PROJECTION},
  seoEn ${SEO_FIELDS_PROJECTION}
}`

export async function fetchServices(limit = 20, locale: SiteLocale = DEFAULT_LOCALE): Promise<readonly ServiceItem[]> {
  const doc = await sanityClient.fetch<Record<string, unknown> | null>(`*[_id == "servicesPage"][0]`)
  const blocks = (doc?.serviceBlocks as Array<Record<string, unknown>> | undefined) ?? []

  return blocks.slice(0, limit).map((block, index) => ({
    id: index + 1,
    slug: `service-${index + 1}`,
    title: pickLocale(block.title as {el?: string; en?: string}, locale),
    excerpt: pickLocale(block.body as {el?: string; en?: string}, locale),
    content: pickLocale(block.body as {el?: string; en?: string}, locale),
    imageUrl: sanitizeCmsImageUrl(urlFor(block.image as Parameters<typeof urlFor>[0], 800), null),
    icon: 'web',
    summary: pickLocale(block.body as {el?: string; en?: string}, locale),
    idealFor: pickLocale(block.idealForLabel as {el?: string; en?: string}, locale),
    priceFrom: pickLocale(block.priceNote as {el?: string; en?: string}, locale),
    ctaLabel: pickLocale(block.ctaLabel as {el?: string; en?: string}, locale) || 'Ζήτα Προσφορά για αυτό',
    ctaUrl: normalizeMenuHref(String(block.ctaUrl ?? '/quote/'), locale),
    footnote: pickLocale(block.crossLinkNote as {el?: string; en?: string}, locale),
  }))
}

export async function fetchCaseStudies(limit = 20, locale: SiteLocale = DEFAULT_LOCALE): Promise<readonly CaseStudyItem[]> {
  const docs = await sanityClient.fetch<Record<string, unknown>[]>(
    `*[_type == "caseStudy"] | order(featured desc, publishedDate desc)[0...$limit]`,
    {limit},
  )
  return docs.map((doc) => mapCaseStudy(doc, locale))
}

export async function fetchCaseStudyById(id: string, locale: SiteLocale = DEFAULT_LOCALE): Promise<CaseStudyItem | null> {
  const doc = await sanityClient.fetch<Record<string, unknown> | null>(`*[_id == $id][0]`, {id})
  return doc ? mapCaseStudy(doc, locale) : null
}

export async function fetchCaseStudyBySlug(
  slug: string,
  locale: SiteLocale = DEFAULT_LOCALE,
): Promise<CaseStudyPageData | null> {
  const doc = await sanityClient.fetch<Record<string, unknown> | null>(CASE_STUDY_BY_SLUG_QUERY, {slug})
  return doc ? mapCaseStudyPage(doc, locale) : null
}

export async function fetchCaseStudySlugs(): Promise<readonly string[]> {
  const rows = await sanityClient.fetch<Array<{slug?: string}>>(`
    *[_type == "caseStudy" && defined(slug.current)]{ "slug": slug.current }
  `)
  return rows.flatMap((row) => (typeof row.slug === 'string' && row.slug.length > 0 ? [row.slug] : []))
}

export type {SiteLanguage, SiteLocale} from './i18n'

export async function fetchPageHero(slug: string, locale: SiteLocale = DEFAULT_LOCALE) {
  const fields = await fetchPageFields(slug, locale)
  return {
    eyebrow: pageField(fields, `fti_${slug}_hero_eyebrow`, pageField(fields, 'fti_home_hero_eyebrow')),
    heroTitle: pageField(fields, `fti_${slug}_hero_title`, pageField(fields, 'fti_home_hero_title')),
    heroDescription: pageField(fields, `fti_${slug}_hero_description`, pageField(fields, 'fti_home_hero_description')),
    primaryCtaLabel: pageField(fields, 'fti_home_hero_primary_cta_label'),
    primaryCtaUrl: pageField(fields, 'fti_home_hero_primary_cta_url'),
    secondaryCtaLabel: pageField(fields, 'fti_home_hero_secondary_cta_label'),
    secondaryCtaUrl: pageField(fields, 'fti_home_hero_secondary_cta_url'),
    heroImageUrl: pageField(fields, 'fti_home_hero_image') || null,
  }
}
