
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'
 
export default defineConfig([
  // ─── Fichiers ignorés ───────────────────────────────────────────────────────
  globalIgnores(['dist', 'node_modules', '.vite']),
 
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      // ─── Variables ──────────────────────────────────────────────────────────
      // Ignore les constantes en MAJUSCULES (ex: composants non utilisés localement)
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
 
      // ─── React ──────────────────────────────────────────────────────────────
      // Pas besoin d'importer React en scope depuis React 17+
      'react/react-in-jsx-scope': 'off',
      // Avertit si les props ne sont pas validées (désactivé en JS pur, utile en TS)
      'react/prop-types': 'off',
    },
  },
])
 









