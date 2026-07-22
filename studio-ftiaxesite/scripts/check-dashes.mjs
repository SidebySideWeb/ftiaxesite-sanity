import {readFileSync, readdirSync, statSync} from 'node:fs'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'

const DASH_PATTERN = /[\u2013\u2014]/g
const root = join(dirname(fileURLToPath(import.meta.url)), '../..')

const targets = [
  join(root, 'design-reference'),
  join(root, 'studio-ftiaxesite/scripts/seed.ts'),
]

function collectFiles(path) {
  const stat = statSync(path)
  if (stat.isFile()) return [path]
  return readdirSync(path).flatMap((name) => collectFiles(join(path, name)))
}

let failed = false

for (const target of targets) {
  for (const file of collectFiles(target)) {
    if (!/\.(html|ts|tsx|js|mjs|astro|md)$/.test(file)) continue
    const text = readFileSync(file, 'utf8')
    const matches = [...text.matchAll(DASH_PATTERN)]
    if (matches.length > 0) {
      failed = true
      console.error(`En/em dash found in ${file} (${matches.length} occurrence(s))`)
    }
  }
}

if (failed) {
  console.error('Replace en dashes (–) and em dashes (—) with commas, colons, or plain hyphens.')
  process.exit(1)
}

console.log('No en/em dashes found in design-reference or seed script.')
