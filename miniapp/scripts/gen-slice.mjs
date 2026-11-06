import fs from 'node:fs'
import path from 'node:path'

const VALID_LAYERS = ['entities', 'features', 'widgets', 'pages']

const layer = process.argv[2]
const sliceName = process.argv[3]

if (!layer || !sliceName || !VALID_LAYERS.includes(layer)) {
  console.error('Usage: npm run gen:slice <layer> <slice-name>')
  console.error(`Valid layers: ${VALID_LAYERS.join(', ')}`)
  process.exit(1)
}

const sliceDir = path.resolve('src', layer, sliceName)

if (fs.existsSync(sliceDir)) {
  console.error(`Slice already exists: ${sliceDir}`)
  process.exit(1)
}

const pascalName = sliceName
  .split(/[-_]/)
  .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
  .join('')

const uiDir = path.join(sliceDir, 'ui')

fs.mkdirSync(uiDir, { recursive: true })

fs.writeFileSync(
  path.join(uiDir, `${pascalName}.tsx`),
  `export const ${pascalName} = () => {\n  return <section className="card" />\n}\n`,
  'utf8',
)

fs.writeFileSync(path.join(uiDir, 'index.ts'), `export { ${pascalName} } from './${pascalName}'\n`, 'utf8')
fs.writeFileSync(path.join(sliceDir, 'index.ts'), `export { ${pascalName} } from './ui'\n`, 'utf8')

console.log(`Generated canonical FSD slice at src/${layer}/${sliceName}`)
console.log('Created segments: ui (add model/, api/, lib/, config/ on demand)')
