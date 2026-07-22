/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly SITE_URL?: string
  readonly PUBLIC_SANITY_PROJECT_ID?: string
  readonly PUBLIC_SANITY_DATASET?: string
  readonly PUBLIC_GTM_ID?: string
  readonly SANITY_WRITE_TOKEN?: string
  readonly RESEND_API_KEY?: string
  readonly ADMIN_NOTIFICATION_EMAIL?: string
  readonly SANITY_STUDIO_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface Window {
  __ftiaxesiteGtmLoaded?: boolean
  __ftiaxesiteLoadGtm?: () => void
  __ftiaxesiteCookieConsentInit?: boolean
  __ftiaxesiteShowCookiePreferences?: () => void
  dataLayer?: Record<string, unknown>[]
}
