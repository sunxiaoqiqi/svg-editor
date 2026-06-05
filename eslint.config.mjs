export default [
  {
    ignores: ['main.js', 'node_modules/**', 'dist/**', 'src/main.ts'],
  },
  {
    files: ['src/**/*.js'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'commonjs',
      globals: {
        DOMParser: 'readonly',
        Element: 'readonly',
        HTMLElement: 'readonly',
        SVGElement: 'readonly',
        XMLSerializer: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        window: 'readonly',
      },
    },
    rules: {
      'no-console': 'warn',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },
]
