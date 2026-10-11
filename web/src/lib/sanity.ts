import {createImageUrlBuilder, type SanityImageSource} from '@sanity/image-url'
import {sanityClient} from 'sanity:client'
import {
  HOME_PAGE_QUERY,
  LEGAL_DOC_QUERY,
  POST_BY_SLUG_QUERY,
  POSTS_QUERY,
  PROJECTS_QUERY,
} from './queries'
import type {HomePageDoc, LegalDocDoc, PostDoc, ProjectDoc} from './types'

const {projectId, dataset} = sanityClient.config()

export function imageUrl(source: SanityImageSource | null | undefined, width?: number): string | null {
  if (!source || !projectId || !dataset) return null
  let builder = createImageUrlBuilder({projectId, dataset}).image(source).auto('format').quality(80)
  if (width) builder = builder.width(width)
  return builder.url()
}

export async function fetchHomePage(): Promise<HomePageDoc | null> {
  return sanityClient.fetch<HomePageDoc | null>(HOME_PAGE_QUERY)
}

export async function fetchProjects(): Promise<readonly ProjectDoc[]> {
  return sanityClient.fetch<readonly ProjectDoc[]>(PROJECTS_QUERY)
}

export async function fetchLegalDoc(
  type: 'privacy' | 'cookies' | 'terms',
): Promise<LegalDocDoc | null> {
  return sanityClient.fetch<LegalDocDoc | null>(LEGAL_DOC_QUERY, {type})
}

export async function fetchPosts(): Promise<readonly PostDoc[]> {
  return sanityClient.fetch<readonly PostDoc[]>(POSTS_QUERY)
}

export async function fetchPostBySlug(slug: string): Promise<PostDoc | null> {
  return sanityClient.fetch<PostDoc | null>(POST_BY_SLUG_QUERY, {slug})
}
