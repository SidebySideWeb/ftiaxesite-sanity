import fs from 'node:fs'
import path from 'node:path'

function walkHtml(dir, files = []) {
  for (const entry of fs.readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walkHtml(full, files)
    else if (entry.name.endsWith('.html')) files.push(full)
  }
  return files
}

const dist = path.join('dist')
const pages = walkHtml(dist).map((file) => ({
  route: '/' + path.relative(dist, file).replace(/\\/g, '/').replace(/index\.html$/, ''),
  file,
}))

console.log('=== SEO AUDIT ===\n')

for (const {route, file} of pages.sort((a, b) => a.route.localeCompare(b.route))) {
  const html = fs.readFileSync(file, 'utf8')
  const hasSeoHead =
    html.includes('property="og:locale"') &&
    html.includes('name="twitter:card"') &&
    html.includes('rel="canonical"')
  const localBusinessCount = (html.match(/"@type":"ProfessionalService"/g) || []).length
  const hreflangEl = html.match(/hreflang="el"/)
  const hreflangEn = html.match(/hreflang="en"/)
  const hreflangDefault = html.match(/hreflang="x-default"/)
  const noIndex = html.includes('name="robots"')

  console.log(route || '/')
  console.log(`  SeoHead markers: ${hasSeoHead ? 'YES' : 'MISSING'}`)
  console.log(`  LocalBusinessSchema blocks: ${localBusinessCount}`)
  console.log(`  hreflang el/en/x-default: ${Boolean(hreflangEl)}/${Boolean(hreflangEn)}/${Boolean(hreflangDefault)}`)
  console.log(`  noindex robots tag: ${noIndex ? 'YES' : 'no'}`)
  console.log('')
}

console.log('=== noIndex logic test (resolveSeoHead) ===')
const {resolveSeoHead} = await import('../src/lib/seo.ts')

const cases = [
  {
    label: 'robots.noIndex=true',
    input: {
      seoData: {robots: {noIndex: true}},
      canonicalUrl: 'https://ftiaxesite.gr/',
      locale: 'el',
      siteDefaults: {siteName: 'ftiaxesite.gr', defaultDescription: 'Default desc', defaultOgImageUrl: null},
      imageUrlResolver: () => null,
    },
    expectRobots: 'noindex',
  },
  {
    label: 'robots absent',
    input: {
      seoData: {title: 'Test'},
      canonicalUrl: 'https://ftiaxesite.gr/',
      locale: 'el',
      siteDefaults: {siteName: 'ftiaxesite.gr', defaultDescription: 'Default desc', defaultOgImageUrl: null},
      imageUrlResolver: () => null,
    },
    expectRobots: null,
  },
]

for (const c of cases) {
  const r = resolveSeoHead(c.input)
  const pass = c.expectRobots
    ? r.robotsContent?.includes(c.expectRobots)
    : r.robotsContent === null
  console.log(`  ${c.label}: robots=${r.robotsContent ?? 'none'} ${pass ? 'PASS' : 'FAIL'}`)
}
