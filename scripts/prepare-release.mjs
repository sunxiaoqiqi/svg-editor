import fs from 'node:fs'
import path from 'node:path'
import process from 'node:process'

const root = process.cwd()
const manifest = JSON.parse(fs.readFileSync(path.join(root, 'manifest.json'), 'utf8'))
const releaseDir = path.join(root, 'release', `v${manifest.version}`)
const releaseAssets = ['main.js', 'manifest.json', 'styles.css']

fs.mkdirSync(releaseDir, { recursive: true })

for (const file of releaseAssets) {
  fs.copyFileSync(path.join(root, file), path.join(releaseDir, file))
}

console.log(`Prepared ${path.relative(root, releaseDir)}`)
