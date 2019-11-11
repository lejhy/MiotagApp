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
  parser: 'babel-eslint',
  "settings": {
    "import/resolver": {
      "babel-module": {}
    }
  },
  plugins: ['react'],
  rules: {
    "flowtype/require-valid-file-annotation": [
      2,
      "always", {
        "annotationStyle": "line",
        "strict": false,
      }
    ],
  "flowtype/newline-after-flow-annotation": [
      2,
      "always"
    ]
  },
};
