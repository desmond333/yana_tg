import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import prettier from 'eslint-config-prettier'
import tseslint from 'typescript-eslint'
import boundaries from 'eslint-plugin-boundaries'

const LAYER_ORDER_MESSAGE = 'Нарушен порядок слоёв FSD: импорт вверх запрещён.'
const SAME_LAYER_MESSAGE = 'Слайсы одного слоя не импортируют друг друга. Общий код выносится ниже — в entities или shared.'
const DEEP_IMPORT_MESSAGE = 'Глубокий импорт запрещён: импортируйте только через публичный API слайса (index.ts).'
const SHARED_DEEP_IMPORT_MESSAGE =
  'Импорт из shared только через публичный API сегмента: @/shared/lib, @/shared/ui, @/shared/api, @/shared/config, @/shared/i18n.'

export default tseslint.config(
  { ignores: ['dist', 'node_modules', 'coverage'] },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      boundaries,
    },
    settings: {
      'import/resolver': {
        typescript: { alwaysTryTypes: true, project: './tsconfig.app.json' },
      },
      'boundaries/elements': [
        { type: 'app', pattern: 'src/app' },
        { type: 'pages', pattern: 'src/pages/*', capture: ['slice'] },
        { type: 'widgets', pattern: 'src/widgets/*', capture: ['slice'] },
        { type: 'features', pattern: 'src/features/*', capture: ['slice'] },
        { type: 'entities', pattern: 'src/entities/*', capture: ['slice'] },
        { type: 'shared', pattern: 'src/shared/*', capture: ['segment'] },
      ],
      'boundaries/ignore': ['**/*.test.*', '**/*.spec.*'],
      'boundaries/legacy-templates': false,
    },
    rules: {
      ...reactHooks.configs.flat.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports', fixStyle: 'inline-type-imports' }],
      'no-restricted-syntax': [
        'error',
        {
          selector: 'ConditionalExpression > ConditionalExpression',
          message: 'Вложенные тернарные операторы запрещены: используйте switch, словарь или ранний return.',
        },
      ],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      eqeqeq: ['error', 'always'],
      'prefer-const': 'error',
      'boundaries/dependencies': [
        'error',
        {
          default: 'allow',
          policies: [
            {
              from: { element: { type: 'shared' } },
              disallow: { to: { element: { type: ['app', 'pages', 'widgets', 'features', 'entities'] } } },
              message: 'Слой shared не может импортировать верхние слои.',
            },
            {
              from: { element: { type: 'entities' } },
              disallow: { to: { element: { type: ['app', 'pages', 'widgets', 'features'] } } },
              message: LAYER_ORDER_MESSAGE,
            },
            {
              from: { element: { type: 'entities' } },
              disallow: { to: { element: { type: 'entities', captured: { slice: '!{{from.element.captured.slice}}' } } } },
              message: SAME_LAYER_MESSAGE,
            },
            {
              from: { element: { type: 'features' } },
              disallow: { to: { element: { type: ['app', 'pages', 'widgets'] } } },
              message: LAYER_ORDER_MESSAGE,
            },
            {
              from: { element: { type: 'features' } },
              disallow: { to: { element: { type: 'features', captured: { slice: '!{{from.element.captured.slice}}' } } } },
              message: SAME_LAYER_MESSAGE,
            },
            {
              from: { element: { type: 'widgets' } },
              disallow: { to: { element: { type: ['app', 'pages'] } } },
              message: LAYER_ORDER_MESSAGE,
            },
            {
              from: { element: { type: 'widgets' } },
              disallow: { to: { element: { type: 'widgets', captured: { slice: '!{{from.element.captured.slice}}' } } } },
              message: SAME_LAYER_MESSAGE,
            },
            {
              from: { element: { type: 'pages' } },
              disallow: { to: { element: { type: 'app' } } },
              message: LAYER_ORDER_MESSAGE,
            },
            {
              from: { element: { type: 'pages' } },
              disallow: { to: { element: { type: 'pages', captured: { slice: '!{{from.element.captured.slice}}' } } } },
              message: SAME_LAYER_MESSAGE,
            },
            {
              from: { element: { type: 'app' } },
              disallow: { to: { element: { type: ['pages', 'widgets', 'features', 'entities'], fileInternalPath: '!index.ts' } } },
              message: DEEP_IMPORT_MESSAGE,
            },
            {
              from: { element: { type: ['pages', 'widgets', 'features', 'entities'] } },
              disallow: {
                to: {
                  element: {
                    type: ['pages', 'widgets', 'features', 'entities'],
                    fileInternalPath: '!index.ts',
                    captured: { slice: '!{{from.element.captured.slice}}' },
                  },
                },
              },
              message: DEEP_IMPORT_MESSAGE,
            },
            {
              from: { element: { type: ['app', 'pages', 'widgets', 'features', 'entities'] } },
              disallow: { to: { element: { type: 'shared', fileInternalPath: '!index.ts' } } },
              message: SHARED_DEEP_IMPORT_MESSAGE,
            },
          ],
        },
      ],
    },
  },
  {
    files: ['vite.config.ts', 'vitest.config.ts', 'scripts/**/*.mjs'],
    languageOptions: { globals: globals.node },
  },
  {
    files: ['supabase/functions/**/*.ts'],
    languageOptions: { globals: { Deno: 'readonly' } },
  },
  prettier,
)
