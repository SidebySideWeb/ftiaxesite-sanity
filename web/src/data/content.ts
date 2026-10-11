import {AsyncLocalStorage} from 'node:async_hooks'
import raw from './ftiaxesite-content.json'
import {resolveHomePage, type HomeSection, type ResolvedHome} from './map-home'
import type {Locale} from '../lib/locale'
import {fetchHomePage} from '../lib/sanity'
import {
  EMAIL,
  FAQ_DOMAIN_OWNERSHIP_EL,
  FAQ_DOMAIN_OWNERSHIP_EN,
  PHONE,
  PRICE_FROM,
} from './site'

const TOKEN_RE = /\{\{[^}]+\}\}/g

type JsonValue = string | number | boolean | null | JsonValue[] | {[key: string]: JsonValue}

function resolveString(value: string, locale: Locale): string {
  let out = value
    .replaceAll('{{PRICE_FROM}}', PRICE_FROM)
    .replaceAll('{{PHONE}}', PHONE)
    .replaceAll('{{EMAIL}}', EMAIL)

  out = out.replace(
    /\{\{ΣΥΜΠΛΗΡΩΣΕ ΜΕ ΤΟΝ ΤΡΟΠΟ ΠΟΥ ΔΟΥΛΕΥΕΤΕ ΠΡΑΓΜΑΤΙΚΑ:[^}]*\}\}/g,
    FAQ_DOMAIN_OWNERSHIP_EL,
  )
  out = out.replace(/\{\{FILL IN ACCORDING TO HOW YOU ACTUALLY WORK[^}]*\}\}/g, FAQ_DOMAIN_OWNERSHIP_EN)
  out = out.replace(/\{\{ΣΥΜΠΛΗΡΩΣΕ ελληνικό τηλέφωνο\}\}/g, PHONE)
  out = out.replace(/\{\{ΣΥΜΠΛΗΡΩΣΕ email\}\}/g, EMAIL)

  if (locale === 'en' && out === FAQ_DOMAIN_OWNERSHIP_EL && value.includes('FILL IN')) {
    out = FAQ_DOMAIN_OWNERSHIP_EN
  }

  return out
}

const SKIP_KEYS = new Set(['_readme', '_note'])

function walk(value: JsonValue, locale: Locale): JsonValue {
  if (typeof value === 'string') return resolveString(value, locale)
  if (Array.isArray(value)) return value.map((item) => walk(item, locale))
  if (value && typeof value === 'object') {
    const out: {[key: string]: JsonValue} = {}
    for (const [key, child] of Object.entries(value)) {
      if (SKIP_KEYS.has(key)) continue
      out[key] = walk(child, locale)
    }
    return out
  }
  return value
}

function collectTokens(value: unknown, found: Set<string>): void {
  if (typeof value === 'string') {
    for (const match of value.matchAll(TOKEN_RE)) found.add(match[0])
    return
  }
  if (Array.isArray(value)) {
    for (const item of value) collectTokens(item, found)
    return
  }
  if (value && typeof value === 'object') {
    for (const [key, child] of Object.entries(value)) {
      if (SKIP_KEYS.has(key)) continue
      collectTokens(child, found)
    }
  }
}

/** JSON fallback shape (legacy bilingual file). */
export type SiteContent = typeof raw

type RequestStore = {
  home: ResolvedHome | null
}

const als = new AsyncLocalStorage<RequestStore>()

export async function loadHomeForRequest(locale: Locale): Promise<ResolvedHome | null> {
  try {
    const doc = await fetchHomePage()
    if (!doc?.hero?.h1?.el && !doc?.hero?.h1?.en) return null
    return resolveHomePage(doc, locale)
  } catch {
    return null
  }
}

export function runWithHomeContent<T>(home: ResolvedHome | null, fn: () => T): T {
  return als.run({home}, fn)
}

function jsonLocaleBlock<T extends keyof SiteContent>(key: T, locale: Locale): unknown {
  const content = walk(raw as unknown as JsonValue, locale) as SiteContent
  const block = content[key] as {el?: unknown; en?: unknown} & SiteContent[T]
  if (block && typeof block === 'object' && ('el' in block || 'en' in block)) {
    const localePart = locale === 'en' ? block.en ?? block.el : block.el ?? block.en
    if (key === 'showcase' && 'items' in block) {
      return {...(localePart as object), items: (block as {items: unknown}).items}
    }
    return localePart
  }
  return block
}

/**
 * Section copy for the current request.
 * Prefers Sanity homePage (via middleware ALS / override); falls back to JSON.
 */
export function getLocaleBlock<K extends HomeSection>(
  key: K,
  locale: Locale,
  override?: ResolvedHome | null,
): ResolvedHome[K] {
  const fromSanity = override ?? als.getStore()?.home
  if (fromSanity?.[key] != null) return fromSanity[key]

  // JSON fallback — best-effort mapping for shared keys
  return jsonLocaleBlock(key as keyof SiteContent, locale) as ResolvedHome[K]
}

export function getContent(locale: Locale): SiteContent {
  return walk(raw as unknown as JsonValue, locale) as SiteContent
}

export function findUnresolvedTokens(locale: Locale = 'el'): string[] {
  const found = new Set<string>()
  collectTokens(getContent(locale), found)
  return [...found].sort()
}

export function assertNoUnresolvedTokens(): void {
  const el = findUnresolvedTokens('el')
  const en = findUnresolvedTokens('en')
  const all = [...new Set([...el, ...en])]
  if (all.length === 0) return
  throw new Error(
    `[ftiaxesite] Unresolved content tokens in production content:\n  ${all.join('\n  ')}\nSet values in src/data/site.ts or ftiaxesite-content.json.`,
  )
}

export {raw as rawContent}
