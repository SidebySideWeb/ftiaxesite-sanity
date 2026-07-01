import {writeFileSync} from 'node:fs'
import {dirname, join} from 'node:path'
import {fileURLToPath, pathToFileURL} from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const {buildVercelHeadersConfig} = await import(pathToFileURL(join(root, 'src/lib/security-headers.ts')).href)

writeFileSync(join(root, 'vercel.json'), `${JSON.stringify(buildVercelHeadersConfig(), null, 2)}\n`)
