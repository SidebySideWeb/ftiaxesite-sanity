import {readFileSync} from 'node:fs'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'

export interface ProjectConfig {
  readonly siteName: string
  readonly siteUrl: string
  readonly contactEmail: string
  readonly notificationEmailFrom: string
  readonly agencyName: string
  readonly agencyUrl: string
  readonly sanity: {
    readonly projectId: string
    readonly dataset: string
    readonly studioHost: string
    readonly studioUrl: string
  }
  readonly bookingsProxyUrl: string
  readonly defaultLocale: string
  readonly routes: {
    readonly services: string
    readonly portfolio: string
    readonly about: string
    readonly quote: string
    readonly contact: string
    readonly blog: string
  }
}

export function loadProjectConfig(): ProjectConfig {
  const root = join(dirname(fileURLToPath(import.meta.url)), '../..')
  const configPath = join(root, 'project.config.json')
  return JSON.parse(readFileSync(configPath, 'utf8')) as ProjectConfig
}
