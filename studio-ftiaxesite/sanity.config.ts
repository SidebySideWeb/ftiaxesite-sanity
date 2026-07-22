import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import seofields from 'sanity-plugin-seofields'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'

export default defineConfig({
  name: 'default',
  title: 'ftiaxesite.gr',

  projectId: '29vmuk87',
  dataset: 'production',

  plugins: [
    structureTool({structure}),
    visionTool(),
    seofields({
      seoPreview: true,
      dashboard: {
        enabled: true,
      },
    }),
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({schemaType}) => !['siteSettings', 'homePage'].includes(schemaType)),
  },
})
