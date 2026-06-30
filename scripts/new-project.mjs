#!/usr/bin/env node
/**
 * Bootstrap a new Sanity + Astro client project from this starter template.
 *
 * Usage:
 *   node scripts/new-project.mjs --output ../my-client --domain myclient.gr \
 *     --studio-host myclient --sanity-project-id abc123 --seed
 *
 * Create a Sanity project first: https://www.sanity.io/manage or `npx sanity projects create`
 */
import {cpSync, existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync} from 'node:fs'
import {basename, join, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'
import {execSync} from 'node:child_process'

const ROOT = resolve(fileURLToPath(new URL('..', import.meta.url)))

const SKIP_DIRS = new Set(['node_modules', 'dist', '.vercel', '.astro', '.git'])
const SKIP_FILES = new Set(['.env', 'package-lock.json'])

function parseArgs(argv) {
  const args = {
    output: '',
    domain: '',
    studioHost: '',
    siteName: '',
    sanityProjectId: '',
    dataset: 'production',
    seed: false,
    deployStudio: false,
    install: true,
  }

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]
    const next = argv[i + 1]
    switch (arg) {
      case '--output':
      case '-o':
        args.output = next
        i++
        break
      case '--domain':
      case '-d':
        args.domain = next
        i++
        break
      case '--studio-host':
        args.studioHost = next
        i++
        break
      case '--site-name':
        args.siteName = next
        i++
        break
      case '--sanity-project-id':
      case '-p':
        args.sanityProjectId = next
        i++
        break
      case '--dataset':
        args.dataset = next
        i++
        break
      case '--seed':
        args.seed = true
        break
      case '--deploy-studio':
        args.deployStudio = true
        break
      case '--no-install':
        args.install = false
        break
      case '--help':
      case '-h':
        printHelp()
        process.exit(0)
    }
  }

  return args
}

function printHelp() {
  console.log(`
Create a new client project from the ftiaxesite Sanity + Astro stack.

Required:
  --output, -o          Destination folder (must not exist)
  --domain, -d          Production domain, e.g. myclient.gr
  --studio-host         Sanity Studio hostname → myclient.sanity.studio
  --sanity-project-id   Sanity project ID (create at sanity.io/manage first)

Optional:
  --site-name           Display name (default: domain)
  --dataset             Sanity dataset (default: production)
  --seed                Seed all page documents after schema deploy
  --deploy-studio       Deploy Studio to sanity.studio
  --no-install          Skip npm install

Example:
  node scripts/new-project.mjs -o ../acme-web -d acme.gr --studio-host acme \\
    -p k7xabc12 --seed --deploy-studio
`)
}

function copyDir(src, dest) {
  mkdirSync(dest, {recursive: true})
  for (const entry of readdirSync(src, {withFileTypes: true})) {
    if (SKIP_DIRS.has(entry.name)) continue
    if (SKIP_FILES.has(entry.name)) continue
    const from = join(src, entry.name)
    const to = join(dest, entry.name)
    if (entry.isDirectory()) {
      copyDir(from, to)
    } else {
      cpSync(from, to)
    }
  }
}

function replaceInTree(dir, replacements) {
  for (const entry of readdirSync(dir, {withFileTypes: true})) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue
      replaceInTree(full, replacements)
      continue
    }
    if (SKIP_FILES.has(entry.name)) continue

    const ext = entry.name.includes('.') ? entry.name.split('.').pop() : ''
    const textExts = new Set(['ts', 'tsx', 'js', 'mjs', 'json', 'astro', 'md', 'css', 'example', 'txt'])
    if (!textExts.has(ext) && entry.name !== '.env.example') continue

    let content = readFileSync(full, 'utf8')
    let changed = false
    for (const [from, to] of replacements) {
      if (content.includes(from)) {
        content = content.split(from).join(to)
        changed = true
      }
    }
    if (changed) writeFileSync(full, content)
  }
}

