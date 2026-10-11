/**
 * Fails the production build if any {{...}} token remains after resolving site constants.
 * Skipped in development (astro dev) — only runs from `npm run build`.
 */
import {createRequire} from 'node:module'
import {pathToFileURL} from 'node:url'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const contentUrl = pathToFileURL(join(root, 'src/data/content.ts')).href

// Load via dynamic import — Vite/tsx not required if we re-implement check in plain JS from JSON.
import {readFileSync} from 'node:fs'

const sitePath = join(root, 'src/data/site.ts')
const jsonPath = join(root, 'src/data/ftiaxesite-content.json')
const siteSrc = readFileSync(sitePath, 'utf8')
const raw = JSON.parse(readFileSync(jsonPath, 'utf8'))

function pick(re, fallback) {
  const m = siteSrc.match(re)
  return m?.[1] ?? fallback
}

const PRICE_FROM = pick(/export const PRICE_FROM = '([^']+)'/, '490 €')
const PHONE = pick(/export const PHONE = '([^']+)'/, '')
const EMAIL = pick(/export const EMAIL = '([^']+)'/, '')
const FAQ_EL = pick(/export const FAQ_DOMAIN_OWNERSHIP_EL =\s*'([^']+)'/, '')
const FAQ_EN = pick(/export const FAQ_DOMAIN_OWNERSHIP_EN =\s*'([^']+)'/, '')

function resolveString(value) {
  return String(value)
    .replaceAll('{{PRICE_FROM}}', PRICE_FROM)
    .replaceAll('{{PHONE}}', PHONE)
    .replaceAll('{{EMAIL}}', EMAIL)
    .replace(/\{\{ΣΥΜΠΛΗΡΩΣΕ ΜΕ ΤΟΝ ΤΡΟΠΟ ΠΟΥ ΔΟΥΛΕΥΕΤΕ ΠΡΑΓΜΑΤΙΚΑ:[^}]*\}\}/g, FAQ_EL)
    .replace(/\{\{FILL IN ACCORDING TO HOW YOU ACTUALLY WORK[^}]*\}\}/g, FAQ_EN)
    .replace(/\{\{ΣΥΜΠΛΗΡΩΣΕ ελληνικό τηλέφωνο\}\}/g, PHONE)
    .replace(/\{\{ΣΥΜΠΛΗΡΩΣΕ email\}\}/g, EMAIL)
}

const SKIP_KEYS = new Set(['_readme', '_note'])

function walk(value) {
  if (typeof value === 'string') return resolveString(value)
  if (Array.isArray(value)) return value.map(walk)
  if (value && typeof value === 'object') {
    const out = {}
    for (const [k, v] of Object.entries(value)) {
      if (SKIP_KEYS.has(k)) continue
      out[k] = walk(v)
    }
    return out
  }
  return value
}

const TOKEN_RE = /\{\{[^}]+\}\}/g
const found = new Set()
function collect(value) {
  if (typeof value === 'string') {
    for (const m of value.matchAll(TOKEN_RE)) found.add(m[0])
    return
  }
  if (Array.isArray(value)) {
    for (const item of value) collect(item)
    return
  }
  if (value && typeof value === 'object') {
    for (const child of Object.values(value)) collect(child)
  }
}

collect(walk(raw))

if (found.size > 0) {
  console.error('[ftiaxesite] Unresolved content tokens — refusing production build:')
  for (const t of [...found].sort()) console.error('  ' + t)
  console.error('Fix src/data/site.ts or ftiaxesite-content.json, then rebuild.')
  process.exit(1)
}

console.log('[ftiaxesite] Content token check passed.')
