import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2025-01-01'})

type LocaleValue = {_type?: string; el?: string; en?: string}

interface LegacySeo {
  _type?: string
  title?: string | LocaleValue
  description?: string | LocaleValue
  ogImage?: unknown
  noIndex?: boolean
}

function isLocaleValue(value: unknown): value is LocaleValue {
  return Boolean(value && typeof value === 'object' && ('el' in value || 'en' in value))
}

function pickLocale(value: string | LocaleValue | undefined, locale: 'el' | 'en'): string | undefined {
  if (!value) return undefined
  if (typeof value === 'string') return value.trim() || undefined
  const picked = locale === 'en' ? value.en ?? value.el : value.el ?? value.en
  return picked?.trim() || undefined
}

function isLegacySeo(value: unknown): value is LegacySeo {
  if (!value || typeof value !== 'object') return false
  const seo = value as LegacySeo
  if (seo._type === 'seo') return true
  return isLocaleValue(seo.title) || isLocaleValue(seo.description)
}

function toSeoFields(legacy: LegacySeo, locale: 'el' | 'en') {
  return {
    _type: 'seoFields' as const,
    title: pickLocale(legacy.title, locale),
    description: pickLocale(legacy.description, locale),
    metaImage: legacy.ogImage ?? undefined,
    robots: legacy.noIndex ? {noIndex: true} : undefined,
  }
}

async function migrate() {
  const docs = await client.fetch<
    Array<{_id: string; _type: string; seo?: unknown; seoEn?: unknown}>
  >(
    `*[
      (defined(seo) && (seo._type == "seo" || defined(seo.title.el) || defined(seo.description.el)))
      || (defined(seoEn) && (seoEn._type == "seo" || defined(seoEn.title.el) || defined(seoEn.description.el)))
    ]{_id, _type, seo, seoEn}`,
  )

  if (docs.length === 0) {
    console.log('No documents with legacy SEO shape found.')
    return
  }

  console.log(`Migrating ${docs.length} document(s)...`)

  const tx = client.transaction()

  for (const doc of docs) {
    const patches: Record<string, unknown> = {}

    if (doc.seo && isLegacySeo(doc.seo)) {
      patches.seo = toSeoFields(doc.seo, 'el')
      if (!doc.seoEn && (pickLocale(doc.seo.title, 'en') || pickLocale(doc.seo.description, 'en'))) {
        patches.seoEn = toSeoFields(doc.seo, 'en')
      }
    }

    if (doc.seoEn && isLegacySeo(doc.seoEn)) {
      patches.seoEn = toSeoFields(doc.seoEn, 'en')
    }

    if (Object.keys(patches).length === 0) {
      console.log(`  skip ${doc._id} — no convertible legacy fields`)
      continue
    }

    console.log(`  patch ${doc._id} (${doc._type})`)
    tx.patch(doc._id, {set: patches})
  }

  await tx.commit()
  console.log('Migration complete. Refresh Sanity Studio and reopen the SEO tab.')
}

migrate().catch((err) => {
  console.error(err)
  process.exit(1)
})
