import type {LocalizedString} from './locale'

export interface SanitySlug {
  readonly current?: string
}

export interface SanityImage {
  readonly asset?: {_ref?: string}
}

export interface SiteSettingsDoc {
  readonly brandName?: string
  readonly tagline?: LocalizedString
  readonly defaultOgImage?: SanityImage
  readonly familyBadge?: string
  readonly navLinks?: readonly NavLink[]
  readonly navCtaLabel?: LocalizedString
  readonly email?: string
  readonly phone?: string
  readonly addressStreet?: string
  readonly addressCity?: string
  readonly addressPostal?: string
  readonly addressRegion?: string
  readonly serviceArea?: LocalizedString
  readonly addressLine?: LocalizedString
  readonly footerServicesTitle?: LocalizedString
  readonly footerContactTitle?: LocalizedString
  readonly privacyLinkLabel?: LocalizedString
  readonly cookiesLinkLabel?: LocalizedString
  readonly cookieSettingsLabel?: LocalizedString
  readonly copyrightLine?: string
  readonly defaultSeoTitle?: LocalizedString
  readonly defaultSeoDescription?: LocalizedString
  readonly calBookingUrl?: string
  readonly socialLinks?: readonly {platform?: string; url?: string}[]
}

export interface NavLink {
  readonly label?: LocalizedString
  readonly href?: string
}

export interface QuoteFormCopy {
  readonly title?: LocalizedString
  readonly intro?: LocalizedString
  readonly nameLabel?: LocalizedString
  readonly emailLabel?: LocalizedString
  readonly companyLabel?: LocalizedString
  readonly packageLabel?: LocalizedString
  readonly packagePlaceholder?: LocalizedString
  readonly otherPackageLabel?: LocalizedString
  readonly hasSiteLabel?: LocalizedString
  readonly existingUrlLabel?: LocalizedString
  readonly descriptionLabel?: LocalizedString
  readonly timelineLabel?: LocalizedString
  readonly timelinePlaceholder?: LocalizedString
  readonly timelineAsap?: LocalizedString
  readonly timelineSoon?: LocalizedString
  readonly timelineFlexible?: LocalizedString
  readonly submitLabel?: LocalizedString
  readonly footnote?: LocalizedString
  readonly successTitle?: LocalizedString
  readonly successBody?: LocalizedString
  readonly successCallPrompt?: LocalizedString
  readonly successCalLabel?: LocalizedString
}

export interface HomePageDoc {
  readonly heroEyebrow?: LocalizedString
  readonly heroHeading?: LocalizedString
  readonly heroHighlight?: LocalizedString
  readonly heroBody?: LocalizedString
  readonly ctaPrimaryLabel?: LocalizedString
  readonly ctaSecondaryLabel?: LocalizedString
  readonly receiptBadge?: LocalizedString
  readonly heroToolsLine?: string
  readonly valuesEyebrow?: LocalizedString
  readonly valuesHeading?: LocalizedString
  readonly valuesIntro?: LocalizedString
  readonly pricingEyebrow?: LocalizedString
  readonly pricingHeading?: LocalizedString
  readonly pricingIntro?: LocalizedString
  readonly pricingNote?: LocalizedString
  readonly popularBadgeLabel?: LocalizedString
  readonly packageCtaLabel?: LocalizedString
  readonly processEyebrow?: LocalizedString
  readonly processHeading?: LocalizedString
  readonly processIntro?: LocalizedString
  readonly stackEyebrow?: LocalizedString
  readonly stackHeading?: LocalizedString
  readonly stackIntro?: LocalizedString
  readonly stackTechHeading?: LocalizedString
  readonly stackTechIntro?: LocalizedString
  readonly stackHostingHeading?: LocalizedString
  readonly stackHostingIntro?: LocalizedString
  readonly workEyebrow?: LocalizedString
  readonly workHeading?: LocalizedString
  readonly workIntro?: LocalizedString
  readonly faqEyebrow?: LocalizedString
  readonly faqHeading?: LocalizedString
  readonly faqIntro?: LocalizedString
  readonly finalCtaEyebrow?: LocalizedString
  readonly finalCtaHeading?: LocalizedString
  readonly finalCtaBody?: LocalizedString
  readonly finalCtaPrimaryLabel?: LocalizedString
  readonly finalCtaSecondaryLabel?: LocalizedString
  readonly quoteForm?: QuoteFormCopy
  readonly seoTitle?: LocalizedString
  readonly seoDescription?: LocalizedString
}

export interface ServicePackageDoc {
  readonly _id: string
  readonly title?: LocalizedString
  readonly slug?: SanitySlug
  readonly description?: LocalizedString
  readonly price?: number
  readonly currency?: string
  readonly deliveryDaysMin?: number
  readonly deliveryDaysMax?: number
  readonly features?: readonly LocalizedString[]
  readonly featured?: boolean
  readonly order?: number
}

export interface ProjectDoc {
  readonly _id: string
  readonly title?: LocalizedString
  readonly slug?: SanitySlug
  readonly liveUrl?: string
  readonly category?: LocalizedString
  readonly description?: LocalizedString
  readonly screenshot?: SanityImage
  readonly gradientFrom?: string
  readonly gradientTo?: string
  readonly featured?: boolean
  readonly order?: number
}

export interface FaqItemDoc {
  readonly _id: string
  readonly question?: LocalizedString
  readonly answer?: LocalizedString
  readonly order?: number
}

export interface ProcessStepDoc {
  readonly _id: string
  readonly title?: LocalizedString
  readonly description?: LocalizedString
  readonly order?: number
}

export interface ValuePropDoc {
  readonly _id: string
  readonly title?: LocalizedString
  readonly description?: LocalizedString
  readonly order?: number
}

export interface TechItemDoc {
  readonly _id: string
  readonly label?: string
  readonly group?: 'technology' | 'hosting'
  readonly order?: number
}

export interface LegalDocDoc {
  readonly _id: string
  readonly type?: 'privacy' | 'cookies'
  readonly title?: LocalizedString
  readonly lastUpdated?: string
  readonly body?: LocalizedString
}

export interface PostDoc {
  readonly _id: string
  readonly title?: LocalizedString
  readonly slug?: SanitySlug
  readonly excerpt?: LocalizedString
  readonly body?: {el?: unknown[]; en?: unknown[]}
  readonly publishedAt?: string
  readonly mainImage?: SanityImage
  readonly seoTitle?: LocalizedString
  readonly seoDescription?: LocalizedString
}

export interface HomePageData {
  readonly settings: SiteSettingsDoc | null
  readonly home: HomePageDoc | null
  readonly packages: readonly ServicePackageDoc[]
  readonly projects: readonly ProjectDoc[]
  readonly faqs: readonly FaqItemDoc[]
  readonly processSteps: readonly ProcessStepDoc[]
  readonly valueProps: readonly ValuePropDoc[]
  readonly techItems: readonly TechItemDoc[]
}
