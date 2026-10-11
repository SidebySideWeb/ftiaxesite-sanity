const L = '{el, en}'

/** Full ftx homepage singleton. */
export const HOME_PAGE_QUERY = `*[_id == "homePage"][0]{
  seoTitle${L},
  seoDescription${L},
  header{
    cta${L},
    callLabel${L},
    nav[]{_key, label${L}, href}
  },
  hero{
    eyebrow${L},
    h1${L},
    sub${L},
    cta${L},
    micro${L},
    conditionNote${L}
  },
  marquee{
    bandA[]{el, en},
    bandB[]{el, en},
    sr${L}
  },
  steps{
    eyebrow${L},
    title${L},
    noteBefore${L},
    noteBold${L},
    cta${L},
    marks[]{el, en},
    liveUrl${L},
    items[]{_key, time${L}, title${L}, ill}
  },
  showcase{
    title${L},
    sub${L},
    open${L},
    items[]{_key, name, url, type${L}}
  },
  included{
    eyebrow${L},
    title${L},
    yesTitle${L},
    noTitle${L},
    yes[]{_key, label${L}, icon},
    no[]{_key, title${L}, note${L}},
    noFoot${L},
    biggerLink${L},
    yearlyBefore${L},
    yearlyAfter${L},
    yearlyTail${L},
    yearlyTag${L},
    yearlyPrice,
    priceTag${L},
    cta${L}
  },
  form{
    title${L},
    sub${L},
    eyebrow${L},
    nameField{label${L}, placeholder${L}, error${L}},
    contactField{label${L}, placeholder${L}, error${L}},
    businessField{label${L}, placeholder${L}},
    submit${L},
    sending${L},
    consentLabel${L},
    consentError${L},
    privacyNotice${L},
    genericError${L},
    chips[]{el, en},
    assure[]{el, en},
    success{
      title${L},
      text${L},
      textHtml${L},
      prompt${L},
      callCta${L}
    }
  },
  faq{
    eyebrow${L},
    sideTitle${L},
    sidePrompt${L},
    items[]{_key, id, q${L}, a${L}}
  },
  packages{
    eyebrow${L},
    title${L},
    note${L},
    cta${L},
    askLabel${L},
    items[]{_key, name${L}, price${L}, text${L}}
  },
  footer{
    identity${L},
    address${L},
    contact${L},
    family${L},
    links[]{_key, label${L}, href}
  },
  workEyebrow${L},
  workHeading${L},
  workIntro${L}
}`

export const PROJECTS_QUERY = `*[_type == "project"] | order(order asc){
  _id,
  title${L},
  slug,
  liveUrl,
  category${L},
  description${L},
  screenshot,
  order
}`

export const LEGAL_DOC_QUERY = `*[_type == "legalDoc" && type == $type][0]{
  _id,
  type,
  title${L},
  lastUpdated,
  body${L}
}`

export const POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc){
  _id,
  title${L},
  slug,
  excerpt${L},
  publishedAt,
  mainImage,
  seoTitle${L},
  seoDescription${L}
}`

export const POST_BY_SLUG_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title${L},
  slug,
  excerpt${L},
  body,
  publishedAt,
  mainImage,
  seoTitle${L},
  seoDescription${L}
}`
