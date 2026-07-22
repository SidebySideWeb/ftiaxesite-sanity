import {createClient} from '@sanity/client'
import {getSecret} from 'astro:env/server'

const sanityProjectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID ?? '29vmuk87'
const sanityDataset = import.meta.env.PUBLIC_SANITY_DATASET ?? 'production'
const sanityApiVersion = '2024-01-01'

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
