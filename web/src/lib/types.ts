import type {LocalizedString} from './locale'

export interface SanitySlug {
  readonly current?: string
}

export interface SanityImage {
  readonly asset?: {_ref?: string}
}

export interface HomePageDoc {
  readonly seoTitle?: LocalizedString
  readonly seoDescription?: LocalizedString
  readonly header?: {
    readonly cta?: LocalizedString
    readonly callLabel?: LocalizedString
    readonly nav?: ReadonlyArray<{
      readonly _key?: string
      readonly label?: LocalizedString
      readonly href?: string
    }>
  }
  readonly hero?: {
    readonly eyebrow?: LocalizedString
    readonly h1?: LocalizedString
    readonly sub?: LocalizedString
    readonly cta?: LocalizedString
    readonly micro?: LocalizedString
    readonly conditionNote?: LocalizedString
  }
  readonly marquee?: {
    readonly bandA?: LocalizedString[]
    readonly bandB?: LocalizedString[]
    readonly sr?: LocalizedString
  }
  readonly steps?: {
    readonly eyebrow?: LocalizedString
    readonly title?: LocalizedString
    readonly noteBefore?: LocalizedString
    readonly noteBold?: LocalizedString
    readonly cta?: LocalizedString
    readonly marks?: LocalizedString[]
    readonly liveUrl?: LocalizedString
    readonly items?: ReadonlyArray<{
      readonly _key?: string
      readonly time?: LocalizedString
      readonly title?: LocalizedString
      readonly ill?: string
    }>
  }
  readonly showcase?: {
    readonly title?: LocalizedString
    readonly sub?: LocalizedString
    readonly open?: LocalizedString
    readonly items?: ReadonlyArray<{
      readonly _key?: string
      readonly name?: string
      readonly url?: string
      readonly type?: LocalizedString
    }>
  }
  readonly included?: {
    readonly eyebrow?: LocalizedString
    readonly title?: LocalizedString
    readonly yesTitle?: LocalizedString
    readonly noTitle?: LocalizedString
    readonly yes?: ReadonlyArray<{
      readonly _key?: string
      readonly label?: LocalizedString
      readonly icon?: string
    }>
    readonly no?: ReadonlyArray<{
      readonly _key?: string
      readonly title?: LocalizedString
      readonly note?: LocalizedString
    }>
    readonly noFoot?: LocalizedString
    readonly biggerLink?: LocalizedString
    readonly yearlyBefore?: LocalizedString
    readonly yearlyAfter?: LocalizedString
    readonly yearlyTail?: LocalizedString
    readonly yearlyTag?: LocalizedString
    readonly yearlyPrice?: string
    readonly priceTag?: LocalizedString
    readonly cta?: LocalizedString
  }
  readonly form?: {
    readonly title?: LocalizedString
    readonly sub?: LocalizedString
    readonly eyebrow?: LocalizedString
    readonly nameField?: {
      readonly label?: LocalizedString
      readonly placeholder?: LocalizedString
      readonly error?: LocalizedString
    }
    readonly contactField?: {
      readonly label?: LocalizedString
      readonly placeholder?: LocalizedString
      readonly error?: LocalizedString
    }
    readonly businessField?: {
      readonly label?: LocalizedString
      readonly placeholder?: LocalizedString
    }
    readonly submit?: LocalizedString
    readonly sending?: LocalizedString
    readonly consentLabel?: LocalizedString
    readonly consentError?: LocalizedString
    readonly privacyNotice?: LocalizedString
    readonly genericError?: LocalizedString
    readonly chips?: LocalizedString[]
    readonly assure?: LocalizedString[]
    readonly success?: {
      readonly title?: LocalizedString
      readonly text?: LocalizedString
      readonly textHtml?: LocalizedString
      readonly prompt?: LocalizedString
      readonly callCta?: LocalizedString
    }
  }
  readonly faq?: {
    readonly eyebrow?: LocalizedString
    readonly sideTitle?: LocalizedString
    readonly sidePrompt?: LocalizedString
    readonly items?: ReadonlyArray<{
      readonly _key?: string
      readonly id?: string
      readonly q?: LocalizedString
      readonly a?: LocalizedString
    }>
  }
  readonly packages?: {
    readonly eyebrow?: LocalizedString
    readonly title?: LocalizedString
    readonly note?: LocalizedString
    readonly cta?: LocalizedString
    readonly askLabel?: LocalizedString
    readonly items?: ReadonlyArray<{
      readonly _key?: string
      readonly name?: LocalizedString
      readonly price?: LocalizedString
      readonly text?: LocalizedString
    }>
  }
  readonly footer?: {
    readonly identity?: LocalizedString
    readonly address?: LocalizedString
    readonly contact?: LocalizedString
    readonly family?: LocalizedString
    readonly links?: ReadonlyArray<{
      readonly _key?: string
      readonly label?: LocalizedString
      readonly href?: string
    }>
  }
  readonly workEyebrow?: LocalizedString
  readonly workHeading?: LocalizedString
  readonly workIntro?: LocalizedString
}

export interface ProjectDoc {
  readonly _id: string
  readonly title?: LocalizedString
  readonly slug?: SanitySlug
  readonly liveUrl?: string
  readonly category?: LocalizedString
  readonly description?: LocalizedString
  readonly screenshot?: SanityImage
  readonly order?: number
}

export interface LegalDocDoc {
  readonly _id: string
  readonly type?: 'privacy' | 'cookies' | 'terms'
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
