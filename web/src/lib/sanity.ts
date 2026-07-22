import {createImageUrlBuilder, type SanityImageSource} from '@sanity/image-url'
import {sanityClient} from 'sanity:client'
import {
  FAQ_ITEMS_QUERY,
  FEATURED_PROJECTS_QUERY,
  HOME_PAGE_QUERY,
  LEGAL_DOC_QUERY,
  POST_BY_SLUG_QUERY,
  POST_SLUGS_QUERY,
  POSTS_QUERY,
  PROCESS_STEPS_QUERY,
  PROJECTS_QUERY,
  SERVICE_PACKAGES_QUERY,
  SITE_SETTINGS_QUERY,
  TECH_ITEMS_QUERY,
  VALUE_PROPS_QUERY,
} from './queries'
import type {
  FaqItemDoc,
  HomePageData,
  HomePageDoc,
  LegalDocDoc,
  PostDoc,
  ProcessStepDoc,
  ProjectDoc,
  ServicePackageDoc,
  SiteSettingsDoc,
  TechItemDoc,
  ValuePropDoc,
} from './types'

const {projectId, dataset} = sanityClient.config()

export function imageUrl(source: SanityImageSource | null | undefined, width?: number): string | null {
  if (!source || !projectId || !dataset) return null
  let builder = createImageUrlBuilder({projectId, dataset}).image(source).auto('format').quality(80)
  if (width) builder = builder.width(width)
  return builder.url()
}

export async function fetchSiteSettings(): Promise<SiteSettingsDoc | null> {
  return sanityClient.fetch<SiteSettingsDoc | null>(SITE_SETTINGS_QUERY)
}

export async function fetchHomePage(): Promise<HomePageDoc | null> {
  return sanityClient.fetch<HomePageDoc | null>(HOME_PAGE_QUERY)
}

export async function fetchServicePackages(): Promise<readonly ServicePackageDoc[]> {
  return sanityClient.fetch<readonly ServicePackageDoc[]>(SERVICE_PACKAGES_QUERY)
}

export async function fetchProjects(): Promise<readonly ProjectDoc[]> {
  return sanityClient.fetch<readonly ProjectDoc[]>(PROJECTS_QUERY)
}

export async function fetchFeaturedProjects(): Promise<readonly ProjectDoc[]> {
  return sanityClient.fetch<readonly ProjectDoc[]>(FEATURED_PROJECTS_QUERY)
}

export async function fetchFaqItems(): Promise<readonly FaqItemDoc[]> {
  return sanityClient.fetch<readonly FaqItemDoc[]>(FAQ_ITEMS_QUERY)
}

export async function fetchProcessSteps(): Promise<readonly ProcessStepDoc[]> {
  return sanityClient.fetch<readonly ProcessStepDoc[]>(PROCESS_STEPS_QUERY)
}

export async function fetchValueProps(): Promise<readonly ValuePropDoc[]> {
  return sanityClient.fetch<readonly ValuePropDoc[]>(VALUE_PROPS_QUERY)
}

export async function fetchTechItems(): Promise<readonly TechItemDoc[]> {
  return sanityClient.fetch<readonly TechItemDoc[]>(TECH_ITEMS_QUERY)
}

export async function fetchLegalDoc(type: 'privacy' | 'cookies'): Promise<LegalDocDoc | null> {
  return sanityClient.fetch<LegalDocDoc | null>(LEGAL_DOC_QUERY, {type})
}

export async function fetchPosts(): Promise<readonly PostDoc[]> {
  return sanityClient.fetch<readonly PostDoc[]>(POSTS_QUERY)
}

export async function fetchPostBySlug(slug: string): Promise<PostDoc | null> {
  return sanityClient.fetch<PostDoc | null>(POST_BY_SLUG_QUERY, {slug})
}

export async function fetchPostSlugs(): Promise<readonly string[]> {
  const rows = await sanityClient.fetch<Array<{slug?: string}>>(POST_SLUGS_QUERY)
  return rows.flatMap((row) => (typeof row.slug === 'string' && row.slug.length > 0 ? [row.slug] : []))
}

export async function fetchHomePageData(): Promise<HomePageData> {
  const [settings, home, packages, projects, faqs, processSteps, valueProps, techItems] = await Promise.all([
    fetchSiteSettings(),
    fetchHomePage(),
    fetchServicePackages(),
    fetchFeaturedProjects(),
    fetchFaqItems(),
    fetchProcessSteps(),
    fetchValueProps(),
    fetchTechItems(),
  ])

  return {settings, home, packages, projects, faqs, processSteps, valueProps, techItems}
}
