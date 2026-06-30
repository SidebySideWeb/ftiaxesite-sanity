import {createClient} from '@sanity/client'
import {getSecret} from 'astro:env/server'
import {sanityApiVersion, sanityDataset, sanityProjectId} from './sanity-project'

export function createSanityWriteClient() {
  const token = getSecret('SANITY_WRITE_TOKEN')
  if (!token) {
    throw new Error('SANITY_WRITE_TOKEN is not configured')
  }

  return createClient({
    projectId: sanityProjectId,
    dataset: sanityDataset,
    apiVersion: sanityApiVersion,
    token,
    useCdn: false,
  })
}
