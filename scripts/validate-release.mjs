import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const root = process.cwd()
const requiredRootFiles = ['README.md', 'LICENSE', 'manifest.json', 'versions.json']
const requiredReleaseAssets = ['main.js', 'manifest.json', 'styles.css']
const forbiddenSourcePatterns = [
  { pattern: /\bfetch\s*\(/, label: 'fetch(' },
  { pattern: /\bXMLHttpRequest\b/, label: 'XMLHttpRequest' },
  { pattern: /\beval\s*\(/, label: 'eval(' },
  { pattern: /\bnew\s+Function\s*\(/, label: 'new Function(' },
  { pattern: /\bconsole\.(log|debug|info|warn|error)\s*\(/, label: 'console.*(' },
]

function readJson(file) {
  return JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'))
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message)
  }
}

function assertFile(file) {
  assert(fs.existsSync(path.join(root, file)), `Missing required file: ${file}`)
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) return walk(fullPath)
    return fullPath
  })
}

for (const file of requiredRootFiles) assertFile(file)
for (const file of requiredReleaseAssets) assertFile(file)

const manifest = readJson('manifest.json')
const pkg = readJson('package.json')
const versions = readJson('versions.json')
const releaseDir = path.join(root, 'release', manifest.version)

assert(/^[a-z0-9-]+$/.test(manifest.id), 'manifest.id must use lowercase letters, numbers, and hyphens.')
assert(!manifest.id.includes('obsidian'), 'manifest.id must not contain "obsidian".')
assert(!manifest.id.endsWith('plugin'), 'manifest.id must not end with "plugin".')
assert(/^\d+\.\d+\.\d+$/.test(manifest.version), 'manifest.version must use x.y.z semver format.')
assert(manifest.version === pkg.version, 'manifest.json version must match package.json version.')
assert(versions[manifest.version] === manifest.minAppVersion, 'versions.json must map the current version to minAppVersion.')
assert(manifest.id === 'svg-canvas-editor', 'manifest id must be svg-canvas-editor.')
assert(manifest.name === 'SVG Canvas Editor', 'manifest name must be SVG Canvas Editor.')
assert(manifest.author === 'suntinglu777', 'manifest author must be suntinglu777.')
assert(!/\bobsidian\b/i.test(manifest.description), 'manifest description must not include the word "Obsidian".')
assert(!('authorUrl' in manifest), 'manifest authorUrl is omitted until a reachable author profile is available.')

const readme = fs.readFileSync(path.join(root, 'README.md'), 'utf8')
for (const phrase of ['File Access', 'Network Access', '.bak']) {
  assert(readme.includes(phrase), `README.md must document ${phrase}.`)
}

assert(fs.existsSync(releaseDir), `Missing release asset directory: ${path.relative(root, releaseDir)}`)
for (const file of requiredReleaseAssets) {
  const rootAsset = path.join(root, file)
  const releaseAsset = path.join(releaseDir, file)
  assert(fs.existsSync(releaseAsset), `Missing release asset: ${path.relative(root, releaseAsset)}`)
  assert(
    fs.readFileSync(rootAsset).equals(fs.readFileSync(releaseAsset)),
    `Release asset is stale: ${path.relative(root, releaseAsset)}`
  )
}

const sourceFiles = walk(path.join(root, 'src')).filter((file) => file.endsWith('.js'))
for (const file of sourceFiles) {
  const source = fs.readFileSync(file, 'utf8')
  for (const check of forbiddenSourcePatterns) {
    assert(!check.pattern.test(source), `${path.relative(root, file)} contains forbidden release pattern: ${check.label}`)
  }
}

console.log('Release validation passed.')
