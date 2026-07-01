import {copyFileSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs'
import {dirname, join} from 'node:path'
import {fileURLToPath} from 'node:url'
import subsetFont from 'subset-font'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const fontsDir = join(root, 'public', 'fonts')
mkdirSync(fontsDir, {recursive: true})

copyFileSync(join(root, 'src', 'styles', 'fonts.css'), join(fontsDir, 'fonts.css'))
console.log('copied fonts.css')

const ICON_GLYPHS = 'verifiedboltsecurityedit_notearrow_forwardmenuclosealternate_emailcalllocation_oncheck_circlearrow_backinfo'

const fontCopies = [
  {
    from: '@fontsource-variable/noto-sans/files/noto-sans-greek-wght-normal.woff2',
    to: 'noto-sans-greek.woff2',
  },
  {
    from: '@fontsource-variable/noto-sans/files/noto-sans-greek-wght-italic.woff2',
    to: 'noto-sans-greek-italic.woff2',
  },
  {
    from: '@fontsource-variable/noto-sans/files/noto-sans-latin-wght-normal.woff2',
    to: 'noto-sans-latin.woff2',
  },
  {
    from: '@fontsource-variable/noto-sans/files/noto-sans-latin-wght-italic.woff2',
    to: 'noto-sans-latin-italic.woff2',
  },
  {
    from: '@fontsource-variable/noto-serif/files/noto-serif-greek-wght-normal.woff2',
    to: 'noto-serif-greek.woff2',
  },
  {
    from: '@fontsource-variable/noto-serif/files/noto-serif-greek-wght-italic.woff2',
    to: 'noto-serif-greek-italic.woff2',
  },
  {
    from: '@fontsource-variable/noto-serif/files/noto-serif-latin-wght-normal.woff2',
    to: 'noto-serif-latin.woff2',
  },
  {
    from: '@fontsource-variable/noto-serif/files/noto-serif-latin-wght-italic.woff2',
    to: 'noto-serif-latin-italic.woff2',
  },
]

for (const {from, to} of fontCopies) {
  const source = join(root, 'node_modules', from)
  const target = join(fontsDir, to)
  copyFileSync(source, target)
  console.log(`copied ${to}`)
}

const iconSource = join(root, 'node_modules', 'material-symbols', 'material-symbols-outlined.woff2')
const iconTarget = join(fontsDir, 'material-symbols-outlined.woff2')
const iconFont = readFileSync(iconSource)
const iconSubset = await subsetFont(iconFont, ICON_GLYPHS, {targetFormat: 'woff2'})
writeFileSync(iconTarget, iconSubset)
writeFileSync(
  join(fontsDir, 'icons.css'),
  `@font-face {
  font-family: 'Material Symbols Outlined';
  font-style: normal;
  font-weight: 100 700;
  font-display: swap;
  src: url('/fonts/material-symbols-outlined.woff2') format('woff2');
}
`,
)
console.log(`wrote material-symbols-outlined.woff2 (${iconSubset.byteLength} bytes)`)
