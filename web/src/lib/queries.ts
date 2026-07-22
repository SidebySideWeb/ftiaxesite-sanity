const localeString = '{el, en}'
const localeText = '{el, en}'

export const SITE_SETTINGS_QUERY = `*[_id == "siteSettings"][0]{
  brandName,
  tagline${localeString},
  defaultOgImage,
  familyBadge,
  navLinks[]{label${localeString}, href},
  navCtaLabel${localeString},
  email,
  phone,
  addressStreet,
  addressCity,
  addressPostal,
  addressRegion,
  serviceArea${localeString},
  addressLine${localeText},
  footerServicesTitle${localeString},
  footerContactTitle${localeString},
  privacyLinkLabel${localeString},
  cookiesLinkLabel${localeString},
  cookieSettingsLabel${localeString},
  copyrightLine,
  defaultSeoTitle${localeString},
  defaultSeoDescription${localeText},
  calBookingUrl,
  socialLinks[]{platform, url}
}`

export const HOME_PAGE_QUERY = `*[_id == "homePage"][0]{
  heroEyebrow${localeString},
  heroHeading${localeString},
  heroHighlight${localeString},
  heroBody${localeText},
  ctaPrimaryLabel${localeString},
  ctaSecondaryLabel${localeString},
  receiptBadge${localeString},
  heroToolsLine,
  valuesEyebrow${localeString},
  valuesHeading${localeString},
  valuesIntro${localeText},
  pricingEyebrow${localeString},
  pricingHeading${localeString},
  pricingIntro${localeText},
  pricingNote${localeText},
  popularBadgeLabel${localeString},
  packageCtaLabel${localeString},
  processEyebrow${localeString},
  processHeading${localeString},
  processIntro${localeText},
  stackEyebrow${localeString},
  stackHeading${localeString},
  stackIntro${localeText},
  stackTechHeading${localeString},
  stackTechIntro${localeText},
  stackHostingHeading${localeString},
  stackHostingIntro${localeText},
  workEyebrow${localeString},
  workHeading${localeString},
  workIntro${localeText},
  faqEyebrow${localeString},
  faqHeading${localeString},
  faqIntro${localeText},
  finalCtaEyebrow${localeString},
  finalCtaHeading${localeString},
  finalCtaBody${localeText},
  finalCtaPrimaryLabel${localeString},
  finalCtaSecondaryLabel${localeString},
  quoteForm{
    title${localeString},
    intro${localeText},
    nameLabel${localeString},
    emailLabel${localeString},
    companyLabel${localeString},
    packageLabel${localeString},
    packagePlaceholder${localeString},
    otherPackageLabel${localeString},
    hasSiteLabel${localeString},
    existingUrlLabel${localeString},
    descriptionLabel${localeString},
    timelineLabel${localeString},
    timelinePlaceholder${localeString},
    timelineAsap${localeString},
    timelineSoon${localeString},
    timelineFlexible${localeString},
    submitLabel${localeString},
    footnote${localeText},
    successTitle${localeString},
    successBody${localeText},
    successCallPrompt${localeString},
    successCalLabel${localeString}
  },
  seoTitle${localeString},
  seoDescription${localeText}
}`

export const SERVICE_PACKAGES_QUERY = `*[_type == "servicePackage"] | order(order asc){
  _id,
  title${localeString},
  slug,
  description${localeText},
  price,
  currency,
  deliveryDaysMin,
  deliveryDaysMax,
  features[]${localeString},
  featured,
  order
}`

export const PROJECTS_QUERY = `*[_type == "project"] | order(order asc){
  _id,
  title${localeString},
  slug,
  liveUrl,
  category${localeString},
  description${localeText},
  screenshot,
  gradientFrom,
  gradientTo,
  featured,
  order
}`

export const FEATURED_PROJECTS_QUERY = `*[_type == "project" && featured == true] | order(order asc)[0...8]{
  _id,
  title${localeString},
  slug,
  liveUrl,
  category${localeString},
  description${localeText},
  screenshot,
  gradientFrom,
  gradientTo,
  featured,
  order
}`

export const FAQ_ITEMS_QUERY = `*[_type == "faqItem"] | order(order asc){
  _id,
  question${localeString},
  answer${localeText},
  order
}`

export const PROCESS_STEPS_QUERY = `*[_type == "processStep"] | order(order asc){
  _id,
  title${localeString},
  description${localeText},
  order
}`

export const VALUE_PROPS_QUERY = `*[_type == "valueProp"] | order(order asc){
  _id,
  title${localeString},
  description${localeText},
  order
}`

export const TECH_ITEMS_QUERY = `*[_type == "techItem"] | order(order asc){
  _id,
  label,
  group,
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

export const POST_SLUGS_QUERY = `*[_type == "post" && defined(slug.current)]{ "slug": slug.current }`
