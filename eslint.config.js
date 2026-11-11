import astro from 'eslint-plugin-astro';
import typescriptParser from '@typescript-eslint/parser';
import typescriptPlugin from '@typescript-eslint/eslint-plugin';

export default [
  {
    ignores: ['dist/', 'node_modules/', '.astro/'],
  },
  ...astro.configs['flat/recommended'],
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: typescriptParser,
      // Disable project to avoid issues with auto-generated .astro/content.d.ts
      parserOptions: {
        project: false,
      },
    },
    plugins: {
      '@typescript-eslint': typescriptPlugin,
    },
    rules: {
      ...typescriptPlugin.configs['recommended'].rules,
    },
  },
];