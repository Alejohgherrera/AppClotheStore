const expoConfig = require('eslint-config-expo/flat');

const jestGlobals = {
  afterEach: 'readonly',
  beforeEach: 'readonly',
  describe: 'readonly',
  expect: 'readonly',
  it: 'readonly',
  jest: 'readonly',
  test: 'readonly',
};

const nodeGlobals = {
  __dirname: 'readonly',
  __filename: 'readonly',
  console: 'readonly',
  exports: 'writable',
  module: 'writable',
  process: 'readonly',
  require: 'readonly',
};

module.exports = [
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      '.expo/**',
      'coverage/**',
      'appclothe-mcp/**',
    ],
  },
  ...expoConfig,
  {
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
  {
    files: ['**/__tests__/**/*.js'],
    languageOptions: {
      globals: jestGlobals,
    },
    rules: {
      'no-console': 'off',
    },
  },
  {
    files: ['jest.config.js', 'jest.setup.js', 'eslint.config.js', 'index.js'],
    languageOptions: {
      globals: {
        ...nodeGlobals,
        ...jestGlobals,
      },
    },
  },
];