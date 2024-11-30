module.exports = {
  root: true,
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2022,
  },
  env: {
    browser: true,
  },
  parser: 'vue-eslint-parser',
  extends: [
    'airbnb-base',
    'plugin:vue/vue3-recommended',
  ],
  rules: {
    'max-len': 'off',
    'no-underscore-dangle': 'off',
    'import/prefer-default-export': 'off',
    'import/named': 'off',
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-duplicates': 'off',
    'import/no-cycle': 'off',
    'import/no-relative-packages': 'off',
    'import/no-self-import': 'off',
    'import/order': 'off',
    'no-console': 'error',
    'quote-props': ['error', 'consistent-as-needed'],
    'linebreak-style': 'off',
    'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
    'func-style': ['error', 'expression', { allowArrowFunctions: true }],
    'array-bracket-newline': ['error', { multiline: true }],
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
         ['@', './src/'],
         ['@composables', './src/composables/'],
         ['@axios', './src/services/axios'],
        ],
        extensions: ['.js', '.vue'],
      },
    },
  },
};
