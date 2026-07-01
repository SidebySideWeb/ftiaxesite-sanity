import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '29vmuk87',
    dataset: 'production'
  },
  deployment: {
    appId: 'ywv3574j2ghmid0hg0xq1y1d',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
})
