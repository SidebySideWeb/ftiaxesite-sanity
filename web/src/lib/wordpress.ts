import type {SanityDocument} from '@sanity/client'
import {sanityClient} from 'sanity:client'
import {pickLocale, urlFor} from './sanity-helpers'
import {pickDocumentSeoData, type SeoFieldsData} from './seo'
import {SEO_FIELDS_PROJECTION} from './seo-queries'
import type {BlogPost, FetchPostsOptions} from '../types'

const BLOG_POSTS_QUERY = `*[
  _type == "blogPost"
  && defined(slug.current)
]|order(publishedDate desc)[$start...$end]{
  _id,
  title,
  excerpt,
  body,
  slug,
  featuredImage,
  category,
  author,
  publishedDate,
  readTimeMinutes,
  seo ${SEO_FIELDS_PROJECTION},
  seoEn ${SEO_FIELDS_PROJECTION}
}`

const BLOG_POST_BY_SLUG_QUERY = `*[_type == "blogPost" && slug.current == $slug][0]{
  _id,
  title,
  excerpt,
  body,
  slug,
  featuredImage,
  category,
  author,
  publishedDate,
  readTimeMinutes,
  seo ${SEO_FIELDS_PROJECTION},
  seoEn ${SEO_FIELDS_PROJECTION}
}`

const BLOG_SLUGS_QUERY = `*[_type == "blogPost" && defined(slug.current)]{
  "params": {"slug": slug.current}
}`

type SanityBlogPost = SanityDocument & {
  title?: {el?: string; en?: string}
  excerpt?: {el?: string; en?: string}
  body?: {el?: unknown; en?: unknown}
  slug?: {current?: string}
  featuredImage?: Parameters<typeof urlFor>[0]
  category?: string
  author?: string
  publishedDate?: string
  readTimeMinutes?: number
  seo?: SeoFieldsData | unknown
  seoEn?: SeoFieldsData | null
}

function mapBlogPost(doc: SanityBlogPost, locale: 'el' | 'en' = 'el'): BlogPost {
  const title = pickLocale(doc.title, locale)
  const excerptPlainText = pickLocale(doc.excerpt, locale)
  const body = locale === 'en' ? (doc.body?.en ?? doc.body?.el) : (doc.body?.el ?? doc.body?.en)
  const featuredImageUrl = urlFor(doc.featuredImage, 1200)
  const seoData = pickDocumentSeoData(doc, locale)

  return {
    id: doc._id,
    slug: doc.slug?.current ?? '',
    title,
    excerptPlainText,
    body,
    publishedAt: doc.publishedDate ?? new Date().toISOString(),
    featuredImageUrl,
    featuredImageAlt: title,
    category: doc.category ?? '',
    author: doc.author ?? 'FtiaxeSite Team',
    readTimeMinutes: doc.readTimeMinutes ?? null,
    seoData,
    seoTitle: seoData?.title ?? null,
    seoDescription: seoData?.description ?? null,
    seoOgImageUrl: urlFor(seoData?.metaImage, 1200) ?? featuredImageUrl,
    seoNoindex: Boolean(seoData?.robots?.noIndex),
  }
}

export async function fetchWordPressPosts(options: FetchPostsOptions = {}): Promise<readonly BlogPost[]> {
  const limit = options.limit ?? 12
  const locale = options.lang === 'en' ? 'en' : 'el'
  const docs = await sanityClient.fetch<SanityBlogPost[]>(BLOG_POSTS_QUERY, {start: 0, end: limit})
  return docs.map((doc) => mapBlogPost(doc, locale))
}

export async function fetchWordPressPostBySlug(slug: string, locale: 'el' | 'en' = 'el'): Promise<BlogPost | null> {
  const doc = await sanityClient.fetch<SanityBlogPost | null>(BLOG_POST_BY_SLUG_QUERY, {slug})
  return doc ? mapBlogPost(doc, locale) : null
}

export async function fetchAllWordPressPostsForStaticPaths(
  lang?: string,
): Promise<readonly BlogPost[]> {
  const locale = lang === 'en' ? 'en' : 'el'
  const docs = await sanityClient.fetch<SanityBlogPost[]>(
    `*[_type == "blogPost" && defined(slug.current)] | order(publishedDate desc){
      _id,
      title,
      excerpt,
      body,
      slug,
      featuredImage,
      category,
      author,
      publishedDate,
      readTimeMinutes,
      seo ${SEO_FIELDS_PROJECTION},
      seoEn ${SEO_FIELDS_PROJECTION}
    }`,
  )
  return docs.map((doc) => mapBlogPost(doc, locale))
}

export async function fetchBlogStaticPaths(): Promise<Array<{params: {slug: string}}>> {
  return sanityClient.fetch(BLOG_SLUGS_QUERY)
}

export type {BlogPost, FetchPostsOptions}
