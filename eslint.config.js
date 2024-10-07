import js from '@eslint/js';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
const ignorePatterns = ['**/node_modules/**', '**/build/**', '**/dist/**'];

export default [
  {
    ignores: ignorePatterns,
  },
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'unused-imports': unusedImports,
    },
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
      },
    },
    rules: {
      // React rules
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react/prop-types': 'warn',
      'react/react-in-jsx-scope': 'off', // Not needed in React 17+

      // General JavaScript/ES6 rules
      'no-unused-vars': 'warn',
      'no-console': 'warn',
      'prefer-const': 'error',
      'arrow-body-style': ['error', 'as-needed'],
      'object-curly-spacing': ['error', 'always'],
      'unused-imports/no-unused-imports': 'error',
      // Enforce consistent indentation (2 spaces)
      indent: ['error', 2, { SwitchCase: 1 }],

      // Enforce single quotes
      quotes: ['error', 'single', { avoidEscape: true }],

      // Require semicolons
      semi: ['error', 'always'],

      // Enforce consistent line endings (LF)
      'linebreak-style': ['error', 'windows'],
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
