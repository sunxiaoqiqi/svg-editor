import esbuild from 'esbuild'
import process from 'node:process'
import builtins from 'builtin-modules'

const production = process.argv[2] === 'production'

const context = await esbuild.context({
  banner: {
    js: '/* THIS FILE IS GENERATED. Do not edit directly. */',
  },
  bundle: true,
  entryPoints: ['src/main.js'],
  external: [
    'obsidian',
    'electron',
    '@codemirror/autocomplete',
    '@codemirror/collab',
    '@codemirror/commands',
    '@codemirror/language',
    '@codemirror/lint',
    '@codemirror/search',
    '@codemirror/state',
    '@codemirror/view',
    '@lezer/common',
    '@lezer/highlight',
    '@lezer/lr',
    ...builtins,
  ],
  format: 'cjs',
  logLevel: 'info',
  minify: production,
  outfile: 'main.js',
  platform: 'browser',
  sourcemap: production ? false : 'inline',
  target: 'es2018',
  treeShaking: true,
})

if (production) {
  await context.rebuild()
  await context.dispose()
} else {
  await context.watch()
}
