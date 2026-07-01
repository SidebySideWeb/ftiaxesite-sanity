import {existsSync, readdirSync} from 'node:fs'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'
import sharp from 'sharp'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const imagesDir = join(root, 'public', 'images')

const VARIANT_WIDTHS = [400, 480, 560, 640, 720, 960]

const sourceFiles = readdirSync(imagesDir).filter((name) => /\.(jpe?g|png)$/i.test(name) && !/-\d+w\./i.test(name))

for (const fileName of sourceFiles) {
  const baseName = fileName.replace(/\.(jpe?g|png)$/i, '')
  const inputPath = join(imagesDir, fileName)

  for (const width of VARIANT_WIDTHS) {
    const outputPath = join(imagesDir, `${baseName}-${width}w.webp`)
    if (existsSync(outputPath)) continue

    await sharp(inputPath)
      .resize({width, withoutEnlargement: true})
      .webp({quality: 80, effort: 4})
      .toFile(outputPath)

    console.log(`wrote ${outputPath}`)
  }
}