function buildProjectConfig({siteName, domain, studioHost, sanityProjectId, dataset}) {
  const template = JSON.parse(readFileSync(join(ROOT, 'project.config.template.json'), 'utf8'))
  const json = JSON.stringify(template, null, 2)
    .replaceAll('{{SITE_NAME}}', siteName)
    .replaceAll('{{DOMAIN}}', domain)
    .replaceAll('{{SANITY_PROJECT_ID}}', sanityProjectId)
    .replaceAll('{{STUDIO_HOST}}', studioHost)
  return JSON.parse(json)
}

function writeWebEnv(dest, cfg) {
  writeFileSync(
    join(dest, 'web', '.env'),
    [
      'SITE_URL=http://localhost:4321',
      `SITE_NAME=${cfg.siteName}`,
      '',
      `PUBLIC_SANITY_PROJECT_ID=${cfg.sanity.projectId}`,
      `PUBLIC_SANITY_DATASET=${cfg.sanity.dataset}`,
      '',
      'SANITY_WRITE_TOKEN=',
      'RESEND_API_KEY=',
      'ADMIN_NOTIFICATION_EMAIL=',
      `SANITY_STUDIO_URL=${cfg.sanity.studioUrl}`,
      'CAL_COM_API_KEY=',
      '',
    ].join('\n'),
  )
}

function run(cmd, cwd) {
  console.log(`\n→ ${cmd}`)
  execSync(cmd, {cwd, stdio: 'inherit', shell: true})
}

function main() {
  const args = parseArgs(process.argv.slice(2))

  if (!args.output || !args.domain || !args.studioHost || !args.sanityProjectId) {
    printHelp()
    process.exit(1)
  }

  const output = resolve(args.output)
  if (existsSync(output)) {
    console.error(`Output already exists: ${output}`)
    process.exit(1)
  }

  const siteName = args.siteName || args.domain
  const cfg = buildProjectConfig({
    siteName,
    domain: args.domain,
    studioHost: args.studioHost,
    sanityProjectId: args.sanityProjectId,
    dataset: args.dataset,
  })

  mkdirSync(output, {recursive: true})

  console.log(`\nCopying template to ${output}…`)
  copyDir(join(ROOT, 'studio-ftiaxesite'), join(output, 'studio'))
  copyDir(join(ROOT, 'web'), join(output, 'web'))
  copyDir(join(ROOT, 'scripts'), join(output, 'scripts'))
  cpSync(join(ROOT, 'project.config.template.json'), join(output, 'project.config.template.json'))
  cpSync(join(ROOT, 'package.json'), join(output, 'package.json'))
  cpSync(join(ROOT, 'PROJECT_SETUP.md'), join(output, 'PROJECT_SETUP.md'))
  writeFileSync(join(output, 'project.config.json'), `${JSON.stringify(cfg, null, 2)}\n`)

  replaceInTree(output, [
    ['29vmuk87', args.sanityProjectId],
    ['ftiaxesite.gr', args.domain],
    ['https://ftiaxesite.sanity.studio', cfg.sanity.studioUrl],
    ['https://ftiaxesite.gr', cfg.siteUrl],
    ['info@ftiaxesite.gr', cfg.contactEmail],
    ['notifications@ftiaxesite.gr', cfg.notificationEmailFrom],
    ['https://ftiaxesite.gr/api/bookings', cfg.bookingsProxyUrl],
  ])

  writeWebEnv(output, cfg)

  if (args.install) {
    run('npm install', join(output, 'studio'))
    run('npm install', join(output, 'web'))
  }

  run('npx sanity schema deploy --yes', join(output, 'studio'))

  if (args.seed) {
    run('npm run seed', join(output, 'studio'))
  }

  if (args.deployStudio) {
    run(`npx sanity deploy -y --url ${args.studioHost}`, join(output, 'studio'))
  }

  console.log(`
✓ Project ready at ${output}

Next steps:
  1. cd ${join(output, 'studio')} && npm run dev
  2. cd ${join(output, 'web')} && npm run dev
  3. npx sanity tokens add "web-write" --role=editor --yes -p ${args.sanityProjectId}
  4. Paste token into web/.env as SANITY_WRITE_TOKEN
  5. Deploy web (Vercel) + Studio (npm run deploy)

Content: ${args.seed ? 'seeded ✓' : 'run `npm run seed` in studio/ to auto-create all pages'}
`)
}

main()
