import type {SeoFieldsData} from '../lib/seo'

export interface BlogPost {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly excerptPlainText: string;
  readonly body: unknown;
  readonly publishedAt: string;
  readonly featuredImageUrl: string | null;
  readonly featuredImageAlt: string | null;
  readonly category: string;
  readonly author: string;
  readonly readTimeMinutes: number | null;
  readonly seoData: SeoFieldsData | null;  /** @deprecated Use seoData */
  readonly seoTitle: string | null;
  readonly seoDescription: string | null;
  readonly seoOgImageUrl: string | null;
  readonly seoNoindex: boolean;
}

export interface FetchPostsOptions {
  readonly limit?: number;
  readonly locale?: string;
}
