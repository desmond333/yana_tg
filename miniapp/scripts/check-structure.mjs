import fs from 'node:fs'
import path from 'node:path'

const SRC = path.resolve('src')
const LAYERS = ['app', 'pages', 'widgets', 'features', 'entities', 'shared']
const SLICED_LAYERS = ['pages', 'widgets', 'features', 'entities']
const ROOT_FILES = new Set(['main.tsx', 'vite-env.d.ts'])

const problems = []

const isDirectory = (entry) => entry.isDirectory()

const hasIndex = (dir) => fs.readdirSync(dir).some((name) => name === 'index.ts' || name === 'index.tsx')

const checkSlices = (dir, layer, relative) => {
  const entries = fs.readdirSync(dir, { withFileTypes: true }).filter(isDirectory)

  if (hasIndex(dir)) {
    if (entries.length === 0) {
      problems.push(`${relative}: слайс без сегментов. Создайте ui/, model/, api/, lib/ или config/.`)
    }
    return
  }

  if (entries.length === 0) {
    problems.push(`${relative}: пустой каталог в слое ${layer}.`)
    return
  }

  const isSliceGroup = entries.every((entry) => {
    const child = path.join(dir, entry.name)
    return hasIndex(child) || fs.readdirSync(child, { withFileTypes: true }).some(isDirectory)
  })

  if (!isSliceGroup) {
    problems.push(`${relative}: у слайса нет публичного API (index.ts).`)
    return
  }

  if (!entries.every((entry) => path.join(dir, entry.name))) return

  for (const entry of entries) {
    checkSlices(path.join(dir, entry.name), layer, path.posix.join(relative, entry.name))
  }
}

if (!fs.existsSync(SRC)) {
  console.error('Каталог src не найден.')
  process.exit(1)
}

for (const entry of fs.readdirSync(SRC, { withFileTypes: true })) {
  if (!isDirectory(entry)) {
    if (!ROOT_FILES.has(entry.name)) {
      problems.push(`Лишний файл src/${entry.name}. В корне src допустимы только: ${[...ROOT_FILES].join(', ')}.`)
    }
    continue
  }

  if (!LAYERS.includes(entry.name)) {
    problems.push(`Недопустимый каталог src/${entry.name}. Legacy-структура запрещена, слои FSD: ${LAYERS.join(', ')}.`)
    continue
  }

  if (SLICED_LAYERS.includes(entry.name)) {
    for (const child of fs.readdirSync(path.join(SRC, entry.name), { withFileTypes: true })) {
      if (!isDirectory(child)) {
        problems.push(`Лишний файл src/${entry.name}/${child.name}: файлы вне слайсов в слое ${entry.name} запрещены.`)
        continue
      }
      checkSlices(path.join(SRC, entry.name, child.name), entry.name, `src/${entry.name}/${child.name}`)
    }
  }
}

if (problems.length > 0) {
  console.error('\n[FSD STRUCTURE VIOLATION]')
  for (const problem of problems) {
    console.error(`  - ${problem}`)
  }
  console.error('\nИсправьте структуру по канону FSD и запустите проверку снова.\n')
  process.exit(1)
}

console.log('Structure check passed: каноническая FSD-структура, legacy-каталогов нет.')
