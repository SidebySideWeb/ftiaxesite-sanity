import raw from './ftiaxesite-content.json'
import type {Locale} from '../lib/locale'
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

  // FAQ ownership placeholders from content JSON (el + en variants).
  out = out.replace(
    /\{\{ΣΥΜΠΛΗΡΩΣΕ ΜΕ ΤΟΝ ΤΡΟΠΟ ΠΟΥ ΔΟΥΛΕΥΕΤΕ ΠΡΑΓΜΑΤΙΚΑ:[^}]*\}\}/g,
    FAQ_DOMAIN_OWNERSHIP_EL,
  )
  out = out.replace(/\{\{FILL IN ACCORDING TO HOW YOU ACTUALLY WORK[^}]*\}\}/g, FAQ_DOMAIN_OWNERSHIP_EN)

  // Catch leftover Greek fill-in tokens for phone/email if present in constants block text.
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

export type SiteContent = typeof raw

/** Resolved homepage content for a locale (no unresolved {{...}} when constants are set). */
export function getContent(locale: Locale): SiteContent {
  return walk(raw as unknown as JsonValue, locale) as SiteContent
}

export function getLocaleBlock<T extends keyof SiteContent>(
  key: T,
  locale: Locale,
): SiteContent[T] extends {el: infer E; en: infer N}
  ? Locale extends 'en'
    ? N
    : E
  : SiteContent[T] {
  const content = getContent(locale)
  const block = content[key] as {el?: unknown; en?: unknown} & SiteContent[T]
  if (block && typeof block === 'object' && ('el' in block || 'en' in block)) {
    return (locale === 'en' ? block.en ?? block.el : block.el ?? block.en) as never
  }
  return block as never
}

/** Returns remaining `{{...}}` tokens after resolution. Empty = safe to ship. */
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
