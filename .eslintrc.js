module.exports = {
  root: true,
  env: {
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:flowtype/recommended',
    'airbnb'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  'parser': 'babel-eslint',
  plugins: ['react'],
  rules: {},
};
