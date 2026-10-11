import type {LocalizedString} from './locale'

export interface SanitySlug {
  readonly current?: string
}

export interface SanityImage {
  readonly asset?: {_ref?: string}
}

export interface HomePageDoc {
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
