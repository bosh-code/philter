import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactRefresh from 'eslint-plugin-react-refresh';
import react from 'eslint-plugin-react';
import reactCompiler from 'eslint-plugin-react-compiler';
import reactHooks from 'eslint-plugin-react-hooks';
import reactPerf from 'eslint-plugin-react-perf';
import globals from 'globals';
import philterConfig from 'eslint-config-philter';

export default tseslint.config(
  {
    ignores: ['dist/', 'eslint.config.mjs']
  },
  eslint.configs.recommended,
  ...philterConfig,
  ...tseslint.configs.recommended,
  {
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-compiler': reactCompiler,
      'react-perf': reactPerf,
      'react-refresh': reactRefresh
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react/hook-use-state': 'off',
      'react/jsx-filename-extension': 'off',
      'react/jsx-max-depth': 'off',
      'react/jsx-no-bind': 'warn',
      'react/jsx-no-leaked-render': 'off',
      'react/jsx-no-literals': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/jsx-sort-props': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/require-default-props': 'off',
      'react-compiler/react-compiler': 'error',
      'react-perf/jsx-no-jsx-as-prop': 'error',
      'react-perf/jsx-no-new-array-as-prop': 'error',
      'react-perf/jsx-no-new-function-as-prop': 'error',
      'react-perf/jsx-no-new-object-as-prop': 'error',
      'react-refresh/only-export-components': [
        'warn',
        {
          allowConstantExport: true
        }
      ]
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.browser
      },
      ecmaVersion: 2020
    }
  }
);
