/**
 * GROQ projection for sanity-plugin-seofields `seoFields` objects.
 * Type name in Studio schema: `seoFields` (registered by the plugin).
 *
 * Confirmed field paths from plugin source (dist/index.js seoFieldsSchema):
 *   title, description, metaImage, metaAttributes[], keywords[], canonicalUrl,
 *   robots{noIndex,noFollow,noTranslate,noImageIndex},
 *   openGraph{url,title,description,siteName,type,imageType,image,imageUrl},
 *   twitter{card,site,creator,title,description,imageType,image,imageUrl}
 *
 * Note: `preview`, `focusKeyword`, `hreflangs`, `geoChecklist`, `metaTagsPreview`
 * are Studio-only UI fields — not needed for frontend rendering.
 */
export const SEO_FIELDS_PROJECTION = `{
  title,
  description,
  canonicalUrl,
  keywords,
  metaImage,
  metaAttributes[]{key, value, type},
  robots{noIndex, noFollow, noTranslate, noImageIndex},
  openGraph{
    url,
    title,
    description,
    siteName,
    type,
    imageType,
    imageUrl,
    image
  },
  twitter{
    card,
    site,
    creator,
    title,
    description,
    imageType,
    imageUrl,
    image
  }
}`

/** GROQ fragment: `seo` + `seoEn` on a document. */
export const DOCUMENT_SEO_PROJECTION = `{
  seo ${SEO_FIELDS_PROJECTION},
  seoEn ${SEO_FIELDS_PROJECTION}
}`
