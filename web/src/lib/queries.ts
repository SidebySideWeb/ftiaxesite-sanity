const localeString = '{el, en}'
const localeText = '{el, en}'

/** Minimal home fields still used by blog/portfolio page chrome. */
export const HOME_PAGE_QUERY = `*[_id == "homePage"][0]{
  workEyebrow${localeString},
  workHeading${localeString},
  workIntro${localeText}
}`

export const PROJECTS_QUERY = `*[_type == "project"] | order(order asc){
  _id,
  title${localeString},
  slug,
  liveUrl,
  category${localeString},
  description${localeText},
  screenshot,
  order
}`

export const LEGAL_DOC_QUERY = `*[_type == "legalDoc" && type == $type][0]{
  _id,
  type,
  title${localeString},
  lastUpdated,
  body${localeText}
}`

export const POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc){
  _id,
  title${localeString},
  slug,
  excerpt${localeText},
  publishedAt,
  mainImage,
  seoTitle${localeString},
  seoDescription${localeText}
}`

export const POST_BY_SLUG_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title${localeString},
  slug,
  excerpt${localeText},
  body,
  publishedAt,
  mainImage,
  seoTitle${localeString},
  seoDescription${localeText}
}`
