import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import importPlugin from 'eslint-plugin-import';
import path from 'node:path';
import { fileURLToPath } from 'url';

function getDirname(importMetaUrl) {
  const filename = fileURLToPath(importMetaUrl);
  return path.dirname(filename);
}
const __dirname = getDirname(import.meta.url);

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [
      js.configs.recommended,
      eslintPluginPrettierRecommended,
      importPlugin.flatConfigs.recommended,
      ...tseslint.configs.recommended,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'import/order': [
        'error',
        {
          'newlines-between': 'always-and-inside-groups',
          distinctGroup: true,
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          named: true,
          groups: [
            'external',
            'builtin',
            'internal',
            'parent',
            'sibling',
            'index',
            'type',
          ],
        },
      ],
      'no-empty-pattern': 'off',
    },
    settings: {
      'import/resolver': {
        'eslint-import-resolver-custom-alias': {
          alias: {
            '@': './app',
          },
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          packages: ['packages/*'],
        },
      },
    },
  }
);
