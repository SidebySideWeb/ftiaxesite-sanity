/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly WORDPRESS_API_URL?: string
  readonly PUBLIC_WORDPRESS_API_URL?: string
  readonly SITE_URL?: string
  readonly SITE_NAME?: string
  readonly PUBLIC_SANITY_PROJECT_ID?: string
  readonly PUBLIC_SANITY_DATASET?: string
  readonly PUBLIC_GTM_ID?: string
  readonly PUBLIC_GA4_MEASUREMENT_ID?: string
  /** Server-only Sanity write token for form submissions. Never prefix with PUBLIC_. */
  readonly SANITY_WRITE_TOKEN?: string
  /** Server-only Resend API key. Never prefix with PUBLIC_. */
  readonly RESEND_API_KEY?: string
  /** Server-only admin inbox for form notifications. Never prefix with PUBLIC_. */
  readonly ADMIN_NOTIFICATION_EMAIL?: string
  /** Optional override for Studio deep links in notification emails. */
  readonly SANITY_STUDIO_URL?: string
  /** Server-only Cal.com API key for /api/bookings. Never prefix with PUBLIC_. */
  readonly CAL_COM_API_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
