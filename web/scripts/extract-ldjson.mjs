import fs from 'node:fs'
import path from 'node:path'

for (const file of ['index.html', 'services/index.html']) {
  const html = fs.readFileSync(path.join('dist', file), 'utf8')
  const re = /<script type="application\/ld\+json">(.*?)<\/script>/g
  const matches = [...html.matchAll(re)]
  console.log(`=== ${file} (${matches.length} blocks) ===`)
  matches.forEach((m, i) => {
    console.log(JSON.stringify(JSON.parse(m[1]), null, 2))
    if (i < matches.length - 1) console.log('---')
  })
  console.log('')
}
