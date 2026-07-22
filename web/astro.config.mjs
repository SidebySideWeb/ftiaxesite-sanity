import sitemap from '@astrojs/sitemap'
import tailwind from '@astrojs/tailwind'
import vercel from '@astrojs/vercel'
import sanity from '@sanity/astro'
import {defineConfig, envField} from 'astro/config'
import {loadEnv} from 'vite'
import {resolveSiteUrlFromEnv} from './src/lib/site-url.ts'

const env = loadEnv(process.env.NODE_ENV ?? 'development', process.cwd(), '')
const siteUrl = resolveSiteUrlFromEnv(env.SITE_URL)
const sanityProjectId = env.PUBLIC_SANITY_PROJECT_ID ?? '29vmuk87'
const sanityDataset = env.PUBLIC_SANITY_DATASET ?? 'production'
const sanityStudioUrl = env.SANITY_STUDIO_URL ?? 'https://ftiaxesite.sanity.studio'

export default defineConfig({
  site: siteUrl,
  output: 'server',
  adapter: vercel(),
  build: {
    inlineStylesheets: 'always',
  },
  env: {
    schema: {
      SITE_URL: envField.string({
        context: 'server',
        access: 'public',
        optional: true,
        default: siteUrl,
      }),
      PUBLIC_SANITY_PROJECT_ID: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
        default: sanityProjectId,
      }),
      PUBLIC_SANITY_DATASET: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
        default: sanityDataset,
      }),
      PUBLIC_GTM_ID: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
        default: env.PUBLIC_GTM_ID ?? '',
      }),
      SANITY_WRITE_TOKEN: envField.string({context: 'server', access: 'secret', optional: true}),
      RESEND_API_KEY: envField.string({context: 'server', access: 'secret', optional: true}),
      ADMIN_NOTIFICATION_EMAIL: envField.string({context: 'server', access: 'secret', optional: true}),
      SANITY_STUDIO_URL: envField.string({
        context: 'server',
        access: 'public',
        optional: true,
        default: sanityStudioUrl,
      }),
    },
  },
  integrations: [
    tailwind({applyBaseStyles: false}),
    sitemap({
      filter: (page) => !page.includes('/api/'),
    }),
    sanity({
      projectId: sanityProjectId,
      dataset: sanityDataset,
      useCdn: false,
    }),
  ],
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'el',
    locales: ['el'],
  },
})
