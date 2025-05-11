import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier';
import * as importPlugin from 'eslint-plugin-import';
import * as jsdoc from 'eslint-plugin-jsdoc';
import * as libram from 'eslint-plugin-libram';
import * as unicorn from 'eslint-plugin-unicorn';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

export default tseslint.config(eslint.configs.recommended, ...tseslint.configs.recommended, prettier, {
  plugins: {
    import: importPlugin,
    jsdoc,
    libram,
    unicorn,
    'simple-import-sort': simpleImportSort
  },
  languageOptions: {
    parserOptions: {
      projectService: {
        allowDefaultProject: ['*.mjs', '*.js']
      },
      tsconfigRootDir: import.meta.dirname
    }
  },
  rules: {
    'block-scoped-var': 'error',
    curly: ['error', 'multi-line'],
    'eol-last': 'error',
    eqeqeq: 'error',
    'no-trailing-spaces': 'error',
    'no-var': 'error',
    'prefer-arrow-callback': 'error',
    'prefer-const': 'error',
    'prefer-template': 'error',
    'sort-imports': [
      'error',
      {
        ignoreCase: true,
        ignoreDeclarationSort: true
      }
    ],
    'spaced-comment': 'error',

    // import rules
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',

    // jsdoc
    'jsdoc/require-jsdoc': 'off',

    // This one needs a fix because TS's rules are different?
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-non-null-assertion': 'error',

    // simple-import-sort
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          ['^react', '^@?\\w'],
          ['^(@philter)(/.*|$)'],
          ['^\\u0000'],
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          ['^.+\\.s?css$']
        ]
      }
    ],

    // eslint-plugin-libram
    'libram/verify-constants': 'error',
    'no-restricted-syntax': [
      'error',
      {
        selector: "CallExpression[callee.property.name='reduce'][arguments.length<2]",
        message: 'Provide initialValue to .reduce().'
      }
    ],

    // Unicorn
    'unicorn/import-style': 'off',
    'unicorn/no-lonely-if': 'off',
    'unicorn/no-null': 'off',
    'unicorn/prefer-query-selector': 'off',
    'unicorn/prevent-abbreviations': 'off'
  }
});
