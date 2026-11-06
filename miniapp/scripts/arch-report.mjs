import fs from 'node:fs'
import path from 'node:path'

const SRC_DIR = path.resolve('src')
const LAYERS = ['app', 'pages', 'widgets', 'features', 'entities', 'shared']
const CODE_LIMIT = 300

const walkDir = (dir, fileList = []) => {
  if (!fs.existsSync(dir)) return fileList
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      walkDir(fullPath, fileList)
    } else {
      fileList.push(fullPath)
    }
  }
  return fileList
}

const countLines = (filePath) => {
  try {
    const content = fs.readFileSync(filePath, 'utf8')
    if (!content) return 0
    return content.split(/\r?\n/).length
  } catch {
    return 0
  }
}

const allFiles = walkDir(SRC_DIR)

const layerStats = {}
for (const layerName of LAYERS) {
  const dirPath = path.join(SRC_DIR, layerName)
  const files = allFiles.filter((file) => file.startsWith(dirPath))
  const lines = files.reduce((acc, file) => acc + countLines(file), 0)
  layerStats[layerName] = { files: files.length, lines }
}

const sourceFiles = allFiles
  .filter((file) => !file.includes('.test.') && (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.css')))
  .map((filePath) => ({
    path: path.relative(process.cwd(), filePath).replace(/\\/g, '/'),
    lines: countLines(filePath),
    type: filePath.endsWith('.css') ? 'CSS' : 'TS/TSX',
  }))
  .sort((a, b) => b.lines - a.lines)

const oversized = sourceFiles.filter((file) => file.lines > CODE_LIMIT)

console.log('=== FSD ARCHITECTURE METRICS REPORT ===\n')

console.log('1. Layers summary:')
console.table(layerStats)

console.log('\n2. Threshold violations:')
console.log(`- Files over ${CODE_LIMIT} lines: ${oversized.length}`)
for (const file of oversized) {
  console.log(`  - ${file.path} (${file.lines})`)
}

console.log('\n3. Top 15 largest files:')
console.table(
  sourceFiles.slice(0, 15).map((file, index) => ({
    '#': index + 1,
    file: file.path,
    lines: file.lines,
    type: file.type,
  })),
)
