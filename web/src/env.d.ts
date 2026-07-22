/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    locale: import('./lib/locale').Locale
    publicPath: string
  }
}

interface ImportMetaEnv {
  readonly SITE_URL?: string
  readonly PUBLIC_SANITY_PROJECT_ID?: string
  readonly PUBLIC_SANITY_DATASET?: string
  readonly PUBLIC_GTM_ID?: string
  readonly PUBLIC_RECAPTCHA_SITE_KEY?: string
  readonly SANITY_WRITE_TOKEN?: string
  readonly RESEND_API_KEY?: string
  readonly ADMIN_NOTIFICATION_EMAIL?: string
  readonly RECAPTCHA_SECRET_KEY?: string
  readonly RECAPTCHA_MIN_SCORE?: string
  readonly SANITY_STUDIO_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface Grecaptcha {
  ready: (cb: () => void) => void
  execute: (siteKey: string, options: {action: string}) => Promise<string>
}

interface Window {
  __ftiaxesiteGtmLoaded?: boolean
  __ftiaxesiteLoadGtm?: () => void
  __ftiaxesiteCookieConsentInit?: boolean
  __ftiaxesiteShowCookiePreferences?: () => void
  __ftiaxesiteRecaptchaLoading?: Promise<void>
  dataLayer?: Record<string, unknown>[]
  grecaptcha?: Grecaptcha
}
